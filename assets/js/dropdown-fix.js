/**
 * Dropdown Fix - funktioniert ohne .sui-2-6-0 Klasse
 * Repariert die Zahnrad-Menüs in der Admin-UI
 */
(function($) {
	'use strict';

	// Schließe alle offenen Dropdowns
	function closeAllDropdowns(except) {
		var dropdowns = $('.sui-dropdown');
		if (except) {
			dropdowns = dropdowns.not(except);
		}
		dropdowns.removeClass('open');
	}

	// Handler für Dropdown-Anker-Klicks
	$(document).on('click', '.sui-dropdown-anchor', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var dropdown = $(this).closest('.sui-dropdown');
		
		// Schließe alle anderen Dropdowns
		closeAllDropdowns(dropdown);
		
		// Toggle das aktuelle Dropdown
		if (dropdown.hasClass('sui-dropdown')) {
			dropdown.toggleClass('open');
		}
	});

	// Schließe Dropdowns, wenn außerhalb geklickt wird
	$(document).on('click', function(e) {
		var target = $(e.target);
		
		// Wenn der Klick nicht auf ein Dropdown oder Dropdown-Anker ist
		if (!target.closest('.sui-dropdown').length && !target.hasClass('sui-dropdown-anchor')) {
			closeAllDropdowns();
		}
	});

	// Schließe Dropdowns bei ESC-Taste
	$(document).on('keydown', function(e) {
		if (e.keyCode === 27) { // ESC
			closeAllDropdowns();
		}
	});

})( jQuery );
