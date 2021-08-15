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
            createdAt: { // it filters created_At date between start and endDate in suitable date type 
              $gte: new Date(startDate), 
              $lte: new Date(endDate)
            }
          }
        },
    ]);
};

module.exports = { getAllRecord, getRecordWithFilter }