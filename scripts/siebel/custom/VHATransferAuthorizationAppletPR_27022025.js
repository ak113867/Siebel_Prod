if (typeof(SiebelAppFacade.VHATransferAuthorizationAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHATransferAuthorizationAppletPR");
    define("siebel/custom/VHATransferAuthorizationAppletPR", ["order!siebel/phyrenderer"], function () {
        SiebelAppFacade.VHATransferAuthorizationAppletPR = (function () {
            VHAAppUtilities.SetConstants("isTOTCustDetilsUpt", "");
            var this_t = this;
            var isQAS = "N";
            var sApp = SiebelApp.S_App;
            function VHATransferAuthorizationAppletPR(pm) {
                SiebelAppFacade.VHATransferAuthorizationAppletPR.superclass.constructor.call(this, pm);

            }
            SiebelJS.Extend(VHATransferAuthorizationAppletPR, SiebelAppFacade.PhysicalRenderer);
            var sHdrId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Id");
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
            VHATransferAuthorizationAppletPR.prototype.Init = function () {
                var this_t = this;
                SiebelAppFacade.VHATransferAuthorizationAppletPR.superclass.Init.apply(this, arguments);
                this.GetPM().AddMethod("FieldChange", OnFieldChange, {
                    sequence: false,
                    scope: this
                });
                this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
                    sequence: false,
                    scope: this
                });
            }
            function PostInvokeMethod(MethodName) {}
            function mSetAddrValidFlg(sVal) {
                var sHdrBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");
                sHdrBC.SetFieldValue("PSMA Flag", sVal);
                sHdrBC.WriteRecord();
            }

            function OnFieldChange(control, value) {
                VHAAppUtilities.SetConstants("isTOTCustDetilsUpt", "Y");
                if (control.GetName() == "Type" && value != "") {
                    //mOthersToggle(this.GetPM());
                    toggleIAddfield(value, this.GetPM());
                }
                if (control.GetName() == "Transferring Service As" && value != "") {
                    if (value == "Postpay") {
                        $('[aria-label="No. of Active Services"]').parent().parent().parent().addClass("VFDisplayNone");
                        $('[aria-label="Billing Date"]').parent().parent().parent().removeClass("VFDisplayNone");
                    } else if (value == "Prepay") {
                        $('[aria-label="Billing Date"]').parent().parent().parent().addClass("VFDisplayNone");
                        $('[aria-label="No. of Active Services"]').parent().parent().parent().removeClass("VFDisplayNone");
                    }
                }
                if (control.GetName() == "Enter Address" && value == "") {
                    $("#Coverage").text("");
                    $("a.siebui-icon-location").remove();
					$(".ccNwkpar").remove();
					SiebelApp.S_App.SetProfileAttr("URL1","");
                }
                /*if(control.GetName()=="Manual Address Flag"){
                //mOthersToggle(this.GetPM());
                if(value=="Y"){
                if(isQAS=="N"){alert ("Please perform QAS search")
                this.GetPM().Get("GetBusComp").SetFieldValue("Manual Address Flag","Y");}
                else{
                $('#ManualAdd').removeClass("VFDisplayNone");
                toggleIAddfield("Street", this.GetPM());}}
                else {$('#ManualAdd').addClass("VFDisplayNone");}
                }*/
                /*if(control.GetName()=="Manual Country" || control.GetName()=="Manual Country Visa" || control.GetName()=="Issuer" || control.GetName()=="Card Color" ||  control.GetName()=="Others Id Type")
            {showImage(this.GetPM());}*/
            }
            function fCoverageCheck(sResp, pm) {
                //$('[aria-label="Customer Type:Coverage Check"]').trigger("click")
                // $('[aria-label="Customer Type Form Applet:Coverage Check"]').trigger("click");
                //$('[name=' + this_t.GetPM().Get("GetControls")["Coverage Check"].GetInputName() + ']').trigger("click");
                var nser = SiebelApp.S_App.GetService("VF BS Process Manager");
                var nInputs = SiebelApp.S_App.NewPropertySet();
                nInputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service BS MOCN");
                nInputs.SetProperty("role", "VCS");
                nInputs.SetProperty("longitude", sResp.address.geometry.coordinates[0]); //??
                nInputs.SetProperty("latitude", sResp.address.geometry.coordinates[1]);
				nInputs.SetProperty("GNAFId", sResp.address.id);// Added for MOCN: Sandesh
                var sView = SiebelApp.S_App.GetActiveView().GetName();
                if (sView == "VHA ToT Common View") {
                    var vSessionId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Id")
                }
                nInputs.SetProperty("SessionId", vSessionId);
                nInputs.SetProperty("Method Name", "CoverageCheck");
                var ROups = nser.InvokeMethod("Run Process", nInputs);
                var CCAppId = pm.Get("GetFullId");
                var s4G,
                s5Gsa,
                s5Gnsa;
                var resultCov = [];
                for (let i = 0; i < ROups.GetChildByType("ResultSet").childArray[1].childArray.length; i++) {
                    var curPropArr = ROups.GetChildByType("ResultSet").childArray[1].childArray[i].propArray;
                    resultCov.push(curPropArr);
                }

                //console.log(resultCov);
                //var suiURL = ROups.childArray[0].childArray[0].childArray[1].childArray[3].childArray[0].propArray.uiUrl;
                var suiURL = SiebelApp.S_App.GetProfileAttr("URL1");
                //SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Customer Details TBC").SetFieldValue("Map URL", "https://mapt.vodafone.com.au/VHAMap/apps/retail-vf?lat=-33.52220942&lon=151.19767066&zl=16&device=generic5g");
                /*if (sView == "VF Capture Customer Details Postpay UNISIM TBUI") {
                SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Customer Details UNISIM TBC").SetFieldValue("Map URL", suiURL);
                } else*/
                if (sView == "VHA ToT Common View") {
                    SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").SetFieldValue("Map URL", suiURL);
                }
                const arrSite = [...new Set(resultCov.map(x => x.Site))];
                var ccpardiv = '<div class="ccNwkpar">';
                var hdrdiv = "";
                console.log(arrSite);
                arrSite.forEach(function (item1, index) {
                    // console.log(index+". "+item);
                    var arrNetwork = resultCov.filter(function (a) {
                        return a.Site == item1;
                    });
                    console.log(arrNetwork);
                    hdrdiv = hdrdiv + '<div class="ccNwkchdmain"><div class="ccNwkhdr" id="ccNwkhdr"' + index + '>' + item1 + '</div><div class="ccNwkchd">';
                    arrNetwork.forEach(function (item2, index) {
                        if (item2.PropName != "") {
                            // console.log(item.PropName+' == '+item.PropValue);
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
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="f4G"> ' + dVal + '</div>';
                        s4G = MapShed.FWA.f4G.is4G;

                        var dVal = MapShed.FWA.f5G.is5G == true ? "5G – Available" : "5G – Not available";
                        var dCls = MapShed.FWA.f5G.is5G == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="f5G"> ' + dVal + '</div>';
						s5G = MapShed.FWA.f5G.is5G;

                        var dVal = MapShed.FWA.f5GNSA.is5Gnsa == true ? "5G NSA – Available" : "5G NSA – Not available";
                        var dCls = MapShed.FWA.f5GNSA.is5Gnsa == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="f5GNSA"> ' + dVal + '</div>';
                        s5Gnsa = MapShed.FWA.f5GNSA.is5Gnsa;
                        break;
                    case "Mobile Coverage": //"mobilestatus":
                        var m = MapShed.Mobile.m3G;

                        var dVal = m.indoor == true && m.outdoor == true ? "3G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "3G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "3G - Indoor Only" : "3G - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="m3G"> ' + dVal + '</div>';

                        m = MapShed.Mobile.m4G;
                        var dVal = m.indoor == true && m.outdoor == true ? "4G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "4G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "4G - Indoor Only" : "4G - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="m4G"> ' + dVal + '</div>';
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
                        m=MapShed.Mobile.m5G;
                        var dVal = m.indoor==true&&m.outdoor==true?"5G - Indoor & Outdoor":m.indoor==false&&m.outdoor==true?"5G - Outdoor Only":m.indoor==true&&m.outdoor==false?"5G - Indoor Only":"5G - No coverage";
                        var dCls = m.indoor==true&&m.outdoor==true?"ccmsGreen":m.indoor==false&&m.outdoor==true?"ccmsOrange":m.indoor==true&&m.outdoor==false?"ccmsOrange":"ccmsRed";
                        MapShed.FWA.f4G.is4G==true?"ccmsGreen":"ccmsRed";
                        div = div + '<div class="ccNwk  btn '+dCls+'" id="m5G"> ' + dVal + '</div>';                        

                        m = MapShed.Mobile.m5GNSA;
                        var dVal = m.indoor == true && m.outdoor == true ? "5G NSA - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "5G NSA - Outdoor Only" : m.indoor == true && m.outdoor == false ? "5G NSA - Indoor Only" : "5G NSA - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="m5GNSA"> ' + dVal + '</div>';

                        break;
                    }
                    hdrdiv = hdrdiv + div;
                    hdrdiv = hdrdiv + '</div></div>';
                    //console.log(hdrdiv);
                });

                console.log(MapShed);
                var nwkmsg = "";
                if (s4G == true || (s5Gsa == true || s5Gnsa == true))
                    nwkmsg = "";
                else
					nwkmsg = "";
                    //nwkmsg = '<div class="ccNwkMsg">4G and 5G Home Internet services are not currently available at this address. You will not be able to connect these services at this address.</div>';
                ccpardiv = ccpardiv + hdrdiv + nwkmsg + '</div>';
                setTimeout(function () {
                        $('.siebui-icon-location').parent().append(ccpardiv);
                    }, 200);				
                //SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Customer Details TBC").SetFieldValue("Map URL", "https://mapt.vodafone.com.au/VHAMap/apps/retail-vf?lat=-33.52220942&lon=151.19767066&zl=16&device=generic5g");
            }
            function toggleIAddfield(value, pm1) {
                var controls = pm1.Get("GetControls");
                ["Bag", "Box", "Rural Delivery", "Bag Name", "Building#", "Floor Type", "Floor", "Street Type", "Street #", "Street Address"].forEach(function (item, index) {
                    var sCtl = controls[item];
                    $("[name ='" + sCtl.GetInputName() + "']").closest('div').parent().removeClass('VFDisplayNone');
                });
                ["Postal Code", "Manual Country", "State", "Street #", "Street Address", "Street Type", "Bag", "Box", "City"].forEach(function (item, index) {
                    var sCtl = controls[item];
                    $("[name ='" + sCtl.GetInputName() + "']").parent().parent().prev().children().removeClass("AddRequired")
                });

                switch (value) {
                case "Street":
                    //var controls = pm1.Get("GetControls");
                    ["Bag", "Box", "Rural Delivery", "Bag Name"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").closest('div').parent().addClass('VFDisplayNone');
                    });
                    ["Postal Code", "Manual Country", "State", "Street #", "Street Address", "Street Type", "City", "Type"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").parent().parent().prev().children().addClass("AddRequired")
                    });
                    break;

                case "Rural":
                    //	var controls = pm1.Get("GetControls");
                    ["Bag", "Box", "Building#", "Bag Name", "Floor Type", "Floor", "Street Type"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").closest('div').parent().addClass('VFDisplayNone');
                    });
                    ["Postal Code", "Manual Country", "State", "City", "Type"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").parent().parent().prev().children().addClass("AddRequired")
                    });
                    break;

                case "PO Box":
                    //	var controls = pm1.Get("GetControls");
                    ["Bag", "Building#", "Bag Name", "Floor Type", "Floor", "Street Type", "Rural Delivery", "Street #", "Street Address"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").closest('div').parent().addClass('VFDisplayNone');
                    });
                    ["Postal Code", "Manual Country", "State", "City", "Box", "Type"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").parent().parent().prev().children().addClass("AddRequired")
                    });
                    break;

                case "GPO Box":
                    //	var controls = pm1.Get("GetControls");
                    ["Bag", "Building#", "Bag Name", "Floor Type", "Floor", "Street Type", "Rural Delivery", "Street #", "Street Address"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").closest('div').parent().addClass('VFDisplayNone');
                    });
                    ["Postal Code", "Manual Country", "State", "City", "Box", "Type"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").parent().parent().prev().children().addClass("AddRequired")
                    });
                    break;

                case "Private Bag":
                    //	var controls = pm1.Get("GetControls");
                    ["Building#", "Floor Type", "Floor", "Street Type", "Rural Delivery", "Street #", "Street Address", "Box"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").closest('div').parent().addClass('VFDisplayNone');
                    });
                    ["Postal Code", "Manual Country", "State", "City", "Bag", "Type"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").parent().parent().prev().children().addClass("AddRequired")
                    });
                    break;

                case "Locked Bag":
                    //	var controls = pm1.Get("GetControls");
                    ["Building#", "Floor Type", "Floor", "Street Type", "Rural Delivery", "Street #", "Street Address", "Box"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").closest('div').parent().addClass('VFDisplayNone');
                    });
                    ["Postal Code", "Manual Country", "State", "City", "Bag", "Type"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").parent().parent().prev().children().addClass("AddRequired")
                    });
                    break;

                case "Overseas":
                    //	var controls = pm1.Get("GetControls");
                    ["Bag", "Building#", "Floor Type", "Floor", "Street Type", "Rural Delivery", "Box", "Bag Name"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").closest('div').parent().addClass('VFDisplayNone');
                    });
                    ["Manual Country", "City", "Box", "Type"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").parent().parent().prev().children().addClass("AddRequired")
                    });
                    break;

                case "Service":
                    //	var controls = pm1.Get("GetControls");
                    ["Bag", "Rural Delivery", "Bag Name", "Box"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").closest('div').parent().addClass('VFDisplayNone');
                    });
                    ["Postal Code", "Manual Country", "City", "Box", "Type", "State"].forEach(function (item, index) {
                        var sCtl = controls[item];
                        $("[name ='" + sCtl.GetInputName() + "']").parent().parent().prev().children().addClass("AddRequired")
                    });
                    break;

                default:
                    break;

                }

            }
            VHATransferAuthorizationAppletPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHATransferAuthorizationAppletPR.superclass.ShowUI.call(this); ;
                var busObj = SiebelApp.S_App.GetActiveBusObj();
                var bc = busObj.GetBusCompByName("VHA TOT Generic BC");
                //$ ('[aria-label="Service Identifier"]').parent().parent().parent().addClass("VFDisplayNone");
                var sECStat1 = bc.GetFieldValue("Service Identifier");
                var pm = this.GetPM();
                var recordSet = pm.Get("GetRecordSet");
                var sTrServ = recordSet[0]["Transferring Service As"];
                var sTrServTo = recordSet[0]["Transferring Service To"];
                var sToStat = recordSet[0]["TA Status"];
                var sECStat = recordSet[0]["EC Status"];
                var sBAInd = recordSet[0]["BA Indicator"];
                var sBillAccId = recordSet[0]["Billing Account Id"];
                $('.vhatotauthenticate').addClass("VFDisplayNone");
                if (SiebelApp.S_App.GetProfileAttr("IsDealerEnableForIdScan") != "TRUE") {
                    $(".VHAScanAndUpload").remove();
                }
                //$('#vhatotpospaybtn,#vhatotprepaybtn').addClass("applet-button-readonly");
                if (sTrServ == "") {
                    $('[aria-label="No. of Active Services"]').parent().parent().parent().addClass("VFDisplayNone");
                    $('[aria-label="Billing Date"]').parent().parent().parent().removeClass("VFDisplayNone");
                }
                if (sTrServ == "Postpay") {
                    $('#vhatotpospaybtn').addClass("applet-button-active").removeClass("applet-button-passive").removeClass("applet-button-readonly");
                    $('#vhatotprepaybtn').addClass("applet-button-passive");
                    $('[aria-label="No. of Active Services"]').parent().parent().parent().addClass("VFDisplayNone");
                    $('[aria-label="Billing Date"]').parent().parent().parent().removeClass("VFDisplayNone");
                    setTimeout(function () {
                        SiebelAppFacade.VHAToTCommonViewPR.PrepayGuideFlow("Postpay");
                    }, 50);
                } else if (sTrServ == "Prepay") {
                    $('#vhatotprepaybtn').addClass("applet-button-active").removeClass("applet-button-passive").removeClass("applet-button-readonly");
                    $('#vhatotpospaybtn').addClass("applet-button-passive");
                    $('[aria-label="Billing Date"]').parent().parent().parent().addClass("VFDisplayNone");
                    $('[aria-label="No. of Active Services"]').parent().parent().parent().removeClass("VFDisplayNone");
                    setTimeout(function () {
                        SiebelAppFacade.VHAToTCommonViewPR.PrepayGuideFlow("Prepay");
                    }, 50);
                }
                if (sTrServTo == "New Customer") {
                    $('#vhatotnewcustbtn').addClass("applet-button-active").removeClass("applet-button-passive");
                }
                /*if( sTrServTo == "Existing Customer")*/
                /*{mSetAddrValidFlg("Y");}*/
                if (sTrServTo == "Existing Customer" && sBAInd == "N") {
                    $('#vhatotextcustbtn').addClass("applet-button-active").removeClass("applet-button-passive");
                    $('.vhatotauthenticate').removeClass("VFDisplayNone");
                }
                if (sBAInd == "Y") {
                    $('#vhatotextcustbtn').addClass("applet-button-active").removeClass("applet-button-passive");
                    $('.vhatotauthenticate').addClass("VFDisplayNone");
                    $('#vhatotnewcustbtn').addClass("applet-button-readonly");
                }

                /*if(sBillAccId!="")
                SiebelAppFacade.VHAAccessoriesPR.initializeBillingAccount(sBillAccId, "Y", "Default");
                else
                SiebelAppFacade.VHAAccessoriesPR.initializeBillingAccount("NA", "Y", "NA");	*/

                //$('#vhatransferauthbtn').after("</br><b id='VHATOTAuthStatus'class='ml-4 h5'></b>");
                if (sToStat == "") {
                    $('#VHATOTAuthStatus').addClass('VFDisplayNone');
                } else {
                    $('#VHATOTAuthStatus').html(sToStat).addClass('success');
                    if (sToStat == "Verification Successful")
                        $('#VHATOTAuthStatus').removeClass("TOTRedFont").addClass("success");
                    else
                        $('#VHATOTAuthStatus').addClass("TOTRedFont").removeClass("success");
                }
                //$('#vhatotexisttverifybtn').after("<b id='VHATOTAuthExStatus' class='ml-4 h5'></b/>");
                if (sECStat == "") {
                    $('#VHATOTAuthExStatus').addClass('VFDisplayNone');
                } else {
                    $('#VHATOTAuthExStatus').html(sECStat).addClass('success');
                    if (sECStat == "Verification Successful") {
                        $('#VHATOTAuthExStatus').removeClass("TOTRedFont").addClass("success");
                        $("#vhatotnewcustbtn").removeClass("applet-button-active").addClass("applet-button-readonly");
                    } else
                        $('#VHATOTAuthExStatus').addClass("TOTRedFont").removeClass("success");
                }

                $('[aria-label="Transferring Service As"],[aria-label="Transferring Service To"]').addClass("VFDisplayNone");

                function Segment(segItems) {
                    segItems.each(function () {
                        var self = $(this);
                        var onchange = self.attr('onchange');
                        var wrapper = $("<div>", {
                            class: "ui-segment"
                        });
                        $(this).find("option").each(function () {
                            var option = $("<span>", {
                                class: 'option btn vhappbtn',
                                onclick: onchange,
                                text: $(this).text(),
                                value: $(this).val()
                            });
                            if ($(this).is(":selected")) {
                                option.addClass("active");
                            }

                            wrapper.append(option);
                        });
                        wrapper.find("span.option").click(function () {
                            wrapper.find("span.option").removeClass("active");
                            $(this).addClass("active");
                            self.val($(this).attr('value'));
                        });
                        if (!($(this).next().hasClass('ui-segment'))) {
                            //if($('.ui-segment').length==0){
                            $(this).after(wrapper);
                            $(this).hide();
                            //}
                        }
                    });

                }
                Segment($(".segment-select"));
            }
            VHATransferAuthorizationAppletPR.prototype.BindData = function () {
                SiebelAppFacade.VHATransferAuthorizationAppletPR.superclass.BindData.apply(this, arguments);
                var pm = this.GetPM();
                var recordSet = pm.Get("GetRecordSet");
                var sTAStatusRdOnly = recordSet[0]["TA Status Calc"];
                var sECStatusRdOnly = recordSet[0]["EC Status Calc"];
                var dom = recordSet[0]["VF Calc DOM RO"];
                if (sTAStatusRdOnly == "Y") {
                    $('[aria-label="Enter Transferring Mobile Number"]').attr("readonly", "readOnly");
                    $('[aria-label="Authorization Code"]').attr("readonly", "readOnly");
                } else {
                    $('[aria-label="Enter Transferring Mobile Number"]').removeAttr('readonly');
                    $('[aria-label="Authorization Code"]').removeAttr('readonly');
                }
                if (sECStatusRdOnly == "Y") {
                    $('[aria-label="Enter MSISDN/BAN/CA Row ID"]').attr("readonly", "readOnly");
                    $('[aria-label="Enter Customer PIN"]').attr("readonly", "readOnly");
                } else {
                    $('[aria-label="Enter MSISDN/BAN/CA Row ID"]').removeAttr('readonly');
                    $('[aria-label="Enter Customer PIN"]').removeAttr('readonly');
                }
                if (dom == "Y") {
                    $('[aria-label="Billing Date"]').attr("readonly", "readOnly");
                } else {
                    $('[aria-label="Billing Date"]').removeAttr("readonly");
                }
            }
            VHATransferAuthorizationAppletPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHATransferAuthorizationAppletPR.superclass.BindEvents.apply(this, arguments);
                var pm = this.GetPM();
                var this_t = this;
                var controls = this.GetPM().Get("GetControls");
                var cntrls = pm.Get("GetControls");
                var sCtl = cntrls["Enter Manual Address"];
                $("[name ='" + sCtl.GetInputName() + "']").off("click").on("click", function () {
                    mSetAddrValidFlg("Y");
                    $("#Coverage").text("");
                    $("a.siebui-icon-location").remove();
					$(".ccNwkpar").remove();
					SiebelApp.S_App.SetProfileAttr("URL1","");
                    $('#ManualAdd').removeClass("VFDisplayNone");
                    $('[aria-label="Enter Address"]').parent().find('.authvalidation').remove();
                    $('[aria-label="Enter Address"]').removeClass("VHAToTnullerr");
                    $('[aria-label="Enter Address"]').val("");
                    pm.Get("GetBusComp").SetFieldValue("Manual Address Flag", "Y");
                    toggleIAddfield("Street", pm);
                });
                $('[aria-label="Enter Address"]').autocomplete({
                    source: function (request, response) {
                        var sResp = VHAAppUtilities.doSearchAddress(request, false);
                        mSetAddrValidFlg("N");
                        $("#Coverage").text("");
                        $("a.siebui-icon-location").remove();
						$(".ccNwkpar").remove();
						SiebelApp.S_App.SetProfileAttr("URL1","");
                        if (sResp != false) {
                            response(VHAAppUtilities.doSearchAddress(request, false));
                        } else { // when error/message/fault
                            response([]);
                        }
                        isQAS = "Y";
                        $("[name ='" + sCtl.GetInputName() + "']").parent().removeClass("VFDisplayNone")
                        $("#TCEcQAS").addClass("VFDisplayNone");
                    },
                    minLength: 10,
                    select: function (event, ui) {
                        var sResp = VHAAppUtilities.getAddress(ui);
                        if (sResp != false) {
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            Inputs.SetProperty("ViewName", SiebelApp.S_App.GetActiveView().GetName());
                            Inputs.SetProperty("Action", "UpdateTOTAddress");
                            //mSetPrflAttr("VFQASIsInbound","Y");
                            VHAAppUtilities.updateAddress(sResp, Inputs);
                            $("[name ='" + sCtl.GetInputName() + "']").parent().addClass("VFDisplayNone")
                            if (!($('#ManualAdd').hasClass("VFDisplayNone"))) {
                                $('#ManualAdd').addClass("VFDisplayNone");
                                pm.Get("GetBusComp").SetFieldValue("Manual Address Flag", "N");
                                ["Bag", "Box", "Rural Delivery", "Bag Name", "Building#", "Floor Type", "Floor", "Street Type", "Street #", "Street Address", "City", "Postal Code", "Manual Country", "State", ].forEach(function (item, index) {
                                    var sCtl = cntrls[item];
                                    pm.Get("GetBusComp").SetFieldValue(cntrls[item].GetFieldName(), "");
                                    if ($("[name ='" + sCtl.GetInputName() + "']").val() != "") {
                                        $("[name ='" + sCtl.GetInputName() + "']").val("");
                                    }
                                });
                            }
                            fCoverageCheck(sResp, pm);
                            /*Haritha added for coverage check*/
                            var inp = SiebelApp.S_App.NewPropertySet();
                            inp.SetProperty("TempId", sHdrId);
                            var outPs = SiebelApp.S_App.NewPropertySet();
                            pm.Get("GetBusComp").WriteRecord();
                            //var outPs = VHAAppUtilities.CallWorkflow("VHA TOT Coverage Check WF", inp);
                            //var sCoverage=outPs.GetProperty("CoverageType");
                            //var sMapURL=outPs.GetProperty("MapURL");
                            //var sCovChkId=outPs.GetProperty("CoverageChkId");
                            var sCoverage="";
                            var sMapURL=SiebelApp.S_App.GetProfileAttr("URL1");
							//var sMapURL="https://mapt.vodafone.com.au/VHAMap/apps/retail-vf?lat=-33.52220942&lon=151.19767066&zl=16&device=generic5g";
                            var sCovChkId=SiebelApp.S_App.GetProfileAttr("CoverageChkId");;
							var sTotBc = pm.Get("GetBusComp");
                            sTotBc.SetFieldValue("Coverage Check Id", sCovChkId);
                            sTotBc.SetFieldValue("Coverage Check Status", "Checked");
                            sTotBc.SetFieldValue("Map URL", sMapURL);
                            if (sCoverage == "Error" || sCoverage == "Coverage Not Available" || sCoverage == "Coverage Check Error") {
                                $('#Coverage').text(sCoverage).addClass("TOTRedFont");
                            } else
                                $('#Coverage').text(sCoverage).removeClass("TOTRedFont").addClass("success");
                            if (sMapURL != "")
                                ($('.siebui-icon-location').length > 0) ? $(".siebui-icon-location").attr("href", sMapURL) : $('#Map_URL_Caption_Label').parent().append("<a class ='siebui-icon-location' href='" + sMapURL + "'target=_blank></a>");
                            mSetAddrValidFlg("Y");
                        }
                    }
                });
                var sPstCd = cntrls["Postal Code"];
                $("[name ='" + sPstCd.GetInputName() + "']").autocomplete({
                    source: function (request, response) {
                        SiebelApp.S_App.SetProfileAttr("PostcodeAttr", request.term);
                        var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        Inputs.SetProperty("Service Name", "VF Generic VBC Service");
                        Inputs.SetProperty("Method Name", "Query");
                        Inputs.SetProperty("Business Component Name", "VF Postcode Validated VBC");
                        var Output = ser.InvokeMethod("Run Process", Inputs);
                        var Reset = Output.GetChildByType("ResultSet");
                        var scount = Reset.GetChildCount();
                        var add = new Array();
                        for (var i = 0; i < scount; i++) {
                            add[i] = Reset.GetChild(i).GetProperty("Zip Code") + "," + Reset.GetChild(i).GetProperty("Suburb") + "," + Reset.GetChild(i).GetProperty("State") + "," + Reset.GetChild(i).GetProperty("Country");

                        }

                        if (add != false) {

                            response(add);
                        } else { // when error/message/fault
                            response([]);
                        }
                        //mSetPrflAttr("QAS Query Executed","Y");
                    },
                    minLength: 4,
                    select: function (event, ui) {
                        var sResp = ui.item.value;
                        if (sResp != false) {
                            var nameArr = sResp.split(',')
                                pm.Get("GetBusComp").SetFieldValue("Manual Postal Code", nameArr[0]);
                            pm.Get("GetBusComp").SetFieldValue("Manual City", nameArr[1]);
                            pm.Get("GetBusComp").SetFieldValue("Manual State", nameArr[2]);
                            pm.Get("GetBusComp").SetFieldValue("Manual Country", nameArr[3]);
                            return false;
                        }
                    }

                })
                $('#vhatotprepaybtn').on("click", function () {

                    $('[aria-label="Billing Date"]').hide();
                })
                $('[aria-label="Manual Address"]').off("click").on("click", function () {
                    if ($(this).is(':checked')) {
                        if (isQAS == "N") {
                            $('[aria-label="Enter Address"]').parent().append("<div class='authvalidation' id='TCEcQAS' style='color:red;margin-bottom: 20px;'>Please perform QAS Search</div>").addClass("VHAToTnullerr");
                            $(this).prop('checked', false);
                        } else {
                            $('#ManualAdd').removeClass("VFDisplayNone");
                            toggleIAddfield("Street", pm);
                        }
                    } else {
                        $('#ManualAdd').addClass("VFDisplayNone");
                    }
                });

                /* $('[aria-label="Type"]').off("change").on("change", function(){
                if($(this).is(':checked')){
                if(isQAS=="N"){alert ("Please perform QAS search")
                $(this).prop('checked',false);}
                else{
                $('#ManualAdd').removeClass("VFDisplayNone");
                toggleIAddfield("Street", this.GetPM());}}
                else {$('#ManualAdd').addClass("VFDisplayNone");}
                });*/

                $('#vhatotpospaybtn').off("click").on("click", function () {
                    $('#vhatotpospaybtn').removeClass("applet-button-passive").addClass("applet-button-active");
                    $('#vhatotprepaybtn').removeClass("applet-button-active").addClass("applet-button-passive");
                    pm.Get("GetBusComp").SetFieldValue("Transferring Service As", "Postpay");
                    pm.Get("GetBusComp").WriteRecord();
                    $('.idcontainerchdft .ui-segment').remove();
                    SiebelAppFacade.VHANameChangeCaptureIdPR.mShowUi();
                    $(".VHAScanAndUpload").removeClass('VFDisplayNone');
                    SiebelAppFacade.VHAToTCommonViewPR.PrepayGuideFlow("Postpay");
                });
                $('#vhatotprepaybtn').off("click").on("click", function () {
                    $('#vhatotprepaybtn').removeClass("applet-button-passive").addClass("applet-button-active");
                    $('#vhatotpospaybtn').removeClass("applet-button-active").addClass("applet-button-passive");
                    pm.Get("GetBusComp").SetFieldValue("Transferring Service As", "Prepay");
                    pm.Get("GetBusComp").WriteRecord();
                    $('.idcontainerchdft .ui-segment').remove();
                    SiebelAppFacade.VHANameChangeCaptureIdPR.mShowUi();
                    $(".VHAScanAndUpload").addClass('VFDisplayNone');
                    SiebelAppFacade.VHAToTCommonViewPR.PrepayGuideFlow("Prepay");
                });
                $('#vhatotnewcustbtn').off("click").on("click", function () {
                    $('#vhatotnewcustbtn').removeClass("applet-button-passive").addClass("applet-button-active");
                    $('#vhatotextcustbtn').removeClass("applet-button-active").addClass("applet-button-passive");
                    $('.vhatotauthenticate').addClass("VFDisplayNone");
                    var t = pm.Get("GetBusComp").SetFieldValue("Transferring Service To", "New Customer");
                    pm.Get("GetBusComp").WriteRecord();
                    $('.idcontainerchdft .ui-segment').remove();
                    SiebelAppFacade.VHANameChangeCaptureIdPR.mShowUi();
                });
                $('#vhatotextcustbtn').off("click").on("click", function () {
                    if (!($(this).hasClass("applet-button-active"))) {
                        $('#vhatotextcustbtn').removeClass("applet-button-passive").addClass("applet-button-active");
                        $('#vhatotnewcustbtn').removeClass("applet-button-active").addClass("applet-button-passive");
                        $('.vhatotauthenticate').removeClass('VFDisplayNone');
                        pm.Get("GetBusComp").SetFieldValue("Transferring Service To", "Existing Customer");
                        pm.Get("GetBusComp").WriteRecord();
                        $('.idcontainerchdft .ui-segment').remove();
                        SiebelAppFacade.VHANameChangeCaptureIdPR.mShowUi();
                    }
                });

                $('#vhatransferauthbtn').off("click").on("click", function () {
                    $('.authvalidation').remove();
                    $('.VHAToTnullerr').removeClass('VHAToTnullerr');
                    var authAppCtrl = pm.Get("GetControls");
                    var sProceed = true;
                    if ($("[name='" + authAppCtrl["Enter Transferring Mobile Number"].GetInputName() + "']").val() == "" && $('#TCMblNum').length == 0) {
                        $("[name='" + authAppCtrl["Enter Transferring Mobile Number"].GetInputName() + "']").after("<div class='authvalidation' id='TCMblNum' style='color:red;'>Please enter Transferring Mobile Number</div>").addClass("VHAToTnullerr");
                        sProceed = false;
                    }
                    if ($("[name='" + authAppCtrl["Enterv Authorization Code"].GetInputName() + "']").val() == "" && $('#TCAuthCode').length == 0) {
                        $("[name='" + authAppCtrl["Enterv Authorization Code"].GetInputName() + "']").after("<div class='authvalidation' id='TCAuthCode' style='color:red;'>Please enter Authorization Code</div>").addClass("VHAToTnullerr");
                        sProceed = false;
                    }
                    if ($('#vhatotpospaybtn, #vhatotprepaybtn').hasClass('applet-button-active') == false) {
                        if ($('.vhat-transser-bnt-val').length < 1)
                            $('#vhatotprepaybtn').parent().append('<div class="vhat-transser-bnt-val TOTRedFont ml-4">Please select the Transfer Service as</div>');
                        sProceed = false;
                    } else {
                        if ($('.vhat-transser-bnt-val').length > 0)
                            $('.vhat-transser-bnt-val').remove();
                    }
                    if (sProceed) {
                        pm.ExecuteMethod("InvokeMethod", "VerifyTS");
                        var recordSet = pm.Get("GetRecordSet");
                        var sTrServ = recordSet[0]["Transferring Service As"];
                        if (sTrServ == "Postpay") {
                            $('#vhatotpospaybtn').addClass("applet-button-active").removeClass("applet-button-passive").removeClass("applet-button-readonly");
                            $('#vhatotprepaybtn').addClass("applet-button-passive");
                            $(".VHAScanAndUpload").removeClass('VFDisplayNone');
                            SiebelAppFacade.VHAToTCommonViewPR.PrepayGuideFlow("Postpay");
                        } else if (sTrServ == "Prepay") {
                            $('#vhatotprepaybtn').addClass("applet-button-active").removeClass("applet-button-passive").removeClass("applet-button-readonly");
                            $('#vhatotpospaybtn').addClass("applet-button-passive");
                            $(".VHAScanAndUpload").addClass('VFDisplayNone');
                            SiebelAppFacade.VHAToTCommonViewPR.PrepayGuideFlow("Prepay");
                        }
                        var sToStat = recordSet[0]["TA Status"];
                        $('#VHATOTAuthStatus').html(sToStat).removeClass('VFDisplayNone').addClass("success");
                        if (sToStat == "Verification Successful")
                            $('#VHATOTAuthStatus').removeClass("TOTRedFont").addClass("success");
                        else
                            $('#VHATOTAuthStatus').addClass("TOTRedFont").removeClass("success");
                    }
                    $('.VHAToTnullerr').first().focus();
                });
                $('#vhatotexisttverifybtn').off("click").on("click", function () {
                    $('.authvalidation').remove();
                    $('.VHAToTnullerr').removeClass('VHAToTnullerr');
                    var authAppCtrl = pm.Get("GetControls");
                    var sProceed = true;
                    if ($("[name='" + authAppCtrl["Enter MSISDN/BAN/CA Row ID"].GetInputName() + "']").val() == "" && $('#ECEntityNum').length == 0) {
                        $("[name='" + authAppCtrl["Enter MSISDN/BAN/CA Row ID"].GetInputName() + "']").after("<div class='authvalidation' id='ECEntityNum' style='color:red;'>Please enter MSISDN/BAN/CA Row ID</div>").addClass("VHAToTnullerr");
                        sProceed = false;
                    }
                    if ($("[name='" + authAppCtrl["Customer PIN"].GetInputName() + "']").val() == "" && $('#ECPin').length == 0) {
                        $("[name='" + authAppCtrl["Customer PIN"].GetInputName() + "']").after("<div class='authvalidation' id='ECPin' style='color:red;'>Please enter Customer PIN</div>").addClass("VHAToTnullerr");
                        sProceed = false;
                    }
                    if (sProceed) {

                        pm.ExecuteMethod("InvokeMethod", "VerifyEC");
                        var recordSet = pm.Get("GetRecordSet");
                        var sECStat = recordSet[0]["EC Status"];
                        var sBillAccId = recordSet[0]["Billing Account Id"];
                        $('#VHATOTAuthExStatus').html(sECStat).removeClass('VFDisplayNone').addClass('success');
                        if (sECStat == "Verification Successful") {
                            mSetAddrValidFlg("Y");
                            $('#VHATOTAuthExStatus').removeClass("TOTRedFont").addClass('success');
                            $("#vhatotnewcustbtn").removeClass("applet-button-active").addClass("applet-button-readonly").addClass("applet-button-readonly");
                            SiebelAppFacade.VHANameChangeCaptureIdPR.IDDisplay(SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel());
                            if (sBillAccId != "")
                                SiebelAppFacade.VHAAccessoriesPR.initializeBillingAccount(sBillAccId, "Y", "Default");
                            else
                                SiebelAppFacade.VHAAccessoriesPR.initializeBillingAccount("NA", "Y", "NA");
                            $('.idcontainerchdft .ui-segment').remove();
                            SiebelAppFacade.VHANameChangeCaptureIdPR.mShowUi();
                        } else
                            $('#VHATOTAuthExStatus').addClass("TOTRedFont").removeClass('success');
                    }
                    $('.VHAToTnullerr').first().focus();
                });

                /*$('[data-display="Verify"]').on("click",function(){

                var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://vvsl40068.vodafone.com.au:9001/siebel/v1.0/service/Workflow%20Process%20Manager/RunProcess?ProcessName=VHA%20TOT%20Transfer%20Authorization&MSISDN=61407130290&Authorization%20Code=878876",
                "method": "POST",
                "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "6a7ea413-8298-f682-256f-d91e34ec2263"
                }
                }

                $.ajax(settings).done(function (response) {
                console.log(response);
                });
                });*/
            }
            return VHATransferAuthorizationAppletPR;
        }
            ());
        return "SiebelAppFacade.VHATransferAuthorizationAppletPR";
    });
}
