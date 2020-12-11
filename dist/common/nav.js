define(["exports", "jquery", "utils/utils", "utils/bootstrapMedia", "utils/debounce", "abstract-nav"], function (exports, _jquery, _utils, _bootstrapMedia, _debounce, _abstractNav) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Nav = undefined;

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

    var Nav = exports.Nav = function (_AbstractNav) {
        _inherits(Nav, _AbstractNav);

        function Nav() {
            _classCallCheck(this, Nav);

            var _this = _possibleConstructorReturn(this, _AbstractNav.call(this));

            _this.$cont = (0, _jquery2.default)('#nav');
            _this.$list = (0, _jquery2.default)('#nav-list');
            _this.$item = _this.$list.find('.nav-item');
            _this.$link = _this.$list.find('.nav-link');
            _this.$links = _this.$cont.find('a').not('[target="_blank"]');

            _this.$btn = (0, _jquery2.default)('#nav-btn');
            _this.hasOverlay = false;
            if (_this.hasOverlay) _this.$overlay = (0, _jquery2.default)('#nav-overlay');

            _this.$bar = (0, _jquery2.default)('#navbar');
            _this.$btnBar = _this.$bar.find('.nav-btn-bar');
            // this.$barBg = $('#navbar-bg');

            _this.minifyLimit = _bootstrapMedia.BootstrapMedia.isMinMD() ? 165 : 50;

            _this.opened = false;
            return _this;
        }

        Nav.prototype.initEvents = function initEvents(router) {
            _AbstractNav.prototype.initEvents.call(this, router);

            if (router.options.ajaxEnabled) {
                this.$links.on('click', router.onLinkClick.bind(router));
            }

            this.$btn.on('click', this.btnClick.bind(this));
            if (this.hasOverlay) this.$overlay.on('click', this.close.bind(this));

            window.addEventListener('scroll', this.onScroll.bind(this));
            window.addEventListener('resize', (0, _debounce.debounce)(this.onResize.bind(this), 100, false));
        };

        Nav.prototype.destroyEvents = function destroyEvents(router) {

            _AbstractNav.prototype.destroyEvents.call(this, router);

            if (router.options.ajaxEnabled) {
                this.$links.off('click', router.onLinkClick.bind(router));
            }

            this.$btn.off('click', this.btnClick.bind(this));
            if (this.hasOverlay) this.$overlay.off('click', this.close.bind(this));

            window.removeEventListener('scroll', this.onScroll.bind(this));
            window.removeEventListener('resize', (0, _debounce.debounce)(this.onResize.bind(this), 100, false));
        };

        /**
         * Scroll
         */


        Nav.prototype.onScroll = function onScroll(e) {

            if (window.scrollY > this.minifyLimit) {
                if (!this.minified) this.minify();
            } else {
                if (this.minified) this.unminify();
            }
        };

        Nav.prototype.minify = function minify() {

            _utils.Utils.addClass(document.body, 'nav-minified');
            this.minified = true;
        };

        Nav.prototype.unminify = function unminify() {

            _utils.Utils.removeClass(document.body, 'nav-minified');
            this.minified = false;
        };

        /**
         * Btn click
         */


        Nav.prototype.btnClick = function btnClick(e) {
            if (!_bootstrapMedia.BootstrapMedia.isMinSM()) {
                if (!this.opened) this.open();else this.close();
            }
        };

        Nav.prototype.open = function open() {
            if (!_bootstrapMedia.BootstrapMedia.isMinSM() && !this.opened) {

                this.$cont[0].style.display = 'block';
                TweenLite.fromTo(this.$cont, 0.4, { xPercent: -100 }, { xPercent: 0 });

                if (this.hasOverlay) {
                    this.$overlay[0].style.display = 'block';
                    TweenLite.to(this.$overlay, 1.2, { opacity: 1 });
                }

                // Btn
                TweenLite.to(this.$btnBar[0], 0.3, { y: 9 });
                TweenLite.to(this.$btnBar[2], 0.3, { y: -9 });
                TweenLite.to(this.$btnBar[1], 0.3, { opacity: 0 });

                TweenLite.to(this.$btnBar[0], 0.4, { rotation: 45, delay: 0.2 });
                TweenLite.to(this.$btnBar[2], 0.4, { rotation: -45, delay: 0.2 });

                this.opened = true;
            }
        };

        Nav.prototype.close = function close() {
            var _this2 = this;

            if (!_bootstrapMedia.BootstrapMedia.isMinSM() && this.opened) {

                TweenLite.to(this.$cont, 0.4, { xPercent: -100, onComplete: function onComplete() {
                        if (!_this2.opened) _this2.$cont[0].style.display = 'none';
                        // document.body.removeAttribute('style');
                    } });

                if (this.hasOverlay) {
                    TweenLite.to(this.$overlay, 1.2, { opacity: 0, onComplete: function onComplete() {
                            _this2.$overlay[0].style.display = 'none';
                        } });
                }

                // Btn
                TweenLite.to(this.$btnBar[0], 0.4, { rotation: 0 });
                TweenLite.to(this.$btnBar[2], 0.4, { rotation: 0 });

                TweenLite.to(this.$btnBar[0], 0.3, { y: 0, delay: 0.2 });
                TweenLite.to(this.$btnBar[2], 0.3, { y: 0, delay: 0.2 });
                TweenLite.to(this.$btnBar[1], 0.3, { opacity: 1, delay: 0.2 });

                this.opened = false;
            }
        };

        Nav.prototype.onResize = function onResize() {};

        return Nav;
    }(_abstractNav.AbstractNav);
});
//# sourceMappingURL=nav.js.map
