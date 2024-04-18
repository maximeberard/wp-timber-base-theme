define(["exports", "scrollTo", "utils/utils", "abstract-page", "utils/bootstrapMedia"], function (exports, _scrollTo, _utils, _abstractPage, _bootstrapMedia) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DefaultPage = undefined;

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

    var DefaultPage = exports.DefaultPage = function (_AbstractPage) {
        _inherits(DefaultPage, _AbstractPage);

        function DefaultPage() {
            _classCallCheck(this, DefaultPage);

            return _possibleConstructorReturn(this, _AbstractPage.apply(this, arguments));
        }

        DefaultPage.prototype.init = function init() {
            _AbstractPage.prototype.init.call(this);
            // if (this.context == "ajax") this.initAjax();

            this.$scrollToLink = this.$cont.find(".scroll-to-link");
        };

        DefaultPage.prototype.initEvents = function initEvents() {
            _AbstractPage.prototype.initEvents.call(this);
            this.$scrollToLink.on("click", this.scrollToLinkOnClick.bind(this));
        };

        DefaultPage.prototype.destroyEvents = function destroyEvents() {
            _AbstractPage.prototype.destroyEvents.call(this);
            this.$scrollToLink.off("click", this.scrollToLinkOnClick.bind(this));
        };

        DefaultPage.prototype.scrollToLinkOnClick = function scrollToLinkOnClick(e) {
            var $target = $("#" + e.currentTarget.getAttribute("data-target"));

            if ($target.length) {
                var yPos = $target.offset().top - 20;
                yPos -= _bootstrapMedia.BootstrapMedia.isMinSM() ? this.router.nav.$cont[0].offsetHeight : this.router.nav.$bar[0].offsetHeight;
                // console.log(yPos);
                TweenLite.to(window, 0.6, { scrollTo: { y: Math.round(yPos) } });
            }
            e.preventDefault();
        };

        DefaultPage.prototype.initAjax = function initAjax() {
            _AbstractPage.prototype.initAjax.call(this);

            // Matomo
            if (typeof _paq !== "undefined") {
                // console.log(window.location.pathname);
                // console.log(document.title);
                _paq.push(["setCustomUrl", window.location.pathname]);
                _paq.push(["setDocumentTitle", document.title]);
                _paq.push(["trackPageView"]);
            }

            // Analytics
            if (typeof gtag !== "undefined") {
                // console.log('🚩 Push Analytics for: ' + window.location.pathname);
                gtag("event", "page_view", {
                    page_title: document.title,
                    page_location: window.location.pathname
                });
            }
        };

        return DefaultPage;
    }(_abstractPage.AbstractPage);
});
//# sourceMappingURL=default-page.js.map
