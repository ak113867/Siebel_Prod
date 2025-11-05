if (typeof(SiebelAppFacade.VHADashboardNBNAssetDetailsListAppletPR) === "undefined") {
  SiebelJS.Namespace("SiebelAppFacade.VHADashboardNBNAssetDetailsListAppletPR");
  define("siebel/custom/VHADashboardNBNAssetDetailsListAppletPR", ["siebel/phyrenderer"], function () {
    SiebelAppFacade.VHADashboardNBNAssetDetailsListAppletPR = (function () {
      function VHADashboardNBNAssetDetailsListAppletPR(pm) {
        SiebelAppFacade.VHADashboardNBNAssetDetailsListAppletPR.superclass.constructor.call(this, pm);
      }
      SiebelJS.Extend(VHADashboardNBNAssetDetailsListAppletPR, SiebelAppFacade.PhysicalRenderer);
	 // SiebelJS.Extend(VHADashboardNBNAssetDetailsListAppletPR, SiebelAppFacade.JQGridRenderer);
     
      VHADashboardNBNAssetDetailsListAppletPR.prototype.ShowUI = function () {
	    SiebelAppFacade.VHADashboardNBNAssetDetailsListAppletPR.superclass.ShowUI.call(this);
		$('.AstDBPPLbl').hide();
		$("#VHAPrepayDiv").hide();
		var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
		if(!ParentIC)
		 { 
			 VHADashboardCommon.VHADasboardGetICProp("AssetHeader");
			 ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
		 }	
		 var AVCdet = ParentIC.GetChildByType("ListOfAVC Asset");
		 var Assetdet = AVCdet.GetChild(0);	
		 
		 var Orderdet = ParentIC.GetChildByType("ListOfOrders");
		 var childcount = Orderdet.GetChildCount();		 
		 for(i=0;i<childcount;i++)
				{
					var Propset = Orderdet.GetChild(i);
					//var propcount = Propset.GetPropertyCount();
					var tempArray = Propset.propArray;					
					var sOrdType = tempArray["Order Sub Type"];
                    if(sOrdType == "Connect")
					{						
					  var nbndet = Propset.GetChildByType("ListOfNBN Details").GetChildByType("NBN Details");
					  $("#VHAAssetRow1Col1Val").html(nbndet.GetProperty("Modem Serial Number"));
					  /*$("#VHAAssetRow3Col2Val").html(nbndet.GetProperty("AVC Id"));
					  $("#VHAAssetRow4Col2Val").html(nbndet.GetProperty("CVC Id"));*/
                      i=childcount;					  
					}
				}
		 if(Assetdet!=null && Assetdet!="")	
		 {
		 $("#VHAAssetRow3Col2Val").html(Assetdet.GetProperty("Serial Number"));
		 $("#VHAAssetRow4Col2Val").html(Assetdet.GetProperty("CVC Id"));	
		 }
		 $("#VHANBNPropVal").html(ParentIC.GetProperty("Product Name")); 		
		 $("#VHAAssetRow2Col1Val").html(ParentIC.GetProperty("Product Instance Id"));
		 $("#VHAAssetRow3Col1Val").html(ParentIC.GetProperty("NBN Location Id"));
		 $("#VHAAssetRow4Col1Val").html(ParentIC.GetProperty("NBN Address"));
		 $("#VHAAssetRow1Col2Val").html(ParentIC.GetProperty("NBN Outage"));
		 $("#VHAAssetRow2Col2Val").html(ParentIC.GetProperty("Access Technology")); 
		 
		}
	VHADashboardNBNAssetDetailsListAppletPR.prototype.BindEvents = function (){
     SiebelAppFacade.VHADashboardNBNAssetDetailsListAppletPR.superclass.BindEvents.call(this);
	  $("#VHAAssetDetailsbuttons").on('click','#VHAAssetDetExpandCollapse', function(){
		 if($(this).hasClass("VHADashBoardAppExp"))
		 {
			 $('#VHAAssetDetailsDiv').siblings().addClass("VHADisplayNone");
			 $(this).addClass("VHADashBoardAppColl").removeClass("VHADashBoardAppExp");
		 }
		 else
		 {
			 $('#VHAAssetDetailsDiv').siblings().removeClass("VHADisplayNone");
			 $(this).addClass("VHADashBoardAppExp").removeClass("VHADashBoardAppColl");
		 }
		
		});
	 $("#VHAAssetDetailsbuttons").on("click", '#VHAGotoAssetDetailsView', {
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
				Inputs.SetProperty("ViewName","VF Asset Summary View - with extra IN fields");
				var Output = ser.InvokeMethod("Run Process", Inputs);
				} );
	}

	return VHADashboardNBNAssetDetailsListAppletPR;
  }
  ());
      return "SiebelAppFacade.VHADashboardNBNAssetDetailsListAppletPR";
    });
  }
   