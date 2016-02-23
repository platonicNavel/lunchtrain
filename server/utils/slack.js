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

//can probably make these request more robust relative to the posting channel
function trainScheduled(conductor, destination, departure, token) {
  const str = `${conductor} has scheduled a train to ${destination} at ${departure}`;
  const queryStr = str.replace(' ', '%20')
  request({
    uri: `https://slack.com/api/chat.postMessage?token=${token}&channel=%23lunchtrain&text=${queryStr}&username=lunchtrain&icon_emoji=:bullettrain_side:`,
    method: 'POST'
  }, (err, res, body) => {
    //todo: record status code
    console.log('Message posted');
  });
}

function trainDeparting(conductor, destination, departure) {

}

module.exports = {
  createChannel,
  trainScheduled,
  trainDeparting,
}