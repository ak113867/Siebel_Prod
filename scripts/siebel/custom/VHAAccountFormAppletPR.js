if (typeof(SiebelAppFacade.VHAAccountFormAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAAccountFormAppletPR");
    define("siebel/custom/VHAAccountFormAppletPR", ["order!siebel/phyrenderer", "order!siebel/custom/VHAToolTipCommon"], function() {
        SiebelAppFacade.VHAAccountFormAppletPR = (function() {
                function VHAAccountFormAppletPR(pm) {
                    SiebelAppFacade.VHAAccountFormAppletPR.superclass.constructor.call(this, pm);
                }
                SiebelJS.Extend(VHAAccountFormAppletPR, SiebelAppFacade.PhysicalRenderer);
                VHAAccountFormAppletPR.prototype.ShowUI = function() {
					
					
                    SiebelAppFacade.VHAAccountFormAppletPR.superclass.ShowUI.call(this);

		var prrole = SiebelApp.S_App.GetProfileAttr("VHA Role Name");
		var RoleRespFnd="";

		try
		{
			RoleRespFnd = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_CUSTID_ROLE_RESP' AND [List Of Values.Name]= '" + prrole + "' AND [List Of Values.Active]='Y'", {
                    "All": "true"
                })[0].Description;
		}

		catch (e$0) 
		{
			RoleRespFnd="";
		}

		if (RoleRespFnd == null || RoleRespFnd =="") 
		{

			$( "#Id_Reference_Number_Label" ).parent().hide();
			//$('[aria-labelledby="Id_Reference_Number_Label"]').parent().hide(); //SURESHA Upgrade 22.7
			$('[name='+this.GetPM().Get("GetControls")["Id Reference Number"].GetInputName()+']').parent().hide();
			$("#Id_Reference_Number_Label_" + this.GetPM().Get("GetId")).hide();			

		}

			 
		if (RoleRespFnd != null && RoleRespFnd !="")
		{

			$( "#Id_Reference_Number_Calc_Label" ).parent().hide();
			//$('[aria-labelledby="Id_Reference_Number_Calc_Label"]').parent().hide();
			$('[name='+this.GetPM().Get("GetControls")["Id Reference Number Calc"].GetInputName()+']').parent().hide();
			$("#Id_Reference_Number_Label_" + this.GetPM().Get("GetId")).hide();
			} 

                    var pm = this.GetPM();
                    var controls = pm.Get("GetControls");
                    var Accstatusctrl = controls["AccountStatus"].GetInputName();

                    var Mode = SiebelApp.S_App.GetActiveView().GetApplet(pm.Get("GetName")).GetMode();
					var AppletFullId = pm.Get("GetFullId");
					var recordSet = pm.Get("GetRecordSet");
					var recLen = recordSet.length;
					if(recLen){
						recordSet = recordSet[0];
						var data = {
							ParentRef: recordSet["Id"],
							Type: "CA",
							RefValue: recordSet["Name"]
						};
						VHASmartAgentPopup.AppendCreateActivityButton("#" + AppletFullId + " .siebui-applet-header.AppletButtons.siebui-form-applet-header", data);
					}
                    setTimeout(function() {

                        if (Mode == "Base" || Mode == "Edit") {

var sAIN = SiebelApp.S_App.GetActiveView().GetActiveApplet().GetId();
                            $('[aria-labelledby="AccountStatus_Label_'+sAIN+'"]').siblings("span").removeClass("siebui-icon-dropdown"); 
							//$('[name='+this.GetPM().Get("GetControls")["AccountStatus"].GetInputName()+']').siblings("span").removeClass("siebui-icon-dropdown");
                            $('[aria-labelledby="AccountStatus_Label_'+sAIN+'"]').removeClass("siebui-ctrl-select");  
							//$('[name='+this.GetPM().Get("GetControls")["AccountStatus"].GetInputName()+']').removeClass("siebui-ctrl-select");
                            $('[aria-labelledby="AccountStatus_Label_'+sAIN+'"]').removeClass("siebui-input-popup"); 
							//$('[name='+this.GetPM().Get("GetControls")["AccountStatus"].GetInputName()+']').removeClass("siebui-input-popup");
                            $('[aria-labelledby="AccountStatus_Label_'+sAIN+'"]').addClass("RemoveBorder"); 
							//$('[name='+this.GetPM().Get("GetControls")["AccountStatus"].GetInputName()+']').addClass("RemoveBorder");

                            if ($("input[name='" + Accstatusctrl + "']").val() == "Active") {

                                /*Mani- SIT Sanity Defects*/
                                $('[aria-labelledby="AccountStatus_Label_'+sAIN+'"]').parent().prepend('<span class="dot_Class_Active"></span>');  
								//$('[name='+this.GetPM().Get("GetControls")["AccountStatus"].GetInputName()+']').parent().prepend('<span class="dot_Class_Active"></span>');
                                $('[aria-labelledby="AccountStatus_Label_'+sAIN+'"]').addClass("siebui-value Class_Active AccountStatusLabel"); 
								//$('[name='+this.GetPM().Get("GetControls")["AccountStatus"].GetInputName()+']').addClass("siebui-value Class_Active AccountStatusLabel");
                            }


                            if ($("input[name='" + Accstatusctrl + "']").val() == "Inactive") {

                                /*Mani- SIT Sanity Defects*/
                                $('[aria-labelledby="AccountStatus_Label_'+sAIN+'"]').parent().prepend('<span class="dot_Class_Inactive"></span>'); 
								//$('[name='+this.GetPM().Get("GetControls")["AccountStatus"].GetInputName()+']').parent().prepend('<span class="dot_Class_Inactive"></span>');
                                $('[aria-labelledby="AccountStatus_Label_'+sAIN+'"]').addClass("siebui-value Class_Inactive AccountStatusLabel"); 
								//$('[name='+this.GetPM().Get("GetControls")["AccountStatus"].GetInputName()+']').addClass("siebui-value Class_Inactive AccountStatusLabel");
                            }
                        }

                        /*Mani- SIT Defects*/
                        var user = SiebelApp.S_App.GetProfileAttr("VHA User Type");
                        var SearchString = "[List Of Values.Type]='VHA_USER_TYPE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='Retail'";
                        var sLovFlg = VHAAppUtilities.GetPickListValues("", SearchString);

                        if (user == sLovFlg) {
                            $('[aria-label="Account:Send TXT"]').hide();
                        }
                        /*Mani- SIT Defects*/
                    }, 5);

                    var sAppltName = this.GetPM().Get("GetName");
                    var sAppltId = "s_" + this.GetPM().Get("GetFullId") + "_div";
                    VHAAppUtilities.ShowToolTip(sAppltName, sAppltId);
                    $('#Customer_Profile_Label').parent().addClass("VHAUnderlinereduce");
                }
                return VHAAccountFormAppletPR;
            }
            ());
        return "SiebelAppFacade.VHAAccountFormAppletPR";
    });
}