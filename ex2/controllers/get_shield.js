/*
 * CODE FLOW = OBJECT GET_SHIELD DEFINES:
 *                  LOGIN
 *                  VALIDATE
 *                  VALIDATE_TOKEN
 *                  **^ functions use token functions not in object
 *
 *   ****  USE AS GET_SHIELD OBJECT WITH FUNCTIONS TO LOGIN AND VALIDATE TOKEN   ****
 *
 * GET_SHIELD EVIRONMENT SETUP
 *
 */
var jwt = require('jwt-simple');
var UserModel = require('../models/user');
/*
 * GET SHIELD OBJECT,  WHAT IS EXPORTED AS MODULE
 */
var get_shield = {
  login: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if(username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
    var valid_user = get_shield.validate(username, password);
    if(!valid_user) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
    if(valid_user) {
      res.json(genToken(valid_user));
    }
  },
  validate: function(username, password) {
    UserModel.findOne({
      username: username
    }, function(err, user) {
      if(err || !user) {
        res.send('Authentication error No User Found', 401);
        return false;
      }
      user.comparePassword(password, function(err, isMatch) {
        if(err || !isMatch) {
          res.send('Authentication error or Incorrect Password', 401);
          return false;
        }
        if(isMatch) {
          // SUCCESS!!!!
          return user;
        } else {
          res.send('Authentication error no password match', 401);
          return false;
        }
      });
    });
  },
  validateToken: function(decoded_token) {
    UserModel.findOne({
      '_id': decoded_token.iss
    }, function(err, user) {
      if(!err) {
        return user;
      }
    })
    return false;
  },
}

function genToken(user) {
  var expires = expiresIn(1 / 2); // 7 days
  var token = jwt.encode({
    iss: user.id,
    exp: expires
  }, app.get('secret'));

  return {
    token: token,
    expires: expires,
    user: user.toJSON()
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = get_shield;