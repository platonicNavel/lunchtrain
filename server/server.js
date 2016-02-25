const express = require('express');
const path = require('path');
// const partials = require('express-partials');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const slackUtils = require('./utils/slack');

const db = require('./db/index');

const app = express();

const devMode = false;

app.use(session({ secret: 'asdfqwertty' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    const userToSerialize = dbUser;
    userToSerialize.accessToken = accessToken;
    userToSerialize.slackTeamId = slackTeamId;
    userToSerialize.teamName = teamName;
    done(null, userToSerialize);
  }).catch((err) => {
    done(err, null);
  });
});

passport.use(new SlackStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
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


app.use(express.static(path.join(__dirname, '../static')));
app.use('/build', express.static(path.join(__dirname, '../build')));

const ensureAuthenticated = (req, res, next) => {
  let retVal;
  if (devMode) {
    req.user = { 
      dataValues: { 
        firstName: 'Griffin',
        lastName: 'Michl'
      },
      slackTeamId: 'T0AHB62V6',
      teamName: 'T0AHB62V6'
    };
  }
  if (req.isAuthenticated() || devMode) {
    retVal = next();
  } else {
    retVal = res.redirect('/login');
  }
  return retVal;
};

app.get('/', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/api/destinations', ensureAuthenticated, (req, res) => {
  const slackTeamId = req.user.slackTeamId;
  db.Destination.findAll({
    include: [{
      model: db.Team,
      where: { slackTeamId },
    },
    ],
  }).then((destinations) => {
    const formattedDestinations = destinations.map((destination) => {
      const formattedDestination = {
      name: destination.dataValues.name,
      lat: destination.dataValues.lat,
      long: destination.dataValues.long,
      };
      return formattedDestination;
    });
    res.send(formattedDestinations);
  });
});

app.get('/api/trains', ensureAuthenticated, (req, res) => {
  // 
  const slackTeamId = req.user.slackTeamId;
  db.Train.findAll({
    include: [
    {
      model: db.Team,
      where: { slackTeamId },
    },
    {
      model: db.User,
    },
    {
      model: db.User,
      as: 'Conductor',
    },
    {
      model: db.Destination,
    },
    ],
  }).then((trains) => {
    const formattedTrains = trains.map((train) => {
      const formattedTrain = {
        id: train.dataValues.id,
        timeDeparting: train.dataValues.timeDeparting,
        timeDuration: train.dataValues.timeDuration,
        // Use forEach for users, conductor and 
        users: train.dataValues.Users,
        conductor: train.dataValues.Conductor,
        destination: train.dataValues.Destination,
      };
      return formattedTrain;
    });
    res.send(formattedTrains);
  });
});

app.get('/destinations', ensureAuthenticated, (req, res) => {
  res.render('destinations');
});

app.get('/trains', ensureAuthenticated, (req, res) => {
  res.render('trains');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/slack');
});

app.get('/auth/slack',
  passport.authenticate('slack'));

app.get('/auth/slack/callback',
  passport.authenticate('slack', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.post('/destinations', (req, res) => {
  const user = req.user;
  const data = req.body;

  // todo: modularize, refactor
  db.findOne({ where: { id: user.id } }).then((dbUser) => {
    db.Train.create({
      timeDeparting: data.timeDeparting,
      timeDuration: data.timeDuration,
    }).then((train) => {
      train.addConductor(dbUser).then(() => {
        db.Destination.findOrCreate({
          googleId: data.googleId,
          name: data.name,
          lat: data.lat,
          long: data.long,
          visits: data.visits,
          likes: data.likes,
        }).spread(destination => destination.addTrain(train)).then(() => {
          res.send(200, 'Train created');
        });
      });
    });
  });
});

app.post('/trains', (req, res) => {
  const data = req.body;
  const user = req.user;
  console.log(data, user.slackId);
  db.User.findOne({
    where: { slackId: user.slackId },
  }).then((dbUser) => {
    console.log(dbUser);
    db.Train.findOne({
      where: { id: data.id },
    }).then(train => dbUser.addTrain(train)).then(() => {
      res.send(200, 'Passenger added to train');
    });
  });
});

// force should be false/ommitted in production code
const init = require('./db/dummyData');

init().then(() => {
  console.log('Server is listening on port 8000');
  app.listen(8000);
});
