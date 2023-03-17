# WP Timber Base Theme

Custom Wordpress base theme using [Timber Starter theme](https://github.com/timber/starter-theme) and [BaseTheme](https://github.com/roadiz/BaseTheme) made for [Roadiz CMS](http://www.roadiz.io).

- **Find and replace** every `TimberBaseTheme` occurences over this folder using your own theme name
- Rename `http://www.url.com` with your site URL.
- Don't forget to also change your base project folder in `bootstrap.js` and replace `wordpress` with your own base project name.

If you want to rename your theme, you will have to replace all `wp-timber-base-theme` occurences in this folder with your new folder name.
You can also change your site description, replacing `SiteDescription` by your own custom description or use WP site desc.

- Launch `npm install` in your theme folder to install _NPM_ vendor and launch _Gulp_ tasks for the first time.

We also created a LESS (`less/pages/page.less`) and a javascript file (`src/pages/page.js`) for this node-type.
If you need others node-type, duplicate theses files and rename them.

## External JS framework

Base theme uses _Gulp_ to deal with front development files.
We chose to use **ES6 javascript** transpiled with _Babel_ and loaded via _RequireJS_.

Then we externalized all the JS logic and routing system into *https://github.com/rezozero/pageblock-framework*
so that your theme only host specific JS code and will be able to easily upgrade common JS features.

We encourage you to read [_StartingBlocks_ README](https://github.com/rezozero/starting-blocks/blob/master/README.md)
to understand how we route and synchronize our _Twig_ generated DOM with our ES6 scripts. You can find a detailled
API documentation at http://startingblocks.rezo-zero.com

### Based on Bootstrap 3

We use _Bootstrap 3_ right in _TimberBaseTheme_ but you can choose what feature to include in your style not to bloat your CSS files.
We recommend to use _LESS_ development version to ignore unnecessary modules.
Open your `less/bootstrap-custom.less` file and comment/uncomment your _Bootstrap_
modules files, you even can override _Bootstrap_ variables.

### Gulp

This blank theme uses _Gulp_ to handle and package your LESS, JS and CSS files.
When you set it up, _Gulp_ will generate versioned CSS and JS files to
be properly served over browser caches.

- Install globally _NodeJS_ - http://nodejs.org/
- Install globally _gulp-cli_ - https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
- Launch `npm install` in your theme folder to install _NPM_ vendor and launch _Gulp_ tasks for the first time.

Then you can launch _Gulp_ in background to listen every file update: this command will
generate development CSS file (with source-map and not-minified) and transpile your ES6 scripts.

```shell
gulp watch
```

And when you need to prepare files for production: this command will generate production CSS
files (no source-map and minified) and will optimize _requireJS_ dependence tree into
a single JS bundle in `build/` folder.

```shell
gulp
```

### Versioning

Versioning is really important in order to avoid browser and public cache problems after
a site update.

Gulp will generate a `build/` folder for optimized JS file and a `css/` for CSS files, all files
will have random generated name suffix. Then _Gulp_ will inject these files directly into your
`templates/common/header.twig` & `templates/common/footer.twig` files at each change.

For _LESS_ files, it’s a bit different. To add a new _LESS_ file, just include it in `less/style.less`
file, which is your main project stylesheet. For _NPM_ stylesheet, just do the same in `less/vendor.less`.
Do not forget to use `@import (inline)` syntax to force _LESS_ compiler to include files contents if
you want to import plain CSS files.

#### In development mode

When you work with `gulp watch` running in background, _Gulp_ will only compile your _LESS_ files in `css/` folder
and transpile your ES6 javascript files into `dist/` folder. It won’t optimize nor uglify your JS.

#### In production mode

When you execute a `gulp` command, _Gulp_ will compile your _LESS_ files
and it will optimize your _RequireJS_ tree with your _NPM_ dependencies and your own _JS_ files into
`/build` folder. As in _development_ mode, _Twig_ will automatically inject your assets to
insert as many `<script>` and `<link>` tags as needed.
