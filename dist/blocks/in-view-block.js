define(["exports", "jquery", "utils/utils", "waypoint", "blocks/default-block", "utils/bootstrapMedia"], function (exports, _jquery, _utils, _waypoint, _defaultBlock, _bootstrapMedia) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.InviewBlock = undefined;

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

    var InviewBlock = exports.InviewBlock = function (_DefaultBlock) {
        _inherits(InviewBlock, _DefaultBlock);

        function InviewBlock() {
            _classCallCheck(this, InviewBlock);

            return _possibleConstructorReturn(this, _DefaultBlock.apply(this, arguments));
        }

        InviewBlock.prototype.init = function init() {
            var _this2 = this;

            _DefaultBlock.prototype.init.call(this);

            // console.log('👀 In view block');

            var delayInView = 500; // (this.page.context == 'static') ? 500 : 1500;
            setTimeout(function () {
                _this2.initInView();
                // this.page.router.$window.trigger('resize');
            }, delayInView);

            this.inViewDuration = 800;

            this.inViewOffset = "75%";

            if (this.$cont[0].getAttribute("data-inview-offset")) {
                this.inViewOffset = this.$cont[0].getAttribute("data-inview-offset");
            }

            this.index = Number(this.$cont[0].getAttribute("data-index"));
        };

        InviewBlock.prototype.initEvents = function initEvents() {
            _DefaultBlock.prototype.initEvents.call(this);
        };

        InviewBlock.prototype.destroyEvents = function destroyEvents() {
            _DefaultBlock.prototype.destroyEvents.call(this);
        };

        InviewBlock.prototype.initInView = function initInView() {
            // super.initInView();

            // if (BootstrapMedia.isMinSM()) {
            // this.page.router.deviceType == 'desktop' &&

            this.waypoint = [];
            this.isInView = false;

            // console.log('👀 INVIEW - '+this.id+' - Init');
            // console.log('offset : '+this.inViewOffset);
            // console.log('---');

            this.waypoint = new Waypoint({
                element: this.$cont[0],
                handler: this.onInView.bind(this),
                offset: this.inViewOffset
            });
            // }
        };

        InviewBlock.prototype.onInView = function onInView(index) {
            // console.log('👀 INVIEW - '+this.id+' - on view');

            if (!this.isInView) {
                this.isInView = true;
                _utils.Utils.addClass(this.$cont[0], "in-view");
                // console.log('👀 INVIEW - '+this.id+' - OK');
                this.inViewAnimation();
            }
            // else console.log('< already Inview');
        };

        InviewBlock.prototype.inViewAnimation = function inViewAnimation() {
            var _this3 = this;

            // console.log('👀 INVIEW - '+this.id+' - Animation');

            setTimeout(function () {
                _utils.Utils.addClass(_this3.$cont[0], "in-view-finished");
            }, this.inViewDuration);
        };

        return InviewBlock;
    }(_defaultBlock.DefaultBlock);
});
//# sourceMappingURL=in-view-block.js.map
