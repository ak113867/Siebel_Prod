if (typeof(SiebelAppFacade.VHAMSPOLIDiscountCalcOrdSummListAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAMSPOLIDiscountCalcOrdSummListAppletPR");
    define("siebel/custom/VHAMSPOLIDiscountCalcOrdSummListAppletPR", ["siebel/jqgridrenderer"], function () {
        SiebelAppFacade.VHAMSPOLIDiscountCalcOrdSummListAppletPR = (function () {
            function VHAMSPOLIDiscountCalcOrdSummListAppletPR(pm) {
                SiebelAppFacade.VHAMSPOLIDiscountCalcOrdSummListAppletPR.superclass.constructor.apply(this, arguments);
            }
            SiebelJS.Extend(VHAMSPOLIDiscountCalcOrdSummListAppletPR, SiebelAppFacade.JQGridRenderer);
			var vMSPReleaseOneDotTwoSwitch="N";
			var bndlSvAppltId, mspAppltId;
            VHAMSPOLIDiscountCalcOrdSummListAppletPR.prototype.Init = function () {
                SiebelAppFacade.VHAMSPOLIDiscountCalcOrdSummListAppletPR.superclass.Init.apply(this, arguments);
            }
            VHAMSPOLIDiscountCalcOrdSummListAppletPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHAMSPOLIDiscountCalcOrdSummListAppletPR.superclass.ShowUI.apply(this, arguments);
				vMSPReleaseOneDotTwoSwitch = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_RELEASE_SWITCH' AND [List Of Values.Name]='RELEASE_ONE_DOT_TWO' AND [List Of Values.Active]='Y'", "")[0];
				mspAppltId = this.GetPM().Get("GetFullId");
				$("#"+mspAppltId).addClass("VFDisplayNone");
            }
            VHAMSPOLIDiscountCalcOrdSummListAppletPR.prototype.BindData = function (bRefresh) {
                SiebelAppFacade.VHAMSPOLIDiscountCalcOrdSummListAppletPR.superclass.BindData.apply(this, arguments);
				if(vMSPReleaseOneDotTwoSwitch == "Y"){
					$("#"+mspAppltId).removeClass("VFDisplayNone");
					if(SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save Offers List Applet")){
						bndlSvAppltId = SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save Offers List Applet").GetFullId();
						$("#"+bndlSvAppltId).addClass("VFDisplayNone");
					}
					if(SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save Eligible Offers Upgrade List Applet")){
						bndlSvAppltId = SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save Eligible Offers Upgrade List Applet").GetFullId();
						$("#"+bndlSvAppltId).addClass("VFDisplayNone");
					}
					if(SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save List Applet")){
						bndlSvAppltId = SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save List Applet").GetFullId();
						$("#"+bndlSvAppltId).addClass("VFDisplayNone");
					}
				}
            }
            VHAMSPOLIDiscountCalcOrdSummListAppletPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHAMSPOLIDiscountCalcOrdSummListAppletPR.superclass.BindEvents.apply(this, arguments);
            }
            VHAMSPOLIDiscountCalcOrdSummListAppletPR.prototype.EndLife = function () {
                SiebelAppFacade.VHAMSPOLIDiscountCalcOrdSummListAppletPR.superclass.EndLife.apply(this, arguments);
            }
            return VHAMSPOLIDiscountCalcOrdSummListAppletPR;
        }
            ());
        return "SiebelAppFacade.VHAMSPOLIDiscountCalcOrdSummListAppletPR";
    })
}
