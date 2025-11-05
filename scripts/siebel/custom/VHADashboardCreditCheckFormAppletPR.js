if (typeof(SiebelAppFacade.VHADashboardCreditCheckFormAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHADashboardCreditCheckFormAppletPR");
    define("siebel/custom/VHADashboardCreditCheckFormAppletPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHADashboardCreditCheckFormAppletPR = (function() {
            function VHADashboardCreditCheckFormAppletPR(pm) {
                SiebelAppFacade.VHADashboardCreditCheckFormAppletPR.superclass.constructor.call(this, pm);
                SiebelApp.EventManager.cleanListners("VHADashboardCreditCheckIC");
                SiebelApp.EventManager.addListner("VHADashboardCreditCheckIC", VHADashboardCreditCheckIC, this);
            }
            SiebelJS.Extend(VHADashboardCreditCheckFormAppletPR, SiebelAppFacade.PhysicalRenderer);
            VHADashboardCreditCheckFormAppletPR.prototype.ShowUI = function() {
                SiebelAppFacade.VHADashboardCreditCheckFormAppletPR.superclass.ShowUI.call(this);
                VHADashboardCreditCheckIC();
            }

            function VHADashboardCreditCheckIC(e) {
                var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
                if (!ParentIC) {
                    VHADashboardCommon.VHADasboardGetICProp("AssetHeader");
                    ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
                }
                var CreditcheckIC = ParentIC.GetChildByType("ListOfCredit Check");
                var Propset = CreditcheckIC.GetChild(0);
                $("#VHA_AD_CreditUsage").html(Propset.GetProperty("VF Intended Usage"));
                //$("#VHA_AD_CreditEQLmt").html(Propset.GetProperty("Equip Limit"));
				var seql = Propset.GetProperty("Equip Limit");
				$('#VHA_AD_CreditEQLmt').text(parseFloat(seql).toFixed(2));
                $("#VHA_AD_CreditStatus").html(Propset.GetProperty("VF Credit Check Status"));
                $("#VHA_AD_CreditResdnt").html(Propset.GetProperty("Id Type"));
                if (Propset.GetProperty("VF Credit Check Expiry Date") != "" && Propset.GetProperty("VF Credit Check Expiry Date") != null) {
                    var sSince = new Date(Propset.GetProperty("VF Credit Check Expiry Date"));
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    sSince = ("0" + sSince.getDate()).slice(-2) + " " + monthNames[sSince.getMonth()] + " " + sSince.getFullYear();
                    $("#VHA_AD_CreditExpiry").html(sSince);
                }
                $("#VHA_AD_CreditLiveCxn").html(Propset.GetProperty("VF Live Connections"));
                $("#VHA_AD_CreditReqCxn").html(Propset.GetProperty("Requested Connections"));
                $("#VHA_AD_CreditApprCxn").html(Propset.GetProperty("VF Approved Connections"));
            }
            VHADashboardCreditCheckFormAppletPR.prototype.BindEvents = function() {
                SiebelAppFacade.VHADashboardCreditCheckFormAppletPR.superclass.BindEvents.call(this);
                var view = SiebelApp.S_App.GetActiveView();
                var appletMap = view.GetAppletMap();
                var myApplet = appletMap["VHA Generic Dashboard Credit Check Form Applet"];
                var pm = myApplet.GetPModel();
                var CDAppletId = pm.Get("GetFullId");
                $("#VHACreditCheckDiv").on("click", "#VHACreditCheckExpandCollapse", {
                    ctx: this
                }, function(t) {
                    $("#VHACreditCheckCard").addClass("VHADisplayNone");
                    $("#VHACreditCheckExpandCollapse").replaceWith('<img src="images/custom/Group_246.svg" id="VHACreditCheckExpand">');
                });
                $("#VHACreditCheckDiv").on("click", "#VHACreditCheckExpand", {
                    ctx: this
                }, function(t) {
                    $("#VHACreditCheckCard").removeClass("VHADisplayNone");
                    $("#VHACreditCheckExpand").replaceWith('<img src="images/custom/Group_252.svg" id="VHACreditCheckExpandCollapse">');
                });
                $("#VHACreditCheckbuttons").on("click", "#VHAGotoCreditCheckView", {
                    ctx: this
                }, function(t) {
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    var Output = SiebelApp.S_App.NewPropertySet();
                    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                    Inputs.SetProperty("Service Name", "VHA MSISDN GotoView BS");
                    Inputs.SetProperty("Method Name", "GotoView");
                    Inputs.SetProperty("BusObjName", "Account");
                    Inputs.SetProperty("BusCompName", "Account");
                    var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
                    var RecordId = ParentIC.GetProperty("Service Account Id");
                    Inputs.SetProperty("RowId", RecordId);
                    Inputs.SetProperty("ViewName", "VF Com Account Financial Profile - Edit View");
                    var Output = ser.InvokeMethod("Run Process", Inputs)
                });
            }
            return VHADashboardCreditCheckFormAppletPR
        }());
        return "SiebelAppFacade.VHADashboardCreditCheckFormAppletPR"
    });
}