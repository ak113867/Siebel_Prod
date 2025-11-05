if (typeof(SiebelAppFacade.VHACustomerDashboardNBAOffersListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHACustomerDashboardNBAOffersListAppletPR");
 define("siebel/custom/VHACustomerDashboardNBAOffersListAppletPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.VHACustomerDashboardNBAOffersListAppletPR = (function () {

    function VHACustomerDashboardNBAOffersListAppletPR(pm) {
     SiebelAppFacade.VHACustomerDashboardNBAOffersListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHACustomerDashboardNBAOffersListAppletPR, SiebelAppFacade.JQGridRenderer);

    VHACustomerDashboardNBAOffersListAppletPR.prototype.Init = function () {
     SiebelAppFacade.VHACustomerDashboardNBAOffersListAppletPR.superclass.Init.apply(this, arguments);
    }

    VHACustomerDashboardNBAOffersListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHACustomerDashboardNBAOffersListAppletPR.superclass.ShowUI.apply(this, arguments);
	 var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId");
	var offerCount = $('#' + AssetAppletId + "_div").find(".siebui-row-counter").text();
	console.log("Offer Count After Refresh - ShowUI: ", offerCount)
	console.log("Offer Count After Refresh - ShowUI1: ", SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetRecordSet().length)
    }

    VHACustomerDashboardNBAOffersListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHACustomerDashboardNBAOffersListAppletPR.superclass.BindData.apply(this, arguments);
	 console.log("NBA Offer Cod PR File");
	var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId");
	var offerCount = $('#' + AssetAppletId + "_div").find(".siebui-row-counter").text();
	console.log("Offer Count After Refresh - BindData: ", offerCount);
	console.log("Offer Count After Refresh - BindData1: ", SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetRecordSet().length);
	
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

    VHACustomerDashboardNBAOffersListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHACustomerDashboardNBAOffersListAppletPR.superclass.BindEvents.apply(this, arguments);
	 var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId");
	var offerCount = $('#' + AssetAppletId + "_div").find(".siebui-row-counter").text();
	console.log("Offer Count After Refresh - BindEvents: ", offerCount)
	console.log("Offer Count After Refresh - BindEvents1: ", SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetRecordSet().length);
	}
	

    VHACustomerDashboardNBAOffersListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.VHACustomerDashboardNBAOffersListAppletPR.superclass.EndLife.apply(this, arguments);
	  var AssetAppletId =SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetPModel().Get("GetFullId");
	var offerCount = $('#' + AssetAppletId + "_div").find(".siebui-row-counter").text();
	console.log("Offer Count After Refresh - EndLife: ", offerCount)
	console.log("Offer Count After Refresh - EndLife1: ", SiebelApp.S_App.GetActiveView().GetApplet("VHA Customer Dashboard NBA Offers List Applet").GetRecordSet().length)
    }

    return VHACustomerDashboardNBAOffersListAppletPR;
   }()
  );
  return "SiebelAppFacade.VHACustomerDashboardNBAOffersListAppletPR";
 })
}
