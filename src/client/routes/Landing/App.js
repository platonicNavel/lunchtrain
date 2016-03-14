import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
// import routes from '../../routes.js'

class Landing extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('bossMode'));
  }

  render() {
    return (
      <div className="container">
        <div className="row button-row">
         <Link to="trains" onClick={this.componentWillUnmount}>
            <div className=" btn btn-info">
            <div className="dummy">Board a Train</div>
              <img className="people" src="assets/people.png" />
              <img className="train" src="assets/train.png" />
              <div className="destinations-text">Join your friends on fun outings</div>
            </div>
          </Link>
          <Link to="destinations" onClick={this.componentWillUnmount}>
            <div className=" btn btn-info">
              <div className="dummy">Schedule a Train</div>
              <img className="calendar" src="assets/calendar.png" />
              <img className="location" src="assets/location.png" />
              <div className="trains-test">Organize trips to new places or old favorites</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Landing