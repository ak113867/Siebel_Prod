
if (typeof(SiebelAppFacade.VHASISAccountEntryAppletPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.VHASISAccountEntryAppletPR");
    define("siebel/custom/VHASISAccountEntryAppletPR", ["siebel/phyrenderer"],
        function () {
        SiebelAppFacade.VHASISAccountEntryAppletPR = (function () {

            function VHASISAccountEntryAppletPR(pm) {
                SiebelAppFacade.VHASISAccountEntryAppletPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(VHASISAccountEntryAppletPR, SiebelAppFacade.PhysicalRenderer);
            var authdetails;
            var stepAuthPbj = {};
            var AuthmethodType;
			var IdRefNum;
			var offerData = [];
            var vhaindex;
            var controls;
            var otpAutentication;
            var PhnVerifyFlag_step2;
            var EmailVerifyFlag_step2;
            var AuthmethodType;
            var stepAuthPbj = {};
            var OtpStep2;
            var verifiedStep2;
            var authdetails;
            var OrgN;
            var IdRefNum;

            VHASISAccountEntryAppletPR.prototype.Init = function () {
                SiebelAppFacade.VHASISAccountEntryAppletPR.superclass.Init.apply(this, arguments);
            }

            VHASISAccountEntryAppletPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHASISAccountEntryAppletPR.superclass.ShowUI.apply(this, arguments);
                var formPM = this.GetPM();

                var formControls = formPM.Get("GetControls");
                var Accstatusctrl = formControls["AccountStatus"].GetInputName();
                var AppletFullId = formPM.Get("GetFullId");
                var recordSet = formPM.Get("GetRecordSet");
                var recLen = recordSet.length;
                if (recLen) {
                    recordSet = recordSet[0];
                    var data = {
                        ParentRef: recordSet["Id"],
                        Type: "CA",
                        RefValue: recordSet["Name"]
                    };
                    VHASmartAgentPopup.AppendCreateActivityButton("#" + AppletFullId + " .siebui-applet-header.AppletButtons.siebui-form-applet-header", data);
                }

                //if(formPM.Get('GetMode') == "Base")
                if (formPM.Get('GetMode') == "Base" || formPM.Get('GetMode') == "Edit") {
                    var cutomerType = SiebelApp.S_App.GetActiveBusObj('Account').GetBusCompByName('Account').GetFieldValue('VF Customer Type');
                    var customerSegment = SiebelApp.S_App.GetActiveBusObj('Account').GetBusCompByName('Account').GetFieldValue('VF Customer Segment');
                    if (cutomerType == 'Person' || customerSegment == 'Consumer' || customerSegment == '') {
                        $('input[aria-label="Registered Company #"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Number of Employees"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Business Location"]').parents('td').parent('tr').hide();

                        $('input[aria-label="Dissolved"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Care"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Corporate Group"]').parents('td').parent('tr').hide();
                        $('button[data-display="Validate"]').parents('td').parent('tr').hide();
                    }
                    if (customerSegment == 'Business') {
                        //$('input[aria-label="Bill Segment"]').parents('td').parent('tr').hide();
                    }
                    if (SiebelApp.S_App.GetActiveView().GetName() == 'VF Contact Id View' && formPM.GetPMName() == 'VHA SIS Account Entry Applet_PM_y') {
                        $('div[title="Customer Account Form Applet"]').addClass('CustomerAccountCustomStyle');
                    }
                    if ($('div.mceField a[role="link"]').length > 0) {
                        $('div.mceField a[role="link"]').addClass('ContactProfileLink');
                    }

                }

                this.GetPM().AttachPMBinding("FieldChange", function (control, field_value) {

                    if (control.GetFieldName() == 'VF Customer Segment' || control.GetFieldName() == 'VF Customer Type') {
                        if (field_value == 'Person' || field_value == 'Consumer') {
                            $('input[aria-label="Registered Company #"]').parents('td').parent('tr').hide();
                            $('input[aria-label="Number of Employees"]').parents('td').parent('tr').hide();
                            $('input[aria-label="Dissolved"]').parents('td').parent('tr').hide();
                            $('input[aria-label="Care"]').parents('td').parent('tr').hide();
                            $('input[aria-label="Corporate Group"]').parents('td').parent('tr').hide();
                            $('button[data-display="Validate"]').parents('td').parent('tr').hide();
                        }
                        if (field_value == 'Business') {
                            $('input[aria-label="Registered Company #"]').parents('td').parent('tr').show();
                            $('input[aria-label="Number of Employees"]').parents('td').parent('tr').show();
                            $('input[aria-label="Dissolved"]').parents('td').parent('tr').show();
                            $('input[aria-label="Care"]').parents('td').parent('tr').show();
                            $('input[aria-label="Corporate Group"]').parents('td').parent('tr').show();
                            $('button[data-display="Validate"]').parents('td').parent('tr').show();
                        }
                    }
                });

                if (formPM.Get('GetMode') == "New") {

                    if (cutomerType == 'Person' || customerSegment == 'Consumer' || customerSegment == undefined) {
                        $('input[aria-label="Registered Company #"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Number of Employees"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Business Location"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Registered Company #"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Number of Employees"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Dissolved"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Care"]').parents('td').parent('tr').hide();
                        $('input[aria-label="Corporate Group"]').parents('td').parent('tr').hide();
                        $('button[data-display="Validate"]').parents('td').parent('tr').hide();
                    }
                    if (customerSegment == 'Business') {
                        $('input[aria-label="Bill Segment"]').parents('td').parent('tr').hide();
                    }

                }

            }

            VHASISAccountEntryAppletPR.prototype.BindData = function (bRefresh) {
                SiebelAppFacade.VHASISAccountEntryAppletPR.superclass.BindData.apply(this, arguments);
                var formPM = this.GetPM();
                var PrimaryConID = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SIS Account Entry Applet'].GetBusComp().GetFieldValue("Primary Contact Id");
                if (PrimaryConID != '') {
                    authdetails = getdetails();
                    if (formPM.Get('GetMode') == "Base") {
                        authdetails = getdetails();
                        var phonestutasFlag = authdetails["Contact Number Validated"];
                        var emailstutasFlag = authdetails["Email Address Validated"];
                        var DigitalUserNameFlag = authdetails["DigitalUserName"];
                        var emailvalidactionCheck = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SIS Account Entry Applet'].GetBusComp().GetFieldValue("Main Email Address");
                        var emailVerified = SiebelApp.S_App.GetActiveBusObj('Account').GetBusCompByName('Account').GetFieldValue('Email Address Validated');
                        var nameVerified = SiebelApp.S_App.GetActiveBusObj('Account').GetBusCompByName('Account').GetFieldValue('Email Address Validated');
                        var contactVerified = SiebelApp.S_App.GetActiveBusObj('Account').GetBusCompByName('Account').GetFieldValue('Contact Number Validated');
                        var OrgName = SiebelApp.S_App.GetProfileAttr("VHANewOrg");
                        if ($('.CustomerAccountCustomStyle').find('input[aria-label="Email"]').val() != '') {
                            if (emailstutasFlag === "Y") {
                                $(".CustomerAccountCustomStyle").find('input[aria-label*="Email"]').addClass("displaynone");
                                $(".CustomerAccountCustomStyle").find('input[aria-label*="Email"]').after('<span class="vha-img-email-validate pr-2"></span>').next().text(authdetails["Email Address"]).after('<span class="dot_Class_Active"></span>');
                            } else {
                                $(".CustomerAccountCustomStyle").find('input[aria-label*="Email"]').addClass("displaynone");
                                $(".CustomerAccountCustomStyle").find('input[aria-label*="Email"]').after('<span class="vha-img-email-validate pr-2"></span>').next().text(authdetails["Email Address"]).after('<span class="trainglexclam" id="inactive-em-otpopup">Validate Number</span><span class="validateAPIlink validatePopup" id="validate-ot-email">Validate Email</span><span class="refreshicon-otpopup displaynone" id="refresh-em-otpopup">refresh</span><span class="dot_Class_Active displaynone" id="active-em-otpopup"></span>');
                            }
                        }
						var SendappIn_lov = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Name]= 'SendAppInvite' AND [List Of Values.Active]='Y'", {
							All: "true",
						})[0].Value;
                        if (DigitalUserNameFlag != "") {
                            $(".CustomerAccountCustomStyle").find('input[aria-label*="Digital Username"]').addClass("displaynone");
                            $(".CustomerAccountCustomStyle").find('input[aria-label*="Digital Username"]').after('<span class="vha-img-email-validate"></span>').next().text(DigitalUserNameFlag);
                        } else if (DigitalUserNameFlag == "" && authdetails["Email Address"] != "") {
                            $(".CustomerAccountCustomStyle").find('input[aria-label*="Digital Username"]').addClass("displaynone");
                            $(".CustomerAccountCustomStyle").find('input[aria-label*="Digital Username"]').after('<span class="vha-img-email-validate"></span>').next().text(" - ").after('<span class="validateAPIlink" id="Vha-CP-SendAppInvite">Send App Invite</span><span class="validateAPIlink displaynone" id="Vha-CP-SendAppInviteStatus">Invite Sent</span>');
							if(SendappIn_lov === "Y")
								$("#Vha-CP-SendAppInvite").removeClass("displaynone");
							else 
								$("#Vha-CP-SendAppInvite").addClass("displaynone");
																		
						} else {}
                        if ($('.CustomerAccountCustomStyle').find('input[aria-label="Contact Number"]').val() != '') {
                            /*if (phonestutasFlag == 'Y') {
                            $('.CustomerAccountCustomStyle').find('input[aria-label="Contact Number"]').after('<span class="dot_Class_Active"></span>');
                            } else {
                            if (OrgName != "Kogan") {
                            $('.CustomerAccountCustomStyle').find('input[aria-label="Contact Number"]').after('<span class="dot_Class_warning"></span><span class="validateAPIlink">Validate Number</span>');
                            }
                            }*/
                            if (phonestutasFlag === "Y") {
                                $(".CustomerAccountCustomStyle").find('input[aria-label*="Contact Number"]').addClass("displaynone");
                                $(".CustomerAccountCustomStyle").find('input[aria-label*="Contact Number"]').after('<span class="vha-img-contact-validate pr-2"></span>').next().text(authdetails["Home Phone #"]).after('<span class="dot_Class_Active"></span>');
                            } else {
                                $(".CustomerAccountCustomStyle").find('input[aria-label*="Contact Number"]').addClass("displaynone");
                                $(".CustomerAccountCustomStyle").find('input[aria-label*="Contact Number"]').after('<span class="vha-img-contact-validate pr-2"></span>').next().text(authdetails["Home Phone #"]).after('<span class="trainglexclam" id="inactive-ph-otpopup">Validate Number</span><span class="validateAPIlink validatePopup" id="validate-ot-phone">Validate Number</span><span class="refreshicon-otpopup displaynone" id="refresh-ph-otpopup">refresh</span><span class="dot_Class_Active displaynone" id="active-ph-otpopup"></span>');
                            }
                        }
                    }
                }
                $("#Vha-CP-SendAppInvite").on('click', function () {
                    var data;

                    $("#Vha-CP-SendAppInvite").addClass("displaynone");
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            stepAuthPbj.ARII = authdetails.AccARII;
                            stepAuthPbj.OrgName = authdetails.AccOrg;
                            stepAuthPbj.ContactId = authdetails["Contact Id"];
                            stepAuthPbj.AccountObjectId = authdetails["Row Id"];
                            stepAuthPbj.MSISDN = authdetails["Home Phone #"];
                            stepAuthPbj.EmailOTP = authdetails["Email Address"];
                            data = verifyEmailSms(stepAuthPbj, "sendinvite");
                            if (data.ErrCd === "0") {
                                $("#Vha-CP-SendAppInviteStatus").removeClass("displaynone");
                            } else {
                                $("#Vha-CP-SendAppInvite").removeClass("displaynone");
                                $("#Vha-CP-SendAppInviteStatus").addClass("displaynone");
                                if (data.ErrMsg == '') {
                                    data.ErrMsg = 'There is an error while processing this request. Please contact system administrator and try again after sometime.';
                                }
                                alert(data.ErrMsg);
                            }
                        }, 0);
                    });
                });
				$('#validate-ot-email').on('click', function () {
                    authcontdetails();
                    if (SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SIS Account Entry Applet'].GetBusComp().GetFieldValue("Primary Contact Id") !== "") {
                        // getdetails();
                        var data;
                        requestAnimationFrame(() => {
                            setTimeout(() => {
                                data = verifyEmailSms(stepAuthPbj, "email");
                                if (data.ErrCd === "0")
                                    $("#refresh-em-otpopup").removeClass("displaynone");
                                else
                                    alert(data.ErrMsg);
                            }, 0);
                        });

                    }
                });
				$('#refresh-ph-otpopup').on('click', function () {
                    var getflags = getdetails();
                    PhnVerifyFlag = getflags["Contact Number Validated"];
                    if (PhnVerifyFlag === "Y" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "Kogan") {
                        $(this).addClass("displaynone");
                        $('#inactive-ph-otpopup').addClass("displaynone");
                        $('#active-ph-otpopup').removeClass("displaynone");
                        $('#validate-ot-phone').addClass("displaynone");
                    } else {
                        $(this).removeClass("displaynone");
                        $('#inactive-ph-otpopup').removeClass("displaynone");
                        $('#active-ph-otpopup').addClass("displaynone");
                        $('#validate-ot-phone').removeClass("displaynone");
                    }

                });

                $('#refresh-em-otpopup').on('click', function () {
                    var getflags = getdetails();
                    EmailVerifyFlag = getflags["Email Address Validated"];
                    if (EmailVerifyFlag === "Y" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "Kogan") {
                        //if (EmailVerifyFlag === "Y") {
                        $(this).addClass("displaynone");
                        $('#inactive-em-otpopup').addClass("displaynone");
                        $('#active-em-otpopup').removeClass("displaynone");
                        $('#validate-ot-email').addClass("displaynone");
                    } else {
                        $(this).removeClass("displaynone");
                        $('#inactive-em-otpopup').removeClass("displaynone");
                        $('#active-em-otpopup').addClass("displaynone");
                        $('#validate-ot-email').removeClass("displaynone");
                    }
                });
				$('#validate-ot-phone').on('click', function () {
                    authcontdetails();
                    if (SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SIS Account Entry Applet'].GetBusComp().GetFieldValue("Primary Contact Id") !== "") {
                        // getdetails();
                        var data;
                        requestAnimationFrame(() => {
                            setTimeout(() => {
                                data = verifyEmailSms(stepAuthPbj, "phone");
                                if (data.ErrCd === "0")
                                    $("#refresh-ph-otpopup").removeClass("displaynone");
                                else
                                    alert(data.ErrMsg);
                            }, 0);
                        });

                    }
                });
            }

            VHASISAccountEntryAppletPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHASISAccountEntryAppletPR.superclass.BindEvents.apply(this, arguments);

            }

            VHASISAccountEntryAppletPR.prototype.EndLife = function () {
                SiebelAppFacade.VHASISAccountEntryAppletPR.superclass.EndLife.apply(this, arguments);
            }
			function authcontdetails() {
                const phoneNumber = authdetails["Home Phone #"];
                const maskedNumber = phoneNumber.substring(0, 2) + "xxxxxx" + phoneNumber.substring(phoneNumber.length - 3);

                const email = authdetails["Email Address"];
                const [username, domain] = email.split("@");
                const maskLength = username.length - 2;
                const maskedMiddle = "x".repeat(maskLength > 0 ? maskLength : 0);
                const maskedEmail = username.charAt(0) + maskedMiddle + username.charAt(username.length - 1) + "@" + domain;
                IdRefNum = getIDdetails();
                const insightNo = IdRefNum.IdReferenceNumber
                const maskedInsight = insightNo.substring(0, 0) + "xxxxxx" + insightNo.substring(insightNo.length - 3);
                //const maskedInsightdl = insightNo.substring(0, 0) + "*****" + insightNo.substring(insightNo.length - 3);
                if (IdRefNum.IdType != undefined && IdRefNum.IdType != "") {
                    $("#vha-ret-confirmCode").empty().append("<Label>" + IdRefNum.IdType + "</label><Label class=pl-4>" + maskedInsight + "</label>");
                    $('#idSighted').parent().css('pointer-events', 'auto');
                    $('#idSighted').parent().css('color', '#002244');
                } else {
                    $('#idSighted').parent().css('pointer-events', 'none');
                    $('#idSighted').parent().css('color', 'darkgray');

                }
                $("#vha-ret-authName").text(authdetails["Full Name"]);
                $("#vha-ret-authDob").text(authdetails["Birth Date"]);
                $("#vha-ret-authEmailDisplay").text(maskedEmail);
                $("#vha-ret-authPhoneDisplay").text(maskedNumber);

                stepAuthPbj.ARII = authdetails.AccARII;
                stepAuthPbj.OrgName = authdetails.AccOrg;
                stepAuthPbj.ContactId = authdetails["Contact Id"];
                stepAuthPbj.AccountObjectId = authdetails["Row Id"];
                stepAuthPbj.MSISDN = authdetails["Home Phone #"];
                stepAuthPbj.EmailOTP = authdetails["Email Address"];
                var getflags = getdetails();
                PhnVerifyFlag_step2 = getflags["Contact Number Validated"];
                EmailVerifyFlag_step2 = getflags["Email Address Validated"];
                $(".validated-status").show();

                if (PhnVerifyFlag_step2 === 'Y') {
                    $("#vha-step2-phone-traingexclm").addClass("displaynone");
                    $("#vha-step2-phone-tickmark").removeClass("displaynone");
                    $('#valiadte-phone').text("Verified");
                    $("#valiadte-phone").removeClass("displaynone");
                } else {
                    $("#vha-step2-phone-traingexclm").removeClass("displaynone");
                    $("#vha-step2-phone-tickmark").addClass("displaynone");
                    $('#valiadte-phone').text("Unverified");
                    $("#valiadte-phone").removeClass("displaynone");
                }
                if (EmailVerifyFlag_step2 === 'Y') {
                    $("#vha-step2-mail-traingexclm").addClass("displaynone");
                    $("#vha-step2-mail-tickmark").removeClass("displaynone");
                    $("#valiadte-email").text("Verified");
                    $("#valiadte-email").removeClass("displaynone");
                } else {
                    $("#vha-step2-mail-traingexclm").removeClass("displaynone");
                    $("#vha-step2-mail-tickmark").addClass("displaynone");
                    $("#valiadte-email").text("Unverified");
                    $("#valiadte-email").removeClass("displaynone");
                }

            }
            function getdetails() {
                //var PrimaryConID = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SIS Account Entry Applet'].GetBusComp().GetFieldValue("Primary Contact Id");

                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                var ObjectId = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SIS Account Entry Applet'].GetBusComp().GetFieldValue("Primary Contact Id");
                Input.SetProperty("Contact Id", ObjectId);
                Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                var datatemp = Outputs.childArray[0].propArray;
                return datatemp;

            }
			function getIDdetails() {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                var ObjectId = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SIS Account Entry Applet'].GetBusComp().GetFieldValue("Primary Contact Id");
                Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
                Input.SetProperty("Contact Id", ObjectId);
                Input.SetProperty("FlowType", "IDdata");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                //IdRefNum = Outputs.childArray[0].propArray.IdReferenceNumber;
                IdRefNum = Outputs.childArray[0].propArray;
                return IdRefNum;
            }
            function verifyEmailSms(item, callfrom) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                //var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
                Input.SetProperty("Object Id", item.ContactId);
                Input.SetProperty("sConId", item.ContactId);

                if (AuthmethodType === "email") {
                    Input.SetProperty("sType", "Email");
                    Input.SetProperty("sValue", item.EmailOTP);
                }
                if (AuthmethodType === "phone") {
                    Input.SetProperty("sType", "SMS");
                    Input.SetProperty("sValue", item.MSISDN);
                }
                if (callfrom === "sendinvite") {
                    Input.SetProperty("sType", "Register");
                    Input.SetProperty("sValue", item.EmailOTP);
                }
                //outside popup call
                if (callfrom === "phone") {
                    Input.SetProperty("sType", "SMS");
                    Input.SetProperty("sValue", item.MSISDN);
                }
                if (callfrom === "email") {
                    Input.SetProperty("sType", "Email");
                    Input.SetProperty("sValue", item.EmailOTP);
                }
                Input.SetProperty("ProcessName", "VHA Digital Email SMS Verification Process");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                var datatemp = Outputs.childArray[0].propArray;
                return datatemp;
            }

            return VHASISAccountEntryAppletPR;
        }
            ());
        return "SiebelAppFacade.VHASISAccountEntryAppletPR";
    })
}
