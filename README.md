# WP Timber Base Theme

Custom Wordpress base theme using [Timber Starter theme](https://github.com/timber/starter-theme) and [BaseTheme](https://github.com/roadiz/BaseTheme) made for [Roadiz CMS](http://www.roadiz.io).

* **Find and replace** every `TimberBaseTheme` occurences over this folder using your own theme name, verify in:
    * Absolute paths in `bootstrap.js`
* Rename `http://www.url.com` with your site URL.

If you want to rename your theme, you will have to replace all `wp-timber-base-theme` occurences in this folder with your new folder name.
You can also change your site description, replacing `SiteDescription` by your own custom description or use WP site desc.

Don't forget to also change your base project folder in `bootstrap.js` and replace `wordpress` with your own base project name. 

* Launch `bower install` and `npm install` in your theme folder to install *NPM* and *Bower* vendor and launch *Gulp* tasks for the first time.

We also created a LESS (`less/pages/page.less`) and a javascript file (`src/pages/page.js`) for this node-type.
If you need others node-type, duplicate theses files and rename them.

## External JS framework

Base theme uses *Gulp* and *Bower* to deal with front development files.
We chose to use **ES6 javascript** transpiled with *Babel* and loaded via *RequireJS*.

Then we externalized all the JS logic and routing system into *https://github.com/rezozero/pageblock-framework*
so that your theme only host specific JS code and will be able to easily upgrade common JS features.

We encourage you to read [*StartingBlocks* README](https://github.com/rezozero/starting-blocks/blob/master/README.md) 
to understand how we route and synchronize our *Twig* generated DOM with our ES6 scripts. You can find a detailled
API documentation at http://startingblocks.rezo-zero.com

### Based on Bootstrap 3

We use *Bootstrap 3* right in *TimberBaseTheme* but you can choose what feature to include in your style not to bloat your CSS files. 
We recommend to use *LESS* development version to ignore unnecessary modules.
Open your `less/bootstrap-custom.less` file and comment/uncomment your *Bootstrap*
modules files, you even can override *Bootstrap* variables.

### Gulp

This blank theme uses *Gulp* to handle and package your LESS, JS and CSS files. 
When you set it up, *Gulp* will generate versioned CSS and JS files to 
be properly served over browser caches.

* Install globally *NodeJS* - http://nodejs.org/
* Install globally *Bower* - http://bower.io/
* Install globally *gulp-cli* - https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
* Launch `bower install` and `npm install` in your theme folder to install *NPM* and *Bower* vendor and launch *Gulp* tasks for the first time.

Then you can launch *Gulp* in background to listen every file update: this command will
generate development CSS file (with source-map and not-minified) and transpile your ES6 scripts.

```shell
gulp watch
```

And when you need to prepare files for production: this command will generate production CSS
files (no source-map and minified) and will optimize *requireJS* dependence tree into
a single JS bundle in `build/` folder.

```shell
gulp
```

### Versioning

Versioning is really important in order to avoid browser and public cache problems after
a site update.

Gulp will generate a `build/` folder for optimized JS file and a `css/` for CSS files, all files
will have random generated name suffix. Then *Gulp* will inject these files directly into your
`templates/common/header.twig` & `templates/common/footer.twig` files at each change.

For *LESS* files, it’s a bit different. To add a new *LESS* file, just include it in `less/style.less`
file, which is your main project stylesheet. For *Bower* stylesheet, just do the same in `less/vendor.less`.
Do not forget to use `@import (inline)` syntax to force *LESS* compiler to include files contents if 
you want to import plain CSS files.

#### In development mode

When you work with `gulp watch` running in background, *Gulp* will only compile your *LESS* files in `css/` folder 
and transpile your ES6 javascript files into `dist/` folder. It won’t optimize nor uglify your JS. 

#### In production mode

When you execute a `gulp` command, *Gulp* will compile your *LESS* files
and it will optimize your *RequireJS* tree with your *Bower* dependencies and your own *JS* files into
`/build` folder. As in *development* mode, *Twig* will automatically inject your assets to
insert as many `<script>` and `<link>` tags as needed.