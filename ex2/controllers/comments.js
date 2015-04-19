/*
 * BASIC CONTROLLER TO GET AND POST COMMENTS || UPROTECTED
 */
var Comment = require('../models/comment');
/*
 * unprotected route controller
 */
var comments = {
	getAll: function(req, res) {
		Comment.find(function(err, comments) {
		    if (err) {
		    	res.send(err);	
		    }
		    res.send(comments);
	  	})
	  	res.send('no comments');
	},
	postOne: function(req, res) {
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
		})
	}
};

module.exports = comments;

