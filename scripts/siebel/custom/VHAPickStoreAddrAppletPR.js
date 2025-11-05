if (typeof(SiebelAppFacade.VHAPickStoreAddrAppletPR) === "undefined") {
SiebelJS.Namespace("SiebelAppFacade.VHAPickStoreAddrAppletPR");
define("siebel/custom/VHAPickStoreAddrAppletPR", ["siebel/jqgridrenderer"],
  function () {
  SiebelAppFacade.VHAPickStoreAddrAppletPR = (function () {

    function VHAPickStoreAddrAppletPR(pm) {
    SiebelAppFacade.VHAPickStoreAddrAppletPR.superclass.constructor.apply(this, arguments);
	}
    SiebelJS.Extend(VHAPickStoreAddrAppletPR, SiebelAppFacade.JQGridRenderer);
	VHAPickStoreAddrAppletPR.prototype.Init = function () {
    SiebelAppFacade.VHAPickStoreAddrAppletPR.superclass.Init.apply(this, arguments);
	this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
					sequence : false,
					scope : this
				});
	}
	VHAPickStoreAddrAppletPR.prototype.ShowUI = function () {
    SiebelAppFacade.VHAPickStoreAddrAppletPR.superclass.ShowUI.apply(this, arguments);
    var that = this;
	if(this.GetPM().Get("GetName")=="VHA Store Address Pick Applet"){
    setTimeout(function () {
        var desiredWidth = 1000;
        var newWidth = $(window).width() < desiredWidth ? $(window).width() : desiredWidth;
        $("#" + that.GetPM().Get("GetPlaceholder")).closest("[name=popup]").dialog("option", "width", newWidth).resize();
    }, 0);
	}
}
	VHAPickStoreAddrAppletPR.prototype.BindEvents = function () 
	{
	SiebelAppFacade.VHAPickStoreAddrAppletPR.superclass.BindEvents.call(this);
	/*var that = this;
	$('.ui-icon-closethick,.siebui-icon-closeapplet').on('click',function(){
				if(that.GetPM().Get("GetName")=="VF Wizard Shipment Address Pick Applet OUI"){
				var ShipingApplet = SiebelApp.S_App.GetActiveView().GetApplet(GetActiveCreditAppletName());
				if(ShipingApplet != "" && ShipingApplet != null)
					$("input[name='" + ShipingApplet.GetControl("Manual Address Entry").GetInputName() + "']").trigger("click");
				}
				}) ;*/
	}
	
	function PostInvokeMethod(MethodName)
	{
		if(MethodName=="PickAddress" || MethodName=="PickRecord" || MethodName=="NewAddressSave")
		{fUncheckPickPrimary(MethodName);}
		
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
				function fUncheckPickPrimary(MethodName) {
			var sFlowName = $('.siebui-applet-taskui-h').html().slice(0,($('.siebui-applet-taskui-h').html().indexOf('<span class="siebui-taskui-title">')));
				var ShipingApplet = SiebelApp.S_App.GetActiveView().GetApplet(GetActiveCreditAppletName());
				if(ShipingApplet != "" && ShipingApplet != null)
				{
					var PM = ShipingApplet.GetPModel();
					var IntelligentSearchAddressCtrl = $("input[name='" + ShipingApplet.GetControl("VF Intelligence Search Address").GetInputName() + "']");
					
					if(SiebelApp.S_App.GetProfileAttr("VHAConnectFBB") != "Y" && sFlowName.search("Pre to Post Transfer") == -1)
					{
						var sPickPrimaryControl = ShipingApplet.GetControl("Pick Primary Address");
						var sPickPrimaryCntrlVal = PM.ExecuteMethod("GetFieldValue", sPickPrimaryControl);
						if( sPickPrimaryCntrlVal == "Y")
						{
							var Inputs = SiebelApp.S_App.NewPropertySet(); //To set Pick Primary Address Field based on profile Attribute
							var Output = SiebelApp.S_App.NewPropertySet();
							var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
							Inputs.SetProperty("Service Name", "SIS OM PMT Service");
							Inputs.SetProperty("Method Name", "Set Profile Attribute");
							Inputs.SetProperty("Profile Attribute Name", "VHAUncheckPickPrimaryFlag");
							Inputs.SetProperty("Profile Attribute Value", "Y");
							var Output = ser.InvokeMethod("Run Process", Inputs);              
							PM.ExecuteMethod("SetFormattedValue",ShipingApplet.GetControl("Pick Primary Address"),"N"); 
						}
						if(MethodName=="PickRecord" || MethodName=="NewAddressSave")
							$("input[name='" + ShipingApplet.GetControl("Manual Address Entry").GetInputName() + "']").prop('checked', true);
						else if (VFTaskSessionVariable.GetValue(GetActiveCreditAppletName() + "_ManualAddressChecked") == "Y")
						{
							$("input[name='" + ShipingApplet.GetControl("Manual Address Entry").GetInputName() + "']").prop("checked", true); 
							$("input[name='" + ShipingApplet.GetControl("Manual Address Entry").GetInputName() + "']").trigger("click");
						}
					}
					
				} //ENDS HERE
			}
    return VHAPickStoreAddrAppletPR;
   }()
  );
  return "SiebelAppFacade.VHAPickStoreAddrAppletPR";
 })
}