define(["exports", "jquery", "loglevel", "TweenMax", "masonry", "blocks/default-block", "utils/bootstrapMedia"], function (exports, _jquery, _loglevel, _TweenMax, _masonry, _defaultBlock, _bootstrapMedia) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MasonryBlock = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _loglevel2 = _interopRequireDefault(_loglevel);

    var _TweenMax2 = _interopRequireDefault(_TweenMax);

    var _masonry2 = _interopRequireDefault(_masonry);

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

    var MasonryBlock = exports.MasonryBlock = function (_DefaultBlock) {
        _inherits(MasonryBlock, _DefaultBlock);

        function MasonryBlock() {
            _classCallCheck(this, MasonryBlock);

            return _possibleConstructorReturn(this, _DefaultBlock.apply(this, arguments));
        }

        MasonryBlock.prototype.init = function init() {
            _DefaultBlock.prototype.init.call(this);

            this.masonry = null;
            if (_bootstrapMedia.BootstrapMedia.isMinSM()) this.initMasonry();
        };

        MasonryBlock.prototype.destroy = function destroy() {
            _DefaultBlock.prototype.destroy.call(this);

            if (this.masonry !== null) this.masonry.destroy();
        };

        MasonryBlock.prototype.initEvents = function initEvents() {
            _DefaultBlock.prototype.initEvents.call(this);
        };

        MasonryBlock.prototype.destroyEvents = function destroyEvents() {
            _DefaultBlock.prototype.destroyEvents.call(this);
        };

        MasonryBlock.prototype.initMasonry = function initMasonry() {
            this.masonry = new _masonry2.default('.list', {
                itemSelector: '.item',
                columnWidth: '.item'
            });
        };

        MasonryBlock.prototype.onResize = function onResize() {
            _DefaultBlock.prototype.onResize.call(this);

            if (this.masonry !== null) {
                this.masonry.layout();
            }
        };

        return MasonryBlock;
    }(_defaultBlock.DefaultBlock);
});
//# sourceMappingURL=masonry-block.js.map
