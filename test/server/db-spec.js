const db = require('../../build/server/db/index.js');
const expect = require('chai').expect;

const newUser = {
  slackId: '53t5g3b',
  firstName: 'Griffin',
};

const newUser1 = {
  slackId: 'eha41t',
  firstName: 'Jarrett',
}

const newUser2 = {
  slackId: 't31gr54',
  firstName: 'Anthony',
}

const newTeam = {
  slackTeamId: 'g52gewg524',
  teamName: 'Awesome',
};

const newTeam1 = {
  slackTeamId: 'tgew535',
  teamName: 'Amazing',
};

const newTeam2 = {
  slackTeamId: '95gh478',
  teamName: 'Great',
};

const newDestination = {
  googleId: 'g52gegbrieu334tewg524',
  name: 'Coffee Cafe',
  lat: '37.36725',
  long: '-122.4523',
  visits: 0,
  likes: 1,
};  

const newDestination1 = {
  googleId: 'geiubu342253',
  name: 'Train Cafe',
  lat: '37.35725',
  long: '-122.1223',
  visits: 0,
  likes: 1,
};      

const newTrain = {
  timeDeparting: 1455827400,
  timeDuration: 39600,
};

const newTrain1 = {
  timeDeparting: 1455827500,
  timeDuration: 39550,
};

describe('Database ORM', () => {
  beforeEach((done) => {
    db.sequelize.sync({force:true}).then(() => done());
  });

  describe('Insertions and FindOnes', () => {
    it('should insert a user into the database', (done) => {
      db.User.create(newUser).then(() => {
        return db.User.findOne({where: {slackId: newUser.slackId}});
      }).then((user) => {
          expect(user.slackId).to.equal(newUser.slackId);
          expect(user.firstName).to.equal(newUser.firstName);
          done();
      });
    });

    it('should insert a team into the database', (done) => {
      db.Team.create(newTeam).then(() => {
        return db.Team.findOne({where: {slackTeamId: newTeam.slackTeamId}});
      }).then((team) => {
        expect(team.slackTeamId).to.equal(newTeam.slackTeamId);
        expect(team.teamName).to.equal(newTeam.teamName);
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
            expect(user.firstNmw).to.equal(newUser.firstNmw);
            expect(user.Teams[0].slackTeamId).to.equal(newTeam.slackTeamId);
            expect(user.Teams[0].teamName).to.equal(newTeam.teamName);
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
            expect(team.slackTeamId).to.equal(newTeam.slackTeamId);
            expect(team.teamName).to.equal(newTeam.teamName);

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
            expect(user.firstName).to.equal(newUser.firstName);

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
          db.Team.findOne({ include: [db.Train] }).then((team) => {
            expect(team.Trains[0].timeDeparting).to.equal(newTrain.timeDeparting);
            expect(team.Trains[0].timeDuration).to.equal(newTrain.timeDuration);

            expect(team.slackTeamId).to.equal(newTeam.slackTeamId);
            expect(team.teamName).to.equal(newTeam.teamName);

            done();
          });
        });
      });
    });

    it('should have 1-m relationship between conductor and trains', (done) => {
      db.User.create(newUser).then((user) => {
        db.Train.create(newTrain).then((train) => {
          return train.setConductor(user);
        }).then(() => {
          db.Train.findOne({ include: [{ model: db.User, as: 'Conductor' }]}).then((train) => {
            expect(train.timeDeparting).to.equal(newTrain.timeDeparting);
            expect(train.timeDuration).to.equal(newTrain.timeDuration);

            expect(train.Conductor.slackId).to.equal(newUser.slackId);
            done();
          });
        });
      })
    });
  });
});
