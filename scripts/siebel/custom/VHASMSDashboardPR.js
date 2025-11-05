if (typeof(SiebelAppFacade.VHASMSDashboardPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHASMSDashboardPR");
    define("siebel/custom/VHASMSDashboardPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHASMSDashboardPR = (function() {
                function VHASMSDashboardPR(pm) {
                    SiebelAppFacade.VHASMSDashboardPR.superclass.constructor.call(this, pm);
                }
                SiebelJS.Extend(VHASMSDashboardPR, SiebelAppFacade.PhysicalRenderer);
                VHASMSDashboardPR.prototype.ShowUI = function() {
                    SiebelAppFacade.VHASMSDashboardPR.superclass.ShowUI.call(this);
                    $("#s_S_A2_div").addClass("twosmslist");
                    $(".twowayinput input").prop('disabled', true);
                    //var headerBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Order SMS Status Dashboard BC");
                    var Inps = SiebelApp.S_App.NewPropertySet();
                    var Outs = SiebelApp.S_App.NewPropertySet();
                    Inps.SetProperty("ProcessName", "VHA Order SMS Status Dashboard Workflow");
                    Outs = VHAAppUtilities.CallWorkflow("VHA Order SMS Status Dashboard Workflow", Inps, {});
                    var sCountPS = Outs.GetChildByType("SMS Count Row Set");
                    var countps = sCountPS.GetChildCount();
                    for (var i = 0; i < countps; i++) {
                        var Status = (sCountPS.GetChild(i).GetProperty("SMS Status"));
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
                            var Status = (sCountPS.GetChild(i).GetProperty("SMS Status"));
                            var Count = (sCountPS.GetChild(i).GetProperty("Count"));
                            switch (Status) {
                                case "Sent":
                                    if (Count > 0) {
                                        $(".twowayhidesent").removeClass('VFDisplayNone');
                                        $("#SentConfirmation input").val(Count);
                                    }
                                    break;
                                case "Expired":
                                    if (Count > 0) {
                                        $(".twowayhideexp").removeClass('VFDisplayNone');
                                        $("#Expired input").val(Count);
                                    }
                                    break;
                                case "Validated":
                                    if (Count > 0) {
                                        $(".twowayhidevalid").removeClass('VFDisplayNone');
                                        $("#Validated input").val(Count);
                                    }
                                    break;
                                case "Stop":
                                    if (Count > 0) {
                                        $(".twowayhidestop").removeClass('VFDisplayNone');
                                        $("#Stop input").val(Count);
                                    }
                                    break;
                                case "Submitted":
                                    if (Count > 0) {
                                        $(".twowayhidesubmit").removeClass('VFDisplayNone');
                                        $("#Submitted input").val(Count);
                                    }
                                    break;
                                case "Failed":
                                    if (Count > 0) {
                                        $(".twowayhidefail").removeClass('VFDisplayNone');
                                        $("#Failed input").val(Count);
                                    }
                                    break;
                                case "Reminder Sent":
                                    if (Count > 0) {
                                        $(".twowayhideremind").removeClass('VFDisplayNone');
                                        $("#ReminderConfirmation input").val(Count);
                                    }
                                    break;
								case "RetryFailed":
                                    if (Count > 0) {
                                        $(".twowayhideretry").removeClass('VFDisplayNone');
                                        $("#Retry input").val(Count);
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

                VHASMSDashboardPR.prototype.BindEvents = function() {
                    SiebelAppFacade.VHASMSDashboardPR.superclass.BindEvents.apply(this, arguments);
                    $(".twowayinput").on("click", function() {
                        //var SMSBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Order SMS Status Dashboard BC");
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        var Outs = SiebelApp.S_App.NewPropertySet();
                        var ID = $(this).attr("val");
                        Inputs.SetProperty("TwoWaySMS", ID);
                        Outs = VHAAppUtilities.CallBS(
                            "VHA Order SMS Status List Service", "SMSDashboardDetails",
                            Inputs, {}
                        );
                    });
                }
                return VHASMSDashboardPR;
            }
            ());
        return "SiebelAppFacade.VHASMSDashboardPR";
    });
}