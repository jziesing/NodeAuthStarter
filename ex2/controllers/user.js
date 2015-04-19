var UserModel = require('../models/user');
var users = {

  getAll: function(req, res) {
    UserModel.find(function(err, users) {
        if(err) {
          res.send(err);  
        }
        res.send(users);
      })
  },

  getOne: function(req, res) {
    var id = req.params.id;
    var user = data[0]; // Spoof a DB call
    //res.json(user);

    UserModel.find({ user_id: req.user._id }, function(err, cameras) {
      if(err) {
        res.send(err);
      }
      res.send(cameras);
    });
  },



  update: function(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    data[id] = updateuser // Spoof a DB call
    res.json(updateuser);
  },

  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};


module.exports = users;

