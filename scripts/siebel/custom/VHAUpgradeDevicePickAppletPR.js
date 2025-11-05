if (typeof (SiebelAppFacade.VHAUpgradeDevicePickAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAUpgradeDevicePickAppletPR");
    define("siebel/custom/VHAUpgradeDevicePickAppletPR", ["siebel/jqgridrenderer"], function() {
        SiebelAppFacade.VHAUpgradeDevicePickAppletPR = (function() {
            function VHAUpgradeDevicePickAppletPR(pm) {
                SiebelAppFacade.VHAUpgradeDevicePickAppletPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VHAUpgradeDevicePickAppletPR, SiebelAppFacade.JQGridRenderer);
            VHAUpgradeDevicePickAppletPR.prototype.Init = function() {
                SiebelAppFacade.VHAUpgradeDevicePickAppletPR.superclass.Init.apply(this, arguments)
            }
            ;
            VHAUpgradeDevicePickAppletPR.prototype.ShowUI = function() {
                SiebelAppFacade.VHAUpgradeDevicePickAppletPR.superclass.ShowUI.apply(this, arguments);
                var that = this;
                setTimeout(function() {
                    var desiredWidth = 1000;
                    var newWidth = $(window).width() < desiredWidth ? $(window).width() : desiredWidth;
                    $("#" + that.GetPM().Get("GetPlaceholder")).closest("[name=popup]").dialog("option", "width", newWidth).resize();
                    if($(window).height() < 800){						
						$("#" + that.GetPM().Get("GetPlaceholder")).closest("[name=popup]").dialog("option", "height", "600");
						$("#" + that.GetPM().Get("GetPlaceholder")).closest('.ui-jqgrid-bdiv').css({"height":"350px", "overflow-y":"auto"});						
					}
                }, 0);
            }
            ;
            VHAUpgradeDevicePickAppletPR.prototype.BindData = function(bRefresh) {
                SiebelAppFacade.VHAUpgradeDevicePickAppletPR.superclass.BindData.apply(this, arguments)
            }
            ;
            VHAUpgradeDevicePickAppletPR.prototype.BindEvents = function() {
                SiebelAppFacade.VHAUpgradeDevicePickAppletPR.superclass.BindEvents.apply(this, arguments)
            }
            ;
            VHAUpgradeDevicePickAppletPR.prototype.EndLife = function() {
                SiebelAppFacade.VHAUpgradeDevicePickAppletPR.superclass.EndLife.apply(this, arguments)
            }
            ;
            return VHAUpgradeDevicePickAppletPR
        }());
        return "SiebelAppFacade.VHAUpgradeDevicePickAppletPR"
    })
}
;