const app = require('./app');
const db = require('./components/connect');
const logger = require('./components/logger');

(async () => {
  await db();

  const port = 3000;
  app.listen(port, () => logger.info('listen to 3000'));
})();
