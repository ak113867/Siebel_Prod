if (typeof(SiebelAppFacade.VHAMultiServicePropListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAMultiServicePropListAppletPR");
 define("siebel/custom/VHAMultiServicePropListAppletPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.VHAMultiServicePropListAppletPR = (function () {

    function VHAMultiServicePropListAppletPR(pm) {
     SiebelAppFacade.VHAMultiServicePropListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAMultiServicePropListAppletPR, SiebelAppFacade.JQGridRenderer);

    VHAMultiServicePropListAppletPR.prototype.Init = function () {
     SiebelAppFacade.VHAMultiServicePropListAppletPR.superclass.Init.apply(this, arguments);
    }

    VHAMultiServicePropListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHAMultiServicePropListAppletPR.superclass.ShowUI.apply(this, arguments);
		var jqGrid = this.GetGrid();
		jqGrid.jqGrid("setGridParam",{
			shrinkToFit: true
		});
		jqGrid.jqGrid('setColProp','MSISDN',{
			widthOrg: 50
		});
		jqGrid.jqGrid('setColProp','RankSequence',{
			widthOrg: 40
		});
		jqGrid.jqGrid('setColProp','PrimaryFlag',{
			widthOrg: 70
		});
		jqGrid.jqGrid('setColProp','DiscountName',{
			widthOrg: 70
		});
		jqGrid.jqGrid('setColProp','MSPEligibilityFlag',{
			widthOrg: 50
		});
		jqGrid.jqGrid('setColProp','DiscountValueIncofGST',{
			widthOrg: 110
		});
		jqGrid.jqGrid('setColProp','DateApplied',{
			widthOrg: 80
		});
		jqGrid.jqGrid('setColProp','PlanName',{
			widthOrg: 130
		});
		jqGrid.jqGrid('setGridWidth',800);
		
    }

    VHAMultiServicePropListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHAMultiServicePropListAppletPR.superclass.BindData.apply(this, arguments);
    }

    VHAMultiServicePropListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHAMultiServicePropListAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    VHAMultiServicePropListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.VHAMultiServicePropListAppletPR.superclass.EndLife.apply(this, arguments);
    }

    return VHAMultiServicePropListAppletPR;
   }()
  );
  return "SiebelAppFacade.VHAMultiServicePropListAppletPR";
 })
}
