const express = require('express');
const path = require('path');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;


passport.serializeUser(function(user, done) {
  console.log('serialized: ', user);
  // Determine what user info to store in the session
  done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
  console.log('deserialize: ', userId);
  // 

});

passport.use(new GitHubStrategy({

}))

const app = express();

app.use(express.static(path.join(__dirname, '../static')));
app.use('/build', express.static(path.join(__dirname, '../build')));

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

console.log('Server is listening on port 8000');
app.listen(8000);
