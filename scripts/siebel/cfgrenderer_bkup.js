/*<ORACLECOPYRIGHT>
* Copyright (C) 2008-2023
* Oracle and Java are registered trademarks of Oracle and/or its affiliates.
* Other names may be trademarks of their respective owners.
* UNIX is a registered trademark of The Open Group.
*
* This software and related documentation are provided under a license agreement
* containing restrictions on use and disclosure and are protected by intellectual property laws.
* Except as expressly permitted in your license agreement or allowed by law, you may not use, copy,
* reproduce, translate, broadcast, modify, license, transmit, distribute, exhibit, perform, publish,
* or display any part, in any form, or by any means. Reverse engineering, disassembly,
* or decompilation of this software, unless required by law for interoperability, is prohibited.
*
* The information contained herein is subject to change without notice and is not warranted to be error-free.
* If you find any errors, please report them to us in writing.
*
* U.S. GOVERNMENT RIGHTS Programs, software, databases, and related documentation and technical data delivered to U.S.
* Government customers are "commercial computer software" or "commercial technical data" pursuant to the applicable
* Federal Acquisition Regulation and agency-specific supplemental regulations.
* As such, the use, duplication, disclosure, modification, and adaptation shall be subject to the restrictions and
* license terms set forth in the applicable Government contract, and, to the extent applicable by the terms of the
* Government contract, the additional rights set forth in FAR 52.227-19, Commercial Computer Software License
* (December 2007). Oracle America, Inc., 500 Oracle Parkway, Redwood City, CA 94065.
*
* This software or hardware is developed for general use in a variety of information management applications.
* It is not developed or intended for use in any inherently dangerous applications, including applications that
* may create a risk of personal injury. If you use this software or hardware in dangerous applications,
* then you shall be responsible to take all appropriate fail-safe, backup, redundancy,
* and other measures to ensure its safe use. Oracle Corporation and its affiliates disclaim any liability for any
* damages caused by use of this software or hardware in dangerous applications.
*
* This software or hardware and documentation may provide access to or information on content,
* products, and services from third parties. Oracle Corporation and its affiliates are not responsible for and
* expressly disclaim all warranties of any kind with respect to third-party content, products, and services.
* Oracle Corporation and its affiliates will not be responsible for any loss, costs,
* or damages incurred due to your access to or use of third-party content, products, or services.
</ORACLECOPYRIGHT>*/
/* 23.11.0.0SIA[2023_11] */
function jqSelector(e) {
    return e ? e.replace(/([ ~!@#$%^&*|+=;:",.<>()^$\`\'\-\{\}\[\]\\\/\?])/g, "\\$1") : e || null
}
typeof SiebelAppFacade.ConfiguratorRenderer == "undefined" && (SiebelJS.Namespace("SiebelAppFacade.ConfiguratorRenderer"), SiebelAppFacade.ConfiguratorRenderer = function() {
    function ConfiguratorRenderer(e) {
        SiebelAppFacade.ConfiguratorRenderer.superclass.constructor.call(this, e)
    }
	
	//Prabakaran S. 11/06/2021 - Added for hiding 'Restricted' tab conditionally
	var sRestrictedAccessEnabled = theApplication().GetProfileAttr("UserResponsibilities").indexOf("VF Function Access - Restricted Products") > -1;
	
    function CfgBindControlEvents() {}

    function CfgProcessInputRadioNoneAction(e, t) {
        var e = this.GetPM().Get("ControlPS"),
            n = null,
            r = null,
            i = null,
            s = null,
            o = !0,
            u = !0;
        n = getIdInfo(id), n.ATTR !== "undefined" && n.ATTR !== "" ? r = "Attribute" : n.PORT !== "undefined" && n.PORT !== "" && (r = "Port");
        if (r === "Port") {
            s = e.GetChildByType(n.GRPITEM + _underscore + "PORT" + _pipe + n.PORT).GetChildByType("Domain");
            if (s !== null)
                for (u = !0; i = s.EnumChildren(u); u = !1) {
                    var a = i.GetProperty("Path");
                    a !== "undefined" && a !== null && (o = !1)
                }
        }
        r === "Attribute" && (o = !1), o === !1 && processInput.call(this, id, str, t)
    }

    function addGenerics(e, t, n, r) {
        var i = "",
            s = CCFMiscUtil_CreatePropSet(),
            o;
        if (n === "" || typeof n == "undefined") return;
        s.DecodeFromString(e.GetProperty("FieldList"));
        var u = s.GetChildByType("RequireMoreChild");
        u !== null && (i = r === "Y" ? generateCfgImageMarkup.call(this, "Required") : generateCfgImageMarkup.call(this, "WhiteSpace"), typeof t != "undefined" && (t.children("[id^=GENERICS]").remove(), t.append($(generateCfgHTMLMarkup({
            type: "span",
            id: "GENERICS" + _pipe + n
        })).append(i))))
    }

    function addHtmlAttrib(e, t, n) {
        var r = 0,
            i = 0,
            s, o, u, a = e.GetChildByType(t);
        if (a !== null) {
            var f = a.GetChildByType("HtmlAttrib");
            if (f !== null) {
                i = f.GetPropertyCount();
                for (s = !0;
                    (o = f.EnumProperties(s)) !== null; s = !1) {
                    u = f.GetProperty(o);
                    switch (o) {
                        case "width":
                        case "height":
                            u += "px", n.css(o, u);
                            break;
                        case "text-align":
                            n.css(o, u);
                            break;
                        case "class":
                            n.hasClass(u) || n.addClass(u);
                            break;
                        default:
                            n.attr(o, u)
                    }
                }
            }
        }
    }

    function addPortItem(e, t) {
        var n = "",
            r = "",
            i = "",
            s = "",
            o = "",
            u = 0,
            a = "",
            f = "N",
            l = "",
            c, h, p, d, v = CCFMiscUtil_CreatePropSet(),
            m = t.GetProperty("FieldList");
        v.DecodeFromString(m), o = t.GetProperty("Product Id"), r = t.GetProperty("Path"), u = t.GetProperty("Quantity"), n = t.GetProperty("RequireMoreChild"), a = String(t.GetProperty("NoQtyCtrl")), f = t.GetProperty("DynDisable"), l = f === "Y" ? "readonly" : "", c = $("#" + jqSelector(e));
        if (c.length === 0) return;
        h = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row siebui-ecfg-domain-row",
            id: e + _underscore + "INTID" + _pipe + r
        })), h.appendTo(c), a !== "Y" && (s = SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
            type: consts.get("SWE_CTRL_TEXT"),
            className: f === "Y" ? "siebui-ecfg-editfield-dynDisabled" : "siebui-ecfg-editfield",
            attrs: " value='" + u + "' " + l
        }), createNewField.call(this, h, e, _underscore + "INTID" + _pipe, r, "", "Quantity", s, v));
        var g = e + _underscore + "INTID" + _pipe + r + _underscore + "FIELD" + _pipe + "Quantity";
        p = $("#" + jqSelector(g));
        if (p.length > 0) {
            var y = e + _underscore + "INTID" + _pipe + r + _underscore + "FIELD" + _pipe + "Quantity",
                b = "GRPITEM" + _pipe + e + _underscore + "INTID" + _pipe + r,
                w = p.find(":input");
            w.bind("change", {
                ctx: this,
                ctrlId: y,
                ctrlStr: b,
                ctrlType: "portitem"
            }, function(e) {
                setTimeout(function() {
                    processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                }, 0)
            }), this.InjectAutomationAttr(w, e + _underscore + "INTID" + _pipe + r)
        }
        p = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })), p.appendTo(h), addHtmlAttrib.call(this, v, "Name", p);
        if (t.GetProperty("CanDrillDown") === "Y") {
            d = $(generateCfgHTMLMarkup({
                type: "a"
            })).append(typeof t.GetProperty("Display Name") == "undefined" || t.GetProperty("Display Name") === "" ? t.GetProperty("Name") : t.GetProperty("Display Name")), d.appendTo(p);
            var E = "GRPITEM" + _pipe + e + _underscore + "PROD" + _pipe + o + _underscore + "INTID" + _pipe + r,
                S = "SetTopObj",
                x = "linkMethod";
            d.bind("click", {
                ctx: this,
                ctrlId: E,
                ctrlStr: S,
                ctrlType: x
            }, function(e) {
                setTimeout(function() {
                    processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                }, 0)
            }), this.InjectAutomationAttr(d, e + _underscore + "INTID" + _pipe + r)
        } else i = typeof t.GetProperty("Display Name") == "undefined" || t.GetProperty("Display Name") === "" ? t.GetProperty("Name") : t.GetProperty("Display Name"), p.html(i);
        addGenerics.call(this, t, p, r, n), displayFieldList.call(this, h, _underscore + "INTID" + _pipe, t.GetType(), v, t, "N")
    }

    function arrangeMsg() {
        var e = $("#CfgMsgSig,#CfgMsgEC,#CfgMsgCPVE,#CfgMsgProceedActions").find(".div-table-row");
        for (var t = 0; t < e.length; t++) e.eq(t).show()
    }

    function CfgMsgSignal(e) {
        if (e) {
            var t = e.split("||"),
                n = /'| /gi,
                r = (t[1] || t[0]).replace(n, "");
            return {
                msg: t[0].trim(),
                id: r
            }
        }
        return {}
    }

    function checkForceRefresh(e, t, n) {
        var r = null,
            i = !1,
            s = !1,
            o = null,
            u = 0,
            a = 0,
            f = "";
        f = e.GetProperty("ForceRefresh"), r = e.GetChildByType("Add"), r !== null && (u = r.GetChildCount()), u > 0 && t && (i = !0), o = e.GetChildByType("Delete"), o !== null && (a = o.GetChildCount()), a > 0 && n && (s = !0), (i || s) && f !== "undefined" && f !== null && f.toUpperCase() === "Y" && this.GetPM().ExecuteMethod("RefreshUI")
    }

    function clearPortItems(e) {
        var t = $("#" + jqSelector(e));
        t.length > 0 && t.empty()
    }

    function createCustomizeIcon(e, t, n, r, i, s, o) {
        var u, a, f, l, c;
        n === _underscore + "INTID" + _pipe ? a = t + n + i + _underscore + "FIELD" + _pipe + "Customize" : s !== "" && (a = t + n + s + _underscore + "FIELD" + _pipe + "Customize"), u = $("#" + jqSelector(a)), u.length === 0 ? (u = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col siebui-ecfg-customize-col",
            id: a
        })), u.appendTo(e)) : u.addClass("siebui-ecfg-customize-col"), u.empty(), addHtmlAttrib.call(this, o, "Customize", u), f = $(generateCfgHTMLMarkup({
            type: "a",
            className: "siebui-ecfg-icon-link"
        })).append(generateCfgIconMarkup.call(this, "siebui-icon-settings")), f.appendTo(u);
        var h = "GRPITEM" + _pipe + r + _underscore + "INTID" + _pipe + i + _underscore + "PROD" + _pipe + s;
        f.bind("click", {
            ctx: this,
            ctrlId: h,
            ctrlStr: "SetTopObj",
            ctrlType: "linkMethod"
        }, function(e) {
            setTimeout(function() {
                processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
            }, 0)
        }), this.InjectAutomationAttr(f, r)
    }

    function createEditFieldIcon(e, t, n, r, i, s, o, u, a) {
        var f, l, c, h, p;
        n === _underscore + "INTID" + _pipe ? l = t + n + i + _underscore + "FIELD" + _pipe + u : s !== "" && (l = t + n + s + _underscore + "FIELD" + _pipe + u), f = $("#" + jqSelector(l)), f.length === 0 ? (f = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-col siebui-ecfg-editfield",
                id: l
            })), f.appendTo(e)) : f.addClass("siebui-ecfg-editfield"),
            f.empty(), addHtmlAttrib.call(this, o, u, f), h = $(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                type: consts.get("SWE_CTRL_TEXT"),
                value: a,
                className: "siebui-ecfg-form-control siebui-ecfg-search-input"
            })), h.appendTo(f), c = $(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                type: consts.get("SWE_PST_BUTTON_CTRL"),
                className: "siebui-ecfg-search-btn"
            })), c.appendTo(f), h.bind("change", {
                ctx: this,
                ctrlId: r,
                ctrlFieldName: u,
                ctrlInputId: l,
                ctrlPath: i
            }, function(e) {
                setTimeout(function() {
                    setFieldValue.call(e.data.ctx, e.data.ctrlId, e.data.ctrlFieldName, e.data.ctrlInputId, e.data.ctrlPath)
                }, 0)
            }), c.bind("click", {
                ctx: this,
                ctrlId: r,
                ctrlFieldType: "CfgFieldList",
                ctrlFieldName: u,
                ctrlPath: i
            }, function(e) {
                setTimeout(function() {
                    editField.call(e.data.ctx, e.data.ctrlId, e.data.ctrlFieldType, e.data.ctrlFieldName, e.data.ctrlPath)
                }, 0)
            }), this.InjectAutomationAttr(h, r), this.InjectAutomationAttr(c, r)
    }

    function createExplanationIcon(e, t, n, r, i, s, o) {
        var u, a, f;
        n === _underscore + "INTID" + _pipe ? a = t + n + i + _underscore + "FIELD" + _pipe + "Explanation" : a = t + n + s + _underscore + "FIELD" + _pipe + "Explanation", u = $("#" + jqSelector(a)), u.length === 0 ? (u = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col siebui-ecfg-explanation-col",
            id: a
        })), u.appendTo(e)) : u.addClass("siebui-ecfg-explanation-col"), u.empty(), addHtmlAttrib.call(this, o, "Explanation", u), f = $(generateCfgHTMLMarkup({
            type: "a",
            className: "siebui-ecfg-icon-link"
        })).append(generateCfgIconMarkup.call(this, "siebui-icon-info-circle")), f.appendTo(u);
        var l = r,
            c = _underscore + "PROD" + _pipe + s + _underscore + "INTID" + _pipe + i;
        f.bind("click", {
            ctx: this,
            ctrlId: l,
            ctrlStr: c,
            ctrlType: "explanation"
        }, function(e) {
            setTimeout(function() {
                processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
            }, 0)
        }), this.InjectAutomationAttr(f, r)
    }

    function createRemoveIcon(e, t, n, r, i, s, o) {
        var u = generateCfgImageMarkup.call(this, "Delete"),
            a, f, l;
        n === _underscore + "INTID" + _pipe ? f = t + n + i + _underscore + "FIELD" + _pipe + "Remove" : s !== "" && (f = t + n + s + _underscore + "FIELD" + _pipe + "Remove"), a = $("#" + jqSelector(f)), a.length === 0 ? (a = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col siebui-ecfg-delete-col",
            id: f
        })), a.appendTo(e)) : a.addClass("siebui-ecfg-delete-col"), a.empty(), addHtmlAttrib.call(this, o, "Remove", a), l = $(generateCfgHTMLMarkup({
            type: "a",
            className: "siebui-ecfg-icon-link"
        })).append(generateCfgIconMarkup.call(this, "siebui-icon-delete")), l.appendTo(a);
        var c = t + _underscore + "INTID" + _pipe + i + _underscore + "FIELD" + _pipe + "Remove",
            h = "GRPITEM" + _pipe + t + _underscore + "INTID" + _pipe + i;
        l.bind("click", {
            ctx: this,
            ctrlId: c,
            ctrlStr: h,
            ctrlType: "Remove"
        }, function(e) {
            setTimeout(function() {
                processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
            }, 0)
        }), this.InjectAutomationAttr(l, r)
    }

    function createNewField(e, t, n, r, i, s, o, u) {
        var a = null,
            f = "";
        n === _underscore + "INTID" + _pipe ? f = t + n + r + _underscore + "FIELD" + _pipe + s : i !== "" && (f = t + n + i + _underscore + "FIELD" + _pipe + s), a = $("#" + jqSelector(f)), a.length === 0 ? (a = $(generateCfgHTMLMarkup({
            type: "div",
            className: !!o && o.toLowerCase().match(/input/) ? "div-table-col siebui-ecfg-editfield" : "div-table-col",
            id: f
        })), a.appendTo(e)) : !!o && o.toLowerCase().match(/input/) && a.addClass("siebui-ecfg-editfield"), a.html(o), u !== "" && typeof u != "undefined" && u !== null && addHtmlAttrib.call(this, u, s, a)
    }

    function deleteFieldList(e, t) {
        var n = generateCfgImageMarkup.call(this, "WhiteSpace"),
            r = e.children(".div-table-col");
        for (var i = r.length - 1; i >= 0; i--) {
            var s = getIdInfo(r[i].id),
                o = t.GetChildByType(s.FIELD);
            if (o !== null) {
                var u = o.GetProperty("NeedRefresh"),
                    a = o.GetProperty("Default");
                if (u === "N" || u === "n" || a === "Y" || a === "y") continue;
                r.eq(i).html(n)
            }
        }
    }

    function deletePortItem(e, t) {
        var n = $("#" + jqSelector(e)),
            r = $("#" + jqSelector(t));
        n.length > 0 && r.remove()
    }

    function displayFieldHeader(e, t) {
        var n, r, i, s;
        for (var o = 0; o < t.GetChildCount(); o++) n = t.GetChild(o), r = n.GetProperty("CfgUIControl"), i = n.GetProperty("CfgFieldName"), typeof r != "undefined" && r !== "" && createNewField.call(this, e, "", "", "", "", i, generateCfgOuterHTML($(generateCfgHTMLMarkup({
            type: "span",
            className: "siebui-ecfg-header siebui-ecfg-domain-header"
        })).append(r)), t)
    }

    function displayFieldList(e, t, n, r, i, s) {
        var o = generateCfgImageMarkup.call(this, "WhiteSpace"),
            u = null,
            a = "",
            f = "",
            l = "",
            c = "",
            h = "",
            p = "",
            d = "",
            v = "",
            m = "",
            g = "",
            y = "",
            b;
        deleteFieldList.call(this, e, r);
        for (b = !0; u = r.EnumChildren(b); b = !1) {
            y = a = f = l = p = c = d = v = m = "", h = "", a = u.GetProperty("CfgFieldName"), f = u.GetProperty("NeedRefresh"), l = u.GetProperty("Default"), h = u.GetProperty("PickApplet");
            if (typeof l != "undefined" && l.toUpperCase() === "Y") continue;
            if (typeof f != "undefined" && f.toUpperCase() === "N" && s === !0) continue;
            if (i === null) {
                createNewField.call(this, e, "", "", "", "", a, o, r);
                continue
            }
            y = i.GetProperty(u.GetType());
            if (typeof y == "undefined" || y === "") y = o;
            d = i.GetProperty("Port Item Id"), v = i.GetProperty("Selected"), m = i.GetProperty("Parent Path"), c = i.GetProperty("Path"), p = i.GetProperty("Product Id"), t === _underscore + "INTID" + _pipe ? g = m + _underscore + "PORTITEM" + _pipe + d : g = m + _underscore + "PORT" + _pipe + d, v === "Y" || f === "N" ? a === "Customize" && i.GetProperty("CanDrillDown") === "Y" ? createCustomizeIcon.call(this, e, g, t, n, c, p, r) : a === "Explanation" ? createExplanationIcon.call(this, e, g, t, n, c, p, r) : a === "Remove" ? createRemoveIcon.call(this, e, g, t, n, c, p, r) : h !== "" && typeof h != "undefined" && h !== null ? createEditFieldIcon.call(this, e, g, t, n, c, p, r, a, y) : createNewField.call(this, e, g, t, c, p, a, y, r) : createNewField.call(this, e, g, t, c, p, a, a === "Explanation" ? "" : o, r)
        }
    }

    function displayQtyInCombo(e, t, n, r, i) {
        var s = generateCfgImageMarkup.call(this, "WhiteSpace"),
            o = "",
            u = "",
            a = "",
            f = "",
            l = "",
            c = "",
            h, p, d, v;
        if (n.GetChildByType("Quantity") !== null)
            if (r === null) h = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-col"
            })).append(s), h.appendTo(e), addHtmlAttrib.call(this, n, "Quantity", h);
            else {
                o = r.GetProperty("Quantity"), u = r.GetProperty("Path"), f = r.GetProperty("Product Id"), portId = r.GetProperty("Port Item Id"), c = r.GetProperty("Parent Path"), l = c + _underscore + "PORT" + _pipe + portId + _underscore + "COMBOBOX" + _pipe + f, p = l + _underscore + "FIELD" + _pipe + "Quantity", h = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-col",
                    id: p
                })), h.appendTo(e), addHtmlAttrib.call(this, n, "Quantity", h), d = $(SiebelAppFacade
                    .HTMLTemplateManager.GenerateMarkup({
                        type: consts.get("SWE_CTRL_TEXT"),
                        className: i === "Y" ? "siebui-ecfg-editfield-dynDisabled" : "siebui-ecfg-editfield",
                        attrs: " value='" + o + "'" + (i === "Y" ? " readonly" : "")
                    })), d.appendTo(h);
                var m = p,
                    g = "GRPITEM" + _pipe + t + _underscore + "INTID" + _pipe + u;
                d.bind("change", {
                    ctx: this,
                    ctrlId: m,
                    ctrlStr: g,
                    ctrlType: "comboportitem"
                }, function(e) {
                    setTimeout(function() {
                        processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                    }, 0)
                }), this.InjectAutomationAttr(d, t)
            }
    }

    function editField(e, t, n, r) {
        this.GetPM().ExecuteMethod("EditField", e, t, n, r)
    }

    function processInput(e, t, n) {
        var r = this.GetPM(),
            i = r.Get("ControlPS");
        SiebelApp.S_App.uiStatus.Busy({});
        var s = null,
            o = "",
            u = null,
            a = "",
            f = null,
            l = null,
            c = "",
            h = "",
            p = null,
            d = "",
            v = "",
            m = "",
            g = null;
        switch (n) {
            case "checkbox":
                s = getIdInfo(e), a = s.PROD, v = s.GRPITEM + _underscore + "PORT" + _pipe + s.PORT, d = v + _underscore + "PROD" + _pipe + a + _underscore + "FIELD" + _pipe + "Quantity", g = $("#" + jqSelector(d)), g.find(":input").prop("checked") === !0 ? (this.GetPM().ExecuteMethod("AddItemMin", "Y", v, a, 1), r.Get("DeferUpdate") && g.find(":input").attr("aria-checked", !0)) : (this.GetPM().ExecuteMethod("RemoveItem", v, a), r.Get("DeferUpdate") && g.find(":input").attr("aria-checked", !1)), utils.IsTrue(SiebelApp.S_App.IsAutoOn()) === !0 && g.find(":input").attr("aria-checked", g.find(":input").prop("checked"));
                break;
            case "ComboAdd":
                g = $("#" + jqSelector(e)), h = g.val();
                if (h === "" || typeof h == "undefined" || h === null) h = 0;
                h = parseInt(h), g.val(""), g = $("#" + jqSelector(t)), s = getIdInfo(g.find(">option:selected").attr("cfg_value")), v = s.GRPITEM + _underscore + "PORT" + _pipe + s.PORT, g = $("#" + jqSelector(v + _underscore + "PORTDOMAIN" + _pipe + "none")), g.length > 0 && g.prop("selected", !0), h > 0 && (this.GetPM().ExecuteMethod("AddItemMin", "Y", v, s.PROD, h), this.GetPM().Get("DeferUpdate") && this.GetPM().ExecuteMethod("ProcessInteractPropSet"));
                break;
            case "ComboAddOne":
                g = $("#" + jqSelector(t)), s = getIdInfo(g.find(">option:selected").attr("cfg_value")), v = s.GRPITEM + _underscore + "PORT" + _pipe + s.PORT, g = $("#" + jqSelector(v + _underscore + "PORTDOMAIN" + _pipe + "none")), g.length > 0 && g.prop("selected", !0), this.GetPM().ExecuteMethod("AddItem", "Y", v, s.PROD, 1);
                break;
            case "comboportitem":
                g = $("#" + jqSelector(e)), s = getIdInfo(t), h = g.find(":input").val();
                if (h === "" || typeof h == "undefined" || h === null) h = 0;
                this.GetPM().ExecuteMethod("SetItemQuantity", s.GRPITEM + _underscore + "PORT" + _pipe + s.PORT, s.INTID, h);
                break;
            case "explanation":
                s = getIdInfo(t), this.GetPM().ExecuteMethod("GetExplanation", e, s.PROD, s.INTID);
                break;
            case "linkMethod":
                if (t.toLowerCase().match(/doneconfig/)) {
                    var y = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CXP_UI_INCOMPLETE_CONFIG"),
                        b = r.Get("TopRequireMoreChild"),
                        w = r.Get("MissingReqAttrArray");
                    if (b === "Y" || w.length > 0) {
                        if (w.length > 0) {
                            y += "\n" + SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CXP_UI_WARNING_FILL_REQUIRED_ATTRIBUTES");
                            for (var E = 0; E < w.length; E++) y += "\n" + w[E]
                        }
                        if (!confirm(y)) return r.SetProperty("RequestLock", !1), SiebelApp.S_App.uiStatus.Free(), !1;
                        r.SetProperty("topRequireMoreChild", "")
                    }
                }
                if (t.toLowerCase().match(/prevview/)) {
                    var S = document.getElementById("_sweclient");
                    this.GetPM().Get("IsResponsive") && (S.className = "")
                }
                this.GetPM().ExecuteMethod("CfgInvokeMethod", t, e);
                break;
            case "portitem":
                g = $("#" + jqSelector(e)), s = getIdInfo(t), h = g.find(":input").val();
                if (h === "" || typeof h == "undefined" || h === null) h = 0;
                this.GetPM().ExecuteMethod("SetItemQuantity", s.GRPITEM + _underscore + "PORTITEM" + _pipe + s.PORTITEM + _underscore + "INTID" + _pipe + s.INTID, s.INTID, h);
                break;
            case "radio":
                s = getIdInfo(e), s.ATTR !== "undefined" && s.ATTR !== "" ? c = "Attribute" : s.PORT !== "undefined" && s.PORT !== "" && (c = "Port"), c === "Port" ? (d = s.GRPITEM + _underscore + "PORT" + _pipe + s.PORT, this.GetPM().ExecuteMethod("AddItem", "N", d, s.PROD, 1)) : c === "Attribute" && (d = s.GRPITEM + _underscore + "ATTR" + _pipe + s.ATTR, this.GetPM().ExecuteMethod("SetAttribute", d, s.ATTVAL, s.ATTTYPE)), r.Get("DeferUpdate") && (elem = $("#" + jqSelector(d)), elem.find(":input:not(:checked)").removeAttr("aria-checked"), elem.find(":input:checked").attr("aria-checked", !0));
                break;
            case "Remove":
                s = getIdInfo(t), this.GetPM().ExecuteMethod("SetItemQuantity", s.GRPITEM + _underscore + "PORTITEM" + _pipe + s.PORTITEM + _underscore + "INTID" + _pipe + s.INTID, s.INTID, 0);
                break;
            case "select":
                g = $("#" + jqSelector(e)), s = getIdInfo(g.find(">option:selected").attr("cfg_value")), s.ATTTYPE !== null && s.ATTTYPE !== "" ? (m = s.ATTVAL, this.GetPM().ExecuteMethod("SetAttribute", s.GRPITEM + _underscore + "ATTR" + _pipe + s.ATTR, m, s.ATTTYPE)) : this.GetPM().ExecuteMethod("AddItem", "N", s.GRPITEM + _underscore + "PORT" + _pipe + s.PORT, s.PROD, 1);
                break;
            case "text":
                g = $("#" + jqSelector(e)), s = getIdInfo(e), s.ATTR !== "undefined" && s.ATTR !== "" ? c = "Attribute" : s.PORT !== "undefined" && s.PORT !== "" && (c = "Port");
                if (c === "Attribute") m = g.val(), this.GetPM().ExecuteMethod("SetAttribute", s.GRPITEM + _underscore + "ATTR" + _pipe + s.ATTR, m, s.ATTTYPE);
                else if (c === "Port") {
                    a = s.PROD, v = s.GRPITEM + _underscore + "PORT" + _pipe + s.PORT, p = i.GetChildByType(v), u = p.GetChildByType("Domain"), f = u.GetChildByType(a), o = f.GetProperty("Path"), d = v + _underscore + "PROD" + _pipe + a + _underscore + "FIELD" + _pipe + "Quantity", g = $("#" + jqSelector(d)), h = g.find(":input").val();
                    if (h === "" || typeof h == "undefined" || h === null) h = 0;
                    o !== "" && typeof o != "undefined" && o !== null ? this.GetPM().ExecuteMethod("SetItemQuantity", v, o, h) : this.GetPM().ExecuteMethod("AddItem", "Y", v, a, h)
                }
        }
        this.GetPM().Get("CalculateDynamicShowHide") === !0 && (this.GetPM().SetProperty("CalculateDynamicShowHide", !1), this.GetPM().ExecuteMethod("RefreshUI")), SiebelApp.S_App.uiStatus.Free()
    }

    function processInputRadioNoneAction(e, t, n) {
        var r = this.GetPM().Get("ControlPS"),
            i = null,
            s = null,
            o = null,
            u = null,
            a = !0;
        i = getIdInfo(e), i.ATTR !== "undefined" && i.ATTR !== "" ? s = "Attribute" : i.PORT !== "undefined" && i.PORT !== "" && (s = "Port");
        if (s === "Port") {
            u = r.GetChildByType(i.GRPITEM + _underscore + "PORT" + _pipe + i.PORT).GetChildByType("Domain");
            if (u !== null)
                for (var f = 0; f < u.GetChildCount(); f++) {
                    o = u.GetChild(f);
                    var l = o.GetProperty("Path");
                    l !== "undefined" && l !== null && (a = !1)
                }
        }
        s === "Attribute" && (a = !1), a === !1 && processInput.call(this, e, t, n)
    }

    function setExcluded(e, t, n) {
        var r = null,
            i = "",
            s = null,
            o = null,
            u = !0;
        s = e.GetChildByType("Domain");
        if (s !== null) {
            nDomainLen =
                s.GetChildCount();
            for (u = !0; o = s.EnumChildren(u); u = !1) o.GetProperty("Product Id") === t && (i = n + _underscore + "PORTDOMAIN" + _pipe + t, r = $("#" + jqSelector(i)), r.length > 0 && o.GetProperty("CxEnabled") === "N" && r.attr("class", "eCfgOptionExcluded"))
        }
    }

    function showCheckBox(e) {
        showDomainAndChildrenControl.call(this, e, "checkbox")
    }

    function showCheckBoxGrid(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e);
        n.SetProperty("GridLayout", "Y"), showDomainAndChildrenControl.call(this, e, "checkbox")
    }

    function showCombo(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e),
            r = "",
            i = "",
            s = "",
            o = 0,
            u = "select_" + e,
            a = -1,
            f = "",
            l = "",
            c = "",
            h = null,
            p = null,
            d, v, m, g, y, b, w = e + _underscore + "DOMAINSELECT",
            E = n.GetProperty("Object Type"),
            S = CCFMiscUtil_CreatePropSet();
        S.DecodeFromString(n.GetProperty("FieldList"));
        var x = $("#SPAN_" + jqSelector(e));
        if (x.length === 0) return !1;
        var T = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table siebui-ecfg-table-collapse"
        }));
        T.appendTo(x);
        if (E === "Port") {
            var N = e + _underscore + "PORT" + "Domain" + _pipe + "none",
                C = n.GetChildByType("Domain"),
                k = C.GetProperty("Port Item Id"),
                L = C.GetProperty("DynDisable"),
                A = "";
            o = C.GetChildCount();
            var O = C.GetProperty("ChangeImage");
            typeof O == "undefined" ? O = "N" : O = O.toString() === "" ? "N" : O;
            if (O === "Y") {
                var M = C.GetProperty("Parent Path"),
                    _ = C.GetProperty("Port Item Id"),
                    D = "img_" + M + "_" + _,
                    P = C.GetProperty("DynNewImage"),
                    H = $("#" + jqSelector(D));
                H.length > 0 && H.attr("src", P)
            }
            A = L === "Y" ? "disabled" : "", d = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-row siebui-ecfg-th siebui-ecfg-domain-header"
            })), d.appendTo(T), displayFieldHeader.call(this, d, S), v = e + _underscore + "COMBOBOX", d = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-row siebui-ecfg-domain-row",
                id: v
            })), d.appendTo(T), colId = e + _underscore + "COMBOBOX_TD", m = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-col siebui-ecfg-editfield",
                id: colId
            })), m.appendTo(d), addHtmlAttrib.call(this, S, "Name", m);
            var B = {
                id: w,
                attrs: A,
                options: []
            };
            B.options.push({
                id: N,
                value: "GRPITEM" + _pipe + e + _underscore + "PROD" + _pipe + "none",
                className: "eCfgOptionAvailable"
            });
            for (var j = 0; j < o; j++) {
                var F = "",
                    I = C.GetChild(j),
                    k = "",
                    q = "",
                    R = "";
                F = I.GetProperty("Excluded"), i = I.GetProperty("CxObjName"), R = I.GetProperty("Selected"), s = I.GetProperty("CxEnabled"), q = I.GetProperty("Product Id"), k = I.GetProperty("Port Item Id"), R === "Y" ? (f = " selected", a = j, r = "eCfgOptionAvailable") : (f = "", r = s === "Y" ? "eCfgOptionAvailable" : "eCfgOptionExcluded");
                if (F !== "Y" || s === "Y" || R === "Y") c = e + _underscore + "PORTDOMAIN" + _pipe + q, b = c, B.options.push({
                    id: b,
                    displayValue: i,
                    value: "GRPITEM" + _pipe + e + _underscore + "PROD" + _pipe + q,
                    className: r,
                    attrs: f
                })
            }
            g = $(generateCfgSelectHTMLMarkup(B)), g.appendTo(m);
            if (a !== -1) {
                I = C.GetChild(a);
                var U = I.GetProperty("RequireMoreChild"),
                    z = I.GetProperty("Path");
                addGenerics.call(this, n, m, z, U), displayQtyInCombo.call(this, d, n.GetType(), S, I, L), displayFieldList.call(this, d, _underscore + "PROD" + _pipe, n.GetType(), S, I, "N")
            } else addGenerics.call(this, n, m, z, "N"), displayQtyInCombo.call(this, d, n.GetType(), S, null, L), displayFieldList.call(this, d, _underscore + "PROD" + _pipe, n.GetType(), S, null, "N");
            g.bind("change", {
                ctx: this,
                ctrlId: w,
                ctrlType: "select"
            }, function(e) {
                setTimeout(function() {
                    processInput.call(e.data.ctx, e.data.ctrlId, "", e.data.ctrlType)
                }, 0)
            }), this.InjectAutomationAttr(g, e)
        } else if (E === "Attribute") {
            var A = "",
                c = "",
                W = n.GetProperty("AttType"),
                X = n.GetProperty("XA Id"),
                V = n.GetProperty("AttValue"),
                J = n.GetProperty("CxReadOnly"),
                K = n.GetChildByType("Domain"),
                L = n.GetProperty("DynDisable");
            o = K.GetChildCount();
            var O = K.GetProperty("ChangeImage");
            if (O === "Y") {
                var M = K.GetProperty("Parent Path"),
                    Q = K.GetProperty("AttID"),
                    D = "img_" + M + "_" + Q,
                    P = K.GetProperty("DynNewImage"),
                    H = $("#" + jqSelector(D));
                H.length > 0 && H.attr("src", P)
            }
            v = e + _underscore + "COMBOBOX", d = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-row",
                id: v
            })), d.appendTo(T), colId = e + _underscore + "COMBOBOX_TD", m = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-row",
                id: colId
            })), m.appendTo(d), A = J === "Y" || L === "Y" ? "disabled" : "";
            var B = {
                id: w,
                attrs: A,
                options: []
            };
            for (var j = 0; j < o; j++) {
                var F = "",
                    G = K.GetChild(j),
                    Y = G.GetProperty("AttValueLIC");
                i = G.GetProperty("AttValue"), F = G.GetProperty("Excluded"), W !== "Number" && W !== "Integer" && (Y = i), f = i === V ? " selected" : "", s = G.GetProperty("CxEnabled"), r = s === "Y" ? "eCfgOptionAvailable" : "eCfgOptionExcluded";
                if (F !== "Y" || s === "Y") {
                    var Z = i;
                    Z.length > 0 && (Z = Z.replace(/\"/g, "&quot;").replace(/\'/g, "&#039;")), c = e + _underscore + "ATTRDOMAIN" + _pipe + Z, b = c, B.options.push({
                        id: b,
                        displayValue: HtmlEncode(i),
                        value: "GRPITEM" + _pipe + e + _underscore + "ATTTYPE" + _pipe + W + _underscore + "ATTVAL" + _pipe + Z,
                        className: r,
                        attrs: f
                    })
                }
            }
            g = $(generateCfgSelectHTMLMarkup(B)), g.appendTo(m), g.bind("change", {
                ctx: this,
                ctrlId: w,
                ctrlType: "select"
            }, function(e) {
                setTimeout(function() {
                    processInput.call(e.data.ctx, e.data.ctrlId, "", e.data.ctrlType)
                }, 0)
            }), this.InjectAutomationAttr(g, e)
        }
        var et = x.parent().find("[id^=GENERICS]");
        et.length > 0 && et.appendTo(m)
    }

    function showConflict() {
        var e = this.GetPM(),
            t, n = "",
            r, i = "",
            s, o = 0,
            u = "",
            a = null,
            f = null,
            l, c, h, p, d;
        a = e.Get("ShowConflict"), n = a.GetProperty("ClearConflict"), r = a.GetChildByType("TagErrorStatus");
        if (r !== null) {
            e.SetProperty("RequestQueue", new Array), e.SetProperty("RequestQueueIndex", 0), i = r.GetProperty("Conflict Type"), o = r.GetChildCount(), d = $("#ConflictPage"), d.length > 0 && d.show(), l = $("#SPAN_CfgErrorMessageSpan"), l.empty(), c = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table",
                id: "CfgErrorMessageSpan"
            })), c.appendTo(l);
            for (var v = 0; v < o; v++) {
                f = r.GetChild(v), h = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-row listRowOff"
                })), h.appendTo(c), p = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-col row"
                })).append(generateCfgImageMarkup.call(this, "Conflict")), p.appendTo(h);
                var m = utils.IsTrue(SiebelApp.S_App.IsAutoOn()) ? "un='CfgConflictMessage" + v + "'" + " rn='CfgConflictMessage" + v + "'" + " ot='Text'" : "";
                p = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-col row",
                    attrs: m
                })).append(f.GetProperty("Message")), p.appendTo(h)
            }
            d = $("#MainPage"), d.length > 0 && d.hide(), d = $("#TopLevelButtons1"), d.length > 0 && d.hide(), d = $("#TopLevelButtons2"), d.length > 0 && d.hide()
        } else n === "Y" && (d = $("#ConflictPage"), d.length > 0 && d.hide(), d = $("#MainPage"), d.length > 0 && d.show(), d = $("#TopLevelButtons1"), d.length > 0 && d.show(), d = $("#TopLevelButtons2"), d.length > 0 && d.show());
        switch (i) {
            case "Conflict":
                t = $("#RemoveFailedRequests,#UndoLast"), t.show(), t = $("#ClearTheStatusUndo,#ClearTheStatus"), t.hide();
                break;
            case "Undo":
                t = $("#ClearTheStatusUndo"), t.show(), t = $("#RemoveFailedRequests,#UndoLast,#ClearTheStatus"), t.hide();
                break;
            case "Info":
                t = $("#ClearTheStatus"), t.show(), t = $("#RemoveFailedRequests,#UndoLast,#ClearTheStatusUndo"), t.hide()
        }
    }

    function showDomainAndChildrenControl(e, t) {
        var n = this.GetPM().Get("ControlPS"),
            r = generateCfgImageMarkup.call(this, "WhiteSpace"),
            i, s, o, u = "Y",
            a = "",
            f = _underscore + "PROD" + _pipe,
            l, c, h, p, d, v = n.GetChildByType(e),
            m = v.GetChildByType("Domain"),
            g = CCFMiscUtil_CreatePropSet(),
            y = v.GetProperty("FieldList");
        i = $("#SPAN_" + jqSelector(e));
        if (i.length === 0) return !1;
        l = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table siebui-ecfg-table-collapse",
            id: e
        })), l.appendTo(i);
        var b, w = null,
            E = 0,
            S = String(v.GetProperty("GridLayout")),
            x, T, N = null,
            C = null,
            k = 1,
            L = m.GetProperty("DynDisable"),
            A = m.GetProperty("ChangeImage"),
            O = m.GetProperty("Parent Path"),
            M = m.GetProperty("Port Item Id");
        g.DecodeFromString(y), d = m.GetChildCount();
        if (String(A) === "Y") {
            var _ = "img_" + O + "_" + M,
                D = m.GetProperty("DynNewImage"),
                P = $("#" + jqSelector(_));
            P.length > 0 && P.attr("src", D)
        }
        if (S === "Y") {
            var H = m.GetProperty(".CtrlNumofCol");
            k = parseInt(H);
            if (isNaN(k) || k < 1) k = 1
        } else s = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row siebui-ecfg-th siebui-ecfg-domain-header"
        })), s.appendTo(l), t !== "quantity" && (o = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })).append(r), o.appendTo(s)), displayFieldHeader.call(this, s, g);
        if (String(t) === "radio") {
            a = m.GetProperty("Port Item Id");
            var B = e + f + "none";
            S === "Y" ? (T = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-row"
            })), T.appendTo(l), x = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-col"
            })), x.appendTo(T), b = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table"
            })), b.appendTo(x), E++, s = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-row",
                id: B
            })), s.appendTo(b)) : (s = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-row siebui-ecfg-domain-row",
                id: B
            })), s.appendTo(l))
        }
        for (var j = 0; j < d; j++) {
            var F = "",
                I = "",
                q = "",
                R = "",
                U = "",
                z = "",
                W = "",
                X = "",
                V = "",
                J = "",
                K = "",
                Q = "",
                G = "",
                Y = "",
                Z = "",
                et = "",
                tt, nt, rt, it, st, i;
            t === "checkbox" || t === "quantity" ? R = "eCfgSpanAvailable" : t === "radio" && (R = "eCfgRadioAvailable"), portDomainPropSet = m.GetChild(j), W = portDomainPropSet.GetProperty("Excluded"), Q = portDomainPropSet.GetProperty("Product Id"), a = portDomainPropSet.GetProperty("Port Item Id"), q = portDomainPropSet.GetProperty("CxObjName"), U = portDomainPropSet.GetProperty("CxEnabled"), G = portDomainPropSet.GetProperty("Selected"), J = portDomainPropSet.GetProperty("Quantity"), z = portDomainPropSet.GetProperty("RequireMoreChild"), et = portDomainPropSet.GetProperty("DynDisable"), L === "Y" || et === "Y" ? tt = "disabled" : tt = "", J = isNaN(J) === !0 ? "" : J, K = portDomainPropSet.GetProperty("Path"), Y = e + _underscore + "PROD" + _pipe + Q, S === "Y" ? (E % k === 0 && (T = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-row"
            })), T.appendTo(l)), x = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-col"
            })), x.appendTo(T), b = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table"
            })), b.appendTo(x), E++, s = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-row",
                id: Y
            })), s.appendTo(b)) : (s = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-row siebui-ecfg-domain-row",
                id: Y
            })), s.appendTo(l)), W === "Y" && U === "N" && G !== "Y" && s.hide(), G === "Y" ? t === "checkbox" || t === "quantity" ? R = "eCfgSpanSelected" : t === "radio" && (R = "eCfgRadioSelected", u = "N") : U === "N" && (t === "checkbox" || t === "quantity" ? R = "eCfgSpanExcluded" : t === "radio" && (R = "eCfgRadioExcluded")), I = Y + _underscore + "FIELD" + _pipe + "Quantity", o = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-col siebui-ecfg-editfield siebui-ecfg-item-name-col siebui-ecfg-cell-1",
                id: I
            })), o.appendTo(s);
            if (t === "quantity") {
                addHtmlAttrib.call(this, g, "Quantity", o), o.html(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                    type: consts.get("SWE_CTRL_TEXT"),
                    id: I,
                    className: L === "Y" || et === "Y" ? "siebui-ecfg-editfield-dynDisabled" : "siebui-ecfg-editfield",
                    attrs: " value='" + J + "'" + (L === "Y" || et === "Y" ? " readonly" : " ")
                }));
                var ot = "GRPITEM" + _pipe + e + _underscore + "PROD" + _pipe + Q;
                it = o.find(":input"), it.bind("change", {
                    ctx: this,
                    ctrlId: ot,
                    ctrlStr: "",
                    ctrlType: "text"
                }, function(e) {
                    setTimeout(function() {
                        processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                    }, 0)
                }), this.InjectAutomationAttr(it, e)
            } else if (t === "checkbox" || t === "radio") rt = "GRPITEM" + _pipe + e + _underscore + "Domain", X = SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                type: t === "checkbox" ? consts.get("SWE_CTRL_CHECKBOX") : consts.get("SWE_CTRL_RADIO"),
                value: q,
                attrs: " name='" + rt + "' " + tt + (G === "Y" ? " checked" : "")
            }), it = $(X), it.appendTo(o), t === "checkbox" && (G ? it.attr("aria-checked", !0) : it.attr("aria-checked", !1)), it.bind("click", {
                ctx: this,
                ctrlId: "GRPITEM" + _pipe + e + _underscore + "PROD" + _pipe + Q,
                ctrlStr: "",
                ctrlType: t
            }, function(e) {
                setTimeout(function() {
                    processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                }, 0)
            }), this.InjectAutomationAttr(it, e);
            o = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-col siebui-ecfg-cell-2"
            })), o.appendTo(s), addHtmlAttrib.call(this, g, "Name", o), Z = e + _underscore + "PORTDOMAIN" + _pipe + Q, st = $(generateCfgHTMLMarkup({
                type: "div",
                className: R,
                id: Z
            }));
            if (G === "Y" && portDomainPropSet.GetProperty("CanDrillDown") === "Y") {
                i = $(generateCfgHTMLMarkup({
                    type: "a",
                    id: Z + _underscore + "CXLINK"
                })).append(q), i.appendTo(st);
                var ot = "GRPITEM" + _pipe + e + _underscore + "PROD" + _pipe + Q,
                    ut = "SetTopObj",
                    at = "linkMethod";
                i.bind("click", {
                    ctx: this,
                    ctrlId: ot,
                    ctrlStr: ut,
                    ctrlType: at
                }, function(e) {
                    setTimeout(function() {
                        processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                    }, 0)
                }), this.InjectAutomationAttr(i, e)
            } else st.html(q);
            st.appendTo(o), addGenerics.call(this, v, st, K, z), displayFieldList.call(this, s, f, v.GetType(), g, portDomainPropSet, !1)
        }
        tt = "";
        if (t === "radio") {
            a = m.GetProperty("Port Item Id"), Y = e + f + "none", s = $("#" +
                jqSelector(Y));
            if (s.length > 0) {
                I = Y + _underscore + "FIELD" + _pipe + "Quantity", o = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-col siebui-ecfg-item-name-col siebui-ecfg-cell-1",
                    id: I
                })), o.appendTo(s), rt = "GRPITEM" + _pipe + e + _underscore + "Domain";
                var ft = rt + _underscore + "None" + _underscore + "Radio";
                X = SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                    type: consts.get("SWE_CTRL_RADIO"),
                    value: "None",
                    attrs: " name='" + rt + "' " + tt + (u === "Y" ? " checked" : "") + " id='" + ft + "'"
                });
                var lt = "<label for='" + ft + "' role='button' class='cfgRadioLabel'>None</label>";
                it = $(X), it.appendTo(o);
                var ct = $(lt),
                    ot = "GRPITEM" + _pipe + e + _underscore + "PROD" + _pipe + "none";
                it.bind("click", {
                    ctx: this,
                    ctrlId: ot,
                    ctrlType: t
                }, function(e) {
                    setTimeout(function() {
                        processInputRadioNoneAction.call(e.data.ctx, e.data.ctrlId, "", e.data.ctrlType)
                    }, 0)
                }), this.InjectAutomationAttr(it, e), o = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-col siebui-ecfg-cell-2"
                })), ct.appendTo(o), o.appendTo(s), addHtmlAttrib.call(this, g, "Name", o);
                for (var ht = 0; ht < 5; ht++) $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-col"
                })).appendTo(s)
            }
        }
    }

    function showDomainPrice(e) {
        var t = new Array;
        CCFMiscUtil_StringToArray(e, t);
        var n = t[1].toString(),
            r = n.length;
        while (r < 15) n += ".", r += 1;
        var i = n + t[0];
        return i
    }

    function showLink(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e),
            r = "",
            i = "GRPITEM" + _pipe + e,
            s = i + _underscore + "LINK",
            o = $("#" + jqSelector(i)),
            u;
			
		//Prabakaran S. 11/06/2021 - Added for hiding 'Restricted' tab conditionally
		var sTabName = n.GetProperty("Value");
        if (n !== null && o.length > 0  && ((sTabName != 'Restricted') || (sTabName == 'Restricted' && sRestrictedAccessEnabled))) {	
        //if (n !== null && o.length > 0) { Replaced by above line as part of hiding 'Restricted' tab conditionally
            var a = n.GetProperty("Type"),
                f = n.GetProperty("Value"),
                l = n.GetProperty("Method"),
                c = n.GetProperty("Enabled");
            a === "MiniButton" ? u = $(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                type: consts.get("SWE_PST_BUTTON_CTRL"),
                id: s,
                className: c === "Y" ? "appletButton" : "appletButtonDis",
                value: f,
                attrs: c === "Y" ? " " : " disabled"
            })) : c === "Y" ? u = $(generateCfgHTMLMarkup({
                type: "a",
                id: s
            })).append(f) : u = $("<div>" + f + "</div>"), u.appendTo(o);
            if (c === "Y" || a === "MiniButton") u.bind("click", {
                ctx: this,
                ctrlId: i,
                ctrlStr: l,
                ctrlType: "linkMethod"
            }, function(e) {
                setTimeout(function() {
                    processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                }, 0), e.preventDefault()
            }), this.InjectAutomationAttr(u, e)
        }
    }

    function showMessage(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = this.GetPM().Get("DeferUpdate"),
            r = !1,
            i = new Array,
            s, o, u, a = new Array,
            f, l;
        a[0] = "CfgMsgEC", a[1] = "EligComp", a[2] = "Eligibility Reason", a[3] = "CfgMsgCPVE", a[4] = "VORD CPVE Validation Service", a[5] = "Message", a[6] = "CfgMsgProceedActions", a[7] = "Proceed Actions", a[8] = "Action", i[0] = "Proceed Actions", i[1] = "Cardinality Violations", i[2] = "Promotion Violations", i[3] = "Other";
        for (var c = 0; c < a.length; c += 3) {
            o = a[c], s = $("#" + jqSelector(o)), s.length > 0 && s.empty(), r = !1;
            for (var h = 0; h < i.length && !r; h++) {
                a[c] === "CfgMsgProceedActions" && n ? f = e.GetChildByType(i[h]) : (f = e.GetChildByType(a[c + 1]), r = !0);
                if (f !== null && f.GetChildCount() > 0 && s.length > 0) {
                    var p = f.GetChildCount();
                    for (var d = 0; d < p; d++) {
                        u = "", n && !r ? (u = f.GetChild(d).GetProperty("Message Text"), typeof u == "undefined" && (u = f.GetChild(d).GetProperty(a[c + 2]), r = !0)) : u = f.GetChild(d).GetProperty(a[c + 2]);
                        var v = utils.IsTrue(SiebelApp.S_App.IsAutoOn()) ? "un='CfgMessage" + d + "'" + " rn='CfgMessage" + d + "'" + " ot='Text'" : "";
                        s.append($(generateCfgHTMLMarkup({
                            type: "div",
                            className: "div-table-row",
                            id: u
                        })).append($(generateCfgHTMLMarkup({
                            type: "div",
                            className: "div-table-col siebui-ecfg-bullet",
                            attrs: v
                        })).append(u)).hide())
                    }
                }
            }
        }
    }

    function showPortItems(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = "",
            r = "",
            i = null,
            s, o, u, a, f = t.GetChildByType(e),
            l = CCFMiscUtil_CreatePropSet(),
            c = f.GetProperty("FieldList");
        l.DecodeFromString(c), n = f.GetProperty("Parent Path") + _underscore + "PORTITEM" + _pipe + f.GetProperty("Port Item Id"), r = f.GetProperty("Parent Path") + _underscore + "PORT" + _pipe + f.GetProperty("Port Item Id"), o = $("#" + jqSelector(n)), i = t.GetChildByType(r), s = i.GetProperty("PortItemCount") === "NaN" ? "0" : i.GetProperty("PortItemCount").toString(), s === "0" && (a = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row siebui-ecfg-th",
            id: n + _underscore + "FIELDHEADER"
        })), a.appendTo(o), displayFieldHeader.call(this, a, l)), s++, i.SetProperty("PortItemCount", s);
        var h = i.GetChildByType("Domain"),
            p = h.GetProperty("DynDisable");
        p === "Y" && f.SetProperty("DynDisable", "Y"), addPortItem.call(this, n, f)
    }

    function showPortItemsNoHeader(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = "",
            r = "",
            i = null,
            s, o, u, a, f = t.GetChildByType(e),
            l = CCFMiscUtil_CreatePropSet(),
            c = f.GetProperty("FieldList");
        l.DecodeFromString(c), n = f.GetProperty("Parent Path") + _underscore + "PORTITEM" + _pipe + f.GetProperty("Port Item Id"), r = f.GetProperty("Parent Path") + _underscore + "PORT" + _pipe + f.GetProperty("Port Item Id"), o = $("#" + jqSelector(n)), i = t.GetChildByType(r), s = i.GetProperty("PortItemCount") === "NaN" ? "0" : i.GetProperty("PortItemCount"), s === "0", s++, i.SetProperty("PortItemCount", s);
        var h = i.GetChildByType("Domain"),
            p = h.GetProperty("DynDisable");
        p === "Y" && f.SetProperty("DynDisable", "Y"), addPortItem.call(this, n, f)
    }

    function showPortItemsWithoutQtyCtrl(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e);
        n.SetProperty("NoQtyCtrl", "Y"), showPortItems.call(this, e)
    }

    function showQuantityList(e) {
        showDomainAndChildrenControl.call(this, e, "quantity")
    }

    function showRadio(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e),
            r = n.GetProperty("Object Type"),
            i = n.GetProperty("GridLayout");
        if (r === "Port") showDomainAndChildrenControl.call(this, e, "radio");
        else if (r === "Attribute") {
            var s = n.GetProperty("AttType"),
                o = n.GetProperty("XA Id"),
                u = n.GetProperty("AttName"),
                a = n.GetProperty("AttValue"),
                f = n.GetChildByType("Domain"),
                l = f.GetChildCount(),
                c = f.GetProperty("ChangeImage"),
                h = f.GetProperty("DynDisable"),
                p = f.GetProperty("Parent Path"),
                d = f.GetProperty("Port Item Id"),
                v = $("#SPAN_" + jqSelector(e)),
                m = $(generateCfgHTMLMarkup({
                    type: "div",
                    id: e,
                    className: "div-table"
                }));
            m.appendTo(v);
            if (c === "Y") {
                var p = f.GetProperty("Parent Path"),
                    g = f.GetProperty("AttID"),
                    y = "img_" + p + "_" + g,
                    b = f.GetProperty("DynNewImage"),
                    w = $("#" + jqSelector(y));
                w.length > 0 && w.attr("src", b)
            }
            var E = null,
                S = null,
                x = null,
                T = 1;
            if (i === "Y") {
                var N = n.GetProperty(".CtrlNumofCol");
                T = parseInt(N);
                if (isNaN(T) || T < 1) T = 1
            }
            for (var C = 0; C < l; C++) {
                var k = "",
                    L = "",
                    A = "eCfgRadioAvailable",
                    O = "",
                    M = f.GetChild(C),
                    _ = null,
                    D = M.GetProperty("AttValue"),
                    P = M.GetProperty("CxEnabled"),
                    H = M.GetProperty("Selected"),
                    B = M.GetProperty("Excluded"),
                    j = M.GetProperty("DynDisable"),
                    F;
                h === "Y" || j === "Y" ? F = "disabled" : F = "", O = e + _underscore + "ATTVAL" + _pipe + D, i === "Y" ? (C % T === 0 && (S = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-row"
                })), S.appendTo(m)), x = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-col"
                })), x.appendTo(S), E = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table"
                })), E.appendTo(x), _ = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-row",
                    id: O
                })), _.appendTo(E)) : (_ = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-row",
                    id: O
                })), _.appendTo(m)), B === "Y" && P === "N" && _.hide(), H === "Y" ? A = "eCfgRadioSelected" : P === "N" && (A = "eCfgRadioExcluded");
                var I = O + _underscore + "FIELD" + _pipe + "Input",
                    q = $(generateCfgHTMLMarkup({
                        type: "div",
                        id: I,
                        className: "div-table-col"
                    }));
                q.appendTo(_), O = e + _underscore + "ATTRDOMAIN" + _pipe + D, k = $(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                    type: consts.get("SWE_CTRL_RADIO"),
                    value: D,
                    attrs: " " + F + (H === "Y" ? " checked" : "")
                })).add($(generateCfgHTMLMarkup({
                    id: O,
                    type: "span",
                    className: A
                })).append(HtmlEncode(D)));
                var R = $(k);
                R.appendTo(q);
                var U = "GRPITEM" + _pipe + e + _underscore + "ATTID" + _pipe + +o + _underscore + "ATTVAL" + _pipe + D + _underscore + "ATTTYPE" + _pipe + s,
                    z = "",
                    W = "radio";
                R.bind("click", {
                    ctx: this,
                    ctrlId: U,
                    ctrlStr: z,
                    ctrlType: W
                }, function(e) {
                    e.data.ctx.keyPressed && e.data.ctx.keyPressed > 36 && e.data.ctx.keyPressed < 41 ? (e.preventDefault(), e.stopPropagation()) : setTimeout(function() {
                        processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                    }, 0)
                }), R.bind("keydown", {
                    ctx: this,
                    ctrlId: U,
                    ctrlStr: z,
                    ctrlType: W
                }, function(e) {
                    e.data.ctx.keyPressed = e.which
                }), R.bind("keyup", {
                    ctx: this,
                    ctrlId: U,
                    ctrlStr: z,
                    ctrlType: W
                }, function(e) {
                    e.data.ctx.keyPressed = null
                }), this.InjectAutomationAttr(R, e)
            }
        }
    }

    function showRadioGrid(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e);
        n.SetProperty("GridLayout", "Y"), showRadio.call(this, e)
    }

    function showReadOnlyText(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e),
            r = "GRPITEM" + _pipe + e,
            i = $("#" + jqSelector(r)),
            s = n.GetProperty("Value");
        i.length > 0 && (utils.IsTrue(SiebelApp.S_App.IsAutoOn()) === !0 && (i.attr("ot", "Label"), i.attr("un", i.attr("id")), i.attr("rn", i.attr("id"))), i.html(s))
    }

    function showReadOnlyTextBox(e) {
        showTextBox.call(this, e);
        var t = $("#" + jqSelector(e));
        t.find(":input").prop("readonly", !0), t.find(":input").css("background-color", "#f0f0f0")
    }

    function showSelectAndOptions(e) {
        showSelectAndOptionsHelper.call(this, e, null, null)
    }

    function showSelectAndOptionsHelper(tableId, dispArray, dispFunction) {
        var pm = this.GetPM(),
            controlPS = pm.Get("ControlPS"),
            controlPropSet = controlPS.GetChildByType(tableId),
            nDomainLen, noQtyCtrl = "",
            optionId, optionValue, portItemId, portItemSpanId, portPropSet, selectId, inputElement, buttonElement, colElement, optionElement, rowElement, spanElement = $("#SPAN_" + jqSelector(tableId)),
            selectElement, tableElement = $(generateCfgHTMLMarkup({
                type: "div",
                id: tableId,
                className: "div-table siebui-ecfg-config2"
            }));
        tableElement.appendTo(spanElement), controlPropSet.SetProperty("PortItemCount", "0"), noQtyCtrl = controlPropSet.GetProperty("NoQtyCtrl"), rowElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row siebui-ecfg-th2"
        })), rowElement.appendTo(tableElement), colElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col siebui-ecfg-editfield"
        })).append(pm.ExecuteMethod("GetTemplateVarValue", "sComboAddNameLabel")), colElement.css("width", "250px"), colElement.attr("align", "left"), colElement.appendTo(rowElement), noQtyCtrl !== "Y" && (colElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })).append(pm.ExecuteMethod("GetTemplateVarValue", "sComboAddQtyLabel")), colElement.css("width", "50px"), colElement.attr("align", "left"), colElement.appendTo(rowElement)), portPropSet = controlPropSet.GetChildByType("Domain"), nDomainLen = portPropSet.GetChildCount();
        var dynReadOnly = portPropSet.GetProperty("DynDisable");
        dynReadOnly === "Y" ? readOnlyVal = "disabled" : readOnlyVal = "";
        var dynChangeImage = portPropSet.GetProperty("ChangeImage"),
            dynParentpath = portPropSet.GetProperty("Parent Path"),
            dynPortItemId = portPropSet.GetProperty("Port Item Id");
        if (dynChangeImage === "Y") {
            var imgId = "img_" + dynParentpath + "_" + dynPortItemId,
                newImage = portPropSet.GetProperty("DynNewImage"),
                imgElement = $("#" + jqSelector(imgId)),
                imgObj = document.getElementById(imgId);
            imgElement.length > 0 && imgElement.attr("src", newImage)
        }
        rowElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row"
        })), rowElement.appendTo(tableElement), colElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col siebui-ecfg-editfield"
        })), colElement.appendTo(rowElement), portItemId = portPropSet.GetProperty("Port Item Id"), optionId = tableId + _underscore + "PORTDOMAIN" + _pipe + "none", selectId = tableId + _underscore + "DOMAINSELECT";
        var selectConfig = {
            id: selectId,
            options: []
        };
        selectConfig.options.push({
            id: optionId,
            value: "GRPITEM" + _pipe + tableId + _underscore + "PROD" + _pipe + "none",
            className: "eCfgOptionAvailable",
            attrs: " selected"
        });
        for (var i = 0; i < nDomainLen; i++) {
            var prodId = "",
                className = "",
                displayName = "",
                dispValArray = new Array,
                excluded = "",
                enable = "",
                portDomainPropSet;
            portItemId = "", optionId = "", portDomainPropSet = portPropSet.GetChild(i), excluded = portDomainPropSet.GetProperty("Excluded"), prodId = portDomainPropSet.GetProperty("Product Id"), portItemId = portDomainPropSet.GetProperty("Port Item Id");
            if (dispArray !== null && dispFunction !== null) {
                for (var iLen = 0; iLen < dispArray.length; iLen++) {
                    var temp = "";
                    temp = portDomainPropSet.GetProperty(dispArray[iLen]), temp === null || typeof temp == "undefined" ? dispValArray[iLen] = "" : dispValArray[iLen] = temp
                }
                var str = CCFMiscUtil_ArrayToString(dispValArray);
                str = str.replace(/\"/g, '\\"'), str = dispFunction + '("' + str + '");', displayName = eval(str)
            } else displayName = portDomainPropSet.GetProperty("CxObjName");
            enable = portDomainPropSet.GetProperty("CxEnabled"), (excluded !== "Y" || enable === "Y") && selectConfig.options.push({
                id: tableId + _underscore + "PORTDOMAIN" + _pipe + prodId,
                value: "GRPITEM" + _pipe + tableId + _underscore + "PROD" + _pipe + prodId,
                className: enable === "Y" ? "eCfgOptionAvailable" :
                    "eCfgOptionExcluded",
                displayValue: displayName
            })
        }
        $(generateCfgSelectHTMLMarkup(selectConfig)).appendTo(colElement), this.InjectAutomationAttr(colElement.find("select"), tableId);
        if (noQtyCtrl !== "Y") {
            var inputId = tableId + _underscore + "DOMAININPUT";
            inputElement = $(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                type: consts.get("SWE_CTRL_TEXT"),
                id: inputId,
                className: dynReadOnly === "Y" ? "siebui-readonly" : "",
                attrs: " " + readOnlyVal
            })), this.InjectAutomationAttr(inputElement, tableId), dynReadOnly === "Y" ? buttonElement = $(generateCfgHTMLMarkup({
                type: "span",
                className: "minibuttonOff"
            })).append(pm.ExecuteMethod("GetTemplateVarValue", "sAddItemLabel")) : buttonElement = $(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                type: consts.get("SWE_PST_BUTTON_CTRL"),
                value: pm.ExecuteMethod("GetTemplateVarValue", "sAddItemLabel"),
                attrs: "title='" + pm.ExecuteMethod("GetTemplateVarValue", "sAddItemLabel") + "' "
            }))
        } else dynReadOnly === "Y" ? buttonElement = $(generateCfgHTMLMarkup({
            type: "span",
            className: "minibuttonOff"
        })).append(pm.ExecuteMethod("GetTemplateVarValue", "sAddItemLabel")) : buttonElement = $(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
            type: consts.get("SWE_PST_BUTTON_CTRL"),
            value: pm.ExecuteMethod("GetTemplateVarValue", "sAddItemLabel"),
            attrs: "title='" + pm.ExecuteMethod("GetTemplateVarValue", "sAddItemLabel") + "' "
        }));
        noQtyCtrl !== "Y" && (colElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col siebui-ecfg-editfield"
        })), colElement.appendTo(rowElement), inputElement.appendTo(colElement)), colElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })), colElement.appendTo(rowElement), buttonElement.appendTo(colElement);
        if (dynReadOnly !== "Y") {
            var processInputId, processInputStr, processInputType;
            noQtyCtrl !== "Y" ? (processInputId = tableId + _underscore + "DOMAININPUT", processInputStr = tableId + _underscore + "DOMAINSELECT", processInputType = "ComboAdd") : (processInputId = "", processInputStr = tableId + _underscore + "DOMAINSELECT", processInputType = "ComboAddOne"), buttonElement.bind("click", {
                ctx: this,
                ctrlId: processInputId,
                ctrlStr: processInputStr,
                ctrlType: processInputType
            }, function(e) {
                setTimeout(function() {
                    processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                }, 0)
            }), this.InjectAutomationAttr(buttonElement, tableId)
        }
        portItemSpanId = tableId.replace(/PORT/, "PORTITEM"), spanElement = $("#SPAN_" + jqSelector(portItemSpanId)), tableElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table"
        })), tableElement.appendTo(spanElement), rowElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row siebui-ecfg-input2"
        })), rowElement.appendTo(tableElement), colElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })), colElement.attr("align", "center1"), colElement.appendTo(rowElement), tableElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table",
            id: portItemSpanId
        })), tableElement.appendTo(colElement)
    }

    function showSelectAndOptionsPrice(e) {
        var t = new Array;
        t[0] = "CxObjName", t[1] = "Original List Price", showSelectAndOptionsHelper.call(this, e, t, "showDomainPrice")
    }

    function showSelectAndOptionsSpanOnly(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e);
        n.SetProperty("PortItemCount", "0");
        var r, i = $("#SPAN_" + jqSelector(e));
        r = e.replace(/PORT/, "PORTITEM"), i = $("#SPAN_" + jqSelector(r));
        var s = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table"
        }));
        s.appendTo(i);
        var o = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row"
        }));
        o.appendTo(s);
        var u = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        }));
        u.attr("align", "center2"), u.appendTo(o), $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table",
            id: r
        })).appendTo(u)
    }

    function showSelectAndOptionsWithoutQtyCtrl(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e);
        n.SetProperty("NoQtyCtrl", "Y"), showSelectAndOptionsHelper.call(this, e, null, null)
    }

    function showSignal(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e),
            r, i = "SPAN_CfgSignal",
            s = $("#" + jqSelector(i)),
            o, u, a, f, l, c;
        if (s.length > 0) {
            l = s.find("#CfgSignal");
            if (l.length === 0) {
                var h = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-row"
                })).append($(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-col"
                })).append(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table",
                    id: "CfgMsgSig"
                })));
                l = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table",
                    id: "CfgSignal"
                })), l.append(h), l.append(h.clone().find("#CfgMsgSig").attr("id", "CfgMsgEC")), l.append(h.clone().find("#CfgMsgSig").attr("id", "CfgMsgCPVE")), l.append(h.clone().find("#CfgMsgSig").attr("id", "CfgMsgProceedActions")), s.html(generateCfgOuterHTML(l)), l = s.find("#CfgSignal")
            } else l.find("#CfgMsgSig").empty(), l.find("#CfgMsgEC").empty(), l.find("#CfgMsgCPVE").empty(), l.find("#CfgMsgProceedActions").empty();
            c = n.GetChildByType("Signal"), u = l.find("#CfgMsgSig");
            if (c !== null && c.GetPropertyCount() > 0 && u.length > 0) {
                var p = 0;
                for (r = !0;
                    (a = c.EnumProperties(r)) !== null; r = !1, p++) {
                    var d = utils.IsTrue(SiebelApp.S_App.IsAutoOn()) ? "un='CfgSignal" + p + "'" + " rn='CfgSignal" + p + "'" + " ot='Text'" : "";
                    f = c.GetProperty(a) === "" ? a : c.GetProperty(a);
                    var v = CfgMsgSignal(f);
                    u.append($(generateCfgHTMLMarkup({
                        type: "div",
                        className: "div-table-row",
                        id: v.id
                    })).append($(generateCfgHTMLMarkup({
                        type: "div",
                        className: "div-table-col siebui-ecfg-bullet",
                        attrs: d
                    })).append(v.msg))), $("#siebui-ecfg-messages").addClass("siebui-ecfg-messages-highlight")
                }
            }
            showMessage.call(this, c)
        }
        arrangeMsg.call(this)
    }

    function showTextBox(e) {
        var t = this.GetPM().Get("ProductPS"),
            n = this.GetPM().Get("ControlPS"),
            r = this.GetPM().Get("EditFieldIcon"),
            i = n.GetChildByType(e),
            s = i.GetProperty("Object Type"),
            o = $("#" + jqSelector(e));
        if (s === "Attribute" && o.length > 0) {
            var u, a = i.GetProperty("Value"),
                f = i.GetProperty("CxReadOnly"),
                l = i.GetProperty("DynDisable"),
                c = i.GetProperty("ChangeImage");
            a.length > 0 && (a = a.replace(/\"/g, "&quot;"));
            if (c === "Y") {
                var h = i.GetProperty("Parent Path"),
                    p = i.GetProperty("AttID"),
                    d = "img_" + h + "_" + p,
                    v = i.GetProperty("DynNewImage"),
                    m = $("#" + jqSelector(d));
                m.length > 0 && m.attr("src", v)
            }
            f === "Y" ? u = a : u = generateCfgOuterHTML($(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                type: consts.get("SWE_CTRL_TEXT"),
                className: l === "Y" ? "siebui-ecfg-editfield-dynDisabled" :
                    "",
                id: "GRPITEM" + _pipe + e + _underscore + "ATTTYPE" + _pipe + "TEXT",
                value: a,
                attrs: l === "Y" ? "readonly" : " "
            })));
            if (i.GetProperty("EditField") === "Y") {
                var g = i.GetProperty("AttID");
                u += generateCfgOuterHTML($(generateCfgHTMLMarkup({
                    type: "a"
                })).append(generateCfgImageMarkup.call(this, "EditField")))
            }
            o.html(u);
            if (s === "Attribute" && i.GetProperty("AttType") === "Date" && t.GetProperty(".DatePicker") === "Y") {
                var y = $(u).attr("id");
                $("#" + jqSelector(y)).datepicker({
                    showOn: "button",
                    buttonText: "",
                    buttonImageOnly: !1
                }), $(".siebui-ecfg-editfield .ui-datepicker-trigger").addClass("siebui-ecfg-datepicker-trigger")
            }
            var b = "GRPITEM" + _pipe + e + _underscore + "ATTTYPE" + _pipe + "TEXT",
                w = o.find(":input");
            w.bind("change", {
                ctx: this,
                ctrlId: b,
                ctrlStr: "",
                ctrlType: "text"
            }, function(e) {
                setTimeout(function() {
                    processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                }, 0)
            }), o.find(".siebui-icon-icon_pick") && o.find(".siebui-icon-icon_pick").length > 0 && (i.GetProperty(".ReadOnlyPickList") !== "N" && (o.find(":input").addClass("siebui-ecfg-picklist-input"), o.find(":input").on("keyup", function() {
                this.value = ""
            })), this.GetPM().Get("IsPickRecord") && (processInput.call(this, b, "", "text"), this.GetPM().SetProperty("IsPickRecord", !1))), this.InjectAutomationAttr(w, e), i.GetProperty("EditField") === "Y" && (w = o.find("a"), w.length > 0 && (w.bind("click", {
                ctx: this,
                grpItemId: e,
                fieldType: "Attribute"
            }, function(e) {
                setTimeout(function() {
                    editField.call(e.data.ctx, e.data.grpItemId, e.data.fieldType, "", "")
                }, 0)
            }), this.InjectAutomationAttr(w, e)))
        }
    }

    function toggleExplanationPage(e) {
        e === !0 ? (element = $("#ExplanationPage"), element.length > 0 && element.show(), element = $("#MainPage,#TopLevelButtons1,#TopLevelButtons2"), element.length > 0 && element.hide()) : (element = $("#ExplanationPage"), element.length > 0 && element.hide(), element = $("#MainPage,#TopLevelButtons1,#TopLevelButtons2"), element.length > 0 && element.show())
    }

    function toggleProdDetails() {
        var e = $(".siebui-ecfg-product-details #siebui-ecfg-toggleProdDetails").children("img"),
            t = $(".siebui-ecfg-product-details #CfgObjDetails");
        t.is(":hidden") ? (t.show(), e.attr("src", _cfgImageMapping.ShowLess.src)) : (t.hide(), e.attr("src", _cfgImageMapping.ShowMore.src))
    }

    function toggleCfgMessages() {
        var e = $("#siebui-ecfg-messages .siebui-applet-content"),
            t = $("#siebui-ecfg-messages #CfgMsgToggleBtn").children("img");
        e.is(":hidden") ? (e.show(), t.attr("src", _cfgImageMapping.ShowLess.src)) : (e.hide(), t.attr("src", _cfgImageMapping.ShowMore.src))
    }

    function updateCanInvoke() {
        var e = this.GetPM().Get("UpdateCanInvoke"),
            t;
        for (var n = !0;
            (t = e.EnumProperties(n)) !== null; n = !1) {
            var r = e.GetProperty(t),
                i = $("#" + jqSelector(t));
            i.attr("type") === "button" ? r === "enabled" ? (i.removeAttr("disabled"), i.attr("class", "appletButton")) : (i.attr("disabled", "disabled"), i.attr("class", "appletButtonDis")) : SiebelJS.Log("ERROR: NO SUCH CASE")
        }
    }

    function updateExcludedItems(e) {
        var t = !0,
            n;
        for (t = !0; n = e.EnumChildren(t); t = !1) {
            var r = $("#" + jqSelector(n.GetType()));
            if (r.length > 0) {
                var i = !0,
                    s, o;
                for (i = !0;
                    (s = n.EnumProperties(i)) !== null; i = !1) {
                    o = n.GetProperty(s);
                    switch (s) {
                        case "hide":
                        case "remove":
                            /msie|trident|edge/.test(navigator.userAgent.toLowerCase()) ? ($("#" + jqSelector(o)).parent().prop("tagName") !== "SPAN" && $("#" + jqSelector(o)).wrap("<span>"), $("#" + jqSelector(o)).parent().hide()) : $("#" + jqSelector(o)).hide();
                            break;
                        case "show":
                            /msie|trident|edge/.test(navigator.userAgent.toLowerCase()) ? $("#" + jqSelector(o)).parent().prop("tagName") === "SPAN" ? $("#" + jqSelector(o)).unwrap() : $("#" + jqSelector(o)).show() : $("#" + jqSelector(o)).show();
                            break;
                        default:
                            r.attr(s, o)
                    }
                }
            }
        }
    }

    function updateExcludedItemForAttribute(e) {
        updateExcludedItemForPortOrAttribute.call(this, e, null, null)
    }

    function updateExcludedItemForPort(e) {
        updateExcludedItemForPortOrAttribute.call(this, e, null, null)
    }

    function updateExcludedItemForPortOrAttribute(exclItemPS, dispArray, dispFunction) {
        var controlPS = this.GetPM().Get("ControlPS"),
            childPS = null,
            bGetFirst = !0,
            bGetFirst2 = !0,
            updateType = "",
            propName, propVal, id = exclItemPS.GetType(),
            objectType = exclItemPS.GetProperty("Type"),
            usage = exclItemPS.GetProperty("Usage"),
            strParentPath = exclItemPS.GetProperty("Parent Path"),
            excluded, excludedElig, excludedModel, grpItemId, itemDomainPropSet, resultPropSet, itemPropSet, propValInt = 0,
            optionId, selectId, strRowId, element, rowElement, optionElement, selectElement, propSet = CCFMiscUtil_CreatePropSet();
        propSet.SetType("UpdateExcludedItem");
        for (bGetFirst = !0; childPS = exclItemPS.EnumChildren(bGetFirst); bGetFirst = !1) {
            updateType = childPS.GetType();
            for (bGetFirst2 = !0;
                (propName = childPS.EnumProperties(bGetFirst2)) !== null; bGetFirst2 = !1) {
                excluded = excludedElig = excludedModel = "", grpItemId = optionId = strRowId = "", itemDomainPropSet = null, resultPropSet = null, itemPropSet = null, propValInt = 0, propVal = childPS.GetProperty(propName), propVal !== null && propVal !== "" && (propValInt = parseInt(propVal)), objectType === "Attribute" ? (optionId = strParentPath + _underscore + "ATTR" + _pipe + id + _underscore + "ATTRDOMAIN" + _pipe + propName, strRowId = strParentPath + _underscore + "ATTR" + _pipe + id + _underscore + "ATTVAL" + _pipe + propName) : objectType === "Port" && (optionId = strParentPath + _underscore + "PORT" + _pipe + id + _underscore + "PORTDOMAIN" + _pipe + propName, strRowId = strParentPath + _underscore + "PORT" + _pipe + id + _underscore + "PROD" + _pipe + propName), objectType === "Port" ? grpItemId = strParentPath + _underscore + "PORT" + _pipe + id : objectType === "Attribute" && (grpItemId = strParentPath + _underscore + "ATTR" + _pipe + id), resultPropSet = controlPS.GetChildByType(grpItemId), resultPropSet !== null ? (itemPropSet = resultPropSet.GetChildByType("Domain"), itemDomainPropSet = itemPropSet.GetChildByType(propName)) : itemDomainPropSet = null;
                var ps = CCFMiscUtil_CreatePropSet();
                if (itemDomainPropSet !== null) {
                    excludedElig = itemDomainPropSet.GetProperty("ExcludedElig"), excludedModel = itemDomainPropSet.GetProperty("ExcludedModel");
                    if (excludedModel === "Y" && ((propValInt & 1) > 0 || (propValInt & 2) > 0) || excludedElig === "Y" && (propValInt & 4) > 0) excluded = "Y";
                    element = $("#" + jqSelector(optionId)), rowElement = $("#" + jqSelector(strRowId)), ps.SetType(optionId);
                    if (element.length > 0) updateType === "Disable" ? (ps.SetProperty("class", "eCfgOptionExcluded"), excluded === "Y" && (usage === "CheckBox" || usage === "QuantityList" ||
                        usage === "Radio" ? ps.SetProperty("hide", strRowId) : (usage === "ComboBox" || usage === "ComboBoxAdd") && ps.SetProperty("remove", optionId))) : updateType === "Enable" && (ps.SetProperty("class", "eCfgOptionAvailable"), excludedModel === "Y" && (usage === "CheckBox" || usage === "QuantityList" || usage === "Radio" ? ps.SetProperty("show", strRowId) : (usage === "ComboBox" || usage === "ComboBoxAdd") && ps.SetProperty("show", optionId))), propSet.AddChild(ps);
                    else if (updateType === "Enable" && excludedModel === "Y" && (usage === "ComboBox" || usage === "ComboBoxAdd"))
                        if (objectType === "Port") {
                            selectId = strParentPath + _underscore + "PORT" + _pipe + id + _underscore + "DOMAINSELECT", selectElement = $("#" + jqSelector(selectId)), childPS.SetProperty("SelectId", selectId);
                            if (selectElement.length > 0) {
                                optionElement = $("<option id='" + optionId + "' cfg_value='" + "GRPITEM" + _pipe + strParentPath + _underscore + "PORT" + _pipe + id + _underscore + "PROD" + _pipe + propName + "' class='eCfgOptionAvailable'></option>"), optionElement.appendTo(selectElement);
                                var dispValArray = new Array;
                                if (dispArray !== null && dispFunction !== null) {
                                    for (var iLen = 0; iLen < dispArray.length; iLen++) {
                                        var temp = "";
                                        temp = itemDomainPropSet.GetProperty(dispArray[iLen]), temp === null || typeof temp == "undefined" ? dispValArray[iLen] = "" : dispValArray[iLen] = temp
                                    }
                                    var str = CCFMiscUtil_ArrayToString(dispValArray);
                                    str = dispFunction + '.call ( this, "' + str + '");', optionElement.text(eval(str)), optionElement.attr("value", eval(str))
                                } else optionElement.text(itemDomainPropSet.GetProperty("CxObjName"))
                            }
                        } else if (objectType === "Attribute") {
                        var attType = "";
                        selectId = strParentPath + _underscore + "ATTR" + _pipe + id + _underscore + "DOMAINSELECT", selectElement = $("#" + jqSelector(selectId)), selectElement.length > 0 && (attType = resultPropSet.GetProperty("AttType"), optionElement = $("<option id='" + optionId + "' cfg_value='" + "GRPITEM" + _pipe + strParentPath + _underscore + "ATTR" + _pipe + id + _underscore + "ATTTYPE" + _pipe + attType + _underscore + "ATTVAL" + _pipe + propName + "' class='eCfgOptionAvailable'></option>"), optionElement.appendTo(selectElement), optionElement.attr("value", propName), optionElement.text(propName))
                    }
                }
            }
        }
        updateExcludedItems.call(this, propSet)
    }

    function updateExcludedItemForPortWithPrice(e) {
        var t = new Array;
        t[0] = "CxObjName", t[1] = "List Price", updateExcludedItemForPortOrAttribute.call(this, e, t, "showDomainPrice")
    }

    function updateInstanceInfo(e, t, n) {
        var r = this.GetPM().Get("ControlPS"),
            i = n.GetPropertyCount(),
            s = r.GetChildByType(e),
            o = s.GetChildByType("Domain"),
            u = o.GetChildByType(t),
            a = !0,
            f, l;
        for (a = !0;
            (f = n.EnumProperties(a)) !== null; a = !1) l = n.GetProperty(f), u.SetProperty(f, l)
    }

    function updatePortItemsForCheckBox(e) {
        updatePortItemsForDomainChildCtrl.call(this, e, "CheckBox"), checkForceRefresh.call(this, e, !0, !0)
    }

    function updatePortItemsForComboAdd(e) {
        updatePortItemsForComboAddHelper.call(this, e), checkForceRefresh.call(this, e, !0, !0)
    }

    function updatePortItemsForComboAddAttr(e) {
        updatePortItemsForComboAddHelper.call(this, e), checkForceRefresh.call(this, e, !0, !1)
    }

    function updatePortItemsForComboAddHelper(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = null,
            r = null,
            i = null,
            s = "",
            o = "",
            u = "",
            a = "",
            f = "",
            l = "",
            c = null,
            h = 0,
            p = "0",
            d = "",
            v = null,
            m = String(e.GetProperty("NoQtyCtrl")),
            g = null,
            y = null,
            b = null,
            w = null,
            E = "",
            S = e.GetType(),
            x = t.GetChildByType(S);
        S = S.replace(/PORT/, "PORTITEM"), p = x.GetProperty("PortItemCount") === "NaN" ? "0" : x.GetProperty("PortItemCount"), n = e.GetChildByType("Add");
        if (n !== null) {
            h = n.GetChildCount();
            for (var T = 0; T < h; T++) d = "", c = CCFMiscUtil_CreatePropSet(), c.Copy(n.GetChild(T)), d = c.GetProperty("Path"), c.SetType(S + _underscore + "INTID" + _pipe + d), t.AddChild(c), m === "Y" && c.SetProperty("NoQtyCtrl", m), addPortItem.call(this, S, c), T === 0 && (v = c), p++
        }
        i = e.GetChildByType("Modify");
        if (i !== null) {
            h = i.GetChildCount();
            for (var T = 0; T < h; T++) {
                var N = null;
                c = CCFMiscUtil_CreatePropSet(), c.Copy(i.GetChild(T)), s = u = a = f = l = "", g = null, s = c.GetProperty("Name"), u = c.GetProperty("Path"), f = c.GetProperty("Port Item Id"), l = c.GetProperty("Value"), E = S + _underscore + "INTID" + _pipe + u + _underscore + "FIELD" + _pipe + s, w = $("#" + jqSelector(E));
                if (w.length > 0) {
                    var C = w.find(":input");
                    C.length > 0 ? C.val(l) : w.html(l)
                }
            }
        }
        r = e.GetChildByType("Delete");
        if (r !== null) {
            h = r.GetChildCount();
            for (var T = 0; T < h; T++) {
                o = u = f = "";
                var k = "";
                c = CCFMiscUtil_CreatePropSet(), c.Copy(r.GetChild(T)), u = c.GetProperty("Path"), f = c.GetProperty("Port Item Id"), o = S + _underscore + "INTID" + _pipe + u, deletePortItem.call(this, S, o);
                var k = -1,
                    L = t.childArray.length;
                for (var A = 0; A < L; A++) {
                    var O = t.childArray[A];
                    if (O.type === o) {
                        k = A;
                        break
                    }
                }
                t.RemoveChild(k), p--
            }
        }
        x.SetProperty("PortItemCount", p);
        if (p > 0) {
            var M = $("#" + jqSelector(S + _underscore + "FIELDHEADER"));
            if (M.length === 0) {
                w = $("#" + jqSelector(S));
                if (w.length > 0) {
                    M = $(generateCfgHTMLMarkup({
                        type: "div",
                        className: "div-table-row siebui-ecfg-th"
                    })), w.children(".div-table-row").length <= 0 ? M.appendTo(w) : M.prependTo(w), M.attr("id", S + _underscore + "FIELDHEADER");
                    var _ = CCFMiscUtil_CreatePropSet(),
                        D = v.GetProperty("FieldList");
                    _.DecodeFromString(D), displayFieldHeader.call(this, M, _)
                }
            }
            M.show()
        } else M = $("#" + jqSelector(S + _underscore + "FIELDHEADER")), M.length > 0 && M.hide()
    }

    function updatePortItemsForComboAddWithoutQtyCtrl(e) {
        e.SetProperty("NoQtyCtrl", "Y"), updatePortItemsForComboAdd.call(this, e)
    }

    function updatePortItemsForComboBox(e) {
        updatePortItemsForComboBoxHelper.call(this, e), checkForceRefresh.call(this, e, !0, !0)
    }

    function updatePortItemsForComboBoxHelper(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = null,
            r = null,
            i = null,
            s = null,
            o = null,
            u = !0,
            a, f, l, c, h, p, d, v, m, g, y, b, w, E, S;
        r = e.GetChildByType("Delete"), y = g = e.GetType();
        if (r !== null)
            for (u = !0; o = r.EnumChildren(u); u = !1) {
                rowId = d = v = m = path = c = "", optionObj = null, h = "", s = null, d = o.GetProperty("Port Item Id"), v = o.GetProperty("Product Id"), p = o.GetProperty("Path"), l = o.GetProperty("RequireMoreChild"), s = t.GetChildByType(y), S = s.type || p;
                var x = CCFMiscUtil_CreatePropSet(),
                    T = s.GetProperty("FieldList");
                x.DecodeFromString(T), setExcluded.call(this, s, v, y), c = y + _underscore + "PORTDOMAIN" + _pipe + "none", b = $("#" + jqSelector(c)), b.length > 0 && (b.prop("selected", !0), b.attr("class", "eCfgOptionAvailable")), m = "GENERICS" + _pipe + path, b = $("#" + jqSelector(m)), b.length > 0 && b.remove(), h = y + _underscore + "COMBOBOX", E = $("#" + jqSelector(h)), E.length > 0 && (E.children().slice(1).remove(), w = $("#" + jqSelector(y + _underscore + "COMBOBOX_TD")), addGenerics.call(this, s, w, S, l), displayQtyInCombo.call(this, E, s.GetType(), x, null), displayFieldList.call(this, E, _underscore + "COMBOBOX" + _pipe, s.GetType(), x, null))
            }
        n = e.GetChildByType("Add");
        if (n !== null)
            for (u = !0; o = n.EnumChildren(u); u = !1) {
                d = v = c = "", s = null, d = n.GetProperty("Port Item Id"), p = o.GetProperty("Path"), v = o.GetProperty("Product Id"), l = o.GetProperty("RequireMoreChild"), updateInstanceInfo.call(this, y, v, o), s = t.GetChildByType(y), S = s.type || p;
                var x = CCFMiscUtil_CreatePropSet(),
                    T = s.GetProperty("FieldList");
                x.DecodeFromString(T), c = y + _underscore + "PORTDOMAIN" + _pipe + v, b = $("#" + jqSelector(c)), b.length > 0 && b.prop("selected", !0), h = y + _underscore + "COMBOBOX", E = $("#" + jqSelector(h)), E.length > 0 && (E.children().slice(1).remove(), w = $("#" + jqSelector(y + _underscore + "COMBOBOX_TD")), w.length > 0 && addGenerics.call(this, s, w, S, l), displayQtyInCombo.call(this, E, s.GetType(), x, o), displayFieldList.call(this, E, _underscore + "COMBOBOX" + _pipe, s.GetType(), x, o))
            }
        i = e.GetChildByType("Modify");
        if (i !== null)
            for (u = !0; o = i.EnumChildren(u); u = !1) a = v = d = f = "", a = o.GetProperty("Name"), v = o.GetProperty("Product Id"), d = o.GetProperty("Port Item Id"), f = o.GetProperty("Value"), w = $("#" + jqSelector(y + _underscore + "COMBOBOX" + _pipe + v + _underscore + "FIELD" + _pipe + a)), w.length > 0 && (b = w.find(":input"), b.length > 0 ? (f === "0" && (f = ""), b.val(f)) : w.html(f))
    }

    function updatePortItemsForDomainChildCtrl(e, t) {
        var n = this.GetPM().Get("ControlPS"),
            r = null,
            i = null,
            s = null,
            o = null,
            u = null,
            a = null,
            f = CCFMiscUtil_CreatePropSet(),
            l = "",
            c, h, p, d, v, m, g, y, b, w, E, t, S, x, T, N, C, k, L, A;
        p = _underscore + "PROD" + _pipe, w = y = e.GetType(), i = e.GetChildByType("Delete");
        if (i !== null) {
            c = i.GetChildCount();
            for (var O = 0; O < c; O++) h = m = g = v = "", instancePropSet = i.GetChild(O), m = instancePropSet.GetProperty("Port Item Id"), g = instancePropSet.GetProperty("Product Id"), v = instancePropSet.GetProperty("Path"), h = y + _underscore + "PROD" + _pipe + g, k = $("#" + jqSelector(h)), colElemnent = null, C = null, k.length > 0 && (o = n.GetChildByType(w), u = o.GetChildByType("Domain"), a = u.GetChildByType(g), l = o.GetProperty("FieldList"), f.DecodeFromString(l), setExcluded.call(this, o, g, y), a.RemoveProperty("Path"), t === "QuantityList" ? (L = $("#" + jqSelector(h + _underscore + "FIELD" + _pipe + "Quantity")), L.length > 0 && (C = L.find(":input"), C.length > 0 && C.val(""))) : t === "CheckBox" ? (L = $("#" + jqSelector(h + _underscore + "FIELD" + _pipe + "Quantity")), L.length > 0 && (C = L.find(":input"), C.length > 0 && (C.prop("checked", !1), C.attr("aria-checked", !1)))) : t === "Radio" && (k.find(":input").eq(0).attr("aria-checked", !1), L = $("#" + jqSelector(w + _underscore + "PROD" + _pipe + "none" + _underscore + "FIELD" + _pipe + "Quantity")), L.length > 0 && (C = L.find(":input"), C.length > 0 && (C.prop("checked", !0), C.attr("aria-checked", !0)))), b = y + _underscore + "PORTDOMAIN" + _pipe + g + _underscore + "CXLINK", C = $("#" + jqSelector(b)), C.length > 0 && C.closest("a").replaceWith(C.html()), $("#" + jqSelector(y + _underscore + "PORTDOMAIN" + _pipe + g)).removeClass("eCfgSpanSelected"), t === "Radio" && ($("#" + jqSelector(y + _underscore + "PORTDOMAIN" + _pipe + g)).removeClass("eCfgRadioSelected"), $("#" + jqSelector(y + _underscore + "PORTDOMAIN" + _pipe + g)).addClass("eCfgRadioAvailable")), t === "QuantityList" && $("#" + jqSelector(y + _underscore + "PORTDOMAIN" + _pipe + g)).addClass("eCfgSpanAvailable"), d = "GENERICS" + _pipe + v, C = $("#" + jqSelector(d)), C.length > 0 && C.empty(), deleteFieldList.call(this, k, f))
        }
        r = e.GetChildByType("Add");
        if (r !== null) {
            m = r.GetProperty("Port Item Id"), c = r.GetChildCount();
            for (var O = 0; O < c; O++) {
                var M = 0,
                    _ = 0;
                instancePropSet = null, instancePropSet = r.GetChild(O), g = instancePropSet.GetProperty("Product Id"), v = instancePropSet.GetProperty("Path"), S = instancePropSet.GetProperty("Selected"), x = instancePropSet.GetProperty("RequireMoreChild"), updateInstanceInfo.call(this, w, g, instancePropSet), E = y + _underscore + "PROD" + _pipe + g, k = $("#" + jqSelector(E));
                if (k.length > 0) {
                    o = n.GetChildByType(y), l = o.GetProperty("FieldList"), f.DecodeFromString(l), t === "QuantityList" ? (L = $("#" + jqSelector(E + _underscore + "FIELD" + _pipe + "Quantity")), L.length > 0 && (C = L.find(":input"), C.length > 0 && C.val(instancePropSet.GetProperty("Quantity")))) : (t === "Radio" && (L = $("#" + jqSelector(w + _underscore + "PROD" + _pipe + "none" + _underscore + "FIELD" + _pipe + "Quantity")), L.length > 0 && (C = L.find(":input"), C.length > 0 && C.attr("aria-checked", !1))), L = $("#" + jqSelector(E + _underscore + "FIELD" + _pipe + "Quantity")), L.length > 0 && (C = L.find(":input"), C.length > 0 && (C.prop("checked", !0), C.attr("aria-checked", !0))));
                    if (instancePropSet.GetProperty("CanDrillDown") === "Y") {
                        b = y + _underscore + "PORTDOMAIN" + _pipe + g, C = $("#" + jqSelector(b));
                        if (C.length > 0) {
                            var D = C.text();
                            A = $(generateCfgHTMLMarkup({
                                type: "a",
                                id: b + _underscore + "CXLINK"
                            })).append(D), C.html(""), A.appendTo(C);
                            var P = "GRPITEM" + _pipe + y + _underscore + "PROD" + _pipe + g,
                                H = "SetTopObj",
                                B = "linkMethod";
                            A.bind("click", {
                                ctx: this,
                                ctrlId: P,
                                ctrlStr: H,
                                ctrlType: B
                            }, function(e) {
                                setTimeout(function() {
                                    processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                                }, 0)
                            }), this.InjectAutomationAttr(A, e.GetType())
                        }
                    }
                    C = $("#" + jqSelector(w + _underscore + "PORTDOMAIN" + _pipe + g)), C.length > 0 && (addGenerics.call(this, o, C, v, x), (t === "Radio" || t === "CheckBox") && C.removeClass("eCfgOptionExcluded"), C.addClass("eCfgSpanSelected")), displayFieldList.call(this, k, p, o.GetType(), f, instancePropSet, !0)
                }
            }
        }
        s = e.GetChildByType("Modify");
        if (s !== null) {
            c = s.GetChildCount();
            for (var O = 0; O < c; O++) instancePropSet = s.GetChild(O), T = g = m = N = "", T = instancePropSet.GetProperty("Name"), g = instancePropSet.GetProperty("Product Id"), m = instancePropSet.GetProperty("Port Item Id"), N = instancePropSet.GetProperty("Value"), L = $("#" + jqSelector(w + _underscore + "PROD" + _pipe + g + _underscore + "FIELD" + _pipe + T)), L.length > 0 && (C = L.find(":input"), C.length > 0 ? t === "CheckBox" ? N === "0" ? (C.prop("checked", !1), C.attr("aria-checked", !1)) : (C.prop("checked", !0), C.attr("aria-checked", !0)) : t === "QuantityList" ? (N === "0" && (N = ""), C.val(N)) : t === "Radio" && (N === "0" ? (L = $("#" + jqSelector(w + p + "none" + _underscore + "FIELD" + _pipe + "Quantity")), L.length > 0 && (C = L.find(":input"), C.length > 0 && (C.prop("checked", !0), C.attr("aria-checked", !0)))) : (C.prop("checked", !0), C.attr("aria-checked", !0))) : L.html(N))
        }
    }

    function updatePortItemsForQuantityList(e) {
        updatePortItemsForDomainChildCtrl
            .call(this, e, "QuantityList"), checkForceRefresh.call(this, e, !0, !0)
    }

    function updatePortItemsForRadio(e) {
        updatePortItemsForDomainChildCtrl.call(this, e, "Radio"), checkForceRefresh.call(this, e, !0, !0)
    }

    function updateSelectionInfoForAttribute(e) {
        var t = generateCfgImageMarkup.call(this, "Required"),
            n = generateCfgImageMarkup.call(this, "WhiteSpace"),
            r = e.GetProperty("AttName"),
            i = e.GetProperty("AttValue"),
            s = e.GetProperty("XA Id"),
            o = e.GetProperty("Usage"),
            u = e.GetProperty("AttValueOld"),
            a = e.GetProperty("Parent Path"),
            f = e.GetProperty("RequireMoreChild"),
            l = $("#" + jqSelector("GENERICS" + _pipe + a + _underscore + "ATTR" + _pipe + s)),
            c = null,
            h;
        l.length > 0 && (f === "Y" ? l.html(t) : l.html(n)), o === "TextBox" ? (h = $("#" + jqSelector("GRPITEM" + _pipe + a + _underscore + "ATTR" + _pipe + s + _underscore + "ATTTYPE" + _pipe + "TEXT")), h.length > 0 && h.val(i)) : o.indexOf("Combo") === 0 ? i !== "" && typeof i != "undefined" && (h = $("#" + jqSelector(a + _underscore + "ATTR" + _pipe + s + _underscore + "ATTRDOMAIN" + _pipe + i)), h.length > 0 && h.prop("selected", !0)) : o === "Radio" && (i !== "" && typeof i != "undefined" && (colElement = $("#" + jqSelector(a + _underscore + "ATTR" + _pipe + s + _underscore + "ATTVAL" + _pipe + i + _underscore + "FIELD" + _pipe + "Input")), colElement.length > 0 && (h = colElement.find(":input"), h.length > 0 && (h.prop("checked", !0), h.attr("aria-checked", !0)))), u !== "" && typeof u != "undefined" && (colElement = $("#" + jqSelector(a + _underscore + "ATTR" + _pipe + s + _underscore + "ATTVAL" + _pipe + u + _underscore + "FIELD" + _pipe + "Input")), colElement.length > 0 && (h = colElement.find(":input"), h.length > 0 && (h.prop("checked", !1), h.attr("aria-checked", !1)))))
    }

    function updateSignal(e) {
        var t = null,
            n = null,
            r = null,
            i = !0,
            s = e.GetType(),
            o, u, a, f, l, c, h;
        t = e.GetChildByType("Add");
        if (t !== null) {
            l = $("#CfgMsgSig");
            if (l.length > 0) {
                var p = 0;
                for (i = !0;
                    (o = t.EnumProperties(i)) !== null; i = !1, p++) {
                    var d = utils.IsTrue(SiebelApp.S_App.IsAutoOn()) ? "un='CfgSignal" + p + "'" + " rn='CfgSignal" + p + "'" + " ot='Text'" : "";
                    u = t.GetProperty(o) === "" ? o : t.GetProperty(o);
                    var v = CfgMsgSignal(u);
                    l.find("[id='" + v.id + "']").length === 0 && l.append($(generateCfgHTMLMarkup({
                        type: "div",
                        className: "div-table-row",
                        id: v.id
                    })).append($(generateCfgHTMLMarkup({
                        type: "div",
                        className: "div-table-col siebui-ecfg-bullet",
                        attrs: d
                    })).append(v.msg)))
                }
            }
        }
        n = e.GetChildByType("Delete");
        if (n !== null)
            for (i = !0;
                (o = n.EnumProperties(i)) !== null; i = !1) u = n.GetProperty(o) === "" ? o : n.GetProperty(o), f = CfgMsgSignal(u).id, f !== null && (c = $("#" + jqSelector(f)), c.length > 0 && c.remove());
        l.children().length > 0 ? $("#siebui-ecfg-messages").addClass("siebui-ecfg-messages-highlight") : $("#siebui-ecfg-messages").removeClass("siebui-ecfg-messages-highlight"), r = e.GetChildByType("Message"), r !== null && typeof r != "undefined" && showMessage.call(this, r), arrangeMsg.call(this)
    }

    function setFieldValue(e, t, n, r) {
        var i = this.GetPM().Get("ControlPS"),
            s = $("#" + jqSelector(n)),
            o = i.GetChildByType(e),
            u = o.GetChildByType("Domain");
        u !== null && typeof u != "undefined" && (o = u);
        var a = o.GetProperty("Parent Path"),
            f = o.GetProperty("Parent Product Id"),
            l = s.find(":input").val(),
            c = o.GetProperty("Port Item Id"),
            h = CCFMiscUtil_CreatePropSet();
        h.SetProperty("Port Item Id", c), h.SetProperty("Path", r), h.SetProperty("CfgFieldName", t), h.SetProperty("FieldValue", l), h.SetProperty("RequestType", "SetFieldValue"), h.SetProperty("Parent Path", a), h.SetProperty("Parent Product Id", f), h.SetProperty("Type", "CfgFieldList");
        var p = h.EncodeAsString(),
            d = "SubmitRequest_" + p;
        this.GetPM().SetProperty("QEDirtyFlag", !0), this.GetPM().ExecuteMethod("SubmitWithFrame", d, "HiddenFrame")
    }

    function _NewHeaderImage() {
        var e = this.GetPM().Get("NewHeaderImage"),
            t = "img_product_header",
            n = $("#" + jqSelector(t));
        n.attr("src", e)
    }

    function _RefreshSpanInnerHTML() {
        var e = this.GetPM().Get("RefreshSpanInnerHTML"),
            t = $("div[id$=" + jqSelector(this.GetPM().Get("GetName")) + "]");
        t.empty().append(e)
    }

    function _ShowConflict() {
        var propSet = this.GetPM().Get("ShowConflict"),
            func = propSet.GetProperty("CfgJSUpdateConflict");
        func += '.call( this, "" );', eval(func)
    }

    function _CfgPreShowUI() {
        var e = "Simple",
            t = $("[name=cxThreadObject]");
        for (var n = 0; n < t.length; n++) {
            var r = t.eq(n);
            n !== 0 && r.replaceWith("&gt;&gt;")
        }
        $("[name=cxThreadObject]").remove(), $("[id^=cxGrid]").length > 0 ? e = "GridLayout" : $("#cxMenu").length > 0 && (e = "Menu");
        switch (e) {
            case "GridLayout":
                _ShowCfgGTGridLayout.call(this);
                break;
            case "Menu":
                _ShowCfgMenuLayout.call(this);
                break;
            case "Summary":
            default:
        }
    }

    function _CfgShowUI() {
        var e = this.GetPM().Get("ControlPS"),
            t = this.GetPM().Get("TemplateVariables"),
            n = null,
            r = $("[name=cxRuntimeParam]");
        for (var i = r.length; i > 0; i--) r.eq(i - 1).replaceWith($.trim(r.eq(i - 1).text()));
        if ($("#imageHolder").find("img").attr("src") === "") {
            var s = this.GetPM().Get("NewHeaderImage");
            if (typeof s == "undefined" || s === null || s === "") s = "images/hm_pg_subscribe.gif";
            $("#imageHolder").find("img").attr("src", s)
        }
        var o = $("[name=cxMultiLevelChildList]");
        for (var i = 0; i < o.length; i++) {
            var u = o.eq(i);
            u.find("[name=childlist]").eq(0).children().length > 0 ? u.show() : u.remove()
        }
        var a = $(".siebui-ecfg-multilevel-expand-ctrl");
        for (var i = 0; i < a.length; i++) {
            var f = a.eq(i);
            f.attr("src", _cfgImageMapping.Collapse.src), f.bind("click", {
                ctx: this
            }, function(e) {
                var t = $(e.target).closest(".siebui-ecfg-products").find(".siebui-ecfg-feature-group");
                t.is(":visible") ? (t.hide(), $(e.target).attr("src", _cfgImageMapping.Expand.src)) : (t.show(), $(e.target).attr("src", _cfgImageMapping.Collapse.src))
            })
        }
        var l = $("[name=cxTemplateVariable]");
        for (var i = 0; i < l.length; i++) {
            var c = l.eq(i).attr("varName"),
                h = l.eq(i).text();
            t[c] = h
        }
        if (utils.IsTrue(SiebelApp.S_App.IsAutoOn()) === !0) {
            var p = $("[id=CxLnkItmName]"),
                d = $("[id=CxLnkItmValue]");
            for (var i = 0; i < p.length; i++) p.eq(i).attr("ot", "Label"), p.eq(i).attr("rn", "CxLnkItmName" + i), p.eq(i).attr("un", "CxLnkItmName" + i);
            for (var i = 0; i < d.length; i++) d.eq(i).attr("ot", "Label"), d.eq(i).attr("rn", "CxLnkItmValue" + i), d.eq(i).attr("un", "CxLnkItmValue" + i);
            var v = $(".siebui-ecfg-bill").find("[name=PriceLabel]");
            for (var i = 0; i < v.length; i++) v.eq(i).attr("ot", "Label"), v.eq(i).attr("rn", v.eq(i).html()), v.eq(i).attr("un", v.eq(i).html());
            var m = $("[name=CxHeaderTitle]");
            for (var i = 0; i < m.length; i++) m.eq(i).attr("ot", "Label"), m.eq(i).attr("rn", m.eq(i).text().trim()), m.eq(i).attr("un", m
                .eq(i).text().trim());
            var g = $("[id=CxResourceName]"),
                y = $("[id=CxResourceValue]");
            for (var i = 0; i < g.length; i++) g.eq(i).attr("ot", "Label"), g.eq(i).attr("rn", "CxResourceName" + i), g.eq(i).attr("un", "CxResourceName" + i);
            for (var i = 0; i < y.length; i++) y.eq(i).attr("ot", "Label"), y.eq(i).attr("rn", "CxResourceValue" + i), y.eq(i).attr("un", "CxResourceValue" + i);
            var b = $("[name=CxProductGroup]");
            for (var i = 0; i < b.length; i++) typeof b.eq(i).attr("ot") == "undefined" && (b.eq(i).attr("ot", "Label"), b.eq(i).attr("rn", b.eq(i).text().trim()), b.eq(i).attr("un", b.eq(i).text().trim()))
        }
        this.CfgPreShowUI();
        for (var w = !0; n = e.EnumChildren(w); w = !1) {
            var E = n.GetProperty("Show");
            if (typeof E != "undefined") {
                var S = $.trim(E.slice(0, E.indexOf("("))),
                    x = $.trim(E.slice(E.indexOf("(") + 1, E.lastIndexOf(")")));
                this.CfgShowControl(S, x)
            }
        }
        var T = "",
            N = "";
        for (var w = !0;
            (T = e.EnumProperties(w)) !== null; w = !1) {
            N = e.GetProperty(T);
            switch (T) {
                case "SetDeferUpdate":
                    N === "Y" && this.GetPM().SetProperty("DeferUpdate", !0);
                    break;
                case "SetQuickEdit":
                    N === "Y" && this.GetPM().SetProperty("IsQuickEdit", !0);
                    break;
                case "SetQuickEditButtonID":
                    N !== "" && this.GetPM().Get("IsQuickEdit") === !0 && this.GetPM().SetProperty("QEButtonId", N);
                    break;
                default:
            }
        }
        if (this.GetPM().Get("IsQuickEdit") === !0) {
            var C = this.GetPM().Get("QEButtonId"),
                k = this.GetPM().Get("QEButtonOffText"),
                L = this.GetPM().Get("QEButtonOnText"),
                A = $("#" + jqSelector(C));
            A.length > 0 && (this.GetPM().Get("EngineState") === !1 ? A.find(":input").text(L) : A.find(":input").text(k))
        }
        $(".siebui-ecfg-product-details #CfgObjDetails").hide(), $("#siebui-ecfg-toggleProdDetails").bind("click", {
            ctx: this
        }, function(e) {
            setTimeout(function() {
                toggleProdDetails.call(e.data.ctx)
            }, 0)
        }), this.InjectAutomationAttr($("#siebui-ecfg-toggleProdDetails")), $("#CfgMsgToggleBtn").bind("click", {
            ctx: this
        }, function(e) {
            setTimeout(function() {
                toggleCfgMessages.call(e.data.ctx)
            }, 0)
        }), this.InjectAutomationAttr($("#CfgMsgToggleBtn")), $("body").css("cursor", "default"), this.GetPM().Get("CfgScrollTop") !== "" && $("body").scrollTop(this.GetPM().Get("CfgScrollTop"));
        if (this.GetPM().Get("CfgAnchorId") != "" && this.GetPM().Get("CfgActiveElement") !== "") {
            var O = $("[name=" + jqSelector(this.GetPM().Get("CfgActiveElement")) + "]");
            if (O.length > 0)
                for (var i = 0; i < O.length; i++) {
                    var M = O.eq(i);
                    ((M.attr("type") === "radio" || M.attr("type") === "checkbox") && M.prop("checked") === !0 || M.attr("type") === "text") && M.focus()
                } else O = $("[id=" + jqSelector(this.GetPM().Get("CfgActiveElement")) + "]"), O.eq(0).focus()
        }
        this.GetPM().SetProperty("CfgAnchorId", ""), this.GetPM().SetProperty("CfgActiveElement", "");
        var _ = $("#siebui-ecfg-toggle-prod-info");
        if (_.length !== 0 && $("#siebui-ecfg-toggle-btn").length === 0) {
            if (utils.IsTrue(SiebelApp.S_App.IsAutoOn())) {
                var D = siebConsts.get("SWE_PROP_AUTOM_RN"),
                    P = siebConsts.get("SWE_PROP_AUTOM_OT"),
                    H = siebConsts.get("SWE_PROP_AUTOM_UN"),
                    B = "" + P + "='button' " + D + "='ecfgToggle' " + H + "='ecfgToggle'";
                $("#cfgRightContent").prepend('<span class="siebui-icon-close-circle siebui-cfg-info-close" ' + P + '="button" ' + D + '="cfgInfoClose" ' + H + '="cfgInfoClose"></span>')
            }
            _.append(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                id: "siebui-ecfg-toggle-btn",
                type: consts.get("SWE_PST_BUTTON_CTRL"),
                className: "siebui-icon-toggle",
                attrs: B
            }))
        }
        this.CfgShowUI()
    }

    function _ShowExplanation() {
        var e = this.GetPM().Get("ShowExplanation"),
            t = "",
            n, r, i, s, o;
        t = e.GetProperty("ClearExplanation"), n = e.GetChildByType("Explanations");
        if (n !== null) {
            i = n.GetPropertyCount(), s = "", r = $("#CfgExplanationSpan");
            if (r.length > 0) {
                r.empty();
                for (var u = 0; u < i; u++) {
                    var a = utils.IsTrue(SiebelApp.S_App.IsAutoOn()) ? "un='CfgExplanation" + u + "'" + " rn='CfgExplanation" + u + "'" + " ot='Text'" : "";
                    s = $(generateCfgHTMLMarkup({
                        type: "div",
                        className: "div-table-row listRowOff"
                    })).append($(generateCfgHTMLMarkup({
                        type: "div",
                        className: "div-table-col Row",
                        attrs: a
                    })).append(n.GetProperty("Expl" + u))), r.append(s)
                }
            }
            toggleExplanationPage.call(this, !0)
        } else t === "Y" && toggleExplanationPage.call(this, !1)
    }

    function _ShowMessage() {
        var e = this.GetPM().Get("ShowMessage"),
            t = CCFMiscUtil_CreatePropSet();
        t.DecodeFromString(e), showMessage.call(this, t), arrangeMsg.call(this)
    }

    function _ShowMessageDlg() {
        var e = this.GetPM().Get("ShowMessageDlg"),
            t = CCFMiscUtil_CreatePropSet();
        t.DecodeFromString(e), showMessage.call(this, t), arrangeMsg.call(this), $("#CfgTip").html($("#SPAN_CfgSignal").html()), $(function() {
            $("#CfgTip").find("#CfgSignal").dialog({
                resizable: !1,
                height: "auto",
                width: "auto",
                modal: !0,
                buttons: {
                    OK: function() {
                        $(this).dialog("close")
                    }
                }
            })
        })
    }

    function _UpdateCanInvoke() {
        var e = this.GetPM().Get("UpdateCanInvoke"),
            t = null,
            n = !0,
            r = "",
            i = 0,
            s = "",
            o = 0,
            u = "",
            a = null,
            f = "",
            l = "",
            c = "",
            h = null;
        for (n = !0;
            (f = e.EnumProperties(n)) !== null; n = !1) {
            r = "", s = "", h = null, c = f;
            if (c !== "") {
                var p = c + _underscore + "LINK",
                    d = $("#" + jqSelector(p));
                s = e.GetProperty(f);
                if (d.attr("type") === "button") s !== "" ? (d.removeAttr("disabled"), d.attr("class", "appletButton")) : (d.attr("disabled", "disabled"), d.attr("class", "appletButtonDis"));
                else if (s !== "") {
                    var p = "",
                        v = "";
                    h = $("#" + jqSelector(c));
                    if (h.length > 0) {
                        r = h.html(), p = c + _underscore + "LINK";
                        var m = $(generateCfgHTMLMarkup({
                            type: "a",
                            id: p
                        })).append(r);
                        m.appendTo(h);
                        var g = u,
                            y = s,
                            b = "linkMethod";
                        m.bind("click", {
                            ctx: this,
                            ctrlId: g,
                            ctrlStr: y,
                            ctrlType: b
                        }, function(e) {
                            setTimeout(function() {
                                processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                            }, 0)
                        }), this.InjectAutomationAttr(h, c), h.attr("class") === "minibuttonOff" && h.attr("class", "minibuttonOn")
                    }
                } else h = $("#" + jqSelector(c + _underscore + "LINK")), h.length > 0 && h.remove(), h = $("#" + jqSelector(c)), h.attr("class") === "minibuttonOn" && h.attr("class", "minibuttonOff")
            }
        }
    }

    function _UpdateExcludedItems() {
        var propSet = this.GetPM().Get("UpdateExcludedItems"),
            bGetFirst = !0,
            exclItemPS = null,
            updateExclusion = "",
            updateFunction = "";
        for (bGetFirst = !0; exclItemPS = propSet.EnumChildren(bGetFirst); bGetFirst = !1) updateFunction = updateExclusion = "", updateExclusion = exclItemPS.GetProperty("CfgJSUpdateExclusion"), updateExclusion !== "" && eval("typeof (" + updateExclusion + ")") === "function" && (updateFunction = updateExclusion + ".call( this, exclItemPS );", eval(updateFunction))
    }

    function _UpdateGenerics() {
        var e = this.GetPM().Get("UpdateGenerics"),
            t = generateCfgImageMarkup
            .call(this, "Required"),
            n = this.GetPM().Get("TemplateVariables")._blackBullet,
            r = null,
            i = null,
            s = null,
            o = null,
            u = !0,
            a, f, l;
        r = e.GetChildByType("Add");
        if (r !== null)
            for (u = !0;
                (a = r.EnumProperties(u)) !== null; u = !1) f = r.GetProperty(a), f !== null && (l = $("#" + jqSelector(a)), l.length > 0 && l.empty().append(t));
        s = e.GetChildByType("Delete");
        if (s !== null)
            for (u = !0;
                (a = s.EnumProperties(u)) !== null; u = !1) f = s.GetProperty(a), f !== null && (l = $("#" + jqSelector(a)), l.length > 0 && l.empty());
        i = e.GetChildByType("AddChildren");
        if (i !== null)
            for (u = !0;
                (a = i.EnumProperties(u)) !== null; u = !1) f = i.GetProperty(a), f !== null && (l = $("#MENUBUTTON_" + jqSelector(a)), l.length > 0 && (typeof n != "undefined" && n !== "" ? l.find("img").replaceWith(n) : l.find("img").replaceWith(t)));
        o = e.GetChildByType("DeleteChildren");
        if (o !== null)
            for (u = !0;
                (a = o.EnumProperties(u)) !== null; u = !1) f = o.GetProperty(a), f !== null && (l = $("#MENUBUTTON_" + jqSelector(a)), l.length > 0 && l.find("img").attr("src", _cfgImageMapping.GreenBullet.src))
    }

    function _UpdateQuickEdit() {
        var e = this.GetPM(),
            t = e.Get("QEButtonId"),
            n = e.Get("QEButtonOffText"),
            r = e.Get("QEButtonOnText"),
            i = e.Get("IsQuickEdit"),
            s = e.Get("EngineState"),
            o = "",
            u = $("#" + jqSelector(t));
        if (u.length == 0) return;
        o = u.text(), s === !1 ? (u.find(":input").text(n), e.SetProperty("QEDirtyFlag", !1), e.SetProperty("EngineState", !0)) : (u.find(":input").text(r), e.SetProperty("EngineState", !1))
    }

    function _UpdateResources() {
        var e = this.GetPM().Get("UpdateResources"),
            t = !0,
            n, r, i;
        for (t = !0;
            (n = e.EnumProperties(t)) !== null; t = !1) r = e.GetProperty(n), r !== null && (i = $("#GRPITEM" + jqSelector(_pipe + n)), i.length > 0 && i.html(r))
    }

    function _UpdateRootProdInfo() {
        var e = this.GetPM().Get("UpdateRootProdInfo"),
            t = !0,
            n, r, i;
        for (t = !0;
            (n = e.EnumProperties(t)) !== null; t = !1) r = e.GetProperty(n), r !== null && (i = $("#" + jqSelector("GRPITEM" + _pipe + n)), i.length > 0 && i.html(r), n === "Top RequireMoreChild" && this.GetPM().SetProperty("TopRequireMoreChild", r))
    }

    function _UpdateSelectionInfo() {
        var propSet = this.GetPM().Get("UpdateSelectionInfo"),
            selectionInfoPS;
        for (var bGetFirst = !0; selectionInfoPS = propSet.EnumChildren(bGetFirst); bGetFirst = !1) {
            var updateFunction = selectionInfoPS.GetProperty("CfgJSUpdateSelection");
            updateFunction !== "" && eval("typeof (" + updateFunction + ")") === "function" && (updateFunction += ".call ( this, selectionInfoPS );", eval(updateFunction))
        }
    }

    function _UpdateSelectionInfoForAttribute(e) {
        var e = this.GetPM().Get("UpdateSelectionInfoForAttribute");
        updateSelectionInfoForAttribute.call(this, e)
    }

    function _UpdateSignal() {
        var propSet = this.GetPM().Get("UpdateSignal"),
            nChildCount = propSet.GetChildCount(),
            sigPropSet = null,
            updateFunction = "",
            updateSig = "";
        for (var i = 0; i < nChildCount; i++) sigPropSet = null, sigPropSet = propSet.GetChild(i), sigPropSet !== null && (updateFunction = updateSig = "", updateSig = sigPropSet.GetProperty("CfgJSUpdateSignal"), updateSig !== "" && (updateFunction = updateSig + ".call( this, sigPropSet );", eval(updateFunction)))
    }

    function showPortItemsWithAttr(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = t.GetChildByType(e);
        if (n) {
            var r = this.GetPM(),
                t = r.Get("ControlPS"),
                i = r.Get("GrandChildAttrArray"),
                s = r.Get("GrandChildAttrRowIdArray"),
                o = n.GetProperty("Path"),
                u = n.GetProperty("Parent Path") + _underscore + "PORTITEM" + _pipe + n.GetProperty("Port Item Id"),
                a = null,
                f = "",
                l = null,
                c = null,
                h, p, d;
            showPortItems.call(this, e), d = $("#" + jqSelector(u + _underscore + "FIELDHEADER")), a = i[n.GetProperty("Port Item Id")];
            if (a !== null && typeof a != "undefined")
                for (var v = 0; v < a.length; v++) p = $("#" + jqSelector(u + _underscore + a[v])), p.length === 0 && (p = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-col",
                    id: u + _underscore + a[v]
                })).append($(generateCfgHTMLMarkup({
                    type: "span",
                    className: "siebui-ecfg-header siebui-ecfg-domain-header"
                })).append(a[v])), p.appendTo(d));
            f = u + _underscore + "INTID" + _pipe + o, i[o] = s[o] = f, d = $("#" + jqSelector(f));
            if (d.length > 0 && a !== null && typeof a != "undefined")
                for (var v = 0; v < a.length; v++) {
                    var m = a[v].replace(/\"/g, "&quot;");
                    p = $(generateCfgHTMLMarkup({
                        type: "div",
                        className: "div-table-col"
                    })).append(generateCfgHTMLMarkup({
                        type: "span",
                        id: f + _underscore + m
                    })), p.appendTo(d)
                }
        }
    }

    function showTextBoxAttr(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = this.GetPM().Get("GrandChildAttrRowIdArray"),
            r = generateCfgImageMarkup.call(this, "Required"),
            i = generateCfgImageMarkup.call(this, "WhiteSpace"),
            s = t.GetChildByType(e),
            o = s.GetProperty("Attribute Display Name"),
            u = s.GetProperty("Parent Path"),
            a = s.GetProperty("RequireMoreChild"),
            f = "",
            l = $("#" + jqSelector(e));
        l.length > 0 && l.remove();
        var c = $("#" + jqSelector(n[u] + _underscore + o));
        c.attr("id", e), showTextBox.call(this, e), a === "Y" ? f = r : f = i, c.find(":input").parent().append($(generateCfgHTMLMarkup({
            type: "span",
            id: "GENERICS" + _pipe + e
        })).append(f))
    }

    function showComboAttr(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = this.GetPM().Get("GrandChildAttrRowIdArray"),
            r = generateCfgImageMarkup.call(this, "Required"),
            i = generateCfgImageMarkup.call(this, "WhiteSpace"),
            s = t.GetChildByType(e),
            o = s.GetProperty("Parent Path"),
            u = s.GetProperty("Attribute Display Name"),
            a = s.GetProperty("RequireMoreChild"),
            f = "",
            l = "",
            c = $("#" + jqSelector("SPAN_" + e));
        c.length > 0 && c.remove();
        var h = $("#" + jqSelector(n[o] + _underscore + u));
        h.attr("id", "SPAN_" + e), showCombo.call(this, e), a === "Y" ? f = r : f = i, h.find(":input").parent().append($(generateCfgHTMLMarkup({
            type: "span",
            id: "GENERICS" + _pipe + e
        })).append(f))
    }

    function showRadioAttr(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = this.GetPM().Get("GrandChildAttrRowIdArray"),
            r = generateCfgImageMarkup.call(this, "Required"),
            i = generateCfgImageMarkup.call(this, "WhiteSpace"),
            s = t.GetChildByType(e),
            o = s.GetProperty("Parent Path"),
            u = s.GetProperty("Attribute Display Name"),
            a = s.GetProperty("RequireMoreChild"),
            f = "",
            l = "",
            c = $("#" + jqSelector("SPAN_" + e));
        c.length > 0 && c.remove();
        var h = $("#" + jqSelector(n[o] + _underscore + u));
        h.attr("id", "SPAN_" + e), showRadio.call(this, e), a === "Y" ? f = r : f = i, h.find(":input").parent().append($(generateCfgHTMLMarkup({
            type: "span",
            id: "GENERICS" + _pipe + e
        })).append(f))
    }

    function applicantShowSelectAndOptions(e) {
        applicantShowSelectAndOptionsHelper.call(this, e, null, null)
    }

    function applicantShowSelectAndOptionsHelper(tableId, dispArray, dispFunction) {
        var controlPS = this.GetPM().Get("ControlPS"),
            element, tableElement, rowElement, colElement1, colElement2, colElement3, bGetFirst = !0,
            portPropSet = null,
            resultPropSet = null,
            inputId = "",
            optionId = "",
            portItemId = "",
            selectId = "",
            simpleSelectId = "",
            inputHTML = "",
            portDomainPropSet = null,
            portItemSpanId = "",
            i = 0,
            simpleSelectHTML = "",
            buttonElement = null;
        element = $("#" + jqSelector("SPAN_" + tableId)), tableElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table",
            id: tableId
        })), tableElement.appendTo(element), resultPropSet = controlPS.GetChildByType(tableId), resultPropSet.SetProperty("PortItemCount", "0"), rowElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row"
        })), rowElement.appendTo(tableElement), rowElement.hide(), colElement1 = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })), colElement1.appendTo(rowElement), colElement1 = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })), colElement1.appendTo(rowElement), portPropSet = resultPropSet.GetChildByType("Domain"), portItemId = portPropSet.GetProperty("Port Item Id"), optionId = tableId + _underscore + "PORTDOMAIN" + _pipe + "none", selectId = tableId + _underscore + "DOMAINSELECT", simpleSelectId = "SIMPLE" + selectId;
        var selectConfig = {
            id: selectId,
            options: []
        };
        for (bGetFirst = !0; portDomainPropSet = portPropSet.EnumChildren(bGetFirst); bGetFirst = !1) {
            var className = "",
                displayName = "",
                dispValArray = new Array,
                enable = "",
                excluded = "",
                prodId = "";
            portItemId = "", optionId = "", enable = portDomainPropSet.GetProperty("CxEnabled"), excluded = portDomainPropSet.GetProperty("Excluded"), prodId = portDomainPropSet.GetProperty("Product Id"), portItemId = portDomainPropSet.GetProperty("Port Item Id"), optionId = tableId + _underscore + "PORTDOMAIN" + _pipe + prodId, enable === "Y" ? className = "eCfgOptionAvailable" : className = "eCfgOptionExcluded";
            if (dispArray !== null && dispFunction !== null) {
                for (var iLen = 0; iLen < dispArray.length; iLen++) {
                    var temp = "";
                    temp = portDomainPropSet.GetProperty(dispArray[iLen]), temp === null || typeof temp == "undefined" ? dispValArray[iLen] = "" : dispValArray[iLen] = temp
                }
                var str = CCFMiscUtil_ArrayToString(dispValArray);
                str = str.replace(/\"/g, '\\"'), str = dispFunction + '.call( this, "' + str + '");', displayName = eval(str)
            } else displayName = portDomainPropSet.GetProperty("CxObjName");
            (excluded !== "Y" || enable === "Y") && selectConfig.options.push({
                id: tableId + _underscore + "PORTDOMAIN" + _pipe + prodId,
                value: "GRPITEM" + _pipe + tableId + _underscore + "PROD" + _pipe + prodId,
                className: enable === "Y" ? "eCfgOptionAvailable" : "eCfgOptionExcluded",
                displayValue: displayName
            });
            if (displayName === "Applicant" || displayName === "Applicant 1") simpleSelectHTML = SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                type: consts.get("SWE_CTRL_TEXT"),
                className: "hidden",
                id: simpleSelectId,
                value: "GRPITEM" + _pipe + tableId + _underscore + "PROD" + _pipe + prodId
            })
        }
        $(generateCfgSelectHTMLMarkup(selectConfig)).appendTo(colElement1), this.InjectAutomationAttr(colElement1.find("select"), tableId), inputId = tableId + _underscore + "DOMAININPUT", inputHTML = generateCfgOuterHTML($(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
            type: consts.get("SWE_CTRL_TEXT"),
            className: "hidden",
            id: inputId
        })).append(simpleSelectHTML)), buttonElement = $(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
            type: consts.get("SWE_PST_BUTTON_CTRL"),
            value: this.GetPM().ExecuteMethod("GetTemplateVarValue", "sAddItemLabel"),
            attrs: "title='" + this.GetPM().ExecuteMethod("GetTemplateVarValue", "sAddItemLabel") + "' "
        })), rowElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row"
        })), rowElement.appendTo(tableElement), colElement3 = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })), colElement3.appendTo(rowElement), colElement1 = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })), colElement1.appendTo(rowElement), colElement2 = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })), colElement2.appendTo(rowElement), element = $(inputHTML), element.appendTo(colElement2), buttonElement.appendTo(colElement3), buttonElement.bind("click", {
            ctx: this,
            ctrlId: inputId,
            ctrlStr: selectId,
            ctrlType: "SimpleAdd"
        }, function(e) {
            setTimeout(function() {
                applicantProcessInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
            }, 0)
        }), this.InjectAutomationAttr(element, tableId), portItemSpanId = tableId.replace(/PORT/, "PORTITEM"), element = $("#" + jqSelector("SPAN_" + portItemSpanId)), element.length > 0 && (tableElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table"
        })), tableElement.appendTo(element), rowElement = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row"
        })), rowElement.appendTo(tableElement), colElement1 = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-col"
        })), colElement1.appendTo(rowElement), colElement1.html(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table",
            id: portItemSpanId
        })))
    }

    function applicantProcessInput(e, t, n) {
        var r = this.GetPM().Get("DeferUpdate"),
            i, s = null;
        switch (n) {
            case "SimpleAdd":
                quantity = 1, i = $("#" + jqSelector(t)), s = getIdInfo(i.val()), tableId = s.GRPITEM + _underscore + "PORT" + _pipe + s.PORT, i = $("#" + jqSelector(tableId + _underscore + "PORTDOMAIN" + _pipe + "none")), i.length > 0 && i.prop("selected", !0), s.PROD !== "none" && (this.GetPM().ExecuteMethod("AddItemMin", "Y", tableId, s.PROD, quantity), r && this.GetPM().ExecuteMethod("ProcessInteractPropSet"));
                break;
            case "RemoveApplicant":
                s = getIdInfo(t);
                var o = s.GRPITEM + _underscore + "PORTITEM" + _pipe + s.PORTITEM + _underscore + "INTID" + _pipe + s.INTID;
                this.GetPM().ExecuteMethod("SetItemQuantity", o, s.INTID, 0);
                break;
            default:
                processInput.call(this, e, t, n)
        }
    }

    function applicantShowPortItems(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = "",
            r = "",
            i = 0,
            s = t.GetChildByType(e),
            o = CCFMiscUtil_CreatePropSet(),
            u = s.GetProperty("FieldList");
        o.DecodeFromString(u);
        var a, f, l = 0,
            c = 0;
        r = s.GetProperty("Parent Path") + _underscore + "PORTITEM" + _pipe + s.GetProperty("Port Item Id"), n = s.GetProperty("Parent Path") + _underscore + "PORT" + _pipe + s.GetProperty("Port Item Id"), a = $("#" + jqSelector(r)), comboAddPS = t.GetChildByType(n), i = comboAddPS.GetProperty("PortItemCount") === "NaN" ? "0" : comboAddPS.GetProperty("PortItemCount").toString(), i === "0" && (f = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row siebui-ecfg-th",
            id: r + _underscore + "FIELDHEADER"
        })), f.appendTo(a), displayFieldHeader.call(this, f, o)), i++, comboAddPS.SetProperty("PortItemCount", i), applicantAddPortItem.call(this, r, s)
    }

    function applicantAddPortItem(e, t) {
        var n = generateCfgImageMarkup.call(this, "Delete"),
            r = "",
            i = "",
            s = "",
            o = "",
            u = 0,
            a, f, l;
        a = $("#" + jqSelector(e));
        if (a.length === 0) return;
        var c = CCFMiscUtil_CreatePropSet(),
            h = t.GetProperty("FieldList");
        c.DecodeFromString(h), o = t.GetProperty("Product Id"), s = t.GetProperty("Path"), u = t.GetProperty("Quantity"), i = t.GetProperty("RequireMoreChild"), r = t.GetProperty("Description"), f = $(generateCfgHTMLMarkup({
            type: "div",
            className: "div-table-row",
            id: e + _underscore + "INTID" + _pipe + s
        })), f.appendTo(a), inputValue = SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
            type: consts.get("SWE_CTRL_TEXT"),
            className: "hidden",
            value: u
        }), createNewField.call(this, f, e, _underscore + "INTID" + _pipe, s, "", "Quantity", inputValue, c);
        var p = e + _underscore + "INTID" + _pipe + s + _underscore + "FIELD" + _pipe + "Quantity",
            d = p,
            v = "GRPITEM" + _pipe + e + _underscore + "INTID" + _pipe + s,
            l = $("#" + jqSelector(p));
        if (l.length > 0) {
            var m = l.find(":input");
            m.bind("change", {
                ctx: this,
                ctrlId: d,
                ctrlStr: v,
                ctrlType: "portitem"
            }, function(e) {
                setTimeout(function() {
                    processInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
                }, 0)
            }), this.InjectAutomationAttr(m, e + _underscore + "INTID" + _pipe + s)
        }
        displayFieldList.call(this, f, _underscore + "INTID" + _pipe, t.GetType(), c, t, "N"), inputValue = generateCfgOuterHTML($(generateCfgHTMLMarkup({
            type: "a"
        })).append(n)), createNewField.call(this, f, e, _underscore + "INTID" + _pipe, s, "", "Remove", inputValue, c);
        var d = e + _underscore + "INTID" + _pipe + s + _underscore + "FIELD" + _pipe + "Remove",
            v = "GRPITEM" + _pipe + e + _underscore + "INTID" + _pipe + s,
            g = "RemoveApplicant",
            p = e + _underscore + "INTID" + _pipe + s + _underscore + "FIELD" + _pipe + "Remove";
        $("#" + jqSelector(p)).find("a").bind("click", {
            ctx: this,
            ctrlId: d,
            ctrlStr: v,
            ctrlType: g
        }, function(e) {
            setTimeout(function() {
                applicantProcessInput.call(e.data.ctx, e.data.ctrlId, e.data.ctrlStr, e.data.ctrlType)
            }, 0)
        }), this.InjectAutomationAttr($("#" + jqSelector(p)).find("a"), e)
    }

    function applicantShowPortItemsWithAttr(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = this.GetPM().Get("GrandChildAttrArray"),
            r = this.GetPM().Get("GrandChildAttrRowIdArray"),
            i = t.GetChildByType(e);
        if (i === null || typeof i == "undefined") return;
        var s = i.GetProperty("Path"),
            o = i.GetProperty("Parent Path") + _underscore + "PORTITEM" + _pipe + i.GetProperty("Port Item Id"),
            u = "",
            a = "",
            f, l, c;
        applicantShowPortItems.call(this, e), l = $("#" + jqSelector(o + _underscore + "FIELDHEADER")), u = n[i.GetProperty("Port Item Id")];
        if (u !== null && typeof u != "undefined")
            for (var h = 0; h < u.length; h++) c = $("#" + jqSelector(o + _underscore + u[h])), c.length === 0 && (c = $(generateCfgHTMLMarkup({
                type: "div",
                className: "div-table-col",
                id: o + _underscore + u[h]
            })).append($(generateCfgHTMLMarkup({
                type: "span",
                className: "siebui-ecfg-header siebui-ecfg-domain-header"
            })).append(u[h])), c.insertBefore(l.children().last()));
        a = o + _underscore + "INTID" + _pipe + s, r[s] = a, l = $("#" + jqSelector(a));
        if (l.length > 0 && u !== null && typeof u != "undefined")
            for (var h = 0; h < u.length; h++) {
                var p = u[h].replace(/\"/g, "&quot;");
                c = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "div-table-col"
                })).append(generateCfgHTMLMarkup({
                    type: "span",
                    id: a + _underscore + p
                })), c.insertBefore(l.children().last())
            }
    }

    function applicantUpdatePortItemsForComboAdd(e) {
        applicantUpdatePortItemsForComboAddHelper.call(this, e), checkForceRefresh.call(this, e, !0, !0)
    }

    function applicantUpdatePortItemsForComboAddAttr(e) {
        applicantUpdatePortItemsForComboAddHelper.call(this, e), checkForceRefresh.call(this, e, !0, !1)
    }

    function applicantUpdatePortItemsForComboAddHelper(e) {
        var t = this.GetPM().Get("ControlPS"),
            n = null,
            r = null,
            i = null,
            s = null,
            o = !0,
            u = 0,
            a = "",
            f = "",
            l = "",
            c = "",
            h = "",
            p = "",
            d = null,
            v = null,
            m = 0,
            g = null,
            y = "",
            b = "",
            w = null,
            E, S;
        b = e.GetType(), i = t.GetChildByType(b), b = b.replace(/PORT/, "PORTITEM"), u = i.GetProperty("PortItemCount") === "NaN" ? "0" : i.GetProperty("PortItemCount").toString(), n = e.GetChildByType("Add");
        if (n !== null)
            for (o = !0; v = n.EnumChildren(o); o = !1) y = v.GetProperty("Path"), v.SetType(b + _underscore + "INTID" + _pipe + y), t.AddChild(v), applicantAddPortItem.call(this, b, v), o === !0 && (w = v), u++;
        g = e.GetChildByType("Modify");
        if (g !== null)
            for (o = !0; v = g.EnumChildren(o); o = !1) {
                var x = null;
                a = v.GetProperty("Name"), l = v.GetProperty("Path"), c = v.GetProperty("Port Item Id"), f = v.GetProperty("Value"), S = $("#" + jqSelector(b + _underscore + "INTID" + _pipe + l + _underscore + "FIELD" + _pipe + a));
                if (S.length > 0) {
                    var T = S.find(":input");
                    T.length > 0 ? T.val(f) : S.html(f)
                }
            }
        s = e.GetChildByType("Delete");
        if (s !== null)
            for (o = !0; v = s.EnumChildren(o); o = !1) {
                p = l = c = "";
                var N = "";
                l = v.GetProperty("Path"), c = v.GetProperty("Port Item Id"), p = b + _underscore + "INTID" + _pipe + l, deletePortItem.call(this, b, p);
                var N = -1,
                    C = t.childArray.length;
                for (var k = 0; k < C; k++) {
                    var L = t.childArray[k];
                    if (L.type === p) {
                        N = k;
                        break
                    }
                }
                t.RemoveChild(N), u--
            }
        i.SetProperty("PortItemCount", u);
        if (u > 0) {
            d = $("#" + jqSelector(b + _underscore + "FIELDHEADER"));
            if (d.length === 0) {
                E = $("#" + jqSelector(b));
                if (E.length > 0) {
                    d = $(generateCfgHTMLMarkup({
                        type: "div",
                        className: "div-table-row siebui-ecfg-th",
                        id: b + _underscore + "FIELDHEADER"
                    })), E.children().size() !== 0 && d.prependTo(E);
                    var A = CCFMiscUtil_CreatePropSet(),
                        O = w.GetProperty("FieldList");
                    A.DecodeFromString(O), displayFieldHeader.call(this, d, A)
                }
            }
            d.show()
        } else d = $("#" + jqSelector(b + _underscore + "FIELDHEADER")), d.length > 0 && d.hide()
    }

    function _ShowCfgGTGridLayout() {
        function W(e, t) {
            var n = "",
                u = new Array;
            return n = e.substring(e.indexOf("{") + 1, e.indexOf("}")), u = n.split(","), u.length !== 2 ? !1 : (r = parseInt(u[0]), i = parseInt(u[1]), r < 1 || i < 1 || i > m ? !1 : (n = t.substring(t.indexOf("{") + 1, t.indexOf("}")), u = n.split(","), u.length !== 2 ? !1 : (s = parseInt(u[0]), o = parseInt(u[1]), s < 1 || o < 1 || o > m ? !1 : r > s || i > o ? !1 : !0)))
        }

        function X() {
            var e = !1,
                t = f,
                n = l;
            while (!e) {
                if (typeof h[t - 1] == "undefined") {
                    e = !0;
                    break
                }
                for (var u = 0; u < h[t - 1].length; u++) {
                    if (h[t - 1][u].iEnd <= n) continue;
                    if (h[t - 1][u].iStart - n > 1) {
                        e = !0;
                        break
                    }
                    n = h[t - 1][u].iEnd
                }
                if (!e) {
                    if (n < m) {
                        e = !0;
                        break
                    }
                    t++, n = 0
                }
            }
            r = s = t, i = o = n + 1
        }

        function V() {
            if (r < f || r === f && i <= l) return !0;
            if (typeof h[r - 1] != "undefined")
                for (var e = 0; e < h[r - 1].length; e++) {
                    var t = h[r - 1][e].iStart,
                        n = h[r - 1][e].iEnd;
                    if (i <= t && o >= t && o <= n || o >= n && i >= t && i <= n || i >= t && o <= n || i <= t && o >= n) return !0
                }
            return !1
        }

        function J() {
            (!c || V.call(this)) && X.call(this), u = s - r + 1, a = o - i + 1
        }

        function K(e, t) {
            this.iStart = e, this.iEnd = t
        }

        function Q(e, t) {
            return e.iStart - t.iStart
        }

        function G() {
            for (var e = 0; e < u; e++) {
                typeof h[f + e - 1] == "undefined" && (h[f + e - 1] = new Array);
                var t = new K(i, o);
                h[f + e - 1].push(t), h[f + e - 1].sort(Q)
            }
            l = o
        }

        function Y(e, t, n, r, i) {
            var s = "";
            return n = typeof n == "undefined" ? "" : n, r = typeof r == "undefined" ? "" : r, s = "<td class='" + n + "' rowspan='" + e + "' colspan='" + t + "'><div id='eCfgGroupGridLayoutJS_OUI_Cell" + r + "'></div>", i !== null && i !== undefined && i !== "" && $("#eCfgGroupGridLayoutJS_OUI_Child_" + i).eq(0).attr("data-buffer-id", r), s
        }

        function Z(e, t) {
            var n = "",
                r = 1;
            while (f < e) {
                if (typeof h[f - 1] == "undefined") n += Y.call(this, 1, m), n = n.slice(0, n.lastIndexOf("<div")), n += "&nbsp;</TD>";
                else {
                    for (var i = 0; i < h[f - 1].length; i++) {
                        if (h[f - 1][i].iEnd <= l) continue;
                        r = h[f - 1][i].iStart - l - 1, r > 0 && (n += Y.call(this, 1, r), n = n.slice(0, n.lastIndexOf("<div")), n += "&nbsp;</TD>"), l = h[f - 1][i].iEnd
                    }
                    r = m - l, r > 0 && (n += Y.call(this, 1, r), n = n.slice(0, n.lastIndexOf("<div")), n += "&nbsp;</TD>")
                }
                n += "</tr><tr>", f++, l = 0
            }
            if (typeof h[f - 1] == "undefined") r = t - l - 1, r > 0 && (n += Y.call(this, 1, r), n = n.slice(0, n.lastIndexOf("<div")), n += "&nbsp;</TD>", l = t - 1);
            else {
                for (var i = 0; i < h[f - 1].length; i++) {
                    if (h[f - 1][i].iEnd <= l) continue;
                    if (h[f - 1][i].iStart > t) break;
                    r = h[f - 1][i].iStart - l - 1, r > 0 && (n += Y.call(this, 1, r), n = n.slice(0, n.lastIndexOf("<div")), n += "&nbsp;</TD>"), l = h[f - 1][i].iEnd
                }
                r = t - l - 1, r > 0 && (n += Y.call(this, 1, r), n = n.slice(0, n.lastIndexOf("<div")), n += "&nbsp;</TD>", l = t - 1)
            }
            return n
        }
        if ($("[id^=cxGrid]").length === 0) return;
        var e = $("[id=eCfgGroupGridLayoutJS_OUI_Canvas]").closest("[id=cxStd]");
        for (var t = 0; t < e.length; t++) {
            var n = e.eq(t),
                r = 1,
                i = 1,
                s = 1,
                o = 1,
                u = 1,
                a = 1,
                f = 1,
                l = 0,
                c = !0,
                h = new Array,
                p = 0,
                d = "",
                v = n.find("#cxGridNumofCol"),
                m = v.length === 0 ? 0 : v.html() === "" ? 4 : parseInt(v.html()),
                g = new Array,
                y = n.find("[id=cxGridChildParams]");
            for (var b = 0; b < y.length; b++) {
                var w = y[b],
                    E = new Array,
                    S = $(w).children("[id=cxChildId]").html(),
                    x = $(w).children("[id=cxGridBegin]").html(),
                    T = $(w).children("[id=cxGridEnd]").html(),
                    N = $(w).children("[id=cxCellClass]").html(),
                    C = $(w).children("[id=cxRelatedCtrl]").html();
                E.ChildId = S, E.GridBegin = x, E.GridEnd = T, E.CellClass = N, E.RelatedCtrl = C, E.Sequence = b, g.push(E), n.find("[id=eCfgGroupGridLayoutJS_OUI_Child]").eq(0).attr("id", "eCfgGroupGridLayoutJS_OUI_Child_" + b)
            }
            g.sort(function(e, t) {
                var n = e.GridBegin.indexOf(","),
                    r, i;
                n > -1 && (r = parseInt(e.GridBegin.substring(1, n))), n = t.GridBegin.indexOf(","), n > -1 && (i = parseInt(t.GridBegin.substring(1, n)));
                if (r === i) {
                    n = e.GridEnd.indexOf(",");
                    var s, o, u = e.GridEnd.indexOf("}");
                    return n > -1 && (s = parseInt(e.GridEnd.substring(n + 1, u))), n = t.GridEnd.indexOf(","), n > -1 && (o = parseInt(t.GridEnd.substring(n + 1, u))), s < o ? -1 : s > o ? 1 : 0
                }
                return r < i ? -1 : r > i ? 1 : 0
            });
            for (var b = 0; b < g.length; b++) {
                var E = g[b],
                    S = E.ChildId,
                    x = E.GridBegin,
                    T = E.GridEnd,
                    N = E.CellClass,
                    C = E.RelatedCtrl,
                    k = E.Sequence,
                    L = !1,
                    A = parseInt(C);
                p === 0 && isNaN(A) === !1 && A > 1 && (L = !0, p = A);
                if (L || p === 0) c = W.call(this, x, T), J.call(this), d += Z.call(this, r, i);
                d += Y.call(this, u, a, N, b, k), (L || p === 0) && G.call(this), p > 0 && (L && (d += "<table>"), d += "<tr><td>"), p > 0 ? (d += "</td></tr>", p === 1 && (d += "</table></td>"), p--) : d += "</td>"
            }
            f <= h.length && (d += Z.call(this, h.length, m + 1));
            var O = generateCfgOuterHTML($(generateCfgHTMLMarkup({
                type: "tr"
            })).append(d));
            n.find("[id=eCfgGroupGridLayoutJS_OUI_Canvas]").replaceWith("<tr>" + d + "</tr>");
            var M = n.find("[id^=eCfgGroupGridLayoutJS_OUI_Child]"),
                _ = n.find("[id^=eCfgGroupGridLayoutJS_OUI_Cell]");
            M.sort(function(e, t) {
                var n = parseInt($(e).attr("data-buffer-id")),
                    r = parseInt($(t).attr("data-buffer-id"));
                return n - r
            });
            for (var b = 0; b < M.length; b++) _.eq(b).replaceWith(M.eq(b).html());
            n.find("[id=eCfgGroupGridLayoutJS_OUI_Buffer]").remove()
        }
        var D = $("[id=cxGridPortParams]"),
            P = this.GetPM().Get("GrandChildAttrArray");
        for (var b = 0; b < D.length; b++) {
            var H = D[b],
                B = $(H).children("[id=cxGridPortId]").html(),
                j = P[B];
            if (j === null || typeof j == "undefined") P[B] = new Array;
            var F = $(H).parent().children("[id=cxGridAttributeParams]");
            for (var I = 0; I < F.length; I++) {
                var q = F[I],
                    R = $(q).children("[id=cxGridAttributeAttName]").html();
                j = P[B];
                var U = !0;
                for (var z = 0; z < j.length; z++)
                    if (R === j[z]) {
                        U = !1;
                        break
                    } U && j.push(R)
            }
        }
    }

    function _ShowCfgMenuLayout() {
        var e = this.GetPM(),
            t = "#s_" + e.Get("GetFullId") + "_div",
            n = $(t).find('div[id="cxCfgMenuButtonHTMLTemplate"]').html();
        $(t).find('div[id="cxCfgHTMLTemplate"]').empty();
        var r = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CXP_UI_CUSTOMIZE"),
            i = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CXP_UI_EXPLANATION"),
            s = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CXP_UI_EDITFIELD"),
            o = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CXP_UI_REMOVE"),
            u = this.GetPM().Get("TemplateVariables");
        e.AddProperty("Menu_PositionInit", !1), e.AddProperty("Menu_CurrentRel", 1), e.AddProperty("Menu_VisibleRelArray", new Array), e.AddProperty("Menu_VisibleArrayIndex", 0), e.AddProperty("Menu_RelationshipMap", new Array), e.AddProperty("Menu_XPos", 0), e.AddProperty("Menu_YPos", 0), e.AddProperty("Menu_Height", 0), e.AddProperty("Menu_Width", 0), e.AddProperty("Menu_SummaryLink", ""), e.AddProperty("Menu_SummaryVisible", !1), e.AddProperty("Menu_ShowSummary", !1), e.AddProperty("Menu_Error", !1), e.AddProperty("Menu_HelpVisible", !1), e.AddProperty("Menu_CurrentVisible", 0), e.AddProperty("Menu_CurrentProduct", $("[name=cxCurrentProduct]").text()), e.AddProperty("Menu_Show", !1), e.AddProperty("Menu_StoredProduct", _menuGetProduct.call(this)), e.AddProperty("Menu_Counter", 0);
        var a = e.Get("Menu_PositionInit"),
            f = e.Get("Menu_CurrentRel"),
            l = e.Get("Menu_VisibleRelArray"),
            c = e.Get("Menu_VisibleArrayIndex"),
            h = e.Get("Menu_RelationshipMap"),
            p = e.Get("Menu_XPos"),
            d = e.Get("Menu_YPos"),
            v = e.Get("Menu_Height"),
            m = e.Get("Menu_Width"),
            g = e.Get("Menu_SummaryLink"),
            y = e.Get("Menu_SummaryVisible"),
            b = e.Get("Menu_ShowSummary"),
            w = e.Get("Menu_Error"),
            E = e.Get("Menu_HelpVisible"),
            S = e.Get("Menu_CurrentVisible"),
            x = e.Get("Menu_CurrentProduct"),
            T = e.Get("Menu_Show"),
            N = e.Get("Menu_StoredProduct"),
            C = e.Get("Menu_Counter");
        N !== x ? (_menuSetProduct.call(this, x), _menuSetCurrentVisible.call(this, 0)) : (S = _menuGetCurrentVisible.call(this), e.SetProperty("Menu_CurrentVisible", S));
        var k = $("[name=cxMenuVariable]");
        for (var L = 0; L < k.length; L++) {
            var A =
                k.eq(L).attr("varName"),
                O = k.eq(L).html();
            u[A] = O
        }
        C = 0;
        var M = $("[name=cxMenuGroup]");
        for (var L = 0; L < M.length; L++) {
            var _ = M.eq(L),
                D = _.find("[name=cxMenuGroupName]").html(),
                P = _.find("[name=cxIsCurrentGroup]").html(),
                H = _.find("[name=cxGroupId]").html();
            C++, e.SetProperty("Menu_Counter", C);
            if (D === "&nbsp;" || D === "" || D.indexOf("Summary") != -1)
                if (P === "N") {
                    var B = "ChangeCurrentObj",
                        j = CCFMiscUtil_CreatePropSet(),
                        F = "";
                    j.SetType("Group"), j.SetProperty("CxGroupId", H), F = j.EncodeAsString(), B = B + "_" + F, g = 'javascript:_menuChooseGroup.call( this, "' + B + '",' + f + ")", e.SetProperty("Menu_SummaryLink", g)
                } else b = !0, e.SetProperty("Menu_ShowSummary", b)
        }
        var I = $("[name=cxMenuRelationship]"),
            q = u._greenBullet,
            R = u._blackBullet;
        typeof q != "undefined" && q !== "" && (_cfgImageMapping.GreenBullet.src = $(q).attr("src")), typeof R != "undefined" && R !== "" && (_cfgImageMapping.BlackBullet.src = $(R).attr("src"));
        for (var L = 0; L < I.length; L++) {
            var U = I.eq(L),
                z = U.find("[name=cxMenuPort]");
            for (var W = 0; W < z.length; W++) {
                var X = z.eq(W),
                    V = X.parent().find("[id=eCfg_MenuProductThemeJS_PUI_1]").length === 0 ? !1 : !0,
                    J = $.trim(X.find("[name=sPortName]").html()),
                    K = $.trim(X.find("[name=sAttName]").html()),
                    Q = $.trim(X.find("[name=sPortId]").html()),
                    G = $.trim(X.find("[name=sHasChild]").html()),
                    Y = $.trim(X.find("[name=sGroupId]").html());
                if (J === "" && K === "" && Q === "") break;
                J === "" && (J = K, Q = K), Q !== "" && (h[Q] = f);
                if (V) {
                    l[c] = f, c++, e.SetProperty("Menu_VisibleRelArray", l), e.SetProperty("Menu_VisibleArrayIndex", c);
                    var Z = $(n);
                    Z.attr("id", "MENUBUTTON_" + Q), Z.find("a").html(J), Z.appendTo(X.parent()), X.parent().find("[id^=eCfg_MenuProductThemeJS_PUI]").empty(), Z.find("a").bind("click", {
                        ctx: this,
                        ctrlCurrentRel: f
                    }, function(e) {
                        setTimeout(function() {
                            _menuToggleContent.call(e.data.ctx, e.data.ctrlCurrentRel)
                        }, 0)
                    }), this.InjectAutomationAttr(Z.find("a"), "MENUBUTTON")
                } else {
                    var B = "ChangeCurrentObj",
                        j = CCFMiscUtil_CreatePropSet();
                    j.SetType("Group"), j.SetProperty("CxGroupId", Y), B = B + "_" + j.EncodeAsString();
                    var Z = $(n);
                    Z.attr("id", "MENUBUTTON_" + Q), Z.find("a").html(J), Z.appendTo(X.parent()), X.parent().find("[id^=eCfg_MenuProductThemeJS_PUI]").empty(), Z.find("a").bind("click", {
                        ctx: this,
                        ctrlName: B,
                        ctrlCurrentRel: f
                    }, function(e) {
                        setTimeout(function() {
                            _menuChooseGroup.call(e.data.ctx, e.data.ctrlName, e.data.ctrlCurrentRel)
                        }, 0)
                    }), this.InjectAutomationAttr(Z.find("a"), "MENUBUTTON")
                }(Q === null || Q === "undefined") && SiebelJS.Log("CFG MENU ALERT: PortId is UNDEFINED");
                var et = "MENUBUTTON_" + Q,
                    tt = $("#" + jqSelector(et));
                String(G).toUpperCase() === "N" || G === "No" ? $(q).prependTo(tt) : $(R).prependTo(tt), f++, e.SetProperty("Menu_CurrentRel", f)
            }
        }
        f = 0, e.SetProperty("Menu_CurrentRel", 0);
        var nt = $("[name=cxMenuContent]");
        for (var L = 0; L < nt.length; L++) nt.eq(L).attr("id", "Rel_" + l[L]);
        var rt = $("[name=cxMenuControlCaption]");
        for (var L = 0; L < rt.length; L++) {
            var it = rt.eq(L),
                st = it.find("[name=cxMenuControlCaptionParam]"),
                ot = $.trim(st.find("[name=sImage]").html()),
                ut = $.trim(st.find("[name=sDescription]").html()),
                at = $.trim(st.find("[name=sLearnMoreURL]").html()),
                J = $.trim(st.find("[name=sPortName]").html()),
                ft = $.trim(st.find("[name=sLearnMore]").html()),
                lt = $.trim(st.find("[name=sRequireMoreChild]").html()),
                ct = 2,
                ht = !0,
                pt = "",
                dt = "";
            ot.length === 0 && (ot = "InvisibleSpacer"), ut.length === 0 && at.length === 0 && (ct = 1, ht = !1), pt = ht ? "eCfgdCCSection0" : "eCfgdCCSection0if", dt = "<tr><td class='" + pt + "'><strong>" + J + "</strong>" + lt + "</td>" + "<td class='eCfgdCCSection1' rowspan='" + ct + "'>" + generateCfgImageMarkup.call(this, ot) + "</td></tr>", it = $(dt), ht && it.append($("<tr><td class='eCfgdCCSection2'></td></tr>").append(ut.length !== 0 ? $(generateCfgHTMLMarkup({
                type: "div",
                className: "eCfgAuxText"
            })).append(ut + "&nbsp;&nbsp;").append(ut.length !== 0 ? $(generateCfgHTMLMarkup({
                type: "a",
                attrs: " target='_blank'"
            })).append(ft) : "") : "").append(at.length !== 0 ? generateCfgImageMarkup.call(this, "InvisibleSpacer") : ""))
        }
        var vt = $("[name=cxMenuGroupSummaryPort]");
        for (var L = 0; L < vt.length; L++) {
            var h = e.Get("Menu_RelationshipMap"),
                mt = vt.eq(L),
                gt = mt.find("[name=cxMenuGroupSummaryPortParam]"),
                yt = $.trim(gt.find("[name=hasGroup]").html()),
                K = $.trim(gt.find("[name=sAttName]").html()),
                J = $.trim(gt.find("[name=sPortName]").html()),
                H = $.trim(gt.find("[name=sGroupId]").html()),
                Q = $.trim(gt.find("[name=sPortId]").html()),
                bt = K.length !== 0 ? !0 : !1;
            if (yt === "Y") {
                var wt = -1;
                bt ? wt = h[K] : wt = h[Q];
                var B = "ChangeCurrentObj",
                    j = CCFMiscUtil_CreatePropSet(),
                    F;
                j.SetType("Group"), j.SetProperty("CxGroupId", H), F = j.EncodeAsString(), B = B + "_" + F, mt.html($(generateCfgHTMLMarkup({
                    type: "a"
                })).append(bt ? K : J)), mt.find("a").bind("click", {
                    ctx: this,
                    ctrlName: B,
                    ctrlCurrentRel: wt
                }, function(e) {
                    setTimeout(function() {
                        _menuChooseGroup.call(e.data.ctx, e.data.ctrlName, e.data.ctrlCurrentRel)
                    }, 0)
                }), this.InjectAutomationAttr(mt)
            } else bt ? mt.html(K) : mt.html(J)
        }
        T = _menuGetSummaryFlag.call(this), e.SetProperty("Menu_Show", T), b === !0 && T === !0 ? _menuShowSummary.call(this) : _menuToggleContent.call(this, S);
        var Et = $("[name=menuButtonShowMenu]"),
            St = $("[name=menuButtonShowSummary]"),
            xt = $("[name=menuButtonHelp]");
        Et.bind("click", {
            ctx: this
        }, function(e) {
            setTimeout(function() {
                _menuShowMenu.call(e.data.ctx)
            }, 0)
        }), St.bind("click", {
            ctx: this
        }, function(e) {
            setTimeout(function() {
                _menuShowSummary.call(e.data.ctx)
            }, 0)
        }), xt.bind("click", {
            ctx: this
        }, function(e) {
            setTimeout(function() {
                _menuShowHelp.call(e.data.ctx)
            }, 0)
        }), this.InjectAutomationAttr(Et), this.InjectAutomationAttr(St), this.InjectAutomationAttr(xt)
    }

    function _menuSetCurrentVisible(e) {
        var t = this.GetPM();
        typeof t.Get("Menu_CurrentVisibleJS") == "undefined" && t.AddProperty("Menu_CurrentVisibleJS", new Array), t.Get("Menu_CurrentVisibleJS")[t.Get("Menu_CurrentProductJS")] = e
    }

    function _menuGetCurrentVisible() {
        var e = this.GetPM();
        return typeof e.Get("Menu_CurrentVisibleJS") != "undefined" ? e.Get("Menu_CurrentVisibleJS")[e.Get("Menu_CurrentProductJS")] : 0
    }

    function _menuSetProduct(e) {
        var t = this.GetPM();
        typeof t.Get("Menu_CurrentProductJS") == "undefined" ? t.AddProperty("Menu_CurrentProductJS", e) : t.SetProperty("Menu_CurrentProductJS", e)
    }

    function _menuGetProduct() {
        var e = this.GetPM();
        return e.Get("Menu_CurrentProductJS")
    }

    function _menuSetSummaryFlag(e) {
        var t = this.GetPM();
        typeof t.Get("Menu_ShowSummaryJS") == "undefined" ? t.AddProperty("Menu_ShowSummaryJS", e) : t.SetProperty("Menu_ShowSummaryJS", e)
    }

    function _menuGetSummaryFlag() {
        var e = this.GetPM();
        return e.Get("Menu_ShowSummaryJS")
    }

    function _menuChooseGroup(e, t) {
        _menuSetCurrent.call(this, t, !0), this.GetPM().ExecuteMethod("CfgInvokeMethod", e, null)
    }

    function _menuSetCurrent(e, t) {
        var n = this.GetPM();
        t || n.SetProperty("Menu_CurrentVisible", e), _menuSetCurrentVisible.call(this, e)
    }

    function _menuShowHelp() {
        var e = this.GetPM(),
            t = e.Get("Menu_HelpVisible"),
            n = $("#HELP_BOX");
        if (t === !1) {
            var r, i, s = $("#HELP_POS");
            r = s.offset().left, i = s.offset().top, n.show(), t = !0
        } else n.hide(), t = !1;
        e.SetProperty("Menu_HelpVisible", t)
    }

    function _menuShowContent(e) {
        var t = this.GetPM(),
            n = t.Get("Menu_PositionInit"),
            r = t.Get("Menu_XPos"),
            i = t.Get("Menu_YPos"),
            s = t.Get("Menu_Width"),
            o = t.Get("Menu_Height");
        n === !0 && e.show()
    }

    function _menuHideContent(e) {
        e.hide()
    }

    function _menuSetVars() {
        var e = this.GetPM(),
            t = $("#Rel_REF"),
            n = $("#POSITION_REF"),
            r = 0,
            i = 0,
            s = 0,
            o = 0;
        t.length > 0 && (r = t.offset().left, i = t.offset().top), n.length > 0 && (s = n.offset().top - i, o = n.offset().left - r), e.SetProperty("Menu_PositionInit", !0), e.SetProperty("Menu_XPos", r), e.SetProperty("Menu_YPos", i), e.SetProperty("Menu_Height", s), e.SetProperty("Menu_Width", o)
    }

    function _menuShowMenu() {
        var e = this.GetPM(),
            t = e.Get("Menu_CurrentVisible"),
            n = e.Get("Menu_PositionInit"),
            r = e.Get("Menu_SummaryVisible"),
            i = e.Get("Menu_Error");
        if (i === !1) {
            _menuSetSummaryFlag.call(this, !1);
            var s;
            n === !1 && _menuSetVars.call(this), r === !0 ? (s = $("#SUMMARY"), r = !1, e.SetProperty("Menu_SummaryVisible", r)) : s = $("#Rel_" + jqSelector(String(t))), s.length > 0 && _menuHideContent.call(this, s), _menuSetCurrent.call(this, 0, !1), _menuToggleContent.call(this, 0)
        }
    }

    function _menuShowSummary() {
        var pm = this.GetPM(),
            positionInit = pm.Get("Menu_PositionInit"),
            summaryLink = pm.Get("Menu_SummaryLink"),
            summaryVisible = pm.Get("Menu_SummaryVisible"),
            bError = pm.Get("Menu_Error"),
            xPos = pm.Get("Menu_XPos"),
            yPos = pm.Get("Menu_YPos"),
            iHeight = pm.Get("Menu_Height"),
            iWidth = pm.Get("Menu_Width"),
            currentVisible = pm.Get("Menu_CurrentVisible");
        if (bError === !1) {
            _menuSetSummaryFlag.call(this, !0);
            if (summaryLink === "") {
                if (summaryVisible === !1) {
                    positionInit === !1 && _menuSetVars.call(this);
                    var summaryElement = $("#SUMMARY"),
                        oldElement = $("#Rel_" + jqSelector(String(currentVisible)));
                    oldElement.length > 0 && _menuHideContent.call(this, oldElement);
                    var menuElement = $("#Rel_0");
                    menuElement.length > 0 && _menuHideContent.call(this, menuElement), _menuSetCurrent.call(this, 0, !1), summaryElement.show(), summaryVisible = !0, pm.SetProperty("Menu_SummaryVisible", summaryVisible)
                }
            } else {
                var inPS, strInputArgs, strInvokeMethod;
                inPS = CCFMiscUtil_CreatePropSet(), inPS.SetProperty("RequestType", "CloseExplanation"), strInputArgs = inPS.EncodeAsString(), strInvokeMethod = "SubmitRequest_" + strInputArgs, this.GetPM().ExecuteMethod("SubmitWithFrame", strInvokeMethod, "HiddenFrame"), eval(summaryLink)
            }
        }
    }

    function _menuToggleContent(e) {
        var t = this.GetPM(),
            n = t.Get("Menu_PositionInit"),
            r = t.Get("Menu_CurrentVisible");
        n === !1 && _menuSetVars.call(this);
        if (r !== e) {
            var i = $("#Rel_" + jqSelector(String(r)));
            i.length > 0 && _menuHideContent.call(this, i)
        }
        if (r !== 0 && e !== 0) {
            var s = $("#Rel_0");
            s.length > 0 && _menuHideContent.call(this, s)
        }
        var o = $("#Rel_" + String(e));
        o.length > 0 && (_menuShowContent.call(this, o), _menuSetCurrent.call(this, e, !1))
    }

    function showMenuSignal(e) {
        var t = this.GetPM(),
            n = t.Get("ControlPS"),
            r = "",
            i = 0,
            s = null,
            o = null,
            u = null,
            a = null,
            f, l, c, h;
        u = n.GetChildByType(e), e === "CfgGlobalSignal" ? a = u.GetChildByType("$.Signal") : a = u.GetChildByType("Signal");
        if (a !== null && a.GetPropertyCount() > 0) {
            i = a.GetPropertyCount(), f = $("#SPAN_" + jqSelector(e)), f.empty(), l = $(generateCfgHTMLMarkup({
                type: "div",
                className: "siebui-span-lg-12 siebui-span-md-12",
                id: e
            })), l.appendTo(f);
            for (var p = 0; p < i; p++) {
                r = "", r = a.GetProperty(p.toString());
                var d = CfgMsgSignal(r);
                c = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "siebui-span-lg-12 siebui-span-md-12",
                    id: d.id
                })), c.appendTo(l), h = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "siebui-span-lg-1 siebui-span-md-1"
                })).append(generateCfgImageMarkup.call(this, "GreenBullet")), h.appendTo(c);
                var v = utils.IsTrue(SiebelApp.S_App.IsAutoOn()) ? "un='CfgSignal" + d.msg + "'" + " rn='CfgSignal" + d.msg + "'" + " ot='Text'  colspan='2'" : "colspan='2'";
                h = $(generateCfgHTMLMarkup({
                    type: "div",
                    className: "siebui-span-lg-11 siebui-span-md-11",
                    attrs: v
                })).append(d.msg), h.appendTo(c)
            }
        }
        if (a !== null && a.GetChildCount() > 0) {
            i = a.GetChildCount(), f = $("#SPAN_" + jqSelector(e)), f.empty(), l = $(generateCfgHTMLMarkup({
                type: "div",
                className: "siebui-span-lg-12 siebui-span-md-12",
                id: e
            })), l.appendTo(f);
            for (var p = 0; p < i; p++) {
                var m = a.GetChild(p);
                for (var g = 0; g < m.GetChildCount(); g++) {
                    var y = m.GetChild(g),
                        b = "";
                    for (var w = !0; b = y.EnumProperties(w); w = !1) {
                        r = "", r = y.GetProperty(b) === "" ? b : y.GetProperty(b);
                        var d = CfgMsgSignal(r);
                        c = $(generateCfgHTMLMarkup({
                            type: "div",
                            className: "siebui-span-lg-12 siebui-span-md-12",
                            id: d.id
                        })), c.appendTo(l), h = $(generateCfgHTMLMarkup({
                            type: "div",
                            className: "siebui-span-lg-1 siebui-span-md-1"
                        })).append(generateCfgImageMarkup.call(this, "GreenBullet")), h.appendTo(c);
                        var v = utils.IsTrue(SiebelApp.S_App.IsAutoOn()) ? "un='CfgSignal" + d.msg + "'" + " rn='CfgSignal" + d.msg + "'" + " ot='Text'  colspan='2'" : "colspan='2'";
                        h = $(generateCfgHTMLMarkup({
                            type: "div",
                            className: "siebui-span-lg-11 siebui-span-md-11",
                            attrs: v
                        })).append(d.msg), h.appendTo(c)
                    }
                }
            }
        }
    }

    function updateMenuSignal(e) {
        var t = null,
            n = !0,
            r = null,
            i = null,
            s = null,
            o = null,
            u = "",
            a = "",
            f, l = null,
            c, h;
        u = e.GetType(), u === "Signal" ? (l = $("#CfgSignal"), l.length === 0 && (l = $(generateCfgHTMLMarkup({
            type: "div",
            className: "siebui-span-lg-12 siebui-span-md-12",
            id: "CfgSignal"
        })), spanElement = $("#SPAN_CfgSignal"), l.appendTo(spanElement))) : u === "$.Signal" && (l = $("#CfgGlobalSignal"), l.length === 0 && (l = $(generateCfgHTMLMarkup({
            type: "div",
            className: "siebui-span-lg-12 siebui-span-md-12",
            id: "CfgGlobalSignal"
        })), spanElement = $("#SPAN_CfgGlobalSignal"), l.appendTo(spanElement))), t = e.GetChildByType("Add");
        if (t !== null && l !== null)
            for (n = !0;
                (f = t.EnumProperties(n)) !== null; n = !1) {
                a = null, a = t.GetProperty(f) === "" ? f : t.GetProperty(f);
                if (a !== null) {
                    var p = CfgMsgSignal(a);
                    c = $(generateCfgHTMLMarkup({
                        type: "div",
                        className: "siebui-span-lg-12 siebui-span-md-12",
                        id: p.id
                    })), c.appendTo(l), h = $(generateCfgHTMLMarkup({
                        type: "div",
                        className: "siebui-span-lg-1 siebui-span-md-1"
                    })).append(generateCfgImageMarkup.call(this, "GreenBullet")), h.appendTo(c);
                    var d = utils.IsTrue(SiebelApp.S_App.IsAutoOn()) ? "un='CfgSignal" + p.msg + "'" + " rn='CfgSignal" + p.msg + "'" + " ot='Text'  colspan='2'" : "colspan='2'";
                    h = $(generateCfgHTMLMarkup({
                        type: "div",
                        className: "siebui-span-lg-11 siebui-span-md-11",
                        attrs: d
                    })).append(p.msg), h.appendTo(c)
                }
            }
        r = e.GetChildByType("Delete");
        if (r !== null)
            for (n = !0;
                (f = r.EnumProperties(n)) !== null; n = !1) {
                a = null, a = r.GetProperty(f) === "" ? f : r.GetProperty(f);
                if (a !== null) {
                    var p = CfgMsgSignal(a);
                    c = $("#" + jqSelector(p.id)), c.remove()
                }
            }
    }

    function generateCfgSelectHTMLMarkup(e) {
        var t = {},
            n = "",
            r = [],
            i = [],
            s = [],
            o = [];
			//Added to remove duplicates on load
				var newArray = [];
    
			  $.each(e.options, function(key, value) {
				var exists = false;
				$.each(newArray, function(k, val2) {
				  if(value.id == val2.id){ exists = true }; 
				});
				if(exists == false && value.id != "") { newArray.push(value); }
			  });
        t.type = consts.get("SWE_CTRL_COMBOBOX"), t.className = e.className ? e.className : "", t.id = e.id ? e.id : "", t.attrs = e.attrs ? e.attrs : "";
        if (newArray && newArray.length) {
            t.value = [], t.displayValue = [];
            for (var u = 0, a = newArray.length; u < a; u++) t.value.push(newArray[u].displayValue ? newArray[u].displayValue : " "), t.displayValue.push(newArray[u].displayValue ? newArray[u].displayValue : " "), r[u] = newArray[u].className ? newArray[u].className : "", s[u] = "cfg_value='" + newArray[u].value + "' " + (newArray[u].attrs ? newArray[u].attrs : ""), i[u] = newArray[u].id ? newArray[u].id : "", newArray[u].attrs && newArray[u].attrs.match(/selected/i) && (t.index = u)
        }
        n = SiebelAppFacade.HTMLTemplateManager.GenerateMarkup(t), o = n.split("<option ");
        if (o.length === r.length + 1) {
            for (var u = 1, a = o.length; u < a; u++) o[u] = " class='" + r[u - 1] + "'" + " id='" + i[u - 1] + "' " + s[u - 1] + " " + o[u];
            n = o.join("<option ")
        }
        return n
    }

    function generateCfgOuterHTML(e) {
        var t = "";
        return e && (t = $("<div></div>").append($(e).clone()).html()), t
    }

    function generateCfgHTMLMarkup(e) {
        var t = "";
        switch (e.type) {
            case "a":
            case "div":
            case "span":
            case "td":
            case "tr":
                t = "<" + e.type, e.className && (t += " class='" + e.className + "'"), e.id && (t += " id='" + e.id + "'"), e.attrs && (t += " " + e.attrs), e.type === "a" && (t += " href='" + (e.href ? e.href : "javascript:void(0);") + "'"), t += " ></" + e.type + ">";
                break;
            default:
                t = ""
        }
        return t
    }

    function generateCfgImageMarkup(e) {
        var t = this.GetPM(),
            n = _cfgImageMapping[e],
            r = "";
        switch (e) {
            case "WhiteSpace":
                r = "&nbsp;";
                break;
            case "NewHeader":
                r = SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                    type: consts.get("SWE_CTRL_IMAGECONTROL"),
                    src: t.Get("NewHeaderImage") ? t.Get("NewHeaderImage") : n.src
                });
                break;
            case "Required":
                r = SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                    type: consts.get("SWE_CTRL_PLAINTEXT"),
                    className: "siebui-icon-alert eCfgSpanWarning"
                });
                break;
            default:
                r = SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
                    type: consts.get("SWE_CTRL_IMAGECONTROL"),
                    src: n ? n.src : e
                })
        }
        return r
    }

    function generateCfgIconMarkup(e) {
        return "<i class='" + e + "'></i>"
    }
    var utils = SiebelJS.Dependency("SiebelApp.Utils"),
        siebConsts = SiebelJS.Dependency("SiebelApp.Constants"),
        _pipe = "[~^^",
        _underscore = "^^~[",
        _cfgImageMapping = {
            Conflict: {
                src: "images/icon_configure_conflict.gif"
            },
            Customize: {
                src: "images/icon_configure.gif"
            },
            Delete: {
                src: "images/icon_end_process.gif"
            },
            EditField: {
                src: "images/icon_pick.gif"
            },
            Explanation: {
                src: "images/icon_explain.gif"
            },
            BlackBullet: {
                src: "images/bullet_black.gif"
            },
            GreenBullet: {
                src: "images/bullet_green.gif"
            },
            InvisibleSpacer: {
                src: "images/eCfgInvisibleSpacer.gif"
            },
            NewHeader: {
                src: "images/hm_pg_subscribe.gif"
            },
            Required: {
                src: "images/icon_configure_requiredcat.gif"
            },
            ShowLess: {
                src: "images/btn_less.gif"
            },
            ShowMore: {
                src: "images/btn_more.gif"
            },
            Collapse: {
                src: "images/icon_sort_up.gif"
            },
            Expand: {
                src: "images/icon_sort_down.gif"
            },
            WhiteSpace: {}
        };
    return SiebelJS.Extend(ConfiguratorRenderer, SiebelAppFacade.PhysicalRenderer), ConfiguratorRenderer.prototype.Init = function() {
        SiebelAppFacade.ConfiguratorRenderer.superclass.Init.call(this);
        var e = this.GetPM();
        e.AttachPMBinding("NewHeaderImage", _NewHeaderImage, {
            scope: this
        }), e.AttachPMBinding("RefreshSpanInnerHTML", _RefreshSpanInnerHTML, {
            scope: this
        }), e.AttachPMBinding("ShowConflict", _ShowConflict, {
            scope: this
        }), e.AttachPMBinding("ShowExplanation", _ShowExplanation, {
            scope: this
        }), e.AttachPMBinding("ShowMessage", _ShowMessage, {
            scope: this
        }), e.AttachPMBinding("ShowMessageDlg", _ShowMessageDlg, {
            scope: this
        }), e.AttachPMBinding("UpdateCanInvoke", _UpdateCanInvoke, {
            scope: this
        }), e.AttachPMBinding("UpdateExcludedItems", _UpdateExcludedItems, {
            scope: this
        }), e.AttachPMBinding("UpdateGenerics", _UpdateGenerics, {
            scope: this
        }), e.AttachPMBinding("UpdateQuickEdit", _UpdateQuickEdit, {
            scope: this
        }), e.AttachPMBinding("UpdateResources", _UpdateResources, {
            scope: this
        }), e.AttachPMBinding("UpdateRootProdInfo", _UpdateRootProdInfo, {
            scope: this
        }), e.AttachPMBinding("UpdateSelectionInfo", _UpdateSelectionInfo, {
            scope: this
        }), e.AttachPMBinding("UpdateSelectionInfoForAttribute", _UpdateSelectionInfoForAttribute, {
            scope: this
        }), e.AttachPMBinding("UpdateSignal", _UpdateSignal, {
            scope: this
        }), e.AttachPMBinding("CfgUIInfo", _CfgShowUI, {
            scope: this
        })
    }, ConfiguratorRenderer.prototype.BindEvents = function() {
        SiebelAppFacade.ConfiguratorRenderer.superclass.BindEvents.call(this);
        var e = SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper");
        e.Manage($("#CfgMainFrame"), "click", {}, function() {
            $("#cfgRightContent").slideToggle(500)
        }, "#siebui-ecfg-toggle-btn"), e.Manage($("#CfgMainFrame"), "click", {}, function() {
            $("#cfgRightContent").hide("fast")
        }, ".siebui-cfg-info-close")
    }, ConfiguratorRenderer.prototype.ShowUI = function() {
        SiebelAppFacade.ConfiguratorRenderer.superclass.ShowUI.call(this);
        var e = this.GetPM().Get("ControlPS");
        e === null ? this.GetPM().ExecuteMethod("GetCfgUIInfo") : this.CfgShowUI()
    }, ConfiguratorRenderer.prototype.FocusFirstNonEditableControl = function() {
        var e = "#s_" + this.GetPM().Get("GetFullId") + "_div .appletButton";
        $(e).length > 0 && $(e)[0].focus();
        return
    }, ConfiguratorRenderer.prototype.BindData = function() {
        var e = this.GetPM().Get("ControlPS");
        e !== null && _CfgShowUI.call(this), SiebelAppFacade.ConfiguratorRenderer.superclass.BindData.call(this)
    }, ConfiguratorRenderer.prototype.CfgPreShowUI = function() {
        _CfgPreShowUI.call(this)
    }, ConfiguratorRenderer.prototype.CfgShowUI = function() {}, ConfiguratorRenderer.prototype.CfgShowControl = function(
        name, params) {
        var strShowMethod = name + ".call( this, " + params + " );";
        eval(strShowMethod)
    }, ConfiguratorRenderer.prototype.InjectAutomationAttr = function(e, t) {
        var n = this.GetPM().Get("ControlPS"),
            r = n.GetChildByType(t),
            i = "",
            s = "",
            o = "";
        if (utils.IsTrue(SiebelApp.S_App.IsAutoOn()) !== !0) return;
        var u = e.parents(".siebui-applet");
        if (typeof u.attr("rn") == "undefined" && u.length > 1)
            for (var a = 0; a < u.length; a++)
                if (typeof u.eq(a).attr("rn") != "undefined") {
                    u.eq(0).attr("rn", u.eq(a).attr("rn"));
                    break
                } if (r === null || typeof r == "undefined") {
            if (t === "MENUBUTTON") {
                var f = e.closest("div");
                f.attr("ot", "Link"), f.attr("rn", f.text()), f.attr("un", f.text());
                return
            }
            if (e.prop("id") === "siebui-ecfg-toggleProdDetails" || e.prop("id") === "CfgMsgToggleBtn") {
                e.attr("ot", "button"), e.attr("rn", e.prop("id")), e.attr("un", e.prop("id"));
                return
            }
            if (e.prop("name") === "menuButtonShowMenu" || e.prop("name") === "menuButtonShowSummary" || e.prop("name") === "menuButtonHelp") {
                e.attr("ot", "button"), e.attr("rn", e.prop("name")), e.attr("un", e.prop("name"));
                return
            }
            SiebelJS.Log(">>> QTP Cannot Process element" + (e.attr("id") + e.attr("name")));
            return
        }
        if (r.GetChildCount() > 0) {
            var l, c = r.GetChildByType("Domain");
            typeof e.attr("id") == "undefined" ? l = getIdInfo(e.parent().prop("id")) : l = getIdInfo(e.prop("id"));
            switch (r.GetProperty("Object Type")) {
                case "Port":
                    if (l.PROD === "") i = r.GetProperty("Type"), s = c.GetProperty("CxPortName"), o = c.GetProperty("CxPortName");
                    else {
                        var h;
                        h = c.GetChildByType(l.PROD);
                        if (h === null) return;
                        i = e.prop("type") === "" ? e.prop("tagName") : e.prop("type"), s = h.GetProperty("CxPortName") + "_" + h.GetProperty("CxObjName") + "_" + l.FIELD, o = h.GetProperty("CxPortName") + "_" + h.GetProperty("CxObjName") + "_" + l.FIELD
                    }
                    break;
                case "Attribute":
                    if (l.ATTVAL === "") i = r.GetProperty("Type"), s = "Attribute_" + r.GetProperty("AttID"), o = r.GetProperty("AttID");
                    else {
                        var h;
                        h = c.GetChildByType(l.ATTVAL);
                        if (h === null) return;
                        i = e.prop("type") === "" ? e.prop("tagName") : e.prop("type"), s = "Attribute_" + r.GetProperty("AttID") + "_" + h.GetProperty("AttValueLIC") + "_" + l.FIELD, o = r.GetProperty("AttID") + "_" + h.GetProperty("AttValueLIC") + "_" + l.FIELD
                    }
                    break;
                default:
                    i = e.prop("type") === "" ? e.prop("tagName") : e.prop("type"), i === "button" ? (s = c.GetProperty("CxPortName") + "_" + e.text(), o = c.GetProperty("CxPortName") + "_" + e.text()) : i === "select-one" ? (s = c.GetProperty("CxPortName") + "_DOMAINSELECT", o = c.GetProperty("CxPortName")) : i === "text" && (s = c.GetProperty("CxPortName") + "_DOMAININPUT", o = c.GetProperty("CxPortName"))
            }
            switch (i.toLowerCase()) {
                case "minibutton":
                    i = "button";
                    break;
                case "text":
                    i = "Jtext";
                    break;
                case "checkbox":
                    i = "JCheckBox";
                    break;
                case "select-one":
                case "combo":
                    i = "JComboBox";
                    break;
                case "radio":
                    i = "JRadioButton";
                    break;
                case "a":
                    i = "Link"
            }
            e.attr("ot", i), e.attr("rn", s), e.attr("un", o)
        } else {
            var p = r.GetProperty("Type");
            switch (p) {
                case "MiniButton":
                    i = p, s = r.GetProperty("Method"), o = e.text();
                    break;
                case "Link":
                    i = p, s = e.text(), o = e.text();
                    break;
                case "TextBox":
                    r.GetProperty("Object Type") === "Attribute" && (i = e.prop("type") === "" ? e.prop("tagName") : e.prop("type"), s = r.GetProperty("AttID"), o = r.GetProperty("AttID"));
                    break;
                default:
                    if (t.indexOf("PORTITEM") != -1) {
                        var l;
                        typeof e.attr("id") == "undefined" ? l = getIdInfo(e.parent().prop("id")) : l = getIdInfo(e.prop("id")), i = e.prop("type") === "" ? e.prop("tagName") : e.prop("type"), s = r.GetProperty("CxPortName") + "_" + r.GetProperty("Name") + "_" + l.FIELD, o = r.GetProperty("CxPortName") + "_" + r.GetProperty("Name") + "_" + l.FIELD
                    }
            }
            switch (i.toLowerCase()) {
                case "minibutton":
                    i = "button";
                    break;
                case "text":
                    i = "Jtext";
                    break;
                case "checkbox":
                    i = "JCheckBox";
                    break;
                case "select-one":
                case "combo":
                    i = "JComboBox";
                    break;
                case "radio":
                    i = "JRadioButton";
                    break;
                case "a":
                    i = "Link"
            }
            e.attr("ot", i), e.attr("rn", s), e.attr("un", o)
        }
    }, ConfiguratorRenderer
}(), define("siebel/cfgrenderer", [], function() {
    return SiebelAppFacade.ConfiguratorRenderer
}));