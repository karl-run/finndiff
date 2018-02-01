const express = require('express');
const { mongo, initGlobals } = require('finndiff-api-core');

const polling = require('../../api-scraper/src/scraper/polling');
const api = require('./api/api');

initGlobals();

const app = express();
const DEFAULT_PORT = 4000;

log.level = 'info';

mongo
  .initialize()
  .then(() => {
    api.init(app);
    app.listen(process.env.PORT || DEFAULT_PORT, () => {
      log.info('Started server on port ' + (process.env.PORT || DEFAULT_PORT));
    });

    polling.init();
  })
  .catch(error => {
    log.error('Unable to connect to mongodb, exiting application.');
    console.log(error);
  });
