if (typeof(SiebelAppFacade.VHACaptureSameIdPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHACaptureSameIdPR");
    define("siebel/custom/VHACaptureSameIdPR", ["order!siebel/phyrenderer"], function () {
        SiebelAppFacade.VHACaptureSameIdPR = (function () {
            var pm1 = "";
            var jData = "";
            $.ajax({
                url: "scripts/siebel/custom/SameIDCaptureJson.txt",
                dataType: 'json',
                success: function (data) {
                    jData = data["IDType"];
                },
                async: false
            });
            var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
            function VHACaptureSameIdPR(pm) {
                SiebelAppFacade.VHACaptureSameIdPR.superclass.constructor.call(this, pm);
                /*this.GetPM().AttachEventHandler(siebConsts.get("PHYEVENT_APPLET_FOCUS"), function(){
                alert("call code");
                });*/
            }
            SiebelJS.Extend(VHACaptureSameIdPR, SiebelAppFacade.PhysicalRenderer);
            VHACaptureSameIdPR.prototype.ShowUI = function () {
                pm1 = this.GetPM();
                SiebelAppFacade.VHACaptureSameIdPR.superclass.ShowUI.call(this);
                VHACaptureSameIdPR.mShowUi();
				
				
            }
            VHACaptureSameIdPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHACaptureSameIdPR.superclass.BindEvents.apply(this, arguments);
                //if(SiebelApp.S_App.GetActiveView().GetName()=="VHA Capture Same Id Details View")
                {				
					 
					
                    sBindClck(pm1);

                    var sAppList = SiebelApp.S_App.GetActiveView().GetAppletMap();
                    $('#s_' + sAppList["VHA Capture Same Id Details Applet"].GetFullId() + '_div').on("click", function () {
                        $('#s_' + sAppList["VHA Capture Same Id Details Applet"].GetFullId() + '_div').removeClass("siebui-commit-pending");
                    });

                    $('#NCCustDetailsApplet').delegate(".ui-segment button", "click", function () {
                        /*New code - sequence*/
                        //pm1.Get("GetBusComp").SetFieldValue("Other Id Type", "");
						pm1.Get("GetBusComp").SetFieldValue("Other ID Type", "");
                        //pm1.Get("GetBusComp").SetFieldValue("Offer Id Types", "");
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
            VHACaptureSameIdPR.prototype.Init = function () {
                SiebelAppFacade.VHACaptureSameIdPR.superclass.Init.apply(this, arguments);
				
				
					
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
                        SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("ID Type", "Medicare Card");
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
                        //SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("Offer Id Types", "");
                    } else
                        SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("Other ID Type", "");
					//SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("Other Id Type", "");
                }

            }
            function PostInvokeMethod(MethodName) {
                if (MethodName == "DVSPostpayValidation" || MethodName == "AddRecord") { //??
                    if (SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Same Id Details VBC").GetFieldValue("Given Name") == "" && MethodName == "DVSPostpayValidation" ) {
                        VHACaptureSameIdPR.callDVS();
                        return;
                    }
					if (SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Same Id Details VBC").GetFieldValue("Given Name") == "" && MethodName == "AddRecord" ) {
                        VHACaptureSameIdPR.callDVSPrepay();
                        return;
                    }		
						
					if (MethodName == "AddRecord") 
					{ 
						SiebelApp.S_App.SetProfileAttr("PrepayValidateAdd","Y");				
					}
					
                    SiebelApp.S_App.SetProfileAttr("VHAIDType", "");
                    var pm = this.GetPM();
                    var ctls = pm.Get("GetControls");
                    var sIdCtl = ctls["Id Type"];
                    var sDvsErr = SiebelApp.S_App.GetProfileAttr("DVSError");

                    var sDvsFlg = pm.Get("GetBusComp").GetFieldValue("VHA Enable DVS Override");
					
					var sIDType = pm.Get("GetBusComp").GetFieldValue("ID Type");
					var sCountry = pm.Get("GetBusComp").GetFieldValue("Country");	
					var sReferenceNumber = pm.Get("GetBusComp").GetFieldValue("Reference Number");
					var sGivenName = pm.Get("GetBusComp").GetFieldValue("Given Name");
					var sMiddleName = pm.Get("GetBusComp").GetFieldValue("Middle Name");	
					var sSurname = pm.Get("GetBusComp").GetFieldValue("Surname");		
					var sCardColor = pm.Get("GetBusComp").GetFieldValue("Card Color");
					var sIssuedate = pm.Get("GetBusComp").GetFieldValue("Issue Date");					
					var sInternationalCountry = pm.Get("GetBusComp").GetFieldValue("International Country");
					var sDOB = pm.Get("GetBusComp").GetFieldValue("DOB");
					var sExpiryDate = pm.Get("GetBusComp").GetFieldValue("Expiry Date");			
					var sIssuer = pm.Get("GetBusComp").GetFieldValue("Issuer");					
					//var sMedicareCardNumber = pm.Get("GetBusComp").GetFieldValue("Medicare Card Number");
					var sMedicareExpiryDate = pm.Get("GetBusComp").GetFieldValue("Medicare Expiry Date");
					var sCountryVisa = pm.Get("GetBusComp").GetFieldValue("Country Visa");
					var sMedicareRef = pm.Get("GetBusComp").GetFieldValue("Medicare Reference Number");
					var sGender = pm.Get("GetBusComp").GetFieldValue("Gender");
					var sQCondition = pm.Get("GetBusComp").GetFieldValue("Q Condition");
					var sDLCadNumber = pm.Get("GetBusComp").GetFieldValue("Driving License Card Number");

					//SiebelApp.S_App.SetProfileAttr("AfterValidateFields",sIDType+"|"+sCountry+"|"+sReferenceNumber+"|"+sGivenName+"|"+sMiddleName+"|"+sSurname+"|"+sCardColor+"|"+sIssuedate+"|"+sInternationalCountry+"|"+sDOB+"|"+sExpiryDate+"|"+sIssuer+"|"+sMedicareExpiryDate+"|"+sCountryVisa+"|"+sMedicareRef);
					
					//SiebelJS.Log(sIDType+"/"+sCardColor+"/"+sIssuedate+"/"+sCountry+"/"+sInternationalCountry+"/"+sDOB+"/"+sExpiryDate+"/"+sIssuer+"/"+sMiddleName+"/"+sSurname+"/"+sGivenName+"/"+sReferenceNumber+"/"+sMedicareExpiryDate+"/"+sCountryVisa+"/"+sMedicareRef);
							
					
                    if (sDvsFlg == "Y")
                        $('[lblname="ID Sighted"]').attr("disabled", "disabled");
                    else
                        $('[lblname="ID Sighted"]').removeAttr("disabled");

                    if (sDvsErr != "" && sDvsErr != null) {
                        var sMsgArr = sDvsErr.split(":");

                        var sIdVal = "NonPP";
                        if (sMsgArr[0] == "Success") { //??
                            //$('#SuccessMessage').text(sMsgArr[1]).removeClass("TOTRedFont");
                            $('#SuccessMessage').text(sMsgArr[1] + ".").removeClass("TOTRedFont");
                            ["Card Color", "DOB", "Expiry Date", "Gender", "Given Name", "Issuer", "Medicare Card Number", "Medicare Reference Number", "Middle Name", "Surname", "Medicare Expiry Date", "Country Visa", "Reference Number", "Q Condition", "Offer Id Types", "Other ID Type"].forEach(function (item, index) {
                                pm.Get("GetBusComp").SetFieldValue(item, "");
                            });
                            if ($('.ui-segment button.active').length > 0)
                                sIdVal = $('.ui-segment button.active').val();
                          sIdVal == "Passport" ? $('#vhaidtoggler').val('Australia') : $('#vhaidtoggler').val(''); //?? done
                            //sIdVal=="Passport" && getFlow()!="Postpay"?$('#vhaidtoggler').val('Australia'):sIdVal=="Passport" && getFlow()=="Postpay"?$('#vhaidtoggler').val('Australia'):$('#vhaidtoggler').val('');			
			    $('.vhacustomidbox input').val("");
                            $('[name="Q Condition"]').prop("checked", false);
                            $('select[name="Gender"]').val('');
                            if (sIdVal == "NonPP")
                                $('#vhaidimgcol').remove();							
							SiebelApp.S_App.SetProfileAttr("AfterValidateFields",sIDType+"|"+sCountry+"|"+sReferenceNumber+"|"+sGivenName+"|"+sMiddleName+"|"+sSurname+"|"+sCardColor+"|"+sIssuedate+"|"+sInternationalCountry+"|"+sDOB+"|"+sExpiryDate+"|"+sIssuer+"|"+sMedicareExpiryDate+"|"+sCountryVisa+"|"+sMedicareRef+"|"+sGender+"|"+sQCondition+"|"+sDLCadNumber);
                            //SiebelApp.S_App.SetProfileAttr("InactivateRecordCapture","N");
							VHACaptureSameIdPR.IDDisplay(this.GetPM());
							SiebelApp.S_App.SetProfileAttr("AfterValidateFields","");							
							SiebelApp.S_App.SetProfileAttr("DVSError","ValidateAdd");
							
                        }
                        if (sMsgArr[0] == "Error")
                            $('#SuccessMessage').text(sMsgArr[1]).addClass("TOTRedFont");
                    }
					

                }
                /*if (MethodName == "SubmitNameChange") { //??
                    var sSbtErr = SiebelApp.S_App.GetProfileAttr("NameChangeError");
                    if (sSbtErr != "" && sSbtErr != null) {
                        $('#NCSubmitError').text(sSbtErr).addClass("TOTRedFont");
                    }
                }*/
            }
            VHACaptureSameIdPR.IDDisplay = function (pm) {
                $("#NCIdListHeader,#NCAttachedId").remove();
                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("Service Name", "EAI Siebel Adapter");
                Inputs.SetProperty("Method Name", "Query");

                //var busComp = busObj.GetBusCompByName("VHA Prepay Name Change BC");

                //var sRowId= busComp.GetFieldValue("Id");
                //var sRowId = "2-CKNKFN2";
				
				var sRowId = SiebelApp.S_App.GetProfileAttr("CaptureContactId");
				
                Inputs.SetProperty("SearchSpec", "[VHA Contact.Id] = '" + sRowId + "'");
                Inputs.SetProperty("OutputIntObjectName", "VHA Capture Contact IO");
				//Inputs.SetProperty("OutputIntObjectName", "VHA Capture Contact Upsert IO");

                var out = ser.InvokeMethod("Run Process", Inputs);

                var resultset = out.GetChildByType("ResultSet");

                var SiebMessage = resultset.GetChildByType("SiebelMessage");

                /*New Code starts*/
                var resultArr = VHAAppUtilities.SiebelMessageToArray(SiebMessage.childArray[0].childArray[0].childArray[0]);
				
				var sDVSTransId;
				var PrePostCaptureNewContactId = SiebelApp.S_App.GetProfileAttr("PrePostCaptureNewContactId");
				if(PrePostCaptureNewContactId!=null && PrePostCaptureNewContactId!="" && PrePostCaptureNewContactId!=undefined && PrePostCaptureNewContactId!="undefined")
				{					

					var sPrePostCaptureNewContactId = PrePostCaptureNewContactId.split("|");
					
					sDVSTransId = sPrePostCaptureNewContactId[4];
				}
				
				var PrepayValidateAdd = SiebelApp.S_App.GetProfileAttr("PrepayValidateAdd");
				SiebelApp.S_App.SetProfileAttr("PrepayValidateAdd","");
				var dvsvalidId="";
				var looplen =1;
				var sSameIdType="";
				var AfterValidateFields = SiebelApp.S_App.GetProfileAttr("AfterValidateFields");
				if(AfterValidateFields!=null && AfterValidateFields!="" && AfterValidateFields!=undefined && AfterValidateFields!="undefined")
				{
					looplen =2;	

					var sFieldsArray = AfterValidateFields.split("|");
					
					sSameIdType = sFieldsArray[0];

				
				var service = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputstmp = SiebelApp.S_App.NewPropertySet();
                Inputstmp.SetProperty("ProcessName", "VHA Query Captured Id WF");
                Inputstmp.SetProperty("IdType", sFieldsArray[0]);  	
				Inputstmp.SetProperty("Country", sFieldsArray[1]); 	
				Inputstmp.SetProperty("ReferenceNumber", sFieldsArray[2]); 	
				Inputstmp.SetProperty("FirstName", sFieldsArray[3]); 
				Inputstmp.SetProperty("MiddleName", sFieldsArray[4]); 
				Inputstmp.SetProperty("LastName", sFieldsArray[5]);
				Inputstmp.SetProperty("CardColor", sFieldsArray[6]);				
				Inputstmp.SetProperty("Issuedate", sFieldsArray[7]);
				Inputstmp.SetProperty("InternationalCountry", sFieldsArray[8]);
				Inputstmp.SetProperty("BirthDate", sFieldsArray[9]);
				Inputstmp.SetProperty("ExpiryDate", sFieldsArray[10]);
				Inputstmp.SetProperty("Issuer", sFieldsArray[11]);
				Inputstmp.SetProperty("MedicareExpiryDate", sFieldsArray[12]);
				Inputstmp.SetProperty("CountryVisa", sFieldsArray[13]);
				Inputstmp.SetProperty("MedicareRef", sFieldsArray[14]);	
				Inputstmp.SetProperty("Gender", sFieldsArray[15]);
				Inputstmp.SetProperty("QCondition", sFieldsArray[16]);
				Inputstmp.SetProperty("DLCardNumber", sFieldsArray[17]);					
                              				

                var outtmp = service.InvokeMethod("RunProcess", Inputstmp);

                var resultset = outtmp.GetChildByType("ResultSet");

                var SiebMessagetemp = resultset.GetChildByType("SiebelMessage");
				
				var resultArrtmp = VHAAppUtilities.SiebelMessageToArray(SiebMessagetemp.childArray[0].childArray[0].childArray[0]);
				}
				
				
for (var j = 0; j < looplen; j++) {
	if(j==1)
		resultArr = resultArrtmp;
	
                var Idtypext = [];
                var sRowId = []; // Delete
                for (i = 0; i < resultArr.length; i++) {
                    Idtypext.push(resultArr[i]["Id Type"]);
                    sRowId.push(resultArr[i]["Name"]);

                }
                var uIDType = Array.from(new Set(Idtypext));

               if(AfterValidateFields!=null && AfterValidateFields!="" && AfterValidateFields!=undefined && AfterValidateFields!="undefined" && j==1)
			   {		   
			   
				   var sListOfPPFields = ["Id Reference Number=Passport Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Birth Date=Date of Birth", "Expiry Date=Expiry Date", "Country=Country"];
					var sListOfDLFields = ["Id Reference Number=License Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Birth Date=Date of Birth", "Expiry Date=Expiry Date", "Card Number=Card Number","Country=Country", "Issuer=Issuer"];
					var sListOfMCFields = ["Id Reference Number=Medicare Card Number", "Medicare Reference Number=Medicare Line Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Medicare Expiry Date=Expiry Date", "Card Color=Card Color"];
					//var sListOfMCFields = ["Id Reference Number=Medicare Card Number", "Medicare Reference Number=Medicare Line Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Medicare Expiry Date=Expiry Date", "Card Color=Card Color", "Birth Date=Date of Birth"];
					 //var sListOfMCFields = ["Id Reference Number=Medicare Card Number", "Medicare Card Number=Medicare Line Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Medicare Expiry Date=Expiry Date", "Card Color=Card Color", "Birth Date=Date of Birth"];
					var sListOfVISAFields = ["Id Reference Number=Passport Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Expiry Date=Expiry Date", "Birth Date=Date of Birth", "Country=Country"];
					var sListOfCommonFields = ["Id Reference Number=Id Reference Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Issuer=Issuer", "Country=Country of Issue", "Expiry Date=Expiry Date", "Issue Date=Issue Date"];
					
					var sListOfProofAge = ["Id Reference Number=Id Reference Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Issuer=Issuer", "Birth Date=Date of Birth", "Issue Date=Issue Date", "Expiry Date=Expiry Date"];
			   }
			   
			   
			   else
			   {
					 var sListOfPPFields = ["Id Reference Number=Passport Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Birth Date=Date of Birth", "Expiry Date=Expiry Date", "Country=Country","Primary=Primary","DVS Transaction Id=DVS Transaction Id","InActive=InActive"];
					var sListOfDLFields = ["Id Reference Number=License Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Birth Date=Date of Birth", "Expiry Date=Expiry Date", "Card Number=Card Number","Country=Country", "Issuer=Issuer","Primary=Primary","DVS Transaction Id=DVS Transaction Id","InActive=InActive"];
					var sListOfMCFields = ["Id Reference Number=Medicare Card Number", "Medicare Reference Number=Medicare Line Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Medicare Expiry Date=Expiry Date", "Card Color=Card Color","Primary=Primary","DVS Transaction Id=DVS Transaction Id","InActive=InActive"];
					//var sListOfMCFields = ["Id Reference Number=Medicare Card Number", "Medicare Reference Number=Medicare Line Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Medicare Expiry Date=Expiry Date", "Card Color=Card Color", "Birth Date=Date of Birth","InActive=InActive"];
					 //var sListOfMCFields = ["Id Reference Number=Medicare Card Number", "Medicare Card Number=Medicare Line Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Medicare Expiry Date=Expiry Date", "Card Color=Card Color", "Birth Date=Date of Birth"];
					var sListOfVISAFields = ["Id Reference Number=Passport Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Expiry Date=Expiry Date", "Birth Date=Date of Birth", "Country=Country","Primary=Primary","DVS Transaction Id=DVS Transaction Id","InActive=InActive"];
					var sListOfCommonFields = ["Id Reference Number=Id Reference Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Issuer=Issuer", "Country=Country of Issue", "Expiry Date=Expiry Date", "Issue Date=Issue Date","Primary=Primary","DVS Transaction Id=DVS Transaction Id","InActive=InActive"];					
					var sListOfProofAge = ["Id Reference Number=Id Reference Number", "First Name=First Name", "Middle Name=Middle Name", "Last Name=Last Name", "Issuer=Issuer", "Birth Date=Date of Birth", "Issue Date=Issue Date", "Expiry Date=Expiry Date","Primary=Primary","DVS Transaction Id=DVS Transaction Id","InActive=InActive"];
				   
			   }
			  
				
				

                var sListOfFields = (sIdT == "Passport") ? sListOfPPFields : (sIdT == "Driver's Licence") ? sListOfDLFields : (sIdT == "Medicare Card") ? sListOfMCFields : (sIdT == "VISA") ? sListOfVISAFields : (sIdT == "Proof of Age Card(Govt Issued)") ? sListOfProofAge : sListOfCommonFields;

                
				//var sFinalHTML = "<div class=NCFullIdDiv><div Id='NCIdListHeader' class='VHAFormTitle'>Attached list of ID's</div><div id='NCAttachedId' class='idatcontainerchdft'>";
				
				if(j==1)
				var sFinalHTML = "<div class=NCFullIdDiv><div Id='NCIdListHeader' class='VHAFormTitle'>Newly Added Id</div><div id='NCAttachedId' class='idatcontainerchdft'>";
                else if(AfterValidateFields!=null && AfterValidateFields!="" && AfterValidateFields!=undefined && AfterValidateFields!="undefined" && j==0)
					var sFinalHTML = "<div class=NCFullIdDiv><div Id='NCIdListHeader' class='VHAFormTitle'>Existing list of ID's</div><div id='NCAttachedId' class='idatcontainerchdft'>";
				else
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
                            sFinalHTML = sFinalHTML + "<div class='flex_row_container NCIdrecLines' attr-rowId = '" + sRowId[b] + "'  attr-IdType = '" + uIDType[a] + "'>";
							
							//if(j==0 && sSameIdType==uIDType[a] && AfterValidateFields!=null && AfterValidateFields!="" && AfterValidateFields!=undefined && AfterValidateFields!="undefined")								
							//SiebelApp.S_App.SetProfileAttr("InactivateRecordCapture",resultArr[b]["Id"]);
								
							
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
								
								if((sFieldMap[1] == "Expiry Date" || sFieldMap[1] == "Issue Date") && resultArr[b][sFieldMap[0]]!="" && resultArr[b][sFieldMap[0]]!=null)
								{									
									resultArr[b][sFieldMap[0]] =resultArr[b][sFieldMap[0]].substr(0, 10);
									
								}			

								if((sFieldMap[1] == "Primary" && resultArr[b][sFieldMap[0]]!="Y"))
								{									
									resultArr[b][sFieldMap[0]] ="N";
									
								}								
								
								if((sFieldMap[1] == "First Name" || sFieldMap[1] == "Middle Name" || sFieldMap[1] == "Last Name") && (AfterValidateFields==null || AfterValidateFields=="" || AfterValidateFields==undefined || AfterValidateFields=="undefined") && b==0)
								{	
																
									if(sFieldMap[1] == "First Name")
									{	
																	
										SiebelApp.S_App.SetProfileAttr("FirstNameProf", resultArr[b][sFieldMap[0]]);
										
										
									}
									if(sFieldMap[1] == "Middle Name")
									{
										
										SiebelApp.S_App.SetProfileAttr("MiddleNameProf", resultArr[b][sFieldMap[0]]);
										
									}
									
									if(sFieldMap[1] == "Last Name")
									{
										
										SiebelApp.S_App.SetProfileAttr("LastNameProf", resultArr[b][sFieldMap[0]]);
										
									}	
									
									
								}
								
								
								if(sFieldMap[1]=="DVS Transaction Id" && resultArr[b][sFieldMap[0]]!=null && resultArr[b][sFieldMap[0]]!="" && PrepayValidateAdd=="Y" && sDVSTransId!=null && sDVSTransId!="" && sDVSTransId!=undefined && sDVSTransId!="undefined")
								{
									dvsvalidId="Y";
								}								
								
								if(sFieldMap[1]=="InActive")
								{								
									var incativecheckid ="incativecheck-123";
									var incativecheck ="incativecheck-12";
									
									
									//working line //sFinalHTML = sFinalHTML + '<div><input type="checkbox" name="' + sFieldMap[1] + '" class="vhaidfields ' + incativecheck + '"/></div>';
									//sFinalHTML = sFinalHTML + '<div><input type="checkbox" id="' + incativecheck + '" name="' + sFieldMap[1] + '" class="vhaidfields ' + incativechecka + '"/></div>';							
									
								
								var SameIdDeleteResp = SiebelApp.S_App.GetProfileAttr("SameIdDeleteResp");								
								if(j==0 && (sSameIdType==uIDType[a] || (dvsvalidId=="Y" && AfterValidateFields!=null && AfterValidateFields!="" && AfterValidateFields!=undefined && AfterValidateFields!="undefined")))
									{																		
										
										//Id Combination
										 //sFinalHTML = sFinalHTML + '<div><input type="checkbox" checked disabled="disabled" attr-rowId = "' + sRowId[b] + '" id="' + incativecheckid + '" name="' + sFieldMap[1] + '" class="incativecheck"/></div>';
										 
										// SiebelApp.S_App.SetProfileAttr("InActiverows", sRowId[b]);	
										SiebelApp.S_App.SetProfileAttr("VHASameIdRef", "Y");
										
										if(SameIdDeleteResp=="Y")
										{  
									        SiebelApp.S_App.SetProfileAttr("SameIdChecked", sRowId[b]);
											sFinalHTML = sFinalHTML + '<div><input type="checkbox" attr-rowId = "' + sRowId[b] + '" id="' + incativecheckid + '" name="' + sFieldMap[1] + '" class="incativecheck"/></div>';										
											
										}
										else
										{
											sFinalHTML = sFinalHTML + '<div><input type="checkbox" disabled="disabled" attr-rowId = "' + sRowId[b] + '" id="' + incativecheckid + '" name="' + sFieldMap[1] + '" class="incativecheck"/></div>';
										}
										
									}	
									else
									{ 
										//sFinalHTML = sFinalHTML + '<div><input type="checkbox" id="' + incativecheck + '" name="' + sFieldMap[1] + '" class="vhaidfields ' + incativechecka + '"/></div>';
										
										
										var p = /(')/g;
										uIDType[a] =  uIDType[a].replace(p, "''");						
										
										
										// var sPrimary = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_ID_TYPE' AND [List Of Values.Name]= '" + uIDType[a] + "' AND [List Of Values.Active]='Y'", {
                                        //        "All": "true"
                                         //   })[0].High;										
											
											
											
											
											//if(sPrimary!="Y" || (sPrimary=="Y" && SameIdDeleteResp=="Y"))
											if(SameIdDeleteResp=="Y")
											{	
																						
												sFinalHTML = sFinalHTML + '<div><input type="checkbox" attr-rowId = "' + sRowId[b] + '"  id="' + incativecheckid + '" name="' + sFieldMap[1] + '" class="incativecheck"/></div>';
											}
											else
											{
												sFinalHTML = sFinalHTML + '<div><input type="checkbox" disabled="disabled" attr-rowId = "' + sRowId[b] + '" id="' + incativecheckid + '" name="' + sFieldMap[1] + '" class="incativecheck"/></div>';
												
											}
										
									}										
									
										
										
										
								} 
								
								

                               else if (sFieldMap[1] == "Date of Birth" || (sFieldMap[1] == "Expiry Date" && uIDType[a] != "Medicare Card") || sFieldMap[1] == "Issue Date") {
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

                            dvsvalidId="N";
							if(AfterValidateFields!=null && AfterValidateFields!="" && AfterValidateFields!=undefined && AfterValidateFields!="undefined" && j==1)
							{						
								//sFinalHTML=sFinalHTML+"</div><div attr-rowId = '"+sRowId[b]+"'><img class='iddelicon' src='images/custom/delete.png' idtyp='"+sIdT+"'/></div>";
								//sFinalHTML=sFinalHTML+"</div><div attr-rowId = '"+sRowId[b]+"'><img class='iddelicon' src='images/custom/delete.png' idtyp='"+sIdT+"'/></div>";
								 sFinalHTML = sFinalHTML + "</div><div attr-rowId = '" + sRowId[b] + "'><img class='idediticon' src='images/custom/edit_icon_nc.png' idtyp='" + sIdT + "'/><img class='iddelicon' src='images/custom/delete.png' idtyp='" + sIdT + "'/></div>";
							}
							else
							sFinalHTML=sFinalHTML+"</div><div attr-rowId = '"+sRowId[b]+"'></div>";
                            //sFinalHTML = sFinalHTML + "</div><div attr-rowId = '" + sRowId[b] + "'><img class='idediticon' src='images/custom/edit_icon_nc.png' idtyp='" + sIdT + "'/><img class='iddelicon' src='images/custom/delete.png' idtyp='" + sIdT + "'/></div>";

                        }
                    }
                    sFinalHTML = sFinalHTML + "</div>";
                }
                sFinalHTML = sFinalHTML + "</div></div>";

                $('#NCCommonSec').after(sFinalHTML);
}
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
                                //var headerBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Temp Contact Id BC");
                                var Inputs = SiebelApp.S_App.NewPropertySet();
                                var Outs = SiebelApp.S_App.NewPropertySet();
                                Inputs.SetProperty("TempConId", sessionStorage.getItem('currRowId'));
                                if (sessionStorage.getItem('IdType') == "Driver") {
                                    var dl = "Driver's Licence"
                                        Inputs.SetProperty("IDType", dl);

                                } else {
                                    Inputs.SetProperty("IDType", sessionStorage.getItem('IdType'));
                                }
                                /* Outs = VHAAppUtilities.CallBS(
                                        "VHA TOT TBUI Service", "DeleteTOTContactIDs",
                                        Inputs, {}); */

                                if ($('[attr-rowid="' + sessionStorage.getItem('currRowId') + '"]').parent().find('.NCIdrecLines').length < 2) {
                                     $('[attr-rowid="' + sessionStorage.getItem('currRowId') + '"]').parent().remove();
                                    $('[headerrow-id="' + sessionStorage.getItem('IdType') + '"]').remove();

                                } else {
									$('[attr-rowid="' + sessionStorage.getItem('currRowId') + '"]').remove();
                                }
								SiebelApp.S_App.SetProfileAttr("DVSError","");								
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
					SiebelApp.S_App.SetProfileAttr("DVSError","");
                    /*var sListOfPPFields=["Gender","Country","Expiry Date","Date of Birth","Given Name","Surname","Passport Number","Passport Number","Surname","Given Name","Date of Birth","Expiry Date","Country","Gender"];
                    var sListOfDLFields=["Issuer","Country","Date of Birth","Expiry Date","License Number","Surname","Given Name","Given Name","Surname","License Number","Expiry Date","Date of Birth","Country","Issuer"];
                    var sListOfMCFields=["Card Colour","Expiry Date","Given Name","Surname","Medicare Line Number","Medicare Reference Number","Medicare Reference Number","Medicare Line Number","Surname","Given Name","Medicare Expiry Date","Card Color"];
                    var sListOfVisaFields=["Country","Gender","Expiry Date","Date of Birth","Given Name","Surname","Surname","Given Name","Passport Number","Date of Birth","Expiry Date","Gender","Country Visa"];
                    var sListOfCommonFields=["Expiry Date","Issuer","Country of Issue","Id Reference Number","Surname","Given Name","Given Name","Surname","Id Reference Number","Country Of Issue","Issuer","Expiry Date"];
                    //var sIdT=$(this).closest('.flex_row_container').prev().text();*/
                    sIdT = sIdT.replace("Attached ID - ", "");
                    var sCty = $(this).parent().parent().find('.NCIdrecLines .vhaidattflds[name="Country"]').text();
                    var sIsPPOrIP = (sCty == "Australia" || sCty == "New Zealand") ? "Passport" : "International Passport"; //?? done
                    //var sIsPPOrIP=(getFlow()=="Prepay" || getFlow()=="NameChange")?"Passport":(sCty=="Australia" || sCty=="New Zealand")?"Passport":"International Passport";
		    sIdT = (sIdT == "Drivers Licence") ? "Driver's Licence" : (sIdT == "Passport") ? sIsPPOrIP : sIdT;
                    
                    if ($('.ui-segment [value="' + sIdT + '"]').length > 0) {
                        sIdFound = true;
                        $('.ui-segment [value="' + sIdT + '"]').click();
                    } else {

                        var sFlw = (getFlow() == "Prepay" || getFlow() == "NameChange") ? "Prepaid" : "Postpaid"; //??
                        //var sResOthers = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_PP_NATIVE_IDTYPE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='" + sIdT + "' AND [List Of Values.Sub Type]='" + sFlw + "'");
						 var sResOthers = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_CAPTURE_IDTYPE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='" + sIdT + "'");
                      //  var sResOffers = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_TOT_OFFERIDTYPE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='" + sIdT + "' AND [List Of Values.Sub Type]='" + sFlw + "'");
                        if (sResOthers.length > 0) {
                            //pm.Get("GetBusComp").SetFieldValue("Other Id Type", sIdT);
							pm.Get("GetBusComp").SetFieldValue("Other ID Type", sIdT);
                            pm.Get("GetBusComp").SetFieldValue("ID Type", sIdT);
                            sIdFound = true;
                        }
                      /*  if (sResOffers.length > 0 && (!$('[aria-labelledby="Offer_Id_Types_Label"]').parent().hasClass("VFDisplayNone"))) {
                            pm.Get("GetBusComp").SetFieldValue("Offer Id Types", sIdT);
                            pm.Get("GetBusComp").SetFieldValue("ID Type", sIdT);
                            sIdFound = true;
                        } else */
							
						if (sIdT == "Medicare Card") {
                            var sCdClr = $(this).parent().parent().find('.NCIdrecLines .vhaidattflds#CardColor').text();
                            if (sCdClr == "Green") {
                                //pm.Get("GetBusComp").SetFieldValue("Other Id Type", "Green Medicare Card");
								pm.Get("GetBusComp").SetFieldValue("Other ID Type", "Green Medicare Card");
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
                        
                        //var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other Id Type");
						 var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other ID Type");
                        var sOffer = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Offer Id Types");
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
					
					var sIdRef ="";
					var sExpDate ="";
					if(IdType=="Passport" || IdType=="Visa")
						sIdRef = $(this).parent().parent().find('.NCIdrecLines .vhaidattflds#PassportNumber').text();	
					
					else if(IdType=="Driver")
						sIdRef = $(this).parent().parent().find('.NCIdrecLines .vhaidattflds#LicenseNumber').text();
					
					else if(IdType=="Medicare Card")
						sIdRef = $(this).parent().parent().find('.NCIdrecLines .vhaidattflds#MedicareCardNumber').text();
					
					else 
					sIdRef = $(this).parent().parent().find('.NCIdrecLines .vhaidattflds#IdReferenceNumber').text();
					
					sExpDate = $(this).parent().parent().find('.NCIdrecLines .vhaidattflds#ExpiryDate').text();
				
					
					//SiebelApp.S_App.SetProfileAttr("InactivateRecordCapture",sRowId);
					sessionStorage.setItem('ExpiryDate', sExpDate);
					sessionStorage.setItem('IdReference', sIdRef);
					
                    sessionStorage.setItem('currRowId', sRowId);
                    sessionStorage.setItem('IdType', IdType);
                    $("#iddel").dialog("open");
					

                });
				
				$('.incativecheck').on("click", function () {                     

					var scurrRowId = $(this).parent().parent().parent().find('.NCIdrecLines').attr('attr-rowId');  	
					var ssameId =  SiebelApp.S_App.GetProfileAttr("SameIdChecked");
					
					if(this.checked==true)
					{
						var InActiverows = SiebelApp.S_App.GetProfileAttr("InActiverows");
						if(InActiverows!=null && InActiverows!="" && InActiverows!=undefined && InActiverows!="undefined")
						{
							InActiverows = InActiverows + "|" + scurrRowId;
						}
						else
						{
							InActiverows = scurrRowId;						
						}				
						
						SiebelApp.S_App.SetProfileAttr("InActiverows", InActiverows);						
					
					}
					if(this.checked==true && ssameId==scurrRowId)
					{
						SiebelApp.S_App.SetProfileAttr("VHASameIdRef", ""); 
					}
					
					if(this.checked==false)
					{
						var InActiverows = SiebelApp.S_App.GetProfileAttr("InActiverows");
						var sInActiverows = InActiverows.split("|");
						var ssInActiverows="";
						for (var i = 0; i < sInActiverows.length; i++)
						{
								if(sInActiverows[i]!=scurrRowId && (ssInActiverows==null || ssInActiverows==""))
								ssInActiverows = sInActiverows[i];
								
								if(sInActiverows[i]!=scurrRowId && ssInActiverows!=null && ssInActiverows!="")
								ssInActiverows = ssInActiverows + "|" + sInActiverows[i];
						}
						if(sInActiverows==scurrRowId)
						{
							ssInActiverows ="";
						}
						SiebelApp.S_App.SetProfileAttr("InActiverows", ssInActiverows);
					}
					if(this.checked==false && ssameId==scurrRowId)
					{
						SiebelApp.S_App.SetProfileAttr("VHASameIdRef", "Y"); 
					}
					
				//SiebelApp.S_App.SetProfileAttr("SameIdChecked", "");	
					

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
				$('#idvhaidvaladdpre').attr("disabled",false);
				$('#idvhaidvaladdpost').attr("disabled",false);
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
                //if (iType == "Driver's Licence") //To default value
                    //$('[name="Country"]').val('Australia').attr("disabled", "true");
					
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
					
					 if (iType == "Student ID" || iType == "Pensioner Card" || iType == "Defence Force ID" || iType == "Credit/Debit Card" || iType == "Gold Veteran Affairs Card" || iType == "Cert of Enrol" || iType == "DVA Health Care Card") 
					 {
						 var FirstNameProf = SiebelApp.S_App.GetProfileAttr("FirstNameProf");
						 var MiddleNameProf = SiebelApp.S_App.GetProfileAttr("MiddleNameProf");
						 var LastNameProf = SiebelApp.S_App.GetProfileAttr("LastNameProf");
						$('[name="Given Name"]').val(FirstNameProf).attr("disabled", "true");
						$('[name="Middle Name"]').val(MiddleNameProf).attr("disabled", "true");
						$('[name="Surname"]').val(LastNameProf).attr("disabled", "true");
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
				
				if(iType=="International Passport")
					$('#idvhaidvaladdpre').attr("disabled","true");
				
				var sOrgName = SiebelApp.S_App.GetProfileAttr("VHANewOrg");
				if(sOrgName == "Kogan")
					$('#idvhaidvaladdpost').attr("disabled","true");
					
				
				if(iType=="VISA")
					$('#idvhaidvaladdpost').attr("disabled","true");
				
				if(iType=="Medicare Card" && (sRef=="Blue" || sRef=="Yellow"))
					$('#idvhaidvaladdpost').attr("disabled","true");

            } // func creatediv end

            function getFlow() {
              
                    return "NameChange";
               
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
                case "Passport": // ?? done  //sur3
					selectVal = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='COUNTRY' AND [List Of Values.Active]='Y'");
                    sToglerFld = "Country";
                    sFieldnm = "Country";
                    sdisable = "true";

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

//idtype=="Passport" && getFlow()!="Postpay"?$('#vhaidtoggler').val('Australia'):idtype=="Passport" && getFlow()=="Postpay"?$('#vhaidtoggler').val('Australia'):idtype=="Green Medicare Card"?$('#vhaidtoggler').val('Green').attr("disabled","true"):$('#vhaidtoggler').val('');			
               idtype == "Passport" ? $('#vhaidtoggler').val('Australia') : idtype == "Green Medicare Card" ? $('#vhaidtoggler').val('Green').attr("disabled", "true") : $('#vhaidtoggler').val(''); //?? done

                idtype = (idtype == "Green Medicare Card") ? "Medicare Card" : idtype;
                createIDdiv(idtype, $("select#vhaidtoggler").children("option:selected").val());

                $("select#vhaidtoggler").change(function () {
                    $(".vhaidfields").each(function (index, item) {
                        var idpmbc = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp");
						//SiebelJS.Log("FieldName:"+item.name);
                        idpmbc.SetFieldValue(item.name, "");
                    });
                    $('.vhaidparrow').remove();
                   
                    //var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other Id Type");
					var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other ID Type");
                    sOther = (sOther == "Green Medicare Card") ? "Medicare Card" : sOther;
                    var sOffer = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Offer Id Types");
                    var sId = ($('.ui-segment .active').length > 0) ? $('.ui-segment .active').attr("value") : (sOther != "") ? sOther : sOffer;
                    createIDdiv(sId, $("select#vhaidtoggler").children("option:selected").val());
                    //alert("You have selected the country - " + selectedCountry);
                    //$('#countryp').val(selectedCountry).trigger("change");
                    removeFldsflow();//??
                });

                //if (getFlow() == "NameChange") {// ?? done
                //$('#vhaidvaladd>button').off("click").on("click", function () {
				$('#idvhaidvaladdpost').off("click").on("click", function () {
                    //validation
                    var idReqfldsErr = "N";

                    
                    var idtyp=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Same Id Details VBC").GetFieldValue("ID Type");
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
                                     || $(item).attr("lblname") == "Country")) {
                                $(item).addClass('VHAToTnullerr');
                                idReqfldsErr = "Y";
                            }
                            break;
                        default:
                            if (item.value == "" && $(item).attr("lblname") != "Middle Name" && $(item).attr("lblname") != "Issue Date" && $(item).attr("lblname") != "ID Sighted" && $(item).attr("lblname") != "Card Number") {
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
                            VHACaptureSameIdPR.callDVS();
                        }
                    } else
                        $('#SuccessMessage').text("Please enter the value of required fields").addClass("TOTRedFont");
                });
				
				
				$('#idvhaidvaladdpre').off("click").on("click", function () {
                    //validation
                    var idReqfldsErr = "N";

                    
                    var idtyp=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Same Id Details VBC").GetFieldValue("ID Type");
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
                                     || $(item).attr("lblname") == "Country")) {
                                $(item).addClass('VHAToTnullerr');
                                idReqfldsErr = "Y";
                            }
                            break;
                        default:
                            if (item.value == "" && $(item).attr("lblname") != "Middle Name" && $(item).attr("lblname") != "Issue Date" && $(item).attr("lblname") != "ID Sighted" && $(item).attr("lblname") != "Card Number") {
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
                            VHACaptureSameIdPR.callDVSPrepay();
                        }
                    } else
                        $('#SuccessMessage').text("Please enter the value of required fields").addClass("TOTRedFont");
                });
				
				
				
				
				

                //}
                removeFldsflow();// ??

                $(".vhaidfields").on('focus', function () {
                    $(this).removeClass('VHAToTnullerr');
                });

            }
            VHACaptureSameIdPR.callDVS = function () {
                $(".vhaidfields").each(function (index, item) {
                    var idpmbc = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Same Id Details VBC");
                    //SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp");
                    var sval = item.type == "checkbox" ? (item.checked == true) ? "Y" : "N" : item.value;

                    //var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other Id Type");
					var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other ID Type");
                    var sOffer = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Offer Id Types");
                    var sId = ($('.ui-segment .active').length > 0) ? $('.ui-segment .active').attr("value") : (sOther != "") ? sOther : sOffer;
                    if (item.name == "DOB" || (item.name == "Expiry Date" && sId != "Medicare Card") || item.name == "Issue Date")
                        sval = formatDate_mmddtoddmm(sval);
                    if (item.name == "Country" || item.name == "Country Visa") {
                        var sInp = SiebelApp.S_App.NewPropertySet();
                        sInp.SetProperty("Profile Attribute Name", "VHAPassportCountry");
                        sInp.SetProperty("Profile Attribute Value", sval);
                        VHAAppUtilities.CallBS("SIS OM PMT Service", "Set Profile Attribute", sInp);
                    }
					
					if(item.name == "Medicare Reference Number")
					SiebelApp.S_App.SetProfileAttr("MedicareReferenceNumber", sval);				
					
					if(item.name == "ID Type" || item.name == "Reference Number" || item.name == "Given Name" || item.name == "Middle Name" || item.name == "Surname" || item.name == "Card Color" || item.name == "Issue Date" || item.name == "DOB" || item.name == "Expiry Date" || item.name == "Issuer" || item.name == "Medicare Expiry Date" || item.name == "Gender" || item.name == "Q Condition" || item.name == "Driving License Card Number")
					{
						var CaptureIdAllFields = SiebelApp.S_App.GetProfileAttr("CaptureIdAllFields");
						if(CaptureIdAllFields=="" || CaptureIdAllFields==null)
						{
							SiebelApp.S_App.SetProfileAttr("CaptureIdAllFields", item.name+"%"+sval);
						}
						else
						{
							SiebelApp.S_App.SetProfileAttr("CaptureIdAllFields", CaptureIdAllFields+"|"+item.name+"%"+sval);
						}
					}
					
					var itemname = item.name;
                    idpmbc.SetFieldValue(item.name, sval);
                });
                var inps = SiebelApp.S_App.NewPropertySet();
                var apMap = SiebelApp.S_App.GetActiveView().GetAppletMap();
                apMap["VHA Capture Same Id Details Applet"].GetPModel().ExecuteMethod("InvokeMethod", "DVSPostpayValidation", inps);
            }
			
			
			 VHACaptureSameIdPR.callDVSPrepay = function () {
                $(".vhaidfields").each(function (index, item) {
                    var idpmbc = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Same Id Details VBC");
                    //SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp");
                    var sval = item.type == "checkbox" ? (item.checked == true) ? "Y" : "N" : item.value;

                    //var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other Id Type");
					var sOther = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Other ID Type");
                    var sOffer = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Offer Id Types");
                    var sId = ($('.ui-segment .active').length > 0) ? $('.ui-segment .active').attr("value") : (sOther != "") ? sOther : sOffer;
                    if (item.name == "DOB" || (item.name == "Expiry Date" && sId != "Medicare Card") || item.name == "Issue Date")
                        sval = formatDate_mmddtoddmm(sval);
                    if (item.name == "Country" || item.name == "Country Visa") {
                        var sInp = SiebelApp.S_App.NewPropertySet();
                        sInp.SetProperty("Profile Attribute Name", "VHAPassportCountry");
                        sInp.SetProperty("Profile Attribute Value", sval);
                        VHAAppUtilities.CallBS("SIS OM PMT Service", "Set Profile Attribute", sInp);
                    }
					
					if(item.name == "Medicare Reference Number")
					SiebelApp.S_App.SetProfileAttr("MedicareReferenceNumber", sval);
				
					if(item.name == "ID Type" || item.name == "Reference Number" || item.name == "Given Name" || item.name == "Middle Name" || item.name == "Surname" || item.name == "Card Color" || item.name == "Issue Date" || item.name == "DOB" || item.name == "Expiry Date" || item.name == "Issuer" || item.name == "Medicare Expiry Date" || item.name == "Gender" || item.name == "Q Condition" || item.name == "Driving License Card Number")
					{
						var CaptureIdAllFields = SiebelApp.S_App.GetProfileAttr("CaptureIdAllFields");
						if(CaptureIdAllFields=="" || CaptureIdAllFields==null)
						{
							SiebelApp.S_App.SetProfileAttr("CaptureIdAllFields", item.name+"%"+sval);
						}
						else
						{
							SiebelApp.S_App.SetProfileAttr("CaptureIdAllFields", CaptureIdAllFields+"|"+item.name+"%"+sval);
						}
					}
					
					
					var itemname = item.name;
                    idpmbc.SetFieldValue(item.name, sval);
                });
                var inps = SiebelApp.S_App.NewPropertySet();
                var apMap = SiebelApp.S_App.GetActiveView().GetAppletMap();
                apMap["VHA Capture Same Id Details Applet"].GetPModel().ExecuteMethod("InvokeMethod", "AddRecord", inps);
            }		
			
			

            function removeFldsflow() {
                $('select[name="Gender"]').val('');
                if (getFlow() == "Prepay" || getFlow() == "NameChange") {
                 /*   $(".vhaidlabel").each(function (index, item) {
                        if ($(item).text().search("Q Condition") > -1) {
                            $(item).parent().remove();
                        }
                    });   to make Q Condition visible */ 
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
                if (dte == "" || dte == "undefined" || dte == undefined) //Changed
                {
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
                if (dte == "" || dte == "undefined" || dte == undefined) {
                    return "";
                } else {
                   
                    var sDtArr = dte.split("/");
                    
                    var sNewDt = sDtArr[1] + "/" + sDtArr[0] + "/" + sDtArr[2];
                    return sNewDt;
                }
            }
            function formatDate_MMYYYY(dte) {
                if (dte == "" || dte == "undefined" || dte == undefined) {
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
                if (dte == "" || dte == "undefined" || dte == undefined) {
                    return "";
                } else {

                    var sDtArr = dte.split("/");

                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var sMonthName = monthNames[parseInt(sDtArr[1]) - 1];
                    var sNewDt = sDtArr[0] + " " + sMonthName + " " + sDtArr[2];
                    return sNewDt;
                }
            }
            VHACaptureSameIdPR.mShowUi = function () {
                //$('.siebui-icon-mdvsvalidate').replaceWith('<button id="vha-idvalidateadd" class="vhatotverifybtn ml-3">Validate and Add</button>');
                var sAppList = SiebelApp.S_App.GetActiveView().GetAppletMap();
                if (SiebelApp.S_App.GetActiveView().GetName() == "VHA Capture Same Id Details View") {
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
                if (SiebelApp.S_App.GetActiveView().GetName() == "VHA Capture Same Id Details View") {                   

                   
                    //$(".NCCustVal").append(sCustBC.GetFieldValue("Full Name Existing"));

                    if (SiebelApp.S_App.GetActiveView().GetName() == "VHA Capture Same Id Details View") {
                        $('#s_' + sAppList["VHA Capture Same Id Details Applet"].GetFullId() + '_div').addClass("boxshdnone");

                    //if (SiebelApp.S_App.GetActiveView().GetName() == "VHA Capture Same Id Details View") {
                        //$('#s_'+sAppList["VHA NameChange Customer Details List Applet"].GetFullId()+'_div').addClass("boxshdnone");
                    }

                } else {
                    setTimeout(function () {
                        $('.VHANCbottombtns').addClass("VFDisplayNone");
                    }, 5);
                }
                //bm100734 - end
                $('#' + sAppList["VHA Capture Same Id Details Applet"].GetFullId()).addClass("padbtwappt");
                //setTimeout(function(){$('#s_'+sAppList["VHA Capture Same Id Details Applet"].GetFullId()+'_div').addClass("boxshdnone")},5);
                $('#NCIdDetails .VHAJustContentleft .mceField').parent().addClass("idfieldpad");
                $('#NCIdDetails .VHAJustContentleft .mceLabel').parent().addClass("idlabelpad");

                var sAppMode = sAppList["VHA Capture Same Id Details Applet"].GetMode();
                if (sAppMode == "Base") {
                    setTimeout(function () {
                        $('.siebui-icon-newrecord').click();
                    }, 5);
                }
                var sFlw = getFlow();
                var sPaymentType = (sFlw == "NameChange" || sFlw == "Prepay") ? "Prepaid" : "Postpaid";
                //SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("Payment Method", sPaymentType);
                function Segment(segItems, sView) {
                    var sFlw = getFlow();//?? done
                    var sPaymentType = (sFlw == "NameChange" || sFlw == "Prepay") ? "Prepaid" : "Postpaid";
                    //SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel().Get("GetBusComp").SetFieldValue("Payment Method", sPaymentType);
                    segItems.each(function () {
                        var self = $(this);
                        var onchange = self.attr('onchange');
                        var wrapper = $("<div>", {
                            class: "ui-segment"
                        });
                        $(this).find("option").each(function () {
                     /*//sur6       var option = $("<button>", {
                                class: 'option vhappbtn vhabtnredbg',
                                onclick: onchange,
                                text: $(this).text(),
                                value: $(this).val()
                            }); */
                            switch (sFlw) { //?? done
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
                VHACaptureSameIdPR.IDDisplay(SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Capture Same Id Details Applet"].GetPModel());
                //$("#NCIdListHeader,#NCAttachedId").addClass("VFDisplayNone");
                if ($('#NCCustDetailsApplet .ui-segment button').length > 0)
                    setTimeout(function () {
                        $('#NCCustDetailsApplet .ui-segment button')[0].click();
                    }, 5);
            }
            return VHACaptureSameIdPR;
        }
            ());
        return "SiebelAppFacade.VHACaptureSameIdPR";
    });
}
