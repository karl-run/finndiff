const express = require('express');

const init = (app) => {
    if (process.env.NODE_ENV === 'production') {
        const path = __dirname + '/../../../web/build';

        log.info("Serving static files from " + path)

        app.use(express.static(path));
    } else {
        log.warn('Env is not production, not serving any static files.');
    }
}

module.exports = {
    init
}
