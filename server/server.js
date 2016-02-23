const express = require('express');
const path = require('path');
// const partials = require('express-partials');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const slackUtils = require('./utils/slack');

const db = require('./db/index');

const CLIENT_ID = "10589206992.22131652337"
const CLIENT_SECRET = "63a441c7c9d19dcd6faa789d27a22d3a";

const app = express();

const devMode = true;

app.use(session({secret:'asdfqwertty'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser((user, done) => {
  done(null, user);
});

//not sure if this is the way to do it with attaching variables
//to user, but it works for now. I think we may be serializing
//too much data though
passport.deserializeUser((user, done) => {
  const accessToken = user.accessToken;
  const slackTeamId = user.slackTeamId;
  const teamName = user.slackTeamId;
  db.User.findOne({where: {id: user.id}}).then((user) => {
    user.accessToken = accessToken;
    user.slackTeamId = slackTeamId;
    user.teamName = teamName;
    done(null, user);
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

    db.User.findOrCreate({where: {slackId, firstName, lastName}})
      .spread((user, userCreated) => {
        db.Team.findOrCreate({where: {slackTeamId, teamName}}).spread((team, teamCreated) => {
          if (!userCreated && !teamCreated) { //TODO: ADDRESS EDGE CASE
            console.log('Team and user exist already');
          } else {
            console.log('User and team created');
            return user.addTeam(team);
          }
        }).then(() => {
          console.log('Returning user info for serialization');
          //should this info be stored in a db?
          //note that these will not be retained as is
          user.dataValues.teamName = teamName;
          user.dataValues.slackTeamId = slackTeamId;
          user.dataValues.accessToken = accessToken;
          return done(null, user);
        });
      });
}));


app.use(express.static(path.join(__dirname, '../static')));
app.use('/build', express.static(path.join(__dirname, '../build')));

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() || devMode) {
    return next();
  } else {
    res.redirect('/login');
  }
};

// app.get('/api/destinations', (req, res) => {
//   //make database query
//   const sqlData = [{
//     id: 1,
//     googleId: 'geruihagubgi242t616',
//     destinationName: 'Train Cafe',
//     lat: 37.781208,
//     long: -122.406514,
//     visit: 1,
//     likes: 1,
//   },
//   {
//     id: 2,
//     google_id: 'rrehgiuhgr48398649233',
//     destinationName: 'Coffee Cafe',
//     lat: 37.36725,
//     long: -122.4523,
//   }];
  
//   //make ajax request to google api and format data
//   const ajaxData = [{
//     id: '43186941368913fgdsognrfshbdb',
//     name: 'Off Da Rails Cafe',
//     lat: 37.783697,
//     long: -122.408966,
//   }];
  
//   res.send([sqlData.concat(ajaxData)]);
// });

app.get('/api/trains', (req, res) => {
  // 12:30 PM - 1:30 PM
  const trains = [{
    trainId: 1,
    stationId: 1,
    conductor: {id: 3, name: 'Griffin'},
    destinationName: 'Train Cafe',
    passengers: [{id: 1, name: 'Bobby'}, {id: 2, name: 'Batman'}],
    timeDeparting: 1455827400,
    timeBack: 1455787800,
    timeDuration: 39600,
  },
  // 1:30 PM - 2:30 PM
  {
    trainId: 2,
    stationId: 1,
    conductor: {id: 1, name: 'Bobby'},
    destinationName: 'Coffee Cafe',
    passengers: [{id: 3, name: 'Griffin'}, {id: 2, name: 'Batman'}],
    timeDeparting: 1455787800,
    timeBack: 1455791400,
    timeDuration: 39600,
  }]
  res.send(trains);
});


app.get('/', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
})

app.get('/api/destinations', ensureAuthenticated, (req, res) => {
  const slackTeamId = req.user.slackTeamId;
  db.Destination.findAll({
    include: [{
      model: Team,
      where: {slackTeamId},
    }]
  }).then((destinations) => {
    res.send(destinations);
  })
});

app.get('/api/trains', ensureAuthenticated, (req, res) => {
  const slackTeamId = req.user.slackTeamId;
  db.Train.findAll({
    include: [{
      model: Team,
      where: {slackTeamId}, 
    },
    {
      model: User,
    },
    {
      model: Destination,
    }]
  }).then((trains) => {
    res.send(trains);
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
  passport.authenticate('slack', {failureRedirect: '/login'}), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.post('/destinations', (req, res) => {
  const user = req.user;
  const data = req.body;

  //todo: modularize, refactor
  db.findOne({where: {id: user.id}}).then((user) => {
    db.Train.create({
      timeDeparting: data.timeDeparting,
      timeDuration: data.timeDuration,
    }).then((train) => {
      train.addConductor(user).then(() => {
        db.Destination.findOrCreate({
          googleId: data.googleId,
          name: data.name,
          lat: data.lat,
          long: data.long,
          visits: data.visits,
          likes: data.likes,
        }).spread((destination, created) => {
          return destination.addTrain(train);
        }).then(() => {
          res.send(200, "Train created");
        });
      });
    });
  });


});

app.post('/trains', (req, res) => {
  const data = req.body;
  const user = req.user;
  db.User.findOne({
    slackId: user.slackId,
  }).then((user) => {
    db.Train.findOne({
      id: data.id,
    }).then((train) => {
      return user.addTrain(train);
    }).then(() => {
      res.send(200, "Passenger added to train");
    })
  });
});

//force should be false/ommitted in production code
const init = require('./db/dummyData');

init().then(() => {
  console.log('Server is listening on port 8000');
  app.listen(8000);
});
