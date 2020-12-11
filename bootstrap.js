requirejs.config({
    baseUrl: '/wordpress/wp-content/themes/wp-timber-base-theme/dist',
    paths: {
        /*
         * CDN dependencies
         * TweenLite should not be loaded if TweenMax is used
         * except for optional libs like Draggable.
         */
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        TweenMax: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenMax.min",
        TweenLite: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenLite.min",
        // Internal dep
        Lazyload: '/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/vanilla-lazyload/dist/lazyload',
        waitForImages: '/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/waitForImages/dist/jquery.waitforimages.min',
        scrollTo: "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/gsap/src/minified/plugins/ScrollToPlugin.min",
        isMobile: "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/isMobile/isMobile.min",
        actual: "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/jquery.actual/jquery.actual.min",
        Hammer: "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/hammerjs/hammer.min",
        loglevel: "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/loglevel/dist/loglevel.min",
        waypoint: "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/waypoints/lib/noframework.waypoints",
        masonry: "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/masonry-layout/dist/masonry.pkgd",
        // Utils functions and classes
        "utils/utils": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/utils/utils",
        "utils/polyfills": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/utils/polyfills",
        "utils/debounce": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/utils/debounce",
        "utils/scroll": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/utils/scroll",
        "utils/gaTrackErrors": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/utils/gaTrackErrors",
        "utils/bootstrapMedia": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/utils/bootstrapMedia",
        // Include current page-block sources from their location in bower_components
        // if you are using bower to fetch this lib.
        "state": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/state",
        "router": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/router",
        "graphicLoader": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/graphicLoader",
        "abstract-nav": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/abstract-nav",
        "abstract-page": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/abstract-page",
        "abstract-block": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/abstract-block",
        "cache-provider": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/cache-provider",
        // If you want to use example Page and Home classes in your project
        // "pages/page": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/pages/page",
        // "pages/home": "/wordpress/wp-content/themes/wp-timber-base-theme/bower_components/starting-blocks/dist/pages/home"
    }
});

require(['main']);
