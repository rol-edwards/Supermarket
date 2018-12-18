var express = require('express');

var app = express();

app.use('/api', require(__dirname + '/routes.js'))

module.exports = app;