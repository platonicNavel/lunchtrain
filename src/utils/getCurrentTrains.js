const getCurrentTrains = (stationId, cb) => {
  $.ajax({
    url: '/api/trains',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      _.each(data, function(train) {
        let td = new Date(train.timeDeparting*1000);
        train.timeDeparting = `${td.getHours()}:${td.getMinutes()}`
        let tb = new Date(train.timeBack*1000);
        train.timeBack = `${tb.getHours()}:${tb.getMinutes()}`
      });
      console.log(data)
      cb(data);
    },
    error: (data) => {
      console.error(data);
    }
  });
}

window.getCurrentTrains = getCurrentTrains;