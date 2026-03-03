/**
 * Powerform Radio Button State Initializer
 * Ensures radio buttons get visual feedback when clicked
 */
(function($) {
    'use strict';

    $(document).ready(function() {
        // Initialize radio states for all poll forms
        $('.powerform-poll .powerform-radio').each(function() {
            if (typeof FUI !== 'undefined' && typeof FUI.radioStates === 'function') {
                FUI.radioStates(this);
            }
        });

        // Also handle dynamically loaded forms (AJAX)
        $(document).on('powerform:poll:loaded', function() {
            $('.powerform-poll .powerform-radio').each(function() {
                if (typeof FUI !== 'undefined' && typeof FUI.radioStates === 'function') {
                    FUI.radioStates(this);
                }
            });
        });
    });
})(jQuery);
