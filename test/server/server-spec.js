const request = require('supertest');
const expect = require('chai').expect;

const auth = require('../../server/config/auth.js');
const config = require('../../server/config/config.js');
const middleware = require('../../server/config/middleware.js');
const routes = require('../../server/config/routes.js');
const server = require('../../server/server.js');
const utils = require('../../server/config/utils.js');

const db = require('../../server/db/index.js');
const dbSpec = require('./db-spec.js');


describe('Privileged Access:', () => {
  it('Redirects to login page if user tries to access main page while not signed in', (done) => {
    request(server)
      .get('/')
      .expect(302)
      .expect((res) => {
        expect(res.headers.location).to.equal('/login');
      })
      .end(done);
  });

  it('Redirects to login page if user tries to access trains page while not signed in', (done) => {
    request(server)
      .get('/trains')
      .expect(302)
      .expect((res) => {
        expect(res.headers.location).to.equal('/login');
      })
      .end(done);
  });

  it('Redirects to login page if user tries to access destinations page while not signed in', (done) => {
    request(server)
      .get('/destinations')
      .expect(302)
      .expect((res) => {
        expect(res.headers.location).to.equal('/login');
      })
      .end(done);
  });
});


describe('User Login:', () => {
  xit('Signup logs in a new user', (done) => {
    request(server)
    .get('/login')
    .expect(200)
    .end(done);
  });


  xit('Signin logs in an existing, unauthenticated user', (done) => {
    request(server)
    .end(done);
  });

  xit('Logs in an existing, authenticated user automatically', (done) => {
    request(server)
    .end(done);
  });
});


describe('GET Requests:', () => {
  beforeEach((done) => {
    config.devMode = true;
    db.sequelize.sync({force:true}).then(() => {
      db.Destination.create(dbSpec.newDestination).then(() => {
        db.Train.create(dbSpec.newTrain).then(() => {
          done();
        });
      });
    });
  });

  it('Returns all of the destinations to display on the destinations page', (done) => {
    request(server)
      .get('/api/destinations')
      .expect(200)
      // .expect((res) => {
      //   expect(res.body).to.equal(dbSpec.newDestination);
      // })
      .end(done);
  });

  it('Returns all of the trains to display on the trains page', (done) => {
    request(server)
      .get('/api/trains')
      .expect(200)
      // .expect((res) => {
      //   expect(res.body).to.equal('dbSpec.newTrain');
      // })
      .end(done);
  });
});


describe('POST Requests:', () => {
  beforeEach((done) => {
    config.devMode = true;
    db.sequelize.sync({force:true}).then(() => {
      db.Destination.create(dbSpec.newDestination).then(() => {
        done();
      });
    });
  });

  xit('Should accept posts to /destinations', (done) => {
    request(server)
      .post('/destinations')
      .send({
        googleId: 'g52gegbrieu334tewg524',
        name: 'Coffee Cafe',
        lat: '37.36725',
        long: '-122.4523',
        visits: 0,
        likes: 1,
      })
      .expect(200)
      .end(done);
  });

  xit('Should accept posts to /trains', (done) => {
    request(server)
      .post('/trains')
      .send({
        googleId: 'g52gegbrieu334tewg524',
        name: 'Coffee Cafe',
        lat: '37.36725',
        long: '-122.4523',
        visits: 0,
        likes: 1,
      })
      .expect(200)
      .end(done);
  });
});
