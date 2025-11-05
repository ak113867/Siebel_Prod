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
typeof SiebelAppFacade.edetailerviewpm=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.edetailerviewpm"),define("siebel/edetailerviewpm",["siebel/viewpm"],function(){return SiebelAppFacade.edetailerviewpm=function(){function e(e){SiebelAppFacade.edetailerviewpm.superclass.constructor.call(this,e)}function t(){var e,t,n=SiebelApp.S_App.GetService("LS PCD Service"),r=SiebelApp.S_App.NewPropertySet(),i=SiebelApp.S_App.NewPropertySet();if(n){var s={};s.async=!1,s.scope=this,s.npr=!0,s.selfbusy=!0,s.cb=function(){r=arguments[2],e=r.childArray[0].GetProperty("RetVal"),t=r.childArray[0].GetProperty("CrossIndRetVal"),this.AddProperty("GetSysPref",e),this.AddProperty("GetCrossInd",t)},n.InvokeMethod("GeteDetailingSysPref",i,s)}}function n(e){var t=[],n="#s_",r="GetFullId",i=!1,s=SiebelAppFacade.ComponentMgr.FindComponent({id:this.Get("PlayerApplet")}),o=SiebelAppFacade.ComponentMgr.FindComponent({id:this.Get("RelatedApplet")});t.push(s),o&&t.push(o);var u=[],a=SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()});this.AddProperty("View",a);if(t)for(var f=0,l=t.length;f<l;f++){e.indexOf(n+t[f].Get(r)+"_div")>e.indexOf(n+t[0].Get(r)+"_div")?i=!1:i=!0;var c=e.indexOf(n+t[f].Get(r)+"_div"),h={childName:t[f].Get("GetName"),childLabel:t[f].Get("GetAppletLabel"),id:t[f].Get(r),displayState:i?!0:!1};this.ExecuteMethod("ComponentStateChange",h.id,h.displayState),u.splice(c,0,h)}this.AddProperty("ChildComponentState",u);var p,d=SiebelApp.S_App.GetService("LS PCD Service"),v=SiebelApp.S_App.NewPropertySet(),m=SiebelApp.S_App.NewPropertySet();if(d){var g={};g.async=!1,g.scope=this,g.npr=!0,g.selfbusy=!0,g.cb=function(){v=arguments[2],p=v.childArray[0].GetProperty("RetVal");if(p==="Y"){var r=SiebelAppFacade.ComponentMgr.FindComponent({id:"Contact Feedback List VBC Applet"});r&&t.push(r);if(t[2])var s=e.indexOf("#s_S_A"+t[2].Get("GetId")+"_div");t[f]&&(h={childName:t[f].Get("GetName"),childLabel:t[f].Get("GetAppletLabel"),id:t[f].Get("GetId"),displayState:i?!0:!1}),h.displayState="",$(n+h.id+"_div").addClass("siebui-addcontact-applet"),this.ExecuteMethod("ComponentStateChange",h.id,h.displayState),u.splice(s,0,h),this.AddProperty("ChildComponentState",u)}},d.InvokeMethod("GeteDetailingSysPref",m,g)}}function r(e){var t=this.Get("ChildComponentState");for(var n=0,r=t.length;n<r;n++)n!=="2"&&(t[n].displayState=!t[n].displayState),this.ExecuteMethod("ComponentStateChange",t[n].id,t[n].displayState)}function i(e,t){}function s(){var e=0}return SiebelJS.Extend(e,SiebelAppFacade.ViewPM),e.prototype.Init=function(){SiebelAppFacade.edetailerviewpm.superclass.Init.apply(this,arguments),this.AddMethod("PrepareStateInfo",n),this.AddMethod("SysPref",t),this.AddMethod("ComponentStateChange",i),this.AddMethod("ButtonCanInvoke",s),this.AddMethod("ChangeState",r),this.AddProperty("LastUpdatedRec",""),this.AddProperty("PlayerApplet",""),this.AddProperty("RelatedApplet",""),this.AddProperty("DetailingStartTime",""),this.AddProperty("hotspotappletname",""),this.AddProperty("PlayerStartTime",""),this.AddProperty("RelatedStartTime",""),this.AddProperty("Mode",""),this.AddProperty("UpdatePlayer","N"),this.AddProperty("ThreadbarFullId",""),this.AttachEventHandler("TabClick","ChangeState"),this.AddProperty("m_sessionData",CCFMiscUtil_CreatePropSet()),this.AddProperty("hotspotRelatedStartTime",""),this.AddProperty("hotspotRelatedEndTime",""),this.AddProperty("visited","N"),this.AddProperty("GetSysPref",""),this.AddProperty("GetCrossInd","")},e.prototype.Setup=function(e){SiebelAppFacade.edetailerviewpm.superclass.Setup.call(this,e)},e}(),"SiebelAppFacade.edetailerviewpm"}));
