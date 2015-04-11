/*
 * WILL CHANGE TO MORE GENERIC DB SETUP
 */
var colors = require('colors');
var mongoose = require('mongoose');
/**
 * Import the model(s)
 */
var UserModel = require('./models/user');
var CommentModel = require('./models/comment');
/**
 * Connect to the database
 */
mongoose.connect('mongodb://localhost/jwttest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Failed to connect to database!'.red));
// db.once('open', function callback() {
// 	var user = new UserModel();
// 	user.email = 'bob';
// 	user.username = 'bob';
// 	user.password = 'password';
// 	user.save(function(err) {
// 		if(err) {
// 			console.log(err);
// 			console.log('Could not save user.'.red);
// 		} else {
// 			console.log('Database seeded');
// 		}
// 		process.exit();
// 	});	
// });

db.once('open', function callback() {
	var comment = new CommentModel();
	comment.email = 'testMan';
	comment.screenname = 'testMan';
	comment.message = 'a nice test message for yea';
	comment.save(function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log('db seeded comments');
		}
		process.exit();
	});

	var user = new UserModel();
	user.email = 'bob';
	user.username = 'bob';
	user.password = 'password';
	user.save(function(err) {
		if(err) {
			console.log(err);
			console.log('Could not save user.'.red);
		} else {
			console.log('Database seeded');
		}
		process.exit();
	});	
});


