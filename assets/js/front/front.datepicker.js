// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; // noinspection JSUnusedLocalSymbols
(function($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "powerformFrontDatePicker",
        defaults = {};

    // The actual plugin constructor
    function PowerformFrontDatePicker(element, options) {
        this.element = element;
        this.$el = $(this.element);

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(PowerformFrontDatePicker.prototype, {
        init: function() {
            var self = this,
                dateFormat = this.$el.data('format'),
                restrict = this.$el.data('restrict'),
                restrictedDays = this.$el.data('restrict'),
                minYear = this.$el.data('start-year'),
                maxYear = this.$el.data('end-year'),
                pastDates = this.$el.data('past-dates'),
                dateValue = this.$el.val(),
                startOfWeek = this.$el.data('start-of-week'),
                minDate = this.$el.data('start-date'),
                maxDate = this.$el.data('end-date'),
                startField = this.$el.data('start-field'),
                endField = this.$el.data('end-field'),
                startOffset = this.$el.data('start-offset'),
                endOffset = this.$el.data('end-offset'),
                disableDate = this.$el.data('disable-date'),
                disableRange = this.$el.data('disable-range'),
                momentFormat = this.to_moment_format(dateFormat);

            if (!isNaN(parseFloat(restrictedDays)) && isFinite(restrictedDays)) {
                restrictedDays = [restrictedDays.toString()];
            } else {
                restrictedDays = (restrict || '').toString().split(',');
            }

            disableDate = (disableDate || '').toString().split(',');
            disableRange = (disableRange || '').toString().split(',');

            if (!minYear) {
                minYear = 'c-95';
            }
            if (!maxYear) {
                maxYear = 'c+95';
            }

            var parent = this.$el.closest('.powerform-custom-form'),
                add_class = "powerform-calendar";

            if (parent.hasClass('powerform-design--default')) {
                add_class = "powerform-calendar--default";
            } else if (parent.hasClass('powerform-design--material')) {
                add_class = "powerform-calendar--material";
            } else if (parent.hasClass('powerform-design--flat')) {
                add_class = "powerform-calendar--flat";
            } else if (parent.hasClass('powerform-design--bold')) {
                add_class = "powerform-calendar--bold";
            }


            this.$el.daterangepicker({
                singleDatePicker: true,
                autoUpdateInput: false,
                showDropdowns: true,
                minYear: this.resolve_year_value(minYear, true),
                maxYear: this.resolve_year_value(maxYear, false),
                minDate: this.resolve_year_bound(minYear, true),
                maxDate: this.resolve_year_bound(maxYear, false),
                locale: {
                    format: momentFormat,
                    firstDay: parseInt(startOfWeek, 10) || 0,
                    daysOfWeek: (datepickerLang && datepickerLang.dayNamesMin) ? datepickerLang.dayNamesMin : undefined,
                    monthNames: (datepickerLang && datepickerLang.monthNames) ? datepickerLang.monthNames : undefined
                },
                isInvalidDate: function(currentMoment) {
                    return self.restrict_date(restrictedDays, disableDate, disableRange, currentMoment, momentFormat);
                }
            });

            var picker = this.$el.data('daterangepicker');

            if (picker && picker.container) {
                picker.container.addClass('powerform-custom-form-' + parent.data('form-id') + ' ' + add_class + ' notranslate');
            }

            this.$el.on('show.daterangepicker', function() {
                var bounds = self.get_dynamic_bounds({
                    pastDates: pastDates,
                    dateValue: dateValue,
                    minDate: minDate,
                    maxDate: maxDate,
                    startField: startField,
                    endField: endField,
                    startOffset: startOffset,
                    endOffset: endOffset,
                    momentFormat: momentFormat
                });

                picker.minDate = bounds.minDate;
                picker.maxDate = bounds.maxDate;
                picker.updateView();
                picker.updateCalendars();
            });

            this.$el.on('apply.daterangepicker', function(ev, activePicker) {
                $(this).val(activePicker.startDate.format(momentFormat)).trigger('change').valid();
            });

            this.$el.on('cancel.daterangepicker', function() {
                $(this).val('').trigger('change').valid();
            });

            var initialDate = this.parse_date_value(this.$el.val(), momentFormat);
            if (picker && initialDate) {
                picker.setStartDate(initialDate);
                picker.setEndDate(initialDate);
                this.$el.val(initialDate.format(momentFormat));
            }
        },

        parse_date_value: function(value, momentFormat) {
            if (!value) {
                return null;
            }

            var parsed = moment(value, [momentFormat, 'MM/DD/YYYY', 'MM/DD/YY', 'YYYY-MM-DD', 'D MMMM YYYY'], true);
            if (!parsed.isValid()) {
                parsed = moment(value);
            }

            return parsed.isValid() ? parsed : null;
        },

        resolve_year_value: function(yearValue, isStart) {
            if (!yearValue) {
                return isStart ? moment().year() - 95 : moment().year() + 95;
            }

            var yearString = yearValue.toString();
            if (yearString.indexOf('c') === 0) {
                var offset = parseInt(yearString.replace('c', ''), 10);
                if (!isNaN(offset)) {
                    return moment().year() + offset;
                }
            }

            var year = parseInt(yearString, 10);
            return isNaN(year) ? (isStart ? moment().year() - 95 : moment().year() + 95) : year;
        },

        resolve_year_bound: function(yearValue, isStart) {
            var year = this.resolve_year_value(yearValue, isStart);
            return isStart ? moment([year, 0, 1]) : moment([year, 11, 31]);
        },

        apply_offset: function(baseMoment, offsetValue) {
            if (!offsetValue || !baseMoment) {
                return baseMoment;
            }

            var data = offsetValue.toString().split('_');
            if (data.length < 3) {
                return baseMoment;
            }

            var sign = data[0],
                amount = parseInt(data[1], 10),
                unit = data[2];

            if (isNaN(amount)) {
                return baseMoment;
            }

            if ('-' === sign) {
                return baseMoment.clone().subtract(amount, unit);
            }

            return baseMoment.clone().add(amount, unit);
        },

        get_dynamic_bounds: function(config) {
            var minDate = this.resolve_year_bound(this.$el.data('start-year') || 'c-95', true),
                maxDate = this.resolve_year_bound(this.$el.data('end-year') || 'c+95', false);

            if ('disable' === config.pastDates) {
                var startValue = this.parse_date_value(config.dateValue, config.momentFormat);
                minDate = startValue || moment();
            }

            if (config.minDate) {
                var configuredMinDate = this.parse_date_value(config.minDate, config.momentFormat);
                if (configuredMinDate) {
                    minDate = configuredMinDate;
                }
            }

            if (config.maxDate) {
                var configuredMaxDate = this.parse_date_value(config.maxDate, config.momentFormat);
                if (configuredMaxDate) {
                    maxDate = configuredMaxDate;
                }
            }

            if (config.startField) {
                var linkedStartValue = $('input[name ="' + config.startField + '"]').val();
                if (typeof linkedStartValue !== 'undefined' && linkedStartValue !== '') {
                    var linkedStartMoment = this.parse_date_value(linkedStartValue, config.momentFormat);
                    if (linkedStartMoment) {
                        minDate = this.apply_offset(linkedStartMoment, config.startOffset);
                    }
                }
            }

            if (config.endField) {
                var linkedEndValue = $('input[name ="' + config.endField + '"]').val();
                if (typeof linkedEndValue !== 'undefined' && linkedEndValue !== '') {
                    var linkedEndMoment = this.parse_date_value(linkedEndValue, config.momentFormat);
                    if (linkedEndMoment) {
                        maxDate = this.apply_offset(linkedEndMoment, config.endOffset);
                    }
                }
            }

            return {
                minDate: minDate,
                maxDate: maxDate
            };
        },

        to_moment_format: function(dateFormat) {
            var formatMap = {
                yy: 'YYYY',
                y: 'YY',
                MM: 'MMMM',
                M: 'MMM',
                mm: 'MM',
                m: 'M',
                DD: 'dddd',
                D: 'ddd',
                dd: 'DD',
                d: 'D',
                o: 'DDD'
            };

            return (dateFormat || 'mm/dd/yy').replace(/yy|y|MM|M|mm|m|DD|D|dd|d|o/g, function(token) {
                return formatMap[token] || token;
            });
        },

        restrict_date: function(restrictedDays, disableDate, disableRange, date, momentFormat) {
            var day = date.day(),
                dateStringShort = date.format('MM/DD/YY'),
                dateStringLong = date.format('MM/DD/YYYY'),
                hasRange = true,
                i;

            for (i = 0; i < disableRange.length; i++) {
                var rangeValue = $.trim(disableRange[i]);
                if (!rangeValue) {
                    continue;
                }

                var disableDateRange = rangeValue.split('-'),
                    startDate = this.parse_date_value($.trim(disableDateRange[0]), momentFormat),
                    endDate = this.parse_date_value($.trim(disableDateRange.slice(1).join('-')), momentFormat);

                if (startDate && endDate && date.isBetween(startDate, endDate, 'day', '[]')) {
                    hasRange = false;
                    break;
                }
            }

            return (-1 !== restrictedDays.indexOf(day.toString()) ||
                -1 !== disableDate.indexOf(dateStringShort) ||
                -1 !== disableDate.indexOf(dateStringLong) ||
                false === hasRange);
        },
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new PowerformFrontDatePicker(this, options));
            }
        });
    };

})(jQuery, window, document);