if (typeof(SiebelAppFacade.VHACustomerDashboardRecentActivitiesListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHACustomerDashboardRecentActivitiesListAppletPR");
 define("siebel/custom/VHACustomerDashboardRecentActivitiesListAppletPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.VHACustomerDashboardRecentActivitiesListAppletPR = (function () {

    function VHACustomerDashboardRecentActivitiesListAppletPR(pm) {
     SiebelAppFacade.VHACustomerDashboardRecentActivitiesListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHACustomerDashboardRecentActivitiesListAppletPR, SiebelAppFacade.JQGridRenderer);

    VHACustomerDashboardRecentActivitiesListAppletPR.prototype.Init = function () {
     SiebelAppFacade.VHACustomerDashboardRecentActivitiesListAppletPR.superclass.Init.apply(this, arguments);
	    }

    VHACustomerDashboardRecentActivitiesListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHACustomerDashboardRecentActivitiesListAppletPR.superclass.ShowUI.apply(this, arguments);
    }

    VHACustomerDashboardRecentActivitiesListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHACustomerDashboardRecentActivitiesListAppletPR.superclass.BindData.apply(this, arguments);
	 if($("td[aria-roledescription='Expand']").find('.plus-button').length === 0)
	{
	  $("td[aria-roledescription='Expand']").prepend('<div class="plus-button"><img id="plus" src="images/custom/menu-icons/PlusExpand.svg"></div><div class="minus-button displaynone"><img id="minus" src="images/custom/menu-icons/minusIcon.svg"></img></div>');
	}
	//var icon = document.querySelector('[id*="Expandicon"]').querySelector('div');
	
	//icon.textContent = "";
	if($('div[id*="Expandicon"]').length > 0)
	{
		$('div[id*="Expandicon"]').text('');
	}
	//var recentActtable = document.querySelector("table[summary='Recent activities']");
			
	
			noData("VHA Customer Dashboard Assets Billing Applet","Assets & billing","noAsset","Nodata","No Assets","5",".vha-img-applet4","pagenavigationAsset");
			noData("VHA Customer Dashboard Recent Activities Applet","Recent activities","noAct","Nodata","No user-generated activities","3",".vha-img-applet7","viewAllactivities");
			noData("VHA Customer Dashboard Public Notes Applet","Active public notes","noPubNote","Nodata","No Active public notes","1",".vha-img-applet6","pagenavigationNotes");
			noData("VHA Customer Dashboard Service Requests Applet","Active service requests","noSR","Nodata","No active service requests","3",".vha-img-applet8","pagenavigationSR");
			/* NBA Offer Code*/
			noData("VHA Customer Dashboard NBA Offers List Applet","Next Best Activity (NBA) Offers","nooffer","Nodata","No available offers","5",".vha-img-applet5","pagenavigationOffer");
			/* NBA Offer Code*/
			
			
			function noData(appletName,summary,classname,Idval,msg,colCount,appid,pagenavigationID){
				var appletName =  SiebelApp.S_App.GetActiveView().GetApplet(appletName);
				var pm = appletName.GetPModel();
				var recordSet = pm.Get("GetRecordSet");
				var recCount = recordSet.length
				var pagenavigationID = pagenavigationID;
				//var actboday= $("table[summary='"+summary+"']").find('tbody');
				    $("table[summary='"+summary+"']").find('tbody').parents('.ui-jqgrid').find('.siebui-applet-footer').find('.ui-pg-button').children('span').css('padding','0px');
					$("table[summary='"+summary+"']").find('tbody').parents('.ui-jqgrid').find('.siebui-applet-footer').find('.ui-pg-button').css('width','24');
				if (recCount == 0)
					{
						//actboday = $("table[summary="""+summary+""'"]").find('tbody');	
						//actboday= $("table[summary='Recent activities']").find('tbody');							
						actboday= $("table[summary='"+summary+"']").find('tbody');		
						if(actboday.find('#Nodata').length == 0) 	
						{						
							//actboday.append('<tr> class "'+classname+'"><td Id ="'+Idval+'" colspan="'+colCount+'">+'msg'+</td></tr>');
							actboday.append('<tr> class "'+classname+'"><td Id ="Nodata" colspan="'+colCount+'">'+msg+'</td></tr>');
							$(appid).addClass("rowCounterismoved");
						}
						$('#'+pagenavigationID).remove();
					}
					
			}
						
						$("#viewAllactivities").remove();
						$("#recentcounter").remove();
						var recAcc = SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Recent Activities Applet").GetBusComp().GetRecordSet().length;
						if ($("table[summary='Recent activities']").find('.viewAllactivitiesadded').length === 0) {
						 var rowCounter = $(".vha-img-applet4").find(".siebui-row-counter");
								if(recAcc == "3")
								{
									$("#recentcounter").remove();
								$("table[summary='Recent activities']").after('<div id="recentcounter">Showing last 3 user-generated activities</div>');
								}
								if(recAcc == "2"){
									$("#recentcounter").remove();
									$("table[summary='Recent activities']").after('<div id="recentcounter">1 - 2 of 2 user generated activities</div>');
								}
								if(recAcc == "1"){
									$("#recentcounter").remove();
									$("table[summary='Recent activities']").after('<div id="recentcounter">1 - 1 of 1 user generated activities</div>');
								}
								if(recAcc == "0"){
									$("#recentcounter").remove();
								}
						$("table[summary='Recent activities']").after('<div id="viewAllactivities"><a id="viewAllactivitieslink" href="#" tabindex="1">View all activities</a></div>');
						$("table[summary='Recent activities']").addClass('viewAllactivitiesadded');
						}
						
						
						
								
						if($(".vha-img-applet4").find(".rowCounterismoved").length == 0)
						{
						$(".vha-img-applet4").find('.siebui-row-counter').addClass("Counter");
						rowCounter = $(".vha-img-applet4").find(".siebui-row-counter");
						//$(".vha-img-applet4").find(".pagenavigation").prepend(rowCounter);
						var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Assets Billing Applet").GetPModel().Get("GetFullId");
						//$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").append(rowCounter);
						$("#s_"+AssetAppletId+"_div").find(".ui-corner-bottom").prepend(rowCounter);
						$(".vha-img-applet4").addClass("rowCounterismoved");
							$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().removeClass('displaynone');
							$("#s_"+AssetAppletId+"_div").find('.siebui-row-counter').removeClass('onlycounterasset');
							$(".vha-img-applet4").find('.siebui-row-counter').removeClass("displaynone");
							if($("#s_"+AssetAppletId+"_div").find(".siebui-row-counter").text() == "No Records")
							{
								$(".vha-img-applet4").find('.siebui-row-counter').addClass("displaynone");
								$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
							}
							if($("#s_"+AssetAppletId+"_div").find(".siebui-row-counter").text().slice(-1) != "+")
							{
								$(".vha-img-applet4").find('.siebui-row-counter').addClass("onlycounterasset");
								$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
								//$("#s_"+AssetAppletId+"_div").find("[id^='first_pager']").parent().hide();
							}
						}
						/* NBA Offer Code*/
						if($(".vha-img-applet5").find(".rowCounterismoved").length == 0)
						{
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
						}
						/* NBA Offer Code*/
						if($(".vha-img-applet6").find(".rowCounterismoved").length == 0)
						{
						$(".vha-img-applet6").find('.siebui-row-counter').addClass("Counter");
						rowCounter = $(".vha-img-applet6").find(".siebui-row-counter");
						//$(".vha-img-applet6").find(".pagenavigation").prepend(rowCounter);
						var NotesAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Public Notes Applet").GetPModel().Get("GetFullId");
						//$("#s_"+NotesAppletId+"_div").find("[id^='first_pager']").append(rowCounter);
						$("#s_"+NotesAppletId+"_div").find(".ui-corner-bottom").prepend(rowCounter);
						$(".vha-img-applet6").addClass("rowCounterismoved");
							$("#s_"+NotesAppletId+"_div").find("[id^='first_pager']").parent().removeClass('displaynone');
							$(".vha-img-applet6").find('.siebui-row-counter').removeClass('onlycounter');
							$(".vha-img-applet6").find('.siebui-row-counter').removeClass("displaynone");
							if($("#s_"+NotesAppletId+"_div").find(".siebui-row-counter").text() == "No Records")
							{
								$(".vha-img-applet6").find('.siebui-row-counter').addClass("displaynone");
								$("#s_"+NotesAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
							}
							if($("#s_"+NotesAppletId+"_div").find(".siebui-row-counter").text().slice(-1) != "+")
							{
								$(".vha-img-applet6").find('.siebui-row-counter').addClass("onlycounter");
								$("#s_"+NotesAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
							}
						}
						$("div[id$='SR_Number']").text("SR #");
						if($(".vha-img-applet8").find(".rowCounterismoved").length == 0)
						{
						$(".vha-img-applet8").find('.siebui-row-counter').addClass("Counter");
						rowCounter = $(".vha-img-applet8").find(".siebui-row-counter");
						//$(".vha-img-applet8").find(".pagenavigation").prepend(rowCounter);
						var SRAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Service Requests Applet").GetPModel().Get("GetFullId");
						//$("#s_"+SRAppletId+"_div").find("[id^='first_pager']").append(rowCounter);
						$("#s_"+SRAppletId+"_div").find(".ui-corner-bottom").prepend(rowCounter);
						$(".vha-img-applet8").addClass("rowCounterismoved");
							$("#s_"+SRAppletId+"_div").find("[id^='first_pager']").parent().removeClass('displaynone');
							$(".vha-img-applet8").find('.siebui-row-counter').removeClass('onlycounterSR');
							$(".vha-img-applet8").find('.siebui-row-counter').removeClass("displaynone");
							if($("#s_"+SRAppletId+"_div").find(".siebui-row-counter").text() == "No Records")
							{
								$(".vha-img-applet8").find('.siebui-row-counter').addClass("displaynone");
								$("#s_"+SRAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
							}
							if($("#s_"+SRAppletId+"_div").find(".siebui-row-counter").text().slice(-1) != "+")
							{	
								$(".vha-img-applet8").find('.siebui-row-counter').addClass("onlycounterSR");
								$("#s_"+SRAppletId+"_div").find("[id^='first_pager']").parent().addClass('displaynone');
							}
						}
						$(".vha-img-applet7").find(".siebui-row-counter").hide();
						$("[aria-label='Public Notes List Applet: Menu']").addClass("displaynone");
						$('[aria-label^="Active public notes List Applet:"]').addClass("displaynone");
						$('[aria-label="Active public notes List Applet: Menu"]').addClass('displaynone');
						$('[aria-label="Active public notes List Applet:Show More"]').addClass('displaynone');
						if($('table[summary="Active public notes"]').find('tr').length > 0)
						{
							$('table[summary="Active public notes"]').find('tr').removeAttr('aria-selected');
						}
						$("#viewAllactivitieslink").on('click', function(){
						event.preventDefault();
						console.log("viewall Act");
						var accRowid = $("#accountRowId").text();
						GotoviewwithrowId("Account Detail - Activities View",accRowid,"VHA SIS Account Entry Applet","Account","Account");
						
						}); 
						function GotoviewwithrowId(viewname,rowId,applet,bo,bc){
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
						
	let recentShowMore;
	$("td[aria-roledescription='Expand']").off().on('click', '.plus-button', function(e) {
		recentShowMore = true;
			
	  var clickedRow =  $(this).parent().parent(); // Get the row where the click happened
	  console.log('Clicked row data:', clickedRow); // Do something with the row	  
	  clickedRow.find(".plus-button").addClass("displaynone");
	  clickedRow.find(".minus-button").removeClass("displaynone");
	  clickedRow.after('<tr> class="activityMoreInfo"><td Id ="shomoreActDetails" colspan="3"></td></tr>');
	 	//clickedRow.insertAdjacentHTML('afterend',newrow);
	  
	  var activityApplet =  SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard Recent Activities Applet");
	  activityApplet.GetBusComp().GetFieldValue("Comment");
	  var ActivityId = activityApplet.GetBusComp().GetFieldValue("Id");
	  var Inputs = SiebelApp.S_App.NewPropertySet();
		var Output = SiebelApp.S_App.NewPropertySet();
		var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
		Inputs.SetProperty("Service Name", "VHA Activity Custom BS");
		Inputs.SetProperty("Method Name", "GetActivityDetails");
		Inputs.SetProperty("ActivityId", ActivityId);
		var Output = ser.InvokeMethod("Run Process", Inputs);
		var ResultSet = Output.GetChildByType("ResultSet");
		var commnents = ResultSet.GetProperty("Comment");
		var createdby = ResultSet.GetProperty("createdby");
		var activityFor = ResultSet.propArray["Activity For "];
		//showmoreActivityDetails(activityFor,createdby,commnents);
			 clickedRow.next().children('td').append('<div class="Activitycontainer">\
		<div class="actrow">\
			<span class="actlabel">Activity for:</span>\
			<span class="actvalue activityfor">'+activityFor+'</span>\
		</div>\
		<div class="actrow">\
			<span class="actlabel">Created by:</span>\
			<span class="actvalue createdby">'+createdby+'</span>\
		</div>\
		<div class="actrow">\
			<span class="actlabel">Comments:</span>\
			<span class="actvalue commnents">'+commnents+'</span>\
		</div>\
		</div>');
		
				e.stopPropagation();
		e.preventDefault();
		});
		
		$("td[aria-roledescription='Expand']").on('click', '.minus-button', function(event) {
		  var clickedRow = $(this).closest('tr'); // Get the row where the click happened
		  console.log('Clicked row data:', clickedRow); // Do something with the row
		  event.preventDefault();
			clickedRow.find(".minus-button").addClass("displaynone");
			clickedRow.find(".plus-button").removeClass("displaynone");
			clickedRow.next("tr").remove();
		});
		
    }

    VHACustomerDashboardRecentActivitiesListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHACustomerDashboardRecentActivitiesListAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    VHACustomerDashboardRecentActivitiesListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.VHACustomerDashboardRecentActivitiesListAppletPR.superclass.EndLife.apply(this, arguments);
    }

    return VHACustomerDashboardRecentActivitiesListAppletPR;
   }()
  );
  return "SiebelAppFacade.VHACustomerDashboardRecentActivitiesListAppletPR";
 })
}
