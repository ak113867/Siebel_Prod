if (typeof(SiebelAppFacade.VF_Intelligence_Search_FBB_PR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VF_Intelligence_Search_FBB_PR");
 define("siebel/custom/VF_Intelligence_Search_FBB_PR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.VF_Intelligence_Search_FBB_PR = (function () {

    function VF_Intelligence_Search_FBB_PR(pm) {
     SiebelAppFacade.VF_Intelligence_Search_FBB_PR.superclass.constructor.apply(this, arguments);
		 //Chitra Added for upgarde OUI SQ availablity change
		 this.GetPM().AttachPostProxyExecuteBinding("SiteQualification", SiteQualification, {
						scope : this,
						sequence : false
					});
		this.GetPM().AttachPostProxyExecuteBinding("ChangeAddress", SiteQualification, {
						scope : this,
						sequence : false
					});
    }

    SiebelJS.Extend(VF_Intelligence_Search_FBB_PR, SiebelAppFacade.PhysicalRenderer);

    VF_Intelligence_Search_FBB_PR.prototype.Init = function () {
     SiebelAppFacade.VF_Intelligence_Search_FBB_PR.superclass.Init.apply(this, arguments);
    }

    VF_Intelligence_Search_FBB_PR.prototype.ShowUI = function () {
	 SiebelAppFacade.VF_Intelligence_Search_FBB_PR.superclass.ShowUI.apply(this, arguments);
	 var t_this=this;
	 setTimeout(function () {
	 var controls = t_this.GetPM().Get("GetControls");
	 /*$("input[name="+controls["NBN Location Id"].GetInputName()+"]").addClass("VFDisplayNone");
	 $("#NBN_Location_Id_Label").parent().addClass("VFDisplayNone");*/
	 if(!($("#"+controls["Check NBN Address"].GetInputName()+"_Ctrl").hasClass("VFDisplayNone")))
	 {
	 $("#"+controls["Check NBN Address"].GetInputName()+"_Ctrl").addClass("VFDisplayNone");
	 $("#"+controls["Site Qualification"].GetInputName()+"_Ctrl").addClass("VFDisplayNone");
	 

			//Chitra Added for upgarde OUI SQ availablity change
			var SQAvailability = $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').val();
				   if (SQAvailability == "Yes") {
					   $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
				   }
				   else if(SQAvailability == "No"){
					   $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
				   }
				   else{
					  $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').removeClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour'); 
				   }
			
			var sView = SiebelApp.S_App.GetActiveView().GetName();
				    //$('[aria-labelledby*="WSDL_"]').not('[aria-labelledby="WSDL_Address_Label"]').closest('td').parent().css("display", "none");
					//$('[aria-labelledby*="WSDL_"]').not('[aria-labelledby="WSDL_Address_Label"]').closest('td').css("display","none");
					//$('[id*="WSDL_"]').not('[id="WSDL_Address_Label"]').closest('td').css("display","none");
					//$('[aria-labelledby="Address_Label"]').parent().find('img').remove();
					//$('[aria-labelledby="Address_Label"]').parent().find('img').remove();/*Keerthana - Commented to fix upgrade issue in IP18- 14/03/2019*/
					$('[aria-labelledby="Address_Label"]').parent().find(".siebui-icon-pick").remove(); /*Keerthana - Added to fix upgrade issue in IP18- 14/03/2019*/
					$('[title="Show Available"]').hide();
					//$('[aria-labelledby="Cal_Full_Address_Label"]').parent().parent().parent().hide();
					//Chitra Added for upgarde OUI SQ availablity change
					$('#NBN_Address_Information_Label').parent().parent().parent().parent().parent().parent().before("<div class = 'VHANBNAddreSection'><div class='VHANBNPageLabel VHANBNAddressLabel'>NBN Address Information</div><div class='VHANBNPageLabel VHANBNAddressSearchLabel'>Address Search Results</div></div>");
					$('#Service_Request_Label').parent().parent().parent().parent().parent().parent().before("<div class = 'VHANBNSRSection'><div class='VHANBNPageLabel VHANBNSRLabel'>Service Request(When NBN Address is not available)</div></div>");
					$('#Capture_Lead_Details_Label').parent().parent().parent().parent().parent().parent().before("<div class = 'VHANBNSRSection'><div class='VHANBNPageLabel VHANBNLeadLabel'>Capture Lead Details (In case Site/Address is not in NBN/VHA footprint or Customer not interested)</div></div>");
					$('#Site_Qualilfication_Label').parent().parent().parent().parent().parent().parent().before("<div class='VHANBNPageLabel VHANBNSQLabel'>NBN Availability Status<div class='siebui-applet-container siebui-collapsible siebui-collapsible-applet-container VHASQExpandCollapse'><span class='siebui-button-secondary siebui-btn-icon-expanded VHASQInfoexpand VHADisplayblock'><a href='javascript:void()' role='link' tabindex='0' aria-label='NBNSQ:Expand Applet'></a></span><span class='siebui-button-secondary siebui-btn-icon-collapsed VHASQInfocollapse VHADisplaynone'><a href='javascript:void()' role='link' tabindex='0' aria-label='NBN:Collapse Applet'></a></span></div></div>");
					$('#Order_Information_Label').parent().parent().parent().parent().parent().parent().before("<div class='VHANBNPageLabel VHANBNOrderInfoLabel'>Order Information<div class='siebui-applet-container siebui-collapsible siebui-collapsible-applet-container VHAOrderExpandCollapse'><span class='siebui-button-secondary siebui-btn-icon-expanded VHAOrderInfoexpand VHADisplayblock'><a href='javascript:void()' role='link' tabindex='0' aria-label='NBNSQ:Expand Applet'></a></span><span class='siebui-button-secondary siebui-btn-icon-collapsed VHAOrderInfocollapse VHADisplaynone'><a href='javascript:void()' role='link' tabindex='0' aria-label='NBN:Collapse Applet'></a></span></div></div>");
					$('#NBN_Address_Information_Label').parent().hide();
					$('#Address_Search_Results_Label').parent().hide();
					$('#Site_Qualilfication_Label').parent().hide();
					$('#Order_Information_Label').parent().hide();
					$('#Service_Request_Label').parent().hide();
					$('#Capture_Lead_Details_Label').parent().hide();
					
					var BO = SiebelApp.S_App.GetActiveBusObj();
					var BC = BO.GetBusCompByName("VHA Site Qualification BC");
					var Id = BC.GetFieldValue("Id");
					if(Id == "")
					{
						/*$("#Site_Qualilfication_Label").parent().parent().parent().parent().siblings().hide();*/
						$('.VHANBNSQLabel').siblings().hide();
						$('.VHANBNOrderInfoLabel').siblings().hide();
						//$('[title="Service List List Applet"]').parent().hide();
						$('[title="Service List"]').siblings().hide();
					}
						
					$(".siebui-icon-bttns_more").addClass("VHADisplaynone");//SIT mANI	
				
			var sViewName = SiebelApp.S_App.GetProfileAttr("ViewName");
				var sView = SiebelApp.S_App.GetActiveView().GetName();
				if ("" + sView == "VHA NBN Site Qualification Postpay TBUI") {

					//$('[aria-labelledby="Refine_Address_Search_Label"]').css("border","none !important");
				  //  Madhu;08May19;Commenting this code block as thi control is no longer used
 				  $('[aria-labelledby="Refine_Address_Search_Label"]').addClass("vha_remove_border");
				    $('[aria-labelledby="Refine_Address_Search_Label"]').next('.siebui-icon-pick').css("border","none");
					$('[aria-labelledby="Refine_Address_Search_Label"]').css("width","0px");
					$('[aria-labelledby="Refine_Address_Search_Label"]').css("height","0px");
					$('[aria-labelledby="Refine_Address_Search_Label"]').css("padding","7px");
					$('[aria-labelledby="Refine_Address_Search_Label"]').css("padding-top","0px");
					$('[aria-labelledby="Refine_Address_Search_Label"]').css("padding-bottom","0px");
					$('[aria-labelledby="Address_Label"]').autocomplete({
						source : function (request, response) {
							//VHAAppUtilities.DisplaySpinner($("input[name='"+controls["Address"].GetInputName()+"']"));
							var service = SiebelApp.S_App.GetService("QAS WSDL");
							var inPS = SiebelApp.S_App.NewPropertySet();
							var sValue = $('[aria-labelledby="Address_Label"]').val();
							inPS.SetProperty("SearchString", sValue);
							if (service) {
								var outPS = service.InvokeMethod("DoSearchProxy", inPS);
								var resultSet = outPS.GetChild(0);
								var addrCount = resultSet.GetChildCount();
								var addrArray = [];
								if (resultSet) {
									for (var i = 0; i < addrCount; i++) {
										addrArray.push(resultSet.GetChild(i).GetProperty("QAS Wsdl Address") + "~^" + resultSet.GetChild(i).GetProperty("QAS Wsdl Moniker"));
									}
								}
								//Added for PKE fix - Chitra
								var Inputs = SiebelApp.S_App.NewPropertySet();
								var Output = SiebelApp.S_App.NewPropertySet();
								var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
								Inputs.SetProperty("Service Name", "SIS OM PMT Service");
								Inputs.SetProperty("Method Name", "Set Profile Attribute");
								Inputs.SetProperty("Profile Attribute Name", "QAS Query Executed");
								Inputs.SetProperty("Profile Attribute Value", "Y");
								
								var Output = ser.InvokeMethod("Run Process", Inputs);
							}
							response($.map(addrArray, function (item, id) {
									//VHAAppUtilities.HideSpinner();
									var res = item.split("~^");
									return {
										value : res[0],
										id : res[1]
									}
								}));
						},
						minLength : 10,
						appendTo: $('[aria-labelledby="Address_Label"]').parent(),
						select : function (event, ui) {
							var sPickAddr = ui.item.value;
							var sMonikerval = ui.item.id;
							var service = SiebelApp.S_App.GetService("QAS WSDL");
							var inPS = SiebelApp.S_App.NewPropertySet();
							inPS.SetProperty("PickMoniker", sMonikerval);
							inPS.SetProperty("PickFullAddr", sPickAddr);
							if (service) {
								//VHAAppUtilities.DisplaySpinner($("input[name='"+controls["Address"].GetInputName()+"']"));
								var outPS = service.InvokeMethod("GetAddressPostpayOUI", inPS);
								var resultSet = outPS.GetChild(0).GetChild(0);

								var sPickFullAddr = resultSet.GetProperty("QAS Wsdl Address");
								var sUnitType = resultSet.GetProperty("Floor Type");
								var sUnitNumber = resultSet.GetProperty("Floor");
								var sBuildingName = resultSet.GetProperty("Address Building");
								var sBuildingNumber = resultSet.GetProperty("Street Number");
								var sStreetName = resultSet.GetProperty("Street Name");
								var sStreetType = resultSet.GetProperty("Street Type");
								var sSuburb = resultSet.GetProperty("Suburb");
								var sState = resultSet.GetProperty("State");
								var sPostcode = resultSet.GetProperty("Post Code");
								var sCountry = resultSet.GetProperty("Country");
								var sDPID = resultSet.GetProperty("DPID");
								var WSDLValidationStatus = resultSet.GetProperty("Validation Status");
								var WSDLAddressType = resultSet.GetProperty("Address Type");
								var WSDLPOBox = resultSet.GetProperty("PO Box");
								var WSDLPrivateBag = resultSet.GetProperty("Private Bag");

								var sservice = SiebelApp.S_App.GetService("QAS WSDL");
								var inpPS = SiebelApp.S_App.NewPropertySet();
								var outpPS = SiebelApp.S_App.NewPropertySet();
								inpPS.SetProperty("sPickFullAddr", sPickFullAddr);
								inpPS.SetProperty("sUnitType", sUnitType);
								inpPS.SetProperty("sUnitNumber", sUnitNumber);
								inpPS.SetProperty("sBuildingName", sBuildingName);
								inpPS.SetProperty("sBuildingNumber", sBuildingNumber);
								inpPS.SetProperty("sStreetName", sStreetName);
								inpPS.SetProperty("sStreetType", sStreetType);
								inpPS.SetProperty("sSuburb", sSuburb);
								inpPS.SetProperty("sState", sState);
								inpPS.SetProperty("sPostcode", sPostcode);
								inpPS.SetProperty("sCountry", sCountry);
								inpPS.SetProperty("sDPID", sDPID);
								inpPS.SetProperty("WSDLAddressType", WSDLAddressType);
								inpPS.SetProperty("WSDLPOBox", WSDLPOBox);
								inpPS.SetProperty("WSDLPrivateBag", WSDLPrivateBag);

								outpPS = sservice.InvokeMethod("UpdateAddressPostpayOUI", inpPS);
														
								var sInterfaceCallBS = "Workflow Process Manager";
								var WFProcessName = "VHA Generic VBC"; 
								var BOMap = "VHA VBC Generic";
								var BO = "VHA VBC Generic";
								var BCMap = "List Of Values"; 
								var BC = "VF Transaction Settings";
								var sIntCallInputs = SiebelApp.S_App.NewPropertySet();
								var sIntCallOutputs = SiebelApp.S_App.NewPropertySet();
								
								var ser = SiebelApp.S_App.GetService(sInterfaceCallBS);
								//var propName = Inputs.GetFirstProperty();
								sIntCallInputs.SetProperty("Service Name", sInterfaceCallBS);
								sIntCallInputs.SetProperty("Method Name", "Run Process");								
								
								
								//sIntCallInputs.SetProperty("SessionId",sessionId);
								sIntCallInputs.SetProperty("ProcessName",WFProcessName);
								sIntCallInputs.SetProperty("BusObjectMap", BOMap);
								sIntCallInputs.SetProperty("BusObject", BO);
								sIntCallInputs.SetProperty("BusCompMap", BCMap);
								sIntCallInputs.SetProperty("BusComp", BC);
								sIntCallInputs.SetProperty("ManualSearch", 'Y');
								sIntCallInputs.SetProperty("TransactionName","VHA NBN Query Address");
								sIntCallInputs.SetProperty("TransactionType","VBC_QUERY");
								sIntCallInputs.SetProperty("LOVType","VHA_NBN_TOUCHPOINT");
								sIntCallInputs.SetProperty("Value","VHANBNAddressMapQASNewCustomer");
								sIntCallInputs.SetProperty("PropSet1",sSuburb);
								sIntCallInputs.SetProperty("PropSet2",sStreetName);
								sIntCallInputs.SetProperty("PropSet3",sStreetType);
								sIntCallInputs.SetProperty("PropSet4",sBuildingName);
								sIntCallInputs.SetProperty("PropSet5",sUnitType);
								sIntCallInputs.SetProperty("PropSet6",sUnitNumber);
								sIntCallInputs.SetProperty("PropSet7",sBuildingNumber);
								sIntCallInputs.SetProperty("PropSet8",sPostcode);
								sIntCallInputs.SetProperty("PropSet9",sState);
								sIntCallInputs.SetProperty("PropSet10","");
								sIntCallInputs.SetProperty("PropSet11","");
								sIntCallInputs.SetProperty("PropSet12","");
								sIntCallInputs.SetProperty("PropSet13","");
								sIntCallInputs.SetProperty("PropSet14","");
								sIntCallInputs.SetProperty("PropSet15","");
								sIntCallInputs.SetProperty("PropSet16","");

								sIntCallOutputs = ser.InvokeMethod("RunProcess", sIntCallInputs);
								//sIntCallOutputs = sInterfaceCallBS.InvokeMethod("GenericVBCCall", sIntCallInputs);
								var AdderssList = sIntCallOutputs.GetChildByType("ResultSet")
								.GetChildByType("NBNRespMsg")
								.GetChildByType("ListOfVHA NBN Query Address Response IO")
								.GetChildByType("ListOfInterface")
								.GetChildByType("ListOfNBNAddressResponse")
								.GetChildByType("NBNAddressResponse")
								.GetChildByType("ListOfVHA NBN Query Address");
								AdderssList = VHAAppUtilities.SiebelMessageToArray(AdderssList);
								//console.log(sIntCallOutputs.GetChildByType("ResultSet"));
								appendDialogTemplate();
								$(".VHADialogDataSection").html("");
								VHAAppUtilities.SetConstants("NBNAddressList",AdderssList);

								var AdderssListLen = AdderssList.length;
								//VHAAppUtilities.HideSpinner();
								if (AdderssListLen > 1){
									for(var i =0 ;i < AdderssListLen; i++){
										var template = '<div class="VHAIDTypeLine VHAIDTypeLineSelect">\
											<div class="VHAIDType VHASelectNBNAddress" LOCID='+AdderssList[i]["NBN Location Id"]+'>'+getFullAddress(AdderssList[i])+'</div>\
											<div class="VHALineSpace"></div>\
										</div>';
										$(".VHADialogDataSection").append(template);
									}
									$("#openModal").removeClass("VHADisplayNone");
								}

								if(AdderssListLen === 1){
									updateSelectedNBNAddress(AdderssList[0]["NBN Location Id"]);
								}
							}
						}

					});
					

				}
				//manikandan- for task pane auto close
				$(".siebui-icon-bttns_more").addClass("VHADisplaynone");
	}
	}, 1);
	}	
	
	function getSessionId (){
		var SessionApplet =  SiebelApp.S_App.GetActiveView().GetApplet("VF Task Session Form Applet – TBUI");
		var pm = SessionApplet.GetPModel();
		var RecSet = pm.Get("GetRecordSet");
		return RecSet[0]["Session Id"];
	}
	function getFullAddress(AddressList) {
		var AddGeoCode = AddressList["Address Geography Code"];
		var AddrSiteBldgName = AddressList["Address Site Building Name"];
		var Lat =  AddressList["Latitude"];
		var LevelNum =  AddressList["Level Number"];
		var LevelType =  AddressList["Level Type"];
		var LocSubName =  AddressList["Locality Suburb Name"];
		var LocDesc =  AddressList["Location Descriptor"];
		var Long =  AddressList["Longitude"];
		var LotNum =  AddressList["Lot Number"];
		var NBNLocId =  AddressList["NBN Location Id"];
		var PlanNum =  AddressList["Plan Number"];
		var PostCode =  AddressList["Post Code"];
		var SecRoadName =  AddressList["Secondary Road Name"];
		var SecRoadNum1 =  AddressList["Secondary Road Number1"];
		var SecRoadNum2 =  AddressList["Secondary Road Number2"];
		var SecRoadSuffCode =  AddressList["Secondary Road Suffix Code"];
		var SecRoadTypeCode =  AddressList["Secondary Road Type Code"];
		var SecSiteBldgName =  AddressList["Secondary Site Building Name"];
		var StateTerritoryCode =  AddressList["State Territory Code"];
		var StRoadName =  AddressList["Street Road Name"];
		var StRoadNum1 =  AddressList["Street Road Number1"];
		var StRoadNum2 =  AddressList["Street Road Number2"];
		var StRoadTypeCode =  AddressList["Street Road Type Code"];
		var StRoadTypeSuffCode =  AddressList["Street Road Type Suffix Code"];
		var UnitNum =  AddressList["Unit Number"];
		var UnitType =  AddressList["Unit Type"];

		
		var NBNAddrCalc1Unit = (UnitType=="")?((UnitNum=="")?"":UnitNum+","):((UnitNum=="")?UnitType+",":UnitType+" "+UnitNum+",");
		var NBNAddrCalc2LOT	=  (LotNum=="")?"":"LOT "+LotNum+",";
		var NBNAddrCalc3Street = (StRoadNum1=="")?((StRoadNum2=="")?((StRoadName=="")?((StRoadTypeCode=="")?"":StRoadTypeCode+","):StRoadName+" "+StRoadTypeCode+","):((StRoadName=="")?((StRoadTypeCode=="")?StRoadNum2+",":StRoadNum2+" "+StRoadTypeCode+","):StRoadNum2+" "+StRoadName+" "+StRoadTypeCode+",")):((StRoadNum2=="")?((StRoadName=="")?((StRoadTypeCode=="")?"":StRoadNum1+" "+StRoadTypeCode+","):StRoadNum1+" "+StRoadName+" "+StRoadTypeCode+","):((StRoadName=="")?((StRoadTypeCode=="")?StRoadNum1+"-"+StRoadNum2+",":StRoadNum1+"-"+StRoadNum2+" "+StRoadTypeCode+","):StRoadNum1+"-"+StRoadNum2+" "+StRoadName+" "+StRoadTypeCode+","));
		var NBNAddrCalc4Locality = (LocSubName=="")?((StateTerritoryCode=="")?((PostCode=="")?"":PostCode):StateTerritoryCode+" "+PostCode):((StateTerritoryCode=="")?((PostCode=="")?LocSubName:LocSubName+" "+PostCode):LocSubName+" "+StateTerritoryCode+" "+PostCode);
		var NBNAddrCalc5Level = (LevelType=="")?((LevelNum=="")?"":LevelNum):((LevelNum=="")?LevelType:LevelType+" "+LevelNum);
		var NBNAddrCalc6AddressSite = (AddrSiteBldgName=="")?"":AddrSiteBldgName;
		var NBNAddrCalc7ComplexRoad = (SecRoadNum1=="")?((SecRoadNum2=="")?"":SecRoadNum2+","):((SecRoadNum2=="")?SecRoadNum1+",":SecRoadNum1+"-"+SecRoadNum2+",");
		var NBNAddrCalc8ComplexStreet = (SecRoadName=="")?((SecRoadTypeCode=="")?"":SecRoadTypeCode+","):((SecRoadTypeCode=="")?SecRoadName+",":SecRoadName+" "+SecRoadTypeCode+",");
		var NBNAddrCalc9ComplexBuilding = (SecSiteBldgName=="")?"":SecSiteBldgName;
		NBNAddrCalc5Level = NBNAddrCalc5Level?"("+NBNAddrCalc5Level+")":NBNAddrCalc5Level;

		var NBNAddrCalc = NBNAddrCalc1Unit + " " +
					NBNAddrCalc2LOT + " " +
					NBNAddrCalc3Street + " " +
					NBNAddrCalc4Locality + " " +
					NBNAddrCalc6AddressSite + " " +
					NBNAddrCalc7ComplexRoad + " " +
					NBNAddrCalc8ComplexStreet + " " +
					NBNAddrCalc9ComplexBuilding + " " +
					NBNAddrCalc5Level;
		
		return NBNAddrCalc;

	}

	function appendDialogTemplate(){
		var Template= '<div id = "openModal" class = "modalDialog VHADisplayNone">\
						<div>\
							<div id = "VHAPrimaryIDTypesIDDetails">\
							<span class="VHAPopupClose">X</span>\
								<div class="VHADialogSectionHeader">\
									<h2 class="VHAIDPopUpHeader"> Confirm Address </h2>\
								</div>\
								<div class="VHADialogDataSection">\
								</div>\
								<div class="VHADialogButtonBar">\
									<div class="VHAAlertOKBtn VHANBNAddressDialogueClose appletButton">Close</div>\
								</div>\
							</div>\
						</div>\
					</div>';
		
		$("#openModal").remove();
		$('body').append(Template);
		//Below events are added here because they do not work when added as part of the bindevents function
		$("#openModal").delegate(".VHAPopupClose,.VHANBNAddressDialogueClose", "click", {},  function (e){
			$("#openModal").remove();
		});
		$("#openModal").delegate(".VHASelectNBNAddress", "click", { ctx: this },processSelectNBNAddressSelect);
	}
    VF_Intelligence_Search_FBB_PR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VF_Intelligence_Search_FBB_PR.superclass.BindData.apply(this, arguments);
    }
	//Chitra Added for upgarde OUI SQ availablity change
    VF_Intelligence_Search_FBB_PR.prototype.BindEvents = function () {
    SiebelAppFacade.VF_Intelligence_Search_FBB_PR.superclass.BindEvents.apply(this, arguments);
   /* $(".siebui-applet-content").delegate(".VHASQExpandCollapse", "click", function () { 
						ExpandCollapse("SQExpandCollapse");
					
				});
	$(".siebui-view").delegate(".VHAOrderExpandCollapse", "click", function () {
						ExpandCollapse("OrderExpandCollapse");
					
				});*/
				setTimeout(function () {
	$(".VHASQExpandCollapse").on("click",".siebui-button-secondary", function () { 
					ExpandCollapse("SQExpandCollapse");
					
				});
	$(".VHAOrderExpandCollapse").on("click",".siebui-button-secondary", function () { 
					ExpandCollapse("OrderExpandCollapse");
					
				});},40);
	}



		//$(".VHAPopupClose").on("click", function(e){$("#openModal").remove();});
		/*$("#openModal").delegate(".VHAPopupClose,.VHANBNAddressDialogueClose", "click", {},  function (e){
			$("#openModal").remove();
		});
		
		$("#openModal").on("click", ".VHANBNAddressDialogueClose", { ctx: this }, function (){
			$("#openModal").remove();
		});*/
		//$("#openModal").delegate(".VHASelectNBNAddress", "click", { ctx: this },processSelectNBNAddressSelect);
	
	function processSelectNBNAddressSelect(e){			
			updateSelectedNBNAddress($(this).attr("locid"));			
	}
	function updateSelectedNBNAddress(SelectedLOCId){
		var SelectedNBNAddressList = VHAAppUtilities.GetConstants("NBNAddressList");
		var SelectedNBNAddressListLen = SelectedNBNAddressList.length;
		var SelectedNBNAddress = {};
		for(var i = 0 ; i < SelectedNBNAddressListLen; i++){
			if(SelectedNBNAddressList[i]["NBN Location Id"] === SelectedLOCId){
				SelectedNBNAddress = SelectedNBNAddressList[i];
				break;
			}
		}			
		
		var Inputs = VHAAppUtilities.CreateSiebelPropertySet(SelectedNBNAddress);
		Inputs.SetProperty("SessionId",getSessionId());
		var Outputs = VHAAppUtilities.CallBS("VHA Utilities BS", "InsertNBNAddress", Inputs);

		var SQApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA SQ Address Form Applet TBUI");
		var controls = SQApplet.GetControls();
		var SQBtn = controls["Site Qualification"].GetInputName();
		$('[name="'+SQBtn+'"]').trigger("click");
		$("#openModal").remove();
	}
		//Chitra Added for upgarde OUI SQ availablity change
	function ExpandCollapse(OrderSQ){
		if(OrderSQ == "SQExpandCollapse")
		{
				if($('.VHASQInfoexpand').hasClass("VHADisplayblock"))
				{
					$('.VHASQInfoexpand').addClass("VHADisplaynone").removeClass("VHADisplayblock");
					$('.VHASQInfocollapse').addClass("VHADisplayblock").removeClass("VHADisplaynone");
					$('.VHANBNSQLabel').siblings().show();
					$('[title="Service List"]').siblings().show();
					var SQAvailability = $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').val();
					if (SQAvailability == "Yes") {
						   $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
					   }
					   else if(SQAvailability == "No"){
						   $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
					   }
					   else{
						  $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').removeClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour'); 
					   }
					
				}
				else
				{
					$('.VHASQInfoexpand').addClass("VHADisplayblock").removeClass("VHADisplaynone");
					$('.VHASQInfocollapse').addClass("VHADisplaynone").removeClass("VHADisplayblock");
					$('.VHANBNSQLabel').siblings().hide();
					$('[title="Service List"]').siblings().hide();
					
				}
		}
		else if(OrderSQ == "OrderExpandCollapse")
		{
			if($('.VHAOrderInfoexpand').hasClass("VHADisplayblock"))
				{
					$('.VHAOrderInfoexpand').addClass("VHADisplaynone").removeClass("VHADisplayblock");
					$('.VHAOrderInfocollapse').addClass("VHADisplayblock").removeClass("VHADisplaynone");
					$('.VHANBNOrderInfoLabel').siblings().show();
					
				}
				else
				{
					$('.VHAOrderInfoexpand').addClass("VHADisplayblock").removeClass("VHADisplaynone");
					$('.VHAOrderInfocollapse').addClass("VHADisplaynone").removeClass("VHADisplayblock");
					$('.VHANBNOrderInfoLabel').siblings().hide();
					
				}
		}	
	}
	//Chitra Added for upgarde OUI SQ availablity change
	function SiteQualification(pm) {
				var sFlowName=$('.siebui-applet-taskui-h').html();
				function PostSiteQual()
				{
					$('.VHASQInfoexpand').addClass("VHADisplaynone").removeClass("VHADisplayblock");
					$('.VHASQInfocollapse').addClass("VHADisplayblock").removeClass("VHADisplaynone");
					$('.VHANBNSQLabel').siblings().show();
					/*$("#Site_Qualilfication_Label").parent().parent().parent().parent().siblings().show();*/
					$('[title="Service List"]').siblings().show();
					//$("#Order_Information_Label").parent().parent().parent().parent().siblings().show();
					$('.VHANBNOrderInfoLabel').siblings().show();
					setTimeout(function () {
					if($('.VHANBNOrderInfoLabel').length == 0)
					{
						
						$('#Order_Information_Label').parent().parent().parent().parent().parent().parent().before("<div class='VHANBNPageLabel VHANBNOrderInfoLabel'>Order Information<div class='siebui-applet-container siebui-collapsible siebui-collapsible-applet-container VHAOrderExpandCollapse'><span class='siebui-button-secondary siebui-btn-icon-expanded VHAOrderInfoexpand VHADisplayblock'><a href='javascript:void()' role='link' tabindex='0' aria-label='NBNSQ:Expand Applet'></a></span><span class='siebui-button-secondary siebui-btn-icon-collapsed VHAOrderInfocollapse VHADisplaynone'><a href='javascript:void()' role='link' tabindex='0' aria-label='NBN:Collapse Applet'></a></span></div></div>");
						$('#Order_Information_Label').parent().hide();
					}
					$('.VHAOrderInfocollapse').addClass("VHADisplayblock").removeClass("VHADisplaynone");
						$('.VHAOrderInfoexpand').addClass("VHADisplaynone").removeClass("VHADisplayblock");	
					},20);					
					var SQAvailability = $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').val();
					if (SQAvailability == "Yes") {
						   $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').addClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour');
					   }
					   else if(SQAvailability == "No"){
						   $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').removeClass('VHAActiveBorderColour').addClass('VHAInactiveBorderColour');
					   }
					   else{
						  $('[aria-labelledby="Can_Custoemr_Get_NBN_Label"]').removeClass('VHAActiveBorderColour').removeClass('VHAInactiveBorderColour'); 
					   }
					 
				}
				if(pm == "SiteQualification")
				{
				if(sFlowName!="Manage Service: NBN Availability")
					PostSiteQual();
				}
				else if(pm == "ChangeAddress")
				{
					/*$("#Site_Qualilfication_Label").parent().parent().parent().parent().siblings().hide();*/
					setTimeout(function () {
					$('.VHASQInfoexpand').addClass("VHADisplayblock").removeClass("VHADisplaynone");
					$('.VHASQInfocollapse').addClass("VHADisplaynone").removeClass("VHADisplayblock");
					$('.VHANBNSQLabel').siblings().hide();
					$('[title="Service List"]').siblings().hide();
					if($('.VHANBNOrderInfoLabel').length == 0)
						$('#Order_Information_Label').parent().parent().parent().parent().parent().parent().before("<div class='VHANBNPageLabel VHANBNOrderInfoLabel'>Order Information<div class='siebui-applet-container siebui-collapsible siebui-collapsible-applet-container VHAOrderExpandCollapse'><span class='siebui-button-secondary siebui-btn-icon-expanded VHAOrderInfoexpand VHADisplayblock'><a href='javascript:void()' role='link' tabindex='0' aria-label='NBNSQ:Expand Applet'></a></span><span class='siebui-button-secondary siebui-btn-icon-collapsed VHAOrderInfocollapse VHADisplaynone'><a href='javascript:void()' role='link' tabindex='0' aria-label='NBN:Collapse Applet'></a></span></div></div>");
					$('.VHANBNOrderInfoLabel').siblings().hide();
					$('.VHAOrderInfocollapse').addClass("VHADisplaynone").removeClass("VHADisplayblock");
					$('.VHAOrderInfoexpand').addClass("VHADisplayblock").removeClass("VHADisplaynone");
					}, 20);
				}
				//manikandan- for task pane auto close--start
				if(sFlowName=="Manage Service: NBN Availability")
				{
				$(".siebui-icon-bttns_more").click();
				setTimeout(function () {PostSiteQual();}, 20);
				$(".siebui-icon-bttns_more").addClass("VHADisplaynone");
				}
				//manikandan- for task pane auto close--end
	}

    VF_Intelligence_Search_FBB_PR.prototype.EndLife = function () {
     SiebelAppFacade.VF_Intelligence_Search_FBB_PR.superclass.EndLife.apply(this, arguments);
	 $(".siebui-icon-bttns_more").removeClass("VHADisplaynone");
    }

    return VF_Intelligence_Search_FBB_PR;
   }()
  );
  return "SiebelAppFacade.VF_Intelligence_Search_FBB_PR";
 })
}
