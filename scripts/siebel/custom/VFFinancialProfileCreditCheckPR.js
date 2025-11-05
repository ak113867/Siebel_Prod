if (typeof(SiebelAppFacade.VFFinancialProfileCreditCheckPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VFFinancialProfileCreditCheckPR");
 define("siebel/custom/VFFinancialProfileCreditCheckPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.VFFinancialProfileCreditCheckPR = (function () {

    function VFFinancialProfileCreditCheckPR(pm) {
     SiebelAppFacade.VFFinancialProfileCreditCheckPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VFFinancialProfileCreditCheckPR, SiebelAppFacade.PhysicalRenderer);

    VFFinancialProfileCreditCheckPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFFinancialProfileCreditCheckPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    VFFinancialProfileCreditCheckPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFFinancialProfileCreditCheckPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
	 
	 $('div[aria-label="Financial Profile in Contact Detail"]').children('div').prepend("<div id='FPNoticeMsg'>Notice: You Are About to Access Financial Profile Information. Click Show Details Button to Collapse and Your User detail will be Logged for Verification.</div>");
	 $('div[aria-label="Financial Profile in Contact Detail"]').children('div').find('#FPNoticeMsg').append("<button type='button' class='siebui-ctrl-btn appletButton CreditCheckBtn' id='FPCreditCheckBtn' data-display='Show Detail' tabindex='0' title='Financial Profile Form Applet:Show Detail' aria-label='Financial Profile Form Applet:Show Detail'><span>Show Details</span></button>");
	 $('div[aria-label="Financial Profile in Contact Detail"]').children('div').find('form').hide();
    }

    VFFinancialProfileCreditCheckPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.VFFinancialProfileCreditCheckPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    VFFinancialProfileCreditCheckPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFFinancialProfileCreditCheckPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
	 $('.CreditCheckBtn').on('click',function(){
		 $('div[aria-label="Financial Profile in Contact Detail"]').children('div').find('form').show();
		 $('#FPNoticeMsg').hide();
	 });
    }

    VFFinancialProfileCreditCheckPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFFinancialProfileCreditCheckPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return VFFinancialProfileCreditCheckPR;
   }()
  );
  return "SiebelAppFacade.VFFinancialProfileCreditCheckPR";
 })
}
