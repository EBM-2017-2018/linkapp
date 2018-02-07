const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./database');
/*
const seeder = require('mongoose-seed');
const configdb = require('./database');
const User = require('../models/user');

const data =
  {
    model: 'User',
    user:
      {
        username: configdb.seedUsername,
        password: configdb.seedPassword,
        role: 'admin',
        nom: 'root',
        prenom: 'root',
        email: 'root',
      },
  };
seeder.disconnect();
// Connect to MongoDB via Mongoose
seeder.connect(configdb.database, () => {
  console.log('Load Mongoose models');
  //seeder.loadModel('../models/user');
  User.findOne({
    username: configdb.seedUsername,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      seeder.populateModels(data);
      console.log('seed added');
    }
    seeder.disconnect();
    console.log('seeder disconnected');
  });
});
*/

mongoose.connect(config.database);

const api = require('../api/index');
const users = require('../api/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Page under construction.');
});

app.use('/api', api);
app.use('/users', users);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
