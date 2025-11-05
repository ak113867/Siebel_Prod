/*Kathambari -  25/06/2019- Created for Home Page Applet Expand collapse change as part of upgradeIP18*/
/*Christy - 03/07/2020 - Made Changes for NextDOM CIR AugRelease*/
if (typeof(SiebelAppFacade.VFGeneralAdjustmentRequestListAppletGeneralPR) === "undefined") {
  SiebelJS.Namespace("SiebelAppFacade.VFGeneralAdjustmentRequestListAppletGeneralPR");
  define("siebel/custom/VFGeneralAdjustmentRequestListAppletGeneralPR", ["order!siebel/jqgridrenderer"], function () {
    SiebelAppFacade.VFGeneralAdjustmentRequestListAppletGeneralPR = (function () {
      function VFGeneralAdjustmentRequestListAppletGeneralPR(pm) {

        SiebelAppFacade.VFGeneralAdjustmentRequestListAppletGeneralPR.superclass.constructor.call(this, pm);
      }
      SiebelJS.Extend(VFGeneralAdjustmentRequestListAppletGeneralPR, SiebelAppFacade.JQGridRenderer);
	
     
      VFGeneralAdjustmentRequestListAppletGeneralPR.prototype.ShowUI = function () {
	    SiebelAppFacade.VFGeneralAdjustmentRequestListAppletGeneralPR.superclass.ShowUI.call(this);
		
		this.GetPM().AttachPostProxyExecuteBinding("mSubmit",function(methodName, inputPS, outputPS){
					//var sResultURL = SiebelApp.S_App.GetProfileAttr("LaunchScannerURL");
					var confirmTxt = SiebelApp.S_App.GetProfileAttr("Confirm Text");
						 if(confirmTxt != "")
						 {
						 SiebelApp.S_App.SetProfileAttr("Confirm Text",""); 
						 alert(confirmTxt);
						 }
						 },
					{
		                scope : this,
						sequence : false
				}
				);
		this.GetPM().AttachPostProxyExecuteBinding("mNextDOM",function(methodName, inputPS, outputPS){
					//var sResultURL = SiebelApp.S_App.GetProfileAttr("LaunchScannerURL");
					var confirmTxt1 = SiebelApp.S_App.GetProfileAttr("Confirm Text1");
						 if(confirmTxt1 != "")
						 {
						 SiebelApp.S_App.SetProfileAttr("Confirm Text1",""); 
						 alert(confirmTxt1);
						 }
						 },
					{
		                scope : this,
						sequence : false
				}
				);
				

		}
		VFGeneralAdjustmentRequestListAppletGeneralPR.prototype.BindEvents = function () 
			{
				 SiebelAppFacade.VFGeneralAdjustmentRequestListAppletGeneralPR.superclass.BindEvents.call(this);
				

			}
		return VFGeneralAdjustmentRequestListAppletGeneralPR;

		}
		());
		return "SiebelAppFacade.VFGeneralAdjustmentRequestListAppletGeneralPR";
	});
}
