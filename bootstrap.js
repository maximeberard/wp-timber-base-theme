requirejs.config({
    baseUrl: "/wordpress/wp-content/themes/wp-timber-base-theme/dist",
    paths: {
        /*
         * CDN dependencies
         * TweenLite should not be loaded if TweenMax is used
         * except for optional libs like Draggable.
         */
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min",
        // TweenMax: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenMax.min",
        // TweenLite: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenLite.min",
        gsap: "//cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min",
        // Internal dep
        Lazyload:
            "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/vanilla-lazyload/dist/lazyload",
        waitForImages:
            "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/jquery.waitforimages/dist/jquery.waitforimages.min",
        ScrollTrigger:
            "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/gsap/dist/ScrollTrigger.min",
        ScrollToPlugin:
            "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/gsap/dist/ScrollToPlugin.min",
        // scrollTo:
        //     "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/gsap/src/minified/plugins/ScrollToPlugin.min",
        isMobile:
            "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/ismobilejs/dist/isMobile.min",
        actual: "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/jquery.actual/jquery.actual.min",
        Hammer: "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/hammerjs/hammer.min",
        loglevel:
            "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/loglevel/dist/loglevel.min",
        waypoint:
            "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/waypoints/lib/noframework.waypoints",
        isotope:
            "/wordpress/wp-content/themes/wordpress/node_modules/isotope-layout/dist/isotope.pkgd",
        masonry:
            "/wordpress/wp-content/themes/wp-timber-base-theme/node_modules/masonry-layout/dist/masonry.pkgd",
        // Utils functions and classes
        "utils/utils":
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/utils/utils",
        "utils/polyfills":
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/utils/polyfills",
        "utils/debounce":
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/utils/debounce",
        "utils/scroll":
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/utils/scroll",
        "utils/gaTrackErrors":
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/utils/gaTrackErrors",
        "utils/bootstrapMedia":
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/utils/bootstrapMedia",
        // Include current page-block sources from their location in node_modules
        //if you are using bower to fetch this lib.
        state: "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/state",
        router: "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/router",
        graphicLoader:
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/graphicLoader",
        "abstract-nav":
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/abstract-nav",
        "abstract-page":
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/abstract-page",
        "abstract-block":
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/abstract-block",
        "cache-provider":
            "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/cache-provider",
        // If you want to use example Page and Home classes in your project
        // "pages/page": "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/pages/page",
        // "pages/home": "/wordpress/wp-content/themes/wp-timber-base-theme/vendor/starting-blocks/dist/pages/home"
    },
});

require(["main"]);
