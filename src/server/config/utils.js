const path = require('path');
const db = require('../db/index');
const _ = require('underscore');
const slackUtils = require('./slack');

function serveIndex(req, res) {
  res.sendFile(path.join(__dirname, '../../../views/index.html'));
}

function serveLogin(req, res) {
  res.sendFile(path.join(__dirname, '../../../views/login.html'));
}

function getDestinations(req, res) {
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
}

function getTrains(req, res) {
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
        users: train.dataValues.Users.map((user) => {
          return _.pick(user, 'id', 'slackId', 'firstName', 'lastName', 'gravatar');
        }),
        conductor: train.dataValues.Conductor,
        destination: _.omit(train.dataValues.Destination.dataValues, 'createdAt', 'updatedAt'),
      };
      return formattedTrain;
    });
    res.send(formattedTrains);
  });
}

function serveDestinations(req, res) {
  res.sendFile(path.join(__dirname, '../../../views/destinations.html'));
}

function serveTrains(req, res) {
  res.sendFile(path.join(__dirname, '../../../views/trains.html'));
}

function serveLogout(req, res) {
  req.logout();
  res.redirect('/auth/slack');
}

function indexRedirect(req, res) {
  res.redirect('/');
}

function createTrain(req, res) {
  const user = req.user;
  const data = req.body;
  console.log(data)
  db.User.findOne({ where: { id: user.id } }).then((dbUser) => {
    db.Train.create({
      timeDeparting: data.timeDeparting,
      timeDuration: data.timeDuration,
    }).then((train) => {
      train.setConductor(dbUser).then(() => {
        db.Destination.findOrCreate({ where: {
          googleId: data.googleId
        }, defaults: {
          name: data.name,
          lat: data.lat,
          long: data.long,
          visits: data.visits,
          likes: data.likes,
        }}).spread(destination => destination.addTrain(train)).then(() => {
          slackUtils.slackAlert(user.accessToken, data.name, user.firstName, data.timeDeparting);
          res.send(200, 'Train created');
        });
      });
    });
  });
}

function boardTrain(req, res) {
  const data = req.body;
  const user = req.user;
  db.User.findOne({
    where: { slackId: user.slackId },
  }).then((dbUser) => {
    db.Train.findOne({
      where: { id: data.id },
    }).then(train => dbUser.addTrain(train)).then(() => {
      res.send(200, req.user);
    });
  });
}

function serveNotFound(req, res) {
  res.send(404, 'Page does not exist!');
}

module.exports = {
  serveIndex,
  serveLogin,
  getDestinations,
  getTrains,
  serveDestinations,
  serveTrains,
  serveLogout,
  indexRedirect,
  createTrain,
  boardTrain,
  serveNotFound,
};
