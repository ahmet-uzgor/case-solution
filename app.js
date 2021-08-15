const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Environment variable config.
const dotenv = require('dotenv');
dotenv.config();

const recordRouter = require('./routes/record');

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

module.exports = app;
