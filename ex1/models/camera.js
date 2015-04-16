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
var CameraSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    ip: { type: String, required: true },
    user_id: String
});
/*
 * define schema save actions
 */
CameraSchema.pre('save', function(next) {
    var camera = this;
    // find what this check does
    if(!camera.isModified('ip')) {
        return next();
    } 
    bcrypt.genSalt(saltySize, function(err, salt) {
        if(err) {
            return next(err); 
        } 
        bcrypt.hash(camera.ip, salt, function(err, hash) {
            if(err) {
                return next(err);
            } 
            camera.ip = hash;
            next();
        });
    });
});
/*
 * define schema method to compare password 
 */
CameraSchema.methods.compareIp = function(candidateIp, cb) {
    bcrypt.compare(candidateIp, this.ip, function(err, isMatch) {
        if(err) {
            return cb(err);    
        } 
        cb(null, isMatch);
    });
};
/*
 * define schema stat to find camera model by username 
 */
CameraSchema.statics.findByUserId = function (user_id, cb) {
    this.findOne({ user_id: user_id }, cb);
}
/*
 * export the schema as var User
 */
module.exports = mongoose.model('Camera', CameraSchema)