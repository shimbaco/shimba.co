"use strict";

var moment = require("moment");


module.exports = function(files, metalsmith, done) {
  var metadata = metalsmith.metadata();
  var posts = [];

  Object.keys(files).forEach(function (file) {
    var searchPath = /^posts\/([0-9]{4})\/(.+)\.md$/;

    if (searchPath.test(file)) {
      var path = file.replace(searchPath, "$1-$2.html");
      posts.push({
        path: path,
        title: files[file].title,
        date: moment(files[file].date).format("YYYY-MM-DD")
      });
    }
  });

  metadata.posts = posts.sort(function(a, b) {
    return a.date < b.date;
  });

  return done();
};
