'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _map = require('./component/map');

var _map2 = _interopRequireDefault(_map);

var _lists = require('./component/lists');

var _lists2 = _interopRequireDefault(_lists);

var _localMap = require('./component/localMap');

var _localMap2 = _interopRequireDefault(_localMap);

var _localLists = require('./component/localLists');

var _localLists2 = _interopRequireDefault(_localLists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //google api in html head we need to put this
//<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxXjy2uKnQcnU1SxfaSil-fY5ek_nmkE4&libraries=places"></script>
// <style>
//     #map {
//       width: 500px;
//       height: 500px;
//     }
// </style>
// need to do in order to show the google map

//import FoodListEntry from './component/FoodListEntry';


var map = undefined;
var service = undefined;
var infowindow = undefined;

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this.state = {
      list: [],
      recommend: false,
      lat: 37.783756,
      lng: -122.40921549999999
    };

    return _this;
  }
  // set the default HR lat lng, otherwise, users locationcheck
  // resultLocation is google place API default is restaurant and half mile radius


  _createClass(App, [{
    key: 'navi',
    value: function navi() {
      navigator.geolocation.getCurrentPosition(function (position) {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }.bind(this));
    }
  }, {
    key: 'onClicks',
    value: function onClicks() {
      this.setState({
        recommend: true
      });
    }
  }, {
    key: 'onRevese',
    value: function onRevese() {
      this.setState({
        recommend: false
      });
    }
  }, {
    key: 'getPlace',
    value: function getPlace() {
      var _this2 = this;

      var initMap = function initMap() {
        var city = { lat: _this2.state.lat, lng: _this2.state.lng };

        map = new google.maps.Map(document.getElementById("map"), {
          center: city,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: city,
          radius: 500,
          types: ['restaurant', 'cafe']
        }, callback);
      };

      var callback = function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          _this2.setState({
            list: results
          });
          console.log('after ', _this2.state.list);
        }
      };

      var createMarker = function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      };
      google.maps.event.addDomListener(window, 'load', initMap);
    }
  }, {
    key: 'locatGetPlace',
    value: function locatGetPlace() {
      var _this3 = this;

      $.ajax({
        url: '/api/trains',
        type: 'GET',
        datatype: 'json',
        success: function success(data) {
          this.setState({
            list: data
          });
          this.locations();
          console.log('after local ', this.state.list);
        },
        error: function error(data) {
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

      var locations = function locations() {
        var lists = _this3.state.list;
        for (var i = 0; i < lists.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(lists[i]['destination'].lat, lists[i]['destination'].long),
            map: map
          });

          google.maps.event.addListener(marker, 'click', function (marker, i) {
            return function () {
              infowindow.setContent(lists[i]);
              infowindow.open(map, marker);
            };
          }(marker, i));
        }
      };
    }
  }, {
    key: 'handleDropdown',
    value: function handleDropdown() {
      return alert('hi');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.navi();
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.recommend) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'button',
              { onClick: this.onRevese.bind(this) },
              'Google'
            ),
            _react2.default.createElement(
              'button',
              { onClick: this.onClicks.bind(this) },
              'Recommendation'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_map2.default, { onMapShow: this.getPlace.bind(this) }),
            _react2.default.createElement(_lists2.default, { list: this.state.list, handleDropdown: this.handleDropdown.bind(this) })
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'button',
              { onClick: this.onRevese.bind(this) },
              'Google'
            ),
            _react2.default.createElement(
              'button',
              { onClick: this.onClicks.bind(this) },
              'Recommendation'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('localMap', { onMapShow: this.locatGetPlace.bind(this) }),
            _react2.default.createElement('localLists', { list: this.state.list })
          )
        );
      }
    }
  }]);

  return App;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.querySelector('.app'));