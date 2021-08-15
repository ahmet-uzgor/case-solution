const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: process.env.TOPOLOGY == 'false' ? false : true // when test ran, it throws error if it is true
    });

    mongoose.connection.on('open', () => {
        console.log('Connected to DB');
    });

    mongoose.connection.on('error', (err) => {
        console.log("DB error: ", err);
    });

    mongoose.Promise = global.Promise;
};