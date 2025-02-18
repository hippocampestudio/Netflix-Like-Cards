<?php
/**
 * Plugin Name:       Netflix Like Cards
 * Description:       Example block scaffolded with Create Block tool.
 * Plugin URI: https://github.com/hippocampestudio/Netflix-Like-Cards
 * Version:           0.1.1
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Hippocampe Studio
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       netflix-like-cards
 *
 * @package CreateBlock
 */

// Empêche l'accès direct au fichier
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enregistre le bloc en utilisant les métadonnées chargées depuis le fichier `block.json`.
 * En arrière-plan, cela enregistre également tous les assets pour qu'ils puissent être chargés
 * via l'éditeur de blocs dans le contexte correspondant.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_netflix_like_cards_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_netflix_like_cards_block_init' );

/**
 * Charge les assets nécessaires pour le bloc Netflix Like Cards.
 */
function netflix_like_cards_enqueue_assets() {
    $asset_file = include(plugin_dir_path(__FILE__) . '/build/index.asset.php');
    
    // Charge les icônes Dashicons
    wp_enqueue_style('dashicons');
    
    // Charge le script principal du bloc
    wp_enqueue_script(
        'netflix-like-cards-script',
        plugins_url('/build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    // Charge le style principal du bloc
    wp_enqueue_style(
        'netflix-like-cards-style',
        plugins_url('/build/style-index.css', __FILE__),
        array(),
        $asset_file['version']
    );

    // Charge le script de la lightbox
    wp_enqueue_script(
        'netflix-like-cards-lightbox',
        plugins_url('/build/lightbox.js', __FILE__),
        array('jquery'),
        $asset_file['version'],
        true
    );

    // Charge le script de vue
    wp_enqueue_script(
        'netflix-like-cards-view',
        plugins_url('/build/view.js', __FILE__),
        array('jquery'),
        $asset_file['version'],
        true
    );
}
add_action('enqueue_block_assets', 'netflix_like_cards_enqueue_assets');

/**
 * Ajoute le HTML nécessaire pour la lightbox dans le footer.
 */
function netflix_cards_add_lightbox_html() {
    echo '
    <link rel="stylesheet" id="wp-block-columns-css" href="/wp-includes/blocks/columns/style.min.css" media="all"/>
    <div id="netflix-lightbox" class="netflix-lightbox">
        <div class="lightbox-content">
            <button class="close-lightbox dashicons dashicons-dismiss"></button>
            <div id="lightbox-content"></div>
        </div>
    </div>
    ';
}
add_action('wp_footer', 'netflix_cards_add_lightbox_html');

/**
 * Ajoute une nouvelle catégorie de bloc pour Hippocampe Studio.
 *
 * @param array $categories Les catégories de blocs existantes.
 * @param WP_Post $post Le post actuel.
 * @return array Les catégories de blocs mises à jour.
 */
function netflix_cards_block_categories($categories, $post) {
    $new_category = array(
        'slug' => 'hippocampe-studio',
        'title' => __('Hippocampe Studio', 'netflix-like-cards'),
    );
    
    $existing_slugs = array_column($categories, 'slug');
    
    // Ajoute la nouvelle catégorie seulement si elle n'existe pas déjà
    if (!in_array($new_category['slug'], $existing_slugs)) {
        $categories[] = $new_category;
    }
    
    return $categories;
}
add_filter('block_categories_all', 'netflix_cards_block_categories', 10, 2);
