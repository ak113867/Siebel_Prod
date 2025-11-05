if (typeof(SiebelAppFacade.VHAAssetDashboardPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAAssetDashboardPR");
    define("siebel/custom/VHAAssetDashboardPR", ["siebel/phyrenderer", "order!siebel/custom/VHAAppUtilities"], function() {
        SiebelAppFacade.VHAAssetDashboardPR = (function() {
            var activeFlag = 0;

            function VHAAssetDashboardPR(pm) {
                SiebelAppFacade.VHAAssetDashboardPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VHAAssetDashboardPR, SiebelAppFacade.PhysicalRenderer);
            VHAAssetDashboardPR.prototype.Init = function() {
                SiebelAppFacade.VHAAssetDashboardPR.superclass.Init.apply(this, arguments);
                this.AttachPMBinding("ShowSelection", ExecuteShowSelection)
            };

            function ExecuteShowSelection() {
                var pm = this.GetPM();
                var recordSet = pm.Get("GetRecordSet");
                var recLen = recordSet.length;
                var controls = pm.Get("GetControls");
                var AppletFullId = pm.Get("GetFullId");
                recordSet = recordSet[0];
                if (recLen) {
                    var IAStatus = recordSet["Status"];
                    var paymentType = recordSet["Payment Method"];
                    var MSISDN2 = recordSet["MSISDN2"];
                    setTimeout(function() {
                        var res = $('[aria-label="Asset:Generate OTP"]');
                        if ($('[aria-label="Asset:Generate OTP"]').siblings().length != 1) {
                            $('[aria-label="Asset:Generate OTP"]').parent().parent().parent().hide();
                            $('[aria-label="OTP"]').parent().append(res);
                            $('[aria-label="Asset:Generate OTP"]').attr("style", "width: 84px;");
                            $('[aria-label="Asset:Generate OTP"]>span').attr("style", "margin-left: -3px;")
                        }
                        var res = $('[aria-label="Asset:Reset"]');
                        if ($('[aria-label="Asset:Reset"]').siblings().length != 1) {
                            $('[aria-label="Asset:Reset"]').parent().parent().parent().hide();
                            $('[aria-label="Failed SIM Swaps"]').parent().append(res);
                            $('[aria-label="Asset:Reset"]>span').addClass("VFDisplayNone");
                            $('[aria-label="Asset:Reset"]').addClass("siebui-icon-in-progress")
                        }
                        var flag = "not";
                        //var titleValue = $('[aria-labelledby="Applet_Title_Label"]').val();
						var titleValue = $('[name='+pm.Get("GetControls")["Applet Title"].GetInputName()+']').val(); //SURESHA Upgrade 22.7
                        if (titleValue != "") {
                            //$('[aria-labelledby="Applet_Title_Label"]').removeClass("siebui-ctrl-input"); //SURESHA Upgrade 22.7
							$('[name='+pm.Get("GetControls")["Applet Title"].GetInputName()+']').removeClass("siebui-ctrl-input");
                            //$('[aria-labelledby="Applet_Title_Label"]').attr("style", "width: 300px; border: 0px; font-size: 23px;font-weight: 300!important;font-family: 'Roboto';");//SURESHA Upgrade 22.7
							$('[name='+pm.Get("GetControls")["Applet Title"].GetInputName()+']').attr("style", "width: 300px; border: 0px; font-size: 23px;font-weight: 300!important;font-family: 'Roboto';");
                            var ret = titleValue.split(" ");
                            var str1 = "";
                            var str2 = "";
                            if (ret.length == 2) {
                                str1 = ret[0];
                                str2 = ret[1]
                            } else {
                                str1 = titleValue.substr(0, titleValue.indexOf(" "));
                                str2 = titleValue.substr(titleValue.indexOf(" ") + 1)
                            }
                            if (str2 == "(Active)") {
                                $("#Asset_Title").html('<div id="applet-title-msisdn">' + str1 + '</div> <div id="applet-title-status" class="activeAssetTitle">' + str2.substr(1, str2.length - 2) + "</div>");
                                activeFlag = 0;
                                flag = "done"
                            } else {
                                $("#Asset_Title").html('<div id="applet-title-msisdn">' + str1 + '</div> <div id="applet-title-status" class="InactiveAssetTitle">' + str2.substr(1, str2.length - 2) + "</div>")
                            }
                        } else {
                            //$('[aria-labelledby="Applet_Title_Label"]').hide()  //SURESHA Upgrade 22.7
							$('[name='+pm.Get("GetControls")["Applet Title"].GetInputName()+']').hide()
                        }
                        //$('[aria-labelledby="VHA_NBA_Offers_Text_Label"]').attr("style", "font-weight: bold;font-size: 20px;color: #E60000;width: 300px;") //SURESHA Upgrade 22.7
						$('[name='+pm.Get("GetControls")["VHA NBA Offers Text"].GetInputName()+']').attr("style", "font-weight: bold;font-size: 20px;color: #E60000;width: 300px;")
                    }, 100);
                    IAStatus === "Active" ? $(".VHAAssetStatus").addClass("VHAAssetStatusActive") : $(".VHAAssetStatus").addClass("VHAAssetStatusInactive");
                    if (IAStatus === "Active") {
                        activeFlag = 1
                    }
                    $("#Status_Label").parent().addClass("VFDisplayNone");
                    $("input[name=" + controls["Status"].GetInputName() + "]").parent().addClass("VFDisplayNone");
                    var data = {
                        ParentRef: recordSet["Id"],
                        Type: "MSISDN"
                    };
                    VHASmartAgentPopup.AppendCreateActivityButton("#" + AppletFullId + " .AppletButtons.siebui-applet-buttons", data);
                    if (SiebelApp.S_App.GetActiveView().GetApplet("VF Asset Form Applet").GetMode() != "Edit") {
                        return
                    }
                    $("#" + controls["PosttoPre Connect TBUI"].GetInputName() + "_Ctrl").removeClass("VFDisplayNone");
                    $("#" + controls["Upgrade TBUI"].GetInputName() + "_Ctrl").removeClass("VFDisplayNone");
                    $("#NBN_Product_Instance_Id_Label").parent().removeClass("VFDisplayNone");
                    $("input[name=" + controls["NBN Outage"].GetInputName() + "]").parent().removeClass("VFDisplayNone");
                    $("#NBN_Outage_Label").parent().removeClass("VFDisplayNone");
                    $("input[name=" + controls["NBN Product Instance Id"].GetInputName() + "]").parent().removeClass("VFDisplayNone");
                    $("#" + controls["New APP"].GetInputName() + "_Ctrl").removeClass("VFDisplayNone");
                    $("#" + controls["DisplayEEF"].GetInputName() + "_Ctrl").removeClass("VFDisplayNone");
                    if (paymentType === "Postpay") {
                        $("#" + controls["PreToPost Connect TBUI"].GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                        if (MSISDN2.indexOf("6112") === 0) {
                            $("#" + controls["PosttoPre Connect TBUI"].GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                            $("#" + controls["Upgrade TBUI"].GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                            $("#NBN_Product_Instance_Id_Label").parent().removeClass("VFDisplayNone");
                            $("input[name=" + controls["NBN Product Instance Id"].GetInputName() + "]").parent().removeClass("VFDisplayNone");
                            $("#NBN_Outage_Label").parent().removeClass("VFDisplayNone");
                            $("input[name=" + controls["NBN Outage"].GetInputName() + "]").parent().removeClass("VFDisplayNone")
                        } else {
                            $("#NBN_Product_Instance_Id_Label").parent().addClass("VFDisplayNone");
                            $("input[name=" + controls["NBN Outage"].GetInputName() + "]").parent().addClass("VFDisplayNone");
                            $("#NBN_Outage_Label").parent().addClass("VFDisplayNone");
                            $("input[name=" + controls["NBN Product Instance Id"].GetInputName() + "]").parent().addClass("VFDisplayNone")
                        }
                    } else {
                        if (paymentType === "Prepay") {
                            $("#" + controls["PosttoPre Connect TBUI"].GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                            $("#" + controls["Upgrade TBUI"].GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                            $("#" + controls["New APP"].GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                            $("#" + controls["DisplayEEF"].GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                            $("#NBN_Product_Instance_Id_Label").parent().removeClass("VFDisplayNone");
                            $("input[name=" + controls["NBN Outage"].GetInputName() + "]").parent().addClass("VFDisplayNone");
                            $("#NBN_Outage_Label").parent().addClass("VFDisplayNone");
                            $("input[name=" + controls["NBN Product Instance Id"].GetInputName() + "]").parent().removeClass("VFDisplayNone")
                        }
                    }
                }
            }
            VHAAssetDashboardPR.prototype.ShowUI = function() {
				var pm1 = this.GetPM(); //SURESHA Upgrade 22.7
                SiebelAppFacade.VHAAssetDashboardPR.superclass.ShowUI.apply(this, arguments);
                $('[title="Asset Form Applet"]').addClass("VHACustomAssetFormApplet");
                setTimeout(function() {
                    //$('[aria-labelledby="VHA_NBA_Offers_Text_Label"]').addClass("VFDisplayNone").parent().parent().prev().hide(); //SURESHA Upgrade 22.7
					$('[name='+pm1.Get("GetControls")["VHA NBA Offers Text"].GetInputName()+']').addClass("VFDisplayNone").parent().parent().prev().hide();
                    //$('[aria-labelledby="Applet_Title_Label"]').addClass("VFDisplayNone").parent().append('<div id="Asset_Title"></div>'); //SURESHA Upgrade 22.7
					$('[name='+pm1.Get("GetControls")["Applet Title"].GetInputName()+']').addClass("VFDisplayNone").parent().append('<div id="Asset_Title"></div>');
                    //$('[aria-labelledby="VHA_NBA_Offers_Text_Label"]').attr("style", "font-weight: bold;font-size: 20px;color: #E60000;width: 300px;") //SURESHA Upgrade 22.7
					$('[name='+pm1.Get("GetControls")["VHA NBA Offers Text"].GetInputName()+']').attr("style", "font-weight: bold;font-size: 20px;color: #E60000;width: 300px;")
                }, 100);
                var sAppltName = this.GetPM().Get("GetName");
                var sAppltId = "s_" + this.GetPM().Get("GetFullId") + "_div";
                VHAAppUtilities.ShowToolTip(sAppltName, sAppltId);
                $("#Customer_Profile_Label").parent().removeClass().addClass("CustomerProfileLabel")
            };
            VHAAssetDashboardPR.prototype.BindData = function(bRefresh) {
                SiebelAppFacade.VHAAssetDashboardPR.superclass.BindData.apply(this, arguments)
            };
            VHAAssetDashboardPR.prototype.BindEvents = function() {
                SiebelAppFacade.VHAAssetDashboardPR.superclass.BindEvents.apply(this, arguments)
            };
            VHAAssetDashboardPR.prototype.EndLife = function() {
                SiebelAppFacade.VHAAssetDashboardPR.superclass.EndLife.apply(this, arguments)
            };
            return VHAAssetDashboardPR
        }());
        return "SiebelAppFacade.VHAAssetDashboardPR"
    })
};