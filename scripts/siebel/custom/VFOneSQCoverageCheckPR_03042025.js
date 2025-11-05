if (typeof(SiebelAppFacade.VFOneSQCoverageCheckPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VFOneSQCoverageCheckPR");
 define("siebel/custom/VFOneSQCoverageCheckPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.VFOneSQCoverageCheckPR = (function () {

    function VFOneSQCoverageCheckPR(pm) {
     SiebelAppFacade.VFOneSQCoverageCheckPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VFOneSQCoverageCheckPR, SiebelAppFacade.PhysicalRenderer);
	var CCAppId ="";
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
    VFOneSQCoverageCheckPR.prototype.Init = function () {
     SiebelAppFacade.VFOneSQCoverageCheckPR.superclass.Init.apply(this, arguments);
    }

    VFOneSQCoverageCheckPR.prototype.ShowUI = function () {
     SiebelAppFacade.VFOneSQCoverageCheckPR.superclass.ShowUI.apply(this, arguments);
	 CCAppId = this.GetPM().Get("GetFullId");
    }

    VFOneSQCoverageCheckPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VFOneSQCoverageCheckPR.superclass.BindData.apply(this, arguments);
     
    }

    VFOneSQCoverageCheckPR.prototype.BindEvents = function () {
     SiebelAppFacade.VFOneSQCoverageCheckPR.superclass.BindEvents.apply(this, arguments);

		$('[aria-label="Site Qualification Form Applet:Enhanced Check"]').on("click", function () {
			var sView = SiebelApp.S_App.GetActiveView().GetName();
			if (sView == "VHA NBN Site Qualification Postpay TBUI") 
			{
				$('.ccNwkpar').remove();	
				$('button[aria-label="Switch to Connect FWA"]').addClass('appletButtonDis');
			}
		});
		$('[aria-label="Site Qualification Form Applet:Coverage Check"]').on("click", function () {
			var sView = SiebelApp.S_App.GetActiveView().GetName();
			if (sView == "VHA NBN Site Qualification Postpay TBUI") 
			{
				$('.ccNwkpar').remove();
				var vSessionId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF Capture Customer Details TBC").GetFieldValue("Id");
			}
			SiebelApp.S_App.SetProfileAttr("CoTSession",vSessionId);//Added for COT FWA Coverage cal
			var sbs = SiebelApp.S_App.GetService("VF BS Process Manager");
			var nInputs = SiebelApp.S_App.NewPropertySet();
			nInputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service BS MOCN"); 
			nInputs.SetProperty("SessionId", vSessionId);
			nInputs.SetProperty("Method Name", "NBNCoverageCheck");
			var ROups = sbs.InvokeMethod("Run Process", nInputs);
			
			//var CCAppId = this_t.GetPM().Get("GetFullId");
			var s4G, s5G, s5Gsa, s5Gnsa;
			var resultCov = [];
			for (let i = 0; i < ROups.GetChildByType("ResultSet").childArray.length; i++) 
			{
				var curPropArr = ROups.GetChildByType("ResultSet").childArray[i].propArray;
				resultCov.push(curPropArr);
			}
			
			const arrSite = [...new Set(resultCov.map(x=>x.Site))];
                var ccpardiv = '<div class="ccNwkpar">';
                var hdrdiv = "";
                console.log(arrSite);
                arrSite.forEach(function(item1, index) {
                    // console.log(index+". "+item);
                    var arrNetwork = resultCov.filter(function(a) {
                        return a.Site == item1;
                    });
					var sitem = '';
					if(item1 == "mobilestatus")
						var sitem = "Mobile Coverage";
					if(item1 == "fwaStatus")
						var sitem = "4G/5G Home Internet";
                    //console.log(arrNetwork);
					//if(sitem != ''){
                    hdrdiv = hdrdiv + '<div class="ccNwkchdmain"><div class="ccNwkhdr" id="ccNwkhdr"' + index + '>' + sitem + '</div><div class="ccNwkchd">';
					//}
                    arrNetwork.forEach(function(item2, index) {
                        if (item2.PropName != "") {
                            // console.log(item.PropName+' == '+item.PropValue);
                            switch (item1) {
                            case "fwaStatus":
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
                                }
                                ;break;
                            case "mobilestatus":
                                //"Mobile Coverage":
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

                            /*if (item2.PropValue == "true")
                            var div = '<div class="ccNwk  btn CoverageCheckActive" id="ccNwk"' + index + '> ' + item2.PropName + '</div>';
                            else
                            var div = '<div class="ccNwk btn CoverageCheckInactive" id="ccNwk"' + index + '> ' + item2.PropName + '</div>';

                            hdrdiv = hdrdiv + div;*/
                        }
                    });
                    var div = "";
                    switch (item1) {
                    case "fwaStatus":
                        var dVal = MapShed.FWA.f4G.is4G == true ? "4G - Available" : "4G - Not available";
                        var dCls = MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="f4G"> ' + dVal + '</div>';
                        s4G = MapShed.FWA.f4G.is4G;
                        var s5GShow = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_COV_TYPE' AND [List Of Values.Name]='FWA5G_SHOW_ICON' AND [List Of Values.Active]='Y'");
                        if (s5GShow == "ON") {
                            var dVal = MapShed.FWA.f5G.is5G == true ? "5G - Available" : "5G - Not available";
                            var dCls = MapShed.FWA.f5G.is5G == true ? "ccmsGreen" : "ccmsRed";
                            div = div + '<div class="ccNwk  btn ' + dCls + '" id="f5G"> ' + dVal + '</div>';
                            s5G = MapShed.FWA.f5G.is5G;
                        }

                        var dVal = MapShed.FWA.f5GNSA.is5Gnsa == true ? "5G NSA - Available" : "5G NSA - Not available";
                        var dCls = MapShed.FWA.f5GNSA.is5Gnsa == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="f5GNSA"> ' + dVal + '</div>';
                        s5Gnsa = MapShed.FWA.f5GNSA.is5Gnsa;
                        break;
                    case "mobilestatus":
                        //"Mobile Coverage":
                        var m = MapShed.Mobile.m3G;
                        var dVal = m.indoor == true && m.outdoor == true ? "3G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "3G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "3G - Indoor Only" : "3G - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="m3G"> ' + dVal + '</div>';

                        m = MapShed.Mobile.m4G;
                        var dVal = m.indoor == true && m.outdoor == true ? "4G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "4G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "4G - Indoor Only" : "4G - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="m4G"> ' + dVal + '</div>';
                        
                        m = MapShed.Mobile.m5G;
                        var dVal = m.indoor == true && m.outdoor == true ? "5G - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "5G - Outdoor Only" : m.indoor == true && m.outdoor == false ? "5G - Indoor Only" : "5G - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="m5G"> ' + dVal + '</div>';

                        m = MapShed.Mobile.m5GNSA;
                        var dVal = m.indoor == true && m.outdoor == true ? "5G NSA - Indoor & Outdoor" : m.indoor == false && m.outdoor == true ? "5G NSA - Outdoor Only" : m.indoor == true && m.outdoor == false ? "5G NSA - Indoor Only" : "5G NSA - No coverage";
                        var dCls = m.indoor == true && m.outdoor == true ? "ccmsGreen" : m.indoor == false && m.outdoor == true ? "ccmsOrange" : m.indoor == true && m.outdoor == false ? "ccmsOrange" : "ccmsRed";
                        MapShed.FWA.f4G.is4G == true ? "ccmsGreen" : "ccmsRed";
                        div = div + '<div class="ccNwk  btn ' + dCls + '" id="m5GNSA"> ' + dVal + '</div>';

                        break;
                    }
                    hdrdiv = hdrdiv + div;
                    hdrdiv = hdrdiv + '</div></div>';
                    //console.log(hdrdiv);
                });

                console.log(MapShed);
                var nwkmsg = "";
                if (s4G == true || (s5G == true || s5Gnsa == true))
				{
		    nwkmsg = "";
                    $('button[aria-label="Switch to Connect FWA"]').removeClass('appletButtonDis');
				}
                else{
                    nwkmsg = "";
					$('button[aria-label="Switch to Connect FWA"]').addClass('appletButtonDis');
				}
				
				var sfield = '<div class="mceGridLabel siebui-value mceField ccNwkchdmain"><span id="SQCoverage"><strong>Coverage Check:</strong></span></div><span id="SQDCoverage">Discussed Coverage Check with Customer:</span><input type="CheckBox"><div></div>'
				//var fwaButton = '<div class = "mceGridField siebui-value mceField"><button class ="siebui-ctrl-btn" id="connectFWA">Switch to Connect FWA</button></div>'      
               
                //nwkmsg = '<div class="ccNwkMsg">4G and 5G Home Internet services are not currently available at this address. You will not be able to connect these services at this address.</div>';
                ccpardiv =  ccpardiv + sfield + hdrdiv + nwkmsg + '</div>';
                //$("#s_" + CCAppId + "_div div.siebui-collapsible-applet-content").append(ccpardiv);
				if(SiebelApp.S_App.GetProfileAttr("VHANewOrg") !="Kogan" && SiebelApp.S_App.GetProfileAttr("EnhCovChekHide") !="Y" && SiebelApp.S_App.GetProfileAttr("Cleared") != "Y")
				{
					$("#"+CCAppId).find('.siebui-collapsible-applet-content').append(ccpardiv);
				}				
				SiebelApp.S_App.SetProfileAttr("Cleared","");
				if(SiebelApp.S_App.GetProfileAttr("VHANewOrg") !="Kogan"){
					
					$('a[title="Site Qualification"]').parent('div').find('input[aria-label="MBB Backup Coverage?"]').hide();
					$('a[title="Site Qualification"]').parent('div').find('span[id*="Coverage_Check_Status_Label"]').parent().hide();
					//$('a[title="Site Qualification"]').parent('div').find('input[aria-label="MBB Backup Coverage?"]').hide();
					setTimeout(function () {
				$('a[title="Site Qualification"]').parent('div').find('button[aria-label="Site Qualification Form Applet:Coverage Check"]').hide();
				$('a[title="Site Qualification"]').parent('div').find('input[aria-label="MBB Backup Coverage?"]').parent().hide();
					},100);
				}
                //$() get cha
                //$('[name=' + this_t.GetPM().Get("GetControls")["Change Address"].GetInputName() + ']').click;
				//$('.ccNwkpar').remove();
			$("#connectFWA").on("click",function(){
				console.log("Hi");
                       var sbs = SiebelApp.S_App.GetService("VF BS Process Manager");
			var nInputs = SiebelApp.S_App.NewPropertySet();
			nInputs.SetProperty("Service Name", "VHA FWA Service BS"); 
			//nInputs.SetProperty("SessionId", vSessionId);
			nInputs.SetProperty("Method Name", "FWATask");
			var ROups = sbs.InvokeMethod("Run Process", nInputs);

				/*var inputPropSet;
				var outputPropSet;
				var taskUIsvc;
				inputPropSet = SiebelApp.S_App.NewPropertySet();
				outputPropSet = SiebelApp.S_App.NewPropertySet();
				taskUIsvc = SiebelApp.S_App.GetService("Task UI Service (SWE)");
				inputPropSet.SetProperty("TaskName","VHA Connect FBB New Connection");
				taskUIsvc.InvokeMethod("LaunchTask",inputPropSet,outputPropSet);*/	
			});
		});
		/*function connectFWA(){
			console.log('INside connectFWA');
		}
		$("#connectFWA").on("click",function(){
			console.log("Hi");
			var sbs = SiebelApp.S_App.GetService("VF BS Process Manager");
			var nInputs = SiebelApp.S_App.NewPropertySet();
			nInputs.SetProperty("Service Name", "VHA FWA Service BS"); 
			//nInputs.SetProperty("SessionId", vSessionId);
			nInputs.SetProperty("Method Name", "FWATask");
			var ROups = sbs.InvokeMethod("Run Process", nInputs);
			var inputPropSet;
			var outputPropSet;
			var taskUIsvc;
			inputPropSet = SiebelApp.S_App.NewPropertySet();
			outputPropSet = SiebelApp.S_App.NewPropertySet();
			taskUIsvc = SiebelApp.S_App.GetService("Task UI Service (SWE)");
			inputPropSet.SetProperty("TaskName","VHA Connect FBB New Connection");
			taskUIsvc.InvokeMethod("LaunchTask",inputPropSet,outputPropSet);	
		});*/
    }

    VFOneSQCoverageCheckPR.prototype.EndLife = function () {
     SiebelAppFacade.VFOneSQCoverageCheckPR.superclass.EndLife.apply(this, arguments);
    }

    return VFOneSQCoverageCheckPR;
   }()
  );
  return "SiebelAppFacade.VFOneSQCoverageCheckPR";
 });
}