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
typeof SiebelAppFacade.WrapTextPR=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.WrapTextPR"),define("siebel/wraptextpr",["siebel/jqgridrenderer"],function(){return SiebelAppFacade.WrapTextPR=function(){function e(){SiebelAppFacade.WrapTextPR.superclass.constructor.apply(this,arguments)}function t(e,t,n,r){var i=this.GetPM(),s=i.Get("GetControls"),o=s["Wrap Comments ON"],u=s["Wrap Comments OFF"];if(o&&u)if(e==="WrapOn"||e==="WrapOff"){var a=this.GetUIWrapper(o).GetEl(),f=this.GetUIWrapper(u).GetEl(),l=$("#s_"+this.GetPM().Get("GetFullId")+"_div");e==="WrapOn"&&(l.find(".siebui-list-textareactrl-nofocus").addClass("siebui-list-wraptext-on"),l.find(".ui-jqgrid-bdiv").addClass("grid-overflow-enable"),$(a).styleHide(),$(f).styleShow()),e==="WrapOff"&&(l.find(".siebui-list-textareactrl-nofocus").removeClass("siebui-list-wraptext-on"),l.find(".ui-jqgrid-bdiv").removeClass("grid-overflow-enable"),$(f).styleHide(),$(a).styleShow())}}function n(e,t,n,r){var i=this.GetPM(),s=i.Get("GetControls"),o=s["Wrap Comments ON"],u=s["Wrap Comments OFF"];if(o&&u)if(e.GetName()==="Short Comment"||e.GetName()==="Reviewer Comments"||e.GetName()==="Comments"){var a=this.GetUIWrapper(o).GetEl();if($(a).css("display")=="none"){var f=$("#s_"+this.GetPM().Get("GetFullId")+"_div");f.find(".ui-jqgrid-bdiv").addClass("grid-overflow-enable"),f.find(".siebui-list-textareactrl-nofocus").addClass("siebui-list-wraptext-on")}}}return SiebelJS.Extend(e,SiebelAppFacade.JQGridRenderer),e.prototype.Init=function(){SiebelAppFacade.WrapTextPR.superclass.Init.apply(this,arguments),this.GetPM().AddMethod("InvokeMethod",function(e,t,n,r){if(e==="WrapOn"||e==="WrapOff")SiebelApp.S_App.uiStatus.Free(),r.CancelOperation=!0},{sequence:!0,scope:this}),this.GetPM().AttachPMBinding("InvokeMethod",t,{scope:this}),this.GetPM().AttachPMBinding("LeaveField",n,{scope:this})},e.prototype.ShowUI=function(){SiebelAppFacade.WrapTextPR.superclass.ShowUI.apply(this,arguments);var e=this.GetPM(),t=e.Get("GetControls"),n=t["Wrap Comments OFF"];if(n){var r=this.GetUIWrapper(n).GetEl();setTimeout(function(){$(r).styleHide()},1)}},e.prototype.BindData=function(e){SiebelAppFacade.WrapTextPR.superclass.BindData.apply(this,arguments);var t=this.GetPM().Get("GetRecordSet"),n=t.length,r=this.GetPM(),i=r.Get("GetControls"),s=i["Wrap Comments ON"],o=i["Wrap Comments OFF"];if(s&&o){var u=this.GetUIWrapper(s).GetEl(),a=this.GetUIWrapper(o).GetEl(),f=$("#s_"+this.GetPM().Get("GetFullId")+"_div");n==0&&($(u).attr("disabled","true"),$(u).removeClass("appletButton"),$(u).addClass("appletButtonDis"),$(a).styleHide(),$(u).styleShow()),n>0&&($(u).removeAttr("disabled"),$(u).removeClass("appletButtonDis"),$(u).addClass("appletButton")),$(u).css("display")=="none"&&setTimeout(function(){f.find(".ui-jqgrid-bdiv").addClass("grid-overflow-enable"),f.find(".siebui-list-textareactrl-nofocus").addClass("siebui-list-wraptext-on")},1)}},e}(),SiebelAppFacade.WrapTextPR}));
