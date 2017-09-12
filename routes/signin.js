var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var Models = require('../lib/core');
var $User = Models.$User;
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function(req, res, next) {
	res.render('signin');
});

router.post('/', checkNotLogin, function(req, res, next) {
	var name = req.body.name,
			md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
	$User.getUserByName(name)
		 .then(function(user) {
		 	if(!user) {
		 		req.flash('error', '用户不存在');
		 		return res.redirect('back');
		 	}
		 	if(password !== user.password) {
		 		req.flash('error', '用户名或密码错误');
		 		return res.redirect('back');
		 	}
		 	req.flash('success', '登录成功');
		 	user.password = null;
		 	req.session.user = user;
		 	res.redirect('/');
		 }).catch(next);
});

module.exports = router;