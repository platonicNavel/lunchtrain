const db = require('../server/db/index.js');
const expect = require('chai').expect;

describe('Database ORM', () => {
  beforeEach(() => {
    db.sequelize.sync({force:true});
  });

  describe('Insertions', () => {
    it('should insert a user into the database', (done) => {
      const newUser = {
        slackId: '53t5g3b',
        name: 'Griffin'
      }
      db.User.create(newUser).then(() => {
        db.User.findOne({where: {slackId: newUser.slackId}}).then((user) => {
          expect(user.slackId).to.equal(newUser.slackId);
          expect(user.name).to.equal(newUser.name);
          done();
        });
      });
    });


  });
});