if (typeof(SiebelAppFacade.VFLaunchConnectFWAPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VFLaunchConnectFWAPR");
 define("siebel/custom/VFLaunchConnectFWAPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.VFLaunchConnectFWAPR = (function () {

    function VFLaunchConnectFWAPR(pm) {
     SiebelAppFacade.VFLaunchConnectFWAPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VFLaunchConnectFWAPR, SiebelAppFacade.PhysicalRenderer);
	
    VFLaunchConnectFWAPR.prototype.Init = function () {
     SiebelAppFacade.VFLaunchConnectFWAPR.superclass.Init.apply(this, arguments);
    }

    VFLaunchConnectFWAPR.prototype.ShowUI = function () {
     SiebelAppFacade.VFLaunchConnectFWAPR.superclass.ShowUI.apply(this, arguments);
	 
		 let controlss = this.GetPM().Get("GetControls")["Switch to Connect FWA"];
		 if(controlss){
			 $("#"+controlss.GetInputName()+"_Ctrl").on("click",function(ev){
				 
					if($('#SQDCoverage').next('input').is(":checked") != true){
						alert("Discovered Coverage Check with Customer should be selected to proceed");	
						SiebelApp.S_App.SetProfileAttr("InvokeFWAConnectError","Yes");
						ev.preventDefault();
						ev.stopPropagation();
						return false;
					}
					else{
						SiebelApp.S_App.SetProfileAttr("InvokeFWAConnect","Yes");
						if(SiebelApp.S_App.GetProfileAttr("ManageServicesSubType") == "Change Technology"){
							SiebelApp.S_App.SetProfileAttr("VHAConnectFBB","N");
						}
					}	
					
			});
		 }
			
    }

    VFLaunchConnectFWAPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VFLaunchConnectFWAPR.superclass.BindData.apply(this, arguments);
		SiebelApp.S_App.SetProfileAttr("InvokeFWAConnect","");
    }

    VFLaunchConnectFWAPR.prototype.BindEvents = function () {
     SiebelAppFacade.VFLaunchConnectFWAPR.superclass.BindEvents.apply(this, arguments);
			
    }

    VFLaunchConnectFWAPR.prototype.EndLife = function () {
     SiebelAppFacade.VFLaunchConnectFWAPR.superclass.EndLife.apply(this, arguments);
    }

    return VFLaunchConnectFWAPR;
   }()
  );
  return "SiebelAppFacade.VFLaunchConnectFWAPR";
 });
}