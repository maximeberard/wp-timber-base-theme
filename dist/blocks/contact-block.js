define(["exports", "jquery", "TweenMax", "loglevel", "abstract-block"], function (exports, _jquery, _TweenMax, _loglevel, _abstractBlock) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ContactBlock = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _TweenMax2 = _interopRequireDefault(_TweenMax);

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

    var ContactBlock = exports.ContactBlock = function (_AbstractBlock) {
        _inherits(ContactBlock, _AbstractBlock);

        function ContactBlock() {
            _classCallCheck(this, ContactBlock);

            return _possibleConstructorReturn(this, _AbstractBlock.apply(this, arguments));
        }

        // extends DefaultBlock

        ContactBlock.prototype.init = function init() {
            _AbstractBlock.prototype.init.call(this);

            this.$form = this.$cont.find('form');
            this.$formBtn = this.$form.find('button');
            this.$formMessage = this.$cont.find('.form-message');
        };

        ContactBlock.prototype.initEvents = function initEvents() {
            _AbstractBlock.prototype.initEvents.call(this);

            if (this.$form.length) this.$form.on('submit', _jquery2.default.proxy(this.formSubmit, this));
        };

        ContactBlock.prototype.destroyEvents = function destroyEvents() {
            _AbstractBlock.prototype.destroyEvents.call(this);

            if (this.$form.length) this.$form.off('submit', _jquery2.default.proxy(this.formSubmit, this));
        };

        ContactBlock.prototype.formSubmit = function formSubmit(e) {
            var _this2 = this;

            TweenLite.to(this.$formMessage, 0.4, { height: 0 });

            _jquery2.default.ajax({
                url: e.currentTarget.action,
                data: this.$form.serialize(),
                type: 'post',
                dataType: 'json',
                success: function success(data) {
                    _loglevel2.default.debug('SUCCESS');
                    _loglevel2.default.debug(data.status);
                    if (data.status != 'success') {
                        _this2.$formMessage[0].className = 'form-message form-message-' + data.status;
                        _this2.$formMessage[0].innerHTML = '<span>' + data.message + '</span>';
                    } else {
                        _this2.$formMessage[0].className = 'form-message form-message-hidden form-message-' + data.status;
                        _this2.$formMessage[0].innerHTML = '<span>' + data.message + '</span>';
                    }

                    var height = _this2.$formMessage.find('span').actual('outerHeight');
                    TweenLite.to(_this2.$formMessage, 0.6, { height: height, delay: 0.2 });
                },
                error: function error(data) {
                    _loglevel2.default.debug('ERROR');
                    data = data.responseJSON;
                    _loglevel2.default.debug(data);
                    _this2.$formMessage[0].className = 'form-message form-message-hidden form-message-error form-message-' + data.status;
                    _this2.$formMessage[0].innerHTML = '<span>' + data.errors + '</span>';

                    var height = _this2.$formMessage.find('span').actual('outerHeight');
                    TweenLite.to(_this2.$formMessage, 0.6, { height: height, delay: 0.2 });
                }
            });

            e.preventDefault();
        };

        return ContactBlock;
    }(_abstractBlock.AbstractBlock);
});
//# sourceMappingURL=contact-block.js.map
