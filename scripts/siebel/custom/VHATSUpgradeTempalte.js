if (typeof VHATSUpgradeTempalte === "undefined") {
    var VHATSUpgradeTempalte = {};

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
					<span class="field-label field-label-override">Add Device Care (New device)</span>\
					<select class="input-field insurance-type" id="ts-new-device-ins">\
					<option>Insurance 1</option>\
					<option>Insurance 2</option>\
					<option>Insurance 3</option>\
					</select>\
				</div>\
				<div class="parent-controls-container ts-addremoveins-method">\
					<!--<span class="field-label field-label-override">Add/Remove Device Care for existing device?</span>-->\
					<div hidden class="applet-button applet-button-passive" val="Yes">Yes</div><br>\
					<!--<div class="applet-button applet-button-active" val="No">No</div>\
				</div>-->\
				<div class="vha-ins-dtls p-4 ml-3 mb-4 ">\
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
						<div class="row e-cart-discount-bundle VFDisplayNone">\
							<div class="vha-ts-cartitemw col-md-4">Bundle and Save</div>\
							<div class="h5 vha-ts-cartval">-$ <span>0.00</span></div>\
						</div>\
						<div class="row e-cart-discount-msp VFDisplayNone">\
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
						<div class="row cart-discount-msp VFDisplayNone">\
							<div class="vha-ts-cartitemw">Bundle and Save</div>\
							<div class="h5 vha-ts-cartval">-$ <span>0.00</span></div>\
						</div>\
						<div class="row cart-discount-restrict VFDisplayNone">\
							<div class="vha-ts-cartitemw">Restricted Discount</div>\
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
            '<div class="d-flex bd-highlight vha-ts-card-row1">' +
            '<div class="pl-4 pr-2 pt-1 pb-2 bd-highlight vha-ts-card-row1-col1">' +
            '<div class="pt-1"><span class="vha-ts-carasole-bolder" id="vha-ts-tot-paldata' + [n] + '"></span><span   id="vha-ts-tot-paldata-q' + [n] + '" class="vha-ts-carasole-bolder" style="font-size: 24px;">' + (plans[n]._source.Data_Entitlement).replace("GB","") + '</span><span class="vha-ts-carasole-bold">GB</span></div>' +
            '<div style="margin-top: -10px;margin-left: 8px;"><span style="font-size: small;">Data in Oz</span></div>' +
            '</div>' +
            '<div class="pl-4 pr-4 pt-2 pb-2 bd-highlight vha-ts-card-row1-col2">' +
            '<div class="pt-3"><span class="vha-ts-carasole-dollar">$</span><span class="vha-ts-carasole-bolder" id="vha-tot-palamt' + [n] + '" style="font-size: 24px;">' + parseFloat(plans[n]._source.Plan_Price_Inc_Gst).toFixed(2) + '</span></div>' +
            '<div style="margin-top: -10px;margin-left: 8px;">' +
            '<span class="vha-ts-greysmall text-lowercase" id="vha-ts-tot-paltym' + [n] + '">per month</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="d-flex flex-column bd-highlight vha-ts-card-row2 pl-3 pr-3 pt-2 vha-ts-greysmall">' +
            '<span class="vha-ts-tot-conterm mb-1" id="vha-ts-tot-conterm' + [n] + '">' + plans[n]._source.Contract_Type + '</span>' +
            '<span class="h5 vha-ts-tot-conterm-hd">Endless data</span>' +
            '<span class="vha-ts-tot-ent" id="vha-ts-tot-condesc' + [n] + '">'+sDataText+'</span>' +
            '</div>' +
            '<div class="d-flex flex-column bd-highlight vha-ts-card-row3 pl-3 pr-3 pt-2 vha-ts-greysmall">' +
            '<span class="vha-ts-tot-plantype" id="vha-ts-tot-conplantyp' + [n] + '">' + plans[n]._source.Plan_Name + '</span>' +
            '<span class="vha-ts-tot-plantypedtls mt-2 mb-0" id="vha-ts-tot-plandesc' + [n] + '">' + plans[n]._source.Proposition_Name + '</span>' +
            '</div>' +
            '<div class="d-flex flex-column bd-highlight vha-ts-card-row4 pl-3 pr-3 pt-2 vha-ts-greysmall">' +
            '<span class="mt-1 mb-1 h6 vha-ts-tot-conterm-hd" id="vha-ts-tot-endlessdatatxt' + [n] + '">' + plans[n]._source.Data_Entitlement + ' Endless data</span>' +
            '<div class="vha-ts-tot-enttxt" id="vha-ts-tot-enttxt' + [n] + '">'+sDataText+'</div>' +
            '<div class="d-flex justify-content-center"><button class="btn btn-primary mt-2 vha-ts-addtocartbtn" plancd="' + plans[n]._source.Plan_Code + '" planmsisdn="' + plans[n].MSISDN + '" planname="' + plans[n]._source.Plan_Name + '" seqNum="' + [n] + '">Add to cart</button></div>' +
            '</div>' +
            '<div class="forcehide" context="dataStore">' +
            '<span id="vha-ts-tot-rateplanname' + [n] + '" class="vha-tot-ts-rateplanname"></span>' +
            '<span id="vha-ts-tot-planId' + [n] + '"></span>' +
            '<span id="vha-ts-tot-ratepropname' + [n] + '"></span>' +
            '<span id="vha-ts-tot-ratePlanType' + [n] + '"></span>' +
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
		        	capacitytag = '<select id="vhatscapacity" lblname="" name="vhatscapacity" class="input-margin-left input-field vhatscapacity"><option value="' + distinctCap[i] + '">' + distinctCap[i] + '</option>';
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
                    distinctColordtl.push({color: sColor, deviceprice: device._source.RRP_inc_gst, savevalue: device._source.Save_Value, productcode: device._source.Product_Code, recmdcolor: device._source.RecommendedColor});
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
                    colortag = '<select id="vhatscolour" lblname="" name="vhatscolour" class="vhatscolour input-margin-left input-field" ><option  name="colouroptn" value="' + defaultColor + '"  skuid="' + distinctColordtl[i].productcode + '">' + defaultColor + '</option>';
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
		
        var sRtrn = '<div class="ml-3 mt-3 bd-highlight">\
		<div class="card  device-card" id="card' + [n] + '">\
		<div class="card-body">\
		<div class="d-flex flex-column bd-highlight vha-ts-d-card-row1 pl-3 pr-3 pt-2 vha-ts-card-red">\
		<span class="vha-ts-d-save mb-3  align-self-center" id="vha-ts-d-save' + [n] + '">'+sSaveValue+'</span>\
		</div>\
		<div class="d-flex flex-column bd-highlight vha-ts-d-card-row2 pl-3 pr-3 pt-2">\
		<span class="h5 vha-ts-d-name justify-content-center devicealign">' + deviceModel + '</span>\
		<img class="vha-ts-d-img mb-3" id="vha-ts-d-img' + [n] + '" src="' + sDevImg + '"></img>\
		<div>\
		' +
            capacitytag + colortag +
            '</div></div>\
		<div class="d-flex flex-column bd-highlight vha-ts-d-card-row3 pl-3 pr-3 pt-2 vha-ts-greysmall">\
		<span class="vha-ts-d-from">from</span>\
		<span class="vha-ts-carasole-dollar"><sup>$</sup><span class="vha-ts-carasole-bolder" id="vha-ts-d-amt' + [n] + '">' + mTruncate(parseFloat(sDvcPrice / sDeviceTerm).toString()) + '</span></span>\
		<span class="vha-ts-d-permnt" id="vha-ts-d-permnt' + [n] + '">per month</span>\
		<span class="vha-ts-d-desc" id="vha-ts-d-desc' + [n] + '">Over ' + sDeviceTerm + ' Months. Total min cost $ <span>' + sDvcPrice + '</span></span>\
		<div class="d-flex justify-content-center">\
		<button class="btn btn-primary mt-4 vha-ts-d-shopaddtocartbtn" device="' + deviceModel + '" price="' + sDvcPrice + '" capacity="' + defaultCapacity + '" color="' + defaultColor + '" seqNum="' + [n] + '">Shop Now</button>\
		</div>\
		<div id="stockmsg" class="d-flex justify-content-center">\
		</div>\
		</div>\
		<div class="forcehide" context="dataStore">\
		<span id="vha-ts-rateplanname' + [n] + '" class="vha-tot-ts-rateplanname"></span>\
		<span id="vha-ts-planId' + [n] + '"></span>\
		<span id="vha-ts-ratepropname' + [n] + '"></span>\
		<span id="vha-ts-ratePlanType' + [n] + '"></span>\
		</div>\
		</div>\
		</div>\
		</div>';
        return sRtrn;


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
		<button class="btn vhappbtn" id="vhagfppgenerateupibtn">Generate Payment URL</button>\
		</div>\
		</div>\
		</div>\
		<div class="row">\
		<div class="vha-ts-lbl mb-3">\
		<div class="ml-4 figure">\
		<button class="btn vhappbtn" id="vhagfppsendupibtn">Send Payment URL</button>\
		<button class="btn vhappbtn" id="vhagfpphistorybtn">Show Payment URL History</button>\
		<button class="btn vhappbtn" id="vhagfpprefreshbtn">Refresh</button>\
		</div>\
		</div>\
		<div class="vha-ts-deleteiconsm1" id="vhagfppdelbtn"></div>\
		</div>\
		<div class="vha-ts-prepaymentupiForm-enterdata VHADisplayNone">\
		<div class="ml-1 row w-100 mr-1 mb-2" id = "vha-upgrade-payupi"></div>\
		<div class="row vha-ts-upidetails">\
		<div class="vha-ts-notifytype-col"><span class="vha-ts-lbl">Notification Type</span><select class="input-field vha-ts-notifytype"><option>SMS</option>\<option>Email</option></select></div>\
		<div class="vha-ts-email-col"><span class="vha-ts-lbl">Email</span><input class="vha-ts-email input-field" type="text"></div>\
		<div class="vha-ts-mobnumber-col"><span class="vha-ts-lbl">Mobile Number</span><input class="vha-ts-mobnumber input-field" type="text"></div>\
		<div class="vha-ts-url-col"><span class="vha-ts-lbl">URL</span><input class="vha-ts-url input-field" type="text" readonly></div>\
		<div class="vha-ts-urlstatus-col"><span class="vha-ts-lbl">URL Status</span><input class="vha-ts-urlstatus input-field" type="text" readonly></div>\
		<div class="vha-ts-paystatus-col"><span class="vha-ts-lbl">Payment Status</span><input class="vha-ts-paystatus input-field" type="text" readonly></div>\
		<div class="vha-ts-paytype-col"><span class="vha-ts-lbl">Payment Method Type</span><input class="vha-ts-paytype input-field" type="text" readonly></div>\
		<div class="vha-ts-paytoken-col"><span class="vha-ts-lbl">Payment Token</span><input class="vha-ts-paytoken input-field" type="text" readonly></div>\
		<div class="vha-ts-recnumber-col"><span class="vha-ts-lbl">Receipt Number</span><input class="vha-ts-recnumber input-field" type="text" readonly></div>\
		<div class="vha-ts-paydate-col"><span class="vha-ts-lbl">Created Date</span><input class="vha-ts-paydate input-field" type="text" readonly></div>\
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
        $(".twowaysms-msisdn").parent().after('<span id=static2waysmsmsg class=field-label>Inform customer to reply for SMS so that order can be processed. Shipping Notifications will also be sent to this number</span>'); //Sharan:06/08/2023::Added for CPVT1326 /Added for Defect#1136
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
        if (sSelector == "#ts-savelead-reason") {
            sListOption += "<option>Choose Discard Reason</option>";
        } else {
            sListOption += "<option></option>";
        }
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
        <input class="input-field ui-autocomplete-input" id="ts-accessory-cat" placeholder="Category" autocomplete="off" style="width: 170px;">\
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
}