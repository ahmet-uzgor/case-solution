const supertest = require('supertest');
const application = require('../app');
const { getRecordWithFilter } = require('../db/db-queries');
const httpStatusCodes = require('../handlers/http-status-codes');
const request = supertest(application);

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