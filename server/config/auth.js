const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const config = require('./config.js');
const db = require('../db/index');
const slackUtils =require('./slack');

passport.serializeUser((user, done) => {
  done(null, user);
});

/* not sure if this is the way to do it with attaching variables
to user, but it works for now. I think we may be serializing
too much data though */
passport.deserializeUser((user, done) => {
  const accessToken = user.accessToken;
  const slackTeamId = user.slackTeamId;
  const teamName = user.slackTeamId;
  db.User.findOne({ where: { id: user.id } }).then((dbUser) => {
    const sessionUser = dbUser;
    sessionUser.accessToken = accessToken;
    sessionUser.slackTeamId = slackTeamId;
    sessionUser.teamName = teamName;
    done(null, sessionUser);
  }).catch((err) => {
    done(err, null);
  });
});

passport.use(new SlackStrategy({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: '/auth/slack/callback',
  scope: 'users:read channels:write chat:write:bot',
},
  (accessToken, refreshToken, profile, done) => {
    const slackId = profile.id;
    const firstName = profile._json.info.user.profile.first_name;
    const lastName = profile._json.info.user.profile.last_name;
    const slackTeamId = profile._json.team_id;
    const teamName = profile._json.team;

    db.User.findOrCreate({ where: { slackId, firstName, lastName } })
      .spread((user, userCreated) => {
        const userToSerialize = user;
        db.Team.findOrCreate({ where: { slackTeamId, teamName } }).spread((team, teamCreated) => {
          // TODO: ADDRESS EDGE CASE
          let retVal;
          if (userCreated || teamCreated) {
            console.log('User or team created');
            retVal = user.addTeam(team);
          }
          return retVal;
        }).then(() => {
          console.log('Returning user info for serialization');
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

exports.ensureAuthenticated = (req, res, next) => {
  let retVal;
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
