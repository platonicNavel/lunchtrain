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
            train.timeDeparting,
            "---",
            train.timeBack
          )
        )
      ),
      React.createElement(
        "div",
        { className: "trainDetailsWrapper" },
        React.createElement(
          "h2",
          { className: "trainDest" },
          train.destinationName
        )
      )
    )
  );
};