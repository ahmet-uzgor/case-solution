const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');
const { NotFoundError, InternalServerError } = require('./handlers/error-handler');

//Environment variable config.
const dotenv = require('dotenv');
dotenv.config();

//Routes Import
const recordRouter = require('./routes/record');

// Initialize app
const app = express();

// mongodb connection initialization
const mongodb = require('./db/db-connection')();


// IP rate-limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Router paths
app.use('/', recordRouter);

// catch 404 and forward to error handler
app.use(NotFoundError);

// error handler
app.use(InternalServerError);

module.exports = app;
