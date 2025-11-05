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
typeof SiebelAppFacade.EditableTileCR=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.EditableTileCR"),define("siebel/editabletilecr",["siebel/basecr"],function(){return SiebelAppFacade.EditableTileCR=function(){function n(){}function r(t){return e.IsSmallScreen()&&t instanceof SiebelAppFacade.TileLayoutPR}function i(e){var t=$("#s_"+e.GetPM().Get("GetFullId")+"_div");t.on("click",".siebui-tile-footer",{ctx:e},function(e){$(this).hasClass("siebui-edit")?($(this).parents(".siebui-tile").addClass("siebui-editable"),SiebelApp.EventManager.fireEvent("ShowPanelContent")):$(this).hasClass("siebui-cancel")?(e.data.ctx.GetPM().ExecuteMethod("CanInvokeMethod","UndoRecord")&&e.data.ctx.GetPM().ExecuteMethod("InvokeMethod","UndoRecord"),$(this).parents(".siebui-tile").removeClass("siebui-editable"),SiebelApp.EventManager.fireEvent("ShowPanelContent")):$(this).hasClass("siebui-save")&&e.data.ctx.GetPM().ExecuteMethod("CanInvokeMethod","WriteRecord")&&e.data.ctx.GetPM().ExecuteMethod("InvokeMethod","WriteRecord")})}var e=SiebelJS.Dependency("SiebelApp.Utils"),t=SiebelJS.Dependency("SiebelApp.Constants");return SiebelJS.Extend(n,SiebelAppFacade.BaseCR),n.prototype.Init=function(n){if(r.call(this,n)){var i=$("#"+n.GetPM().Get("GetFullId")+"_"+t.get("SWE_TILE_CONTAINER"));i.attr("data-scroll-direction","vertical");var s=SiebelApp.S_App.GetActiveView().GetAppletMap(),o=Object.keys(s).length,u=[],a=!1,f=n.GetPM();if(o>=2){var l=f.GetObjName(),c=f.Get("GetBusComp").GetName(),h;for(var p in s)if(s.hasOwnProperty(p)&&p!==l){h=s[p].GetBusComp()?s[p].GetBusComp().GetName():null;if(h===c&&($("#s_"+s[p].GetFullId()+"_div").find(".siebui-applet-header").length>0||SiebelApp.S_App.GetPopupPM().Get("currPopups").indexOf(s[p])!==-1)){i=i.children().append($('<span class="siebui-tile-footer"></span>')),a=!0;break}}}!a&&e.IsTrue(f.Get("IsEditable")==="1")&&i.children().append('<span class="siebui-tile-footer siebui-edit"></span><span class="siebui-tile-footer siebui-save"></span><span class="siebui-tile-footer siebui-cancel"></span>'),f.Get("GetParentApplet")&&$("#s_"+f.Get("GetFullId")+"_div").find("#sieb-ui-popup-mvg-selected").length&&i.prepend("<div class='siebui-selected-item'><div class='siebui-remove-item'></div></div>")}},n.prototype.Execute=function(e){r.call(this,e)&&i.call(this,e)},n}(),SiebelAppFacade.EditableTileCR}));
