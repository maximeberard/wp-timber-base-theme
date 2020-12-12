<?php
/*
 * Template Name: Home
 */

$context = Timber::context();

$timber_post     = new Timber\Post();
$context['post'] = $timber_post;

Timber::render( array( 'pages/page-home.twig'), $context );
