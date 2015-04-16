/*
 * area for secure routes
 */
var jwtAuth = require('./jwtAuth');
var Camera = require('../models/camera');
var User = require('../models/user');
/*
 * method to call in protected routes
 * if jwtAuth is successful, req.user gets set
 * else it is not so this method sees it and sends 401
 */
var requireAuth = function(req, res, next) {
	if(!req.user) {
		res.end('Not authorized', 401);
	} else {
		next();
	}
};
/*
 * method to get cameras
 */
var getCameras = function(req, res) {
  Camera.find({ user_id: req.user._id }, function(err, cameras) {
    if(err) {
    	res.send(err);
    }
    res.json(cameras);
  });
};
/*
 * method to post camera
 */
var postCamera = function(req, res) {
  var camera = new Camera({
    name:       req.body.name,
    location:   req.body.location,
    ip:         req.body.ip,
    user_id:    req.user._id
  });
  camera.save(function(err) {
    if(err) {
      res.send(err);  
    }
    res.json({ message: 'camera added!', data: camera });
  });
};
/*
 *
 */
var getCamera = function(req, res) {
  //console.log("")
  Camera.find({ user_id: req.user._id, _id: req.params.id_camera }, function(err, camera) {
    if(err) {
      res.send(err);
    }

    res.json({ message: 'my messagesee', data: camera});
  });
};
/*
 *
 */
var putCamera = function(req, res) {
  console.log('do i hit the method');
  // Use the Beer model to find a specific beer
  Camera.update({ user_id: req.user._id, _id: req.params.id_camera }, 
    { name: req.body.name, locatio: req.body.location, ip: req.body.ip  }, function(err, num, raw) {
      if(err) {
        res.send(err);  
      }
      res.json({ message: num + ' updated' });
  });
};
/*
 *
 */
var deleteCamera = function(req, res) {
  Camera.remove({ user_id: req.user._id, _id: req.params.id_camera }, function(err) {
    if(err) {
      res.send(err);
    }
    res.json({ message: 'Camera removed!' });
  });
};
/*
 * method to get cameras
 */
var getUser = function(req, res) {
  User.find({ _id: req.user._id }, function(err, user) {
    if(err) {
      res.send(err);
    }
    res.json(user);
  });
};
/*
 * routes to export
 */
module.exports.set = function(app) {
	/*
	 * tester
	 */
	app.route('/secret').get(jwtAuth, requireAuth, function(req, res) {	
		res.send('Hello ' + req.user.username);
	});
	/*
	 * cameras
	 */
	app.route('/cameras')
		.post(jwtAuth, requireAuth, postCamera)
		.get(jwtAuth, requireAuth, getCameras);
  /*
   * camera
   */
  app.route('/camera/:id_camera')
    .put(jwtAuth, requireAuth, putCamera)
    .get(jwtAuth, requireAuth, getCamera)
    .delete(jwtAuth, requireAuth, deleteCamera);
  /*
   * user
   */
  app.route('/user')
    .get(jwtAuth, requireAuth, getUser);
    

	
};