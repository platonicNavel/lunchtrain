import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import GoogleMap from './components/GoogleMap.js';
import GoogleList from './components/GoogleList.js';
import LocalMap from './components/LocalMap.js';
import LocalList from './components/LocalList.js';

import $ from 'jquery';


let map;
let service;
let infowindow;

class Destinations extends Component {
    constructor(props){
      super(props);
      this.state = {
        list: [],
        recommend: false,
        lat: null,
        lng: null,
        rendering: true
      } 
    }
    // set the default HR lat lng, otherwise, users locationcheck
    // resultLocation is google place API default is restaurant and half mile radius

    navi() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: +position.coords.latitude,
          lng: +position.coords.longitude,
        })
      });
    }

    componentDidMount() {
      this.navi();
    };

    onClicks() {
      this.locatGetPlace();
      this.setState({
        recommend: true
      })
    }

    onRevese() {
      this.getPlace();
      this.setState({
        recommend: false,
        redering: true
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

        service = new google.maps.places.PlacesService(map);
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
      let iniRender;
      if(this.state.redering === false) {
        iniRender = '';
      } else {
        iniRender = initMap.bind(this);
        this.setState({
          redering: false
        })
      }
      google.maps.event.addDomListener(window, 'load', setTimeout( iniRender, 3000) );
    }
    
    locatGetPlace() {
      $.ajax({
        url: '/api/destinations',
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

      var map = new google.maps.Map(document.getElementById('maps'), {
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
      google.maps.event.addDomListener(window, 'load', locatGetPlace);
    }


    render() {
      if( this.state.lat === null || this.state.lng === null) {
        return (
          <div>Loading...</div>
        )
      } else {
        if( !this.state.recommend ) {
          return(
            <div>

              <div>
                <button onClick={this.onRevese.bind(this)} >Google</button>
                <button onClick={this.onClicks.bind(this)}>Recommendation</button>
              </div>
              <br />

                <div id="map">
                  <GoogleMap onMapShow={ this.getPlace.bind(this) }/>
                </div>
                <div>
                  <GoogleList list={this.state.list} />
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
              <div id="maps">
                <localMap onMapShows={this.locatGetPlace.bind(this)}/>
              </div>
              <div>
                <localLists list={this.state.list}/>
              </div>
            </div>
          )
        }
      }
    }
  }
export default Destinations;

