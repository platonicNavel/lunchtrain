import $ from 'jquery';
import _ from 'lodash';

const convertHours = (hours) => {
  const ap = hours >= 12 ? 'PM' : 'AM';
  if (hours >= 12) {
    hours = hours === 12 ? hours : hours - 12;
  }
  return {
    hours,
    ap,
  };
};

const getCurrentTrains = (cb) => {
  $.ajax({
    url: '/api/trains',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      _.each(data, (train) => {
        // calculate return time
        train.timeBack = train.timeDeparting + train.timeDuration;
        // departing
        const td = new Date(train.timeDeparting * 1000);
        const tdHrs = convertHours(td.getHours());
        train.timeDeparting = `${tdHrs.hours}:${td.getMinutes()} ${tdHrs.ap}`;
        // returning
        const tb = new Date(train.timeBack * 1000);
        const tbHrs = convertHours(tb.getHours());
        train.timeBack = `${tbHrs.hours}:${tb.getMinutes()} ${tbHrs.ap}`;
      });
      console.log(data);
      cb(data);
    },
    error: (data) => {
      console.error(data);
    },
  });
};


window.getCurrentTrains = getCurrentTrains;


export default getCurrentTrains;
