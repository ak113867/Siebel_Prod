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
typeof SiebelAppFacade.SalesPipeLineRenderer=="undefined"&&(SiebelJS.Namespace("SiebelAppFacade.SalesPipeLineRenderer"),define("siebel/salespipelinerenderer",["siebel/phyrenderer","siebel/funnelchart"],function(){return SiebelAppFacade.SalesPipeLineRenderer=function(){function l(e){SiebelAppFacade.SalesPipeLineRenderer.superclass.constructor.apply(this,arguments)}function c(){var e=[[]],t=this.GetPM(),n=this.GetPM().Get("GetFullId"),i=$("#"+n+"salespipeline").height(),f=$("#"+n+"salespipeline").width(),l,c,h=[],p=[],d=[],v=f-20,m=i-48;h[0]=v-r-o;var g=m-s-u,y=h[0]*a,b=g/2*(h[0]+y),w=Math.atan((h[0]-y)/2/g),E,S,x,T=0,N=1e-4,C=t.ExecuteMethod("GetChartData","NumOfCategories");d=t.ExecuteMethod("GetChartData","CategoryName");for(var k=0;k<C;k++){l=g/C,E=l*h[k],S=999999,p[k]=E,x=0;while(S>p[k]*N&&x<100)p[k]=l*(h[k]-l*Math.tan(w)),S=Math.abs(p[k]-E),h[k+1]=h[k]-2*l*Math.tan(w),E=p[k],c=p[k]*100/b,x++;e[k]=[],e[k][0]=d[k],e[k][1]=c}return e}var e=SiebelJS.Dependency("SiebelApp.Constants"),t=e.get("CHART_FUNNEL_DEF_METHOD"),n=e.get("CHART_FUNNEL_DATA_METHOD"),r=20,s=20,o=20,u=20,a=.2,f=null;return SiebelJS.Extend(l,SiebelAppFacade.PhysicalRenderer),l.prototype.Init=function(){SiebelAppFacade.SalesPipeLineRenderer.superclass.Init.apply(this,arguments),this.AttachPMBinding("RefreshChart",function(){})},l.prototype.ShowUI=function(){SiebelAppFacade.SalesPipeLineRenderer.superclass.ShowUI.apply(this,arguments);var e=CCFMiscUtil_CreatePropSet();SiebelJS.Log("Invoking FunnelChartDefn"),this.GetPM().ExecuteMethod("NotifyServer",t,e),SiebelJS.Log("Invoking ChartData"),this.GetPM().ExecuteMethod("NotifyServer",n,e);var r=this.GetPM(),s=[],o=[],u=[],a=[],f=[],l=[],h=[],p=[],d=[],v=[];if(r.Get("RefreshChart")){var m=r.ExecuteMethod("GetChartData","FunctionName");s=r.ExecuteMethod("GetChartData","CategoryColours"),o=r.ExecuteMethod("GetChartData","CategoryPercent");for(i=0;i<o.length;i++)o[i]=Math.floor(o[i]);o=(o.join("% ")+"%").split(" "),u=r.ExecuteMethod("GetChartData","CategoryName");var g=r.ExecuteMethod("GetChartData","AppTitle"),y=r.ExecuteMethod("GetChartData","OutOfString");f=r.ExecuteMethod("GetChartData","Revenue"),h=r.ExecuteMethod("GetChartData","Quota"),d=r.ExecuteMethod("GetChartData","LegendColors"),v=r.ExecuteMethod("GetChartData","LegendText");var b=this.GetPM().Get("GetFullId"),w=b+"salespipeline";$("#"+b).find(".siebui-funnel-chart").attr("id",w);var E=c.call(this),S=new SiebelAppFacade.FunnelChart({data:E,label:o,colors:s,catname:u,legendColors:d,legendText:v,width:500,height:500,title:m,bottomPct:.25,appTitle:g,revenue:f,quota:h,OutOfString:y});S.draw("#"+w,2);var x=$("#"+r.Get("GetFullId"));x.find("#Error1_Label").length?x.find("#Error1_Label").addClass("forcehide"):x.find("#Error1_Label_"+r.Get("GetId")).addClass("forcehide")}$(".siebui-funnel-chart").addClass("siebui-rotate-270")},l.prototype.EndLife=function(){var e=this.GetPM().Get("GetFullId"),t=e+"salespipeline";f!==null&&($("#"+t).remove(),$(".siebui-legend").children().remove(),$(".siebui-legend").remove(),f.destroy()),SiebelAppFacade.SalesPipeLineRenderer.superclass.EndLife.call(this)},l}(),SiebelAppFacade.SalesPipeLineRenderer}));
