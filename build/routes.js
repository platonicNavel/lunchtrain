"use strict";

ReactDOM.render(React.createElement(
  Router,
  { history: browserHistory },
  React.createElement(Route, { path: "/", component: App })
), document.body);