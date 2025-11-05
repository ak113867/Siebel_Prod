
if (typeof(SiebelAppFacade.VHAContactProfileMarketingPreferences) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAContactProfileMarketingPreferences");
 define("siebel/custom/VHAContactProfileMarketingPreferences", ["siebel/phyrenderer","order!siebel/custom/VHAAppUtilities"],
  function () { 
   SiebelAppFacade.VHAContactProfileMarketingPreferences = (function () {

    function VHAContactProfileMarketingPreferences(pm) {
     SiebelAppFacade.VHAContactProfileMarketingPreferences.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAContactProfileMarketingPreferences, SiebelAppFacade.PhysicalRenderer);

    VHAContactProfileMarketingPreferences.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAContactProfileMarketingPreferences.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    VHAContactProfileMarketingPreferences.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAContactProfileMarketingPreferences.superclass.ShowUI.apply(this, arguments);
		if(SiebelApp.S_App.GetActiveView().GetName() == 'TPG Marketing preferences View' && this.GetPM().GetPMName() == 'VHA Contact Profile - Marketing Preferences_PM_y'){
			$('a[title="Marketing Preferences"]').parent().addClass('contactMarketingPreferences');
			$('.contactMarketingPreferences  #BarcodeButtons').after('<div class="vha-img-BarcodeButtons-line"></div>');
                //$('input[aria-label*="One App/Web"]').parent().parent().parent().after('<span class="vha-img-data-permission">Data Usage Permission</span>') 
		}
		var SearchString = "[List Of Values.Type]='TPG_CP_MRKPRIF_TOGGLE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='On'";
        var sLovFlg = VHAAppUtilities.GetPickListValues("", SearchString);
		console.log('LOVVV'+sLovFlg);
		if(sLovFlg[0] == 'ON'){
			var optOutAllButton = $('.contactMarketingPreferences .miniBtnUIC').eq(1);
			var optInAllButton = $('.contactMarketingPreferences .miniBtnUIC').eq(2);
			optOutAllButton.removeClass('btnDisabledOpt');
			optOutAllButton.find('a').removeClass('btnDisabledFont');	
			optInAllButton.removeClass('btnDisabledOpt');
			optInAllButton.find('a').removeClass('btnDisabledFont');	
			$('.contactMarketingPreferences').find('input[type="checkbox"]').removeClass('btnDisabledOpt')			
		}
		else{
			var optOutAllButton = $('.contactMarketingPreferences .miniBtnUIC').eq(1);
			var optInAllButton = $('.contactMarketingPreferences .miniBtnUIC').eq(2);
			optOutAllButton.addClass('btnDisabledOpt');
			optOutAllButton.find('a').addClass('btnDisabledFont');
			optInAllButton.addClass('btnDisabledOpt');
			optInAllButton.find('a').addClass('btnDisabledFont');
			$('.contactMarketingPreferences').find('input[type="checkbox"]').addClass('btnDisabledOpt')
		}
	
	 
    }

    VHAContactProfileMarketingPreferences.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAContactProfileMarketingPreferences.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    VHAContactProfileMarketingPreferences.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAContactProfileMarketingPreferences.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
	 
	 marketing_PM = this.GetPM();
	 $('.contactMarketingPreferences').on('click',function(e){
		 var optLinkData = '';
			optLinkData = $(e.target).text()
		 
		 if(optLinkData == 'Opt-out of all')
		 {
			 $('<div></div>').appendTo('body').html('<div><h6>This will Opt out all Marketing Preferences?</h6></div><br><div>Click Yes to proceed</div>')
				.dialog({
				  modal: true,
				  title: 'Delete message',
				  zIndex: 10000,
				  autoOpen: true,
				  width: 'auto',
				  resizable: false,
				  buttons: {
					Cancel: function() {
					  //$('body').append('<h1>Confirm Dialog Result: <i>Yes</i></h1>');
					  $(this).dialog("close");
					},
					Yes: function() {
					  $('.contactMarketingPreferences').find('input[type="checkbox"]').prop('checked', false);
					  $('.contactMarketingPreferences').find('input[type="checkbox"]').attr('value', 'N');
					  $(this).dialog("close");
						var optOutAllButton = $('.contactMarketingPreferences .miniBtnUIC').eq(1);
						var optInAllButton = $('.contactMarketingPreferences .miniBtnUIC').eq(2);
						optOutAllButton.addClass('btnDisabledOpt');
						optOutAllButton.find('a').addClass('btnDisabledFont');
						
						optInAllButton.removeClass('btnDisabledOpt');
						optInAllButton.find('a').removeClass('btnDisabledFont');
						optInOut("OPTOUT");
					}
				  },
				  close: function(event, ui) {
					$(this).remove();
				  }
				});
		 }
		 if(optLinkData == 'Opt-in to all') 
		 {
				$('.contactMarketingPreferences').find('input[type="checkbox"]').prop('checked', true);
				$('.contactMarketingPreferences').find('input[type="checkbox"]').attr('value', 'Y');
				var optOutAllButton = $('.contactMarketingPreferences .miniBtnUIC').eq(1);
				var optInAllButton = $('.contactMarketingPreferences .miniBtnUIC').eq(2);
				optInAllButton.addClass('btnDisabledOpt');
				optInAllButton.find('a').addClass('btnDisabledFont');
				
				optOutAllButton.removeClass('btnDisabledOpt');
				optOutAllButton.find('a').removeClass('btnDisabledFont');
				
				//marketing_PM.ExecuteMethod("SaveCheckboxChanges");
				optInOut("OPTALL");
				
				
			 
		 }
		 function optInOut(optValue){
				var optVal = optValue;
				var contactRowID = SiebelApp.S_App.GetActiveBusObj('Contact').GetBusCompByName('Contact').GetFieldValue('Id');				
				var serMarket = SiebelApp.S_App.GetService("Workflow Process Manager");
				var inputsMarket = SiebelApp.S_App.NewPropertySet();
				var outputsMerket = SiebelApp.S_App.NewPropertySet();
				
				inputsMarket.SetProperty("Object Id",contactRowID);
				inputsMarket.SetProperty("Type",optVal);

				inputsMarket.SetProperty("ProcessName", "TPG Update Marketing Fields Process");
				outputsMerket = serMarket.InvokeMethod("RunProcess", inputsMarket);
		 }
		 
	 })
    }

    VHAContactProfileMarketingPreferences.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHAContactProfileMarketingPreferences.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return VHAContactProfileMarketingPreferences;
   }()
  );
  return "SiebelAppFacade.VHAContactProfileMarketingPreferences";
 })
}