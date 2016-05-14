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
        <img src="assets/lunchtrainlogotr.png" className="logo"/>
        <img src="assets/lunchtrainlogotext.png" className="logosm"/>
        <div className="container">
          <div className="diagTop">
            <div className="topHeader">
              <h3>Never miss out on another team lunch!</h3>
            </div>
            <Link to="trains" onClick={this.componentWillUnmount}>
              <div className="dummy">Board a Train</div>
            </Link>
          </div>
          <div className="diagBottom">
            <Link to="destinations" onClick={this.componentWillUnmount}>
                <div className="dummy">Schedule a Train</div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing