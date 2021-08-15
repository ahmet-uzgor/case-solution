const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.status(200).send({ message: "System is working very well" })
});

module.exports = router;
