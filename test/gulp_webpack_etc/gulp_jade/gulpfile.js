// Load plugins
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const header = require('gulp-header');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const pkg = require('./package.json');
const gulp_jade = require('gulp-jade');
const uglify = require('gulp-uglify');
const del = require('del')

const PUBLIC_DIR = './public';
const SRC_DIR = './src';

// Set the banner content
const banner = [
  '/*!\n',
  ' * Copyright 2013-' + (new Date()) + ' <%= pkg.author %>\n',
  ' */\n',
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function(cb) {

  // Bootstrap
  gulp.src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*',
  ]).pipe(gulp.dest(PUBLIC_DIR + '/vendor/bootstrap'));

  // Font Awesome
  gulp.src([
    './node_modules/@fortawesome/**/*',
  ]).pipe(gulp.dest(PUBLIC_DIR + '/vendor'));

  // jQuery
  gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js',
  ]).pipe(gulp.dest(PUBLIC_DIR + '/vendor/jquery'));

  // jQuery Easing
  gulp.src([
    './node_modules/jquery.easing/*.js',
  ]).pipe(gulp.dest(PUBLIC_DIR + '/vendor/jquery-easing'));

  // Simple Line Icons
  gulp.src([
    './node_modules/simple-line-icons/fonts/**',
  ]).pipe(gulp.dest(PUBLIC_DIR + '/vendor/simple-line-icons/fonts'));

  gulp.src([
    './node_modules/simple-line-icons/css/**',
  ]).pipe(gulp.dest(PUBLIC_DIR + '/vendor/simple-line-icons/css'));

  cb();

});

// CSS task
function css() {
  return gulp.src(SRC_DIR + '/scss/*.scss').
      pipe(plumber()).
      pipe(sass({
        outputStyle: 'expanded',
      })).
      on('error', sass.logError).
      pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      })).
      pipe(header(banner, {
        pkg: pkg,
      })).
      pipe(gulp.dest(PUBLIC_DIR + '/css')).
      pipe(rename({
        suffix: '.min',
      })).
      pipe(cleanCSS()).
      pipe(gulp.dest(PUBLIC_DIR + '/css/all.css')).
      pipe(browsersync.stream());
}

function jade() {
  return gulp.src(SRC_DIR + '/jade/public/**/*.jade').
      pipe(gulp_jade()).
      pipe(gulp.dest(PUBLIC_DIR));
};

function scripts() {
  return gulp.src(SRC_DIR + '/js/**/*.js').
      pipe(plumber()).
      pipe(header(banner, {
        pkg: pkg,
      })).
      pipe(gulp.dest(PUBLIC_DIR + '/js'));
  pipe(rename({
    suffix: '.min',
  })).
      pipe(uglify()).
      pipe(gulp.dest(PUBLIC_DIR + '/js'));
};

gulp.task('clean', function (cb) {
  //  del(['**'], {cwd: 'app'}, cb)
  return del([PUBLIC_DIR+'/**'], cb)
})

// BrowserSync
function browserSync(done) {
  browsersync.init({
    port: 3333,
    server: {
      baseDir: PUBLIC_DIR,
    },
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch(SRC_DIR + '/scss/**/*', css);
  gulp.watch(SRC_DIR + '/jade/**/*', jade);
  gulp.watch(SRC_DIR + '/js/**/*', scripts);
}

// todo tasks
gulp.task('default', gulp.parallel('vendor', css, jade, scripts));
gulp.task('dev', gulp.series('clean',
    gulp.parallel('default', watchFiles, browserSync),
));
