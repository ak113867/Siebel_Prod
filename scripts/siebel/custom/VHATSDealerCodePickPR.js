if (typeof(SiebelAppFacade.VHATSDealerCodePickPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHATSDealerCodePickPR");
 define("siebel/custom/VHATSDealerCodePickPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.VHATSDealerCodePickPR = (function () {

    function VHATSDealerCodePickPR(pm) {
     SiebelAppFacade.VHATSDealerCodePickPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHATSDealerCodePickPR, SiebelAppFacade.JQGridRenderer);

    VHATSDealerCodePickPR.prototype.Init = function () {
     SiebelAppFacade.VHATSDealerCodePickPR.superclass.Init.apply(this, arguments);
    }

    VHATSDealerCodePickPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHATSDealerCodePickPR.superclass.ShowUI.apply(this, arguments);
		/*$("input[aria-labelledby='PopupQueryCombobox_Label']").parent().hide();
		$("button[aria-label='Sales Person:Query']").parent().hide();
		$("input[aria-labelledby='PopupQuerySrchspec_Label']").attr("style","height: 20px;width: 405px;");
		$("input[aria-labelledby='PopupQuerySrchspec_Label']").focus();*/
		
		var uQuery = "PopupQueryCombobox_Label_"+pm.Get("GetId");
		var uQuerySearchSpec = "PopupQuerySrchspec_Label_"+pm.Get("GetId");
		($('[aria-labelledby='+uQuery+']').parent().hide();
		$("button[aria-label='Sales Person:Query']").parent().hide();
		($('[aria-labelledby='+uQuerySearchSpec+']').attr("style","height: 20px;width: 405px;");
		($('[aria-labelledby='+uQuerySearchSpec+']').focus();
		$('button[title="Sales Person:Go"]').parent().next().attr("style","float: left!important");
    }

    VHATSDealerCodePickPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHATSDealerCodePickPR.superclass.BindData.apply(this, arguments);
    }

    VHATSDealerCodePickPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHATSDealerCodePickPR.superclass.BindEvents.apply(this, arguments);
    }

    VHATSDealerCodePickPR.prototype.EndLife = function () {
     SiebelAppFacade.VHATSDealerCodePickPR.superclass.EndLife.apply(this, arguments);
    }

    return VHATSDealerCodePickPR;
   }()
  );
  return "SiebelAppFacade.VHATSDealerCodePickPR";
 })
}