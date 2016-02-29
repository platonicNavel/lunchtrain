import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import Landing from './routes/Landing/App.js';
import Trains from './routes/Trains/App.js';

ReactDOM.render((

  <Router history={browserHistory}>
    {/*Change when landing page is built*/}
    <Route path="/" component={Trains}>
    </Route>
  </Router>

), document.getElementById('app'));

export default routes;