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

  // Gemma on AI Studio does not support systemInstruction or thinkingConfig
  // the way Gemini does. Inline the system prompt into the first user turn.
  var contents = [];
  var systemPrepended = false;
  messages.forEach(function(m) {
    var role = m.role === 'user' ? 'user' : 'model';
    var text = m.content;
    if (!systemPrepended && system && role === 'user') {
      text = system + '\n\n' + text;
      systemPrepended = true;
    }
    contents.push({
      role: role,
      parts: [{ text: text }]
    });
  });
  // Fallback: if there were no user messages, push the system prompt as one
  if (!systemPrepended && system) {
    contents.unshift({ role: 'user', parts: [{ text: system }] });
  }

  var generationConfig = {
    maxOutputTokens: 1024
  };
  if (jsonMode) {
    // Gemma may ignore this; rely on prompt-side JSON instructions too.
    generationConfig.responseMimeType = 'application/json';
  }

  var requestBody = {
    contents: contents,
    generationConfig: generationConfig
  };

  try {
    var geminiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemma-4-26b-a4b-it:generateContent?key=' + apiKey,
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
