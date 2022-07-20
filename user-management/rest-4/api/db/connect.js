const mongoose = require('mongoose');
const logger = require('../../components/logger');
require('dotenv').config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    logger.info('connected');
  } catch (error) {
    logger.info(error);
  }
};

module.exports = connect;
