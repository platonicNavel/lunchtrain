const express = require('express');
const path = require('path');
// const partials = require('express-partials');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;

const db = require('./db/index');

const app = express();

app.use(session({secret:'asdfqwertty'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  db.User.findOne({where: {id: user.id}}).then((user) => {
    done(null, user);
  }).catch((err) => {
    done(err, null);
  });
});

passport.use(new SlackStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: '/auth/slack/callback',
  scope: 'incoming-webhook users:read',
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
          console.log('team: ', team);
          if (!userCreated && !teamCreated) { //TODO: ADDRESS EDGE CASE
            console.log('Team and user exist already');
          } else {
            console.log('User and team created');
            return user.addTeam(team);
          }
        }).then(() => {
          console.log('Returning user info for serialization');
          user.teamName = teamName;
          user.slackTeamId = slackTeamId;
          return done(null, user);
        });
      });
}));


// app.use(express.static(path.join(__dirname, '../static')));
app.use('/build', express.static(path.join(__dirname, '../build')));

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
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
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/login.html'));
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
  console.log(req);
  const data = req.body;
  db.Train.create({
    timeDeparting: data.timeDeparting,
    timeDuration: data.timeDuration,
  }).then((train) => {
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
db.sequelize.sync({force: true}).then(() => {
  console.log('Server is listening on port 8000');
  app.listen(8000);
});
