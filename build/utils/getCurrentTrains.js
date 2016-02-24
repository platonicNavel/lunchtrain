'use strict';

var getCurrentTrains = function getCurrentTrains(stationId, cb) {
  $.ajax({
    url: '/api/trains',
    type: 'GET',
    dataType: 'json',
    success: function success(data) {
      _.each(data, function (train) {
        train.timeBack = train.timeDeparting + train.timeDuration;
        var td = new Date(train.timeDeparting * 1000);
        train.timeDeparting = td.getHours() + ':' + td.getMinutes();
        var tb = new Date(train.timeBack * 1000);
        train.timeBack = tb.getHours() + ':' + tb.getMinutes();
      });
      console.log(data);
      cb(data);
    },
    error: function error(data) {
      console.error(data);
    }
  });
};

window.getCurrentTrains = getCurrentTrains;