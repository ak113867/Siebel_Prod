if (typeof(SiebelAppFacade.VHANameChangeCaptureIdPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHANameChangeCaptureIdPR");
    define("siebel/custom/VHANameChangeCaptureIdPR", ["order!siebel/phyrenderer"], function () {
        SiebelAppFacade.VHANameChangeCaptureIdPR = (function () {
            var pm1 = "";
            var jData = "";
            $.ajax({
                url: "scripts/siebel/custom/IDCaptureJson.txt",
                dataType: 'json',
                success: function (data) {
                    jData = data["IDType"];
                },
                async: false
            });
            var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
            function VHANameChangeCaptureIdPR(pm) {
                SiebelAppFacade.VHANameChangeCaptureIdPR.superclass.constructor.call(this, pm);
                /*this.GetPM().AttachEventHandler(siebConsts.get("PHYEVENT_APPLET_FOCUS"), function(){
                alert("call code");
                });*/
            }
            SiebelJS.Extend(VHANameChangeCaptureIdPR, SiebelAppFacade.PhysicalRenderer);
            VHANameChangeCaptureIdPR.prototype.ShowUI = function () {
                pm1 = this.GetPM();
                SiebelAppFacade.VHANameChangeCaptureIdPR.superclass.ShowUI.call(this);
                VHANameChangeCaptureIdPR.mShowUi();
            }
            VHANameChangeCaptureIdPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHANameChangeCaptureIdPR.superclass.BindEvents.apply(this, arguments);
                //if(SiebelApp.S_App.GetActiveView().GetName()=="VHA Name Change Capture Id Details View")
                {
                    sBindClck(pm1);
                    if (SiebelApp.S_App.GetActiveView().GetName() == "VHA ToT Common View") {
                        //var busObj = SiebelApp.S_App.GetActiveBusObj();
                        //var bc = busObj.GetBusCompByName("VHA TOT Generic BC");
                        var view = SiebelApp.S_App.GetActiveView();
                        var appl = view.GetApplet("VHA Transfer Authorization Applet");

                        $('#vhatotscannerbtn').off("click").on("click", function () {
                            appl.InvokeMethod('VFRefreshRecord');
                            var bc = appl.GetBusComp();
                            if (bc.GetFieldValue("ID Scan Bypass Reason Code") == "Scanner Not Working") {
                                resetBypassReason(bc)
                            } else {
                                $('#vhatotscannerbtn').addClass('vhabtnredbg');
                                $('#vhatotuploadfailedbtn').removeClass('vhabtnredbg');
                                bc.SetFieldValue("ID Scan Bypass Reason Code", "Scanner Not Working");
                                bc.WriteRecord();
                            }
                        });
                        $('#vhatotuploadfailedbtn').off("click").on("click", function () {
                            appl.InvokeMethod('VFRefreshRecord');
                            var bc = appl.GetBusComp();
                            if (bc.GetFieldValue("ID Scan Bypass Reason Code") == "Upload Failed") {
                                resetBypassReason(bc)
                            } else {
                                $('#vhatotuploadfailedbtn').addClass('vhabtnredbg');
                                $('#vhatotscannerbtn').removeClass('vhabtnredbg');
                                bc.SetFieldValue("ID Scan Bypass Reason Code", "Upload Failed");
                                bc.WriteRecord();
                            }
                        });
                        $('#VHAScanBtn').off("click").on("click", function () {
                            appl.InvokeMethod('VFRefreshRecord');
                            var bc = appl.GetBusComp();
                            resetBypassReason(bc);
                            sResultURL = getURL(bc.GetFieldValue("Account Id"), bc.GetFieldValue("Id"));
                            console.log(sResultURL);
                            if ($("#VHAIDuploaddialog1").length == 0) {
                                $("body").append('<div id="VHAIDuploaddialog1" style="height:100% !important;"><div id="VHAIDUploadIframediv"><iframe style="width: 950px;height: 470px;position: relative;" id="IDUpload" src="' + sResultURL + '">						</iframe></div></div>')
                            } else {
                                $("#VHAIDUploadIframediv iframe").attr("src", sResultURL)
                            }
                            $("#VHAIDuploaddialog1").dialog({
                                autoOpen: false,
                                buttons: {
                                    OK: function () {
                                        $(this).dialog("close");
                                        refreshScanStatus()
                                    },
                                    Cancel: function () {
                                        $(this).dialog("close");
                                        refreshScanStatus()
                                    }
                                },
                                title: "Upload ID",
                                position: {
                                    my: "center",
                                    at: "center",
                                    of: window
                                },
                            });
                            $("#VHAIDuploaddialog1").parent().addClass("VHAChangeWidth1000px");
                            $("#VHAIDuploaddialog1").dialog("open");
                        });
                    }

                    var sAppList = SiebelApp.S_App.GetActiveView().GetAppletMap();
                    $('#s_' + sAppList["VHA Name Change Capture Id Details Applet"].GetFullId() + '_div').on("click", function () {
                        $('#s_' + sAppList["VHA Name Change Capture Id Details Applet"].GetFullId() + '_div').removeClass("siebui-commit-pending");
                    });

                    $('#NCCustDetailsApplet').delegate(".ui-segment button", "click", function () {
                        /*New code - sequence*/
                        pm1.Get("GetBusComp").SetFieldValue("Other Id Type", "");
                        pm1.Get("GetBusComp").SetFieldValue("Offer Id Types", "");
                        var idtype = $(this).attr("value");
                        toggleIdBox(idtype, pm1);

                        /*New code ends*/
                        $('#SuccessMessage').text("");
                        ["Card Color", "DOB", "Expiry Date", "Gender", "Given Name", "Issuer", "Medicare Card Number", "Medicare Reference Number", "Middle Name", "Surname", "Medicare Expiry Date", "Country Visa", "Reference Number"].forEach(function (item, index) {
                            pm1.Get("GetBusComp").SetFieldValue(item, "");
                        });
                        $("#NCIdListHeader,#NCAttachedId").removeClass("VFDisplayNone");

                    });
                }
            }
            VHANameChangeCaptureIdPR.prototype.Init = function () {
                SiebelAppFacade.VHANameChangeCaptureIdPR.superclass.Init.apply(this, arguments);
                this.GetPM().AddMethod("FieldChange", OnFieldChange, {
                    sequence: false,
                    scope: this
                });
                this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
                    sequence: false,
                    scope: this
                });
            }

            function resetBypassReason(bc) {
                $('#vhatotscannerbtn').removeClass('vhabtnredbg');
                $('#vhatotuploadfailedbtn').removeClass('vhabtnredbg');
                bc.SetFieldValue("ID Scan Bypass Reason Code", "");
                bc.WriteRecord();
            }

            function getURL(sAcc, sId) {
                console.log('sAcc:' + sAcc);
                console.log('sId:' + sId)
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VHA ID Scan Invoke Workflow");
                Inputs.SetProperty("AccId", sAcc);
                Inputs.SetProperty("Object Id", sId);
                var out = ser.InvokeMethod("RunProcess", Inputs);
                var resultset = out.GetChildByType("ResultSet");
                var sResultURL = resultset['propArray']['URL'];
                console.log(resultset['propArray']['URLScanSessionId']);
                var URLSplit = sResultURL.split("?");
                var queryString = URLSplit[1];
                var baseURL = URLSplit[0];
                queryString = window.btoa(unescape(encodeURIComponent(queryString)));
                sResultURL = baseURL + "?Qstring=" + queryString;
                return (sResultURL);
            }
            function refreshScanStatus() {
                var view = SiebelApp.S_App.GetActiveView();
                var appl = view.GetApplet("VHA Transfer Authorization Applet");
                var i = 0;
                var timer = setInterval(function () {
                    console.log(++i);
                    appl.InvokeMethod('VFRefreshRecord');
                    var scanStat = appl.GetBusComp().GetFieldValue("ID Scan Status Display");
                    if (scanStat == "Upload Successful") {
                        $('#vhatotscannerbtn').prop('disabled', true);
                        $('#vhatotuploadfailedbtn').prop('disabled', true);
                        $('#VHAScanBtn').prop('disabled', true);
                        clearInterval(timer);
                    }
                    if (i == 5) {
                        clearInterval(timer);
                    }
                    $("#VHAScanStatus").html(scanStat);
                    console.log('refreshed' + scanStat);
                }, 1000);
            }
            function OnFieldChange(control, value) {

                if (control.GetName() == "Id Type") {
                    if (value == "Green Medicare Card")
                        SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("ID Type", "Medicare Card");
                    else {
                        if (value != "" && value != null)
                            SiebelApp.S_App.SetProfileAttr("VHAIDType", value);
                    }
                }
                if ((control.GetName() == "Others Id Type" || control.GetName() == "Offer Id Types") && value != "") {

                    //mOthersToggle(this.GetPM());
                    $('#NCCustDetailsApplet .ui-segment button.active').removeClass('active');
                    toggleIdBox(value, this.GetPM());

                    if (control.GetName() == "Others Id Type") {
                        SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("Offer Id Types", "");
                    } else
                        SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("Other Id Type", "");
                }

            }
            function PostInvokeMethod(MethodName) {
                if (MethodName == "mDVSValidate") {
                    if (SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Add Identification Details VBC").GetFieldValue("Given Name") == "") {
                        VHANameChangeCaptureIdPR.callDVS();
                        return;
                    }
                    SiebelApp.S_App.SetProfileAttr("VHAIDType", "");
                    var pm = this.GetPM();
                    var ctls = pm.Get("GetControls");
                    var sIdCtl = ctls["Id Type"];
                    var sDvsErr = SiebelApp.S_App.GetProfileAttr("DVSError");
                    var sDvsFlg = pm.Get("GetBusComp").GetFieldValue("VHA Enable DVS Override");
                    if (sDvsFlg == "Y")
                        $('[lblname="ID Sighted"]').attr("disabled", "disabled");
                    else
                        $('[lblname="ID Sighted"]').removeAttr("disabled");

                    if (sDvsErr != "" && sDvsErr != null) {
                        var sMsgArr = sDvsErr.split(":");
                        var sIdVal = "NonPP";
                        if (sMsgArr[0] == "Success") {
                            //$('#SuccessMessage').text(sMsgArr[1]).removeClass("TOTRedFont");
                            $('#SuccessMessage').text(sMsgArr[1] + ".").removeClass("TOTRedFont");
                            ["Card Color", "DOB", "Expiry Date", "Gender", "Given Name", "Issuer", "Medicare Card Number", "Medicare Reference Number", "Middle Name", "Surname", "Medicare Expiry Date", "Country Visa", "Reference Number", "Q Condition", "Offer Id Types", "Other Id Type"].forEach(function (item, index) {
                                pm.Get("GetBusComp").SetFieldValue(item, "");
                            });
                            if ($('.ui-segment button.active').length > 0)
                                sIdVal = $('.ui-segment button.active').val();
                            sIdVal == "Passport" && getFlow() != "Postpay" ? $('#vhaidtoggler').val('Australia') : sIdVal == "Passport" && getFlow() == "Postpay" ? $('#vhaidtoggler').val('Australia') : $('#vhaidtoggler').val('');
                            $('.vhacustomidbox input').val("");
                            $('[name="Q Condition"]').prop("checked", false);
                            $('select[name="Gender"]').val('');
                            if (sIdVal == "NonPP")
                                $('#vhaidimgcol').remove();
                            VHANameChangeCaptureIdPR.IDDisplay(this.GetPM());
                        }
                        if (sMsgArr[0] == "Error")
                            $('#SuccessMessage').text(sMsgArr[1]).addClass("TOTRedFont");
                    }

                }
                if (MethodName == "SubmitNameChange") {
                    var sSbtErr = SiebelApp.S_App.GetProfileAttr("NameChangeError");
                    if (sSbtErr != "" && sSbtErr != null) {
                        $('#NCSubmitError').text(sSbtErr).addClass("TOTRedFont");
                    }
                }
            }
            VHANameChangeCaptureIdPR.IDDisplay = function (pm) {
                $("#NCIdListHeader,#NCAttachedId").remove();
                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("Service Name", "EAI Siebel Adapter");
                Inputs.SetProperty("Method Name", "Query");
                var busObj = SiebelApp.S_App.GetActiveBusObj();

                var sActiveView = SiebelApp.S_App.GetActiveView().GetName();
                if (sActiveView == "VHA ToT Common View") {
                    var busComp = busObj.GetBusCompByName("VHA TOT Generic BC");
                    var sRowId = busComp.GetFieldValue("Id");
                    Inputs.SetProperty("SearchSpec", "[VHA TOT Generic BC.Id] = '" + sRowId + "'");
                    Inputs.SetProperty("OutputIntObjectName", "VHA TOT Generic IO");
                } else {
                    var busComp = busObj.GetBusCompByName("VHA Prepay Name Change BC");
                    var sRowId = busComp.GetFieldValue("Id");
                    Inputs.SetProperty("SearchSpec", "[VHA Prepay Name Change BC.Id] = '" + sRowId + "'");
                    Inputs.SetProperty("OutputIntObjectName", "VHA Prepay Name Change IO");
                }
                var out = ser.InvokeMethod("Run Process", Inputs);
                var resultset = out.GetChildByType("ResultSet");
                var SiebMessage = resultset.GetChildByType("SiebelMessage");
                /*New Code starts*/
                var resultArr = VHAAppUtilities.SiebelMessageToArray(SiebMessage.childArray[0].childArray[0].childArray[0]);
                var Idtypext = [];
                var sRowId = []; // Delete
                for (i = 0; i < resultArr.length; i++) {
                    Idtypext.push(resultArr[i]["Id Type"]);
                    sRowId.push(resultArr[i]["Name"]);

                }
                var uIDType = Array.from(new Set(Idtypext));

                var sListOfPPFields = ["Id Reference Number=Passport Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Birth Date=Date of Birth", "Expiry Date=Expiry Date", "Country=Country"];
                var sListOfDLFields = ["Id Reference Number=License Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Birth Date=Date of Birth", "Expiry Date=Expiry Date", "Card Number=Card Number", "Country=Country", "Issuer=Issuer"];
                var sListOfMCFields = ["Id Reference Number=Medicare Card Number", "Medicare Reference Number=Medicare Line Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Medicare Expiry Date=Expiry Date", "Card Color=Card Color", "Birth Date=Date of Birth"];
                var sListOfVISAFields = ["Id Reference Number=Passport Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Expiry Date=Expiry Date", "Birth Date=Date of Birth", "Country=Country"];
                var sListOfCommonFields = ["Id Reference Number=Id Reference Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Issuer=Issuer", "Country=Country of Issue", "Expiry Date=Expiry Date", "Issue Date=Issue Date"];
                var sListOfProofAge = ["Id Reference Number=Id Reference Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Issuer=Issuer", "Birth Date=Date of Birth", "Issue Date=Issue Date", "Expiry Date=Expiry Date"];

                var sListOfFields = (sIdT == "Passport") ? sListOfPPFields : (sIdT == "Driver's Licence") ? sListOfDLFields : (sIdT == "Medicare Card") ? sListOfMCFields : (sIdT == "VISA") ? sListOfVISAFields : (sIdT == "Proof of Age Card(Govt Issued)") ? sListOfProofAge : sListOfCommonFields;

                var sFinalHTML = "<div class=NCFullIdDiv><div Id='NCIdListHeader' class='VHAFormTitle'>Attached list of ID's</div><div id='NCAttachedId' class='idatcontainerchdft'>";
                for (a = 0; a < uIDType.length; a++) {

                    switch (uIDType[a]) {
                    case "Passport":
                        var sListOfFields = sListOfPPFields;
                        break;
                    case "Driver's Licence":
                        var sListOfFields = sListOfDLFields;
                        break;
                    case "Medicare Card":
                        var sListOfFields = sListOfMCFields;
                        break;
                    case "VISA":
                        var sListOfFields = sListOfVISAFields;
                        break;
                    case "Proof of Age Card(Govt Issued)":
                        var sListOfFields = sListOfProofAge;
                        break;
                    default:
                        var sListOfFields = sListOfCommonFields;
                        break;

                    }
                    sFinalHTML = sFinalHTML + "<div class='NCIdHeader' headerrow-Id='" + uIDType[a] + "'>Attached ID - " + uIDType[a] + "</div><div class='NCIdrecCont'><div class='flex_row_container NCIdrecHeader' >";
                    for (s = 0; s < sListOfFields.length; s++) {
                        sFieldMap = sListOfFields[s].split('=');
                        sFinalHTML = sFinalHTML + "<div  class='VHATOTBold'>" + sFieldMap[1] + "</div>";
                    }
                    sFinalHTML = sFinalHTML + "</div>";
                    for (b = 0; b < resultArr.length; b++) {
                        if (uIDType[a] == resultArr[b]["Id Type"]) {
                            sFinalHTML = sFinalHTML + "<div class='flex_row_container NCIdrecLines' attr-rowId = '" + sRowId[b] + "' attr-IdType = '" + uIDType[a] + "'>";
                            for (t = 0; t < sListOfFields.length; t++) {
                                sFieldMap = sListOfFields[t].split('=');

                                if (t == 0) {

                                    var prrole = SiebelApp.S_App.GetProfileAttr("VHA Role Name");
                                    var RoleRespFnd = "";

                                    try {
                                        RoleRespFnd = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_CUSTID_ROLE_RESP' AND [List Of Values.Name]= '" + prrole + "' AND [List Of Values.Active]='Y'", {
                                            "All": "true"
                                        })[0].Description;
                                    } catch (e$0) {
                                        RoleRespFnd = "";
                                    }

                                    if (RoleRespFnd == null || RoleRespFnd == "") {

                                        try {
                                            var visiblechar = resultArr[b][sFieldMap[0]].substr(resultArr[b][sFieldMap[0]].length - 2, resultArr[b][sFieldMap[0]].length);

                                            var hashchar = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Name]= 'CUSTHASH' AND [List Of Values.Active]='Y'", {
                                                "All": "true"
                                            })[0].Value;

                                            hashchar = hashchar.substr(0, resultArr[b][sFieldMap[0]].length - 2);

                                            var wholestr = resultArr[b][sFieldMap[0]] = hashchar + visiblechar;
                                            resultArr[b][sFieldMap[0]] = hashchar + visiblechar;

                                        } catch (e) {}
                                    }
                                }

                                if (sFieldMap[1] == "Date of Birth" || (sFieldMap[1] == "Expiry Date" && uIDType[a] != "Medicare Card") || sFieldMap[1] == "Issue Date") {
                                    /*if((sFieldMap[1]=="Issue Date" && resultArr[b]["Id Type"]=="Proof of Age Card(Govt Issued)" && resultArr[b]["Issuer"]!="VIC" && resultArr[b]["Issuer"]!="ACT" && resultArr[b]["Issuer"]!="Default") || (sFieldMap[1]=="Expiry Date" && resultArr[b]["Id Type"]=="Proof of Age Card(Govt Issued)" && resultArr[b]["Issuer"]!="NSW" && resultArr[b]["Issuer"]!="WA" && resultArr[b]["Issuer"]!="NT" && resultArr[b]["Issuer"]!="QLD" && resultArr[b]["Issuer"]!="Default")){}*/
                                    var sNewdt = formatDate_mmtoMon(resultArr[b][sFieldMap[0]]);
                                    sFinalHTML = sFinalHTML + "<div name='" + sFieldMap[1] + "' actualdt='" + resultArr[b][sFieldMap[0]] + "' class='vhaidattflds'" + " id='" + sFieldMap[1].replace(/ /g, "") + "'>" + sNewdt + "</div>";
                                } else if (uIDType[a] == "Medicare Card" && sFieldMap[1] == "Expiry Date") {
                                    var sCardColor = resultArr[b]["Card Color"];
                                    if (sCardColor == "Green")
                                        var sNewdt = formatDate_MMYYYY(resultArr[b][sFieldMap[0]]);
                                    else
                                        var sNewdt = formatDate_DDMMYY(resultArr[b][sFieldMap[0]]);
                                    sFinalHTML = sFinalHTML + "<div name='" + sFieldMap[1] + "' actualdt='" + resultArr[b][sFieldMap[0]] + "' class='vhaidattflds'" + " id='" + sFieldMap[1].replace(/ /g, "") + "'>" + sNewdt + "</div>";
                                } else
                                    sFinalHTML = sFinalHTML + "<div name='" + sFieldMap[1] + "' class='vhaidattflds'" +
                                        " id='" + sFieldMap[1].replace(/ /g, "") + "'>" + resultArr[b][sFieldMap[0]] + "</div>";
                            }
                            var sIdT = uIDType[a].replace("'", "");
                            if (SiebelApp.S_App.GetActiveView().GetName() == "VHA ToT Common View") {
                                sFinalHTML = sFinalHTML + "</div><div attr-rowId = '" + sRowId[b] + "'><img class='idediticon' src='images/custom/edit_icon_nc.png' idtyp='" + sIdT + "'/><img class='iddelicon' src='images/custom/delete.png' idtyp='" + sIdT + "'/></div>";
                            } else {
                                sFinalHTML = sFinalHTML + "</div><div attr-rowId = '" + sRowId[b] + "'><img class='idediticon' src='images/custom/edit_icon_nc.png' idtyp='" + sIdT + "'/></div>";
                            }
                        }
                    }
                    sFinalHTML = sFinalHTML + "</div>";
                }
                sFinalHTML = sFinalHTML + "</div></div>";
                $('#NCCommonSec').after(sFinalHTML);
                sBindClck(pm);
                idDelIcon(pm);
            }
            function idDelIcon(pm) {
                $("#iddel").remove();
                $("body").append(
                    '<div id="iddel" style="height:100% !important; width:480px !important">\
                    Are you sure you want to Delete ID?\
                    </div>');
                $("#iddel").dialog({
                    autoOpen: false,
                    modal: true,
                    //title:'<div class="vha-tot-close"></div>',
                    //titleHtml:true,
                    buttons: [{
                            text: "No",
                            "class": "vha-custom-button btn vhasecondarybtn",
                            click: function () {
                                $(this).dialog("close");
                            }
                        }, {
                            text: "Yes",
                            "class": "vha-custom-button btn btn-secondary vhacntbtn",
                            click: function () {
                                var headerBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Temp Contact Id BC");
                                var Inputs = SiebelApp.S_App.NewPropertySet();
                                var Outs = SiebelApp.S_App.NewPropertySet();
                                Inputs.SetProperty("TempConId", sessionStorage.getItem('currRowId'));
                                if (sessionStorage.getItem('IdType') == "Driver") {
                                    var dl = "Driver's Licence"
                                        Inputs.SetProperty("IDType", dl);

                                } else {
                                    Inputs.SetProperty("IDType", sessionStorage.getItem('IdType'));
                                }
                                Outs = VHAAppUtilities.CallBS(
                                        "VHA TOT TBUI Service", "DeleteTOTContactIDs",
                                        Inputs, {});

                                if ($('[attr-rowid="' + sessionStorage.getItem('currRowId') + '"]').parent().find('.NCIdrecLines').length < 2) {
                                    $('[attr-rowid="' + sessionStorage.getItem('currRowId') + '"]').parent().remove();
                                    $('[headerrow-id="' + sessionStorage.getItem('IdType') + '"]').remove();

                                } else {
                                    $('[attr-rowid="' + sessionStorage.getItem('currRowId') + '"]').remove();
                                }

                                $(this).dialog("close");
                                /*var sService = SiebelApp.S_App.GetService("VHA TOT TBUI Service");
                                var Inps = SiebelApp.S_App.NewPropertySet();
                                var ops = SiebelApp.S_App.NewPropertySet();
                                Inps.SetProperty("TempConId", sessionStorage.getItem('currRowId'));
                                Inps.SetProperty("IDType", sessionStorage.getItem('IdType'));
                                ops = sService.InvokeMethod("DeleteTOTContactIDs", Inps);
                                $('[attr-rowid="'+sessionStorage.getItem('currRowId')+'"]').parent().remove();
                                $('[headerrow-Id="'+sessionStorage.getItem('currRowId')+'"]').remove();

                                $(this).dialog("close");*/

                            }
                        }
                    ],
                    width: "400px",
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                    open: function (event, ui) {
                        $('[aria-describedby="iddel"] .ui-dialog-titlebar').append('<div class="vha-tot-close"></div>');
                        $('[aria-describedby="iddel"] .ui-dialog-title').remove();
                        $('.vha-tot-close').off("click").on("click", function () {
                            $("#iddel").dialog("close");
                        });
                    },
                    close: function (event, ui) {
                        $('.vha-tot-close').remove();
                    }
                });

            }
            function sBindClck(pm) {
                $('.idediticon').on("click", function () {
                    var sIdFound = false;
                    $('#SuccessMessage').text("");
                    var sIdT = $(this).attr("idtyp");
                    /*var sListOfPPFields=["Gender","Country","Expiry Date","Date of Birth","Given Name","Surname","Passport Number","Passport Number","Surname","Given Name","Date of Birth","Expiry Date","Country","Gender"];
                    var sListOfDLFields=["Issuer","Country","Date of Birth","Expiry Date","License Number","Surname","Given Name","Given Name","Surname","License Number","Expiry Date","Date of Birth","Country","Issuer"];
                    var sListOfMCFields=["Card Colour","Expiry Date","Given Name","Surname","Medicare Line Number","Medicare Reference Number","Medicare Reference Number","Medicare Line Number","Surname","Given Name","Medicare Expiry Date","Card Color"];
                    var sListOfVisaFields=["Country","Gender","Expiry Date","Date of Birth","Given Name","Surname","Surname","Given Name","Passport Number","Date of Birth","Expiry Date","Gender","Country Visa"];
                    var sListOfCommonFields=["Expiry Date","Issuer","Country of Issue","Id Reference Number","Surname","Given Name","Given Name","Surname","Id Reference Number","Country Of Issue","Issuer","Expiry Date"];
                    //var sIdT=$(this).closest('.flex_row_container').prev().text();*/
                    sIdT = sIdT.replace("Attached ID - ", "");
                    var sCty = $(this).parent().parent().find('.NCIdrecLines .vhaidattflds[name="Country"]').text();
                    var sIsPPOrIP = (getFlow() == "Prepay" || getFlow() == "NameChange") ? "Passport" : (sCty == "Australia" || sCty == "New Zealand") ? "Passport" : "International Passport";
                    sIdT = (sIdT == "Drivers Licence") ? "Driver's Licence" : (sIdT == "Passport") ? sIsPPOrIP : sIdT;
                    if ($('.ui-segment [value="' + sIdT + '"]').length > 0) {
                        sIdFound = true;
                        $('.ui-segment [value="' + sIdT + '"]').click();
                    } else {
                        var sFlw = (getFlow() == "Prepay" || getFlow() == "NameChange") ? "Prepaid" : "Postpaid";
                        var sResOthers = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_NC_IDTYPE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='" + sIdT + "' AND [List Of Values.Sub Type]='" + sFlw + "'");
                        var sResOffers = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_TOT_OFFERIDTYPE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='" + sIdT + "' AND [List Of Values.Sub Type]='" + sFlw + "'");
                        if (sResOthers.length > 0) {
                            pm.Get("GetBusComp").SetFieldValue("Other Id Type", sIdT);
                            pm.Get("GetBusComp").SetFieldValue("ID Type", sIdT);
                            sIdFound = true;
                        }
						var uOfferIdType = "Offer_Id_Types_Label_"+pm.Get("GetId");
                        if (sResOffers.length > 0 && (!$('[aria-labelledby='+uOfferIdType+']').parent().hasClass("VFDisplayNone"))) {
                            pm.Get("GetBusComp").SetFieldValue("Offer Id Types", sIdT);
                            pm.Get("GetBusComp").SetFieldValue("ID Type", sIdT);
                            sIdFound = true;
                        } else if (sIdT == "Medicare Card" && sFlw == "Postpaid") {
                            var sCdClr = $(this).parent().parent().find('.NCIdrecLines .vhaidattflds#CardColor').text();
                            if (sCdClr == "Green") {
                                pm.Get("GetBusComp").SetFieldValue("Other Id Type", "Green Medicare Card");
                                pm.Get("GetBusComp").SetFieldValue("ID Type", "Green Medicare Card");
                                sIdFound = true;
                            }
                        }
                        if (sIdFound)
                            $('#NCCustDetailsApplet .ui-segment button.active').removeClass('active');

                        //mOthersToggle(pm);
                    }

                    if (sIdFound) {

                        $(this).parent().parent().find('.NCIdrecLines .vhaidattflds').each(function (attindex, attitem) {
                            $(".vhaidfields").each(function (index, item) {
                                if ($(attitem).attr("name") == $(item).attr("lblname")) {
                                    if ($(item).attr("lblname") == "Date of Birth" || ($(item).attr("lblname") == "Expiry Date" && sIdT != "Medicare Card") || $(item).attr("lblname") == "Issue Date")
                                        item.value = formatDate_mmddtoddmm($(attitem).attr("actualdt"));
                                    else if (($(item).attr("lblname") == "Expiry Date" && sIdT == "Medicare Card")) {
                                        item.value = ($(attitem).attr("actualdt"));
                                    } else
                                        item.value = attitem.textContent;
                                }
                            });
                        });
                    }
                    if ($('#vhaidtoggler').length > 0) //To show images
                    {
                        //$('#vhaidtoggler').val($('#vhaidtoggler').val()).trigger("change");
                        var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other Id Type");
                        var sOffer = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Offer Id Types");
                        var sId = ($('.ui-segment .active').length > 0) ? $('.ui-segment .active').attr("value") : (sOther != "") ? sOther : sOffer;
                        var sFilenm = getIDimg(sId, $('#vhaidtoggler').val());
                        var imgdiv = "";
                        sId = (sId == "Driver's Licence") ? "Driving Licence" : sId;
                        if (sFilenm != "")
                            imgdiv = '<span>Sample ' + sId + '</span><div><img src=images/custom/IDProofImages/' + sFilenm + '></div>';
                        //imgdiv='<div id="vhaidimgcol">'+imgdiv+'</div>';
                        if ($('#vhaidimgcol').length == 0)
                            $('#vhaidimgcol').append(imgdiv);
                        else
                            $('#vhaidimgcol').html(imgdiv);
                        /*if($('.vhaidparrow #vhaidimgcol img').length==0)
                        $('.vhaidparrow').append(imgdiv);
                        else
                        $('.vhaidparrow #vhaidimgcol').html(imgdiv);*/

                    }
                    /*var sListOfFields=(sIdT=="Passport")?sListOfPPFields:(sIdT=="Driver's Licence")?sListOfDLFields:(sIdT=="Medicare Card")?sListOfMCFields:(sIdT=="VISA")?sListOfVisaFields:sListOfCommonFields;

                    for(x=0;x<sListOfFields.length/2;x++){
                    var sSelctr="#"+sListOfFields[x].replace(/ /g,"");
                    //var sChildArr=$(this).closest('.flex_row_container').find(sSelctr);
                    var sChildArr=$(this).parent().parent().find('.NCIdrecLines').find(sSelctr);

                    var sVal=sChildArr.text();
                    var sCtls=pm.Get("GetControls");
                    var sFldNm=sCtls[sListOfFields[sListOfFields.length-x-1]].GetFieldName();;
                    pm.Get("GetBusComp").SetFieldValue(sFldNm,sVal);


                    }*/
                });
                $('.iddelicon').on("click", function () {

                    var sRowId = $(this).parent().parent().find('.NCIdrecLines').attr('attr-rowid');
                    var IdType = $(this).parent().parent().find('.NCIdrecLines').attr('attr-IdType');

                    sessionStorage.setItem('currRowId', sRowId);
                    sessionStorage.setItem('IdType', IdType);
                    $("#iddel").dialog("open");

                });
            }
            function mOthersToggle(pm) {
                $('#SuccessMessage').text("");
                $('.ui-segment').find("button.option").removeClass("active");
                if ($('#NCIdDetails .VHATOTIdApplet.VFDisplayNone').length > 0)
                    $('#NCIdDetails .VHATOTIdApplet').removeClass('VFDisplayNone');
                $('#NCCommonSec.VFDisplayNone').removeClass('VFDisplayNone');
                $('.flex_column_container').find('.VFDisplayNone').removeClass('VFDisplayNone');
                var controls = pm.Get("GetControls");
                ["License Number", "Medicare Line Number", "Card Color", "Medicare Reference Number", "Person Name", "Medicare Expiry Date", "Id Type", "Country Visa", "Country", "Date of Birth", "Passport Number", "Gender", "Q Condition"].forEach(function (item, index) {
                    var sCtl = controls[item];
                    $("[name ='" + sCtl.GetInputName() + "']").closest('div').parent().addClass('VFDisplayNone');
                });

            }

            /*function getSeqData(){
            var jData = "";
            $.ajax({
            url:"scripts/siebel/custom/IDCaptureJson.txt",
            dataType: 'json',
            success:function(data){
            jData = data["IDType"];
            },
            async:false
            });
            return jData;
            }*/

            function createIDdiv(iType, sRef) {
                //var obj = getSeqData();
                $('#SuccessMessage').text("");
                var objItems = "";
                var nrowcnt = "";
                var arrSeq = "";
                var obj = jData; //JSON.parse(jsonD);
                for (i = 0; i < obj.length; i++) {
                    if (obj[i].name == iType) {
                        objItems = obj[i].items;
                        //set default seq at last if not found
                        sRef = sRef == undefined ? "Default" : sRef;
                        sRef = (((iType == "International Passport" || iType == "VISA") && sRef != "India" && sRef != "China" && sRef != "Nepal") || (iType == "Passport" && sRef != "Australia" && sRef != "New Zealand")) ? "Default" : sRef;
                        //sRef=(iType=="VISA")?"Default":sRef;
                        //fetch seq fields
                        for (j = 0; j < objItems.length; j++) {
                            if (objItems[j].name == sRef) {
                                var arrSeq = objItems[j].Sequence;
                                if (Math.abs(arrSeq.length % 2) == 1) {
                                    nrowcnt = (arrSeq.length - 1) / 2;
                                    nrowcnt++;
                                } else {
                                    nrowcnt = (arrSeq.length) / 2;
                                }
                                break;
                            }
                        }
                        break;
                    }
                }

                var createcol = 0;
                var html = "";
                var fieldrwhtml = '<div class="vhaidparrow idcontainerchdft"><div class="vhaidfieldcol">';
                var d = 0;
                for (a = 0; a < nrowcnt; a++) {
                    createcol = createcol + 2;
                    var fcls = 'vhaidfieldrow' + a;
                    fieldrwhtml = fieldrwhtml + '<div id=' + fcls + ' class="vhaidfieldrow">';
                    for (b = (createcol - 2); (b < createcol && b < arrSeq.length); b++) {
                        var vhaidwd = "";
                        //if(arrSeq[b]!="ID Sighted" && arrSeq[b]!="Q Condition")
                        //midlename
                        //"Proof of Age Card(Govt Issued)"
                        var s = (b + 1) - d + '. ';
                        /*if(arrSeq[b]=="ID Sighted")
                        s='';*/
                        if ((iType == "Proof of Age Card(Govt Issued)" && arrSeq[b] == "Middle Name" && sRef != "WA") || arrSeq[b] == "ID Sighted" || arrSeq[b] == "Country") {
                            d = 1;
                            s = ''
                        }
                        var sl = s + arrSeq[b];
                        fieldrwhtml = fieldrwhtml + '<div class="vhaidcol"><label class="vhaidlabel">' + sl + '</label>';
                        var sFieldnm = arrSeq[b];
                        switch (arrSeq[b]) {
                        case "Expiry Date":
                        case "Date of Birth":
                        case "Issue Date":
                            vhaidwd = "vhaidfields-w2";
                            if (iType == "Medicare Card" && arrSeq[b] == "Expiry Date")
                                sFieldnm = "Medicare Expiry Date";
                            if (arrSeq[b] == "Date of Birth")
                                sFieldnm = "DOB";
                            if (iType == "Medicare Card" && arrSeq[b] == "Expiry Date") {
                                sFieldnm = "Medicare Expiry Date";
                                fieldrwhtml = fieldrwhtml + '<div><input type="text" lblname="' + arrSeq[b] + '" name="' + sFieldnm + '" class="vhaidfields ' + vhaidwd + '"/></div>';
                            } else {
                                fieldrwhtml = fieldrwhtml +
                                    '<div data-provider="datepicker"><div><input type="text" lblname="' + arrSeq[b] + '" name="' + sFieldnm + '" class="vhacalpick vhaidfields ' + vhaidwd + '"/>' +
                                    '<span class="siebui-icon-date applet-form-date">' +
                                    '</span></div></div>';
                            }
                            break;
                        case "Q Condition":
                        case "ID Sighted":
                            if (arrSeq[b] == "ID Sighted")
                                sFieldnm = "DVS Override Flag";
                            vhaidwd = "vhaidfields-w2";
                            /*if((arrSeq[b]=="ID Sighted" && getFlow()=="Prepaid")||(arrSeq[b]=="Q Condition" && getFlow()=="Postpaid")){
                            fieldrwhtml=fieldrwhtml+'<div class="vhaidcol"><label class="vhaidlabel">'+(b+1)+'. '+arrSeq[b]+'</label>'+
                            '<div><input type="checkbox" lblname="'+arrSeq[b]+'" name="'+sFieldnm+'" class="vhaidfields '+vhaidwd+'"/></div>'};*/
                            fieldrwhtml = fieldrwhtml + '<div><input type="checkbox" lblname="' + arrSeq[b] + '" name="' + sFieldnm + '" class="vhaidfields ' + vhaidwd + '"/></div>';
                            break;
                        case "Country Of Issue":
                        case "Issuer":
                        case "Gender":
                            vhaidwd = "vhaidfields-w2";
                            //getpick list
                            var selectVal = "";
                            if (arrSeq[b] == "Country Of Issue")
                                selectVal = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='COUNTRY' AND [List Of Values.Active]='Y'");
                            if (arrSeq[b] == "Issuer")
                                selectVal = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_ID_ISSUER' AND [List Of Values.Active]='Y'");
                            if (arrSeq[b] == "Gender")
                                selectVal = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='SEX_MF' AND [List Of Values.Active]='Y'");
                            var option = '<div><select lblname ="' + arrSeq[b] + '" name ="' + sFieldnm + '" class="vhaidfields ' + vhaidwd + '">';
                            for (var i = 0; i < selectVal.length; i++) {
                                option += '<option value="' + selectVal[i] + '">' + selectVal[i] + '</option>';
                            }
                            option += '</select></div>';
                            fieldrwhtml = fieldrwhtml + option;
                            break;
                        default:
                            ["Medicare Card Number", "Id Reference Number", "License Number", "Passport Number"].forEach(function (item, index) {
                                if (arrSeq[b] == item)
                                    sFieldnm = "Reference Number";
                            });
                            if (arrSeq[b] == "Country Of Issue" || (arrSeq[b] == "Country" && iType == "Passport"))
                                sFieldnm = "Country";
                            if (arrSeq[b] == "Country" && (iType == "VISA" || iType == "International Passport"))
                                sFieldnm = "Country Visa";
                            if (arrSeq[b] == "Medicare Line Number")
                                sFieldnm = "Medicare Reference Number";
                            if (arrSeq[b] == "Person Name")
                                sFieldnm = "Given Name";
                            if (arrSeq[b] == "First Name")
                                sFieldnm = "Given Name";
                            if (arrSeq[b] == "Last Name")
                                sFieldnm = "Surname";
							if (arrSeq[b] == "Card Number")
                                sFieldnm = "Driving License Card Number";
                            vhaidwd = "vhaidfields-w1";
                            fieldrwhtml = fieldrwhtml + '<div><input type="text" lblname="' + arrSeq[b] + '" name="' + sFieldnm + '" class="vhaidfields ' + vhaidwd + '"/></div>';
                            break;
                        }
                        fieldrwhtml = fieldrwhtml + '</div>';
                    }
                    fieldrwhtml = fieldrwhtml + '</div>';
                }
                //var sFilenm = sRef!="Default"?getIDimg(iType, sRef):"";
                var sFilenm = getIDimg(iType, sRef);
                var imgdiv = "";
                var iTypeDisp = (iType == "Driver's Licence") ? "Driving Licence" : iType;
                if (sFilenm != "")
                    imgdiv = '<span>Sample ' + iTypeDisp + '</span><div><img src=images/custom/IDProofImages/' + sFilenm + '></div>';

                fieldrwhtml = fieldrwhtml +
                    '</div><div id="vhaidimgcol">' + imgdiv + '</div></div>';
                /*'<div id="vhaidvaladd" style="float: left;"><button class="vhatotverifybtn ml-3 NCvalidatebun">Validate and add</button></div>';*/
                $('.vhacustomidbox').append(fieldrwhtml);                
                if (iType == "Driver's Licence" && $('#vhaidtoggler').val()!=undefined) { //To default value
                    $('[name="Country"]').val('Australia').attr("disabled", "true");
                    //??
                    var CNReq = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_DL_ISSUER' AND [List Of Values.Active]='Y'", {
                        "All": "true"
                    }).filter(function (e) {
                        return e.Name == $('#vhaidtoggler').val();
                    })[0].Value;
					if (CNReq == 'N') {
						$('[name="Driving License Card Number"]').attr("disabled", "true");
					}
                }
                $('.vhacalpick').datepicker({
                    dateFormat: "dd/mm/yy",
                    showOn: "button"
                });
                $('.vhacalpick').next().hide();
                $('.siebui-icon-date').click(function () {
                    $(this).prev().datepicker('show');
                });

                $('.vhacalpick').mousedown(function () {
                    $(this).datepicker('hide');
                });
                $('[lblname="ID Sighted"]').attr("disabled", "disabled");

            } // func creatediv end

            function getFlow() {
                if (SiebelApp.S_App.GetActiveView().GetName() == "VHA Name Change Capture Id Details View") {
                    return "NameChange";
                } else {

                    SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Transfer Authorization Applet"].GetPModel().ExecuteMethod("InvokeMethod", "RefreshRecord", SiebelApp.S_App.NewPropertySet());

                    var busObj = SiebelApp.S_App.GetActiveBusObj();
                    var bc = busObj.GetBusCompByName("VHA TOT Generic BC");
                    var sSerIden = bc.GetFieldValue("Service Identifier");
                    return sSerIden;
                }
            }

            function getIDimg(sIdType, sToggler) {
                var sIdDisp = sIdType;
                //sIdType=(sIdType=="International Passport")?"Passport":sIdType;
                if (sIdType == "International Passport" && sToggler == "Default")
                    sIdType = "Passport|Default";
                else if (sIdType == "International Passport" && sToggler != "Default")
                    sIdType = "Passport";
                else
                    sIdType = sIdType;
                sToggler = sToggler == "Green" ? "Green Medicare Card" : sToggler == "Blue" ? "Interim Medicare Card" : sToggler == "Yellow" ? "Reciprocal Medicare Card" : sToggler;
                //sIdType=(sIdType=="Passport")?sIdType+"|Australia":sIdType.replace("'","")+"|"+sToggler;

                //sIdType=(sToggler!="Default")?((sIdDisp=="Passport")?sIdType+"|Australia":(sIdType=="Medicare Card")?sToggler:sIdType.replace("'","")+"|"+sToggler):sIdType.replace("'","");
                sIdType = (sToggler != "Default") ? (sIdType == "Medicare Card") ? sToggler : sIdType.replace("'", "") + "|" + sToggler : sIdType.replace("'", "");
                var SearchString = "[List Of Values.Type]='VHA_ID_SAMPLE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='" + sIdType + "'";
                var sFileName = VHAAppUtilities.GetPickListValues("", SearchString);
                var sBgImgVal = "images/custom/IDProofImages/" + sFileName;
                return sFileName;

            }

            function toggleIdBox(idtype, pm1) {
                if ($('.vhacustomidbox').length > 0) {
                    $(".vhaidfields").each(function (index, item) {
                        if (item.name != "Country")
                            pm1.Get("GetBusComp").SetFieldValue(item.name, "");
                    });
                    $('.vhacustomidbox').empty();
                }

                idtype == "International Passport" ? pm1.Get("GetBusComp").SetFieldValue("ID Type", "Passport") : (idtype == "Green Medicare Card") ? pm1.Get("GetBusComp").SetFieldValue("ID Type", "Medicare Card") : pm1.Get("GetBusComp").SetFieldValue("ID Type", idtype);

                var sToggler = "";
                var selectVal = "";
                var sFieldnm = "";
                //build select toggler
                var sdisable = "false";
                switch (idtype) {
                case "Passport":
                    if (getFlow() == "Postpay") {
                        selectVal = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='COUNTRY' AND [List Of Values.Active]='Y' AND ([List Of Values.Value]='Australia' OR [List Of Values.Value]='New Zealand')");
                        $('.ui-segment button[value="Passport" ]').text("Australian/NZ Passport");
                        sToglerFld = "Country";
                        sFieldnm = "Country";
                    } else {
                        selectVal = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='COUNTRY' AND [List Of Values.Active]='Y'");
                        sToglerFld = "Country";
                        sFieldnm = "Country";
                        sdisable = "true";
                    }
                    break;
                case "Driver's Licence":
                case "Proof of Age Card(Govt Issued)":
                    selectVal = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_ID_ISSUER' AND [List Of Values.Active]='Y'");
                    sToglerFld = "Issuer";
                    sFieldnm = "Issuer";
                    break;
                case "International Passport":
                case "VISA":
                    selectVal = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='COUNTRY' AND [List Of Values.Active]='Y' AND [List Of Values.Value]<>'Australia' AND [List Of Values.Value]<>'New Zealand'");
                    sToglerFld = "Country";
                    sFieldnm = "Country Visa";
                    break;
                case "Green Medicare Card":
                case "Medicare Card":
                    selectVal = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_UNISIM_CARDCOLOR_TBUI' AND [List Of Values.Active]='Y'");
                    sToglerFld = "Card Color";
                    sFieldnm = "Card Color";
                    break;
                default:
                    break;
                }

                if (selectVal != "") {
                    var option = '<div><span class ="vhaidTogglerlbl">' + sToglerFld + ': </span><select id="vhaidtoggler" lblname ="' + sToglerFld + '" name ="' + sFieldnm + '"' +
                        ' class="vhaidfields">';
                    for (var i = 0; i < selectVal.length; i++) {
                        option += '<option value="' + selectVal[i] + '">' + selectVal[i] + '</option>';
                    }
                    option += '</select></div>';
                    $('.vhacustomidbox').append(option);
                }

                idtype == "Passport" && getFlow() != "Postpay" ? $('#vhaidtoggler').val('Australia') : idtype == "Passport" && getFlow() == "Postpay" ? $('#vhaidtoggler').val('Australia') : idtype == "Green Medicare Card" ? $('#vhaidtoggler').val('Green').attr("disabled", "true") : $('#vhaidtoggler').val('');

                idtype = (idtype == "Green Medicare Card") ? "Medicare Card" : idtype;
                createIDdiv(idtype, $("select#vhaidtoggler").children("option:selected").val());

                $("select#vhaidtoggler").change(function () {
                    $(".vhaidfields").each(function (index, item) {
                        var idpmbc = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp");
                        idpmbc.SetFieldValue(item.name, "");
                    });
                    $('.vhaidparrow').remove();
                    var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other Id Type");
                    sOther = (sOther == "Green Medicare Card") ? "Medicare Card" : sOther;
                    var sOffer = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Offer Id Types");
                    var sId = ($('.ui-segment .active').length > 0) ? $('.ui-segment .active').attr("value") : (sOther != "") ? sOther : sOffer;
                    createIDdiv(sId, $("select#vhaidtoggler").children("option:selected").val());
                    //alert("You have selected the country - " + selectedCountry);
                    //$('#countryp').val(selectedCountry).trigger("change");
                    removeFldsflow();
                });

                if (getFlow() == "NameChange") {
                    $('#vhaidvaladd>button').off("click").on("click", function () {
                        //validation
                        var idReqfldsErr = "N";
                        var idtyp = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Add Identification Details VBC").GetFieldValue("ID Type");
                        $(".vhaidfields").each(function (index, item) {
                            switch (idtyp) {
                            case "Defence Force ID":
                            case "Pensioner Card":
                            case "Student ID":
                            case "DVA Health Care Card":
                            case "Gold Veteran Affairs Card":
                                if (item.value == "" && (
                                        $(item).attr("lblname") == "First Name"
                                         || $(item).attr("lblname") == "Last Name"
                                         || $(item).attr("lblname") == "Date of Birth"
                                         || $(item).attr("lblname") == "Id Reference Number"
                                         || $(item).attr("lblname") == "Country") && (!item.disabled)) {
                                    $(item).addClass('VHAToTnullerr');
                                    idReqfldsErr = "Y";
                                }
                                break;
                            default:
                                if (item.value == "" && $(item).attr("lblname") != "Middle Name" && $(item).attr("lblname") != "Issue Date" && $(item).attr("lblname") != "ID Sighted" && (!item.disabled)) {
                                    $(item).addClass('VHAToTnullerr');
                                    idReqfldsErr = "Y";
                                }
                                break;
                            }
                        });

                        //set field value
                        if (idReqfldsErr == "N") {
                            var sProceed = true;
                            $(".vhaidfields[lblname='First Name'],.vhaidfields[lblname='Last Name'],.vhaidfields[lblname='Middle Name'],.vhaidfields[lblname='Person Name'],.vhaidfields[lblname='Id Reference Number']").each(function (index, item) {
                                var sUniqAddrId = ["TotFN", "TotLN", "TotMN", "TotPN", "TotREF"];
                                var sSelct = '#' + sUniqAddrId[index];
                                if (sUniqAddrId = sUniqAddrId[4]) {
                                    var sRegEx = new RegExp("^[a-zA-Z0-9\-' ]*$");
                                } else {
                                    var sRegEx = new RegExp("^[a-zA-Z ]*$");
                                }
                                var sValPassed = sRegEx.test(item.value);
                                console.log(sValPassed);
                                if ((!sValPassed) && $(sSelct).length == 0 && item.value != "") {
                                    /*$(item).addClass('VHAToTnullerr');
                                    $(item).after("<div class='authvalidation' id='"+sUniqAddrId[index]+"' style='color:red;margin-bottom: 20px;'>Please avoid special characters </div>")*/
                                    $('#SuccessMessage').text("Please avoid special characters").addClass("TOTRedFont");
                                    sProceed = false;
                                }
                            });
                            if (sProceed == true) {
                                VHANameChangeCaptureIdPR.callDVS();
                            }
                        } else
                            $('#SuccessMessage').text("Please enter the value of required fields").addClass("TOTRedFont");
                    });

                }
                removeFldsflow();

                $(".vhaidfields").on('focus', function () {
                    $(this).removeClass('VHAToTnullerr');
                });

            }
            VHANameChangeCaptureIdPR.callDVS = function () {
                $(".vhaidfields").each(function (index, item) {
                    var idpmbc = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Add Identification Details VBC");
                    //SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp");
                    var sval = item.type == "checkbox" ? (item.checked == true) ? "Y" : "N" : item.value;
                    var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other Id Type");
                    var sOffer = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Offer Id Types");
                    var sId = ($('.ui-segment .active').length > 0) ? $('.ui-segment .active').attr("value") : (sOther != "") ? sOther : sOffer;
                    if (item.name == "DOB" || (item.name == "Expiry Date" && sId != "Medicare Card") || item.name == "Issue Date")
                        sval = formatDate_mmddtoddmm(sval);
                    if (item.name == "Country") {
                        var sInp = SiebelApp.S_App.NewPropertySet();
                        sInp.SetProperty("Profile Attribute Name", "VHAPassportCountry");
                        sInp.SetProperty("Profile Attribute Value", sval);
                        VHAAppUtilities.CallBS("SIS OM PMT Service", "Set Profile Attribute", sInp);
                    }
                    idpmbc.SetFieldValue(item.name, sval);
                });
                var inps = SiebelApp.S_App.NewPropertySet();
                var apMap = SiebelApp.S_App.GetActiveView().GetAppletMap();
                apMap["VHA Name Change Capture Id Details Applet"].GetPModel().ExecuteMethod("InvokeMethod", "mDVSValidate", inps);
            }

            function removeFldsflow() {
				
				//var uOfferIdType1 = "Offer_Id_Types_Label_"+pm1.Get("GetId");
                $('select[name="Gender"]').val('');
                if (getFlow() == "Prepay" || getFlow() == "NameChange") {
                    $(".vhaidlabel").each(function (index, item) {
                        if ($(item).text().search("Q Condition") > -1) {
                            $(item).parent().remove();
                        }
                    });
                    $('[aria-label="Offer Id Types"]').parent().addClass("VFDisplayNone");
                    //pm1.Get("GetBusComp").SetFieldValue("Offer Id Types","");
                    //pm1.Get("GetBusComp").SetFieldValue("ID Type","");
                } else {

                    $(".vhaidlabel").each(function (index, item) {
                        if ($(item).text() == "ID Sighted") {
                            $(item).parent().remove();
                        }
                    });
                    $('[aria-label="Offer Id Types"]').parent().removeClass("VFDisplayNone");
                }
            }
            function formatDate_mmtoMon(dte) {
                if (dte == "") {
                    return "";
                } else {
                    var sDtArr = dte.split("/");
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var sMonthName = monthNames[parseInt(sDtArr[0]) - 1];
                    var sNewDt = sDtArr[1] + " " + sMonthName + " " + sDtArr[2];
                    return sNewDt;
                }
            }
            function formatDate_mmddtoddmm(dte) {
                if (dte == "") {
                    return "";
                } else {
                    var sDtArr = dte.split("/");
                    var sNewDt = sDtArr[1] + "/" + sDtArr[0] + "/" + sDtArr[2];
                    return sNewDt;
                }
            }
            function formatDate_MMYYYY(dte) {
                if (dte == "") {
                    return "";
                } else {
                    var sDtArr = dte.split("/");
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var sMonthName = monthNames[parseInt(sDtArr[0]) - 1];
                    var sNewDt = sMonthName + " " + sDtArr[1];
                    return sNewDt;
                }
            }
            function formatDate_DDMMYY(dte) {
                if (dte == "") {
                    return "";
                } else {
                    var sDtArr = dte.split("/");
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var sMonthName = monthNames[parseInt(sDtArr[1]) - 1];
                    var sNewDt = sDtArr[0] + " " + sMonthName + " " + sDtArr[2];
                    return sNewDt;
                }
            }
            VHANameChangeCaptureIdPR.mShowUi = function () {
                //$('.siebui-icon-mdvsvalidate').replaceWith('<button id="vha-idvalidateadd" class="vhatotverifybtn ml-3">Validate and Add</button>');
                var sAppList = SiebelApp.S_App.GetActiveView().GetAppletMap();
                if (SiebelApp.S_App.GetActiveView().GetName() == "VHA Name Change Capture Id Details View") {
                    $(".VHAScanAndUpload").remove(); //Scan and upload not required in name change
                }
                if (SiebelApp.S_App.GetActiveView().GetName() == "VHA ToT Common View") {
                    var busObj = SiebelApp.S_App.GetActiveBusObj();
                    var bc = busObj.GetBusCompByName("VHA TOT Generic BC");
                    var scanStat = bc.GetFieldValue("ID Scan Status Display");
                    var serviceAs = bc.GetFieldValue("Transferring Service As");
                    $("#VHAScanStatus").html(scanStat);
                    if (scanStat == "Upload Successful") {
                        $('#vhatotscannerbtn').prop('disabled', true);
                        $('#vhatotuploadfailedbtn').prop('disabled', true);
                        $('#VHAScanBtn').prop('disabled', true);
                    }

                }
                //bm100734 - Start
                if (SiebelApp.S_App.GetActiveView().GetName() == "VHA Name Change Capture Id Details View") {
                    var sCustBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Prepay Name Change BC");
                    $(".NCCustVal").append(sCustBC.GetFieldValue("Full Name Existing"));
                    $('#s_' + sAppList["VHA NameChange Customer Details List Applet"].GetFullId() + '_div').addClass("boxshdnone");
                } else {
                    setTimeout(function () {
                        $('.VHANCbottombtns').addClass("VFDisplayNone");
                    }, 5);
                }
                //bm100734 - end
                $('#' + sAppList["VHA Name Change Capture Id Details Applet"].GetFullId()).addClass("padbtwappt");
                //setTimeout(function(){$('#s_'+sAppList["VHA Name Change Capture Id Details Applet"].GetFullId()+'_div').addClass("boxshdnone")},5);
                $('#NCIdDetails .VHAJustContentleft .mceField').parent().addClass("idfieldpad");
                $('#NCIdDetails .VHAJustContentleft .mceLabel').parent().addClass("idlabelpad");

                var sAppMode = sAppList["VHA Name Change Capture Id Details Applet"].GetMode();
                if (sAppMode == "Base") {
                    setTimeout(function () {
                        $('.siebui-icon-newrecord').click();
                    }, 5);
                }
                var sFlw = getFlow();
                var sPaymentType = (sFlw == "NameChange" || sFlw == "Prepay") ? "Prepaid" : "Postpaid";
                SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("Payment Method", sPaymentType);
                function Segment(segItems, sView) {
                    var sFlw = getFlow();
                    var sPaymentType = (sFlw == "NameChange" || sFlw == "Prepay") ? "Prepaid" : "Postpaid";
                    SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("Payment Method", sPaymentType);
                    segItems.each(function () {
                        var self = $(this);
                        var onchange = self.attr('onchange');
                        var wrapper = $("<div>", {
                            class: "ui-segment"
                        });
                        $(this).find("option").each(function () {
                            switch (sFlw) {
                            case "NameChange":
                            case "Prepay":
                                if ($(this).text() != "Proof of Age Card(Govt Issued)" && $(this).text() != "International Passport")
                                    var option = $("<button>", {
                                        class: 'option vhappbtn vhabtnredbg',
                                        onclick: onchange,
                                        text: $(this).text(),
                                        value: $(this).val()
                                    });
                                break;
                            case "Postpay":
                                if ($(this).text() != "Medicare Card" && $(this).text() != "VISA")
                                    var option = $("<button>", {
                                        class: 'option vhappbtn vhabtnredbg',
                                        onclick: onchange,
                                        text: $(this).text(),
                                        value: $(this).val()
                                    });
                                break;
                            }
                            wrapper.append(option);
                        });
                        wrapper.find("button.option").click(function () {
                            wrapper.find("button.option").removeClass("active");
                            $(this).addClass("active");
                            self.val($(this).attr('value'));
                        });
                        if (!($(this).next().hasClass('ui-segment'))) {
                            $(this).after(wrapper);
                            $(this).hide();
                        }
                    });
                }
                Segment($(".segment-select"), SiebelApp.S_App.GetActiveView().GetName());
                $('.mceLabel').each(function () {
                    $(this).text($(this).text().replace(":", ""));
                });
				//var uppm = this.GetPM();
				//var uOfferIdType2 = "Offer_Id_Types_Label_"+pm1.Get("GetId");
                $('[aria-label="Others Id Type"]').attr('placeholder', 'Others');
                $('[aria-label="Others Id Type"]').focus(function () {
                    $(this).attr('placeholder', '');
                }).blur(function () {
                    $(this).attr('placeholder', 'Others');
                });
                $('[aria-label="Offer Id Types"]').attr('placeholder', 'Offer ID');
                $('[aria-label="Offer Id Types"]').focus(function () {
                    $(this).attr('placeholder', '');
                }).blur(function () {
                    $(this).attr('placeholder', 'Offer ID');
                });
                //setTimeout(function(){$('.siebui-view,.siebui-view .siebui-applet').addClass("NCBlueBG");},50);
                VHANameChangeCaptureIdPR.IDDisplay(SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetPModel());
                //$("#NCIdListHeader,#NCAttachedId").addClass("VFDisplayNone");
                if ($('#NCCustDetailsApplet .ui-segment button').length > 0)
                    setTimeout(function () {
                        $('#NCCustDetailsApplet .ui-segment button')[0].click();
                    }, 5);
            }
            return VHANameChangeCaptureIdPR;
        }
            ());
        return "SiebelAppFacade.VHANameChangeCaptureIdPR";
    });
}
