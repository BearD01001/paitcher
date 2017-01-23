var moment       = require('moment'),
    colors       = require('colors'),
    gulp         = require('gulp'),
    less         = require('gulp-less'),
    gutil        = require('gulp-util'),
    babel        = require('gulp-babel'),
    watch        = require('gulp-watch'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    plumber      = require('gulp-plumber'),
    cleanCSS     = require('gulp-clean-css'),
    revAppend    = require('gulp-rev-append'),
    sourcemaps   = require('gulp-sourcemaps');

var CONFIG       = require('./conf/gulp');

var html2Sign    = () => {
    gulp.src(CONFIG.html.src)
        .pipe(revAppend())
        .pipe(gulp.dest(CONFIG.html.dist)) &&
        console.log(`[${ moment().format('HH:mm:ss').gray }] ${ '*.html'.blue } rebuilt successful.`);
}

gulp.task('html', () => {
    watch(CONFIG.html.src, (vinyl) => {
            console.log(`[${ moment().format('HH:mm:ss').gray }] ${ vinyl.basename.yellow } rebuilt successful.`);
        })
        .pipe(revAppend())
        .pipe(gulp.dest(CONFIG.html.dist));
});

gulp.task('css', () => {
    watch(CONFIG.css.src, (vinyl) => {
            console.log(`[${ moment().format('HH:mm:ss').gray }] ${ vinyl.basename.red } rebuilt successful.`);
            html2Sign();
        })
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
    watch(CONFIG.js.src, (vinyl) => {
            console.log(`[${ moment().format('HH:mm:ss').gray }] ${ vinyl.basename.yellow } rebuilt successful.`);
            html2Sign();
        })
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
