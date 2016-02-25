"use strict";

var TrainsList = function TrainsList(_ref) {
  var trains = _ref.trains;
  var joinTrain = _ref.joinTrain;

  return React.createElement(
    "div",
    { className: "trainsList" },
    trains ? trains.map(function (train) {
      return React.createElement(TrainsListEntry, { key: train.trainId, train: train, joinTrain: joinTrain });
    }) : "Looks like there are no trains here!"
  );
};