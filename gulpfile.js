var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-ruby-sass');
var reload = browserSync.reload;

gulp.task('sass', function() {
    return sass('app/styles/sass/style.scss')
        .pipe(gulp.dest('app/styles/css'))
        .pipe(reload({ stream:true }));
});


// watch files for changes and reload
gulp.task('serve', ['sass'], function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js', 'sass'], {cwd: 'app'}, reload);
});