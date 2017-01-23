/**
 * Gulp Build Configure
 */
var gutil       = require('gulp-util'),
    autoprefix  = require('less-plugin-autoprefix');

module.exports = {
    /* path */
    html: {
        src: 'src/demo/*.html',
        srcCopy: 'docs/demo/*.html',
        dist: 'docs/demo/'
    },
    css: {
        src: 'src/*.less',
        dist: 'dist/',
        distDemo: 'docs/'
    },
    js: {
        src: 'src/*.js',
        dist: 'dist/',
        distDemo: 'docs/'
    },

    sourcemaps: {
        init: {
            debug: true
        },
        write: {
            debug: true
        },
        path: '../_srcmap'
    },

    /* less */
    less: {
        plugins: [
            new autoprefix({ browsers: ['last 2 versions'] })
        ]
    },

    cleanCSS: {
        compatibility: 'ie7'
    },

    rename: {
        suffix: '.min'
    },

    /* plumber: error catcher */
    plumberCatch: function(e) {
        gutil.beep();
        gutil.log(e);
    }
}
