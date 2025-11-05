if (typeof(SiebelAppFacade.VFUNISIMCreditCardRechargeAppletTBUIPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFUNISIMCreditCardRechargeAppletTBUIPR");
    define("siebel/custom/VFUNISIMCreditCardRechargeAppletTBUIPR", ["siebel/jqgridrenderer", "siebel/custom/VHABTProcessCall"], function() {
        SiebelAppFacade.VFUNISIMCreditCardRechargeAppletTBUIPR = (function() {           
            var tokenBCId = "";
			console.log("InitVarJS");
			function VFUNISIMCreditCardRechargeAppletTBUIPR(pm) {
                SiebelAppFacade.VFUNISIMCreditCardRechargeAppletTBUIPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VFUNISIMCreditCardRechargeAppletTBUIPR, SiebelAppFacade.JQGridRenderer);
            VFUNISIMCreditCardRechargeAppletTBUIPR.prototype.Init = function() {
                SiebelAppFacade.VFUNISIMCreditCardRechargeAppletTBUIPR.superclass.Init.apply(this, arguments)
            };
            VFUNISIMCreditCardRechargeAppletTBUIPR.prototype.ShowUI = function() {
                SiebelAppFacade.VFUNISIMCreditCardRechargeAppletTBUIPR.superclass.ShowUI.apply(this, arguments);
                var pm = this.GetPM();
                var Mode = SiebelApp.S_App.GetActiveView().GetApplet(pm.Get("GetName")).GetMode();
                var CCAppId = pm.Get("GetFullId");
                var controls = pm.Get("GetControls");
                var Refresh = controls["VF Refresh"];
                var Register = controls["VF Register"];
                $("#" + Refresh.GetInputName() + "_Ctrl").addClass("VFDisplayNone");
                $("#" + Register.GetInputName() + "_Ctrl").after("<div class='VFBTOUICaptureCreditCard appletButton'>Capture Credit Card</div>").addClass("VFDisplayNone")
            };
            VFUNISIMCreditCardRechargeAppletTBUIPR.prototype.BindData = function(bRefresh) {
                SiebelAppFacade.VFUNISIMCreditCardRechargeAppletTBUIPR.superclass.BindData.apply(this, arguments)
            };
            VFUNISIMCreditCardRechargeAppletTBUIPR.prototype.BindEvents = function() {
                SiebelAppFacade.VFUNISIMCreditCardRechargeAppletTBUIPR.superclass.BindEvents.apply(this, arguments);
                var pm = this.GetPM();
                $("#s_" + pm.Get("GetFullId") + "_div").delegate(".VFBTOUICaptureCreditCard", "click", {
                    ctx: this
                }, VFBTOUICaptureCreditCard);
            };

            function VFBTOUICaptureCreditCard(e) {
				//ADUTTA:Start Florida:2342
				//var sBAN = SiebelApp.S_App.GetProfileAttr("PrepaymentsBACId");
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Output = SiebelApp.S_App.NewPropertySet();
				var sView = SiebelApp.S_App.GetActiveView().GetName();
				var sOrderNum = "";

				if(sView == "VF UNISIM Setup Recharge TBUI View")
				{
				sOrderNum = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VF UniSIM Customer Authetication TBC").GetFieldValue("Order Number");
				}

				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				Inputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service");										
				//Inputs.SetProperty("BAN", sBAN);
				Inputs.SetProperty("OrderNum", sOrderNum);
				Inputs.SetProperty("UPIPrepay", "UPIPrepay");
				Inputs.SetProperty("Method Name", "PrepayActiveRecValidation");
				var ROups = ser.InvokeMethod("Run Process", Inputs);										
				var sErrMsg = ROups.childArray[0].propArray.ErrorMessage; 	
				if (sErrMsg!="")
				{											
					console.log(sErrMsg);
					alert("When Payment URL is Active, credit card detail cannot be selected.");							
				}
				//ADUTTA:End Florida:2342
                if ($("#BrainTreeDiv").length) {
                    alert("There is a Paypal Braintree form open");
                    return
                }
                var ser_1 = SiebelApp.S_App.GetService("VF BS Process Manager");
                var Inputs_1 = SiebelApp.S_App.NewPropertySet();
                Inputs_1.SetProperty("Service Name", "VF UNISIM Prepay Utilities TBUI");
                Inputs_1.SetProperty("Method Name", "CheckCCCount");
                Inputs_1.SetProperty("NoRaiseError", "Y");
                var out_1 = ser_1.InvokeMethod("Run Process", Inputs_1);
                var ResultSet_1 = out_1.GetChildByType("ResultSet");
                if (ResultSet_1.GetProperty("Error") != "") {
                    alert(ResultSet_1.GetProperty("Error"));
                    return
                }
                var main = function(){
					var authTokenBT="";
					var pm = e.data.ctx.GetPM();
					var ActiveApplet = pm.Get("GetName");
					var CreditCardApplet = SiebelApp.S_App.GetActiveView().GetApplet(ActiveApplet);
					var CCApm = CreditCardApplet.GetPModel();
					var CCAppId = CCApm.Get("GetFullId");
					var BillRowId = GetUniqueIdValue();
					var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
					var Inputs = SiebelApp.S_App.NewPropertySet();
					var AddrDetails = GetAddressDetails();
					var UPC = AddrDetails.GetProperty("UPC");
					var sActKey = AddrDetails.GetProperty("ActivationKey");
					var sSegment = AddrDetails.GetProperty("CustomerSegment");
					var sEmail = AddrDetails.GetProperty("CustomerEmail");
					var sCountry = AddrDetails.GetProperty("CustomerCountry");
					var sCity = AddrDetails.GetProperty("CustomerCity");
					var sPCode = AddrDetails.GetProperty("PostalCode");
					var sState = AddrDetails.GetProperty("CustomerState");
					var StreetName = AddrDetails.GetProperty("StreetName");
					var StreetType = AddrDetails.GetProperty("StreetType");
					var StreetNumber = AddrDetails.GetProperty("StreetNumber");
					var DPID = AddrDetails.GetProperty("DPID");
					var sCompName = "";
					if (CheckPackType(UPC) == "2") {
						sCompName = "VFUNISIMCC_REG"
					} else {
						sCompName = "VFUNISIMCC_REC"
					}
					Inputs.SetProperty("Activation_Key", sActKey);
					Inputs.SetProperty("Cust_Segment", sSegment);
					Inputs.SetProperty("Cust_Email", sEmail);
					Inputs.SetProperty("Cust_Country", sCountry);
					Inputs.SetProperty("Cust_City", sCity);
					Inputs.SetProperty("Cust_State", sState);
					Inputs.SetProperty("Cust_PostalCode", sPCode);
					Inputs.SetProperty("Cust_StreetName", StreetName);
					Inputs.SetProperty("Cust_StreetNum", StreetNumber);
					Inputs.SetProperty("Cust_StreetType", StreetType);
					Inputs.SetProperty("Cust_DPID", DPID);
					Inputs.SetProperty("ProcessName", "VF PP BT INIT Workflow");
					Inputs.SetProperty("ClientRef", "MSISDN:0" + sActKey.substr(2, sActKey.length));
					Inputs.SetProperty("CompName", sCompName);
					Inputs.SetProperty("Identifier", BillRowId);
					console.log("ROw Id :" + BillRowId);
					try {
						var out = ser.InvokeMethod("RunProcess", Inputs);
						var ResultSet = out.GetChildByType("ResultSet");
						tokenBCId = ResultSet.GetProperty("tokenBCId");
						authTokenBT = ResultSet.GetProperty("PaymentClientToken");
						var ErrorMessage = ResultSet.GetProperty("Error Message");
						if (ErrorMessage != "") {
							authTokenBT="";
							ExitBTframe();
							console.log(ErrorMessage);
							alert("Integration error with external system EAI.Please Contact the System Administrator");							
						}						
					} catch (e) {
						alert(e.message)
					} finally {}
					if(authTokenBT!=""){
						$("#s_" + CCAppId + "_div div.siebui-collapsible-applet-header").hide();
						$("#s_" + CCAppId + "_div div.AppletHIListBorder.siebui-collapsible-applet-content").hide();
						$("#s_" + CCAppId + "_div").append(VFBTFormConstruct());
						hostFields(pm, authTokenBT, tokenBCId, GetCustomerIdValue(), GetOrderNumberValue());
						$("#BrainTreeDiv").show();
					}
				}
				load_scripts(main);
            }

            function CheckPackType(UPC) {
                var SearchString = "[List Of Values.Type] = 'USIM_TWO_DOLLAR_SIM' AND [List Of Values.Active] = 'Y' AND [List Of Values.Name] = '" + UPC + "'";
                var inp = SiebelApp.S_App.NewPropertySet();
                inp.SetProperty("Method Name", "RunProcess");
                inp.SetProperty("SearchString", SearchString);
                inp.SetProperty("ProcessName", "VF ID Details Workflow");
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var out = ser.InvokeMethod("RunProcess", inp);
                var ResultSet = out.GetChildByType("ResultSet");
                var IO = "LS Clinical List Of Values";
                var RawData = ResultSet.GetChildByType("SiebelMessage").GetChildByType("ListOf" + IO);
                var Picklist = new Array();
                RawData = SiebelMessageToArray(RawData);
                RawDataLen = RawData.length;
                for (var i = 0; i < RawDataLen; i++) {
                    Picklist[Picklist.length] = RawData[i]["Value"]
                }
                var PackType = "";
                if (Picklist.length == 0) {
                    PackType = "1"
                } else {
                    PackType = "2"
                }
                return PackType
            }

            function SiebelMessageToArray(pa) {
                var recordCount = 0;
                if (pa) {
                    var recordCount = pa.childArray.length
                }
                if (recordCount) {
                    var arrayData = [];
                    for (var i = 0; i < recordCount; i++) {
                        var arr = pa.childArray[i];
                        var arrLen = arr.propArrayLen;
                        if (arrLen) {
                            var tArr = new Object;
                            var indVal = arr.GetFirstProperty();
                            for (var j = 0; j < arrLen; j++) {
                                tArr[indVal] = arr.propArray[indVal];
                                indVal = arr.GetNextProperty()
                            }
                            arrayData[i] = tArr
                        }
                    }
                    return arrayData
                } else {
                    return false
                }
            }

            function GetUniqueIdValue() {
                var app = SiebelApp.S_App.GetActiveView().GetApplet("VF Task Session Form Applet UniSIM TBUI");
                var pm = app.GetPModel();
                var Data = pm.Get("GetRecordSet");
                return Data[0]["Session Id"]
            }
			
			function GetCustomerIdValue() {
                var app = SiebelApp.S_App.GetActiveView().GetApplet("VF Task Session Form Applet UniSIM TBUI");
                var pm = app.GetPModel();
                var Data = pm.Get("GetRecordSet");
                return Data[0]["Customer Row Id"]
            }
			
			function GetOrderNumberValue() {
                var app = SiebelApp.S_App.GetActiveView().GetApplet("VF Task Session Form Applet UniSIM TBUI");
                var pm = app.GetPModel();
                var Data = pm.Get("GetRecordSet");
                return Data[0]["Order Number"]
            }
			
            function GetAddressDetails() {
                var BO = SiebelApp.S_App.GetActiveBusObj();
                var BC = BO.GetBusCompByName("Order Entry - Orders");
                var OrderId = BC.GetIdValue();
                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("Service Name", "VF UNISIM Prepay Utilities TBUI");
                Inputs.SetProperty("Method Name", "GetCCMetadata");
                Inputs.SetProperty("OrderId", OrderId);
                var out = ser.InvokeMethod("Run Process", Inputs);
                return out.GetChildByType("ResultSet")
            }

            function GetCompName() {
                var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
                CompName = "";
                switch (ActiveView) {
                    case ("VF Connection View - Billing Detail"):
                    case ("VF Connection Wizard View - Billing Detail - TBUI"):
                    case ("VF Billing Details View - TBUI"):
                    case ("VF Billing Account Profile View - Extended"):
                    case ("VF Billing Account Profile View"):
                        CompName = "VFBillProfUpdate";
                        break;
                    case ("VF My Requested Service Request List View"):
                    case ("VF My Service Request List View"):
                    case ("VF Detail Service Request List View"):
                    case ("VF Admin Service Request List View"):
                    case ("VF Personal Service Request List View"):
                    case ("VF All Service Request List View"):
                        CompName = "VFSRUpdate";
                        break;
                    case ("VF Credit Card View - AU"):
                        CompName = "VFCreditCardReg";
                        break;
                    case ("VF UNISIM Capture Identification TBUI View"):
                        CompName = "VFUNISIMCC";
                        break;
                    case ("VF UNISIM Setup Recharge TBUI View"):
                        CompName = "VFUNISIMCC_REC";
                        break;
                    default:
                        alert("View Name Not Found.")
                }
                return CompName
            }
            VFUNISIMCreditCardRechargeAppletTBUIPR.prototype.EndLife = function() {
                SiebelAppFacade.VFUNISIMCreditCardRechargeAppletTBUIPR.superclass.EndLife.apply(this, arguments)
            };
            return VFUNISIMCreditCardRechargeAppletTBUIPR
        }());
        return "SiebelAppFacade.VFUNISIMCreditCardRechargeAppletTBUIPR"
    })
};