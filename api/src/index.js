require('./globals');

const express = require('express');
const static = require('./static/static');
const api = require('./api/api');
const logging = require('./logging/logger');

const app = express();
const DEFAULT_PORT = 4000;

logging.level = 'debug'
static.init(app);
api.init(app);

app.listen(process.env.PORT || DEFAULT_PORT);

log.info("Started server on port " + (process.env.PORT || DEFAULT_PORT))
