if (typeof(SiebelAppFacade.VHAMSPElgbleMatrixListAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAMSPElgbleMatrixListAppletPR");
    define("siebel/custom/VHAMSPElgbleMatrixListAppletPR", ["siebel/jqgridrenderer"], function () {
        SiebelAppFacade.VHAMSPElgbleMatrixListAppletPR = (function () {
            function VHAMSPElgbleMatrixListAppletPR(pm) {
                SiebelAppFacade.VHAMSPElgbleMatrixListAppletPR.superclass.constructor.apply(this, arguments);
            }
            SiebelJS.Extend(VHAMSPElgbleMatrixListAppletPR, SiebelAppFacade.JQGridRenderer);
            VHAMSPElgbleMatrixListAppletPR.prototype.Init = function () {
                SiebelAppFacade.VHAMSPElgbleMatrixListAppletPR.superclass.Init.apply(this, arguments);
            }
            VHAMSPElgbleMatrixListAppletPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHAMSPElgbleMatrixListAppletPR.superclass.ShowUI.apply(this, arguments);
				var jqGrid = this.GetGrid();
				jqGrid.jqGrid("setGridParam", {
					shrinkToFit: true
				});
				jqGrid.jqGrid('setColProp', 'MSP_Sequence', {
					widthOrg: 50
				});
				jqGrid.jqGrid('setColProp', 'Order_Sequence', {
					widthOrg: 50
				});
				jqGrid.jqGrid('setColProp', 'Discount_Amount', {
					widthOrg: 50
				});
				jqGrid.jqGrid('setColProp', 'Status_Flag', {
					widthOrg: 45
				});
				jqGrid.jqGrid('setColProp', 'Type', {
					widthOrg: 45
				});
				jqGrid.jqGrid('setColProp', 'Plan_Id', {
					widthOrg: 50
				});
				jqGrid.jqGrid('setColProp', 'PlanProdName', {
					widthOrg: 105
				});
				jqGrid.jqGrid('setColProp', 'PlanSblProdType', {
					widthOrg: 50
				});
				//jqGrid.jqGrid('hideCol', "Order_Sequence");
				jqGrid.jqGrid('setGridWidth', 550);
            }
            VHAMSPElgbleMatrixListAppletPR.prototype.BindData = function (bRefresh) {
                SiebelAppFacade.VHAMSPElgbleMatrixListAppletPR.superclass.BindData.apply(this, arguments);
            }
            VHAMSPElgbleMatrixListAppletPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHAMSPElgbleMatrixListAppletPR.superclass.BindEvents.apply(this, arguments);
            }
            VHAMSPElgbleMatrixListAppletPR.prototype.EndLife = function () {
                SiebelAppFacade.VHAMSPElgbleMatrixListAppletPR.superclass.EndLife.apply(this, arguments);
            }
            return VHAMSPElgbleMatrixListAppletPR;
        }
            ());
        return "SiebelAppFacade.VHAMSPElgbleMatrixListAppletPR";
    })
}
