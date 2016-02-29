'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function (app, express) {
  app.use(session({ secret: 'asdfqwertty' }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../../static')));
  app.use('/build', express.static(path.join(__dirname, '../../build')));
  app.use(passport.initialize());
  app.use(passport.session());
};
