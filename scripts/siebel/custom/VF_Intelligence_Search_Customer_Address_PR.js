if (typeof(SiebelAppFacade.VF_Intelligence_Search_Customer_Address_PR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VF_Intelligence_Search_Customer_Address_PR");
    define("siebel/custom/VF_Intelligence_Search_Customer_Address_PR", ["siebel/jqgridrenderer"], function() {
        SiebelAppFacade.VF_Intelligence_Search_Customer_Address_PR = (function() {
            var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");

            function VF_Intelligence_Search_Customer_Address_PR(pm) {
                SiebelAppFacade.VF_Intelligence_Search_Customer_Address_PR.superclass.constructor.call(this, pm)
            }
            SiebelJS.Extend(VF_Intelligence_Search_Customer_Address_PR, SiebelAppFacade.JQGridRenderer);
            VF_Intelligence_Search_Customer_Address_PR.prototype.Init = function() {
                SiebelAppFacade.VF_Intelligence_Search_Customer_Address_PR.superclass.Init.apply(this, arguments);
                this.GetPM().AttachPMBinding("FieldChange", function(control, fieldValue) {
                    var sView = SiebelApp.S_App.GetActiveView().GetName();
					var sAIN = SiebelApp.S_App.GetActiveView().GetActiveApplet().GetId();//this.GetPM().Get("GetId");
                    if (sView == "VF Connection View - Customer Detail" || sView == "Account Detail - Business Address View" || sView == "VF Billing Account Detail - Address View" || sView == "VF SUI Billing Postpay CA Address View" || sView == "VF SUI Billing Prepay CA Address View" || sView == "VF SUI Network Postpay CA Address View" || sView == "VF SUI Network Prepay CA Address View" || sView == "VF SUI Sales Postpay CA Address View" || sView == "VF SUI Sales Prepay CA Address View") {
                        if (control.GetName() == "VF Manual Address Flg") {
                            if (fieldValue == "Y") {
                                $('[aria-labelledby="Freeform_address_line_1_Label_'+sAIN+'"]').val("");
                                var bo = SiebelApp.S_App.GetActiveBusObj();
                                var bc = bo.GetBusCompByName("CUT Address");
                                bc.SetFieldValue("Freeform address line 1", "");
                                $('[aria-labelledby="Start_Date_Label_'+sAIN+'"],[aria-labelledby="Address_Floor_Type_Label_'+sAIN+'"],[aria-labelledby="Attention_to_Label_'+sAIN+'"],[aria-labelledby="Street_Address_2_Label_'+sAIN+'"],[aria-labelledby="Address_Apt_Label_'+sAIN+'"],[aria-labelledby="Address_Building_Label_'+sAIN+'"],[aria-labelledby="Street_Address_Label_'+sAIN+'"],[aria-labelledby="Street_Type_Label_'+sAIN+'"],[aria-labelledby="City_AU_Label_'+sAIN+'"],[aria-labelledby="State_Label_'+sAIN+'"],[aria-labelledby="QAS_Postal_Code_AU_Label_'+sAIN+'"],[aria-labelledby="Country_Label_'+sAIN+'"],[aria-labelledby="District_Label_'+sAIN+'"],[aria-labelledby="DPID_Label_'+sAIN+'"],[aria-labelledby="Address_Format_Label_'+sAIN+'"],[aria-labelledby="SSA_Primary_Field_Label_'+sAIN+'"],[aria-labelledby="End_Date_Label_'+sAIN+'"],[aria-labelledby="Street_Type_Label_'+sAIN+'"],[aria-labelledby="Validation_Warning_Label_'+sAIN+'"],[aria-labelledby="State_Label_'+sAIN+'"],[aria-labelledby="Propagate_Address_Label_'+sAIN+'"],[aria-labelledby="Country_Label_'+sAIN+'"],[aria-labelledby="Rural_Delivery_Label_'+sAIN+'"],[aria-labelledby="Freefrom_address_line_2_Label_'+sAIN+'"],[aria-labelledby="City_Label_'+sAIN+'"],[aria-labelledby="Postal_Code_Label_'+sAIN+'"],[aria-labelledby="Private_Bag_Name_Label_'+sAIN+'"],[aria-labelledby="Private_Bag_Label_'+sAIN+'"],[aria-labelledby="POBox_Label_'+sAIN+'"],[aria-labelledby="LICA_Label_'+sAIN+'"],[aria-labelledby="Freeform_address_line_Label_'+sAIN+'"]').closest("td").parent().show("fast");
                                $('[aria-labelledby="Freeform_address_line_1_Label_'+sAIN+'"],[aria-labelledby="Propagate_AddressChckBox_Label_'+sAIN+'"]').closest("td").parent().hide();
                                $('[aria-labelledby="City AU_'+sAIN+'"]').closest("td").parent().hide()
                            } else {
                                $('[aria-labelledby="Start_Date_Label_'+sAIN+'"],[aria-labelledby="Address_Floor_Type_Label_'+sAIN+'"],[aria-labelledby="Attention_to_Label_'+sAIN+'"],[aria-labelledby="Street_Address_2_Label_'+sAIN+'"],[aria-labelledby="Address_Apt_Label_'+sAIN+'"],[aria-labelledby="Address_Building_Label_'+sAIN+'"],[aria-labelledby="Street_Address_Label_'+sAIN+'"],[aria-labelledby="Street_Type_Label_'+sAIN+'"],[aria-labelledby="City_AU_Label_'+sAIN+'"],[aria-labelledby="State_Label_'+sAIN+'"],[aria-labelledby="QAS_Postal_Code_AU_Label_'+sAIN+'"],[aria-labelledby="Country_Label_'+sAIN+'"],[aria-labelledby="District_Label_'+sAIN+'"],[aria-labelledby="DPID_Label_'+sAIN+'"],[aria-labelledby="Address_Format_Label_'+sAIN+'"],[aria-labelledby="SSA_Primary_Field_Label_'+sAIN+'"],[aria-labelledby="End_Date_Label_'+sAIN+'"],[aria-labelledby="Street_Type_Label_'+sAIN+'"],[aria-labelledby="Validation_Warning_Label_'+sAIN+'"],[aria-labelledby="State_Label_'+sAIN+'"],[aria-labelledby="Propagate_Address_Label_'+sAIN+'"],[aria-labelledby="Country_Label_'+sAIN+'"],[aria-labelledby="Rural_Delivery_Label_'+sAIN+'"],[aria-labelledby="Freefrom_address_line_2_Label_'+sAIN+'"],[aria-labelledby="City_Label_'+sAIN+'"],[aria-labelledby="Postal_Code_Label_'+sAIN+'"],[aria-labelledby="Private_Bag_Name_Label_'+sAIN+'"],[aria-labelledby="Private_Bag_Label_'+sAIN+'"],[aria-labelledby="POBox_Label_'+sAIN+'"],[aria-labelledby="LICA_Label_'+sAIN+'"],[aria-labelledby="Freeform_address_line_Label_'+sAIN+'"]').closest("td").parent().hide("fast");
                                $('[aria-labelledby="Freeform_address_line_1_Label_'+sAIN+'"],[aria-labelledby="Propagate_AddressChckBox_Label_'+sAIN+'"]').closest("td").parent().show();
                                $('[aria-labelledby="City AU_'+sAIN+'"]').closest("td").parent().hide()
                            }
                        }
                    }
                })
            };
            VF_Intelligence_Search_Customer_Address_PR.prototype.ShowUI = function() {
                SiebelAppFacade.VF_Intelligence_Search_Customer_Address_PR.superclass.ShowUI.call(this);
				var pm = this.GetPM();
                var sView = SiebelApp.S_App.GetActiveView().GetName();
                var ActView = SiebelApp.S_App.GetActiveView();
                var sView = ActView.GetName();
                var busObj = SiebelApp.S_App.GetActiveBusObj();
                var busComp = busObj.GetBusCompByName("CUT Address");
                var fieldValue = busComp.GetFieldValue("VF Manual Address Flg");
                var pm = this.GetPM();
				
                var Mode = SiebelApp.S_App.GetActiveView().GetApplet(pm.Get("GetName")).GetMode();
				var sId = pm.Get("GetId");
				SiebelJS.Log(sId);
                if (Mode == "New") {
                    if (fieldValue == "Y") {
                        $('[aria-labelledby="Start_Date_Label_'+sId+'"],[aria-labelledby="Address_Floor_Type_Label_'+sId+'"],[aria-labelledby="Attention_to_Label_'+sId+'"],[aria-labelledby="Street_Address_2_Label_'+sId+'"],[aria-labelledby="Address_Apt_Label_'+sId+'"],[aria-labelledby="Address_Building_Label_'+sId+'"],[aria-labelledby="Street_Address_Label_'+sId+'"],[aria-labelledby="Street_Type_Label_'+sId+'"],[aria-labelledby="City_AU_Label_'+sId+'"],[aria-labelledby="State_Label_'+sId+'"],[aria-labelledby="QAS_Postal_Code_AU_Label_'+sId+'"],[aria-labelledby="Country_Label_'+sId+'"],[aria-labelledby="District_Label_'+sId+'"],[aria-labelledby="DPID_Label_'+sId+'"],[aria-labelledby="Address_Format_Label_'+sId+'"],[aria-labelledby="SSA_Primary_Field_Label_'+sId+'"],[aria-labelledby="End_Date_Label_'+sId+'"],[aria-labelledby="Street_Type_Label_'+sId+'"],[aria-labelledby="Validation_Warning_Label_'+sId+'"],[aria-labelledby="State_Label_'+sId+'"],[aria-labelledby="Propagate_Address_Label_'+sId+'"],[aria-labelledby="Country_Label_'+sId+'"],[aria-labelledby="Rural_Delivery_Label_'+sId+'"],[aria-labelledby="Freefrom_address_line_2_Label_'+sId+'"],[aria-labelledby="City_Label_'+sId+'"],[aria-labelledby="Postal_Code_Label_'+sId+'"],[aria-labelledby="Private_Bag_Name_Label_'+sId+'"],[aria-labelledby="Private_Bag_Label_'+sId+'"],[aria-labelledby="POBox_Label_'+sId+'"],[aria-labelledby="LICA_Label_'+sId+'"],[aria-labelledby="Freeform_address_line_Label_'+sId+'"]').closest("td").parent().show("fast");
                        $('[aria-labelledby="Freeform_address_line_1_Label_'+sId+'"],[aria-labelledby="Propagate_AddressChckBox_Label_'+sId+'"]').closest("td").parent().hide();
                        $('[aria-labelledby="City AU_'+sId+'"]').closest("td").parent().hide()
                    } else {
                        $('[aria-labelledby="Start_Date_Label_'+sId+'"],[aria-labelledby="Address_Floor_Type_Label_'+sId+'"],[aria-labelledby="Attention_to_Label_'+sId+'"],[aria-labelledby="Street_Address_2_Label_'+sId+'"],[aria-labelledby="Address_Apt_Label_'+sId+'"],[aria-labelledby="Address_Building_Label_'+sId+'"],[aria-labelledby="Street_Address_Label_'+sId+'"],[aria-labelledby="Street_Type_Label_'+sId+'"],[aria-labelledby="City_AU_Label_'+sId+'"],[aria-labelledby="State_Label_'+sId+'"],[aria-labelledby="QAS_Postal_Code_AU_Label_'+sId+'"],[aria-labelledby="Country_Label_'+sId+'"],[aria-labelledby="District_Label_'+sId+'"],[aria-labelledby="DPID_Label_'+sId+'"],[aria-labelledby="Address_Format_Label_'+sId+'"],[aria-labelledby="SSA_Primary_Field_Label_'+sId+'"],[aria-labelledby="End_Date_Label_'+sId+'"],[aria-labelledby="Street_Type_Label_'+sId+'"],[aria-labelledby="Validation_Warning_Label_'+sId+'"],[aria-labelledby="State_Label_'+sId+'"],[aria-labelledby="Propagate_Address_Label_'+sId+'"],[aria-labelledby="Country_Label_'+sId+'"],[aria-labelledby="Rural_Delivery_Label_'+sId+'"],[aria-labelledby="Freefrom_address_line_2_Label_'+sId+'"],[aria-labelledby="City_Label_'+sId+'"],[aria-labelledby="Postal_Code_Label_'+sId+'"],[aria-labelledby="Private_Bag_Name_Label_'+sId+'"],[aria-labelledby="Private_Bag_Label_'+sId+'"],[aria-labelledby="POBox_Label_'+sId+'"],[aria-labelledby="LICA_Label_'+sId+'"],[aria-labelledby="Freeform_address_line_Label_'+sId+'"]').closest("td").parent().hide("fast");
                        $('[aria-labelledby="Freeform_address_line_1_Label_'+sId+'"],[aria-labelledby="Propagate_AddressChckBox_Label_'+sId+'"]').closest("td").parent().show();
                        $('[aria-labelledby="City AU_'+sId+'"]').closest("td").parent().hide()
                    }
                } else {
                    if (Mode == "Edit") {
                        setTimeout(function() {
                            $("#Address_Format_Label_,#Attention_to_Label_,#Start_Date_Label_,#End_Date_Label_,#Validation_Warning_Label_,#SSA_Primary_Field_Label_,#Address_Floor_Type_Label_,#Address_Apt_Label_,#Address_Building_Label_,#DPID_Label_,#Street_Address_2_Label_,#Street_Address_Label_,#Street_Type_Label_,#City_AU_Label_,#State_Label_,#District_Label_,#Postal_Code_AU_Label_,#Country_Label_"+sId).parent().css("text-align", "right")
							//$("#Address_Format_Label_"+sAIN+");
                        }, 200)
                    }
                }
                if ("" + sView == "VF Connection View - Customer Detail" || "" + sView == "Account Detail - Business Address View" || "" + sView == "VF Billing Account Detail - Address View" || sView == "VF SUI Billing Postpay CA Address View" || sView == "VF SUI Billing Prepay CA Address View" || sView == "VF SUI Network Postpay CA Address View" || sView == "VF SUI Network Prepay CA Address View" || sView == "VF SUI Sales Postpay CA Address View" || sView == "VF SUI Sales Prepay CA Address View") {
                    // Balamurugan - 04May2020 - QAStoPSMA - Commented lines from 63 to 147 
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
                                outpPS = sservice.InvokeMethod("UpdateCustomerAddressOUI", inpPS)
                            }
                        }
                    });*/
					//var uWSDLAddress = "Freeform_address_line_1_Label_"+pm.Get("GetId");
					SiebelJS.Log("Hello+++++++++++++++++++++++++++"+sId);
					$('[aria-labelledby="Freeform_address_line_1_Label_'+sId+'"]').autocomplete({
					source:function( request, response ) {
					if(SiebelApp.S_App.GetActiveView().GetName()=="VF Billing Account Detail - Address View")
					  var sResp=VHAAppUtilities.doSearchAddress(request,false);
					else
					  var sResp=VHAAppUtilities.doSearchAddress(request,"physical");
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
					Inputs.SetProperty("Action", "UpdateCustCUTAddress"); 
					mSetPrflAttr("VFQASIsInbound","Y");
					VHAAppUtilities.updateAddress(sResp,Inputs);
					}
				 	}
					
					});
                    $('[aria-labelledby="CAPIN_Label_'+sId+'"]').trigger("click")
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
            return VF_Intelligence_Search_Customer_Address_PR
        }());
        return "SiebelAppFacade.VF_Intelligence_Search_Customer_Address_PR"
    })
};