/*<ORACLECOPYRIGHT>
* Copyright (C) 2008-2024
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
/* 24.2.0.0SIA[2024_02] */
typeof SiebelAppFacade.EmailRenderer=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.EmailRenderer"),define("siebel/emailprenderer",["siebel/phyrenderer"],function(){return SiebelAppFacade.EmailRenderer=function(){function n(e){SiebelAppFacade.EmailRenderer.superclass.constructor.call(this,e)}function r(e){a(),l()}function i(e){f(),l()}function s(t){if(t.which===e.get("SWE_F2_KEY")){var n=t.data.ctrl.GetMethodPropSet().Clone();t.data.ctx.GetPM().OnControlEvent(e.get("PHYEVENT_INVOKE_CONTROL"),t.data.ctrl.GetMethodName(),n),t.stopImmediatePropagation()}}function o(){var e=$(".siebui-email-show-cc a");e.length>0&&(e.text(this.GetPM().Get("CcCaption")),$(".siebui-email-show-cc").width(e.width()))}function u(){var e=$(".siebui-email-show-bcc a");e.length>0&&(e.text(this.GetPM().Get("BccCaption")),$(".siebui-email-show-bcc").width(e.width()))}function a(){var e=$(".siebui-email-cc-row");e.length>0&&e.show().attr("aria-hidden",!1);var t=$(".siebui-email-show-cc");t.length>0&&t.hide().attr("aria-hidden",!0)}function f(){var e=$(".siebui-email-bcc-row");e.length>0&&e.show().attr("aria-hidden",!1);var t=$(".siebui-email-show-bcc");t.length>0&&t.hide().attr("aria-hidden",!0)}function l(){$("div[name=popup]").parent().height("auto")}var e=SiebelJS.Dependency("SiebelApp.Constants"),t=SiebelJS.Dependency("SiebelApp.Utils");return SiebelJS.Extend(n,SiebelAppFacade.PhysicalRenderer),n.prototype.Init=function(){SiebelAppFacade.EmailRenderer.superclass.Init.call(this),this.AttachPMBinding("CcCaption",o,{scope:this}),this.AttachPMBinding("BccCaption",u,{scope:this})},n.prototype.ShowUI=function(){SiebelAppFacade.EmailRenderer.superclass.ShowUI.call(this);var n=$(".siebui-email-to input");n.length>0&&n.addClass("siebui-ctrl-pick siebui-input-popup");var r=$(".siebui-email-cc input");r.length>0&&r.addClass("siebui-ctrl-pick siebui-input-popup");var i=$(".siebui-email-bcc input");i.length>0&&i.addClass("siebui-ctrl-pick siebui-input-popup");var s=this.GetPM().Get("GetControls");for(var o in s)if(s.hasOwnProperty(o)){var u=s[o];if(o==="HTML Address Book"){var a=$("[name="+u.GetInputName()+"]");a.length>0&&a.text("").addClass("siebui-icon-pick applet-form-pick applet-list-pick").attr("aria-label","Selection Field")}else if(o==="HTML Label3")this.GetPM().SetProperty("CcCaption",u.GetDisplayName());else if(o==="HTML Label4")this.GetPM().SetProperty("BccCaption",u.GetDisplayName());else if(o==="HTML Button2"||o==="HTML Button"){var f=$("[name="+u.GetInputName()+"]");f.children("a").attr("title",u.GetDisplayName())}}s=null;var l=$(".siebui-email-show-bcc a"),c=$(".siebui-email-show-cc a");t.IsTrue(SiebelApp.S_App.IsAutoOn())&&(l.attr(e.get("SWE_PROP_AUTOM_OT"),e.get("SWE_CTRL_LINK")).attr(e.get("SWE_PROP_AUTOM_RN"),"EmailShowBccLine").attr(e.get("SWE_PROP_AUTOM_UN"),this.GetPM().Get("BccCaption")),c.attr(e.get("SWE_PROP_AUTOM_OT"),e.get("SWE_CTRL_LINK")).attr(e.get("SWE_PROP_AUTOM_RN"),"EmailShowCcLine").attr(e.get("SWE_PROP_AUTOM_UN"),this.GetPM().Get("CcCaption")));var h=$(".siebui-email-cc-row");h.length>0&&h.hide().attr("aria-hidden",!0);var p=$(".siebui-email-bcc-row");p.length>0&&p.hide().attr("aria-hidden",!0);var d=$("div[name=popup]");if(d.length>0){var v=d.find(".siebui-email-popup-buttons"),m=d.find(".siebui-send-email");if(v.length>0&&m.length>0){var g=v.width()+m.outerWidth(!0)-m.width();d.parent(".ui-dialog").css({minWidth:g})}}},n.prototype.BindEvents=function(){var e=SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper"),t=this.GetPM().Get("GetControls");for(var n in t)if(t.hasOwnProperty(n)){var o=t[n];if(n==="HTML Address Book"){var u=$("[name="+o.GetInputName()+"]").siblings("input");u.length>0&&e&&e.Manage(u,"keydown",{ctx:this,ctrl:o},s)}}var a=$(".siebui-email-show-bcc a"),f=$(".siebui-email-show-cc a");a.length>0&&f.length>0&&e&&(e.Manage(f,"click",{ctx:this},r),e.Manage(a,"click",{ctx:this},i)),SiebelAppFacade.EmailRenderer.superclass.BindEvents.call(this)},n.prototype.BindData=function(){SiebelAppFacade.EmailRenderer.superclass.BindData.call(this)},n.prototype.EndLife=function(){SiebelAppFacade.EmailRenderer.superclass.EndLife.call(this)},n.prototype.SetControlValue=function(e,n,r){e.GetFieldName()==="Email CC Line"&&!t.IsEmpty(n)&&a(),e.GetFieldName()==="Email BCC Line"&&!t.IsEmpty(n)&&f(),SiebelAppFacade.EmailRenderer.superclass.SetControlValue.call(this,e,n,r)},n}(),SiebelAppFacade.EmailRenderer}));
