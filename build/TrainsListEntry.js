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
        ),
        React.createElement(
          "div",
          { className: "trainRatingsWrapper col-xs-12" },
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
          React.createElement("div", { className: "slackPic" })
        ),
        train.passengers.map(function (passenger) {
          return React.createElement(
            "div",
            { className: "passenger" },
            React.createElement("div", { className: "slackPic" })
          );
        })
      )
    )
  );
};