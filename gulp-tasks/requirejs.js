var gulp = require("gulp");
var uglify = require("gulp-uglify");
var requirejsOptimize = require("gulp-requirejs-optimize");
var rev = require("gulp-rev");
var del = require("del");

gulp.task("clean-build", function () {
    del(["./dist/*.js"]);
    return del(["./build/*.js"]);
});

gulp.task("requirejs", ["babel", "clean-build"], function () {
    return gulp
        .src("./bootstrap.js")
        .pipe(
            requirejsOptimize({
                out: "app.min.js",
                baseUrl: "./dist",
                name: "./../bootstrap",
                paths: {
                    /*
                     * Do not include these lib to load them from CDN
                     */
                    jquery: "empty:",
                    gsap: "empty:",
                    // TweenLite: "empty:",
                    // TweenMax: "empty:",
                    /*
                     * Compile dep
                     */
                    Lazyload:
                        "./../node_modules/vanilla-lazyload/dist/lazyload",
                    waitForImages:
                        "./../node_modules/jquery.waitForImages/dist/jquery.waitforimages.min",
                    ScrollTrigger:
                        "./../node_modules/gsap/dist/ScrollTrigger.min",
                    ScrollToPlugin:
                        "./../node_modules/gsap/dist/ScrollToPlugin.min",
                    // scrollTo:
                    // "./../node_modules/gsap/src/minified/plugins/ScrollToPlugin.min",
                    isMobile: "./../node_modules/ismobilejs/dist/isMobile.min",
                    actual: "./../node_modules/jquery.actual/jquery.actual.min",
                    Hammer: "./../node_modules/hammerjs/hammer.min",
                    loglevel: "./../node_modules/loglevel/dist/loglevel.min",
                    waypoint:
                        "./../node_modules/waypoints/lib/noframework.waypoints",
                    masonry:
                        "./../node_modules/masonry-layout/dist/masonry.pkgd",
                    // Utils functions and classes
                    "utils/utils":
                        "./../vendor/starting-blocks/dist/utils/utils",
                    "utils/gaTrackErrors":
                        "./../vendor/starting-blocks/dist/utils/gaTrackErrors",
                    "utils/polyfills":
                        "./../vendor/starting-blocks/dist/utils/polyfills",
                    "utils/debounce":
                        "./../vendor/starting-blocks/dist/utils/debounce",
                    "utils/scroll":
                        "./../vendor/starting-blocks/dist/utils/scroll",
                    "utils/bootstrapMedia":
                        "./../vendor/starting-blocks/dist/utils/bootstrapMedia",
                    // Include current page-block sources from their location in node_modules
                    // if you are using bower to fetch this lib.
                    state: "./../vendor/starting-blocks/dist/state",
                    router: "./../vendor/starting-blocks/dist/router",
                    graphicLoader:
                        "./../vendor/starting-blocks/dist/graphicLoader",
                    "abstract-nav":
                        "./../vendor/starting-blocks/dist/abstract-nav",
                    "abstract-page":
                        "./../vendor/starting-blocks/dist/abstract-page",
                    "abstract-block":
                        "./../vendor/starting-blocks/dist/abstract-block",
                    "cache-provider":
                        "./../vendor/starting-blocks/dist/cache-provider",
                    // If you want to use example Page and Home classes in your project
                    // "pages/page": "./../vendor/starting-blocks/dist/pages/page",
                    // "pages/home": "./../vendor/starting-blocks/dist/pages/home"
                },
            })
        )
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("build"));
});
