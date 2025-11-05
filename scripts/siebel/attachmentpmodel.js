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
typeof SiebelAppFacade.AttachmentPModel=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.AttachmentPModel"),define("siebel/attachmentpmodel",["siebel/listpmodel"],function(){return SiebelAppFacade.AttachmentPModel=function(){function r(e){SiebelAppFacade.AttachmentPModel.superclass.constructor.call(this,e)}function i(){var t=this.Get("InlineEditHandler");return t===null&&(t=SiebelApp.WebSocketManager.CreateWSHandler(e.get("WS_COMPONENT_TYPE_INLINE_EDIT")),t.SetAlertOnFail(!1),t.timeoutID=null,t.OnClose=s.bind(this),t.OnFail=o.bind(this),t.OnMessage=u.bind(this),this.SetProperty("InlineEditHandler",t)),t}function s(){this.SetProperty("IsOpening",!1),this.SetProperty("DISAReady",!1),SiebelJS.Debug("[DISA][Warning] DISA was closed.")}function o(){this.SetProperty("IsOpening",!1),SiebelJS.Debug("[DISA][Warning] Send message to DISA failed.")}function u(r,i){var s=r[e.get("WS_INLINEEDIT_DISA_READY")];s===!0&&this.SetProperty("DISAReady",!0);var o=r[e.get("WS_MSG_TYPE_IN_ERROR")];if(o){var u=n.GetLocalString(o);u||(u=o),t.Alert(u);return}var a=r[e.get("WS_INLINEEDIT_FILE_TRANSFERRED")];if(a===!0)return}function a(){var t=i.call(this),n={};n[e.get("WS_MSG_COMMAND")]=e.get("WS_INLINEEDIT_DISA_READY"),t.SendMessage(n)}function f(n){var r=n.GetProperty(e.get("SWE_PROP_ARGS_ARRAY"));if(r){var s=[];CCFMiscUtil_StringToArray(r,s);var o=s.length;if(o===0)return;var u=this,a=e.get("SWE_CMD_ARG"),f=e.get("SWE_APPLET_STR"),l=e.get("SWE_ACTIVE_APPLET_STR"),c=e.get("SWE_VIEW_ARG"),h=e.get("SWE_ACTIVE_VIEW_STR"),p=e.get("SWE_METHOD_STR"),d=e.get("SWE_PROP_SESSION_RANDOM_NUMBER"),v=e.get("SWE_VIEW_RPC_ARG"),m=this.Get("GetName"),g=SiebelApp.S_App.GetActiveView().GetName(),y=SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName(),b=SiebelApp.S_App.GetPageURL();u.SetProperty("IsOpening",!0),u.SetProperty("ShowFileDialog",!0),u.SetProperty("DownloadStatus",{file:"",index:1,total:o});for(var w=0;w<o;++w){var E=s[w],S=[];CCFMiscUtil_StringToArray(E,S);var x=S[0],T=S[1],N=S[2],C=f+"="+m+"&"+c+"="+g+"&"+l+"="+y+"&"+h+"="+g+"&"+a+"="+e.get("SWE_CMD_INVOKE_METHOD_STR")+"&"+p+"="+"DownloadFile"+"&FullPath="+x+"&File="+T+"&"+v+"="+"0"+"&"+d+"="+SiebelApp.S_App.GetSRN();t.IsEmpty(SiebelApp.S_App.GetTabId())||(C+=e.get("SWE_ARG_DELIM")+e.get("SWE_PROP_BROWSER_TAB_ID")+e.get("SWE_ARG_EQUAL")+SiebelApp.S_App.GetTabId()),$(u).queue("fileRequests",function(t,n,r){return function(){if(!u||!u.Get("IsOpening")){$(u).clearQueue("fileRequests");return}u.SetProperty("DownloadStatus",{file:n,index:t+1,total:o});var s=new window.XMLHttpRequest;s.onreadystatechange=function(){if(this.readyState===4&&this.status===200){t==o-1&&(u.SetProperty("IsOpening",!1),u.SetProperty("ShowFileDialog",!1));var r=i.call(u),s={};s[e.get("WS_INLINEEDIT_FILE_READONLY")]=!0,r.SendMessage(this.response,n,s),$(u).dequeue("fileRequests")}},s.open("POST",b),s.setRequestHeader("Content-type","application/x-www-form-urlencoded"),s.setRequestHeader("X-Attachment","true"),s.responseType="blob",s.send(r)}}(w,N,C))}$(u).dequeue("fileRequests")}}var e=SiebelJS.Dependency("SiebelApp.Constants"),t=SiebelJS.Dependency("SiebelApp.Utils"),n=SiebelJS.Dependency("SiebelApp.S_App.LocaleObject");return SiebelJS.Extend(r,SiebelAppFacade.ListPresentationModel),r.prototype.Init=function(){SiebelAppFacade.AttachmentPModel.superclass.Init.call(this),this.AddProperty("IsOpening",!1),this.AddProperty("ShowFileDialog",!1),this.AddProperty("DownloadStatus",{}),this.AddProperty("DISAReady",!1),this.AddProperty("CanInvokeViewBtn",this.Get("GetSelection")!=-1),this.AddProperty("InlineEditHandler",null),this.AttachEventHandler("OnButtonCreated",function(){a.call(this)}),this.AttachNotificationHandler(e.get("SWE_PROP_BC_NOTI_GENERIC"),function(t){var n=t.GetProperty(e.get("SWE_PROP_NOTI_TYPE"));n==="NotifyAttachments"&&f.call(this,t)})},r.prototype.Setup=function(e){SiebelAppFacade.AttachmentPModel.superclass.Setup.call(this,e)},r}(),SiebelAppFacade.AttachmentPModel}));
