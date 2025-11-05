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
typeof SiebelAppFacade.TaskWatchWindowPresentationModel=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.TaskWatchWindowPresentationModel"),define("siebel/taskwatchwindowpm",["siebel/pmodel"],function(){return SiebelAppFacade.TaskWatchWindowPresentationModel=function(){function i(){SiebelAppFacade.TaskWatchWindowPresentationModel.superclass.constructor.apply(this,arguments)}function s(e,t,n,r){this.ExecuteMethod("HandleClickEvent",e,r)}function o(r){var i;if(r.GetType()===e.get("SWE_PST_TOGGLE_TCSI"))for(var s=r.EnumChildren(!0);s;s=r.EnumChildren(!1))i=s.propArray[e.get("TSK_CHAPTER_DISPLAY_NAME")]||"",n.push(i);else if(r.GetType()===e.get("SWE_PST_TOGGLE_TDI")){for(var s=r.EnumChildren(!0);s;s=r.EnumChildren(!1)){var u={Name:s.propArray[e.get("SWE_PST_TOGGLE_TN")]||"",Value:s.propArray[e.get("SWE_PST_TOGGLE_TV")]||"",Type:s.propArray[e.get("SWE_PST_TOGGLE_TT")]||"",children:[],isLeaf:!1,expanded:!1,loaded:!0};t.push(u);for(var a=s.EnumChildren(!0);a;a=s.EnumChildren(!1)){var f={Name:a.propArray[e.get("SWE_PST_TOGGLE_TN")]||"",Value:a.propArray[e.get("SWE_PST_TOGGLE_TV")]||"",Type:a.propArray[e.get("SWE_PST_TOGGLE_TT")]||"",children:[],isLeaf:!0,expanded:!0,loaded:!0};u.children.push(f),f=null}u=null}colModelNames=["Name","Value","Type"]}else for(var s=r.EnumChildren(!0);s;s=r.EnumChildren(!1))o(s)}var e=SiebelJS.Dependency("SiebelApp.Constants"),t=[],n=[],r=[];return SiebelJS.Extend(i,SiebelAppFacade.PresentationModel),i.prototype.Init=function(){SiebelAppFacade.TaskWatchWindowPresentationModel.superclass.Init.apply(this,arguments),this.AddMethod("HandleClickEvent",function(e){}),this.AddMethod("InvokeMethod",s,{sequence:!0,scope:this})},i.prototype.Setup=function(i){var s=i.EnumChildren(!0);n=[],colModelNames=[],r=[],t=[];if(s)do if(s.GetType()===e.get("SWE_APPLET_PM_PS")){o.call(this,s);break}while(s=i.EnumChildren(!1));this.AddProperty("col_model_names",colModelNames),this.AddProperty("col_names",n),this.AddProperty("tree_data",t),SiebelAppFacade.TaskWatchWindowPresentationModel.superclass.Setup.call(this,i)},i}(),SiebelAppFacade.TaskWatchWindowPresentationModel}));
