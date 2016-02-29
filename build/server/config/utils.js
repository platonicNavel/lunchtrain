'use strict';

var path = require('path');
var db = require('../db/index');
var _ = require('underscore');
var slackUtils = require('./slack');

function serveIndex(req, res) {
  res.sendFile(path.join(__dirname, '../../../views/index.html'));
}

function serveLogin(req, res) {
  res.sendFile(path.join(__dirname, '../../../views/login.html'));
}

function getDestinations(req, res) {
  var slackTeamId = req.user.slackTeamId;
  db.Destination.findAll({
    include: [{
      model: db.Team,
      where: { slackTeamId: slackTeamId }
    }]
  }).then(function (destinations) {
    var formattedDestinations = destinations.map(function (destination) {
      var formattedDestination = {
        name: destination.dataValues.name,
        lat: destination.dataValues.lat,
        long: destination.dataValues.long
      };
      return formattedDestination;
    });
    res.send(formattedDestinations);
  });
}

function getTrains(req, res) {
  var slackTeamId = req.user.slackTeamId;
  db.Train.findAll({
    include: [{
      model: db.Team,
      where: { slackTeamId: slackTeamId }
    }, {
      model: db.User
    }, {
      model: db.User,
      as: 'Conductor'
    }, {
      model: db.Destination
    }]
  }).then(function (trains) {
    var formattedTrains = trains.map(function (train) {
      var formattedTrain = {
        id: train.dataValues.id,
        timeDeparting: train.dataValues.timeDeparting,
        timeDuration: train.dataValues.timeDuration,
        users: train.dataValues.Users.map(function (user) {
          return _.pick(user, 'id', 'slackId', 'firstName', 'lastName', 'gravatar');
        }),
        conductor: train.dataValues.Conductor,
        destination: _.omit(train.dataValues.Destination.dataValues, 'createdAt', 'updatedAt')
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
  var user = req.user;
  var data = req.body;

  db.User.findOne({
    where: { id: user.id },
    include: [{ model: db.Team, where: { slackTeamId: user.slackTeamId } }]
  }).then(function (dbUser) {
    db.Train.create({
      timeDeparting: data.timeDeparting,
      timeDuration: data.timeDuration
    }).then(function (train) {
      train.setConductor(dbUser).then(function () {
        console.log('>>>>>', dbUser.dataValues);
        train.setTeam(dbUser.dataValues.Teams[0]).then(function () {

          db.Destination.findOrCreate({ where: {
              googleId: data.googleId
            }, defaults: {
              name: data.name,
              lat: data.lat,
              long: data.long,
              visits: data.visits,
              likes: data.likes
            } }).spread(function (destination) {
            return destination.addTrain(train);
          }).then(function () {
            slackUtils.slackAlert(user.accessToken, data.name, user.firstName, data.timeDeparting);
            res.send(200, 'Train created');
          });
        });
      });
    });
  });
}

function boardTrain(req, res) {
  var data = req.body;
  var user = req.user;
  db.User.findOne({
    where: { slackId: user.slackId }
  }).then(function (dbUser) {
    db.Train.findOne({
      where: { id: data.id }
    }).then(function (train) {
      return dbUser.addTrain(train);
    }).then(function () {
      res.send(200, req.user);
    });
  });
}

function serveNotFound(req, res) {
  res.send(404, 'Page does not exist!');
}

module.exports = {
  serveIndex: serveIndex,
  serveLogin: serveLogin,
  getDestinations: getDestinations,
  getTrains: getTrains,
  serveDestinations: serveDestinations,
  serveTrains: serveTrains,
  serveLogout: serveLogout,
  indexRedirect: indexRedirect,
  createTrain: createTrain,
  boardTrain: boardTrain,
  serveNotFound: serveNotFound
};
