(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _routes = require('./routes.js');

var _routes2 = _interopRequireDefault(_routes);

var _getCurrentTrains = require('./utils/getCurrentTrains.js');

var _getCurrentTrains2 = _interopRequireDefault(_getCurrentTrains);

var _TrainsListEntryDropdown = require('./routes/Trains/components/TrainsListEntryDropdown.js');

var _TrainsListEntryDropdown2 = _interopRequireDefault(_TrainsListEntryDropdown);

var _TrainsListEntry = require('./routes/Trains/components/TrainsListEntry.js');

var _TrainsListEntry2 = _interopRequireDefault(_TrainsListEntry);

var _TrainsList = require('./routes/Trains/components/TrainsList.js');

var _TrainsList2 = _interopRequireDefault(_TrainsList);

var _App = require('./routes/Trains/App.js');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./routes.js":2,"./routes/Trains/App.js":3,"./routes/Trains/components/TrainsList.js":4,"./routes/Trains/components/TrainsListEntry.js":5,"./routes/Trains/components/TrainsListEntryDropdown.js":6,"./utils/getCurrentTrains.js":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
ReactDOM.render(React.createElement(
  Router,
  { history: browserHistory },
  React.createElement(Route, { path: "/", component: App })
), document.body);

exports.default = routes;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TrainsList = function (_React$Component) {
  _inherits(TrainsList, _React$Component);

  function TrainsList(props) {
    _classCallCheck(this, TrainsList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TrainsList).call(this, props));
  }

  _createClass(TrainsList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "trainsList", id: "trainsList" },
        this.props.trains ? this.props.trains.map(function (train) {
          return React.createElement(
            "div",
            { className: "trainAndDropdown", onClick: _this2.props.handleAccordionMap.bind(_this2, train.id, train.destination.lat, train.destination.lon, _this2.props.maps) },
            React.createElement(TrainsListEntry, { key: train.id, train: train, joinTrain: _this2.props.joinTrain }),
            React.createElement(TrainsListEntryDropdown, { train: train, ref: 'dropdown' + train.id, renderMap: _this2.props.renderMap, key: train.id + 'd', getCurrentLocation: _this2.props.getCurrentLocation })
          );
        }) : "Looks like there are no trains here!"
      );
    }
  }]);

  return TrainsList;
}(React.Component);

exports.default = TrainsList;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TrainsListEntry = function (_React$Component) {
  _inherits(TrainsListEntry, _React$Component);

  function TrainsListEntry(props) {
    _classCallCheck(this, TrainsListEntry);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TrainsListEntry).call(this, props));

    _this.state = {
      joined: false
    };
    return _this;
  }

  _createClass(TrainsListEntry, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "trainEntry" },
        React.createElement(
          "div",
          { className: "trainContainer" },
          React.createElement(
            "div",
            { className: "trainIconTimeWrapper" },
            React.createElement("div", { className: "trainIcon" }),
            React.createElement(
              "div",
              { className: "timeWrapper" },
              React.createElement(
                "div",
                { className: "time" },
                this.props.train.timeDeparting,
                " --- ",
                this.props.train.timeBack
              )
            )
          ),
          React.createElement(
            "div",
            { className: "trainDetailsWrapper" },
            React.createElement(
              "h2",
              { className: "trainDest" },
              this.props.train.destination.name
            ),
            React.createElement(
              "div",
              { className: "trainRatingsWrapper" },
              React.createElement(
                "div",
                { className: "likes col-xs-6" },
                React.createElement(
                  "div",
                  null,
                  "♥3"
                )
              ),
              React.createElement(
                "div",
                { className: "price col-xs-6" },
                React.createElement(
                  "div",
                  null,
                  "$$"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "passengersWrapper" },
            React.createElement(
              "div",
              { className: "conductor passenger" },
              React.createElement(
                "div",
                { className: "slackPic" },
                this.props.train.conductor.firstName
              )
            ),
            this.props.train.users.map(function (passenger) {
              return React.createElement(
                "div",
                { className: "passenger" },
                React.createElement(
                  "div",
                  { className: "slackPic" },
                  passenger.firstName
                )
              );
            }),
            React.createElement(
              "div",
              { className: "joinWrapper", onClick: function onClick(e) {
                  _this2.props.joinTrain(e, _this2.props.train, _this2.state.joined);
                  _this2.setState({
                    joined: true
                  });
                } },
              React.createElement(
                "div",
                { className: "joinArrow" },
                "»"
              )
            )
          )
        )
      );
    }
  }]);

  return TrainsListEntry;
}(React.Component);

exports.default = TrainsListEntry;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TrainsListEntryDropdown = function (_React$Component) {
  _inherits(TrainsListEntryDropdown, _React$Component);

  function TrainsListEntryDropdown(props) {
    _classCallCheck(this, TrainsListEntryDropdown);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TrainsListEntryDropdown).call(this, props));

    _this.state = {
      open: false,
      accordionClass: 'details'
    };
    return _this;
  }

  _createClass(TrainsListEntryDropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var coords = {
        currLat: null,
        currLon: null
      };
      var train = this.props.train;

      var getDirections = function getDirections() {
        if (!coords.currLat && !coords.currLon) {
          _this2.props.getCurrentLocation(function (currLat, currLon) {
            coords.currLat = currLat;
            coords.currLon = currLon;
          });
        } else {
          _this2.props.renderMap(train.destination.lat, train.destination.long, train.id, coords.currLat, coords.currLon);
          clearInterval(fetchingLoc);
        }
      };

      var fetchingLoc = setInterval(getDirections.bind(this), 1000);
    }
  }, {
    key: "render",
    value: function render() {
      var train = this.props.train;
      return React.createElement(
        "div",
        { className: this.state.accordionClass, ref: "dropdown" },
        React.createElement(
          "div",
          { className: "trainEntryDropdownWrapper" },
          React.createElement("div", { id: 'map' + train.id, className: "gmap col-xs-7" }),
          React.createElement("div", { id: 'mapPanel' + train.id, className: "gmapDir col-xs-5" })
        )
      );
    }
  }]);

  return TrainsListEntryDropdown;
}(React.Component);

exports.default = TrainsListEntryDropdown;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCurrentTrains = function getCurrentTrains(cb) {
  $.ajax({
    url: '/api/trains',
    type: 'GET',
    dataType: 'json',
    success: function success(data) {
      _.each(data, function (train) {
        // calculate return time
        train.timeBack = train.timeDeparting + train.timeDuration;
        // departing
        var td = new Date(train.timeDeparting * 1000);
        var tdHrs = convertHours(td.getHours());
        train.timeDeparting = tdHrs.hours + ':' + td.getMinutes() + ' ' + tdHrs.ap;
        // returning
        var tb = new Date(train.timeBack * 1000);
        var tbHrs = convertHours(tb.getHours());
        train.timeBack = tbHrs.hours + ':' + tb.getMinutes() + ' ' + tbHrs.ap;
      });
      console.log(data);
      cb(data);
    },
    error: function error(data) {
      console.error(data);
    }
  });
};

var convertHours = function convertHours(hours) {
  var ap = hours >= 12 ? 'PM' : 'AM';
  if (hours >= 12) {
    hours = hours === 12 ? hours : hours - 12;
  }
  return {
    hours: hours,
    ap: ap
  };
};

window.getCurrentTrains = getCurrentTrains;

exports.default = getCurrentTrains;

},{}]},{},[1]);
