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
typeof SiebelAppFacade.AutomationAppletPluginPM=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.AutomationAppletPluginPM"),define("siebel/automationappletpluginpm",["siebel/listpmodel"],function(){return SiebelAppFacade.AutomationAppletPluginPM=function(){function i(e){SiebelAppFacade.AutomationAppletPluginPM.superclass.constructor.apply(this,arguments)}function s(){var t=l.call(this),n={};n[e.get("WS_MSG_COMMAND")]=e.get("WS_INLINEEDIT_DISA_READY"),t.SendMessage(n)}function o(t){var n=arguments[arguments.length-1],r=e.get("SWE_EXTN_RETVAL"),i=e.get("SWE_EXTN_CANCEL_ORIG_OP");if(n&&n instanceof Object&&t==="PlayScript"){var s=this.Get("DISAReady"),o=this.Get("GetRecordSet"),u=o.length,a=this.Get("MultiSelectMode");u!=0&&s&&!a?(n[i]=!0,n[r]=!0):(n[i]=!0,n[r]=!1)}return!0}function u(){this.Get("GetBusComp").IsCommitPending()&&this.ExecuteMethod("InvokeMethod","WriteRecord");var t=this.Get("GetBusComp").GetFieldValue("OrignalFileName"),n=this.Get("GetBusComp").GetFieldValue("FileName");this.SetProperty("OrigFileName",t),this.SetProperty("DisplayFileName",n);var r=l.call(this),i=CCFMiscUtil_CreatePropSet(),s=CCFMiscUtil_CreatePropSet(),o=CCFMiscUtil_CreatePropSet(),u=SiebelApp.S_App.GetService("Automation UI Service");if(u){i.SetProperty("fileName",t);var f={};f.async=!0,f.scope=this,f.npr=!0,f.selfbusy=!0,f.cb=function(){s=arguments[2];var i=s.GetProperty(e.get("SWE_RPC_PROP_RETURN_STATUS"));if(i!==e.get("SWE_RPC_PROP_STATUS_ERROR")&&!utils.IsEmpty(i)){var o=s.GetChildByType("ResultSet").GetProperty("ValidationError");if(!utils.IsEmpty(o)){var u=utils.Confirm(o);if(u==1){var f=s.GetChildByType("ResultSet").GetProperty("Response");if(f){var l=a(f,n,t);r&&l&&r.SendMessage(l)}}}else{var f=s.GetChildByType("ResultSet").GetProperty("Response");if(f){var l=a(f,n,t);r&&l&&r.SendMessage(l)}}}},u.InvokeMethod("GetContentofKwdFile",i,f)}}function a(e,t,n){var r={};return r.Content=e,r.filename=t,r.origfilename=n,r}function f(e,t){var n=CCFMiscUtil_CreatePropSet(),r="";t.indexOf("_kwdps")!==-1?r=t.substring(0,t.indexOf("_kwdps")):t.indexOf("_kwdpf")!==-1?r=t.substring(0,t.indexOf("_kwdpf")):r=t.substring(0,t.indexOf(".csv")),n.SetProperty("KWDPlayResponse",e),n.SetProperty("OriginalFileName",t),n.SetProperty("DisplayFileName",r);var i=CCFMiscUtil_CreatePropSet(),s=SiebelApp.S_App.GetService("Automation UI Service");if(s){var o={};o.async=!0,o.scope=this,o.npr=!0,o.selfbusy=!0,o.cb=function(){var e={};e.async=!0,e.scope=this,e.npr=!0,e.selfbusy=!0;var t=CCFMiscUtil_CreatePropSet();this.ExecuteMethod("InvokeMethod","RePopulate",t,e)},s.InvokeMethod("RenameKWDFile",n,o)}return!1}function l(){return n===null&&(n=SiebelApp.WebSocketManager.CreateWSHandler(t),n.SetAlertOnFail(!1),n.OnClose=p.bind(this),n.OnFail=h.bind(this),n.OnMessage=c.bind(this)),n}function c(e,t){var n=e.Ready,r=e.OrigFileName;n!==!0||r!==null&&r!==undefined?d.call(this,e):this.SetProperty("DISAReady",!0)}function h(){var e="",t;t=CCFMiscUtil_CreatePropSet(),t.SetType("GetProfileAttr"),t.SetProperty("attrName","Device"),e=SiebelApp.S_App.CallServerApp("GetProfileAttr",t),e=="Phone"||e=="Tablet"?console.log("DISA is supported only on Windows client."):console.log("Failed to Send Message to DISA")}function p(){this.SetProperty("DISAReady",!1);var e="",t;t=CCFMiscUtil_CreatePropSet(),t.SetType("GetProfileAttr"),t.SetProperty("attrName","Device"),e=SiebelApp.S_App.CallServerApp("GetProfileAttr",t),e=="Phone"||e=="Tablet"?console.log("DISA is supported only on Windows client."):console.log("Connection to DISA was lost")}function d(e){this.ExecuteMethod("DISAResponse",e);var t=e.PlayStatus,n=e.OrigFileName;if(t=="success")var r=f.call(this,"_kwdps",n);if(t=="fail")var r=f.call(this,"_kwdpf",n)}function v(e){alert(e)}function m(e){n&&(n.Unregister(),n=null)}var e=SiebelJS.Dependency("SiebelApp.Constants"),t="plugin_DISASiebelAutomationplugin";e.set("WS_"+t.toUpperCase()+"_VERSION","1.0.0");var n=null,r=0;return SiebelJS.Extend(i,SiebelAppFacade.ListPresentationModel),i.prototype.Init=function(){SiebelAppFacade.AutomationAppletPluginPM.superclass.Init.call(this),this.AddProperty("DISAReady",!0),s.call(this)},i.prototype.Setup=function(e){SiebelAppFacade.AutomationAppletPluginPM.superclass.Setup.apply(this,arguments),this.AddProperty("DisplayFileName",""),this.AddProperty("OrigFileName",""),this.AddMethod("callDISAPlugin",u,{sequence:!1,scope:this}),this.AddMethod("DISAResponse",function(){},{}),this.AddMethod("CanInvokeMethod",o,{scope:this,sequence:!0}),r++},i.prototype.EndLife=function(){SiebelAppFacade.AutomationAppletPluginPM.superclass.EndLife.apply(this,arguments),--r==0&&m.call()},i}(),"SiebelAppFacade.AutomationAppletPluginPM"}));
