const express = require('express');

const init = (app) => {
    const path = __dirname + '/../../../web/build';

    console.log('env is ' + process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
        console.log("Serving static files from " + path)
        app.use(express.static(path));
    }
}

module.exports = {
    init
}
