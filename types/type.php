<?php
    function register_[MyType]() {
      $labels = array(
        'name' => '[MyType]',
        'singular_name' => '[MyType]',
        'add_new' => 'Ajouter un [MyType]',
        'add_new_item' => 'Ajouter un nouveau [MyType]',
        'edit_item' => 'Editer un [MyType]',
        'new_item' => 'Nouveau [MyType]',
        'all_items' => 'Tous les [MyType]',
        'view_item' => 'Voir le [MyType]',
        'search_items' => 'Rechercher un [MyType]',
        'not_found' =>  'Aucun [MyType]',
        'not_found_in_trash' => 'Aucun [MyType] dans la corbeille',
        'menu_name' => '[MyType]'
      );

      $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true, 
        'show_in_menu' => true, 
        'query_var' => true,
        'rewrite' => true,
        'capability_type' => 'post',
        'has_archive' => true, 
        'hierarchical' => false,
        'menu_position' => 4,
        'menu_icon' => 'dashicons-groups',
        'supports' => array('title','editor','thumbnail')
      ); 
      register_post_type('[MyType]', $args);
    }

    add_action( 'init', 'register_[MyType]' );

?>