if (typeof(SiebelAppFacade.VHACustomerDashboardViewPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHACustomerDashboardViewPM");
 define("siebel/custom/VHACustomerDashboardViewPM", ["siebel/viewpm"],
  function () {
   SiebelAppFacade.VHACustomerDashboardViewPM = (function () {

    function VHACustomerDashboardViewPM(pm) {
     SiebelAppFacade.VHACustomerDashboardViewPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHACustomerDashboardViewPM, SiebelAppFacade.ViewPM);

    VHACustomerDashboardViewPM.prototype.Init = function () {
     SiebelAppFacade.VHACustomerDashboardViewPM.superclass.Init.apply(this, arguments);
    }

    VHACustomerDashboardViewPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.VHACustomerDashboardViewPM.superclass.Setup.apply(this, arguments);
    }

    return VHACustomerDashboardViewPM;
   }()
  );
  return "SiebelAppFacade.VHACustomerDashboardViewPM";
 })
}
