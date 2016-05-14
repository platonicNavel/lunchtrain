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