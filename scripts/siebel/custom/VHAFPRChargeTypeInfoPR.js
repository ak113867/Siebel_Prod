if (typeof(SiebelAppFacade.VHAFPRChargeTypeInfoPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.VHAFPRChargeTypeInfoPR");
    define("siebel/custom/VHAFPRChargeTypeInfoPR", ["siebel/phyrenderer"],
        function () {
        SiebelAppFacade.VHAFPRChargeTypeInfoPR = (function () {

            function VHAFPRChargeTypeInfoPR(pm) {
                SiebelAppFacade.VHAFPRChargeTypeInfoPR.superclass.constructor.apply(this, arguments);
            }
            SiebelJS.Extend(VHAFPRChargeTypeInfoPR, SiebelAppFacade.PhysicalRenderer);
            VHAFPRChargeTypeInfoPR.prototype.Init = function () {
                // Init is called each time the object is initialised.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAFPRChargeTypeInfoPR.superclass.Init.apply(this, arguments);
                // Add code here that should happen after default processing
                this.AttachPMBinding("ChargeTypeUpd", CallToolTip);
            }
            function CallToolTip() {
                console.log("CallToolTip");
                var sAppltName = this.GetPM().Get("GetName");
                var sAppltId = "s_" + this.GetPM().Get("GetFullId") + "_div";
                VHAAppUtilities.ShowToolTip(sAppltName, sAppltId);
                SiebelJS.Log("Hello ToolTip");
            }
            VHAFPRChargeTypeInfoPR.prototype.ShowUI = function () {
                // ShowUI is called when the object is initially laid out.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAFPRChargeTypeInfoPR.superclass.ShowUI.apply(this, arguments);
                // Add code here that should happen after default processing

            }
            VHAFPRChargeTypeInfoPR.prototype.ShowSelection = function () {
                // ShowSelection is called when the object is initially laid out.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAFPRChargeTypeInfoPR.superclass.ShowSelection.apply(this, arguments);

                // Add code here that should happen after default processing

            }

            VHAFPRChargeTypeInfoPR.prototype.BindData = function (bRefresh) {
                // BindData is called each time the data set changes.
                // This is where you'll bind that data to user interface elements you might have created in ShowUI
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAFPRChargeTypeInfoPR.superclass.BindData.apply(this, arguments);
                // Add code here that should happen after default processing
            }

            VHAFPRChargeTypeInfoPR.prototype.BindEvents = function () {
                // BindEvents is where we add UI event processing.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAFPRChargeTypeInfoPR.superclass.BindEvents.apply(this, arguments);
                // Add code here that should happen after default processing
            }

            VHAFPRChargeTypeInfoPR.prototype.EndLife = function () {
                // EndLife is where we perform any required cleanup.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAFPRChargeTypeInfoPR.superclass.EndLife.apply(this, arguments);
                // Add code here that should happen after default processing
            }

            return VHAFPRChargeTypeInfoPR;
        }
            ());
        return "SiebelAppFacade.VHAFPRChargeTypeInfoPR";
    })
}
