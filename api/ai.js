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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Free tier not available' });
  }

  const { system, messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const contents = messages.map(function(m) {
    return {
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    };
  });

  if (system) {
    contents.unshift({ role: 'user', parts: [{ text: system }] });
    contents.splice(1, 0, { role: 'model', parts: [{ text: "Understood. I'm ready." }] });
  }

  try {
    const geminiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: contents })
      }
    );

    if (geminiRes.status === 429) {
      return res.status(429).json({ error: 'rate_limited' });
    }

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      return res.status(502).json({ error: 'AI service error' });
    }

    const text =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0]
        ? data.candidates[0].content.parts[0].text
        : '(No response)';

    return res.status(200).json({ text: text });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reach AI service' });
  }
}
