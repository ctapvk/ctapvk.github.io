const gulp = require('gulp');
const vueify = require('gulp-vueify2'); // однофайловые компоненты

gulp.task('default', ['build']);

gulp.task('build', function() {
  return gulp.src('./src/my-component.vue')  // что компилим
      .pipe(vueify({
            extractCSS: true,
            CSSOut: './svd/bundle.css',
          }),
      ) //
      .pipe(gulp.dest('./svd')) // куда компилим
      ;
});