if (typeof(SiebelAppFacade.VHASSJAccountEntryAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHASSJAccountEntryAppletPR");
 define("siebel/custom/VHASSJAccountEntryAppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.VHASSJAccountEntryAppletPR = (function () {

    function VHASSJAccountEntryAppletPR(pm) {
     SiebelAppFacade.VHASSJAccountEntryAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHASSJAccountEntryAppletPR, SiebelAppFacade.PhysicalRenderer);

    VHASSJAccountEntryAppletPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHASSJAccountEntryAppletPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    VHASSJAccountEntryAppletPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHASSJAccountEntryAppletPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
	 
		
    }

    VHASSJAccountEntryAppletPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.VHASSJAccountEntryAppletPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    VHASSJAccountEntryAppletPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHASSJAccountEntryAppletPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
	 
	 //New Customer Next Button Enable - Start*/
		   

			/*const inputName = $('input[aria-label="First Name"]');
			$('span[id*="VHA_Cust_First_Name"]').prepend('<span class="required-asterisk">*</span>');			
			const buttonLogin = $('button[title="Enter New Customer Details Form Applet:Next"]');
			inputName.on('input', function () {
			const inputValue = $(this).val().trim();
			 buttonLogin.prop('disabled', inputValue === '');
			 buttonLogin.addClass('nextbtnActive');
			}); */
			
			const inputName = $('input[aria-label="First name"]');
			$('span[id*="VHA_Cust_First_Name"]').prepend('<span class="required-asterisk">*</span>');	
				const buttonLogin = $('button[title="Enter new customer details Form Applet:Next"]');
				inputName.on('input', function () {
				const inputValue = $(this).val().trim();
				const isValid = /^[a-zA-Z\s]+$/.test(inputValue);
				buttonLogin.prop('disabled', inputValue === '' || !isValid);
				if (isValid && inputValue !== '') {
					buttonLogin.addClass('nextbtnActive');
				}
			});
		   //New Customer Next Button Enable - End*/
    }

    VHASSJAccountEntryAppletPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.VHASSJAccountEntryAppletPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return VHASSJAccountEntryAppletPR;
   }()
  );
  return "SiebelAppFacade.VHASSJAccountEntryAppletPR";
 })
}
