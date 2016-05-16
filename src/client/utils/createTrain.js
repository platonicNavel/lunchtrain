import $ from 'jquery';

const createTrain = (d, d2, place_id, name, lat, lng, visits) => {
  $.ajax({
    url: '/destinations',
    type: 'POST',
    dataType: 'json',
    data: {
      name,
      lat,
      visits,
      timeDeparting: d,
      timeDuration: d2,
      googleId: place_id,
      long: lng,
    }
  });

};

window.createTrain = createTrain;

export default createTrain;
