// Exchanges OAuth refresh tokens for fresh access tokens, OR exchanges
// the initial auth code from the consent screen for refresh+access tokens.
// Client never sees GDRIVE_CLIENT_SECRET.
module.exports = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.GDRIVE_CLIENT_SECRET || !process.env.GDRIVE_CLIENT_ID) {
    return res.status(503).json({ error: 'Drive sync not configured' });
  }

  try {
    var body = req.body || {};
    var params;

    if (body.grant_type === 'authorization_code') {
      // Initial token exchange after consent screen
      if (!body.code || !body.redirect_uri) {
        return res.status(400).json({ error: 'Missing code or redirect_uri' });
      }
      params = new URLSearchParams({
        client_id: process.env.GDRIVE_CLIENT_ID,
        client_secret: process.env.GDRIVE_CLIENT_SECRET,
        code: body.code,
        redirect_uri: body.redirect_uri,
        grant_type: 'authorization_code'
      });
    } else {
      // Refresh access token using stored refresh token
      if (!body.refresh_token) {
        return res.status(400).json({ error: 'Missing refresh_token' });
      }
      params = new URLSearchParams({
        client_id: process.env.GDRIVE_CLIENT_ID,
        client_secret: process.env.GDRIVE_CLIENT_SECRET,
        refresh_token: body.refresh_token,
        grant_type: 'refresh_token'
      });
    }

    var response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    var data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Token exchange failed' });
  }
};
