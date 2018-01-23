const express = require('express');
const path = require('path');

const init = app => {
  if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname + '/../../../web/build');

    log.info('Production, serving static files from ' + buildPath);

    app.use(express.static(buildPath));
    app.use(
      express.static(path.join(buildPath, '/favicon'), {
        maxage: '1y',
      }),
    );
  } else {
    log.warn('Env is not production, not serving any static files.');
  }
};

module.exports = {
  init,
};
