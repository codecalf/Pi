var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create(),
  rename = require('gulp-rename'),
  autopref = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  getheader = require('gulp-headerfooter'),
  fs = require('fs'),
  imagemin = require('gulp-imagemin'),
  sourcemaps = require("gulp-sourcemaps"),
  plumber = require('gulp-plumber');

gulp.task('sass', () => {
  return gulp.src('./app/sass/style.sass')
      .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autopref())
        .pipe(rename({basename: 'style'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
});
gulp.task('js', () => {
  return gulp.src('./app/js/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});


gulp.task('html', () => {
  return gulp.src('./app/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('default', () => {
  browserSync.init({
    server: './dist'
  });
  gulp.watch('./app/*.html', ['html']);
  gulp.watch('./app/sass/*.sass', ['sass']);
  gulp.watch('./app/js/*.js', ['js']);
  gulp.watch('./app/js/*.cardicons', ['svg']);
});
