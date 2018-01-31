const logger = require('./logging/logger');

module.exports = () => {
  global.log = logger;
};
