define(['exports', 'jquery', 'abstract-block'], function (exports, _jquery, _abstractBlock) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DefaultBlock = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var DefaultBlock = exports.DefaultBlock = function (_AbstractBlock) {
    _inherits(DefaultBlock, _AbstractBlock);

    function DefaultBlock() {
      _classCallCheck(this, DefaultBlock);

      return _possibleConstructorReturn(this, _AbstractBlock.apply(this, arguments));
    }

    DefaultBlock.prototype.init = function init() {
      _AbstractBlock.prototype.init.call(this);
    };

    // initEvents(){
    //     super.initEvents();
    // }

    // destroyEvents(){
    //     super.destroyEvents();
    // }


    return DefaultBlock;
  }(_abstractBlock.AbstractBlock);
});
//# sourceMappingURL=default-block.js.map
