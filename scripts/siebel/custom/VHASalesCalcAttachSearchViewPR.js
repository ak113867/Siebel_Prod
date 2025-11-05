if (typeof(SiebelAppFacade.VHASalesCalcAttachSearchViewPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHASalesCalcAttachSearchViewPR");
    define("siebel/custom/VHASalesCalcAttachSearchViewPR", [], function () {
        SiebelAppFacade.VHASalesCalcAttachSearchViewPR = (function () {
            function VHASalesCalcAttachSearchViewPR(pm) {
                SiebelAppFacade.VHASalesCalcAttachSearchViewPR.superclass.constructor.call(this, pm)
            }
            SiebelJS.Extend(VHASalesCalcAttachSearchViewPR, SiebelAppFacade.JQGridRenderer);
            VHASalesCalcAttachSearchViewPR.prototype.Init = function () {
                SiebelAppFacade.VHASalesCalcAttachSearchViewPR.superclass.Init.apply(this, arguments); 
			};
            VHASalesCalcAttachSearchViewPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHASalesCalcAttachSearchViewPR.superclass.ShowUI.apply(this, arguments);
                var searchQuoterec = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Sales Calc Search Quote List Applet"].GetRecordSet()[0];
				var attachmentrec = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Sales Calc Search Quote Attachment Applet"].GetRecordSet()[0];
				if (attachmentrec) {
					console.log(attachmentrec);
					if(searchQuoterec.ExistingCustomerFlag == "Y")
					{
						this.GetGrid().hideCol('QuoteFileName');
					}
					if(searchQuoterec.ExistingCustomerFlag == "N")
					{
						this.GetGrid().hideCol('VHAQuoteFileName');
						
					}
				}
            };
			VHASalesCalcAttachSearchViewPR.prototype.BindData = function (bRefresh) { 

                SiebelAppFacade.VHASalesCalcAttachSearchViewPR.superclass.BindData.apply(this, arguments);
			}
			return VHASalesCalcAttachSearchViewPR
        }());
        return "SiebelAppFacade.VHASalesCalcAttachSearchViewPR"
    })
};
