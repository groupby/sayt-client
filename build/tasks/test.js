var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  istanbul = require('gulp-istanbul'),
  runSequence = require('run-sequence'),
  paths = require('../paths.js');

gulp.task('test', function(cb) {
  gulp.src(paths.dist.commonjs + '/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(paths.test + '/**/*.js')
        .pipe(mocha({ reporter: 'spec' }))
        .pipe(istanbul.writeReports()) // Creating the reports after tests ran
        .on('end', cb);
    });
});

gulp.task('test:watch', ['test'], function() {
  gulp.watch([
    paths.src + '/**/*.ts',
    paths.test + '/**/*.ts'
  ], ['test']);
});
