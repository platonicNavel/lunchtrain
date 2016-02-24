//google api in html head we need to put this 
//<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxXjy2uKnQcnU1SxfaSil-fY5ek_nmkE4&libraries=places"></script>
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Map from './component/map';
import Lists from './component/lists';

let lat, lng;
let map;
let service;
let infowindow;
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      list: []
    }
    //this.getPlace();
  }
  // set the default HR lat lng, otherwise, users locationcheck
  // resultLocation is google place API default is restaurant and half mile radius
  getPlace() {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude
      lng = position.coords.longitude;
    });
    if( lat === undefined ) { lat = 37.783756 }
    if( lng === undefined ) { lng = -122.40921549999999 }
    const initMap = () => {
      let city = {lat: lat, lng: lng};

      map = new google.maps.Map(document.getElementById("map"), {
        center: city,
        zoom: 15
      });

      infowindow = new google.maps.InfoWindow();

      let service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: city,
        radius: 500,
        types: ['restaurant','cafe']
      }, callback);
    }


    const callback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    const createMarker = (place) => {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
    google.maps.event.addDomListener(window, 'load', initMap);
  }

  render() {
    return (
      <div>
        <Map onMapShow={this.getPlace}/>
        <Lists />
      </div>
    )
  }
}



ReactDOM.render(<App />, document.querySelector('.app'))
