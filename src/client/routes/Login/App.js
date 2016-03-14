import React from 'react';

const Login = () => {
  return (
    <div className="container">
      <div className="loginWrapper">
        <div className="row top">
          <div>
            <img className="slack-icon" src="assets/slack_icon.png" />
            <span className="login-text">LunchTrain + Slack</span>
          </div>
        </div>
        <div className="row mid">
          <div className="loginp">
            Organizing social activities with your team just got easier!  LunchTrain lets you organize group outings and find new places to hang out. All aboard!
          </div>
        </div>
        <div className="row connectButton">
          <a className=" btn btn-primary loginButton" href="/auth/slack">
            Connect with Slack
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login