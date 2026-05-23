export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const keys = getGroqKeys();
  if (!keys.length) {
    return res.status(503).json({ error: 'Free tier not available' });
  }

  const { system, messages, jsonMode } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const chatMessages = [];
  if (system) {
    chatMessages.push({ role: 'system', content: system });
  }
  messages.forEach(function (m) {
    chatMessages.push({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    });
  });

  // Spread load across keys with a random start, and fail over to the next
  // key on rate-limit or transient error. Only report rate_limited if every
  // configured key is exhausted.
  const start = Math.floor(Math.random() * keys.length);
  let sawRateLimit = false;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[(start + i) % keys.length];
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + key
        },
        body: JSON.stringify(Object.assign({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 1024,
          messages: chatMessages
        }, jsonMode ? { response_format: { type: 'json_object' } } : {}))
      });

      if (groqRes.status === 429) {
        sawRateLimit = true;
        continue;
      }

      const data = await groqRes.json();

      if (!groqRes.ok) {
        continue;
      }

      const text =
        data &&
        data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content
          ? data.choices[0].message.content
          : '(No response)';

      return res.status(200).json({ text: text });
    } catch (err) {
      // try the next key
    }
  }

  if (sawRateLimit) {
    return res.status(429).json({ error: 'rate_limited' });
  }
  return res.status(502).json({ error: 'AI service error' });
}

// Collect Groq keys from env: a comma-separated GROQ_API_KEYS and/or the
// individual GROQ_API_KEY / GROQ_API_KEY_1..5 variables. Duplicates removed.
function getGroqKeys() {
  const keys = [];
  if (process.env.GROQ_API_KEYS) {
    process.env.GROQ_API_KEYS.split(',').forEach(function (k) {
      const t = k.trim();
      if (t && keys.indexOf(t) === -1) keys.push(t);
    });
  }
  ['GROQ_API_KEY', 'GROQ_API_KEY_1', 'GROQ_API_KEY_2', 'GROQ_API_KEY_3', 'GROQ_API_KEY_4', 'GROQ_API_KEY_5'].forEach(function (name) {
    const v = process.env[name];
    if (v && keys.indexOf(v) === -1) keys.push(v);
  });
  return keys;
}
