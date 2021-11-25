import $ from "jquery";
import TweenMax from "TweenMax";
import isMobile from "isMobile";
import log from "loglevel";
import { Utils } from "utils/utils";
import { polyfills } from "utils/polyfills";
import { gaTrackErrors } from "utils/gaTrackErrors";
import { Nav } from "common/nav";
import { Router } from "router";
import { GraphicLoader } from "graphicLoader";
// import { Loader } from "common/loader";
import { ClassFactory } from "class-factory";
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
polyfills();

/**
 * Tracks erros with Analytics
 */
gaTrackErrors();

/*
 * Define vars
 */
const $body = $('body');
const dataHome = $body[0].getAttribute('data-is-home');
const isHome = (dataHome == '1');

/*
 * isMobile Test
 */
let deviceMobile = (isMobile.any !== false);
if (deviceMobile) Utils.addClass($body[0], 'is-mobile');
else Utils.addClass($body[0], 'is-desktop');

/*
 * IE Test
 */
if (navigator.userAgent.indexOf('MSIE') >= 0 ||
    navigator.userAgent.indexOf('Trident') >= 0) {
    Utils.addClass($body[0], 'ie-browser');
}

/**
 * Launch router
 */
const router = new Router(
    {
        homeHasClass: false,
        lazyloadEnabled: true,
        pageClass: 'page-container',
        ajaxEnabled: false,
        // ajaxLinkTypeAttr: 'data-node-type-target',
        // minLoadDuration: 1500,
        // preLoadPageDelay: 0,
        // prePushState: function (state) {
        // this.page.prePushState(state);
        // }
    },
    new ClassFactory(),
    // temp namespace is defined in your footer.twig file
    temp.baseUrl,
    new GraphicLoader(), // Loader()
    new Nav()
);
router.initEvents();
router.boot($('.page-container').eq(0), 'static', isHome);

