if (typeof(SiebelAppFacade.VHAAssetlistappletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAAssetlistappletPR");
 define("siebel/custom/VHAAssetlistappletPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.VHAAssetlistappletPR = (function () {
	var paginationadded = false;
    function VHAAssetlistappletPR(pm) {
     SiebelAppFacade.VHAAssetlistappletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAAssetlistappletPR, SiebelAppFacade.JQGridRenderer);

    VHAAssetlistappletPR.prototype.Init = function () {
     SiebelAppFacade.VHAAssetlistappletPR.superclass.Init.apply(this, arguments);
	 var applet =this;

    }

    VHAAssetlistappletPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHAAssetlistappletPR.superclass.ShowUI.apply(this, arguments);
		$('button[title="Assets & billing List Applet:Query BA"]').addClass('displaynone'); 
		//enableQuicklinks();
		//buildQuicklinks("Prepay");
		
		$(".billing-containerprepay").after('<div id="allactiveAssets">All active assets</div>');
		var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId");
			$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
			$(".vha-img-applet5").find(".siebui-row-counter").addClass('displaynone');
		
    }
	

    VHAAssetlistappletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHAAssetlistappletPR.superclass.BindData.apply(this, arguments);
	var table = $("table[summary='Assets & billing']").find("tbody .ui-widget-content");
	$("button[aria-label='Assets & billing List Applet: Menu']").hide();
	$("button[aria-label='Recent activities List Applet: Menu']").hide();
	$("button[aria-label='Active service requests List Applet: Menu']").hide();
	$("#rowcount").hide();
	$("#srrowcount").hide();
	if($("td[aria-roledescription='Info']").find('.plus-button').length === 0)
	{
	$("td[aria-roledescription='Info']").prepend('<div class="plus-button"><img id="plus" src="images/custom/menu-icons/PlusExpand.svg"></div><div class="minus-button displaynone"><img id="minus" src="images/custom/menu-icons/minusIcon.svg"></img></div>');
	}
	$("table[summary='Assets & billing'] tr[role='row']").on("click",function(){
			console.log("Asset Record Chagned");
			var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId");
			$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
			$(".vha-img-applet5").find(".siebui-row-counter").addClass('displaynone');
			/* NBA Offer Code*/
			//$("table[summary='Next Best Activity (NBA) Offers']").find('tbody').empty();
			//actboday = $("table[summary='Next Best Activity (NBA) Offers']").find('tbody');
			//actboday.append('<tr> class "nooffer"><td Id ="Nodata-offer" colspan="5">No available offer</td></tr>');

			});
			var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId");
			$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
			$(".vha-img-applet5").find(".siebui-row-counter").addClass('displaynone');
	 /*var icon = document.querySelector('[id*="Info"]').querySelector('div');
	 icon.textContent = "";*/
	 
	
	if ($("td[aria-roledescription='Quick links']").find('.quicklinkssection').length === 0)
	{
	//$("td[aria-roledescription='Quick links']").prepend('<a id="QuickLinkAction" href="#" tabindex="1">Action</a>');

	$("td[aria-roledescription='Quick links']").prepend('<div class="quicklinkssection">\
		<div class="section-content">\
				<select id="quicklinks" class="form-select Action-Drop" aria-label="Default select example" tabindex="2">\
				<option selected="">Action</option>\
			</select>\
		</div>\
	</div>');
	}
	/*var icon = document.querySelector('[id*="Info"]').querySelector('div');
	if(icon)
	{
	 icon.textContent = "";
	}
	else
	{
		console.log("Infonot found");
	}*/
	$("div[id$='Info']").text("");
 /*var assettable = document.querySelector("table[summary='Assets & billing']> tbody");
	$(assettable).append('<div id="pagination">\
  <button id="prev-page">&lt;</button>\
  <span id="page-numbers"></span>\
  <button id="next-page">&gt;</button>\
</div>');*/




		$("#CaretRight").on('click', function(){
			event.preventDefault();
			console.log("CareRight");
			var assetApp =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
			var pm = assetApp.GetPModel();
			var inp = SiebelApp.S_App.NewPropertySet();
                    //inp.SetProperty("SWECmd", "InvokeMethod");
                    inp.SetProperty("SWEView", "VHA Customer Dashboard View");
                    inp.SetProperty("SWEApplet", "VHA Customer Dashboard Assets Billing Applet");
                   // inp.SetProperty("SWEMethod", "GotoNextSet");
                    inp.SetProperty("SWEActiveApplet", "VHA Customer Dashboard Assets Billing Applet");
                    inp.SetProperty("SWENeedContext", true);
                    inp.SetProperty("SWEActiveView", "VHA Customer Dashboard View");
                    pm.ExecuteMethod("InvokeMethod", "GotoNextSet", inp);
					
		}); 
		$("#CaretLeft").on('click', function(){
			event.preventDefault();
			console.log("CareRight");
			var assetApp =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
			var pm = assetApp.GetPModel();
			var inp = SiebelApp.S_App.NewPropertySet();
                    inp.SetProperty("SWEView", "VHA Customer Dashboard View");
                    inp.SetProperty("SWEApplet", "VHA Customer Dashboard Assets Billing Applet");
                    inp.SetProperty("SWEActiveApplet", "VHA Customer Dashboard Assets Billing Applet");
                    inp.SetProperty("SWENeedContext", true);
                    inp.SetProperty("SWEActiveView", "VHA Customer Dashboard View");
                    pm.ExecuteMethod("InvokeMethod", "GotoPreviousSet", inp);
					
		});
		$("#StepForward").on('click', function(){
			event.preventDefault();
			console.log("CareRight");
			var assetApp =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
			var pm = assetApp.GetPModel();
			var inp = SiebelApp.S_App.NewPropertySet();
                    inp.SetProperty("SWEView", "VHA Customer Dashboard View");
                    inp.SetProperty("SWEApplet", "VHA Customer Dashboard Assets Billing Applet");
                    inp.SetProperty("SWEActiveApplet", "VHA Customer Dashboard Assets Billing Applet");
                    inp.SetProperty("SWENeedContext", true);
                    inp.SetProperty("SWEActiveView", "VHA Customer Dashboard View");
                    pm.ExecuteMethod("InvokeMethod", "GotoLastSet", inp);
					
		});
		$("#stepback").on('click', function(){
			event.preventDefault();
			console.log("CareRight");
			var assetApp =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
			var pm = assetApp.GetPModel();
			var inp = SiebelApp.S_App.NewPropertySet();
                    inp.SetProperty("SWEView", "VHA Customer Dashboard View");
                    inp.SetProperty("SWEApplet", "VHA Customer Dashboard Assets Billing Applet");
                    inp.SetProperty("SWEActiveApplet", "VHA Customer Dashboard Assets Billing Applet");
                    inp.SetProperty("SWENeedContext", true);
                    inp.SetProperty("SWEActiveView", "VHA Customer Dashboard View");
                    pm.ExecuteMethod("InvokeMethod", "GotoFirstSet", inp);
					
		});




	$("td[aria-roledescription='Info']").on('click', '.plus-button', function() {
	  //var clickedRow = $(this).closest('tr'); // Get the row where the click happened
	  var clickedRow =  $(this).parent().parent();
	  console.log('Clicked row data:', clickedRow); // Do something with the row
	  clickedRow.click();
	  event.preventDefault();
	  var assetApplet =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
		var pm = assetApplet.GetPModel();
		var recordSet = pm.Get("GetRecordSet");
		var selectedIndex = pm.Get("GetSelection");
		var sAssetId = assetApplet.GetBusComp().GetFieldValue("Id");
	   //var [formatedAPPDetails,formatedMPPDetails] = getExistingSeledtedServiceDetails(sAssetId);
	   var [formatedAPPDetails,formatedMPPDetails,Bundel,AddOns] = getAssetMoreInfo(sAssetId);
	   console.log(formatedAPPDetails);
	   console.log(formatedMPPDetails);
	  clickedRow.find(".plus-button").addClass("displaynone");
	  clickedRow.find(".minus-button").removeClass("displaynone");
	  //clickedRow.after('<tr> class "assetMoreInfo"><td Id ="newformtd" colspan="5"></td></tr>');
	  $(this).parent().parent().after('<tr> class "assetMoreInfo"><td id ="newformtd" colspan="5"></td></tr>');
	  //$('#newformtd').append(clickedRow);
		var brmser = SiebelApp.S_App.GetService("Workflow Process Manager");
		var Input = SiebelApp.S_App.NewPropertySet();
		Input.SetProperty("ProcessName","TPG Customer Overview Entitlement Process"); 
		//Input.SetProperty("AssetId","2-CIFUCB1"); 
		//sAssetId = "2-CIFUCB1";
		Input.SetProperty("AssetId",sAssetId); 
		var Outputs = brmser.InvokeMethod("RunProcess", Input);
		var intInclusion = Outputs.childArray[0].propArray.InclusionMinits;
		var intlastMonthUsag = Outputs.childArray[0].propArray.LastMonthMinits;
		var intavgmntusage = Outputs.childArray[0].propArray.AverageValueInMinits;
		var dataInclusion = Outputs.childArray[0].propArray.Inclusion;
		var datalastmontusage = Outputs.childArray[0].propArray.Lastmonthusage;
		var dataavrgmontusage = Outputs.childArray[0].propArray.AverageValueInGB;
		var Used = Outputs.childArray[0].propArray.Used;
		var Entitlement = Outputs.childArray[0].propArray.Entitlement;
		var MSISDNType = Outputs.childArray[0].propArray.MSISDNType;
		var PaymentMethod = Outputs.childArray[0].propArray.PaymentMethod;
		var NBNAwcNum = Outputs.childArray[0].propArray["Serial Number"];
		var MSISDN = Outputs.childArray[0].propArray.AssetNumber;
		var sharingGroup = "Family (used "+Used+" of "+Entitlement+")";
		
		var RatePlan = Outputs.childArray[0].propArray.TariffPlan;
		var Expiry =  Outputs.childArray[0].propArray.Expiry;
		var BonusCredit = Outputs.childArray[0].propArray.BonusCredit;
		var RemBal = Outputs.childArray[0].propArray.RemainingBal;
		var DataBankBal = Outputs.childArray[0].propArray.DatabankBal;
		var InclusionPrepay = Outputs.childArray[0].propArray.InclusionPrepay;
		
		var Inputs = SiebelApp.S_App.NewPropertySet();
		var Output = SiebelApp.S_App.NewPropertySet();
		var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
		Inputs.SetProperty("Service Name", "TPG Asset Entitlement BS");
		Inputs.SetProperty("Method Name", "GetLimitedUser");
	    Inputs.SetProperty("AssetId", sAssetId);
		Output = ser.InvokeMethod("Run Process", Inputs);
		var limitedUserscount = Output.childArray[0].propArray.LimitedUserCount;
		var pointerclass = "";
		if(NBNAwcNum == "" || NBNAwcNum == null || NBNAwcNum == undefined)
		{
			NBNAwcNum = "N/A"
		}
		if(limitedUserscount == 1)
		{
			 limitedUsers = "View "+limitedUserscount+" Limited users"
			 pointerclass = "enablelink";
		}
		if(limitedUserscount == 0 || limitedUserscount == "" || limitedUserscount == undefined)
		{
			limitedUsers = "None";
			pointerclass = "disabledlink";
		}
		if(limitedUserscount >1)
		{
			limitedUsers = "View "+limitedUserscount+" Limited users"
			pointerclass = "enablelink";
		}
		
		
			/*var sharingGroup = "Family (used 100 of 300 GB";
	var limitedUsers = "None";
	var dataInclusion = "180.00 GB";
	var datalastmontusage = "100.00 GB";
	var dataavrgmontusage = "120.00 GB (6mo average)";
	var intInclusion = "300m (Zone 2)";
	var intlastMonthUsag = "100m (Zone 2)";
	var intavgmntusage = "100m (Zone 2)";
	var intInclusion = "120m (Zone 2)";*/
	
	var mpp = formatedMPPDetails;
	var app = formatedAPPDetails;
	var addons = AddOns;
	var bundle = Bundel;
	
	if(mpp == undefined){mpp ='';}
	if(app == undefined){app ='';}
	if(addons == undefined){addons ='';}
	if(bundle == undefined){bundle ='';}
	

	 if (MSISDNType == "NBNMSISDN")
	 {
		 clickedRow.next().children('td').append('<div class="assetMoreinfocontainer">\
<!-- Plan Details -->\
			   <div class="flex-container">\
					<!-- Data Usage -->\
					<div class="column">\
						<div class="section">\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title">MSISDN</div>\
									<div class="sharinggrp row-value">'+MSISDN+'</div>\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="column">\
						<div class="section">\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title columntittle">Limited users</div>\
									<div class="limiteduser row-value '+pointerclass+'"><a id="ViewLimitedusers" href="#" tabindex="1">'+limitedUsers+'</a></div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
							   <div class="flex-container">\
					<!-- Data Usage -->\
					<div class="column">\
						<div class="section">\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title">Service ID</div>\
									<div class="sharinggrp row-value">'+NBNAwcNum+'</div>\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="column">\
						<div class="section">\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title columntittle"></div>\
									<div class="limiteduser row-value"></div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
    <div class="divider"></div>\
    <!-- Data and International Minutes -->\
    <!-- Additional Plan Information -->\
    <div class="section">\
        <div class="section-title" id ="'+sAssetId+'inAddPlan">In addition to the plan</div>\
        <div class="section-content">\
            <div class="row">\
                <div class="row-title addPlanLable" id="'+sAssetId+'mpp">MPPs</div>\
                <div class="addPlan row-value" id="'+sAssetId+'mpp">'+mpp+'</div>\
            </div>\
            <div class="row">\
                <div class="row-title addPlanLable" id="'+sAssetId+'app">APPs</div>\
                <div class="addPlan row-value" id="'+sAssetId+'app">'+app+'</div>\
            </div>\
            <div class="row">\
                <div class="row-title addPlanLable" id="'+sAssetId+'addon">Add-ons</div>\
                <div class="addPlan row-value" id="'+sAssetId+'addon">'+addons+'</div>\
            </div>\
            <div class="row" id="'+sAssetId+'bundel">\
                <div class="row-title addPlanLable" id="'+sAssetId+'bundel">Bundle benefits</div>\
                <div class="addPlan row-value" id="'+sAssetId+'bundel">$'+bundle+' off</div>\
            </div>\
        </div>\
    </div>\
</div>');
	 }
	 if (MSISDNType === "VoiceMSISDN" && PaymentMethod === "Postpay")
	 {			 
				  clickedRow.next().children('td').append('<div class="assetMoreinfocontainer">\
			<!-- Plan Details -->\
			   <div class="flex-container">\
					<!-- Data Usage -->\
					<div class="column">\
						<div class="section">\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title">Sharing group</div>\
									<div class="sharinggrp row-value">'+sharingGroup+'</div>\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="column">\
						<div class="section">\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title columntittle">Limited users</div>\
									<div class="limiteduser row-value '+pointerclass+'"><a id="ViewLimitedusers" href="#" tabindex="1">'+limitedUsers+'</a></div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="divider"></div>\
				<!-- Data and International Minutes -->\
				<div class="flex-container">\
					<!-- Data Usage -->\
					<div class="column Datacolumn">\
						<div class="section datasection">\
							<div class="section-title">Data</div>\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title">Inclusion</div>\
									<div class="datavalueSection row-value">'+dataInclusion+'</div>\
								</div>\
								<div class="row">\
									<div class="row-title">Last month'+"'s"+' usage</div>\
									<div class="datavalueSection row-value">'+datalastmontusage+'</div>\
								</div>\
								<div class="row">\
									<div class="row-title">Average monthly usage</div>\
									<div class="datavalueSection row-value">'+dataavrgmontusage+'</div>\
								</div>\
							</div>\
						</div>\
					</div>\
					<!-- International Minutes -->\
					<div class="column intmincolumn">\
						<div class="section intminsection">\
							<div class="section-title columntittle">International minutes\
							<span class="info-icon-interMin"><img id="assetInfo" src="images/custom/get_info.svg"\
							class="assetInfoIcon"/><span class="tooltip-text-interMin"></span>\
							<span class="tooltip-text-interMin">\
							<span class="inthead">International minutes</span><br>\
							<span class="intmsg">Showing usage for the customer’s most used Zone</span></span></span></div>\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title columntittle">Inclusion</div>\
									<div class="intervalueSection row-value">'+intInclusion+'</div>\
								</div>\
								<div class="row">\
									<div class="row-title columntittle">Last month'+"'s"+' usage</div>\
									<div class="intervalueSection row-value">'+intlastMonthUsag+'</div>\
								</div>\
								<div class="row">\
									<div class="row-title columntittle">Average monthly usage</div>\
									<div class="intervalueSection row-value">'+intavgmntusage+'</div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="divider"></div>\
				<!-- Additional Plan Information -->\
				<div class="section">\
					<div class="section-title" id ="'+sAssetId+'inAddPlan">In addition to the plan</div>\
					<div class="section-content">\
						<div class="row">\
							<div class="row-title addPlanLable" id="'+sAssetId+'mpp">MPPs</div>\
							<div class="addPlan row-value" id="'+sAssetId+'mpp">'+mpp+'</div>\
						</div>\
						<div class="row">\
							<div class="row-title addPlanLable" id="'+sAssetId+'app">APPs</div>\
							<div class="addPlan row-value" id="'+sAssetId+'app">'+app+'</div>\
						</div>\
						<div class="row">\
							<div class="row-title addPlanLable" id="'+sAssetId+'addon">Add-ons</div>\
							<div class="addPlan row-value" id="'+sAssetId+'addon">'+addons+'</div>\
						</div>\
						<div class="row" id="'+sAssetId+'bundel">\
							<div class="row-title addPlanLable" id="'+sAssetId+'bundel">Bundle benefits</div>\
							<div class="addPlan row-value" id="'+sAssetId+'bundel">$'+bundle+' off</div>\
						</div>\
					</div>\
				</div>\
			</div>');
	 }
	  if (MSISDNType === "VoiceMSISDN" && PaymentMethod === "Prepay")
	  {
		  clickedRow.next().children('td').append('<div class="assetMoreinfocontainer">\
			<!-- Plan Details -->\
			   <div class="flex-container">\
					<!-- Data Usage -->\
					<div class="column">\
						<div class="section">\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title">Rate Plan</div>\
									<div class="sharinggrp row-value">'+RatePlan+'</div>\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="column">\
						<div class="section">\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title columntittle">Limited users</div>\
									<div class="limiteduser row-value '+pointerclass+'"><a id="ViewLimitedusers" href="#" tabindex="1">'+limitedUsers+'</a></div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="flex-container">\
					<div class="column">\
						<div class="section">\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title">Expiry</div>\
									<div class="sharinggrp row-value">'+Expiry+'</div>\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="column">\
						<div class="section">\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title columntittle">Bonus Credit</div>\
									<div class="limiteduser row-value">'+BonusCredit+'</div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="divider"></div>\
				<!-- Data and International Minutes -->\
				<div class="flex-container">\
					<!-- Data Usage -->\
					<div class="column Datacolumn">\
						<div class="section datasection">\
							<div class="section-title">Data</div>\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title">Remaining balance</div>\
									<div class="datavalueSection row-value">'+RemBal+'</div>\
								</div>\
								<div class="row">\
									<div class="row-title">Data bank balance</div>\
									<div class="datavalueSection row-value">'+DataBankBal+'</div>\
								</div>\
							</div>\
						</div>\
					</div>\
					<!-- International Minutes -->\
					<div class="column intmincolumn">\
						<div class="section intminsection">\
							<div class="section-title columntittle">International minutes\
							<span class="info-icon-interMin"><img id="assetInfo" src="images/custom/get_info.svg"\
							class="assetInfoIcon"/><span class="tooltip-text-interMin"></span>\
							<span class="tooltip-text-interMin">\
							<span class="inthead">International minutes</span><br>\
							<span class="intmsg">Showing usage for the customer’s most used Zone</span></span></span></div>\
							<div class="section-content">\
								<div class="row">\
									<div class="row-title columntittle">Inclusion</div>\
									<div class="intervalueSection row-value">'+InclusionPrepay+'</div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="divider"></div>\
				<!-- Additional Plan Information -->\
				<div class="section">\
					<div class="section-title" id ="'+sAssetId+'inAddPlan">In addition to the plan</div>\
					<div class="section-content">\
						<div class="row">\
							<div class="row-title addPlanLable" id="'+sAssetId+'mpp">MPPs</div>\
							<div class="addPlan row-value" id="'+sAssetId+'mpp">'+mpp+'</div>\
						</div>\
						<div class="row">\
							<div class="row-title addPlanLable" id="'+sAssetId+'app">APPs</div>\
							<div class="addPlan row-value" id="'+sAssetId+'app">'+app+'</div>\
						</div>\
						<div class="row">\
							<div class="row-title addPlanLable" id="'+sAssetId+'addon">Add-ons</div>\
							<div class="addPlan row-value" id="'+sAssetId+'addon">'+addons+'</div>\
						</div>\
						<div class="row" id="'+sAssetId+'bundel">\
							<div class="row-title addPlanLable" id="'+sAssetId+'bundel">Bundle benefits</div>\
							<div class="addPlan row-value" id="'+sAssetId+'bundel">$'+bundle+' off</div>\
						</div>\
					</div>\
				</div>\
			</div>');
			
	  }
		
	 $('#ViewLimitedusers').on('click',function(){
		event.preventDefault();
		console.log("ViewLimitedusers Clicked");
		var assetApplet =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
		var sAssetId = assetApplet.GetBusComp().GetFieldValue("Id");
		$("#Linkedcontact").removeClass("Linkedcontactdisplaynone");
		CreateLinkTable(sAssetId);
		});
		function CreateLinkTable(sAssetId)
			{
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Output = SiebelApp.S_App.NewPropertySet();
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				Inputs.SetProperty("Service Name", "TPG Asset Entitlement BS");
				Inputs.SetProperty("Method Name", "GetLimitedUser");
				Inputs.SetProperty("AssetId", sAssetId);
				Output = ser.InvokeMethod("Run Process", Inputs);
				var limitedUserscount = Output.childArray[0].propArray.LimitedUserCount
				var temp = Output.GetChildByType("ResultSet");
				var dataa = temp.childArray[0].childArray;
				var arry=[];
		for (let i =0; i<dataa.length;i++){
			var obj={};
			obj.Contactid = dataa[i].propArray.ContactId
			obj.fullname = dataa[i].propArray.FullName;
			obj.Role = dataa[i].propArray.Role;
			obj.Status = dataa[i].propArray.Status;
			arry.push(obj);
		}
		//$("#vha-img-pega-LinkedcontactTable").html("");
		var Gotoview = '<a id ="Gotooverview" href="#">Go to overview</a>'
		var anchor = $("<a>")
			anchor.attr("href", "#");
			anchor.text("Go to view");
		
		//$("#vha-img-pega-LinkedcontactTable").empty();
		$("#vha-img-pega-LinkedcontactTable tbody").empty();
		$.each(arry, function (index, item) {
			console.log(item.Contactid);
			var anchor = $("<a>").attr("href", "#").attr("Contactid",item.Contactid).attr("Id","gotoView-LimitedContacts").attr("class","gotoviewLimitedContact").text("Go to view");
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
	
	
			$(document).on('click','.gotoviewLimitedContact', function() {
				event.preventDefault();
				console.log("GotoView Clicked")
				//var conId = $('.gotoviewLinkedContact').attr('Contactid');
				var conId = $(this).attr('Contactid');
				SiebelApp.S_App.SetProfileAttr("VHA Cotact Primary Id",conId);
				//GotoviewwithrowId("VHA Customer Dashboard View","","","VHA Customer Dashboard","");
				SiebelApp.S_App.GotoView("VHA Customer Dashboard View");
			});	
			
			hideDivIfValueInvalid(mpp,"",sAssetId+'mpp');
			hideDivIfValueInvalid(app,"",sAssetId+'app');
			hideDivIfValueInvalid(addons,"",sAssetId+'addon');
			hideDivIfValueInvalid(bundle,"",sAssetId+'bundel');
	 if ((mpp === null || mpp === undefined || mpp.trim() === "") && (app === null || app === undefined || app.trim() === "") && (addons === null || addons === undefined || addons.trim() === "") && (bundle === null || bundle === undefined || bundle.trim() === ""))
		{
			//$("#inAddPlan").after('<div id ="noAddPlan">No additions to the plan</div>')
			$("#"+sAssetId+"inAddPlan").after('<div id ="noAddPlan">No additions to the plan</div>');
			
		}
			
	  
	 function hideDivIfValueInvalid(value,className,idval) 
	 {
		if (value === null || value === undefined || value.trim() === "") 
		{
			if(className != null && className != undefined && className != "" )
			{
			$("."+className).css("display","none");
			}
			if(idval != null && idval != undefined && idval != "" )
			{
			$("#"+idval).css("display","none");
			}
		}
	}
	   $('.refreshbtnnbaoffer').click();
	});
	 var assetApplet =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
		var pm = assetApplet.GetPModel();
		var recordSet = pm.Get("GetRecordSet");
		var selectedIndex = pm.Get("GetSelection");
		if(recordSet.length == 0)
		{
			//actboday= $("table[summary='Recent activities']").find('tbody');
			//actboday.append('<tr class="Nodata"><td Id="Noassetdata" colspan="5">No Assets</td></tr>');
		}
	/*$("td[aria-roledescription='Quick links']").on('click','#QuickLinkAction', function() {
	  /*var clickedRow = $(this).closest('tr'); // Get the row where the click happened
	  console.log('Quicklink:', clickedRow); // Do something with the row
	  event.preventDefault();*/
	  /*var assetApp =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
	  var pm = assetApp.GetPModel();
	  var inp = SiebelApp.S_App.NewPropertySet();
                    inp.SetProperty("SWEH", "350");
                    inp.SetProperty("SWEW", "800");
                    inp.SetProperty("SWETA", "VHA Dashboard Tasks Invoke Popup Applet");
                    inp.SetProperty("SWEM", "Edit");
                    pm.ExecuteMethod("InvokeMethod", "ShowPopup", inp);
	});*/
	$("td[aria-roledescription='Info']").on('click', '.minus-button', function() {
	  var clickedRow = $(this).closest('tr'); // Get the row where the click happened
	  console.log('Clicked row data:', clickedRow); // Do something with the row
	  event.preventDefault();
		clickedRow.find(".minus-button").addClass("displaynone");
		clickedRow.find(".plus-button").removeClass("displaynone");
		clickedRow.next("tr").remove();
	});
	
	
		
	$("td[aria-roledescription='Quick links']").on('click','#quicklinks',function(){
		console.log("Quick Links Clicked");
		//enableQuicklinks();
		var type = $('input[aria-label="Payment Method"]');
		var paymentMethod = type.val();
		console.log(paymentMethod);
		$(this).empty();
		//$('#quicklinks').css('max-width:','200px');
		buildQuicklinks(paymentMethod);
		enableQuicklinks();
		//buildQuicklinks();
		
	});
	setTimeout(function () {
           $('#quicklinks').click();
		   console.log('quicklinkssss');
        }, 500);
		
		$("td[aria-roledescription='Quick links']").on('change','#quicklinks',function(){
		//$('.quicklinkssection').on('change',function(e){
			
		 event.preventDefault();;
			//var selVal = $('#quicklinks').val();
			var selVal = $(this).val();
			console.log("Quick Links changed"+selVal);
			var assetApp =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
			var assetid = assetApp.GetBusComp().GetFieldValue("Id");
			var assetApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Asset Form Applet");
			var controls = assetApplet.GetControls();
			switch(selVal){
				case 'View full asset':
					GotoviewwithrowId("VF Asset Summary View - with extra IN fields",assetid,"","Asset Mgmt - Asset - Header Form Applet","VF Asset","Asset Mgmt - Asset - Header");
				break;
				case 'Lodge service request':
					createSR("",assetid,"","Asset");
					//GotoviewwithrowId("VF Service Asset List View",assetid,"","Asset Mgmt - Asset - Header Form Applet","VF Asset","Asset Mgmt - Asset - Header");
				break;
				case 'View IMEI details':
					GotoviewwithrowId("VF Asset IMEI History View",assetid,"","Asset Mgmt - Asset - Header Form Applet","VF Asset","Asset Mgmt - Asset - Header");
				break;
				case 'View network settings':
					GotoviewwithrowId("VF Asset Network Settings View",assetid,"","Asset Mgmt - Asset - Header Form Applet","VF Asset","Asset Mgmt - Asset - Header");
				break;
				case 'View orders':
					GotoviewwithrowId("VF Installed Asset Order History View",assetid,"","Asset Mgmt - Asset - Header Form Applet","VF Asset","Asset Mgmt - Asset - Header");
				break;
				case 'View SIM details':
					GotoviewwithrowId("VF Asset SIM Details View",assetid,"","Asset Mgmt - Asset - Header Form Applet","VF Asset","Asset Mgmt - Asset - Header");
				break;
				case '3 Step Upgrade':
					//Billing Account overdue Validation
					if(SiebelApp.S_App.GetProfileAttr("overDueBAexist") == "Y")
					{
									alert("You are unable to create new connection as Billing Account: " + " " + SiebelApp.S_App.GetProfileAttr("overDueBANum") + " " + " is Overdue. Please ensure all account payments are up to date before proceeding.");
                                    return false;
					}
					else
					{
					var threestepUp = controls["3StepUpgrade"].GetInputName();
					$('[name="'+threestepUp+'"]').trigger("click");
					}
					//Billing Account overdue Validation - End
				break;
				case 'Change proposition':
					var changeProps = controls["TransplantProdSvc"].GetInputName();
					$('[name="'+changeProps+'"]').trigger("click");
				break;
				case 'Create new APP':
					//Billing Account overdue Validation
					if(SiebelApp.S_App.GetProfileAttr("overDueBAexist") == "Y")
					{
									//alert("You are unable to create new connection as Billing Account: " + " " + SiebelApp.S_App.GetProfileAttr("overDueBANum") + " " + " is Overdue. Please ensure all account payments are up to date before proceeding.");
									alert("Billing Account: " + SiebelApp.S_App.GetProfileAttr("overDueBANum") + " is Overdue. Please advise the customer to make payment of the overdue amount before proceeding.");
                                    return false;
					}
					else
					{
					var newAPP = controls["New APP"].GetInputName();
					$('[name="'+newAPP+'"]').trigger("click");
					}
				break;
				case 'Modify':
					var Modify = controls["Modify"].GetInputName();
					$('[name="'+Modify+'"]').trigger("click");
				break;
				case 'Upgrade':
					//Billing Account overdue Validation
					if(SiebelApp.S_App.GetProfileAttr("overDueBAexist") == "Y")
					{
									//alert("You are unable to create new connection as Billing Account: " + " " + SiebelApp.S_App.GetProfileAttr("overDueBANum") + " " + " is Overdue. Please ensure all account payments are up to date before proceeding.");
									alert("Billing Account: " + SiebelApp.S_App.GetProfileAttr("overDueBANum") + " is Overdue. Please take payment and enter a valid receipt number to proceed with this order.");
                                    return false;
					}
					else
					{
					var upgrade = controls["Upgrade TBUI"].GetInputName();
					$('[name="'+upgrade+'"]').trigger("click");
					}
					//Billing Account overdue Validation - End
				break;
				case 'Change MSISDN':
					var changeMSISDN = controls["Change MSISDN"].GetInputName();
					$('[name="'+changeMSISDN+'"]').trigger("click");
				break;
				case 'Disconnect':
					var Disconnect = controls["Disconnect"].GetInputName();
					$('[name="'+Disconnect+'"]').trigger("click");
				break;
				case 'Pre to Post':
					var pretopost = controls["PosttoPre Connect TBUI"].GetInputName();
					$('[name="'+pretopost+'"]').trigger("click");
				break;
				case 'Change payment method':
					console.log(selVal);
				break;
				case 'Change Fixed Address':
					var ChangeFixedAddress = controls["Change Fixed Address"].GetInputName();
					$('[name="'+ChangeFixedAddress+'"]').trigger("click");
				break;
					console.log(selVal);
				break;
				case 'Manage IMEI and device care':
					var mangeIMEI = controls["Manage SD IMEI"].GetInputName();
					$('[name="'+mangeIMEI+'"]').trigger("click");
				break;
				case 'SIM swap':
					var sIMSwap = controls["SIM Swap"].GetInputName();
					$('[name="'+sIMSwap+'"]').trigger("click");
				break;
				case 'Manage Service':
				var mangeService = controls["Modify TBUI"].GetInputName();
				$('[name="'+mangeService+'"]').trigger("click");
				break;
					}			
			});
		
			
   }

    VHAAssetlistappletPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHAAssetlistappletPR.superclass.BindEvents.apply(this, arguments);
	 /*var assetrowCounter = document.querySelector('.vha-img-applet4 .siebui-row-counter');
	 console.log(assetrowCounter);*/
		var view = SiebelApp.S_App.GetActiveView();
		var appletMap = view.GetAppletMap();
		var myApplet = appletMap["VHA Customer Dashboard Assets Billing Applet"];
		//var pm = myApplet.GetPModel();
		var pm = this.GetPM();
		var CDAppletId = pm.Get("GetFullId");
		

			
		/*pm.AttachEventHandler("OnRecordSelection", function(){
			var type = $('input[aria-label="Payment Method"]');
			var paymentMethod = type.val();
			console.log(paymentMethod);
		});*/
		
		//$(document).on('click','#ViewLimitedusers',function(){
		
				
			
	

				
	 $(".pay-bill").on('click', function(){
			//$(this).attr('src','images/custom/VHA_Accordion_Expand.png');
			//$(this).attr('id','expandImg');
			event.preventDefault();
		   var billAccnum = $('#billingAccnum').text();
			var ser=SiebelApp.S_App.GetService("VF BS Process Manager");
			var Inputs=SiebelApp.S_App.NewPropertySet();var Output=SiebelApp.S_App.NewPropertySet();
			Inputs.SetProperty("Service Name","VF Damon Service");
			Inputs.SetProperty("Method Name","mGetPaymentURL");
			Inputs.SetProperty("SymbolicURLName","VF PCI Popup Applet");
			Inputs.SetProperty("Value1",billAccnum);
			Inputs.SetProperty("Value2","BAN");
			Output=ser.InvokeMethod("Run Process",Inputs);
			var prop=Output.GetChildByType("ResultSet");
			var surl=prop.GetProperty("URL");
			window.open(surl,"CNN_WindowName","menubar=no,titlebar=no,location=no,resizable=yes,scrollbars=yes,status=yes");
	  }); 
	   $(".generate-payment").on('click', function(){
		   event.preventDefault();
		   var billAccnum1 = $('#billingAccnum').text();
		   //var selAcc = billAccnum1.match(/^\d+/);
		   var selAcc = billAccnum1.split(' (');
		   var billAccnum = selAcc ? selAcc[0] : null;
		   //var billAccnum = billAccnum1.split(' (')[0];
		   GotoviewwithrowId("VHA Billing Account Prepayment UPI View",billAccnum,"Account Number","VF Billing Account Form Applet","VF Billing Account","VF Billing Account");
	  }); 
	  $("#latesinvoicenum").on('click', function(){
		    event.preventDefault();
			var svc = TheApplication().GetService("VF Damon Service");
			var Input = TheApplication().NewPropertySet();
			var Output = TheApplication().NewPropertySet();
			var sARII = TheApplication().GetProfileAttr("InvoiceARII");
			var invoicerowid = $('#latesinvoicenum').attr('InvoiceRowid');
			var ARII = "";
			var sARII = "Australia";
			TheApplication().SetProfileAttr("InvoiceARII", "");
			Input.SetProperty("ARII","Australia");
			Input.SetProperty("RowId",invoicerowid);
			Input.SetProperty("BOName","FS Invoice");
			Input.SetProperty("BCName","FS Invoice");
			
			switch(sARII)
			{
				case "Australia":
					Input.SetProperty("SymbolicURLName", "BillStatementAU");
					Input.SetProperty("Encrypt", "VF AU Encrypt");
					Input.SetProperty("Password", "VF AU Encryption Password");
					break;

				  case "Fiji":
                            sInp.SetProperty("SymbolicURLName", "BillStatementFJ");
                            sInp.SetProperty("Encrypt", "VF FJ Encrypt");
                            sInp.SetProperty("Password", "VF FJ Encryption Password");
                            break;
                      default:
                            alert("Unknown ARII value:" + sARII);
                            returnStructure["CancelOperation"] = true;
                            SiebelApp.S_App.uiStatus.Free();
                            break
                    }
                    svc.InvokeMethod("getURL",Input, Output);
                    var sURL = SiebelApp.S_App.GetProfileAttr("Results");
                    var w = window.open(sURL, "CNN_WindowName", "menubar=no,titlebar=no,location=no,resizable=yes,scrollbars=yes,status=yes");
                    SiebelApp.S_App.uiStatus.Free();
		
	 }); 
	 $(document).on('click','.gotoInvoice', function() {
			  event.preventDefault();
			  console.log("gotoInvoice")
			var svc = TheApplication().GetService("VF Damon Service");
			var Input = TheApplication().NewPropertySet();
			var Output = TheApplication().NewPropertySet();
			var sARII = TheApplication().GetProfileAttr("InvoiceARII");
			var invoicerowid = $(this).attr('invrowid');
			var sARII = "Australia";
			TheApplication().SetProfileAttr("InvoiceARII", "");
			Input.SetProperty("ARII","Australia");
			Input.SetProperty("RowId",invoicerowid);
			Input.SetProperty("BOName","FS Invoice");
			Input.SetProperty("BCName","FS Invoice");
			
			switch(sARII)
			{
				case "Australia":
					Input.SetProperty("SymbolicURLName", "BillStatementAU");
					Input.SetProperty("Encrypt", "VF AU Encrypt");
					Input.SetProperty("Password", "VF AU Encryption Password");
					break;

				  case "Fiji":
                            sInp.SetProperty("SymbolicURLName", "BillStatementFJ");
                            sInp.SetProperty("Encrypt", "VF FJ Encrypt");
                            sInp.SetProperty("Password", "VF FJ Encryption Password");
                            break;
                      default:
                            alert("Unknown ARII value:" + sARII);
                            returnStructure["CancelOperation"] = true;
                            SiebelApp.S_App.uiStatus.Free();
                            break
                    }
                    svc.InvokeMethod("getURL",Input, Output);
                    var sURL = SiebelApp.S_App.GetProfileAttr("Results");
                    var w = window.open(sURL, "CNN_WindowName", "menubar=no,titlebar=no,location=no,resizable=yes,scrollbars=yes,status=yes");
                    SiebelApp.S_App.uiStatus.Free();

		});	
	 
	  $(".view-invoices").on('click', function(){
		  event.preventDefault();
		   $("#recentinvoice").removeClass("displaynone");
		   $(".lastinvoicetext").remove();
		   $("#closerecentinvoice").after('<sapn class="lastinvoicetext">Showing last 3 invoices<\span>')
		    //$("#closerecentinvoice").after('<button class="viewlallInvovice" id="viewlallInvovice" tabindex="3">View all</button>')
		   var selectedbillAcc1 = $("#billingAccnum").text();
		   var selAcc = selectedbillAcc1.split(' (');
		   var selectedbillAcc = selAcc ? selAcc[0] : null;
		   showViewRecentInvoiceTable(selectedbillAcc);
		  // billAccnum = $('#billingAccnum').text();
		   //GotoviewwithrowId("VF Billing Account Payments View - AU",billAccnum,"Account Number","VF Billing Account Form Applet","VF Billing Account","VF Billing Account");
	  }); 
	  $(".vha-ret-popup-close-btn").on('click', function(){
			$("#recentinvoice").addClass("displaynone");
	    }); 
	  $("#closerecentinvoice").on('click', function(){
			$("#recentinvoice").addClass("displaynone");
	    }); 
	   $(".ui-button-icon").on("click", function() {
                    var appletName = SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName();
                    if (appletName == "VHA Dashboard Tasks Invoke Popup Applet") {
                        pm.ExecuteMethod("InvokeMethod", "CloseApplet");
                    }
                });
							
	   $('#billingAccounts').on('change',function(e){
			//$('#billingAccounts').getAttribute('billAccrowid');
			var selVal = $('#billingAccounts').val();
			//console.log(this.getAttribute('billAccrowid'));
			if (selVal == "View all")
			{
			$(".billing-container").addClass("displaynone");
			$('.billing-containerprepay').addClass('displaynone');
			$(".baselection").addClass("displaynone");
			/*var assetApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
			var controls = assetApplet.GetControls();
			var queryBillingAcc = controls["Query BA"].GetInputName();*/
			//SiebelApp.S_App.SetProfileAttr("BillActId","");
			//$('[name="'+queryBillingAcc+'"]').trigger("click");
			//$('[aria-label="Assets & billing List Applet:Query BA"]').trigger("click");
			var assetApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
			var controls = assetApplet.GetControls();
			var queryBillingAcc = controls["Query BA"].GetInputName();
			SiebelApp.S_App.SetProfileAttr("BillActId","");
			$('[name="'+queryBillingAcc+'"]').trigger("click");
			//$('[aria-label="Assets & billing List Applet:Query BA"]').trigger("click");
		
			
			console.log(selVal);
			}
			else
			{
			$(".billing-container").removeClass("displaynone");
			$(".baselection").removeClass("displaynone");
			$("#allactiveAssets").text("Active assets");
			//var selAcc = selVal.match(/^\d+/);
			TheApplication().GetProfileAttr("listofBillingAccounts");
			var selAcc = selVal.split(' (');
			var type = selVal.match(/\(([^)]+)\)/);
			var selectedbillAcc = selAcc ? selAcc[0] : null;
			//var selectedbillAcc = selVal.split(' (')[0];
			assetApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet");
			 controls = assetApplet.GetControls();
			 queryBillingAcc = controls["Query BA"].GetInputName();
			SiebelApp.S_App.SetProfileAttr("BillActId",selectedbillAcc);
			$('[name="'+queryBillingAcc+'"]').trigger("click");
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
			console.log(this.getAttribute('billAccrowid'));
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
			//if (lastInvoice === undefined || lastInvoice === "" || totalAmountDue === 0 || totalAmountDue === 0.0 totalAmountDue === "")
			if (lastInvoice === undefined || lastInvoice === "")// || totalAmountDue === 0 || totalAmountDue === 0.00 || totalAmountDue === "")
			{
				lastInvoice = "N/A" ;
				$('.pay-bill').prop('disabled',true)
				$('.pay-bill').addClass('appletButtonDis');
				$('.generate-payment').prop('disabled',true)
				$('.generate-payment').addClass('appletButtonDis');
				/*$('.view-invoices').prop('disabled',true)
				$('.view-invoices').addClass('appletButtonDis');*/
				$('.view-invoices').addClass('buttondisabled');
				$('.view-invoices').prop('disabled',true)
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
				$('.view-invoices').prop('disabled',false);
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
			$(".billing-status").empty();
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
		});
		
		$('#selectBillingAcc').on('change',function(e){
			var selVal = $('#selectBillingAcc').val();
		    var billAccnum1 = $('#billingAccnum').text();
			//var selAcc = billAccnum1.match(/^\d+/);
			var selAcc = billAccnum1.split(' (');
			var billAccnum = selAcc ? selAcc[0] : null;
			switch(selVal){
		    case 'View full billing account':
			GotoviewwithrowId("VF Billing Account Payments View - AU",billAccnum,"Account Number","VF Billing Account Form Applet","VF Billing Account","VF Billing Account");
		    break;
		    case 'Update payment details':
			GotoviewwithrowId("VF Billing Account Profile View",billAccnum,"Account Number","VF Billing Account Form Applet","VF Billing Account","VF Billing Account");
			break;
		    case 'Lodge service request':
			createSR("","",billAccnum,"BillAccount");
			//GotoviewwithrowId("VF Service Billing Account List View",billAccnum,"Account Number","VF Billing Account Form Applet","VF Billing Account","VF Billing Account");
			break;
		    case 'View orders':
			GotoviewwithrowId("VF Billing Account Order History View",billAccnum,"Account Number","VF Billing Account Form Applet","VF Billing Account","VF Billing Account");
			break;
			case 'Update automatic recharge':
			GotoviewwithrowId("VF Credit Card View - AU",billAccnum,"Account Number","VF Billing Account Form Applet","VF Billing Account","VF Billing Account");
			break;
			}
		});
		
	 function showViewRecentInvoiceTable(selectedbillAcc)
	{
		$("#vha-img-pega-recentinvoicetTable tbody").empty();
		var Inputs = SiebelApp.S_App.NewPropertySet();
		var Output = SiebelApp.S_App.NewPropertySet();
		var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
		Inputs.SetProperty("Service Name", "VHA Get Invoice Details BS");
		Inputs.SetProperty("Method Name", "FetchInvoiceDetails");
		Inputs.SetProperty("AccountNum", selectedbillAcc);
		var Output = ser.InvokeMethod("Run Process", Inputs);
		var ResultSet = Output.GetChildByType("ResultSet");
        var recentInvoice =ResultSet.childArray;
		var recentInvoiceCount =recentInvoice.length;
		var recentInvoicearry=[];
		for (let i =0; i<recentInvoice.length;i++){
			var obj={};
			obj.DueDate = recentInvoice[i].propArray['Due Date'];
			obj.Amount = recentInvoice[i].propArray.Amount;
			obj.invNum = recentInvoice[i].propArray['Invoice Number'];
			obj.invrowid = recentInvoice[i].propArray['Row Id'];
			obj.Status = recentInvoice[i].propArray.Status;
			recentInvoicearry.push(obj);
		}
		//$("#vha-img-pega-LinkedcontactTable").html("");
		var Gotoview = '<a id ="Gotooverviewasset" href="#">Go to overview</a>'
		var anchor = $("<a>")
			anchor.attr("href", "#");
			
		$.each(recentInvoicearry, function (index, item) {
			var row = $("<tr>");
			var td = $("<td>");
			//anchor.text(item.invNum);
			var anchor = $("<a>").attr("href", "#").attr("invrowid",item.invrowid).attr("class","gotoInvoice").text("#"+item.invNum);
			//row.append(td.append(anchor));
			row.append($("<td>").append(anchor));
			//row.append($("<td>").text(item.invNum));
			row.append($("<td>").text(item.Status));
			row.append($("<td>").text(item.DueDate));
			row.append($("<td>").text("$"+item.Amount));
			$("#vha-img-pega-recentinvoicetTable").append(row);
		});

}
	 function queryByBillingAccount(selectedbillAcc) {
		 
		 var Buscom = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet").GetBusComp();
		 if (Buscom)
		 {
			 Buscom.InvokeMethod("SetSearchSpec","Id","2-4YI0HQH");
			 Buscom.InvokeMethod("ExecuteQuery","ForwardOnly");
		 }
		 
			/*var Accnum = "2-4YI13C9"
			var searchSpec = "[Id] = '" + Accnum + "'";
			SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard AssetBilling List Applet").InvokeMethod("SetSearchSpec","Id","[Id] = '" + Accnum + "'");
			SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard AssetBilling List Applet").InvokeMethod("ExecuteQuery");*/
			/*var applet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard AssetBilling List Applet");
			var searchSpec = "[Billing Account Number] = '" + selectedbillAcc + "'";
			applet.InvokeMethod("SetSearchSpec",searchSpec);
			applet.InvokeMethod("ExecuteQuery");*/
		  }
	     function formatDate(date) {
				const options = { day: '2-digit', month: 'short', year: 'numeric' };
				return new Date(date).toLocaleDateString('en-GB', options);
		}
	}

    VHAAssetlistappletPR.prototype.EndLife = function () {
     SiebelAppFacade.VHAAssetlistappletPR.superclass.EndLife.apply(this, arguments);
	
	 
    }
			function GotoviewwithrowId(viewname,queryvalue,queryfield,applet,bo,bc){
					$('#VHAAssetDashBoard').addClass('displaynone');
					var Inputs = SiebelApp.S_App.NewPropertySet();
					var Output = SiebelApp.S_App.NewPropertySet();
					var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
					Inputs.SetProperty("Service Name","VHA MSISDN GotoView BS");
					Inputs.SetProperty("Method Name","GotoView");
					Inputs.SetProperty("BusObjName",bo);
					Inputs.SetProperty("BusCompName",bc);
					Inputs.SetProperty("QueryField",queryfield);
					Inputs.SetProperty("RowId",queryvalue);
					Inputs.SetProperty("ViewName",viewname);
					var Output = ser.InvokeMethod("Run Process",Inputs);
		}
		function createSR(AccountId,AssetId,BillAccountNo,Type)
		{
		var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
		var Inputs = SiebelApp.S_App.NewPropertySet();
		var Outputs = SiebelApp.S_App.NewPropertySet()
		Inputs.SetProperty("ProcessName", "VHA Create Service Request");
		Inputs.SetProperty("AccountId",AccountId);
		Inputs.SetProperty("AssetId",AssetId);
		Inputs.SetProperty("BillAccountNo",BillAccountNo);
		Inputs.SetProperty("Type",Type);
		Outputs = ser.InvokeMethod("RunProcess", Inputs);
		}
function getAssetMoreInfo(sAssetId)
{
	var Inputs = SiebelApp.S_App.NewPropertySet();
	var Output = SiebelApp.S_App.NewPropertySet();
	var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
	Inputs.SetProperty("Service Name", "VHA Activity Custom BS");
	Inputs.SetProperty("Method Name", "GetMPPDetails");
	Inputs.SetProperty("AssetId",sAssetId);
	var Output = ser.InvokeMethod("Run Process", Inputs);
	var ResultSet = Output.GetChildByType("ResultSet");
	var formatedMPPDetails = ResultSet.GetProperty("Device Name");

	Inputs.SetProperty("Method Name", "GetBundleSaveVal");
	var Output = ser.InvokeMethod("Run Process", Inputs);
	var ResultSet = Output.GetChildByType("ResultSet");
	var Bundel = ResultSet.GetProperty("BundleSave");

	Inputs.SetProperty("Method Name", "GetAddOns");
	var Output = ser.InvokeMethod("Run Process", Inputs);
	var ResultSet = Output.GetChildByType("ResultSet");
	var AddOns = ResultSet.GetProperty("AddOnNames");

	Inputs.SetProperty("Method Name", "GetAccessory");
	var Output = ser.InvokeMethod("Run Process", Inputs);
	var ResultSet = Output.GetChildByType("ResultSet");
	var formatedAPPDetails = ResultSet.GetProperty("Accessory");

	return [formatedAPPDetails,formatedMPPDetails,Bundel,AddOns];
}
function getExistingSeledtedServiceDetails(sAssetId) 
{
                //UI

                var serviceAssets = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputstasset = SiebelApp.S_App.NewPropertySet();
                Inputstasset.SetProperty("ProcessName", "VHA Sales Calculator Asset Details WF");
                Inputstasset.SetProperty("Object Id", sAssetId);
                var outasset = serviceAssets.InvokeMethod("RunProcess", Inputstasset);

                var resultset = outasset.GetChildByType("ResultSet");
                var aUpgradeEligibity = resultset.propArray;
                var SiebMessageasset = resultset.GetChildByType("SiebelMessage");

                selService = JSON.parse(JSON.stringify(SelectedServiceJSON()));

                selService.ExistingContractUI.AssetId = sAssetId;
                var ExistingContract = VHAAppUtilities.SiebelMessageToArray(SiebMessageasset.childArray[0]);
                if (ExistingContract.length > 0) {
                    selService.ExistingContractUI.BundleandSave = ExistingContract[0]["BundleandSave"];
                    selService.ExistingContractUI.LoyaltyDiscount = ExistingContract[0]["LoyaltyDiscount"];
                    selService.ExistingContractUI.Credit = ExistingContract[0]["Credit"];
                    selService.ExistingContractUI.ActiveGPPCount = ExistingContract[0]["ActiveGPPCount"];
                    selService.ExistingContractUI.PropositionName = ExistingContract[0]["PropositionName"];
                    selService.ExistingContractUI.PropositionSAMId = ExistingContract[0]["PropositionSAMId"];
                }

                var PlanDetails = VHAAppUtilities.SiebelMessageToArray(SiebMessageasset.childArray[0].childArray[0].childArray[1]);
                if (PlanDetails.length > 0) {
                    selService.ExistingContractUI.EarlyUpgradeFee = PlanDetails[0]["EarlyUpgradeFee"];
                    selService.ExistingContractUI.CurrentPlan = PlanDetails[0]["CurrentPlan"];
                    selService.ExistingContractUI.CurrentPlanPrice = PlanDetails[0]["Price"];
                }
                var GPPDetails = VHAAppUtilities.SiebelMessageToArray(SiebMessageasset.childArray[0].childArray[0].childArray[3]);
                if (GPPDetails.length > 0) {
                    var currentDvc = "";
                    var formatedMPPDetails = [];
                    for (var j = 0; j < GPPDetails.length; j++) {
                        if (j > 0) {
                            currentDvc = JSON.parse(JSON.stringify(SelectedServiceJSON().ExistingContractUI.Device[0]));
                        } else {
                            currentDvc = selService.ExistingContractUI.Device[0];
                        }
                        currentDvc.ItemName = GPPDetails[j]["ItemName"];
                        currentDvc.RemMonths = GPPDetails[j]["RemMonths"];
                        currentDvc.Charge = GPPDetails[j]["GPPCharge"];
                        currentDvc.IntegrationId = GPPDetails[j]["IntegrationId"];
                        currentDvc.MonthlyPrice = GPPDetails[j]["GPPMonthlyPrice"];
						var productName = APPDetails[j]["ItemName"];
						var remMothn = APPDetails[j]["RemMonths"];
						var remAmt = APPDetails[j]["GPPCharge"];
						var formattedString = `${productName}(${remMothn} of 36, ${remAmt})`;
						formatedMPPDetails.push(formattedString);
                        if (j > 0)
                            selService.ExistingContractUI.Device.push(currentDvc);
                    }
                }
				else{
					var formatedMPPDetails = ["iPhone 15 Pro Max 256GB Graphite (month 35 of 36, $35.52 remaining)","iPhone 14 Pro 256GB Graphite (month 2 of 12, $85.52 remaining)"];
				}
                var APPDetails = VHAAppUtilities.SiebelMessageToArray(SiebMessageasset.childArray[0].childArray[0].childArray[2]);
                if (APPDetails.length > 0) {
                    var currentDvc = "";
					var formatedAPPDetails = [];
                    for (var j = 0; j < APPDetails.length; j++) {
                        if (j > 0) {
                            currentDvc = JSON.parse(JSON.stringify(SelectedServiceJSON().ExistingContractUI.APP[0]));
                            currentDvcAPPDetails = JSON.parse(JSON.stringify(SelectedServiceJSON().ExistingContractUI.APP[0]));
                        } else {
                            currentDvc = selService.ExistingContractUI.APP[0];
                            currentDvcAPPDetails = selService.ExistingContractUI.APP[0];
                        }
                        currentDvc.ItemName = APPDetails[j]["ItemName"];
                        currentDvc.RemMonths = APPDetails[j]["RemMonths"];
                        currentDvc.Charge = APPDetails[j]["GPPCharge"];
                        currentDvc.IntegrationId = APPDetails[j]["IntegrationId"];
                        currentDvc.MonthlyPrice = APPDetails[j]["GPPMonthlyPrice"];
						var productName = APPDetails[j]["ItemName"];
						var remMothn = APPDetails[j]["RemMonths"];
						var remAmt = APPDetails[j]["GPPCharge"];
						var formattedString = `${productName}(${remMothn} of 36, ${remAmt})`;
						formatedAPPDetails.push(formattedString);
						
                        if (j > 0)
						{
                            selService.ExistingContractUI.APP.push(currentDvc);
						}
                    }
                }
				else{
					var formatedAPPDetails = ["AirPods Pro (2nd gen) (month 18 of 36, $199.44 remaining)","AirPods(month 8 of 12, $20.44 remaining)"];
				}
                //debugger;
                //APP SD & Acc - remaining months pending
				return [formatedAPPDetails,formatedMPPDetails];
            }
	function SelectedServiceJSON(){
		var selService ={
			ExistingContractUI:{
				CurrentPlan:"",
				CurrentPlanPrice:0,
				EarlyUpgradeFee:0,
				BundleandSave:0,
				LoyaltyDiscount:0,
				Credit:0,
				ActiveGPPCount:0,
				RestrictedDiscount:0,
				PropositionName:"",
				PropositionSAMId:"",
				Device:[{
					ItemName:"",
					RemMonths:"",
					Charge:0,
					IntegrationId:""
				}],
				APP:[{
					ItemName:"",
					RemMonths:"",
					Charge:0,
					IntegrationId:""
				}],
				PlanItem:{
					Action:"",
					Name:"",
					Code:"",
					ProdIntegrationId:"",
					Price:"",
					ProductId:"",
					Type:""
				}
			}
		}
		return selService;
	}
function enableQuicklinks(){

			var threeStepUpgrade = $('button[title="Asset Form Applet:3 Step Upgrade"]');
			var threeStepUpgradeButton = threeStepUpgrade.prop('disabled');
			var changeProposition = $('button[title="Asset Form Applet:Change Proposition"]');
			var changePropositionButton = changeProposition.prop('disabled');
			var createNewApp = $('button[title="Asset Form Applet:Create New APP"]');
			var createNewAppButton = createNewApp.prop('disabled');
			var modify = $('button[title="Asset Form Applet:Modify"]');
			var modifyButton = modify.prop('disabled');
			var upgrade = $('button[title="Asset Form Applet:Upgrade"]');
			var upgradeButton = upgrade.prop('disabled');
			var mangeIMEI = $('button[title="Asset Form Applet:Manage IMEI & Device Care"]');
			var mangeIMEIbutton = mangeIMEI.prop('disabled');
			var simSwap = $('button[title="Asset Form Applet:SIM Swap"]');
			var simSwapButton = simSwap.prop('disabled');
			var pretoPostConnect = $('button[title="Asset Form Applet:Pre to Post Connect"]');
			var pretoPostConnectButton = pretoPostConnect.prop('disabled');
			var disconnect = $('button[title="Asset Form Applet:Disconnect"]');
			var disconnectButton = disconnect.prop('disabled');
			var disconnect = $('button[title="Asset Form Applet:Disconnect"]');
			var disconnectButton = disconnect.prop('disabled');
			//var changeMSISDN = $('button[title="Asset Form Applet:Change MSISDN"]');
			var changeMSISDNButton =  $('button[title="Asset Form Applet:Change MSISDN"]').prop('disabled');
			var changeFixedAddrs =  $('button[title="Asset Form Applet:Change Fixed Address"]').prop('disabled');
			
				if (modifyButton)
				{
					$('#quicklinks option[value="Modify"]').prop('disabled',true)
				}
				if (threeStepUpgradeButton)
				{
					$('#quicklinks option[value="3 Step Upgrade"]').prop('disabled',true)
				}
				if (changePropositionButton)
				{
					$('#quicklinks option[value="Change proposition"]').prop('disabled',true)
				}
				if (createNewAppButton)
				{
					$('#quicklinks option[value="Create new APP"]').prop('disabled',true)
				}
				if (upgradeButton)
				{
					$('#quicklinks option[value="Upgrade"]').prop('disabled',true)
				}
				if (mangeIMEIbutton)
				{
					$('#quicklinks option[value="Manage IMEI and device care"]').prop('disabled',true)
				}
				if (simSwapButton)
				{
					$('#quicklinks option[value="SIM swap"]').prop('disabled',true)
				}
				if (pretoPostConnectButton)
				{
					$('#quicklinks option[value="Pre to Post"]').prop('disabled',true)
				}
				if (disconnectButton)
				{
					$('#quicklinks option[value="Disconnect"]').prop('disabled',true)
				}
				if (changeMSISDNButton)
				{
					$('#quicklinks option[value="Change MSISDN"]').prop('disabled',true)
				}
				if (changeFixedAddrs)
				{
					$('#quicklinks option[value="Change Fixed Address"]').prop('disabled',true)
				}
				
}
function buildQuicklinks(type){
	//$('#quicklinks').empty();
	if (type == "Postpay")
	{
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Action">Action</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View full asset">View full asset</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="3 Step Upgrade">3 Step Upgrade</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Change proposition">Change proposition</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Create new APP">Create new APP</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Modify">Modify</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Upgrade">Upgrade</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Change MSISDN">Change MSISDN</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Disconnect">Disconnect</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Lodge service request">Lodge service request</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Manage IMEI and device care">Manage IMEI and device care</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Manage Service">Manage Service</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="SIM swap">SIM swap</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View IMEI details">View IMEI details</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View network settings">View network settings</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View orders">View orders</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View SIM details">View SIM details</option>');
	}
	else if (type == "Prepay")
	{
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Action">Action</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View full asset">View full asset</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Pre to Post">Pre to Post</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Change MSISDN">Change MSISDN</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Change payment method">Change payment method</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Lodge service request">Lodge service request</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="SIM swap">SIM swap</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View network settings">View network settings</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View orders">View orders</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View SIM details">View SIM details</option>');
	}
	else
	{
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Action">Action</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View full asset">View full asset</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Change proposition">Change proposition</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Create new APP">Create new APP</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Modify">Modify</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Change Fixed Address">Change Fixed Address</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Disconnect">Disconnect</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Lodge service request">Lodge service request</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Manage IMEI and device care">Manage IMEI and device care</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="SIM swap">SIM swap</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View IMEI details">View IMEI details</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View network settings">View network settings</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View orders">View orders</option>');
		$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View SIM details">View SIM details</option>');

	}
	/*$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View full asset">View full asset</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="3 Step Upgrade">3 Step Upgrade</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Change proposition">Change proposition</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Create new APP">Create new APP</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Modify">Modify</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Upgrade">Upgrade</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Change MSISDN">Change MSISDN</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Disconnect">Disconnect</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Lodge service request">Lodge service request</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Manage IMEI and device care">Manage IMEI and device care</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="SIM swap">SIM swap</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View IMEI details">View IMEI details</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View network settings">View network settings</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View orders">View orders</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="View SIM details">View SIM details</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Pre to Post">Pre to Post</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Change payment method">Change payment method</option>');
	$("td[aria-roledescription='Quick links']").find('#quicklinks').append('<option value="Change NBN address">Change NBN address</option>');*/
}

function showmoreAssetDetails(formatedAPPDetails,formatedMPPDetails,Bundel,AddOns)
{
	var sharingGroup = "Family (used 100 of 300 GB";
	var limitedUsers = "None";
	var dataInclusion = "180.00 GB";
	var datalastmontusage = "100.00 GB";
	var dataavrgmontusage = "120.00 GB (6mo average)";
	var intInclusion = "300m (Zone 2)";
	var intlastMonthUsag = "100m (Zone 2)";
	var intavgmntusage = "100m (Zone 2)";
	var intInclusion = "120m (Zone 2)";
	//var mpp ="iPhone 15 Pro Max 256GB Graphite (month 35 of 36, $35.52 remaining)";
	//var app ="AirPods Pro (2nd gen) (month 18 of 36, $199.44 remaining)";
	//var addons ="Vodafone Device Care (iPhone 15 Pro Max 256GB Graphite)";
	//var bundle ="2nd mobile service $5 off";
	
	/*var mpp = formatedMPPDetails.join(',');
	var app = formatedAPPDetails.join(',');
	var addons = AddOns.join(',');
	var bundle = Bundel.join(',');*/
	var mpp = formatedMPPDetails;
	var app = formatedAPPDetails;
	var addons = AddOns;
	var bundle = Bundel;
	
	
}	



    return VHAAssetlistappletPR;
   }()

  );
  return "SiebelAppFacade.VHAAssetlistappletPR";
 })
}
