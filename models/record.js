const mongoose = require('mongoose');
const { Schema } = mongoose;

const recordSchema = new Schema({ // It creates a model of records document in the MongoDb 
    _id: mongoose.Schema.Types.ObjectId, // default mongodb id
    key: String,
    value: String,
    count: [Number], // number array
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

// it exports model of records schema
module.exports = mongoose.model('records', recordSchema);

