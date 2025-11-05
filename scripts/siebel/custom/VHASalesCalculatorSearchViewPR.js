if (typeof(SiebelAppFacade.VHASalesCalculatorSearchViewPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHASalesCalculatorSearchViewPR");
    define("siebel/custom/VHASalesCalculatorSearchViewPR", [], function () {
        SiebelAppFacade.VHASalesCalculatorSearchViewPR = (function () {
            function VHASalesCalculatorSearchViewPR(pm) {
                SiebelAppFacade.VHASalesCalculatorSearchViewPR.superclass.constructor.call(this, pm)
            }
            SiebelJS.Extend(VHASalesCalculatorSearchViewPR, SiebelAppFacade.JQGridRenderer);
            VHASalesCalculatorSearchViewPR.prototype.Init = function () {
                SiebelAppFacade.VHASalesCalculatorSearchViewPR.superclass.Init.apply(this, arguments); 
			};
            VHASalesCalculatorSearchViewPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHASalesCalculatorSearchViewPR.superclass.ShowUI.apply(this, arguments);
                var searchQuoterec = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Sales Calc Search Quote List Applet"].GetRecordSet()[0];
				if (searchQuoterec) {
					console.log(searchQuoterec);
					if(searchQuoterec.ExistingCustomerFlag == "Y")
					{
						this.GetGrid().hideCol('Quote_Number');
					}
					if(searchQuoterec.ExistingCustomerFlag == "N")
					{
						this.GetGrid().hideCol('VHA_Quote_Number_Calc');
						
					}
				}
				/*var attachmentrec = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Sales Calc Search Quote Attachment Applet"].GetRecordSet()[0];
				if (attachmentrec) {
					console.log(attachmentrec);
					if(searchQuoterec.ExistingCustomerFlag == "Y")
					{
						this.GetGrid().hideCol('QuoteFileName');
					}
					if(searchQuoterec.ExistingCustomerFlag == "N")
					{
						//this.GetGrid().hideCol('VHA_Quote_Number_Calc');
						
					}
				}*/
            };
			VHASalesCalculatorSearchViewPR.prototype.BindData = function (bRefresh) { 

                SiebelAppFacade.VHASalesCalculatorSearchViewPR.superclass.BindData.apply(this, arguments);
			}
			return VHASalesCalculatorSearchViewPR
        }());
        return "SiebelAppFacade.VHASalesCalculatorSearchViewPR"
    })
};
