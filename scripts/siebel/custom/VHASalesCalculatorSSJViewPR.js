if (typeof(SiebelAppFacade.VHASalesCalculatorSSJViewPR) === "undefined") {

	SiebelJS.Namespace("SiebelAppFacade.VHASalesCalculatorSSJViewPR");
	define("siebel/custom/VHASalesCalculatorSSJViewPR", ["siebel/viewpr","order!siebel/phyrenderer", "order!siebel/custom/VHAAppUtilities","siebel/custom/bootstrap.min","siebel/custom/VHASalesCalculatorSSJTemplate"],
	 function () {
	   var step1firstname = ""; 
	   var step2lastname = ""; 
	   var coveragecheckstatus = "Done"; 
	   var remaininglines = 0; 
	   
	   let MobilecurrentIndex = 0;
	   let TabletcurrentIndex = 0;
	   let AccessorycurrentIndex = 0;
	    let WearblecurrentIndex = 0;
	   let ActiveTab = "mobile"; // accessory, Wearble, tablet
	   
	   let AlldevicesGrouped = [];
	   let DevicesGrouped = [];
	   let filteredDevices = [];
	   
	    let Tabletdata = [];
	   let filteredTablets = [];
	   
	   let Accessoriesdata = [];
	   let filteredAccessories = [];
	   
	   let Wearablesdata = [];
	   let filteredWearables = [];
	
	   let VhaCheckStore_Cur_Page = 1;
	   let VhaCheckStore_Per_Page = 5;
	   let checkstoredata = [];
	   let productCode= "";
  
	   var scJson = "";
	   var currentRLI = [];
   
       let jsonplans;
	   let jsonTabletMbbPlans;
	   let filterDevicePlans;
	   let itemsPerPage = 3;
	   let currPage = 0;
	   let totalItems = 0;
	   let totalPages = 0;
	   let plans;
	   let filterPlans;
	   let selectedPlans=[];
	   let lockedPlanCode = null;
	   let propositionInitialized = "N";
	   let filteredExistingServices;
	   let remainingEquipmentLimitCheck;
	   let updEquipmentLimitCheck;
	   let prepaymentAmount = 0;
	   let oneTimeCharge = 2000;
	   
	   //Marvin 
		let sProdConId = "";
		let sQuoteId = "";
		let sTempscJson = "";
		let sOptCustomized;
		let sSvcCount = 0;
		let resumeQuote = "N";
		
		//vinay
		 let sAddr = "";
		 var sResp = "";
		 let selectedBA = "";
		 let sManualAddr = "";
		 var sManualAddrOutput = "";
		 var addrResp = "";
		 var ExistAddrPsma = [];
	   
	  SiebelAppFacade.VHASalesCalculatorSSJViewPR = (function () {
   
	   function VHASalesCalculatorSSJViewPR(pm) {
		SiebelAppFacade.VHASalesCalculatorSSJViewPR.superclass.constructor.apply(this, arguments);
		this.GetPM().AttachPostProxyExecuteBinding("GetURL", VHACovergaeCheck, {
					   scope: this,
					   sequence: false
				   }); 
	   }
   
	   SiebelJS.Extend(VHASalesCalculatorSSJViewPR, SiebelAppFacade.ViewPR);
	   var MapShed = {
				   Mobile: {
					   m5G: {
						   indoor: false,
						   outdoor: false
					   },
					   m5GSA: {
						   indoor: false,
						   outdoor: false
					   },
					   m5GNSA: {
						   indoor: false,
						   outdoor: false
					   },
					   m4G: {
						   indoor: false,
						   outdoor: false
					   },
					   m4GSA: {
						   indoor: false,
						   outdoor: false
					   },
					   m4GNSA: {
						   indoor: false,
						   outdoor: false
					   },
					   m3G: {
						   indoor: false,
						   outdoor: false
					   }
				   },
				   FWA: {
					   f4G: {
						   is4G: false
					   },
					   f5G: {
						   is5G: false
					   },
					   f5GSA: {
						   is5Gsa: false
					   },
					   f5GNSA: {
						   is5Gnsa: false
					   }
				   }
			   };
   
	   VHASalesCalculatorSSJViewPR.prototype.Init = function () {
		SiebelAppFacade.VHASalesCalculatorSSJViewPR.superclass.Init.apply(this, arguments);
		SiebelApp.S_App.SetProfileAttr("ssjOrderId", "");// added by Vinay kumar
		/****Quote-summary-Ganesh***/
		apilovurl = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_REST_API_URL' AND [List Of Values.Active]='Y'", {
                    "All": "true"
                })[0].Description;
                if (window.location.href.indexOf("retail.vodafone") > 0) {
                    apilovurl = apilovurl.replace("care", "retail");
                } else if (window.location.href.indexOf("partnerportal") > -1) {
                    apilovurl = window.location.href.substr(0, window.location.href.indexOf("/siebel/app/retail/enu?")) + "/siebel/v1.0/service/";
                }
		/****END-Quote-summary-Ganesh***/
		
			//Marvin
			sProdConId = SiebelApp.S_App.GetProfileAttr("FromProdConfig");
			sQuoteId = SiebelApp.S_App.GetProfileAttr("SSJParentOrderId");
			resumeQuote = SiebelApp.S_App.GetProfileAttr("FromResumeQuote");//Marvin : Added for Resume Quote
			SiebelApp.S_App.SetProfileAttr("ssjOrderId", sQuoteId);// added by VK
	   }
   
	   VHASalesCalculatorSSJViewPR.prototype.ShowUI = function () {
		SiebelAppFacade.VHASalesCalculatorSSJViewPR.superclass.ShowUI.apply(this, arguments);
			
			if(SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SSJ Asset Form Applet']){
				$('#s_'+SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SSJ Asset Form Applet'].GetFullId() + '_div').addClass('displaynone');
			}
		   MainTabsUI();
		   DeviceTabUI();
		   DevicesCarousel();
		   TabletsMbbUI();
		   AccessoryUI();
		   WearblesUI();
		   CartSummaryUI();
		   CheckstorestockUI();
		    //harika-SBABU added for DFA
		   if (SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "TPG" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "iiNet")
			{
			$('.vha-scj-shipp-postal-cont').removeClass('forcehide').addClass('forcehide');	
			$('.vha-scj-brand-filter').removeClass('forcehide').addClass('forcehide');
			$('.vha-scj-carousel-header').removeClass('forcehide').addClass('forcehide');	
			$('.vha-scj-carousel-container').removeClass('forcehide').addClass('forcehide');
			$('.vha-scj-st3-mb-devicestabs').removeClass('Mobiletab').addClass('Mobiletab');
			$('.vha-scj-no-devices-box').hide();
			$(".Mobiletab").append("No Mobile Phones available");
			}
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
					   
					   $('.vha-scj-parent-cont').append(loadingIconHtml);
			   const totalBoxes = 8; // Change this number as needed
	   const boxesPerPage = 4;
	   let currentPage = 1;
		
	   function renderBoxes() {
		 const boxContainer = document.getElementById('boxContainer');
		 boxContainer.innerHTML = '';
   
		 const start = (currentPage - 1) * boxesPerPage;
		 const end = Math.min(start + boxesPerPage, totalBoxes);
   
		 for (let i = start; i < end; i++) {
		   const box = document.createElement('div');
		   box.className = 'boxx';
		   box.innerText = i + 1;
		   box.innerHTML = `<div class="availableplansdetailContainers">
		   <div class="section1">
			   <div class="part1">
				   <div class="value1 Heading-H1-strong"><span id="datavalue">50</span><span id="data" class="ParagraphBody2Strong">Gb</span></div>
			   </div>
			   <div class="part2">
				   <div class="pricedetails">
				   <div class="value1 strikethrough strikethroughpart2"><span id="permonthvalue">$49</span></div>
				   <div class="value1 Heading-H1-strong"><span id="permonthoffervalue" class="ParagraphBody2Strong">$</span><span id="data" class="Heading-H1-strong">40</span></div>
				   <div class="ParagraphBody2">per month</div>
				   </div>
			   </div>
		   </div>
		   <div class="plandetails">
			   <div class="heading5 plannameclass" id="palanname">Small Plan</div>
		   </div>
							   <div class="plandetailsitemsmain">
								   <div class="plandetailsitems">
											   <div class="plandetailsitemsrow">
												 <div><img src="images/custom/vha-scj-Success_24_24.svg"></div>
												 <div class="ParagraphBody2">Contract type:</div>
												 <div id="nationalcalls "class="value ParagraphBody2Strong">Month to month</div>
											   </div>
											   <div class="plandetailsitemsrow">
												 <div><img src="images/custom/vha-scj-Success_24_24.svg"></div>
												 <div class="ParagraphBody2">National calls:</div>
												 <div id="nationalcalls "class="value ParagraphBody2Strong">Unlimited</div>
											   </div>
											   <div class="plandetailsitemsrow">
												 <div><img src="images/custom/vha-scj-Success_24_24.svg"></div>
												 <div class="ParagraphBody2">National SMS:</div>
												 <div id="nationalsm"class="value ParagraphBody2Strong">Unlimited</div>
											   </div>
											   <div class="plandetailsitemsrow">
												 <div><img src="images/custom/vha-scj-Success_24_24.svg"></div>
												 <div class="ParagraphBody2">IDD Zone 1:</div>
												 <div id="idzone1"class="value ParagraphBody2Strong">Included</div>
											   </div>
											   <div class="plandetailsitemsrow">
												 <div><img src="images/custom/vha-scj-Success_24_24.svg"></div>
												 <div class="ParagraphBody2">IDD Zone 2:</div>
												 <div id="idzone2"class="value ParagraphBody2Strong">Not Included</div>
											   </div>
											   <div class="plandetailsitemsrow">
												 <div><img src="images/custom/vha-scj-warning_24_24.svg"></div>
												 <div class="ParagraphBody2">Data:</div>
												 <div id="idzone2"class="value ParagraphBody2Strong">30GB</div>
											   </div>
								   </div>
								   <div class="SelectbuttonContainer">
									   <button id="vha-scj-select-plan" class="planselectbutton ParagraphBody1">Select</button>
								   </div>
								   <div class="criticalinfoSummary">
									   <div><a id="criticalinfolink" href="nolink" class="Paragraph-Body2-Underline">Critical Information Summary</a></div>
									   <div><a id="rateandcharges" href="nolink" class="Paragraph-Body2-Underline">Rates and Charges</a></div>
								   </div>
								   <div class="End"></div>
							   </div>
	   </div>`
		   boxContainer.appendChild(box);
		 }
	   }
   
	   function renderPagination() {
		 const pagination = document.getElementById('pagination');
		 pagination.innerHTML = '';
   
		 const totalPages = Math.ceil(totalBoxes / boxesPerPage);
   
		 const leftBtn = document.createElement('button');
		 leftBtn.innerText = '<';
		 leftBtn.disabled = currentPage === 1;
		 leftBtn.onclick = () => {
		   if (currentPage > 1) {
			 currentPage--;
			 updateDisplay();
		   }
		 };
		 pagination.appendChild(leftBtn);
   
		 for (let i = 1; i <= totalPages; i++) {
		   const pageBtn = document.createElement('button');
		   pageBtn.innerText = i;
		   if (i === currentPage) pageBtn.classList.add('active');
		   pageBtn.onclick = () => {
			 currentPage = i;
			 updateDisplay();
		   };
		   pagination.appendChild(pageBtn);
		 }
   
		 const rightBtn = document.createElement('button');
		 rightBtn.innerText = '>';
		 rightBtn.disabled = currentPage === totalPages;
		 rightBtn.onclick = () => {
		   if (currentPage < totalPages) {
			 currentPage++;
			 updateDisplay();
		   }
		 };
		 pagination.appendChild(rightBtn);
	   }
   
	   function updateDisplay() {
		// renderBoxes();
		// renderPagination(); raj changes for plans commented
	   }
   
	   //updateDisplay();
	   $('.vha-scj-siebelapplet1').hide();
	   $('.resultfordividertop').hide();// added by vinay
       $('.coveragecheckresultscontainer').hide();// added by vinay
	   var sExistCustAddr = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Parent Order Form Applet"].GetBusComp().GetFieldValue("Account Id");
		if (sExistCustAddr != ""){
		   $('.vha-scj-step2-search-box').removeClass('displaynone');
		   var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet()
			Inputs.SetProperty("ProcessName","VHA Fetch Cust Addr WF");
			Inputs.SetProperty("CustomerAccountId", sExistCustAddr);
			Outputs = ser.InvokeMethod("RunProcess", Inputs);
			var Result = Outputs.GetChildByType("ResultSet");
			var OutpuXMLDoc = Result.GetProperty("XML Doc");
		}
		if (OutpuXMLDoc) 
		{
			var DefaultListOfAddress =[];
			var DynamicListOfAddress =[];
			var xmlDoc = $.parseXML(OutpuXMLDoc);
			var $xml = $(xmlDoc);
			$xml.find("Account").each(function(){
            var sBillingLength = $(this).find("VfBillingAccount").length;
				$(this).find("ListOfVfBillingAccount").each(function(){
					$(this).find("VfBillingAccount").each(function(){
						
						$(this).find("ListOfVFBillingAccount_BusinessAddress").each(function(){
							$(this).find("VFBillingAccount_BusinessAddress").each(function(){
							var obj={};
							obj.fullAddress  = $(this).find("CalFullAddress").text();
							
							DynamicListOfAddress.push(obj);
							});
							
						});
					});
				});
				$(this).find("ListOfCutAddress").each(function(){
					$(this).find("CutAddress").each(function(){
						var obj={};
						var addrObj={};
						obj.fullAddress  = $(this).find("VHAFullAddressPIC").text();
						DefaultListOfAddress.push(obj);
						ExistAddrPsma.push(addrObj);
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
					});
				});
			});
			updateselectAddress();
		}
		function updateselectAddress() {
			//const selectAddressillingAccount = document.getElementById('vha-ign-billingAccounts');
			const selectAddress = document.getElementById('selectexistingAddress');
			// Clear all options
			selectAddress.innerHTML = '';
			const opt = document.createElement('option');
			opt.value = "Select";
			opt.text = "Select";
			selectAddress.appendChild(opt);
			// Add default addresses first
			DefaultListOfAddress.forEach(addr => {
				const opt = document.createElement('option');
				opt.value = addr.fullAddress;
				opt.text = addr.fullAddress;
				selectAddress.appendChild(opt);
			});
			// Filter and add dynamic addresses based on billing account
			/*const filteredDynamic = DynamicListOfAddress.filter(
				addr => addr.billingAccount === selectedBillingAccount
			);*/

			/*filteredDynamic.forEach(addr => {
				const opt = document.createElement('option');
				opt.value = addr.fullAddress;
				opt.text = addr.fullAddress;
				selectAddress.appendChild(opt);
			});*/
		}		
		// ended  by vinay
		
			//Marvin: To load correct view after Prod Config 
			if(sQuoteId !== "" && sProdConId === sQuoteId)
			{
				sOptCustomized = `<option value="customize">Customize</option>`;
				setTimeout(function () {
					document.getElementById("vha-scj-step2-nextButton").click();
					//$(".vha-scj-step3-nxt").click();
					console.log("timeout");
					}, 1000);

				var wfBSS = SiebelApp.S_App.GetService("Workflow Process Manager");
				var wfInput = SiebelApp.S_App.NewPropertySet();
				
				var config = {};
				config.async = true; // Enable asynchronous call
				config.scope = this; // Set the scope for the callback function
				config.cb = function(methodName, inputPS, outputPS) {
					console.log(outputPS.GetChild(0).GetChild(0).GetChild(0));
					if(outputPS.GetChild(0).GetChild(0).GetChild(0).GetChildCount() > 0)
					{
						let sRetJson = outputPS.GetChild(0).GetChild(0).GetChild(0).GetChild(0).propArray.CartDetails;
						const sSetRetscJson = JSON.parse(sRetJson);
						const sTempRetscJson = JSON.parse(sRetJson);
						scJson = sSetRetscJson;
						sTempscJson = sTempRetscJson;
						//Update retrievejson after prod config 
						fnCartUpdfrProdCon(sQuoteId);
						
						//Marvin: Remove the Root to be populated later.
						if(scJson.QuoteHeader.RootItem !== undefined){
							scJson.QuoteHeader.RootItem.splice(0,scJson.QuoteHeader.RootItem.length)
						}
						let sTempRootCount = sTempscJson.QuoteHeader.RootItem.length;
						//Loop through Retrieve Json file
						for(let j = 0; j<=sTempRootCount-1; j++)
						{	sSvcCount = sSvcCount + 1;
							currentRLI = [];
							currentRLI.push(sTempscJson.QuoteHeader.RootItem[j]);				
							$(".vha-scj-step3-nxt").click();
							scJson.QuoteHeader.RootItem.splice(0,scJson.QuoteHeader.RootItem.length);
							if(j === sTempRootCount-1)
							{	
								scJson = sTempscJson;
								//sProdConId = "";
								sSvcCount = 0;
								//Marvin: reset Resume Quote param
								resumeQuote = "N";
								SiebelApp.S_App.SetProfileAttr("FromResumeQuote","N");
								//reset cuurentrli
								let Temp_scJson = JSON.parse(JSON.stringify(OriginalJSON()));
								currentRLI = [];
								currentRLI.push(Temp_scJson.QuoteHeader.RootItem[0]);
								currentRLI[0].Id = 'QLI-' + (scJson.QuoteHeader.RootItem.length + 1);
								currentRLI[0].SrvType = "New Service";
							}
						}
					}
				};
				wfInput.SetProperty("ProcessName","VHA SSJ Upsert Query Cart Details Process WF");
				wfInput.SetProperty("Object Id",sQuoteId);
				//wfInput.SetProperty("Object Id","3-CPQLE67");//for Testing
				wfInput.SetProperty("Method","Query");
				wfInput.SetProperty("RecordType","JSON");
				console.log(wfInput);
				wfBSS.InvokeMethod("RunProcess",wfInput,config);
		   }
		   else
		   {	//Marvin: To disable Configure Selected Services on initial login
				if(document.querySelectorAll(".cart-container").length == 0)
				{	$(".vha-scj-step3-cfg-slcd-serv").addClass("btnDisabled");
				}
				//Marvin: To disable Configure Selected Services on initial login
				sOptCustomized = `<option value="customize" disabled="disabled">Customize</option>`;
		   }
	   }//end of ShowUI
   
	   VHASalesCalculatorSSJViewPR.prototype.BindData = function (bRefresh) {
		SiebelAppFacade.VHASalesCalculatorSSJViewPR.superclass.BindData.apply(this, arguments);
	   }
   
	   VHASalesCalculatorSSJViewPR.prototype.BindEvents = function () {
		SiebelAppFacade.VHASalesCalculatorSSJViewPR.superclass.BindEvents.apply(this, arguments);
		$('#selectexistingAddress').on('change',function(e){// added by vinay kumar
			selectedBA = $('#selectexistingAddress').val();
			if (selectedBA != "Select")
			{
			 existingAddressPSMACall(selectedBA);
			}
		});
		$(document).on("click", 'button[title="Check Address with Fixed List Applet:Select"]', function () 
		   {
			    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			    var psInp = SiebelApp.S_App.NewPropertySet();
			    psInp.SetProperty("Service Name", "VF REST API Wrapper Service");
			    psInp.SetProperty("OrderId", sQuoteId);
			    psInp.SetProperty("Method Name", "GetOneSQRespPega");
			    sManualAddrOutput = ser.InvokeMethod("Run Process", psInp);
			   sManualAddr = sManualAddrOutput?.childArray?.[0]?.propArray?.formed_fulladdress !== "undefined" ? sManualAddrOutput.childArray[0].propArray.formed_fulladdress : '';
		      $('#vha-scj-step2-address').val(sManualAddr);
			   if (sManualAddrOutput != "") 
			   {
				  VHACovergaeCheck();
				   $("#step2divider").addClass("displaynone");
				   //Mobile//
				   $("#mobileinitailtext").addClass("displaynone");
				   $(".Mobilecoverageresultcontainer").removeClass("displaynone");
				   $('.resultfordividertop').show();// added by vinay
					$('.coveragecheckresultscontainer').show();// added by vinay
				   $('#mobileresultfound').addClass('displaynone');// added by vinay
				   $('#fixedwirelessresultfound').addClass('displaynone');// added by vinay
				   $(".resultforcontainerparent").removeClass("displaynone");
				   //Fixed//
				   $("#fixedinitailtext").addClass("displaynone");
				   $(".fixedcoverageresultcontainer").removeClass("displaynone");
				   //FixedWirelsess//
				   $("#fixedwirelessinitailtext").addClass("displaynone");
				   $(".fixedwirelesscoverageresultcontainer").removeClass("displaynone");   
				   $('#resultforvalue').text(sManualAddr);
					var PriorityNetwork = sManualAddrOutput?.childArray?.[0]?.propArray?.Serv_PriorityNetwork !== "undefined" ? sManualAddrOutput.childArray[0].propArray.Serv_PriorityNetwork : '';
					$('#preferredwholesaler').text(PriorityNetwork);
					   $('#serviceClass').text("");//added by vinay kumar
					  if ($('.networkAvail').length<1){
						$("#fixedwirednbn").append("<span class='CSGreen' id='statusActive'></span><span class ='networkAvail'>" + PriorityNetwork + " - Available</span>");//added by vinay kumar
						}
						else {
							$(".networkAvail").text(PriorityNetwork + " - Available");	
						}
						if (PriorityNetwork == "") {
						   $('#fixedwirednbn').hide();
						}
						else {
						   $('#fixedwirednbn').show();
						   $('.fixednbndetails').text(PriorityNetwork + " details");
						}
					   $('#internetlocationID').text(sManualAddrOutput?.childArray?.[0]?.propArray?.NBN_Location_Id !== "undefined" ? sManualAddrOutput.childArray[0].propArray.NBN_Location_Id : '');
					   $('#newdevelopment').text("");					
					   $('#technologytype').text(sManualAddrOutput?.childArray?.[0]?.propArray?.NBN_primaryAccessTech !== "undefined" ? sManualAddrOutput.childArray[0].propArray.NBN_primaryAccessTech : '');
					   $('#maxattainablespeed').text(sManualAddrOutput?.childArray?.[0]?.propArray?.NBN_mas !== "undefined" ? sManualAddrOutput.childArray[0].propArray.NBN_mas : '');
					   $('#fibreupgrade').text("");  
					   $('#fixedresultfound').addClass('displaynone');//added by vinay kumar
			   }
		     
			});// ended button
		   //cart summary accrodion
		   $('.accordion-header').click(function() {
			   const Accrbody = $(this).next('.accordion-body');
			   const Accrarrow = $(this).find('.arrow-icon');
   
			   Accrbody.slideToggle();
			   Accrarrow.toggleClass('rotate');
		   });	
		   //no results found
		   $('.vha-scj-step3-searchicon').on('click', function() {
				if (ActiveTab === "mobile") {
					let value = $('.vha-scj-search-mobile').val().toLowerCase().trim();
					let searcheddevice = DevicesGrouped.filter(device =>
						device.name.toLowerCase().includes(value)
					);
					if (searcheddevice.length > 0) {
						CreateDeviceTiles(searcheddevice, "mobile");
					} else {
						CreateDeviceTiles([], "mobile");
					}
				}
				else if(ActiveTab === "tablet"){
					let value = $('.vha-scj-search-tablet').val().toLowerCase().trim();
					let searcheddevice = Tabletdata.filter(device =>
						device.name.toLowerCase().includes(value)
					);
					if (searcheddevice.length > 0) {
						CreateDeviceTiles(searcheddevice, "tablet");
					} else {
						CreateDeviceTiles([], "tablet");
					}
					
				}
				else if(ActiveTab === "accessory"){
					let value = $('.vha-scj-search-accessory').val().toLowerCase().trim();
					let searcheddevice = Accessoriesdata.filter(obj =>
					   obj.propArray["Device Name"].toLowerCase().includes(value)
					);
					if (searcheddevice.length > 0) {
						CreateAccessoryTiles(searcheddevice);
					} else {
						CreateAccessoryTiles([]);
					}
				}
				else{
					let value = $('.vha-scj-search-Wearble').val().toLowerCase().trim();
					let searcheddevice = Wearablesdata.filter(device =>
					   device.name.toLowerCase().includes(value)
					);
					if (searcheddevice.length > 0) {
						CreateWearbleTiles(searcheddevice,"Wearble");
					} else {
						CreateWearbleTiles([],"Wearble");
					}
				}
			});
		   //check store stock
		    $('.vha-scj-check-str-popup-pagination-controls').hide();
			const $modal = $('.vha-scj-check-str-popup-overlay');
		    $('.vha-scj-carousel').on('click', '.vha-scj-check-stock-store', function () {
				$('.vha-scj-check-str-popup-input').val('');
			   const $card = $(this).closest('.vha-scj-card');
			   productCode = $card.data('product-id');
			   let devicename = $card.find('.vha-scj-model').text();
			  $modal.find('.vha-scj-check-str-popup-device').text(devicename);
			  $modal.show();
			});

			$modal.find('.vha-scj-check-str-popup-close-icon, .vha-scj-check-str-popup-close-btn').on('click', function() {
			  $modal.hide();
			  $modal.find('.vha-scj-check-str-popup-table').hide();
			  $modal.find('.vha-scj-check-str-popup-pagination-controls').hide();
			  $modal.find('.vha-scj-check-str-popup-pagination-info').text('');
			});
			 $modal.find('.vha-scj-check-str-popup-prev').on('click', function() {
			  if (VhaCheckStore_Cur_Page > 1) renderTable(VhaCheckStore_Cur_Page - 1);
			 });

			$modal.find('.vha-scj-check-str-popup-next').on('click', function() {
			  const totalPages = Math.ceil(checkstoredata.length / VhaCheckStore_Per_Page);
			  if (VhaCheckStore_Cur_Page < totalPages) renderTable(VhaCheckStore_Cur_Page + 1);
			});

		   $modal.on('keydown', '.vha-scj-check-str-popup-hours', function(e) {
			  if (e.key === 'ArrowRight') {
				this.scrollLeft += 20;
			  } else if (e.key === 'ArrowLeft') {
				this.scrollLeft -= 20;
			  }
			});
		   $('.show-current-device-toggle').on('change', function() {
				const isChecked = $(this).is(':checked');
				//const mobileTab = $('.carosuel-main[data-id="mobile"]');
				const tabContainer = $(this).closest(`.carosuel-main[data-id="${ActiveTab}"]`);
				const gridContainer = tabContainer.find('.exsiting-cust-curr-devInfo');
				gridContainer.removeClass('ssj-one-column ssj-two-column');
				if($(this).is(":checked")){
					 gridContainer.addClass('ssj-two-column');
					 tabContainer.find('.ssj-existing-ser-info-container').removeClass('displaynone');
				}
				else{
					 gridContainer.addClass('ssj-one-column');
					 tabContainer.find('.ssj-existing-ser-info-container').addClass('displaynone');
				}
			   
			});
		   //search postal code
		   $(".vha-scj-shipp-postal-code").on("input", function () {
				if ($(this).data("ui-autocomplete")) return;

				$(this).autocomplete({
					minLength: 4,
					source: function (request, response) {
						try {
							var inputVal = request.term;
							var isNumeric = /^\d+$/.test(inputVal);

							var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
							var Inputs = SiebelApp.S_App.NewPropertySet();
							Inputs.SetProperty("ProcessName", "VHA SSJ PostCode Check Process");

							if (isNumeric) {
								Inputs.SetProperty("PostCode", inputVal);
								Inputs.SetProperty("SubUrb", "");
							} else {
								Inputs.SetProperty("PostCode", "");
								Inputs.SetProperty("SubUrb", inputVal);
							}

							var Output = ser.InvokeMethod("RunProcess", Inputs);
							let data = Output.GetChildByType("ResultSet").childArray[0].childArray[0].childArray;
							let suggestions = [];

							data.forEach(function (item) {
								let props = item.propArray;
								let suburb = props["Suburb"] || "";
								let postcode = props["Postcode"] || "";
								let state = props["State"] || "";

								let label = `${suburb}, ${postcode}, ${state}`;
								suggestions.push({
									label: label,
									value: label,
									type: "PostalCodeSearch",
								});
							});

							response(suggestions);
						} catch (e) {
							
					       //alert unbale to search 
						}
					},
					select: function (event, ui) {
						console.log("Selected:", ui.item);
					},
				});
			});
			// check store stock
			$(".vha-scj-check-str-popup-input").on("input", function () {
				if ($(this).data("ui-autocomplete")) return;

				$(this).autocomplete({
					minLength: 4,
					source: function (request, response) {
						try {
							var inputVal = request.term;
							var isNumeric = /^\d+$/.test(inputVal);

							var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
							var Inputs = SiebelApp.S_App.NewPropertySet();
							Inputs.SetProperty("ProcessName", "VHA SSJ PostCode Check Process");

							if (isNumeric) {
								Inputs.SetProperty("PostCode", inputVal);
								Inputs.SetProperty("SubUrb", "");
							} else {
								Inputs.SetProperty("PostCode", "");
								Inputs.SetProperty("SubUrb", inputVal);
							}

							var Output = ser.InvokeMethod("RunProcess", Inputs);
							let data = Output.GetChildByType("ResultSet").childArray[0].childArray[0].childArray;
							let suggestions = [];

							data.forEach(function (item) {
								let props = item.propArray;
								let suburb = props["Suburb"] || "";
								let postcode = props["Postcode"] || "";
								let state = props["State"] || "";

								let label = `${suburb}, ${postcode}, ${state}`;
								suggestions.push({
									label: label,
									value: label,
									type: "Checkstorestock",
								});
							});

							response(suggestions);
						} catch (e) {
							
					       //alert unbale to search 
						}
					},
					select: function (event, ui) {
						console.log("Selected:", ui.item);
						checkstocktable();
					},
				});
			});
		   $('.vha-scj-carousel').on('click', '.vha-scj-quantity-plus', function () {
		  
				const $card = $(this).closest('.vha-scj-card');
				 const dataId = $card.closest('.carosuel-main').data('id');
				const $input = $card.find('.qty-input');
				let currentVal = parseInt($input.val(), 10);
                
				
				if(dataId === 'accessory'){
					if (!isNaN(currentVal) &&  currentVal < 10 && currentRLI[0].AccItem.length < 10) {
						const newVal = currentVal + 1;
						$input.val(newVal);
						//const productId = $card.data('product-id');
					
					}
					else
					{
					// alert('Please select less Accessories');
					$(`.vha-scj-accessory-tab .current-plan-warning-box`).removeClass("displaynone");
					$(`.vha-scj-accessory-tab .current-plan-warning-box .warning-text`).text("Please select less Accessories and refer the customer to a store to purchase any additional accessories outright.");
						return false;
					}
					const productcode = $card.find(".vha-scj-product-code").text().trim();
					const matchedDevice = Accessoriesdata.find((device) => device.propArray["Product Code"] === productcode);
                    const props = matchedDevice.propArray;
			        if (matchedDevice) {
							let matchedDeviceObj = {
								Action: "Add",
								Type: "Accessory",
								ProdIntegrationId: "",
								Accessory__Code: props['Product Code'],
								Accessory__Name: props['Device Name'],
								Accessory__RRP__Exc__GST: props['RRP Exc GST'],
								Accessory__RRP__Inc__GST: props['RRP'],
								Category: props['Category'],
								Prepayment__Amount: ""
							};
							 if(currentRLI[0].AccItem.length < 10){
								currentRLI[0].AccItem.push(matchedDeviceObj);
								$('.vha-ssj-items-num').text(currentRLI[0].AccItem.length);
							 }
							 
					}
				}
			    if (dataId === 'Wearble') {
					if (!isNaN(currentVal) &&  currentVal < 5 && currentRLI[0].SecondaryItem.length < 5) {
						const newVal = currentVal + 1;
						$input.val(newVal);
						//const productId = $card.data('product-id');
					
					}
					else
					{
						// alert('Already Added maximun Quantity 5 - Wearbles');
						$(`.vha-scj-wearbles-tab .current-plan-warning-box`).removeClass("displaynone");
						$(`.vha-scj-wearbles-tab .current-plan-warning-box .warning-text`).text("Maximum of 5 wearables only allowed. Please select less wearables.");
						return false;
					}
					const modelName = $card.find(".vha-scj-model").text().trim();
				   const selectedColor = $card.find(".vha-scj-colour-select").val();
				   const bandsize = $card.find(".vha-scj-band-size-select").val();
				   const band = $card.find(".vha-scj-band-select").val();
				   const casesize = $card.find(".vha-scj-case-size-select").val();
				   const paymentTerm = $card.find(".vha-scj-payment-tr-select").val();
				   const matchedDevice = Wearablesdata.find((device) => device.name === modelName);
			        if (matchedDevice) {
						const matchedVariant = matchedDevice.variants.find((variant) => variant['VHA SMS Colour'] === selectedColor && variant['VHA Band'] === band && variant['VHA Band Size'] === bandsize && variant['VHA Case Size'] === casesize);
                        if (matchedVariant) {
				            let matchedDeviceObj = {
							    Type:"SecondaryDevice",
								Action: "Add", 
								Item__Name: matchedVariant['VHA Product Name'],								
								ProdIntegrationId: "",
								Wearble__Code : matchedVariant['Product Code'],
								Term: paymentTerm,
								RRP__Inc__GST: matchedVariant['VHA RRP Inc GST'],
								BandSize : matchedVariant['VHA Band Size'],
								Band : matchedVariant['VHA Band'],
								CaseSize : matchedVariant['VHA Case Size'],
								Color : matchedVariant['VHA SMS Colour'],
								Additional__Info: "",
								Category: matchedVariant['VHA Category'],
								Insurance: "",
								InsPri: "",
							    
						    };
							if(currentRLI[0].SecondaryItem.length < 5)
								currentRLI[0].SecondaryItem.push(matchedDeviceObj);
						}
							 
					}
			    }
			});
			$('.vha-scj-carousel').on('click', '.vha-scj-quantity-minus', function () {
          
				const $card = $(this).closest('.vha-scj-card');
				const dataId = $card.closest('.carosuel-main').data('id');
				const $input = $card.find('.qty-input');
				let currentVal = parseInt($input.val(), 10);
                
				if (!isNaN(currentVal) && currentVal > 1) {
					const newVal = currentVal - 1;
					$input.val(newVal);
					$(`.vha-scj-accessory-tab .current-plan-warning-box`).addClass("displaynone");
					$(`.vha-scj-wearbles-tab .current-plan-warning-box`).addClass("displaynone");
					//const productId = $card.data('product-id');
					
				}
				
				if(currentVal === 1){
					$card.find(".vha-scj-quantity").addClass('displaynone');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
				}
				
				if(dataId === 'accessory'){
					const productcode = $card.find(".vha-scj-product-code").text().trim();
					//const matchedDevice = Accessoriesdata.find((device) => device.propArray["Product Code"] === productcode);
                
					let data = currentRLI[0].AccItem;
					const index = data.findIndex(p => p["Accessory__Code"] === productcode);
					  if (index !== -1) {
						data.splice(index, 1);
						$('.vha-ssj-items-num').text(currentRLI[0].AccItem.length);
					  }

				}
				if (dataId === 'Wearble') {
					let productcode;
				   const modelName = $card.find(".vha-scj-model").text().trim();
				   const selectedColor = $card.find(".vha-scj-colour-select").val();
				   const bandsize = $card.find(".vha-scj-band-size-select").val();
				   const band = $card.find(".vha-scj-band-select").val();
				   const casesize = $card.find(".vha-scj-case-size-select").val();
				   const paymentTerm = $card.find(".vha-scj-payment-tr-select").val();
				   const matchedDevice = Wearablesdata.find((device) => device.name === modelName);
			       if (matchedDevice) {
					   const matchedVariant = matchedDevice.variants.find((variant) => variant['VHA SMS Colour'] === selectedColor && variant['VHA Band'] === band && variant['VHA Band Size'] === bandsize && variant['VHA Case Size'] === casesize);
                        if (matchedVariant) {
							productcode = matchedVariant['Product Code'];
						}
				   }
				   let data = currentRLI[0].SecondaryItem;
				   const index = data.findIndex(p => p["Wearble__Code"] === productcode);
				   if (index !== -1) {
					data.splice(index, 1);
				   }
				   
				}
			});
		   //plans Pagination dhana
		   $(".carousel-nav-prev").click(function () {
			   if (currPage > 0) {
				   currPage--;
				   const device = $(this).closest(".availableplansheadingcontainer1").data("device");
				   showPage(currPage, device);
			   }
		   });
   
		   $(".carousel-nav-next").click(function () {
			   totalItems = filterPlans.length;
			   totalPages = Math.ceil(totalItems / itemsPerPage);
			   if (currPage < totalPages - 1) {
				   currPage++;
				   const device = $(this).closest(".availableplansheadingcontainer1").data("device");
				   showPage(currPage, device);
			   }
		   });
		   //Clear selection 
		   $(".vha-scj-step3-clear-selectn").on('click', function(){
			    //reset tiles
				ResetDeviceTiles();
			   
				//reset plansTiles
			   resetPlansTiles();
				
				let Temp_scJson = JSON.parse(JSON.stringify(OriginalJSON()));
				currentRLI = [];
				currentRLI.push(Temp_scJson.QuoteHeader.RootItem[0]);
				currentRLI[0].Id = 'QLI-' + (scJson.QuoteHeader.RootItem.length + 1);
				currentRLI[0].SrvType = "New Service";
				
		   });

		   // select by proposition
		   $(".availableplansheadingcontainer1 #Selectbypropositionmenu").on('change', function(){
			   const selectedProp = $(this).val();
			   const device = $(this).closest(".availableplansheadingcontainer1").data("device");
			   filterByProposition(selectedProp, device);
		   });
			
		   // select button functionality in plans
		  $(".plancontainer").on("click", ".vha-scj-select-plan", function () {

				const $card = $(this).closest(".availableplansdetailContainers");
				const planCode = $card.data("plan-code");
			    const dataDevice = $(this).closest('.availableplansheadingcontainer1').data('device');
			    let checkscJson = scJson.QuoteHeader.RootItem || [];
				let hasUpdatingCart = checkscJson.some(item => item.CartStatus === "UpdateinProgress");
				    if(dataDevice === "mobile"){
						if((currentRLI[0].DeviceItem && currentRLI[0].DeviceItem.length > 0)){
							filterPlans = [...filterDevicePlans];
						}
					else{
						filterPlans = [...jsonplans];
					}
				}
			    if(dataDevice === "tablet"){
					if((currentRLI[0].TabletItem && currentRLI[0].TabletItem.length > 0)){
						filterPlans = [...filterDevicePlans];
					}
					else{
						filterPlans = [...jsonTabletMbbPlans];
					}
				}  
			    const matchedPlanCode = filterPlans.filter((data) => data.propArray.Plan_Code === planCode);
			    let tempPlan = createPlanObj(matchedPlanCode[0].propArray);
				const proposition = matchedPlanCode[0].propArray.Proposition_Name;
			    const propSamId = matchedPlanCode[0].propArray.Proposition_Sam_Id;
                
			  if(filteredExistingServices != undefined){
				  $(`.availableplans .availableplansdetailContainers`).removeClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone').find('.planCount').val(0);
			      $(`.availableplans .vha-scj-select-plan`).text("Select").removeClass("selected-card-plan-btn");
				   $card.addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
				 $(this).text("Selected").addClass("selected-card-plan-btn");
				  currentRLI[0].PlanItem = {};
				  currentRLI[0].Proposition = "";
				  currentRLI[0].PropSAMId = "";
			      currentRLI[0].PlanItem = tempPlan;
				 currentRLI[0].Proposition = proposition;
				 currentRLI[0].PropSAMId = propSamId
			  }
			  else{

				if(!hasUpdatingCart)
				{
					if(lockedPlanCode === planCode){
						if(!canAddMorePlans()){
						  // alert("You can select upto 10 plans only.");
						  if(dataDevice === "mobile" || dataDevice === "tablet"){
							  $(`.availableplansheadingcontainer1[data-device="${dataDevice}"] .current-plan-warning-box`).removeClass("displaynone");
							  // $(`.availableplansheadingcontainer1[data-device="${dataDevice}"] .current-plan-warning-box .warning-icon`).addClass("displaynone");
							  $(`.availableplansheadingcontainer1[data-device="${dataDevice}"] .current-plan-warning-box .warning-text`).text("Adding more than a 10 plans is not allowed.");
							  return false;
							  }
						}
					}

				$(`.availableplansheadingcontainer1[data-device="mobile"] .current-plan-warning-box`).addClass("displaynone");
				$(`.availableplansheadingcontainer1[data-device="tablet"] .current-plan-warning-box`).addClass("displaynone");
			  // reset selected plans and currentrli
			  selectedPlans =[];
			  let Temp_scJson = JSON.parse(JSON.stringify(OriginalJSON()));
			  if(currentRLI.length === 1){
				  currentRLI[0].PlanItem = {};
				   currentRLI[0].Proposition = "";
				   currentRLI[0].PropSAMId = "";
				   currentRLI[0].SrvType="";
			  }
			  else{
				  currentRLI = [];
				  currentRLI.push(Temp_scJson.QuoteHeader.RootItem[0]);
				  currentRLI[0].SrvType = "New Service";
			  }
			  
			   checkQliNum();
			  
			  $(`.availableplans .availableplansdetailContainers`).removeClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone').find('.planCount').val(0);
			$(`.availableplans .vha-scj-select-plan`).text("Select").removeClass("selected-card-plan-btn");

			  selectedPlans = selectedPlans.filter(p => p.planCode !== lockedPlanCode);
			  
			  

			  if(!matchedPlanCode) return;

			   $card.addClass("selected-card-plan");
				$(this).text("Selected").addClass("selected-card-plan-btn");
			  
            if(currentRLI[0].mobilePlanfirst ==='Y'){
				currentRLI[0].DeviceItem = [];
			}
			 if((currentRLI[0].DeviceItem && currentRLI[0].DeviceItem.length > 0) || (currentRLI[0].TabletItem && currentRLI[0].TabletItem.length > 0) ){
				$card.find('.mbPlanCounter').addClass('displaynone').find('.planCount').val(0);
				if(currentRLI[0].mobilefirst === 'Y'){
					currentRLI[0].mobilePlanfirst = 'N';
				}
				if(currentRLI[0].mobilefirst === 'N'){
				   currentRLI[0].mobilePlanfirst = 'Y';
					getDeviceData(planCode);
					filteredDevices = filterByBrands(["Apple"], "mobile");
					$('.scj-filtermobiles').prop('checked', false);
					$('.scj-filtermobiles[value="Apple"]').prop("checked", true);
					CreateDeviceTiles(filteredDevices, "mobile");
				}
			  }
			  else{
				  if(hasUpdatingCart){
					$card.find('.mbPlanCounter').addClass('displaynone').find('.planCount').val(0);
					
				  }
				  else{
				    $card.find('.mbPlanCounter').removeClass('displaynone').find('.planCount').val(1);
					if(currentRLI[0].mobilefirst === 'Y'){
						currentRLI[0].mobilePlanfirst = 'N';
					}
					if(currentRLI[0].mobilefirst === 'N'){
					   currentRLI[0].mobilePlanfirst = 'Y';
						getDeviceData(planCode);
						filteredDevices = filterByBrands(["Apple"], "mobile");
						$('.scj-filtermobiles').prop('checked', false);
						$('.scj-filtermobiles[value="Apple"]').prop("checked", true);
						CreateDeviceTiles(filteredDevices, "mobile");
					}
				  }
				}
			  checkQliNum();
			  
			  //Save Selection
			  selectedPlans.push(tempPlan);
			  currentRLI[0].PlanItem = tempPlan;
			  currentRLI[0].Proposition = proposition;
			  currentRLI[0].PropSAMId = propSamId;
			  currentRLI[0].SrvType = "New Service";
			  lockedPlanCode = planCode;

			  //Update UI
						$card.addClass("selected-card-plan");
						$(this).text("Selected").addClass("selected-card-plan-btn");

			  if(currentRLI[0].DeviceItem && currentRLI[0].DeviceItem.length > 0){
				$card.find('.mbPlanCounter').addClass('displaynone').find('.planCount').val(0);
			  }
			  }
			  else{
				  $(`.availableplans .availableplansdetailContainers`).removeClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone').find('.planCount').val(0);
			      $(`.availableplans .vha-scj-select-plan`).text("Select").removeClass("selected-card-plan-btn");
				   $card.addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
				 $(this).text("Selected").addClass("selected-card-plan-btn");
				  currentRLI[0].PlanItem = {};
				  currentRLI[0].Proposition = "";
				  currentRLI[0].PropSAMId = "";
			      currentRLI[0].PlanItem = tempPlan;
				 currentRLI[0].Proposition = proposition;
				 currentRLI[0].PropSAMId = propSamId; 
					}
					}
			});

		   // Plus Counter
			 $('.plancontainer').on('click', '.mbPlanCounter .plus', function () {
				 
				  const $card = $(this).closest(".availableplansdetailContainers");
				  const planCode = $card.data("plan-code");
				  const dataDevice = $(this).closest('.availableplansheadingcontainer1').data('device');

				  if(!canAddMorePlans()){
				  // alert("You can select upto 10 plans only.");
					  if(dataDevice === "mobile" || dataDevice === "tablet"){
					  $(`.availableplansheadingcontainer1[data-device="${dataDevice}"] .current-plan-warning-box`).removeClass("displaynone");
					  // $(`.availableplansheadingcontainer1[data-device="${dataDevice}"] .current-plan-warning-box .warning-icon`).addClass("displaynone");
					  $(`.availableplansheadingcontainer1[data-device="${dataDevice}"] .current-plan-warning-box .warning-text`).text("Adding more than a 10 plans is not allowed.");
					  return false;
				  }
			  }

			  // Match Plan Data
			  const matchedPlanCode = filterPlans.filter((data) => data.propArray.Plan_Code === planCode);
			  if(!matchedPlanCode) return;
			  let tempPlan = createPlanObj(matchedPlanCode[0].propArray);
			  const proposition = matchedPlanCode[0].propArray.Proposition_Name;
			  const propSamId = matchedPlanCode[0].propArray.Proposition_Sam_Id;
              const $countInput = $card.find('.planCount');
			  let count = parseInt($countInput.val(),10) || 0;
			  count++;
			  $countInput.val(count);
							selectedPlans.push(tempPlan);
								let TempScJson = JSON.parse(JSON.stringify(OriginalJSON()));
								let newRLI = TempScJson.QuoteHeader.RootItem[0];
								TempScJson.QuoteHeader.RootItem = [];
					// newRLI.Id = "QLI-" + (currentRLI.length + 1);
								newRLI.PlanItem = tempPlan;
				                 newRLI.Proposition = proposition;
								 newRLI.PropSAMId = propSamId;
								 newRLI.SrvType = "New Service";
								currentRLI.push(newRLI);
				    checkQliNum();

			 });
				
			 
			//Minus Counter
			 $('.plancontainer').on('click', '.mbPlanCounter .minus', function () {
				 
				 const $card = $(this).closest(".availableplansdetailContainers");
				  const planCode = $card.data("plan-code");
				  const $countInput = $card.find('.planCount');
			      let count = parseInt($countInput.val(),10) || 0;
				  const dataDevice = $(this).closest('.availableplansheadingcontainer1').data('device');
				 
				 if(canAddMorePlans){
					 $(`.availableplansheadingcontainer1[data-device="${dataDevice}"] .current-plan-warning-box`).addClass("displaynone");
					 // $(`.availableplansheadingcontainer1[data-device="${dataDevice}"] .current-plan-warning-box .warning-icon`).removeClass("displaynone");
				 }
				 if(count > 1){
			        count--;
			        $countInput.val(count);
					let index = currentRLI.findIndex((rli) => rli.PlanItem && rli.PlanItem.Code === planCode);
					if(index !== -1){
						selectedPlans.splice(index, 1);
						currentRLI.splice(index, 1);
							}
						}
			    else {
					if(currentRLI.length === 1)
					{
						currentRLI[0].PlanItem = {};
						selectedPlans = [];
						currentRLI[0].Proposition = "";
					   currentRLI[0].PropSAMId = "";
					   currentRLI[0].SrvType = "";
					}
				
			        $countInput.val(0);
					$card.find('.mbPlanCounter').addClass('displaynone');
			        $card.removeClass('selected-card-plan');
			        $card.find('.vha-scj-select-plan').text('Select').removeClass('selected-card-plan-btn');
				}
				checkQliNum();
			});

			$(".show-current-plan-toggle").on('change', function() {
			    if($(this).is(":checked")){
			        // alert("checkeddd..");
					$(`.availableplansheadingcontainer1 .availableplans .current-plancontainer`).removeClass("displaynone");
			        renderCurrentPlan();
					if (filteredExistingServices.OutOfMarket === "Y") {
					    if (filteredExistingServices.SiebelProdType === "Voice") {
					        $(`.availableplansheadingcontainer1[data-device="mobile"] .current-plancontainer .stockStatus`).removeClass("displaynone");
					    }
					
					    if (filteredExistingServices.SiebelProdType === "Mbb") {
					        $(`.availableplansheadingcontainer1[data-device="tablet"] .current-plancontainer .stockStatus`).removeClass("displaynone");
					    }
					}
			        $(".current-plancontainer").show();
			        // <span class="vha-msg-itm">You are editing `</span>
			    }
			    else{
			        $(".current-plancontainer").hide();
			    }
			});
			function renderCurrentPlan() {
				const $container = $(`.availableplansheadingcontainer1 .availableplans .current-plancontainer`);
				$container.empty();
				let combinedDate = "";
				let details = filteredExistingServices.ListOfRatePlan.RatePlan;
				let startDate = details["Start Date"];
				let endDate = details["End Date"];
				if (startDate != undefined && endDate != undefined) {
					combinedDate = formatDateRange(startDate, endDate);
					$container.find(`.current-plan-details-container .date`).removeClass("displaynone");
				}
				$container.find(`.current-plan-details-container .date`).addClass("displaynone");
				if (details && Object.keys(details).length > 0) {
					let html = `<div class = "current-plan-details-container">
			<div class="current-plandetails-wrapper">
			<div class="plandetailsitemsmain">
			<div class="currentPlan">Current plan</div>
			<div class="stockStatus displaynone">
			<div><img src="images/custom/vha-scj-warningIcon_10_10.svg"/></div>
			<div class=" planStock ParagraphBody2">Out of market</div>
			</div>
			<div class="  propositionName ParagraphBody2">${filteredExistingServices.Proposition}</div>
			<div class="  planName ParagraphBody2Strong">${details.Name}</div>
			<div class=" monthOfferValue ParagraphBody2 ">
			<span id="permonthoffervalue">$</span><span class=" data-permonthoffervalue">${details.GSTIncluded}</span><span>/mo<span>
			</div>
			<div class="  plandetailsitemsrow details ">
			<div class=" ParagraphBody2Strong ">Contract</div>
			<div id="nationalcalls " class=" date  value  ParagraphBody2">${combinedDate}</div>
			</div>
			<div class=" plandetailsitemsrow details">
			<div class=" ParagraphBody2Strong">Data</div>
			<div id="data " class="value  ParagraphBody2">${details.Data}</div>
			</div>
			<div class=" plandetailsitemsrow details">
			<div class=" ParagraphBody2Strong">National calls</div>
			<div id="nationalcalls " class="value  ParagraphBody2">${details["National calls"]}</div>
			</div>
			<div class=" plandetailsitemsrow details">
			<div class=" ParagraphBody2Strong">National SMS</div>
			<div id="nationalsms" class="value  ParagraphBody2">${details["National SMS"]}</div>
			</div>
			<div class=" plandetailsitemsrow details">
			<div class=" ParagraphBody2Strong">IDD Zone 1</div>
			<div id="idzone1" class="value ParagraphBody2">${details["IDD Zone 1"]}</div>
			</div>
			<div class=" plandetailsitemsrow details">
			<div class=" ParagraphBody2Strong">IDD Zone 2</div>
			<div id="idzone2" class="value ParagraphBody2">${details["IDD Zone 2"]}</div>
			</div>
			</div>
			</div>
			</div>`;
					$(".current-plancontainer").html(html);
				} else {
					// alert("No current plan available");
					$(".show-current-plan-toggle").prop("checked", false);
					$(".current-plancontainer").hide();
				}
			}
			
			
				$("#manualaddresscheckbox").on('click', function () { // added by Vinay Kumar
					if ($(this).is(':checked')) {
					SiebelApp.S_App.GetActiveView().GetApplet("VF SSJ Coverage Check List Applet").InvokeMethod("NewQuery");
					setTimeout(function () {
					$('td[aria-roledescription="Coverage Type"] span.siebui-icon-pick').click();
					}, 100);
					}
				});
	
		   //calc service total: jeeten
		   function calcServiceTotal(divId){
				var totalPrice=0;
				var recurrringCharges = 0;	
				$("#"+divId+" .item-list-price.toAdd").each(function(){
					const price = parseFloat($(this).text().replace(/[^0-9.]/g, ''));
					if (!isNaN(price)) {
					totalPrice += price;
					}
				});
				$("#"+divId+" .item-list-price.toSubtract").each(function(){
					const price = parseFloat($(this).text().replace(/[^0-9.]/g, ''));
					if (!isNaN(price)) {
					totalPrice -= price;
					}
				});
				$("#"+divId+" .vha-service-cost").text("$"+totalPrice.toFixed(2));
				calcTotalCharges();
			}
			//calc total price: jeeten
			function calcTotalCharges(){
				var recurrringCharges = 0.00;
				var onetimeCharges = 0.00;
				var sTotal= 0.00;
				var subtotal = 0.00;//DFA
				var sDeliveryfee = 10.00;//DFA
				var sDiscounts = 0.00;//DFA				
				$('#vha-scj-Existing-services .item-header .vha-service-cost').each(function(){
					const price = parseFloat($(this).text().replace(/[^0-9.]/g, ''));
					if (!isNaN(price)) {
						recurrringCharges += price;
					}
				});
				$("#vha-rec-amount-ext").text('$'+ recurrringCharges.toFixed(2));
				$("#vha-Total-bill-ext").text('$'+ recurrringCharges.toFixed(2));
				$('#vha-scj-New-services .item-header .vha-service-cost').each(function(){
					const price = parseFloat($(this).text().replace(/[^0-9.]/g, ''));
					if (!isNaN(price)) {
						recurrringCharges += price;
					}
				});
				$('#vha-sub-total').text('$'+ recurrringCharges.toFixed(2));//DFA
				$('#vha-del-fee').text('$'+ sDeliveryfee.toFixed(2));//DFA
				
				if (SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "TPG" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "iiNet")//DFA
					$('#vha-rec-amount').text('$'+ recurrringCharges.toFixed(2) + '/mth');
				else
					$('#vha-rec-amount').text('$'+ recurrringCharges.toFixed(2));
				if (SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "TPG" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "iiNet")//DFA
					sTotal = recurrringCharges+ sDeliveryfee;
				else
					sTotal = recurrringCharges+ onetimeCharges;			
				$("#vha-Total-bill").text('$'+ sTotal.toFixed(2));
				//update total amount in Json 
				scJson.QuoteHeader.AllCostPerMonth = parseFloat(sTotal.toFixed(2));
			}
		   		   
			//Configure Selected Svcs btn //Marvin
			$('.vha-scj-step3-cfg-slcd-serv').click(function () {				
				let sJsonMsg = JSON.stringify(scJson);
				fnSaveJsonDomToDB(TheApplication().GetProfileAttr("SSJParentOrderId"),"JSON",sJsonMsg);
				$("#loadingIcon").show();
				if(SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Parent Order Form Applet"].GetBusComp().GetFieldValue("Account Id"))
				{
					CreateLineItem("Existing","");
				}				
				if (Array.isArray(scJson.QuoteHeader.RootItem)) {
					if (scJson.QuoteHeader.RootItem.length > 0) {
						CreateLineItem("NewService","");
					}
				}
				setTimeout(function () {
					$("#loadingIcon").hide();
					SiebelApp.S_App.GetActiveView().GetApplet("VHA SSJ Order Entry Line Item List Applet").InvokeMethod("NewQuery");
					SiebelApp.S_App.GetActiveView().GetApplet("VHA SSJ Order Entry Line Item List Applet").InvokeMethod("ExecuteQuery");
					let sCusEnable = document.querySelectorAll('option[value="customize"]');
					for(let c = 0; c <= sCusEnable.length-1; c++){
						sCusEnable[c].removeAttribute("disabled");
					}
					console.log("timeout");
				}, 5000);
			});
			//Marvin Added for Save quote and exit
			$('.vha-scj-savexit-quote').click(function () {
				let sJsonMsg = JSON.stringify(scJson);
				fnSaveJsonDomToDB(TheApplication().GetProfileAttr("SSJParentOrderId"),"JSON",sJsonMsg);
				fnExitSsjPage("Quote Order");
			});
			//Marvin Added for Exit in coverage check
			$('#vha-scj-step2-cancelButton').click(function () {
				fnExitSsjPage("Quote Order");
			});
			
			/**Ganesh Quote summary PDF**/
			$('#vha-create-qt-btn').click(function () {
				//Marvin: Added to create missing line before launching the Quote Summary
				let countExist = 0;
				let countNew = 0;
				let totalLine = 0;

				if(scJson.QuoteHeader.ExistingServices.length > 0)
				{	scJson.QuoteHeader.ExistingServices[0].forEach(function(exist){
						if(exist.update)
						{	count = count + 1;
						}
					});
				}
				if(scJson.QuoteHeader.RootItem.length > 0)
				{	countNew = scJson.QuoteHeader.RootItem.length;
				}
				totalLine = countExist + countNew;
				if(totalLine > SiebelApp.S_App.GetActiveView().GetApplet("VHA SSJ Order Entry Line Item List Applet").GetNumRows())
				{	$('.vha-scj-step3-cfg-slcd-serv').click();
				}
				//Marvin: End of change
				scJson.QuoteHeader.QuoteNumber = SiebelApp.S_App.GetActiveView().GetApplet("VHA SSJ Parent Order Form Applet").GetBusComp().GetFieldValue("Order Number");
				scJson.QuoteHeader.QuoteId = TheApplication().GetProfileAttr("SSJParentOrderId");
				var doc = SiebelAppFacade.VHANSASalesCalcUpgradePDFPR.createPDF(scJson, '')
				var base64PDF = doc.output("datauristring").split(",")[1];
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				var Inputs = SiebelApp.S_App.NewPropertySet();
				Inputs.SetProperty("Service Name", "VHA Sales Calculator BS");
				Inputs.SetProperty("Method Name", "DeleteOrderEntryAttachment");
				Inputs.SetProperty("Order Id", scJson.QuoteHeader.QuoteId);
				var Output = ser.InvokeMethod("Run Process", Inputs);
					insertPDF(base64PDF);
					
					$('.vha-scj-email-quote').on("click", function () {
                                    //Hari added
                                    var email = $('[aria-label="Email address"]').val();
                                    var emailvalid = "N";
									var errmsgEmail = '<span class="inlineErrmsg"></span>'
                                    //if ((scJson.QuoteHeader.CustomerType == "New" &&  email!="" && $("#vha-sc-Inquiry").prop("checked")) || ($("#vha-sc-MarketingInfo").prop("checked") && scJson.QuoteHeader.CustomerType == "Existing" &&  email!="" && $("#vha-sc-Inquiry").prop("checked"))) {
                                    if (email != "" && $('[aria-label="Customer has consented to receive quote email"]').prop("checked")) {
                                        var regex = /^(?=.{1,64}$)([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                                        if (regex.test(email)) {
                                            if (scJson.QuoteHeader.CustomerType == "New") {
                                                scJson.QuoteHeader.NewCustDtls.EmailAddress = email;
                                            } else {
                                                scJson.QuoteHeader.ExistingCustDtls.EmailAddress = email;
                                            }
                                            emailvalid = "Y";
                                        } else {
											var sc_message = 'Please enter valid Email Id';
											if($('.inlineErrmsg').length < 1)
											{	$('.SSJ-fields-container').append($(errmsgEmail).text(sc_message));
											}
											else{
												$('.inlineErrmsg').text(sc_message);
											}
                                           // alert("Please enter valid Email Id");
                                        }
                                        if (emailvalid === "Y") {
                                            
											
                                         
                                            if (scJson.QuoteHeader.CustomerType == "New") {
                                                if (($("#vha-sc-MarketingInfo").prop("checked")))
                                                    scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo = "Y";
                                                else
                                                    scJson.QuoteHeader.NewCustDtls.ReceiveMarketingInfo = "N";

                                                scJson.QuoteHeader.NewCustDtls.EmailAddress = email;

                                                if (($("#vha-sc-Inquiry").prop("checked")))
                                                    scJson.QuoteHeader.NewCustDtls.Inquiry = "Y";
                                                else
                                                    scJson.QuoteHeader.NewCustDtls.Inquiry = "N";

                                              
                                            } else {

                                                if (($("#vha-sc-MarketingInfo").prop("checked")))

                                                    scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo = "Y";
                                                else
                                                    scJson.QuoteHeader.ExistingCustDtls.ReceiveMarketingInfo = "N";

                                                scJson.QuoteHeader.ExistingCustDtls.EmailAddress = email;

                                                if (($("#vha-sc-Inquiry").prop("checked")))
                                                    scJson.QuoteHeader.ExistingCustDtls.Inquiry = "Y";
                                                else
                                                    scJson.QuoteHeader.ExistingCustDtls.Inquiry = "N";

                                               
                                            }
                                            

                                           // var sEmailNotify = scJson.QuoteHeader.CustomerType == "New" ? scJson.QuoteHeader.NewCustDtls.EmailAddress : scJson.QuoteHeader.ExistingCustDtls.EmailAddress;
                                           // var sContName = scJson.QuoteHeader.CustomerType == "New" ? scJson.QuoteHeader.NewCustDtls.FirstName : scJson.QuoteHeader.ExistingCustDtls.CustomerName;
                                            var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                                            var Inputs = SiebelApp.S_App.NewPropertySet();
                                            //Inputs.SetProperty("ProcessName", "VHA Send Quote NSA Email WF");
                                            Inputs.SetProperty("ProcessName", "VHA SSJ Send Quote Email WF");
                                            Inputs.SetProperty("Object Id", scJson.QuoteHeader.QuoteId);
                                            Inputs.SetProperty("QuoteNo", scJson.QuoteHeader.QuoteNumber); // TULASIY:07May2024::Created for QuoteNo Attachment Change
                                            Inputs.SetProperty("QuoteAttId", scJson.QuoteHeader.QuoteAttId);
                                            //Inputs.SetProperty("ContactName", sContName);
                                            Inputs.SetProperty("VHAEmailAdd", email);
                                            Inputs.SetProperty("SourceBusObj", "Order Entry (Sales)");
                                            var Output = ser.InvokeMethod("RunProcess", Inputs);
                                           // $("#TSNSAEmailNotification").addClass("vha-sc-SendEmailNote"); // Hari added
                                            //$("#TSNSAEmailNotification").html("Email is sent to " + sEmailNotify + " successfully");
                                           // $("#TSNSAEmailNotification").html("<span class='mailsent_check-mark'><span class='mail-check-mark'></span></span> <span class='ml-5'>Email is sent to</span> " + email + " successfully");
											$('.inlineErrmsg').remove();
											$('.SSJ-fields-container').append("<span class='mailSuccess ml-5'>Email is sent to " + email + " successfully</span>");
                                        }
                                    } 
									else {
                                        var sc_message = (email === "") ? "Please enter the Email Id" : "Please select the 'Consent to receive quote email' flag";
										
										//$('.SSJ-fields-container').append($(errmsgEmail).text(sc_message));
                                        //alert(sc_message);
										$('.mailsent_check').remove();
										$('.mailsent_check-mark').remove();
										if($('.inlineErrmsg').length < 1)
											{	$('.SSJ-fields-container').append($(errmsgEmail).text(sc_message));
											}
											else{
												$('.inlineErrmsg').text(sc_message);
											}
                                    }
                                });
		   });
			function insertPDF(base64PDF) {
				var ajaxSetting = {
				"async": true,
				"crossDomain": true,
				"url": apilovurl + "VHAOrderEntryAttachmentBS/Insert",
				"method": "POST",
				"headers": {
				"content-type": "application/json",
				"cache-control": "no-cache",
				"postman-token": "5c1f0ef1-1226-5653-dba8-72a6c0e242c9"
				},
				"processData": false,
				"data": '{"body":{"LOVLanguageMode":"LDC","SiebelMessageIn":{"IntObjectName":"VHAOrderEntryAttachmentIO","ListOfVHAOrderEntryAttachmentIO":{"Order Entry Attachment":{"Id":"Q123456","Order Id":"' + scJson.QuoteHeader.QuoteId + '","OrderFileExt":"pdf","OrderFileName":"' + scJson.QuoteHeader.QuoteNumber + '_QuotePackage","Order Attachment Id":"' + base64PDF + '"}}}}}' // TULASIY:07May2024::Created for QuoteNo Attachment Change
				};
				$.ajax(ajaxSetting).done(function (response) {
				//console.log(response);
				scJson.QuoteHeader.QuoteAttId = response["SiebelMessageOut"]["Order Entry Attachment"].Id;
				//console.log("PDF inserted successfully to Quote");
				}).fail(function (response, textStatus) {
				//console.log(response);
				console.log("PDF insert Failed to Quote");
				});		
				$('.vha-scj-siebelapplet7').show(); 				
				$('.vha-scj-siebelapplet5').show(); 				
				$('.vha-scj-siebelapplet9').show(); 				
				//$('.vha-scj-stp3-col1').hide();				
				$('.vha-scj-st3-tabs').hide(); 
				$('.mobilecoveragecheckstep3container').hide(); 
				$('.vha-scj-st3-mb-devicestabs').hide(); 
				$('.vha-scj-st3-mb-plans').hide(); 
				$('.vha-scj-stp3-col2').hide();	
				$('.vha-scj-st3-footer').hide();	
				$('.vha-scj-st3-footer').addClass('displaynone');	
				$('.vha-scj-st3-new-serv').addClass('displaynone');	
				if($('.vha-scj-last-footer').length == 0)
				{
					if($('.vha-scj-email-quote').length < 1){
						
					//$('.vha-scj-siebelapplet5 div[aria-label="Quote Summary in Sales Quote Order"] div').append('<div class="vha-sc-bldnewpln-cust-dtls mb-4 mr-3 bg-white"><div class="vha-sc-emailid vha-sc-btn-div"><span class="vha-sc-emailid-lbl">Email Id</span><input class="vha-sc-emailid-val" type="email" id="vha-sc-Email"><span class="vha-sc-att-icon" id="TSNSASendEmail"><img src="images/email-24px.svg"></span></div></div>');
					
					$('input[aria-label="Email address"]').after('<button class="vha-scj-email-quote">Email quote</button><button class="vha-scj-print-quote">Print quote</button>');
					$('input[aria-label="Email address"]').css('display','flex');
					
					
										
					$('.vha-scj-siebelapplet7').append($('.vha-scj-siebelapplet4 div').html());
					
					}
					
					$('.vha-scj-siebelapplet9').append('<div class="vha-scj-last-footer bg-white d-flex"><div class="stpLast-btns"><button class="vha-scj-cancel-quote">Cancel Quote</button><button class="vha-scj-stpLast-back">Back</button></div><div class="stpLast-btns"><button class="vha-scj-submitQuote">Create Order</button></div></div>');
					
					
										
				}			
				$('.vha-scj-stpLast-back').click(function () {							
					//$('.vha-scj-stp3-col1').hide();				
					$('.vha-scj-st3-tabs').show(); 
					$('.mobilecoveragecheckstep3container').show(); 
					$('.vha-scj-st3-mb-devicestabs').show(); 
					$('.vha-scj-st3-mb-plans').show(); 
					$('.vha-scj-stp3-col2').show();	
					$('.vha-scj-st3-footer').show();
					$('.vha-scj-st3-footer').removeClass('displaynone');
					$('.vha-scj-st3-new-serv').removeClass('displaynone');
					//$('.vha-scj-siebelapplet4').hide(); 
					$('.vha-scj-siebelapplet5').hide(); 					
					$('.vha-scj-siebelapplet7').hide(); 					
					$('.vha-scj-siebelapplet9').hide(); 					
					$('.vha-scj-last-footer').remove();
					
				});
				$('.vha-scj-print-quote').click(function () {
						SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Quote Summary Attachment Applet"].InvokeMethod("NewQuery");
 
						SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Quote Summary Attachment Applet"].InvokeMethod("ExecuteQuery");
						$('a[name="OrderFileName"]')[0].click();
					});
				
				$('.vha-scj-submitQuote').click(function () {
					var quoteSubmitSer = SiebelApp.S_App.GetService("Workflow Process Manager");
					var quoteSubmitInp = SiebelApp.S_App.NewPropertySet();
					//Jeeten: 27-oct: for Soumalya
					if (SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Quote Summary Header Form Applet"]) {
						SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Quote Summary Header Form Applet"].InvokeMethod("WriteRecord");
					}//
					const SSJParentOrderId =  TheApplication().GetProfileAttr("SSJParentOrderId");
					quoteSubmitInp.SetProperty("ProcessName", "VHA SSJ Update Header Status");
					quoteSubmitInp.SetProperty("Object Id", SSJParentOrderId);
					var Output = quoteSubmitSer.InvokeMethod("RunProcess", quoteSubmitInp);
				});
				$('.vha-scj-cancel-quote').click(function () {
						var ssjParentOrdID = TheApplication().GetProfileAttr("SSJParentOrderId");
						let cancelQt = SiebelApp.S_App.GetService("VF BS Process Manager");
						let cancelQtIn = SiebelApp.S_App.NewPropertySet();
						let cancelQtOut = SiebelApp.S_App.NewPropertySet();
						cancelQtIn.SetProperty("Service Name", "VF SSJ Cancel Quote BS");
						cancelQtIn.SetProperty("ParOrderId", ssjParentOrdID);
						cancelQtIn.SetProperty("Method Name", "CancelParentOrder");
						cancelQtOut = cancelQt.InvokeMethod("Run Process", cancelQtIn);
					});				
			}
			
			
			/**Ganesh Quote summary PDF**/
		   

			function getOfferSequence() {
				return "";
		   }

		   function getOffersSSJ(serv) {
				var HeaderId = "";
			    var AstIntId = "";
			    var Source = "";
			    var vMaxSeq = "";
			    var ExtCust = "";
			    var DeviceCode = "";
			    var DeviceTerm = "";
			    var PropSAMId = "";
			    var RatePlanSAMId  = "";
			    var AccCode = "";
				var vOffers = "";
				HeaderId = SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SSJ Parent Order Form Applet'].GetBusComp().GetIdValue();
				AstIntId = "";
				Source = "SSJUI";
				vMaxSeq = getOfferSequence();
				ExtCust = SiebelApp.S_App.GetProfileAttr("SalesCalcExistCust") == "Y" ? "Y" : "N" ;
				//offer vars
				let offerName = "";
				let SplRatingType = "";
				let period = "";
				let data = "";
				let gpi = "";
				let credit = "";
				let loyalty = "";
				//Marvin: Created for Upgrade.
				let appCode = ""; //Set to null for now as still waiting for Term. Exp Val: AccCode-Term then separated by "|" for multiple.
				let ordType = "";
				let upgOfferType = "";
				let delDevCode = "";//Waiting for the Payout
				let assetIntegId = "";//Waiting for the Payout
				//Marvin: Created for Upgrade.
				if(Object.keys(serv.PlanItem).length > 0 && serv.DeviceItem.length > 0)
				{	upgOfferType = "Upgrade to New Plan";
				}
				if(Object.keys(serv.PlanItem).length === 0 && serv.DeviceItem.length > 0)
				{	upgOfferType = "Upgrade RRP on Instalment";
				}
				if(serv.SrvType === "Upgrade Service")
				{	ordType = "Modify";
				}

				$.map(serv.DeviceItem, function (dev) {
					if (dev.Name) {
						DeviceCode = dev.Item__Code;
						DeviceTerm = dev.DeviceTerm;
						PropSAMId = dev.PropSAMId;
					}
				});
				$.map(serv.SDItem, function (SD) {
					if (SD.Name) {
						
					}
				});
				if (serv.PlanItem.Name) {
					RatePlanSAMId = serv.PlanItem.Code;
				}
				$.map(serv.AccItem, function (dev) {
				    if (dev.Accessory__Code) {
				        AccCode += "|"+dev.Accessory__Code;
				    }
				});
				//HeaderId, AstIntId, Source, vMaxSeq, ExtCust, DeviceCode, DeviceTerm, PropSAMId, RatePlanSAMId
				let sOffers = VHAAppUtilities.fetchOffers(HeaderId, AstIntId, Source, vMaxSeq, ExtCust, DeviceCode, DeviceTerm, PropSAMId, RatePlanSAMId, AccCode, appCode, ordType, upgOfferType, delDevCode, assetIntegId, serv.SrvType);
				if(sOffers){
					console.log("vOffers ", sOffers.GetChildByType("ValidatedOffers"));
					if (sOffers.GetChildByType("ValidatedOffers").childArray.length > 0){
						let validatedOffers = sOffers.GetChildByType("ValidatedOffers");
						vOffers = validatedOffers.childArray;
						
					}else{
						console.log("No applicable offers to apply.");
					}
				}
				return vOffers;
		   }
		   
		   //Add to cart btn //Jeeten
		   $('.vha-scj-step3-nxt').click(function () {
				if ($(".cart-container").length >= 10) {
					$(`.vha-scj-tabs-cont-main .current-plan-warning-box`).removeClass("displaynone");
				    $(`.vha-scj-tabs-cont-main .current-plan-warning-box .warning-text`).text("Adding more than 10 services into a quote is not allowed.");
					return false;
					}
					$(`.vha-scj-tabs-cont-main .current-plan-warning-box`).addClass("displaynone");						
					let res = cartValidations();
					if(!res){
						if(resumeQuote !== "Y"){
							if (SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Parent Order Form Applet"].GetBusComp().GetFieldValue("Account Id")) {
								let valid = validationMsgs("addToCart");
								if (valid === false) {
									return false;
								}
							}
						}
					var sOffers = "";
					$.map(currentRLI, function (serv) {
						//Map to fetch values
						if(sProdConId !== sQuoteId){
							sOffers = getOffersSSJ(serv);
							if (sOffers) {
								sOffers.forEach((off,index)=>{
								let offerChild = {
									GPI : off.propArray["GPI"],
									Credit : off.propArray["Credit"],
									Loyalty : off.propArray["Loyalty"],
									Type : off.propArray["Type"],
									ProductName : off.propArray["ProductName"]
								}
								serv.offers.push(offerChild);
							});
							}
						}
						scJson.QuoteHeader.RootItem.push(serv);
						//dhana
                        if (SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Parent Order Form Applet"].GetBusComp().GetFieldValue("Account Id")) {
                            updEquipmentLimitCheck = updatedEquipmentLimitCheck("addToCart");
                        }
						//update cart
						var container = "";
						var closer = "";
						let newServiceCount = 0;
						//Marvin: Added to update counter from Prod Config
						if(sProdConId !== sQuoteId){
							newServiceCount = scJson.QuoteHeader.RootItem.length;
						}else
						{	newServiceCount = sSvcCount;
						}
						//Map to fetch values
						$.map(scJson.QuoteHeader.RootItem, function (itm) {
							if ((itm.CartStatus == "" || itm.CartStatus == null && (itm.CartStatus != "addedToCart" && itm.CartStatus != "UpdateinProgress")) || (sQuoteId !== "" && sProdConId === sQuoteId)) {
								container = `<div class="cart-container" id="cart-container-` + itm.Id + `"><h2 class="currently-editing">Currently editing</h2>
										<div class="cart-items-container">
											<div class="item-header d-flex">
												<span class="header-text font-weight-bold">New Service ` + (newServiceCount) + `</span>
												<span id="vha-service-cost" class="vha-service-cost float-right font-weight-bold"></span>
												<img src="images/custom/menu-icons/arrow_upMenu.svg" class="arrow-icon"></div>
												<div class="sec-container" style="">
													<div id="prod-list" class="prod-list">`;
		
								$.map(itm.DeviceItem, function (dev) {
									if (dev.Name) {
										container += `<div id="prod" class="prod row">
											<img src="`+VHAAppUtilities.GetDeviceIcon(dev.Type)+`" alt="img" class="header-icon cart-icon mr-3">
												<span class="item">` + dev.UI__Source_Product_Name + ", " + dev.UI__Color + ", " + dev.UI__Capacity + `</span>
												<span class="item-list-price toAdd">$` + dev.UI__RRP__Inc__GST + `</span>
											</div>`;
									}
								});
								
								if (itm.PlanItem.Name) {
									container += `<div id="prod" class="prod row">
														<img src="`+VHAAppUtilities.GetDeviceIcon(itm.PlanItem.Type)+`" alt="img" class="header-icon cart-icon mr-3">
															<span class="item">` + itm.PlanItem.Name + `<br><div class="vha-prop-n">`+itm.Proposition +`</div></span>
															<span class="item-list-price toAdd">$` + itm.PlanItem.Price + `</span>
														</div>`;
								}
								$.map(itm.TabletItem, function (SD) {
									if (SD.UI__Source_Product_Name) {
										container += `<div id="prod" class="prod row">
												<img src="`+VHAAppUtilities.GetDeviceIcon("tablet")+`" alt="img" class="header-icon cart-icon mr-3">
													<span class="item">` + SD.UI__Source_Product_Name + `</span>
													<span class="item-list-price toAdd">$` + SD.UI__RRP__Inc__GST + `</span>
												</div>`;
									}
								});
								$.map(itm.SecondaryItem, function (SD) {
									if (SD.Item__Name) {
										container += `<div id="prod" class="prod row">
												<img src="`+VHAAppUtilities.GetDeviceIcon("tablet")+`" alt="img" class="header-icon cart-icon mr-3">
													<span class="item">` + SD.Item__Name + `</span>
													<span class="item-list-price toAdd">$` + SD.RRP__Inc__GST + `</span>
												</div>`;
									}
								});

								$.map(itm.AccItem, function (dev) {
									if (dev.Accessory__Name) {
										container += `<div id="prod" class="prod row">
											<img src="`+VHAAppUtilities.GetDeviceIcon(dev.Type)+`" alt="img" class="header-icon cart-icon mr-3">
												<span class="item">` + dev.Accessory__Name + `</span>
												<span class="item-list-price toAdd">$` + dev.Accessory__RRP__Inc__GST + `</span>
											</div>`;
									}
								});
								
								//Marvin: Added  for after Prod Config 	
								$.map(itm.PackItem, function (pitem) {
									if (pitem.Name) {
										container += `<div id="prod" class="prod row">
											<img src="`+VHAAppUtilities.GetDeviceIcon(pitem.Type)+`" alt="img" class="header-icon cart-icon mr-3">
												<span class="item">` + pitem.Name + `</span>
												<span class="item-list-price toAdd">$` + pitem.Price + `</span>
											</div>`;
									}
								});
								
								$.map(itm.offers, function (off) {
									if (off.ProductName) {
										container += `<div id="prod" class="prod row">
												<img src="`+VHAAppUtilities.GetDeviceIcon(off.Type)+`" alt="img" class="header-icon cart-icon mr-3">
													<span class="item">` + off.ProductName + `</span>
													<span class="item-list-price toSubtract">$` + (off.GPI == "Credit" ? parseFloat(off.Credit).toFixed(2) : off.GPI == "Loyalty" ? parseFloat(off.Loyalty).toFixed(2) :  off.GPI == "Bonus Data" ? "00.00" : "" ) + `</span>
												</div>`;
									}
								});
								
								closer = `</div>
												<div id="item-cust-sec` + itm.Id + `" class="item-cust-sec row">
													<button data-id="` + itm.Id + `" id="item-edit-btn-` + itm.Id + `" class="item-edit-btn">Edit</button>
													<select id="opt-drop` + itm.Id + `" class="opt-drop">
														<option selected disabled value=""></option>
														<option value="remove">Remove</option>
													</select>
												</div>
											</div>
										</div>
									</div>`
								//code with customized	
								//closer = `</div><div id="item-cust-sec` + itm.Id + `" class="item-cust-sec row"><button data-id="` + itm.Id + `" id="item-edit-btn-` + itm.Id + `" class="item-edit-btn">Edit</button><select id="opt-drop` + itm.Id + `" class="opt-drop"><option selected disabled value=""></option>` + sOptCustomized + `<option value="remove">Remove</option></select></div></div></div></div>`
	
								container = container + closer;
		
								$('#vha-scj-New-services .rem-all-serv-sec').before(container);
								itm.CartStatus = "addedToCart";
								itm.Action = "Add";
								itm.Mode = "Saved";
		
								container = "";
								calcServiceTotal(`cart-container-` + itm.Id);
								manageCartButtons("addedToCart");
								

								$('.item-header').off('click').on('click', function () {
									const Accrbody = $(this).next('.sec-container');
									const Accrarrow = $(this).find('.arrow-icon');
									Accrbody.slideToggle("slow");
									Accrarrow.toggleClass('rotate');
								});
								//Delete service button :Jeet
								$('#opt-drop'+itm.Id).on('change', function() {
									var selectedValue = $(this).val();
									if(selectedValue == "remove"){
										$(`.availableplansheadingcontainer1 .current-plan-warning-box`).addClass("displaynone");
										let sId = $(this).closest(".item-cust-sec").find(".item-edit-btn").attr('data-id');
										var idx = scJson.QuoteHeader.RootItem.findIndex(item => item.Id === sId);
										if (idx > -1) {
											scJson.QuoteHeader.RootItem.splice(idx, 1);
											$("#cart-container-"+sId).remove();
											calcServiceTotal(`cart-container-` + sId);
											//Marvin: Added to disable Configure Selected when item is remove to cart
											if(document.querySelectorAll(".cart-container").length == 0)
											{	$(".vha-scj-step3-cfg-slcd-serv").addClass("btnDisabled");
											}
											manageCartButtons("removeService");
											//dhana
                                            if (SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Parent Order Form Applet"].GetBusComp().GetFieldValue("Account Id")) {
                                                updEquipmentLimitCheck = updatedEquipmentLimitCheck("removeService");
												$(`.vha-scj-tabs-cont-main .validation-warning-box`).addClass("displaynone");
                                            }
										}
									}
									//Added to launch the Product Config - Marvin
									if(selectedValue == "customize"){
										SiebelApp.S_App.GetActiveView().GetApplet("VHA SSJ Order Entry Line Item List Applet").GetPModel().AttachPreProxyExecuteBinding("ReconfigureCxProd", function(methodName, inputPS, outputPS) {
											if (methodName === "ReconfigureCxProd") {
												console.log("ReconfigureCxProd function called via binding.");
											}
										});
										const sLineRec = SiebelApp.S_App.GetActiveView().GetApplet("VHA SSJ Order Entry Line Item List Applet").GetPModel().Get('GetRawRecordSet');
										const sQuoteHeaderId = TheApplication().GetProfileAttr("SSJParentOrderId");
										let cartItemId = $(this).closest(".item-cust-sec").find(".item-edit-btn").attr('data-id');
										for (var l = 0; l < sLineRec.length; l++)
										 {
											let sCartId = sLineRec[l]["VHA SSJ Cart Item Id"];
											if(sCartId === cartItemId)
											{	l = sLineRec.length;
												SiebelApp.S_App.SetProfileAttr("FromProdConfig", sQuoteHeaderId);
												const sCustomizeBtn = document.querySelector('[aria-label="Line Items List Applet:Customize"]');
												sCustomizeBtn.click();
											}
											else{
												SiebelApp.S_App.GetActiveView().GetApplet("VHA SSJ Order Entry Line Item List Applet").GetBusComp("Order Entry - Line Items").InvokeMethod("NextRecord");
											}
										 }
									}
								});
								$('#item-edit-btn-' + itm.Id).off('click').on('click', function () {
									let sId = $(this).attr('data-id');
									var servName = $(this).closest('.cart-items-container').find(".header-text").html();
									$.map(scJson.QuoteHeader.RootItem, function (i) {
										if (i.Id == sId) {
											var curStatus = i.CartStatus;
											i.CartStatus = "UpdateinProgress";
											$("#cart-container-"+sId).addClass('editing');
											//$('.cart-container-editing').closest('.cart-container').prepend('<h2 class="currently-editing">Currently editing</h2>');
											//expose message in left pane
											$('#vha-msg-ln').removeClass("displaynone").removeClass("vha-msg-update");
											$('#vha-msg-ln #vha-msg-title').html(`<img src="`+VHAAppUtilities.GetDeviceIcon("info")+`" alt="img" class="header-icon cart-icon">
											<span class="vha-msg-itm">You are editing ` + servName + `</span>
											<span id="vha-edit-lnk" service-name="` + servName + `" data-id="` + i.Id + `" data-status="` + curStatus + `" class="vha-edit-lnk float-right">Cancel editing</span>`);
											$('#vha-message-box').html('<li>' + i.PlanItem.Name + '</li>');
											$('#vha-edit-lnk').off('click').on('click', function () {
												let divId = $(this).attr('data-id');
												let curStatus = $(this).attr('data-status');
												$.map(scJson.QuoteHeader.RootItem, function (j) {
													if (j.Id == divId) {
														j.CartStatus = curStatus;
														$('#vha-msg-ln').addClass("displaynone");
														$('#cart-container-' + itm.Id).removeClass("editing");
														//switch button
														$('.vha-scj-step3-upd').addClass("displaynone");
														$('.vha-scj-step3-nxt').removeClass("displaynone");
														// reset plan tiles
														resetPlansTiles();
														//disable buttons: jeeten
														const buttons = document.querySelectorAll(".vha-scj-cart-summary button");
														buttons.forEach(button => {
															button.disabled = false;
															}
														);
													}
												});
											});
											//switch button
											$('.vha-scj-step3-upd').removeClass("displaynone");
											$('.vha-scj-step3-nxt').addClass("displaynone");
											//disable buttons: jeeten
											const buttons = document.querySelectorAll(".vha-scj-cart-summary button");
											buttons.forEach(button => {
												button.disabled = true;
												}
											);
											
											//call function to highlight left side.
											let curretRootItem = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0];
											if(curretRootItem){
												if(curretRootItem.DeviceItem.length > 0){
													 let highlightedDevice = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0].DeviceItem[0];
													 let device = DevicesGrouped.filter(obj => obj.name === highlightedDevice.UI__Source_Product_Name);
													 CreateDeviceTiles(device,"mobile","highlightcard",highlightedDevice);
												}
												if(curretRootItem.TabletItem.length > 0){
													 let highlightedDevice = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0].TabletItem[0];
													 let device = Tabletdata.filter(obj => obj.name === highlightedDevice.UI__Source_Product_Name);
													 CreateDeviceTiles(device,"tablet","highlightcard",highlightedDevice);
												}
											}
											//call function to higlight plan on left side.
											 $(`.availableplans .availableplansdetailContainers`).removeClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone').find('.planCount').val(0);
											 $(`.availableplans .vha-scj-select-plan`).text("Select").removeClass("selected-card-plan-btn");
											let currPlan = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0];
											if(curretRootItem.DeviceItem.length > 0 || curretRootItem.TabletItem.length > 0 ){
												filterPlans = [...filterDevicePlans];
												if(curretRootItem.DeviceItem.length > 0){
													displayPlans(filterDevicePlans, "mobile");
													$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
													$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
												}
												if(curretRootItem.TabletItem.length > 0)
												{
													displayPlans(filterDevicePlans, "tablet");
													$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
													$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
												}
											}
											else{
												filterPlans = [...jsonplans];
												if(currPlan.PlanItem.Name){
													const highlightedPlan = filterPlans.filter((data) => data.propArray.Plan_Code === currPlan.PlanItem.Code);
													displayPlans(jsonplans, "mobile");
													$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
													$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
												}
											}
										}
									});
								});
							} else {}
						});
						calcTotalCharges();
					});
					if(sProdConId !== sQuoteId)//Marvin: Added to skip from Prod Config
					{	//reset cuurentrli
						let Temp_scJson = JSON.parse(JSON.stringify(OriginalJSON()));
						currentRLI = [];
						currentRLI.push(Temp_scJson.QuoteHeader.RootItem[0]);
						currentRLI[0].Id = 'QLI-' + (scJson.QuoteHeader.RootItem.length + 1);
						currentRLI[0].SrvType = "New Service";
					}
		
					//reset tiles
					ResetDeviceTiles();
					
					//reset plansTiles
					resetPlansTiles();
					//$('#vha-create-qt-btn').removeClass('btnDisabled');
					$("#loadingIcon").hide();
					//invoke offer WF
					//Marvin: Added to enable Configure Selected when item added to Cart
					$(".vha-scj-step3-cfg-slcd-serv").removeClass("btnDisabled");
				}
				// }else {
				// 	// alert('Please select atleast one plan to proceed.');
				// 	$("#loadingIcon").hide();
				// }
			});
		
		   //Update Cart button :Jeet
		   $('.vha-scj-step3-upd').off('click').on('click', function () {
			   
			if ($('#vha-edit-lnk').attr("data-status") == "existing") {
				updateExistingService();
			} 
			else {
			// if (currentRLI[0].PlanItem.Name) {
			if ($(".cart-container").length >= 10) {
					$(`.vha-scj-tabs-cont-main .current-plan-warning-box`).removeClass("displaynone");
				    $(`.vha-scj-tabs-cont-main .current-plan-warning-box .warning-text`).text("Adding more than 10 services into a quote is not allowed.");
					return false;
					}
					$(`.vha-scj-tabs-cont-main .current-plan-warning-box`).addClass("displaynone");
					let res = cartValidations();
					if(!res){
				   //scJson.QuoteHeader.RootItem.push(currentRLI);
				   var container = "";
				   var closer = "";
				   var sOffers = "";
				   var serviceName= $("#vha-edit-lnk").attr("service-name");
				   var idx = scJson.QuoteHeader.RootItem.findIndex(item => item.CartStatus === 'UpdateinProgress');
				   var serviceId = "";
						   $.map(scJson.QuoteHeader.RootItem, function (itm) {
					   if (itm.CartStatus === "UpdateinProgress") {
								   serviceId = itm.Id;
					   }
				   });
				   currentRLI[0].Id = serviceId;
				   currentRLI[0].CartStatus = "UpdateinProgress";
				   //Map to fetch values
					sOffers = getOffersSSJ(currentRLI[0]);
					if (sOffers) {
						sOffers.forEach((off,index)=>{
						let offerChild = {
							GPI : off.propArray["GPI"],
							Credit : off.propArray["Credit"],
							Loyalty : off.propArray["Loyalty"],
							Type : off.propArray["Type"],
							ProductName : off.propArray["ProductName"]
						}
						serv.offers.push(offerChild);
					});
					}
				   scJson.QuoteHeader.RootItem.splice(idx, 1, currentRLI[0]);
				   $.map(scJson.QuoteHeader.RootItem, function (itm) {
					   if (itm.CartStatus === "UpdateinProgress") {
								   itm.Id = serviceId;
						   container = `<h2 class="currently-editing">Currently editing</h2><div class="cart-items-container"><div class="item-header d-flex"><span class="header-text  font-weight-bold">` + serviceName + `</span><span class="vha-edited-txt pl-1 mr-auto">Edited</span><span id="vha-service-cost" class="vha-service-cost float-right font-weight-bold"></span><img src="images/custom/menu-icons/arrow_upMenu.svg" class="arrow-icon"></div><div class="sec-container" style=""><div id="prod-list" class="prod-list">`;
						   $.map(itm.DeviceItem, function (dev) {
						   if (dev.Name) {
							   container += `<div id="prod" class="prod row">
								   <img src="`+VHAAppUtilities.GetDeviceIcon(dev.Type)+`" alt="img" class="header-icon cart-icon mr-3">
									   <span class="item">` + dev.UI__Source_Product_Name + ", " + dev.UI__Color + ", " + dev.UI__Capacity + `</span>
									   <span class="item-list-price toAdd">$` + dev.UI__RRP__Inc__GST + `</span>
								   </div>`;
							   }
						   });
						   if (itm.PlanItem.Name){
								container += `<div id="prod" class="prod row">
								<img src="`+VHAAppUtilities.GetDeviceIcon(itm.PlanItem.Type)+`" alt="img" class="header-icon cart-icon mr-3">
									<span class="item">` + itm.PlanItem.Name + `<br><div class="vha-prop-n">`+itm.Proposition +`</div></span>
									<span class="item-list-price toAdd">$`+itm.PlanItem.Price+`</span>
								</div>`;
							}
							$.map(itm.TabletItem, function (SD) {
								if (SD.UI__Source_Product_Name) {
									container += `<div id="prod" class="prod row">
											<img src="`+VHAAppUtilities.GetDeviceIcon("tablet")+`" alt="img" class="header-icon cart-icon mr-3">
												<span class="item">` + SD.UI__Source_Product_Name + `</span>
												<span class="item-list-price toAdd">$` + SD.UI__RRP__Inc__GST + `</span>
											</div>`;
								}
							});
							$.map(itm.SecondaryItem, function (SD) {
								if (SD.Item__Name) {
									container += `<div id="prod" class="prod row">
											<img src="`+VHAAppUtilities.GetDeviceIcon("tablet")+`" alt="img" class="header-icon cart-icon mr-3">
												<span class="item">` + SD.Item__Name + `</span>
												<span class="item-list-price toAdd">$` + SD.RRP__Inc__GST + `</span>
											</div>`;
								}
							});
						   $.map(itm.AccItem, function (dev) {
									if (dev.Accessory__Name) {
										container += `<div id="prod" class="prod row">
											<img src="`+VHAAppUtilities.GetDeviceIcon(dev.Type)+`" alt="img" class="header-icon cart-icon mr-3">
												<span class="item">` + dev.Accessory__Name + `</span>
												<span class="item-list-price toAdd">$` + dev.Accessory__RRP__Inc__GST + `</span>
											</div>`;
									}
								});
							$.map(itm.offers, function (off) {
								if (off.ProductName) {
									container += `<div id="prod" class="prod row">
											<img src="`+VHAAppUtilities.GetDeviceIcon(off.Type)+`" alt="img" class="header-icon cart-icon mr-3">
												<span class="item">` + off.ProductName + `</span>
												<span class="item-list-price toSubtract">$` + (off.GPI == "Credit" ? parseFloat(off.Credit).toFixed(2) : off.GPI == "Loyalty" ? parseFloat(off.Loyalty).toFixed(2) :  off.GPI == "Bonus Data" ? "00.00" : "" ) + `</span>
											</div>`;
								}
							});
						   closer = `</div><div id="item-cust-sec` + itm.Id + `" class="item-cust-sec row"><button data-id="` + itm.Id + `" id="item-edit-btn-` + itm.Id + `" class="item-edit-btn">Edit</button><select id="opt-drop` + itm.Id + `" class="opt-drop"><option selected disabled value=""></option><option value="remove">Remove</option></select></div></div></div>`
						   //code with customized
						   //closer = `</div><div id="item-cust-sec` + itm.Id + `" class="item-cust-sec row"><button data-id="` + itm.Id + `" id="item-edit-btn-` + itm.Id + `" class="item-edit-btn">Edit</button><select id="opt-drop` + itm.Id + `" class="opt-drop"><option selected disabled value=""></option>` + sOptCustomized + `<option value="remove">Remove</option></select></div></div></div>`
						   container = container + closer;
						   $('#cart-container-' + itm.Id).removeClass("editing");
						   $('#cart-container-' + itm.Id).children().remove();
						   $('#cart-container-' + itm.Id).append(container);
						   itm.CartStatus = "addedToCart";
						   calcServiceTotal(`cart-container-` + itm.Id);
						   //itm.Mode = "Edit";
						   //Delete service button :Jeet
							$("#vha-msg-ln").removeClass("displaynone");
							$("#vha-msg-ln").addClass("vha-msg-update");
							$("#vha-msg-title").html(`
								<span><img src="`+VHAAppUtilities.GetDeviceIcon("green_tick")+`" alt="img" class="header-icon cart-icon pr-4 ml-2"></span><Strong> Cart Updated</Strong>
								<span id="vha-edit-close" class="vha-edit-close float-right ml-auto mr-4 pr-4">X</span>`);
							$('#vha-message-box').html('<div>Changes have been made to your order successfully. Select a new item below, edit another service or click Create quote or Create order to continue.</div>');
							$('#vha-edit-close').off('click').on('click', function () {
								$('#vha-msg-ln').addClass("displaynone");
								$("#vha-msg-ln").removeClass("vha-msg-update");
							});
							$('.vha-scj-step3-upd').removeClass("displaynone");
							$('.vha-scj-step3-nxt').addClass("displaynone");
							//sowmya
						   $('#opt-drop'+itm.Id).on('change', function() {
								var selectedValue = $(this).val();
								if(selectedValue == "remove"){
									$(`.availableplansheadingcontainer1 .current-plan-warning-box`).addClass("displaynone");
									let sId = $(this).closest(".item-cust-sec").find(".item-edit-btn").attr('data-id');
									var idx = scJson.QuoteHeader.RootItem.findIndex(item => item.Id === sId);
									if (idx > -1) {
										scJson.QuoteHeader.RootItem.splice(idx, 1);
										$("#cart-container-"+sId).remove();
										calcServiceTotal(`cart-container-` + sId);
									}
								}
							});
						   $('.item-header').off('click').on('click', function () {
									const Accrbody = $(this).next('.sec-container');
									const Accrarrow = $(this).find('.arrow-icon');
									Accrbody.slideToggle("slow");
									Accrarrow.toggleClass('rotate');
							});
						   $('#item-edit-btn-'+itm.Id).off('click').on('click', function() {
							   let sId = $(this).attr('data-id');
							   var servName = $(this).closest('.cart-items-container').find(".header-text").html();
							   $.map(scJson.QuoteHeader.RootItem, function (i) {
								   if (i.Id == sId){
									   var curStatus = i.CartStatus;
									   i.CartStatus = "UpdateinProgress";
									   //expose message in left pane
									   $('#vha-msg-ln').removeClass("displaynone").removeClass("vha-msg-update");
									   $('#vha-msg-ln #vha-msg-title').html(`<img src="`+VHAAppUtilities.GetDeviceIcon("info")+`" alt="img" class="header-icon cart-icon"><span class="vha-msg-itm ml-4">You are editing</span><span id="vha-msg-span" class="vha-msg-span h4">`+i.MSISDN+`</span><span id="vha-edit-lnk" service-name="` + servName + `" data-id="`+i.Id+`" data-status="`+curStatus+`" class="vha-edit-lnk float-right mr-4 pr-4">Cancel editing</span>`);
									   $('#vha-message-box').html('<ul>'+i.PlanItem.Name+'</ul>');
									   $('#cart-container-' + itm.Id).addClass("editing");
									   $('#vha-edit-lnk').off('click').on('click', function() {
										   let divId = $(this).attr('data-id');
										   let curStatus = $(this).attr('data-status');
										   $('.cart-container .cart-container-editing').removeClass("displaynone");
										   $.map(scJson.QuoteHeader.RootItem, function (j) {
											   if (j.Id == divId){
												   j.CartStatus = curStatus;
												   $('#vha-msg-ln').addClass("displaynone");
												   $('#cart-container-' + itm.Id).removeClass("editing");
												   //switch button
												   $('.vha-scj-step3-upd').addClass("displaynone");
												   $('.vha-scj-step3-nxt').removeClass("displaynone");
												   // reset plan tiles
														resetPlansTiles();
											   }
										   });
									   });
									   //switch button
											   $('.vha-scj-step3-upd').removeClass("displaynone");
											   $('.vha-scj-step3-nxt').addClass("displaynone");
											   
											    //call function to highlight left side.
										let curretRootItem = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0];
										if(curretRootItem){
											if(curretRootItem.DeviceItem.length > 0){
												 let highlightedDevice = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0].DeviceItem[0];
												 let device = DevicesGrouped.filter(obj => obj.name === highlightedDevice.UI__Source_Product_Name);
												 CreateDeviceTiles(device,"mobile","highlightcard",highlightedDevice);
											}
											if(curretRootItem.TabletItem.length > 0){
												 let highlightedDevice = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0].TabletItem[0];
												 let device = Tabletdata.filter(obj => obj.name === highlightedDevice.UI__Source_Product_Name);
												 CreateDeviceTiles(device,"tablet","highlightcard",highlightedDevice);
											}
										}
										//call function to higlight plan on left side.
											 $(`.availableplans .availableplansdetailContainers`).removeClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone').find('.planCount').val(0);
											 $(`.availableplans .vha-scj-select-plan`).text("Select").removeClass("selected-card-plan-btn");
											let currPlan = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0];
											if(curretRootItem.DeviceItem.length > 0 || curretRootItem.TabletItem.length > 0 ){
												filterPlans = [...filterDevicePlans];
												if(curretRootItem.DeviceItem.length > 0){
												displayPlans(filterDevicePlans, "mobile");
												$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
												$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
												}
												if(curretRootItem.TabletItem.length > 0)
												{
													displayPlans(filterDevicePlans, "tablet");
													$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
													$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
												}
											}
									        else{
												filterPlans = [...jsonplans];
											if(currPlan.PlanItem.Name){
												const highlightedPlan = filterPlans.filter((data) => data.propArray.Plan_Code === currPlan.PlanItem.Code);
												displayPlans(jsonplans, "mobile");
												$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
												$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
												}
											}
								    }
								  			   
							   });
							});
							
					    }
				   });
				   calcTotalCharges();
				   
				   //switch button
				   $('.vha-scj-step3-upd').addClass("displaynone");
				   $('.vha-scj-step3-nxt').removeClass("displaynone");
				  // $('#vha-msg-ln').addClass("displaynone");
				   
				   // reset tiles 
				   ResetDeviceTiles();
					
					//reset plansTiles
					resetPlansTiles();
				   
			    }
			   // else{
				  //  alert('Please select atleast one plan to update cart');
			   // }
            }
			manageCartButtons("UpdateCart");
			});

		   //manageCartButtons("addedToCart");
		   function manageCartButtons(evt){
			   if(evt == "addedToCart"){
				   if($('#vha-scj-New-services .cart-items-container').length > 0){
					   $('.rem-all-serv-sec').removeClass("displaynone");
					   $('#nonewservices').addClass("displaynone");
					   //Update Due Today (PrePayment): Jeeten
					   $('#vha-due-today').text('$'+parseFloat(prepaymentAmount).toFixed(2));
				   }
			   }
			   if(evt == "UpdateCart"){
					if($('#vha-scj-New-services .cart-items-container').length > 0){
						$('.rem-all-serv-sec').removeClass("displaynone");
						$('#nonewservices').addClass("displaynone");
						//Update Due Today (PrePayment): Jeeten
						$('#vha-due-today').text('$'+prepaymentAmount);
					}
				}
			   if(evt == "removeService"){
				   if($('#vha-scj-New-services .cart-items-container').length == 0){
					   $('.rem-all-serv-sec').addClass("displaynone");
					   $('#nonewservices').removeClass("displaynone");
					   //Update Due Today (PrePayment): Jeeten
					   $('#vha-due-today').text('$'+prepaymentAmount);
				   }
			   }
			   if(evt == "removeNewServices"){
				   if($('#vha-scj-New-services .cart-items-container').length == 0){
					   $('.rem-all-serv-sec').addClass("displaynone");
					   $('#nonewservices').removeClass("displaynone");
					   //Update Due Today (PrePayment): Jeeten
					   $('#vha-due-today').text('$'+prepaymentAmount);
				   }
			   }
		   }

		   //updateExistingService
		   function updateExistingService(params) {
		   	// if (currentRLI[0].PlanItem.Name) {
			if ($(".cart-container").length >= 10) {
					$(`.vha-scj-tabs-cont-main .current-plan-warning-box`).removeClass("displaynone");
				    $(`.vha-scj-tabs-cont-main .current-plan-warning-box .warning-text`).text("Adding more than 10 services into a quote is not allowed.");
					return false;
					}
					$(`.vha-scj-tabs-cont-main .current-plan-warning-box`).addClass("displaynone");
					let res = cartValidations();
			        var eid = $('#vha-edit-lnk').attr('data-id');
					if(!res){
						let valid = validationMsgs("updateCart", eid);
                        if (valid === false) {
                            return false;
                        }
                        var eid = $('#vha-edit-lnk').attr('data-id');
                        let currExtService = scJson.QuoteHeader.ExistingServices[0].filter(obj => obj.MSISDN === eid)[0];
                        if (currExtService) {
				
                            if (typeof currExtService.update == "undefined") {
                    const update = [];
                    currExtService["update"] = (update);
                }
                currExtService.update["plan"] = currentRLI[0].PlanItem;
				currExtService.update["DeviceItem"] = currentRLI[0].DeviceItem;
				currExtService.update["AccItem"] = currentRLI[0].AccItem;
				currExtService.update["SecondaryItem"] = currentRLI[0].SecondaryItem;
				currExtService.update["PackItem"] = currentRLI[0].PackItem;
				currExtService.update["TabletItem"] = currentRLI[0].TabletItem;
				//dhana
                if (SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Parent Order Form Applet"].GetBusComp().GetFieldValue("Account Id")) {
					let updsrvdetails = currExtService.update;
                    updEquipmentLimitCheck = updatedEquipmentLimitCheck("updateCart", updsrvdetails);
                }
				//Marvin: Added to update the Array for line Creation
				currExtService.update.Proposition = currentRLI[0].Proposition;
				currExtService.update.PropSAMId = currentRLI[0].PropSAMId;
				//currExtService.update.SrvType = currentRLI[0].SrvType;
				currExtService.update.SrvPerMth = currentRLI[0].SrvPerMth;
				currExtService.update.Promo = currentRLI[0].Promo;
				//identify modify service Type
				if (currExtService.update.plan && (currExtService.update.DeviceItem.length > 0 || currExtService.update.TabletItem.length > 0)) {
					currExtService.update.SrvType = "Upgrade Service";
					currentRLI[0].SrvType = "Upgrade Service";
				} else if(currExtService.update.plan && (currExtService.update.DeviceItem == 0 || currExtService.update.TabletItem == 0)){
					currExtService.update.SrvType = "Upgrade Service";
					currentRLI[0].SrvType = "Upgrade Service";
				}
			   //Map to fetch values
				sOffers = getOffersSSJ(currentRLI[0]);
				if (sOffers) {
                                sOffers.forEach(off => {
						currentRLI[0].offers.push(off.propArray);
                                }
                                );
					currExtService.update["offers"] = [...currentRLI[0].offers];
				}
				//scJson.QuoteHeader.RootItem.splice(idx, 1, currentRLI[0]);
                            let container = "";
                            let closer = "";
                            let strike = "";
                            var itm = currExtService.update
							container += `<div id="prod-list-title" class="prod row mr-auto">
                                           <span class="item-title">Upgrade :</span>
									       <img src="	https://ek4vlws0378.appc.tpgtelecom.com.au:9001/siebel/images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon mr-3">
                                           </div>`;
                            if (itm.plan.Name) {
                                $(`#prod-list-` + eid + ` .plan`).addClass('strike');
							container += `<div id="prod" class="prod row mr-auto">
												<img src="` + VHAAppUtilities.GetDeviceIcon(itm.plan.Type) + `" alt="img" class="header-icon cart-icon mr-3">
													<span class="item">` + itm.plan.Name + `</span>
													<span class="item-list-price toAdd">$` + itm.plan.Price + `</span>
												</div>`;
						}
						
                            $.map(itm.DeviceItem, function(dev) {
					   if (dev.Name) {
                                    $(`#prod-list-` + eid + ` .mobile`).addClass('strike');
						   container += `<div id="prod" class="prod row">
									<img src="` + VHAAppUtilities.GetDeviceIcon(dev.Type) + `" alt="img" class="header-icon cart-icon mr-3">
								   <span class="item">` + dev.UI__Source_Product_Name + ", " + dev.UI__Color + ", " + dev.UI__Capacity + `</span>
								   <span class="item-list-price toAdd">$` + dev.UI__RRP__Inc__GST + `</span>
							   </div>`;
						   }
					   });
						
                            $.map(itm.TabletItem, function(SD) {
							if (SD.UI__Source_Product_Name) {
                                    $(`#prod-list-` + eid + ` .SD`).addClass('strike');
						   container += `<div id="prod" class="prod row">
										<img src="` + VHAAppUtilities.GetDeviceIcon("tablet") + `" alt="img" class="header-icon cart-icon mr-3">
											<span class="item">` + SD.UI__Source_Product_Name + `</span>
											<span class="item-list-price toAdd">$` + SD.UI__RRP__Inc__GST + `</span>
										</div>`;
							}
						});
                            $.map(itm.SecondaryItem, function(SD) {
							if (SD.Item__Name) {
								container += `<div id="prod" class="prod row">
										<img src="` + VHAAppUtilities.GetDeviceIcon("tablet") + `" alt="img" class="header-icon cart-icon mr-3">
											<span class="item">` + SD.Item__Name + `</span>
											<span class="item-list-price toAdd">$` + SD.RRP__Inc__GST + `</span>
							   </div>`;
						   }
					   });

                            $.map(itm.AccItem, function(dev) {
							if (dev.Accessory__Name) {
							container += `<div id="prod" class="prod row">
									<img src="` + VHAAppUtilities.GetDeviceIcon(dev.Type) + `" alt="img" class="header-icon cart-icon mr-3">
										<span class="item">` + dev.Accessory__Name + `</span>
										<span class="item-list-price toAdd">$` + dev.Accessory__RRP__Inc__GST + `</span>
							</div>`;
						}
						});
                            $.map(itm.offers, function(off) {
							if (off.ProductName) {
								container += `<div id="prod" class="prod row">
										<img src="` + VHAAppUtilities.GetDeviceIcon(off.Type) + `" alt="img" class="header-icon cart-icon mr-3">
											<span class="item">` + off.ProductName + `</span>
											<span class="item-list-price toSubtract">$` + (off.GPI == "Credit" ? parseFloat(off.Credit).toFixed(2) : off.GPI == "Loyalty" ? parseFloat(off.Loyalty).toFixed(2) :  off.GPI == "Bonus Data" ? "00.00" : "") + `</span>
										</div>`;
							}
						});
                            closer = `</div>`;
                            //`<div id="item-cust-sec` + eid + `" class="item-cust-sec row"><button data-id="` + eid + `" id="item-edit-btn-` + eid + `" class="item-edit-btn">Edit</button><select id="opt-drop` + eid + `" class="opt-drop"><option selected disabled value=""></option><option value="remove">Remove</option></select></div></div></div>`
					   
					   container = container + closer;
                            $('#cart-container-' + eid).removeClass("editing").addClass("edited");
                            $('#vha-existing-box-' + eid).children().remove();
                            $('#vha-existing-box-' + eid).append(container);
					   itm.CartStatus = "addedToCart";
                            calcServiceTotal(`cart-container-` + eid);
					   //itm.Mode = "Edit";
					   //Delete service button :Jeet
						$("#vha-msg-ln").removeClass("displaynone");
						$("#vha-msg-ln").addClass("vha-msg-update");
						$("#vha-msg-title").html(`
								<span><img src="` + VHAAppUtilities.GetDeviceIcon("green_tick") + `" alt="img" class="header-icon cart-icon pr-4 ml-2"></span><Strong> Cart Updated</Strong>
							<span id="vha-edit-close" class="vha-edit-close float-right ml-auto mr-4 pr-4">X</span>`);
						$('#vha-message-box').html('<div>Changes have been made to your order successfully. Select a new item below, edit another service or click Create quote or Create order to continue.</div>');
                            $('#vha-edit-close').off('click').on('click', function() {
							$('#vha-msg-ln').addClass("displaynone");
							$("#vha-msg-ln").removeClass("vha-msg-update");
						});
						$('.vha-scj-step3-upd').removeClass("displaynone");
						$('.vha-scj-step3-nxt').addClass("displaynone");
						//sowmya
                            $('#opt-drop' + eid).on('change', function() {
							var selectedValue = $(this).val();
                                if (selectedValue == "remove") {
								$(`.availableplansheadingcontainer1 .current-plan-warning-box`).addClass("displaynone");
								let sId = $(this).closest(".item-cust-sec").find(".item-edit-btn").attr('data-id');
								var idx = scJson.QuoteHeader.RootItem.findIndex(item => item.Id === sId);
								if (idx > -1) {
									scJson.QuoteHeader.RootItem.splice(idx, 1);
                                    $("#cart-container-" + sId).remove();
									calcTotalCharges();
								}
							}
						});
                            $('.item-header').off('click').on('click', function() {
								const Accrbody = $(this).next('.sec-container');
								const Accrarrow = $(this).find('.arrow-icon');
								Accrbody.slideToggle("slow");
								Accrarrow.toggleClass('rotate');
						});
                            /*$('#item-edit-btn-' + itm.Id).off('click').on('click', function() {
						   let sId = $(this).attr('data-id');
						   var servName = $(this).closest('.cart-items-container').find(".header-text").html();
                                $.map(scJson.QuoteHeader.RootItem, function(i) {
                                    if (i.Id == sId) {
								   var curStatus = i.CartStatus;
								   i.CartStatus = "UpdateinProgress";
								   //expose message in left pane
								   $('#vha-msg-ln').removeClass("displaynone");
                                        $('#vha-msg-ln #vha-msg-title').html(`<img src="` + VHAAppUtilities.GetDeviceIcon("info") + `" alt="img" class="header-icon cart-icon"><span class="vha-msg-itm ml-4">You are editing</span><span id="vha-msg-span" class="vha-msg-span h4">` + i.MSISDN + `</span><span id="vha-edit-lnk" service-name="` + servName + `" data-id="` + i.Id + `" data-status="` + curStatus + `" class="vha-edit-lnk float-right mr-4 pr-4">Cancel editing</span>`);
                                        $('#vha-message-box').html('<ul>' + i.PlanItem.Name + '</ul>');
								   $('#cart-container-' + itm.Id).addClass("editing");
								   $('#vha-edit-lnk').off('click').on('click', function() {
									   let divId = $(this).attr('data-id');
									   let curStatus = $(this).attr('data-status');
									   $('.cart-container .cart-container-editing').removeClass("displaynone");
                                            $.map(scJson.QuoteHeader.RootItem, function(j) {
                                                if (j.Id == divId) {
											   j.CartStatus = curStatus;
											   $('#vha-msg-ln').addClass("displaynone");
											   $('#cart-container-' + itm.Id).removeClass("editing");
											   //switch button
											   $('.vha-scj-step3-upd').addClass("displaynone");
											   $('.vha-scj-step3-nxt').removeClass("displaynone");
											   // reset plan tiles
												resetPlansTiles();
										   }
									   });
								   });
								   //switch button
										   $('.vha-scj-step3-upd').removeClass("displaynone");
										   $('.vha-scj-step3-nxt').addClass("displaynone");
										   
											//call function to highlight left side.
									let curretRootItem = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0];
                                        if (curretRootItem) {
                                            if (curretRootItem.DeviceItem.length > 0) {
											 let highlightedDevice = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0].DeviceItem[0];
											 let device = DevicesGrouped.filter(obj => obj.name === highlightedDevice.UI__Source_Product_Name);
                                                CreateDeviceTiles(device, "mobile", "highlightcard", highlightedDevice);
										}
                                            if (curretRootItem.TabletItem.length > 0) {
											 let highlightedDevice = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0].TabletItem[0];
											 let device = Tabletdata.filter(obj => obj.name === highlightedDevice.UI__Source_Product_Name);
                                                CreateDeviceTiles(device, "tablet", "highlightcard", highlightedDevice);
										}
									}
									//call function to higlight plan on left side.
										 $(`.availableplans .availableplansdetailContainers`).removeClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone').find('.planCount').val(0);
										 $(`.availableplans .vha-scj-select-plan`).text("Select").removeClass("selected-card-plan-btn");
										let currPlan = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0];
											if(curretRootItem.DeviceItem.length > 0 || curretRootItem.TabletItem.length > 0 ){
												filterPlans = [...filterDevicePlans];
												if(curretRootItem.DeviceItem.length > 0){
											displayPlans(filterDevicePlans, "mobile");
											$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
											$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
												}
												if(curretRootItem.TabletItem.length > 0)
												{
													displayPlans(filterDevicePlans, "tablet");
											$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
											$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
										}
										}
                                        if (dataDevice === "mobile") {
                                            if ((curretRootItem[0].DeviceItem && curretRootItem[0].DeviceItem.length > 0 && curretRootItem[0].PlanItem.Name)) {
												filterPlans = [...filterDevicePlans];
                                            } else {
												filterPlans = [...jsonplans];
												if(currPlan.PlanItem.Name){
													const highlightedPlan = filterPlans.filter((data) => data.propArray.Plan_Code === currPlan.PlanItem.Code);
													displayPlans(jsonplans, "mobile");
													$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
													$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
											}
										}
								}
										   
						   });
                            });*/
			   calcTotalCharges();
			   
			   //switch button
			   $('.vha-scj-step3-upd').addClass("displaynone");
			   $('.vha-scj-step3-nxt').removeClass("displaynone");
			  // $('#vha-msg-ln').addClass("displaynone");
			   
			   // reset tiles 
			   ResetDeviceTiles();
				
				//reset plansTiles
				resetPlansTiles();

				//resetButtons: jeeten
				const buttons = document.querySelectorAll(".vha-scj-cart-summary button");
				buttons.forEach(button => {
					button.disabled = false;
				});
				//Marvin: Added to enable Configure Selected when item added to Cart
				$(".vha-scj-step3-cfg-slcd-serv").removeClass("btnDisabled");
				}
			}
		   }
			//Apply MSP offers
		    $('#vha-msp-offer-btn').off('click').on('click', function () {
				if ($("#vha-scj-New-services .cart-container").length > 0 || $('#vha-scj-Existing-services').find('div#prod-list-title').length > 0) {
					var inpRowSet = SiebelApp.S_App.NewPropertySet();
					var row = SiebelApp.S_App.NewPropertySet();
					inpRowSet.SetType("InputRowSet");
					if ($("#vha-scj-New-services .cart-container").length > 0){
					$.map(scJson.QuoteHeader.RootItem, function (service) {
						row.SetType("Row");
						row.SetProperty("RtQliId",service.Id);
						row.SetProperty("RtAssetId","");
						row.SetProperty("SrvType", service.SrvType);
						row.SetProperty("NewPlanId", service.PlanItem.Code);
						row.SetProperty("NewProposId",service.PropSAMId);
						inpRowSet.AddChild(row.Clone());
						row.Reset();
					});
					}
					if ($('#vha-scj-Existing-services').find('div#prod-list-title').length > 0) {
						var updatedExistingServices = [scJson.QuoteHeader.ExistingServices[0].filter(obj => (obj.update))[0]];
						$.map(updatedExistingServices, function (service) {
							if(service.update.plan){
							row.SetType("Row");
							row.SetProperty("RtQliId",service.MSISDN);
							row.SetProperty("RtAssetId",service.AssetIntegId);
							row.SetProperty("SrvType", service.update.SrvType);
							row.SetProperty("NewPlanId", service.update.plan.Code);
							row.SetProperty("NewProposId",service.update.PropSAMId);
							inpRowSet.AddChild(row.Clone());
							row.Reset();
							}
						});
					}
					var wfInput = SiebelApp.S_App.NewPropertySet();
					var wfOutput = SiebelApp.S_App.NewPropertySet();
					wfInput.AddChild(inpRowSet);
					wfInput.SetProperty("BillAccId",""); 
					wfInput.SetProperty("Object Id", SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SSJ Parent Order Form Applet'].GetBusComp().GetFieldValue("Id"));
					console.log(wfInput);
					wfOutput = VHAAppUtilities.CallWorkflow("VHA SSJ Calculate MSP Driver Process",wfInput);
					
					if(wfOutput){
					var sMSPrecords = wfOutput.GetChildByType("OutRowSet");
					console.log("PS", sMSPrecords);
					sMSPrecords = VHAAppUtilities.propertySetToJson(sMSPrecords);
					$.map(sMSPrecords.children, function (msp) {
						if (msp.NewMSPEligible == "Y") {
							let curretRootItem = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === msp.RtQliId)[0];
							curretRootItem.mspOffers = msp
						}
					});
					addMSPitems();
					$('#vha-create-qt-btn').removeClass('btnDisabled');
				}else{
					    console.log("No response from WF -'VHA SSJ Calculate MSP Driver Process'. Inputs: ", wfInput);
					}
				    
				}else{ alert("No new/updated services are available to apply MSP offers ! Kindly add a new service or update existing service to apply MSP offers.");}
		   });
			//Add line-items under service root: Jeet
		   function addMSPitems() {
		   	let container ="";
			   $.map(scJson.QuoteHeader.RootItem, function (itm) {
				if ($('#cart-container-' + itm.Id + ' #prod-list .mspoffer').length > 0){
				    $('#cart-container-' + itm.Id + ' #prod-list .mspoffer').remove();
				}
				if (itm.mspOffers.ItmDiscName) {
					let sMSPval= itm.mspOffers.NewMSPDiscVal;
					sMSPval = parseFloat(sMSPval).toFixed(2);
					container = `<div id="prod" class="prod row mspoffer">
						<img src="`+VHAAppUtilities.GetDeviceIcon(itm.PlanItem.Type)+`" alt="img" class="header-icon cart-icon mr-3">
							<span class="item">` + itm.mspOffers.ItmDiscName + `</span>
							<span class="item-list-price toSubtract">$` + sMSPval + `</span>
						</div>`;
				};
				//insert item
				$('#cart-container-' + itm.Id + ' #prod-list').append(container);
				//Recalculate prices of services.
				recalculateCartPrices();
			});
		   }

			//recalculateCartPrices : Jeeten
			function recalculateCartPrices(){
				$.map($('#vha-scj-New-services .cart-container'), ser=>{
					 calcServiceTotal(ser.id);
					 calcTotalCharges();
				 })
			}

		   	// view purchase & offer details   sowmya
			$('#vha-qt-offer-btn').on('click', function () {
			  
				function renderExisting() {
					const existingService = document.querySelectorAll("#vha-scj-Existing-services .cart-items-container");
					const elist = Array.from(existingService).map(container => {
						const clone = container.cloneNode(true);
						clone.querySelectorAll('.item-cust-sec, .arrow-icon').forEach(el => el.remove());
						return clone.outerHTML;
					});
					return elist.join('');
				}
 
			   function renderNew() {
				   const newService = document.querySelectorAll("#vha-scj-New-services .cart-items-container");
				   const nlist = Array.from(newService).map(container => {
					   const clone = container.cloneNode(true);
					   const infoCircle = document.createElement('span');
					   infoCircle.innerHTML = '<img src="images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon ml-auto  mr-1">';
					   clone.querySelector('.vha-service-cost').prepend(infoCircle);
					   clone.querySelectorAll('.item-cust-sec, .arrow-icon').forEach(el => el.remove());
					   return clone.outerHTML;
				   });
				   return nlist.join('');
			   }
 
			   function renderOfferUI() {
				   const offer = document.querySelector(".vha-offer-UI");
				   if (!offer) return "<p>No bill found</p>";
				   const clone = offer.cloneNode(true);
				   const dueToday = clone.querySelector(".vha-due-today");
				   if (dueToday) dueToday.remove();
				   const quoteBtns = clone.querySelector(".vha-quote-btn-sec");
				   if (quoteBtns) quoteBtns.remove();
				   return clone.outerHTML;
			   }
 
			   // Overlay (dark background)
			   const overlayHtml = `<div id="customOverlay" class="customOverlay"></div>`;
 
			   // Popup box
			   const popupHtml = `
			   <div id="customPopup" class="customPopup">
				   <div id="details-title" class="details-title">
					   <h3>Purchase & Offer Details</h3>
					   <button id="closePopup" class="button">✖</button>
				   </div>
				   <hr/>
				   <div class="body">
					   <div class="body-details">
						   <h4>Account level products
							   <span class="amt">-$00.00</span>
						   </h4>
						   <p class="return">No account level products.<p>
					   </div>
					   <div class="service">
						   <h4>Existing services</h4>
						   <div id="popupExisting" class="popupExisting"></div>
					   </div>
					   <div class="service">
						   <h4>New services</h4>
						   <div id="popupNew" class="popupNew"></div>
					   </div>
					   <div id="popupBill" class="popupBill"></div>
					   <button type="button" id="closePopup" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
				   </div>
			   
				 </div>
				   `;
	 
				 // Append overlay + popup
				 $('body').append(overlayHtml).append(popupHtml);
				 
				 // Close button handler
				 $('#closePopup, #customOverlay').on('click', function () {
				   $('#customOverlay, #customPopup').remove();
				 });
				 
				 document.querySelector(".popupExisting").innerHTML=renderExisting();
				 document.querySelector(".popupNew").innerHTML=renderNew();
				 document.querySelector(".popupBill").innerHTML=renderOfferUI();
				// Check for services sowmya
				if($('#popupExisting').children().length === 0) {
				    $('#popupExisting').html('<p>No existing services added</p>');
				}
				if($('#popupNew').children().length === 0) {
				    $('#popupNew').html('<p>No new services added</p>');
				}
				//end
			 });
		   //Remove All new services button :Jeet
		   $('#rem-all-serv-btn').off('click').on('click', function () {
			var newServiceCount = scJson.QuoteHeader.RootItem.length;
			if(newServiceCount > 0){
				scJson.QuoteHeader.RootItem = [];
				$('#vha-scj-New-services .cart-container').remove();
				//Marvin: Added to disable Configure Selected when item is remove to cart
				$(".vha-scj-step3-cfg-slcd-serv").addClass("btnDisabled");
				//Jeeten
				//calcServiceTotal(`cart-container-` + sId);
				calcTotalCharges();
			}else{
				alert("There are no services in the cart to remove");
			}
			manageCartButtons("removeNewServices");
			 //dhana
            if (SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Parent Order Form Applet"].GetBusComp().GetFieldValue("Account Id")) {
                 updEquipmentLimitCheck = updatedEquipmentLimitCheck("removeNewServices");
				$(`.vha-scj-tabs-cont-main .validation-warning-box`).addClass("displaynone");
            }
		   });
		   	
		   // sort devices
		   $('#vha-scj-sort-devices').on('change', function() {
				   var selectedValue = $(this).val();
				//   console.log("Selected value:", selectedValue);
				  SortDevices(selectedValue);
   
		   });
		   //sort tablets
		    $('#vha-scj-sort-tablets').on('change', function() {
				   var selectedValue = $(this).val();
				//   console.log("Selected value:", selectedValue);
				  SortDevices(selectedValue);
   
		   });
		   // sorting accessories
		   $('#vha-scj-sort-accessories').on('change', function() {
				   var selectedValue = $(this).val();
				//   console.log("Selected value:", selectedValue);
				  SortDevices(selectedValue);

		   });
		    //sort wearbles
		    $('#vha-scj-sort-wearbles').on('change', function() {
				   var selectedValue = $(this).val();
				//   console.log("Selected value:", selectedValue);
				  SortDevices(selectedValue);
   
		   });
		   //$(".vha-scj-step1-nxt").on("click", function (e) {
		   $(".siebui-icon-gotonextset").on("click", function (e) {
			   step1firstname = $('#vha-scj-step1-firstNameInput').val();
			   step2lastname = $('#vha-scj-step1-lastNameInput').val();
			   $(".vha-scj-allsteps").addClass("displaynone");
			   $(".vha-scj-siebelapplet1").addClass("displaynone");
			   $(".vha-scj-step2").removeClass("displaynone");
			   console.log(step1firstname);
			   console.log(step2lastname);
				// create JSON structure
				scJson = "";
				jsonHandler('NewJson', {});
				jsonHandler('Set-NewCustomer-NewService', {});
		   });
		   $('#vha-scj-step2-address').autocomplete({
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
					   open: function () {
						   $('.ui-autocomplete').addClass('ssjautocomplete');
						   $('.ui-autocomplete li').addClass('ssjautocompleteli');
						   const menu = $('#vha-scj-step2-address').autocomplete('widget');
						   menu.find('li').addClass('ssjautocompleteli');
						   menu.find('li').addClass('ParagraphBody2');
						   menu.find('li:last-child').addClass('custom-ssjautocompleteli-item');
					   },
					   minLength: 10,
					   select: function (event, ui) {
						   if(ui.item.id != "addressnotfound")
						   {
							$('.ssjautocomplete').removeClass('ssjautocomplete'); 
						   $("#maskoverlay").styleShow();
						   tssleep(30).then(() => {
							   sResp = VHAAppUtilities.getAddress(ui);
							   var this_t = this;
							   sAddr = this_t.value;
							   var SearchString = "[List Of Values.Type]='VHA_AUTO_COVRGE_CHK' AND [List Of Values.Active]='Y'";
							   var sLovFlg = VHAAppUtilities.GetPickListValues("", SearchString);
							   if (sLovFlg == "ON") {
								   VHACovergaeCheck();
							   }
							   if (sResp != false) {
								   var sAddrAllowedFlg = 'Y';
								   $.map(sResp.address.properties, function (i, j) {
									   if (j == "postal_delivery_type" && i != null && i != "") {
										   sAddrAllowedFlg = 'N';
									   }
								   });
								   if (sAddrAllowedFlg == "Y") {
									   var NBNLoc = "";
									   addrResp = sResp;
									   TriggerNBNAddress();
								   } else {
									   alert("Invalid Address Type. Address must have type as Street or Rural.");
									   return false;
								   }
							   } 
							   $('.resultfordividertop').show();// added by vinay
						        $('.coveragecheckresultscontainer').show();// added by vinay
							   $('#mobileresultfound').addClass('displaynone');// added by vinay
							   $('#fixedwirelessresultfound').addClass('displaynone');// added by vinay
							   $("#step2divider").addClass("displaynone");
							   $(".resultforcontainerparent").removeClass("displaynone");
							   //Mobile//
							   $("#mobileinitailtext").addClass("displaynone");
							   $(".Mobilecoverageresultcontainer").removeClass("displaynone");
							   //Fixed//
							   $("#fixedinitailtext").addClass("displaynone");
							   $(".fixedcoverageresultcontainer").removeClass("displaynone");
							   //FixedWirelsess//
							   $("#fixedwirelessinitailtext").addClass("displaynone");
							   $(".fixedwirelesscoverageresultcontainer").removeClass("displaynone");
							   $('#resultforvalue').text(sAddr);
							   coveragecheckstatus = "Done"
   
						   });
						 }
						 else{
							 alert("View navigation need to be configured");
						 }
					   }
				}).data("ui-autocomplete")._renderItem = function (ul, item) {
					   if (item.isButton) {
						   return $('<li>')
							   .append('<button class="autocomplete-button-item">' + item.value + '</button>')
							   .appendTo(ul);
					   } else {
						   return $('<li>')
							   .append('<div>' + item.value + '</div>')
							   .appendTo(ul);
					   }
				   };
		   $(".vha-scj-step2-nxt").on("click", function (e) {
			   $(".vha-scj-allsteps").addClass("displaynone");
			   $(".vha-scj-step3").removeClass("displaynone");
			   //Marvin: Added to not create empty scJSon for Quote Resume and after Prod Config
			   if(sProdConId !== sQuoteId){
				   // create JSON structure
					scJson = "";
					jsonHandler('NewJson', {});
					jsonHandler('Set-NewCustomer-NewService', {});
			   }
			   if(coveragecheckstatus != "Done")
			   {
				   //MobileCoverage
				   $('#mobilecoveragecheckaddressId').text("Coverage check not yet performed.");
				   $('#mobilecoveragecheckstep3resulttittleId').text("Click search an address to perform coverage check.");
				   $(".mobilecoveragecheckstep3resulticons").addClass("displaynone");
				   //FixedCoverage
				   $('.fixedcoveragecheckaddress').text("Coverage check not yet performed.");
				   $('.fixedcoveragecheckstep3resulttittle').text("Click search an address to perform coverage check.");
				   $(".fixedcoverageresultcontainer").addClass("displaynone");
				   $("#fixedconntactionstatus").addClass("displaynone");
				   $(".fixedwirelesscoverage").addClass("displaynone");
				   
			   }
			   if(coveragecheckstatus == "Done")
			   {
				   if (sAddr != "") {
				   $('#mobilecoveragecheckaddressId').text(sAddr); // added by vinay kumar
				   $('.fixedcoveragecheckaddress').text(sAddr);
				   }
				   else if (selectedBA != "") {
				   $('#mobilecoveragecheckaddressId').text(selectedBA); // added by vinay kumar
				   $('.fixedcoveragecheckaddress').text(selectedBA);
				   }
				   else {
				   $('#mobilecoveragecheckaddressId').text(sManualAddr); // added by vinay kumar
				   $('.fixedcoveragecheckaddress').text(sManualAddr);
				   }
				   $('.fixedcoveragecheckstep3resulttittle').addClass('displaynone');
				   if(remaininglines == 0)
				   {
				   $("#noresultfounds3").removeClass("displaynone");
				   }
				   if(remaininglines >=1 && remaininglines <= 3)
				   {
				   $("#resultfounds3").removeClass("displaynone");
					   if(remaininglines == 1)
					   {
						   $('#remaininglines').text(+remaininglines+" remaining line");
					   }
					   else
					   {
						   $('#remaininglines').text(+remaininglines+" remaining lines");	
					   }
				   }
			   }  
			   
			   //fetch devices 
				$("#loadingIcon").show(); 
				
			   	getDeviceData();
				
				//Render Customer Details section: Jeeten 
				 
				if(SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Parent Order Form Applet"].GetBusComp().GetFieldValue("Account Id")){
					$('#vha-scj-Existing-services').parent().removeClass("displaynone");
					//fetchCustomerDetails(SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SSJ Parent Order Form Applet'].GetBusComp().GetFieldValue("Account Id"));
					//Render Existing Services section: Jeeten  
					fetchExistingServices(SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SSJ Parent Order Form Applet'].GetBusComp().GetFieldValue("Billing Account Number"));
				}else{
					fetchCustomerDetails();
					$('#vha-scj-Existing-services').parent().addClass("displaynone");
				}

			   //default brand is apple
				filteredDevices = filterByBrands(["Apple"]);
				//SortDevices("priceLow");
				$('.scj-filtermobiles[value="Apple"]').prop('checked', true);
			    CreateDeviceTiles(filteredDevices,"mobile");
			  
			   $("#loadingIcon").hide(); 
			   //Marvin: Reset Quote Resume and Prod Config Identifier
			   sProdConId = "";
		   });
			
		   // Render Existing Services UI: Jeeten  
		   function fetchExistingServices(billAccId){
			const CustDetails = VHAAppUtilities.ExistingCustdeatilsWF(billAccId);	//"230004556"
			const resultSetBS = CustDetails?.GetChildByType("ResultSet");
			const finalOutput = resultSetBS?.childArray?.[0]?.childArray?.[0]?.childArray?.[0]?.childArray?.[0];
			let Jsonresult = VHAAppUtilities.psToJSON(finalOutput);
			SiebelApp.S_App.ext = Jsonresult;
			if(Jsonresult){
				//scJson.QuoteHeader.ExistingServices.push(Jsonresult.MSISDNDetails);
				if (!Array.isArray(Jsonresult.MSISDNDetails)) {
				    scJson.QuoteHeader.ExistingServices.push([Jsonresult.MSISDNDetails]);
				} else {
				scJson.QuoteHeader.ExistingServices.push(Jsonresult.MSISDNDetails);
				}
				fetch_cust_detail(resultSetBS);
				renderExistingService();
			}
		   };

		   //renderExistingService :Jeeten
		   function renderExistingService (){
			console.log("Exist JOSN: ", scJson.QuoteHeader.ExistingServices);
				$.map(scJson.QuoteHeader.ExistingServices[0], serv =>{
					let container="";
					container = `<div class="cart-container" id="cart-container-` + serv.MSISDN + `">
							<div class="cart-items-container">
								<div class="item-header d-flex">
									<span class="header-text font-weight-bold">` + (serv.MSISDN) + `</span>
									<span class="vha-active">
									<img src="images/custom/menu-icons/green_tick_24x24.svg" alt="img" class="green-tick header-icon cart-icon ml-2">
									<span class="vha-edited-txt pl-1 mr-auto">Edited</span></span>
									<span id="vha-service-cost-` + serv.MSISDN + `" class="vha-service-cost float-right font-weight-bold"></span>
									<img src="images/custom/menu-icons/arrow_upMenu.svg" class="arrow-icon"></div>
									<div class="sec-container" style="">
										<div id="prod-list-` + serv.MSISDN + `" class="prod-list">`;
			
						if (serv.ListOfRatePlan) {
							if(serv.ListOfRatePlan.RatePlan){
							if (serv.ListOfRatePlan.RatePlan.Name) {
                                container += `<div id="prod" class="prod plan row">
												<img src="` + VHAAppUtilities.GetDeviceIcon("plan") + `" alt="img" class="header-icon cart-icon mr-3">
													<span class="item propotion">` + serv.ListOfRatePlan.RatePlan.Name + `</span>
													<span class="item-list-price toAdd">$` + parseFloat(serv.ListOfRatePlan.RatePlan.RecurringCharge).toFixed(2) + `</span>
												</div>`;
								}
							}
						}
						$.map(serv.ListOfAssetLineItemGPP, function (dev) {
						if (dev.Name) {
                                container += `<div id="prod" class="prod mobile row">
								<img src="` + VHAAppUtilities.GetDeviceIcon("mobile") + `" alt="img" class="header-icon cart-icon mr-3">
									<span class="item">` + dev.Name + `</span>
									<span class="item-list-price toAdd">$` + parseFloat(dev.RecurringCharge).toFixed(2) + `</span>
								</div>`;
						}
					});
					if(serv.ListOfAssetLineItemAPPSD){
						$.map(serv.ListOfAssetLineItemAPPSD.AssetLineItemAPPSD, function (SD) {
							if (SD.Name) {
								container += `<div id="prod" class="prod row">
										<img src="`+VHAAppUtilities.GetDeviceIcon("secdevice")+`" alt="img" class="header-icon cart-icon mr-3">
											<span class="item">` + SD.Name + `</span>
											<span class="item-list-price toAdd">$` + parseFloat(SD.RecurringCharge).toFixed(2) + `</span>
										</div>`;
							}
						});
					};
					if(serv.ListOfAssetLineItemAPPAcc){
						$.map(serv.ListOfAssetLineItemAPPAcc.AssetLineItemAPPAcc, function (SD) {
							if (SD.Name) {
								container += `<div id="prod" class="prod row">
										<img src="`+VHAAppUtilities.GetDeviceIcon("secdevice")+`" alt="img" class="header-icon cart-icon mr-3">
											<span class="item">` + SD.Name + `</span>
											<span class="item-list-price toAdd">$` + parseFloat(SD.RecurringCharge).toFixed(2) + `</span>
										</div>`;
							}
						});
					};
					
					$.map(serv.ListOfPackItem, function (off) {
						if (off.Name) {
							container += `<div id="prod" class="prod row">
									<img src="`+VHAAppUtilities.GetDeviceIcon("discount")+`" alt="img" class="header-icon cart-icon mr-3">
										<span class="item">` + off.Name + `</span>
										<span class="item-list-price toAdd">$` + parseFloat(off.RecurringCharge).toFixed(2) + `</span>
									</div>`;
						}
					});

					$.map(serv.ListOfBonusItem, function (off) {
						if (off.Name) {
							container += `<div id="prod" class="prod row">
									<img src="`+VHAAppUtilities.GetDeviceIcon("discount")+`" alt="img" class="header-icon cart-icon mr-3">
										<span class="item">` + off.Name + `</span>
										<span class="item-list-price toSubtract">$` + parseFloat(off.RecurringCharge).toFixed(2) + `</span>
									</div>`;
						}
					});
					
					$.map(serv.ListOfDeviceDiscountItem, function (off) {
						if (off.ProductName) {
							container += `<div id="prod" class="prod row">
									<img src="`+VHAAppUtilities.GetDeviceIcon("discount")+`" alt="img" class="header-icon cart-icon mr-3">
										<span class="item">` + off.ProductName + `</span>
										<span class="item-list-price toSubtract">$` + (off.GPI == "Credit" ? parseFloat(off.Credit).toFixed(2) : off.GPI == "Loyalty" ? parseFloat(off.Loyalty).toFixed(2) :  off.GPI == "Bonus Data" ? 0 : "" ) + `</span>
									</div>`;
						}
					});
					$.map(serv.ListOfMSPDiscount, function (off) {
						if (off.Name) {
							container += `<div id="prod" class="prod row">
									<img src="`+VHAAppUtilities.GetDeviceIcon("discount")+`" alt="img" class="header-icon cart-icon mr-3">
										<span class="item">` + off.Name + `</span>
										<span class="item-list-price toSubtract">$` + parseFloat(off.RecurringCharge).toFixed(2) + `</span>
									</div>`;
						}
					});
					$.map(serv.ListOfCreditItem, function (off) {
						if (off.ProductName) {
							container += `<div id="prod" class="prod row">
									<img src="`+VHAAppUtilities.GetDeviceIcon("discount")+`" alt="img" class="header-icon cart-icon mr-3">
										<span class="item">` + off.ProductName + `</span>
										<span class="item-list-price toSubtract">$` + (off.GPI == "Credit" ? parseFloat(off.Credit).toFixed(2) : off.GPI == "Loyalty" ? parseFloat(off.Loyalty).toFixed(2) :  off.GPI == "Bonus Data" ? 0 : "" ) + `</span>
									</div>`;
						}
					});
					
                        closer = `</div><div id="vha-existing-box-` + serv.MSISDN + `" class="vha-existing-box"></div>
									<div id="item-cust-sec` + serv.MSISDN + `" class="item-cust-sec row">
										<button id="item-EEF-btn-` + serv.MSISDN + `" class="item-EEF-btn" assetid =` + serv.AssetId + `>View EEF</button>
										<div class="item-edit-sec row">
										<button data-id="` + serv.MSISDN + `" id="item-edit-btn-` + serv.MSISDN + `" class="item-edit-btn" assetintid =` + serv.AssetIntegId + ` assetid =` + serv.AssetId + `>Edit</button>
										<select id="opt-drop` + serv.MSISDN + `" class="opt-drop">
											<option selected disabled value=""></option>
											<option value="remove">Remove</option>
										</select>
									</div></div>
								</div>
							</div>
						</div>`
						//Marvin: with customize option
						//closer = `</div><div id="vha-existing-box-` + serv.MSISDN + `" class="vha-existing-box"></div><div id="item-cust-sec` + serv.MSISDN + `" class="item-cust-sec row"><button id="item-EEF-btn-` + serv.MSISDN + `" class="item-EEF-btn">View EEF</button><div class="item-edit-sec row"><button data-id="` + serv.MSISDN + `" id="item-edit-btn-` + serv.MSISDN + `" class="item-edit-btn">Edit</button><select id="opt-drop` + serv.MSISDN + `" class="opt-drop"><option selected disabled value=""></option><option value="customize" disabled="disabled">Customize</option><option value="remove">Remove</option></select></div></div></div></div></div>
						
					container = container + closer;
			
					$('#vha-scj-Existing-services #vha-price-section').before(container);
					serv.CartStatus = "existing";
					serv.Action = "";
					serv.Mode = "";
			
					container = "";
					calcServiceTotal(`cart-container-` + serv.MSISDN);
					//Navya: view EEF
					$('.item-EEF-btn').off('click').on('click', function () {
						var vhaAssetId = $(this).attr('assetid');
						SiebelApp.S_App.SetProfileAttr("vha_assetId",vhaAssetId);
						$('[aria-label="Asset Form Applet:Display EEF & MPP"]').trigger("click");
					});
			
					$('.item-header').off('click').on('click', function () {
						const Accrbody = $(this).next('.sec-container');
						const Accrarrow = $(this).find('.arrow-icon');
						Accrbody.slideToggle("slow");
						Accrarrow.toggleClass('rotate');
					});
					$('#item-edit-btn-' + serv.MSISDN).off('click').on('click', function () {
						let sId = $(this).attr('data-id');
						//var servName = $(this).closest('.cart-items-container').find(".header-text").html();
						$.map(scJson.QuoteHeader.ExistingServices[0], function (i) {
							if (i.MSISDN == sId) {
								var curStatus = i.CartStatus;
								i.CartStatus = "UpdateinProgress";
								$("#cart-container-"+sId).addClass('editing');
								//$('.cart-container-editing').closest('.cart-container').prepend('<h2 class="currently-editing">Currently editing</h2>');
								//expose message in left pane
								$('#vha-msg-ln').removeClass("displaynone").removeClass("vha-msg-update");
								$('#vha-msg-ln #vha-msg-title').html(`<img src="`+VHAAppUtilities.GetDeviceIcon("info")+`" alt="img" class="header-icon cart-icon">
								<span class="vha-msg-itm">You are editing ` + serv.MSISDN + `</span>
								<span id="vha-edit-lnk" service-name="` + serv.MSISDN + `" data-id="` + i.MSISDN + `" data-status="` + curStatus + `" class="vha-edit-lnk float-right">Cancel editing</span>`);
								let status = $('#vha-edit-lnk').attr('data-status');

								//disable buttons: jeeten
								const buttons = document.querySelectorAll(".vha-scj-cart-summary button");
								buttons.forEach(button => {
									button.disabled = true;
									}
								);

								filteredExistingServices = scJson.QuoteHeader.ExistingServices[0].filter(obj => obj.MSISDN === serv.MSISDN)[0];
						        if(filteredExistingServices.OutOfMarket === "Y"){
									if(filteredExistingServices.SiebelProdType === 'Voice'){
										//$(`.availableplansheadingcontainer1[data-device="mobile"] .availableplans  .current-plancontainer .plandetailsitemsmain .stockStatus`).removeClass("displaynone");
										$(`.availableplansheadingcontainer1[data-device="mobile"] .current-plan-warning-box`).removeClass("displaynone");
										$(`.availableplansheadingcontainer1[data-device="mobile"] .current-plan-warning-box .warning-icon`).addClass("displaynone");
										$(`.availableplansheadingcontainer1[data-device="mobile"] .current-plan-warning-box .warning-text`).text("Current plan is out of market. An in market plan must be selected before any other changes can be saved.");
									}
									if(filteredExistingServices.SiebelProdType === 'Mbb'){
										//$(`.availableplansheadingcontainer1[data-device="tablet"] .current-plancontainer .stockStatus`).removeClass("displaynone");
										$(`.availableplansheadingcontainer1[data-device="tablet"] .current-plan-warning-box`).removeClass("displaynone");
										$(`.availableplansheadingcontainer1[data-device="tablet"] .current-plan-warning-box .warning-icon`).addClass("displaynone");
										$(`.availableplansheadingcontainer1[data-device="tablet"] .current-plan-warning-box .warning-text`).text("Current plan is out of market. An in market plan must be selected before any other changes can be saved.");
									}
								}
									if(filteredExistingServices.SiebelProdType === 'Voice'){
										$(`.availableplansheadingcontainer1[data-device="mobile"] .current-plan`).removeClass("displaynone");
										$(`.availableplansheadingcontainer1[data-device="mobile"] .current-plan-toggle-switch`).removeClass("displaynone");
										//$(`.availableplansheadingcontainer1[data-device="mobile"] .availableplans .current-plancontainer .plandetailsitemsmain .stockStatus`).addClass("displaynone");
									}
									if(filteredExistingServices.SiebelProdType === 'Mbb'){
										$(`.availableplansheadingcontainer1[data-device="tablet"] .current-plan`).removeClass("displaynone");
										$(`.availableplansheadingcontainer1[data-device="tablet"] .current-plan-toggle-switch`).removeClass("displaynone");
										//$(`.availableplansheadingcontainer1[data-device="tablet"] .availableplans  .current-plancontainer .plandetailsitemsmain .stockStatus`).addClass("displaynone");
									}
									//devices highlight
									if(filteredExistingServices.SiebelProdType === 'Voice'){
										if(filteredExistingServices.ListOfAssetLineItemGPP.AssetLineItemGPP){
											let name = filteredExistingServices.ListOfAssetLineItemGPP.AssetLineItemGPP.Name;
											let RecurringCharge = filteredExistingServices.ListOfAssetLineItemGPP.AssetLineItemGPP.RecurringCharge;
											const mobileTab = $('.carosuel-main[data-id="mobile"]');
											const toggle = mobileTab.find('.current-plan-toggle-switch');
											toggle.removeClass('displaynone');
											mobileTab.find('.ssj-existing-ser-info-product-description').text(name);
											mobileTab.find('.ssj-existing-ser-info-price-info').text(`$${RecurringCharge}/mo`);
										}
									}
									if(filteredExistingServices.SiebelProdType === 'Mbb'){
										if(filteredExistingServices.ListOfAssetLineItemGPP.AssetLineItemGPP){
											let name = filteredExistingServices.ListOfAssetLineItemGPP.AssetLineItemGPP.Name;
											let RecurringCharge = filteredExistingServices.ListOfAssetLineItemGPP.AssetLineItemGPP.RecurringCharge;
											const tabletTab = $('.carosuel-main[data-id="tablet"]');
											const toggle = mobileTab.find('.current-plan-toggle-switch');
											toggle.removeClass('displaynone');
											tabletTab.find('.ssj-existing-ser-info-product-description').text(name);
											tabletTab.find('.ssj-existing-ser-info-price-info').text(`$${RecurringCharge}/mo`);
										}
									}
									
								$('#vha-message-box').html('<li>' + i.ListOfRatePlan.RatePlan.Name + '</li>');
								$('#vha-edit-lnk').off('click').on('click', function () {
									let divId = $(this).attr('data-id');
									let curStatus = $(this).attr('data-status');
									$.map(scJson.QuoteHeader.ExistingServices[0], function (j) {
										if (j.MSISDN == divId) {
											j.CartStatus = curStatus;
											$('#vha-msg-ln').addClass("displaynone");
											$('#cart-container-' + serv.MSISDN).removeClass("editing");
											//switch button
											$('.vha-scj-step3-upd').addClass("displaynone");
											$('.vha-scj-step3-nxt').removeClass("displaynone");
											ResetDeviceTiles();
											// reset plan tiles
											resetPlansTiles();
											const buttons = document.querySelectorAll(".vha-scj-cart-summary button");
											buttons.forEach(button => {
												button.disabled = false;
												}
											);
										}
									});
								});
								//switch button
								$('.vha-scj-step3-upd').removeClass("displaynone");
								$('.vha-scj-step3-nxt').addClass("displaynone");
								
								//call function to highlight left side.
								let curretRootItem = scJson.QuoteHeader.ExistingServices[0].filter(obj => obj.MSISDN === sId)[0];
								/*if(curretRootItem){
									if(curretRootItem.DeviceItem.length > 0){
										 let highlightedDevice = scJson.QuoteHeader.ExistingServices[0].filter(obj => obj.MSISDN === sId)[0].DeviceItem[0];
										 let device = DevicesGrouped.filter(obj => obj.name === highlightedDevice.UI__Source_Product_Name);
										 CreateDeviceTiles(device,"mobile","highlightcard",highlightedDevice);
									}
									if(curretRootItem.TabletItem.length > 0){
										 let highlightedDevice = scJson.QuoteHeader.ExistingServices[0].filter(obj => obj.MSISDN === sId)[0].TabletItem[0];
										 let device = Tabletdata.filter(obj => obj.name === highlightedDevice.UI__Source_Product_Name);
										 CreateDeviceTiles(device,"tablet","highlightcard",highlightedDevice);
									}
								}
								//call function to higlight plan on left side.
								 $(`.availableplans .availableplansdetailContainers`).removeClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone').find('.planCount').val(0);
								 $(`.availableplans .vha-scj-select-plan`).text("Select").removeClass("selected-card-plan-btn");
								let currPlan = scJson.QuoteHeader.RootItem.filter(obj => obj.Id === sId)[0];
								if(curretRootItem.DeviceItem.length > 0 || curretRootItem.TabletItem.length > 0 ){
									filterPlans = [...filterDevicePlans];
									if(curretRootItem.DeviceItem.length > 0){
										displayPlans(filterDevicePlans, "mobile");
										$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
										$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
									}
									if(curretRootItem.TabletItem.length > 0)
									{
										displayPlans(filterDevicePlans, "tablet");
										$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
										$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
									}
								}
								else{
									filterPlans = [...jsonplans];
									if(currPlan.PlanItem.Name){
										const highlightedPlan = filterPlans.filter((data) => data.propArray.Plan_Code === currPlan.PlanItem.Code);
										displayPlans(jsonplans, "mobile");
										$(`.availableplans .availableplansdetailContainers[data-plan-code="${currPlan.PlanItem.Code}"]`).addClass("selected-card-plan").find('.mbPlanCounter').addClass('displaynone');
										$(` .availableplans .vha-scj-select-plan[data-plan-code="${currPlan.PlanItem.Code}"]`).text("Selected").addClass("selected-card-plan-btn");
									}
								}*/
							}
						});
					});
				})
			}

		   function fetch_cust_detail (resultSet){
			var accountHolderFname="";
			var accountHolderLname="";
			var EquipmentLimitRemaining ="";
			var ApprovedServices ="";
			var CreditCheckStatus ="";
			var ActiveServices =""
				if(resultSet != null){
					  accountHolderFname  = resultSet.GetProperty("FirstName");
					  accountHolderLname = resultSet.GetProperty("LastName");
					  EquipmentLimitRemaining = resultSet.GetProperty("RemainingEquipmentLimit");
					// EquipmentLimitRemaining = parseFloat(EquipmentLimitRemaining).toFixed(2);
					//   remainingEquipmentLimitCheck = parseFloat(EquipmentLimitRemaining) || 0;
					//   updEquipmentLimitCheck = parseFloat(EquipmentLimitRemaining) || 0;
					 /*sushma*/
					var EquipmentLimitNum = parseFloat(EquipmentLimitRemaining);
                       if (isNaN(EquipmentLimitNum)) {
                        EquipmentLimitNum = 0;
                     }
                    EquipmentLimitRemaining = EquipmentLimitNum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                   EquipmentLimitRemaining = "$" + EquipmentLimitRemaining;
					 /*end*/
					  ApprovedServices = resultSet.GetProperty("ApprovedServices");
					  CreditCheckStatus = resultSet.GetProperty("CreditCheckStatus");
					  ActiveServices = resultSet.GetProperty("ActiveServices");
					var custHtml = `<div class="vha-cust-sec"><div class="vha-cust-details-sec"><div class="vha-cust-fields">Name </div><div class="vha-cust-f-vals">`+(accountHolderFname +"  "+accountHolderLname)+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Active services </div><div class="vha-cust-f-vals">`+ActiveServices+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Approved services </div><div class="vha-cust-f-vals">`+ApprovedServices+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Equipment limit remaining </div><div class="vha-cust-f-vals">`+EquipmentLimitRemaining+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Credit check status </div><div class="vha-cust-f-vals">`+CreditCheckStatus+`</div></div></div>`;
					$('#vha-scj-cust-details').children().remove();
					$('#vha-scj-cust-details').append(custHtml);  
			}
		   }

		   $("#vha-scj-step2-searchicon").on("click", function (e) {
			  /* $("#step2divider").addClass("displaynone");
			   $(".resultforcontainerparent").removeClass("displaynone");
			   //Mobile//
			   $("#mobileinitailtext").addClass("displaynone");
			   $(".Mobilecoverageresultcontainer").removeClass("displaynone");
			   //Fixed//
			   $("#fixedinitailtext").addClass("displaynone");
			   $(".fixedcoverageresultcontainer").removeClass("displaynone");
			   //FixedWirelsess//
			   $("#fixedwirelessinitailtext").addClass("displaynone");
			   $(".fixedwirelesscoverageresultcontainer").removeClass("displaynone");*/
		   });
		   
		   $(".vha-scj-cancel-quote").on("click", function (e) {
			   $(".vha-scj-allsteps").addClass("displaynone");
			   $(".vha-scj-step1").removeClass("displaynone");
		   });
			
			//tabs functionality  for mobile & fixed
		   $("#vha-scj-stp3-mb-tab").on("click", function (e) {
				$('.vha-scj-tab-main').removeClass('scj-tab-active');
				$(this).addClass('scj-tab-active');
			   $(".fx-blocks").addClass("displaynone");
			   $(".mb-blocks").removeClass("displaynone");
		   });
		   $("#vha-scj-stp3-fx-tab").on("click", function (e) {
				$('.vha-scj-tab-main').removeClass('scj-tab-active');
				$(this).addClass('scj-tab-active');
			   $(".fx-blocks").removeClass("displaynone");
			   $(".mb-blocks").addClass("displaynone");
		   });
		   
			//tabs functionality  for device tabs 
   
		   $('#vha-scj-stp3-mobiles-tab').on('click', function(e){
			   $(`.current-plan-warning-box`).addClass("displaynone"); 
			   ActiveTab = "mobile";
			   $('.vha-scj-st3-mb-plans').removeClass('displaynone');
			   $('.vha-scj-tab-device').removeClass('scj-device-tab-active');
			   $(this).addClass('scj-device-tab-active');
				$('.vha-scj-mobiletab').removeClass('displaynone');
				$('.vha-scj-tablets-tab').addClass('displaynone');
				$('.vha-scj-accessory-tab').addClass('displaynone');
				$('.vha-scj-wearbles-tab').addClass('displaynone');
			    $('.availableplansheadingcontainer1[data-device="mobile"]').removeClass('displaynone');
			    $('.availableplansheadingcontainer1[data-device="tablet"]').addClass('displaynone');
			   const $container = $(`.availableplansheadingcontainer1[data-device="mobile"] .availableplans .plancontainer`);
			   const plansCount = $container.find(".availableplansdetailContainers").length;
			    if(currentRLI[0].DeviceItem && currentRLI[0].DeviceItem.length > 0 && currentRLI[0].PlanItem.Name)
				{
					filterPlans = filterDevicePlans;
					 //displayPlans(filterPlans, "mobile");
				}
			   else{
				   filterPlans = jsonplans;
				    //displayPlans(filterPlans, "mobile");
			   }

			   if(plansCount === 0){
				    displayPlans(jsonplans, "mobile");
			   }
				
		   });
		   $('#vha-scj-stp3-tablets-tab').on('click', function(e){
			   $(`.current-plan-warning-box`).addClass("displaynone");  
			    ActiveTab = "tablet";
				$('.vha-scj-st3-mb-plans').removeClass('displaynone');
			   $('.vha-scj-tab-device').removeClass('scj-device-tab-active');
			   $(this).addClass('scj-device-tab-active');
			   $('.vha-scj-mobiletab').addClass('displaynone');
			   $('.vha-scj-accessory-tab').addClass('displaynone');
			   $('.vha-scj-wearbles-tab').addClass('displaynone');
			   $('.vha-scj-tablets-tab').removeClass('displaynone');
			   $('.availableplansheadingcontainer1[data-device="tablet"]').removeClass('displaynone');
			   $('.availableplansheadingcontainer1[data-device="mobile"]').addClass('displaynone');
			   const $container = $(`.availableplansheadingcontainer1[data-device="tablet"] .availableplans .plancontainer`);
			   const plansCount = $container.find(".availableplansdetailContainers").length;
			   propositionInitialized = "N";
			   filterPlans = jsonTabletMbbPlans;
			   displayPlans(jsonTabletMbbPlans, "tablet");

			   if(plansCount === 0){
				    propositionInitialized = "N";
				    displayPlans(jsonTabletMbbPlans, "tablet");  
			   }
			   const $carousel = $(`.carosuel-main[data-id="tablet"] .vha-scj-carousel`);
			   const cardCount = $carousel.find(".vha-scj-card").length;
   
			    if (cardCount === 0) {
					/* if(Tabletdata.length === 0){ // tablets Dev testing purpose 
						 Tabletdata = DevicesGrouped;
						
					 } */
					 filteredTablets = filterByBrands(["Apple"]);
					 $('.scj-filtertablets[value="Apple"]').prop('checked', true);
					 CreateDeviceTiles(filteredTablets,"tablet");					
					 Tabletsearch();
					
					 
			   
			    }
			  
		   
		   });
		   $('#vha-scj-stp3-bundles-tab').on('click', function(e){
			   //$(`.current-plan-warning-box`).addClass("displaynone");
				$('.vha-scj-st3-mb-plans').addClass('displaynone');			   
			   $('.vha-scj-tab-device').removeClass('scj-device-tab-active');
			   $(this).addClass('scj-device-tab-active');
			   $('.vha-scj-mobiletab').addClass('displaynone');
				$('.vha-scj-tablets-tab').addClass('displaynone');
				$('.vha-scj-accessory-tab').addClass('displaynone');
				$('.vha-scj-wearbles-tab').addClass('displaynone');
				$('.availableplansheadingcontainer1[data-device="mobile"]').addClass('displaynone');
			    $('.availableplansheadingcontainer1[data-device="tablet"]').addClass('displaynone');
		  });
		   $('#vha-scj-stp3-Accessories-tab').on('click', function(e){
			  	
			   $(`.current-plan-warning-box`).addClass("displaynone"); 
			   let res = cartValidations();   //plan and device alerts
			   
			   if(res){
				   return false;
			   }
			   ActiveTab = "accessory"; 
			   $('.vha-scj-st3-mb-plans').addClass('displaynone');	
			   $('.vha-scj-tab-device').removeClass('scj-device-tab-active');
			   $('.vha-scj-accessory-tab').removeClass('displaynone');
			   $(this).addClass('scj-device-tab-active');
			   $('.vha-scj-mobiletab').addClass('displaynone');
				$('.vha-scj-tablets-tab').addClass('displaynone');
				$('.vha-scj-wearbles-tab').addClass('displaynone');
				$('.availableplansheadingcontainer1[data-device="mobile"]').addClass('displaynone');
			    $('.availableplansheadingcontainer1[data-device="tablet"]').addClass('displaynone');
				const $carousel = $(`.carosuel-main[data-id="accessory"] .vha-scj-carousel`);
			   const cardCount = $carousel.find(".vha-scj-card").length;

			   if (cardCount > 0) {
				 return false;
			   
			   }
  
				 //call wf to get Accessories
				var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
				var Inputs = SiebelApp.S_App.NewPropertySet();
				Inputs.SetProperty("ProcessName", "VHA SSJ Product Info Process");
				Inputs.SetProperty("Type", "Accessory");
				var Output = ser.InvokeMethod("RunProcess", Inputs);
				 Accessoriesdata = Output.childArray[0].childArray[0].childArray[0].childArray;
				 filteredAccessories = filterByBrands(["Apple"]);
				 $('.scj-filteraccessories[value="Apple"]').prop('checked', true);
				CreateAccessoryTiles(filteredAccessories);
				//CreateAccessoryTiles(Accessoriesdata);
				let Accesdata = Accessoriesdata.map(obj => obj.propArray["Device Name"]);
				$(".vha-scj-search-accessory").autocomplete({
					   source: Accesdata.map(function (a) {
					   return {
						   label: a,
						   value: a,
						   type: "Accessory"
					   };
				   }),
				   minLength: 0,
				   select: selectAutoCompleteVal
			    });
				
				
		  });
		  
		  $('#vha-scj-stp3-Wearables-tab').on('click', function(e){
			  
			$(`.current-plan-warning-box`).addClass("displaynone"); 
			let res = cartValidations();   //plan and device alerts
			 if(res){
				   return false;
			   }
			  ActiveTab = "Wearble"; // accessory, Wearble, tablet
			  $('.vha-scj-st3-mb-plans').addClass('displaynone');	
			   $('.vha-scj-tab-device').removeClass('scj-device-tab-active');
			   $('.vha-scj-wearbles-tab').removeClass('displaynone');
			   $(this).addClass('scj-device-tab-active');
			   $('.vha-scj-mobiletab').addClass('displaynone');
				$('.vha-scj-tablets-tab').addClass('displaynone');
				$('.vha-scj-accessory-tab').addClass('displaynone');
				$('.availableplansheadingcontainer1[data-device="mobile"]').addClass('displaynone');
			    $('.availableplansheadingcontainer1[data-device="tablet"]').addClass('displaynone');
				const $carousel = $(`.carosuel-main[data-id="Wearble"] .vha-scj-carousel`);
			   const cardCount = $carousel.find(".vha-scj-card").length;
   
			    if (cardCount === 0) {
					 groupWearables();
					 filteredWearables = filterByBrands(["Apple"]);
					 $('.scj-filterwearbles[value="Apple"]').prop('checked', true);
					 CreateWearbleTiles(filteredWearables,"Wearble");
					
				}
		  });
		   $('#vha-scj-stp3-tradein-tab').on('click', function(e){
			   $('.vha-scj-tab-device').removeClass('scj-device-tab-active');
			   $(this).addClass('scj-device-tab-active');
			   $('.vha-scj-mobiletab').addClass('displaynone');
				$('.vha-scj-tablets-tab').addClass('displaynone');
				$('.vha-scj-accessory-tab').addClass('displaynone');
				$('.vha-scj-wearbles-tab').addClass('displaynone');
				$('.availableplansheadingcontainer1[data-device="mobile"]').addClass('displaynone');
			    $('.availableplansheadingcontainer1[data-device="tablet"]').addClass('displaynone');
		  });
   
		   //filter devices
		 /*  $('.scj-filtermobiles').on('change', function (e) {
			   if ($(this).is(':checked')) {
				 // filter all devices here
				 console.log($(this).val());
				  FilteredDevices = filterByBrand($(this).val());
				 CreateDeviceTiles(FilteredDevices,"mobile");
				 
				 
			   }
		   }); */
		   
		   $('.scj-filtermobiles').on('change', function () {
		   // Get all selected brands
		   const selectedBrands = $('.scj-filtermobiles:checked').map(function () {
		    return $(this).val();
		    }).get();
   
		    
			   if (selectedBrands.length === 0) {
				// Default to Apple if no brand is selected
					filteredDevices = filterByBrands(["Apple"]);
				}
				else {
					filteredDevices = filterByBrands(selectedBrands);
				}
   
                if($('#vha-scj-sort-devices').val() != "Select"){
					let selectedValue = $('#vha-scj-sort-devices').val();
					SortDevices(selectedValue);
				}
				else{
					// Update the carousel
					CreateDeviceTiles(filteredDevices, "mobile");
				}
		    
		   });
       
		   //filter tablets
		   $('.scj-filtertablets').on('change', function (e) {
				const selectedBrands = $('.scj-filtertablets:checked').map(function () {
				return $(this).val();
				}).get();
	   
				
				   if (selectedBrands.length === 0) {
					// Default to Apple if no brand is selected
						filteredTablets = filterByBrands(["Apple"]);
					}
					else {
						filteredTablets = filterByBrands(selectedBrands);
					}
	   
					if($('#vha-scj-sort-tablets').val() != "Select"){
						let selectedValue = $('#vha-scj-sort-tablets').val();
						SortDevices(selectedValue);
					}
					else{
						// Update the carousel
						CreateDeviceTiles(filteredTablets, "tablet");
					}
				
				
		   });
		    //filter wearbles
		   $('.scj-filterwearbles').on('change', function (e) {
				const selectedBrands = $('.scj-filterwearbles:checked').map(function () {
				return $(this).val();
				}).get();
	   
				
				   if (selectedBrands.length === 0) {
					// Default to Apple if no brand is selected
						filteredWearables = filterByBrands(["Apple"]);
					}
					else {
						filteredWearables = filterByBrands(selectedBrands);
					}
					if($('#vha-scj-sort-wearbles').val() != "Select"){
						let selectedValue = $('#vha-scj-sort-wearbles').val();
						SortDevices(selectedValue);
					}
					else{
						// Update the carousel
						CreateWearbleTiles(filteredWearables, "Wearble");
					}
	   
				
		   });
		   //filter accessories
		    $('.scj-filteraccessories').on('change', function () {
			   // Get all selected brands
			   const selectedBrands = $('.scj-filteraccessories:checked').map(function () {
				return $(this).val();
				}).get();
   
				
				if (selectedBrands.length === 0) {
				// Default to Apple if no brand is selected
				filteredAccessories = filterByBrands(["Apple"]);
				} else {
				filteredAccessories = filterByBrands(selectedBrands);
				}
   
				if($('#vha-scj-sort-accessories').val() != "Select"){
					let selectedValue = $('#vha-scj-sort-accessories').val();
					SortDevices(selectedValue);
				}
				else{
					// Update the carousel
					CreateAccessoryTiles(filteredAccessories);
				}
		  
				
		    });
		   
		   // Handle Add to Cart
		   $('.vha-scj-carousel').on('click', '.vha-scj-select-btn', function () {
			   const $card = $(this).closest('.vha-scj-card');
			   const dataId = $card.closest('.carosuel-main').data('id');
			   //const monthlyPrice = $card.find(".device-monthly-price").text();
			   //const productId = $(this).data('product-id');
                 $(`.carosuel-main[data-id="${dataId}"] .vha-delivery-div`).addClass('displaynone');
				 $card.find(".vha-delivery-div").removeClass('displaynone');
			    
			   switch (dataId) {
			   case "mobile":{
			       if(currentRLI.length > 1){
					   // alert("You have seletcted mutiple plans, device selection is allowed only with one plan.")
					   $(`.vha-scj-mobiletab .current-plan-warning-box`).removeClass("displaynone");
					   $(`.vha-scj-mobiletab .current-plan-warning-box .warning-text`).text("You have selected mutiple plans, device selection is allowed only with one plan.");
				       return false;
				   }
				   //console.log(`Add to cart from carousel: ${dataId}, product ID: ${productId}`);  
				   $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
					$(this).text("Selected");
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
					  $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
					$card.addClass('selected-card');
					$(this).addClass("selected-card-btn");
					
					 //get selected variant details 
					const modelName = $card.find(".vha-scj-model").text().trim();
				    const selectedColor = $card.find(".vha-scj-colour-select").val();
				    const selectedStorage = $card.find(".vha-scj-storage-select").val();
				    const paymentTerm = $card.find(".vha-scj-payment-tr-select").val();
				    const monthlyPrice = $card.find(".device-monthly-price").text();
					currentRLI.AllCostPerMonth = $card.find(".device-monthly-price").text();
					currentRLI.TotalSrvPerMth = $card.find(".device-monthly-price").text();
	   
				   const matchedDevice = DevicesGrouped.find((device) => device.name === modelName);
   
			   if (matchedDevice) {
				   const matchedVariant = matchedDevice.variants.find((variant) => variant.Color === selectedColor && variant.Capacity === selectedStorage);
   
				   if (matchedVariant) {
					  
					   /*currentRLI.DeviceItem[0].UI__Capacity = matchedVariant.Capacity;
					   currentRLI.DeviceItem[0].UI__Color = matchedVariant.Color;
					   currentRLI.DeviceItem[0].UI__RRP__Inc__GST = matchedVariant.RRP_Inc_Gst;
					   currentRLI.DeviceItem[0].UI__Source_Product_Name = matchedVariant.Source_Product_Name;
					   currentRLI.DeviceItem[0].Name = matchedVariant.Make;
					   currentRLI.DeviceItem[0].Item__Code = matchedVariant.Product_Code;
					   currentRLI.DeviceItem[0].Term = paymentTerm; */
					   
					   let matchedDeviceObj = {
						   UI__Capacity: matchedVariant.Capacity,
						   UI__Color: matchedVariant.Color,
						   UI__RRP__Inc__GST: matchedVariant.RRP_Inc_Gst,
						   UI__Source_Product_Name: matchedVariant.Source_Product_Name,
						   Name: matchedVariant.Make,						   
						   DeviceTerm: paymentTerm,
						   "Contract__Amount": matchedVariant.RRP_Inc_Gst,
						   "Monthly__Repayment": monthlyPrice,
						   Action: "Add",
						   Type: "Device",
						   Category: "Device",
						   PropSAMId:matchedVariant.Proposition_Sam_Id,
						   
						   Item__Name:matchedVariant.Source_Product_Name,
						   Item__Code: matchedVariant.Product_Code,
						   ProdIntegrationId:"",
						   Additional__Info:"",
						   IMEI___Serial__Number:"",
						   "Original__Order__Number": "",
						   "Original__Purchase__Date": "",
						   "Prepayment__Amount": "0.00",
						   "Term": paymentTerm,
						   "Term__Override": "",
						   "Insurance": "",
						   "InsPri": "",
							
						   
						   
					   };	
					   if(currentRLI[0].mobilePlanfirst === 'Y'){
						    currentRLI[0].mobilefirst = 'N';
					   }
					   if(currentRLI[0].mobilePlanfirst === 'N'){
						   currentRLI[0].mobilefirst = 'Y';
						   displayPlansProductCode(matchedVariant.Product_Code, dataId);
					   }	
					   currentRLI[0].DeviceItem = [];
					   currentRLI[0].DeviceItem.push(matchedDeviceObj);
					   //use productCode for cart logic
				    } else {
					   // alert("No variant matched for selected color and storage, try other variants");
					   $(`.vha-scj-mobiletab .current-plan-warning-box`).removeClass("displaynone");
					   $(`.vha-scj-mobiletab .current-plan-warning-box .warning-text`).text("No variant matched try other variants.");
					   $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
					   $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
					  $(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
				    }
			    } else {
				   console("No matching device found for model:", modelName);
			    }
				
				   break;
			   }
			   case "tablet":{
				    
				   $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
				   $(this).text("Selected");
				   $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
				   $(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
				   $card.addClass('selected-card');
				   $(this).addClass("selected-card-btn");
					 //get selected variant details 
				   const modelName = $card.find(".vha-scj-model").text().trim();
				   const selectedColor = $card.find(".vha-scj-colour-select").val();
				   const selectedStorage = $card.find(".vha-scj-storage-select").val();
				   const paymentTerm = $card.find(".vha-scj-payment-tr-select").val();
				   const monthlyPrice = $card.find(".device-monthly-price").text();
   
			       const matchedDevice = Tabletdata.find((device) => device.name === modelName);
					if (matchedDevice) {
						const matchedVariant = matchedDevice.variants.find((variant) => variant.Color === selectedColor && variant.Capacity === selectedStorage);

						if (matchedVariant) {
							let matchedDeviceObj = {
								UI__Capacity: matchedVariant.Capacity,
								UI__Color: matchedVariant.Color,
								UI__RRP__Inc__GST: matchedVariant.RRP_Inc_Gst,
								UI__Source_Product_Name: matchedVariant.Source_Product_Name,
								Name: matchedVariant.Make,
								Item__Code: matchedVariant.Product_Code,
								DeviceTerm: paymentTerm,
								"Contract__Amount": matchedVariant.RRP_Inc_Gst,
								"Monthly__Repayment": monthlyPrice,
								Action: "Add",
								Type: "Tablet",
								Category: "Tablet",
								PropSAMId: matchedVariant.Proposition_Sam_Id,
							};
							//if (Object.keys(currentRLI[0].PlanItem).length === 0) displayPlansProductCode(matchedVariant.Product_Code);

							currentRLI[0].TabletItem = [];
							currentRLI[0].TabletItem.push(matchedDeviceObj);
							displayPlansProductCode(matchedVariant.Product_Code, dataId);
							//use productCode for cart logic
						} else {
							// alert("No variant matched for selected color and storage, try other variants");
							$(`.vha-scj-tablets-tab .current-plan-warning-box`).removeClass("displaynone");
					        $(`.vha-scj-tablets-tab .current-plan-warning-box .warning-text`).text("No variant matched try other variants.");
							$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
							$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass("selected-card-btn");
							$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass("selected-card");
						}
					} else {
						console("No matching device found for model:", modelName);
					}

   
				   break;
			   }
			   case "accessory":{
			   
					// add to currentri
					const productcode = $card.find(".vha-scj-product-code").text().trim();
					const matchedDevice = Accessoriesdata.find((device) => device.propArray["Product Code"] === productcode);
					const props = matchedDevice.propArray;
					const monthlyPrice = $card.find(".device-monthly-price").text();
			        if (matchedDevice) {
						 let matchedDeviceObj = {
						    Action: "Add",
							Type: "Accessory",
							ProdIntegrationId: "",
							Accessory__Code: props['Product Code'],
							Accessory__Name: props['Device Name'],
							Accessory__RRP__Exc__GST: props['RRP Exc GST'],
							Accessory__RRP__Inc__GST: props['RRP'],
							Category: props['Category'],
							Prepayment__Amount: ""
					    };
						 if(currentRLI[0].AccItem.length < 10){
							  $card.find(".vha-scj-quantity").removeClass('displaynone');
							$(this).text("Selected");
							$card.addClass('selected-card');
							$(this).addClass("selected-card-btn");
							currentRLI[0].AccItem.push(matchedDeviceObj);
							$('.vha-ssj-items-num').text(currentRLI[0].AccItem.length);
						 }
							
						 else{
							 $(this).text("Select");
							 $card.removeClass('selected-card');
							 $(this).removeClass("selected-card-btn");
							  $card.find(".vha-scj-quantity").addClass('displaynone');
							 //alert("Please select less accessories");
							 $(`.vha-scj-accessory-tab .current-plan-warning-box`).removeClass("displaynone");
							 $(`.vha-scj-accessory-tab .current-plan-warning-box .warning-text`).text("Please select less Accessories and refer the customer to a store to purchase any additional accessories outright.");
						 }
					}
				   break;
			    }
				case "Wearble":{
				   const modelName = $card.find(".vha-scj-model").text().trim();
				   const selectedColor = $card.find(".vha-scj-colour-select").val();
				   const bandsize = $card.find(".vha-scj-band-size-select").val();
				   const band = $card.find(".vha-scj-band-select").val();
				   const casesize = $card.find(".vha-scj-case-size-select").val();
				   const paymentTerm = $card.find(".vha-scj-payment-tr-select").val();
				   const monthlyPrice = $card.find(".device-monthly-price").text();
	   
				   const matchedDevice = Wearablesdata.find((device) => device.name === modelName);
                    if (matchedDevice) {
				        const matchedVariant = matchedDevice.variants.find((variant) => variant['VHA SMS Colour'] === selectedColor && variant['VHA Band'] === band && variant['VHA Band Size'] === bandsize && variant['VHA Case Size'] === casesize);
   
				        if (matchedVariant) {
						    let matchedDeviceObj = {
							    Type:"SecondaryDevice",
								Action: "Add", 
								Item__Name: matchedVariant['VHA Product Name'],								
								ProdIntegrationId: "",
								Wearble__Code : matchedVariant['Product Code'],
								Term: paymentTerm,
								RRP__Inc__GST: matchedVariant['VHA RRP Inc GST'],
								BandSize : matchedVariant['VHA Band Size'],
								Band : matchedVariant['VHA Band'],
								CaseSize : matchedVariant['VHA Case Size'],
								Color : matchedVariant['VHA SMS Colour'],
								Additional__Info: "",
								Category: matchedVariant['VHA Category'],
								Insurance: "",
								InsPri: "",
							    
						    };	
							 if(currentRLI[0].SecondaryItem.length < 5){
								$card.find(".vha-scj-quantity").removeClass('displaynone');
								$(this).text("Selected");
								$card.addClass('selected-card');
								$(this).addClass("selected-card-btn");
								currentRLI[0].SecondaryItem.push(matchedDeviceObj);
							 }
							
							 else{
								 $(this).text("Select");
								 $card.removeClass('selected-card');
								 $(this).removeClass("selected-card-btn");
								  $card.find(".vha-scj-quantity").addClass('displaynone');
								 // alert('Already Added maximun Quantity 5 - wearbles ');
								 $(`.vha-scj-wearbles-tab .current-plan-warning-box`).removeClass("displaynone");
								 $(`.vha-scj-wearbles-tab .current-plan-warning-box .warning-text`).text("Maximum of 5 wearables only allowed. Please select less wearables.");

							 }
						    
						   //use productCode for cart logic
						} else {
							   // alert("No variant matched for selected color and storage, try other variants");
							   $(`.vha-scj-wearbles-tab .current-plan-warning-box`).removeClass("displaynone");
					           $(`.vha-scj-wearbles-tab .current-plan-warning-box .warning-text`).text("No variant matched try other variants.");
							   $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
							   $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
							  $(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
						}
					} else {
					   //console("No matching device found for model:", modelName);
					}
					 break;
			    }
			   default:
				   break;
		   }
   
		   });
   
		   // Handle Color Selection
		   $('.vha-scj-carousel').on('change', '.vha-scj-colour-select', function () {
			   const $card = $(this).closest('.vha-scj-card');
			   const dataId = $card.closest('.carosuel-main').data('id');
			   const color = $(this).val();
   
			   // Optional: mark selected
			   $(this).addClass('selected').siblings().removeClass('selected');
   
			   
			   switch (dataId) {
			   case "mobile":
			   	//  console.log(`Color selected in carousel ${dataId}: ${color}`);
			   	$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
				$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
				$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
				   updatePricing($card);
				   break;
   
			   case "tablet":
				$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
				$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
				$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
				   updatePricing($card);
				   break;
   
			   case "Wearble":
				$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
				$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
				$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
				   updatePricing($card);
				   break;
   
			   default:
				   break;
		   }
   
		   });
   
		   // Handle Storage Selection
		   $('.vha-scj-carousel').on('change', '.vha-scj-storage-select', function () {
			   const $card = $(this).closest('.vha-scj-card');
			   const dataId = $card.closest('.carosuel-main').data('id');
			   const storage =$(this).val();
   
			   $(this).addClass('selected').siblings().removeClass('selected');
   
			  
			   switch (dataId) {
			   case "mobile":
					//console.log(`Storage selected in carousel ${dataId}: ${storage}`);
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
					updatePricing($card);
				   break;
   
			   case "tablet":
				 //console.log(`Storage selected in carousel ${dataId}: ${storage}`);
				 //console.log(`Storage selected in carousel ${dataId}: ${storage}`);
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
					updatePricing($card);
				   break;
   
			   case "laptop":
				   break;
   
			   default:
				   break;
		   }
   
		   });
   
		   // Handle Payment Term Change
		   $('.vha-scj-carousel').on('change', '.vha-scj-payment-tr-select', function () {
			   const $card = $(this).closest('.vha-scj-card');
			   const dataId = $card.closest('.carosuel-main').data('id');
			   const term = $(this).val();
   
			  
				switch (dataId) {
				   case "mobile":
					  //console.log(`Payment term changed in carousel ${dataId}: ${term}`);
					  updatePricing($card);
					   break;
	   
				   case "tablet":
					   updatePricing($card);
					   break;
	   
				   case "Wearble":
					  updatePricing($card);
					   break;
	   
				   default:
					   break;
				}
   
		   });
		    $('.vha-scj-carousel').on('change', '.vha-scj-case-size-select', function () {
			   const $card = $(this).closest('.vha-scj-card');
			   const dataId = $card.closest('.carosuel-main').data('id');
				switch (dataId) {
				   case "Wearble":
				    $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
					updatePricing($card);
					   break;
	   
				    default:
					   break;
				}
   
		    });
			$('.vha-scj-carousel').on('change', '.vha-scj-band-select', function () {
			   const $card = $(this).closest('.vha-scj-card');
			   const dataId = $card.closest('.carosuel-main').data('id');
				switch (dataId) {
				   case "Wearble":
				    $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
					updatePricing($card);
					   break;
	   
				    default:
					   break;
				}
   
		    });
			$('.vha-scj-carousel').on('change', '.vha-scj-band-size-select', function () {
			   const $card = $(this).closest('.vha-scj-card');
			   const dataId = $card.closest('.carosuel-main').data('id');
				switch (dataId) {
				   case "Wearble":
				    $(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).text('Select');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-select-btn`).removeClass('selected-card-btn');
					$(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).removeClass('selected-card');
					updatePricing($card);
					   break;
	   
				    default:
					   break;
				}
   
		    });
   
		   // Handle Carousel Navigation
		   $('.carosuel-main').on('click', '.vha-scj-prev-btn', function () {
			   const $carousel = $(this).closest('.carosuel-main');
			   const dataId = $carousel.data('id');
			   switch (dataId) {
			   case "mobile":{
				 const perPage = getCardsPerPage();
				 MobilecurrentIndex = Math.max(0, MobilecurrentIndex - perPage);
				 updateCarousel('mobile',MobilecurrentIndex);
				 break;
			   }
			   case "tablet":
				   {
				 const perPage = getCardsPerPage();
				 TabletcurrentIndex = Math.max(0, TabletcurrentIndex - perPage);
				 updateCarousel('tablet',TabletcurrentIndex);
				 break;
			   }
   
			   case "accessory":{
				 const perPage = getCardsPerPage();
				 AccessorycurrentIndex = Math.max(0, AccessorycurrentIndex - perPage);
				 updateCarousel('accessory',AccessorycurrentIndex);
				 break;
			   }
				   
   
			   default:
				   break;
		   }
   
			 
		   });
   
		   $('.carosuel-main').on('click', '.vha-scj-next-btn', function () {
			   const $carousel = $(this).closest('.carosuel-main');
			   const dataId = $carousel.data('id');
			   switch (dataId) {
				   case "mobile":{
					   const perPage = getCardsPerPage();
					   //const total = $(".vha-scj-card").length;    
					   const total = $(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).length;
					   MobilecurrentIndex = Math.min(MobilecurrentIndex + perPage, total - perPage);
					   updateCarousel('mobile',MobilecurrentIndex);
					   //stock status 
					  let visibleMobileCodes = getVisibleProductCodes();
					   callStockCheckWorkflow(visibleMobileCodes);
					   break;
				   }
				   case "tablet":{
					   const perPage = getCardsPerPage();
					  // const total = $(".vha-scj-card").length;
					   const total = $(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).length;
					   TabletcurrentIndex = Math.min(TabletcurrentIndex + perPage, total - perPage);
					   updateCarousel('tablet',TabletcurrentIndex);
					    //stock status 
					  let visibleMobileCodes = getVisibleProductCodes();
					   callStockCheckWorkflow(visibleMobileCodes);
					   break;
				   }
				   case "accessory":{
					   const perPage = getCardsPerPage();
					   //const total = $(".vha-scj-card").length;    
					   const total = $(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).length;
					   AccessorycurrentIndex = Math.min(AccessorycurrentIndex + perPage, total - perPage);
					   updateCarousel(dataId,AccessorycurrentIndex);
					   //stock status 
					  let visibleMobileCodes = getVisibleProductCodes();
					  callStockCheckWorkflow(visibleMobileCodes);
					   break;
				   }
				   case "Wearble":{
					   const perPage = getCardsPerPage();
					   //const total = $(".vha-scj-card").length;    
					   const total = $(`.carosuel-main[data-id="${dataId}"] .vha-scj-card`).length;
					   WearblecurrentIndex = Math.min(WearblecurrentIndex + perPage, total - perPage);
					   updateCarousel(dataId,WearblecurrentIndex);
					   //stock status 
					   let visibleMobileCodes = getVisibleProductCodes();
					  callStockCheckWorkflow(visibleMobileCodes);
					   break;
				    }
					  
   
				   default:
					   break;
			   }
   
		   });
   
		   
		   //Step1 Next Button Enable - Start*/
		   /*const input = document.getElementById('vha-scj-step1-firstNameInput');
		   const button = document.getElementById('vha-scj-step1-nextButton');
		   input.addEventListener('input', () => {
			 button.disabled = input.value.trim() === '';
		   });*/
		   
			
			const inputName = $('input[aria-label="First Name"]');
			const buttonLogin = $('button[title="Enter New Customer Details Form Applet:Next"]');
			inputName.on('input', function () {
			const inputValue = $(this).val().trim();
			 buttonLogin.prop('disabled', inputValue === '');
			 buttonLogin.addClass('nextbtnActive');
			});
			
		   //Step1 Next Button Enable - End*/
		   
		   //Step3 Coverage Check Toggle Start*/
		   const chevronimg = document.getElementById('chevronimg');
		   const mobilecoveragecheckresultdetails = document.getElementById('mobilecoveragecheckstep3result');
		   chevronimg.addEventListener('click', () => {
		   const isHidden = window.getComputedStyle(mobilecoveragecheckresultdetails).display === 'none';
		   mobilecoveragecheckresultdetails.style.display = isHidden ? 'block' : 'none';
		   });
		   
		   const fixedchevronimg = document.getElementById('fixedchevronimg');
		   const fixedcoveragecheckstep3result = document.getElementById('fixedcoveragecheckstep3result');
	   
	   
		   fixedchevronimg.addEventListener('click', () => {
			 const isHidden = window.getComputedStyle(fixedcoveragecheckstep3result).display === 'none';
			 fixedcoveragecheckstep3result.style.display = isHidden ? 'block' : 'none';
		   });
		   //Step3 Coverage Check Toggle End*/
		   $('.searchanotheraddrs').on('click', function(e){
		   $(".vha-scj-allsteps").addClass("displaynone");
		   $(".vha-scj-step2").removeClass("displaynone");
		  });
		  
		  
		   //generateVHACards(vhaDevices);
		   //updateCarousel(); // Recalculate on resize
		   
		   
		   // windiow resize track for carousels
		/*   const $carousels = $(".vha-scj-carousel-container");
   
		   if ($carousels.length && typeof ResizeObserver !== "undefined") {
			   const resizeObserver = new ResizeObserver(entries => {
				   entries.forEach(entry => {
					   const $container = $(entry.target);
					   const $parent = $container.closest(".carosuel-main");
					   const dataId = $parent.data("id"); 
					   if(dataId === 'mobile'){
					   //  MobilecurrentIndex = 0;
						  updateCarousel(dataId, MobilecurrentIndex);
					   }
					   if(dataId === 'tablet'){
						  // TabletcurrentIndex = 0;
						   updateCarousel(dataId, TabletcurrentIndex);
					   }
					    if(dataId === 'accessory'){
						  // TabletcurrentIndex = 0;
						   updateCarousel(dataId, AccessorycurrentIndex);
					   }
						 
					  
					  
				   });
			   });
   
			   $carousels.each(function () {
				   resizeObserver.observe(this);
			   });
		    }	 */																																																																																																																																																																																																																								
   
   
	   }
   
	   VHASalesCalculatorSSJViewPR.prototype.EndLife = function () {
		SiebelAppFacade.VHASalesCalculatorSSJViewPR.superclass.EndLife.apply(this, arguments);
	   }
	   
	   /*functions calls*/
			   function VHACovergaeCheck() { 
				   if (sResp != "" || sManualAddrOutput != "")
				   {
					 var gnafpid = sManualAddrOutput?.childArray?.[0]?.propArray?.gnafPid ?? sResp?.address?.id;
					var longi = sManualAddrOutput?.childArray?.[0]?.propArray?.Longitude  ?? sResp?.address?.geometry?.coordinates?.[0];
					var lati = sManualAddrOutput?.childArray?.[0]?.propArray?.Latitude ?? sResp?.address?.geometry?.coordinates?.[1];
					if (gnafpid != "" || (longi != "" && lati != ""))
					 {
						var nser = SiebelApp.S_App.GetService("VF BS Process Manager");
						var nInputs = SiebelApp.S_App.NewPropertySet();
					   nInputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service Sales Calc");
					   nInputs.SetProperty("role", "VCS");
				  
					nInputs.SetProperty("GNAFId", gnafpid);
					//nInputs.SetProperty("longitude", sResp.address.geometry.coordinates[0]); //??
					nInputs.SetProperty("longitude", longi);
					nInputs.SetProperty("latitude", lati); 
				   //SiebelApp.S_App.SetProfileAttr("Testlan", sResp.address.geometry.coordinates[0]);
				   //SiebelApp.S_App.SetProfileAttr("Testlog", sResp.address.geometry.coordinates[1]);
				   nInputs.SetProperty("Method Name", "CoverageCheck");
				   var ROups = nser.InvokeMethod("Run Process", nInputs);
				   var s4G,
				   s5G,
				   s5Gsa,
				   s5Gnsa;
				   var resultCov = [];
				   for (let i = 0; i < ROups.GetChildByType("ResultSet").childArray[1].childArray.length; i++) {
					   var curPropArr = ROups.GetChildByType("ResultSet").childArray[1].childArray[i].propArray;
					   resultCov.push(curPropArr);
				   }
				   var suiURL = SiebelApp.S_App.GetProfileAttr("URL1");
				   const arrSite = [...new Set(resultCov.map(x => x.Site))];
				   arrSite.forEach(function (item1, index) {
					   var arrNetwork = resultCov.filter(function (a) {
						   return a.Site == item1;
					   });
					   arrNetwork.forEach(function (item2, index) {
						   if (item2.PropName != "") {
							   switch (item1) {
							   case "4G/5G Home Internet":
								   switch (item2.PropName) {
								   case "is4G":
									   MapShed.FWA.f4G.is4G = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5G":
									   MapShed.FWA.f5G.is5G = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5Gsa":
									   MapShed.FWA.f5GSA.is5Gsa = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5Gnsa":
									   MapShed.FWA.f5GNSA.is5Gnsa = item2.PropValue == "true" ? true : false;
									   break;
								   };
								   break;
							   case "Mobile Coverage": //"mobilestatus":
								   switch (item2.PropName) {
								   case "is5Gindoor":
									   MapShed.Mobile.m5G.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5Goutdoor":
									   MapShed.Mobile.m5G.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5GindoorNsa":
									   MapShed.Mobile.m5GNSA.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5GoutdoorNsa":
									   MapShed.Mobile.m5GNSA.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5GindoorSa":
									   MapShed.Mobile.m5GSA.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5GoutdoorSa":
									   MapShed.Mobile.m5GSA.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4Gindoor":
									   MapShed.Mobile.m4G.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4Goutdoor":
									   MapShed.Mobile.m4G.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4GindoorNsa":
									   MapShed.Mobile.m4GNSA.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4GoutdoorNsa":
									   MapShed.Mobile.m4GNSA.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4GindoorSa":
									   MapShed.Mobile.m4GSA.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4GoutdoorSa":
									   MapShed.Mobile.m4GSA.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is3Gindoor":
									   MapShed.Mobile.m3G.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is3Goutdoor":
									   MapShed.Mobile.m3G.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   }
								   break;
							   default:
								   break;
							   }
   
   
						   }
					   });
					   var div = "";
					   switch (item1) {
					   case "4G/5G Home Internet":
						   var dVal = MapShed.FWA.f4G.is4G == true ? "4G - Available" : "4G - Not available";
						   var dCls = MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
						   s4G = MapShed.FWA.f4G.is4G;
						   // Hari 31/may/2024
						   if (s4G == false) {
							   $("#vha-sc-4G-Avl .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-4G-home-status").text(dVal);
						   } 
						   else 
						   {
							   $("#vha-sc-4G-Avl .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-4G-home-status").text(dVal);
						   }
   
						   var dVal = MapShed.FWA.f5G.is5G == true ? "5G - Available" : "5G - Not available";
						   var dCls = MapShed.FWA.f5G.is5G == true ? "ccmsGreen" : "ccmsRed";
						   s5G = MapShed.FWA.f5G.is5G;
						   if (s5G == false) 
						   {
							   $("#vha-sc-5G-NA .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-5G-home-status").text(dVal);
						   } 
						   else 
						   {
							   $("#vha-sc-5G-NA .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-5G-home-status").text(dVal);
						   }
   
						   var dVal = MapShed.FWA.f5GNSA.is5Gnsa == true ? "5G NSA - Available" : "5G NSA - Not available";
						   var dCls = MapShed.FWA.f5GNSA.is5Gnsa == true ? "ccmsGreen" : "ccmsRed";
   
						   s5Gnsa = MapShed.FWA.f5GNSA.is5Gnsa;
						   if (s5Gnsa == false)
						   {
							   $("#vha-sc-5GNSA-NA .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-5GNSA-home-status").text(dVal);
						   } 
						   else 
						   {
							   $("#vha-sc-5GNSA-NA .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-5GNSA-home-status").text(dVal);
						   }
   
						   break;
					   case "Mobile Coverage": //"mobilestatus":
						   var m = MapShed.Mobile.m3G;
						   var dVal = m.indoor == true && m.outdoor == true ? "3G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "3G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "3G - Indoor Only" : "3G - No coverage";
						   var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
						   MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
   
						   if (dCls == "ccmsRed") {
							   $("#vha-sc-3G-IO .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-3G-IO-mobile").text(dVal);
						   } else if (dCls == "ccmsOrange") {
							   $("#vha-sc-3G-IO .vha-sc-coverageStatus").addClass("CSOrange");
							   $("#vha-sc-3G-IO-mobile").text(dVal);
						   } else {
							   $("#vha-sc-3G-IO .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-3G-IO-mobile").text(dVal);
						   }
   
						   m = MapShed.Mobile.m4G;
						   var dVal = m.indoor == true && m.outdoor == true ? "4G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "4G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "4G - Indoor Only" : "4G - No coverage";
						   var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
						   MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
						   if (dCls == "ccmsRed") {
							   $("#vha-sc-4G-IO .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-4G-IO-mobile").text(dVal);
						   } else if (dCls == "ccmsOrange") {
							   $("#vha-sc-4G-IO .vha-sc-coverageStatus").addClass("CSOrange");
							   $("#vha-sc-4G-IO-mobile").text(dVal);
						   } else {
							   $("#vha-sc-4G-IO .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-4G-IO-mobile").text(dVal);
						   }
   
						   m = MapShed.Mobile.m5G;
						   var dVal = m.indoor == true && m.outdoor == true ? "5G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "5G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "5G - Indoor Only" : "5G - No coverage";
						   var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
						   MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
						   if (dCls == "ccmsRed") {
							   $("#vha-sc-5G-O .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-5G-O-mobile").text(dVal);
						   } else if (dCls == "ccmsOrange") {
							   $("#vha-sc-5G-O .vha-sc-coverageStatus").addClass("CSOrange");
							   $("#vha-sc-5G-O-mobile").text(dVal);
						   } else {
							   $("#vha-sc-5G-O .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-5G-O-mobile").text(dVal);
						   }
   
   
						   m = MapShed.Mobile.m5GNSA;
						   var dVal = m.indoor == true && m.outdoor == true ? "5G NSA - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "5G NSA - Outdoor Only" : m.indoor == true && m.outdoor == false ? "5G NSA - Indoor Only" : "5G NSA - No coverage";
						   var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
						   MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
						   if (dCls == "ccmsRed") {
							   $("#vha-sc-5GNSA-NC .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-5GNSA-NC-mobile").text(dVal);
						   } else if (dCls == "ccmsOrange") {
							   $("#vha-sc-5GNSA-NC .vha-sc-coverageStatus").addClass("CSOrange");
							   $("#vha-sc-5GNSA-NC-mobile").text(dVal);
						   } else {
							   $("#vha-sc-5GNSA-NC .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-5GNSA-NC-mobile").text(dVal);
						   }
   
   
						   break;
					   }
   
				   });
   
				   var nwkmsg = "";
				   if (s4G == true || (s5G == true || s5Gnsa == true))
					   nwkmsg = "";
				   else
					   nwkmsg = "";
				   }
				   }
			   }
			   function tssleep(ms) {
				   return new Promise(function (resolve) {
					   return setTimeout(resolve, ms);
				   });
			   }
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
   
					   var sRespUnitType = addrResp.address.properties.complex_unit_type;
					   var sRespUnitIden = addrResp.address.properties.complex_unit_identifier;
					   var sRespComType = addrResp.address.properties.complex_level_type;
					   var sStreet1 = addrResp.address.properties.street_number_1;
					   var sStreet2 = addrResp.address.properties.street_number_2;
					   var sLotIden = addrResp.address.properties.lot_identifier;
   
					   var sFloorType = (sRespUnitType !== null) ? sRespUnitType : (sRespUnitIden !== null) ? "Unit" : sRespComType;
					   var sFloor = (sRespUnitType !== null) ? sRespUnitIden : (sRespUnitIden !== null) ? sRespUnitIden : sRespComType;
					   var sStreetNum = (sStreet1 === null) ? "LOT" + sLotIden : (sStreet2 !== null) ? sStreet1 + "-" + sStreet2 : sStreet1;
   
					   sFloorType = (sFloorType != null) ? mCamelCase(sFloorType) : "";
					   sFloor = (sFloor != null) ? mCamelCase(sFloor) : "";
   
					   var sSuburb = addrResp.address.properties.locality_name;
					   var sStreetName = addrResp.address.properties.street_name;
					   var sStreetType = addrResp.address.properties.street_type_description;
					   var sBuildingName = addrResp.address.properties.site_name;
					   var sUnitType = sFloorType;
					   var sUnitNumber = sFloor;
					   var sBuildingNumber = sStreetNum;
					   var sPostcode = addrResp.address.properties.postcode;
					   var sState = addrResp.address.properties.state_territory;
					   
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
					   sIntCallInputs.SetProperty("PropSet26", "Addr");					
					   sIntCallInputs.SetProperty("PropSet10", addrResp.address.properties.street_number_1);					
					   sIntCallInputs.SetProperty("PropSet23", addrResp.address.properties.address_identifier);					
					   sIntCallInputs.SetProperty("PropSet24", addrResp.address.geometry.coordinates[1]);					
					   sIntCallInputs.SetProperty("PropSet25", addrResp.address.geometry.coordinates[0]);	

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
									//updateSelectedNBNAddress($(this).attr("data-lid"));
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
						else if(SiebelApp.S_App.GetProfileAttr("MultiaddLocID") != "")
						{
							SiebelApp.S_App.SetProfileAttr("MultiaddLocID", "");
						}	
					   $('#servClass').text(OutputsResp.childArray[0].propArray.ServiceClass);
					   $('#Techval').text(OutputsResp.childArray[0].propArray.AccessTech);
					   var CustNBN = OutputsResp.childArray[0].propArray.CustNBN;
					   var NBNwithAU = OutputsResp.childArray[0].propArray.NBNwithAU;
					   var PriorityNetwork = OutputsResp.childArray[0].propArray.PriorityNetwork;
					   var NBNAddress = OutputsResp.childArray[0].propArray.NBNAddress;
					   var NBNAvlWholeSaler = OutputsResp.childArray[0].propArray.NBNAvlWholeSaler;
					   var AccessTech = OutputsResp.childArray[0].propArray.AccessTech;
					   var LocID = OutputsResp.childArray[0].propArray.LocID;
					   var serviceabilityClass = OutputsResp.childArray[0].propArray.serviceabilityClass;
					   var serviceName = OutputsResp.childArray[0].propArray.serviceName;
					   var ServiceClass = OutputsResp.childArray[0].propArray.ServiceClass;
					   if(OutputsResp.childArray[0].propArray.CustNBN  == "Yes")
					   {
						   $('#fixedAvailable').text("Fixed connection is available");
					   }
					   else{
						   $('#fixedAvailable').text("Fixed connection is not available");
					   }
					   
					   $('#preferredwholesaler').text(OutputsResp.childArray[0].propArray.PriorityNetwork);
					   $('#serviceClass').text(OutputsResp.childArray[0].propArray.ServiceClass);//added by vinay kumar
					  // $("#fixedwirednbn").append("<span class='CSGreen' id='statusActive'></span><span class ='networkAvail'>" + PriorityNetwork + " - Available</span>");//added by vinay kumar
					  if ($('.networkAvail').length<1){
						$("#fixedwirednbn").append("<span class='CSGreen' id='statusActive'></span><span class ='networkAvail'>" + PriorityNetwork + " - Available</span>");//added by vinay kumar
						}
						else {
							$(".networkAvail").text(PriorityNetwork + " - Available");
							
						}
						if (PriorityNetwork == "") {
						   $('#fixedwirednbn').hide();
						}
						else {
						   $('#fixedwirednbn').show();
						   $('.fixednbndetails').text(PriorityNetwork + " details");
						}
					  
					   $('#internetlocationID').text(OutputsResp.childArray[0].propArray.LocID);
					   //$('#vha-sc-nbn-avail-on').text(OutputsResp.childArray[0].propArray.NBNwithAU);
					   $('#newdevelopment').text(OutputsResp.childArray[0].propArray.NBNCharge);					
					   $('#technologytype').text(OutputsResp.childArray[0].propArray.AccessTech);
					   $('#maxattainablespeed').text(OutputsResp.childArray[0].propArray.OneSQMAS);
					   $('#fibreupgrade').text(OutputsResp.childArray[0].propArray.FibreConnectServiceable);  
					   $('#fixedresultfound').addClass('displaynone');//added by vinay kumar
				   
			   } 
			   	//Jeeten: fetch customer Details and render
				function fetchCustomerDetails(AccountId){
					if(AccountId){
						var BS = SiebelApp.S_App.GetService("Workflow Process Manager");
						var Inputs = SiebelApp.S_App.NewPropertySet();
						Inputs.SetProperty("ProcessName", "VHA SSJ Sales Calculator Get Customer Details WF");
						Inputs.SetProperty("AccId", AccountId);
						var Output = BS.InvokeMethod("RunProcess", Inputs);
						var custDetails = Output.GetChildByType("ResultSet");
						if(custDetails){
							//var custHtml = `<div class="vha-cust-sec"><div class="vha-cust-details-sec"><div class="vha-cust-fields">Name</div><div class="vha-cust-f-vals">`+custDetails.propArray.Name.replace(/,/g, "")+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Active services 1</div><div class="vha-cust-f-vals">`+custDetails.propArray.ActiveServices+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Approved services</div><div class="vha-cust-f-vals">`+custDetails.propArray.ApprovedServices+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Equipment limit remaining</div><div class="vha-cust-f-vals">`+custDetails.propArray.RemainingEquipmentLimit+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Credit check status</div><div class="vha-cust-f-vals">`+custDetails.propArray.CreditCheckStatus+`</div></div></div>`;
							var custHtml = `<div class="vha-cust-sec"><div class="vha-cust-details-sec"><div class="vha-cust-fields">Name :</div><div class="vha-cust-f-vals">`+custDetails.propArray.Name.replace(/,/g, "")+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Active services :</div><div class="vha-cust-f-vals">`+custDetails.propArray.ActiveServices+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Approved services :</div><div class="vha-cust-f-vals">`+custDetails.propArray.ApprovedServices+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Equipment limit remaining :</div><div class="vha-cust-f-vals">`+custDetails.propArray.RemainingEquipmentLimit+`</div></div><div class="vha-cust-details-sec"><div class="vha-cust-fields">Credit check status :</div><div class="vha-cust-f-vals">`+custDetails.propArray.CreditCheckStatus+`</div></div></div>`;
							$('#vha-scj-cust-details').children().remove();
						   	$('#vha-scj-cust-details').append(custHtml);
						}
					}else{
						setTimeout(() => {
							var custHtml = `<div class="vha-cust-sec onlynew"><div class="vha-cust-details-sec"><div class="vha-cust-fields">Name </div><div class="vha-cust-f-vals onlynew">`+SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SSJ Parent Order Form Applet'].GetBusComp().GetFieldValue("VHA Cust First Name")+`&ensp;`+SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SSJ Parent Order Form Applet'].GetBusComp().GetFieldValue("VHA Cust Last Name")+`</div></div></div>`;
							$('#vha-scj-cust-details').children().remove();
							$('#vha-scj-cust-details').append(custHtml);
							remainingEquipmentLimitCheck = 0;
						  }, 1000); 
					}
				}
				//Render Existing Services section: Jeeten  
				function fetchExistingServices(AccountId){
					if(AccountId){

					}
				}

			    //tablets search
				function Tabletsearch() {
					let tabletmodels = Tabletdata.map((dev) => (dev.name));
					$(".vha-scj-search-tablet").autocomplete({
					   source: tabletmodels.map(function (a) {
						   return {
							   label: a,
							   value: a,
							   type: "TabletsSearch"
						   };
					   }),
					   minLength: 0,
					   select: selectAutoCompleteVal
					});
  
				}
				//reset tiles
				function ResetDeviceTiles() {
					getDeviceData();
					//reset mobiles
					filteredDevices = filterByBrands(["Apple"], "mobile");
					$('.scj-filtermobiles').prop('checked', false);
					$('.scj-filtermobiles[value="Apple"]').prop("checked", true);
					CreateDeviceTiles(filteredDevices, "mobile");
					$(`.vha-scj-mobiletab .current-plan-warning-box`).addClass("displaynone");

					//reset Tablets
					filteredTablets = filterByBrands(["Apple"], "tablet");
					$('.scj-filtertablets').prop('checked', false);
					$('.scj-filtertablets[value="Apple"]').prop("checked", true);
					CreateDeviceTiles(filteredTablets, "tablet");
					$(`.vha-scj-tablets-tab .current-plan-warning-box`).addClass("displaynone");
                     
					ActiveTab = "accessory";
					//reset Accessory
					filteredAccessories = filterByBrands(["Apple"], "accessory");
					$('.scj-filteraccessories').prop('checked', false);
					$('.scj-filteraccessories[value="Apple"]').prop("checked", true);
					CreateAccessoryTiles(filteredAccessories);
					$(`.vha-scj-accessory-tab .current-plan-warning-box`).addClass("displaynone");
					
					ActiveTab = "Wearble";
					//reset wearbles 
					filteredWearables = filterByBrands(["Apple"], "Wearble");
					$('.scj-filterwearbles').prop('checked', false);
					$('.scj-filterwearbles[value="Apple"]').prop('checked', true);
					CreateWearbleTiles(filteredWearables,"Wearble");
					$(`.vha-scj-wearbles-tab .current-plan-warning-box`).addClass("displaynone");
					
					//toggle Reset
					 $('.current-plan-toggle-switch').addClass('displaynone');
					$('.show-current-device-toggle').prop('checked', false);
					$('.exsiting-cust-curr-devInfo').removeClass('ssj-one-column ssj-two-column');
					$('.exsiting-cust-curr-devInfo').addClass('ssj-one-column');
					 $('.ssj-existing-ser-info-container').addClass('displaynone');
					 
					 ActiveTab = "mobile";
					
				}
                 function MobilesGrouping(devices) {
					  const groupedProducts = {}; // grouping objects
					   devices.forEach(item => {
						
						 const props = item.propArray; 
						 const name = props.Source_Product_Name;
						 
   
						 if (!groupedProducts[name]) {
						   groupedProducts[name] = {
							 name,
							 make: props.Make,
							 storage: new Set(),
							 colour: new Set(),
							 paymentTerm: new Set(),
							 variants: [],
							 lowestVariant: null,
							 highestVariant: null
						   };
						 }
   
						 const group = groupedProducts[name];
   
						 group.storage.add(props.Capacity);
						 group.colour.add(props.Color);
						 group.paymentTerm.add(props.Contract_Type);
						 group.variants.push(props);
   
						 const price = parseFloat(props.RRP_Inc_Gst);
						 if (!isNaN(price)) {
						   if (!group.lowestVariant || price < parseFloat(group.lowestVariant.RRP_Inc_Gst)) {
							 group.lowestVariant = props;
						   }
						   if (!group.highestVariant || price > parseFloat(group.highestVariant.RRP_Inc_Gst)) {
							 group.highestVariant = props;
						   }
						 }
					   }); 
					  
							
					    
					   //final grouping
					   DevicesGrouped = Object.values(groupedProducts).map(product => ({
							 name: product.name,
							 make: product.make,
							 storage: Array.from(product.storage),
							 colour: Array.from(product.colour),
							 paymentTerm: Array.from(product.paymentTerm),
							 variants: product.variants,
							 rrpMin: parseFloat(product.lowestVariant?.RRP_Inc_Gst || 0),
							 rrpMax: parseFloat(product.highestVariant?.RRP_Inc_Gst || 0),
							 lowestPriceConfig: {
							   price: product.lowestVariant?.RRP_Inc_Gst,
							   color: product.lowestVariant?.Color,
							   capacity: product.lowestVariant?.Capacity,
							   productCode: product.lowestVariant?.Product_Code,
							   image: product.lowestVariant?.Image,
							   recommendedColor: product.lowestVariant?.RecommendedColor
							 },
							 highestPriceConfig: {
							   price: product.highestVariant?.RRP_Inc_Gst,
							   color: product.highestVariant?.Color,
							   capacity: product.highestVariant?.Capacity,
							   productCode: product.highestVariant?.Product_Code,
							   image: product.highestVariant?.Image,
							   recommendedColor: product.highestVariant?.RecommendedColor
							 }
						    }));
				 }
				 function TabletsGrouping(devices) {
					  const groupedProducts = {}; // grouping objects
					   devices.forEach(item => {
						
						 const props = item.propArray; 
						 const name = props.Source_Product_Name;
						 
   
						 if (!groupedProducts[name]) {
						   groupedProducts[name] = {
							 name,
							 make: props.Make,
							 storage: new Set(),
							 colour: new Set(),
							 paymentTerm: new Set(),
							 variants: [],
							 lowestVariant: null,
							 highestVariant: null
						   };
						 }
   
						 const group = groupedProducts[name];
   
						 group.storage.add(props.Capacity);
						 group.colour.add(props.Color);
						 group.paymentTerm.add(props.Contract_Type);
						 group.variants.push(props);
   
						 const price = parseFloat(props.RRP_Inc_Gst);
						 if (!isNaN(price)) {
						   if (!group.lowestVariant || price < parseFloat(group.lowestVariant.RRP_Inc_Gst)) {
							 group.lowestVariant = props;
						   }
						   if (!group.highestVariant || price > parseFloat(group.highestVariant.RRP_Inc_Gst)) {
							 group.highestVariant = props;
						   }
						 }
					   }); 
					  
							
					    
					   //final grouping
					   Tabletdata = Object.values(groupedProducts).map(product => ({
							 name: product.name,
							 make: product.make,
							 storage: Array.from(product.storage),
							 colour: Array.from(product.colour),
							 paymentTerm: Array.from(product.paymentTerm),
							 variants: product.variants,
							 rrpMin: parseFloat(product.lowestVariant?.RRP_Inc_Gst || 0),
							 rrpMax: parseFloat(product.highestVariant?.RRP_Inc_Gst || 0),
							 lowestPriceConfig: {
							   price: product.lowestVariant?.RRP_Inc_Gst,
							   color: product.lowestVariant?.Color,
							   capacity: product.lowestVariant?.Capacity,
							   productCode: product.lowestVariant?.Product_Code,
							   image: product.lowestVariant?.Image,
							   recommendedColor: product.lowestVariant?.RecommendedColor
							 },
							 highestPriceConfig: {
							   price: product.highestVariant?.RRP_Inc_Gst,
							   color: product.highestVariant?.Color,
							   capacity: product.highestVariant?.Capacity,
							   productCode: product.highestVariant?.Product_Code,
							   image: product.highestVariant?.Image,
							   recommendedColor: product.highestVariant?.RecommendedColor
							 }
						    }));
				 }
			   //fetch device data
			   function getDeviceData(plancode = "") {
					   var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
					   var Inputs = SiebelApp.S_App.NewPropertySet();
					   Inputs.SetProperty("ProcessName", "VHA SSJ Product Info Process");
					   if (SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "TPG" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "iiNet")
							 Inputs.SetProperty("Type", "Connect sim only");
						else					
							 Inputs.SetProperty("Type", "Connect with device");
					   let SrcType;
					   let devicefiltertype;
					   if(plancode === ''){
						   SrcType = "All";
						   if (SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "TPG" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "iiNet")
								devicefiltertype = "UniqueSIMOPlan";
							else
								devicefiltertype = "UniqueDevice";
					   }
					   else{
						   SrcType = "Plan_Code";
						   Inputs.SetProperty("SrcVal", plancode); 
						   devicefiltertype = "Connect with device";
					   }
					   
					   Inputs.SetProperty("SrcType", SrcType); 
					   var Output = ser.InvokeMethod("RunProcess", Inputs);
					   let jsondevices = Output.childArray[0].childArray[0].childArray[0].childArray.filter((obj)=> (obj.propArray.Type === devicefiltertype));
					   let mobilesData = Output.childArray[0].childArray[0].childArray[0].childArray.filter((obj)=> (obj.propArray.Type === devicefiltertype)).filter(obj=> obj.propArray.Plan_Type === 'Voice');
					   let TabletsData = Output.childArray[0].childArray[0].childArray[0].childArray.filter((obj)=> (obj.propArray.Type === devicefiltertype)).filter(obj=> obj.propArray.Plan_Type === 'MBB');
					   //terminate if no devices after select Plan
					   if(jsondevices.length === 0){
						   //alert("No Devices matching for selected Plan");
						   $(`.vha-scj-tabs-cont-main .current-plan-warning-box`).removeClass("displaynone");
						   $(`.vha-scj-tabs-cont-main .current-plan-warning-box .warning-text`).text("No Devices matching for selected Plan.");
						   return false;
					   }
					    $(`.vha-scj-tabs-cont-main .current-plan-warning-box`).addClass("displaynone");
						MobilesGrouping(mobilesData);
						TabletsGrouping(TabletsData);
						     //console.log("dhana getting in get device");
						if(currentRLI[0].mobilePlanfirst === 'N' && plancode === ""){
								let jsonAllplans ="";
								if (SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "TPG" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "iiNet")
									 jsonAllplans = Output.childArray[0].childArray[0].childArray[0].childArray.filter((obj)=> (obj.propArray.Type ==="UniqueSIMOPlan"));
								else{
									 //jsonAllplans = Output.childArray[0].childArray[0].childArray[0].childArray.filter((obj)=> (obj.propArray.Type ==="UniquePlan"));
									 jsonAllplans = Output.childArray[0].childArray[0].childArray[0].childArray.filter((obj)=> (obj.propArray.Type ==="UniquePlan" || obj.propArray.Type ==="UniqueSIMOPlan" ));			
								}
							jsonplans = jsonAllplans.filter(obj => obj.propArray.Plan_Type === "Voice");
							jsonTabletMbbPlans = jsonAllplans.filter(obj => obj.propArray.Plan_Type === "MBB");
							displayPlans(jsonplans, "mobile");
						}
						 
							
						   //mobiles search suggestions 
						    let devicemodels = DevicesGrouped.map((dev) => (dev.name));
						    $(".vha-scj-search-mobile").autocomplete({
							   source: devicemodels.map(function (a) {
								   return {
									   label: a,
									   value: a,
									   type: "GlobalDeviceSearch"
								   };
							   }),
							   minLength: 0,
							   select: selectAutoCompleteVal
						    });
							
							
					   
			   }
			    function groupWearables() {
					var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
					var Inputs = SiebelApp.S_App.NewPropertySet();
					Inputs.SetProperty("ProcessName", "VHA SSJ Product Info Process");
					Inputs.SetProperty("Type", "Wearable");
					var Output = ser.InvokeMethod("RunProcess", Inputs);
					let Data = Output?.GetChildByType("ResultSet")?.childArray[0]?.childArray[0]?.childArray;

					const groupedWearablesMap = {};

					Data.forEach((item) => {
						const props = item.propArray;
						const name = props["VHA Product Name"];

						if (!groupedWearablesMap[name]) {
							groupedWearablesMap[name] = {
								name,
								make: props["VHA Make"],
								model: props["VHA Model"],
								colour: new Set(),
								band: new Set(),
								bandSize: new Set(),
								caseSize: new Set(),
								variants: [],
								rrpMin: null,
								rrpMax: null,
								lowestPriceConfig: null,
								highestPriceConfig: null,
							};
						}

						const group = groupedWearablesMap[name];
						group.colour.add(props["VHA SMS Colour"]);
						group.band.add(props["VHA Band"]);
						group.bandSize.add(props["VHA Band Size"]);
						group.caseSize.add(props["VHA Case Size"]);
						group.variants.push(props);

						const rrp = parseFloat(props["VHA RRP Inc GST"]);
						if (!isNaN(rrp)) {
							if (!group.rrpMin || rrp < group.rrpMin) {
								group.rrpMin = rrp;
								group.lowestPriceConfig = props;
							}
							if (!group.rrpMax || rrp > group.rrpMax) {
								group.rrpMax = rrp;
								group.highestPriceConfig = props;
							}
						}
					});

					Wearablesdata = Object.values(groupedWearablesMap).map((group) => ({
						...group,
						colour: Array.from(group.colour),
						band: Array.from(group.band),
						bandSize: Array.from(group.bandSize),
						caseSize: Array.from(group.caseSize),
					}));
					
					let Weardata = Wearablesdata.map(obj => obj.name);
					$(".vha-scj-search-Wearble").autocomplete({
						   source: Weardata.map(function (a) {
						   return {
							   label: a,
							   value: a,
							   type: "SecondaryDevice"
						   };
					   }),
					   minLength: 0,
					   select: selectAutoCompleteVal
					});
				}
				//create Wearbles tiles : Hari 
				function CreateWearbleTiles(devices, targetedtab, sortBy = "priceLow", highlightedDevice = null) {
					 const $carouselMain = $(`.carosuel-main[data-id="${ActiveTab}"]`);
					 if (devices.length === 0) {
						$carouselMain.find('.vha-scj-no-devices-box').removeClass('displaynone');
					 }
					 else{
					   $carouselMain.find('.vha-scj-no-devices-box').addClass('displaynone');
					 }
					// const $carousel = $("#vha-scj-carousel");
					const paymentTerms = ["12", "24", "36"];
					const defaultPaymentTerm = "36";
					let image = "images/custom/default-device-ssj.webp";
					const $carousel = $(`.carosuel-main[data-id="${targetedtab}"] .vha-scj-carousel`);
					$carousel.empty();
					devices.forEach((device) => {
						let config;

						switch (sortBy) {
							case "popular":
								config = device.popularConfig;
								break;

							case "LatestRelease":
								config = device.latestReleaseConfig;
								break;

							case "priceHigh":
								config = device.highestPriceConfig;
								break;

							case "priceLow":
							default:
								config = device.lowestPriceConfig;
								break;
						}

						// transform devices
						//  const config = useHighestPrice ? device.highestPriceConfig : device.lowestPriceConfig;
						let totalCost;
						let monthlyPrice;
						let recommendedColor;
						let productCode;
						let BandSize;
						let Band;
						let CaseSize;
						
						if (sortBy === "highlightcard") {
							totalCost = parseFloat(highlightedDevice?.UI__RRP__Inc__GST || 0);
							monthlyPrice = (totalCost / parseInt(defaultPaymentTerm)).toFixed(2);
							recommendedColor = highlightedDevice?.UI__Color;
							recommendedcapacity = highlightedDevice?.UI__Capacity;
							productCode = highlightedDevice?.Item__Code;
						} else {
							totalCost = parseFloat(config['VHA RRP Inc GST'] || 0);
							monthlyPrice = (totalCost / parseInt(defaultPaymentTerm)).toFixed(2);
							recommendedColor = config['VHA SMS Colour'];
							productCode = config['Product Code'];
							BandSize = config['VHA Band Size'];
							Band = config['VHA Band'];
							CaseSize = config['VHA Case Size'];
							
						}
						//append dropdown values

						const bandSizeSelect = `<select class="vha-scj-band-size-select">
						  ${device.bandSize.map((size) => `<option value="${size}" data-band-size="${size}" ${size === BandSize ? "selected" : ""}>${size}</option>`).join("")}
						</select>`;
						
						const caseSizeSelect = `<select class="vha-scj-case-size-select">
						  ${device.caseSize.map((size) => `<option value="${size}" data-case-size="${size}" ${size === CaseSize ? "selected" : ""}>${size}</option>`).join("")}
						</select>`;

						const bandSelect = `<select class="vha-scj-band-select">
						  ${device.band.map((band) => `<option value="${band}" data-band="${band}" ${band === Band ? "selected" : ""}>${band}</option>`).join("")}
						</select>`;


						// Colour dropdown with data-colour
						const colourSelect = `<select class="vha-scj-colour-select">
										 ${device.colour.map((c) => `<option value="${c}" data-colour="${c}" ${c === recommendedColor ? "selected" : ""}>${c}</option>`).join("")}
									   </select>`;

						// Payment term dropdown with data-term
						const paymentSelect = `<select class="vha-scj-payment-tr-select">
										 ${paymentTerms.map((p) => `<option value="${p}" data-term="${p}" ${p === defaultPaymentTerm ? "selected" : ""}>${p}</option>`).join("")}
									   </select>`;

						const card = `<div class="vha-scj-card" data-product-id="${productCode}">
									   <img src="${image}" alt="${device.name}" class="vha-scj-img" />
									  <hr class="vha-scj-line2">
										 <div class="vha-scj-info">
											   <div class="d-flex justify-content-between">
												 <div>
													  <span class="vha-scj-make">
														 ${device.make}<br />
														 <span class="vha-scj-model">${device.name}</span>
													   </span>
				   
													 <div class="vha-scj-stock" style="display: none;">
													   <span class="stock-check-success"></span>
													   <span class="vha-scj-stock-status">
														   ${device.stock ? "In Stock" : "Out of Stock"}
													   </span>
												   </div>
												 </div>
												 <span class="vertical-divider"></span>
												 <div class="vha-scj-price">
													   <p> 
													   From : <br />
														   <span class="device-monthly-price">$${monthlyPrice}</span> / month<br />
														   <strong class="device-total-cost">$${totalCost}</strong> min. cost over <span class="vha-scj-emi-term">${defaultPaymentTerm}</span> months
													   </p>                 
												 </div>
											   </div>
											 <div class="d-flex justify-content-between">
												 <label>Colour</label>
												   ${colourSelect}
											 </div>
											 <div class="d-flex justify-content-between">
												 <label>Case Size</label>
												   ${caseSizeSelect}
											 </div>
											 <div class="d-flex justify-content-between">
												 <label>Band</label>
												   ${bandSelect}
											 </div>
											  <div class="d-flex justify-content-between">
												 <label>Band Size</label>
													${bandSizeSelect}
											 </div>
											 <div class="d-flex justify-content-between">
												 <label>Payment term</label>
												  ${paymentSelect}
											 </div>
											 <hr class="vha-scj-line2" />								
											<!-- Quantity Selector (no label) -->
											<div class="vha-scj-quantity displaynone">
											   
												<div class="qty-box">
													<button class="qty-btn vha-scj-quantity-minus">-</button>
													<input type="text" value="1" class="qty-input" readonly />
													<button class="qty-btn vha-scj-quantity-plus">+</button>
												</div>
												
											</div>
											<hr class="vha-scj-line2" />
											<!-- Device Care Dropdown -->
											<div class="vha-scj-device-care-field d-flex justify-content-between">
												<label>Device care:</label>
												<select class="vha-scj-dropdown">
													<option value="None">None</option>
													<option value="Standard">Standard</option>
													<option value="Premium">Premium</option>
												</select>
											</div>
											<hr class="vha-scj-line2" />

											<!-- Delivery Date -->
											<div class="vha-delivery-div d-flex displaynone">Estimated delivery date: <label class="vha-scj-delivery-date"></label></div>

											<!-- Check Store Stock Button -->
											<div class="vha-scj-check-stock-field d-flex justify-content-between">
												<label>Store stock:</label>
												<button class="vha-scj-check-stock-store">Check store stock</button>
											</div>
											 <button class="vha-scj-select-btn">Select</button>
										 </div>
									 </div>
									 `;
						$carousel.append(card);
					});

					if (targetedtab === "Wearble") {
						WearblecurrentIndex = 0;
						updateCarousel(targetedtab, WearblecurrentIndex);
					}
					
					if (sortBy === "highlightcard") {
						const $carouselMain = $(`.carosuel-main[data-id="${targetedtab}"]`);
						const $card = $carouselMain.find(`.vha-scj-card[data-product-id="${highlightedDevice?.Item__Code}"]`);
						if ($card.length) {
							$carouselMain.find(".vha-scj-card").removeClass("selected-card");
							$carouselMain.find(".vha-scj-select-btn").removeClass("selected-card-btn").text("Select");
							$card.addClass("selected-card");
							$card.find(".vha-scj-select-btn").addClass("selected-card-btn").text("Selected");
						}
					}

					//call to show stock status :Hari
				    let visibleMobileCodes = getVisibleProductCodes();
					callStockCheckWorkflow(visibleMobileCodes);
				}
			   //create Accesory tiles : Hari 
			   function CreateAccessoryTiles(jsonAccessory) {
				    const $carouselMain = $(`.carosuel-main[data-id="${ActiveTab}"]`);
					 if (jsonAccessory.length === 0) {
						$carouselMain.find('.vha-scj-no-devices-box').removeClass('displaynone');
					 }
					 else{
					   $carouselMain.find('.vha-scj-no-devices-box').addClass('displaynone');
					 }
					const $carousel = $('.carosuel-main[data-id="accessory"] .vha-scj-carousel');
					$carousel.empty();
                    $('.vha-ssj-items-num').text('0');
					jsonAccessory.forEach(item => {
						const props = item.propArray;

						const Make = props.Make || "";
						const DeviceName = props["Device Name"] || "";
						const Model = props.Model || "";
						const ProductCode = props["Product Code"] || "";
						const RRP = props.RRP || "0";
						const Status = props.Status || "Inactive";
						const VHAVendor = props["VHA Vendor"] || "";
					
						const Image = "images/custom/default-device-ssj.webp";

						

						const card = `
							<div class="vha-scj-card" data-product-id="${ProductCode}">
								 <img src="${Image}" alt="${DeviceName}" class="vha-scj-img" />
								<hr class="vha-scj-line2" />
								<div class="vha-scj-info">
									 <div class="d-flex justify-content-between">
										<div>
											<span class="vha-scj-make">
												${Make}<br />
												<span class="vha-scj-model"><strong>${DeviceName}</strong></span>
											</span>

											<div class="vha-scj-stock" style="display: none;">
												<span class="stock-check-success"></span>
												<span class="vha-scj-stock-status">
													${"In Stock" ? "In Stock" : "Out of Stock"}
												</span>
											</div>
										</div>
										<span class="vertical-divider"></span>
										<div class="vha-scj-price">
											<p>
												From : <br />
												<strong class="device-total-cost">$${RRP}</strong> <br />
												RRP inc. GST
											</p>
										</div>
									</div>
									<div class="d-flex">
										<label style="width:130px"><strong>Model</strong></label>
										${Model}
									</div>
									<div class="d-flex">
										<label style="width:130px"><strong>ProductCode</strong></label>
										<label class="vha-scj-product-code">${ProductCode}</label>
									</div>
									<div class="d-flex">
										<label style="width:130px"><strong>Vendor</strong></label>
										${VHAVendor}
									</div>
									 <hr class="vha-scj-line2" />								
									<!-- Quantity Selector (no label) -->
									<div class="vha-scj-quantity displaynone">
									   
										<div class="qty-box">
											<button class="qty-btn vha-scj-quantity-minus">-</button>
											<input type="text" value="1" class="qty-input" readonly />
											<button class="qty-btn vha-scj-quantity-plus">+</button>
										</div>
										
									</div>


									
                                     <hr class="vha-scj-line2" />
									<!-- Device Care Dropdown -->
									<div class="vha-scj-device-care-field d-flex justify-content-between">
										<label>Device care:</label>
										<select class="vha-scj-dropdown">
											<option value="None">None</option>
											<option value="Standard">Standard</option>
											<option value="Premium">Premium</option>
										</select>
									</div>

									<!-- HR below device care -->
									<hr class="vha-scj-line2" />

									<!-- Delivery Date -->
									<div class="vha-delivery-div d-flex displaynone">Estimated delivery date: <label class="vha-scj-delivery-date"></label></div>

									<!-- Check Store Stock Button -->
									<div class="vha-scj-check-stock-field d-flex justify-content-between">
										<label>Store stock:</label>
										<button class="vha-scj-check-stock-store">Check store stock</button>
									</div>

									<button class="vha-scj-select-btn">Select +</button>
								</div>
							</div>
						`;

						$carousel.append(card);
					});

				   AccessorycurrentIndex = 0;
				   updateCarousel('accessory',AccessorycurrentIndex); 
				   //stock status
				    let visibleMobileCodes = getVisibleProductCodes();
					callStockCheckWorkflow(visibleMobileCodes);
				}
				
			   
			   //elastic search url
				function elasticSearchurl(param) {
				   var searchKey = "";
				   var sESEndPoint = "";
				   switch (param) {
				   case "Plan":
					   searchKey = currentRLI.SrvType == "Upgrade Service" ? "upgdvcplan" : "condvcplan";
					   break;
				   case "DevicePlan":
					   if (currentRLI.SrvType == "Upgrade Service")
						   if (currentRLI.UpgradeOfferType == "Upgrade to New Plan")
							   searchKey = "upgdvcplan";
						   else if (currentRLI.UpgradeOfferType == "Resign" || currentRLI.UpgradeOfferType == "Upgrade RRP on Instalment")
							   searchKey = "upgoutrit";
						   else
							   searchKey = "condvcplan";
					   else
						   searchKey = "condvcplan";
					   break;
				   case "Device":
					 /*  if (currentRLI.SrvType == "Upgrade Service")
						   if (currentRLI.UpgradeOfferType == "Upgrade to New Plan")
							   searchKey = "upgdvcplan";
						   else if (currentRLI.UpgradeOfferType == "Resign" || currentRLI.UpgradeOfferType == "Upgrade RRP on Instalment")
							   searchKey = "upgoutrit";
						   else
							   searchKey = "condvc";
					   else
						   searchKey = "condvc"; */
					   searchKey = "condvc";
					   break;
				   case "SimOnlyPlan":
					   if (currentRLI.UpgradeOfferType == "Upgrade to New Plan")//Vasavi added if cond for Sales Calc prod Issue#3
							   searchKey = "upgdvcplan";
					   else
					   searchKey = "consimoplan";
					   break;
				   case "SecondaryDevice":
					   searchKey = "secondarydevices";
					   break;
				   case "Accessories":
					   searchKey = "accessories";
					   break;
				   }
				   if (window.location.href.indexOf("partnerportal") > -1) {
					   sESEndPoint = window.location.href.substr(8, window.location.href.indexOf("/siebel/app/retail/enu?") - 8) + "/config";
				   } else {
					   sESEndPoint = window.location.host + "/config";
				   }
				   sESEndPoint = sESEndPoint + "/" + searchKey + "/_search";
				   return "https://" + sESEndPoint;
			   }
			   // update carousel prices 
			   function updatePricing($card) {
				     const dataId = $card.closest('.carosuel-main').data('id');
					 const modelName = $card.find(".vha-scj-model").text().trim();
					 const selectedColor = $card.find(".vha-scj-colour-select").val();
					 const selectedStorage = $card.find(".vha-scj-storage-select").val();
					 const paymentTerm = $card.find(".vha-scj-payment-tr-select").val();
                     
					 //wearbles 
					const bandsize = $card.find(".vha-scj-band-size-select").val();
				   const band = $card.find(".vha-scj-band-select").val();
				   const casesize = $card.find(".vha-scj-case-size-select").val();
					let data;
					if(dataId === 'mobile' || dataId === 'tablet'){
						
						if(dataId === 'mobile')
							data = DevicesGrouped;
						else
							data = Tabletdata;
						
						const matchedDevice = data.find(device => device.name === modelName);
						if (matchedDevice) {
						   const matchedVariant = matchedDevice.variants.find(variant =>
							 variant.Color === selectedColor && variant.Capacity === selectedStorage
						   );
						   if (matchedVariant) {
							 const totalPrice = parseFloat(matchedVariant.RRP_Inc_Gst);
							 const monthlyPrice = (totalPrice / parseInt(paymentTerm)).toFixed(2);
	   
							 $card.find(".device-monthly-price").text(`$${monthlyPrice}`);
							 $card.find(".device-total-cost").text(`$${totalPrice}`);
							 $card.attr("data-product-id", matchedVariant.Product_Code);
							 $card.find(".vha-scj-emi-term").text(`${paymentTerm}`);
						   } else {
							 // alert(`No variant found for ${selectedStorage} / ${selectedColor}`);
							   if(dataId === 'mobile'){
								   $(`.vha-scj-mobiletab .current-plan-warning-box`).removeClass("displaynone");
								   $(`.vha-scj-mobiletab .current-plan-warning-box .warning-text`).text(`No variant found for ${selectedStorage} / ${selectedColor}`);
							   }
							   if(dataId === 'tablet'){
								   $(`.vha-scj-tablets-tab .current-plan-warning-box`).removeClass("displaynone");
								   $(`.vha-scj-tablets-tab .current-plan-warning-box .warning-text`).text(`No variant found for ${selectedStorage} / ${selectedColor}`);
							   }
						   }
						} else {
							//alert(`No device found for model: ${modelName}`);
							 if(dataId === 'mobile'){
								   $(`.vha-scj-mobiletab .current-plan-warning-box`).removeClass("displaynone");
								   $(`.vha-scj-mobiletab .current-plan-warning-box .warning-text`).text(`No device found for model: ${modelName}`);
							   }
							   if(dataId === 'tablet'){
								   $(`.vha-scj-tablets-tab .current-plan-warning-box`).removeClass("displaynone");
								   $(`.vha-scj-tablets-tab .current-plan-warning-box .warning-text`).text(`No device found for model: ${modelName}`);
							   }
						}
					}
					if(dataId === 'Wearble'){
						  const matchedDevice = Wearablesdata.find((device) => device.name === modelName);
						if (matchedDevice) {
							const matchedVariant = matchedDevice.variants.find((variant) => variant['VHA SMS Colour'] === selectedColor && variant['VHA Band'] === band && variant['VHA Band Size'] === bandsize && variant['VHA Case Size'] === casesize);
							if (matchedVariant) {
								 const totalPrice = parseFloat(matchedVariant['VHA RRP Inc GST']);
								 const monthlyPrice = (totalPrice / parseInt(paymentTerm)).toFixed(2);
		   
								 $card.find(".device-monthly-price").text(`$${monthlyPrice}`);
								 $card.find(".device-total-cost").text(`$${totalPrice}`);
								 $card.attr("data-product-id", matchedVariant['Product Code']);
								  $card.find(".vha-scj-emi-term").text(`${paymentTerm}`);
							}else {
							 // alert(`No variant found try other variants`);
							 $(`.vha-scj-wearbles-tab .current-plan-warning-box`).removeClass("displaynone");
							 $(`.vha-scj-wearbles-tab .current-plan-warning-box .warning-text`).text(`No variant found try other variants`);
						    }
								 
						}else {
						   // alert(`No device found for model: ${modelName}`);
							$(`.vha-scj-wearbles-tab .current-plan-warning-box`).removeClass("displaynone");
							$(`.vha-scj-wearbles-tab .current-plan-warning-box .warning-text`).text(`No device found for model: ${modelName}`);
						}
						
					}
				}
   
		   
			   function getCardsPerPage() {
				   const width = window.innerWidth;
				   if (width < 944) return 3;
				   if (width >= 944 && width <= 1365) return 3;
				   if (width >= 1366 && width <= 1919) return 3;
				   if (width >= 1920) return 3;
			   }
			   function updateCarousel(dataId, currentIndex) {
				  // setTimeout(function () {
					 const $carouselMain = $(`.carosuel-main[data-id="${dataId}"]`);
					 const $carousel = $carouselMain.find(".vha-scj-carousel"); 
					 const $cards = $carouselMain.find(".vha-scj-card");
					 const perPage = getCardsPerPage();
					 const total = $cards.length;
					 const maxIndex = Math.max(0, total - perPage);
   
					 currentIndex = Math.min(currentIndex, maxIndex);
   
					 //update global indexes here & pagination logic
					 if(dataId === 'mobile')
					   MobilecurrentIndex = currentIndex;
					  if(dataId === 'tablet')
					   TabletcurrentIndex = currentIndex;
				     if(dataId === 'accessory')
					   AccessorycurrentIndex = currentIndex;
   
					 // Hide all cards first
					 $cards.hide();
   
					 // Show only the current set
					 for (let i = currentIndex; i < currentIndex + perPage && i < total; i++) {
					   $cards.eq(i).show();
					 }
   
					 // Update pagination text
					 const start = currentIndex + 1;
					 const end = Math.min(currentIndex + perPage, total);
					 $carouselMain.find(".vha-scj-pagination-info").text(`${start}-${end} of ${total} results`);
   
					 // Enable/disable buttons
					 $carouselMain.find(".vha-scj-prev-btn").prop("disabled", currentIndex === 0);
					 $carouselMain.find(".vha-scj-next-btn").prop("disabled", currentIndex + perPage >= total);
					 
					  if (total <= perPage) {
						   $carousel.css({
							   display: "flex",
							   justifyContent: "center",
							   alignItems: "center",
						   });
					   } else {
						   $carousel.css({
							   display: "grid",
							   gridTemplateColumns: `repeat(${perPage}, 1fr)`,
							   justifyContent: "",
							   alignItems: "",
						   });
					   }
				  // },500);
			   }
			   //filter devices
			   /*function filterByBrand(brand) {
				 const commonBrands = ["apple", "samsung", "google"];
   
				 if (brand.toLowerCase() === "other") {
				   return DevicesGrouped.filter(device =>
					 !commonBrands.includes(device.make.toLowerCase())
				   );
				 } else {
				   return DevicesGrouped.filter(device =>
					 device.make.toLowerCase() === brand.toLowerCase()
				   );
				 }
			   } */
			   
				//Json journey copy node and set journey
			   function jsonHandler(toDo, inpParams) {
				   switch (toDo) {
				   case "AddRLI":
					 /*  scJson.QuoteHeader.RootItem.filter(function (item) {
						   return item.Mode === "Edit";
					   }).length >= 1 ? alert("RootItem found in Edit mode") : copyRLI();
   
					   function copyRLI() {
						   currentRLI = JSON.parse(JSON.stringify(OriginalJSON().QuoteHeader.RootItem[0]));
						   currentRLI.Id = 'QLI-' + Number((scJson.QuoteHeader.RootItem.length) + 1);
						   currentRLI.Mode = "Edit";
						   currentRLI.Action = "Add";
						   currentRLI.SrvType = "New Service";
						   scJson.QuoteHeader.RootItem.push(currentRLI);
						   //alert("New RootItem created");
					   } */
					   
					   break;
				   case "NewJson":
					   scJson = JSON.parse(JSON.stringify(OriginalJSON()));
					   currentRLI = [];
					   currentRLI.push(scJson.QuoteHeader.RootItem[0]);
					   scJson.QuoteHeader.RootItem = [];
					  // currentRLI.Id = 'QLI-' + Number((scJson.QuoteHeader.RootItem.length - 1) + 1);
					  currentRLI[0].Id = 'QLI-' + (scJson.QuoteHeader.RootItem.length + 1);
   
					   break;
				   case "Set-NewCustomer-NewService":
					   scJson.QuoteHeader.CustomerType = "New";
					   scJson.QuoteHeader.QuoteJourney = "Connect";
					   currentRLI[0].Mode = "Edit";
					   currentRLI[0].Action = "Add";
					   currentRLI[0].SrvType = "New Service";
					   break;
				   case "Set-ExistingCustomer-NewService":
					   scJson.QuoteHeader.CustomerType = "Existing";
					   scJson.QuoteHeader.QuoteJourney = "Connect";
					   currentRLI.Mode = "Edit";
					   currentRLI.Action = "Add";
					   currentRLI.SrvType = "New Service";
					   break;
				   case "Set-ExistingCustomer-Upgrade":
					   scJson.QuoteHeader.CustomerType = "Existing";
					   scJson.QuoteHeader.QuoteJourney = "Upgrade";
					   currentRLI.Mode = "Edit";
					   currentRLI.Action = "Existing";
					   currentRLI.SrvType = "Upgrade Service";
					   currentRLI.AssetId = inpParams.AssetId;
					   currentRLI.MSISDN = inpParams.msisdn;
					   break;
				   }
			   }
   
			   function filterByBrands(brands, tab = "") {
				   if(tab === "")
					   tab = ActiveTab;
				   
				   const commonBrands = ["apple", "samsung", "google"];
                    switch (tab) {
					  case "mobile":{
							 return DevicesGrouped.filter(device => {
							   const deviceBrand = device.make.toLowerCase();
		   
							   // If "Other" is selected, include devices not in common brands
							   const includeOther = brands.includes("Other");
		   
							   // Normalize selected brands to lowercase for comparison
							   const selectedBrands = brands.map(b => b.toLowerCase());
		   
							   if (includeOther) {
								   return !commonBrands.includes(deviceBrand) || selectedBrands.includes(deviceBrand);
							   } else {
								   return selectedBrands.includes(deviceBrand);
							   }
							});
							 break;
					    }
					  case "tablet":{
						   return Tabletdata.filter(device => {
							   const deviceBrand = device.make.toLowerCase();
		   
							   // If "Other" is selected, include devices not in common brands
							   const includeOther = brands.includes("Other");
		   
							   // Normalize selected brands to lowercase for comparison
							   const selectedBrands = brands.map(b => b.toLowerCase());
		   
							   if (includeOther) {
								   return !commonBrands.includes(deviceBrand) || selectedBrands.includes(deviceBrand);
							   } else {
								   return selectedBrands.includes(deviceBrand);
							   }
							});
							 break;
					    }
					  case "accessory":{
							 return Accessoriesdata.filter(device => {
							   const deviceBrand = device.propArray.Make.toLowerCase();
		   
							   // If "Other" is selected, include devices not in common brands
							   const includeOther = brands.includes("Other");
		   
							   // Normalize selected brands to lowercase for comparison
							   const selectedBrands = brands.map(b => b.toLowerCase());
		   
							   if (includeOther) {
								   return !commonBrands.includes(deviceBrand) || selectedBrands.includes(deviceBrand);
							   } else {
								   return selectedBrands.includes(deviceBrand);
							   }
						   });
							break;
						}
					  case "Wearble":{
							 return Wearablesdata.filter(device => {
							   const deviceBrand = device.make.toLowerCase();
		   
							   // If "Other" is selected, include devices not in common brands
							   const includeOther = brands.includes("Other");
		   
							   // Normalize selected brands to lowercase for comparison
							   const selectedBrands = brands.map(b => b.toLowerCase());
		   
							   if (includeOther) {
								   return !commonBrands.includes(deviceBrand) || selectedBrands.includes(deviceBrand);
							   } else {
								   return selectedBrands.includes(deviceBrand);
							   }
							});
							 break;
					    }
						
					  default:
					   break;
					} 
				   
			    }
   
   
			   //create device tiles
			   function CreateDeviceTiles(devices, targetedtab,sortBy = "priceLow",highlightedDevice = null) { 
					// const $carousel = $("#vha-scj-carousel");
					const paymentTerms = ["12", "24", "36"];
					const defaultPaymentTerm = "36";
					 let image = "images/custom/default-device-ssj.webp";
					 //let image = "images/custom/";
					const $carousel = $(`.carosuel-main[data-id="${targetedtab}"] .vha-scj-carousel`);
					  $carousel.empty();
					   devices.forEach(device => { 
						   let config;
                           
						   switch (sortBy) {
							   case "popular":
								   config = device.popularConfig;
								   break;
   
							   case "LatestRelease":
								   config = device.latestReleaseConfig;
								   break;
   
							   case "priceHigh":
								   config = device.highestPriceConfig;
								   break;
                               
							   case "priceLow":
							   default:
								   config = device.lowestPriceConfig;
								   break;
						   }
   
						   
						  // transform devices 
					   //  const config = useHighestPrice ? device.highestPriceConfig : device.lowestPriceConfig;
                      	 let totalCost; let monthlyPrice;let recommendedColor;
						 let recommendedcapacity;let productCode;
						if(sortBy === "highlightcard"){
							  totalCost = parseFloat(highlightedDevice?.UI__RRP__Inc__GST || 0);
							  monthlyPrice = (totalCost / parseInt(defaultPaymentTerm)).toFixed(2);
							  recommendedColor = highlightedDevice?.UI__Color;
							  recommendedcapacity = highlightedDevice?.UI__Capacity;
							  productCode = highlightedDevice?.Item__Code;
						}
						else{
							  totalCost = parseFloat(config?.price || 0);
							  monthlyPrice = (totalCost / parseInt(defaultPaymentTerm)).toFixed(2);
							  recommendedColor = config?.color;
							  recommendedcapacity = config?.capacity;
							  productCode = config?.productCode;
						}
						 //append dropdown values 
						  
					   const storageSelect = `<select class="vha-scj-storage-select">
					   ${device.storage.map((s) => `<option value="${s}" data-storage="${s}" ${s === recommendedcapacity ? "selected" : ""}>${s}</option>`).join("")}
					   </select>`;
   
   
						   // Colour dropdown with data-colour
						   const colourSelect = `<select class="vha-scj-colour-select">
						 ${device.colour.map((c) => `<option value="${c}" data-colour="${c}" ${c === recommendedColor ? "selected" : ""}>${c}</option>`).join("")}
					   </select>`;
   
						   // Payment term dropdown with data-term
							const paymentSelect = `<select class="vha-scj-payment-tr-select">
						 ${paymentTerms.map((p) => `<option value="${p}" data-term="${p}" ${p === defaultPaymentTerm ? "selected" : ""}>${p}</option>`).join("")}
					   </select>`;						 
						 
						 
							/*let image = "";
								image = "images/custom/mobile_img/" + productCode.replace(/\//g, "_") + ".webp";
						function checkImageUrl(url, callback) {
								const img = new Image();
								img.onload = () => callback(false); // Image loaded successfully
								img.onerror = () => callback(true); // Image failed to load (404 or other error)
								img.src = url;
							}
							//var cardimgurl = $(card).find('img').attr('src');
							checkImageUrl(image, (is404) => {
								if (is404) {
									console.log('Image URL is 404 or not accessible.');
									image = "images/custom/mobile_img/noImage.svg";
									cardwithimage(image);
								} else {
									console.log('Image URL is valid.');
									cardwithimage(image);
								}
													 
							});
							function noImageurl(){
									//var noimage = 'images/custom/mobile_img/';
									image = "images/custom/mobile_img/noImage.svg";
								}
						 
						 
						 
						 function cardwithimage(image){	*/
						 const card = `<div class="vha-scj-card" data-product-id="${productCode}">
					   <img src="${image}" alt="${device.name}" class="vha-scj-img" />
					  <hr class="vha-scj-line2">
						 <div class="vha-scj-info">
							   <div class="d-flex justify-content-between">
								 <div>
									  <span class="vha-scj-make">
										 ${device.make}<br />
										 <span class="vha-scj-model">${device.name}</span>
									   </span>
   
									 <div class="vha-scj-stock" style="display: none;">
									   <span class="stock-check-success"></span>
									   <span class="vha-scj-stock-status">
										   ${device.stock ? "In Stock" : "Out of Stock"}
									   </span>
								   </div>
								 </div>
								 <span class="vertical-divider"></span>
								 <div class="vha-scj-price">
									   <p>
									       From : <br />
										   <span class="device-monthly-price">$${monthlyPrice}</span> / month<br />
										   <strong class="device-total-cost">$${totalCost}</strong> min. cost over <span class="vha-scj-emi-term">${defaultPaymentTerm}</span>  months
									   </p>                 
								 </div>
							   </div>
							 <div class="d-flex justify-content-between">
								 <label>Storage</label>
								   ${storageSelect}
							 </div>
							 <div class="d-flex justify-content-between">
								 <label>Colour</label>
									${colourSelect}
							 </div>
							 <div class="d-flex justify-content-between">
								 <label>Payment term</label>
								  ${paymentSelect}
							 </div>
							 <hr class="vha-scj-line2" />
							<!-- Device Care Dropdown -->
							<div class="vha-scj-device-care-field d-flex justify-content-between">
								<label>Device care:</label>
								<select class="vha-scj-dropdown">
									<option value="None">None</option>
									<option value="Standard">Standard</option>
									<option value="Premium">Premium</option>
								</select>
							</div>
							<hr class="vha-scj-line2" />

							<!-- Delivery Date -->
							<div class="vha-delivery-div d-flex displaynone">Estimated delivery date: <label class="vha-scj-delivery-date"></label></div>

							<!-- Check Store Stock Button -->
							<div class="vha-scj-check-stock-field d-flex justify-content-between">
								<label>Store stock:</label>
								<button class="vha-scj-check-stock-store">Check store stock</button>
							</div>
							 <button class="vha-scj-select-btn">Select</button>
						 </div>
					 </div>
					 `;
					  $carousel.append(card);
						//}
					  
							 /* function checkImageUrl(url, callback) {
								const img = new Image();
								img.onload = () => callback(false); // Image loaded successfully
								img.onerror = () => callback(true); // Image failed to load (404 or other error)
								img.src = url;
							}
							var cardimgurl = $(card).find('img').attr('src');
							checkImageUrl(cardimgurl, (is404) => {
								if (is404) {
									console.log('Image URL is 404 or not accessible.');
									noImageurl();
								} else {
									console.log('Image URL is valid.');
								}
								function noImageurl(){
									var noimage = 'images/custom/mobile_img/';
									$(card).find('img').attr("src",noimage+"noImage.svg");
								}
					 
							});*/
					  });
					   
					  
					 if(targetedtab === 'mobile'){
					   MobilecurrentIndex = 0;
					   updateCarousel(targetedtab,MobilecurrentIndex); 
					   const $carouselMain = $(`.carosuel-main[data-id="${targetedtab}"]`);
						 if (devices.length === 0) {
							$carouselMain.find('.vha-scj-no-devices-box').removeClass('displaynone');
						 }
						 else{
						   $carouselMain.find('.vha-scj-no-devices-box').addClass('displaynone');
						 }
					 }
					 if(targetedtab === 'tablet'){
					   TabletcurrentIndex = 0;
					   updateCarousel(targetedtab,TabletcurrentIndex); 
					   const $carouselMain = $(`.carosuel-main[data-id="${targetedtab}"]`);
						 if (devices.length === 0) {
							$carouselMain.find('.vha-scj-no-devices-box').removeClass('displaynone');
						 }
						 else{
						   $carouselMain.find('.vha-scj-no-devices-box').addClass('displaynone');
						 }
					 }
					if (sortBy === "highlightcard") {
						  const $carouselMain = $(`.carosuel-main[data-id="${targetedtab}"]`);
						  const $card = $carouselMain.find(`.vha-scj-card[data-product-id="${highlightedDevice?.Item__Code}"]`);
						  if ($card.length) {
							$carouselMain.find('.vha-scj-card').removeClass('selected-card');
							$carouselMain.find('.vha-scj-select-btn').removeClass('selected-card-btn').text('Select');
							$card.addClass('selected-card');
							$card.find('.vha-scj-select-btn').addClass('selected-card-btn').text('Selected');
						  }
					}
					 
					 //call to show stock status :Hari
					 let visibleMobileCodes = getVisibleProductCodes();
				     callStockCheckWorkflow(visibleMobileCodes);
					   
			}
				
				//sort devices 
			/*   function SortDevices(sortby) {
				   switch (sortby) {
					   case 'popular': {
						   let sortMessage = "Sorting by Most Popular";
						   console.log(sortMessage);
						   break;
					   }
				   
					   case 'LatestRelease': {
						   let sortMessage = "Sorting by Latest Release";
						   console.log(sortMessage);
						   break;
					   }
				   
					   case 'priceHigh': {
						   const sortedByPriceHigh = [...filteredDevices].sort((a, b) => b.rrpMax - a.rrpMax);
							CreateDeviceTiles(sortedByPriceHigh,"mobile",sortby);
						   break;
					   }
				   
					   case 'priceLow': {
						   const sortedByPriceLow = [...filteredDevices].sort((a, b) => a.rrpMin - b.rrpMin);
							CreateDeviceTiles(sortedByPriceLow,"mobile",sortby);
						   break;
					   }
				   
					   default: {
						   let sortMessage = "Unknown sorting option selected";
						   console.log(sortMessage);
					   }
				   }
   
			   }
			   */
			   function SortDevices(sortby) {
   
					const sortStrategies = {
						mobile: {
							priceHigh: (a, b) => b.rrpMax - a.rrpMax,
							priceLow: (a, b) => a.rrpMin - b.rrpMin
						},
						tablet: {
							priceHigh: (a, b) => b.rrpMax - a.rrpMax,
							priceLow: (a, b) => a.rrpMin - b.rrpMin
						},
						accessory: {
							priceHigh: (a, b) => b.propArray.RRP - a.propArray.RRP,
							priceLow: (a, b) => a.propArray.RRP - b.propArray.RRP
						},
						Wearble: {
							priceHigh: (a, b) => b.rrpMax - a.rrpMax,
							priceLow: (a, b) => a.rrpMin - b.rrpMin
						}
					};

					const dataSources = {
						mobile: filteredDevices,
						tablet: filteredTablets,
						accessory: filteredAccessories,
						Wearble: filteredWearables
					};

					const renderFunctions = {
						mobile: (data) => CreateDeviceTiles(data, "mobile", sortby),
						tablet: (data) => CreateDeviceTiles(data, "tablet", sortby),
						accessory: (data) => CreateAccessoryTiles(data),
						Wearble: (data) => CreateWearbleTiles(data, "Wearble", sortby)
					};

					const sortFn = sortStrategies[ActiveTab]?.[sortby];
					const data = dataSources[ActiveTab];
					const render = renderFunctions[ActiveTab];

					if (sortFn && data && render) {
						const sortedData = [...data].sort(sortFn);
						render(sortedData);
					} else {
						console.log("Unknown sorting option or tab selected");
					}
				}
			   //dhana changes for plans
			   function displayPlans(input, device) {
				   selectedPlans=[];
				   filterPlans = [...input];

				   const $container = $(`.availableplansheadingcontainer1[data-device="${device}"] .plancontainer`);
				   if(propositionInitialized === "N"){
				   populatePropositionDropdown(filterPlans, device);
					   propositionInitialized = "Y";
				   }
				   renderAllPlans(device);
				   currPage = 0;
				   showPage(currPage, device);           
			   }
			   
			   function displayPlansProductCode(productCode, device) {
				   // $(".plancontainer").empty();
				    const $container = $(`.availableplansheadingcontainer1[data-device="${device}"] .plancontainer`);
				    $container.empty();
					   var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
					   var Inputs = SiebelApp.S_App.NewPropertySet();
					   Inputs.SetProperty("ProcessName", "VHA SSJ Product Info Process");
					   if (SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "TPG" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "iiNet")
							 Inputs.SetProperty("Type", "Connect sim only");
						else					
							 Inputs.SetProperty("Type", "Connect with device");
					   Inputs.SetProperty("SrcType", "Product_Code"); 
					   Inputs.SetProperty("SrcVal", productCode);
					   var Output = ser.InvokeMethod("RunProcess", Inputs);
					   //var plans = Output.GetChild(0).GetChild(0).GetChild(0).childArray;
			            var result = Output.GetChild(0).GetChild(0).GetChild(0).childArray;
						let planType;
						if (device === "mobile") {
							planType = "Voice";
						}
						if (device === "tablet") {
							planType = "MBB";
						}
						var plans = result.filter((obj) => obj.propArray.Plan_Type === planType);
						if(plans.length === 0){
						   // alert("No plans matching for selected device.");
						   $(`.availableplansheadingcontainer1[data-device="${device}"] .current-plan-warning-box`).removeClass("displaynone");
						   // $(`.availableplansheadingcontainer1[data-device="${device}"] .current-plan-warning-box .warning-icon`).addClass("displaynone");
						   $(`.availableplansheadingcontainer1[data-device="${device}"] .current-plan-warning-box .warning-text`).text("No plans matching for selected device.");
						   return false;
					   }
				       $(`.availableplansheadingcontainer1[data-device="${device}"] .current-plan-warning-box`).addClass("displaynone");
					   // filtering productCode
					   if (productCode != null && productCode != "") {
						   filterPlans = [...plans];
						   filterDevicePlans = [...plans];
					   }
					   populatePropositionDropdown(filterPlans, device);
					   renderAllPlans(device);
					   currPage = 0;
					   showPage(currPage, device); 
			   }
   
			   function displayPlansPlanCode(planCode, device){
				   // $(".plancontainer").empty();
				   const $container = $(`.availableplansheadingcontainer1[data-device="${device}"] .plancontainer`);
				    $container.empty();
				   if (planCode != null && planCode != "")
				   {
					   filterPlans = filterPlans. filter(plan => plan.Plan_Code === planCode);
				   }
				   renderAllPlans(device);
				   currPage = 0;
				   showPage(currPage, device);
			   }
   
			   function populatePropositionDropdown(objj, device)
			   {
				   //let uniqueProps = [...new Set(objj.map(plan => plan.propArray.Proposition_Name))];
				   let uniqueProps = [...new Set(objj.map(plan => plan.propArray.Proposition_Name).filter(prop => prop && prop.trim() !== ""))];
 
					   const $dropdown = $(`.availableplansheadingcontainer1[data-device="${device}"] #Selectbypropositionmenu`);
				   $dropdown.empty().append(`<option value="" >Select</option>`);
				   uniqueProps.forEach(
					   prop => {$dropdown.append(`<option value="${prop}"> ${prop} </option>`);
				   });
			   }
   
			   function filterByProposition(proposition, device)
			   {
				   if(device === "mobile"){
					   displayPlans(jsonplans, device);
				   }
				   if(device === "tablet"){
					   displayPlans(jsonTabletMbbPlans, device);
				   }
				   const baseArray = Array.isArray(filterPlans) && filterPlans.length ? filterPlans : (Array.isArray(plans) ? plans : []);
				   if(proposition)
				   {
					   filterPlans = baseArray.filter(plan => plan.propArray.Proposition_Name === proposition);
				   }
				   else
				   {
					   filterPlans = [...baseArray];
				   }
				   currPage = 0;
				   renderAllPlans(device);
				   showPage(currPage, device);
			   }
   
			   function renderAllPlans(device) {
				   const $container = $(`.availableplansheadingcontainer1[data-device="${device}"] .plancontainer`);
				   $container.empty();
				   filterPlans.forEach((plan) => {
						let dataEntitlement = ""; let dataNumberPart = ""; dataTextPart = "";
					   if(plan.propArray.Data_Entitlement != "")
					   {
						dataEntitlement = plan.propArray.Data_Entitlement;
						dataNumberPart = dataEntitlement.match(/\d+/)[0];
						dataTextPart = dataEntitlement.match(/[a-zA-Z]+/)[0];  
					   }  
						const html = `<div data-plan-code="${plan.propArray.Plan_Code}" class="availableplansdetailContainers">
										   <div class="section1">
											   <div class="part1">
												   <div class="value1 Heading-H1-strong"><span id="datavalue">${dataNumberPart}</span></span><span id="data" class="ParagraphBody2Strong">${dataTextPart}</span></div>
											   </div>
											   <div class="part2">
												   <div class="pricedetails">
													   <!-- <div class="value1 strikethrough strikethroughpart2"><span>$</span><span id="permonthvalue">${plan.propArray.PerMonth_Value}</span></div> --!>
													   <div class="value1 Heading-H1-strong"><span id="permonthoffervalue" class="ParagraphBody2Strong">$</span><span id="data" class="Heading-H1-strong">${plan.propArray.Plan_Price_Inc_Gst}</span></div>
													   <div class="ParagraphBody2">per month</div>
												   </div>
											   </div>
										   </div>
										   <div class="plandetails">
											   <div class="heading5 plannameclass" id="palanname">${plan.propArray.Plan_Name}</div>
										   </div>
										   <div class="plandetailsitemsmain">
											   <div class="plandetailsitems">
												   <div class="plandetailsitemsrow">
													   <div><img src="images/custom/vha-scj-Success_24_24.svg" /></div> 
													   <!--<div><img src="tick.webp"/></div>-->
													   <div class="ParagraphBody2Strong">Contract type:</div>
													   <div id="nationalcalls " class="value ParagraphBody2">${plan.propArray.Contract_Type}</div>
												   </div>
												   <div class="plandetailsitemsrow">
													   <div><img src="images/custom/vha-scj-Success_24_24.svg" /></div> 
													   <!--<div><img src="tick.webp"/></div>-->
													   <div class="ParagraphBody2Strong">National calls:</div>
													   <div id="nationalcalls " class="value ParagraphBody2">${plan.propArray.National_Call}</div>
												   </div>
												   <div class="plandetailsitemsrow">
													   <div><img src="images/custom/vha-scj-Success_24_24.svg" /></div> 
													   <!--<div><img src="tick.webp"/></div>-->
													   <div class="ParagraphBody2Strong">National SMS:</div>
													   <div id="nationalsm" class="value ParagraphBody2">${plan.propArray.National_SMS}</div>
												   </div>
												   <div class="plandetailsitemsrow">
													   <div><img src="images/custom/vha-scj-Success_24_24.svg" /></div> 
													   <!--<div><img src="tick.webp"/></div>-->
													   <div class="ParagraphBody2Strong">IDD Zone 1:</div>
													   <div id="idzone1" class="value ParagraphBody2">${plan.propArray.IDD_Zone_1}</div>
												   </div>
												   <div class="plandetailsitemsrow">
													   <div><img src="images/custom/vha-scj-Success_24_24.svg" /></div> 
													   <!--<div><img src="tick.webp"/></div>-->
													   <div class="ParagraphBody2Strong">IDD Zone 2:</div>
													   <div id="idzone2" class="value ParagraphBody2">${plan.propArray.IDD_Zone_2}</div>
												   </div>
											   </div>
											   <div class ="mbPlanCounter displaynone">
												    <button class = "btn minus">-</button>
												    <input type="text" id="count" class="planCount" value = "1" readonly>
												    <button class = "btn plus">+</button>
											   </div>
											   <div class="SelectbuttonContainer">
												   <button data-plan-code="${plan.propArray.Plan_Code}" class="vha-scj-select-plan ParagraphBody1">Select</button>
											   </div>
											   <div class="criticalinfoSummary">
												   <div><a id="criticalinfolink" href="nolink" class="Paragraph-Body2-Underline">Critical Information Summary</a></div>
												   <div><a id="rateandcharges" href="nolink" class="Paragraph-Body2-Underline">Rates and Charges</a></div>
											   </div>
											   <div class="End"></div>
											   </div>`;
					   $container.append(html);
				   });
				   totalItems = filterPlans.length;
				   totalPages = Math.ceil(totalItems / itemsPerPage);
			   }
   
			   function showPage(page, device) {

				    const $container = $(`.availableplansheadingcontainer1[data-device="${device}"] .plancontainer`);
				   const $plans = $container.find(".availableplansdetailContainers");
				   
				   const start = page * itemsPerPage;
				   const end = Math.min(start + itemsPerPage, totalItems);
   
				   currPage = page;
				   // Show Pagination Info
				   const displayStart = start + 1;
				   const displayEnd = end;
				   $(`.availableplansheadingcontainer1[data-device="${device}"] .pagination-info`).text(`${displayStart}-${displayEnd} out of ${totalItems} results`);

				   $plans.hide();
				   $plans.slice(start, end).show();
   
				   //Disable buttons
				   /*$(".carousel-nav-prev").prop("disabled", page === 0);
				   $(".carousel-nav-next").prop("disabled", page >= totalPages - 1);*/
				   $(`.availableplansheadingcontainer1[data-device="${device}"] .carousel-nav-prev`).prop("disabled", page === 0);
				   $(`.availableplansheadingcontainer1[data-device="${device}"] .carousel-nav-next`).prop("disabled", page >= totalPages - 1);
			   }
		  
		  function checkQliNum(){
				for (let i = 0; i < currentRLI.length; i++) {
					let rli = currentRLI[i];
					rli.Id = `QLI-${Math.floor(1000 + Math.random() * 9000)}`;
				}
			}

			function canAddMorePlans() {
				   let existingServicesCount = scJson.QuoteHeader.ExistingCustDtls.ActiveServices;
				   let newServicesCount = scJson.QuoteHeader.RootItem.length;
				   return (existingServicesCount + newServicesCount + selectedPlans.length) < 10;
		       }

			function createPlanObj(matchedplanCodeObj) {
				   return {
					    Type: "Plan",
						Action: "Add",
						Name: matchedplanCodeObj.Plan_Name,
						Code: matchedplanCodeObj.Plan_Code,
						ProdIntegrationId: matchedplanCodeObj.Product_Code,
						Price: matchedplanCodeObj.Plan_Price_Inc_Gst,
					    PaymentTerm: matchedplanCodeObj.Contract_Type,
						VoucherAmount: matchedplanCodeObj.Voucher_Amount,
						Descr: "",
				   };
				}

				function resetPlansTiles(){
					checkQliNum();
					//hide show current plan toggle
					$(`.availableplansheadingcontainer1 .current-plan`).addClass("displaynone");
					$(`.availableplansheadingcontainer1 .availableplans .current-plancontainer`).addClass("displaynone");
					
					//clear maintab validation
					$(`.vha-scj-tabs-cont-main .current-plan-warning-box`).addClass("displaynone");
					
					// reset mobilePlans
					const $mobilecontainer = $(`.availableplansheadingcontainer1[data-device="mobile"] .plancontainer`);
					$mobilecontainer.empty();
					displayPlans(jsonplans, "mobile");
					$(`.availableplansheadingcontainer1[data-device="mobile"] .current-plan-warning-box`).addClass("displaynone");
					// $(`.availableplansheadingcontainer1[data-device="mobile"] .current-plan-warning-box .warning-icon`).removeClass("displaynone");

					//reset TabletsPlans
					const $tabletmbbcontainer = $(`.availableplansheadingcontainer1[data-device="tablet"] .plancontainer`);
					$tabletmbbcontainer.empty();
					displayPlans(jsonTabletMbbPlans, "tablet");
					$(`.availableplansheadingcontainer1[data-device="tablet"] .current-plan-warning-box`).addClass("displaynone");
					//$(`.availableplansheadingcontainer1[data-device="tablet"] .current-plan-warning-box .warning-icon`).removeClass("displaynone");
		       
					//hide show current plan toggle
					$(`.availableplansheadingcontainer1 .current-plan`).addClass("displaynone");
					$(`.availableplansheadingcontainer1 .current-plan .show-current-plan-toggle`).prop("checked", false);
					$(`.availableplansheadingcontainer1 .availableplans .current-plancontainer`).addClass("displaynone");
					
			   }

		       function  formatDateRange(start, end) {
				   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				   const format = d =>{
					   let [ month, day,  year] = d.split("/");
						   return `${day} ${months[+month - 1]} ${year}`;
				   };
				   return `${format(start)} - ${format(end)}`;
		       }

		       function cartValidations() {
			    // if ($(".cart-container").length > 10) {
			    //     alert("Adding more than 10 services into a quote is not allowed.");
			    // }
				   let errMsg;
			    if (currentRLI[0].DeviceItem.length === 0 && currentRLI[0].TabletItem.length === 0 && currentRLI[0].PlanItem.Name === undefined) {
			        $(`.vha-scj-tabs-cont-main .current-plan-warning-box`).removeClass("displaynone");
			        errMsg = $(`.vha-scj-tabs-cont-main .current-plan-warning-box .warning-text`).text("Please select plan or device.");
			        return errMsg;
			    }
			    if ((currentRLI[0].DeviceItem.length > 0 || currentRLI[0].TabletItem.length > 0) && currentRLI[0].PlanItem.Name === undefined) {
			        $(`.vha-scj-tabs-cont-main .current-plan-warning-box`).removeClass("displaynone");
			        errMsg = $(`.vha-scj-tabs-cont-main .current-plan-warning-box .warning-text`).text("Please select plan.");
			        return errMsg;
			    }
				$(`.vha-scj-tabs-cont-main .current-plan-warning-box`).addClass("displaynone");
			}
		  
		   function validationMsgs(status, exstcustmsisdn) {
                //dhana
                let mobileCost = 0;
                let tabletCost = 0;
                let accessoryCost = 0;
                let wearableCost = 0;
                let totalCostOfDevices = 0;
                let wearables = [];
			    let updRes;
				//Clear errors: Jeet
				$(`.vha-scj-tabs-cont-main .validation-warning-box`).addClass("displaynone");
                //Visa Expiry Check
                var validAcc = SiebelApp.S_App.GetService("VF BS Process Manager");
                var validationIn = SiebelApp.S_App.NewPropertySet();
                var validationOut = SiebelApp.S_App.NewPropertySet();
                validationIn.SetProperty("Service Name", "VHA Store Pickup Reservation Service");
                validationIn.SetProperty("CustId", SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SSJ Parent Order Form Applet"].GetBusComp().GetFieldValue("Account Id"));
                if (currentRLI[0].DeviceItem?.length > 0) {
                    validationIn.SetProperty("MobileTerm", currentRLI[0].DeviceItem[0].DeviceTerm);
                    mobileCost = parseFloat(currentRLI[0].DeviceItem[0].UI__RRP__Inc__GST) || 0;
                }
                if (currentRLI[0].TabletItem?.length > 0) {
                    validationIn.SetProperty("TabletTerm", currentRLI[0].TabletItem[0].DeviceTerm);
                    tabletCost = parseFloat(currentRLI[0].TabletItem[0].UI__RRP__Inc__GST) || 0;
                }
                validationIn.SetProperty("PlanTerm", currentRLI[0].PlanItem.PaymentTerm);
                if (currentRLI[0].SecondaryItem?.length > 0) {
                   // wearables = currentRLI[0].SecondaryItem.map((obj) => obj["Term"]);
                    wearables = currentRLI[0].SecondaryItem.map((obj) => Number(obj["Term"]));
					validationIn.SetProperty("WearablesTerm", wearables);
                    wearableCost = parseFloat((currentRLI[0]?.SecondaryItem || []).map((a) => +a.RRP__Inc__GST || 0).reduce((a, b) => a + b, 0)) || 0;
                }
                if (currentRLI[0].AccItem?.length > 0) {
                    validationIn.SetProperty("AccessoriesTerm", " ");
                    accessoryCost = parseFloat((currentRLI[0]?.AccItem || []).map((a) => +a.Accessory__RRP__Inc__GST || 0).reduce((a, b) => a + b, 0)) || 0;
                }
                if (status === "addToCart") {
                    validationIn.SetProperty("TransactionType", "Connect");
					validationIn.SetProperty("MSISDN", " ");
                }
                if (status === "updateCart") {
                    validationIn.SetProperty("TransactionType", "UPGRADE");
					validationIn.SetProperty("MSISDN", exstcustmsisdn);
                }
                validationIn.SetProperty("Method Name", "GetVisaExpiryDate");
                validationOut = validAcc.InvokeMethod("Run Process", validationIn);
                //let errMsg = validationOut.childArray[0].propArray["Error Message"];
                let errMsg = validationOut.childArray[0].propArray["Error Message"]?.split(";")[0].trim();
				if (errMsg) {
                    $(`.vha-scj-tabs-cont-main .validation-warning-box`).removeClass("displaynone");
                    $(`.vha-scj-tabs-cont-main .validation-warning-box .warning-text`).text(`${errMsg}`);
                    return false;
                }

                //Equipment limit check
                totalCostOfDevices = mobileCost + tabletCost + accessoryCost + wearableCost;
                // totalCostOfDevices = 16000;
			   totalCostOfDevices =parseFloat(totalCostOfDevices).toFixed(2);
                if (totalCostOfDevices > updEquipmentLimitCheck) {
					updRes = (updEquipmentLimitCheck < 0) ? 0: updEquipmentLimitCheck;
                    prepaymentAmount = totalCostOfDevices - updRes;
					let value = ((parseFloat(remainingEquipmentLimitCheck)) - (updRes)) + parseFloat(totalCostOfDevices);
                    $(`.vha-scj-tabs-cont-main .validation-warning-box`).removeClass("displaynone");
                    $(`.vha-scj-tabs-cont-main .validation-warning-box .warning-text`).text(
                        `The Total Contract Amount Value $${remainingEquipmentLimitCheck} exceeds equipment limit: $${value} by $${prepaymentAmount}. Kindly add device/accessory plan within the approved limit or Check for prepayment option if available.`
                    );
                }

                //Apple Voucher Amount Check
                let planVoucherAmount = parseFloat(currentRLI[0].PlanItem.VoucherAmount) || 0;
                let diffAmountVoucherEquipment = planVoucherAmount - remainingEquipmentLimitCheck;
				   diffAmountVoucherEquipment = parseFloat(diffAmountVoucherEquipment).toFixed(2);
                if (diffAmountVoucherEquipment > remainingEquipmentLimitCheck) {
                    $(`.vha-scj-tabs-cont-main .validation-warning-box`).removeClass("displaynone");
                    $(`.vha-scj-tabs-cont-main .validation-warning-box .warning-text`).text(
                        `VFErrorCode#99108 The Total Contract/Voucher Amount value (${planVoucherAmount}) exceeds equipment limit : (${diffAmountVoucherEquipment}) by (${remainingEquipmentLimitCheck}). Kindly add device/Accessory/Voucher plan within the approved limit (or) Check for Prepayment Option If available.(SBL-EXL-00151)`
                    );
                    return false;
                }
            }

			function updatedEquipmentLimitCheck(status, updatecartdata) {
                let updatedRemainingEquipmentLimitCheck = 0;
                if (status === "addToCart" || status === "removeService" || status === "removeNewServices") {
                    let newServicesHeader = scJson.QuoteHeader.RootItem?.[0];
                    if (scJson.QuoteHeader.RootItem?.length > 0) {
                        let newServicesMobileCost = 0;
                        let newServicesTabletCost = 0;
                        let newServicesWearableCost = 0;
                        let newServicesAccessoryCost = 0;
                        if (newServicesHeader.DeviceItem.length > 0) {
                            newServicesMobileCost = parseFloat(newServicesHeader.DeviceItem[0].UI__RRP__Inc__GST) || 0;
                        }
                        if (newServicesHeader.TabletItem.length > 0) {
                            newServicesTabletCost = parseFloat(newServicesHeader.TabletItem[0].UI__RRP__Inc__GST) || 0;
                        }
                        if (newServicesHeader.SecondaryItem.length > 0) {
                            newServicesWearableCost = parseFloat((newServicesHeader?.SecondaryItem || []).map((a) => +a.RRP__Inc__GST || 0).reduce((a, b) => a + b, 0)) || 0;
                        }
                        if (newServicesHeader.AccItem.length > 0) {
                            newServicesAccessoryCost = parseFloat((newServicesHeader?.AccItem || []).map((a) => +a.Accessory__RRP__Inc__GST || 0).reduce((a, b) => a + b, 0)) || 0;
                        }
                        let totalNewServices = newServicesMobileCost + newServicesTabletCost + newServicesWearableCost + newServicesAccessoryCost;
                        //console.log(newServicesMobileCost + newServicesTabletCost, newServicesWearableCost, newServicesAccessoryCost, totalNewServices);
                        updatedRemainingEquipmentLimitCheck = parseFloat(updEquipmentLimitCheck - totalNewServices) || 0;
						//updatedRemainingEquipmentLimitCheck = (updatedRemainingEquipmentLimitCheck < 0) ? 0: updatedRemainingEquipmentLimitCheck;
                    }
                }
                if (status === "updateCart") {
                    //let exstServicesHeader = scJson.QuoteHeader.update?.[0];
                    if (updatecartdata) {
                        let exstServicesMobileCost = 0;
                        let exstServicesTabletCost = 0;
                        let exstServicesWearableCost = 0;
                        let exstServicesAccessoryCost = 0;
                        if (updatecartdata.DeviceItem.length > 0) {
                            exstServicesMobileCost = parseFloat(updatecartdata.DeviceItem[0].UI__RRP__Inc__GST) || 0;
                        }
                        if (updatecartdata.TabletItem.length > 0) {
                            exstServicesTabletCost = parseFloat(updatecartdata.TabletItem[0].UI__RRP__Inc__GST) || 0;
                        }
                        if (updatecartdata.SecondaryItem.length > 0) {
                            exstServicesWearableCost = parseFloat((updatecartdata?.SecondaryItem || []).map((a) => +a.RRP__Inc__GST || 0).reduce((a, b) => a + b, 0)) || 0;
                        }
                        if (updatecartdata.AccItem.length > 0) {
                            exstServicesAccessoryCost = parseFloat((updatecartdata?.AccItem || []).map((a) => +a.Accessory__RRP__Inc__GST || 0).reduce((a, b) => a + b, 0)) || 0;
                        }
                        let totalExstServices = exstServicesMobileCost + exstServicesTabletCost + exstServicesWearableCost + exstServicesAccessoryCost;
                        //console.log(exstServicesMobileCost, exstServicesTabletCost, exstServicesWearableCost, exstServicesAccessoryCost, totalExstServices);
                        updatedRemainingEquipmentLimitCheck = parseFloat(updEquipmentLimitCheck - totalExstServices) || 0;
						if( oneTimeCharge > 0){
							updatedRemainingEquipmentLimitCheck = updatedRemainingEquipmentLimitCheck + oneTimeCharge;
						}
						//updatedRemainingEquipmentLimitCheck = (updatedRemainingEquipmentLimitCheck < 0) ? 0: updatedRemainingEquipmentLimitCheck;
                    }
                }
                return updatedRemainingEquipmentLimitCheck;
            }

		  
			   //stock status functions  : Hari
			   function callStockCheckWorkflow(productCodes) {
					new Promise(function (resolve, reject) {
						setTimeout(() => {
							try {
								const BS = SiebelApp.S_App.GetService("Workflow Process Manager");
								const Inputs = SiebelApp.S_App.NewPropertySet();
								Inputs.SetProperty("ProcessName", "VHA SSJ Stock Check Process");							
								Inputs.SetProperty("OrdFunction", "Acquisition");
								let postcode = "";
								if(ActiveTab === "mobile"){
									let fullValue = $('#vha-scj-shipp-postal-code-mobile').val();
									postcode = (fullValue || "").replace(/\D/g, '');
								}
								else if(ActiveTab === "tablet"){
									let fullValue = $('#vha-scj-shipp-postal-code-tablet').val();
									postcode = (fullValue || "").replace(/\D/g, '');
								}
								else if(ActiveTab === "accessory"){
									let fullValue = $('#vha-scj-shipp-postal-code-accessory').val();
									postcode = (fullValue || "").replace(/\D/g, '');
								}
								else{
									let fullValue = $('#vha-scj-shipp-postal-code-Wearble').val();
									postcode = (fullValue || "").replace(/\D/g, '');
								}
								
								Inputs.SetProperty("PostCode", postcode);
								Inputs.SetProperty("QuoteId", "");
                                
								let srcType = "";
								let srcVal = "";
								let tabval = "";
								 // Determine SrcType and SrcVal based on tab
								switch (ActiveTab) {
									case "mobile":
									case "tablet":
									    tabval = 0;
										srcType = "VHA SSJ Product Info IO";
										srcVal = `[VHA SSJ Product Info.Type] = 'UniqueDevice' AND (${productCodes.map(code =>
											`[VHA SSJ Product Info.Product_Code] = '${code}'`).join(" OR ")})`;
										break;

									case "Wearble":
									    tabval = 1;
										srcType = "VHASSJWearableIO";
										srcVal = productCodes.map(code =>
											`[VHA Secondary Device Matrix UI BC.Product Code] = '${code}'`).join(" OR ");
										break;

									case "accessory":
										tabval = 1;
										srcType = "VHASSJAccessoryMatrixIO";
										srcVal = productCodes.map(code =>
											`[VHA Accessory Matrix BC.Product Code] = '${code}'`).join(" OR ");
										break;

									default:
										break;
								}
								 Inputs.SetProperty("SrcType", srcType);
								 Inputs.SetProperty("SrcVal", srcVal);
								const Output = BS.InvokeMethod("RunProcess", Inputs);
								const resultSet = Output?.GetChildByType("ResultSet");
								if(resultSet.propArray.BWErrCode != 0){
									//alert("stock check failed");
									$(`.vha-scj-tabs-cont-main .current-plan-warning-box`).removeClass("displaynone");
									$(`.vha-scj-tabs-cont-main .current-plan-warning-box .warning-text`).text("Stock availability and/or Estimated Shipment Date (ESD) check failed. Please check stock and/or ESD manually and raise a Siebel Support ticket if you continue to receive this error.");
								}
								$(`.vha-scj-tabs-cont-main .current-plan-warning-box`).addClass("displaynone");
								const outSiebMsg = resultSet?.GetChildByType("OutSiebMsg");
								
									
								const finalOutput = outSiebMsg?.childArray?.[0]?.childArray?.[0]?.childArray?.[tabval]?.childArray;

								resolve(finalOutput);
							} catch (e) {
								reject(e);
							}
						}, 0);
					}).then(function (output) {
						//console.log("Workflow executed successfully:", output);
						let stockMap = {};
						output.forEach(obj =>{
							stockMap[obj.propArray.SKU] = obj.propArray.StockAvailability;
						});
						let deliverydateMap = {};
						output.forEach(obj =>{
							deliverydateMap[obj.propArray.SKU] = obj.propArray.EstDeliveryDt;
						});
						updateVisibleStockText(stockMap,deliverydateMap);
						
						
					}).catch(function (error) {
						//console.error("Workflow execution failed:", error);
					});
				}
				function getVisibleProductCodes() {
					const productCodes = [];
					$(`.carosuel-main[data-id="${ActiveTab}"] .vha-scj-card`).each(function () {
						if ($(this).is(":visible")) {
							const productId = $(this).attr("data-product-id");
							if (productId) {
								productCodes.push(productId);
							}
						}
					});
					return productCodes;
				}
                    
				function updateVisibleStockText(stockMap,deliverydateMap) {
					
				  $(`.carosuel-main[data-id="${ActiveTab}"] .vha-scj-card:visible`).each(function () {
					const $card = $(this);
					const productId = $card.data('product-id');
					const status = stockMap[productId];
                    const deliverydate = deliverydateMap[productId];
					
					if (!status) return;
					const $stockContainer = $card.find('.vha-scj-stock');
					const $statusEl = $card.find('.vha-scj-stock-status');
					let statusText = '';
                     $card.find('.vha-scj-delivery-date').text(deliverydate);
					switch (status) {
					  case 'Available':
						statusText = 'In Stock';
						break;
					  case 'Non-Orderable':
						statusText = 'Out of Stock';
						break;
					  case 'Back Order':
						statusText = 'Back-order';
						break;
					  case 'Low Stock':
						statusText = 'Low Stock';
						break;
					  default:
						statusText = '';
					}

					$statusEl.text(statusText);
					$stockContainer.show();
				  });
				}
				// stock status completed: Hari
				
				function checkstocktable() {
						let fullValue = $('.vha-scj-check-str-popup-input').val();
						let postcode = (fullValue || "").replace(/\D/g, '');
						
						TheApplication().SetProfileAttr("SKUCd",productCode); 
						TheApplication().SetProfileAttr("StorePostCd",postcode); 
						
						ser = SiebelApp.S_App.GetService("VF BS Process Manager");
						psInp = SiebelApp.S_App.NewPropertySet();
						psInp.SetProperty("Service Name", "VHA Search Store VBC BS");
						psInp.SetProperty("Business Component Name", "VHA Search Store VBC");
						psInp.SetProperty("Method Name", "Query");
						Output = ser.InvokeMethod("Run Process", psInp);
						if(Output.GetChildByType('ResultSet')){
							checkstoredata = Output.GetChildByType('ResultSet').childArray;
							 renderTable(1);
						}
						
						
				}
				function renderTable(page = 1) {
						VhaCheckStore_Cur_Page = page;
						const start = (page - 1) * VhaCheckStore_Per_Page;
						const end = start + VhaCheckStore_Per_Page;
						const pageData = checkstoredata.slice(start, end);

						const $modal = $('.vha-scj-check-str-popup-overlay');
						const $tbody = $modal.find('.vha-scj-check-str-popup-table tbody');
						$tbody.empty();

						pageData.forEach(obj => {
						  let row = obj.propArray;
						  $tbody.append(`
							<tr>
							  <td>${row['Store Business Name']}</td>
							  <td>${row['Store Code']}</td>
							  <td>${row['Device Availability']}</td>
							  <td tabindex="0" class="vha-scj-check-str-popup-hours" title="${row['Trading Hours']}">${row['Trading Hours']}</td>
							  <td>${row['Store Address']}</td>
							</tr>
						  `);
						});

						$modal.find('.vha-scj-check-str-popup-table').show();
						$modal.find('.vha-scj-check-str-popup-pagination-controls').show();

						const total = checkstoredata.length;
						const showingStart = start + 1;
						const showingEnd = Math.min(end, total);

						$modal.find('.vha-scj-check-str-popup-pagination-info').text(`${showingStart}-${showingEnd} of ${total} items`);
						$modal.find('.vha-scj-check-str-popup-prev').prop('disabled', page === 1);
						$modal.find('.vha-scj-check-str-popup-next').prop('disabled', end >= total);
				}
				
				
				
				var selectAutoCompleteVal = function (e, u) {
				   //e.preventDefault();
				   $(this).val(u.item.value);
				   switch (u.item.type) {
				   case "data":
					   //var sDataAddOnObj = scJson.QuoteHeader.RootItem.PackItem;
					   var sDataAddOnObj = currentRLI.PackItem.filter(function (item) {
						   return item.UIType == "Data";
					   });
					   var tempLength = sDataAddOnObj.length;
					   if (tempLength <= 0)
						   sDataAddOnObj = {};
					   else
						   sDataAddOnObj = sDataAddOnObj[0];
					   if (u.item.dollar == undefined) {
						   u.item.dollar = 0;
					   }
					   sDataAddOnObj.Action = "Add";
					   sDataAddOnObj.Type = "Addon";
					   sDataAddOnObj.UIType = "Data";
					   sDataAddOnObj.Name = u.item.value;
					   sDataAddOnObj.ProdIntegrationId = "";
					   sDataAddOnObj.Price = u.item.dollar;
					   sDataAddOnObj.UIdivid = $('.vha-sc-dataaddons-main ul input[type="radio"]:checked').attr('id');
					   if (tempLength <= 0)
						   currentRLI.PackItem.push(sDataAddOnObj);
   
					   var DataPrice = sDataAddOnObj.Price;
					   if (DataPrice == "") {
						   DataPrice = "0.00";
					   }
					   $(".vha-sc-cart-datacost").text("$" + DataPrice);
					   //updateSessionDetails(DataPrice, "DataAddOns", "Add");
					   //totalIndicativeCostCalc();
					   break;
					   //vasavi added for PKE
				   case "iddTerm":
					   var sIddAddOnObj = currentRLI.PackItem.filter(function (item) {
						   return item.UIType == "IDD";
					   });
					   if (sIddAddOnObj.length > 0) {
						   sIddAddOnObj[0].Period = u.item.value;
					   };
					   break;
				   case "idd":
					   var sIddAddOnObj = currentRLI.PackItem.filter(function (item) {
						   return item.UIType == "IDD";
					   });
					   var tempLength = sIddAddOnObj.length;
					   if (tempLength <= 0)
						   sIddAddOnObj = {};
					   else
						   sIddAddOnObj = sIddAddOnObj[0];
					   if (u.item.dollar == undefined) {
						   u.item.dollar = 0;
					   }
					   sIddAddOnObj.Action = "Add"
						   sIddAddOnObj.Type = "Addon";
					   sIddAddOnObj.UIType = "IDD";
					   sIddAddOnObj.Name = u.item.value;
					   sIddAddOnObj.ProdIntegrationId = "";
					   sIddAddOnObj.Price = u.item.dollar;
					   sIddAddOnObj.UIdivid = $('.vha-sc-iddaddons-main ul input[type="radio"]:checked').attr('id');
					   if (tempLength <= 0)
						   currentRLI.PackItem.push(sIddAddOnObj);
   
					   var IddPrice = sIddAddOnObj.Price;
					   if (IddPrice == "") {
						   IddPrice = "0.00";
					   }
					   $(".vha-sc-cart-iddcost").text("$" + IddPrice);
					   //updateSessionDetails(IddPrice, "IddAddOns", "Add");
					   //totalIndicativeCostCalc();
					   break;
				   case "GlobalDeviceSearch":
					   if ($(this).val() != "") {
							$('.scj-filtermobiles').prop('checked', false);
							let searcheddevice = DevicesGrouped.filter(device =>
							   device.name.toLowerCase() === $(this).val().toLowerCase()
							);
							CreateDeviceTiles(searcheddevice,"mobile");
					   }
					   break;
					case "TabletsSearch":
					   if ($(this).val() != "") {
							$('.scj-filtertablets').prop('checked', false);
							let searcheddevice = Tabletdata.filter(device =>
							   device.name.toLowerCase() === $(this).val().toLowerCase()
							);
							CreateDeviceTiles(searcheddevice,"tablet");
					   }
					   break;
				   case "GlobalPlanSearch":
					   pegaflag = "N";
					   selectedplanTxt = "Others";
					   //$("#vha-sc-nbaofferbtn").removeClass("VHASCDisplayNone");
					   $(".vhascplantype").removeClass("applet-button-active");
					   var planFilter = [];
					   if ($(this).val() != "") {
						   for (i = 0; i < sRsnBasedplnresp.length; i++) {
							   if (sRsnBasedplnresp[i]._source.Plan_Name.toLowerCase() == $(this).val().toLowerCase()) {
								   planFilter.push(sRsnBasedplnresp[i]);
								   var tsPlan = tsPlantype.filter(function (a) {
									   return sRsnBasedplnresp[i]._source.Plan_Type == a.SiebelName;
								   });
								   if (tsPlan.length) {
									   $("#" + tsPlan[0]["Id"]).addClass("applet-button-active");
								   }
							   }
						   }
					   } else {
						   planFilter = sRsnBasedplnresp;
					   }
					   createPlanTiles(planFilter);
					   break;
				   case "SecondaryDevice":
					    if ($(this).val() != "") {
							
							$('.scj-filterwearbles').prop('checked', false);
							let searcheddevice = Wearablesdata.filter(device =>
							   device.name.toLowerCase() === $(this).val().toLowerCase()
							);
							CreateWearbleTiles(searcheddevice,"Wearble");
					    }						 
					   break;
				   case "Secondary Device Varient":
					   $('#vha-sc-wear-add-btn').attr("Productcd", u.item.prodcd);
					   break;
				   case "Accessory":
					  if ($(this).val() != "") {
							$('.scj-filteraccessories').prop('checked', false);
							let searcheddevice = Accessoriesdata.filter(obj =>
							   obj.propArray["Device Name"].toLowerCase() === $(this).val().toLowerCase()
							);
							CreateAccessoryTiles(searcheddevice);
					   }
					   break;
				   case "AccessoryName": //jan 23
						$('#vha-sc-acces-add-btn').attr("Productcd", u.item.prodcd);
					   break;
				   case "Device Care":
					   var currectDvc = currentRLI.DeviceItem.filter(function (item) {
						   return item.Action == "Add";
					   });
					   if (currectDvc.length > 0) {
						   currectDvc[0].Insurance = u.item.value;
						   currectDvc[0].InsPri = "15.00";
						   currentRLI.DeviceIns = "15.00";
					   }
					   $('#vha-sc-cart-dvccarecost').text("$15.00");
					   break;
					   /*case "SD Device Care":
					   var currectSDDvc = currentRLI.SDItem.filter(function(item){
					   return item.Action == "Add";
					   });
					   if(currectSDDvc.length>0){
					   currectSDDvc[0].Insurance = u.item.value;
					   currectSDDvc[0].InsPri = 10.00;
					   }
					   break;*/
				   }
			   };
			   
			    //Marvin: Created to save Json/DOM in Database
			   function fnSaveJsonDomToDB(ObjId,Type,ObjMsg)
			   {
				   var wfBSS = SiebelApp.S_App.GetService("Workflow Process Manager");
					var wfInput = SiebelApp.S_App.NewPropertySet();

					var config = {};
					config.async = true; // Enable asynchronous call
					config.scope = this; // Set the scope for the callback function
					config.cb = function(methodName, inputPS, outputPS) {
						console.log(outputPS.GetChild(0).propArray["Error Message"]);
					};

					var SiebMsg = SiebelApp.S_App.NewPropertySet();
					var Header = SiebelApp.S_App.NewPropertySet();
					var ListOfHeader = SiebelApp.S_App.NewPropertySet();
					ListOfHeader.SetType("ListOfVHASSJTemporaryCartDetailsIO");
					Header.SetType("VHA SSJ Temp Cart Details");
					Header.SetProperty("ParentOrderId", ObjId);
					Header.SetProperty("CartDetails", ObjMsg);
					Header.SetProperty("RecordType",Type);//JSON or DOM
					SiebMsg.SetType("SiebelMessage");
					ListOfHeader.AddChild(Header);
					SiebMsg.AddChild(ListOfHeader);
					SiebMsg.SetProperty("IntObjectName","VHASSJTemporaryCartDetailsIO");
					SiebMsg.SetProperty("IntObjectFormat","Siebel Hierarchical");
					SiebMsg.SetProperty("MessageId","4-1CR1IU");
					SiebMsg.SetProperty("MessageType","Integration Object");
					wfInput.AddChild(SiebMsg);
					wfInput.SetProperty("Object Id",ObjId);
					wfInput.SetProperty("ProcessName","VHA SSJ Upsert Query Cart Details Process WF");
					wfInput.SetProperty("Method","Upsert");
					console.log(wfInput);
					wfBSS.InvokeMethod("RunProcess", wfInput, config);
			   }
			   //Marvin: Created to retrieve line item after prod config
			   function fnCartUpdfrProdCon(QuoteId)
			   {
					let wfBSS = SiebelApp.S_App.GetService("Workflow Process Manager");
					let wfInput = SiebelApp.S_App.NewPropertySet();
					let wfOutput = SiebelApp.S_App.NewPropertySet();
					
					wfInput.SetProperty("Source","After config"); 
					wfInput.SetProperty("ParentOrderId",QuoteId); 
					wfInput.SetProperty("ProcessName","VHA SSJ Get Order Item Details Process WF");
					console.log(wfInput);
					wfOutput = wfBSS.InvokeMethod("RunProcess",wfInput);
					let wfResp = wfOutput.GetChildByType("ResultSet").propArray["Error Message"];
					if(wfResp === "Success")
					{
						let cntMSISDN = wfOutput.GetChildByType("ResultSet").GetChild(0).GetChild(0).GetChildCount();
						for(var e = 0; e <= cntMSISDN-1; e++)
						{	let sCartItemId = wfOutput.GetChildByType("ResultSet").GetChild(0).GetChild(0).GetChild(e).propArray.SSJCartItemId;
							let sPackItems = wfOutput.GetChildByType("ResultSet").GetChild(0).GetChild(0).GetChild(e).GetChildByType("ListOfPackItem");
							
							if(sPackItems.GetChildCount() > 0)
							{	
								for(let p = 0; p <= sPackItems.GetChildCount()-1; p++ )
								{	const jsonRoot = scJson.QuoteHeader.RootItem;
									const tempJsonRoot = sTempscJson.QuoteHeader.RootItem;
									for(let a = 0; a <= jsonRoot.length-1; a++)
									{	let cartId = jsonRoot[a].Id;
										if(cartId === sCartItemId)
										{	let sPackItemField = {
													Action: sPackItems.GetChild(p).propArray["ActionCode"],
													Name: sPackItems.GetChild(p).propArray["Name"],
													Price: sPackItems.GetChild(p).propArray["RecurringCharge"]
												};

											jsonRoot[a].PackItem.push(sPackItemField);
											tempJsonRoot[a].PackItem.push(sPackItemField);
										}
									}
								}
							}
						}
					}
			   }
			   //Marvin: Added to navigate user out of SSJ Calculator View
			   function fnExitSsjPage(trigtype)
			   {
					let wfBSS = SiebelApp.S_App.GetService("Workflow Process Manager");
					let wfInput = SiebelApp.S_App.NewPropertySet();
					let wfOutput = SiebelApp.S_App.NewPropertySet();
					let sOrderRowId = SiebelApp.S_App.GetActiveView().GetApplet("VHA SSJ Parent Order Form Applet").GetBusComp().GetFieldValue("Id");
					
					wfInput.SetProperty("Object Id", sOrderRowId); 
					wfInput.SetProperty("sType",trigtype); 
					wfInput.SetProperty("ProcessName","VHA SSJ Update Header Status");
					wfOutput = wfBSS.InvokeMethod("RunProcess",wfInput);
			   }
			   //Marvin: Created for Line Order create and Update
				function CreateLineItem(requestType,requestId)
				{
					let SiebMsg = SiebelApp.S_App.NewPropertySet();
					let Item1 = SiebelApp.S_App.NewPropertySet();
					let ListOfItem = "";
					let sRoot = "RootItem";
					let sItem = "Item";
					let ListOfRootItem = SiebelApp.S_App.NewPropertySet();
					let ListOfAttr = SiebelApp.S_App.NewPropertySet();
					let Attr = SiebelApp.S_App.NewPropertySet();
					let Header = SiebelApp.S_App.NewPropertySet();
					let ListOfHeader = SiebelApp.S_App.NewPropertySet();
					
					let wfBSS = SiebelApp.S_App.GetService("Workflow Process Manager");
					let wfInput = SiebelApp.S_App.NewPropertySet();
					let wfOutput = SiebelApp.S_App.NewPropertySet();
					let createLine = "N";

					SiebMsg.SetType("SiebelMessage");
					ListOfHeader.SetType("ListOfVHA Sales Calculator IO");
					Header.SetType("Header");
					ListOfRootItem.SetType("ListOfRootItem");

					SiebMsg.SetProperty("IntObjectName","VHA Sales Calculator IO");
					SiebMsg.SetProperty("IntObjectFormat","Siebel Hierarchical");
					SiebMsg.SetProperty("MessageId","4-1CR1IU");
					SiebMsg.SetProperty("MessageType","Integration Object");
					
					Header.SetProperty("QuoteId", TheApplication().GetProfileAttr("SSJParentOrderId"));
					//Header.SetProperty("QuoteNo",scJson.QuoteHeader.QuoteNumber);
					Header.SetProperty("CostPerMonth", scJson.QuoteHeader.CostPerMonth);
					Header.SetProperty("OneTimeCost",scJson.QuoteHeader.OneTimeCost);
					Header.SetProperty("Prepayment","");
					
					if(requestType === "Existing")
					{				
						for(let i = 0; i <= scJson.QuoteHeader.ExistingServices[0].length-1; i++)
						{
							if(scJson.QuoteHeader.ExistingServices[0][i].CartStatus === "UpdateinProgress")
							{
								createLine = "Y";
								window[sRoot + i] = SiebelApp.S_App.NewPropertySet();
								window[sRoot + i].SetType("RootItem");
								window[sRoot + i].SetProperty("Proposition",scJson.QuoteHeader.ExistingServices[0][i].update.Proposition);
								window[sRoot + i].SetProperty("PropSAMId",scJson.QuoteHeader.ExistingServices[0][i].update.PropSAMId);
								window[sRoot + i].SetProperty("SrvType",scJson.QuoteHeader.ExistingServices[0][i].update.SrvType);
								window[sRoot + i].SetProperty("Id",scJson.QuoteHeader.ExistingServices[0][i].MSISDN);
								window[sRoot + i].SetProperty("Service","");
								window[sRoot + i].SetProperty("SrvPerMth",scJson.QuoteHeader.ExistingServices[0][i].update.SrvPerMth);
								window[sRoot + i].SetProperty("AssetId","");
								window[sRoot + i].SetProperty("IntegrationId",""); //map missing
								window[sRoot + i].SetProperty("Promo",scJson.QuoteHeader.ExistingServices[0][i].update.Promo);
								
								ListOfItem = SiebelApp.S_App.NewPropertySet();
								ListOfItem.SetType("ListOfItem");
								
								if(scJson.QuoteHeader.ExistingServices[0][i].update.plan !== "")
								{	
									window[sItem + i] = SiebelApp.S_App.NewPropertySet();
									window[sItem + i].SetType("Item");
									window[sItem + i].SetProperty("Name",scJson.QuoteHeader.ExistingServices[0][i].update.plan.Name);
									window[sItem + i].SetProperty("Type",scJson.QuoteHeader.ExistingServices[0][i].update.plan.Type);
									window[sItem + i].SetProperty("Action",scJson.QuoteHeader.ExistingServices[0][i].update.plan.Action);
									window[sItem + i].SetProperty("Code",scJson.QuoteHeader.ExistingServices[0][i].update.plan.Code);
									window[sItem + i].SetProperty("ProdIntegrationId","");
									window[sItem + i].SetProperty("Price",scJson.QuoteHeader.ExistingServices[0][i].update.plan.Price);
									window[sItem + i].SetProperty("Descr",scJson.QuoteHeader.ExistingServices[0][i].update.plan.Descr);
									
									ListOfItem.AddChild(window[sItem + i]);
								}
								if(scJson.QuoteHeader.ExistingServices[0][i].update.DeviceItem.length > 0)
								{
									for(let a=0; a <= scJson.QuoteHeader.ExistingServices[0][i].update.DeviceItem.length-1 ; a++)
									{
										window[sItem + i] = SiebelApp.S_App.NewPropertySet();
										window[sItem + i].SetType("Item");
										window[sItem + i].SetProperty("Name","GPP Device Contract");
										window[sItem + i].SetProperty("Type",scJson.QuoteHeader.ExistingServices[0][i].update.DeviceItem[a].Type);
										window[sItem + i].SetProperty("Action",scJson.QuoteHeader.ExistingServices[0][i].update.DeviceItem[a].Action);
										window[sItem + i].SetProperty("Insurance","");
										window[sItem + i].SetProperty("ProdIntegrationId","");
										window[sItem + i].SetProperty("InsPri","");
										ListOfAttr = SiebelApp.S_App.NewPropertySet();
										ListOfAttr.SetType("ListOfAttr");
										let sDeviceName = scJson.QuoteHeader.ExistingServices[0][i].update.DeviceItem[a].UI__Source_Product_Name + ", " + scJson.QuoteHeader.ExistingServices[0][i].update.DeviceItem[a].UI__Color + ", " + scJson.QuoteHeader.ExistingServices[0][i].update.DeviceItem[a].UI__Capacity;
										const sDevArray = {"Additional Info": "", Category: "Device","IMEI/Serial Number":"","Item Code":scJson.QuoteHeader.ExistingServices[0][i].update.DeviceItem[a].Item__Code,"Item Name":sDeviceName,"Contract Amount":"","Monthly Repayment":"","Original Order Number":"","Original Purchase Date":"","Prepayment Amount":"","Term":"","Term Override":""};
										Object.entries(sDevArray).forEach(([key, value]) => {
											Attr = SiebelApp.S_App.NewPropertySet();
											Attr.SetType("Attr");
											Attr.SetProperty("Name",key);
											Attr.SetProperty("Value",value);
											ListOfAttr.AddChild(Attr);
										});
									}
									
									window[sItem + i].AddChild(ListOfAttr);
									ListOfItem.AddChild(window[sItem + i]);		
								}
								window[sRoot + i].AddChild(ListOfItem);
								ListOfRootItem.AddChild(window[sRoot + i]);
							}
						}
					}
					else
					{
						if(scJson.QuoteHeader.RootItem.length > 0)
						{
							createLine = "Y";
							for(let i = 0; i <= scJson.QuoteHeader.RootItem.length-1; i++)
							{	
								window[sRoot + i] = SiebelApp.S_App.NewPropertySet();
								window[sRoot + i].SetType("RootItem");
								window[sRoot + i].SetProperty("Proposition",scJson.QuoteHeader.RootItem[i].Proposition);
								window[sRoot + i].SetProperty("PropSAMId",scJson.QuoteHeader.RootItem[i].PropSAMId);
								window[sRoot + i].SetProperty("SrvType",scJson.QuoteHeader.RootItem[i].SrvType);
								window[sRoot + i].SetProperty("Id",scJson.QuoteHeader.RootItem[i].Id);
								window[sRoot + i].SetProperty("Service",scJson.QuoteHeader.RootItem[i].Service);
								window[sRoot + i].SetProperty("SrvPerMth",scJson.QuoteHeader.RootItem[i].SrvPerMth);
								window[sRoot + i].SetProperty("AssetId",scJson.QuoteHeader.RootItem[i].AssetId);
								window[sRoot + i].SetProperty("IntegrationId",""); //map missing
								window[sRoot + i].SetProperty("Promo",scJson.QuoteHeader.RootItem[i].Promo);
								
								ListOfItem = SiebelApp.S_App.NewPropertySet();
								ListOfItem.SetType("ListOfItem");
								
								if(scJson.QuoteHeader.RootItem[i].PlanItem !== "")
								{	
									window[sItem + i] = SiebelApp.S_App.NewPropertySet();
									window[sItem + i].SetType("Item");
									window[sItem + i].SetProperty("Name",scJson.QuoteHeader.RootItem[i].PlanItem.Name);
									window[sItem + i].SetProperty("Type",scJson.QuoteHeader.RootItem[i].PlanItem.Type);
									window[sItem + i].SetProperty("Action",scJson.QuoteHeader.RootItem[i].PlanItem.Action);
									window[sItem + i].SetProperty("Code",scJson.QuoteHeader.RootItem[i].PlanItem.Code);
									window[sItem + i].SetProperty("ProdIntegrationId","");
									window[sItem + i].SetProperty("Price",scJson.QuoteHeader.RootItem[i].PlanItem.Price);
									window[sItem + i].SetProperty("Descr",scJson.QuoteHeader.RootItem[i].PlanItem.Descr);
									
									ListOfItem.AddChild(window[sItem + i]);
								}
								if(scJson.QuoteHeader.RootItem[i].DeviceItem.length > 0)
								{
									for(let a=0; a <= scJson.QuoteHeader.RootItem[i].DeviceItem.length-1 ; a++)
									{
										window[sItem + i] = SiebelApp.S_App.NewPropertySet();
										window[sItem + i].SetType("Item");
										window[sItem + i].SetProperty("Name","GPP Device Contract");
										window[sItem + i].SetProperty("Type",scJson.QuoteHeader.RootItem[i].DeviceItem[a].Type);
										window[sItem + i].SetProperty("Action",scJson.QuoteHeader.RootItem[i].DeviceItem[a].Action);
										window[sItem + i].SetProperty("Insurance","");
										window[sItem + i].SetProperty("ProdIntegrationId","");
										window[sItem + i].SetProperty("InsPri","");
										ListOfAttr = SiebelApp.S_App.NewPropertySet();
										ListOfAttr.SetType("ListOfAttr");
										let sDeviceName = scJson.QuoteHeader.RootItem[i].DeviceItem[a].UI__Source_Product_Name + ", " + scJson.QuoteHeader.RootItem[i].DeviceItem[a].UI__Color + ", " + scJson.QuoteHeader.RootItem[i].DeviceItem[a].UI__Capacity;
										const sDevArray = {"Additional Info": "", "Category": "Device","IMEI/Serial Number":"","Item Code":scJson.QuoteHeader.RootItem[i].DeviceItem[a].Item__Code,"Item Name":sDeviceName,"Contract Amount":"","Monthly Repayment":"","Original Order Number":"","Original Purchase Date":"","Prepayment Amount":"","Term":"","Term Override":""};
										Object.entries(sDevArray).forEach(([key, value]) => {
											Attr = SiebelApp.S_App.NewPropertySet();
											Attr.SetType("Attr");
											Attr.SetProperty("Name",key);
											Attr.SetProperty("Value",value);
											ListOfAttr.AddChild(Attr);
										});
									}
									window[sItem + i].AddChild(ListOfAttr);
									ListOfItem.AddChild(window[sItem + i]);		
								}
								if(scJson.QuoteHeader.RootItem[i].SecondaryItem.length > 0)
								{
									for(let a=0; a <= scJson.QuoteHeader.RootItem[i].SecondaryItem.length-1 ; a++)
									{
										window[sItem + i] = SiebelApp.S_App.NewPropertySet();
										window[sItem + i].SetType("Item");
										window[sItem + i].SetProperty("GroupId",a);
										window[sItem + i].SetProperty("Name","Accessory");
										window[sItem + i].SetProperty("Type",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Type);
										window[sItem + i].SetProperty("Action",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Action);
										window[sItem + i].SetProperty("Insurance",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Insurance);
										window[sItem + i].SetProperty("ProdIntegrationId",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].ProdIntegrationId);
										window[sItem + i].SetProperty("InsPri",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].InsPri);
										ListOfAttr = SiebelApp.S_App.NewPropertySet();
										ListOfAttr.SetType("ListOfAttr");
										const sDevArray = {"Category": "Secondary Device", "Prepayment Amount": "0.00","Accessory Name":scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Item__Name,"Accessory Code":scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Wearble__Code,"Accessory RRP Exc GST":"","Accessory RRP Inc GST":scJson.QuoteHeader.RootItem[i].SecondaryItem[a].RRP__Inc__GST};
										Object.entries(sDevArray).forEach(([key, value]) => {
											Attr = SiebelApp.S_App.NewPropertySet();
											Attr.SetType("Attr");
											Attr.SetProperty("Name",key);
											Attr.SetProperty("Value",value);
											ListOfAttr.AddChild(Attr);
										});
									}
										window[sItem + i].AddChild(ListOfAttr);
										ListOfItem.AddChild(window[sItem + i]);	
									}
								//Secondary APP Contract
								if(scJson.QuoteHeader.RootItem[i].SecondaryItem.length > 0)
								{
									for(let a=0; a <= scJson.QuoteHeader.RootItem[i].SecondaryItem.length-1 ; a++)
									{
										window[sItem + i] = SiebelApp.S_App.NewPropertySet();
										window[sItem + i].SetType("Item");
										window[sItem + i].SetProperty("GroupId",a);
										window[sItem + i].SetProperty("Name","APP Contract");
										window[sItem + i].SetProperty("Type",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Type);
										window[sItem + i].SetProperty("Action",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Action);
										window[sItem + i].SetProperty("Insurance",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Insurance);
										window[sItem + i].SetProperty("ProdIntegrationId",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].ProdIntegrationId);
										window[sItem + i].SetProperty("InsPri",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].InsPri);
										ListOfAttr = SiebelApp.S_App.NewPropertySet();
										ListOfAttr.SetType("ListOfAttr");
										const sDevArray = {"Category": "Secondary Device","Contract Amount":scJson.QuoteHeader.RootItem[i].SecondaryItem[a].RRP__Inc__GST,"Contract Amount Override":0,"Contract Start Date":"","Contract End Date":"","IMEI":"","Monthly Repayment":"","Number of Accessories":1,"Prepayment Amount":"0.0","Term":"12","Term Override":"-","Total Accessories RRP Inc GST":scJson.QuoteHeader.RootItem[i].SecondaryItem[a].RRP__Inc__GST};
										Object.entries(sDevArray).forEach(([key, value]) => {
											Attr = SiebelApp.S_App.NewPropertySet();
											Attr.SetType("Attr");
											Attr.SetProperty("Name",key);
											Attr.SetProperty("Value",value);
											ListOfAttr.AddChild(Attr);
										});
									}
									window[sItem + i].AddChild(ListOfAttr);
									ListOfItem.AddChild(window[sItem + i]);		
								}
								//Multi Device Subscription SPID
								if(scJson.QuoteHeader.RootItem[i].SecondaryItem.length > 0)
								{
									for(let a=0; a <= scJson.QuoteHeader.RootItem[i].SecondaryItem.length-1 ; a++)
									{
										window[sItem + i] = SiebelApp.S_App.NewPropertySet();
										window[sItem + i].SetType("Item");
										window[sItem + i].SetProperty("GroupId",a);
										window[sItem + i].SetProperty("Name","Multi Device Subscription SPID");
										window[sItem + i].SetProperty("Type",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Type);
										window[sItem + i].SetProperty("Action",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Action);
										window[sItem + i].SetProperty("Insurance",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Insurance);
										window[sItem + i].SetProperty("ProdIntegrationId",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].ProdIntegrationId);
										window[sItem + i].SetProperty("InsPri",scJson.QuoteHeader.RootItem[i].SecondaryItem[a].InsPri);
										ListOfAttr = SiebelApp.S_App.NewPropertySet();
										ListOfAttr.SetType("ListOfAttr");
										const sDevArray = {"EID": "", "IMEI": "","SKU":scJson.QuoteHeader.RootItem[i].SecondaryItem[a].Wearble__Code,"SPID":992555001};
										Object.entries(sDevArray).forEach(([key, value]) => {
											Attr = SiebelApp.S_App.NewPropertySet();
											Attr.SetType("Attr");
											Attr.SetProperty("Name",key);
											Attr.SetProperty("Value",value);
											ListOfAttr.AddChild(Attr);
										});
									}
									window[sItem + i].AddChild(ListOfAttr);
									ListOfItem.AddChild(window[sItem + i]);		
								}
								//Jeeten: added to fix acc - app contract line
								if(scJson.QuoteHeader.RootItem[i].AccItem.length > 0)
								{
									for(let a=0; a <= scJson.QuoteHeader.RootItem[i].AccItem.length-1 ; a++)
									{
										window[sItem + i] = SiebelApp.S_App.NewPropertySet();
										window[sItem + i].SetType("Item");
										window[sItem + i].SetProperty("Name","Accessory");
										window[sItem + i].SetProperty("Group Id",a);
										window[sItem + i].SetProperty("Type",scJson.QuoteHeader.RootItem[i].AccItem[a].Type);
										window[sItem + i].SetProperty("Action",scJson.QuoteHeader.RootItem[i].AccItem[a].Action);
										window[sItem + i].SetProperty("Insurance","");
										window[sItem + i].SetProperty("ProdIntegrationId","");
										window[sItem + i].SetProperty("InsPri","");
										ListOfAttr = SiebelApp.S_App.NewPropertySet();
										ListOfAttr.SetType("ListOfAttr");
										const sDevArray = {"Category": scJson.QuoteHeader.RootItem[i].AccItem[a].Category,"Prepayment Amount":scJson.QuoteHeader.RootItem[i].AccItem[a].Prepayment__Amount,"Accessory Name":scJson.QuoteHeader.RootItem[i].AccItem[a].Accessory__Name,"Accessory Code":scJson.QuoteHeader.RootItem[i].AccItem[a].Accessory__Code,"Accessory RRP Exc GST":scJson.QuoteHeader.RootItem[i].AccItem[a].Accessory__RRP__Exc__GST,"Accessory RRP Inc GST":scJson.QuoteHeader.RootItem[i].AccItem[a].Accessory__RRP__Inc__GST};
										Object.entries(sDevArray).forEach(([key, value]) => {
											Attr = SiebelApp.S_App.NewPropertySet();
											Attr.SetType("Attr");
											Attr.SetProperty("Name",key);
											Attr.SetProperty("Value",value);
											ListOfAttr.AddChild(Attr);
										});
										window[sItem + i].AddChild(ListOfAttr);
										ListOfItem.AddChild(window[sItem + i]);	
									}	
								}//Jeeten: end
								if(scJson.QuoteHeader.RootItem[i].AccItem.length > 0)
								{
									for(let a=0; a <= scJson.QuoteHeader.RootItem[i].AccItem.length-1 ; a++)
									{
										window[sItem + i] = SiebelApp.S_App.NewPropertySet();
										window[sItem + i].SetType("Item");
										window[sItem + i].SetProperty("Name","APP Contract");
										window[sItem + i].SetProperty("Group Id",a);
										window[sItem + i].SetProperty("Type",scJson.QuoteHeader.RootItem[i].AccItem[a].Type);
										window[sItem + i].SetProperty("Action",scJson.QuoteHeader.RootItem[i].AccItem[a].Action);
										window[sItem + i].SetProperty("Insurance","");
										window[sItem + i].SetProperty("ProdIntegrationId","");
										window[sItem + i].SetProperty("InsPri","");
										ListOfAttr = SiebelApp.S_App.NewPropertySet();
										ListOfAttr.SetType("ListOfAttr");
										const sDevArray = {"Category": "Accessory","Contract Amount":scJson.QuoteHeader.RootItem[i].AccItem[a].Accessory__RRP__Inc__GST,"Contract Amount Override":0,"Contract Start Date":"","Contract End Date":"","IMEI":"","Monthly Repayment":"","Number of Accessories":1,"Prepayment Amount":scJson.QuoteHeader.RootItem[i].AccItem[a].Prepayment__Amount,"Term":"12","Term Override":"-","Total Accessories RRP Inc GST":scJson.QuoteHeader.RootItem[i].AccItem[a].Accessory__RRP__Inc__GST};
										Object.entries(sDevArray).forEach(([key, value]) => {
											Attr = SiebelApp.S_App.NewPropertySet();
											Attr.SetType("Attr");
											Attr.SetProperty("Name",key);
											Attr.SetProperty("Value",value);
											ListOfAttr.AddChild(Attr);
										});
										window[sItem + i].AddChild(ListOfAttr);
										ListOfItem.AddChild(window[sItem + i]);	
									}	
								}
								window[sRoot + i].AddChild(ListOfItem);
								ListOfRootItem.AddChild(window[sRoot + i]);
							}
						}
					}
					if(createLine === "Y")
					{
						Header.AddChild(ListOfRootItem);
						ListOfHeader.AddChild(Header);
						SiebMsg.AddChild(ListOfHeader);

						wfInput.AddChild(SiebMsg);
						wfInput.SetProperty("ProcessName","VHA SSJ Configure Service Master Driver Process");
						console.log(wfInput);
						wfOutput = wfBSS.InvokeMethod("RunProcess",wfInput);
						//console.log(wfOutput);
						//console.log(wfOutput.GetChild(0).propArray);
					}
				}//end of function
				function existingAddressPSMACall(selectedBA) {
		      const selectedAddress = ExistAddrPsma.find(addr => addr.VHAFullAddressPIC === selectedBA);
			  if (selectedAddress)
			  {
				  // coverage check start
				   var nser = SiebelApp.S_App.GetService("VF BS Process Manager");
				   var nInputs = SiebelApp.S_App.NewPropertySet();
				   nInputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service Sales Calc");
				   nInputs.SetProperty("role", "VCS");
				   nInputs.SetProperty("GNAFId", selectedAddress.address_identifier);
				   nInputs.SetProperty("longitude", selectedAddress.longitude); //??
				   nInputs.SetProperty("latitude", selectedAddress.latitude);
		
				   nInputs.SetProperty("Method Name", "CoverageCheck");
				   var ROups = nser.InvokeMethod("Run Process", nInputs);
				   var s4G,
				   s5G,
				   s5Gsa,
				   s5Gnsa;
				   var resultCov = [];
				   for (let i = 0; i < ROups.GetChildByType("ResultSet").childArray[1].childArray.length; i++) {
					   var curPropArr = ROups.GetChildByType("ResultSet").childArray[1].childArray[i].propArray;
					   resultCov.push(curPropArr);
				   }
				   var suiURL = SiebelApp.S_App.GetProfileAttr("URL1");
				   const arrSite = [...new Set(resultCov.map(x => x.Site))];
				   arrSite.forEach(function (item1, index) {
					   var arrNetwork = resultCov.filter(function (a) {
						   return a.Site == item1;
					   });
					   arrNetwork.forEach(function (item2, index) {
						   if (item2.PropName != "") {
							   switch (item1) {
							   case "4G/5G Home Internet":
								   switch (item2.PropName) {
								   case "is4G":
									   MapShed.FWA.f4G.is4G = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5G":
									   MapShed.FWA.f5G.is5G = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5Gsa":
									   MapShed.FWA.f5GSA.is5Gsa = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5Gnsa":
									   MapShed.FWA.f5GNSA.is5Gnsa = item2.PropValue == "true" ? true : false;
									   break;
								   };
								   break;
							   case "Mobile Coverage": //"mobilestatus":
								   switch (item2.PropName) {
								   case "is5Gindoor":
									   MapShed.Mobile.m5G.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5Goutdoor":
									   MapShed.Mobile.m5G.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5GindoorNsa":
									   MapShed.Mobile.m5GNSA.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5GoutdoorNsa":
									   MapShed.Mobile.m5GNSA.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5GindoorSa":
									   MapShed.Mobile.m5GSA.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is5GoutdoorSa":
									   MapShed.Mobile.m5GSA.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4Gindoor":
									   MapShed.Mobile.m4G.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4Goutdoor":
									   MapShed.Mobile.m4G.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4GindoorNsa":
									   MapShed.Mobile.m4GNSA.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4GoutdoorNsa":
									   MapShed.Mobile.m4GNSA.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4GindoorSa":
									   MapShed.Mobile.m4GSA.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is4GoutdoorSa":
									   MapShed.Mobile.m4GSA.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is3Gindoor":
									   MapShed.Mobile.m3G.indoor = item2.PropValue == "true" ? true : false;
									   break;
								   case "is3Goutdoor":
									   MapShed.Mobile.m3G.outdoor = item2.PropValue == "true" ? true : false;
									   break;
								   }
								   break;
							   default:
								   break;
							   }
   
   
						   }
					   });
					   var div = "";
					   switch (item1) {
					   case "4G/5G Home Internet":
						   var dVal = MapShed.FWA.f4G.is4G == true ? "4G - Available" : "4G - Not available";
						   var dCls = MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
						   s4G = MapShed.FWA.f4G.is4G;
						   // Hari 31/may/2024
						   if (s4G == false) {
							   $("#vha-sc-4G-Avl .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-4G-home-status").text(dVal);
						   } 
						   else 
						   {
							   $("#vha-sc-4G-Avl .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-4G-home-status").text(dVal);
						   }
   
						   var dVal = MapShed.FWA.f5G.is5G == true ? "5G - Available" : "5G - Not available";
						   var dCls = MapShed.FWA.f5G.is5G == true ? "ccmsGreen" : "ccmsRed";
						   s5G = MapShed.FWA.f5G.is5G;
						   if (s5G == false) 
						   {
							   $("#vha-sc-5G-NA .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-5G-home-status").text(dVal);
						   } 
						   else 
						   {
							   $("#vha-sc-5G-NA .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-5G-home-status").text(dVal);
						   }
   
						   var dVal = MapShed.FWA.f5GNSA.is5Gnsa == true ? "5G NSA - Available" : "5G NSA - Not available";
						   var dCls = MapShed.FWA.f5GNSA.is5Gnsa == true ? "ccmsGreen" : "ccmsRed";
   
						   s5Gnsa = MapShed.FWA.f5GNSA.is5Gnsa;
						   if (s5Gnsa == false)
						   {
							   $("#vha-sc-5GNSA-NA .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-5GNSA-home-status").text(dVal);
						   } 
						   else 
						   {
							   $("#vha-sc-5GNSA-NA .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-5GNSA-home-status").text(dVal);
						   }
   
						   break;
					   case "Mobile Coverage": //"mobilestatus":
						   var m = MapShed.Mobile.m3G;
						   var dVal = m.indoor == true && m.outdoor == true ? "3G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "3G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "3G - Indoor Only" : "3G - No coverage";
						   var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
						   MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
   
						   if (dCls == "ccmsRed") {
							   $("#vha-sc-3G-IO .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-3G-IO-mobile").text(dVal);
						   } else if (dCls == "ccmsOrange") {
							   $("#vha-sc-3G-IO .vha-sc-coverageStatus").addClass("CSOrange");
							   $("#vha-sc-3G-IO-mobile").text(dVal);
						   } else {
							   $("#vha-sc-3G-IO .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-3G-IO-mobile").text(dVal);
						   }
   
						   m = MapShed.Mobile.m4G;
						   var dVal = m.indoor == true && m.outdoor == true ? "4G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "4G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "4G - Indoor Only" : "4G - No coverage";
						   var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
						   MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
						   if (dCls == "ccmsRed") {
							   $("#vha-sc-4G-IO .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-4G-IO-mobile").text(dVal);
						   } else if (dCls == "ccmsOrange") {
							   $("#vha-sc-4G-IO .vha-sc-coverageStatus").addClass("CSOrange");
							   $("#vha-sc-4G-IO-mobile").text(dVal);
						   } else {
							   $("#vha-sc-4G-IO .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-4G-IO-mobile").text(dVal);
						   }
   
						   m = MapShed.Mobile.m5G;
						   var dVal = m.indoor == true && m.outdoor == true ? "5G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "5G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "5G - Indoor Only" : "5G - No coverage";
						   var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
						   MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
						   if (dCls == "ccmsRed") {
							   $("#vha-sc-5G-O .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-5G-O-mobile").text(dVal);
						   } else if (dCls == "ccmsOrange") {
							   $("#vha-sc-5G-O .vha-sc-coverageStatus").addClass("CSOrange");
							   $("#vha-sc-5G-O-mobile").text(dVal);
						   } else {
							   $("#vha-sc-5G-O .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-5G-O-mobile").text(dVal);
						   }
   
   
						   m = MapShed.Mobile.m5GNSA;
						   var dVal = m.indoor == true && m.outdoor == true ? "5G NSA - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "5G NSA - Outdoor Only" : m.indoor == true && m.outdoor == false ? "5G NSA - Indoor Only" : "5G NSA - No coverage";
						   var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
						   MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
						   if (dCls == "ccmsRed") {
							   $("#vha-sc-5GNSA-NC .vha-sc-coverageStatus").addClass("CSRed");
							   $("#vha-sc-5GNSA-NC-mobile").text(dVal);
						   } else if (dCls == "ccmsOrange") {
							   $("#vha-sc-5GNSA-NC .vha-sc-coverageStatus").addClass("CSOrange");
							   $("#vha-sc-5GNSA-NC-mobile").text(dVal);
						   } else {
							   $("#vha-sc-5GNSA-NC .vha-sc-coverageStatus").addClass("CSGreen");
							   $("#vha-sc-5GNSA-NC-mobile").text(dVal);
						   }
   
   
						   break;
					   }
   
				   });
   
			   var nwkmsg = "";
			   if (s4G == true || (s5G == true || s5Gnsa == true))
				   nwkmsg = "";
			   else
				   nwkmsg = "";
		   // coverage check end
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
			  
			   var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			   //sIntCallInputs = SiebelApp.S_App.NewPropertySet();
			   sIntCallInputs.SetProperty("Service Name", "VHA Sales Calculator BS");
			   sIntCallInputs.SetProperty("Method Name", "VHAOneSQRESTAPI");
			   sIntCallInputs.SetProperty("PropSet27", "XYZ");
			   sIntCallInputs.SetProperty("PropSet26", "Addr");					
			   sIntCallInputs.SetProperty("PropSet10", "");					
			   sIntCallInputs.SetProperty("PropSet23", selectedAddress.address_identifier);					
			   sIntCallInputs.SetProperty("PropSet24", selectedAddress.latitude);					
			   sIntCallInputs.SetProperty("PropSet25", selectedAddress.longitude);					
			   var ExistAddrOutputsResp = ser.InvokeMethod("Run Process", sIntCallInputs); 

			   $('.resultfordividertop').show();// added by vinay
				$('.coveragecheckresultscontainer').show();// added by vinay
			   $('#mobileresultfound').addClass('displaynone');// added by vinay
			   $('#fixedwirelessresultfound').addClass('displaynone');// added by vinay
			   $("#step2divider").addClass("displaynone");
			   $(".resultforcontainerparent").removeClass("displaynone");
			   //Mobile//
			   $("#mobileinitailtext").addClass("displaynone");
			   $(".Mobilecoverageresultcontainer").removeClass("displaynone");
			   //Fixed//
			   $("#fixedinitailtext").addClass("displaynone");
			   $(".fixedcoverageresultcontainer").removeClass("displaynone");
			   //FixedWirelsess//
			   $("#fixedwirelessinitailtext").addClass("displaynone");
			   $(".fixedwirelesscoverageresultcontainer").removeClass("displaynone");
			   $('#resultforvalue').text(selectedBA);

				  $('#servClass').text(ExistAddrOutputsResp.childArray[0].propArray.ServiceClass);
			   $('#Techval').text(ExistAddrOutputsResp.childArray[0].propArray.AccessTech);
			   var CustNBN = ExistAddrOutputsResp.childArray[0].propArray.CustNBN;
			   var NBNwithAU = ExistAddrOutputsResp.childArray[0].propArray.NBNwithAU;
			   var PriorityNetwork = ExistAddrOutputsResp.childArray[0].propArray.PriorityNetwork;
			   var NBNAddress = ExistAddrOutputsResp.childArray[0].propArray.NBNAddress;
			   var NBNAvlWholeSaler = ExistAddrOutputsResp.childArray[0].propArray.NBNAvlWholeSaler;
			   var AccessTech = ExistAddrOutputsResp.childArray[0].propArray.AccessTech;
			   var LocID = ExistAddrOutputsResp.childArray[0].propArray.LocID;
			   var serviceabilityClass = ExistAddrOutputsResp.childArray[0].propArray.serviceabilityClass;
			   var serviceName = ExistAddrOutputsResp.childArray[0].propArray.serviceName;
			   var ServiceClass = ExistAddrOutputsResp.childArray[0].propArray.ServiceClass;
			   if(ExistAddrOutputsResp.childArray[0].propArray.CustNBN  == "Yes")
			   {
				   $('#fixedAvailable').text("Fixed connection is available");
			   }
			   else{
				   $('#fixedAvailable').text("Fixed connection is not available");
			   }
			   
			   $('#preferredwholesaler').text(ExistAddrOutputsResp.childArray[0].propArray.PriorityNetwork);
			   $('#serviceClass').text(ExistAddrOutputsResp.childArray[0].propArray.ServiceClass);//added by vinay kumar
			   if ($('.networkAvail').length<1){
				$("#fixedwirednbn").append("<span class='CSGreen' id='statusActive'></span><span class ='networkAvail'>" + PriorityNetwork + " - Available</span>");//added by vinay kumar
				}
				else {
					$(".networkAvail").text(PriorityNetwork + " - Available");
					
				}
				if (PriorityNetwork == "") {
				   $('#fixedwirednbn').hide();
				}
				else {
				   $('#fixedwirednbn').show();
				   $('.fixednbndetails').text(PriorityNetwork + " details");
				}
			  
			   $('#internetlocationID').text(ExistAddrOutputsResp.childArray[0].propArray.LocID);
			   
			   $('#newdevelopment').text(ExistAddrOutputsResp.childArray[0].propArray.NBNCharge);					
			   $('#technologytype').text(ExistAddrOutputsResp.childArray[0].propArray.AccessTech);
			   $('#maxattainablespeed').text(ExistAddrOutputsResp.childArray[0].propArray.OneSQMAS);
			   $('#fibreupgrade').text(ExistAddrOutputsResp.childArray[0].propArray.FibreConnectServiceable);
			   
			   $('#fixedresultfound').addClass('displaynone');//added by vinay kumar
			   $('#mobilecoveragecheckaddressId').text(selectedBA); // added by vinay kumar
				$('.fixedcoveragecheckaddress').text(selectedBA);
			  }
			}
   
	   return VHASalesCalculatorSSJViewPR;
	  }()
	 );
	 return "SiebelAppFacade.VHASalesCalculatorSSJViewPR";
	})
   }