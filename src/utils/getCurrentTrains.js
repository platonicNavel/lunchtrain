const getCurrentTrains = (stationId, cb) => {
  console.log(stationId)
  $.ajax({
    url: '/api/trains',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log(data)
      cb(data);
    },
    error: (data) => {
      console.error(data);
    }
  });
}

window.getCurrentTrains = getCurrentTrains;