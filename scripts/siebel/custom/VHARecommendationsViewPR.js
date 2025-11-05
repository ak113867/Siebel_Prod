if (typeof(SiebelAppFacade.VHARecommendationsViewPR) === "undefined") {
//global variables
	window.coverageCheckRes=""; // added by vinay kumar
	window.nbnResp = "";
	window.existAddrNbnResp =""; //added vy vinay kumar
	window.latitude ="";
	window.longitude ="";
	window.ExsistingAddrValue ="";
	window.sManualAddrRes = "";
 SiebelJS.Namespace("SiebelAppFacade.VHARecommendationsViewPR");
 var recomXML;
 var sEnableGetRecom = "";
 var sPrimaryIntent = [];
 var sPrimaryIntentFlag = "";
 var sServiceData = [];
 var ContactsDetails=[];
 var selectedBAcc = "";
 var recomJson = {};
 var copyJson = {};				   
 var cartJSON = {};
 var CustomerAccountId = "";
 var OrderId = "";
 var InteractionId = "";						
 var IntentCaptureId = "";
 var LoginId = "";
 var sServiceHier = [];
 var ExistAddrPsma = []; // added vinay kumar
 var SiebelMessage = "";
 var sExistingServiceLabel = "";
 var newAddressFlag = false;
 var intentQuesPsma = false;
 var sUserType = TheApplication().GetProfileAttr('VHA User Type');
 var billingAccNumCopy;
 var $targetDiv;				
 define("siebel/custom/VHARecommendationsViewPR", ["siebel/viewpr", "siebel/custom/VHARecommendationTemplate", "order!siebel/custom/VHAAppUtilities","order!siebel/custom/VHASSJAddressSearch"],
  function () {
   SiebelAppFacade.VHARecommendationsViewPR = (function () {
    function VHARecommendationsViewPR(pm) {
     SiebelAppFacade.VHARecommendationsViewPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHARecommendationsViewPR, SiebelAppFacade.ViewPR);

    VHARecommendationsViewPR.prototype.Init = function () {
     SiebelAppFacade.VHARecommendationsViewPR.superclass.Init.apply(this, arguments);
    }

    VHARecommendationsViewPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHARecommendationsViewPR.superclass.ShowUI.apply(this, arguments);
      $('.selectaddressdropdowncontainer1 div.ParagraphBody1').prepend('<span id="vha-scj-step1-requiredfiled">*</span>');
	 $('.vha-billingaccounts-section div.vha-h3').text('1.Select Billing Account to discuss');
	 $('.totalcostspan').text('Last monthly bill');
		//$('.billingaccountdropdowncontainer div.ParagraphBody1').prepend($('#vha-scj-step1-requiredfiled'));
		$('#accountHolderFname').prev().text('Name');	
		$('#vha-ign-getrecombutton').prop('disabled',true);
		$('.sitequalificationcontainer').hide();//added by vinay
		//SiebelApp.S_App.SetProfileAttr("CustomerAccountId","1-8J7SU"); DEV04
		CustomerAccountId = SiebelApp.S_App.GetProfileAttr("CustomerAccountId");
		LoginId = SiebelApp.S_App.GetProfileAttr("Login Name");
		console.log(OrderId);
		SiebelApp.S_App.SetProfileAttr("ssjOrderId", "");
	    var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
	    var Inputs = SiebelApp.S_App.NewPropertySet();
	    var Outputs = SiebelApp.S_App.NewPropertySet()
		Inputs.SetProperty("ProcessName","VHA CID Account Details WF");
		Inputs.SetProperty("CustomerAccountId",CustomerAccountId);
		Inputs.SetProperty("Action","New");
		Inputs.SetProperty("Launch","true");
		Inputs.SetProperty("AgentId",LoginId);
		Outputs = ser.InvokeMethod("RunProcess", Inputs);
		var Result = Outputs.GetChildByType("ResultSet");
		var OutpuXMLDoc = Result.GetProperty("XML Doc");
		var TotalCostPerMonth = Result.GetProperty("TotalCostPerMonth");
		//console.log(OutpuXMLDoc);
		sExistingServiceLabel = Result.GetProperty("ExistingServiceLabel");
		OrderId = Result.GetProperty("OrderId");
		SiebelApp.S_App.SetProfileAttr("ssjOrderId", OrderId);
		IntentCaptureId = Result.GetProperty("IntentCaptureId");
		SiebelMessage = Result.GetChildByType("SiebelMessage");
		console.log(SiebelMessage);
		if (OutpuXMLDoc) 
		{
			var billingAccounts = [];
			var biiAccNum = [];
			var ContactRole = [];
			var FirstName = [];
			var LastName = [];
			ContactsDetails=[];
			var primaryContactsDetails=[];
			var DefaultListOfAddress =[];
			var DynamicListOfAddress =[];
			var EquipmentLimitRemaining ="";
			var ApprovedServices ="";
			var CreditCheckStatus ="";
			var ActiveServices ="";
			var totalcost1stvalue ="";
			var xmlDoc = $.parseXML(OutpuXMLDoc);
			var $xml = $(xmlDoc);
			$('#vha-ign-billingAccounts').off('change').on('change',function(e){
				sPrimaryIntentFlag = "N";
				jsonHandler('NewJson', {});
				jsonHandler('NewCopyJson',{});				  
				$(".vha-ign-recm-C1-row2 .vha-ign-newservices .service-container .service-header button").each(function() {
					$(this).trigger("click");
					//console.log("All New Services Removed");
				});
				selectedBAcc = $('#vha-ign-billingAccounts').val(); 
				findHierarchyfrSelectedBA(selectedBAcc); 
				var selectedTotalCostPerMonth = $('#vha-ign-billingAccounts option:selected').attr('TotalCostPerMonth');
				$("#totalcostvalue").text(selectedTotalCostPerMonth);
				updateselectAddress(selectedBAcc);
			});
			$xml.find("Account").each(function(){
            var sBillingLength = $(this).find("VfBillingAccount").length;
				$(this).find("ListOfVfBillingAccount").each(function(){
					$(this).find("VfBillingAccount").each(function(){
						var billingAccountnum  = $(this).find("AccountNumber").text();
						billingAccNumCopy = billingAccountnum;
						var PaymentMethod = $(this).find("PaymentMethod").text();
						PaymentMethod = (PaymentMethod === "Postpay" ? "Postpaid" : "Prepaid");
						var TotalCostPerMonth = $(this).find("TotalCostPerMonth").text();
						var createdDate = $(this).find('Created').text();
						if(PaymentMethod)
						{
						var bAccformat =  billingAccountnum +" ("+PaymentMethod+")";
						}
						else
						{
						var bAccformat =  billingAccountnum;
						}
						billingAccounts.push(bAccformat);
						biiAccNum.push(billingAccountnum);
						if(totalcost1stvalue =="")
						{
							$+$("#totalcostvalue").text(TotalCostPerMonth);
							totalcost1stvalue = "Y"
						}
                        if(sBillingLength< 2){
							$('#vha-ign-billingAccounts').addClass('singleAccount');
							$('#vha-ign-billingAccounts').prop('disabled', true);
							
							SiebelApp.S_App.SetProfileAttr("selectedBillingAccount",billingAccountnum);
							
						}
						if(bAccformat.includes('Prepaid') == true)
						{
							//$('#vha-ign-billingAccounts').append('<option value="'+billingAccountnum+'" TotalCostPerMonth="'+TotalCostPerMonth+'" disabled>'+bAccformat+'</option>');
							
							if(sBillingLength< 2){
								$('#vha-ign-billingAccounts').append('<option value="'+billingAccountnum+'" TotalCostPerMonth="'+TotalCostPerMonth+'" attr-date="'+$(this).find('Created').text()+'" >'+bAccformat+'</option>');
								$('.vha-ign-recm-C1-row2').css('pointer-events','none');
								$('.vha-ign-recm-C1-row3').css('pointer-events','none');
							 }
							 else{
								 $('#vha-ign-billingAccounts').append('<option value="'+billingAccountnum+'" TotalCostPerMonth="'+TotalCostPerMonth+'" attr-date="'+$(this).find('Created').text()+'"  disabled>'+bAccformat+'</option>');
							 }
							
						}
						else{
							$('#vha-ign-billingAccounts').append('<option value="'+billingAccountnum+'" TotalCostPerMonth="'+TotalCostPerMonth+'" attr-date="'+$(this).find('Created').text()+'" >'+bAccformat+'</option>');
						}
						//$('#vha-ign-billingAccounts').append('<option value="'+billingAccountnum+'" TotalCostPerMonth="'+TotalCostPerMonth+'">'+bAccformat+'</option>');
						$(this).find("ListOfVFBillingAccount_BusinessAddress").each(function(){
							$(this).find("VFBillingAccount_BusinessAddress").each(function(){
							var obj={};
                            var addrObj={};
							obj.fullAddress  = $(this).find("CalFullAddress").text();
							obj.billingAccount  = $(this).parent().find("AccountNumber").text(); // this will match the Option A and B
							obj.fullAddress += ' (Billing Address)'; 
							DynamicListOfAddress.push(obj);
                            addrObj.address_identifier = $(this).find("DPID").text();// added by vinay kumar
							addrObj.latitude = $(this).find("Latitude").text();
							addrObj.longitude = $(this).find("Longitude").text();
							addrObj.postcode = $(this).find("PostalCode").text();
							addrObj.state_territory = $(this).find("State").text();
							addrObj.locality_name = $(this).find("City").text();
							addrObj.addressStreetType = $(this).find("AddressStreetType").text();
							addrObj.unitType = $(this).find("AddressFloorType").text();
						    addrObj.streetName = $(this).find("StreetAddress").text(); // added VK
							addrObj.sBuildingNumber = $(this).find("StreetAddress2").text(); // added VK
							addrObj.unitNumber = $(this).find("AddressFloor").text();
							addrObj.buildingName = $(this).find("AddressBuilding").text();
							addrObj.VHAFullAddressPIC = $(this).find("CalFullAddress").text();
							addrObj.VHAFullAddressPIC += ' (Billing Address)';
							ExistAddrPsma.push(addrObj);
							});
							
						});
						
						//sorting the billing acoount
						let $options = $('#vha-ign-billingAccounts').find('option');
						$options.sort(function(a, b) {
							let dateA = new Date($(a).attr('attr-date'));
							let dateB = new Date($(b).attr('attr-date'));
							return dateA - dateB;
						});
						$('#vha-ign-billingAccounts').empty().append($options);
						drpvalues = $('#vha-ign-billingAccounts').prop('outerHTML');
												
					});
				});
				$(this).find("ListOfVfComFinancialProfile").each(function(){
					$(this).find("VfComFinancialProfile").each(function(){
						 EquipmentLimitRemaining  = $(this).find("EquipmentLimitRemaining").text();
						 //EquipmentLimitRemaining = (EquipmentLimitRemaining === "" ? "$0.00" : EquipmentLimitRemaining);
						 ApprovedServices = $(this).find("ApprovedServices").text();
						 CreditCheckStatus = $(this).find("CreditCheckStatus").text();
						 CreditCheckStatus = (CreditCheckStatus === "APPROVE" ? "Approved" : CreditCheckStatus);
						 ActiveServices =  $(this).find("ActiveServices").text();
						$(".page1 #EquipmentLimitRemaining").text("$" + Number(EquipmentLimitRemaining).toFixed(2));
						//$(".page1 #EquipmentLimitRemaining").text("$" + EquipmentLimitRemaining);
						$(".page1 #ApprovedServices").text(ApprovedServices);
						$(".page1 #CreditCheckStatus").text(CreditCheckStatus);
						$(".page1 #ActiveServices").text(ActiveServices);
						$(".page2 #EquipmentLimitRemaining").text("$" + Number(EquipmentLimitRemaining).toFixed(2));
						//$(".page2 #EquipmentLimitRemaining").text("$" + EquipmentLimitRemaining);
						$(".page2 #ApprovedServices").text(ApprovedServices);
						$(".page2 #CreditCheckStatus").text(CreditCheckStatus);
						$(".page2 #ActiveServices").text(ActiveServices);
					});
				});
				$(this).find("ListOfContact").each(function(){
					$(this).find("Contact").each(function(){
						if($(this).find("PrimaryContactFlag").text() != "Y")
						{
						 var FName  = $(this).find("FirstName").text();
						 var LName = $(this).find("LastName").text();
						 var ConRole = $(this).find("ContactRole").text();
						 var fulname = $(this).find("FirstName").text() + $(this).find("LastName").text();
						 FirstName.push(FName);
						 LastName.push(LName);
						 ContactRole.push(ConRole);
						 var obj={};
						 obj.fullname = $(this).find("FirstName").text() + $(this).find("LastName").text();
						 obj.FirstName = $(this).find("FirstName").text();
						 obj.LastName = $(this).find("LastName").text();
						 obj.ContactRole = $(this).find("ContactRole").text();
						 ContactsDetails.push(obj);
						}
						if ($(this).find("PrimaryContactFlag").text() == "Y")
						{
							 var FName  = $(this).find("FirstName").text();
							 var LName = $(this).find("LastName").text();
							 var ConRole = $(this).find("ContactRole").text()+" :";
							 var fulname = $(this).find("FirstName").text() +" "+ $(this).find("LastName").text();
							 /*FirstName.push(FName);
							 LastName.push(LName);
							 ContactRole.push(ConRole);
							 var obj={};
							 obj.fullname = $(this).find("FirstName").text() + $(this).find("LastName").text();
							 obj.FirstName = $(this).find("FirstName").text();
							 obj.LastName = $(this).find("LastName").text();
							 obj.ContactRole = $(this).find("ContactRole").text();
							 primaryContactsDetails.push(obj); */
							 $(".page1 .customertypevalue").text(ConRole);
							 $(".page1 .customerfullname").text(fulname);
							 $(".page1 #accountHolderFname").text(fulname);
							 //$(".page1 #accountHolderLname").text(LName);
							 $(".page2 .customertypevalue").text(ConRole);
							 $(".page2 .customerfullname").text(fulname);
							 $(".page2 #accountHolderFname").text(fulname);
							// $(".page2 #accountHolderLname").text(LName);
							
						}
					});
				});
				$(this).find("ListOfCutAddress").each(function(){
					$(this).find("CutAddress").each(function(){
						var obj={};
                        var addrObj={};
						obj.fullAddress  = $(this).find("VHAFullAddressPIC").text();
						obj.fullAddress += ' (Customer Address)';
						DefaultListOfAddress.push(obj);
						DynamicListOfAddress.push(obj);
						addrObj.address_identifier = $(this).find("DPID").text();// added by vinay kumar
						addrObj.latitude = $(this).find("Latitude").text();
						addrObj.longitude = $(this).find("Longitude").text();
						addrObj.postcode = $(this).find("PostalCode").text();
						addrObj.state_territory = $(this).find("State").text();
						addrObj.locality_name = $(this).find("City").text();
						addrObj.addressStreetType = $(this).find("AddressStreetType").text();
						addrObj.unitType = $(this).find("AddressFloorType").text();
					    addrObj.streetName = $(this).find("StreetAddress").text(); // added VK
						addrObj.sBuildingNumber = $(this).find("StreetAddress2").text(); // added VK
						addrObj.unitNumber = $(this).find("AddressFloor").text();
						addrObj.buildingName = $(this).find("AddressBuilding").text();
						addrObj.VHAFullAddressPIC = $(this).find("VHAFullAddressPIC").text();
                        addrObj.VHAFullAddressPIC += ' (Customer Address)';
						ExistAddrPsma.push(addrObj);
					});
				});
			});
			$('#vha-ign-billingAccounts').trigger('change');
			document.addEventListener("DOMContentLoaded", () => {
				renderContacts(ContactsDetails,"page1");
			});
		}
		
		$('#vha-ign-ExistingAddresslistoptions').on('change',function(e){
			var selectedBA = $('#vha-ign-ExistingAddresslistoptions').val();
			if (selectedBA == "Enter new address")
			{
				$('#vha-scj-step2-address').prop('disabled',false);
                $('#vha-ign-coveragecheck').prop('disabled',false);// added vk
				$("#vha-ign-coveragecheckresult").addClass("displaynone");
                				newAddressFlag = false;

			}
            else if (selectedBA != "Enter new address" || selectedBA != "Select")
			{
				$('#vha-scj-step2-address').prop('disabled',true);
				$('#vha-ign-getrecombutton').prop('disabled',true);
				existingAddressPSMACall(selectedBA);// added by vinay kumar
			}
			else{
				$('#vha-scj-step2-address').prop('disabled',true);
			}
		});
		const selectAddressillingAccount = document.getElementById('selectAddressillingAccount');
		//const selectedBA = selectAddressillingAccount.value || selectAddressillingAccount.options[0]?.value;
		const selectedBA = $('#vha-ign-billingAccounts').val();
		  if (selectedBA) {
			updateselectAddress(selectedBA);
		  }
		function updateselectAddress(selectedBillingAccount) {
			const selectAddressillingAccount = document.getElementById('vha-ign-billingAccounts');
			const selectAddress = document.getElementById('vha-ign-ExistingAddresslistoptions');
			// Clear all options
			selectAddress.innerHTML = '';
            const opti = document.createElement('option');
			opti.value = "Select";
			opti.text = "Select";// added by vinay kumar
			selectAddress.appendChild(opti);

			// Add default addresses first
			//DefaultListOfAddress.forEach(addr => {
				DynamicListOfAddress.forEach(addr => {
				const opt = document.createElement('option');
				opt.value = addr.fullAddress;
				opt.text = addr.fullAddress;
				selectAddress.appendChild(opt);
			});
			// Filter and add dynamic addresses based on billing account
			const filteredDynamic = DynamicListOfAddress.filter(
				addr => addr.billingAccount === selectedBillingAccount
			);

			/*filteredDynamic.forEach(addr => {
				const opt = document.createElement('option');
				opt.value = addr.fullAddress;
				opt.text = addr.fullAddress;
				selectAddress.appendChild(opt);
			});*/
			const opt = document.createElement('option');
			opt.value = "Enter new address";
			opt.text = "Enter new address";
			selectAddress.appendChild(opt);
		}
		/*New Service Logic*/
		localStorage.setItem("selectedAnswers", "");
		let selectedAnswers = JSON.parse(localStorage.getItem("selectedAnswers") || "{}");
        var nextNum = 0;
		document.getElementById("vha-ign-addnewser").addEventListener("click", () => {
			var containerNew = document.getElementById("vha-ign-addnewservicesid");
			const currentCnt = containerNew.querySelectorAll(".service-container").length;
			nextNum = currentCnt + 1;
			
			
			var AddNewser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet();
			Inputs.SetProperty("ProcessName", "VHA Customer Intent OUI Details WF");
			Outputs = AddNewser.InvokeMethod("RunProcess", Inputs);

			var Result = Outputs.GetChildByType("ResultSet");
			var AddnewXMLDocProp = Result.GetProperty("XML Doc");
			var NewServiceLabel = Result.GetProperty("NewServiceLabel");
			var AddnewXMLDoc = $.parseXML(AddnewXMLDocProp);
			var $Addnewxml = $(AddnewXMLDoc);
			console.log(AddnewXMLDoc);//24JUL
			var AddNewserSiebelMessage = Result.GetChildByType("SiebelMessage");

			// 1st Question and New Service Section
			const serviceDiv = document.createElement("div");
			serviceDiv.className = "service-container";

			const header = document.createElement("div");
			header.className = "service-header";

			const title = document.createElement("div");
			title.textContent = `New Service ${nextNum}`;
			title.className = "ParagraphBody1Strong";
            
			const rightControls = document.createElement("div");

			const removeBtn = document.createElement("button");
			removeBtn.className = "whitebutton onlyLink";
			removeBtn.textContent = "Remove";
			removeBtn.addEventListener("click", () => {
				//var contextList = recomJson.ListOfVHANextBestActionRequest.NextBestActionRequest.ListOfContexts.Contexts || [];
				var contextList = recomJson.Contexts || [];
				var IntentList = copyJson.Contexts || [];
				var copyArray = IntentList.filter(ctx =>{
					return ctx.ContextID != title.textContent;
				});
				var filteredArray = contextList.filter(ctx => {
					return ctx.ContextID != title.textContent;
				});
				//recomJson.ListOfVHANextBestActionRequest.NextBestActionRequest.ListOfContexts.Contexts = filteredArray;
				copyJson.Contexts = copyArray;				  
				recomJson.Contexts = filteredArray;
				serviceDiv.remove();
				//serviceCount--;
				renumberCopyServices();		   
				renumberServices();
			});

			const toggleIcon = document.createElement("img");
			toggleIcon.className = "toggle-icon";
			toggleIcon.src = "images/custom/vha-ign-expaneded_20_20.svg";
			toggleIcon.alt = "Toggle";

			rightControls.appendChild(removeBtn);
			rightControls.appendChild(toggleIcon);

			header.appendChild(title);
			header.appendChild(rightControls);

			const body = document.createElement("div");
			body.className = "service-body";

			const block = document.createElement("div");
			block.className = "question-block";

			const childblock = document.createElement("div");
			childblock.className = "question-block-child";

			const label = document.createElement("div");
			label.textContent = NewServiceLabel;
			label.className = "ParagraphBody1";

			const asterisk = document.createElement("span");
			  asterisk.id = "vha-scj-step1-requiredfiled";
			  asterisk.className  = "vha-scj-step1-requiredoptions";
			  asterisk.textContent = "* ";
			  //qLabel.appendChild(document.createTextNode(q.question)); // temporarily add text
			  label.insertBefore(asterisk, label.firstChild)

			childblock.appendChild(label);
			block.appendChild(childblock);
			//body.appendChild(removeBtn);
			//body.appendChild(toggleIcon);
			body.appendChild(block);
			serviceDiv.appendChild(header);
			serviceDiv.appendChild(body);

			const products = [];
			const productNodes = AddnewXMLDoc.querySelectorAll("VhaCidProductsServicesOuiBc");

			productNodes.forEach(productNode => {
				const description = productNode.querySelector("ProductDescription")?.textContent || "Unnamed Product";
				const code = productNode.querySelector("ProductCode")?.textContent || "";
				const questions = [];
				const sprimintnew = [];
				const sprimintnewNodes = productNode.querySelectorAll("VhaPrimaryIntentOuiBc");
				const mainQueIC = productNode.querySelector("VhaIntentQuestionOuiNewBc");
				const mainQue = mainQueIC.querySelector("IntentQuestion")?.textContent || "";
				var sortedPrimaryIntent = Array.from(sprimintnewNodes);
				sortedPrimaryIntent.sort((a, b) => {
					  const orderA = Number(a.querySelector("OrderBy")?.textContent.trim() || Number.MAX_SAFE_INTEGER);
					  const orderB = Number(b.querySelector("OrderBy")?.textContent.trim() || Number.MAX_SAFE_INTEGER);
					  return orderA - orderB;
					});
				sortedPrimaryIntent.forEach(primNode => {
					const options = [];
					const answer = primNode.querySelector("PrimaryIntentAnswers")?.textContent.trim();
				 
					if (answer) {
						options.push(answer);
					}
					// Push only if there’s valid data
					if (options.length) {
						sprimintnew.push({ pNode: primNode, options: options,  mainQue});
					}
					const questionNodes = primNode.querySelectorAll("VhaIntentQuestionOuiBc");
					const questionNodesArray = Array.from(questionNodes);
					//primaryIntent(Yes,No) AND IntentQuestions(Brand, Model) AND SecondaryIntent(Apple, Samsung) uses sort
					questionNodesArray.sort((a, b) => {
						const aOrder = a.querySelector("OrderBy")?.textContent.trim() || "";
						const bOrder = b.querySelector("OrderBy")?.textContent.trim() || "";
						return aOrder.localeCompare(bOrder);
					});
					questionNodesArray.forEach(qNode => {
						const question = qNode.querySelector("IntentQuestion")?.textContent || "";
						const isMandatory = (qNode.querySelector("IsMandatory")?.textContent.trim().toLowerCase() === "y" || qNode.querySelector("IsMandatory")?.textContent.trim().toLowerCase() === "true");
						const isCDHQuestionCode = qNode.querySelector("IntentCDHQuestionCode")?.textContent || "";
						const isQuestionCode = qNode.querySelector("IntentQuestionCode")?.textContent || "";
						const options = [];
						var isSecIntCDHCode = [];
						
						const intentAnswerNodes = Array.from(qNode.querySelectorAll("VhaSecondaryIntentOuiBc"));
	 
						// Sort the intent answer nodes by their <OrderBy> values
						intentAnswerNodes.sort((a, b) => {
						  const orderA = Number(a.querySelector("OrderBy")?.textContent.trim() || Number.MAX_SAFE_INTEGER);
						  const orderB = Number(b.querySelector("OrderBy")?.textContent.trim() || Number.MAX_SAFE_INTEGER);
						  return orderA - orderB;
						});
						 
						// Extract <SecondaryIntentAnswers> values in the sorted order
						intentAnswerNodes.forEach(opNode => {
						  const answer = opNode.querySelector("SecondaryIntentAnswers")?.textContent.trim();
						  const cdhcode = opNode.querySelector("IntentCDHCode")?.textContent.trim(); 
						  if (answer)
						  {						  
							  options.push(answer);
							  isSecIntCDHCode.push(cdhcode);
						  }
						});
						
						if (question && options.length) {
							questions.push({ question, isMandatory, isCDHQuestionCode, isQuestionCode, options, isSecIntCDHCode, answer });
						}
					});

				});
				
				products.push({ description, code, questions, sprimintnew});
				
				
			});

			const productBtnContainer = document.createElement("div");
			productBtnContainer.className = "button-block-child";


			products.forEach((prod, index) => {
				const prodBtn = document.createElement("button");
				prodBtn.className = "optionbutton label-med-default-enabled newservice ParagraphBody1";
				prodBtn.textContent = prod.description;

				  /*if (index === 0 ) {
				    prodBtn.classList.add("firstoption");
				  }
				  if (index === products.length - 1) {
				    prodBtn.classList.add("lastoption");
				  }*/


				prodBtn.addEventListener("click", () => {
					// Clear old questions (optional)
					/* while (block.children.length > 1) {
					block.removeChild(block.lastChild);
					}*/
				    
					block.querySelectorAll(".question-block-child:not(:first-child)").forEach(el => el.remove());
					//block.querySelectorAll(".button-block-child:not(:first-child)").forEach(el => el.remove());
					block.querySelectorAll(".int-question-block-child").forEach(el => el.remove());
					block.querySelectorAll(".int-button-block-child").forEach(el => el.remove());
					enableGetrecomBtn();

					productBtnContainer.querySelectorAll("button").forEach(btn => {
					  btn.classList.remove("label-med-default-selected");
					});
					prodBtn.classList.add("label-med-default-selected");

					// Clear stored answers for this service

					Object.keys(selectedAnswers).forEach(key => {
					  if (key.startsWith(`${nextNum}-`)) {
					    delete selectedAnswers[key];
					  }
					});

					localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));

					recomJson = setContexts([
					{
						"ContextLevel" : "Subscription",
						"ContextID" : title.textContent,  
						"Status" : "Active",
						"Type" : "ProductType",
						"Key" : prodBtn?.innerHTML?.trim(), 
						"Value" : "New"	
					}
					]);
					recomJson = setContexts([
					{
						"ContextLevel" : "Subscription",
						"ContextID" : title.textContent,  
						"Status" : "Active",
						"Type" : "Product",
						"Key" : prodBtn?.innerHTML?.trim(), 
						"Value" : title.textContent
					}
					]);
					copyJson = setIntents([
					{
						"ContextLevel" : "Subscription",
						"ContextID" : title.textContent,  
						"Status" : "Active",
						"Type" : "ProductType",
						"Key" : prodBtn?.innerHTML?.trim(), 
						"Value" : "New"	
					}
					]);
					copyJson = setIntents([
					{
						"ContextLevel" : "Subscription",
						"ContextID" : title.textContent,  
						"Status" : "Active",
						"Type" : "Product",
						"Key" : prodBtn?.innerHTML?.trim(), 
						"Value" : title.textContent
					}
					]);
					const primqblock = document.createElement("div");
					primqblock.className = "int-question-block-child";

					const primlabel = document.createElement("div");
					primlabel.textContent = prod.sprimintnew[0].mainQue;
					primlabel.className = "ParagraphBody1";

					primqblock.appendChild(primlabel);
					
					const optintBlock = document.createElement("div");
					optintBlock.className = "int-button-block-child";
					

					prod.sprimintnew.forEach((optint, index) => {
						const sPrimNode = optint.pNode;
						const optintBtn = document.createElement("button");
						optintBtn.className = "optionbutton label-med-default-enabled newservice ParagraphBody1";
						optintBtn.textContent = optint.options[0];
						const key = `${nextNum}-PrimaryIntent`;
						selectedAnswers[key] = "";
						
						/*if (index === 0) {
						    optintBtn.classList.add("firstoption");
						  }
						 if (index === prod.sprimintnew.length - 1) {
						    optintBtn.classList.add("lastoption");
						  }*/


						if (selectedAnswers[key] === optint.options[0]) {
						  optintBtn.classList.add("label-med-default-selected");
						}
						optintBtn.addEventListener("click", () => {
							const optintBtnTxt = optintBtn?.textContent || "";
							recomJson = setContexts([
							{
								"ContextLevel" : "Subscription",
								"ContextID" : title.textContent,  
								"Status" : "Active",
								"Type" : "Intent-"+prodBtn?.innerHTML?.trim(),
								"Key" : "PrimaryIntent",
								"Value" : sPrimNode.querySelector("IntentCDHCode")?.innerHTML?.trim()	
							}
							]);
							copyJson = setIntents([
							{
								"ContextLevel" : "Subscription",
								"ContextID" : title.textContent,  
								"Status" : "Active",
								"Type" : "Intent - "+prodBtn?.innerHTML?.trim(),
								"Key" : "PrimaryIntent",
								"Value" : sPrimNode.querySelector("IntentCDHCode")?.innerHTML?.trim()	
							}
							]);
						  selectedAnswers[key] = optint.options[0];
						  localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));

						  optintBlock.querySelectorAll("button").forEach(btn => btn.classList.remove("label-med-default-selected"));
						  optintBtn.classList.add("label-med-default-selected");
		
						  
							block.querySelectorAll(".question-block-child:not(:first-child)").forEach(el => el.remove());
							prod.questions.filter(q => q.answer.trim().toLowerCase() === optintBtnTxt.toLowerCase()).forEach(q => {
								
								const scodeElement = sPrimNode.querySelector("IntentCDHQuestionCode");
								const isQuestionCodeYN = scodeElement?.innerHTML?.trim();
								if(isQuestionCodeYN === q.isCDHQuestionCode)
								{
									const qBlock = document.createElement("div");
									qBlock.className = "question-block-child";

									const qLabel = document.createElement("div");
									qLabel.className = "ParagraphBody1";

									if (q.isMandatory) 
									{
										const asterisk = document.createElement("span");
										asterisk.id = "vha-scj-step1-requiredfiled";
										asterisk.className  = "vha-scj-step1-requiredoptions";
										asterisk.textContent = "* ";
										qLabel.appendChild(document.createTextNode(q.question)); // temporarily add text
										qLabel.insertBefore(asterisk, qLabel.firstChild); // move asterisk to the beginning
									} else 
									{
										const optionalText = `${q.question} `;
									  	qLabel.textContent = optionalText;
									}

									const optBlock = document.createElement("div");
									optBlock.className = "button-block-child";
									const key = `${nextNum}-${q.question}`;
									//selectedAnswers[key] = "";
									Object.keys(selectedAnswers).forEach(key => {
									  if (!key.startsWith(`${nextNum}-PrimaryIntent`)) {
									    delete selectedAnswers[key];
									  }
									});

									if (q.options.length <= 5) 
									{
										q.options.forEach((opt, index) => {
											const optBtn = document.createElement("button");
											optBtn.className = "optionbutton label-med-default-enabled newservice ParagraphBody1";
											optBtn.textContent = opt;
											
											
											 /*if (index === 0) {
											    optBtn.classList.add("firstoption");
											  }
											 if (index === q.options.length - 1) {
											    optBtn.classList.add("lastoption");
											  }*/


											if (selectedAnswers[key] === opt) {
											  optBtn.classList.add("label-med-default-selected");
											}

											optBtn.addEventListener("click", () => {
											  //const newService = this.closest(".service-container").find(".service-header").first().text().trim();
											  recomJson = setContexts([
												{
													"ContextLevel" : "Subscription",
													"ContextID" : title.textContent,  
													"Status" : "Active",
													"Type" : "Intent-"+prodBtn?.innerHTML?.trim(),
													"Key" : "SecondaryIntent-"+q.isQuestionCode,
													"Value" : q.isSecIntCDHCode[index]
												}
											  ]);
												 copyJson = setIntents([
												{
													"ContextLevel" : "Subscription",
													"ContextID" : title.textContent,  
													"Status" : "Active",
													"Type" : "Intent - "+prodBtn?.innerHTML?.trim(),
													"Key" : "SecondaryIntent - "+q.isQuestionCode,
													"Value" : q.isSecIntCDHCode[index]
												}
											  ]);
											  selectedAnswers[key] = opt;
											  localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));

											  /*block.querySelectorAll(".question-block-child:not(:first-child)").forEach(el => 
												el.querySelectorAll(".button-block-child").forEach(btnchild => 
													btnchild.querySelectorAll("button").forEach(btn => btn.classList.remove("label-med-default-selected")))
											  );*/
											  optBlock.querySelectorAll("button").forEach(btn => btn.classList.remove("label-med-default-selected"));
											  optBtn.classList.add("label-med-default-selected");
											  validateRequiredAnswers(); 
											});

											optBlock.appendChild(optBtn);
										});
									} 
									else 
									{
										// Use dropdown only
										const dropdown = document.createElement("select");
										dropdown.className = "optiondropdown ParagraphBody1";

										q.options.forEach((opt, index) => {
											const option = document.createElement("option");
											option.value = opt;
											option.textContent = opt;
											option.setAttribute("data-index", index);
											dropdown.appendChild(option);
										});

										dropdown.addEventListener("change", () => {
											/*const selected = dropdown.value;
											selectedAnswers[key] = selected;
											localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));*/
											const selectedOption = dropdown.options[dropdown.selectedIndex];
											const selected = selectedOption.value;
											const selectedIndex = selectedOption.getAttribute("data-index");
											selectedAnswers[key] = {
											value: selected,
											index: parseInt(selectedIndex, 10)
											};

											localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));

											recomJson = setContexts([
												{
													"ContextLevel" : "Subscription",
													"ContextID" : title.textContent,  
													"Status" : "Active",
													"Type" : "Intent-"+prodBtn?.innerHTML?.trim(),
													"Key" : "SecondaryIntent-"+q.isQuestionCode,
													"Value" : q.isSecIntCDHCode[selectedIndex]
												}
											]);
											copyJson = setIntents([
												{
													"ContextLevel" : "Subscription",
													"ContextID" : title.textContent,  
													"Status" : "Active",
													"Type" : "Intent - "+prodBtn?.innerHTML?.trim(),
													"Key" : "SecondaryIntent - "+q.isQuestionCode,
													"Value" : q.isSecIntCDHCode[selectedIndex]
												}
											]);
											
										});
										optBlock.appendChild(dropdown);
									}
									qBlock.appendChild(qLabel);
									qBlock.appendChild(optBlock);
									block.appendChild(qBlock);
								}
								//});
							});  
						  //validateRequiredAnswers(); 
						});
						
						optintBlock.appendChild(optintBtn);
						
					});
					block.appendChild(primqblock);
					block.appendChild(optintBlock);
				});

				productBtnContainer.appendChild(prodBtn);
			});
			
			 // Add toggle logic
			header.addEventListener("click", (e) => {
				if (e.target !== removeBtn) {
				  const isVisible = body.style.display !== "none";
				  body.style.display = isVisible ? "none" : "block";
				  toggleIcon.src = isVisible ? "images/custom/vha-ign-expaneded_20_20.svg" : "images/custom/vha-ign-colapsed_20_20.svg";
				}
			});
			  
			block.appendChild(productBtnContainer);
			body.appendChild(block);
			serviceDiv.appendChild(header);
			serviceDiv.appendChild(body);
			document.getElementById("vha-ign-addnewservicesid").appendChild(serviceDiv);
		});
		
		document.getElementById("vha-ign-pausebutton").addEventListener("click", () => {
		  localStorage.setItem("pausedByUser", "true");
		  // Your existing pause logic here
		});
			
		/*$("#vha-scj-step2-address").autocomplete({
		   
				source: VHASSJAddressSearch.SelectAddress,
				minLength: 10,
				select: VHASSJAddressSearch.HandleAddressSelection

		});*/
		
		// ADDED by sbabu
	$("#vha-scj-step2-address").autocomplete({
					  source: function (request, response) {
						   var sResp = VHAAppUtilities.doSearchAddress(request, false);
						   $("a.siebui-icon-location").remove();
						   $(".ccNwkpar").remove();
						   SiebelApp.S_App.SetProfileAttr("URL1", "");
						   if (sResp != false) {
							   let response1 = (VHAAppUtilities.doSearchAddress(request, false));
							   //response1.push({id:"addressnotfound",value:"Can?t find address? Enter address manually",isButton: true});
							   response(response1);
						   } else { 
							   response([]);
						   }
						   isQAS = "Y";
					   },
		                 minLength: 10,
					select: function (event, ui) {
						   if(ui.item.id != "addressnotfound")
						   {
							$('.ssjautocomplete').removeClass('ssjautocomplete'); 
						   $("#maskoverlay").styleShow();
						   tssleep(30).then(() => {
							   var sResp = VHAAppUtilities.getAddress(ui);
							   var this_t = this;
							   sAddr = this_t.value;
							   var SearchString = "[List Of Values.Type]='VHA_AUTO_COVRGE_CHK' AND [List Of Values.Active]='Y'";
							   var sLovFlg = VHAAppUtilities.GetPickListValues("", SearchString);
							   if (sLovFlg == "ON") {
								   //VHACovergaeCheck(sResp, this_t);
							   }
							   coverageCheckRes = sResp; //added by vinay kumar
							   if (sResp != false) {
								   var sAddrAllowedFlg = 'Y';
								   $.map(sResp.address.properties, function (i, j) {
									   if (j == "postal_delivery_type" && i != null && i != "") {
										   sAddrAllowedFlg = 'N';
									   }
								   });
								   if (sAddrAllowedFlg == "Y") {
									   var NBNLoc = "";
									   TriggerNBNAddress();
								   } else {
									   alert("Invalid Address Type. Address must have type as Street or Rural.");
									   return false;
								   }
							   } 
						   });
						 }
						 else{
							 alert("View navigation need to be configured");
						 }
					   }
		});
		
		function TriggerNBNAddress() 
			   {
				   var sInterfaceCallBS = "Workflow Process Manager";
				   var WFProcessName = "VHA Generic VBC";
				   var BOMap = "VHA VBC Generic";
				   var BO = "VHA VBC Generic";
				   var BCMap = "List Of Values";
				   var BC = "VF Transaction Settings";
				   var sIntCallInputs = SiebelApp.S_App.NewPropertySet();
				   var sIntCallOutputs = SiebelApp.S_App.NewPropertySet();
   
				   var ser = SiebelApp.S_App.GetService(sInterfaceCallBS);
				   //var propName = Inputs.GetFirstProperty();
				   sIntCallInputs.SetProperty("Service Name", sInterfaceCallBS);
				   sIntCallInputs.SetProperty("Method Name", "Run Process");
   
				   //sIntCallInputs.SetProperty("SessionId",sessionId);
				   sIntCallInputs.SetProperty("ProcessName", WFProcessName);
				   sIntCallInputs.SetProperty("BusObjectMap", BOMap);
				   sIntCallInputs.SetProperty("BusObject", BO);
				   sIntCallInputs.SetProperty("BusCompMap", BCMap);
				   sIntCallInputs.SetProperty("BusComp", BC);
				   sIntCallInputs.SetProperty("ManualSearch", 'Y');
				   sIntCallInputs.SetProperty("TransactionName", "VHA NBN Query Address");
				   sIntCallInputs.SetProperty("TransactionType", "VBC_QUERY");
				   sIntCallInputs.SetProperty("LOVType", "VHA_NBN_TOUCHPOINT");
   
					   var sRespUnitType = coverageCheckRes.address.properties.complex_unit_type;
					   var sRespUnitIden = coverageCheckRes.address.properties.complex_unit_identifier;
					   var sRespComType = coverageCheckRes.address.properties.complex_level_type;
					   var sStreet1 = coverageCheckRes.address.properties.street_number_1;
					   var sStreet2 = coverageCheckRes.address.properties.street_number_2;
					   var sLotIden = coverageCheckRes.address.properties.lot_identifier;
   
					   var sFloorType = (sRespUnitType !== null) ? sRespUnitType : (sRespUnitIden !== null) ? "Unit" : sRespComType;
					   var sFloor = (sRespUnitType !== null) ? sRespUnitIden : (sRespUnitIden !== null) ? sRespUnitIden : sRespComType;
					   var sStreetNum = (sStreet1 === null) ? "LOT" + sLotIden : (sStreet2 !== null) ? sStreet1 + "-" + sStreet2 : sStreet1;
   
					   sFloorType = (sFloorType != null) ? mCamelCase(sFloorType) : "";
					   sFloor = (sFloor != null) ? mCamelCase(sFloor) : "";
   
					   var sSuburb = coverageCheckRes.address.properties.locality_name;
					   var sStreetName = coverageCheckRes.address.properties.street_name;
					   var sStreetType = coverageCheckRes.address.properties.street_type_description;
					   var sBuildingName = coverageCheckRes.address.properties.site_name;
					   var sUnitType = sFloorType;
					   var sUnitNumber = sFloor;
					   var sBuildingNumber = sStreetNum;
					   var sPostcode = coverageCheckRes.address.properties.postcode;
					   var sState = coverageCheckRes.address.properties.state_territory;
					   
					   sSuburb = (sSuburb != null) ? sSuburb : "";
					   sStreetName = (sStreetName != null) ? sStreetName : "";
					   sStreetType = (sStreetType != null) ? sStreetType : "";
					   sBuildingName = (sBuildingName != null) ? sBuildingName : "";
					   sStreetType = (sStreetType != null) ? mCamelCase(sStreetType) : "";
					   sRespUnitType = (sRespUnitType != null) ? mCamelCase(sRespUnitType) : "";
					   sRespComType = (sRespComType != null) ? mCamelCase(sRespComType) : "";
   
					   function mCamelCase(str) {
						   var sWrdsArr = str.split(' ');
						   str = "";
						   $.each(sWrdsArr, function (ind, val) {
							   if (ind != 0)
								   str = str + " " + val[0].toUpperCase() + val.toLowerCase().substring(1);
							   else
								   str = str + val[0].toUpperCase() + val.toLowerCase().substring(1);
						   });
						   return str;
					   }
					   
					   sIntCallInputs.SetProperty("Value", "VHANBNAddressMapQASNewCustomer");
					   sIntCallInputs.SetProperty("PropSet1", sSuburb);
					   sIntCallInputs.SetProperty("PropSet2", sStreetName);
					   sIntCallInputs.SetProperty("PropSet3", sStreetType);
					   sIntCallInputs.SetProperty("PropSet4", sBuildingName);
					   sIntCallInputs.SetProperty("PropSet5", sUnitType);
					   sIntCallInputs.SetProperty("PropSet6", sUnitNumber);
					   sIntCallInputs.SetProperty("PropSet7", sBuildingNumber);
					   sIntCallInputs.SetProperty("PropSet8", sPostcode);
					   sIntCallInputs.SetProperty("PropSet9", sState);
					   sIntCallInputs.SetProperty("PropSet10", "");
					   sIntCallInputs.SetProperty("PropSet11", "");
					   sIntCallInputs.SetProperty("PropSet12", "");
					   sIntCallInputs.SetProperty("PropSet13", "");
					   sIntCallInputs.SetProperty("PropSet14", "");
					   sIntCallInputs.SetProperty("PropSet15", "");
					   sIntCallInputs.SetProperty("PropSet16", "");
					   
					   var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
					   //sIntCallInputs = SiebelApp.S_App.NewPropertySet();
					   sIntCallInputs.SetProperty("Service Name", "VHA Sales Calculator BS");
					   sIntCallInputs.SetProperty("Method Name", "VHAOneSQRESTAPI");
					   sIntCallInputs.SetProperty("PropSet27", "XYZ");
					   sIntCallInputs.SetProperty("orderId",OrderId);	
					   sIntCallInputs.SetProperty("PropSet26", "Addr");					
					   sIntCallInputs.SetProperty("PropSet10", coverageCheckRes.address.properties.street_number_1);					
					   sIntCallInputs.SetProperty("PropSet23", coverageCheckRes.address.properties.address_identifier);					
					   sIntCallInputs.SetProperty("PropSet24", coverageCheckRes.address.geometry.coordinates[1]);					
					   sIntCallInputs.SetProperty("PropSet25", coverageCheckRes.address.geometry.coordinates[0]);
						if(SiebelApp.S_App.GetProfileAttr("MultiaddLocID") != "")
						{
							sIntCallInputs.SetProperty("NBN Location Id", SiebelApp.S_App.GetProfileAttr("MultiaddLocID"));
							TheApplication().SetProfileAttr("PickLocId", SiebelApp.S_App.GetProfileAttr("MultiaddLocID"));					
								
							sIntCallInputs.SetProperty("suburb", SiebelApp.S_App.GetProfileAttr("Locality Suburb Name"));
							sIntCallInputs.SetProperty("streetName", SiebelApp.S_App.GetProfileAttr("Street Road Name"));
							sIntCallInputs.SetProperty("streetType", sStreetType);
							sIntCallInputs.SetProperty("buildingName", sBuildingName);
							sIntCallInputs.SetProperty("unitType", SiebelApp.S_App.GetProfileAttr("Unit Type"));
							sIntCallInputs.SetProperty("unitNumber", SiebelApp.S_App.GetProfileAttr("Unit Number"));
							sIntCallInputs.SetProperty("streetNumber", SiebelApp.S_App.GetProfileAttr("Street Road Number1"));
							sIntCallInputs.SetProperty("postcode", SiebelApp.S_App.GetProfileAttr("Post Code"));
							sIntCallInputs.SetProperty("state", SiebelApp.S_App.GetProfileAttr("State Territory Code"));
							sIntCallInputs.SetProperty("allotmentNumber", SiebelApp.S_App.GetProfileAttr("Lot Number"));
							sIntCallInputs.SetProperty("streetNumber", SiebelApp.S_App.GetProfileAttr("Secondary Road Number"));
							sIntCallInputs.SetProperty("streetName", SiebelApp.S_App.GetProfileAttr("Secondary Road Name"));
							sIntCallInputs.SetProperty("streetType", SiebelApp.S_App.GetProfileAttr("Secondary Road Type Code"));
							sIntCallInputs.SetProperty("secondaryComplexName", SiebelApp.S_App.GetProfileAttr("Secondary Site Building Name"));
							sIntCallInputs.SetProperty("buildingLevelType", SiebelApp.S_App.GetProfileAttr("Level Type"));
							sIntCallInputs.SetProperty("buildingLevelNumber", SiebelApp.S_App.GetProfileAttr("Level Number"));
								
						}					   
					   var OutputsResp = ser.InvokeMethod("Run Process", sIntCallInputs);  
					   // added by vinay kumar
					   if(SiebelApp.S_App.GetProfileAttr("MultiAddr") == 'Y' && SiebelApp.S_App.GetProfileAttr("MultiaddLocID") == "")
						{
							var multiAddData = OutputsResp.GetChild(0).GetChild(0).GetChild(0).GetChild(0).GetChild(0).childArray;
							if(multiAddData != undefined)
							{
								var selectth = '<div class="main-bg-grey mt-5 pt-3 mutiAddressPopup" id="HomeAuthent" style="z-index: 9999;position: relative;"><div id="table-myModal" class="modal"><div class="table-modal-content" style="height:80%;overflow-y: scroll;"><h4 class="fs-1 pb-4 pl-4"><strong>Select a Address</strong></h4><div><span class="vha-popup-close mt-n65px mt-1 ml-668px vhaAddressClose" id="vha-ret-table-close-btn">X</span></div><div class="fs-1 fw-bold pb-4 ll-4"></div><table class="table table-bordered width-80p bg-white vha-ret-table-authen"><thead><tr><th>Address</th><th>Network</th><th>Location ID</th><th>Select</th></tr></thead><tbody></tbody></table><button class="skip vha-ret-popup-close-btn-home vhaAddressClose" id="vha-cont-prof-skipbtn-home">Cancel</button></div></div></div>';
								$('body').append(selectth);
								
								$.each(multiAddData, function (index, item) {
									 var row = $("<tr class='siebui-form' data-index='0' data-item=''>").attr("data-index", index);

									 if(item.propArray['NBN Location Id'].substring(0, 3) == "LOC"){ var networkName = "NBN" }
									 else if(item.propArray['NBN Location Id'].substring(0, 3) == "OPC"){ var networkName = "OPTICOMM" }
									 else{ var networkName = "VISION" }

									 var multiUnitType = item.propArray['Unit Type'] !== undefined ? item.propArray['Unit Type'] : "";
									 var multiUnitNum = item.propArray['Unit Number'] !== undefined ? item.propArray['Unit Number']+", " : "";
									  var multiUnitNumber = item.propArray['Unit Number'] !== undefined ? item.propArray['Unit Number'] : "";
									 var multiStNum = item.propArray['Street Road Number1'] !== undefined ? item.propArray['Street Road Number1'] : "";
									 var multiStName = item.propArray['Street Road Name'] !== undefined ? item.propArray['Street Road Name'] : "";
									 var multiStRdType = item.propArray['Street Road Type Code'] !== undefined ? item.propArray['Street Road Type Code']+", " : "";
									 var multiSubrub = item.propArray['Locality Suburb Name'] !== undefined ? item.propArray['Locality Suburb Name'] : "";
									 var multiStTeritCode = item.propArray['State Territory Code'] !== undefined ? item.propArray['State Territory Code'] : "";
									 var multiPostCode = item.propArray['Post Code'] !== undefined ? item.propArray['Post Code'] : "";
									 var multiLotNum = item.propArray['Lot Number'] !== undefined ? "Lot "+item.propArray['Lot Number']+", " : "";
									 var multiLotNumber = item.propArray['Lot Number'] !== undefined ? item.propArray['Lot Number']: "";
									 var multiLevelType = item.propArray['Level Type'] !== undefined ? item.propArray['Level Type'] : "";									 
									 var multiLevelNum = item.propArray['Level Number'] !== undefined ? item.propArray['Level Number'] : "";
									 if(multiLevelType != "" && multiLevelNum !=""){
									  var multiLevel = "("+multiLevelType+multiLevelNum+ ")";
									 }else if(multiLevelType == "" &&  multiLevelNum !="")
									 {
										 var multiLevel = "("+multiLevelType+ ")";
									 }
									 else if(multiLevelType != "" &&  multiLevelNum =="")
									{
										var multiLevel = "("+multiLevelNum+ ")";
									}
									else{
										var multiLevel = "";
									}
									 var multiAddSiteBuildName = item.propArray['Address Site Building Name'] !== undefined ? item.propArray['Address Site Building Name'] : "";
									 var multiSecRoadNum1 = item.propArray['Secondary Road Number1'] !== undefined ? item.propArray['Secondary Road Number1'] : "";
									 var multiSecRoadNum2 = item.propArray['Secondary Road Number2'] !== undefined ? "-"+item.propArray['Secondary Road Number2']+", ": "";
									 var mulSecroadNumber = multiSecRoadNum1 + multiSecRoadNum2;
									 var multiSecRoadName = item.propArray['Secondary Road Name'] !== undefined ? item.propArray['Secondary Road Name'] : "";
									 var multiSecRoadTypeCode = item.propArray['Secondary Road Type Code'] !== undefined ? item.propArray['Secondary Road Type Code']+", " : "";
									 var multiSecSiteBuildName = item.propArray['Secondary Site Building Name'] !== undefined ? item.propArray['Secondary Site Building Name'] : "";
									 
									 row.append($("<td style='vertical-align:middle'>").text(multiUnitType +" "+multiUnitNum+multiLotNum+multiStNum +" "+multiStName+" "+multiStRdType+multiSubrub+" "+multiStTeritCode+" "+multiPostCode+mulSecroadNumber+" "+multiSecRoadName+" "+multiSecRoadTypeCode+" "+multiSecSiteBuildName+" "+multiLevel));
																		 
									 row.append($("<td style='vertical-align:middle'>").text(networkName));
									 row.append($("<td style='vertical-align:middle'>").text(item.propArray['NBN Location Id']));
									 row.append($("<td class='mceField'><button type='button' class='siebui-ctrl-btn siebui-icon-selectAddress  appletButton multiSelectBtn' data-lid='"+item.propArray['NBN Location Id']+"' data-sroadn1='"+multiStNum+"' data-sroadn='"+multiStName+"' data-subrub='"+multiSubrub+"' data-utype='"+multiUnitType+"' data-unumber='"+multiUnitNumber+"' data-stcode='"+multiStTeritCode+"' data-sttypecode='"+multiStRdType+"'  data-pocode='"+multiPostCode+"' data-lotNum='"+multiLotNumber+"'  data-secRdNum='"+mulSecroadNumber+"' data-multiSecRoadTypeName='"+multiSecRoadName+"'  data-multiSecRoadTypeCode='"+multiSecRoadTypeCode+"' data-multisecBuildName='"+multiSecSiteBuildName+"'   data-multisecLevelType='"+multiLevelType+"'     data-multisecLevelNum='"+multiLevelNum+"'  id='multiSelectAddBtn' name='Select' data-display='Select' tabindex='0' title='Select' aria-label='Select' ><span>Select</span></button>"));
																					 
									 $(".vha-ret-table-authen tbody").append(row);
								});
								
								$(".vhaAddressClose").on("click", function () {
									$(".mutiAddressPopup").addClass("displaynone");
									$('.mutiAddressPopup').remove();
								});
								$('.multiSelectBtn').on('click',function(){
									$(".mutiAddressPopup").addClass("displaynone");
									
									$('.mutiAddressPopup').remove();
									SiebelApp.S_App.SetProfileAttr("MultiaddLocID",$(this).attr("data-lid"));									
									SiebelApp.S_App.SetProfileAttr("Street Road Number1",$(this).attr("data-sroadn1"));
									SiebelApp.S_App.SetProfileAttr("Street Road Name",$(this).attr("data-sroadn"));
									SiebelApp.S_App.SetProfileAttr("Locality Suburb Name",$(this).attr("data-subrub"));
									SiebelApp.S_App.SetProfileAttr("State Territory Code",$(this).attr("data-stcode"));
									SiebelApp.S_App.SetProfileAttr("Unit Type",$(this).attr("data-utype"));
									SiebelApp.S_App.SetProfileAttr("Unit Number",$(this).attr("data-unumber"));
									SiebelApp.S_App.SetProfileAttr("Post Code",$(this).attr("data-pocode"));
									SiebelApp.S_App.SetProfileAttr("Street Road Type Code",$(this).attr("data-sttypecode"));	
									SiebelApp.S_App.SetProfileAttr("Lot Number",$(this).attr("data-lotNum"));
									//SiebelApp.S_App.SetProfileAttr("Secondary Road Number1",$(this).attr("data-secRdNum1"));
									SiebelApp.S_App.SetProfileAttr("Secondary Road Number",$(this).attr("data-mulSecroadNumber"));
									SiebelApp.S_App.SetProfileAttr("Secondary Road Name",$(this).attr("data-multiSecRoadTypeName"));
									SiebelApp.S_App.SetProfileAttr("Secondary Road Type Code",$(this).attr("data-multiSecRoadTypeCode"));
									SiebelApp.S_App.SetProfileAttr("Secondary Site Building Name",$(this).attr("data-multisecBuildName"));
									SiebelApp.S_App.SetProfileAttr("Level Type",$(this).attr("data-multisecLevelNum"));
									SiebelApp.S_App.SetProfileAttr("Level Number",$(this).attr("data-sttypecode"));
									
									TriggerNBNAddress();
								})
							}
						}// edded multi address
					   nbnResp = OutputsResp; // added by vinay kumar
					   newAddressFlag = true;
					   intentQuesPsma = true;
                       $('#vha-ign-coveragecheck').prop('disabled',false);
			   }
	
		function validateRequiredAnswers() {
			let allAnswered = true;

			const serviceContainers = document.querySelectorAll(".service-container");

			serviceContainers.forEach((container, index) => {
			const serviceIndex = index + 1; // 1-based index to match your key format

			const requiredLabels = container.querySelectorAll(".vha-scj-step1-requiredoptions");

			requiredLabels.forEach(label => {
			  const questionText = label.parentElement.textContent.trim().replace("*", "").trim();
			  const key = `${serviceIndex}-${questionText}`;

			  const answer = selectedAnswers[key];
			  if (!answer || answer.trim() === "") {
				allAnswered = false;
			  }
			});
			});

			const submitBtn = document.getElementById("vha-ign-getrecombutton"); // Replace with actual ID
			if (submitBtn) {
			submitBtn.disabled = !allAnswered;
			}
		}	

    }

    VHARecommendationsViewPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHARecommendationsViewPR.superclass.BindData.apply(this, arguments);
    }

    VHARecommendationsViewPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHARecommendationsViewPR.superclass.BindEvents.apply(this, arguments);
	 //added for select button manual address by vinay kumar
	 $(document).on("click", 'button[title="Check Address with Fixed List Applet:Select"]', function () {
			    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			    var psInp = SiebelApp.S_App.NewPropertySet();
			    psInp.SetProperty("Service Name", "VF REST API Wrapper Service");
			    psInp.SetProperty("OrderId", OrderId);
			    psInp.SetProperty("Method Name", "GetOneSQRespPega");
			    var sOutput = ser.InvokeMethod("Run Process", psInp);
                sManualAddrRes = sOutput;
		        newAddressFlag = true;
		    $('#vha-scj-step2-address').val(sOutput.childArray[0].propArray.formed_fulladdress);
		      enableGetrecomBtn();
			});// ended nutton
			
	    document.addEventListener("change", function(e) {
			if (e.target.classList.contains("vha-ign-chckbox")) {
			  if (e.target.checked) {
				var chkbutton = "";
				const questionBlock = e.target.closest(".vha-ign-questionblock");
				if (!questionBlock) return;
				// Find the next sibling (answercontainer)
				const nextDiv = questionBlock.nextElementSibling;
				if (nextDiv && nextDiv.className.includes("vha-ign-answercontainer")) {
					  // Find button inside it
				      chkbutton = nextDiv.querySelector("button[id^='secIntent_']");
				      var $section = $(e.target).closest('.vha-ign-eachservicesection');
					  var sSvcNo = $section.find('.vha-ign-eachservicesection-cls').attr('serviceid').slice(-1);
					  var sAsset = sServiceHier[sSvcNo];
					  var sId = $section.find(".vha-ign-primaryintentmain .vha-ign-primaryintent .label-med-default-selected").attr('id').slice(-1);
					  var sSelPrimInt = sPrimaryIntent[sId];
					  var sSelSecIntId = chkbutton.id.split("_")[1];
					  var sSelSecIntArray = sSelPrimInt.childArray[0].childArray;
					  sSelSecIntArray.sort((a, b) => {
							const orderA = parseInt(a.propArray["Order By"], 10) || 0;
							const orderB = parseInt(b.propArray["Order By"], 10) || 0;
							return orderA - orderB;
						});
					  var sSelSecIntAnsId = chkbutton.id.slice(-1);
					  var sSelSecIntAnsArray = sSelSecIntArray[sSelSecIntId].childArray[0].childArray;
					  sSelSecIntAnsArray.sort((a, b) => {
							const orderA = parseInt(a.propArray["Order By"], 10) || 0;
							const orderB = parseInt(b.propArray["Order By"], 10) || 0;
							return orderA - orderB;
						});
			 
					  recomJson = setContexts([
						{
							"ContextLevel" : "Subscription",
							"ContextID" : $section.find('[id^="Ser"]').first().text().trim(),
							"Status" : "Active",
							"Type" : "Intent-"+sAsset.propArray["Product Desc Calc"],
							"Key" : "SecondaryIntent-"+sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Intent Question Code"],
							"Value" : "Yes"//sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Intent CDH Code"]
						}
					  ]);
				} 
			  } 
			  if (!e.target.checked) {
				// Step 1: Find the parent service section
				var $section = $(e.target).closest('.vha-ign-eachservicesection');
				const serviceSection = $section.find(".vha-ign-eachservicesection-cls");
		 
				// Step 2: Get ContextId from the span
				const contextId = serviceSection.find("span[id^='Ser']").text().trim();
		 
				// Step 3: Loop through JSON and set status to "Inactive"
				const intqueexp = e.target.closest('.vha-ign-intqueexp');
				let quespan;
				if(intqueexp)
					quespan = intqueexp.querySelector('.vha-ign-intque');
				const queText = quespan ? quespan.textContent.trim() : "";
				recomJson.Contexts.forEach(item => {
					if(item.ContextID === contextId && queText.includes("Change of Technology") && item.Key.toLowerCase().includes("techchange")) {
						item.Status = "Inactive";
					}
					else if(item.ContextID === contextId && queText.includes("Moving House") && item.Key.toLowerCase().includes("movinghouse")) {
						item.Status = "Inactive";
					}
				});
			  }
			}
		});
		// Bind click event for dynamically generated buttons
		$(document).on("click", "button.vha-ign-btn", function () {
		  const $btn = $(this);
		  const intentData = {
			type: "button",
			value: $btn.text(),
			id: $btn.attr("id"),
			questionIndex: extractIndexFromId($btn.attr("id"))
		  };
		  handleIntentSelection($btn, intentData);
		  var $section = $(this).closest('.vha-ign-eachservicesection');
		  var sSvcNo = $section.find('.vha-ign-eachservicesection-cls').attr('serviceid').slice(-1);
		  var sAsset = sServiceHier[sSvcNo];
		  var sId = $section.find(".vha-ign-primaryintentmain .vha-ign-primaryintent .label-med-default-selected").attr('id').slice(-1);
		  var sSelPrimInt = sPrimaryIntent[sId];
		  var sSelSecIntId = intentData.id.split("_")[1];
		  var sSelSecIntArray = sSelPrimInt.childArray[0].childArray;
		  sSelSecIntArray.sort((a, b) => {
				const orderA = parseInt(a.propArray["Order By"], 10) || 0;
				const orderB = parseInt(b.propArray["Order By"], 10) || 0;
				return orderA - orderB;
			});
		  var sSelSecIntAnsId = intentData.id.slice(-1);
		  var sSelSecIntAnsArray = sSelSecIntArray[sSelSecIntId].childArray[0].childArray;
		  var copysSelSecIntAnsArray = sSelSecIntArray[sSelSecIntId].propArray;
		  sSelSecIntAnsArray.sort((a, b) => {
				const orderA = parseInt(a.propArray["Order By"], 10) || 0;
				const orderB = parseInt(b.propArray["Order By"], 10) || 0;
				return orderA - orderB;
			});
		 copysSelSecIntAnsArray.sort((a, b) => {
				const orderA = parseInt(a.propArray["Order By"], 10) || 0;
				const orderB = parseInt(b.propArray["Order By"], 10) || 0;
				return orderA - orderB;
			});
		  recomJson = setContexts([
			{
				"ContextLevel" : "Subscription",
				"ContextID" : $section.find('[id^="Ser"]').first().text().trim(),
				"Status" : "Active",
				"Type" : "Intent-"+sAsset.propArray["Product Desc Calc"],
				"Key" : "SecondaryIntent-"+sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Intent Question Code"],
				"Value" : sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Intent CDH Code"]
			}
		  ]);

			copyJson = setIntents([
				{
				
				"ContextLevel" : "Subscription",
				"ContextID" : $section.find('[id^="Ser"]').first().text().trim(),
				"Status" : "Active",
				"Type" : "Intent - "+sAsset.propArray["Product Desc Calc"],
				"device" : sAsset.propArray["Device Name"],
				"plan" : sAsset.propArray["VF Rate Plan"],
				"Key" : "SecondaryIntent - "+sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Intent Question Code"],
				"question": copysSelSecIntAnsArray["Intent Question"],
				"Value" : sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Secondary Intent Answers"]
				}
				
			]);
		});
		// Bind change event for dynamically generated dropdowns
		$(document).on("change", ".vha-ign-dropdown", function () {
		  const $dropdown = $(this);
		  const selectedOption = $dropdown.find("option:selected");
		  const intentData = {
			type: "dropdown",
			value: selectedOption.text(),
			id: selectedOption.attr("id"),
			questionIndex: extractIndexFromId(selectedOption.attr("id"))
		  };
		  handleIntentSelection($dropdown, intentData);
		  var $section = $(this).closest('.vha-ign-eachservicesection');
		  var sSvcNo = $section.find('.vha-ign-eachservicesection-cls').attr('serviceid').slice(-1);
		  var sAsset = sServiceHier[sSvcNo];
		  var sId = $section.find(".vha-ign-primaryintentmain .vha-ign-primaryintent .label-med-default-selected").attr('id').slice(-1);
		  var sSelPrimInt = sPrimaryIntent[sId];
		  var sSelSecIntId = intentData.id.split("_")[1];
		  var sSelSecIntArray = sSelPrimInt.childArray[0].childArray;
		  sSelSecIntArray.sort((a, b) => {
				const orderA = parseInt(a.propArray["Order By"], 10) || 0;
				const orderB = parseInt(b.propArray["Order By"], 10) || 0;
				return orderA - orderB;
			});
		  var sSelSecIntAnsId = intentData.id.slice(-1);
		  var sSelSecIntAnsArray = sSelSecIntArray[sSelSecIntId].childArray[0].childArray;
		 var copysSelSecIntAnsArray = sSelSecIntArray[sSelSecIntId].propArray;		  
		 sSelSecIntAnsArray.sort((a, b) => {
				const orderA = parseInt(a.propArray["Order By"], 10) || 0;
				const orderB = parseInt(b.propArray["Order By"], 10) || 0;
				return orderA - orderB;
			});
		  const nextDiv = this.nextElementSibling;
		  if(sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Secondary Intent Answers"] === "Change In Financial Circumstance (Hardship)")
		  {
			  nextDiv.classList.remove("VHAIGNDisplayNone");
		      //$('#vha-ign-getrecombutton').prop('disabled',true);
			 // sEnableGetRecom = "Y";
		  }
		  else
		  {
			  nextDiv.classList.add("VHAIGNDisplayNone");
			 // $('#vha-ign-getrecombutton').prop('disabled',false);
			 // sEnableGetRecom = "";
		  }
		copysSelSecIntAnsArray.sort((a, b) => {
				const orderA = parseInt(a.propArray["Order By"], 10) || 0;
				const orderB = parseInt(b.propArray["Order By"], 10) || 0;
				return orderA - orderB;
				});
		  recomJson = setContexts([
			{
				"ContextLevel" : "Subscription",
				"ContextID" : $section.find('[id^="Ser"]').first().text().trim(),
				"Status" : "Active",
				"Type" : "Intent-"+sAsset.propArray["Product Desc Calc"],
				"Key" : "SecondaryIntent-"+sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Intent Question Code"],
				"Value" : sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Intent CDH Code"]
			}
		  ]);
			copyJson = setIntents([
				{
				"ContextLevel" : "Subscription",
				"ContextID" : $section.find('[id^="Ser"]').first().text().trim(),
				"Status" : "Active",
				"Type" : "Intent - "+sAsset.propArray["Product Desc Calc"],
				"device" : sAsset.propArray["Device Name"],
				"plan" : sAsset.propArray["VF Rate Plan"],
				"Key" : "SecondaryIntent - "+sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Intent Question Code"],
				"question": copysSelSecIntAnsArray["Intent Question"],
				"Value" : sSelSecIntAnsArray[sSelSecIntAnsId].propArray["Secondary Intent Answers"]
				}
			]);
		});	
		$(document).on("change", ".vha-ign-eachservCheck", function (event) { 
			const currentCheck = event.currentTarget;
			const parentSection = $(currentCheck).closest('.vha-ign-eachservicesection-cls');
			const expImgParent = parentSection.find('.vha-ign-expimg').parent();

			if (currentCheck.checked) {
				expImgParent.removeClass('primary-disabled');
			} else {
				expImgParent.addClass('primary-disabled');
			}
			const isChecked = this.checked;
			// Step 1: Find the parent service section
			const serviceSection = $(this).closest(".vha-ign-eachservicesection-cls");
	 
			// Step 2: Get ContextId from the span
			const contextId = serviceSection.find("span[id^='Ser']").text().trim();
	 
			// Step 3: Loop through JSON and set status to "Inactive"
			//recomJson.ListOfVHANextBestActionRequest.NextBestActionRequest.ListOfContexts.Contexts.forEach(item => {
			recomJson.Contexts.forEach(item => {
				if (item.ContextID === contextId && item.ContextLevel === "Subscription") {
					item.Status = isChecked ? "Active" : "Inactive";
				}
			});
			copyJson.Contexts.forEach(item =>{
				if (item.ContextID === contextId && item.ContextLevel === "Subscription") {
					item.Status = isChecked ? "Active" : "Inactive";
				}
			});
		});
		$(document).on("click", ".vha-ign-expimg", function () {
			//var allData = JSON.parse(sessionStorage.getItem('intentState') || '[]');
			var eachData = sServiceData.find(d=>d.sectionId === $(this).closest(".vha-ign-eachservicesection").find('.vha-ign-eachservicesection-cls').attr('serviceid'))
			if(eachData && eachData.showIntents)
			{
				$(this).closest('.vha-ign-eachservicesection').find('.vha-ign-primaryintentmain').removeClass('VHAIGNDisplayNone');
				$(this).closest('.vha-ign-eachservicesection').find('.vha-ign-secondaryintent').removeClass('VHAIGNDisplayNone');
				$(this).addClass('VHAIGNDisplayNone');
				$(this).next().removeClass('VHAIGNDisplayNone');
			}	
			else
			{	
				//$(this).closest(".vha-ign-eachservicesection").find(".vha-ign-serhdr").remove();
				$(this).closest(".vha-ign-eachservicesection").find(".vha-ign-primaryintentmain").remove();
				$(this).closest('.vha-ign-eachservicesection').find('.vha-ign-secondaryintent').remove();
				var sSvcNo = $(this).parent().attr('id').slice(-1);
				var sAsset = sServiceHier[sSvcNo];
				var sProdSvcCnt = sAsset.childArray[0].GetChildCount();
				if(sProdSvcCnt>0)
				{
					var sProdSvcs = sAsset.childArray[0].childArray[0];
					//var sPrimaryIntCnt = sProdSvcs.childArray[0].GetChildCount();
					var sPrimIntAns = [];
					//var sIntQueCnt = [];
					var sIntQuestion1 = ""; 
					var sPrimAnsTemp = "";
					sortedPrimaryIntent = [...sProdSvcs.childArray[0].childArray].sort((a, b) => {
						const aOrder = parseInt(a.propArray?.["Order By"]) || 0;
						const bOrder = parseInt(b.propArray?.["Order By"]) || 0;
						return aOrder - bOrder;
					});
					for (var j = 0; j < sortedPrimaryIntent.length; j++) {
						const intent = sortedPrimaryIntent[j];
						sPrimaryIntent[j] = intent;
						//sPrimaryIntent[j] = sProdSvcs.childArray[0].childArray[j];
						sPrimIntAns[j] = intent.propArray["Primary Intent Answers"];
						
						/*var sSpecialCls = "";
						if (j === 0 ) {
							sSpecialCls = "firstoption";
						}
						if (j === sortedPrimaryIntent.length - 1) {
						    sSpecialCls = "lastoption";
						}*/
						sPrimAnsTemp = sPrimAnsTemp + "<div class = 'vha-ign-primaryintent'><button class = 'vha-ign-primintbtn optionbutton label-med-default-enabled' id = 'primint"+[j]+"'>"+sPrimIntAns[j]+"</button></div>";
						sIntQuestion1 = sExistingServiceLabel;//sPrimaryIntent[0].childArray[0].childArray[0].propArray["Intent Question"];
						expandtemp = "<div class = 'vha-ign-intqueexp vha-ign-margin10px ParagraphBody1' QuestionDivID= 'QueDivs" + [00] + "'><span id='vha-scj-step1-requiredfiled'>* </span><span class = 'vha-ign-intque' QuestionID='Que" + [00] + "'>"+sIntQuestion1+"</span></div>";
					}
					expandtemp = expandtemp+sPrimAnsTemp;
					expandtemp = "<div class = 'vha-ign-primaryintentmain ParagraphBody1 vha-ign-leftpadXL' id = 'vha-ign-primintid'>"+expandtemp+"</div>"+"<div class = 'vha-ign-secondaryintent ParagraphBody1 vha-ign-leftpadXL' id = 'vha-ign-secintid'></div>";
					//$(this).closest('.vha-ign-eachservicesection-cls').after("<div class = 'vha-ign-serhdr vha-service-header'></div>");
					//$(this).closest('.vha-ign-eachservicesection').find('.vha-ign-serhdr').after(expandtemp);
					$(this).closest('.vha-ign-eachservicesection').append(expandtemp);
					sPrimaryIntent.length = 0;
					sPrimaryIntent.push(...sortedPrimaryIntent);
				}
				//$('.vha-ign-intqueexp').removeClass('VHAIGNDisplayNone');
				$(this).closest('.vha-ign-eachservicesection').find('.vha-ign-primaryintentmain').removeClass('VHAIGNDisplayNone');
				$(this).closest('.vha-ign-eachservicesection').find('.vha-ign-secondaryintent').removeClass('VHAIGNDisplayNone');
				$(this).addClass('VHAIGNDisplayNone');
				$(this).next().removeClass('VHAIGNDisplayNone');
			}
		});
		$(document).on("click",".vha-ign-collapseimg",function(){
			$(this).addClass('VHAIGNDisplayNone');
			$(this).prev().removeClass('VHAIGNDisplayNone');
			var $section = $(this).closest('.vha-ign-eachservicesection');
			$section.find('.vha-ign-primaryintentmain').addClass('VHAIGNDisplayNone');
			$section.find('.vha-ign-secondaryintent').addClass('VHAIGNDisplayNone');
			//$section.find('.vha-ign-serhdr').removeClass("vha-service-header");
			captureIntentData($section);
		});
		$(".vha-ign-recm-C1-row3").off("click").on("click", "button.vha-ign-pagination-button", (e) => {
			if (e.target.tagName === "BUTTON" && e.target.dataset.page) {
				const selectedPage = parseInt(e.target.dataset.page);
				$(this).addClass('active');
				$(this).prev().removeClass('active');
				console.log("Go to page:", selectedPage);
				// Reload data or view based on selectedPage
			}
		});
		$(document).on("click", "button.vha-ign-primintbtn", function () {
			if(sPrimaryIntentFlag != "Y")
			{
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Outputs = SiebelApp.S_App.NewPropertySet()
				Inputs.SetProperty("ProcessName","VHA Pega Capture Intent Click WF");
				Inputs.SetProperty("OrderId",OrderId);
				Inputs.SetProperty("AgentId",LoginId);
				Inputs.SetProperty("IntentCaptureId",IntentCaptureId);
				Inputs.SetProperty("CustomerIntent","TRUE");
				Inputs.SetProperty("BillingAccountId",selectedBAcc);
				Outputs = ser.InvokeMethod("RunProcess", Inputs);
				var Result = Outputs.GetChildByType("ResultSet");
				sPrimaryIntentFlag = "Y";
			}
			var $Section = $(this).closest(".vha-ign-eachservicesection");
			$Section.find('.vha-ign-secondaryintent').find('div', 'select').remove();
			
			// Remove all dynamically generated secondary intent containers
			$Section.find('.vha-ign-answercontainer').remove();
			// Reset all primary intent buttons
			$Section.find('.vha-ign-primintbtn').removeClass('label-med-default-selected').addClass('optionbutton');
			// Reset all secondary intent buttons
			$Section.find('.vha-ign-btn').removeClass('label-med-default-selected').addClass('optionbutton');

			$(this).removeClass('optionbutton').addClass('label-med-default-selected');
			var sId = $(this).attr('id').slice(-1);
			var sSvcNo = $Section.find('.vha-ign-eachservicesection-cls').attr('serviceid').slice(-1);
			//console.log(sId);
			var sAsset = sServiceHier[sSvcNo];
			var sProdSvcCnt = sAsset.childArray[0].GetChildCount();
			if(sProdSvcCnt>0)
			{
				const sProdSvcs = sAsset.childArray[0].childArray[0];
				//const sPrimaryIntent = [];
				const sIntQuestions = [];
				const sImp = [];
				const j = sId;

				//sPrimaryIntent[j] = sProdSvcs.childArray[0].childArray[j];
				const sIntQueCnt = sPrimaryIntent[j].childArray[0].GetChildCount();
				const sortedIntents = [];
				for (var k = 0; k < sIntQueCnt; k++) {
					const intentNode = sPrimaryIntent[j].childArray[0].childArray[k];
					const orderByValue = intentNode.propArray["Order By"] || ""; 
					sortedIntents.push({ orderBy: orderByValue.trim(), node: intentNode });
				}
				sortedIntents.sort((a, b) => a.orderBy.localeCompare(b.orderBy));
				for (var k = 0; k < sortedIntents.length; k++) {
				  //const intentNode = sPrimaryIntent[j].childArray[0].childArray[k];
				  const intentNode = sortedIntents[k].node;
				  const questionText = intentNode.propArray["Intent Question"];
				  const isMandatory = intentNode.propArray["Is Mandatory"];
				  const sSecondaryIntent = intentNode.childArray[0];
				  const secondaryChildren = sSecondaryIntent?.childArray || [];
				  const parentQuestionCode = intentNode.propArray["Intent Question Code"];

				  sIntQuestions[k] = questionText;
				  sImp[k] = isMandatory;

				  // Render the question
				//const questionHTML = `<div class="vha-ign-questionblock" id="questionBlock_${k}"><div class="vha-ign-intqueexp vha-ign-margin10px ParagraphBody1" id="QueDivs${k}">${(isMandatory === "Y" || isMandatory === "true") ? "<span id='vha-scj-step1-requiredfiled'>* </span>" : ""}<span class="vha-ign-intque" QuestionID="Que${k}">${questionText}</span>${(isMandatory != "Y" && isMandatory != "true") ? "<span></span>" : ""}</div></div>`;
				var questionHTML = "";
				if(questionText.toLowerCase() === "change of technology" || questionText.toLowerCase() === "moving house")
					questionHTML = `<div class="vha-ign-questionblock" id="questionBlock_${k}"><div class="vha-ign-intqueexp vha-ign-margin10px ParagraphBody1" id="QueDivs${k}">${(isMandatory === "Y" || isMandatory === "true") ? "<span id='vha-scj-step1-requiredfiled'>* </span>" : ""}<span><input type="checkbox" class="vha-ign-chckbox"></span><span class="vha-ign-intque" QuestionID="Que${k}">${questionText}</span>${(isMandatory != "Y" && isMandatory != "true") ? "<span></span>" : ""}</div></div>`;
				else
					questionHTML = `<div class="vha-ign-questionblock" id="questionBlock_${k}"><div class="vha-ign-intqueexp vha-ign-margin10px ParagraphBody1" id="QueDivs${k}">${(isMandatory === "Y" || isMandatory === "true") ? "<span id='vha-scj-step1-requiredfiled'>* </span>" : ""}<span class="vha-ign-intque" QuestionID="Que${k}">${questionText}</span>${(isMandatory != "Y" && isMandatory != "true") ? "<span></span>" : ""}</div></div>`;
				  $(this).closest('.vha-ign-eachservicesection').find('.vha-ign-secondaryintent').append(questionHTML);

				  // Filter matching secondary answers
				  const matchingAnswers = secondaryChildren.filter(child =>
					child?.propArray?.["Intent Question Code"]?.toString().trim() === parentQuestionCode?.toString().trim()
				  );
				  matchingAnswers.sort((a, b) => {
					const aOrder = parseInt(a.propArray?.["Order By"] || 0, 10);
					const bOrder = parseInt(b.propArray?.["Order By"] || 0, 10);
					return aOrder - bOrder;
				  });
				  const count = matchingAnswers.length;
				  const className = "vha-ign-option";
				  const idPrefix = `secIntent_${k}_`;
				  const btnClass = "vha-ign-btn optionbutton label-med-default-enabled";
				  const dropdownClass = "vha-ign-dropdown optiondropdown ParagraphBody1";
				  const containerClass = `vha-ign-answercontainer_${k}`;

				  const $newDiv = $(`<div class="${containerClass}"></div>`);
				  $Section.find('.vha-ign-secondaryintent').append($newDiv);

				  if (count > 5) {
					// Render dropdown
					const $dropdown = $(`<select id="${className}" class="${dropdownClass}"></select>`);
					$dropdown.append(`<option value="" disabled selected hidden>Select</option>`);
					matchingAnswers.forEach((child, index) => {
					  const text = child.propArray["Secondary Intent Answers"];
					  if (text?.trim()) {
						$dropdown.append(`<option id="${idPrefix + index}">${text}</option>`);
					  }
					});
					const $canceldrpdwnmsg = $(`<div class = "vha-ign-finblock VHAIGNDisplayNone"><div class = "vha-ign-finmsg"><img src="images/custom/exclamationCircleIcon24_24.svg" id="vha-ign-finimg"><span class = "vha-ign-finmsg1">Action required: escalate to collection support</span></div><div class = "vha-ign-finmsg2"><span>Please transfer the call to the Collections Team so they can explain the next steps and offer support if available</span></div></div>`);
					$newDiv.append($dropdown);
					$newDiv.append($canceldrpdwnmsg);
				  } 
				  else if (count > 0 && count <= 5) {
					// Render buttons
					matchingAnswers.forEach((child, index) => {
					  const text = child.propArray["Secondary Intent Answers"];
					  if (text?.trim()) {
						//const specialCls = index === 0 ? "firstoption" : index === count - 1 ? "lastoption" : "";
						const buttonHTML = `<div class="${className}"><button class="${btnClass}" id="${idPrefix + index}">${text}</button></div>`;
						$newDiv.append(buttonHTML);
					  }
					});
					if(questionText.toLowerCase() === "change of technology" || questionText.toLowerCase() === "moving house"){
						$Section.find(`.vha-ign-secondaryintent .${containerClass}`).addClass("VHAIGNDisplayNone");
					}
				  } 
				  else {
						// Hide question and answers if no answers
						$Section.find(`#questionBlock_${k}`).addClass("VHAIGNDisplayNone");
						$Section.find(`.vha-ign-secondaryintent .${containerClass}`).addClass("VHAIGNDisplayNone");
				  }
				  
				}
				recomJson = setContexts([
				{
					"ContextLevel" : "Subscription",
					"ContextID" : $Section.find('[id^="Ser"]').first().text().trim(),
					"Status" : "Active",
					"Type" : "ProductType",
					"Key" : sAsset.propArray["Product Desc Calc"],
					"Value" : "Existing"	
				}
				]);
				recomJson = setContexts([
				{
					"ContextLevel" : "Subscription",
					"ContextID" : $Section.find('[id^="Ser"]').first().text().trim(),
					"Status" : "Active",
					"Type" : "Product",
					"Key" : sAsset.propArray["Product Desc Calc"],
					"Value" : $Section.find('[id^="Ser"]').first().text().trim()	
				}
				]);
				recomJson = setContexts([
				{
					"ContextLevel" : "Subscription",
					"ContextID" : $Section.find('[id^="Ser"]').first().text().trim(),
					"Status" : "Active",
					"Type" : "Intent-"+sAsset.propArray["Product Desc Calc"],
					"Key" : "PrimaryIntent",
					"Value" : sPrimaryIntent[j].propArray["Intent CDH Code"]	
				}
				]);
				copyJson = setIntents([
					{
						"ContextLevel" : "Subscription",
						"ContextID" :sAsset.propArray["Primary MSISDN"] ,
						"Status" : "Active",
						"Type" : "Intent - "+sAsset.propArray["Product Desc Calc"],
						"Key" : "PrimaryIntent",
						"device" : sAsset.propArray["Device Name"],
						"plan" : sAsset.propArray["VF Rate Plan"],
						"Value" : sPrimaryIntent[j].propArray["Primary Intent Answers"]
						
					}
				]);
					
			}
			enableGetrecomBtn(); // added by vinay kumar
			intentQuesPsma = false;
		});
	 //$("#vha-ign-existrecombutton").on('click', function(){
     document.getElementById("vha-ign-existrecombutton").addEventListener("click", () => {
		console.log("Exit Recommendations");
		var activeViewName = SiebelApp.S_App.GetActiveView().GetName();
		if(activeViewName === "VHA Recommendations View")
			SiebelApp.S_App.GotoView("VHA Customer Dashboard View");
	    else
			SiebelApp.S_App.GotoView("VHA Recommendations View");
	  }); 
	  $("#vha-ign-pausebutton").on('click', function(){
		console.log("Pause");	
	  }); 
	  $("#vha-ign-getrecombutton").on('click', function(){
		//jsonHandler('NewJson', {});
		$targetDiv = $("#vha-ign-servicesid");
		var IntentString = $targetDiv.prop('outerHTML');
		console.log(IntentString);
		$('.page1').addClass('displaynone');
		/*$('.page2').removeClass('displaynone');*/
		SiebelApp.S_App.GotoView("VHA Device Recommendations View");
		jsonHandler('NewCartJson', {});
		renderContacts(ContactsDetails,"page2");
		//createPerRecommendationsHTML("page2");
		recomJson = setContexts([
		{
			"ContextLevel": "BillingAccount",
			"ContextID": selectedBAcc,
			"Status" : "Active",
			"Type": "BillingAccount",
			"Key": "Identifier",
			"Value": selectedBAcc
		}
		]);
		const activeRecomJson = {
		  ...recomJson,
		  Contexts: recomJson?.Contexts?.filter(ctx =>
			ctx.Status?.toLowerCase() === "active"
		  ) || []
		};
		//activeRecomJson.BillAccNumber = selectedBAcc;
		
		//replacing NBN OPTIOM VISON key with Fixed
		activeRecomJson.Contexts.forEach(function(context) {
        if ((context.Type === "ProductType" || context.Type === "Product") && (["NBN", "Opticomm", "Vision", "FWA"].includes(context.Key))) {
            context.Key = "Fixed";
        }
    });
		
		var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
		var Inputs = SiebelApp.S_App.NewPropertySet();
		var Outputs = SiebelApp.S_App.NewPropertySet()
		Inputs.SetProperty("ProcessName","VHA Pega NBA Workflow");
		Inputs.SetProperty("JSONString",JSON.stringify(activeRecomJson));
		Inputs.SetProperty("LoginId",LoginId);
		Inputs.SetProperty("IntentString",IntentString);
		Inputs.SetProperty("OrderId",OrderId);
		Outputs = ser.InvokeMethod("RunProcess", Inputs);
		var Result = Outputs.GetChildByType("ResultSet");
		var GetRecomMessage = Result.GetChildByType("SiebelMessage");
		var sXMLDoc = Result.GetProperty("XMLDoc");
		InteractionId = Result.GetProperty("Pega Interaction ID");	
		var recomXML = $.parseXML(sXMLDoc);
		copyJson.billingID =  billingAccNumCopy.trim();
		
		//var $xml = $(xmlDoc);
		console.log(recomXML);
		sortRecomXML(recomXML);	
	  });
	  $("#vha-ign-BacktoIntent").on('click', function(){
		$('.page1').removeClass('displaynone');
		$('.page2').addClass('displaynone');
	  });
	  $("#vha-ign-StartAgain").on('click', function(){
		console.log("StartAgain");	
	  }); 
	 $("#manualaddresscheckbox").on('click', function () { // added by Vinay Kumar
	    if ($(this).is(':checked')) {
	        SiebelApp.S_App.GetActiveView().GetApplet("VF SSJ Coverage Check List Applet").InvokeMethod("NewQuery");
	        setTimeout(function () {
	            $('td[aria-roledescription="Coverage Type"] span.siebui-icon-pick').click();
	        }, 100);
	    }
		});
		
		
	  $("#vha-ign-coveragecheck").on('click', function(){
		console.log("Prepare coverage check");	
			
		$('.coveragecheckresultfailure').remove();
		
		const selectElement = document.getElementById("vha-ign-ExistingAddresslistoptions");
		ExsistingAddrValue = selectElement.value;// added vinay kumar
		var newaddressValue = $('#vha-scj-step2-address').val();
		if(ExsistingAddrValue == "Enter new address"  && newAddressFlag == true)
		{
			if(newaddressValue != "")
			{
			
			$("#vha-ign-coveragecheckresult #vha-ign-ccresult").text("Coverage check prepared for "+$('#vha-scj-step2-address').val()+" .View results on next screen");
			$('.vha-address-section .vha-h3').after($("#vha-ign-coveragecheckresult"));
			$("#vha-ign-coveragecheckresult").removeClass("displaynone");
            //newAddressFlag = false;
				enableGetrecomBtn();
			}
            else{
				newAddressFlag = false;
				enableGetrecomBtn();
				
			}
		}
		else
		{if(ExsistingAddrValue != "Enter new address" && ExsistingAddrValue != "Select"){
			
			$("#vha-ign-coveragecheckresult #vha-ign-ccresult").text("Coverage check prepared for "+$("#vha-ign-ExistingAddresslistoptions").val()+" .View results on next screen");
			$('.vha-address-section .vha-h3').after($("#vha-ign-coveragecheckresult"));
			$("#vha-ign-coveragecheckresult").removeClass("displaynone");
            newAddressFlag = true;
			intentQuesPsma = true;
			enableGetrecomBtn();			
		}
		 else if (ExsistingAddrValue != "Select"){
			// $("#vha-ign-coveragecheckresult #vha-ign-ccresult").text("Coverage check not prepared for "+$("#vha-scj-step2-address").val()+".Try a different address search");
			// $('.vha-address-section .vha-h3').after($("#vha-ign-coveragecheckresult"));
			//$("#vha-ign-coveragecheckresult").removeClass("displaynone");
			$('.vha-address-section .vha-h3').append("<button class='coveragecheckresultfailure' id='vha-ign-coveragecheckresult' style='display: block'><span class='vha-ign-coverageStatus'><img src='images/custom/exclamationCircleIcon16_16.svg' id='vha-ign-redTick'></span><span id='vha-ign-ccresult'>Coverage check not prepared for "+newaddressValue+".Try a different address search</span></button>");
			newAddressFlag = false;
			enableGetrecomBtn();
		 }
		}
        newAddressFlag = false;
        $('#vha-ign-coveragecheck').prop('disabled',true);
	  });
	    const header = document.querySelector(".mobilecoveragecheckstep3");
		const body = document.getElementById("recomcoveragecheckresult");
		const toggleIcon = document.getElementById("chevronimg");


		header.addEventListener("click", (e) => {
		    const isVisible = body.style.display !== "none";
		    body.style.display = isVisible ? "none" : "block";

		    toggleIcon.src = isVisible
		      ? "images/custom/vha-ign-expaneded_24_24.svg"
		      : "images/custom/vha-ign-colapsed_24_24.svg";
		});
		
		const custDetailToggle = document.getElementById("chevronimg");
		    custDetailToggle.className = "toggle-icon";
			custDetailToggle.src = "images/custom/vha-ign-expaneded_20_20.svg";
			custDetailToggle.alt = "Toggle";
			const custmomerDetailsection = document.getElementById('customerdetailstoggle');
			
			custDetailToggle.addEventListener("click", (e) => {
		const isVisible = custmomerDetailsection.style.display !== "none";
		    custmomerDetailsection.style.display = isVisible ? "none" : "block";

		    toggleIcon.src = isVisible
		      ? "images/custom/vha-ign-expaneded_24_24.svg"
		      : "images/custom/vha-ign-colapsed_24_24.svg";
		});

		$("#customerdetailexpandpage1").on('click', function(){
			const customerDetailspage1 = document.getElementById('customerdetailstogglepage1');
			const isHidden = window.getComputedStyle(customerDetailspage1).display === 'none';
			customerDetailspage1.style.display = isHidden ? 'block' : 'none';
		});
		$("#customerdetailexpandpage2").on('click', function(){
			const customerDetailspage2 = document.getElementById('customerdetailstogglepage2');
			const isHidden = window.getComputedStyle(customerDetailspage2).display === 'none';
			customerDetailspage2.style.display = isHidden ? 'block' : 'none';
		});
		


    }

    VHARecommendationsViewPR.prototype.EndLife = function () {
     SiebelAppFacade.VHARecommendationsViewPR.superclass.EndLife.apply(this, arguments);
    }
	function renderContacts(ContactsDetails,pageClass) {
		  //const listofContacts = document.getElementById('listofContacts');
		  const page = document.querySelector(`.${pageClass}`);
		  const listofContacts = page.querySelector('#listofContacts');
		  listofContacts.innerHTML = '';
		  $.each(ContactsDetails, function (index, item) {
					const Condetails = document.createElement('div');
					Condetails.className = 'customerdetailsvalues';
					Condetails.innerHTML = `<div class="customertype">
					<span class="customertypevalue ParagraphBody1">${item.ContactRole}:</span>
					<span class="customerfullname ParagraphBody1" id="customerfullname">${item.fullname}</span>
					</div>					
					<div class="currentinclusiondetails">
							<div class="customerdetailsitem">
							  <div class="ParagraphBody2Strong col1">Name</div>
							  <div class="value ParagraphBody2" id="customerfullname">${item.fullname}</div>
							</div>							
					</div>`
					listofContacts.appendChild(Condetails);
			  });
		}
	   function setIntents(contextArray){
		 
			var contextList = copyJson.Contexts || [];
			contextArray.forEach(newContext => {
				if(newContext.Key === "PrimaryIntent")
				{
					contextList = contextList.filter(ctx => 
					  !(ctx.ContextID === newContext.ContextID && ctx.ContextLevel === "Subscription" && ctx.Type != "ProductType" && ctx.Type != "Product")
					);
				}
				else
				{
					var existingIndex;
					if(newContext.Type === "ProductType" || newContext.Type === "Product")
					{
						// Find index where both ContextId and Value match for ProductType
						existingIndex = contextList.findIndex(ctx => 
						  (ctx.Value === newContext.Value &&
						  ctx.ContextID === newContext.ContextID && ctx.ContextLevel === "Subscription" && ctx.Type === newContext.Type)
						);
					}
					else
					{
						// Find index where both ContextId and Key match for PrimaryIntent
						existingIndex = contextList.findIndex(ctx => 
						  (ctx.Key === newContext.Key &&
						  ctx.ContextID === newContext.ContextID && ctx.ContextLevel === "Subscription")
						);
					}
					if (existingIndex !== -1) {
					  // Remove the old matching context
					  contextList.splice(existingIndex, 1);
					}
				}
				// Add the new context
				contextList.push(newContext);
			});
			
			copyJson.Contexts = contextList;
			return copyJson;
	   }  
		function setContexts(contextArray) { 
			//const json = OriginalJSON();
			//var contextList = recomJson.ListOfVHANextBestActionRequest.NextBestActionRequest.ListOfContexts.Contexts || [];
			var contextList = recomJson.Contexts || [];
			contextArray.forEach(newContext => {
				if(newContext.Key === "PrimaryIntent")
				{
					contextList = contextList.filter(ctx => 
					  !(ctx.ContextID === newContext.ContextID && ctx.ContextLevel === "Subscription" && ctx.Type != "ProductType" && ctx.Type != "Product")
					);
				}
				else
				{
					var existingIndex;
					if(newContext.Type === "ProductType" || newContext.Type === "Product")
					{
						// Find index where both ContextId and Value match for ProductType
						existingIndex = contextList.findIndex(ctx => 
						  (ctx.Value === newContext.Value &&
						  ctx.ContextID === newContext.ContextID && ctx.ContextLevel === "Subscription" && ctx.Type === newContext.Type)
						);
					}
					else
					{
						// Find index where both ContextId and Key match for PrimaryIntent
						existingIndex = contextList.findIndex(ctx => 
						  (ctx.Key === newContext.Key &&
						  ctx.ContextID === newContext.ContextID && ctx.ContextLevel === "Subscription")
						);
					}
					if (existingIndex !== -1) {
					  // Remove the old matching context
					  contextList.splice(existingIndex, 1);
					}
				}
				// Add the new context
				contextList.push(newContext);
			});
			//recomJson.ListOfVHANextBestActionRequest.NextBestActionRequest.ListOfContexts.Contexts = contextList;
			recomJson.Contexts = contextList;
			return recomJson;
		}
		function jsonHandler(toDo, inpParams) { 
            switch (toDo) {
				case "NewJson":
                    recomJson = JSON.parse(JSON.stringify(OriginalJSON()));
					//var nxtBestActn = recomJson.ListOfVHANextBestActionRequest.NextBestActionRequest;
					//recomJson.MessageId = OrderId;
                    recomJson.SubjectID = CustomerAccountId;
					recomJson.ExternalID = OrderId;//IntentCaptureId;
					recomJson.Channel = (sUserType == "Care")?"CallCenter":"Retail";
                break;
				case "NewCopyJson":
					copyJson = JSON.parse(JSON.stringify(OriginalJSON()));
					copyJson.OrderID = OrderId;
				break;	
				case "NewCartJson":
                    cartJSON = JSON.parse(JSON.stringify(OriginalCartJSON()));
					cartJSON.bundles[0] = {};
					cartJSON.bundles[0].InteractionId = "";
					cartJSON.bundles[0].OrderID = OrderId;
					cartJSON.bundles[0].AgentId = LoginId;
					cartJSON.bundles[0].Action = "Add";
					cartJSON.bundles[0].MethodInvoked = "";
                break;
			}
		}
		function findHierarchyfrSelectedBA(selectedBA) 
		{
			var sServices = [];
			var sServiceCount = 0;
			var sAssetList = [];
			sServiceHier = [];
			var sBilAccCnt = SiebelMessage.GetChildByType("ListOfVHA CID Customer Account Details Req IO").GetChildByType("Account").GetChildByType("ListOfVF Billing Account").GetChildCount();
			var sBillingAccsList = SiebelMessage.GetChildByType("ListOfVHA CID Customer Account Details Req IO").GetChildByType("Account").GetChildByType("ListOfVF Billing Account");
			for(var v = 0; v < sBilAccCnt; v++)
			{
				if(sBillingAccsList.GetChild(v).GetProperty("Account Number") === selectedBA)
				{
					$(".vha-ign-services").find(".vha-ign-eachservicesection").remove();
					var sAssetCount = sBillingAccsList.childArray[v].childArray[1].GetChildCount();
					if(sAssetCount > 0)
					{
						for(var t = 0; t < sAssetCount; t++)
						{
							sAssetList[t] = sBillingAccsList.childArray[v].childArray[1].childArray[t];
							sServices.push(sAssetList[t].propArray);
							sServiceHier.push(sAssetList[t]);
						}
						sServiceCount = sServiceCount + sAssetCount;
					}
					if (sServiceCount > 0) {
						for (var i = 0; i < sServiceCount; i++) {
							var parts = [];
							if (sServices[i]["Primary MSISDN"]) {
								parts.push('<span class = "ParagraphBody1" id = "Ser' + [i] + '">' + sServices[i]["Primary MSISDN"] + '</span>');
							}
							if (sServices[i]["VF Rate Plan"]) {
								parts.push('<span class = "ParagraphBody1" id = "plan' + [i] + '">' + sServices[i]["VF Rate Plan"] + '</span>');
							}
							if (sServices[i]["Device Name"]) {
								parts.push('<span class = "ParagraphBody1" id = "device' + [i] + '">' + sServices[i]["Device Name"] + '</span>');
							}
							// Join with vertical divider between values
							var joinedValues = parts.join('<span class = "vha-ign-verticaldivide"><img src="images/custom/verticaldivider.svg" id="vha-ign-verdiv"></span>');
							var template = '<div class="vha-ign-eachservicesection">'+
								'<div class="vha-ign-eachservicesection-cls" SERVICEID="Service' + [i] + '">'+
									'<span><input type="checkbox" name = "Service' + [i] + '" class="vha-ign-eachservCheck"></span>'+
									joinedValues+
									'<span class="iconSpan"><buttton id = ' + sServices[i]["Primary MSISDN"] +'-'+[i] +' class="collapsible vha-ign-collapse primary-disabled"><img src="images/custom/vha-ign-expaneded_20_20.svg" id="vha-ign-chevronimg-svc" class = "vha-ign-expimg"><img src="images/custom/vha-ign-colapsed_20_20.svg" id="vha-ign-chevronimg-collapse" class = "vha-ign-collapseimg VHAIGNDisplayNone"></button></span>'+
								'</div>'+
								'</div>';
							$(".vha-ign-services").append(template);
						}
					}
				}
			}
		}
		function handleIntentSelection($element, intentData) { 
		  const $questionBlock = $element.closest('.vha-ign-questionblock');
		  const $answerContainer = $element.closest('[class^="vha-ign-answercontainer"]');
		  const $secIntent = $element.closest('.vha-ign-secondaryintent');
		  const questionIndex = intentData?.questionIndex ?? null;

		  // Reset only buttons in the associated container
		  $answerContainer.find('button.vha-ign-btn').removeClass('label-med-default-selected').addClass('optionbutton');

		  // Highlight the selected button
		  if ($element.is('button')) {
			$element.removeClass('optionbutton').addClass('label-med-default-selected');
		  }

		  // Reset dropdowns in this question block (if any)
		  $answerContainer.find('.vha-ign-dropdown').each(function () {
			if (this !== $element[0]) {
			  $(this).val("");
			}
		  });

			var reset = false;
			$secIntent.children().each(function () {
				const $child = $(this);

				// Start resetting once we pass the current answer container
				if ($child.is($answerContainer)) {
					reset = true;
					return; // skip current one
				}

				if (reset && $child.is('[class^="vha-ign-answercontainer"]')) {
					$child.find('.vha-ign-btn')
						.removeClass('label-med-default-selected')
						.addClass('optionbutton');
				}
			});
		}
		function captureIntentData($section) 
		{
			//var existingData = JSON.parse(sessionStorage.getItem('intentState') || '[]');=]
			var updatedData = [...sServiceData];
			$('.vha-ign-eachservicesection').each(function(index) {
				var $sectionId = 'Service'+$section.index();
				var $primary = $section.find('.vha-ign-primaryintentmain');
				var $secondary = $section.find('.vha-ign-secondaryintent');
				var sectionData = {
					sectionId : $sectionId,
					showIntents: false,
					primaryIntent : {},
					secondaryIntent : {}
				};
				$primary.find('button.label-med-default-selected').each(function (){
					var key = $(this).attr('id');
					sectionData.primaryIntent[key] = $(this).text().trim();
					sectionData.showIntents = true;
				});
				$secondary.find('button.label-med-default-selected').each(function (){
					var key = $(this).attr('id');
					sectionData.secondaryIntent[key] = $(this).text().trim();
					sectionData.showIntents = true;
				});
				$secondary.find('select').each(function (){
					var key = $(this).attr('class');
					sectionData.secondaryIntent[key] = $(this).val();
					sectionData.showIntents = true;
				});
				updatedData = updatedData.filter(d=>d.sectionId !== $sectionId);
				updatedData.push(sectionData);
			});
			//sessionStorage.setItem('intentState', JSON.stringify(updatedData));
			sServiceData = updatedData;
			console.log(updatedData);
		}
		function extractIndexFromId(id) { 
		  const match = id.match(/secIntent_(\d+)_?/);
		  return match ? parseInt(match[1], 10) : null;
		}
	   function renumberCopyServices(){
		   const services = document.querySelectorAll("#vha-ign-addnewservicesid .service-container .service-header .ParagraphBody1Strong");
			var contextList = copyJson.Contexts || [];
			services.forEach((titleDiv, index) => {
				const oldLabel = titleDiv.textContent;
				const newLabel = `New Service ${index + 1}`;
				titleDiv.textContent = newLabel;
				contextList.forEach(ctx => {
					if(ctx.ContextID === oldLabel)
					{
						ctx.ContextID = newLabel;
					}
				});
			});
	   }
		function renumberServices() {
			const services = document.querySelectorAll("#vha-ign-addnewservicesid .service-container .service-header .ParagraphBody1Strong");
			//var contextList = recomJson.ListOfVHANextBestActionRequest.NextBestActionRequest.ListOfContexts.Contexts || [];
			var contextList = recomJson.Contexts || [];
			services.forEach((titleDiv, index) => {
				const oldLabel = titleDiv.textContent;
				const newLabel = `New Service ${index + 1}`;
				titleDiv.textContent = newLabel;
				contextList.forEach(ctx => {
					if(ctx.ContextID === oldLabel)
					{
						ctx.ContextID = newLabel;
					}
				});
			});
		}
        function enableGetrecomBtn(){
			if ($('.label-med-default-selected').length > 0)
			{
				if(sEnableGetRecom === "Y")
				{
				}
				else if(newAddressFlag == true || intentQuesPsma == true)
				{
					$('#vha-ign-getrecombutton').prop('disabled',false);
				}
				else
				{
					$('#vha-ign-getrecombutton').prop('disabled',true);
				}
			}
		}
		function existingAddressPSMACall(selectedBA) {
			 const selectedAddress = ExistAddrPsma.find(addr => addr.VHAFullAddressPIC === selectedBA);
		      if (selectedAddress) {
				   var sInterfaceCallBS = "Workflow Process Manager";
				   var WFProcessName = "VHA Generic VBC";
				   var BOMap = "VHA VBC Generic";
				   var BO = "VHA VBC Generic";
				   var BCMap = "List Of Values";
				   var BC = "VF Transaction Settings";
				   var sIntCallInputs = SiebelApp.S_App.NewPropertySet();
				   var sIntCallOutputs = SiebelApp.S_App.NewPropertySet();
   
				   var ser = SiebelApp.S_App.GetService(sInterfaceCallBS);
				   
				   sIntCallInputs.SetProperty("Service Name", sInterfaceCallBS);
				   sIntCallInputs.SetProperty("Method Name", "Run Process");
				   sIntCallInputs.SetProperty("ProcessName", WFProcessName);
				   sIntCallInputs.SetProperty("BusObjectMap", BOMap);
				   sIntCallInputs.SetProperty("BusObject", BO);
				   sIntCallInputs.SetProperty("BusCompMap", BCMap);
				   sIntCallInputs.SetProperty("BusComp", BC);
				   sIntCallInputs.SetProperty("ManualSearch", 'Y');
				   sIntCallInputs.SetProperty("TransactionName", "VHA NBN Query Address");
				   sIntCallInputs.SetProperty("TransactionType", "VBC_QUERY");
				   sIntCallInputs.SetProperty("LOVType", "VHA_NBN_TOUCHPOINT");
					   
				   sIntCallInputs.SetProperty("Value", "VHANBNAddressMapQASNewCustomer");
				   sIntCallInputs.SetProperty("PropSet1", selectedAddress.locality_name);
				   sIntCallInputs.SetProperty("PropSet2", selectedAddress.streetName);
				   sIntCallInputs.SetProperty("PropSet3", selectedAddress.addressStreetType);
				   sIntCallInputs.SetProperty("PropSet4", selectedAddress.buildingName);
				   sIntCallInputs.SetProperty("PropSet5", selectedAddress.unitType);
				   sIntCallInputs.SetProperty("PropSet6", selectedAddress.unitNumber);
				   sIntCallInputs.SetProperty("PropSet7", selectedAddress.sBuildingNumber);
				   sIntCallInputs.SetProperty("PropSet8", selectedAddress.postcode);
				   sIntCallInputs.SetProperty("PropSet9", selectedAddress.state_territory);
				   sIntCallInputs.SetProperty("PropSet10", "");
				   sIntCallInputs.SetProperty("PropSet11", "");
				   sIntCallInputs.SetProperty("PropSet12", "");
				   sIntCallInputs.SetProperty("PropSet13", "");
				   sIntCallInputs.SetProperty("PropSet14", "");
				   sIntCallInputs.SetProperty("PropSet15", "");
				   sIntCallInputs.SetProperty("PropSet16", "");
				  latitude = selectedAddress.latitude;
				  longitude = selectedAddress.longitude;
				   var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				   //sIntCallInputs = SiebelApp.S_App.NewPropertySet();
				   sIntCallInputs.SetProperty("Service Name", "VHA Sales Calculator BS");
				   sIntCallInputs.SetProperty("Method Name", "VHAOneSQRESTAPI");
				   sIntCallInputs.SetProperty("PropSet27", "XYZ");
				   sIntCallInputs.SetProperty("orderId",OrderId);	
				   sIntCallInputs.SetProperty("PropSet26", "Addr");					
				   sIntCallInputs.SetProperty("PropSet10", "");					
				   sIntCallInputs.SetProperty("PropSet23", selectedAddress.address_identifier);					
				   sIntCallInputs.SetProperty("PropSet24", selectedAddress.latitude);					
				   sIntCallInputs.SetProperty("PropSet25", selectedAddress.longitude);					
				   var ExistAddrOutputsResp = ser.InvokeMethod("Run Process", sIntCallInputs);  
				   existAddrNbnResp = ExistAddrOutputsResp; // added by vinay kumar
                    $('#vha-ign-coveragecheck').prop('disabled',false);
			   }
			}
    return VHARecommendationsViewPR;
   }()
  );
  return "SiebelAppFacade.VHARecommendationsViewPR";
 })
}