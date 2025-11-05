if (typeof(SiebelAppFacade.VFBillingAccountFormAppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VFBillingAccountFormAppletPM");
 define("siebel/custom/VFBillingAccountFormAppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.VFBillingAccountFormAppletPM = (function () {

    function VFBillingAccountFormAppletPM(pm) {
     SiebelAppFacade.VFBillingAccountFormAppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VFBillingAccountFormAppletPM, SiebelAppFacade.PresentationModel);

    VFBillingAccountFormAppletPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFBillingAccountFormAppletPM.superclass.Init.apply(this, arguments);
     this.AddMethod("InvokeMethod",PreInvokeMethod,{sequence:true,scope:this})
    }

    VFBillingAccountFormAppletPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFBillingAccountFormAppletPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }
	function PreInvokeMethod(MethodName, returnStructure)
	{   
	//if(MethodName == "LaunchPostpayConnection" || MethodName == "ConnectFBB" || MethodName= "LaunchUpgrade" || MethodName == "NewAPP")
	if(MethodName == "VerifyEC")
	{  
		var sProceed="Y";
		var sBO = SiebelApp.S_App.GetActiveBusObj();
		var sBC = sBO.GetBusCompByName("VF Billing Account");
		var sAccountId = sBC.GetFieldValue("Master Account Id"); 
		var sCustType = sBC.GetFieldValue("VF Customer Segment");
		
		if(MethodName == "VerifyEC"){
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outs = SiebelApp.S_App.NewPropertySet();
			Inputs.SetProperty("AccountId",sAccountId);
			Outs = VHAAppUtilities.CallBS(
				"VHA TOT TBUI Service", "CheckPostpay",
				Inputs, {}
			);			
			sProceed=Outs.GetProperty("Postpay")=="Y"?"Y":"N";				
		}		
		
		if(sProceed=="Y"){
			if(sAccountId != null && sAccountId != "" && sCustType != null && sCustType != "")
			{
				if(sCustType == "Consumer")
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
					SiebelApp.S_App.uiStatus.Free();	
				}
				else  
				{ 
					returnStructure["ContinueOperation"] = true;  
				} 
				
			}
		}
 
	}  
	}

    return VFBillingAccountFormAppletPM;
   }()
  );
  return "SiebelAppFacade.VFBillingAccountFormAppletPM";
 })
}