const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('open', () => {
        console.log('DB connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log("DB error: ", err);
    });

    mongoose.Promise = global.Promise;

};