if (typeof (SiebelAppFacade.VHARCStoreListPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHARCStoreListPR");
    define("siebel/custom/VHARCStoreListPR", ["siebel/jqgridrenderer"], function() {
        SiebelAppFacade.VHARCStoreListPR = (function() {
            function VHARCStoreListPR(pm) {
                SiebelAppFacade.VHARCStoreListPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VHARCStoreListPR, SiebelAppFacade.JQGridRenderer);
            VHARCStoreListPR.prototype.Init = function() {
                SiebelAppFacade.VHARCStoreListPR.superclass.Init.apply(this, arguments)
				this.GetPM().AddMethod("FieldChange", OnFieldChange,{sequence : false, scope: this});
            }
            ;
            VHARCStoreListPR.prototype.ShowUI = function() {
                SiebelAppFacade.VHARCStoreListPR.superclass.ShowUI.apply(this, arguments);
            }
            ;
			VHARCStoreListPR.prototype.BindData = function (bRefresh) {
			SiebelAppFacade.VHARCStoreListPR.superclass.BindData.apply(this, arguments);
			var controls = this.GetPM().Get("GetControls");
			var aIndicator = controls["VF Stock Indicator TBUI"];
			var caIndicator = this.GetPM().ExecuteMethod( "GetFieldValue", aIndicator);
			if (caIndicator != "")
			{	
				if(caIndicator =="Out of Stock - Connect Later")
				{										
					$("div#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Store Reservations Applet TBUI"].GetFullId()).hide();					
				}
				else
				{
					$("div#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Store Reservations Applet TBUI"].GetFullId()).show();					
					
				}	
			}else{
				$("div#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Store Reservations Applet TBUI"].GetFullId()).hide();					
			}
			
			/*
			var pm=this.GetPM();
			var recordSet = pm.Get("GetRecordSet");
			var recordSetCount = recordSet.length;
			if (recordSetCount > 0)
			{	
			var sIndicator=recordSet[0]["VF Stock Indicator TBUI"];	
				if(sIndicator=="Out of Stock - Connect Later")
				{										
					$("div#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Store Reservations Applet TBUI"].GetFullId()).hide();					
				}
				else
				{
					$("div#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Store Reservations Applet TBUI"].GetFullId()).show();					
					
				}	
			}
			*/
			}				

                VHARCStoreListPR.prototype.BindEvents = function() {
                    SiebelAppFacade.VHARCStoreListPR.superclass.BindEvents.apply(this, arguments);                    
                }

			function OnFieldChange(control, value){			
			if(control.GetName()=="VF Stock Indicator TBUI")
			{				
				if(value=="Out of Stock - Connect Later")
				{										
					$("div#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Store Reservations Applet TBUI"].GetFullId()).hide();					
				}
				else
				{
					$("div#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Store Reservations Applet TBUI"].GetFullId()).show();					
					
				}
			}	
			}			
            return VHARCStoreListPR
        }());
        return "SiebelAppFacade.VHARCStoreListPR"
    })
}
;