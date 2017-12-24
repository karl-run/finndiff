const express = require('express');

const init = (app) => {
    const path = __dirname + '/../../../web/build';

    console.log("Serving static files from " + path)
    app.use(express.static(path));
}

module.exports = {
    init
}
