if (typeof(SiebelAppFacade.VHADashboardOrdersAppletPR) === "undefined") {
	
	SiebelJS.Namespace("SiebelAppFacade.VHADashboardOrdersAppletPR");
	define("siebel/custom/VHADashboardOrdersAppletPR", ["order!siebel/jqgridrenderer"], function () {
		SiebelAppFacade.VHADashboardOrdersAppletPR = (function () {
			function VHADashboardOrdersAppletPR(pm) {
				
				SiebelAppFacade.VHADashboardOrdersAppletPR.superclass.constructor.call(this, pm);
				/*Declare the PM binding here */
				SiebelApp.EventManager.cleanListners("VHADashboardOrderIC");
				SiebelApp.EventManager.addListner("VHADashboardOrderIC", VHADashboardOrderIc, this);
			}
			SiebelJS.Extend(VHADashboardOrdersAppletPR, SiebelAppFacade.JQGridRenderer);
			/*---------- Custom Code Goes Here ------------*/
			VHADashboardOrdersAppletPR.prototype.ShowUI = function () {
				SiebelAppFacade.VHADashboardOrdersAppletPR.superclass.ShowUI.call(this);

				var pm = this.GetPM();
				//var OrdersIC = VHADashboardPostpayCommon.VHADasboardGetICProp("OrdersIC");
			VHADashboardOrderIc();	
			/*var grid = $("#VHAOrdersTable");
            var gview = grid.parents("div.ui-jqgrid-view");
            gview.children("div.ui-jqgrid-hdiv").hide();*/
			}
			
			function VHADashboardOrderIc(e)
			{
			 var Pending=0;
             var OnHold=0;
             var AwaitingShipment=0;
			 var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
			 if(!ParentIC)
			 { 
                 VHADashboardCommon.VHADasboardGetICProp("AssetHeader");
				 ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
			 }
			 var OrdersIC = ParentIC.GetChildByType("ListOfOrders");
			 var childcount = OrdersIC.GetChildCount();
				var ArrayDAta = new Array();
				/*for(i=0;i<childcount;i++)
				{
					var Propset = OrdersIC.GetChild(i);
					//var propcount = Propset.GetPropertyCount();
					var tempArray = Propset.propArray
					ArrayDAta.push(tempArray);
					
				}*/
				for(i=0;i<childcount;i++)
				{
					var Propset = OrdersIC.GetChild(i);
					//var propcount = Propset.GetPropertyCount();
					var tempArray = Propset.propArray;
					var tempArray1 = new Array();
					tempArray1["Order"] = tempArray["Order Number"];
					tempArray1["OrderType"] = tempArray["Order Sub Type"];
					tempArray1["OrderDate"] = tempArray["Order Date"];
					tempArray1["Status"] = tempArray["Order Status"];
					var SearchString="";
					SearchString="[List Of Values.Type]='FS_ORDER_STATUS' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='Pending'";
					var sPendingValLov=VHAAppUtilities.GetPickListValues("", SearchString);
					SearchString="[List Of Values.Type]='FS_ORDER_STATUS' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='On Hold'";
					var sOnHldValLov=VHAAppUtilities.GetPickListValues("", SearchString);
					SearchString="[List Of Values.Type]='FS_ORDER_STATUS' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='Awaiting Shipping'";
					var sAwtShpValLov=VHAAppUtilities.GetPickListValues("", SearchString);
					if(tempArray1["Status"]==sPendingValLov)
						Pending++;
                    else if(tempArray1["Status"]==sOnHldValLov)
                        OnHold++;
                    else if(tempArray1["Status"]==sAwtShpValLov)
                        AwaitingShipment++;
					ArrayDAta.push(tempArray1);
					
				}
				$("#Pending_Ord_Val").text(Pending);
                $("#OnHold_Ord_Val").text(OnHold);
                $("#Awaiting_Ord_Val").text(AwaitingShipment);
			$("#VHAOrdersTable").jqGrid({
			datatype: "local",
			height: "100%",
			autowidth:true,
			shrinktofit:true,			
            autoencode: true,
            ignoreCase: true,
            toolbar: [true, "top"],
            gridview: true,
			rowNum: 5,
            pager: "#OrderPager",
            loadonce: true,  
			viewrecords: true,
			data:ArrayDAta,
			colNames:['Order','Order Type', 'Status', 'Order Date'],
			colModel:[
				{name:'Order',index:'Order', width:25,search: true},
				{name:'OrderType',label:'Order Type',index:'OrderType', width:25,search: true},
				{name:'Status',index:'Status', width:25,search: true},
				{name:'OrderDate',label:'Order Date',index:'OrderDate',sorttype:'date', width:25,formatter: 'date', formatoptions: { srcformat: 'm-d-Y H:i:s', newformat: 'd M Y'},search: true},
						
			],
			});
			$("#VHAOrdersTable").jqGrid('sortGrid','OrderDate', true, 'desc');
			
			//var mydata = ArrayDAta;
					/*var mydata = [
			[Order:"3-87456454754",OrderType:"Connect",Status:"Complete",OrderDate:"03/09/2019"],
			[Order:"3-87456454754",OrderType:"Connect",Status:"Complete",OrderDate:"03/09/2019"]
			];*/
			//$("#VHAOrdersTable").jqGrid('setGridParam', {data: ArrayDAta});
			//setTimeout(function(){ $("#VHAOrdersTable").trigger('reloadGrid'); }, 500);
			//$("#VHAOrdersTable").jqGrid('setGridParam',{data:ArrayDAta,datatype:'local'}).trigger('reloadGrid');

			
			}

			

			VHADashboardOrdersAppletPR.prototype.BindEvents = function () {
				SiebelAppFacade.VHADashboardOrdersAppletPR.superclass.BindEvents.call(this);
                $("#OrdersSearch").on("keyup", function() {
				grid = $("#VHAOrdersTable");
                var searchFiler = $("#OrdersSearch").val(), f;
                if (searchFiler.length === 0) {
                    grid[0].p.search = false;
                    $.extend(grid[0].p.postData,{filters:""});
                }
                f = {groupOp:"OR",rules:[]};
                f.rules.push({field:"Order",op:"cn",data:searchFiler});
                f.rules.push({field:"OrderType",op:"cn",data:searchFiler});
				f.rules.push({field:"Status",op:"cn",data:searchFiler});
				f.rules.push({field:"OrderDate",op:"cn",data:searchFiler});
                grid[0].p.search = true;
                $.extend(grid[0].p.postData,{filters:JSON.stringify(f)});
                grid.trigger("reloadGrid",[{page:1,current:true}]);
                });
				$("#VHAOrdersReqbuttons").on("click", '#VHAOrdersExpandCollapse', {
                ctx: this
				},function(t){
				var sAW=$(this).closest('.siebel-MediumCards').find('.siebui-applet').width();
				$('#VHAOrdersTable').jqGrid('setGridWidth', sAW-10, true);
				//console.log(parseInt(sAW));
				var sGridWdth=$(this).closest('.siebel-MediumCards').find('.siebui-applet').find('.ui-jqgrid').width();
				$('#VHAOrdersReqbuttons').parent().siblings().toggle();
				$("#VHAOrdersExpandCollapse").toggleClass('VHADashBoardAppExp').toggleClass('VHADashBoardAppColl');
				if($("#VHAOrdersExpandCollapse").hasClass("VHADashBoardAppColl"))
				{
					(!($(".siebel-MediumCards").addClass("MedCardsAdjHeight")))?$(".siebel-MediumCards").addClass("MedCardsAdjHeight"):'';
				}
				if($("#VHAOrdersExpandCollapse").hasClass("VHADashBoardAppExp"))
				{
					if($("#VHANBAOffersExpandCollapse").hasClass("VHADashBoardAppExp")&&$("#VHAOrdersExpandCollapse").hasClass("VHADashBoardAppExp") &&$("#VHAOtherServExpandCollapse").hasClass("VHADashBoardAppExp") && $("#VHASRExpandCollapse").hasClass("VHADashBoardAppExp"))
						  ($(".siebel-MediumCards").addClass("MedCardsAdjHeight"))?$(".siebel-MediumCards").removeClass("MedCardsAdjHeight"):'';
				}
				    var t_this=$(this);
					setTimeout(function(){
					//var sNewAppW=t_this.closest('.siebel-MediumCards').find('.siebui-applet').width();
					//var sWid=t_this.closest('.siebel-MediumCards').find('.siebui-applet').find('.ui-jqgrid').width();
					//console.log(parseInt(sNewAppW)+"|"+parseInt(sGridWdth));
					//if((parseInt(sNewAppW)>parseInt(sGridWdth)) && t_this.hasClass('VHADashBoardAppExp'))
					//{
					t_this.closest('.siebel-MediumCards').find('.siebui-applet').width(sGridWdth+10).addClass("HardCodedWidth");
					t_this.closest('.siebel-MediumCards').next('.siebel-MediumCards').find('.siebui-applet').width(sGridWdth+10).addClass("HardCodedWidth");
					t_this.closest('.siebel-MediumCards').width(sGridWdth+20).addClass("HardCodedWidth");
					t_this.closest('.siebel-LineCards').width(sGridWdth+30).addClass("HardCodedWidth");
					var sNewWd=t_this.closest('.siebel-LineCards').width()*2;
					t_this.closest('.flex_row_container').width(sNewWd+8).addClass("HardCodedWidth");
					$('.siebel-InnerContainer.Left>.siebel-LineCards').width(sNewWd+8).addClass("HardCodedWidth");
					t_this.closest('.siebel-InnerContainer.Left').css('max-width',sNewWd+8).addClass("HardCodedWidth");	
					//}	
var gridName="VHAOrdersTable";
					
							var objHeader = $("table[aria-labelledby='gbox_" + gridName+ "'] tr[role=rowheader] th");

			for (var i = 0; i < objHeader.length; i++) {
  				 var col = $("table[id='" + gridName+ "'] td[aria-describedby='" + objHeader[i].id + "']");
  	 				var width= col.outerWidth()-1;
  				 $(objHeader[i]).css("width", width);
				}
					$('#gview_VHAOrdersTable').addClass('HdrWdthAdded');
														
					},100);
				}
				);
				$("#VHAOrdersReqbuttons").on("click", '#VHAGotoActView', {
                ctx: this
				},function(t){
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Output = SiebelApp.S_App.NewPropertySet();
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				Inputs.SetProperty("Service Name", "VHA MSISDN GotoView BS");
				Inputs.SetProperty("Method Name", "GotoView");
				Inputs.SetProperty("BusObjName","VF Asset");
				Inputs.SetProperty("BusCompName","Asset Mgmt - Asset - Header");
				var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
				var RecordId = ParentIC.GetProperty("Installed Asset Id");
				Inputs.SetProperty("RowId",RecordId );
				Inputs.SetProperty("ViewName","VF Installed Asset Order History View");
				var Output = ser.InvokeMethod("Run Process", Inputs);
				} );
				
			}

			return VHADashboardOrdersAppletPR;
		}
			());
		return "SiebelAppFacade.VHADashboardOrdersAppletPR";
	});
}
