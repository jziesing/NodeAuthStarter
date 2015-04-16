/*
 * middleware used to check the requests authenticity
 */
var UserModel = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
   /*
    * get token from header
    */
	var token = req.headers["x-access-token"];
   /*
    * check token if valid
    *    success = req.user is set to the right user
    *    failure = no 
    */
	if (token) {
		try {
			var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
			if (decoded.exp <= Date.now()) {
				res.end('Access token has expired', 400);				
			}
			UserModel.findOne({ '_id': decoded.iss }, function(err, user) {
				if (!err) {					
					req.user = user;	
					return next();
				}
			})
		} catch (err) {			
			return next();
		}
	} else {
		next();
	}
}
