const express = require('express');
const static = require('./static/static');
const api = require('./api/api');

const app = express();
const DEFAULT_PORT = 4000;

static.init(app);
api.init(app);

app.listen(process.env.PORT || DEFAULT_PORT);
console.log("Started server on port " + (process.env.PORT || DEFAULT_PORT))
