if (typeof (SiebelAppFacade.Postload) == "undefined") {
    Namespace('SiebelAppFacade.Postload');

    (function(){
        SiebelApp.EventManager.addListner( "postload", OnPostload, this );
        function OnPostload( ){
            try{
                //console.log("Loaded");
				/*MadhuR 14-07-2023: Added below code for 9989CC*/
				if(SiebelApp.S_App.GetActiveView().GetName()== 'VF UNISIM Setup Recharge TBUI View')
                {

                    var xErrCode=SiebelApp.S_App.GetProfileAttr("ATRBWErrCode");
                    var xRespMsg=SiebelApp.S_App.GetProfileAttr("ATROutcome");
                    if(xErrCode=="0"){
                        alert(xRespMsg);  
                    }
                    SiebelApp.S_App.SetProfileAttr("ATRBWErrCode","");
                    SiebelApp.S_App.SetProfileAttr("ATROutcome","");
                }
            }
            catch(error)
            {
                //No-Op
            }
        }
    }());
}