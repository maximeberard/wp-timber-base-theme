<?php
/*
 * Template Name: Home
 */

$context = Timber::context();

$timber_post     = new Timber\Post();
$context['post'] = $timber_post;

// Sample posts query
// $argsPosts = array(
//     'post_type' => 'post',
//     'numberposts' => 10
// );
// $context['posts'] = Timber::get_posts( $argsPosts );

Timber::render( array( 'pages/page-home.twig'), $context );
