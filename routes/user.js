var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;
var Models = require('../lib/core');
var $Topic = Models.$Topic;

//获取个人中心
router.get('/:userName', checkLogin, function(req, res, next) {
  var name = req.params.userName,
        p = +req.query.p || 1;
        console.log(name,p);
    Promise.all([
      $Topic.getTopicsByName(name, p),
      $Topic.getUserCount(name)
      ]).then(function(result){
      var topics = result[0],
          count = result[1],
          topicsCount = {
            pages: Math.ceil(count/10),
            items: [p-2, p-1, p, p+1, p+2],
            prePage: '?p=' +(p-1),
            nextPage: '?p=' +(p+1)
          };
      res.render('user', {
        p: p,
        name: name,
        topics: topics,
        topicsCount: topicsCount
      });
     }).catch(next);
});

//删除话题
router.get('/:userName/:topicId/remove', checkLogin, function(req, res, next){
  var name = req.params.userName,
      sname = req.session.user.name,
      topicId = req.params.topicId;
  try{  
    if(name!==sname){
      throw new Error('没有权限!');
      }
    }catch(e){
      res.redirect('/');
    };
    $Topic.removeTopic(topicId)
      .then(function(result){
        res.redirect('back');
      }).catch(next);
});

module.exports = router;