if (typeof(SiebelAppFacade.VFRecommendedProductListAppletTBUIPR) === "undefined") {
SiebelJS.Namespace("SiebelAppFacade.VFRecommendedProductListAppletTBUIPR");
define("siebel/custom/VFRecommendedProductListAppletTBUIPR", ["siebel/jqgridrenderer"],
  function () {
  SiebelAppFacade.VFRecommendedProductListAppletTBUIPR = (function () {

    function VFRecommendedProductListAppletTBUIPR(pm) {
    SiebelAppFacade.VFRecommendedProductListAppletTBUIPR.superclass.constructor.apply(this, arguments);
	}
    SiebelJS.Extend(VFRecommendedProductListAppletTBUIPR, SiebelAppFacade.JQGridRenderer);
	VFRecommendedProductListAppletTBUIPR.prototype.Init = function () {
    SiebelAppFacade.VFRecommendedProductListAppletTBUIPR.superclass.Init.apply(this, arguments);
	this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
					sequence : false,
					scope : this
				});
	}
	function PostInvokeMethod(MethodName)
	{
		if(MethodName=="VFAddProposition")
		{fn_PostSendOtp();}
	}
   
	function fn_PostSendOtp() {
		setTimeout(function () {
					var AppletName = GetActiveCreditAppletName();
					var sFlowName = $('.siebui-applet-taskui-h').html().slice(0,($('.siebui-applet-taskui-h').html().indexOf('<span class="siebui-taskui-title">')));
					if(sFlowName.search("Pre to Post Transfer") != -1 || SiebelApp.S_App.GetProfileAttr("VHAConnectFBB") == "Y")
					{
						// Do Nothing
					}
					else{
						if((AppletName=="VHA Out of Stock Summary Form Applet - TBUI HI" || AppletName=="VF Out of Stock Summary Form Applet - Upgrade TBUI" || AppletName=="VF Out of Stock Summary Form Applet - TBUI") && $('[aria-labelledby="VHA_OTP_Label"]').val()=="")
						{
							var ShipingApplet = SiebelApp.S_App.GetActiveView().GetApplet(AppletName);
							var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
							var Inputs = SiebelApp.S_App.NewPropertySet();
							Inputs.SetProperty("Service Name", "VF TBUI BS Utilities");
							Inputs.SetProperty("Method Name", "CheckCustActiveVoiceService");
							Inputs.SetProperty("Account Id", $('[aria-label="Customer Id:"]').val());
							var Output = ser.InvokeMethod("Run Process", Inputs);
							var Reset = Output.GetChildByType("ResultSet");
							var sActiveServExist = Reset.GetProperty("ActiveServiceExist");
							Inputs = SiebelApp.S_App.NewPropertySet();
							Inputs.SetProperty("Service Name", "VF TBUI BS Utilities");
							Inputs.SetProperty("Method Name", "CheckExistingCA");
							Inputs.SetProperty("Account Id", $('[aria-label="Customer Id:"]').val());
							Output = ser.InvokeMethod("Run Process", Inputs);
							Reset = Output.GetChildByType("ResultSet");
							var sExistCustomer = Reset.GetProperty("ExistingCustomer");
							if((sExistCustomer == "Y" && sActiveServExist == "Y") || (sExistCustomer == "N"))
							{
								var IntelligentSearchAddressCtrl = $("input[name='" + ShipingApplet.GetControl("VF Intelligence Search Address").GetInputName() + "']");
								IntelligentSearchAddressCtrl.attr("readonly", "readonly"); 
							}
							var inps = SiebelApp.S_App.NewPropertySet();
							inps.SetProperty("Service Name", "VF Check Responsibilities");
							inps.SetProperty("Method Name", "Check Responsibilities");
							inps.SetProperty("Responsibility", "VHA Function Shipment Address OTP");
							Output = ser.InvokeMethod("Run Process", inps);
							Reset = Output.GetChildByType("ResultSet");
							var sExist = Reset.GetProperty("Exists");
							if(sExistCustomer == "N" || (sExistCustomer == "Y" && sExist == "N"))
							{
								$('[data-display="Send OTP"]').attr("disabled","disable").addClass("appletButtonDis").removeClass("appletButton");
							}
						}
						}	
					},50);						   
	}
	function GetActiveCreditAppletName() {
					var AppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap();
					var AppletList = ["VF Out of Stock Summary Form Applet - Upgrade TBUI", "VF Out of Stock Summary Form Applet - TBUI","VHA Out of Stock Summary Form Applet - TBUI HI"];
					var AppletName = "";
					for (var i = 0; i < AppletList.length; i++) {
						if (AppletMap[AppletList[i]]) {
							AppletName = AppletList[i];
							break;
						}
					}
					return AppletName;
				}
    return VFRecommendedProductListAppletTBUIPR;
   }()
  );
  return "SiebelAppFacade.VFRecommendedProductListAppletTBUIPR";
 })
}