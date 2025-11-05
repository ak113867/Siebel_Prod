// HARI YETURU Created FOR Invite Contact 14/07/2024
if (typeof(SiebelAppFacade.VHAInviteContactPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.VHAInviteContactPR");
    define("siebel/custom/VHAInviteContactPR", ["siebel/phyrenderer"],
     function () {
		var PhnVerifyFlag_step2;
		var EmailVerifyFlag_step2;
		var PhnVerifyFlag_step6;
		var EmailVerifyFlag_step6;
		var AuthmethodType;
		var IdsightDetails;
		var IdsightDetails_step6;
		var flowtype;
		var customerRecNotfound;
		var nomineprStatus = "";
		var nomineMfaStatus ="";
		var UserSelectedrecord;
		var limitedUserAll;
		var GlobalInputs = SiebelApp.S_App.NewPropertySet();
		var NominatorRole = SiebelApp.S_App.GetProfileAttr("VHA-INV-ACC-CON-ROLE");
		var Nominateusertype = "";
		var stepAuthPbj ={};
		var OtpStep2;
		var verifiedStep2;
		var oldflowtype= "";
		var backenter ="";
		var stepAuthPbj_step6 = {};
		var AuthmethodType_step6;
		var OtpStep6;
		var verifiedStep6;
		var functionStatus ={};
      SiebelAppFacade.VHAInviteContactPR = (function () {
   
       function VHAInviteContactPR(pm) {
        SiebelAppFacade.VHAInviteContactPR.superclass.constructor.apply(this, arguments);
       }
   
       SiebelJS.Extend(VHAInviteContactPR, SiebelAppFacade.PhysicalRenderer);
   
       VHAInviteContactPR.prototype.Init = function () {
        SiebelAppFacade.VHAInviteContactPR.superclass.Init.apply(this, arguments);
       }
   
       VHAInviteContactPR.prototype.ShowUI = function () {
        SiebelAppFacade.VHAInviteContactPR.superclass.ShowUI.apply(this, arguments);
		
		
		//loading icon
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
					</div>`;
					//$("body").append(loadingIconHtml);
					$('a[title="Invite Contact"]').append(loadingIconHtml);

		//var AppuserType = SiebelApp.S_App.GetProfileAttr("VHA User Type");
			const labelElement = document.querySelector("label[for='nominate-Decisionmaking-user-inp']");
			if (labelElement) {
			  labelElement.textContent = "Decision Maker";
			} else {
			  console.error("Label not found");
			}
			const labelAuthUser = document.querySelector("label[for='nominate-Authroised-user']");
			if (labelAuthUser) {
			  labelAuthUser.textContent = "Authorised Contact";
			} else {
			  console.error("Label not found");
			}
			
			$('.vha-img-invitecotact-step3 .vha-img-inviteconactbuttons').before('<div class="vha-img-nominee-checkbox vha-img-nominee-checkboxstep3 authorizedcontact-content"><input type="checkbox" id="vha-img-nominee-checkbx-step3" name="vha-img-nominee-checkboxstep3" value="checkbox"><p class = "vha-img-nominee-text-checkboxstep3"for="vha-img-nominee-checkboxstep3">I have explained to the nominator what the nominee will be able to do on their behalf based on the access level they have selected and the nominator has consented, and confirmed authorized user is 18 and above.</p></div>');
            var TypeofCust = SiebelApp.S_App.GetProfileAttr("VHA-ACC-SEG");
			if(TypeofCust == "Sole Trader" || TypeofCust == "Person")
				 $('.authorizedcontact-content p').text("I have explained to the nominator what the nominee will be able to do on their behalf based on the access level they have selected and the nominator has consented, and confirmed authorised user is 18 and above.");
			else
				$('.authorizedcontact-content p').text("I have explained to the nominator what the nominee will be able to do on their behalf based on the access level they have selected and the nominator has consented, and confirmed authorised user or decision maker is 18 and above.");

			 if(TheApplication().GetProfileAttr("VHA User Type") == 'Care'){
				 $('#idSighted,label[for="idSighted"]').addClass("displaynone");
				 $('#idSighted-step6,label[for="idSighted-step6"]').addClass("displaynone");
				 $('#inApp,label[for="inApp"]').addClass("displaynone");
				$('#inApp-step6,label[for="inApp-step6"]').addClass("displaynone");
			 }
			 else{
				 $('#idSighted,label[for="idSighted"]').removeClass("displaynone");
				 $('#idSighted-step6,label[for="idSighted-step6"]').removeClass("displaynone");
				 if(SiebelApp.S_App.GetProfileAttr('TPG Retail Access') === "Y"){
					  $('#inApp,label[for="inApp"]').removeClass("displaynone");
				      $('#inApp-step6,label[for="inApp-step6"]').removeClass("displaynone");
				 }
				 else{
					 $('#inApp,label[for="inApp"]').addClass("displaynone");
				     $('#inApp-step6,label[for="inApp-step6"]').addClass("displaynone");
				 }
				
			 }
			  $('#vha-phoneinput-Id').attr('autocomplete', 'off');
			  $('#vha-emailinput-Id').attr('autocomplete', 'off');
			  $('#vha-ret-driverlic-Id').attr('autocomplete', 'off');
			  $('#vha-phoneinput-Id-step6').attr('autocomplete', 'off');
			  $('#vha-emailinput-Id-step6').attr('autocomplete', 'off');
			  $('#vha-ret-driverlic-Id-step6').attr('autocomplete', 'off');

       }
   
       VHAInviteContactPR.prototype.BindData = function (bRefresh) {
        SiebelAppFacade.VHAInviteContactPR.superclass.BindData.apply(this, arguments);
       }
   
       VHAInviteContactPR.prototype.BindEvents = function () {
        SiebelAppFacade.VHAInviteContactPR.superclass.BindEvents.apply(this, arguments);
		
		//Button events 
		
		 $("input[name=vha-img-Inc-Naminate-pr]").on("change", function(){
			 nomineprStatus = $(this).val();
		  });
		   $("input[name=vha-img-Inc-Naminate-mfa]").on("change", function(){
			 nomineMfaStatus = $(this).val();
		  });
		 $("#Invite-Contact-nextbutton-step1").on("click", function(){
			 
		  if(nomineprStatus !== "" && nomineMfaStatus !==""){
			 GlobalInputs.SetProperty("NomPresent",nomineprStatus[0]);
			 GlobalInputs.SetProperty("NomrMFA",nomineMfaStatus[0]);
			 var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
			 GlobalInputs.SetProperty("Object Id", ObjectId);
			 
			 if(nomineprStatus === "No" && nomineMfaStatus === "Yes"){
				 flowtype = "flow1";
			 }
			 if(nomineprStatus === "No" && nomineMfaStatus === "No"){
				 flowtype = "flow2";
			 }
			 if(nomineprStatus === "Yes" && nomineMfaStatus === "Yes"){
				 flowtype = "flow3";
			 }
			 if(nomineprStatus === "Yes" && nomineMfaStatus === "No"){
				 flowtype = "flow4";
			 }
			 if (oldflowtype !== flowtype && backenter === "Y"){
				 resetUI("step1");
				 resetMFA();
				 GlobalInputs = SiebelApp.S_App.NewPropertySet();
				  GlobalInputs.SetProperty("NomPresent",nomineprStatus[0]);
				 GlobalInputs.SetProperty("NomrMFA",nomineMfaStatus[0]);
				 var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
				 GlobalInputs.SetProperty("Object Id", ObjectId);
				 
			 }
			 var TypeofCust = SiebelApp.S_App.GetProfileAttr("VHA-ACC-SEG");
			  switch(flowtype){
				   case 'flow1':
						$(".vha-img-invitecotact-step1").addClass("displaynone");
						$(".authorizedcontact-content").removeClass("displaynone");
						createLimitedUserTable();

						if(TypeofCust == "Sole Trader" || TypeofCust == "Person")
							$("#nominate-Decisionmaking-user").addClass("displaynone");
						else
							$("#nominate-Decisionmaking-user").removeClass("displaynone");
						
						$(".vha-img-invitecotact-step3").removeClass("displaynone");
				   break;
				   case 'flow2':
						$(".vha-img-invitecotact-step1").addClass("displaynone");
						$(".authorizedcontact-content").removeClass("displaynone");
						InviteConAuthen();
						$(".vha-img-invitecotact-step2").removeClass("displaynone");
				   break;
				   case 'flow3':
						$(".vha-img-invitecotact-step1").addClass("displaynone");
						$(".authorizedcontact-content").addClass("displaynone");
						createLimitedUserTable();
						
						if(TypeofCust == "Sole Trader" || TypeofCust == "Person")
							$("#nominate-Decisionmaking-user").addClass("displaynone");
						else
							$("#nominate-Decisionmaking-user").removeClass("displaynone");
						
						$(".vha-img-invitecotact-step3").removeClass("displaynone");
				   break;
				   case 'flow4':
						$(".vha-img-invitecotact-step1").addClass("displaynone");
						$(".authorizedcontact-content").addClass("displaynone");
						InviteConAuthen();
						$(".vha-img-invitecotact-step2").removeClass("displaynone");
				   break;
			  }     
			}	
			else{
				alert("Please make a selection");
			}
        });
		
		 $("#Invite-Contact-nextbutton-step2").on("click", function(){
			  switch(flowtype){
				   case 'flow1':
				   break;
				   case 'flow2':
				         if(verifiedStep2 === "Y"){
							 var TypeofCust = SiebelApp.S_App.GetProfileAttr("VHA-ACC-SEG");
							 $(".vha-img-invitecotact-step2").addClass("displaynone");		  
							 createLimitedUserTable();   
							 $(".vha-img-invitecotact-step3").removeClass("displaynone"); 
								if(TypeofCust == "Sole Trader" || TypeofCust == "Person")
								 {
									$("#nominate-Decisionmaking-user").addClass("displaynone");
								 }
								else
								{
									$("#nominate-Decisionmaking-user").removeClass("displaynone");
								}
						 }
						 else
							 alert("Please authenticate customer before proceeding");
				   break;
				   case 'flow3':
				   break;
				   case 'flow4':
						if(verifiedStep2 === "Y"){
							var TypeofCust = SiebelApp.S_App.GetProfileAttr("VHA-ACC-SEG");
							 $(".vha-img-invitecotact-step2").addClass("displaynone");		  
							 createLimitedUserTable();   
							 $(".vha-img-invitecotact-step3").removeClass("displaynone"); 
							 if(TypeofCust == "Sole Trader" || TypeofCust == "Person")
								 {
									$("#nominate-Decisionmaking-user").addClass("displaynone");
								 }
								else
								{
									$("#nominate-Decisionmaking-user").removeClass("displaynone");
								}
						 }
						 else
							 alert("Please authenticate customer before proceeding");
				   break;
			  }
			 
       
        });
		$("#Invite-Contact-backbutton-step2").on("click", function(){
			oldflowtype = flowtype;
			backenter ="Y";
			 switch(flowtype){
				   case 'flow1':
				   break;
				   case 'flow2':
						 $(".vha-img-invitecotact-step2").addClass("displaynone");		  
						 $(".vha-img-invitecotact-step1").removeClass("displaynone");
				   break;
				   case 'flow3':
				   break;
				   case 'flow4':
						 $(".vha-img-invitecotact-step2").addClass("displaynone");		  
						 $(".vha-img-invitecotact-step1").removeClass("displaynone");
				   break;
			  }
        
        });
		
		 $('#step3-limiteduser-selectall').on('change', function() {
			var isChecked = $(this).is(':checked');
			if(isChecked){
				$('.vha-table-step3-limiteduser .vha-step3-row-check').prop('checked', true);
				limitedUserAll = "Yes";
			}
			else{
				$('.vha-table-step3-limiteduser .vha-step3-row-check').prop('checked', false);
				limitedUserAll = "No";
			}
				

		 });
		 $("#Invite-Contact-nextbutton-step3").on("click", function(){
			 var ageConsent = $("input[name=vha-img-nominee-checkboxstep3]").prop('checked');
			 Nominateusertype = $("input[name=nominating-user-type]:checked").val();
			if (Nominateusertype !== "" && Nominateusertype !== undefined && Nominateusertype !== "") {
				
				if (((Nominateusertype == "AuthroisedUser" || Nominateusertype == "DecesionMaker") && ageConsent == true) || (Nominateusertype == "LimitedUser") || (flowtype == "flow3" || flowtype == "flow4")) {
					
					 var limiteduserRecSel = "";
					 if(GlobalInputs.propArray.NomRole === "Limited User"){
							
							var selectedMsisdns = [];
							$.each($(".vha-table-step3-limiteduser tbody tr"), function() {
								var row = $(this);
								var isChecked = row.find('.vha-step3-row-check').is(':checked');
								if (isChecked) {
									var MSISDN = row.find('td').eq(1).text();
									selectedMsisdns.push(MSISDN);
								}
							});
							limiteduserRecSel= selectedMsisdns.join(",");
							GlobalInputs.SetProperty("MSISDNLst",selectedMsisdns.join(","));
					 }
					 else
						 GlobalInputs.SetProperty("MSISDNLst","ALL");
						 
					  
					
					 switch(flowtype){
						   case 'flow1':
								if(GlobalInputs.propArray.NomRole === "Limited User" && limiteduserRecSel === "" ){
									alert("Please select atleast one service for Limited User");
								}
								else{
								 $(".vha-img-invitecotact-step3").addClass("displaynone");
								 $(".vha-img-invitecotact-step4").removeClass("displaynone");
								}
						   break;
						   case 'flow2':
								if(GlobalInputs.propArray.NomRole === "Limited User" && limiteduserRecSel === "" ){
									alert("Please select atleast one service for Limited User");
								}
								else{
								 $(".vha-img-invitecotact-step3").addClass("displaynone");
								 $(".vha-img-invitecotact-step4").removeClass("displaynone");
								}
						   break;
						   case 'flow3':
								if(GlobalInputs.propArray.NomRole === "Limited User" && limiteduserRecSel === "" ){
									alert("Please select atleast one service for Limited User");
								}
								else{
								 $(".vha-img-invitecotact-step3").addClass("displaynone");
									//var AppuserType = SiebelApp.S_App.GetProfileAttr("VHA User Type");
								   if(TheApplication().GetProfileAttr("VHA User Type") == 'Care'){		 
									 $(".vha-fil-CareUser").addClass("displaynone");
									$(".vha-fil-retailUser").removeClass("displaynone");
								   }
								   else{
									$(".vha-fil-CareUser").addClass("displaynone");
									$(".vha-fil-retailUser").removeClass("displaynone");
									 
								   }
								 $(".vha-img-invitecotact-step5").removeClass("displaynone");
								}
						   break;
						   case 'flow4':
								if(GlobalInputs.propArray.NomRole === "LimitedUser" && limiteduserRecSel === "" ){
									alert("Please select atleast one service for Limited User");
								}
								else{
								 $(".vha-img-invitecotact-step3").addClass("displaynone");
									//var AppuserType = SiebelApp.S_App.GetProfileAttr("VHA User Type");
								  if(TheApplication().GetProfileAttr("VHA User Type") == 'Care'){		 
									 $(".vha-fil-CareUser").addClass("displaynone");
									 $(".vha-fil-retailUser").removeClass("displaynone");
								   }
								   else{
									  $(".vha-fil-CareUser").addClass("displaynone");
									  $(".vha-fil-retailUser").removeClass("displaynone");
								   }
								 $(".vha-img-invitecotact-step5").removeClass("displaynone");
								}
						   break;
					  }
				}
				else
					alert("Please select consented check box.");
			}
			else
				alert("Please select the user role for nomination");
        });
		$("#Invite-Contact-backbutton-step3").on("click", function(){
			oldflowtype = flowtype;
			backenter ="Y";
			 switch(flowtype){
				   case 'flow1':
						 $(".vha-img-invitecotact-step3").addClass("displaynone");
						 $(".vha-img-invitecotact-step1").removeClass("displaynone");
				   break;
				   case 'flow2':
						 $(".vha-img-invitecotact-step3").addClass("displaynone");
						 $(".vha-img-invitecotact-step2").removeClass("displaynone");
				   break;
				   case 'flow3':
						 $(".vha-img-invitecotact-step3").addClass("displaynone");
						 $(".vha-img-invitecotact-step1").removeClass("displaynone");
				   break;
				   case 'flow4':
						$(".vha-img-invitecotact-step3").addClass("displaynone");
						 $(".vha-img-invitecotact-step2").removeClass("displaynone");
				   break;
			  }
          
        });
		var isChecked;
		$('#vha-img-nominee-checkbx-step4').on('change', function() {
				isChecked = $(this).prop('checked');
		});
		 $("#Invite-Contact-nextbutton-step4").on("click", function(){
				var fname = $("#vha-img-nominee-firstname").val();
				var email = $("#vha-img-nominee-email").val();
				if(fname !== "" && email !== "" && isChecked === true ){
					GlobalInputs.SetProperty("NomFname", fname);
					GlobalInputs.SetProperty("NomMail", email);
					
					var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
					var Input = SiebelApp.S_App.NewPropertySet();
					var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
					GlobalInputs.SetProperty("Type", "SubmitDetails");
					GlobalInputs.SetProperty("ProcessName", "VHA InvCon Get Details Process");
					GlobalInputs.SetProperty("DupChk","N");
					var Outputs = ser.InvokeMethod("RunProcess", GlobalInputs);
					if(Outputs.GetChildByType("ResultSet")){
						console.log("DupChk is N");
						/*if(Outputs.GetChildByType("ResultSet").propArray.DupErr === "Y")
							//alert("Please note that the same record with identical value exists in the system already.");
						alert("Please note that the same email address as digital user name exists in the system already. Please provide alternate email address.");*/
					}
					else{
						resetUI("step4");
						flowtype = "";
						nomineprStatus ="";
						nomineMfaStatus = "";
					}
						
				}
				else{
					alert("Please enter all the mandatory fields before 'Send Invite'.");
				}
				
        });
		
		$("#Invite-Contact-backbutton-step4").on("click", function(){
			
			switch(flowtype){
				   case 'flow1':
					     $(".vha-img-invitecotact-step4").addClass("displaynone");
						 $(".vha-img-invitecotact-step3").removeClass("displaynone");
				   break;
				   case 'flow2':
						 $(".vha-img-invitecotact-step4").addClass("displaynone");
						 $(".vha-img-invitecotact-step3").removeClass("displaynone");
				   break;
				   case 'flow3':
				   break;
				   case 'flow4':
				   break;
			  }
         
        });
		$(".vha-img-profile-info-go-button").on("click", function(){
			 customerRecNotfound="";
			 var inputval = $('.vha-img-profile-info-text').val();
			 var DOB = $('.vha-img-profile-info-text-date').val();
			 if(inputval !== "" && DOB !== "")
				 createNomineTable();
			 else
				 alert("Please enter the search criteria.");
			 
             
        });
		$("#Invite-Contact-nextbutton-step5").on("click", function(){
			
			switch(flowtype){
				   case 'flow1':
				   break;
				   case 'flow2':
				   break;
				   case 'flow3':
						 if(customerRecNotfound === "Yes"){
							var marketing_lov = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Name]= 'InvConMarketingPref' AND [List Of Values.Active]='Y'", {
								All: "true",
							})[0].Value;
							if (marketing_lov === "Y"){
								$(".vha-img-contact-marketing").removeClass("displaynone");
								$(".vha-img-contact-channel").removeClass("displaynone");
								$(".vha-img-datause").removeClass("displaynone");
							}
							else{
								$(".vha-img-contact-marketing").addClass("displaynone");
								$(".vha-img-contact-channel").addClass("displaynone");
								$(".vha-img-datause").addClass("displaynone");
							}

							 $(".vha-img-invitecotact-step5").addClass("displaynone");
							 $(".vha-img-invitecotact-step7").removeClass("displaynone");
						 }
						 else{
							 if (UserSelectedrecord === "Yes"){
								 $(".vha-img-invitecotact-step5").addClass("displaynone");
								 $(".vha-img-invitecotact-step6").removeClass("displaynone");
							 } 
							 else
								 alert("Please select a contact profile");
						 }
							 
				   break;
				   case 'flow4':
						 
						 if(customerRecNotfound === "Yes"){
							 var marketing_lov = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Name]= 'InvConMarketingPref' AND [List Of Values.Active]='Y'", {
								All: "true",
							})[0].Value;
							if (marketing_lov === "Y"){
								$(".vha-img-contact-marketing").removeClass("displaynone");
								$(".vha-img-contact-channel").removeClass("displaynone");
								$(".vha-img-datause").removeClass("displaynone");
							}
							else{
								$(".vha-img-contact-marketing").addClass("displaynone");
								$(".vha-img-contact-channel").addClass("displaynone");
								$(".vha-img-datause").addClass("displaynone");
							}
							 $(".vha-img-invitecotact-step5").addClass("displaynone");
							 $(".vha-img-invitecotact-step7").removeClass("displaynone");
						 }
						 else{
							 if (UserSelectedrecord === "Yes"){
								 $(".vha-img-invitecotact-step5").addClass("displaynone");
								 $(".vha-img-invitecotact-step6").removeClass("displaynone");
							 } 
							 else
								 alert("Please select a contact profile");
						 }
				   break;
			  }
         
        });
		$("#Invite-Contact-backbutton-step5").on("click", function(){
			switch(flowtype){
				   case 'flow1':
				   break;
				   case 'flow2':
				   break;
				   case 'flow3':
						 $(".vha-img-invitecotact-step5").addClass("displaynone");
						 $(".vha-img-invitecotact-step3").removeClass("displaynone");
				   break;
				   case 'flow4':
						$(".vha-img-invitecotact-step5").addClass("displaynone");
						 $(".vha-img-invitecotact-step3").removeClass("displaynone");
				   break;
			  }
      
        });
		$("#Invite-Contact-nextbutton-step6").on("click", function(){
			if(verifiedStep6 === "Y"){
				
				 var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				 GlobalInputs.SetProperty("Type", "SubmitDetails");
				 GlobalInputs.SetProperty("NomDoB", $("#vha-ret-authDob-step6").text().trim());
				 GlobalInputs.SetProperty("ProcessName", "VHA InvCon Get Details Process");
				 var Outputs = ser.InvokeMethod("RunProcess", GlobalInputs); 
				 var AgeErrMsg = Outputs.childArray[0].childArray[0].propArray.ErrMsg;
				 if (AgeErrMsg == null || AgeErrMsg == "" || AgeErrMsg == undefined )
				 {
				 resetUI("step6");
				 flowtype = "";
				nomineprStatus ="";
				nomineMfaStatus = "";
				 }
				 else
				 {
					console.log(AgeErrMsg);
				 }
				 
			}
			else
				alert("Please authenticate customer before proceeding.");
			
        });
		$("#Invite-Contact-backbutton-step6").on("click", function(){
			 switch(flowtype){
				   case 'flow1':
				   break;
				   case 'flow2':
				   break;
				   case 'flow3':
						 $(".vha-img-invitecotact-step6").addClass("displaynone");
						 $(".vha-img-invitecotact-step5").removeClass("displaynone");
				   break;
				   case 'flow4':
						 $(".vha-img-invitecotact-step6").addClass("displaynone");
						 $(".vha-img-invitecotact-step5").removeClass("displaynone");
				   break;
			  }

        });
		
		// step5 plus button open form
		$(".vha-plus-symbol").on("click", function () {
			var marketing_lov = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Name]= 'InvConMarketingPref' AND [List Of Values.Active]='Y'", {
				All: "true",
			})[0].Value;
			if (marketing_lov === "Y") {
				$(".vha-img-contact-marketing").removeClass("displaynone");
				$(".vha-img-contact-channel").removeClass("displaynone");
				$(".vha-img-datause").removeClass("displaynone");
			} else {
				$(".vha-img-contact-marketing").addClass("displaynone");
				$(".vha-img-contact-channel").addClass("displaynone");
				$(".vha-img-datause").addClass("displaynone");
			}
			$(".vha-img-invitecotact-step5").addClass("displaynone");
			$(".vha-img-invitecotact-step7").removeClass("displaynone");
		});

		// step 7 check boxs
		var oneappweb ="N";
		var Chckemail ="N";
		var smsmms ="N";
		var phoneotm ="N";
		var postdm ="N";
		var loyally ="N";
		var research ="N";
		var productoffers ="N";
		var newsletter ="N";
		var targetAdver ="N";
		 $("#OutinAll-step7").on("click", function(){
				$('.checkbox-invc').prop('checked', false);
				 oneappweb =  "N" ;
				 Chckemail =  "N" ;
				 smsmms =  "N" ;
				 phoneotm = "N" ;
				 postdm =  "N" ;
				 loyally =  "N" ;
				 research =  "N" ;
				 productoffers =  "N" ;
				 newsletter =  "N" ;
				 targetAdver = "N" ;
		 });
		 $("#AllinAll-step7").on("click", function(){
				$('.checkbox-invc').prop('checked', true);
				 oneappweb =   "Y" ;
				 Chckemail =  "Y" ;
				 smsmms =  "Y" ;
				 phoneotm = "Y" ;
				 postdm =  "Y" ;
				 loyally =  "Y" ;
				 research =  "Y" ;
				 productoffers =  "Y" ;
				 newsletter =  "Y" ;
				 targetAdver =  "Y" ;
		 });
		
		 $("input[name=checkbox-invc]").on("change", function(){
				// var val = $(this).val();
				  switch(this.value){
					   case 'oneappweb':
							oneappweb = $(this).is(':checked') ? "Y" : "N";
					   break;
					   case 'email':
						    Chckemail = $(this).is(':checked') ? "Y" : "N";
					   break;
					   case 'smsmms':
							smsmms = $(this).is(':checked') ? "Y" : "N";
					   break;
					   case 'phoneotm':
							phoneotm = $(this).is(':checked') ? "Y" : "N";
					   break;
					   case 'postdm':
							postdm = $(this).is(':checked') ? "Y" : "N";
					   break;
					   case 'loyally':
							loyally = $(this).is(':checked') ? "Y" : "N";
					   break;
					   case 'research':
							research = $(this).is(':checked') ? "Y" : "N";
					   break;
					   case 'productoffers':
							productoffers = $(this).is(':checked') ? "Y" : "N";
					   break;
					   case 'newsletter':
							newsletter = $(this).is(':checked') ? "Y" : "N";
					   break;
					   case 'targetAdver':
							targetAdver = $(this).is(':checked') ? "Y" : "N";
					   break;
					  
				  }
		});
		$("#Invite-Contact-nextbutton-step7").on("click", function(){
			
			var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
			var FirstName = $('.FirstName-step7').val();
			var DOB = $('.DOB-step7').val();
			var MiddeleName = $('.MiddeleName-step7').val();
			var PhoneNo = $('.PhoneNo-step7').val();
			var LastName = $('.LastName-step7').val();
			var Email = $('.Email-step7').val();
			
			if(FirstName != "" && DOB != "" && PhoneNo != "" && LastName != "" && Email != ""){
			  if(PhoneNo.length === 11 ){
				GlobalInputs.SetProperty("NomFname", FirstName);
				GlobalInputs.SetProperty("NomLname", LastName);
				GlobalInputs.SetProperty("NomMname", MiddeleName);
				var dobparts = DOB.split('-');
				var formattedDob ="";
				if (dobparts.length === 3){
					var year = dobparts[0];
					var month = dobparts[1];
					var day = dobparts[2];
					//formattedDob = day+"/"+month+"/"+year;
					formattedDob = month+"/"+day+"/"+year;
				}
				GlobalInputs.SetProperty("NomDoB", formattedDob);
				GlobalInputs.SetProperty("NomPh", PhoneNo );
				GlobalInputs.SetProperty("NomMail", Email);
				
				GlobalInputs.SetProperty("MpMail", Chckemail);
				GlobalInputs.SetProperty("MpSMS/MMS",smsmms );
				GlobalInputs.SetProperty("MpPhone",phoneotm );
				GlobalInputs.SetProperty("MpOneApp", oneappweb);
				GlobalInputs.SetProperty("MpPost", postdm);
				
				GlobalInputs.SetProperty("CPProdSO",productoffers );
				GlobalInputs.SetProperty("CPNewsLet", newsletter);
				GlobalInputs.SetProperty("CPResSur",research );
				GlobalInputs.SetProperty("CPLoyalty",loyally );
				
				GlobalInputs.SetProperty("DataTargetAdv", targetAdver);
				
				GlobalInputs.SetProperty("Type", "SubmitDetails");
				GlobalInputs.SetProperty("Object Id", ObjectId);
				GlobalInputs.SetProperty("ProcessName", "VHA InvCon Get Details Process");
				GlobalInputs.SetProperty("DupChk", "Y");
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Outputs = ser.InvokeMethod("RunProcess", GlobalInputs);
				if(Outputs.GetChildByType("ResultSet")){
						if(Outputs.GetChildByType("ResultSet").propArray.DupErr === "Y")
						{
										var message = "Email is already in use as a Digital username in Vodafone. If you keep this email, customer won’t be able to self-serve in OneApp. You can still proceed or provide a different email.";
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
														var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
														var FirstName = $('.FirstName-step7').val();
														var DOB = $('.DOB-step7').val();
														var MiddeleName = $('.MiddeleName-step7').val();
														var PhoneNo = $('.PhoneNo-step7').val();
														var LastName = $('.LastName-step7').val();
														var Email = $('.Email-step7').val();

														if(FirstName != "" && DOB != "" && PhoneNo != "" && LastName != "" && Email != "")
														{
															
																	GlobalInputs.SetProperty("NomFname", FirstName);
																	GlobalInputs.SetProperty("NomLname", LastName);
																	GlobalInputs.SetProperty("NomMname", MiddeleName);
																	var dobparts = DOB.split('-');
																	var formattedDob ="";
																	if (dobparts.length === 3){
																	var year = dobparts[0];
																	var month = dobparts[1];
																	var day = dobparts[2];
																	formattedDob = day+"/"+month+"/"+year;
																	}
																	GlobalInputs.SetProperty("NomDoB", formattedDob);
																	GlobalInputs.SetProperty("NomPh", PhoneNo );
																	GlobalInputs.SetProperty("NomMail", Email);

																	GlobalInputs.SetProperty("MpMail", Chckemail);
																	GlobalInputs.SetProperty("MpSMS/MMS",smsmms );
																	GlobalInputs.SetProperty("MpPhone",phoneotm );
																	GlobalInputs.SetProperty("MpOneApp", oneappweb);
																	GlobalInputs.SetProperty("MpPost", postdm);

																	GlobalInputs.SetProperty("CPProdSO",productoffers );
																	GlobalInputs.SetProperty("CPNewsLet", newsletter);
																	GlobalInputs.SetProperty("CPResSur",research );
																	GlobalInputs.SetProperty("CPLoyalty",loyally );

																	GlobalInputs.SetProperty("DataTargetAdv", targetAdver);

																	GlobalInputs.SetProperty("Type", "SubmitDetails");
																	GlobalInputs.SetProperty("Object Id", ObjectId);
																	GlobalInputs.SetProperty("ProcessName", "VHA InvCon Get Details Process");
																	GlobalInputs.SetProperty("DupChk", "N");
																	var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
																	var Outputs = ser.InvokeMethod("RunProcess", GlobalInputs);
														}
														else
														{
															alert("Please enter all the mandatory fields to Submit.");
														}
													
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
				}
				else{
					var AgeErrMsg = Outputs.childArray[0].childArray[0].propArray.ErrMsg;
						if (AgeErrMsg == null || AgeErrMsg == "" || AgeErrMsg == undefined )
						 {
						 resetUI("step7");
						 flowtype = "";
						nomineprStatus ="";
						nomineMfaStatus = "";
						 }
						 else
						 {
							 console.log(AgeErrMsg);
						 }
				}
					
			   }
			   else
				   alert("Contact Number  must be 11 characters.");
			}
			else
				alert("Please enter all the mandatory fields to Submit.");
        });
		$("#Invite-Contact-backbutton-step7").on("click", function(){
			 switch(flowtype){
				   case 'flow1':
				   break;
				   case 'flow2':
				   break;
				   case 'flow3':
						 $(".vha-img-invitecotact-step7").addClass("displaynone");
						 $(".vha-img-invitecotact-step5").removeClass("displaynone");
				   break;
				   case 'flow4':
						 $(".vha-img-invitecotact-step7").addClass("displaynone");
						 $(".vha-img-invitecotact-step5").removeClass("displaynone");
				   break;
			  }
        
        });
		
		//cancel flow
		$(".Invite-Contact-cancelbutton-step").on("click", function(){
           const loadingIcon = $("#loadingIcon");
		   loadingIcon.show(); 
		   var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Input = SiebelApp.S_App.NewPropertySet();
			var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
			Input.SetProperty("Object Id", ObjectId);
			Input.SetProperty("Type", "AccView");
			Input.SetProperty("ProcessName", "VHA InvCon Get Details Process");
			var Outputs = ser.InvokeMethod("RunProcess", Input);
			resetUI("cancel");
			flowtype = "";
			nomineprStatus ="";
			nomineMfaStatus = "";
        });
		
		 $("input[name=nominating-user-type]").on("change", function(){
			  switch(this.value){
				   case 'DecesionMaker':
						$('.vha-img-decs-aces-sp').html('Providing <strong>full access</strong> to the following services.');
				        Nominateusertype = "DecesionMaker";
						GlobalInputs.SetProperty("NomRole","Decision Maker");
						$(".vha-table-step3-limiteduser").addClass("displaynone");
						$(".vha-ret-table-authen").removeClass("displaynone");

                   break;
				   case 'AuthroisedUser':
						$('.vha-img-decs-aces-sp').html('Providing <strong>full access</strong> to the following services.');
						Nominateusertype = "AuthroisedUser";
						GlobalInputs.SetProperty("NomRole","Authorised Contact");
						$(".vha-table-step3-limiteduser").addClass("displaynone");
						$(".vha-ret-table-authen").removeClass("displaynone");

                   break;
				   case 'LimitedUser':
						$('.vha-img-decs-aces-sp').html('Select the services to provide limited access.');
						Nominateusertype = "LimitedUser";
						GlobalInputs.SetProperty("NomRole","Limited User");
						$(".vha-ret-table-authen").addClass("displaynone");
						$(".vha-table-step3-limiteduser").removeClass("displaynone");
						
						
                   break;
			  }
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
				  $("#vha-step2-mail-unverified").text("Verified");
				  $("#vha-step2-mail-unverified").removeClass("displaynone");
				  $("#vha-step2-mail-traingexclm").addClass("displaynone");
				  $("#vha-step2-mail-tickmark").removeClass("displaynone"); 
                }
                else{
                  $("#valiadte-email").show();
				  $("#vha-step2-mail-unverified").text("Unverified");
				  $("#vha-step2-mail-unverified").removeClass("displaynone");
				  $("#vha-step2-mail-traingexclm").removeClass("displaynone");
				  $("#vha-step2-mail-tickmark").addClass("displaynone"); 
                }
                break;
              case 'phone':
                AuthmethodType = "phone";
                if(PhnVerifyFlag_step2 === "Y"){
                  $("#vha-phone-send-otp-btn").show();
				  $('#vha-step2-phone-unverified').text("Verified");
				  $("#vha-step2-phone-unverified").removeClass("displaynone");
				  $("#vha-step2-phone-traingexclm").addClass("displaynone");
				  $("#vha-step2-phone-tickmark").removeClass("displaynone");
                }
                else{
                  $("#valiadte-phone").show();
				  $('#vha-step2-phone-unverified').text("Unverified");
				  $("#vha-step2-phone-unverified").removeClass("displaynone");
				  $("#vha-step2-phone-traingexclm").removeClass("displaynone");
				  $("#vha-step2-phone-tickmark").addClass("displaynone");
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
						verifiedStep2 = 'Y';
					 }
					 else{
					   verifiedStep2 = 'N';
					 }
		    });
		     $("#valiadte-email").on('click', function(){
					 $("#vha-step2-mail-unverified").text("Email sent");
					
					 var  data;
					 requestAnimationFrame(() => {
						setTimeout(() => {
							data = verifyEmailSms(stepAuthPbj,"step2");
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
							data = verifyEmailSms(stepAuthPbj,"step2");
							 if(data.ErrCd === "0")
								 $("#vha-step2-phone-refresh").removeClass("displaynone");
							 else
								alert(data.ErrMsg);
							
						}, 0);
					});
					 
		     });
			 // refresh step2 post Verification
			 $(".refreshicon").on('click', function(){
					InviteConAuthen();
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
			/* $("#vha-ret-validate-form-btn").on('click', function(){
				 if(OtpStep2 != "") {
					 var userotp = $("#vha-ret-confirmCode").val();
					 if ( userotp === OtpStep2){
						 verifiedStep2 = "Y";
						 alert("OTP is verified.");
					 }
					 else{
						 verifiedStep2 = "N";
						 alert("Please enter correct OTP to proceed further.");
					 }
						 
				 }
				  
			 });	*/
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
						var response=SendOTP(stepAuthPbj,"step2");
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
				 $("#vha-phone-send-otp-parent").removeClass("displaynone");
				$('#vha-phoneinput-Id').val('');
				 $(".phoneauthSuccess").addClass("displaynone");
				 $(".phoneauthFail").addClass("displaynone");
				var showotp;
				requestAnimationFrame(() => {
					setTimeout(() => {
						var response=SendOTP(stepAuthPbj,"step2");
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
                   //  $("#email-status").text("Email sent").show();
					 var showotp;
					  $('#vha-emailinput-Id').val('');
						$(".emailauthSuccess").addClass("displaynone");
						$(".emailauthFail").addClass("displaynone");
					requestAnimationFrame(() => {
						setTimeout(() => {
							var response=SendOTP(stepAuthPbj,"step2");
							showotp = response.GetChildByType("ResultSet").propArray.OTP;
							//$("#vha-ret-confirmCode").val(showotp);

							OtpStep2 = showotp;
						}, 0);
					});
					 
                  break;
                case 'phone':
                  //   $("#phone-status").text("SMS sent").show();
					 var showotp;
					 $('#vha-phoneinput-Id').val('');
					 $(".phoneauthSuccess").addClass("displaynone");
					 $(".phoneauthFail").addClass("displaynone");
					requestAnimationFrame(() => {
						setTimeout(() => {
							var response=SendOTP(stepAuthPbj,"step2");
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
		 
		 // step2 authentication end
		 
		 // step6 authentication start
		$("input[name=authMethod-step6]").on("change", function(){
            $(".send-otp-step6").hide();
            $(".resend-otp-step6").hide();
            $(".otp-status-step6").hide();
            $(".validated-status-step6").hide();
            $("#vha-idsight-send-otp-btn-step6").addClass("displaynone");
            $("#vha-inapp-send-otp-btn-step6").addClass("displaynone");
			$("#vha-email-send-otp-parent-step6").addClass("displaynone");
            $("#vha-phone-send-otp-parent-step6").addClass("displaynone");
           // $(".vha-ret-validate-form-step6").addClass("displaynone");
           // $("#vha-ret-validate-form-btn-step6").addClass("displaynone");
			$("#vha-ret-confirmCode-step6").val("");
			$(".refreshicon-step6").addClass("displaynone");
            switch(this.value){
              case 'idSighted':
              //  $("#vha-idsight-send-otp-btn").show();
              $("#vha-idsight-send-otp-btn-step6").removeClass("displaynone");
                AuthmethodType_step6 = "idSighted";
                break;
              case 'email':
                AuthmethodType_step6 = "email";
                if(EmailVerifyFlag_step6 === "Y"){
                  $("#vha-email-send-otp-btn-step6").show();
				  $("#vha-step6-mail-unverified").text("Verified");
				  $("#vha-step6-mail-unverified").removeClass("displaynone");
				  $("#vha-step6-mail-traingexclm").addClass("displaynone");
				  $("#vha-step6-mail-tickmark").removeClass("displaynone"); 
                }
                else{
                  $("#valiadte-email-step6").show();
				  $("#vha-step6-mail-unverified").text("Unverified");
				  $("#vha-step6-mail-unverified").removeClass("displaynone");
				  $("#vha-step6-mail-traingexclm").removeClass("displaynone");
				$("#vha-step6-mail-tickmark").addClass("displaynone"); 
				  
                }
                break;
              case 'phone':
                AuthmethodType_step6 = "phone";
                if(PhnVerifyFlag_step6 === "Y"){
                  $("#vha-phone-send-otp-btn-step6").show();
				  $('#vha-step6-phone-unverified').text("Verified");
				  $("#vha-step6-phone-unverified").removeClass("displaynone");
				  $("#vha-step6-phone-traingexclm").addClass("displaynone");
				  $("#vha-step6-phone-tickmark").removeClass("displaynone");
                }
                else{
                  $("#valiadte-phone-step6").show();
				  $('#vha-step6-phone-unverified').text("Unverified");
				  $("#vha-step6-phone-unverified").removeClass("displaynone");
				  $("#vha-step6-phone-traingexclm").removeClass("displaynone");
				  $("#vha-step6-phone-tickmark").addClass("displaynone");
                }
                break;
              case 'inApp':
                $("#vha-inapp-send-otp-btn-step6").removeClass("displaynone");
                AuthmethodType_step6 = "inApp";
                break;

            }

           });
		
		   $("#vha-idsight-validateId-btn-step6").on('click', function(){
			        var userid = $('#vha-ret-driverlic-Id-step6').val();					
					if(userid === IdsightDetails_step6.IdReferenceNumber){
						verifiedStep6 = "Y";
						 $(".IdentrySucess-step6").removeClass("displaynone");
                          $(".IdentryFail-step6").addClass("displaynone");
					}
					else{
						$(".IdentrySucess-step6").addClass("displaynone");
                        $(".IdentryFail-step6").removeClass("displaynone");
					}
		   }); 
		   $("#vha-inapp-checkbox-step6").on('change', function(){
					 
					 if($(this).is(':checked')){
						verifiedStep6 = "Y";
					 }
					 else{
					  verifiedStep6 = "N";
					 }
		    });
		     $("#valiadte-email-step6").on('click', function(){
					$("#vha-step6-mail-unverified").text("Email sent");
					 var  data;
					 requestAnimationFrame(() => {
						setTimeout(() => {
							data = verifyEmailSms(stepAuthPbj_step6,"step6");
							if(data.ErrCd === "0")
								$("#vha-step6-mail-refresh").removeClass("displaynone");
							else
								alert(data.ErrMsg);
						}, 0);
					});
					 
		     });
			 $("#valiadte-phone-step6").on('click', function(){
					
					$("#vha-step6-phone-unverified").text("SMS sent");
					 var data;
					 requestAnimationFrame(() => {
						setTimeout(() => {
							data = verifyEmailSms(stepAuthPbj_step6,"step6");
							 if(data.ErrCd === "0")
								  $("#vha-step6-phone-refresh").removeClass("displaynone");
							  else
								alert(data.ErrMsg);
							
						}, 0);
					});
					 
		     });
			  // refresh step2 post Verification
			 $(".refreshicon-step6").on('click', function(){
					updateFlags(stepAuthPbj_step6);
					 if (AuthmethodType_step6 === "phone"){
						 if (PhnVerifyFlag_step6 === 'Y'){
						 $("#vha-step6-phone-traingexclm").addClass("displaynone");
						 $("#vha-step6-phone-tickmark").removeClass("displaynone");
						 $(this).addClass("displaynone");
						 $("#valiadte-phone-step6").hide();
						 $("#vha-phone-send-otp-btn-step6").show();
						 $('#vha-step6-phone-unverified').text("Verified");
						 $("#vha-step6-phone-unverified").removeClass("displaynone");
						}
						else{
							 $("#vha-step6-phone-traingexclm").removeClass("displaynone");
							 $("#vha-step6-phone-tickmark").addClass("displaynone");
							 $('#vha-step6-phone-unverified').text("Unverified");
						     $("#vha-step6-phone-unverified").removeClass("displaynone");
						}
					 }
					 if (AuthmethodType_step6 === "email"){
						 if (EmailVerifyFlag_step6 === 'Y'){
						 $("#vha-step6-mail-traingexclm").addClass("displaynone");
						 $("#vha-step6-mail-tickmark").removeClass("displaynone");
						 $(this).addClass("displaynone");
						 $("#valiadte-email-step6").hide();
						 $("#vha-email-send-otp-btn-step6").show();
						  $("#vha-step6-mail-unverified").text("Verified");
						  $("#vha-step6-mail-unverified").removeClass("displaynone");
						}
						else{
							 $("#vha-step6-mail-traingexclm").removeClass("displaynone");
							 $("#vha-step6-mail-tickmark").addClass("displaynone");
							  $("#vha-step6-mail-unverified").text("Unverified");
							$("#vha-step6-mail-unverified").removeClass("displaynone");
						}
					 }

			 });
			
			 $(".vha-ret-validate-form-btn-step6").on("click", function () {
                    if (OtpStep6 != "") {
                        if (AuthmethodType_step6 === "phone") var userotp = $("#vha-phoneinput-Id-step6").val();
                        else var userotp = $("#vha-emailinput-Id-step6").val();

                        if (userotp === OtpStep6) {
                            verifiedStep6 = "Y";
                            // alert("verified");
                            if (AuthmethodType_step6 === "email") {
                                $(".emailauthSuccess-step6").removeClass("displaynone");
                                $(".emailauthFail-step6").addClass("displaynone");
                            }
                            if (AuthmethodType_step6 === "phone") {
                                $(".phoneauthSuccess-step6").removeClass("displaynone");
                                $(".phoneauthFail-step6").addClass("displaynone");
                            }
                        } else {
                            verifiedStep6 = "N";
                            // alert("enter correct otp");
                            if (AuthmethodType_step6 === "email") {
                                $(".emailauthSuccess-step6").addClass("displaynone");
                                $(".emailauthFail-step6").removeClass("displaynone");
                            }
                            if (AuthmethodType_step6 === "phone") {
                                $(".phoneauthSuccess-step6").addClass("displaynone");
                                $(".phoneauthFail-step6").removeClass("displaynone");
                            }
                        }
                    }
                });
			 
		    $("#vha-email-send-otp-btn-step6").on('click', function(){
				$(this).hide();
				//$("#email-status-step6").text("Email sent").show();
				$("#vha-email-send-otp-parent-step6").removeClass("displaynone");
				 $('#vha-emailinput-Id-step6').val('');
				$(".emailauthSuccess-step6").addClass("displaynone");
				$(".emailauthFail-step6").addClass("displaynone");
				var showotp;
				requestAnimationFrame(() => {
					setTimeout(() => {
						var response=SendOTP(stepAuthPbj_step6,"step6");
						showotp = response.GetChildByType("ResultSet").propArray.OTP;
						//$("#vha-ret-confirmCode").val(showotp);
						
						OtpStep6 = showotp;
					}, 0);
				});
				//SendOTP(stepAuthPbj);
				setTimeout(function(){
				  $("#email-status-step6").hide();				 
				  $("#vha-email-resend-otp-btn-step6").show();
				 },0);
			});
			
			$("#vha-phone-send-otp-btn-step6").on('click', function(){
				$(this).hide();
				//$("#phone-status-step6").text("SMS sent").show();
				 $("#vha-phone-send-otp-parent-step6").removeClass("displaynone");
				$('#vha-phoneinput-Id-step6').val('');
				 $(".phoneauthSuccess-step6").addClass("displaynone");
				 $(".phoneauthFail-step6").addClass("displaynone");
				var showotp;
				requestAnimationFrame(() => {
					setTimeout(() => {
						var response=SendOTP(stepAuthPbj_step6,"step6");
						showotp = response.GetChildByType("ResultSet").propArray.OTP;
						//$("#vha-ret-confirmCode").val(showotp);
						
						OtpStep6 = showotp;
					}, 0);
				});
				//SendOTP(stepAuthPbj);
				setTimeout(function(){
				  $("#phone-status-step6").hide();				 
				  $("#vha-phone-resend-otp-btn-step6").show();
				 },0);
			});
			
			  $(".resend-otp-step6").on('click', function(){
               const id = $(this).attr('id');
           //    const sendId = id.replace('resend', 'send');      
               $(this).hide();
               switch(AuthmethodType_step6){
                  case 'idSighted':
                     $("#idsight-status-step6").text("Code sent").show();
                  break;
                case 'email':
                   //  $("#email-status-step6").text("Email sent").show();
					  var showotp;
					   $('#vha-emailinput-Id-step6').val('');
						$(".emailauthSuccess-step6").addClass("displaynone");
						$(".emailauthFail-step6").addClass("displaynone");
						requestAnimationFrame(() => {
							setTimeout(() => {
								var response=SendOTP(stepAuthPbj_step6,"step6");
								showotp = response.GetChildByType("ResultSet").propArray.OTP;
								//$("#vha-ret-confirmCode").val(showotp);
								
								OtpStep6 = showotp;
							}, 0);
						});
                  break;
                case 'phone':
                   //  $("#phone-status-step6").text("SMS sent").show();
				 $('#vha-phoneinput-Id-step6').val('');
				 $(".phoneauthSuccess-step6").addClass("displaynone");
				 $(".phoneauthFail-step6").addClass("displaynone");
					  var showotp;
					requestAnimationFrame(() => {
						setTimeout(() => {
							var response=SendOTP(stepAuthPbj_step6,"step6");
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
              setTimeout(function(){
                $(".otp-status-step6").hide();
                $(`#${id}`).show();
             },0);
               
        });
		 
 // step6 authentication end
		 
		 
	       // events end
		   
		   
       }
   
       VHAInviteContactPR.prototype.EndLife = function () {
        SiebelAppFacade.VHAInviteContactPR.superclass.EndLife.apply(this, arguments);
       }
		//create functions start
		
		// Authorised Table
		function createAuthorisedTable(data){
			$(".vha-ret-table-authen tbody").html('');
			 $.each(data, function (index, item) {
          var row = $("<tr>");
          row.append($("<td>").text(item.msisdn));
 
          row.append($("<td>").text(item.plan));
 
          row.append($("<td>").text(item.name));
          row.append($("<td>").text(item.PaymentMethd));
		  row.append($("<td>").text(item.BillingAcct));
 
          $(".vha-ret-table-authen tbody").append(row);
			});
		}
		
		// Limited user Table
		function createLimitedUserTable(){
			
			//workflow call for asset Details
			var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Input = SiebelApp.S_App.NewPropertySet();
			var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
			Input.SetProperty("Object Id", ObjectId);
			Input.SetProperty("Type", "AssetDetails");
			Input.SetProperty("ProcessName", "VHA InvCon Get Details Process");
			var Outputs = ser.InvokeMethod("RunProcess", Input);
			var datatemp = Outputs.GetChildByType("ResultSet").childArray[0].childArray;
			var data=[];
			for (let index = 0; index < datatemp.length; index++) {
				var item ={};
				item.plan= datatemp[index].propArray.Plan;
				item.msisdn= datatemp[index].propArray.MSISDN;
				item.name= datatemp[index].propArray.Username;
				item.PaymentMethd= datatemp[index].propArray.PaymentMethod;
				item.BillingAcct= datatemp[index].propArray.BillingAccount;
				data.push(item);
			}
			
			$(".vha-table-step3-limiteduser tbody").html('');
			 $.each(data, function (index, item) {
				  var row = $("<tr>");
				  row.append($("<td>").append('<input type="checkbox" class="vha-step3-row-check">'));
				  row.append($("<td>").text(item.msisdn));
		 
				  row.append($("<td>").text(item.plan));
		 
				  row.append($("<td>").text(item.name));
				  row.append($("<td>").text(item.PaymentMethd));
				  row.append($("<td>").text(item.BillingAcct));
 
				  $(".vha-table-step3-limiteduser tbody").append(row);
			 });
			 
			  createAuthorisedTable(data);
		}
		// Invite contact authenticate 
		function InviteConAuthen(){
			//workflow data to authenticate
			var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Input = SiebelApp.S_App.NewPropertySet();
			var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
			Input.SetProperty("Object Id", ObjectId);
			Input.SetProperty("Type", "ContactDetails");
			Input.SetProperty("ProcessName", "VHA InvCon Get Details Process");
			var Outputs = ser.InvokeMethod("RunProcess", Input);
			var datatemp = Outputs.childArray[0].propArray;
			
			stepAuthPbj.ARII =datatemp.AccARII;
			stepAuthPbj.OrgName =datatemp.AccOrg;
			stepAuthPbj.ContactId =datatemp.AccConId;
			stepAuthPbj.AccountObjectId =ObjectId;
			stepAuthPbj.MSISDN =datatemp.PhNum;
			stepAuthPbj.EmailOTP =datatemp.Email;
			
			getIDdetails(datatemp.AccConId,"step2");
			var idtype = IdsightDetails.IdType+" "+"****"+IdsightDetails.IdReferenceNumber.slice(-4);
			$("#mfa-step2-IdentryVal").text(idtype);
			
			const phoneNumber = datatemp.PhNum;
			const maskedNumber = phoneNumber.substring(0, 2) + "xxxxxx" + phoneNumber.substring(phoneNumber.length - 3);

			const email = datatemp.Email;
			const [username, domain] = email.split("@");
			//const maskLength = username.length - 2;
			//const maskedMiddle = "x".repeat(maskLength > 0 ? maskLength : 0);
			const maskedEmail = username.charAt(0) + "xxxxxxxxx" + username.charAt(username.length - 1) + "@" + domain;
			let maskedName = datatemp.FullName.replace(/(\b\w)(\w*)/g, (_, first, rest) => first + "x".repeat(rest.length));
			$("#vha-ret-authName").text(maskedName);
			$("#vha-ret-authDob").text(datatemp.DOB);
			$("#vha-ret-authEmailDisplay").text(maskedEmail);
			$("#vha-ret-authPhoneDisplay").text(maskedNumber);
			PhnVerifyFlag_step2 = datatemp.PhNumFlg;
			EmailVerifyFlag_step2 = datatemp.EmailFlg;
			 //$(".tickmark").addClass("displaynone");
           // $(".trainglexclam").addClass("displaynone");
			$(".unverifiedbtn").addClass("displaynone");
			
			if(EmailVerifyFlag_step2 === "Y"){	 
              $("#vha-step2-mail-tickmark").removeClass("displaynone");
			  $("#vha-step2-mail-traingexclm").addClass("displaynone");
			  $("#vha-step2-mail-unverified").text("Verified");
			  $("#vha-step2-mail-unverified").removeClass("displaynone");
			}
			else{
			  $("#vha-step2-mail-traingexclm").removeClass("displaynone");	
			  $("#vha-step2-mail-tickmark").addClass("displaynone");
			  $("#vha-step2-mail-unverified").text("Unverified");
			  $("#vha-step2-mail-unverified").removeClass("displaynone");
			}
		    if( PhnVerifyFlag_step2 === "Y"){	 
              $("#vha-step2-phone-tickmark").removeClass("displaynone");
			  $("#vha-step2-phone-traingexclm").addClass("displaynone");	
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
		function updateFlags(item){
			var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Input = SiebelApp.S_App.NewPropertySet();
			var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
			Input.SetProperty("Object Id", ObjectId);
			Input.SetProperty("Type", "NomConDetails");
			Input.SetProperty("NomConId", item.ContactId);
			Input.SetProperty("ProcessName", "VHA InvCon Get Details Process");
			var Outputs = ser.InvokeMethod("RunProcess", Input);
			var datatemp = Outputs.childArray[0].propArray;
			EmailVerifyFlag_step6 = datatemp.EmailFlg;
			PhnVerifyFlag_step6 = datatemp.PhNumFlg;
		}
		// id sight Details
		function getIDdetails(contactid, callfrom) {
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Input = SiebelApp.S_App.NewPropertySet();
				Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
				Input.SetProperty("Contact Id",contactid );
				Input.SetProperty("FlowType", "IDdata");
				var Outputs = ser.InvokeMethod("RunProcess", Input);                
				var proparray = Outputs.childArray[0].propArray;
				if(callfrom === "step2")
					IdsightDetails= proparray;
				if(callfrom === "step6")
					IdsightDetails_step6= proparray;
		}
		//  updateNomineeForm 
		function updateNomineeForm(item){
			
			var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Input = SiebelApp.S_App.NewPropertySet();
			var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
			Input.SetProperty("Object Id", ObjectId);
			Input.SetProperty("Type", "NomConDetails");
			Input.SetProperty("NomConId", item.ConId );
			Input.SetProperty("ProcessName", "VHA InvCon Get Details Process");
			var Outputs = ser.InvokeMethod("RunProcess", Input);
			var datatemp = Outputs.childArray[0].propArray;
			
			getIDdetails(datatemp.NomConId,"step6");
			var idtype = IdsightDetails_step6.IdType+" "+"****"+IdsightDetails_step6.IdReferenceNumber.slice(-4);
			$("#mfa-step6-IdentryVal").text(idtype);
			const phoneNumber = item.PhoneNum;
			const maskedNumber = phoneNumber.substring(0, 2) + "xxxxxx" + phoneNumber.substring(phoneNumber.length - 3);

			const email = item.Email;
			const [username, domain] = email.split("@");
			//const maskLength = username.length - 2;
			//const maskedMiddle = "x".repeat(maskLength > 0 ? maskLength : 0);
			const maskedEmail = username.charAt(0) + "xxxxxxxxx" + username.charAt(username.length - 1) + "@" + domain;
			
			const maskLengthlastname =  item.LastName.length - 1;
			const maskLengthfirstname = item.FstName.length - 1;
			const maskedLast = "x".repeat(maskLengthlastname > 0 ? maskLengthlastname : 0);
			//const maskedMid = "x".repeat(maskLengthmidname > 0 ? maskLengthmidname : 0);
			const maskedFirst = "x".repeat(maskLengthfirstname > 0 ? maskLengthfirstname : 0);
			const maskedName = item.FstName.substring(0, 1) + maskedFirst + " " + item.LastName.substring(0, 1) + maskedLast + " " ;

			
			$("#vha-ret-authName-step6").text("\u00A0\u00A0"+maskedName);
			$("#vha-ret-authDob-step6").text("\u00A0\u00A0"+item.DOB);
			$("#vha-ret-authEmailDisplay-step6").text(maskedEmail);
			$("#vha-ret-authPhoneDisplay-step6").text(maskedNumber);
			EmailVerifyFlag_step6 = datatemp.EmailFlg;
			PhnVerifyFlag_step6 = datatemp.PhNumFlg;
			//$(".tickmark-step6").addClass("displaynone");
           // $(".trainglexclam-step6").addClass("displaynone");
		   $(".unverifiedbtn-step6").addClass("displaynone");
			if(EmailVerifyFlag_step6 === "Y"){	 
              $("#vha-step6-mail-tickmark").removeClass("displaynone");
			  $("#vha-step6-mail-traingexclm").addClass("displaynone");	
			  $("#vha-step6-mail-unverified").text("Verified");
			  $("#vha-step6-mail-unverified").removeClass("displaynone");
			}
			else{
			  $("#vha-step6-mail-traingexclm").removeClass("displaynone");
			  $("#vha-step6-mail-tickmark").addClass("displaynone");
			  $("#vha-step6-mail-unverified").text("Unverified");
			  $("#vha-step6-mail-unverified").removeClass("displaynone");
			}

		    if( PhnVerifyFlag_step6 === "Y"){
              $("#vha-step6-phone-tickmark").removeClass("displaynone");
		      $("#vha-step6-phone-traingexclm").addClass("displaynone");
			  $('#vha-step6-phone-unverified').text("Verified");
			  $("#vha-step6-phone-unverified").removeClass("displaynone");
			}
			else{
			  $("#vha-step6-phone-traingexclm").removeClass("displaynone");	
			  $("#vha-step6-phone-tickmark").addClass("displaynone");
			  $('#vha-step6-phone-unverified').text("Unverified");
			  $("#vha-step6-phone-unverified").removeClass("displaynone");
			}
			UserSelectedrecord ="Yes";
			
			GlobalInputs.SetProperty("NomFname", item.FstName);
			GlobalInputs.SetProperty("NomLname", item.LastName);
			GlobalInputs.SetProperty("NomMail", item.Email);
			GlobalInputs.SetProperty("NomConId", item.ConId);
			
			stepAuthPbj_step6.ARII =item.NomARII;
			stepAuthPbj_step6.OrgName =item.NomOrg;
			stepAuthPbj_step6.ContactId =item.ConId;
			stepAuthPbj_step6.AccountObjectId =item.ObjectId;
			stepAuthPbj_step6.MSISDN =item.PhoneNum;
			stepAuthPbj_step6.EmailOTP =item.Email;
		}
		
		//  createNomineTable
		function createNomineTable(){
			
			var QueryTyp =$(".vha-img-profile-info-dropdown").val();
			var Queryval = $(".vha-img-profile-info-text").val();
			var QueryDob = $(".vha-img-profile-info-text-date").val();
			var dobparts = QueryDob.split('/');
			var formattedDob ="";
			if (dobparts.length === 3){
				var day = dobparts[0];
				var month = dobparts[1];
				var year = dobparts[2];
				formattedDob = month+"/"+day+"/"+year;
			}
			
			
			var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Input = SiebelApp.S_App.NewPropertySet();
			var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
			Input.SetProperty("Object Id", ObjectId);
			Input.SetProperty("Type", "NomineeQry");
			Input.SetProperty("QryInp" ,QueryTyp);
			Input.SetProperty("DOB",formattedDob);
			Input.SetProperty("QryVal",Queryval);
			Input.SetProperty("ProcessName", "VHA InvCon Get Details Process");
			var Outputs = ser.InvokeMethod("RunProcess", Input);
			var datatemp = Outputs.GetChildByType("ResultSet")?.childArray[1]?.childArray;
			if (datatemp.length > 0 ){
				var data=[];
				for (let index = 0; index < datatemp.length; index++) {
					var item ={};
					item.LastName= datatemp[index].propArray.LastName;
					item.FstName= datatemp[index].propArray.FstName;
					item.MidName= datatemp[index].propArray.MidName;
					item.DOB= datatemp[index].propArray.DOB;
					item.Status= datatemp[index].propArray.Status;
					item.PhoneNum= datatemp[index].propArray.PhoneNum;
					item.Email= datatemp[index].propArray.Email;
					item.PaymentMethod= datatemp[index].propArray.PaymentMethod;
					item.ConId= datatemp[index].propArray.ConId;
					
					item.NomARII= datatemp[index].propArray.NomARII;
					item.NomOrg= datatemp[index].propArray.NomOrg;
					item.ConId= datatemp[index].propArray.ConId;
					item.ObjectId= ObjectId;
					item.PhoneNum= datatemp[index].propArray.PhoneNum;
					item.Email= datatemp[index].propArray.Email;
					data.push(item);
				}
				//Table Formation
			     $(".vha-table-step5-retailUser tbody").html('');
				  $.each(data, function (index, item) {
				  var row = $("<tr>");
		 
					//var vha_img_radioBtn = $('<button class="btn-bg-blue">Select</button>').on(
					var vha_img_radioBtn = $('<input type="radio" name="selection" class="btn-bg-blue">').on(
					"click",
		 
					function () {
					  updateNomineeForm(item);
					}
				  );
				 var radioCell = $("<td>").append(vha_img_radioBtn);
				 row.append($("<td>").text(item.LastName));
		         row.append($("<td>").text(item.FstName));
				 row.append($("<td>").text(item.MidName));
				 row.append($("<td>").text(item.DOB));
		         row.append($("<td>").text(item.Status));
				 row.append($("<td>").text(item.PhoneNum));
				 row.append($("<td>").text(item.Email));
				 row.append($("<td>").text(item.PaymentMethod));
				 row.append(radioCell);
		 
				  $(".vha-table-step5-retailUser tbody").append(row);
				});
			}
			else{
				customerRecNotfound ="Yes";
				$(".vha-table-step5-retailUser tbody").html('');
				alert("We can’t find any records matching your search.");
				
			}
		}
		
		// send Otp
		function SendOTP(item,callfrom){
			var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Input = SiebelApp.S_App.NewPropertySet();		
			Input.SetProperty("ProcessName", "VHA Generate OTP Process");
			Input.SetProperty("OrgName", item.OrgName);
			Input.SetProperty("ARII", item.ARII);
			Input.SetProperty("ContactId", item.ContactId);
			Input.SetProperty("AccountObjectId", item.AccountObjectId);
			Input.SetProperty("AccId", item.AccountObjectId);
			if(callfrom === "step2"){
				Input.SetProperty("MSISDN", item.MSISDN);
				if (AuthmethodType === "email"){
					Input.SetProperty("EmailAddr", item.EmailOTP);
					Input.SetProperty("EmailOTP", "ConEmailOTP");
				}
				
			}
			else{
				Input.SetProperty("MSISDN", item.MSISDN);
				if (AuthmethodType_step6 === "email"){
					Input.SetProperty("EmailAddr", item.EmailOTP);
					Input.SetProperty("EmailOTP", "ConEmailOTP");
				}
				
			}
			
			var Outputs = ser.InvokeMethod("RunProcess", Input);	
			return Outputs;
		}
		
		// email or sms verify
		
		function verifyEmailSms(item,callfrom){
			var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Input = SiebelApp.S_App.NewPropertySet();
			//var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
			Input.SetProperty("Object Id", item.ContactId);
			Input.SetProperty("sConId", item.ContactId);
			
			if(callfrom === "step2"){
				if (AuthmethodType === "email"){
				Input.SetProperty("sType", "Email");
				Input.SetProperty("sValue", item.EmailOTP );
				}
				if (AuthmethodType === "phone"){
					Input.SetProperty("sType", "SMS");
					Input.SetProperty("sValue", item.MSISDN);
				}
			}
			else{
				if (AuthmethodType_step6 === "email"){
				Input.SetProperty("sType", "Email");
				Input.SetProperty("sValue", item.EmailOTP );
				}
				if (AuthmethodType_step6 === "phone"){
					Input.SetProperty("sType", "SMS");
					Input.SetProperty("sValue", item.MSISDN);
				}
			}
			
			Input.SetProperty("ProcessName", "VHA Digital Email SMS Verification Process");
			var Outputs = ser.InvokeMethod("RunProcess", Input);
			var datatemp = Outputs.childArray[0].propArray;
			return datatemp;
		}
		// verify Id
		function ContactIdVerify(item,strContactIdCode){
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
			if (srtconId != "" && srtconId!=null)
				NavigateView(item);
		}
		// reset mfa ui
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
			 $(".IdentrySucess").addClass("displaynone");
			 $(".IdentryFail").addClass("displaynone"); 
			 $(".refreshicon").addClass("displaynone"); 
			 $('input[name=authMethod]').prop('checked', false);
			 $(".send-otp").hide();
			$(".resend-otp").hide();
			$(".otp-status").hide(); 
			$(".validated-status").hide();
			
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
			  $(".IdentrySucess-step6").addClass("displaynone");
			 $(".IdentryFail-step6").addClass("displaynone"); 
			 $(".refreshicon-step6").addClass("displaynone"); 
			 $('input[name=authMethod-step6]').prop('checked', false);
			 $(".send-otp-step6").hide();
			$(".resend-otp-step6").hide();
			$(".otp-status-step6").hide(); 
			$(".validated-status-step6").hide();
			
		} 
		// resetUI
		function resetUI(callfrom){
			 PhnVerifyFlag_step2 ="";
			 EmailVerifyFlag_step2 = "";
			 PhnVerifyFlag_step6 ="";
			 EmailVerifyFlag_step6 ="";
			 AuthmethodType ="";
			 $(".vha-img-invitecotact-step2, .vha-img-invitecotact-step3,.vha-img-invitecotact-step4,.vha-img-invitecotact-step5,.vha-img-invitecotact-step6,.vha-img-invitecotact-step7").find("input[type='radio'], input[type='checkbox']").prop("checked", false);
			 $(".vha-img-invitecotact-step2, .vha-img-invitecotact-step3,.vha-img-invitecotact-step4,.vha-img-invitecotact-step5,.vha-img-invitecotact-step6,.vha-img-invitecotact-step7").find("input[type='text'],input[type='date']").val('');
			
			 $(".vha-table-step5-retailUser tbody").html('');
			// nomineprStatus ="";
			// nomineMfaStatus = "";
			// flowtype = "";
			 
			 backenter="";
			 customerRecNotfound ="";
			 UserSelectedrecord ="";
			 limitedUserAll="";
			 Nominateusertype = "";
			 stepAuthPbj ={};
			 OtpStep2="";
			 verifiedStep2="";
			 stepAuthPbj_step6 = {};
			 AuthmethodType_step6 = "";
			 OtpStep6 = "";
			 verifiedStep6 ="";
			 functionStatus ={};
			 if (callfrom !== "step1" && callfrom !== "step7" && callfrom !=="step4"){ 
				 GlobalInputs = SiebelApp.S_App.NewPropertySet();
				 NominatorRole = "";
				 oldflowtype ="";
			 }
			 
		}
		// dummy function 
		function dummy(){
			
		}
		//create functions end
       return VHAInviteContactPR;
      }()
     );
     return "SiebelAppFacade.VHAInviteContactPR";
    })
   }
   