<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context         = Timber::context();
$timber_post     = Timber::get_post();
$context['post'] = $timber_post;

// Prev - next
$projectsArgs = array(
    'post_type' => 'project',
    'posts_per_page' => -1,
    'orderby' => 'menu_order',
    'order' => 'DESC'
);
$pageID = $timber_post->ID;
$projects = get_posts($projectsArgs);
$projectCount = count($projects);
$ids = array();
foreach ($projects as $project) {$ids[] = $project->ID;}
$current = array_search($pageID, $ids);
$prevIndex = $current-1;
if($prevIndex < 0) $prevIndex = $projectCount-1;
$nextIndex = $current+1;
if($nextIndex > ($projectCount-1)) $nextIndex = 0;
$prevID = $ids[$prevIndex];
$nextID = $ids[$nextIndex];

$context['previousPost'] = get_post($prevID); //get_previous_post();
$context['nextPost']  = get_post($nextID); //get_next_post();

if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( 'pages/single-password.twig', $context );
} else {
	Timber::render( array( 'pages/single-' . $timber_post->ID . '.twig', 'pages/single-' . $timber_post->post_type . '.twig', 'pages/single-' . $timber_post->slug . '.twig', 'pages/single.twig' ), $context );
}
