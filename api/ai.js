// Only our own site may use this endpoint — it spends the shared free-tier
// Gemini quota, so an open CORS proxy would let any site drain it. Allowed:
// requests with no Origin header (e-reader browsers that omit it), the known
// production domains, and any same-origin request (Origin host matches the
// host this function is served from — covers Vercel preview deployments).
// Genuine cross-origin requests from third-party sites are rejected.
var ALLOWED_ORIGINS = ['https://pagecommons.com', 'https://www.pagecommons.com'];
function isAllowedOrigin(req) {
  var origin = req.headers.origin;
  if (!origin) return true;
  if (ALLOWED_ORIGINS.indexOf(origin) !== -1) return true;
  var originHost = origin.replace(/^https?:\/\//, '');
  var host = req.headers['x-forwarded-host'] || req.headers.host;
  return !!host && originHost === host;
}
function applyCors(req, res) {
  var origin = req.headers.origin;
  var allowed = isAllowedOrigin(req);
  res.setHeader('Vary', 'Origin');
  if (origin && allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return allowed;
}

export default async function handler(req, res) {
  var originAllowed = applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!originAllowed) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Free tier not available' });
  }

  var body = req.body || {};
  var system = body.system;
  var messages = body.messages;
  var jsonMode = body.jsonMode;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Build Gemini contents array (user/model alternating)
  var contents = [];
  messages.forEach(function(m) {
    contents.push({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    });
  });

  var generationConfig = {
    maxOutputTokens: 1024,
    thinkingConfig: { thinkingBudget: 0 }
  };
  if (jsonMode) {
    generationConfig.responseMimeType = 'application/json';
  }

  var requestBody = {
    contents: contents,
    generationConfig: generationConfig
  };
  if (system) {
    requestBody.systemInstruction = { parts: [{ text: system }] };
  }

  try {
    var geminiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      }
    );

    if (geminiRes.status === 429) {
      return res.status(429).json({ error: 'rate_limited' });
    }

    var data = await geminiRes.json();

    if (!geminiRes.ok) {
      return res.status(502).json({ error: 'AI service error' });
    }

    var text =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text
        ? data.candidates[0].content.parts[0].text
        : '(No response)';

    return res.status(200).json({ text: text });
  } catch (err) {
    return res.status(502).json({ error: 'AI service error' });
  }
}
