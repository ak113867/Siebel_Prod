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
typeof SiebelAppFacade.ListFormNavigationCR=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.ListFormNavigationCR"),define("siebel/listformnavigationcr",["siebel/basecr"],function(){return SiebelAppFacade.ListFormNavigationCR=function(){function n(){}function r(t){return e.IsSmallScreen()}function i(e){var t=e.GetPM().Get("GetAppletMap"),n=[],r=[];for(var i in t)t.hasOwnProperty(i)&&n.push({obj:t[i],match:!1});for(var s=0;s<n.length;s++){var o=n[s].obj,u=o.GetPModel();if(o instanceof SiebelApp.S_App.ListApplet&&(u.Get("VisualMode")==="Tile"||u.GetRenderer()instanceof SiebelAppFacade.TileLayoutPR))for(var a=0;a<n.length;a++)if(s!=a){var f=n[a].obj,l=$("#s_"+f.GetFullId()+"_div");l.find(".siebui-applet-header").length>0&&!n[a].match&&o.GetBusComp()===f.GetBusComp()&&f instanceof SiebelApp.S_App.Applet&&!l.find(".siebui-cal-hdr-wrapper")[0]&&(r.push([o,f]),n[a].match=!0)}}return r}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n][0],i=t[n][1],s=$("#"+r.GetFullId()).length?$("#"+r.GetFullId()):$("#s_"+r.GetFullId()+"_div"),o=$("#"+i.GetFullId()).length?$("#"+i.GetFullId()):$("#s_"+i.GetFullId()+"_div");if(s.is(":visible")&&o.is(":visible")){s.addClass("siebui-mobile-tile-tap"),o.find(".siebui-applet-header").eq(0).prepend($('<span class="siebui-prev-applet"></span>')),$("#s_"+r.GetFullId()+"_div").data("targetId",o.attr("id")).data("targetObj",i).data("targetType","FORM"),$("#s_"+i.GetFullId()+"_div").data("targetId",s.attr("id")).data("targetObj",r).data("targetType","TILE"),i.IsActive()?(s.addClass("forcehide"),s.closest(".siebui-applet-header-tile").length&&s.closest(".siebui-applet-header-tile").addClass("forcehide")):(o.addClass("forcehide"),o.find(".siebui-prev-applet").addClass("forcehide"));var u=!1;function a(){u&&$(".siebui-prev-applet").click(),u=!1}SiebelAppFacade.ComponentMgr.FindComponent({id:r.GetName()}).GetPM().AttachPostProxyExecuteBinding("NewRecord",function(){u=!0,$(".siebui-tile-selected .siebui-tile-footer").click()}),SiebelAppFacade.ComponentMgr.FindComponent({id:r.GetName()}).GetPM().AttachPostProxyExecuteBinding("UndoRecord",function(){u=!1}),SiebelAppFacade.ComponentMgr.FindComponent({id:i.GetName()}).GetPM().AttachPostProxyExecuteBinding("WriteRecord",a)}}}function o(e,t){$(".siebui-tile-container").on("click",".siebui-tile-footer",{ctx:e},function(){if(!$(this).hasClass("siebui-edit")||!$(this).hasClass("siebui-save")||!$(this).hasClass("siebui-cancel")){var e=$(this).parents(".siebui-applet"),t=e.data("targetId")?$("#"+e.data("targetId")):null,n=t?t.addBack().find(".siebui-applet").data("targetId"):null;e=n?$("#"+n):null,t&&t.length&&(t.removeClass("forcehide"),t.find(".siebui-prev-applet").removeClass("forcehide"),e.addClass("forcehide"),e.siblings(".siebui-applet-header-tile").length&&e.siblings(".siebui-applet-header-tile").addClass("forcehide"))}}),$(".siebui-prev-applet").on("click",{ctx:this},function(){var e=$(this).parents(".siebui-applet"),t=e.data("targetId")?$("#"+e.data("targetId")):null,n=t?t.addBack().find(".siebui-applet").data("targetId"):null;e=n?$("#"+n):null,t&&t.length&&(e.addClass("forcehide"),e.find(".siebui-prev-applet").addClass("forcehide"),t.removeClass("forcehide"),t.siblings(".siebui-applet-header-tile").length&&(t.siblings(".siebui-applet-header-tile").removeClass("forcehide"),t.is(":visible")||t.siblings(".siebui-applet-header-tile").click()))})}var e=SiebelJS.Dependency("SiebelApp.Utils"),t=SiebelJS.Dependency("SiebelApp.Constants");return SiebelJS.Extend(n,SiebelAppFacade.BaseCR),n.prototype.Init=function(e){if(!r.call(this,e))return},n.prototype.Execute=function(e){if(!r.call(this,e))return;var t=i.call(self,e);s.call(self,e,t),o.call(self,e,t)},n}(),SiebelAppFacade.ComponentMgr.AddContextRenderer(consts.get("SWE_PST_VIEW_INFO"),SiebelAppFacade.ListFormNavigationCR),SiebelAppFacade.ListFormNavigationCR}));
