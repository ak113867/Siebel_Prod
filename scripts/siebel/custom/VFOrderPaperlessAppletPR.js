if (typeof (SiebelAppFacade.VFOrderPaperlessAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFOrderPaperlessAppletPR");
    define("siebel/custom/VFOrderPaperlessAppletPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VFOrderPaperlessAppletPR = (function() {
            function VFOrderPaperlessAppletPR(pm) {
                SiebelAppFacade.VFOrderPaperlessAppletPR.superclass.constructor.call(this, pm)
            }
            SiebelJS.Extend(VFOrderPaperlessAppletPR, SiebelAppFacade.PhysicalRenderer);
            VFOrderPaperlessAppletPR.prototype.ShowUI = function() {
                SiebelAppFacade.VFOrderPaperlessAppletPR.superclass.ShowUI.call(this);
                var pm = this.GetPM();
                var aview = SiebelApp.S_App.GetActiveView().GetName();
                var busObj = SiebelApp.S_App.GetActiveBusObj();
                var OrderBC = busObj.GetBusCompByName("Order Entry - Orders");
                var Ordersubtype = OrderBC.GetFieldValue("Order Sub Type");
                var controls = pm.Get("GetControls");
                var Ordersubtypename = controls["Order Sub Type"].GetInputName();
                var OptInSMSField = controls["VHA Opt In SMS"].GetInputName();
				if(aview == "VF New Connect MSO Order Summary View TBUI")
			    {
					$("input[name=" + OptInSMSField + "]").parent().parent().hide();
					$("input[name=" + OptInSMSField + "]").parent().parent().parent('tr').hide()
					$("input[name=" + Ordersubtypename + "]").parent().parent().hide();
					$("input[name=" + Ordersubtypename + "]").parent().parent().parent('tr').hide();
				}
                setTimeout(function() {
                    $("#Order_Sub_Type_Label,input[name=" + Ordersubtypename + "]").parent().parent().hide()
                }, 50);
                if (aview != "VHA Manage Services Order Summary View" && aview != "VF Order Summary View - TBUI") {
                    HideFields()
                } else {
                    if (Ordersubtype != "Modify" && Ordersubtype != "Change Proposition") {
                        HideFields()
                    }
                }
                function HideFields() {
                    setTimeout(function() {
                        $("input[name=" + OptInSMSField + "],input[name=" + Ordersubtypename + "],#VHA_Opt_In_SMS_Label,#VHA_Opt_In_SMS_Label_Label,#Order_Sub_Type_Label").parent().parent().hide()
                    }, 50)
                }
            }
            ;

            return VFOrderPaperlessAppletPR
        }());
        return "SiebelAppFacade.VFOrderPaperlessAppletPR"
    })
}
;