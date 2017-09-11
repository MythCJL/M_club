var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var config = require('../config/config').mongodb;

mongoose.connect(config.url, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.url, err.message);
    process.exit(1);
  }
});

exports.User = require('./user');
exports.Topic = require('./topic');
exports.Comment = require('./comment');