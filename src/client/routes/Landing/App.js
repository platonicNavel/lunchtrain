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
        <div className="track"></div>
        <div className="trackH"></div>
        <img src="assets/lunchtrainlogotr.png" className="logo"/>
        <img src="assets/lunchtrainlogotext.png" className="logosm"/>
        <div className="container">
          <div className="diagTop">
            <div className="topHeader">
              <h3>Never miss out on another team lunch!</h3>
              <p>See if a coworker extended an open lunch invitation. If they have, LunchTrain will tell you where they're headed, what time they're leaving, and what time they expect to be back, so hop aboard! Worried about remembering? We’ve got you covered with automated Slack reminders!</p>
            </div>
            <Link to="trains" onClick={this.componentWillUnmount}>
              <div className="trainsButton">Board a Train</div>
            </Link>
          </div>
          <div className="diagBottom">
            <div className="bottomHeader">
              <Link to="destinations" onClick={this.componentWillUnmount}>
                <div className="destButton">Schedule a Train</div>
              </Link>
              <h3>Be the conductor.</h3>
              <p>Not in the mood for the current choices? Maybe you have an early post-meal meeting? Organize trips to new places or old favorites on your own time and see who hops on.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing