if (typeof(SiebelAppFacade.VHAPrepaymentCreditCardDetailsAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAPrepaymentCreditCardDetailsAppletPR");
    define("siebel/custom/VHAPrepaymentCreditCardDetailsAppletPR", ["siebel/jqgridrenderer", "siebel/custom/VHABTProcessCall"], function () {
        SiebelAppFacade.VHAPrepaymentCreditCardDetailsAppletPR = (function () {
            var tokenBCId = "";
			function VHAPrepaymentCreditCardDetailsAppletPR(pm) {
                SiebelAppFacade.VHAPrepaymentCreditCardDetailsAppletPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VHAPrepaymentCreditCardDetailsAppletPR, SiebelAppFacade.JQGridRenderer);
            VHAPrepaymentCreditCardDetailsAppletPR.prototype.Init = function () {
                SiebelAppFacade.VHAPrepaymentCreditCardDetailsAppletPR.superclass.Init.apply(this, arguments)
            };
            VHAPrepaymentCreditCardDetailsAppletPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHAPrepaymentCreditCardDetailsAppletPR.superclass.ShowUI.apply(this, arguments);
                var pm = this.GetPM();
                var Mode = SiebelApp.S_App.GetActiveView().GetApplet(pm.Get("GetName")).GetMode();
                var CCAppId = pm.Get("GetFullId");
                var controls = pm.Get("GetControls");
                var Refresh = controls["Refresh"];
                var Register = controls["Add Credit Card"];
                $("#" + Refresh.GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                $("#" + Register.GetInputName() + "_Ctrl").after("<div class='VFPPOUICaptureCreditCard appletButton'>Capture Credit Card</div>").addClass("VFDisplayNone")
            };
            VHAPrepaymentCreditCardDetailsAppletPR.prototype.BindData = function (bRefresh) {
                SiebelAppFacade.VHAPrepaymentCreditCardDetailsAppletPR.superclass.BindData.apply(this, arguments)
            };
            VHAPrepaymentCreditCardDetailsAppletPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHAPrepaymentCreditCardDetailsAppletPR.superclass.BindEvents.apply(this, arguments);
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
                $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").show();
                $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-header").show();
                $(".VFPPOUIPayCorpIFramePar").remove()
            }*/
/*Start: Florida: SBABU*/
			function VFBTOUICaptureCreditCard(e) {
var sBAN = SiebelApp.S_App.GetProfileAttr("PrepaymentsBACId");
var Inputs = SiebelApp.S_App.NewPropertySet();
var Output = SiebelApp.S_App.NewPropertySet();
var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
Inputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service");										
Inputs.SetProperty("BAN", sBAN);
Inputs.SetProperty("Method Name", "PrepayActiveRecValidation");
var ROups = ser.InvokeMethod("Run Process", Inputs);										
var sErrMsg = ROups.childArray[0].propArray.ErrorMessage; 	
if (sErrMsg!="")
{											
	console.log(sErrMsg);
	alert("When Payment URL is Active, credit card detail cannot be selected.");							
}
/*End: Florida: SBABU*/
                if ($("#BrainTreeDiv").length) {
                    alert("There is a Paypal Braintree form open");
                    return
                }                
                var main = function(){
					var authTokenBT="";
					var pm = e.data.ctx.GetPM();
					var ActiveApplet = pm.Get("GetName");
					var CreditCardApplet = SiebelApp.S_App.GetActiveView().GetApplet(ActiveApplet);
					var CCApm = CreditCardApplet.GetPModel();
					var CCAppId = CCApm.Get("GetFullId");
					var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
					var Inputs = SiebelApp.S_App.NewPropertySet();
					var BAN = SiebelApp.S_App.GetProfileAttr("PrepaymentsBACId");
					BAN = "BAN:" + BAN;					
					Inputs.SetProperty("ProcessName", "VF PP BT INIT Workflow");
					Inputs.SetProperty("CompName", "VHAAuthorizeAndSettleOpenUI");
					Inputs.SetProperty("ClientRef", BAN);
					Inputs.SetProperty("Identifier", BAN);
					console.log("ROw Id :" + BAN);
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
						$("#s_" + CCAppId + "_div div.siebui-collapsible-applet-header").hide();
						$("#s_" + CCAppId + "_div div.AppletHIListBorder.siebui-collapsible-applet-content").hide();
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
				 case "VHA APP Prepayment Processing View":
				 case "VHA APP Prepayment 2 Way SMS Processing View":
					var app = SiebelApp.S_App.GetActiveView().GetApplet("VHA Task Session Form Applet - Manage APP");
					var pm = app.GetPModel();
					var Data = pm.Get("GetRecordSet");
					return Data[0]["Customer Row Id"];
				 break;
				 case "VHA Prepayment Processing View":
				 case "VHA Prepayment 2 Way SMS Processing View":
					var app = SiebelApp.S_App.GetActiveView().GetApplet("VF Task Session Form Applet – TBUI");
					var pm = app.GetPModel();
					var Data = pm.Get("GetRecordSet");
					return Data[0]["Customer Row Id"];
				 break;
				 case "VHA Prepayment 2 Way SMS Native Processing View":
					var app = SiebelApp.S_App.GetActiveView().GetApplet("VF Order Entry - Order Form Applet Dashboard");
					var pm = app.GetPModel();
					var Data = pm.Get("GetRecordSet");
					return Data[0]["Account Id"];
				 break;
				 case "VF R&C Order Fulfillment View":
					var app = SiebelApp.S_App.GetActiveView().GetApplet("VF R&C Order Fulfillment Form Applet");
					var pm = app.GetPModel();
					var Data = pm.Get("GetRecordSet");
					return Data[0]["Account Id"];
				 break;				 
				 default:					
				 break;	
				 }				
            }
			
            function VFPPOUICaptureCreditCard(e) {
                if ($("#VFPPOUIPayCorpIFrame").length) {
                    alert("There is a Pay Corp form open");
                    return
                }
                var pm = e.data.ctx.GetPM();
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VF PCI INIT Workflow");
                var BAN = SiebelApp.S_App.GetProfileAttr("PrepaymentsBACId");
                BAN = "BAN:" + BAN;
                Inputs.SetProperty("CompName", "VHAAuthorizeAndSettleOpenUI");
                Inputs.SetProperty("ClientRef", BAN);
                Inputs.SetProperty("Identifier", BAN);
                console.log("ROw Id :" + BAN);
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
                        $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-header").hide();
                        $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").hide();
                        $("#s_" + CCAppId + "_div").append("<div class='VFPPOUIPayCorpIFramePar'><div id='VFPPOUIPayCorpIFrame' style='height:430px;'><iframe id='VFPPOUIPayCorpIFrameID' src='" + PayCorpURL + "' class='VFPayCorpiFrameheight'></iframe></div><div class='VFPPOUIPayCorpSubmit appletButton'>Submit</div><div class='VFPPOUIPayCorpCancle appletButton'>Cancel</div></div>");
                        $("#s_" + CCAppId + "_div div#VFPPOUIPayCorpIFrame iframe").attr("style", "position:static !important;")
                    }
                } catch (e) {
                    alert(e.message)
                }
                finally {}
            }
            VHAPrepaymentCreditCardDetailsAppletPR.prototype.EndLife = function () {
                SiebelAppFacade.VHAPrepaymentCreditCardDetailsAppletPR.superclass.EndLife.apply(this, arguments)
            };
            return VHAPrepaymentCreditCardDetailsAppletPR
        }
            ());
        return "SiebelAppFacade.VHAPrepaymentCreditCardDetailsAppletPR"
    })
};
