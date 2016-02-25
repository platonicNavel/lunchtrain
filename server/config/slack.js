const request = require('request');
const db = require('../db/index');
const _ = require('underscore');
const Sequelize = require('sequelize');


// todo: alert the user that this channel has/will be created
function createChannel(token) {
  request({
    uri: `https://slack.com/api/channels.create?token=${token}&name=lunchtrain`,
    method: 'POST',
  }, (err, res, body) => {
    console.log(body);
  });
}

// can probably make these request more robust relative to the posting channel
function slackAlert(token, destination, conductor, timeDeparting) {
  let str;
  if (arguments.length > 2) {
    str = `${conductor} has scheduled a train to ${destination} at ${timeDeparting}`;
  } else {
    str = `Train to ${destination} departing in 10 minutes`;
  }
  const queryStr = str.replace(' ', '%20');
  request({
    uri: `https://slack.com/api/chat.postMessage?token=${token}&channel=%23lunchtrain&text=${queryStr}&username=lunchtrain&icon_emoji=:bullettrain_side:`,
    method: 'POST',
  }, (err, res, body) => {
    // todo: record status code
    console.log(body);
  });
}

function alertDepartingTrains () {
  // only trains within 10 minutes of departure time get alert
  const alertWindow = Date.now() + 10 * 60 * 1000;
  db.Train.findAll({
    include: [db.Destination, { model: db.User, as: 'Conductor' }],
    where: {
      timeDeparting: {
        $lt: alertWindow,
      },
      alerted: false,
    }
  }).then((trainsToAlert) => {
    return Sequelize.Promise.map(trainsToAlert, (train) => {
      const token = train.dataValues.Conductor.dataValues.token;
      const dest = train.dataValues.Destination.dataValues.name;
      slackAlert(token, dest);
      return train.update({ alerted: true });
    });
  }).then(trainsAlerted => console.log(`${trainsAlerted.length} trains alerted`));
}

//check every minute for trains about to depart
setInterval(alertDepartingTrains, 1 * 60 * 1000);

module.exports = {
  createChannel,
};
