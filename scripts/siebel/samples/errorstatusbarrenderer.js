    SiebelJS.Namespace('SiebelAppFacade.ErrorObjectRenderer');

    define("siebel/errorstatusbarrenderer", ["siebel/basephyrenderer"], function () {
    SiebelAppFacade.ErrorObjectRenderer = (function () {
        var parentContainer;
        function ErrorObjectRenderer(pm) {
            SiebelAppFacade.ErrorObjectRenderer.superclass.constructor.call(this, pm);
        }

        SiebelJS.Extend(ErrorObjectRenderer, SiebelAppFacade.BasePR);


        ErrorObjectRenderer.prototype.ShowUI = function () {
            SiebelAppFacade.ErrorObjectRenderer.superclass.ShowUI.call(this);
            parentContainer = SiebelApp.S_App.IsRwd() ? "SiebAppContainer" : "_sweview";
            CreateStatusBar(this);
        };

        ErrorObjectRenderer.prototype.BindEvents = function (controls, forceStop) {
            SiebelAppFacade.ErrorObjectRenderer.superclass.BindEvents.call(this);

            $(".siebui-statusbar").bind("click", { ctx: this }, function (event) {
                $("#" + parentContainer + "_statusbar").hide();
            });
            $(".siebui-statusbar").keypress(function (evt) {
                var keycode = (evt.keyCode ? evt.keyCode : evt.which);
                if (keycode == $.ui.keyCode.ENTER) {
                    $("#" + parentContainer + "_statusbar").hide();
                }
            });

        };

        ErrorObjectRenderer.prototype.ShowError = function (errMsg) {
            if (errMsg) {
                $("#" + parentContainer + "_statusbar").text(errMsg + SiebelApp.S_App.LocaleObject.GetLocalString("IDS_STATUSBAR_CLOSE_INSTRUCTIONS")).show();
                $("#" + parentContainer + "_statusbar").focus();
            }
        };

        function CreateStatusBar() {
            var divErr;
              if ($("#" + parentContainer + "_statusbar").length === 0) {
                    divErr = "<div id = '" + parentContainer + "_statusbar' class ='siebui-statusbar' aria-live='polite' role='alert' tabindex='0'>" + "</div>";
                    if ($("#" + parentContainer).length !== 0) {
                        $("#" + parentContainer).append(divErr);
                }
            }
                $("#" + parentContainer + "_statusbar").hide();
        }
        return ErrorObjectRenderer;
    })();
        return SiebelAppFacade.ErrorObjectRenderer;
    });