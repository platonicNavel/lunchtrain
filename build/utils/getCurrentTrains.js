'use strict';

var getCurrentTrains = function getCurrentTrains(stationId, cb) {
  console.log(stationId);
  $.ajax({
    url: '/api/trains',
    type: 'GET',
    dataType: 'json',
    success: function success(data) {
      console.log(data);
      cb(data);
    },
    error: function error(data) {
      console.error(data);
    }
  });
};

window.getCurrentTrains = getCurrentTrains;