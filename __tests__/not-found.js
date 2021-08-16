const supertest = require('supertest');
const application = require('../app');
const httpStatusCodes = require('../handlers/http-status-codes');
const request = supertest(application);

// NOT_FOUND test, if wrong or not found url;
describe('routes url path notFound', () => {
    it('tests for url path not found', function(done) {
      request
        .post('/invalid')
        .send('username=john') // x-www-form-urlencoded upload
        .set('Accept', 'application/json')
        .expect(httpStatusCodes.NOT_FOUND)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.NOT_FOUND).toBe("This path is not found, please check your url");
          return done();
        });
    });
});