import React from 'react';

const Login = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
          <img className="slack-icon" src="assets/slack_icon.png" />
          <span className="login-text">LunchTrain + Slack</span>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
          Organizing social activities with your team just got easier!  LunchTrain lets you organize group outings and find new places to hang out. All aboard!
        </div>
      </div>
      <div className="row">
        <a className="col-xs-2 col-xs-offset-5 btn btn-primary" href="/auth/slack">
          Connect with Slack
        </a>
      </div>
    </div>
  )
}

export default Login