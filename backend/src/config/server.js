const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./database');

mongoose.connect(config.database);

// seeds users
require('../config/seed');

// map routes and start express server

const api = require('../api/index');
const users = require('../api/users');
const promos = require('../api/promos');
const pictures = require('../api/pictures');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());


// chemin des routes
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/promos', promos);
app.use('/api/pictures', pictures);
app.use(serveStatic(path.join(__dirname, '../../public')));

// 404 errors should now be handled by the frontend, so we redirect everything to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});


module.exports = app;
