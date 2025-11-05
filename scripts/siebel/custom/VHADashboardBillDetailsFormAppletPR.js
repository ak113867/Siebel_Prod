if( typeof( SiebelAppFacade.VHADashboardBillDetailsFormAppletPR ) === "undefined" )
{
	SiebelJS.Namespace( "SiebelAppFacade.VHADashboardBillDetailsFormAppletPR" );
	define("siebel/custom/VHADashboardBillDetailsFormAppletPR", ["order!siebel/phyrenderer"], function () 
	{
		SiebelAppFacade.VHADashboardBillDetailsFormAppletPR= ( function()
		{
			function VHADashboardBillDetailsFormAppletPR( pm )
			{
				SiebelAppFacade.VHADashboardBillDetailsFormAppletPR.superclass.constructor.call( this, pm );
				SiebelApp.EventManager.cleanListners("VHADashboardBillingDetailsIC");
				SiebelApp.EventManager.addListner("VHADashboardBillingDetailsIC", VHADashboardBillingDetailsIC, this);
			}
			SiebelJS.Extend( VHADashboardBillDetailsFormAppletPR, SiebelAppFacade.PhysicalRenderer );
		
			/*---------- Custom Code Goes Here ------------*/
			VHADashboardBillDetailsFormAppletPR.prototype.ShowUI = function () 
			{
				SiebelAppFacade.VHADashboardBillDetailsFormAppletPR.superclass.ShowUI.call(this);
				VHADashboardBillingDetailsIC();
			}
			function VHADashboardBillingDetailsIC(e)
			{
			 var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
			 if(!ParentIC)
			 { 
                 VHADashboardCommon.VHADasboardGetICProp("AssetHeader");
				 ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
			 }
			 var BillDetId = ParentIC.GetChildByType("ListOfBilling Details");			 
			 var Propset = BillDetId.GetChild(0);			
			 //var tempArray = Propset.propArray;
			 $("#VHA_AD_BAName").html(Propset.GetProperty("Billing Account Number"));
			
			 $("#VHA_AD_BAPayType").html(Propset.GetProperty("Payment Type"));
			
			SiebelApp.S_App.GetActiveView().GetName() == "VHA NBN Asset Dashboard View"?$("#VHA_AD_BAPIN").html(Propset.GetProperty("Billing Account Pin")):$("#VHA_AD_BAPIN").html(Propset.GetProperty("Billing Account PIN"));
			// $("#VHA_AD_BAPayDue").html(ParentIC.GetProperty("VHA Amount Due"));
			switch(Propset.GetProperty("Payment Type"))	{
				case "Direct Debit":
				$("#VHA_AD_BANum").html(Propset.GetProperty("Bank Account Number"));
				$("#VHA_AD_BABank").html(Propset.GetProperty("Bank Name"));
				$('#VHAGenericBillDetails #VHA_AD_BACCName').parent().hide();
				$('#VHAGenericBillDetails #VHA_AD_BACCNum').parent().hide();
				$('#VHAGenericBillDetails #VHA_AD_BACCExpMonth').parent().hide();
				$('#VHAGenericBillDetails #VHA_AD_BACCExpYear').parent().hide();
				break;
				case "Credit Card" :
				$("#VHA_AD_BACCName").html(Propset.GetProperty("Credit Card Name"));
				$("#VHA_AD_BACCNum").html(Propset.GetProperty("Credit Card Number"));
				$("#VHA_AD_BACCExpMonth").html(Propset.GetProperty("Expiration Month"));
				$("#VHA_AD_BACCExpYear").html(Propset.GetProperty("Expiration Year"));
				$('#VHAGenericBillDetails #VHA_AD_BANum').parent().hide();
				$('#VHAGenericBillDetails #VHA_AD_BABank').parent().hide();
				break;
				default:
				$('#VHAGenericBillDetails #VHA_AD_BANum').parent().hide();
				$('#VHAGenericBillDetails #VHA_AD_BABank').parent().hide();
				$('#VHAGenericBillDetails #VHA_AD_BACCName').parent().hide();
				$('#VHAGenericBillDetails #VHA_AD_BACCNum').parent().hide();
				$('#VHAGenericBillDetails #VHA_AD_BACCExpMonth').parent().hide();
				$('#VHAGenericBillDetails #VHA_AD_BACCExpYear').parent().hide();
				
				break;
			}
		    }
		
		
			VHADashboardBillDetailsFormAppletPR.prototype.BindEvents = function () 
			{
				 SiebelAppFacade.VHADashboardBillDetailsFormAppletPR.superclass.BindEvents.call(this);
				var view 		= SiebelApp.S_App.GetActiveView();
				var appletMap 	= view.GetAppletMap();
				var myApplet = appletMap['VHA Generic Dashboard Bill Details Form Applet'];
			
				var pm 		= myApplet.GetPModel();
			
				var CDAppletId 	= pm.Get("GetFullId");
		
				$("#VHABillDetailsDiv").on("click", '#VHABillDetailsExpandCollapse', {
                ctx: this
            },function(t){
				$('#VHABillDetailsCard').hide();
				
					$("#VHABillDetailsExpandCollapse").replaceWith('<img src="images/custom/Group_246.svg" id="VHABillDetExpand">');
				
				} );
				//manikandan modified
				$("#VHABillDetailsDiv").on("click", '#VHABillDetExpand', {
                ctx: this
            },function(t){
				$('#VHABillDetailsCard').show();
					$("#VHABillDetExpand").replaceWith('<img src="images/custom/Group_252.svg" id="VHABillDetailsExpandCollapse">');
				
				} );
				$("#VHABillDetailsbuttons").on("click", '#VHAGotoBillDetailsView', {
                ctx: this
				},function(t){
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Output = SiebelApp.S_App.NewPropertySet();
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				Inputs.SetProperty("Service Name", "VHA MSISDN GotoView BS");
				Inputs.SetProperty("Method Name", "GotoView");
				Inputs.SetProperty("BusObjName","VF Billing Account");
				Inputs.SetProperty("BusCompName","VF Billing Account");
				var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
				var RecordId = ParentIC.GetProperty("Billing Account Id");
				Inputs.SetProperty("RowId",RecordId);
				Inputs.SetProperty("ViewName","VF Billing Account Installed Assets View");
				var Output = ser.InvokeMethod("Run Process", Inputs);
				} );
				
			}
			return VHADashboardBillDetailsFormAppletPR;
		}());
		return "SiebelAppFacade.VHADashboardBillDetailsFormAppletPR";
	});
}
