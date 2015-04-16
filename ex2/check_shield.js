var jwt = require('jwt-simple');
var validateToken = require('routes/get_shield').validateToken;

module.exports = function(req, res, next) {

  var token = req.headers['x-access-token'];

  if (token) {
    
    try {
      var decoded_token = jwt.decode(token, app.get('secret'));

      if (decoded_token.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
      var currUser = validateToken(decoded_token); 
      if (dbUser) {
        req.user = currUser;
        return next();
      } else {
        res.json({
          "status": 404,
          "message": "ERROR FINDING USER"
        });
        return;
      }
  }
};

