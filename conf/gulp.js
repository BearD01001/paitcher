/**
 * Gulp Build Configure
 */
var gutil       = require('gulp-util'),
    autoprefix  = require('less-plugin-autoprefix');

module.exports = {
    /* path */
    html: {
        src: 'src/demo/*.html',
        dist: 'doc/demo/'
    },
    css: {
        src: 'src/*.less',
        dist: 'dist/'
    },
    js: {
        src: 'src/*.js',
        dist: 'dist'
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
