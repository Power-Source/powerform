<?php
/**
 * Test Script to debug form wizard loading
 */
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

// Load WordPress
$wp_path = dirname( dirname( dirname( dirname( __FILE__ ) ) ) );
require_once $wp_path . '/wp-load.php';

echo "<!-- Test Start -->\n";
echo "<!-- WP Loaded: " . ( function_exists( 'add_action' ) ? 'YES' : 'NO' ) . " -->\n";

// Test Powerform
if ( function_exists( 'powerform_plugin_url' ) ) {
    echo "<!-- Powerform loaded: YES -->\n";
} else {
    echo "<!-- Powerform loaded: NO -->\n";
}

// Test custom form model
if ( class_exists( 'Powerform_Custom_Form_Model' ) ) {
    echo "<!-- Custom Form Model exists: YES -->\n";
    $form_model = Powerform_Custom_Form_Model::model();
    $form = $form_model->load( 159 );
    if ( $form ) {
        echo "<!-- Form 159 loaded: YES -->\n";
        echo "<!-- Form Name: " . $form->name . " -->\n";
    } else {
        echo "<!-- Form 159 loaded: NO -->\n";
    }
} else {
    echo "<!-- Custom Form Model exists: NO -->\n";
}

// Test Admin Loader
if ( class_exists( 'Powerform_Custom_Form_Admin' ) ) {
    echo "<!-- Custom Form Admin exists: YES -->\n";
} else {
    echo "<!-- Custom Form Admin exists: NO -->\n";
}

echo "<!-- Test End -->\n";
?>
