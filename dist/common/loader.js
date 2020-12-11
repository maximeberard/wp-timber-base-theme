define(["exports", "jquery", "TweenMax", "scrollTo", "utils/utils", "utils/scroll", "utils/bootstrapMedia"], function (exports, _jquery, _TweenMax, _scrollTo, _utils, _scroll, _bootstrapMedia) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Loader = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _scrollTo2 = _interopRequireDefault(_scrollTo);

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

    var Loader = exports.Loader = function () {
        function Loader() {
            _classCallCheck(this, Loader);

            // console.log('🌀 LOADER INIT');

            this.$cont = (0, _jquery2.default)('#loading');
            // this.$bg = $('#loading-bg');
            this.$inner = (0, _jquery2.default)('#loading-inner');

            // Scroll.disable(); // enable();
            // console.log('SCROLL DISABLE');
            // $(window).scrollTop(0);
            // TweenLite.to(window, 0.6, {scrollTo:{y:0, autokill:false}});

            this.context = 'static';

            this.$body = (0, _jquery2.default)('body');

            this.isHome = this.$body[0].className.indexOf('home') >= 0;

            this.active = true;

            this.showStatic();
        }

        Loader.prototype.showStatic = function showStatic() {
            // console.log('🌀 LOADER SHOW STATIC');
            // Utils.addClass(this.$cont[0],'active');
            TweenLite.to(window, 0.6, { scrollTo: { y: 0, autokill: false } });

            // if (this.isHome) this.initHome();
            // else
            // TweenLite.fromTo(this.$cont, 0.6, {opacity:0}, {opacity:1});

            _utils.Utils.addClass(this.$body[0], 'loading-active');
            _utils.Utils.addClass(this.$body[0], 'static');
        };

        // initHome () {
        //     this.spanHomeText();

        //     let $homeLink = this.$home.find('a');
        //     $homeLink.addClass('no-ajax-link');

        //     TweenLite.to(this.$homeText, 1, {opacity:1, onComplete: ()=> {
        //         $homeLink.addClass('active');
        //     }});
        // }

        Loader.prototype.show = function show() {
            var _this = this;

            setTimeout(function () {
                // console.log('🌀 LOADER SHOW');

                _this.active = true;

                // Scroll.disable();
                TweenLite.to(window, 0.6, { scrollTo: { y: 0 }, delay: 0.4, autokill: false });

                setTimeout(function () {
                    _utils.Utils.addClass(_this.$body[0], 'loading-active');
                }, 1000);

                // if (document.body.className.indexOf('nav-opened') >= 0)
                // let viewportSize = Utils.getViewportSize();
                // this.$cont[0].style.display = 'block';
                // TweenLite.fromTo(this.$cont, 0.6, {y:viewportSize.height}, {y:0});
            }, 50);
        };

        Loader.prototype.hide = function hide() {
            var _this2 = this;

            // console.log('🌀 LOADER HIDE');

            var hideDelay = 600;
            // if (this.context == 'static' && this.isHome) hideDelay = 1600;

            (0, _jquery2.default)(window).scrollTop(0);
            TweenLite.to(window, 0.6, { scrollTo: { y: 0, autokill: false } });
            _utils.Utils.removeClass(this.$body[0], 'loading-active');

            // console.log('🌀 LOADER HIDE ANIM');
            var viewportSize = _utils.Utils.getViewportSize();

            // if(window.location.hash == '') TweenLite.to(window, 0.6, {scrollTo:{y:0}});

            // TweenLite.to(this.$cont, 0.6, {y:-viewportSize.height, onComplete: () => {
            //     this.onHidden();
            // }});

            if (this.context == 'static') {
                TweenLite.to(this.$cont, 1, { opacity: 0, onComplete: function onComplete() {
                        _this2.onHidden();
                    } });
            } else this.onHidden();
        };

        Loader.prototype.onHidden = function onHidden() {
            // console.log('🌀 LOADER ON HIDDEN');
            this.active = false;

            this.$cont[0].style.display = 'none';
            // console.log('SCROLL ENABLE');
            // $(window).scrollTop(0);
            // Scroll.enable();


            if (this.context == 'static') {
                this.context = 'ajax';
                _utils.Utils.removeClass(this.$body[0], 'static');
                _utils.Utils.addClass(this.$body[0], 'ajax');
                _utils.Utils.addClass(this.$cont[0], 'loading-ajax');
                // if (this.isHome) this.isHome = false;
            }
        };

        return Loader;
    }();
});
//# sourceMappingURL=loader.js.map
