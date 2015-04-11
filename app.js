
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
var server = app.listen(3000, function() {
	console.log('Listening on port %d'.green, server.address().port);
});



