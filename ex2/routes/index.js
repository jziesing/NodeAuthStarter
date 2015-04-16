var express = require('express');
var router = express.Router();
var get_shield = require('../controllers/get_shield.js');
var user = require('../controllers/users.js');
var comments = require('../controllers/comments');
/*
 * IS TRUE IF SHIELD FINDS TOKEN AND SETS REQ.USER
 */
var checkUser = function(req, res, next) {
	if(!req.user) {
		res.end('Not authorized', 401);
	} else {
		next();
	}
};
/*
 *
 *	UNPROTECTED ROUTES -----------------
 *
 */
router.get('/comments', comments.getAll());
router.post('/comments', comments.postOne());
/*
 *
 *	CREATE USER ROUTE -----------------
 *
 */
router.get('/signup', comments.getAll());
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
router.post('/api/user/', checkUser, user.create);
router.put('/api/user/:id', checkUser, user.update);
router.delete('/api/user/:id', checkUser, user.delete);

module.exports = router;

