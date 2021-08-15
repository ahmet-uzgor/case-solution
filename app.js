const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Environment variable config.
const dotenv = require('dotenv');
dotenv.config();

const recordRouter = require('./routes/record');
const httpStatusCodes = require('./handlers/http-status-codes');

const app = express();

// mongodb connection initialization
const mongodb = require('./db/db-connection')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', recordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(httpStatusCodes.NOT_FOUND).send({ NOT_FOUND: 'This path is not found, please check your url' })
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.body.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || httpStatusCodes.INTERNAL_SERVER);
});

module.exports = app;
