import React from 'react';

const Login = () => {
  return (
    <div className="container">
      <div className="loginWrapper">
        <div className="diamond"></div>
        <div className="row top">
          <div>
            <div className="loginlogos">
              <img className="slackiconlogin" src="assets/slack_icon.png" />
              <img className="trainiconlogin" src="assets/lunchtrainlogotr.png" />
            </div>
          </div>
        </div>
        <div className="row mid">
          <div className="loginheader">
            <img className="traintexticonlogin" src="assets/lunchtrainlogotext.png" />
            <h1>Organizing social activities with your team has never been easier!</h1>
          </div>
        </div>
        <div>
          <div className="slackbuttoncontainer">
            <a className="loginbutton" href="/auth/slack">
              <p>&nbsp;&nbsp;Sign in with Slack</p>
              <img className="slackiconbutton" src="assets/slack_icon.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login