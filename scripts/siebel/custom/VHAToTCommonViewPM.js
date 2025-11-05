if (typeof(SiebelAppFacade.VHAToTCommonViewPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAToTCommonViewPM");
 define("siebel/custom/VHAToTCommonViewPM", ["siebel/viewpm"],
  function () {
	var app = "";var ref = "";var bsArr = [];
   SiebelAppFacade.VHAToTCommonViewPM = (function () {

    function VHAToTCommonViewPM(pm) {
     SiebelAppFacade.VHAToTCommonViewPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAToTCommonViewPM, SiebelAppFacade.ViewPM);

    VHAToTCommonViewPM.prototype.Init = function () {
     SiebelAppFacade.VHAToTCommonViewPM.superclass.Init.apply(this, arguments);
	 app = SiebelApp.S_App;
	 ref = this;
	 ref.SetProperty("bsOutput", "");
	 ref.AttachEventHandler("GET_OLDPLANDTLS_EVT",getOldPlanDtl);
	 ref.AttachEventHandler("GET_NEWPLANDTLS_EVT",getNewPlanDtl);
	 ref.AttachEventHandler("GET_CUSTDTLS_EVT",getCustDtl);
	 ref.AttachEventHandler("GET_CREDITCHK_EVT",getCreditChkStatus);
	 ref.AttachEventHandler("UPSERT_CUSTDTLS_EVT",updateCustDetails);
	 ref.AttachEventHandler("SET_ADDTOCART_EVT",setAddToCartDtl);
	 //ref.AttachEventHandler("CREATE_ORDER_EVT",mCreateOrder);
	 ref.AttachEventHandler("VHA_SUBMIT_ORDER",mSubmitOrder);
	 ref.AttachEventHandler("GET_PREPAY_PLAN",mGetPrepayPlans);
	 ref.AttachEventHandler("VHA_PREPAY_CREATE_ORDER", mPrepayCreateOrder);
	 ref.AttachEventHandler("APPLY_PROMO_CART",mApplyPromocode);
	 ref.AttachEventHandler("GET_PREPAY_PRODS",mGetPrepayProds);//ss103269: TOT Prepay Dynamic Commercial Offers Display
    }

    VHAToTCommonViewPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.VHAToTCommonViewPM.superclass.Setup.apply(this, arguments);
    }
	function getCustDtl(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "GET_CUSTDTLS_EVT");
	}
	function getCreditChkStatus(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "GET_CREDITCHK_EVT");
	}
	function getOldPlanDtl(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "GET_OLDPLANDTLS_EVT");
	}
	function getNewPlanDtl(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "GET_NEWPLANDTLS_EVT");
	}
	function updateCustDetails(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "UPSERT_CUSTDTLS_EVT");
	}
	function setAddToCartDtl(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "SET_ADDTOCART_EVT");
	}
    /*function mCreateOrder(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "CREATE_ORDER_EVT");
	}*/
	function mSubmitOrder(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "VHA_SUBMIT_ORDER");
	}
	function mGetPrepayPlans(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "GET_PREPAY_PLAN");
	}
	function mPrepayCreateOrder(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "VHA_PREPAY_CREATE_ORDER");
	}
	function mApplyPromocode(inps){
		callServer("VF BS Process Manager", "Run Process", inps, "APPLY_PROMO_CART");
	}
	function mGetPrepayProds(inps){
		callServer("Workflow Process Manager", "RunProcess", inps, "GET_PREPAY_PRODS");
	}//ss103269: TOT Prepay Dynamic Commercial Offers Display
	function callServer(bsName, method, inps, evt){
		if(!(bsArr[bsName])){bsArr[bsName] = app.GetService(bsName);}
		var o = app.NewPropertySet();
		var service = bsArr[bsName];
		var inp =  getPropSet(inps);
		o = service.InvokeMethod(method, inp);
		ref.SetProperty('bsOutput',{'bsoutput': o,'evt': evt});
	}
	function getPropSet(inp){
		var tmp = app.NewPropertySet();
		for(key in inp){
			if(Array.isArray(inp[key])){
				var o = inp[key];
				var tmp1 = app.NewPropertySet();
				tmp1.type = key;
				for(var i=0; i<o.length; i++){
					tmp1.AddChild(getPS(o[i]));
				}
				tmp.AddChild(tmp1);
			}else if(typeof inp[key] == "object"){
				tmp.AddChild(getPS(inp[key]));
			}else{
				tmp.SetProperty(key, inp[key]);
			}
		}
		return tmp;
	}
    return VHAToTCommonViewPM;
   }()
  );
  return "SiebelAppFacade.VHAToTCommonViewPM";
 })
}