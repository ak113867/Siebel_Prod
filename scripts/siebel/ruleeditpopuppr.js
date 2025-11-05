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
typeof SiebelAppFacade.RuleEditPopupPR=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.RuleEditPopupPR"),define("siebel/ruleeditpopuppr",["siebel/phyrenderer"],function(){return SiebelAppFacade.RuleEditPopupPR=function(){function e(e){SiebelAppFacade.RuleEditPopupPR.superclass.constructor.apply(this,arguments)}function t(){var e=this.GetPM().Get("GetControls");for(var t in e)if(e.hasOwnProperty(t)){var n=e[t];$("#"+n.GetName()).addClass("forceshow"),n.GetUIType()==="Label"&&$("#"+n.GetName()).text(n.GetDisplayName())}}return SiebelJS.Extend(e,SiebelAppFacade.PhysicalRenderer),e.prototype.ShowUI=function(){var e=this.GetPM(),t="#s_"+e.Get("GetFullId")+"_div",n=!1,r=e.Get("GetControls"),i=e.Get("htmlTemplateName"),s,o,u="";for(s=!0;o=i.EnumChildren(s);s=!1){var a=o.GetType()==="cxThread"?$(t).find("#"+o.GetType()):$(t).find("#"+o.GetType()).find(".div-table");if(a.length>0){a.empty();var f,l;if(o.GetType()==="cxThread"){for(f=!0;l=o.EnumChildren(f);){for(var c=0;c<l.GetChildCount();c++)l.GetChild(c).GetType()!==""?u+=(f===!0?"":" >> ")+"<span id='"+l.GetChild(c).GetType()+"'></span>":u+="<div class='div-table-col'>"+l.GetChild(c).GetValue()+"</div>";f=!1}a.append(u)}else for(f=!0;l=o.EnumChildren(f);f=!1){u="<div class='div-table-row'>";for(var c=0;c<l.GetChildCount();c++)l.GetChild(c).GetType()!==""?u+="<div class='div-table-col'><span id='"+l.GetChild(c).GetType()+"'></span></div>":u+="<div class='div-table-col'>"+l.GetChild(c).GetValue()+"</div>";u+="</div>",a.append(u)}}}for(var h in r)h==="CxObjName"?$(t).find("#CxObjName").text(r[h].GetDisplayName()):h.indexOf("CxMth")==0&&$(t).find("#"+h).attr("name",r[h].GetInputName());SiebelAppFacade.RuleEditPopupPR.superclass.ShowUI.call(this)},e}(),SiebelAppFacade.RuleEditPopupPR}));
