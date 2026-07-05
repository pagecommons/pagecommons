export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    return res.status(503).json({ error: 'Transfer service not available' });
  }

  async function kv(command) {
    const r = await fetch(kvUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + kvToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command)
    });
    const data = await r.json();
    return data.result;
  }

  if (req.method === 'POST') {
    const { key } = req.body || {};
    if (!key || typeof key !== 'string' || key.trim().length === 0 || key.length > 500) {
      return res.status(400).json({ error: 'Invalid key' });
    }

    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown')
      .split(',')[0].trim();
    const ipKey = 'ratelimit:post:' + ip;
    const count = await kv(['INCR', ipKey]);
    if (count === 1) await kv(['EXPIRE', ipKey, 3600]);
    if (count > 10) {
      return res.status(429).json({ error: 'Too many requests. Try again in an hour.' });
    }

    // NX so a random collision with an in-flight code can never overwrite
    // it (and hand that code's holder the wrong user's key) — retry instead.
    let code = null;
    for (let attempt = 0; attempt < 5 && code === null; attempt++) {
      const candidate = Math.floor(100000 + Math.random() * 900000).toString();
      const setRes = await kv(['SET', 'transfer:' + candidate, key.trim(), 'EX', 600, 'NX']);
      if (setRes) code = candidate;
    }
    if (!code) {
      return res.status(503).json({ error: 'Could not generate a code — please try again.' });
    }

    return res.status(200).json({ code: code });

  } else if (req.method === 'GET') {
    const code = (req.query && req.query.code) || '';
    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({ error: 'Invalid code' });
    }

    // Per-IP rate limit on retrieval so a single IP can't scan the 6-digit
    // code space to grab an in-flight key during its 10-minute window.
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown')
      .split(',')[0].trim();
    const ipKey = 'ratelimit:get:' + ip;
    const ipCount = await kv(['INCR', ipKey]);
    if (ipCount === 1) await kv(['EXPIRE', ipKey, 3600]);
    if (ipCount > 30) {
      return res.status(429).json({ error: 'Too many requests. Try again in an hour.' });
    }

    const failCount = await kv(['GET', 'fail:' + code]);
    if (failCount !== null && parseInt(failCount, 10) >= 5) {
      return res.status(404).json({ error: 'Code not found or expired' });
    }

    const apiKey = await kv(['GETDEL', 'transfer:' + code]);

    if (apiKey === null) {
      const newCount = await kv(['INCR', 'fail:' + code]);
      if (newCount === 1) await kv(['EXPIRE', 'fail:' + code, 600]);
      return res.status(404).json({ error: 'Code not found or expired' });
    }

    return res.status(200).json({ key: apiKey });

  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
