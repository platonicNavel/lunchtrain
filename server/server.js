const express = require('express');
const path = require('path');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;

const db = require('./db/index');

var CLIENT_ID = "--insert-client-id-here--"
var CLIENT_SECRET = "--insert-client-secret-here--";


passport.serializeUser(function(user, done) {
  console.log('serialized: ', user.name);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialized: ', userId);
  db.User.find({where: {id: id}}).success(function(user) {
    done(null, user);
  }).error(function(err) {
    done(err, null);
  });
});

passport.use(new SlackStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: '',
  slackTeam: '',
},
  function(accessToken, refreshToken, profile, done) {
    // Make asynchronous
    process.nextTick(function() {
    // Find user if it exists, create it if it doesn't
    db.User.findOrCreate({where: {slack_id: profile.id, name: profile.name}})
    // Spread results from findOrCreate over arguments of function
    .spread(function(user, created) {
      if (created) { // If user was created for the first time
        // Insert team
        // 
        console.log('User existed: ', user);
        return done(null, profile);
      } else { // Else if user was already in the database
        console.log('Created user: ', created);
        //return something?
      }
    });
  })
}));

var app = express();

app.use(session({secret:'asdfqwertty'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../static')));
app.use('/build', express.static(path.join(__dirname, '../build')));

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/github');
  }
};

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/api/destinations', (req, res) => {
  //make database query
  const sqlData = [{
    id: 1,
    google_id: 'geruihagubgi242t616',
    destinationName: 'Train Cafe',
    lat: 37.781208,
    long: -122.406514,
    visit: 1,
    likes: 1,
  },
  {
    id: 2,
    google_id: 'rrehgiuhgr48398649233',
    destinationName: 'Coffee Cafe',
    lat: 37.36725,
    long: -122.4523,
  }];
  
  //make ajax request to google api and format data
  const ajaxData = [{
    id: '43186941368913fgdsognrfshbdb',
    name: 'Off Da Rails Cafe',
    lat: 37.783697,
    long: -122.408966,
  }];
  
  res.send([sqlData.concat(ajaxData)]);
});

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

app.get('/auth/slack',
  passport.authenticate('slack'));

app.get('/auth/slack/callback',
  passport.authenticate('slack', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

console.log('Server is listening on port 8000');
app.listen(8000);
