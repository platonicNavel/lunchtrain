const express = require('express');

const auth = require('./config/auth');
const path = require('path');
const slackUtils = require('./config/slack');
const _ = require('underscore');

const db = require('./db/index');

const app = express();
require('./config/middleware.js')(app, express);

app.get('/', auth.ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/api/destinations', auth.ensureAuthenticated, (req, res) => {
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

app.get('/api/trains', auth.ensureAuthenticated, (req, res) => {
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
        // Use forEach for users, conductor and destination
        users: train.dataValues.Users.map((user) => {
          return _.pick(user, 'id', 'slackId', 'firstName', 'lastName');
        }),
        conductor: train.dataValues.Conductor,
        destination: _.omit(train.dataValues.Destination.dataValues, 'createdAt', 'updatedAt'),
      };
      return formattedTrain;
    });
    res.send(formattedTrains);
  });
});

app.get('/destinations', auth.ensureAuthenticated, (req, res) => {
  res.render('destinations');
});

app.get('/trains', auth.ensureAuthenticated, (req, res) => {
  res.render('trains');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/slack');
});

app.get('/auth/slack', auth.slackAuth);

app.get('/auth/slack/callback', auth.slackAuthCallback, (req, res) => {
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

app.get('/*', (req, res) => {
  res.send(404, "Page does not exist!");
});

// force should be false/ommitted in production code
const init = require('./db/dummyData');

init().then(() => {
  console.log('Server is listening on port 8000');
  app.listen(8000);
});
