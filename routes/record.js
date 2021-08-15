const express = require('express');
const router = express.Router();
const queries = require('../db/db-queries');
const  validator = require('../handlers/filterRecords-validation');
const httpStatusCodes = require('../handlers/http-status-codes');

/* GET api health check. */
router.get('/', async (req, res) => {
  res.status(200).send({ message: "System is working very well" })
});

// It filters records data regarding given parameters and returns data with message
router.post('/filterRecords', validator ,async (req, res) => {
  const { startDate, endDate, minCount, maxCount } = req.body;
  const { records, error } = await queries.getRecordWithFilter(startDate, endDate, minCount, maxCount);
  
  if (error) {
    return res.status(httpStatusCodes.INTERNAL_SERVER).send({
      code: -4,
      msg: `DB Error => ${error}`,
      records
    })
  }

  res.status(httpStatusCodes.OK).send({
    code: 0,
    msg: "Success",
    records
  })
});

module.exports = router;
