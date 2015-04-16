/*
 * CODE FLOW = check req header for token
 *                --> do nothing just continue to next middleware if no token
 *                --> if there is a token, authenticate it and set a var req.user 
 *                    to appropriate user then continue to next middleware in request
 *   ****  EXPORT SHIELD AS MODULE WITH FUNCTION   ****
 *
 * SHIELD EVIRONMENT SETUP
 *
 */
var jwt = require('jwt-simple');
var validateToken = require('routes/get_shield').validateToken;
/*
 * FUNCTION TO EXPORT
 */
module.exports = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if(token) {
    try {
      var decoded_token = jwt.decode(token, app.get('secret'));
      if(decoded_token.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
      var currUser = validateToken(decoded_token);
      if(currUser) {
        req.user = currUser;
        return next();
      } else {
        res.json({
          "status": 404,
          "message": "ERROR FINDING USER"
        });
        return next();
      }
    }
    return next();
  };
};