if (typeof(SiebelAppFacade.VHAHomeAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAHomeAppletPR");
    define("siebel/custom/VHAHomeAppletPR", ["siebel/custom/VHAAppUtilities"], function () {
        var offerData = [];
        var vhaindex;
        var AuthmethodType;
        var verfiedmfa;
		var selectedSserDetails;
        //var EmailvalidatedStatus = "InActive";
        //var PhonevalidatedStatus = "Active";
        var EmailvalidatedStatus = "";
        var PhonevalidatedStatus = "";
        var strIMAssetId = "";
        var strIMOrderId = "";
        var strIMMSISDN = "";
        var strIMRateplan = "";
        var strIMSearchType = "";
        var strAssetPIN = "";
        var strCustomerId = "";
        var strAssetPIN = "";
        var otpAutentication;
        var PhnVerifyFlag_step2;
        var EmailVerifyFlag_step2;
        var AuthmethodType;
        var stepAuthPbj = {};
        var OtpStep2;
       
        var authdetails;
        var OrgN;
        var IdRefNum;
        SiebelAppFacade.VHAHomeAppletPR = (function () {
            function VHAHomeAppletPR(pm) {
                SiebelAppFacade.VHAHomeAppletPR.superclass.constructor.call(this, pm);
            }
            SiebelJS.Extend(VHAHomeAppletPR, SiebelAppFacade.PhysicalRenderer);
            VHAHomeAppletPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHAHomeAppletPR.superclass.ShowUI.call(this);
                $('input[aria-label="Enter Locked SIM Number"]').removeAttr('readonly').attr('aria-readonly', 'false');
                // enable or diable mfa options
                if (TheApplication().GetProfileAttr("VHA User Type") == 'Care') {
                    $('#idSighted,label[for="idSighted"]').addClass("displaynone");
                    $('#inApp,label[for="inApp"]').addClass("displaynone");
                } else {
                    $('#idSighted,label[for="idSighted"]').removeClass("displaynone");
                    if (SiebelApp.S_App.GetProfileAttr('TPG Retail Access') === "Y") {
                        $('#inApp,label[for="inApp"]').removeClass("displaynone");
                    } else {
                        $('#inApp,label[for="inApp"]').addClass("displaynone");
                    }
                }
                $('#vha-phoneinput-Id').attr('autocomplete', 'off');
                $('#vha-emailinput-Id').attr('autocomplete', 'off');
                $('#vha-ret-driverlic-Id').attr('autocomplete', 'off');

                //$('[aria-label="Enter PIN"]').attr("type","password");
                $('.mceLabel').each(function () {
                    $(this).text($(this).text().replace(":", ""));
                });
                $('.viewbtn button').each(function () {
                    $(this).append('<img class="HPGoView" src="images/custom/VHAGoView.svg">');
                });
                $('.Homebtn+button').addClass("addauthdsbl");
                //$('[aria-label="Enter PIN"]').attr("type","password");
                //$('[aria-labelledby="Pin_Label"]').parent().append('<img id="pwdtoggle" class="HPshowpw" src="images/custom/showpw.svg">');//SBABU
                $('[name=' + this.GetPM().Get("GetControls")["Pin"].GetInputName() + ']').parent().append('<img id="pwdtoggle" class="HPshowpw" src="images/custom/showpw.svg">');
                $('input[aria-label="Enter Locked SIM Number"]').removeAttr('readonly').attr('aria-readonly', 'false');
            }
            VHAHomeAppletPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHAHomeAppletPR.superclass.BindEvents.apply(this, arguments);

                // new dashboard changes
                $(".vha-ret-popup-close-btn").on("click", function () {
                    $("#myModal").addClass("displaynone");
                    $("#vha-ret-send-otp-btn").removeClass("displaynone");
                    $(".vha-ret-validate-form").addClass("displaynone");
                    $("#vha-ret-validate-form-btn").addClass("displaynone");
                    $('input[name=authMethod]').prop('checked', false);

                    $(".send-otp").hide();
                    $(".resend-otp").hide();
                    $(".otp-status").hide();
                    $(".validated-status").hide();
                    resetMFA();
                });
				
                /*
                $("#vha-ret-send-otp-btn").on("click", function () {
                let radioschecked = $('input[name="authMethod"]').is(":checked");

                if (radioschecked) {
                var item = offerData[vhaindex];
                //SendOTP(item);
                var sShowOTP = SiebelApp.S_App.GetProfileAttr("ShowOTP");
                }
                else {
                $("#authMethod-error").text("Please select any one above");
                }
                });
                 */
                $(".vha-ret-validate-form-btn").on("click", function () {
                    var item = offerData[vhaindex];
                    var sShowOTP = SiebelApp.S_App.GetProfileAttr("ShowOTP");
                    //var strOTP = $('#vha-ret-confirmCode').val();
                    if (AuthmethodType === "phone")
                        var userotp = $("#vha-phoneinput-Id").val();
                    else
                        var userotp = $("#vha-emailinput-Id").val();
                    if (sShowOTP === userotp) {
                        if (AuthmethodType === "email") {
                            $(".emailauthSuccess").removeClass("displaynone");
                            $(".emailauthFail").addClass("displaynone");
                        }
                        if (AuthmethodType === "phone") {
                            $(".phoneauthSuccess").removeClass("displaynone");
                            $(".phoneauthFail").addClass("displaynone");
                        }
                        //NavigateView(item);
                        verfiedmfa = "Y";
                    } else {
                        if (AuthmethodType === "email") {
                            $(".emailauthSuccess").addClass("displaynone");
                            $(".emailauthFail").removeClass("displaynone");
                        }
                        if (AuthmethodType === "phone") {
                            $(".phoneauthSuccess").addClass("displaynone");
                            $(".phoneauthFail").removeClass("displaynone");
                        }
                    }

                });
                $("#vha-cont-prof-nextbtn").on("click", function () {
                    if (verfiedmfa === "Y") {
						$('body').css('cursor','progress');
                        resetMFA();
                        var item = offerData[vhaindex];
                        NavigateView(item);
						$('body').css('cursor','default');
                    } else
                        alert("Please authenticate customer before proceeding.");

                });
                /*
                $("#vha-ret-next-btn").on("click", function () {
                alert("go next");
                });
                 */
                $("#vha-ret-table-close-btn").on("click", function () {
                    $("#table-myModal").addClass("displaynone");
                });
				//$("#vha-cont-prof-skipbtn-home").on('click', function(){
					$(document).on('click','#vha-cont-prof-skipbtn-home', function() {
							$("#table-myModal").addClass("displaynone");
				}); 
                $("input[name=authMethod]").on("change", function () {
                    $('#vha-ret-confirmCode').val("");
                    $(".send-otp").hide();
                    $(".resend-otp").hide();
                    $(".otp-status").hide();
                    $(".validated-status").hide();
                    $("#vha-idsight-send-otp-btn").addClass("displaynone");
                    $("#vha-inapp-send-otp-btn").addClass("displaynone");
                    $("#vha-email-send-otp-parent").addClass("displaynone");
                    $("#vha-phone-send-otp-parent").addClass("displaynone");
                    //	$(".vha-ret-validate-form").addClass("displaynone");
                    //$("#vha-ret-validate-form-btn").addClass("displaynone");
                    $("#vha-reatil-user-nextbtn").addClass("displaynone");
                    $(".refreshicon").addClass("displaynone");
                    switch (this.value) {
                    case 'idSighted':
                        $("#vha-idsight-send-otp-btn").removeClass("displaynone");
                        AuthmethodType = "idSighted";
                        break;
                    case 'email':
                        AuthmethodType = "email";
                        if (EmailvalidatedStatus === "Y") {
                            $("#vha-ret-authEmailActive").removeClass("displaynone");
                            $("#vha-email-send-otp-btn").show();
                        } else {
                            $("#vha-ret-authEmailInActive").removeClass("displaynone");
                            //$("#vha-ret-authEmailActive").addClass("displaynone");
                            $("#valiadte-email").show();
                        }
                        break;
                    case 'phone':
                        AuthmethodType = "phone";
                        if (PhonevalidatedStatus === "Y") {
                            $("#vha-ret-authPhoneActive").removeClass("displaynone");
                            $("#vha-phone-send-otp-btn").show();
                        } else {
                            $("#vha-ret-authPhoneInActive").removeClass("displaynone");
                            //$("#vha-ret-authPhoneActive").addClass("displaynone");
                            $("#valiadte-phone").show();
                        }
                        break;
                    case 'inApp':
                        $("#vha-inapp-send-otp-btn").removeClass("displaynone");
                        $("#vha-reatil-user-nextbtn").removeClass("displaynone");
                        $('#vha-reatil-user-nextbtn').addClass('primary-disabled');
                        AuthmethodType = "inApp";
                        break;

                    }

                });
                //verification email link click
                $("#valiadte-email").on('click', function () {
                    $("#vha-step2-mail-unverified").text("Email sent");
                    var item = offerData[vhaindex];
                    var AuthmethodType = "email";
                    //verifyEmailSms(item,AuthmethodType);
                    var data;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(item, AuthmethodType);
                            if (data.ErrCd === "0")
                                $("#vha-step2-email-refresh").removeClass("displaynone");
                            else
                                alert(data.ErrMsg);
                        }, 0);
                    });
                });
                $("#valiadte-phone").on('click', function () {
                    $("#vha-step2-phone-unverified").text("SMS sent");
                    var item = offerData[vhaindex];
                    var AuthmethodType = "phone";
                    //verifyEmailSms(item,AuthmethodType);
                    var data;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(item, AuthmethodType);
                            if (data.ErrCd === "0")
                                $("#vha-step2-phone-refresh").removeClass("displaynone");
                            else
                                alert(data.ErrMsg);
                        }, 0);
                    });
                });
                $("#vha-idsight-validateId-btn").on('click', function () {
                    //alert("validate id");
                    //var item = offerData[vhaindex];
                   // IdRefNum = getIDdetails();
				   
                    var strContactIdCode = $('#vha-ret-driverlic-Id').val();
                    if ($('#vha-ret-driverlic-Id').val() == selectedSserDetails) {
                        $('.IdentrySucess').removeClass('displaynone');
                        $('.IdentryFail').addClass('displaynone');
                        verfiedmfa = "Y";
                    } else {
                        $('.IdentryFail').removeClass('displaynone');
						
                        $('.IdentrySucess').addClass('displaynone');
                        verfiedmfa = "N";
                    }

                });
                $("#vha-inapp-checkbox").on('change', function () {
                    if ($(this).is(':checked')) {
                        $('#vha-cont-prof-nextbtn').removeClass('primary-disabled');
                        verfiedmfa = "Y";
                    } else {
                        $('#vha-cont-prof-nextbtn').removeClass('primary-disabled');
                        verfiedmfa = "N";
                    }
                });
                /*   $("#vha-reatil-user-nextbtn").on('click', function(){
                var item = offerData[vhaindex];
                NavigateView(item);
                }); */

                // refresh triggers
                $(".refreshicon").on("click", function () {
                    var getflags = getdetails();
                    PhonevalidatedStatus = getflags["Contact Number Validated"];
                    EmailvalidatedStatus = getflags["Email Address Validated"];
                    if (AuthmethodType === "phone") {
                        if (PhonevalidatedStatus === "Y") {
                            $("#vha-ret-authPhoneInActive").addClass("displaynone");
                            $("#vha-ret-authPhoneActive").removeClass("displaynone");
                            $(this).addClass("displaynone");
                            $("#valiadte-phone").hide();
                            $("#vha-phone-send-otp-btn").show();
                            $('#vha-step2-phone-unverified').text("Verified");
                            $("#vha-step2-phone-unverified").removeClass("displaynone");
                        } else {
                            $("#vha-ret-authPhoneInActive").removeClass("displaynone");
                            $("#vha-ret-authPhoneActive").addClass("displaynone");
                            $('#vha-step2-phone-unverified').text("Unverified");
                            $("#vha-step2-phone-unverified").removeClass("displaynone");
                        }
                    }
                    if (AuthmethodType === "email") {
                        if (EmailvalidatedStatus === "Y") {
                            $("#vha-ret-authEmailInActive").addClass("displaynone");
                            $("#vha-ret-authEmailActive").removeClass("displaynone");
                            $(this).addClass("displaynone");
                            $("#valiadte-email").hide();
                            $("#vha-email-send-otp-btn").show();
                            $("#vha-step2-mail-unverified").text("Verified");
                            $("#vha-step2-mail-unverified").removeClass("displaynone");
                        } else {
                            $("#vha-ret-authEmailInActive").removeClass("displaynone");
                            $("#vha-ret-authEmailActive").addClass("displaynone");
                            $("#vha-step2-mail-unverified").text("Unverified");
                            $("#vha-step2-mail-unverified").removeClass("displaynone");
                        }
                    }
                });

                $("#vha-email-send-otp-btn").on('click', function () {
                    $(this).hide();
                    //$("#email-status").text("Email sent").show();
                    $("#vha-email-send-otp-parent").removeClass("displaynone");
                    //$(".vha-ret-validate-form").removeClass("displaynone");
                    //$("#vha-ret-validate-form-btn").removeClass("displaynone");
                    var item = offerData[vhaindex];
                    var email = "EmailOTP";
                    $('#vha-emailinput-Id').val('');
                    $(".emailauthSuccess").addClass("displaynone");
                    $(".emailauthFail").addClass("displaynone");
                    requestAnimationFrame(() => {
                        setTimeout(function () {
                            SendOTP(item, email);
                            var sShowOTP = SiebelApp.S_App.GetProfileAttr("ShowOTP");
                            //$('#vha-ret-confirmCode').val(sShowOTP);
                        }, 0);
                    });
                    setTimeout(function () {
                        //  $("#email-status").hide();
                        $("#vha-email-resend-otp-btn").show();
                    }, 0);
                });
                $("#vha-phone-send-otp-btn").on('click', function () {
                    $(this).hide();
                    $("#vha-phone-send-otp-parent").removeClass("displaynone");
                    //$("#phone-status").text("SMS sent").show();
                    //$(".vha-ret-validate-form").removeClass("displaynone");
                    //$("#vha-ret-validate-form-btn").removeClass("displaynone");
                    var item = offerData[vhaindex];
                    var email = "";
                    $('#vha-phoneinput-Id').val('');
                    $(".phoneauthSuccess").addClass("displaynone");
                    $(".phoneauthFail").addClass("displaynone");
                    requestAnimationFrame(() => {
                        setTimeout(function () {
                            SendOTP(item, email);
                            var sShowOTP = SiebelApp.S_App.GetProfileAttr("ShowOTP");
                            //$('#vha-ret-confirmCode').val(sShowOTP);
                        }, 0);
                    });

                    setTimeout(function () {
                        // $("#phone-status").hide();
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
                        $('#vha-emailinput-Id').val('');
                        $(".emailauthSuccess").addClass("displaynone");
                        $(".emailauthFail").addClass("displaynone");
                        requestAnimationFrame(() => {
                            var item = offerData[vhaindex];
                            var email = "EmailOTP";
                            setTimeout(function () {
                                SendOTP(item, email);
                            }, 0);
                        });
                        break;
                    case 'phone':
                        // $("#phone-status").text("SMS sent").show();
                        $('#vha-phoneinput-Id').val('');
                        $(".phoneauthSuccess").addClass("displaynone");
                        $(".phoneauthFail").addClass("displaynone");
                        requestAnimationFrame(() => {
                            var item = offerData[vhaindex];
                            var email = "";
                            setTimeout(function () {
                                SendOTP(item, email);
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
                // new dashboard changes
                $('[aria-label="Enter PIN"]').on("click", function () {
                    if ($('#pwdtoggle').attr('class') == "HPshowpw") {
                        $('[aria-label="Enter PIN"]').attr("type", "password");
                    }
                });
                $('#pwdtoggle').on("click", function () {
                    var inp = $('[aria-label="Enter PIN"]');
                    if (inp.attr("type") == "password") {
                        inp.attr("type", "text");
                    } else {
                        inp.attr("type", "password");
                    }
                    if ($('#pwdtoggle.HPshowpw').length > 0) {
                        $('#pwdtoggle').attr("src", "images/custom/hidepw.svg");
                    } else {
                        $('#pwdtoggle').attr("src", "images/custom/showpw.svg");
                    }
                    $('#pwdtoggle').toggleClass("HPhidepw").toggleClass("HPshowpw");
                });
            }
            VHAHomeAppletPR.prototype.Init = function () {
                SiebelAppFacade.VHAHomeAppletPR.superclass.Init.apply(this, arguments);
                this.GetPM().AddMethod("FieldChange", OnFieldChange, {
                    sequence: false,
                    scope: this
                });
                this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
                    sequence: false,
                    scope: this
                });
            }
            function OnFieldChange(control, value) {
                if (control.GetName() == "Enter Transferring Mobile Number") {
                    $("#HomeAddAuthCtls,#VHAHpNotes").addClass("VFDisplayNone");
                    if (value == "" || value == null) {
                        $('.Homebtn+button').addClass("addauthdsbl");
                        SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Home Applet"].GetPModel().Get("GetBusComp").SetFieldValue("Primary ID type", "");
                        $("#HomeAddAuthCtls,#VHAHpNotes").addClass("VFDisplayNone");
                    } else {
                        $('.Homebtn+button').removeClass("addauthdsbl");
                    }
                }
                if (control.GetName() == "ID Type") {
                    $("#HomeAddAuthCtls,#VHAHpNotes").removeClass("VFDisplayNone");
                }
            }
            // email or phone verification
            function verifyEmailSms(item, AuthmethodType) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                Input.SetProperty("Object Id", item.ContactId);
                Input.SetProperty("sConId", item.ContactId);
                if (AuthmethodType === "email") {
                    Input.SetProperty("sType", "Email");
                    Input.SetProperty("sValue", item.EmailAddress);
                }
                if (AuthmethodType === "phone") {
                    Input.SetProperty("sType", "SMS");
                    Input.SetProperty("sValue", item.MSISDN);
                }
                Input.SetProperty("ProcessName", "VHA Digital Email SMS Verification Process");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                return Outputs.GetChildByType("ResultSet").propArray;
            }

            // new dashboard changes
            function updateAuthForm(user, index) {
                const maskLengthlastname = user.LastName.length - 1;
                const maskLengthmidname = user.MiddleName.length - 1;
                const maskLengthfirstname = user.FirstName.length - 1;
                const maskedLast = "x".repeat(maskLengthlastname > 0 ? maskLengthlastname : 0);
                const maskedMid = "x".repeat(maskLengthmidname > 0 ? maskLengthmidname : 0);
                const maskedFirst = "x".repeat(maskLengthfirstname > 0 ? maskLengthfirstname : 0);
                const maskedName = user.FirstName.substring(0, 1) + maskedFirst + " " + user.MiddleName.substring(0, 1) + maskedMid + " " + user.LastName.substring(0, 1) + maskedLast + " ";
                const phoneNumber = user.MSISDN;
                const maskedNumber = phoneNumber.substring(0, 2) + "xxxxxx" + phoneNumber.substring(phoneNumber.length - 3);

                const email = user.EmailAddress;
                const [username, domain] = email.split("@");
                const maskLength = username.length - 2;
                const maskedMiddle = "x".repeat(maskLength > 0 ? maskLength : 0);
                const maskedEmail = username.charAt(0) + maskedMiddle + username.charAt(username.length - 1) + "@" + domain;
                IdRefNum = getIDdetails(user);
				const insightNo = IdRefNum.IdReferenceNumber;
				selectedSserDetails = IdRefNum.IdReferenceNumber;
                const maskedInsight = insightNo.substring(0, 0) + "xxxxxx" + insightNo.substring(insightNo.length - 3);
				if (IdRefNum.IdType != undefined && IdRefNum.IdType != "") {
                    $("#vha-ret-confirmCode").empty().append("<Label>" + IdRefNum.IdType + "</label><Label class=pl-4>" + maskedInsight + "</label>");
                    $('#idSighted').parent().css('pointer-events', 'auto');
                    $('#idSighted').parent().css('color', '#002244');
                } else {
                    $('#idSighted').parent().css('pointer-events', 'none');
                    $('#idSighted').parent().css('color', 'darkgray');

                }
                $("#vha-ret-authName").text(maskedName);
                $("#vha-ret-authDob").text(user.DOB);
                $("#vha-ret-authEmailDisplay").text(maskedEmail);
                $("#vha-ret-authPhoneDisplay").text(maskedNumber);

                PhonevalidatedStatus = user.PhonevalidatedStatus;
                EmailvalidatedStatus = user.EmailvalidatedStatus;
                //validation flags
                $(".tickmarkactive").addClass("displaynone");
                $(".tickmarkInactive").addClass("displaynone");
                $(".unverifiedbtn").addClass("displaynone");
                if (PhonevalidatedStatus === "Y") {
                    $("#vha-ret-authPhoneInActive").addClass("displaynone");
                    $("#vha-ret-authPhoneActive").removeClass("displaynone");
                    $('#vha-step2-phone-unverified').text("Verified");
                    $("#vha-step2-phone-unverified").removeClass("displaynone");
                } else {
                    $("#vha-ret-authPhoneInActive").removeClass("displaynone");
                    $("#vha-ret-authPhoneActive").addClass("displaynone");
                    $('#vha-step2-phone-unverified').text("Unverified");
                    $("#vha-step2-phone-unverified").removeClass("displaynone");
                }
                if (EmailvalidatedStatus === "Y") {
                    $("#vha-ret-authEmailInActive").addClass("displaynone");
                    $("#vha-ret-authEmailActive").removeClass("displaynone");
                    $("#vha-step2-mail-unverified").text("Verified");
                    $("#vha-step2-mail-unverified").removeClass("displaynone");
                } else {
                    $("#vha-ret-authEmailInActive").removeClass("displaynone");
                    $("#vha-ret-authEmailActive").addClass("displaynone");
                    $("#vha-step2-mail-unverified").text("Unverified");
                    $("#vha-step2-mail-unverified").removeClass("displaynone");
                }

                $("#myModal").removeClass("displaynone");
                $("#table-myModal").addClass("displaynone");
                vhaindex = index;
				$('.IdentryFail').addClass('displaynone');
				$('.IdentrySucess').addClass('displaynone');
            }
            //Send OTP
            function SendOTP(item, email) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                Input.SetProperty("ProcessName", "VHA Generate OTP Process");
                Input.SetProperty("OrgName", item.OrgName);
                Input.SetProperty("ARII", item.ARII);
                Input.SetProperty("ContactId", item.ContactId);
                Input.SetProperty("AccountObjectId", item.AccountObjectId);
                Input.SetProperty("AccId", item.AccountObjectId);
                Input.SetProperty("MSISDN", item.MSISDN);
                if (AuthmethodType === "email")
                    Input.SetProperty("EmailOTP", "ConEmailOTP");
                Input.SetProperty("EmailAddr", item.EmailAddress);
                var Outputs = ser.InvokeMethod("RunProcess", Input);
            }
            //ContactIdVerify.
            function ContactIdVerify(item, strContactIdCode) {
                var Inputs = SiebelApp.S_App.NewPropertySet();
                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                Inputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service");
                Inputs.SetProperty("Method Name", "VerifyContactId");
                Inputs.SetProperty("CustomerId", strCustomerId);
                Inputs.SetProperty("PIN", strAssetPIN);
                //Inputs.SetProperty("IdEntry", "12569655");
                Inputs.SetProperty("IdEntry", strContactIdCode);
                var Outputs = ser.InvokeMethod("Run Process", Inputs);
                var resultset = Outputs.GetChildByType("ResultSet");
                var srtconId = resultset.propArray["ConIdRef"];
                if (srtconId != "" && srtconId != null) {
                    verfiedmfa = "Y";
                    $(".IdentrySucess").removeClass("displaynone");
                    $(".IdentryFail").addClass("displaynone");
                } else {
                    $(".IdentrySucess").addClass("displaynone");
                    $(".IdentryFail").removeClass("displaynone");
                }
                //alert('Please enter the valid ID.');
                //NavigateView(item);

            }
            //Navigate to view
            function NavigateView(item) {
				
				const loadingIconHtml = ` <div id="loadingIcon" style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: transparent;
                        padding: 20px;
                        z-index: 10000;
						display: none;
                    ">
                        <img id="loading" src="images/custom/VHAloadingAjax.gif" style="
						border-radius: 25px;
						box-sizing: unset;
						border: unset;
						background-size: 50px;
						height: 50px;
						width: 50px;">
                    </div>
					`;
	$("body").append(loadingIconHtml);
	const loadingIcon = $("#loadingIcon");
	loadingIcon.show();
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                if (strIMSearchType === "RC_Order") {
                    Input.SetProperty("Order Id", strIMOrderId);
                    Input.SetProperty("ProcessName", "VF Go To R&C Orders View");
                }
                if (strIMSearchType === "Order") {
                    Input.SetProperty("Order Id", strIMOrderId);
                    Input.SetProperty("ProcessName", "VF Go To Orders View");
                }
                if (strIMSearchType === "Billing Account") {
                    Input.SetProperty("Account Id", strIMOrderId);
                    Input.SetProperty("ProcessName", "VF Go To Billing Account View");
                }
                if (strIMSearchType === "Customer Account") {
                    Input.SetProperty("Account Id", strIMOrderId);
                    Input.SetProperty("ProcessName", "VF Go To Customer Account View");
                }
                /*
                if (strIMSearchType	=== "MSISDN")
                Input.SetProperty("Asset Id", strIMAssetId);
                Input.SetProperty("ProcessName", "VF Go To Asset Summary View");
                 */
                if (strIMSearchType === "RatePlan") {
                    Input.SetProperty("Rate Plan", strIMRateplan);
                    Input.SetProperty("MSISDN", strIMAssetId);
                    Input.SetProperty("ProcessName", "VF Go To Home Rate Plan View");
                }
                if (strIMSearchType === "Billing Account" || strIMSearchType === "Customer Account" || strIMSearchType === "MSISDN") {
                    SiebelApp.S_App.SetProfileAttr("CustomerId", strCustomerId);
                    Input.SetProperty("Order Id", strCustomerId);
                    Input.SetProperty("ProcessName", "VF GotoView - Sales Homepage");
                }
                //Input.SetProperty("ProcessName", "VF GotoView - Sales Homepage");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
				setTimeout(() => {
				loadingIcon.hide();
				},4000);
            }
            // new dashboard changes
            function createAuthTable(data) {
                $(".vha-ret-table-authen tbody").html("");
				var selectth = document.querySelector("#table-myModal > div > table > thead > tr > th:nth-child(7)");
				$('#vha-cont-prof-skipbtn-home').remove();
				$('.vha-ret-table-authen').after('<button class="skip vha-ret-popup-close-btn-home" id="vha-cont-prof-skipbtn-home">Cancel</button>');
				$(selectth).hide();
                $.each(data, function (index, item) {
                   /* var row = $("<tr>");
                    var vha_img_radioBtn = $('<button class="btn-bg-blue">Select</button>').attr("value", index).on(
                            "click",

                            function () {
                            updateAuthForm(item, index);
                        });*/
					var row = $("<tr>").attr("data-index", index).attr("data-item", JSON.stringify(item));
					row.on("click", function () {
						var rowIndex = $(this).attr("data-index");
						var rowItem = JSON.parse($(this).attr("data-item"));
						updateAuthForm(rowItem, rowIndex);
					});
                    ///var radioCell = $("<td>").append(vha_img_radioBtn);
					//var ActiveStatus = $('<span id="activeicon"class="dot_Class_Active"></span>');
                    var ActiveStatus = $('<div class="verifiedbg1"><span id="statusActivetext">Active</span><span class="tickmark" id="statusActive"></span></div>');
                    /*row.append($("<td>").text(item.FirstName || "-"));
                    row.append($("<td>").text(item.MiddleName || "-"));
                    row.append($("<td>").text(item.LastName || "-"));*/
                    row.append($("<td>").text(item.FirstName ? item.FirstName.charAt(0) + "x".repeat(item.FirstName.length - 1) : "-"));
                    row.append($("<td>").text(item.MiddleName ? item.MiddleName.charAt(0) + "x".repeat(item.MiddleName.length - 1) : "-"));
                    row.append($("<td>").text(item.LastName ? item.LastName.charAt(0) + "x".repeat(item.LastName.length - 1) : "-"));
                    row.append($("<td>").text(item.DOB || "-"));
                    row.append($("<td>").text(item.VFContactRole || "-"));
                    if (item.Status == "Active") {
                        //row.append($("<td>").text(item.Status).append(ActiveStatus));
                        row.append(ActiveStatus);
                    } else {
                        row.append($("<td>").text(item.Status || "-"));
                    }
                    //row.append(radioCell);
                    $(".vha-ret-table-authen tbody").append(row);
                });
            }
            function getdetails() {
                var item = offerData[vhaindex];
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                //var ObjectId = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA Home Applet'].GetBusComp().GetFieldValue("Id");
		var ObjectId = item.ContactId;
                Input.SetProperty("Contact Id", ObjectId);
                Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                var datatemp = Outputs.childArray[0].propArray;
                return datatemp;
            }
            //mfa reset UI
            function resetMFA() {
                $("#vha-email-send-otp-parent").addClass("displaynone");
                $("#vha-idsight-send-otp-btn").addClass("displaynone");
                $("#vha-inapp-send-otp-btn").addClass("displaynone");
                $("#vha-phone-send-otp-parent").addClass("displaynone");
                $('#vha-phoneinput-Id').val('');
                $(".phoneauthSuccess").addClass("displaynone");
                $(".phoneauthFail").addClass("displaynone");
                $('#vha-emailinput-Id').val('');
                $(".emailauthSuccess").addClass("displaynone");
                $(".emailauthFail").addClass("displaynone");
                $('#vha-ret-driverlic-Id').val('');
				$('.IdentryFail').addClass('displaynone');
				$('.IdentrySucess').addClass('displaynone');
                verfiedmfa = "N";

            }
            function getIDdetails(user) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
				//selectedSserDetails = user;
                var ObjectId = user.ContactId;
                Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
                Input.SetProperty("Contact Id", ObjectId);
                Input.SetProperty("FlowType", "IDdata");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                //IdRefNum = Outputs.childArray[0].propArray.IdReferenceNumber;
                IdRefNum = Outputs.childArray[0].propArray;
                return IdRefNum;
            }
            // new dashboard changes
            function nbaOfferdiv() {
                $("#nbagridContainer").remove();
                $("body").append('<div id="nbagridContainer" title="Select a Customer Profile">\
                    <table id="nbajqGrid"></table>\
                    <div id="nbajqGridPager"></div>\
                    </div>');
                $("#nbagridContainer").dialog({
                    resizable: false,
                    autoOpen: false,
                    modal: true,
                    buttons: [{
                            text: "Cancel",
                            "class": "vha-custom-button btn vhasecondarybtn",
                            click: function () {
                                $(this).dialog("close");
                                //$("#error").hide();
                            }
                        }
                    ],
                    buttons: [{
                            text: "Next",
                            "class": "vha-custom-button btn vhaIMRetailNextbtn",
                            click: function () {
                                $(this).dialog("Next");
                                //$("#error").hide();
                            }
                        }
                    ],
                    width: "600px",
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                });
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
            //Main Method
            function PostInvokeMethod(MethodName) {
                if (MethodName == "EventMethodValidate1") {
                    SiebelApp.S_App.SetProfileAttr("MCount", "");
                    SiebelApp.S_App.SetProfileAttr("MSISDNDOB", "");
                    SiebelApp.S_App.SetProfileAttr("IMSearchType", "");
                    SiebelApp.S_App.SetProfileAttr("ShowOTP", "");
                    var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                    var Input = SiebelApp.S_App.NewPropertySet();
                    Input.SetProperty("ProcessName", "VF Imagine Validate Customer");
                    Input.SetProperty("CartRefresh", "");
                    var Output = ser.InvokeMethod("RunProcess", Input);
                    //Moved this code for Error Validation
                    /*var sErrMsg = Output.childArray[0].childArray[0].propArray.ErrMsg;
                    if (sErrMsg!="")
                {
                    alert(sErrMsg);
                    return false;
                    }*/
                    strAssetPIN = SiebelApp.S_App.GetProfileAttr("strAssetPIN");
                    strCustomerId = SiebelApp.S_App.GetProfileAttr("CustomerId");

                    strIMAssetId = SiebelApp.S_App.GetProfileAttr("IMAssetId");
                    strIMOrderId = SiebelApp.S_App.GetProfileAttr("IMOrderId");
                    strIMMSISDN = SiebelApp.S_App.GetProfileAttr("IMMSISDN");
                    strIMRateplan = SiebelApp.S_App.GetProfileAttr("IMRateplan");
                    strIMSearchType = SiebelApp.S_App.GetProfileAttr("IMSearchType");
                    //var strRetailSIMIMEI = SiebelApp.S_App.GetProfileAttr("RetailSIMIMEI");
					/*
                    if (SiebelApp.S_App.GetProfileAttr("MSISDNDOB") === "NoDOB" && strIMSearchType !== "Order" && strIMSearchType !== "RC_Order") {
                        alert("Date of birth is mandatory.");
                    }
					*/
					var strInputStr = SiebelApp.S_App.GetProfileAttr("SCMobileNumber");
					var typeindex = strInputStr.substring(0,2); 
					if (SiebelApp.S_App.GetProfileAttr("MSISDNDOB") === "NoDOB" && strIMSearchType !== "Order" && strIMSearchType !== "RC_Order" && typeindex !="3-" && typeindex !="4-" && typeindex !="RC" && typeindex !="CC" && strInputStr.length < "15")
					{                    
						alert("Date of birth is mandatory.");
					}					
                    $("#myModalRetail").removeClass("modal displaynone");
                    var strMCount = SiebelApp.S_App.GetProfileAttr("MCount");
                    //var strMCount = 2;
                    // new dashboard changes
                    //createAuthTable(data);
                    //$("#table-myModal").removeClass("displaynone");
                    if (strMCount > 0) {
                        strAssetPIN = $('input[aria-label="Date of Birth"]').val();
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                        Inputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service");
                        Inputs.SetProperty("Method Name", "VerifyImagineContactDOBforRetail");
                        Inputs.SetProperty("CustomerId", strCustomerId);
                        Inputs.SetProperty("PIN", strAssetPIN);
                        //Inputs.SetProperty("CustomerId", "2-CLNXQ5W");
                        //Inputs.SetProperty("PIN", "09/10/1994");
                        var Outputs = ser.InvokeMethod("Run Process", Inputs);
                        var resultset = Outputs.GetChildByType("ResultSet");

                        var offerLen = resultset.childArray.length;
                        if (offerLen > 0) {
                            var offer = resultset.childArray;
                            nbaOfferdiv();
                            offerData = [];
                            for (var j = 0; j < offerLen; j++) {
                                var item = {};
                                item.FirstName = offer[j].propArray["FirstName"];
                                item.MiddleName = offer[j].propArray["MiddleName"];
                                item.LastName = offer[j].propArray["LastName"];
                                item.DOB = offer[j].propArray["DOB"];
				var datearray = item.DOB.split("/");
				item.DOB = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
                                item.VFContactRole = offer[j].propArray["VFContactRole"];
                                item.Status = offer[j].propArray["Status"];
                                item.EmailAddress = offer[j].propArray["EmailAddress"];
                                item.MSISDN = offer[j].propArray["MSISDN"];
                                item.FullName = offer[j].propArray["FullName"];
                                item.swapedFullname = item.LastName + " " + item.MiddleName + " " + item.FirstName;
                                item.EmailvalidatedStatus = offer[j].propArray["EmailStatus"];
                                item.PhonevalidatedStatus = offer[j].propArray["ContactStatus"];
                                //OTP
                                item.OrgName = offer[j].propArray["OrgName"];
                                item.ARII = offer[j].propArray["ARII"];
                                item.ContactId = offer[j].propArray["Contact Id"];
                                item.AccountObjectId = offer[j].propArray["Account Object Id"];

                                offerData.push(item);

                            }
                            //SendOTP(item);
                            //var sShowOTP = SiebelApp.S_App.GetProfileAttr("ShowOTP");
                            if (strMCount > 1) {
                                createAuthTable(offerData);
                                $("#table-myModal").removeClass("displaynone");
                            } else {
                                var indexVal = 0;
                                var itemVal = offerData[0];
                                updateAuthForm(itemVal, indexVal);
                            }
                        } else {
                            alert("We canâ€™t find any customer matching your search.");
                        }
                    }
                }
            }
            return VHAHomeAppletPR;
        }
            ());
        return "SiebelAppFacade.VHAHomeAppletPR";
    });
}
