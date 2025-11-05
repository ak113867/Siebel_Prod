
if (typeof(SiebelAppFacade.VHASISContactValidactionAppletPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.VHASISContactValidactionAppletPR");
    define("siebel/custom/VHASISContactValidactionAppletPR", ["siebel/phyrenderer"],
        function () {

        SiebelAppFacade.VHASISContactValidactionAppletPR = (function () {

            function VHASISContactValidactionAppletPR(pm) {
                SiebelAppFacade.VHASISContactValidactionAppletPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(VHASISContactValidactionAppletPR, SiebelAppFacade.PhysicalRenderer);
            var pm;
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
            VHASISContactValidactionAppletPR.prototype.Init = function () {
                pm = this.GetPM();
                controls = pm.Get("GetControls");
                otpAutentication = controls['OTP Autentication'].GetInputName();
                //var phonenumber = SiebelApp.S_App.GetActiveView().GetAppletMap()['Contact Profile Form Applet'].GetBusComp().GetFieldValue("Home Phone #");
                //authdetails = SiebelApp.S_App.GetActiveView().GetAppletMap()['Contact Profile Form Applet'].GetBusComp().GetRecordSet()[0];
                SiebelAppFacade.VHASISContactValidactionAppletPR.superclass.Init.apply(this, arguments);
            }

            VHASISContactValidactionAppletPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHASISContactValidactionAppletPR.superclass.ShowUI.apply(this, arguments);
                //$("#valiadte-email").after('<button type="button" class="btn validated-link bg-white displaynone" id="validated-link-email">Verify email</button>');
                //$("#valiadte-phone").after('<button type="button" class="btn validated-link bg-white displaynone" id="validated-link-phone">verify phone</button>');
               if(TheApplication().GetProfileAttr("VHA User Type") == 'Care'){
				 $('#idSighted,label[for="idSighted"]').addClass("displaynone");			
				 $('#inApp,label[for="inApp"]').addClass("displaynone");				 
			   }
				 else{
					 $('#idSighted,label[for="idSighted"]').removeClass("displaynone");		
					  if(SiebelApp.S_App.GetProfileAttr('TPG Retail Access') === "Y"){
						  $('#inApp,label[for="inApp"]').removeClass("displaynone");				     
					 }
					 else{
						 $('#inApp,label[for="inApp"]').addClass("displaynone");				    
					 }
				}
			$('[aria-label="Contact Identification Details Form Applet:New"]').parent().parent().find('[class="siebui-applet-title"]').text('Contact Identification Details')
				$('#vha-phoneinput-Id').attr('autocomplete', 'off');
				$('#vha-emailinput-Id').attr('autocomplete', 'off');
				$('#vha-ret-driverlic-Id').attr('autocomplete', 'off');

                if (this.GetPM().GetPMName() === 'VHA ContactProfile Form Applet_PM_y') {
                    $('a[title="Contact Detail"]').parent().addClass('ContactDetailParent');
                }
                if (this.GetPM().Get('GetMode') != 'Edit' && this.GetPM().Get('GetMode') != 'New' && this.GetPM().Get('GetMode') != 'Query') {
                    if (SiebelApp.S_App.GetActiveBusObj('Contact').GetBusCompByName('Contact').GetFieldValue('Id') !== "") {
                        $('.AppletHIFormBorder').addClass('vha-img-contact-profile-form');
                        authdetails = getdetails();
                        //authIDdetails = getIDdetails();
                        var phonestutasFlag = authdetails["Contact Number Validated"];
                        var emailstutasFlag = authdetails["Email Address Validated"];
                        var DigitalUserNameFlag = authdetails["DigitalUserName"];
                        if (phonestutasFlag === "Y") {
                            $(".mceField").find('input[aria-label*="Contact Number"]').addClass("displaynone");
                            $(".mceField").find('input[aria-label*="Contact Number"]').after('<span class="vha-img-contact-validate"></span>').next().text(authdetails["Home Phone #"]).after('<span class="dot_Class_Active"></span>');
                        } else {
                            $(".mceField").find('input[aria-label*="Contact Number"]').addClass("displaynone");
                            $(".mceField").find('input[aria-label*="Contact Number"]').after('<span class="vha-img-contact-validate"></span>').next().text(authdetails["Home Phone #"]).after('<span class="trainglexclam" id="inactive-ph-otpopup">Validate Number</span><span class="validateAPIlink validatePopup" id="validate-ot-phone">Validate Number</span><span class="refreshicon-otpopup displaynone" id="refresh-ph-otpopup">refresh</span><span class="dot_Class_Active displaynone" id="active-ph-otpopup"></span>');
                        }
                        if (emailstutasFlag === "Y") {
                            $(".mceField").find('input[aria-label*="Contact Email"]').addClass("displaynone");
                            $(".mceField").find('input[aria-label*="Contact Email"]').after('<span class="vha-img-email-validate"></span>').next().text(authdetails["Email Address"]).after('<span class="dot_Class_Active"></span>');
                        } else {
                            $(".mceField").find('input[aria-label*="Contact Email"]').addClass("displaynone");
                            $(".mceField").find('input[aria-label*="Contact Email"]').after('<span class="vha-img-email-validate"></span>').next().text(authdetails["Email Address"]).after('<span class="trainglexclam" id="inactive-em-otpopup">Validate Number</span><span class="validateAPIlink validatePopup" id="validate-ot-email">Validate Email</span><span class="refreshicon-otpopup displaynone" id="refresh-em-otpopup">refresh</span><span class="dot_Class_Active displaynone" id="active-em-otpopup"></span>');
                        }
						var SendappIn_lov = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Name]= 'SendAppInvite' AND [List Of Values.Active]='Y'", {
							All: "true",
						})[0].Value;
                        if (DigitalUserNameFlag != "") {
                            $(".mceField").find('input[aria-label*="Digital Username"]').addClass("displaynone");
                            $(".mceField").find('input[aria-label*="Digital Username"]').after('<span class="vha-img-email-validate"></span>').next().text(DigitalUserNameFlag);
                        } else if (DigitalUserNameFlag == "" && authdetails["Email Address"] != "") {
                            $(".mceField").find('input[aria-label*="Digital Username"]').addClass("displaynone");
                            $(".mceField").find('input[aria-label*="Digital Username"]').after('<span class="vha-img-email-validate"></span>').next().text(" - ").after('<span class="validateAPIlink" id="Vha-CP-SendAppInvite">Send App Invite</span><span class="validateAPIlink displaynone" id="Vha-CP-SendAppInviteStatus">Invite Sent</span>');
							if(SendappIn_lov === "Y")
								$("#Vha-CP-SendAppInvite").removeClass("displaynone");
							else 
								$("#Vha-CP-SendAppInvite").addClass("displaynone");
													
						} else {}

                        $('input[aria-label="Contact Profile Row Id"]').addClass("displaynone");
                        $(".mceField").find('input[aria-label*="Contact Profile Row Id"]').after('<span class="vha-img-email-validate"></span>').next().text(authdetails["Contact Id"]);
                        //$('input[aria-label="Contact Profile Row Id"]').val(authdetails["Contact Id"]);


                    }
                }
                if (this.GetPM().Get('GetMode') === 'New') {
                    $('.AppletHIFormBorder').removeClass('vha-img-contact-profile-form');
                }
                /*if (SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "Kogan") {
                $('#inactive-ph-otpopup').addClass("displaynone");
                $('#active-ph-otpopup').addClass("displaynone");
                $('#validate-ot-phone').addClass("displaynone");
                }*/
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                var ObjectId = SiebelApp.S_App.GetActiveBusObj('Contact').GetBusCompByName('Contact').GetFieldValue('Id');
                Input.SetProperty("ProcessName", "VHA Get Contact Org Process");
                Input.SetProperty("Type", "CON");
                Input.SetProperty("SrcId", ObjectId);
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                OrgN = Outputs.childArray[0].propArray.OrgName;
                if (OrgN == "Kogan") {
                    $(this).addClass("displaynone");
                    $('#Vha-CP-SendAppInvite').addClass('forcehide');
                    $('#inactive-em-otpopup').addClass('forcehide');
                    //$('#active-em-otpopup').removeClass("displaynone");
                    $('#validate-ot-email').addClass('forcehide');
                    $('#inactive-ph-otpopup').addClass('forcehide');
                    //$('#active-ph-otpopup').removeClass("displaynone");
                    $('#validate-ot-phone').addClass('forcehide');
                    $('[title="Contact Account Linkages List Applet:Link Prepaid Account"]').addClass('forcehide');
                } else {
                    $('#Vha-CP-SendAppInvite').removeClass('forcehide');
                    $('#inactive-em-otpopup').removeClass('forcehide');
                    $('#validate-ot-email').removeClass('forcehide');
                    $('#inactive-ph-otpopup').removeClass('forcehide');
                    $('#validate-ot-phone').removeClass('forcehide');
                    $('[title="Contact Account Linkages List Applet:Link Prepaid Account"]').removeClass('forcehide');
                }

            }

            VHASISContactValidactionAppletPR.prototype.BindData = function (bRefresh) {
                SiebelAppFacade.VHASISContactValidactionAppletPR.superclass.BindData.apply(this, arguments);
                /*var isCtrl = false;
                document.onkeyup=function(e){
                if(e.keyCode == 17 ){
                isCtrl = false;
                }
                }
                document.onkeydown = function(e){
                if(e.keyCode == 17){
                isCtrl = true;
                }
                if(e.keyCode == 83 && isCtrl == true){
                console.log('Savingggggggggggggg');
                return false;
                }
                }*/
                if ($('.ContactDetailParent input[aria-label="Status"]').length > 0) {
                    if (this.GetPM().Get('GetMode') != 'Edit' && this.GetPM().Get('GetMode') != 'New' && this.GetPM().Get('GetMode') != 'Query') {
                        var statusWidth = $('.ContactDetailParent input[aria-label="Status"]').val().length * 11;
                        if (statusWidth > 100) {
                            statusWidth = 'width:' + statusWidth + 'px !important';
                        } else {
                            statusWidth = 'width:110px !important';
                        }
                        $('input[aria-labelledby="Status_Label_2"]').attr('style', statusWidth);
                    }
                }
                $(document).on("keydown", function (e) {
                    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                        e.preventDefault();
                        //console.log('CtrlS is Pressed');
                    }
                    if (e.ctrlKey && e.keyCode === 17) {
                        //console.log('ctrllllllllllllllllSave')
                    }
                });
            }

            VHASISContactValidactionAppletPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHASISContactValidactionAppletPR.superclass.BindEvents.apply(this, arguments);

                $('#validate-ot-phone').on('click', function () {
                    authcontdetails();
                    if (SiebelApp.S_App.GetActiveBusObj('Contact').GetBusCompByName('Contact').GetFieldValue('Id') !== "") {
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
                $('#validate-ot-email').on('click', function () {
                    authcontdetails();
                    if (SiebelApp.S_App.GetActiveBusObj('Contact').GetBusCompByName('Contact').GetFieldValue('Id') !== "") {
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

                $('#' + otpAutentication + ' a').on('click', function () {
                    // Authenticate with Workflow
                    $('#vha-cont-prof-skipbtn').text('Cancel');
                    // $('#valiadte-phone').text("Unverified");
                    // $('#valiadte-email').text("Unverified");
                    if (SiebelApp.S_App.GetActiveBusObj('Contact').GetBusCompByName('Contact').GetFieldValue('Id') !== "") {
                        authcontdetails();
                        $("#myModal").removeClass("displaynone");
                    }

                    if (OrgN === 'Kogan') {
                        $('#email').parent().hide();
                    }
                });
                $(".vha-ret-popup-close-btn").on('click', function () {
                    resetUI();
                    $("#myModal").addClass("displaynone");
                });
                $("#vha-cont-prof-skipbtn").on('click', function () {
                    resetUI();
                    $("#myModal").addClass("displaynone");
                });

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

                //authentication
                // step2 authentication start
                $("input[name=authMethod]").on("change", function () {
                    $(".send-otp").hide();
                    $(".resend-otp").hide();
                    $(".otp-status").hide();
                    $(".validated-link").addClass("displaynone");
                    $("#vha-idsight-send-otp-btn").addClass("displaynone");
                    $("#vha-inapp-send-otp-btn").addClass("displaynone");
                    $("#vha-email-send-otp-parent").addClass("displaynone");
                    $("#vha-phone-send-otp-parent").addClass("displaynone");
                    // $(".vha-ret-validate-form").addClass("displaynone");
                    // $("#vha-ret-validate-form-btn").addClass("displaynone");
                    $("#vha-ret-confirmCode").val("");
                    $(".refreshicon").addClass("displaynone");
                    switch (this.value) {
                    case 'idSighted':
                        //  $("#vha-idsight-send-otp-btn").show();
                        $("#vha-idsight-send-otp-btn").removeClass("displaynone");
                        AuthmethodType = "idSighted";
                        break;
                    case 'email':
                        AuthmethodType = "email";
                        if (EmailVerifyFlag_step2 === "Y") {
                            $("#vha-email-send-otp-btn").show();
                        } else {
                            $("#validated-link-email").removeClass("displaynone");
                        }
                        break;
                    case 'phone':
                        AuthmethodType = "phone";
                        if (PhnVerifyFlag_step2 === "Y" || OrgN === 'Kogan') {
                            $("#vha-phone-send-otp-btn").show();
                        } else {
                            $("#validated-link-phone").removeClass("displaynone");
                        }
                        break;
                    case 'inApp':
                        $("#vha-inapp-send-otp-btn").removeClass("displaynone");
                        AuthmethodType = "inApp";
                        break;

                    }

                });

                $("#vha-idsight-validateId-btn").on('click', function () {
                    //alert("validate id");
                    //var item = offerData[vhaindex];
                    IdRefNum = getIDdetails();
                    var strContactIdCode = $('#vha-ret-driverlic-Id').val();
                    if ($('#vha-ret-driverlic-Id').val() == IdRefNum.IdReferenceNumber) {
                        $('.IdentrySucess').removeClass('forcehide');
                        $('.IdentryFail').addClass('forcehide');
                        verifiedStep2 = "Y";
                    } else {
                        $('.IdentryFail').removeClass('forcehide');
                        $('.IdentrySucess').addClass('forcehide');
                        verifiedStep2 = "N";
                    }

                });
                $("#vha-inapp-checkbox").on('change', function () {

                    if ($(this).is(':checked')) {
                       verifiedStep2 ="Y";
                    } else {
                        verifiedStep2 ="N";
                    }
                });
                $("#validated-link-email").on('click', function () {
                    $("#valiadte-email").text("Email sent");
                    var data;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(stepAuthPbj, "mfa");
                            if (data.ErrCd === "0")
                                $("#vha-step2-mail-refresh").removeClass("displaynone");
                            else
                                alert(data.ErrMsg);
                        }, 0);
                    });

                });

                $("#validated-link-phone").on('click', function () {
                    $("#valiadte-phone").text("SMS sent");
                    var data;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(stepAuthPbj, "mfa");
                            if (data.ErrCd === "0")
                                $("#vha-step2-phone-refresh").removeClass("displaynone");
                            else
                                alert(data.ErrMsg);

                        }, 0);
                    });

                });
                $(".refreshicon").on('click', function () {
                    var getflags = getdetails();
                    PhnVerifyFlag_step2 = getflags["Contact Number Validated"];
                    EmailVerifyFlag_step2 = getflags["Email Address Validated"];
                    if (AuthmethodType === "phone") {
                        if (PhnVerifyFlag_step2 === 'Y') {
                            $("#vha-step2-phone-traingexclm").addClass("displaynone");
                            $("#vha-step2-phone-tickmark").removeClass("displaynone");
                            $(this).addClass("displaynone");
                            $("#validated-link-phone").addClass("displaynone");
                            $('#valiadte-phone').text("Verified");
                            $("#valiadte-phone").removeClass("displaynone");
                            $("#vha-phone-send-otp-btn").show();
                        } else {
                            $('#valiadte-phone').text("Unverified");
                            $("#valiadte-phone").removeClass("displaynone");
                            $("#vha-step2-phone-traingexclm").removeClass("displaynone");
                            $("#vha-step2-phone-tickmark").addClass("displaynone");
                        }
                    }
                    if (AuthmethodType === "email") {
                        if (EmailVerifyFlag_step2 === 'Y') {
                            $("#vha-step2-mail-traingexclm").addClass("displaynone");
                            $("#vha-step2-mail-tickmark").removeClass("displaynone");
                            $(this).addClass("displaynone");
                            $("#validated-link-email").addClass("displaynone");
                            $("#valiadte-email").text("Verified");
                            $("#valiadte-email").removeClass("displaynone");
                            $("#vha-email-send-otp-btn").show();
                        } else {
                            $("#valiadte-email").text("Unverified");
                            $("#valiadte-email").removeClass("displaynone");
                            $("#vha-step2-mail-traingexclm").removeClass("displaynone");
                            $("#vha-step2-mail-tickmark").addClass("displaynone");
                        }
                    }

                });
                $(".vha-ret-validate-form-btn").on('click', function () {
                    if (OtpStep2 != "") {
                        if (AuthmethodType === "phone")
                            var userotp = $("#vha-phoneinput-Id").val();
                        else
                            var userotp = $("#vha-emailinput-Id").val();

                        if (userotp === OtpStep2) {
                            verifiedStep2 = "Y";
                            // alert("verified");
                            if (AuthmethodType === "email") {
                                $('.emailauthSuccess').removeClass("displaynone");
                                $('.emailauthFail').addClass("displaynone");
                               /* const selectedRadio = document.querySelector('input[name="authMethod"]:checked');
                                if (selectedRadio) {
                                    selectedRadio.checked = false;
                                } */
                            }
                            if (AuthmethodType === "phone") {
                                $('.phoneauthSuccess').removeClass("displaynone");
                                $('.phoneauthFail').addClass("displaynone");
                              /*  const selectedRadio = document.querySelector('input[name="authMethod"]:checked');
                                if (selectedRadio) {
                                    selectedRadio.checked = false;
                                } */
                            }

                        } else {
                            verifiedStep2 = "N";
                            // alert("enter correct otp");
                            if (AuthmethodType === "email") {
                                $('.emailauthSuccess').addClass("displaynone");
                                $('.emailauthFail').removeClass("displaynone");
                            }
                            if (AuthmethodType === "phone") {
                                $('.phoneauthSuccess').addClass("displaynone");
                                $('.phoneauthFail').removeClass("displaynone");
                            }
                        }

                    }

                });
                $("#vha-email-send-otp-btn").on('click', function () {
                    $(this).hide();
                   // $("#email-status").text("Email sent").show();
                    $("#vha-email-send-otp-parent").removeClass("displaynone");
                    
                    var showotp;
					$('#vha-emailinput-Id').val(''); 
					$(".emailauthSuccess").addClass("displaynone");
					$(".emailauthFail").addClass("displaynone");
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            var response = SendOTP(stepAuthPbj);
                            showotp = response.GetChildByType("ResultSet").propArray.OTP;
                            //$("#vha-ret-confirmCode").val(showotp);

                            OtpStep2 = showotp;
                        }, 0);
                    });
                    //SendOTP(stepAuthPbj);
                    setTimeout(function () {
                        $("#email-status").hide();
                        // if (showotp === "")
                        $("#vha-email-resend-otp-btn").show();
                    }, 0);
                });
                $("#vha-cont-prof-nextbtn").on('click', function () {
                    if (verifiedStep2 === "Y") {
                        resetUI();
                        $("#myModal").addClass("displaynone");
                    } else
                        alert("Please authenticate customer before proceeding.");

                });
                $("#vha-phone-send-otp-btn").on('click', function () {
                    $(this).hide();
                   // $("#phone-status").text("SMS sent").show();
                    $("#vha-phone-send-otp-parent").removeClass("displaynone");
                   
                    var showotp;
					$('#vha-phoneinput-Id').val('');
					$(".phoneauthSuccess").addClass("displaynone");
					$(".phoneauthFail").addClass("displaynone");
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            var response = SendOTP(stepAuthPbj);
                            showotp = response.GetChildByType("ResultSet").propArray.OTP;
                            //$("#vha-ret-confirmCode").val(showotp);

                            OtpStep2 = showotp;
                        }, 0);
                    });
                    //SendOTP(stepAuthPbj);
                    setTimeout(function () {
                        $("#phone-status").hide();
                        //  if (showotp === "")
                        $("#vha-phone-resend-otp-btn").show();
                    }, 0);
                });

                $(".resend-otp").on('click', function () {
                    const id = $(this).attr('id');
                    //    const sendId = id.replace('resend', 'send');
                    $(this).hide();
                    switch (AuthmethodType) {
                    case 'idSighted':
                        $("#idsight-status").text("Code sent").show();
                        break;
                    case 'email':
                       // $("#email-status").text("Email sent").show();
					    var showotp;
						$('#vha-emailinput-Id').val(''); 
						$(".emailauthSuccess").addClass("displaynone");
						$(".emailauthFail").addClass("displaynone");
						requestAnimationFrame(() => {
							setTimeout(() => {
								var response = SendOTP(stepAuthPbj);
								showotp = response.GetChildByType("ResultSet").propArray.OTP;
								//$("#vha-ret-confirmCode").val(showotp);

								OtpStep2 = showotp;
							}, 0);
						});
                        break;
                    case 'phone':
                      //  $("#phone-status").text("SMS sent").show();
						 var showotp;
						 $('#vha-phoneinput-Id').val('');
						 $(".phoneauthSuccess").addClass("displaynone");
						 $(".phoneauthFail").addClass("displaynone");
						requestAnimationFrame(() => {
							setTimeout(() => {
								var response = SendOTP(stepAuthPbj);
								showotp = response.GetChildByType("ResultSet").propArray.OTP;
								//$("#vha-ret-confirmCode").val(showotp);

								OtpStep2 = showotp;
							}, 0);
						});
                        break;
                    case 'inApp':
                        $("#inapp-status").text("Code sent").show();
                        break;
                    }
                    setTimeout(function () {
                        $(".otp-status").hide();
                        $(`#${id}`).show();
                    }, 0);

                });

                // step2 authentication end
                //custom end
            }

            VHASISContactValidactionAppletPR.prototype.EndLife = function () {
                SiebelAppFacade.VHASISContactValidactionAppletPR.superclass.EndLife.apply(this, arguments);
            }
            // send otp
            function SendOTP(item) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                Input.SetProperty("ProcessName", "VHA Generate OTP Process");
                Input.SetProperty("OrgName", item.OrgName);
                Input.SetProperty("ARII", item.ARII);
                Input.SetProperty("ContactId", item.ContactId);
                Input.SetProperty("AccountObjectId", item.AccountObjectId);
                Input.SetProperty("AccId", item.AccountObjectId);

                if (AuthmethodType === "email") {
                    Input.SetProperty("EmailAddr", item.EmailOTP);
                    Input.SetProperty("EmailOTP", "ConEmailOTP");
                } else
                    Input.SetProperty("MSISDN", item.MSISDN);
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                return Outputs;
            }
            //ContactIdVerify.
            function ContactIdVerify(strContactIdCode) {}
            // call workflow for verifaction
            function getdetails() {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                var ObjectId = SiebelApp.S_App.GetActiveBusObj('Contact').GetBusCompByName('Contact').GetFieldValue('Id');
                Input.SetProperty("Contact Id", ObjectId);
                Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                var datatemp = Outputs.childArray[0].propArray;
                return datatemp;
            }
            function getIDdetails() {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                var ObjectId = SiebelApp.S_App.GetActiveBusObj('Contact').GetBusCompByName('Contact').GetFieldValue('Id');
                Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
                Input.SetProperty("Contact Id", ObjectId);
                Input.SetProperty("FlowType", "IDdata");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                //IdRefNum = Outputs.childArray[0].propArray.IdReferenceNumber;
                IdRefNum = Outputs.childArray[0].propArray;
                return IdRefNum;
            }
            // email or sms verify

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
            //reset mfa UI
            function resetUI() {
                $("#vha-phoneinput-Id").val("");
                $("#vha-emailinput-Id").val("");
				$('#vha-ret-driverlic-Id').val('');
				$(".IdentrySucess").addClass('forcehide');
                $(".IdentryFail").addClass('forcehide');
                $(".phoneauthSuccess").addClass("displaynone");
                $(".phoneauthFail").addClass("displaynone");
                $(".emailauthSuccess").addClass("displaynone");
                $(".emailauthFail").addClass("displaynone");
                $("#vha-email-send-otp-parent").addClass("displaynone");
                $("#vha-phone-send-otp-parent").addClass("displaynone");
                $("#vha-email-resend-otp-btn").hide();
                $("#vha-phone-resend-otp-btn").hide();
				
				$("#vha-idsight-send-otp-btn").addClass("displaynone");
				$("#vha-inapp-send-otp-btn").addClass("displaynone");
				$(".authenticate-sections").find("input[type='radio'], input[type='checkbox']").prop("checked", false);
				 $(".send-otp").hide();
				$(".resend-otp").hide();
				$(".otp-status").hide(); 
				$(".validated-link").addClass("displaynone");
				$(".refreshicon").addClass("displaynone");
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
				let maskedName = authdetails["Full Name"].replace(/(\b\w)(\w*)/g, (_, first, rest) => first + "x".repeat(rest.length));
	
                $("#vha-ret-authName").text(maskedName);
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
            return VHASISContactValidactionAppletPR;
        }
            ());
        return "SiebelAppFacade.VHASISContactValidactionAppletPR";
    })
}
