var UserModel = require('../models/user');

var signup = {

  create: function(req, res) {
    var user = new UserModel({
      username:      req.body.username,
      password:    req.body.password
    });
    console.log(user);
    user.save(function(err) {
      if(err) {
        res.send(err);
        console.log('ehhh errrrr');
        res.end('Check Parameters', 400);
        return;
      }
      res.json({ message: 'User added!', data: user });
    })
  }
};

module.exports = signup;

