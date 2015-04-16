/*
 * USER MODEL/CONTROLLER
 * need db access and brcypt access
 * set salt size
 */
var mongoose = require('mongoose');
/*
 * define schema
 */
var CommentSchema = mongoose.Schema({
	email: { type: String, required: true },
    screenname: { type: String, required: true },
    message: { type: String, required: true }
});
/*
 * export the schema as var User
 */
module.exports = mongoose.model('Comment', CommentSchema)