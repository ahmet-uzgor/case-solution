const supertest = require('supertest');
const application = require('../app');
const { getRecordWithFilter } = require('../db/db-queries');
const httpStatusCodes = require('../handlers/http-status-codes');
const request = supertest(application);

describe('"/" api health check', () => {
  it('tests api health check', (done) => {
    request
      .get('/')
      .expect(httpStatusCodes.OK)
      .end((err, res) => {
        if(err) return done(err)
        expect(res.body.message).toBe('System is working very well')
        return done()
      })
  })
})

