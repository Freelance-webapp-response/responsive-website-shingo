var gulp = require('gulp'),
	inject = require('gulp-inject'),
	connect = require('gulp-connect'),
	wiredep = require('wiredep').stream;

gulp.task('html', function() {
	gulp.src('./*.html')
	.pipe(connect.reload());
});

gulp.task('inject', function() {
	//var source = gulp.src(['./css/**/*.css '])
	////read: false - porque los archivos no vaan a ser mdificados m dado que es solo de lectura
	var injectSrc = gulp.src(['./css/*.css ', './js/*.js'], {read: false});
	var injectOptions = { ignorePath : '/public' }
	var options = {
		bowerJson: require('./bower.json'),
		directory: './librerias', 
		ignorePath: '../../public',
		onError: function(err) {
			console.log(err.code);
		}
	}
	return gulp.src('./*.html') //donde se inyectaran los archivos
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./'));
});

gulp.task('server', function() {
	connect.server({
		root: './',
		port: 3000,
		ivereload: true		
	});
});

gulp.task('watch', function() {
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['js/*.js'], ['inject']);
	gulp.watch(['css/*.css'], ['inject']);
	gulp.watch(['./librerias/'], ['inject']);
});

gulp.task('default', ['inject', 'watch', 'server']);
