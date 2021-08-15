const express = require('express');
const router = express.Router();
const queries = require('../db/db-queries');
const  validator = require('../handlers/validation');
const httpStatusCodes = require('../handlers/http-status-codes');

/* GET api health check. */
router.get('/', async (req, res) => {
  res.status(200).send({ message: "System is working very well" })
});

router.post('/filterRecords', validator ,async (req, res) => {
  const { startDate, endDate, minCount, maxCount } = req.body;
  const records = await queries.getRecordWithFilter(startDate, endDate, minCount, maxCount);
  
  res.status(httpStatusCodes.OK).send({
    code: 0,
    message: "Success",
    records
  })
})

module.exports = router;
