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

?>

<ul
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="vs-reading-list"
	data-wp-init="callbacks.initReadingList"
>
	<template data-wp-each--bookmark="state.allBookmarks" >
		<li>
			<a data-wp-text="context.bookmark.postTitle" data-wp-bind--href="context.bookmark.postUrl"></a>
			<button data-wp-on--click="actions.toggle"><?php esc_html_e( 'Remove', 'vs-reading-list' ); ?></button>
		</li>
	</template>
	<li data-wp-bind--hidden="state.allBookmarks.length">
		<?php esc_html_e( 'Add your first bookmark!', 'vs-reading-list' ); ?>
	</li>
</ul>
