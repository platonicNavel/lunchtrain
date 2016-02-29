import $ from 'jquery';
import _ from 'lodash'

const createTrain = (d, d2, place_id, name, lat, lng, visits, local) => {
  console.log('LET\'S GOOOOOOOOOOOOOO', d, d2, place_id, name, lat, lng, visits)
  $.ajax({
    url: '/destinations',
    type: 'POST',
    dataType: 'json',
    data: {
      timeDeparting: d,
      timeDuration: d2,
      googleId: place_id,
      name: name,
      lat: lat,
      long: lng,
      visits: visits,
    }
  });

};

window.createTrain = createTrain;

export default createTrain;