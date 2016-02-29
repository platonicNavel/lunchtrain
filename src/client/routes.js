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
      <div id="bossMode">
        {this.props.children || <Landing />}
      </div>
    )
  }
}

const routes = ReactDOM.render((

  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Landing} />
      <Route path="/login" component={Login}></Route>
      <Route path="/destinations" component={Destinations}></Route>
      <Route path="/trains" component={Trains}></Route>
    </Route>
  </Router>

), document.getElementById('app'));

export default routes;