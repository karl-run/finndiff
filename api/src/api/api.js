const express = require('express');

const init = (app) => {
    app.get('/api/scrape', (req, res) => {
        res.send('lol');
    })
}

module.exports = {
    init
}
