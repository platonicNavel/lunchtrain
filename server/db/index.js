
const Sequelize = require('sequelize');
const sequelize = new Sequelize('lunchtrain', null, null, {
  dialect: 'sqlite',
  storage: './lunchtrain.sqlite',
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
  google_id: Sequelize.STRING,
  name: Sequelize.STRING,
  lat: Sequelize.DOUBLE,
  long: Sequelize.DOUBLE,
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

//for testing
// sequelize.sync({force: true}).then(() => {
//   User.create({
//     slackId: 1,
//   }).then((user) => {
//     Team.create({
//       slackTeam: 1,
//       name: 'Awesome',
//     }).then((team) => {
//       user.addTeam(team).then(() => {
//         User.create({
//           slackId: 43164
//         }).then((user) => {
//           Team.findOrCreate({where: {
//             slackTeam: 1,
//             name: 'Awesome',
//           }}).spread((team, method) => {
//             user.addTeam(team).then(() => {
//               console.log('success!');
//             })
//           })
//         })
//       })
//     })
//   });
// });

module.exports = {
  User,
  Team,
  Destination,
  Train,
};


