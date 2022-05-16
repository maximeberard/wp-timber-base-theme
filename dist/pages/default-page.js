define(['exports', 'jquery', 'utils/utils', 'abstract-page'], function (exports, _jquery, _utils, _abstractPage) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DefaultPage = undefined;

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

    var DefaultPage = exports.DefaultPage = function (_AbstractPage) {
        _inherits(DefaultPage, _AbstractPage);

        function DefaultPage() {
            _classCallCheck(this, DefaultPage);

            return _possibleConstructorReturn(this, _AbstractPage.apply(this, arguments));
        }

        DefaultPage.prototype.init = function init() {
            _AbstractPage.prototype.init.call(this);
            if (this.context == 'ajax') this.initAjax();
        };

        DefaultPage.prototype.initEvents = function initEvents() {
            _AbstractPage.prototype.initEvents.call(this);
        };

        DefaultPage.prototype.destroyEvents = function destroyEvents() {
            _AbstractPage.prototype.destroyEvents.call(this);
        };

        DefaultPage.prototype.initAjax = function initAjax() {
            if (typeof gtag !== "undefined") {
                // console.log('🚩 Push Analytics for: ' + window.location.pathname);
                gtag('event', 'page_view', {
                    page_title: document.title,
                    page_location: window.location.pathname
                });
            }
        };

        return DefaultPage;
    }(_abstractPage.AbstractPage);
});
//# sourceMappingURL=default-page.js.map
