const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rcs = require('gulp-rcs');
// const browserSync = require('browser-sync').create();

function styles() {
  return gulp.src('./gulp/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('./static/css'));
  // .pipe(browserSync.stream());
}

function watch() {
  // browserSync.init({
  //   server: {
  //     baseDir: "./"
  //   }
  // });
  gulp.watch('./gulp/**/*.scss', styles);
  // gulp.watch('./*.html').on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('watch', watch);

gulp.task('all', () => {
  return gulp.src(['./static/**/*.css', './static/**/*.js', './*.html'])
    .pipe(rcs())
    .pipe(gulp.dest('./dist/'));
});