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
typeof SiebelAppFacade.AttachmentPRenderer=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.AttachmentPRenderer"),define("siebel/attachmentprenderer",["siebel/jqgridrenderer"],function(){return SiebelAppFacade.AttachmentPRenderer=function(){function r(e){SiebelAppFacade.AttachmentPRenderer.superclass.constructor.call(this,e)}function i(){var e=this.GetPM(),r=$("#openFileDialog");if(r.length<=0){var i="<div id='openFileDialog' style='padding:10px;'></div>";r=$(i)}var s=n.GetLocalString("IDS_CLIENT_FILE_DOWNLOAD");openFileDialogInfo=s+". (0/1)",r.html(openFileDialogInfo),r.dialog({title:s,modal:!0,autoOpen:!1,beforeClose:function(){if(e.Get("IsOpening"))return t.Confirm(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_POPUP_CLOSEBYX_WARNING"))?(e.SetProperty("IsOpening",!1),!0):!1},dialogClass:"siebui-open-file-dialog-popup"}),r.dialog("open")}function s(){var e=this.GetPM().Get("DISAReady"),t=this.GetPM().Get("CanInvokeViewBtn");e&&t?$(".siebui-icon-getattachmentselection").removeClass("appletButtonDis").addClass("appletButton").removeAttr("disabled").attr("tabindex",0):$(".siebui-icon-getattachmentselection").removeClass("appletButton").addClass("appletButtonDis").prop("disabled","disabled").attr("tabindex",-1)}function o(){var e=this.GetPM().Get("DownloadStatus");u(e.file,e.index,e.total)}function u(e,t,n){var r=$("#openFileDialog");if(r.length>0){var i=e+" . ("+t+"/"+n+").";r.html(i)}}function a(){var e=this.GetPM().Get("ShowFileDialog"),t=$("#openFileDialog");if(t.length<=0){e&&i.call(this);return}e?t.dialog("open"):t.dialog("close")}var e=SiebelJS.Dependency("SiebelApp.Constants"),t=SiebelJS.Dependency("SiebelApp.Utils"),n=SiebelJS.Dependency("SiebelApp.S_App.LocaleObject");return SiebelJS.Extend(r,SiebelAppFacade.JQGridRenderer),r.prototype.Init=function(){SiebelAppFacade.AttachmentPRenderer.superclass.Init.call(this),this.AttachPMBinding("ShowFileDialog",a,{scope:this}),this.AttachPMBinding("DownloadStatus",o,{scope:this}),this.AttachPMBinding("DISAReady",s,{scope:this})},r.prototype.EndLife=function(){var e=$("#openFileDialog");e.length>0&&e.remove(),SiebelAppFacade.AttachmentPRenderer.superclass.EndLife.call(this)},r.prototype.ShowUI=function(){SiebelAppFacade.AttachmentPRenderer.superclass.ShowUI.call(this),$(".siebui-icon-getattachmentselection").removeClass("appletButton").addClass("appletButtonDis").prop("disabled","disabled").attr("tabindex",-1),this.GetPM().OnControlEvent("OnButtonCreated")},r.prototype.EnableControl=function(e,t,n){var r=t;e.GetMethodName()==="GetAttachmentSelection"&&(this.GetPM().Get("CanInvokeViewBtn")!=t&&this.GetPM().SetProperty("CanInvokeViewBtn",t),r=this.GetPM().Get("DISAReady")&r),SiebelAppFacade.AttachmentPRenderer.superclass.EnableControl.call(this,e,r,n)},r}(),SiebelAppFacade.AttachmentPRenderer}));
