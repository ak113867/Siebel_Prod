if (typeof(SiebelAppFacade.VHAOrderReservationSummaryPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAOrderReservationSummaryPR");
    define("siebel/custom/VHAOrderReservationSummaryPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHAOrderReservationSummaryPR = (function() {
		var sPrepayCountProfileExt = "N";
		var sPrepayCountProfile = "N";
                function VHAOrderReservationSummaryPR(pm) {
                    SiebelAppFacade.VHAOrderReservationSummaryPR.superclass.constructor.call(this, pm);
                }
    SiebelJS.Extend(VHAOrderReservationSummaryPR, SiebelAppFacade.JQGridRenderer);
				VHAOrderReservationSummaryPR.prototype.Init = function () {
				SiebelAppFacade.VHAOrderReservationSummaryPR.superclass.Init.apply(this, arguments);
				}
                SiebelJS.Extend(VHAOrderReservationSummaryPR, SiebelAppFacade.PhysicalRenderer);
                VHAOrderReservationSummaryPR.prototype.ShowUI = function() {
                SiebelAppFacade.VHAOrderReservationSummaryPR.superclass.ShowUI.call(this);
				$(".RC_Applet3").hide();
				$(".RC_Applet8").hide();
				$(".RC_Applet9").hide();
				$(".RC_Applet10").hide();
				$(".UpgradeHide input").prop('disabled', true);
				$(".RCTotalAmt input").prop('disabled', true);
				$(".RCMothlyAmt input").prop('disabled', true);
				$(".RCContAmt1 input").prop('disabled', true);
				$(".RCContAmt input").prop('disabled', true);
				var PM = this.GetPM();	
				var errorFlg = "";
				var errormsg = "";	
				var sOrderId = "";
				var oRS = PM.Get("GetRawRecordSet");
				sOrderId = oRS[0]["Id"];
				var sOrdFun = oRS[0]["VF Order Function"];
				var sOrdResId = oRS[0]["Reservation Type Calc"];
				var sOrdSerType = oRS[0]["Order Sub Type"];
				SiebelApp.S_App.SetProfileAttr("RC_GPPResId",sOrdResId);
				SiebelApp.S_App.SetProfileAttr("RC_SerType",sOrdSerType);
				SiebelApp.S_App.SetProfileAttr("PrepaymentsBACId",""); 
				SiebelApp.S_App.SetProfileAttr("PrepayCountProfile",""); 
				SiebelApp.S_App.SetProfileAttr("PrepayCountProfileExt",""); 
				SiebelApp.S_App.SetProfileAttr("ReservationId",sOrdResId); 
				SiebelApp.S_App.SetProfileAttr("ppReservationId",sOrdResId); 
				SiebelApp.S_App.SetProfileAttr("RC_Bypass","");
				SiebelApp.S_App.SetProfileAttr("AmountPaid","");
				SiebelApp.S_App.SetProfileAttr("RCSKUCode",""); 
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Outputs = SiebelApp.S_App.NewPropertySet();
				var Output = SiebelApp.S_App.NewPropertySet();									
				if(sOrderId != ""){			
					//Calling BS to fetch input
					Inputs.SetProperty("Service Name", "VF RC GPPContract");
					Inputs.SetProperty("Method Name", "GPPContract");
					Inputs.SetProperty("OrderId", sOrderId);
					Inputs.SetProperty("ReservationId", sOrdResId);				
					ser.InvokeMethod("Run Process", Inputs, Outputs);
				}
				if(sOrderId != ""){			
					//Calling BS to fetch input
					Inputs.SetProperty("Service Name", "VF RC GPPContract");
					Inputs.SetProperty("Method Name", "RCDeleteExistingContract");
					Inputs.SetProperty("OrderId", sOrderId);
					Inputs.SetProperty("ReservationId", sOrdResId);
					Inputs.SetProperty("RCOrdFun", sOrdFun);	
					ser.InvokeMethod("Run Process", Inputs, Outputs);
					//var ss = Outputs.GetProperty("sOrderId");																			                        
				}
				if (sOrdFun == "UPGRADE"){
					$(".UpgradeHide").hide();
					$(".UpgradeHide1").hide();
					$(".RC_Applet3").show();
					$(".RC_Applet4").hide();
				}

                }
			VHAOrderReservationSummaryPR.prototype.BindData = function (bRefresh) {
			SiebelAppFacade.VHAOrderReservationSummaryPR.superclass.BindData.apply(this, arguments);
					var PrepayCountProfile = SiebelApp.S_App.GetProfileAttr("PrepayCountProfile");
					var sItemCode = SiebelApp.S_App.GetProfileAttr("ItemCode");
					var sItemCodeRes = SiebelApp.S_App.GetProfileAttr("RCSKUCode");
					var sContractAmount = SiebelApp.S_App.GetProfileAttr("ContractAmount");	
					var sMonthlyRepayment = SiebelApp.S_App.GetProfileAttr("MonthlyRepayment");
					var sTerm = SiebelApp.S_App.GetProfileAttr("Term");	
					sPrepayCountProfile = SiebelApp.S_App.GetProfileAttr("PrepayCountProfile");
					sPrepayCountProfileExt = SiebelApp.S_App.GetProfileAttr("PrepayCountProfileExt");
					var sAmountPaid = SiebelApp.S_App.GetProfileAttr("AmountPaid");
					if (sPrepayCountProfileExt == "N"){
					//$(".RC_Applet5").hide();
					$(".RC_FullfillView .RC_Applet5").hide();
					}
				
					if (sContractAmount != "")
					{
					sContractAmount = sContractAmount + " Over " +  sTerm + " Months";
					}
					$(".RCTotalAmt input").val(sAmountPaid);
					$(".RCItem input").val(sItemCode);
					$(".RCContAmt1 input").val(sItemCode);
					$(".RCMothlyAmt input").val(sMonthlyRepayment);
					$(".RCContAmt input").val(sContractAmount);
					if (sItemCode == ""){
					//sItemCodeRes = " Device :   " +  sItemCodeRes;
					$(".RCItem input").val(sItemCodeRes);
					}											
					//SiebelApp.S_App.SetProfileAttr("ItemCode","");
					SiebelApp.S_App.SetProfileAttr("ContractAmount","");	
					SiebelApp.S_App.SetProfileAttr("MonthlyRepayment","");
					SiebelApp.S_App.SetProfileAttr("Term","");
					//SiebelApp.S_App.SetProfileAttr("PrepaymentsBACId",""); 
					//SiebelApp.S_App.SetProfileAttr("PrepayCountProfile",""); 
					//SiebelApp.S_App.SetProfileAttr("PrepayCountProfileExt",""); 
					SiebelApp.S_App.SetProfileAttr("RC_Bypass",""); 
			                $(".viewbtn1").removeClass('RCContAmt');					
			}				

                VHAOrderReservationSummaryPR.prototype.BindEvents = function() {
                    SiebelAppFacade.VHAOrderReservationSummaryPR.superclass.BindEvents.apply(this, arguments);
                    
                }
				VHAOrderReservationSummaryPR.prototype.EndLife = function() {
                    SiebelAppFacade.VHAOrderReservationSummaryPR.superclass.EndLife.apply(this, arguments);
					//SiebelApp.S_App.SetProfileAttr("PrepaymentsBACId",""); 
					//SiebelApp.S_App.SetProfileAttr("PrepayCountProfile","");  
					//SiebelApp.S_App.SetProfileAttr("RC_Bypass","");                  
                }
                return VHAOrderReservationSummaryPR;
            }
            ());
        return "SiebelAppFacade.VHAOrderReservationSummaryPR";
    });
}