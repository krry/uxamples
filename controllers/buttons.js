var mongoose = require('mongoose');
var Button = require('../models/button');
module.exports.controller = function(app) {
  app.get('/new', function(req, res) {
    res.render('button/new');
  });

  app.get('/id', function(req, res) {
    res.render('button/:id');
  });
}