//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopList&name=VF_Current_NBA_Offers_&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.VF_Current_NBA_Offers_PR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.VF_Current_NBA_Offers_PR");
    define("siebel/custom/VF_Current_NBA_Offers_PR", ["siebel/jqgridrenderer"],
        function() {
            SiebelAppFacade.VF_Current_NBA_Offers_PR = (function() {

                function VF_Current_NBA_Offers_PR(pm) {
                    SiebelAppFacade.VF_Current_NBA_Offers_PR.superclass.constructor.apply(this, arguments);

                    this.GetPM().AttachPostProxyExecuteBinding("mRetrieve", VHANBAOfferDisplay, {
                        scope: this,
                        sequence: false
                    });

                }

                SiebelJS.Extend(VF_Current_NBA_Offers_PR, SiebelAppFacade.JQGridRenderer);

                VF_Current_NBA_Offers_PR.prototype.Init = function() {
                    SiebelAppFacade.VF_Current_NBA_Offers_PR.superclass.Init.apply(this, arguments);
                }

                VF_Current_NBA_Offers_PR.prototype.ShowUI = function() {
					 pm1 = this.GetPM();
                    SiebelAppFacade.VF_Current_NBA_Offers_PR.superclass.ShowUI.apply(this, arguments);
                    setTimeout(function() {
                        VHANBAOfferDisplay(pm1);
                    }, 1);
                }

                VF_Current_NBA_Offers_PR.prototype.BindData = function(bRefresh) {
                    SiebelAppFacade.VF_Current_NBA_Offers_PR.superclass.BindData.apply(this, arguments);
                }

                VF_Current_NBA_Offers_PR.prototype.BindEvents = function() {
                    SiebelAppFacade.VF_Current_NBA_Offers_PR.superclass.BindEvents.apply(this, arguments);
                }

                VF_Current_NBA_Offers_PR.prototype.EndLife = function() {
                    SiebelAppFacade.VF_Current_NBA_Offers_PR.superclass.EndLife.apply(this, arguments);
                }

                function VHANBAOfferDisplay(pm) {

					var sAIN = SiebelApp.S_App.GetActiveView().GetActiveApplet().GetId();
                    var view = SiebelApp.S_App.GetActiveView().GetName();
                    if (view == "VF Asset Summary View - with extra IN fields") {
                        $('[aria-labelledby="VHA_NBA_Offers_Text_Label_'+sAIN+'"]').addClass("VFDisplayNone").parent().parent().prev().hide(); //SURESHA Upgrade 22.7
						//var Controls = pm1.Get("GetControls");
						//var sName = Controls["VHA NBA Offers Text"].GetInputName();
						//$("input[name='" + sName + "']").addClass("VFDisplayNone").parent().parent().prev().hide();

                        if (SiebelApp.S_App.GetProfileAttr("NBAOfferRetrieved") == "TRUE") {
                            if ($('#NBA_Offers_Text').length != 1) {
                                $('[aria-labelledby="VHA_NBA_Offers_Text_Label_'+sAIN+'"]').addClass("VFDisplayNone").parent().append('<div id="NBA_Offers_Text" style="font-weight: bold;font-size: 20px;color: #E60000;width: 300px;"><b>NBA offer available, see below ↓</b></div>');  //SURESHA Upgrade 22.7
								// $("input[name='" + sName + "']").addClass("VFDisplayNone").parent().append('<div id="NBA_Offers_Text" style="font-weight: bold;font-size: 20px;color: #E60000;width: 300px;"><b>NBA offer available, see below ↓</b></div>');
                            }
                        } else {

                        }
                    }
                    if (view == "VF Sales Home Page View") {
                        $('[aria-labelledby="NBASaleHome_Label_'+sAIN+'"]').addClass("VFDisplayNone").parent().parent().prev().hide(); //SURESHA Upgrade 22.7
						//var Controls = pm1.Get("GetControls");
						//var sName = Controls["NBASaleHome"].GetInputName();
						//$("input[name='" + sName + "']").addClass("VFDisplayNone").parent().parent().prev().hide();

                        if (SiebelApp.S_App.GetProfileAttr("NBAOfferRetrieved") == "TRUE") {
                            if ($('#NBA_Offers_Text').length != 1) {
                                $('[aria-labelledby="NBASaleHome_Label_'+sAIN+'"]').addClass("VFDisplayNone").parent().append('<div id="NBA_Offers_Text" style="font-weight: bold;font-size: 20px;color: #E60000;width: 300px;"><b>NBA offer available, see below ↓</b></div>');
								// $("input[name='" + sName + "']").addClass("VFDisplayNone").parent().append('<div id="NBA_Offers_Text" style="font-weight: bold;font-size: 20px;color: #E60000;width: 300px;"><b>NBA offer available, see below ↓</b></div>');
                            }
                        } else {

                        }
                    }

                }
                return VF_Current_NBA_Offers_PR;
            }());
            return "SiebelAppFacade.VF_Current_NBA_Offers_PR";
        })
}