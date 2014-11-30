var gulp = require('gulp');
var concat = require('gulp-concat');
var multipipe = require('multipipe');
var colors = require('chalk');
var JS_FILES = ['public/assets/js/blog/module.js', 'public/assets/js/**/module.js', 'assets/js/**/*.js'];

gulp.task('build', buildJsFiles);
gulp.task('watch', function() {
  var watcher = gulp.watch(JS_FILES, function() {
    buildJsFiles();
  });

  watcher.on('change', function(whatChanged) {
    console.log(colors.magenta(whatChanged.path), 'was', colors.green(whatChanged.type));
  });
});

function buildJsFiles() {
  multipipe(
    gulp.src(JS_FILES),
    concat('app.js'),
    gulp.dest('public/assets/'),
    done
  );

  function done(err) {
    err && console.log(err);
  }

}
