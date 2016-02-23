const request = require('request');

/*
  slackbot emoji - :bullettrain_side:
*/

//todo: alert the user that this channel has/will be created
function createChannel(token) {
  request({
    uri: `https://slack.com/api/channels.create?token=${token}&name=lunchtrain`,
    method: 'POST',
  }, (err, res, body) => {
    console.log(body);
  });
}

function trainScheduled() {
}

function trainDeparting() {
}

module.exports = {
  createChannel,
  trainScheduled,
  trainDeparting,
}