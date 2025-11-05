if (typeof (SiebelAppFacade.VFSIMSwapFormAppletTBUIPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFSIMSwapFormAppletTBUIPR");
    define("siebel/custom/VFSIMSwapFormAppletTBUIPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VFSIMSwapFormAppletTBUIPR = (function() {
            var sessionid = "";
            function VFSIMSwapFormAppletTBUIPR(pm) {
                SiebelAppFacade.VFSIMSwapFormAppletTBUIPR.superclass.constructor.call(this, pm)
            }
            SiebelJS.Extend(VFSIMSwapFormAppletTBUIPR, SiebelAppFacade.PhysicalRenderer);
            VFSIMSwapFormAppletTBUIPR.prototype.ShowUI = function() {
                SiebelAppFacade.VFSIMSwapFormAppletTBUIPR.superclass.ShowUI.call(this);
                var sView = SiebelApp.S_App.GetActiveView().GetName();
                var sURL;
                var pm = this.GetPM();
                var fullid = pm.Get("GetFullId");
                var view = SiebelApp.S_App.GetActiveView();
                var aview = SiebelApp.S_App.GetActiveView().GetName();
                var applet = view.GetAppletMap();
                if (aview == "VF SIM Swap View - TBUI") {
                    var swapapp = applet["VF SIM Swap Form Applet - TBUI"];
                    var playbr = applet["VF Task Paybar Applet - Top - SS"];
					var qrApplet = applet["VHA QRCodes SIM Swap Applet"];
					var egQRApplet = applet["VHA ESIM QRCodes SIM Swap Applet"];
					var eqConApplet = applet["VHA EGW SIM Swap QR Contacts List Applet"];
					var qrAppId = qrApplet.GetFullId();
					var eqQRAppId = egQRApplet.GetFullId();
					var conAppId = eqConApplet.GetFullId();
                    var plybarctrl = playbr.GetControls();
                    var pausectrl = plybarctrl["ButtonPause"].GetInputName();
                    var prevctrl = plybarctrl["ButtonPrevious"].GetInputName();
					var planType = SiebelApp.S_App.GetProfileAttr("Source Prop Plan Categ");
					console.log("PlanType:", planType);
				   
                   if (planType === "EGW Mobility") {
					   $("#s_" + qrAppId + "_div").hide();
					   $("#s_" + eqQRAppId + "_div").show();
					   $("#s_" + conAppId + "_div").show();

                   } else {
					   $("#s_" + qrAppId + "_div").show();
					   $("#s_" + eqQRAppId + "_div").hide();
					   $("#s_" + conAppId + "_div").hide();
                   }
                } else {
                    if (aview == "VF SIM SWAP View - Upgrade TBUI") {
                        var swapapp = applet["VF SIM Swap Form Applet - Upgrade TBUI"]
                    }
                }
                var controls = swapapp.GetControls();
                var reasoncodectrl = controls["SIMSwapReasonCode"];
                var SIMTypeCtrl = controls["SIM Type"];
                var NewSIMNumber = controls["NewSIMNumber"];
                var sRsnCode = this.GetPM().ExecuteMethod("GetFieldValue", reasoncodectrl);
                var sSIMType = this.GetPM().ExecuteMethod("GetFieldValue", SIMTypeCtrl);
                var SIMTypeCtrlinputname = SIMTypeCtrl.GetInputName();
                var reasoncdeinputname = reasoncodectrl.GetInputName();
                var NewSIMNumbername = NewSIMNumber.GetInputName();
                var a = $("input[name='" + reasoncdeinputname + "']");
                var b = new Array();
                for (var i = 0; i < a.length; i++) {
                    b[i] = $(a[i]).val();
                    $(a[i]).hide();
                    $(a[i]).next().hide();
                    $(a[i]).next().after('<input type="text" Id="VHAReasoncode' + i + '" name="' + b[i] + '" value="' + b[i] + '" class="VHASIMSWAPCheckbox VHAReasoncode" style="width:132px;" readonly="readonly">')
                }
                var c = $("input[name='" + SIMTypeCtrlinputname + "']");
                var d = new Array();
                for (var i = 0; i < c.length; i++) {
                    d[i] = $(c[i]).val();
                    $(c[i]).hide();
                    $(c[i]).next().hide();
                    $(c[i]).next().after('<input type="text" Id="VHASIMType' + i + '" name="' + d[i] + '" value="' + d[i] + '" class="VHASIMSWAPCheckbox VHASIMType" style="width:132px;" readonly="readonly">')
                }
                $("input[name=" + reasoncdeinputname + "],input[name=" + SIMTypeCtrlinputname + "]").parent().children("br").remove();
                $("input[name='" + sSIMType + "'][value='" + sSIMType + "']").addClass("VHASIMSWAPSelectedCheckbox");
                $("input[name='" + sRsnCode + "'][value='" + sRsnCode + "']").addClass("VHASIMSWAPSelectedCheckbox");
                setTimeout(function() {
                    $("#VHAReasoncode2").after("<br>");
                    if (aview == "VF SIM Swap View - TBUI") {
                        $("#" + pausectrl + "_Ctrl").hide();
                        $("#" + prevctrl + "_Ctrl").hide()
                    }
                }, 200);
                this.GetPM().AttachPMBinding("FieldChange", this.SetControlValue, {
                    scope: this
                })
            }
            ;
            VFSIMSwapFormAppletTBUIPR.prototype.BindEvents = function() {
                SiebelAppFacade.VFSIMSwapFormAppletTBUIPR.superclass.BindEvents.apply(this, arguments);
                var view = SiebelApp.S_App.GetActiveView();
                var aview = SiebelApp.S_App.GetActiveView().GetName();
                var pm = this.GetPM();
                var applet = view.GetAppletMap();
                if (aview == "VF SIM Swap View - TBUI") {
                    var swapapp = applet["VF SIM Swap Form Applet - TBUI"]
                } else {
                    if (aview == "VF SIM SWAP View - Upgrade TBUI") {
                        var swapapp = applet["VF SIM Swap Form Applet - Upgrade TBUI"]
                    }
                }
                var controls = swapapp.GetControls();
                var reasoncodectrl = controls["SIMSwapReasonCode"];
                var SIMTypeCtrl = controls["SIM Type"];
                var NewSIMNumberCtrl = controls["NewSIMNumber"];
                var reasoncdeinputname = reasoncodectrl.GetInputName();
                var SIMTypeCtrlinputname = SIMTypeCtrl.GetInputName();
                $(".VHAReasoncode").on("click", function(e) {
                    $(".VHAReasoncode").removeClass("VHASIMSWAPSelectedCheckbox");
                    $(this).addClass("VHASIMSWAPSelectedCheckbox");
                    var val = $(this).val();
                    pm.ExecuteMethod("SetFormattedValue", reasoncodectrl, val)
                });
                $(".VHASIMType").on("click", function(e) {
                    var Isreadonly = $("input[name=" + SIMTypeCtrlinputname + "]").attr("aria-readonly");
                    if (Isreadonly == "true") {} else {
                        $(".VHASIMType").removeClass("VHASIMSWAPSelectedCheckbox");
                        $(this).addClass("VHASIMSWAPSelectedCheckbox");
                        var val = $(this).val();
                        pm.ExecuteMethod("SetFormattedValue", SIMTypeCtrl, val)
                    }
                })
            }
            ;
            return VFSIMSwapFormAppletTBUIPR
        }());
        return "SiebelAppFacade.VFSIMSwapFormAppletTBUIPR"
    })
}
;