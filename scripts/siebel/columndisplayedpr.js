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
typeof SiebelAppFacade.ColumnDisplayedRenderer=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.ColumnDisplayedRenderer"),define("siebel/columndisplayedpr",["siebel/phyrenderer"],function(){return SiebelAppFacade.ColumnDisplayedRenderer=function(){function r(){var e={};this.AddToContainers=function(t,n){e[t]=n},this.GetFromContainer=function(t){return e[t]},this.CleanUp=function(){e=null},SiebelAppFacade.ColumnDisplayedRenderer.superclass.constructor.apply(this,arguments)}function i(e,t,r){var i=this.GetPM(),s,o=[],u=[],a=t.GetRadioGroupPropSet(),f=0;if(a){var l=a.GetChildCount();for(f=0;f<l;f++)o.push(a.GetChild(f).GetProperty("DisplayName")),u.push(a.GetChild(f).GetProperty("FieldValue"))}a=r.GetRadioGroupPropSet();if(a){var l=a.GetChildCount();for(f=0;f<l;f++)o.push(a.GetChild(f).GetProperty("DisplayName")),u.push(a.GetChild(f).GetProperty("FieldValue"))}return e&&(s=function(){var t="";e.find("option").each(function(e,n){e!==0&&(t+=","),t+=u[o.indexOf(n.value)]});var r={};return r.ctrlName=this.GetName(),r.index=0,r.stateValue=t,r.OneEl=!0,i.ExecuteMethod("UpdateUIState",n.get("CTRLVALUE"),r),t}),s}function s(){var n=this.GetPM(),r=this.GetFromContainer(e),i=this.GetFromContainer(t),s=arguments[0],f=arguments[1],l=!0;switch(s){case"ShowItem":r.find("option:selected").prop("selected",!1),i.find("option:selected").remove().appendTo(r);break;case"HideItem":r.find("option:selected").remove().appendTo(i);break;case"ShowAllItems":i.find("option").remove().appendTo(r);break;case"HideAllItems":r.find("option").remove().appendTo(i);break;case"MoveItemTop":curr=r.find("option:selected"),curr.length===1&&(r.scrollTop(0),curr.insertBefore(r.find("option:first")));break;case"MoveItemBottom":curr=r.find("option:selected"),curr.length===1&&(r.scrollTop(r.height()),curr.insertAfter(r.find("option:last")));break;case"MoveItemUp":u.call(this);break;case"MoveItemDown":a.call(this);break;case"SaveUserPreferences":l=o.call(this);break;case"CloseApplet":case"ResetUserPreferences":l=!1}l&&(f.CancelOperation=!0,SiebelApp.S_App.uiStatus.Free(),s==="SaveUserPreferences"&&SWEAlert(n.Get("GetControls").ErrorNoItemsSelected.GetDisplayName()))}function o(){var t=this.GetPM(),n=t.Get("GetControls"),r=n[e];return r.GetValue().length===0?!0:!1}function u(){var t=this.GetFromContainer(e),n=t.find("option:selected"),r=n.prev(),i=t.find(n).index();t.animate({scrollTop:i*12},200),n.length===1&&r.length>0&&n.insertBefore(r)}function a(){var t=this.GetFromContainer(e),n=t.find("option:selected"),r=n.next(),i=t.find(n).index();t.animate({scrollTop:i*12},200),n.length===1&&r.length>0&&n.insertAfter(r)}var e="ShownItems",t="HiddenItems",n=SiebelJS.Dependency("SiebelApp.Constants");return SiebelJS.Extend(r,SiebelAppFacade.PhysicalRenderer),r.prototype.ShowUI=function(){var n=this.GetPM(),r=null,s=null,o=n.Get("GetControls"),u=this;SiebelAppFacade.ColumnDisplayedRenderer.superclass.ShowUI.apply(this,arguments),s=o[e],r=this.GetUIWrapper(s).GetEl(),utils.IsTrue(s.IsMultiValue())&&r.attr("multiple","multiple"),s.GetValue=i.call(this,r,o[e],o[t]),this.AddToContainers(e,r),r=null,s=null,s=o[t],r=this.GetUIWrapper(s).GetEl(),utils.IsTrue(s.IsMultiValue())&&r.attr("multiple","multiple"),this.AddToContainers(t,r),s.GetValue=i.call(this,r,o[e],o[t]),Object.keys(o).forEach(function(e){if(/(^ButtonShow|^ButtonHide|^ButtonMove)/.test(e)){var t=u.GetUIWrapper(o[e]).GetEl().find("a");eleLabel=SiebelApp.S_App.LookupStringCache(u.GetPM().Get("GetTitle"))+":"+t.children("img").attr("alt"),t.addClass("siebui-icon-"+e.toLowerCase()).attr({"aria-label":eleLabel,title:eleLabel})}}),r=null,s=null},r.prototype.GetPhysicalControlValue=function(e){var t=this.GetPM();e&&t.AddProperty("PhysicalCtrlVal",e.GetValue())},r.prototype.BindEvents=function(){var n=this.GetPM().Get("GetControls");SiebelAppFacade.ColumnDisplayedRenderer.superclass.BindEvents.apply(this,arguments),n&&(this.GetUIWrapper(n[t]).GetEl().off("blur change"),this.GetUIWrapper(n[e]).GetEl().off("blur change"))},r.prototype.Init=function(){SiebelAppFacade.ColumnDisplayedRenderer.superclass.Init.apply(this,arguments),this.AttachPMBinding("HandleClickEvent",s)},r.prototype.EndLife=function(){SiebelAppFacade.ColumnDisplayedRenderer.superclass.EndLife.apply(this,arguments),this.CleanUp()},r}(),SiebelAppFacade.ColumnDisplayedRenderer}));
