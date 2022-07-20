const logger = require('../../components/logger');
const login = require('../../components/login');

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  logger.info(authorization);
  if (authorization) {
    const encoded = authorization.replace('Basic ', '');
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
