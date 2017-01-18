var gulp         = require('gulp'),
    less         = require('gulp-less'),
    babel        = require('gulp-babel'),
    plumber      = require('gulp-plumber'),
    sourcemaps   = require('gulp-sourcemaps'),
    revAppend    = require('gulp-rev-append');

var CONFIG       = require('./conf/gulp');

gulp.task('html', function() {
    return gulp.src(CONFIG.html.src)
            .pipe(plumber({ errHandler: e => CONFIG.plumberCatch(e) }))
            .pipe(revAppend())
            .pipe(gulp.dest(CONFIG.html.dist));
});

gulp.task('css', ['html'], function() {
    return gulp.src(CONFIG.css.src)
            .pipe(plumber({ errHandler: e => CONFIG.plumberCatch(e) }))
            .pipe(sourcemaps.init(CONFIG.sourcemaps.init))
            .pipe(less(CONFIG.less))
            .pipe(sourcemaps.write(CONFIG.sourcemaps.path, CONFIG.sourcemaps.write))
            .pipe(gulp.dest(CONFIG.css.dist));
});

gulp.task('js', ['html'], function() {
    return gulp.src(CONFIG.js.src)
            .pipe(plumber({ errHandler: e => CONFIG.plumberCatch(e) }))
            .pipe(sourcemaps.init(CONFIG.sourcemaps.init))
            .pipe(babel())
            .pipe(sourcemaps.write(CONFIG.sourcemaps.path, CONFIG.sourcemaps.write))
            .pipe(gulp.dest(CONFIG.js.dist));
});

gulp.task('default', function() {
    gulp.watch(CONFIG.html.src, ['html']);
    gulp.watch(CONFIG.css.src, ['css']);
    gulp.watch(CONFIG.js.src, ['js']);
});
