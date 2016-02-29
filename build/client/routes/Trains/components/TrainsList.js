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
