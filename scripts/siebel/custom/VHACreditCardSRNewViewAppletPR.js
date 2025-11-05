if (typeof (SiebelAppFacade.VHACreditCardSRNewViewAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHACreditCardSRNewViewAppletPR");
    define("siebel/custom/VHACreditCardSRNewViewAppletPR", ["siebel/phyrenderer"], function() {
        SiebelAppFacade.VHACreditCardSRNewViewAppletPR = (function() {
            function VHACreditCardSRNewViewAppletPR(pm) {
                SiebelAppFacade.VHACreditCardSRNewViewAppletPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VHACreditCardSRNewViewAppletPR, SiebelAppFacade.PhysicalRenderer);
            VHACreditCardSRNewViewAppletPR.prototype.Init = function() {
                SiebelAppFacade.VHACreditCardSRNewViewAppletPR.superclass.Init.apply(this, arguments)
            }
            ;
            VHACreditCardSRNewViewAppletPR.prototype.ShowUI = function() {
                SiebelAppFacade.VHACreditCardSRNewViewAppletPR.superclass.ShowUI.apply(this, arguments);
                var pm = this.GetPM();
				var sCred=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("Service Request").GetFieldValue("Credit Card Number - Display");
				var sDeb=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("Service Request").GetFieldValue("Bank Branch");
				var aID = pm.Get("GetFullId");
				var sCCFlag = SiebelApp.S_App.GetProfileAttr('SRNewViewCC'); //VHA:Added to display Credit card applet buttons when Group is not null.
				if(sDeb =="" && sCred =="")
				{
					if(sCCFlag == "Y")//VHA:Added to display Credit card applet buttons when Group is not null.
					{
						$("#"+aID).removeClass("VFDisplayNone");
						toggleIAddfield("Onload",pm);
					}
					else
					{	
						$("#"+aID).addClass("VFDisplayNone");
						toggleIAddfield("Onload",pm);
					}
				}
				else if (sCred !="")
				{toggleIAddfield("Credit",pm);}
			    else if (sDeb !="")
				{toggleIAddfield("Debit",pm);}
				
                var controls = pm.Get("GetControls");
                var CaptureCreditCheckBtn = controls["VFCaptureCreditCard"];
				 var CaptureDebitCheckBtn = controls["VF Capture Debit"];
                //var ConfirmCreditCheckBtn = controls["VFConfirmCreditCard"];
                //$("#" + ConfirmCreditCheckBtn.GetInputName() + "_Ctrl").addClass("VFDisplayNone");
				$("#" + CaptureDebitCheckBtn.GetInputName() + "_Ctrl").after("<button class='VFPPOUICaptureDebitCard vha-applet-button vha-applet-button-passive'>Retrieve Existing Direct Debit Card</button>").addClass("VFDisplayNone")//VHA: Added 'vha-applet-button vha-applet-button-passive' new class to modify look and feel of buttons
                $("#" + CaptureCreditCheckBtn.GetInputName() + "_Ctrl").after("<button class='VFPPOUICaptureCreditCard vha-applet-button vha-applet-button-passive'>Capture Card Details</button>").addClass("VFDisplayNone")
				//VHA: Added 'vha-applet-button vha-applet-button-passive' new class to modify look and feel of buttons
				/*if (SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Service Request New UI Applet"].GetPModel().Get("GetRecordSet")[0]["VF Credit Card Toggle Calc"]=="N")
					{
					var aID = pm.Get("GetFullId");
					$("#"+aID).addClass("VFDisplayNone");
					}
				else{};*/
				//toggleIAddfield("Onload",pm);
				if (sCred !="")
				{$('.VFPPOUICaptureCreditCard').removeClass("vha-applet-button-passive").addClass("vha-applet-button-active");}//VHA: To make button look active
			    else if (sDeb !="")
				{$('.VFPPOUICaptureDebitCard').removeClass("vha-applet-button-passive").addClass("vha-applet-button-active");}//VHA: To make button look active
            }
            ;
            VHACreditCardSRNewViewAppletPR.prototype.BindEvents = function() {
                SiebelAppFacade.VHACreditCardSRNewViewAppletPR.superclass.BindEvents.apply(this, arguments);
                var pm = this.GetPM();
				if (SiebelApp.S_App.GetActiveView().GetName()=="VHA Service Request New UI View")
						{
				$("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUICaptureCreditCard", "click", {
                    ctx: this
                }, VFPPOUICaptureCreditCard);
                $("#" + pm.Get("GetFullId")).delegate(".VFPPOUIPayCorpSubmit", "click", {
                    ctx: this
                }, VFPPOUIPayCorpSubmit);
                $("#" + pm.Get("GetFullId")).delegate(".VFPPOUIPayCorpCancle", "click", {
                    ctx: this
                }, VFPPOUIPayCorpCancle)
						}
				else{
                $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUICaptureCreditCard", "click", {
                    ctx: this
                }, VFPPOUICaptureCreditCard);
                $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUIPayCorpSubmit", "click", {
                    ctx: this
                }, VFPPOUIPayCorpSubmit);
                $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFPPOUIPayCorpCancle", "click", {
                    ctx: this
                }, VFPPOUIPayCorpCancle)
				}
				
				
				$(".VFPPOUICaptureDebitCard").click(function(){
					$('.VFPPOUICaptureDebitCard').removeClass("vha-applet-button-passive").addClass("vha-applet-button-active");//VHA: To make button look active
					$('.VFPPOUICaptureCreditCard').removeClass("vha-applet-button-active").addClass("vha-applet-button-passive");//VHA: To make button look passive
					SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("Service Request").WriteRecord();
	var SRpm = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Service Request New UI Applet"].GetPModel();
    var SRId = SRpm.Get("GetRecordSet")[0].Id;
    var BAN = SRpm.Get("GetRecordSet")[0]["Billing Account #"];
    var MSISDN = SRpm.Get("GetRecordSet")[0]["Asset Number"];
	RetreiveDebitCard(SRId,BAN,MSISDN,pm);
})
 
            }
            ;
			
			function RetreiveDebitCard(SRId,BAN,MSISDN,pm)
        {
		   var service = SiebelApp.S_App.GetService("Workflow Process Manager");
		   var inPS = SiebelApp.S_App.NewPropertySet();
           var opPS = SiebelApp.S_App.NewPropertySet();
		   inPS.SetProperty("ProcessName","VHA SR New View Debit Card Retrieval");
		   inPS.SetProperty("SRId",SRId);
		   inPS.SetProperty("BAN",BAN);
		   inPS.SetProperty("MSISDN",MSISDN);
		   opPS = service.InvokeMethod("RunProcess",inPS);
		   toggleIAddfield("Debit",pm)
		   console.log(opPS);
		}
			
            function VFPPOUIPayCorpSubmit(e) {
                var paymentFrame = document.getElementById("VFPPOUIPayCorpIFrameID").contentWindow;
                paymentFrame.postMessage(JSON.stringify({
                    type: "SUBMIT"
                }), "*")
				var pm = e.data.ctx.GetPM();
				toggleIAddfield("Credit",pm)
            }
            function VFPPOUIPayCorpCancle(e) {
                var pm = e.data.ctx.GetPM();
                var CCAppId = pm.Get("GetFullId");
				if (SiebelApp.S_App.GetActiveView().GetName()=="VHA Service Request New UI View")
						{
						$("#s_" + CCAppId + "_div").show();
						$(".VFPPOUIPayCorpIFramePar").remove();
						}
						else{
                $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").show();
                $(".VFPPOUIPayCorpIFramePar").remove();
						}
            }
			 function toggleIAddfield(value,pm1)
				{
				    var controls = pm1.Get("GetControls");
									
					switch(value)
				    {
					case "Onload":					
					//var controls = pm1.Get("GetControls");
					["Account Name","BSB","Bank Account Number","Bank Name","Credit Card Name","Credit Card Number","Credit Card Type","Expiration Month","Expiration Year"].forEach(function(item,index) {
					var sCtl = controls[ item];
						$ ("[name ='"+sCtl.GetInputName() +"']").closest('div').parent().addClass('VFDisplayNone');
					});					
					break;
					case "Credit":					
					//var controls = pm1.Get("GetControls");
					["Credit Card Name","Credit Card Number","Credit Card Type","Expiration Month","Expiration Year"].forEach(function(item,index) {
					var sCtl = controls[ item];
					$ ("[name ='"+sCtl.GetInputName() +"']").closest('div').parent().removeClass('VFDisplayNone');
					});	
                    ["Account Name","BSB","Bank Account Number","Bank Name"].forEach(function(item,index) {
					var sCtl = controls[ item];
					$ ("[name ='"+sCtl.GetInputName() +"']").closest('div').parent().addClass('VFDisplayNone');
					});				
					break;
					
					case "Debit":					
					//var controls = pm1.Get("GetControls");
					["Credit Card Name","Credit Card Number","Credit Card Type","Expiration Month","Expiration Year"].forEach(function(item,index) {
					var sCtl = controls[ item];
					$ ("[name ='"+sCtl.GetInputName() +"']").closest('div').parent().addClass('VFDisplayNone');
					});	
                    ["Account Name","BSB","Bank Account Number","Bank Name"].forEach(function(item,index) {
					var sCtl = controls[ item];
					$ ("[name ='"+sCtl.GetInputName() +"']").closest('div').parent().removeClass('VFDisplayNone');
					});					
					break;
					
					default:
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
                case ("VHA Service Request New UI View"):
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
				$('.VFPPOUICaptureCreditCard').removeClass("vha-applet-button-passive").addClass("vha-applet-button-active");//VHA: To make button look active
				$('.VFPPOUICaptureDebitCard').removeClass("vha-applet-button-active").addClass("vha-applet-button-passive");//VHA: To make button look passive
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
						if (SiebelApp.S_App.GetActiveView().GetName()=="VHA Service Request New UI View")
						{
						$("#s_" + CCAppId + "_div").hide();
                        $("#" + CCAppId).prepend("<div class='VFPPOUIPayCorpIFramePar'><div id='VFPPOUIPayCorpIFrame' style='height:430px;'><iframe id='VFPPOUIPayCorpIFrameID' src='" + PayCorpURL + "' class='VFPayCorpiFrameheight'></iframe></div><div class='VFPPOUIPayCorpSubmit appletButton'>Submit</div><div class='VFPPOUIPayCorpCancle appletButton'>Cancel</div></div>")
						}
						else{
                        $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").hide();
                        $("#s_" + CCAppId + "_div div.AppletHIFormBorder").append("<div class='VFPPOUIPayCorpIFramePar'><div id='VFPPOUIPayCorpIFrame' style='height:430px;'><iframe id='VFPPOUIPayCorpIFrameID' src='" + PayCorpURL + "' class='VFPayCorpiFrameheight'></iframe></div><div class='VFPPOUIPayCorpSubmit appletButton'>Submit</div><div class='VFPPOUIPayCorpCancle appletButton'>Cancel</div></div>")
						}
                    }
                } catch (e) {
                    alert(e.message)
                } finally {}
            }
            VHACreditCardSRNewViewAppletPR.prototype.EndLife = function() {
                SiebelAppFacade.VHACreditCardSRNewViewAppletPR.superclass.EndLife.apply(this, arguments)
            }
            ;
            return VHACreditCardSRNewViewAppletPR
        }());
        return "SiebelAppFacade.VHACreditCardSRNewViewAppletPR"
    })
}
;