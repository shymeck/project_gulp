var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var imagemin = require('gulp-imagemin');
var bs = require('browser-sync').create();

gulp.task('browser-sync', ['sass', 'pug_conv'], function() {
    bs.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('style.sass')
                .pipe(sass())
                .pipe(gulp.dest('build/assets/css'))
                .pipe(bs.reload({stream: true}));
});

gulp.task('pug_conv', function buildHTML() {
    return gulp.src('*.pug')
        .pipe(pug())
        .pipe(gulp.dest("build"));
});

gulp.task('img', function() {
    return gulp.src('img/*.jpg')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("*.sass", ['sass']);
    gulp.watch("*.pug",['pug_conv']);
    gulp.watch("build/*.html").on('change', bs.reload);
});