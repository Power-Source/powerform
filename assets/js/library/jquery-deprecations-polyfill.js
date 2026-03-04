/**
 * jQuery Deprecations Polyfill
 * Intercepts jQuery deprecated methods BEFORE shared-ui.js loads
 * Maps old jQuery methods to modern equivalents
 */

(function() {
  'use strict';

  // Only run if jQuery is available
  if (typeof jQuery === 'undefined') {
    return;
  }

  var $ = jQuery;

  // ============================================
  // 1. $.isArray() -> Array.isArray()
  // ============================================
  if ($ && typeof $.isArray === 'function' && !$._isArrayPatched) {
    var originalIsArray = $.isArray;
    $.isArray = function(obj) {
      return Array.isArray(obj);
    };
    $._isArrayPatched = true;
  }

  // ============================================
  // 2. $.isFunction() -> typeof check
  // ============================================
  if ($ && typeof $.isFunction === 'function' && !$._isFunctionPatched) {
    var originalIsFunction = $.isFunction;
    $.isFunction = function(obj) {
      return typeof obj === 'function';
    };
    $._isFunctionPatched = true;
  }

  // ============================================
  // 3. $.trim() -> String.prototype.trim()
  // ============================================
  if ($ && typeof $.trim === 'function' && !$._trimPatched) {
    var originalTrim = $.trim;
    $.trim = function(str) {
      return str == null ? '' : String(str).trim();
    };
    $._trimPatched = true;
  }

  // ============================================
  // 4. jQuery event shorthand handlers
  // Map deprecated shorthands to .on() method
  // ============================================
  
  // Store reference to original jQuery.fn.on
  var $fn = $.fn;
  var originalOn = $fn.on;

  // List of deprecated event shortcuts to intercept
  var deprecatedEvents = ['click', 'mouseup', 'mousedown', 'mousemove', 'keyup', 'keydown', 'change', 'focus', 'blur'];

  // For each deprecated event shorthand, override it to use .on()
  deprecatedEvents.forEach(function(eventName) {
    if (typeof $fn[eventName] === 'function' && !$fn[eventName]._isPatched) {
      var originalHandler = $fn[eventName];
      $fn[eventName] = function(callback) {
        // If called with callback, use .on() instead
        if (typeof callback === 'function') {
          return this.on(eventName, callback);
        }
        // Otherwise, trigger the event
        return this.trigger(eventName);
      };
      $fn[eventName]._isPatched = true;
    }
  });

  // ============================================
  // 5. .unbind() -> .off()
  // ============================================
  if (typeof $fn.unbind === 'function' && !$fn.unbind._isPatched) {
    var originalUnbind = $fn.unbind;
    $fn.unbind = function(event, callback) {
      // Unbind is essentially .off()
      if (arguments.length === 0) {
        return this.off();
      } else if (arguments.length === 1 && typeof event === 'string') {
        return this.off(event);
      } else if (arguments.length >= 2 && typeof event === 'string') {
        return this.off(event, callback);
      }
      // Fallback to original if usage is unexpected
      return originalUnbind.apply(this, arguments);
    };
    $fn.unbind._isPatched = true;
  }

  // ============================================
  // 6. Suppress jQuery-migrate warnings
  // ============================================
  if (typeof jQuery.migrateMute === 'boolean') {
    jQuery.migrateMute = true;
  }

})();
