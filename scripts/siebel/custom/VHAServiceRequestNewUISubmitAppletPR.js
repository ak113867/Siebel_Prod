//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=VHAServiceRequestNewUISubmitApplet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPR");
 define("siebel/custom/VHAServiceRequestNewUISubmitAppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPR = (function () {

    function VHAServiceRequestNewUISubmitAppletPR(pm) {
     SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAServiceRequestNewUISubmitAppletPR, SiebelAppFacade.PhysicalRenderer);

    VHAServiceRequestNewUISubmitAppletPR.prototype.Init = function () {
     SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPR.superclass.Init.apply(this, arguments);
    }

    VHAServiceRequestNewUISubmitAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPR.superclass.ShowUI.apply(this, arguments);
	 $("button[aria-label='Submit']").addClass("VHASubmit");
    }  

    VHAServiceRequestNewUISubmitAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPR.superclass.BindData.apply(this, arguments);
    }

    VHAServiceRequestNewUISubmitAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    VHAServiceRequestNewUISubmitAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPR.superclass.EndLife.apply(this, arguments);
    }

    return VHAServiceRequestNewUISubmitAppletPR;
   }()
  );
  return "SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPR";
 })
}
