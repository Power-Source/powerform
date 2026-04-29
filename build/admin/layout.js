function copyToClipboard(e) {
    var t = jQuery("<input />");
    jQuery("body").append(t), t.val(e).select(), document.execCommand("copy"), t.remove()
}! function(e, t) {
    "use strict";
    ! function() {
        e(document).ready(function() {
            if ("object" == typeof window.Powerform && "object" == typeof window.Powerform.Utils && Powerform.Utils.sui_delegate_events(), e("body").on("mouseup", ".sui-dropdown ul, .sui-dropdown ul *", function(e) { e.stopPropagation() }), e(".powerform-toggle-entries-filter").click(function(t) { return e(this).toggleClass("sui-active"), e(this).closest(".sui-box-body").find(".sui-pagination-filter").toggleClass("sui-open"), !1 }), void 0 !== e.fn.daterangepicker) {
                var t = {};
                void 0 !== window.powerform_entries_datepicker_ranges && (t = window.powerform_entries_datepicker_ranges), e("input.powerform-entries-filter-date").daterangepicker({ autoUpdateInput: !1, autoApply: !0, alwaysShowCalendars: !0, ranges: t, locale: powerforml10n.daterangepicker }), e("input.powerform-entries-filter-date").on("apply.daterangepicker", function(t, i) { e(this).val(i.startDate.format("MM/DD/YYYY") + " - " + i.endDate.format("MM/DD/YYYY")) })
            }
            e("form.powerform-entries-actions").on("submit", function() { return "" === e(this).find("select[name=entries-action]").val() && "" === e(this).find("select[name=entries-action-bottom]").val() ? e(this).find("fieldset.powerform-entries-nonce").attr("disabled", "disabled") : e(this).find("fieldset.powerform-entries-nonce").removeAttr("disabled"), !0 }), e(".powerform-entries-clear-filter").click(function() { return e(this).closest(".sui-pagination-filter").find("input[name=date_range]").val("").trigger("change"), e(this).closest(".sui-pagination-filter").find("input[name=search]").val("").trigger("change"), e(this).closest(".sui-pagination-filter").find("input[name=min_id]").val("").trigger("change"), e(this).closest(".sui-pagination-filter").find("input[name=max_id]").val("").trigger("change"), e(this).closest(".sui-pagination-filter").find("select[name=order_by] option").removeAttr("selected"), e(this).closest(".sui-pagination-filter").find("select[name=order_by]").val("").trigger("change"), e(this).closest(".sui-pagination-filter").find("select[name=order_by] option").removeAttr("selected"), e(this).closest(".sui-pagination-filter").find("select[name=order_by]").val("").trigger("change"), e(this).closest(".sui-pagination-filter").find("select[name=order] option").removeAttr("selected"), e(this).closest(".sui-pagination-filter").find("select[name=order]").val("").trigger("change"), e(this).closest(".sui-pagination-filter").find(".powerform-field-select-tab .sui-tabs-menu label[data-tab-index=1]").trigger("click"), e(this).closest(".sui-pagination-filter").find("fieldset.powerform-entries-fields-filter").attr("disabled", "disabled"), !1 }), e(".powerform-field-select-tab .sui-tabs-menu label").click(function() {
                var t = e(this).data("tab-index");
                t = +t, e(this).closest(".sui-side-tabs").find(".sui-tabs-menu label").removeClass("active"), e(this).addClass("active"), e(this).closest(".sui-side-tabs").find(".sui-tabs-content .sui-tab-content").removeClass("active"), e(this).closest(".sui-side-tabs").find(".sui-tabs-content .sui-tab-content[data-tab-index=" + t + "]").addClass("active"), 1 === t ? e(this).closest(".sui-side-tabs").find("fieldset.powerform-entries-fields-filter").attr("disabled", "disabled") : e(this).closest(".sui-side-tabs").find("fieldset.powerform-entries-fields-filter").removeAttr("disabled")
            }), e("#wpf-cform-check_all").on("click", function(t) {
                var i = this.checked,
                    n = e(this).closest("table");
                e(n).find(".sui-checkbox input").each(function() { this.checked = i })
            }), e("#powerform-check-all-modules").on("click", function() {
                var t = this.checked;
                if (e("#powerform-modules-list").length && (e("#powerform-modules-list").find('.sui-checkbox input[id|="wpf-module"]').each(function() { this.checked = t }), e('form[name="bulk-action-form"] input[name="ids"]').length)) {
                    var i = e("#powerform-modules-list").find('.sui-checkbox input[id|="wpf-module"]:checked').map(function() { if (parseFloat(this.value)) return this.value }).get().join(",");
                    e('form[name="bulk-action-form"] input[name="ids"]').val(i)
                }
            }), e(".sui-checkbox input").on("click", function() {
                if (e('form[name="bulk-action-form"] input[name="ids"]').length) {
                    var t = e(".sui-checkbox input:checked").map(function() { if (parseFloat(this.value)) return this.value }).get().join(",");
                    e('form[name="bulk-action-form"] input[name="ids"]').val(t)
                }
                "powerform-check-all-modules" !== e(this).attr("id") && e("#powerform-check-all-modules").prop("checked", !1)
            }), e(".psource-can--hide").ready(function() { e(this).find(".psource-box-header").on("click", function() { e(this).closest(".psource-can--hide").toggleClass("psource-is--hidden") }) }), e(document).on("click", ".psource-open-entry", function(t) {
                if ("checkbox" !== e(t.target).attr("type") && !e(t.target).hasClass("wpdui-icon-check")) {
                    t.preventDefault(), t.stopPropagation();
                    var i = e(this),
                        n = i.data("entry"),
                        a = e("#powerform-" + n),
                        o = !0;
                    a.hasClass("psource-is_open") && (o = !1), e(".psource-entries--result").removeClass("psource-is_open"), o && a.toggleClass("psource-is_open")
                }
            }), e(".psource-result--menu").ready(function() {
                e(this).find(".psource-button-action").on("click", function() {
                    var t = e(this).next(".psource-menu");
                    e(".psource-result--menu.psource-active").removeClass("psource-active"), e(".psource-button-action.psource-active").not(e(this)).removeClass("psource-active"), e(".psource-menu").not(t).addClass("psource-hidden"), e(this).toggleClass("psource-active"), t.toggleClass("psource-hidden")
                })
            }), e(document).ready(function() {
                var t = e(".psource-list"),
                    i = t.find(".psource-list-table"),
                    n = i.find(".psource-table-body tr"),
                    a = n.length,
                    o = a;
                n.each(function() { e(this).find(".psource-body-menu").css("z-index", o), o-- })
            }), e(document).ready(function() {
                var n = function(t) {
                        var i = e("<form>", { method: "post", action: window.location.href });
                        return e("<input>", { type: "hidden", name: "powerform_action", value: "delete" }).appendTo(i), e("<input>", { type: "hidden", name: "id", value: t.data("form-id") || "" }).appendTo(i), e("<input>", { type: "hidden", name: "powerformNonce", value: t.data("nonce") || "" }).appendTo(i), e("<input>", { type: "hidden", name: "powerformEntryNonce", value: t.data("nonce") || "" }).appendTo(i), e("<input>", { type: "hidden", name: "_wp_http_referer", value: window.location.pathname + window.location.search }).appendTo(i), e("body").append(i), i.trigger("submit")
                    },
                    o = function() {
                        var t = new URLSearchParams(window.location.search || ""),
                            i = t.get("delete"),
                            n = t.get("module_id"),
                            a = t.get("nonce"),
                            o = t.get("module_type"),
                            r = powerforml10n && powerforml10n.popup ? powerforml10n.popup.delete_form : "Formular löschen",
                            s = powerforml10n && powerforml10n.popup ? powerforml10n.popup.are_you_sure_form : "Möchtest Du dieses Formular wirklich dauerhaft löschen?";
                        return i && n && a ? ("poll" === o && (r = powerforml10n && powerforml10n.popup ? powerforml10n.popup.delete_poll : "Umfrage löschen", s = powerforml10n && powerforml10n.popup ? powerforml10n.popup.are_you_sure_poll : "Möchtest Du diese Umfrage wirklich dauerhaft löschen?"), "quiz" === o && (r = powerforml10n && powerforml10n.popup ? powerforml10n.popup.delete_quiz : "Quiz löschen", s = powerforml10n && powerforml10n.popup ? powerforml10n.popup.are_you_sure_quiz : "Möchtest Du dieses Quiz wirklich dauerhaft löschen?"), { id: n, nonce: a, moduleType: o, title: r, content: s }) : !1
                    },
                    a = function(t) {
                        var i = window.Powerform || {},
                            a = i.l10n && i.l10n.popup ? i.l10n.popup : powerforml10n && powerforml10n.popup ? powerforml10n.popup : {},
                            o = t.data("modal") || "delete-module",
                            r = t.data("modal-title") || a.delete_form || "Löschen",
                            s = t.data("modal-content") || a.cannot_be_reverted || "Dieser Vorgang kann nicht rückgängig gemacht werden.",
                            l = t.data("nonce") || "",
                            p = t.data("form-id") || "",
                            d = window.location.pathname + window.location.search,
                            u = 'delete-poll-submission' === o ? '<div class="sui-box-body"><span class="sui-description">' + s + '</span></div><div class="sui-box-footer"><button type="button" class="sui-button sui-button-ghost powerform-popup-cancel" data-a11y-dialog-hide>' + (a.cancel || "Abbrechen") + '</button><button type="submit" class="delete-poll-submission sui-button sui-button-ghost sui-button-red popup-confirmation-confirm" data-nonce="' + l + '" data-id="' + p + '" data-action="delete_poll_submissions">' + (a.delete || "Löschen") + '</button></div>' : '<div class="sui-box-body"><span class="sui-description">' + s + '</span></div><div class="sui-box-footer"><button type="button" class="sui-button sui-button-ghost powerform-popup-cancel" data-a11y-dialog-hide>' + (a.cancel || "Abbrechen") + '</button><form method="post" class="delete-action"><input type="hidden" name="powerform_action" value="delete"><input type="hidden" name="id" value="' + p + '"><input type="hidden" name="powerformNonce" value="' + l + '"><input type="hidden" name="powerformEntryNonce" value="' + l + '"><input type="hidden" name="_wp_http_referer" value="' + d + '"><button type="submit" class="sui-button sui-button-ghost sui-button-red popup-confirmation-confirm"><i class="sui-icon-trash" aria-hidden="true"></i>' + (a.delete || "Löschen") + '</button></form></div>';
                        return i.Popup && "function" == typeof i.Popup.open ? i.Popup.open(function() { e(this).append(u) }, { title: r, has_custom_box: !0 }) : void(window.confirm(s) && n(t))
                    };
                e("body").on("change", ".sui-insert-variables select", function(t) {
                    var i = e(t.target),
                        n = i.data("textarea-id");
                    if (n) {
                        if (t.preventDefault(), e("#" + n).length > 0) {
                            var a = e("input#" + n + ",textarea#" + n),
                                o = a.val();
                            a.val(o + " " + i.val()), a.trigger("change", a.val())
                        }
                        return !1
                    }
                }), e(".copy-clipboard").on("click", function(t) { t.preventDefault(), copyToClipboard(e(this).data("shortcode")), Powerform.Notification.open("success", Powerform.l10n.options.shortcode_copied, 4e3) });
                var s = [],
                    l = !1,
                    p = function(t) {
                        if ("undefined" != typeof window.formintorjs) return void("function" == typeof t && t());
                        if ("function" == typeof t && s.push(t), l) return;
                        l = !0;
                        var i = e('script[src*="/build/admin/layout.js"]').first().attr("src");
                        if (!i) return l = !1, void(s = []);
                        var n = i.replace("/build/admin/layout.js", "/build/main.js"),
                            a = document.createElement("script");
                        a.src = n, a.async = !0, a.onload = function() {
                            l = !1;
                            var e = s.slice();
                            s = [], e.forEach(function(e) { "function" == typeof e && e() })
                        }, a.onerror = function() { l = !1, s = [] }, document.body.appendChild(a)
                    };
                e("body").on("click", ".psource-open-modal[data-modal], .psource-button-open-modal[data-modal], [data-modal]", function(t) {
                    var i = e(this),
                        n = i.data("modal");
                    if (!n || "delete-module" === n || "delete-poll-submission" === n || 0 === ("" + n).indexOf("preview_")) return;
                    if ("undefined" == typeof window.formintorjs) return t.preventDefault(), t.stopPropagation(), void p(function() {
                        setTimeout(function() {
                            if (i.length && e.contains(document, i.get(0))) return void i.trigger("click");
                            var t = e('[data-modal="' + n + '"]').filter(":visible").first();
                            t.length && t.trigger("click")
                        }, 0)
                    })
                }), e("body").on("click", ".psource-open-modal[data-modal=delete-module], .psource-open-modal[data-modal=delete-poll-submission], .psource-button-open-modal[data-modal=delete-module], .psource-button-open-modal[data-modal=delete-poll-submission], [data-modal=delete-module], [data-modal=delete-poll-submission]", function(t) { t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), a(e(this).closest(".psource-open-modal, .psource-button-open-modal, [data-modal]")) });
                var r = o();
                r && setTimeout(function() {
                    a(e("<span>").attr({ "data-modal": "delete-module", "data-form-id": r.id, "data-nonce": r.nonce, "data-modal-title": r.title, "data-modal-content": r.content }))
                }, 100), e("body").on("click", ".delete-poll-submission", function(t) {
                    var i = e(t.target),
                        n = { action: "powerform_delete_poll_submissions", id: i.data("id"), _ajax_nonce: i.data("nonce") };
                    i.addClass("sui-button-onload"), e.post({ url: Powerform.Data.ajaxUrl, type: "post", data: n }).done(function(e) { e.success && jQuery(".sui-poll-submission").addClass("sui-message").html("").html(e.data.html), Powerform.Popup.close(), _.isUndefined(e.data.notification) || _.isUndefined(e.data.notification.type) || _.isUndefined(e.data.notification.text) || _.isUndefined(e.data.notification.duration) || Powerform.Notification.open(e.data.notification.type, e.data.notification.text, e.data.notification.duration).done(function() {}) })
                })
            })
        }), e(window).on("load", function() { "undefined" == typeof Powerform || "powerform-entries" !== Powerform.Utils.get_url_param("page") || Powerform.Utils.get_url_param("form_type") || Powerform.Utils.get_url_param("form_id") || e(".show-submissions").trigger("click") }), e(window).on("pageshow", function(e) {
            (e.persisted || void 0 !== window.performance && "back_forward" === window.performance.getEntriesByType("navigation")[0].type) && window.location.reload()
        })
    }()
}(jQuery, document);
var powerform_render_captcha = function() {
    jQuery(".powerform-g-recaptcha").each(function() {
        var e = jQuery(this).data("size"),
            t = { sitekey: jQuery(this).data("sitekey"), theme: jQuery(this).data("theme"), size: e };
        if ("" !== t.sitekey) { window.grecaptcha.render(jQuery(this)[0], t) }
    })
};