var gulp         = require('gulp'),
    less         = require('gulp-less'),
    babel        = require('gulp-babel'),
    watch        = require('gulp-watch'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    plumber      = require('gulp-plumber'),
    cleanCSS     = require('gulp-clean-css'),
    sourcemaps   = require('gulp-sourcemaps'),
    revAppend    = require('gulp-rev-append');

var CONFIG       = require('./conf/gulp');

var html2Sign    = () => {
    return gulp.src(CONFIG.html.src)
            .pipe(revAppend())
            .pipe(gulp.dest(CONFIG.html.dist));
}

gulp.task('html', () => {
    return watch(CONFIG.html.src)
            .pipe(revAppend())
            .pipe(gulp.dest(CONFIG.html.dist));
});

gulp.task('css', () => {
    return watch(CONFIG.css.src, () => { html2Sign(); })
        .pipe(plumber({ errHandler: e => CONFIG.plumberCatch(e) }))
        .pipe(sourcemaps.init(CONFIG.sourcemaps.init))
        .pipe(less(CONFIG.less))
        .pipe(gulp.dest(CONFIG.css.dist))
        .pipe(cleanCSS(CONFIG.cleanCSS))
        .pipe(rename(CONFIG.rename))
        .pipe(sourcemaps.write(CONFIG.sourcemaps.path, CONFIG.sourcemaps.write))
        .pipe(gulp.dest(CONFIG.css.dist));
});

gulp.task('js', () => {
    return watch(CONFIG.js.src, () => { html2Sign(); })
        .pipe(plumber({ errHandler: e => CONFIG.plumberCatch(e) }))
        .pipe(sourcemaps.init(CONFIG.sourcemaps.init))
        .pipe(babel())
        .pipe(gulp.dest(CONFIG.js.dist))
        .pipe(uglify(CONFIG.uglify))
        .pipe(rename(CONFIG.rename))
        .pipe(sourcemaps.write(CONFIG.sourcemaps.path, CONFIG.sourcemaps.write))
        .pipe(gulp.dest(CONFIG.js.dist));
});

gulp.task('default', ['html', 'css', 'js']);
