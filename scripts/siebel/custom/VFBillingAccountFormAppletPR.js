if (typeof(SiebelAppFacade.VFBillingAccountFormAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFBillingAccountFormAppletPR");
    define("siebel/custom/VFBillingAccountFormAppletPR", ["order!siebel/phyrenderer", "order!siebel/custom/VHAAppUtilities"],
        function() {
            SiebelAppFacade.VFBillingAccountFormAppletPR = (function() {
                    var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");

                    function VFBillingAccountFormAppletPR(pm) {
                        SiebelAppFacade.VFBillingAccountFormAppletPR.superclass.constructor.call(this, pm);
                    }
                    SiebelJS.Extend(VFBillingAccountFormAppletPR, SiebelAppFacade.PhysicalRenderer);
                    VFBillingAccountFormAppletPR.prototype.ShowUI = function() {
                        SiebelAppFacade.VFBillingAccountFormAppletPR.superclass.ShowUI.call(this);
                        var pm = this.GetPM();
                        var Controls = pm.Get("GetControls");
                        var Control = Controls["ParentAccountName"].GetInputName();
                        var id = "#" + Control + "_icon";
                        var Accstatusctrl = Controls["AccountStatus"].GetInputName();
						var AppletFullId = pm.Get("GetFullId");
						var recordSet = pm.Get("GetRecordSet");
						var recLen = recordSet.length;
						if(recLen){
							recordSet = recordSet[0];
							var data = {
								ParentRef: recordSet["Id"],
								Type: "BA"							
							};
							VHASmartAgentPopup.AppendCreateActivityButton("#" + AppletFullId + " .AppletButtons.siebui-applet-buttons", data);
						}

                        var Mode = SiebelApp.S_App.GetActiveView().GetApplet(pm.Get("GetName")).GetMode();

                        setTimeout(function() {
                            $('[aria-label="Automatic Debit Form Applet:Edit Account #"]').addClass("siebui-icon-editrecord"); //for debit CUT applet - mani
                            $('[aria-label="Billing Profile Form Applet:Edit Email Address"]').addClass("siebui-icon-editrecord"); //for edit email address - mani
                            /*reset counter alignment - mani*/
                            $('[aria-label="Billing Account Form Applet:Reset Counter"]>span').hide();
                            //$('[aria-label="Customer Account"]').removeClass("siebui-ctrl-input"); //Madhu;21Aug19;commented
                            //$('[aria-label="Parent Account"]').removeClass("siebui-input-popup"); //Madhu;21Aug19;Toremovebackground
                            if (Mode == "Base" || Mode == "Edit") {

                                /*$('[aria-labelledby="AccountStatus_Label"]').siblings("span").removeClass("siebui-icon-dropdown");
								$('[aria-labelledby="AccountStatus_Label"]').removeClass("siebui-ctrl-select");
								$('[aria-labelledby="AccountStatus_Label"]').removeClass("siebui-input-popup");
								$('[aria-labelledby="AccountStatus_Label"]').addClass("RemoveBorder");*/ 
								/*TULASIY:15Sept2022::Added as per 22.7 upgrade issues*/
								$("input[name='" + Accstatusctrl + "']").siblings("span").removeClass("siebui-icon-dropdown");
                                $("input[name='" + Accstatusctrl + "']").removeClass("siebui-ctrl-select");
								$("input[name='" + Accstatusctrl + "']").removeClass("siebui-input-popup");
                                $("input[name='" + Accstatusctrl + "']").addClass("RemoveBorder");

                                if ($("input[name='" + Accstatusctrl + "']").val() == "Active") {

                                    /*Mani- SIT Sanity Defects*/
                                    /*$('[aria-labelledby="AccountStatus_Label"]').parent().prepend('<span class="dot_Class_Active"></span>');
                                    $('[aria-labelledby="AccountStatus_Label"]').addClass("siebui-value Class_Active AccountStatusLabel");*/
									/*TULASIY:15Sept2022::Added as per 22.7 upgrade issues*/
									$("input[name='" + Accstatusctrl + "']").parent().prepend('<span class="dot_Class_Active"></span>');
									$("input[name='" + Accstatusctrl + "']").addClass("siebui-value Class_Active AccountStatusLabel");
                                }


                                if ($("input[name='" + Accstatusctrl + "']").val() == "Inactive") {

                                    /*Mani- SIT Sanity Defects*/
                                    /*$('[aria-labelledby="AccountStatus_Label"]').parent().prepend('<span class="dot_Class_Inactive"></span>');
                                    $('[aria-labelledby="AccountStatus_Label"]').addClass("siebui-value Class_Inactive");*/
									/*TULASIY:15Sept2022::Added as per 22.7 upgrade issues*/
									$("input[name='" + Accstatusctrl + "']").parent().prepend('<span class="dot_Class_Inactive"></span>');
									$("input[name='" + Accstatusctrl + "']").addClass("siebui-value Class_Inactive");
                                }
                            }

                            //$(id).remove(); //Madhu;21Aug19;Commented

                            /*Mani- SIT Defects*/
                            var user = SiebelApp.S_App.GetProfileAttr("VHA User Type");
                            var SearchString = "[List Of Values.Type]='VHA_USER_TYPE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='Retail'";
                            var sLovFlg = VHAAppUtilities.GetPickListValues("", SearchString);

                            if (user == sLovFlg) {
                                $('[aria-label="Billing Account Form Applet:Send TXT"]').hide();
                            }
                            /*Mani- SIT Defects*/

                        }, 5);
                        var sAppltName = this.GetPM().Get("GetName");
                        var sAppltId = "s_" + this.GetPM().Get("GetFullId") + "_div";
                        VHAAppUtilities.ShowToolTip(sAppltName, sAppltId);
                    }
                    return VFBillingAccountFormAppletPR;
                }
                ());
            return "SiebelAppFacade.VFBillingAccountFormAppletPR";
        });
}