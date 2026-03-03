<?php
/**
 * ClassicPress Compatibility Helper Functions
 *
 * This file provides compatibility functions for ClassicPress
 * where certain WordPress functions may not exist or behave differently.
 *
 * @since 1.15.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Check if we're running on ClassicPress
 *
 * @since 1.15.0
 * @return bool
 */
function powerform_is_classicpress() {
	return function_exists( 'classicpress_version' );
}

/**
 * Enhanced wp_enqueue_editor for ClassicPress compatibility
 *
 * @since 1.15.0
 */
function powerform_enqueue_editor_safe() {
	static $initialized = false;
	
	if ( function_exists( 'wp_enqueue_editor' ) ) {
		wp_enqueue_editor();
		return;
	}
	
	// ClassicPress fallback - only enqueue if needed
	if ( powerform_is_classicpress() && ! $initialized ) {
		$initialized = true;
		
		// Enqueue TinyMCE only if not already enqueued
		if ( ! wp_script_is( 'editor', 'enqueued' ) && ! wp_script_is( 'wp-tinymce', 'enqueued' ) ) {
			wp_enqueue_script( 'editor' );
		}
		
		// Enqueue media buttons
		if ( ! wp_style_is( 'buttons', 'enqueued' ) ) {
			wp_enqueue_style( 'buttons' );
		}
		
		// Add footer script hook only once
		add_action( 'admin_footer', 'powerform_print_editor_scripts', 999 );
		add_action( 'wp_footer', 'powerform_print_editor_scripts', 999 );
	}
}

/**
 * Print editor scripts for ClassicPress
 *
 * @since 1.15.0
 */
function powerform_print_editor_scripts() {
	static $printed = false;
	
	if ( $printed ) {
		return;
	}
	
	$printed = true;
	
	// Only print if ClassicPress and TinyMCE is available
	if ( ! powerform_is_classicpress() ) {
		return;
	}
	
	?>
	<script type="text/javascript">
	/* <![CDATA[ */
	(function($) {
		'use strict';
		
		// Wait for document ready
		$(document).ready(function() {
			// Give TinyMCE time to load
			setTimeout(function() {
				// Check if TinyMCE is available
				if ( typeof tinymce === 'undefined' ) {
					console.log('Powerform: TinyMCE not available, skipping editor initialization');
					return;
				}
				
				// Initialize any pending editors
				if ( $('.powerform-wp-editor').length > 0 ) {
					$('.powerform-wp-editor').each(function() {
						var editorId = $(this).attr('id');
						if ( editorId && ! tinymce.get(editorId) ) {
							try {
								tinymce.init({
									selector: '#' + editorId,
									menubar: false,
									statusbar: false,
									toolbar: 'bold italic underline | bullist numlist | link',
									plugins: 'lists,link',
									height: 200,
									setup: function(editor) {
										editor.on('change', function() {
											editor.save();
											$(editor.getElement()).trigger('change');
										});
									}
								});
							} catch(e) {
								console.log('Powerform: Failed to initialize TinyMCE for #' + editorId, e);
							}
						}
					});
				}
			}, 500); // Wait 500ms for scripts to load
		});
		
	})(jQuery);
	/* ]]> */
	</script>
	<?php
}

/**
 * Enhanced _WP_Editors compatibility check
 *
 * @since 1.15.0
 * @return bool
 */
function powerform_has_wp_editors() {
	return class_exists( '_WP_Editors' );
}

/**
 * Enqueue editor scripts for AJAX load with ClassicPress compatibility
 *
 * @since 1.15.0
 * @return string
 */
function powerform_get_ajax_editor_scripts() {
	$script = '';
	
	if ( class_exists( '_WP_Editors' ) ) {
		global $wp_scripts;
		ob_start();
		_WP_Editors::enqueue_scripts();
		if ( ! empty( $wp_scripts ) ) {
			$wp_scripts->do_footer_items();
		}
		_WP_Editors::editor_js();
		$script = ob_get_clean();
	} elseif ( powerform_is_classicpress() ) {
		// ClassicPress compatibility: output TinyMCE scripts
		global $wp_scripts;
		ob_start();
		
		wp_enqueue_script( 'wp-tinymce' );
		
		if ( ! empty( $wp_scripts ) ) {
			$wp_scripts->do_items( array( 'wp-tinymce' ) );
		}
		
		powerform_print_editor_scripts();
		
		$script = ob_get_clean();
	}
	
	return $script;
}
