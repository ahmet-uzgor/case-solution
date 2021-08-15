const moment = require('moment');
const Record = require('../models/record');

const getAllRecord = async () => {
    return await Record.find({});
};

const getRecordWithFilter = async (startDate, endDate, minCount, maxCount) => {
    return await Record.aggregate([
        {
          $project: {
            _id: false,
            key: true,
            createdAt: true,
            totalCount: { $sum: "$counts"}
          },          
        },
        { 
          $match: {
            totalCount: { $gte: parseInt(minCount), $lte: parseInt(maxCount) },
            createdAt: {
              $gte: moment(startDate, 'YYYY-MM-DD').add(1, 'day').toDate(),
              $lte: moment(endDate, 'YYYY-MM-DD').add(1, 'day').toDate()
            }
          }
        },
    ]);
};

module.exports = { getAllRecord, getRecordWithFilter }