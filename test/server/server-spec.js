const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;

const server = require('../../server/server.js');
const routes = require('../../server/config/routes.js');
const config = require('../../server/config/config.js');
const utils = require('../../server/config/utils.js');
const db = require('../../server/db/index.js');
const dbSpec = require('./db-spec.js');


describe('Privileged Access:', () => {
  
  it('Redirects to login page if a user tries to access the main page and is not signed in', (done) => {
    request(server)
      .get('/')
      .expect(302)
      .expect((res) => {
        expect(res.headers.location).to.equal('/login');
      })
      .end(done);
  });

  it('Redirects to login page if a user tries to create a link and is not signed in', (done) => {
    request(server)
      .get('/trains')
      .expect(302)
      .expect((res) => {
        expect(res.headers.location).to.equal('/login');
      })
      .end(done);
  });

  it('Redirects to login page if a user tries to see all of the links and is not signed in', (done) => {
    request(server)
      .get('/destinations')
      .expect(302)
      .expect((res) => {
        expect(res.headers.location).to.equal('/login');
      })
      .end(done);
  });

});

// it('Signup logs in a new user', function(done) {
//   var options = {
//     'method': 'POST',
//     'uri': 'http://127.0.0.1:8000/',
//     'json': {
//       slackId: 't353h4h',
//       firstName: 'Sally',
//       lastName: 'Mae',
//     }
//   };

//   request(options, function(error, res, body) {
//     expect(res.headers.location).to.equal('/');
//     done();
//   });
// });

// it('Signin logs in an existing, unauthenticated user', () => {

// });

// it('Logs in an existing, authenticated user automatically', () => {

// });

it('Should accept posts to /destinations', (done) => {
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
    .expect((res) => {
      expect(res.body.location).to.equal('/login');
    })
    .end(done);
});

it('Should accept posts to /trains', (done) => {
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
    .expect((res) => {
      expect(res.body.location).to.equal('/login');
    })
    .end(done);
});

it('Returns all of the destinations to display on the destinations page', (done) => {
  request(server)
    .get('/destinations')
    .expect(200)
    .expect((res) => {
      expect(res.body.location).to.equal('/login');
    })
    .end(done);
});

it('Returns all of the trains to display on the trains page', (done) => {
  request(server)
    .get('/trains')
    .expect(200)
    .expect((res) => {
      expect(res.body.location).to.equal('/login');
    })
    .end(done);
});
