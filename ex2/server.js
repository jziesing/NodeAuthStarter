/*
 * CODE FLOW = check req header for token 
 *                --> restrict req if no token
 *                --> point reqs to route controller
 *                --> catch unknown routes
 *                --> activate all the code on port 3000
 * SERVER EVIRONMENT SETUP
 */
var express = require('express');
var bodyParser = require('body-parser');
var shield = require('./shield');
var app = express();
/*
 * PARSE REQS TO JSON
 * ALLOW CROSS ORIGIN REQUESTS
 */
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
 * CHECK REQS HEADER FOR TOKEN
 */
app.set('secret', 'kjasdflkasnczadnslasdjfzaesfnaienasdc');
app.use(shield);
/*
 * IS TRUE IF SHIELD FINDS TOKEN AND SETS REQ.USER || HELPER METHOD
 */
var checkUser = function(req, res, next) {
  if (!req.user) {
    res.end('Not authorized', 401);
    return false;
  } else {
    return next();
  }
};
/*
 * ALL ROUTES UNDER '/api' are protected
 * USE ROUTE CONTROLLER FOR ALL ROUTES
 */
app.all('/api/*', checkUser);
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