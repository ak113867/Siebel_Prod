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
typeof SiebelAppFacade.DynamicListHO=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.DynamicListHO"),define("siebel/DynamicListHO",[],function(){return SiebelAppFacade.DynamicListHO=function(){function s(){}function o(){var e=this.GetPM(),s=$(n),o=u.call(this,s,e.Get("GetPlaceholder")),a=parseFloat(s.height()),f=Math.floor((a-parseFloat(o)-r)/i),l=parseFloat(window.localStorage.getItem("RowCountScale"))||0;if(l!==f&&e.Get("IsInQueryMode")!==!0&&SiebelApp.S_App.GetPopupPM().Get("state")!==t.get("POPUP_STATE_VISIBLE")){window.localStorage.setItem("RowCountScale",f);var c=CCFMiscUtil_CreatePropSet();c.SetProperty("RowCountScale",f),e.ExecuteMethod("InvokeMethod","RefreshRowCount",c),e.SetProperty("queryModeResized",!1)}e.Get("IsInQueryMode")&&e.SetProperty("queryModeResized",!0)}function u(e,t){var n=0,r=$("#"+t),i,s;n=r.offset().top-e.offset().top,i=r.closest(".ui-jqgrid-view").nextAll();for(var o=0,u=i.length;o<u;o++)s=i.eq(o),s.is(":visible")&&s.width!==0&&(n+=s.outerHeight());return s=null,r=null,i=null,n}var e=SiebelJS.Dependency("SiebelApp.Utils"),t=SiebelJS.Dependency("SiebelApp.Constants"),n=".siebui-view",r=35,i;return s.prototype.Init=function(){},s.prototype.GetName=function(){return"DynamicListHO"},s.prototype.SetUp=function(n){var r=n.GetPM();i||(i=parseFloat(e.GetstyleSheetPropVal(SiebelApp.S_App.GetStyleSheetName(),".siebui .ListAppletRow","height")||t.get("MIN_ROWHGT"))),SiebelApp.EventManager.removeListner("WTWindowResize",o,n),SiebelApp.EventManager.removeListner("refreshview",o,n),SiebelApp.EventManager.removeListner("refreshlayout",o,n),SiebelApp.EventManager.addListner("WTWindowResize",o,n),SiebelApp.EventManager.addListner("refreshview",o,n),SiebelApp.EventManager.addListner("refreshlayout",o,n),r.AttachPostProxyExecuteBinding("ExecuteQuery",o,{scope:n}),r.AttachPostProxyExecuteBinding("UndoQuery",o,{scope:n}),r.AddProperty("queryModeResized",!1)},s.prototype.EndCtx=function(e){SiebelApp.EventManager.removeListner("WTWindowResize",o,e),SiebelApp.EventManager.removeListner("refreshview",o,e),SiebelApp.EventManager.removeListner("refreshlayout",o,e)},new s}(),$(window).unbind("resize.WTList"),$(window).bind("resize.WTList",{ctx:this},function(){SiebelApp.EventManager.fireEvent("WTWindowResize")}),SiebelApp.S_App.PluginBuilder.AttachHelper(SiebelAppFacade.DynamicListHO.GetName(),SiebelAppFacade.DynamicListHO),"SiebelAppFacade.DynamicListHO"}));
