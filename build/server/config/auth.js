'use strict';

var passport = require('passport');
var SlackStrategy = require('passport-slack').Strategy;
var config = require('./config.js');
var db = require('../db/index');
var slackUtils = require('./slack');

passport.serializeUser(function (user, done) {
  done(null, user);
});

/* not sure if this is the way to do it with attaching variables
to user, but it works for now. I think we may be serializing
too much data though */
passport.deserializeUser(function (user, done) {
  var accessToken = user.accessToken;
  var slackTeamId = user.slackTeamId;
  var teamName = user.slackTeamId;
  db.User.findOne({ where: { id: user.id } }).then(function (dbUser) {
    var sessionUser = dbUser;
    sessionUser.accessToken = accessToken;
    sessionUser.slackTeamId = slackTeamId;
    sessionUser.teamName = teamName;
    done(null, sessionUser);
  }).catch(function (err) {
    done(err, null);
  });
});

passport.use(new SlackStrategy({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: '/auth/slack/callback',
  scope: 'users:read channels:write chat:write:bot'
}, function (accessToken, refreshToken, profile, done) {
  var slackId = profile.id;
  var firstName = profile._json.info.user.profile.first_name;
  var lastName = profile._json.info.user.profile.last_name;
  var slackTeamId = profile._json.team_id;
  var teamName = profile._json.team;
  var gravatar = profile._json.info.user.profile.image_192;

  db.User.findOrCreate({
    where: { slackId: slackId, firstName: firstName, lastName: lastName },
    defaults: { gravatar: gravatar, token: accessToken }
  }).spread(function (user, userCreated) {
    var userToSerialize = user;
    db.Team.findOrCreate({ where: { slackTeamId: slackTeamId, teamName: teamName } }).spread(function (team, teamCreated) {
      // TODO: ADDRESS EDGE CASE
      var retVal = undefined;
      if (userCreated || teamCreated) {
        retVal = user.addTeam(team);
      }
      return retVal;
    }).then(function () {
      /* should this info be stored in a db?
      note that these will not be retained as is */
      userToSerialize.dataValues.teamName = teamName;
      userToSerialize.dataValues.slackTeamId = slackTeamId;
      userToSerialize.dataValues.accessToken = accessToken;
      slackUtils.createChannel(accessToken);
      return done(null, userToSerialize);
    });
  });
}));

exports.checkAuthenticated = function (req, res, next) {
  var authenticated = false;
  if (config.devMode) {
    req.user = {
      dataValues: {
        firstName: 'Griffin',
        lastName: 'Michl'
      },
      slackTeamId: 'T0AHB62V6',
      teamName: 'T0AHB62V6'
    };
  }
  if (req.isAuthenticated() || config.devMode) {
    authenticated = true;
  }
  res.send(authenticated);
};

exports.ensureAuthenticated = function (req, res, next) {
  var retVal = undefined;
  if (config.devMode) {
    req.user = {
      dataValues: {
        firstName: 'Griffin',
        lastName: 'Michl'
      },
      slackTeamId: 'T0AHB62V6',
      teamName: 'T0AHB62V6'
    };
  }
  if (req.isAuthenticated() || config.devMode) {
    retVal = next();
  } else {
    retVal = res.redirect('/login');
  }
  return retVal;
};

exports.slackAuth = passport.authenticate('slack');

exports.slackAuthCallback = passport.authenticate('slack', { failureRedirect: '/login' });
