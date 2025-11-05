if (typeof(SiebelAppFacade.VHAStoreReservationsUpgradeAppletTBUI) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAStoreReservationsUpgradeAppletTBUI");
    define("siebel/custom/VHAStoreReservationsUpgradeAppletTBUI", ["order!siebel/phyrenderer"], function () {
        SiebelAppFacade.VHAStoreReservationsUpgradeAppletTBUI = (function () {
            var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
            function VHAStoreReservationsUpgradeAppletTBUI(pm) {
                SiebelAppFacade.VHAStoreReservationsUpgradeAppletTBUI.superclass.constructor.call(this, pm);
            }
            SiebelJS.Extend(VHAStoreReservationsUpgradeAppletTBUI, SiebelAppFacade.PhysicalRenderer);
            VHAStoreReservationsUpgradeAppletTBUI.prototype.Init = function () {
                SiebelAppFacade.VHAStoreReservationsUpgradeAppletTBUI.superclass.Init.apply(this, arguments);
		var this_t = this;
            };
            VHAStoreReservationsUpgradeAppletTBUI.prototype.ShowUI = function () {
                SiebelAppFacade.VHAStoreReservationsUpgradeAppletTBUI.superclass.ShowUI.call(this);
               // $('[aria-labelledby="PostCode_Label"]').autocomplete({//SBABU
				$('[name='+this.GetPM().Get("GetControls")["PostCode"].GetInputName()+']').autocomplete({
                    source: function (request, response) {
                        try {
                            var Inps = SiebelApp.S_App.NewPropertySet();
                            var Outs = SiebelApp.S_App.NewPropertySet();
                            Inps.SetProperty("Zip Code", request.term);
                            Outs = VHAAppUtilities.CallWorkflow("VF Postcode Validate Process", Inps, "");
                            var chdResult = Outs.childArray[0].childArray[0].childArray;
                            var arr = [];
                            for (i = 0; i < chdResult.length; i++) {
                                var obj = chdResult[i].propArray;
                                var li = obj.Postcode + ',' + obj.Suburb + ',' + obj.City + ',' + obj.State+ ',Australia';
                                arr[i] = {
                                    "id": i,
                                    "value": li,
                                    "Postcode": obj.Postcode,
                                    "State": obj.State,
                                    "Suburb": obj.Suburb,
                                    "Longitude": obj.Longitude,
                                    "Latitude": obj.Latitude,
									"City": obj.City
                                };
                            }
                            response(arr);
                        } catch (e) {
                            console.log("Error : " + e);
                        }
                    },
                    minLength: 4,
                    select: function (event, ui) {
                        //console.log(ui);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade").SetFieldValue("VHA Store Post Code",ui.item.Postcode);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade").SetFieldValue("Store City",ui.item.Suburb);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade").SetFieldValue("Store Code","");
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade").SetFieldValue("Store Country","Australia");
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade").SetFieldValue("Store District",ui.item.City);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade").SetFieldValue("Store Latitude",ui.item.Latitude);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade").SetFieldValue("Store Longitude",ui.item.Longitude);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade").SetFieldValue("Store State",ui.item.State);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade").WriteRecord();
                    }
                });
            };

            VHAStoreReservationsUpgradeAppletTBUI.prototype.BindEvents = function () {
                SiebelAppFacade.VHAStoreReservationsUpgradeAppletTBUI.superclass.BindEvents.call(this);

            }
            VHAStoreReservationsUpgradeAppletTBUI.prototype.EndLife = function () {
                SiebelAppFacade.VHAStoreReservationsUpgradeAppletTBUI.superclass.EndLife.apply(this, arguments);

            }
            return VHAStoreReservationsUpgradeAppletTBUI;
        }
            ());
        return "SiebelAppFacade.VHAStoreReservationsUpgradeAppletTBUI";
    });
}
