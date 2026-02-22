const jwt = require("jsonwebtoken");

// Authentication middleware used by routes.
// Tries Authorization header (Bearer ...) first, then cookies (accessToken, token, refreshToken).
// Falls back to using process.env.ACCESS_TOKEN or process.env.SECRET_KEY as the signing secret.
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader && authHeader.split(' ')[1];
  const tokenFromCookie = req.cookies && (req.cookies.accessToken || req.cookies.token || req.cookies.refreshToken);

  const token = tokenFromHeader || tokenFromCookie;
  if (!token) {
    // For browser-based flows we typically redirect to login; for APIs send 401.
    return res.status(401).send('Unauthorized');
  }

  const secret = process.env.ACCESS_TOKEN || process.env.SECRET_KEY;
  if (!secret) {
    // If there's no secret configured, fail safe.
    return res.status(500).send('Server configuration error');
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).send('Forbidden');
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
