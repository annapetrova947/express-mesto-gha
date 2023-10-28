const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'SECRET_KEY' } = process.env;

const auth = (req, res, next) => {
  const authtorization = req.headers.authorization;
  const token = authtorization.replace('Bearer ', '');
  if (!token) {
    res.status(401).send({ message: 'Необходимо авторизоваться' });
  }
  const payload = jwt.verify(token, JWT_SECRET);
  req.user = payload;
  next();
};

module.exports = auth;
