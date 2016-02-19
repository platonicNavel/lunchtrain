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
        return db.Train.findOne({where: {id: 1}});
      }).then((train) => {
        expect(train.timeDeparting).to.equal(newTrain.timeDeparting);
        expect(train.timeDuration).to.equal(newTrain.timeDuration);
        done();
      });
    });
  });

  describe('Relations', () => {
    it('should have n-m relationship between users and teams', (done) => {
      db.User.create(newUser).then((user) => {
        db.Team.create(newTeam).then((team) => {
          return user.addTeam(team);
        }).then(() => {
          db.User.findOne({include: [db.Team]}).then((user) => {
            expect(user.slackId).to.equal(newUser.slackId);
            expect(user.name).to.equal(newUser.name);
            expect(user.Teams[0].slackTeam).to.equal(newTeam.slackTeam);
            expect(user.Teams[0].name).to.equal(newTeam.name);
            done();
          });
        });
      });
    });

    it('should have n-m relationship between teams and destinations', (done) => {
      db.Team.create(newTeam).then((team) => {
        db.Destination.create(newDestination).then((dest) => {
          return dest.addTeam(team);
        }).then(() => {
          db.Team.findOne({include: [db.Destination]}).then((team) => {
            expect(team.slackTeam).to.equal(newTeam.slackTeam);
            expect(team.name).to.equal(newTeam.name);

            expect(team.Destinations[0].googleId).to.equal(newDestination.googleId);
            expect(team.Destinations[0].name).to.equal(newDestination.name);
            expect(team.Destinations[0].lat).to.equal(newDestination.lat);
            expect(team.Destinations[0].long).to.equal(newDestination.long);
            expect(team.Destinations[0].visits).to.equal(newDestination.visits);
            expect(team.Destinations[0].likes).to.equal(newDestination.likes);

            done();
          });
        });
      });
    });

    it('should have n-m relationship between users and trains', (done) => {
      db.User.create(newUser).then((user) => {
        db.Train.create(newTrain).then((train) => {
          return user.addTrain(train);
        }).then(() => {
          db.User.findOne({include: [db.Train]}).then((user) => {
            expect(user.slackId).to.equal(newUser.slackId);
            expect(user.name).to.equal(newUser.name);

            expect(user.Trains[0].timeDeparting).to.equal(newTrain.timeDeparting);
            expect(user.Trains[0].timeDuration).to.equal(newTrain.timeDuration);

            done();
          });
        });
      });
    });

    it('should have 1-m relationship between destinations and trains', (done) => {
      db.Train.create(newTrain).then((train) => {
        db.Destination.create(newDestination).then((dest) => {
          return dest.addTrain(train);
        }).then(() => {
          db.Destination.findOne({include: [db.Train]}).then((dest) => {
            expect(dest.Trains[0].timeDeparting).to.equal(newTrain.timeDeparting);
            expect(dest.Trains[0].timeDuration).to.equal(newTrain.timeDuration);

            expect(dest.googleId).to.equal(newDestination.googleId);
            expect(dest.name).to.equal(newDestination.name);
            expect(dest.lat).to.equal(newDestination.lat);
            expect(dest.long).to.equal(newDestination.long);
            expect(dest.visits).to.equal(newDestination.visits);
            expect(dest.likes).to.equal(newDestination.likes);

            done();
          });
        });
      });
    });

    it('should have 1-m relationship between trains and teams', (done) => {
      db.Train.create(newTrain).then((train) => {
        db.Team.create(newTeam).then((team) => {
          return team.addTrain(train);
        }).then(() => {
          db.Team.findOne({include: [db.Train]}).then((team) => {
            expect(team.Trains[0].timeDeparting).to.equal(newTrain.timeDeparting);
            expect(team.Trains[0].timeDuration).to.equal(newTrain.timeDuration);

            expect(team.slackTeam).to.equal(newTeam.slackTeam);
            expect(team.slackTeam).to.equal(newTeam.slackTeam);

            done();
          });
        });
      });
    });

    it('should have 1-m relationship between trains and teams', (done) => {
      db.Train.create(newTrain).then((train) => {
        db.Team.create(newTeam).then((team) => {
          return team.addTrain(train);
        }).then(() => {
          db.Team.findOne({include: [db.Train]}).then((team) => {
            expect(team.Trains[0].timeDeparting).to.equal(newTrain.timeDeparting);
            expect(team.Trains[0].timeDuration).to.equal(newTrain.timeDuration);

            expect(team.slackTeam).to.equal(newTeam.slackTeam);
            expect(team.slackTeam).to.equal(newTeam.slackTeam);

            done();
          });
        });
      });
    });



  });

});


