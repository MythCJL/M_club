var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var checkLogin = require('../middlewares/check').checkLogin;
var Models = require('../lib/core');
var $Topic = Models.$Topic;
var $Comment = Models.$Comment;

router.get('/:topicId', function(req, res, next) {
	var topicId = req.params.topicId;
		Promise.all([
			$Topic.getTopicById(topicId),
			$Comment.getCommentsByTopicId(topicId)
			])
			.then(function(result){
				var topic = result[0];
				var comments = result[1];
				res.render('topic',{
					topic: topic,
					comments: comments
				})
			}).catch(next)
});

router.post('/:topicId', checkLogin, function(req, res, next) {
	var topicId = req.params.topicId;
	var data = {
		topicId: topicId,
		user: {
			name: req.session.user.name,
			email: req.session.user.email
		},
		content: req.body.content
	};
	Promise.all([
		$Comment.addComment(data),
		$Topic.incCommentById(topicId)
		]).then(function(result) {
				req.flash('success', '回复成功');
				res.redirect('back');
			}).catch(next);
});

module.exports = router;