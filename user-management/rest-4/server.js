const app = require('./app');
const db = require('./api/db/connect');
const logger = require('./components/logger');

(async () => {
  await db();

  const PORT = 3000;
  app.listen(PORT, () => logger.info(`listen to ${PORT}`));
})();
