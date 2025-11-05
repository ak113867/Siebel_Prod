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
            var PhnVerifyFlag_step6;
            var EmailVerifyFlag_step6;
            var AuthmethodType6;
            var stepAuthPbj6 = {};
            var OtpStep6;
            var verifiedStep6;
            var authdetails_new;
            var IdRefNum_new;

            VHAAccountGenarateOtpPR.prototype.Init = function () {
                
                SiebelAppFacade.VHAAccountGenarateOtpPR.superclass.Init.apply(this, arguments);
               
            }

            VHAAccountGenarateOtpPR.prototype.ShowUI = function () {

                SiebelAppFacade.VHAAccountGenarateOtpPR.superclass.ShowUI.apply(this, arguments);
                
				$(".newmodalpopup").css("z-index","100001");
			    $(".newmodalpopup").css("position","relative");
                if (SiebelApp.S_App.GetActiveView().GetName() == 'VF Contact Id View') {
                    $('div[title="Contacts List Applet"]').parent().addClass('vha-img-getOTP');
                }
                 if(TheApplication().GetProfileAttr("VHA User Type") == 'Care'){
				 $('#idSighted-step6,label[for="idSighted-step6"]').addClass("displaynone");			
				 $('#inApp-step6,label[for="inApp-step6"]').addClass("displaynone");				 
				 }
				 else{
					 $('#idSighted-step6,label[for="idSighted-step6"]').removeClass("displaynone");		
					  if(SiebelApp.S_App.GetProfileAttr('TPG Retail Access') === "Y"){
						  $('#inApp-step6,label[for="inApp-step6"]').removeClass("displaynone");				     
					 }
					 else{
						 $('#inApp-step6,label[for="inApp-step6"]').addClass("displaynone");				    
					 }
				}
				 $('#vha-phoneinput-Id-step6').attr('autocomplete', 'off');
				  $('#vha-emailinput-Id-step6').attr('autocomplete', 'off');
				  $('#vha-ret-driverlic-Id-step6').attr('autocomplete', 'off');
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
                    authdetails_new = getdetails();
                    authcontdetails();
                    $(".newmodalpopup").removeClass("displaynone");
					if (OrgN === 'Kogan') {
                        $('#email-step6').parent().hide();
                    }
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

                $(".vha-ret-popup-close-btn-step6").on('click', function () {
                    $(".newmodalpopup").addClass("displaynone");
					resetMFA();
                });
                $("#vha-cont-prof-nextbtn-step6").on('click', function () {
                    if (verifiedStep6 === "Y") {
                        //$("#vha-ret-confirmCode").val("");
                        //$(".vha-ret-validate-form").addClass("displaynone");
                        //$("#vha-ret-validate-form-btn").addClass("displaynone");
                        $('#vha-emailinput-Id-step6').val('');
                        $('#vha-phoneinput-Id-step6').val('');
                        $('#vha-ret-driverlic-Id-step6').val('');
                        $(".emailauthSuccess-step6").addClass("displaynone");
                        $(".emailauthFail-step6").addClass("displaynone");
                        $(".phoneauthSuccess-step6").addClass("displaynone");
                        $(".phoneauthFail-step6").addClass("displaynone");
                        $(".newmodalpopup-step6").addClass("displaynone");
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
                $("input[name=authMethod-step6]").on("change", function () {
                    $(".send-otp-step6").hide();
                    $(".resend-otp-step6").hide();
                    $(".otp-status-step6").hide();
                    $(".validated-status-step6").hide();
                    $("#vha-idsight-send-otp-btn-step6").addClass("displaynone");
                    $("#vha-inapp-send-otp-btn-step6").addClass("displaynone");
                    $("#vha-email-send-otp-parent-step6").addClass("displaynone");
                    $("#vha-phone-send-otp-parent-step6").addClass("displaynone");
                    // $(".vha-ret-validate-form").addClass("displaynone");
                    // $("#vha-ret-validate-form-btn").addClass("displaynone");
                    //$("#vha-ret-confirmCode-step6").val("");
                    $(".refreshicon-step6").addClass("displaynone");
                    switch (this.value) {
                    case 'idSighted':
                        //  $("#vha-idsight-send-otp-btn").show();
                        $("#vha-idsight-send-otp-btn-step6").removeClass("displaynone");
                        AuthmethodType6 = "idSighted";
                        break;
                    case 'email':
                        AuthmethodType6 = "email";
                        if (EmailVerifyFlag_step6 === "Y") {
                            $("#vha-email-send-otp-btn-step6").show();
							$("#vha-step6-mail-unverified").text("Verified");
							  $("#vha-step6-mail-unverified").removeClass("displaynone");
							  $("#vha-step6-mail-traingexclm").addClass("displaynone");
							  $("#vha-step6-mail-tickmark").removeClass("displaynone"); 
							 
                        } else {
                            $("#valiadte-email-step6").show();
							$("#vha-step6-mail-unverified").text("Unverified");
						    $("#vha-step6-mail-unverified").removeClass("displaynone");
						    $("#vha-step6-mail-traingexclm").removeClass("displaynone");
							$("#vha-step6-mail-tickmark").addClass("displaynone"); 
                        }
                        break;
                    case 'phone':
                        AuthmethodType6 = "phone";
                        if (PhnVerifyFlag_step6 === "Y"  || OrgN === 'Kogan') {
                            $("#vha-phone-send-otp-btn-step6").show();
							$('#vha-step6-phone-unverified').text("Verified");
							  $("#vha-step6-phone-unverified").removeClass("displaynone");
							  $("#vha-step6-phone-traingexclm").addClass("displaynone");
							  $("#vha-step6-phone-tickmark").removeClass("displaynone");
                        } else {
                            $("#valiadte-phone-step6").show();
							$('#vha-step6-phone-unverified').text("Unverified");
						  $("#vha-step6-phone-unverified").removeClass("displaynone");
						  $("#vha-step6-phone-traingexclm").removeClass("displaynone");
						  $("#vha-step6-phone-tickmark").addClass("displaynone");
                        }
                        break;
                    case 'inApp':
                        $("#vha-inapp-send-otp-btn-step6").removeClass("displaynone");
                        AuthmethodType6 = "inApp";
                        break;

                    }

                });

                $("#vha-idsight-validateId-btn-step6").on('click', function () {
                    IdRefNum_new = getIDdetails();
                    var strContactIdCode = $('#vha-ret-driverlic-Id-step6').val();
                    if ($('#vha-ret-driverlic-Id-step6').val() == IdRefNum_new.IdReferenceNumber) {
                        $('.IdentrySucess-step6').removeClass('displaynone');
                        $('.IdentryFail-step6').addClass('displaynone');
                        verifiedStep6 = "Y";
                    } else {
                        $('.IdentryFail-step6').removeClass('displaynone');
                        $('.IdentrySucess-step6').addClass('displaynone');
                        verifiedStep6 = "N";
                    }

                });
                $("#vha-inapp-checkbox-step6").on('change', function () {

                    if ($(this).is(':checked')) {
                        verifiedStep6 = "Y";
                    } else {
                        verifiedStep6 = "N";
                    }
                });
                $("#valiadte-email-step6").on('click', function () {
                    var data;
					$("#vha-step6-mail-unverified").text("Email sent");
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(stepAuthPbj6);
                            if (data.ErrCd === "0")
                                $("#vha-step6-mail-refresh").removeClass("displaynone");
                            else
                                alert(data.ErrMsg);
                        }, 0);
                    });

                });

                $("#valiadte-phone-step6").on('click', function () {
                    var data;
					$("#vha-step6-phone-unverified").text("SMS sent");
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(stepAuthPbj6);
                            if (data.ErrCd === "0")
                                $("#vha-step6-phone-refresh").removeClass("displaynone");
                            else
                                alert(data.ErrMsg);

                        }, 0);
                    });

                });
                $(".refreshicon-step6").on('click', function () {
                    var getflags = getdetails();
                    PhnVerifyFlag_step6 = getflags["Contact Number Validated"];
                    EmailVerifyFlag_step6 = getflags["Email Address Validated"];
                    if (AuthmethodType6 === "phone") {
                        if (PhnVerifyFlag_step6 === 'Y') {
                            $("#vha-step6-phone-traingexclm").addClass("displaynone");
                            $("#vha-step6-phone-tickmark").removeClass("displaynone");
                            $(this).addClass("displaynone");
                            $("#valiadte-phone-step6").hide();
                            $("#vha-phone-send-otp-btn-step6").show();
                            $('#vha-step6-phone-unverified').text("Verified");
                            $("#vha-step6-phone-unverified").removeClass("displaynone");
                        } else {
                            $("#vha-step6-phone-traingexclm").removeClass("displaynone");
                            $("#vha-step6-phone-tickmark").addClass("displaynone");
                            $('#vha-step6-phone-unverified').text("Unverified");
                            $("#vha-step6-phone-unverified").removeClass("displaynone");
                        }
                    }
                    if (AuthmethodType6 === "email") {
                        if (EmailVerifyFlag_step6 === 'Y') {
                            $("#vha-step6-mail-traingexclm").addClass("displaynone");
                            $("#vha-step6-mail-tickmark").removeClass("displaynone");
                            $(this).addClass("displaynone");
                            $("#valiadte-email-step6").hide();
                            $("#vha-email-send-otp-btn-step6").show();
                            $("#vha-step6-mail-unverified").text("Verified");
                            $("#vha-step6-mail-unverified").removeClass("displaynone");
                        } else {
                            $("#vha-step6-mail-traingexclm").removeClass("displaynone");
                            $("#vha-step6-mail-tickmark").addClass("displaynone");
                            $("#vha-step6-mail-unverified").text("Unverified");
                            $("#vha-step6-mail-unverified").removeClass("displaynone");
                        }
                    }
                });
                /* $(".vha-ret-validate-form-btn").on('click', function(){
                if(OtpStep6 != "") {
                var userotp = $("#vha-ret-confirmCode").val();
                if ( userotp === OtpStep6){
                verifiedStep6 = "Y";
                alert("Verified");
                }
                else{
                verifiedStep6 = "N";
                alert("Enter correct otp");
                }

                }

                });	 */
                $(".vha-ret-validate-form-btn-step6").on("click", function () {
                    if (OtpStep6 != "") {
                        if (AuthmethodType6 === "phone")
                            var userotp = $("#vha-phoneinput-Id-step6").val();
                        else
                            var userotp = $("#vha-emailinput-Id-step6").val();

                        if (userotp === OtpStep6) {
                            verifiedStep6 = "Y";
                            // alert("verified");
                            if (AuthmethodType6 === "email") {
                                $(".emailauthSuccess-step6").removeClass("displaynone");
                                $(".emailauthFail-step6").addClass("displaynone");
                            }
                            if (AuthmethodType6 === "phone") {
                                $(".phoneauthSuccess-step6").removeClass("displaynone");
                                $(".phoneauthFail-step6").addClass("displaynone");
                            }
                        } else {
                            verifiedStep6 = "N";
                            // alert("enter correct otp");
                            if (AuthmethodType6 === "email") {
                                $(".emailauthSuccess-step6").addClass("displaynone");
                                $(".emailauthFail-step6").removeClass("displaynone");
                            }
                            if (AuthmethodType6 === "phone") {
                                $(".phoneauthSuccess-step6").addClass("displaynone");
                                $(".phoneauthFail-step6").removeClass("displaynone");
                            }
                        }
                    }
                });
                $("#vha-email-send-otp-btn-step6").on('click', function () {
                    $(this).hide();
                  //  $("#email-status").text("Email sent").show();
                    $("#vha-email-send-otp-parent-step6").removeClass("displaynone");
                    $('#vha-emailinput-Id-step6').val('');
					$(".emailauthSuccess-step6").addClass("displaynone");
					$(".emailauthFail-step6").addClass("displaynone");

                    var showotp;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            var response = SendOTP(stepAuthPbj6);
                            showotp = response.GetChildByType("ResultSet").propArray.OTP;
                            //$("#vha-ret-confirmCode").val(showotp);

                            OtpStep6 = showotp;
                        }, 0);
                    });
                    //SendOTP(stepAuthPbj6);
                    setTimeout(function () {
                        $("#email-status-step6").hide();
                        $("#vha-email-resend-otp-btn-step6").show();
                    }, 0);
                });

                $("#vha-phone-send-otp-btn-step6").on('click', function () {
                    $(this).hide();
                  //  $("#phone-status").text("SMS sent").show();
                    $("#vha-phone-send-otp-parent-step6").removeClass("displaynone");
                    $('#vha-phoneinput-Id-step6').val('');
					 $(".phoneauthSuccess-step6").addClass("displaynone");
					 $(".phoneauthFail-step6").addClass("displaynone");
                    var showotp;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            var response = SendOTP(stepAuthPbj6);
                            showotp = response.GetChildByType("ResultSet").propArray.OTP;
                            //$("#vha-ret-confirmCode").val(showotp);

                            OtpStep6 = showotp;
                        }, 0);
                    });
                    //SendOTP(stepAuthPbj6);
                    setTimeout(function () {
                        $("#phone-status-step6").hide();
                        $("#vha-phone-resend-otp-btn-step6").show();
                    }, 0);
                });

                $(".resend-otp-step6").on('click', function () {
                    const id = $(this).attr('id');
                    //    const sendId = id.replace('resend', 'send');
                    $(this).hide();
                    switch (AuthmethodType6) {
                    case 'idSighted':
                        $("#idsight-status-step6").text("Code sent").show();
                        break;
                    case 'email':
                       // $("#email-status").text("Email sent").show();
					    $('#vha-emailinput-Id-step6').val('');
						$(".emailauthSuccess-step6").addClass("displaynone");
						$(".emailauthFail-step6").addClass("displaynone");

						var showotp;
						requestAnimationFrame(() => {
							setTimeout(() => {
								var response = SendOTP(stepAuthPbj6);
								showotp = response.GetChildByType("ResultSet").propArray.OTP;
								//$("#vha-ret-confirmCode").val(showotp);

								OtpStep6 = showotp;
							}, 0);
						});
                        break;
                    case 'phone':
                       // $("#phone-status").text("SMS sent").show();
					   $('#vha-phoneinput-Id-step6').val('');
						 $(".phoneauthSuccess-step6").addClass("displaynone");
						 $(".phoneauthFail-step6").addClass("displaynone");
					    var showotp;
						requestAnimationFrame(() => {
							setTimeout(() => {
								var response = SendOTP(stepAuthPbj6);
								showotp = response.GetChildByType("ResultSet").propArray.OTP;
								//$("#vha-ret-confirmCode").val(showotp);

								OtpStep6 = showotp;
							}, 0);
						});
                        break;
                    case 'inApp':
                        $("#inapp-status-step6").text("Code sent").show();
                        break;
                    }
                    setTimeout(function () {
                        $(".otp-status-step6").hide();
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

                if (AuthmethodType6 === "email") {
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

                if (AuthmethodType6 === "email") {
                    Input.SetProperty("sType", "Email");
                    Input.SetProperty("sValue", item.EmailOTP);
                }
                if (AuthmethodType6 === "phone") {
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
                //IdRefNum_new = Outputs.childArray[0].propArray.IdReferenceNumber;
                IdRefNum_new = Outputs.childArray[0].propArray;
                return IdRefNum_new;
            }
			//reset mfa
			function resetMFA(){
			 $("#vha-email-send-otp-parent-step6").addClass("displaynone");
			 $("#vha-idsight-send-otp-btn-step6").addClass("displaynone");
			 $("#vha-inapp-send-otp-btn-step6").addClass("displaynone");
			 $("#vha-phone-send-otp-parent-step6").addClass("displaynone");
			 $('#vha-phoneinput-Id-step6').val('');
			 $(".phoneauthSuccess-step6").addClass("displaynone");
			 $(".phoneauthFail-step6").addClass("displaynone");
			 $('#vha-emailinput-Id-step6').val('');
			 $(".emailauthSuccess-step6").addClass("displaynone");
			 $(".emailauthFail-step6").addClass("displaynone"); 
			 $('#vha-ret-driverlic-Id-step6').val('');
				// $('input[name=authMethod]').prop('checked', false);
				$(".authenticate-sections").find("input[type='radio'], input[type='checkbox']").prop("checked", false);
				 $(".send-otp-step6").hide();
				$(".resend-otp-step6").hide();
				$(".otp-status-step6").hide(); 
				$(".validated-status-step6").hide();
				
				$(".IdentrySucess-step6").addClass("displaynone");
				$(".IdentryFail-step6").addClass("displaynone");
				$(".refreshicon-step6").addClass("displaynone");
				verifiedStep6 = "N";
			}
            function authcontdetails() {
                const phoneNumber = authdetails_new["Home Phone #"];
                const maskedNumber = phoneNumber.substring(0, 2) + "xxxxxx" + phoneNumber.substring(phoneNumber.length - 3);

                const email = authdetails_new["Email Address"];
                const [username, domain] = email.split("@");
                const maskLength = username.length - 2;
                const maskedMiddle = "x".repeat(maskLength > 0 ? maskLength : 0);
                const maskedEmail = username.charAt(0) + maskedMiddle + username.charAt(username.length - 1) + "@" + domain;
                IdRefNum_new = getIDdetails();
                const insightNo = IdRefNum_new.IdReferenceNumber;
                    const maskedInsight = insightNo.substring(0, 0) + "xxxxxx" + insightNo.substring(insightNo.length - 3);
                //const maskedInsightdl = insightNo.substring(0, 0) + "*****" + insightNo.substring(insightNo.length - 3);
                if (IdRefNum_new.IdType != undefined && IdRefNum_new.IdType != "") {
                    $("#vha-ret-confirmCode-step6").empty().append("<Label>" + IdRefNum_new.IdType + "</label><Label class=pl-4>" + maskedInsight + "</label>");
                    $('#idSighted-step6').parent().css('pointer-events', 'auto');
                    $('#idSighted-step6').parent().css('color', '#002244');
                } else {
                    $('#idSighted-step6').parent().css('pointer-events', 'none');
                    $('#idSighted-step6').parent().css('color', 'darkgray');

                }
				let maskedName = authdetails_new["Full Name"].replace(/(\b\w)(\w*)/g, (_, first, rest) => first + "x".repeat(rest.length));

                $("#vha-ret-authName-step6").text(maskedName);
                $("#vha-ret-authDob-step6").text(authdetails_new["Birth Date"]);
                $("#vha-ret-authEmailDisplay-step6").text(maskedEmail);
                $("#vha-ret-authPhoneDisplay-step6").text(maskedNumber);

                stepAuthPbj6.ARII = authdetails_new.AccARII;
                stepAuthPbj6.OrgName = authdetails_new.AccOrg;
                stepAuthPbj6.ContactId = authdetails_new["Contact Id"];
                stepAuthPbj6.AccountObjectId = authdetails_new["Row Id"];
                stepAuthPbj6.MSISDN = authdetails_new["Home Phone #"];
                stepAuthPbj6.EmailOTP = authdetails_new["Email Address"];
                PhnVerifyFlag_step6 = authdetails_new["Contact Number Validated"];
                EmailVerifyFlag_step6 = authdetails_new["Email Address Validated"];
                if (PhnVerifyFlag_step6 === 'Y') {
                    $("#vha-step6-phone-traingexclm").addClass("displaynone");
                    $("#vha-step6-phone-tickmark").removeClass("displaynone");
                    $('#vha-step6-phone-unverified').text("Verified");
                    $("#vha-step6-phone-unverified").removeClass("displaynone");
                } else {
                    $("#vha-step6-phone-traingexclm").removeClass("displaynone");
                    $("#vha-step6-phone-tickmark").addClass("displaynone");
                    $('#vha-step6-phone-unverified').text("Unverified");
                    $("#vha-step6-phone-unverified").removeClass("displaynone");
                }
                if (EmailVerifyFlag_step6 === 'Y') {
                    $("#vha-step6-mail-traingexclm").addClass("displaynone");
                    $("#vha-step6-mail-tickmark").removeClass("displaynone");
                    $("#vha-step6-mail-unverified").text("Verified");
                    $("#vha-step6-mail-unverified").removeClass("displaynone");
                } else {
                    $("#vha-step6-mail-traingexclm").removeClass("displaynone");
                    $("#vha-step6-mail-tickmark").addClass("displaynone");
                    $("#vha-step6-mail-unverified").text("Unverified");
                    $("#vha-step6-mail-unverified").removeClass("displaynone");
                }

            }

            return VHAAccountGenarateOtpPR;
        }
            ());
        return "SiebelAppFacade.VHAAccountGenarateOtpPR";
    })
}


