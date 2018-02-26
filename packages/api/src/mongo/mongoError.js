const logError = err => {
  log.error('Unable to connect to database.');
  log.error(`Mongo-error ${err.code}: ${err.codeName}`);
  log.error(`Message: ${err.message}`);
};

module.exports = {
  logError,
};
