<?php
/**
 * Plugin Name:       Vs Reading List
 * Description:       An interactive block with the Interactivity API
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       vs-reading-list
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function vs_reading_list_vs_reading_list_block_init() {

	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/bookmark/view.asset.php';

	wp_register_script_module( '@vs-reading-list/bookmark', plugin_dir_url( __FILE__ ) . 'build/bookmark/view.js', $asset_file['dependencies'], array(), $asset_file['version'] );

	register_block_type_from_metadata( __DIR__ . '/build/bookmark' );
	register_block_type_from_metadata( __DIR__ . '/build/reading-list' );
}
add_action( 'init', 'vs_reading_list_vs_reading_list_block_init' );
