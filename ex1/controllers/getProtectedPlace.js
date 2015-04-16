var UserModel = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment');
//var express = require('express');

module.exports.set = function(app) {
   /*
	* get method to request token
	* called when logging in.
	*/
	app.route('/token').get(function(req, res) {
	   /*
	    * Check if header has fields username and password
	    * Login must send credentials in header to receive token
	    */
		if (req.headers.username && req.headers.password) {	
		   /*
		    * use user model to call find method to look up username from request header
		    */	
	    	UserModel.findOne({ username: req.headers.username }, function(err, user) {
	    	   /*
	    	    * send 401 response if user is not found
	    	    */
				if(err || !user) {		
					res.send('Authentication error No User Found', 401);
					return;
				}
			   /*
			    * use the user found to check if password is correct
			    */
	      		user.comparePassword(req.headers.password, function(err, isMatch) {
	      		   /*
				    * send 401 if password doesn't match
				    */
			      	if(err || !isMatch) {	      		
			      		res.send('Authentication error or Incorrect Password', 401);
			      		return;
			      	}
			       /*
				    * if it is a match:
				    *    - set an expiration date
					*    - make a JWT with uname, expiration time, and hash secret
					*    - respond with the token, the expiration time, and the usermodel
				    */
					if(isMatch) {	
						var expires = moment().add('days', 7).valueOf();		
						var token = jwt.encode(
							{
								iss: user.id,
								exp: expires
							}, 
							app.get('jwtTokenSecret')
						);						
						res.json({
							token : token,
							expires : expires,
							user : user.toJSON()
						});
					} else {
					   /*
					    * send 401 if password doesn't match
					    */						
						res.send('Authentication error no password match', 401);
						return;
					}
				});
	    	});
		} else {
		   /*
		    * send 401 if password doesn't match
		    */
			res.send('Authentication error no username or password in header', 401);
			return;
		}
	});
}

