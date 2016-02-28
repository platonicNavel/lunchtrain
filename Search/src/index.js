//google api in html head we need to put this 
//<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxXjy2uKnQcnU1SxfaSil-fY5ek_nmkE4&libraries=places"></script>
// <style>
//     #map {
//       width: 500px;
//       height: 500px;
//     }
// </style>
// need to do in order to show the google map
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Map from './component/map';
import Lists from './component/lists';
//import FoodListEntry from './component/FoodListEntry';
import localMap from './component/localMap';
import localLists from './component/localLists';


let map;
let service;
let infowindow;
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      recommend: false,
      lat: 37.783756,
      lng: -122.40921549999999
    } 

  }
  // set the default HR lat lng, otherwise, users locationcheck
  // resultLocation is google place API default is restaurant and half mile radius
  navi() {
    navigator.geolocation.getCurrentPosition(function(position) {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    }.bind(this));
  } 

  onClicks() {
    this.setState({
      recommend: true
    })
  }

  onRevese() {
    this.setState({
      recommend: false
    })
  }

  getPlace() {
    const initMap = () => {
      let city = {lat: this.state.lat, lng: this.state.lng};

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
    };
    
    const callback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        this.setState({
          list: results
        });
        console.log('after ', this.state.list)
      }
    };

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
    };
    google.maps.event.addDomListener(window, 'load', initMap);
  }
  
  locatGetPlace() {
    $.ajax({
      url: '/api/trains',
      type: 'GET',
      datatype: 'json',
      success: function(data) {
        this.setState({
          list: data
        });
        this.locations();
        console.log('after local ', this.state.list);
      },
      error: function(data) {
        console.error(data);
      }
    });
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    const locations = () => {
      const lists = this.state.list;
      for(var i = 0 ; i < lists.length; i ++ ) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(lists[i]['destination'].lat, lists[i]['destination'].long),
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(lists[i]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
    }
  }

  handleDropdown() {
    return (
      alert('hi')
    )
  }

  componentDidMount() {
    this.navi();
  };

  render() {
    if( !this.state.recommend ) {
      return(
        <div>
          <div>
            <button onClick={this.onRevese.bind(this)}>Google</button>
            <button onClick={this.onClicks.bind(this)}>Recommendation</button>
          </div>
          <div>
            <Map onMapShow={this.getPlace.bind(this)}/>
            <Lists list={this.state.list} handleDropdown={this.handleDropdown.bind(this)}/>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <button onClick={this.onRevese.bind(this)}>Google</button>
            <button onClick={this.onClicks.bind(this)}>Recommendation</button>
          </div>
          <div>
            <localMap onMapShow={this.locatGetPlace.bind(this)}/>
            <localLists list={this.state.list}/>
          </div>
        </div>
      )
    }
  }
}



ReactDOM.render(<App />, document.querySelector('.app'))
