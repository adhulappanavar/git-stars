var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var gzip = require('gulp-gzip');

gulp.task('compress', function (cb) {
  pump([
      gulp.src('dist/*.js'),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('gzip', function() {
    gulp.src('dist/*.js')
	.pipe(gzip())
	.pipe(gulp.dest('dist'));
});