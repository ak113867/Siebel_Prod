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
typeof SiebelAppFacade.TaskWatchWindowRenderer=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.TaskWatchWindowRenderer"),define("siebel/taskwatchwindowpr",["3rdParty/jqGrid/current/js/i18n/grid.locale-en.js","3rdParty/jqGrid/current/js/jquery.jqGrid.min.js","3rdParty/jqgrid-ext.js","siebel/phyrenderer"],function(){return SiebelAppFacade.TaskWatchWindowRenderer=function(){function t(){SiebelAppFacade.TaskWatchWindowRenderer.superclass.constructor.apply(this,arguments),this.setGrid=function(e){m_grid=e},this.getGrid=function(){return m_grid}}function n(e){var t=SiebelApp.S_App.GetService("Task UI Service (SWE)");if(t){var n={};n.async=!0,n.scope=this,n.npr=!0,n.cb=function(){var t=arguments[2].childArray[1].propArray.CallStack;t=t.replace(/&nbsp;/g,""),$(e).children("#CallStack_Label").length||$(e).append("<span id='CallStack_Label'></span>"),$(e).children("#CallStack_Label").text(t)},t.InvokeMethod("GetCallStack",CCFMiscUtil_CreatePropSet(),n)}}function r(e){var t=SiebelApp.S_App.GetService("Task UI Service (SWE)");if(t){var n=this.GetPM(),r={};r.async=!0,r.scope=this,r.npr=!0,r.cb=function(){var t=arguments[2].childArray[0].propArray.LastAction;$(e).children("#LastAction_Label_"+n.Get("GetId")).text($(e).children("#LastAction_Label_"+n.Get("GetId")).text()+": "+t)},t.InvokeMethod("GetLastAction",CCFMiscUtil_CreatePropSet(),r)}}function i(e){var t=this.GetPM(),n=t.Get("tree_data"),r=0,i=this.getGrid(),s=this.getGrid()[0].p.data[e];if(!s.isLeaf){n.forEach(function(e,t,n){var i=n[t].Name;s.Name===i&&(r=t)}),n[r].expanded=!0,i.jqGrid("clearGridData");for(var r=0;r<n.length;r++){i.jqGrid("addChildNode",r+1,null,{Name:n[r].Name,Type:n[r].Type,Value:n[r].Value,expanded:n[r].expanded,isLeaf:n[r].isLeaf,level:"0",loaded:!0,parent:n[r].parent});if(n[r].children.length>0&&n[r].expanded)for(var o=0,u=n[r].children;o<n[r].children.length;o++)i.jqGrid("addChildNode",o+r+2,null,{Name:u[o].Name,Type:u[o].Type,Value:u[o].Value,expanded:u[o].expanded,isLeaf:u[o].isLeaf,level:"1",loaded:!0,parent:u[o].parent})}this.setGrid(i),t.SetProperty("tree_data",n)}}function s(e){var t=this.GetPM(),n=t.Get("tree_data"),r=this.getGrid(),i=this.getGrid()[0].p.data[e];if(!i.isLeaf){n.forEach(function(e,t,n){var r=n[t].Name;i.Name===r&&(s=t)}),n[s].expanded=!1,r.jqGrid("clearGridData");for(var s=0;s<n.length;s++){r.jqGrid("addChildNode",s+1,null,{Name:n[s].Name,Type:n[s].Type,Value:n[s].Value,expanded:n[s].expanded,isLeaf:n[s].isLeaf,level:"0",loaded:!0,parent:n[s].parent});if(n[s].children.length>0&&n[s].expanded)for(var o=0,u=n[s].children;o<n[s].children.length;o++)r.jqGrid("addChildNode",o+s+2,null,{Name:u[o].Name,Type:u[o].Type,Value:u[o].Value,expanded:u[o].expanded,isLeaf:u[o].isLeaf,level:"1",loaded:!0,parent:u[o].parent})}this.setGrid(r),t.SetProperty("tree_data",n)}}function o(e){var t=[],n=e.length;for(var r=0;r<n;r++){var i={name:e[r],width:100,sortable:!1,align:r>0?"center":"left"};t.push(i)}return t}function u(){}var e=SiebelJS.Dependency("SiebelApp.Utils");return SiebelJS.Extend(t,SiebelAppFacade.PhysicalRenderer),t.prototype.ShowUI=function(){SiebelAppFacade.TaskWatchWindowRenderer.superclass.ShowUI.apply(this,arguments);var e=this.GetPM(),t=e.Get("GetControls"),u=$($("#"+e.Get("GetFullId")).find("table")[2]).find("tr")[0],a=e.Get("tree_data"),f='<table id="taskwatchgrid"></table>',l=$.parseHTML(f),c=$("#"+e.Get("GetFullId")).find("td.scField");$("#taskwatchgrid").length>0?$("#taskwatchgrid").jqGrid("GridDestroy"):$(l).insertAfter(u),f=$("#taskwatchgrid"),f.jqGrid({direction:SiebelApp.S_App.GetDirection()||"",datatype:"jsonstring",colNames:e.Get("col_names"),colModel:o.call(this,e.Get("col_model_names")),height:350,width:"auto",recordpos:"right",viewrecords:!0,gridview:!1,treeGrid:!0,treeGridModel:"adjacency",treedatatype:"local",jsonReader:{repeatitems:!1,root:function(e){return e},page:function(e){return 1},total:function(e){return 1},records:function(e){return e.length}}}),f.jqGrid("setGridParam",{OnExpand:i.bind(this),OnCollapse:s.bind(this)}),n.call(this,c.eq(0).removeAttr("style")),r.call(this,c.eq(1).removeAttr("style"));for(var h=0;h<a.length;h++)f.jqGrid("addChildNode",h+1,null,{Test:"Test",Name:a[h].Name,Type:a[h].Type,Value:a[h].Value,expanded:a[h].expanded,isLeaf:a[h].isLeaf,level:"0",loaded:!0,parent:a[h].parent});this.setGrid(f),setTimeout(function(){f.setGridWidth(parseInt($("#gbox_taskwatchgrid").parent().width(),10),!0)},1)},t.prototype.Init=function(){SiebelAppFacade.TaskWatchWindowRenderer.superclass.Init.apply(this,arguments),this.AttachPMBinding("HandleClickEvent",u)},t}(),SiebelAppFacade.TaskWatchWindowRenderer}));
