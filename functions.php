<?php
/**
 * Timber wp-timber-base-theme
 * https://github.com/timber/wp-timber-base-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */


/* Post types */

// require_once(ABSPATH.'wp-content/themes/wp-timber-base-theme/types/type.php');


/* Images sizes */

add_theme_support('post-thumbnails');
add_image_size('1200x630', 1200, 630, true);
// square
add_image_size('640x640', 640, 640, true);
add_image_size('360x360', 360, 360, true);
// just width
add_image_size('1920w', 1920, 0, false);
add_image_size('1480w', 1480, 0, false);
add_image_size('1140w', 1140, 0, false);
add_image_size('980w', 980, 0, false);
add_image_size('640w', 640, 0, false);
add_image_size('460w', 460, 0, false);
add_image_size('360w', 360, 0, false);


/* Footer widget */

function register_custom_widget_area() {
	register_sidebar(array(
		'id' => 'footer-widget',
		'name' => 'Footer widget',
		'description' => 'Footer content',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<div class="widget-title-holder"><h3 class="widget-title">',
		'after_title' => '</h3></div>'
	));
}
add_action( 'widgets_init', 'register_custom_widget_area' );

/**
 * Add featured image column to WP admin panel - posts AND pages
 * See: https://bloggerpilot.com/featured-image-admin/
 */

// Set thumbnail size
// add_image_size( 'j0e_admin-featured-image', 60, 60, false );

// // Add the posts and pages columns filter. Same function for both.
// add_filter('manage_posts_columns', 'j0e_add_thumbnail_column', 2);
// add_filter('manage_pages_columns', 'j0e_add_thumbnail_column', 2);
// function j0e_add_thumbnail_column($j0e_columns){
//     $j0e_columns['j0e_thumb'] = __('Image');
//     return $j0e_columns;
// }

// // Add featured image thumbnail to the WP Admin table.
// add_action('manage_posts_custom_column', 'j0e_show_thumbnail_column', 5, 2);
// add_action('manage_pages_custom_column', 'j0e_show_thumbnail_column', 5, 2);
// function j0e_show_thumbnail_column($j0e_columns, $j0e_id){
//     switch($j0e_columns){
//         case 'j0e_thumb':
//         if( function_exists('the_post_thumbnail') )
//             echo the_post_thumbnail( 'j0e_admin-featured-image' );
//         break;
//     }
// }

// // Move the new column at the first place.
// add_filter('manage_posts_columns', 'j0e_column_order');
//     function j0e_column_order($columns) {
//         $n_columns = array();
//         $move = 'j0e_thumb'; // which column to move
//         $before = 'title'; // move before this column

//         foreach($columns as $key => $value) {
//         if ($key==$before){
//             $n_columns[$move] = $move;
//         }
//         $n_columns[$key] = $value;
//     }
//     return $n_columns;
// }

// // Format the column width with CSS
// add_action('admin_head', 'j0e_add_admin_styles');
// function j0e_add_admin_styles() {
//     echo '<style>.column-j0e_thumb {width: 60px;}</style>';
// }


/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

add_filter('timber/loader/loader', function($loader){
	$loader->addPath(__DIR__ . "/templates", "templates");
	return $loader;
});

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types() {

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		// $context['foo']   = 'bar';
		// $context['stuff'] = 'I am a value set in your functions.php file';
		// $context['notes'] = 'These values are available everytime you call Timber::context();';
		$context['menu']  = new Timber\Menu();
		$context['site']  = $this;
        $lang = get_bloginfo("language");
        $context['lang'] = $lang;
        // $context['home'] = Timber::get_post(2);
        // $context['footer'] = Timber::get_widgets('footer-widget');
		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
	}

	/** This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

}

new StarterSite();
