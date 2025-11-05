if (typeof(SiebelAppFacade.VHATOTNSAOrderSummaryPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHATOTNSAOrderSummaryPR");
    define("siebel/custom/VHATOTNSAOrderSummaryPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHATOTNSAOrderSummaryPR = (function() {
            function VHATOTNSAOrderSummaryPR(pm) {
                SiebelAppFacade.VHATOTNSAOrderSummaryPR.superclass.constructor.call(this, pm);
            }
            SiebelJS.Extend(VHATOTNSAOrderSummaryPR, SiebelAppFacade.PhysicalRenderer);
            /*---------- Custom Code Goes Here ------------*/
            VHATOTNSAOrderSummaryPR.prototype.ShowUI = function() {
			SiebelAppFacade.VHATOTNSAOrderSummaryPR.superclass.ShowUI.call(this);
			var pm = this.GetPM();
			
			//Fetching BusComp Field Value
			var sOrderBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("Order Entry - Orders");
			var sOrderId = sOrderBC.GetFieldValue("Id");
			//var sTransType = sOrderBC.GetFieldValue("Order Type Code"); possible value ConnectNBN or null
			//var sOrderId = "2-CLZO4HS";
			var sTransType = "";
			console.log("sOrderId#" +sOrderId);
			
			if (sTransType == "ConnectNBN") { $("#NSAVoiceMBBPostpayStaticContent").hide(); }
			else {  $("#NSANBNPostpayStaticContent").hide(); }
					
			//Calling BS to fetch input
			var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet();
			Inputs.SetProperty("Service Name", "VHA Generate Contract Service");
			Inputs.SetProperty("Method Name", "GenerateNSAContract");
			Inputs.SetProperty("OrderId", sOrderId);
			Inputs.SetProperty("TransType", sTransType);
			Inputs.SetProperty("Flow", "TOT");
			var Output = ser.InvokeMethod("Run Process", Inputs);
			var resultset = Output.GetChildByType("ResultSet");
			var SiebMessage = resultset.GetChildByType("SiebelMessage");
			
			//Start: Fetching Header details
			var Header = SiebMessage.GetChild(0).GetChild(0);
			var sCustomerName = Header.GetProperty("CustomerName");
			var sRegisteredCompany = Header.GetProperty("RegisteredCompany");
			var sABNACN = Header.GetProperty("ABNACN");
			var sDate = Header.GetProperty("Date");
			var sDOM = Header.GetProperty("DOM");
			var sConnectionType = Header.GetProperty("ConnectionType");			
			var sBAN = Header.GetProperty("BAN");
			var sDeliveryAddress = Header.GetProperty("DeliveryAddress");			
			
			$("#CustomerName").html(sCustomerName);
			$("#RegisteredCompany").html(sRegisteredCompany);
			$("#ABNACN").html(sABNACN);
			$("#Date").html(sDate);
			$("#DOM").html(sDOM);
			$("#ConnectionType").html(sConnectionType);
			$("#BAN").html(sBAN);			
			$("#DeliveryAddress").html(sDeliveryAddress);			
			//End: Fetching Header details
			
			//Start: Fetching Service Order details
			var ServiceOrder = Header.GetChild(0).GetChild(0);
			var sShared = ServiceOrder.GetProperty("Shared");
			var sMSISDN = ServiceOrder.GetProperty("MSISDN");			
			var sOrderRef = ServiceOrder.GetProperty("OrderRef");
			var sServiceOrderID = ServiceOrder.GetProperty("ServiceOrderID");
			var sFulfilmentRef = ServiceOrder.GetProperty("FulfilmentRef");
			var sPlan = ServiceOrder.GetProperty("Plan");
			var sPlanTerm = ServiceOrder.GetProperty("PlanTerm");
			var sSIM = ServiceOrder.GetProperty("SIM");
			var sEarlyUpgradeFee = ServiceOrder.GetProperty("EarlyUpgradeFee");
			var sDevicePayoutFee = ServiceOrder.GetProperty("DevicePayoutFee");
			var sNPEYFee = ServiceOrder.GetProperty("NPEYFee");
			var sBaseData = ServiceOrder.GetProperty("BaseData");
			var sBonusData = ServiceOrder.GetProperty("BonusData");
			var sSharedData = ServiceOrder.GetProperty("SharedData");
			var sIntZone1 = ServiceOrder.GetProperty("IntZone1");
			var sIntZone2 = ServiceOrder.GetProperty("IntZone2");
			var sNBNSpeedTier = ServiceOrder.GetProperty("NBNSpeedTier");
			var sNBNDeliveryAddress = ServiceOrder.GetProperty("NBNDeliveryAddress");
			var sNBNAddress = ServiceOrder.GetProperty("NBNAddress");
			var sNBNApptDate = ServiceOrder.GetProperty("NBNApptDate");
			var sNBNApptTime = ServiceOrder.GetProperty("NBNApptTime");
			var sNBNDevFee = ServiceOrder.GetProperty("NBNDevFee");
			var sNBNPlanValue = ServiceOrder.GetProperty("NBNPlanValue");			
						
			$("#Shared").html(sShared);
			$("#NSAMSISDN").html(sMSISDN);
			$("#OrderRef").html(sOrderRef);
			$("#ServiceOrderID").html(sServiceOrderID);
			$("#FulfilmentRef").html(sFulfilmentRef);
			$("#Plan").html(sPlan);
			$("#PlanTerm").html(sPlanTerm);
			$("#SIM").html(sSIM);
			$("#EarlyUpgradeFee").html(sEarlyUpgradeFee);
			$("#DevicePayoutFee").html(sDevicePayoutFee);
			$("#NPEYFee").html(sNPEYFee);
			$("#BaseData").html(sBaseData);
			$("#BonusData").html(sBonusData);
			$("#SharedData").html(sSharedData);			
			$("#IntZone1").html(sIntZone1);
			$("#IntZone2").html(sIntZone2);
			$("#NBNSpeedTier").html(sNBNSpeedTier);
			$("#NBNDeliveryAddress").html(sNBNDeliveryAddress);
			$("#NBNAddress").html(sNBNAddress);
			$("#NBNApptDate").html(sNBNApptDate);
			$("#NBNApptTime").html(sNBNApptTime);
			$("#NBNDevFee").html(sNBNDevFee);
			$("#NBNPlanValue").html(sNBNPlanValue);
			//End: Fetching Service Order details
			
			var GPP = "N", Disc = "N", HeadingCreated = "N";
			var SerOrdCnt = ServiceOrder.GetChildCount();
			var Row = "<div class='flex_row_container_NSA'>";
			var Column1 = "<div class='flex_column_container_NSA_Level1 VHAWidth35'>";
			var Column2 = "<div class='flex_column_container_NSA_Level1 VHAWidth20'>";
			var Column3 = "<div class='flex_column_container_NSA_Level1 VHAWidth15'>";
			var Column4 = "<div class='flex_column_container_NSA_Level1 VHAWidth15'>";
			var Column5 = "<div class='flex_column_container_NSA_Level1 VHAWidth15'>";
			var ColRow1BG = "<div class='VHANSALevel8'>";
			var ColRow2BG = "<div class='VHANSALevel9'>";
			var ColRow3BG = "<div class='VHANSALevel10'>";
			var ColRow3Bottom = "<div class='VHANSALevel10 VHANSABorderBottom'>";
			var fColumn1 = "", fColumn2 = "", fColumn3 = "", fColumn4 = "", fColumn5 = "";
			var fRow = "", fColRow3BG = "";
			
			console.log("SerOrdCnt: " +SerOrdCnt);
			if (SerOrdCnt > 0)	{
				if (ServiceOrder.GetChildByType("ListOfAddOn"))	{
					var AddOnCnt = ServiceOrder.GetChildByType("ListOfAddOn").GetChildCount();
					if (AddOnCnt > 0) {
						GPP = "Y";
						var a = 0;
						var AddOnProp = SiebelApp.S_App.NewPropertySet();						
						for (a = 0; a < AddOnCnt; a++) {
							AddOnProp = ServiceOrder.GetChildByType("ListOfAddOn").GetChild(a);
							console.log("NameProd: " + AddOnProp.GetProperty("Name"));
							if (a == 0) {
								fColumn1 = ColRow1BG + "General Payment Plan" + "</div>" + ColRow2BG + "Packs, Passes and Add-Ons" + "</div>";
								fColumn2 = ColRow1BG + "Serial" + "</div>" + ColRow2BG + "</div>";
								fColumn3 = ColRow1BG + "Monthly Payment" + "</div>" + ColRow2BG + "</div>";
								fColumn4 = ColRow1BG + "Payment Term" + "</div>" + ColRow2BG + "</div>";
								fColumn5 = ColRow1BG + "Total" + "</div>" + ColRow2BG + "</div>";
							}
							fColumn1 = fColumn1 + ColRow3BG + AddOnProp.GetProperty("Name") + "</div>";
							fColumn2 = fColumn2 + ColRow3BG + "</div>";
							fColumn3 = fColumn3 + ColRow3BG + AddOnProp.GetProperty("MonthlyRepayment") + "</div>";
							fColumn4 = fColumn4 + ColRow3BG + AddOnProp.GetProperty("Term") + "</div>";
							fColumn5 = fColumn5 + ColRow3BG + AddOnProp.GetProperty("Total") + "</div>";
						}
					}
				}//if (ServiceOrder.GetChildByType("ListOfAddOn"))
					
				if (ServiceOrder.GetChildByType("ListOfLoyaltyDiscount"))	{
					var LDiscCnt = ServiceOrder.GetChildByType("ListOfLoyaltyDiscount").GetChildCount();
					if (LDiscCnt > 0) {
						Disc = "Y";
						var b = 0;
						var LDiscProp = SiebelApp.S_App.NewPropertySet();						
						for (b = 0; b < LDiscCnt; b++) {
							LDiscProp = ServiceOrder.GetChildByType("ListOfLoyaltyDiscount").GetChild(b);
							console.log("NameProd: " + LDiscProp.GetProperty("Name"));
							if (b == 0) {
								HeadingCreated = "Y";
								fColumn1 = fColumn1 + ColRow1BG + "Discounts & Offers" + "</div>" + ColRow2BG + "Loyalty Discounts" + "</div>";
								fColumn2 = fColumn2 + ColRow1BG + "Discounts & Offers($)" + "</div>" + ColRow2BG + "</div>";
								fColumn3 = fColumn3 + ColRow1BG + "</div>" + ColRow2BG + "</div>";
								fColumn4 = fColumn4 + ColRow1BG + "</div>" + ColRow2BG + "</div>";
								fColumn5 = fColumn5 + ColRow1BG + "Term" + "</div>" + ColRow2BG + "</div>";
							}
							if (LDiscCnt == b+1) {fColRow3BG = ColRow3Bottom;}
							else {fColRow3BG = ColRow3BG;}
							fColumn1 = fColumn1 + fColRow3BG + LDiscProp.GetProperty("Name") + "</div>";
							fColumn2 = fColumn2 + fColRow3BG + LDiscProp.GetProperty("DiscountPrice") + "</div>";
							fColumn3 = fColumn3 + fColRow3BG + "</div>";
							fColumn4 = fColumn4 + fColRow3BG + "</div>";
							fColumn5 = fColumn5 + fColRow3BG + LDiscProp.GetProperty("Term") + "</div>";
						}
					}
				}//if (ServiceOrder.GetChildByType("ListOfLoyaltyDiscount"))
				
				if (ServiceOrder.GetChildByType("ListOfBonus"))	{
					var BonusCnt = ServiceOrder.GetChildByType("ListOfBonus").GetChildCount();
					if (BonusCnt > 0) {
						Disc = "Y";
						var c = 0;
						var BonusProp = SiebelApp.S_App.NewPropertySet();						
						for (c = 0; c < BonusCnt; c++) {
							BonusProp = ServiceOrder.GetChildByType("ListOfBonus").GetChild(c);
							console.log("NameProd: " + BonusProp.GetProperty("Name"));
							if (c == 0) {
								if (HeadingCreated == "N") {
									HeadingCreated = "Y";
									fColumn1 = fColumn1 + ColRow1BG + "Discounts & Offers" + "</div>" + ColRow2BG + "Bonus" + "</div>";
									fColumn2 = fColumn2 + ColRow1BG + "Discounts & Offers($)" + "</div>" + ColRow2BG + "</div>";
									fColumn3 = fColumn3 + ColRow1BG + "</div>" + ColRow2BG + "</div>";
									fColumn4 = fColumn4 + ColRow1BG + "</div>" + ColRow2BG + "</div>";
									fColumn5 = fColumn5 + ColRow1BG + "Term" + "</div>" + ColRow2BG + "</div>";
								}
								else {
									fColumn1 = fColumn1 + ColRow2BG + "Bonus" + "</div>";
									fColumn2 = fColumn2 + ColRow2BG + "</div>";
									fColumn3 = fColumn3 + ColRow2BG + "</div>";
									fColumn4 = fColumn4 + ColRow2BG + "</div>";
									fColumn5 = fColumn5 + ColRow2BG + "</div>";
								}
									
							}
							if (BonusCnt == c+1) {fColRow3BG = ColRow3Bottom;}
							else {fColRow3BG = ColRow3BG;}
							fColumn1 = fColumn1 + fColRow3BG + BonusProp.GetProperty("Name") + "</div>";
							fColumn2 = fColumn2 + fColRow3BG + "</div>";
							fColumn3 = fColumn3 + fColRow3BG + "</div>";
							fColumn4 = fColumn4 + fColRow3BG + "</div>";
							fColumn5 = fColumn5 + fColRow3BG + BonusProp.GetProperty("Term") + "</div>";
						}
					}
				}//if (ServiceOrder.GetChildByType("ListOfBonus"))
				
				if (ServiceOrder.GetChildByType("ListOfCredit"))	{
					var CreditCnt = ServiceOrder.GetChildByType("ListOfCredit").GetChildCount();
					console.log("CreditCnt: " + CreditCnt);
					if (CreditCnt > 0) {
						Disc = "Y";
						var d = 0;
						var CreditProp = SiebelApp.S_App.NewPropertySet();						
						for (d = 0; d < CreditCnt; d++) {
							CreditProp = ServiceOrder.GetChildByType("ListOfCredit").GetChild(d);
							console.log("NameProdC: " + CreditProp.GetProperty("Name"));
							if (d == 0) {
								if (HeadingCreated == "N") {
									HeadingCreated = "Y";
									fColumn1 = fColumn1 + ColRow1BG + "Discounts & Offers" + "</div>" + ColRow2BG + "Credits" + "</div>";
									fColumn2 = fColumn2 + ColRow1BG + "Discounts & Offers($)" + "</div>" + ColRow2BG + "</div>";
									fColumn3 = fColumn3 + ColRow1BG + "</div>" + ColRow2BG + "</div>";
									fColumn4 = fColumn4 + ColRow1BG + "</div>" + ColRow2BG + "</div>";
									fColumn5 = fColumn5 + ColRow1BG + "Term" + "</div>" + ColRow2BG + "</div>";
								}
								else {
									fColumn1 = fColumn1 + ColRow2BG + "Credits" + "</div>";
									fColumn2 = fColumn2 + ColRow2BG + "</div>";
									fColumn3 = fColumn3 + ColRow2BG + "</div>";
									fColumn4 = fColumn4 + ColRow2BG + "</div>";
									fColumn5 = fColumn5 + ColRow2BG + "</div>";
								}
									
							}
							if (CreditCnt == d+1) {fColRow3BG = ColRow3Bottom;}
							else {fColRow3BG = ColRow3BG;}
							fColumn1 = fColumn1 + fColRow3BG + CreditProp.GetProperty("Name") + "</div>";
							fColumn2 = fColumn2 + fColRow3BG + CreditProp.GetProperty("DiscountPrice") + "</div>";
							fColumn3 = fColumn3 + fColRow3BG + "</div>";
							fColumn4 = fColumn4 + fColRow3BG + "</div>";
							fColumn5 = fColumn5 + fColRow3BG + CreditProp.GetProperty("Term") + "</div>";
						}
					}
				}//if (ServiceOrder.GetChildByType("ListOfCredit"))
					
				//if (GPP == "Y" || Disc == "Y") {
					fColumn1 = Column1 + fColumn1 + "</div>";
					fColumn2 = Column2 + fColumn2 + "</div>";
					fColumn3 = Column3 + fColumn3 + "</div>";
					fColumn4 = Column4 + fColumn4 + "</div>";
					fColumn5 = Column5 + fColumn5 + "</div>";
					fRow = Row + fColumn1 + fColumn2 + fColumn3 + fColumn4 + fColumn5 + "</div>";
					console.log(fRow);
					$("#NSAPostpayDynamicContent").append(fRow);
				//}
					
			}//if (SerOrdCnt > 0)
			
			}
            return VHATOTNSAOrderSummaryPR;
        }());
        return "SiebelAppFacade.VHATOTNSAOrderSummaryPR";
    });
}