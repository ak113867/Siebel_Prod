if (typeof VHASalesCalculatorSSJTemplate === "undefined") {
    var VHASalesCalculatorSSJTemplate = {};
	
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
					ActiveServices: 0,
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
				ExistingServices:[],
				RootItem: [{
						Action:"", //Existing or Add 
						Mode: "", // Edit or Saved
						SimO:"",
						CartStatus: "", //Cart status
						Id: "", // QLI-1
						AssetId:"",// Only for existing
						MSISDN:"",
						AppCount:0,
						MPPCount:0,
						Service: "",
						SrvPerMth: 0,
						TotalSrvPerMth: 0,
					    mobilefirst :"N",
						mobilePlanfirst :"N",
						tabletfirst :"N",
						tabletPlanfirst :"N",
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
						PlanItem:{
							    // Type:"Plan",
								// Action: "",
								// Name: "",
								// Code:"",
								// ProdIntegrationId:"",
								// Price: 0,
								// Descr: "" 
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
						TabletItem: [],
						SecondaryItem: [/*{
								Type:"Secondary Device",
								Action: "", //Add or Existing
								Name: "",
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
							} */
						],
						AccItem: [/*{
								Type:"Accessory",
								Action: "", // Add or Existing (AccItemChild not required)
								Name: "",
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
						],
						offers: [/*{
								OfferId: "",
								ProductCode:"",
								Period: "",
								GPI:"Credit",
								OfferCode: "",
								SplRatingType: "",
								ProdId: "",
								Credit: "",
								Data: "",
								Loyality:"",
								ProductName: ""
							}*/
						],
						mspOffers: {/*
							Entity: "Item", 
							ItmDiscName: "Bundle and Save", 
							NewMSPDiscVal: "0", 
							NewMSPEligible: "Y", 
							NewMSPSeq: "S2", 
							NewPlanId: "AU88808", 
							NewProposId: "AUP8801", 
							NewSequence: "1", 
							PrevMSPDiscVal: "", 
							PrevMSPEligible: "N", 
							PrevPlanId: "", 
							PrevProposId: "", 
							PrevSequence: "", 
							RowAction: "AddItem", 
							RtAssetId: "", 
							RtQliId: "QLI-8828", 
							SrvType: "New Service", 
							ToProcess: "Y"*/
						}
						
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

    function MainTabsUI() { 
	    $(".vha-scj-st3-tabs").html("");
		$(".vha-scj-st3-tabs").html(`<div class="vha-scj-tabs-cont-main">
			<div class="vha-scj-tabs-main">
				<div class="vha-scj-tab-main scj-tab-active" id="vha-scj-stp3-mb-tab"><span class="vha-scj-mobile-icon"></span> <span>Mobile</span></div>
				<div class="vha-scj-tab-main" id="vha-scj-stp3-fx-tab"><span class="vha-scj-wifi-icon"></span> <span>Fixed</span></div>
			</div>
			<hr class="vha-scj-line1" />
		</div>`);
	}
	
	function DeviceTabUI() { 
	     $(".vha-scj-st3-mb-devicestabs").html("");
		$(".vha-scj-st3-mb-devicestabs").html(`<div class="vha-scj-tabs-cont-main">
		                <div class="current-plan-warning-box displaynone ">
							<span class="warning-icon">
								<img src="images/custom/vha-scj-warningIcon_10_10.svg"/>
							</span>
							<span class="warning-text">Main
							</span>
						</div>
						 <div class="validation-warning-box displaynone">
							<span class="warning-icon">
								<img src="images/custom/vha-scj-warningIcon_10_10.svg"/>
							</span>
							<span class="warning-text">Main
							</span>
						</div>
                        <div class="vha-scj-tabs-wrapper">
                          <div class="vha-scj-tabs-main">
                              <div class="vha-scj-tab-device scj-device-tab-active" id="vha-scj-stp3-mobiles-tab"> 
                              Mobile phones
                              </div>
                              <div class="vha-scj-tab-device" id="vha-scj-stp3-tablets-tab">
                                  Tablets & MBB
                              </div>
                                <div class="vha-scj-tab-device displaynone" id="vha-scj-stp3-bundles-tab">
                                  Bundles
                              </div>
							  <div class="vha-scj-tab-device" id="vha-scj-stp3-Wearables-tab">
                                   Wearables
                              </div>
                                <div class="vha-scj-tab-device" id="vha-scj-stp3-Accessories-tab">
                                  Accessories
                              </div>
							  
							  
                                <div class="vha-scj-tab-device displaynone" id="vha-scj-stp3-tradein-tab">
                                  Trade In
                              </div>
                            
                          </div>
                          <div>
                              <hr class="vha-scj-line1" />
                          </div>
                        </div>
                      </div>
                      <div class="vha-scj-mobiletab scj-rows-flex"> 
					     <div class="current-plan-warning-box displaynone">
							<span class="warning-icon">
								<img src="images/custom/vha-scj-warningIcon_10_10.svg"/>
							</span>
							<span class="warning-text">
							</span>
						</div>
						<div class="vha-ssj-tab-header-text">Mobiles</div>

                         <div class="vha-scj-shipp-postal-cont">
                            <label for="vha-scj-shipp-postal-code">Check delivery estimate</label>
                            <div class="search-box-cont">
                               <input type="text" placeholder="Suburb or postcode" id="vha-scj-shipp-postal-code-mobile" class="vha-scj-shipp-postal-code ui-autocomplete-input search-box">
                                <div class="checkbox-alignment">
                                   <label for="vha-scj-shipp-postal-chckbx">
                                    <input type="checkbox" id="vha-scj-shipp-postal-chckbx" class="vha-scj-shipp-postal-chckbx">
                                      <span for="vha-scj-shipp-postal-chckbx">Same as coverage check</span>
                                  </label>
                                </div>
                            </div>
    

                         </div>
                         <hr class="vha-scj-line2" />
                          
                        <div class="vha-scj-brand-filter">
                           
                            <div class="scj-flex-wrapper">
                                 <label>Search</label>
								  <div class="d-flex">
									<input type="text" placeholder="Search" class="search-box vha-scj-search-mobile ui-autocomplete-input" />
									<button class="vha-scj-step3-searchicon"><img src="images/custom/Search_1.svg" id="searchiconimg" /></button>
								  </div>
                                
                            </div>
                           
                          
                            <div class="scj-flex-wrapper">
                                 <label>Sort by</label>
                                <select id="vha-scj-sort-devices" name="sort" class="vha-scj-dropdown">
								     <option value="Select">Select</option>  
                               <!--     <option value="popular">Most Popular</option>  --> 
								 <!--	<option value="LatestRelease">Latest Release</option> --> 
									<option value="priceHigh">Price (High)</option>
                                    <option value="priceLow">Price (Low)</option>                                  
                                </select>
                            </div>
							 <hr class="vha-scj-line2">
							 <label>Filter by brand</label>
                            <label class="p-1"><input type="checkbox" class="m-1 scj-filtermobiles" value="Apple" />Apple</label>
                            <label><input type="checkbox" class="m-1 scj-filtermobiles" value="Samsung" /> Samsung</label>
                            <label><input type="checkbox" class="m-1 scj-filtermobiles" value="Google"/> Google</label>
                            <label><input type="checkbox" class="m-1 scj-filtermobiles" value="Other"/> Other</label>
                            
                           
                        </div>
                      </div>`);
	
	}
	
	function DevicesCarousel() { 
						if (SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "TPG" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "iiNet")
						{

						$(".vha-scj-mobiletab").append(`  <!-- devices carousel -->
                          <div class="carosuel-main scj-rows-flex" data-id="mobile">
						     <div class="current-device">
									<label class="current-plan-toggle-switch displaynone">
										<input type="checkbox" class="show-current-device-toggle">
										<span class="slider"></span>
										<span class="current-plan-toggle-text ParagraphBody1">Show current mobiles</span>
									</label>
							 </div>
							 <div class="vha-scj-no-devices-box displaynone">
								<span class="vha-scj-warning-icon">⚠️</span>
								<p class="vha-scj-no-devices-text">No Mobile Phones available</p>
								</div>
							 <div class="exsiting-cust-curr-devInfo ssj-one-column">
									  <div class="ssj-existing-ser-info-container displaynone">
										<div class="ssj-existing-ser-info-heading">Current mobiles</div>
										<div class="ssj-existing-ser-info-subheading">Brand name</div>
										<div class="ssj-existing-ser-info-product-description"></div>
										<div class="ssj-existing-ser-info-price-info">$00.00/mo</div>
										<div class="ssj-existing-ser-info-checkbox-container">
											<input type="checkbox" id="payOutDevice" name="payOutDevice" />
											<label for="payOutDevice">Pay out device</label>
										</div>
										<div class="ssj-existing-ser-info-button-container">
											<button class="ssj-info-eef-btn">View EEF</button>
										</div>
									  </div>
						               <div class="vha-scj-carousel-container">
										  <div class="vha-scj-carousel-wrapper">
											<div class="vha-scj-carousel" id="vha-scj-carousel"></div>
										  </div>
									  </div>

							</div>

                              <!-- pagination for devices -->
                              <div class="vha-scj-carousel-header">
                                    <span class="vha-scj-pagination-info">1�3 of 0 results</span>
                                    <div class="vha-scj-nav-buttons">
                                      <button class="vha-scj-prev-btn">&lt;</button>
                                      <button class="vha-scj-next-btn">&gt;</button>
                                    </div>
                                </div>
                          </div>`);
						  <!-- TPG pagination for devices -->
						  }else
						  {
							$(".vha-scj-mobiletab").append(`  <!-- devices carousel -->
                          <div class="carosuel-main scj-rows-flex" data-id="mobile">
						     <div class="current-device">
									<label class="current-plan-toggle-switch displaynone">
										<input type="checkbox" class="show-current-device-toggle">
										<span class="slider"></span>
										<span class="current-plan-toggle-text ParagraphBody1">Show current mobiles</span>
									</label>
							 </div>
							 <div class="vha-scj-no-devices-box displaynone">
								<span class="vha-scj-warning-icon">⚠️</span>
								<p class="vha-scj-no-devices-text">No devices found</p>
								</div>
							 <div class="exsiting-cust-curr-devInfo ssj-one-column">
									  <div class="ssj-existing-ser-info-container displaynone">
										<div class="ssj-existing-ser-info-heading">Current mobiles</div>
										<div class="ssj-existing-ser-info-subheading">Brand name</div>
										<div class="ssj-existing-ser-info-product-description"></div>
										<div class="ssj-existing-ser-info-price-info">$00.00/mo</div>
										<div class="ssj-existing-ser-info-checkbox-container">
											<input type="checkbox" id="payOutDevice" name="payOutDevice" />
											<label for="payOutDevice">Pay out device</label>
										</div>
										<div class="ssj-existing-ser-info-button-container">
											<button class="ssj-info-eef-btn">View EEF</button>
										</div>
									  </div>
						               <div class="vha-scj-carousel-container">
										  <div class="vha-scj-carousel-wrapper">
											<div class="vha-scj-carousel" id="vha-scj-carousel"></div>
										  </div>
									  </div>

							</div>

                              <!-- pagination for devices -->
                              <div class="vha-scj-carousel-header">
                                    <span class="vha-scj-pagination-info">1�3 of 0 results</span>
                                    <div class="vha-scj-nav-buttons">
                                      <button class="vha-scj-prev-btn">&lt;</button>
                                      <button class="vha-scj-next-btn">&gt;</button>
                                    </div>
                                </div>
                          </div>`);		
						}						  
    
		$(".vha-scj-st3-mb-plans").html("");
		$(".vha-scj-st3-mb-plans").html(` <!-- Plans for Devices -->  <div class="availableplansheadingcontainer1" data-device="mobile">
		        <div class="vha-availableplansheadingcontainer"><div class="vha-availableplansheading ParagraphBody1Strong">Plans</div></div>
				<div class="current-plan-warning-box displaynone">
					<span class="warning-icon">
						<img src="images/custom/vha-scj-warningIcon_10_10.svg"/>
					</span>
					<span class="warning-text">
					</span>
				</div>
		        <div class="Selectbyproposition">
		            <div class="Selectbypropositionheading ParagraphBody1">Proposition</div>
		            <div>
		                <select name="Selectbypropositionlist" id="Selectbypropositionmenu">
		                </select>
		            </div>
		        </div>
		        <div class="current-plan displaynone">
		            <label class="current-plan-toggle-switch">
		                <input type="checkbox" class="show-current-plan-toggle">
		                <span class="slider"></span>
		                <span class="current-plan-toggle-text ParagraphBody1">Show current plan</span>
		            </label>
		        </div>
		        <div class="currentplancontainermain">
		            <div class="verticaldivideravailableplans displaynone"><img src="images/custom/verticaldivider.svg" id="verticaldivider" /></div>
		            <div class="availableplans">
		                <div class="current-plancontainer"></div>
		                <div class="plancontainer" id="boxContainer">
		                </div>
		           </div>      
		        </div>
		         <div class="pagination" id="pagination">
		                <span class="pagination-info"></span>
		                <button class="carousel-nav-prev">&lt;</button>
		                <button class="carousel-nav-next">&gt;</button>
                                </div>
                          </div>`);
    
    }
	
    function TabletsMbbUI(){
		$(".vha-scj-st3-mb-devicestabs").append(` <!-- tablets html -->
                      <div class="vha-scj-tablets-tab scj-rows-flex displaynone">
					      <div class="current-plan-warning-box displaynone">
							<span class="warning-icon">
								<img src="images/custom/vha-scj-warningIcon_10_10.svg"/>
							</span>
							<span class="warning-text">
							</span>
						</div>
						<div class="vha-ssj-tab-header-text">Tablets</div>

                          <div class="vha-scj-shipp-postal-cont">
                              <label for="vha-scj-shipp-postal-code-tablet">Check delivery estimate</label>
                              <div class="search-box-cont">
                                  <input type="text" placeholder="Suburb or postcode" id="vha-scj-shipp-postal-code-tablet" class="vha-scj-shipp-postal-code ui-autocomplete-input search-box" />
                                  <div class="checkbox-alignment">
                                      <label for="vha-scj-shipp-postal-chckbx-tablet">
                                          <input type="checkbox" id="vha-scj-shipp-postal-chckbx-tablet" class="vha-scj-shipp-postal-chckbx" />
                                          <span for="vha-scj-shipp-postal-chckbx">Same as coverage check</span>
                                      </label>
                                  </div>
                              </div>

                             
                             
                          </div>
                          <hr class="vha-scj-line2" />

                          <div class="vha-scj-brand-filter">
                             
                              <div class="scj-flex-wrapper">
                                  <label>Search</label>
								   <div class="d-flex">
										 <input type="text" placeholder="Search" class="search-box vha-scj-search-tablet" />                            
										<button class="vha-scj-step3-searchicon"><img src="images/custom/Search_1.svg" id="searchiconimg" /></button>
								   </div>
							  </div>

                             
                              <div class="scj-flex-wrapper">
                                  <label>Sort by</label>
                                  <select id="vha-scj-sort-tablets" name="sort" class="vha-scj-dropdown">
                                    <option value="Select">Select</option>  
                               <!--     <option value="popular">Most Popular</option>  --> 
								 <!--	<option value="LatestRelease">Latest Release</option> --> 
									<option value="priceHigh">Price (High)</option>
                                    <option value="priceLow">Price (Low)</option>  
                                  </select>
                              </div>
							   <hr class="vha-scj-line2">
							   <label>Filter by brand</label>
                              <label class="p-1"><input type="checkbox" class="m-1 scj-filtertablets" value="Apple" />Apple</label>
                              <label><input type="checkbox" class="m-1 scj-filtertablets" value="Samsung" /> Samsung</label>
                              <label><input type="checkbox" class="m-1 scj-filtertablets" value="Google" /> Google</label>
                              <label><input type="checkbox" class="m-1 scj-filtertablets" value="Other" /> Other</label>
                             
                          </div>

                          <!-- devices carousel -->
                          <div class="carosuel-main scj-rows-flex" data-id="tablet">
						      <div class="current-device">
								<label class="current-plan-toggle-switch displaynone">
									<input type="checkbox" class="show-current-device-toggle">
									<span class="slider"></span>
									<span class="current-plan-toggle-text ParagraphBody1">Show current tablets</span>
								</label>
							  </div>
							  <div class="vha-scj-no-devices-box displaynone">
								<span class="vha-scj-warning-icon">⚠️</span>
								<p class="vha-scj-no-devices-text">No devices found</p>
							  </div>
							  <div class="exsiting-cust-curr-devInfo ssj-one-column">
								  <div class="ssj-existing-ser-info-container displaynone">
									<div class="ssj-existing-ser-info-heading">Current tablets</div>
									<div class="ssj-existing-ser-info-subheading">Brand name</div>
									<div class="ssj-existing-ser-info-product-description"></div>
									<div class="ssj-existing-ser-info-price-info">$00.00/mo</div>
									<div class="ssj-existing-ser-info-checkbox-container">
										<input type="checkbox" id="payOutDevice" name="payOutDevice" />
										<label for="payOutDevice">Pay out device</label>
									</div>
									<div class="ssj-existing-ser-info-button-container">
										<button class="ssj-info-eef-btn">View EEF</button>
									</div>
								  </div>
								   <div class="vha-scj-carousel-container">
									  <div class="vha-scj-carousel-wrapper">
										<div class="vha-scj-carousel" id="vha-scj-carousel"></div>
									  </div>
								  </div>

								</div>
                             
                              <!-- pagination for devices -->
                              <div class="vha-scj-carousel-header">
                                    <span class="vha-scj-pagination-info">1 - 3 of 0 results</span>
                                    <div class="vha-scj-nav-buttons">
                                      <button class="vha-scj-prev-btn">&lt;</button>
                                      <button class="vha-scj-next-btn">&gt;</button>
                                    </div>
                                </div>
                          </div>
                           
                          <!-- pagination for devices -->
                          
                    </div>`);

		$(".vha-scj-st3-mb-plans").append(`<!-- Plans for tablets --> <div class="availableplansheadingcontainer1 displaynone" data-device="tablet" >
		        <div class="vha-availableplansheadingcontainer"><div class="vha-availableplansheading ParagraphBody1Strong">Plans</div></div>
				<div class="current-plan-warning-box displaynone">
					<span class="warning-icon">
						<img src="images/custom/vha-scj-warningIcon_10_10.svg"/>
					</span>
					<span class="warning-text">
					</span>
				</div>
		        <div class="Selectbyproposition">
		            <div class="Selectbypropositionheading ParagraphBody1">Proposition</div>
		            <div>
		                <select name="Selectbypropositionlist" id="Selectbypropositionmenu">
		                </select>
		            </div>
		        </div>
		        <div class="current-plan displaynone">
		            <label class="current-plan-toggle-switch">
		                <input type="checkbox" class="show-current-plan-toggle">
		                <span class="slider"></span>
		                <span class="current-plan-toggle-text ParagraphBody1">Show current plan</span>
		            </label>
		        </div>
		        <div class="currentplancontainermain">
		            <div class="verticaldivideravailableplans displaynone"><img src="images/custom/verticaldivider.svg" id="verticaldivider" /></div>
		            <div class="availableplans">
		                <div class="current-plancontainer"></div>
		                <div class="plancontainer" id="boxContainer">
		                </div>
		           </div>      
		        </div>
		         <div class="pagination" id="pagination">
		                <span class="pagination-info"></span>
		                <button class="carousel-nav-prev">&lt;</button>
		                <button class="carousel-nav-next">&gt;</button>
		         </div> 
                    </div>`);
	}
	function AccessoryUI(){
		$(".vha-scj-st3-mb-devicestabs").append(`<div class="vha-scj-accessory-tab scj-rows-flex displaynone" id="vha-scj-accessory-tab">
		  <div class="current-plan-warning-box displaynone">
				<span class="warning-icon">
					<img src="images/custom/vha-scj-warningIcon_10_10.svg"/>
				</span>
				<span class="warning-text">
				</span>
			</div>
			<div class="vha-ssj-tab-header-text">Accessories</div>

		  <!-- Shipping & Store Stock -->
		  <div class="vha-scj-shipp-postal-cont">
			<label for="vha-scj-shipp-postal-code-accessory">Check delivery estimate</label>
			<div class="search-box-cont">
			  <input type="text" placeholder="Suburb or postcode" id="vha-scj-shipp-postal-code-accessory" class="vha-scj-shipp-postal-code ui-autocomplete-input search-box" />
			  <div class="checkbox-alignment">
				<label for="vha-scj-shipp-postal-chckbx-accessory">
				  <input type="checkbox" id="vha-scj-shipp-postal-chckbx-accessory" class="vha-scj-shipp-postal-chckbx" />
				  <span>Same as coverage check</span>
				</label>
			  </div>
			</div>
			
			
		  </div>

		  <hr class="vha-scj-line2" />

		  <!-- Brand Filter & Search -->
		  <div class="vha-scj-brand-filter">
			
			

			<div class="scj-flex-wrapper">
			  <label>Search</label>
			   <div class="d-flex">
				 <input type="text" placeholder="Search" class="search-box vha-scj-search-accessory ui-autocomplete-input" />
				 <button class="vha-scj-step3-searchicon"><img src="images/custom/Search_1.svg" id="searchiconimg" /></button>
			  </div>
			  
			</div>

		

			<div class="scj-flex-wrapper">
			  <label>Sort by</label>
			  <select id="vha-scj-sort-accessories" name="sort" class="vha-scj-sort-accessories vha-scj-dropdown">
				 <option value="Select">Select</option>  
		   <!--     <option value="popular">Most Popular</option>  --> 
			 <!--	<option value="LatestRelease">Latest Release</option> --> 
				<option value="priceHigh">Price (High)</option>
				<option value="priceLow">Price (Low)</option>
			  </select>
			</div>
			 <hr class="vha-scj-line2">
			<label>Filter by brand</label>
			<label class="p-1"><input type="checkbox" class="m-1 scj-filteraccessories" value="Apple" />Apple</label>
			<label><input type="checkbox" class="m-1 scj-filteraccessories" value="Samsung" />Samsung</label>
			<label><input type="checkbox" class="m-1 scj-filteraccessories" value="Google" />Google</label>
			<label><input type="checkbox" class="m-1 scj-filteraccessories" value="Other" />Other</label>

			
		  </div>

		  <!-- Accessories Carousel -->
		  <div class="carosuel-main scj-rows-flex" data-id="accessory">
		    <div class="vha-scj-no-devices-box displaynone">
				<span class="vha-scj-warning-icon">⚠️</span>
				<p class="vha-scj-no-devices-text">No devices found</p>
			</div>
		    <div class="vha-ssj-items-txt"><span class="vha-ssj-items-num">0</span>items selected</div>
			<div class="vha-scj-carousel-container">
			  <div class="vha-scj-carousel-wrapper">
				<div class="vha-scj-carousel" id="vha-scj-carousel-accessory"></div>
			  </div>
			</div>
			<div class="vha-scj-carousel-header">
			  <span class="vha-scj-pagination-info">0–0 of 0 results</span>
			  <div class="vha-scj-nav-buttons">
				<button class="vha-scj-prev-btn"><</button>
				<button class="vha-scj-next-btn">></button>
			  </div>
			</div>
		  </div>
		</div>`);
	}
	function WearblesUI(){
		$(".vha-scj-st3-mb-devicestabs").append(`<div class="vha-scj-wearbles-tab scj-rows-flex displaynone" id="vha-scj-Wearble-tab">
		 <div class="current-plan-warning-box displaynone">
			<span class="warning-icon">
				<img src="images/custom/vha-scj-warningIcon_10_10.svg"/>
			</span>
			<span class="warning-text">
			</span>
		 </div>
		 <div class="vha-ssj-tab-header-text">Wearbles</div>

		  <!-- Shipping & Store Stock -->
		  <div class="vha-scj-shipp-postal-cont">
			<label for="vha-scj-shipp-postal-code-Wearble">Check delivery estimate</label>
			<div class="search-box-cont">
			  <input type="text" placeholder="Suburb or postcode" id="vha-scj-shipp-postal-code-Wearble" class="vha-scj-shipp-postal-code ui-autocomplete-input search-box" />
			  <div class="checkbox-alignment">
				<label for="vha-scj-shipp-postal-chckbx-Wearble">
				  <input type="checkbox" id="vha-scj-shipp-postal-chckbx-Wearble" class="vha-scj-shipp-postal-chckbx" />
				  <span>Same as coverage check</span>
				</label>
			  </div>
			</div>
			
			
		  </div>

		  <hr class="vha-scj-line2" />

		  <!-- Brand Filter & Search -->
		  <div class="vha-scj-brand-filter">
			<div class="scj-flex-wrapper">
			  <label>Search</label>
			   <div class="d-flex">
					<input type="text" placeholder="Search" class="search-box vha-scj-search-Wearble ui-autocomplete-input" />
					<button class="vha-scj-step3-searchicon"><img src="images/custom/Search_1.svg" id="searchiconimg" /></button>
			   </div>
			  
			</div>

			

			<div class="scj-flex-wrapper">
			  <label>Sort by</label>
			  <select id="vha-scj-sort-wearbles" name="sort" class="vha-scj-sort-wearbles vha-scj-dropdown">
				 <option value="Select">Select</option>  
				   <!--     <option value="popular">Most Popular</option>  --> 
					 <!--	<option value="LatestRelease">Latest Release</option> --> 
				<option value="priceHigh">Price (High)</option>
				<option value="priceLow">Price (Low)</option>
			  </select>
			</div>
			 <hr class="vha-scj-line2">
			<label>Filter by brand</label>
			<label class="p-1"><input type="checkbox" class="m-1 scj-filterwearbles" value="Apple" />Apple</label>
			<label><input type="checkbox" class="m-1 scj-filterwearbles" value="Samsung" />Samsung</label>
			<label><input type="checkbox" class="m-1 scj-filterwearbles" value="Google" />Google</label>
			<label><input type="checkbox" class="m-1 scj-filterwearbles" value="Other" />Other</label>

			
		  </div>

		  <!-- wearbles Carousel -->
		  <div class="carosuel-main scj-rows-flex" data-id="Wearble">
		    <div class="vha-scj-no-devices-box displaynone">
				<span class="vha-scj-warning-icon">⚠️</span>
				<p class="vha-scj-no-devices-text">No devices found</p>
			</div>
			<div class="vha-scj-carousel-container">
			  <div class="vha-scj-carousel-wrapper">
				<div class="vha-scj-carousel" id="vha-scj-carousel-Wearble"></div>
			  </div>
			</div>
			<div class="vha-scj-carousel-header">
			  <span class="vha-scj-pagination-info">0–0 of 0 results</span>
			  <div class="vha-scj-nav-buttons">
				<button class="vha-scj-prev-btn"><</button>
				<button class="vha-scj-next-btn">></button>
			  </div>
			</div>
		  </div>
		</div>
		`);
	}
	function CheckstorestockUI() {
		$(".vha-scj-st3-mb-devicestabs").append(`<div class="vha-scj-check-str-popup-overlay">
		  <div class="vha-scj-check-str-popup-content">
		   <div class="vha-scj-pop-header">
			
			<div class="vha-scj-check-str-popup-title">Check store stock</div>
		   <span class="vha-scj-check-str-popup-close-icon">&times;</span>
		   </div>
			<hr>
			<div class="vha-scj-check-str-popup-device"></div>
		  <div class="d-flex align-items-center">
				<label class="vha-scj-check-str-popup-label">Search store options</label>
				<input type="text" class="vha-scj-check-str-popup-input ui-autocomplete-input" placeholder="Suburb or postcode" value="">
				<div class="vha-scj-check-str-popup-checkbox">
					<input type="checkbox" id="vha-scj-check-str-popup-coverage">
					<label for="vha-scj-check-str-popup-coverage">Same as coverage check</label>
				</div>
		 </div>
			<table class="vha-scj-check-str-popup-table">
			  <thead>
				<tr>
				  <th>Store name</th>
				  <th>Store code</th>
				  <th>Device availability</th>
				  <th>Store working Hours</th>
				  <th>Store address</th>
				</tr>
			  </thead>
			  <tbody></tbody>
			</table>

			<div class="vha-scj-check-str-popup-pagination">
			  <div class="vha-scj-check-str-popup-pagination-info"></div>
			  <div class="vha-scj-check-str-popup-pagination-controls">
				<button class="vha-scj-check-str-popup-prev">&lt;</button>
				<button class="vha-scj-check-str-popup-next">&gt;</button>
			  </div>
			</div>
			<hr>
			<div class="d-flex justify-content-end align-items-center">
				<button class="vha-scj-check-str-popup-close-btn">Close</button>
			</div>
			
		  </div>
		</div>
		`);
	}
	function CartSummaryUI() {
			if (SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "TPG" || SiebelApp.S_App.GetProfileAttr("VHANewOrg") == "iiNet")
{
	$(".vha-scj-stp3-col2").html("");
	$(".vha-scj-stp3-col2").html(`<div class="vha-scj-cart-summary">
	<div class="scj-accordion">
	<div class="accordion-header">
	<div class="header-left">
	<span class="header-text">Customer details</span>
	</div>
	<img src="images/custom/menu-icons/arrow_upMenu.svg" class="arrow-icon rotate">
	</div>
	<div class="accordion-body vha-scj-cust-details" id="vha-scj-cust-details">
	<div>Container 1</div>
	</div>
	</div>
 
	<div class="scj-accordion">
	<div class="accordion-header">
	<div class="header-left">
	<span class="header-text">Existing services</span>
	</div>
	<img src="images/custom/menu-icons/arrow_upMenu.svg" class="arrow-icon rotate">
	</div>
	<div class="accordion-body vha-scj-Existing-services" id="vha-scj-Existing-services" style="">

	<div id="vha-price-section" class="vha-pricing-UI-ext">
	<div class="vha-curr-bill">
	<span class="h3"><b>Current estimated monthly bill</b></span>
	</div>
	<div class="vha-rec-charges-ext d-flex">
	<span class="h5">Recurring charges</span>
	<img src="images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon ml-auto">
	<span id="vha-rec-amount-ext" class="h4 float-right">$00.00</span>
	</div>
	<div class="vha-total-ext d-flex">
	<span class="h5 fw-bold"><b>Total</b></span>
	<span id="vha-Total-bill-ext" class="vha-Total-bill-ext-c h4 ml-auto">$000.00</span>
	</div>
	</div>
	</div>
	</div>
 
	<div class="scj-accordion">
	<div class="accordion-header">
	<div class="header-left">
	<span class="header-text">New services</span>
	</div>
	<img src="images/custom/menu-icons/arrow_upMenu.svg" class="arrow-icon rotate">
	</div>
	<div class="accordion-body vha-scj-New-services" id="vha-scj-New-services" style="display: block;">
	<div class="rem-all-serv-sec row displaynone">
	<button id="rem-all-serv-btn" class="rem-all-serv-btn">Remove all new Services</button>
	</div>
	<div id="nonewservices" class="no-new-services">No new services added</div>
	</div>
	</div>
	<div id="vha-orr-sec" class="vha-offer-UI">
	<div class="vha-due-today">
	<span class="vha-price-font h4">Due Today</span>
	<span id="vha-due-today" class="vha-price-font float-right h4">$0.00</span>
	</div>
	<div class="vha-sub-total d-flex">
	<span class="h5">Subtotal</span>
	<img src="images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon ml-auto  mr-1">
	<span id="vha-sub-total" class="h4 float-right">$0.00</span>
	</div>
	<div class="vha-del-fee d-flex">
	<span class="h5">Delivery Fee</span>
	<img src="images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon ml-auto  mr-1">
	<span id="vha-del-fee" class="h4 float-right">$10.00</span>
	</div>
	<div class="vha-ot-disc d-flex">
	<span class="h5">Discounts</span>
	<img src="images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon ml-auto  mr-1">
	<span id="vha-ot-disc" class="h4 float-right">$0.00</span>
	</div>
	<div class="vha-total d-flex">
	<span class="vha-price-font sh5 fw-bold">Total</span>
	<span id="vha-Total-bill" class="vha-price-font h4 ml-auto">$0.00/mo</span>
	</div>
	<div class="vha-expected-monthly-bill">
	<span class="vha-price-font h4">Expected Monthly Bill</span>
	<span id="vha-due-today" class="vha-price-font float-right h4"></span>
	</div>
	<div class="vha-ot-disc d-flex">
	<span class="h5">Discounts</span>
	<img src="images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon ml-auto  mr-1">
	<span id="vha-ot-amount" class="h4 float-right">$0.00/mth</span>
	</div>
	<div class="vha-rec-tot d-flex">
	<span class="h5 fw-bold">Total Recurring</span>
	<img src="images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon ml-auto  mr-1">
	<span id="vha-rec-amount" class="h4 float-right">$0.00/mth</span>
	</div>
	<div class="vha-quote-btn-sec row">
	<button id="vha-msp-offer-btn" class="vha-msp-offer-btn col-12">Apply MSP Offers</button>
	<button id="vha-qt-offer-btn" class="vha-qt-offer-btn col-12">View purchase &amp; offer details</button>
	<button id="vha-create-qt-btn" class="vha-create-qt-btn col-12 btnDisabled">Create Quote</button>
	<button id="vha-create-ord-btn" class="vha-create-ord-btn col-12 btnDisabled displaynone">Create Order</button>
	</div>
	</div>
	</div>`);
}
			else
			{
	    $(".vha-scj-stp3-col2").html("");
		$(".vha-scj-stp3-col2").html(`<div class="vha-scj-cart-summary">
		  <div class="scj-accordion">
			<div class="accordion-header">
			  <div class="header-left">
				<span class="header-text">Customer details</span>
			  </div>
			  <img src="images/custom/menu-icons/arrow_upMenu.svg" class="arrow-icon rotate">
			</div>
			<div class="accordion-body vha-scj-cust-details" id="vha-scj-cust-details">
			  <div>Container 1</div>
			</div>
		  </div>

		  <div class="scj-accordion">
			<div class="accordion-header">
			  <div class="header-left">
				<span class="header-text">Existing services</span>
			  </div>
			  <img src="images/custom/menu-icons/arrow_upMenu.svg" class="arrow-icon rotate">
			</div>
			<div class="accordion-body vha-scj-Existing-services" id="vha-scj-Existing-services" style="">
				
				
				<div id="vha-price-section" class="vha-pricing-UI-ext">
					<div class="vha-curr-bill">
						<span class="h3"><b>Current estimated monthly bill</b></span>
					</div>
					<div class="vha-rec-charges-ext d-flex">
						<span class="h5">Recurring charges</span>
						<img src="images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon ml-auto">
						<span id="vha-rec-amount-ext" class="h4 float-right">$00.00</span>
					</div>
					<div class="vha-total-ext d-flex">
						<span class="h5 fw-bold"><b>Total</b></span>
						<span id="vha-Total-bill-ext" class="vha-Total-bill-ext-c h4 ml-auto">$000.00</span>
					</div>
				</div>
			</div>
		  </div>

		<div class="scj-accordion">
			<div class="accordion-header">
				<div class="header-left">
					<span class="header-text">New services</span>
				</div>
				<img src="images/custom/menu-icons/arrow_upMenu.svg" class="arrow-icon">
			</div>
			<div class="accordion-body vha-scj-New-services" id="vha-scj-New-services" style="display: block;">
				<div class="rem-all-serv-sec row displaynone">
					<button id="rem-all-serv-btn" class="rem-all-serv-btn">Remove all new Services</button>
				</div>
				<div id="nonewservices" class="no-new-services">No new services added</div>
			</div>
		</div>
		<div id="vha-orr-sec" class="vha-offer-UI">
			<div class="vha-due-today">
				<span class="vha-price-font h4">Due Today</span>
				<span id="vha-due-today" class="vha-price-font float-right h4">$0,000.00</span>
			</div>
			<div class="vha-next-bill">
				<span class="vha-price-font h3">Next Expected Monthly Bill</span>
			</div>
			<div class="vha-rec-charges d-flex">
				<span class="h5">Recurring charges</span>
				<img src="images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon ml-auto  mr-1">
				<span id="vha-rec-amount" class="h4 float-right">$00.00</span>
			</div>
			<div class="vha-ot-ch d-flex">
				<span class="h5">One time charges</span>
				<img src="images/custom/menu-icons/Tooltip_20x20.svg" alt="img" class="header-icon cart-icon ml-auto mr-1 pb-2">
				<span id="vha-ot-amount" class="h4 float-right">$00.00</span>
			</div>
			<div class="vha-total d-flex">
				<span class="vha-price-font sh5 fw-bold">Total</span>
				<span id="vha-Total-bill" class="vha-price-font h4 ml-auto">$0,00000.00</span>
			</div>
			<div class="vha-quote-btn-sec row">
				<button id="vha-msp-offer-btn" class="vha-msp-offer-btn col-12">Apply MSP Offers</button>
				<button id="vha-qt-offer-btn" class="vha-qt-offer-btn col-12">View purchase &amp; offer details</button>
				<button id="vha-create-qt-btn" class="vha-create-qt-btn col-12 btnDisabled">Create Quote</button>
				<button id="vha-create-ord-btn" class="vha-create-ord-btn col-12 btnDisabled displaynone">Create Order</button>
			</div>
		</div>
	</div>`);
			}
	}
}