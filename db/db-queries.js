const Record = require('../models/record');

const getRecordWithFilter = async (startDate, endDate, minCount, maxCount) => {
  try {
    const records = await Record.aggregate([
      {
        $project: { // it gets desired parameters
          _id: false,
          key: true,
          createdAt: true,
          totalCount: { $sum: "$counts" } // it gives sum of array to be able to filter totalCount
        },          
      },
      { 
        $match: {
          totalCount: { $gte: minCount, $lte: maxCount }, // it filters sum of counts between given min and maxCounts
          createdAt: { // it filters created_At date between start and endDate in suitable date type (it is converted to utc in validation)
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

module.exports = { getRecordWithFilter }