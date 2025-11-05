if (typeof VHAAppUtilities === "undefined") {
    var VHAAppUtilities = {};
    const deviceIcons= {
		device: "images/custom/menu-icons/mobile_20x20.svg",
		mobile: "images/custom/menu-icons/mobile_20x20.svg",
		secdevice: "images/custom/menu-icons/mobile_20x20.svg",
		tablet: "images/custom/menu-icons/mobile_20x20.svg",
		desktop: "images/custom/menu-icons/mobile_20x20.svg",
		laptop: "images/custom/menu-icons/",
		smartwatch: "images/custom/menu-icons/mobile_20x20.svg",
        info: "images/custom/menu-icons/Tooltip_20x20.svg",
        speed: "images/custom/menu-icons/speed_20x20.svg",
        wifi: "images/custom/menu-icons/wifi_20x20.svg",
        usb: "images/custom/menu-icons/usb_20x20.svg",
        green_tick: "images/custom/menu-icons/green_tick_24x24.svg",
        percentage: "images/custom/menu-icons/percent_20x20.svg",
		discount:"images/custom/menu-icons/percent_20x20.svg",
        plan: "images/custom/menu-icons/plan_20x20.svg",
        close: "images/custom/menu-icons/close_20x20.svg",
        blue_tick: "images/custom/menu-icons/blue_tick_20x20.svg",
        Cross: "images/custom/menu-icons/Cross_20x20.svg",		
		rateplan:"images/custom/menu-icons/plan_20x20.svg",
		assetlineitemgpp:"images/custom/menu-icons/mobile_20x20.svg",
		assetlineitemappsd:"images/custom/menu-icons/mobile_20x20.svg",
		packitem:"images/custom/menu-icons/mobile_20x20.svg",
		listofmspdiscount:"images/custom/menu-icons/mobile_20x20.svg",
		credititem:"images/custom/menu-icons/mobile_20x20.svg",
		mspdiscount:"images/custom/menu-icons/mobile_20x20.svg",
		assetlineitemappacc:"images/custom/menu-icons/mobile_20x20.svg",
		accessory:"images/custom/menu-icons/mobile_20x20.svg"
		
	};
	//Jeeten: ssj: sep-2025
	VHAAppUtilities.GetDeviceIcon = function(deviceTypes) {
        var icon = "images/custom/menu-icons/Tooltip_20x20.svg";
		if (deviceTypes) {
			var deviceType = deviceTypes.toLowerCase();
			icon = deviceIcons[deviceType];
		}
        return icon;
    };
    VHAAppUtilities.formatCurrency=function (value) {
        // Convert to float and validate
        let num = parseFloat(value);
        if (isNaN(num)) {
            return "Invalid amount";
        }
        // Format with commas and 2 decimal places
        return "$" + num.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
	VHAAppUtilities.propertySetToJson = function (propertySet) {
	    // Helper function to recursively process the PropertySet
	    function processPropertySet(ps) {
	        const jsonObject = {};
	
	        // Add properties to the JSON object
	        if (ps.propArray) {
	            Object.keys(ps.propArray).forEach(key => {
	                jsonObject[key] = ps.propArray[key];
	            });
	        }
	
	        // Process child property sets
	        if (ps.childArray && ps.childArray.length > 0) {
	            jsonObject.children = ps.childArray.map(child => processPropertySet(child));
	        }
	
	        return jsonObject;
	    }
		// Start processing from the root PropertySet
	    return processPropertySet(propertySet);
	};
    //fetch Offer Details
    /*
     var BS = SiebelApp.S_App.GetService("Workflow Process Manager");
             var Inputs = SiebelApp.S_App.NewPropertySet();
             Inputs.SetProperty("ProcessName", "VHA SSJ Offers Main Process");
             
             var Output = BS.InvokeMethod("RunProcess", Inputs);
             var offerDetails = Output.GetChildByType("ResultSet");
    */
	VHAAppUtilities.fetchOffers = function(HeaderId, AstIntId, Source, vMaxSeq, ExtCust, DeviceCode, DeviceTerm, PropSAMId, RatePlanSAMId, AccCode, AppCodeTerm, OrdType, UpgOfferType, DelDevCode, AssetIntegId, SrvcType) {
        var BS = SiebelApp.S_App.GetService("Workflow Process Manager");
        var Inputs = SiebelApp.S_App.NewPropertySet();
        var Output = SiebelApp.S_App.NewPropertySet();
        Inputs.SetProperty("ProcessName", "VHA SSJ Offers Main Process");
        Inputs.SetProperty("Source", Source); //"SSJUI"
        Inputs.SetProperty("CurrentCartMaxSeq", vMaxSeq);
        Inputs.SetProperty("ExtCust", ExtCust); //"Y"
        Inputs.SetProperty("DeviceCode", DeviceCode); //Item__Code //"AUP1210"
        Inputs.SetProperty("DeviceTerm", DeviceTerm); //DeviceTerm
        Inputs.SetProperty("PropSAMId", PropSAMId); //PropSAMId //"AUP1210"
		Inputs.SetProperty("AccCode", AccCode); //Accessories
        Inputs.SetProperty("RatePlanSAMId", RatePlanSAMId); //Code "AU11535"
        Inputs.SetProperty("AstIntId", AstIntId);
        Inputs.SetProperty("HeaderId", HeaderId); //"3-CMUB6HM"
		//Marvin: Added to set only for Upgrade
		if(SrvcType === "Upgrade Service"){
			Inputs.SetProperty("UpgOfferType", AppCodeTerm);
			Inputs.SetProperty("OrdType", OrdType);
			Inputs.SetProperty("UpgOfferType", UpgOfferType);
			Inputs.SetProperty("DelDevCode", DelDevCode);
			Inputs.SetProperty("AstIntId", AssetIntegId);
        }
        /*Inputs.SetProperty("Source", "SSJUI");
        Inputs.SetProperty("CurrentCartMaxSeq", "");
        Inputs.SetProperty("ExtCust", "Y");
        Inputs.SetProperty("DeviceCode", "AUP1210"); //Item__Code
        Inputs.SetProperty("DeviceTerm", ""); //DeviceTerm
        Inputs.SetProperty("PropSAMId", "AUP1210"); //PropSAMId
        Inputs.SetProperty("RatePlanSAMId", "AU11535"); //Code
        Inputs.SetProperty("AstIntId", "");
        Inputs.SetProperty("HeaderId", "3-CMUB6HM");*/
		console.log(Inputs);
        var Output = BS.InvokeMethod("RunProcess", Inputs);
        var offerDetails = Output.GetChildByType("ResultSet");
        if(offerDetails){
            console.log("offer: ",offerDetails);
            /*$('#vha-scj-cust-details').children().remove();
            $('#vha-scj-cust-details').append(custHtml);*/
        }
         return offerDetails;
     };
    VHAAppUtilities.ConstantArray = new Array();
    VHAAppUtilities.SetConstants = function(indexName, a) {
        VHAAppUtilities.ConstantArray[indexName] = a;
        return true;
    };
    VHAAppUtilities.GetConstants = function(indexName) {
        if (indexName in VHAAppUtilities.ConstantArray) {
            return VHAAppUtilities.ConstantArray[indexName];
        } else {
            return false;
        }
    };
    VHAAppUtilities.SiebelMessageToArray = function(pa) {
        var recordCount = 0;
        if (pa) {
            var recordCount = pa.childArray.length;
        }
        if (recordCount) {
            var arrayData = [];
            for (var i = 0; i < recordCount; i++) {
                var arr = pa.childArray[i];
                var arrLen = arr.propArrayLen;
                if (arrLen) {
                    var tArr = new Object();
                    var indVal = arr.GetFirstProperty();
                    for (var j = 0; j < arrLen; j++) {
                        tArr[indVal] = arr.propArray[indVal];
                        indVal = arr.GetNextProperty();
                    }
                    arrayData[i] = tArr;
                }
            }
            return arrayData;
        } else {
            return false;
        }
    };
    VHAAppUtilities.CallWorkflow = function(WorkflowName, Inputs, Options) {
        var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
        Inputs.SetProperty("ProcessName", WorkflowName);
        var out = ser.InvokeMethod("RunProcess", Inputs);
        var ResultSet = out.GetChildByType("ResultSet");
        if (typeof Options == "object") {
            if (Options.Type && Options.Type == "JSONString") {
                return JSON.stringify(this.GetJSON(ResultSet));
            } else {
                if (Options.Type && Options.Type == "JSON") {
                    return this.GetJSON(ResultSet);
                } else {
                    return ResultSet;
                }
            }
        } else {
            return ResultSet;
        }
    };
    VHAAppUtilities.formatName= function(child){
		let displayName = child.Name || "";

		if(child.type === "AssetLineItemAPPAcc" && child.AccessoryCnt ){
			displayName += ` with ${child.AccessoryCnt} accessories`;
		}
	   return displayName;
	}
	VHAAppUtilities.toArray = function(val){
		if(val==null) return [];
		if(Array.isArray(val)) return val;
		if(typeof val === 'object') {
			if('Name' in val) return [val];
			return Object.values(val);}
		return [val];
	}
	VHAAppUtilities.toData = function(s){
		return String(s).replace(/(a-z0-9)([A-Z])/g, '$1-$2').replace(/[_\s]+/g,'-').toLowerCase();
	}
	VHAAppUtilities.ConvertToString= function(v){
		if(v == null) return '';
		if(typeof v === 'string') return v;
		if(typeof v === 'number' || typeof v === 'boolean' ) return String(v);
		try{
			return JSON.stringify(v);
		}
		catch(e){
			return String(v);
		}
	}
	VHAAppUtilities.psToJSON = function(PropertySet)
	{
			if(!PropertySet) return null;
			let obj={};
			//Add all properties
			let propname = PropertySet.GetFirstProperty();
		  while(propname !== null)
		  {
			obj[propname] =PropertySet.GetProperty(propname);
			propname=PropertySet.GetNextProperty();
		  }
			//handle children

				let childCount =PropertySet.GetChildCount();
				
					for (let j = 0; j<childCount; j++){
						let child=PropertySet.GetChild(j);
				let type =child.GetType();
				let childJSON = VHAAppUtilities.psToJSON(child);

				if(obj[type]){
					if(!Array.isArray(obj[type])){
						obj[type]=[obj[type]];
						
					}
					obj[type].push(childJSON);
					
				}else{
					obj[type]= childJSON
				}
				child=PropertySet.GetChild(++i);
			}
			return obj;
		}
	//Existing service
	VHAAppUtilities.ExistingServiceWF = function(BillingAccNumber) {
	var service = SiebelApp.S_App.GetService("Workflow Process Manager");
	 var InputsBS = SiebelApp.S_App.NewPropertySet();
	 InputsBS.SetProperty("ProcessName", "VHA Sales Calculator Query Customer Account Details WF");
	 InputsBS.SetProperty("BillingAccountNumber", BillingAccNumber);
	 var OutputBS = service.InvokeMethod("RunProcess", InputsBS);
	 const resultSetBS = OutputBS?.GetChildByType("ResultSet");
	 const finalOutput = resultSetBS?.childArray?.[0]?.childArray?.[0]?.childArray?.[0]?.childArray?.[0];
	 let Jsonresult = VHAAppUtilities.psToJSON(finalOutput);
	 return Jsonresult;	
	}
	//exiting cust details
	VHAAppUtilities.ExistingCustdeatilsWF = function(BillingAccNumber) {
	var SerWF = SiebelApp.S_App.GetService("Workflow Process Manager");
	 var InWF = SiebelApp.S_App.NewPropertySet();
	 InWF.SetProperty("ProcessName", "VHA Sales Calculator Query Customer Account Details WF");
	 InWF.SetProperty("BillingAccountNumber", BillingAccNumber);
	 var OutWF = SerWF.InvokeMethod("RunProcess", InWF);
	 return OutWF;	
	}
	//PropertySet to JSON
    VHAAppUtilities.GetJSON = function(ResultSet) {
        var PropertyLength = ResultSet.GetPropertyCount();
        var Data = {};
        var propName = ResultSet.GetFirstProperty();
        if (propName != null) {
            for (i = 0; i < PropertyLength; i++) {
                Data[propName] = ResultSet.GetProperty(propName);
                propName = ResultSet.GetNextProperty();
            }
        }
        return Data;
    };
    VHAAppUtilities.CallBS = function(BSName, Method, Inputs, Options) {
        try {
            var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
            var propName = Inputs.GetFirstProperty();
            Inputs.SetProperty("Service Name", BSName);
            Inputs.SetProperty("Method Name", Method);
            var out = ser.InvokeMethod("Run Process", Inputs);
            var ResultSet = out.GetChildByType("ResultSet");
            if (typeof Options == "object") {
                if (Options.Type && Options.Type == "JSONString") {
                    return JSON.stringify(this.GetJSON(ResultSet));
                } else {
                    if (Options.Type && Options.Type == "JSON") {
                        return this.GetJSON(ResultSet);
                    } else {
                        return ResultSet;
                    }
                }
            } else {
                return ResultSet;
            }
        } catch (e) {
            console.log("Error : " + e);
        }
    };
    VHAAppUtilities.GetPickListValues = function(LOVType, SearchString, Options) {
        var inp = SiebelApp.S_App.NewPropertySet();
        inp.SetProperty("Method Name", "RunProcess");
        inp.SetProperty("LOVType", LOVType);
        inp.SetProperty("SearchString", SearchString);
        var options = {};
        options.Type = "";
        var out = VHAAppUtilities.CallWorkflow("VF ID Details Workflow", inp);
        var IO = "LS Clinical List Of Values";
        var RawData = out.GetChildByType("SiebelMessage").GetChildByType("ListOf" + IO);
        var Picklist = new Array();
        RawData = VHAAppUtilities.SiebelMessageToArray(RawData);
        RawDataLen = RawData.length;
        if (Options && Options["All"]) {
            return RawData;
        } else {
            for (var i = 0; i < RawDataLen; i++) {
                Picklist[Picklist.length] = RawData[i]["Value"];
            }
            return Picklist;
        }
    };
    VHAAppUtilities.GetSiebelDataFromIO = function(SearchSpec, IntObjName, Options) {
        var BSName = "EAI Siebel Adapter";
        var Method = "Query";
        var Inps = SiebelApp.S_App.NewPropertySet();
        var Options = {};
        Inps.SetProperty("SearchSpec", SearchSpec);
        Inps.SetProperty("OutputIntObjectName", IntObjName);
        var Outs = VHAAppUtilities.CallBS(BSName, Method, Inps, Options);
        return Outs.GetChildByType("SiebelMessage").GetChildByType("ListOf" + IntObjName);
    };
    VHAAppUtilities.GetConfigList = function(SearchSpec, Options) {
        var ResultSet = VHAAppUtilities.GetSiebelDataFromIO(SearchSpec, "VHA Configuration List", Options);
        ResultSet = VHAAppUtilities.SiebelMessageToArray(ResultSet);
        return ResultSet;
    };
    VHAAppUtilities.CreateSiebelPropertySet = function(JsonArray) {
        var SiebProp = SiebelApp.S_App.NewPropertySet();
        for (rec in JsonArray) {
            SiebProp.SetProperty(rec, JsonArray[rec]);
        }
        return SiebProp;
    };
    VHAAppUtilities.DisplaySpinner = function(queryElement) {
        $(queryElement).parent().append("<img class='VHASpinner' src='images/custom/ajax-loader.gif' align='top'></img>");
    };
    VHAAppUtilities.HideSpinner = function() {
        setTimeout(function() {
            $(".VHASpinner").remove();
        }, 500);
    };
    VHAAppUtilities.ShowToolTip = function(sAppletName, sAppletId) {
        var sFieldNames, sToolTipTextArray;
        $.getJSON("scripts/siebel/custom/tooltiptext.json", function(textoutput) {
            sFieldNames = textoutput.FieldNames;
            sToolTipTextArray = textoutput.ToolTipText;
        });
        $.getJSON("scripts/siebel/custom/tooltipappletcontrolmapping.json", function(jd) {
            var string_json = JSON.stringify(jd).substring(1, JSON.stringify(jd).length - 1);
            var sSlicedString = string_json.slice(string_json.indexOf(sAppletName) - 1);
            sSlicedString = sSlicedString.indexOf(",") != -1 ? sSlicedString.slice(0, sSlicedString.indexOf(",")) : sSlicedString;
            var sFieldsArray = sSlicedString.split(":")[1].slice(1, sSlicedString.split(":")[1].length - 1).split("|");
            setTimeout(function() {
                sFieldsArray.forEach(addToolTip);
            }, 500);
            function addToolTip(item, index) {
                if ($("#" + sAppletId + " [aria-label^='" + item + "'],[data-display^='" + item + "']").parent().find("img").length == 0) {
                    $("#" + sAppletId + " [aria-label^='" + item + "'],[data-display^='" + item + "']").parent().append("<img src = 'images/custom/get_info.svg'>");
                    getToolTipText(item);
                }
            }
            function getToolTipText(item) {
                var sIndex = sFieldNames.indexOf(item);
                var sToolTipText = sToolTipTextArray[sIndex];
                showToolTip(sToolTipText, item);
            }
            function showToolTip(sToolTipText, sUIItem) {
                var sPlaceHolder = "[aria-label^='" + sUIItem + "']~img,[data-display^='" + sUIItem + "']~img";
                $(sPlaceHolder).on("mouseout", function(e) {
                    var myTarget = e.target;
                    if ($(myTarget).attr("src") == "images/custom/get_info.svg") {
                        $(".ui-tooltip").trigger("mouseenter");
                    }
                });
                $(sPlaceHolder).tooltip({
                    content: sToolTipText,
                    position: {
                        my: "left center",
                        at: "right+15 top",
                        of: sPlaceHolder,
                        show: {
                            duration: 800
                        },
                        using: function(position, feedback) {
                            $(this).css("left", position.left);
                            $(this).css("top", position.top - 30);
                            $(this).addClass(feedback.horizontal);
                        }
                    },
                    hide: false
                });
            }
        });
    };
	VHAAppUtilities.doSearchAddress = function(request,AddressFilter)  
	{
	var addressList,response;
	var sUrl=$(location).attr('protocol')+"//"+$(location).attr('host')+"/psmaAddressSearch/doSearchAddress?query="+request.term+"&maxNumberOfResults=10";
	sUrl=(AddressFilter!=false)?sUrl+"&addressType=physical": sUrl;
	$.ajax( {
         method:"GET",
          url: sUrl,
          dataType: "json",
          "async": false,
          "crossDomain": true,
          success: function( data ) {
		  if(typeof(data.fault)!="undefined" || typeof(data.error)!="undefined" || typeof(data.message)!="undefined" || typeof(data.messages)!="undefined")
		  {
		   addressList=false;
		   if(typeof(data.fault)!="undefined")
		   {
			   if(typeof(data.fault.detail.description)!="undefined") 
				   alert(data.fault.detail.description);
			   else if(typeof(data.fault.detail.errorcode)!="undefined") 
				   alert(data.fault.detail.errorcode);
			   else
				   alert("Something did not go as expected.");
		   }
		   if(typeof(data.message)!="undefined"){alert(data.message[0]);}
	       if(typeof(data.messages)!="undefined")
		   {
			if(data.messages[0]!="There are no suggestions given the query and parameters, please broaden search parameters for suggestions")
				alert(data.messages[0]);
		   }
		  }
			  else
			  {
              addressList = $.map(data.suggest,function(n,i){
                return {"id": n.id, "value": n.address}
              });
			  }
			
          }
        } );	
		return addressList;	
	}
	VHAAppUtilities.getAddress = function(ui) 
	{
	var sUrl=$(location).attr('protocol')+"//"+$(location).attr('host')+"/psmaAddressSearch/getAddress/"+ui.item.id;
	var sResp=false;
	var settings = {
        "async": false,
        "crossDomain": true,
        "url": sUrl,
        "method": "GET"
        }

        $.ajax(settings).done(function (response) {
		if(typeof(response.fault)!="undefined" || typeof(response.error)!="undefined" || typeof(response.message)!="undefined" || typeof(response.messages)!="undefined")
		{
		if(typeof(response.fault)!="undefined"){alert(response.fault.detail.description);}
		if(typeof(response.error)!="undefined"){alert(response.error.description);}
		if(typeof(response.message)!="undefined"){alert(response.message[0]);}
	    if(typeof(response.messages)!="undefined"){alert(response.messages[0]);}
		}
		else
		{
			sResp=response;
		}
		});
		return sResp;
	}
	VHAAppUtilities.updateAddress = function(response,Inp)
	{
	var sAddrAttributes=['contributor','dataset','type','id'];
	var sErrMsg=false;
	var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
	var Inputs=SiebelApp.S_App.NewPropertySet();
	Inputs.SetProperty("Service Name", "PRM ANI Utility Service");
	Inputs.SetProperty("Method Name","CreateEmptyPropSet");
	Inputs.SetProperty("Hierarchy Name", "VHA PSMA Response Integration Object");
	var out = ser.InvokeMethod("Run Process", Inputs);
	var SblMessage = out.GetChildByType("ResultSet").GetChildByType("SiebelMessage"); 
	$.map(response.address, function(i,j){
	if($.inArray(j,sAddrAttributes)!=-1 && i!=null)
	SblMessage.GetChild(0).GetChild(0).SetProperty(j,i);
	});	
	$.map(response.address.geometry, function(i,j){
	if(j!="coordinates" && i!=null)
	 SblMessage.GetChild(0).GetChild(0).GetChildByType("ListOfgeometry").GetChild(0).SetProperty(j,i);
	if(j=="coordinates" && i.length>0)
	{
		SblMessage.GetChild(0).GetChild(0).GetChildByType("ListOfgeometry").GetChild(0).GetChildByType("ListOfcoordinates").GetChild(0).SetProperty("x_Value",i[0]);
		SblMessage.GetChild(0).GetChild(0).GetChildByType("ListOfgeometry").GetChild(0).GetChildByType("ListOfcoordinates").GetChild(0).SetProperty("y_Value",i[1]);
	}	
	});
	$.map(response.address.properties, function(i,j){
	i=(i!=null && (j=="street_type_description" || j=="complex_level_type" || j=="complex_unit_type"))?mCamelCase(i):i;
	if(i!=null)
	SblMessage.GetChild(0).GetChild(0).GetChildByType("ListOfproperties").GetChild(0).SetProperty(j,i);
	});	
	var ser1 = SiebelApp.S_App.GetService("VF BS Process Manager");
	Inp.SetProperty("Service Name", "Workflow Process Manager");
	Inp.SetProperty("Method Name", "RunProcess");
	Inp.SetProperty("ProcessName","VHA Generic PSMA Address Search Workflow");
	SblMessage.SetType("SiebelMessage");
	Inp.AddChild(SblMessage);
	var op = ser1.InvokeMethod("Run Process",Inp);
	if(op.GetChildByType("Errors")!=null)
	  sErrMsg=op.GetChildByType("Errors").GetChild(0).GetProperty("ErrMsg");
	function mCamelCase(str) {
	var sWrdsArr = str.split(' ');
	str = "";
	$.each(sWrdsArr, function(ind, val) {
	if (ind != 0)
		str = str + " " + val[0].toUpperCase() + val.toLowerCase().substring(1);
	else
		str = str + val[0].toUpperCase() + val.toLowerCase().substring(1);
	});
	return str;
	}
	return sErrMsg;
	}
}

