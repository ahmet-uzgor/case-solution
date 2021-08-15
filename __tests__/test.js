const supertest = require('supertest');
const application = require('../app');
const httpStatusCodes = require('../handlers/http-status-codes');
const request = supertest(application);

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

describe('/filterRecords test cases', () => {
    let requestData;

    beforeEach(() => {
        requestData = { // sample request body
            startDate: '2016-01-26',
            endDate: '2018-02-02',
            minCount: '2700',
            maxCount: '3000',
        };
        jest.useFakeTimers(); // to be able to fix async import time error , it creates fake timer beforeEach test
    });
    
    it('tests without startDate, return startDate is required', function(done) {
        delete requestData.startDate;
        request
          .post('/filterRecords')
          .send(requestData)
          .set('Accept', 'application/json')
          .expect(httpStatusCodes.BAD_REQUEST)
          .end((err, res) => {
            console.log(res.body.msg)
            if(err) return done(err);
            expect(res.body.code).toBe(-2)
            expect(res.body.msg).toBe('"startDate" is required');
            return done();
        });
    });
});

// afterEach(() => {
//     jest.runOnlyPendingTimers(); //it resets timer as normal to convert fakeTimer to normal 
//     jest.useRealTimers();
// });

