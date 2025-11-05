if (typeof(SiebelAppFacade.VHADashboardMenuFormPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHADashboardMenuFormPR");
    define("siebel/custom/VHADashboardMenuFormPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHADashboardMenuFormPR = (function() {
            function VHADashboardMenuFormPR(pm) {
                SiebelAppFacade.VHADashboardMenuFormPR.superclass.constructor.call(this, pm);
            }
            SiebelJS.Extend(VHADashboardMenuFormPR, SiebelAppFacade.PhysicalRenderer);
            VHADashboardMenuFormPR.prototype.ShowUI = function() {
                SiebelAppFacade.VHADashboardMenuFormPR.superclass.ShowUI.call(this);
                var pm = this.GetPM();
                var that = this;
                setTimeout(function() {
                    var desiredWidth = 500;
                    var newWidth = $(window).width() < desiredWidth ? $(window).width() : desiredWidth;
					$("#DashBoardTaskButtons").closest("[name=popup]").addClass("VFDisplayHeight");
                    $("#DashBoardTaskButtons").closest("[name=popup]").dialog("option", "width", newWidth).resize();
					var sViewName=SiebelApp.S_App.GetActiveView().GetName();
					switch(sViewName)
					{
						case 'VHA Postpay Asset Dashboard View':
							$('[aria-label="Change NBN Address"],[aria-label="Prepay to Postpay"]').addClass("VFDisplayNone");
							break;
						case 'VHA Prepay Asset Dashboard View':
							$('[aria-label="Suspend"],[aria-label="Change NBN Address"],[aria-label="Throttle & Pass Settings"],[aria-label="Upgrade"],[aria-label="Display EEF"],[aria-label="Post to Pre"],[aria-label="Change Billing Account"],[aria-label="Manage Services"],[aria-label="Manage IMEI & Insurance"],[aria-label="Create APP"]').addClass("VFDisplayNone");
							$(".VHATaskButtonTitle:eq( 2 )").addClass("VFDisplayNone");
							break;
						case 'VHA NBN Asset Dashboard View':
							$('[aria-label="Throttle & Pass Settings"],[aria-label="Upgrade"],[aria-label="Post to Pre"],[aria-label="Prepay to Postpay"],[aria-label="Manage IMEI & Insurance"],[aria-label="SIM Swap"]').addClass("VFDisplayNone");
							break;
						default:
							break;
					}
                }, 0);
                $(".ui-button-icon").on("click", function() {
                    var appletName = SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName();
                    if (appletName == "VHA Dashboard Tasks Invoke Popup Applet") {
                        pm.ExecuteMethod("InvokeMethod", "CloseApplet");
                    }
                });
            }
            return VHADashboardMenuFormPR;
        }());
        return "SiebelAppFacade.VHADashboardMenuFormPR";
    });
}