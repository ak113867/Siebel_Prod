if (typeof(SiebelAppFacade.VFSelectServiceListAppletTBUIPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFSelectServiceListAppletTBUIPR");
    define("siebel/custom/VFSelectServiceListAppletTBUIPR", ["order!siebel/jqgridrenderer"], function() {
        SiebelAppFacade.VFSelectServiceListAppletTBUIPR = (function() {
            var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");

            function VFSelectServiceListAppletTBUIPR(pm) {
                SiebelAppFacade.VFSelectServiceListAppletTBUIPR.superclass.constructor.call(this, pm)
            }
            SiebelJS.Extend(VFSelectServiceListAppletTBUIPR, SiebelAppFacade.JQGridRenderer);
			VFSelectServiceListAppletTBUIPR.prototype.ShowUI = function() {
                SiebelAppFacade.VFSelectServiceListAppletTBUIPR.superclass.ShowUI.call(this);
                var pm = this.GetPM();				
                var sContactId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("Asset Mgmt - Asset - Header").GetFieldValue("Account Primary Contact Id");
				var sBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Postpay Add Identification TBC");
                sBC.SetFieldValue("VHAContRowId", sContactId);
                sBC.WriteRecord();
				var service = SiebelApp.S_App.GetService("SIS OM PMT Service");
				var inPS = SiebelApp.S_App.NewPropertySet();
				var outPS = SiebelApp.S_App.NewPropertySet();
				inPS.SetProperty("Business Object Name","Order Entry (Sales)");
				inPS.SetProperty("Business Component Name","VHA Postpay Add Identification TBC");
				service.InvokeMethod("Refresh Business Component",inPS,outPS);		
				console.log("sContactId",sContactId);
            };
            return VFSelectServiceListAppletTBUIPR
        }());
        return "SiebelAppFacade.VFSelectServiceListAppletTBUIPR"
    })
};