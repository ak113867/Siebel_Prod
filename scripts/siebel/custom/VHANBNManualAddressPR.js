if (typeof (SiebelAppFacade.VHANBNManualAddressPR) === "undefined") {
	SiebelJS.Namespace("SiebelAppFacade.VHANBNManualAddressPR");
	define("siebel/custom/VHANBNManualAddressPR", ["siebel/jqgridrenderer"],
		function () {
			SiebelAppFacade.VHANBNManualAddressPR = (function () {
				var OrgName1 = SiebelApp.S_App.GetProfileAttr("VHANewOrg");
				console.log(OrgName1);
				function VHANBNManualAddressPR(pm) {
					SiebelAppFacade.VHANBNManualAddressPR.superclass.constructor.apply(this, arguments);
					var gpm = this.GetPM();
					this.GetPM().AttachPMBinding("FieldChange", VHANBNLOCIdOption, {
						scope: this
					});

				}

				SiebelJS.Extend(VHANBNManualAddressPR, SiebelAppFacade.JQGridRenderer);
				VHANBNManualAddressPR.prototype.Init = function () {
					SiebelAppFacade.VHANBNManualAddressPR.superclass.Init.apply(this, arguments);
					this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
						sequence: false,
						scope: this
					});
				}

				function PostInvokeMethod(MethodName) {
					if (MethodName == "PickRecord") {
						NBNManualAddress();
						var sAIN = SiebelApp.S_App.GetActiveView().GetActiveApplet().GetId();
						if ($('[aria-labelledby="High_Speed_Eligible_Label_'+sAIN+'"]').val() == "Yes") {
							$('[aria-labelledby="High_Speed_Eligible_Label_'+sAIN+'"]').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
						}
						else if ($('[aria-labelledby="High_Speed_Eligible_Label_'+sAIN+'"]').val() == "No") {
							$('[aria-labelledby="High_Speed_Eligible_Label_'+sAIN+'"]').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
						}
					}
				}

				VHANBNManualAddressPR.prototype.ShowUI = function () {
					SiebelAppFacade.VHANBNManualAddressPR.superclass.ShowUI.apply(this, arguments);
					var sMSISDNA;
					console.log("Inside ShowUI Man");
					if (SiebelApp.S_App.GetProfileAttr("TBUIPostExstCust") == "N") {
						SiebelApp.S_App.SetProfileAttr("SendSMSY", "");
						SiebelApp.S_App.SetProfileAttr("sMSISDNPC", "");
						console.log("Inside Connect New Manu");
					}

					$('[aria-label="Check Address with NBN:Select"]').addClass("VHANBNManualAddressChk");
					var m1 = this.GetPM().Get("GetMode");
					if (m1 == "Query") {
						var Controls = this.GetPM().Get("GetControls");
						var sName = Controls["NBN LocationId"].GetInputName();
						$("input[name='" + sName + "']").hide();
						$("input[name='" + sName + "']").parent().parent().parent().hide();
					}
				}

				VHANBNManualAddressPR.prototype.BindData = function (bRefresh) {
					SiebelAppFacade.VHANBNManualAddressPR.superclass.BindData.apply(this, arguments);

				}

				VHANBNManualAddressPR.prototype.BindEvents = function () {
					SiebelAppFacade.VHANBNManualAddressPR.superclass.BindEvents.apply(this, arguments);
					$(".ui-dialog-content.ui-widget-content").delegate(".siebui-icon-pickrecord[title='Check Address with NBN:Select']", "click", function () {
						//NBNManualAddress();
					});
					$(".siebui-icon-executequery[title='Check Address with NBN:Check Address with NBN']").on("click", function () {
						if ($('[aria-label="NBN Location Id Search"]').val() == "Y") {
							var Inputs = SiebelApp.S_App.NewPropertySet();							
							//var sLocId = $("[aria-labelledby='NBN_LocationId_Label']").val();
							var sLocId = $("[aria-labelledby='NBN_LocationId_Label_"+this.GetPM().Get("GetId")+"]").val();
							//var sLocId = $('[name='+gpm.Get("GetControls")["NBN LocationId"].GetInputName()+']')
							Inputs.SetProperty("VHANBNLocId", sLocId);
							var Outputs = VHAAppUtilities.CallBS("VF TBUI Utilities", "SetProfileAttr", Inputs);
						}
					});
				}

				VHANBNManualAddressPR.prototype.EndLife = function () {
					SiebelAppFacade.VHANBNManualAddressPR.superclass.EndLife.apply(this, arguments);

				}

				function VHANBNLOCIdOption(control, fieldValue) {
					var controls = this.GetPM().Get("GetControls");
					if (control.GetName() == "NBN Location Id Search") {

						for (var control in controls) {
							if (fieldValue == 'Y' && (control != 'NBN Location Id Search' && control != 'NBN LocationId' && control != 'ExecuteQuery' && control != 'NewQuery')) {
								if (control == 'HTML FormSection') {
									//$("#HTML_FormSection_Label_9").hide();
									$("#HTML_FormSection_Label_" + this.GetPM().Get("GetId")).hide();
								}

								$("input[name='" + controls[control].GetInputName() + "']").hide();
								$("input[name='" + controls[control].GetInputName() + "']").parent().parent().parent().hide();
							}
							else if (fieldValue == 'Y' && control == 'NBN LocationId') {
								$("input[name='" + controls[control].GetInputName() + "']").show();
								$("input[name='" + controls[control].GetInputName() + "']").parent().parent().parent().show();
							}
							else if (fieldValue != 'Y' && (control != 'NBN LocationId')) {
								if (control == 'HTML FormSection') {
									//$("#HTML_FormSection_Label_9").show();
									$("#HTML_FormSection_Label_" + this.GetPM().Get("GetId")).show();
								}
								$("input[name='" + controls[control].GetInputName() + "']").show();
								$("input[name='" + controls[control].GetInputName() + "']").parent().parent().parent().show();
							}
							else if (fieldValue != 'Y' && control == 'NBN LocationId') {
								$("input[name='" + controls[control].GetInputName() + "']").hide();
								$("input[name='" + controls[control].GetInputName() + "']").parent().parent().parent().hide();
							}
						}
					}
				}
				function getSessionId() {
					var SessionApplet = SiebelApp.S_App.GetActiveView().GetApplet("VF Task Session Form Applet – TBUI");
					var pm = SessionApplet.GetPModel();
					var RecSet = pm.Get("GetRecordSet");
					return RecSet[0]["Session Id"];
				}

				function TriggerNBNAddressSMSMan(sMSISDNA) {
					var psInputs2 = SiebelApp.S_App.NewPropertySet();
					var psOutputs2 = SiebelApp.S_App.NewPropertySet();
					psInputs2.SetProperty("System Preference Name", "VHA Send NBN SMS");
					psOutputs2 = VHAAppUtilities.CallBS(
						"VF Get System Preference", "Get System Preference",
						psInputs2, {}
					);

					var sEntitlementName = psOutputs2.GetProperty("System Preference Comments");
					var sTiming = psOutputs2.GetProperty("System Preference Value");
					if (sTiming == "Business Hours") {
						sCheckBusiness = "Y";
					}
					else {
						sCheckBusiness = "N";
					}
					var sWFBS = "Workflow Process Manager";
					var psInput1 = SiebelApp.S_App.NewPropertySet();
					var psOutput2 = SiebelApp.S_App.NewPropertySet();
					psInput1.SetProperty("ProcessName", "VHA Send SMS/Email Workflow");
					psInput1.SetProperty("Notifiation Method", "TXT");
					psInput1.SetProperty("MSISDN", sMSISDNA);
					psInput1.SetProperty("Object Id", getSessionId());
					psInput1.SetProperty("ActivityCreationRequired", "N");
					psInput1.SetProperty("SMS Template Name", sEntitlementName);
					psInput1.SetProperty("SourceBusObj", "VHA NBN Address SMS BO");
					psInput1.SetProperty("CheckBusinessHours", sCheckBusiness);
					SiebelApp.S_App.SetProfileAttr("SMSSendInpMan", sEntitlementName + sCheckBusiness + sMSISDNA);
					psOutput2 = VHAAppUtilities.CallBS(
						"Workflow Process Manager", "RunProcess",
						psInput1, {}
					);
					console.log("ManualAddressSQSMS");


				}

				function NBNManualAddress() {
					setTimeout(function () {
						$('img.VHANBNValidate').addClass("VFDisplayNone"); //Madhu-04Mar20-Hide validate icon
						$('.VHASQInfoexpand').addClass("VHADisplaynone").removeClass("VHADisplayblock");
						$('.VHASQInfocollapse').addClass("VHADisplayblock").removeClass("VHADisplaynone");
						$('.VHANBNSQLabel').siblings().show();
						/*$("#Site_Qualilfication_Label").parent().parent().parent().parent().siblings().show();*/
						$('[title="Service List"]').siblings().show();
						//$("#Order_Information_Label").parent().parent().parent().parent().siblings().show();
						$('.VHANBNOrderInfoLabel').siblings().show();

						if ($('.VHANBNOrderInfoLabel').length == 0) {

							$('#Order_Information_Label').parent().parent().parent().parent().parent().parent().before("<div class='VHANBNPageLabel VHANBNOrderInfoLabel'>Order Information<div class='siebui-applet-container siebui-collapsible siebui-collapsible-applet-container VHAOrderExpandCollapse'><span class='siebui-button-secondary siebui-btn-icon-expanded VHAOrderInfoexpand VHADisplayblock'><a href='javascript:void()' role='link' tabindex='0' aria-label='NBNSQ:Expand Applet'></a></span><span class='siebui-button-secondary siebui-btn-icon-collapsed VHAOrderInfocollapse VHADisplaynone'><a href='javascript:void()' role='link' tabindex='0' aria-label='NBN:Collapse Applet'></a></span></div></div>");
							$('#Order_Information_Label').parent().hide();
						}

						$('.VHAOrderInfocollapse').addClass("VHADisplayblock").removeClass("VHADisplaynone");
						$('.VHAOrderInfoexpand').addClass("VHADisplaynone").removeClass("VHADisplayblock");

						var sAIN = SiebelApp.S_App.GetActiveView().GetActiveApplet().GetId();
						var SQAvailability = $('[aria-labelledby="Can_Custoemr_Get_NBN_Label_'+sAIN+'"]').val();
						if (SQAvailability == "Yes") {
							$('[aria-labelledby="Can_Custoemr_Get_NBN_Label_'+sAIN+'"]').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
							var sNBNAddress2 = $('[aria-labelledby="NBN_Address_Label"]').val();
							console.log("ManualAddressSQ");
							SiebelApp.S_App.SetProfileAttr("sNBNAddress1", sNBNAddress2);
							var sMSISDN3 = SiebelApp.S_App.GetProfileAttr("sMSISDNPC");
							if ((sMSISDN3 != "" && sMSISDN3 != null) && (OrgName1 == "Vodafone AU")) {
								var sErr1 = TriggerNBNAddressSMSMan(sMSISDN3);
								if (sErr1 == null || sErr1 == "") {
									SiebelApp.S_App.SetProfileAttr("SendSMSY", "SendQASSMS");
									console.log("Label Show Manual");
								}
								else {
									SiebelApp.S_App.SetProfileAttr("SendSMSY", "");

								}

							}
						}
						else if (SQAvailability == "No") {
							$('[aria-labelledby="Can_Custoemr_Get_NBN_Label_'+sAIN+'"]').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
							SiebelApp.S_App.SetProfileAttr("SendSMSY", "");
							console.log("Label Hide Man");

						}
						else {
							$('[aria-labelledby="Can_Custoemr_Get_NBN_Label_'+sAIN+'"]').removeClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
							SiebelApp.S_App.SetProfileAttr("SendSMSY", "");
							console.log("Label Hide Man1");

						}

						var sFlowName1 = $('.siebui-applet-taskui-h').html();
						if (sFlowName1 == "Connect NBN: NBN Availability") {
							var sSMSConnectMan = SiebelApp.S_App.GetProfileAttr("SendSMSY");
							console.log("Here" + sSMSConnectMan + sFlowName1);
							if (sSMSConnectMan == "SendQASSMS") {
								$('#NBN_Send_SMS1_Label').show();
								console.log("show Label Connect Man");
							}
							else {
								$('#NBN_Send_SMS1_Label').hide();
								console.log("Hide Label Connect Man");
							}
						}



						//$(".siebui-icon-bttns_more").click();
						if ($('.siebui-applet-taskui-h').html() == "Manage Service: NBN Availability")
							$('.VHANBNAddreSection').next('table').find('.siebui-icon-bttns_more').click();
					}, 300);
				}

				return VHANBNManualAddressPR;
			}()
			);
			return "SiebelAppFacade.VHANBNManualAddressPR";
		})
}