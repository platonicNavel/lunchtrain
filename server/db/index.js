/*
This project uses a sqlite db with sequelize orm (http://docs.sequelizejs.com/en/latest/).
The database schema is depicted in sql-schema.png.

There are four primary tables:
* users: people who have previously authenticated with slack
* teams: teams with which users have authenticated
* destinations: places that trains are scheduled to visit or have previously visited
* trains: scheduled events

Teams are central to the app and are associated with all other tables. All data displayed to
a logged in user is specific to the team they logged in with. Slack allows users to have
multiple teams, and this app is designed to display primarily team-centric data, rather than
user-centric data. The same user who authenticates with a different team will see different
trains, different destinations, and different teammates by design.

The following associations exist within the db:
* users to teams: m-n (users can have multiple slack teams)
* users to trains: m-n (joiners of train) and 1-m (creator of train)
* teams to destinations: m-n (saved destinations are team-specific)
* teams to trains: m-n (scheduled trains are team-specific)
* destinations to trains: 1-m (trains have one destination, multiple trains can have same dest)
*/

const Sequelize = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('lunchtrain', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'lunchtrain.sqlite'),
});
const User = sequelize.define('User', {
  slackId: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  token: Sequelize.STRING,
  gravatar: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'http://www.gravatar.com/avatar',
  },
});

const Team = sequelize.define('Team', {
  slackTeamId: Sequelize.STRING,
  teamName: Sequelize.STRING,
});

const Destination = sequelize.define('Destination', {
  googleId: Sequelize.STRING,
  name: Sequelize.STRING,
  lat: Sequelize.STRING, // should these be #s
  long: Sequelize.STRING, // should these be #s
  visits: Sequelize.INTEGER,
  likes: Sequelize.INTEGER,
});

// todo: add 'dateDeparting' functionality
const Train = sequelize.define('Train', {
  timeDeparting: Sequelize.INTEGER,
  timeDuration: Sequelize.INTEGER,
  alerted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.belongsToMany(Team, { through: 'Users_Teams' });
Team.belongsToMany(User, { through: 'Users_Teams' });

// todo: alias user as passenger for n-m relation
User.belongsToMany(Train, { through: 'Users_Trains' });
Train.belongsToMany(User, { through: 'Users_Trains' });

Team.belongsToMany(Destination, { through: 'Teams_Destinations' });
Destination.belongsToMany(Team, { through: 'Teams_Destinations' });

// still a bit sharky on these associations
// may be worth going into further
Train.belongsTo(Destination);
Destination.hasMany(Train);


Train.belongsTo(Team);
Team.hasMany(Train);

Train.belongsTo(User, { as: 'Conductor' });

module.exports = {
  User,
  Team,
  Destination,
  Train,
  sequelize,
};
