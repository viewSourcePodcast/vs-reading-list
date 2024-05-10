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

namespace VsReadingList;

use WP_REST_Response;

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
	register_block_type_from_metadata( __DIR__ . '/build/bookmark-count' );
	register_block_type_from_metadata( __DIR__ . '/build/reading-list' );
}
add_action( 'init', __NAMESPACE__ . '\vs_reading_list_vs_reading_list_block_init' );



/**
 * Register custom post meta.
 *
 * @return void
 */
function register_custom_post_meta() {

	register_post_meta(
		'post',
		'vs_reading_list_bookmark_count',
		array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'integer',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_custom_post_meta' );
add_action( 'rest_api_init', __NAMESPACE__ . '\register_custom_post_meta' );


/**
 * Register custom REST endpoint.
 *
 * @return void
 */
function register_custom_rest_endpoint() {
	register_rest_route(
		'vs-reading-list/v1',
		'/bookmark/(?P<id>\d+)',
		array(
			'methods'             => 'GET',
			'callback'            => __NAMESPACE__ . '\get_bookmark_count',
			'args'                => array(
				'id' => array(
					'validate_callback' => function ( $param ) {
						return is_numeric( $param );
					},
				),
			),
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		'vs-reading-list/v1',
		'/bookmark/(?P<id>\d+)',
		array(
			'methods'             => 'POST',
			'callback'            => __NAMESPACE__ . '\bookmark_post',
			'args'                => array(
				'id' => array(
					'validate_callback' => function ( $param ) {
						return is_numeric( $param );
					},
				),
			),
			'permission_callback' => function ( $request ) {
				return wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' );
			},
		)
	);
}
add_action( 'rest_api_init', __NAMESPACE__ . '\register_custom_rest_endpoint' );


/**
 * Get the bookmark count for a post.
 *
 * @param WP_Request $request The request object.
 * @return WP_REST_Response The response object.
 */
function get_bookmark_count( $request ) {
	$post_id        = $request['id'];
	$bookmark_count = (int) get_post_meta( $post_id, 'vs_reading_list_bookmark_count', true );
	return new WP_REST_Response( $bookmark_count );
}



/**
 * Bookmark a post.
 *
 * @param WP_Request $request The request object.
 * @return WP_REST_Response The response object.
 */
function bookmark_post( $request ) {

	// // Verify nonce.
	// if ( ! isset( $_POST['vs_reading_list_nonce'] ) || ! wp_verify_nonce( $_POST['vs_reading_list_nonce'], 'vs_reading_list_nonce' ) ) {
	// return new WP_REST_Response( 'Invalid nonce', 403 );
	// }

	$post_id        = $request['id'];
	$bookmark_count = (int) get_post_meta( $post_id, 'vs_reading_list_bookmark_count', true );
	$bookmark_count = $bookmark_count ? $bookmark_count + 1 : 1;
	update_post_meta( $post_id, 'vs_reading_list_bookmark_count', $bookmark_count );
	return new WP_REST_Response( $bookmark_count );
}
