var express = require('express'),
    router = express.Router(),
    crypto = require('crypto');

var Models = require('../lib/core');
var $User = Models.$User;
var checkNotLogin = require('../middlewares/check').checkNotLogin;

//get /signup 注册页
router.get('/', checkNotLogin, function(req, res, next) {
	res.render('signup');
});

//post /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
	var name = req.body.name,
	 gender = req.body.gender,
	 password = req.body.password,
	 re_password = req.body.re_password,
	 email = req.body.email,
	 signature = req.body.signature;
	try{
		if(!(name.length >= 1 && name.length <= 10)){
			throw new Error('名字请限制在 1-10 个字符');
		};
		if(!(signature.length >= 1 && signature.length <= 15)){
			throw new Error('个人简介请限制在 1-15 个字符');
		};
		if(password.length < 6){
			throw new Error('密码至少 6 个字符');
		}
		if(password !== re_password){
			throw new Error('两次输入的密码不一样');
		}
	}catch(e) {
		req.flash('error', e.message);
	  return res.redirect('/signup');
	}
	var md5p = crypto.createHash('md5'),
			password = md5p.update(req.body.password).digest('hex'),
			md5e = crypto.createHash('md5'),
			email = md5e.update(req.body.email).digest('hex');
	var user ={
		name: name,
		email: email,
		password: password,
		gender: gender,
		signature: signature
	};
	Promise.all([
		$User.getUserByName(name),
		$User.addUser(user)
		]).then(function(result){
			var userExit = result[0];
					if(userExit) {
						req.flash('error','用户名已占用');
						res.redirect('/signup');
					};
					req.flash('success','注册成功');
					res.redirect('/signin');
		}).catch(next);
});
module.exports = router;