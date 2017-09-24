var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;
var Models = require('../lib/core');
var $Topic = Models.$Topic;

router.get('/', checkLogin, function(req, res, next) {
  res.render('create');
});

router.post('/', checkLogin, function(req, res, next) {
  var data = {
    user: {
      name: req.session.user.name,
      email: req.session.user.email
    },
    title: req.body.title,
    content: req.body.content,
    tab: req.body.tab
  };
  $Topic.addTopic(data)
      .then(function(result) {
        req.flash('success', '发表成功');
        res.redirect('/topic/'+result._id);
      }).catch(next);
});

module.exports = router;