define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.debounce = debounce;
    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered.
     *
     * The function will be called after it stops being called for
     * N milliseconds. If `immediate` is passed, trigger the function on the
     * leading edge, instead of the trailing.
     *
     * @see   http://davidwalsh.name/javascript-debounce-function
     * @param {Function} func     [function to debounce]
     * @param {Number} wait       [time to wait]
     * @param {Boolean} immediate []
     */
    function debounce(func, wait, immediate) {
        var _this = this,
            _arguments = arguments;

        var timeout = void 0;
        return function () {
            var context = _this,
                args = _arguments;
            var later = function later() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
});
//# sourceMappingURL=debounce.js.map
