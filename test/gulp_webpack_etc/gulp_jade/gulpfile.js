// Load plugins
const gulp = require('gulp');
const gulpJade = require('gulp-jade');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browsersync = require('browser-sync').create();
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');


const PUBLIC_DIR = './public';
const SRC_DIR = './src';
const IS_PROD = false;
const BROWSER_SYNC_CONF = {
  port: 3333,
  server: {
    baseDir: PUBLIC_DIR,
  },
};

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

function jade() {
  let cur = gulp.src(SRC_DIR + '/jade/public/**/*.jade');
  cur = cur.pipe(gulpJade({pretty: IS_PROD ? false : true}));
  cur = cur.pipe(gulp.dest(PUBLIC_DIR));
  cur = cur.pipe(browsersync.stream()); // пишет в консоль что изменилось
  //
  cur = gulp.src(SRC_DIR + '/jade/public/static/**/*');
  cur = cur.pipe(gulp.dest(PUBLIC_DIR + '/static'));
  //
  cur = gulp.src(SRC_DIR + '/jade/**/*.js');
  if (!IS_PROD) cur = cur.pipe(sourcemaps.init());
  cur = cur.pipe(concat('all.js'));
  if (!IS_PROD) cur = cur.pipe(sourcemaps.write());
  if (IS_PROD) cur = cur.pipe(uglify());
  cur = cur.pipe(gulp.dest(PUBLIC_DIR + '/'));
  cur = cur.pipe(browsersync.stream()); // пишет в консоль что изменилось
  //
  cur = gulp.src(SRC_DIR + '/jade/**/*.scss');
  cur = cur.pipe(sass({outputStyle: 'expanded',}));
  if (!IS_PROD) cur = cur.pipe(sourcemaps.init());
  cur = cur.pipe(concat('all.css'));
  if (!IS_PROD) cur = cur.pipe(sourcemaps.write());
  if (IS_PROD) cur = cur.pipe(cleanCSS());
  cur = cur.pipe(gulp.dest(PUBLIC_DIR + '/'));
  cur = cur.pipe(browsersync.stream()); // пишет в консоль что изменилось

  return cur;
}

function scripts() {
  let cur = gulp.src(SRC_DIR + '/js/**/*.js');
  if (IS_PROD) cur = cur.pipe(uglify());
  cur = cur.pipe(gulp.dest(PUBLIC_DIR + '/js'));
  cur = cur.pipe(browsersync.stream()); // пишет в консоль что изменилось
  return cur;
}

function css() {
  let cur = gulp.src(SRC_DIR + '/scss/*.scss');
  cur = cur.pipe(sass({outputStyle: 'expanded',}));
  if (IS_PROD) cur = cur.pipe(cleanCSS());
  cur = cur.pipe(gulp.dest(PUBLIC_DIR + '/css'));
  cur = cur.pipe(browsersync.stream()); // пишет в консоль что изменилось
  return cur;
}

gulp.task('clean', () => del([PUBLIC_DIR]));

// BrowserSync
function browserSync() {
  browsersync.init(BROWSER_SYNC_CONF);
}

function browserSyncReload() {
  browsersync.reload();
}

// Watch files
function watchFiles() {
  gulp.watch(SRC_DIR + '/scss/**/*', css);
  gulp.watch(SRC_DIR + '/jade/**/*', jade);
  gulp.watch(SRC_DIR + '/js/**/*', scripts);
  gulp.watch(PUBLIC_DIR + '/**/*', browserSyncReload);
}

// todo main tasks
gulp.task('default', gulp.parallel('vendor', css, jade, scripts));
gulp.task('dev', gulp.series('clean',
    gulp.parallel('default', watchFiles, browserSync),
));
