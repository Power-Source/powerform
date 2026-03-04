/**
 * Select2 to Choices.js Compatibility Shim
 * 
 * This shim allows existing Select2 code to work with Choices.js
 * Usage: $('select').select2(options) will use Choices.js behind the scenes
 * 
 * @version 1.0.0
 * @requires Choices.js
 * @requires jQuery
 */

(function($) {
    'use strict';

    // Store Choices instances
    var choicesInstances = new WeakMap();

    /**
     * Convert Select2 options to Choices.js options
     */
    function convertOptions(select2Options) {
        var choicesOptions = {
            searchEnabled: true,
            searchPlaceholderValue: 'Suchen...',
            itemSelectText: '',
            removeItemButton: false,
            shouldSort: false,
            classNames: {
                containerOuter: 'choices select2-container',
                containerInner: 'choices__inner select2-selection',
                input: 'choices__input',
                inputCloned: 'choices__input--cloned',
                list: 'choices__list',
                listItems: 'choices__list--multiple',
                listSingle: 'choices__list--single',
                listDropdown: 'choices__list--dropdown select2-results',
                item: 'choices__item',
                itemSelectable: 'choices__item--selectable select2-results__option',
                itemDisabled: 'choices__item--disabled',
                itemChoice: 'choices__item--choice',
                placeholder: 'choices__placeholder',
                group: 'choices__group',
                groupHeading: 'choices__heading',
                button: 'choices__button',
                activeState: 'is-active',
                focusState: 'is-focused',
                openState: 'is-open select2-container--open',
                disabledState: 'is-disabled',
                highlightedState: 'is-highlighted',
                selectedState: 'is-selected',
                flippedState: 'is-flipped',
                loadingState: 'is-loading',
                noResults: 'has-no-results',
                noChoices: 'has-no-choices'
            }
        };

        if (!select2Options) {
            return choicesOptions;
        }

        // Map Select2 options to Choices options
        if (select2Options.placeholder) {
            choicesOptions.placeholderValue = select2Options.placeholder;
        }

        if (select2Options.allowClear !== undefined) {
            choicesOptions.removeItemButton = select2Options.allowClear;
        }

        if (select2Options.minimumResultsForSearch !== undefined) {
            choicesOptions.searchEnabled = select2Options.minimumResultsForSearch !== -1;
        }

        if (select2Options.width) {
            // Choices doesn't have width option, handle via CSS
        }

        if (select2Options.multiple !== undefined) {
            // Multiple is detected from <select multiple>
        }

        if (select2Options.data) {
            choicesOptions.choices = select2Options.data.map(function(item) {
                return {
                    value: item.id,
                    label: item.text,
                    selected: item.selected || false,
                    disabled: item.disabled || false
                };
            });
        }

        return choicesOptions;
    }

    /**
     * jQuery plugin to replace Select2 with Choices
     */
    $.fn.select2 = function(options) {
        // Handle different call types
        if (typeof options === 'string') {
            var method = options;
            var args = Array.prototype.slice.call(arguments, 1);

            return this.each(function() {
                var instance = choicesInstances.get(this);
                
                if (!instance) {
                    console.warn('Choices.js instance not found on element', this);
                    return;
                }

                // Handle common Select2 methods
                switch(method) {
                    case 'destroy':
                        instance.destroy();
                        choicesInstances.delete(this);
                        break;
                    
                    case 'val':
                        if (args.length > 0) {
                            instance.setChoiceByValue(args[0]);
                        } else {
                            return instance.getValue(true);
                        }
                        break;
                    
                    case 'data':
                        // Get selected data
                        var selected = instance.getValue(true);
                        if (Array.isArray(selected)) {
                            return selected.map(function(val) {
                                return { id: val, text: val };
                            });
                        }
                        return selected ? { id: selected, text: selected } : null;
                    
                    case 'open':
                        instance.showDropdown();
                        break;
                    
                    case 'close':
                        instance.hideDropdown();
                        break;
                    
                    case 'enable':
                        instance.enable();
                        break;
                    
                    case 'disable':
                        instance.disable();
                        break;
                    
                    default:
                        console.warn('Unsupported Select2 method:', method);
                }
            });
        }

        // Initialize Choices on each element
        return this.each(function() {
            var $this = $(this);
            
            // Skip if already initialized
            if (choicesInstances.has(this)) {
                console.warn('Choices already initialized on', this);
                return;
            }

            // Skip if not a select element
            if (this.tagName !== 'SELECT') {
                console.warn('Element is not a select:', this);
                return;
            }

            // Convert options
            var choicesOptions = convertOptions(options);

            // Initialize Choices
            try {
                var instance = new Choices(this, choicesOptions);
                choicesInstances.set(this, instance);

                // Add Select2 compatibility class to container
                var container = this.parentElement.querySelector('.choices');
                if (container) {
                    container.classList.add('select2-container');
                    
                    // Add open state on dropdown show
                    this.addEventListener('showDropdown', function() {
                        container.classList.add('select2-container--open');
                        $this.trigger('select2:open');
                    });
                    
                    this.addEventListener('hideDropdown', function() {
                        container.classList.remove('select2-container--open');
                        $this.trigger('select2:close');
                    });

                    // Trigger change events for Select2 compatibility
                    this.addEventListener('change', function(e) {
                        $this.trigger('select2:select', { params: { data: e.detail } });
                    });

                    this.addEventListener('removeItem', function(e) {
                        $this.trigger('select2:unselect', { params: { data: e.detail } });
                    });
                }
            } catch (e) {
                console.error('Failed to initialize Choices:', e);
            }
        });
    };

    // Alias for compatibility
    $.fn.FUIselect2 = $.fn.select2;

})(jQuery);
