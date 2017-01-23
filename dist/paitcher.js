'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var paitcher = function paitcher() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, paitcher);

    var defaultOptions = {
        loader: 'progress',
        animation: 'switch',
        before: function before() {},
        after: function after() {}
    };

    options = Object.assign(defaultOptions, options);
};