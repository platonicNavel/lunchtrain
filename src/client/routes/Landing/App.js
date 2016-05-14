import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
// import routes from '../../routes.js'

class Landing extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('appWrapper'));
  }

  render() {
    return (
      <div className="bg">
        <div className="diag"></div>
        <div className="container">
          <div className="row button-row">
           <Link to="trains" onClick={this.componentWillUnmount}>
              <div className=" btn btn-info">
              <div className="dummy">Board a Train</div>
                <div className="destinations-text">Join your friends on fun outings</div>
              </div>
            </Link>
            <Link to="destinations" onClick={this.componentWillUnmount}>
              <div className=" btn btn-info">
                <div className="dummy">Schedule a Train</div>
                <div className="trains-test">Organize trips to new places or old favorites</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing