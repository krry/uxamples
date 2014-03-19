// required modules
var express = require('express'),
    http = require('http'),
    https = require('https'),
    myth = require('myth'),
    fs = require('fs'),
    //https ssl creds
    privateKey = fs.readFileSync('ssl/server.key', 'utf8'),
    certificate = fs.readFileSync('ssl/server.crt', 'utf8'),
    credentials = {key: privateKey, cert: certificate},
    app = express();


app.everyauth = require('everyauth');
app.mongoose = require('mongoose');

var config = require('./config.js')(app, express);

var models = {};
models.buttons = require('./models/button')(app.mongoose).model;

require('./routes')(app, models);

// declare and start http(s) servers
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
console.log('running on port ' + config.port);
console.log('secure port would be ' + config.portS);
httpServer.listen(config.port);
httpsServer.listen(config.portS);