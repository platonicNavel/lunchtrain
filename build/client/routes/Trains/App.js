'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this.state = {
      trains: [],
      currLat: null,
      currLon: null,
      maps: []
    };
    return _this;
  }

  _createClass(App, [{
    key: 'getCurrentLocation',
    value: function getCurrentLocation(cb) {
      var _this2 = this;

      if (!cb) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          _this2.setState({
            currLat: +pos.coords.latitude,
            currLon: +pos.coords.longitude
          });
          console.log(_this2.state);
        });
      } else {
        cb(this.state.currLat, this.state.currLon);
      }
    }
  }, {
    key: 'joinTrain',
    value: function joinTrain(e, train, joined) {
      var _this3 = this;

      if (joined) {
        console.warn('You already joined this train, though.');return;
      }
      e.stopPropagation();
      console.log('join train, id = ', train.id);
      $.ajax({
        url: '/trains',
        type: 'POST',
        data: { 'id': train.id },
        success: function success(data) {
          console.log('POST successful', data);
          var me = {
            firstName: data.firstName,
            lastName: data.lastName,
            id: data.id,
            slackId: data.slackId
          };
          train.users.push(me);
          _this3.forceUpdate();
        }
      });
      console.log(train.users);
    }
  }, {
    key: 'handleAccordionMap',
    value: function handleAccordionMap(id, lat, lon, map) {
      console.log('accordion', this.refs['dropdown' + id], map, this.props.currentLoc);
      var clickedTrain = this.refs['dropdown' + id];
      if (clickedTrain.state.open) {
        clickedTrain.setState({
          open: false,
          accordionClass: "details"
        });
      } else {
        clickedTrain.setState({
          open: true,
          accordionClass: "details open"
        });
        var fixMap = function fixMap(map, currentLoc) {
          map.setZoom(15);
          google.maps.event.trigger(map, "resize");
        };
        _.delay(fixMap, 500, map[id - 1], this.props.currentLoc);
      }
    }
  }, {
    key: 'getTeamTrains',
    value: function getTeamTrains() {
      var _this4 = this;

      getCurrentTrains(function (trains) {
        _this4.setState({
          trains: trains
        });
      });
    }
  }, {
    key: 'renderMap',
    value: function renderMap(lat, lon, id, currLat, currLon) {

      console.log('dest', lat, lon, id, currLat, currLon);

      var map = new google.maps.Map(document.getElementById('map' + id), {
        center: { lat: +lat, lng: +lon },
        zoom: 15
      });

      var directionsDisp = new google.maps.DirectionsRenderer({
        map: map
      });

      var directionsService = new google.maps.DirectionsService();

      var renderDirections = function renderDirections(currLat, currLon) {
        console.log('rendering directions');
        var req = {
          destination: { lat: +lat, lng: +lon },
          origin: { lat: currLat, lng: currLon },
          travelMode: google.maps.TravelMode.WALKING,
          provideRouteAlternatives: true
        };

        directionsService.route(req, function (res, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            console.log(status);
            directionsDisp.setDirections(res);
            directionsDisp.setPanel(document.getElementById('mapPanel' + id));
          }
        });
      };

      renderDirections(currLat, currLon);
      this.state.maps.push(map);
      console.log(this.state.maps);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getTeamTrains();
      this.getCurrentLocation();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'trainsView container' },
          React.createElement(TrainsList, { trains: this.state.trains, handleAccordionMap: this.handleAccordionMap, joinTrain: this.joinTrain.bind(this), renderMap: this.renderMap.bind(this), getCurrentLocation: this.getCurrentLocation.bind(this), maps: this.state.maps, currentLoc: { lat: this.state.currLat, lng: this.state.currLon } })
        )
      );
    }
  }]);

  return App;
}(React.Component);

exports.default = App;
