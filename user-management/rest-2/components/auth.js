const User = require('../api/models/user-model');
const logger = require('./logger');
const login = require('./login');

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  logger.info(authorization);
  if (authorization) {
    const encoded = authorization.substring(6);
    const decoded = Buffer.from(encoded, 'base64').toString();
    const [nickname, password] = decoded.split(':');

    const profile = await login(nickname, password);
    if (profile) {
      next();
    } else {
      res.sendStatus(400);
    }
  }
};

module.exports = auth;
