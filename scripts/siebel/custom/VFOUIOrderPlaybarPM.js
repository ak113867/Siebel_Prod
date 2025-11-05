if (typeof SiebelAppFacade.VFOUIOrderPlaybarPM === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFOUIOrderPlaybarPM");
    define("siebel/custom/VFOUIOrderPlaybarPM", [], function () {
        SiebelAppFacade.VFOUIOrderPlaybarPM = (function () {
            function VFOUIOrderPlaybarPM(proxy) {
                SiebelAppFacade.VFOUIOrderPlaybarPM.superclass.constructor.call(this, proxy);
            }
            SiebelJS.Extend(VFOUIOrderPlaybarPM, SiebelAppFacade.PresentationModel);
            VFOUIOrderPlaybarPM.prototype.Init = function () {
                SiebelAppFacade.VFOUIOrderPlaybarPM.superclass.Init.call(this);
                this.AddMethod("InvokeMethod", PreInvokeMethod, { sequence: true, scope: this });
                this.AddMethod("PostExecute", PostInvokeMethod, { sequence: true, scope: this });
            };
            function PostInvokeMethod(MethodName, returnStructure) {
                switch (MethodName) {
                    case "NavigateNext":
                        try {
                            var sView = SiebelApp.S_App.GetActiveView().GetName();
                            if (sView == "VF Connection Wizard View – Shopping Cart – TBUI" || sView == "VF Customise Services View –  TBUI") {
                                var AppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap();
                                var AppletList = ["VF Out of Stock Summary Form Applet - Upgrade TBUI", "VF Out of Stock Summary Form Applet - TBUI"];
                                var AppletName = "";
                                for (var i = 0; i < AppletList.length; i++) {
                                    if (AppletMap[AppletList[i]]) {
                                        AppletName = AppletList[i];
                                        break;
                                    }
                                }
                                var ShipingApplet = SiebelApp.S_App.GetActiveView().GetApplet(AppletName);
                                var ManualDeliveryCtrl = $("input[name='" + ShipingApplet.GetControl("Manual Delivery Address").GetInputName() + "']");
                                var IntelligentSearchAddressCtrl = $("input[name='" + ShipingApplet.GetControl("VF Intelligence Search Address").GetInputName() + "']");
                                if (VFTaskSessionVariable.GetValue(AppletName + "_ManualAddressChecked") == "Y") {
                                    setTimeout(function () {
                                        $("input[name='" + ShipingApplet.GetControl("Manual Address Entry").GetInputName() + "']").prop("checked", true);
                                        ManualDeliveryCtrl.attr("readonly", "readonly").closest("tr").show();
                                        IntelligentSearchAddressCtrl.val("").attr("readonly", "readonly");
                                    }, 500);
                                } else {
                                    setTimeout(function () {
                                        $("input[name='" + ShipingApplet.GetControl("Manual Address Entry").GetInputName() + "']").prop("checked", false);
                                        ManualDeliveryCtrl.attr("readonly", "readonly").closest("tr").hide();
                                        IntelligentSearchAddressCtrl.removeAttr("readonly");
                                    }, 500);
                                }
                            }
                        } catch (e) {
                            console.log("Error in VFOUIOrderPlaybarPM.js");
                        }
                        break;
                }
            }
            function PreInvokeMethod(MethodName, returnStructure) {
                switch (MethodName) {
                    case "NavigateNext":
                        break;
                    case "PauseTask":
                    case "CancelTask":
                    case "FinishTask":
                    case "SubmitTask":
                        VFTaskSessionVariable.SetValue("VF Out of Stock Summary Form Applet - Upgrade TBUI_ManualAddressChecked", "N");
                        VFTaskSessionVariable.SetValue("VF Out of Stock Summary Form Applet - TBUI_ManualAddressChecked", "N");
                        VFTaskSessionVariable.SetValue("VF Out of Stock Summary Form Applet - Upgrade TBUI_QASSearchContextFlag", "N");
                        VFTaskSessionVariable.SetValue("VF Out of Stock Summary Form Applet - TBUI_QASSearchContextFlag", "N");
                        break;
                    default:
                }
            }
            return VFOUIOrderPlaybarPM;
        })();
        return "SiebelAppFacade.VFOUIOrderPlaybarPM";
    });
}
