const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const tokenFromCookie = req.cookies && (req.cookies.accessToken || req.cookies.token || req.cookies.refreshToken);

  const token = tokenFromCookie;
  if (!token) {
    return res.status(302).redirect('/');
  }

  const secret = process.env.ACCESS_TOKEN || process.env.SECRET_KEY;
  if (!secret) {
    return res.status(500).send('Server configuration error');
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(302).redirect('/');
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
