if (typeof(SiebelAppFacade.VHAAccountGenarateOtpPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.VHAAccountGenarateOtpPR");
    define("siebel/custom/VHAAccountGenarateOtpPR", ["siebel/jqgridrenderer"],
        function () {
        SiebelAppFacade.VHAAccountGenarateOtpPR = (function () {

            function VHAAccountGenarateOtpPR(pm) {
                SiebelAppFacade.VHAAccountGenarateOtpPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(VHAAccountGenarateOtpPR, SiebelAppFacade.JQGridRenderer);
            var pm;
            var controls;
            var otpAutentication;
            var PhnVerifyFlag_step2;
            var EmailVerifyFlag_step2;
            var AuthmethodType;
            var stepAuthPbj = {};
            var OtpStep2;
            var verifiedStep2;
            var authdetails;
            var IdRefNum;

            VHAAccountGenarateOtpPR.prototype.Init = function () {
                
                SiebelAppFacade.VHAAccountGenarateOtpPR.superclass.Init.apply(this, arguments);
               
            }

            VHAAccountGenarateOtpPR.prototype.ShowUI = function () {

                SiebelAppFacade.VHAAccountGenarateOtpPR.superclass.ShowUI.apply(this, arguments);
                
				$("#myModal").css("z-index","100001");
			    $("#myModal").css("position","relative");
                if (SiebelApp.S_App.GetActiveView().GetName() == 'VF Contact Id View') {
                    $('div[title="Contacts List Applet"]').parent().addClass('vha-img-getOTP');
                }
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
				 $('#vha-phoneinput-Id').attr('autocomplete', 'off');
				  $('#vha-emailinput-Id').attr('autocomplete', 'off');
				  $('#vha-ret-driverlic-Id').attr('autocomplete', 'off');
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                //var ObjectId = SiebelApp.S_App.GetActiveBusObj('Contact').GetBusCompByName('Contact').GetFieldValue('Id');
				var app = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA New Authenticate Popup Applet'];
				var selectedId = app.GetSelection();
				if (selectedId >= 0)
					var ObjectId = app.GetBusComp().GetRecordSet()[selectedId].Id;
				else
					var ObjectId = "";
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
                    //$('[title="Contact Account Linkages List Applet:Link Prepaid Account"]').addClass('forcehide');
                } else {
                    $('#Vha-CP-SendAppInvite').removeClass('forcehide');
                    $('#inactive-em-otpopup').removeClass('forcehide');
                    $('#validate-ot-email').removeClass('forcehide');
                    $('#inactive-ph-otpopup').removeClass('forcehide');
                    $('#validate-ot-phone').removeClass('forcehide');
                    //$('[title="Contact Account Linkages List Applet:Link Prepaid Account"]').removeClass('forcehide');
                } 
            }

            VHAAccountGenarateOtpPR.prototype.BindData = function (bRefresh) {
               
                SiebelAppFacade.VHAAccountGenarateOtpPR.superclass.BindData.apply(this, arguments);
                
            }

            VHAAccountGenarateOtpPR.prototype.BindEvents = function () {
               
                SiebelAppFacade.VHAAccountGenarateOtpPR.superclass.BindEvents.apply(this, arguments);
               
                // $('[title="test2a"]').on('click', function(){
                $('[title="Contacts List Applet"] .miniBtnUIC').on('click', function () {
                    // Authenticate with Workflow
                    authdetails = getdetails();
                    authcontdetails();
                    $("#myModal").removeClass("displaynone");
					//added the below code for CM-1724
					/*$("#myModal").css("z-index","100001");
					$("#myModal").css("position","relative");*/
					//End for CM-1724
                    /*if (TheApplication().GetProfileAttr("VHA User Type") == 'Care') {
                        $('.IdsightforRetail').addClass("displaynone");
                    } else {
                        $('.IdsightforRetail').removeClass("displaynone");
                    }*/
                });

                $(".vha-ret-popup-close-btn").on('click', function () {
                    $("#myModal").addClass("displaynone");
					resetMFA();
                });
                $("#vha-cont-prof-nextbtn").on('click', function () {
                    if (verifiedStep2 === "Y") {
                        //$("#vha-ret-confirmCode").val("");
                        //$(".vha-ret-validate-form").addClass("displaynone");
                        //$("#vha-ret-validate-form-btn").addClass("displaynone");
                        $('#vha-emailinput-Id').val('');
                        $('#vha-phoneinput-Id').val('');
                        $('#vha-ret-driverlic-Id').val('');
                        $(".emailauthSuccess").addClass("displaynone");
                        $(".emailauthFail").addClass("displaynone");
                        $(".phoneauthSuccess").addClass("displaynone");
                        $(".phoneauthFail").addClass("displaynone");
                        $("#myModal").addClass("displaynone");
						window.confirm = function () {
							return true;
						}
						SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA New Authenticate Popup Applet'].InvokeMethod('CloseApplet');
						resetMFA();
                    } else
                        alert("Please authenticate customer before proceeding.");

                });
                //authentication
                // step2 authentication start
                $("input[name=authMethod]").on("change", function () {
                    $(".send-otp").hide();
                    $(".resend-otp").hide();
                    $(".otp-status").hide();
                    $(".validated-status").hide();
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
                            $("#valiadte-email").show();
                        }
                        break;
                    case 'phone':
                        AuthmethodType = "phone";
                        if (PhnVerifyFlag_step2 === "Y") {
                            $("#vha-phone-send-otp-btn").show();
                        } else {
                            $("#valiadte-phone").show();
                        }
                        break;
                    case 'inApp':
                        $("#vha-inapp-send-otp-btn").removeClass("displaynone");
                        AuthmethodType = "inApp";
                        break;

                    }

                });

                $("#vha-idsight-validateId-btn").on('click', function () {
                    IdRefNum = getIDdetails();
                    var strContactIdCode = $('#vha-ret-driverlic-Id').val();
                    if ($('#vha-ret-driverlic-Id').val() == IdRefNum.IdReferenceNumber) {
                        $('.IdentrySucess').removeClass('displaynone');
                        $('.IdentryFail').addClass('displaynone');
                        verifiedStep2 = "Y";
                    } else {
                        $('.IdentryFail').removeClass('displaynone');
                        $('.IdentrySucess').addClass('displaynone');
                        verifiedStep2 = "N";
                    }

                });
                $("#vha-inapp-checkbox").on('change', function () {

                    if ($(this).is(':checked')) {
                        verifiedStep2 = "Y";
                    } else {
                        verifiedStep2 = "N";
                    }
                });
                $("#valiadte-email").on('click', function () {
                    var data;
					$("#vha-step2-mail-unverified").text("Email sent");
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(stepAuthPbj);
                            if (data.ErrCd === "0")
                                $("#vha-step2-mail-refresh").removeClass("displaynone");
                            else
                                alert(data.ErrMsg);
                        }, 0);
                    });

                });

                $("#valiadte-phone").on('click', function () {
                    var data;
					$("#vha-step2-phone-unverified").text("SMS sent");
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(stepAuthPbj);
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
                            $("#valiadte-phone").hide();
                            $("#vha-phone-send-otp-btn").show();
                            $('#vha-step2-phone-unverified').text("Verified");
                            $("#vha-step2-phone-unverified").removeClass("displaynone");
                        } else {
                            $("#vha-step2-phone-traingexclm").removeClass("displaynone");
                            $("#vha-step2-phone-tickmark").addClass("displaynone");
                            $('#vha-step2-phone-unverified').text("Unverified");
                            $("#vha-step2-phone-unverified").removeClass("displaynone");
                        }
                    }
                    if (AuthmethodType === "email") {
                        if (EmailVerifyFlag_step2 === 'Y') {
                            $("#vha-step2-mail-traingexclm").addClass("displaynone");
                            $("#vha-step2-mail-tickmark").removeClass("displaynone");
                            $(this).addClass("displaynone");
                            $("#valiadte-email").hide();
                            $("#vha-email-send-otp-btn").show();
                            $("#vha-step2-mail-unverified").text("Verified");
                            $("#vha-step2-mail-unverified").removeClass("displaynone");
                        } else {
                            $("#vha-step2-mail-traingexclm").removeClass("displaynone");
                            $("#vha-step2-mail-tickmark").addClass("displaynone");
                            $("#vha-step2-mail-unverified").text("Unverified");
                            $("#vha-step2-mail-unverified").removeClass("displaynone");
                        }
                    }
                });
                /* $(".vha-ret-validate-form-btn").on('click', function(){
                if(OtpStep2 != "") {
                var userotp = $("#vha-ret-confirmCode").val();
                if ( userotp === OtpStep2){
                verifiedStep2 = "Y";
                alert("Verified");
                }
                else{
                verifiedStep2 = "N";
                alert("Enter correct otp");
                }

                }

                });	 */
                $(".vha-ret-validate-form-btn").on("click", function () {
                    if (OtpStep2 != "") {
                        if (AuthmethodType === "phone")
                            var userotp = $("#vha-phoneinput-Id").val();
                        else
                            var userotp = $("#vha-emailinput-Id").val();

                        if (userotp === OtpStep2) {
                            verifiedStep2 = "Y";
                            // alert("verified");
                            if (AuthmethodType === "email") {
                                $(".emailauthSuccess").removeClass("displaynone");
                                $(".emailauthFail").addClass("displaynone");
                            }
                            if (AuthmethodType === "phone") {
                                $(".phoneauthSuccess").removeClass("displaynone");
                                $(".phoneauthFail").addClass("displaynone");
                            }
                        } else {
                            verifiedStep2 = "N";
                            // alert("enter correct otp");
                            if (AuthmethodType === "email") {
                                $(".emailauthSuccess").addClass("displaynone");
                                $(".emailauthFail").removeClass("displaynone");
                            }
                            if (AuthmethodType === "phone") {
                                $(".phoneauthSuccess").addClass("displaynone");
                                $(".phoneauthFail").removeClass("displaynone");
                            }
                        }
                    }
                });
                $("#vha-email-send-otp-btn").on('click', function () {
                    $(this).hide();
                  //  $("#email-status").text("Email sent").show();
                    $("#vha-email-send-otp-parent").removeClass("displaynone");
                    $('#vha-emailinput-Id').val('');
					$(".emailauthSuccess").addClass("displaynone");
					$(".emailauthFail").addClass("displaynone");

                    var showotp;
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
                        $("#vha-email-resend-otp-btn").show();
                    }, 0);
                });

                $("#vha-phone-send-otp-btn").on('click', function () {
                    $(this).hide();
                  //  $("#phone-status").text("SMS sent").show();
                    $("#vha-phone-send-otp-parent").removeClass("displaynone");
                    $('#vha-phoneinput-Id').val('');
					 $(".phoneauthSuccess").addClass("displaynone");
					 $(".phoneauthFail").addClass("displaynone");
                    var showotp;
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

						var showotp;
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
                       // $("#phone-status").text("SMS sent").show();
					   $('#vha-phoneinput-Id').val('');
						 $(".phoneauthSuccess").addClass("displaynone");
						 $(".phoneauthFail").addClass("displaynone");
					    var showotp;
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
            }

            VHAAccountGenarateOtpPR.prototype.EndLife = function () {
                // EndLife is where we perform any required cleanup.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAAccountGenarateOtpPR.superclass.EndLife.apply(this, arguments);
                // Add code here that should happen after default processing
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

            // email or sms verify

            function verifyEmailSms(item) {
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
                Input.SetProperty("ProcessName", "VHA Digital Email SMS Verification Process");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                var datatemp = Outputs.childArray[0].propArray;
                return datatemp;
            }
            // call workflow for verifaction
            function getdetails() {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
               // var ObjectId = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA New Authenticate Popup Applet'].GetBusComp().GetRecordSet()[0].Id;
               // added for defect 2616
			   var app = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA New Authenticate Popup Applet'];
				var selectedId = app.GetSelection();
				if (selectedId >= 0)
					var ObjectId = app.GetBusComp().GetRecordSet()[selectedId].Id;
				else
					var ObjectId = "";
				
				Input.SetProperty("Contact Id", ObjectId);
                Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                var datatemp = Outputs.childArray[0].propArray;
                return datatemp;
            }
            function getIDdetails() {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                //var ObjectId = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA New Authenticate Popup Applet'].GetBusComp().GetRecordSet()[0].Id;
				var app = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA New Authenticate Popup Applet'];
				var selectedId = app.GetSelection();
				if (selectedId >= 0)
					var ObjectId = app.GetBusComp().GetRecordSet()[selectedId].Id;
				else
					var ObjectId = "";
                Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
                Input.SetProperty("Contact Id", ObjectId);
                Input.SetProperty("FlowType", "IDdata");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                //IdRefNum = Outputs.childArray[0].propArray.IdReferenceNumber;
                IdRefNum = Outputs.childArray[0].propArray;
                return IdRefNum;
            }
			//reset mfa
			function resetMFA(){
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
				// $('input[name=authMethod]').prop('checked', false);
				$(".authenticate-sections").find("input[type='radio'], input[type='checkbox']").prop("checked", false);
				 $(".send-otp").hide();
				$(".resend-otp").hide();
				$(".otp-status").hide(); 
				$(".validated-status").hide();
				
				$(".IdentrySucess").addClass("displaynone");
				$(".IdentryFail").addClass("displaynone");
				$(".refreshicon").addClass("displaynone");
				verifiedStep2 = "N";
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
                const insightNo = IdRefNum.IdReferenceNumber;
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
                PhnVerifyFlag_step2 = authdetails["Contact Number Validated"];
                EmailVerifyFlag_step2 = authdetails["Email Address Validated"];
                if (PhnVerifyFlag_step2 === 'Y') {
                    $("#vha-step2-phone-traingexclm").addClass("displaynone");
                    $("#vha-step2-phone-tickmark").removeClass("displaynone");
                    $('#vha-step2-phone-unverified').text("Verified");
                    $("#vha-step2-phone-unverified").removeClass("displaynone");
                } else {
                    $("#vha-step2-phone-traingexclm").removeClass("displaynone");
                    $("#vha-step2-phone-tickmark").addClass("displaynone");
                    $('#vha-step2-phone-unverified').text("Unverified");
                    $("#vha-step2-phone-unverified").removeClass("displaynone");
                }
                if (EmailVerifyFlag_step2 === 'Y') {
                    $("#vha-step2-mail-traingexclm").addClass("displaynone");
                    $("#vha-step2-mail-tickmark").removeClass("displaynone");
                    $("#vha-step2-mail-unverified").text("Verified");
                    $("#vha-step2-mail-unverified").removeClass("displaynone");
                } else {
                    $("#vha-step2-mail-traingexclm").removeClass("displaynone");
                    $("#vha-step2-mail-tickmark").addClass("displaynone");
                    $("#vha-step2-mail-unverified").text("Unverified");
                    $("#vha-step2-mail-unverified").removeClass("displaynone");
                }

            }

            return VHAAccountGenarateOtpPR;
        }
            ());
        return "SiebelAppFacade.VHAAccountGenarateOtpPR";
    })
}
