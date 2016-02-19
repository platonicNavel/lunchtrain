"use strict";

var TrainsListEntry = function TrainsListEntry(_ref) {
  var train = _ref.train;
  var handleTrainBoardingClick = _ref.handleTrainBoardingClick;
  return React.createElement(
    "div",
    { className: "trainEntry" },
    React.createElement(
      "div",
      { className: "trainContainer" },
      React.createElement("div", { className: "trainIcon" })
    )
  );
};