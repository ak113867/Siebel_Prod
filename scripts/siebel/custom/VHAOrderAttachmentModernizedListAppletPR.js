if (typeof (SiebelAppFacade.VHAOrderAttachmentModernizedListAppletPR) === "undefined") {
	SiebelJS.Namespace("SiebelAppFacade.VHAOrderAttachmentModernizedListAppletPR");
	define("siebel/custom/VHAOrderAttachmentModernizedListAppletPR", ["siebel/jqgridrenderer"], function () {
		SiebelAppFacade.VHAOrderAttachmentModernizedListAppletPR = (function () {
			function VHAOrderAttachmentModernizedListAppletPR(pm) {
				SiebelAppFacade.VHAOrderAttachmentModernizedListAppletPR.superclass.constructor.apply(this, arguments)
			}
			SiebelJS.Extend(VHAOrderAttachmentModernizedListAppletPR, SiebelAppFacade.JQGridRenderer);
			VHAOrderAttachmentModernizedListAppletPR.prototype.Init = function () {
				SiebelAppFacade.VHAOrderAttachmentModernizedListAppletPR.superclass.Init.apply(this, arguments)
			};
			VHAOrderAttachmentModernizedListAppletPR.prototype.ShowUI = function () {
				SiebelAppFacade.VHAOrderAttachmentModernizedListAppletPR.superclass.ShowUI.apply(this, arguments);
				var pm = this.GetPM();
				var tHTML="<div class='VHASendEmailNote' id='TSOrderStatusMsg'></div><div class='VHASendEmailNote' id='TSNSAEmailNotification'></div><div class='VHAattachimgcontainer'><div class='VHAPrint' id='TSNSADownload'><img src='images/VHADownload.png'></div><div class='VHASend' id='TSNSASendEmail'><img src='images/email-24px.svg'></div></div>";
				$("#"+pm.Get("GetFullId")).before(tHTML);
				$("#"+pm.Get("GetFullId")).addClass("forcehide");
				
				var sIdType = "NSASendEmail" + SiebelApp.S_App.GetProfileAttr("VHA User Type");
				var SearchString="[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='"+sIdType+"'";
				var sVal = VHAAppUtilities.GetPickListValues("", SearchString);			
				if (sVal != "Y") { 
					$("#TSNSASendEmail").hide();
				}
				
				$("#TSNSADownload").click(function(){
					$('[name="OrderFileName"]')[0].click();
				});
				
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				Inputs.SetProperty("Service Name", "VF Postpay Utilities TBUI");
				Inputs.SetProperty("Method Name", "GetPrimaryContactNumber");
				Inputs.SetProperty("Account Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Account Id"));
				var Outputs = ser.InvokeMethod("Run Process", Inputs);
				var ResultSet = Outputs.GetChildByType("ResultSet");
				var sEmailNotify = ResultSet.GetProperty("ContactEmailAddress");
						
				$("#TSNSASendEmail").click(function(){
					$('[name="s_3_1_0_0"]').click();
					$("#TSNSAEmailNotification").html("Email is sent to " + sEmailNotify + " successfully");
				});
				
			};
			return VHAOrderAttachmentModernizedListAppletPR
		}());
		return "SiebelAppFacade.VHAOrderAttachmentModernizedListAppletPR"
	})
};