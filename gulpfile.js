var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('browserify', function(){
	return browserify('./src/js/app.js')
	.transform(babelify, {'presets': ['react']})
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('moveFiles', function(){
	gulp.src('./src/index.html')
	.pipe(gulp.dest('./dist/'));
	gulp.src('./node_modules/normalize.css/normalize.css')
	.pipe(gulp.dest('./dist/css/'));
});

gulp.task('sass', function(){
	gulp.src('./src/sass/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./dist/css/'));
});

gulp.task('minify-css', function() {
  return gulp.src('dist/css/styles.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: './dist'
		},
		open: true
	});
});

gulp.task('dev', ['moveFiles', 'sass', 'browserify', 'serve'], function(){
	gulp.watch('./src/**/*.*', ['moveFiles', 'sass', 'browserify']).on('change', browserSync.reload );
});

gulp.task('prod', ['moveFiles', 'sass', 'minify-css'], function(){});
