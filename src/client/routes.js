import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Login from './routes/Login/App.js';
import Landing from './routes/Landing/App.js';
import Destinations from './routes/Destinations/App.js';
import Trains from './routes/Trains/App.js';

const routes = ReactDOM.render((

  <Router history={browserHistory}>
    <Route path="/" component={Landing}></Route>
    <Route path="/login" component={Login}></Route>
    <Route path="/destinations" component={Destinations}></Route>
    <Route path="/trains" component={Trains}></Route>
  </Router>

), document.getElementById('app'));

export default routes;