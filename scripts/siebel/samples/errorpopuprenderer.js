    SiebelJS.Namespace('SiebelAppFacade.ErrorObjectRenderer');

    define("siebel/errorpopuprenderer", ["siebel/basephyrenderer"], function () {
    SiebelAppFacade.ErrorObjectRenderer = (function () {

        function ErrorObjectRenderer(pm) {
            SiebelAppFacade.ErrorObjectRenderer.superclass.constructor.call(this, pm);
        }

        SiebelJS.Extend(ErrorObjectRenderer, SiebelAppFacade.BasePR);

        ErrorObjectRenderer.prototype.ShowUI = function () {
            SiebelAppFacade.ErrorObjectRenderer.superclass.ShowUI.call(this);
            CreateErrorPopup(this);
        };

        ErrorObjectRenderer.prototype.BindEvents = function (controls, forceStop) {
            SiebelAppFacade.ErrorObjectRenderer.superclass.BindEvents.call(this);
                        
            $("#_sweview_popup").dialog({
                beforeClose: function (event, ui) {
                    if ($("#_sweview_popup").data("InitDlg")) {
                        return false;
                    }
                    return true;
                },
                buttons: [{ id: "btn-accept",
                    text: "Ok",
                    click: function () { $(this).dialog("close"); }
                }]
            });
        };

        ErrorObjectRenderer.prototype.ShowError = function (errMsg) {
            if (errMsg) {
                $("#_sweview_popup").data("InitDlg", true);
                setTimeout(function () {
                    $("#_sweview_popup").removeData("InitDlg");
                }, 2);
                $("#_sweview_popup").text(errMsg).dialog("open");                
            }
        };

        function CreateErrorPopup(errMsg) {
            var divErr;
            var parentContainer = SiebelApp.S_App.IsRwd() ? SiebelApp.S_App.ViewTarget() : "_sweview";
            if ($("#_sweview_popup").length === 0) {
                divErr = "<div id = '_sweview_popup' aria-live='polite' role='alert'>" + "</div>";
                if ($("#" + parentContainer).length !== 0) {
                    $("#" + parentContainer).append(divErr);
                }
            }
            $("#_sweview_popup").dialog({
                autoOpen: false,
                modal: true
            });
        }

        return ErrorObjectRenderer;
    })();
        return SiebelAppFacade.ErrorObjectRenderer;
    });