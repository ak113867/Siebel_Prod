if (typeof(SiebelAppFacade.VFCreditCardListAppletAustraliaPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFCreditCardListAppletAustraliaPR");
    define("siebel/custom/VFCreditCardListAppletAustraliaPR", ["siebel/jqgridrenderer", "siebel/custom/VHABTProcessCall"], function() {
        SiebelAppFacade.VFCreditCardListAppletAustraliaPR = (function() {
            var tokenBCId = "";
			console.log("InitVarJS");
			function VFCreditCardListAppletAustraliaPR(pm) {
                SiebelAppFacade.VFCreditCardListAppletAustraliaPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VFCreditCardListAppletAustraliaPR, SiebelAppFacade.JQGridRenderer);
            VFCreditCardListAppletAustraliaPR.prototype.Init = function() {
                SiebelAppFacade.VFCreditCardListAppletAustraliaPR.superclass.Init.apply(this, arguments)
            };
            VFCreditCardListAppletAustraliaPR.prototype.ShowUI = function() {
                SiebelAppFacade.VFCreditCardListAppletAustraliaPR.superclass.ShowUI.apply(this, arguments);
                var pm = this.GetPM();
                var Mode = SiebelApp.S_App.GetActiveView().GetApplet(pm.Get("GetName")).GetMode();
                var CCAppId = pm.Get("GetFullId");
                var controls = pm.Get("GetControls");
                var BillBc = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Billing Account");
				var Paymethod = "";
				if(BillBc!=null || BillBc!="")
					Paymethod = BillBc.GetFieldValue("Payment Method");
				if(Paymethod == "Prepay"){				
					//BT
					if (Mode == 'New' || Mode == 'Edit') {
						VFBTOUICaptureCreditCard(pm)
					}
                }
				else{
					if (Mode == "New" || Mode == "Edit") {
						VFPPOUICaptureCreditCard(pm)
					}					
				}
				if (Mode == "New") {
					var Register = controls["Register"];
					$("#" + Register.GetInputName() + "_Ctrl").html("Register")
				} else {
					if (Mode == "Edit") {
						var Submit = controls["Submit"];
						$("#" + Submit.GetInputName() + "_Ctrl").html("Submit")
					}
				}
            };
			/* BT functions started*/
			function VFBTOUICaptureCreditCard(e) {
                if ($("#BrainTreeDiv").length) {
                    alert("There is a Paypal Braintree form open");
                    return
                }
				// call fusion to get the clienttoken
				var pm = e;
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
					var strMSISDN = SiebelApp.S_App.GetProfileAttr("PCIPrepayMSISDN");
					strMSISDN = "MSISDN:" + strMSISDN;
					var Inputs = SiebelApp.S_App.NewPropertySet();
					Inputs.SetProperty("ProcessName", "VF PP BT INIT Workflow");
					Inputs.SetProperty("ClientRef", strMSISDN);
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
						$('#s_' + CCAppId + '_div .AppletHIFormBorder div').hide();
						$('#s_' + CCAppId + '_div div.AppletHIFormBorder').append(VFBTFormConstruct());
						hostFields(pm, authTokenBT, tokenBCId, GetCustomerIdValue(), "");
						$("#BrainTreeDiv").show();
					}
				}					
				load_scripts(main);
            }
			
			function GetCustomerIdValue() {
                var app = SiebelApp.S_App.GetActiveView().GetApplet("VF Billing Account Form Applet");
                var pm = app.GetPModel();
                var Data = pm.Get("GetRecordSet");
                return Data[0]["Master Account Id"]
            }
			/* BT functions ended*/
			
            function VFPPOUICaptureCreditCard(e) {
                if ($("#VFPPOUIPayCorpIFrame").length) {
                    alert("There is a Pay Corp form open");
                    return
                }
                var pm = e;
                var BusComp = pm.Get("GetBusComp");
                var BillRowId = BusComp.GetIdValue();
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var strMSISDN = SiebelApp.S_App.GetProfileAttr("PCIPrepayMSISDN");
                strMSISDN = "MSISDN:" + strMSISDN;
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VF PCI INIT Workflow");
                Inputs.SetProperty("ClientRef", strMSISDN);
                Inputs.SetProperty("CompName", GetCompName());
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
                        $("#s_" + CCAppId + "_div .AppletHIFormBorder div").hide();
                        $("#s_" + CCAppId + "_div div.AppletHIFormBorder").append("<div class='VFPPOUIPayCorpIFramePar'><div id='VFPPOUIPayCorpIFrame' style='height:430px;'><iframe id='VFPPOUIPayCorpIFrameID' src='" + PayCorpURL + "' class='VFPayCorpiFrameheight'></iframe></div><div class='VFPPOUIPayCorpSubmit appletButton'>Submit</div><div class='VFPPOUIPayCorpCancle appletButton'>Cancel</div></div>")
                    }
                } catch (e) {
                    alert(e.message)
                } finally {}
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
            VFCreditCardListAppletAustraliaPR.prototype.BindData = function(bRefresh) {
                SiebelAppFacade.VFCreditCardListAppletAustraliaPR.superclass.BindData.apply(this, arguments)
            };
            VFCreditCardListAppletAustraliaPR.prototype.BindEvents = function() {
                SiebelAppFacade.VFCreditCardListAppletAustraliaPR.superclass.BindEvents.apply(this, arguments);
                var pm = this.GetPM();
                $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUIPayCorpSubmit", "click", {
                    ctx: this
                }, VFPPOUIPayCorpSubmit);
                $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUIPayCorpCancle", "click", {
                    ctx: this
                }, VFPPOUIPayCorpCancle)
            };

            function VFPPOUIPayCorpSubmit(e) {
                var paymentFrame = document.getElementById("VFPPOUIPayCorpIFrameID").contentWindow;
                paymentFrame.postMessage(JSON.stringify({
                    type: "SUBMIT"
                }), "*")
            }

            function VFPPOUIPayCorpCancle(e) {
                var pm = e.data.ctx.GetPM();
                var CCAppId = pm.Get("GetFullId");
                $("#s_" + CCAppId + "_div .AppletHIFormBorder div").show();
                $(".VFPPOUIPayCorpIFramePar").remove()
            }
            VFCreditCardListAppletAustraliaPR.prototype.EndLife = function() {
                SiebelAppFacade.VFCreditCardListAppletAustraliaPR.superclass.EndLife.apply(this, arguments)
            };
            return VFCreditCardListAppletAustraliaPR
        }());
        return "SiebelAppFacade.VFCreditCardListAppletAustraliaPR"
    })
};