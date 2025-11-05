
if (typeof(SiebelAppFacade.VHAUNISIMCustomerAuthenticationPR) === "undefined") {
	SiebelJS.Namespace("SiebelAppFacade.VHAUNISIMCustomerAuthenticationPR");
	define("siebel/custom/VHAUNISIMCustomerAuthenticationPR", ["order!siebel/phyrenderer"], function () {
		SiebelAppFacade.VHAUNISIMCustomerAuthenticationPR = (function () {
			var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
			function VHAUNISIMCustomerAuthenticationPR(pm) {
				SiebelAppFacade.VHAUNISIMCustomerAuthenticationPR.superclass.constructor.apply(this, arguments);
			
			}
			SiebelJS.Extend(VHAUNISIMCustomerAuthenticationPR, SiebelAppFacade.PhysicalRenderer);
			VHAUNISIMCustomerAuthenticationPR.prototype.Init = function () {
			SiebelAppFacade.VHAUNISIMCustomerAuthenticationPR.superclass.Init.apply(this, arguments);
			this.GetPM().AddMethod("PostExecute", mValidate, {
							sequence : false,
							scope : this
						});
			}

			function mValidate(MethodName) {
				if(MethodName === "mValidate")
				{
					var RespExists = SiebelApp.S_App.GetProfileAttr("VHARespExists");
					var SimNumber = SiebelApp.S_App.GetProfileAttr("VHASimNumber");					
					if(RespExists === "Y")
					{
					var confirmVal = confirm("The SIM associated with the activation Key is locked. Please Click Ok to unlock or Cancel to keep current locked status.");
					SiebelApp.S_App.SetProfileAttr("VHARespExists","");
					SiebelApp.S_App.SetProfileAttr("VHASimNumber","");
					}
					if (confirmVal) {					
					var ser = SiebelApp.S_App.GetService("VF UNISIM Prepay Utilities TBUI");
					var Inputs = SiebelApp.S_App.NewPropertySet();
					var Output = SiebelApp.S_App.NewPropertySet();						
					Inputs.SetProperty("Serial Number", SimNumber);	
					ser.InvokeMethod("mVHAUnlockSIM", Inputs, Output);					
					}
					else{
					if(RespExists === "Y")
					{
					var ser = SiebelApp.S_App.GetService("VF UNISIM Prepay Utilities TBUI");
					var Inputs = SiebelApp.S_App.NewPropertySet();
					var Output = SiebelApp.S_App.NewPropertySet();		
					ser.InvokeMethod("mVHADontUnlockSIM", Inputs, Output);
					}			
					}
					
				}
			}								
						
				
			return VHAUNISIMCustomerAuthenticationPR;
		}
			());
		return "SiebelAppFacade.VHAUNISIMCustomerAuthenticationPR";
	});
}




