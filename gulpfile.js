var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var imagemin = require('gulp-imagemin');
var htmlbeautify = require('gulp-html-beautify');
var autoprefixer = require('gulp-autoprefixer');
var cssbeautify = require('gulp-cssbeautify');
var cssmin = require('gulp-cssmin');
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
                .pipe(cssbeautify())
                .pipe(gulp.dest('build/assets/css'))
                .pipe(bs.reload({stream: true}));
});

gulp.task('pug_conv', function buildHTML() {
    return gulp.src('*.pug')
        .pipe(pug())
        .pipe(htmlbeautify(useConfig = true))
        .pipe(gulp.dest("build"));
});

gulp.task('img', function() {
    return gulp.src('img/*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("*.sass", ['sass']);
    gulp.watch("*.pug",['pug_conv']);
    gulp.watch("build/*.html").on('change', bs.reload);
});

gulp.task('sass-mini', function () {
    return gulp.src('style.sass')
                .pipe(sass())
                .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(cssmin())
                .pipe(gulp.dest('build/assets/css'))
});

gulp.task('pug-mini', function buildHTML() {
    return gulp.src('*.pug')
        .pipe(pug())
        .pipe(gulp.dest("build"));
});


gulp.task('build', ['sass-mini', 'pug-mini', 'img']);