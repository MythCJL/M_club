var express = require('express');
var router = express.Router();

var Models = require('../lib/core');
var $Topic = Models.$Topic;

/* GET home page. */
router.get('/', function(req, res, next) {
 	var tab = req.query.tab || '',
      p = +req.query.p || 1;
  Promise.all([
  	$Topic.getTopicsByTab(tab, p),
  	$Topic.getNoReplyTopics(),
  	$Topic.getTopicsCount(tab)
  	]).then(function(result){
  		var topics = result[0],
  				noReplyTopics = result[1],
  				count = result[2],
          topicsCount = {
            pages: Math.ceil(count/10),
            items: [p-2, p-1, p, p+1, p+2],
            prePage: '?tab=' + tab +'&p=' +(p-1),
            nextPage: '?tab=' + tab +'&p=' +(p+1)
          };
  		res.render('index', {
  			tab: tab,
  			p: p,
  			topics: topics,
  			noReplyTopics: noReplyTopics,
  			topicsCount: topicsCount
  		})
  	}).catch(next);
});

module.exports = router;
