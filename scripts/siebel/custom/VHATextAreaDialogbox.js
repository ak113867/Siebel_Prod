if (typeof(SiebelAppFacade.VHATextAreaDialogbox) === "undefined") {
 
    SiebelJS.Namespace("SiebelAppFacade.VHATextAreaDialogbox");
    define("siebel/custom/VHATextAreaDialogbox", [],
        function () {
        SiebelAppFacade.VHATextAreaDialogbox = (function () {
 
            function VHATextAreaDialogbox(pm) {
                SiebelAppFacade.VHATextAreaDialogbox.superclass.constructor.apply(this, arguments);
            }
 
            SiebelJS.Extend(VHATextAreaDialogbox, SiebelAppFacade.FieldPW);
 
            VHATextAreaDialogbox.prototype.Init = function () {
                SiebelAppFacade.VHATextAreaDialogbox.superclass.Init.apply(this, arguments);
            }
 
            VHATextAreaDialogbox.prototype.ShowUI = function () {
                SiebelAppFacade.VHATextAreaDialogbox.superclass.ShowUI.apply(this, arguments);
                var sTitle = this;
                var sControl = this.GetEl();
 
                if (sControl && sControl.length) {
 
                    $(sControl).on("dblclick", function () {
 
                        var txt = $(this).val();
 
                        $("<div id='txtareaedit_div'><textarea id='txtareaedit_txt'/></div>").dialog({
                            title : sTitle.control.GetDisplayName(), // takes Displayed value for the control as configured
                            dialogClass : "no-close-x",
                            close : function () {
                                $(this).dialog("destroy");
                            },
                            open : function () {
                                $("#txtareaedit_txt").val(txt).css("height", $("#txtareaedit_div").height() + "px");
                            },
                            resize : function () {
                                $("#txtareaedit_txt").css("height", $("#txtareaedit_div").height() + "px");
                            },
                            modal : true, // ensure you cannot navigate within Siebel
                            minHeight : 400,
                            minWidth : 600,
                            buttons : [{
                                    text : "Save",
                                    click : function () {
                                        sTitle.OnControlEvent(consts.get("PHYEVENT_CONTROL_FOCUS"), sTitle.control);
                                        sTitle.OnControlEvent(consts.get("PHYEVENT_CONTROL_BLUR"), sTitle.control, $(this).find("#txtareaedit_txt").val());
                                        $(this).dialog("destroy");
                                    },
                                    'class' : 'siebui-ctrl-btn appletButton'
                                }, {
                                    text : "Cancel",
                                    click : function () {
                                        $(this).dialog("destroy");
                                    },
                                    'class' : 'siebui-ctrl-btn appletButton'
                                }
                            ]
                        })
                    })
                }
            }
 
            return VHATextAreaDialogbox;
        }
            ());
 
        SiebelApp.S_App.PluginBuilder.AttachPW(consts.get("SWE_CTRL_TEXTAREA"), SiebelAppFacade.VHATextAreaDialogbox, function (control, objName) {
            return true;
        });
 
        return "SiebelAppFacade.VHATextAreaDialogbox";
    })
}