if (typeof(SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUIDebitPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUIDebitPR");
    define("siebel/custom/VFComInvoiceProfileToggleFormAppletTBUIDebitPR", ["siebel/phyrenderer"],
        function() {
            SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUIDebitPR = (function() {

                    function VFComInvoiceProfileToggleFormAppletTBUIDebitPR(pm) {
                        SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUIDebitPR.superclass.constructor.apply(this, arguments);
                    }

                    SiebelJS.Extend(VFComInvoiceProfileToggleFormAppletTBUIDebitPR, SiebelAppFacade.PhysicalRenderer);

                    VFComInvoiceProfileToggleFormAppletTBUIDebitPR.prototype.Init = function() {
                        SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUIDebitPR.superclass.Init.apply(this, arguments);
                        //this.GetPM().AttachPMBinding("FieldChange", VFPPOUIFieldChange);
                        //this.GetPM().AttachPMBinding("RefreshData", function (value) {
                        //console.log("RefreshData" + value);
                        //});
                    }

                    VFComInvoiceProfileToggleFormAppletTBUIDebitPR.prototype.ShowUI = function() {
                        SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUIDebitPR.superclass.ShowUI.apply(this, arguments);
                        var AppName = this.GetPM().Get("GetName");
                        $('[aria-label="Edit Account #"]').addClass("siebui-icon-editrecord"); //for debit applet - mani

                        setTimeout(function() {

                            if (AppName == "VHA Com Invoice Profile Toggle Form Applet TBUI Other") {
                                $('#HTML_Label7_Label').closest('table').attr("style", "margin-left: 25px; !important");
                                return;
                            }
                            $("#HTML_Label1_Label").closest('.GridBack').parent().prepend("<br/><img src='images/custom/get_info.png' ALIGN=ABSMIDDLE /> Alls new Vodafone customers direct debit is the default billing option for at least 3 months i.e. 'Payment Type' of 'Other' cannot be selected.");


                        }, 50);
                    }
                    return VFComInvoiceProfileToggleFormAppletTBUIDebitPR;
                }
                ());
            return "SiebelAppFacade.VFComInvoiceProfileToggleFormAppletTBUIDebitPR";
        })
}