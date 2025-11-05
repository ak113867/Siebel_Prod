if (typeof(SiebelAppFacade.VF_Intelligence_Search_Billing_Address_PR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VF_Intelligence_Search_Billing_Address_PR");
    define("siebel/custom/VF_Intelligence_Search_Billing_Address_PR", ["siebel/jqgridrenderer"], function() {
        SiebelAppFacade.VF_Intelligence_Search_Billing_Address_PR = (function() {
            function VF_Intelligence_Search_Billing_Address_PR(pm) {
                SiebelAppFacade.VF_Intelligence_Search_Billing_Address_PR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VF_Intelligence_Search_Billing_Address_PR, SiebelAppFacade.JQGridRenderer);
            VF_Intelligence_Search_Billing_Address_PR.prototype.Init = function() {
                SiebelAppFacade.VF_Intelligence_Search_Billing_Address_PR.superclass.Init.apply(this, arguments);
                this.GetPM().AttachPMBinding("FieldChange", function(control, fieldValue) {
                    var sView = SiebelApp.S_App.GetActiveView().GetName();
					var sAIN = SiebelApp.S_App.GetActiveView().GetActiveApplet().GetId(); //this.GetPM().Get("GetId");
                    if (sView == "VF Billing Details View - TBUI" || sView == "VF Connection Wizard View - Billing Detail - TBUI") {
                        if (control.GetName() == "VF Manual Address Flg") {
                            if (fieldValue == "Y") {
                                $('[aria-labelledby="Address_Floor_Type_OPUI_Label_'+sAIN+'"],[aria-labelledby="Active_Label_'+sAIN+'"],[aria-labelledby="Address_Floor_Type_OPUI_Label_'+sAIN+'"],[aria-labelledby="Address_Apt_OPUI_Label_'+sAIN+'"],[aria-labelledby="Address_Building_OPUI_Label_'+sAIN+'"],[aria-labelledby="Street_Address_2_-_ns_OPUI_Label_'+sAIN+'"],[aria-labelledby="Street_Address_OPUI_Label_'+sAIN+'"],[aria-labelledby="Street_Type_OPUI_Label_'+sAIN+'"],[aria-labelledby="City_AU_Label_'+sAIN+'"],[aria-labelledby="State_OPUI_Label_'+sAIN+'"],[aria-labelledby="Postal_Code_AU_Label_'+sAIN+'"],[aria-labelledby="Country_OPUI_Label_'+sAIN+'"],[aria-labelledby="Street_Address_2_-_no_star_Label_'+sAIN+'"],[aria-labelledby="City_-_no_star_AU_Label_'+sAIN+'"],[aria-labelledby="DPID_Label_'+sAIN+'"],[aria-labelledby="Validation_Status_Label_'+sAIN+'"],[aria-labelledby="Address_Format_Label_'+sAIN+'"],[aria-labelledby="Address_Floor_Type_Label_'+sAIN+'"],[aria-labelledby="Street_Address_Label_'+sAIN+'"],[aria-labelledby="Address_Apt_Label_'+sAIN+'"],[aria-labelledby="Street_Type_Label_'+sAIN+'"],[aria-labelledby="Address_Building_Label_'+sAIN+'"],[aria-labelledby="State_Label_'+sAIN+'"],[aria-labelledby="Country_Label_'+sAIN+'"]').closest("td").parent().show("fast");
                                $('[aria-labelledby="WSDL_Address_Label_'+sAIN+'"]').closest("td").parent().show();
                                $('[aria-labelledby="City_AU_Label_'+sAIN+'"]').closest("td").parent().hide()
                            } else {
                                $('[aria-labelledby="Address_Floor_Type_OPUI_Label_'+sAIN+'"],[aria-labelledby="Active_Label_'+sAIN+'"],[aria-labelledby="Address_Floor_Type_OPUI_Label_'+sAIN+'"],[aria-labelledby="Address_Apt_OPUI_Label_'+sAIN+'"],[aria-labelledby="Address_Building_OPUI_Label_'+sAIN+'"],[aria-labelledby="Street_Address_2_-_ns_OPUI_Label_'+sAIN+'"],[aria-labelledby="Street_Address_OPUI_Label_'+sAIN+'"],[aria-labelledby="Street_Type_OPUI_Label_'+sAIN+'"],[aria-labelledby="City_AU_Label_'+sAIN+'"],[aria-labelledby="State_OPUI_Label_'+sAIN+'"],[aria-labelledby="Postal_Code_AU_Label_'+sAIN+'"],[aria-labelledby="Country_OPUI_Label_'+sAIN+'"],[aria-labelledby="Street_Address_2_-_no_star_Label_'+sAIN+'"],[aria-labelledby="City_-_no_star_AU_Label_'+sAIN+'"],[aria-labelledby="DPID_Label_'+sAIN+'"],[aria-labelledby="Validation_Status_Label_'+sAIN+'"],[aria-labelledby="Address_Format_Label_'+sAIN+'"],[aria-labelledby="Address_Floor_Type_Label_'+sAIN+'"],[aria-labelledby="Street_Address_Label_'+sAIN+'"],[aria-labelledby="Address_Apt_Label_'+sAIN+'"],[aria-labelledby="Street_Type_Label_'+sAIN+'"],[aria-labelledby="Address_Building_Label_'+sAIN+'"],[aria-labelledby="State_Label_'+sAIN+'"],[aria-labelledby="Country_Label_'+sAIN+'"]').closest("td").parent().hide("fast");
                                $('[aria-labelledby="WSDL_Address_Label_'+sAIN+'"]').closest("td").parent().show();
                                $('[aria-labelledby="City_AU_Label_'+sAIN+'"]').closest("td").parent().hide()
                            }
                        }
                    }
                })
            };
            VF_Intelligence_Search_Billing_Address_PR.prototype.ShowUI = function() {
                SiebelAppFacade.VF_Intelligence_Search_Billing_Address_PR.superclass.ShowUI.apply(this, arguments);
                var sView = SiebelApp.S_App.GetActiveView().GetName();
                setTimeout(function() {
                    var AppName = SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName();
                    if (AppName == "VHA Com Invoice Profile Toggle Form Applet TBUI Other") {
                        $("#HTML_Label7_Label_"+this.GetPM().Get("GetId")+"").closest("table").attr("style", "margin-left: 25px; !important");
                        return
                    }
                }, 50);
                $('[title="Billing Address List Applet"]').find("td.AppletTitle").find("font:first-child").removeAttr("color");
                $('[title="Billing Address List Applet"]').find("td.AppletTitle").find("font:first-child").attr("size", "4");
                if (sView == "VF Billing Details View - TBUI" || sView == "VF Connection Wizard View - Billing Detail - TBUI") {
                  // Balamurugan - 04May2020 - QAStoPSMA - Commented lines from 42 to 
				  /* $('[aria-labelledby="WSDL_Address_Label"]').autocomplete({
                        source: function(request, response) {
                            var service = SiebelApp.S_App.GetService("QAS WSDL");
                            var inPS = SiebelApp.S_App.NewPropertySet();
                            var sValue = $('[aria-labelledby="WSDL_Address_Label"]').val();
                            inPS.SetProperty("SearchString", sValue);
                            if (service) {
                                var outPS = service.InvokeMethod("DoSearchProxy", inPS);
                                var resultSet = outPS.GetChild(0);
                                var addrCount = resultSet.GetChildCount();
                                var addrArray = [];
                                if (resultSet) {
                                    for (var i = 0; i < addrCount; i++) {
                                        addrArray.push(resultSet.GetChild(i).GetProperty("QAS Wsdl Address") + "~^" + resultSet.GetChild(i).GetProperty("QAS Wsdl Moniker"))
                                    }
                                }
                            }
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            var Output = SiebelApp.S_App.NewPropertySet();
                            var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                            Inputs.SetProperty("Service Name", "SIS OM PMT Service");
                            Inputs.SetProperty("Method Name", "Set Profile Attribute");
                            Inputs.SetProperty("Profile Attribute Name", "QAS Query Executed");
                            Inputs.SetProperty("Profile Attribute Value", "Y");
                            var Output = ser.InvokeMethod("Run Process", Inputs);
                            response($.map(addrArray, function(item, id) {
                                var res = item.split("~^");
                                return {
                                    value: res[0],
                                    id: res[1]
                                }
                            }))
                        },
                        minLength: 10,
                        appendTo: $('[aria-labelledby="WSDL_Address_Label"]').parent(),
                        select: function(event, ui) {
                            var sPickAddr = ui.item.value;
                            var sMonikerval = ui.item.id;
                            var service = SiebelApp.S_App.GetService("QAS WSDL");
                            var inPS = SiebelApp.S_App.NewPropertySet();
                            inPS.SetProperty("PickMoniker", sMonikerval);
                            inPS.SetProperty("PickFullAddr", sPickAddr);
                            if (service) {
                                var outPS = service.InvokeMethod("GetAddressPostpayOUI", inPS);
                                var resultSet = outPS.GetChild(0).GetChild(0);
                                var sPickFullAddr = resultSet.GetProperty("QAS Wsdl Address");
                                var sUnitType = resultSet.GetProperty("Floor Type");
                                var sUnitNumber = resultSet.GetProperty("Floor");
                                var sBuildingName = resultSet.GetProperty("Address Building");
                                var sBuildingNumber = resultSet.GetProperty("Street Number");
                                var sStreetName = resultSet.GetProperty("Street Name");
                                var sStreetType = resultSet.GetProperty("Street Type");
                                var sSuburb = resultSet.GetProperty("Suburb");
                                var sState = resultSet.GetProperty("State");
                                var sPostcode = resultSet.GetProperty("Post Code");
                                var sCountry = resultSet.GetProperty("Country");
                                var sDPID = resultSet.GetProperty("DPID");
                                var WSDLValidationStatus = resultSet.GetProperty("Validation Status");
                                var WSDLAddressType = resultSet.GetProperty("Address Type");
                                var WSDLPOBox = resultSet.GetProperty("PO Box");
                                var WSDLPrivateBag = resultSet.GetProperty("Private Bag");
                                var sservice = SiebelApp.S_App.GetService("QAS WSDL");
                                var inpPS = SiebelApp.S_App.NewPropertySet();
                                var outpPS = SiebelApp.S_App.NewPropertySet();
                                inpPS.SetProperty("sPickFullAddr", sPickFullAddr);
                                inpPS.SetProperty("sUnitType", sUnitType);
                                inpPS.SetProperty("sUnitNumber", sUnitNumber);
                                inpPS.SetProperty("sBuildingName", sBuildingName);
                                inpPS.SetProperty("sBuildingNumber", sBuildingNumber);
                                inpPS.SetProperty("sStreetName", sStreetName);
                                inpPS.SetProperty("sStreetType", sStreetType);
                                inpPS.SetProperty("sSuburb", sSuburb);
                                inpPS.SetProperty("sState", sState);
                                inpPS.SetProperty("sPostcode", sPostcode);
                                inpPS.SetProperty("sCountry", sCountry);
                                inpPS.SetProperty("sDPID", sDPID);
                                inpPS.SetProperty("WSDLValidationStatus", WSDLValidationStatus);
                                inpPS.SetProperty("WSDLAddressType", WSDLAddressType);
                                inpPS.SetProperty("WSDLPOBox", WSDLPOBox);
                                inpPS.SetProperty("WSDLPrivateBag", WSDLPrivateBag);
                                inpPS.SetProperty("ActiveStatus", "Y");
                                outpPS = sservice.InvokeMethod("UpdateBillingAddressOUI", inpPS)
                            }
                        }
                    })*/
					$('[aria-labelledby="WSDL_Address_Label_'+this.GetPM().Get("GetId")+'"]').autocomplete({
					source:function( request, response ) {
					var sResp=VHAAppUtilities.doSearchAddress(request,false);
					if(sResp!=false)
					{
					response(VHAAppUtilities.doSearchAddress(request,false));
					}
					else
					{ // when error/message/fault
					response([]);
					}
					mSetPrflAttr("QAS Query Executed","Y");
					},
				  minLength: 10,
				  select: function( event, ui ) {
					var sResp=VHAAppUtilities.getAddress(ui);
					if(sResp!=false)
					{
					var Inputs = SiebelApp.S_App.NewPropertySet();
					Inputs.SetProperty("ViewName", SiebelApp.S_App.GetActiveView().GetName());
					Inputs.SetProperty("Action", "UpdateBillCUTAddress"); 
					mSetPrflAttr("VFQASIsInbound","Y");
					VHAAppUtilities.updateAddress(sResp,Inputs);
					}
				 	}
				   });
                }
            };
            VF_Intelligence_Search_Billing_Address_PR.prototype.BindData = function(bRefresh) {
                SiebelAppFacade.VF_Intelligence_Search_Billing_Address_PR.superclass.BindData.apply(this, arguments)
            };
            VF_Intelligence_Search_Billing_Address_PR.prototype.BindEvents = function() {
                SiebelAppFacade.VF_Intelligence_Search_Billing_Address_PR.superclass.BindEvents.apply(this, arguments)
            };
            VF_Intelligence_Search_Billing_Address_PR.prototype.EndLife = function() {
                SiebelAppFacade.VF_Intelligence_Search_Billing_Address_PR.superclass.EndLife.apply(this, arguments)
            };
			function mSetPrflAttr(name,val)
			{
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Output = SiebelApp.S_App.NewPropertySet();
			var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			Inputs.SetProperty("Service Name", "SIS OM PMT Service");
			Inputs.SetProperty("Method Name", "Set Profile Attribute");
			Inputs.SetProperty("Profile Attribute Name", name);
			Inputs.SetProperty("Profile Attribute Value", val);
			var Output = ser.InvokeMethod("Run Process", Inputs)	
			}
            return VF_Intelligence_Search_Billing_Address_PR
        }());
        return "SiebelAppFacade.VF_Intelligence_Search_Billing_Address_PR"
    })
};