var gulp = require('gulp'),
  typedoc = require('gulp-typedoc');

gulp.task('docs', function() {
  return gulp.src(['src/**/*.ts'])
    .pipe(typedoc({
      module: 'commonjs',
      target: 'es5',
      includeDeclarations: true,

      out: './docs',
      mode: 'file',
      includeDeclarations: false,

      name: 'groupby-api',
      ignoreCompilerErrors: true,
      excludeExternals: true,
      version: true
    }));
});
