const auth = require('./auth');
const utils = require('./utils.js');
// TO DELETE:
const path = require('path');

module.exports = (app) => {
  app.get('/', utils.serveIndex);
  app.get('/landing', auth.ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../views/landing.html'));
  });
  app.get('/login', utils.serveLogin);
  app.get('/api/loggedin', auth.checkAuthenticated);
  app.get('/api/destinations', auth.ensureAuthenticated, utils.getDestinations);
  app.get('/api/trains', auth.ensureAuthenticated, utils.getTrains);
  // app.get('/destinations', auth.ensureAuthenticated, utils.serveDestinations);
  // app.get('/trains', auth.ensureAuthenticated, utils.serveTrains);
  app.get('/logout', utils.serveLogout);
  app.get('/auth/slack', auth.slackAuth);
  app.get('/auth/slack/callback', auth.slackAuthCallback, utils.indexRedirect);
  app.post('/destinations', utils.createTrain);
  app.post('/trains', utils.boardTrain);
  app.get('/*', utils.serveNotFound);
};

