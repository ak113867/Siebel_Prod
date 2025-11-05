if (typeof(SiebelAppFacade.VHAOfferGeoTagDetailsListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAOfferGeoTagDetailsListAppletPR");
 define("siebel/custom/VHAOfferGeoTagDetailsListAppletPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.VHAOfferGeoTagDetailsListAppletPR = (function () {

    function VHAOfferGeoTagDetailsListAppletPR(pm) {
     SiebelAppFacade.VHAOfferGeoTagDetailsListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAOfferGeoTagDetailsListAppletPR, SiebelAppFacade.JQGridRenderer);
	var vGeoTagSwitch="N";
	var importButtonId, geoTagAppltId;
    VHAOfferGeoTagDetailsListAppletPR.prototype.Init = function () {
     SiebelAppFacade.VHAOfferGeoTagDetailsListAppletPR.superclass.Init.apply(this, arguments);
    }

    VHAOfferGeoTagDetailsListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHAOfferGeoTagDetailsListAppletPR.superclass.ShowUI.apply(this, arguments);
		vGeoTagSwitch = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Name]='GeoTagOffer' AND [List Of Values.Active]='Y'", "")[0];
		geoTagAppltId = this.GetPM().Get("GetFullId");
		$("#"+geoTagAppltId).addClass("VFDisplayNone");
		if(SiebelApp.S_App.GetActiveView().GetApplet("VF Import Files - Rewards Offer Matrix")){
				importButtonId = SiebelApp.S_App.GetActiveView().GetApplet("VF Import Files - Rewards Offer Matrix").GetPModel().Get("GetControls")['ImportGeoTag'].GetInputName();
				$("#"+importButtonId+"_Ctrl").addClass("VFDisplayNone");
			}
    }

    VHAOfferGeoTagDetailsListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHAOfferGeoTagDetailsListAppletPR.superclass.BindData.apply(this, arguments);
		if(vGeoTagSwitch == "GeoTagOffer_Y"){
			$("#"+geoTagAppltId).removeClass("VFDisplayNone");
			if(SiebelApp.S_App.GetActiveView().GetApplet("VF Import Files - Rewards Offer Matrix")){
				importButtonId = SiebelApp.S_App.GetActiveView().GetApplet("VF Import Files - Rewards Offer Matrix").GetPModel().Get("GetControls")['ImportGeoTag'].GetInputName();
				$("#"+importButtonId+"_Ctrl").removeClass("VFDisplayNone");
			}
		}
    }

    VHAOfferGeoTagDetailsListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHAOfferGeoTagDetailsListAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    VHAOfferGeoTagDetailsListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.VHAOfferGeoTagDetailsListAppletPR.superclass.EndLife.apply(this, arguments);
    }

    return VHAOfferGeoTagDetailsListAppletPR;
   }()
  );
  return "SiebelAppFacade.VHAOfferGeoTagDetailsListAppletPR";
 })
}
