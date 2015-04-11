/*
 * Require in the other controllers
 */
var unprotectedPlace = require('./unprotectedPlace.js');
var getProtectedPlace = require('./getProtectedPlace.js');
var protectPlace = require('./protectedPlace.js');
/*
 * stuff to export
 */
module.exports.set = function(app) {
	/*
	 * pass express app, router to controllers that export code
	 */
	unprotectedPlace.set(app);
	getProtectedPlace.set(app);
	protectPlace.set(app);
};

