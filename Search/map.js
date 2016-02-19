const Maps () => {
  let map;
  let service;
  let place;
  let lat;
  let lng;
  let results;
  // catagory will change the by select the drop menu in select.js
  let catagory;

  let latLng => (city) {
    let geocoder =  new google.maps.Geocoder();
    geocoder.geocode({ 'address': city}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        //alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng()); 
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng()
        initialize(city)
      } else {
        alert("Something got wrong " + status);
      }
    })
    let initialize(city) {
      let city = new google.maps.LatLng(lat, lng);

      map = new google.maps.Map(document.getElementById('search'), {
          center: city,
          zoom: 15
        });

      let request = {
        location: city,
        radius: '160',
        query: catagory
      };

      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);
    }
  }

  const callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < 10; i++) {
        place = results[i];
      }
    }
  }

  const infowindow = new google.maps.InfoWindow();

  let marker, i;

  for (i = 0; i < place.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(place[i][1], place[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(place[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

  render() {
    return (
      //in html
      //<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key= put key in here &libraries=places"></script>
      <insert type="text" placeholder="type the city"
      <div id="map">
      </div>
    )
  }
}

window.Maps = maps;