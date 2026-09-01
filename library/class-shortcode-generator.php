<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Shortcode_Generator
 */
class Powerform_Shortcode_Generator {

	/**
	 * Powerform_Shortcode_Generator constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		add_action( 'media_buttons', array( $this, 'attach_button' ) );
		add_action( 'admin_footer', array( $this, 'enqueue_js_scripts' ) );
		if ( function_exists( 'hustle_activated' ) ) {
			add_action( 'admin_footer', array( $this, 'enqueue_preview_scripts_for_hustle' ) );
		}
	}

	/**
	 * Check if current page is Hustle wizard page
	 *
	 * @since 1.0.5
	 *
	 * @return bool
	 */
	public function is_hustle_wizard() {
		$screen = get_current_screen();

		// If no screen id, abort
		if( !isset( $screen->id ) ) return false;

		// Hustle wizard pages
		$pages = array(
			'hustle_page_hustle_popup',
			'hustle_page_hustle_slidein',
			'hustle_page_hustle_embedded',
			'hustle_page_hustle_sshare'
		);

		// Check if current page is hustle wizard page
		if( in_array( $screen->id, $pages, true ) ) return true;

		return false;
	}

	/**
	 * Check whether the current screen supports the shortcode generator.
	 *
	 * @return bool
	 */
	private function is_supported_editor_screen() {
		$screen = get_current_screen();

		return isset( $screen->base, $screen->post_type ) && 'post' === $screen->base && ! empty( $screen->post_type );
	}

	/**
	 * Attach button
	 *
	 * @since 1.0
	 */
	public function attach_button() {
		if ( ! $this->is_supported_editor_screen() && ! $this->is_hustle_wizard() ) {
			return;
		}

		// Button markup
		printf(
			'<button type="button" id="%s" class="button" data-editor="content">%s<span>%s</span></button>',
			'powerform-generate-shortcode',
			'<i class="powerform-scgen-icon" aria-hidden="true"></i>',
			esc_html__( 'Formular hinzufügen', Powerform::DOMAIN )
		);
	}

	/**
	 * @since 1.0
	 * @param $content
	 *
	 * @return mixed
	 */
	public function enqueue_js_scripts( $content ) {
		if ( ! $this->is_supported_editor_screen() && ! $this->is_hustle_wizard() ) {
			return $content;
		}

		$this->print_markup();
	}

	/**
	 * @since 1.0
	 * @param $content
	 *
	 * @return mixed
	 */
	public function enqueue_preview_scripts_for_hustle( $content ) {

		// If page is not Hustle module settings page, abort
		if ( ! $this->is_hustle_wizard() ) {
			return $content;
		}

		/**
		 * Powerform UI
		 * These stylesheets currently works with "forms" only.
		 *
		 * @since 1.7.0
		 */
		wp_enqueue_style( 'powerform-scgen-global', powerform_plugin_url() . 'assets/powerform-ui/css/powerform-global.min.css', array(), POWERFORM_VERSION );
		wp_enqueue_style( 'powerform-scgen-icons', powerform_plugin_url() . 'assets/powerform-ui/css/powerform-icons.min.css', array(), POWERFORM_VERSION );
		wp_enqueue_style( 'powerform-scgen-forms', powerform_plugin_url() . 'assets/powerform-ui/css/powerform-forms.min.css', array(), POWERFORM_VERSION );

	}

	/**
	 * Print modal markup
	 *
	 * @since 1.0
	 */
	public function print_markup() {
		?>
		<style>
			#powerform-scgen-root[hidden] { display: none; }
			#powerform-scgen-root { position: fixed; inset: 0; z-index: 100100; }
			#powerform-scgen-root .powerform-scgen-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, .55); }
			#powerform-scgen-root .powerform-scgen-dialog { box-sizing: border-box; width: min(520px, calc(100% - 32px)); max-height: calc(100vh - 64px); overflow: auto; position: relative; margin: 32px auto; padding: 24px; background: #fff; border-radius: 4px; box-shadow: 0 12px 40px rgba(0, 0, 0, .25); }
			#powerform-scgen-root .powerform-scgen-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
			#powerform-scgen-root h2 { margin: 0 0 8px; font-size: 20px; }
			#powerform-scgen-root p { margin: 0 0 20px; }
			#powerform-scgen-root .powerform-scgen-close { min-width: 32px; min-height: 32px; padding: 0; border: 0; background: transparent; font-size: 24px; line-height: 1; cursor: pointer; }
			#powerform-scgen-root .powerform-scgen-tabs { display: flex; gap: 4px; margin: 0 0 20px; border-bottom: 1px solid #ccd0d4; }
			#powerform-scgen-root .powerform-scgen-tab { margin: 0 0 -1px; padding: 8px 12px; border: 1px solid transparent; background: transparent; cursor: pointer; }
			#powerform-scgen-root .powerform-scgen-tab[aria-selected="true"] { border-color: #ccd0d4 #ccd0d4 #fff; background: #fff; font-weight: 600; }
			#powerform-scgen-root .powerform-scgen-panel[hidden] { display: none; }
			#powerform-scgen-root label { display: block; margin-bottom: 6px; font-weight: 600; }
			#powerform-scgen-root select { box-sizing: border-box; width: 100%; max-width: none; margin: 0 0 16px; }
			#powerform-scgen-root .powerform-scgen-error { display: none; margin: -8px 0 16px; color: #b32d2e; }
		</style>
		<div id="powerform-scgen-root" hidden>
			<div class="powerform-scgen-overlay" data-powerform-close></div>
			<div class="powerform-scgen-dialog" role="dialog" aria-modal="true" aria-labelledby="powerform-scgen-title" aria-describedby="powerform-scgen-description">
				<div class="powerform-scgen-header">
					<div>
						<h2 id="powerform-scgen-title"><?php esc_html_e( 'Powerform Shortcodes', Powerform::DOMAIN ); ?></h2>
						<p id="powerform-scgen-description"><?php esc_html_e( 'Wähle ein Element aus und füge den Shortcode in den Editor ein.', Powerform::DOMAIN ); ?></p>
					</div>
					<button type="button" class="powerform-scgen-close" data-powerform-close aria-label="<?php esc_attr_e( 'Dialog schließen', Powerform::DOMAIN ); ?>">&times;</button>
				</div>
				<div class="powerform-scgen-tabs" role="tablist">
					<button type="button" class="powerform-scgen-tab" role="tab" aria-selected="true" data-panel="powerform-custom-forms"><?php esc_html_e( 'Formulare', Powerform::DOMAIN ); ?></button>
					<button type="button" class="powerform-scgen-tab" role="tab" aria-selected="false" data-panel="powerform-polls"><?php esc_html_e( 'Umfragen', Powerform::DOMAIN ); ?></button>
					<button type="button" class="powerform-scgen-tab" role="tab" aria-selected="false" data-panel="powerform-quizzes"><?php esc_html_e( 'Tests', Powerform::DOMAIN ); ?></button>
				</div>
				<div id="powerform-custom-forms" class="powerform-scgen-panel">
					<label for="powerform-select-forms"><?php esc_html_e( 'Formular', Powerform::DOMAIN ); ?></label>
					<?php echo $this->get_forms(); // WPCS: XSS ok. ?>
					<p class="powerform-scgen-error"><?php esc_html_e( 'Bitte wähle eine Option.', Powerform::DOMAIN ); ?></p>
					<button type="button" class="button button-primary powerform-scgen-insert" data-select="powerform-select-forms" data-shortcode="powerform_form"><?php esc_html_e( 'Shortcode einfügen', Powerform::DOMAIN ); ?></button>
				</div>
				<div id="powerform-polls" class="powerform-scgen-panel" hidden>
					<label for="powerform-select-polls"><?php esc_html_e( 'Umfrage', Powerform::DOMAIN ); ?></label>
					<?php echo $this->get_polls(); // WPCS: XSS ok. ?>
					<p class="powerform-scgen-error"><?php esc_html_e( 'Bitte wähle eine Option.', Powerform::DOMAIN ); ?></p>
					<button type="button" class="button button-primary powerform-scgen-insert" data-select="powerform-select-polls" data-shortcode="powerform_poll"><?php esc_html_e( 'Shortcode einfügen', Powerform::DOMAIN ); ?></button>
				</div>
				<div id="powerform-quizzes" class="powerform-scgen-panel" hidden>
					<label for="powerform-select-quizzes"><?php esc_html_e( 'Test', Powerform::DOMAIN ); ?></label>
					<?php echo $this->get_quizzes(); // WPCS: XSS ok. ?>
					<p class="powerform-scgen-error"><?php esc_html_e( 'Bitte wähle eine Option.', Powerform::DOMAIN ); ?></p>
					<button type="button" class="button button-primary powerform-scgen-insert" data-select="powerform-select-quizzes" data-shortcode="powerform_quiz"><?php esc_html_e( 'Shortcode einfügen', Powerform::DOMAIN ); ?></button>
				</div>
			</div>
		</div>
		<script>
		(function($) {
			var root = $('#powerform-scgen-root');
			$('#powerform-generate-shortcode').on('click', function(event) {
				event.preventDefault();
				root.removeAttr('hidden');
				root.find('.powerform-scgen-close').trigger('focus');
			});
			root.on('click', '[data-powerform-close]', function() {
				root.attr('hidden', 'hidden');
			});
			root.on('click', '.powerform-scgen-tab', function() {
				var tab = $(this);
				root.find('.powerform-scgen-tab').attr('aria-selected', 'false');
				tab.attr('aria-selected', 'true');
				root.find('.powerform-scgen-panel').attr('hidden', 'hidden');
				root.find('#' + tab.data('panel')).removeAttr('hidden');
			});
			root.on('click', '.powerform-scgen-insert', function() {
				var button = $(this);
				var select = root.find('#' + button.data('select'));
				var error = button.siblings('.powerform-scgen-error');
				if (!select.val()) {
					error.show();
					return;
				}
				error.hide();
				window.send_to_editor('[' + button.data('shortcode') + ' id="' + select.val() + '"]');
				root.attr('hidden', 'hidden');
			});
			$(document).on('keydown', function(event) {
				if (event.key === 'Escape' && !root.is('[hidden]')) {
					root.attr('hidden', 'hidden');
				}
			});
		})(jQuery);
		</script>
		<?php
	}

	/**
	 * Print forms select
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_forms() {

		$html = '';

		$html .= '<select id="powerform-select-forms" name="forms" class="powerform-custom-form-list">';

			$html .= '<option value="">' . __( 'Wähle Benutzerdefiniertes Formular', Powerform::DOMAIN ) . '</option>';

			$modules = powerform_cform_modules( 999 );

			foreach( $modules as $module ) {

				$title = powerform_get_form_name( $module['id'], 'custom_form' );

				if ( mb_strlen( $title ) > 25 ) {
					$title = mb_substr( $title, 0, 25 ) . '...';
				}

				$html .= '<option value="' . $module['id'] . '">' . $title. ' - ID: ' . $module['id'] . '</option>';

			}
		$html .= '</select>';

		return $html;

	}

	/**
	 * Print polls select
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_polls() {

		$html = '';

		$html .= '<select id="powerform-select-polls" name="forms" class="powerform-insert-poll">';

			$html .= '<option value="">' . __( "Wähle Umfrage", Powerform::DOMAIN ) . '</option>';

			$modules = powerform_polls_modules( 999 );

			foreach( $modules as $module ) {

				$title = powerform_get_form_name( $module['id'], 'poll');

				if ( mb_strlen( $title ) > 25 ) {
					$title = mb_substr( $title, 0, 25 ) . '...';
				}

				$html .= '<option value="' . $module['id'] . '">' . $title . ' - ID: ' . $module['id'] . '</option>';

			}

		$html .= '</select>';

		return $html;
	}

	/**
	 * Print quizzes select
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_quizzes() {

		$html = '';

		$html .= '<select id="powerform-select-quizzes" name="forms" class="powerform-quiz-list">';

			$html .= '<option value="">' . __( "Wähle Quiz", Powerform::DOMAIN ) . '</option>';

			$modules = powerform_quizzes_modules( 999 );

			foreach( $modules as $module ) {

				$title = powerform_get_form_name( $module['id'], 'quiz');

				if ( mb_strlen( $title ) > 25 ) {
					$title = mb_substr( $title, 0, 25 ) . '...';
				}

				$html .= '<option value="' . $module['id'] . '">' . $title . ' - ID: ' . $module['id'] . '</option>';

			}

		$html .= '</select>';

		return $html;

	}
}
