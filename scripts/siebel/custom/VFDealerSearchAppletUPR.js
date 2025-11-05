 
if (typeof(SiebelAppFacade.VFDealerSearchAppletUPR) === "undefined") {
	SiebelJS.Namespace("SiebelAppFacade.VFDealerSearchAppletUPR");
	define("siebel/custom/VFDealerSearchAppletUPR", ["order!siebel/phyrenderer"], function () {
		SiebelAppFacade.VFDealerSearchAppletUPR = (function () {
			var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
			function VFDealerSearchAppletUPR(pm) {
				SiebelAppFacade.VFDealerSearchAppletUPR.superclass.constructor.apply(this, arguments);
			
			}
			SiebelJS.Extend(VFDealerSearchAppletUPR, SiebelAppFacade.PhysicalRenderer);
			
			VFDealerSearchAppletUPR.prototype.ShowUI = function () {
				SiebelAppFacade.VFDealerSearchAppletUPR.superclass.ShowUI.apply(this, arguments);	
						  
						  
						var res = $('[aria-label="Authenticate Customer:Unlock SIM"]');
						if($('[aria-label="Authenticate Customer:Unlock SIM"]').siblings().length!=1){
						$('[aria-label="Authenticate Customer:Unlock SIM"]').parent().parent().hide();
						$('[aria-label="Locked SIM#"]').parent().append("  ").append(res);						
						
						}
			
			}
			VFDealerSearchAppletUPR.prototype.Init = function () {
			SiebelAppFacade.VFDealerSearchAppletUPR.superclass.Init.apply(this, arguments);
			
			this.GetPM().AddMethod("PostExecute", VFUniSIMConnect, {
							sequence : false,
							scope : this
						});
			}
			
			function VFUniSIMConnect(MethodName) {
				if(MethodName === "VFUniSIMConnect")
				{
					var RespExists = SiebelApp.S_App.GetProfileAttr("VHARespExists");
					var SimNumber = SiebelApp.S_App.GetProfileAttr("VHASimNumber");
					var Actkey = SiebelApp.S_App.GetProfileAttr("sActkey");
					if(RespExists === "Y")
					{
					var confirmVal = confirm("The SIM associated with the activation Key is locked. Please Click Ok to unlock or Cancel to keep current locked status.");
					SiebelApp.S_App.SetProfileAttr("VHARespExists","");
					}
					if (confirmVal) {					
					var ser = SiebelApp.S_App.GetService("VF UNISIM Prepay Utilities TBUI");
					var Inputs = SiebelApp.S_App.NewPropertySet();
					var Output = SiebelApp.S_App.NewPropertySet();						
					Inputs.SetProperty("Serial Number", SimNumber);	
					ser.InvokeMethod("mVHAUnlockSIM", Inputs, Output);					
					}				
					
				}
			}
			
						
				
			return VFDealerSearchAppletUPR;
		}
			());
		return "SiebelAppFacade.VFDealerSearchAppletUPR";
	});
}




