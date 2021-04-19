var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');
const articlesRouter = require('./routes/publications');

const app = express();
app.use(cookieParser());
const cors = require('cors');
const corsConfig = {
    origin: true,
    credentials: true
}
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/publication', articlesRouter);

module.exports = app;