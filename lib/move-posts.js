"use strict";

module.exports = function(files, metalsmith, done) {
  Object.keys(files).forEach(function (file) {
    var searchVal = /^posts\/([0-9]{4})\/(.+\.html)$/;

    if (searchVal.test(file)) {
      var path = file.replace(searchVal, "$1-$2");
      files[path] = files[file];
      delete files[file];
    }
  });

  done();
};
