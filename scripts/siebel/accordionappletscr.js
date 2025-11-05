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
typeof SiebelAppFacade.AccordionAppletsCR=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.AccordionAppletsCR"),define("siebel/accordionappletscr",["siebel/basecr"],function(){return SiebelAppFacade.AccordionAppletsCR=function(){function i(){}function s(t){return e.IsSmallScreen()}function o(e){u.call(this,e),a.call(this,e),p.call(this,e)}function u(e){$(".siebui-view").addClass("siebui-view-mobile").css("transform",""),n||(n=$(window).width())}function a(e){var t=e.GetPM().Get("GetAppletMap"),r=$(".siebui-view"),i=0,s=$(".siebui-subview-screennavs, .siebui-subview-navs").filter(":visible").find(".ui-tabs-active"),o=[];for(var u=0;u<s.length;u++)o.push(s.eq(u).text());s=!1;for(var a in t)if(t.hasOwnProperty(a)){var l=t[a],h=r.find("#s_"+l.GetFullId()+"_div"),p=h.parent("#"+l.GetFullId());h.length&&(p.length||(p=h),h.data("disallowAccordion")||p.addClass("siebui-applet-parent"),p.css("width",n),l.IsActive()&&h.is(":visible")&&(i=r.find(".siebui-applet").filter(function(){return!$(this).closest(".forcehide").length}).index(h)),c.call(this,e,p,l),o.indexOf(SiebelApp.S_App.GetStringCache()[l.GetTitle()])!==-1&&(s=r.find(".siebui-applet").filter(function(){return!$(this).closest(".forcehide").length}).index(h)))}r.children().accordion({active:s!==!1?s:i,animate:5,heightStyle:"content",header:".siebui-applet-header-tile",custom:!0,activate:function(t,n){n.newHeader.length&&n.newHeader.hasClass("siebui-applet-tile")&&f.call(this,e,n.newPanel)}}),f.call(this,e,$(".ui-accordion-content-active"))}function f(e,t){var n=0;l.call(this)&&(n=80);var i=t.find(".siebui-tile-container").children(".clearfix");if(i.length){var s=$(window).height()-i[0].offsetTop-n;s>r?i.css("max-height",s):(i.css("max-height",r),i.parent().height()!=r+r-s&&i.height()>s&&i.parent().attr("style",(i.parent().attr("style")||"")+"height:"+(r+r-s)+"px !important;"))}else if(n>0){var o=$(".siebui-applet-parent");o.index(t)==o.length-1&&t.height(t.height()+n)}SiebelApp.EventManager.fireEvent("ShowPanelContent")}function l(){return $(".siebui-subview-screennavs .siebui-nav-tabs, .siebui-subview-navs .siebui-nav-tabs").filter(":visible").length>0}function c(e,t,n){if(!t.is(":visible")||n.GetAppletLabel()===""&&t.find("#a_"+n.GetId()).length==0)return;var r=t.addBack().find(".siebui-applet");r.data("targetId")&&r.data("targetType")=="TILE"&&(t=$("#"+r.data("targetId")),n=r.data("targetObj"));var i=t.find(".siebui-applet-title");i.length>1&&(i=i.filter(function(e){return!$(this).is(":empty")}),i.length||(i=i.end().eq(0)));var s;i.length?(s=i.clone(!0),i.children("input,textarea,select").length?(s.addClass("siebui-applet-header-tile").children().addClass("forcehide"),i.removeClass("siebui-applet-title"),i.insertAfter(r.find(".siebui-applet-buttons"))):(i.addClass("forcehide"),s.addClass("siebui-applet-header-tile"))):s=$('<div class= "siebui-applet-header-tile">'+(n.GetAppletLabel&&n.GetAppletLabel()||n.GetName())+"</div>"),t.before(s),t.hasClass("forcehide")&&t.siblings(".siebui-applet-header-tile").eq(0).addClass("forcehide"),i=null}function h(){window.matchMedia("(orientation: landscape)").matches&&e.Alert(SiebelApp.S_App.LocaleObject.GetLocalString("PHONE_PORTRAIT_ALERT"))}function p(e){h.call(this);var t;$(window).off("orientationchange.SiebelPortrait").on("orientationchange.SiebelPortrait",function(){clearTimeout(t),t=setTimeout(h,500)}),$(".ui-accordion-header").droppable({tolerance:"pointer",over:function(e,t){var n=$(".siebui-view").find(".siebui-applet-parent").index($(e.target).next(".siebui-applet-parent"));$(".siebui-view").children().accordion("option","active",n),SiebelApp.EventManager.fireEvent("ShowAppletContent")}})}var e=SiebelJS.Dependency("SiebelApp.Utils"),t=SiebelJS.Dependency("SiebelApp.Constants"),n=0,r=400;return SiebelJS.Extend(i,SiebelAppFacade.BaseCR),i.prototype.Init=function(e){if(!s.call(this,e))return},i.prototype.Execute=function(e){if(!s.call(this,e))return;var t=this;setTimeout(function(){o.call(t,e)},100)},i}(),SiebelAppFacade.ComponentMgr.AddContextRenderer(consts.get("SWE_PST_VIEW_INFO"),SiebelAppFacade.AccordionAppletsCR),SiebelAppFacade.AccordionAppletsCR}));
