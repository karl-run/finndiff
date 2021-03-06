require('./globals');

const express = require('express');
const mongo = require('./mongo/mongo');
const staticHost = require('./static/static');
const polling = require('./scraper/polling');
const api = require('./api/api');
const logging = require('./logging/logger');

const app = express();
const DEFAULT_PORT = 4000;

logging.level = 'debug';

mongo
  .initialize()
  .then(() => {
    // Set up express
    staticHost.init(app);
    api.init(app);
    app.listen(process.env.PORT || DEFAULT_PORT, () => {
      log.info('Started server on port ' + (process.env.PORT || DEFAULT_PORT));
    });

    // Set up other services
    polling.init();
    //polling.updateMetadata();

    //mongo.deleteAllForAd(['100895008', '109989035'])
  })
  .catch(error => {
    log.error('Unable to connect to mongodb, exiting application.');
    console.log(error);
  });
