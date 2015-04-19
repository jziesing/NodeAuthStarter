var express = require('express');
var router = express.Router(['caseSensitive']);
var shield = require('../controllers/shield');
var get_shield = require('../controllers/get_shield');
var signup = require('../controllers/signup');
var user = require('../controllers/user');
var comments = require('../controllers/comments');
/*
 *
 *	ROUTE PROTECTION
 *
 */
router.use(shield);
var checkUser = function(req, res, next) {
	if(!req.user) {
		res.end('Not authorized', 401);
	} else {
		next();
	}
};
router.all('/api/*', shield, checkUser);
/*
 *
 *	UNPROTECTED ROUTES -----------------
 *
 */
router.get('/comments',comments.getAll);
router.post('/comments', comments.postOne);
/*
 *
 *	CREATE USER ROUTE -----------------
 *
 */
router.post('/signup', signup.create);
/*
 *
 *	LOGIN ROUTE -----------------
 *
 */
router.post('/login', get_shield.login);
 /*
  *
  *	PROTECTED ROUTES under /api -----------------
  *
  */
router.get('/api/users', checkUser, user.getAll);
router.get('/api/user/:id', checkUser, user.getOne);
router.put('/api/user/:id', checkUser, user.update);
router.delete('/api/user/:id', checkUser, user.delete);

module.exports = router;


