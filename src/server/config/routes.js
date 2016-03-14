const auth = require('./auth');
const utils = require('./utils.js');

module.exports = (app) => {
  app.get('/', utils.serveIndex);
  app.get('/:var(trains|destinations|login)?', utils.serveIndex);
  app.get('/api/loggedin', auth.checkAuthenticated);
  app.get('/api/destinations', utils.getDestinations);
  app.get('/api/trains', utils.getTrains);
  app.get('/logout', utils.serveLogout);
  app.get('/auth/slack', auth.slackAuth);
  app.get('/auth/slack/callback', auth.slackAuthCallback, utils.indexRedirect);
  app.post('/destinations', utils.createTrain);
  app.post('/trains', utils.boardTrain);
};

