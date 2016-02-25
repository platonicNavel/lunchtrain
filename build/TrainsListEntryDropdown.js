"use strict";

var TrainsListEntryDropdown = function TrainsListEntryDropdown(_ref) {
  var train = _ref.train;
  var accordionClass = _ref.accordionClass;

  return React.createElement(
    "div",
    { className: accordionClass },
    React.createElement("div", { className: "trainEntryDropdownWrapper" })
  );
};