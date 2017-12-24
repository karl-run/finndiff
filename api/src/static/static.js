const express = require('express');

const init = (app) => {
    app.use(express.static(__dirname + '/../../web/build'));
} 

module.exports = {
    init
}
