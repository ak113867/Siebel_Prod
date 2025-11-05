if (typeof(SiebelAppFacade.VHASQOrderAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHASQOrderAppletPR");
    define("siebel/custom/VHASQOrderAppletPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHASQOrderAppletPR = (function() {
                function VHASQOrderAppletPR(pm) {
                    SiebelAppFacade.VHASQOrderAppletPR.superclass.constructor.call(this, pm);
                }
                SiebelJS.Extend(VHASQOrderAppletPR, SiebelAppFacade.PhysicalRenderer);
                VHASQOrderAppletPR.prototype.ShowUI = function() {
                    SiebelAppFacade.VHASQOrderAppletPR.superclass.ShowUI.call(this);
                    var pm = this.GetPM();

                    var controls = pm.Get("GetControls");
                    var sAppltName = this.GetPM().Get("GetName");

                    setTimeout(function() {
                        if (sAppltName == "VHA NBN Modify CVC Details Form Applet") {
                            $('[name=' + pm.Get("GetControls")["sqid"].GetInputName() + ']').hide();
                            //$("#sqid_Label").parent().hide();
							$("#sqid_Label_" + pm.Get("GetId")).parent().hide();
                        }
                        if ($('[name='+pm.Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "Yes") {
                            $('[name='+pm.Get("GetControls")["High Speed Eligible"].GetInputName()+']').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
                        } else if ($('[name='+pm.Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "No") {
                            $('[name='+pm.Get("GetControls")["High Speed Eligible"].GetInputName()+']').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
                        }
                    }, 50);
                }

                VHASQOrderAppletPR.prototype.Init = function() {
                    SiebelAppFacade.VHASQOrderAppletPR.superclass.Init.apply(this, arguments);
                    var this_t = this;
					var sAppltName = this.GetPM().Get("GetName");
                    this.GetPM().AddMethod("FieldChange", OnFieldChange, {
                        sequence: false,
                        scope: this
                    });
                    this.AttachPMBinding("ShowSelection", ExecuteShowSelection);
                    this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
                        sequence: false,
                        scope: this
                    });

                    function ExecuteShowSelection() {
                        setTimeout(function() {
                            if ($('[name='+this_t.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "Yes") {
                                $('[name='+this_t.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
                            } else if ($('[name='+this_t.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "No") {
                                $('[name='+this_t.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
                            }
							//NROY: 18/02/2024 Added for Fibre Upgrade
							var sFIBCONInterimSwitch = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_FIBRE_CONNECT' AND [List Of Values.Name]='INTERIM SWITCH' AND [List Of Values.Active]='Y'", {
								"All": "true"
							})[0].Value;
							var sTransferType = $('[name='+this_t.GetPM().Get("GetControls")["Transfer Type"].GetInputName()+']').val();
							var sTransferTypeSwitch = "";
							if(sTransferType != "" && sTransferType != null)
							{	
								sTransferTypeSwitch = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_FIB_CON_SWITCH' AND [List Of Values.Name]='" + sTransferType + "' AND [List Of Values.Active]='Y'", {
									"All": "true"
								})[0].Value;
							}
							var sTBUIFLow = TheApplication().GetProfileAttr("ManageServicesSubType");							
							if(SiebelApp.S_App.GetActiveView().GetName() == "VHA NBN Site Qualification Postpay TBUI" && (sAppltName == "VHA Order Information Applet" || sAppltName == "VHA Order Information FTTC Applet"))
							{
								if (sFIBCONInterimSwitch == "ON"){
									$('[name=' + this_t.GetPM().Get("GetControls")["Fibre Connect Serviceable"].GetInputName() + ']').parent().show();
									$("#Fibre_Connect_Serviceable_Label_" + this_t.GetPM().Get("GetId")).parent().show();
									$('[name=' + this_t.GetPM().Get("GetControls")["Fibre Upgrade High Speed Calc"].GetInputName() + ']').parent().show();
									$("#Fibre_Upgrade_High_Speed_Calc_Label_" + this_t.GetPM().Get("GetId")).parent().show();
									if(sTBUIFLow == "" || sTBUIFLow == null){
										var sFibreConnectServiceable = $('[name='+this_t.GetPM().Get("GetControls")["Fibre Connect Serviceable"].GetInputName()+']').val();
										if (sFibreConnectServiceable == "Yes" && (sTransferTypeSwitch == "Y" || sTransferTypeSwitch == "" || sTransferTypeSwitch == null)) {
											$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().show();
											$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().show();
											$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().show();
											$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().show();
										} else {
											$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().hide();
											$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
											$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().hide();
											$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
										}
									}else {
										$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().hide();
										$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
										$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().hide();
										$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
									}									
								}else{
									$('[name=' + this_t.GetPM().Get("GetControls")["Fibre Connect Serviceable"].GetInputName() + ']').parent().hide();
									$("#Fibre_Connect_Serviceable_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
									$('[name=' + this_t.GetPM().Get("GetControls")["Fibre Upgrade High Speed Calc"].GetInputName() + ']').parent().hide();
									$("#Fibre_Upgrade_High_Speed_Calc_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
									
									$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().hide();
									$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
									$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().hide();
									$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
								}
							}							
                        }, 50);
                    }


                    function OnFieldChange(control, value) {
                        if (control.GetName() == "sqid") {
                            setTimeout(function() {
                                if ($('[name='+this_t.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "Yes") {
									if (sAppltName == "VHA NBN Modify CVC Details Form Applet") {
										$('[name=' + this_t.GetPM().Get("GetControls")["sqid"].GetInputName() + ']').hide();
										//$("#sqid_Label").parent().hide();
										$("#sqid_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
									}
                                    $('[name='+this_t.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
                                } else if ($('[name='+this_t.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "No") {
                                    if (sAppltName == "VHA NBN Modify CVC Details Form Applet") {
										$('[name=' + this_t.GetPM().Get("GetControls")["sqid"].GetInputName() + ']').hide();
										//$("#sqid_Label").parent().hide();
										$("#sqid_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
									}
                                    $('[name='+this_t.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
                                }
                            }, 5);
                        }
						
						if (control.GetName() == "Transfer Type") {
                            //setTimeout(function() {								
								//NROY: 18/02/2024 Added for Fibre Upgrade
								var sFIBCONInterimSwitch = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_FIBRE_CONNECT' AND [List Of Values.Name]='INTERIM SWITCH' AND [List Of Values.Active]='Y'", {
									"All": "true"
								})[0].Value;
								var sTransferTypeSwitch = "";
								if(value != "" && value != "")
								{ 
									sTransferTypeSwitch = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_FIB_CON_SWITCH' AND [List Of Values.Name]='" + value + "' AND [List Of Values.Active]='Y'", {
									"All": "true"
									})[0].Value;
								}
								var sTBUIFLow = TheApplication().GetProfileAttr("ManageServicesSubType");	
								if(sFIBCONInterimSwitch == "ON" && sTransferTypeSwitch == "Y" && (sTBUIFLow == "" || sTBUIFLow == null) && SiebelApp.S_App.GetActiveView().GetName() == "VHA NBN Site Qualification Postpay TBUI" && (sAppltName == "VHA Order Information Applet" || sAppltName == "VHA Order Information FTTC Applet"))
								{
									TheApplication().SetProfileAttr("FibreUpgTransferTypeSwitch", "Y");
								}else{
									TheApplication().SetProfileAttr("FibreUpgTransferTypeSwitch", "N");
								}
								/* //NROY: 09/08/2024 -- Commented out because for Additioncal connect below secion is executing in loops
								if(SiebelApp.S_App.GetActiveView().GetName() == "VHA NBN Site Qualification Postpay TBUI" && (sAppltName == "VHA Order Information Applet" || sAppltName == "VHA Order Information FTTC Applet"))
								{	
									if (sFIBCONInterimSwitch == "ON"){
										if(sTransferTypeSwitch == "Y")
										{
											if(sTBUIFLow == "" || sTBUIFLow == null){									
												if ($('[name='+this_t.GetPM().Get("GetControls")["Fibre Connect Serviceable"].GetInputName()+']').val() == "Yes") {
													$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().show();
													$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().show();
													$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().show();
													$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().show();
													TheApplication().SetProfileAttr("FibreUpgTransferTypeSwitch", "Y");
												} else {
													$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().hide();
													$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
													$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().hide();
													$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
													TheApplication().SetProfileAttr("FibreUpgTransferTypeSwitch", "N");
												}
											}else {
												$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().hide();
												$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
												$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().hide();
												$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
												TheApplication().SetProfileAttr("FibreUpgTransferTypeSwitch", "N");
											}
										}else{
											if((value == "" || value == "") && (sTBUIFLow == "" || sTBUIFLow == null || sTBUIFLow !="Change NBN Address")){									
												if ($('[name='+this_t.GetPM().Get("GetControls")["Fibre Connect Serviceable"].GetInputName()+']').val() == "Yes") {
													$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().show();
													$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().show();
													$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().show();
													$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().show();
													TheApplication().SetProfileAttr("FibreUpgTransferTypeSwitch", "N");
												} 
											}else {
												$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().hide();
												$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
												$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().hide();
												$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
												TheApplication().SetProfileAttr("FibreUpgTransferTypeSwitch", "N");
											}
										}										
									}else{								
										$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().hide();
										$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
										$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().hide();
										$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
										TheApplication().SetProfileAttr("FibreUpgTransferTypeSwitch", "N");
									}
								}
								*/
                            //}, 5);
                        }
						
                    }
                }

                function PostInvokeMethod(MethodName) {
                    if (MethodName == "Site Qualification") {
                        if ($('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "Yes") {
                            $('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
                        } else if ($('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "No") {
                            $('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
                        }
						
                    } else if (MethodName == "SiteQualification") {
                        if ($('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "Yes") {
                            $('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
                        } else if ($('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "No") {
                            $('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
                        }

                    } else if (MethodName == "GoToActivityView") {
                        if ($('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "Yes") {
                            $('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
                        } else if ($('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').val() == "No") {
                            $('[name='+this.GetPM().Get("GetControls")["High Speed Eligible"].GetInputName()+']').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
                        }
                    }
                }
                return VHASQOrderAppletPR;
            }
            ());
        return "SiebelAppFacade.VHASQOrderAppletPR";
    });
}