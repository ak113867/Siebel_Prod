if (typeof(SiebelAppFacade.VFCreditCardRefundFormAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFCreditCardRefundFormAppletPR");
    define("siebel/custom/VFCreditCardRefundFormAppletPR", ["siebel/phyrenderer"], function () {
        SiebelAppFacade.VFCreditCardRefundFormAppletPR = (function () {
            function VFCreditCardRefundFormAppletPR(pm) {
                SiebelAppFacade.VFCreditCardRefundFormAppletPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VFCreditCardRefundFormAppletPR, SiebelAppFacade.PhysicalRenderer);
            VFCreditCardRefundFormAppletPR.prototype.Init = function () {
                SiebelAppFacade.VFCreditCardRefundFormAppletPR.superclass.Init.apply(this, arguments)
            };
			//Balaji M - Inactivated for Miami phase 3 - 18/04/2022
            VFCreditCardRefundFormAppletPR.prototype.ShowUI = function () {
                SiebelAppFacade.VFCreditCardRefundFormAppletPR.superclass.ShowUI.apply(this, arguments);
                var pm = this.GetPM();
                var controls = pm.Get("GetControls");
                /*var CaptureCreditCheckBtn = controls["VFCaptureCreditCard"];
                var ConfirmCreditCheckBtn = controls["VFConfirmCreditCard"];
                $("#" + ConfirmCreditCheckBtn.GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                $("#" + CaptureCreditCheckBtn.GetInputName() + "_Ctrl").after("<button class='VFPPOUICaptureCreditCard appletButton'>Capture Credit Card</button>").addClass("VFDisplayNone")*/
            };
            VFCreditCardRefundFormAppletPR.prototype.BindEvents = function () {
                SiebelAppFacade.VFCreditCardRefundFormAppletPR.superclass.BindEvents.apply(this, arguments);
                var pm = this.GetPM();
                /*$("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUICaptureCreditCard", "click", {
                    ctx: this
                }, VFPPOUICaptureCreditCard);
                $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUIPayCorpSubmit", "click", {
                    ctx: this
                }, VFPPOUIPayCorpSubmit);
                $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUIPayCorpCancle", "click", {
                    ctx: this
                }, VFPPOUIPayCorpCancle)*/
            };
			//Balaji M - Inactivated for Miami phase 3 - 18/04/2022
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
                $(".VFPPOUIPayCorpIFramePar").remove()
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
                var SRID;
                SRID = "SRID:" + BillRowId;
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VF PCI INIT Workflow");
                Inputs.SetProperty("CompName", GetCompName());
                Inputs.SetProperty("ClientRef", SRID);
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
                        $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").hide();
                        $("#s_" + CCAppId + "_div div.AppletHIFormBorder").append("<div class='VFPPOUIPayCorpIFramePar'><div id='VFPPOUIPayCorpIFrame' style='height:430px;'><iframe id='VFPPOUIPayCorpIFrameID' src='" + PayCorpURL + "' class='VFPayCorpiFrameheight'></iframe></div><div class='VFPPOUIPayCorpSubmit appletButton'>Submit</div><div class='VFPPOUIPayCorpCancle appletButton'>Cancel</div></div>")
                    }
                } catch (e) {
                    alert(e.message)
                }
                finally {}
            }*/
            VFCreditCardRefundFormAppletPR.prototype.EndLife = function () {
                SiebelAppFacade.VFCreditCardRefundFormAppletPR.superclass.EndLife.apply(this, arguments)
            };
            return VFCreditCardRefundFormAppletPR
        }
            ());
        return "SiebelAppFacade.VFCreditCardRefundFormAppletPR"
    })
};
