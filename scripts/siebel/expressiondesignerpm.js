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
typeof SiebelAppFacade.ExpressionDesignerPM=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.ExpressionDesignerPM"),define("siebel/expressiondesignerpm",["siebel/pmodel"],function(){return SiebelAppFacade.ExpressionDesignerPM=function(){function r(t,n,r){var i=SiebelAppFacade.PresentationModel.GetCtrlTemplate(t,t,e.get("SWE_PST_BUTTON_CTRL"),1);i.SetType(e.get("SWE_PST_CNTRL")),i.SetPropertyStr(e.get("SWE_PROP_NAME"),t),i.SetPropertyStr(e.get("SWE_PROP_TYPE"),e.get("SWE_PST_BUTTON_CTRL")),i.SetPropertyStr(e.get("SWE_PROP_JUSTIFICATION"),"center"),r?(i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),t),i.SetPropertyStr(e.get("SWE_PROP_MTHD_NAME"),"AddElmnt"),i.SetPropertyStr(e.get("SWE_PROP_SPAN"),"AddElement"),i.SetPropertyStr("cph","AddElement")):(i.SetPropertyStr(e.get("SWE_PROP_MTHD_NAME"),t),i.SetPropertyStr(e.get("SWE_PROP_SPAN"),t),i.SetPropertyStr("cph",t)),t==="AND"||t==="OR"||t==="NOT"?i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),t):t==="EQUAL"?i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),"="):t==="GREATER_THAN"?i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),">"):t==="LESS_THAN"?i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),"<"):t==="NOT_EQUAL"?i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),"<>"):t==="LESS_THAN_EQUAL"?i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),"<="):t==="GREATER_THAN_EQUAL"?i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),">="):t==="NOT_EQUAL"?i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),"<>"):t==="IS_NULL"?i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),"IS NULL"):t==="IS_NOT_NULL"?i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),"IS NOT NULL"):t==="METHOD"&&i.SetPropertyStr(e.get("SWE_PROP_DISP_NAME"),"()"),n.ExecuteMethod("AddClientControl",i)}function i(e){SiebelAppFacade.ExpressionDesignerPM.superclass.constructor.call(this,e)}function s(t){var n=t.GetProperty(e.get("SWE_PROP_NOTI_TYPE"));if(n===e.get("SWE_EXPR_SYNTAX")){var r=[],i=t.GetProperty(e.get("SWE_PROP_ARGS_ARRAY"));i&&(CCFMiscUtil_StringToArray(i,r),this.SetProperty("Syntax",r[0]))}}function o(e){var t=this.Get("MethodArray"),r=!0,i=arguments[arguments.length-1];t&&n.IndexOf(t,e)>=0&&(i.CancelOperation=!0,i.ReturnValue=!0)}function u(e,t){var r={OR:"OR",AND:"AND",NOT:"NOT",EQUAL:"=",GREATER_THAN:">",LESS_THAN:"<",NOT_EQUAL:"<>",LESS_THAN_EQUAL:"<=",GREATER_THAN_EQUAL:">=",IS_NULL:"IS NULL",IS_NOT_NULL:"IS NOT NULL",METHOD:"()"},i,s,o=arguments[arguments.length-1],u=this.ExecuteMethod("GetControl","Expression");this.ExecuteMethod("GetSelectedText");if(e==="AddElmnt"){var a,f;this.ExecuteMethod("InvokeMethod","AddElement",f,a);var l=this.Get("Syntax");l&&(s=l)}else r.hasOwnProperty(e)&&(s=r[e]);var c=this.Get("MethodArray");c&&n.IndexOf(c,e)>=0&&(!this.Get("StartText").endsWith(" ")&&!n.IsEmpty(this.Get("StartText"))&&(s=" "+s),!this.Get("EndText").startsWith(" ")&&!n.IsEmpty(this.Get("EndText"))&&(s+=" "),i=this.Get("StartText")+s+this.Get("EndText"),this.ExecuteMethod("SetFormattedValue",u,i),this.ExecuteMethod("SetCursorPosition"),o.CancelOperation=!0,o.ReturnValue="true",SiebelApp.S_App.uiStatus.Free())}var e=SiebelJS.Dependency("SiebelApp.Constants"),t=SiebelJS.Dependency("SiebelApp.S_App.LocaleObject"),n=SiebelJS.Dependency("SiebelApp.Utils");return SiebelJS.Extend(i,SiebelAppFacade.PresentationModel),i.prototype.Init=function(){SiebelAppFacade.ExpressionDesignerPM.superclass.Init.call(this);var t=["AddElmnt","OR","AND","NOT","EQUAL","GREATER_THAN","LESS_THAN","NOT_EQUAL","LESS_THAN_EQUAL","GREATER_THAN_EQUAL","IS_NULL","IS_NOT_NULL","METHOD"];this.AddProperty("Syntax",""),this.AddProperty("StartText",""),this.AddProperty("EndText",""),this.AddProperty("MethodArray",t),this.AddMethod("InvokeMethod",u,{sequence:!0,scope:this}),this.AddMethod("CanInvokeMethod",o,{sequence:!0,scope:this}),this.AttachNotificationHandler(e.get("SWE_PROP_BC_NOTI_GENERIC"),s),this.AddMethod("GetSelectedText",function(){}),this.AddMethod("SetCursorPosition",function(){})},i.prototype.UpdateModel=function(e){SiebelAppFacade.ExpressionDesignerPM.superclass.UpdateModel.call(this,e);var t=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_EXPR_DESGN_ADD_ELEM");r(t,this,!0);var n="OR";r(n,this,!1);var i="AND";r(i,this,!1);var s="NOT";r(s,this,!1);var o="EQUAL";r(o,this,!1);var u="GREATER_THAN";r(u,this,!1);var a="LESS_THAN";r(a,this,!1);var f="NOT_EQUAL";r(f,this,!1);var l="LESS_THAN_EQUAL";r(l,this,!1);var c="GREATER_THAN_EQUAL";r(c,this,!1);var h="IS_NULL";r(h,this,!1);var p="IS_NOT_NULL";r(p,this,!1);var d="METHOD";r(d,this,!1)},i}(),SiebelAppFacade.ExpressionDesignerPM}));
