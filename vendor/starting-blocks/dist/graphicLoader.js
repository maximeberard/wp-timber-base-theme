define(['exports', 'loglevel'], function (exports, _loglevel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GraphicLoader = undefined;

  var _loglevel2 = _interopRequireDefault(_loglevel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var GraphicLoader = exports.GraphicLoader = function () {

    /**
     * Interface for a graphic loader element.
     *
     * Any child implementations must implements
     * show and hide methods.
     *
     * @abstract
     */
    function GraphicLoader() {
      _classCallCheck(this, GraphicLoader);
    }

    /**
     * Show loader.
     *
     * @abstract
     */


    GraphicLoader.prototype.show = function show() {
      _loglevel2.default.debug('🌀 Show loader');
    };

    /**
     * Hide loader.
     *
     * @abstract
     */


    GraphicLoader.prototype.hide = function hide() {
      _loglevel2.default.debug('🌀 Hide loader');
    };

    return GraphicLoader;
  }();
});
//# sourceMappingURL=graphicLoader.js.map
