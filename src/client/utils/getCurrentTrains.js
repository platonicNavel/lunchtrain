const getCurrentTrains = (cb) => {
  $.ajax({
    url: '/api/trains',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      _.each(data, function(train) {
        // calculate return time
        train.timeBack = train.timeDeparting+train.timeDuration;
        // departing
        let td = new Date(train.timeDeparting*1000);
        let tdHrs = convertHours(td.getHours());
        train.timeDeparting = `${tdHrs.hours}:${td.getMinutes()} ${tdHrs.ap}`;
        // returning
        let tb = new Date(train.timeBack*1000);
        let tbHrs = convertHours(tb.getHours());
        train.timeBack = `${tbHrs.hours}:${tb.getMinutes()} ${tbHrs.ap}`;
      });
      console.log(data)
      cb(data);
    },
    error: (data) => {
      console.error(data);
    }
  });
};

const convertHours = (hours) => {
  let ap = hours >= 12 ? 'PM' : 'AM';
  if (hours >= 12) {
    hours = hours === 12 ? hours : hours-12; 
  }
  return {
    hours: hours,
    ap: ap
  };
};

window.getCurrentTrains = getCurrentTrains;

export default getCurrentTrains;