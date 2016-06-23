var gulp = require('gulp'),
  shell = require('gulp-shell'),
  typings = require('gulp-typings'),
  paths = require('../paths');

gulp.task('typings:install', function(cb) {
  gulp.src('typings.json')
    .pipe(typings())
    .on('finish', cb);
});

gulp.task('typings:copy', function() {
  gulp.src(paths.typings + '/**/*')
    .pipe(gulp.dest(paths.dist.typings));
});
