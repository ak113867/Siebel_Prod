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
                    this.AttachPMBinding("ShowSelection", ExecuteShowSelection,{
                        sequence: false,
                        scope: this
					});
                    this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
                        sequence: false,
                        scope: this
                    });

                    function ExecuteShowSelection() {
						
                        setTimeout(function() {
							
		if($('input[value="NBN"]').length > 0)
			{
				$('input[value="NBN"]').hide();
				$('input[value="NBN"]').next().hide();
				$('input[value="NBN"]').next().next().hide();
				$('input[value="OPTICOMM"]').hide();
				$('input[value="OPTICOMM"]').next().hide();
				$('input[value="OPTICOMM"]').next().next().hide();
				$('input[value="VISION"]').hide();
				$('input[value="VISION"]').next().hide();
				$('input[value="VISION"]').next().next().hide();
				
	if(SiebelApp.S_App.GetActiveBusObj('Order Entry (Sales)').GetBusCompByName('VHA Site Qualification BC').GetFieldValue('VHA AvailableWholesalers') != "")
				{
var AvailableWholesalers =  SiebelApp.S_App.GetActiveBusObj('Order Entry (Sales)').GetBusCompByName('VHA Site Qualification BC').GetFieldValue('VHA AvailableWholesalers');
				}else if(SiebelApp.S_App.GetActiveBusObj('Order Entry (Sales)').GetBusCompByName('VHA Site Qualification BC').GetFieldValue('OneSQConfirmedNetwork') != ""){
					var AvailableWholesalers =  SiebelApp.S_App.GetActiveBusObj('Order Entry (Sales)').GetBusCompByName('VHA Site Qualification BC').GetFieldValue('OneSQConfirmedNetwork');
				}
				else {
					AvailableWholesalers = 'NoNetwork';
				}
				if(AvailableWholesalers != 'NoNetwork')
				{
					AvailableWholesalers = AvailableWholesalers.split('/');
					$.each(AvailableWholesalers, function(options){
						console.log('optionsssssss'+AvailableWholesalers[options]);
						$('input[value='+AvailableWholesalers[options]+']').show();
						$('input[value='+AvailableWholesalers[options]+']').next().show();
						$('input[value='+AvailableWholesalers[options]+']').next().next().show();					
						$('input[value='+AvailableWholesalers[options]+']').removeAttr('aria-readonly');
						$('input[value='+AvailableWholesalers[options]+']').css('pointer-events','auto');
					});
				}
				var confirmedNetwork = SiebelApp.S_App.GetActiveBusObj('Order Entry (Sales)').GetBusCompByName('VHA Site Qualification BC').GetFieldValue('OneSQConfirmedNetwork');
				if(confirmedNetwork != ""){
					$('input[value='+confirmedNetwork+']').prop("checked", true);
				}
				
				var ReadOnlyNetwork = 	SiebelApp.S_App.GetActiveBusObj('Order Entry (Sales)').GetBusCompByName('VHA Site Qualification BC').GetFieldValue('NetworkReadonlyResp')
				
				if(SiebelApp.S_App.GetProfileAttr("ManageServicesSubType") == 'Change Technology' && ReadOnlyNetwork == 'Y')
				{					
					$('input[value="NBN"]').attr('aria-readonly','false');
					$('input[value="NBN"]').css('pointer-events','auto');
					$('input[value="VISION"]').attr('aria-readonly','false');
					$('input[value="VISION"]').css('pointer-events','auto');
					$('input[value="OPTICOMM"]').attr('aria-readonly','false');
					$('input[value="OPTICOMM"]').css('pointer-events','auto');
					
				}
				else if(SiebelApp.S_App.GetProfileAttr("ManageServicesSubType") == 'Change Technology' && ReadOnlyNetwork != 'Y')
				{
					$('input[value="NBN"]').attr('aria-readonly','true');
					$('input[value="NBN"]').css('pointer-events','none');
					$('input[value="VISION"]').attr('aria-readonly','true');
					$('input[value="VISION"]').css('pointer-events','none');
					$('input[value="OPTICOMM"]').attr('aria-readonly','true');
					$('input[value="OPTICOMM"]').css('pointer-events','none');
				}
				else if((SiebelApp.S_App.GetProfileAttr("ManageServicesSubType") == '' || SiebelApp.S_App.GetProfileAttr("ManageServicesSubType") == 'Additional Connect' || SiebelApp.S_App.GetProfileAttr("ManageServicesSubType") == 'Change NBN Address' || SiebelApp.S_App.GetProfileAttr("ManageServicesSubType") == 'NBN Reactivate' || SiebelApp.S_App.GetProfileAttr("ManageServicesSubType") == 'NBN Transfer Reversal' || SiebelApp.S_App.GetProfileAttr("ManageServicesSubType") == 'Change Location FWA') && SiebelApp.S_App.GetProfileAttr("ManageServicesSubType") != 'Change Technology'){
					
					$('input[aria-label="NBN"]').parent().append($('input[aria-label="VHA AvailableWholesalers"]'));
					
					$('input[value="NBN"]').hide();
					$('input[value="NBN"]').next().hide();
					$('input[value="NBN"]').next().next().hide();
					$('input[value="OPTICOMM"]').hide();
					$('input[value="OPTICOMM"]').next().hide();
					$('input[value="OPTICOMM"]').next().next().hide();
					$('input[value="VISION"]').hide();
					$('input[value="VISION"]').next().hide();
					$('input[value="VISION"]').next().next().hide();
					$('input[aria-label="VHA AvailableWholesalers"]').show();
				}
				
			
			}
								
							
							
								
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
								$('input[aria-label="Enhanced SLA"]').addClass('siebui-ctrl-input');
								$('span[id*="Charges_may_apply_for_an_additional_connection_Label"]').parent().parent().attr('colspan',1);
								$('span[id*="Charges_may_apply_for_an_additional_connection_Label"]').parent().parent().css('text-align','right');								
								if (sFIBCONInterimSwitch == "ON"){
									$('[name=' + this_t.GetPM().Get("GetControls")["Fibre Connect Serviceable"].GetInputName() + ']').parent().show();
									$("#Fibre_Connect_Serviceable_Label_" + this_t.GetPM().Get("GetId")).parent().show();
									$('[name=' + this_t.GetPM().Get("GetControls")["Fibre Upgrade High Speed Calc"].GetInputName() + ']').parent().show();
									$("#Fibre_Upgrade_High_Speed_Calc_Label_" + this_t.GetPM().Get("GetId")).parent().show();
									if(sTBUIFLow == "" || sTBUIFLow == null || sTBUIFLow == "Additional Connect"){
										var sFibreConnectServiceable = $('[name='+this_t.GetPM().Get("GetControls")["Fibre Connect Serviceable"].GetInputName()+']').val();
										if (sFibreConnectServiceable == "Yes" && (sTransferTypeSwitch == "Y" || sTransferTypeSwitch == "" || sTransferTypeSwitch == null)) {
											$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().show();
												$('[name=' + this_t.GetPM().Get("GetControls")["VHA NBN SLA Plan"].GetInputName() + ']').parent().show();
											$("#VHA_NBN_SLA_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().show();
											$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().parent().show();
											$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().show();
											$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().show();
										} else {
											$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().hide();
											$('[name=' + this_t.GetPM().Get("GetControls")["VHA NBN SLA Plan"].GetInputName() + ']').parent().hide();
											$("#VHA_NBN_SLA_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
										
											$('[name=' + this_t.GetPM().Get("GetControls")["VHA NBN SLA Plan"].GetInputName() + ']').parent().hide();
											$("#VHA_NBN_SLA_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
											$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().parent().hide();
											$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().hide();
											$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
										}
									}else {
										$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().hide();
											$('[name=' + this_t.GetPM().Get("GetControls")["VHA NBN SLA Plan"].GetInputName() + ']').parent().hide();
											$("#VHA_NBN_SLA_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
										
										$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().parent().hide();
										$('[name=' + this_t.GetPM().Get("GetControls")["VHA NBN SLA Plan"].GetInputName() + ']').parent().hide();
											$("#VHA_NBN_SLA_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
										$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().hide();
										$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
									}									
								}else{
									$('[name=' + this_t.GetPM().Get("GetControls")["Fibre Connect Serviceable"].GetInputName() + ']').parent().hide();
									$("#Fibre_Connect_Serviceable_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
									$('[name=' + this_t.GetPM().Get("GetControls")["Fibre Upgrade High Speed Calc"].GetInputName() + ']').parent().hide();
									$("#Fibre_Upgrade_High_Speed_Calc_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
									
									$('[name=' + this_t.GetPM().Get("GetControls")["Rate Plan"].GetInputName() + ']').parent().hide();
									$('[name=' + this_t.GetPM().Get("GetControls")["VHA NBN SLA Plan"].GetInputName() + ']').parent().hide();
											$("#VHA_NBN_SLA_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
										
									$('[name=' + this_t.GetPM().Get("GetControls")["VHA NBN SLA Plan"].GetInputName() + ']').parent().hide();
											$("#VHA_NBN_SLA_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
									$("#Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().parent().hide();
									$('[name=' + this_t.GetPM().Get("GetControls")["Select Rate Plan"].GetInputName() + ']').parent().hide();
									$("#Select_Rate_Plan_Label_" + this_t.GetPM().Get("GetId")).parent().hide();
								}
							}	
							if(SiebelApp.S_App.GetProfileAttr('VHANewOrg') == 'Vodafone AU'){
								$('button[aria-label="Switch to Connect FWA"]').show();
							}
							else{
								$('button[aria-label="Switch to Connect FWA"]').hide();
							}
														
                        }, 50);
                    }

			$('[data-display="Coverage Check"]').trigger("click");
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
                            setTimeout(function() {								
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
								if(SiebelApp.S_App.GetActiveView().GetName() == "VHA NBN Site Qualification Postpay TBUI" && (sAppltName == "VHA Order Information Applet" || sAppltName == "VHA Order Information FTTC Applet"))
								{	
									if (sFIBCONInterimSwitch == "ON"){
										if(sTransferTypeSwitch == "Y")
										{
											if(sTBUIFLow == "" || sTBUIFLow == null || sTBUIFLow == "Additional Connect"){									
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
                            }, 5);
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
				
	setTimeout(function() {                       
			  					   					   
					   
            }, 50);
				
				
				
				
				//$('input[aria-label="VHA AvailableWholesalers"]').val()
                return VHASQOrderAppletPR;
            }
            ());
        return "SiebelAppFacade.VHASQOrderAppletPR";
    });
}