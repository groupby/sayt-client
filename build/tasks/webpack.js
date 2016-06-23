var gulp = require('gulp'),
  wp = require('webpack'),
  webpack = require('webpack-stream'),
  pjson = require('../../package.json'),
  paths = require('../paths.js'),
  packConfig = require('../../webpack.conf'),
  assign = require('object-assign');

gulp.task('webpack:bundle', function() {
  return gulp.src('')
    .pipe(webpack(packConfig))
    .pipe(gulp.dest(paths.dist.browser));
});

gulp.task('webpack:minify', function() {
  var minConfig = assign({}, packConfig, {
    output: { filename: pjson.name + '-' + pjson.version + '.min.js' },
    plugins: [new wp.optimize.UglifyJsPlugin()]
  });

  return gulp.src('')
    .pipe(webpack(minConfig))
    .pipe(gulp.dest(paths.dist.browser));
});


gulp.task('webpack:watch', function() {
  return gulp.src('')
    .pipe(webpack(assign({}, packConfig, { watch: true })))
    .pipe(gulp.dest(paths.dist.browser));
});
