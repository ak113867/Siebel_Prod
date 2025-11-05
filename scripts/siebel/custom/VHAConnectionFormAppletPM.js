if (typeof(SiebelAppFacade.VHAConnectionFormAppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAConnectionFormAppletPM");
 define("siebel/custom/VHAConnectionFormAppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.VHAConnectionFormAppletPM = (function () {

    function VHAConnectionFormAppletPM(pm) {
     SiebelAppFacade.VHAConnectionFormAppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAConnectionFormAppletPM, SiebelAppFacade.PresentationModel);

    VHAConnectionFormAppletPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAConnectionFormAppletPM.superclass.Init.apply(this, arguments);
     this.AddMethod("InvokeMethod",PreInvokeMethod,{sequence:true,scope:this})
    }

    VHAConnectionFormAppletPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAConnectionFormAppletPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }
	function PreInvokeMethod(MethodName, returnStructure)
	{   
	if(MethodName == "LaunchNewCustomerSS" || MethodName == "ConnectFBB")
	{  
		var sBO = SiebelApp.S_App.GetActiveBusObj();
		var sBC = sBO.GetBusCompByName("Account");
		var sAccountId = sBC.GetFieldValue("Id"); 
		var sCustType = sBC.GetFieldValue("VF Customer Type");
		
		if(sAccountId != null && sAccountId != "" && sCustType != null && sCustType != "")
		{
			if(sCustType == "Person" || sCustType == "Sole Trader")
				sCustType = "Person";
			else
				sCustType = "Business";
			
			var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			var sInp = SiebelApp.S_App.NewPropertySet();
			var sOut = SiebelApp.S_App.NewPropertySet();
			sInp.SetProperty("Service Name", "VHA Postpay DVS Validation BS");
			sInp.SetProperty("Method Name", "VerifyVISAExpiryNative");		
			sInp.SetProperty("AccountId", sAccountId);		
			sInp.SetProperty("AccountType", sCustType);		
			var sOut = ser.InvokeMethod("Run Process", sInp);
			var ResultSet = SiebelApp.S_App.NewPropertySet();
			ResultSet = sOut.GetChildByType ("ResultSet");
			var sErrorMsg = ResultSet.GetProperty("ErrorMessage");
			var sErrorTyp = ResultSet.GetProperty("ErrorType");
			
			console.log("sAccountId",sAccountId);
			console.log("AccountType",sCustType);
			console.log("sErrorMsg",sErrorMsg);
			console.log("sErrorTyp",sErrorTyp);
			
			
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
	}

    return VHAConnectionFormAppletPM;
   }()
  );
  return "SiebelAppFacade.VHAConnectionFormAppletPM";
 })
}