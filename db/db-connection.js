const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('open', () => {
        console.log('Connected to DB');
    });

    mongoose.connection.on('error', (err) => {
        console.log("DB error: ", err);
    });

    mongoose.Promise = global.Promise;
};