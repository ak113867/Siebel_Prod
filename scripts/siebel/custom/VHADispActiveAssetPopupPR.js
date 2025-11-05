if (typeof(SiebelAppFacade.VHADispActiveAssetPopupPR) === "undefined") {
SiebelJS.Namespace("SiebelAppFacade.VHADispActiveAssetPopupPR");
define("siebel/custom/VHADispActiveAssetPopupPR", ["siebel/jqgridrenderer"],
  function () {
  SiebelAppFacade.VHADispActiveAssetPopupPR = (function () {

    function VHADispActiveAssetPopupPR(pm) {
    SiebelAppFacade.VHADispActiveAssetPopupPR.superclass.constructor.apply(this, arguments);
	}
    SiebelJS.Extend(VHADispActiveAssetPopupPR, SiebelAppFacade.JQGridRenderer);
	VHADispActiveAssetPopupPR.prototype.Init = function () {
    SiebelAppFacade.VHADispActiveAssetPopupPR.superclass.Init.apply(this, arguments);
	this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
					sequence : false,
					scope : this
				});
	}
	function PostInvokeMethod(MethodName)
	{
		if(MethodName=="SendOTP")
		{fn_PostSendOtp();}
	}
   
	function fn_PostSendOtp() {
		setTimeout(function () {
					var AppletName = GetActiveCreditAppletName();
					//if((AppletName=="VHA Out of Stock Summary Form Applet - TBUI HI" || AppletName=="VF Out of Stock Summary Form Applet - Upgrade TBUI" || AppletName=="VF Out of Stock Summary Form Applet - TBUI") && $('[aria-labelledby="VHA_OTP_Label"]').val()!="")  //SURESHA Upgrade 22.7
					if((AppletName=="VHA Out of Stock Summary Form Applet - TBUI HI" || AppletName=="VF Out of Stock Summary Form Applet - Upgrade TBUI" || AppletName=="VF Out of Stock Summary Form Applet - TBUI") && $('[name='+this_t.GetPM().Get("GetControls")["VHA_OTP_Label"].GetInputName()+']').val()!="") 
					{
					var ShipingApplet = SiebelApp.S_App.GetActiveView().GetApplet(AppletName);
					var IntelligentSearchAddressCtrl = $("input[name='" + ShipingApplet.GetControl("VF Intelligence Search Address").GetInputName() + "']");
					IntelligentSearchAddressCtrl.removeAttr("readonly");
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
    return VHADispActiveAssetPopupPR;
   }()
  );
  return "SiebelAppFacade.VHADispActiveAssetPopupPR";
 })
}