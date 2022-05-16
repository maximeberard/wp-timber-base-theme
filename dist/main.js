define(["jquery", "TweenMax", "isMobile", "loglevel", "utils/utils", "utils/polyfills", "utils/gaTrackErrors", "common/nav", "router", "graphicLoader", "class-factory"], function (_jquery, _TweenMax, _isMobile, _loglevel, _utils, _polyfills, _gaTrackErrors, _nav, _router, _graphicLoader, _classFactory) {
  "use strict";

  var _jquery2 = _interopRequireDefault(_jquery);

  var _TweenMax2 = _interopRequireDefault(_TweenMax);

  var _isMobile2 = _interopRequireDefault(_isMobile);

  var _loglevel2 = _interopRequireDefault(_loglevel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // import { BootstrapMedia } from "utils/bootstrapMedia";
  // import { waypoint } from 'waypoint';
  // import scrollTo from "scrollTo";
  // import Masonry from "masonry";
  // import Hammer from "Hammer";
  // import actual from 'actual';

  /**
   * Set max log level (most verbose) 0 ---> 5
   * @see https://github.com/pimterry/loglevel
   */
  // if (temp.devMode && true === temp.devMode) {
  //     log.setLevel(0);
  // } else {
  //     log.setLevel(5);
  // }

  /**
   * Set default Tween ease
   */
  TweenLite.defaultEase = Quart.easeOut;

  /**
   * Log credits
   */
  // Utils.logCredits(
  //     'TimberBaseTheme',
  //     '#fff', // bg-color
  //     [
  //         { name: 'Made by : Maxime Bérard', website: 'www.maximeberard.com' }
  //     ],
  //     [
  //         { name: 'Starting Blocks', website: 'https://startingblocks.rezo-zero.com' },
  //         { name: 'Timber', website: 'https://upstatement.com/timber' }

  //     ],
  //     '#000' // text-color
  // );

  /*
   * Declare polyfills
   */

  // import { Loader } from "common/loader";
  (0, _polyfills.polyfills)();

  /**
   * Tracks erros with Analytics
   */
  (0, _gaTrackErrors.gaTrackErrors)();

  /*
   * Define vars
   */
  var $body = (0, _jquery2.default)('body');
  var dataHome = $body[0].getAttribute('data-is-home');
  var isHome = dataHome == '1';

  /*
   * isMobile Test
   */
  var deviceMobile = _isMobile2.default.any !== false;
  if (deviceMobile) _utils.Utils.addClass($body[0], 'is-mobile');else _utils.Utils.addClass($body[0], 'is-desktop');

  /*
   * IE Test
   */
  if (navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Trident') >= 0) {
    _utils.Utils.addClass($body[0], 'ie-browser');
  }

  /**
   * Launch router
   */
  var router = new _router.Router({
    homeHasClass: false,
    lazyloadEnabled: true,
    pageClass: 'page-container',
    ajaxEnabled: false
    // ajaxLinkTypeAttr: 'data-node-type-target',
    // minLoadDuration: 1500,
    // preLoadPageDelay: 0,
    // prePushState: function (state) {
    // this.page.prePushState(state);
    // }
  }, new _classFactory.ClassFactory(),
  // temp namespace is defined in your footer.twig file
  temp.baseUrl, new _graphicLoader.GraphicLoader(), // Loader()
  new _nav.Nav());
  router.initEvents();
  router.boot((0, _jquery2.default)('.page-container').eq(0), 'static', isHome);
});
//# sourceMappingURL=main.js.map
