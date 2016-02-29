"use strict";

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