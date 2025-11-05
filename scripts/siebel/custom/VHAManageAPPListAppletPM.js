if (typeof(SiebelAppFacade.VHAManageAPPListAppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAManageAPPListAppletPM");
 define("siebel/custom/VHAManageAPPListAppletPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.VHAManageAPPListAppletPM = (function () {

    function VHAManageAPPListAppletPM(pm) {
     SiebelAppFacade.VHAManageAPPListAppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAManageAPPListAppletPM, SiebelAppFacade.ListPresentationModel);

    VHAManageAPPListAppletPM.prototype.Init = function () {
     SiebelAppFacade.VHAManageAPPListAppletPM.superclass.Init.apply(this, arguments);
	 this.AddMethod("InvokeMethod",PreInvokeMethod,{sequence:true,scope:this})
    }

    VHAManageAPPListAppletPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.VHAManageAPPListAppletPM.superclass.Setup.apply(this, arguments);
    }
	
	function PreInvokeMethod(MethodName, returnStructure)
	{
		if(MethodName == "NewAPP")
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
		return VHAManageAPPListAppletPM;
	}
    return VHAManageAPPListAppletPM;
   }()
  );
  return "SiebelAppFacade.VHAManageAPPListAppletPM";
 })
}
