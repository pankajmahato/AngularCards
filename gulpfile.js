var gulp = require('gulp');
var inject = require('gulp-inject');
var wiredep = require('gulp-wiredep');
var webserver = require('gulp-webserver');
var runSequence = require('run-sequence');
var angularFilesort = require('gulp-angular-filesort');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var gutil = require('gulp-util');

gulp.task('serve', function() {
  runSequence('inject','openWebBrowser');
});

gulp.task('build', function() {
  runSequence('concat');
});

gulp.task('inject', function() {
    var target = gulp.src('index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var jsSources = gulp.src(['app/**/*.js']);
	var cssSources = gulp.src(['app/**/*.css'], {read: false});

    return target.pipe(wiredep({
            devDependencies: true
        })).pipe(inject(cssSources))
        .pipe(inject(jsSources.pipe(angularFilesort())))
        .pipe(gulp.dest('./'))
});



gulp.task('openWebBrowser', function() {
  gulp.src('./')
    .pipe(webserver({
      port:'9090',
      livereload: true,
      open: true
    }));
});


gulp.task('concat', function(){
  return gulp.src(['index.html','app/**/*.html'])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});
