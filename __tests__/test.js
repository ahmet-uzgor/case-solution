const supertest = require('supertest');
const application = require('../app');
const { getRecordWithFilter } = require('../db/db-queries');
const httpStatusCodes = require('../handlers/http-status-codes');
const request = supertest(application);

// NOT_FOUND test, if wrong or not found url;
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

// DB_QUERIES FUNCTION TESTS
describe('query functions test cases', () => {
  // mock function to test getRecordWithFilter
  const mockGetRecordWithFilter = jest.fn(); // it creates mock function
  mockGetRecordWithFilter.mockReturnValueOnce({ records: [
    {
      "key":"TAKwGc6Jr4i8Z487",
      "createdAt":"2017-01-28T01:22:14.398Z",
      "totalCount":2800
    }
  ], error: null }).mockReturnValueOnce({ records: [], error: new Error('DB error => Receive timed out') });
  // mockReturn simulates return behaviour
  // sample request body
  let startDate = new Date('2016-01-26');
  let endDate = new Date('2018-02-02');
  let minCount = 2700;
  let maxCount = 3000;

  // Test with real function 
  it('getRecordWithFilter function with suitable given parameters', (done) => {
    // all parameters of getRecordWithFilter is checked by validation rules , so no necessary to add a testcase
    const { records, error } = getRecordWithFilter(startDate, endDate, minCount, maxCount);
    expect(error).toBeUndefined()
    return done()
  });

  it('getRecordWithFilter(mock) function respond with data and null error', (done) => {
    const result = mockGetRecordWithFilter();
    expect(result.error).toBeNull();
    expect(Object.keys(result.records[0])).toContain('key');
    expect(Object.keys(result.records[0])).toContain('createdAt');
    expect(Object.keys(result.records[0])).toContain('totalCount');
    return done();
  });

  it('getRecordWithFilter(mock) function respond with error and null records array', (done) => {
    const result = mockGetRecordWithFilter();
    expect(result.records.length).toBe(0);
    expect(result.error.message).toBe('DB error => Receive timed out');
    return done();
  })
})

