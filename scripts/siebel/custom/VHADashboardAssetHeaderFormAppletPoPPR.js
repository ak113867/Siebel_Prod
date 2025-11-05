if (typeof(SiebelAppFacade.VHADashboardAssetHeaderFormAppletPoPPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHADashboardAssetHeaderFormAppletPoPPR");
    define("siebel/custom/VHADashboardAssetHeaderFormAppletPoPPR", ["siebel/jqgridrenderer"],
        function () {
        SiebelAppFacade.VHADashboardAssetHeaderFormAppletPoPPR = (function () {

            function VHADashboardAssetHeaderFormAppletPoPPR(pm) {
                SiebelAppFacade.VHADashboardAssetHeaderFormAppletPoPPR.superclass.constructor.apply(this, arguments);
            }
            SiebelJS.Extend(VHADashboardAssetHeaderFormAppletPoPPR, SiebelAppFacade.JQGridRenderer);
            VHADashboardAssetHeaderFormAppletPoPPR.prototype.Init = function () {
                SiebelAppFacade.VHADashboardAssetHeaderFormAppletPoPPR.superclass.Init.apply(this, arguments);
                this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
                    sequence: false,
                    scope: this
                });
            }
            VHADashboardAssetHeaderFormAppletPoPPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHADashboardAssetHeaderFormAppletPoPPR.superclass.ShowUI.apply(this, arguments);
               
            }
            VHADashboardAssetHeaderFormAppletPoPPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHADashboardAssetHeaderFormAppletPoPPR.superclass.BindEvents.call(this);
                
            }

            function PostInvokeMethod(MethodName) {
                if (MethodName == "GenerateOTP") {
					 var OTP = SiebelApp.S_App.GetProfileAttr("ShowOTP");
					 if (OTP != "" && OTP != null){
						 $("#VHADashOTPValue").html(SiebelApp.S_App.GetProfileAttr("ShowOTP"));
						 $("#VHADashGenerateOTP").attr("style", "color:grey !important;").removeClass("VHADashBlueFontColor");
						 $("#VHADashAuthenticationOTP").attr("style", "color:grey !important;").removeClass("VHADashBlueFontColor");
					 }
                }

            }            
            return VHADashboardAssetHeaderFormAppletPoPPR;
        }
            ());
        return "SiebelAppFacade.VHADashboardAssetHeaderFormAppletPoPPR";
    })
}

