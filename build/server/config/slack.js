'use strict';

var request = require('request');
var db = require('../db/index');
var _ = require('underscore');
var Sequelize = require('sequelize');

// todo: alert the user that this channel has/will be created
function createChannel(token) {
  request({
    uri: 'https://slack.com/api/channels.create?token=' + token + '&name=lunchtrain',
    method: 'POST'
  }, function (err, res, body) {
    console.log(body);
  });
}

// can probably make these request more robust relative to the posting channel
function slackAlert(token, destination, conductor, timeDeparting) {
  var str = undefined;
  if (arguments.length > 2) {
    // todo: make conductor @username, format timeDeparting
    str = conductor + ' has scheduled a train to ' + destination + ' at ' + timeDeparting;
  } else {
    str = 'Train to ' + destination + ' departing in 10 minutes';
  }
  var queryStr = str.replace(' ', '%20');
  request({
    uri: 'https://slack.com/api/chat.postMessage?token=' + token + '&channel=%23lunchtrain&text=' + queryStr + '&username=lunchtrain&icon_emoji=:bullettrain_side:',
    method: 'POST'
  }, function (err, res, body) {
    // todo: record status code
    console.log(body);
  });
}

function alertDepartingTrains() {
  // only trains within 10 minutes of departure time get alert
  var alertWindow = Date.now() + 10 * 60 * 1000;
  db.Train.findAll({
    include: [db.Destination, { model: db.User, as: 'Conductor' }],
    where: {
      timeDeparting: {
        $lt: alertWindow
      },
      alerted: false
    }
  }).then(function (trainsToAlert) {
    return Sequelize.Promise.map(trainsToAlert, function (train) {
      var token = train.dataValues.Conductor.dataValues.token;
      var dest = train.dataValues.Destination.dataValues.name;
      slackAlert(token, dest);
      return train.update({ alerted: true });
    });
  }).then(function (trainsAlerted) {
    return console.log(trainsAlerted.length + ' trains alerted');
  });
}

//check every minute for trains about to depart
setInterval(alertDepartingTrains, 1 * 60 * 1000);

module.exports = {
  createChannel: createChannel
};
