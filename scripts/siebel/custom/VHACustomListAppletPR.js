if (typeof(SiebelAppFacade.VHACustomListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHACustomListAppletPR");
 define("siebel/custom/VHACustomListAppletPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.VHACustomListAppletPR = (function () {

    function VHACustomListAppletPR(pm) {
     SiebelAppFacade.VHACustomListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHACustomListAppletPR, SiebelAppFacade.JQGridRenderer);

    VHACustomListAppletPR.prototype.Init = function () {
     SiebelAppFacade.VHACustomListAppletPR.superclass.Init.apply(this, arguments);
    }

    VHACustomListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHACustomListAppletPR.superclass.ShowUI.apply(this, arguments);
    }

    VHACustomListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHACustomListAppletPR.superclass.BindData.apply(this, arguments);
	 $("#"+this.GetPM().Get("GetFullId")).addClass("VFDisplayNone");
	 setTimeout(function(){
	 var cPR = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Service Request New UI Custom Fields Applet"].GetPModel().GetRenderer();
	 cPR.RenderData();
	 }, 1000);
    }

    VHACustomListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHACustomListAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    VHACustomListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.VHACustomListAppletPR.superclass.EndLife.apply(this, arguments);
    }

    return VHACustomListAppletPR;
   }()
  );
  return "SiebelAppFacade.VHACustomListAppletPR";
 })
}
