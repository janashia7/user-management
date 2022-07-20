const pino = require('pino');
require('dotenv').config();

const { PRETTY_LOGGING } = process.env;
let logger = pino();

if (PRETTY_LOGGING) {
  logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  });
}

module.exports = logger;
