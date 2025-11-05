if (typeof(SiebelAppFacade.VHAServiceRequestNewUIAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAServiceRequestNewUIAppletPR");
 define("siebel/custom/VHAServiceRequestNewUIAppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.VHAServiceRequestNewUIAppletPR = (function () {

    function VHAServiceRequestNewUIAppletPR(pm) {
     SiebelAppFacade.VHAServiceRequestNewUIAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAServiceRequestNewUIAppletPR, SiebelAppFacade.PhysicalRenderer);

    VHAServiceRequestNewUIAppletPR.prototype.Init = function () {
     SiebelAppFacade.VHAServiceRequestNewUIAppletPR.superclass.Init.apply(this, arguments);
	 this.AttachPMBinding("ShowJobTitleRelatedField", ModifyLayout);
	 this.GetPM().AddMethod("FieldChange", OnFieldChange,{sequence : false, scope: this});
    }
    function OnFieldChange(control, value){
		
		if(control.GetName()=="Group")
				{
					//var aCustID = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Service Request New UI Custom Fields Applet"].GetPModel().Get("GetFullId");
					var aCreditID = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Credit Card SR New View Applet"].GetPModel().Get("GetFullId");
					if(value!="")					
					//$(".VFCustFormApplet").removeClass("VFDisplayNone");
					if(SiebelApp.S_App.GetProfileAttr("SRNewViewCC")=="Y"){					
					$("#"+aCreditID).removeClass("VFDisplayNone");
					}
					else {
						$("#"+aCreditID).addClass("VFDisplayNone");
					//	$("#"+aCustID).addClass("VFDisplayNone");
					}
					
				}
		
	}
    VHAServiceRequestNewUIAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHAServiceRequestNewUIAppletPR.superclass.ShowUI.apply(this, arguments);
    }

    VHAServiceRequestNewUIAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHAServiceRequestNewUIAppletPR.superclass.BindData.apply(this, arguments);
    }

    VHAServiceRequestNewUIAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHAServiceRequestNewUIAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    VHAServiceRequestNewUIAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.VHAServiceRequestNewUIAppletPR.superclass.EndLife.apply(this, arguments);
    }
	 function ModifyLayout(){
		 var aID = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Credit Card SR New View Applet"].GetPModel().Get("GetFullId");
		 if(this.GetPM().Get("GetRecordSet")["VF Credit Card Toggle Calc"]==='N')
		 $("#"+aID).addClass("VFDisplayNone");
	     else
	     $("#"+aID).removeClass("VFDisplayNone");
	 }

    return VHAServiceRequestNewUIAppletPR;
   }()
  );
  return "SiebelAppFacade.VHAServiceRequestNewUIAppletPR";
 })
}
