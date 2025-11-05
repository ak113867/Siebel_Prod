if (typeof(SiebelAppFacade.VHACoverageCheckAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHACoverageCheckAppletPR");
 define("siebel/custom/VHACoverageCheckAppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.VHACoverageCheckAppletPR = (function () {

    function VHACoverageCheckAppletPR(pm) {
     SiebelAppFacade.VHACoverageCheckAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHACoverageCheckAppletPR, SiebelAppFacade.PhysicalRenderer);
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
   
    VHACoverageCheckAppletPR.prototype.Init = function () {
     SiebelAppFacade.VHACoverageCheckAppletPR.superclass.Init.apply(this, arguments);
    }

    VHACoverageCheckAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHACoverageCheckAppletPR.superclass.ShowUI.apply(this, arguments);
	 
	 $('#vha-ign-updatecartbutton').prop('disabled',true);
    
	var sResp = window.coverageCheckRes;	//added by vinay kumar
	var nbnRes = window.nbnResp;//added
	var sExitAddrResp = window.existAddrNbnResp; 
	var sLatitude = window.latitude;
	var sLongitude = window.longitude;
	var sExsistingAddrValue = window.ExsistingAddrValue;
	var sManualAddrRes = window.sManualAddrRes;
	
	 if (sResp != "" || sExitAddrResp != "" || sManualAddrRes != "")
		   {
		   var nser = SiebelApp.S_App.GetService("VF BS Process Manager");
		   var nInputs = SiebelApp.S_App.NewPropertySet();
		   nInputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service Sales Calc");
		   nInputs.SetProperty("role", "VCS");
		   const latitude = sResp?.address?.geometry?.coordinates?.[0] !== undefined ? sResp.address.geometry.coordinates[0] : sManualAddrRes?.childArray?.[0]?.propArray?.Latitude !== undefined ? sManualAddrRes.childArray[0].propArray.Latitude : sLatitude;  
		   const longitude = sResp?.address?.geometry?.coordinates?.[1] !== undefined ? sResp.address.geometry.coordinates[1] : sManualAddrRes?.childArray?.[0]?.propArray?.Longitude !== undefined ? sManualAddrRes.childArray[0].propArray.Longitude : sLongitude;
		  // const gnafId = sResp?.address?.id !== undefined ? sResp.address.id : (sExitAddrResp?.childArray?.[0]?.propArray?.GnafPid !== undefined ? sExitAddrResp.childArray[0].propArray.GnafPid : "");
		   const gnafId = sResp?.address?.id !== undefined ? sResp.address.id : sExitAddrResp?.childArray?.[0]?.propArray?.GnafPid !== undefined ? sExitAddrResp.childArray[0].propArray.GnafPid : sManualAddrRes?.childArray?.[0]?.propArray?.gnafPid !== undefined ? sManualAddrRes.childArray[0].propArray.gnafPid : "";   
		   nInputs.SetProperty("longitude", longitude);
		   nInputs.SetProperty("latitude", latitude);
		   nInputs.SetProperty("GNAFId", gnafId);
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

	       $("#step2divider").addClass("displaynone");
		   $(".resultforcontainerparent").removeClass("displaynone");
		   //Mobile//
		   $("#mobileinitailtext").addClass("displaynone");
		   $(".Mobilecoverageresultcontainer").removeClass("displaynone");
		   if (sExsistingAddrValue != "Enter new address"){
			   $('#resultforvalue').text(sExsistingAddrValue);
		   }
			else {
		   $('#resultforvalue').text(sAddr);
			}
		   var coveragecheckstatus = "Done"
		   }
		if(nbnRes!= "" || sExitAddrResp != "") {

			var PriorityNetwork = nbnRes?.childArray?.[0]?.propArray?.PriorityNetwork ? nbnRes.childArray[0].propArray.PriorityNetwork : sExitAddrResp?.childArray?.[0]?.propArray?.PriorityNetwork;
			$('#preferredwholesaler').text(nbnRes?.childArray?.[0]?.propArray?.PriorityNetwork ? nbnRes.childArray[0].propArray.PriorityNetwork : sExitAddrResp?.childArray?.[0]?.propArray?.PriorityNetwork);

           //$('#internetlocationID').text(nbnRes.childArray[0].propArray.LocID);
			$('#internetlocationID').text(nbnRes?.childArray?.[0]?.propArray?.LocID ? nbnRes.childArray[0].propArray.LocID : sExitAddrResp?.childArray?.[0]?.propArray?.LocID);

		   //$('#serviceClass').text(nbnRes.childArray[0].propArray.ServiceClass);
		    $('#serviceClass').text(nbnRes?.childArray?.[0]?.propArray?.ServiceClass ? nbnRes.childArray[0].propArray.ServiceClass : sExitAddrResp?.childArray?.[0]?.propArray?.ServiceClass);
		    $('#newdevelopment').text(nbnRes?.childArray?.[0]?.propArray?.NBNCharge ? nbnRes.childArray[0].propArray.NBNCharge : sExitAddrResp?.childArray?.[0]?.propArray?.NBNCharge);		   
		   $('#technologytype').text(nbnRes?.childArray?.[0]?.propArray?.AccessTech ? nbnRes.childArray[0].propArray.AccessTech : sExitAddrResp?.childArray?.[0]?.propArray?.AccessTech);
		   $('#maxattainablespeed').text(nbnRes?.childArray?.[0]?.propArray?.OneSQMAS ? nbnRes.childArray[0].propArray.OneSQMAS : sExitAddrResp?.childArray?.[0]?.propArray?.OneSQMAS);
         // $('#fibreupgrade').text(nbnRes?.childArray?.[0]?.propArray?.Fibre Connect Serviceable ? nbnRes.childArray[0].propArray.Fibre Connect Serviceable : sExitAddrResp?.childArray?.[0]?.propArray?.Fibre Connect Serviceable);
            if ($('.networkAvail').length<1){
				$("#fixedwirednbn").append("<span class='CSGreen' id='statusActive'></span><span class ='networkAvail'>" + PriorityNetwork + " - Available</span>");//added by vinay kumar
			}
			else {
				$(".networkAvail").text(PriorityNetwork + " - Available");
			}
             if (PriorityNetwork == "") {
				   $('#fixedwirednbn').hide();
			}
			//Fixed//
		   $("#fixedinitailtext").addClass("displaynone");
		   $(".fixedcoverageresultcontainer").removeClass("displaynone");
		   //FixedWirelsess//
		   $("#fixedwirelessinitailtext").addClass("displaynone");
		  $("#mobileresultfound").addClass("displaynone");
			 $("#fixedwirelessresultfound").addClass("displaynone");
		   $(".fixedwirelesscoverageresultcontainer").removeClass("displaynone");
		   $('#fixedresultfound').addClass('displaynone');
		}
		if (sManualAddrRes != "") 
			{ 
			   $('#resultforvalue').text(sManualAddrRes.childArray[0].propArray.formed_fulladdress);
				var PriorityNetwork = sManualAddrRes.childArray[0].propArray.Serv_PriorityNetwork;
				$('#preferredwholesaler').text(sManualAddrRes.childArray[0].propArray.Serv_PriorityNetwork);
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
				   $('#internetlocationID').text("");
				   //$('#vha-sc-nbn-avail-on').text(OutputsResp.childArray[0].propArray.NBNwithAU);
				   $('#newdevelopment').text("");					
				   $('#technologytype').text(sManualAddrRes.childArray[0].propArray.NBN_primaryAccessTech);
				   $('#maxattainablespeed').text(sManualAddrRes.childArray[0].propArray.NBN_mas);
				   $('#fibreupgrade').text("");  
				   $('#fixedresultfound').addClass('displaynone');//added by vinay kumar
				   //Fixed//
				   $("#fixedinitailtext").addClass("displaynone");
				   $(".fixedcoverageresultcontainer").removeClass("displaynone");
				   //FixedWirelsess//
				   $("#fixedwirelessinitailtext").addClass("displaynone");
				  $("#mobileresultfound").addClass("displaynone");
					 $("#fixedwirelessresultfound").addClass("displaynone");
				   $(".fixedwirelesscoverageresultcontainer").removeClass("displaynone");
				   $('#fixedresultfound').addClass('displaynone');
		   }
    }

    VHACoverageCheckAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHACoverageCheckAppletPR.superclass.BindData.apply(this, arguments);
	 			   
    }

    VHACoverageCheckAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHACoverageCheckAppletPR.superclass.BindEvents.apply(this, arguments);
     
    }

    VHACoverageCheckAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.VHACoverageCheckAppletPR.superclass.EndLife.apply(this, arguments);
    
    }

    return VHACoverageCheckAppletPR;
   }()
  );
  return "SiebelAppFacade.VHACoverageCheckAppletPR";
 })
}