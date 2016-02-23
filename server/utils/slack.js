const request = require('request');

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
function trainAlert(conductor, destination, timeDeparting, token, scheduled) {
  let str;
  if (scheduled) {
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

module.exports = {
  createChannel,
  trainAlert,
};
