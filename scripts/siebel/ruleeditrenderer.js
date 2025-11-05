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
typeof SiebelAppFacade.RuleEditPhysicalRenderer=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.RuleEditPhysicalRenderer"),define("siebel/ruleeditrenderer",["siebel/phyrenderer"],function(){return SiebelAppFacade.RuleEditPhysicalRenderer=function(){function t(){SiebelAppFacade.RuleEditPhysicalRenderer.superclass.constructor.apply(this,arguments)}var e=SiebelJS.Dependency("SiebelApp.Constants");return SiebelJS.Extend(t,SiebelAppFacade.PhysicalRenderer),t.prototype.Init=function(){SiebelAppFacade.RuleEditPhysicalRenderer.superclass.Init.call(this)},t.prototype.ShowUI=function(){var e=this.GetPM(),t="#s_"+e.Get("GetFullId")+"_div",n=$(t).find('div[id="rule_edit_template"]').html(),r=$(t).find('div[id="rule_edit_template"]').empty(),i=e.Get("GetBusComp").GetNumRows(),s="",o;for(o=0;o<i;o++)s=s+'<span id="'+o+'_Label">'+n+"</span>";colsolidatedJQObj=$(s),r.replaceWith(colsolidatedJQObj),SiebelAppFacade.RuleEditPhysicalRenderer.superclass.ShowUI.call(this)},t.prototype.BindData=function(e){SiebelAppFacade.RuleEditPhysicalRenderer.superclass.BindData.call(this,e);var t=this.GetPM(),n=t.Get("GetRecordSet"),r=t.Get("GetBeginRow")||0,i=t.Get("GetBusComp").GetNumRows(),s=$("#s_"+t.Get("GetFullId")+"_div").find(".RULEEDIT");for(var o=0;o<i;o++){var u=n[o]["Item Id"],a=n[o]["Display Value"],f=n[o].IsActive;typeof u=="undefined"||u===""?s.eq(o).find("span").empty().html(a):typeof f=="undefined"||f==="N"?s.eq(o).find("a").empty().html(a):s.eq(o).find("a").empty().html("[<font color='#CC3300'>"+a+"</font>]"),s.find(".rule_edit_parameters").remove()}},t.prototype.BindEvents=function(e){SiebelAppFacade.RuleEditPhysicalRenderer.superclass.BindEvents.call(this,e);var t=this.GetPM(),n=t.Get("GetRecordSet"),r=t.Get("GetBeginRow")||0,i=t.Get("GetBusComp").GetNumRows(),s=$("#s_"+t.Get("GetFullId")+"_div").find(".RULEEDIT");for(var o=0;o<i;o++){var u=n[o]["Item Id"];s.eq(o).find("a").bind("click",{ctx:this,methodInvoked:"ItemID"+u},function(e){setTimeout(function(){var t=CCFMiscUtil_CreatePropSet(),n={async:!0,cb:function(){SiebelApp.S_App.uiStatus.Free()}};e.data.ctx.GetPM().ExecuteMethod("InvokeMethod",e.data.methodInvoked,t,n)},0)})}},t.prototype.ShowSelection=function(e,t){SiebelAppFacade.RuleEditPhysicalRenderer.superclass.ShowSelection.call(this,e,t);var n=this.GetPM(),r=$("#s_"+n.Get("GetFullId")+"_div").find(".RULEEDIT");for(var i=0;i<r.length;i++)r.eq(i).find("span").show()},t}(),"SiebelAppFacade.RuleEditPhysicalRenderer"}));
