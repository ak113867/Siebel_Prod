if (typeof VHABTProcessCall === "undefined") {
    var VHABTProcessCall = {};
    //console.log("loaded VHABTProcessCall");

    var jsBT = ["https://js.braintreegateway.com/web/[VER]/js/client.min.js", "https://js.braintreegateway.com/web/[VER]/js/hosted-fields.min.js", "https://js.braintreegateway.com/web/[VER]/js/data-collector.min.js"];

    if (!VHAAppUtilities.GetConstants("BTVersion")) {
        VHAAppUtilities.SetConstants("BTVersion", VHAAppUtilities.GetPickListValues("", "[List Of Values.Type] = 'VF_PCI_INIT_SETTINGS' AND [List Of Values.Active] = 'Y' " + "AND [List Of Values.Name] = 'BTINITExpiry'", {
                All: true
            })[0].High);
    }
    jsBT = jsBT.map(x => x.replace('[VER]', VHAAppUtilities.GetConstants("BTVersion")));
    console.log(jsBT);
    var cardsAccepted = ['visa', 'master-card', 'american-express', ];
    var cardsAcceptedflg = false;
    var deviceData = "";
    var custId = "";
    var OrderNum = "";

    function VFBTFormConstruct() {
        return '<div class="bootstrap-basic" id="BrainTreeDiv" style="display: none;">\
        <!--form class="needs-validation" novalidate="" action="/checkout" id="hosted-fields-form" method="post"-->\
        <form class="needs-validation" novalidate="" id="hosted-fields-form">\
        <div class="row">\
        <div class="col-sm-6 mb-3">\
        <label for="cc-name">Name on Card\
        </label>\
        <div class="form-control" id="cc-name">\
        </div>\
        <div class="notice_container">\
        </div>\
        </div>\
        </div>\
        <div class="row">\
        <div class="col-sm-6 mb-3">\
        <label for="cc-number">Card Number\
        </label>\
        <div class="form-control" id="cc-number">\
        </div>\
        <div class="notice_container">\
        </div>\
        <div class="surcharge_container">\
        </div>\
        </div>\
        </div>\
        <div class="row icon-credit-card__container">\
        <div id="visa-img" class="icon-credit-card visa"></div>\
        <div id="master-card-img" class="icon-credit-card master-card"></div>\
        <div id="american-express-img" class="icon-credit-card american-express"></div>\
        </div>\
        <div class="row">\
        <div class="col-sm-2 mb-3">\
        <label for="cc-expiration">Expiry\
        </label>\
        <div class="form-control" id="cc-expiration">\
        </div>\
        <div class="notice_container">\
        </div>\
        </div>\
        <div class="col-sm-2 mb-3">\
        <label for="cc-expiration">CVV\
        </label>\
        <div class="form-control" id="cc-cvv">\
        </div>\
        <div class="notice_container">\
        </div>\
        <div id="ccv-msg-cnt"><small style="font-size: 10px;" id="cvv-message">The last 3 digits on the back of your card</small></div>\
        </div>\
        </div>\
        <hr class="mb-4">\
        <div>\
        <button class="VFBTSubmit appletButton siebui-ctrl-btn" type="submit">Submit\
        </button>\
        <button class="VFBTCancel appletButton siebui-ctrl-btn" type="button">Cancel\
        </button>\
        </div>\
        </form>\
        </div>'
    }

    // RECURSIVE LOAD SCRIPTS
    function load_scripts(final_callback, index = 0) {
        if (typeof jsBT[index + 1] === "undefined") {
            load_script(jsBT[index], final_callback);
        } else {
            load_script(jsBT[index], function () {
                load_scripts(final_callback, index + 1);
            });
        }
    }
    // LOAD SCRIPT
    function load_script(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) // IE
        {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else // Others
        {
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
        console.log("javascript included: " + url);
    }

    function hostFields(e, authTokenBT, tokenBCId, custRId, OrderId) {
        var pm = e;
        custId = custRId;
        OrderNum = OrderId;
        $('#cc-cvv').append('<span id="help-img" class="help-img"> </span>');
        //console.log("authTokenBT:-" + authTokenBT + ";; custRId:-" + custRId);
        if (SiebelApp.S_App.GetActiveView().GetName() == "VHA ToT Common View") {
            $('#cc-expiration').css("width", "50%");
            $('#cc-cvv').css("width", "50%");
            $('#cc-cvv .help-img').css("right", "40%");
        }
        braintree.client.create({
            authorization: authTokenBT //'sandbox_csrfmrws_3278m9j4r98gcp9m'; 'sandbox_24rwyyx2_snp92sxn2cm2h22j'
        }, function (err, clientInstance) {
            if (err) {
                alert(err.message);
                return;
            }
            braintree.dataCollector.create({
                client: clientInstance
            }, function (err, dataCollectorInstance) {
                if (err) {
                    alert(err.message);
                    return;
                }
                deviceData = dataCollectorInstance.deviceData;
                console.log("deviceData:-" + deviceData);
            });

            braintree.hostedFields.create({
                client: clientInstance,
                styles: {
                    input: {
                        'font-size': '1rem',
                        color: '#495057',
                        position: 'unset'
                    }
                },
                fields: {
                    cardholderName: {
                        selector: '#cc-name'
                    },
                    number: {
                        selector: '#cc-number',
                        supportedCardBrands: {}
                    },
                    cvv: {
                        selector: '#cc-cvv'
                    },
                    expirationDate: {
                        selector: '#cc-expiration',
                        placeholder: 'MM / YY'
                    }
                }
            }, function (err, hostedFieldsInstance) {
                if (err) {
                    console.error(err);
                    return;
                }

                hostedFieldsInstance.on('binAvailable', function (event) {
                    if (cardsAcceptedflg == true) {
                        console.log("Bin:-" + event.bin);
                        var Inps = SiebelApp.S_App.NewPropertySet();
                        var Outs = SiebelApp.S_App.NewPropertySet();
                        var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                        Inps.SetProperty("Service Name", "VHA Upgrade Utilities BS");
                        Inps.SetProperty("Method Name", "GetSurCharge");
                        Inps.SetProperty("CCTokenNumber", event.bin);
                        Outs = ser.InvokeMethod("Run Process", Inps);
                        var resultSet = Outs.GetChildByType("ResultSet");
                        var surcharge = resultSet.GetProperty("SurchargeRate");
                        var brand = resultSet.GetProperty("Brand");
                        var cardType = resultSet.GetProperty("CardType") || "";
                        $('.surcharge_container')[0].innerHTML = surchargeContainer(brand + " surcharge of " + surcharge + "% (plus GST) applies");
                    }
                });

                hostedFieldsInstance.on('validityChange', function (event) {
                    var field = event.fields[event.emittedBy];
                    // Remove any previously applied error or warning classes
                    $(field.container).removeClass('bt-fld-valid');
                    $(field.container).removeClass('bt-fld-invalid');
                    if (field.container.nextElementSibling.firstElementChild != null)
                        field.container.nextElementSibling.removeChild(field.container.nextElementSibling.firstElementChild);
                });
                hostedFieldsInstance.getSupportedCardTypes().then(function (cardTypes) {
                    console.log(cardTypes); // ['Visa', 'American Express', 'Mastercard']
                });
                hostedFieldsInstance.on('cardTypeChange', function (event) {
                    cardsAcceptedflg = false; //reset
                    var card = event.cards[0];
                    var fld = event.fields[event.emittedBy];
                    if (event.cards.length === 1) {
                        deactivateCreditCardImages();
                        $("#" + card.type + "-img").addClass("active");
                    } else {
                        deactivateCreditCardImages();
                    }
                    if (event.emittedBy == "number" && fld.isEmpty == false) {
                        jQuery.each(event.cards, function (index, cards) {
                            if (cards.supported == true) {
                                cardsAcceptedflg = true;
                            }
                        });
                        if (cardsAcceptedflg == false) {
                            fld.container["nextElementSibling"].innerHTML = noticeContainer("We only accept Visa, Mastercard and American Express. Please check your number and try again.");
                        } else {
                            /*if(fld.container.nextElementSibling.firstElementChild!=null)
                            fld.container.nextElementSibling.removeChild(fld.container.nextElementSibling.firstElementChild);*/
                            fld.container["nextElementSibling"].innerHTML = "";
                            $('.surcharge_container')[0].innerHTML = "";
                        }
                    } else {
                        fld.container["nextElementSibling"].innerHTML = "";
                        $('.surcharge_container')[0].innerHTML = "";
                    }
                    if (card.type == 'american-express') {
                        $("#cvv-message").text("The 4 digits on the front of your card");
                        $("#help-img").addClass("help-img--amex");
                    } else {
                        $("#cvv-message").text("The last 3 digits on the back of your card");
                        $("#help-img").removeClass("help-img--amex");
                    }
                });

                function deactivateCreditCardImages() {
                    jQuery.each(cardsAccepted, function (index, card) {
                        $("#" + card + "-img").removeClass("active")
                    });
                }

                function noticeContainer(message) {
                    return '<div id="credit-card-notice">\
                    <div class="bt-alert-icon"></div>\
                    <p class="bt-alert-message" id="bt-alert-message">' + message + '</p>\
                    </div>';
                }

                function surchargeContainer(message) {
                    return '<div id="credit-card-surcharge">\
                    <div class="bt-alert-icon"></div>\
                    <p class="bt-alert-message bt-alert-message-sr" id="bt-alert-message">' + message + '</p>\
                    </div>';
                }

                var form = document.querySelector('#hosted-fields-form');
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    $("#maskoverlay").styleShow();
                    //console.log("BT Submittted Initiated:");
                    var formIsInvalid = false;
                    var state = hostedFieldsInstance.getState();
                    Object.keys(state.fields).forEach(function (field) {
                        console.log(state.fields[field]);
                        if (!state.fields[field].isValid) {
                            formIsInvalid = true;
                            $(state.fields[field].container).addClass('bt-fld-invalid');
                            state.fields[field].container["nextElementSibling"].innerHTML = noticeContainer("Incomplete or invalid entry");
                        }
                    });
                    //console.log(formIsInvalid);
                    if (formIsInvalid) {
                        // skip tokenization request if any fields are invalid
                        //console.log("skip tokenization request");
                        return;
                    }
                    hostedFieldsInstance.tokenize(function (err, payload) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        //console.log("tokenize" + "-" + payload.nonce);
                        BTPostProcess(tokenBCId, payload.nonce);
                    });
                });

                function postTokenizeUIchanges() {
                    //("VF Credit Card List Applet - Australia")
                    var CreditCardApplet = SiebelApp.S_App.GetActiveView().GetActiveApplet();
                    var CCApm = CreditCardApplet.GetPModel();
                    var CCAppId = CCApm.Get("GetFullId");
                    $("#BrainTreeDiv").remove();
                    $("#s_" + CCAppId + "_div div.AppletHIFormBorder div").show();
                }
            });
            $("#maskoverlay").styleHide();
        });
        if (pm != "") {
            $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFBTCancel", "click", {
                ctx: this
            }, ExitBTframe);
        }
    }

    function ExitBTframe() {
        var CreditCardApplet = SiebelApp.S_App.GetActiveView().GetActiveApplet();
        var CCApm = CreditCardApplet.GetPModel();
        var CCAppId = CCApm.Get("GetFullId");
        switch (CreditCardApplet.GetName()) {
        case "VF Credit Card List Applet - Australia":
        case "CUT Credit Card Payment Form Applet":
        case "VHA Com Invoice Profile Toggle Form Applet TBUI Credit":
        case "VHA Kogan Com Invoice Profile Toggle Form Applet TBUI Credit":
            $("#s_" + CCAppId + "_div div.AppletHIFormBorder div").show();
            break;
        case "VF UNISIM Credit Card Recharge Applet TBUI":
        case "VHA Prepayment Native Credit Card Details Applet":
        case "VHA Prepayment Credit Card Details Applet":
		case "VF R&C Prepayment Credit Card Details Applet":
            $("#s_" + CCAppId + "_div div.siebui-collapsible-applet-header").show();
            $("#s_" + CCAppId + "_div div.AppletHIListBorder.siebui-collapsible-applet-content").show();
            break;
        default:
            if (SiebelApp.S_App.GetActiveView().GetName() == "VHA ToT Common View") {
                $('.credit-debit').removeClass("VFDisplayNone");
            }
            break;
        }
        $("#BrainTreeDiv").remove();
    }

    function BTPostProcess(tokenBCId, nonce) {
        console.log("Caught tokenBCId:- " + tokenBCId);
        console.log("Caught nonce:- " + nonce);
        var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
        switch (ActiveView) {
        case ("VF Connection View - Billing Detail"):
            var CompName = "VF Com Invoice Profile Form Toggle Applet - Connection - AU";
            var CompName2 = "VF Com Invoice Profile Form Toggle Applet - Connection - AU";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VF Connection Wizard View - Billing Detail - TBUI"):
        case ("VF Billing Details View - TBUI"):
            var OrgName = SiebelApp.S_App.GetProfileAttr("VHANewOrg");
            if (OrgName == "Kogan") {
                var CompName = "VHA Kogan Com Invoice Profile Toggle Form Applet TBUI Credit";
                var CompName2 = "VHA Kogan Com Invoice Profile Toggle Form Applet TBUI Credit";
                BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce)
            } else {
                var CompName = "VHA Com Invoice Profile Toggle Form Applet TBUI Credit";
                var CompName2 = "VHA Com Invoice Profile Toggle Form Applet TBUI Credit";
                BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce)
            }
            break;
        case ("VF Billing Account Profile View - Extended"):
            var CompName = "CUT Credit Card Payment Form Applet";
            var CompName2 = "CUT Credit Card Payment Form Applet";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VF Credit Card View - AU"):
            var CompName = "VF Credit Card List Applet - Australia";
            var CompName2 = "VF Credit Card List Applet - Australia";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VF SUI Billing Prepay Credit Card Detail View"):
            var CompName = "VF SUI Credit Card List Applet - Australia";
            var CompName2 = "VF SUI Credit Card List Applet - Australia";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VF Billing Account Profile View"):
            var CompName = "CUT Credit Card Payment Form Applet";
            var CompName2 = "CUT Credit Card Payment Form Applet";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VF SUI Billing Postpay Billing Profile Detail View"):
            var CompName = "VF Com Invoice Profile Form Toggle Applet - Personal AU";
            var CompName2 = "VF Com Invoice Profile Form Toggle Applet - Personal AU";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VF My Requested Service Request List View"):
        case ("VF My Service Request List View"):
        case ("VF Detail Service Request List View"):
        case ("VF Admin Service Request List View"):
        case ("VF Personal Service Request List View"):
        case ("VF All Service Request List View"):
            var CompName = "VF Credit Card Refund Form Applet";
            var CompName2 = "VF Credit Card Refund Form Applet";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VHA Service Request New UI View"):
            var CompName = "VHA Credit Card SR New View Applet";
            var CompName2 = "VHA Credit Card SR New View Applet";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VF UNISIM Capture Identification TBUI View"):
            var CompName = "VF UNISIM Capture ID Credit Card Details Applet";
            var CompName2 = "VF UNISIM Capture ID Credit Card Details Applet";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VF UNISIM Setup Recharge TBUI View"):
            var CompName = "VF UNISIM Credit Card Recharge Applet TBUI";
            var CompName2 = "VF UNISIM Credit Card Recharge Applet TBUI";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VF Connection View - Customer Detail"):
            var CompName = "VF UNISIM Capture ID Core - Credit Card Details Applet";
            var CompName2 = "VF UNISIM Capture ID Core - Credit Card Details Applet";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VHA Prepayment Processing View"):
        case ("VHA APP Prepayment Processing View"):
        case ("VHA Prepayment 2 Way SMS Processing View"):
        case ("VHA APP Prepayment 2 Way SMS Processing View"):
            var CompName = "VHA Prepayment Credit Card Details Applet";
            var CompName2 = "VHA Prepayment Credit Card Details Applet";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VHA Prepayment 2 Way SMS Native Processing View"):
            var CompName = "VHA Prepayment Native Credit Card Details Applet";
            var CompName2 = "VHA Prepayment Native Credit Card Details Applet";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case "VHA ToT Common View":
            var CompName = "VHA TOT Setup And Accessories";
            var CompName2 = "VHA TOT Setup And Accessories";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VHA TS Upgrade View"):
            var CompName = "VHA 3 Step Upgrade Header Applet";
            var CompName2 = "VHA 3 Step Upgrade Header Applet";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        case ("VF R&C Order Fulfillment View"):
            var CompName = "VF R&C Prepayment Credit Card Details Applet";
            var CompName2 = "VF R&C Prepayment Credit Card Details Applet";
            BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce);
            break;
        default:
            console.log("View Did not match")
        }
    }

    function BTPostProcessDetails(CompName, CompName2, tokenBCId, nonce) {
        var CreditCardApplet = SiebelApp.S_App.GetActiveView().GetApplet(CompName);
        var CCApm = CreditCardApplet.GetPModel();
        var CCAppId = CCApm.Get("GetFullId");
        if (CompName == "CUT Credit Card Payment Form Applet") {
            //$("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").show()
            $("#s_" + CCAppId + "_div div.AppletHIFormBorder div").show()
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
                                                    $("#s_" + CCAppId + "_div div.AppletHIListBorder.siebui-collapsible-applet-header").show()
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
            if (CompName == "VHA Prepayment Credit Card Details Applet" || CompName == "VHA Prepayment Native Credit Card Details Applet" || CompName == "VF R&C Prepayment Credit Card Details Applet") {
                BillRowId = SiebelApp.S_App.GetProfileAttr("PrepaymentsBACId");
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
        $("#BrainTreeDiv").remove();
        var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
        var Inputs = SiebelApp.S_App.NewPropertySet();
        Inputs.SetProperty("Identifier", BillRowId);
        Inputs.SetProperty("tokenBCId", tokenBCId);
        console.log("Identifier: " + BillRowId + " ; Object Id: " + tokenBCId);
        Inputs.SetProperty("ProcessName", "VF PCI Async Response Workflow");
        try {
            var out = ser.InvokeMethod("RunProcess", Inputs)
        } catch (e) {
            alert(e.message)
        }
        finally {}
        var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
        var Inputs = SiebelApp.S_App.NewPropertySet();
        Inputs.SetProperty("ProcessName", "VF PP BT Token Complete Workflow");
        Inputs.SetProperty("Identifier", BillRowId);
        Inputs.SetProperty("tokenBCId", tokenBCId);
        Inputs.SetProperty("deviceData", deviceData);
        Inputs.SetProperty("CustId", custId);
        Inputs.SetProperty("MobileNumber", GetMobileNumber());
        Inputs.SetProperty("nonce", nonce);
        console.log("Identifier: " + BillRowId + " ; tokenBCId: " + tokenBCId + " ; deviceData:" + deviceData + " ; custId:-" + custId);
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
                var last4 = ResultSet.GetProperty("CCLast4Digits");
                var first6 = ResultSet.GetProperty("CCFirst6Digits");

                var Inps = SiebelApp.S_App.NewPropertySet();
                var Outs = SiebelApp.S_App.NewPropertySet();
                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                Inps.SetProperty("Service Name", "VHA Upgrade Utilities BS");
                Inps.SetProperty("Method Name", "GetSurCharge");
                Inps.SetProperty("CCTokenNumber", first6);
                Outs = ser.InvokeMethod("Run Process", Inps);
                var resultSet = Outs.GetChildByType("ResultSet");
                var surcharge = resultSet.GetProperty("SurchargeRate");
                var brand = resultSet.GetProperty("Brand");
                var cardType = resultSet.GetProperty("CardType") || "";
                $("input.vha-ts-nameoncard").val(nameOnCard).attr("actualValue", nameOnCard);
                //$("input.vha-ts-cardnumber").val(cardNumber.substr(0, 4) + " **** **** " + cardNumber.substr(-4)).attr("actualValue", cardNumber);
                $("input.vha-ts-cardnumber").val(first6.substr(0, 4) + " **** **** " + last4).attr("actualValue", cardNumber)
                $("input.vha-ts-cardnumber").attr("first6", first6);
                $("input.vha-ts-cardnumber").attr("last4", last4);
                $("input.vha-ts-cardnumber").attr("devicedata", deviceData);
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
                    Inputs.SetProperty("CC Last4Digits", ResultSet.GetProperty("CCLast4Digits"));
                    Inputs.SetProperty("CC First6Digits", ResultSet.GetProperty("CCFirst6Digits"));
                    Inputs.SetProperty("CC DeviceData", deviceData);
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
                    var strCCL4d = Inputs.SetProperty("CC Last4Digits", ResultSet.GetProperty("CCLast4Digits"));
                    var strCCF6d = Inputs.SetProperty("CC First6Digits", ResultSet.GetProperty("CCFirst6Digits"));
                    var strDData = Inputs.SetProperty("DeviceData", deviceData);
                    try {
                        var out = ser.InvokeMethod("Run Process", Inputs);
                        alert(ResultSet.GetProperty("Error Message"))
                    } catch (e) {
                        alert(e.message)
                    }
                }
            }
        } catch (e) {
            alert(e.message);
            $("#maskoverlay").styleHide();
        }
        finally {
            $("#maskoverlay").styleHide();
        }
    }

    function GetMobileNumber() {
        if (OrderNum != "" && OrderNum != undefined) {
            var app = SiebelApp.S_App.GetActiveView().GetApplet("VF UNISIM Order Entry - Line Item TBUI - Read Only");
            var pm = app.GetPModel();
            var Data = pm.Get("GetRecordSet");
            return Data[0]["VF MSISDN TBUI"];
        } else {
            return SiebelApp.S_App.GetProfileAttr("PCIPrepayMSISDN");
        }
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
        case ("VHA APP Prepayment Processing View"):
        case ("VHA Prepayment 2 Way SMS Processing View"):
        case ("VHA APP Prepayment 2 Way SMS Processing View"):
        case ("VHA Prepayment 2 Way SMS Native Processing View"):
		case ("VF R&C Order Fulfillment View"):
            CompName = "VHAAuthorizeAndSettleOpenUI";
            break;
        case ("VHA TS Upgrade View"):
            CompName = "VHA 3 Step Upgrade Header Applet";
            break;
        default:
            alert("View Name Not Found.");
        }
        return CompName;
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

}
