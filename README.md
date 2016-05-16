# LunchTrain
<img src=/static/assets/lunchtrainlogotr.png height=250px/>

Organizing social activities with your team has never been easier! LunchTrain lets you coordinate informal team outings and find new places to eat or hang out. Seamless Slack integration also ensures that you never accidentally miss out. All aboard!

## Team

  - __Product Owner__: Anthony Salierno
  - __Scrum Master__: Jarrett Gliner
  - __Development Team Members__: Griffin Michl, Jacob Lee

## Table of Contents

1. [Foreword](#foreword)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Foreword

After a long morning at work, it's almost time to get lunch! You have been wanting to try out that new Chinese place down the street, so you decide to ask some of your coworkers if they would like to join. You glance up from your desk and see that a good number of your teammates are away. You could:

A) Pace around the office asking people if they would like to join
B) Frantically message coworkers on Slack, `lunch?`
C) Defeatedly make a sandwich and postpone your lunch outing

LunchTrain was born out of the idea that meals are an invaluable time to bond with coworkers, but are often a hassle to coordinate. Our team understands that all workplaces have different needs and has decided to make this application Open Source in order to make it as accessible as possible.

## Requirements

- Node v5.8.0 or higher
- npm v3.8.0 or higher
- [Grunt CLI v0.3 or higher](http://gruntjs.com/getting-started)
- [Nodemon v1.9.0 or higher](http://nodemon.io/)

## Development

### Installing Dependencies

From within the root directory:
```
$ npm install
```
- This will install all the necessary packages in the root, native, and server directories

### Transpiling

- LunchTrain uses ECMAScript 6 syntax, which is not yet fully compatible with Node. Therefore, we use Babel to transpile our ES6 code into ES5, which is compatible with Node v5.x.x and above.

From within the root directory:
```
$ npm run compile
```

### Configuring Authentication

- You will need to visit [Slack's API](https://api.slack.com/) to get your own `CLIENT_ID` and `CLIENT_SECRET`

### Starting the Server

We highly recommend using Grunt to minify, concat, transpile the `/src/` folder, and start the server in one command! (Note: This requires Nodemon)

```
$ grunt server-dev
```

This will initialize the sqlite3 database and listen on port 5000

### Roadmap

View the project roadmap [here](https://github.com/platonicNavel/lunchtrain/issues)

## Future Features

- Allow users to swith between teams or see data from all teams in app
- Integrate slash commands into the app (show trains, schedule train, etc)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
