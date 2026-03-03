<?php // phpcs:ignoreFile this file only html container for wizard which is handled by js. 

// Output powerformData and powerforml10n directly in the template
$powerform_data_obj = new Powerform_Admin_Data();
$powerform_l10n_obj = new Powerform_Admin_L10n();
$powerform_data = $powerform_data_obj->get_options_data();
$powerform_l10n = $powerform_l10n_obj->get_l10n_strings();
?>
<script type="text/javascript">
/* <![CDATA[ */
window.powerformData = <?php echo wp_json_encode( $powerform_data ); ?>;
window.powerforml10n = <?php echo wp_json_encode( $powerform_l10n ); ?>;
/* ]]> */
</script>
<div id="powerform-personality-builder"></div>
