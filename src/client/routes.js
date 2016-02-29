import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Login from './routes/Login/App.js';
import Landing from './routes/Landing/App.js';
import Destinations from './routes/Destinations/App.js';
import Trains from './routes/Trains/App.js';

class Root extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div className="topbar"></div>
        <div id="bossMode">
          {this.props.children || <Landing />}
        </div>
      </div>
    )
  }
}

import $ from 'jquery';

  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Landing} />
      <Route path="login" component={Login}></Route>
      <Route path="destinations" component={Destinations}></Route>
      <Route path="trains" component={Trains}></Route>
    </Route>
  </Router>

/*
  Browserify causes a bug with onEnter, so we haven't been able
  to get it to work for authentication. This is totally hacked together,
  and should be replaced with a more optimal solution as soon as possible
*/

$.get('/api/loggedin').then((loggedIn) => {
  if (loggedIn) {
    routes = ReactDOM.render((
      <Router history={browserHistory}>
        <Route path="/" component={Root}>
          <IndexRoute component={Landing} />
          <Route path="/login" component={Login} ></Route>
          <Route path="/destinations" component={Destinations}></Route>
          <Route path="/trains" component={Trains}></Route>
        </Route>
      </Router>

    ), document.getElementById('app'));
  } else {
    routes = ReactDOM.render((
      <Router history={browserHistory}>
        <Route path="/" component={Root}>
          <IndexRoute component={Login} />
          <Route path="/login" component={Login} ></Route>
          <Route path="/destinations" component={Login}></Route>
          <Route path="/trains" component={Login}></Route>
        </Route>
      </Router>

    ), document.getElementById('app'));    
  }
})

export default routes;