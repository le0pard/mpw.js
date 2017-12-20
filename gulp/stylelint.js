const gulp = require('gulp')
const gulpStylelint = require('gulp-stylelint')

gulp.task('stylelint', function() {
  return gulp
    .src('webpack/**/*.sass')
    .pipe(gulpStylelint({
      syntax: 'sugarss',
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
})
