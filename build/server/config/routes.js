'use strict';

var auth = require('./auth');
var utils = require('./utils.js');

module.exports = function routes(app) {
  app.get('/', auth.ensureAuthenticated, utils.serveIndex);
  app.get('/login', utils.serveLogin);
  app.get('/api/destinations', auth.ensureAuthenticated, utils.getDestinations);
  app.get('/api/trains', auth.ensureAuthenticated, utils.getTrains);
  app.get('/destinations', auth.ensureAuthenticated, utils.serveDestinations);
  app.get('/trains', auth.ensureAuthenticated, utils.serveTrains);
  app.get('/logout', utils.serveLogout);
  app.get('/auth/slack', auth.slackAuth);
  app.get('/auth/slack/callback', auth.slackAuthCallback, utils.indexRedirect);
  app.post('/destinations', utils.createTrain);
  app.post('/trains', utils.boardTrain);
  app.get('/*', utils.serveNotFound);
};
