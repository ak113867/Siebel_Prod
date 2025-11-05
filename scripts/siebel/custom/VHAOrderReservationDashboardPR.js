if (typeof(SiebelAppFacade.VHAOrderReservationDashboardPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAOrderReservationDashboardPR");
    define("siebel/custom/VHAOrderReservationDashboardPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHAOrderReservationDashboardPR = (function() {
                function VHAOrderReservationDashboardPR(pm) {
                    SiebelAppFacade.VHAOrderReservationDashboardPR.superclass.constructor.call(this, pm);
                }
                SiebelJS.Extend(VHAOrderReservationDashboardPR, SiebelAppFacade.PhysicalRenderer);
                VHAOrderReservationDashboardPR.prototype.ShowUI = function() {
                    SiebelAppFacade.VHAOrderReservationDashboardPR.superclass.ShowUI.call(this);
                   // $("#s_S_A2_div").addClass("twosmslist");
                    $(".twowayinput input").prop('disabled', true);
                    //var headerBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Order SMS Status Dashboard BC");
                    var Inps = SiebelApp.S_App.NewPropertySet();
                    var Outs = SiebelApp.S_App.NewPropertySet();
                    Inps.SetProperty("ProcessName", "VHA Order Reservation Status Dashboard Workflow");
                    Outs = VHAAppUtilities.CallWorkflow("VHA Order Reservation Status Dashboard Workflow", Inps, {});
                    var sCountPS = Outs.GetChildByType("SMS Count Row Set");
                    var countps = sCountPS.GetChildCount();
                    for (var i = 0; i < countps; i++) {
                        var Status = (sCountPS.GetChild(i).GetProperty("Reservation Status"));
                        var Count = (sCountPS.GetChild(i).GetProperty("Count"));
                        if (Count > 0) {
                            var iscount=true;
                        }
                    }
                    if (iscount) {
                        $(".twowayhidesent").addClass('VFDisplayNone');
                        $(".twowayhideexp").addClass('VFDisplayNone');
                        $(".twowayhidevalid").addClass('VFDisplayNone');
                        $(".twowayhidestop").addClass('VFDisplayNone');
                        $(".twowayhidesubmit").addClass('VFDisplayNone');
                        $(".twowayhidefail").addClass('VFDisplayNone');
                        $(".twowayhideremind").addClass('VFDisplayNone');
						$(".twowayhideretry").addClass('VFDisplayNone');
                        for (var i = 0; i < countps; i++) {
                            var Status = (sCountPS.GetChild(i).GetProperty("Reservation Status"));
                            var Count = (sCountPS.GetChild(i).GetProperty("Count"));
                            switch (Status) {
                                case "Reserved":
                                    if (Count > 0) {
                                        $(".twowayhidesent").removeClass('VFDisplayNone');
                                        $("#SentConfirmation input").val(Count);
                                    }
                                    break;
                                case "ReadyForCollection":
                                    if (Count > 0) {
                                        $(".twowayhideexp").removeClass('VFDisplayNone');
                                        $("#Expired input").val(Count);
                                    }
                                    break;
                                case "Unreserved": 
                                    if (Count > 0) {
                                        $(".twowayhidevalid").removeClass('VFDisplayNone');
                                        $("#Validated input").val(Count);
                                    }
                                    break;
                                case "Cancelled":
                                    if (Count > 0) {
                                        $(".twowayhidestop").removeClass('VFDisplayNone');
                                        $("#Stop input").val(Count);
                                    }
                                    break;
                                case "Expired":
                                    if (Count > 0) {
                                        $(".twowayhidesubmit").removeClass('VFDisplayNone');
                                        $("#Submitted input").val(Count);
                                    }
                                    break;
                                case "Closed":
                                    if (Count > 0) {
                                        $(".twowayhidefail").removeClass('VFDisplayNone');
                                        $("#Failed input").val(Count);
                                    }
                                    break;
		             }
                        }
                    } else {
                        $("#SentConfirmation input").val(0);
                        $("#Expired input").val(0);
                        $("#Validated input").val(0);
                        $("#Stop input").val(0);
                        $("#Submitted input").val(0);
                        $("#Failed input").val(0);
                        $("#ReminderConfirmation input").val(0);
						$("#Retry input").val(0);
                    }

                }

                VHAOrderReservationDashboardPR.prototype.BindEvents = function() {
                    SiebelAppFacade.VHAOrderReservationDashboardPR.superclass.BindEvents.apply(this, arguments);
                   /* $(".twowayinput").on("click", function() {
                        //var SMSBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Order SMS Status Dashboard BC");
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        var Outs = SiebelApp.S_App.NewPropertySet();
                        var ID = $(this).attr("val");
                        Inputs.SetProperty("TwoWaySMS", ID);
                        Outs = VHAAppUtilities.CallBS(
                            "VHA Order SMS Status List Service", "SMSDashboardDetails",
                            Inputs, {}
                        );
                    });*/
                }
                return VHAOrderReservationDashboardPR;
            }
            ());
        return "SiebelAppFacade.VHAOrderReservationDashboardPR";
    });
}