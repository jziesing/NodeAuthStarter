/*
 * USER MODEL/CONTROLLER
 * need db access and brcypt access
 * set salt size
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var saltySize = 15;
/*
 * define schema
 */
var UserSchema = mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});
/*
 * define schema save actions
 */
UserSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) {
        return next();
    } 
    bcrypt.genSalt(saltySize, function(err, salt) {
        if(err) {
            return next(err); 
        } 
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
                return next(err);
            } 
            user.password = hash;
            next();
        });
    });
});
/*
 * define schema method to compare password 
 */
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) {
            return cb(err);        
        } 
        cb(null, isMatch);
    });
};
/*
 * define schema stat to find user model by username 
 */
UserSchema.statics.findByUsername = function (username, cb) {
  this.findOne({ username: username }, cb);
}
/*
 * export the schema as var User
 */
module.exports = mongoose.model('User', UserSchema)