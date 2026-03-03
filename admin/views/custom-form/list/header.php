<?php $count = $this->countModules(); ?>

<h1 class="sui-header-title"><?php esc_html_e( 'Formulare', Powerform::DOMAIN ); ?></h1>

<div class="sui-actions-left">

	<button class="sui-button sui-button-blue psource-button-open-modal" data-modal="custom_forms"><i class="sui-icon-plus" aria-hidden="true"></i> <?php esc_html_e( 'Erstellen', Powerform::DOMAIN ); ?></button>

	<?php if ( Powerform::is_import_export_feature_enabled() ) : ?>

		<a href="#"
			class="sui-button psource-open-modal"
			data-modal="import_cform"
			data-modal-title=""
			data-nonce="<?php echo esc_attr( wp_create_nonce( 'powerform_popup_import_cform' ) ); ?>"><i class="sui-icon-upload-cloud" aria-hidden="true"></i> <?php esc_html_e( 'Importieren', Powerform::DOMAIN ); ?></a>

	<?php endif; ?>

</div>
