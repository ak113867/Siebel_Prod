if (typeof (SiebelAppFacade.VHATSUpgradeViewPM) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHATSUpgradeViewPM");
    define("siebel/custom/VHATSUpgradeViewPM", ["siebel/viewpm"],
        function () {
            var app = ""; var ref = ""; var bsArr = [];
            SiebelAppFacade.VHATSUpgradeViewPM = (function () {

                function VHATSUpgradeViewPM(pm) {
                    SiebelAppFacade.VHATSUpgradeViewPM.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(VHATSUpgradeViewPM, SiebelAppFacade.ViewPM);

                VHATSUpgradeViewPM.prototype.Init = function () {
                    SiebelAppFacade.VHATSUpgradeViewPM.superclass.Init.apply(this, arguments);
                    app = SiebelApp.S_App;
                    ref = this;
                    ref.SetProperty("bsOutput", "");
                    ref.AttachEventHandler("GET_CUSTDTLS_EVT", getCustDtl);
					ref.AttachEventHandler("GET_EXT_CHARGEOUT", getExtCont);
					ref.AttachEventHandler("VHA_SUBMIT_ORDER", mSubmitOrder);
					ref.AttachEventHandler("GET_PAYURL_EVT", getPaymentURL);
					ref.AttachEventHandler("VHA_PAUSE_ORDER", pauseOrder);
					ref.AttachEventHandler("VHA_RESUME_ORDER", resumeOrder);
					ref.AttachEventHandler("VHA_PICK_INS", getInsurancePickDtls);
                }

                VHATSUpgradeViewPM.prototype.Setup = function (propSet) {
                    SiebelAppFacade.VHATSUpgradeViewPM.superclass.Setup.apply(this, arguments);
                }
				function getInsurancePickDtls(inps) {
                    callServer("Workflow Process Manager", "RunProcess", inps, "PICK_INS");
                }
				function resumeOrder(inps) {
                    callServer("VHA Test Clob Data", "mGetClobData", inps, "RESUMEORDER");
                }
				function pauseOrder(inps) {
                    callServer("Workflow Process Manager", "RunProcess", inps, "VHA_PAUSE_ORDER");
                }
				function getPaymentURL(inps) {
                    callServer("Workflow Process Manager", "RunProcess", inps, "PAYMENT_URL");
                }
                function getCustDtl(inps) {
                    callServer("Workflow Process Manager", "RunProcess", inps, "GET_CUSTDTLS_EVT");
                }
				function getExtCont(inps) {
                    callServer("Workflow Process Manager", "RunProcess", inps, "GET_EXT_CHARGEOUT");
                }	
				function mSubmitOrder(inps) {
                    callServer("Workflow Process Manager", "RunProcess", inps, "VHA_SUBMIT_ORDER");
                }				
                function callServer(bsName, method, inps, evt) {
                    if (!(bsArr[bsName])) { bsArr[bsName] = app.GetService(bsName); }
                    var o = app.NewPropertySet();
                    var service = bsArr[bsName];
                    var inp = getPropSet(inps);
                    o = service.InvokeMethod(method, inp);
                    ref.SetProperty('bsOutput', { 'bsoutput': o, 'evt': evt });
                }
                function getPropSet(inp) {
                    var tmp = app.NewPropertySet();
                    for (key in inp) {
                        if (Array.isArray(inp[key])) {
                            var o = inp[key];
                            var tmp1 = app.NewPropertySet();
                            tmp1.type = key;
                            for (var i = 0; i < o.length; i++) {
                                tmp1.AddChild(getPS(o[i]));
                            }
                            tmp.AddChild(tmp1);
                        } else if (typeof inp[key] == "object") {
                            tmp.AddChild(getPS(inp[key]));
                        } else {
                            tmp.SetProperty(key, inp[key]);
                        }
                    }
                    return tmp;
                }
                return VHATSUpgradeViewPM;
            }()
            );
            return "SiebelAppFacade.VHATSUpgradeViewPM";
        })
}