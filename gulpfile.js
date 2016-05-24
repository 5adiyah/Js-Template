var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'); //Keeps watch going even if you make a syntax error

//////// SCRIPTS TASKS //////////
gulp.task('scripts', function(){
  gulp.src('js/**/*.js') //Grabs all js files, uglifies it, and pipes to destination
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

//////// JsHint //////////
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//////// CSSBUILD //////////
gulp.task('cssBuild', function() {
  return gulp.src('scss/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

//////// BrowserSync //////////
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
});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});
//////// WATCH TASKS //////////
gulp.task('watch', function(){
  gulp.watch('js/**/*.js', ['scripts']);
});


//////// DEFAULT TASKS //////////
gulp.task('default', ['scripts', 'watch', 'jshint']);
