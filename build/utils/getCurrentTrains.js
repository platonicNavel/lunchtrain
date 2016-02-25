'use strict';

var getCurrentTrains = function getCurrentTrains(cb) {
  $.ajax({
    url: '/api/trains',
    type: 'GET',
    dataType: 'json',
    success: function success(data) {
      _.each(data, function (train) {
        // calculate return time
        train.timeBack = train.timeDeparting + train.timeDuration;
        // departing
        var td = new Date(train.timeDeparting * 1000);
        var tdHrs = convertHours(td.getHours());
        train.timeDeparting = tdHrs.hours + ':' + td.getMinutes() + ' ' + tdHrs.ap;
        // returning
        var tb = new Date(train.timeBack * 1000);
        var tbHrs = convertHours(tb.getHours());
        train.timeBack = tbHrs.hours + ':' + tb.getMinutes() + ' ' + tbHrs.ap;
      });
      console.log(data);
      cb(data);
    },
    error: function error(data) {
      console.error(data);
    }
  });
};

var convertHours = function convertHours(hours) {
  var ap = hours >= 12 ? 'PM' : 'AM';
  if (hours >= 12) {
    hours = hours === 12 ? hours : hours - 12;
  }
  return {
    hours: hours,
    ap: ap
  };
};

window.getCurrentTrains = getCurrentTrains;