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
