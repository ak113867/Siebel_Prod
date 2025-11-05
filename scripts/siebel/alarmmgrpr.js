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
typeof SiebelAppFacade.AlarmMgrPR=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.AlarmMgrPR"),define("siebel/alarmmgrpr",["siebel/phyrenderer"],function(){return SiebelAppFacade.AlarmMgrPR=function(){function t(e){SiebelAppFacade.AlarmMgrPR.superclass.constructor.call(this,e);var t="";this.SetDocTitle=function(e){t=e},this.GetDocTitle=function(){return t}}function n(){var e=this.GetPM(),t=$("#s_"+e.Get("GetFullId")+"_div");e.Get("nextAlarm")===0?(t.removeClass("Selected siebui-active").addClass("NotSelected siebui-nonactive"),t.dialog("close")):t.dialog("isOpen")||(t.dialog("open"),t.addClass("Selected siebui-active").removeClass("NotSelected siebui-nonactive").attr("tabindex",0).focus(),document.hasFocus()||r.call(this)),t=null}function r(){var t=this.GetPM(),n=this,r=t.Get("AlarmFlashInterval")*1e3,s=t.Get("AlarmFlashTimeout")*1e3,o=t.Get("AlarmAudio"),u=t.Get("GetAppletLabel"),a=!0;this.SetDocTitle(document.title),e=setInterval(function(){if(document.hasFocus())i.call(n);else{if(a){document.title=u;if(o){var e=o.play();e&&e.catch(function(e){console.log("Unable to play audio due to "+e)})}}else document.title=n.GetDocTitle();a=!a}setTimeout(function(){i.call(n)},s)},r)}function i(){if(e===0)return;clearInterval(e),e=0,document.title=this.GetDocTitle()}var e=0;return SiebelJS.Extend(t,SiebelAppFacade.PhysicalRenderer),t.prototype.Init=function(){SiebelAppFacade.AlarmMgrPR.superclass.Init.call(this);var t=this.GetPM(),n=this,r=$("#s_"+t.Get("GetFullId")+"_div"),s=t.Get("GetAppletLabel");r.find("form").attr("name","SWEAlarmForm0_0"),r.dialog({autoOpen:!1,height:"auto",width:"auto",title:s,modal:!0,closeOnEscape:!1,resizable:!1,draggable:!1}),r.parent().find(".ui-dialog-titlebar-close").addClass("siebui-alarmmgr-close-btn"),r.addClass("siebui-alarmmgr-applet"),this.AttachPMBinding("RefreshUI",this.RefreshUI),window.addEventListener("focus",function(t){e!==0&&i.call(n)})},t.prototype.ShowUI=function(){var e=SiebelJS.Dependency("SiebelApp.Constants"),t=e.get("SWE_PST_BUTTON_CTRL"),r=e.get("SWE_CTRL_TEXT"),i=e.get("SWE_CTRL_TEXTAREA"),s=this.GetPM();SiebelAppFacade.AlarmMgrPR.superclass.ShowUI.call(this),n.call(this);var o,u,a=s.Get("GetControls");for(var f in a)a.hasOwnProperty(f)&&(u=a[f],o=this.GetUIWrapper(u).GetEl(),o&&o.length&&(u.GetUIType()===t?o.addClass("siebui-alarmmgr-btn"):u.GetUIType()===r?o.addClass("siebui-alarmmgr-field"):u.GetUIType()===i&&(o.addClass("siebui-alarmmgr-field"),o.addClass("siebui-alarmmgr-comment"))))},t.prototype.BindData=function(){SiebelAppFacade.AlarmMgrPR.superclass.BindData.call(this);var e=this.GetPM(),t,n,r=e.Get("GetControls");for(var i in r)if(r.hasOwnProperty(i)){var s=r[i];s.GetUIType()==="JTextArea"&&(t=this.GetUIWrapper(s),n=t.GetEl(),n&&(n.css("height","10px"),n.css("height",n[0].scrollHeight)))}},t.prototype.RefreshUI=function(){var e=this.GetPM();if(!e.Get("RefreshUI"))return;n.call(this),$("#s_"+e.Get("GetFullId")+"_div").dialog("isOpen")&&(this.BindData(),this.UpdateUIButtons()),e.SetProperty("RefreshUI",!1)},t}(),SiebelAppFacade.AlarmMgrPR}));
