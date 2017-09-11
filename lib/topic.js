var Topic = require('../models').Topic;

//新建一个话题
exports.addTopic = function (data) {
  return Topic.create(data);
};

//通过id获取一个话题
exports.getTopic = function (id) {
  return Topic.findById(id).exec();
};

//通过id获取一个话题,并增加pv 1
exports.getTopicById = function (id) {
  return Topic.findByIdAndUpdate(id, {$inc: {pv: 1}}).exec();
};

//通过标签和页码获取10个话题
exports.getTopicsByTab = function(tab, p) {
  var query = {};
  if (tab) { query.tab = tab; }
  return Topic.find(query).skip((p - 1) * 10).sort('-updated_at').limit(10).select('-content').exec();
};

//获取用户所有话题
exports.getTopicsByName = function (name, p) {
  return Topic.find({'user.name': name}).skip((p - 1) * 10).sort('-updated_at').limit(10).select('-content').exec();
};

//通过id增加一个话题的评论数
exports.incCommentById = function (id) {
  return Topic.findByIdAndUpdate(id, {$inc: {comment: 1}}).exec();
};

//获取5条最新未评论的话题
exports.getNoReplyTopics = function() {
  return Topic.find({comment: 0}).sort('-updated_at').limit(5).select('title').exec();
};

//获取不同标签的话题数
exports.getTopicsCount = function(tab) {
  var query = {};
  if (tab) { query.tab = tab; }
  return Topic.count(query).exec();
};

//获取用户的所有话题数
exports.getUserCount = function(name) {
  return Topic.count({'user.name': name}).exec();
};

//删除一个话题
exports.removeTopic = function(id) {
  return Topic.remove({ _id: id}).exec();
};

//更新一个话题
exports.editTopic = function(id, title, content) {
  return Topic.update({_id: id}, {$set: {title: title,content: content}}).exec();
}

