define(["exports", "pages/default-page"], function (exports, _defaultPage) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

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

    var Home = exports.Home = function (_DefaultPage) {
        _inherits(Home, _DefaultPage);

        function Home() {
            _classCallCheck(this, Home);

            return _possibleConstructorReturn(this, _DefaultPage.apply(this, arguments));
        }

        // extends AbstractPage

        Home.prototype.init = function init() {
            _DefaultPage.prototype.init.call(this);
        };

        Home.prototype.initEvents = function initEvents() {
            _DefaultPage.prototype.initEvents.call(this);
        };

        Home.prototype.destroyEvents = function destroyEvents() {
            _DefaultPage.prototype.destroyEvents.call(this);
        };

        return Home;
    }(_defaultPage.DefaultPage);
});
//# sourceMappingURL=home.js.map
