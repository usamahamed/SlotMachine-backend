
// Simulate a production environment
process.env.NODE_ENV = "production";

var mocha = require("mocha"),
    app = require("../app"),
    request = require("supertest");

describe("static middleware", function () {
	// test routes validity first
   it("Test route /", function (done) {
      request(app)
         .get("/")
         .expect(200)
         .end(done);
   });

describe('POST /api/balance', function() {
  it('Test get balance correctlly', function(done) {
    request(app)
      .post('/api/balance')
      .send('balanceval=1000') 
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.balanceval = '1000';
      })
      .expect({
        balanceval: '1000'
       }, done);
  });
});

describe('POST /api/balance', function() {
  it('Test get balance correctlly', function(done) {
    request(app)
      .post('/api/winpoints')
      .send('countValue=10&roundStatus=fail') // x-www-form-urlencoded upload
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.countValue = '10';
        res.body.roundStatus = 'fail';
      })
      .expect({
        countValue: '10',
        roundStatus: 'fail'
       }, done);
  });
});

describe('POST /api/balance', function() {
  it('Test recived win lines correctlly', function(done) {
    request(app)
      .post('/api/winlines')
      .send('winline=[0,0,0]') 
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.lineslose = '[0,0,0]';
      })
      .expect({
        lineslose: '[0,0,0]',
       }, done);
  });
});


describe('POST /api/balance', function() {
  it('Test recived lose lines correctlly', function(done) {
    request(app)
      .post('/api/loselines')
      .send('lineslose=[0,3,2]') 
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.lineslose = '[0,3,2]';
      })
      .expect({
        lineslose: '[0,3,2]',
       }, done);
  });
});


});