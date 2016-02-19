const db = require('../server/db/index.js');
const expect = require('chai').expect;

const newUser = {
  slackId: '53t5g3b',
  name: 'Griffin'
};

const newTeam = {
  slackTeam: 'g52gewg524',
  name: 'Awesome',
};

const newDestination = {
  googleId: 'g52gegbrieu334tewg524',
  name: 'Coffee Cafe',
  lat: '37.36725',
  long: '-122.4523',
  visits: 0,
  likes: 1,
};      

const newTrain = {
  conductorId: 5,
  destinationId: 1,
  timeDeparting: 1455827400,
  timeDuration: 39600,
};

describe('Database ORM', () => {
  beforeEach((done) => {
    db.sequelize.sync({force:true}).then(() => done())
  });

  describe('Insertions and FindOnes', () => {
    it('should insert a user into the database', (done) => {
      db.User.create(newUser).then(() => {
        return db.User.findOne({where: {slackId: newUser.slackId}});
      }).then((user) => {
          expect(user.slackId).to.equal(newUser.slackId);
          expect(user.name).to.equal(newUser.name);
          done();
      });
    });

    it('should insert a team into the database', (done) => {
      db.Team.create(newTeam).then(() => {
        return db.Team.findOne({where: {slackTeam: newTeam.slackTeam}});
      }).then((team) => {
        expect(team.slackTeam).to.equal(newTeam.slackTeam);
        expect(team.name).to.equal(newTeam.name);
        done();
      });
    });

    it('should insert a destination into the database', (done) => {
      db.Destination.create(newDestination).then(() => {
        return db.Destination.findOne({where: {googleId: newDestination.googleId}});
      }).then((dest) => {
        expect(dest.googleId).to.equal(newDestination.googleId);
        expect(dest.name).to.equal(newDestination.name);
        expect(dest.lat).to.equal(newDestination.lat);
        expect(dest.long).to.equal(newDestination.long);
        expect(dest.visits).to.equal(newDestination.visits);
        expect(dest.likes).to.equal(newDestination.likes);
        done();
      });
    });

    it('should insert a train into the database', (done) => {
      db.Train.create(newTrain).then(() => {
        return db.Train.findOne({where: {conductorId: newTrain.conductorId}});
      }).then((train) => {
        expect(train.conductorId).to.equal(newTrain.conductorId);
        expect(train.destinationId).to.equal(newTrain.destinationId);
        expect(train.timeDeparting).to.equal(newTrain.timeDeparting);
        expect(train.timeDuration).to.equal(newTrain.timeDuration);
        done();
      });
    });
  });


});





