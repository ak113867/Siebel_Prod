if (typeof(SiebelAppFacade.VHAMSPOLIDiscountCalcListAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAMSPOLIDiscountCalcListAppletPR");
    define("siebel/custom/VHAMSPOLIDiscountCalcListAppletPR", ["siebel/jqgridrenderer"], function () {
        SiebelAppFacade.VHAMSPOLIDiscountCalcListAppletPR = (function () {
            function VHAMSPOLIDiscountCalcListAppletPR(pm) {
                SiebelAppFacade.VHAMSPOLIDiscountCalcListAppletPR.superclass.constructor.apply(this, arguments);
            }
            SiebelJS.Extend(VHAMSPOLIDiscountCalcListAppletPR, SiebelAppFacade.JQGridRenderer);
            var vMSPReleaseOneDotTwoSwitch = "N";
            var bndlSvAppltId,
            reCalcCtrlName,
            ctrlName,
            ordStatus,
            mspAppltId;
            VHAMSPOLIDiscountCalcListAppletPR.prototype.Init = function () {
                SiebelAppFacade.VHAMSPOLIDiscountCalcListAppletPR.superclass.Init.apply(this, arguments);
            }
            VHAMSPOLIDiscountCalcListAppletPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHAMSPOLIDiscountCalcListAppletPR.superclass.ShowUI.apply(this, arguments);
                vMSPReleaseOneDotTwoSwitch = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_RELEASE_SWITCH' AND [List Of Values.Name]='RELEASE_ONE_DOT_TWO' AND [List Of Values.Active]='Y'", "")[0];
                mspAppltId = this.GetPM().Get("GetFullId");
                $("#" + mspAppltId).addClass("VFDisplayNone");
                if (vMSPReleaseOneDotTwoSwitch == "Y") {
                    //if (SiebelApp.S_App.GetActiveView().GetName() == "VHA Multi Service Proposition Order View") {
                    if (SiebelApp.S_App.GetActiveView().GetAppletMap()["VF Order Entry - Order Form Applet Dashboard"]) {
                        ctrlName = SiebelApp.S_App.GetActiveView().GetApplet("VF Order Entry - Order Form Applet Dashboard").GetControls()["Status"].GetInputName();
                        ordStatus = $("input[name='" + ctrlName + "']").val();
                        if (ordStatus != "Pending" && ordStatus != "Processing") {
                            reCalcCtrlName = this.GetPM().Get("GetControls")['ShowMSPOffers'].GetInputName();
                            $("#" + reCalcCtrlName + "_Ctrl").addClass("primary-disabled");
                        }
                    }
                }
            }
            VHAMSPOLIDiscountCalcListAppletPR.prototype.BindData = function (bRefresh) {
                SiebelAppFacade.VHAMSPOLIDiscountCalcListAppletPR.superclass.BindData.apply(this, arguments);
                if (vMSPReleaseOneDotTwoSwitch == "Y") {
                    $("#" + mspAppltId).removeClass("VFDisplayNone");
                    if (SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save List Applet")) {
                        bndlSvAppltId = SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save List Applet").GetFullId();
                        $("#" + bndlSvAppltId).addClass("VFDisplayNone");
                    }
                    if (SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save Eligible Offers Upgrade List Applet")) {
                        bndlSvAppltId = SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save Eligible Offers Upgrade List Applet").GetFullId();
                        $("#" + bndlSvAppltId).addClass("VFDisplayNone");
                    }
                    if (SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save Offers List Applet")) {
                        bndlSvAppltId = SiebelApp.S_App.GetActiveView().GetApplet("VHA Bundle Save Offers List Applet").GetFullId();
                        $("#" + bndlSvAppltId).addClass("VFDisplayNone");
                    }
                    //if (SiebelApp.S_App.GetActiveView().GetName() == "VHA Multi Service Proposition Order View") {
                    if (SiebelApp.S_App.GetActiveView().GetAppletMap()["VF Order Entry - Order Form Applet Dashboard"]) {
                        ctrlName = SiebelApp.S_App.GetActiveView().GetApplet("VF Order Entry - Order Form Applet Dashboard").GetControls()["Status"].GetInputName();
                        ordStatus = $("input[name='" + ctrlName + "']").val();
                        if (ordStatus != "Pending" && ordStatus != "Processing") {
                            reCalcCtrlName = this.GetPM().Get("GetControls")['ShowMSPOffers'].GetInputName();
                            $("#" + reCalcCtrlName + "_Ctrl").addClass("primary-disabled");
                        }
                    }
                }
            }
            VHAMSPOLIDiscountCalcListAppletPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHAMSPOLIDiscountCalcListAppletPR.superclass.BindEvents.apply(this, arguments);
            }
            VHAMSPOLIDiscountCalcListAppletPR.prototype.EndLife = function () {
                SiebelAppFacade.VHAMSPOLIDiscountCalcListAppletPR.superclass.EndLife.apply(this, arguments);
            }
            return VHAMSPOLIDiscountCalcListAppletPR;
        }
            ());
        return "SiebelAppFacade.VHAMSPOLIDiscountCalcListAppletPR";
    })
}