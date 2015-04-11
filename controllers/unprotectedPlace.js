var Comment = require('../models/comment');
var User = require('../models/user');
/*
 * unprotected route controller
 */
var getComments = function(req, res) {
	Comment.find(function(err, comments) {
    if (err) {
    	res.send(err);	
    }
    res.json(comments);
  });
};
/*
 * post comment method
 */
var postComment = function(req, res) {
	var comment = new Comment({
		email: 			req.body.email,
		screenname:  	req.body.screenname,
		message: 		req.body.message
	});
	comment.save(function(err) {
		if(err) {
			res.send(err);
	    	console.log(err);
			res.end('Check Parameters', 400);
			return;
		}
		res.json({ message: 'Comment added!', data: comment });
	});
};
/*
 * post user method
 */
var postUser = function(req, res) {
  var user = new User({
  	email: 		req.body.email, 	
    username: 	req.body.username,
    password: 	req.body.password
  });
  user.save(function(err) {
    if(err) {
    	res.send(err);
    	console.log(err);
		res.end('Check Parameters', 400);
		return;
    }
    res.json({ message: 'New User added!' });
  });
};
/*
 * routes to export
 */
module.exports.set = function(app) {
	/*
	 * tester route
	 */
	app.route('/test').get(function(req, res) {
		res.send('testing accountes endpoint');
	});
	/*
	 * comments routes:
	 *  - get all comments
	 *  - post to comments board
	 */
	app.route('/comments')
		.get(getComments)
		.post(postComment);
	/*
	 * signup routes:
	 *  - post to make new user
	 */
	app.route('/signup')
		.post(postUser);
};

