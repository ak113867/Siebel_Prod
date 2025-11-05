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
typeof SiebelAppFacade.AutomationtestScriptPM=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.AutomationtestScriptPM"),define("siebel/automationtestscriptpm",["siebel/pmodel"],function(){return SiebelAppFacade.AutomationtestScriptPM=function(){function s(e){SiebelAppFacade.AutomationtestScriptPM.superclass.constructor.call(this,e)}function o(n){var r=arguments[arguments.length-1],i=t.get("SWE_EXTN_RETVAL"),s=t.get("SWE_EXTN_CANCEL_ORIG_OP");if(r&&r instanceof Object&&n==="PlayTestScript"){var o=this.Get("DISAReady"),u=this.Get("GetRecordSet"),a=u.length;a!=0&&o&&e.IsTrue(SiebelApp.S_App.IsAutoOn())===!0?(r[s]=!0,r[i]=!0):(r[s]=!0,r[i]=!1)}return!0}function u(){var e=l.call(this),n={};n[t.get("WS_MSG_COMMAND")]=t.get("WS_INLINEEDIT_DISA_READY"),e.SendMessage(n)}function a(){var n=this.Get("GetBusComp").GetFieldValue("Id"),r=this.Get("GetBusComp").GetFieldValue("Name"),i=n,i=i.replace(/[^a-zA-Z0-9]/g,""),s=l.call(this),o=CCFMiscUtil_CreatePropSet(),u=CCFMiscUtil_CreatePropSet(),a=CCFMiscUtil_CreatePropSet(),c=SiebelApp.S_App.GetService("Automation UI Service");if(c){o.SetProperty("RowId",n);var h={};h.async=!0,h.scope=this,h.npr=!0,h.selfbusy=!0,h.cb=function(){u=arguments[2];var n=u.GetProperty(t.get("SWE_RPC_PROP_RETURN_STATUS"));if(n!==t.get("SWE_RPC_PROP_STATUS_ERROR")&&!e.IsEmpty(n)){var r=u.GetChildByType("ResultSet").GetProperty("Response"),o=u.GetChildByType("ResultSet").GetProperty("DSfilename"),a=u.GetChildByType("ResultSet").GetProperty("DSfilecontent");if(r)var l=f(r,i,i,o,a)}s&&s.SendMessage(l)},c.InvokeMethod("PlayTestScript",o,h)}}function f(e,t,n,r,i){var s={};return s.Content=e,s.filename=t,s.origfilename=n,r&&(s.Datasetfilename=r,s.Datasetfilecontent=i),s}function l(){return r===null&&(r=SiebelApp.WebSocketManager.CreateWSHandler(n),r.SetAlertOnFail(!1),r.OnClose=p.bind(this),r.OnFail=h.bind(this),r.OnMessage=c.bind(this)),r}function c(e,t){var n=e.Ready,r=e.OrigFileName;n!==!0||r!==null&&r!==undefined?d.call(this,e):this.SetProperty("DISAReady",!0)}function h(){var e="",t=CCFMiscUtil_CreatePropSet();t.SetType("GetProfileAttr"),t.SetProperty("attrName","Device"),e=SiebelApp.S_App.CallServerApp("GetProfileAttr",t),e=="Phone"||e=="Tablet"?console.log("DISA is supported only on Windows client."):console.log("Failed to Send Message to DISA")}function p(){this.SetProperty("DISAReady",!1);var e="",t;t=CCFMiscUtil_CreatePropSet(),t.SetType("GetProfileAttr"),t.SetProperty("attrName","Device"),e=SiebelApp.S_App.CallServerApp("GetProfileAttr",t),e=="Phone"||e=="Tablet"?console.log("DISA is supported only on Windows client."):console.log("Connection to DISA was lost")}function d(e){this.ExecuteMethod("DISAResponse",e)}function v(e){alert(e)}function m(e){r&&(r.Unregister(),r=null)}var e=SiebelJS.Dependency("SiebelApp.Utils"),t=SiebelJS.Dependency("SiebelApp.Constants"),n="plugin_DISASiebelAutomationplugin";t.set("WS_"+n.toUpperCase()+"_VERSION","1.0.0");var r=null,i=0;return SiebelJS.Extend(s,SiebelAppFacade.PresentationModel),s.prototype.Init=function(){SiebelAppFacade.AutomationtestScriptPM.superclass.Init.call(this),this.AddProperty("DISAReady",!0),u.call(this)},s.prototype.Setup=function(e){SiebelAppFacade.AutomationtestScriptPM.superclass.Setup.apply(this,arguments),this.AddMethod("callDISAPlugin",a,{sequence:!1,scope:this}),this.AddMethod("DISAResponse",function(){},{}),this.AddMethod("CanInvokeMethod",o,{scope:this,sequence:!0}),i++},s.prototype.EndLife=function(){SiebelAppFacade.AutomationtestScriptPM.superclass.EndLife.apply(this,arguments),--i==0&&m.call()},s}(),"SiebelAppFacade.AutomationtestScriptPM"}));
