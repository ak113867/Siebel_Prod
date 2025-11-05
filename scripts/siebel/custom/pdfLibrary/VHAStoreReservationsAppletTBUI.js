if (typeof(SiebelAppFacade.VHAStoreReservationsAppletTBUI) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAStoreReservationsAppletTBUI");
    define("siebel/custom/VHAStoreReservationsAppletTBUI", ["order!siebel/phyrenderer"], function () {
        SiebelAppFacade.VHAStoreReservationsAppletTBUI = (function () {
            var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
            function VHAStoreReservationsAppletTBUI(pm) {
                SiebelAppFacade.VHAStoreReservationsAppletTBUI.superclass.constructor.call(this, pm);
            }
            SiebelJS.Extend(VHAStoreReservationsAppletTBUI, SiebelAppFacade.PhysicalRenderer);
            VHAStoreReservationsAppletTBUI.prototype.Init = function () {
                SiebelAppFacade.VHAStoreReservationsAppletTBUI.superclass.Init.apply(this, arguments);

            };
            VHAStoreReservationsAppletTBUI.prototype.ShowUI = function () {
                SiebelAppFacade.VHAStoreReservationsAppletTBUI.superclass.ShowUI.call(this);
		var this_t = this;
		var sAppltName = this.GetPM().Get("GetName");
		//if(sAppltName != "VHA Store Reservations Applet TBUI"){
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
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details").SetFieldValue("VHA Store Post Code",ui.item.Postcode);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details").SetFieldValue("Store City",ui.item.Suburb);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details").SetFieldValue("Store Code","");
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details").SetFieldValue("Store Country","Australia");
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details").SetFieldValue("Store District",ui.item.City);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details").SetFieldValue("Store Latitude",ui.item.Latitude);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details").SetFieldValue("Store Longitude",ui.item.Longitude);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details").SetFieldValue("Store State",ui.item.State);
						SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details").WriteRecord();
                    }
                });
			   }
           // };

            VHAStoreReservationsAppletTBUI.prototype.BindEvents = function () {
                SiebelAppFacade.VHAStoreReservationsAppletTBUI.superclass.BindEvents.call(this);

            }
            VHAStoreReservationsAppletTBUI.prototype.EndLife = function () {
                SiebelAppFacade.VHAStoreReservationsAppletTBUI.superclass.EndLife.apply(this, arguments);

            }
            return VHAStoreReservationsAppletTBUI;
        }
            ());
        return "SiebelAppFacade.VHAStoreReservationsAppletTBUI";
    });
}
