var moment       = require('moment'),
    colors       = require('colors'),
    gulp         = require('gulp'),
    run          = require('gulp-run'),
    less         = require('gulp-less'),
    gutil        = require('gulp-util'),
    babel        = require('gulp-babel'),
    watch        = require('gulp-watch'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    plumber      = require('gulp-plumber'),
    cleanCSS     = require('gulp-clean-css'),
    revAppend    = require('gulp-rev-append'),
    sourcemaps   = require('gulp-sourcemaps');

var CONFIG       = require('./conf/gulp');

var html2Sign    = () => {
    run('gulp htmlCopy && gulp htmlResigned', { verbosity: 0 }).exec()
        .pipe(notify({
            title: '*.html',
            message: 'resigned success.'
        }));
}

gulp.task('htmlCopy', () => {
    gulp.src(CONFIG.html.src)
        .pipe(gulp.dest(CONFIG.html.dist));
});

gulp.task('htmlResigned', () => {
    gulp.src(CONFIG.html.srcCopy)
        .pipe(revAppend())
        .pipe(gulp.dest(CONFIG.html.dist))
        .pipe(notify({
            title: '<%= file.basename %>',
            message: 'resigned success.'
        }));
});

gulp.task('html', () => {
    watch(CONFIG.html.src, (vinyl) => {
            gulp.src(CONFIG.html.srcCopy)
                .pipe(revAppend())
                .pipe(gulp.dest(CONFIG.html.dist))
                .pipe(notify({
                    title: '<%= file.basename %>',
                    message: 'resigned success.'
                }));
        })
        .pipe(gulp.dest(CONFIG.html.dist));
});

gulp.task('css', () => {
    watch(CONFIG.css.src, (vinyl) => {
            html2Sign();
        })
        .pipe(plumber({ errHandler: e => CONFIG.plumberCatch(e) }))
        .pipe(sourcemaps.init(CONFIG.sourcemaps.init))
            .pipe(less(CONFIG.less))
            .pipe(gulp.dest(CONFIG.css.dist))
            .pipe(cleanCSS(CONFIG.cleanCSS))
            .pipe(rename(CONFIG.rename))
        .pipe(sourcemaps.write(CONFIG.sourcemaps.path, CONFIG.sourcemaps.write))
        .pipe(gulp.dest(CONFIG.css.distDemo))
        .pipe(gulp.dest(CONFIG.css.dist))
        .pipe(notify({
            title: '<%= file.basename %>',
            message: 'rebuilt success.'
        }));
});

gulp.task('js', () => {
    watch(CONFIG.js.src, (vinyl) => {
            html2Sign();
        })
        .pipe(plumber({ errHandler: e => CONFIG.plumberCatch(e) }))
        .pipe(sourcemaps.init(CONFIG.sourcemaps.init))
            .pipe(babel())
            .pipe(gulp.dest(CONFIG.js.dist))
            .pipe(uglify(CONFIG.uglify))
            .pipe(rename(CONFIG.rename))
        .pipe(sourcemaps.write(CONFIG.sourcemaps.path, CONFIG.sourcemaps.write))
        .pipe(gulp.dest(CONFIG.js.distDemo))
        .pipe(gulp.dest(CONFIG.js.dist))
        .pipe(notify({
            title: '<%= file.basename %>',
            message: 'rebuilt success.'
        }));
});

gulp.task('default', ['html', 'css', 'js']);
