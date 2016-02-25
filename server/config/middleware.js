const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (app, express) => {
  app.use(session({ secret: 'asdfqwertty' }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../static')));
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.use(passport.initialize());
  app.use(passport.session());
}