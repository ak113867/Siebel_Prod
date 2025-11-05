if (typeof(SiebelAppFacade.VHAStoreReservationsUpgradeTBUI) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAStoreReservationsUpgradeTBUI");
    define("siebel/custom/VHAStoreReservationsUpgradeTBUI", ["order!siebel/phyrenderer"], function () {
        SiebelAppFacade.VHAStoreReservationsUpgradeTBUI = (function () {
            var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
            function VHAStoreReservationsUpgradeTBUI(pm) {
                SiebelAppFacade.VHAStoreReservationsUpgradeTBUI.superclass.constructor.call(this, pm);
            }
            SiebelJS.Extend(VHAStoreReservationsUpgradeTBUI, SiebelAppFacade.PhysicalRenderer);
            VHAStoreReservationsUpgradeTBUI.prototype.Init = function () {
                SiebelAppFacade.VHAStoreReservationsUpgradeTBUI.superclass.Init.apply(this, arguments);
		var this_t = this;
					this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
						sequence: false,
						scope: this
					});

            };
			function PostInvokeMethod(MethodName) {
					if (MethodName == "AddStoreReservation") {
						$("button[aria-label='Reserve']").closest("tr").show();
						//$("input[aria-labelledby='Reservation_Id_Label']").closest("tr").show();//SBABU
						$('[name='+this.GetPM().Get("GetControls")["Reservation Id"].GetInputName()+']').closest("tr").show();
						//$("input[aria-labelledby='PostCode_Label']").closest("tr").show();//SBABU	
						$('[name='+this.GetPM().Get("GetControls")["PostCode"].GetInputName()+']').closest("tr").show();
						$("button[aria-label='Add Store Reservation']").closest("td").hide();
					}
					if (MethodName == "UnReserveStock" || MethodName == "DeleteRecord") {
						$("button[aria-label='Reserve']").closest("tr").hide();
						//$("input[aria-labelledby='Reservation_Id_Label']").closest("tr").hide();//SBABU
						$('[name='+this.GetPM().Get("GetControls")["Reservation Id"].GetInputName()+']').closest("tr").show();
						//$("input[aria-labelledby='PostCode_Label']").closest("tr").hide();	//SBABU
						$('[name='+this.GetPM().Get("GetControls")["PostCode"].GetInputName()+']').closest("tr").show();
						$("button[aria-label='Add Store Reservation']").closest("td").show();
					}
					if (MethodName == "QueryReservation") {
							//if($('[aria-labelledby="SKU_Code_Label"]').value ==undefined){//SBABU
						if($('[name='+this.GetPM().Get("GetControls")["SKU Code"].GetInputName()+']').value ==undefined){	
							$("button[aria-label='Reserve']").closest("tr").show();
							//$("input[aria-labelledby='Reservation_Id_Label']").closest("tr").show();//SBABU
							$('[name='+this.GetPM().Get("GetControls")["Reservation Id"].GetInputName()+']').closest("tr").show();
							//$("input[aria-labelledby='PostCode_Label']").closest("tr").show();	//SBABU
							$('[name='+this.GetPM().Get("GetControls")["PostCode"].GetInputName()+']').closest("tr").show();
							$("button[aria-label='Add Store Reservation']").closest("td").hide();
						}
					}
				}
            VHAStoreReservationsUpgradeTBUI.prototype.ShowUI = function () {
                SiebelAppFacade.VHAStoreReservationsUpgradeTBUI.superclass.ShowUI.call(this);
				//if($('[aria-labelledby="SKU_Code_Label"]').value ==undefined)//SBABU
				if($('[name='+this.GetPM().Get("GetControls")["SKU Code"].GetInputName()+']').value ==undefined){//SBABU
				{
					$("button[aria-label='Reserve']").closest("tr").hide();
					//$("input[aria-labelledby='Reservation_Id_Label']").closest("tr").hide();//SBABU
					$('[name='+this.GetPM().Get("GetControls")["Reservation Id"].GetInputName()+']').closest("tr").show();
					//$("input[aria-labelledby='PostCode_Label']").closest("tr").hide();//SBABU	
					$('[name='+this.GetPM().Get("GetControls")["PostCode"].GetInputName()+']').closest("tr").show();
					$("button[aria-label='Add Store Reservation']").closest("td").show();
				}
				else
				{
					$("button[aria-label='Reserve']").closest("tr").show();
					//$("input[aria-labelledby='Reservation_Id_Label']").closest("tr").show();//SBABU
					$('[name='+this.GetPM().Get("GetControls")["Reservation Id"].GetInputName()+']').closest("tr").show();
					//$("input[aria-labelledby='PostCode_Label']").closest("tr").show();//SBABU	
					$('[name='+this.GetPM().Get("GetControls")["PostCode"].GetInputName()+']').closest("tr").show();
					$("button[aria-label='Add Store Reservation']").closest("td").hide();
				}
                //$('[aria-labelledby="PostCode_Label"]').autocomplete({//SBABU
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

            VHAStoreReservationsUpgradeTBUI.prototype.BindEvents = function () {
                SiebelAppFacade.VHAStoreReservationsUpgradeTBUI.superclass.BindEvents.call(this);

            }
            VHAStoreReservationsUpgradeTBUI.prototype.EndLife = function () {
                SiebelAppFacade.VHAStoreReservationsUpgradeTBUI.superclass.EndLife.apply(this, arguments);

            }
            return VHAStoreReservationsUpgradeTBUI;
        }
            ());
        return "SiebelAppFacade.VHAStoreReservationsUpgradeTBUI";
    });
}
