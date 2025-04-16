<?php
/*
 * Template Name: Home
 */

$context = Timber::context();

$timber_post     = Timber::get_post();
$context['post'] = $timber_post;

// $context['categories'] = Timber::get_terms('category', array('hide_empty' => true));
// $context['tags'] = Timber::get_terms('post_tag', array('hide_empty' => true));

// Sample posts query
$argsPosts = array(
    'post_type' => 'post',
    'numberposts' => 10
);
$context['posts'] = Timber::get_posts( $argsPosts );

Timber::render( array( 'pages/page-home.twig'), $context );
