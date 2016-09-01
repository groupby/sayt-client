var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  merge = require('merge-stream'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  paths = require('../paths'),
  shell = require('gulp-shell');

var tsProject = ts.createProject('tsconfig.json', {
  sortOutput: true,
  declaration: true,
  typescript: require('typescript')
});

gulp.task('typescript:build', function() {
  var tsResult = gulp.src([
      paths.src + '/**/*.ts',
      paths.src + '/**/*.d.ts',
      paths.test + '/**/*.ts'
    ], {
      base: paths.src
    })
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts
    .pipe(gulp.dest(paths.dist.commonjs)),
    tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.commonjs))
  ]);
});

gulp.task('typescript:definitions', shell.task([
  'node build/scripts/dts-bundle.js'
]));
