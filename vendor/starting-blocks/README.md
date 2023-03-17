# Starting blocks
## A page transition and blocks ES6 framework by REZO ZERO

- Maxime Bérard
- Ambroise Maupate

## Spec

- ES6 (convert with Babel)
- jQuery 2.2.0
- waitForImages
- debounce
- RequireJS
- loglevel

## Usage

- Install `gulp-cli` if you do not have it yet `npm install -g gulp-cli`.
- Install dependencies: `npm install` and `bower install`.
- Type `gulp watch` to convert ES6 scripts to `dist/` folder in background.
- Type `gulp` to optimize project in one file in `build/` folder.

RequireJS bootstrap file :

```js
requirejs.config({
    baseUrl: './dist',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        TweenMax: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min",
        TweenLite: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min",
        //Draggable: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/utils/Draggable.min",
        //CSSPlugin: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min",
        waitForImages: './../bower_components/waitForImages/dist/jquery.waitforimages.min',
        loglevel: "./../bower_components/loglevel/dist/loglevel.min"
    }
});

require(['main']);
```

## Use as vendor lib (bower)

Before using *Starting Blocks* in your project as a dependency. You’ll need to declare
paths for each JS file you’ll need and to **create your own** `bootstrap.js` and `main.js`
files. Some of this lib files will be located in `bower_components` folder and so they
won’t be available anymore from your project path. Solution is to add them to your
*RequireJS* paths configuration:

You’ll need to adapt this path array in your `bootstrap.js` file **and** in your
`requirejs` *Gulp* task to build a minified version. Replace `/path/to/your/website`
with your own website path or your *Roadiz* theme *static* path.

```js
var paths = {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
    TweenMax: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min",
    TweenLite: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min",
    //Draggable: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/utils/Draggable.min",
    //CSSPlugin: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min",
    waitForImages: '/path/to/your/website/bower_components/waitForImages/dist/jquery.waitforimages.min',
    // Include current page-block sources from their location in bower_components
    // if you are using bower to fetch this lib.
    "state": "/path/to/your/website/bower_components/starting-blocks/dist/state",
    "cache-provider": "/path/to/your/website/bower_components/starting-blocks/dist/cache-provider",
    "router": "/path/to/your/website/bower_components/starting-blocks/dist/router",
    "graphicLoader": "/path/to/your/website/bower_components/starting-blocks/dist/graphicLoader",
    "nav": "/path/to/your/website/bower_components/starting-blocks/dist/nav",
    "abstract-page": "/path/to/your/website/bower_components/starting-blocks/dist/abstract-page",
    "abstract-block": "/path/to/your/website/bower_components/starting-blocks/dist/abstract-block",
    // Utils functions and classes
    "utils/utils": "/path/to/your/website/bower_components/starting-blocks/dist/utils/utils",
    "utils/gaTrackErrors": "/path/to/your/website/bower_components/starting-blocks/dist/utils/gaTrackErrors",
    "utils/debounce": "/path/to/your/website/bower_components/starting-blocks/dist/utils/debounce",
    "utils/bootstrapMedia": "/path/to/your/website/bower_components/starting-blocks/dist/utils/bootstrapMedia",
    "utils/polyfills": "/path/to/your/website/bower_components/starting-blocks/dist/utils/polyfills",
    "utils/scroll": "/path/to/your/website/bower_components/starting-blocks/dist/utils/scroll",
    // If you want to use example Page and Home classes in your project
    "pages/page": "/path/to/your/website/bower_components/starting-blocks/dist/pages/page"
    "pages/home": "/path/to/your/website/bower_components/starting-blocks/dist/pages/home"
    // Then your own project vendor libs
    // …
};
```
Then configure your `baseUrl` to build full path to get your script:

```js
// On a static website where dist folder is at server root
baseUrl: '/dist'

// If your dist folder is in a Roadiz theme
// (and your Roadiz site is at server root)
baseUrl: '/path/to/your/website/dist'
```

## A JS router made to work with HTML partial responses

This ES6 javascript router has been designed to handle as well complete HTML responses as
*partial* HTML responses to lighten backend process and bandwidth.
One of the most recurrent variable or member: `$cont` is always referring to the current page’ main-section.
This is the DOM section which is extracted at the end of each complete AJAX requests. When it detects that AJAX
response is *partial* it directly initialize `$cont` with the whole response data. Every new AJAX response will
be appended in the `#ajax-container` HTML section in order to smooth transitions between pages.

To declare a partial DOM section as the `$cont` you must add some classes and
data to your HTML tags.

```html
<div id="page-content-home"
     class="page-content page-content-ajax"
     data-node-type="page"
     data-node-name="home"
     data-is-home="1"
     data-meta-title="Home page">
</div>
```
- `id` *attribute* is obviously mandatory as it will be used to update your navigation and some other parts of your website.
- `page-content` *class* is essential in order to extract your DOM section during AJAX request. You can customize this class name in your `Router` options (`pageClass: "page-content"`).
- `data-node-type` *attribute* will be used to *route* your section to the corresponding JS class (in this example: page.js). **Every route class must extends the `AbstractPage` class**. Then you have to declare your routes in the `Router` construction (`'page' : Page`).
- `data-node-name`
- `data-is-home`
- `data-meta-title` *attribute* will be used to change your new page *title* (`document.title`), it can be used in other cases such as some social network modules which require a clean page-title.

You’ll find `index.html` and `page1.html` examples files. You can even test them
by spawning a simple server with `php -S localhost:8888` command (You must have at least *PHP 5.5*).
Then go to your favorite browser and type `http://localhost:8888`.

### Router dependencies

A Router needs:

- an options object in order to override default configuration
- a `ClassFactory` object to link all `data-node-type` value to their *ES6* classes (you must import each class you’ll declare in your routes). You‘ll have to redefine a `ClassFactory` for each project you begin with *Starting Blocks*.
- a `baseUrl` string which is your website protocol + domain + path, i.e. *http://mysuperwebsite.com* or *http://localhost:8888* in our examples. It is useful to bind AJAX only on internal links and not external links.
- a `GraphicLoader` or extending class instance in order to trigger `show` or `hide` during AJAX requests.
- a `Nav` or extending class instance to update your website navigation after AJAX requests.

You can look at the `src/main.js` file to see an instanciation example with few parameters.

### Caching responses

By default, the router will use a JS object cache to store and fetch AJAX responses once they’ve been
successful. You can disable this feature with `useCache` router option.

## Docs

To generate documentation, you’ll at least NodeJS v4.4 and to install ESDoc.

```bash
sudo npm install -g esdoc;
esdoc -c esdoc.json;
```

Documentation will be available in `doc/` folder.
