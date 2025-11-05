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
typeof SiebelAppFacade.OPAPRenderer=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.OPAPRenderer"),define("siebel/opaprenderer",["siebel/phyrenderer"],function(){return SiebelAppFacade.OPAPRenderer=function(){function n(e){SiebelAppFacade.OPAPRenderer.superclass.constructor.call(this,e)}var e=SiebelJS.Dependency("SiebelApp.Constants"),t=SiebelApp.Utils;return SiebelJS.Extend(n,SiebelAppFacade.PhysicalRenderer),n.prototype.ShowUI=function(){var e=this,n="",r="",i="",s="",o="",u="",a="",f="",l=this.GetPM().Get("GetRawRecordSet"),c={};l.forEach(function(e){c[e["Param Name"]]=e["Param Value"]}),n=c["WebDeterminations URL"],r=c.Rulebase,i=c.locale,$.getScript(n+"/staticresource/interviews.js").done(function(){var e=document.getElementsByTagName("head")[0],s=document.createElement("link");s.type="text/css",s.rel="stylesheet",s.href=n+"/staticresource/fonts/fonts.css",s.async=!1,e.appendChild(s);var o=document.createElement("link");linkEl1type="text/css",o.rel="stylesheet",o.href=n+"/staticresource/interviews.css",e.appendChild(o);var u=document.getElementById("opa-interview"),a={},f=c.OIAParamMapping.split(";"),l=f.length;for(var h=0;h<l;h++){var p=f[h].split("|");p.length>=2&&(a[p[1]]=c[p[0]])}if(c.Action&&c.Action==="RestoreSession"){var d=function(t){window.location=t};OraclePolicyAutomationEmbedded.ResumeInterview(u,n,r,i,"",a,null,d)}else{if(t.IsTrue(c["Create Application Flag"])){var v=SiebelApp.S_App.GetService(c["App Creation Service"]);if(v){var m=SiebelApp.S_App.NewPropertySet(),g=SiebelApp.S_App.NewPropertySet();m.SetProperty("BC Name",c["App BC Name"]),m.SetProperty("BO Name",c["App BO Name"]),m.SetProperty("InputField:Name",c["App InputField:Name"]),m.SetProperty("InputField:Status",c["New Application Status"]),m.SetProperty("Method",c["App Creation Method"]),m.SetProperty("Search Spec",c["App Searchspec"]),m.SetProperty("InputField:Submitted By",c.Id),m.SetProperty("OutputField:Application Num",""),m.SetProperty("OutputField:Id",""),g=v.InvokeMethod("UpsertRecord",m);var y=SiebelApp.S_App.NewPropertySet();y=g.GetChildByType("ResultSet");var b=y.GetProperty("Application Num"),w=y.GetProperty("Id");a.checkpointId=b,a.ApplNumber=b,a.ApplicationRowID=w}}var d=function(t){window.location=t};OraclePolicyAutomationEmbedded.StartInterview(u,n,r,i,"",a,null,null,d)}}),SiebelAppFacade.OPAPRenderer.superclass.ShowUI.call(this)},n.prototype.BindEvents=function(){var e=SiebelAppFacade.ComponentMgr.FindComponent(SiebelApp.S_App.WPName())},n.prototype.EndLife=function(){SiebelAppFacade.OPAPRenderer.superclass.EndLife.call(this)},n}(),SiebelAppFacade.OPAPRenderer}));
