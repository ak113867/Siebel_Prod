if (typeof(SiebelAppFacade.VHAConnectionFormAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAConnectionFormAppletPR");
    define("siebel/custom/VHAConnectionFormAppletPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHAConnectionFormAppletPR = (function() {
                function VHAConnectionFormAppletPR(pm) {
                    SiebelAppFacade.VHAConnectionFormAppletPR.superclass.constructor.call(this, pm);
                }
                SiebelJS.Extend(VHAConnectionFormAppletPR, SiebelAppFacade.PhysicalRenderer);
                VHAConnectionFormAppletPR.prototype.ShowUI = function() {
                    SiebelAppFacade.VHAConnectionFormAppletPR.superclass.ShowUI.call(this);
                    var pm = this.GetPM();
                    /*var CustomerId = pm.Get("GetBusComp").GetFieldValue("Id");
                    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    var Output = SiebelApp.S_App.NewPropertySet();
                    Inputs.SetProperty("Service Name", "SIS OM PMT Service");
                    Inputs.SetProperty("Method Name", "Set Profile Attribute");
                    Inputs.SetProperty("Profile Attribute Name", "VHACustomerId");
                    Inputs.SetProperty("Profile Attribute Value", CustomerId);
                    Output = ser.InvokeMethod("Run Process", Inputs);*/
                    var controls = pm.Get("GetControls");
                    var Accstatusctrl = controls["AccountStatus"].GetInputName();

                    var Mode = SiebelApp.S_App.GetActiveView().GetApplet(pm.Get("GetName")).GetMode();
                    setTimeout(function() {
					
					
					/* Added fot transfer Service show and hide*/
					/*TULASIY:16-09-2022::Modified for upgrade 22.7 issues*/
					  var uCustSegmnt = "VF_Customer_Segment_Label_"+pm.Get("GetId");
					  if($('[aria-labelledby='+uCustSegmnt+']').val() != "" ) {
							SiebelJS.Log("Customer Segment is not null");
							$('[aria-label="Customer Account Form Applet:Transfer Service"]').hide();
					  }
					  if(SiebelApp.S_App.GetProfileAttr("VHA User Type") == "Retail")
					  {
						SiebelJS.Log("Retail User");
						$('[aria-label="Customer Account Form Applet:Transfer Service"]').hide();  
					  }

                        if (Mode == "Base" || Mode == "Edit") {
							/*TULASIY:15-09-2022::Modified for upgrade 22.7 issues*/
                            $("input[name='" + Accstatusctrl + "']").siblings("span").removeClass("siebui-icon-dropdown");
                            $("input[name='" + Accstatusctrl + "']").removeClass("siebui-ctrl-select");
                            $("input[name='" + Accstatusctrl + "']").removeClass("siebui-input-popup");
                            $("input[name='" + Accstatusctrl + "']").addClass("RemoveBorder");

                            if ($("input[name='" + Accstatusctrl + "']").val() == "Active") {

                                /*Mani- SIT Sanity Defects*/
								/*TULASIY:15-09-2022::Modified for upgrade 22.7 issues*/
                                $("input[name='" + Accstatusctrl + "']").parent().prepend('<span class="dot_Class_Active"></span>');
                                $("input[name='" + Accstatusctrl + "']").addClass("siebui-value Class_Active AccountStatusLabel");
                            }


                            if ($("input[name='" + Accstatusctrl + "']").val() == "Inactive") {

                                /*Mani- SIT Sanity Defects*/
								/*TULASIY:15-09-2022::Modified for upgrade 22.7 issues*/
                                $("input[name='" + Accstatusctrl + "']").parent().prepend('<span class="dot_Class_Inactive"></span>');
                                $("input[name='" + Accstatusctrl + "']").addClass("siebui-value Class_Inactive AccountStatusLabel");
                            }
                        }
                    }, 5);
					
							
				if(Mode == "Base" || Mode == "Edit" )
				{
					var cutomerType = SiebelApp.S_App.GetActiveBusObj('Account').GetBusCompByName('Account').GetFieldValue('VF Customer Type');
					var customerSegment = SiebelApp.S_App.GetActiveBusObj('Account').GetBusCompByName('Account').GetFieldValue('VF Customer Segment');
					var busSubType = SiebelApp.S_App.GetActiveBusObj('Account').GetBusCompByName('Account').GetFieldValue('VF EGW Business Sub Type');
					if(cutomerType == 'Person' || customerSegment == 'Consumer' || customerSegment == '')
					{	
						$('input[aria-label="Registered Company #"]').parents('td').parent('tr').hide();
						$('input[aria-label="Number of Employees"]').parents('td').parent('tr').hide();
						$('input[aria-label="Business Location"]').parents('td').parent('tr').hide();	
						$('input[aria-label="Registered Company Name"]').parents('td').parent('tr').hide();
						$('input[aria-label="Dissolved"]').parents('td').parent('tr').hide();
						$('input[aria-label="Care"]').parents('td').parent('tr').hide();
						$('input[aria-label="Corporate Group"]').parents('td').parent('tr').hide();
						$('button[data-display="Validate"]').parents('td').parent('tr').hide();
					}
					if(customerSegment == 'Business')
					{
						//$('input[aria-label="Bill Segment"]').parents('td').parent('tr').hide();				
					}			
					if (busSubType == 'First') 
						{
							$('span[id*="HTML_FieldLabel"]').parents('td').show();
							$('input[aria-label="Percentage"]').parents('td').show();
							$('span[id*="VF_Minimum_Commitment_Percentage"]').parents('td').show();
							$('input[aria-label="Total Agreed Fleet Size"]').parents('td').show();
							$('span[id*="VF_Total_Agreed_Fleet_Size"]').parents('td').show();
							$('input[aria-label="Mobile Services Required"]').parents('td').show();
							$('span[id*="VF_Minimum_Commitment_Mobile_Services_Required"]').parents('td').show();
							$('input[aria-label="Pause Min Commitment"]').parents('td').show();
							$('span[id*="VF_Pause_Minimum_Commitment"]').parents('td').show();
							$('input[aria-label="Pause Date"]').parents('td').show();
							$('span[id*="VF_Pause_Minimum_Commitment_Date"]').parents('td').show();
							$('input[aria-label="Minimum Fee"]').parents('td').show();
							$('span[id*="VF_Minimum_Fee"]').parents('td').show();
							$('input[aria-label="Commitment Flag"]').parents('td').show();
							$('span[id*="VF_Minimum_Commitment_Flag"]').parents('td').show();
							$('input[aria-label="Nominated Billing Account Number"]').parents('td').show();
							$('span[id*="VF_Nominated_Billing_Account_Number"]').parents('td').show();
							$('input[aria-label="SF Account Number"]').parents('td').show();
							$('span[id*="VF_Salesforce_Customer_Account_Number"]').parents('td').show();
							$('input[aria-label="Co-Terminus Start Date"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_Start_Date"]').parents('td').show();
							$('input[aria-label="Co-Terminus End Date"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_End_Date"]').parents('td').show();
							$('input[aria-label="Co-Terminus Contract Length"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_Contract_Length"]').parents('td').show();
							$('input[aria-label="Co-Terminus Flag"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_Flag"]').parents('td').show();
							$('input[aria-label="Offer Segment"]').parents('td').show();
							$('span[id*="VHA_EGW_Offer_Segment"]').parents('td').show();
						}
						else
						{
							$('span[id*="HTML_FieldLabel"]').parents('td').hide();
							$('input[aria-label="Percentage"]').parents('td').hide();
							$('span[id*="VF_Minimum_Commitment_Percentage"]').parents('td').hide();
							$('input[aria-label="Total Agreed Fleet Size"]').parents('td').hide();
							$('span[id*="VF_Total_Agreed_Fleet_Size"]').parents('td').hide();
							$('input[aria-label="Mobile Services Required"]').parents('td').hide();
							$('span[id*="VF_Minimum_Commitment_Mobile_Services_Required"]').parents('td').hide();
							$('input[aria-label="Pause Min Commitment"]').parents('td').hide();
							$('span[id*="VF_Pause_Minimum_Commitment"]').parents('td').hide();
							$('input[aria-label="Pause Date"]').parents('td').hide();
							$('span[id*="VF_Pause_Minimum_Commitment_Date"]').parents('td').hide();
							$('input[aria-label="Minimum Fee"]').parents('td').hide();
							$('span[id*="VF_Minimum_Fee"]').parents('td').hide();
							$('input[aria-label="Commitment Flag"]').parents('td').hide();
							$('span[id*="VF_Minimum_Commitment_Flag"]').parents('td').hide();
							$('input[aria-label="Nominated Billing Account Number"]').parents('td').hide();
							$('span[id*="VF_Nominated_Billing_Account_Number"]').parents('td').hide();
							$('input[aria-label="SF Account Number"]').parents('td').hide();
							$('span[id*="VF_Salesforce_Customer_Account_Number"]').parents('td').hide();
							$('input[aria-label="Co-Terminus Start Date"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_Start_Date"]').parents('td').hide();
							$('input[aria-label="Co-Terminus End Date"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_End_Date"]').parents('td').hide();
							$('input[aria-label="Co-Terminus Contract Length"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_Contract_Length"]').parents('td').hide();
							$('input[aria-label="Co-Terminus Flag"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_Flag"]').parents('td').hide();
							$('input[aria-label="Offer Segment"]').parents('td').hide();
							$('span[id*="VHA_EGW_Offer_Segment"]').parents('td').hide();						}
				}
				
				if(Mode == "New")
				{					
					if(cutomerType == 'Person' || customerSegment == 'Consumer' || customerSegment ==  undefined)
					{
						$('input[aria-label="Registered Company #"]').parents('td').parent('tr').hide();
						$('input[aria-label="Number of Employees"]').parents('td').parent('tr').hide();
						$('input[aria-label="Business Location"]').parents('td').parent('tr').hide();
						$('input[aria-label="Registered Company Name"]').parents('td').parent('tr').hide();
							$('input[aria-label="Number of Employees"]').parents('td').parent('tr').hide();
							$('input[aria-label="Dissolved"]').parents('td').parent('tr').hide();
							$('input[aria-label="Care"]').parents('td').parent('tr').hide();
							$('input[aria-label="Corporate Group"]').parents('td').parent('tr').hide();						
							$('button[data-display="Validate"]').parents('td').parent('tr').hide();
							//$('span[id*="Business_Name"]').parents('td').parent('tr').hide();
					}
					if(customerSegment == 'Business')
					{
						$('input[aria-label="Bill Segment"]').parents('td').parent('tr').hide();				
					}		
					if (busSubType == 'First') 
						{
							$('span[id*="HTML_FieldLabel"]').parents('td').show();
							$('input[aria-label="Percentage"]').parents('td').show();
							$('span[id*="VF_Minimum_Commitment_Percentage"]').parents('td').show();
							$('input[aria-label="Total Agreed Fleet Size"]').parents('td').show();
							$('span[id*="VF_Total_Agreed_Fleet_Size"]').parents('td').show();
							$('input[aria-label="Mobile Services Required"]').parents('td').show();
							$('span[id*="VF_Minimum_Commitment_Mobile_Services_Required"]').parents('td').show();
							$('input[aria-label="Pause Min Commitment"]').parents('td').show();
							$('span[id*="VF_Pause_Minimum_Commitment"]').parents('td').show();
							$('input[aria-label="Pause Date"]').parents('td').show();
							$('span[id*="VF_Pause_Minimum_Commitment_Date"]').parents('td').show();
							$('input[aria-label="Minimum Fee"]').parents('td').show();
							$('span[id*="VF_Minimum_Fee"]').parents('td').show();
							$('input[aria-label="Commitment Flag"]').parents('td').show();
							$('span[id*="VF_Minimum_Commitment_Flag"]').parents('td').show();
							$('input[aria-label="Nominated Billing Account Number"]').parents('td').show();
							$('span[id*="VF_Nominated_Billing_Account_Number"]').parents('td').show();
							$('input[aria-label="SF Account Number"]').parents('td').show();
							$('span[id*="VF_Salesforce_Customer_Account_Number"]').parents('td').show();
							$('input[aria-label="Co-Terminus Start Date"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_Start_Date"]').parents('td').show();
							$('input[aria-label="Co-Terminus End Date"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_End_Date"]').parents('td').show();
							$('input[aria-label="Co-Terminus Contract Length"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_Contract_Length"]').parents('td').show();
							$('input[aria-label="Co-Terminus Flag"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_Flag"]').parents('td').show();
							$('input[aria-label="Offer Segment"]').parents('td').show();
							$('span[id*="VHA_EGW_Offer_Segment"]').parents('td').show();
						}
						else
						{
							$('span[id*="HTML_FieldLabel"]').parents('td').hide();
							$('input[aria-label="Percentage"]').parents('td').hide();
							$('span[id*="VF_Minimum_Commitment_Percentage"]').parents('td').hide();
							$('input[aria-label="Total Agreed Fleet Size"]').parents('td').hide();
							$('span[id*="VF_Total_Agreed_Fleet_Size"]').parents('td').hide();
							$('input[aria-label="Mobile Services Required"]').parents('td').hide();
							$('span[id*="VF_Minimum_Commitment_Mobile_Services_Required"]').parents('td').hide();
							$('input[aria-label="Pause Min Commitment"]').parents('td').hide();
							$('span[id*="VF_Pause_Minimum_Commitment"]').parents('td').hide();
							$('input[aria-label="Pause Date"]').parents('td').hide();
							$('span[id*="VF_Pause_Minimum_Commitment_Date"]').parents('td').hide();
							$('input[aria-label="Minimum Fee"]').parents('td').hide();
							$('span[id*="VF_Minimum_Fee"]').parents('td').hide();
							$('input[aria-label="Commitment Flag"]').parents('td').hide();
							$('span[id*="VF_Minimum_Commitment_Flag"]').parents('td').hide();
							$('input[aria-label="Nominated Billing Account Number"]').parents('td').hide();
							$('span[id*="VF_Nominated_Billing_Account_Number"]').parents('td').hide();
							$('input[aria-label="SF Account Number"]').parents('td').hide();
							$('span[id*="VF_Salesforce_Customer_Account_Number"]').parents('td').hide();
							$('input[aria-label="Co-Terminus Start Date"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_Start_Date"]').parents('td').hide();
							$('input[aria-label="Co-Terminus End Date"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_End_Date"]').parents('td').hide();
							$('input[aria-label="Co-Terminus Contract Length"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_Contract_Length"]').parents('td').hide();
							$('input[aria-label="Co-Terminus Flag"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_Flag"]').parents('td').hide();
							$('input[aria-label="Offer Segment"]').parents('td').hide();
							$('span[id*="VHA_EGW_Offer_Segment"]').parents('td').hide();
						}
					
				}
				
				this.GetPM().AttachPMBinding("FieldChange", function(control, field_value){
			
				if(control.GetFieldName() == 'VF Customer Segment' || control.GetFieldName() == 'VF Customer Type')
					{
						if(field_value == 'Person' || field_value == 'Consumer')
						{
							$('input[aria-label="Registered Company #"]').parents('td').parent('tr').hide();
							$('input[aria-label="Number of Employees"]').parents('td').parent('tr').hide();
							$('input[aria-label="Registered Company Name"]').parents('td').parent('tr').hide();
							$('input[aria-label="Dissolved"]').parents('td').parent('tr').hide();
							$('input[aria-label="Care"]').parents('td').parent('tr').hide();
							$('input[aria-label="Corporate Group"]').parents('td').parent('tr').hide();
							$('button[data-display="Validate"]').parents('td').parent('tr').hide();
						}
						if(field_value == 'Business')
						{
							$('input[aria-label="Registered Company #"]').parents('td').parent('tr').show();
							$('input[aria-label="Registered Company Name"]').parents('td').parent('tr').show();
							$('input[aria-label="Number of Employees"]').parents('td').parent('tr').show();
							$('input[aria-label="Dissolved"]').parents('td').parent('tr').show();
							$('input[aria-label="Care"]').parents('td').parent('tr').show();
							$('input[aria-label="Corporate Group"]').parents('td').parent('tr').show();
							$('button[data-display="Validate"]').parents('td').parent('tr').show();
						}
					}
					if(control.GetFieldName() == 'VF EGW Business Sub Type')
					{
					if (field_value == 'First') 
						{
							$('span[id*="HTML_FieldLabel"]').parents('td').show();
							$('input[aria-label="Percentage"]').parents('td').show();
							$('span[id*="VF_Minimum_Commitment_Percentage"]').parents('td').show();
							$('input[aria-label="Total Agreed Fleet Size"]').parents('td').show();
							$('span[id*="VF_Total_Agreed_Fleet_Size"]').parents('td').show();
							$('input[aria-label="Mobile Services Required"]').parents('td').show();
							$('span[id*="VF_Minimum_Commitment_Mobile_Services_Required"]').parents('td').show();
							$('input[aria-label="Pause Min Commitment"]').parents('td').show();
							$('span[id*="VF_Pause_Minimum_Commitment"]').parents('td').show();
							$('input[aria-label="Pause Date"]').parents('td').show();
							$('span[id*="VF_Pause_Minimum_Commitment_Date"]').parents('td').show();
							$('input[aria-label="Minimum Fee"]').parents('td').show();
							$('span[id*="VF_Minimum_Fee"]').parents('td').show();
							$('input[aria-label="Commitment Flag"]').parents('td').show();
							$('span[id*="VF_Minimum_Commitment_Flag"]').parents('td').show();
							$('input[aria-label="Nominated Billing Account Number"]').parents('td').show();
							$('span[id*="VF_Nominated_Billing_Account_Number"]').parents('td').show();
							$('input[aria-label="SF Account Number"]').parents('td').show();
							$('span[id*="VF_Salesforce_Customer_Account_Number"]').parents('td').show();
							$('input[aria-label="Co-Terminus Start Date"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_Start_Date"]').parents('td').show();
							$('input[aria-label="Co-Terminus End Date"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_End_Date"]').parents('td').show();
							$('input[aria-label="Co-Terminus Contract Length"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_Contract_Length"]').parents('td').show();
							$('input[aria-label="Co-Terminus Flag"]').parents('td').show();
							$('span[id*="VF_Co-Terminus_Flag"]').parents('td').show();
							$('input[aria-label="Offer Segment"]').parents('td').show();
							$('span[id*="VHA_EGW_Offer_Segment"]').parents('td').show();
						}
						else
						{
							$('span[id*="HTML_FieldLabel"]').parents('td').hide();
							$('input[aria-label="Percentage"]').parents('td').hide();
							$('span[id*="VF_Minimum_Commitment_Percentage"]').parents('td').hide();
							$('input[aria-label="Total Agreed Fleet Size"]').parents('td').hide();
							$('span[id*="VF_Total_Agreed_Fleet_Size"]').parents('td').hide();
							$('input[aria-label="Mobile Services Required"]').parents('td').hide();
							$('span[id*="VF_Minimum_Commitment_Mobile_Services_Required"]').parents('td').hide();
							$('input[aria-label="Pause Min Commitment"]').parents('td').hide();
							$('span[id*="VF_Pause_Minimum_Commitment"]').parents('td').hide();
							$('input[aria-label="Pause Date"]').parents('td').hide();
							$('span[id*="VF_Pause_Minimum_Commitment_Date"]').parents('td').hide();
							$('input[aria-label="Minimum Fee"]').parents('td').hide();
							$('span[id*="VF_Minimum_Fee"]').parents('td').hide();
							$('input[aria-label="Commitment Flag"]').parents('td').hide();
							$('span[id*="VF_Minimum_Commitment_Flag"]').parents('td').hide();
							$('input[aria-label="Nominated Billing Account Number"]').parents('td').hide();
							$('span[id*="VF_Nominated_Billing_Account_Number"]').parents('td').hide();
							$('input[aria-label="SF Account Number"]').parents('td').hide();
							$('span[id*="VF_Salesforce_Customer_Account_Number"]').parents('td').hide();
							$('input[aria-label="Co-Terminus Start Date"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_Start_Date"]').parents('td').hide();
							$('input[aria-label="Co-Terminus End Date"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_End_Date"]').parents('td').hide();
							$('input[aria-label="Co-Terminus Contract Length"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_Contract_Length"]').parents('td').hide();
							$('input[aria-label="Co-Terminus Flag"]').parents('td').hide();
							$('span[id*="VF_Co-Terminus_Flag"]').parents('td').hide();
							$('input[aria-label="Offer Segment"]').parents('td').hide();
							$('span[id*="VHA_EGW_Offer_Segment"]').parents('td').hide();
						}
						}
				});

                }
                return VHAConnectionFormAppletPR;
            }
            ());
        return "SiebelAppFacade.VHAConnectionFormAppletPR";
    });
}