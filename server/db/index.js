
const Sequelize = require('sequelize');
sequelize = new Sequelize('lunchtrain');

User = sequelize.define('User', {
  slack_id: Sequelize.STRING,
});

Team = sequelize.define('Team', {
  name: Sequelize.STRING,
});

Destination = sequelize.define('Destination', {
  google_id: Sequelize.STRING,
  name: Sequelize.STRING,
  lat: Sequelize.DOUBLE,
  long: Sequelize.DOUBLE,
  visits: Sequelize.INTEGER,
  likes: Sequelize.INTEGER,
});

Train = sequelize.define('Train', {
  conductorId: Sequelize.INTEGER,
  destinationId: Sequelize.INTEGER,
  timeDeparting: Sequelize.INTEGER,
  timeDuration = Sequelize.INTEGER,
});

User.belongsToMany(Team, {through: 'User_Team'});
Team.belongsToMany(User, {through: 'User_Team'});

User.belongsToMany(Train, {through: 'User_Train'});
Train.belongsToMany(User, {through: 'User_Train'});

Team.hasMany(Destination);
Destination.belongsTo(Team);

Team.hasMany(Train);
Train.belongsTo(Team);

module.exports = {
  User,
  Team,
  Destination,
  Train,
};


