"use strict";

var jade = require("metalsmith-jade");
var markdown = require("metalsmith-markdown");
var metalsmith = require("metalsmith");
var templates = require("metalsmith-templates");
var beautify = require("metalsmith-beautify");
var serve = require("metalsmith-serve");
var gulp = require("gulp");
var stylus = require("gulp-stylus");
var gulpStylus = require("gulp-stylus");
var stylus = require("stylus");
var filter = require("gulp-filter");
var concat = require("gulp-concat");
var highlight = require("highlight.js");
var ignore = require("metalsmith-ignore");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer-core");


var movePosts = require("./lib/move-posts");
var setPostCollection = require("./lib/set-post-collection");


gulp.task("stylus", function() {
  var stylusFilter = filter("*.styl");

  return gulp
    .src([
      "./stylesheets/lib/**/*.css",
      "./stylesheets/application.styl"
    ])
    .pipe(stylusFilter)
    .pipe(gulpStylus())
    .pipe(stylusFilter.restore())
    .pipe(postcss([autoprefixer({ browsers: ["last 2 version"] })]))
    .pipe(concat("application.css"))
    .pipe(gulp.dest("./source/stylesheets"));
}).start();

metalsmith(__dirname)
  .source("./source")
  .destination("./build")
  .use(ignore([
    ".DS_Store"
  ]))
  .use(setPostCollection)
  .use(markdown({
    gfm: true,
    highlight: function (code) {
      return highlight.highlightAuto(code).value;
    }
  }))
  .use(templates({
    engine: "jade",
    directory: "templates"
  }))
  .use(jade({
    useMetadata: true
  }))
  .use(movePosts)
  .use(beautify({
    js: false,
    html: {
      "wrap_line_length": 80
    }
  }))
  .use(serve({
    host: "0.0.0.0"
  }))
  .build(function(err) {
    if (err) { throw err; }
  });
