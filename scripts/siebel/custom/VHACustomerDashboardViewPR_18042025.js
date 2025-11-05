if (typeof(SiebelAppFacade.VHACustomerDashboardViewPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHACustomerDashboardViewPR");
 define("siebel/custom/VHACustomerDashboardViewPR", ["siebel/viewpr","order!siebel/phyrenderer", "order!siebel/custom/VHAAppUtilities","siebel/custom/bootstrap.min"],
  function () {
   SiebelAppFacade.VHACustomerDashboardViewPR = (function () {

    function VHACustomerDashboardViewPR(pm) {
     SiebelAppFacade.VHACustomerDashboardViewPR.superclass.constructor.apply(this, arguments);
	 this.GetPM().AttachPostProxyExecuteBinding("GetURL", VHACovergaeCheck, {
                    scope: this,
                    sequence: false
                }); 
    }

    SiebelJS.Extend(VHACustomerDashboardViewPR, SiebelAppFacade.ViewPR);
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
		var otpAutentication;
		var PhnVerifyFlag_step2;
		var EmailVerifyFlag_step2;
		var AuthmethodType;
		var stepAuthPbj ={};
		var OtpStep2;
		var verifiedStep2;
		var authdetails;
		//var Objectid = '2-CKNKFN2';
		var scJson = "";
		var CustNBN = "";
		var NBNAU = "";
		var AccessTech = "";
		var NBNTypeDesc = "";
		var ConId = SiebelApp.S_App.GetProfileAttr("VHA Cotact Primary Id");
		var displayPegaData = "";
		var OrgN;
    VHACustomerDashboardViewPR.prototype.Init = function () {
     SiebelAppFacade.VHACustomerDashboardViewPR.superclass.Init.apply(this, arguments);
	var ConId = SiebelApp.S_App.GetProfileAttr("VHA Cotact Primary Id");
	var cusAccId = SiebelApp.S_App.GetProfileAttr("VHA CustomerAccount Id");
	console.log(cusAccId);
	 var SearchString = "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='ENABLE_CMID'";
     var sLovFlg = VHAAppUtilities.GetPickListValues("", SearchString);
	 
	 
	 
	    var pegaResp = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_FUNCTION_ACCESS_RESP' AND [List Of Values.Value]= 'Resp|PegaResp' AND [List Of Values.Active]='Y'", {"All": "true"})[0].Name;
	    var bsRespCheck = SiebelApp.S_App.GetService("VF BS Process Manager")
		var psInputs = SiebelApp.S_App.NewPropertySet();
		var userid =SiebelApp.S_App.GetProfileAttr("PegaLoginId");
		psInputs.SetProperty("User Id",userid );
		psInputs.SetProperty("Responsibility", pegaResp);
		psInputs.SetProperty("Service Name", "VF Check Responsibilities");
        psInputs.SetProperty("Method Name", "Check Responsibilities");
		var Output = bsRespCheck.InvokeMethod("Run Process", psInputs);
		//var Output = bsRespCheck.InvokeMethod("Check Responsibilities", psInputs);
		var resultset = Output?.GetChildByType("ResultSet");
		if(resultset.propArray.Exists === 'Y')
		{
			var res = "Available";
			displayPegaData = "Y";
		}
		else
		{
			//$(".vha-img-applet5").addClass("displaynone");
			$('#LaunchButton').prop('disabled',true);
			$('.Launch-Rec-btn').prop('disabled',true);
			displayPegaData = "Y";
		}
		 if (sLovFlg == "N")
		 {
		 //$(".vha-img-applet5").addClass("displaynone");
			$('#LaunchButton').prop('disabled',true);
			$('.Launch-Rec-btn').prop('disabled',true);
			displayPegaData = "Y";
		 }
		 else
		 {
			displayPegaData = "Y"; 
		 }
		 /* NBA Offer Code*/
		 //var pegaNBAResp = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_REMOVE_NBA_RESP' AND [List Of Values.Value]= 'VHA Function Access NBADisable' AND [List Of Values.Active]='Y'", {"All": "true"})[0].Name;
		 var pegaNBAResp = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_REMOVE_NBA_RESP' AND [List Of Values.Name]= 'Remove NBA Responsibility' AND [List Of Values.Active]='Y'", {"All": "true"})[0].Value;
		 psInputs.SetProperty("Responsibility", pegaNBAResp);
		 var Output = bsRespCheck.InvokeMethod("Run Process", psInputs);
		//var Output = bsRespCheck.InvokeMethod("Check Responsibilities", psInputs);
		 var resultset = Output?.GetChildByType("ResultSet");
		 if(resultset.propArray.Exists === 'Y')
		 {
			$('.RecentIntractions').removeClass('displaynone');
			$('.recentIntractionsretailContatiner').addClass('displaynone');
		 }
		 else{
			 $('.RecentIntractions').addClass('displaynone');
			$('.vha-img-recentInttabsnba').removeClass('recentactive');
			$('.NBAOffers').addClass('displaynone');
			$("#s_" + SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId") + "_div").addClass('displaynone');
		 }
		 /* NBA Offer Code*/
	 //uiLoadcheck = SiebelApp.S_App.GetProfileAttr("1stload");
	 //$(".vha-siebelapplet1").removeClass("displaynone");
	  //SiebelApp.S_App.SetProfileAttr("1stload","");
	  if ($(".vha-img-parent-main").find('.ShowUILoaded').length === 0) {
		  //if (uiLoadcheck !="Y")
		  SiebelApp.S_App.SetProfileAttr("1stload","Y");
		   $(".vha-img-parent-main").addClass("ShowUILoaded");
		   buildCoveragecheckUI();
		   $('#siebui-threadbar').parent().addClass('custOverCrump');
	$('.refreshbtn').text("Refresh");
	$('.h4-title').text("Address lookup");
	$('#ContactAction2').css('text-decoration','underline');
	$('#ContactAction1').css('text-decoration','underline');
	 var Objectid = SiebelApp.S_App.GetProfileAttr("VHA Cotact Primary Id");
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
		$('.verifiedbg').first().find('#valiadte-email').insertAfter('.verifiedbg:first');
		 
		this_t =this;
		var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
		var Inputs = SiebelApp.S_App.NewPropertySet();
		var Outputs = SiebelApp.S_App.NewPropertySet()
		Inputs.SetProperty("ProcessName", "VHA Customer Dashboard Process");
		Inputs.SetProperty("Object Id",Objectid);
		Outputs = ser.InvokeMethod("RunProcess", Inputs);
		var ChildCount = Outputs.GetChildCount();
		var Result = Outputs.GetChildByType("ResultSet");
		var OutpuXMLDoc = Result.GetProperty("XML Doc");
		var FullName ="";
		var Status = "";
		var dob  = "";
		var ContactNum  = ""; 
		var primaryidType = "";
		var primaryidExpDate = "";
		var primaryid = "";
		var IdType = [];
		var ExpiryDate = [];
		var visaExpiryDate = [];
		var AccName = [];
		var AccRole = [];
		var dom = [];
		var org = [];
		var CustomerSegment = [];
		var AccRowId = [];
		var pin =[];
		var cusNum;
		if (OutpuXMLDoc) 
		{
			
			var xmlDoc = $.parseXML(OutpuXMLDoc);
			var $xml = $(xmlDoc)
			$xml.find("VhaContact").each(function(){
			 FullName = $(this).find("FullName").text();
			 Status = $(this).find("Status").text();
			 dob  = $(this).find("BirthDate").text();
			 ContactNum  = $(this).find("HomePhone").text();
			 primaryidType = $(this).find("IdType").text();
			 primaryidExpDate = $(this).find("ExpiryDate").text();
			 primaryidvisaExpDate = $(this).find("VHAVISAExpiryDate").text();
			 //primaryid = primaryidType+primaryidExpDate;
			 $(this).find("VhaContactId").each(function(){
					
					$(this).find("IdType").each(function(){
						IdType.push($(this).text());
					});
					$(this).find("ExpiryDate").each(function(){
						ExpiryDate.push($(this).text());
					});
					$(this).find("VHAVISAExpiryDate").each(function(){
						visaExpiryDate.push($(this).text());
					});
				});
				$(this).find("VhaAccount").each(function(){										
						AccName.push($(this).find("Name").text());					
						org.push($(this).find("Organization").text());		
						CustomerSegment.push($(this).find("VFCustomerSegment").text());
						AccRowId.push($(this).find("RowId").text());
						AccRole.push($(this).find("ContactProfileRole").text());
						dom.push($(this).find("CustomerDefaultBillCycle").text());
						pin.push($(this).find("Password").text());
					
				});
			
			});
		}		
		
		// Get Primary Address- Start
		var i=0;
		var accountId = AccRowId[i];
		var addressBS= SiebelApp.S_App.GetService("VHA Get Primary Address BS");
		var inputs = SiebelApp.S_App.NewPropertySet();
		var outputs = SiebelApp.S_App.NewPropertySet();
		inputs.SetProperty("AccountId",accountId);
		outputs = addressBS.InvokeMethod("FetchPrimaryAddress", inputs);
		var resultSet = outputs.GetChildByType("ResultSet");
		var address = resultSet.GetProperty("Primary Address");
		cusNum = resultSet.GetProperty("Customer Number");
		var cusNumAttr =$('#accountRowId');
		cusNumAttr.attr("cusNum",cusNum);
		// Get Primary Address- End

		function formatDate(date) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options);
        }
		
		 let formatteddob = formatDate(dob);
		 
		 document.getElementById("vha-img-title-app1").innerHTML = FullName;
		 $("#vha-img-ap1-status").text(Status);
		 $("#vha-img-ap1-dob").text(formatteddob);
		 $("#vha-img-ap1-pin").text(ContactNum);
		 $("#vha-img-ap1-primaryid").text(primaryid);
		 document.getElementById("accNameSeg").innerHTML = AccName[i]+" ("+CustomerSegment[i]+")";
		 document.getElementById("primaryAddress").append(address);
		 document.getElementById("cApin").append(pin[i]);
		 document.getElementById("dom").append(dom[i]);
		 document.getElementById("orgVal").append(org[i]);
		 document.getElementById("accountRowId").append(AccRowId[i]);
		 $('#vha-sc-allguidedbtns-ul').append('<select class="siebui-nav-links siebui-nav-screenlist accDropdown"><option value hidden></option></select>');
		 
		 for (let i =0; i < AccRowId.length ; i++){
			if(AccRowId[i] != undefined)
			{
				if(i <= 5)
				{
				 if (AccRole[i] != "")
				 {
				 document.getElementById("A"+[i]+"Role").textContent = AccRole[i]+ " for";
				 }
				 document.getElementById("A"+[i]+"Name").textContent = AccName[i]+" ("+CustomerSegment[i]+")"; 
				 var accountLi = $("#A"+[i]+"Name").parent().parent();
				 accountLi.attr('data-rowID',AccRowId[i]);
				 accountLi.attr('accContactRole',AccRole[i]);
				}
				if(i > 5)
				{
					
					for (let i =6; i < AccRowId.length; i++){ 
						var accDetails = AccRole[i] +" for "+ AccName[i] + " ("+ CustomerSegment[i]+")";
						//$('.accDropdown').append('<option value="'+accDetails+'" data-rowid='+AccRowId[i]+'>'+accDetails+'</option>')
						$('.accDropdown').append('<option value="'+accDetails+'" data-rowid="'+AccRowId[i]+'" accContactRole="'+AccRole[i]+'">'+accDetails+'</option>');
					}
					i = AccRowId.length;
				}
				
			}
		 		 
		 }
		
		// Get Linked Contact Start
		var i=0;
		var AccountId = AccRowId[i]
		var LinkedConBS = SiebelApp.S_App.GetService("VHA Secondary Linked Contacts BS");
		var LCInputs = SiebelApp.S_App.NewPropertySet();
		var LCOutputs = SiebelApp.S_App.NewPropertySet();
		LCInputs.SetProperty("AccountId",AccountId);
		Outputs = LinkedConBS.InvokeMethod("FetchContacts", LCInputs);
		var temp = Outputs.GetChildByType("ResultSet");
        var dataa =temp.childArray;
		var linkedContactCount =dataa.length;
		var arry=[];
		for (let i =0; i<dataa.length;i++){
			var obj={};
			obj.fullname = dataa[i].propArray['Full Name'];
			obj.Role = dataa[i].propArray.Role;
			obj.Status = dataa[i].propArray.Status;
			arry.push(obj);
		}
		/*var i=0;
		document.getElementById("vha-img-tab1-btn-lbl").innerHTML = dataa[i].propArray.Role+AccName+"("+CustomerSegment+")";*/
		if(linkedContactCount == 1)
		{
			 document.getElementById("ViewLinkedContact").innerHTML = "View linked contact";
		}
		if(linkedContactCount == 0)
		{
			document.getElementById("ViewLinkedContact").innerHTML = "None";
		}
		if(linkedContactCount >1)
		{
			document.getElementById("ViewLinkedContact").innerHTML = "View "+linkedContactCount+" linked contacts";
		}
		// Get Linked Contact End
		if (Status == "Active")
		{
			$("#vha-img-ap1-status").text("");
			//$('#vha-img-ap1-status').prepend('<span id="activeicon"class="dot_Class_Active"></span>');
			document.getElementById("vha-img-ap1-status").innerHTML = "<div class='contactstatusActive'><span class='tickmark' id='contactstatusActivetickmark'></span><span id='statusActivetext'>Active</span></div>";
		}
		else{
			console.log(Status);
		}
		const dateObj = new Date();
		const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-
		const day = String(dateObj.getDate()).padStart(2, '0');
		const year = dateObj.getFullYear();
		const formattedTodayDate = `${day}-${month}-${year}`;
		const todaydate = `${year}-${month}-${day}`;
		if (IdType[i] == "Visa")
		{
		ExpiryDate = visaExpiryDate[i];
		const dateObj = new Date(ExpiryDate);
		const day = String(dateObj.getDate()).padStart(2, '0');
		const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
		const year = dateObj.getFullYear();
		const formattedDate = `${day}-${month}-${year}`;
		const Iddate = `${year}-${month}-${day}`;
		console.log(formattedDate); // Output: "08/2019"
			if (new Date(Iddate) > new Date(todaydate))
			{
				var primaryid = IdType[i]+" (Expires "+formattedDate+")";
			}
			else
			{
				var primaryid = IdType[i]+" (Expired)";
				$('#vha-img-ap1-primaryid').append('<span id ="updateaddress"class="dot_Class_warning"></span>');
				$('#updateaddress').after('<a id="updateId" href="#" tabindex="1">Update ID</a>');
			}
		}
		else if (IdType[i] == "Medicare Card")
		{
		ExpiryDate = visaExpiryDate[i];
		const dateObj = new Date(ExpiryDate);
		const day = String(dateObj.getDate()).padStart(2, '0');
		const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
		const year = dateObj.getFullYear();
		const formattedDate = `${day}-${month}-${year}`;
		const Iddate = `${year}-${month}-${day}`;
			if (new Date(Iddate) > new Date(todaydate))
			{
				var primaryid = IdType[i]+" (Expires "+formattedDate+")";
			}
			else
			{
				var primaryid = IdType[i]+" (Expired)";
				$("#vha-img-ap1-primaryid").text(primaryid);
				$('#vha-img-ap1-primaryid').append('<span id ="updateaddress"class="dot_Class_warning"></span>');
				$('#updateaddress').after('<a id="updateId" href="#" tabindex="1">Update ID</a>');
			}
		}
		else
		{
			ExpiryDate = ExpiryDate[i];
			const dateObj = new Date(ExpiryDate);
			const day = String(dateObj.getDate()).padStart(2, '0');
			const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
			const year = dateObj.getFullYear();
			const formattedDate = `${day}-${month}-${year}`;
			const Iddate = `${year}-${month}-${day}`;

			if (new Date(Iddate) > new Date(todaydate))
				{
					var primaryid = IdType[i]+" (Expires "+formattedDate+")";
					$("#vha-img-ap1-primaryid").text(primaryid);
				}
				else
				{
					if (IdType[i] != undefined && IdType[i] != "" && IdType[i] != null)
					{
					var primaryid = IdType[i]+" (Expired)";
					$("#vha-img-ap1-primaryid").text(primaryid);
					$('#vha-img-ap1-primaryid').append('<span id ="updateaddress"class="dot_Class_warning"></span>');
					$('#updateaddress').after('<a id="updateId" href="#" tabindex="1">Update ID</a>');
					}
					else
					{
						$("#vha-img-ap1-primaryid").text("");
					}
				}
		}
		 recentIntractions(AccRowId[i]);
		 changeAccount(AccRowId[i]);
		 getOverduedetails(AccRowId[i]);
		 limiteduser(AccRowId[i],AccRole[i]);
		 overdueAccountvalidation(AccRowId[i]);
		 //limiteduser("2-CL193UC");
	   }
	   var assetApplet =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Recent Activities Applet");
		var pm = assetApplet.GetPModel();
		var recordSet = pm.Get("GetRecordSet");

		//var act = $("[aria-label='Recent activities in Accounts']").find('.siebui-row-counter');
		if (recordSet.length == 0)
		{
			recenttbody = $("table[summary='Recent activities']").find('tbody')
			
			recenttbody.append('<tr> class "Noactivity"><td Id ="newformtd" colspan="3">No user-generated activities</td></tr>');
		}
	   
    }

    VHACustomerDashboardViewPR.prototype.ShowUI = function () {
		
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
	  
	let referenceElement = document.getElementById("accNameSeg"); // Use your actual ID here

        if (referenceElement) {
        // Create the new dropdown <div>
      let newDropdown = document.createElement("div");
        newDropdown.classList.add("dropdown");
        newDropdown.innerHTML = `
            <button class="dropdown-btn">Actions</button>
            <ul class="dropdown-content">
                <li class="customLI" data-action="View full customer account">View full customer account</li>
                <hr>
                <li class="customLI" data-action="Connect Postpay">Connect Postpaid</li>
                <li class="customLI" data-action="Connect Prepay">Connect Prepaid</li>
                <li class="customLI" data-action="Connect nbn">Connect nbn</li>
                <hr>
                <li class="customLI" data-action="View orders">View orders</li>
                <li class="customLI" data-action="Accounts/Prepaids missing">Accounts/Prepaids missing</li>
            </ul>
        `;

        // Insert the new dropdown **after** the reference element
        referenceElement.after(newDropdown);

        // Dropdown functionality
        let dropdownBtn = newDropdown.querySelector(".dropdown-btn");
        let dropdownContent = newDropdown.querySelector(".dropdown-content");

        dropdownBtn.addEventListener("click", function () {
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        });

       document.querySelectorAll(".customLI").forEach((li) => {
			li.addEventListener("click", function (event) {
				let action = event.target.getAttribute("data-action");
				console.log(action);
				ContactActionnewDropdown(action);
				dropdownContent.style.display = "none";
			});
		});
		document.querySelectorAll(".customLI").forEach((li) => {
			li.addEventListener("click", function (event) {
            if (!newDropdown.contains(event.target)) {
                dropdownContent.style.display = "none";
            }
			});
        });
    } else {
        console.log("Reference element with the specified ID not found!");
    }
	var assetHead = document.querySelector("#VHAAssetDashBoard > div:nth-child(4) > div.vha-width-70p > div.vha-img-applet4 > div > div.d-flex.vha-img-account-title.AppHead > h4");
	var publicnotesHead = document.querySelector("#VHAAssetDashBoard > div:nth-child(4) > div.vha-width-30p > div.vha-img-applet6 > div > h3");
	var recentAct =document.querySelector("#VHAAssetDashBoard > div:nth-child(4) > div.vha-width-30p > div.vha-img-applet7 > div.d-flex.vha-img-account-title.AppHead > h3");
	var actSR = document.querySelector("#VHAAssetDashBoard > div:nth-child(4) > div.vha-width-30p > div.vha-img-applet8 > div.d-flex.vha-img-account-title.AppHead > h3");
	var creditCheck = document.querySelector("#VHAAssetDashBoard > div:nth-child(4) > div.vha-width-30p > div.vha-img-applet9 > div.d-flex.vha-img-account-title.AppHead > h3");
    $(assetHead).hide();
    $(publicnotesHead).hide();
    $(recentAct).hide();
    $(actSR).hide();
    $(creditCheck).hide();
	initializeAutocomplete();
	var goimg  = $("<img>")
		goimg.attr("src", "images/custom/Search_1.svg");
		goimg.attr("id", "goimg");
	$('#vha-img-ap2-Go-btn').empty();
	$('#vha-img-ap2-Go-btn').append(goimg);
	
	 $('[aria-label^="Active Public Notes List Applet"]').addClass('displaynone');
	 //$('#ContactAction2 option[value="Transfer of ownership"]').remove();
	 //$('#ContactAction2 option[value="Lodge service request"]').remove();
	 $('#ContactAction1 option[value="Link Contact Profile"]').remove();
	 //$('#ContactAction2').append('<option value="Connect Prepay">Connect Prepay</option>');
	 //$('#ContactAction2').append('<option value="Accounts/Prepaids missing">Accounts/Prepaids missing</option>');
	 //added the below code for defect CM-2301
	 //$('#ContactAction2 option[value="Connect Postpay"]').text("Connect Postpaid");
	 //$('#ContactAction2 option[value="Connect Prepay"]').text("Connect Prepaid");
	 //End CM-2301
	 
	 var ContactId = SiebelApp.S_App.GetProfileAttr("VHA Cotact Primary Id");
	 var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
	 var Input = SiebelApp.S_App.NewPropertySet();
	 Input.SetProperty("ProcessName", "VHA Get Contact Org Process");
	 Input.SetProperty("Type","CON" );
	 Input.SetProperty("SrcId",ContactId);               
	 var Outputs = ser.InvokeMethod("RunProcess", Input);
	  OrgN = Outputs.childArray[0].propArray.OrgName;
	  if (OrgN == "Kogan") {
		  $('#ContactAction2 option[value="Accounts/Prepaids missing"]').remove();
	  }
		var contactAction =  $('#ContactAction1');
		contactAction[0][0].textContent = 'Actions'

		var accountAction =  $('#ContactAction2');
		accountAction[0][0].textContent = 'Actions'
		var view = SiebelApp.S_App.GetActiveView();
		var appletMap = view.GetAppletMap();
		var myApplet = appletMap["VHA Customer Dashboard Asset Form Applet"];
		var pm = myApplet.GetPModel();
		var AppletId = pm.Get("GetFullId");
		$("#s_" + AppletId + "_div").addClass('displaynone');
	/* NBA Offer Code*/
	document.querySelector("#VHAAssetDashBoard > div:nth-child(4) > div.vha-width-70p > div.vha-img-applet5 > div > div > div:nth-child(1) > h3").innerHTML = "Recent interactions";
	 //coverageCheckDiv();	
	//primaryAddressLength();
	 
	/*window.addEventListener('resize', function (){
		console.log("resize script");
		 primaryAddressLength();
	});*/
	$('#address').keypress(function () {
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        var Output = SiebelApp.S_App.NewPropertySet();
                        var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                        Inputs.SetProperty("Service Name", "SIS OM PMT Service");
                        Inputs.SetProperty("Method Name", "Set Profile Attribute");
                        Inputs.SetProperty("Profile Attribute Name", "VFPostCodeAttr");
                        Inputs.SetProperty("Profile Attribute Value", "Invalid");
                        var Output = ser.InvokeMethod("Run Process", Inputs);
     
	 })
	  /* $('#address').autocomplete({
                        source: function (request, response) {
                            var sResp = VHAAppUtilities.doSearchAddress(request, "physical");
                            if (sResp != false) {
                                response(sResp);
                            } else {
                                response([]);
                            }
                            mSetPrflAttr("Prepay QAS Query Executed", "Y");
                        },
                        minLength: 10,
                        select: function (event, ui) {
                            var sResp = VHAAppUtilities.getAddress(ui);
                            if (sResp != false) {
                                var Inputs = SiebelApp.S_App.NewPropertySet();
                                Inputs.SetProperty("ViewName", SiebelApp.S_App.GetActiveView().GetName());
                                Inputs.SetProperty("Action", "PrepayAddress");
                                VHAAppUtilities.updateAddress(sResp, Inputs);
                            }
                        }
                    });*/
	function initializeAutocomplete(){				
		$('#address').autocomplete({
                    source: function (request, response) {
                        var sResp = VHAAppUtilities.doSearchAddress(request, false);
                        //mSetAddrValidFlg("N");
                        //$("#Coverage").text("");
                        $("a.siebui-icon-location").remove();
                        $(".ccNwkpar").remove();
                        SiebelApp.S_App.SetProfileAttr("URL1", "");
                        if (sResp != false) {
                            response(VHAAppUtilities.doSearchAddress(request, false));
                        } else { // when error/message/fault
                            response([]);
                        }
                        isQAS = "Y";
                        //$("[name ='" + sCtl.GetInputName() + "']").parent().removeClass("VFDisplayNone")
                        //$("#TCEcQAS").addClass("VFDisplayNone");
                    },
                    minLength: 10,
                    select: function (event, ui) {
                        $("#maskoverlay").styleShow();
                        tssleep(30).then(() => {
                            var sResp = VHAAppUtilities.getAddress(ui);
                            var this_t = this;
							sAddr = this_t.value;
                            var SearchString = "[List Of Values.Type]='VHA_AUTO_COVRGE_CHK' AND [List Of Values.Active]='Y'";
                            var sLovFlg = VHAAppUtilities.GetPickListValues("", SearchString);
                            if (sLovFlg == "ON") {
                                VHACovergaeCheck(sResp, this_t);
                            }
                            //Vasavi added below if for NBN Address
                            if (sResp != false) {
                                var sAddrAllowedFlg = 'Y';
                                $.map(sResp.address.properties, function (i, j) {
                                    if (j == "postal_delivery_type" && i != null && i != "") {
                                        sAddrAllowedFlg = 'N';
                                    }
                                });
                                if (sAddrAllowedFlg == "Y") {
                                    var NBNLoc = "";
									TriggerNBNAddress(sResp, NBNLoc);
                                   /* var NBNDetails = TriggerNBNAddress(sResp, NBNLoc);
									console.log(NBNDetails.NBNAvailable);
									console.log(NBNDetails.NBNDetailsNBNAU);
									console.log(NBNDetails.AccessTech);
									console.log(NBNDetails.NBNTypeDesc);*/
                                } else {
                                    //$('[name='+t_this.GetPM().Get("GetControls")["Address"].GetInputName()+']').val("");
                                    alert("Invalid Address Type. Address must have type as Street or Rural.");
                                    return false;
                                }
                            } //end if Vasavi
							//$(".vha-img-app2-search-box").hide();
							$(".vha-img-app2-search-box").addClass("displaynone");
							$("#maintab").removeClass("maintabdisplaynone");
							$("#mobiletab").removeClass("mobiletabdisplaynone");
							$('#addressval').text(sAddr);
							$('#addressvalFixed').text(sAddr);
                            $("#maskoverlay").styleHide();
							$("#mobilemain").addClass("active");
							$("#fixedmain").removeClass("active");
							$("#fixedtab").addClass("fixedtabdisplaynone");
							$("#mobiletab").removeClass("mobiletabdisplaynone");
                        });
                    }
                });
	}			
	$('.search-address').on('click',function(e){
			event.preventDefault();
			$("#maintab").addClass("maintabdisplaynone");
			$("#mobiletab").addClass("mobiletabdisplaynone");
			$("#fixedtab").addClass("fixedtabdisplaynone");
			//$(".vha-img-app2-search-box").show();
			$(".vha-img-app2-search-box").removeClass("displaynone");
			$('#address').autocomplete("destroy");
			initializeAutocomplete();
	  });	
	  $('#fixedmain').on('click',function(e){
			$("#fixedmain").addClass("active");
			$("#mobilemain").removeClass("active");
			$("#mobiletab").addClass("mobiletabdisplaynone");
			$("#fixedtab").removeClass("fixedtabdisplaynone");
	  });	
	  
	 
	  $('#mobilemain').on('click',function(e){
			$("#mobilemain").addClass("active");
			$("#fixedmain").removeClass("active");
			$("#fixedtab").addClass("fixedtabdisplaynone");
			$("#mobiletab").removeClass("mobiletabdisplaynone");
	  });
	  
	$('#ContactAction1').on('change',function(e){
			var selVal = $('#ContactAction1').val();
			switch(selVal){
				case 'View Full Contact Profile':
					var Objectid = SiebelApp.S_App.GetProfileAttr("VHA Cotact Primary Id");
					GotoviewwithrowId("TPG Contact Profile View",Objectid,"VHA ContactProfile Form Applet","Contact","Contact");
				break;
				case 'Link Contact Profile':
					GotoviewwithrowId("Account List View","2-CKNKFMF","SIS Account List Applet");
				break;
			}			
	  });
 //$('#ContactAction2').on('change',function(e){
	 function ContactActionnewDropdown (selVal)
	 {
			//var selVal = $('#ContactAction2').val();
			ConId = SiebelApp.S_App.GetProfileAttr("VHA Cotact Primary Id");
			switch(selVal){
		    case 'View full customer account':
			var accRowid = $("#accountRowId").text();
		    GotoviewwithrowId("VF Account Summary View",accRowid,"VHA SIS Account Entry Applet","Account","Account");
		    break;
		    case 'Connect Postpay':
					//Billing Account overdue Validation
					if(SiebelApp.S_App.GetProfileAttr("overDueBAexist") == "Y")
					{
									alert("You are unable to create new connection as Billing Account: " + " " + SiebelApp.S_App.GetProfileAttr("overDueBANum") + " " + " is Overdue. Please ensure all account payments are up to date before proceeding.");
                                    return false;
					}
					else
					{
						InvokeTaskFromOpenUI("VF Post Pay New Connection",accRowid);
					}
					//Billing Account overdue Validation End
			break;
		    case 'Connect Prepay':
			/*TheApplication().SetProfileAttr("gLaunchedCustAccountId", accRowid);
			TheApplication().SetProfileAttr("gCustSegAccId", accRowid);
			TheApplication().SetProfileAttr("CMIDOrderJourneyInitiatedFrom","Connect Postpay");
			TheApplication().SetProfileAttr("CMIDOrderJourneyName","Connect Postpay");*/
			InvokeTaskFromOpenUI("VF New Prepay UNISIM Connection Task",accRowid);
			break;
		    case 'Connect nbn':
					//Billing Account overdue Validation
					if(SiebelApp.S_App.GetProfileAttr("overDueBAexist") == "Y")
					{
									alert("You are unable to create new connection as Billing Account: " + " " + SiebelApp.S_App.GetProfileAttr("overDueBANum") + " " + " is Overdue. Please ensure all account payments are up to date before proceeding.");
									return false;
					}
					else
					{
						InvokeTaskFromOpenUI("VHA Connect FBB New Connection",accRowid);
					}
					//Billing Account overdue Validation End
			break;
			case 'Transfer of ownership':
			InvokeTaskFromOpenUI("VF Post Pay New Connection",accRowid);
			break;
			case 'Transfer within account':
			InvokeTaskFromOpenUI("VF Post Pay New Connection",accRowid);
			break;
			case 'Lodge service request':
			var accRowid = $("#accountRowId").text();
			createSR(accRowid,"Account");
			break;
			case 'View orders':
			var accRowid = $("#accountRowId").text();
			GotoviewwithrowId("Account Detail - Orders View",accRowid,"VHA SIS Account Entry Applet","Account","Account");
			break;
			case 'Accounts/Prepaids missing':
			var accRowid = $("#accountRowId").text();
			var bs = TheApplication().GetService("Workflow Process Manager"); 
			var psInputs = TheApplication().NewPropertySet(); 
			var psOutputs = TheApplication().NewPropertySet(); 
			psInputs.SetProperty("ProcessName","TPG Contact Merge Process");
			psInputs.SetProperty("FlowType", "PreVal");
			psInputs.SetProperty("AccId",accRowid);
			psInputs.SetProperty("ConId",ConId);      
			bs.InvokeMethod("RunProcess",psInputs,psOutputs);
			TheApplication().SetProfileAttr("TBUIPrepayAccountId", accRowid);
			TheApplication().SetProfileAttr("TBUIPrepayContactId", ConId);
			InvokeTaskFromOpenUI("VHA Contact Merge Task","");
			break;
		}
	}
			
	 // });
	
	$('#authButton').on('click',function(e){
			var Objectid = SiebelApp.S_App.GetProfileAttr("VHA Cotact Primary Id");
			authdetails = getdetails(Objectid);
			authcontdetails();
			
			$("#myModal").removeClass("displaynone");
			if (OrgN === 'Kogan') {
                        $('#email').parent().hide();
                    }
			
			if($('.form-group').find('#vha-ret-authName').length === 0)
			{
			$('.form-group').prepend('<p><strong>Name</strong><span id="vha-ret-authName"></span></p><p><strong>Date of birth</strong><span id="vha-ret-authDob"></span></p>');
			let maskedName = authdetails["Full Name"].replace(/(\b\w)(\w*)/g, (_, first, rest) => first + "x".repeat(rest.length));
			$("#vha-ret-authName").text(maskedName);
			$("#vha-ret-authDob").text(authdetails["Birth Date"]);
			/*$('.cont-prof-alignCenter').after('<div class="IdentrySucess cont-prof-alignCenter forcehide"><span class="tickmark"></span><span class="greenfont">Successfully confirmed ID</span></div>');
			$('.cont-prof-alignCenter').after('<div class="IdentryFail cont-prof-alignCenter forcehide"><span class="exclamationCircleIcon"></span><span class="redfont">ID entered doesnt match</span></div>');*/
			}
	  });	
     //authentication start
	  $(".vha-ret-popup-close-btn").on('click', function(){
			resetUI();
			$("#myModal").addClass("displaynone");
	  }); 
	 
	  	   $("#Vha-CP-SendAppInvite").on('click', function(){
			 var  data;
			 $("#Vha-CP-SendAppInviteStatus").removeClass("displaynone");
			 $("#Vha-CP-SendAppInvite").addClass("displaynone");
					 requestAnimationFrame(() => {
						setTimeout(() => {
							stepAuthPbj.ARII =authdetails.AccARII;
							stepAuthPbj.OrgName =authdetails.AccOrg;
							stepAuthPbj.ContactId =authdetails["Contact Id"];
							stepAuthPbj.AccountObjectId =authdetails["Row Id"];
							stepAuthPbj.MSISDN =authdetails["Home Phone #"];
							stepAuthPbj.EmailOTP =authdetails["Email Address"];
							data = verifyEmailSms(stepAuthPbj,"sendinvite");
							if(data.ErrCd === "0"){
								
							    
							}
							else{
								$("#Vha-CP-SendAppInvite").removeClass("displaynone");
								 $("#Vha-CP-SendAppInviteStatus").addClass("displaynone");
								alert(data.ErrMsg);
							}
						}, 0);
					});
	  }); 
	  $("#vha-cont-prof-nextbtn").on('click', function(){
				if(verifiedStep2 === "Y"){
					resetUI();
					$("#myModal").addClass("displaynone");
				}
					
				else
					alert("Please Authenticate to proceed further");
					
			});	
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
                }
                else{
                  $("#valiadte-email").show();
                }
                break;
              case 'phone':
                AuthmethodType = "phone";
                if(PhnVerifyFlag_step2 === "Y"  || OrgN === 'Kogan'){
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
					 //alert("Id validated");
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
		   $("#vha-inapp-checkbox").on('change', function(){
					 
					 if($(this).is(':checked')){
						 verifiedStep2 = "Y";
					 }
					 else{
					   verifiedStep2 = "N";
					 }
		    });
		     $("#valiadte-email").on('click', function(){
					 var  data;
					  $("#vha-step2-mail-unverified").text("Email sent");
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
					 var data;
					 $("#vha-step2-phone-unverified").text("SMS sent");
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
					var Objectid = SiebelApp.S_App.GetProfileAttr("VHA Cotact Primary Id");
					var getflags = getdetails(Objectid);
					PhnVerifyFlag_step2 = getflags["Contact Number Validated"];
					EmailVerifyFlag_step2 = getflags["Email Address Validated"];
					 if (AuthmethodType === "phone"){
						 if (PhnVerifyFlag_step2 === 'Y'){
						 $("#vha-step2-phone-traingexclm").addClass("displaynone");
						 $("#vha-step2-phone-tickmark").removeClass("displaynone");
						 $(this).addClass("displaynone");
						// $("#valiadte-phone").addClass("displaynone");
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
						// $("#valiadte-email").addClass("displaynone");
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
			 $(".vha-ret-validate-form-btn").on('click', function(){
				 if(OtpStep2 != "") {
					  if (AuthmethodType === "phone")
						var userotp = $("#vha-phoneinput-Id").val();
					  else
						 var userotp = $("#vha-emailinput-Id").val();
					 
					 if ( userotp === OtpStep2){
						 verifiedStep2 = "Y";
						// alert("verified");
						if (AuthmethodType === "email"){
							$('.emailauthSuccess').removeClass("displaynone");
							$('.emailauthFail').addClass("displaynone");
							const selectedRadio = document.querySelector('input[name="authMethod"]:checked');
							if (selectedRadio) {
								selectedRadio.checked = false;
							}
						}		
						if (AuthmethodType === "phone"){
							$('.phoneauthSuccess').removeClass("displaynone");
							$('.phoneauthFail').addClass("displaynone");
							const selectedRadio = document.querySelector('input[name="authMethod"]:checked');
							if (selectedRadio) {
								selectedRadio.checked = false;
							}
						}
	
						
					 }
					 else{
						 verifiedStep2 = "N";
						// alert("enter correct otp");
						if (AuthmethodType === "email"){
							$('.emailauthSuccess').addClass("displaynone");
							$('.emailauthFail').removeClass("displaynone");
						}		
						if (AuthmethodType === "phone"){
							$('.phoneauthSuccess').addClass("displaynone");
							$('.phoneauthFail').removeClass("displaynone");
						}
					 }
						 
				 }
				  
			 });		   
		    $("#vha-email-send-otp-btn").on('click', function(){
				$(this).hide();
				//$("#email-status").text("Email sent").show();
				$("#vha-email-send-otp-parent").removeClass("displaynone");				
				var showotp;
				$('#vha-emailinput-Id').val('');
				$(".emailauthSuccess").addClass("displaynone");
				$(".emailauthFail").addClass("displaynone");
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
				 // if (showotp === "")
				  $("#vha-email-resend-otp-btn").show();
				 },0);
			});
			
			$("#vha-phone-send-otp-btn").on('click', function(){
				$(this).hide();
				//$("#phone-status").text("SMS sent").show();
				 $("#vha-phone-send-otp-parent").removeClass("displaynone");				
				var showotp;
				 $('#vha-phoneinput-Id').val('');
				 $(".phoneauthSuccess").addClass("displaynone");
				 $(".phoneauthFail").addClass("displaynone");
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
				//  if (showotp === "")
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
		 
		 //authentication end
	 setTimeout(function () {
	 $('#creditCheckBtn').on('click',function(){
		var accRowid = $("#accountRowId").text();
		var Inputs = SiebelApp.S_App.NewPropertySet();
		var Output = SiebelApp.S_App.NewPropertySet();
		var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
		Inputs.SetProperty("Service Name", "VHA Get Credit Check Details BS");
		Inputs.SetProperty("Method Name", "GetCreditCheckDetails");
		Inputs.SetProperty("AccountId", accRowid);
		var Output = ser.InvokeMethod("Run Process", Inputs);
		var ResultSet = Output.GetChildByType("ResultSet");
		var crStatus = ResultSet.GetProperty("Status");
		var expiryDate = ResultSet.GetProperty("Expiry Date");
		var connections = ResultSet.GetProperty("Connections");
		var equipmentLimit = ResultSet.GetProperty("Equipment Limit");
		var creditStatusMessage = ResultSet.GetProperty("Credit status message");
		creditCheckData(crStatus,expiryDate,connections,equipmentLimit,creditStatusMessage)
	  });
	 },1000);		


  $('.Launch-Rec-btn').on('click',function(e){
  //$('#LaunchButton').on('click',function(e){
		 e.preventDefault(); // Prevent default link behavior 
		 var loginUserID = SiebelApp.S_App.GetProfileAttr("Login Name");
		var serPega = SiebelApp.S_App.GetService("Workflow Process Manager");
		var inputsPega = SiebelApp.S_App.NewPropertySet();
		var outputsPega = SiebelApp.S_App.NewPropertySet()
		inputsPega.SetProperty("ProcessName", "VHA Pega Launch Recommendation WF");
		//inputsPega.SetProperty("CustomerAccountNumber","2-27370296087");
		//inputsPega.SetProperty("CustomerAccountId","2-CKNKFMF");
		var accrowId =$("#accountRowId").text();
		var cusNum = $('#accountRowId').attr('cusNum');
		inputsPega.SetProperty("CustomerAccountNumber",cusNum);
		inputsPega.SetProperty("CustomerAccountId",accrowId);
		inputsPega.SetProperty("LoginId",loginUserID);
		outputsPega = serPega.InvokeMethod("RunProcess", inputsPega);
		//var PegeOutput = outputsPega.GetChildCount();
		console.log(outputsPega);
		
		var ranNumber = 100000 + Math.floor(Math.random() * 999999);
		//console.log('random_number'+ranNumber );
		 		 		 
		var url = 'https://tpgtel-nbaa-dt1.pega.net/prweb/CRMAgentCustomAuth/app/sage-advisor-drop1_'+ranNumber;
		var jwtToken = outputsPega.childArray[0].propArray.JWTToken;
		//loadUrlWithJWT(url, jwtToken);
		
		//STEP1: With Query Param
			var params = {
				token: outputsPega.childArray[0].propArray.JWTToken				
			};
			url = [url, $.param(params)].join('?');			
			window.open(url);
		
	 });
	 
		function loadUrlWithJWT(url, jwtToken) {
		  $.ajax({
			url: url,
			type: 'GET',
			headers: {'Authorization': jwtToken},
			success:function(response){
				window.open(url);
			},
			error:function(response){
				window.open(url);
				 console.error('Error loading URL:', response.status);
			}			
		  });
		 		  
		}
	
  }

    VHACustomerDashboardViewPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHACustomerDashboardViewPR.superclass.BindData.apply(this, arguments);
	//$("div[id^='pg_pager']").hide();
	$('[aria-label^="Active Public Notes List Applet:"]').addClass('displaynone');
	$('[aria-label="Active Public Notes List Applet: Menu"]').addClass('displaynone');
	$('[aria-label="Active Public Notes List Applet:Show More"]').addClass('displaynone');
	/* NBA Offer Code*/
	$('[aria-label="Next Best Activity (NBA) Offers List Applet: Menu"]').addClass('displaynone');
	/* NBA Offer Code*/
	//$('.vha-img-applet9').append('<div><h2>Credit check</h2></div><div class="credit-check-container"><button id="creditCheckBtn" class = "creditCheck">Show credit check</button><p>On click, your user details will be logged for verification</p></div>');
	$('.vha-img-applet9').append('<div><h2>Credit check</h2></div><div class="credit-check-container"><button id="creditCheckBtn" class = "creditCheck">Show credit check</button><p>On click, your user details will be logged for verification</p></div>\
<div id = "creditcheckresult" class="creditcheckshowmore displaynone">\
    <div class="creditcheckrow">\
        <div class="creditchecklabel">Status</div>\
        <div id="status"class="creditcheckvalue"><span class="info-icon">i</span></div>\
    </div>\
    <div class="creditcheckrow">\
        <div class="creditchecklabel">Expiry date</div>\
        <div id="expdate" class="creditcheckvalue"></div>\
    </div>\
    <div class="creditcheckrow">\
        <div class="creditchecklabel">Connections</div>\
        <div id="connections" class="creditcheckvalue"></div>\
    </div>\
    <div class="creditcheckrow">\
        <div class="creditchecklabel">Equipment limit</div>\
        <div id="limit" class="creditcheckvalue"></div>\
    </div>\
</div>');	

$('div[aria-label="Recent activities in Customer Accounts"]').find('.ui-jqgrid-pager').remove();
	/*if ($("table[summary='Recent activities']").find('.viewAllactivitiesadded').length === 0) {
		$("table[summary='Recent activities']").after('<div id="viewAllactivities"><a id="viewAllactivitieslink" href="#" tabindex="1">View all activities</a></div>');
		$("table[summary='Recent activities']").addClass('viewAllactivitiesadded');
		}*/
					//var appletName =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Public Notes Applet");
		/*var srCount = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Service Requests Applet").GetPModel().Get("GetRecordSet").length;
		var assetCount = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet").GetPModel().Get("GetRecordSet").length;
		var notesCount = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Public Notes Applet").GetPModel().Get("GetRecordSet").length;
		
		
		
		
		if ($("table[summary='Recent activities']").find('.viewAllactivitiesadded').length === 0) {
		$("table[summary='Recent activities']").after('<div id="viewAllactivities"><a id="viewAllactivitieslink" href="#" tabindex="1">View all activities</a></div>');
		$("table[summary='Recent activities']").addClass('viewAllactivitiesadded');
		}
		if(srCount > 0)
		{
			if ($("table[summary='Active Service Requests']").find('.pagenavigationadded').length === 0) {
			$("table[summary='Active Service Requests']").after('<div id="pagenavigationSR" class="pagenavigation"><div><img id="srstepback" src="images/custom/StepBackward.svg"></div><div><img id="CaretLeft" src="images/custom/CaretLeft.svg"></div><div><img id="CaretRight" src="images/custom/CaretRight.svg"></div><div><img id="StepForward" src="images/custom/StepForward.svg"></div></div>');
			$("table[summary='Active Service Requests']").addClass('pagenavigationadded');
				}
		}
		else{
			$("#pagenavigationSR").remove();
		}
		if(assetCount > 0)
		{
			if ($("table[summary='Assets & Billing']").find('.pagenavigationadded').length === 0) {
			$("table[summary='Assets & Billing']").after('<div id="pagenavigationAsset" class="pagenavigation"><div><img id="stepback" src="images/custom/StepBackward.svg"></div><div><img id="CaretLeft" src="images/custom/CaretLeft.svg"></div><div><img id="CaretRight" src="images/custom/CaretRight.svg"></div><div><img id="StepForward" src="images/custom/StepForward.svg"></div></div>');
			$("table[summary='Assets & Billing']").addClass('pagenavigationadded');
			}
		}
		else{
			$("#pagenavigationAsset").remove();
		}
		
		if(notesCount > 0)
		{
			
			if ($("table[summary='Active Public Notes']").find('.pagenavigationadded').length === 0) {
			$("table[summary='Active Public Notes']").after('<div id="pagenavigationNotes" class="pagenavigation"><div><img id="stepback" src="images/custom/StepBackward.svg"></div><div><img id="CaretLeft" src="images/custom/CaretLeft.svg"></div><div><img id="CaretRight" src="images/custom/CaretRight.svg"></div><div><img id="StepForward" src="images/custom/StepForward.svg"></div></div>');
			$("table[summary='Active Public Notes']").addClass('pagenavigationadded');
			}
			
		}
		else{
			$("#pagenavigationNotes").remove();
		}*/

		/*var assetApplet =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Recent Activities Applet");
		var pm = assetApplet.GetPModel();
		var recordSet = pm.Get("GetRecordSet");
		console.log(recordSet);
		console.log(recordSet.length);
		//var act = $("[aria-label='Recent activities in Accounts']").find('.siebui-row-counter');
		if (recordSet.length == 0)
		{
			recenttbody = $("table[summary='Recent activities']").find('tbody')
			recenttbody.append('<tr> class "assetMoreInfo"><td Id ="newformtd" colspan="3">No user-generated activities</td></tr>');
		}*/
	
	var accRowid = $("#accountRowId").text();
	changeBillingAccountList(accRowid);
	var view = SiebelApp.S_App.GetActiveView();
	var appletMap = view.GetAppletMap();
	var myApplet = appletMap["VHA Customer Dashboard Public Notes Applet"];
	var pm = myApplet.GetPModel();
	var AppletId = pm.Get("GetFullId");
	var publicNoteApplet = "s_"+AppletId+"_div";
	$("#s_" + AppletId + "_div").addClass("publicNotestable")
	var tableheader = $("#s_" + AppletId + "_div").find('.ui-jqgrid-hbox')
	$(tableheader).hide();
	$('[aria-label^="Public Notes List Applet"]').hide();
	/*$("#viewAllactivitieslink").on('click', function(){
			event.preventDefault();
			console.log("viewall Act");
			var accRowid = $("#accountRowId").text();
			GotoviewwithrowId("Account Detail - Activities View",accRowid,"VHA SIS Account Entry Applet","Account","Account");
			
			}); */
	
	 $('.refreshbtnnbaoffer').on('click',function(){
			console.log("NBA Offer Cod");
			//$("table[summary='Next Best Activity (NBA) Offers']").find('tbody').empty();
			var RetrieveButton  = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetControls()["Retrieve"].GetInputName();
			$('[name="'+RetrieveButton+'"]').trigger("click");
			 //$('.RecentIntractionsretailButton').click();
			 setTimeout(function() {
				console.log("on change triggerd"+ $("#s_S_A1_div").find(".siebui-row-counter").text());
				$(".vha-img-applet5").find('.siebui-row-counter').addClass("nbaofferCounter");
				rowCounter = $(".vha-img-applet5").find(".siebui-row-counter");
				//$(".vha-img-applet5").find(".pagenavigation").prepend(rowCounter);
				var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId");
				//$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").append(rowCounter);
				$("#s_"+AssetAppletId+"_div").find(".ui-corner-bottom").prepend(rowCounter);
				$(".vha-img-applet5").addClass("rowCounterismoved");
					$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().removeClass('displaynone');
					$("#s_"+AssetAppletId+"_div").find('.siebui-row-counter').removeClass('onlycounterNBAoffer');
					$(".vha-img-applet5").find('.siebui-row-counter').removeClass("displaynone");
					if($("#s_"+AssetAppletId+"_div").find(".siebui-row-counter").text() == "No Records")
					{
						$(".vha-img-applet5").find('.siebui-row-counter').addClass("displaynone");
						$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
					}
					if($("#s_"+AssetAppletId+"_div").find(".siebui-row-counter").text().slice(-1) != "+")
					{
						$(".vha-img-applet5").find('.siebui-row-counter').addClass("onlycounterNBAoffer");
						$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
						//$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().hide();
					}
			
		  },3000);
			
		 });
			/*$("#s_S_A1_div").find(".siebui-row-counter").on('change',function(){
			console.log("on change triggerd"+ $("#s_S_A1_div").find(".siebui-row-counter").text());
			
			});
			 $('.RecentIntractionsretailButton').on('click',function(){
		 
				var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId");
				var offerCount = $('#' + AssetAppletId + "_div").find(".siebui-row-counter").text();
				console.log("RecentIntractionsretailButton ", offerCount);
				console.log("RecentIntractionsretailButton: ", SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetRecordSet().length);
				 });*/
    }
	//$(document).on('click','#creditCheckBtn', function() {
$("#srstepback").on('click', function(){
		event.preventDefault();
		console.log("steback without table context");
		}); 
		
	
    VHACustomerDashboardViewPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHACustomerDashboardViewPR.superclass.BindEvents.apply(this, arguments);
	 
	 	  $('.vha-img-tabs-li').on('click',function(){
			  $('.vha-img-tab1-btn').removeClass('vha-img-activeTab');
			  $(this).find('button').addClass('vha-img-activeTab');			
			  changeAccDetails(this.getAttribute('data-rowid'));
			  showLinkedContact(this.getAttribute('data-rowid'));
			  recentIntractions(this.getAttribute('data-rowid'));
			  changeAccount(this.getAttribute('data-rowid'));
			  getOverduedetails(this.getAttribute('data-rowid'));
			  changeBillingAccountList(this.getAttribute('data-rowid'));
			  creditCheckUI();
			  var accRole = this.getAttribute('acccontactrole');
			  limiteduser(this.getAttribute('data-rowid'),accRole);
			  overdueAccountvalidation(this.getAttribute('data-rowid'));
			  //limiteduser("2-CL193UC");
			  
		 });
		 
		  /* NBA Offer Code*/
		 $('.vha-img-recentInttabs').on('click',function(){ 
			$('.RecentIntractionsretail').removeClass('displaynone');
			$('.vha-img-recentInttabs').addClass('recentactive');
			$('.vha-img-recentInttabsnba').removeClass('recentactive');
			$('.NBAOffers').addClass('displaynone');
			$("#s_" + SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId") + "_div").addClass('displaynone');
			//$("#s_" + SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId") + "_div").hide();
			$('.vha-img-recentInttabsnba').removeClass('recentactive');
		 });
		  $('.vha-img-recentInttabsnba').on('click',function(){ 
			$('[aria-label="Next Best Activity (NBA) Offers List Applet: Menu"]').addClass('displaynone');
			$('.RecentIntractionsretail').addClass('displaynone');
			$('.vha-img-recentInttabs').removeClass('recentactive');
			$('.NBAOffers').removeClass('displaynone');
			$("#s_" + SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId") + "_div").removeClass('displaynone');
			//$("#s_" + SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId") + "_div").show();
			$('.vha-img-recentInttabsnba').addClass('recentactive');
		 });
		 
		/* $('.refreshbtnnbaoffer').on('click',function(){
			console.log("NBA Offer Cod");
			var RetrieveButton  = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetControls()["Retrieve"].GetInputName();
			$('[name="'+RetrieveButton+'"]').trigger("click");
			
			// Wait for 2 seconds before fetching the count (Adjust delay if needed)
			setTimeout(function() {
				var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId");
				var offerCount = $('#' + AssetAppletId + "_div").find(".siebui-row-counter").text();
				console.log("Offer Count After Refresh: ", offerCount);
				onDataLoadComplete(offerCount);
			}, 8000); // Delay in milliseconds (2000 ms = 2 seconds)
			function onDataLoadComplete(offerCount) {
				console.log("Data Load Completed. Offer Count: ", offerCount);
				// Add additional logic here if needed
			}
		 });*/
		  /* NBA Offer Code*/
		 	/*$("#viewAllactivitieslink").on('click', function(){
			event.preventDefault();
			console.log("viewall Act");
			var accRowid = $("#accountRowId").text();
			GotoviewwithrowId("Account Detail - Activities View",accRowid,"VHA SIS Account Entry Applet","Account","Account");
			
			}); */
		 		  $('.accDropdown').on('change',function(){
			  $('.vha-img-tab1-btn').removeClass('vha-img-activeTab');
			  $(this).find('button').addClass('vha-img-activeTab');		
					
			 $('.vha-img-tabs-li').find('#A5Role').text();
			 $('.vha-img-tabs-li').find('#A5Name').text();
			 var lastLiValue = $('.vha-img-tabs-li').find('#A5Role').text() +" "+ $('.vha-img-tabs-li').find('#A5Name').text();
			 var LastLiRowId = $('.vha-img-tabs-li').find('#A5Name').parents('li').attr('data-rowid');
			 var lastLiRowRole = $('.vha-img-tabs-li').find('#A5Name').parents('li').attr('acccontactrole');
			 $('.accDropdown').append('<option value="'+lastLiValue+'" data-rowid="'+LastLiRowId+'" acccontactrole="'+lastLiRowRole+'">'+lastLiValue+'</option>');
			 
			 var selectedRowID = $('.accDropdown option:selected').attr('data-rowid');			 
			 var acccontactrole = $('.accDropdown option:selected').attr('acccontactrole');			 
			 
			 document.getElementById("A5Role").textContent = $(this).val().split(",")[0];
			 document.getElementById("A5Name").textContent = $(this).val().split(",")[1];
			 $('#A5Role').parents('li').attr('acccontactrole',acccontactrole);
			 $("#A1Name").parent().parent().attr('data-rowID',selectedRowID);
			 $('.accDropdown option:selected').remove();
				 					 
			  changeAccDetails(selectedRowID);
			  showLinkedContact(selectedRowID);
			  recentIntractions(selectedRowID);
			  changeAccount(selectedRowID);
			  changeBillingAccountList(selectedRowID);
			  getOverduedetails(selectedRowID);
			  creditCheckUI();
			  limiteduser(selectedRowID,acccontactrole);
			  overdueAccountvalidation(selectedRowID);
			  
			  //limiteduser("2-CL193UC");
		 });
	 // $('#vha-cont-prof-skipbtn').text('Cancel');
		  //$('#valiadte-phone').text("Unverified");
		  //$('#valiadte-email').text("Unverified");
		  
	   $('#vha-img-ap2-Go-btn').on('click',function(){
	console.log("Go Button");
	  });
	
	  
	  $('#updateId').on('click',function(){
		event.preventDefault();
		var accRowid = $("#accountRowId").text();
		GotoviewwithrowId("VF Contact Id View",accRowid,"VHA SIS Account Entry Applet","Account","Account");
		});
	  
	  
	  $('#ViewLinkedContact').on('click',function(){
		event.preventDefault();
		$("#Linkedcontact").removeClass("Linkedcontactdisplaynone");
		var accRowid = $("#accountRowId").text();
		CreateLinkTable(accRowid);
		});
		/*$('.refreshbtn').on('click',function(){
		event.preventDefault();
		console.log("Refresh Clicked");
		var accRowid = $("#accountRowId").text();
		recentIntractions(accRowid);
		});*/
		
		$('.refreshbtn').on('click',async function () {
			event.preventDefault();
        const loadingIcon = $("#loadingIcon");
        loadingIcon.show(); // Show the loading icon
        try {
          await refresh(); // Call your function here
        } finally {
          loadingIcon.hide(); // Hide the loading icon
        }
		});
	
		
		async function refresh() 
		{
			return new Promise((resolve) => {
			  setTimeout(() => {
				console.log("Table created");
				var accRowid = $("#accountRowId").text();
				recentIntractions(accRowid);
				resolve();
			  }, 3000); // Simulate a delay for the operation
			});
		}
		
		$("#closeLinkedcon").on('click', function(){
			$("#Linkedcontact").addClass("Linkedcontactdisplaynone");
	    }); 
		$(document).unbind().on('click','.gotoviewLinkedContact', function(event) {			
			event.preventDefault();
			  console.log("GotoView Clicked")
			  //var conId = $('.gotoviewLinkedContact').attr('Contactid');
			  var conId = $(this).attr('Contactid');
			  SiebelApp.S_App.SetProfileAttr("VHA Cotact Primary Id",conId);
			  //GotoviewwithrowId("VHA Customer Dashboard View","","","VHA Customer Dashboard","");
			  SiebelApp.S_App.GotoView("VHA Customer Dashboard View");
	    });	
		

		
		$(document).on('click','#Contactid',function(event){
			event.preventDefault();
		});

		
		$(".vha-ret-popup-close-btn").on('click', function(){
			$("#Linkedcontact").addClass("Linkedcontactdisplaynone");
	    }); 
		
		/*default Drilldownaccount Code */
		/*$('.vha-img-tabs-li[drilldownaccount="Yes"]').click();
		$('.accDropdown option[drilldownaccount="Yes"]').prop('selected',true);
		$('.accDropdown option[drilldownaccount="Yes"]').change();*/
		/*default Drilldownaccount Code */
	
    }

    VHACustomerDashboardViewPR.prototype.EndLife = function () {
     SiebelAppFacade.VHACustomerDashboardViewPR.superclass.EndLife.apply(this, arguments);
	 
    }
    // custom functions 
	function creditCheckUI(){
	$('#creditcheckresult').addClass('displaynone');
	$('.credit-check-container').removeClass('displaynone');
	}
	function changeBillingAccountList(accRowID)
	{
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Output = SiebelApp.S_App.NewPropertySet();
			var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			Inputs.SetProperty("Service Name", "VHA Get Billing Accounts BS");
			Inputs.SetProperty("Method Name","GetBillingAccounts");
			Inputs.SetProperty("AccountId",accRowID);
			var Output = ser.InvokeMethod("Run Process",Inputs);
			var ResultSet = Output.GetChildByType("ResultSet");
			var billingAccounts1 = ResultSet.GetProperty("BillAccNum");
			var BillAccNum = ResultSet.GetProperty("BillAccNum");
			var BANList = ResultSet.GetProperty("BANList");
			var customerAccountRowId = ResultSet.GetProperty("customerAccountRowId");
			var BillingAccountRowIdList = ResultSet.GetProperty("BillingAccountRowIdList");
			var StatusList = ResultSet.GetProperty("StatusList");

			if (BillingAccountRowIdList != "" && BillingAccountRowIdList != null && BillingAccountRowIdList != undefined)
			{
			var listofBillingAccounts = BANList.split(",");
			var billAccRowIds = BillingAccountRowIdList.split(",");
			$('#billingAccounts').empty();
			$('#billingAccounts').append('<option value="View all">View all</option>');
			for (let i =0; i < listofBillingAccounts.length; i++){ 
				//$('#billingAccounts').append('<option value="'+accDetails+'" data-rowid='+AccRowId[i]+'>'+accDetails+'</option>');
				//$('#billingAccounts').append('<option value="'+listofBillingAccounts[i]+'">'+listofBillingAccounts[i]+'</option>');
				$('#billingAccounts').append('<option value="'+listofBillingAccounts[i]+'" billAccrowid='+billAccRowIds[i]+'>'+listofBillingAccounts[i]+'</option>');
			}
						if(listofBillingAccounts.length == 1)
						{
								oneBillingAccount(BANList);
						}
						else{
								$(".billing-container").addClass("displaynone");
								$(".billing-containerprepay").addClass("displaynone");
								$(".baselection").addClass("displaynone");
								$("#allactiveAssets").text("All active assets");
								$('#billingAccounts').prop('disabled',false)
						}
			}
			else{
						$('#billingAccounts').empty();
						$('#billingAccounts').append('<option value="View all">View all</option>');
						$(".billing-container").addClass("displaynone");
						$(".billing-containerprepay").addClass("displaynone");
						$(".baselection").addClass("displaynone");
						$("#allactiveAssets").text("All active assets");
						$('#billingAccounts').prop('disabled',false)
				}
			
	}
function creditCheckData(crStatus,expiryDate,connections,equipmentLimit,creditStatusMessage){
		$('#creditcheckresult').removeClass('displaynone');
		$('.credit-check-container').addClass('displaynone');
		 $("#status").text(crStatus);
		 $("#expdate").text(expiryDate);
		 $("#connections").text(connections);
		 $("#limit").text(equipmentLimit);
		 $("#status").append('<span class="info-icon">i<span class="tooltip-text">'+creditStatusMessage+'</span></span>');
	}
	function limiteduser(AccId,AccRole)
	{
	$('.limitedcontainer').remove();
	//$('.vha-img-lineheight').css('margin-top','0px');
	$('#customerAddressDetails').css('margin-top','0px');
	console.log(AccRole);
	if (AccRole == "Limited User" || AccRole == "LimitedUser")
	{
	var ser=SiebelApp.S_App.GetService("VF BS Process Manager");
	var Inputs=SiebelApp.S_App.NewPropertySet();
	var Output=SiebelApp.S_App.NewPropertySet();
	Inputs.SetProperty("Service Name","VF SS Inbound Query Logic");
	Inputs.SetProperty("Method Name","GetAssetDetails");
	Inputs.SetProperty("AccId",AccId);
	Output=ser.InvokeMethod("Run Process",Inputs);
	var prop=Output.GetChildByType("ResultSet");
	var assets = prop.GetProperty("FullAsset");
	var address = prop.GetProperty("NBNAddress");
	//var address = "U 1503 618 Fake Street, Redfern NSW 2000";
			if (assets!="" && assets != undefined && address!="" && address != undefined)
			{
			//$('.vha-img-lineheight').css('margin-top','-7px');
			$('.limitedcontainer').remove();
			//$('.vha-img-lineheight').css('margin-top','125px');
			//$('#customerAddressDetails').css('margin-top','125px');
				//$('<div class="limitedcontainer"><div class="limitedcontent"><span class="info-icon">i</span><p class="text">This contact has limited user access to the following assets:</p></div><div class="limitedasset-info"><span class="limitedbullet">•</span><span id="msisdn">MSISDN +"'assets'"+</span><br><span class="limitedbullet">•</span><span id="address">Service address</span></div></div>').prependTo('.vha-img-cust1');
				$('#limitedcontainerplaceholderspan').append('<div class="limitedcontainer">\
					<div class="limitedcontent">\
						<span class="info-icon">i</span>\
						<p class="text">This contact has limited user access to the following assets:</p>\
					</div>\
					<div class="limitedasset-info">\
					<div id ="limitedmsisdn"><span class="limitedbullet">•</span><span id="msisdn">MSISDN '+assets+'</span></div><br>\
					<div id ="limitedaddress"><span class="limitedbullet">•</span><span id="address">Service address '+address+'</span>\</div>\
				</div>');
			}
			else{
				if(assets !="" && assets != undefined) 
				{
					//$('.vha-img-lineheight').css('margin-top','-7px');
					$('.limitedcontainer').remove();
					//$('.vha-img-lineheight').css('margin-top','125px');
					//$('#customerAddressDetails').css('margin-top','125px');
						//$('<div class="limitedcontainer"><div class="limitedcontent"><span class="info-icon">i</span><p class="text">This contact has limited user access to the following assets:</p></div><div class="limitedasset-info"><span class="limitedbullet">•</span><span id="msisdn">MSISDN +"'assets'"+</span><br><span class="limitedbullet">•</span><span id="address">Service address</span></div></div>').prependTo('.vha-img-cust1');
						$('#limitedcontainerplaceholderspan').append('<div class="limitedcontainer">\
							<div class="limitedcontent">\
								<span class="info-icon">i</span>\
								<p class="text">This contact has limited user access to the following assets:</p>\
							</div>\
							<div class="limitedasset-info">\
							<div id ="limitedmsisdn"><span class="limitedbullet">•</span><span id="msisdn">MSISDN '+assets+'</span></div><br>\
						</div>');
				}
				if(address !="" && address != undefined)
				{
				   //$('.vha-img-lineheight').css('margin-top','-7px');
					$('.limitedcontainer').remove();
				//$('.vha-img-lineheight').css('margin-top','125px');
				//$('#customerAddressDetails').css('margin-top','125px');
				//$('<div class="limitedcontainer"><div class="limitedcontent"><span class="info-icon">i</span><p class="text">This contact has limited user access to the following assets:</p></div><div class="limitedasset-info"><span class="limitedbullet">•</span><span id="msisdn">MSISDN +"'assets'"+</span><br><span class="limitedbullet">•</span><span id="address">Service address</span></div></div>').prependTo('.vha-img-cust1');
				$('#limitedcontainerplaceholderspan').append('<div class="limitedcontainer">\
					<div class="limitedcontent">\
						<span class="info-icon">i</span>\
						<p class="text">This contact has limited user access to the following assets:</p>\
					</div>\
					<div class="limitedasset-info">\
					<div id ="limitedaddress"><span class="limitedbullet">•</span><span id="address">Service address '+address+'</span>\</div>\
				</div>');
				}
			}
		}
	}
	function oneBillingAccount(selVal)
	{
			$('#billingAccounts').val(selVal);
			$('#billingAccounts').prop('disabled',true);
			$(".billing-container").removeClass("displaynone");
			$(".baselection").removeClass("displaynone");
			$("#allactiveAssets").text("Active assets");
			//var selAcc = selVal.match(/^\d+/);
			var selAcc = selVal.split(' (');
			var type = selVal.match(/\(([^)]+)\)/);
			var selectedbillAcc = selAcc ? selAcc[0] : null;
			//var selectedbillAcc = selVal.split(' (')[0];
			assetApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
			 controls = assetApplet.GetControls();
			 queryBillingAcc = controls["Query BA"].GetInputName();
			SiebelApp.S_App.SetProfileAttr("BillActId",selectedbillAcc);
			//$('[name="'+queryBillingAcc+'"]').trigger("click");
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Output = SiebelApp.S_App.NewPropertySet();
			var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			Inputs.SetProperty("Service Name", "VHA Get Invoice Details BS");
			//Inputs.SetProperty("Method Name", "GetInvoiceDetails");
			Inputs.SetProperty("Method Name", "GetLatestInvoice");
			Inputs.SetProperty("AccountNum", selectedbillAcc);
			var Output = ser.InvokeMethod("Run Process", Inputs);
			var ResultSet = Output.GetChildByType("ResultSet");
			var billAccNum = ResultSet.GetProperty("BillAccNum");
			var paymentmethod = ResultSet.GetProperty("Payment method");
			var billingStatus = ResultSet.GetProperty("Billing Status");
			var lastInvoice = ResultSet.GetProperty("Last Invoice");
			var totalAmountDue = ResultSet.GetProperty("Total Amount Due");
			var overdueAmount = ResultSet.GetProperty("Overdue Amount");
			var dueDate = ResultSet.GetProperty("Due Date");
			var invoiceStatus = ResultSet.GetProperty("Invoice Status");
			var formattedOutput = ResultSet.GetProperty("Formatted output");
			let formatteddOverDue = formatDate(dueDate);
			var invoiceRowId = ResultSet.GetProperty("Invoice Row id");
			if(window.location.href.indexOf("care") !== -1 ){
				var application = "care";				 
			}
			else{
				var application = "";	
			}
			if (paymentmethod =="Prepay")
			{
			Inputs.SetProperty("Method Name", "GetATRStatus");
			Inputs.SetProperty("AccountNum", selectedbillAcc);
			var OutputATR = ser.InvokeMethod("Run Process", Inputs);
			var ResultSet1 = OutputATR.GetChildByType("ResultSet");
			var Automaticrecharge = ResultSet1.GetProperty("Automatic Recharge");
			}
			console.log(Output);
			console.log(type[1]);
			//console.log(this.getAttribute('billAccrowid'));
			$(".billing-container").removeClass("displaynone");
			$(".billing-container").removeClass("displaynone");
			$(".section").removeClass("displaynone");
			/*var billingStatus = "Active";
			var totalAmmountDue = "$212.82";
			var overDueammount = "$0.00";
			var latesinvoicenum = "#183524111";
			var invoiceDetails = "$212.82 due 22 Apr 2024 (Closed)";*/
			//$("#billingAccnum").text(selectedbillAcc);
			$("#billingAccnum").text(selVal);
			$("#billingStaus").text(billingStatus);
			if (totalAmountDue == undefined || totalAmountDue === "" )
			{
				totalAmountDue = "0.00" ;
			}
			if (overdueAmount === undefined || overdueAmount === "")
			{
				overdueAmount = "0.00";
			}
			if(application == "care")
			{
				$('.pay-bill').addClass('displaynone');
			}
			if (lastInvoice === undefined || lastInvoice === "")
			{
				lastInvoice = "N/A" ;
				$('.pay-bill').prop('disabled',true)
				$('.pay-bill').addClass('appletButtonDis');
				$('.generate-payment').prop('disabled',true)
				$('.generate-payment').addClass('appletButtonDis');
				/*$('.view-invoices').prop('disabled',true)
				$('.view-invoices').addClass('appletButtonDis');*/
				$('.view-invoices').addClass('buttondisabled');
				$('.view-invoices').attr("style","color:gray !important");
				$("#latesinvoicenum").replaceWith('<span id="invoiceNA">N/A</span>')
			}
			else{
				$('.pay-bill').prop('disabled',false)
				$('.pay-bill').removeClass('appletButtonDis');
				$('.generate-payment').prop('disabled',false)
				$('.generate-payment').removeClass('appletButtonDis');
				/*$('.view-invoices').prop('disabled',false)
				$('.view-invoices').removeClass('appletButtonDis');*/
				$('.view-invoices').removeClass('buttondisabled');
				$('.view-invoices').attr("style","color:white !important");
				if($('#invoiceNA').text() == "N/A")
				{
					$("#invoiceNA").replaceWith('<a id="latesinvoicenum" href="#" class="invoice-link billvalue2"></a>');
					var latestinvoice = $('#latesinvoicenum');
					latestinvoice.attr("InvoiceRowid",invoiceRowId);
				}
			}
			if (formattedOutput == "undefined" || formattedOutput == "" || formattedOutput == undefined)
			{
				formattedOutput = "" ;
			}
			else
			{
				if(dueDate!= "" && dueDate!= null && dueDate != undefined)
				{
				formattedOutput = "$"+overdueAmount+" due "+formatteddOverDue+"("+invoiceStatus+")";
				}
				else
				{
					formattedOutput = "" ;
				}
			}
			$("#totalAmmountDue").text("$"+totalAmountDue);
			$("#overDueammount").text("$"+overdueAmount);
			$("#latesinvoicenum").text("#"+lastInvoice);
			$("#latesinvoicenum").attr("InvoiceRowid",invoiceRowId);
			$("#invoiceDetails").text(formattedOutput);
			if (billingStatus == "Active")
			{
				//$("#billingStaus").prepend('<span id="activeicon"class="dot_Class_Active"></span>');
				 document.getElementById("billingStaus").innerHTML = "<div class='billingstatuspostpaidActive'><span class='tickmark' id='statusActive'></span><span id='statusActivetext'>Active</span></div>";
				console.log(billingStatus);
			}
			if (billingStatus == "Overdue")
			{
				//$("#billingStaus").prepend('<span class="dot_Class_Inactive"></span>');
				document.getElementById("billingStaus").innerHTML = "<div class='billingstatusOverdue'><div class='red-circle-Overdue'><span class='redtext'>!</span><span id='overdue'>Overdue</span></div></div>"
				//console.log(billingStatus);
			}
			if (billingStatus == "" || billingStatus == undefined)
			{
				//$("#billingStaus").prepend('<span class="dot_Class_Inactive"></span>');
				document.getElementById("billingStaus").innerHTML = "";
				//console.log(billingStatus);
			}

				if (paymentmethod =="Postpay")
				{
					$('.billing-container').removeClass('displaynone');
					$('.billing-containerprepay').addClass('displaynone');
					$('#selectBillingAcc').empty();
					$('#selectBillingAcc').append('<option value="Action">Actions</option>');
					$('#selectBillingAcc').append('<option value="View full billing account">View full billing account</option>');
					$('#selectBillingAcc').append('<option value="Update payment details">Update payment details</option>');
					$('#selectBillingAcc').append('<option value="Lodge service request">Lodge service request</option>');
					$('#selectBillingAcc').append('<option value="View orders">View orders</option>');
				}
				else if (paymentmethod =="Prepay")
				{
					$('.billing-container').addClass('displaynone');
					$('.billing-containerprepay').removeClass('displaynone');
					//$(".billing-status").text(billingStatus);
					$("#Automaticrecharge").text(Automaticrecharge);
					if (billingStatus == "Active")
					{
						//$(".billing-status").prepend('<span id="activeicon"class="dot_Class_Active"></span>');
						 $(".billing-status").append("<div class='billingstatusActive'><span class='tickmark' id='statusActive'></span><span id='statusActivetext'>Active</span></div>");
						console.log(billingStatus);
					}
					if (billingStatus == "Overdue")
					{
						//$(".billing-status").prepend('<span class="dot_Class_Inactive"></span>');
						//console.log(billingStatus);
						document.getElementById("billingStaus").innerHTML = "<div class='billingstatusOverdue'><div class='red-circle-Overdue'><span class='redtext'>!</span><span id='overdue'>Overdue</span></div></div>"
					}
					$('#selectBillingAcc').empty();
					$('#selectBillingAcc').append('<option value="Action">Actions</option>');
					$('#selectBillingAcc').append('<option value="View full billing account">View full billing account</option>');
					$('#selectBillingAcc').append('<option value="Update automatic recharge">Update automatic recharge</option>');
					$('#selectBillingAcc').append('<option value="Lodge service request">Lodge service request</option>');
					$('#selectBillingAcc').append('<option value="View orders">View orders</option>');
				}
				else
				{
					$('#selectBillingAcc').empty();
					$('#selectBillingAcc').append('<option value="Action">Actions</option>');
					$('#selectBillingAcc').append('<option value="View full billing account">View full billing account</option>');
					$('#selectBillingAcc').append('<option value="Lodge service request">Lodge service request</option>');
					$('#selectBillingAcc').append('<option value="View orders">View orders</option>');
				}
			//queryByBillingAccount(selectedbillAcc)
	}
	function formatDate(date) {
				const options = { day: '2-digit', month: 'short', year: 'numeric' };
				return new Date(date).toLocaleDateString('en-GB', options);
		}
	 function changeAccDetails(accRowIDDetail){
			 document.getElementById("primaryAddress").textContent = "";
			 document.getElementById("cApin").textContent = "";
			 document.getElementById("dom").textContent = "";
			 document.getElementById("orgVal").textContent = "";
			 document.getElementById("accountRowId").textContent = "";
			  
			var acccountRowId = accRowIDDetail;
			var AddressBS= SiebelApp.S_App.GetService("VHA Get Primary Address BS");
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet();
			Inputs.SetProperty("AccountId",acccountRowId);
			Outputs = AddressBS.InvokeMethod("FetchPrimaryAddress", Inputs);
			var ResultSet = Outputs.GetChildByType("ResultSet");
			var priAddress = ResultSet.GetProperty("Primary Address");
			var accName = ResultSet.GetProperty("Name");
			var dom = ResultSet.GetProperty("DOM");
			var pin = ResultSet.GetProperty("Pin");
			var org = ResultSet.GetProperty("Organization");
			var accRowId = ResultSet.GetProperty("Row Id");
			cusNum = ResultSet.GetProperty("Customer Number");
			var cusNumAttr =$('#accountRowId');
			cusNumAttr.attr("cusNum",cusNum);
			 document.getElementById("primaryAddress").textContent = priAddress;
			 document.getElementById("cApin").textContent = pin;
			 document.getElementById("dom").textContent = dom;
			 document.getElementById("orgVal").textContent = org;
			 document.getElementById("accountRowId").textContent = accRowId;
			 //primaryAddressLength();
			  $('.RecentIntractionsretail').removeClass('displaynone');
			$('.vha-img-recentInttabs').addClass('recentactive');
			$('.vha-img-recentInttabsnba').removeClass('recentactive');
			$('.NBAOffers').addClass('displaynone');
			$("#s_" + SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId") + "_div").addClass('displaynone');
			 
		 }
		 
		 function primaryAddressLength(){
			$('div span:contains("CA PIN")').css('margin-top','0px');
			if($('#primaryAddress').outerHeight() >37)
			{
			$('div span:contains("CA PIN")').css('margin-top','20px');
			$('#primaryAddress').css('line-height','25px');
			$('#primaryAddress').css('margin-top','5px');
			}
			else
			{
			$('div span:contains("CA PIN")').css('margin-top','0px');
			}
		}
		 	function showLinkedContact(accRowid){
		var LinkedConBS = SiebelApp.S_App.GetService("VHA Secondary Linked Contacts BS");
		var LCInputs = SiebelApp.S_App.NewPropertySet();
		var LCOutputs = SiebelApp.S_App.NewPropertySet();
		LCInputs.SetProperty("AccountId",accRowid);
		Outputs = LinkedConBS.InvokeMethod("FetchContacts", LCInputs);
		var temp = Outputs.GetChildByType("ResultSet");
        var dataa =temp.childArray;
		var linkedContactCount =dataa.length;
		if(linkedContactCount == 1)
		{
			 document.getElementById("ViewLinkedContact").innerHTML = "View linked contacts";
		}
		if(linkedContactCount == 0)
		{
			document.getElementById("ViewLinkedContact").innerHTML = "None";
		}
		if(linkedContactCount >1)
		{
			document.getElementById("ViewLinkedContact").innerHTML = "View "+linkedContactCount+" linked contacts";
		}
	}
	
				function recentIntractions(accRowid){
					if(displayPegaData ==="Y")
					{	
				var apilovurl = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_REST_API_URL' AND [List Of Values.Active]='Y'", { "All": "true" })[0].Description;
				
                if (TheApplication().GetProfileAttr("VHA User Type") === "Retail") {
                    apilovurl = apilovurl.replace("care", "retail");
                } 
					
		var ajaxPegaWFCall = {
			"async": true,
			"crossDomain": true,
			"url": apilovurl + "VHARestAPIWF/RunProcess",
			"method": "POST",
			"headers": {
				"content-type": "application/json",
				"cache-control": "no-cache",
				"postman-token": "5c1f0ef1-1226-5653-dba8-72a6c0e242c9"
			},
			
			"processData": false,
			"data": '{\r\n   "body":{\r\n      "ProcessName":"VHA REST API Wrapper Workflow",\r\n      "Transaction Name":"VHAPegaInteractionRESTAPI",\r\n      "Configuration List Type":"VHA_CMID_REST_API",\r\n      "CustomerID":"' + accRowid + '"\r\n}\r\n}'
		};
											
						/*var PegaSer = TheApplication().GetService("Workflow Process Manager");
						var PegaInput = TheApplication().NewPropertySet();
						PegaInput.SetProperty("ProcessName", "VHA REST API Wrapper Workflow");
						PegaInput.SetProperty("Transaction Name", "VHAPegaInteractionRESTAPI");
						PegaInput.SetProperty("Configuration List Type", "VHA_CMID_REST_API");
						PegaInput.SetProperty("CustomerID", accRowid);		
					    var PegaOutput = PegaSer.InvokeMethod("RunProcess", PegaInput);
						var ResponseFromAPI = PegaOutput?.childArray[0]?.childArray[0]?.childArray[0]?.childArray[0]?.childArray;
						var HTTPErrorCode = PegaOutput.propArray.HTTPErrorCode;						
						console.log(HTTPErrorCode);*/
						$.ajax(ajaxPegaWFCall).done(function (response) {
							if (response["Error Code"] != "" || response["Error Message"] != "") {
								console.log('ErrorAjaxPegaWF'+response);
							}
							else{
								console.log('successAjaxPegaWF'+response);
								
								//var PegaOutput = PegaSer.InvokeMethod("RunProcess", PegaInput);
								//var ResponseFromAPI = response?.childArray[0]?.childArray[0]?.childArray[0]?.childArray[0]?.childArray;
								var ResponseFromAPI = response.ApiResponse.PegaOfferHistory.OfferHistory;
								var HTTPErrorCode = response.HTTPErrorCode;															
					
					if (HTTPErrorCode != "")
					{	
						$("#vha-img-pega-offersTable tbody").html("");
						switch (HTTPErrorCode) {
							case "400":
								
								$('#vha-img-pega-offersTable').append('<tr> class "assetMoreInfo"><td Id ="newformtd" colspan="6">Customer Overview/Recent Interactions has encountered an error retrieving Accepted Recommendations.  Please try again.If the problem persists, please contact IT support quoting the following error: "Customer Overview>Recent Interactions/Pega error code 400: Bad Request"</td></tr>');
								break;
							case "403":
								
								$('#vha-img-pega-offersTable').append('<tr> class "assetMoreInfo"><td Id ="newformtd" colspan="6">Customer Overview/Recent Interactions has encountered an error retrieving Accepted Recommendations.  Please try again.If the problem persists, please contact IT support quoting the following error: "Customer Overview>Recent Interactions/Pega error code 403: Forbidden"</td></tr>');
								break;
							case "404":
								
								$('#vha-img-pega-offersTable').append('<tr> class "assetMoreInfo"><td Id ="newformtd" colspan="6">Customer Overview/Recent Interactions has encountered an error retrieving Accepted Recommendations.  Please try again.If the problem persists, please contact IT support quoting the following error: "Customer Overview>Recent Interactions/Pega error code 404: Not Found"</td></tr>');
								break;
							case "500":
								$('#vha-img-pega-offersTable').append('<tr> class "assetMoreInfo"><td Id ="newformtd" colspan="6">Customer Overview/Recent Interactions has encountered an error retrieving Accepted Recommendations.  Please try again.If the problem persists, please contact IT support quoting the following error: “Customer Overview>Recent Interactions/Pega error code 500: Internal Server Error”</td></tr>');
								break;
							case "429":
								$('#vha-img-pega-offersTable').append('<tr> class "assetMoreInfo"><td Id ="newformtd" colspan="6">You have sent too many requests.  Please wait and then try again. If the problem persists, please contact IT support quoting the following error: “Customer Overview>Recent Interactions/Pega error code 429: Too Many Requests”</td></tr>');
								
								break;
							case "200":
								console.log(HTTPErrorCode);
								break;
							default:
								$('#vha-img-pega-offersTable').append('<tr> class "assetMoreInfo"><td Id ="newformtd" colspan="6">Customer Overview/Recent Interactions has encountered an unexpected error retrieving Accepted Recommendations.  Please try again.If the problem persists, please contact IT support quoting the following error: “Customer Overview>Recent Interactions/Pega Unexpected Error” and describe your actions before the error appears.</td></tr>');
								                                      
							};
					}	
		if(HTTPErrorCode === "200")
		{
		if (ResponseFromAPI)
			{
							if(ResponseFromAPI.length == undefined){
								var responseApiLength = 1;
							}
							else{
								var responseApiLength = ResponseFromAPI.length;
							}
							//NewLogic-Start
							var newarray = [];
							for (let i =0; i<responseApiLength;i++)
							{
									var obj={};
									if(ResponseFromAPI.length == undefined){
										var item = ResponseFromAPI;}
									else{var item = ResponseFromAPI[i]; }
									
									obj.interactionID = item.InteractionID;
									obj.Source = item.Source;
									obj.StackabilityFlag = item.StackabilityFlag;
									obj.InteractionID = item.InteractionID;
										obj.BundleParent = item.BundleParent
										obj.Name = item.Name;
										obj.OutcomeDateTime = item.OutcomeDateTime;
										obj.EndDateTime = item.EndDateTime;
										obj.Outcome = item.Outcome;
										obj.BundleParent = item.BundleParent;
										obj.Label = item.Label;
										obj.KeyCode = item.KeyCode;
										obj.MSISDN = item.MSISDN
										obj.SAM_Product_ID = item.SAM_Product_ID;
										obj.RewardValue = item.RewardValue !== undefined ? item.RewardValue :"Parent";
										obj.BundleName = item.BundleName;
									newarray.push(obj);
							}
							//NewLogic-End
							var  filteredarray = newarray.filter((item)=> {
								//return item.BundleParent === "true" && (item.Source ==="Pega" || item.Source ==="SAS" || item.Source ==="sas")
								return (item.Source ==="Pega" || item.Source ==="SAS" || item.Source ==="sas") 
							});

							
							var data=[];
							var today = new Date();
							var todayUTC = today.getTime();
							//today.setHours(0,0,0,0);
						
							const dateObj = new Date();
							const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-
							const day = String(dateObj.getDate()).padStart(2, '0');
							const year = dateObj.getFullYear();
							const formattedDate = `${month}-${day}-${year}`;

							if(filteredarray.length >10)
							{
								var filteredarraylen = 10;
							}
							else
							{
								var filteredarraylen = filteredarray.length;
							}
							for (let index = 0; index < filteredarraylen; index++) {
								var item ={};
								item.InteractionID = filteredarray[index].InteractionID;
								item.BundleParent = filteredarray[index].BundleParent
								item.Summary= filteredarray[index].Name;
								item.Source = filteredarray[index].Source;
								item.BundleName = filteredarray[index].BundleName;
								var DataId = filteredarray[index].InteractionID+filteredarray[index].BundleName;
								//item.DataId = DataId.replace(/[-/]/g, "");
								item.DataId = DataId.replace(/[-/\s$]/g, "");
								/*if(filteredarray[index].Source ==="SAS" || filteredarray[index].Source ==="sas")
								{
									item.Description= filteredarray[index].KeyCode;
								}
								else{
									item.Description= filteredarray[index].Label;
								}*/
								item.Description= filteredarray[index].Label;
								if (filteredarray[index].MSISDN != "" && filteredarray[index].MSISDN != undefined)
								{
								item.ContextID= filteredarray[index].MSISDN;
								}
								else{
									item.ContextID = "n/a";
								}

								//item.DatePresented= filteredarray[index].OutcomeDateTime;
									
								var nDatePresented = filteredarray[index].OutcomeDateTime;
								const dateObj1 = new Date(nDatePresented);
								const Outcomemonth = String(dateObj1.getMonth() + 1).padStart(2, '0'); // Months are 0-
								const Outcomeday = String(dateObj1.getDate()).padStart(2, '0');
								const Outcomeyear = dateObj1.getFullYear();
								const Outcomehours = String(dateObj1.getHours()).padStart(2, '0'); // Hours (00-23)
								const Outcomeminutes = String(dateObj1.getMinutes()).padStart(2, '0'); // Minutes (00-59)
								const Outcomeseconds = String(dateObj1.getSeconds()).padStart(2, '0'); // Seconds (00-59)
								const formattedDatePresented = `${Outcomeday}/${Outcomemonth}/${Outcomeyear} ${Outcomehours}:${Outcomeminutes}:${Outcomeseconds}`;// //DD/MM/YYYY HH:MM:SS
								
								item.DatePresented= formattedDatePresented;
								
								var enddate = filteredarray[index].EndDateTime;
								const dateObj = new Date(enddate);
								const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-
								const day = String(dateObj.getDate()).padStart(2, '0');
								const year = dateObj.getFullYear();
								const hours = String(dateObj.getHours()).padStart(2, '0'); // Hours (00-23)
								const minutes = String(dateObj.getMinutes()).padStart(2, '0'); // Minutes (00-59)
								const seconds = String(dateObj.getSeconds()).padStart(2, '0'); // Seconds (00-59)
								const formattedEnddate = `${month}-${day}-${year}`;
								const formatteeEnddateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;// //DD/MM/YYYY HH:MM:SS

								if (new Date(formattedEnddate) > new Date(formattedDate))
								{
								//item.ExpiryDate= filteredarray[index].EndDateTime;
								item.ExpiryDate= formatteeEnddateTime;
								}
								else{
									item.ExpiryDate = "Expired";
								}
								item.Response= filteredarray[index].Outcome;
								data.push(item);
							}
							console.log(data);	
							if(data.length>0)
							{
								CreatePegaTable(data); 
								$("#recentIntractionsfooter").remove();
								$("#vha-img-pega-offersTable").after("<div id ='recentIntractionsfooter'>Showing last 10 interactions<\div>");
							}										
				}
				else
				{
					var row = $('<tr> class "nodata-recentAcc"><td id ="recentAcc-Nodata" colspan="6">No interactions in the past 90 days</td></tr>');	
					$("#vha-img-pega-offersTable tbody").html("");
					$("#vha-img-pega-offersTable tbody").append(row);
				}
		}
			else
			{
				console.log("HTTPError");
				var row = $('<tr> class "nodata-recentAcc"><td id ="recentAcc-Nodata" colspan="6">No interactions in the past 90 days</td></tr>');	
					$("#vha-img-pega-offersTable tbody").html("");
					$("#vha-img-pega-offersTable tbody").append(row);
			}
			//$("#vha-img-pega-offersTable").after("<div id ='recentIntractionsfooter'>Showing last 10 interactions<\div>");
			}
								
		});
	}
	else
	{
		console.log("recentIntractions is not called");
	}

}
//Billing Account overdue Validation
function overdueAccountvalidation(accRowid){
var ser=SiebelApp.S_App.GetService("VF BS Process Manager");
var Inputs=SiebelApp.S_App.NewPropertySet();
var Output=SiebelApp.S_App.NewPropertySet();
Inputs.SetProperty("Service Name","VHA Postpay Id Validation Service");
Inputs.SetProperty("Method Name","CallPrConBillAccount");
Inputs.SetProperty("CustId",accRowid);
Output=ser.InvokeMethod("Run Process",Inputs);	
var overDueBANum = Output.childArray[0].propArray.OverDueBANum;
var overDueBAexist = Output.childArray[0].propArray.OverDueRecFnd;
TheApplication().SetProfileAttr("overDueBANum",overDueBANum);
TheApplication().SetProfileAttr("overDueBAexist",overDueBAexist);

}
//Billing Account overdue Validation - End
function changeAccount(accRowid){
	TheApplication().SetProfileAttr("accRowId",accRowid);
	var accApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Account List Applet");
	var controls = accApplet.GetControls();
	var accQueryBtn = controls["ChangeAccount"].GetInputName();
	TheApplication().GetProfileAttr("VFConApproveAccntId");	
	$('[name="'+accQueryBtn+'"]').trigger("click");
}
	function CreatePegaTable(data){
		$("#vha-img-pega-offersTable tbody").html("");
		
		if ($("#vha-img-pega-offersTable").find("thead tr th#plus").length === 0 )
			{
				//$("#vha-img-pega-offersTable").find("thead tr").prepend('<th id ="plus"> </th>');
				$('.RecentIntractionsretail table').find("thead tr").prepend('<th id ="plus"> </th>')
				$('.RecentIntractions table').find("thead tr").prepend('<th id ="plus"> </th>')
			}
		//$("#vha-img-pega-offersTable").find("thead tr").prepend('<th id ="plus"f> </th>');

		/*$.each(data, function (index, item) {
			var row = $("<tr>");			
			//row.append($("<td>").text(item.InteractionID));
			
			row.append($("<td>").text(item.Summary));
			row.append($("<td>").text(item.Description));
			row.append($("<td>").text(item.ContextID));
			row.append($("<td>").text(item.DatePresented));
			row.append($("<td>").text(item.ExpiryDate));
			row.append($("<td>").text(item.Response));
			$("#vha-img-pega-offersTable tbody").append(row);
		});*/
		
		//the below code is added for defect CLMNBA-2447
		data.sort((a, b) => {
			  // Sort by InteractionID first
			  if (a.InteractionID < b.InteractionID) return -1;
			  if (a.InteractionID > b.InteractionID) return 1;

			  // If InteractionID is the same, sort by BundleParent (parent first)
			  if (a.BundleParent === "true" && b.BundleParent === "false") return -1;
			  if (a.BundleParent === "false" && b.BundleParent === "true") return 1;

			  return 0;
			});

console.log(data);
// Code end CLMNBA-2447
//the below code is added for defect CLMNBA-2802
data.sort((a, b) => {
    const parseDate = (dateStr) => {
        const [day, month, yearAndTime] = dateStr.split("/");
        const [year, time] = yearAndTime.split(" ");
        return new Date(`${year}-${month}-${day}T${time}`);
    };

    return parseDate(b.DatePresented) - parseDate(a.DatePresented);
});
//CodeEnd -CLMNBA-2802
		$.each(data, function (index, item) {
    // Check if it's a parent record
    if (item.BundleParent === "true" && item.Source ==="Pega" ) {
      // Create the parent row
      var parentRow = $("<tr>").attr("data-id", item.DataId);
      var plusIcon = `<div class='plus-button'>
                        <img id='plus' src='images/custom/menu-icons/PlusExpand.svg' class='expand-icon'/>
                      </div>`;

      // Add the "+" icon and parent details
      parentRow.append($("<td>").append(plusIcon));
      //parentRow.append($("<td>").text(item.DataId));
      parentRow.append($("<td>").text(item.Summary));
      parentRow.append($("<td>").text(item.Description));
      parentRow.append($("<td>").text(item.ContextID));
      parentRow.append($("<td>").text(item.DatePresented));
      parentRow.append($("<td>").text(item.ExpiryDate));
      parentRow.append($("<td>").text(item.Response));

      // Append the parent row to the table
      $("#vha-img-pega-offersTable tbody").append(parentRow);
    } 
	if (item.BundleParent === "false" && item.Source ==="Pega") 
	{
      // Create the child row
      var childRow = $("<tr>")
        .addClass("child-row")
        .attr("data-parent-id", item.DataId)
        .css("display", "none"); // Hide child rows by default

      // Add child details
      //childRow.append($("<td>").text("")); // Empty cell for alignment
	  childRow.append($("<td>").text(""));
      //childRow.append($("<td>").text(item.DataId));
      childRow.append($("<td>").text(item.Summary));
      childRow.append($("<td>").text(item.Description));
      childRow.append($("<td>").text(item.ContextID));
      childRow.append($("<td>").text(item.DatePresented));
      childRow.append($("<td>").text(item.ExpiryDate));
      childRow.append($("<td>").text(item.Response));

      // Append the child row to the table
      $("#vha-img-pega-offersTable tbody").append(childRow);
    }
	//if (item.Source ==="SAS" || item.BundleName === "" || item.BundleName === null item.BundleName === undefined) 
	if (item.Source ==="SAS" || item.BundleName === ""  || item.BundleName === null || item.BundleName === undefined) 
	{
		 //var plusIcon = `<div class='plus-button'></div>`;
		 var plusIcon = `<div class='plus-button' >
                        <img id='plus' src='images/custom/menu-icons/PlusExpand.svg' class='expand-icon-noClick' style="text-decoration: none; opacity: 38%;"/>
                      </div>`;
	  var independentRow = $("<tr>")
	  independentRow.append($("<td>").append(plusIcon)); // Empty cell for alignment
	  //independentRow.append($("<td>").text("")); // Empty cell for alignment
	  //independentRow.append($("<td>").text(item.DataId));
      independentRow.append($("<td>").text(item.Summary));
      independentRow.append($("<td>").text(item.Description));
      independentRow.append($("<td>").text(item.ContextID));
      independentRow.append($("<td>").text(item.DatePresented));
      independentRow.append($("<td>").text(item.ExpiryDate));
      independentRow.append($("<td>").text(item.Response));
	  $("#vha-img-pega-offersTable tbody").append(independentRow);
	}
  });
$('.RecentIntractionsretail table').on("click", ".expand-icon", function () {
		var parentId = $(this).closest("tr").data("id");
		//$(`.child-row[data-parent-id="${parentId}"]`).toggle();
		$('.child-row[data-parent-id='+parentId+']').toggle();
		$(this).attr(
			"src",
			$(this).attr("src") === "images/custom/menu-icons/PlusExpand.svg"
				? "images/custom/menu-icons/minusIcon.svg"
				: "images/custom/menu-icons/PlusExpand.svg"
		);
	});
	$('.RecentIntractions table').on("click", ".expand-icon", function () {
		var parentId = $(this).closest("tr").data("id");
		//$(`.child-row[data-parent-id="${parentId}"]`).toggle();
		$('.child-row[data-parent-id='+parentId+']').toggle();
		$(this).attr(
			"src",
			$(this).attr("src") === "images/custom/menu-icons/PlusExpand.svg"
				? "images/custom/menu-icons/minusIcon.svg"
				: "images/custom/menu-icons/PlusExpand.svg"
		);
	});

}

			function VHACovergaeCheck(sResp, this_t) { // ??
                if (sResp != "")
                    fCoverageCheck(sResp, this_t);
            }
			function tssleep(ms) {
                return new Promise(function (resolve) {
                    return setTimeout(resolve, ms);
                });
            }
  
function fCoverageCheck(sResp, this_t) {
                //$('[aria-label="Customer Type:Coverage Check"]').trigger("click")
                // $('[aria-label="Customer Type Form Applet:Coverage Check"]').trigger("click");
                //$('[name=' + this_t.GetPM().Get("GetControls")["Coverage Check"].GetInputName() + ']').trigger("click");
                var nser = SiebelApp.S_App.GetService("VF BS Process Manager");
                var nInputs = SiebelApp.S_App.NewPropertySet();
                nInputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service Sales Calc");
                nInputs.SetProperty("role", "VCS");
                nInputs.SetProperty("longitude", sResp.address.geometry.coordinates[0]); //??
                nInputs.SetProperty("latitude", sResp.address.geometry.coordinates[1]);
                SiebelApp.S_App.SetProfileAttr("Testlan", sResp.address.geometry.coordinates[0]);
                SiebelApp.S_App.SetProfileAttr("Testlog", sResp.address.geometry.coordinates[1]);
                //nInputs.SetProperty("SessionId", vSessionId);
                nInputs.SetProperty("Method Name", "CoverageCheck");
                var ROups = nser.InvokeMethod("Run Process", nInputs);
                //var CCAppId = this_t.GetPM().Get("GetFullId");
                var s4G,
                s5G,
                s5Gsa,
                s5Gnsa;
                var resultCov = [];
                for (let i = 0; i < ROups.GetChildByType("ResultSet").childArray[1].childArray.length; i++) {
                    var curPropArr = ROups.GetChildByType("ResultSet").childArray[1].childArray[i].propArray;
                    resultCov.push(curPropArr);
                }

                ////console.log(resultCov);
                //var suiURL = ROups.childArray[0].childArray[0].childArray[1].childArray[3].childArray[0].propArray.uiUrl;
                var suiURL = SiebelApp.S_App.GetProfileAttr("URL1");
                //SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Customer Details TBC").SetFieldValue("Map URL", "https://mapt.vodafone.com.au/VHAMap/apps/retail-vf?lat=-33.52220942&lon=151.19767066&zl=16&device=generic5g");
                const arrSite = [...new Set(resultCov.map(x => x.Site))];
                //var ccpardiv = '<div class="ccNwkpar">';
                //var hdrdiv = "";
                //console.log(arrSite);
                arrSite.forEach(function (item1, index) {
                    // //console.log(index+". "+item);
                    var arrNetwork = resultCov.filter(function (a) {
                        return a.Site == item1;
                    });
                    //console.log(arrNetwork);
                    //hdrdiv = hdrdiv + '<div class="ccNwkchdmain"><div class="ccNwkhdr" id="ccNwkhdr"' + index + '>' + item1 + '</div><div class="ccNwkchd">';
                    arrNetwork.forEach(function (item2, index) {
                        if (item2.PropName != "") {
                            // //console.log(item.PropName+' == '+item.PropValue);
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
                        var dVal = MapShed.FWA.f4G.is4G == true ? "4G – Available" : "4G - Not available";
                        var dCls = MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        //div = div + '<div class="ccNwk  btn ' + dCls + '" id="f4G"> ' + dVal + '</div>';
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

                        var dVal = MapShed.FWA.f5G.is5G == true ? "5G – Available" : "5G – Not available";
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

                        var dVal = MapShed.FWA.f5GNSA.is5Gnsa == true ? "5G NSA – Available" : "5G NSA – Not available";
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



	   function CreateLinkTable(accRowid){
		var LinkedConBS = SiebelApp.S_App.GetService("VHA Secondary Linked Contacts BS");
		var LCInputs = SiebelApp.S_App.NewPropertySet();
		var LCOutputs = SiebelApp.S_App.NewPropertySet();
		LCInputs.SetProperty("AccountId",accRowid);
		Outputs = LinkedConBS.InvokeMethod("FetchContacts", LCInputs);
		var temp = Outputs.GetChildByType("ResultSet");
        var dataa =temp.childArray;
		var linkedContactCount =dataa.length;
		var arry=[];
		for (let i =0; i<dataa.length;i++){
			var obj={};
			obj.Contactid = dataa[i].propArray.Contactid;
			obj.fullname = dataa[i].propArray['Full Name'];
			obj.Role = dataa[i].propArray.Role;
			obj.Status = dataa[i].propArray.Status;
			arry.push(obj);
		}
		//$("#vha-img-pega-LinkedcontactTable").html("");
		var Gotoview = '<a id ="Gotooverview" href="#">Go to overview</a>'
		var anchor = $("<a>")
			anchor.attr("href", "#");
			anchor.text("Go to overview");
		
		$("#vha-img-pega-LinkedcontactTable tbody").empty();
		$.each(arry, function (index, item) {
			var anchor = $("<a>").attr("href", "#").attr("Contactid",item.Contactid).attr("Id","gotoView-Contacts").attr("class","gotoviewLinkedContact").text("Go to overview");
			anchor.attr('onclick','gotoViewLinked("'+item.Contactid+'")')
			var ActiveStatus = $('<span id="activeicon"class="dot_Class_Active"></span>');
			var row = $("<tr>");
			var td = $("<td>");
			row.append($("<td>").text(item.fullname));
			row.append($("<td>").text(item.Role));
			if(item.Status == "Active")
			{
			row.append($("<td>").text(item.Status).prepend(ActiveStatus));
			}
			else
			{
				row.append($("<td>").text(item.Status));
			}
			//row.append(td.append(ActiveStatus));
			row.append(td.append(anchor));
			$("#vha-img-pega-LinkedcontactTable").append(row);
		});
		

	}
		function gotoViewLinked(gotoContactId){
			var conId = gotoContactId;
			  SiebelApp.S_App.SetProfileAttr("VHA Cotact Primary Id",conId);
			  //GotoviewwithrowId("VHA Customer Dashboard View","","","VHA Customer Dashboard","");
			  SiebelApp.S_App.GotoView("VHA Customer Dashboard View");
		}
		function getdetails(Objectid){
			var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Input = SiebelApp.S_App.NewPropertySet();
			//var Objectid = '2-CLLLKSQ';
			Input.SetProperty("Contact Id", Objectid); 
			Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
			var Outputs = ser.InvokeMethod("RunProcess", Input); 
			var datatemp = Outputs.childArray[0].propArray;
			return datatemp;
		}
		 function getIDdetails() {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Input = SiebelApp.S_App.NewPropertySet();
                var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA Cotact Primary Id");
                Input.SetProperty("ProcessName", "VF Get Contact Verified Info");
                Input.SetProperty("Contact Id", ObjectId);
                Input.SetProperty("FlowType", "IDdata");
                var Outputs = ser.InvokeMethod("RunProcess", Input);
                //IdRefNum = Outputs.childArray[0].propArray.IdReferenceNumber;
                IdRefNum = Outputs.childArray[0].propArray;
                return IdRefNum;
            }
		function GotoviewwithrowId(viewname,rowId,applet,bo,bc){
					/*var GotoViewBS = SiebelApp.S_App.GetService("FINS Goto View Service");
					var GotoViewInputs = SiebelApp.S_App.NewPropertySet();
					var GotoViewOutputs = SiebelApp.S_App.NewPropertySet();
					GotoViewInputs.SetProperty("PreserveAdminPrivilege","TRUE");
					GotoViewInputs.SetProperty("ViewName",viewname);
					GotoViewInputs.SetProperty("RowId",rowId);
					GotoViewInputs.SetProperty("AppletName",applet);
					GotoViewInputs.SetProperty("BusinessObject","Contact");
					GotoViewBS.InvokeMethod("GotoView", GotoViewInputs);*/
					$('#VHAAssetDashBoard').addClass('displaynone');
					var Inputs = SiebelApp.S_App.NewPropertySet();
					var Output = SiebelApp.S_App.NewPropertySet();
					var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
					Inputs.SetProperty("Service Name","VHA MSISDN GotoView BS");
					Inputs.SetProperty("Method Name","GotoView");
					Inputs.SetProperty("BusObjName",bo);
					Inputs.SetProperty("BusCompName",bc);
					Inputs.SetProperty("QueryField","");
					Inputs.SetProperty("RowId",rowId);
					Inputs.SetProperty("ViewName",viewname);
					var Output = ser.InvokeMethod("Run Process",Inputs);
		}
		function createSR(rowId,Type){
			var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet()
			Inputs.SetProperty("ProcessName", "VHA Create Service Request");
			Inputs.SetProperty("AccountId",rowId);
			Inputs.SetProperty("Type",Type);
			//Inputs.SetProperty("Object Id",rowId);
			Outputs = ser.InvokeMethod("RunProcess", Inputs);
		}
		function InvokeTaskFromOpenUI(TaskName,accRowid) {
			var service = SiebelApp.S_App.GetService("Task UI Service (SWE)");
			if (service) {
				const loadingIcon = $("#loadingIcon");
				loadingIcon.show();
				try{
				//$('#VHAAssetDashBoard').hide();
				$('#VHAAssetDashBoard').addClass('displaynone');
				var input = SiebelApp.S_App.NewPropertySet();
				var output = SiebelApp.S_App.NewPropertySet();
				input.SetProperty("TaskName", TaskName);
				input.SetProperty("Account Id", accRowid);
				service.InvokeMethod("LaunchTask", input, output);
				}
				finally
				{
					loadingIcon.hide();
				}
			}
		}

		function authcontdetails(){
			
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
                    //$("label[for='vha-ret-confirmCode']").empty().append("<Label>" + IdRefNum.IdType + "</label><Label class=pl-4>" + maskedInsight + "</label>");
                    $("#vha-img-identry-optVal").empty().append("<Label>" + IdRefNum.IdType + "</label><Label class=pl-4>" + maskedInsight + "</label>");
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
			
			stepAuthPbj.ARII =authdetails.AccARII;
			stepAuthPbj.OrgName =authdetails.AccOrg;
			stepAuthPbj.ContactId =authdetails["Contact Id"];
			stepAuthPbj.AccountObjectId =authdetails["Row Id"];
			stepAuthPbj.MSISDN =authdetails["Home Phone #"];
			stepAuthPbj.EmailOTP =authdetails["Email Address"];
			PhnVerifyFlag_step2 = authdetails["Contact Number Validated"];
			EmailVerifyFlag_step2 = authdetails["Email Address Validated"];
			$(".unverifiedbtn").addClass("displaynone");
			
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
		//reset mfa UI
		function resetUI(){
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
		// email or sms verify
function getOverduedetails(AccountId){
	$(".overdue-container").addClass('displaynone');
	var Inputs = SiebelApp.S_App.NewPropertySet();
	var Output = SiebelApp.S_App.NewPropertySet();
	var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
	Inputs.SetProperty("Service Name", "VHA Get Billing Accounts BS");
	Inputs.SetProperty("Method Name", "GetOverdueAccounts");
	Inputs.SetProperty("AccountId", AccountId);
	var Output = ser.InvokeMethod("Run Process", Inputs);
	var ResultSet = Output.GetChildByType("ResultSet");
	var overDueAccns = ResultSet.GetProperty("BANList");
	if (overDueAccns !== "" && overDueAccns !== null && overDueAccns !== undefined)
	{
	$(".overdue-container").removeClass('displaynone');
	$(".postpaid-numbers").text(overDueAccns);
	}
}
function buildCoveragecheckUI(){			
			$(".vha-img-applet2").append('<!--Coverage Check MOB/NBN buttons-->\
				<div id ="maintab" class="tabs maintabdisplaynone">\
				<span id="mobilemain"class="active">Mobile</span>\
				<span id="fixedmain">Fixed</span>\
				<hr />\
				</div>\
			<!-- Address section -->\
				<div id ="mobiletab" class="Mobile mobiletabdisplaynone">\
					<p id="addressval">10 Bourke St, Melbourne VIC 3000</p>\
					<a href="#" class="search-address">\
						Search another address\
						<span class="search-icon">&#128269;</span>\
					</a>\
					<br>\
					<br>\
					<span class="mobiletittle">Mobile coverage</span>\
				<div class="coverage Mobilecoverage">\
					<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-3G-IO"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-3G-IO-mobile">3G - Indoor & Outdoor</span></button>\
				    &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-4G-IO"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-4G-IO-mobile">4G - Indoor & Outdoor</span></button>\
					&nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5G-O"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5G-O-mobile">5G - Outdoor Only</span></button>\
					&nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5GNSA-NC"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5GNSA-NC-mobile">5G - NSA - No Coverage</span></button>\
				</div>\
				</div>\
				<div id ="fixedtab"class="Fixed fixedtabdisplaynone">\
					<p id ="addressvalFixed">10 Bourke St, Melbourne VIC 3000</p>\
					<a href="#" class="search-address">\
						Search another address\
						<span class="search-icon">&#128269;</span>\
					</a>\
					<br>\
					<br>\
					<span class="mobiletittle" id= "fixedAvailable">Fixed connection is available</span><br><br>\
					<span class="mobiletittle">Service class</span><span class="svrcls" id="servClass"></span><br><br>\
					<span class="mobiletittle">Technology</span><span class="Tech" id="Techval"></span><br><br>\
					<span class="mobiletittle">Fixed wireless coverage</span><br>\
				<div class="coverage">\
				<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-4G-Avl"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-4G-home-status">4G - Available</span></button>\
				&nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5G-NA"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5G-home-status">5G - Not Available</span></button>\
				&nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5GNSA-NA"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5GNSA-home-status">5G - NSA - Not Available</span></button>\
				</div>\
				</div>\
			<!--******************NBN covearage End***********************************  -->');
}
		function coverageCheckDiv(){
		$(".vha-img-applet2").append('<!--Coverage Check MOB/NBN buttons-->\
			 <div class="vha-sc-cvragechk-btns">\
				<!--ul id="vha-sc-tab-ul-cvrgchk" class="vha-sc-tabs-cvrgchk">\
				   <li class="vha-sc-cvragechk-mob-btn"><button id="vha-sc-cvragechk-mob-btnid" class="vha-sc-cvrage-mob-btncls vha-sc-cvrage-mob-active">Mobile & Home Internet Address</button></li>\
				   <span class="vha-sc-cvragechk-bar"></span>\
				   <li class="vha-sc-cvragechk-nbn-btn"><button id="vha-sc-cvragechk-nbn-btnid" class="vha-sc-cvrage-nbn-btncls">NBN</button></li>\
				</ul-->\
			 </div>  \
			 <!--Coverage Button Ends--> \
			 <!--       ******************Mobile & Home Internet Address  ***********************************  -->	\
			 <div class="vha-sc-address-coveragechk-mob" id="vha-sc-address-coveragechk-mobid">\
				<div class="vha-sc-address-coveragechk-mob-init">\
					<!--Mobile Address Select-->\
				   <div class="vha-sc-addressdetails-lbl vha-sc-btn-div vha-sc-gf-accordion">\
					  <span class="vha-sc-addressdetails-lblnm vha-color-white">Address Details</span>\
					  <input class="vha-sc-addressdetails-val" type="text"> \
					  <span></span>\
					  <div class="vha-sc-changeaddress-btn btn"  >\
						 <button class="btn vhascppbtn vha-color-blue vha-bgcolor-white" id="vha-sc-chngaddr-btn">Change Address</button>  \
					  </div>\
				   </div>\
				   <!--Mobile Address Select Ends-->\
				   <br><br>\
				   <div class="row mb-3 dflex">\
					  <div class="col-md-10 vha-sc-cvrgchk-tab-font">Coverage Check Details</div>\
				   </div>\
				   <div class="row mb-3 dflex">\
					  <div class="col-md-10 vha-sc-cvrgchk-subtab-font">Mobile Coverage</div>\
				   </div>\
				   <div class="row vha-sc-mobcvrg-btns-par">\
					  <div class="vha-sc-mobcvrg-btns col-md-10">\
						 <!--Hari 31/may/2024-->\
						 <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-3G-IO"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-3G-IO-mobile">3G - Indoor & Outdoor</span></button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-4G-IO"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-4G-IO-mobile">4G - Indoor & Outdoor</span></button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5G-O"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5G-O-mobile">5G - Outdoor Only</span></button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5GNSA-NC"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5GNSA-NC-mobile">5G - NSA - No Coverage</span></button>\
					  </div>\
				   </div>\
				   <br><br>\
				   <div class="row mb-3 dflex">\
					  <div class="col-md-10 vha-sc-cvrgchk-subtab-font">4G/5G  Home Internet</div>\
				   </div>\
				   <div class="row vha-sc-4G5G-btns-par">\
					  <div class="vha-sc-4G5G-btns col-md-10">\
						 <!--Hari 31/may/2024-->\
						<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-4G-Avl"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-4G-home-status">4G - Available</span></button>\
						&nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5G-NA"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5G-home-status">5G - Not Available</span></button>\
						&nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5GNSA-NA"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5GNSA-home-status">5G - NSA - Not Available</span></button>\
					  </div>\
					</div>\
					<br>\
				  <div class="vha-sc-address-coveragechk-nbn" id="vha-sc-address-coveragechk-nbnid">\
					<div class="vha-sc-nbnaddr vha-sc-btn-div">\
					   <span class="vha-sc-nbnaddr-lbl">NBN Address</span>\
					   <input class="vha-sc-nbnaddr-val vha-sc-txtbox-medium vha-sc-btn-border-clr" type="text">\
					   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class="vha-sc-nbnloc-lbl">NBN Location ID</span>\
					   <input class="vha-sc-nbnloc-val vha-sc-txtbox-medium vha-sc-btn-border-clr" type="text"> \
					   <div class="vha-sc-nbngo-btn btn">\
							 <button class="btn vhascppbtn vha-color-blue vha-bgcolor-white" id="vha-sc-nbngo-btn">Go</button>\
						</div>\
					</div>\
					<br>\
					<div class="vha-sc-address-coveragechk-mob-init vha-sc-btn-div">\
						<span class="vha-sc-nbn-cantfindadrss" id="vha-sc-nbn-cantfindadrss" >Cant find the address for NBN and do you want to search with NBN location id ? </span>\
					</div>\
					<br>\
					<div class="row mb-3 dflex">\
					   <div class="col-md-10 vha-sc-cvrgchk-subtab-font">NBN Availability Status</div>\
					</div>\
					<div class="row vha-sc-nbnstat-par">\
					   <div class="vha-sc-nbnstat col-md-10">\
						  <!--Hari 31/may/2024-->\
						 <div class="vha-sc-mar28px">\
							<span>Can Customer Get NBN:</span>\
							<input id="vha-sc-get-nbn-new" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\
							<span class="ml-5">NBN Available with Vodafone on:</span>\
							<input id="vha-sc-nbn-with-vodafone" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\
							</div>\
							<div class="vha-sc-mar48px">\
							<span>NBN Technology Type:</span>\
							<input id="vha-sc-nbn-tech-type" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\
							</div>\
					   </div>\
					</div>\
					<br>\
					<div class="row mb-3 dflex">\
					   <!--Hari 31/may/2024-->\
					   <div class="col-md-10 vha-sc-cvrgchk-subtab-font">NBN Technology Description</div>\
					   &nbsp;&nbsp;<span id="vha-sc-nbn-tech-descrip" class="vha-sc-nbn-tech-descrip vha-sc-nbn-content"></span>\
					</div>\
					<br>\
					</div>\
					</div>\
				   </div>\
				   <br><br>\
				</div>\
			 </div>\
			 <!--Mobile & Home Internet Ends-->\
			 <!--******************NBN covearage Start***********************************  -->\
			 <!--div class="vha-sc-address-coveragechk-nbn VHASCDisplayNone" id="vha-sc-address-coveragechk-nbnid">\
				<div class="vha-sc-address-coveragechk-mob-init vha-sc-btn-div vha-sc-gf-accordion">\
				   <span class="vha-sc-connectaddr-lbl vha-color-white">Connection Address</span>\
				   <input class="vha-sc-connectaddr-val vha-sc-txtbox-large" type="text" >  \
					<span class="vha-sc-nbn-cantfindadrss" id="vha-sc-nbn-cantfindadrss" >Cant Find the address Refine Address Search</span>\
					<span></span>\
				   <div class="btn vha-sc-nbn-btns"  >\
					  <button class="btn vhascppbtn vha-color-blue vha-bgcolor-white" id="vha-sc-nbn-clearbtn">Clear</button>  \
				   </div>\
				</div><br>\
				<div class="vha-sc-nbnaddr vha-sc-btn-div">\
				   <span class="vha-sc-nbnaddr-lbl">NBN Address</span>\
				   <input class="vha-sc-nbnaddr-val vha-sc-txtbox-medium vha-sc-btn-border-clr" type="text">\
				   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class="vha-sc-nbnloc-lbl">NBN Location ID</span>\
				   <input class="vha-sc-nbnloc-val vha-sc-txtbox-medium vha-sc-btn-border-clr" type="text"> \
				   <div class="vha-sc-nbngo-btn btn">\
						 <button class="btn vhascppbtn vha-color-blue vha-bgcolor-white" id="vha-sc-nbngo-btn">Go</button>\
					</div>\
				</div>\
				<br>\
				<div class="row mb-3 dflex">\
				   <div class="col-md-10 vha-sc-cvrgchk-subtab-font">NBN Availability Status</div>\
				</div>\
				<div class="row vha-sc-nbnstat-par">\
				   <div class="vha-sc-nbnstat col-md-10">\
					  <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-getnbn"><span class="vha-sc-coverageStatus"></span>Can Customer Get NBN</button>\
					  <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-nbnavl"><span class="vha-sc-coverageStatus"></span>NBN Available with Vodafone on</button>\
					  <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-nbnfib"><span class="vha-sc-coverageStatus"></span>NBN Technology Type Fibre</button>\
				   </div>\
				</div>\
				<br>\
				<div class="row mb-3 dflex">\
				   <div class="col-md-10 vha-sc-cvrgchk-subtab-font">NBN Available with Vodafone on</div>\
				   &nbsp;&nbsp;<span class="vha-sc-nbn-content vha-sc-gf-grey-accordion">Service Class 3. Fibre to the premises (FTTP). Everything looks to be in places for nbn. IMPORTANT! If there is any used fixed services at this address you will need on Enhanced nbn check</span>\
				</div>\
				<br>\
			 </div-->\
			 <!--******************NBN covearage End***********************************  -->');
	}
	
				function verifyEmailSms(item,callfrom){
			var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
			var Input = SiebelApp.S_App.NewPropertySet();
			//var ObjectId = SiebelApp.S_App.GetProfileAttr("VHA-INV-CON-ID");
			Input.SetProperty("Object Id", item.ContactId);
			Input.SetProperty("sConId", item.ContactId);
			
			
				if (AuthmethodType === "email" || callfrom ==="sendinvite"){
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
		function TriggerNBNAddress(sResp, NBNLoc) 
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

                if (NBNLoc == "" || NBNLoc == undefined) {
                    var sRespUnitType = sResp.address.properties.complex_unit_type;
                    var sRespUnitIden = sResp.address.properties.complex_unit_identifier;
                    var sRespComType = sResp.address.properties.complex_level_type;
                    var sStreet1 = sResp.address.properties.street_number_1;
                    var sStreet2 = sResp.address.properties.street_number_2;
                    var sLotIden = sResp.address.properties.lot_identifier;

                    var sFloorType = (sRespUnitType !== null) ? sRespUnitType : (sRespUnitIden !== null) ? "Unit" : sRespComType;
                    var sFloor = (sRespUnitType !== null) ? sRespUnitIden : (sRespUnitIden !== null) ? sRespUnitIden : sRespComType;
                    var sStreetNum = (sStreet1 === null) ? "LOT" + sLotIden : (sStreet2 !== null) ? sStreet1 + "-" + sStreet2 : sStreet1;

                    sFloorType = (sFloorType != null) ? mCamelCase(sFloorType) : "";
                    sFloor = (sFloor != null) ? mCamelCase(sFloor) : "";

                    var sSuburb = sResp.address.properties.locality_name;
                    var sStreetName = sResp.address.properties.street_name;
                    var sStreetType = sResp.address.properties.street_type_description;
                    var sBuildingName = sResp.address.properties.site_name;
                    var sUnitType = sFloorType;
                    var sUnitNumber = sFloor;
                    var sBuildingNumber = sStreetNum;
                    var sPostcode = sResp.address.properties.postcode;
                    var sState = sResp.address.properties.state_territory;
					
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
                    sIntCallInputs.SetProperty("PropSet10", sResp.address.properties.street_number_1);					
                    sIntCallInputs.SetProperty("PropSet23", sResp.address.properties.address_identifier);					
                    sIntCallInputs.SetProperty("PropSet24", sResp.address.geometry.coordinates[1]);					
                    sIntCallInputs.SetProperty("PropSet25", sResp.address.geometry.coordinates[0]);					
                    var OutputsResp = ser.InvokeMethod("Run Process", sIntCallInputs);  
					//OutputsResp.childArray[0].propArray.PriorityNetwork;
					//streetNumber + streetName +  streetType + state
					//OutputsResp.childArray[0].propArray.primaryAccessTechnology
					
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
					
					$('#vha-sc-nbn-pref-wholesal').val(OutputsResp.childArray[0].propArray.PriorityNetwork);
					$('#vha-sc-nbn-avail-on').val(OutputsResp.childArray[0].propArray.NBNwithAU);
					$('#vha-sc-nbn-new-Devcharge').val(OutputsResp.childArray[0].propArray.sNBNCharge);					
					$('#vha-sc-nbn-tech-type').val(OutputsResp.childArray[0].propArray.AccessTech);
					$('.vha-sc-nbnloc-val').val(OutputsResp.childArray[0].propArray.LocID);
					$('#vha-sc-avail-wholesal').val(OutputsResp.childArray[0].propArray.NBNAvlWholeSaler);					
					$('.vha-sc-nbnaddr-val').val(OutputsResp.childArray[0].propArray.NBNAddress);

				}
				
    } 
            
		
	// custom functions  end
    return VHACustomerDashboardViewPR;
   }()
  );
  return "SiebelAppFacade.VHACustomerDashboardViewPR";
 })
}