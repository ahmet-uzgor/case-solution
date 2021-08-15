const Record = require('../models/record');

const getAllRecord = async () => {
    return await Record.find({});
};

const getRecordWithFilter = async (startDate, endDate, minCount, maxCount) => {
  try {
    const records = await Record.aggregate([
      {
        $project: {
          _id: false,
          key: true,
          createdAt: true,
          totalCount: { $sum: "$counts" }
        },          
      },
      { 
        $match: {
          totalCount: { $gte: minCount, $lte: maxCount }, // it filters sum of counts between given min and maxCounts
          createdAt: { // it filters created_At date between start and endDate in suitable date type 
            $gte: startDate, 
            $lte: endDate
          }
        }
      },
    ]);
    return { records, error: null }
  } catch (error) {
    return { records: [], error: error.message }
  }
};

module.exports = { getAllRecord, getRecordWithFilter }