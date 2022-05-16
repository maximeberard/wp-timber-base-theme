define(["exports", "jquery", "Hammer", "masonry", "utils/utils", "pages/default-page", "utils/bootstrapMedia"], function (exports, _jquery, _Hammer, _masonry, _utils, _defaultPage, _bootstrapMedia) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SlideshowPage = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _Hammer2 = _interopRequireDefault(_Hammer);

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

    var SlideshowPage = exports.SlideshowPage = function (_DefaultPage) {
        _inherits(SlideshowPage, _DefaultPage);

        function SlideshowPage() {
            _classCallCheck(this, SlideshowPage);

            return _possibleConstructorReturn(this, _DefaultPage.apply(this, arguments));
        }

        SlideshowPage.prototype.init = function init() {
            _DefaultPage.prototype.init.call(this);

            this.$image = this.$cont.find('.galerie-image');

            // Slideshow
            this.$slideshow = this.$cont.find('.galerie-slideshow');
            this.$slideshowImage = this.$slideshow.find('.galerie-slideshow-image');
            this.$slideshowImg = this.$slideshowImage.find('.galerie-slideshow-img');
            this.slideshowImageLength = this.$slideshowImage.length;
            this.slideshowImg = [];
            this.slideshowImagesLoaded = 0;
            this.slideshowFirstOpening = true;

            // this.$slideshowCurrentText = this.$slideshow.find('.galerie-slideshow-current');
            this.$slideshowNavItem = this.$slideshow.find('.galerie-slideshow-nav-item');
            this.$slideshowClose = this.$slideshow.find('.galerie-slideshow-close');

            this.slideshowOpened = false;
            this.slideshowIndexActive = null;

            this.viewportSize = _utils.Utils.getViewportSize();

            this.hammer = new _Hammer2.default(this.$slideshow[0], { preventDefault: false });
        };

        SlideshowPage.prototype.initEvents = function initEvents() {
            _DefaultPage.prototype.initEvents.call(this);

            this.$image.on('click', this.imageOnClick.bind(this));

            window.addEventListener('keyup', this.windowOnKeyUp.bind(this));
            if (this.slideshowImageLength > 1) {
                // this.router.deviceType == 'mobile'
                this.hammer.on('swipe', this.slideshowOnSwipe.bind(this));
            }
            this.$slideshowNavItem.on('click', this.slideshowNavItemOnClick.bind(this));
            this.$slideshowClose.on('click', this.slideshowCloseOnClick.bind(this));
        };

        SlideshowPage.prototype.destroyEvents = function destroyEvents() {
            _DefaultPage.prototype.destroyEvents.call(this);

            this.$image.off('click', this.imageOnClick.bind(this));

            window.removeEventListener('keyup', this.windowOnKeyUp.bind(this));
            if (this.slideshowImageLength > 1) {
                // this.router.deviceType == 'mobile'
                this.hammer.off('swipe', this.slideshowOnSwipe.bind(this));
            }
            this.$slideshowNavItem.off('click', this.slideshowNavItemOnClick.bind(this));
            this.$slideshowClose.off('click', this.slideshowCloseOnClick.bind(this));
        };

        SlideshowPage.prototype.imageOnClick = function imageOnClick(e) {
            if (_bootstrapMedia.BootstrapMedia.isMinSM()) {
                var index = Number(e.currentTarget.getAttribute('data-index'));
                // console.log('img on click : ' + index);
                this.openSlideshow(index);
            }
            e.preventDefault();
        };

        SlideshowPage.prototype.slideshowNavItemOnClick = function slideshowNavItemOnClick(e) {
            if (!this.slideshowOpened) return;

            if (e.currentTarget.className.indexOf('prev') >= 0) {
                this.switchImage(null, 'left');
            } else {
                this.switchImage(null, 'right');
            }
            e.preventDefault();
        };

        SlideshowPage.prototype.slideshowCloseOnClick = function slideshowCloseOnClick(e) {
            if (!this.slideshowOpened) return;

            this.closeSlideshow();
            e.preventDefault();
        };

        SlideshowPage.prototype.windowOnKeyUp = function windowOnKeyUp(e) {
            if (!this.slideshowOpened) return;

            switch (e.keyCode) {
                case 27:
                    // esc
                    this.closeSlideshow();
                    break;
                case 37:
                    // <-
                    this.switchImage(null, 'left');
                    break;
                case 39:
                    // ->
                    this.switchImage(null, 'right');
                    break;
            }
        };

        SlideshowPage.prototype.openSlideshow = function openSlideshow(index) {
            if (!_bootstrapMedia.BootstrapMedia.isMinSM() || this.slideshowOpened) return;

            if (this.slideshowFirstOpening) {
                this.loadImages();
                this.slideshowFirstOpening = false;
            }

            this.$slideshow[0].style.display = 'block';

            TweenLite.fromTo(this.$slideshow, 0.4, { opacity: 0 }, { opacity: 1 });
            // y: this.viewportSize.height y:0
            if (index !== this.slideshowIndexActive) {
                _utils.Utils.addClass(this.$slideshowImage[index], 'active');
                if (this.slideshowIndexActive !== null) {
                    _utils.Utils.removeClass(this.$slideshowImage[this.slideshowIndexActive], 'active');
                }
                // this.$slideshowCurrentText[0].innerHTML = (index + 1);
            }

            this.slideshowOpened = true;
            this.slideshowIndexActive = index;
        };

        SlideshowPage.prototype.closeSlideshow = function closeSlideshow() {
            var _this2 = this;

            if (!this.slideshowOpened) return;

            TweenLite.to(this.$slideshow, 0.4, { opacity: 1 }); // y: this.viewportSize.height

            setTimeout(function () {
                _this2.$slideshow[0].style.display = 'none';
                _this2.$slideshowImage[_this2.slideshowIndexActive].removeAttribute('style');
            }, 400);

            this.slideshowSide = null;

            this.slideshowOpened = false;
        };

        SlideshowPage.prototype.loadImages = function loadImages() {
            // console.log('LOAD IMAGES');
            for (var indexImage = 0; indexImage < this.slideshowImageLength; indexImage++) {
                this.slideshowImg[indexImage] = new Image();
                this.slideshowImg[indexImage].onload = this.imageOnLoad.bind(this, indexImage);
                this.slideshowImg[indexImage].src = this.$slideshowImg[indexImage].getAttribute('data-src');
                this.slideshowImg[indexImage].loaded = false;
            }
        };

        SlideshowPage.prototype.imageOnLoad = function imageOnLoad(index) {
            if (this.slideshowImg[index].loaded) return;
            // if (this.slideshowImagesLoaded > this.slideshowImageLength) return;

            this.slideshowImg[index].loaded = true;
            this.slideshowImagesLoaded++;
            _utils.Utils.addClass(this.$slideshowImage[index], 'loaded');
            this.$slideshowImg[index].src = this.slideshowImg[index].src;

            // console.log('image on load : ' + index);
            // console.log(this.$slideshowImg[index]);
            // console.log('images loaded : ' + this.slideshowImagesLoaded + ' / ' + this.slideshowImageLength);
            // console.log('---');
        };

        SlideshowPage.prototype.slideshowOnSwipe = function slideshowOnSwipe(e) {
            var dir = e.direction; // 2:left - 4:right - 8:up - 16:down
            if (dir == 2) this.switchImage(null, 'right');else if (dir == 4) this.switchImage(null, 'left');

            e.preventDefault();
        };

        SlideshowPage.prototype.switchImage = function switchImage(index, dir) {
            var _this3 = this;

            if (index === this.slideshowIndexActive || !this.slideshowOpened || this.switchActive) return;

            var futureIndex = void 0,
                oldIndex = this.slideshowIndexActive;

            this.switchActive = true;

            if (index !== null) futureIndex = index;else {
                if (dir == 'left') futureIndex = oldIndex > 0 ? oldIndex - 1 : this.slideshowImageLength - 1;else if (dir == 'right') futureIndex = oldIndex < this.slideshowImageLength - 1 ? oldIndex + 1 : 0;
            }

            var oldXTo = this.viewportSize.width;
            if (dir == 'right') oldXTo *= -1;
            var futureXFrom = -oldXTo;

            // console.log('> Switch item : ' + dir);
            // console.log('current index : ' + oldIndex);
            // console.log('future index  : ' + futureIndex);
            // console.log('-------------');

            TweenLite.set(this.$slideshowImage[futureIndex], { x: 0 });
            _utils.Utils.addClass(this.$slideshowImage[futureIndex], 'future');
            _utils.Utils.addClass(this.$slideshowImage[futureIndex], 'active');

            TweenLite.to(this.$slideshowImage[oldIndex], 0.8, { x: oldXTo });
            TweenLite.fromTo(this.$slideshowImage[futureIndex], 0.8, { x: futureXFrom }, { x: 0 });

            // this.$slideshowCurrentText[0].innerHTML = (futureIndex + 1);

            setTimeout(function () {
                _utils.Utils.removeClass(_this3.$slideshowImage[oldIndex], 'active');
                _utils.Utils.removeClass(_this3.$slideshowImage[futureIndex], 'future');
                _this3.$slideshowImage[oldIndex].removeAttribute('style');
                _this3.slideshowIndexActive = futureIndex;
                _this3.switchActive = false;
            }, 850);
        };

        SlideshowPage.prototype.onResize = function onResize(e) {
            _DefaultPage.prototype.onResize.call(this, e);

            this.viewportSize = _utils.Utils.getViewportSize();
        };

        return SlideshowPage;
    }(_defaultPage.DefaultPage);
});
//# sourceMappingURL=slideshow.js.map
