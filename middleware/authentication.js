const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies && req.cookies.accessToken;

  if (!token) {
    return res.status(302).redirect('/');
  }

  const secret = process.env.ACCESS_TOKEN;
  if (!secret) {
    return res.status(500).send('Server configuration error');
  }

  jwt.verify(token, secret, (err, userPayload) => {
    if (err) return res.status(302).redirect('/');
    req.user = userPayload;
    next();
  });
}

module.exports = authenticateToken;
