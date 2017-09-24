var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;
var Models = require('../lib/core');
var $Topic = Models.$Topic;

//获取编辑页面
router.get('/:topicId', checkLogin, function(req, res, next){
  var topicId = req.params.topicId;
    $Topic.getTopic(topicId)
      .then(function(result){
        var data = result;
        res.render('create',{
          data: data
        });
      }).catch(next);
});

//提交编辑页面
router.post('/:topicId', checkLogin, function(req, res, next){
  var topicId = req.params.topicId,
      content = req.body.content,
      title = req.body.title;
    $Topic.editTopic(topicId, title, content)
      .then(function(result){
        res.redirect('/topic/'+topicId);
      }).catch(next);
});

module.exports = router;