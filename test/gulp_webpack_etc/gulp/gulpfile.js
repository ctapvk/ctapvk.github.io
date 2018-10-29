const gulp = require('gulp');
const vueify = require('gulp-vueify2');

gulp.task('default', ['build']);

gulp.task('build', function() {
  return gulp.src('./src/my-component.vue').pipe(
      vueify({
        extractCSS: true,
        CSSOut: './deploy/bundle.css',
      })
  ).pipe(gulp.dest('./deploy'))
      ;
});