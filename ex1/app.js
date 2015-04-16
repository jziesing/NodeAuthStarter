
/*
 * main server file to run, meshes many middleswares for secure and public rest api
 * first get required mods
 */
var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var morgan = require('morgan');
//var UserModel = require('./models/user');
/*
 * connect to db, set secret for token hash, setup express app, setup request parsers
 */
mongoose.connect('mongodb://localhost/jwttest');
app = express();
app.use(morgan('dev'));
app.set('jwtTokenSecret', 'kjasdflkasnczadnslasdjfzaesfnaienasdc');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
/*
 * for local dev
 */
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,username,password');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
/*
 * setup route controllers, main part of app
 */
var controllers = require('./controllers');
controllers.set(app);
/*
 * routes not found
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/*
 * run server on port 3000
 */
var server = app.listen(8089, function() {
  console.log('Listening on port %d'.green, server.address().port);
});



