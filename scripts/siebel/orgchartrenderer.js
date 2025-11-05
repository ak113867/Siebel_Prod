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
typeof SiebelAppFacade.OrgChartRenderer=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.OrgChartRenderer"),define("siebel/orgchartrenderer",["siebel/networkrenderer"],function(){return SiebelAppFacade.OrgChartRenderer=function(){function i(){SiebelAppFacade.OrgChartRenderer.superclass.constructor.apply(this,arguments)}function s(e,t,n){var r=n.Get("contextMenuObj"),i=this,s,o,u=n.Get("Handle"),a=n.Get("BoxSize"),f=parseInt(a.split(" ")[0])+10,l=a.split(" ")[1];if(n.Get("saveActivated")==1)return;var c=n.Get("AcceptBackgroundColour");SiebelApp.S_App.IsRwd()?o=SiebelApp.S_App.ViewTarget():o="_sweview";if($("#"+o+" #s_"+n.Get("GetFullId")+"_div").find("#"+e.taskid).length>0)return;typeof e.shapeId=="undefined"&&(e.shapeId="");if(typeof e.bgColor!="undefined"){var h=parseInt(e.bgColor,10);h&&(s="rgb("+(h&255)+","+((h&65280)>>8)+","+((h&16711680)>>16)+")")}var p=e.x*1.5,d=e.y*1.5,v="<div  class='siebui-fcd-task ' id='"+e.taskid+"' name='"+e.shapeId+"' title='"+e.tooltip+"' style='left:"+p+"px;top:"+d+"px;position:absolute;z-index:1;'>",m=e.imageText.indexOf("<0 0 255>"),g=e.imageText.length;m!=-1&&(e.imageText=e.imageText.substr(0,m)+e.imageText.substr(m+9,g)),v+="<span class='siebui-fcd-org-span-text'>"+e.imageText+"</div>",$("#"+o+" #s_"+n.Get("GetFullId")+"_div").find(".siebui-fcd-designer").append(v),c||$("#"+o+" #s_"+n.Get("GetFullId")+"_div").find("#"+e.taskid).css("background",s);var y=$("#"+o+" #s_"+n.Get("GetFullId")+"_div").find("#"+e.taskid);y.addClass("siebui-fcd-design").removeClass("siebui-fcd-task").addClass("siebui-fcd-org-task-designer").css({width:f,height:l}),t&&($(y).data("pm",n),n.Get("jsplumbInstance").draggable(jsPlumb.getSelector(".siebui-fcd-designer .siebui-fcd-design"),{}),$(y).draggable({stop:function(e,t){$(t.helper).data("pm").ExecuteMethod("OnNodeDragStop",e,t)}}));var b=n.Get("localPos");b[e.taskid]={},b[e.taskid].left=e.x,b[e.taskid].top=e.y,b[e.taskid].name=e.shapeId,n.SetProperty("localPos",b),n.ExecuteMethod("AddContextmenuToNode",e.taskid,r[e.shapeId]),this.GetPM().Get("jsplumbInstance").getType("LeftMiddle").paintStyle={fill:"#0000ff",stroke:"black"},this.GetPM().Get("jsplumbInstance").getType("RightMiddle").paintStyle={fill:"#0000ff",stroke:"black"},this.GetPM().Get("jsplumbInstance").getType("TopCenter").paintStyle={fill:"white",stroke:"black"},this.GetPM().Get("jsplumbInstance").getType("BottomCenter").paintStyle={fill:"white",stroke:"black"},this.GetPM().Get("jsplumbInstance").getType("Direct").paintStyle={fill:"white",stroke:"black"}}function o(e,t,n){var r=n.Get("ConnectionsList"),i=$("#"+e),s=e,o=[];typeof r[e]!="undefined"&&(o.push({label:"Delete",disabled:!1,id:e,toId:r[e].toId,action:function(){n.ExecuteMethod("OnContextmenuClick",this)}}),i.contextPopup({id:s,title:"Actions",items:o}))}var e={},t=!1,n=!1,r=!1;return SiebelJS.Extend(i,SiebelAppFacade.NetworkRenderer),i.prototype.Init=function(){SiebelAppFacade.OrgChartRenderer.superclass.Init.apply(this,arguments),this.AttachPMBinding("AddContextmenuToNode",function(){var e=this.GetPM(),t=e.Get("taskid"),n=e.Get("menuitemslist");o.call(this,t,n,e)}),this.AttachPMBinding("AddNewNode",function(){var e=this.GetPM(),t=e.Get("nodeObj"),n=e.Get("allowDragging");s.call(this,t,n,e)})},i.prototype.BindEvents=function(){SiebelAppFacade.OrgChartRenderer.superclass.BindEvents.apply(this,arguments)},i.prototype.ShowUI=function(){SiebelAppFacade.OrgChartRenderer.superclass.ShowUI.apply(this,arguments),$(".siebui-funnel-chart").hide(),$("#siebui-fcd-designer").addClass("siebui-org-chart")},i}(),SiebelAppFacade.OrgChartRenderer}));
