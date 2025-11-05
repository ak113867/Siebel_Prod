if (typeof(SiebelAppFacade.VHATOTNSAOrderSummaryPR_EMAIL) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHATOTNSAOrderSummaryPR_EMAIL");
    define("siebel/custom/VHATOTNSAOrderSummaryPR_EMAIL", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHATOTNSAOrderSummaryPR_EMAIL = (function() {
            function VHATOTNSAOrderSummaryPR_EMAIL(pm) {
                SiebelAppFacade.VHATOTNSAOrderSummaryPR_EMAIL.superclass.constructor.call(this, pm);
            }
            SiebelJS.Extend(VHATOTNSAOrderSummaryPR_EMAIL, SiebelAppFacade.PhysicalRenderer);
            /*---------- Custom Code Goes Here ------------*/
            VHATOTNSAOrderSummaryPR_EMAIL.prototype.ShowUI = function() {
			SiebelAppFacade.VHATOTNSAOrderSummaryPR_EMAIL.superclass.ShowUI.call(this);
				var pm = this.GetPM();				
				$('#s_'+pm.Get('GetFullId')+'_div').prepend('<div class="VHARNSAStyle" id="NSAOrderStatus"></div>')
				$("#NSAEmailNotification").html("");				
				var sIdType = "NSASendEmail" + SiebelApp.S_App.GetProfileAttr("VHA User Type");
				var SearchString="[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='"+sIdType+"'";
				var sVal = VHAAppUtilities.GetPickListValues("", SearchString);			
				if (sVal != "Y") { 
				$("#NSAEmail").hide();
				}
				
				$("#NSAEmail").click(function(){
					//var sOrderId = "3-CM62RZ5";					
					//Calling BS to fetch input and send email
					var sOrderId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Id");
					$("#NSAEmailNotification").html("");
					var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
					var Inputs = SiebelApp.S_App.NewPropertySet();
					Inputs.SetProperty("Service Name", "VHA Generate Contract Service");
					Inputs.SetProperty("Method Name", "GetNSAEmailInputs");
					Inputs.SetProperty("OrderId", sOrderId);
					var Output = ser.InvokeMethod("Run Process", Inputs);
					var resultset = Output.GetChildByType("ResultSet");
					var sEmailNotify = resultset.GetProperty("EmailNotify");
					if (sEmailNotify != "" && sEmailNotify != null)
					{
						$("#NSAEmailNotification").html("Email is sent to " + sEmailNotify + " successfully");
					}
				});
			}
            return VHATOTNSAOrderSummaryPR_EMAIL;
        }());
        return "SiebelAppFacade.VHATOTNSAOrderSummaryPR_EMAIL";
    });
}