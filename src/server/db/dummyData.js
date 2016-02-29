const db = require('./index.js');
const Sequelize = require('sequelize');

const user1 = {
  slackId: 't353h4h',
  firstName: 'Sally',
  lastName: 'Mae',
};

const user2 = {
  slackId: 't35ge3h4h',
  firstName: 'Mary',
  lastName: 'Sue',
};

const user3 = {
  slackId: 't353h4g53h',
  firstName: 'John',
  lastName: 'Doe',
};

const user4 = {
  slackId: 't353g3a3h4h',
  firstName: 'Jane',
  lastName: 'Doe',
};

const user5 = {
  slackId: 't353g3a3h4h',
  firstName: 'Max',
  lastName: 'Power',
};

const user6 = {
  slackId: '54h4h564h61',
  firstName: 'Bobby',
  lastName: 'Tables',
};

const allUsers = [
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
];

const team1 = {
  slackTeamId: 'T0AHB62V6',
  teamName: 'Hack Reactor 38',
};

const team2 = {
  slackTeamId: '549424h4h',
  teamName: 'Cool',
};

const allTeams = [
  team1,
  team2,
];

const destination1 = {
  googleId: '3bfsdh5g3earge',
  name: 'Flying Falafel',
  lat: '37.774929',
  long: '-122.419416',
  visits: 5,
  likes: 2,
};

const destination2 = {
  googleId: '594h88gh3984',
  name: 'Saigon Sammy',
  lat: '37.783697',
  long: '-122.408966',
  visits: 2,
  likes: 1,
};

const destination3 = {
  googleId: '594h456gh3984',
  name: 'Chipotle',
  lat: '64.05363',
  long: '54.526543',
  visits: 10,
  likes: 15,
};

const allDestinations = [
  destination1,
  destination2,
  destination3,
];

const train1 = {
  timeDeparting: 56324636,
  timeDuration: 5425,
};

const train2 = {
  timeDeparting: 54324636,
  timeDuration: 4025,
};

const train3 = {
  timeDeparting: 54762472,
  timeDuration: 4363,
};

const allTrains = [
  train1,
  train2,
  train3,
];

// create arrays of each db entry for dummy data
let createdUsers;
let createdTeams;
let createdDestinations;

function initializeData() {
  return db.sequelize.sync({ force: true })
    .then(() =>
      Sequelize.Promise.map(allUsers, user =>
        db.User.create(user))
    ).then((users) => {
      createdUsers = users;
      return Sequelize.Promise.map(allTeams, team => db.Team.create(team));
    }).then((teams) => {
      createdTeams = teams;
      return Sequelize.Promise.map(allDestinations, dest => db.Destination.create(dest));
    }).then((dests) => {
      createdDestinations = dests;
      return Sequelize.Promise.map(allTrains, train => db.Train.create(train));
    }).then((trains) => {
      const createdTrains = trains;
      /*
        At this point all promises have resolved, and
        we have 4 arrays with all our ORM dummy data.
        Next, we need to create associations. This will
        be hard coded for time's sake.

        This can and should be cleaned up to use the
        procedure defined near the end of
        http://docs.sequelizejs.com/en/latest/docs/associations/
      */
      return Sequelize.Promise.all([
        createdUsers[0].addTeam(createdTeams[0]),
        createdUsers[1].addTeam(createdTeams[0]),
        createdUsers[2].addTeam(createdTeams[0]),
        createdUsers[3].addTeam(createdTeams[1]),
        createdUsers[4].addTeam(createdTeams[1]),
        createdUsers[5].addTeam(createdTeams[1]),
        createdTeams[0].addDestination(createdDestinations[0]),
        createdTeams[0].addDestination(createdDestinations[1]),
        createdTeams[1].addDestination(createdDestinations[2]),
        createdTeams[0].addTrain(createdTrains[0]),
        createdTeams[0].addTrain(createdTrains[1]),
        createdTeams[1].addTrain(createdTrains[2]),
        createdDestinations[0].addTrain(createdTrains[0]),
        createdDestinations[1].addTrain(createdTrains[1]),
        createdDestinations[1].addTrain(createdTrains[2]),
        createdTrains[0].addUser(createdUsers[0]),
        createdTrains[0].addUser(createdUsers[1]),
        createdTrains[0].setConductor(createdUsers[2]),
        createdTrains[1].addUser(createdUsers[1]),
        createdTrains[1].setConductor(createdUsers[0]),
        createdTrains[2].setConductor(createdUsers[3]),
        createdTrains[2].addUser(createdUsers[4]),
        createdTrains[2].addUser(createdUsers[5]),
      ]);
    });
}

module.exports = initializeData;
