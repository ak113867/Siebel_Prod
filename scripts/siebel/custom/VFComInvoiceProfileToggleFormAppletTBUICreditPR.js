if (typeof(SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUICreditPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUICreditPR");
    define("siebel/custom/VFComInvoiceProfileToggleFormAppletTBUICreditPR", ["siebel/phyrenderer", "siebel/custom/VHABTProcessCall"], function () {
        SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUICreditPR = (function () {
			var tokenBCId = "";
            function VFComInvoiceProfileToggleFormAppletTBUICreditPR(pm) {
                SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUICreditPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VFComInvoiceProfileToggleFormAppletTBUICreditPR, SiebelAppFacade.PhysicalRenderer);
            VFComInvoiceProfileToggleFormAppletTBUICreditPR.prototype.Init = function () {
                SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUICreditPR.superclass.Init.apply(this, arguments);
                this.GetPM().AttachPMBinding("FieldChange", VFPPOUIFieldChange)
            };
            function VFPPOUIFieldChange(control, field_value) {
                var appMode;
                if ((this.Get("GetName") == "VF Com Invoice Profile Form Toggle Applet - Connection - AU")) {
                    appMode = SiebelApp.S_App.GetActiveView().GetApplet("VF Com Invoice Profile Form Toggle Applet - Connection - AU").GetMode()
                }
                if (this.Get("GetName") == "VHA Com Invoice Profile Toggle Form Applet TBUI Credit" || ((this.Get("GetName") == "VF Com Invoice Profile Form Toggle Applet - Connection - AU") && (appMode != "Base"))) {}
                else {
                    return
                }
                var BillProfileApplet = SiebelApp.S_App.GetActiveView().GetApplet(this.Get("GetName"));
                var CaptureInvoke = BillProfileApplet.CanInvokeMethod("VFCaptureCreditCard");
                var pm = BillProfileApplet.GetPModel();
                var controls = pm.Get("GetControls");
                var CaptureCreditCheckBtn = controls["VFCaptureCreditCard"];
                var ConfirmCreditCheckBtn = controls["VFConfirmCreditCard"];
                $("#" + ConfirmCreditCheckBtn.GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                $("#" + CaptureCreditCheckBtn.GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                switch (control.GetName()) {
                case ("Payment Type"):
                    if (field_value == "Credit Card") {
                        if (this.Get("GetName") == "VF Com Invoice Profile Form Toggle Applet - Connection - AU") {
                            $(".VFPPOUICaptureCreditCard").removeClass("VFDisplayNone")
                        } else {
                            if (CaptureInvoke) {
                                $(".VFPPOUICaptureCreditCard").removeClass("VFDisplayNone")
                            } else {
                                $(".VFPPOUICaptureCreditCard").addClass("VFDisplayNone")
                            }
                        }
                    } else {
                        $(".VFPPOUICaptureCreditCard").addClass("VFDisplayNone")
                    }
                    break;
                default:
                }
            }
            VFComInvoiceProfileToggleFormAppletTBUICreditPR.prototype.ShowUI = function () {
                SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUICreditPR.superclass.ShowUI.apply(this, arguments);
                $("#HTML_Label7_Label").attr("style", "margin-left: 25px; !important");
                var appMode;
                if ((this.GetPM().Get("GetName") == "VF Com Invoice Profile Form Toggle Applet - Connection - AU")) {
                    appMode = SiebelApp.S_App.GetActiveView().GetApplet("VF Com Invoice Profile Form Toggle Applet - Connection - AU").GetMode()
                }
                if (this.GetPM().Get("GetName") == "VHA Com Invoice Profile Toggle Form Applet TBUI Credit" || this.GetPM().Get("GetName") == "VHA Kogan Com Invoice Profile Toggle Form Applet TBUI Credit" || ((this.GetPM().Get("GetName") == "VF Com Invoice Profile Form Toggle Applet - Connection - AU") && (appMode != "Base"))) {}
                else {
                    return
                }
                var pm = this.GetPM();
                var controls = pm.Get("GetControls");
                var CaptureCreditCheckBtn = controls["VFCaptureCreditCard"];
                var ConfirmCreditCheckBtn = controls["VFConfirmCreditCard"];
                $("#" + ConfirmCreditCheckBtn.GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                $("#" + CaptureCreditCheckBtn.GetInputName() + "_Ctrl").after("<button class='VFPPOUICaptureCreditCard appletButton'>Capture Credit Card</button>").addClass("VFDisplayNone");
                var ActiveApplet = pm.Get("GetName");
                var BillProfileApplet = SiebelApp.S_App.GetActiveView().GetApplet(ActiveApplet);
                if (BillProfileApplet.CanInvokeMethod("VFCaptureCreditCard")) {}
                else {
                    $(".VFPPOUICaptureCreditCard").addClass("VFDisplayNone")
                }
            };
            VFComInvoiceProfileToggleFormAppletTBUICreditPR.prototype.BindEvents = function () {
                SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUICreditPR.superclass.BindEvents.apply(this, arguments);
                var pm = this.GetPM();
                $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUICaptureCreditCard", "click", {
                    ctx: this
                }, VFBTOUICaptureCreditCard);
                /*$("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUIPayCorpSubmit", "click", {
                    ctx: this
                }, VFPPOUIPayCorpSubmit);
                $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUIPayCorpCancle", "click", {
                    ctx: this
                }, VFPPOUIPayCorpCancle)*/
            };
            /*function VFPPOUIPayCorpSubmit(e) {
                var paymentFrame = document.getElementById("VFPPOUIPayCorpIFrameID").contentWindow;
                paymentFrame.postMessage(JSON.stringify({
                        type: "SUBMIT"
                    }), "*")
            }
            function VFPPOUIPayCorpCancle(e) {
                var pm = e.data.ctx.GetPM();
                var CCAppId = pm.Get("GetFullId");
                var appletname = pm.Get("GetName");
                if (appletname == "VF Com Invoice Profile Form Toggle Applet - Connection - AU") {
                    $("#s_" + CCAppId + "_div div.AppletHIFormBorder table").show();
                    $("#s_" + CCAppId + "_div div.siebui-applet-buttons").show();
                    $(".VFPPOUIPayCorpIFramePar").remove()
                } else {
                    $("#s_" + CCAppId + "_div div.AppletHIFormBorder table").show();
                    $("#s_" + CCAppId + "_div div.siebui-applet-buttons").show();
                    $(".VFPPOUIPayCorpIFramePar").remove()
                }
            }*/
			
			function VFBTOUICaptureCreditCard(e) {
                if ($("#BrainTreeDiv").length) {
                    alert("There is a Paypal Braintree form open");
                    return
                }
				// call fusion to get the clienttoken
				var pm = e.data.ctx.GetPM();
                var ActiveApplet = pm.Get('GetName');
                var CreditCardApplet = SiebelApp.S_App.GetActiveView().GetApplet(ActiveApplet);
                var CCApm = CreditCardApplet.GetPModel();
                var CCAppId = CCApm.Get('GetFullId');				                   
				var main = function(){
					console.log("main function execution started");
					var authTokenBT="";
					var BusComp = pm.Get("GetBusComp");
					var BillRowId = BusComp.GetIdValue();
					
					var ser = SiebelApp.S_App.GetService("Workflow Process Manager");					
					var BAN = SiebelApp.S_App.GetProfileAttr("BAN");
					BAN = "BAN:" + BAN;
					var Inputs = SiebelApp.S_App.NewPropertySet();
					Inputs.SetProperty("ProcessName", "VF PP BT INIT Workflow");
					Inputs.SetProperty("ClientRef", BAN);
					Inputs.SetProperty("CompName", GetCompName());
					Inputs.SetProperty("Identifier", BillRowId);
					console.log("ROw Id :" + BillRowId);
					try {
						var out = ser.InvokeMethod("RunProcess", Inputs);
						var ResultSet = out.GetChildByType("ResultSet");							
						tokenBCId = ResultSet.GetProperty("tokenBCId");
						authTokenBT = ResultSet.GetProperty("PaymentClientToken");
						var ErrorMessage = ResultSet.GetProperty("Error Message");
						if (ErrorMessage != "") {
							authTokenBT="";
							ExitBTframe();
							console.log(ErrorMessage);
							alert("Integration error with external system EAI.Please Contact the System Administrator");							
						}												
					} catch (e) {
						alert(e.message)
					} finally {}
					if(authTokenBT!=""){
						$("#s_" + CCAppId + "_div div.AppletHIFormBorder table").hide();
                        $("#s_" + CCAppId + "_div div.siebui-applet-buttons").hide();
						$("#s_" + CCAppId + "_div").append(VFBTFormConstruct());
						hostFields(pm, authTokenBT, tokenBCId, GetCustomerIdValue(), "");
						$("#BrainTreeDiv").show();
					}
				}					
				load_scripts(main);
            }
			
			function GetCustomerIdValue() {
                var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
				switch (ActiveView) {
				 case "VF Connection View - Billing Detail":
					var app = SiebelApp.S_App.GetActiveView().GetApplet("VF SIS Account Entry Applet - Connection");
					var pm = app.GetPModel();
					var Data = pm.Get("GetRecordSet");
					return Data[0]["Id"]
				 break;
				 case "VF Billing Details View - TBUI":
					var app = SiebelApp.S_App.GetActiveView().GetApplet("VF Task Session Form Applet - Upgrade TBUI");
					var pm = app.GetPModel();
					var Data = pm.Get("GetRecordSet");
					return Data[0]["Customer Row Id"]
				 break;
				 default:
					var app = SiebelApp.S_App.GetActiveView().GetApplet("VF Task Session Form Applet – TBUI");
					var pm = app.GetPModel();
					var Data = pm.Get("GetRecordSet");
					return Data[0]["Customer Row Id"]
				 break;	
				 }				
            }
			
            function GetCompName() {
                var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
                CompName = "";
                switch (ActiveView) {
                case ("VF Connection View - Billing Detail"):
                case ("VF Connection Wizard View - Billing Detail - TBUI"):
                case ("VF Billing Details View - TBUI"):
                case ("VF Billing Account Profile View - Extended"):
                case ("VF Billing Account Profile View"):
                case ("VF SUI Billing Postpay Billing Profile Detail View"):
                    CompName = "VFBillProfUpdate";
                    break;
                case ("VF My Requested Service Request List View"):
                case ("VF My Service Request List View"):
                case ("VF Detail Service Request List View"):
                case ("VF Admin Service Request List View"):
                case ("VF Personal Service Request List View"):
                case ("VF All Service Request List View"):
                    CompName = "VFSRUpdate";
                    break;
                case ("VF Credit Card View - AU"):
                    CompName = "VFCreditCardReg";
                    break;
                case ("VF SUI Billing Prepay Credit Card Detail View"):
                    CompName = "VFCreditCardReg";
                    break;
                default:
                    alert("View Name Not Found.")
                }
                return CompName
            }
			
            function VFPPOUICaptureCreditCard(e) {
                if ($("#VFPPOUIPayCorpIFrame").length) {
                    alert("There is a Pay Corp form open");
                    return
                }
                var pm = e.data.ctx.GetPM();
                var BusComp = pm.Get("GetBusComp");
                var BillRowId = BusComp.GetIdValue();
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VF PCI INIT Workflow");
                var BAN = SiebelApp.S_App.GetProfileAttr("BAN");
                BAN = "BAN:" + BAN;
                Inputs.SetProperty("CompName", GetCompName());
                Inputs.SetProperty("ClientRef", BAN);
                Inputs.SetProperty("Identifier", BillRowId);
                console.log("ROw Id :" + BillRowId);
                try {
                    var out = ser.InvokeMethod("RunProcess", Inputs);
                    var ResultSet = out.GetChildByType("ResultSet");
                    var ActiveApplet = pm.Get("GetName");
                    var CreditCardApplet = SiebelApp.S_App.GetActiveView().GetApplet(ActiveApplet);
                    var CCApm = CreditCardApplet.GetPModel();
                    var CCAppId = CCApm.Get("GetFullId");
                    var PayCorpURL = ResultSet.GetProperty("Paycorp URL");
                    var ErrorMessage = ResultSet.GetProperty("Error Message");
                    if (ErrorMessage != "") {
                        alert("Integration error with external system EAI.Please Contact the System Administrator")
                    } else {
                        if (ActiveApplet == "VF Com Invoice Profile Form Toggle Applet - Connection - AU") {
                            $("#s_" + CCAppId + "_div div.AppletHIFormBorder table").hide();
                            $("#s_" + CCAppId + "_div div.siebui-applet-buttons").hide();
                            $("#s_" + CCAppId + "_div div.AppletHIFormBorder .AppletStyleChild77").append("<div class='VFPPOUIPayCorpIFramePar'><div id='VFPPOUIPayCorpIFrame' style='height:430px;'><iframe id='VFPPOUIPayCorpIFrameID' src='" + PayCorpURL + "' class='VFPayCorpiFrameheight'></iframe></div><div class='VFPPOUIPayCorpSubmit appletButton'>Submit</div><div class='VFPPOUIPayCorpCancle appletButton'>Cancel</div></div>")
                        } else {
                            $("#s_" + CCAppId + "_div div.AppletHIFormBorder table").hide();
                            $("#s_" + CCAppId + "_div div.siebui-applet-buttons").hide();
                            $("#s_" + CCAppId + "_div div.AppletHIFormBorder .AppletStyleChild77").append("<div class='VFPPOUIPayCorpIFramePar'><div id='VFPPOUIPayCorpIFrame' style='height:430px;'><iframe id='VFPPOUIPayCorpIFrameID' src='" + PayCorpURL + "' class='VFPayCorpiFrameheight'></iframe></div><div class='VFPPOUIPayCorpSubmit appletButton'>Submit</div><div class='VFPPOUIPayCorpCancle appletButton'>Cancel</div></div>")
                        }
                    }
                } catch (e) {
                    alert(e.message)
                }
                finally {}
            }
            VFComInvoiceProfileToggleFormAppletTBUICreditPR.prototype.EndLife = function () {
                SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUICreditPR.superclass.EndLife.apply(this, arguments)
            };
            return VFComInvoiceProfileToggleFormAppletTBUICreditPR
        }
            ());
        return "SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUICreditPR"
    })
};
