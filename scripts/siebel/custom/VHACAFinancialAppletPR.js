if(typeof(SiebelAppFacade.VHACAFinancialAppletPR) === "undefined") {
SiebelJS.Namespace("SiebelAppFacade.VHACAFinancialAppletPR");
define("siebel/custom/VHACAFinancialAppletPR", ["order!siebel/phyrenderer"], function () {
SiebelAppFacade.VHACAFinancialAppletPR = (function () {
function VHACAFinancialAppletPR(pm) {
SiebelAppFacade.VHACAFinancialAppletPR.superclass.constructor.call(this, pm);
}
SiebelJS.Extend(VHACAFinancialAppletPR, SiebelAppFacade.PhysicalRenderer);
VHACAFinancialAppletPR.prototype.ShowUI = function () {
SiebelAppFacade.VHACAFinancialAppletPR.superclass.ShowUI.call(this);
  var s;
	var btn_grp = $("#" + this.GetPM().Get("GetFullId")).find(".siebui-btn-grp-applet");
	s = btn_grp.find(".siebui-ctrl-btn");
	s.each(function() {
		btn_grp.before($(this));
	});
	var sAppltName=this.GetPM().Get("GetName");
	var sAppltId="s_" + this.GetPM().Get("GetFullId") + "_div";
	VHAAppUtilities.ShowToolTip(sAppltName,sAppltId);
}
return VHACAFinancialAppletPR;
}
());
return "SiebelAppFacade.VHACAFinancialAppletPR";
});
}