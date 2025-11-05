if (typeof VHASalesCalculatorTemplate === "undefined") {
    var VHASalesCalculatorTemplate = {};
	
	function OriginalJSON(){
		var OrgJSON = {
			QuoteHeader: {
				QuoteNumber: "",
				QuoteId: "",
				SessionId: "",
				CustomerType: "", //New or Existing
				QuoteJourney: "", // Connect or Upgrade
				VFDealerRowId: "",
				VFSalesChannelDescription: "",
				VFSalesBranchDescription: "",
				DealerName: "",
				FName: "",
				LName: "",
				EmailId: "",
				MobileNo: "",
				MarketingFurtherContact: "",
				CostPerMonth: 0,
				AllCostPerMonth: 0,
				OneTimeCost: 0,
				QuoteAttId:"",
				ExistingCustDtls: {
					searchMSISDN:"",
					searchBillingAccount:"",
					CustomerId:"",
					BillingAccountId:"",
					BillingAccountNo:"",
					CustomerName: "",
					ActiveServices: "",
					ApprovedServices: "",
					CreditCheckStatus: "",
					CustomerSince: "",
					CustomerPIN: "",
					CustomerType: "",
					EmailAddress: "",
					MobileNumber: "",
					RemainingEquipmentLimit: "",
					adjRemainingEquipmentLimit: "",
					PriceListId:"",
					ReceiveMarketingInfo:"",
					Inquiry:""
				},
				NewCustDtls: {
					FirstName: "", 
					LastName: "",			
					EmailAddress: "",
					ReceiveMarketingInfo:"",
					Inquiry:""
				},
				Prepayment:{
					PrepaymentAmt:"",
					PrepaymentUpd:""
				},
				RootItem: [{
						Action:"", //Existing or Add 
						Mode: "", // Edit or Saved
						SimO:"",
						Id: "", // QLI-1
						AssetId:"",// Only for existing
						MSISDN:"",
						AppCount:0,
						MPPCount:0,
						Service: "",
						SrvPerMth: 0,
						TotalSrvPerMth: 0,
						SrvType: "", // New Service or Upgrade Service
						UpgradeOfferType: "",// Upgrade , Resign , RRP on Installment
						RoamingProduct: "",
						TenureOverride: "",
						LatestDeviceTermOverride: "",
						OverrideDesc: "",
						RCCValue: 0,
						RCCEditable: "",
						Promo:"",
						ETC: "",
						Proposition: "",
						PropSAMId: "",
						DeviceIns :"",
						ShipPostalCode:"",
						PlanItem: {
							Type:"Plan",
							Action: "",
							Name: "",
							Code:"",
							ProdIntegrationId:"",
							Price: 0,
							Descr: ""
						},
						DeviceItem: [/*{
								Type:"",//Device
								Action: "Add", //Add or Existing or Delete
								Name: "",//GPP Device Contract
								ProdIntegrationId: "",
								Additional__Info: "",
								Category: "Device",
								IMEI___Serial__Number: "",
								Item__Code: "",
								Item__Name: "",
								Contract__Amount: 0,
								Monthly__Repayment: 0,
								Original__Order__Number: "",
								Original__Purchase__Date: "",
								Prepayment__Amount: 0,
								Term: 0,
								Term__Override: "_",
								Insurance: "",
								InsPri: 0,
								RemTerm: 0,
								UI__RRP__Inc__GST:0,
								UI__Color:"",
								UI__Capacity:"",
								UI__Source_Product_Name:""
							}*/
						],
						SDItem: [/*{
								Type:"Secondary Device",
								Action: "", //Add or Existing
								Name: "APP Contract",
								ProdIntegrationId: "",
								Additional__Info: "",
								Category: "Secondary Device",
								Contract__Amount: 0,
								Contract__Amount__Override: 0,
								Contract__End__Date: "",
								Contract__Start__Date: "",
								IMEI: "",
								Monthly__Repayment: "",
								Number__of__Accessories: 1,
								Prepayment__Amount: 0,
								Term: "",
								Term__Override: "_",
								Total__Accessories__RRP__Inc__GST: "",
								Insurance: "",
								InsPri: "",
								Item__Name: "",
								RemTerm: ""
							}*/
						],
						AccItem: [/*{
								Type:"Accessory",
								Action: "", // Add or Existing (AccItemChild not required)
								Name: "APP Contract",
								ProdIntegrationId: "",
								Additional__Info: "",
								Category: "Accessory",
								Contract__Amount: 0,
								Contract__Amount__Override: 0,
								Contract__End__Date: "",
								Contract__Start__Date: "",
								IMEI: "",
								Monthly__Repayment: "",
								Number__of__Accessories: "",
								Prepayment__Amount: 0,
								Term: "",
								Term__Override: "_",
								Total__Accessories__RRP__Inc__GST: "",
								RemTerm: "",
								AccItemChild: [{
										Action: "",
										Name: "Accessory",
										ProdIntegrationId: "",
										Accessory__Code: "",
										Accessory__Name: "",
										Accessory__RRP__Exc__GST: "",
										Accessory__RRP__Inc__GST: "",
										Category: "",
										Prepayment__Amount: ""
									}
								]
							}*/
						],
						PackItem: [/*{ //Configure Service
								Action: "",
								Type:"", //IDD or Data **Saranvanan
								Name: "$15 Data AddOn - 2GB MtM",
								ProdIntegrationId: "",
								Period: "",
								Price: ""
							}*/
						],
						DDItem: [/*{ //WF response
								Action: "",
								Type:"",
								Name: "$6 Loyalty Discount",
								ProdIntegrationId: "",
								Period: "",
								Price: ""
							}*/
						],
						BonusItem: [/*{ //WF response
								Action: "",
								Type:"",
								Name: "5% Bundle & Save",
								ProdIntegrationId: "",
								Period: "",
								Price: ""
							}*/
						],
						CreditItem: [/*{ //WF response
								Action: "",
								Type:"",
								Name: "Subscription Level $ Discount Recurring Charges",
								ProdIntegrationId: "",
								Period: "",
								Price: ""
							}*/
						],
						FeeRollItem: { //Early upgrade fee
							Action: "",
							Type:"",
							Name: "",//Early Upgrade Fee Rollover
							ProdIntegrationId: "",
							Period: "",
							Price: 0
						},
						TradeItem: { //ConfigService Trade in and out
							Action: "",
							Type:"",
							Name: "",//Trade In and Out
							ProdIntegrationId: "",
							Period: "",
							Price: 0
						},
						CancelItem: [/*{ //WF response
								Name: "15GB Bonus Data",
								Type:"",
							}*/
						],
						OtpItem: [/*{
								Action: "",
								Type:"",
								Name: "Device Payout Fee", //Terminate existing contract line MRC*remaing months
								Price: ""
							}, {
								Action: "",
								Type:"",
								Name: "Prepayment", 
								Price: ""
							}*/
						]
					}
				]
			}
		}
		return OrgJSON;
	}

	function SelectedServiceJSON(){
		var selService ={
			ExistingContractUI:{
				CurrentPlan:"",
				CurrentPlanPrice:0,
				EarlyUpgradeFee:0,
				BundleandSave:0,
				LoyaltyDiscount:0,
				Credit:0,
				ActiveGPPCount:0,
				RestrictedDiscount:0,
				PropositionName:"",
				PropositionSAMId:"",
				Device:[{
					ItemName:"",
					RemMonths:"",
					Charge:0,
					IntegrationId:""
				}],
				APP:[{
					ItemName:"",
					RemMonths:"",
					Charge:0,
					IntegrationId:""
				}],
				PlanItem:{
					Action:"",
					Name:"",
					Code:"",
					ProdIntegrationId:"",
					Price:"",
					ProductId:"",
					Type:""
				}
			}
		}
		return selService;
	}

    function createAddoncard() {
        return '<div class="ts-applet-from ts-feature-config">\
			<div>\
				<span class="vha-bold-h1">Configure Additional Features</span>\
			</div>\
			<div>\
				<div class="parent-controls-container ts-roaming-method">\
					<span class="field-label field-label-override">Internationl Roaming Plan to be Active on</span>\
					<div class="applet-button applet-button-active" val="5Roaming">$5 Roaming</div>\
					<div class="applet-button applet-button-passive" val="PAYG">Pay as You Go</div>\
					<div class="applet-button applet-button-passive" val="Off">Off</div>\
				</div>\
				<div class="parent-controls-container ts-data-addon-method">\
					<span class="field-label field-label-override">Add Data Add-ons</span>\
					<div class="applet-button applet-button-active" val="NotInterested">Not Interested</div>\
					<div class="applet-button applet-button-passive" val="OneOff">One-Off</div>\
					<div class="applet-button applet-button-passive" val="Recurring">Recurring</div>\
					<div class="VFDisplayNone parent-controls-container ts-data-addon-container">\
					<input class="input-field input-margin-left" id="ts-feature-config-addon" placeholder="select"/>\
					<span class="siebui-icon-dropdown applet-form-combo applet-list-combo ts-addon-drop-down" parId="#ts-feature-config-addon" data-allowdblclick="true"></span>\
					</div>\
				</div>\
				<div class="parent-controls-container ts-international-call-method">\
					<span class="field-label field-label-override">Add International Calls Add-ons</span>\
					<div class="applet-button applet-button-active" val="NotInterested">Not Interested</div>\
					<div class="applet-button applet-button-passive" val="OneOff">One-Off</div>\
					<div class="applet-button applet-button-passive" val="Recurring">Recurring</div>\
					<div class="VFDisplayNone parent-controls-container ts-idd-addon-container">\
					<input class="input-field input-margin-left" id="ts-feature-config-idd" placeholder="select"/>\
					<span class="siebui-icon-dropdown applet-form-combo applet-list-combo ts-idd-drop-down" parId="#ts-feature-config-idd" data-allowdblclick="true"></span>\
					</div>\
				</div>\
				<div class="parent-controls-container">\
					<div class="VFDisplayNone parent-controls-container ts-data-addonterm-container">\
					<input class="input-field input-margin-left" id="ts-feature-config-termidd" placeholder="select term"/>\
					<span class="siebui-icon-dropdown applet-form-combo applet-list-combo ts-termidd-drop-down" parId="#ts-feature-config-termidd" data-allowdblclick="true"></span>\
					</div>\
				</div>\
				<div class="parent-controls-container ts-discounts-method">\
					<span class="field-label field-label-override">Add Restricted Discounts</span>\
					<div class="applet-button applet-button-active" val="NotInterested">Not Interested</div>\
					<div class="applet-button applet-button-passive" val="Recurring">Recurring</div>\
				</div>\
				<div class="parent-controls-container">\
						<div class="applet-subsection ts-product-selection VFDisplayNone">\
							<div class="parent-controls-container">\
								<span class="item-label-title vcol-1">Products</span>\
								<span class="item-label-title vcol-2">Amount</span>\
								<span class="item-label-title vcol-3">Period</span>\
								<span class="item-label-title vcol-4">Reason Code</span>\
							</div>\
						</div>\
					</div>\
				<div class="parent-controls-container ts-pickinsurance-method">\
					<span class="field-label field-label-override">Pick Device Care</span>\
					<select class="input-field insurance-type" id="ts-new-device-ins">\
					<option>Insurance 1</option>\
					<option>Insurance 2</option>\
					<option>Insurance 3</option>\
					</select>\
				</div>\
				<div class="parent-controls-container ts-addremoveins-method">\
					<span class="field-label field-label-override">Add/Remove Device Care for existing device?</span>\
					<div class="applet-button applet-button-passive" val="Yes">Yes</div>\
					<div class="applet-button applet-button-active" val="No">No</div>\
				</div>\
				<div class="vha-ins-dtls p-4 ml-3 mb-4 VFDisplayNone">\
					<div class="row vha-bold-h1">\
						<div class="col-md-3">Device Name</div>\
						<div class="col-md-3">Existing Device Care</div>\
						<div class="col-md-3">Action</div>\
						<div></div>\
					</div>\
					<div class="vha-insurance-content"></div>\
				</div>\
			</div>\
		</div>';
    }

    function showCustomerDtls() {
        var a = '<div class="row">\
			<div class="vha-ts-custiconsm"></div>\
			<div class="pt-3 h5">Customer Details</div>\
			<div class="custermer-details-collapse">-</div>\
		</div>\
		<div class="row ml-1" style="border: 1px solid #dddddd;width:98%;"></div>\
		<div class="vha-ts-cart-cust-dtls custclass">\
			<div class="row">\
				<div class="col-md-4 cart-cust-label">Name</div>\
				<div class="col-md-5 VHATOTBold" id="vhatscustname">-</div>\
			</div>\
			<div class="row">\
				<div class="col-md-4 cart-cust-label">Service Used</div>\
				<div class="col-md-5 VHATOTBold" id="vhatsserviceused">-</div>\
			</div>\
			<div class="row">\
				<div class="col-md-4 cart-cust-label">Customer Since</div>\
				<div class="col-md-5 VHATOTBold" id="vhatscustdate">-</div>\
			</div>\
			<div class="row">\
				<div class="col-md-4 cart-cust-label">Credit Check Status</div>\
				<div class="col-md-5 VHATOTBold activeAssetTitle" id="vhatscreditchkstatus">-</div>\
			</div>\
			<div class="row">\
				<div class="col-md-4 cart-cust-label">Remaining Equipment Limit</div>\
				<div class="col-md-5 VHATOTBold VFDisplayNone" id="vhatsremqplimit">-</div>\
				<div class="col-md-5 VHATOTBold" id="vhatsupdremqplimit">-</div>\
			</div>\
			<div class="row">\
				<div class="col-md-4 cart-cust-label">Active Services</div>\
				<div class="col-md-5 VHATOTBold" id="vhatsactservice">-</div>\
			</div>\
			<div class="row">\
				<div class="col-md-4 cart-cust-label">Approved Services</div>\
				<div class="col-md-5 VHATOTBold" id="vhatsappservice">-</div>\
			</div>\
			<div class="row">\
				<div class="col-md-4 cart-cust-label">Order Number</div>\
				<div class="col-md-5 VHATOTBold" id="vhatsordernum">-</div>\
			</div>\
			<div class="row">\
				<div class="col-md-4 cart-cust-label">Session Reference</div>\
				<div class="col-md-5 VHATOTBold" id="vhatssessionref">-</div>\
			</div>\
		</div>';
        var b = '<div class="vha-ts-ext-contract">\
			<div class="row mt-2">\
				<div class="vha-ts-carticonsm"></div>\
				<div class="pt-3 h5">Existing Contract and Charge Out</div>\
			</div>\
			<div class="row ml-1" style="border: 1px solid #dddddd;width:98%;"></div>\
			<div class="vha-ts-ext-contract-chd bgcolor m-3">\
				<div class="vha-ts-e-plan">\
					<div class="vha-ts-e-plan-chd">\
							<div class="cart-e-device-par">\
						</div>\
						<div class="row cart-e-upgfee">\
							<div class="vha-ts-cartitemw col-md-4">Early Upgrade Fee</div>\
							<div class="h5 vha-ts-cartval" id="vha-ts-cart-e-upg-fee"></div>\
							<div id="fee12" class="applet-button-r applet-button-active-r" val="12"><button class="vha_ts_earlyupfee">12</button></div>\
							<div id="fee24" class="applet-button-r applet-button-passive-r" val="24"><button class="vha_ts_earlyupfee">24</button></div>\
							<div id="feeNA" class="applet-button-r applet-button-passive-r" val="NA"><button class="vha_ts_earlyupfee">NA</button></div>\
						</div>\
					</div>\
				</div>\
				<div class="vha-ts-e-discount">\
					<div class="vha-ts-redtxt h5">Current Offers and Discounts</div>\
					<div class="vha-ts-discount-chd">\
						<div class="row e-cart-discount-loyalty">\
							<div class="vha-ts-cartitemw col-md-4">Loyalty</div>\
							<div class="h5 vha-ts-cartval">-$ <span>0.00</span></div>\
						</div>\
						<div class="row e-cart-discount-bundle">\
							<div class="vha-ts-cartitemw col-md-4">Bundle and Save</div>\
							<div class="h5 vha-ts-cartval">-$ <span>0.00</span></div>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>';
        var c = '<div id="stick-here"></div>\
				<div class="vha-ts-cart-sum VFDisplayNone"><div class="row mt-2">\
				<div class="vha-ts-carticonsm"></div>\
				<div class="pt-3 h5">Cart Summary</div>\
				<div class="vha-ts-deleteiconsm"></div>\
			</div>\
			<div class="row ml-1" style="border: 1px solid #dddddd;width:98%;"></div>\
			<div class="vha-ts-cart-sum-chd bgcolor m-3">\
			<div class="row vha-ts-dvcplan VFDisplayNone">\
			</div>\
			<div class="row vha-ts-secdvc VFDisplayNone">\
			<div class="vha-ts-redtxt h5 col-md-12">Secondary Plan</div>\
			<div class="col-md-12 ml-5 vha-ts-secdvc-chd">\
			</div>\
			</div>\
			<div class="row vha-ts-accessory VFDisplayNone">\
			<div class="vha-ts-redtxt h5 col-md-12">App Plan</div>\
			<div class="col-md-12 ml-5">\
			<div class="row cart-accessory-info">\
				<div>\
					<div class="vha-ts-cartitemw">Total Accessories</div>\
					<div class="text-warning-acc" id="vha-ts-accsssorycnt ml-5"><span class="count">0</span> Accessories</div>\
				</div>\
				<div>\
					<div class="h5 vha-ts-cartval">$ <span class="price">00.00</span></div>\
					<div class="h5 vha-ts-a-payinfo">$ <span class="totalprice">0</span><span class="monthdtl"></span></div>\
				</div>\
			</div>\
			</div>\
			</div>\
				<div class="row vha-ts-addons pb-3 VFDisplayNone">\
					<div class="vha-ts-redtxt h5 col-md-12">Add-Ons</div>\
					<div class="col-md-12 ml-5 vha-ts-addons-chd">\
						<div class="row cart-roaming-addons VFDisplayNone">\
							<div class="vha-ts-cartitemw">Roaming</div>\
							<div class="h5 vha-ts-cartval">$0</div>\
						</div>\
						<div class="row cart-data-addons VFDisplayNone">\
							<div class="vha-ts-cartitemw">Data</div>\
							<div class="h5 vha-ts-cartval">$0</div>\
						</div>\
						<div class="row cart-idd-addons VFDisplayNone">\
							<div class="vha-ts-cartitemw">IDD</div>\
							<div class="h5 vha-ts-cartval">$0</div>\
						</div>\
						<div class="row cart-phone-insurance VFDisplayNone">\
							<div class="vha-ts-cartitemw">Device Care</div>\
							<div class="h5 vha-ts-cartval">$0</div>\
						</div>\
						<div class="row cart-sd-insurance VFDisplayNone">\
							<div class="vha-ts-cartitemw">Secondary Device Care</div>\
							<div class="h5 vha-ts-cartval">$0</div>\
						</div>\
					</div>\
				</div>\
				<div class="row vha-ts-discount pb-3 VFDisplayNone">\
					<div class="vha-ts-redtxt h5 col-md-12">Discounts</div>\
					<div class="col-md-12 ml-5 vha-ts-discount-chd">\
						<div class="row cart-discount-loyalty VFDisplayNone">\
							<div class="vha-ts-cartitemw">Loyalty</div>\
							<div class="h5 vha-ts-cartval">-$ <span>0.00</span></div>\
						</div>\
						<div class="row cart-discount-credit VFDisplayNone">\
							<div class="vha-ts-cartitemw">Credit</div>\
							<div class="h5 vha-ts-cartval">-$ <span>0.00</span></div>\
						</div>\
						<div class="row cart-discount-bundle VFDisplayNone">\
							<div class="vha-ts-cartitemw">Bundle and Save</div>\
							<div class="h5 vha-ts-cartval">-$ <span>0.00</span></div>\
						</div>\
						<div class="row cart-discount-restrict VFDisplayNone">\
							<div class="vha-ts-cartitemw">Manual Discounts</div>\
							<div class="h5 vha-ts-cartval">-$ <span>0.00</span></div>\
						</div>\
					</div>\
				</div>\
				<div class="row vha-ts-offers">\
					<div class="vha-ts-redtxt h5 col-md-12">Offers</div>\
					<div class="col-md-12 ml-5 vha-ts-offer-chd">\
						<div class="row cart-offers-data">\
							<div class="vha-ts-cartitemw">Data</div>\
							<div class="h5 vha-ts-cartval">0 GB</div>\
						</div>\
						<div class="row cart-offers-intmins">\
							<div class="vha-ts-cartitemw vhaz1">Int.Zone 1</div>\
							<div class="h5 vha-ts-cartval vhaz1">0 mins</div>\
						</div>\
						<div class="row cart-offers-intmins">\
							<div class="vha-ts-cartitemw vhaz2">Int.Zone 2</div>\
							<div class="h5 vha-ts-cartval vhaz2">0 mins</div>\
						</div>\
						<div class="cart-offers-amazon VFDisplayNone">\
						</div>\
					</div>\
				</div>\
				<div class="col-md-12 vha-ts-promo">\
					<div class="row  mt-4">\
						<div class="vha-ts-cartitemw">Enter Promo Code</div>\
						<input type="text" class="h5 vha-ts-promoCode mr-1">\
						<div class="vha-ts-offerapply ml-1"><span>Apply</span><span class="VFDisplayNone">Revert</span></div>\
						<div class="vha_promo_errmsg vha-ts-redtxt ml-3"></div>\
					</div>\
				</div>\
				</div>\
			</div>\
			<div class="row vha-ts-indcost justify-content-center">\
				<div>Total Indicative Cost $<span class="vha-ts-cartval">00.00</span>/month</div>\
			</div></div>';
        var d = a + b + c;
        $(".sw-cart-sum").html(d);
    }

    function createPlanCard(n, plans) {
		var sDataText = "";
		if (((plans[n]._source.Proposition_Name).toLowerCase().indexOf("mbb")) > -1 || ((plans[n]._source.Proposition_Name).toLowerCase().indexOf("tablet")) > -1){
			sDataText = "Additional Data is automatically added at $10/10GB ($0.001/MB)";
		}
		else if (plans[n]._source.Plan_Type == "Vodafone Caps"){
			sDataText = "";
		}
		else if (plans[n]._source.Sharing == "Alpha"){
			sDataText = "Additional Data is automatically added at $10/10GB ($0.001/MB)";
		}
		else if (plans[n]._source.Sharing == "Omega"){
			sDataText = "Get " + plans[n]._source.Data_Entitlement + " data at Your max Speed, then keep using data in Oz at speed up to " + plans[n]._source.Default_Speed;
		}
		
        var phtml = '<div class="ml-3 mt-3 bd-highlight">' +
            '<div class="card" id="plancard' + [n] + '">' +
            '<div class="card-body">' +
            '<div class="d-flex bd-highlight vha-sc-card-row1">' +
            '<div class="pl-4 pr-2 pt-1 pb-2 bd-highlight vha-sc-card-row1-col1">' +
            '<div class="pt-1"><span class="vha-sc-carasole-bolder" id="vha-sc-tot-paldata' + [n] + '"></span><span   id="vha-sc-tot-paldata-q' + [n] + '" class="vha-sc-carasole-bolder" style="font-size: 24px;">' + (plans[n]._source.Data_Entitlement).replace("GB","") + '</span><span class="vha-sc-carasole-bold">GB</span></div>' +
            '<div style="margin-top: -10px;"><span style="font-size: small;">Data in Oz</span></div>' +
            '</div>' +
            '<div class="pl-4 pr-4 pt-2 pb-2 bd-highlight vha-sc-card-row1-col2">' +
            '<div class="pt-3"><span class="vha-sc-carasole-dollar">$</span><span class="vha-sc-carasole-bolder" id="vha-tot-palamt' + [n] + '" style="font-size: 24px;">' + parseFloat(plans[n]._source.Plan_Price_Inc_Gst).toFixed(2) + '</span></div>' +
            '<div style="margin-top: -10px;margin-left: 8px;">' +
            '<span class="vha-sc-greysmall text-lowercase" id="vha-sc-tot-paltym' + [n] + '">per month</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="d-flex flex-column bd-highlight vha-sc-card-row2 pl-4 pr-3 pt-2 vha-sc-greysmall">' +
            '<span class="vha-sc-tot-conterm mb-1" id="vha-sc-tot-conterm' + [n] + '">' + plans[n]._source.Contract_Type + '</span>' +
            '<span class="h5 vha-sc-tot-conterm-hd">Endless data</span>' +
            '<span class="vha-sc-tot-ent pr-1" id="vha-sc-tot-condesc' + [n] + '">'+sDataText+'</span>' +
            '</div>' +
            '<div class="d-flex flex-column bd-highlight vha-sc-card-row3 pl-4 pr-3 pt-2 vha-sc-greysmall">' +
            '<span class="vha-sc-tot-plantype" id="vha-sc-tot-conplantyp' + [n] + '">' + plans[n]._source.Plan_Name + '</span>' +
            '<span class="vha-sc-tot-plantypedtls mt-2 mb-0 pr-1" id="vha-sc-tot-plandesc' + [n] + '">' + plans[n]._source.Proposition_Name + '</span>' +
            '</div>' +
            '<div class="d-flex flex-column bd-highlight vha-sc-card-row4 pl-4 pr-3 vha-sc-greysmall">' +
            '<span class="mt-1 mb-1 h6 vha-sc-tot-conterm-hd" id="vha-sc-tot-endlessdatatxt' + [n] + '">' + plans[n]._source.Data_Entitlement + ' Endless data</span>' +
            '<div class="vha-sc-tot-enttxt pr-1" id="vha-sc-tot-enttxt' + [n] + '">'+sDataText+'</div>' +            
            '</div>' +
			'<div class="d-flex justify-content-center"><button class="btn btn-primary mt-2 vha-sc-addtocartbtn" plancd="' + plans[n]._source.Plan_Code + '" planname="' + plans[n]._source.Plan_Name + '" seqNum="' + [n] + '">Select this plan</button></div>' +
            '<div class="forcehide" context="dataStore">' +
            '<span id="vha-sc-tot-rateplanname' + [n] + '" class="vha-tot-sc-rateplanname"></span>' +
            '<span id="vha-sc-tot-planId' + [n] + '"></span>' +
            '<span id="vha-sc-tot-ratepropname' + [n] + '"></span>' +
            '<span id="vha-sc-tot-ratePlanType' + [n] + '"></span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return phtml;
    }

	const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true }); // Addedto sort alphanumeric

    function createDeviceCard(n, deviceModel, response, sDevImgMpng, sDeviceTerm) { 
        var capacitytag = "";
        var distinctCap = [];
        var sDvcPrice = "";
        var defaultCapacity = "";
        var sSaveValue = "";
		
		//This function truncates device monthly cost into two decimals.
		function mTruncate(sValue) {
			var sPoint = "", sTruncValue = "0.00", sLeft = "0", sRight = "00";
			try {
			  if (sValue != "" && sValue != "undefined" && sValue != "Undefined") {
				sPoint = sValue.indexOf(".");
				if (sPoint != -1) {
				  sLeft = sValue.substring(0, sPoint);
				  sRight = sValue.substring(sPoint + 1, sPoint + 3);
				  if (sRight == "" || sRight == null) {
					sRight = "00";
				  }
				  sTruncValue = sLeft + "." + sRight;
				  sTruncValue = parseFloat(sTruncValue).toFixed(2);
				} else {
				  sTruncValue = sValue + ".00";
				}
			  }
			  return sTruncValue;
			} catch (e) {
			  return sTruncValue;
			}
		}

        //Function to get distinct capacities and all records corresponding to specific device
        function distinctCapacities(device){
			if(device._source.Source_Product_Name == deviceModel){
				var sCapacity = device._source.Capacity;
				if (!(distinctCap.includes(sCapacity))) {
                    distinctCap.push(sCapacity)
				}
				return true;
			}
		}
        
        //To filter records of specific device
        var dvcArray = response.filter(function(a) {
			return (distinctCapacities(a));
		});

        //construct html elements for each capacity
        if(distinctCap.length > 0){
        	var distinctCapGB = distinctCap.filter(function(a) {
			    return a.indexOf("GB") > -1;
		        });
		    distinctCapGB.sort(sortAlphaNum);
		    var distinctCapTB = distinctCap.filter(function(a) {
			    return a.indexOf("TB") > -1;
		        });
		    distinctCapTB.sort(sortAlphaNum);
		    var distinctCapOthers = distinctCap.filter(function(a) {
			    return (a.indexOf("GB") == -1 && a.indexOf("TB") == -1);
		        });
		    distinctCap = distinctCapGB.concat(distinctCapTB,distinctCapOthers);

		    defaultCapacity = distinctCap[0];
            for (var i = 0; i < distinctCap.length; i++){
		        if (capacitytag == "") {
		        	capacitytag = '<select id="vhasccapacity" lblname="" name="vhasccapacity" class="vhasccapacity"><option value="' + distinctCap[i] + '">' + distinctCap[i] + '</option>';
                } else {
                    capacitytag += '<option value="' + distinctCap[i] + '">' + distinctCap[i] + '</option>';
                }
            }
        }

        capacitytag += '</select>'
        var colortag = "";

        var distinctClr = [];
        var distinctColordtl = [];
        var sDevImg = "";
        
        //Function to get distinct colors and all records corresponding to specific device and capacity
        function distinctColors(device){
			if(device._source.Source_Product_Name == deviceModel && device._source.Capacity == defaultCapacity){
				var sColor = device._source.Color;
				if (!(distinctClr.includes(sColor))) {
                    distinctClr.push(sColor);
                    distinctColordtl.push({color: sColor, deviceprice: device._source.RRP_Inc_Gst, savevalue: device._source.Save_Value, productcode: device._source.Product_Code, recmdcolor: device._source.RecommendedColor});
                    return true;
				}
				
			}
		}
        
        //To filter records of specific device and capacity
		var dvcColourArray = dvcArray.filter(function(a) {
			return (distinctColors(a));
		});
		
        if (distinctColordtl[0].recmdcolor != "") {
            for(var i=0; i < distinctColordtl.length; i++){
            	if(distinctColordtl[0].recmdcolor == distinctColordtl[i].color){
            		var recommendedColor = distinctColordtl[i];
            		distinctColordtl.splice(i, 1);
            		distinctColordtl.unshift(recommendedColor);
            	}
            }
        }

        //construct html elements for each color
		if(distinctColordtl.length > 0){
			var defaultColor = distinctColordtl[0].color;
            for (var i = 0; i < distinctColordtl.length; i++){
		        if (colortag == "") {
                    sDvcPrice = distinctColordtl[i].deviceprice;
			    	if(distinctColordtl[i].savevalue > 0)
						sSaveValue = "Save $" + (distinctColordtl[i].savevalue) + " on this phone&#39s RRP";
                    colortag = '<select id="vhasccolour" lblname="" name="vhasccolour" class="vhasccolour" ><option  name="colouroptn" value="' + defaultColor + '"  skuid="' + distinctColordtl[i].productcode + '">' + defaultColor + '</option>';
                    var sSku = distinctColordtl[i].productcode;
                    sDevImg = "images/custom/Devices/" + sDevImgMpng[sSku];
                    if (sDevImgMpng[sSku] == null)
                        sDevImg = "images/custom/Devices/Default.png";

                } else {
                    colortag += '<option name="colouroptn" value="' + distinctColordtl[i].color + '" skuid="' + distinctColordtl[i].productcode + '">' + distinctColordtl[i].color + '</option>';
                }
            }
        }

        colortag += '</select>'
		// device and plan carousel start
        var sRtrn = '<div class="ml-3 mt-3">\
		<div class="card  device-card" id="card' + [n] + '">\
		<div class="card-body">\
		<div class="vha-sc-d-card-row1 pl-4 pr-3 pt-2 vha-sc-card-red">\
		<span class="vha-sc-d-save mb-3  align-self-center" id="vha-sc-d-save' + [n] + '">'+sSaveValue+'</span>\
		</div>\
		<div class="vha-sc-d-card-row2 pl-4 pr-3 pt-2 mt-4">\
		<div class="sucess_check-mark"><div class="check-mark"></div></div>\
		<img class="vha-sc-d-img mb-3" id="vha-sc-d-img' + [n] + '" src="' + sDevImg + '"></img>\
		</div>\
		<div class="vha-sc-d-card-row3 pl-4 pr-3 pt-2 vha-sc-greysmall">\
		<span class="vha-sc-d-brand">Brand Name</span>\
		<div class="vha-sc-d-card-row-flex">\
		<span class="vha-sc-d-product-name">'+deviceModel+'</span><div class="vha-sc-d-card-col-flex">\
		' +
            capacitytag + colortag +
            '</div></div>\
		<div class="vha-sc-d-card-row-flex mt-3">\
		<span class="vha-sc-d-price">Device From\
		<span class="vha-sc-carasole-dollar"><sup>$</sup><span class="vha-sc-carasole-bolder vha-sc-pl-2px" id="vha-sc-d-amt' + [n] + '">' + mTruncate(parseFloat(sDvcPrice / sDeviceTerm).toString()) + '</span></span>\
		<span class="vha-sc-d-permnt" id="vha-sc-d-permnt' + [n] + '">per month</span>\</span>\
		<span class="vha-sc-d-description" id="vha-sc-d-desc' + [n] + '">Over ' + sDeviceTerm + ' Months. Total min cost $ <span>' + sDvcPrice + '</span></span>\
		</div>\
		<div id="stockmsg" class="d-flex justify-content-center">\
		</div>\
		</div>\
		<div class="forcehide" context="dataStore">\
		<span id="vha-sc-rateplanname' + [n] + '" class="vha-tot-sc-rateplanname"></span>\
		<span id="vha-sc-planId' + [n] + '"></span>\
		<span id="vha-sc-ratepropname' + [n] + '"></span>\
		<span id="vha-sc-ratePlanType' + [n] + '"></span>\
		</div>\
		<div class="sc-stock-status"><span></span></div>\
		<button class="vha-sc-d-shopaddtocartbtn btn" device="' + deviceModel + '" price="' + sDvcPrice + '" capacity="' + defaultCapacity + '" color="' + defaultColor + '" seqNum="' + [n] + '">Select this Device</button>\
		</div>\
		</div>\
		</div>';
        return sRtrn;

    // device and plan carousel end
    }

    function createBillingTemp() {
        return '<div class="ts-applet-from ts-billing-account">\
			<div>\
				<span class="VHAFormTitle">Billing Details</span>\
			</div>\
			<div class="applet-title-data">\
				<span class="applet-title-data-label ts-billing-account-number"></span>\
			</div>\
			<div>\
				<div class="parent-controls-container ts-delivery-method">\
					<span class="field-label field-label-override">Notify Bill Via</span><!--Delivery Method-->\
					<div class="applet-button applet-button-passive" val="Email">Email</div>\
					<div class="applet-button applet-button-passive" val="MyVodafone">My Vodafone</div>\
					<div class="applet-button applet-button-passive" val="Paper">Paper</div>\
					<input class="input-field input-margin-left VFDisplayNone" type="email" id="ts-billing-delivery-email-id" placeholder="delivery email"/>\
				</div>\
				<div class="parent-controls-container ts-notification-method">\
					<span class="field-label field-label-override">Notify Alerts Via</span>\
					<div class="applet-button applet-button-passive" val="Email">Email</div>\
					<div class="applet-button applet-button-passive" val="TXT">TXT</div>\
					<div class="applet-button applet-button-passive" val="Email and TXT">Both</div>\
					<input class="input-field input-margin-left VFDisplayNone" type="email" id="ts-billing-notify-email-id" placeholder="notification email"/>\
					<input class="input-field input-margin-left VFDisplayNone" type="number" id="ts-billing-notify-text" placeholder="notification TXT"/>\
				</div>\
				<div class="parent-controls-container ts-payment-method">\
					<span class="field-label field-label-override">Payment Method</span>\
					<div class="applet-button applet-button-passive" val="Direct Debit">Direct Debit</div>\
					<div class="applet-button applet-button-passive" val = "Credit Card">Credit Card</div>\
					<div class="applet-button applet-button-passive" val="Other">Other</div>\
				</div>\
				<div class="ts-credit-debit">\
				<button class="vha-custom-button vhasecondarybtn input-margin-left" id="tsCaptureCC">Capture Credit Card Details</button>\
				<div class="parent-controls-container"><div class="applet-label-input-control input-margin-left">\
						<span class="input-field-label">Card Token Number</span>\
						<input class="input-field card-token-number" readonly/>\
					</div>\
				<div class="applet-label-input-control input-margin-left">\
						<span class="input-field-label">Expiry Date</span>\
						<input class="input-field expiry-date" readonly/>\
					</div>\
					</div>\
				</div>\
				<div class="parent-controls-container ts-direct-debit">\
					<div class="applet-label-input-control input-margin-left">\
						<span class="input-field-label">BSB</span>\
						<div class="flex_row_container VHAJustContentStart VHAParentRelative">\
						<input class="input-field bsb"/>\
						</div>\
					</div>\
					<div class="applet-label-input-control input-margin-left">\
						<span class="input-field-label">Bank Details</span>\
						<input class="input-field bank-details" readonly/>\
					</div>\
					<div class="applet-label-input-control input-margin-left">\
						<span class="input-field-label">Account Number</span>\
						<input class="input-field account-number"/>\
					</div>\
					<div class="applet-label-input-control input-margin-left">\
						<span class="input-field-label">Account Name</span>\
						<input class="input-field account-name"/>\
					</div>\
				</div>\
			</div>\
		</div>';
    }

    function mAppendShippingAddr() {  
    }

    function mAppendPrepaymentDiv() {
        $('#vha-ts-prepayment').html('<div class="vha-gf-card-inline">\
		<span class="VHAFormTitle mb-3">Prepayment</span>\
		<div class="row">\
		<div class="vha-ts-lbl mb-3">\
		<span class="pl-3 mr-4">Prepayment from</span>\
		<div class="ml-4 figure">\
		<button class="btn vhappbtn" id="vhagfppnotinterestedbtn">Not Interested</button>\
		<button class="btn vhappbtn" id="vhagfppcreditexistingcardbtn">Use Existing Card</button>\
		<button class="btn vhappbtn" id="vhagfppcreditcardbtn">Capture new Card</button>\
		</div>\
		</div>\
		</div>\
		<div class="vha-ts-prepaymentForm-enterdata VHADisplayNone">\
		<div class="ml-1 row w-100 mr-1 mb-2" id = "vha-upgrade-payIframe"></div>\
		<div class="row vha-ts-carddetails">\
		<div class="vha-ts-nameoncard-col vha-ts-readonly-div"><span class="vha-ts-lbl">Name on Card</span><input class="vha-ts-nameoncard input-field" type="text" readonly></div>\
		<div class="vha-ts-cardtype-col vha-ts-readonly-div"><span class="vha-ts-lbl">Credit Type</span><input class="vha-ts-cardtype input-field" type="text" readonly></div>\
		<div class="vha-ts-cardbrand-col vha-ts-readonly-div"><span class="vha-ts-lbl">Brand</span><input class="vha-ts-cardbrand input-field" type="text" readonly></div>\
		<div class="vha-ts-cardnumber-col vha-ts-readonly-div"><span class="vha-ts-lbl">Credit Card</span><input class="vha-ts-cardnumber input-field" type="text" readonly></div>\
		<div class="vha-ts-cardexpiry-col vha-ts-readonly-div"><span class="vha-ts-lbl">Expiry</span><input class="vha-ts-cardexpiry input-field" type="text" readonly></div>\
		<div class="vha-ts-cardsurcharge-col vha-ts-readonly-div"><span class="vha-ts-lbl">Surcharge</span><input class="vha-ts-cardsurcharge input-field" type="text" readonly></div>\
		</div>\
		<div class="row">\
		<div class="vha-ts-lbl mb-3">\
		<span class="pl-3">Prepayment Amount</span>\
		<span class="dollar-input-container">\
		<input class="input-field input-margin-left" type="number" id="gf-prepayment-amt">\
		<i>$</i>\
		</span>\
		</div>\
		</div>\
		<div id="vhagfppsummary" class="mb-3">\
		<div class="mb-3 vha-ts-lbl">Prepayment Shared to:</div>\
		<div class="flex_row_container VHAJustContentStart mb-3">\
		<div class="flex_column_container">\
		<div>Primary Device</div>\
		<div>Secondary Device</div>\
		<div>Accessory</div>\
		</div>\
		<div class="flex_column_container ml-4">\
		<div id="gf-pp-pd-share">$ 0.00</div>\
		<div id="gf-pp-sd-share">$ 0.00</div>\
		<div id="gf-pp-acc-share">$ 0.00</div>\
		</div>\
		</div>\
		<div class="mb-3">Total Prepayment amount of $ <span id="ppchargewithsurcharge"></span>\
		which includes surcharge <span id="display-surcharge-value">2.43</span> will be deducted from CARD ending with <span id="display-card-Number"></span></div>\
		</div>\
		<div class="flex_row_container VHAJustContentStart VHAParentRelative mar-btm-10">\
		<input type="checkbox" id="vhagfppwaiveoff" name="vhagfppwaiveoff" value="Y" class="input-customcheckbox">\
		<label for ="vhagfppwaiveoff" id="vhagfppwaiveoff" class="item-customcheckbox-label">Waive off surcharge fee?</label>\
		</div>\
		</div>');
    }
    function mAppendTwoWaySms() {
        var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
        var Inputs = SiebelApp.S_App.NewPropertySet();
        Inputs.SetProperty("Service Name", "VHA Two Way SMS VBC");
        Inputs.SetProperty("Method Name", "Query2WaySMSMSISDN");
        Inputs.SetProperty("AccountId", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Account Id"));
        var Outputs = ser.InvokeMethod("Run Process", Inputs);
        var sLength = Outputs.GetChildByType("ResultSet").GetChildCount();
        var tHTML = "<div class='vha-gf-card-inline'><div class='p-2 input-margin-left'><span class='vha-bold-h1'>2 way SMS</span><span id='twoWaySmsshowMsg'></span><select class='input-field twowaysms-msisdn ml-4'><option value='' style='display:none'></option>";

        for (var i = 0; i < sLength; i++) {
            tHTML += "<option value='" + Outputs.GetChildByType("ResultSet").childArray[i].propArray["Primary MSISDN"] + "'>" + Outputs.GetChildByType("ResultSet").childArray[i].propArray["Primary MSISDN"] + "</option>";
        }

        tHTML += "</select><input type='checkbox' id='tickmark1' style='margin-left: 2.5em' readonly='readonly' disabled='disabled'><label id='slectbox' class='vha-bold-h1'>Override SMS</label></div></div>";

        $('#vha-ts-2waysms').append(tHTML);
        $(".twowaysms-msisdn").parent().after('<span id=static2waysmsmsg class=field-label>Inform customer to reply for SMS so that order can be processed.</span>'); //Added for Defect#1136
		$(".twowaysms-msisdn").parent().css("margin-bottom", "20px"); //ss103269: Added for positioning 2waysms static message
    } //VHA:Modified function to call BS and load picklist values.

    function mAppendOverrideReason() {
        $('#vha-ts-overridersn, #step-2 #vha-ts-overridersn').html('<div class="parent-controls-container ts-data-addon-method">\
	<span class="field-label field-label-override">Reason for override upgrade eligibility</span>\
	<select class="input-field shipment-pref ml-4" id="ts-override-reason"></select>\
	</div>\
	');
        mAppendOptionList("VHA_UPGRADE_OVERRIDE_DESC", "#ts-override-reason");
    }

    function mAppendOptionList(sLovType, sSelector) {
        var sList = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='" + sLovType + "' AND [List Of Values.Active]='Y'");
        var sListOption = "";
        sListOption += "<option></option>";
        sList.forEach(function(item, index) {
            sListOption += "<option>" + item + "</option>";
        });
        $(sSelector).append(sListOption);
    }

    function mAppendAccessories() {
        var tsPayterm = [{
                "Name": "12 Months",
                "Class": "btn vhappbtn",
                "Id": "vhats12term",
                "term": "12"
            },
            {
                "Name": "24 Months",
                "Class": "btn vhappbtn",
                "Id": "vhats24term",
                "term": "24"
            },
            {
                "Name": "36 Months",
                "Class": "btn vhappbtn",
                "Id": "vhats36term",
                "term": "36"
            }
        ];
        var tsPaytermAccess = [{
                "Name": "12 Months",
                "Class": "btn vhappbtn-mini",
                "Id": "vhats12termaccess",
                "term": "12"
            },
            {
                "Name": "24 Months",
                "Class": "btn vhappbtn-mini",
                "Id": "vhats24termaccess",
                "term": "24"
            },
            {
                "Name": "36 Months",
                "Class": "btn vhappbtn-mini",
                "Id": "vhats36termaccess",
                "term": "36"
            }
        ];
        var tsAccessByBrand = [{
                "Name": "Apple",
                "Class": "applet-button applet-button-passive vha-ts-secondarybrand",
                "Id": "vhatsbrandapple",
                "style": "border-radius: 30px; min-width:0%"
            },
            {
                "Name": "Huawei",
                "Class": "applet-button input-margin-left applet-button-passive vha-ts-secondarybrand",
                "Id": "vhatsbrandhuawai",
                "style": "border-radius: 30px; min-width:0%"
            },
            {
                "Name": "Nokia",
                "Class": "applet-button input-margin-left applet-button-passive vha-ts-secondarybrand",
                "Id": "vhatsbrandnokia",
                "style": "border-radius: 30px; min-width:0%"
            },
            {
                "Name": "Samsung",
                "Class": "applet-button input-margin-left applet-button-passive vha-ts-secondarybrand",
                "Id": "vhatsbrandsamsung",
                "style": "border-radius: 30px; min-width:0%"
            },
            {
                "Name": "Others",
                "Class": "applet-button input-margin-left applet-button-passive vha-ts-secondarybrand",
                "Id": "vhatsbrandother",
                "style": "border-radius: 30px; min-width:0%"
            }
        ];
        var tsStock = [{
                "Name": "In Stock",
                "Class": "btn vhappbtn-mini input-margin-left vhatsstockindicator applet-button-passive",
                "Id": "vhatsinstock"
            },
            {
                "Name": "Out of Stock",
                "Class": "btn vhappbtn-mini vhatsstockindicator applet-button-active",
                "Id": "vhatsoutstock"
            }
        ];
        var tsAddSimYN = [{
                "Name": "Yes",
                "Class": "btn vhappbtn-mini vhatsaddsimyn applet-button-passive",
                "Id": "vhatsaddsimy"
            },
            {
                "Name": "No",
                "Class": "btn vhappbtn-mini vhatsaddsimyn applet-button-active",
                "Id": "vhatsaddsimno"
            }
        ];

        var ahtml = '<div id="NCAttachedId"><div class="parent-controls-container">\
		<span class="vha-bold-h1">Accessories and Smart Wearables</span>\
		</div>\
		<div id="Secondarysection">\
		<div>\
		<span class="vha-ts-lbl">Secondary Device</span>\
		</div>\
		<div class="d-flex parent-controls-container vha-ts-btn-div p-0">\
		<div class="m-1">\
		<div class="applet-label-input-control">\
		<span class="input-field-label">Enter IMEI (In Stock)</span>\
		<input id="secondaryimei" class="input-field enter-imei" style="width:250px">\
		<div id="vha-ts-sd-imeierrmsg" style="color:red" class="text-danger">\
		</div>\
		</div>\
		</div>\
		</div>\
		<div class="vha-ts-btn-div">\
		<div class="input-field-label">Filter by Brand</div>\
		<div class="row dflex justify-content-left vha-ts-paytermbtn vha-ts-secondarybrands">\
		';
        for (var a = 0; a < tsAccessByBrand.length; a++) {
            ahtml = ahtml + '<div id="' + tsAccessByBrand[a].Id + '" class="' + tsAccessByBrand[a].Class + '" style="' + tsAccessByBrand[a].style + '">' + tsAccessByBrand[a].Name + '</div>';
        }

        ahtml += '</div></div>\
		<div class="d-flex parent-controls-container vha-ts-btn-div p-0">\
			<div class="m-1">\
				<div class="applet-label-input-control">\
					<div style="width: 100%;">\
						<span class="input-field-label" style="padding-right: 150px">Search EAN</span>\
						<span class="input-field-label">Pick Model</span>\
					</div>\
					<div class="parent-controls-container ts-secondary-device  p-0">\
						<input class="input-field" id="ts-search-ean" autocomplete="off">\
						<span id="vha-ts-searchean-dropdown" class="siebui-icon-dropdown applet-form-combo applet-list-combo" parid="#ts-search-ean" data-allowdblclick="true">\
						</span>\
						<input class="input-field" id="ts-secondary-model" placeholder="select" autocomplete="off" style="margin-left: 20px;">\
						<span id="vha-ts-sd-dropdown" class="siebui-icon-dropdown applet-form-combo applet-list-combo" parid="#ts-secondary-model" data-allowdblclick="true">\
						</span>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div class="d-flex parent-controls-container vha-ts-btn-div p-0">\
			<div class="m-1">\
				<div class="applet-label-input-control">\
					<div style="width: 100%;">\
						<span class="input-field-label" style="padding-right: 280px">Interest free repayment period</span>\
						<span class="input-field-label">Pick Device Care</span>\
					</div>\
					<div class="row dflex justify-content-left vha-ts-paytermbtn">\
					';
						for (var a = 0; a < tsPayterm.length; a++) {
							ahtml = ahtml + '<button id="' + tsPayterm[a].Id + '" class="' + tsPayterm[a].Class + ' vha-ts-sd-term" term="' + tsPayterm[a].term + '">' + tsPayterm[a].Name + '</button>';
						}

						ahtml += '<input class="input-field" id="ts-pick-sg" autocomplete="off" style="margin-left: 20px;width: 284px">\
						<span id="vha-ts-pick-sg-dropdown" class="siebui-icon-dropdown applet-form-combo applet-list-combo" parid="#ts-pick-sg" data-allowdblclick="true">\
						</span>\
						<button id="vhasecondaryadd" class="vhasecondaryadd vhatotverifybtn" style="margin-top:0px; margin-left:165px">Add</button>\
					</div>\
					<div id="vha-ts-sd-stockerrmsg"></div>\
					<div id="vha-ts-sd-equiplmtmsg" class="text-warning"></div>\
				</div>\
			</div>\
		</div>\
		<div class="vha-ts-btn-div"><div id="NCIdListHeader" class="vha-ts-lbl">Selected Device List</div><div id="NCAttachedId" class="idatcontainerchdft" style="background-color:#f4f4f4;width: 70%;"><div class="NCIdHeader"></div><div  id="secondaryslected" class="NCIdrecCont"><div class="flex_row_container NCIdrecHeader"><div class="VHATOTBold" style="width: 20%;padding-right: 1.5px;">Accessory Name</div><div class="VHATOTBold" style="width: 18%;">IMEI Number</div><div class="VHATOTBold" style="width: 14%;">Stock Indicator</div><div class="VHATOTBold" style="width: 12%;">Stock Band</div><div class="VHATOTBold" style="width: 18%;">Estimated Ship Date</div><div class="VHATOTBold" style="width: 10%;">Term</div><div class="VHATOTBold" style="width: 15%;">Device Care</div><div class="VHATOTBold" style="width: 8%;"></div></div></div></div></div>\
		<div class="vha-h-line"></div>\
		</div>\
		<div id="Accessorysection">\
		<div>\
		<span class="vha-ts-lbl">Accessory</span>\
		</div>\
		<div class="vha-ts-btn-div">\
	    <div style="width: 100%;">\
			<span class="field-label" style="padding-right: 25px;">Search Accessory Code</span>\
			<span class="field-label pl-4 ml-2">Search EAN Code</span>\
		</div>\
		<span>\
		<input class="input-field ui-autocomplete-input" id="ts-accessory-code" autocomplete="off" style="width: 170px;">\
	    <span id="ts-accessory-code-dropdown" class="siebui-icon-dropdown applet-form-combo applet-list-combo" parid="#ts-accessory-code" data-allowdblclick="true">\
	    </span>\
	    </span>\
	    <span class="pl-4">\
	    <input class="input-field ui-autocomplete-input" id="ts-accessory-ean" autocomplete="off" style="width: 170px;">\
	    <span id="ts-accessory-ean-dropdown" class="siebui-icon-dropdown applet-form-combo applet-list-combo" parid="#ts-accessory-ean" data-allowdblclick="true">\
	    </span>\
	    </span>\
		<div class="pt-3" style="width: 100%;">\
	    	<span class="field-label" style="padding-right: 340px;">Search by</span>\
	    	<span class="field-label">Search Accessory</span>\
	    </div>\
        <input class="input-field ui-autocomplete-input" id="ts-accessory-cat" autocomplete="off" style="width: 170px;">\
	    <span id="ts-accessory-cat-dropdown" class="siebui-icon-dropdown applet-form-combo applet-list-combo" parid="#ts-accessory-cat" data-allowdblclick="true">\
	    </span>\
	    <input class="input-field input-margin-left ui-autocomplete-input" id="ts-accessory-model" placeholder="Model" autocomplete="off" style="width: 170px;">\
	    <span id="ts-accessory-model-dropdown" class="siebui-icon-dropdown applet-form-combo applet-list-combo" parid="#ts-accessory-model" data-allowdblclick="true">\
	    </span>\
	    <input id="vha-ts-accessorylist" class="tssearchplan input-field input-margin-left" type="text">\
	    <span id="vha-ts-access-dropdown" class="siebui-icon-dropdown applet-form-combo applet-list-combo" parid="#vha-ts-accessorylist" data-allowdblclick="true"></span>\
        </div>\
		<div class="vha-ts-btn-div">\
		<div class="input-field-label">Interest free repayment period</div>\
        <div class="row dflex justify-content-left vha-ts-a-paytermbtn">\
        '
        for (var a = 0; a < tsPaytermAccess.length; a++) {
            ahtml = ahtml + '<button id="' + tsPaytermAccess[a].Id + '" class="' + tsPaytermAccess[a].Class + ' vha-ts-a-term" term="' + tsPaytermAccess[a].term + '">' + tsPaytermAccess[a].Name + '</button>';
        }

        for (var a = 0; a < tsStock.length; a++) {
            ahtml = ahtml + '<button id="' + tsStock[a].Id + '" class="' + tsStock[a].Class + '">' + tsStock[a].Name + '</button>';
        }

        ahtml += '<button id="vhaaccessadd" class="vhaaccessadd vhatotverifybtn ml-3" style="margin-top:0px">Add</button>\
		</div>\
		<div id="vha-ts-accsry-stockerrmsg"></div>\
		<div id="vha-ts-accsry-equiplmtmsg" class="text-warning"></div>\
		<div class="vha-ts-btn-div vha-ts-lbl"><div id="NCAttachedId" class="idatcontainerchdft" style="background-color:#f4f4f4"><div class="NCIdHeader"></div><div id="accessoryselected" class="NCIdrecCont"><div class="flex_row_container NCIdrecHeader"><div class="VHATOTBold" style="width: 25%;">Accessory Name</div><div class="VHATOTBold" style="width: 8%;">Quantity</div><div class="VHATOTBold" style="width: 14%;">Stock Indicator</div><div class="VHATOTBold" style="width: 12%;">Stock Band</div><div class="VHATOTBold" style="width: 18%;">Estimated Ship Date</div><div class="VHATOTBold" style="width: 15%;">Edit Quantity</div><div class="VHATOTBold" style="width: 8%;"></div></div></div></div>\
        </div>\
		</div>\
		</div>\
		<div class="vha-ts-btn-div">\
		<div class="vha-ts-lbl">Add SIM</div>\
		<div class="parent-controls-container">\
		<div>\
		'

        for (var a = 0; a < tsAddSimYN.length; a++) {
            ahtml = ahtml + '<button id="' + tsAddSimYN[a].Id + '" class="' + tsAddSimYN[a].Class + '">' + tsAddSimYN[a].Name + '</button>';
        }

        ahtml += '</div>\
        </div>\
        </div>\
		</div>\
		'
        $("#vha-ts-access").html(ahtml);
    }

    function cancelTSUpgradeFlow() {
        $("#VHACaptureLeadDialog").remove();
        $("body").append(
            '<div id="VHACaptureLeadDialog" style="height:100% !important; width:480px !important">\
			<div id="VHACaptureLeadDiv">\
				<table class="leadtable" align="center" >\
					<tr>\
						<td class = "leadmsg" colspan="2">Hey there, please select the most appropriate reason for not proceeding with the upgrade.</td>\
					</tr>\
					<tr>\
						<td class="vhatotlbl1"></td>\
						<td><select class="vhaleadfields" id="ts-savelead-reason">\
						</select></td>\
					</tr>\
					<tr><td class="leaderr" colspan="2"><span id="error">&nbsp;</span></td></tr>\
				</table>\
			</div>\
		</div>'
        );
        $("#VHACaptureLeadDialog").dialog({
            resizable: false,
            autoOpen: false,
            modal: true,
            buttons: [{
                    text: "Cancel",
                    "class": "vha-custom-button btn vhasecondarybtn",
                    click: function() {
                        $(this).dialog("close");
                        $("#error").hide();
                    }
                },
                {
                    text: "Submit",
                    "class": "vha-custom-button btn btn-secondary vhacntbtn",
                    click: function() {
                        if (($("#ts-savelead-reason").val() == "Choose Discard Reason")) {
                            $("#error").text("Please select discard reason");
                            $("#error").show();
                        } else {
                            var headerBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
                            var cancelbsWF = SiebelApp.S_App.GetService("Workflow Process Manager");
                            var cancelInputs = SiebelApp.S_App.NewPropertySet();
                            var Inps = SiebelApp.S_App.NewPropertySet();
                            var Outs = SiebelApp.S_App.NewPropertySet();
                            Inps.SetProperty("ProcessName", "VHA Create New Lead Workflow");
                            cancelInputs.SetProperty("ProcessName", "VHA 3 Step Upgrade Cancel WF");
                            cancelInputs.SetProperty("Object Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Id"));
                            cancelInputs.SetProperty("Event", "Cancel");
                            Inps.SetProperty("Discard Reason", $("#ts-savelead-reason").val());
                            Inps.SetProperty("Name", $("#vhatscustname").text());
                            Inps.SetProperty("Session Id", headerBC.GetFieldValue("Id"));
                            Inps.SetProperty("Object Id", headerBC.GetFieldValue("Id"));
                            Inps.SetProperty("Source", "3StepUpgradeWizard");
                            Inps.SetProperty("CustomerAccountId", headerBC.GetFieldValue("Account Id"));

                            Outs = VHAAppUtilities.CallWorkflow("VHA Create New Lead Workflow", Inps, {});
                            var cancelOutputs = cancelbsWF.InvokeMethod("RunProcess", cancelInputs);
                           // SiebelApp.S_App.GotoView("VF Dashboard List View - TBUI");
						   var Inps = SiebelApp.S_App.NewPropertySet();
							var Outs = SiebelApp.S_App.NewPropertySet();
							Inps.SetProperty("BusObjName", "VF Asset");
							Inps.SetProperty("BusCompName", "Asset Mgmt - Asset - Header");
							Inps.SetProperty("RowId", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Root Asset Id"));
							Inps.SetProperty("ViewName", "VF Asset Summary View - with extra IN fields");
							Outs = VHAAppUtilities.CallBS(
							"VHA MSISDN GotoView BS",
							"GotoView",
							Inps, {}
							);


                            cancelInputs.Reset();
                            cancelOutputs.Reset();
                            $(this).dialog("close");
                        }
                    }
                }
            ],
            width: "500px",
            position: {
                my: "center",
                at: "center",
                of: window
            }
        });
        mAppendOptionList("VHA_TS_SAVELEAD", "#ts-savelead-reason");
    }

	function deviceplanSelectDiv(){
		$(".vha-sc-device-select-main").html('<div class="vha-sc-device-group">\
			 <div class="row vha-sc-greyclr-bg-white mt-3 vha-sc-upgrade-buttons VHASCDisplayNone mx-0">\
				<span class="vha-sc-exist-cus-overide">Override Upgrade Eligibility</span>\
				<select id = "sc-override-reason" name="data-addon" class="vha-sc-dev-plan-drp-dwn  pl-2 vha-sc-txt-style-drp-dwn">\
				</select>\
				<button class="btn vhascppbtn-new vha-sc-mleft-30px applet-button-active" id="vha-sc-dev-upgrade-btn">Upgrade to New Plan</button>\
				<button class="btn vhascppbtn-new vha-sc-mleft-15px" id="vha-sc-dev-rrp-btn">RRP on Installment</button>\
				<button class="btn vhascppbtn-new vha-sc-mleft-15px" id="vha-sc-dev-resign-btn">Resign</button>\
			 </div>\
			 <div id="vha-sc-reason-main" class= "vha-sc-reason-main">\
					<div id="vha-sc-upg-reason" class= "sc-text-warning-red VHASCDisplayNone"></div>\
					<div id="vha-sc-rrp-reason" class= "sc-text-warning-red VHASCDisplayNone"></div>\
					<div id="vha-sc-resign-reason" class= "sc-text-warning-red VHASCDisplayNone"></div>\
			</div>\
			<div class="vha-sc-simonlyupg">\
					 <input type="checkbox" id="tickmark" class = "vha-sc-simoupg-val">\
					 <label id="slectbox" class="vha-sc-dev-plan-md-font"> SIM Only </label>\
			</div>\
			<div class="vha-sc-byod">\
					 <input type="checkbox" id="tickmark" class = "vha-sc-byod-val">\
					 <label id="slectbox" class="vha-sc-dev-plan-md-font"> BYOD </label>\
			</div>\
			<div class="vha-sc-device-select">\
			 <div class="vha-sc-searchdevice-col vha-sc-btn-div">\
				<div class="mb-1 vha-sc-dev-plan-md-font">Choose Device</div>\
				<div>\
				   <input id="sc-device-search" class="vha-sc-searchdevice" type="text">\
						<button class="vha-sc-searchdevice-btn" parid="#sc-device-search" data-allowdblclick="true"><span class="vha-sc-SearchDeviceIcon"></span></button>\
				</div>\
			 </div>\
			 <div class="vha-sc-btn-div vha-sc-btn-div-brand">\
				<div class="mb-1 vha-sc-lbl">Filter by Brand</div>\
				<div class="justify-content-left vha-sc-brandbtn"></div>\
			 </div>\
			 <div class="vha-sc-btn-div vha-sc-btn-div-payment">\
				<div class="mb-1 vha-sc-lbl">Payment Term</div>\
				<div class="justify-content-left vha-sc-paytermbtn"></div>\
			 </div>\
			 <div class="vha-sc-btn-div vha-sc-btn-div-brand d-flex">\
				<div class="mb-1 vha-sc-lbl">Shipping Postal Code</div>\
				<div class="justify-content-left">\
					<input type="text" class="vha-sc-shipZipCode" name="promoCode" placeholder="Postal Code">\
				</div>\
			 </div>\
			 <div class="row justify-content-center vha-sc-carousel-container" id="vha-sc-d-carousel-container"></div>\
			 <div id="vha-sc-d-stockerrmsg" class ="sc-text-warning-red">Select device to see stock availability. Enter post code to check estimated shipping date</div>\
             <div id="vha-sc-d-equiplmtmsg" class="sc-text-warning-red VHASCDisplayNone"></div>\
		</div>\
		<div class="vha-h-line"></div>\
		<div class="vha-sc-plan-select">\
			<div class="vha-sc-searchplan-col vha-sc-btn-div">\
				<div class="mb-1 pt-2 vha-sc-dev-plan-md-font">Choose Plan</div>\
				<div>\
					<input id="sc-plan-search" class="vha-sc-searchplan" type="text">\
					<button class="vha-sc-searchdevice-btn" parid="#sc-plan-search" data-allowdblclick="true"><span class="vha-sc-SearchDeviceIcon"></span></button>\
				</div>\
			</div>\
			<div class="vha-sc-btn-div vha-sc-btn-div-bottom-div">\
					<div class="mt-4 pl-3 mb-3 vha-sc-font-sty-acess-wear"><span>Filter by Service</span></div>\
					<div class="justify-content-center vha-sc-plantypebtn"></div>\
			</div>\
			<div class="row justify-content-center vha-sc-carousel-container" id="vha-sc-p-carousel-container"></div>\
			<div class="row vha-sc-empty-row"></div>\
		</div>');  
	}
	
	function configServiceDiv(){
		$(".vha-sc-configservice-select").html('<div class="row vha-sc-cfg-row1">\
			<!-- ********************8   first column ***************************-->\
			<div class="col bg-white border vha-sc-config-col1">\
			<div class="ml-3 mt-4 vha-sc-txt-style-black-bold"><span>Configure Additional Features</span></div>\
				<div class="ml-3 mt-4 vha-sc-txt-style VHASCDisplayNone"><span>International Roaming Plan to be Active on</span></div>\
				<div class="row vha-sc-greyclr mt-1 mx-3 VHASCDisplayNone">\
					<ul class="vha-sc-list-style d-flex py-3 vha-sc-txt-style-black vha-sc-in-roaming">\
						<li><input type="radio" class="ml-4 vha-sc-config-roam" id="vha-sc-in-roam-Roaming" name="intern-roam" value="$5 Roaming"> <label for="vha-sc-in-roam-Roaming" class="pl-2">$5 Roaming</label></li>\
						<li><input type="radio" class="vha-sc-mleft-42px vha-sc-config-roam" id="vha-sc-in-roam-pay-as" name="intern-roam" value="Pay as You Go">\
						<label for="vha-sc-in-roam-pay-as" class="pl-2">Pay as You Go</label><br></li>\
						<li><input type="radio" class="ml-4 vha-sc-config-roam" id="vha-sc-in-roam-off" name="intern-roam" value="Off"> <label for="vha-sc-in-roam-off" class="pl-2">Off</label></li>\
					</ul>\
				</div>\
				<div class="ml-3 mt-4 vha-sc-txt-style" id = "vha-sc-dataaddons"><span>Add Data Add-Ons</span></div>\
				<div class="row vha-sc-greyclr vha-sc-dataaddons-main mt-1 mx-3">\
					<ul class="vha-sc-list-style d-flex py-3 vha-sc-txt-style-black vha-sc-da-adon">\
						<li style="display: none;"><input type="radio" class="ml-4 vha-sc-dataaddonradio" id="vha-sc-da-adon-nt" name="data-addon" value="Not Interested"> <label for="vha-sc-da-adon-nt" class="pl-2">Not Interested</label></li>\
						<li><input type="radio" class="ml-4 vha-sc-dataaddonradio" id="vha-sc-da-adon-oneof" name="data-addon" value="One Off"> <label for="vha-sc-da-adon-oneof" class="pl-2">One Off</label><br></li>\
						<li><input type="radio" class="vha-sc-mleft-67px vha-sc-dataaddonradio" id="vha-sc-da-adon-recur" name="data-addon" value="Recurring"> <label for="vha-sc-da-adon-recur" class="pl-2">Recurring</label></li>\
						<li><div name="data-addon" class="VHASCDisplayNone vha-sc-data-addon-container">\
								<input id="vha-sc-feature-config-addon" class = "vha-sc-cfg-txtbox-medium pl-2 vha-sc-txt-style-drp-dwn vha-sc-in-addon-drp" placeholder="select"/>\
								<span class="siebui-icon-dropdown applet-form-combo applet-list-combo vha-sc-addon-drop-down vha-sc-txt-style-drp-dwn" parId="#vha-sc-feature-config-addon" data-allowdblclick="true"></span>\
							</div>\
						</li>\
					</ul>\
				</div>\
				<div class="ml-3 mt-4 vha-sc-txt-style"><span>Add International Calls Add-Ons</span></div>\
				<div class="row vha-sc-greyclr vha-sc-iddaddons-main mt-1 mx-3">\
					<ul class="vha-sc-list-style d-flex py-3 vha-sc-txt-style-black vha-sc-in-calls">\
						<li style="display: none;"><input type="radio" class="ml-4 vha-sc-idd-addons" id="vha-sc-in-calls-nt" name="intern-calls" value="Not Interested"> <label for="vha-sc-in-calls-nt" class="pl-2">Not Interested</label></li>\
						<li><input type="radio" class="ml-4 vha-sc-idd-addons" id="vha-sc-in-calls-oneof" name="intern-calls" value="One Off"> <label for="vha-sc-in-calls-oneof" class="pl-2">One Off</label><br></li>\
						<li><input type="radio" class="vha-sc-mleft-67px vha-sc-idd-addons" id="vha-sc-in-calls-recur" name="intern-calls" value="Recurring"> <label for="vha-sc-in-calls-recur" class="pl-2">Recurring</label></li>\
						<li><div name="idd-addon" class="VHASCDisplayNone vha-sc-idd-addon-container">\
								<input id="vha-sc-feature-config-idd" class = "vha-sc-cfg-txtbox-medium pl-2 vha-sc-txt-style-drp-dwn vha-sc-in-idd-drp" placeholder="select"/>\
								<span class="siebui-icon-dropdown applet-form-combo applet-list-combo vha-sc-idd-drop-down vha-sc-txt-style-drp-dwn" parId="#vha-sc-feature-config-idd" data-allowdblclick="true"></span>\
							</div>\
						</li>\
						<li><div class="VHASCDisplayNone vha-sc-data-addonterm-container">\
								<input class="vha-sc-cfg-txtbox-small pl-2 vha-sc-txt-style-drp-dwn vha-sc-in-terms-addon-drp" id="vha-sc-feature-config-termidd" placeholder="select term"/>\
								<span class="siebui-icon-dropdown applet-form-combo applet-list-combo vha-sc-termidd-drop-down vha-sc-txt-style-drp-dwn" parId="#vha-sc-feature-config-termidd" data-allowdblclick="true"></span>\
							</div>\
						</li>\
					</ul>\
				</div>\
				<div class="ml-3 mt-4 vha-sc-txt-style VHASCDisplayNone"><span>Add Other Add-Ons</span></div>\
				<div class="row vha-sc-greyclr mt-1 mx-3 VHASCDisplayNone">\
					<ul class="vha-sc-list-style d-flex py-3 vha-sc-txt-style-black vha-sc-oth-adon">\
						<li style="display: none;"><input type="radio" class="ml-4" id="vha-sc-oth-adon-nt" name="other-addon" value="Not Interested"> <label for="vha-sc-oth-adon-nt" class="pl-2">Not Interested</label></li>\
						<li><input type="radio" class="ml-4" id="vha-sc-oth-adon-oneof" name="other-addon" value="One Off"> <label for="vha-sc-oth-adon-oneof" class="pl-2">One Off</label><br></li>\
						<li><input type="radio" class="vha-sc-mleft-67px" id="vha-sc-oth-adon-recur" name="other-addon" value="Recurring"> <label for="vha-sc-oth-adon-recur" class="pl-2">Recurring</label></li>\
						<li> <select name="other-addon" class="vha-sc-cfg-txtbox-medium pl-2 vha-sc-txt-style-drp-dwn vha-sc-other-addon-drp">\
								<option value="Select" hidden>Select</option>\
								<!--<option value="$10 International Value Pack">$10 International Value Pack</option>\
								<option value="Extra IDD 30min - 23 countries">Extra IDD 30min - 23 countries</option>\
								<option value="Extra IDD 1000min - 12 countries">Extra IDD 1000min - 12 countries</option>-->\
							</select> \
						</li>\
					</ul>\
				</div>\
				<div class="ml-3 mt-4 vha-sc-txt-style"><span>Add Manual Discounts</span></div>\
				<div class="row vha-sc-greyclr mt-1 mx-3 vha-sc-btm-mrgn">\
					<ul class="vha-sc-list-style d-flex py-3 vha-sc-txt-style-black vha-sc-res-dis">\
						<li><input type="radio" class="ml-4 vha-sc-res-discaddon" id="vha-sc-res-dis-nt" name="restrict-dis" value="Not Interested"> <label for="vha-sc-res-dis-nt" class="pl-2">Not Interested</label></li>\
						<li><input type="radio" class="ml-4 vha-sc-res-discaddon" id="vha-sc-res-dis-recur" name="restrict-dis" value="Recurring"> <label for="vha-sc-res-dis-recur" class="pl-2">Recurring</label></li>\
					</ul>\
				</div>\
				<div class="row vha-sc-cfg-row2 VHASCDisplayNone"><!-- nov 28 start -->\
			<div class="col bg-white vha-sc-config-col2">\
				<div class="row vha-sc-greyclr-h35px mt-4 mx-3 vha-sc-txt-style-black">\
					 <span class="vha-sc-pleft-70px">Products</span> \
					 <span class="vha-sc-pleft-360px">Amount</span> \
					 <span class="vha-sc-pleft-70px">Period</span> \
					 <!--<span class="vha-sc-pleft-70px">Reason Code</span> -->\
				</div>\
				<div class="row vha-sc-greyclr-h50px mt-1 mx-3">\
					<ul class="vha-sc-list-style d-flex py-2 vha-sc-subs-dis-head">\
						<li><input type="Checkbox" class="vha-sc-mleft-27px vha-sc-subs-dic-shopped" id="vha-sc-subs-dis" name="subs-discount" value="Subscription Level $"> <label for="vha-sc-subs-dis" class="pl-2 vha-sc-txt-style">Subscription $ Discount</label></li>\
						<li><input type="text" class="vha-sc-txtbox-small-mleft-105px vha-sc-subs-dic-shopped" id="vha-sc-subs-dis-amt" name="subs-discount" value=""></li> \
						<li><div class="vha-sc-data-restdiscterm1-container">\
								<input class="vha-sc-cfg-txtbox-small pl-2 vha-sc-txt-style-drp-dwn vha-sc-restdisc1-term-drp" id="vha-sc-feature-config-termrestdisc1" placeholder="select term"/>\
								<span class="siebui-icon-dropdown applet-form-combo applet-list-combo vha-sc-termrestdisc1-drop-down vha-sc-txt-style-drp-dwn" parId="#vha-sc-feature-config-termrestdisc1" data-allowdblclick="true"></span>\
							</div>\
						</li>\
					</ul>\
				</div>\
				<div class="row vha-sc-greyclr-h50px mt-1 mx-3">\
					<ul class="vha-sc-list-style d-flex py-2 vha-sc-vip-dis-head">\
						<li><input type="Checkbox" class="vha-sc-mleft-27px" id="vha-sc-vip-dis" name="vip-discount" value="VIP Discount - 5% "> <label for="vha-sc-vip-dis" class="pl-2 vha-sc-txt-style">Subscription % Discount</label></li>\
						<li><input type="text" class="vha-sc-txtbox-small-mleft-150px" id="vha-sc-vip-dis-amt" name="vip-discount" value=""></li>\
						<li><div class="vha-sc-data-restdiscterm2-container">\
								<input class="vha-sc-cfg-txtbox-small pl-2 vha-sc-txt-style-drp-dwn vha-sc-restdisc2-term-drp" id="vha-sc-feature-config-termrestdisc2" placeholder="select term"/>\
								<span class="siebui-icon-dropdown applet-form-combo applet-list-combo vha-sc-termrestdisc2-drop-down vha-sc-txt-style-drp-dwn" parId="#vha-sc-feature-config-termrestdisc2" data-allowdblclick="true"></span>\
							</div>\
						</li>\
					</ul>\
				</div>\
			</div>\
		</div><!-- nov 28 end-->\
				<div class="ml-3 mt-4 vha-sc-txt-style"><span>Device Care</span></div>\
				<div class="ml-3 mt-4 vha-sc-txt-style vha-sc-greyclr">\
					<div class="py-4">\
					<span class="vha-sc-wear-pickdv-care vha-sc-font-sty-acess-wear ml-4">Pick Device Care</span>\
						<input class="input-field ui-autocomplete-input" id="vha-sc-phoneins" autocomplete="off" style="margin-left: 20px;" />\
						<span id="vha-sc-device-care-dropdown" class="siebui-icon-dropdown applet-form-combo applet-list-combo" parid="#vha-sc-phoneins" data-allowdblclick="true"></span>\
					</div>\
				</div>\
				<div class="ml-3 mt-4 vha-sc-txt-style"><span>Trade In</span></div><!-- nov 28 start-->\
				<div class="row vha-sc-greyclr mt-1 mx-3 vha-sc-btm-mrgn">\
					<ul class="vha-sc-list-style d-flex py-3 vha-sc-txt-style-black vha-sc-res-dis">\
						<li><span class="pl-4 vha-sc-txt-style-black">Amount</span><input type="text" class="vha-sc-trade-txtbox"></li>\
						<li class="d-flex" ><span class="pl-4 pt-2 vha-sc-txt-style-black">Period</span><div class="vha-sc-data-restdiscterm2-container">\
								<input class="vha-sc-cfg-txtbox-small pl-2 vha-sc-txt-style-drp-dwn vha-sc-restdisc2-term-drp" id="vha-sc-trade-termrestdisc" placeholder="select term"/>\
								<span class="siebui-icon-dropdown applet-form-combo applet-list-combo vha-sc-trade-termrestdisc-drop-down vha-sc-txt-style-drp-dwn" parId="#vha-sc-trade-termrestdisc" data-allowdblclick="true"></span>\
							</div>\
							</li>\
					</ul>\
				</div><!-- nov 28 end-->\
			</div> <!--  *********************   first column   ******************************************************-->   \
		</div><!-- ********************   first row ***************************-->');
	}
	
	function accessorySelectDiv(){
		$(".vha-sc-accessory-select").html('<div class="row gx-5 mx-0">\
			<div class="col bg-white border vha-sc-wear-col1">\
				<div class="mt-3 mb-3 vha-sc-txt-style-black-bold vha-sc-smartwearbles"><span>Smart Wearables</span></div>\
				<div class="row vha-sc-greyclr-new vha-sc-bg-purple-clr flex-column mt-2" id="vha-sc-wear-brd-main">\
					<div class="vha-sc-font-sty-acess-wear mt-2 vha-sc-wear-fltby-brand">\
						<div class="mb-3">\
						   <span class = "vha-sc-white-color-fnt" style="margin-right: 8px;">Make/Model</span>\
						   <input id="sc-secdevice-search" class="vha-sc-searchdevice" type="text">\
								<button class="vha-sc-searchdevice-btn" parid="#sc-secdevice-search" data-allowdblclick="true"><span class="vha-sc-SearchDeviceIcon"></span></button>\
						</div>\
						<div>\
						   <span class = "vha-sc-white-color-fnt">Variant Name</span>\
						   <input id="sc-secdevice-v-search" class="vha-sc-searchdevice" type="text">\
								<button class="vha-sc-searchdevice-btn" parid="#sc-secdevice-v-search" data-allowdblclick="true"><span class="vha-sc-SearchDeviceIcon"></span></button>\
								<div id="vha-sc-we-variant-reason" class= "sc-text-warning-red VHASCDisplayNone"></div><!-- DEC 12-->\
						</div>\
					</div>\
				</div>\
				<div class="row vha-sc-whiteclr-new vha-sc-secdvc_pt-btns flex-column">\
					<div class="vha-sc-wear-fltby-brand mt-5">\
						<span class="vha-sc-font-sty-acess-wear">Payment Term</span>\
						<button class="btn vhascppbtn vha-sc-pp-btn ml-5" id="vha-sc-wear-payterm12-btn" term="12">12</button>\
						<button class="btn vhascppbtn vha-sc-pp-btn ml-2" id="vha-sc-wear-payterm24-btn" term="24">24</button>\
						<button class="btn vhascppbtn vha-sc-pp-btn ml-2" id="vha-sc-wear-payterm36-btn" term="36">36</button>\
						<div id="vha-sc-we-payterm-reason" class= "sc-text-warning-red VHASCDisplayNone mt-1"></div><!-- DEC 12-->\
					</div>\
				</div>\
				<div class="row vha-sc-greyclr-new flex-column">\
					<div class="vha-sc-wear-fltby-brand mt-5 ts-secondary-device">\
						<span class="vha-sc-wear-pickdv-care vha-sc-font-sty-acess-wear">Pick Device Care</span>\
							<input class="input-field ui-autocomplete-input" id="vhs-sc-sddevice-care" autocomplete="off" style="margin-left: 20px;" />\
							<span id="vha-sc-sddevice-care-dropdown" class="siebui-icon-dropdown applet-form-combo applet-list-combo" parid="#vhs-sc-sddevice-care" data-allowdblclick="true"></span>\
						<button class="btn vhascppbtn-new-sm mr-5" id="vha-sc-wear-add-btn">Add</button>\
					</div>\
				</div>\
						<!-- ******************** Hari & Pradeep  Wearables Table ***************************-->\
				<div class="vha-sc-wear-table-main VHASCDisplayNone">\
				<div class="mt-3 vha-sc-txt-style-black-bold"><span>Selected Wearables List</span></div>\
				<div class="vha-sc-greyclr-access-new mt-2 mb-3" id="vha-sc-wearables-table">\
				<div class="vha-sc-flex_row_container NCIdrecHeader">\
					<div class="vha-sc-accessory-font vha-sc-acc-name" style="width: 40%;">Accessory Name</div>\
					<div class="vha-sc-accessory-font vha-sc-acc-prd" style="width: 15%;">Product Code</div>\
					<div class="vha-sc-accessory-font vha-sc-acc-term" style="width: 10%;">Term</div>\
					<div class="vha-sc-accessory-font vha-sc-acc-dvccare" style="width: 25%;">Device Care</div>\
					<div style="width: 8%;"></div>\
				</div>\
				</div>\
				</div>\
			</div>\
		</div>\
		<!-- ******************** Accessories  first row ***************************-->\
		<!-- ******************** Accessories  second row ***************************-->\
		<div class="row gx-5 mx-0">\
			<div class="col bg-white border vha-sc-acces-col1">\
				<div class="mt-4 vha-sc-txt-style-black-bold vha-sc-Accessory"><span>Accessory</span></div>\
				<div class="row vha-sc-greyclr-new vha-sc-bg-purple-clr flex-column mt-2">\
					<div><div class="mb-3 VHASCDisplayNone">\
						   <span style="margin-right: 8px;">Category</span>\
						   <input id="sc-acc-cat-search-add" class="vha-sc-searchdevice" type="text">\
								<button class="vha-sc-searchdevice-btn" parid="#sc-acc-cat-search" data-allowdblclick="true"><span class="vha-sc-SearchDeviceIcon"></span></button>\
						</div>\
						<div class="mb-3 VHASCDisplayNone">\
						   <span style="margin-right: 8px;">Make/Model</span>\
						   <input id="sc-makemod-search-add" class="vha-sc-searchdevice" type="text">\
								<button class="vha-sc-searchdevice-btn" parid="#sc-makemod-search" data-allowdblclick="true"><span class="vha-sc-SearchDeviceIcon"></span></button>\
						</div>\
						<div class="mb-3 mt-2 vha-sc-font-sty-acess-wear"><!-- jan 23  above change dupliacte ids-->\
						   <span class="ml-5 vha-sc-white-color-fnt" style="margin-right: 8px;">Category</span>\
						   <input id="sc-acc-cat-search" class="vha-sc-searchdevice-new-ml-5" type="text">\
								<button class="vha-sc-searchdevice-btn" parid="#sc-acc-cat-search" data-allowdblclick="true"><span class="vha-sc-SearchDeviceIcon"></span></button>\
						</div>\
						<div class="vha-sc-font-sty-acess-wear vha-sc-wear-fltby-brand">\
						   <span class = "vha-sc-white-color-fnt" style="margin-right: 8px;">Accessory Name</span>\
						   <input id="sc-accname-search" class="vha-sc-searchdevice" type="text">\
								<button class="vha-sc-searchdevice-btn" parid="#sc-accname-search" data-allowdblclick="true"><span class="vha-sc-SearchDeviceIcon"></span></button>\
								<div id="vha-sc-acc-model-reason" class= "sc-text-warning-red VHASCDisplayNone mt-1"></div><!-- DEC 12-->\
						</div></div>\
				</div>\
				<div class="row vha-sc-whiteclr-new flex-column mt-2 vha-sc-acc_pt-btns">\
					<div class="mt-5 vha-sc-acces-payterm-btns">\
						<span class="mt-4 vha-sc-acces-payterm vha-sc-font-sty-acess-wear">Payment Term</span>\
						<button class="btn vhascppbtn vha-sc-pp-acc-btn ml-3" id="vha-sc-acces-payterm12-btn" term="12">12</button>\
						<button class="btn vhascppbtn vha-sc-pp-acc-btn ml-2" id="vha-sc-acces-payterm12-btn" term="24">24</button>\
						<button class="btn vhascppbtn vha-sc-pp-acc-btn ml-2" id="vha-sc-acces-payterm12-btn" term="36">36</button>\
						<button class="btn vhascppbtn-new-sm mr-5" id="vha-sc-acces-add-btn">Add</button>\
						<div id="vha-sc-acc-payterm-reason" class= "sc-text-warning-red VHASCDisplayNone mt-1"></div><!-- DEC 12-->\
					</div>\
				</div>\
						<!-- ******************** Hari & Pradeep Accessory Table ***************************-->\
				<div class="vha-sc-access-table-main VHASCDisplayNone">\
				<div class="mt-3 vha-sc-txt-style-black-bold"><span>Selected Device List</span></div>\
				<div class="vha-sc-greyclr-access-new mt-2 mb-3" id="vha-sc-accessory-table">\
				<div class="vha-sc-flex_row_container NCIdrecHeader">\
					<div class="vha-sc-accessory-font vha-sc-accessory-name" style="width: 40%;">Accessory Name</div>\
					<div class="vha-sc-accessory-font vha-sc-accessory-prd" style="width: 15%;">Product Code</div>\
					<div class="vha-sc-accessory-font vha-sc-accessory-term" style="width: 10%;">Term</div>\
					<div style="width: 8%;"></div>\
				</div>\
				</div>\
				</div>\
			</div>\
		</div>');
	}
	
	function prePaymentDiv(){//.vha-sc-prepayment-select
		$(".vha-sc-prepayment-st").html('<div class="row mx-0">\
			<div class="col bg-white border vha-sc-prepay">\
				<div class="ml-3 mt-3 mb-3 vha-sc-txt-style-black-bold"><span>Prepayment</span></div>\
				<div class="row vha-sc-greyclr mx-3">\
					<div class="pl-4 vha-sc-txt-style-pre-medium"><span>Prepayment Amount</span></div>\
					<input type="text" class="vha-sc-txtbox-medium-mleft-127px" id="vha-sc-pre-pay-amt-inp" name="prepayment-amt" value="">\
				</div>\
				<div class="row vha-sc-greyclr-h150px flex-column mx-3 mt-4 mb-4">\
				<div class="pl-4 mt-2 mb-2 vha-sc-txt-style-pre-medium"><span>Prepayment Shared To:</span></div>\
					<ul class="vha-sc-list-style pl-4 vha-sc-txt-style-pre-normal">\
						<li class>Primary Device\
							<span class="vha-sc-pleft-172px" id="vha-sc-pre-pay-prim-dev">$0.00</span>\
						  </li>\
						  <li class="pt-1">Wearables\
							<span class="vha-sc-pleft-207px" id="vha-sc-pre-pay-waerbles">$0.00</span>\
						  </li>\
						  <li class="pt-1">Accessory\
							<span class="vha-sc-pleft-202px" id="vha-sc-pre-pay-accessory">$0.00</span>\
						  </li>\
					</ul>\
				</div>\
			</div>\
		</div>');
	}

	function cartDiv(){
		$(".vha-sc-reviewSummary").html('<div id="vha-sc-SummaryCartApplet">\
			<div class="vha-sc-summaryMaindiv">\
				<div class="vha-sc-SummaryHeading"><span class="vha-sc-SummaryHeadingIcon"></span>Summary<span style="font-style: italic;font-size: 18px;margin-left: 10px;margin-top: 5px;">(Incl.GST)</span></div>\
					<div class="vha-sc-planDesign py-0"><!--Dec 19 start IRC-52-->\
						<span class="vha-sc-QuoteNumberIcon"></span>\
						<div class="vha-sc-cart-item-cont">\
							<div>\
								<span id="vha-sc-cart-quote-number" class="vha-sc-cart-quote-number">Quote Number</span>\
								<span id="vha-sc-cartsumcustquote" class="vha-sc-cartsumcustquote"></span>\
							</div>\
						</div>\
					</div><!--Dec 19 end-->\
					<div class="vha-sc-MobileandDataplan vha-sc-planDesign">\
						<span class="vha-sc-MobileandDataplanIcon"></span>\
						<div class="vha-sc-cart-deviceplan-parent vha-sc-cart-item-cont">\
							<div class="" id="vha-sc-deviceshopped">\
								<span id="vha-sc-cart-dvcname" class="vha-sc-cart-item"></span>\
								<span id="vha-sc-cart-dvccost" class="vha-sc-cart-cost"></span>\
							</div>\
							<div class="" id="vha-sc-planshopped">\
								<span id="vha-sc-cart-planname" class="vha-sc-cart-item"></span>\
								<span id="vha-sc-cart-plancost" class="vha-sc-cart-cost"></span>\
							</div>\
						</div>\
					</div>\
				<div class="vha-sc-DataIddDiviceCare vha-sc-planDesign">\
					<span class="vha-sc-DiviceCareIcon"></span>\
					<div class="vha-sc-addons-parent vha-sc-cart-item-cont">\
						<div class="" id="vha-sc-dataaddonshopped">\
							<span id="vha-sc-cart-dataaddon" class="vha-sc-cart-dataitem vha-sc-cart-item">Data</span>\
							<span id="vha-sc-cart-dataaddoncost" class="vha-sc-cart-datacost vha-sc-cart-cost">$0.00</span>\
						</div>\
						<div class="" id="vha-sc-iddaddonshopped">\
							<span id="vha-sc-cart-iddaddon" class="vha-sc-cart-idditem vha-sc-cart-item">IDD</span>\
							<span id="vha-sc-cart-iddaddoncost" class="vha-sc-cart-iddcost vha-sc-cart-cost">$0.00</span>\
						</div>\
						<div class="" id="vha-sc-devicecareshopped">\
							<span id="vha-sc-cart-dvccareaddon" class="vha-sc-cart-dvccareitem vha-sc-cart-item">Device Care</span>\
							<span id="vha-sc-cart-dvccarecost" class="vha-sc-cart-dvccarecost vha-sc-cart-cost">$0.00</span>\
						</div>\
						<div class="" id="vha-sc-Wearablecareshopped">\
							<span id="vha-sc-cart-Wearablecareaddon" class="vha-sc-cart-Wearablecareitem vha-sc-cart-item">Wearable Device Care</span>\
							<span id="vha-sc-cart-Wearablecarecost" class="vha-sc-cart-Wearablecarecost vha-sc-cart-cost">$0.00</span>\
						</div>\
					</div>\
				</div>\
				<div class="vha-sc-BundleDiscound vha-sc-planDesign">\
					<span class="vha-sc-BundleAndSaveSummary_Icon"></span>\
					<div class="vha-sc-bundleresdisc-parent vha-sc-cart-item-cont">\
						<div class="VHASCDisplayNone" id="vha-sc-bundlesaveshopped">\
							<span id="vha-sc-cart-bundlesaveaddon" class="vha-sc-cart-bundlesaveitem vha-sc-cart-item">Bundle & Save</span>\
							<span id="vha-sc-cart-bundlesaveaddoncost" class="vha-sc-cart-bundlesavecost vha-sc-cart-cost">$0.00</span>\
						</div>\
						<div class="" id="vha-sc-creditshopped">\
							<span id="vha-sc-cart-credit" class="vha-sc-cart-credit vha-sc-cart-item">Credit</span>\
							<span id="vha-sc-cart-creditcost" class="vha-sc-cart-creditcost vha-sc-cart-cost">$0.00</span>\
						</div>\
						<div class="" id="vha-sc-ldiscount">\
							<span id="vha-sc-cart-ldiscount" class="vha-sc-cart-ldiscount vha-sc-cart-item">Loyalty Discount</span>\
							<span id="vha-sc-cart-ldiscountcost" class="vha-sc-cart-ldiscountcost vha-sc-cart-cost">$0.00</span>\
						</div>\
						<div class="" id="vha-sc-restrictdischopped">\
							<span id="vha-sc-cart-restrictdiscaddon" class="vha-sc-cart-restrictdiscitem vha-sc-cart-item">Manual Discounts</span>\
							<span id="vha-sc-cart-restrictdiscaddoncost" class="vha-sc-cart-restrictdisccost vha-sc-cart-cost">$0.00</span>\
						</div>\
						<div class="" id="vha-sc-tradeinshopped">\
							<span id="vha-sc-cart-tradein" class="vha-sc-cart-tradeinitem vha-sc-cart-item">Trade In</span>\
							<span id="vha-sc-cart-tradeincost" class="vha-sc-cart-tradeincost vha-sc-cart-cost">$0.00</span>\
						</div>\
					</div>\
				</div>\
				<div class="vha-sc-SDAccessory vha-sc-planDesign">\
					<span class="vha-sc-Watch_Icon"></span><!-- nov 28 -->\
					<div class="vha-sc-SDAccessory-parent vha-sc-cart-item-cont">\
						<div class="" id="vha-sc-SDshopped">\
							<span id="vha-sc-cart-SDdvc" class="vha-sc-cart-SDitem vha-sc-cart-item">Secondary Device</span>\
							<span id="vha-sc-cart-SDdvccost" class="vha-sc-cart-SDdvccost vha-sc-cart-cost">$0.00</span>\
						</div>\
						<div class="" id="vha-sc-Accessoryshopped">\
							<span id="vha-sc-cart-Accessorydvc" class="vha-sc-cart-Accessoryitem vha-sc-cart-item">Accessory</span>\
							<span id="vha-sc-cart-Accessorycost" class="vha-sc-cart-Accessory vha-sc-cart-cost">$0.00</span>\
						</div>\
					</div>\
				</div>\
				<div class="vha-sc-DataOffers vha-sc-planDesign">\
					<span class="vha-sc-offer_Icon"></span><!-- nov 28 -->\
					<div class="vha-sc-offer-parent vha-sc-cart-item-cont">\
						<div class="" id="vha-sc-offershopped">\
							<span id="vha-sc-cart-dataOffer" class="vha-sc-cart-dataOffer vha-sc-cart-item">Data Offer</span>\
							<span id="vha-sc-cart-dataOfferGB" class="vha-sc-cart-dataOfferGB vha-sc-cart-gb">0 GB</span>\
						</div>\
						<div class="" id="vha-sc-iddoffshopped">\
							<span id="vha-sc-cart-iddOffer" class="vha-sc-cart-iddOffer vha-sc-cart-item">IDD Offer</span>\
							<span id="vha-sc-cart-iddOfferMins" class="vha-sc-cart-iddOfferMins vha-sc-cart-mins">0 Mins</span>\
						</div>\
					</div>\
				</div>\
				<div class="vha-sc-CostPM vha-sc-planDesign">\
					<span class="vha-sc-offer_Icon"></span>\
					<div class="vha-sc-offer-parent vha-sc-cart-item-cont" style="font-weight: 600;">\
						<div class="" id="vha-sc-costpm">\
							<span id="vha-sc-cart-permonth" class="vha-sc-cart-permonth vha-sc-cart-item">Cost Per Month</span>\
							<span id="vha-sc-cart-costpm" class="vha-sc-cart-costpm vha-sc-cart-cost">$0.00</span>\
						</div>\
						<div class="" id="vha-sc-otcost">\
							<span id="vha-sc-cart-onetime" class="vha-sc-cart-onetime vha-sc-cart-item">One Time Cost</span>\
							<span id="vha-sc-cart-otcost" class="vha-sc-cart-otcost vha-sc-cart-cost">$0.00</span>\
						</div>\
					</div>\
				</div>\
				<div class="vha-sc-PromoCode vha-sc-planDesign row">\
					<span></span>\
					<input type="text" class="vha-sc-PromoCodeInput" name="promoCode" placeholder="Enter Promo Code">\
					<button class="vha-sc-ApplyPromoBtn" id="vha-sc-ApplyPromoCode">Apply</button>\
					<button class="vha-sc-ApplyPromoBtn VHASCDisplayNone" id="vha-sc-RevertPromoCode">Revert</button>\
					<button class="vha-sc-ApplyPromoBtn" id="vha-sc-nbaofferbtn">NBA Offers</button>\
					<div class="vha-sc-invPromo VHASCDisplayNone">! Invalid Promo</div>\
				</div>\
				<div class="vha-sc-DevicePlanSave">\
					<button class="vha-sc-summarybtn vha-sc-totalNewbtn">Add to Quote</button>\
					<button class="vha-sc-summarybtn" id="vha-sc-save-rli">Save to Quote</button>\
					<button class="vha-sc-summarybtn" id="vha-sc-cancel-rli" style="float: right;">Remove</button>\
				</div>\
			</div>\
			<div class="panel-group vha-sc-ExistingCustCartSumPanel" id="accordion" role="tablist" aria-multiselectable="true">\
				<div class="panel panel-default">\
					<div class="panel-heading" role="tab" id="headingOne">\
						<h4 class="panel-title"><span class="vha-sc-CustDetails_Icon"></span>\
							<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"\
								aria-expanded="false" aria-controls="collapseOne">\
								Customer Details\
							</a>\
						</h4>\
					</div>\
					<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">\
						<div class="panel-body">\
							<div class="vha-sc-customerDetails vha-sc-planDesign">\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="panel panel-default  vha-sc-existingservices-main"><!-- nov 28 -->\
					<div class="panel-heading" role="tab" id="headingTwo">\
						<h4 class="panel-title"><span class="vha-sc-ExistingServicesIcon"></span>\
							<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"\
								aria-expanded="false" aria-controls="collapseTwo">\
								Existing Services\
							</a>\
						</h4>\
					</div>\
					<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">\
						<div class="panel-body">\
							<div class="vha-sc-ExistingServicesSum vha-sc-planDesigncart">\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="panel panel-default vha-sc-existingcontracts-main"><!-- nov 28 -->\
					<div class="panel-heading" role="tab" id="headingThree">\
						<h4 class="panel-title"><span class="vha-sc-ExistingContractIcon"></span>\
							<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree"\
								aria-expanded="false" aria-controls="collapseThree">Existing Contract</a>\
						</h4>\
					</div>\
					<div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">\
						<div class="panel-body">\
							<div class="vha-sc-ExistingContractsSum vha-sc-planDesigncart">\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="vha-sc-summaryBottom vha-sc-summarybtn-new">\
				<div class="vha-sc-activeServiceBottom pl-3 pr-2">\
					<span class="vha-sc-MnpAppDefbtm vha-sc-wd-cnt">2</span>\
					<span class="vha-sc-MnpAppDefbtm vha-sc-simo-cnt">1</span>\
					<span class="vha-sc-MnpAppDefbtm vha-sc-hi-cnt">0</span>\
					<span class="vha-sc-MnpAppDefbtm vha-sc-nbn-cnt">0</span>\
				</div>\
				<div class="vha-sc-activeServiceIcondiv pl-4 pr-2">\
					<span class="vha-sc-WithDeviceIcon"></span>\
					<span class="vha-sc-SimOnlyIconIcon"></span>\
					<span class="vha-sc-HomeInternetIcon"></span>\
					<span class="vha-sc-NbnDeviceIcon"></span>\
				</div>\
				 <div class="vha-sc-simHomeNbn">\
					<span>With Device</span>\
					<span>Sim Only</span>\
					<span>Home Internet</span>\
					<span class="vha-sc-simHomeNbnSpan">NBN</span>\
				</div>\
				<div class="vha-sc-deleteEdit-parent">\
				</div>\
				<div class="vha-sc-activeTotalAmt">\
					<span>Total cost per month</span>\
					<span id="vha-sc-cart-TotalAmt"></span>\
				</div>\
				<div class="vha-sc-activeTotalAmt">\
					<span>One time cost</span>\
					<span id="vha-sc-cart-Totalotc"></span>\
				</div>\
			</div>\
		</div>');
	}
	
	function tabHeaderli(){
		$('.vha-sc-allguidedtab-btns-init').html('<ul id="vha-sc-allguidedbtns-ul" class="vha-sc-allguidedbtns-ulcls">\
			<li class="vha-sc-devplan-li" id="vha-sc-devplan-li-id">\
				<button id="vha-sc-devplan-btn-lbl" class="vha-sc-devplan-btn vha-sc-devplan-active">Device and Plan</button>\
			</li>\
			<li class="vha-sc-confser-li" id="vha-sc-confser-li-id">\
				<button id="vha-sc-confser-btn-lbl" class="vha-sc-confser-btn">Configure Services</button>\
			</li>\
				<li class="vha-sc-acc-li" id="vha-sc-acc-li-id">\
				<button id="vha-sc-acc-btn-lbl" class="vha-sc-acc-btn">Accessories & Wearables</button>\
			</li>\
		</ul>');
	}
	
	function coverageCheckDiv(){
		$(".vha-sc-coveragechk-applet").html('<!--Coverage Check MOB/NBN buttons-->\
			 <div class="vha-sc-cvragechk-btns">\
				<!--ul id="vha-sc-tab-ul-cvrgchk" class="vha-sc-tabs-cvrgchk">\
				   <li class="vha-sc-cvragechk-mob-btn"><button id="vha-sc-cvragechk-mob-btnid" class="vha-sc-cvrage-mob-btncls vha-sc-cvrage-mob-active">Mobile & Home Internet Address</button></li>\
				   <span class="vha-sc-cvragechk-bar"></span>\
				   <li class="vha-sc-cvragechk-nbn-btn"><button id="vha-sc-cvragechk-nbn-btnid" class="vha-sc-cvrage-nbn-btncls">NBN</button></li>\
				</ul-->\
			 </div>  \
			 <!--Coverage Button Ends--> \
			 <!--       ******************Mobile & Home Internet Address  ***********************************  -->	\
			 <div class="vha-sc-address-coveragechk-mob" id="vha-sc-address-coveragechk-mobid">\
				<div class="vha-sc-address-coveragechk-mob-init">\
					<!--Mobile Address Select-->\
				   <div class="vha-sc-addressdetails-lbl vha-sc-btn-div vha-sc-gf-accordion">\
					  <span class="vha-sc-addressdetails-lblnm vha-color-white">Address Details</span>\
					  <input class="vha-sc-addressdetails-val" type="text"> \
					  <span></span>\
					  <div class="vha-sc-changeaddress-btn btn"  >\
						 <button class="btn vhascppbtn vha-color-blue vha-bgcolor-white" id="vha-sc-chngaddr-btn">Change Address</button>  \
					  </div>\
				   </div>\
				   <!--Mobile Address Select Ends-->\
				   <br><br>\
				   <div class="row mb-3 dflex">\
					  <div class="col-md-10 vha-sc-cvrgchk-tab-font">Coverage Check Details</div>\
				   </div>\
				   <div class="row mb-3 dflex">\
					  <div class="col-md-10 vha-sc-cvrgchk-subtab-font">Mobile Coverage</div>\
				   </div>\
				   <div class="row vha-sc-mobcvrg-btns-par">\
					  <div class="vha-sc-mobcvrg-btns col-md-10">\
						 <!--Hari 31/may/2024-->\
						 <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-3G-IO"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-3G-IO-mobile">3G - Indoor & Outdoor</span></button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-4G-IO"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-4G-IO-mobile">4G - Indoor & Outdoor</span></button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5G-O"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5G-O-mobile">5G - Outdoor Only</span></button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5GNSA-NC"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5GNSA-NC-mobile">5G - NSA - No Coverage</span></button>\
					  </div>\
				   </div>\
				   <br><br>\
				   <div class="row mb-3 dflex">\
					  <div class="col-md-10 vha-sc-cvrgchk-subtab-font">4G/5G  Home Internet</div>\
				   </div>\
				   <div class="row vha-sc-4G5G-btns-par">\
					  <div class="vha-sc-4G5G-btns col-md-10">\
						 <!--Hari 31/may/2024-->\
						<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-4G-Avl"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-4G-home-status">4G - Available</span></button>\
						&nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5G-NA"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5G-home-status">5G - Not Available</span></button>\
						&nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5GNSA-NA"><span class="vha-sc-coverageStatus"></span><span id="vha-sc-5GNSA-home-status">5G - NSA - Not Available</span></button>\
					  </div>\
					</div>\
					<br>\
				  <div class="vha-sc-address-coveragechk-nbn" id="vha-sc-address-coveragechk-nbnid">\
					<br>\
					<div class="row mb-3 dflex">\
					   <!--RajV Text changed on 14/OCT/2024--><div class="col-md-10 vha-sc-cvrgchk-subtab-font">Fixed Service Availability Status</div>\
					</div>\
					<div class="row vha-sc-nbnstat-par">\
					   <div class="vha-sc-nbnstat col-md-10">\
						  <!--Hari 31/may/2024-->\
						 <div class="vha-sc-mar28px">\
							<!--RajV Span Removed and Added new span 14/OCT/2024<span>Can Customer Get NBN:</span>\
							<input id="vha-sc-get-nbn-new" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\
							<span class="ml-5">NBN Available with Vodafone on:</span>\
							<input id="vha-sc-nbn-with-vodafone" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\
							</div>-->\
							<!--RajV Span Removed and Added new span 14/OCT/2024<span class="ml-5">NBN Available with Vodafone on:</span>\
							<input id="vha-sc-nbn-with-vodafone" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\-->\
							<span>Available Wholesalers:</span>\
							<input id="vha-sc-avail-wholesal" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\
							<span class="ml-5">Preferred Wholesaler :</span>\
							<input id="vha-sc-nbn-pref-wholesal" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\
							</div>\
							<div class="vha-sc-mar48px">\
							<span>Technology Type:</span>\
							<input id="vha-sc-nbn-tech-type" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\
							<span>Available On:</span>\
							<input id="vha-sc-nbn-avail-on" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\
							<br><br>\
							<span>New Development Charge:</span>\
							<input id="vha-sc-nbn-new-Devcharge" class="vha-sc-txtbox-medium vha-sc-btn-border-clr vha-input-bg-readonly" type="text" readonly>\
							</div>\
					   </div>\
					</div>\
					<br>\
					<div class="row mb-3 dflex">\
					   <!--Hari 31/may/2024-->\
					   <div class="col-md-10 vha-sc-cvrgchk-subtab-font">NBN Technology Description</div>\
					   &nbsp;&nbsp;<span id="vha-sc-nbn-tech-descrip" class="vha-sc-nbn-tech-descrip vha-sc-nbn-content"></span>\
					</div>\
					<br>\
					</div>\
					</div>\
				   </div>\
				   <br><br>\
				</div>\
			 </div>\
			 <!--Mobile & Home Internet Ends-->\
			 <!--******************NBN covearage Start***********************************  -->\
			 <!--div class="vha-sc-address-coveragechk-nbn VHASCDisplayNone" id="vha-sc-address-coveragechk-nbnid">\
				<div class="vha-sc-address-coveragechk-mob-init vha-sc-btn-div vha-sc-gf-accordion">\
				   <span class="vha-sc-connectaddr-lbl vha-color-white">Connection Address</span>\
				   <input class="vha-sc-connectaddr-val vha-sc-txtbox-large" type="text" >  \
					<span class="vha-sc-nbn-cantfindadrss" id="vha-sc-nbn-cantfindadrss" >Cant Find the address Refine Address Search</span>\
					<span></span>\
				   <div class="btn vha-sc-nbn-btns"  >\
					  <button class="btn vhascppbtn vha-color-blue vha-bgcolor-white" id="vha-sc-nbn-clearbtn">Clear</button>  \
				   </div>\
				</div><br>\
				<div class="vha-sc-nbnaddr vha-sc-btn-div">\
				   <span class="vha-sc-nbnaddr-lbl">NBN Address</span>\
				   <input class="vha-sc-nbnaddr-val vha-sc-txtbox-medium vha-sc-btn-border-clr" type="text">\
				   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class="vha-sc-nbnloc-lbl">NBN Location ID</span>\
				   <input class="vha-sc-nbnloc-val vha-sc-txtbox-medium vha-sc-btn-border-clr" type="text"> \
				   <div class="vha-sc-nbngo-btn btn">\
						 <button class="btn vhascppbtn vha-color-blue vha-bgcolor-white" id="vha-sc-nbngo-btn">Go</button>\
					</div>\
				</div>\
				<br>\
				<div class="row mb-3 dflex">\
				   <div class="col-md-10 vha-sc-cvrgchk-subtab-font">NBN Availability Status</div>\
				</div>\
				<div class="row vha-sc-nbnstat-par">\
				   <div class="vha-sc-nbnstat col-md-10">\
					  <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-getnbn"><span class="vha-sc-coverageStatus"></span>Can Customer Get NBN</button>\
					  <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-nbnavl"><span class="vha-sc-coverageStatus"></span>NBN Available with Vodafone on</button>\
					  <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-nbnfib"><span class="vha-sc-coverageStatus"></span>NBN Technology Type Fibre</button>\
				   </div>\
				</div>\
				<br>\
				<div class="row mb-3 dflex">\
				   <div class="col-md-10 vha-sc-cvrgchk-subtab-font">NBN Available with Vodafone on</div>\
				   &nbsp;&nbsp;<span class="vha-sc-nbn-content vha-sc-gf-grey-accordion">Service Class 3. Fibre to the premises (FTTP). Everything looks to be in places for nbn. IMPORTANT! If there is any used fixed services at this address you will need on Enhanced nbn check</span>\
				</div>\
				<br>\
			 </div-->\
			 <!--******************NBN covearage End***********************************  -->');
	}
	
	function coverageCheckDiv_backup(){
		$(".vha-sc-coveragechk-applet").html('<!--Coverage Check MOB/NBN buttons-->\
			 <div class="vha-sc-cvragechk-btns">\
				<ul id="vha-sc-tab-ul-cvrgchk" class="vha-sc-tabs-cvrgchk">\
				   <li class="vha-sc-cvragechk-mob-btn"><button id="vha-sc-cvragechk-mob-btnid" class="vha-sc-cvrage-mob-btncls vha-sc-cvrage-mob-active">Mobile & Home Internet Address</button></li>\
				   <span class="vha-sc-cvragechk-bar"></span>\
				   <li class="vha-sc-cvragechk-nbn-btn"><button id="vha-sc-cvragechk-nbn-btnid" class="vha-sc-cvrage-nbn-btncls">NBN</button></li>\
				</ul>\
			 </div>  \
			 <!--Coverage Button Ends--> \
			 <!--       ******************Mobile & Home Internet Address  ***********************************  -->	\
			 <div class="vha-sc-address-coveragechk-mob" id="vha-sc-address-coveragechk-mobid">\
				<div class="vha-sc-address-coveragechk-mob-init">\
					<!--Mobile Address Select-->\
				   <div class="vha-sc-addressdetails-lbl vha-sc-btn-div vha-sc-gf-accordion">\
					  <span class="vha-sc-addressdetails-lblnm vha-color-white">Address Details</span>\
					  <input class="vha-sc-addressdetails-val" type="text"> \
					  <span></span>\
					  <div class="vha-sc-changeaddress-btn btn"  >\
						 <button class="btn vhascppbtn vha-color-blue vha-bgcolor-white" id="vha-sc-chngaddr-btn">Change Address</button>  \
					  </div>\
				   </div>\
				   <!--Mobile Address Select Ends-->\
				   <br><br>\
				   <div class="row mb-3 dflex">\
					  <div class="col-md-10 vha-sc-cvrgchk-tab-font">Coverage Check Details</div>\
				   </div>\
				   <div class="row mb-3 dflex">\
					  <div class="col-md-10 vha-sc-cvrgchk-subtab-font">Mobile Coverage</div>\
				   </div>\
				   <div class="row vha-sc-mobcvrg-btns-par">\
					  <div class="vha-sc-mobcvrg-btns col-md-10">\
						 <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-3G-IO"><span class="vha-sc-coverageStatus"></span>3G - Indoor & Outdoor</button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-4G-IO"><span class="vha-sc-coverageStatus"></span>4G - Indoor & Outdoor</button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5G-O"><span class="vha-sc-coverageStatus"></span>5G - Outdoor Only</button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5GNSA-NC"><span class="vha-sc-coverageStatus"></span>5G - NSA - No Coverage</button>  \
					  </div>\
				   </div>\
				   <br><br>\
				   <div class="row mb-3 dflex">\
					  <div class="col-md-10 vha-sc-cvrgchk-subtab-font">4G/5G  Home Internet</div>\
				   </div>\
				   <div class="row vha-sc-4G5G-btns-par">\
					  <div class="vha-sc-4G5G-btns col-md-10">\
						 <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-4G-Avl"><span class="vha-sc-coverageStatus"></span>4G - Available</button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5G-NA"><span class="vha-sc-coverageStatus"></span>5G - Not Available</button>\
						 &nbsp&nbsp<button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-5GNSA-NA"><span class="vha-sc-coverageStatus"></span>5G - NSA - Not Available</button>\
					  </div>\
					  </div>\
				   </div>\
				   <br><br>\
				</div>\
			 </div>\
			 <!--Mobile & Home Internet Ends-->\
			 <!--******************NBN covearage Start***********************************  -->\
			 <div class="vha-sc-address-coveragechk-nbn VHASCDisplayNone" id="vha-sc-address-coveragechk-nbnid">\
				<div class="vha-sc-address-coveragechk-mob-init vha-sc-btn-div vha-sc-gf-accordion">\
				   <span class="vha-sc-connectaddr-lbl vha-color-white">Connection Address</span>\
				   <input class="vha-sc-connectaddr-val vha-sc-txtbox-large" type="text" >  \
				   <span></span>\
				   <div class="btn vha-sc-nbn-btns"  >\
					  <button class="btn vhascppbtn vha-color-blue vha-bgcolor-white" id="vha-sc-nbn-clearbtn">Clear</button>  \
				   </div>\
				</div><br>\
				<div class="vha-sc-nbnaddr vha-sc-btn-div">\
				   <span class="vha-sc-nbnaddr-lbl">NBN Address</span>\
				   <input class="vha-sc-nbnaddr-val vha-sc-txtbox-medium vha-sc-btn-border-clr" type="text">\
				   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class="vha-sc-nbnloc-lbl">NBN Location ID</span>\
				   <input class="vha-sc-nbnloc-val vha-sc-txtbox-medium vha-sc-btn-border-clr" type="text"> \
				</div>\
				<br>\
				<div class="row mb-3 dflex">\
				   <div class="col-md-10 vha-sc-cvrgchk-subtab-font">NBN Availability Status</div>\
				</div>\
				<div class="row vha-sc-nbnstat-par">\
				   <div class="vha-sc-nbnstat col-md-10">\
					  <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-getnbn"><span class="vha-sc-coverageStatus"></span>Can Customer Get NBN</button>\
					  <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-nbnavl"><span class="vha-sc-coverageStatus"></span>NBN Available with Vodafone on</button>\
					  <button class="btn vhascppbtn vha-sc-btn-border-clr" id="vha-sc-nbnfib"><span class="vha-sc-coverageStatus"></span>NBN Technology Type Fibre</button>\
				   </div>\
				</div>\
				<br>\
				<div class="row mb-3 dflex">\
				   <div class="col-md-10 vha-sc-cvrgchk-subtab-font">NBN Available with Vodafone on</div>\
				   &nbsp;&nbsp;<span class="vha-sc-nbn-content vha-sc-gf-grey-accordion">Service Class 3. Fibre to the premises (FTTP). Everything looks to be in places for nbn. IMPORTANT! If there is any used fixed services at this address you will need on Enhanced nbn check</span>\
				</div>\
				<br>\
			 </div>\
			 <!--******************NBN covearage End***********************************  -->');
	}
	
	function extistingCustDiv(){
		$('.vha-sc-extcustomerdtls').html('<div class="row vha-sc-existcustContractInfo">\
			<div class="col-7" id = "vha-sc-extcustinfo">\
				<div class="row gx-1 border bg-white">\
				  <div class="col-6 text-center d-flex">\
					<div class="p-1 pt-5">\
					  <span class="vha-sc-exxistingCustImg"></span>\
					  <h5 class="pt-3" id="CustomerName" style="color: #9D2AA0;"> </h5>\
					  <div class="pt-3 text-center"> <span class="vha-sc-customerSince-span"></span> <span id="CustomerSince"></span></div>\
					  <div class="p-4 d-flex">\
						<span class="vha-sc-custPhoneNumberIcon"></span>\
						<span class="font-weight-bold pr-4" id="MobileNumber"></span> \
						<span style="border-left: 1px solid #E5E5E5;"></span> \
						<span class="vha-sc-custEmailIcon"></span>\
						<span class="pl-4" id="EmailAddress"></span>\
					</div>\
					</div>\
				  </div>\
				  <div class="col-3">\
					<div class="p-1 pt-5">\
					  <ul class="vha-sc-existingCustService">\
						<li>Services Used\
						  <span id="CustomerType"></span>\
						</li>\
						<li>Active Services\
						  <span id="ActiveServices"></span>\
						</li>\
						<li>Quote Number\
						  <span id="QuoteNumber"></span>\
						</li>\
						<li>Mobile Number\
						  <span id="MobileNumber1"></span>\
						</li>\
					  </ul>\
					</div>\
				  </div>\
				  <div class="col-3 vha-sc-maxwidth22per">\
					<div class="p-1 pt-5">\
					  <ul class="vha-sc-existingCustService">\
						<li>Credit Check Status\
						  <span id="CreditCheckStatus"></span>\
						</li>\
						<li>Approved Services\
						  <span id="ApprovedServices"></span>\
						</li>\
						<li>Remaining Equipment Limit\
						  <span id="RemainingEquipmentLimit"></span>\
						</li>\
						<li>Email Address\
						  <span id="EmailAddress1"></span>\
						</li>\
					  </ul>\
					</div>\
				  </div>\
				</div>\
			</div>\
			 <div class="col-5" id = "vha-sc-extcontractinfo">\
				<div class="p-1 mt-1 border pt-5 bg-white">\
					<div class="vha-existingContract_bg">Existing Contract and Charges Out</div>\
					<div class="vha-existingContractList" id="vha-existingContractListId"></div>\
				</div>\
			</div>\
		</div>\
		<div class="row" id="vha-sc-extservices">\
			<div class="col">\
				<div class="vha-existingContract_bg">\
					<span>Existing account - BAN ending in ....<span id="vha-sc-ban-endnum"></span></span>\
					<button class="vha-sc-existingCustShowQuotes btn vha-sc-btns-color ml-3" id="vha-sc-existingCustShowQuotes">Show Quotes Only</button>\
					<button class="vha-sc-existingCustShowContract btn vha-sc-btns-color ml-3 vha-sc-totalNewbtn-disable" id="vha-sc-existingCustShowContract">Show Services Only</button>\
					<button class="vha-sc-existingCustNew btn vha-sc-btns-color" id="vha-sc-existingCustNew">New</button>\
				</div>\
				<div class="vha-sc-exiAccBanList" id="ExistingMSIDNList"></div>\
			</div>\
		</div>');
	}	
	
	
	function wearablesListDiv(objSD){
		return '<div class="vha-sc-flex_row_container vha-sc-we-NCIdrecLines" productcd="' + objSD.Accessory__Code + '"><div name="Accessory Name" class="vhaidattflds" id="sc-acc-name" style="width: 40%;padding-right: 1.5px;padding-left:3px;">' + objSD.Accessory__Name + '</div><div name="Product Code" class="vhaidattflds" id="sc-prod-code" style="width: 15%;">' + objSD.Accessory__Code + '</div><div name="Term" class="vhaidattflds" id="sc-term" style="width: 10%;">' + objSD.Term + '</div><div name="Device Care" class="vhaidattflds" id="sc-dvc-care" style="width: 25%;">' + objSD.Insurance + '</div><div style="width: 8%;"><button id="secremove" class="btn vhascppbtn-new-sm" productcd="' + objSD.Accessory__Code + '">Remove</button></div></div>'
	}
	
	function accessoryListDiv(objAcc){
		return '<div class="vha-sc-flex_row_container vha-sc-acc-NCIdrecLines" productcd="' + objAcc.Accessory__Code + '"><div name="Accessory Name" class="vhaidattflds" id="sc-acc-name" style="width: 40%;padding-right: 1.5px;padding-left:3px;">' + objAcc.Accessory__Name + '</div><div name="Product Code" class="vhaidattflds" id="sc-prod-code" style="width: 15%;">' + objAcc.Accessory__Code + '</div><div name="Term" class="vhaidattflds" id="sc-term" style="width: 10%;">' + objAcc.Term + '</div><div style="width: 8%;"><button id="accremove" class="btn vhascppbtn-new-sm" productcd="' + objAcc.Accessory__Code + '">Remove</button></div></div>';
	}
	
	function nbaOfferdiv(){
		$("#nbagridContainer").remove();
		$("body").append('<div id="nbagridContainer" title="NBA Offers">\
			<table id="nbajqGrid"></table>\
			<div id="nbajqGridPager"></div>\
		</div>');
		$("#nbagridContainer").dialog({
			resizable: false,
			autoOpen: false,
			modal: true,
			buttons: [
				{
					text: "Cancel",
					"class": "vha-custom-button btn vhasecondarybtn",
					click: function() {
						$(this).dialog("close");
						//$("#error").hide();
					}
				}
			],
			width: "1100px",
			position: {
				my: "center",
				at: "center",
				of: window
			},
		});
	}
}