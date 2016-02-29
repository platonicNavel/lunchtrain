import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import Login from './routes/Login/App.js';
import Landing from './routes/Landing/App.js';
import Trains from './routes/Trains/App.js';

ReactDOM.render((

  <Router history={browserHistory}>
    {/*Change when landing page is built*/}
    <Route path="/" component={Login}>
    </Route>
  </Router>

), document.getElementById('app'));

export default routes;