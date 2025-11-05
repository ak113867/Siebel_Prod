if (typeof(SiebelAppFacade.VF_Intelligence_Search_Native_Billing_Address_PR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VF_Intelligence_Search_Native_Billing_Address_PR");
    define("siebel/custom/VF_Intelligence_Search_Native_Billing_Address_PR", ["siebel/jqgridrenderer"], function() {
        SiebelAppFacade.VF_Intelligence_Search_Native_Billing_Address_PR = (function() {
            var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");

            function VF_Intelligence_Search_Native_Billing_Address_PR(pm) {
                SiebelAppFacade.VF_Intelligence_Search_Native_Billing_Address_PR.superclass.constructor.call(this, pm)
            }
            SiebelJS.Extend(VF_Intelligence_Search_Native_Billing_Address_PR, SiebelAppFacade.JQGridRenderer);
            VF_Intelligence_Search_Native_Billing_Address_PR.prototype.Init = function() {
                SiebelAppFacade.VF_Intelligence_Search_Native_Billing_Address_PR.superclass.Init.apply(this, arguments);
                this.GetPM().AttachPMBinding("FieldChange", function(control, fieldValue) {
                    var sView = SiebelApp.S_App.GetActiveView().GetName();
                    if (sView == "VF Connection View - Billing Detail") {}
                })
            };
            VF_Intelligence_Search_Native_Billing_Address_PR.prototype.ShowUI = function() {
                SiebelAppFacade.VF_Intelligence_Search_Native_Billing_Address_PR.superclass.ShowUI.call(this);
                var sView = SiebelApp.S_App.GetActiveView().GetName();
                var ActView = SiebelApp.S_App.GetActiveView();
                var sView = ActView.GetName();
                var busObj = SiebelApp.S_App.GetActiveBusObj();
                var busComp = busObj.GetBusCompByName("VF CUT Address - Billing");
                var pm = this.GetPM();
				var sAIN = this.GetPM().Get("GetId");
                var Mode = SiebelApp.S_App.GetActiveView().GetApplet(pm.Get("GetName")).GetMode();
                if (Mode == "New") {
                    $("span#Change_Address_Label #Nat_BA").parent().closest("td").hide();
                    $('[aria-labelledby="Start_Date_Label_'+sAIN+'"],[aria-labelledby="Address_Floor_Type_Label_'+sAIN+'"],[aria-labelledby="Attention_to_Label_'+sAIN+'"],[aria-labelledby="Street_Address_2_Label_'+sAIN+'"],[aria-labelledby="Address_Apt_Label_'+sAIN+'"],[aria-labelledby="Address_Building_Label_'+sAIN+'"],[aria-labelledby="Street_Address_Label_'+sAIN+'"],[aria-labelledby="Street_Type_Label_'+sAIN+'"],[aria-labelledby="City_AU_Label_'+sAIN+'"],[aria-labelledby="State_Label_'+sAIN+'"],[aria-labelledby="District_Label_'+sAIN+'"],[aria-labelledby="DPID_Label_'+sAIN+'"],[aria-labelledby="Address_Format_Label_'+sAIN+'"],[aria-labelledby="SSA_Primary_Field_Label_'+sAIN+'"],[aria-labelledby="End_Date_Label_'+sAIN+'"],[aria-labelledby="Street_Type_Label_'+sAIN+'"],[aria-labelledby="Validation_Warning_Label_'+sAIN+'"],[aria-labelledby="State_Label_'+sAIN+'"],[aria-labelledby="Propagate_Address_Label_'+sAIN+'"],[aria-labelledby="Country_Label_'+sAIN+'"],[aria-labelledby="Rural_Delivery_Label_'+sAIN+'"],[aria-labelledby="City_Label_'+sAIN+'"],[aria-labelledby="Postal_Code_Label_'+sAIN+'"],[aria-labelledby="Private_Bag_Name_Label_'+sAIN+'"],[aria-labelledby="Private_Bag_Label_'+sAIN+'"],[aria-labelledby="POBox_Label_'+sAIN+'"],[aria-labelledby="City_-_no_star_Label_'+sAIN+'"],[aria-labelledby="Freefrom_address_line_2_Label_'+sAIN+'"],[aria-labelledby="Postal_Code_AU_Label_'+sAIN+'"]').closest("td").parent().hide("fast");
                    $('[aria-labelledby="Freeform_address_line_1_Label"]').closest("td").parent().show();
                    $('[aria-labelledby="City_AU_Label_'+sAIN+'"]'').closest("td").parent().hide()
                } else {
                    if (Mode == "Edit") {
                        setTimeout(function() {
                            $("#Address_Format_Label_"+sAIN+",#Attention_to_Label_"+sAIN+",#Start_Date_Label_"+sAIN+",#End_Date_Label_"+sAIN+",#Validation_Warning_Label_"+sAIN+",#SSA_Primary_Field_Label_"+sAIN+",#Address_Floor_Type_Label_"+sAIN+",#Address_Apt_Label_"+sAIN+",#Address_Building_Label_"+sAIN+",#DPID_Label_"+sAIN+",#Street_Address_2_Label_"+sAIN+",#Street_Address_Label_"+sAIN+",#Street_Type_Label_"+sAIN+",#City_AU_Label_"+sAIN+",#State_Label_"+sAIN+",#District_Label_"+sAIN+",#Postal_Code_AU_Label_"+sAIN+",#Country_Label_"+sAIN+"").parent().css("text-align", "right")
                        }, 200)
                    }
                }
                if (sView == "VF Connection View - Billing Detail" || sView == "VF SUI Billing Postpay BA Address View" || sView == "VF SUI Network Postpay BA Address View" || sView == "VF SUI Sales Postpay BA Address View") {
                    // Balamurugan - 04May2020 - QAStoPSMA - Commented lines from 41 to 125
				/*$('[aria-labelledby="Freeform_address_line_1_Label"]').autocomplete({
                        source: function(request, response) {
                            var service = SiebelApp.S_App.GetService("QAS WSDL");
                            var inPS = SiebelApp.S_App.NewPropertySet();
                            var sValue = $('[aria-labelledby="Freeform_address_line_1_Label"]').val();
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
                                var Inputs = SiebelApp.S_App.NewPropertySet();
                                var Output = SiebelApp.S_App.NewPropertySet();
                                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                Inputs.SetProperty("Service Name", "SIS OM PMT Service");
                                Inputs.SetProperty("Method Name", "Set Profile Attribute");
                                Inputs.SetProperty("Profile Attribute Name", "QAS Query Executed");
                                Inputs.SetProperty("Profile Attribute Value", "Y");
                                var Output = ser.InvokeMethod("Run Process", Inputs)
                            }
                            response($.map(addrArray, function(item, id) {
                                var res = item.split("~^");
                                return {
                                    value: res[0],
                                    id: res[1]
                                }
                            }))
                        },
                        minLength: 10,
                        appendTo: $('[aria-labelledby="Freeform_address_line_1_Label"]').parent(),
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
                                inpPS.SetProperty("WSDLAddressType", WSDLAddressType);
                                inpPS.SetProperty("WSDLPOBox", WSDLPOBox);
                                inpPS.SetProperty("WSDLPrivateBag", WSDLPrivateBag);
                                inpPS.SetProperty("ActiveStatus", "Y");
                                inpPS.SetProperty("WSDLValidationStatus", WSDLValidationStatus);
                                outpPS = sservice.InvokeMethod("UpdateBillingAddressOUI", inpPS)
                            }
                        }
                    });*/
					$('[aria-labelledby="Freeform_address_line_1_Label_'+sAIN+'"]').autocomplete({
					source:function( request, response ) {
					var sResp=VHAAppUtilities.doSearchAddress(request,false);
					if(sResp!=false)
					{
					response(sResp);
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
                    $('[aria-labelledby="CAPIN_Label_'+sAIN+'"]').trigger("click")
                }
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
            return VF_Intelligence_Search_Native_Billing_Address_PR
        }());
        return "SiebelAppFacade.VF_Intelligence_Search_Native_Billing_Address_PR"
    })
};