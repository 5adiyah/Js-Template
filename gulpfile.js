var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'); //Keeps watch going even if you make a syntax error

gulp.task('jsBrowserify', function() {
  return browserify({ entries: ['./js/main.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./app/js'));
});

gulp.task('scripts', function(){
  gulp.src('js/**/*.js') //Grabs all js files, uglifies it, and pipes to destination
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('cssBuild', function() {
  return gulp.src('scss/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(["scss/*.scss"], ['cssBuild']);
  gulp.watch(["/*.html"], ['htmlBuild']);
});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function(){
  browserSync.reload();
});

gulp.task('styleBuild', function(){
  browserSync.reload();
});

//////// WATCH TASKS //////////
gulp.task('watch', function(){
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(["scss/*.scss"], ['cssBuild']);
  gulp.watch(["css/*.css"], ['styleBuild']);
  gulp.watch(["*.html"], ['htmlBuild']);
});

//////// DEFAULT TASKS //////////
gulp.task('default', ['scripts', 'watch', 'jshint', 'serve']);
