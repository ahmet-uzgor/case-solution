const supertest = require('supertest');
const application = require('../app');
const httpStatusCodes = require('../handlers/http-status-codes');
const request = supertest(application);

// ROUTE TEST, it tests route endpoints
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
  
    afterEach(() => {
        jest.runOnlyPendingTimers(); //it resets timer as normal to convert fakeTimer to normal 
        jest.useRealTimers();
    });
    
    it('tests without startDate, return startDate is required', (done) => {
      delete requestData.startDate;
      request
        .post('/filterRecords')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect(httpStatusCodes.BAD_REQUEST)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.code).toBe(-2)
          expect(res.body.msg).toBe('"startDate" is required');
          return done();
        });
    });
  
    it('tests with invalid startDate, return startDate format is invalid', (done) => {
      requestData.startDate = "asd";
      request
        .post('/filterRecords')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect(httpStatusCodes.BAD_REQUEST)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.code).toBe(-3)
          expect(res.body.msg).toBe('"startDate" must be in YYYY-MM-DD format');
          return done();
        });
    });
  
    it('tests without endDate, return endDate is required', (done) => {
      delete requestData.endDate;
      request
        .post('/filterRecords')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect(httpStatusCodes.BAD_REQUEST)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.code).toBe(-2)
          expect(res.body.msg).toBe('"endDate" is required');
          return done();
        });
    });
  
    it('tests with invalid endDate, return endDate format is invalid', (done) => {
      requestData.endDate = "asd";
      request
        .post('/filterRecords')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect(httpStatusCodes.BAD_REQUEST)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.code).toBe(-3)
          expect(res.body.msg).toBe('"endDate" must be in YYYY-MM-DD format');
          return done();
        });
    });
  
    it('tests without maxCount, return maxCount is required', (done) => {
      delete requestData.maxCount;
      request
        .post('/filterRecords')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect(httpStatusCodes.BAD_REQUEST)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.code).toBe(-2)
          expect(res.body.msg).toBe('"maxCount" is required');
          return done();
        });
    });
  
    it('tests with invalid maxCount, return maxCount format is invalid', (done) => {
      requestData.maxCount = "asd";
      request
        .post('/filterRecords')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect(httpStatusCodes.BAD_REQUEST)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.code).toBe(-3)
          expect(res.body.msg).toBe('"maxCount" must be a number');
          return done();
        });
    });
  
    it('tests without minCount, return minCount is required', (done) => {
      delete requestData.minCount;
      request
        .post('/filterRecords')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect(httpStatusCodes.BAD_REQUEST)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.code).toBe(-2)
          expect(res.body.msg).toBe('"minCount" is required');
          return done();
        });
    });
  
    it('tests with invalid minCount, return minCount format is invalid', (done) => {
      requestData.minCount = "asd";
      request
        .post('/filterRecords')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect(httpStatusCodes.BAD_REQUEST)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.code).toBe(-3)
          expect(res.body.msg).toBe('"minCount" must be a number');
          return done();
        });
    });
  
    it('successful result for record list', () => {
      request
        .post('/filterRecords')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect(httpStatusCodes.OK)
        .end((err, res) => {
          expect(res.body.code).toBe(0);
          expect(res.body.msg).toBe('Success')
          expect(Array.isArray(res.body.records)).toBe(true);
          expect(Object.keys(res.body.records[0])).toContain('key');
          expect(Object.keys(res.body.records[0])).toContain('createdAt');
          expect(Object.keys(res.body.records[0])).toContain('totalCount');
          expect(res.body.records[0].totalCount).toBeLessThanOrEqual(3000);
          expect(res.body.records[0].totalCount).toBeGreaterThanOrEqual(2700);
        });
    });
});