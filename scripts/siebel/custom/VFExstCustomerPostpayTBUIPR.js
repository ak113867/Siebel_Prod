if (typeof(SiebelAppFacade.VFExstCustomerPostpayTBUIPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VFExstCustomerPostpayTBUIPR");
 define("siebel/custom/VFExstCustomerPostpayTBUIPR", ["siebel/custom/VF_Intelligence_Search_PR"],
  function () {
   SiebelAppFacade.VFExstCustomerPostpayTBUIPR = (function () {

    function VFExstCustomerPostpayTBUIPR(pm) {
     SiebelAppFacade.VFExstCustomerPostpayTBUIPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VFExstCustomerPostpayTBUIPR, SiebelAppFacade.VF_Intelligence_Search_PR);

    VFExstCustomerPostpayTBUIPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFExstCustomerPostpayTBUIPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
	// SiebelApp.S_App.SetProfileAttr("sCustId", "");
	 var this_t = this;
		this.GetPM().AddMethod("FieldChange", OnFieldChange, {
			sequence: false,
			scope: this
		});
		function OnFieldChange(control, value) {
			
			if(control.GetName() == 'Customer Segment'){
				
				if(value == 'Consumer'){
					
					setTimeout(function () {
					$('input[aria-label*="DOM"]').parent().parent().prev().show();
					$('input[aria-label*="DOM"]').parent().parent().show();
					$('input[aria-label="Contact Role"]').parent().parent().prev().show();
					$('input[aria-label="Contact Role"]').parent().parent().show();
					$('input[aria-label*="Bill Segment"]').parent().parent().prev().show();
					$('input[aria-label*="Bill Segment"]').parent().parent().show();
					
					$('[aria-label="Customer Type Form Applet:Validate RAF Code"]').parent().show();
					 $('[aria-label="Enter RAF Code"]').parent().show();
					 $('[aria-label="Enter RAF Code"]').parent().parent().show();
					 $('span[id*=VHA_RAF_Code_Label').show();
					 $('span[id*=VHA_RAF_Code_Label').parent().parent().show();
					 
					

					$('input[aria-label*="Bill Segment"]').removeAttr('readonly');
					$('input[aria-label*="Bill Segment"]').removeAttr('aria-readonly');
					$('input[aria-label*="Bill Segment"]').next().css('pointer-events','auto');
					$('input[aria-label*="Bill Segment"]').css('background-color','#FFF');
					//SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Person TBUI").GetBusComp().SetFieldValue("Exst Bill Segment","");
					
					$('input[aria-label*="DOM"]').removeAttr('readonly');
					$('input[aria-label*="DOM"]').removeAttr('aria-readonly');
					$('input[aria-label*="DOM"]').next().css('pointer-events','auto');
					$('input[aria-label*="DOM"]').css('background-color','#FFF');
					//SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Person TBUI").GetBusComp().SetFieldValue("Exst Bill Cycle","");

					$('input[aria-label*="Contact Role"]').removeAttr('readonly');
					$('input[aria-label*="Contact Role"]').removeAttr('aria-readonly');
					$('input[aria-label*="Contact Role"]').next().css('pointer-events','auto');
					$('input[aria-label*="Contact Role"]').css('background-color','#FFF');
					//SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Person TBUI").GetBusComp().SetFieldValue("VF Contact Role Calc","");
					SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Person TBUI").GetBusComp().SetFieldValue("CA PIN","");
					SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Person TBUI").GetBusComp().SetFieldValue("WSDL Address","");
					SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Person TBUI").GetBusComp().SetFieldValue("Address Status Display","");
					$('.ccNwkpar').hide();
					//SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Person TBUI").GetBusComp().SetFieldValue("VF Customer Type","");
					//ChangeAddress();	
					//$('button[data-display="Change Address"]').click();
					
					},500);
				}
				if(value == 'Business')
				{
					
				setTimeout(function () {
					$('input[aria-label*="ABN"]').parent().parent().prev().show();
					$('input[aria-label*="ABN"]').parent().parent().show();
					$('input[aria-label*="Trading As"]').parent().parent().prev().show();
					$('input[aria-label*="Trading As"]').parent().parent().show();
			
					$('input[aria-label*="Trading Date"]').parent().parent().prev().show();
					$('input[aria-label*="Trading Date"]').parent().parent().show();
					
					
					$('input[aria-label="Contact Role"]').parent().parent().prev().show();
					$('input[aria-label="Contact Role"]').parent().parent().show();
					$('input[aria-label*="Bill Segment"]').parent().parent().prev().show();
					$('input[aria-label*="Bill Segment"]').parent().parent().show();
					$('input[aria-label*="DOM"]').parent().parent().prev().show();
					$('input[aria-label*="DOM"]').parent().parent().show();
					
					$('input[aria-label="Customer Sub Segment"]').parent().parent().prev().show();
					$('input[aria-label="Customer Sub Segment"]').parent().parent().show();
					
					$('input[aria-label*="Company Name"]').parent().parent().prev().show();
					$('input[aria-label*="Company Name"]').parent().parent().show();
					$('input[aria-label*="Employee Range"]').parent().parent().prev().show();
					$('input[aria-label*="Employee Range"]').parent().parent().show();
					$('input[aria-label*="Industry Type"]').parent().parent().prev().show();
					$('input[aria-label*="Industry Type"]').parent().parent().show();
					$('input[aria-label="Enter RAF Code"]').parent().parent().prev().show();
					$('input[aria-label="Enter RAF Code"]').parent().parent().show();
					$('input[aria-label="Customer Sub Segment"]').parent().parent().prev().show();
					$('input[aria-label="Customer Sub Segment"]').parent().parent().show();
					
					$('button[data-display="Validate ABN/ACN"]').parent().parent().show();
		
					$('input[id*="Sub_Segment_Label"]').parent().prev().show();
					$('span[id*="VF_ABN_Search_Label_Label"]').parent().parent().parent().show();
					$('span[id*="VF_Invalid_ABN_Label_Label"]').parent().parent().parent().show();
					
					
				
								
				$('input[aria-label*="Bill Segment"]').removeAttr('readonly');
				$('input[aria-label*="Bill Segment"]').removeAttr('aria-readonly');
				$('input[aria-label*="Bill Segment"]').next().css('pointer-events','auto');
				$('input[aria-label*="Bill Segment"]').css('background-color','#FFF');
				
				$('input[aria-label*="DOM"]').removeAttr('readonly');
				$('input[aria-label*="DOM"]').removeAttr('aria-readonly');
				$('input[aria-label*="DOM"]').next().css('pointer-events','auto');
				$('input[aria-label*="DOM"]').css('background-color','#FFF');
				
				$('input[aria-label*="Contact Role"]').removeAttr('readonly');
				$('input[aria-label*="Contact Role"]').removeAttr('aria-readonly');
				$('input[aria-label*="Contact Role"]').next().css('pointer-events','auto');
				$('input[aria-label*="Contact Role"]').css('background-color','#FFF');
				SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("VF Contact Role Calc","");
				
				
				$('input[aria-label*="Customer Sub Segment"]').removeAttr('readonly');
				$('input[aria-label*="Customer Sub Segment"]').removeAttr('aria-readonly');
				$('input[aria-label*="Customer Sub Segment"]').next().css('pointer-events','auto');
				$('input[aria-label*="Customer Sub Segment"]').css('background-color','#FFF');
				

				$('input[aria-label*="Customer Type"]').removeAttr('readonly');
				$('input[aria-label*="Customer Type"]').removeAttr('aria-readonly');
				$('input[aria-label*="Customer Type"]').next().css('pointer-events','auto');
				$('input[aria-label*="Customer Type"]').css('background-color','#FFF');
				//$('input[aria-label*="Customer Type"]').val('');
				SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("VF Customer Type","");
				SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("CA PIN","");
				SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("Company Name","");
				SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("Industry Type","");
				SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("VF Employee Count Range","");	
				SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("VF Sub Segment","");
				SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("WSDL Address","");
				SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("Address Status Display","");
				$('.ccNwkpar').hide();
				//ChangeAddress();			
				//$('button[data-display="Change Address"]').click();
				},500);
				}								
			
			}
			
		}
    }

    VFExstCustomerPostpayTBUIPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFExstCustomerPostpayTBUIPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
	 formPMcontrol = this.GetPM();
	 
	 var sCustProf = SiebelApp.S_App.GetProfileAttr("sCustId");
		 var sCustId ="";
		 if(sCustProf == "")
		 {
			sCustId=$('input[aria-label="Customer Id:"]').val();
			SiebelApp.S_App.SetProfileAttr("sCustId", sCustId);
		 }
		 
		 if(SiebelApp.S_App.GetProfileAttr("AddNewAccount") != 'Y')
		 {
			 $('input[aria-label*="Customer Segment"]').prop('readonly','readOnly');
			 $('input[aria-label*="Customer Segment"]').prop('aria-readonly',"true");
			 $('input[aria-label*="Customer Segment"]').css('pointer-events','none');
			 $('input[aria-label*="Customer Segment"]').next().css('pointer-events','none');
			 $('input[aria-label*="Customer Segment"]').css('background-color','#F4F4F4');
			 $('input[aria-label*="Customer Segment"]').css('opacity','38%');
			 $('input[aria-label*="Customer Segment"]').next().css('opacity','38%');
			 $('input[aria-label*="Customer Type"]').prop('readonly','readOnly');
			 $('input[aria-label*="Customer Type"]').prop('aria-readonly',"true");
			 $('input[aria-label*="Customer Type"]').next().css('pointer-events','none');
			 $('input[aria-label*="Customer Type"]').css('pointer-events','none');
			 $('input[aria-label*="Customer Type"]').css('background-color','#F4F4F4');
			 $('input[aria-label*="Customer Type"]').css('opacity','38%');
			 $('input[aria-label*="Customer Type"]').next().css('opacity','38%');
			 // Commented the below code for  CM-1263
			 /*$('input[aria-label*="CA PIN"]').css('pointer-events','none');
			 $('input[aria-label*="CA PIN"]').css('background-color','#F4F4F4');
			 $('input[aria-label*="CA PIN"]').css('opacity','38%');*/
		 }
	
	 /*$('button[data-display="Validate ABN/ACN"]').on("click",function(e){
		 var newAcc = SiebelApp.S_App.GetProfileAttr("AddNewAccount", "Y");
		 var CAPIN = $('input[aria-label*="CA PIN"]').val();
				 if((newAcc == "Y")  && (CAPIN == "" || CAPIN == null || CAPIN == undefined))
				 {
				 alert("CAPIN is required Field. Please enter a value for the field");
				 }
		  });*/
	 $('button[data-display="Add New Account"]').on("click",function(e){		
	 
		 var gConnectRestric = SiebelApp.S_App.GetProfileAttr("gConnectRestric"); 
		  if(gConnectRestric == "Y")
		 {
			 alert('A new Customer Account cannot be created during a Quote Fulfilment journey');
			 return false;
		 }
		SiebelApp.S_App.SetProfileAttr("AddNewAccount", "Y");
		 var sCustId = "";  
		 SiebelApp.S_App.SetProfileAttr("sCustId", "");
		 sCustId=$('input[aria-label="Customer Id:"]').val();
		 SiebelApp.S_App.SetProfileAttr("sCustId", sCustId);

		 setTimeout(function () {
		
		SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("VF Customer Segment","");
		
		//Ravindra: Added the below 4 lines of code for imagine project
		
		
		$('input[aria-label*="Customer Type"]').removeAttr('readonly');
		$('input[aria-label*="Customer Type"]').removeAttr('aria-readonly');
		$('input[aria-label*="Customer Type"]').next().css('pointer-events','auto');
		$('input[aria-label*="Customer Type"]').css('background-color','#FFF');
		//$('input[aria-label*="Customer Type"]').val('');
		$('input[aria-label*="Customer Type"]').css('opacity','unset');
		$('input[aria-label*="Customer Type"]').next().css('opacity','unset');
		SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("VF Customer Type","");
						
		$('input[aria-label*="Customer Segment"]').removeAttr('readonly');						 		 
		$('input[aria-label*="Customer Segment"]').removeAttr('aria-readonly');		 
		$('input[aria-label*="Customer Segment"]').next().css('pointer-events','auto');		 
		$('input[aria-label*="Customer Segment"]').css('background-color','#FFF');		 		
		$('input[aria-label*="Customer Segment"]').css('opacity','unset');
		$('input[aria-label*="Customer Segment"]').next().css('opacity','unset');
		
		
		$('input[aria-label*="DOM"]').removeAttr('readonly');
		$('input[aria-label*="DOM"]').removeAttr('aria-readonly');
		$('input[aria-label*="DOM"]').next().css('pointer-events','auto');
		$('input[aria-label*="DOM"]').css('background-color','#FFF');
		//$('input[aria-label*="DOM"]').val('');
						
		$('input[aria-label*="Bill Segment"]').removeAttr('readonly');
		$('input[aria-label*="Bill Segment"]').removeAttr('aria-readonly');
		$('input[aria-label*="Bill Segment"]').next().css('pointer-events','auto');
		$('input[aria-label*="Bill Segment"]').css('background-color','#FFF');
		//$('input[aria-label*="Bill Segment"]').val('');
		 
		$('input[aria-label*="CA PIN"]').removeAttr('readonly');
		$('input[aria-label*="CA PIN"]').removeAttr('aria-readonly');
		$('input[aria-label*="CA PIN"]').next().css('pointer-events','auto');
		$('input[aria-label*="CA PIN"]').css('background-color','#FFF');
		//$('input[aria-label*="CA PIN"]').val('');
		$('input[aria-label*="CA PIN"]').css('opacity','unset');
		
		$('input[aria-label*="ABN"]').val('');
		$('input[aria-label*="Trading As"]').val('');
		$('input[aria-label="Trading Date"]').val('');		 
	
		 $('input[aria-label="Consumer"]').removeAttr('aria-readonly');
		 $('input[aria-label="Consumer"]').next().css('pointer-events','auto');
		 $('input[aria-label="Business"]').removeAttr('aria-readonly');
		 $('input[aria-label="Business"]').next().css('pointer-events','auto');
		 
		$('input[aria-label*="ABN"]').parent().parent().prev().hide();
		 $('input[aria-label*="ABN"]').parent().parent().hide();
		 $('input[aria-label*="Trading As"]').parent().parent().prev().hide();
		 $('input[aria-label*="Trading As"]').parent().parent().hide();
			
		 $('input[aria-label*="Trading Date"]').parent().parent().prev().hide();
		 $('input[aria-label*="Trading Date"]').parent().parent().hide();
		 $('input[aria-label*="DOM"]').parent().parent().prev().hide();
		$('input[aria-label*="DOM"]').parent().parent().hide();
		$('input[aria-label="Contact Role"]').parent().parent().prev().hide();
		$('input[aria-label="Contact Role"]').parent().parent().hide();
		$('input[aria-label*="Bill Segment"]').parent().parent().prev().hide();
		$('input[aria-label*="Bill Segment"]').parent().parent().hide();	

		$('input[aria-label="Customer Sub Segment"]').parent().parent().prev().hide();
		$('input[aria-label="Customer Sub Segment"]').parent().parent().hide();
		$('input[aria-label*="Company Name"]').parent().parent().prev().hide();
		$('input[aria-label*="Company Name"]').parent().parent().hide();
		$('input[aria-label*="Employee Range"]').parent().parent().prev().hide();
		$('input[aria-label*="Employee Range"]').parent().parent().hide();
		$('input[aria-label*="Industry Type"]').parent().parent().prev().hide();
		$('input[aria-label*="Industry Type"]').parent().parent().hide();
		$('input[aria-label="Enter RAF Code"]').parent().parent().prev().hide();
		$('input[aria-label="Enter RAF Code"]').parent().parent().hide();
		$('input[aria-label="Customer Sub Segment"]').parent().parent().prev().hide();
		$('input[aria-label="Customer Sub Segment"]').parent().parent().hide();
		
		$('button[data-display="Validate ABN/ACN"]').parent().parent().hide();
		
		$('input[id*="Sub_Segment_Label"]').parent().prev().hide();
		$('span[id*="VF_ABN_Search_Label_Label"]').parent().parent().parent().hide();
		$('span[id*="VF_Invalid_ABN_Label_Label"]').parent().parent().parent().hide();
		$('.siebui-icon-validaterafcode').hide();
		SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("CA PIN","");
		SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("WSDL Address","");
		SiebelApp.S_App.GetActiveView().GetApplet("VF Capture Exst Customer Details Toggle Form Applet Corporate TBUI").GetBusComp().SetFieldValue("Address Status Display","");
		$('.ccNwkpar').hide();
		
		//$('button[data-display="Change Address"]').click();
		//ChangeAddress();
		//CM-1397-UAT FEEDBACK
		/*$('input[aria-labelledby*="WSDL_Address_Label"]').removeAttr('readonly');
		$('input[aria-labelledby*="WSDL_Address_Label"]').removeAttr('aria-readonly');
		$('input[aria-labelledby*="WSDL_Address_Label"]').next().css('pointer-events','auto');
		$('input[aria-labelledby*="WSDL_Address_Label"]').css('background-color','#FFF');		
		$('input[aria-labelledby*="WSDL_Address_Label"]').css('opacity','unset');
		$('input[aria-labelledby*="WSDL_Address_Label"]').val(''); */
		
		
		
		 e.preventDefault();
		 }, 1000);
		 
	 });
    }
	
	function ChangeAddress()
	 {
		$('input[aria-labelledby*="WSDL_Address_Label"]').removeAttr('readonly');
		$('input[aria-labelledby*="WSDL_Address_Label"]').removeAttr('aria-readonly');
		$('input[aria-labelledby*="WSDL_Address_Label"]').next().css('pointer-events','auto');
		$('input[aria-labelledby*="WSDL_Address_Label"]').css('background-color','#FFF');		
		$('input[aria-labelledby*="WSDL_Address_Label"]').css('opacity','unset');
		$('input[aria-labelledby*="WSDL_Address_Label"]').val(''); 
	  }

    VFExstCustomerPostpayTBUIPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.VFExstCustomerPostpayTBUIPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    VFExstCustomerPostpayTBUIPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFExstCustomerPostpayTBUIPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing	
    }

    VFExstCustomerPostpayTBUIPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.VFExstCustomerPostpayTBUIPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
	 formPMcontrol.Get('GetControls')['VF Customer Type'].SetProperty("ReadOnly",true);
    }

    return VFExstCustomerPostpayTBUIPR;
   }()
  );
  return "SiebelAppFacade.VFExstCustomerPostpayTBUIPR";
 })
}
