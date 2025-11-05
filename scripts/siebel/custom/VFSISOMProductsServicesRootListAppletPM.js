if (typeof(SiebelAppFacade.VFSISOMProductsServicesRootListAppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VFSISOMProductsServicesRootListAppletPM");
 define("siebel/custom/VFSISOMProductsServicesRootListAppletPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.VFSISOMProductsServicesRootListAppletPM = (function () {

    function VFSISOMProductsServicesRootListAppletPM(pm) {
     SiebelAppFacade.VFSISOMProductsServicesRootListAppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VFSISOMProductsServicesRootListAppletPM, SiebelAppFacade.ListPresentationModel);

    VFSISOMProductsServicesRootListAppletPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFSISOMProductsServicesRootListAppletPM.superclass.Init.apply(this, arguments);
     this.AddMethod("InvokeMethod",PreInvokeMethod,{sequence:true,scope:this})
    }

    VFSISOMProductsServicesRootListAppletPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFSISOMProductsServicesRootListAppletPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }
	
	function PreInvokeMethod(MethodName, returnStructure)
	{   
	if(MethodName == "UpgradeMSOTBUI" || MethodName == "NewAPP" || MethodName == "LaunchPostpayConnection" || MethodName == "LaunchNBNConnection" || MethodName == "3StepUpgradeBA")
	{
		var sBO = SiebelApp.S_App.GetActiveBusObj();
		var sBC = sBO.GetBusCompByName("Asset Mgmt - Asset - Header");
		var sAssetId = sBC.GetFieldValue("Id"); 
		if(sAssetId != null && sAssetId != "")
		{	
			var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			var sInp = SiebelApp.S_App.NewPropertySet();
			var sOut = SiebelApp.S_App.NewPropertySet();
			sInp.SetProperty("Service Name", "VHA Postpay DVS Validation BS");
			sInp.SetProperty("Method Name", "VerifyVISAExpiryNative");		
			sInp.SetProperty("AssetId", sAssetId);	
			sInp.SetProperty("UpgDashBoardView", "Y");	
			var sOut = ser.InvokeMethod("Run Process", sInp);
			var ResultSet = SiebelApp.S_App.NewPropertySet();
			ResultSet = sOut.GetChildByType ("ResultSet");
			var sErrorMsg = ResultSet.GetProperty("ErrorMessage");
			var sErrorTyp = ResultSet.GetProperty("ErrorType");
			if(sErrorTyp == "Warning" && sErrorMsg != "")
			{
				if(confirm(sErrorMsg))
					returnStructure["ContinueOperation"] = true;  
				else
				{
					SiebelApp.S_App.SetProfileAttr("VHAAssetFormRetrunstructure","Y");	
					returnStructure["CancelOperation"] = true;
				}
			}
			else if(sErrorTyp == "Error" && sErrorMsg != "")	
			{
				SiebelApp.S_App.SetProfileAttr("VHAAssetFormRetrunstructure","Y");				
				alert(sErrorMsg);
				returnStructure["CancelOperation"] = true;
				SiebelApp.S_App.uiStatus.Free()
						
			}
			else  
			{ 
				returnStructure["ContinueOperation"] = true;  
			} 
		} 
	}
    return VFSISOMProductsServicesRootListAppletPM;
   }
    return VFSISOMProductsServicesRootListAppletPM;
   }()
  );
  return "SiebelAppFacade.VFSISOMProductsServicesRootListAppletPM";
 })
}
