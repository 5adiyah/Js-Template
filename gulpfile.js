var gulp = require('gulp'),
    uglify = require('gulp-uglify');

//////// SCRIPTS TASKS //////////
gulp.task('scripts', function(){
  gulp.src('js/*.js') //Grabs all js files, uglifies it, and pipes to destination
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});



//////// DEFAULT TASKS //////////
gulp.task('default', ['scripts']);
