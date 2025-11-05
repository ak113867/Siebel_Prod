//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=VHAFPRChargeType&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.VHAFPRChargeTypeInfoPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAFPRChargeTypeInfoPM");
 define("siebel/custom/VHAFPRChargeTypeInfoPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.VHAFPRChargeTypeInfoPM = (function () {

    function VHAFPRChargeTypeInfoPM(pm) {
     SiebelAppFacade.VHAFPRChargeTypeInfoPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAFPRChargeTypeInfoPM, SiebelAppFacade.PresentationModel);

    VHAFPRChargeTypeInfoPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAFPRChargeTypeInfoPM.superclass.Init.apply(this, arguments);
	 this.AddProperty("ChargeTypeUpd", "");
	 this.AddMethod("FieldChange", OnFieldChange, {sequence : false, scope : this});
     // Add code here that should happen after default processing
    }
	function OnFieldChange(control, value){
		if(control.GetName() =="ChargeType")
			this.SetProperty("ChargeTypeUpd", "Y");
		console.log("Inside");
	}
    VHAFPRChargeTypeInfoPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAFPRChargeTypeInfoPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return VHAFPRChargeTypeInfoPM;
   }()
  );
  return "SiebelAppFacade.VHAFPRChargeTypeInfoPM";
 })
}
