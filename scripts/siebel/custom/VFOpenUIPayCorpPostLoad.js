if (typeof(SiebelAppFacade.VFOpenUIPayCorpPostLoad) == "undefined") {
    Namespace("SiebelAppFacade.VFOpenUIPayCorpPostLoad");
    (function() {
        SiebelApp.EventManager.addListner("postload", OnPostload, this);
        var sSkipViewScroll = "FALSE";

        function OnPostload() {
            try {
                //href redirect fix on tab icons
                $("a.ui-tabs-anchor").removeAttr("href");
                //To hide the page tab to avoid direct navigation
                $('.siebui-nav-links.siebui-nav-screenlist option:contains(Customer 360° View)').hide();
                $(".siebui-applet").attr("title", "");
                $('img[src="images/icon_quest_req.gif"]').each(function(e) {
                    $(this).attr("title", $(this).attr("alt"))
                });
                $('[title="First Level View Bar"]').attr("title_Automation", "First Level View Bar").removeAttr("title");
                $('[title="Second Level View Bar"]').attr("title_Automation", "Second Level View Bar").removeAttr("title");
                $('[title="Third Level View Bar"]').attr("title_Automation", "Third Level View Bar").removeAttr("title");
                $('[title="Fourth Level View Bar"]').attr("title_Automation", "Fourth Level View Bar").removeAttr("title");
                //Madhu-08Aug20-Hide tabs for title transfer
                if ($('[aria-label="Three Step Upgrade Selected"]').length > 0 || $('[aria-label="Title Transfer Selected"]').length > 0)
                    $('[title_automation*="Level View Bar"]').addClass("VFDisplayNone");
                else
                    $('.VFDisplayNone[title_automation*="Level View Bar"]').removeClass("VFDisplayNone");
                if (SiebelApp.S_App.GetActiveView().GetName() == "VHA TS Upgrade View") {
                    $('[title_automation*="Level View Bar"]').addClass("VFDisplayNone");
                }
                var viewname, sPrevView;
                viewname = SiebelApp.S_App.GetActiveView().GetName();
                sPrevView = SiebelApp.S_App.GetProfileAttr("VFSUIPreviousView");
                if ((viewname.indexOf("VF SUI Billing") > -1 && sPrevView.indexOf("VF SUI Billing") > -1) || (viewname.indexOf("VF SUI Network") > -1 && sPrevView.indexOf("VF SUI Network") > -1) || (viewname.indexOf("VF SUI Sales") > -1 && sPrevView.indexOf("VF SUI Sales") > -1)) {
                    var sScrollHeight = $("#_sweview").offset().top;
                    var offS = $(".SUIviewtab").offset().top;
                    $("#_sweview").scrollTop(offS - sScrollHeight)
                }
                var TaskPage = $(".siebui-taskui-title").text();
                $(".siebui-taskui-title").replaceWith(": " + TaskPage + "");
                if (viewname == "VF SIM Swap View - TBUI") {
                    var ind = TaskPage.indexOf("SIM Swap");
                    if (ind > -1) {
                        $(".siebui-taskui-title").hide()
                    }
                }
                $('[title="Settings"]').click(function() {
                    setTimeout(function() {
                        if ($(".VHAUserLabel").length == 0) {
                            $('[rn = "VHA Primary Role"]').before("<span class='VHAUserLabel'>Role:</span>");
                            $('[rn = "VHA Primary Role"]').attr("style", "margin-left:-4px;padding: 0px;");
                            $('[rn = "VHA Role Channel"]').before("<span class='VHAUserLabel'>Channel:</span>");
                            $('[rn = "VHA Role Channel"]').attr("style", "margin-left:-4px;padding: 0px;")
                        }
                    }, 5)
                });
                $(".siebui-btn-grp-applet").each(function() {
                    var s;
                    var btn_grp = $(this);
                    s = btn_grp.find(".siebui-ctrl-btn");
                    s.each(function() {
                        btn_grp.before($(this))
                    })
                });
                if ($('[data-caption="&Launch"]').length == 0) {
                    $(".siebui-button-toolbar").addClass("VHADisplaynone");

                    function GetTemplate(i, RawData) {
                        return '<li class="VHAQALinkitem ' + RawData[i]["High"] + ' siebui-appmenu-item ui-menu-item">						   <a href="' + RawData[i]["Description"] + '" class="link " target="_blank" title="">' + RawData[i]["Value"] + "</a>						  </li>"
                    }
                    $(".ui-menubar").append('<li data-caption="&amp;Launch" aria-disabled="false" class="siebui-appmenu-item ui-menubar-item VHALinksHeader" role="presentation"> <a href="javascript:void(0)" class="ui-button ui-widget ui-button-text-only ui-menubar-link" tabindex="-1" role="menuitem" aria-haspopup="true"><span class="ui-button-text"> Quick Links</span></a>                    <ul class="VHAQuickLinks VHADisplaynone ui-menu ui-widget ui-widget-content">						</ul>					</li>');
                    var userType = SiebelApp.S_App.GetProfileAttr("VHA User Type");
                    var SearchString = "[List Of Values.Type] = 'VHA_QUICK_LINKS' AND [List Of Values.Active] = 'Y' " + "AND [List Of Values.Sub Type] = '" + userType + "'";
                    var RawData = VHAAppUtilities.GetPickListValues("", SearchString, {
                        All: true
                    });
                    for (i = 0; i < RawData.length; i++) {
                        $(".VHAQuickLinks").append(GetTemplate(i, RawData))
                    }
                    $('[data-caption="Site Map Trigger     [Ctrl+Shift+A]').addClass("VHADisplaynone");
                    $('[data-caption="iHelp Trigger        [Ctrl+Shift+E]"]').addClass("VHADisplaynone");
                    $('[data-caption="Task Trigger         [Ctrl+Shift+Y]"]').addClass("VHADisplaynone")
                }
                $('[data-caption="Site Map"]').click(function() {
                    $('[data-caption="Site Map Trigger     [Ctrl+Shift+A]"]').trigger("click")
                });
                $('[data-caption="Tasks"]').click(function() {
                    $('[data-caption="Task Trigger         [Ctrl+Shift+Y]"]').trigger("click")
                });
                $('[data-caption="iHelp"]').click(function() {
                    $('[data-caption="iHelp Trigger        [Ctrl+Shift+E]"]').trigger("click")
                });
                $('[data-caption="&Launch"]').off("click").on("click", function() {
                        ($(this).hasClass("VHAQALinkitem")) ? $(this).focus(): "";
                        if ($(".VHAQuickLinks").hasClass("VHADisplaynone")) {
                            $(".VHAQuickLinks").addClass("VHADisplayblock").removeClass("VHADisplaynone")
                        } else {
                            $(".VHAQuickLinks").addClass("VHADisplaynone").removeClass("VHADisplayblock")
                        }
                    }),
                    $('[data-caption="&Launch"]').focusout(function() {
                        var $elem = $(this);
                        setTimeout(function() {
                            if ($elem.find(":focus").length) {} else {
                                $(".VHAQuickLinks").addClass("VHADisplaynone").removeClass("VHADisplayblock")
                            }
                        }, 0)
                    });
                if (viewname == "VHA Postpay Asset Dashboard View" || viewname == "VHA Prepay Asset Dashboard View" || viewname == "VHA NBN Asset Dashboard View") {
                    $(".siebui-search-pane-applet-close").trigger("click")
                }
                $(".siebui-nav-links.siebui-nav-viewlist").on("change", function() {
                    sSkipViewScroll = "TRUE"
                });
                $('.siebui-subview-navs ul li[role="tab"]').on("click", function() {
                    sSkipViewScroll = "TRUE"
                });
                if (sSkipViewScroll != "TRUE") {
                    $("#_sweview").scrollTop(0)
                } else {
                    sSkipViewScroll = "FALSE"
                }
                $(window).unbind();
                $(window).bind("message", function(e) {
                    try {
                        var data = JSON.parse(e.originalEvent.data)
                    } catch (e) {
                        return
                    }
                    if (data.form_submitted) {
                        var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
                        switch (ActiveView) {
                            case ("VF Billing Account Profile View - Extended"):
                            case ("VF Connection View - Billing Detail"):
                            case ("VF Connection Wizard View - Billing Detail - TBUI"):
                            case ("VF Billing Details View - TBUI"):
                            case ("VF Billing Account Profile View"):
                            case ("VF My Requested Service Request List View"):
                            case ("VF My Service Request List View"):
                            case ("VF Detail Service Request List View"):
                            case ("VF Admin Service Request List View"):
                            case ("VF Personal Service Request List View"):
                            case ("VF All Service Request List View"):
                            case ("VHA Service Request New UI View"):
                            case ("VF Credit Card View - AU"):
                            case ("VF UNISIM Capture Identification TBUI View"):
                            case ("VF SUI Billing Prepay Credit Card Detail View"):
                            case ("VF SUI Billing Postpay Billing Profile Detail View"):
                            case ("VHA Prepayment Processing View"):
                            case ("VHA APP Prepayment Processing View"):
                            case ("VHA Prepayment 2 Way SMS Processing View"):
                            case ("VHA APP Prepayment 2 Way SMS Processing View"):
                            case ("VHA Prepayment 2 Way SMS Native Processing View"):
							case ("VF R&C Order Fulfillment View"):
                            case ("VHA TS Upgrade View"):
                                if ($(".VFPPOUIPayCorpIFramePar").hasClass("VFSubmitComplete") || $(".VFPPOUIPayCorpIFramePar").length == 0) {
                                    console.log("First Step")
                                } else {
                                    console.log("Card Details Submitted !!!");
                                    $(".VFPPOUIPayCorpIFramePar").addClass("VFSubmitComplete");
                                    setTimeout(function() {
                                        if ($(".VFPPOUIPayCorpIFramePar").length) {
                                            var apppletName = GetActiveAppletName();
                                            var CreditCardApplet = SiebelApp.S_App.GetActiveView().GetApplet(apppletName);
                                            var CCApm = CreditCardApplet.GetPModel();
                                            var CCAppId = CCApm.Get("GetFullId");
                                            if (apppletName == "CUT Credit Card Payment Form Applet") {
                                                $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").show()
                                            } else {
                                                if (apppletName == "VF Credit Card Refund Form Applet") {
                                                    $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").show()
                                                } else {
                                                    if (apppletName == "VHA Credit Card SR New View Applet") {
                                                        $("#s_" + CCAppId + "_div").show();
                                                        //$(".VFPPOUIPayCorpIFramePar").remove();
                                                    } else {
                                                        if (appletName == "VF Com Invoice Profile Form Toggle Applet - Connection - AU") {
                                                            $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").show();
                                                            $("#s_" + CCAppId + "_div .AppletHIFormBorder table").show()
                                                        } else {
                                                            if (appletName == "VHA Com Invoice Profile Toggle Form Applet TBUI Credit" || appletName == "VHA Kogan Com Invoice Profile Toggle Form Applet TBUI Credit") {
                                                                $("#s_" + CCAppId + "_div .AppletHIFormBorder table").show()
                                                            } else {
                                                                if (appletName == "VF Credit Card List Applet - Australia") {
                                                                    $("#s_" + CCAppId + "_div div.AppletHIFormBorder div").show()
                                                                } else {
                                                                    if (appletName == "VF SUI Credit Card List Applet - Australia") {
                                                                        $("#s_" + CCAppId + "_div .AppletHIFormBorder table").show()
                                                                    } else {
                                                                        if (CompName == "VF UNISIM Capture ID Core - Credit Card Details Applet") {
                                                                            $("#s_" + CCAppId + "_div .AppletHIFormBorder table").show()
                                                                        } else {
                                                                            if (CompName == "VF Com Invoice Profile Form Toggle Applet - Personal AU") {
                                                                                $("#s_" + CCAppId + "_div .AppletHIFormBorder table").show()
                                                                            } else {
                                                                                if (CompName == "VF R&C Prepayment Credit Card Details Applet" || CompName == "VHA Prepayment Credit Card Details Applet" || CompName == "VHA Prepayment Native Credit Card Details Applet") {
                                                                                    $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").show();
                                                                                    $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-header").show()
                                                                                } else {
                                                                                    if (CompName = "VF UNISIM Credit Card Recharge Applet TBUI") {}
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            $(".VFPPOUIPayCorpIFramePar").remove()
                                        }
                                    }, 10000)
                                }
                                break;
                            default:
                        }
                    } else {
                        if (data.form_success) {
                            if ($(".VFPPOUIPayCorpIFramePar").hasClass("VFFormSuccess") || $(".VFPPOUIPayCorpIFramePar").length == 0) {} else {
                                $(".VFPPOUIPayCorpIFramePar").addClass("VFFormSuccess");
                                if (data.reqid && data.reqid.length > 0) {
                                    var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
                                    switch (ActiveView) {
                                        case ("VF Connection View - Billing Detail"):
                                            var CompName = "VF Com Invoice Profile Form Toggle Applet - Connection - AU";
                                            var CompName2 = "VF Com Invoice Profile Form Toggle Applet - Connection - AU";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VF Connection Wizard View - Billing Detail - TBUI"):
                                        case ("VF Billing Details View - TBUI"):
                                            var OrgName = SiebelApp.S_App.GetProfileAttr("VHANewOrg");
                                            if (OrgName == "Kogan") {
                                                var CompName = "VHA Kogan Com Invoice Profile Toggle Form Applet TBUI Credit";
                                                var CompName2 = "VHA Kogan Com Invoice Profile Toggle Form Applet TBUI Credit";
                                                PostPorecessDetails(CompName, CompName2, data.reqid)
                                            } else {
                                                var CompName = "VHA Com Invoice Profile Toggle Form Applet TBUI Credit";
                                                var CompName2 = "VHA Com Invoice Profile Toggle Form Applet TBUI Credit";
                                                PostPorecessDetails(CompName, CompName2, data.reqid)
                                            }
                                            break;
                                        case ("VF Billing Account Profile View - Extended"):
                                            var CompName = "CUT Credit Card Payment Form Applet";
                                            var CompName2 = "CUT Credit Card Payment Form Applet";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VF Credit Card View - AU"):
                                            var CompName = "VF Credit Card List Applet - Australia";
                                            var CompName2 = "VF Credit Card List Applet - Australia";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VF SUI Billing Prepay Credit Card Detail View"):
                                            var CompName = "VF SUI Credit Card List Applet - Australia";
                                            var CompName2 = "VF SUI Credit Card List Applet - Australia";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VF Billing Account Profile View"):
                                            var CompName = "CUT Credit Card Payment Form Applet";
                                            var CompName2 = "CUT Credit Card Payment Form Applet";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VF SUI Billing Postpay Billing Profile Detail View"):
                                            var CompName = "VF Com Invoice Profile Form Toggle Applet - Personal AU";
                                            var CompName2 = "VF Com Invoice Profile Form Toggle Applet - Personal AU";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VF My Requested Service Request List View"):
                                        case ("VF My Service Request List View"):
                                        case ("VF Detail Service Request List View"):
                                        case ("VF Admin Service Request List View"):
                                        case ("VF Personal Service Request List View"):
                                        case ("VF All Service Request List View"):
                                            var CompName = "VF Credit Card Refund Form Applet";
                                            var CompName2 = "VF Credit Card Refund Form Applet";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VHA Service Request New UI View"):
                                            var CompName = "VHA Credit Card SR New View Applet";
                                            var CompName2 = "VHA Credit Card SR New View Applet";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VF UNISIM Capture Identification TBUI View"):
                                            var CompName = "VF UNISIM Capture ID Credit Card Details Applet";
                                            var CompName2 = "VF UNISIM Capture ID Credit Card Details Applet";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VF UNISIM Setup Recharge TBUI View"):
                                            var CompName = "VF UNISIM Credit Card Recharge Applet TBUI";
                                            var CompName2 = "VF UNISIM Credit Card Recharge Applet TBUI";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VF Connection View - Customer Detail"):
                                            var CompName = "VF UNISIM Capture ID Core - Credit Card Details Applet";
                                            var CompName2 = "VF UNISIM Capture ID Core - Credit Card Details Applet";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VHA Prepayment Processing View"):
                                        case ("VHA APP Prepayment Processing View"):
                                        case ("VHA Prepayment 2 Way SMS Processing View"):
                                        case ("VHA APP Prepayment 2 Way SMS Processing View"):
                                            var CompName = "VHA Prepayment Credit Card Details Applet";
                                            var CompName2 = "VHA Prepayment Credit Card Details Applet";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VF R&C Order Fulfillment View"):
                                            var CompName = "VF R&C Prepayment Credit Card Details Applet";
                                            var CompName2 = "VF R&C Prepayment Credit Card Details Applet";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;                                            
                                        case ("VHA Prepayment 2 Way SMS Native Processing View"):
                                            var CompName = "VHA Prepayment Native Credit Card Details Applet";
                                            var CompName2 = "VHA Prepayment Native Credit Card Details Applet";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case "VHA ToT Common View":
                                            var CompName = "VHA TOT Setup And Accessories";
                                            var CompName2 = "VHA TOT Setup And Accessories";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        case ("VHA TS Upgrade View"):
                                            var CompName = "VHA 3 Step Upgrade Header Applet";
                                            var CompName2 = "VHA 3 Step Upgrade Header Applet";
                                            PostPorecessDetails(CompName, CompName2, data.reqid);
                                            break;
                                        default:
                                            console.log("View Did not match")
                                    }
                                } else {
                                    if (data.error && data.error.length > 0) {}
                                }
                            }
                        }
                    }
                });

                function PostPorecessDetails(CompName, CompName2, reqid) {
                    var CreditCardApplet = SiebelApp.S_App.GetActiveView().GetApplet(CompName);
                    var CCApm = CreditCardApplet.GetPModel();
                    var CCAppId = CCApm.Get("GetFullId");
                    if (CompName == "CUT Credit Card Payment Form Applet") {
                        $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").show()
                    } else {
                        if (CompName == "VF Credit Card Refund Form Applet") {
                            $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").show();
                            $("#s_" + CCAppId + "_div td.AppletHIFormBorder table.AppletBack").show()
                        } else {
                            if (CompName == "VHA Credit Card SR New View Applet") {
                                $("#s_" + CCAppId + "_div").show();
                                //$(".VFPPOUIPayCorpIFramePar").remove();						
                            } else {
                                if (CompName == "VF Com Invoice Profile Form Toggle Applet - Connection - AU") {
                                    $("#s_" + CCAppId + "_div .AppletHIFormBorder table").show()
                                } else {
                                    if (CompName == "VHA Com Invoice Profile Toggle Form Applet TBUI Credit" || CompName == "VHA Kogan Com Invoice Profile Toggle Form Applet TBUI Credit") {
                                        $("#s_" + CCAppId + "_div .AppletHIFormBorder table").show()
                                    } else {
                                        if (CompName == "VF Credit Card List Applet - Australia") {
                                            $("#s_" + CCAppId + "_div div.AppletHIFormBorder div").show()
                                        } else {
                                            if (CompName == "VF SUI Credit Card List Applet - Australia") {
                                                $("#s_" + CCAppId + "_div .AppletHIFormBorder table").show()
                                            } else {
                                                if (CompName == "VF UNISIM Capture ID Core - Credit Card Details Applet") {
                                                    $("#s_" + CCAppId + "_div .AppletHIFormBorder table").show()
                                                } else {
                                                    if (CompName == "VF Com Invoice Profile Form Toggle Applet - Personal AU") {
                                                        $("#s_" + CCAppId + "_div .AppletHIFormBorder table").show()
                                                    } else {
                                                        if (CompName == "VF UNISIM Credit Card Recharge Applet TBUI") {
                                                            $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-header").show();
                                                            $("#s_" + CCAppId + "_div div.AppletHIListBorder.siebui-collapsible-applet-content").show()
                                                        } else {
                                                            if (CompName == "VF R&C Prepayment Credit Card Details Applet" || CompName == "VHA Prepayment Credit Card Details Applet" || CompName == "VHA Prepayment Native Credit Card Details Applet") {
                                                                $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").show();
                                                                $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-header").show()
                                                            } else {
                                                                if (CompName == "VHA TOT Setup And Accessories") {
                                                                    $('.credit-debit').removeClass("VFDisplayNone");
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    var CreditCardApplet = SiebelApp.S_App.GetActiveView().GetApplet(CompName2);
                    var pm = CreditCardApplet.GetPModel();
                    var BusComp = pm.Get("GetBusComp");
                    var BillRowId = "";
                    if (CompName == "VF UNISIM Capture ID Core - Credit Card Details Applet" || CompName == "VF UNISIM Credit Card Recharge Applet TBUI") {
                        BillRowId = GetUniqueIdValue()
                    } else {
                        if (CompName == "VHA Prepayment Credit Card Details Applet" || CompName == "VHA Prepayment Native Credit Card Details Applet") {                            							
                            BillRowId = "BA:" + BillRowId
                        } else if (CompName == "VF R&C Prepayment Credit Card Details Applet") {
                            BillRowId = SiebelApp.S_App.GetProfileAttr("PrepaymentsBACId");//SBABU							
                            BillRowId = "BA:" + BillRowId
                        } else if (CompName == "VHA ToT Common View") {
                            BillRowId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Id");
                        } else if (CompName == "VHA 3 Step Upgrade Header Applet") {
                            $("#vha-upgrade-payIframe").html("");
                            BillRowId = CreditCardApplet.GetRecordSet()[0]["Billing Account Id"]
                        } else {
                            BillRowId = BusComp.GetIdValue()
                        }
                    }
                    $(".VFPPOUIPayCorpIFramePar").remove();
                    var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    Inputs.SetProperty("Identifier", BillRowId);
                    Inputs.SetProperty("ReqId", reqid);
                    console.log("Req Id :" + reqid);
                    Inputs.SetProperty("ProcessName", "VF PCI Async Response Workflow");
                    try {
                        var out = ser.InvokeMethod("RunProcess", Inputs)
                    } catch (e) {
                        alert(e.message)
                    } finally {}
                    var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    Inputs.SetProperty("ProcessName", "VF PCI Token Complete Workflow");
                    Inputs.SetProperty("Identifier", BillRowId);
                    Inputs.SetProperty("ReqId", reqid);
                    console.log("Row Id :" + BillRowId);
                    try {
                        var out = ser.InvokeMethod("RunProcess", Inputs);
                        var ResultSet = out.GetChildByType("ResultSet");
                        if (ResultSet.GetProperty("ErrorStatus") == "FAILED") {
                            alert(ResultSet.GetProperty("Error Message"))
                        } else if (CompName == "VHA 3 Step Upgrade Header Applet") {
                            console.log("update 3 step upgrade fields");
                            var expiry = ResultSet.GetProperty("CCExpMon") + "/" + ResultSet.GetProperty("CCExpYr")
                            var nameOnCard = ResultSet.GetProperty("CCHolder");
                            var cardNumber = ResultSet.GetProperty("CCToken");


                            var Inps = SiebelApp.S_App.NewPropertySet();
                            var Outs = SiebelApp.S_App.NewPropertySet();
                            var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                            Inps.SetProperty("Service Name", "VHA Upgrade Utilities BS");
                            Inps.SetProperty("Method Name", "GetSurCharge");
                            Inps.SetProperty("CCTokenNumber", cardNumber.substr(0, 6));
                            Outs = ser.InvokeMethod("Run Process", Inps);
                            var resultSet = Outs.GetChildByType("ResultSet");
                            var surcharge = resultSet.GetProperty("SurchargeRate");
                            var brand = resultSet.GetProperty("Brand");
                            var cardType = resultSet.GetProperty("CardType") || "";
                            $("input.vha-ts-nameoncard").val(nameOnCard).attr("actualValue", nameOnCard);
                            $("input.vha-ts-cardnumber").val(cardNumber.substr(0, 4) + " **** **** " + cardNumber.substr(-4)).attr("actualValue", cardNumber);
                            $("input.vha-ts-cardexpiry").val(expiry).attr("actualValue", expiry);
                            $("input.vha-ts-cardtype").val(cardType).attr("actualValue", cardType);
                            $("input.vha-ts-cardsurcharge").val(surcharge).attr("actualValue", surcharge);
                            $("input.vha-ts-cardbrand").val(brand).attr("actualValue", brand);
                            SiebelApp.EventManager.fireEvent("UPDATE_CARD_DETAILS");
                        } else {
                            if (CompName == "VF UNISIM Capture ID Core - Credit Card Details Applet" || CompName == "VF UNISIM Credit Card Recharge Applet TBUI") {
                                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                var Inputs = SiebelApp.S_App.NewPropertySet();
                                Inputs.SetProperty("Service Name", "VF UNISIM Prepay Utilities TBUI");
                                Inputs.SetProperty("Method Name", "PCIInsertCC");
                                Inputs.SetProperty("Comp Name", GetCompName());
                                Inputs.SetProperty("Unique Id", BillRowId);
                                Inputs.SetProperty("Card Holder Name", ResultSet.GetProperty("CCHolder"));
                                Inputs.SetProperty("CC Number", ResultSet.GetProperty("CCToken"));
                                if (CompName == "VF UNISIM Credit Card Recharge Applet TBUI") {
                                    Inputs.SetProperty("CCExpMon", ResultSet.GetProperty("CCExpMon"));
                                    Inputs.SetProperty("CCExpYr", ResultSet.GetProperty("CCExpYr"));
                                    Inputs.SetProperty("UpdateTBC", "Y")
                                }
                                var Expiry = ResultSet.GetProperty("CCExpMon") + "/" + ResultSet.GetProperty("CCExpYr");
                                Inputs.SetProperty("Expiry Date", Expiry);
                                Inputs.SetProperty("CC Type", ResultSet.GetProperty("CCType"));
                                Inputs.SetProperty("NoUpdateRecharge", "Y");
                                try {
                                    var out = ser.InvokeMethod("Run Process", Inputs);
                                    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                    var Inputs = SiebelApp.S_App.NewPropertySet();
                                    Inputs.SetProperty("Refresh All", "Y");
                                    Inputs.SetProperty("Service Name", "FINS Teller UI Navigation");
                                    Inputs.SetProperty("Method Name", "RefreshCurrentApplet");
                                    out = ser.InvokeMethod("Run Process", Inputs);
                                    alert("Validation is Successful")
                                } catch (e) {
                                    alert(e.message)
                                }
                            } else {
                                if (CompName == "VHA TOT Setup And Accessories") {
                                    SiebelAppFacade.VHAAccessoriesPR.setCCParameters(ResultSet);
                                }
                                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                var Inputs = SiebelApp.S_App.NewPropertySet();
                                Inputs.SetProperty("Service Name", "VF PCI Utilities");
                                Inputs.SetProperty("Method Name", "mSetCCFields");
                                var strCurrId = Inputs.SetProperty("RowId", BillRowId);
                                var strCurrId = Inputs.SetProperty("TransactionType", GetCompName());
                                var strCCType = Inputs.SetProperty("CCType", ResultSet.GetProperty("CCType"));
                                var strToken = Inputs.SetProperty("Token", ResultSet.GetProperty("CCToken"));
                                var strHolder = Inputs.SetProperty("CCHolder", ResultSet.GetProperty("CCHolder"));
                                var strCCMon = Inputs.SetProperty("CCExpMon", ResultSet.GetProperty("CCExpMon"));
                                var strCCYear = Inputs.SetProperty("CCExpYr", ResultSet.GetProperty("CCExpYr"));
                                try {
                                    var out = ser.InvokeMethod("Run Process", Inputs);
                                    alert(ResultSet.GetProperty("Error Message"))
                                } catch (e) {
                                    alert(e.message)
                                }
                            }
                        }
                    } catch (e) {
                        alert(e.message)
                    } finally {}
                }

                function GetCompName() {
                    var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
                    CompName = "";
                    switch (ActiveView) {
                        case ("VF Connection Wizard View - Billing Detail - TBUI"):
                        case ("VF Billing Details View - TBUI"):
                        case ("VF Connection View - Billing Detail"):
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
                        case ("VF UNISIM Capture Identification TBUI View"):
                        case ("VF Connection View - Customer Detail"):
                            CompName = "VFUNISIMCC";
                            break;
                        case ("VF UNISIM Setup Recharge TBUI View"):
                            var ODetail = GetAddressDetails();
                            var UPC = ODetail.GetProperty("UPC");
                            if (CheckPackType(UPC) == "2") {
                                CompName = "VFUNISIMCC_REG"
                            } else {
                                CompName = "VFUNISIMCC_REC"
                            }
                            break;
                        case ("VHA Prepayment Processing View"):
                        case ("VF R&C Order Fulfillment View"):
                        case ("VHA APP Prepayment Processing View"):
                        case ("VHA Prepayment 2 Way SMS Processing View"):
                        case ("VHA APP Prepayment 2 Way SMS Processing View"):
                        case ("VHA Prepayment 2 Way SMS Native Processing View"):
                            CompName = "VHAAuthorizeAndSettleOpenUI";
                            break;
                        case ("VHA TS Upgrade View"):
                            CompName = "VHA 3 Step Upgrade Header Applet";
                            break;
                        default:
                            alert("View Name Not Found.")
                    }
                    return CompName
                }

                function GetActiveAppletName() {
                    var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
                    CompName = "";
                    switch (ActiveView) {
                        case ("VF Connection View - Billing Detail"):
                            CompName = "VF Com Invoice Profile Form Toggle Applet - Connection - AU";
                            break;
                        case ("VF Billing Account Profile View"):
                            CompName = "CUT Credit Card Payment Form Applet";
                            break;
                        case ("VF Connection Wizard View - Billing Detail - TBUI"):
                        case ("VF Billing Details View - TBUI"):
                            var OrgProfAttr = SiebelApp.S_App.GetProfileAttr("VHANewOrg");
                            if (OrgProfAttr == "Kogan") {
                                CompName = "VHA Kogan Com Invoice Profile Toggle Form Applet TBUI Credit"
                            } else {
                                CompName = "VHA Com Invoice Profile Toggle Form Applet TBUI Credit"
                            }
                            break;
                        case ("VF Billing Account Profile View - Extended"):
                            CompName = "CUT Credit Card Payment Form Applet";
                            break;
                        case ("VF SUI Billing Postpay Billing Profile Detail View"):
                            CompName = "VF Com Invoice Profile Form Toggle Applet - Personal AU";
                            break;
                        case ("VF My Requested Service Request List View"):
                        case ("VF My Service Request List View"):
                        case ("VF Detail Service Request List View"):
                        case ("VF Admin Service Request List View"):
                        case ("VF Personal Service Request List View"):
                        case ("VF All Service Request List View"):
                            CompName = "VF Credit Card Refund Form Applet";
                            break;
                        case ("VHA Service Request New UI View"):
                            CompName = "VHA Credit Card SR New View Applet";
                            break;
                        case ("VF Credit Card View - AU"):
                            CompName = "VFCreditCardReg";
                            break;
                        case ("VF SUI Billing Prepay Credit Card Detail View"):
                            CompName = "VFCreditCardReg";
                            break;
                        case ("VF UNISIM Capture Identification TBUI View"):
                            CompName = "VF UNISIM Capture ID Credit Card Details Applet";
                            break;
                        case ("VF UNISIM Setup Recharge TBUI View"):
                            CompName = "VF UNISIM Credit Card Recharge Applet TBUI";
                            break;
                        case ("VF Connection View - Customer Detail"):
                            CompName = "VF UNISIM Capture ID Core - Credit Card Details Applet";
                            break;
                        case ("VHA APP Prepayment Processing View"):
                        case ("VHA Prepayment Processing View"):
                        case ("VHA APP Prepayment 2 Way SMS Processing View"):
                        case ("VHA Prepayment 2 Way SMS Processing View"):
                            CompName = "VHA Prepayment Credit Card Details";
                            break;
                        case ("VHA Prepayment 2 Way SMS Processing View"):
                            CompName = "VHA Prepayment Credit Card Details";
                            break;							
                        case ("VF R&C Order Fulfillment View"):
                            CompName = "VHA RC Prepayment Credit Card Details";
                            break;
                        case ("VHA TS Upgrade View"):
                            CompName = "VHA Prepayment Credit Card Details";
                            break;
                        default:
                            alert("View Name Not Found.")
                    }
                    return CompName
                }

                function GetAddressDetails() {
                    var BO = SiebelApp.S_App.GetActiveBusObj();
                    var BC = BO.GetBusCompByName("Order Entry - Orders");
                    var OrderId = BC.GetIdValue();
                    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    Inputs.SetProperty("Service Name", "VF UNISIM Prepay Utilities TBUI");
                    Inputs.SetProperty("Method Name", "GetCCMetadata");
                    Inputs.SetProperty("OrderId", OrderId);
                    var out = ser.InvokeMethod("Run Process", Inputs);
                    return out.GetChildByType("ResultSet")
                }

                function CheckPackType(UPC) {
                    var SearchString = "[List Of Values.Type] = 'USIM_TWO_DOLLAR_SIM' AND [List Of Values.Active] = 'Y' AND [List Of Values.Name] = '" + UPC + "'";
                    var inp = SiebelApp.S_App.NewPropertySet();
                    inp.SetProperty("Method Name", "RunProcess");
                    inp.SetProperty("SearchString", SearchString);
                    inp.SetProperty("ProcessName", "VF ID Details Workflow");
                    var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                    var out = ser.InvokeMethod("RunProcess", inp);
                    var ResultSet = out.GetChildByType("ResultSet");
                    var IO = "LS Clinical List Of Values";
                    var RawData = ResultSet.GetChildByType("SiebelMessage").GetChildByType("ListOf" + IO);
                    var Picklist = new Array();
                    RawData = SiebelMessageToArray(RawData);
                    RawDataLen = RawData.length;
                    for (var i = 0; i < RawDataLen; i++) {
                        Picklist[Picklist.length] = RawData[i]["Value"]
                    }
                    var PackType = "";
                    if (Picklist.length == 0) {
                        PackType = "1"
                    } else {
                        PackType = "2"
                    }
                    return PackType
                }

                function SiebelMessageToArray(pa) {
                    var recordCount = 0;
                    if (pa) {
                        var recordCount = pa.childArray.length
                    }
                    if (recordCount) {
                        var arrayData = [];
                        for (var i = 0; i < recordCount; i++) {
                            var arr = pa.childArray[i];
                            var arrLen = arr.propArrayLen;
                            if (arrLen) {
                                var tArr = new Object;
                                var indVal = arr.GetFirstProperty();
                                for (var j = 0; j < arrLen; j++) {
                                    tArr[indVal] = arr.propArray[indVal];
                                    indVal = arr.GetNextProperty()
                                }
                                arrayData[i] = tArr
                            }
                        }
                        return arrayData
                    } else {
                        return false
                    }
                }

                function GetUniqueIdValue() {
                    if (SiebelApp.S_App.GetActiveView().GetName() == "VF Connection View - Customer Detail") {
                        var bo = SiebelApp.S_App.GetActiveBusObj();
                        var bc = bo.GetBusCompByName("Contact");
                        return bc.GetIdValue()
                    } else {
                        var app = SiebelApp.S_App.GetActiveView().GetApplet("VF Task Session Form Applet UniSIM TBUI");
                        var pm = app.GetPModel();
                        var Data = pm.Get("GetRecordSet");
                        return Data[0]["Session Id"]
                    }
                }
            } catch (error) {} finally {
                sSkipViewScroll = "FALSE"
            }
        }
    }())
};