if (typeof(SiebelAppFacade.VHASalesCalculatorViewPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHASalesCalculatorViewPR");
    var Pegafilteredarray;
	var Pega_sel_PlanSAMID;
	var pegaoffDataGlob = "";
	var pegaflag = "N";
	var selectedplanTxt = "";
	var scJson = "";
    var currentRLI = "";
    var selService = "";
    var ExtCustSiebelMessage = "";
    var aUpgradeEligibity = "";
	var sAddr = "";
    define("siebel/custom/VHASalesCalculatorViewPR", ["siebel/viewpr", "siebel/custom/VHAAppUtilities", "siebel/custom/bootstrap.min", "siebel/custom/VHASalesCalculatorTemplate", "siebel/custom/VHABTProcessCall"], function () {
        SiebelAppFacade.VHASalesCalculatorViewPR = (function () {
            var filterBrand = "Apple";
            var priPlanDtl = "";
            var addOnData = {};
            var addOnLoaded = false;
            var loadaddonEdit = false;
            var isQAS = "N";
            var sDeviceTerm = "";
            var sQuoteAppletId = "";
            var sQuoteAppletFullId = "";
            var sMobrBAN_drp = "";
            var sMSISDN = "";
            var sAPP = "";
            var sMPP = "";
            var sAssetId = "";
            var sRatePlan = "";
            var sBundleandSave = "";
            var sLoyaltyDiscount = "";
            var sCredit = "";
            var sActiveGPPCount = "";
            var sEarlyUpgradeFee = "";
            var GPPPlan = "";
            var GPPRemainingMonths = "";
            var GPPCharge = "";
            var sCurrentPlanPrice = "";
            var sIntegrationId = "";
            var apilovurl = "";
            var intervalId = "";
            var PhoneInsurance = ["Vodafone Device Care"];
            var SDInsurance = ["Vodafone Device Care Wearables"];
            var secondaryresponse = [];
            var scdvcresult = [];
            var resetRequired = true;
            var accessoryresponse = [];
            var accessoryresult = [];
            var sSession = "";
            /*var termPeriod = new Array;
            for (var i = 1; i <= 36; i++) {
                termPeriod.push(i);
            }*/
			var termPeriod = [12, 24, 36];
            var sBrandList = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_TS_DEVICEPREFERENCE' AND [List Of Values.Name]='DEVICE_PREFERENCE_SC'", {
                "All": "Y"
            });
            var tsBrand = sBrandList[0].Description.split(",");
            var tsPayterm = [{
                    "Name": "12 Months",
                    "Class": "btn vhasc-d-term",
                    "Id": "vhasc12term",
                    "term": "12"
                }, {
                    "Name": "24 Months",
                    "Class": "btn vhasc-d-term",
                    "Id": "vhasc24term",
                    "term": "24"
                }, {
                    "Name": "36 Months",
                    "Class": "btn vhasc-d-term",
                    "Id": "vhasc36term",
                    "term": "36"
                }
            ];
            var tsPlantype = [{
                    "Name": "Recommendations",
                    "SiebelName": "Recommendations",
                    "Class": "btn vhascplantype",
                    "Id": "vhascRecommendplan"
                },{
                    "Name": "MBB",
                    "SiebelName": "MBB",
                    "Class": "btn vhascplantype",
                    "Id": "vhascmbbplan"
                }, {
                    "Name": "Voice",
                    "SiebelName": "Voice",
                    "Class": "btn vhascplantype",
                    "Id": "vhascvoiceplan"
                }, {
                    "Name": "Home Internet",
                    "SiebelName": "FWA",
                    "Class": "btn vhascplantype",
                    "Id": "vhascfwaplan"
                }, {
                    "Name": "NBN/Opticomm/Vision",
                    "SiebelName": "NBN",
                    "Class": "btn vhascplantype",
                    "Id": "vhascnbnplan"
                }, {
                    "Name": "Other",
                    "SiebelName": "Other",
                    "Class": "btn vhascplantype",
                    "Id": "vhascothersplan"
                }
            ];
            var MapShed = {
                Mobile: {
                    m5G: {
                        indoor: false,
                        outdoor: false
                    },
                    m5GSA: {
                        indoor: false,
                        outdoor: false
                    },
                    m5GNSA: {
                        indoor: false,
                        outdoor: false
                    },
                    m4G: {
                        indoor: false,
                        outdoor: false
                    },
                    m4GSA: {
                        indoor: false,
                        outdoor: false
                    },
                    m4GNSA: {
                        indoor: false,
                        outdoor: false
                    },
                    m3G: {
                        indoor: false,
                        outdoor: false
                    }
                },
                FWA: {
                    f4G: {
                        is4G: false
                    },
                    f5G: {
                        is5G: false
                    },
                    f5GSA: {
                        is5Gsa: false
                    },
                    f5GNSA: {
                        is5Gnsa: false
                    }
                }
            };
            var sRsnBasedplnresp = [];
			var nestedData = [];
            var priDeviceProdCd = "";
            if (window.location.href.indexOf("partnerportal") > -1) {
                var sESEndPoint = window.location.href.substr(8, window.location.href.indexOf("/siebel/app/retail/enu?") - 8) + "/config";
                //var sESEndPoint = "siebel-crr-care.vodafone.com.au" + "/config";
            } else {
                var sESEndPoint = window.location.host + "/config";
                //var sESEndPoint = "siebel-crr-care.vodafone.com.au" + "/config";

            }
            var sAjaxURL = "";
            sAjaxURL = "currplndevices";
            var devicesresponse = [];
            var filtereddevicesresponse = [];

            function VHASalesCalculatorViewPR(pm) {
                SiebelAppFacade.VHASalesCalculatorViewPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VHASalesCalculatorViewPR, SiebelAppFacade.ViewPR);
            VHASalesCalculatorViewPR.prototype.Init = function () {
                SiebelAppFacade.VHASalesCalculatorViewPR.superclass.Init.apply(this, arguments);
                priPlanDtl = "";
                sRsnBasedplnresp = [];
                priDeviceProdCd = "";
                //sSimOnlyUpg = "N";
                //filterBrand = "Apple";
                apilovurl = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_REST_API_URL' AND [List Of Values.Active]='Y'", {
                    "All": "true"
                })[0].Description;
                if (window.location.href.indexOf("retail.vodafone") > 0) {
                    apilovurl = apilovurl.replace("care", "retail");
                } else if (window.location.href.indexOf("partnerportal") > -1) {
                    apilovurl = window.location.href.substr(0, window.location.href.indexOf("/siebel/app/retail/enu?")) + "/siebel/v1.0/service/";
                }
            };

            VHASalesCalculatorViewPR.prototype.ShowUI = function () {
                //sQuoteAppletId = SiebelApp.S_App.GetActiveView().GetApplet("VHA Order Attachment Modernized List Applet").GetFullId();
                //sQuoteAppletFullId = "#s_" + sQuoteAppletId + "_div";                
				$(".vha-sc-quotelist,.vha-sc-existcust-applet").addClass("VHASCDisplayNone");
				$(".reviewsum1").addClass("VHASCDisplayNone");
				$('#vha-sc-exiscust-cquote-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
				$(".reviewsum2").addClass("VHASCDisplayNone");
				extistingCustDiv();
				coverageCheckDiv();
				tabHeaderli();
				cartDiv();
				deviceplanSelectDiv();
				configServiceDiv();
				accessorySelectDiv();
				prePaymentDiv();
				$('#vha-sc-exiscust-cquote-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
				if (SiebelApp.S_App.GetProfileAttr("SalesCalcExistCust") == "Y") {
					getExistingCustomerDetails('searchButton');
				}

				var drillDownrec = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Sales Calculator Header Applet"].GetRecordSet()[0];
				if (drillDownrec) {
					console.log(drillDownrec);
					mSetPrflAttr("SalesCalcQuoteId", "");
					if (drillDownrec.Status == "Paused") {
						$("#maskoverlay").styleShow();
						//tssleep(1).then(() => {
							try {
								sSession = "Resume";
								$("#salescalclandpage").addClass('VHADisplayNone');
								$(".vha-sc-newcust-applet").addClass("VHASCDisplayNone");
								scJson = JSON.parse(drillDownrec["JsonTSData"]);
								if (scJson.QuoteHeader.CustomerType == "Existing") {
									getExistingCustomerDetails('searchButton');
									getExistingCustomerDetails('UpdateService');
								}
								createGuidedFlow();								
								$("#smartwizard").smartWizard('goToStep', 1);
								$("#vha-sc-cartsumcustquote").text(scJson.QuoteHeader.QuoteNumber);
								$(".vha-sc-coveragechk-applet").removeClass("VHASCDisplayNone");
								cartRLIupdate();
							} catch (e) {
								throw (e);
								//$("#maskoverlay").styleHide();
							}
							finally {
								//$("#maskoverlay").styleHide();
							}
						//$("#maskoverlay").styleHide();
						//});							
					}
				}
				$('.vha-sc-Inquiry-lbl, .vha-sc-marketinfo-lbl').append('<span class="ml-2 siebui-icon-icon_required" title="Required" aria-label="Required" style="width: 40px;"><img src="images/icon_req.gif" border="0" space="0" hspace="0" alt="Required" title="Required"></span>');
				$('.vha-sc-marketinfo').addClass("VHASCDisplayNone");
				
				// Hari Added for pega responsibility NBA Offers - 31/Aug/2024
						var RoleRespFnd = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_REMOVE_NBA_RESP' AND [List Of Values.Name]= 'Remove NBA Responsibility' AND [List Of Values.Active]='Y'", {
						"All": "true"
							})[0].Value;

						var bsRespCheck = SiebelApp.S_App.GetService("VF Check Responsibilities");
						var psInputs = SiebelApp.S_App.NewPropertySet();
						psInputs.SetProperty("Responsibility", RoleRespFnd);
						var userid =SiebelApp.S_App.GetProfileAttr("PegaLoginId");
						psInputs.SetProperty("User Id",userid );
						var Output = bsRespCheck.InvokeMethod("Check Responsibilities", psInputs);
						var resultset = Output?.GetChildByType("ResultSet");
						if(resultset.propArray.Exists === 'Y')
							$("#vha-sc-nbaofferbtn").addClass("VHASCDisplayNone");
						else
							$("#vha-sc-nbaofferbtn").removeClass("VHASCDisplayNone");  
            };
            VHASalesCalculatorViewPR.prototype.BindData = function (bRefresh) {
                SiebelAppFacade.VHASalesCalculatorViewPR.superclass.BindData.apply(this, arguments)
            };
            VHASalesCalculatorViewPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHASalesCalculatorViewPR.superclass.BindEvents.apply(this, arguments);
                $(".vha-sc-addressdetails-val").autocomplete({
                    source: function (request, response) {
                        var sResp = VHAAppUtilities.doSearchAddress(request, false);
                        //mSetAddrValidFlg("N");
                        $("#Coverage").text("");
                        $("a.siebui-icon-location").remove();
                        $(".ccNwkpar").remove();
                        SiebelApp.S_App.SetProfileAttr("URL1", "");
                        if (sResp != false) {
                            response(VHAAppUtilities.doSearchAddress(request, false));
                        } else { // when error/message/fault
                            response([]);
                        }
                        isQAS = "Y";
                        //$("[name ='" + sCtl.GetInputName() + "']").parent().removeClass("VFDisplayNone")
                        //$("#TCEcQAS").addClass("VFDisplayNone");
                    },
                    minLength: 10,
                    select: function (event, ui) {
                        $("#maskoverlay").styleShow();
                        tssleep(30).then(() => {
                            var sResp = VHAAppUtilities.getAddress(ui);
                            var this_t = this;
							sAddr = this_t.value;
                            var SearchString = "[List Of Values.Type]='VHA_AUTO_COVRGE_CHK' AND [List Of Values.Active]='Y'";
                            var sLovFlg = VHAAppUtilities.GetPickListValues("", SearchString);
                            if (sLovFlg == "ON") {
                                VHACovergaeCheck(sResp, this_t);
                            }
                            //Vasavi added below if for NBN Address
                            if (sResp != false) {
                                var sAddrAllowedFlg = 'Y';
                                $.map(sResp.address.properties, function (i, j) {
                                    if (j == "postal_delivery_type" && i != null && i != "") {
                                        sAddrAllowedFlg = 'N';
                                    }
                                });
                                if (sAddrAllowedFlg == "Y") {
                                    var NBNLoc = "";
                                    TriggerNBNAddress(sResp, NBNLoc);
                                } else {
                                    //$('[name='+t_this.GetPM().Get("GetControls")["Address"].GetInputName()+']').val("");
                                    alert("Invalid Address Type. Address must have type as Street or Rural.");
                                    return false;
                                }
                            } //end if Vasavi
                            $("#maskoverlay").styleHide();
                        });
                    }
                });
                //vasavi added for NBN Address
                $('#vha-sc-nbn-cantfindadrss').click(function () {
                    if ($(".vha-sc-addressdetails-val").val() == "" || $(".vha-sc-addressdetails-val").val() == null)
                        alert("It is required to query PSMA at least once before saving an unvalidated address");
                    else {
                        $(".vha-sc-nbnloc-val").attr("readonly", false);
                        $("#vha-sc-nbngo-btn").attr("disabled", false);
                        $(".vha-sc-nbnloc-val").hasClass("vha-input-bg-readonly") == true ? $(".vha-sc-nbnloc-val").removeClass("vha-input-bg-readonly") : "";
                        //alert("Please proceed by entering the below location Id for Address Search");
                    }
                });
                $("#vha-sc-nbngo-btn").on("click", function () {
                    var sNBNLoc = $(".vha-sc-nbnloc-val").val();
                    if (sNBNLoc != "") {
                        //SiebelApp.S_APP.SetProfileAttr("VHANBNLocId","");
                        if (sNBNLoc.indexOf("LOC") != 0) {
                            alert("NBN Location Id must start with LOC");

                        }
                        if ((sNBNLoc.length) != 15) {

                            alert("NBN Location Id must be 15 character long");
                        }
                        var sResp = "";
                        TriggerNBNAddress(sResp, sNBNLoc);
                    } else {
                        alert("NBN Location Id is mandatory");
                    }
                });

                /*ExistingCustomer Button Click*/
                $("#vha-sc-existcust-btn").on("click", function () {
                    scJson = "";
                    $(".vha-sc-newcust-applet").addClass("VHASCDisplayNone");
                    $(".vha-sc-coveragechk-applet").addClass("VHASCDisplayNone");
                    $(".vha-sc-quotelist").addClass("VHASCDisplayNone");
                    $(".reviewsum1").addClass("VHASCDisplayNone");
                    $(".reviewsum2").addClass("VHASCDisplayNone");
                    $('#vha-sc-exiscust-cquote-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                    $(".vha-sc-existcust-applet").removeClass("VHASCDisplayNone");
                });
                //Capacity and Colour Selection Device Tiles
                $("#vha-sc-d-carousel-container").off("change").on("change", "select#vhasccolour", function () {
                    $(this).parent().parent().parent().parent().find("button.vha-sc-d-shopaddtocartbtn").attr("color", $(this).val());
                    var sDviceName = $(this).parent().parent().find(".vha-sc-d-product-name").text();
                    for (i = 0; i < filtereddevicesresponse.length; i++) {
                        if (filtereddevicesresponse[i]._source.Source_Product_Name == sDviceName && filtereddevicesresponse[i]._source.Capacity == $(this).parent().find("select#vhasccapacity").val() && filtereddevicesresponse[i]._source.Color == $(this).val()) {
                            $(this).parent().parent().next().find("[id^=vha-sc-d-amt]").text(mTruncate(parseFloat(filtereddevicesresponse[i]._source.RRP_Inc_Gst / Number($(".vhasc-d-term.applet-button-active").attr("term"))).toString()));
                            $(this).parent().parent().next().find("[id^=vha-sc-d-desc] span").text(filtereddevicesresponse[i]._source.RRP_Inc_Gst);
                            $(this).parent().parent().parent().parent().find(".vha-sc-d-shopaddtocartbtn").attr("price", filtereddevicesresponse[i]._source.RRP_Inc_Gst);
                            if (currentRLI) {
                                var jsonDvc = currentRLI.DeviceItem.filter(function (item) {
                                    return item.Action === "Add";
                                });
                                if (jsonDvc.length > 0) {
                                    if (filtereddevicesresponse[i]._source.Source_Product_Name == jsonDvc[0].UI__Source_Product_Name) {
                                        jsonDvc[0].UI__Color = $(this).val();
                                        jsonDvc[0].Contract__Amount = filtereddevicesresponse[i]._source.RRP_Inc_Gst;
                                        jsonDvc[0].Monthly__Repayment = mTruncate(parseFloat(filtereddevicesresponse[i]._source.RRP_Inc_Gst / jsonDvc[0].Term).toString());
                                        jsonDvc[0].UI__RRP__Inc__GST = filtereddevicesresponse[i]._source.RRP_Inc_Gst;
                                        $('#vha-sc-cart-dvccost').html('$' + mTruncate(parseFloat(jsonDvc[0].UI__RRP__Inc__GST / jsonDvc[0].Term).toString()));
                                    }
                                }
                            }
                        }
                    }
                });
                $("#vha-sc-d-carousel-container").on("change", "select#vhasccapacity", function () {
                    var sDviceName = $(this).parent().parent().find(".vha-sc-d-product-name").text();
                    var distinctClr = [];
                    var distinctColordtl = [];
                    $(this).next().empty();
                    for (i = 0; i < filtereddevicesresponse.length; i++) {
                        if (filtereddevicesresponse[i]._source.Source_Product_Name == sDviceName && filtereddevicesresponse[i]._source.Capacity == $(this).val()) {
                            var sColor = Object.values(filtereddevicesresponse)[i]._source.Color;
                            var prodCd = Object.values(filtereddevicesresponse)[i]._source.Product_Code;
                            var recmdcolor = Object.values(filtereddevicesresponse)[i]._source.RecommendedColor;
                            if (!distinctClr.includes(sColor)) {
                                distinctClr.push(sColor);
                                var colour = filtereddevicesresponse[i]._source.Color;
                                distinctColordtl.push({
                                    color: sColor,
                                    productcode: prodCd,
                                    recmdcolor: recmdcolor
                                });
                            }
                        }
                    }
                    if (distinctColordtl[0].recmdcolor != "") {
                        for (var i = 0; i < distinctColordtl.length; i++) {
                            if (distinctColordtl[0].recmdcolor == distinctColordtl[i].color) {
                                var recommendedColor = distinctColordtl[i];
                                distinctColordtl.splice(i, 1);
                                distinctColordtl.unshift(recommendedColor);
                            }
                        }
                    }
                    if (distinctColordtl.length > 0) {
                        for (var i = 0; i < distinctColordtl.length; i++) {
                            $(this).next().append('<option  name="colouroptn" value="' + distinctColordtl[i].color + '"  skuid="' + distinctColordtl[i].productcode + '">' + distinctColordtl[i].color + "</option>");
                        }
                    }
                    $(this).parent().parent().parent().parent().find("button.vha-sc-d-shopaddtocartbtn").attr("capacity", $(this).val());
                    $(this).parent().parent().parent().parent().find("button.vha-sc-d-shopaddtocartbtn").attr("color", distinctColordtl[0].color);
                    for (i = 0; i < filtereddevicesresponse.length; i++) {
                        if (filtereddevicesresponse[i]._source.Source_Product_Name == sDviceName && filtereddevicesresponse[i]._source.Capacity == $(this).val() && filtereddevicesresponse[i]._source.Color == $(this).parent().find("select#vhasccolour").val()) {
                            $(this).parent().parent().next().find("[id^=vha-sc-d-amt]").text(mTruncate(parseFloat(filtereddevicesresponse[i]._source.RRP_Inc_Gst / Number($(".vhasc-d-term.applet-button-active").attr("term"))).toString()));
                            $(this).parent().parent().next().find("[id^=vha-sc-d-desc] span").text(filtereddevicesresponse[i]._source.RRP_Inc_Gst);
                            $(this).parent().parent().parent().parent().find("button.vha-sc-d-shopaddtocartbtn").attr("price", filtereddevicesresponse[i]._source.RRP_Inc_Gst);
                            if (currentRLI) {
                                var jsonDvc = currentRLI.DeviceItem.filter(function (item) {
                                    return item.Action === "Add";
                                });
                                if (jsonDvc.length > 0) {
                                    if (filtereddevicesresponse[i]._source.Source_Product_Name == jsonDvc[0].UI__Source_Product_Name) {
                                        jsonDvc[0].UI__Capacity = $(this).val();
                                        jsonDvc[0].Contract__Amount = filtereddevicesresponse[i]._source.RRP_Inc_Gst;
                                        jsonDvc[0].Monthly__Repayment = mTruncate(parseFloat(filtereddevicesresponse[i]._source.RRP_Inc_Gst / jsonDvc[0].Term).toString());
                                        jsonDvc[0].UI__RRP__Inc__GST = filtereddevicesresponse[i]._source.RRP_Inc_Gst;
                                        $('#vha-sc-cart-dvccost').html('$' + mTruncate(parseFloat(jsonDvc[0].UI__RRP__Inc__GST / jsonDvc[0].Term).toString()));
                                    }
                                }
                            }
                        }
                    }

                });
                /*BuildNewPlan Button click*/
                $("#vha-sc-bldnewpln-btn").on("click", function () {
                    scJson = "";
                    $(".vha-sc-existcust-applet").addClass("VHASCDisplayNone");
                    $(".vha-sc-coveragechk-applet").addClass("VHASCDisplayNone");
                    $(".vha-sc-quotelist").addClass("VHASCDisplayNone");
                    $(".reviewsum1").addClass("VHASCDisplayNone");
                    $(".reviewsum2").addClass("VHASCDisplayNone");
                    $('#vha-sc-exiscust-cquote-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                    $(".vha-sc-newcust-applet").removeClass("VHASCDisplayNone");
                });
                /*SalesQuote Button Click*/
                $("#vha-sc-salesquote-btn").on("click", function () {
                    // alert(sQuoteAppletFullId);
                    //$(sQuoteAppletFullId).hide();
                    $(".vha-sc-newcust-applet").addClass("VHASCDisplayNone");
                    $(".vha-sc-existcust-applet").addClass("VHASCDisplayNone");
                    $(".vha-sc-quotelist").removeClass("VHASCDisplayNone");
                    $(".reviewsum1").addClass("VHASCDisplayNone");
                    $('#vha-sc-exiscust-cquote-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                    $(".reviewsum2").addClass("VHASCDisplayNone");
                });
                /*SalesQuote Billing Button Click*/
                $("#vha-sc-banquote-btn").on("click", function () {
                    // alert(sQuoteAppletFullId);
                    //$(sQuoteAppletFullId).hide();
                    $(".vha-sc-newcust-applet").addClass("VHASCDisplayNone");
                    $(".vha-sc-existcust-applet").addClass("VHASCDisplayNone");
                    $(".vha-sc-quotelist").addClass("VHASCDisplayNone");
                    $(".reviewsum2").addClass("VHASCDisplayNone");
                    $(".reviewsum1").removeClass("VHASCDisplayNone");
                });
                /*SalesQuote Search Button Click*/
                $("#vha-sc-searchquote-btn").on("click", function () {
                    // alert(sQuoteAppletFullId);
                    //$(sQuoteAppletFullId).hide();
                    $(".vha-sc-newcust-applet").addClass("VHASCDisplayNone");
                    $(".vha-sc-existcust-applet").addClass("VHASCDisplayNone");
                    $(".vha-sc-quotelist").addClass("VHASCDisplayNone");
                    $(".reviewsum1").addClass("VHASCDisplayNone");
                    $(".reviewsum2").removeClass("VHASCDisplayNone");
                    $('#vha-sc-exiscust-cquote-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                });
                $('#vha-sc-existcust-dtls-pinver').on("click", function () {
                    if ($('#scpwdtoggle').attr('class') == "HPshowpw") {
                        $('#vha-sc-existcust-dtls-pinver').attr("type", "password");
                    }
                });
                $('#scpwdtoggle').on("click", function () {
                    var inp = $('#vha-sc-existcust-dtls-pinver');
                    if (inp.attr("type") == "password") {
                        inp.attr("type", "text");
                    } else {
                        inp.attr("type", "password");
                    }
                    if ($('#scpwdtoggle.HPshowpw').length > 0) {
                        $('#scpwdtoggle').attr("src", "images/custom/hidepw.svg");
                    } else {
                        $('#scpwdtoggle').attr("src", "images/custom/showpw.svg");
                    }
                    $('#scpwdtoggle').toggleClass("HPhidepw").toggleClass("HPshowpw");
                });
                $("#vha-sc-nbn-back-btn").on("click", function () {
                    $(".vha-sc-address-coveragechk-nbn").addClass("VHASCDisplayNone");
                    $(".vha-sc-cvrage-nbn-btncls").removeClass("vha-sc-cvrage-mob-active");
                    $(".vha-sc-cvrage-mob-btncls").addClass("vha-sc-cvrage-mob-active");
                    $(".vha-sc-address-coveragechk-mob").removeClass("VHASCDisplayNone");
                });

                /*Filtering Devices on click of Brands and terms and SIMO*/
                $(".vha-sc-simonlyupg input[type=checkbox], .vha-sc-byod input[type=checkbox]").on("click", function () {
                    //if(resetRequired)
                    resetCartSummaryUI('Change');                    
					var sId = $(this).attr('class'); 
					if ($(this).prop("checked")) {
                        currentRLI.SimO = sId == "vha-sc-simoupg-val" ? "SimO" : "BYOD";
                        priPlanDtl = "";
                        priDeviceProdCd = "Non Device";
                        getPlanDetails();
                        $(".vha-sc-device-select").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-sc-device-select").addClass("VHASCDisplayNone");
                        $(".vha-h-line").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-h-line").addClass("VHASCDisplayNone");
                        //$(".vha-sc-simonlyupg").show();
                        $(".vha-sc-cart-dvccarecost").text("$0.00");
						/*if(sId == "vha-sc-simoupg-val"){
							$(".vha-sc-byod input[type=checkbox]").prop("checked", false);
							$(".vha-sc-byod input[type=checkbox]").prop("disabled", true);
						}
						if(sId == "vha-sc-byod-val"){
							$(".vha-sc-simonlyupg input[type=checkbox]").prop("checked", false);
							$(".vha-sc-simonlyupg input[type=checkbox]").prop("disabled", true);
						}*/
						if(sId == "vha-sc-byod-val"){
							$('.vha-sc-plantypebtn').parent().hide();
						}
                    } else {
                        currentRLI.SimO = "";
                        $(".vha-sc-device-select").hasClass("VHASCDisplayNone") == true ? $(".vha-sc-device-select").removeClass("VHASCDisplayNone") : "";
                        //$(".vha-sc-device-select").removeClass("VHASCDisplayNone");
                        //$(".vha-ts-dvcplan").addClass("VFDisplayNone");
                        priPlanDtl = "";
                        priDeviceProdCd = "";
                        getPlanDetails();
                        //$("#vha-sc-device .vha-h-line").show();
                        $(".vha-h-line").hasClass("VHASCDisplayNone") == true ? $(".vha-h-line").removeClass("VHASCDisplayNone") : "";
						$(".vha-sc-simonlyupg input[type=checkbox], .vha-sc-byod input[type=checkbox]").prop("disabled", false);
						$('.vha-sc-plantypebtn').parent().show();
                    }	
					
                });
                $(".vha-sc-btn-div").off("click").on("click", "button.vhascbrand", function () {
                    //alert("Hello");
                    $(".vhascbrand").removeClass("applet-button-active");
                    $(this).addClass("applet-button-active");
                    $("#sc-device-search").val("");
                    filterBrand = $(this).text();
                    if (filterBrand == "Modem/Vodafone"){
                        filterBrand = "Vodafone";
						$('.vha-sc-btn-div-payment').hasClass("VHASCDisplayNone") == true ? "" : $('.vha-sc-btn-div-payment').addClass("VHASCDisplayNone");
					}else{
						$('.vha-sc-btn-div-payment').hasClass("VHASCDisplayNone") == true ? $('.vha-sc-btn-div-payment').removeClass("VHASCDisplayNone") : "";
					}
                    filterDevices();
                });
                $(".vha-sc-btn-div").on("click", ".vhasc-d-term", function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        $(".vhasc-d-term").removeClass("applet-button-active");
                        $(this).addClass("applet-button-active");
                        sDeviceTerm = $(".vhasc-d-term.applet-button-active").attr("term");
                        createDeviceTiles();
                        $("#maskoverlay").styleHide();
                    });
                }); //Device and Plan Code Ends

                $("#vha-sc-chngaddr-btn").on("click", function () {
                    $(".vha-sc-addressdetails-val").val("");
                    $(".vha-sc-connectaddr-val").val(""); //vasavi added for NBN Address
                    $(".vha-sc-nbnloc-val").val(""); //vasavi added for NBN Address
                    $("#vha-sc-avail-wholesal").val(""); //vasavi added for NBN Address
                    $("#vha-sc-nbn-pref-wholesal").val(""); //vasavi added for NBN Address
                    $("#vha-sc-nbn-tech-type").val(""); //vasavi added for NBN Address
                    $("#vha-sc-nbn-new-Devcharge").val(""); //vasavi added for NBN Address
                    $("#vha-sc-nbn-avail-on").val(""); //vasavi added for NBN Address
                    $("#vha-sc-nbn-tech-descrip").val(""); //vasavi added for NBN Address
                    $(".vha-sc-nbnaddr-val").val(""); //vasavi added for NBN Address
                    $(".vha-sc-nbnloc-val").attr("readonly", true); //vasavi added for NBN Address
                    $(".vha-sc-nbnloc-val").hasClass("vha-input-bg-readonly") == true ? "" : $(".vha-sc-nbnloc-val").addClass("vha-input-bg-readonly");
                    $("#vha-sc-nbngo-btn").attr("disabled", true); //vasavi added for NBN Address
                    
					var elementsWithCSClass = $('.vha-sc-coverageStatus');
                    // reset the coverage status colored indicator
                    // Remove the 'CS' class from the selected elements
                    elementsWithCSClass.removeClass(function (index, className) {
                        // Use a regular expression to match and remove classes containing 'CS'
                        return (className.match(/(\S*CS\S*)/g) || []).join(' ');
                    });
					
					// Hari 31/may/2024
                    $("#vha-sc-get-nbn-new").val("");
                    $("#vha-sc-nbn-with-vodafone").val("");
                    $("#vha-sc-nbn-tech-type").val("");
                    $("#vha-sc-nbn-tech-descrip").text("");
                    $(".vha-sc-nbn-tech-descrip").removeClass("vha-sc-gf-grey-accordion");
                });

                /*Filtering Plans on click of plans*/
                $(".vha-sc-plantypebtn").off("click").on("click", "button.vhascplantype", function () {
                    $(".vhascplantype").removeClass("applet-button-active");
                    $(this).addClass("applet-button-active");
                    $("#sc-plan-search").val("");
                    var planFilter = [];
                    var sFilterTxt = $(this).text();
                    /*if (sFilterTxt == "Cap") {
                    sFilterTxt = "Vodafone Caps";
                    }*/
					if(sFilterTxt === "NBN/Opticomm/Vision")
						sFilterTxt = "NBN";
					
                    sFilterTxt = sFilterTxt == "Home Internet" ? "FWA" : sFilterTxt;
					// Hari Added for pega 31/Aug/2024
					
					
					if (sFilterTxt === "Recommendations" && nestedData.length ===0) {
						// Make api call to show pega plans
						var sCustomerID = TheApplication().GetProfileAttr("CustomerAccountIdPega");
						//var sCustomerID = "3-CRWIQAC";
						var svc = TheApplication().GetService("Workflow Process Manager");
						var Input = TheApplication().NewPropertySet();
						//var Output = TheApplication().NewPropertySet();
						Input.SetProperty("ProcessName", "VHA REST API Wrapper Workflow");
						Input.SetProperty("Transaction Name", "VHAPegaInteractionRESTAPI");
						Input.SetProperty("Configuration List Type", "VHA_CMID_REST_API");
						Input.SetProperty("CustomerID", sCustomerID);		
					    var Output = svc.InvokeMethod("RunProcess", Input);
						var ResponseFromAPI = Output?.childArray[0]?.childArray[0]?.childArray[0]?.childArray[0]?.childArray;
						var HTTPErrorCode = Output.propArray.HTTPErrorCode;
						if(HTTPErrorCode === '200'){
						   if(ResponseFromAPI.length >0) {
							var newarray = [];
							// Group objects by interactionID
							/*var grouped = ResponseFromAPI.reduce((acc, { propArray }) => {
								const InteractionID = propArray.InteractionID;
								acc[InteractionID] = acc[InteractionID] || [];
								acc[InteractionID].push(propArray);
								return acc;
							}, {}); */
							const grouped = ResponseFromAPI.reduce((acc, { propArray }) => {
								const { InteractionID, BundleName, Outcome } = propArray;
								if (Outcome === "Accepted") {
									const key = `${InteractionID}_${BundleName}_${Outcome}`;
									acc[key] = acc[key] || [];
									acc[key].push(propArray);
								}
								return acc;
							}, {});

							for (var key in grouped) {
								var objects = grouped[key];
								var obj = {};
							   
								// Check conditions for each object in the group
								objects.forEach(function(item) {
									
									obj.Channel = item.Channel;
									
									obj.Direction = item.Direction;
									
									obj.ExternalID = item.ExternalID;
									obj.Group = item.Group;
									obj.Identifier = item.Identifier;
									if (item.BundleParent === "true") {										
										obj.bundlename = item.Name;										
										obj.BundleParent = item.BundleParent;
									}
									if (item.BundleParent === "false" && item.RewardValue !== "0.0") {
										obj.summary = item.Name;
										obj.RewardValue = item.RewardValue;
										obj.KeyCode = item.KeyCode;
										obj.RewardTerm = item.RewardTerm;
										obj.dis_SamproductId = item.SAM_Product_ID;	
										obj.CoexistenceFlag = item.CoexistenceFlag;
										obj.OutcomeDateTime = item.OutcomeDateTime;
										obj.EndDateTime = item.EndDateTime;
										obj.StackabilityFlag = item.StackabilityFlag;
										obj.RewardUOM = item.RewardUOM;
										obj.ContextID = item.MSISDN;
										obj.interactionID = item.InteractionID;
										
										obj.ResponseReason = item.OutcomeReason;
										obj.Label = item.Label;
										
									}
									if (item.BundleParent === "false" && item.RewardValue === "0.0") {
										obj.OfferType = item.OfferType;	
										obj.planname = item.Name;
										obj.SAM_Product_ID = item.SAM_Product_ID;
										obj.Response = item.Outcome;
										obj.Source = item.Source;
									}
								});
							 
								if (Object.keys(obj).length > 0) {
									newarray.push(obj);
								}
							}
							console.log(newarray);
							var currjourney;
							if(scJson.QuoteHeader.QuoteJourney === 'Connect'){
								currjourney= "New Connection";
							}
							else{
								currjourney= "Upgrade";
							}
							
							var  filteredarray = newarray.filter((item)=> {
								return item.BundleParent === "true" && item.OfferType === currjourney  && item.Source ==="Pega" && item.Response==="Accepted"
							});
							Pegafilteredarray = filteredarray;
							// filter plans for pega recommendations 
							for (let i = 0; i < filteredarray.length; i++) {
								for (let j = 0; j < sRsnBasedplnresp.length; j++) {
									if (sRsnBasedplnresp[j]._source.Plan_Code.toLowerCase() === filteredarray[i].SAM_Product_ID.toLowerCase()) {
										nestedData.push(sRsnBasedplnresp[j]);
									}
								}
							}
							// nestedData = PegaRecommendOffers(filteredarray);
						   }
						}
						else{
							//alert(HTTPErrorCode);
							switch (HTTPErrorCode) {
								case "400":
									alert('Sales Calculator has encountered an error retrieving Accepted Recommendations.  Please try again. If the problem persists, please contact IT support quoting the following error: “Sales Calculator/Pega error code 400: Bad Request”');
									break;
								case "403":
									alert('Sales Calculator has encountered an error retrieving Accepted Recommendations.  Please try again. If the problem persists, please contact IT support quoting the following error: “Sales Calculator/Pega error code 403: Forbidden”');
									break;
								case "404":
									alert('Sales Calculator has encountered an error retrieving Accepted Recommendations.  Please try again. If the problem persists, please contact IT support quoting the following error: “Sales Calculator/Pega error code 404: Not Found”');
									break;
								case "500":
									alert('Sales Calculator has encountered an error retrieving Accepted Recommendations.  Please try again. If the problem persists, please contact IT support quoting the following error: “Sales Calculator/Pega error code 500: Internal Server Error”');
									break;
								case "429":
									alert('You have sent too many requests.  Please wait and then try again. If the problem persists, please contact IT support quoting the following error: “Sales Calculator/Pega error code 429: Too Many Requests”');
									break;
							    default:
									alert('Sales Calculator has encountered an unexpected error retrieving Accepted Recommendations.  Please try again.If the problem persists, please contact IT support quoting the following error: “Sales Calculator/Pega Unexpected Error” and describe your actions before the error appears.');
							                                    
							}
						}
							
					}
                    if (sFilterTxt != "Other") {
                        for (i = 0; i < sRsnBasedplnresp.length; i++) {
                            if (sRsnBasedplnresp[i]._source.Plan_Type.toLowerCase() == sFilterTxt.toLowerCase()) {
                                planFilter.push(sRsnBasedplnresp[i]);
                            }
                        }
                    } else {
                        if (sFilterTxt == "Other") {
                            for (i = 0; i < sRsnBasedplnresp.length; i++) {
                                if (!["MBB", "Voice", "FWA", "NBN"].includes(sRsnBasedplnresp[i]._source.Plan_Type)) {
                                    planFilter.push(sRsnBasedplnresp[i]);
                                }
                            }
                        }
                    }
                    if (sFilterTxt === "Recommendations"){
						//$("#vha-sc-nbaofferbtn").addClass("VHASCDisplayNone");
						selectedplanTxt = "Recommendations";
						pegaflag = "Y";
						createPlanTiles(nestedData);
					}
					else{
						//$("#vha-sc-nbaofferbtn").removeClass("VHASCDisplayNone");
						selectedplanTxt = "Others";
						pegaflag = "N";
						createPlanTiles(planFilter);
					}
                });
                $(".vha-sc-plan-select").on("change", ".vha-sc-searchplan", function () {
                    var planFilter = [];
                    if ($(this).val() != "") {
                        for (i = 0; i < sRsnBasedplnresp.length; i++) {
                            if (sRsnBasedplnresp[i]._source.Plan_Name.toLowerCase().indexOf($(this).val().toLowerCase()) > -1) {
                                planFilter.push(sRsnBasedplnresp[i]);
                            }
                        }
                    } else {
                        planFilter = sRsnBasedplnresp;
						$(".vhascplantype").removeClass("applet-button-active"); // hari added jan 25
                    }
                    createPlanTiles(planFilter);
                }); //End of Filtering Plans

                $(".vha-sc-device-select").on("change", ".vha-sc-searchdevice", function () {
                    var filtereddevicesresponse = [];
                    if ($(this).val() != "") {
                        for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                            if (Object.values(devicesresponse.hits.hits)[i]._source.Source_Product_Name.toLowerCase() == $(this).val().toLowerCase()) {
                                filtereddevicesresponse.push(Object.values(devicesresponse.hits.hits)[i]);
                            }
                        }
                    } else {
                        filterBrand = $(".vhascbrand.applet-button-active").text();
                        if (filterBrand == "Modem/Vodafone")
                            filterBrand = "Vodafone";
                        filterDevices();
                    }
                    createDeviceTiles();
                }); //End of Filtering Devices

                /* Existing customer device plan butons upgrade button */
                $("#vha-sc-dev-upgrade-btn").on("click", function () {
                    $(this).addClass("applet-button-active");
                    $("#vha-sc-dev-rrp-btn").removeClass("applet-button-active");
                    $("#vha-sc-dev-resign-btn").removeClass("applet-button-active");
                    //reset UI and JSON
                    //reset the plan JSON
                    currentRLI.UpgradeOfferType = "Upgrade to New Plan";
                    resetCartSummaryUI('Change');
                    getDeviceData();
                    //createDeviceTiles();
                    $(".vha-sc-plan-select").show();
                    $(".vha-sc-device-group .vha-h-line").show();
                });

                /* Existing customer device plan butons RRP on installemnt button */
                $("#vha-sc-dev-rrp-btn").on("click", function () {
                    $(this).addClass("applet-button-active");
                    $("#vha-sc-dev-upgrade-btn").removeClass("applet-button-active");
                    $("#vha-sc-dev-resign-btn").removeClass("applet-button-active");
                    currentRLI.UpgradeOfferType = "Upgrade RRP on Instalment";
                    resetCartSummaryUI('Change');
                    getDeviceData();
                    //createDeviceTiles();
                    $(".vha-sc-plan-select").hide();
                    $(".vha-sc-device-group .vha-h-line").hide();
                });

                /* Existing customer device plan butons Resign button */
                $("#vha-sc-dev-resign-btn").on("click", function () {
                    $(this).addClass("applet-button-active");
                    $("#vha-sc-dev-upgrade-btn").removeClass("applet-button-active");
                    $("#vha-sc-dev-rrp-btn").removeClass("applet-button-active");
                    currentRLI.UpgradeOfferType = "Resign";
                    resetCartSummaryUI('Change');
                    getDeviceData();
                    //createDeviceTiles();
                    $(".vha-sc-plan-select").hide();
                    $(".vha-sc-device-group .vha-h-line").hide();
                });

                /*Existing Customer Mobile No or BAN selection*/
                $("select.vha-sc-existcust-dtls-drpdwn-optn").change(function () {
                    sMobrBAN_drp = $(this).children("option:selected").val();
                });
                /*Existing Customer Mobile No or BAN search*/
                $("#vha-sc-exiscust-search-btn").on("click", function () {
                    $("#maskoverlay").styleShow();                    
                    tssleep(30).then(() => {
						scJson = "";
                        getExistingCustomerDetails('searchButton');
                        SiebelApp.S_App.GetActiveView().GetApplet("VHA Sales Calc Billing Quote List Applet").InvokeMethod("RefreshBuscomp");
						SiebelApp.S_App.SetProfileAttr("BANQuote", "");
                        $("#maskoverlay").styleHide();
                    });                    
                });

                $("#vha-sc-exiscust-cquote-btn").on("click", function () {
                    $("#maskoverlay").styleShow();
                    //scJson = "";
                    tssleep(30).then(() => {
                        getExistingCustomerDetails('ExtCreateQuote');
                        $("#maskoverlay").styleHide();
                    });
                });

                $("#sc-override-reason").on("change", function () {
                    resetUpgWarningUI();
                    if ($("#sc-override-reason").val() == "Resolution") {
                        getUpgradeEligible(true);
                    } else {
                        getUpgradeEligible(false);
                    }
                });

                $('.vha-sc-cvrage-mob-btncls').click(function () {
                    $('.vha-sc-cvrage-mob-btncls').removeClass("vha-sc-cvrage-mob-active");
                    $(this).addClass("vha-sc-cvrage-mob-active");
                });
                $('.vha-sc-devplan-btn').click(function () {
                    $('.vha-sc-devplan-btn').removeClass("vha-sc-devplan-active");
                    $(this).addClass("vha-sc-devplan-active");
                });
                $(".vha-sc-lndpagebtns").on("click", function () {
                    $('.vha-sc-lndpagebtns').removeClass("vha-sc-bldnewpln-active");
                    $(this).addClass("vha-sc-bldnewpln-active");

                });

                $(".vha-sc-confser-btn").on("click", function () {
                    if (validateUI("Tab")) {
                        $(this).addClass("vha-sc-devplan-active");
                        $(".vha-sc-devplan-btn").removeClass("vha-sc-devplan-active");
                        $(".vha-sc-acc-btn").removeClass("vha-sc-devplan-active");
                        //$(".vha-sc-prepay-btn").removeClass("vha-sc-devplan-active");
                        $(".vha-sc-configservice-select").removeClass("VHASCDisplayNone");
                        $(".vha-sc-accessory-select").addClass("VHASCDisplayNone");
                        //$(".vha-sc-prepayment-select").addClass("VHASCDisplayNone");
                        $(".vha-sc-device-select-main").addClass("VHASCDisplayNone");
                        var shareName = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_SHARING_GROUP_NAME' AND [List Of Values.Active]='Y'");
                        var shareList = "";
                        shareName.forEach(function (item, index) {
                            if (index == 0) {
                                shareList += "<option hidden>" + item + "</option>";
                            } else {
                                shareList += "<option>" + item + "</option>";
                            }
                        });
                        $(".vha-sc-addon-drp").html(shareList);
                    }
                });
                $(".vha-sc-acc-btn").on("click", function () {
                    if (validateUI("Tab")) {
                        $("#maskoverlay").styleShow();
                        tssleep(30).then(() => {
                            secondaryDevice();
                            $(this).addClass("vha-sc-devplan-active");
                            $(".vha-sc-devplan-btn").removeClass("vha-sc-devplan-active");
                            $(".vha-sc-confser-btn").removeClass("vha-sc-devplan-active");
                            //$(".vha-sc-prepay-btn").removeClass("vha-sc-devplan-active");
                            $(".vha-sc-accessory-select").removeClass("VHASCDisplayNone");
                            $(".vha-sc-configservice-select").addClass("VHASCDisplayNone");
                            //$(".vha-sc-prepayment-select").addClass("VHASCDisplayNone");
                            $(".vha-sc-device-select-main").addClass("VHASCDisplayNone");
                        });
                    }
                });
                $(".vha-sc-devplan-btn").on("click", function () {
                    $(this).addClass("vha-sc-devplan-active");
                    //$(".vha-sc-prepay-btn").removeClass("vha-sc-devplan-active");
                    $(".vha-sc-acc-btn").removeClass("vha-sc-devplan-active");
                    $(".vha-sc-confser-btn").removeClass("vha-sc-devplan-active");
                    $(".vha-sc-device-select-main").removeClass("VHASCDisplayNone");
                    $(".vha-sc-configservice-select").addClass("VHASCDisplayNone");
                    $(".vha-sc-accessory-select").addClass("VHASCDisplayNone");
                    //$(".vha-sc-prepayment-select").addClass("VHASCDisplayNone");

                });
                $("#vha-sc-d-carousel-container").off("click").on("click", ".vha-sc-d-shopaddtocartbtn", function () {
                    $("#maskoverlay").styleShow();
					//if (validateUI("Shop")) {                        
                        tssleep(30).then(() => {
                            if (resetRequired) {
                                resetCartSummaryUI('Change');
                            } else {
                                resetRequired = true;
                            } // reset the cart and JSON BM

                            if ($(".vhasc-d-term").hasClass("applet-button-active")) {
                                var sDvcModel = $(this).attr("device");
                                var sDvcCap = $(this).attr("capacity");
                                var sDvcColor = $(this).attr("color");
                                var sDvcSeqnum = $(this).attr("seqnum");
                                var sDevice = filtereddevicesresponse.filter(function (a) {
                                    return a._source.Source_Product_Name == sDvcModel && a._source.Capacity == sDvcCap && a._source.Color == sDvcColor;
                                });
                                if (sDevice.length > 0) {
                                    shopDevice(sDevice[0]._source, $(this));
                                } else {
                                    $(".vha-sc-device-select #vha-ts-d-stockerrmsg").text("You have reached the maximum allowed MPP/GPPs. You will need to Terminate an existing MPP/GPP before you can add more MPP/GPPs to this service.");
                                }
                            }
                            /*else {
                            alert("Please select Payment Term");
                            }*/
                            $("#maskoverlay").styleHide();
                        });
                    //}
                });
                $("#vha-sc-p-carousel-container").off("click").on("click", "button.vha-sc-addtocartbtn", function () {
                    //if (validateUI("Shop")) {
                        $("#maskoverlay").styleShow();
                        if (resetRequired) {
                            resetCartSummaryUI('ChangePlan');
                        } else {
                            resetRequired = true;
                        }
                        tssleep(30).then(() => {
                            $('.vha-sc-addtocartbtn').text("Select this plan");
                            var sPlanName = $(this).attr("planname");
                            var sPlancd = $(this).attr("plancd");
							
							//pega changes
							Pega_sel_PlanSAMID = $(this).attr("plancd"); //pega
							if(selectedplanTxt === "Recommendations")
								pegaflag = "Y";
							if(Pegafilteredarray != "" && pegaflag === "Y"){
								for (let i = 0; i < Pegafilteredarray.length; i++) {

									if (Pega_sel_PlanSAMID.toLowerCase() === Pegafilteredarray[i].SAM_Product_ID.toLowerCase()) {
										pegaoffDataGlob= Pegafilteredarray[i];
									}															
								}
								
								//validate pega plan added earlier or not
								if(pegaoffDataGlob.OfferType === "Upgrade") {
									var bsRespCheck1 = SiebelApp.S_App.GetService("VF BS Process Manager");
									var psInputs1 = SiebelApp.S_App.NewPropertySet();
									psInputs1.SetProperty("Service Name", "VHA Pega Order Validation BS");
									psInputs1.SetProperty("Method Name", "ValidatePegaOffers");
									psInputs1.SetProperty("MSISDN", pegaoffDataGlob.ContextID );
									psInputs1.SetProperty("OfferType", pegaoffDataGlob.OfferType );
									psInputs1.SetProperty("InteractionId", pegaoffDataGlob.interactionID );
									var pegaOutput1 = bsRespCheck1.InvokeMethod("Run Process", psInputs1);
									
								}
								else{
									var bsRespCheck1 = SiebelApp.S_App.GetService("VF BS Process Manager");
									var psInputs1 = SiebelApp.S_App.NewPropertySet();
									psInputs1.SetProperty("Service Name", "VHA Pega Order Validation BS");
									psInputs1.SetProperty("Method Name", "ValidatePegaOffers");
									//psInputs1.SetProperty("MSISDN", pegaoffDataGlob.ContextID );
									var sCustomerID = TheApplication().GetProfileAttr("CustomerAccountIdPega");
									psInputs1.SetProperty("CustomerID", sCustomerID );
									psInputs1.SetProperty("OfferType", pegaoffDataGlob.OfferType );
									psInputs1.SetProperty("InteractionId", pegaoffDataGlob.interactionID );
									var pegaOutput1 = bsRespCheck1.InvokeMethod("Run Process", psInputs1);
									
								}
								if (pegaOutput1?.GetChildByType("Errors")){
									if (pegaOutput1?.GetChildByType("Errors").childArray[0].propArray.ErrMsg != ""){
										pegaflag = "N";
										return false;
									}
								}
								//pega to get global discount Type
								var dis_samidd = pegaoffDataGlob.dis_SamproductId;
								if(dis_samidd !== undefined && dis_samidd !== null && dis_samidd.trim() !== "")
									dis_samid_flag = "Y";
								else
									dis_samid_flag = "N";
								
								if(pegaoffDataGlob.Source === "Pega" && pegaflag === "Y" && dis_samid_flag === "Y"){
									var bsRespCheck = SiebelApp.S_App.GetService("VF BS Process Manager");
									var psInputs = SiebelApp.S_App.NewPropertySet();
									psInputs.SetProperty("Service Name", "VHA Pega Order Validation BS");
									psInputs.SetProperty("Method Name", "GetOfferProductName");
									psInputs.SetProperty("OfferSamId", pegaoffDataGlob.dis_SamproductId );
									//psInputs.SetProperty("SMA_PRODUCT_ID", pegaoffDataGlob.SAM_Product_ID );
									var pegaOutput = bsRespCheck.InvokeMethod("Run Process", psInputs);
									var resultset = pegaOutput?.GetChildByType("ResultSet");
									pegaoffDataGlob.GlobalProductId=resultset.propArray.GlobalProductId;
									pegaoffDataGlob.OfferProductName=resultset.propArray.OfferProductName;
								}
							}
							//pega changes
                            //console.log(sPlanName);
                            $('#vha-sc-cart-planname').html(sPlanName);
                            for (i = 0; i < sRsnBasedplnresp.length; i++) {
                                if (sRsnBasedplnresp[i]._source.Plan_Code == sPlancd) {
                                    currentRLI.PropSAMId = sRsnBasedplnresp[i]._source.Proposition_Sam_Id;
                                    currentRLI.Proposition = sRsnBasedplnresp[i]._source.Proposition_Name;
                                    currentRLI.PlanItem.Action = "Add";
                                    currentRLI.PlanItem.Name = sRsnBasedplnresp[i]._source.Plan_Name;
                                    currentRLI.PlanItem.Code = sRsnBasedplnresp[i]._source.Plan_Code;
                                    currentRLI.PlanItem.ProdIntegrationId = "";
                                    currentRLI.PlanItem.Price = sRsnBasedplnresp[i]._source.Plan_Price_Inc_Gst;
                                    currentRLI.PlanItem.UI_PlanType = sRsnBasedplnresp[i]._source.Plan_Type
                                        //currentRLI.PlanItem.Descr = "";
                                        currentRLI.PlanItem.Type = "Plan";
                                    $('#vha-sc-cart-plancost').html('$' + sRsnBasedplnresp[i]._source.Plan_Price_Inc_Gst);
                                    priPlanDtl = sRsnBasedplnresp[i]._source;
                                    refreshCart(priPlanDtl);
                                }
                            }
                            $(this).text("Selected");
                            $("#maskoverlay").styleHide();
                        });
                    //}
                });
                $(".vha-sc-res-dis").on("click", ".vha-sc-res-discaddon", {}, function () {
                    var val = $('input[type=radio][name=restrict-dis]:checked').attr('value');
                    if (val == "Recurring") {
                        $(".vha-sc-cfg-row2").removeClass("VHASCDisplayNone");
                        var featureConfigRestdicTerm1 = "#vha-sc-feature-config-termrestdisc1";
                        var featureDropDownResDiscTerm1 = ".vha-sc-termrestdisc1-drop-down";
                        var discPeriod = new Array;
                        for (var i = 1; i <= 36; i++) {
                            discPeriod.push(i);
                        }
                        $(featureConfigRestdicTerm1).autocomplete({
                            source: discPeriod.map(function (a) {
                                return {
                                    label: a,
                                    value: a,
                                    type: "Term"
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $(featureDropDownResDiscTerm1).click(dropDownTrigger);
                        var featureConfigRestdicTerm2 = "#vha-sc-feature-config-termrestdisc2";
                        var featureDropDownResDiscTerm2 = ".vha-sc-termrestdisc2-drop-down";
                        $(featureConfigRestdicTerm2).autocomplete({
                            source: discPeriod.map(function (a) {
                                return {
                                    label: a,
                                    value: a,
                                    type: "Term"
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $(featureDropDownResDiscTerm2).click(dropDownTrigger);
                    } else {
                        $(".vha-sc-cfg-row2").addClass("VHASCDisplayNone");
                        $("#vha-sc-subs-dis-amt").val("");
                        $("#vha-sc-feature-config-termrestdisc1").val("");
                        $("#vha-sc-subs-dis-amt").prop('disabled', true);
                        $("#vha-sc-feature-config-termrestdisc1").prop('disabled', true);
                        $("#vha-sc-vip-dis-amt").val("");
                        $("#vha-sc-feature-config-termrestdisc2").val("");
                        $("#vha-sc-vip-dis-amt").prop('disabled', true);
                        $("#vha-sc-feature-config-termrestdisc2").prop('disabled', true);
                        $('#vha-sc-vip-dis').prop('checked', false);
                        $('#vha-sc-subs-dis').prop('checked', false);
                        currentRLI.CreditItem = currentRLI.CreditItem.filter(function (item) {
                            return item.UIType != "DollarCredit" && item.UIType != "PercentCredit";
                        });
                        calcManualDiscount();
                    }
                });
                $(".vha-sc-da-adon").on("click", ".vha-sc-dataaddonradio", {}, function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        dataAddons(function () {});
                        $("#maskoverlay").styleHide();
                    });
                });
                $("#vha-sc-feature-config-addon").on("focusout", function () {
                    if ($(this).val() == "") {
                        currentRLI.PackItem = currentRLI.PackItem.filter(function (item) {
                            return item.UIType != "Data";
                        });
                    }
                });

                $("#vha-sc-feature-config-idd").on("focusout", function () {
                    if ($(this).val() == "") {
                        $('#vha-sc-feature-config-termidd').val('');
                        currentRLI.PackItem = currentRLI.PackItem.filter(function (item) {
                            return item.UIType != "IDD";
                        });
                    }
                });

                $(".vha-sc-in-calls").on("click", ".vha-sc-idd-addons", {}, function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        iddAddons(function () {});
                        $("#maskoverlay").styleHide();
                    });
                });

                $("#vha-sc-device-care-dropdown").on("click", function () {
                    $($(this).attr("parId")).autocomplete("search", "");
                });

                //Wearables Payment term
                $(".vha-sc-secdvc_pt-btns").on("click", ".vha-sc-pp-btn", function () {
                    $(".vha-sc-pp-btn").removeClass("vha-sc-pp-btn-active");
                    $(this).addClass("vha-sc-pp-btn-active");
                });

                //Accessories Payment term
                $(".vha-sc-acc_pt-btns").on("click", ".vha-sc-pp-acc-btn", function () {
                    $(".vha-sc-pp-acc-btn").removeClass("vha-sc-pp-btn-active");
                    $(this).addClass("vha-sc-pp-btn-active");
                });

                //Phone device care
                $("#vha-sc-phoneins").autocomplete({
                    source: PhoneInsurance.map(function (a) {
                        return {
                            label: a,
                            value: a,
                            type: "Device Care"
                        };
                    }),
                    minLength: 0,
                    select: selectAutoCompleteVal
                }).on('change', function () {
                    var currentValue = $(this).val();
                    if (!currentValue) {
                        var currectDvc = currentRLI.DeviceItem.filter(function (item) {
                            return item.Action == "Add";
                        });
                        if (currectDvc.length > 0) {
                            currectDvc[0].Insurance = "";
                            currectDvc[0].InsPri = "";
                            currentRLI.DeviceIns = "";
                        }
                        $("#vha-sc-cart-dvccarecost").text("$0.00");
                    }
                });
                $('#vha-sc-device-care-dropdown').click(dropDownTrigger);
                //SD Device care
                $("#vhs-sc-sddevice-care").autocomplete({
                    source: SDInsurance.map(function (a) {
                        return {
                            label: a,
                            value: a,
                            type: "SD Device Care"
                        };
                    }),
                    minLength: 0,
                    select: selectAutoCompleteVal
                });
                $('#vha-sc-sddevice-care-dropdown').click(dropDownTrigger);
                // secdevice add button
                $("#vha-sc-wear-add-btn").on("click", function () {
                    //Json
                    var selSD = scdvcresult.filter(function (item) {
                        return item.prodcd == $("#vha-sc-wear-add-btn").attr("Productcd");
                    });
                    var objSD = {};
                    objSD.Type = "Secondary Device";
                    objSD.Action = "Add";
                    objSD.Name = "APP Contract";
                    objSD.Category = "Secondary Device";
                    objSD.Contract__Amount = parseFloat(selSD[0].rrpingst).toFixed(2);
                    objSD.Contract__Amount__Override = 0;
                    objSD.Contract__End__Date = "";
                    objSD.Contract__Start__Date = "";
                    objSD.IMEI = "";
                    objSD.Monthly__Repayment = parseFloat(Number(selSD[0].rrpingst) / Number($(".vha-sc-wear-fltby-brand .vha-sc-pp-btn-active").attr('term'))).toFixed(2);
                    objSD.Number__of__Accessories = 1;
                    objSD.Prepayment__Amount = 0;
                    objSD.Term = Number($(".vha-sc-wear-fltby-brand .vha-sc-pp-btn-active").attr('term'));
                    objSD.Term__Override = "_";
                    objSD.Total__Accessories__RRP__Inc__GST = parseFloat(selSD[0].rrpingst).toFixed(2);
                    objSD.Insurance = $('#vhs-sc-sddevice-care').val();
                    objSD.InsPri = $('#vhs-sc-sddevice-care').val() != "" ? "10.00" : "0.00";
                    objSD.Accessory__Name = $('#sc-secdevice-v-search').val();
                    objSD.Accessory__Code = selSD[0].prodcd;
                    objSD.Accessory__RRP__Exc__GST = parseFloat(selSD[0].rrpexgst).toFixed(2);
                    objSD.Accessory__RRP__Inc__GST = parseFloat(selSD[0].rrpingst).toFixed(2);
                    objSD.RemTerm = "";
                    // Secondary device Payterm Validation DEC 12
                    if (objSD.Accessory__Name != "" && !isNaN(objSD.Term)) {
                        $(".vha-sc-wear-table-main").removeClass("VHASCDisplayNone");
                        $("#vha-sc-wearables-table").append(wearablesListDiv(objSD));
                        currentRLI.SDItem.push(objSD);
                        resetSecDevice();
                        $('#vha-sc-cart-SDdvccost').text("$" + parseFloat(currentRLI.SDItem.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.Monthly__Repayment) || 0), 0)).toFixed(2));
                        $('#vha-sc-cart-Wearablecarecost').text("$" + parseFloat(currentRLI.SDItem.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.InsPri) || 0), 0)).toFixed(2));
                    } else {
                        //alert("Please select model");
                        if (objSD.Accessory__Name == "") {
                            $('#vha-sc-we-variant-reason').text("Please Select the Variant").removeClass("VHASCDisplayNone");
                        }
                        if (isNaN(objSD.Term)) {
                            $('#vha-sc-we-payterm-reason').text("Please Select the Payterm").removeClass("VHASCDisplayNone");
                        }
                    }
                });

                //secdevice remove button
                $("#vha-sc-wearables-table").off("click").on("click", "button", function () {
                    var removeprodcd = $(this).attr("productcd");
                    //json remove
                    currentRLI.SDItem = currentRLI.SDItem.filter(function (item) {
                        return item.Accessory__Code != removeprodcd;
                    });
                    $(this).parent().parent().remove();
                    tssleep(30).then(() => {
                        resetSecDevice();
                        if ($('.vha-sc-we-NCIdrecLines').length <= 0)
                            $(".vha-sc-wear-table-main").addClass("VHASCDisplayNone");
                        $('#vha-sc-cart-SDdvccost').text("$" + parseFloat(currentRLI.SDItem.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.Monthly__Repayment) || 0), 0)).toFixed(2));
                        $('#vha-sc-cart-Wearablecarecost').text("$" + parseFloat(currentRLI.SDItem.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.InsPri) || 0), 0)).toFixed(2));
                        //$('div[productcd="HSAMGW5PRO45BLK"]').remove();
                    });
                });

                //Terminate button funder existing contract
                $(".vha-sc-ExistingContractsSum").off("click").on("click", "button", function () {
                    var intId = $(this).attr("intId");
					var dvcPayout = currentRLI.OtpItem.filter(function (item) {
                        return item.Name == "Device Payout Fee" && item.UI_intid == intId;
                    });
                    //var intId = $(this).attr("intId");
                    switch ($(this).attr("id")) {
                    case "sc-terminate":
                        $(this).hasClass('VHASCDisplayNone') == true ? "" : $(this).addClass('VHASCDisplayNone');
                        $(this).next("#sc-revert").hasClass('VHASCDisplayNone') == true ? $(this).next("#sc-revert").removeClass('VHASCDisplayNone') : "";
                        $('#vha-sc-cartsumcustremequip').text("$" + parseFloat(Number(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit) + Number($(this).attr("amt"))).toFixed(2));
						
						if (dvcPayout.length > 0) {
                            //var amt = Number(dvcPayout[0].Price) + Number($(this).attr("amt"));
                            dvcPayout[0].Price = parseFloat($(this).attr("amt")).toFixed(2);							
							scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit = Number(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit) + Number($(this).attr("amt"));
                        } else {
                            var dpayo = {};
                            dpayo.Action = "Add";
                            dpayo.Type = "Otp";
                            dpayo.Name = "Device Payout Fee";
                            dpayo.Price = parseFloat($(this).attr("amt")).toFixed(2);
                            dpayo.UI_intid = intId;
							currentRLI.OtpItem.push(dpayo);
							scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit = Number(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit) + Number($(this).attr("amt"));
                        }
                        //update action to Delete
                        if (intId != "") {
                            var dvcExisting = currentRLI.DeviceItem.filter(function (item) {
                                return item.Action == "Existing" && item.ProdIntegrationId == intId;
                            });
                            if (dvcExisting.length > 0) {
                                dvcExisting[0].Action = "Delete";
                            }
                        }
                        break;
                    case "sc-revert":
                        $(this).hasClass('VHASCDisplayNone') == true ? "" : $(this).addClass('VHASCDisplayNone');
                        $(this).prev("#sc-terminate").hasClass('VHASCDisplayNone') == true ? $(this).prev("#sc-terminate").removeClass('VHASCDisplayNone') : "";
                        scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit = Number(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit) - Number($(this).attr("amt"));
						$("#vha-sc-cartsumcustremequip").text("$" + parseFloat(Number(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit)).toFixed(2));
						
						currentRLI.OtpItem = currentRLI.OtpItem.filter(function (item) {
							return item.Name == "Device Payout Fee" && item.UI_intid != intId;
						});
						/*if (dvcPayout.length > 0) {
                            var amt = Number(dvcPayout[0].Price) - Number($(this).attr("amt"));
                            if (amt == 0) {
                                currentRLI.OtpItem = currentRLI.OtpItem.filter(function (item) {
                                    return item.Name != "Device Payout Fee";
                                });
                                $("#vha-sc-cartsumcustremequip").text("$" + parseFloat(Number(scJson.QuoteHeader.ExistingCustDtls.RemainingEquipmentLimit)).toFixed(2));
								scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit = scJson.QuoteHeader.ExistingCustDtls.RemainingEquipmentLimit;
                            } else {
                                dvcPayout[0].Price = parseFloat(amt).toFixed(2);
								scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit = parseFloat(Number($("#vha-sc-cartsumcustremequip").text().replace(/\$/g, '')) - Number(amt)).toFixed(2);
                                $("#vha-sc-cartsumcustremequip").text("$" + parseFloat(Number($("#vha-sc-cartsumcustremequip").text().replace(/\$/g, '')) - Number(amt)).toFixed(2));
                            }
                        }*/
                        //update action to revert to Existing
                        if (intId != "") {
                            var dvcExisting = currentRLI.DeviceItem.filter(function (item) {
                                return item.Action == "Delete" && item.ProdIntegrationId == intId;
                            });
                            if (dvcExisting.length > 0) {
                                dvcExisting[0].Action = "Existing";
                            }
                        }
                        break;
                    case "vha-sc-EarlyUpgradeBtn":
                        //debugger;
                        $(".vha-sc-EarlyUpgradeBtn").removeClass("applet-button-active");
                        $(this).addClass("applet-button-active");
                        var term = $(this).text();

                        if (Number(selService.ExistingContractUI.EarlyUpgradeFee) > 0) {
                            $(".vha-sc-EarlyUpgradeBtn").removeClass("vha-sc-totalNewbtn-disable"); // DEC 12
                            if (term == "One Time") {
                                currentRLI.FeeRollItem.Action = "";
                                currentRLI.FeeRollItem.Type = "";
                                currentRLI.FeeRollItem.Name = "";
                                currentRLI.FeeRollItem.ProdIntegrationId = "";
                                currentRLI.FeeRollItem.Period = "";
                                currentRLI.FeeRollItem.Price = "";
                                var eUpfeeO = {};
                                eUpfeeO.Action = "Add";
                                eUpfeeO.Type = "Otp";
                                eUpfeeO.Name = "Early Upgrade Fee";
                                eUpfeeO.Price = parseFloat(Number(selService.ExistingContractUI.EarlyUpgradeFee)).toFixed(2);
                                //currentRLI.OtpItem.push(eUpfeeO);//Vasavi commented for Sales calc prod issue#12
                            } else {
                                try {
                                    currentRLI.OtpItem = currentRLI.OtpItem.filter(function (item) {
                                        return item.Name != "Early Upgrade Fee";
                                    });
                                } catch (e) {}
                                var efee = currentRLI.FeeRollItem;
                                currentRLI.FeeRollItem.Action = "Add";
                                currentRLI.FeeRollItem.Type = "FeeRollOver";
                                currentRLI.FeeRollItem.Name = "Early Upgrade Fee Rollover";
                                currentRLI.FeeRollItem.ProdIntegrationId = "";
                                currentRLI.FeeRollItem.Period = term;
                                currentRLI.FeeRollItem.Price = parseFloat(Number(selService.ExistingContractUI.EarlyUpgradeFee) / Number(term)).toFixed(2);
                            }
                        } else {
                            $(".vha-sc-EarlyUpgradeBtn").addClass("vha-sc-totalNewbtn-disable"); //DEC 12
                        }
                        break;
                    }
                });

                /*$("#vha-sc-phoneins").on("change", function () {
                var NewInsText = $("#vha-sc-phoneins option:selected").text();
                //var NewInsVal = $("#ts-new-device-ins option:selected").val();
                var InsMaxPrice = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_SALESCALC_JOURNEY' AND [List Of Values.Name]='DeviceInsPrice' AND [List Of Values.Active]='Y'");
                //var NewInsValArray = NewInsVal.split("|");

                currentRLI.DeviceItem.push({
                Insurance: NewInsText,
                InsPri: InsMaxPrice,
                });
                $(".vha-sc-cart-dvccarecost").text("$" + InsMaxPrice + ".00");

                //totalIndicativeCostCalc();
                });*/

                // accessories add button
                $("#vha-sc-acces-add-btn").on("click", function () {
                    //Json
                    var selAcc = accessoryresult.filter(function (item) {
                        return item.prodcd == $("#vha-sc-acces-add-btn").attr("Productcd");
                    });
                    var objAcc = {};
                    objAcc.Type = "Accessory";
                    objAcc.Action = "Add";
                    objAcc.Name = "APP Contract";
                    objAcc.Category = "Accessory";
                    objAcc.Contract__Amount = parseFloat(selAcc[0].rrpingst).toFixed(2);
                    objAcc.Contract__Amount__Override = 0;
                    objAcc.Contract__End__Date = "";
                    objAcc.Contract__Start__Date = "";
                    objAcc.IMEI = "";
                    objAcc.Monthly__Repayment = parseFloat(Number(selAcc[0].rrpingst) / Number($(".vha-sc-acces-payterm-btns .vha-sc-pp-btn-active").attr('term'))).toFixed(2);
                    objAcc.Number__of__Accessories = 1;
                    objAcc.Prepayment__Amount = 0;
                    objAcc.Term = Number($(".vha-sc-acces-payterm-btns .vha-sc-pp-btn-active").attr('term'));
                    objAcc.Term__Override = "_";
                    objAcc.Total__Accessories__RRP__Inc__GST = parseFloat(selAcc[0].rrpingst).toFixed(2);
                    objAcc.Accessory__Name = $('#sc-accname-search').val();
                    objAcc.Accessory__Code = selAcc[0].prodcd;
                    objAcc.Accessory__RRP__Exc__GST = parseFloat(selAcc[0].rrpexgst).toFixed(2);
                    objAcc.Accessory__RRP__Inc__GST = parseFloat(selAcc[0].rrpingst).toFixed(2);
                    objAcc.RemTerm = "";
                    // Accessory device Payterm Validation DEC 12
                    if (objAcc.Accessory__Name != "" && !isNaN(objAcc.Term)) {
                        $(".vha-sc-access-table-main").removeClass("VHASCDisplayNone");
                        $("#vha-sc-accessory-table").append(accessoryListDiv(objAcc));
                        currentRLI.AccItem.push(objAcc);
                        resetAccessories();
                        $('#vha-sc-cart-Accessorycost').text("$" + parseFloat(currentRLI.AccItem.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.Monthly__Repayment) || 0), 0)).toFixed(2));
                    } else {
                        //alert("Please select model");
                        if (objAcc.Accessory__Name == "") {
                            $('#vha-sc-acc-model-reason').text("Please Select the Accessory").removeClass("VHASCDisplayNone");
                        }
                        if (isNaN(objAcc.Term)) {
                            $('#vha-sc-acc-payterm-reason').text("Please Select the Payterm").removeClass("VHASCDisplayNone");
                        }
                    }
                });

                //accessories remove button
                $("#vha-sc-accessory-table").off("click").on("click", "button", function () {
                    var removeprodcd = $(this).attr("productcd");
                    //json remove
                    currentRLI.AccItem = currentRLI.AccItem.filter(function (item) {
                        return item.Accessory__Code != removeprodcd;
                    });
                    $(this).parent().parent().remove();
                    tssleep(30).then(() => {
                        resetAccessories();
                        if ($('.vha-sc-acc-NCIdrecLines').length <= 0)
                            $(".vha-sc-access-table-main").addClass("VHASCDisplayNone");
                        $('#vha-sc-cart-Accessorycost').text("$" + parseFloat(currentRLI.AccItem.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.Monthly__Repayment) || 0), 0)).toFixed(2));
                        //$('div[productcd="HSAMGW5PRO45BLK"]').remove();
                    });
                });

                $(".vha-sc-in-roaming").on("click", ".vha-sc-config-roam", {}, function () {
                    currentRLI.RoamingProduct = $('input[type=radio][name=intern-roam]:checked').attr('value') !== "Off" ? $('input[type=radio][name=intern-roam]:checked').attr('value') : "";
                });
                //restricted discount - start
                $("#vha-sc-subs-dis").on("change", function () {
                    if ($(this).prop('checked')) {
                        $("#vha-sc-subs-dis-amt").prop('disabled', false);
                        $("#vha-sc-feature-config-termrestdisc1").prop('disabled', false);
                        var credit = {};
                        credit.Action = "Add"
                            credit.Type = "Credit";
                        credit.UIType = "DollarCredit";
                        credit.Name = "Subscription $ Discount";
                        currentRLI.CreditItem.push(credit);
                    } else {
                        $("#vha-sc-subs-dis-amt").val("");
                        $("#vha-sc-feature-config-termrestdisc1").val("");
                        $("#vha-sc-subs-dis-amt").prop('disabled', true);
                        $("#vha-sc-feature-config-termrestdisc1").prop('disabled', true);
                        currentRLI.CreditItem = currentRLI.CreditItem.filter(function (item) {
                            return item.UIType != "DollarCredit";
                        });
                    }
                    calcManualDiscount();
                });
                $("#vha-sc-vip-dis").on("change", function () {
                    if ($(this).prop('checked')) {
                        $("#vha-sc-vip-dis-amt").prop('disabled', false);
                        $("#vha-sc-feature-config-termrestdisc2").prop('disabled', false);
                        var credit = {};
                        credit.Action = "Add"
                            credit.Type = "Credit";
                        credit.UIType = "PercentCredit";
                        credit.Name = "Subscription % Discount";
                        currentRLI.CreditItem.push(credit);
                    } else {
                        $("#vha-sc-vip-dis-amt").val("");
                        $("#vha-sc-feature-config-termrestdisc2").val("");
                        $("#vha-sc-vip-dis-amt").prop('disabled', true);
                        $("#vha-sc-feature-config-termrestdisc2").prop('disabled', true);
                        currentRLI.CreditItem = currentRLI.CreditItem.filter(function (item) {
                            return item.UIType != "PercentCredit";
                        });
                    }
                    calcManualDiscount();
                });
                $('#vha-sc-subs-dis-amt').on('focusout', function () {
                    var objArray = currentRLI.CreditItem.filter(function (item) {
                        return item.UIType == "DollarCredit";
                    });
                    var amt = Number($(this).val());
					if (objArray.length > 0)
                        objArray[0].Price = parseFloat(amt).toFixed(2);
                    calcManualDiscount();
                });
                $('#vha-sc-vip-dis-amt').on('focusout', function () {
                    var objArray = currentRLI.CreditItem.filter(function (item) {
                        return item.UIType == "PercentCredit";
                    });
					var amt = Number($(this).val());
                    if (objArray.length > 0)
                        objArray[0].UIPercent = parseFloat($(this).val());
                    objArray[0].Price = parseFloat(parseFloat(currentRLI.PlanItem.Price) * parseFloat(amt) / 100).toFixed(2);
                    calcManualDiscount();
                });
                $("#vha-sc-feature-config-termrestdisc1").on("focusout", function () {
                    var objArray = currentRLI.CreditItem.filter(function (item) {
                        return item.UIType == "DollarCredit";
                    });
                    if (objArray.length > 0)
                        objArray[0].Period = $(this).val();
                });
                $("#vha-sc-feature-config-termrestdisc2").on("focusout", function () {
                    var objArray = currentRLI.CreditItem.filter(function (item) {
                        return item.UIType == "PercentCredit";
                    });
                    if (objArray.length > 0)
                        objArray[0].Period = $(this).val();
                });

                //Trade IN/out
                $('#vha-sc-trade-termrestdisc').autocomplete({
                    source: termPeriod.map(function (a) {
                        return {
                            label: a,
                            value: a,
                            type: "Term"
                        };
                    }),
                    minLength: 0,
                    select: selectAutoCompleteVal
                });
                $('.vha-sc-trade-termrestdisc-drop-down').click(dropDownTrigger);
                $('.vha-sc-trade-txtbox, #vha-sc-trade-termrestdisc').on('focusout', function () {
                    if ($('.vha-sc-trade-txtbox').val() != "" && $('#vha-sc-trade-termrestdisc').val() != "") {
                        currentRLI.TradeItem.Action = "Add";
                        currentRLI.TradeItem.Name = "Trade In and Out";
                        currentRLI.TradeItem.ProdIntegrationId = "";
                        currentRLI.TradeItem.Type = "TradeIn";
                        currentRLI.TradeItem.Period = $('#vha-sc-trade-termrestdisc').val();
                        currentRLI.TradeItem.Price = parseFloat(Number($('.vha-sc-trade-txtbox').val())).toFixed(2);
						$(".vha-sc-cart-tradeincost").text("$" + parseFloat(Number(currentRLI.TradeItem.Price/currentRLI.TradeItem.Period)).toFixed(2));
                    } else {
                        currentRLI.TradeItem.Action = "";
                        currentRLI.TradeItem.Name = "";
                        currentRLI.TradeItem.ProdIntegrationId = "";
                        currentRLI.TradeItem.Type = "";
                        currentRLI.TradeItem.Period = "";
                        currentRLI.TradeItem.Price = "";
						$(".vha-sc-cart-tradeincost").text("$0.00");
                    }
                });

                $('#vha-sc-pre-pay-amt-inp').on('focusout', function () {
                    //if (validateUI('Prepayment')) { //TULASIY:20Dec2023::IRC-58
                    if ($("#vha-sc-pre-pay-amt-inp").val() > 1000) {
                        alert("Prepayment amount cannot be greater than 1000");
                        var toReturn = false;
                    } else {
                        scJson.QuoteHeader.Prepayment.PrepaymentAmt = parseFloat(Number($(this).val())).toFixed(2);
                        scJson.QuoteHeader.Prepayment.PrepaymentUpd = "Y";
                        adjustPrepayment();
                        $('#vha-sc-pre-pay-prim-dev').text("$" + parseFloat(TotalEquipmentLimit().ndvcPrepaymentAmt).toFixed(2));
                        $('#vha-sc-pre-pay-waerbles').text("$" + parseFloat(TotalEquipmentLimit().nsdPrepaymentAmt).toFixed(2));
                        $('#vha-sc-pre-pay-accessory').text("$" + parseFloat(TotalEquipmentLimit().naccPrepaymentAmt).toFixed(2));
                    }
                    //}
                });
                //restricted discount - end
                /*start - Journey trigger points*/
                /*New Customer*///BM
                $("#vha-sc-submitnewcust-dtls").on("click", function () {
                    // create JSON structure
                    scJson = "";
                    //console.log("vha-sc-submitnewcust-dtls");
                    jsonHandler('NewJson', {});
                    var newCustDtls = scJson.QuoteHeader.NewCustDtls;
                    var sNextView = "Y";
                    $(".vha-sc-bldnewpln-cust-dtls .vha-sc-btn-div").each(function (index) {
                        switch ($(this).find('span').text()) {
                        case "Email Id":
                            var regex = /^(?=.{1,64}$)([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            if (!regex.test($(this).find(':input').val()) && $(this).find(':input').val() != "") {
                                sNextView = "N";
                                alert("Please enter valid Email Id");
                                return;
                            }
                            newCustDtls.EmailAddress = $(this).find(':input').val() != "" ? $(this).find(':input').val() : "";
                            break;
                            /*case "Mobile No":
                            var regex = /^(612|613|614|617|618)+[0-9]{8}$/;
                            if (!regex.test($(this).find(':input').val()) && $(this).find(':input').val() != "") {
                            sNextView = "N";
                            alert("Please enter valid MSISDN");
                            return;
                            } else {
                            newCustDtls.MobileNumber = $(this).find(':input').val() != "" ? $(this).find(':input').val() : "N/A";
                            }
                            break;*/
                        case "Receive Marketing Info & Further Contact":
                            if (($("#vha-sc-MarketingInfo").prop("checked")))
                                newCustDtls.ReceiveMarketingInfo = "Y";
                            else
                                newCustDtls.ReceiveMarketingInfo = "N";
                            break;
                        case "Inquiry about the quote":
                            if (($("#vha-sc-Inquiry").prop("checked")))
                                newCustDtls.Inquiry = "Y";
                            else
                                newCustDtls.Inquiry = "N";
                            break;
                        case "First Name":
                            newCustDtls.FirstName = $(this).find(':input').val();
                            break;
                        case "Last Name":
                            //newCustDtls.LastName = $(this).find(':input').val();
                            newCustDtls.LastName = $(this).find(':input').val() != "" ? $(this).find(':input').val() : "";
                            break;
                        }
                    });
                    for (var property in newCustDtls) {
                        if (newCustDtls.hasOwnProperty(property)) {
                            //console.log(property + ": " + newCustDtls[property]);
                            if (property == "FirstName" && newCustDtls[property] == "") {
                                sNextView = "N";
                                alert("Please provide First Name before proceeding");
                                break;
                            }
                        }
                    }
                    if (sNextView == "Y") {
                        $(".vha-sc-newcust-applet").addClass("VHASCDisplayNone");
                        $(".vha-sc-coveragechk-applet").removeClass("VHASCDisplayNone");
                        $(".vha-sc-frstname-val").val("");
                        $(".vha-sc-lstname-val").val("");
                        $(".vha-sc-emailid-val").val("");
                        $(".vha-sc-mobno-val").val("");
                        $("#vha-sc-MarketingInfo").prop("checked", false);
                        $("#vha-sc-Inquiry").prop("checked", false);
                        createGuidedFlow();
                        jsonHandler('Set-NewCustomer-NewService', {});
                        $("#salescalclandpage").addClass('VHADisplayNone');
                    }
                });

                /*Existing customer - Upgrade Service button from existing customer view*/// BM
                $(".vha-sc-exiAccBanList").off("click").on("click", "button.vha-sc-upgradeServiceBtn", function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        $("#salescalclandpage").addClass('VHADisplayNone');
                        //$(".vha-sc-extcustomerdtls").addClass("VHASCDisplayNone");
						$(".vha-sc-extcustomerdtlsMaindiv").addClass("VHASCDisplayNoneimp"); // Hari may 3 2024
                        $(".vha-sc-upgrade-buttons").removeClass("VHASCDisplayNone");
                        $(".vha-sc-coveragechk-applet").removeClass("VHASCDisplayNone");
                        $("#salescalclandpage").addClass('VHADisplayNone');
                        var AssetId = $(this).attr('assetrowid');
						var msisdn = $(this).attr('msisdn');
                        jsonHandler('Set-ExistingCustomer-Upgrade', {
                            AssetId: $(this).attr('assetrowid'),
							msisdn: $(this).attr('msisdn')
                        });
                        //Set asset id to json RLI
                        getExistingCustomerDetails('UpdateService');
                        copyExtServicetoJSON(AssetId);
                        createGuidedFlow();
                        //alert($(this).attr('assetrowid'));
                        $("#maskoverlay").styleHide();
                    });
                }).on("click", "input.vha-sc-checkbox-click", function () { //Fetch asset details on radio button click from existing customer view
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        var AssetId = $(this).attr('asset-rowId');
                        getExistingSeledtedServiceDetails(AssetId);
                        DisplayContractDetails(AssetId, "ExtCustView");
                        $("#maskoverlay").styleHide();
                    });
                });
				// Hari may 3 2024
				$("#vha-sc-existingCustShowQuotes").on("click", function () {
					$("#ExistingMSIDNList").addClass('VHADisplayNone');
					 SiebelApp.S_App.SetProfileAttr("BANQuote", scJson.QuoteHeader.ExistingCustDtls.BillingAccountId);
					SiebelApp.S_App.GetActiveView().GetApplet("VHA Sales Calc Billing Quote List Applet").InvokeMethod("RefreshBuscomp");
					$(".reviewsum1").removeClass("VHASCDisplayNone");
					$(this).addClass("vha-sc-totalNewbtn-disable");
					$("#vha-sc-existingCustShowContract").removeClass("vha-sc-totalNewbtn-disable");
					//SiebelApp.S_App.SetProfileAttr("BANQuote", "");
				 });
				$("#vha-sc-existingCustShowContract").on("click", function () {
					$("#ExistingMSIDNList").removeClass('VHADisplayNone');
					$(".reviewsum1").addClass("VHASCDisplayNone");
					$(this).addClass("vha-sc-totalNewbtn-disable");
					$("#vha-sc-existingCustShowQuotes").removeClass("vha-sc-totalNewbtn-disable");
				 });
                /*Existing Customer - New service from existing customer view*/// BM
                $("#vha-sc-existingCustNew").on("click", function () {
                    $("#salescalclandpage").addClass('VHADisplayNone');
                    //$(".vha-sc-extcustomerdtls").addClass("VHASCDisplayNone");
					$(".vha-sc-extcustomerdtlsMaindiv").addClass("VHASCDisplayNoneimp"); // Hari may 3 2024
                    $(".vha-sc-upgrade-buttons").removeClass("VHASCDisplayNone");
                    $(".vha-sc-coveragechk-applet").removeClass("VHASCDisplayNone");
                    $("#salescalclandpage").addClass('VHADisplayNone');
                    $(".vha-sc-ExistingContractsSum").addClass('VHASCDisplayNone');
                    jsonHandler('Set-ExistingCustomer-NewService', {});
                    //Set asset id to json RLI
                    getExistingCustomerDetails('UpdateService');
                    createGuidedFlow();
                });

                /* Existing Customer - Upgrade Service from CART SUMMARY PANEL (existing service secion) upgrade button - Applicable for Existing customer*///BM
                /*$(".vha-sc-ExistingServicesSum").off("click").on("click", "button.vha-sc-upgradeMnpApp", function () {
                //$(".vha-sc-upgradeMnpApp").on("click", function () {
                //scJson.QuoteHeader.QuoteType = "Upgrade";
                var AssetId = $(this).attr('Id');
                getExistingSeledtedServiceDetails(AssetId); //Tulasi
                DisplayContractDetails(AssetId, "ExtCartSummary"); //Tulasi
                });*/
                //Apply Promo Code - 04JAN2024
                $("#vha-sc-ApplyPromoCode").on("click", function () {
                    $('.vha-sc-invPromo').hasClass("VHASCDisplayNone") == true ? "" : $('.vha-sc-invPromo').addClass("VHASCDisplayNone");
					var sInpPromo = $(".vha-sc-PromoCodeInput").val();
					$(".vha-sc-PromoCodeInput").prop("disabled", true);
					$('#vha-sc-RevertPromoCode').hasClass("VHASCDisplayNone") == true ? $('#vha-sc-RevertPromoCode').removeClass("VHASCDisplayNone") : "";
					$(this).hasClass("VHASCDisplayNone") == true ? "" : $(this).addClass("VHASCDisplayNone");
                    applyPromo(sInpPromo);
                });
				$("#vha-sc-RevertPromoCode").on("click", function () {                    
					$(".vha-sc-PromoCodeInput").prop("disabled", false);
					$('#vha-sc-ApplyPromoCode').hasClass("VHASCDisplayNone") == true ? $('#vha-sc-ApplyPromoCode').removeClass("VHASCDisplayNone") : "";
					$(this).hasClass("VHASCDisplayNone") == true ? "" : $(this).addClass("VHASCDisplayNone");
					$(".vha-sc-PromoCodeInput").val("");
                    applyPromo('');
					currentRLI.Promo ="";
					$('.vha-sc-invPromo').hasClass("VHASCDisplayNone") == true ? "" : $('.vha-sc-invPromo').addClass("VHASCDisplayNone");
                });
                $("#vha-sc-nbaofferbtn").on("click", function () {
                    nbaOfferRetrive();
                });
                /*Add New Service from CART SUMMARY PANEL new button - Applicable for New customer and Existing customer *///BM
                $(".vha-sc-totalNewbtn").on("click", function () {
                    if (validateUI("New")) {
                        jsonHandler('AddRLI', {});
                        cartRLIupdate();
                        resetCartSummaryUI('New');
                        resetUpgWarningUI();
						resetTiles();
                        $('.vha-sc-upgrade-buttons').hasClass("VHASCDisplayNone") == false ? $('.vha-sc-upgrade-buttons').addClass("VHASCDisplayNone") : "";
                    }
                });

                /*End - Journey trigger points*/
                // cart summary save-rli
                $("#vha-sc-save-rli").on("click", function () {
					//Dev and plan change Rushi - 18JAN2024
					//alert("Current Device Stock Check Availability Status is from Logistics, Please check the stock availability in store to place the order.");
                   if(pegaflag === "Y" && selectedplanTxt === "Recommendations"){
					   currentRLI.pegaflag = "Y";
					   currentRLI.pegaplandetails = pegaoffDataGlob;
				   }
				   pegaflag = "N";
				   selectedplanTxt = "";
				   $('.vha-sc-btn-div-payment').hasClass("VHASCDisplayNone") == true ? $('.vha-sc-btn-div-payment').removeClass("VHASCDisplayNone") : "";
					$("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        if (validateUI("Save")) {
                            if($('.vha-sc-invPromo').hasClass("VHASCDisplayNone") == true && $(".vha-sc-PromoCodeInput").val() != "" && $('#vha-sc-RevertPromoCode').hasClass("VHASCDisplayNone") == false){
								currentRLI.Promo = $(".vha-sc-PromoCodeInput").val();
							}
							resetCartSummaryUI('Save');
                            resetUpgWarningUI();
							resetTiles();
                            $('.vha-sc-upgrade-buttons').hasClass("VHASCDisplayNone") == false ? $('.vha-sc-upgrade-buttons').addClass("VHASCDisplayNone") : "";
                            $(".vha-sc-existingcontracts-main").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-sc-existingcontracts-main").addClass("VHASCDisplayNone");
                            if (currentRLI.DeviceIns != "") {
                                var currectDvc = currentRLI.DeviceItem.filter(function (item) {
                                    return item.Action == "Add";
                                });
                                if (currectDvc.length > 0) {
                                    currectDvc[0].Insurance = "Vodafone Device Care";
                                    currectDvc[0].InsPri = "15.00";
                                }
                            }							
                            currentRLI.Mode = "Saved";
                            cartRLIupdate();							
                        }
                        $("#maskoverlay").styleHide();
                    });
                });			
				
				
                // cart summary cancel-rli
                $("#vha-sc-cancel-rli").on("click", function () {
                    //delete edit mode RootItem
                    $('.vha-sc-btn-div-payment').hasClass("VHASCDisplayNone") == true ? $('.vha-sc-btn-div-payment').removeClass("VHASCDisplayNone") : "";
					scJson.QuoteHeader.RootItem = scJson.QuoteHeader.RootItem.filter(function (item) {
                        return item.Mode !== "Edit";
                    });
                    currentRLI = "";
                    cartRLIupdate();
                    resetCartSummaryUI('Cancel');
                    resetUpgWarningUI();
					resetTiles();
                    $('.vha-sc-upgrade-buttons').hasClass("VHASCDisplayNone") == false ? $('.vha-sc-upgrade-buttons').addClass("VHASCDisplayNone") : "";
                    $(".vha-sc-existingcontracts-main").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-sc-existingcontracts-main").addClass("VHASCDisplayNone");
                });

                $("#smartwizard").on("showStep", function (e, currIndex, stepNum, stepDir) {
                    $('.siebui-view').hasClass('scmainbgcolor') == true ? $('.siebui-view').removeClass('scmainbgcolor') : $('.siebui-view').addClass('scmainbgcolor');
                    if (stepDir == "" && stepNum === 0) {
                        $(".vha-sc-nbnaddr-val").attr("readonly", true); //vasavi added for NBN Address
                        $(".vha-sc-nbnloc-val").attr("readonly", true); //vasavi added for NBN Address
                        $("#vha-sc-nbngo-btn").attr("disabled", true); //vasavi added for NBN Address
                        $(".vha-sc-nbnloc-val").hasClass("vha-input-bg-readonly") == true ? "" : $(".vha-sc-nbnloc-val").addClass("vha-input-bg-readonly");
                        $(".vha-sc-nbnaddr-val").hasClass("vha-input-bg-readonly") == true ? "" : $(".vha-sc-nbnaddr-val").addClass("vha-input-bg-readonly");
                        if (scJson.QuoteHeader.SessionId == "") {
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                            Inputs.SetProperty("Service Name", "VHA Sales Calculator BS");
                            Inputs.SetProperty("Method Name", "CreateSessionHeader");
                            var Output = ser.InvokeMethod("Run Process", Inputs);
                            var resultset = Output.GetChildByType("ResultSet");
                            scJson.QuoteHeader.SessionId = resultset['propArray']['SessionId'];
                        }
                    }
                    if (stepDir === "forward") {
                        switch (stepNum) {
                        case 0:
                            //debugger;
                            break;
                        case 1:
                            $(".vha-sc-all-guidedtabs").removeClass("VHASCDisplayNone");
                            getDeviceData();
                            setUI();
                            if (scJson.QuoteHeader.CustomerType != "Existing") {
                                //$(".vha-sc-ExistingCustCartSumPanel").addClass("VHASCDisplayNone");
                                $(".vha-sc-existingservices-main").addClass("VHASCDisplayNone");
                                $(".vha-sc-existingcontracts-main").addClass("VHASCDisplayNone");
                                //var sCartSumcustDtlsHTML = '<span></span><div> First Name<br>Last Name <br>Email <br>Quote Number</div><div class="vha-sc-aligncartcustSpanDiv"><span id = "vha-sc-cartsumcustfirstname">' + scJson.QuoteHeader.NewCustDtls.FirstName + '</span><br><span id = "vha-sc-cartsumcustlastname">' + scJson.QuoteHeader.NewCustDtls.LastName + '</span><br><span id = "vha-sc-cartsumcustemail">' + scJson.QuoteHeader.NewCustDtls.EmailAddress + '</span><br><span id = "vha-sc-cartsumcustquote"></span></div>';
                                var sCartSumcustDtlsHTML = '<span></span><div> First Name<br>Last Name <br>Email</div><div class="vha-sc-aligncartcustSpanDiv"><span id = "vha-sc-cartsumcustfirstname">' + scJson.QuoteHeader.NewCustDtls.FirstName + '</span><br><span id = "vha-sc-cartsumcustlastname">' + scJson.QuoteHeader.NewCustDtls.LastName + '</span><br><span id = "vha-sc-cartsumcustemail">' + scJson.QuoteHeader.NewCustDtls.EmailAddress + '</span></div>'; //TULASIY:Dec21::IRC-52
                                $('.vha-sc-customerDetails').html(sCartSumcustDtlsHTML);
                            } else if (scJson.QuoteHeader.CustomerType == "Existing" && scJson.QuoteHeader.QuoteJourney == "Connect") {
                                $(".vha-sc-existingcontracts-main").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-sc-existingcontracts-main").addClass("VHASCDisplayNone");
                            }

                            //state change
                            //changeUIState();
                            intervalId = setInterval(changeUIState, 500);
                            //console.log("setInterval--" + intervalId);
                            cartRLIupdate();
                            //Quote Header creation
                            if (scJson.QuoteHeader.QuoteId == "") { //Quote creation turned off BM
                                var Inputs = SiebelApp.S_App.NewPropertySet();
                                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                Inputs.SetProperty("Service Name", "VHA Sales Calculator BS");
                                Inputs.SetProperty("Method Name", "CreateQuoteHeader");
                                Inputs.SetProperty("VFDealerRowId", "");
                                Inputs.SetProperty("VFSalesChannelDescription", "");
                                Inputs.SetProperty("VFSalesBranchDescription", "");
                                Inputs.SetProperty("DealerName", "");
                                Inputs.SetProperty("LoginId", SiebelApp.S_App.GetProfileAttr("Id"));
                                Inputs.SetProperty("SessionId", scJson.QuoteHeader.SessionId);
                                if (scJson.QuoteHeader.CustomerType == "New") {
                                    Inputs.SetProperty("FName", scJson.QuoteHeader.NewCustDtls.FirstName);
                                    Inputs.SetProperty("LName", scJson.QuoteHeader.NewCustDtls.LastName);
                                    Inputs.SetProperty("EmailId", scJson.QuoteHeader.NewCustDtls.EmailAddress);
                                    //Inputs.SetProperty("MobileNo", scJson.QuoteHeader.NewCustDtls.MobileNumber);
                                    Inputs.SetProperty("MarketingFurtherContact", scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo);
                                    Inputs.SetProperty("Inquiry", scJson.QuoteHeader.NewCustDtls.Inquiry);
                                }
                                if (scJson.QuoteHeader.CustomerType == "Existing") {
                                    Inputs.SetProperty("ExistingCustomerName", scJson.QuoteHeader.ExistingCustDtls.CustomerName);
                                    Inputs.SetProperty("EmailId", scJson.QuoteHeader.ExistingCustDtls.EmailAddress);
                                    Inputs.SetProperty("MobileNo", scJson.QuoteHeader.ExistingCustDtls.MobileNumber);
                                    Inputs.SetProperty("AccountId", scJson.QuoteHeader.ExistingCustDtls.CustomerId);
                                    Inputs.SetProperty("BillingAccountId", scJson.QuoteHeader.ExistingCustDtls.BillingAccountId);
                                }
                                var Output = ser.InvokeMethod("Run Process", Inputs);
                                var resultset = Output.GetChildByType("ResultSet");
                                scJson.QuoteHeader.QuoteNumber = resultset['propArray']['Quote Number'];
                                $("#vha-sc-cartsumcustquote").text(resultset['propArray']['Quote Number']); //DEC 12
                                //scJson.QuoteHeader.SessionId = resultset['propArray']['SessionId'];
                                scJson.QuoteHeader.QuoteId = resultset['propArray']['QuoteId'];
                            }
							/*var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
							var Inputs = SiebelApp.S_App.NewPropertySet();
							Inputs.SetProperty("Service Name", "VHA Sales Calculator BS");
							Inputs.SetProperty("Method Name", "CreateQuoteAddress");
							Inputs.SetProperty("QuoteId", scJson.QuoteHeader.QuoteId);
							Inputs.SetProperty("PostalDeliveryType",sAddr.address.properties.postal_delivery_type);
							Inputs.SetProperty("ComplexUnitType",sAddr.address.properties.complex_unit_type);
							Inputs.SetProperty("ComplexUnitIdentifier",sAddr.address.properties.complex_unit_identifier);
							Inputs.SetProperty("ComplexLevelType",sAddr.address.properties.complex_level_type);
							Inputs.SetProperty("ComplexLevelNumber",sAddr.address.properties.complex_level_number);
							Inputs.SetProperty("SiteName",sAddr.address.properties.site_name);
							Inputs.SetProperty("StreetNumber1",sAddr.address.properties.street_number_1);
							Inputs.SetProperty("StreetNumber2",sAddr.address.properties.street_number_2);
							Inputs.SetProperty("StreetTypeDesc",sAddr.address.properties.street_type_description);
							Inputs.SetProperty("LotIdentifier",sAddr.address.properties.lot_identifier);
							Inputs.SetProperty("StreetName",sAddr.address.properties.street_name);
							Inputs.SetProperty("LocalityName",sAddr.address.properties.locality_name);;
							Inputs.SetProperty("StateTerritory",sAddr.address.properties.state_territory);
							Inputs.SetProperty("PostCode",sAddr.address.properties.postcode);
							Inputs.SetProperty("AddressIdentifier",sAddr.address.properties.address_identifier);
							Inputs.SetProperty("PostalDeliveryNumber",sAddr.address.properties.postal_delivery_number);
							Inputs.SetProperty("FormattedAddress",sAddr.address.properties.formatted_address);
							var Output = ser.InvokeMethod("Run Process", Inputs);*/
							var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
							var Inputs = SiebelApp.S_App.NewPropertySet();
							Inputs.SetProperty("Service Name", "VHA Sales Calculator BS");
							Inputs.SetProperty("Method Name", "QuoteStatusUpdate");
							Inputs.SetProperty("QuoteStatus", "");
							Inputs.SetProperty("QuoteId", scJson.QuoteHeader.QuoteId);
							Inputs.SetProperty("SessionId", scJson.QuoteHeader.SessionId);
							Inputs.SetProperty("SessionSts", "");
							Inputs.SetProperty("QuoteEmail", "");
							Inputs.SetProperty("QuoteReceiveFlg", "");
							Inputs.SetProperty("QuoteInqFlg", "");
							Inputs.SetProperty("Address", sAddr);
							var Output = ser.InvokeMethod("Run Process", Inputs);
                            break;
                        case 2:
                            //$(".vha-sc-prepayment-st").removeClass("VHASCDisplayNone"); //inactivated for prepayment hide
							$('#vha-sc-prev')[0].disabled = true;
                            $('#vha-sc-qsubmit')[0].disabled = true;
                            break;
                        /*case 3:
                            //alert("showStep forward case 2");                            
                            break;*/
                        }
                    }
                    if (stepDir === "backward") {
                        switch (stepNum) {
                        case 0:
                            //alert("showStep backward case 0");
                            break;
                        case 1:
                            //alert("showStep backward case 1");
                            //state change
                            //changeUIState();
                            intervalId = setInterval(changeUIState, 500);
                            //console.log("setInterval--" + intervalId);
                            break;
                        case 2:
                            //alert("showStep backward case 2");
                            break;
                        /*case 3:
                            //alert("showStep backward case 2");
                            break;*/
                        }
                    }
                    $('#_sweview').scrollTop(0);
                });
                $("#smartwizard").on("leaveStep", function (e, currIndex, stepNum, stepDir) {
                    $('.siebui-view').hasClass('scmainbgcolor') == true ? $('.siebui-view').removeClass('scmainbgcolor') : $('.siebui-view').addClass('scmainbgcolor');
                    if (stepDir === "forward") {
                        switch (stepNum) {
                        case 0:
                            //alert("leaveStep forward case 0");
                            break;
                        case 1:
                            //alert("leaveStep forward case 1");
							if (validateUI('DevicetoPrepayment')) {
                                bundleSave();
                                //cartRLIupdate();
                                //return true;
                            //} else
                                //return false;
                            //break;
                        //case 2:
                            //if (validateUI('Prepayment')) {
                                
                                scJson.QuoteHeader.Prepayment.PrepaymentAmt = parseFloat(Number($("#vha-sc-pre-pay-amt-inp").val())).toFixed(2);
                                scJson.QuoteHeader.Prepayment.PrepaymentUpd = "Y";
                                adjustPrepayment();
                                $('#vha-sc-pre-pay-prim-dev').text("$" + parseFloat(TotalEquipmentLimit().ndvcPrepaymentAmt).toFixed(2));
                                $('#vha-sc-pre-pay-waerbles').text("$" + parseFloat(TotalEquipmentLimit().nsdPrepaymentAmt).toFixed(2));
                                $('#vha-sc-pre-pay-accessory').text("$" + parseFloat(TotalEquipmentLimit().naccPrepaymentAmt).toFixed(2));
                                /*END::TULASIY:20Dec2023::IRC-58*/
								if(scJson.QuoteHeader.CustomerType == "New")//vasavi added
								{
									$("#vha-sc-Email").val(scJson.QuoteHeader.NewCustDtls.EmailAddress);
									if(scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo == "Y")
										$("#vha-sc-MarketingInfo").prop("checked",true);
									if(scJson.QuoteHeader.NewCustDtls.Inquiry == "Y")
										$("#vha-sc-Inquiry").prop("checked",true);
								}
								else
								{
									$("#vha-sc-Email").val(scJson.QuoteHeader.ExistingCustDtls.EmailAddress);
									if(scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo == "Y")
										$("#vha-sc-MarketingInfo").prop("checked",true);
									if(scJson.QuoteHeader.ExistingCustDtls.Inquiry == "Y")
										$("#vha-sc-Inquiry").prop("checked",true);
								}//end vasavi added
                                try {
                                    scJson.QuoteHeader.OneTimeCost = parseFloat(currentRLI.OtpItem.filter(item => item.Action === "Add" && item.Name != "Prepayment").reduce((sum, item) => sum + (Number(item.Price) || 0), 0)).toFixed(2);
                                } catch (e) {
                                    scJson.QuoteHeader.OneTimeCost = "0.00";
                                }
                                cartRLIupdate();
                                clearInterval(intervalId);
                                //console.log("clearInterval--" + intervalId);
                                $("#TSOrderStatusMsg").text("Quote Line Item creation in progress, please wait...");
                                //QuoteSummary Line Item creation
                                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                var Inps = SiebelApp.S_App.NewPropertySet();
                                Inps.SetProperty("Service Name", "PRM ANI Utility Service");
                                Inps.SetProperty("Method Name", "CreateEmptyPropSet");
                                Inps.SetProperty("Hierarchy Name", "VHA Sales Calculator Quote IO");
                                var out = ser.InvokeMethod("Run Process", Inps);
                                var SiebelMessage = out.GetChildByType("ResultSet").GetChildByType("SiebelMessage");
                                SiebelMessage = mSetQuoteHeader(SiebelMessage);

                                SiebelMessage = mCreateQuoteLineItems(SiebelMessage, SiebelApp.S_App.NewPropertySet());

                                //console.log(SiebelMessage);
                                var processMessage = SiebelMessage;
                                var jsonObj = {};
                                jsonObj = GetPropertyToJson(processMessage);
                                var strjsonObj = JSON.stringify(jsonObj);
                                //console.log("1:" + strjsonObj);

                                jsonObj["ListOfVHA Sales Calculator Quote IO"] = {};
                                var QuoteHeader = processMessage.GetChild(0).GetChild(0);
                                var QuoteHeaderCount = QuoteHeader.GetChildCount();
                                var siebJson = jsonObj["ListOfVHA Sales Calculator Quote IO"];
                                siebJson[QuoteHeader.GetType()] = GetPropertyToJson(QuoteHeader);
                                var RootItemJson = siebJson[QuoteHeader.GetType()];
                                RootItemJson["ListOfRootItem"] = {};
                                var RootItems;
                                if (RootItems = QuoteHeader.GetChildByType("ListOfRootItem")) {
                                    var RootItemCount = RootItems.GetChildCount();
                                    RootItemJson["ListOfRootItem"]["RootItem"] = [];
                                    for (var i = 0; i < RootItemCount; i++) {
                                        var QuoteItemJson = GetPropertyToJson(RootItems.GetChild(i));
                                        QuoteItemJson["ListOfQuoteItem"] = {};
                                        var QuoteItemCount = RootItems.GetChild(i).GetChild(0).GetChildCount();
                                        if (QuoteItemCount) {
                                            var QuoteItems = [];
                                            for (var j = 0; j < QuoteItemCount; j++) {
                                                var QuoteLine = RootItems.GetChild(i).GetChild(0).GetChild(j);
                                                //QuoteItems.push(GetPropertyToJson(QuoteLine));
                                                var QuoteItemChdJson = GetPropertyToJson(QuoteLine);
                                                QuoteItemChdJson["ListOfAttr"] = {};
                                                var QuoteLineChdCnt = QuoteLine.GetChild(0).GetChildCount();
                                                if (QuoteLineChdCnt) {
                                                    var Quoteattr = [];
                                                    for (var a = 0; a < QuoteLineChdCnt; a++) {
                                                        Quoteattr.push(GetPropertyToJson(QuoteLine.GetChild(0).GetChild(a)));
                                                    }
                                                    QuoteItemChdJson["ListOfAttr"]["Attr"] = Quoteattr;
                                                }
                                                QuoteItems.push(QuoteItemChdJson);
                                            }
                                            QuoteItemJson["ListOfQuoteItem"]["QuoteItem"] = QuoteItems;
                                        }
                                        RootItemJson["ListOfRootItem"]["RootItem"].push(QuoteItemJson);
                                    }
                                }
                                var strjsonObj = JSON.stringify(jsonObj);
                                //console.log("2:" + strjsonObj);

                                var ajaxSetting = {
                                    "async": true,
                                    "crossDomain": true,
                                    "url": apilovurl + "VHARestAPIWF/RunProcess",
                                    "method": "POST",
                                    "headers": {
                                        "content-type": "application/json",
                                        "cache-control": "no-cache",
                                        "postman-token": "5c1f0ef1-1226-5653-dba8-72a6c0e242c9"
                                    },
                                    "processData": false,
                                    "data": '{\r\n   "body":{\r\n      "ProcessName":"VHA Sales Calculator Quote Item Creation",\r\n      "Object Id":"' + scJson.QuoteHeader.QuoteId + '",\r\n      "SiebelMessage":' + strjsonObj + "\r\n }\r\n}"
                                };
                                $.ajax(ajaxSetting).done(function (response) {
                                    if (response["Error Code"] != "" || response["Error Message"] != "") {
                                        //console.log(response);
                                        //$("#TSOrderStatusMsg").text(response["Error Code"] + "\n" + response["Error Message"]);
										$("#TSOrderStatusMsg").html("<span class='mailerror_cross-mark'><span class='mailerror-x-cross-mark'></span></span> <span class='ml-5 sc-red'>" + response["Error Code"] + "\n" + response["Error Message"] + "</span>"); // Hari added
                                        alert(response["Error Code"] + "\n" + response["Error Message"]);
                                    } else {
                                        //$("#TSOrderStatusMsg").text("Quote Line Item created and please proceed with Submit quote.");
										$("#TSOrderStatusMsg").html("<span class='mailsent_check-mark'><span class='mail-check-mark'></span></span> <span class='ml-5'>Quote Line Item created and please proceed with Submit quote.</span>");//Hari added
                                        $('#vha-sc-qsubmit')[0].disabled = false;
										$('#vha-sc-qsubmit').removeClass('disabled');
                                        //console.log(response);
                                    }
                                    $('#vha-sc-prev')[0].disabled = false;
                                }).fail(function (response, textStatus) {
                                    //debugger;
                                    var xErrorResponse = response.responseJSON.ErrorDetail;
                                    //$("#TSOrderStatusMsg").text(xErrorResponse);
									$("#TSOrderStatusMsg").html("<span class='mailerror_cross-mark'><span class='mailerror-x-cross-mark'></span></span><span class='ml-5 sc-red'>" + xErrorResponse + "</span>");// Hari added
                                    $('#vha-sc-prev')[0].disabled = false;
                                    $('#vha-sc-qsubmit')[0].disabled = true;
                                    //console.log(response);
                                    alert(xErrorResponse);
                                });
                                $('.vha-sc-reviewsum').removeClass("VHASCDisplayNone");
                                var doc = SiebelAppFacade.VHANSASalesCalcUpgradePDFPR.createPDF(scJson, '')
                                var base64PDF = doc.output("datauristring").split(",")[1];
                                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                var Inputs = SiebelApp.S_App.NewPropertySet();
                                Inputs.SetProperty("Service Name", "VHA Sales Calculator BS");
                                Inputs.SetProperty("Method Name", "DeleteQuoteAttachment");
                                Inputs.SetProperty("Quote Id", scJson.QuoteHeader.QuoteId);
                                var Output = ser.InvokeMethod("Run Process", Inputs);
                                insertPDF(base64PDF);
                                $('#TSNSASendEmail').on("click", function () {
									//Hari added
									var email=$("#vha-sc-Email").val();
									var emailvalid = "N";
									
									//if ((scJson.QuoteHeader.CustomerType == "New" &&  email!="" && $("#vha-sc-Inquiry").prop("checked")) || ($("#vha-sc-MarketingInfo").prop("checked") && scJson.QuoteHeader.CustomerType == "Existing" &&  email!="" && $("#vha-sc-Inquiry").prop("checked"))) {
									if(email!="" && $("#vha-sc-Inquiry").prop("checked")){
										var regex = /^(?=.{1,64}$)([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
										if (regex.test(email)) {
											if (scJson.QuoteHeader.CustomerType == "New") {
												scJson.QuoteHeader.NewCustDtls.EmailAddress = email;
											}
											else{
												scJson.QuoteHeader.ExistingCustDtls.EmailAddress = email;
											}
											emailvalid = "Y";
										}
										else{
											alert("Please enter valid Email Id");
										}
										if(emailvalid === "Y")
										{
											//Vasavi added
											var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
											var Inputs = SiebelApp.S_App.NewPropertySet();
											Inputs.SetProperty("Service Name", "VHA Sales Calculator BS");
											Inputs.SetProperty("Method Name", "QuoteStatusUpdate");
											Inputs.SetProperty("QuoteStatus", "");
											Inputs.SetProperty("QuoteId", scJson.QuoteHeader.QuoteId);
											Inputs.SetProperty("SessionId", scJson.QuoteHeader.SessionId);
											Inputs.SetProperty("SessionSts", "");
											Inputs.SetProperty("Address", "");
											if (scJson.QuoteHeader.CustomerType == "New")
											{
												if (($("#vha-sc-MarketingInfo").prop("checked")))
													scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo = "Y";
												else
													scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo = "N";

												scJson.QuoteHeader.NewCustDtls.EmailAddress = $("#vha-sc-Email").val();

												if (($("#vha-sc-Inquiry").prop("checked")))
													scJson.QuoteHeader.NewCustDtls.Inquiry = "Y";
												else
													scJson.QuoteHeader.NewCustDtls.Inquiry = "N";
												
												Inputs.SetProperty("QuoteEmail", scJson.QuoteHeader.NewCustDtls.EmailAddress);
												Inputs.SetProperty("QuoteReceiveFlg", scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo);
												Inputs.SetProperty("QuoteInqFlg", scJson.QuoteHeader.NewCustDtls.Inquiry);
											}
											else
											{
												
												if (($("#vha-sc-MarketingInfo").prop("checked")))
													scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo = "Y";
												else
													scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo = "N";
													
												scJson.QuoteHeader.ExistingCustDtls.EmailAddress = $("#vha-sc-Email").val();

												if (($("#vha-sc-Inquiry").prop("checked")))
													scJson.QuoteHeader.ExistingCustDtls.Inquiry = "Y";
												else
													scJson.QuoteHeader.ExistingCustDtls.Inquiry = "N";
												
												Inputs.SetProperty("QuoteEmail", scJson.QuoteHeader.ExistingCustDtls.EmailAddress);
												Inputs.SetProperty("QuoteReceiveFlg", scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo);
												Inputs.SetProperty("QuoteInqFlg", scJson.QuoteHeader.ExistingCustDtls.Inquiry);
											}	
											var Output = ser.InvokeMethod("Run Process", Inputs);//end Vasavi added
											
											var sEmailNotify = scJson.QuoteHeader.CustomerType == "New" ? scJson.QuoteHeader.NewCustDtls.EmailAddress : scJson.QuoteHeader.ExistingCustDtls.EmailAddress;
											var sContName = scJson.QuoteHeader.CustomerType == "New" ? scJson.QuoteHeader.NewCustDtls.FirstName : scJson.QuoteHeader.ExistingCustDtls.CustomerName;
											var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
											var Inputs = SiebelApp.S_App.NewPropertySet();
											Inputs.SetProperty("ProcessName", "VHA Send Quote NSA Email WF");
											Inputs.SetProperty("Object Id", scJson.QuoteHeader.QuoteId);
											Inputs.SetProperty("QuoteNo", scJson.QuoteHeader.QuoteNumber); // TULASIY:07May2024::Created for QuoteNo Attachment Change
											Inputs.SetProperty("QuoteAttId", scJson.QuoteHeader.QuoteAttId);
											Inputs.SetProperty("ContactName", sContName);
											Inputs.SetProperty("VHAEmailAdd", sEmailNotify);
											Inputs.SetProperty("SourceBusObj", "Quote");
											var Output = ser.InvokeMethod("RunProcess", Inputs);
											$("#TSNSAEmailNotification").addClass("vha-sc-SendEmailNote"); // Hari added
											//$("#TSNSAEmailNotification").html("Email is sent to " + sEmailNotify + " successfully");
											$("#TSNSAEmailNotification").html("<span class='mailsent_check-mark'><span class='mail-check-mark'></span></span> <span class='ml-5'>Email is sent to</span> " + sEmailNotify + " successfully");
										}
									}
									else{
										  var sc_message = (email === "") ? "Please enter the Email Id" : "Please select the 'Consent to receive quote email' flag";
										  alert(sc_message);
									}
                                });
                                $('#TSNSADownload').on("click", function () {
                                    doc.save(scJson.QuoteHeader.QuoteId + '_QuotePackage');
                                });
								if(scJson.QuoteHeader.CustomerType == "Existing"){
									$('#vha-sc-MarketingInfo').prop('disabled',false);
								}else{
									$('#vha-sc-MarketingInfo').prop('disabled',true);
								}
                                break;
                            } else {
                                return false;
                            }
                        case 2:
                            //alert("leaveStep forward case 2");
                            break;
                        }
                    }
                    if (stepDir === "backward") {
                        switch (stepNum) {
                        case 0:
                            //alert("leaveStep backward case 0");
                            break;
                        case 1:
                            if (validateUI('backtoCoveragepage')) {
                                clearInterval(intervalId);
                                return true;
                            } else {
                                return false;
                            }

                            //alert("leaveStep backward case 1");
                            //clearInterval(intervalId);
                            //console.log("clearInterval--" + intervalId);
                            break;
                        case 2:
                            if (validateUI('backtoDeviceDtls')) {
                                cartRLIupdate();
                                intervalId = setInterval(changeUIState, 500);
                                return true;
                            } else {
                                return false;
                            }
                            break;
                        /*case 3:
                            //alert("leaveStep backward case 2");
                            break;*/
                        }
                    }
                });
                $("#smartwizard").on("vhacustomBtnClick", function (evt, btn) {
                    var btnId = $(btn).attr("id");
                    switch (btnId) {
                    case "vha-cancel-btn":
						$('.siebui-view').hasClass('scmainbgcolor') == true ? $('.siebui-view').removeClass('scmainbgcolor') : ""; // Hari may 3 2024
                        var result = confirm("Are you sure you want to cancel?");
                        if (result) {
                            clearInterval(intervalId);
                            var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            Inputs.SetProperty("Service Name", "VHA Sales Calculator BS");
                            Inputs.SetProperty("Method Name", "QuoteStatusUpdate");
                            Inputs.SetProperty("QuoteStatus", "Closed");
							Inputs.SetProperty("Address", "");
                            Inputs.SetProperty("QuoteId", scJson.QuoteHeader.QuoteId);
							if (scJson.QuoteHeader.CustomerType == "New")//Vasavi added
							{
								if (($("#vha-sc-MarketingInfo").prop("checked")))
									scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo = "Y";
								else
									scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo = "N";

								scJson.QuoteHeader.NewCustDtls.EmailAddress = $("#vha-sc-Email").val();

								if (($("#vha-sc-Inquiry").prop("checked")))
									scJson.QuoteHeader.NewCustDtls.Inquiry = "Y";
								else
									scJson.QuoteHeader.NewCustDtls.Inquiry = "N";
								
								Inputs.SetProperty("QuoteEmail", scJson.QuoteHeader.NewCustDtls.EmailAddress);
								Inputs.SetProperty("QuoteReceiveFlg", scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo);
								Inputs.SetProperty("QuoteInqFlg", scJson.QuoteHeader.NewCustDtls.Inquiry);
							}
							else
							{
								
								if (($("#vha-sc-MarketingInfo").prop("checked")))
									scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo = "Y";
								else
									scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo = "N";
									
								scJson.QuoteHeader.ExistingCustDtls.EmailAddress = $("#vha-sc-Email").val();

								if (($("#vha-sc-Inquiry").prop("checked")))
									scJson.QuoteHeader.ExistingCustDtls.Inquiry = "Y";
								else
									scJson.QuoteHeader.ExistingCustDtls.Inquiry = "N";
								
								Inputs.SetProperty("QuoteEmail", scJson.QuoteHeader.ExistingCustDtls.EmailAddress);
								Inputs.SetProperty("QuoteReceiveFlg", scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo);
								Inputs.SetProperty("QuoteInqFlg", scJson.QuoteHeader.ExistingCustDtls.Inquiry);
							}//end vasavi added
                            var Output = ser.InvokeMethod("Run Process", Inputs);
                            //console.log(Output);
                            nullifyVar();
                           // SiebelApp.S_App.GetActiveView().GetApplet("VHA Sales Calculator Header Applet").InvokeMethod("ExecuteQuery");
							SiebelApp.S_App.GotoView("VHA Sales Calculator View");
                        }
                        break;
                    case "vha-sc-qsubmit":
						var RLI_Length = scJson.QuoteHeader.RootItem.length;
						for (var i= 0; i< RLI_Length; i++ ){
							if(scJson.QuoteHeader.RootItem[i].pegaflag === "Y" && scJson.QuoteHeader.RootItem[i].pegaplandetails.dis_SamproductId != ""){
								let quoteid = scJson.QuoteHeader.QuoteId;
								let sessionid = scJson.QuoteHeader.SessionId;
								let plansamid = scJson.QuoteHeader.RootItem[i].pegaplandetails.SAM_Product_ID;
								let dis_samid = scJson.QuoteHeader.RootItem[i].pegaplandetails.dis_SamproductId;
								//SiebelApp.S_App.SetProfileAttr(quoteid+"|"+dis_samid+"|"+plansamid , quoteid+"|"+dis_samid+"|"+plansamid );
							    let pegadetails = scJson.QuoteHeader.RootItem[i].pegaplandetails;																																																													
							    let InteractionIdAttr = pegadetails.KeyCode+"|"+pegadetails.OfferType+"|"+pegadetails.RewardTerm+"|"+pegadetails.dis_SamproductId+"|"+pegadetails.RewardValue+"|"+pegadetails.CoexistenceFlag+"|"+pegadetails.OutcomeDateTime+"|"+pegadetails.EndDateTime+"|"+pegadetails.Source+"|"+pegadetails.StackabilityFlag+"|"+pegadetails.summary+"|"+pegadetails.RewardUOM+"|"+pegadetails.ContextID+"|"+pegadetails.interactionID+"|"+pegadetails.Label+"|"+pegadetails.SAM_Product_ID+"|"+pegadetails.Response+"|"+pegadetails.ResponseReason;
								let InteractionId =  scJson.QuoteHeader.RootItem[i].pegaplandetails.interactionID;
								
								
								var bsRespCheck = SiebelApp.S_App.GetService("VF BS Process Manager");
								var psInputs = SiebelApp.S_App.NewPropertySet();
								psInputs.SetProperty("Service Name", "VHA Pega Order Validation BS");
								psInputs.SetProperty("Method Name", "CreatePegaSCSession");
								psInputs.SetProperty("InteractionId",InteractionId );
								psInputs.SetProperty("InteractionIdAttribute", InteractionIdAttr );
								psInputs.SetProperty("OfferSAMId", dis_samid );
								psInputs.SetProperty("PlanSAMId", plansamid );
								psInputs.SetProperty("QuoteId",quoteid  );
								psInputs.SetProperty("SessionId", sessionid );
								psInputs.SetProperty("OutcomeDateTime", pegadetails.OutcomeDateTime );
								psInputs.SetProperty("EndDateTime", pegadetails.EndDateTime );
								var pegaOutput = bsRespCheck.InvokeMethod("Run Process", psInputs);
								//var resultset = pegaOutput?.GetChildByType("ResultSet");
								
							}
						}
						pegaflag = "N";
						$('.siebui-view').hasClass('scmainbgcolor') == true ? $('.siebui-view').removeClass('scmainbgcolor') : ""; // Hari may 3 2024
                        var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        Inputs.SetProperty("Service Name", "VHA Sales Calculator BS");
                        Inputs.SetProperty("Method Name", "QuoteStatusUpdate");
                        Inputs.SetProperty("QuoteStatus", "Submitted");
                        Inputs.SetProperty("QuoteId", scJson.QuoteHeader.QuoteId);
                        Inputs.SetProperty("SessionId", scJson.QuoteHeader.SessionId);
                        Inputs.SetProperty("SessionSts", "Submitted");
						Inputs.SetProperty("Address", "");
						if (scJson.QuoteHeader.CustomerType == "New")//vasavi added
						{
							if (($("#vha-sc-MarketingInfo").prop("checked")))
								scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo = "Y";
							else
								scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo = "N";

							scJson.QuoteHeader.NewCustDtls.EmailAddress = $("#vha-sc-Email").val();

							if (($("#vha-sc-Inquiry").prop("checked")))
								scJson.QuoteHeader.NewCustDtls.Inquiry = "Y";
							else
								scJson.QuoteHeader.NewCustDtls.Inquiry = "N";
							
							Inputs.SetProperty("QuoteEmail", scJson.QuoteHeader.NewCustDtls.EmailAddress);
							Inputs.SetProperty("QuoteReceiveFlg", scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo);
							Inputs.SetProperty("QuoteInqFlg", scJson.QuoteHeader.NewCustDtls.Inquiry);
						}
						else
						{
							if (($("#vha-sc-MarketingInfo").prop("checked")))
								scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo = "Y";
							else
								scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo = "N";
								
							scJson.QuoteHeader.ExistingCustDtls.EmailAddress = $("#vha-sc-Email").val();

							if (($("#vha-sc-Inquiry").prop("checked")))
								scJson.QuoteHeader.ExistingCustDtls.Inquiry = "Y";
							else
								scJson.QuoteHeader.ExistingCustDtls.Inquiry = "N";
							
							Inputs.SetProperty("QuoteEmail", scJson.QuoteHeader.ExistingCustDtls.EmailAddress);
							Inputs.SetProperty("QuoteReceiveFlg", scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo);
							Inputs.SetProperty("QuoteInqFlg", scJson.QuoteHeader.ExistingCustDtls.Inquiry);
						}//end vasavi added
                        var Output = ser.InvokeMethod("Run Process", Inputs);
                        //console.log(Output);
                        mSetPrflAttr("SalesCalcQuoteId", "");
                        nullifyVar();
                       // SiebelApp.S_App.GetActiveView().GetApplet("VHA Sales Calculator Header Applet").InvokeMethod("ExecuteQuery");
						//HARIY:Submit Button for Existing Customer::14May2024
						if(scJson.QuoteHeader.CustomerType==="Existing"){
							SiebelApp.S_App.SetProfileAttr("SalesCalcExistCust", "Y");
							SiebelApp.S_App.SetProfileAttr("SCMobileNumber", scJson.QuoteHeader.ExistingCustDtls.searchMSISDN);
							
						}
                        SiebelApp.S_App.GotoView("VHA Sales Calculator View");
                        setTimeout(function () {
                            $("#vha-sc-salesquote-btn").trigger("click");
                        }, 1000);
                        break;
                    case "vha-sc-pause":
                        if (scJson.QuoteHeader.RootItem.filter(function (item) {
                                return item.Mode == "Edit";
                            }).length > 0) {
                            alert("Please save the added/modified service to pause the flow");
                        } else {
                            clearInterval(intervalId);
                            scJson.QuoteHeader.Prepayment.PrepaymentAmt = "";
                            adjustPrepayment();
                            var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            Inputs.SetProperty("Service Name", "VHA Sales Calculator BS");
                            Inputs.SetProperty("Method Name", "ScPauseFlow");
                            Inputs.SetProperty("HeaderId", scJson.QuoteHeader.SessionId);
                            Inputs.SetProperty("Json", JSON.stringify(scJson));
                            var Output = ser.InvokeMethod("Run Process", Inputs);
                            //console.log(Output);
                            mSetPrflAttr("SalesCalcQuoteId", "");
                            nullifyVar();
                            //SiebelApp.S_App.GetActiveView().GetApplet("VHA Sales Calculator Header Applet").InvokeMethod("NewQuery");
                            //SiebelApp.S_App.GetActiveView().GetApplet("VHA Sales Calculator Header Applet").InvokeMethod("ExecuteQuery");
                            SiebelApp.S_App.GotoView("VHA Sales Calculator View");
                            setTimeout(function () {
                                $("#vha-sc-salesquote-btn").trigger("click");
                            }, 1000);
                        }
                        break;
                    }
                });
            };

            VHASalesCalculatorViewPR.prototype.EndLife = function () {
                SiebelAppFacade.VHASalesCalculatorViewPR.superclass.EndLife.apply(this, arguments)
            };

            function dataAddons(callback) {
                $("#vha-sc-feature-config-addon").val("");
                $(".vha-sc-cart-datacost").text("$" + "0.00");
                if (!loadaddonEdit) {
                    currentRLI.PackItem = currentRLI.PackItem.filter(function (item) {
                        return item.UIType != "Data";
                    });
                }
                if (!addOnLoaded && (!$(".vha-sc-configservice-select").hasClass("VHASCDisplayNone") || loadaddonEdit)) {
                    mgetAddonsList();
                    loadaddonEdit = false;
                }
                //debugger;
                var val = $('input[type=radio][name=data-addon]:checked').attr('value');
                //tsintitialData.OrderHeader.DataAddOns.AddOnType = val;
                var featrueConfigAddon = "#vha-sc-feature-config-addon";
                var featureDropDown = ".vha-sc-addon-drop-down";
                var container = ".vha-sc-data-addon-container";
                $(container).removeClass("VHASCDisplayNone");
                // $(".vha-sc-DataIddDiviceCare .vha-sc-alignSpanDiv").text("$" + "0.00");
                switch (val) {
                case "One Off":
                    if (addOnData.dataOneOff) {
                        $(featrueConfigAddon).prop("disabled", false);
                        $(featrueConfigAddon).autocomplete({
                            source: addOnData.dataOneOff.map(function (a) {
                                return {
                                    label: a.name,
                                    value: a.name,
                                    chargeType: a.chargeType,
                                    dollar: a.dollar,
                                    type: "data",
                                    GbProdId: a.GbProdId,
                                    ProdId: a.ProdId,
                                    SamId: a.SamId
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $(featureDropDown).click(dropDownTrigger);
                    } else {
                        $(featrueConfigAddon).prop("disabled", true);
                    }
                    break;
                case "Recurring":
                    if (addOnData.dataRecurring) {
                        $(featrueConfigAddon).prop("disabled", false);
                        $(featrueConfigAddon).autocomplete({
                            source: addOnData.dataRecurring.map(function (a) {
                                return {
                                    label: a.name,
                                    value: a.name,
                                    chargeType: a.chargeType,
                                    dollar: a.dollar,
                                    type: "data",
                                    GbProdId: a.GbProdId,
                                    ProdId: a.ProdId,
                                    SamId: a.SamId
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $(featureDropDown).click(dropDownTrigger);
                    } else {
                        $(featrueConfigAddon).prop("disabled", true);
                    }
                    break;                
				default:
                    $(container).addClass("VHASCDisplayNone");
                    $(featrueConfigAddon).val('');
					$("#vha-sc-cart-dataaddoncost").text("$" + "0.00");
					currentRLI.PackItem = currentRLI.PackItem.filter(function (item) {
						return item.UIType != "Data";
					});
					/*tsintitialData.OrderHeader.DataAddOns.EligibleOrderLineItem = "N";
                    updateSessionDetails(0, "DataAddOns", "Add");
                    totalIndicativeCostCalc();
                    $(".cart-data-addons").addClass("VFDisplayNone");
                    $(".cart-data-addons .vha-ts-cartval").text("$" + "0.00");*/
                    break;
                }
                callback();
            }

            function iddAddons(callback) {
                $("#vha-sc-feature-config-idd").val("");
                $("#vha-sc-feature-config-termidd").val("");
                $(".vha-sc-cart-iddcost").text("$" + "0.00");
                if (!loadaddonEdit) {
                    currentRLI.PackItem = currentRLI.PackItem.filter(function (item) {
                        return item.UIType != "IDD";
                    });
                }
                //tsintitialData.OrderHeader.IddAddOns.EligibleOrderLineItem = "N";

                if (!addOnLoaded && (!$(".vha-sc-configservice-select").hasClass("VHASCDisplayNone") || loadaddonEdit)) {
                    mgetAddonsList();
                    loadaddonEdit = false;
                }
                //debugger;
                var val = $('input[type=radio][name=intern-calls]:checked').attr('value');
                //tsintitialData.OrderHeader.IddAddOns.AddOnType = val;
                var featureConfigIdTerm = "#vha-sc-feature-config-termidd";
                var featureDropDownTerm = ".vha-sc-termidd-drop-down";
                var containerTerm = ".vha-sc-data-addonterm-container";
                var featureConfigIdd = "#vha-sc-feature-config-idd";
                var featureDropDown = ".vha-sc-idd-drop-down";
                var container = ".vha-sc-idd-addon-container";
                $(container).removeClass("VHASCDisplayNone");
                $(containerTerm).removeClass("VHASCDisplayNone");

                switch (val) {
                case "One Off":
                    $(containerTerm).addClass("VHASCDisplayNone");
                    if (addOnData.iddOneOff) {
                        $(featureConfigIdd).prop("disabled", false);
                        $(featureConfigIdd).autocomplete({
                            source: addOnData.iddOneOff.map(function (a) {
                                return {
                                    label: a.name,
                                    value: a.name,
                                    chargeType: a.chargeType,
                                    dollar: a.dollar,
                                    type: "idd",
                                    GbProdId: a.GbProdId,
                                    ProdId: a.ProdId,
                                    SamId: a.SamId
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $(featureDropDown).click(dropDownTrigger);
                    } else {
                        $(featureConfigIdd).prop("disabled", true);
                    }
                    break;
                case "Recurring":
                    if (addOnData.iddOneOff) {
                        $(featureConfigIdd).prop("disabled", false);
                        $(featureConfigIdd).autocomplete({
                            source: addOnData.iddRecurring.map(function (a) {
                                return {
                                    label: a.name,
                                    value: a.name,
                                    chargeType: a.chargeType,
                                    dollar: a.dollar,
                                    type: "idd",
                                    GbProdId: a.GbProdId,
                                    ProdId: a.ProdId,
                                    SamId: a.SamId
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $(featureDropDown).click(dropDownTrigger);
                    } else {
                        $(featureConfigIdd).prop("disabled", true);
                    }

                    var period = new Array;
                    for (var i = 1; i <= 36; i++) {
                        period.push(i);
                    }
                    $(featureConfigIdTerm).autocomplete({
                        source: period.map(function (a) {
                            return {
                                label: a,
                                value: a,
                                type: "iddTerm"
                            };
                        }),
                        minLength: 0,
                        select: selectAutoCompleteVal
                    });
                    $(featureDropDownTerm).click(dropDownTrigger);
                    break;
                default:
                    $(container).addClass("VHASCDisplayNone");
                    $(containerTerm).addClass("VHASCDisplayNone"); //vasavi added for PKE
                    $(featureConfigIdd).val('');
					$("#vha-sc-cart-iddaddoncost").text("$" + "0.00");
					currentRLI.PackItem = currentRLI.PackItem.filter(function (item) {
						return item.UIType != "IDD";
					});
					//tsintitialData.OrderHeader.IddAddOns.EligibleOrderLineItem = "N";
                    break;
                }
                callback();
            }

            //PDF Insert under Quote
            function insertPDF(base64PDF) {
                var ajaxSetting = {
                    "async": true,
                    "crossDomain": true,
                    "url": apilovurl + "VHAQuoteAttachmentBS/Insert",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "5c1f0ef1-1226-5653-dba8-72a6c0e242c9"
                    },
                    "processData": false,
                    "data": '{"body":{"LOVLanguageMode":"LDC","SiebelMessageIn":{"IntObjectName":"VHAQuoteAttachmentIO","ListOfVHAQuoteAttachmentIO":{"Quote Attachment":{"Id":"Q123456","Quote Id":"' + scJson.QuoteHeader.QuoteId + '","QuoteFileExt":"pdf","QuoteFileName":"' + scJson.QuoteHeader.QuoteNumber + '_QuotePackage","Quote Attachment Id":"' + base64PDF + '"}}}}}' // TULASIY:07May2024::Created for QuoteNo Attachment Change
                };
                $.ajax(ajaxSetting).done(function (response) {
                    //console.log(response);
                    scJson.QuoteHeader.QuoteAttId = response["SiebelMessageOut"]["Quote Attachment"].Id;
                    //console.log("PDF inserted successfully to Quote");
                }).fail(function (response, textStatus) {
                    //console.log(response);
                    //console.log("PDF insert Failed to Quote");
                });
            }

            //Json journey copy node and set journey
            function jsonHandler(toDo, inpParams) {
                switch (toDo) {
                case "AddRLI":
                    scJson.QuoteHeader.RootItem.filter(function (item) {
                        return item.Mode === "Edit";
                    }).length >= 1 ? alert("RootItem found in Edit mode") : copyRLI();

                    function copyRLI() {
                        currentRLI = JSON.parse(JSON.stringify(OriginalJSON().QuoteHeader.RootItem[0]));
                        currentRLI.Id = 'QLI-' + Number((scJson.QuoteHeader.RootItem.length) + 1);
                        currentRLI.Mode = "Edit";
                        currentRLI.Action = "Add";
                        currentRLI.SrvType = "New Service";
                        scJson.QuoteHeader.RootItem.push(currentRLI);
                        //alert("New RootItem created");
                    }
                    break;
                case "NewJson":
                    scJson = JSON.parse(JSON.stringify(OriginalJSON()));
                    currentRLI = scJson.QuoteHeader.RootItem[0];
                    currentRLI.Id = 'QLI-' + Number((scJson.QuoteHeader.RootItem.length - 1) + 1);
                    break;
                case "Set-NewCustomer-NewService":
                    scJson.QuoteHeader.CustomerType = "New";
                    scJson.QuoteHeader.QuoteJourney = "Connect";
                    currentRLI.Mode = "Edit";
                    currentRLI.Action = "Add";
                    currentRLI.SrvType = "New Service";
                    break;
                case "Set-ExistingCustomer-NewService":
                    scJson.QuoteHeader.CustomerType = "Existing";
                    scJson.QuoteHeader.QuoteJourney = "Connect";
                    currentRLI.Mode = "Edit";
                    currentRLI.Action = "Add";
                    currentRLI.SrvType = "New Service";
                    break;
                case "Set-ExistingCustomer-Upgrade":
                    scJson.QuoteHeader.CustomerType = "Existing";
                    scJson.QuoteHeader.QuoteJourney = "Upgrade";
                    currentRLI.Mode = "Edit";
                    currentRLI.Action = "Existing";
                    currentRLI.SrvType = "Upgrade Service";
                    currentRLI.AssetId = inpParams.AssetId;
					currentRLI.MSISDN = inpParams.msisdn;
                    break;
                }
            }

            function setCount(){
				var nDevice = 0;
				var nSimO = 0;
				var nFWA = 0;
				var nNBN = 0;
				
				scJson.QuoteHeader.RootItem.forEach(function (rliitem) {
					var scheckDevice = "Y";
					if(rliitem.Mode == "Saved"){
						if(rliitem.PlanItem.Action == "Add" && rliitem.PlanItem.UI_PlanType == "FWA"){
							nFWA = nFWA + 1;
							scheckDevice = "N";
						}  else if (rliitem.PlanItem.Action == "Add" && rliitem.PlanItem.UI_PlanType == "NBN"){
							nNBN = nNBN + 1;
							scheckDevice = "N";
						} else if(rliitem.SimO == "SimO"){
							nSimO = nSimO +1;
							scheckDevice = "N";
						}
						if(scheckDevice == "Y"){
						nDevice = nDevice + Number(rliitem.DeviceItem.filter(function (rliditem) {
							return rliditem.Action == "Add";
						}).length);}
					}					
				});
				$('.vha-sc-wd-cnt').text(nDevice);
				$('.vha-sc-simo-cnt').text(nSimO);
				$('.vha-sc-hi-cnt').text(nFWA);
				$('.vha-sc-nbn-cnt').text(nNBN);
			}
			
			//Change state of elements based on the jsonvvsl
            function changeUIState() {
                var RLIinEdit = scJson.QuoteHeader.RootItem.filter(function (item) {
                    return item.Mode === "Edit";
                });

                var RLIinSaved = scJson.QuoteHeader.RootItem.filter(function (item) {
                    return item.Mode === "Saved";
                });

                RLIinEdit.length >= 1 ? inEditMode() : notinEditMode();

                function inEditMode() {
                    $(".vha-sc-totalNewbtn").attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                    $(".vha-sc-ExistingServicesSum button").each(function (item) {
                        var thisc = this;
                        /*if (RLIinEdit.filter(function (item) {
                        return item.AssetId === thisc.id;
                        }).length > 0) {
                        $(thisc).attr("disabled", false).removeClass("vha-sc-totalNewbtn-disable");
                        } else {
                        $(thisc).attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                        }*/
                        $(thisc).attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                    });
                    if($('.vha-sc-byod-val').prop('checked')==true || (currentRLI.UpgradeOfferType == "Resign" || currentRLI.UpgradeOfferType == "Upgrade RRP on Instalment")){
						$('.vha-sc-simoupg-val').prop('disabled', true);
						$('.vha-sc-simoupg-val').prop('checked', false);}
					else{
					$('.vha-sc-simoupg-val').prop('disabled', false);}
					
					if($('.vha-sc-simoupg-val').prop('checked')==true || (currentRLI.UpgradeOfferType == "Resign" || currentRLI.UpgradeOfferType == "Upgrade RRP on Instalment")){
						$('.vha-sc-byod-val').prop('disabled', true);
						$('.vha-sc-byod-val').prop('checked', false);
						$('#vhascnbnplan').hasClass("VHASCDisplayNone") == true ? "" : $('#vhascnbnplan').addClass("VHASCDisplayNone");
						}
					else{
						$('.vha-sc-byod-val').prop('disabled', false);
						$('#vhascnbnplan').hasClass("VHASCDisplayNone") == true ? $('#vhascnbnplan').removeClass("VHASCDisplayNone") : "";
						}			
					
					//if(RLIinEdit[0].SrvType == "Upgrade Service"){
					if(scJson.QuoteHeader.ExistingCustDtls.CustomerPIN != "" && scJson.QuoteHeader.ExistingCustDtls.CustomerId != "" ){
						$('#vha-sc-nbaofferbtn').prop('disabled', false);
					}else{
						$('#vha-sc-nbaofferbtn').prop('disabled', true);
					}	
                    $('.vha-sc-d-shopaddtocartbtn,.vhascbrand,.vhascppbtn-new, .vhasc-d-term').attr('disabled', false);
                    $("#vha-sc-save-rli").attr("disabled", false).removeClass("vha-sc-totalNewbtn-disable");
					if(currentRLI.PlanItem.Code != "" && $('#vha-sc-ApplyPromoCode').hasClass("VHASCDisplayNone") == false){
						$('#vha-sc-ApplyPromoCode').prop('disabled', false);
						$('.vha-sc-PromoCodeInput').prop('disabled', false);//TULASIY:29jan2024::Created for IRC-133						
					}else{
						$('#vha-sc-ApplyPromoCode').prop('disabled', true);
						$('.vha-sc-PromoCodeInput').prop('disabled', true);//TULASIY:29jan2024::Created for IRC-133						
					}
					$(".vha-sc-shipZipCode").prop("disabled", false);
					if($(".vha-sc-shipZipCode").val() ==""){						
						$("#vha-sc-d-equiplmtmsg").text("");
						$("#vha-sc-d-equiplmtmsg").hasClass("VHASCDisplayNone") == true ? "":$("#vha-sc-d-equiplmtmsg").addClass("VHASCDisplayNone");
					}
					//calc cost for current service
					calcSummaryCost(RLIinEdit[0]);
                }
                function notinEditMode() {
                    $(".vha-sc-totalNewbtn").attr("disabled", false).removeClass("vha-sc-totalNewbtn-disable");
                    $(".vha-sc-ExistingServicesSum button").each(function (item) {
                        var thisc = this;
                        if (RLIinSaved.filter(function (item) {
                                return item.AssetId === thisc.id;
                            }).length > 0) {
                            $(thisc).attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                            $(thisc).text("Upgraded");
                        } else {
                            $(thisc).attr("disabled", false).removeClass("vha-sc-totalNewbtn-disable");
							$(thisc).text("Upgrade");
                        }
                    });
					$('#vha-sc-nbaofferbtn').prop('disabled', true);
					$('#vha-sc-ApplyPromoCode').prop('disabled', true);
					$('.vha-sc-PromoCodeInput').prop('disabled', true);//TULASIY:29jan2024::Created for IRC-133					
                    $('.vha-sc-simoupg-val, .vha-sc-byod-val').prop('disabled', true);
                    $('.vha-sc-d-shopaddtocartbtn,.vhascbrand,.vhascppbtn-new,.vhasc-d-term').attr('disabled', true);
                    $("#vha-sc-save-rli").attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
					$('.vha-sc-shipZipCode').val('');
					$(".vha-sc-shipZipCode").prop("disabled", true);
					$("#vha-sc-d-equiplmtmsg").text("");
					$("#vha-sc-d-equiplmtmsg").hasClass("VHASCDisplayNone") == true ? "":$("#vha-sc-d-equiplmtmsg").addClass("VHASCDisplayNone");
                }
                //
				setCount();
            }
			
			function calcSummaryCost(itemli){
				var lineCost = cartTotalforeachRLI(itemli);
				$('#vha-sc-cart-costpm').text('$'+parseFloat(lineCost.TotalPerMth).toFixed(2));
				try {
					$('#vha-sc-cart-otcost').text('$'+parseFloat(itemli.OtpItem.filter(item => item.Action === "Add" && item.Name != "Prepayment").reduce((sum, item) => sum + (Number(item.Price) || 0), 0)).toFixed(2));
				} catch (e) {
					$('#vha-sc-cart-otcost').text('$0.00');
				}
			}
			
            function createGuidedFlow() {
                var steps = [{
                        "a": "step-1",
                        "description": "Coverage Check"
                    }, {
                        "a": "step-2",
                        "description": "Device and Plan Configuration"
                    }, {
                        "a": "step-3",
                        "description": "Quote Summary"
                    }
                ];
                var btns = [{
                        "stepNo": "1,2",
                        "buttonName": "Pause",
                        "className": "btn forcehide vhasecondarybtn",
                        "custId": "vha-sc-pause"
                    }, {
                        "stepNo": "1,2",
                        "buttonName": "Back",
                        "className": "btn sw-btn-prev forcehide vhasecondarybtn",
                        "custId": "vha-sc-prev"
                    }, {
                        "stepNo": "0",
                        "buttonName": "Next",
                        "className": "btn sw-btn-next forcehide vhacntbtn post-btn-sw vha-sc-bgRed",
                        "custId": "vha-sc-next"
                    }, {
                        "stepNo": "1",
                        "buttonName": "Quote Summary",
                        "className": "btn sw-btn-next forcehide vhacntbtn post-btn-sw vha-sc-bgRed",
                        "custId": "vha-sc-qsummary"
                    }, {
                        "stepNo": "2",
                        "buttonName": "Submit Quote",
                        "className": "btn sw-btn-next forcehide vhacntbtn post-btn-sw vha-sc-bgRed",
                        "custId": "vha-sc-qsubmit"
                    }
                ];
                //vha-wizard-nav
                $('#smartwizard').smartWizard({
                    //selected: 0,
                    theme: 'dots',
                    cancelBtnText: "Cancel",
                    useURLhash: false,
                    showStepURLhash: false,
                    stepCreate: {
                        stepObj: steps,
                        ulSelector: 'ul#vha-guided-wizard'
                    },
                    toolbarSettings: {
                        toolbarPosition: 'bottom',
                        toolbarExtraButtons: btns
                    },
                    anchorSettings: {
                        anchorClickable: true,
                        enableAllAnchors: true,
                        markDoneStep: true,
                        markAllPreviousStepsAsDone: true,
                        removeDoneStepOnNavigateBack: true,
                        enableAnchorOnDoneStep: true
                    }
                });
            }

            function mSetQuoteHeader(sSiebelMessage) {
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("QuoteId", scJson.QuoteHeader.QuoteId);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("Prepayment", scJson.QuoteHeader.Prepayment.PrepaymentAmt);
                return sSiebelMessage;
            };

            function GetPropertyToJson(Inps) {
                var InpJson = {};
                var propName = Inps.GetFirstProperty();
                while (propName != null) {
                    InpJson[propName] = Inps.GetProperty(propName);
                    propName = Inps.GetNextProperty();
                }
                return InpJson;
            }

            function mCreateQLineItem(sListOfQuote, sObjName, sChildObjProp, scJsonRLI, AccTotals) {
                var sQItemFields = ["Action", "GroupId", "Name", "StockIndicator", "Type", "ProdIntegrationId", "GroupId", "SAMId", "Price", "Descr", "Insurance", "InsPri", "ProductId", "RemTerm", "Code", "Period"];
                var sQItemFieldsnbn = ["Name"];
                var sObjNameIn = ["PackItem", "CreditItem"];
                switch (sObjName) {
                case "PackItem":
                    sQItemFields = sQItemFields.filter(function (field) {
                        return field != "Period";
                    });
                    break;
                case "CreditItem":
                    sQItemFields = sQItemFields.filter(function (field) {
                        return field != "Price" && field != "Period";
                    });
                    break;
                }
                //attr partition
                if (sObjName == "SDItem" || sObjName == "AccItem") {
                    var sQAPPattrflds = ["Category", "Contract Amount", "Contract Amount Override", "Contract End Date", "Contract Start Date", "IMEI", "Monthly Repayment", "Number of Accessories", "Prepayment Amount", "Term", "Term Override", "Total Accessories RRP Inc GST"];
                    var sQWearattrflds = ["Accessory Code", "Accessory Name", "Accessory RRP Exc GST", "Accessory RRP Inc GST", "Category", "Prepayment Amount"];
                    var sChangeflds = ["Total Accessories RRP Inc GST", "Prepayment Amount", "Monthly Repayment", "Contract Amount"];
                    var AddApp = "Y";
                    var sChildObjPropLen = sChildObjProp.length;
                    var psAPPLine = SiebelApp.S_App.NewPropertySet();
                    psAPPLine.type = "QuoteItem";
                    var sLstOfAttrApp = SiebelApp.S_App.NewPropertySet();
                    sLstOfAttrApp.type = "ListOfAttr";
                    psAPPLine.AddChild(sLstOfAttrApp);

                    var psWearLine = SiebelApp.S_App.NewPropertySet();
                    psWearLine.type = "QuoteItem";
                    var sLstOfAttrWear = SiebelApp.S_App.NewPropertySet();
                    sLstOfAttrWear.type = "ListOfAttr";
                    psWearLine.AddChild(sLstOfAttrWear);
                    for (var j = 0; j < sChildObjPropLen; j++) {
                        if (sChildObjProp[j].indexOf("UI") === -1) {
                            var sObjName1 = sChildObjProp[j].replace(/___/g, "/");
                            sObjName1 = sObjName1.replace(/__/g, " ");
                            if (sQItemFields.includes(sObjName1)) {
                                psAPPLine.SetProperty(sObjName1, scJsonRLI[sChildObjProp[j]]);
                                if (sObjName1 == "Name") {
                                    psWearLine.SetProperty(sObjName1, "Accessory");
                                } else {
                                    psWearLine.SetProperty(sObjName1, scJsonRLI[sChildObjProp[j]]);
                                }
                                /*if (sObjName == "AccItem") {
                                    psAPPLine.SetProperty("Group Id", "1");
                                    psWearLine.SetProperty("Group Id", "1");
                                } else {*/
								psAPPLine.SetProperty("GroupId", Number(AccTotals.GrpId));
								psWearLine.SetProperty("GroupId", Number(AccTotals.GrpId));
                                //}
                            } else {
                                if (sQAPPattrflds.includes(sObjName1)) {
                                    var sAttr = SiebelApp.S_App.NewPropertySet();
                                    sAttr.type = "Attr";
                                    sAttr.SetProperty("Name", sObjName1);
                                    if (sObjName == "AccItem" && sChangeflds.includes(sObjName1) && AccTotals.nth == "0") {
                                        sAttr.SetProperty("Value", AccTotals[sChildObjProp[j]]);
                                    } else {
                                        sAttr.SetProperty("Value", scJsonRLI[sChildObjProp[j]]);
                                    }
                                    psAPPLine.GetChild(0).AddChild(sAttr);
                                }
                                if (sQWearattrflds.includes(sObjName1)) {
                                    var sAttr = SiebelApp.S_App.NewPropertySet();
                                    sAttr.type = "Attr";
                                    sAttr.SetProperty("Name", sObjName1);
                                    sAttr.SetProperty("Value", scJsonRLI[sChildObjProp[j]]);
                                    psWearLine.GetChild(0).AddChild(sAttr);
                                }
                            }
                        }
                    }
                    if (sObjName == "AccItem" && AccTotals.nth == "0")
                        sListOfQuote.AddChild(psAPPLine);
                    else if (sObjName == "SDItem")
                        sListOfQuote.AddChild(psAPPLine);
                    if (scJsonRLI.Action != "Existing")
                        sListOfQuote.AddChild(psWearLine);
                } else {
                    var sChildObjPropLen = sChildObjProp.length;
                    var sItStutTemp = SiebelApp.S_App.NewPropertySet();
                    sItStutTemp.type = "QuoteItem";
                    var sLstOfAttr = SiebelApp.S_App.NewPropertySet();
                    sLstOfAttr.type = "ListOfAttr";
                    sItStutTemp.AddChild(sLstOfAttr);
                    for (var j = 0; j < sChildObjPropLen; j++) {
                        var vNBN = "N";
                        if (sChildObjProp[j].indexOf("UI") === -1) {
                            var sObjName1 = sChildObjProp[j].replace(/___/g, "/");
                            sObjName1 = sObjName1.replace(/__/g, " ");
                            if (AccTotals.PlanType && sObjName == "DeviceItem") {
                                if (AccTotals.PlanType == "NBN") {
                                    vNBN = "Y";
                                    if (sQItemFieldsnbn.includes(sObjName1)) {
                                        sItStutTemp.SetProperty(sObjName1, "Device-Siebel Only");
                                    } else {
                                        var sAttr = SiebelApp.S_App.NewPropertySet();
                                        Attr.type = "Attr";
                                        if (sObjName1 == "Item Code") {
                                            sAttr.SetProperty("Name", "Device Code");
                                            sAttr.SetProperty("Value", scJsonRLI[sChildObjProp[j]]);
                                            sItStutTemp.GetChild(0).AddChild(sAttr);
                                        } else if (sObjName1 == "Item Name") {
                                            sAttr.SetProperty("Name", "Device Name");
                                            sAttr.SetProperty("Value", scJsonRLI[sChildObjProp[j]]);
                                            sItStutTemp.GetChild(0).AddChild(sAttr);
                                        }
                                    }
                                }
                            } // handled for nbn
                            if (vNBN == "N") {
                                if (sQItemFields.includes(sObjName1)) {
                                    sItStutTemp.SetProperty(sObjName1, scJsonRLI[sChildObjProp[j]]);
                                } else {
                                    var sAttr = SiebelApp.S_App.NewPropertySet();
                                    sAttr.type = "Attr";
                                    sAttr.SetProperty("Name", sObjName1);
                                    sAttr.SetProperty("Value", scJsonRLI[sChildObjProp[j]]);
                                    sItStutTemp.GetChild(0).AddChild(sAttr);
                                }
                            }
                        }
                    }
                    sListOfQuote.AddChild(sItStutTemp);
                }
            }

            function mCreateQuoteLineItems(sSiebelMessage, sItemStructure) {
                var sChildObj = Object.keys(scJson.QuoteHeader);
                sSiebelMessage.GetChild(0).GetChild(0).GetChild(0).RemoveChild(0);
                var schildprep = sSiebelMessage.GetChild(0).GetChild(0).GetChild(1);
                for (var i = 0; i < sChildObj.length; i++) {
                    var sObjName = sChildObj[i];
                    if (sChildObj[i] == "RootItem") {
                        var sRootItem = Object.keys(scJson.QuoteHeader.RootItem);
                        for (var j = 0; j < sRootItem.length; j++) {
                            var sGrpId = 0;
							var sRootItemAttrVal = scJson.QuoteHeader.RootItem[j];
                            var sRootItemTemp = SiebelApp.S_App.NewPropertySet();
                            sRootItemTemp.type = "RootItem";
                            sRootItemTemp.SetProperty("Id", sRootItemAttrVal.Id);
                            sRootItemTemp.SetProperty("Service", sRootItemAttrVal.Service);
                            sRootItemTemp.SetProperty("SrvPerMth", sRootItemAttrVal.SrvPerMth);
                            sRootItemTemp.SetProperty("SrvType", sRootItemAttrVal.SrvType);
                            sRootItemTemp.SetProperty("UpgradeOfferType", sRootItemAttrVal.UpgradeOfferType);
                            sRootItemTemp.SetProperty("RoamingProduct", sRootItemAttrVal.RoamingProduct);
                            sRootItemTemp.SetProperty("TenureOverride", sRootItemAttrVal.TenureOverride);
                            sRootItemTemp.SetProperty("LatestDeviceTermOverride", sRootItemAttrVal.LatestDeviceTermOverride);
                            sRootItemTemp.SetProperty("OverrideDesc", sRootItemAttrVal.OverrideDesc);
                            sRootItemTemp.SetProperty("RCCValue", sRootItemAttrVal.RCCValue);
                            sRootItemTemp.SetProperty("RCCEditable", sRootItemAttrVal.RCCEditable);
                            sRootItemTemp.SetProperty("ETC", sRootItemAttrVal.ETC);
                            sRootItemTemp.SetProperty("Proposition", sRootItemAttrVal.Proposition);
                            sRootItemTemp.SetProperty("PropSAMId", sRootItemAttrVal.PropSAMId);
							sRootItemTemp.SetProperty("AssetId", sRootItemAttrVal.AssetId);
							sRootItemTemp.SetProperty("Promo", sRootItemAttrVal.Promo);
                            var sListOfQuote = SiebelApp.S_App.NewPropertySet();
                            sListOfQuote.type = "ListOfQuoteItem";

                            var sRootItemkeys = Object.keys(scJson.QuoteHeader.RootItem[j]);
                            for (var k = 0; k < sRootItemkeys.length; k++) {
                                switch (sRootItemkeys[k]) {
                                case "PlanItem":
                                case "FeeRollItem":
                                case "TradeItem":
                                    var sChildObjProp = Object.keys(scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]]);
                                    if (scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]]["Action"] != "")
                                        mCreateQLineItem(sListOfQuote, sRootItemkeys[k], sChildObjProp, scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]], {});
                                    break;
                                case "DeviceItem":
                                    var TotalAmts = {};
                                    TotalAmts.nth = "";
                                    TotalAmts.PlanType = scJson.QuoteHeader.RootItem[j].PlanItem.UI_PlanType;
                                    for (var l = 0; l < scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]].length; l++) {
                                        TotalAmts.nth = l;
                                        var sChildObjProp = Object.keys(scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]][l]);
                                        mCreateQLineItem(sListOfQuote, sRootItemkeys[k], sChildObjProp, scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]][l], TotalAmts);
                                    }
                                    break;
                                case "PackItem":
                                case "OtpItem":
                                case "CreditItem":
                                case "DDItem": //js & pdf pending due to core
                                case "BonusItem": //js & pdf pending due to core
                                case "CancelItem": //js & pdf pending due to core
                                    var TotalAmts = {};
                                    TotalAmts.nth = "";
                                    for (var p = 0; p < scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]].length; p++) {
                                        TotalAmts.nth = p;
                                        var sChildObjProp = Object.keys(scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]][p]);
                                        mCreateQLineItem(sListOfQuote, sRootItemkeys[k], sChildObjProp, scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]][p], TotalAmts);
                                    }
                                    break;
                                case "SDItem":
                                    var TotalAmts = {};
                                    TotalAmts.nth = "";
                                    for (var s = 0; s < scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]].length; s++) {
                                        TotalAmts.nth = s;
										sGrpId = Number(sGrpId) + 1;
                                        TotalAmts.GrpId = sGrpId;
										var sChildObjProp = Object.keys(scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]][s]);
                                        mCreateQLineItem(sListOfQuote, sRootItemkeys[k], sChildObjProp, scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]][s], TotalAmts);
                                    }
                                    break;
                                case "AccItem":
                                    var objAcc = scJson.QuoteHeader.RootItem[j][sRootItemkeys[k]];
                                    var TotalAmts = {};
									sGrpId = Number(sGrpId) + 1;
                                    TotalAmts.Monthly__Repayment = parseFloat(objAcc.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.Monthly__Repayment) || 0), 0)).toFixed(2);
                                    TotalAmts.Contract__Amount = parseFloat(objAcc.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.Contract__Amount) || 0), 0)).toFixed(2);
                                    TotalAmts.Prepayment__Amount = parseFloat(objAcc.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.Prepayment__Amount) || 0), 0)).toFixed(2);
                                    TotalAmts.Total__Accessories__RRP__Inc__GST = parseFloat(objAcc.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.Total__Accessories__RRP__Inc__GST) || 0), 0)).toFixed(2);
                                    TotalAmts.nth = "";
                                    for (var a = 0; a < objAcc.length; a++) {
                                        var sChildObjProp = Object.keys(objAcc[a]);
                                        TotalAmts.nth = a;
                                        TotalAmts.GrpId = sGrpId;
										mCreateQLineItem(sListOfQuote, sRootItemkeys[k], sChildObjProp, objAcc[a], TotalAmts);
                                    }
                                    break;
                                }
                            }
                            sRootItemTemp.AddChild(sListOfQuote);
                            sSiebelMessage.GetChild(0).GetChild(0).GetChild(0).AddChild(sRootItemTemp);
                        }
                    }
                }
                return sSiebelMessage;
            }

            //Reset the cart summary items
            function resetCartSummaryUI(callFrom) { // Tulasi - 13Nov2023
                if (callFrom != "ChangePlan") {
                    $('#vha-sc-cart-dvcname').text("");
                    $('#vha-sc-cart-dvccost').text("");
                    //$(".vha-sc-device-select #vha-sc-d-stockerrmsg").text("");
                    $('.device-card-selected').each(function () {
						//Dev and plan change Rushi - 18JAN2024
						$(this).removeClass('sc-stock-status-border-green');						
						$(this).removeClass('sc-stock-status-border-red');
						$(this).removeClass('sc-stock-status-border-yellow');
						//Dev and plan change Rushi - 18JAN2024
                        $(this).removeClass('device-card-selected');
                        $("#" + this.id + ' .vha-sc-d-shopaddtocartbtn').text("Select this Device");
                    });
                    $('.sc-stock-status').find('span').text("");
                    $('.sc-stock-status').removeClass('sc-stock-status-red');
                    $('.sc-stock-status').removeClass('sc-stock-status-green');
                    $('.sc-stock-status').removeClass('sc-stock-status-yellow');
                }
                $('#vha-sc-cart-planname').text("");
                $('#vha-sc-cart-plancost').text("");
                $(".vha-sc-dataoffershopped").text("0 GB");
                $('.vha-sc-addtocartbtn').text("Select this plan");
                $("#sc-device-search").val("");
                $("#sc-plan-search").val("");
                //reset resticted discount
                $(".vha-sc-cfg-row2").hasClass("VHASCDisplayNone") == false ? $(".vha-sc-cfg-row2").addClass("VHASCDisplayNone") : "";
                $("#vha-sc-subs-dis-amt").val("");
                $("#vha-sc-feature-config-termrestdisc1").val("");
                $("#vha-sc-subs-dis-amt").prop('disabled', true);
                $("#vha-sc-feature-config-termrestdisc1").prop('disabled', true);
                $("#vha-sc-vip-dis-amt").val("");
                $("#vha-sc-feature-config-termrestdisc2").val("");
                $("#vha-sc-vip-dis-amt").prop('disabled', true);
                $("#vha-sc-feature-config-termrestdisc2").prop('disabled', true);
                $('#vha-sc-vip-dis').prop('checked', false);
                $('#vha-sc-subs-dis').prop('checked', false);
                //reset addons
                //all radio reset
                $('#vha-sc-in-roam-Roaming,#vha-sc-in-roam-pay-as,#vha-sc-in-roam-off,#vha-sc-da-adon-nt,#vha-sc-da-adon-oneof,#vha-sc-da-adon-recur,#vha-sc-in-calls-nt,#vha-sc-in-calls-oneof,#vha-sc-in-calls-recur,#vha-sc-oth-adon-nt,#vha-sc-oth-adon-oneof,#vha-sc-oth-adon-recur,#vha-sc-res-dis-nt,#vha-sc-res-dis-recur').prop('checked', false);
                $('#vha-sc-feature-config-addon, #vha-sc-feature-config-idd, #vha-sc-feature-config-termidd, #vha-sc-phoneins').val('');
                if ($('#vha-sc-feature-config-addon').data('ui-autocomplete')) {
                    $('#vha-sc-feature-config-addon').autocomplete('destroy');
                }
                if ($('#vha-sc-feature-config-idd').data('ui-autocomplete')) {
                    $('#vha-sc-feature-config-idd').autocomplete('destroy');
                }
                $('.vha-sc-data-addon-container').hasClass("VHASCDisplayNone") == false ? $(".vha-sc-data-addon-container").addClass("VHASCDisplayNone") : "";
                $('.vha-sc-idd-addon-container').hasClass("VHASCDisplayNone") == false ? $(".vha-sc-idd-addon-container").addClass("VHASCDisplayNone") : "";
                $('.vha-sc-data-addonterm-container').hasClass("VHASCDisplayNone") == false ? $(".vha-sc-data-addonterm-container").addClass("VHASCDisplayNone") : "";
                addOnLoaded = false;
                //reset trade in out
                $('.vha-sc-trade-txtbox, #vha-sc-trade-termrestdisc, #vha-sc-pre-pay-amt-inp').val("");
                $('#vha-sc-pre-pay-prim-dev,#vha-sc-pre-pay-waerbles,#vha-sc-pre-pay-accessory').text("$0.00");
                $('.vha-sc-cart-cost:not(#vha-sc-Accessoryshopped .vha-sc-cart-cost,#vha-sc-SDshopped .vha-sc-cart-cost,#vha-sc-Wearablecareshopped .vha-sc-cart-cost,#vha-sc-planshopped .vha-sc-cart-cost,#vha-sc-deviceshopped .vha-sc-cart-cost)').text("$0.00");
                $('.vha-sc-cart-gb').text("0 GB");
                $('.vha-sc-cart-mins').text("0 Mins");
                $('#vha-sc-devplan-btn-lbl').trigger('click');
                if (callFrom == "ChangePlan" || callFrom == "Change" || callFrom == "Edit") {
                    removeResetItemJson(callFrom);
                //} else if (callFrom == "Save" || callFrom == "Cancel" || callFrom == "New") {
                } else if (callFrom == "Cancel" || callFrom == "New") {
                    $('.vha-sc-cart-cost:not(#vha-sc-planshopped .vha-sc-cart-cost,#vha-sc-deviceshopped .vha-sc-cart-cost)').text("$0.00");
                    /*if ($(".vha-sc-simonlyupg input[type=checkbox]").is(":checked")) {
                    $(".vha-sc-simonlyupg input[type=checkbox]").trigger("click");
                    }*/
                    $(".vha-h-line").hasClass("VHASCDisplayNone") == true ? $(".vha-h-line").removeClass("VHASCDisplayNone") : "";
                    $(".vha-sc-device-select").hasClass("VHASCDisplayNone") == true ? $(".vha-sc-device-select").removeClass("VHASCDisplayNone") : "";
                    $(".vha-sc-simonlyupg input[type=checkbox], .vha-sc-byod input[type=checkbox]").prop("checked", false);
					$('.vha-sc-plantypebtn').parent().show();
					$(".vha-sc-PromoCodeInput").prop("disabled", false);
					$('#vha-sc-ApplyPromoCode').hasClass("VHASCDisplayNone") == true ? $('#vha-sc-ApplyPromoCode').removeClass("VHASCDisplayNone") : "";
					$('#vha-sc-RevertPromoCode').hasClass("VHASCDisplayNone") == true ? "" : $('#vha-sc-RevertPromoCode').addClass("VHASCDisplayNone");
					$(".vha-sc-PromoCodeInput").val("");
					$('.vha-sc-invPromo').hasClass("VHASCDisplayNone") == true ? "" : $('.vha-sc-invPromo').addClass("VHASCDisplayNone");                    
					resetWearablesTab();
                    getDeviceData();
                    priPlanDtl = "";
                    priDeviceProdCd = "";
                    getPlanDetails();
                }
				else if(callFrom == "Save"){
					var empPlanTileArrya = [];
					createPlanTiles(empPlanTileArrya);
				}
                if (callFrom == "Cancel") {
                    $('#vha-sc-cartsumcustremequip').text("$" + parseFloat(Number(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit)).toFixed(2));
                }
            }

            function resetWearablesTab() {
                resetSecDevice();
                resetAccessories();
                $(".vha-sc-access-table-main").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-sc-access-table-main").addClass("VHASCDisplayNone");
                $(".vha-sc-wear-table-main").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-sc-wear-table-main").addClass("VHASCDisplayNone");
                $('.vha-sc-we-NCIdrecLines, .vha-sc-acc-NCIdrecLines').remove();
            }

            function resetUpgWarningUI() {
                $('#vha-sc-dev-upgrade-btn').attr("disabled", false).removeClass("vha-sc-totalNewbtn-disable");
                $('#vha-sc-dev-resign-btn').attr("disabled", false).removeClass("vha-sc-totalNewbtn-disable");
                $('#vha-sc-dev-rrp-btn').attr("disabled", false).removeClass("vha-sc-totalNewbtn-disable");
                $('#vha-sc-upg-reason, #vha-sc-rrp-reason, #vha-sc-resign-reason').text("");
                $('#vha-sc-upg-reason').hasClass("VHASCDisplayNone") == false ? $('#vha-sc-upg-reason').addClass("VHASCDisplayNone") : "";
                $('#vha-sc-rrp-reason').hasClass("VHASCDisplayNone") == false ? $('#vha-sc-rrp-reason').addClass("VHASCDisplayNone") : "";
                $('#vha-sc-resign-reason').hasClass("VHASCDisplayNone") == false ? $('#vha-sc-resign-reason').addClass("VHASCDisplayNone") : "";
            }

            function resetSecDevice() {
                if ($('#sc-secdevice-v-search').data('ui-autocomplete')) {
                    $('#sc-secdevice-v-search').autocomplete('destroy');
                }
                $('#vha-sc-wear-add-btn').attr("Productcd", "");
                $('#sc-secdevice-search').val("");
                $('#sc-secdevice-v-search').val("");
                $('#vhs-sc-sddevice-care').val("");
                $(".vha-sc-pp-btn").removeClass("vha-sc-pp-btn-active");
                $('#vha-sc-we-variant-reason').text("").addClass("VHASCDisplayNone");
                $('#vha-sc-we-payterm-reason').text("").addClass("VHASCDisplayNone");
            }

            function resetAccessories() {
				if ($('#sc-accname-search').data('ui-autocomplete')) { //Hari added if block
                    $('#sc-accname-search').autocomplete('destroy');      
                }
                $('#vha-sc-acces-add-btn').attr("Productcd", "");
                $('#sc-accname-search').val("");
				$('#sc-acc-cat-search').val(""); //hari adedd
                $(".vha-sc-pp-acc-btn").removeClass("vha-sc-pp-btn-active");
                $('#vha-sc-acc-model-reason').text("").addClass("VHASCDisplayNone");
                $('#vha-sc-acc-payterm-reason').text("").addClass("VHASCDisplayNone");
            }

            function removeResetItemJson(callFrom) {
                //reset Device details
                if (currentRLI) {
                    if (callFrom == "Change") {
                        var currentRLIDevice = "";
                        if (currentRLI.DeviceItem.length > 0) {
                            currentRLI.DeviceItem = currentRLI.DeviceItem.filter(function (item) {
                                return item.Action != "Add";
                            });
                        }
                    }
                    //reset Plan
                    if (callFrom == "Change" || callFrom == "ChangePlan") {
                        if (currentRLI.SrvType == "New Service") {
                            currentRLI.PropSAMId = "";
                            currentRLI.Proposition = "";
                            if (currentRLI.PlanItem.Action == "Add") {
                                Object.keys(currentRLI.PlanItem).forEach(function (item) {
                                    currentRLI.PlanItem[item] = "";
                                });
                            }
                        } else {
                            currentRLI.Proposition = selService.ExistingContractUI.PropositionName;
                            currentRLI.PropSAMId = selService.ExistingContractUI.PropositionSAMId;
                            Object.keys(selService.ExistingContractUI.PlanItem).forEach(function (item) {
                                currentRLI.PlanItem[item] = selService.ExistingContractUI.PlanItem[item];
                            });
                        }
                        var resetChild = ["PackItem", "DDItem", "BonusItem", "CreditItem", "CancelItem"];
                        var resetValue = ["FeeRollItem", "TradeItem"];
                        //remove Addon
                        Object.keys(currentRLI).forEach(function (item) {
                            if (resetChild.includes(item)) {
                                currentRLI[item] = currentRLI[item].filter(function (citem) {
                                    return citem.Action != "Add";
                                });
                            }
                            if (resetValue.includes(item)) {
                                Object.keys(item).forEach(function (vitem) {
                                    item[vitem] = "";
                                });
                            }
                        });
                    }
					if(callFrom == "Edit"){
						var resetChild = ["CreditItem", "DDItem"];
						var uitype = ["OfferCredit", "OfferBonusData","OfferBonusIDD","OfferDD"];
						Object.keys(currentRLI).forEach(function (item) {
                            if (resetChild.includes(item)) {
                                currentRLI[item] = currentRLI[item].filter(function (citem) {
                                    return !uitype.includes(citem.UI_Type);
                                });
                            }                            
                        });
					}
                }
            }

            function resetTiles(){
				$(".vhascbrand, .vhascplantype").removeClass("applet-button-active");
				$("#vhascupgradeapple").addClass("applet-button-active");
				filterBrand = "Apple";
				filterDevices();
			}
			
			//QRLI update in cart
            function cartRLIupdate() {
                $('.vha-sc-deleteEdit-parent').html('');
                var nCartTotal = 0;
                var nAllTotal = 0;
                var index = 0;
                scJson.QuoteHeader.RootItem.forEach(function (item) {
                    var sActive = item.Id == currentRLI.Id && item.Mode == "Edit" ? ' vha-sc-activedeleteEdit' : '';
                    var nRLICost = cartTotalforeachRLI(item);
                    nCartTotal += Number(nRLICost.NewPerMth);
                    nAllTotal += Number(nRLICost.TotalPerMth);
                    index += 1;
                    item.Id = 'QLI-' + index;
                    var buttonElements = item.Mode != "Edit" ? '<span>\
                        <button class="vha-sc-DeletEdit"><span class="vha-sc-EditIcon" assetid="'+item.AssetId+'"></span>&nbsp;&nbsp;</button>\
                        <button class="vha-sc-DeletEdit"><span class="vha-sc-DeleteIcon"></span></button>\
                        </span>' : '';
                    $('.vha-sc-deleteEdit-parent').append('<div class="vha-sc-deleteEdit' + sActive + '" lineid ="' + item.Id + '">\
                        <span>' + item.Id + '</span>\
                        <span>' + item.SrvType + '</span>\
                        <span>$ ' + nRLICost.NewPerMth + '</span>' + buttonElements + '</div>');
                });
                //console.log("nCartTotal-"+parseFloat(nCartTotal).toFixed(2));
                scJson.QuoteHeader.CostPerMonth = parseFloat(nCartTotal).toFixed(2);
                scJson.QuoteHeader.AllCostPerMonth = parseFloat(nAllTotal).toFixed(2);
                $('#vha-sc-cart-TotalAmt').html('$' + parseFloat(nCartTotal).toFixed(2));
				$('#vha-sc-cart-Totalotc').html('$'+parseFloat(scJson.QuoteHeader.OneTimeCost).toFixed(2));
                // cart summary delete icon / edit icon
                $(".vha-sc-deleteEdit-parent").off("click").on("click", ".vha-sc-DeleteIcon", function () {
					pegaflag = "N";
                    var lineId = $(this).parent().parent().parent().attr("lineid");
                    scJson.QuoteHeader.RootItem = scJson.QuoteHeader.RootItem.filter(function (item) {
                        return item.Id != lineId;
                    });
                    cartRLIupdate();
                }).on("click", ".vha-sc-EditIcon", function () {
                    //$(this).parent().attr("lineid");
                    var assetId = $(this).attr("assetid");
					if (scJson.QuoteHeader.RootItem.filter(function (item) {
                            return item.Mode == "Edit";
                        }).length > 0) {
                        alert("Please save the added/modified service before editing the other service");
                    } else {
                        $("#maskoverlay").styleShow();
                        tssleep(10).then(() => {
                            var lineId = $(this).parent().parent().parent().attr("lineid");
                            currentRLI = scJson.QuoteHeader.RootItem.filter(function (item) {
                                return item.Id == lineId;
                            })[0];
                            currentRLI.Mode = "Edit";
                            var editRLIdvc = currentRLI.DeviceItem.filter(function (item) {
                                return item.Action === "Add";
                            });
                            resetCartSummaryUI('New'); // reset and recontruct the device
                            //removeResetItemJson('Edit');
							if (currentRLI.SrvType == "Upgrade Service" && sSession == "Resume") {
                                getExistingSeledtedServiceDetails(currentRLI.AssetId);
                                DisplayContractDetails(currentRLI.AssetId, "ExtCartSummary");
                            }							
                            if (editRLIdvc.length > 0) {
                                //set term, brand								
								$("#sc-device-search").data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                                    item: {
                                        label: editRLIdvc[0].UI__Source_Product_Name,
                                        value: editRLIdvc[0].UI__Source_Product_Name,
                                        type: "GlobalDeviceSearch"
                                    }
                                });
                            }
                            tssleep(20).then(() => {
                                $('.vhasc-d-term').removeClass('applet-button-active');
								$('.vha-sc-shipZipCode').val(currentRLI.ShipPostalCode);
								$('.vha-sc-paytermbtn [term="'+editRLIdvc[0].Term+'"]').addClass('applet-button-active');
								$("[device='" + editRLIdvc[0].UI__Source_Product_Name + "']").parent().find('select.vhasccapacity').val(editRLIdvc[0].UI__Capacity);
								$("[device='" + editRLIdvc[0].UI__Source_Product_Name + "']").parent().find('select.vhasccapacity').change();
                                $("[device='" + editRLIdvc[0].UI__Source_Product_Name + "']").parent().find('select.vhasccolour').val(editRLIdvc[0].UI__Color);
								$("[device='" + editRLIdvc[0].UI__Source_Product_Name + "']").parent().find('select.vhasccolour').change();
								resetRequired = false;
                                if (editRLIdvc.length > 0)
                                    $("[device='" + editRLIdvc[0].UI__Source_Product_Name + "']").trigger("click");
                                if (editRLIdvc[0].Insurance != "") {
                                    $('#vha-sc-phoneins').val(editRLIdvc[0].Insurance);
                                    $('#vha-sc-cart-dvccarecost').text("$" + editRLIdvc[0].InsPri);
                                }
                                //$("#maskoverlay").styleShow();
                                tssleep(60).then(() => {
                                    if (currentRLI.PlanItem.Action == "Add" && currentRLI.PlanItem.Name != "") {
                                        $("#sc-plan-search").data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                                            item: {
                                                label: currentRLI.PlanItem.Name,
                                                value: currentRLI.PlanItem.Name,
                                                type: "GlobalPlanSearch"
                                            }
                                        });
                                        tssleep(70).then(() => {
                                            //$("[device='"+currentRLI.PlanItem.Code+"']").trigger("click");
                                            resetRequired = false;
                                            if (currentRLI.SimO == "SimO") {
                                                $(".vha-sc-simonlyupg input[type=checkbox]").prop("checked", true);
                                                $(".vha-sc-device-select").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-sc-device-select").addClass("VHASCDisplayNone");
                                                $(".vha-h-line").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-h-line").addClass("VHASCDisplayNone");
                                            }
											else if (currentRLI.SimO == "BYOD") {
                                                $(".vha-sc-byod input[type=checkbox]").prop("checked", true);
                                                $(".vha-sc-device-select").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-sc-device-select").addClass("VHASCDisplayNone");
                                                $(".vha-h-line").hasClass("VHASCDisplayNone") == true ? "" : $(".vha-h-line").addClass("VHASCDisplayNone");
                                            }
                                            $("[plancd='" + currentRLI.PlanItem.Code + "']").trigger("click");
                                            //$("#maskoverlay").styleHide();
                                        });
                                    } else {
                                        $("#maskoverlay").styleHide();
                                    }
                                });
                                tssleep(80).then(() => {
                                    //SD device
                                    if (currentRLI.SDItem.length > 0) {
                                        $(".vha-sc-wear-table-main").removeClass("VHASCDisplayNone");
                                        currentRLI.SDItem.forEach(function (wItem) {
                                            $("#vha-sc-wearables-table").append(wearablesListDiv(wItem));
                                        });
                                        $('#vha-sc-cart-SDdvccost').text("$" + parseFloat(currentRLI.SDItem.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.Monthly__Repayment) || 0), 0)).toFixed(2));
                                        $('#vha-sc-cart-Wearablecarecost').text("$" + parseFloat(currentRLI.SDItem.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.InsPri) || 0), 0)).toFixed(2));
                                    }
                                    if (currentRLI.AccItem.length > 0) {
                                        $(".vha-sc-access-table-main").removeClass("VHASCDisplayNone");
                                        currentRLI.AccItem.forEach(function (aItem) {
                                            $("#vha-sc-accessory-table").append(accessoryListDiv(aItem));
                                        });
                                        $('#vha-sc-cart-Accessorycost').text("$" + parseFloat(currentRLI.AccItem.filter(item => item.Action === "Add").reduce((sum, item) => sum + (Number(item.Monthly__Repayment) || 0), 0)).toFixed(2));
                                    }
                                    $("#maskoverlay").styleShow();
                                });

                                /*PackItem,
                                UIType ="Data" or IDD, Action ="Add"
                                Data
                                #vha-sc-da-adon-oneof or #vha-sc-da-adon-recur   #vha-sc-feature-config-addon (ac)

                                IDD
                                #vha-sc-in-calls-oneof #vha-sc-in-calls-recur    #vha-sc-feature-config-idd  (ac)

                                CreditItem,
                                Type: 'Credit', UIType=  "DollarCredit",  or "PercentCredit"
                                #vha-sc-subs-dis    #vha-sc-subs-dis-amt   #vha-sc-feature-config-termrestdisc1
                                #vha-sc-vip-dis     #vha-sc-vip-dis-amt    #vha-sc-feature-config-termrestdisc2

                                DeviceItem Insurance InsPri
                                TradeItem Action ="Add", Price, Period
                                 */
                                tssleep(110).then(() => {
                                    currentRLI.PackItem.forEach(function (pItem) {
                                        if (pItem.UIdivid != undefined) {
                                            loadaddonEdit = true;
                                            $("#" + pItem.UIdivid).prop('checked', true);
                                            if (pItem.UIType == "Data") {
                                                dataAddons(function () {
                                                    setdataInp(pItem.Name);
                                                });
                                                $(".vha-sc-cart-datacost").text("$" + pItem.Price == "" ? "0.00" : pItem.Price);
                                            } else if (pItem.UIType == "IDD") {
                                                iddAddons(function () {
                                                    setiddInp(pItem.Name);
                                                });
                                                $(".vha-sc-cart-iddcost").text("$" + pItem.Price == "" ? "0.00" : pItem.Price);
                                            }
                                        }
                                    });
                                    var manualDis = currentRLI.CreditItem.filter(function (item) {
                                        return item.UIType == "DollarCredit" || item.UIType == "PercentCredit";
                                    });
                                    if (manualDis.length > 0) {
                                        $('#vha-sc-res-dis-recur').trigger("click");
                                    }
                                    currentRLI.CreditItem.forEach(function (cItem) {
                                        if (cItem.UIType == "DollarCredit") {
                                            $('#vha-sc-subs-dis').prop('checked', true);
                                            $('#vha-sc-subs-dis-amt').val(cItem.Price);
                                            $('#vha-sc-feature-config-termrestdisc1').val(cItem.Period);
                                            $("#vha-sc-subs-dis-amt,#vha-sc-feature-config-termrestdisc1").prop('disabled', false);
                                        } else if (cItem.UIType == "PercentCredit") {
                                            $('#vha-sc-vip-dis').prop('checked', true);
                                            $('#vha-sc-vip-dis-amt').val(cItem.UIPercent);
                                            $('#vha-sc-feature-config-termrestdisc2').val(cItem.Period);
                                            $("#vha-sc-vip-dis-amt,#vha-sc-feature-config-termrestdisc2").prop('disabled', false);
                                        }
                                    });
                                    calcManualDiscount();
                                    if (currentRLI.TradeItem.Action == "Add" && currentRLI.TradeItem.Name != "") {
                                        $('.vha-sc-trade-txtbox').val(currentRLI.TradeItem.Price);
                                        $('#vha-sc-trade-termrestdisc').val(currentRLI.TradeItem.Period);
										$(".vha-sc-cart-tradeincost").text("$" + parseFloat(Number(currentRLI.TradeItem.Price/currentRLI.TradeItem.Period)).toFixed(2));
                                    }									
									if(scJson.QuoteHeader.CustomerType == "Existing" && currentRLI.SrvType == "Upgrade Service"){
										getExistingContractEdit(function () {
											displayExstingContractEdit(function () {
												setExstingContractEdit();
											});
										});
									}
									//apply promo if exist
									tssleep(130).then(() => {
										if(currentRLI.Promo != ""){
											$(".vha-sc-PromoCodeInput").val(currentRLI.Promo);
											$(".vha-sc-PromoCodeInput").prop("disabled", true);
											$('#vha-sc-RevertPromoCode').hasClass("VHASCDisplayNone") == true ? $('#vha-sc-RevertPromoCode').removeClass("VHASCDisplayNone") : "";
											$("#vha-sc-ApplyPromoCode").hasClass("VHASCDisplayNone") == true ? "" : $('#vha-sc-ApplyPromoCode').addClass("VHASCDisplayNone");
											applyPromo(currentRLI.Promo);
										}
									});
                                });
                            });

                            if (!$(this).parent().parent().parent().hasClass("vha-sc-activedeleteEdit"))
                                $(this).parent().parent().parent().addClass("vha-sc-activedeleteEdit");
                            $(this).parent().parent().remove();
                        });
                    }
                });
            }
			
			function getExistingContractEdit(callback){
				getExistingSeledtedServiceDetails(currentRLI.AssetId);
				DisplayContractDetails(currentRLI.AssetId, 'ExtCartSummary');
				callback();
			}
			
			function displayExstingContractEdit(callback){
				// loop thru and update the UI
				$('.vha-sc-ExistingContractsSum').hasClass("VHASCDisplayNone") == true ? $('.vha-sc-ExistingContractsSum').removeClass("VHASCDisplayNone") : "";
				$(".vha-sc-existingcontracts-main").hasClass("VHASCDisplayNone") == true ? $(".vha-sc-existingcontracts-main").removeClass("VHASCDisplayNone") : "";
				callback();
			}
			
			function setExstingContractEdit(){// ???
				$('.vha-sc-ExistCustTerminateBtn').each(function() {					
					var intId = $(this).attr('intid');
					var dId = $(this).attr('id');
					currentRLI.OtpItem.forEach(function (oItem) {
						if(oItem.UI_intid == intId){
							if(dId == "sc-terminate")
								$('#sc-terminate[intid="'+intId+'"]').hasClass("VHASCDisplayNone") == true ? "" : $('#sc-terminate[intid="'+intId+'"]').addClass("VHASCDisplayNone");
							if(dId == "sc-revert")
								$('#sc-revert[intid="'+intId+'"]').removeClass("VHASCDisplayNone");
						}					
					});
					if(currentRLI.FeeRollItem.Name != ""){
						$(".vha-sc-EarlyUpgradeBtn").removeClass("applet-button-active");
						if(currentRLI.FeeRollItem.Period != "")
							$('.vha-sc-EarlyUpgradeBtn:contains("'+currentRLI.FeeRollItem.Period+'")').addClass("applet-button-active");
						else
							$('.vha-sc-EarlyUpgradeBtn:contains("One Time")').addClass("applet-button-active");
					}
				});				
			}
			
            function setiddInp(value) {
                $("#vha-sc-feature-config-idd").val(value);
            }
            function setdataInp(value) {
                $("#vha-sc-feature-config-addon").val(value);
            }

            function cartTotalforeachRLI(item) {
                var nTotalCost = 0;
                var nTotalAllCost = 0;
                var addDvc = item.DeviceItem.filter(function (item) {
                    return item.Action === "Add";
                });

                if (addDvc.length > 0) {
                    nTotalCost += Number(addDvc[0].Monthly__Repayment);
                    nTotalCost += Number(addDvc[0].InsPri);
                }

                nTotalCost += item.PlanItem.Action == "Add" ? Number(item.PlanItem.Price) : 0;
                nTotalCost += Number(item.FeeRollItem.Price);

                //SD
                var sdObj = item.SDItem.filter(function (item) {
                    return item.Action === "Add";
                });
                for (var i = 0; i < sdObj.length; i++) {
                    if (sdObj[i].Monthly__Repayment)
                        nTotalCost += Number(sdObj[i].Monthly__Repayment);
                    if (sdObj[i].InsPri)
                        nTotalCost += Number(sdObj[i].InsPri);
                }
                //accossories
                var accObj = item.AccItem.filter(function (item) {
                    return item.Action === "Add";
                });

                for (var i = 0; i < accObj.length; i++) {
                    if (accObj[i].Monthly__Repayment)
                        nTotalCost += Number(accObj[i].Monthly__Repayment);
                }
                //PackItem
                var packItemobj = item.PackItem.filter(function (item) {
                    return item.Action === "Add";
                });
                for (var i = 0; i < packItemobj.length; i++) {
                    if (packItemobj[i].Price)
                        nTotalCost += Number(packItemobj[i].Price);
                }
                //Credit Item
                var crdItemobj = item.CreditItem.filter(function (item) {
                    return item.Action === "Add";
                });
                for (var i = 0; i < crdItemobj.length; i++) {
                    if (crdItemobj[i].UI_Price)
                        nTotalCost -= Number(crdItemobj[i].UI_Price);
                    if (crdItemobj[i].Price)
                        nTotalCost -= Number(crdItemobj[i].Price);
                }
                //Device Discount
                var ddItemobj = item.DDItem.filter(function (item) {
                    return item.Action === "Add";
                });
                for (var i = 0; i < ddItemobj.length; i++) {
                    if (ddItemobj[i].UI_Price)
                        nTotalCost -= Number(ddItemobj[i].UI_Price);
                }
                //Bonus
                var bItemobj = item.BonusItem.filter(function (item) {
                    return item.Action === "Add";
                });
                for (var i = 0; i < bItemobj.length; i++) {
                    if (bItemobj[i].Price)
                        nTotalCost -= Number(bItemobj[i].Price);
                }

                //Trade In/Out
                if (item.TradeItem.Price != "" && item.TradeItem.Period != "")
                    nTotalCost -= Number(item.TradeItem.Price / item.TradeItem.Period);

                //-------------------------------------------------------------------------//

                //****Existing*****
                var extDvc = item.DeviceItem.filter(function (item) {
                    return item.Action === "Existing";
                });

                extDvc.forEach(function (item) {
                    nTotalAllCost += Number(item.Monthly__Repayment);
                });
                nTotalAllCost += item.PlanItem.Action == "Existing" ? Number(item.PlanItem.Price) : 0;

                //SD
                var EsdObj = item.SDItem.filter(function (item) {
                    return item.Action === "Existing";
                });
                for (var i = 0; i < EsdObj.length; i++) {
                    if (EsdObj[i].Monthly__Repayment)
                        nTotalAllCost += Number(EsdObj[i].Monthly__Repayment);
                }
                //accossories
                var EaccObj = item.AccItem.filter(function (item) {
                    return item.Action === "Existing";
                });

                for (var i = 0; i < EaccObj.length; i++) {
                    if (EaccObj[i].Monthly__Repayment)
                        nTotalAllCost += Number(EaccObj[i].Monthly__Repayment);
                }

                // existing end
                item.SrvPerMth = mTruncate(parseFloat(nTotalCost).toString());
                item.TotalSrvPerMth = mTruncate(parseFloat(Number(nTotalCost) + Number(nTotalAllCost)).toString());
                try {
					scJson.QuoteHeader.OneTimeCost = parseFloat(currentRLI.OtpItem.filter(item => item.Action === "Add" && item.Name != "Prepayment").reduce((sum, item) => sum + (Number(item.Price) || 0), 0)).toFixed(2);
				} catch (e) {
					scJson.QuoteHeader.OneTimeCost = "0.00";
				}
				return {
                    NewPerMth: item.SrvPerMth,
                    TotalPerMth: item.TotalSrvPerMth
                };
            }

            function calcManualDiscount() {
                var sum = 0;
                for (var i = 0; i < currentRLI.CreditItem.length; i++) {
                    // Convert Price to a number and add to the sum
                    if (currentRLI.CreditItem[i].Price)
                        sum += parseFloat(currentRLI.CreditItem[i].Price);
                }
                $('#vha-sc-cart-restrictdiscaddoncost').text("$" + sum.toFixed(2));
                return sum.toFixed(2);

            }

            function TotalEquipmentLimit() {
                var nTotalContractAmt = 0;
                var nPrepayAmt = 0;
                var nTerminatedAmt = 0;
                var ndvcPrepaymentAmt = 0;
                var nsdPrepaymentAmt = 0;
                var naccPrepaymentAmt = 0;
                nPrepayAmt += Number(scJson.QuoteHeader.Prepayment.PrepaymentAmt);
                scJson.QuoteHeader.RootItem.forEach(function (rItem, rIdx) {
                    rItem.DeviceItem.forEach(function (dvcItem, dvcIdx) {
                        if (dvcItem.Action == "Add") {
                            nTotalContractAmt += Number(dvcItem.Contract__Amount);
                            ndvcPrepaymentAmt += Number(dvcItem.Prepayment__Amount);
                        }
                    });
                    rItem.SDItem.forEach(function (sdItem, sdIdx) {
                        if (sdItem.Action == "Add") {
                            nTotalContractAmt += Number(sdItem.Contract__Amount);
                            nsdPrepaymentAmt += Number(sdItem.Prepayment__Amount);
                        }
                    });
                    rItem.AccItem.forEach(function (accItem, accIdx) {
                        if (accItem.Action == "Add") {
                            nTotalContractAmt += Number(accItem.Contract__Amount);
                            naccPrepaymentAmt += Number(accItem.Prepayment__Amount);
                        }
                    });
                    rItem.OtpItem.forEach(function (optItem, otpIdx) {
                        if (optItem.Name == "Device Payout Fee")
                            nTerminatedAmt += Number(optItem.Price);
                    });
                });

                return {
                    nTotalContractAmt,
                    nPrepayAmt,
                    nTerminatedAmt,
                    ndvcPrepaymentAmt,
                    nsdPrepaymentAmt,
                    naccPrepaymentAmt
                };
            }

            //adjust the Prepayment amount in acc, sd, dvc ??
            function adjustPrepayment() {
                var rAmt = scJson.QuoteHeader.Prepayment.PrepaymentAmt == "" ? 0 : parseFloat(scJson.QuoteHeader.Prepayment.PrepaymentAmt);
                var itemCount = 0;
                //debugger;
                console.log(currentRLI);
                console.log("rAmt-->" + rAmt);
                scJson.QuoteHeader.RootItem.forEach(function (ritm) { // reset prepayment - triggered for all
                    Object.keys(ritm).forEach(function (itemName) {
                        if (itemName == "AccItem" || itemName == "SDItem") {
                            ritm[itemName].forEach(function (item) {
                                item.Contract__Amount = item.Total__Accessories__RRP__Inc__GST;
                                item.Prepayment__Amount = "0.00";
                                item.Monthly__Repayment = mTruncate(parseFloat(item.Contract__Amount / item.Term).toString());
                            });
                        } else if (itemName == "DeviceItem") {
                            var currentDVC = ritm["DeviceItem"].filter(function (item) {
                                return item.Action == "Add";
                            });
                            if (currentDVC.length > 0) {
                                currentDVC[0].Contract__Amount = currentDVC[0].UI__RRP__Inc__GST;
                                currentDVC[0].Prepayment__Amount = "0.00";
                                currentDVC[0].Monthly__Repayment = mTruncate(parseFloat(currentDVC[0].Contract__Amount / currentDVC[0].Term).toString());
                            }
                        }
                    });
                });
                console.log("Reset");
                console.log(currentRLI);
                console.log("Reset-END");
                if (rAmt > 0) {
                    scJson.QuoteHeader.RootItem.forEach(function (ritm) {
                        var sortAccItem = ritm["AccItem"].sort(function (a, b) {
                            return parseFloat(a.Contract__Amount) - parseFloat(b.Contract__Amount);
                        });
                        for (var i = 0; i < sortAccItem.length; i++) {
                            if (sortAccItem[i].Action == "Add") {
                                var itemPrice = parseFloat(sortAccItem[i].Contract__Amount);
                                if (rAmt > 0) {
                                    if (rAmt < itemPrice) {
                                        sortAccItem[i].Contract__Amount = parseFloat(itemPrice - rAmt).toFixed(2);
                                        sortAccItem[i].Prepayment__Amount = parseFloat(rAmt).toFixed(2);
                                        sortAccItem[i].Monthly__Repayment = mTruncate(parseFloat(sortAccItem[i].Contract__Amount / sortAccItem[i].Term).toString());
                                        rAmt = 0;
                                    } else {
                                        var rAmttemp = rAmt - itemPrice;
                                        sortAccItem[i].Contract__Amount = "0.00";
                                        sortAccItem[i].Prepayment__Amount = parseFloat(rAmt - rAmttemp).toFixed(2);
                                        sortAccItem[i].Monthly__Repayment = "0.00";
                                        rAmt = rAmttemp;
                                    }
                                } else {
                                    break;
                                }
                                //console.log(currentRLI["AccItem"]);
                            }
                        }
                    });
                    if (rAmt > 0) {
                        scJson.QuoteHeader.RootItem.forEach(function (ritm) {
                            var sorsdItem = ritm["SDItem"].sort(function (a, b) {
                                return parseFloat(b.Contract__Amount) - parseFloat(a.Contract__Amount);
                            });
                            for (var i = 0; i < sorsdItem.length; i++) {
                                if (sorsdItem[i].Action == "Add") {
                                    var itemPrice = parseFloat(sorsdItem[i].Contract__Amount);
                                    if (rAmt > 0) {
                                        if (rAmt < itemPrice) {
                                            sorsdItem[i].Contract__Amount = parseFloat(itemPrice - rAmt).toFixed(2);
                                            sorsdItem[i].Prepayment__Amount = parseFloat(rAmt).toFixed(2);
                                            sorsdItem[i].Monthly__Repayment = mTruncate(parseFloat(sorsdItem[i].Contract__Amount / sorsdItem[i].Term).toString());
                                            rAmt = 0;
                                        } else {
                                            var rAmttemp = rAmt - itemPrice;
                                            sorsdItem[i].Contract__Amount = "0.00";
                                            sorsdItem[i].Prepayment__Amount = parseFloat(rAmt - rAmttemp).toFixed(2);
                                            sorsdItem[i].Monthly__Repayment = "0.00";
                                            rAmt = rAmttemp;
                                        }
                                    } else {
                                        break;
                                    }
                                }
                            }
                        });
                    }
                    if (rAmt > 0) {
                        scJson.QuoteHeader.RootItem.forEach(function (ritm) {
                            var currentDVC = ritm["DeviceItem"].filter(function (item) {
                                return item.Action == "Add";
                            });
                            if (currentDVC.length > 0) {
                                var itemPrice = parseFloat(currentDVC[0].Contract__Amount);
                                if (rAmt > 0) {
                                    if (rAmt < itemPrice) {
                                        currentDVC[0].Contract__Amount = parseFloat(itemPrice - rAmt).toFixed(2);
                                        currentDVC[0].Prepayment__Amount = parseFloat(rAmt).toFixed(2);
                                        currentDVC[0].Monthly__Repayment = mTruncate(parseFloat(currentDVC[0].Contract__Amount / currentDVC[0].Term).toString());
                                        rAmt = 0;
                                    } else {
                                        var rAmttemp = rAmt - itemPrice;
                                        currentDVC[0].Contract__Amount = "0.00";
                                        currentDVC[0].Prepayment__Amount = parseFloat(rAmt - rAmttemp).toFixed(2);
                                        currentDVC[0].Monthly__Repayment = "0.00";
                                    }
                                }
                            }
                        });
                        /*
                        var currentDVC = currentRLI["DeviceItem"].filter(function (item) {
                        return item.Action == "Add";
                        });
                        if (currentDVC.length > 0) {
                        var itemPrice = parseFloat(currentDVC[0].Contract__Amount);
                        currentDVC[0].Contract__Amount = parseFloat(itemPrice - rAmt).toFixed(2);
                        currentDVC[0].Prepayment__Amount = parseFloat(rAmt).toFixed(2);
                        currentDVC[0].Monthly__Repayment = mTruncate(parseFloat(currentDVC[0].Contract__Amount / currentDVC[0].Term).toString());
                        }
                        //console.log(currentDVC);*/
                    }
                    //console.log(currentRLI);
                }
            }

            // elasticSearch url construc
            function elasticSearchurl(param) {
                var searchKey = "";
                var sESEndPoint = "";
                switch (param) {
                case "Plan":
                    searchKey = currentRLI.SrvType == "Upgrade Service" ? "upgdvcplan" : "condvcplan";
                    break;
                case "DevicePlan":
                    if (currentRLI.SrvType == "Upgrade Service")
                        if (currentRLI.UpgradeOfferType == "Upgrade to New Plan")
                            searchKey = "upgdvcplan";
                        else if (currentRLI.UpgradeOfferType == "Resign" || currentRLI.UpgradeOfferType == "Upgrade RRP on Instalment")
                            searchKey = "upgoutrit";
                        else
                            searchKey = "condvcplan";
                    else
                        searchKey = "condvcplan";
                    break;
                case "Device":
                    if (currentRLI.SrvType == "Upgrade Service")
                        if (currentRLI.UpgradeOfferType == "Upgrade to New Plan")
                            searchKey = "upgdvcplan";
                        else if (currentRLI.UpgradeOfferType == "Resign" || currentRLI.UpgradeOfferType == "Upgrade RRP on Instalment")
                            searchKey = "upgoutrit";
                        else
                            searchKey = "condvc";
                    else
                        searchKey = "condvc";
                    break;
                case "SimOnlyPlan":
					if (currentRLI.UpgradeOfferType == "Upgrade to New Plan")//Vasavi added if cond for Sales Calc prod Issue#3
                            searchKey = "upgdvcplan";
					else
                    searchKey = "consimoplan";
                    break;
                case "SecondaryDevice":
                    searchKey = "secondarydevices";
                    break;
                case "Accessories":
                    searchKey = "accessories";
                    break;
                }
                if (window.location.href.indexOf("partnerportal") > -1) {
                    sESEndPoint = window.location.href.substr(8, window.location.href.indexOf("/siebel/app/retail/enu?") - 8) + "/config";
                } else {
                    sESEndPoint = window.location.host + "/config";
                }
                sESEndPoint = sESEndPoint + "/" + searchKey + "/_search";
                return "https://" + sESEndPoint;
            }

            //Address Coverage check
            function VHACovergaeCheck(sResp, this_t) { // ??
                if (sResp != "")
                    fCoverageCheck(sResp, this_t);
            }
            function fCoverageCheck(sResp, this_t) {
                //$('[aria-label="Customer Type:Coverage Check"]').trigger("click")
                // $('[aria-label="Customer Type Form Applet:Coverage Check"]').trigger("click");
                //$('[name=' + this_t.GetPM().Get("GetControls")["Coverage Check"].GetInputName() + ']').trigger("click");
                var nser = SiebelApp.S_App.GetService("VF BS Process Manager");
                var nInputs = SiebelApp.S_App.NewPropertySet();
                nInputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service Sales Calc");
                nInputs.SetProperty("role", "VCS");
                nInputs.SetProperty("longitude", sResp.address.geometry.coordinates[0]); //??
                nInputs.SetProperty("latitude", sResp.address.geometry.coordinates[1]);
                SiebelApp.S_App.SetProfileAttr("Testlan", sResp.address.geometry.coordinates[0]);
                SiebelApp.S_App.SetProfileAttr("Testlog", sResp.address.geometry.coordinates[1]);
                //nInputs.SetProperty("SessionId", vSessionId);
                nInputs.SetProperty("Method Name", "CoverageCheck");
                var ROups = nser.InvokeMethod("Run Process", nInputs);
                //var CCAppId = this_t.GetPM().Get("GetFullId");
                var s4G,
                s5G,
                s5Gsa,
                s5Gnsa;
                var resultCov = [];
                for (let i = 0; i < ROups.GetChildByType("ResultSet").childArray[1].childArray.length; i++) {
                    var curPropArr = ROups.GetChildByType("ResultSet").childArray[1].childArray[i].propArray;
                    resultCov.push(curPropArr);
                }

                ////console.log(resultCov);
                //var suiURL = ROups.childArray[0].childArray[0].childArray[1].childArray[3].childArray[0].propArray.uiUrl;
                var suiURL = SiebelApp.S_App.GetProfileAttr("URL1");
                //SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Customer Details TBC").SetFieldValue("Map URL", "https://mapt.vodafone.com.au/VHAMap/apps/retail-vf?lat=-33.52220942&lon=151.19767066&zl=16&device=generic5g");
                const arrSite = [...new Set(resultCov.map(x => x.Site))];
                //var ccpardiv = '<div class="ccNwkpar">';
                //var hdrdiv = "";
                //console.log(arrSite);
                arrSite.forEach(function (item1, index) {
                    // //console.log(index+". "+item);
                    var arrNetwork = resultCov.filter(function (a) {
                        return a.Site == item1;
                    });
                    //console.log(arrNetwork);
                    //hdrdiv = hdrdiv + '<div class="ccNwkchdmain"><div class="ccNwkhdr" id="ccNwkhdr"' + index + '>' + item1 + '</div><div class="ccNwkchd">';
                    arrNetwork.forEach(function (item2, index) {
                        if (item2.PropName != "") {
                            // //console.log(item.PropName+' == '+item.PropValue);
                            switch (item1) {
                            case "4G/5G Home Internet":
                                switch (item2.PropName) {
                                case "is4G":
                                    MapShed.FWA.f4G.is4G = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is5G":
                                    MapShed.FWA.f5G.is5G = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is5Gsa":
                                    MapShed.FWA.f5GSA.is5Gsa = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is5Gnsa":
                                    MapShed.FWA.f5GNSA.is5Gnsa = item2.PropValue == "true" ? true : false;
                                    break;
                                };
                                break;
                            case "Mobile Coverage": //"mobilestatus":
                                switch (item2.PropName) {
                                case "is5Gindoor":
                                    MapShed.Mobile.m5G.indoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is5Goutdoor":
                                    MapShed.Mobile.m5G.outdoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is5GindoorNsa":
                                    MapShed.Mobile.m5GNSA.indoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is5GoutdoorNsa":
                                    MapShed.Mobile.m5GNSA.outdoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is5GindoorSa":
                                    MapShed.Mobile.m5GSA.indoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is5GoutdoorSa":
                                    MapShed.Mobile.m5GSA.outdoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is4Gindoor":
                                    MapShed.Mobile.m4G.indoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is4Goutdoor":
                                    MapShed.Mobile.m4G.outdoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is4GindoorNsa":
                                    MapShed.Mobile.m4GNSA.indoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is4GoutdoorNsa":
                                    MapShed.Mobile.m4GNSA.outdoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is4GindoorSa":
                                    MapShed.Mobile.m4GSA.indoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is4GoutdoorSa":
                                    MapShed.Mobile.m4GSA.outdoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is3Gindoor":
                                    MapShed.Mobile.m3G.indoor = item2.PropValue == "true" ? true : false;
                                    break;
                                case "is3Goutdoor":
                                    MapShed.Mobile.m3G.outdoor = item2.PropValue == "true" ? true : false;
                                    break;
                                }
                                break;
                            default:
                                break;
                            }

                            /*if (item2.PropValue == "true")
                            var div = '<div class="ccNwk  btn CoverageCheckActive" id="ccNwk"' + index + '> ' + item2.PropName + '</div>';
                            else
                            var div = '<div class="ccNwk btn CoverageCheckInactive" id="ccNwk"' + index + '> ' + item2.PropName + '</div>';

                            hdrdiv = hdrdiv + div;*/
                        }
                    });
                    var div = "";
                    switch (item1) {
                    case "4G/5G Home Internet":
                        var dVal = MapShed.FWA.f4G.is4G == true ? "4G – Available" : "4G - Not available";
                        var dCls = MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        //div = div + '<div class="ccNwk  btn ' + dCls + '" id="f4G"> ' + dVal + '</div>';
                        s4G = MapShed.FWA.f4G.is4G;
						// Hari 31/may/2024
						if (s4G == false) {
							$("#vha-sc-4G-Avl .vha-sc-coverageStatus").addClass("CSRed");
							$("#vha-sc-4G-home-status").text(dVal);
						} 
						else 
						{
							$("#vha-sc-4G-Avl .vha-sc-coverageStatus").addClass("CSGreen");
							$("#vha-sc-4G-home-status").text(dVal);
						}

                        var dVal = MapShed.FWA.f5G.is5G == true ? "5G – Available" : "5G – Not available";
                        var dCls = MapShed.FWA.f5G.is5G == true ? "ccmsGreen" : "ccmsRed";
                        //div = div + '<div class="ccNwk  btn ' + dCls + '" id="f5G"> ' + dVal + '</div>';
                        s5G = MapShed.FWA.f5G.is5G;
                        if (s5G == false) 
						{
							$("#vha-sc-5G-NA .vha-sc-coverageStatus").addClass("CSRed");
							$("#vha-sc-5G-home-status").text(dVal);
						} 
						else 
						{
							$("#vha-sc-5G-NA .vha-sc-coverageStatus").addClass("CSGreen");
							$("#vha-sc-5G-home-status").text(dVal);
						}

                        var dVal = MapShed.FWA.f5GNSA.is5Gnsa == true ? "5G NSA – Available" : "5G NSA – Not available";
                        var dCls = MapShed.FWA.f5GNSA.is5Gnsa == true ? "ccmsGreen" : "ccmsRed";
                        //div = div + '<div class="ccNwk  btn ' + dCls + '" id="f5GNSA"> ' + dVal + '</div>';
                        s5Gnsa = MapShed.FWA.f5GNSA.is5Gnsa;
                        if (s5Gnsa == false)
						{
							$("#vha-sc-5GNSA-NA .vha-sc-coverageStatus").addClass("CSRed");
							$("#vha-sc-5GNSA-home-status").text(dVal);
						} 
						else 
						{
							$("#vha-sc-5GNSA-NA .vha-sc-coverageStatus").addClass("CSGreen");
							$("#vha-sc-5GNSA-home-status").text(dVal);
						}

                        break;
                    case "Mobile Coverage": //"mobilestatus":
                        var m = MapShed.Mobile.m3G;
                        var dVal = m.indoor == true && m.outdoor == true ? "3G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "3G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "3G - Indoor Only" : "3G - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        //div = div + '<div class="ccNwk  btn ' + dCls + '" id="m3G"> ' + dVal + '</div>';
                        // Hari 31/may/2024
						if (dCls == "ccmsRed") {
							$("#vha-sc-3G-IO .vha-sc-coverageStatus").addClass("CSRed");
							$("#vha-sc-3G-IO-mobile").text(dVal);
						} else if (dCls == "ccmsOrange") {
							$("#vha-sc-3G-IO .vha-sc-coverageStatus").addClass("CSOrange");
							$("#vha-sc-3G-IO-mobile").text(dVal);
						} else {
							$("#vha-sc-3G-IO .vha-sc-coverageStatus").addClass("CSGreen");
							$("#vha-sc-3G-IO-mobile").text(dVal);
						}

                        m = MapShed.Mobile.m4G;
                        var dVal = m.indoor == true && m.outdoor == true ? "4G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "4G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "4G - Indoor Only" : "4G - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        if (dCls == "ccmsRed") {
							$("#vha-sc-4G-IO .vha-sc-coverageStatus").addClass("CSRed");
							$("#vha-sc-4G-IO-mobile").text(dVal);
						} else if (dCls == "ccmsOrange") {
							$("#vha-sc-4G-IO .vha-sc-coverageStatus").addClass("CSOrange");
							$("#vha-sc-4G-IO-mobile").text(dVal);
						} else {
							$("#vha-sc-4G-IO .vha-sc-coverageStatus").addClass("CSGreen");
							$("#vha-sc-4G-IO-mobile").text(dVal);
						}
                        //div = div + '<div class="ccNwk  btn ' + dCls + '" id="m4G"> ' + dVal + '</div>';
                        /*
                        m=MapShed.Mobile.m4GSA;
                        var dVal = m.indoor==true&&m.outdoor==true?"4G SA - Indoor & Outdoor":m.indoor==false&&m.outdoor==true?"4G SA - Outdoor Only":m.indoor==true&&m.outdoor==false?"4G SA - Indoor Only":"4G SA - No coverage";
                        var dCls = m.indoor==true&&m.outdoor==true?"ccmsGreen":m.indoor==false&&m.outdoor==true?"ccmsOrange":m.indoor==true&&m.outdoor==false?"ccmsOrange":"ccmsRed";
                        MapShed.FWA.f4G.is4G==true?"ccmsGreen":"ccmsRed";
                        div = div + '<div class="ccNwk  btn '+dCls+'" id="m4GSA"> ' + dVal + '</div>';

                        m=MapShed.Mobile.m4GNSA;
                        var dVal = m.indoor==true&&m.outdoor==true?"4G NSA - Indoor & Outdoor":m.indoor==false&&m.outdoor==true?"4G NSA - Outdoor Only":m.indoor==true&&m.outdoor==false?"4G NSA - Indoor Only":"4G NSA - No coverage";
                        var dCls = m.indoor==true&&m.outdoor==true?"ccmsGreen":m.indoor==false&&m.outdoor==true?"ccmsOrange":m.indoor==true&&m.outdoor==false?"ccmsOrange":"ccmsRed";
                        MapShed.FWA.f4G.is4G==true?"ccmsGreen":"ccmsRed";
                        div = div + '<div class="ccNwk  btn '+dCls+'" id="m4GNSA"> ' + dVal + '</div>';

                        m = MapShed.Mobile.m5GSA;
                        var dVal = m.indoor == true && m.outdoor == true ? "5G SA - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "5G SA - Outdoor Only" : m.indoor == true && m.outdoor == false ? "5G SA - Indoor Only" : "5G SA - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="m5GSA"> ' + dVal + '</div>';
                         */
                        m = MapShed.Mobile.m5G;
                        var dVal = m.indoor == true && m.outdoor == true ? "5G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "5G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "5G - Indoor Only" : "5G - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        if (dCls == "ccmsRed") {
							$("#vha-sc-5G-O .vha-sc-coverageStatus").addClass("CSRed");
							$("#vha-sc-5G-O-mobile").text(dVal);
						} else if (dCls == "ccmsOrange") {
							$("#vha-sc-5G-O .vha-sc-coverageStatus").addClass("CSOrange");
							$("#vha-sc-5G-O-mobile").text(dVal);
						} else {
							$("#vha-sc-5G-O .vha-sc-coverageStatus").addClass("CSGreen");
							$("#vha-sc-5G-O-mobile").text(dVal);
						}
                        //div = div + '<div class="ccNwk  btn '+dCls+'" id="m5G"> ' + dVal + '</div>';

                        m = MapShed.Mobile.m5GNSA;
                        var dVal = m.indoor == true && m.outdoor == true ? "5G NSA - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "5G NSA - Outdoor Only" : m.indoor == true && m.outdoor == false ? "5G NSA - Indoor Only" : "5G NSA - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        if (dCls == "ccmsRed") {
							$("#vha-sc-5GNSA-NC .vha-sc-coverageStatus").addClass("CSRed");
							$("#vha-sc-5GNSA-NC-mobile").text(dVal);
						} else if (dCls == "ccmsOrange") {
							$("#vha-sc-5GNSA-NC .vha-sc-coverageStatus").addClass("CSOrange");
							$("#vha-sc-5GNSA-NC-mobile").text(dVal);
						} else {
							$("#vha-sc-5GNSA-NC .vha-sc-coverageStatus").addClass("CSGreen");
							$("#vha-sc-5GNSA-NC-mobile").text(dVal);
						}
                        //div = div + '<div class="ccNwk  btn ' + dCls + '" id="m5GNSA"> ' + dVal + '</div>';

                        break;
                    }
                    //hdrdiv = hdrdiv + div;
                    //hdrdiv = hdrdiv + '</div></div>';
                    ////console.log(hdrdiv);
                });

                //console.log(MapShed);
                var nwkmsg = "";
                if (s4G == true || (s5G == true || s5Gnsa == true))
                    nwkmsg = "";
                else
                    nwkmsg = "";
                //nwkmsg = '<div class="ccNwkMsg">4G and 5G Home Internet services are not currently available at this address. You will not be able to connect these services at this address.</div>';
                //ccpardiv = ccpardiv + hdrdiv + nwkmsg + '</div>';
                //$("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").append(ccpardiv);
                //$() get cha
                //$('[name=' + this_t.GetPM().Get("GetControls")["Change Address"].GetInputName() + ']').click;
            }
            function shopDevice(sDeviceDtl, currentDeviceCard) {
                priDeviceProdCd,
                priDeviceName = "";
                priDeviceProdCd = sDeviceDtl.Product_Code;
                priDeviceName = sDeviceDtl.Source_Product_Name;
                var sDvcStockChk = {
                    ErrorCode: "",
                    StockBand: "",
                    ErrorMsg: ""
                };
                sDvcStockChk = ProcessDeviceCheck("DeviceItem", priDeviceProdCd + ";" + priDeviceName, sDeviceDtl, "StockCheckCall");
                switch (sDvcStockChk.StockBand) {
                case "Non-Orderable":
                    currentDeviceCard.prev("div").addClass('sc-stock-status-red');
                    currentDeviceCard.prev("div").find("span").text("Non Orderable");
					//Dev and plan change Rushi - 18JAN2024
					$("#card" + currentDeviceCard.attr("seqnum")).addClass("sc-stock-status-border-red");
                    break;
                case "Available":
                    currentDeviceCard.prev("div").addClass('sc-stock-status-green');
                    currentDeviceCard.prev("div").find("span").text(sDvcStockChk.StockBand);
					//Dev and plan change Rushi - 18JAN2024
					$("#card" + currentDeviceCard.attr("seqnum")).addClass("sc-stock-status-border-green");
                    break;
                case "Low Stock":
                case "Back Order":
                    currentDeviceCard.prev("div").addClass('sc-stock-status-yellow');
                    currentDeviceCard.prev("div").find("span").text(sDvcStockChk.StockBand);
					//Dev and plan change Rushi - 18JAN2024
					$("#card" + currentDeviceCard.attr("seqnum")).addClass("sc-stock-status-border-yellow");
                    break;
                }
				var dtMsg ="";
				if(sDvcStockChk.SCEstDeliveryDt != "")
					dtMsg = "Est Delivery Date: "+sDvcStockChk.SCEstDeliveryDt;
				else
					dtMsg = "Est Delivery Date: N/A";
				if(sDvcStockChk.EstShipmentDt != "")
					dtMsg = dtMsg + " & Est Shipping Date: "+sDvcStockChk.EstShipmentDt;
				else
					dtMsg = dtMsg + " & Est Shipping Date: N/A";
				if($(".vha-sc-shipZipCode").val() !="" && dtMsg != ""){
					$("#vha-sc-d-equiplmtmsg").hasClass("VHASCDisplayNone") == true ? $("#vha-sc-d-equiplmtmsg").removeClass("VHASCDisplayNone") : "";
					$("#vha-sc-d-equiplmtmsg").text(dtMsg);
				}else{
					$("#vha-sc-d-equiplmtmsg").text("");
					$("#vha-sc-d-equiplmtmsg").hasClass("VHASCDisplayNone") == true ? "":$("#vha-sc-d-equiplmtmsg").addClass("VHASCDisplayNone");
				}
                addDevice(sDeviceDtl, sDvcStockChk);
                currentRLI.ShipPostalCode = $('.vha-sc-shipZipCode').val();
				$("#card" + currentDeviceCard.attr("seqnum")).addClass("device-card-selected");
                currentDeviceCard.text("Selected");
            }
            function ProcessDeviceCheck(sItem, sItemVal, priDeviceDtl, StockorIMEI) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VHA Sales Calculator Shop Now Wrapper Workflow");
                Inputs.SetProperty("CartRefresh", "");
                if (StockorIMEI == "StockCheckCall") {
                    Inputs.SetProperty(sItem, sItemVal);
                    Inputs.SetProperty("OutofStock", "Y");
                    Inputs.SetProperty("InvestmentProportion", priDeviceDtl.Investment_Proportion);
                    Inputs.SetProperty("DeviceRRP", priDeviceDtl.RRP_Inc_Gst);
                    Inputs.SetProperty("DeviceMatrixContract", priDeviceDtl.Contract);
					if($('.vha-sc-shipZipCode').val() != "")
						Inputs.SetProperty("SCZipCode", $('.vha-sc-shipZipCode').val());
                }
                Inputs.SetProperty("UpgradeOfferType", currentRLI.UpgradeOfferType);
                Inputs.SetProperty("RatePlanSAMId", currentRLI.PlanItem.Code);
                Inputs.SetProperty("RatePlanPriceIncGST", currentRLI.PlanItem.Price);
                Inputs.SetProperty("PropSAMId", currentRLI.PropSAMId);
                Inputs.SetProperty("Object Id", scJson.QuoteHeader.QuoteId);
                Inputs.SetProperty("DealerRowId", SiebelApp.S_App.GetUserName());
                Inputs.SetProperty("DeviceCode", priDeviceDtl.Product_Code);
                Inputs.SetProperty("DeviceContract", $(".vhasc-d-term.applet-button-active").attr("term"));
                Inputs.SetProperty("ExistingCustomer", scJson.QuoteHeader.CustomerType == "Existing" ? "Y" : "N");
                //debugger;
                var Output = ser.InvokeMethod("RunProcess", Inputs);
                /*SiebelApp.S_App.GetActiveView().GetApplet("VHA Shipping Address Details Applet - 3 Step Upgrade").InvokeMethod("NewQuery");
                SiebelApp.S_App.GetActiveView().GetApplet("VHA Shipping Address Details Applet - 3 Step Upgrade").InvokeMethod("ExecuteQuery");*/
                console.log("device offer below");
                console.log(Output);
                ProcessOfferResponse(Output.GetChildByType("ResultSet"),"");
                return Output.GetChildByType("ResultSet").propArray;
            }

            function mTruncate(sValue) {
                var sPoint = "",
                sTruncValue = "0.00",
                sLeft = "0",
                sRight = "00";
                try {
                    if (sValue != "" && sValue != "undefined" && sValue != "Undefined") {
                        sPoint = sValue.indexOf(".");
                        if (sPoint != -1) {
                            sLeft = sValue.substring(0, sPoint);
                            sRight = sValue.substring(sPoint + 1, sPoint + 3);
                            if (sRight == "" || sRight == null) {
                                sRight = "00";
                            }
                            sTruncValue = sLeft + "." + sRight;
                            sTruncValue = parseFloat(sTruncValue).toFixed(2);
                        } else {
                            sTruncValue = sValue + ".00";
                        }
                    }
                    return sTruncValue;
                } catch (e) {
                    return sTruncValue;
                }
            }
            function addDevice(devicedtl, sDvcStockChk) {
                var currentRLIDevice = "";
                var jsonDvc = "";
                jsonDvc = currentRLI.DeviceItem.filter(function (item) {
                    return item.Action === "Add";
                });
                if (jsonDvc.length > 0) {
                    currentRLIDevice = jsonDvc[0];
                } else {
                    currentRLIDevice = {};
                }
                currentRLIDevice.Action = "Add";
                currentRLIDevice.Name = "GPP Device Contract";
                currentRLIDevice.ProdIntegrationId = "";
                currentRLIDevice.Additional__Info = "";
                currentRLIDevice.Category = "Device";
                currentRLIDevice.IMEI___Serial__Number = "";
                currentRLIDevice.Item__Code = devicedtl.Product_Code;
                currentRLIDevice.Item__Name = devicedtl.Device_Name;
                currentRLIDevice.Contract__Amount = devicedtl.RRP_Inc_Gst; // ?? stock check ??
                currentRLIDevice.Monthly__Repayment = mTruncate(parseFloat(devicedtl.RRP_Inc_Gst / $(".vhasc-d-term.applet-button-active").attr("term")).toString());
                currentRLIDevice.Original__Order__Number = "";
                currentRLIDevice.Original__Purchase__Date = "";
                currentRLIDevice.Prepayment__Amount = "";
                currentRLIDevice.Term = $(".vhasc-d-term.applet-button-active").attr("term");
                currentRLIDevice.Term__Override = "";
                currentRLIDevice.Insurance = "";
                currentRLIDevice.InsPri = "";
                currentRLIDevice.Type = "Device";
                currentRLIDevice.UI__RRP__Inc__GST = devicedtl.RRP_Inc_Gst;
                currentRLIDevice.UI__Color = devicedtl.Color;
                currentRLIDevice.UI__Capacity = devicedtl.Capacity;
                currentRLIDevice.UI__Source_Product_Name = devicedtl.Source_Product_Name;
                if (jsonDvc.length === 0) {
                    currentRLI.DeviceItem.push(currentRLIDevice);
                }
                $('#vha-sc-cart-dvcname').html(devicedtl.Source_Product_Name);
                $('#vha-sc-cart-dvccost').html('$' + mTruncate(parseFloat(devicedtl.RRP_Inc_Gst / $(".vhasc-d-term.applet-button-active").attr("term")).toString()));
                getPlanDetails();
            }
            function tssleep(ms) {
                return new Promise(function (resolve) {
                    return setTimeout(resolve, ms);
                });
            }
            function updateDeviceTerm() {
                var sActualDevicePrice = tsintitialData.OrderHeader.Device.Device__RCC__Inc__GST;
                var gppdvcecontract = tsintitialData.OrderHeader.GppDeviceContract;
                gppdvcecontract.Contract__Amount = sActualDevicePrice;
                gppdvcecontract.Term = $(".vhasc-d-term.applet-button-active").attr("term");
                gppdvcecontract.Monthly__Repayment = mTruncate(parseFloat(gppdvcecontract.Contract__Amount / gppdvcecontract.Term).toString());
                gppdvcecontract.Prepayment__Amount = 0;
                //mSetPrepaymentaccordion();
            }
            function getPlanDetails() {
				nestedData = []; // Hari added for pega 31/Aug/2024
                if (currentRLI.SimO == "SimO" || currentRLI.SimO == "BYOD") //03Nov
                {
                    var queryReq = "{}";
					if(currentRLI.UpgradeOfferType == "Upgrade to New Plan")//Vasavi added if cond for Sales Calc prod Issue#3
					{
					queryReq = '{\r\n    "size": 4000,\r\n    "query": {\r\n        "bool": {\r\n            "must": {\r\n                "match": {\r\n                    "Product_Code": {\r\n                    \t"query":"' + priDeviceProdCd + '",\r\n                    \t"operator": "and"\r\n		                   }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}';
					}
					else if(currentRLI.SimO == "BYOD"){
						queryReq = '{\r\n    "size": 10000,\r\n    "query": {\r\n        "bool": {\r\n            "must": {\r\n                "match": {\r\n                    "Plan_Type": {\r\n                    \t"query":"NBN",\r\n                    \t"operator": "and"\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}';
					}else{
						queryReq = '{\r\n    "size": 10000,\r\n    "query": {\r\n        "bool": {\r\n            "must_not": {\r\n                "match": {\r\n                    "Plan_Type": {\r\n                    \t"query":"NBN",\r\n                    \t"operator": "and"\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}';
					}
					var settings = {
                        "async": false,
                        "crossDomain": true,
                        "url": elasticSearchurl('SimOnlyPlan'),
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            "postman-token": "dd0b3ba5-1198-5a10-3472-8119a5d93f7c"
                        },
                        "processData": false,
                        "data": queryReq
                        //"data": '{\r\n    "size": 4000,\r\n    "query": {\r\n        "bool": {\r\n            "must": {\r\n                "match": {\r\n                    "Product_Code": {\r\n                    \t"query":"' + priDeviceProdCd + '",\r\n                    \t"operator": "and"\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}'
                    };
                } else { //03Nov
                    var settings = {
                        "async": false,
                        "crossDomain": true,
                        "url": elasticSearchurl('Plan'),
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            "postman-token": "dd0b3ba5-1198-5a10-3472-8119a5d93f7c"
                        },
                        "processData": false,
                        "data": '{\r\n    "size": 4000,\r\n    "query": {\r\n        "bool": {\r\n            "must": {\r\n                "match": {\r\n                    "Product_Code": {\r\n                    \t"query":"' + priDeviceProdCd + '",\r\n                    \t"operator": "and"\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}'
                    };
                }
                $.ajax(settings).done(function (planresponse) {
                    var filteredplanname = [];
                    for (i = 0; i < planresponse.hits.hits.length; i++) {
                        if (!filteredplanname.includes(Object.values(planresponse.hits.hits)[i]._source.Plan_Name)) {
                            filteredplanname.push(Object.values(planresponse.hits.hits)[i]._source.Plan_Name);
                        }
                    }
                    $("#sc-plan-search").autocomplete({
                        source: filteredplanname.map(function (a) {
                            return {
                                label: a,
                                value: a,
                                type: "GlobalPlanSearch"
                            };
                        }),
                        minLength: 0,
                        select: selectAutoCompleteVal
                    });
                    sRsnBasedplnresp = [];
                    for (i = 0; i < planresponse.hits.hits.length; i++) {
                        sRsnBasedplnresp.push(planresponse.hits.hits[i]);
                    }
                    createPlanTiles(sRsnBasedplnresp);
                    /*if (sessionType == "Paused" && sResume == "Y" && pausedDetails.OrderHeader.RedPlusPlan.Name != "") {
                    var planFilter = [];
                    for (i = 0; i < sRsnBasedplnresp.length; i++) {
                    if (sRsnBasedplnresp[i]._source.Plan_Name.toLowerCase().indexOf(pausedDetails.OrderHeader.RedPlusPlan.Name.toLowerCase()) > -1) {
                    planFilter.push(sRsnBasedplnresp[i]);
                    }
                    }
                    createPlanTiles(planFilter);
                    } else {
                    createPlanTiles(sRsnBasedplnresp);
                    }
                    if (sessionType == "Paused" && sResume == "Y" && pausedDetails.OrderHeader.RedPlusPlan.Name != "") {
                    $("#vha-ts-p-carousel-container .vha-ts-addtocartbtn[planname='" + pausedDetails.OrderHeader.RedPlusPlan.Name + "']").trigger("click");
                    if (pausedDetails.OrderHeader.RCCEditable == "Y") {
                    $(".vha-ts-rcc").attr("disabled", false);
                    tsintitialData.OrderHeader.RCCEditable = "Y";
                    }
                    if (pausedDetails.OrderHeader.RCCValue != "") {
                    $(".vha-ts-rcc").val(pausedDetails.OrderHeader.RCCValue).change();
                    tsintitialData.OrderHeader.RCCValue = pausedDetails.OrderHeader.RCCValue;
                    }
                    pausedDetails.OrderHeader.RedPlusPlan.Name = "";
                    }*/
                });
            }
            var dropDownTrigger = function (e) {
                $($(this).attr("parId")).autocomplete("search", "");
            };
            function createPlanTiles(sRsnBasedplnresp) {

                var nlen = sRsnBasedplnresp.length;
                sRsnBasedplnresp.sort(function (a, b) {
                    var a_datestr = a._source.Plan_Created_Date.split("/");
                    if (a_datestr.length != 3) {
                        a_datestr = "01/01/1970".split("/");
                    }
                    var a_date = new Date(a_datestr[2], a_datestr[1] - 1, a_datestr[0])
                        var b_datestr = b._source.Plan_Created_Date.split("/");
                    if (b_datestr.length != 3) {
                        b_datestr = "01/01/1970".split("/");
                    }
                    var b_date = new Date(b_datestr[2], b_datestr[1] - 1, b_datestr[0]);
                    return b_date - a_date;
                });
                if (nlen > 0) {
                    var i = Math.floor(nlen / 3);
                    var chtml = '<div id="vha-sc-carousel" class="carousel slide carousel-multi-item" data-ride="carousel" data-interval="false"><div class="carousel-control-prev m-3 carousel-control" href="#vha-sc-carousel" data-slide="prev"><div class="carousel-control-prev-icon vha-sc-carouselnav"></div></div><div class="carousel-control-next m-3 carousel-control" href="#vha-sc-carousel" data-slide="next"><div class="carousel-control-next-icon vha-sc-carouselnav"></div></div><div class="carousel-inner vha-sc-carousel-inner" role="listbox">';
                    var f = 0;
                    var s = 0;
                    var t = 0;
                    for (var x = 0; x <= i; x++) {
                        f = t;
                        s = t + 1;
                        t = t + 2;
                        if (x == 0) {
                            if (s < nlen) {
                                if (t < nlen) {
                                    chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + createPlanCard(s, sRsnBasedplnresp) + createPlanCard(t, sRsnBasedplnresp) + "</div></div>";
                                } else {
                                    chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + createPlanCard(s, sRsnBasedplnresp) + "</div></div>";
                                }
                            } else {
                                if (f < nlen) {
                                    chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + "</div></div>";
                                }
                            }
                            t = t + 1;
                        } else {
                            if (s < nlen) {
                                if (t < nlen) {
                                    chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + createPlanCard(s, sRsnBasedplnresp) + createPlanCard(t, sRsnBasedplnresp) + "</div></div>";
                                } else {
                                    chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + createPlanCard(s, sRsnBasedplnresp) + "</div></div>";
                                }
                            } else {
                                if (f < nlen) {
                                    chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + "</div></div>";
                                }
                            }
                            t = t + 1;
                        }
                    }
                    chtml = chtml + "</div></div>";
                    $("#vha-sc-p-carousel-container").html(chtml);
                } else {
                    $("#vha-sc-p-carousel-container").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
                }
            }

            function refreshCart(priPlanDtl) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VHA Sales Calculator Shop Now Wrapper Workflow");
                Inputs.SetProperty("UpgradeOfferType", currentRLI.UpgradeOfferType);
                Inputs.SetProperty("CartRefresh", "Y");
                Inputs.SetProperty("PropSAMId", currentRLI.PropSAMId);
                Inputs.SetProperty("RatePlanSAMId", currentRLI.PlanItem.Code);
                Inputs.SetProperty("RatePlanPriceIncGST", currentRLI.PlanItem.Price);
                Inputs.SetProperty("ExistingCustomer", scJson.QuoteHeader.CustomerType == "Existing" ? "Y" : "N");
                //Inputs.SetProperty("PromoCode", $(".vha-ts-promoCode").val());
                Inputs.SetProperty("Object Id", scJson.QuoteHeader.QuoteId);
                Inputs.SetProperty("DealerRowId", SiebelApp.S_App.GetUserName());
                var dvcObj = currentRLI.DeviceItem.filter(function (item) {
                    return item.Action === "Add";
                });
                if (dvcObj.length > 0) {
                    Inputs.SetProperty("DeviceCode", dvcObj[0].Item__Code);
                    Inputs.SetProperty("DeviceContract", dvcObj[0].Term);
                } else {
                    Inputs.SetProperty("DeviceCode", "");
                    Inputs.SetProperty("DeviceContract", "");
                }
                if (priPlanDtl !== null) {
                    Inputs.SetProperty("InvestmentProportion", priPlanDtl.Investment_Proportion);
                    Inputs.SetProperty("DeviceRRP", priPlanDtl.RRP_Inc_Gst);
                    Inputs.SetProperty("DeviceMatrixContract", priPlanDtl.Contract);
                }
                //debugger;
                var Output = ser.InvokeMethod("RunProcess", Inputs);
                console.log("Plan offer below");
                console.log(Output);
                if (Output.GetChildByType("ResultSet")) {
                    ProcessOfferResponse(Output.GetChildByType("ResultSet"),"");
                }
            }

            function applyPromo(promo) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VHA Sales Calculator Shop Now Wrapper Workflow");
                Inputs.SetProperty("UpgradeOfferType", currentRLI.UpgradeOfferType);
                Inputs.SetProperty("CartRefresh", "Y");
                Inputs.SetProperty("PropSAMId", currentRLI.PropSAMId);
                Inputs.SetProperty("RatePlanSAMId", currentRLI.PlanItem.Code);
                Inputs.SetProperty("RatePlanPriceIncGST", currentRLI.PlanItem.Price);
                Inputs.SetProperty("ExistingCustomer", scJson.QuoteHeader.CustomerType == "Existing" ? "Y" : "N");
                Inputs.SetProperty("Object Id", scJson.QuoteHeader.QuoteId);
                Inputs.SetProperty("DealerRowId", SiebelApp.S_App.GetUserName());
                Inputs.SetProperty("PromoCode", promo);
                var dvcObj = currentRLI.DeviceItem.filter(function (item) {
                    return item.Action === "Add";
                });
                if (dvcObj.length > 0) {
                    Inputs.SetProperty("DeviceCode", dvcObj[0].Item__Code);
                    Inputs.SetProperty("DeviceContract", dvcObj[0].Term);
                } else {
                    Inputs.SetProperty("DeviceCode", "");
                    Inputs.SetProperty("DeviceContract", "");
                }
                var Output = ser.InvokeMethod("RunProcess", Inputs);
                console.log("Apply promo below");
                console.log(Output);
                if (Output.GetChildByType("ResultSet")) {
                    //reset - refrest (delete)
                    var resetChild = ["DDItem", "BonusItem", "CreditItem"];
                    //remove Addon
                    Object.keys(currentRLI).forEach(function (item) {
                        if (resetChild.includes(item)) {
                            currentRLI[item] = currentRLI[item].filter(function (citem) {
                                citem.Action != "Add";
                            });
                        }
                    });
					if(Output.GetChildByType("ResultSet").propArray["PromoCodeValid"] == "Y"){
						$('.vha-sc-invPromo').hasClass("VHASCDisplayNone") == true ? "" : $('.vha-sc-invPromo').addClass("VHASCDisplayNone");					
					}else{
						$('.vha-sc-invPromo').hasClass("VHASCDisplayNone") == true ? $('.vha-sc-invPromo').removeClass("VHASCDisplayNone") : $('.vha-sc-invPromo').addClass("VHASCDisplayNone");
					}
                    ProcessOfferResponse(Output.GetChildByType("ResultSet"),"Promo");
                }
            }

            function ProcessOfferResponse(resultSet, callFrom) {
                removeResetItemJson("Edit");
				for (b = 0; b < resultSet.GetChildByType("SiebelMessage").childArray.length; b++) {
					var chdAry = resultSet.GetChildByType("SiebelMessage").childArray[b].propArray;
					var n = {};
					n.Action = "Add";
					n.Name = chdAry.ProductName;
					n.ProdIntegrationId = "";
					n.Period = chdAry.Term;
					switch (chdAry.GPI) {
					case "Credit":
						n.Type = "Credit";
						n.UI_Type = "OfferCredit";
						n.UI_Price = chdAry.MonthlyRepayment;
						currentRLI.CreditItem.push(n);
						break;
					case "Bonus Data":
						n.Type = "Bonus";
						n.UI_Type = "OfferBonusData";
						currentRLI.BonusItem.push(n);
						break;
					case "Bonus IDD":
						n.Type = "Bonus";
						n.UI_Type = "OfferBonusIDD";
						currentRLI.BonusItem.push(n);
						break;
					case "Loyalty Discount":
						n.Type = "DeviceDiscount";
						n.UI_Type = "OfferDD";
						n.UI_Price = chdAry.MonthlyRepayment;
						currentRLI.DDItem.push(n);
						break;
					}
					console.log(resultSet.GetChildByType("SiebelMessage").childArray[i]);
				}
                currentRLI.PlanItem.Descr = resultSet.propArray["Desc"];
				//pega
				if(pegaoffDataGlob != "" && pegaflag === "Y"){
					if(pegaoffDataGlob.GlobalProductId === "Credit"){
						currentRLI.CreditItem = [];
						var n = {};
						n.Action = "Add";
						n.Name = pegaoffDataGlob.OfferProductName;
						n.ProdIntegrationId = "";
						n.Period = pegaoffDataGlob.RewardTerm;
						n.Amount = pegaoffDataGlob.RewardValue;
						n.Type = "Credit";
						n.UI_Type = "OfferCredit";
						n.UI_Price = pegaoffDataGlob.RewardValue;
						currentRLI.CreditItem.push(n);
				    }
				}
				if (resultSet.propArray["TotalData"] != "")
                    $('#vha-sc-cart-dataOfferGB').text(resultSet.propArray["TotalData"]);				
                if (resultSet.propArray["TotalIDD"] != "")
                    $('#vha-sc-cart-iddOfferMins').text(resultSet.propArray["TotalIDD"]);				
                if (resultSet.propArray["Discount Credit"] != "")
                    $('#vha-sc-cart-creditcost').text("$"+resultSet.propArray["Discount Credit"]);
				else
					$('#vha-sc-cart-creditcost').text("$0.00");
                if (resultSet.propArray["Discount Loyalty"] != "")
                    $('#vha-sc-cart-ldiscountcost').text("$"+resultSet.propArray["Discount Loyalty"]);
				else
					$('#vha-sc-cart-ldiscountcost').text("$0.00");
				//pega
				
				if(pegaoffDataGlob != "" && pegaflag === "Y"){
					if(pegaoffDataGlob.GlobalProductId === "Credit")
						$('#vha-sc-cart-creditcost').text("$"+currentRLI.CreditItem[0].UI_Price);
				}
            }

            function addDiscounts(sDvcIMEIChk) {
                if (sDvcIMEIChk["TotalData"] != "") {
                    //$(".vha-ts-offers").removeClass("VFDisplayNone");
                    //$(".cart-offers-data").removeClass("VFDisplayNone");
                    $(".vha-sc-dataoffershopped").text(sDvcIMEIChk.TotalData);
                }
            }

            function getExistingCustomerDetails(callfrom) {
                switch (callfrom) {
                case "searchButton":
                    // create JSON structure
                    if (sSession != "Resume") {
                        jsonHandler('NewJson', {});
                        if (sMobrBAN_drp == 'Mobile no')
                            scJson.QuoteHeader.ExistingCustDtls.searchMSISDN = $("#vha-sc-existcust-dtls-drpdwn-value").val();
                        else if (sMobrBAN_drp == 'Billing Account Number')
                            scJson.QuoteHeader.ExistingCustDtls.searchBillingAccount = $("#vha-sc-existcust-dtls-drpdwn-value").val();
                        else if (SiebelApp.S_App.GetProfileAttr("SalesCalcExistCust") == "Y")
                            scJson.QuoteHeader.ExistingCustDtls.searchMSISDN = SiebelApp.S_App.GetProfileAttr("SCMobileNumber");
                    }
                    var service = SiebelApp.S_App.GetService("Workflow Process Manager");
                    var Inputstmp = SiebelApp.S_App.NewPropertySet();
                    Inputstmp.SetProperty("ProcessName", "VHA Sales Calculator Query Customer Details WF");

                    Inputstmp.SetProperty("MSISDN", scJson.QuoteHeader.ExistingCustDtls.searchMSISDN);
                    Inputstmp.SetProperty("BillingAccountNumber", scJson.QuoteHeader.ExistingCustDtls.searchBillingAccount);

                    //Inputstmp.SetProperty("MSISDN", '61407104186');
                    //Inputstmp.SetProperty("BillingAccountNumber", "");
                    var outtmp = service.InvokeMethod("RunProcess", Inputstmp);
                    var resultset = outtmp.GetChildByType("ResultSet");
                    var cusT = outtmp.GetChildByType("ResultSet")["propArray"]["CustomerPIN"]; //Verify PIN
                    ExtCustSiebelMessage = resultset.GetChildByType("SiebelMessage");
					$('.siebui-view').hasClass('scmainbgcolor') == true ? $('.siebui-view').removeClass('scmainbgcolor') : ""; // Hari may 3 2024
                    var CustDetails = ExtCustSiebelMessage.childArray[0].childArray[0];
                    var custmerPin = $("#vha-sc-existcust-dtls-pinver").val(); //Verify PIN
                    // verify the pin
                    if (custmerPin == cusT || sSession == "Resume" || SiebelApp.S_App.GetProfileAttr("SalesCalcExistCust") == "Y") { //Verify PIN
                        SiebelApp.S_App.SetProfileAttr("BANQuote", ""); // Hari may 3 2024
						$("#CustomerName").text(CustDetails["propArray"]["CustomerName"]);
                        $("#ActiveServices").text(CustDetails["propArray"]["ActiveServices"]);
                        $("#ApprovedServices").text(CustDetails["propArray"]["ApprovedServices"]);
                        $("#CreditCheckStatus").text(CustDetails["propArray"]["CreditCheckStatus"]);
                        // shankar date format start
                        const CustomerSinceDate = new Date(CustDetails["propArray"]["CustomerSince"]);
                        const CustomerSinceFormattedDate = CustomerSinceDate.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        }).replace(/ /g, ' ');
                        $("#CustomerSince").text("Customer Since " + " " + CustomerSinceFormattedDate.toUpperCase());
                        // shankar date format end
                        $("#CustomerType").text(CustDetails["propArray"]["CustomerType"]);
                        $("#EmailAddress").text(CustDetails["propArray"]["EmailAddress"]);
                        $("#MobileNumber").text(CustDetails["propArray"]["MobileNumber"]);
                        $("#EmailAddress1").text(CustDetails["propArray"]["EmailAddress"]);
                        $("#MobileNumber1").text(CustDetails["propArray"]["MobileNumber"]);                        

                        scJson.QuoteHeader.ExistingCustDtls.CustomerName = CustDetails["propArray"]["CustomerName"];
                        scJson.QuoteHeader.ExistingCustDtls.ActiveServices = CustDetails["propArray"]["ActiveServices"];
                        scJson.QuoteHeader.ExistingCustDtls.ApprovedServices = CustDetails["propArray"]["ApprovedServices"];
                        scJson.QuoteHeader.ExistingCustDtls.CreditCheckStatus = CustDetails["propArray"]["CreditCheckStatus"];
                        scJson.QuoteHeader.ExistingCustDtls.CustomerSince = CustDetails["propArray"]["CustomerSince"];
                        scJson.QuoteHeader.ExistingCustDtls.CustomerType = CustDetails["propArray"]["CustomerType"];
                        scJson.QuoteHeader.ExistingCustDtls.EmailAddress = CustDetails["propArray"]["EmailAddress"];
                        scJson.QuoteHeader.ExistingCustDtls.MobileNumber = CustDetails["propArray"]["MobileNumber"];
                        scJson.QuoteHeader.ExistingCustDtls.RemainingEquipmentLimit = CustDetails["propArray"]["RemainingEquipmentLimit"];						
                        scJson.QuoteHeader.ExistingCustDtls.CustomerId = CustDetails["propArray"]["CustomerAccountId"];
                        scJson.QuoteHeader.ExistingCustDtls.BillingAccountId = CustDetails["propArray"]["BillingAccountId"].split(";")[0];
                        scJson.QuoteHeader.ExistingCustDtls.BillingAccountNo = CustDetails["propArray"]["BillingAccountId"].split(";")[1];
                        scJson.QuoteHeader.ExistingCustDtls.PriceListId = CustDetails["propArray"]["PriceListId"];
                        scJson.QuoteHeader.ExistingCustDtls.CustomerPIN = outtmp.GetChildByType("ResultSet")["propArray"]["CustomerPIN"]; //Verify PIN

						if(sSession == "Resume"){
							//scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit = CustDetails["propArray"]["RemainingEquipmentLimit"];
							$("#RemainingEquipmentLimit").text("$" + parseFloat(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit).toFixed(2));
						}else{
							scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit = CustDetails["propArray"]["RemainingEquipmentLimit"];
							$("#RemainingEquipmentLimit").text("$" + parseFloat(CustDetails["propArray"]["RemainingEquipmentLimit"]).toFixed(2));
						}
						
                        var lastDigit = scJson.QuoteHeader.ExistingCustDtls.BillingAccountNo % 1000;
                        $("#vha-sc-ban-endnum").text(lastDigit);
                        SiebelApp.S_App.SetProfileAttr("BANQuote", scJson.QuoteHeader.ExistingCustDtls.BillingAccountId);
                        var existcusthtml = "";
                        //var contracthtml = "";
                        var i;

                        var AssetDetails = VHAAppUtilities.SiebelMessageToArray(ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0]);
                        var AssetLen = AssetDetails.length;
                        if (AssetDetails.length > 0) {
                            for (i = 0; i < AssetDetails.length; i++) {
                                sMSISDN = AssetDetails[i]["MSISDN"];
                                sAppCount = AssetDetails[i]["APP"];
                                sMPPCount = AssetDetails[i]["MPP"];
                                sAssetId = AssetDetails[i]["AssetId"];

                                var RatePlanDetails = VHAAppUtilities.SiebelMessageToArray(ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0].childArray[i].childArray[1]);

								if (RatePlanDetails.length > 0)	
                                    sRatePlan = RatePlanDetails[0]["Plan"];
                                else {
                                    sRatePlan = "";
                                }
								
                                var upgBtnClass = "btn vha-sc-upgradeServiceBtn";
								if (sRatePlan.toLowerCase().includes("nbn")) {
									upgBtnClass = "btn vha-sc-upgradeServiceBtn vha-sc-totalNewbtn-disable";									
								}
								if(sRatePlan != ""){
									var htmla = '<div class="d-flex vha-sc-exiAccBan" id="ExistingMSISDN' + i + '" ><span class="vha-sc-exiBANspan" id="ExistingMSISDNSpan' + i + '"">' + sMSISDN + '</span><span class="vha-sc-exiBANspan" id="ExistingPlan' + i + '">' + sRatePlan + '</span><span class="vha-sc-exiBANspan vha-sc-exiBANspan-mpp">MPP <span  class="vha-sc-MnpAppDef" id="ExistingMPP' + i + '">' + sMPPCount + '</span></span><span class="vha-sc-exiBANspan vha-sc-exiBANspan-app">APP <span  class="vha-sc-MnpAppDef" id="ExistingAPP' + i + '">' + sAppCount + '</span></span><button propName="upgradeService" class="'+upgBtnClass+'" id="Upg' + i + '" assetrowId= ' + sAssetId + ' msisdn=' + sMSISDN + '>Upgrade the Service</button><label class="vha-sc-checkbox vha-sc-checkbox-container"><input class="vha-sc-checkbox-click" type="radio" name="radiobtnSelectplan" value=' + sAssetId + ' type="checkbox" id=' + sAssetId + ' asset-rowId= ' + sAssetId + '><span class="vha-sc-checkbox-checkmark"></span></label></div>';
									if (existcusthtml == "" || existcusthtml == null) {
										existcusthtml = htmla;
									} else {
										existcusthtml = existcusthtml + htmla;
									}
								}
								
                                if (i == 0) {
                                    getExistingSeledtedServiceDetails(sAssetId);
                                    DisplayContractDetails(sAssetId, "ExtCustView");
                                }
                            }
                            $('#ExistingMSIDNList').html(existcusthtml);
                        }

                        //$(".vha-sc-existcustomerapp-hide").addClass("VHASCDisplayNone");
                        //$(".vha-sc-salescalclandpgebtnscls").addClass("VHASCDisplayNone");
                        if (sSession != "Resume") {
                            //$(".vha-sc-extcustomerdtlsMaindiv").removeClass("VHASCDisplayNoneimp");
                            // $(".reviewsum1").removeClass("VHASCDisplayNone"); // Hari may 3 2024
                            $('#vha-sc-exiscust-cquote-btn').attr("disabled", false).removeClass("vha-sc-totalNewbtn-disable");
                            if (SiebelApp.S_App.GetProfileAttr("SalesCalcExistCust") == "Y") { //HARIY:05JAN2024::Created for IRC-106
                                $(".vha-sc-all-guidedtabs").hasClass("VHASCDisplayNone") != true ? $(".vha-sc-all-guidedtabs").addClass("VHASCDisplayNone") : "";
                                $(".vha-sc-newcust-applet").hasClass("VHASCDisplayNone") != true ? $(".vha-sc-newcust-applet").addClass("VHASCDisplayNone") : "";
                                $(".vha-sc-existcustomerapp-hide").hasClass("VHASCDisplayNone") != true ? $(".vha-sc-existcustomerapp-hide").addClass("VHASCDisplayNone") : "";
                                $(".vha-sc-salescalclandpgebtnscls").hasClass("VHASCDisplayNone") != true ? $(".vha-sc-salescalclandpgebtnscls").addClass("VHASCDisplayNone") : "";
                               // $(".reviewsum1").addClass("VHASCDisplayNone"); 
							    $(".reviewsum1").removeClass("VHASCDisplayNone");// Hari may 3 2024
                                $('#vha-sc-exiscust-cquote-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                                //$(".vha-sc-extcustomerdtls").removeClass("VHASCDisplayNoneimp");
								$(".vha-sc-extcustomerdtlsMaindiv").removeClass("VHASCDisplayNoneimp"); // Hari may 3 2024
                            }
                        }
                        //UI Change
                        SiebelApp.S_App.SetProfileAttr("SalesCalcExistCust", "N");
                        SiebelApp.S_App.SetProfileAttr("SCMobileNumber", "");
						SiebelApp.S_App.GetActiveView().GetApplet("VHA Sales Calc Billing Quote List Applet").InvokeMethod("RefreshBuscomp");  // Hari may 3 2024
                    } //Verify PIN
                    else {
                        alert("Please Provide the correct PIN to proceed further");
                        $('#vha-sc-exiscust-cquote-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                    }
                    $("#maskoverlay").styleHide();
                    break;
                case "ExtCreateQuote":
                    $(".vha-sc-all-guidedtabs").hasClass("VHASCDisplayNone") != true ? $(".vha-sc-all-guidedtabs").addClass("VHASCDisplayNone") : "";
                    $(".vha-sc-newcust-applet").hasClass("VHASCDisplayNone") != true ? $(".vha-sc-newcust-applet").addClass("VHASCDisplayNone") : "";
                    $(".vha-sc-existcustomerapp-hide").hasClass("VHASCDisplayNone") != true ? $(".vha-sc-existcustomerapp-hide").addClass("VHASCDisplayNone") : "";
                    $(".vha-sc-salescalclandpgebtnscls").hasClass("VHASCDisplayNone") != true ? $(".vha-sc-salescalclandpgebtnscls").addClass("VHASCDisplayNone") : "";
                    $(".reviewsum1").addClass("VHASCDisplayNone");
                    $('#vha-sc-exiscust-cquote-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                    //$(".vha-sc-extcustomerdtls").removeClass("VHASCDisplayNoneimp");
					$(".vha-sc-extcustomerdtlsMaindiv").removeClass("VHASCDisplayNoneimp"); // Hari may 3 2024
                    break;
                case "UpdateService":
                    // loop ExtCustSiebelMessage and display the Existing Service in cart summary - Tulasi
                    var sCartSumCustDtls = ExtCustSiebelMessage.childArray[0].childArray[0];
                    //var sCartSumcustDtlsHTML = '<span></span><div>Name<br>Service Used <br>Customer Since <br>Credit Check Status <br>Active Service <br>Approved Service <br>Quote Number <br>Remaining Equipment Limit</div><div class="vha-sc-aligncartcustSpanDiv"><span id = "vha-sc-cartsumcustname">' + sCartSumCustDtls["propArray"]["CustomerName"] + '</span><br><span id = "vha-sc-cartsumservused">' + sCartSumCustDtls["propArray"]["CustomerType"] + '</span><br><span id = "vha-sc-cartsumcustsince">' + sCartSumCustDtls["propArray"]["CustomerSince"] + '</span><br><span id = "vha-sc-cartsumcustccstatus">' + sCartSumCustDtls["propArray"]["CreditCheckStatus"] + '</span><br><span id = "vha-sc-cartsumcustactser">' + sCartSumCustDtls["propArray"]["ActiveServices"] + '</span><br><span id = "vha-sc-cartsumcustapprovser">' + sCartSumCustDtls["propArray"]["ApprovedServices"] + '</span><br><span id = "vha-sc-cartsumcustquote"></span><br><span id = "vha-sc-cartsumcustremequip">' + "$" + parseFloat(sCartSumCustDtls["propArray"]["RemainingEquipmentLimit"]).toFixed(2) + '</span></div>';
                    //TULASIY:Dec 19 start:IRC-52
                    const CustomerSinceDate_cart = new Date(sCartSumCustDtls["propArray"]["CustomerSince"]);
                    const CustomerSinceFormattedDate_cart = CustomerSinceDate_cart.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    }).replace(/ /g, ' ');
                    var sCartSumcustDtlsHTML = '<span></span><div>Name<br>Service Used <br>Customer Since <br>Credit Check Status <br>Active Service <br>Approved Service<br>Remaining Equipment Limit</div><div class="vha-sc-aligncartcustSpanDiv"><span id = "vha-sc-cartsumcustname">' + sCartSumCustDtls["propArray"]["CustomerName"] + '</span><br><span id = "vha-sc-cartsumservused">' + sCartSumCustDtls["propArray"]["CustomerType"] + '</span><br><span id = "vha-sc-cartsumcustsince">' + CustomerSinceFormattedDate_cart + '</span><br><span id = "vha-sc-cartsumcustccstatus">' + sCartSumCustDtls["propArray"]["CreditCheckStatus"] + '</span><br><span id = "vha-sc-cartsumcustactser">' + sCartSumCustDtls["propArray"]["ActiveServices"] + '</span><br><span id = "vha-sc-cartsumcustapprovser">' + sCartSumCustDtls["propArray"]["ApprovedServices"] + '</span><br><span id = "vha-sc-cartsumcustremequip">' + "$" + parseFloat(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit).toFixed(2) + '</span></div>';
                    //TULASIY:Dec 19 End:IRC-52
                    $('.vha-sc-customerDetails').html(sCartSumcustDtlsHTML);

                    var sExistCutServiceList = "";
                    var AssetDetails1 = VHAAppUtilities.SiebelMessageToArray(ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0]);
                    var AssetLen1 = AssetDetails1.length;
                    if (AssetDetails1.length > 0) {
                        for (i = 0; i < AssetDetails1.length; i++) {
                            sMSISDN = AssetDetails1[i]["MSISDN"];
                            sAppCount = AssetDetails1[i]["APP"];
                            sMPPCount = AssetDetails1[i]["MPP"];
                            sAssetId = AssetDetails1[i]["AssetId"];

                            var RatePlanDetails1 = VHAAppUtilities.SiebelMessageToArray(ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0].childArray[i].childArray[1]);

                            if (RatePlanDetails1.length > 0)
                                sRatePlan1 = RatePlanDetails1[0]["Plan"];
                            else {
                                sRatePlan1 = "";
                            }
                            var upgbtnClass = "vha-sc-upgradeMnpApp";
							if (sRatePlan1.toLowerCase().includes("nbn")) {
								upgbtnClass = "vha-sc-upgradeMnpApp vha-sc-totalNewbtn-disable-nbn";								
							}							
							var sCartCustServicehtml = '<div class="d-flex border vha-sc-exiAccBanCart" id="sExistingService' + i + '" ><div class="vha-sc-DiviceCareIcon"></div><div class = "vha-sc-cartserdata" id="sExistingMSISDN' + i + '"><span id="sExistingMSISDNSpan' + i + '" >' + sMSISDN + '</span><br><span id="sExistingPlan' + i + '">' + sRatePlan1 + '</span><br>MPP<span class="vha-sc-MnpAppDef vha-sc-MnpAppDef-MPP" id = "sExistingMPP' + i + '">' + sMPPCount + '</span><span class="ml-5">APP</span><span class="vha-sc-MnpAppDef" id = "sExistingAPP' + i + '">' + sAppCount + '</span></div><div class="vha-sc-alignSpanDiv vha-sc-upgmtop"><button class="'+upgbtnClass+'" id= ' + sAssetId + ' msisdn= ' + sMSISDN + '>Upgrade</button></div></div>';

                            if (sExistCutServiceList == "" || sExistCutServiceList == null) {
                                sExistCutServiceList = sCartCustServicehtml;
                            } else {
                                sExistCutServiceList = sExistCutServiceList + sCartCustServicehtml;
                            }
                            /*if (i == 0 && scJson.QuoteHeader.QuoteJourney == "Upgrade") {
                            getExistingSeledtedServiceDetails(sAssetId);
                            DisplayContractDetails(sAssetId, "ExtCartSummary");
                            }*/
                        }
                        if (scJson.QuoteHeader.QuoteJourney == "Upgrade" && sSession != "Resume") {
                            getExistingSeledtedServiceDetails(currentRLI.AssetId);
                            DisplayContractDetails(currentRLI.AssetId, "ExtCartSummary");
                        }
                        $('.vha-sc-ExistingServicesSum').html(sExistCutServiceList);
                        $(".vha-sc-upgradeMnpApp").on("click", function () {
                            //$(".vha-sc-upgradeMnpApp").on("click", function () {
                            //scJson.QuoteHeader.QuoteType = "Upgrade";
                            $("#maskoverlay").styleShow();
                            tssleep(30).then(() => {
                                $(".vha-sc-existingcontracts-main").hasClass("VHASCDisplayNone") == true ? $(".vha-sc-existingcontracts-main").removeClass("VHASCDisplayNone") : "";
                                var AssetId = $(this).attr('id');
								var msisdn = $(this).attr('msisdn');
                                jsonHandler('AddRLI', {});
                                jsonHandler('Set-ExistingCustomer-Upgrade', {
                                    AssetId: AssetId,
									msisdn: msisdn
                                });
                                getExistingSeledtedServiceDetails(AssetId); //Tulasi
                                DisplayContractDetails(AssetId, "ExtCartSummary"); //Tulasi
                                copyExtServicetoJSON(AssetId);
                                cartRLIupdate();
                                $('#sc-override-reason option').length > 0 ? $("#sc-override-reason").val("") : mAppendOptionList("VHA_UPGRADE_OVERRIDE_DESC", "#sc-override-reason");
                                resetUpgWarningUI();
                                getUpgradeEligible(false);
                                $('.vha-sc-upgrade-buttons').hasClass("VHASCDisplayNone") == true ? $('.vha-sc-upgrade-buttons').removeClass("VHASCDisplayNone") : "";
                                $('.vha-sc-ExistingContractsSum').hasClass("VHASCDisplayNone") == true ? $('.vha-sc-ExistingContractsSum').removeClass("VHASCDisplayNone") : ""; //HARIY:Dec1 2023
                                $("#maskoverlay").styleHide();
                            });
                        });
                    }
                    break;
                }
            }

            function copyExtServicetoJSON(sAssetId) {
                var LofMSISDNLen = ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0].childArray.length;
                var LofMSISDN = ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0];
                for (var j = 0; j < LofMSISDNLen; j++) {
                    var cMSISDN = LofMSISDN.childArray[j];
                    var cMSISDNlen = cMSISDN.childArray.length;
                    if (cMSISDN.propArray.AssetId == sAssetId) {
                        //jsonHandler('ExistingRLI');
                        for (var n = 0; n < cMSISDNlen; n++) {
                            var LofMSISDNchd = cMSISDN.childArray[n];
                            var LofMSISDNchdType = LofMSISDNchd.type;
                            var cMSISDNchdlen = LofMSISDNchd.childArray.length
                                for (var x = 0; x < cMSISDNchdlen; x++) {
                                    var cMSISDNchd = LofMSISDNchd.childArray[x];
                                    var cMSISDNchdType = cMSISDNchd.type;
                                    ////console.log(cMSISDNchd);
                                    ////console.log(cMSISDNchdType + "-" + x);
                                    var setChdObj = {};
                                    switch (cMSISDNchdType) {
                                    case "CreditItem":
                                        setChdObj.Action = "Existing";
                                        setChdObj.Name = cMSISDNchd.propArray["Name"];
                                        setChdObj.ProdIntegrationId = cMSISDNchd.propArray["Prod Integration Id"];
                                        setChdObj.Period = xmToJsonArray(cMSISDNchd.childArray[0], "Period");
                                        setChdObj.UI_Price = xmToJsonArray(cMSISDNchd.childArray[0], "Amount"); //?? Mar8
                                        //setChdObj.ProductType = cMSISDNchd.propArray["Product Type"];
                                        setChdObj.ProductId = cMSISDNchd.propArray["ProductId"];
                                        setChdObj.Type = "CreditItem";
                                        currentRLI.CreditItem.push(setChdObj);
                                        break;
                                    case "BonusItem":
                                        setChdObj.Action = "Existing";
                                        setChdObj.Name = cMSISDNchd.propArray["Name"];
                                        setChdObj.ProdIntegrationId = cMSISDNchd.propArray["Prod Integration Id"];
                                        setChdObj.Period = xmToJsonArray(cMSISDNchd.childArray[0], "Period");
                                        setChdObj.Price = xmToJsonArray(cMSISDNchd.childArray[0], "Amount");
                                        //setChdObj.ProductType = cMSISDNchd.propArray["Product Type"];
                                        setChdObj.ProductId = cMSISDNchd.propArray["ProductId"];
                                        setChdObj.Type = "BonusItem";
                                        currentRLI.BonusItem.push(setChdObj);
                                        break;
                                    case "DeviceDiscountItem":
                                        setChdObj.Action = "Existing";
                                        setChdObj.Name = cMSISDNchd.propArray["Name"];
                                        setChdObj.ProdIntegrationId = cMSISDNchd.propArray["Prod Integration Id"];
                                        setChdObj.Period = xmToJsonArray(cMSISDNchd.childArray[0], "Period");
                                        setChdObj.Price = xmToJsonArray(cMSISDNchd.childArray[0], "Amount");
                                        //setChdObj.ProductType = cMSISDNchd.propArray["Product Type"];
                                        setChdObj.ProductId = cMSISDNchd.propArray["ProductId"];
                                        setChdObj.Type = "DDItem";
                                        currentRLI.DDItem.push(setChdObj);
                                        break;
                                    case "AssetLineItemGPP":
                                        setChdObj.Action = "Existing";
                                        setChdObj.Name = cMSISDNchd.propArray["Name"];
                                        setChdObj.ProdIntegrationId = cMSISDNchd.propArray["Prod Integration Id"];
                                        setChdObj.Additional__Info = xmToJsonArray(cMSISDNchd.childArray[0], "Additional Info");
                                        setChdObj.Category = xmToJsonArray(cMSISDNchd.childArray[0], "Category");
                                        setChdObj.IMEI___Serial__Number = xmToJsonArray(cMSISDNchd.childArray[0], "IMEI/Serial Number");
                                        setChdObj.Item__Code = xmToJsonArray(cMSISDNchd.childArray[0], "Item Code");
                                        setChdObj.Item__Name = xmToJsonArray(cMSISDNchd.childArray[0], "Item Name");
                                        setChdObj.Contract__Amount = xmToJsonArray(cMSISDNchd.childArray[0], "Contract Amount");
                                        setChdObj.Monthly__Repayment = xmToJsonArray(cMSISDNchd.childArray[0], "Monthly Repayment");
                                        setChdObj.Original__Order__Number = xmToJsonArray(cMSISDNchd.childArray[0], "Original Order Number");
                                        setChdObj.Original__Purchase__Date = xmToJsonArray(cMSISDNchd.childArray[0], "Original Order Number");
                                        setChdObj.Prepayment__Amount = xmToJsonArray(cMSISDNchd.childArray[0], "Prepayment Amount");
                                        setChdObj.Term = xmToJsonArray(cMSISDNchd.childArray[0], "Term");
                                        setChdObj.Term__Override = xmToJsonArray(cMSISDNchd.childArray[0], "Term Override");
                                        setChdObj.Insurance = cMSISDNchd.propArray["Insurance"];
                                        setChdObj.InsPri = cMSISDNchd.propArray["InsPri"];
                                        //setChdObj.ProductType = cMSISDNchd.propArray["Product Type"];
                                        setChdObj.Type = "Device";
                                        setChdObj.UI__RRP__Inc__GST = xmToJsonArray(cMSISDNchd.childArray[0], "Contract Amount");
                                        var selSrv = selService.ExistingContractUI.Device.filter(function (item) {
                                            return item["IntegrationId"] === cMSISDNchd.propArray["Prod Integration Id"];
                                        });
                                        setChdObj.RemTerm = selSrv.length > 0 ? selSrv[0].RemMonths : "";
                                        currentRLI.DeviceItem.push(setChdObj);
                                        break;
                                    case "AssetLineItemAPPSD":
                                        setChdObj.Action = "Existing";
                                        setChdObj.Name = cMSISDNchd.propArray["Name"];
                                        setChdObj.ProdIntegrationId = cMSISDNchd.propArray["Prod Integration Id"];
                                        setChdObj.Additional__Info = xmToJsonArray(cMSISDNchd.childArray[0], "Additional Info");
                                        setChdObj.Category = xmToJsonArray(cMSISDNchd.childArray[0], "Category");
                                        setChdObj.Contract__Amount = xmToJsonArray(cMSISDNchd.childArray[0], "Contract Amount");
                                        setChdObj.Contract__Amount__Override = xmToJsonArray(cMSISDNchd.childArray[0], "Contract Amount Override");
                                        setChdObj.Contract__End__Date = xmToJsonArray(cMSISDNchd.childArray[0], "Contract End Date");
                                        setChdObj.Contract__Start__Date = xmToJsonArray(cMSISDNchd.childArray[0], "Contract Start Date");
                                        setChdObj.IMEI = xmToJsonArray(cMSISDNchd.childArray[0], "IMEI/Serial Number");
                                        setChdObj.Monthly__Repayment = xmToJsonArray(cMSISDNchd.childArray[0], "Monthly Repayment");
                                        setChdObj.Number__of__Accessories = xmToJsonArray(cMSISDNchd.childArray[0], "Number of Accessories");
                                        setChdObj.Prepayment__Amount = xmToJsonArray(cMSISDNchd.childArray[0], "Prepayment Amount");
                                        setChdObj.Term = xmToJsonArray(cMSISDNchd.childArray[0], "Term");
                                        setChdObj.Term__Override = xmToJsonArray(cMSISDNchd.childArray[0], "Term Override");
                                        setChdObj.Total__Accessories__RRP__Inc__GST = xmToJsonArray(cMSISDNchd.childArray[0], "Total Accessories RRP Inc GST");
                                        setChdObj.Insurance = cMSISDNchd.propArray["Insurance"];
                                        setChdObj.InsPri = cMSISDNchd.propArray["InsPri"];
                                        setChdObj.Accessory__Name = cMSISDNchd.propArray["ItemName"];
                                        setChdObj.Type = "Secondary Device";
                                        var selSrv = selService.ExistingContractUI.APP.filter(function (item) {
                                            return item["IntegrationId"] === cMSISDNchd.propArray["Prod Integration Id"];
                                        });
                                        setChdObj.RemTerm = selSrv.length > 0 ? selSrv[0].RemMonths : "";
                                        currentRLI.SDItem.push(setChdObj);
                                        break;
                                    case "AssetLineItemAPPAcc":
                                        setChdObj.Action = "Existing";
                                        setChdObj.Name = cMSISDNchd.propArray["Name"];
                                        setChdObj.ProdIntegrationId = cMSISDNchd.propArray["Prod Integration Id"];
                                        setChdObj.Additional__Info = xmToJsonArray(cMSISDNchd.childArray[0], "Additional Info");
                                        setChdObj.Category = xmToJsonArray(cMSISDNchd.childArray[0], "Category");
                                        setChdObj.Contract__Amount = xmToJsonArray(cMSISDNchd.childArray[0], "Contract Amount");
                                        setChdObj.Contract__Amount__Override = xmToJsonArray(cMSISDNchd.childArray[0], "Contract Amount Override");
                                        setChdObj.Contract__End__Date = xmToJsonArray(cMSISDNchd.childArray[0], "Contract End Date");
                                        setChdObj.Contract__Start__Date = xmToJsonArray(cMSISDNchd.childArray[0], "Contract Start Date");
                                        setChdObj.IMEI = xmToJsonArray(cMSISDNchd.childArray[0], "IMEI/Serial Number");
                                        setChdObj.Monthly__Repayment = xmToJsonArray(cMSISDNchd.childArray[0], "Monthly Repayment");
                                        setChdObj.Number__of__Accessories = xmToJsonArray(cMSISDNchd.childArray[0], "Number of Accessories");
                                        setChdObj.Prepayment__Amount = xmToJsonArray(cMSISDNchd.childArray[0], "Prepayment Amount");
                                        setChdObj.Term = xmToJsonArray(cMSISDNchd.childArray[0], "Term");
                                        setChdObj.Term__Override = xmToJsonArray(cMSISDNchd.childArray[0], "Term Override");
                                        setChdObj.Total__Accessories__RRP__Inc__GST = xmToJsonArray(cMSISDNchd.childArray[0], "Total Accessories RRP Inc GST");
                                        setChdObj.Accessory__Name = cMSISDNchd.propArray["ItemName"];
                                        setChdObj.Type = "Accessory";
                                        var selSrv = selService.ExistingContractUI.APP.filter(function (item) {
                                            return item["IntegrationId"] === cMSISDNchd.propArray["Prod Integration Id"];
                                        });
                                        setChdObj.RemTerm = selSrv.length > 0 ? selSrv[0].RemMonths : "";
                                        currentRLI.AccItem.push(setChdObj);
                                        break;
                                    case "RatePlan":
                                        currentRLI.PlanItem.Action = "Existing";
                                        currentRLI.PlanItem.Name = cMSISDNchd.propArray["Plan"];
                                        currentRLI.PlanItem.Code = "";
                                        currentRLI.PlanItem.ProdIntegrationId = cMSISDNchd.propArray["Prod Integration Id"];
                                        currentRLI.PlanItem.Price = cMSISDNchd.propArray["Price"];
                                        //currentRLI.PlanItem.Descr = "";
                                        currentRLI.PlanItem.ProductId = cMSISDNchd.propArray["ProductId"];
                                        currentRLI.PlanItem.Type = "Plan";
                                        currentRLI.Proposition = selService.ExistingContractUI.PropositionName;
                                        currentRLI.PropSAMId = selService.ExistingContractUI.PropositionSAMId;
                                        //backup the existing plan details
                                        selService.ExistingContractUI.PlanItem.Action = "Existing";
                                        selService.ExistingContractUI.PlanItem.Name = cMSISDNchd.propArray["Plan"];
                                        selService.ExistingContractUI.PlanItem.Code = "";
                                        selService.ExistingContractUI.PlanItem.ProdIntegrationId = cMSISDNchd.propArray["Prod Integration Id"];
                                        selService.ExistingContractUI.PlanItem.Price = cMSISDNchd.propArray["Price"];
                                        //currentRLI.PlanItem.Descr = "";
                                        selService.ExistingContractUI.PlanItem.ProductId = cMSISDNchd.propArray["ProductId"];
                                        selService.ExistingContractUI.PlanItem.Type = "Plan";
                                        break;

                                    }
                                }
                        }
                    }
                }
            }

            function xmToJsonArray(parArray, lookupName) {
                var x = {
                    xm: []
                };
                var toReturn = "";
                parArray.childArray.forEach(function (item, index) {
                    x.xm[index] = item.propArray;
                });
                try {
                    toReturn = x.xm.filter(function (a) {
                        return a.Name == lookupName;
                    })[0].Value;
                } catch (e) {
                    toReturn = "";
                    //console.log(x);
                    //console.log(e);
                }

                return toReturn;
            }

            function getExistingSeledtedServiceDetails(sAssetId) {
                //UI

                var serviceAssets = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputstasset = SiebelApp.S_App.NewPropertySet();
                Inputstasset.SetProperty("ProcessName", "VHA Sales Calculator Asset Details WF");
                Inputstasset.SetProperty("Object Id", sAssetId);
                var outasset = serviceAssets.InvokeMethod("RunProcess", Inputstasset);

                var resultset = outasset.GetChildByType("ResultSet");
                aUpgradeEligibity = resultset.propArray;
                var SiebMessageasset = resultset.GetChildByType("SiebelMessage");

                selService = JSON.parse(JSON.stringify(SelectedServiceJSON()));

                selService.ExistingContractUI.AssetId = sAssetId;
                var ExistingContract = VHAAppUtilities.SiebelMessageToArray(SiebMessageasset.childArray[0]);
                if (ExistingContract.length > 0) {
                    selService.ExistingContractUI.BundleandSave = ExistingContract[0]["BundleandSave"];
                    selService.ExistingContractUI.LoyaltyDiscount = ExistingContract[0]["LoyaltyDiscount"];
                    selService.ExistingContractUI.Credit = ExistingContract[0]["Credit"];
                    selService.ExistingContractUI.ActiveGPPCount = ExistingContract[0]["ActiveGPPCount"];
                    selService.ExistingContractUI.PropositionName = ExistingContract[0]["PropositionName"];
                    selService.ExistingContractUI.PropositionSAMId = ExistingContract[0]["PropositionSAMId"];
                }

                var PlanDetails = VHAAppUtilities.SiebelMessageToArray(SiebMessageasset.childArray[0].childArray[0].childArray[1]);
                if (PlanDetails.length > 0) {
                    selService.ExistingContractUI.EarlyUpgradeFee = PlanDetails[0]["EarlyUpgradeFee"];
                    selService.ExistingContractUI.CurrentPlan = PlanDetails[0]["CurrentPlan"];
                    selService.ExistingContractUI.CurrentPlanPrice = PlanDetails[0]["Price"];
                }
                var GPPDetails = VHAAppUtilities.SiebelMessageToArray(SiebMessageasset.childArray[0].childArray[0].childArray[3]);
                if (GPPDetails.length > 0) {
                    var currentDvc = "";
                    for (var j = 0; j < GPPDetails.length; j++) {
                        if (j > 0) {
                            currentDvc = JSON.parse(JSON.stringify(SelectedServiceJSON().ExistingContractUI.Device[0]));
                        } else {
                            currentDvc = selService.ExistingContractUI.Device[0];
                        }
                        currentDvc.ItemName = GPPDetails[j]["ItemName"];
                        currentDvc.RemMonths = GPPDetails[j]["RemMonths"];
                        currentDvc.Charge = GPPDetails[j]["GPPCharge"];
                        currentDvc.IntegrationId = GPPDetails[j]["IntegrationId"];
                        currentDvc.MonthlyPrice = GPPDetails[j]["GPPMonthlyPrice"];
                        if (j > 0)
                            selService.ExistingContractUI.Device.push(currentDvc);
                    }
                }
                var APPDetails = VHAAppUtilities.SiebelMessageToArray(SiebMessageasset.childArray[0].childArray[0].childArray[2]);
                if (APPDetails.length > 0) {
                    var currentDvc = "";
                    for (var j = 0; j < APPDetails.length; j++) {
                        if (j > 0) {
                            currentDvc = JSON.parse(JSON.stringify(SelectedServiceJSON().ExistingContractUI.APP[0]));
                        } else {
                            currentDvc = selService.ExistingContractUI.APP[0];
                        }
                        currentDvc.ItemName = APPDetails[j]["ItemName"];
                        currentDvc.RemMonths = APPDetails[j]["RemMonths"];
                        currentDvc.Charge = APPDetails[j]["GPPCharge"];
                        currentDvc.IntegrationId = APPDetails[j]["IntegrationId"];
                        currentDvc.MonthlyPrice = APPDetails[j]["GPPMonthlyPrice"];
                        if (j > 0)
                            selService.ExistingContractUI.APP.push(currentDvc);
                    }
                }
                //debugger;
                //APP SD & Acc - remaining months pending
            }

            function DisplayContractDetails(sAssetId, callfrom) {
                var contracthtml = "";
                var Currentplanhtml = "";
                var GPPMPPhtml = "";
                var Offershtml = "";

                var dvcArray = selService.ExistingContractUI.Device;

                switch (callfrom) {
                case "ExtCustView":
                    for (var d = 0; d < dvcArray.length; d++) {
                        if (dvcArray[d].ItemName == "") {
                            GPPMPPhtml = "";
                        } else {
                            if (GPPMPPhtml == "" || GPPMPPhtml == null) { //PRSA
                                GPPMPPhtml = '<div class="vha-sc-currentPlan d-flex mt-2"><div class="col-1"><span class="vha-sc-custMobileIcon"></span></div><div class="col-7"><li>' + dvcArray[d].ItemName + '<span>' + '$' + dvcArray[d].Charge + '</span></li><li>' + dvcArray[d].RemMonths + ' months remaining<span></span></li></div></div>';
                            } else { //PRSA
                                GPPMPPhtml = GPPMPPhtml + '<div class="vha-sc-currentPlan d-flex mt-2"><div class="col-1"><span class="vha-sc-custMobileIcon"></span></div><div class="col-7"><li>' + dvcArray[d].ItemName + '<span>' + '$' + dvcArray[d].Charge + '</span></li><li>' + dvcArray[d].RemMonths + ' months remaining<span></span></li></div></div>';
                            }
                        }
                    }

                    var Currentplanhtml = '<div class="vha-sc-currentPlan d-flex mt-2"><div class="col-1"><span class="vha-sc-custMobileIcon"></span></div><div  class="col-7"><li>Current Plan<span></span></li><li>' + selService.ExistingContractUI.CurrentPlan + '<span>' + '$' + selService.ExistingContractUI.CurrentPlanPrice + '</span></li></div><div  class="col-4"></div></div>';

                    var Offershtml = '<div class="vha-sc-currentPlan d-flex mt-2"><div class="col-1"></div><div class="col-7"><li>Early Upgrade Fee<span>' + '$' + selService.ExistingContractUI.EarlyUpgradeFee + '</span></li></div></div><div class="vha-sc-currentPlan d-flex mt-2"><div class="col-1"><span class="vha-sc-BundleAndSave_Icon"></span></div><div class="col-7"><li>Loyalty<span>' + selService.ExistingContractUI.LoyaltyDiscount + '</span></li><li>Bundle & Save<span>' + selService.ExistingContractUI.BundleandSave + '</span></li><li>Credit<span>' + selService.ExistingContractUI.Credit + '</span></li></div><div class="col-4"></div></div>';

                    var contracthtmla = Currentplanhtml + GPPMPPhtml + Offershtml;
                    if (contracthtml == "" || contracthtml == null) {
                        contracthtml = contracthtmla;
                    }
                    if (contracthtml != "" && contracthtml != null) {
                        $('#vha-existingContractListId').html(contracthtml);
                    }
                    break;
                case "ExtCartSummary":
				//case "ExtCartSummary-Edit":
                    var contracthtml1 = "";
                    var Currentplanhtml1 = "";
                    var GPPMPPhtml1 = "";
                    var Offershtml1 = "";

                    var dvcArray1 = selService.ExistingContractUI.Device;

                    for (var t = 0; t < dvcArray1.length; t++) {
                        if (dvcArray1[t].ItemName == "") {
                            GPPMPPhtml1 = "";
                        } else {
                            if (GPPMPPhtml1 == "" || GPPMPPhtml1 == null) { //PRSA
                                GPPMPPhtml1 = '<div class="vha-sc-other vha-sc-planDesign"><span></span><div>' + dvcArray1[t].ItemName + '<br>' + dvcArray1[t].RemMonths + ' months remaining</div><div class="vha-sc-alignSpanDiv"><span>' + '$' + dvcArray1[t].MonthlyPrice + '</span><br><button class="vha-sc-ExistCustTerminateBtn p-0" id="sc-terminate" amt="' + dvcArray1[t].Charge + '" intid="' + dvcArray1[t].IntegrationId + '">Terminate</button><button class="vha-sc-ExistCustTerminateBtn p-0 VHASCDisplayNone" id="sc-revert" amt="' + dvcArray1[t].Charge + '" intid="' + dvcArray1[t].IntegrationId + '">Revert</button></div></div>';
                            } else { //PRSA
                                GPPMPPhtml1 = GPPMPPhtml1 + '<div class="vha-sc-other vha-sc-planDesign"><span></span><div>' + dvcArray1[t].ItemName + '<br>' + dvcArray1[t].RemMonths + ' months remaining</div><div class="vha-sc-alignSpanDiv"><span>' + '$' + dvcArray1[t].MonthlyPrice + '</span><br><button class="vha-sc-ExistCustTerminateBtn p-0" id="sc-terminate" amt="' + dvcArray1[t].Charge + '" intid="' + dvcArray1[t].IntegrationId + '">Terminate</button><button class="vha-sc-ExistCustTerminateBtn p-0 VHASCDisplayNone" id="sc-revert" amt="' + dvcArray1[t].Charge + '" intid="' + dvcArray1[t].IntegrationId + '">Revert</button></div></div>';
                            }
                        }
                    }

                    var Currentplanhtml1 = '<div class="vha-sc-currentplan vha-sc-planDesign"><span></span><div>Current Plan<br>' + selService.ExistingContractUI.CurrentPlan + '</div><div class="vha-sc-alignSpanDiv"><span></span><br><span>' + '$' + selService.ExistingContractUI.CurrentPlanPrice + '</span></div></div>';

                    var Offershtml1 = '<div class="vha-sc-other vha-sc-planDesign"><span></span><div>Early Upgrade Fee<br><button class="vha-sc-EarlyUpgradeBtn" id="vha-sc-EarlyUpgradeBtn">12</button><button class="vha-sc-EarlyUpgradeBtn" id="vha-sc-EarlyUpgradeBtn">24</button><button class="vha-sc-EarlyUpgradeBtn applet-button-active" id="vha-sc-EarlyUpgradeBtn">One Time</button></div><div class="vha-sc-alignSpanDiv"><br><br><span>' + '$' + selService.ExistingContractUI.EarlyUpgradeFee + '</span><br><br>&nbsp;</div></div><div class="vha-sc-other vha-sc-planDesign"><span></span><div>Loyalty<br>Bundle & Save<br>Credit</div><div class="vha-sc-alignSpanDiv"><span>' + selService.ExistingContractUI.LoyaltyDiscount + '</span><br><span>' + selService.ExistingContractUI.BundleandSave + '</span><br><span>' + selService.ExistingContractUI.Credit + '</span></div></div>';

                    var contracthtmla1 = Currentplanhtml1 + GPPMPPhtml1 + Offershtml1;
                    if (contracthtml1 == "" || contracthtml1 == null) {
                        contracthtml1 = contracthtmla1;
                    }
                    if (contracthtml1 != "" && contracthtml1 != null) {
                        $('.vha-sc-ExistingContractsSum').html(contracthtml1);
                        $('button.vha-sc-EarlyUpgradeBtn:contains("One Time")').trigger('click');
                    }
					/*if(callfrom =="ExtCartSummary-Edit"){
						
					}*/
                    break;
                }
            }

            function getUpgradeEligible(IsOverideReasonChanged) {
                if (!IsOverideReasonChanged) {
                    if (aUpgradeEligibity.EnableTenureOverride == "N") {
                        $("#sc-override-reason").attr("readonly", true);
                        $("#sc-override-reason").attr("disabled", true);
                        $("#sc-override-reason").css({
                            "background-color": "#dddddd"
                        });
                    }
                    if (aUpgradeEligibity.EligForUpgrade == "N") {
                        $('#vha-sc-dev-upgrade-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                        if (aUpgradeEligibity.Ineligible_Upgrade_Reason != "")
                            $('#vha-sc-upg-reason').text(aUpgradeEligibity.Ineligible_Upgrade_Reason).removeClass("VHASCDisplayNone");
                    }
                    if (aUpgradeEligibity.EligForResign == "N") {
                        $('#vha-sc-dev-resign-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                        if (aUpgradeEligibity.Ineligible_Resign_Reason != "")
                            $('#vha-sc-resign-reason').text(aUpgradeEligibity.Ineligible_Resign_Reason).removeClass("VHASCDisplayNone");
                    }
                    if (aUpgradeEligibity.EligForOutright == "N") {
                        $('#vha-sc-dev-rrp-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                        if (aUpgradeEligibity.Ineligible_Outright_Reason != "")
                            $('#vha-sc-rrp-reason').text(aUpgradeEligibity.Ineligible_Outright_Reason).removeClass("VHASCDisplayNone");
                    }
                    if (aUpgradeEligibity.EligForUpgrade == "Y" || aUpgradeEligibity.EligForResign == "Y" || aUpgradeEligibity.EligForOutright == "Y") {
                        $("#sc-override-reason").attr("readonly", true);
                        $("#sc-override-reason").attr("disabled", true);
                        $("#sc-override-reason").css({
                            "background-color": "#dddddd"
                        });
                        if (currentRLI.UpgradeOfferType == "") { // handled for back button
                            if (aUpgradeEligibity.EligForUpgrade == "Y") {
                                $('#vha-sc-dev-upgrade-btn').hasClass("applet-button-active") == false ? $('#vha-sc-dev-upgrade-btn').addClass("applet-button-active") : "";
                                currentRLI.UpgradeOfferType = currentRLI.UpgradeOfferType == "" ? "Upgrade to New Plan" : currentRLI.UpgradeOfferType;
                            } else if (aUpgradeEligibity.EligForOutright == "Y") {
                                $('#vha-sc-dev-rrp-btn').hasClass("applet-button-active") == false ? $('#vha-sc-dev-rrp-btn').addClass("applet-button-active") : "";
                                currentRLI.UpgradeOfferType = currentRLI.UpgradeOfferType == "" ? "Upgrade RRP on Instalment" : currentRLI.UpgradeOfferType;
                            } else if (aUpgradeEligibity.EligForResign == "Y") {
                                $('#vha-sc-dev-resign-btn').hasClass("applet-button-active") == false ? $('#vha-sc-dev-resign-btn').addClass("applet-button-active") : "";
                                currentRLI.UpgradeOfferType = currentRLI.UpgradeOfferType == "" ? "Resign" : currentRLI.UpgradeOfferType;
                            }
                        }
                    } else if (aUpgradeEligibity.EnableTenureOverride == "Y") {
                        $("#sc-override-reason").attr("readonly", false);
                        $("#sc-override-reason").attr("disabled", false);
                        $("#sc-override-reason").css({
                            "background-color": ""
                        });
                    }
                } else {
                    if (aUpgradeEligibity.EligWithReason_Upgrade == "N") {
                        $('#vha-sc-dev-upgrade-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                        if (aUpgradeEligibity.Ineligible_Upgrade_Reason_Override != "")
                            $('#vha-sc-upg-reason').text(aUpgradeEligibity.Ineligible_Upgrade_Reason_Override).removeClass("VHASCDisplayNone");
                    }
                    if (aUpgradeEligibity.EligWithReason_Resign == "N") {
                        $('#vha-sc-dev-resign-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                        if (aUpgradeEligibity.Ineligible_Resign_Reason_Override != "")
                            $('#vha-sc-resign-reason').text(aUpgradeEligibity.Ineligible_Resign_Reason_Override).removeClass("VHASCDisplayNone");
                    }
                    if (aUpgradeEligibity.EligWithReason_Outright == "N") {
                        $('#vha-sc-dev-rrp-btn').attr("disabled", true).addClass("vha-sc-totalNewbtn-disable");
                        if (aUpgradeEligibity.Ineligible_Outright_Reason_Override != "")
                            $('#vha-sc-rrp-reason').text(aUpgradeEligibity.Ineligible_Outright_Reason_Override).removeClass("VHASCDisplayNone");
                    }
                    if (currentRLI.UpgradeOfferType == "") { // handled for back button
                        if (aUpgradeEligibity.EligWithReason_Upgrade == "Y") {
                            $('#vha-sc-dev-upgrade-btn').hasClass("applet-button-active") == false ? $('#vha-sc-dev-upgrade-btn').addClass("applet-button-active") : "";
                            currentRLI.UpgradeOfferType = currentRLI.UpgradeOfferType == "" ? "Upgrade to New Plan" : currentRLI.UpgradeOfferType;
                        } else if (aUpgradeEligibity.EligWithReason_Outright == "Y") {
                            $('#vha-sc-dev-rrp-btn').hasClass("applet-button-active") == false ? $('#vha-sc-dev-rrp-btn').addClass("applet-button-active") : "";
                            currentRLI.UpgradeOfferType = currentRLI.UpgradeOfferType == "" ? "Upgrade RRP on Instalment" : currentRLI.UpgradeOfferType;
                        } else if (aUpgradeEligibity.EligWithReason_Resign == "Y") {
                            $('#vha-sc-dev-resign-btn').hasClass("applet-button-active") == false ? $('#vha-sc-dev-resign-btn').addClass("applet-button-active") : "";
                            currentRLI.UpgradeOfferType = currentRLI.UpgradeOfferType == "" ? "Resign" : currentRLI.UpgradeOfferType;

                        }
                    }
                }
            }

            function setUI() {
                var phtml = "";
                //$('#vha-sc-upg-reason, #vha-sc-rrp-reason, #vha-sc-resign-reason, #vha-sc-d-stockerrmsg, #vha-sc-d-equiplmtmsg").removeClass("VHASCDisplayNone");
                if (scJson.QuoteHeader.QuoteJourney == "Upgrade") {
                    $(".vha-sc-upgrade-buttons").removeClass("VHASCDisplayNone");
                    $('#sc-override-reason option').length > 0 ? "" : mAppendOptionList("VHA_UPGRADE_OVERRIDE_DESC", "#sc-override-reason");
                    getUpgradeEligible(false);
                } else {
                    $(".vha-sc-upgrade-buttons").addClass("VHASCDisplayNone");
                }
                for (var a = 0; a < tsBrand.length; a++) {
                    if (a == 0) {
                        phtml = phtml + '<button id="vhascupgrade' + tsBrand[a].toLowerCase() + '" class="btn vhascbrand brand' + [a] + '">' + tsBrand[a] + "</button>";
                    } else {
                        phtml = phtml + '<button id="vhascupgrade' + tsBrand[a].toLowerCase() + '" class="btn vhascbrand brand' + [a] + '">' + tsBrand[a] + "</button>";
                    }
                }
                $(".vha-sc-brandbtn").html(phtml);
                phtml = "";
                for (var a = 0; a < tsPayterm.length; a++) {
                    phtml = phtml + '<button id="' + tsPayterm[a].Id + '" class="' + tsPayterm[a].Class + '" term="' + tsPayterm[a].term + '">' + tsPayterm[a].Name + "</button>";
                }
                $(".vha-sc-paytermbtn").html(phtml);
                phtml = "";
                for (var a = 0; a < tsPlantype.length; a++) {
					
					var SearchString = "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='ENABLE_CMID'";

					var sLovFlg = VHAAppUtilities.GetPickListValues("", SearchString);
					
					var pegaResp = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_FUNCTION_ACCESS_RESP' AND [List Of Values.Value]= 'Resp|PegaResp' AND [List Of Values.Active]='Y'", {"All": "true"})[0].Name;
					
					var bsRespCheck = SiebelApp.S_App.GetService("VF BS Process Manager")
					var psInputs = SiebelApp.S_App.NewPropertySet();
					var userid =SiebelApp.S_App.GetProfileAttr("PegaLoginId");
					psInputs.SetProperty("User Id",userid );
					psInputs.SetProperty("Responsibility", pegaResp);
					psInputs.SetProperty("Service Name", "VF Check Responsibilities");
					psInputs.SetProperty("Method Name", "Check Responsibilities");
					var Output = bsRespCheck.InvokeMethod("Run Process", psInputs);
					//var Output = bsRespCheck.InvokeMethod("Check Responsibilities", psInputs);
					var resultset = Output?.GetChildByType("ResultSet");					
					
					if((sLovFlg=="N" || resultset.propArray.Exists != 'Y') && tsPlantype[a].Id=="vhascRecommendplan")
					{
						
					}
					else
					{						
						phtml = phtml + '<button id="' + tsPlantype[a].Id + '" class="' + tsPlantype[a].Class + '">' + tsPlantype[a].Name + "</button>";
					}
                }
                $(".vha-sc-plantypebtn").html(phtml);
                phtml = "";
                createDeviceTiles();
                getPlanDetails();
                $("#TSNSADownload img").addClass("VFDisplayNone");
                $("#vha-sc-subs-dis-amt").prop('disabled', true);
                $("#vha-sc-feature-config-termrestdisc1").prop('disabled', true);
                $("#vha-sc-vip-dis-amt").prop('disabled', true);
                $("#vha-sc-feature-config-termrestdisc2").prop('disabled', true);
                $('.vha-sc-data-addonterm-container').parent().addClass('VHASCDisplayNone'); //Hidded for now, can be enabled based on busines confirmation
            }
            function getDeviceData() {
                var devicesettings = {
                    "async": false,
                    "crossDomain": true,
                    "url": elasticSearchurl('Device'),
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "dd0b3ba5-1198-5a10-3472-8119a5d93f7c"
                    },
                    "processData": false,
                    "data": '{\r\n    "size": 10000,\r\n    "query": {\r\n        "match_all": {\r\n            }\r\n    }\r\n}'
                };
                $.ajax(devicesettings).done(function (dvcresponse) {
                    devicesresponse = dvcresponse;
                    //var filterBrand = "Apple";
                    sDeviceTerm = 36;
                    filterDevices();

                    /*filtereddevicesresponse = [];
                    for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                    filtereddevicesresponse.push(Object.values(devicesresponse.hits.hits)[i]);
                    }
                     */
                    tssleep(30).then(() => {
                        $('#vhascupgradeapple').addClass("applet-button-active");
                        $('.vhasc-d-term').removeClass("applet-button-active");
						$('#vhasc36term').addClass("applet-button-active");
                    });
                    var globaldistinctmodels = [];
                    for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                        if (!globaldistinctmodels.includes(Object.values(devicesresponse.hits.hits)[i]._source.Source_Product_Name)) {
                            var prodName = Object.values(devicesresponse.hits.hits)[i]._source.Source_Product_Name.toLowerCase();
                            if (prodName != "non device" && prodName.indexOf("kogan") == -1) {
                                globaldistinctmodels.push(Object.values(devicesresponse.hits.hits)[i]._source.Source_Product_Name);
                            }
                        }
                    }
                    $("#sc-device-search").autocomplete({
                        source: globaldistinctmodels.map(function (a) {
                            return {
                                label: a,
                                value: a,
                                type: "GlobalDeviceSearch"
                            };
                        }),
                        minLength: 0,
                        select: selectAutoCompleteVal
                    });
                });
            }
            function createDeviceTiles() {
                //alert("Hello");
                $.getJSON("scripts/siebel/custom/DeviceImage.json", function (jd) {
                    //alert("Hi");
                    var sDevImgMpng = jd;
                    var distinctModels = [];
                    for (i = 0; i < filtereddevicesresponse.length; i++) {
                        if (!distinctModels.includes(Object.values(filtereddevicesresponse)[i]._source.Source_Product_Name)) {
                            var prodName = Object.values(filtereddevicesresponse)[i]._source.Source_Product_Name.toLowerCase();
                            if (prodName != "non device" && prodName.indexOf("kogan") == -1) {
                                distinctModels.push(Object.values(filtereddevicesresponse)[i]._source.Source_Product_Name);
                            }
                        }
                    }
                    var nlen = distinctModels.length;
                    if (nlen > 0) {
                        var i = Math.floor(nlen / 3);
                        var chtml = '<div id="vha-sc-d-carousel" class="carousel slide carousel-multi-item" data-ride="carousel" data-interval="false"><div class="carousel-control-prev m-3 carousel-control" href="#vha-sc-d-carousel" data-slide="prev"><div class="carousel-control-prev-icon vha-sc-d-carouselnav"></div></div><div class="carousel-control-next m-3 carousel-control" href="#vha-sc-d-carousel" data-slide="next"><div class="carousel-control-next-icon vha-sc-d-carouselnav"></div></div><div class="carousel-inner vha-sc-d-carousel-inner" role="listbox">';
                        var f = 0;
                        var s = 0;
                        var t = 0;
                        for (var x = 0; x <= i; x++) {
                            f = t;
                            s = t + 1;
                            t = t + 2;

                            //var sDeviceTerm = 12; //$(".vhasc-d-term.applet-button-active").attr("term");//vasavi added for PKE000000106117
                            //alert(sDeviceTerm);
                            if (x == 0) {
                                if (s < nlen) {
                                    if (t < nlen) {
                                        chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(s, distinctModels[s], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(t, distinctModels[t], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + "</div></div>"; //vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    } else {
                                        chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(s, distinctModels[s], filtereddevicesresponse, sDevImgMpng, sDevImgMpng, sDeviceTerm) + "</div></div>"; //vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    }
                                } else {
                                    if (f < nlen) {
                                        chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + "</div></div>"; //vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    }
                                }
                                t = t + 1;
                            } else {
                                if (s < nlen) {
                                    if (t < nlen) {
                                        chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(s, distinctModels[s], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(t, distinctModels[t], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + "</div></div>"; //vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    } else {
                                        chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(s, distinctModels[s], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + "</div></div>"; //vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    }
                                } else {
                                    if (f < nlen) {
                                        chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + "</div></div>"; //vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    }
                                }
                                t = t + 1;
                            }
                        }
                        chtml = chtml + "</div></div>";
                        $("#vha-sc-d-carousel-container").html(chtml);

                    } else {
                        $("#vha-sc-d-carousel-container").html('<div class="row d-flex justify-content-center vha-tot-d-cnores pt-5 pb-5"><div class="col-md-12 h3 mb-2">No Devices found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
                    }
                });
            }
            function filterDevices() {
                filtereddevicesresponse = [];
                if (filterBrand != "Others") {
                    for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                        if (Object.values(devicesresponse.hits.hits)[i]._source.Make.toLowerCase().indexOf(filterBrand.toLowerCase()) > -1) {
                            filtereddevicesresponse.push(Object.values(devicesresponse.hits.hits)[i]);
                        }
                    }
                } else {
                    for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                        if (!["apple", "samsung", "google", "vodafone"].includes(Object.values(devicesresponse.hits.hits)[i]._source.Make.toLowerCase())) {
                            filtereddevicesresponse.push(Object.values(devicesresponse.hits.hits)[i]);
                        }
                    }
                }
                createDeviceTiles();
            }
            function mgetAddonsList() {
                //debugger;
                var settings = {
                    "async": false,
                    "crossDomain": true,
                    "url": apilovurl + "VHARestAPIWF/RunProcess",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "5c1f0ef1-1226-5653-dba8-72a6c0e242c9"
                    },
                    "processData": false,
                    "data": '{\r\n   "body":{\r\n      "ProcessName":"VHA Get Proposition Product Details Workflow - SalesCalc",\r\n      "UpgradeOfferType":"' + currentRLI.UpgradeOfferType + '",\r\n  "CustomerType":"' + scJson.QuoteHeader.CustomerType + '",\r\n  "PropSAMId":"' + currentRLI.PropSAMId + '",\r\n "Price List Id":"' + scJson.QuoteHeader.ExistingCustDtls.PriceListId + '",\r\n "Object Id":"' + scJson.QuoteHeader.QuoteId + '"\r\n }\r\n}'
                };
                /* to sit dont remove
                '{\r\n   "body":{\r\n      "ProcessName":"VHA Get Proposition Product Details Workflow - SalesCalc",\r\n      "UpgradeOfferType":"' + currentRLI.UpgradeOfferType + '",\r\n  "CustomerType":"' + scJson.QuoteHeader.CustomerType + '",\r\n  "PropSAMId":"' + currentRLI.PropSAMId + '",\r\n "Price List Id":"' + scJson.QuoteHeader.ExistingCustDtls.PriceListId + '",\r\n "Object Id":"' + scJson.QuoteHeader.QuoteId + '"\r\n }\r\n}'
                --dev code
                '{\r\n   "body":{\r\n      "ProcessName":"VHA Get Proposition Product Details Workflow - SalesCalc",\r\n      "UpgradeOfferType":"' + currentRLI.UpgradeOfferType + '",\r\n  "CustomerType":"' + scJson.QuoteHeader.CustomerType + '",\r\n  "PropSAMId":"AUP1395",\r\n "Price List Id":"1-NLL4KZ",\r\n "Object Id":"3-CM4RDM7"\r\n }\r\n}'
                 */
                $.ajax(settings).done(function (response) {
                    if (response["Error Code"] == "" && typeof response.SiebMsg.Proposition !== "undefined") {
                        var addOnList = response.SiebMsg.Proposition.Addons;
                        var restDiscList = response.SiebMsg.Proposition.RecurringDiscount;
                        var roamList = response.SiebMsg.Proposition.Roaming;
                        var verifyempty = response.SiebMsg.Proposition.EarlyUpgradeFeeRollOver;
                        var idd = new Array;
                        var data = new Array;
                        var restDisc = new Array;
                        if (addOnList != undefined) {
                            var length = addOnList.length;
                            for (var i = 0; i < length; i++) {
                                var currProp = addOnList[i];
                                var Object = {
                                    chargeType: currProp["Charge Type"],
                                    name: currProp["Name"],
                                    dollar: currProp["Dollar"],
                                    GbProdId: currProp["Global Prod Id"],
                                    ProdId: currProp["Prod Id"],
                                    SamId: currProp["SAM Id"]
                                };
                                if (currProp["Addon Type"] == "IDD") {
                                    idd.push(Object);
                                } else {
                                    if (currProp["Addon Type"] == "Data") {
                                        data.push(Object);
                                    }
                                }
                            }
                        }
                        if (restDiscList != undefined) {
                            var restDiscLength = restDiscList.length;
                            for (var i = 0; i < restDiscLength; i++) {
                                var currProp = restDiscList[i];
                                var Object = {
                                    name: currProp["Name"],
                                    GbProdId: currProp["Global Prod Id"],
                                    ProdId: currProp["Prod Id"],
                                    SamId: currProp["SAM Id"]
                                };
                                if (currProp["Global Prod Id"] == "Recurring Discount") {
                                    restDisc.push(Object);
                                }
                            }
                        }
                        var dataRecurring = data.filter(function (temp) {
                            return temp.chargeType == "Recurring";
                        });
                        var dataOneOff = data.filter(function (temp) {
                            return temp.chargeType == "One-off Charge";
                        });
                        var iddRecurring = idd.filter(function (temp) {
                            return temp.chargeType == "Recurring";
                        });
                        var iddOneOff = idd.filter(function (temp) {
                            return temp.chargeType == "One-off Charge";
                        });
                        addOnData = {
                            dataRecurring: dataRecurring,
                            dataOneOff: dataOneOff,
                            iddOneOff: iddOneOff,
                            iddRecurring: iddRecurring,
                            restDisc: restDisc
                        };
                        addOnLoaded = true;
                    }
                    /*else{
                    debugger;
                    alert("Addons retrieval failed, kindly raise a Siebel Support ticket if you continue to receive this error.");
                    }*/
                }).fail(function (xhr, status, error) {
                    alert("Addons retrieval failed, kindly raise a Siebel Support ticket if you continue to receive this error.");
                });
            }
            function secondaryDevice() {
                if (secondaryresponse.length == 0) {
                    var settings = {
                        "async": false,
                        "crossDomain": true,
                        "url": elasticSearchurl('SecondaryDevice'),
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            "postman-token": "dd0b3ba5-1198-5a10-3472-8119a5d93f7c"
                        },
                        "processData": false,
                        "data": '{\r\n    "size": 4000,\r\n    "query": {\r\n        "match_all": {\r\n            }\r\n    }\r\n}'
                    };
                    $.ajax(settings).done(function (response) {
                        secondaryresponse = response.hits.hits;
                        for (i = 0; i < secondaryresponse.length; i++) {
                            scdvcresult.push({
                                label: secondaryresponse[i]._source.Model + '->' + secondaryresponse[i]._source.Name,
                                value: secondaryresponse[i]._source.Name,
                                model: secondaryresponse[i]._source.Model,
                                prodcd: secondaryresponse[i]._source.Product_Code,
                                make: secondaryresponse[i]._source.Make,
                                ean: secondaryresponse[i]._source.EAN,
                                rrpingst: secondaryresponse[i]._source.RRP_Inc_GST,
                                rrpexgst: secondaryresponse[i]._source.RRP_Exc_GST,
                                stockavialablity: secondaryresponse[i]._source.Stock_Availability,
                                dealer: secondaryresponse[i]._source.Dealer,
                                type: "Secondary Device"
                            });
                        }
                        $("#sc-secdevice-search").autocomplete({
                            source: removeDuplicates(scdvcresult, 'model').map(function (a) {
                                return {
                                    label: a.model,
                                    value: a.model,
                                    type: a.type
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
						$('button[parid="#sc-secdevice-search"]').click(dropDownTrigger);						
                    });
                    $.ajax(settings).fail(function (xhr, status, error) {
                        alert("Secondary Device retrieval failed, kindly raise a Siebel Support ticket if you continue to receive this error.");
                    });

                }
                if (accessoryresponse.length == 0) {
                    var accessorysettings = {
                        "async": false,
                        "crossDomain": true,
                        "url": elasticSearchurl('Accessories'),
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            "postman-token": "dd0b3ba5-1198-5a10-3472-8119a5d93f7c"
                        },
                        "processData": false,
                        "data": '{\r\n    "size": 10000,\r\n    "query": {\r\n        "match_all": {\r\n            }\r\n    }\r\n}'
                    };
                    $.ajax(accessorysettings).done(function (response) {
                        accessoryresponse = response.hits.hits;
                        for (i = 0; i < accessoryresponse.length; i++) {
                            if (accessoryresponse[i]._source.Non_APP != "Y") {
                                accessoryresult.push({
                                    label: accessoryresponse[i]._source.Accessory_Name,
                                    value: accessoryresponse[i]._source.Accessory_Name,
                                    make: accessoryresponse[i]._source.Make,
                                    makemodel: accessoryresponse[i]._source.Make + " / " + accessoryresponse[i]._source.Model,
                                    prodcd: accessoryresponse[i]._source.Accessory_Code,
                                    model: accessoryresponse[i]._source.Model,
                                    category: accessoryresponse[i]._source.Category,
                                    rrpingst: accessoryresponse[i]._source.RRP_inc_gst,
                                    rrpexgst: accessoryresponse[i]._source.RRP_exc_gst,
                                    ean: accessoryresponse[i]._source.EAN,
                                    vendor: accessoryresponse[i]._source.Vendor,
                                    stockavialablity: accessoryresponse[i]._source.Stock_Availability,
                                    type: "Accessory"
                                });
                            }
                        }
                        //debugger;
                        $("#sc-acc-cat-search").autocomplete({
                            source: removeDuplicates(accessoryresult, 'category').map(function (a) {
                                return {
                                    label: a.category,
                                    value: a.category,
									type:a.type
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
						$('button[parid="#sc-acc-cat-search"]').click(dropDownTrigger);
                        /*$("#sc-makemod-search").autocomplete({
                            source: removeDuplicates(accessoryresult, 'makemodel').map(function (a) {
                                return {
                                    label: a.makemodel,
                                    value: a.makemodel
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $("#sc-accname-search").autocomplete({
                            source: removeDuplicates(accessoryresult, 'value').map(function (a) {
                                return {
                                    label: a.value,
                                    value: a.value,
                                    prodcd: a.prodcd,
                                    type: a.type
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });*/

                    });
                    $.ajax(accessorysettings).fail(function (xhr, status, error) {
                        alert("Accessory retrieval failed, kindly raise a Siebel Support ticket if you continue to receive this error.");
                    });
                }
                $("#maskoverlay").styleHide();
            }

            // Function to remove duplicates based on the property in array object
            const removeDuplicates = (array, propertyName) => {
                const seen = new Set();
                return array.filter(item => {
                    const propertyValue = item[propertyName];
                    if (!seen.has(propertyValue)) {
                        seen.add(propertyValue);
                        return true;
                    }
                    return false;
                });
            };

            var selectAutoCompleteVal = function (e, u) {
                //e.preventDefault();
                $(this).val(u.item.value);
                switch (u.item.type) {
                case "data":
                    //var sDataAddOnObj = scJson.QuoteHeader.RootItem.PackItem;
                    var sDataAddOnObj = currentRLI.PackItem.filter(function (item) {
                        return item.UIType == "Data";
                    });
                    var tempLength = sDataAddOnObj.length;
                    if (tempLength <= 0)
                        sDataAddOnObj = {};
                    else
                        sDataAddOnObj = sDataAddOnObj[0];
                    if (u.item.dollar == undefined) {
                        u.item.dollar = 0;
                    }
                    sDataAddOnObj.Action = "Add";
                    sDataAddOnObj.Type = "Addon";
                    sDataAddOnObj.UIType = "Data";
                    sDataAddOnObj.Name = u.item.value;
                    sDataAddOnObj.ProdIntegrationId = "";
                    sDataAddOnObj.Price = u.item.dollar;
                    sDataAddOnObj.UIdivid = $('.vha-sc-dataaddons-main ul input[type="radio"]:checked').attr('id');
                    if (tempLength <= 0)
                        currentRLI.PackItem.push(sDataAddOnObj);

                    var DataPrice = sDataAddOnObj.Price;
                    if (DataPrice == "") {
                        DataPrice = "0.00";
                    }
                    $(".vha-sc-cart-datacost").text("$" + DataPrice);
                    //updateSessionDetails(DataPrice, "DataAddOns", "Add");
                    //totalIndicativeCostCalc();
                    break;
                    //vasavi added for PKE
                case "iddTerm":
                    var sIddAddOnObj = currentRLI.PackItem.filter(function (item) {
                        return item.UIType == "IDD";
                    });
                    if (sIddAddOnObj.length > 0) {
                        sIddAddOnObj[0].Period = u.item.value;
                    };
                    break;
                case "idd":
                    var sIddAddOnObj = currentRLI.PackItem.filter(function (item) {
                        return item.UIType == "IDD";
                    });
                    var tempLength = sIddAddOnObj.length;
                    if (tempLength <= 0)
                        sIddAddOnObj = {};
                    else
                        sIddAddOnObj = sIddAddOnObj[0];
                    if (u.item.dollar == undefined) {
                        u.item.dollar = 0;
                    }
                    sIddAddOnObj.Action = "Add"
                        sIddAddOnObj.Type = "Addon";
                    sIddAddOnObj.UIType = "IDD";
                    sIddAddOnObj.Name = u.item.value;
                    sIddAddOnObj.ProdIntegrationId = "";
                    sIddAddOnObj.Price = u.item.dollar;
                    sIddAddOnObj.UIdivid = $('.vha-sc-iddaddons-main ul input[type="radio"]:checked').attr('id');
                    if (tempLength <= 0)
                        currentRLI.PackItem.push(sIddAddOnObj);

                    var IddPrice = sIddAddOnObj.Price;
                    if (IddPrice == "") {
                        IddPrice = "0.00";
                    }
                    $(".vha-sc-cart-iddcost").text("$" + IddPrice);
                    //updateSessionDetails(IddPrice, "IddAddOns", "Add");
                    //totalIndicativeCostCalc();
                    break;
                case "GlobalDeviceSearch":
                    $(".vhascbrand").removeClass("applet-button-active");
                    filtereddevicesresponse = [];
                    if ($(this).val() != "") {
                        for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                            if (Object.values(devicesresponse.hits.hits)[i]._source.Source_Product_Name.toLowerCase() == $(this).val().toLowerCase()) {
                                filtereddevicesresponse.push(Object.values(devicesresponse.hits.hits)[i]);
                                $('.vha-sc-brandbtn button').each(function () {
                                    // Retrieve the ID and text content of each button
                                    var brandId = "#" + $(this).attr('id');
                                    var brandText = $(this).text();
                                    if (brandText == "Modem/Vodafone") {
                                        brandText = "Vodafone";
                                        brandId = ".brand3";
										$('.vha-sc-btn-div-payment').hasClass("VHASCDisplayNone") == true ? "" : $('.vha-sc-btn-div-payment').addClass("VHASCDisplayNone");
                                    }else{
										$('.vha-sc-btn-div-payment').hasClass("VHASCDisplayNone") == true ? $('.vha-sc-btn-div-payment').removeClass("VHASCDisplayNone") : "";
									}
                                    $("#vhascupgradeothers").addClass("applet-button-active");
                                    if (Object.values(devicesresponse.hits.hits)[i]._source.Make.toLowerCase() == brandText.toLowerCase()) {
                                        setTimeout(function () {
                                            $(".vhascbrand").removeClass("applet-button-active");
                                            $(brandId).addClass("applet-button-active");
                                            $("#vhascupgradeothers").removeClass("applet-button-active");
                                        }, 1000);
                                        return false;
                                    }
                                });
                            }
                        }
                    } else {
                        filterBrand = $(".vhascbrand.applet-button-active").text();
                        if (filterBrand == "Modem/Vodafone"){
                            filterBrand = "Vodafone";
							$('.vha-sc-btn-div-payment').hasClass("VHASCDisplayNone") == true ? "" : $('.vha-sc-btn-div-payment').addClass("VHASCDisplayNone");
						}else{
							$('.vha-sc-btn-div-payment').hasClass("VHASCDisplayNone") == true ? $('.vha-sc-btn-div-payment').removeClass("VHASCDisplayNone") : "";
						}
                        filterDevices();
                    }
                    createDeviceTiles();
                    break;
                case "GlobalPlanSearch":
					pegaflag = "N";
					selectedplanTxt = "Others";
					//$("#vha-sc-nbaofferbtn").removeClass("VHASCDisplayNone");
                    $(".vhascplantype").removeClass("applet-button-active");
                    var planFilter = [];
                    if ($(this).val() != "") {
                        for (i = 0; i < sRsnBasedplnresp.length; i++) {
                            if (sRsnBasedplnresp[i]._source.Plan_Name.toLowerCase() == $(this).val().toLowerCase()) {
                                planFilter.push(sRsnBasedplnresp[i]);
                                var tsPlan = tsPlantype.filter(function (a) {
                                    return sRsnBasedplnresp[i]._source.Plan_Type == a.SiebelName;
                                });
                                if (tsPlan.length) {
                                    $("#" + tsPlan[0]["Id"]).addClass("applet-button-active");
                                }
                            }
                        }
                    } else {
                        planFilter = sRsnBasedplnresp;
                    }
                    createPlanTiles(planFilter);
                    break;
                case "Secondary Device":
                    if ($('#sc-secdevice-v-search').data('ui-autocomplete')) {
                        $('#sc-secdevice-v-search').autocomplete('destroy');
						$('#sc-secdevice-v-search').val('');
                    }
                    $("#sc-secdevice-v-search").autocomplete({
                        source: scdvcresult.filter(function (item) {
                            return item.model == u.item.value;
                        }).map(function (a) {
                            return {
                                label: a.value,
                                value: a.value,
                                prodcd: a.prodcd,
                                type: "Secondary Device Varient"
                            };
                        }),
                        minLength: 0,
                        select: selectAutoCompleteVal
                    });
					$('button[parid="#sc-secdevice-v-search"]').click(dropDownTrigger);
                    break;
                case "Secondary Device Varient":
                    $('#vha-sc-wear-add-btn').attr("Productcd", u.item.prodcd);
                    break;
                case "Accessory":
                    //$('#vha-sc-acces-add-btn').attr("Productcd", u.item.prodcd);
					if ($('#sc-accname-search').data('ui-autocomplete')) {
						$('#sc-accname-search').autocomplete('destroy');
						$('#sc-accname-search').val(''); 						
					}
					$("#sc-accname-search").autocomplete({
							source:removeDuplicates(accessoryresult.filter(item => item.category === u.item.value),'value').map(item => ({ label: item.value, value:item.value, type: "AccessoryName",prodcd :item.prodcd })), 
							minLength: 0,
                            select: selectAutoCompleteVal
                    });
					$('button[parid="#sc-accname-search"]').click(dropDownTrigger);
                    break;
				case "AccessoryName": //jan 23
					 $('#vha-sc-acces-add-btn').attr("Productcd", u.item.prodcd);
					break;
                case "Device Care":
                    var currectDvc = currentRLI.DeviceItem.filter(function (item) {
                        return item.Action == "Add";
                    });
                    if (currectDvc.length > 0) {
                        currectDvc[0].Insurance = u.item.value;
                        currectDvc[0].InsPri = "15.00";
                        currentRLI.DeviceIns = "15.00";
                    }
                    $('#vha-sc-cart-dvccarecost').text("$15.00");
                    break;
                    /*case "SD Device Care":
                    var currectSDDvc = currentRLI.SDItem.filter(function(item){
                    return item.Action == "Add";
                    });
                    if(currectSDDvc.length>0){
                    currectSDDvc[0].Insurance = u.item.value;
                    currectSDDvc[0].InsPri = 10.00;
                    }
                    break;*/
                }
            };
            function validateUI(callFrom) {
                var toReturn = true;
                var sServiceLOVCount = Number(VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_SALESCALC_JOURNEY' AND [List Of Values.Name]='ServiceLimit' AND [List Of Values.Active]='Y'")[0]);
                switch (callFrom) {
                case "backtoCoveragepage":
                    if (currentRLI.Mode == "Edit") {
                        alert("Please do Save to Quote in summary to save the item before moving back to Coverage check page. (OR) Click Remove in summary to remove the item from quote");
                        toReturn = false;
                    }
                    break;
                case "backtoDeviceDtls":
                    if (Number(scJson.QuoteHeader.Prepayment.PrepaymentAmt) > 0) {
                        alert("Please remove prepayment amount before moving back to Device & Plan congifuration page");
                        toReturn = false;
                    }
                    break;
                case "Tab":
                    if (currentRLI.Mode != "Edit") {
                        alert("Please click 'Add to Quote button in summary' OR 'Upgrade button in Existing Service' to proceed further");
                        toReturn = false;
                    }
                    if (currentRLI.SimO == "SimO" || currentRLI.SimO == "BYOD") {
                        if (currentRLI.PlanItem.Name == "") {
                            alert("Please shop Plan before proceeding to with other items");
                            toReturn = false;
                        }
                    } else if (currentRLI.UpgradeOfferType) {
                        switch (currentRLI.UpgradeOfferType) {
                        case "Upgrade to New Plan":
                            if (currentRLI.DeviceItem.filter(function (item) {
                                    return item.Action === "Add" && item.Item__Name != "";
                                }).length <= 0 || currentRLI.PlanItem.Name == "") {
                                alert("Please shop Device and Plan before proceeding to with other items");
                                toReturn = false;
                            }
                            break;
                        case "Upgrade RRP on Instalment":
                        case "Resign":
                            if (currentRLI.DeviceItem.filter(function (item) {
                                    return item.Action === "Add" && item.Item__Name != "";
                                }).length <= 0) {
                                alert("Please shop Device before proceeding to with other items");
                                toReturn = false;
                            }
                            break;
                        }
                    } else {
                        if (currentRLI.DeviceItem.filter(function (item) {
                                return item.Action === "Add" && item.Item__Name != "";
                            }).length <= 0 || currentRLI.PlanItem.Name == "") {
                            alert("Please shop Device and Plan before proceeding to with other items");
                            toReturn = false;
                        }
                    }
                    break;
                case "New":
                    if (currentRLI.Mode == "Edit") {
                        alert("Please save the item in the summary");
                        toReturn = false;
                    }
                    if (scJson.QuoteHeader.RootItem.length > sServiceLOVCount) {
                        alert("Adding more than " + sServiceLOVCount + " services into quote is not allowed");
                        toReturn = false;
                    }
                    break;
                case "Save":
                    if (validateUI("Tab")) {
                        /*if (currentRLI.DeviceItem.filter(function (item) {
                        return item.Action === "Add" && item.Item__Name != "";
                        }).length <= 0 && currentRLI.PlanItem.Name == "") {
                        alert("Please shop Device or Plan before saving the item");
                        toReturn = false;
                        }*/
                        //$(".vha-sc-device-select #vha-sc-d-stockerrmsg").text("");
                        var sSDLOVCount = Number(VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_SALESCALC_JOURNEY' AND [List Of Values.Name]='SDLimit' AND [List Of Values.Active]='Y'")[0]);
                        var sAccLOVCount = Number(VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_SALESCALC_JOURNEY' AND [List Of Values.Name]='AccessoryLimit' AND [List Of Values.Active]='Y'")[0]);

                        // Root line item limit check
                        if (scJson.QuoteHeader.RootItem.length > sServiceLOVCount) {
                            alert("Adding more than " + sServiceLOVCount + " services into quote is not allowed");
                            toReturn = false;
                        }

                        // SD item limit check
                        if (currentRLI.SDItem.filter(function (sd) {
                                return sd.Action == "Add";
                            }).length > sSDLOVCount) {
                            alert("Maximum of " + sSDLOVCount + " secondary devices only allowed");
                            toReturn = false;
                        }

                        //Accessories limit check
                        if (currentRLI.AccItem.filter(function (sd) {
                                return sd.Action == "Add";
                            }).length > sAccLOVCount) {
                            alert("Please select less Accessories and refer the customer to a store to purchase any additional accessories outright");
                            toReturn = false;
                        }
						
						// Remaining equipment $ limit check - existing customer
						var tcontractVal = parseFloat(TotalEquipmentLimit().nTotalContractAmt).toFixed(2);
						//var tprepaymentVal = parseFloat(TotalEquipmentLimit().nPrepayAmt).toFixed(2);
						//var tTerminatedVal = parseFloat(TotalEquipmentLimit().nTerminatedAmt).toFixed(2);
						//var totalRemVal = parseFloat(scJson.QuoteHeader.ExistingCustDtls.RemainingEquipmentLimit).toFixed(2) + tprepaymentVal + tTerminatedVal;
						var totalRemVal = parseFloat(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit).toFixed(2);// + tprepaymentVal;
						if (parseFloat(tcontractVal) > parseFloat(totalRemVal) && scJson.QuoteHeader.CustomerType == "Existing") {
							var sErrDtl = "The Total Contract Amount Value ($ " + tcontractVal + ") exceeds equipment limit: ($ " + parseFloat(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(tcontractVal - scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit).toFixed(2) + "). Kindly add only device/accessory plan within the approved limit";
							alert(sErrDtl);
							toReturn = false;
						}
						
						if(isNaN()){
							
						}
                    } else {
                        toReturn = false;
                    }
                    break;
                case "Prepayment":
                    if ($("#vha-sc-pre-pay-amt-inp").val() > 1000) {
                        alert("Prepayment amount cannot be greater than 1000");
                        toReturn = false;
                    }
                    // Remaining equipment $ limit check - existing customer
                    var tcontractVal = parseFloat(TotalEquipmentLimit().nTotalContractAmt).toFixed(2);
                    var tprepaymentVal = parseFloat(TotalEquipmentLimit().nPrepayAmt).toFixed(2);
                    //var tTerminatedVal = parseFloat(TotalEquipmentLimit().nTerminatedAmt).toFixed(2);
                    //var totalRemVal = parseFloat(scJson.QuoteHeader.ExistingCustDtls.RemainingEquipmentLimit).toFixed(2) + tprepaymentVal + tTerminatedVal;
					var totalRemVal = parseFloat(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit).toFixed(2) + tprepaymentVal;
                    if (parseFloat(tcontractVal) > parseFloat(totalRemVal) && scJson.QuoteHeader.CustomerType == "Existing") {
                        var sErrDtl = "The Total Contract Amount Value ($ " + tcontractVal + ") exceeds equipment limit: ($ " + parseFloat(scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(tcontractVal - scJson.QuoteHeader.ExistingCustDtls.adjRemainingEquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment/terminate option if available";
                        alert(sErrDtl);
                        toReturn = false;
                    }
                    // Prepayment should be within total contract amount for all service in qoute
                    if (parseFloat(Number($('#vha-sc-pre-pay-amt-inp').val())) > parseFloat(tcontractVal)) {
                        alert("Entered prepayment amount is greater than the total cost of devices, wearables and accessories");
                        toReturn = false;
                    }
                    break;
                case "Shop":
                    if (currentRLI.Mode != "Edit" || currentRLI == "") {
                        alert("Please click Add to Quote or Upgrade button in summary to proceed further");
                        toReturn = false;
                    }
                    break;
                case "DevicetoPrepayment":
                    if (currentRLI.Mode == "Edit") {
                        alert("Please click Save/Cancel the items in summary to proceed further");
                        toReturn = false;
                    }
                    break;
                default:
                    break;
                }
                return toReturn;
            }

            function TriggerNBNAddress(sResp, NBNLoc) {
                var sInterfaceCallBS = "Workflow Process Manager";
                var WFProcessName = "VHA Generic VBC";
                var BOMap = "VHA VBC Generic";
                var BO = "VHA VBC Generic";
                var BCMap = "List Of Values";
                var BC = "VF Transaction Settings";
                var sIntCallInputs = SiebelApp.S_App.NewPropertySet();
                var sIntCallOutputs = SiebelApp.S_App.NewPropertySet();

                var ser = SiebelApp.S_App.GetService(sInterfaceCallBS);
                //var propName = Inputs.GetFirstProperty();
                sIntCallInputs.SetProperty("Service Name", sInterfaceCallBS);
                sIntCallInputs.SetProperty("Method Name", "Run Process");

                //sIntCallInputs.SetProperty("SessionId",sessionId);
                sIntCallInputs.SetProperty("ProcessName", WFProcessName);
                sIntCallInputs.SetProperty("BusObjectMap", BOMap);
                sIntCallInputs.SetProperty("BusObject", BO);
                sIntCallInputs.SetProperty("BusCompMap", BCMap);
                sIntCallInputs.SetProperty("BusComp", BC);
                sIntCallInputs.SetProperty("ManualSearch", 'Y');
                sIntCallInputs.SetProperty("TransactionName", "VHA NBN Query Address");
                sIntCallInputs.SetProperty("TransactionType", "VBC_QUERY");
                sIntCallInputs.SetProperty("LOVType", "VHA_NBN_TOUCHPOINT");

                if (NBNLoc == "" || NBNLoc == undefined) {
                    var sRespUnitType = sResp.address.properties.complex_unit_type;
                    var sRespUnitIden = sResp.address.properties.complex_unit_identifier;
                    var sRespComType = sResp.address.properties.complex_level_type;
                    var sStreet1 = sResp.address.properties.street_number_1;
                    var sStreet2 = sResp.address.properties.street_number_2;
                    var sLotIden = sResp.address.properties.lot_identifier;

                    var sFloorType = (sRespUnitType !== null) ? sRespUnitType : (sRespUnitIden !== null) ? "Unit" : sRespComType;
                    var sFloor = (sRespUnitType !== null) ? sRespUnitIden : (sRespUnitIden !== null) ? sRespUnitIden : sRespComType;
                    var sStreetNum = (sStreet1 === null) ? "LOT" + sLotIden : (sStreet2 !== null) ? sStreet1 + "-" + sStreet2 : sStreet1;

                    sFloorType = (sFloorType != null) ? mCamelCase(sFloorType) : "";
                    sFloor = (sFloor != null) ? mCamelCase(sFloor) : "";

                    var sSuburb = sResp.address.properties.locality_name;
                    var sStreetName = sResp.address.properties.street_name;
                    var sStreetType = sResp.address.properties.street_type_description;
                    var sBuildingName = sResp.address.properties.site_name;
                    var sUnitType = sFloorType;
                    var sUnitNumber = sFloor;
                    var sBuildingNumber = sStreetNum;
                    var sPostcode = sResp.address.properties.postcode;
                    var sState = sResp.address.properties.state_territory;
					
					sSuburb = (sSuburb != null) ? sSuburb : "";
					sStreetName = (sStreetName != null) ? sStreetName : "";
					sStreetType = (sStreetType != null) ? sStreetType : "";
					sBuildingName = (sBuildingName != null) ? sBuildingName : "";
                    sStreetType = (sStreetType != null) ? mCamelCase(sStreetType) : "";
                    sRespUnitType = (sRespUnitType != null) ? mCamelCase(sRespUnitType) : "";
                    sRespComType = (sRespComType != null) ? mCamelCase(sRespComType) : "";

                    function mCamelCase(str) {
                        var sWrdsArr = str.split(' ');
                        str = "";
                        $.each(sWrdsArr, function (ind, val) {
                            if (ind != 0)
                                str = str + " " + val[0].toUpperCase() + val.toLowerCase().substring(1);
                            else
                                str = str + val[0].toUpperCase() + val.toLowerCase().substring(1);
                        });
                        return str;
                    }
					
					

                    sIntCallInputs.SetProperty("Value", "VHANBNAddressMapQASNewCustomer");
                    sIntCallInputs.SetProperty("PropSet1", sSuburb);
                    sIntCallInputs.SetProperty("PropSet2", sStreetName);
                    sIntCallInputs.SetProperty("PropSet3", sStreetType);
                    sIntCallInputs.SetProperty("PropSet4", sBuildingName);
                    sIntCallInputs.SetProperty("PropSet5", sUnitType);
                    sIntCallInputs.SetProperty("PropSet6", sUnitNumber);
                    sIntCallInputs.SetProperty("PropSet7", sBuildingNumber);
                    sIntCallInputs.SetProperty("PropSet8", sPostcode);
                    sIntCallInputs.SetProperty("PropSet9", sState);
                    sIntCallInputs.SetProperty("PropSet10", "");
                    sIntCallInputs.SetProperty("PropSet11", "");
                    sIntCallInputs.SetProperty("PropSet12", "");
                    sIntCallInputs.SetProperty("PropSet13", "");
                    sIntCallInputs.SetProperty("PropSet14", "");
                    sIntCallInputs.SetProperty("PropSet15", "");
                    sIntCallInputs.SetProperty("PropSet16", "");
                } else {
                    sIntCallInputs.SetProperty("Value", "VHANBNAddressMapManualNBNLocId");
                    sIntCallInputs.SetProperty("PropSet1", NBNLoc);
                    sIntCallInputs.SetProperty("PropSet2", "");
                    sIntCallInputs.SetProperty("PropSet3", "");
                    sIntCallInputs.SetProperty("PropSet4", "");
                    sIntCallInputs.SetProperty("PropSet5", "");
                    sIntCallInputs.SetProperty("PropSet6", "");
                    sIntCallInputs.SetProperty("PropSet7", "");
                    sIntCallInputs.SetProperty("PropSet8", "");
                    sIntCallInputs.SetProperty("PropSet9", "");
                    sIntCallInputs.SetProperty("PropSet10", "");
                    sIntCallInputs.SetProperty("PropSet11", "");
                    sIntCallInputs.SetProperty("PropSet12", "");
                    sIntCallInputs.SetProperty("PropSet13", "");
                    sIntCallInputs.SetProperty("PropSet14", "");
                    sIntCallInputs.SetProperty("PropSet15", "");
                    sIntCallInputs.SetProperty("PropSet16", "");
                }

               // sIntCallOutputs = ser.InvokeMethod("RunProcess", sIntCallInputs);
                //sIntCallOutputs = sInterfaceCallBS.InvokeMethod("GenericVBCCall", sIntCallInputs);
				
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
					//sIntCallInputs = SiebelApp.S_App.NewPropertySet();
                    sIntCallInputs.SetProperty("Service Name", "VHA Sales Calculator BS");
                    sIntCallInputs.SetProperty("Method Name", "VHAOneSQRESTAPI");
                    sIntCallInputs.SetProperty("PropSet27", scJson.QuoteHeader.SessionId);
                    sIntCallInputs.SetProperty("PropSet26", "Addr");					
                    sIntCallInputs.SetProperty("PropSet10", sResp.address.properties.street_number_1);					
                    sIntCallInputs.SetProperty("PropSet23", sResp.address.properties.address_identifier);					
                    sIntCallInputs.SetProperty("PropSet24", sResp.address.geometry.coordinates[1]);					
                    sIntCallInputs.SetProperty("PropSet25", sResp.address.geometry.coordinates[0]);	
					
                    var OutputsResp = ser.InvokeMethod("Run Process", sIntCallInputs);  
					console.log(OutputsResp);
					//OutputsResp.childArray[0].propArray.PriorityNetwork;
					//streetNumber + streetName +  streetType + state
					//OutputsResp.childArray[0].propArray.primaryAccessTechnology
					
					$('#vha-sc-nbn-pref-wholesal').val(OutputsResp.childArray[0].propArray.PriorityNetwork);
					
					$('#vha-sc-nbn-avail-on').val(OutputsResp.childArray[0].propArray.NBNwithAU);
					$('#vha-sc-nbn-new-Devcharge').val(OutputsResp.childArray[0].propArray.NBNCharge);					
					
					$('#vha-sc-nbn-tech-type').val(OutputsResp.childArray[0].propArray.AccessTech);
					$('.vha-sc-nbnloc-val').val(OutputsResp.childArray[0].propArray.LocID);
					$('#vha-sc-avail-wholesal').val(OutputsResp.childArray[0].propArray.NBNAvlWholeSaler);					
					$('.vha-sc-nbnaddr-val').val(OutputsResp.childArray[0].propArray.NBNAddress);

                var AddressList = sIntCallOutputs.GetChildByType("ResultSet")
                    .GetChildByType("NBNRespMsg")
                    .GetChildByType("ListOfVHA NBN Query Address Response IO")
                    .GetChildByType("ListOfInterface")
                    .GetChildByType("ListOfNBNAddressResponse")
                    .GetChildByType("NBNAddressResponse")
                    .GetChildByType("ListOfVHA NBN Query Address");
                AddressList = VHAAppUtilities.SiebelMessageToArray(AddressList);
                
				appendDialogTemplate();
				$(".VHADialogDataSection").html("");
				VHAAppUtilities.SetConstants("NBNAddressList", AddressList);

                var AddressListLen = AddressList.length;
                //VHAAppUtilities.HideSpinner();
				
				if (AddressListLen > 1) 
				{
					for (var i = 0; i < AddressListLen; i++) {
						var template = '<div class="VHAIDTypeLine VHAIDTypeLineSelect">\
						<div class="VHAIDType VHASelectNBNAddress" LOCID='+ AddressList[i]["NBN Location Id"] + '>' + getFullAddress(AddressList[i]) + '</div>\
						<div class="VHALineSpace"></div>\
						</div>';
						$(".VHADialogDataSection").append(template);
					}
					$("#openModal").removeClass("VHADisplayNone");
				}

                if (AddressListLen === 1) 
				{
					var NBNAddrCalc = getFullAddress(AddressList[0]);
					$(".vha-sc-nbnaddr-val").val(NBNAddrCalc);
					$(".vha-sc-nbnloc-val").val(AddressList[0]["NBN Location Id"]);
					updateSelectedNBNAddress(AddressList[0]["NBN Location Id"]);   
                }
				function getFullAddress(AddressList)
				{
					var NBNAddrCalc1Unit = "",
                    NBNAddrCalc2LOT = "",
                    NBNAddrCalc3Street = "",
                    NBNAddrCalc4Locality = "",
                    NBNAddrCalc5Level = "",
                    NBNAddrCalc6AddressSite = "",
                    NBNAddrCalc7ComplexRoad = "",
                    NBNAddrCalc8ComplexStreet = "",
                    NBNAddrCalc9ComplexBuilding = "",
                    NBNAddrCalc = "";
                    var pattern1 = "",
                    pattern2 = "",
                    pattern3 = "",
                    pattern4 = "";
                    var sUnit = "",
                    sLot = "",
                    sStreet = "",
                    sLocality = "",
                    sAddrSite = "",
                    sComplexRoad = "",
                    sComplexSt = "",
                    sComplexBldng = "",
                    sLevel = "";

                    var AddGeoCode = AddressList["Address Geography Code"] === undefined ? "" : AddressList["Address Geography Code"];
                    var AddrSiteBldgName = AddressList["Address Site Building Name"] === undefined ? "" : AddressList["Address Site Building Name"];
                    var Lat = AddressList["Latitude"] === undefined ? "" : AddressList["Latitude"];
                    var LevelNum = AddressList["Level Number"] === undefined ? "" : AddressList["Level Number"];
                    var LevelType = AddressList["Level Type"] === undefined ? "" : AddressList["Level Type"];
                    var LocSubName = AddressList["Locality Suburb Name"] === undefined ? "" : AddressList["Locality Suburb Name"];
                    var LocDesc = AddressList["Location Descriptor"] === undefined ? "" : AddressList["Location Descriptor"];
                    var Long = AddressList["Longitude"] === undefined ? "" : AddressList["Longitude"];
                    var LotNum = AddressList["Lot Number"] === undefined ? "" : AddressList["Lot Number"];
                    var NBNLocId = AddressList["NBN Location Id"] === undefined ? "" : AddressList["NBN Location Id"];
                    var PlanNum = AddressList["Plan Number"] === undefined ? "" : AddressList["Plan Number"];
                    var PostCode = AddressList["Post Code"] === undefined ? "" : AddressList["Post Code"];
                    var SecRoadName = AddressList["Secondary Road Name"] === undefined ? "" : AddressList["Secondary Road Name"];
                    var SecRoadNum1 = AddressList["Secondary Road Number1"] === undefined ? "" : AddressList["Secondary Road Number1"];
                    var SecRoadNum2 = AddressList["Secondary Road Number2"] === undefined ? "" : AddressList["Secondary Road Number2"];
                    var SecRoadSuffCode = AddressList["Secondary Road Suffix Code"] === undefined ? "" : AddressList["Secondary Road Suffix Code"];
                    var SecRoadTypeCode = AddressList["Secondary Road Type Code"] === undefined ? "" : AddressList["Secondary Road Type Code"];
                    var SecSiteBldgName = AddressList["Secondary Site Building Name"] === undefined ? "" : AddressList["Secondary Site Building Name"];
                    var StateTerritoryCode = AddressList["State Territory Code"] === undefined ? "" : AddressList["State Territory Code"];
                    var StRoadName = AddressList["Street Road Name"] === undefined ? "" : AddressList["Street Road Name"];
                    var StRoadNum1 = AddressList["Street Road Number1"] === undefined ? "" : AddressList["Street Road Number1"];
                    var StRoadNum2 = AddressList["Street Road Number2"] === undefined ? "" : AddressList["Street Road Number2"];
                    var StRoadTypeCode = AddressList["Street Road Type Code"] === undefined ? "" : AddressList["Street Road Type Code"];
                    var StRoadTypeSuffCode = AddressList["Street Road Type Suffix Code"] === undefined ? "" : AddressList["Street Road Type Suffix Code"];
                    var UnitNum = AddressList["Unit Number"] === undefined ? "" : AddressList["Unit Number"];
                    var UnitType = AddressList["Unit Type"] === undefined ? "" : AddressList["Unit Type"];

                    NBNAddrCalc1Unit = (UnitType == "") ? ((UnitNum == "") ? "" : UnitNum + ",") : ((UnitNum == "") ? UnitType + "," : UnitType + " " + UnitNum + ",");
                    NBNAddrCalc2LOT = (LotNum == "") ? "" : "LOT " + LotNum + ",";
                    NBNAddrCalc3Street = (StRoadNum1 == "") ? ((StRoadNum2 == "") ? ((StRoadName == "") ? ((StRoadTypeCode == "") ? "" : StRoadTypeCode + ",") : StRoadName + " " + StRoadTypeCode + ",") : ((StRoadName == "") ? ((StRoadTypeCode == "") ? StRoadNum2 + "," : StRoadNum2 + " " + StRoadTypeCode + ",") : StRoadNum2 + " " + StRoadName + " " + StRoadTypeCode + ",")) : ((StRoadNum2 == "") ? ((StRoadName == "") ? ((StRoadTypeCode == "") ? "" : StRoadNum1 + " " + StRoadTypeCode + ",") : StRoadNum1 + " " + StRoadName + " " + StRoadTypeCode + ",") : ((StRoadName == "") ? ((StRoadTypeCode == "") ? StRoadNum1 + "-" + StRoadNum2 + "," : StRoadNum1 + "-" + StRoadNum2 + " " + StRoadTypeCode + ",") : StRoadNum1 + "-" + StRoadNum2 + " " + StRoadName + " " + StRoadTypeCode + ","));
                    NBNAddrCalc4Locality = (LocSubName == "") ? ((StateTerritoryCode == "") ? ((PostCode == "") ? "" : PostCode) : StateTerritoryCode + " " + PostCode) : ((StateTerritoryCode == "") ? ((PostCode == "") ? LocSubName : LocSubName + " " + PostCode) : LocSubName + " " + StateTerritoryCode + " " + PostCode);
                    NBNAddrCalc5Level = (LevelType == "") ? ((LevelNum == "") ? "" : LevelNum) : ((LevelNum == "") ? LevelType : LevelType + " " + LevelNum);
                    NBNAddrCalc6AddressSite = (AddrSiteBldgName == "") ? "" : AddrSiteBldgName;
                    NBNAddrCalc7ComplexRoad = (SecRoadNum1 == "") ? ((SecRoadNum2 == "") ? "" : SecRoadNum2 + ",") : ((SecRoadNum2 == "") ? SecRoadNum1 + "," : SecRoadNum1 + "-" + SecRoadNum2 + ",");
                    NBNAddrCalc8ComplexStreet = (SecRoadName == "") ? ((SecRoadTypeCode == "") ? "" : SecRoadTypeCode + ",") : ((SecRoadTypeCode == "") ? SecRoadName + "," : SecRoadName + " " + SecRoadTypeCode + ",");
                    NBNAddrCalc9ComplexBuilding = (SecSiteBldgName == "") ? "" : SecSiteBldgName;

                    NBNAddrCalc = NBNAddrCalc1Unit + " " +
                        NBNAddrCalc2LOT + " " +
                        NBNAddrCalc3Street + " " +
                        NBNAddrCalc4Locality + " " +
                        NBNAddrCalc6AddressSite + " " +
                        NBNAddrCalc7ComplexRoad + " " +
                        NBNAddrCalc8ComplexStreet + " " +
                        NBNAddrCalc9ComplexBuilding + " (" +
                        NBNAddrCalc5Level + ") ";

                    //Regular expression patterns
                    //pattern1 = /,\s+/g; //semicolon with space
                    pattern2 = /[(][)]/g; //for the pattern in case o flevel (;)
                    pattern3 = /\s*$/g; //Regular Expression for trailing spaces
                    pattern4 = /^\s*/g; //Regular Expression for leading spaces
                    pattern5 = /\s\s+/g; //Regular Expresion for double spaces

                    //Replacing the patterns with required values
                    //NBNAddrCalc = NBNAddrCalc.replace(pattern1," ");
                    NBNAddrCalc = NBNAddrCalc.replace(pattern2, "");
                    NBNAddrCalc = NBNAddrCalc.replace(pattern3, "");
                    NBNAddrCalc = NBNAddrCalc.replace(pattern4, "");
                    NBNAddrCalc = NBNAddrCalc.replace(pattern5, " ");
					
					return(NBNAddrCalc);
				}
				function appendDialogTemplate() {
					var Template = '<div id = "openModal" class = "modalDialog VHADisplayNone">\
						<div>\
							<div id = "VHAPrimaryIDTypesIDDetails">\
							<span class="VHAPopupClose">X</span>\
								<div class="VHADialogSectionHeader">\
									<h2 class="VHAIDPopUpHeader"> Confirm Address </h2>\
								</div>\
								<div class="VHADialogDataSection">\
								</div>\
								<div class="VHADialogButtonBar">\
									<div class="VHAAlertOKBtn VHANBNAddressDialogueClose appletButton">Close</div>\
								</div>\
							</div>\
						</div>\
					</div>';

					$("#openModal").remove();
					$('body').append(Template);
					//Below events are added here because they do not work when added as part of the bindevents function
					$("#openModal").delegate(".VHAPopupClose,.VHANBNAddressDialogueClose", "click", {}, function (e) {
						$("#openModal").remove();
					});
					$("#openModal").delegate(".VHASelectNBNAddress", "click", { ctx: this }, processSelectNBNAddressSelect);
				}
				
				function processSelectNBNAddressSelect(e) {
					
					$(".vha-sc-nbnaddr-val").val($(".VHASelectNBNAddress").text());
					 $(".vha-sc-nbnloc-val").val($(this).attr("locid"));
					updateSelectedNBNAddress($(this).attr("locid"));
					
				}
				
				function updateSelectedNBNAddress(SelectedLOCId) {

					var Input = SiebelApp.S_App.NewPropertySet();
                    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                    Input.SetProperty("Service Name", "VHA Sales Calculator BS");
                    Input.SetProperty("Method Name", "NBNSiteQualification");
                    Input.SetProperty("SessionId", scJson.QuoteHeader.SessionId);
                    Input.SetProperty("Id", SelectedLOCId);
                    var Outputs = ser.InvokeMethod("Run Process", Input);
                    var resultset = Outputs.GetChildByType("ResultSet");
                    var CustNBN = resultset['propArray']['CustNBN'];
                    var AccessTech = resultset['propArray']['AccessTech'];
                    var NBNAU = resultset['propArray']['NBNwithAU'];
					var NBNTypeDesc = resultset['propArray']['NBNTypeDesc'];
					
					$("#vha-sc-get-nbn-new").val(CustNBN);
                    $("#vha-sc-nbn-with-vodafone").val(NBNAU);
                    $("#vha-sc-nbn-tech-type").val(AccessTech);
                    $("#vha-sc-nbn-tech-descrip").text(NBNTypeDesc);
                    $(".vha-sc-nbn-tech-descrip").addClass("vha-sc-gf-grey-accordion");
					
					$("#openModal").remove();

                    /*var dgetnbnVal = CustNBN == "Yes" ? true : false;
                    if (dgetnbnVal == false)
                        $('#vha-sc-getnbn .vha-sc-coverageStatus').addClass("CSRed");
                    else
                        $('#vha-sc-getnbn .vha-sc-coverageStatus').addClass("CSGreen");

                    var dnbnavlVal = NBNAU == "Yes" ? true : false;
                    if (dnbnavlVal == false)
                        $('#vha-sc-nbnavl .vha-sc-coverageStatus').addClass("CSRed");
                    else
                        $('#vha-sc-nbnavl .vha-sc-coverageStatus').addClass("CSGreen");

                    var dnbnfibVal = AccessTech == "Fibre" ? true : false;
                    if (dnbnfibVal == false)
                        $('#vha-sc-nbnfib .vha-sc-coverageStatus').addClass("CSRed");
                    else
                        $('#vha-sc-nbnfib .vha-sc-coverageStatus').addClass("CSGreen");
					$("#openModal").remove();*/
				}
				
            } //end function Vasavi added for nbn Address
            function mSetPrflAttr(name, val) {
                var Inputs = SiebelApp.S_App.NewPropertySet();
                var Output = SiebelApp.S_App.NewPropertySet();
                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                Inputs.SetProperty("Service Name", "SIS OM PMT Service");
                Inputs.SetProperty("Method Name", "Set Profile Attribute");
                Inputs.SetProperty("Profile Attribute Name", name);
                Inputs.SetProperty("Profile Attribute Value", val);
                var Output = ser.InvokeMethod("Run Process", Inputs);
            }

            function nullifyVar() {
                secondaryresponse = "";
                accessoryresponse = "";
				sSession = "";
            }
            function bundleSave() {
                var PlanList = "";
                //reset
                scJson.QuoteHeader.RootItem.forEach(function (ritem) {
                    ritem.BonusItem = ritem.BonusItem.filter(function (item) {
                        return item.UI_Type != "BundleSave";
                    });
                });

                /*if (scJson.QuoteHeader.CustomerType == "Existing") {
                    var AssetDetails = VHAAppUtilities.SiebelMessageToArray(ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0]);
                    var AssetLen = AssetDetails.length;
                    if (AssetDetails.length > 0) {
                        for (i = 0; i < AssetDetails.length; i++) {
                            var RatePlanDetails = VHAAppUtilities.SiebelMessageToArray(ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0].childArray[i].childArray[1]);
                            if (RatePlanDetails.length > 0) {
                                var sAssetId = AssetDetails[i]["AssetId"];
                                var sRatePlan = RatePlanDetails[0]["Plan"];
                                var sCode = RatePlanDetails[0]["Code"];
                                var sRatePrice = RatePlanDetails[0]["Price"];
                                if (PlanList == "")
                                    PlanList = PlanList + sAssetId + "|" + sRatePlan + "|" + sCode + "|" + sRatePrice;
                                else
                                    PlanList = PlanList + "," + sAssetId + "|" + sRatePlan + "|" + sCode + "|" + sRatePrice;
                            }
                        }
                    }
                }*/
				var UpgradedAsset = [];
                scJson.QuoteHeader.RootItem.forEach(function (item) {
                    var nplan = item.PlanItem;
					if (item.SrvType == "Upgrade Service") {
						if (scJson.QuoteHeader.CustomerType == "Existing") {
							var AssetDetails = VHAAppUtilities.SiebelMessageToArray(ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0]);
							var AssetLen = AssetDetails.length;
							if (AssetDetails.length > 0) {
								for (i = 0; i < AssetDetails.length; i++) {
									var RatePlanDetails = VHAAppUtilities.SiebelMessageToArray(ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0].childArray[i].childArray[1]);
									if (RatePlanDetails.length > 0) {
										var sAssetId = AssetDetails[i]["AssetId"];
										var sRatePlan = RatePlanDetails[0]["Plan"];
										var sCode = RatePlanDetails[0]["Code"];
										var sRatePrice = RatePlanDetails[0]["Price"];
										if(sAssetId == item.AssetId){
											if (PlanList == ""){
												PlanList = PlanList + sAssetId + "|" + nplan.Name + "|" + nplan.Code + "|" + nplan.Price;
											}
											else{
												PlanList = PlanList + "," + sAssetId + "|" + nplan.Name + "|" + nplan.Code + "|" + nplan.Price;
											}
											UpgradedAsset.push(sAssetId);
										}
									}
								}
							}
						}
					} 
					if (item.SrvType == "New Service") {                        
                        if (PlanList == "")
                            PlanList = PlanList + item.Id + "|" + nplan.Name + "|" + nplan.Code + "|" + nplan.Price;
                        else
                            PlanList = PlanList + "," + item.Id + "|" + nplan.Name + "|" + nplan.Code + "|" + nplan.Price;
                    }
                });
				
				if (scJson.QuoteHeader.CustomerType == "Existing") {
                    var AssetDetails = VHAAppUtilities.SiebelMessageToArray(ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0]);
                    var AssetLen = AssetDetails.length;
                    if (AssetDetails.length > 0) {
                        for (i = 0; i < AssetDetails.length; i++) {
                            var RatePlanDetails = VHAAppUtilities.SiebelMessageToArray(ExtCustSiebelMessage.childArray[0].childArray[0].childArray[0].childArray[i].childArray[1]);
                            if (RatePlanDetails.length > 0) {
                                var sAssetId = AssetDetails[i]["AssetId"];
                                var sRatePlan = RatePlanDetails[0]["Plan"];
                                var sCode = RatePlanDetails[0]["Code"];
                                var sRatePrice = RatePlanDetails[0]["Price"];
                                if(!UpgradedAsset.includes(sAssetId)){
									if (PlanList == "")
										PlanList = PlanList + sAssetId + "|" + sRatePlan + "|" + sCode + "|" + sRatePrice;
									else
										PlanList = PlanList + "," + sAssetId + "|" + sRatePlan + "|" + sCode + "|" + sRatePrice;
								}
                            }
                        }
                    }
                }
				
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VHA Sales Calculator Shop Now Wrapper Workflow");
                //Inputs.SetProperty("UpgradeOfferType", currentRLI.UpgradeOfferType);
                Inputs.SetProperty("CartRefresh", "Y");
                Inputs.SetProperty("Object Id", scJson.QuoteHeader.QuoteId);
                Inputs.SetProperty("Scenario", "BundleSave");
                Inputs.SetProperty("PlanList", PlanList);
                /*Inputs.SetProperty("DealerRowId", SiebelApp.S_App.GetUserName());
                var dvcObj = currentRLI.DeviceItem.filter(function (item) {
                return item.Action === "Add";
                });
                if (dvcObj.length > 0) {
                Inputs.SetProperty("DeviceCode", dvcObj[0].Item__Code);
                Inputs.SetProperty("DeviceContract", dvcObj[0].Term);
                } else {
                Inputs.SetProperty("DeviceCode", "");
                Inputs.SetProperty("DeviceContract", "");
                }*/
                console.log("BundleSave Inputs below");
                console.log(Inputs);
                var Output = ser.InvokeMethod("RunProcess", Inputs);
                console.log("BundleSave output below");
                console.log(Output);
                if (Output.GetChildByType("ResultSet")) {
                    var sPropArray = Output.GetChildByType("ResultSet").propArray;
                    if (sPropArray.BundleSave != "" && sPropArray.BundleSavePercent != "" && sPropArray.BundleSavePercent > 0) {
                        var bsItem = sPropArray.BundleSave.split(',');
                        bsItem.forEach(function (item) {
                            var itemsflds = item.split('|');
                            scJson.QuoteHeader.RootItem.forEach(function (ritem) {
                                if (itemsflds[0] == ritem.AssetId || itemsflds[0] == ritem.Id) {
                                    var a = {};
                                    a.Action = "Add";
                                    a.Type = "Bonus";
                                    a.Period = "every month";
                                    a.Price = itemsflds[1];
                                    a.Name = sPropArray.BundleSavePercent + "% Bundle & Save";
                                    a.UI_Type = "BundleSave";
                                    ritem.BonusItem.push(a);
                                }
                            });
                        });
                    }
                    console.log(sPropArray);
                }
            }

            function nbaOfferRetrive() {
                var sContext = "Default";
                var StrSystemCtxt = "Campaigns_tab";
                var StrBusSub = "Subscriber";
                sAssetId = currentRLI.AssetId;
				//"2-CKJSOLS";
                //bcInstalledAsset.GetFieldValue("Primary MSISDN Id");
                sBANumber = scJson.QuoteHeader.ExistingCustDtls.BillingAccountNo;
				//"7290160843";
                //bcInstalledAsset.GetFieldValue("Billing Account Number");

                sMSISDN = currentRLI.MSISDN;
                //bcAsset.GetFieldValue("Asset Number");

                //var StrReqChan = mComputeRequestChannel();
                //var strUserType = CheckResp();

                var StrReqChan = "Call Centre";
                var strUserType = "VF NBA Contact Centre";

                var StrUserID = SiebelApp.S_App.GetProfileAttr("Login Name");
                //TheApplication().LoginName();
                var AutoRetrival = "AUTO";
                //TheApplication().InvokeMethod("LookupValue", "VHA_NBA_AUTO_RET_CONF", "AUTO");

                var sSearch = '[BillingAccountNumber] = "' + sBANumber + '"';
				sSearch = sSearch + ' AND [MSISDN] = "' + sMSISDN + '"';
				sSearch = sSearch + ' AND [Search] = "true"';
				sSearch = sSearch + ' AND [Context_1] = "' + sContext + '"';
				sSearch = sSearch + ' AND [Context_2] = "' + sContext + '"';
				sSearch = sSearch + ' AND [Context_3] = "' + sContext + '"';
				sSearch = sSearch + ' AND [UserType] = "' + strUserType + '"';
				sSearch = sSearch + ' AND [SystemContext] = "' + StrSystemCtxt + '"';
				sSearch = sSearch + ' AND [RequestChannel] = "' + StrReqChan + '"';
				sSearch = sSearch + ' AND [BusinessSubject] = "' + StrBusSub + '"';
				sSearch = sSearch + ' AND [UserId] = "' + StrUserID + '"';
				sSearch = sSearch + ' AND [RetrieveType] = "' + AutoRetrival + '"';

                var Inputs = SiebelApp.S_App.NewPropertySet();
                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                Inputs.SetProperty("Service Name", "VF Generic VBC Service");
                Inputs.SetProperty("Method Name", "QueryNBAOffer");
                Inputs.SetProperty("search-string", sSearch);
                Inputs.SetProperty("Business Component Name", "VF Current NBA Offer VBC");
                var Output = ser.InvokeMethod("Run Process", Inputs);
                var resultset = Output.GetChildByType("ResultSet");
                if (resultset) {
                    var SiebMsg = resultset.childArray[0].GetChildByType("SiebelMessage");
                    if (SiebMsg) {
                        if (SiebMsg.childArray.length > 0) {
                            var LofNBAOffer = resultset.childArray[0].GetChildByType("SiebelMessage").childArray[0];
                            var offerLen = LofNBAOffer.childArray.length;
                            if (offerLen > 0) {
                                var offer = LofNBAOffer.childArray;
                                nbaOfferdiv();
                                var offerData = [];
                                for (var j = 0; j < offerLen; j++) {
                                    var item = {};
                                    item.OfferName = offer[j].propArray["OfferName"];
                                    item.OfferType = offer[j].propArray["OfferType"];
                                    item.OfferExpiryDate = offer[j].propArray["OfferExpiryDate"];
                                    item.OfferReason = offer[j].propArray["OfferReason"];
                                    item.OfferLongDescription = offer[j].propArray["OfferLongDescription"];
                                    item.OfferShortDescription = offer[j].propArray["OfferShortDescription"];
                                    offerData.push(item);
                                }
                                console.log(offerData);
                                $("#nbajqGrid").jqGrid({
                                    datatype: "local",
                                    data: offerData,
                                    colNames: ['Offer Name', 'Type', 'Expiry', 'Reason', 'Description', 'Summary'],
                                    colModel: [{
                                            name: 'OfferName',
                                            index: 'OfferName',
                                            width: 150
                                        }, {
                                            name: 'OfferType',
                                            index: 'OfferType',
                                            width: 100
                                        }, {
                                            name: 'OfferExpiryDate',
                                            index: 'OfferExpiryDate',
                                            width: 100
                                        }, {
                                            name: 'OfferReason',
                                            index: 'OfferReason',
                                            width: 200,
                                            cellattr: function (rowId, val, rawObject, cm, rdata) {
                                                return 'style="white-space: normal;"'; // Enable text wrapping
                                            }
                                        }, {
                                            name: 'OfferLongDescription',
                                            index: 'OfferLongDescription',
                                            width: 300,
                                            cellattr: function (rowId, val, rawObject, cm, rdata) {
                                                return 'style="white-space: normal;"'; // Enable text wrapping
                                            }
                                        }, {
                                            name: 'OfferShortDescription',
                                            index: 'OfferShortDescription',
                                            width: 150,
                                            cellattr: function (rowId, val, rawObject, cm, rdata) {
                                                return 'style="white-space: normal;"'; // Enable text wrapping
                                            }
                                        },
                                        // Add more columns as needed
                                    ],
                                    rowNum: 10,
                                    //rowList: [10, 20, 30],
                                    //pager: "#nbajqGridPager",
                                    //gridview: true,
                                    viewrecords: true,
									height: 'auto',
									scroll: 1, // Enable vertical scrolling
									scrollrows: true // Highlight the row when scrolling
                                });
                                $("#nbagridContainer").dialog("open");
                            }else{
							alert("No NBA Offers available !");
						}
                        }else{
							alert("No NBA Offers available !");
						}
                    }
                }
            }
            return VHASalesCalculatorViewPR
        }
            ());
        return "SiebelAppFacade.VHASalesCalculatorViewPR"
    })
};
