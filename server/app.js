var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const path = require('path');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  next();
});

app.use('/products', require('./routes/productRoute'));
app.use('/users', require('./routes/usersRoute'));
app.use('/carts', require('./routes/cartRoute'));

app.use('/images', express.static(path.join(__dirname, 'stockImages')));

module.exports = app;
