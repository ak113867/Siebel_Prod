if (typeof(SiebelAppFacade.VHAAssetDashboardPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAAssetDashboardPM");
 define("siebel/custom/VHAAssetDashboardPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.VHAAssetDashboardPM = (function () {

    function VHAAssetDashboardPM(pm) {
     SiebelAppFacade.VHAAssetDashboardPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAAssetDashboardPM, SiebelAppFacade.PresentationModel);

    VHAAssetDashboardPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAAssetDashboardPM.superclass.Init.apply(this, arguments);
     this.AddMethod("InvokeMethod",PreInvokeMethod,{sequence:true,scope:this})
    }

    VHAAssetDashboardPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAAssetDashboardPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }
	function PreInvokeMethod(MethodName, returnStructure)
	{   
	if(MethodName == "UpgradeTBUI" || MethodName == "NewAPP" || MethodName == "PretoPostConnectTBUI" || MethodName == "3StepUpgrade" || MethodName == "ChangeTechnology" || MethodName == "ChangeLocationTBUI")
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
			
			//console.log("sAssetId",sAssetId);
			//console.log("sErrorMsg",sErrorMsg);
			//console.log("sErrorTyp",sErrorTyp);
			
			
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
                SiebelApp.S_App.SetProfileAttr("VHAAssetFormVisa","Y");//ADUTTA:Visa Validation		
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
	}
    return VHAAssetDashboardPM;
   }()
  );
  return "SiebelAppFacade.VHAAssetDashboardPM";
 })
}