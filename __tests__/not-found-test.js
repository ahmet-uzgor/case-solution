const supertest = require('supertest');
const application = require('../app');
const request = supertest(application);

beforeEach(() => {
  jest.useFakeTimers(); // to be able to fix async import time error , it creates fake timer beforeEach test
})


afterEach(() => {
  jest.runOnlyPendingTimers(); //it resets timer as normal to convert fakeTimer to normal 
  jest.useRealTimers()
})

describe('routes url path notFound', () => {
  it('tests for url path not found', function(done) {
    request
      .post('/invalid')
      .send('username=john') // x-www-form-urlencoded upload
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body.NOT_FOUND).toBe("This path is not found, please check your url");
        return done();
      });
  });
});