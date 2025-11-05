if (typeof(SiebelAppFacade.VHAChangeRoleLtdUserPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.VHAChangeRoleLtdUserPR");
    define("siebel/custom/VHAChangeRoleLtdUserPR", ["siebel/jqgridrenderer"],
        function () {
        SiebelAppFacade.VHAChangeRoleLtdUserPR = (function () {

            function VHAChangeRoleLtdUserPR(pm) {
                SiebelAppFacade.VHAChangeRoleLtdUserPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(VHAChangeRoleLtdUserPR, SiebelAppFacade.JQGridRenderer);
			//variables 
			var PhnVerifyFlag_step2;
			var EmailVerifyFlag_step2;
			var AuthmethodType;
			var stepAuthPbj ={};
			var OtpStep2;
			var verifiedStep2;
			var authdetails;
			var IdsightDetails;
			var accntId;
			
            VHAChangeRoleLtdUserPR.prototype.Init = function () {
                // Init is called each time the object is initialised.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAChangeRoleLtdUserPR.superclass.Init.apply(this, arguments);
                // Add code here that should happen after default processing
            }

            VHAChangeRoleLtdUserPR.prototype.ShowUI = function () {
                // ShowUI is called when the object is initially laid out.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAChangeRoleLtdUserPR.superclass.ShowUI.apply(this, arguments);
                // Add code here that should happen after default processing
				
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
			
                $('button[data-display="Change role as Decision Maker"]').on('click', function () {
					
					var ValidAge = ValidateCustAge();
					if(ValidAge == "Y")
					{
						var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
						var ConRole = conListApplet.GetBusComp().GetFieldValue("VF Contact Role");
						//workflowcall(ConRole, "DM");
						buttonTrigger(ConRole, "DM", "Decision Maker");
					}
					else
					{
						alert("Nominee must be 18 and above for this role. Please choose a different role for this nominee, or nominate a different person.");
					}
                })
                $('button[data-display="Change role as Limited User"]').on('click', function () {
                    var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
                    var ConRole = conListApplet.GetBusComp().GetFieldValue("VF Contact Role");
                    buttonTrigger(ConRole, "LU", "Limited User");

                })
                $('button[data-display="Change role as Authorised Contact"]').on('click', function () {
					var ValidAge = ValidateCustAge();
					if(ValidAge == "Y")
					{
						var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
						var ConRole = conListApplet.GetBusComp().GetFieldValue("VF Contact Role");
						if (ConRole === "Limited User") {
							buttonTrigger(ConRole, "AC", "Authorised Contact");
						} else {
						   // workflowcall(ConRole, "AC");
							buttonTrigger(ConRole, "AC", "Authorised Contact");
						}
					}
					else
					{
						alert("Nominee must be 18 and above for this role. Please choose a different role for this nominee, or nominate a different person.");
					}

                })
                $('button[data-display="Remove Linkage"]').on('click', function () {
                    var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
                    var fullname = conListApplet.GetBusComp().GetFieldValue("Full Name");
                    var lastname = conListApplet.GetBusComp().GetFieldValue("Last Name");
                    var firstname = conListApplet.GetBusComp().GetFieldValue("First Name");

                    var message = "Are you sure you want to delete " + lastname + " " + firstname + " from this account "
                        $('<div></div>').appendTo('body')
                        .html('<div><h6>' + message + '?</h6></div>')
                        .dialog({
                            modal: true,
                            title: '',
                            zIndex: 10000,
                            autoOpen: true,
                            width: 'auto',
                            resizable: false,
                            buttons: {
                                Yes: function () {
                                    var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
                                    var Objectid = conListApplet.GetBusComp().GetParentBuscomp().GetFieldValue("Id");
                                    var ConId = conListApplet.GetBusComp().GetFieldValue("Id");
                                    var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                                    var Inputs = SiebelApp.S_App.NewPropertySet();
                                    var Outputs = SiebelApp.S_App.NewPropertySet()
                                        Inputs.SetProperty("ProcessName", "VHA InvCon Delink Validation Process");
                                    Inputs.SetProperty("Object Id", Objectid);
                                    Inputs.SetProperty("ConId", ConId);
                                    Outputs = ser.InvokeMethod("RunProcess", Inputs);
                                    Error = Outputs.childArray[0].propArray.ErrMsg;
                                    if (Error != null && Error != undefined && Error != "") {
                                        $(this).dialog("close");
                                        $('<div></div>').appendTo('body')
                                        .html('<div><h6>' + Error + '</h6></div>')
                                        .dialog({
                                            modal: true,
                                            title: '',
                                            zIndex: 10000,
                                            autoOpen: true,
                                            width: 'auto',
                                            resizable: false,
                                            buttons: {
                                                Ok: function () {
                                                    $(this).dialog("close");
                                                },
                                            },
                                            close: function (event, ui) {
                                                $(this).remove();
                                            }
                                        });
                                    } else {
										$(this).dialog("close"); 
										// open mfa and call removelinkage Workflow
										authdetails = getdetails();
										IdsightDetails = getIDdetails();
										authcontdetails();
										$("#myModal").removeClass("displaynone");
                                    }

                                    //$(this).dialog("close");
                                },
                                No: function () {
                                    $(this).dialog("close");
                                }
                            },
                            close: function (event, ui) {
                                $(this).remove();
                            }
                        });

                })
				function ValidateCustAge(){
					var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet")
					var DOB = conListApplet.GetBusComp().GetFieldValue("Birth Date");
					var bsRespCheck = SiebelApp.S_App.GetService("VF BS Process Manager")
					var psInputs = SiebelApp.S_App.NewPropertySet();
					psInputs.SetProperty("Service Name", "VHA Invite Contact Asset BS");
					psInputs.SetProperty("Method Name", "ValidateCustAge");
					psInputs.SetProperty("DOB", DOB);
					var Output = bsRespCheck.InvokeMethod("Run Process", psInputs);
					var ValidAge = Output.childArray[0].propArray.ValidAge;
					return ValidAge;
				}
                function buttonTrigger(ConRole, Type, ConRoleExpand) {
                    //var message = "Are you sure want to change this " + ConRole + " to " + ConRoleExpand;
                    var message = "Do you want to change this " + ConRole + " to a " + ConRoleExpand;
                    $('<div></div>').appendTo('body')
                    .html('<div><h6>' + message + '?</h6></div>')
                    .dialog({
                        modal: true,
                        title: '',
                        zIndex: 10000,
                        autoOpen: true,
                        width: 'auto',
                        resizable: false,
                        buttons: {
                            Yes: function () {
                                workflowcall(ConRole, Type);
                                $(this).dialog("close");
                            },
                            No: function () {
                                $(this).dialog("close");
                            }
                        },
                        close: function (event, ui) {
                            $(this).remove();
                        }
                    });
                }
                function workflowcall(ConRole, Type) {
                    var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
                    var Objectid = conListApplet.GetBusComp().GetParentBuscomp().GetFieldValue("Id");
                    var ConId = conListApplet.GetBusComp().GetFieldValue("Id");
                    var SE = conListApplet.GetBusComp().GetFieldValue("Email Address");
                    var PE = conListApplet.GetBusComp().GetParentBuscomp().GetFieldValue("CUT Email Address");
                    var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    var Outputs = SiebelApp.S_App.NewPropertySet()
                        Inputs.SetProperty("ProcessName", "VHA Contact Asset WF");
                    Inputs.SetProperty("Object Id", Objectid);
                    Inputs.SetProperty("ConId", ConId);
                    Inputs.SetProperty("ConRole", ConRole);
                    Inputs.SetProperty("Type", Type);
                    Inputs.SetProperty("SE", SE);
                    Inputs.SetProperty("PE", PE);
                    Outputs = ser.InvokeMethod("RunProcess", Inputs);
                }
				var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
                var ConId = conListApplet.GetBusComp().GetFieldValue("Id");
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                Input.SetProperty("ProcessName", "VHA Get Contact Org Process");
                Input.SetProperty("Type", "CON");
                Input.SetProperty("SrcId", ConId);
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                var OrgN = Outputs.childArray[0].propArray.OrgName;
                if (OrgN == "Kogan") {
                    $(this).addClass("displaynone");
                    $('[title="Contacts List Applet:Invite Contact"]').addClass('forcehide');
                    $('[title="Contacts List Applet:Remove Linkage"]').addClass('forcehide');
                    $('[title="Contacts List Applet:Refresh"]').addClass('forcehide');
                } else {

                    $('[title="Contacts List Applet:Invite Contact"]').removeClass('forcehide');
                    $('[title="Contacts List Applet:Remove Linkage"]').removeClass('forcehide');
                    $('[title="Contacts List Applet:Refresh"]').removeClass('forcehide');
                }
            }

            VHAChangeRoleLtdUserPR.prototype.BindData = function (bRefresh) {
                // BindData is called each time the data set changes.
                // This is where you'll bind that data to user interface elements you might have created in ShowUI
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAChangeRoleLtdUserPR.superclass.BindData.apply(this, arguments);
                // Add code here that should happen after default processing
            }

            VHAChangeRoleLtdUserPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHAChangeRoleLtdUserPR.superclass.BindEvents.apply(this, arguments);
                //mfa events
				  $(".vha-ret-popup-close-btn").on('click', function(){
						$("#myModal").addClass("displaynone");
						resetMFA();
				  }); 
				  $("#vha-cont-prof-nextbtn").on('click', function(){
							if(verifiedStep2 === "Y"){
								//$("#vha-ret-confirmCode").val("");
								$("#myModal").addClass("displaynone");								
								resetMFA();
								removelinkage();
							}
							else
								alert("Please authenticate customer before proceeding.");
								
					});	
					
					// step2 authentication start
					$("input[name=authMethod]").on("change", function(){
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
						//$('#vha-ret-driverlic-Id').val('');
						switch(this.value){
						  case 'idSighted':
						  //  $("#vha-idsight-send-otp-btn").show();
						  $("#vha-idsight-send-otp-btn").removeClass("displaynone");
							AuthmethodType = "idSighted";
							break;
						  case 'email':
							AuthmethodType = "email";
							if(EmailVerifyFlag_step2 === "Y"){
							  $("#vha-email-send-otp-btn").show();
							}
							else{
							  $("#valiadte-email").show();
							}
							break;
						  case 'phone':
							AuthmethodType = "phone";
							if(PhnVerifyFlag_step2 === "Y"){
							  $("#vha-phone-send-otp-btn").show();
							}
							else{
							  $("#valiadte-phone").show();
							}
							break;
						  case 'inApp':
							$("#vha-inapp-send-otp-btn").removeClass("displaynone");
							AuthmethodType = "inApp";
							break;

						}

					});
					
				    $("#vha-idsight-validateId-btn").on('click', function(){
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
					   $("#vha-inapp-checkbox").on('change', function(){
								 
								 if($(this).is(':checked')){
								   verifiedStep2 = "Y";
								 }
								 else{
								  verifiedStep2 = "N";
								 }
						});
						 $("#valiadte-email").on('click', function(){
							 $("#vha-step2-mail-unverified").text("Email sent");
								 var  data;
								 requestAnimationFrame(() => {
									setTimeout(() => {
										data = verifyEmailSms(stepAuthPbj);
										if(data.ErrCd === "0")
											 $("#vha-step2-mail-refresh").removeClass("displaynone");
										else
											alert(data.ErrMsg);
									}, 0);
								});
								 
								 
						});
						 
						$("#valiadte-phone").on('click', function(){
								$("#vha-step2-phone-unverified").text("SMS sent");							
								 var data;
								 requestAnimationFrame(() => {
									setTimeout(() => {
										data = verifyEmailSms(stepAuthPbj);
										 if(data.ErrCd === "0")
											 $("#vha-step2-phone-refresh").removeClass("displaynone");
										 else
											alert(data.ErrMsg);
										
									}, 0);
								});
								
						});
						$(".refreshicon").on('click', function(){	
								var getflags = getdetails();
								PhnVerifyFlag_step2 = getflags["Contact Number Validated"];
								EmailVerifyFlag_step2 = getflags["Email Address Validated"];
								 if (AuthmethodType === "phone"){
									 if (PhnVerifyFlag_step2 === 'Y'){
									 $("#vha-step2-phone-traingexclm").addClass("displaynone");
									 $("#vha-step2-phone-tickmark").removeClass("displaynone");
									 $(this).addClass("displaynone");
									 $("#valiadte-phone").hide();
									 $("#vha-phone-send-otp-btn").show();
									 $('#vha-step2-phone-unverified').text("Verified");
									 $("#vha-step2-phone-unverified").removeClass("displaynone");
									}
									else{
										 $("#vha-step2-phone-traingexclm").removeClass("displaynone");
										 $("#vha-step2-phone-tickmark").addClass("displaynone");
										 $('#vha-step2-phone-unverified').text("Unverified");
										$("#vha-step2-phone-unverified").removeClass("displaynone");
									}
								 }
								 if (AuthmethodType === "email"){
									 if (EmailVerifyFlag_step2 === 'Y'){
									 $("#vha-step2-mail-traingexclm").addClass("displaynone");
									 $("#vha-step2-mail-tickmark").removeClass("displaynone");
									 $(this).addClass("displaynone");
									 $("#valiadte-email").hide();
									 $("#vha-email-send-otp-btn").show();
									 $("#vha-step2-mail-unverified").text("Verified");
									 $("#vha-step2-mail-unverified").removeClass("displaynone");
									}
									else{
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
						$("#vha-email-send-otp-btn").on('click', function(){
							$(this).hide();
							//$("#email-status").text("Email sent").show();
							$("#vha-email-send-otp-parent").removeClass("displaynone");
							$('#vha-emailinput-Id').val('');
							$(".emailauthSuccess").addClass("displaynone");
							$(".emailauthFail").addClass("displaynone");
							var showotp;
							requestAnimationFrame(() => {
								setTimeout(() => {
									var response=SendOTP(stepAuthPbj);
									showotp = response.GetChildByType("ResultSet").propArray.OTP;
									//$("#vha-ret-confirmCode").val(showotp);

									OtpStep2 = showotp;
								}, 0);
							});
							//SendOTP(stepAuthPbj);
							setTimeout(function(){
							  $("#email-status").hide();
							  $("#vha-email-resend-otp-btn").show();
							},0);
						});
						
						$("#vha-phone-send-otp-btn").on('click', function(){
							$(this).hide();
							//$("#phone-status").text("SMS sent").show();
							//$('#vha-phoneinput-Id').val('');
							
							$("#vha-phone-send-otp-parent").removeClass("displaynone");
							$('#vha-phoneinput-Id').val('');
							 $(".phoneauthSuccess").addClass("displaynone");
							 $(".phoneauthFail").addClass("displaynone");
							var showotp;
							requestAnimationFrame(() => {
								setTimeout(() => {
									var response=SendOTP(stepAuthPbj);
									showotp = response.GetChildByType("ResultSet").propArray.OTP;
									//$("#vha-ret-confirmCode").val(showotp);

									OtpStep2 = showotp;
								}, 0);
							});
							//SendOTP(stepAuthPbj);
							setTimeout(function(){
							  $("#phone-status").hide();
							  $("#vha-phone-resend-otp-btn").show();
							 },0);
						});
						
						  $(".resend-otp").on('click', function(){
						   const id = $(this).attr('id');
					   //    const sendId = id.replace('resend', 'send');      
						   $(this).hide();
						   switch(AuthmethodType){
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
										var response=SendOTP(stepAuthPbj);
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
										var response=SendOTP(stepAuthPbj);
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
						  setTimeout(function(){
							$(".otp-status").hide();
							$(`#${id}`).show();
						 },0);
						   
					});
            }

            VHAChangeRoleLtdUserPR.prototype.EndLife = function () {
                // EndLife is where we perform any required cleanup.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHAChangeRoleLtdUserPR.superclass.EndLife.apply(this, arguments);
                // Add code here that should happen after default processing
            }
			function removelinkage() {
				var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
				var Objectid = conListApplet.GetBusComp().GetParentBuscomp().GetFieldValue("Id");
				var ConId = conListApplet.GetBusComp().GetFieldValue("Id");
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Outputs = SiebelApp.S_App.NewPropertySet()
				Inputs.SetProperty("ProcessName", "VHA InvCon DeLink Process");
				Inputs.SetProperty("Object Id", Objectid);
				Inputs.SetProperty("ConId", ConId);
				Inputs.SetProperty("Type", "Unlink");
				Outputs = ser.InvokeMethod("RunProcess", Inputs);
				$('button[data-display="Refresh"]').trigger("click");
			}
			// send otp
			function SendOTP(item){
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Input = SiebelApp.S_App.NewPropertySet();		
				Input.SetProperty("ProcessName", "VHA Generate OTP Process");
				Input.SetProperty("OrgName", item.OrgName);
				Input.SetProperty("ARII", item.ARII);
				Input.SetProperty("ContactId", item.ContactId);
				Input.SetProperty("AccountObjectId", item.AccountObjectId);			
				Input.SetProperty("AccId", item.AccountObjectId);
				
				if (AuthmethodType === "email"){
					Input.SetProperty("EmailAddr", item.EmailOTP);
					Input.SetProperty("EmailOTP", "ConEmailOTP");
				}
					
				else
					Input.SetProperty("MSISDN", item.MSISDN);
				
				var Outputs = ser.InvokeMethod("RunProcess", Input);	
				return Outputs;
			}
			// email or sms verify
		
			function verifyEmailSms(item){
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Input = SiebelApp.S_App.NewPropertySet();
				//var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
				Input.SetProperty("Object Id", item.ContactId);
				Input.SetProperty("sConId", item.ContactId);
				
				
					if (AuthmethodType === "email"){
					Input.SetProperty("sType", "Email");
					Input.SetProperty("sValue", item.EmailOTP );
					}
					if (AuthmethodType === "phone"){
						Input.SetProperty("sType", "SMS");
						Input.SetProperty("sValue", item.MSISDN);
					}
				Input.SetProperty("ProcessName", "VHA Digital Email SMS Verification Process");
				var Outputs = ser.InvokeMethod("RunProcess", Input);
				var datatemp = Outputs.childArray[0].propArray;
				return datatemp;
			}
			// call workflow for verifaction 
			function getdetails(){
				/*var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Input = SiebelApp.S_App.NewPropertySet();
				//var ObjectId = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA New Authenticate Popup Applet'].GetBusComp().GetRecordSet()[0].Id;
				var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
				var Objectid = conListApplet.GetBusComp().GetParentBuscomp().GetFieldValue("Id");
				var ConId = conListApplet.GetBusComp().GetFieldValue("Id");
				Input.SetProperty("Contact Id", ConId); 
				Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
				var Outputs = ser.InvokeMethod("RunProcess", Input); 
				var datatemp = Outputs.childArray[0].propArray;
				return datatemp; */
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Input = SiebelApp.S_App.NewPropertySet();
				//var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
				var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
				var Objectid = conListApplet.GetBusComp().GetParentBuscomp().GetFieldValue("Id");
				Input.SetProperty("Object Id", Objectid);
				Input.SetProperty("Type", "ContactDetails");
				Input.SetProperty("ProcessName", "VHA InvCon Get Details Process");
				var Outputs = ser.InvokeMethod("RunProcess", Input);
				var datatemp = Outputs.childArray[0].propArray;
				accntId = datatemp.AccConId;
				return datatemp;
			}
			function getIDdetails() {
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Input = SiebelApp.S_App.NewPropertySet();
				var conListApplet = SiebelApp.S_App.GetActiveView().GetApplet("Account Contact List Applet");
				//var Objectid = conListApplet.GetBusComp().GetParentBuscomp().GetFieldValue("Id");
				var ConId = conListApplet.GetBusComp().GetFieldValue("Id");
				Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
				Input.SetProperty("Contact Id", accntId);
				Input.SetProperty("FlowType", "IDdata");
				var Outputs = ser.InvokeMethod("RunProcess", Input);                
				var proparray = Outputs.childArray[0].propArray;
				return proparray;
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
			function authcontdetails(){
				
				const phoneNumber = authdetails.PhNum;
                const maskedNumber = phoneNumber.substring(0, 2) + "xxxxxx" + phoneNumber.substring(phoneNumber.length - 3);

                const email = authdetails.Email;
                const [username, domain] = email.split("@");
                const maskLength = username.length - 2;
                const maskedMiddle = "x".repeat(maskLength > 0 ? maskLength : 0);
                const maskedEmail = username.charAt(0) + maskedMiddle + username.charAt(username.length - 1) + "@" + domain;
				
				let maskedName = authdetails.FullName.replace(/(\b\w)(\w*)/g, (_, first, rest) => first + "x".repeat(rest.length));

				$("#vha-ret-authName").text(maskedName);
				$("#vha-ret-authDob").text(authdetails.DOB);
				$("#vha-ret-authEmailDisplay").text(maskedEmail);
				$("#vha-ret-authPhoneDisplay").text(maskedNumber);
				 if (IdsightDetails.IdType != undefined && IdsightDetails.IdType != "") {
					$('#idSighted').parent().css('pointer-events', 'auto');
					$('#idSighted').parent().css('color', '#002244');
					var idtype = IdsightDetails.IdType+" "+"****"+IdsightDetails.IdReferenceNumber.slice(-4);
					$("#mfa-step2-IdentryVal").text(idtype);
				} else {
					$('#idSighted').parent().css('pointer-events', 'none');
					$('#idSighted').parent().css('color', 'darkgray');
				}
				
				stepAuthPbj.ARII =authdetails.AccARII;
				stepAuthPbj.OrgName =authdetails.AccOrg;
				stepAuthPbj.ContactId =accntId;
				stepAuthPbj.AccountObjectId =authdetails["Object Id"];
				stepAuthPbj.MSISDN =authdetails.PhNum;
				stepAuthPbj.EmailOTP =authdetails.Email;
				PhnVerifyFlag_step2 = authdetails.PhNumFlg;
				EmailVerifyFlag_step2 = authdetails.EmailFlg;
				if (PhnVerifyFlag_step2 === 'Y'){
					 $("#vha-step2-phone-traingexclm").addClass("displaynone");
					 $("#vha-step2-phone-tickmark").removeClass("displaynone");
					 $('#vha-step2-phone-unverified').text("Verified");
					 $("#vha-step2-phone-unverified").removeClass("displaynone");
				}
				else{
					$("#vha-step2-phone-traingexclm").removeClass("displaynone");
					 $("#vha-step2-phone-tickmark").addClass("displaynone");
					 $('#vha-step2-phone-unverified').text("Unverified");
					 $("#vha-step2-phone-unverified").removeClass("displaynone");
				}
				if (EmailVerifyFlag_step2 === 'Y'){
					$("#vha-step2-mail-traingexclm").addClass("displaynone");
					 $("#vha-step2-mail-tickmark").removeClass("displaynone");
					 $("#vha-step2-mail-unverified").text("Verified");
					 $("#vha-step2-mail-unverified").removeClass("displaynone");
				}
				else{
					$("#vha-step2-mail-traingexclm").removeClass("displaynone");
					 $("#vha-step2-mail-tickmark").addClass("displaynone");
					 $("#vha-step2-mail-unverified").text("Unverified");
					 $("#vha-step2-mail-unverified").removeClass("displaynone");
				}
				
			}

            return VHAChangeRoleLtdUserPR;
        }
            ());
        return "SiebelAppFacade.VHAChangeRoleLtdUserPR";
    })
}
