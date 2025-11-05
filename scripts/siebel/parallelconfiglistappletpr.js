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
typeof SiebelAppFacade.ParallelConfigListAppletPR=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.ParallelConfigListAppletPR"),define("siebel/parallelconfiglistappletpr",["siebel/jqgridrenderer"],function(){return SiebelAppFacade.ParallelConfigListAppletPR=function(){function e(){SiebelAppFacade.ParallelConfigListAppletPR.superclass.constructor.apply(this,arguments)}return SiebelJS.Extend(e,SiebelAppFacade.JQGridRenderer),e.prototype.ShowUI=function(){SiebelAppFacade.ParallelConfigListAppletPR.superclass.ShowUI.call(this);var e=this.GetGrid().jqGrid("getGridParam","colModel");for(var t=0;e&&t<e.length;t++)e[t].controlType==="ImageControl"&&(e[t].formatter=function(e){return e},e[t].unformat=function(e){return e})},e.prototype.FocusFirstControl=function(){var e="#s_"+this.GetPM().Get("GetFullId")+"_div table [aria-selected=true]";$(e).length>0&&$(e)[0].focus();return},e.prototype.BindData=function(){SiebelAppFacade.ParallelConfigListAppletPR.superclass.BindData.apply(this,arguments);var e=this.GetPM(),t=e.Get("GetRawRecordSet");if(t){var n=$("div#"+e.Get("GetFullId")).find("tr.ui-widget-content"),r,i,s,o,u,a=[],f={},l=e.Get("PrdName"),c=SiebelJS.Dependency("SiebelApp.Constants"),h=c.get("SWE_PROP_AUTOM_RN"),p=c.get("SWE_PROP_AUTOM_OT"),d=c.get("SWE_PROP_AUTOM_UN"),v=e.Get("NRCTitle"),m=e.Get("MRCTitle"),g=e.Get("Quantity"),y=e.Get("EligStatus"),b=e.Get("EligComment"),w="",E="",S=SiebelJS.Dependency("SiebelApp.Utils");for(var x=0,T=t.length;x<T;x++){r=t[x]["Action Code"]||"";if(r=="-"||r=="")r="no-status";t[x]["Currency Code"]&&(w=SiebelApp.S_App.LocaleObject.GetCurrency(t[x]["Currency Code"]).m_sSymbol);var N=t[x].Product,C=w+(t[x]["NRC CxTotal"]||0),k=w+(t[x]["MRC CxTotal"]||0),L=t[x].IsModified,A=t[x]["Eligibility Status"],O=t[x]["Eligibility Reason"],M=t[x]["Eligibility Status"]||e.Get("None"),_=t[x]["Eligibility Reason"]||e.Get("None"),D=t[x].Quantity,P="",H="",B="";L=="Y"?(i="active",P="aria-label='"+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_CKEDITOR_BTN_MODIFY")+"'"):i="inactive",r=="Add"&&(H="aria-label='"+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_CKEDITOR_BTN_ADD")+"'"),r=="Update"&&(H="aria-label='"+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_BARCODE_TOOLTIP_UPDATE")+"'"),A=="N"?(u="error",B="aria-label='"+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CLIENT_WARNING")+"'"):u="no_font_icon",O!=""&&(E=" "),S.IsTrue(SiebelApp.S_App.IsAutoOn())&&$(n[x]).find("td").attr({UN:N,RN:N,OT:N}),s=$(n[x]).find(".cell-wrapper img").attr("src")||$(n[x]).find(".cell-wrapperleaf img").attr("src")||"<DIV></DIV>",$(n[x]).find(".cell-wrapper").empty(),$(n[x]).find(".cell-wrapperleaf").empty();var j="",F=t[x]["Has Generics Flag"];F==="Y"&&(j='<span class="siebui-icon-alert eCfgSpanWarning"></span>'),$(n.eq(x).find("span").eq(0)).append("<img class='parallel-prod-img' src='"+s+"' /><span>"+N+"</span>&nbsp;<span "+P+"class='siebui-modified-status-"+i+"'></span><span "+B+"class='siebui-icon-"+u+"'></span><span "+H+"class='siebui-prod-status "+r.replace(/ /g,"-").toLowerCase()+" '></span>&nbsp;<span>["+(C||0)+"</span>,&nbsp;<span>"+(k||0)+" ]</span>"+"<span>"+E+O+"</span>"+j).insertBefore(n.eq(x).find("span").eq(0));var I=l+": "+N+" \n"+v+": "+C+"\n"+m+": "+k+" \n"+g+": "+D+" \n"+y+": "+M+" \n"+b+": "+_+" \n";$(n[x]).find("td").attr("title",I);var q=$('<div class="siebui-config-tooltip-wrapper"></div>'),R=$(n[x]).find("td")}}},e}(),SiebelAppFacade.ParallelConfigListAppletPR}));
