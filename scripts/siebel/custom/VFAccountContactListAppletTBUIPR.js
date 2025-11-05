if (typeof(SiebelAppFacade.VFAccountContactListAppletTBUIPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFAccountContactListAppletTBUIPR");
    define("siebel/custom/VFAccountContactListAppletTBUIPR", ["order!siebel/jqgridrenderer"], function() {
        SiebelAppFacade.VFAccountContactListAppletTBUIPR = (function() {
            var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");

            function VFAccountContactListAppletTBUIPR(pm) {
                SiebelAppFacade.VFAccountContactListAppletTBUIPR.superclass.constructor.call(this, pm)
            }
            SiebelJS.Extend(VFAccountContactListAppletTBUIPR, SiebelAppFacade.JQGridRenderer);
			VFAccountContactListAppletTBUIPR.prototype.ShowUI = function() {
                SiebelAppFacade.VFAccountContactListAppletTBUIPR.superclass.ShowUI.call(this);
			var sSendSQSMS = SiebelApp.S_App.GetProfileAttr("SendSQSMS");
				if(sSendSQSMS != "SendSMS"){
				$('#NBNSendSMS_Label').hide();
				}
                
            };
            VFAccountContactListAppletTBUIPR.prototype.Init = function() {
                SiebelAppFacade.VFAccountContactListAppletTBUIPR.superclass.Init.apply(this, arguments);
                this.GetPM().AttachNotificationHandler(consts.get("SWE_PROP_BC_NOTI_NEW_ACTIVE_ROW"), function(propSet) {
                    var sContactId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("Contact").GetFieldValue("Id");
                    var sBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Postpay Add Identification TBC");
                    sBC.SetFieldValue("VHAContRowId", sContactId);
                    sBC.WriteRecord();
					var service = SiebelApp.S_App.GetService("SIS OM PMT Service");
					var inPS = SiebelApp.S_App.NewPropertySet();
					var outPS = SiebelApp.S_App.NewPropertySet();
					inPS.SetProperty("Business Object Name","Order Entry (Sales)");
					inPS.SetProperty("Business Component Name","VHA Postpay Add Identification TBC");
					service.InvokeMethod("Refresh Business Component",inPS,outPS);
                });
                var this_t = this;
                this.AttachPMBinding("ShowSelection", ExecuteShowSelection)
            };

            function ExecuteShowSelection() {
                setTimeout(function() {
                    var sContactId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("Contact").GetFieldValue("Id");
                    var sBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Postpay Add Identification TBC");
                    sBC.SetFieldValue("VHAContRowId", sContactId);
                    sBC.WriteRecord();
					var service = SiebelApp.S_App.GetService("SIS OM PMT Service");
					var inPS = SiebelApp.S_App.NewPropertySet();
					var outPS = SiebelApp.S_App.NewPropertySet();
					inPS.SetProperty("Business Object Name","Order Entry (Sales)");
					inPS.SetProperty("Business Component Name","VHA Postpay Add Identification TBC");
					service.InvokeMethod("Refresh Business Component",inPS,outPS);
                }, 50);
            }
            return VFAccountContactListAppletTBUIPR
        }());
        return "SiebelAppFacade.VFAccountContactListAppletTBUIPR"
    })
};