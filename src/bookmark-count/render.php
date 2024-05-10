<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */


$my_context = array(
	'count' => (int) get_post_meta( get_the_ID(), 'vs_reading_list_bookmark_count', true ),
);
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="vs-reading-list"
	<?php echo wp_interactivity_data_wp_context( $my_context ); ?>
	data-wp-init="callbacks.initBookmarkCount"
>
	<span data-wp-text="context.count"></span>
</div>
