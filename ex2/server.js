/*
 * CODE FLOW = check req header for token 
 *                --> restrict req if no token
 *                --> point reqs to route controller
 *                --> catch unknown routes
 *                --> activate all the code on port 3000
 * SERVER EVIRONMENT SETUP
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
/*
 * PARSE REQS TO JSON
 * ALLOW CROSS ORIGIN REQUESTS
 */
mongoose.connect('mongodb://localhost/ex2test');
app.use(bodyParser.json());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
/*
 * SET SECRET
 * USE CUSTOM MIDDLEWARE TO CHECK REQS HEADER FOR TOKEN
 */
app.set('secret', 'kjasdflkasnczadnslasdjfzaesfnaienasdc');
/*
 * ALL ROUTES UNDER '/api' are protected
 * USE ROUTE CONTROLLER FOR ALL ROUTES
 */
app.use('/', require('./routes'));
/*
 * PAGE/ROUTE NOT FOUND
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/*
 * START SERVER ON 3000
 */
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});