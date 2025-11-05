if (typeof SiebelAppFacade.VHAContactMergeMFAAppletTBUIPR === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAContactMergeMFAAppletTBUIPR");
    define("siebel/custom/VHAContactMergeMFAAppletTBUIPR", ["siebel/phyrenderer"], function () {
        SiebelAppFacade.VHAContactMergeMFAAppletTBUIPR = (function () {
            function VHAContactMergeMFAAppletTBUIPR(pm) {
                SiebelAppFacade.VHAContactMergeMFAAppletTBUIPR.superclass.constructor.apply(this, arguments);
            }
				
            SiebelJS.Extend(VHAContactMergeMFAAppletTBUIPR, SiebelAppFacade.PhysicalRenderer);
             //Contact 1 data
			var authdetails;
			var stepAuthPbj={};
			var PhnVerifyFlag_step2;
			var EmailVerifyFlag_step2;
			var otpAutentication;
			var AuthmethodType;
			var OtpStep2;
            var verifiedStep2;
			var IdsightDetails;
			 //Contact 2 data
			var authdetails3;
			var stepAuthPbj3={};
			var PhnVerifyFlag_step3;
			var EmailVerifyFlag_step3;
			var otpAutentication3;
			var AuthmethodType3;
			var OtpStep3;
            var verifiedStep3;
			var IdsightDetails3;
            //Contact 1 Variables
            var ConId1 = TheApplication().GetProfileAttr("TBUIPrepayContactId");
			//validate in step2 before proceed
			var step3InputsMatch = "N";
           // var ConId1 = "";
            var ConName1 = "";
			var ConFname1 = "";
			var ConLname1 = "";
            var ConPhone1 = "";
            var ConPhoneflag1 = "";
            var Conemail1 = "";
            var Conemailflag1 = "";
            var ConDOB1 = "";
            var ConAccId1 = TheApplication().GetProfileAttr("TBUIPrepayAccountId");
           // var ConAccId1 = "";
			var DigUName1 ="";
            //Contact 2 Variables
            var ConId2 = "";
            var ConName2 = "";
			var ConFname2 = "";
			var ConLname2 = "";
            var ConPhone2 = "";
            var ConPhoneflag2 = "";
            var Conemail2 = "";
            var Conemailflag2 = "";
            var ConDOB2 = "";
            var ConAccId2 = "";
            var ConRole2 = "";

            var IdentiHistory = "";
            var IdDocDetails = "";
			var CopyIDHist = "";
			var CopyID = "";
			var IdList = "";
			var ReplaceID = "";	
			
			var Dvsvalidated = "";
			var Prepay ="";

            VHAContactMergeMFAAppletTBUIPR.prototype.Init = function () {
                SiebelAppFacade.VHAContactMergeMFAAppletTBUIPR.superclass.Init.apply(this, arguments);
				
				var ConId1 = TheApplication().GetProfileAttr("TBUIPrepayContactId");           
                var ConAccId1 = TheApplication().GetProfileAttr("TBUIPrepayAccountId");
            };

            VHAContactMergeMFAAppletTBUIPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHAContactMergeMFAAppletTBUIPR.superclass.ShowUI.apply(this, arguments);
				
				ConId1 = TheApplication().GetProfileAttr("TBUIPrepayContactId");          
				ConAccId1 = TheApplication().GetProfileAttr("TBUIPrepayAccountId");
				
                authdetails = contactData();
				authcontdetails();
                var view = SiebelApp.S_App.GetActiveView();
                var appletMap = view.GetAppletMap();
                var myApplet = appletMap["TPG Contact Merge Task Playbar Applet Bottom"];
                var pm = myApplet.GetPModel();
                var AppletId = pm.Get("GetFullId");
                $("#s_" + AppletId + "_div").addClass("displaynone");
                //$("#s_S_A2_div").addClass("displaynone");
				
				if(TheApplication().GetProfileAttr("VHA User Type") == 'Care'){
					 $('#vha-cnt-mrg-skip-step1').addClass("displaynone");
					 $('.Identrystep1').addClass('displaynone');
					 $('.Idsightstep1').addClass('displaynone');
					 $('.Identrystep3').addClass("displaynone");
					 $('.Idsightstep3').addClass('displaynone');
				 }
				 else{
					  $('#vha-cnt-mrg-skip-step1').removeClass("displaynone");
					  $('.Identrystep1').removeClass('displaynone');
					  $('.Identrystep3').removeClass('displaynone');
					  if(SiebelApp.S_App.GetProfileAttr('TPG Retail Access') === "Y"){
						   $('.Idsightstep1').removeClass('displaynone');
						    $('.Idsightstep3').removeClass('displaynone');
					  }
					  else{
						   $('.Idsightstep1').addClass('displaynone');
						    $('.Idsightstep3').addClass('displaynone');
					  }
						  
					  
				 }
				 // autocomplete off 
				 $('#vha-phoneinput-Id').attr('autocomplete', 'off');
				 $('#vha-emailinput-Id').attr('autocomplete', 'off');
				 $('#vha-ret-driverlic-Id').attr('autocomplete', 'off');							  
				  $('#vha-phoneinput-Id-step3').attr('autocomplete', 'off');
				  $('#vha-emailinput-Id-step3').attr('autocomplete', 'off');
				  $('#vha-ret-driverlic-Id-step3').attr('autocomplete', 'off');
				  
				  $('#vha-img-step2-text').attr('autocomplete', 'off');
				  $('#vha-img-step2-text-date').attr('autocomplete', 'off');
				 
            };

            VHAContactMergeMFAAppletTBUIPR.prototype.BindData = function (bRefresh) {
                SiebelAppFacade.VHAContactMergeMFAAppletTBUIPR.superclass.BindData.apply(this, arguments);
            };

            VHAContactMergeMFAAppletTBUIPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHAContactMergeMFAAppletTBUIPR.superclass.BindEvents.apply(this, arguments);

                $("#vha-cnt-mrg-next-step1").on("click", function () {
                    event.preventDefault();
					//verifiedStep2 ="Y"; // testing comments 
					
					
					if(verifiedStep2 === "Y"){
						loadPage2();
						$(".vha-img-cont-merg-step1").addClass("displaynone");
						$(".vha-img-cont-merg-step2").removeClass("displaynone");
					}
					/*if (verifiedStep2 === undefined || verifiedStep2 == "N")
					{
						var getflags = getdetails("step2");
						PhnVerifyFlag_step2 = getflags["Contact Number Validated"];
						EmailVerifyFlag_step2 = getflags["Email Address Validated"];
						if(PhnVerifyFlag_step2 === "Y" || EmailVerifyFlag_step2 ==="Y")
						{
						loadPage2();
						$(".vha-img-cont-merg-step1").addClass("displaynone");
						$(".vha-img-cont-merg-step2").removeClass("displaynone");
						}
					}*/
					else{
						alert("Please authenticate customer before proceeding.");
					}
                    
                });
                $("#vha-cnt-mrg-skip-step1").on("click", function () {
                    event.preventDefault();
					//verifiedStep2 ="Y"; // testing comments 
					loadPage2();
                    $(".vha-img-cont-merg-step1").addClass("displaynone");
                    $(".vha-img-cont-merg-step2").removeClass("displaynone");
                });
                $("#vha-cnt-mrg-next-step2").on("click", function () {
                    event.preventDefault(); 
					if(verifiedStep3 === "Y" && step3InputsMatch === "Y"){
						 $(".vha-img-cont-merg-step2").addClass("displaynone");
						$(".vha-img-cont-merg-step4").removeClass("displaynone");
						//$(".vha-step2-table").addClass("displaynone");
						//$(".vha-merged-cnt-details").addClass("displaynone");
						//Update Contact 1 Details
						$("#name1-step4").text(ConName1);
						$("#dob1-step4").text(ConDOB1);
						$("#digitalusrname1-step4").text(DigUName1);
						$("#rowid1-step4").text(ConId1);
						//Update Contact 2 Details
						$("#name2-step4").text(ConName2);
						$("#dob2-step4").text(ConDOB2);
						$("#digitalusrname2-step4").text(DigUName2);
						$("#rowid2-step4").text(ConId2);
						idData();
					}
					else
						alert("Please search linking customer account before proceeding.");
                   
                });
                $("#vha-cnt-mrg-Back-step2").on("click", function () {
                    event.preventDefault();
                    $(".vha-img-cont-merg-step2").addClass("displaynone");
                    $(".vha-img-cont-merg-step1").removeClass("displaynone");
                });
                $("#vha-cnt-mrg-Back-step4").on("click", function () {
                    event.preventDefault();
                    $(".vha-img-cont-merg-step4").addClass("displaynone");
                    $(".vha-img-cont-merg-step2").removeClass("displaynone");
                });
                $("#vha-cnt-mrg-next-step4").on("click", function () {
                    event.preventDefault();
					//Dvsvalidated ="Y"; // testing comments 
					PrepayCheck();
					if (Prepay == "Y")
					{
					Dvsvalidated = "Y";
					}
					else
					{
						validatedDvs();
					}
					if(Dvsvalidated === "Y"){
						$(".vha-img-cont-merg-step4").addClass("displaynone");
						$(".vha-img-cont-merg-step5").removeClass("displaynone");
						$("#fullname-step5").text(ConName1);
						$("#digitalusrname1-step5").text(DigUName1);
						$("#primarycont-step5").text(ConPhone1);
						$("#dob-step5").text(ConDOB1);
						$("#email-step5").text(Conemail1);
						SubmitPage();
					}
					else
						alert("Please Validate DVS to proceed further");
                });
                $("#vha-cnt-mrg-Back-step5").on("click", function () {
                    event.preventDefault();
                    $(".vha-img-cont-merg-step5").addClass("displaynone");
                    $(".vha-img-cont-merg-step4").removeClass("displaynone");
                });
			$("#vha-cnt-mrg-submit-step5").on('click', function(){
						event.preventDefault();
						console.log("Submit Clicked")		
						//var ContactRowId = "2-CLLLKSQ"
						var contactMergeWF = TheApplication().GetService("Workflow Process Manager");
						var contactMergeInput = TheApplication().NewPropertySet();
						contactMergeInput.SetProperty("ProcessName", "TPG Contact Merge Submit Process");
						//AccId,ConId,SrcAccId,SrcPrConId,CopyIDHist,CopyID,ReplaceID
						contactMergeInput.SetProperty("AccId",ConAccId1);
						contactMergeInput.SetProperty("ConId",ConId1);	
						contactMergeInput.SetProperty("SrcAccId",ConAccId2);
						contactMergeInput.SetProperty("SrcPrConId",ConId2);
						contactMergeInput.SetProperty("CopyIDHist",CopyIDHist);
						contactMergeInput.SetProperty("CopyID",CopyID);
						contactMergeInput.SetProperty("ReplaceID",ReplaceID);
						contactMergeInput.SetProperty("Object Id",ConId2);
						//contactMergeInput.SetProperty("IdList",IdList);
						var contactMergeOutput = contactMergeWF.InvokeMethod("RunProcess", contactMergeInput);
						//$('button[title="Finish"]').click();
						/*var contactMrgApplet = SiebelApp.S_App.GetActiveView().GetApplet("TPG Contact Merge Task Playbar Applet Bottom");
						var controls = contactMrgApplet.GetControls();
						var ButtonFinish = controls["ButtonFinish"].GetInputName();
						$('[name="'+ButtonFinish+'"]').trigger("click");*/
						//ButtonFinish
						//ButtonSubmit	
					// Create the pop-up structure
                let popupHTML = `
                    <div id="customPopup" style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: white;
                        border: 1px solid black;
                        padding: 20px;
                        z-index: 10000;
                    ">
                        <p>Request successfully submitted.</p>
                        <button class="vha-glbal-secnd-btns" id="closePopupBtn" style="margin-left: 60px">OK</button>
                    </div>
                    <div id="popupOverlay" style="
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 9999;
                    "></div>
                `;
                $("body").append(popupHTML); // Add the pop-up to the DOM

					// Close pop-up on button click
					$("#closePopupBtn").click(function() {
						$("#customPopup").remove(); // Remove pop-up
						$("#popupOverlay").remove(); // Remove overlay
						$('button[title="Finish"]').click();
					});
						
						
				});

     $("#vha-cnt-mrg-ValidateDVS").on("click", function () {
		event.preventDefault();
		console.log("ValidateDVS Button Clicked");
		/*PrepayCheck();
		if(Prepay == "Prepay")
		{
			Dvsvalidated = "Y";
			alert("DVS Validation is not Required for Prepay Services");
		}
		else
		{
			Dvsvalidated = "N";
		}
		if (Dvsvalidated != "Y")
		{*/
							var checkboxes = document.querySelectorAll('.otherProfiletablecheckbox');
							var selectedDetails = [];
							var DvsVal = [];
							var DvsPrevalidateion = "";
							checkboxes.forEach(function(checkbox) {
							if (checkbox.checked) {
									selectedDetails.push(checkbox.getAttribute('DocId'));	
									DvsVal.push(checkbox.getAttribute('DvsVal'));
									var Dvsnum = checkbox.getAttribute('DvsVal');
									if (Dvsnum !="")
									{
										console.log("ShowError");
										DvsPrevalidateion = "N";
										alert("DVS already performed for one or more selected records. Please remove selection and try again.");
										//alert("Selected ");
										return false;
									}
								}
							});
				var numofselectedcheckbox = selectedDetails.length;
				if(numofselectedcheckbox === 0)
					alert("Please select atleast one record to validate DVS.");
				if(DvsPrevalidateion !="N")
				{
					if (numofselectedcheckbox <= 3 )
					{
							checkboxes.forEach(function(checkbox) {
							if (checkbox.checked) {
									//selectedDetails.push(checkbox.getAttribute('DocId'));
									var selectedDocId =  checkbox.getAttribute('DocId');
									//console.log("Selected Details:", selectedDetails.join(','));
									var contactMergeWF = TheApplication().GetService("Workflow Process Manager");
									var contactMergeInput = TheApplication().NewPropertySet();
									contactMergeInput.SetProperty("ProcessName", "TPG Contact Merge Postpay Validation Process");
									contactMergeInput.SetProperty("AccountId",ConAccId2);
									contactMergeInput.SetProperty("ContactId",ConId2);	
									contactMergeInput.SetProperty("DocId",selectedDocId);
									contactMergeInput.SetProperty("AccountId1",ConAccId1); 
									var contactMergeOutput = contactMergeWF.InvokeMethod("RunProcess", contactMergeInput);
									var DVSTransId = contactMergeOutput.propArray.DVSTransId;
									//var DVSTransId = "Static"
									updateColumn(selectedDocId,DVSTransId);
								}
							});
							//var selectedDocId = selectedDetails.join(',');
					}
					else
					{
						alert("Maximum 3 records can be selected to Validate DVS");
					}
				}
		//}
	});
                //Search Button Click Event
                $("#vha-img-step2-search-btn").on("click", function () {
                    event.preventDefault();
                    //console.log("Serch Button Clicked");
					 var numinput = $('.vha-img-step2-text').val();
					 var dob = $('.vha-img-step2-text-date').val();
					 if(numinput !="" &&  dob !=""){
						// $("vha-merged-cnt-details").removeClass("displaynone");
						 SrcVal();
					 }
					 else
						 alert("Please enter the search criteria.");
                    
                });

                $("#vha-step3-can-btn").on("click", function () {
                    $(".vha-img-cont-merg-step3").addClass("displaynone");
                });
                $("#vha-step3-next").on("click", function () {
					//verifiedStep3 ="Y"; // testing comments 
					if(verifiedStep3 === "Y"){
						$(".vha-img-cont-merg-step3").addClass("displaynone");
						ServiceDetails();
						$(".vha-merged-cnt-details").removeClass("displaynone");
						$(".vha-step2-table").removeClass("displaynone");
						$("#vha-Service-sts-auth").removeClass("displaynone");
						
						// link status msg
						$('#vha-Service-elig-stus').addClass("displaynone");
						$('#vha-Service-Notelig-stus').addClass("displaynone");
							
						var Fnam1= ConFname1.replace(/\s+/g, '').toLowerCase();
						var Fnam2= ConFname2.replace(/\s+/g, '').toLowerCase();
						var Lnam1= ConLname1.replace(/\s+/g, '').toLowerCase();
						var Lnam2= ConLname2.replace(/\s+/g, '').toLowerCase();
						if(Fnam1 != Fnam2){
							$('#vha-Service-Notelig-stus').text("There appears to be a mismatch in the first name. This account is not eligible to link to the main account.")
							$('#vha-Service-Notelig-stus').removeClass("displaynone");
							step3InputsMatch = "N";
						}
						if(Lnam1 != Lnam2){
							$('#vha-Service-Notelig-stus').text("There appears to be a mismatch in the last name. This account is not eligible to link to the main account.")
							$('#vha-Service-Notelig-stus').removeClass("displaynone");
							step3InputsMatch = "N";
						}
						if(ConDOB1 != ConDOB2){
							$('#vha-Service-Notelig-stus').text("There appears to be a mismatch in the date of birth. This account is not eligible to link to the main account.");
							$('#vha-Service-Notelig-stus').removeClass("displaynone");
							step3InputsMatch = "N";
						}
						if(Fnam1 != Fnam2 && Lnam1 != Lnam2 && ConDOB1 != ConDOB2){	
							$('#vha-Service-Notelig-stus').text("There appears to be a mismatch in the first name, last name and date of birth. This account is not eligible to link to the main account.");
							$('#vha-Service-Notelig-stus').removeClass("displaynone");
							step3InputsMatch = "N";
						}
						if(Fnam1 === Fnam2 && Lnam1 === Lnam2 && ConDOB1 === ConDOB2){
							$('#vha-Service-elig-stus').removeClass("displaynone");
							$('#vha-Service-Notelig-stus').addClass("displaynone");
							step3InputsMatch = "Y";
						}
					}
					else
						alert("Please authenticate customer before proceeding.");
                   
                });
                $(".vha-cnt-mrg-allcancel").on("click", function () {
                    event.preventDefault();
                    var contactMrgApplet = SiebelApp.S_App.GetActiveView().GetApplet("TPG Contact Merge Task Playbar Applet Bottom");
                    var controls = contactMrgApplet.GetControls();
                    var ButtonCancel = controls["ButtonCancel"].GetInputName();
                    $('[name="' + ButtonCancel + '"]').trigger("click");

                });
		// step1 authentication start
			 $(".vha-ret-popup-close-btn").on("click", function () {
                    $(".vha-img-cont-merg-step3").addClass("displaynone");
             });
			  // authentication start
                $('input[name="authMethod"]').on("change", function () {
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
                        case "idSighted":
                            //  $("#vha-idsight-send-otp-btn").show();
                            $("#vha-idsight-send-otp-btn").removeClass("displaynone");
                            AuthmethodType = "idSighted";
                            break;
                        case "email":
                            AuthmethodType = "email";
                            if (EmailVerifyFlag_step2 === "Y") {
                                $("#vha-email-send-otp-btn").show();
                            } else {
                                $("#valiadte-email").show();
                            }
                            break;
                        case "phone":
                            AuthmethodType = "phone";
                            if (PhnVerifyFlag_step2 === "Y") {
                                $("#vha-phone-send-otp-btn").show();
                            } else {
                                $("#valiadte-phone").show();
                            }
                            break;
                        case "inApp":
                            $("#vha-inapp-send-otp-btn").removeClass("displaynone");
                            AuthmethodType = "inApp";
                            break;
                    }
                });

                $("#vha-idsight-validateId-btn").on("click", function () {
						var userid = $('#vha-ret-driverlic-Id').val();
						if(userid === IdsightDetails.IdReferenceNumber){
							verifiedStep2 = "Y";
							 $(".IdentrySucess").removeClass("displaynone");
							  $(".IdentryFail").addClass("displaynone");
						}
						else{
							$(".IdentrySucess").addClass("displaynone");
							$(".IdentryFail").removeClass("displaynone");
						}
                });
                $("#vha-inapp-checkbox").on("change", function () {
                    if ($(this).is(":checked")) {
                        verifiedStep2 = "Y";
                    } else {
                       verifiedStep2 = "N";
                    }
                });
                $("#valiadte-email").on("click", function () {
					$("#vha-step2-mail-unverified").text("Email sent");
                    var data;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(stepAuthPbj, "step2");
                            if (data.ErrCd === "0") $("#vha-step2-mail-refresh").removeClass("displaynone");
                            else alert(data.ErrMsg);
                        }, 0);
                    });
                });

                $("#valiadte-phone").on("click", function () {
					$("#vha-step2-phone-unverified").text("SMS sent");
                    var data;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(stepAuthPbj, "step2");
                            if (data.ErrCd === "0") $("#vha-step2-phone-refresh").removeClass("displaynone");
                            else alert(data.ErrMsg);
                        }, 0);
                    });
                });
                $(".refreshicon").on("click", function () {
                    var getflags = getdetails("step2");
                    PhnVerifyFlag_step2 = getflags["Contact Number Validated"];
                    EmailVerifyFlag_step2 = getflags["Email Address Validated"];
                    if (AuthmethodType === "phone") {
                        if (PhnVerifyFlag_step2 === "Y") {
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
                        if (EmailVerifyFlag_step2 === "Y") {
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
                $(".vha-ret-validate-form-btn").on("click", function () {
                    if (OtpStep2 != "") {
                        if (AuthmethodType === "phone") var userotp = $("#vha-phoneinput-Id").val();
                        else var userotp = $("#vha-emailinput-Id").val();

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
                $("#vha-email-send-otp-btn").on("click", function () {
                    $(this).hide();
                  //  $("#email-status").text("Email sent").show();
                    $("#vha-email-send-otp-parent").removeClass("displaynone");
                    $('#vha-emailinput-Id').val('');
					$(".emailauthSuccess").addClass("displaynone");
					$(".emailauthFail").addClass("displaynone");
                    var showotp;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            var response = SendOTP(stepAuthPbj,"step2");
                            showotp = response.GetChildByType("ResultSet").propArray.OTP;
                            //$("#vha-ret-confirmCode").val(showotp);

                            OtpStep2 = showotp;
                        }, 0);
                    });
                    //SendOTP(stepAuthPbj);
                    setTimeout(function () {
                       // $("#email-status").hide();
                        // if (showotp === "")
                        $("#vha-email-resend-otp-btn").show();
                    }, 0);
                });
                
                $("#vha-phone-send-otp-btn").on("click", function () {
                    $(this).hide();
                   // $("#phone-status").text("SMS sent").show();
                    $("#vha-phone-send-otp-parent").removeClass("displaynone");
                    $('#vha-phoneinput-Id').val('');
					$(".phoneauthSuccess").addClass("displaynone");
					$(".phoneauthFail").addClass("displaynone");
                    var showotp;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            var response = SendOTP(stepAuthPbj,"step2");
                            showotp = response.GetChildByType("ResultSet").propArray.OTP;
                            //$("#vha-ret-confirmCode").val(showotp);

                            OtpStep2 = showotp;
                        }, 0);
                    });
                    //SendOTP(stepAuthPbj);
                    setTimeout(function () {
                      //  $("#phone-status").hide();
                        //  if (showotp === "")
                        $("#vha-phone-resend-otp-btn").show();
                    }, 0);
                });

                $(".resend-otp").on("click", function () {
                    const id = $(this).attr("id");
                    //    const sendId = id.replace('resend', 'send');
                    $(this).hide();
                    switch (AuthmethodType) {
                        case "idSighted":
                            $("#idsight-status").text("Code sent").show();
                            break;
                        case "email":
                           // $("#email-status").text("Email sent").show();
						   $('#vha-emailinput-Id').val('');
							$(".emailauthSuccess").addClass("displaynone");
							$(".emailauthFail").addClass("displaynone");
						   var showotp;
							requestAnimationFrame(() => {
								setTimeout(() => {
									var response = SendOTP(stepAuthPbj,"step2");
									showotp = response.GetChildByType("ResultSet").propArray.OTP;
									//$("#vha-ret-confirmCode").val(showotp);

									OtpStep2 = showotp;
								}, 0);
							});
                            break;
                        case "phone":
                           // $("#phone-status").text("SMS sent").show();
						   $('#vha-phoneinput-Id').val('');
							 $(".phoneauthSuccess").addClass("displaynone");
							 $(".phoneauthFail").addClass("displaynone");
						   var showotp;
							requestAnimationFrame(() => {
								setTimeout(() => {
									var response = SendOTP(stepAuthPbj,"step2");
									showotp = response.GetChildByType("ResultSet").propArray.OTP;
									//$("#vha-ret-confirmCode").val(showotp);

									OtpStep2 = showotp;
								}, 0);
							});
                            break;
                        case "inApp":
                            $("#inapp-status").text("Code sent").show();
                            break;
                    }
                    setTimeout(function () {
                        $(".otp-status").hide();
                        $(`#${id}`).show();
                    }, 0);
                });

                //authentication end
	   // step1 authentication end
	   
	   
	   // step3 authentication start
			 // authentication start
                $('input[name="authMethod-step3"]').on("change", function () {
                    $(".send-otp-step3").hide();
                    $(".resend-otp-step3").hide();
                    $(".otp-status-step3").hide();
                    $(".validated-status-step3").hide();
                    $("#vha-idsight-send-otp-btn-step3").addClass("displaynone");
                    $("#vha-inapp-send-otp-btn-step3").addClass("displaynone");
                    $("#vha-email-send-otp-parent-step3").addClass("displaynone");
                    $("#vha-phone-send-otp-parent-step3").addClass("displaynone");
                    // $(".vha-ret-validate-form").addClass("displaynone");
                    // $("#vha-ret-validate-form-btn").addClass("displaynone");
                    $("#vha-ret-confirmCode").val("");
                    $(".refreshicon-step3").addClass("displaynone");
                    switch (this.value) {
                        case "idSighted":
                            //  $("#vha-idsight-send-otp-btn").show();
                            $("#vha-idsight-send-otp-btn-step3").removeClass("displaynone");
                            AuthmethodType3 = "idSighted";
                            break;
                        case "email":
                            AuthmethodType3 = "email";
                            if (EmailVerifyFlag_step3 === "Y") {
                                $("#vha-email-send-otp-btn-step3").show();
                            } else {
                                $("#valiadte-email-step3").show();
                            }
                            break;
                        case "phone":
                            AuthmethodType3 = "phone";
                            if (PhnVerifyFlag_step3 === "Y") {
                                $("#vha-phone-send-otp-btn-step3").show();
                            } else {
                                $("#valiadte-phone-step3").show();
                            }
                            break;
                        case "inApp":
                            $("#vha-inapp-send-otp-btn-step3").removeClass("displaynone");
                            AuthmethodType3 = "inApp";
                            break;
                    }
                });

                $("#vha-idsight-validateId-btn-step3").on("click", function () {
                    var userid = $('#vha-ret-driverlic-Id-step3').val();
					if(userid === IdsightDetails3.IdReferenceNumber){
						verifiedStep3 = "Y";
						 $(".IdentrySucess-step3").removeClass("displaynone");
                          $(".IdentryFail-step3").addClass("displaynone");
					}
					else{
						$(".IdentrySucess-step3").addClass("displaynone");
                        $(".IdentryFail-step3").removeClass("displaynone");
					}
                });
                $("#vha-inapp-checkbox-step3").on("change", function () {
                    if ($(this).is(":checked")) {
                        verifiedStep3 = "Y";
                    } else {
                       verifiedStep3 = "N";
                    }
                });
                $("#valiadte-email-step3").on("click", function () {
					 $("#vha-step3-mail-unverified").text("Email sent");
                    var data;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(stepAuthPbj3, "step3");
                            if (data.ErrCd === "0") $("#vha-step3-mail-refresh").removeClass("displaynone");
                            else alert(data.ErrMsg);
                        }, 0);
                    });
                });

                $("#valiadte-phone-step3").on("click", function () {
					$("#vha-step3-phone-unverified").text("SMS sent");
                    var data;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            data = verifyEmailSms(stepAuthPbj3, "step3");
                            if (data.ErrCd === "0") $("#vha-step3-phone-refresh").removeClass("displaynone");
                            else alert(data.ErrMsg);
                        }, 0);
                    });
                });
                $(".refreshicon-step3").on("click", function () {
                    var getflags = getdetails("step3");
                    PhnVerifyFlag_step3 = getflags["Contact Number Validated"];
                    EmailVerifyFlag_step3 = getflags["Email Address Validated"];
                    if (AuthmethodType3 === "phone") {
                        if (PhnVerifyFlag_step3 === "Y") {
                            $("#vha-step3-phone-traingexclm").addClass("displaynone");
                            $("#vha-step3-phone-tickmark").removeClass("displaynone");
                            $(this).addClass("displaynone");
                            $("#valiadte-phone-step3").hide();
                            $("#vha-phone-send-otp-btn-step3").show();
							$('#vha-step3-phone-unverified').text("Verified");
							$("#vha-step3-phone-unverified").removeClass("displaynone");
							
                        } else {
                            $("#vha-step3-phone-traingexclm").removeClass("displaynone");
                            $("#vha-step3-phone-tickmark").addClass("displaynone");
							$('#vha-step3-phone-unverified').text("Unverified");
							$("#vha-step3-phone-unverified").removeClass("displaynone");
                        }
                    }
                    if (AuthmethodType3 === "email") {
                        if (EmailVerifyFlag_step3 === "Y") {
                            $("#vha-step3-mail-traingexclm").addClass("displaynone");
                            $("#vha-step3-mail-tickmark").removeClass("displaynone");
                            $(this).addClass("displaynone");
                            $("#valiadte-email-step3").hide();
                            $("#vha-email-send-otp-btn-step3").show();
							$("#vha-step3-mail-unverified").text("Verified");
						    $("#vha-step3-mail-unverified").removeClass("displaynone");
                        } else {
                            $("#vha-step3-mail-traingexclm").removeClass("displaynone");
                            $("#vha-step3-mail-tickmark").addClass("displaynone");
							$("#vha-step3-mail-unverified").text("Unverified");
							$("#vha-step3-mail-unverified").removeClass("displaynone");
                        }
                    }
                });
                $(".vha-ret-validate-form-btn-step3").on("click", function () {
                    if (OtpStep3 != "") {
                        if (AuthmethodType3 === "phone") var userotp = $("#vha-phoneinput-Id-step3").val();
                        else var userotp = $("#vha-emailinput-Id-step3").val();

                        if (userotp === OtpStep3) {
                            verifiedStep3 = "Y";
                            // alert("verified");
                            if (AuthmethodType3 === "email") {
                                $(".emailauthSuccess-step3").removeClass("displaynone");
                                $(".emailauthFail-step3").addClass("displaynone");
                            }
                            if (AuthmethodType3 === "phone") {
                                $(".phoneauthSuccess-step3").removeClass("displaynone");
                                $(".phoneauthFail-step3").addClass("displaynone");
                            }
                        } else {
                            verifiedStep3 = "N";
                            // alert("enter correct otp");
                            if (AuthmethodType3 === "email") {
                                $(".emailauthSuccess-step3").addClass("displaynone");
                                $(".emailauthFail-step3").removeClass("displaynone");
                            }
                            if (AuthmethodType3 === "phone") {
                                $(".phoneauthSuccess-step3").addClass("displaynone");
                                $(".phoneauthFail-step3").removeClass("displaynone");
                            }
                        }
                    }
                });
                $("#vha-email-send-otp-btn-step3").on("click", function () {
                    $(this).hide();
                   // $("#email-status-step3").text("Email sent").show();
                    $("#vha-email-send-otp-parent-step3").removeClass("displaynone");
                    $('#vha-emailinput-Id-step3').val('');
					$(".emailauthSuccess-step3").addClass("displaynone");
					$(".emailauthFail-step3").addClass("displaynone");
                    var showotp;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            var response = SendOTP(stepAuthPbj3,"step3");
                            showotp = response.GetChildByType("ResultSet").propArray.OTP;
                            //$("#vha-ret-confirmCode").val(showotp);

                            OtpStep3 = showotp;
                        }, 0);
                    });
                    //SendOTP(stepAuthPbj);
                    setTimeout(function () {
                     //   $("#email-status-step3").hide();
                        // if (showotp === "")
                        $("#vha-email-resend-otp-btn-step3").show();
                    }, 0);
                });
                
                $("#vha-phone-send-otp-btn-step3").on("click", function () {
                    $(this).hide();
                  //  $("#phone-status-step3").text("SMS sent").show();
                    $("#vha-phone-send-otp-parent-step3").removeClass("displaynone");
                   $('#vha-phoneinput-Id-step3').val('');
					 $(".phoneauthSuccess-step3").addClass("displaynone");
					 $(".phoneauthFail-step3").addClass("displaynone");
                    var showotp;
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            var response = SendOTP(stepAuthPbj3,"step3");
                            showotp = response.GetChildByType("ResultSet").propArray.OTP;
                            //$("#vha-ret-confirmCode").val(showotp);

                            OtpStep3 = showotp;
                        }, 0);
                    });
                    //SendOTP(stepAuthPbj);
                    setTimeout(function () {
                     //   $("#phone-status-step3").hide();
                        //  if (showotp === "")
                        $("#vha-phone-resend-otp-btn-step3").show();
                    }, 0);
                });

                $(".resend-otp-step3").on("click", function () {
                    const id = $(this).attr("id");
                    //    const sendId = id.replace('resend', 'send');
                    $(this).hide();
                    switch (AuthmethodType3) {
                        case "idSighted":
                            $("#idsight-status-step3").text("Code sent").show();
                            break;
                        case "email":
                           // $("#email-status-step3").text("Email sent").show();
						   $('#vha-emailinput-Id-step3').val('');
							$(".emailauthSuccess-step3").addClass("displaynone");
							$(".emailauthFail-step3").addClass("displaynone");
						   var showotp;
							requestAnimationFrame(() => {
								setTimeout(() => {
									var response = SendOTP(stepAuthPbj3,"step3");
									showotp = response.GetChildByType("ResultSet").propArray.OTP;
									//$("#vha-ret-confirmCode").val(showotp);

									OtpStep3 = showotp;
								}, 0);
							});
                            break;
                        case "phone":
                           // $("#phone-status-step3").text("SMS sent").show();
						   $('#vha-phoneinput-Id-step3').val('');
							 $(".phoneauthSuccess-step3").addClass("displaynone");
							 $(".phoneauthFail-step3").addClass("displaynone");
						   var showotp;
							requestAnimationFrame(() => {
								setTimeout(() => {
									var response = SendOTP(stepAuthPbj3,"step3");
									showotp = response.GetChildByType("ResultSet").propArray.OTP;
									//$("#vha-ret-confirmCode").val(showotp);

									OtpStep3 = showotp;
								}, 0);
							});
                            break;
                        case "inApp":
                            $("#inapp-status-step3").text("Code sent").show();
                            break;
                    }
                    setTimeout(function () {
                        $(".otp-status-step3").hide();
                        $(`#${id}`).show();
                    }, 0);
                });

                //authentication end
		
	   // step3 authentication end
				  
				
            };

            VHAContactMergeMFAAppletTBUIPR.prototype.EndLife = function () {
                SiebelAppFacade.VHAContactMergeMFAAppletTBUIPR.superclass.EndLife.apply(this, arguments);
            };
			 // send otp
            function SendOTP(item,callfrom) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                Input.SetProperty("ProcessName", "VHA Generate OTP Process");
                Input.SetProperty("OrgName", item.OrgName);
                Input.SetProperty("ARII", item.ARII);
                Input.SetProperty("ContactId", item.ContactId);
                Input.SetProperty("AccountObjectId", item.AccountObjectId);
				Input.SetProperty("AccId", item.AccountObjectId);
                if(callfrom === "step2"){
					if (AuthmethodType === "email"){
						Input.SetProperty("EmailAddr", item.EmailOTP);
						Input.SetProperty("EmailOTP", "ConEmailOTP");
					} 
						
					else Input.SetProperty("MSISDN", item.MSISDN);
				}
				else{
					if (AuthmethodType3 === "email") {
						Input.SetProperty("EmailAddr", item.EmailOTP);
						Input.SetProperty("EmailOTP", "ConEmailOTP");
					}
						
					else Input.SetProperty("MSISDN", item.MSISDN);
				}
                
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                return Outputs;
            }
			// email or sms verify

            function verifyEmailSms(item, callfrom) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                //var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
                Input.SetProperty("Object Id", item.ContactId);
                Input.SetProperty("sConId", item.ContactId);
				if(callfrom === "step2"){
					 if (AuthmethodType === "email") {
						Input.SetProperty("sType", "Email");
						Input.SetProperty("sValue", item.EmailOTP);
						}
					if (AuthmethodType === "phone") {
							Input.SetProperty("sType", "SMS");
							Input.SetProperty("sValue", item.MSISDN);
					 }
				}
				else{
					if (AuthmethodType3 === "email") {
                    Input.SetProperty("sType", "Email");
                    Input.SetProperty("sValue", item.EmailOTP);
					}
					if (AuthmethodType3 === "phone") {
						Input.SetProperty("sType", "SMS");
						Input.SetProperty("sValue", item.MSISDN);
					}
				}
               
                Input.SetProperty("ProcessName", "VHA Digital Email SMS Verification Process");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                var datatemp = Outputs.childArray[0].propArray;
                return datatemp;
            }
            function authcontdetails() {
				
				const phoneNumber = authdetails["PhNum"];
                const maskedNumber = phoneNumber.substring(0, 2) + "xxxxxx" + phoneNumber.substring(phoneNumber.length - 3);

                const email = authdetails["Email"];
                const [username, domain] = email.split("@");
               // const maskLength = username.length - 2;
               // const maskedMiddle = "x".repeat(maskLength > 0 ? maskLength : 0);
                const maskedEmail = username.charAt(0) + "xxxxxxxxxx" + username.charAt(username.length - 1) + "@" + domain;
				let maskedName = authdetails["FullName"].replace(/(\b\w)(\w*)/g, (_, first, rest) => first + "x".repeat(rest.length));

                $("#vha-ret-authName").text(maskedName);
                $("#vha-ret-authDob").text(authdetails["DOB"]);
                $("#vha-ret-authEmailDisplay").text(maskedEmail);
                $("#vha-ret-authPhoneDisplay").text(maskedNumber);
				
				ConId1 = authdetails["ConId"];
				ConName1 = authdetails["FullName"];
				ConFname1 = authdetails["FirstName"];
				ConLname1 = authdetails["LastName"];
				ConPhone1 = authdetails["PhNum"];
				ConPhoneflag1 = authdetails.PhNumFlg;
				Conemail1 = authdetails["Email"];
				Conemailflag1 = authdetails.EmailFlg;
				ConDOB1 = authdetails["DOB"];
				DigUName1 = authdetails["DigUName"];
				
				IdsightDetails = getIDdetails(ConId1);
				var idtype = IdsightDetails.IdType+" "+"****"+IdsightDetails.IdReferenceNumber.slice(-4);
				$("#mfa-step1-IdentryVal").text(idtype);
				
                stepAuthPbj.ARII = authdetails.AccARII;
                stepAuthPbj.OrgName = authdetails.AccOrg;
                stepAuthPbj.ContactId = authdetails["ConId"];
                stepAuthPbj.AccountObjectId = ConAccId1;
                stepAuthPbj.MSISDN = authdetails["PhNum"];
                stepAuthPbj.EmailOTP = authdetails["Email"];
                
                PhnVerifyFlag_step2 = authdetails.PhNumFlg;
                EmailVerifyFlag_step2 = authdetails.EmailFlg;
					
                if (PhnVerifyFlag_step2 === "Y") {
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
                if (EmailVerifyFlag_step2 === "Y") {
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
            function getdetails(callfrom) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
				if(callfrom ==="step2")
					var ObjectId = authdetails.ConId;
				else
					var ObjectId = ConId2;
				
                Input.SetProperty("Contact Id", ObjectId);
                Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                var datatemp = Outputs.childArray[0].propArray;
                return datatemp;
            }
            function contactData() {
               // var ConId1 = "2-CLLLKSQ";
                var contactMergeWF = TheApplication().GetService("Workflow Process Manager");
                var contactMergeInput = TheApplication().NewPropertySet();
                contactMergeInput.SetProperty("ProcessName", "TPG Contact Merge Process");
                contactMergeInput.SetProperty("FlowType", "ConData");
                contactMergeInput.SetProperty("ConId", ConId1);
                var contactMergeOutput = contactMergeWF.InvokeMethod("RunProcess", contactMergeInput);
                return contactMergeOutput.propArray;
            }
            // Id entry mfa
			function getIDdetails(conid) {
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Input = SiebelApp.S_App.NewPropertySet();
				Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
				Input.SetProperty("Contact Id",conid );
				Input.SetProperty("FlowType", "IDdata");
				var Outputs = ser.InvokeMethod("RunProcess", Input);                
				var proparray = Outputs.childArray[0].propArray;
				return proparray;
			}
            function SrcVal() {
                var numinput = $('.vha-img-step2-text').val();
                var dob = $('.vha-img-step2-text-date').val();
				var dobparts = dob.split('/');
			 if(dobparts[1] <= 12){
				
				var formattedDob ="";
				if (dobparts.length === 3){
					var year = dobparts[2];
					var month = dobparts[1];
					var day = dobparts[0];
					formattedDob = month+"/"+day+"/"+year;
				}


                //var numinput = "61421003625";
                //var dob = "18/11/1982";
                var contactMergeWF = TheApplication().GetService("Workflow Process Manager");
                var contactMergeInput = TheApplication().NewPropertySet();
                contactMergeInput.SetProperty("ProcessName", "TPG Contact Merge Process");
                contactMergeInput.SetProperty("FlowType", "SrcVal");
                contactMergeInput.SetProperty("SrcVal", numinput);
                contactMergeInput.SetProperty("SrcDOB", formattedDob);
                contactMergeInput.SetProperty("ConId", ConId1);
                contactMergeOutput = contactMergeWF.InvokeMethod("RunProcess", contactMergeInput);
                ConId2 = contactMergeOutput.propArray.SrcPrConId;
                ConName2 = contactMergeOutput.propArray.FullName;
				ConFname2 = contactMergeOutput.propArray.FirstName;
				ConLname2 = contactMergeOutput.propArray.LastName;
                ConPhone2 = contactMergeOutput.propArray.PhNum;
                ConPhoneflag2 = contactMergeOutput.propArray.PhNumFlg;
                Conemail2 = contactMergeOutput.propArray.Email;
                Conemailflag2 = contactMergeOutput.propArray.EmailFlg;
                ConDOB2 = contactMergeOutput.propArray.DOB;
                ConAccId2 = contactMergeOutput.propArray.SrcAccId;
                ConRole2 = contactMergeOutput.propArray.ConRole;
                DigUName2 = contactMergeOutput.propArray.DigUName;
                
				const phoneNumber = ConPhone2;
                const maskedNumber = phoneNumber.substring(0, 2) + "xxxxxx" + phoneNumber.substring(phoneNumber.length - 3);

                const email = Conemail2;
                const [username, domain] = email.split("@");
              //  const maskLength = username.length - 2;
              //  const maskedMiddle = "x".repeat(maskLength > 0 ? maskLength : 0);
                const maskedEmail = username.charAt(0) + "xxxxxxxxxx" + username.charAt(username.length - 1) + "@" + domain;
				
				IdsightDetails3 = getIDdetails(ConId2);
				var idtype = IdsightDetails3.IdType+" "+"****"+IdsightDetails3.IdReferenceNumber.slice(-4);
				$("#mfa-step3-IdentryVal").text(idtype);
				let maskedName = ConName2.replace(/(\b\w)(\w*)/g, (_, first, rest) => first + "x".repeat(rest.length));

				$("#vha-ret-authName-step3").text(maskedName);
                $("#vha-ret-authDob-step3").text(ConDOB2);
                $("#vha-ret-authEmailDisplay-step3").text(maskedEmail);
                $("#vha-ret-authPhoneDisplay-step3").text(maskedNumber);
                $("#vha-step2-merged-name").text(ConName2);
				var maskedConPhone2 = maskValue(ConPhone2);
                $("#vha-step2-merged-prim-cont").text(maskedConPhone2);
                //$("#vha-step2-merged-prim-cont").text(ConPhone2);
                $("#vha-step2-merged-dob").text(ConDOB2);
                $("#vha-step2-merged-Role").text(ConRole2);
			
				stepAuthPbj3.ARII = "";
                stepAuthPbj3.OrgName = "";
                stepAuthPbj3.ContactId = ConId2;
                stepAuthPbj3.AccountObjectId = ConAccId2;
                stepAuthPbj3.MSISDN = ConPhone2;
                stepAuthPbj3.EmailOTP = Conemail2;
                
                PhnVerifyFlag_step3 = Conemailflag2;
                EmailVerifyFlag_step3 = ConPhoneflag2;
				

                if (PhnVerifyFlag_step3 === "Y") {
                    $("#vha-step3-phone-traingexclm").addClass("displaynone");
                    $("#vha-step3-phone-tickmark").removeClass("displaynone");
					$('#vha-step3-phone-unverified').text("Verified");
					$("#vha-step3-phone-unverified").removeClass("displaynone");
                } else {
                    $("#vha-step3-phone-traingexclm").removeClass("displaynone");
                    $("#vha-step3-phone-tickmark").addClass("displaynone");
					$('#vha-step3-phone-unverified').text("Unverified");
					$("#vha-step3-phone-unverified").removeClass("displaynone");
                }
                if (EmailVerifyFlag_step3 === "Y") {
                    $("#vha-step3-mail-traingexclm").addClass("displaynone");
                    $("#vha-step3-mail-tickmark").removeClass("displaynone");
					$("#vha-step3-mail-unverified").text("Verified");
					 $("#vha-step3-mail-unverified").removeClass("displaynone");
                } else {
                    $("#vha-step3-mail-traingexclm").removeClass("displaynone");
                    $("#vha-step3-mail-tickmark").addClass("displaynone");
					$("#vha-step3-mail-unverified").text("Unverified");
					$("#vha-step3-mail-unverified").removeClass("displaynone");
                }
				//if(ConDOB2 != "" && ConPhone2 !="" &&  Conemail2 !="")
				if(ConId2 != "" && ConId2 != undefined)
					$(".vha-img-cont-merg-step3").removeClass("displaynone");
			  }
			  
			  else
				  alert("Please enter the correct Date of Birth format.");
            }
            //Call this Funcation When click on the Next Button in Popup applet
            function ServiceDetails() {
               // var ConAccId2 = "1-4U7NT";
                var contactMergeWF = TheApplication().GetService("Workflow Process Manager");
                var contactMergeInput = TheApplication().NewPropertySet();
                contactMergeInput.SetProperty("ProcessName", "TPG Contact Merge Process");
                contactMergeInput.SetProperty("FlowType", "ServiceDetails");
                contactMergeInput.SetProperty("AccId", ConAccId2);
                var contactMergeOutput = contactMergeWF.InvokeMethod("RunProcess", contactMergeInput);
                var assetDetails = contactMergeOutput.GetChildByType("AssetDetails");
                var serviceDetails = assetDetails.childArray;
                createServiceDetails(serviceDetails);
            }
			function idData(){
				var contactMergeWF = TheApplication().GetService("Workflow Process Manager");
				var contactMergeInput = TheApplication().NewPropertySet();
				contactMergeInput.SetProperty("ProcessName", "TPG Contact Merge Process");
				contactMergeInput.SetProperty("FlowType","IDdata");		
				contactMergeInput.SetProperty("ConId",ConId1);		
				contactMergeInput.SetProperty("SrcPrConId",ConId2);		
				var contactMergeOutput = contactMergeWF.InvokeMethod("RunProcess", contactMergeInput);
				var retainProfile = contactMergeOutput.GetChildByType("IDdata1");
				var IDdata1 =retainProfile.childArray;
				var otherProfile = contactMergeOutput.GetChildByType("IDdata2");
				var IDdata2 =otherProfile.childArray;
				createRetainProfiletable(IDdata1);
				otherProfiletable(IDdata2);
				 
			}
			function SubmitPage()
			{
				var contactMergeWF = TheApplication().GetService("Workflow Process Manager");
				var contactMergeInput = TheApplication().NewPropertySet();
				contactMergeInput.SetProperty("ProcessName", "TPG Contact Merge Process");
				contactMergeInput.SetProperty("FlowType","IDdata");		
				contactMergeInput.SetProperty("ConId",ConId1);		
				contactMergeInput.SetProperty("SrcPrConId",ConId2);		
				contactMergeInput.SetProperty("Pagenum","4");		
				var contactMergeOutput = contactMergeWF.InvokeMethod("RunProcess", contactMergeInput);
				var idHistory = contactMergeOutput.GetChildByType("IDHistdata");
				IdentiHistory =idHistory.childArray;
				var idDoc = contactMergeOutput.GetChildByType("IDdata");
				IdDocDetails = idDoc.childArray;
				var idtemp = contactMergeOutput.GetChildByType("IDTempdata");
				CopyID = idtemp.propArray.CopyID;
				CopyIDHist = idtemp.propArray.CopyIDHist;
				IdList = idtemp.propArray.IdList;
				ReplaceID = idtemp.propArray.ReplaceID;
				createIdDocTableHistory(IdentiHistory);
				createIdDocTable(IdDocDetails);
			}
            function loadPage2() {
				if(verifiedStep2 === "Y")
					$("#vha-step2-main-prof").text("Authenticated");
				else
					$("#vha-step2-main-prof").text("Authenticated");
                $("#vha-step2-name").text(ConName1);
                $("#vha-step2-dob").text(ConDOB1);
				var maskedConPhone1 = maskValue(ConPhone1);
                //$("#vha-step2-prim-cont").text(maskedConPhone1);
                $("#vha-step2-prim-cont").text(ConPhone1);
            }
			function maskValue(value) {
				if (value != null && value !="" && value!= undefined)
				{
				const length = value.length;
					if (length <= 6) {
						// If length is less than or equal to 6, show the first character and mask the rest
						const visibleStart = value.slice(0, 1);
						const maskedPart = "x".repeat(length - 2);
						const visibleEnd = length > 1 ? value.slice(-1) : "";
						return visibleStart + maskedPart + visibleEnd;
					} else {
						// For length greater than 6, show first 3 and last 3 characters, mask the rest
						const firstThree = value.slice(0, 3);
						const lastThree = value.slice(-3);
						const maskedPart = "x".repeat(length - 6);
						return firstThree + maskedPart + lastThree;
					}
				}
				else{
				var val = "";
				return val;
				}
			}
            function createRetainProfiletable(IDdata1) {
                var RetainProfiletable = [];
                for (let i = 0; i < IDdata1.length; i++) {
                    var obj = {};
                    obj.DocumentType = IDdata1[i].propArray.IdType;
                    obj.DocumentNumber = IDdata1[i].propArray.ReferenceNumberCalc;
                    obj.Primary = IDdata1[i].propArray.Primary;
                    obj.Status = IDdata1[i].propArray.Status;
                    RetainProfiletable.push(obj);
                }
                console.log("RetainProfiletable" + RetainProfiletable);
                $(".vha-step4-table1 tbody").empty();
                $.each(RetainProfiletable, function (index, item) {
                    var row = $("<tr>");
                    var td = $("<td>");
                    row.append($("<td>").text(item.DocumentType || " "));
                    row.append($("<td>").text(item.DocumentNumber || " "));
                    //row.append($("<td>").text(item.DocumentNumber ? item.DocumentNumber.slice(0, -2).replace(/./g, "*") + item.DocumentNumber.slice(-2): " "));
                    row.append($("<td>").text(item.Primary || " "));
                    row.append($("<td>").text(item.Status || " "));
                    $(".vha-step4-table1 tbody").append(row);
                });
            }
            function otherProfiletable(IDdata2) {
                var otherProfiletable = [];
                for (let i = 0; i < IDdata2.length; i++) {
                    var obj = {};
                    obj.SearchForId = IDdata2[i].propArray.Primary;
                    obj.DocumentType = IDdata2[i].propArray.IdType;
                    obj.DocumentNumber = IDdata2[i].propArray.ReferenceNumberCalc;
                    obj.Status = IDdata2[i].propArray.Status;
                    obj.Dvs = IDdata2[i].propArray.DVSTransactionId;
                    obj.Action = IDdata2[i].propArray.Action;
					obj.DocId = IDdata2[i].propArray.DocId;
                    otherProfiletable.push(obj);
                }
                console.log("otherProfiletable" + otherProfiletable);
                $(".vha-step4-table2 tbody").empty();
                $.each(otherProfiletable, function (index, item) {
                    var row = $("<tr>");
                    var td = $("<td>");
					var checkbox = $("<input>").attr("type", "checkbox").attr("id", "rowid" + index).attr("docId",item.DocId).attr("DvsVal",item.Dvs).attr("class","otherProfiletablecheckbox");
					row.append($("<td>").append(checkbox));
                  //  row.append($("<td>").text(item.SearcgForId || " "));
                    row.append($("<td>").text(item.DocumentType || " "));
                    row.append($("<td>").text(item.DocumentNumber || " "));
					//row.append($("<td>").text(item.DocumentNumber ? item.DocumentNumber.slice(0, -2).replace(/./g, "*") + item.DocumentNumber.slice(-2): " "));
                    row.append($("<td>").text(item.Status || " "));
                    row.append($("<td>").text(item.Dvs || " "));
                    row.append($("<td>").text(item.Action || " "));
                    $(".vha-step4-table2 tbody").append(row);
                });
            }
            function createServiceDetails(serviceDetails) {
                var SerDetails = [];
                for (let i = 0; i < serviceDetails.length; i++) {
                    var obj = {};
                    obj.CAAccNum = serviceDetails[i].propArray.AccNo;
                    obj.MSISDN = serviceDetails[i].propArray.MSISDN;
                    obj.Plan = serviceDetails[i].propArray.Plan;
                    obj.Status = serviceDetails[i].propArray.Status;
                    obj.BillingAccount = serviceDetails[i].propArray.BillingAccount;
                    SerDetails.push(obj);
                }
                console.log(SerDetails);
                $(".vha-step2-table tbody").empty();
                $.each(SerDetails, function (index, item) {
                    var row = $("<tr>");
                    var td = $("<td>");
                    row.append($("<td>").text(item.CAAccNum || " "));
                    row.append($("<td>").text(item.MSISDN || " "));
                    row.append($("<td>").text(item.Plan || " "));
                    row.append($("<td>").text(item.Status || " "));
                    row.append($("<td>").text(item.BillingAccount || " "));
                    $(".vha-step2-table tbody").append(row);
                });
            }
            function createIdDocTableHistory(IdentiHistory) {
                var IdDocTable = [];
                for (let i = 0; i < IdentiHistory.length; i++) {
                    var obj = {};
                    obj.DocumentType = IdentiHistory[i].propArray.IdType;
                    obj.DocumentNumber = IdentiHistory[i].propArray.ReferenceNumberCalc;
                    obj.Primary = IdentiHistory[i].propArray.Primary;
                    IdDocTable.push(obj);
                }
                console.log("DocTableHistory" + IdDocTable);
                $(".vha-step5-table2 tbody").empty();
                $.each(IdDocTable, function (index, item) {
                    var row = $("<tr>");
                    var td = $("<td>");
                    row.append($("<td>").text(item.DocumentType || " "));
                    row.append($("<td>").text(item.DocumentNumber || " "));
                    row.append($("<td>").text(item.Primary || " "));
                    $(".vha-step5-table2 tbody").append(row);
                });
            }
            function createIdDocTable(IdDocDetails) {
                var IdDocTable = [];
                for (let i = 0; i < IdDocDetails.length; i++) {
                    var obj = {};
                    obj.DocumentType = IdDocDetails[i].propArray.IdType;
                    obj.DocumentNumber = IdDocDetails[i].propArray.ReferenceNumberCalc;
                    obj.Primary = IdDocDetails[i].propArray.Primary;
                    IdDocTable.push(obj);
                }
                $(".vha-step5-table1 tbody").empty();
                $.each(IdDocTable, function (index, item) {
                    var row = $("<tr>");
                    var td = $("<td>");
                    row.append($("<td>").text(item.DocumentType || " "));
                    row.append($("<td>").text(item.DocumentNumber || " "));
                    row.append($("<td>").text(item.Primary || " "));
                    $(".vha-step5-table1 tbody").append(row);
                });
            }
			function updateColumn(selectedDocId,dvstransId) 
			{
				var table = document.querySelectorAll('.vha-step4-table2');
				var rowcount = table[0].rows.length;
				for (var i = 1; i < rowcount ; i++) {
					var row = table[0].rows[i];
					var cellId = row.cells[0].childNodes[0].getAttribute('DocId');
					
					if (cellId == selectedDocId) {
						//row.cells[4].innerHTML = "DVS-"+ dvstransId;
						row.cells[4].innerHTML = dvstransId;
						break; 
					}
				}
			}
			function validatedDvs()
			{
					Dvsvalidated ="Y";
					var table = document.querySelectorAll('.vha-step4-table2');
					var rowcount = table[0].rows.length;
					for (var i = 1; i < rowcount ; i++) {
						var row = table[0].rows[i];
						var DvscellVal = row.cells[4].childNodes[0].textContent;
						var DocType = row.cells[1].childNodes[0].textContent;
						var Docstatus = row.cells[3].childNodes[0].textContent;
						//if (DvscellVal === " ") 
						if (DvscellVal === " " && Docstatus === "Active" && (DocType === "VISA" || DocType === "Passport" || DocType === "Green Medicare Card" || DocType === "Interim Medicare Card" || DocType === "" || DocType === "Reciprocal Medicare Card" || DocType === "Medicare Card" || DocType === "Driver's Licence")) 
						{
							Dvsvalidated ="N"
							break; 
						}
					}
				
			}
			function PrepayCheck ()
			{
					var contactMergeWF = TheApplication().GetService("Workflow Process Manager");
					var contactMergeInput = TheApplication().NewPropertySet();
					contactMergeInput.SetProperty("ProcessName", "TPG Contact Merge Postpay Validation Process");
					contactMergeInput.SetProperty("AccountId",ConAccId2);
					contactMergeInput.SetProperty("ContactId",ConId2);	
					contactMergeInput.SetProperty("DocId","");
					contactMergeInput.SetProperty("AccountId1",ConAccId1);
					contactMergeInput.SetProperty("PrepayCheck","Y");
					var contactMergeOutput = contactMergeWF.InvokeMethod("RunProcess", contactMergeInput);
					Prepay = contactMergeOutput.propArray.PrepayAcc;
					//Prepay = "Prepay";
			}
            return VHAContactMergeMFAAppletTBUIPR;
        })();
        return "SiebelAppFacade.VHAContactMergeMFAAppletTBUIPR";
    });
}
