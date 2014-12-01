'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var multipipe = require('multipipe');
var colors = require('chalk');
var tinylr = require('tiny-lr');

var JS_FILES = ['public/assets/js/blog/module.js', 'public/assets/js/**/module.js', 'public/assets/js/**/*.js'];
var TEMPLATE_FILES = ['public/assets/views/**/*.html'];

gulp.task('build', buildJsFiles);
gulp.task('watch', function() {
  var livereload = tinylr();
  var jsWatcher = gulp.watch(JS_FILES, function() {
    buildJsFiles();
  });
  var htmlWatcher = gulp.watch(TEMPLATE_FILES);

  jsWatcher.on('change', onChange);
  htmlWatcher.on('change', onChange);

  function onChange(whatChanged) {
    console.log(colors.magenta(whatChanged.path), 'was', colors.green(whatChanged.type));
    livereload.changed({
      body: {
        files: ['*']
      }
    });
  }

  livereload.listen(35729);
});

function buildJsFiles(next) {
  multipipe(
    gulp.src(JS_FILES),
    concat('app.js'),
    gulp.dest('public'),
    done
  );

  function done(err) {
    err && console.log(err);
    next && next(err);
  }

}
