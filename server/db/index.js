
const Sequelize = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('lunchtrain', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname,'lunchtrain.sqlite'),
});

const User = sequelize.define('User', {
  slackId: Sequelize.STRING,
  name: Sequelize.STRING
});

const Team = sequelize.define('Team', {
  slackTeam: Sequelize.STRING,
  name: Sequelize.STRING,
});

const Destination = sequelize.define('Destionation', {
  googleId: Sequelize.STRING,
  name: Sequelize.STRING,
  lat: Sequelize.STRING,
  long: Sequelize.STRING,
  visits: Sequelize.INTEGER,
  likes: Sequelize.INTEGER,
});

const Train = sequelize.define('Train', {
  conductorId: Sequelize.INTEGER,
  destinationId: Sequelize.INTEGER,
  timeDeparting: Sequelize.INTEGER,
  timeDuration: Sequelize.INTEGER,
});

User.belongsToMany(Team, {through: 'Users_Teams'});
Team.belongsToMany(User, {through: 'Users_Teams'});

User.belongsToMany(Train, {through: 'Users_Trains'});
Train.belongsToMany(User, {through: 'Users_Trains'});

Team.belongsToMany(Destination, {through: 'Teams_Destinations'});
Destination.belongsToMany(Team, {through: 'Teams_Destinations'});

Team.hasMany(Train);
Train.belongsTo(Team);

module.exports = {
    User,
    Team,
    Destination,
    Train,
    sequelize,
  };




