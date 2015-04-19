/*
 * WILL CHANGE TO MORE GENERIC DB SETUP
 */
//var colors = require('colors');
var mongoose = require('mongoose');
/**
 * Import the model(s)
 */
var UserModel = require('./models/user');
/**
 * Connect to the database
 */
mongoose.connect('mongodb://localhost/brand');
var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'Failed to connect to database!'.red));
db.once('open', function callback() {
	var user = new UserModel();
	user.username = 'jimjones';
	user.password = 'password';
	user.save(function(err) {
		if(err) {
			console.log(err);
			console.log('Could not save user.');
		} else {
			console.log('Database seeded');
		}
		process.exit();
	});	
});
console.log('DONE!!');

