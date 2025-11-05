if (typeof(SiebelAppFacade.VHADashboardAssetHeaderFormAppletPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.VHADashboardAssetHeaderFormAppletPR");
    define("siebel/custom/VHADashboardAssetHeaderFormAppletPR", ["order!siebel/phyrenderer"], function () {
        SiebelAppFacade.VHADashboardAssetHeaderFormAppletPR = (function () {
            function VHADashboardAssetHeaderFormAppletPR(pm) {
                SiebelAppFacade.VHADashboardAssetHeaderFormAppletPR.superclass.constructor.call(this, pm);
            }
            SiebelJS.Extend(VHADashboardAssetHeaderFormAppletPR, SiebelAppFacade.PhysicalRenderer);

            /*---------- Custom Code Goes Here ------------*/
            VHADashboardAssetHeaderFormAppletPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHADashboardAssetHeaderFormAppletPR.superclass.ShowUI.call(this);
                //sridhar_21112019 added to hide other two dashboard links
                $('[title="Second Level View Bar"] .ui-tabs-active').siblings().hide();
                var pm = this.GetPM();
                var IAAppletId = pm.Get("GetFullId");

                //VHADashboardCommon.VHADasboardGetICProp("AssetHeader");
                var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
                if (!ParentIC) {
                    VHADashboardCommon.VHADasboardGetICProp("AssetHeader");
                    ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
                }
                //var NBAOffersIC = ParentIC.GetChildByType("ListOfNBA Offers");
                //var childcount = 2;
                $("#MSISDN").html("+" + ParentIC.GetProperty("Asset Number").substring(0, 2) + " " + ParentIC.GetProperty("Asset Number").substring(2));
                $("#AssetStatus").html(ParentIC.GetProperty("Status"));
                if (ParentIC.GetProperty("Status") == 'Active')
                    $("#AssetStatus").removeClass("VHADashRedFontColor").addClass("VHADashGreencolor");
                else if (ParentIC.GetProperty("Status") == 'Inactive')
                    $("#AssetStatus").removeClass("VHADashGreencolor").addClass("VHADashRedFontColor");
                $("#VHAAssetPin").next().html(ParentIC.GetProperty("Service PIN"));
                var sPM = (SiebelApp.S_App.GetActiveView().GetName() == "VHA NBN Asset Dashboard View") ? "NBN" : ParentIC.GetProperty("Payment Method");
                $("#PaymentMethod").html(sPM);
                //$("#VHA_AD_PlanName").html(ParentIC.GetProperty("Product Name"));
                if (ParentIC.GetProperty("High Level Bar Type") != 'None') {
                    $("#BAR").removeClass("VHAPrepayBar").addClass("VHADashRedFontColor");
                    $("#BAR").html(ParentIC.GetProperty("High Level Bar Type"));
                } else if (ParentIC.GetProperty("High Level Bar Type") == 'None') {
                    $("#BAR").html("NO-BAR");
                }
                var paymentmethod = SiebelApp.S_App.GetProfileAttr("VHADashboardPaymentMethod");
                var planIC = ParentIC.GetChildByType("ListOfRate Plan");
                if (planIC.GetChildCount() > 0) {
                    var RatePlanIC = planIC.GetChildByType("Rate Plan");

                    $("#VHA_AD_PlanName").html(RatePlanIC.GetProperty("VHA Rate Plan"));
                }
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                if (paymentmethod == "Postpay" || paymentmethod == "NBN") {
                    if (ParentIC.GetProperty("VF VGE Flag") == 'Y')
                        $("#VGEFlag").addClass("VHADashRedFontColor");

                    if (ParentIC.GetProperty("Billing Account Status") != null || ParentIC.GetProperty("Billing Account Status") != '') {
                        if (ParentIC.GetProperty("Billing Account Status") == 'Overdue') {
                            $("#Status").addClass("VHADashRedFontColor");
                            //$("#Status").removeClass("VHADashGreyColor");
                        }
                        //$("#Status").html(ParentIC.GetProperty("Billing Account Status"));

                    }

                    $("#VHA_AD_DOMValue").html(ParentIC.GetProperty("Bill Cycle"));
                    /*Kathambari- 20/12/2019- Added to check if API Call switch is on to make interface call*/
                    var APIswitchVal = VHAAppUtilities.GetConstants("VHADashAPICallSwitch");
                    if (APIswitchVal == "") {
                        //	var configlist = VHAAppUtilities.GetConfigList("[VHA Configuration List.Name]='VHA Asset Dashboard API Call Switch' and [VHA Configuration List.Type]='VHA Asset Dashboard API Call Switch'");
                        VHADashboardCommon.VHADasboardGetAPICallConfiglist();
                        APIswitchVal = VHAAppUtilities.GetConstants("VHADashAPICallSwitch");
                        var valarray = APIswitchVal.split(",");

                    } else {
                        var valarray = APIswitchVal.split(",");
                    }

                    var Activeview = SiebelApp.S_App.GetActiveView().GetName();
                    if (Activeview == "VHA Postpay Asset Dashboard View" || Activeview == "VHA Prepay Asset Dashboard View") {
                        var name = valarray[2];
                    } else {
                        var name = valarray[1];
                    }
                    var val = name.split("|");
                    if (val[0] == "OverDue") {
                        var value = val[1];
                        if (value == "Y") {
                            var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            var sBillId = ParentIC.GetProperty("Billing Account Id");
                            Inputs.SetProperty("ProcessName", "VHA Dashboard IO Query WF");
                            Inputs.SetProperty("BillingId", sBillId);
                            var Output = ser.InvokeMethod("RunProcess", Inputs);
                            var Reset = Output.GetChildByType("ResultSet");
                            var InvErrorMsg = Reset.GetProperty("Error Message");
                            if (InvErrorMsg == "") {
                                $("#VHA_AD_OverdueAmt").html("$ " + Reset.GetProperty("Over Due Amount"));
                                $("#VHA_AD_TotalAmtDue").html("$ " + Reset.GetProperty("Total Due Amount"));
                                if (Reset.GetProperty("Due Date") != "" && Reset.GetProperty("Due Date") != null) {
                                    var sSince = new Date(Reset.GetProperty("Due Date"));
                                    //const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                    sSince = ("0" + sSince.getDate()).slice(-2) + " " + monthNames[sSince.getMonth()] + " " + sSince.getFullYear();
                                    $("#VHA_AD_DueBy").html(sSince);
                                } else
                                    $("#VHA_AD_DueBy").html("NA");
                            }
                        }

                    }

                    var sUpgElg = SiebelApp.S_App.GetProfileAttr("VHADashUpgradeElig");
                    var sUpgbutton = SiebelApp.S_App.GetProfileAttr("sUpgElg");
                    if (sUpgElg == "Y" && sUpgbutton == "Y") {
                        $("#VHA_AD_UpgradeEligibility").addClass("VHADashGreencolor");
                        $("#vha_dashboard_upgrade_eligible").addClass("upgrade_eligible");
                    } else {

                        $("#vha_dashboard_upgrade_eligible").addClass("upgrade_ineligible");
                    }

                } else if (paymentmethod == "Prepay") {
                    var BalanceIC = ParentIC.GetChildByType("ListOfAccount Balance");
                    if (BalanceIC.GetChildCount() > 0) {
                        var AccountBalanceIC = BalanceIC.GetChildByType("Account Balance");
                        if (AccountBalanceIC.GetProperty("LastRechargeAmount") == null || AccountBalanceIC.GetProperty("LastRechargeAmount") == "")
                            $("#VHA_AD_LastRechargeAmt").html("$ 0");
                        else
                            $("#VHA_AD_LastRechargeAmt").html("$ " + AccountBalanceIC.GetProperty("LastRechargeAmount"));

                        if (AccountBalanceIC.GetProperty("LastRechargeDate") != '' && AccountBalanceIC.GetProperty("LastRechargeDate") != null) {
                            var sRecDt = new Date(AccountBalanceIC.GetProperty("LastRechargeDate"));
                            //const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                            sRecDt = ("0" + sRecDt.getDate()).slice(-2) + " " + monthNames[sRecDt.getMonth()] + " " + sRecDt.getFullYear();
                            $("#VHA_AD_LastRechargeDate").html(sRecDt);
                        }
                        $("#VHA_AD_LastRechargeType").html(AccountBalanceIC.GetProperty("LastRechargeMethod"));
                    }
                }
                SiebelApp.S_App.SetProfileAttr("ShowOTP", "");
                var view = SiebelApp.S_App.GetActiveView();
                var viewname = view.GetName();
                if (viewname == "VHA Prepay Asset Dashboard View") {
                    var applet = view.GetApplet("VHA Generic Prepay Dashboard Asset Header Form Applet");
                } else {
                    var applet = view.GetApplet("VHA Generic Dashboard Asset Header Form Applet");
                }
                //	var a = applet.GetName();
                //var applet = view.GetApplet("VHA Generic Dashboard Asset Header Form Applet");
                var caninvoke = applet.CanInvokeMethod("mGenerateOTP");
                if (caninvoke) {
                    $("#VHADashGenerateOTP").attr("style", "color:#3289E0 !important;").addClass("VHADashBlueFontColor");

                } else {
                    $("#VHADashGenerateOTP").attr("style", "color:grey !important;").removeClass("VHADashBlueFontColor");
                }
                //Added for Authentication Logic-Start
                var caninvoke = applet.CanInvokeMethod("mAuthentication");
                if (caninvoke) {
                    $("#VHADashAuthenticationOTP").attr("style", "color:#3289E0 !important;").addClass("VHADashBlueFontColor");

                } else {
                    $("#VHADashAuthenticationOTP").attr("style", "color:grey !important;").removeClass("VHADashBlueFontColor");
                } //end

            }

            VHADashboardAssetHeaderFormAppletPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHADashboardAssetHeaderFormAppletPR.superclass.BindEvents.call(this);
                var pm = this.GetPM();
                $("#VHAGenOTP").on("click", '#VHADashGenerateOTP', {
                    ctx: this
                }, function (t) {
                    var view = SiebelApp.S_App.GetActiveView();
                    var viewname = view.GetName();
                    if (viewname == "VHA Prepay Asset Dashboard View") {
                        var applet = view.GetApplet("VHA Generic Prepay Dashboard Asset Header Form Applet");
                    } else {
                        var applet = view.GetApplet("VHA Generic Dashboard Asset Header Form Applet");
                    }
                    //var applet = view.GetApplet("VHA Generic Dashboard Asset Header Form Applet");
                    //	var a = applet.GetName();
                    var caninvoke = applet.CanInvokeMethod("mGenerateOTP");
                    var isenabled = $("#VHADashGenerateOTP").hasClass("VHADashBlueFontColor");
                    if (caninvoke && isenabled) {
                        var busobj = SiebelApp.S_App.GetActiveBusObj();
                        var bc = busobj.GetBusCompByName("VHA Asset Management Dashboard Thin BC");
                        var sBS = SiebelApp.S_App.GetService("Workflow Process Manager");
                        var sInputs = SiebelApp.S_App.NewPropertySet();
                        var sOutputs = SiebelApp.S_App.NewPropertySet();
                        sInputs.SetProperty("ProcessName", "VHA Generate OTP Process");
                        sInputs.SetProperty("OrgName", bc.GetFieldValue("Organization"));
                        sInputs.SetProperty("MSISDN", bc.GetFieldValue("Asset Number"));
                        sInputs.SetProperty("ARII", bc.GetFieldValue("Account ARII"));
                        sInputs.SetProperty("AssetId", bc.GetFieldValue("Id"));
                        sBS.InvokeMethod("RunProcess", sInputs, sOutputs);
                        //console.log(SiebelApp.S_App.GetProfileAttr("ShowOTP"));						

                        var OTP = SiebelApp.S_App.GetProfileAttr("ShowOTP");
                        console.log("afteroutpu");
                        setTimeout(function () {
                            $("#VHADashOTPValue").html(SiebelApp.S_App.GetProfileAttr("ShowOTP"));
                            //$("#VHADashOTPValue").html(OTP);
                            //console.log(OTP);
							if (OTP != "" && OTP != null){
                            $("#VHADashAuthenticationOTP").attr("style", "color:grey !important;").removeClass("VHADashBlueFontColor");
                            $("#VHADashGenerateOTP").attr("style", "color:grey !important;").removeClass("VHADashBlueFontColor");
                            //SiebelApp.S_App.SetProfileAttr("ShowOTP","");
							}
                        }, 500);

                    }
                });
                //Authentication Button Logic-Start
                $("#VHAAuthOTP").on("click", '#VHADashAuthenticationOTP', {
                    ctx: this
                }, function (t) {
                    var view = SiebelApp.S_App.GetActiveView();
                    var viewname = view.GetName();
                    if (viewname == "VHA Prepay Asset Dashboard View") {
                        var applet = view.GetApplet("VHA Generic Prepay Dashboard Asset Header Form Applet");
                    } else {
                        var applet = view.GetApplet("VHA Generic Dashboard Asset Header Form Applet");
                    }

                    var caninvoke = applet.CanInvokeMethod("mAuthentication");
                    var isenabled = $("#VHADashAuthenticationOTP").hasClass("VHADashBlueFontColor");
                    if (caninvoke && isenabled) {
                        var inp = SiebelApp.S_App.NewPropertySet();
                        inp.SetProperty("SWEH", "350"); //Height of popup
                        inp.SetProperty("SWEW", "800"); // Width of popup
                        inp.SetProperty("SWETA", "VHA Contact Popup List Applet");
                        inp.SetProperty("SWEM", "Edit List");
                        pm.ExecuteMethod("InvokeMethod", "ShowPopup", inp);

                    }
                    /*setTimeout(function () {

                        var otp = SiebelApp.S_App.GetProfileAttr("ShowOTP");
                        if (otp != null && otp != '') {
                            $("#VHADashOTPValue").html(SiebelApp.S_App.GetProfileAttr("ShowOTP"));
                            $("#VHADashGenerateOTP").attr("style", "color:grey !important;").removeClass("VHADashBlueFontColor");
                            $("#VHADashAuthenticationOTP").attr("style", "color:grey !important;").removeClass("VHADashBlueFontColor");

                        } else {
                            //SiebelJS.Log("Hiello");
                        }
                    }, 500);*/
                });
                //End


                //$("#VHADashOTPValue").html(SiebelApp.S_App.GetProfileAttr("ShowOTP"));

            }
            VHADashboardAssetHeaderFormAppletPR.prototype.EndLife = function () {
                SiebelAppFacade.VHADashboardAssetHeaderFormAppletPR.superclass.EndLife.call(this);
                VHAAppUtilities.SetConstants("VHADashboardParentIC", "");
                VHAAppUtilities.SetConstants("VHADashAPICallSwitch", "");
                //$("#VHADashOTPValue").html(SiebelApp.S_App.GetProfileAttr("ShowOTP"));


            }
            return VHADashboardAssetHeaderFormAppletPR;
        }
            ());
        return "SiebelAppFacade.VHADashboardAssetHeaderFormAppletPR";
    });
}
