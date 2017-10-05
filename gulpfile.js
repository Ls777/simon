var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('dev', ['browser-sync'], function () {
	gulp.watch(["*.html", "*.css", "*.js"]).on('change', browserSync.reload);
});