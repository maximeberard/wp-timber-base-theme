define(["exports", "pages/default-page"], function (exports, _defaultPage) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Page = undefined;

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

    var Page = exports.Page = function (_DefaultPage) {
        _inherits(Page, _DefaultPage);

        function Page() {
            _classCallCheck(this, Page);

            return _possibleConstructorReturn(this, _DefaultPage.apply(this, arguments));
        }

        Page.prototype.init = function init() {
            _DefaultPage.prototype.init.call(this);
        };

        Page.prototype.initEvents = function initEvents() {
            _DefaultPage.prototype.initEvents.call(this);
        };

        Page.prototype.destroyEvents = function destroyEvents() {
            _DefaultPage.prototype.destroyEvents.call(this);
        };

        return Page;
    }(_defaultPage.DefaultPage);
});
//# sourceMappingURL=page.js.map
