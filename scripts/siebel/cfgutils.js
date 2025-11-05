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
typeof SiebelApp.cfgUtils=="undefined"&&Namespace("SiebelApp.cfgUtils"),SiebelApp.cfgUtils.CheckIncompleteInstance=function(e){var t=!1,n=SiebelApp.cfgUtils.FindApplet(SiebelAppFacade.ConfiguratorPresentationModel);if(n!=null){var r=n.GetPModel(),i=r.Get("TopRequireMoreChild"),s=r.Get("MissingReqAttrArray"),o=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CXP_UI_INCOMPLETE_CONFIG");if(i==="Y"||s.length>0){if(s.length>0){o+="\n"+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CXP_UI_WARNING_FILL_REQUIRED_ATTRIBUTES");for(var u=0;u<s.length;u++)o+="\n"+s[u]}SiebelApp.cfgUtils.cfgConfirm(o,e)?r.SetProperty("topRequireMoreChild",""):(r.SetProperty("RequestLock",!1),t=!0)}else e&&(t=SiebelApp.cfgUtils.CheckIncompleteInstanceInList(applet))}return t},SiebelApp.cfgUtils.CheckIncompleteInstanceInList=function(){var e=!1,t=SiebelApp.cfgUtils.FindApplet(SiebelAppFacade.ParallelConfigListAppletPM),n=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CXP_UI_INCOMPLETE_CONFIG_SAVEALL");if(t!=null){var r=t.GetBusComp()?t.GetBusComp().GetIdValue():"",i=t.GetPModel(),s="";rec=i.Get("GetRawRecordSet");for(var o=0,u=rec.length;o<u;o++){s=rec[o]["Has Generics Flag"];if(rec[o]["Id"]!=r&&s==="Y"){SiebelApp.cfgUtils.cfgConfirm(n,!0)||(e=!0);break}}}return e},SiebelApp.cfgUtils.FindApplet=function(e){try{var t=SiebelApp.S_App.GetActiveView(),n=t.GetAppletMap(),r=null;for(applet in n)if(n[applet].GetPModel()instanceof e){r=n[applet];break}}catch(i){SiebelJS.Log("OpenUI_CFG::Error searching cfg instance applet::"+i)}return r==null&&SiebelJS.Log("OpenUI_CFG::No cfg instance applet found"),r},SiebelApp.cfgUtils.cfgConfirm=function(e,t){var n=SiebelApp.cfgUtils.FindApplet(SiebelAppFacade.ParallelConfigButtonPM),r=n.GetPModel().Get("BlockExit"),i=n.GetPModel().Get("BlockExitMsg"),s=t&&r?!0:!1,o=!0;return s?(alert(i),retVal=!1):retVal=confirm(e),retVal};
