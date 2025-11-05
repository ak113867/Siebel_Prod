/*********************************************************************************************
16th July 2020: Shashi 
Functionalities Introduced: 
							Guided Flow
							Carousel
							Tooltip
							Search
************************************************************************************************/
if (typeof(SiebelAppFacade.VHAToTCommonViewPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAToTCommonViewPR");
 define("siebel/custom/VHAToTCommonViewPR", ["siebel/viewpr", "siebel/custom/bootstrap.min"],
  function () {
   SiebelAppFacade.VHAToTCommonViewPR = (function () {
    var pm = ""; var planType = "Voice"; var custType = "Old"; var app = ""; var forceStop="N"; var viewType="100";
	var sServIdn=""; var addCartUpd="Y"; 
	var totFlow="";	var uibusy ={selfbusy:false, mask:true, async:false,opdecode:true,target:SiebelApp.S_App.GetTargetViewContainer()};
	var searchCondition = [{"PlanType": "Voice", "ByDolar": "NA", "ByGB": "NA", "SearchInput": "NA", "Condition":"NA"}];
	var searchConditionPrepay = [{"PlanType": "365 day", "SearchInput":"NA"}];
	var planTypeBtn = [{"Name":"Voice","Class":"btn vhappbtn vhatotplantype","Id":"vhatothsplan"},
						{"Name":"MBB","Class":"btn vhappbtn vhatotplantype","Id":"vhatotmbbplan"},
						{"Name":"Cap Plans","Class":"btn vhappbtn vhatotplantype","Id":"vhatotcapplan"},						
						{"Name":"NBN","Class":"btn vhappbtn vhatotplantype","Id":"vhatotnbnplan"}];
	var searchByDolBtn = [{"Name":">$50","Class":"btn vhatotsearchbtn vhatotsearchcond","Context":">$50"},
						{"Name":"<$50","Class":"btn vhatotsearchbtn vhatotsearchcond","Context":"<$50"},
						{"Name":"=$50","Class":"btn vhatotsearchbtn vhatotsearchcond","Context":"=$50"}];
	var searchByGBBtn = [{"Name":">50GB","Class":"btn vhatotsearchbtn vhatotsearchcond","Context":">50GB"},
						{"Name":"<50GB","Class":"btn vhatotsearchbtn vhatotsearchcond","Context":"<50GB"},
						{"Name":"=50GB","Class":"btn vhatotsearchbtn vhatotsearchcond","Context":"=50GB"}];
	var sProductName = "";//ss103269: TOT Prepay Dynamic Commercial Offers Display
	var preplanTypeBtn=[];
	var preplanType="";
	var sPreplanType = "";
	var appMap = "";
	var authAppCtrl = "";
	var sPrepaySelect = "";

    function VHAToTCommonViewPR(pm) {
		SiebelAppFacade.VHAToTCommonViewPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAToTCommonViewPR, SiebelAppFacade.ViewPR);

    VHAToTCommonViewPR.prototype.Init = function () {
		SiebelAppFacade.VHAToTCommonViewPR.superclass.Init.apply(this, arguments);
		pm = this.GetPM();
		app = SiebelApp.S_App;
		appMap = SiebelApp.S_App.GetActiveView().GetAppletMap();
		authAppCtrl = appMap["VHA Transfer Authorization Applet"].GetControls();
		pm.AttachPMBinding('bsOutput', handleServerCallRes);		
    }
	
    VHAToTCommonViewPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHAToTCommonViewPR.superclass.ShowUI.apply(this, arguments);
	 $('#smartwizard .siebui-applet').addClass("VHAFullWidth");
	 createGuidedFlow();
	 $('#vha-tot-carousel').carousel();
	 $('#vha-tot-carousel-pre').carousel();
	 setUI();	 
    }

    VHAToTCommonViewPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHAToTCommonViewPR.superclass.BindData.apply(this, arguments);
    }
	
    VHAToTCommonViewPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHAToTCommonViewPR.superclass.BindEvents.apply(this, arguments);
	 /*$('#vha-cancel-btn').off("click").on("click", function(){
		SiebelApp.S_App.GotoView("CUT Home Page View (CME)");
		});*/
	
		var sIdapp = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Name Change Capture Id Details Applet"].GetFullId();
		$('#s_'+sIdapp+'_div').focusin(function(){
			if(VHAAppUtilities.GetConstants("isTOTCustDetilsUpt")=="Y"){
				VHAAppUtilities.SetConstants("isTOTCustDetilsUpt", "");
				//console.log("call validate - foucus in");
				mValidateAuthFields("Y");
			}
		});
	
		$('#vhaidvaladd>button').off("click").on("click", function(){
			mValidateAuthFields("N");
		});
		$('.vha-tot-deleteiconsm').off("click").on("click", function(){			
			$("#VHAClearCartConfirm").dialog("open");
		});
		
		$('#cartimg, .vhacusticon').off("click").on("click", function(){			
			if($('.select-plan').hasClass("vha-tot-w100")==true){
				//7030
				$('.select-plan')
					.removeClass("vha-tot-w100")
					.addClass("vha-tot-w70");
				$('.vha-tot-setupsec').removeClass("VFDisplayNone");
				viewType="7030";
			}
			else{
				//100
				$('.vha-tot-setupsec').addClass("VFDisplayNone");
				$('.select-plan')
					.removeClass("vha-tot-w70")
					.addClass("vha-tot-w100");
				viewType="100";
			}
			(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
		});
		
	 $('#vhatotreusebtn').off("click").on("click", function(){
	   	 $('#vhatotreusebtn').addClass('vhabtnredbg');
		 $('#vhatotnewbtn').removeClass('vhabtnredbg');
		 resetSearchUI("usertype");
		 custType = "Old"; planType = "Voice";
		 searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "NA", "SearchInput": "NA", "Condition":"NA"}];
		 if(!app.oldplanOut){
			 executeEvent(pm, "GET_OLDPLANDTLS_EVT", {
				 "ProcessName":"VHA Get Customer Current Plans",
				  "MSISDN": $("[name='"+authAppCtrl["Enter Transferring Mobile Number"].GetInputName()+"']").val()
			 });
		 }else{
			processoldplanData();
		 }
	 });
	  $('#vhatotnewbtn').off("click").on("click", function(){   	 
		$("#maskoverlay").styleShow();
		 totsleep(30).then(()=> {
			 $('#vhatotnewbtn').addClass('vhabtnredbg');
			 $('#vhatotreusebtn').removeClass('vhabtnredbg');
			 resetSearchUI("usertype");
			 custType = "New"; planType = "Voice";
			 searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "NA", "SearchInput": "NA", "Condition":"NA"}];
			 if(!app.newplanOut){			 
				 executeEvent(pm, "GET_NEWPLANDTLS_EVT", {
					 "ProcessName":"VHA TOT Retrieve Market Plans",
					 "TransferMSISDN":$("[name='"+authAppCtrl["Enter Transferring Mobile Number"].GetInputName()+"']").val()
					 //"61407502729"
				 });
			 }else{
				processnewplanData("Y");
			 }
			 $("#maskoverlay").styleHide();
		});		 
	 });
	 /*$('#vhatotvoucher').off("click").on("click", function(){
	   	 $('#vhatotvoucher').addClass('vhabtnredbg');
		 $('#vhatotcreditcard').removeClass('vhabtnredbg');		 
	 });
	  $('#vhatotcreditcard').off("click").on("click", function(){
	   	 $('#vhatotcreditcard').addClass('vhabtnredbg');
		 $('#vhatotvoucher').removeClass('vhabtnredbg');
	 });*/
	 
	$('.vhatotplantype').off("click").on("click", function(){
		var selectedptype = this.getAttribute("id");
		var l = $("button.vhatotplantype").length;
		for(var a = 0; a<l; a++){
			$($($("button.vhatotplantype"))[a]).removeClass("vhabtnredbg");
		}
		$(this).addClass('vhabtnredbg');
		resetSearchUI("plantype");
		switch(selectedptype){
			case "vhatothsplan":
				planType = "Voice";
				searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "NA", "SearchInput": "NA", "Condition":"NA"}];
				(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
			break;
			case "vhatotcapplan":
				planType = "Caps";
				searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "NA", "SearchInput": "NA", "Condition":"NA"}];
				(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
			break;
			case "vhatotmbbplan":
				planType = "MBB";
				searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "NA", "SearchInput": "NA", "Condition":"NA"}];
				(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
			break;
			case "vhatotnbnplan":
				planType = "NBN";
				searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "NA", "SearchInput": "NA", "Condition":"NA"}];
				(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
			break;
		}
	});
	$('.vhatotpreplantype').off("click").on("click", function(){
		var selectedptype = this.getAttribute("id");
		planType = "";
		var l = $("button.vhatotpreplantype").length;
		for(var a = 0; a<l; a++){
			$($($("button.vhatotpreplantype"))[a]).removeClass("vhabtnredbg");
		}
		$(this).addClass('vhabtnredbg');
		resetSearchUI("plantype");
		for(var i = 0; i<preplanTypeBtn.length; i++){
		var sIdval = preplanTypeBtn[i].Id;
		if(selectedptype == sIdval){
		planType = preplanTypeBtn[i].Name;
		break;}
		}		
		searchConditionPrepay = [{"PlanType": planType, "SearchInput":"NA"}];
		getTilesDataPrepay(app.plansPrepay, searchConditionPrepay);
	});//ss103269: TOT Prepay Dynamic Commercial Offers Display
	$('.vhatotsearchcond').off("click").on("click", function(){
		var selectedptype = this.getAttribute("context");
		var l = $("button.vhatotsearchcond").length;
		for(var a = 0; a<l; a++){
			$($($("button.vhatotsearchcond"))[a]).removeClass("vhabtnredbg");
		}
		$(this).addClass('vhabtnredbg');
		$('.totsearchplan').val('');
		switch(selectedptype){
			case ">$50":
				searchCondition = [{"PlanType": planType, "ByDolar": "50", "ByGB": "NA", "SearchInput": "NA","Condition":"greaterThan"}];
				(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
			break;
			case "<$50":
				searchCondition = [{"PlanType": planType, "ByDolar": "50", "ByGB": "NA", "SearchInput":  "NA","Condition":"lessThan"}];
				(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
			break;
			case "=$50":
				searchCondition = [{"PlanType": planType, "ByDolar": "50", "ByGB": "NA", "SearchInput": "NA","Condition":"equalTo"}];
				(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
			break;
			case ">50GB":
				searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "50", "SearchInput": "NA", "Condition":"greaterThan"}];
				(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
			break;
			case "<50GB":
				searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "50", "SearchInput": "NA", "Condition":"lessThan"}];
				(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
			break;
			case "=50GB":
				searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "50", "SearchInput": "NA", "Condition":"equalTo"}];
				(custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
			break;
		}
	});
	$("#smartwizard").on("vhacustomBtnClick", function(evt, btn){
		var btnId = $(btn).attr("id");
		switch(btnId){
			case "vha-cancel-btn":
				var name="";
				$('.NCIdrecLines').each(function(){
					name = "";
					var names = $(this).find('[name]').filter(function() {
						return $(this).attr('name').toLowerCase().indexOf('name') > -1;
					});
					names.each(function(){
						name = name + $(this).text() + " ";
					});
					if(name!=""){
						return false;
					}
				});
				$("#LeadName").val(name);
				$("#Leademail").val($("input[aria-label='Contact Email']").val());
				$("#LeadPhNo").val($("input[aria-label='Contact Number']").val());
				$("#VHACaptureLeadDialog").dialog("open");
			break;
			/*case "vha-cancel-btn":
				$("#cancelTOTFlow").dialog("open");				
			break;*/
			case "vha-tot-pause":
				var headerBC=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");
				var Inputs = SiebelApp.S_App.NewPropertySet();
                var Outs = SiebelApp.S_App.NewPropertySet();
				Inputs.SetProperty("BusObj","VHA TOT Generic BO");
				Inputs.SetProperty("BusComp","VHA TOT Generic BC");
				Inputs.SetProperty("Id",headerBC.GetFieldValue("Id"));
				Inputs.SetProperty("Status","Paused");
                Outs = VHAAppUtilities.CallBS(
                    "VHA TOT Processing Service", "BCSetField",
                    Inputs, {}
                );	
				if (SiebelApp.S_App.GetProfileAttr("VHA User Type") == "Retail") app.GotoView("VF Dashboard List View - TBUI");
				else app.GotoView("VF UInbox My Inbox Item List View - TBUI - Core");
			break;
			case "vha-tot-finish":
				$("#maskoverlay").styleShow();
				totsleep(30).then(()=> {
					var headerBC=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");				
					executeEvent(pm, "VHA_SUBMIT_ORDER", {
						 "ProcessName":"VHA TOT Submit Wrapper Workflow",
						 "TOTHeaderId":headerBC.GetFieldValue("Id")
						 //"TOTHeaderId":"3-CM5OYOD"
					});
					$("#maskoverlay").styleHide();
					if(forceStop=="Y"){
						forceStop="N";
						$("#smartwizard").smartWizard('goToStep',4);
						return false;
					}else{
						var sInps = SiebelApp.S_App.NewPropertySet();
						sInps.SetProperty("OrderHeaderId", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Id"));
						var sOuts = VHAAppUtilities.CallBS("VHA 3 Step Upgrade BS", "OrderLineUpdate", sInps);//ss103269: Addedd for SQL update to created_by for Orderline.
						
						//gotoview
						var sAppList = SiebelApp.S_App.GetActiveView().GetAppletMap();
						var Inps = SiebelApp.S_App.NewPropertySet();
						var Outs = SiebelApp.S_App.NewPropertySet();
						sAppList["VHA Transfer Authorization Applet"].GetPModel().ExecuteMethod("InvokeMethod","RefreshRecord",Inps);
						Inps.SetProperty("BusObjName", "Account");
						Inps.SetProperty("BusCompName", "Account");
						Inps.SetProperty("RowId", headerBC.GetFieldValue("Account Id"));
						Inps.SetProperty("ViewName", "VF Account Summary View");
						Outs = VHAAppUtilities.CallBS(
							"VHA MSISDN GotoView BS",
							"GotoView",
							Inps, {}
						);
						//SiebelApp.S_App.GotoView("CUT Home Page View (CME)");
					}					
				});
			break;
			case "vha-tot-prepay-next-1":
				var sPrcd=mValidateAuthFields("Y");
				if(sPrcd){					
					$("#smartwizard").smartWizard('goToStep',2);
					if((sPrepaySelect != "" || sPrepaySelect != null) && sPrepaySelect.indexOf("PrepaidMBB") == -1){
					$("#" + sPrepaySelect + "").addClass("vhabtnredbg");
					$("#" + sPrepaySelect + "").trigger("click");} //ss103269: Added fix for Defect# 1347
				}
				refreshTOTheader();
			break;
			case "vha-tot-prepay-reviewsum":				
				$("#maskoverlay").styleShow();
				totsleep(30).then(()=> {
					if($("#cart-prepay-addons").text() == ''){
						alert("Your cart is empty. Please add an item to procced further");
						return false;						
					}else{
						var headerBC=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");
						executeEvent(pm, "VHA_PREPAY_CREATE_ORDER", {
							 "ProcessName":"VHA TOT Order Flow Wrapper Workflow",
							 "Object Id":headerBC.GetFieldValue("Id"),
							 "Add-Ons":$('.tot-pre-plans #cart-prepay-addons').text()
							 //"TOTHeaderId":"3-CM5OYOD"
						});						
						if(forceStop=="Y"){
							forceStop="N";
							$("#smartwizard").smartWizard('goToStep',2);						
							return false;
						}else{
							$("#smartwizard").smartWizard('goToStep',4);
							return true;
						}
						refreshTOTheader();
					}
				});							
			break;
		}
	});
	
	$("#smartwizard").on("showStep", function(e , currIndex, stepNum, stepDir){		
		if(stepDir === "forward"){
			switch(stepNum){
				/*case 0:
					$("#smartwizard").smartWizard('goToStep',4);
				break;*/
				case 1:					
					loadDevice();
					SiebelAppFacade.VHATransferEmployeeDetailsAppletPR.CreditCheckShow();
				break;				
				case 2:
				$('#vhatotvoucher, #vhatotcreditcard').addClass('applet-button-readonly');
				$('.tot-pre-voucher').prop("readOnly", "readOnly").addClass("input-field");
				//$('#vhatotcreditcard').removeClass('vhabtnredbg');
				$('#vhatotreusebtn').addClass('vhabtnredbg');
				$('#vhatotnewbtn').removeClass('vhabtnredbg');
				resetSearchUI("usertype");
				executeEvent(pm, "GET_CUSTDTLS_EVT", {
						 "ProcessName":"VHA TOT Get Customer Details Cart Summary WF",
						 "CustomerId":SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Account Id")
					});				
				break;
				case 3:					
					if($('#vhatotnewcustbtn').hasClass('applet-button-active')==true){
						$('.new-billing-account, .existing-billing-account').addClass('VFDisplayNone');
						$(".payment-method [val='Other']").addClass("applet-button-readonly");}
					else{
						$('.new-billing-account, .existing-billing-account').removeClass('VFDisplayNone');
						$(".payment-method [val='Other']").removeClass("applet-button-readonly");}
						SiebelAppFacade.VHAAccessoriesPR.getAddonsList(addCartUpd);
						addCartUpd="N";					
				break;
				case 4:
					if(totFlow=="Prepay"){
						$("#NSAEmailNotification").html("");
						SiebelAppFacade.VHATOTNSAOrderSummaryPR_PDF.createPDF({"totFlow":totFlow});
					}
				break;
			}
		}
		if(stepDir === "backward"){
			switch(stepNum){
			case 1:	
			var headerBC1=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");
			var CCInputs = SiebelApp.S_App.NewPropertySet();
			var CCOuts = SiebelApp.S_App.NewPropertySet();
			CCInputs.SetProperty("Account Id",headerBC1.GetFieldValue("Account Id"));
			CCInputs.SetProperty("Object Id",headerBC1.GetFieldValue("Id"));
			var Outps=VHAAppUtilities.CallWorkflow("VHA TOT Credit Check Upsert",CCInputs, {});	
			SiebelAppFacade.VHATransferEmployeeDetailsAppletPR.CreditCheckShow();
			break;
			}
		
		}
		
		
		$('#_sweview').scrollTop(0);
	});
	$("#smartwizard").on("leaveStep", function(e , currIndex, stepNum, stepDir){
		if(stepDir === "forward"){
			switch(stepNum){
				case 1:
					var o =SiebelAppFacade.VHATransferEmployeeDetailsAppletPR.CreditCheckLeave();
					if(o!= ""){
						alert(o);
						return false;
					}
				break;
				case 0:
					/*var view = SiebelApp.S_App.GetActiveView();
					var appl = view.GetApplet("VHA Transfer Authorization Applet");
					appl.InvokeMethod('VFRefreshRecord');
					if(SiebelApp.S_App.GetProfileAttr("IsDealerEnableForIdScan") == "TRUE") { //validation necessary only if scan enabled
						if(appl.GetBusComp().GetFieldValue("Transferring Service To") == "New Customer" && appl.GetBusComp().GetFieldValue("Transferring Service As") == "Postpay") {
							if(appl.GetBusComp().GetFieldValue("ID Scan Bypass Reason Code") == "") {
								if(appl.GetBusComp().GetFieldValue("ID Scan Status Display") != "Upload Successful") {
									alert("Please Scan ID or choose a bypass reason code before proceeding.");
									return false;
								}
							}
						}
					}*/
					var sPrcd=mValidateAuthFields("Y");
					if(!sPrcd)
						return false;				
					var busObj = SiebelApp.S_App.GetActiveBusObj();
					var busComp = busObj.GetBusCompByName("VHA TOT Generic BC");
					var sRowId= busComp.GetFieldValue("Id");
						executeEvent(pm, "UPSERT_CUSTDTLS_EVT", {
						"ProcessName":"VHA TOT Upsert WF",
						"TempId": sRowId
						});
					if(forceStop=="Y"){
						forceStop="N";					
						return false;
					}
					refreshTOTheader();
				break;
				case 3:
					var headerBC=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");
					var Inputs = SiebelApp.S_App.NewPropertySet();
					var Outs = SiebelApp.S_App.NewPropertySet();
					Inputs.SetProperty("AccountId",headerBC.GetFieldValue("Account Id"));
					Outs = VHAAppUtilities.CallBS(
						"VHA TOT Processing Service", "CreditCheckStatus",
						Inputs, {}
					);
					if(Outs.GetProperty("CreditCheckStatus")=="APPROVE"){
						$('.error-rstdc').remove();
						$('.restricted-discount-line .input-field').removeClass('VHAToTnullerr');
						var sRSProceed="Y";
						$('.restricted-discount-line').each(function(index,item){
							if($(item).find('[type="checkbox"]').prop('checked')==true){
								var chkId = $(item).find('[type="checkbox"]').prop('id');
								//console.log(chkId);
								$(item).find('.input-field').each(function(sindex,sitem){
									if(sitem.value==""){
										//console.log($(sitem).hasClass('amount'));
										if(chkId=="1-4LV7C3N" && $(sitem).hasClass('amount')==true){					
										}else{
											sRSProceed="N";
											$(sitem).addClass("VHAToTnullerr");
											if($('.error-rstdc').length==0){
											$('.product-selection').append('<div class="error-rstdc TOTRedFont">Please enter the values for Amount, Period and Reason Code for selected products (red hightlighted)</div>');
											}
											//console.log("Stop");
										}
									}
								});		
							}
						});
						if(sRSProceed=="Y"){
							var o= SiebelAppFacade.VHAAccessoriesPR.submitData();
							if(o.NextStep){
								$('#vha-tot-finish')[0].disabled=true;
								$('#vha-tot-prev')[0].disabled=true;
								$('#smartwizard').smartWizard("disablePrevAnchorClick");
								$("#NSAOrderStatus").html("Review Order summary while validation in progress....");
								o.pdfInp.totFlow=totFlow;
								//console.log(o);console.log(o.asyncInp);console.log(o.pdfInp);							
								var apilovurl=VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_REST_API_URL' AND [List Of Values.Active]='Y'",{"All":"true"})[0].Description;
								//"https://vvsl40065.vodafone.com.au:9001/siebel/v1.0/service/";
								if(SiebelApp.S_App.GetBaseURL().search('retail')>0)
									apilovurl=apilovurl.replace('care','retail');
								var apiUrl=apilovurl+"VHARestAPIWF/RunProcess?"+o.asyncInp;
								apiUrl= apiUrl.replace(/\s+/g,"%20");
								//console.log(apiUrl);
								var settings = {
								  "async": true,
								  "crossDomain": true,
								  "url": apiUrl,
								  "method": "POST",
								  "headers": {
									"content-type": "application/json",
									"cache-control": "no-cache"
								  },
									"data":'{\r\n   \r\n}'
								}
								$.ajax(settings).done(function (response) {
								  console.log("aysync done");
								  console.log(response);
									$('#smartwizard').smartWizard("enablePrevAnchorClick");
									if(response["Error Code"] != "" || response["Error Message"] != ""){
										$('#vha-tot-finish')[0].disabled=true;
										$('#vha-tot-prev')[0].disabled=false;
										$("#NSAOrderStatus").html("");
										alert(response["Error Code"]+"\n"+response["Error Message"]);							
									}else{
										$('#vha-tot-finish')[0].disabled=false;
										$('#vha-tot-prev')[0].disabled=false;
										$("#NSAOrderStatus").html("");
									}					 
								}).fail(function (response, textStatus) {
								  console.log("aysync fail");
									console.log(response);
									$('#smartwizard').smartWizard("enablePrevAnchorClick");
								  $('#vha-tot-finish')[0].disabled=true;
									$('#vha-tot-prev')[0].disabled=false;
									$("#NSAOrderStatus").html("");
								  alert(response.responseJSON.ERROR);								  					 
								});
								console.log("Invoked VHA TOT Order Line Item Flow Wrapper Workflow in async ajax");
								// Call CreatePDF
								//NASReviewSummary();				
								$("#NSAEmailNotification").html("");
								SiebelAppFacade.VHATOTNSAOrderSummaryPR_PDF.createPDF(o.pdfInp);
							}
							return o.NextStep;					
						}
						else
						{
							return false;
						}						
						refreshTOTheader();
					}else{
						//SiebelApp.S_App.uiStatus.Free();
						alert("To proceed further credit check status should be Approved");
						return false;
					}
				break;
				case 2:
				/*if(totFlow=="Prepay"){
					if($("#cart-prepay-addons").text() == ''){
						alert("Your cart is empty. Please add an item to procced further");
						return false;						
					}else{
						var headerBC=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");
						executeEvent(pm, "VHA_PREPAY_CREATE_ORDER", {
							 "ProcessName":"VHA TOT Order Flow Wrapper Workflow",
							 "Object Id":headerBC.GetFieldValue("Id"),
							 "Add-Ons":$('.tot-pre-plans #cart-prepay-addons').text()
							 //"TOTHeaderId":"3-CM5OYOD"
						});						
						if(forceStop=="Y"){
							forceStop="N";
							$("#smartwizard").smartWizard('goToStep',2);						
							return false;
						}else{						
							$("#smartwizard").smartWizard('goToStep',4);
							return true;
						}
						refreshTOTheader();
					}
				}else{*/
				if(totFlow=="Postpay"){
					if($("#prodNameInCart").text() == '' || $("#prodNameInCart").text() == "Cart is empty"){						
						alert("Your cart is empty. Please add an item to procced further");
						return false;
					}
				}
				//}
				/*if (totFlow=="Postpay"){
					var sBillAId=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Billing Account Id");				
					if(sBillAId!="")
						SiebelAppFacade.VHAAccessoriesPR.initializeBillingAccount(sBillAId, "Y", "Default");
					else
						SiebelAppFacade.VHAAccessoriesPR.initializeBillingAccount("NA", "Y", "NA");
				}*/
			break;
			}
		}
	});
	/*$('.totsearchplanbtn').off('click').on('click', function(){
		 var i=$('.totsearchplan').val();
		 resetSearchUI("searchinput");
		 searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "NA", "SearchInput": i, "Condition":"equalTo"}];
		 (custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);  	
	});*/
	/*$(".totsearchplan").keydown(function(event){
 	});*/
    }

    VHAToTCommonViewPR.prototype.EndLife = function () {
     SiebelAppFacade.VHAToTCommonViewPR.superclass.EndLife.apply(this, arguments);
		VHAAppUtilities.SetConstants("isTOTCustDetilsUpt", "");
		app.newplanOut=false;
		app.oldplanOut=false;		
		app.plansForOldUser="";
		app.plansForNewUser="";
		app.ToTPrepayPropId="";
	}
	//**************Custom functions starts************************************//
	function setUI(){
		var phtml = '';
		preplanTypeBtn = [];//ss103269: TOT Prepay Dynamic Commercial Offers Display
		sPreplanType = "";
		sPrepaySelect = "";
		
		executeEvent(pm, "GET_PREPAY_PRODS", {
						 "ProcessName":"VHA Get Red SIM Proposition Product Details Workflow"
						});
		if(sProductName != "" && sProductName != null){//bm108347 fixed for DL di issue ??
		var len = sProductName.childArray.length;
		for(var i=0; i<len; i++){
			var sName = sProductName.childArray[i].propArray.Name;
			var sClass = "btn vhappbtn vhatotpreplantype";
			var sId = "vhatot";
			sId+= sName.replace(/ /g,'');
			
			if(sName == "Pay and Go" || sName == "Pay And Go")
				sName = "Pay & Go";
			if(sName == "Prepaid MBB")
				continue;//ss103269: Added for Defect #1356
			
			sPreplanType = {
			Name:sName,
			Class:sClass,
			Id:sId};
			preplanTypeBtn.push(sPreplanType);
		}
		}//ss103269: TOT Prepay Dynamic Commercial Offers Display
		for (var a=0; a<planTypeBtn.length; a++){phtml = phtml + '<button id="'+planTypeBtn[a].Id+'" class="'+planTypeBtn[a].Class+'">'+planTypeBtn[a].Name+'</button>';}
		$(".vha-tot-plantypebtn").html(phtml);phtml = '';
		for (var a=0; a<searchByDolBtn.length; a++){phtml = phtml + '<button context="'+searchByDolBtn[a].Context+'" class="'+searchByDolBtn[a].Class+'">'+searchByDolBtn[a].Name+'</button>';}
		$(".vha-tot-searchbydolbtn").html(phtml);phtml = '';
		for (var a=0; a<searchByDolBtn.length; a++){phtml = phtml + '<button context="'+searchByGBBtn[a].Context+'" class="'+searchByGBBtn[a].Class+'">'+searchByGBBtn[a].Name+'</button>';}
		$(".vha-tot-searchbyGBbtn").html(phtml);phtml = '';
		for (var a=0; a<preplanTypeBtn.length; a++){phtml = phtml + '<button id="'+preplanTypeBtn[a].Id+'" class="'+preplanTypeBtn[a].Class+'">'+preplanTypeBtn[a].Name+'</button>';sPrepaySelect = preplanTypeBtn[0].Id;}
		$(".vha-tot-plantypebtn-pre").html(phtml);phtml = '';
		showCustomerDtls();
		showCartDetls();
		 $('.vhatot-sim-dtls').html('<div class="vhatotinfoicon mr-2 " style="float: left;font-size: 25px;font-weight: bold;margin-top: -8px;">&#9432;</div><div> Existing SIM will be allocated to the service.</div>');
		$('.cartcount').text('0');
		$("#prodNameInCart").text('').text("Cart is empty");
		$("#planIdInCart").text('');
		//saveLead();
		clearCart();
		cancelTOTFlow();
		$('.vhacusticon').html('<div class="cartccstatus VFDisplayNone">!</div>');
	}
	function showCartDetls(){
		var t = '<div class="cart-prod">'+
				/*'<div class="row p-2 ml-2">'+*/
					/*'<div class="col-md-10 h5">Product Name :</div>'+*/
					'<div class="VFDisplayNone" id="prodNameInCart"></div>'+
					'<div class="VFDisplayNone" id="planIdInCart"></div>'+
				/*'</div>*/'</div>';
		$('#cartimg').append(t);
	}
	function pouplateCustomerDtls(d){
		//sServIdn=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Service Identifier");
		$("#vhatotcustname,#vhatotcustname4").text(d.propArray["Name"]);
		$("#vhatotserviceused,#vhatotserviceused4").text(d.propArray["ServiceUsed"]);
		$("#vhatotcustdate,#vhatotcustdate4").text(d.propArray["CustomerSince"]);
		totFlow=="Prepay" ? $("#vhatotcreditchkstatus,#vhatotcreditchkstatus4").text("NA"): $("#vhatotcreditchkstatus,#vhatotcreditchkstatus4").text(d.propArray["CreditCheckStatus"]);
		totFlow=="Prepay" ? $("#vhatotremqplimit,#vhatotremqplimit4").text("NA"): $("#vhatotremqplimit,#vhatotremqplimit4").text("$"+Number(d.propArray["RemEquipLimit"]).toFixed(2));
		totFlow=="Prepay" ? $("#vhatotactservice,#vhatotactservice4").text("NA"):$("#vhatotactservice,#vhatotactservice4").text(d.propArray["LiveServices"]);
		totFlow=="Prepay" ?  $("#vhatotappservice,#vhatotappservice4").text("NA"):$("#vhatotappservice,#vhatotappservice4").text(d.propArray["ApprovedServices"]);
		$("#vhatotsessionref,#vhatotsessionref4").text(SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Id"));
		$("#vhatotAccountId,#vhatotAccountId4").text(SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Account Id"));
		if(totFlow=="Postpay" && d.propArray["CreditCheckStatus"]=="Pending")updtCreditCheckStatus();
	}
	function showCustomerDtls(){
		/*var t = '<div class="tooltipcontent">'+
				'<div class="row">'+
					'<div class="col-md-1 vha-tooltip-custicon"></div>'+
					'<div class="pt-3 h4">Customer Details</div>'+
				'</div>'+
				'<div class="row ml-1" style="border:1px solid white; width:98%;">'+
				'</div>'+
				'<div class="row p-1">'+
					'<div class="col-md-5">Name</div>'+
					'<div class="col-md-4" id="vhatotcustname">-</div>'+
				'</div>'+
				'<div class="row p-1">'+
					'<div class="col-md-5">Service Used</div>'+
					'<div class="col-md-4" id="vhatotserviceused">-</div>'+
				'</div>'+
				'<div class="row p-1">'+
					'<div class="col-md-5">Customer Since</div>'+
					'<div class="col-md-4" id="vhatotcustdate">-</div>'+
				'</div>'+
				'<div class="row p-1">'+
					'<div class="col-md-5">Credit Check Status</div>'+
					'<div class="col-md-4" id="vhatotcreditchkstatus">-</div>'+
				'</div>'+
				'<div class="row p-1">'+
					'<div class="col-md-5">Remaining Equipment Limit</div>'+
					'<div class="col-md-4" id="vhatotremqplimit">-</div>'+
				'</div>'+
				'<div class="row p-1">'+
					'<div class="col-md-5">Active Services</div>'+
					'<div class="col-md-4" id="vhatotactservice">-</div>'+
				'</div>'+
				'<div class="row p-1">'+
					'<div class="col-md-5">Approved Services</div>'+
					'<div class="col-md-4" id="vhatotappservice">-</div>'+
				'</div>'+
				'<div class="row p-1">'+
					'<div class="col-md-5">Session Reference</div>'+
					'<div class="col-md-4" id="vhatotsessionref">-</div>'+
				'</div>'+
			'</div>';*/
		//$('.vhacusticon').after(createToolTip(t));
		var a = '<div class="row"><div class="vha-tot-custiconsm"></div><div class="pt-3 h5">Customer Details</div></div><div class="row mb-4 ml-1" style="border: 1px solid #212529;width:98%;"></div><div class="cart-cust-dtls"><div class="row"><div class="col-md-5 cart-cust-label">Name</div><div class="col-md-4 VHATOTBold" id="vhatotcustname4">-</div></div><div class="row"><div class="col-md-5 cart-cust-label">Service Used</div><div class="col-md-4 VHATOTBold" id="vhatotserviceused4">-</div></div><div class="row"><div class="col-md-5 cart-cust-label">Customer Since</div><div class="col-md-4 VHATOTBold" id="vhatotcustdate4">-</div></div><div class="row"><div class="col-md-5 cart-cust-label">Credit Check Status</div><div class="col-md-4 VHATOTBold activeAssetTitle" id="vhatotcreditchkstatus4">-</div></div><div class="row"><div class="col-md-5 cart-cust-label">Remaining Equipment Limit</div><div class="col-md-4 VHATOTBold" id="vhatotremqplimit4">-</div></div><div class="row"><div class="col-md-5 cart-cust-label">Active Services</div><div class="col-md-4 VHATOTBold" id="vhatotactservice4">-</div></div><div class="row"><div class="col-md-5 cart-cust-label">Approved Services</div><div class="col-md-4 VHATOTBold" id="vhatotappservice4">-</div></div><div class="row"><div class="col-md-5 cart-cust-label">Session Reference</div><div class="col-md-4 VHATOTBold" id="vhatotsessionref4">-</div></div><div class="row"><div class="col-md-5 cart-cust-label">Account Id</div><div class="col-md-4 VHATOTBold" id="vhatotAccountId4">-</div></div></div>';
		var b = '<div class="vha-cart-sum"><div class="row mt-5">\
					<div class="vha-tot-carticonsm"></div>\
					<div class="pt-3 h5">Cart Summary</div>\
					<div class="vha-tot-deleteiconsm"></div>\
				</div>\
				<div class="row mb-4 ml-1" style="border: 1px solid #212529;width:98%;"></div>\
				<div class="vha-cart-sum-chd">\
					<div class="row">\
						<div class="row vha-tot-pt pb-3 col-md-10">\
							<div class="vha-tot-redtxt h5 col-md-10">Sim Only</div>\
							<div class="col-md-10 ml-5">\
								<div class="row vha-tot-headerplan">\
									<div class="vha-tot-cartitemw"></div>\
									<div class="h5 vha-tot-cartval">$0.00</div>\
								</div>\
							</div>\
						</div>\
						<div class="vha-tot-simimg"></div>\
					</div>\
					<div class="row vha-tot-addons pb-3 VFDisplayNone">\
						<div class="vha-tot-redtxt h5 col-md-12">Add-Ons</div>\
						<div class="col-md-12 ml-5 vha-tot-addons-chd">\
							<div class="row cart-roaming-addons VFDisplayNone">\
								<div class="vha-tot-cartitemw">Roaming</div>\
								<div class="h5 vha-tot-cartval">$0</div>\
							</div>\
							<div class="row cart-data-addons VFDisplayNone">\
								<div class="vha-tot-cartitemw">Data</div>\
								<div class="h5 vha-tot-cartval">$0</div>\
							</div>\
							<div class="row cart-idd-addons VFDisplayNone">\
								<div class="vha-tot-cartitemw">IDD</div>\
								<div class="h5 vha-tot-cartval">$0</div>\
							</div>\
						</div>\
					</div>\
					<div class="row vha-tot-discount pb-3">\
						<div class="vha-tot-redtxt h5 col-md-12">Discounts</div>\
						<div class="col-md-12 ml-5 vha-tot-discount-chd">\
							<div class="row cart-discount-loyalty">\
								<div class="vha-tot-cartitemw">Loyalty</div>\
								<div class="h5 vha-tot-cartval">$0.00</div>\
							</div>\
							<div class="row cart-discount-credit">\
								<div class="vha-tot-cartitemw">Credit</div>\
								<div class="h5 vha-tot-cartval">$0.00</div>\
							</div>\
							<div class="row cart-discount-bundle">\
								<div class="vha-tot-cartitemw">Bundle and Save</div>\
								<div class="h5 vha-tot-cartval">$0.00</div>\
							</div>\
							<div class="row cart-discount-restrict VFDisplayNone">\
								<div class="vha-tot-cartitemw">Restricted Discount</div>\
								<div class="h5 vha-tot-cartval">$0.00</div>\
							</div>\
						</div>\
					</div>\
					<div class="row vha-tot-offers">\
						<div class="vha-tot-redtxt h5 col-md-12">Offers</div>\
						<div class="col-md-12 ml-5 vha-tot-offer-chd">\
							<div class="row cart-offers-data">\
								<div class="vha-tot-cartitemw">Data</div>\
								<div class="h5 vha-tot-cartval">0 GB</div>\
							</div>\
							<div class="row cart-offers-intmins">\
								<div class="vha-tot-cartitemw">International Minutes</div>\
								<div class="h5 vha-tot-cartval">0 mins</div>\
							</div>\
							<div class="row vha-tot-shortline cart-total-dollar">$0</div>\
							<div class="row vha-tot-shortline mb-2"></div>\
							<div class="row mt-4">\
								<div class="vha-tot-cartitemw">Enter Promo Code</div>\
								<input type="text" class="h5 vha-tot-promoCode mr-1">\
								<div class="vha-tot-offerapply ml-1">Apply</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="row vha-tot-indcost justify-content-center">\
					<div>Total Indicative Cost $40.00/month</div>\
				</div></div>';
		var c = a + b;
		//$(".vha-tot-setupsecl").addClass("p-4");
		$(".vha-tot-setupsec").html(c);
		$(".vha-tot-setupsecl").html(c);
		$('.vha-tot-offerapply').off("click").on("click",function(){
		$('.vha-tot-promoCode').removeClass('VHAToTnullerr');
		$('.vha-tot-promoCode').parent().find('.authvalidation').remove();
		var sPromoCd=$(this).prev().val();
		$('.vha-tot-promoCode').val(sPromoCd);
		executeEvent(pm, "APPLY_PROMO_CART", {
						 "PromoCode":sPromoCd,
						  "HeaderId": SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Id"),
						  "RatePlanId": $("#planIdInCart").text(),
						  "Service Name":"VF Offer Management",
						  "Method Name":"DigitalTOT"
		 });
		});
	}
	
	VHAToTCommonViewPR.addCartItems = function(lineitems) {		
		switch(lineitems.type){
			case "vha-tot-addons":
				switch(lineitems.value){
					case "Off":
					case "NotInterested":
						$('.'+lineitems.subType).addClass('VFDisplayNone');
						if($('.vha-tot-addons .VFDisplayNone').length==6)
							$('.vha-tot-addons').addClass('VFDisplayNone');
					break;				
					default:						
						$('.'+lineitems.type).removeClass('VFDisplayNone');
						$('.'+lineitems.subType).removeClass('VFDisplayNone');					
					break;			
				}
				$('.'+lineitems.subType+' .vha-tot-cartval').text(lineitems.dollar);
				VHAToTCommonViewPR.calcIndCost();				
			break;
			case "cart-discount-bundle":
				var cartValue="";
				cartValue = Number(lineitems.dollar)==0?"$0.00":"-$"+Number(lineitems.dollar).toFixed(2);
				$('.'+lineitems.subType+' .vha-tot-cartval').text(cartValue);
				VHAToTCommonViewPR.calcIndCost();
			break;
			case "cart-discount-restrict":
				if(lineitems.dollar!=0 && lineitems.dollar!=""){
					$('.cart-discount-restrict .vha-tot-cartval').text("-$"+Number(lineitems.dollar).toFixed(2));
					if($('.cart-discount-restrict').hasClass('VFDisplayNone')==true)
						$('.cart-discount-restrict').removeClass('VFDisplayNone');
				}else{
					$('.cart-discount-restrict .vha-tot-cartval').text("$0.00");
					if($('.cart-discount-restrict').hasClass('VFDisplayNone')==false)
						$('.cart-discount-restrict').addClass('VFDisplayNone');
				}
				VHAToTCommonViewPR.calcIndCost();
			break;
			default:				
				["RatePlanPriceIncGST","Discount Loyalty","Discount Credit","BounsData","BaseIDD","Total Indicative Cost"]
				.forEach(function(item,index){
					var cClass=""; var cartValue="";var isHandleNotNull="";
					if(lineitems.propArray[item]!=undefined){
					switch(item){
						case "RatePlanPriceIncGST":
							cClass="vha-tot-headerplan";
							isHandleNotNull=Number(lineitems.propArray[item]==""?0:lineitems.propArray[item]).toFixed(2);
							cartValue="$"+isHandleNotNull;
						break;
						case "Discount Loyalty":
							cClass="cart-discount-loyalty";
							isHandleNotNull=Number(lineitems.propArray[item]==""?0:lineitems.propArray[item]).toFixed(2);
							cartValue=isHandleNotNull==0?"$0.00":"-$"+isHandleNotNull;
						break;
						case "Discount Credit":
							cClass="cart-discount-credit";
							isHandleNotNull=Number(lineitems.propArray[item]==""?0:lineitems.propArray[item]).toFixed(2);
							cartValue=isHandleNotNull==0?"$0.00":"-$"+isHandleNotNull;
						break;
						case "BounsData":
							cClass="cart-offers-data";
							cartValue=lineitems.propArray[item];
						break;
						case "BaseIDD":
							cClass="cart-offers-intmins";
							cartValue=lineitems.propArray[item];
						break;
						case "Total Indicative Cost":							
							$('.vha-tot-indcost>div').text("Total Indicative Cost $"+Number(lineitems.propArray[item]).toFixed(2)+"/month");
							$('.cart-total-dollar').text("$"+Number(lineitems.propArray[item]).toFixed(2));
						break;
					}
					if(cClass!="" && cartValue!="")
					$('.'+cClass+' .vha-tot-cartval').text(cartValue);
				}
				});
			break;
		}		
	}
	
	function resetCartItems() {	
		$('.cartcount').text('0');
		$("#prodNameInCart").text('').text("Cart is empty");
		$("#planIdInCart").text('');
		$('.vha-tot-headerplan .vha-tot-cartitemw').text('');
		$('.vha-tot-headerplan .vha-tot-cartval,.cart-roaming-addons .vha-tot-cartval,.cart-data-addons .vha-tot-cartval,.cart-idd-addons .vha-tot-cartval,.cart-discount-loyalty .vha-tot-cartval,.cart-discount-credit .vha-tot-cartval,.cart-discount-bundle .vha-tot-cartval,.cart-discount-restrict .vha-tot-cartval').text("$0.00");
		$('.cart-offers-data .vha-tot-cartval').text("0 GB");
		$('.cart-offers-intmins .vha-tot-cartval').text("0 Mins");
		$('.cart-total-dollar').text("$0.00");
		$('.vha-tot-indcost>div').text("Total Indicative Cost $0.00/month");
		if($('.vha-tot-addons .VFDisplayNone').length==6)
		$('.cart-roaming-addons,.cart-data-addons,.cart-idd-addons,.cart-discount-restrict').addClass('VFDisplayNone');
		$('.vha-tot-addons').addClass('VFDisplayNone');
		SiebelAppFacade.VHAAccessoriesPR.resetConfigFeatures();
		if($('#smartwizard').smartWizard("getStepIndex")==3)
			$('#smartwizard').smartWizard("prev");
	}
	
	VHAToTCommonViewPR.calcIndCost = function() {
		var totindCost=0;
		$('.vha-tot-cartval').each(function(index, item){
			if($(item).text().indexOf('$')>-1 && $(item).parent().hasClass("VFDisplayNone")==false && index<$('.vha-tot-cartval').length/2)
			totindCost+=Number($(item).text().replace("$",""));
			//console.log(totindCost);			
		});
		$('.cart-total-dollar').text("$"+totindCost.toFixed(2));
		$('.vha-tot-indcost>div').text("Total Indicative Cost $"+totindCost.toFixed(2)+"/month");
		return totindCost;
	}
	
	function createGuidedFlow() {
		var steps = [{"a": "step-1","description": "Authenticate"}, 
					{"a": "step-2","description": "Credit Check"}, 
					{"a": "step-3","description": "Select Plan"},
					{"a": "step-4","description": "Setup and Accessories"}, 
					{"a": "step-5","description": "Review Summary"}];
		var btns = [{"stepNo": "0,1,2,3,4", "buttonName": "Pause", "className": "btn forcehide vhasecondarybtn", "custId": "vha-tot-pause"} ,
					//{"stepNo": "0,1,2,3,4", "buttonName": "Save Lead", "className": "btn forcehide vhasecondarybtn", "custId": "vha-tot-saveLead"},
					{"stepNo": "1,2,3,4", "buttonName": "Previous", "className": "btn sw-btn-prev forcehide vhasecondarybtn ", "custId": "vha-tot-prev"},					
					{"stepNo": "0,1,2", "buttonName": "Continue", "className": "btn sw-btn-next forcehide vhacntbtn post-btn-sw", "custId": "vha-tot-next"},
					{"stepNo": "3", "buttonName": "Review Summary", "className": "btn sw-btn-next forcehide vhacntbtn post-btn-sw", "custId": "vha-tot-reviewordersum"},
					{"stepNo": "0", "buttonName": "Continue", "className": "btn forcehide vhacntbtn pre-btn-sw VFDisplayNone", "custId": "vha-tot-prepay-next-1"},
					{"stepNo": "2", "buttonName": "Review Summary", "className": "btn sw-btn-next forcehide vhacntbtn pre-btn-sw", "custId": "vha-tot-prepay-reviewsum"},
					{"stepNo": "4", "buttonName": "Submit", "className": "btn forcehide vhacntbtn", "custId": "vha-tot-finish"}
					];
					//vha-wizard-nav
		$('#smartwizard').smartWizard({
			selected: 0,
			theme: 'dots',
			cancelBtnText: "Cancel",
			useURLhash: false,
			showStepURLhash: false,			
			//disabledSteps:[0,1,2,3],
			//hiddenSteps:[0,1,2,3],
			stepCreate: {
				stepObj: steps,
				ulSelector: 'ul#vha-guided-wizard'
			},
			toolbarSettings: {
				toolbarPosition: 'bottom',
				toolbarExtraButtons: btns
				/*labelFinish:"Finish",
				includeFinishButton: true,
				enableFinishButton: true,
				onFinish:onFinshCallBack*/
			},
			anchorSettings: {
				anchorClickable:true,
				enableAllAnchors:true,
				markDoneStep: true,
				markAllPreviousStepsAsDone: true,
				removeDoneStepOnNavigateBack: true,
				enableAnchorOnDoneStep: true
			}
		});
	}
	function onFinshCallBack(objs,context){
		alert("Finsh");
	}
	function createPreCard(n){
		var phtml =  '<div class="ml-3 mt-3 bd-highlight">'+
        '<div class="card">'+
          '<div class="card-body">'+
            '<div class="d-flex bd-highlight justify-content-center vha-card-pre-row1">'+
				'<span class="pre-plan-pack mt-4" id="pre-plan-pack'+[n]+'">Combo Plus</span>'+
			'</div>'+			
			'<div class="d-flex flex-column bd-highlight vha-card-pre-row3 pl-3 pr-3 pt-2 vha-preblacksmall">'+
				'<span class="vha-tot-planinc mb-3" id="vha-tot-planinc'+[n]+'">Plan Inclusion</span>'+
				'<span class="mt-2 mb-3" id="vha-tot-plandesc'+[n]+'">Standard national cals and text Unlimited</span>'+
				'<span class="mt-2 mb-3" id="vha-tot-plandesc'+[n]+'">28 days expiry period</span>'+
				'<span class="mt-2 mb-3 vha-pregreysmall" id="vha-tot-plandesc'+[n]+'">If you recharge with these inclusions, you will pay $30</span>'+
			'</div>'+
			'<div class="d-flex flex-column bd-highlight vha-card-pre-row4 pl-3 pr-3 pt-2 vha-preblacksmall">'+
				'<div class="d-flex justify-content-center"><button class="btn btn-primary mt-3 vha-addtocartbtn-pre" seqNum="'+[n]+'">Add to cart</button></div>'+
				'<span class="mt-3 mb-3 vha-preblacksmall" id="vha-tot-plandesc'+[n]+'">Includes free SIM card</span>'+
			'</div>'+
			'<div class="forcehide" context="dataStore">'+
				'<span id="vha-AddonType'+[n]+'" class="vha-AddonType"></span>'+
				'<span id="vha-PropositionId'+[n]+'"></span>'+
				'<span id="vha-AddonName'+[n]+'"></span>'+
				'<span id="vha-ProdId'+[n]+'"></span>'+
				'<span id="vha-SAMId'+[n]+'"></span>'+
			'</div>'+
          '</div>'+
		  '</div>'+
        '</div>';
		return phtml;
	}
	function createCard(n){
		var phtml =  '<div class="ml-3 mt-3 bd-highlight">'+
        '<div class="card" id="card'+[n]+'">'+
          '<div class="card-body">'+
            '<div class="d-flex bd-highlight vha-card-row1">'+
				'<div class="pl-4 pr-5 pt-4 pb-2 bd-highlight vha-card-row1-col1">'+
					'<div class="pt-3"><span class="vha-carasole-bolder" id="vha-tot-paldata'+[n]+'"></span><span class="vha-carasole-bold" id="vha-tot-paldata-q'+[n]+'">GB</span></div>'+
					'<div style="margin-top: -10px;margin-left: 8px;"><span style="font-size: small;">Data in Oz</span></div>'+
				'</div>'+
				'<div class="pl-4 pr-5 pt-4 pb-2 bd-highlight vha-card-row1-col2">'+
					'<div class="pt-3"><sup class="vha-carasole-dollar">$</sup><span class="vha-carasole-bolder" id="vha-tot-palamt'+[n]+'"></span></div>'+
					'<div style="margin-top: -10px;margin-left: 8px;">'+
						'<span class="vha-greysmall text-lowercase" id="vha-tot-paltym'+[n]+'">per month</span>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="d-flex flex-column bd-highlight vha-card-row2 pl-3 pr-3 pt-2 vha-greysmall">'+
				'<span class="vha-tot-conterm mb-3" id="vha-tot-conterm'+[n]+'">Month to Month</span>'+
				'<span class="h5 vha-tot-conterm-hd">Endless data</span>'+
				'<span class="vha-tot-ent" id="vha-tot-condesc'+[n]+'"></span>'+
			'</div>'+
			'<div class="d-flex flex-column bd-highlight vha-card-row3 pl-3 pr-3 pt-2 vha-greysmall">'+
				'<span class="vha-tot-plantype" id="vha-tot-conplantyp'+[n]+'">Red Plus Plan</span>'+
				'<span class="vha-tot-plantypedtls mt-3 mb-2" id="vha-tot-plandesc'+[n]+'"></span>'+
			'</div>'+
			'<div class="d-flex flex-column bd-highlight vha-card-row4 pl-3 pr-3 pt-2 vha-greysmall">'+
				'<span class="mt-3 mb-3 h6 vha-tot-conterm-hd" id="vha-tot-endlessdatatxt'+[n]+'"></span>'+
				'<span class="vha-tot-enttxt" id="vha-tot-enttxt'+[n]+'"></span>'+
				'<div class="d-flex justify-content-center"><button class="btn btn-primary mt-4 vha-addtocartbtn" seqNum="'+[n]+'">Add to cart</button></div>'+
			'</div>'+			
			'<div class="forcehide" context="dataStore">'+
				'<span id="vha-tot-rateplanname'+[n]+'" class="vha-tot-rateplanname"></span>'+
				'<span id="vha-tot-planId'+[n]+'"></span>'+
				'<span id="vha-tot-ratepropname'+[n]+'"></span>'+
				'<span id="vha-tot-ratePlanType'+[n]+'"></span>'+
			'</div>'+
			'<div class="d-flex flex-column bd-highlight vha-card-row5 pl-3 pr-3 pt-2 vha-greysmall VFDisplayNone">'+
				'<a href="url" class="align-self-center">Rates and charges</a>'+
				'<a href="url" class="align-self-center">Critical Information Summary</a>'+
			'</div>'+
          '</div>'+
		  '</div>'+
        '</div>';
		return phtml;
	}
	function createPreTitles(data){
		var nlen = data.length;
		if(nlen > 0){
			var i = Math.floor(nlen/3);
			var chtml = '<div id="vha-tot-carousel-pre" class="carousel slide carousel-multi-item" data-ride="carousel" data-interval="false"><div class="carousel-control-prev m-3 carousel-control" href="#vha-tot-carousel-pre" data-slide="prev"><div class="carousel-control-prev-icon vha-carouselnav"></div></div><div class="carousel-control-next m-3 carousel-control" href="#vha-tot-carousel-pre" data-slide="next"><div class="carousel-control-next-icon vha-carouselnav"></div></div><div class="carousel-inner vha-carousel-inner" role="listbox">';
			var f = 0; var s = 0; var t = 0;
			//100			
			//if(viewType=="100"){
				for(var x = 0; x<=i; x++){
					f = t; s = t+1; t = t+2;
					if(x == 0){
						if(s<nlen){
							if(t<nlen){
								chtml = chtml+'<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">'+createPreCard(f)+createPreCard(s)+createPreCard(t)+'</div></div>';
							}else{
								chtml = chtml+'<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">'+createPreCard(f)+createPreCard(s)+'</div></div>';
							}
						}else{
							chtml = chtml+'<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">'+createPreCard(f)+'</div></div>';
						}
						t = t +1;
					}else{
						if(s<nlen){
							if(t<nlen){
								chtml = chtml+'<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">'+createPreCard(f)+createPreCard(s)+createPreCard(t)+'</div></div>';
							}else{
								chtml = chtml+'<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">'+createPreCard(f)+createPreCard(s)+'</div></div>';
							}
						}else if(f<nlen){
							chtml = chtml+'<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">'+createPreCard(f)+'</div></div>';
						}
						t = t +1;					
					}
				}
			//}		
			chtml = chtml+'</div></div>';
			$("#vha-carousel-container-prepay").html(chtml);
			var l = $("button.vha-addtocartbtn-pre").length;
			for(var a = 0; a<l; a++){
				$($($("button.vha-addtocartbtn-pre"))[a]).off("click").on("click", function(){
					$("#maskoverlay").styleShow();
					totsleep(30).then(()=> {
						$("#prodNameInCart").text('').text( $("#vha-CommercialOfferName"+this.getAttribute('seqNum')).text());
						$(".vha-tot-headerplan .vha-tot-cartitemw").text('').text($("#vha-CommercialOfferName"+this.getAttribute('seqNum')).text());
						$("#planIdInCart").text('').text( $("#vha-OfferId"+this.getAttribute('seqNum')).text());					
						$('.card-sel-border').removeClass("card-sel-border");
						$(this).parent().parent().parent().parent().addClass("card-sel-border");
						executeEvent(pm, "SET_ADDTOCART_EVT", {
							 "ProcessName":"VHA TOT Cart Summary Wrapper Workflow",
							  "TOTHeaderId": SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Id"),
							  "Plan Id": "",
							  "Plan Name":$("#vha-AddonType"+this.getAttribute('seqNum')).text(),
							  "PropositionId": $("#vha-PropositionId"+this.getAttribute('seqNum')).text(),
							  "Add-Ons": $("#vha-AddonName"+this.getAttribute('seqNum')).text()
						 });
						if($('.tot-pre-plans #cart-prepay-addons').length==0)
						$('.tot-pre-plans #cartimg').append('<div id="cart-prepay-addons" class="VFDisplayNone">'+$("#vha-AddonName"+this.getAttribute('seqNum')).text()+'</div>');
						else
						$('.tot-pre-plans #cart-prepay-addons').text($("#vha-AddonName"+this.getAttribute('seqNum')).text());
						 $("#maskoverlay").styleHide();
					});											
				});
			}
			for(var x=0; x<nlen; x++){				
				if(data[x].propArray["Addon Type"] != undefined){
					$("#vha-AddonType"+[x]).text(data[x].propArray["Addon Type"]);
				}
				if(data[x].propArray["Name"] != undefined){
					$("#vha-AddonName"+[x]).text(data[x].propArray["Name"]);
					$("#pre-plan-pack"+[x]).text(data[x].propArray["Name"]);
				}
				if(data[x].propArray["Prod Id"] != undefined){
					$("#vha-ProdId"+[x]).text(data[x].propArray["Prod Id"]);
				}
				if(data[x].propArray["SAM Id"] != undefined){
					$("#vha-SAMId"+[x]).text(data[x].propArray["SAM Id"]);
				}
				if(app.ToTPrepayPropId != undefined){
					$("#vha-PropositionId"+[x]).text(app.ToTPrepayPropId);
				}				
			}
		}else{
			$("#vha-carousel-container-prepay").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
		}		
	}
	function createTiles(data){
		var nlen = data.length;
		if(nlen > 0){
			var i = Math.floor(nlen/3);
			var chtml = '<div id="vha-tot-carousel" class="carousel slide carousel-multi-item" data-ride="carousel" data-interval="false"><div class="carousel-control-prev m-3 carousel-control" href="#vha-tot-carousel" data-slide="prev"><div class="carousel-control-prev-icon vha-carouselnav"></div></div><div class="carousel-control-next m-3 carousel-control" href="#vha-tot-carousel" data-slide="next"><div class="carousel-control-next-icon vha-carouselnav"></div></div><div class="carousel-inner vha-carousel-inner" role="listbox">';
			var f = 0; var s = 0; var t = 0;
			//100			
			if(viewType=="100"){
				for(var x = 0; x<=i; x++){
					f = t; s = t+1; t = t+2;
					if(x == 0){
						if(s<nlen){
							if(t<nlen){
								chtml = chtml+'<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">'+createCard(f)+createCard(s)+createCard(t)+'</div></div>';
							}else{
								chtml = chtml+'<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">'+createCard(f)+createCard(s)+'</div></div>';
							}
						}else{
							chtml = chtml+'<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">'+createCard(f)+'</div></div>';
						}
						t = t +1;
					}else{
						if(s<nlen){
							if(t<nlen){
								chtml = chtml+'<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">'+createCard(f)+createCard(s)+createCard(t)+'</div></div>';
							}else{
								chtml = chtml+'<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">'+createCard(f)+createCard(s)+'</div></div>';
							}
						}else{
							chtml = chtml+'<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">'+createCard(f)+'</div></div>';
						}
						t = t +1;					
					}
				}
			}
			//7030
			else{
				for(var x = 0; x<=i; x++){
					f = s; s = s+1;
					if(x == 0){
						if(s<nlen){
							/*if(t<nlen){
								chtml = chtml+'<div class="carousel-item active"><div class="d-flex bd-highlight">'+createCard(f)+createCard(s)+createCard(t)+'</div></div>';
							}else{*/
								chtml = chtml+'<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">'+createCard(f)+createCard(s)+'</div></div>';
							//}
						}else{
							chtml = chtml+'<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">'+createCard(f)+'</div></div>';
						}
						s = s +1;
					}else{
						if(s<nlen){
							/*if(t<nlen){
								chtml = chtml+'<div class="carousel-item"><div class="d-flex bd-highlight">'+createCard(f)+createCard(s)+createCard(t)+'</div></div>';
							}else{*/
								chtml = chtml+'<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">'+createCard(f)+createCard(s)+'</div></div>';
							//}
						}else{
							chtml = chtml+'<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">'+createCard(f)+'</div></div>';
						}
						s = s +1;					
					}
				}
			}
			chtml = chtml+'</div></div>';
			$("#vha-carousel-container").html(chtml);
			var l = $("button.vha-addtocartbtn").length;
			for(var a = 0; a<l; a++){
				$($($("button.vha-addtocartbtn"))[a]).off("click").on("click", function(){
					$("#maskoverlay").styleShow();
					totsleep(30).then(()=> {
						$("#prodNameInCart").text('').text( $("#vha-tot-ratepropname"+this.getAttribute('seqNum')).text());
						$(".vha-tot-headerplan .vha-tot-cartitemw").text('').text($("#vha-tot-rateplanname"+this.getAttribute('seqNum')).text());
						$("#planIdInCart").text('').text( $("#vha-tot-planId"+this.getAttribute('seqNum')).text());					
						$('.card-sel-border').removeClass("card-sel-border");
						$(this).parent().parent().parent().parent().addClass("card-sel-border");
						executeEvent(pm, "SET_ADDTOCART_EVT", {
							 "ProcessName":"VHA TOT Cart Summary Wrapper Workflow",
							  "TOTHeaderId": SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Id"),
							  "Plan Id": $("#vha-tot-planId"+this.getAttribute('seqNum')).text(),
							  "Plan Name":$("#vha-tot-rateplanname"+this.getAttribute('seqNum')).text(),
							  "Plan Option":$('#vhatotreusebtn').hasClass("vhabtnredbg") == true ? "ReuseProp" : "NewProp",
							  "VHAPlanType":$("#vha-tot-ratePlanType"+this.getAttribute('seqNum')).text()
							  /*"ProcessName":"VHA TOT Cart Summary Wrapper Workflow",
							  "TOTHeaderId": "3-CM3ITEN",
							  "Plan Id": "1-4O5W5TH"*/
						 });
						addCartUpd="Y";
						$("#maskoverlay").styleHide();
					});
				});
			}
			for(var x=0; x<nlen; x++){
				if(data[x].propArray.Price != undefined){
					$("#vha-tot-palamt"+[x]).text(data[x].propArray.Price); 
				}
				if(data[x].propArray.PlanId != undefined){
					$("#vha-tot-planId"+[x]).text(data[x].propArray.PlanId);
				}
				if(data[x].propArray.CurrentPlanFlag != undefined && data[x].propArray.CurrentPlanFlag == "Y"){
					$("#card"+[x]).addClass("card-sel-border");
				}
				if(data[x].propArray.DataAmt != undefined){
					var dataAmt = "0";
					var dataAmtQ = "GB";
					if(data[x].propArray.DataAmt == ''){
						dataAmt = "0";
					}else{
						dataAmt = data[x].propArray.DataAmt;
					}
					if(dataAmt.indexOf("GB")>0){
						dataAmt = dataAmt.replace("GB", "");
					dataAmtQ = "GB";}
					else if(dataAmt.indexOf("MB")>0){
						dataAmt = dataAmt.replace("MB", "");
					dataAmtQ = "MB";}
					else if(dataAmt.indexOf("KB")>0){
						dataAmt = dataAmt.replace("KB", "");
					dataAmtQ = "KB";}
					$("#vha-tot-paldata"+[x]).text(dataAmt);
					$("#vha-tot-paldata-q"+[x]).text(dataAmtQ);
					//$("#vha-tot-condesc"+[x]).text("Get "+dataAmt+dataAmtQ+" data at your max speed, then keep using data in Oz at speed of upto 1.5Mbps."); 
					$("#vha-tot-endlessdatatxt"+[x]).text(dataAmt+dataAmtQ+" Endless data");
					//$("#vha-tot-enttxt"+[x]).text("Get "+dataAmt+dataAmtQ+" data at your max speed, then keep using data in Oz at speed of upto 1.5Mbps.");
					switch(data[x].propArray.VHAPlanType){
						case "Voice":
							if(data[x].propArray["Sharing Indicator"]=="Alpha"){
								$("#vha-tot-condesc"+[x]).text("Additional Data is automatically added at $10/10GB ($0.001/MB)");
								$("#vha-tot-enttxt"+[x]).text("Additional Data is automatically added at $10/10GB ($0.001/MB)");
							}else{//Omega
								$("#vha-tot-condesc"+[x]).text("Get "+dataAmt+dataAmtQ+" data at your max speed, then keep using data in Oz at speed of upto 1.5Mbps.");
								$("#vha-tot-enttxt"+[x]).text("Get "+dataAmt+dataAmtQ+" data at your max speed, then keep using data in Oz at speed of upto 1.5Mbps.");
							}
						break;
						case "Caps":
							$("#vha-tot-condesc"+[x]).text("");
							$("#vha-tot-enttxt"+[x]).text("");
						break;
						case "MBB":
							$("#vha-tot-condesc"+[x]).text("Additional Data is automatically added at $10/10GB ($0.001/MB)");
							$("#vha-tot-enttxt"+[x]).text("Additional Data is automatically added at $10/10GB ($0.001/MB)");
						break;
						case "NBN":
							$("#vha-tot-condesc"+[x]).text("Wi-Fi Hub $0/mth when you stay connected for 36 months");
							$("#vha-tot-enttxt"+[x]).text("Wi-Fi Hub $0/mth when you stay connected for 36 months");
						break;					
					}
				}
				if(data[x].propArray.PlanSamID != undefined){
					
				}
				if(data[x].propArray.PlanMonths != undefined){
					$("#vha-tot-conterm"+[x]).text(data[x].propArray.PlanMonths);
					//$("#vha-tot-paltym"+[x]).text(data[x].propArray.PlanMonths);
				}
				if(data[x].propArray.PlanType != undefined){
					$("#vha-tot-ratePlanType"+[x]).text(data[x].propArray.PlanType);
				}
				if(data[x].propArray.VHAPlanType != undefined){
					$("#vha-tot-ratePlanType"+[x]).text(data[x].propArray.VHAPlanType);
				}
				if(data[x].propArray["PropositionName"] != undefined){
					$("#vha-tot-plandesc"+[x]).text(data[x].propArray["PropositionName"]);
					$("#vha-tot-ratepropname"+[x]).text(data[x].propArray["PropositionName"]);		
					if(data[x].propArray["PropositionName"].indexOf("Red") != -1){
                        if(data[x].propArray["PropositionName"].indexOf("Red Plus") != -1){
						    $("#vha-tot-conplantyp"+[x]).text("Red Plus Plan");
					    }else{
					    	 $("#vha-tot-conplantyp"+[x]).text("Red Plan");
					    }
					}else{
                      switch(data[x].propArray.VHAPlanType)
					  {
					  case "NBN":
					  $("#vha-tot-conplantyp"+[x]).text("NBN Plan");
					  break;
					  case "Caps":
					  $("#vha-tot-conplantyp"+[x]).text("Cap Plan");
					  break;
					  default:
                      $("#vha-tot-conplantyp"+[x]).text("SIM Only Plan");
					  break;
					  }
					}
				}
				if(data[x].propArray.RatePlanName != undefined){
					$("#vha-tot-rateplanname"+[x]).text(data[x].propArray.RatePlanName);
				}
				if(data[x].propArray.SiebelProductType != undefined){
					
				}
				if(data[x].propArray.SpecialSiebelType != undefined){
					
				}
				if(data[x].propArray.Status != undefined){
					
				}
			}
		}else{
			$("#vha-carousel-container").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
		}
	}
	function showcustomerdetail(){
		 var t = '<div class="tooltip" style="height: 60px;width: 60px;">'+
			'<div class="tooltiptext">'+
				'<div class="tooltipcontent">'+
					'<div class="row">'+
						'<div class="col-md-5">Name</div>'+
						'<div class="col-md-5" id="vhatotcustname">Shashi</div>'+
					'</div>'+
					'<div class="row">'+
						'<div class="col-md-5">Service Used</div>'+
						'<div class="col-md-5" id="vhatotserviceused">Personal</div>'+
					'</div>'+
					'<div class="row">'+
						'<div class="col-md-5">Customer Since</div>'+
						'<div class="col-md-5" id="vhatotcustdate">29 Nov 2011</div>'+
					'</div>'+
					'<div class="row">'+
						'<div class="col-md-5">Credit Check Status</div>'+
						'<div class="col-md-5" id="vhatotcreditchkstatus">Approved</div>'+
					'</div>'+
					'<div class="row">'+
						'<div class="col-md-5">Remaining Equipment Limit</div>'+
						'<div class="col-md-5" id="vhatotremqplimit">$1800.00</div>'+
					'</div>'
					'<div class="row">'+
						'<div class="col-md-5">Active Services</div>'+
						'<div class="col-md-5" id="vhatotactservice">1</div>'+
					'</div>'+
					'<div class="row">'+
						'<div class="col-md-5">Approved Services</div>'+
						'<div class="col-md-5" id="vhatotappservice">5</div>'+
					'</div>'+
					'<div class="row">'+
						'<div class="col-md-5">Session Reference</div>'+
						'<div class="col-md-5" id="vhatotsessionref">2-12345600</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		$('.vhacusticon').html(t);	
	}
	function getTilesDataPrepay(data, searchConditionPrepay){
		var len = "";		
		len = data.childArray.length;
		if(len > 0){
			var newobj = [];
			for(var x=0; x<len; x++){
				if(searchConditionPrepay[0]["PlanType"] == data.childArray[x].propArray["Addon Type"]){
					if(searchConditionPrepay[0]["SearchInput"] != "NA"){
						if(data.childArray[x].propArray.Name == searchConditionPrepay[0]["SearchInput"]){
							newobj.push(data.childArray[x]);
						}
					}else
						newobj.push(data.childArray[x]);
				}
			}
			createPreTitles(newobj);
		}	
		else{
			$("#vha-carousel-container-prepay").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5" style="text-align: center;"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
		}	
	}
	function getTilesData(data, searchCondition){
		if(data!=null){
			var len = "";		
			len = data.childArray.length;
			if(len > 0){
				var newobj = [];
				for(var x=0; x<len; x++){
					if(searchCondition[0]["PlanType"] != "NA"){
						if(data.childArray[x].propArray.VHAPlanType == searchCondition[0]["PlanType"]){
							if(searchCondition[0]["SearchInput"] != "NA"){
								if(data.childArray[x].propArray.RatePlanName == searchCondition[0]["SearchInput"]){
									newobj.push(data.childArray[x]);
								}
							}else{
									if(searchCondition[0]["ByDolar"] != "NA"){
										if(searchCondition[0]["Condition"] != "NA"){
											switch(searchCondition[0]["Condition"]){
												case "greaterThan" :if(parseInt(data.childArray[x].propArray.Price) > parseInt(searchCondition[0]["ByDolar"])){newobj.push(data.childArray[x]);}break;
												case "lessThan":if(parseInt(data.childArray[x].propArray.Price) < parseInt(searchCondition[0]["ByDolar"])){newobj.push(data.childArray[x]);}break;
												case "equalTo":if(parseInt(data.childArray[x].propArray.Price) == parseInt(searchCondition[0]["ByDolar"])){newobj.push(data.childArray[x]);}break;
											}
										}									
									}else if(searchCondition[0]["ByGB"] != "NA"){
										if(searchCondition[0]["Condition"] != "NA"){
											switch(searchCondition[0]["Condition"]){
												case "greaterThan" :if(parseInt(data.childArray[x].propArray.DataAmt) > parseInt(searchCondition[0]["ByGB"])){newobj.push(data.childArray[x]);}break;
												case "lessThan":if(parseInt(data.childArray[x].propArray.DataAmt) < parseInt(searchCondition[0]["ByGB"])){newobj.push(data.childArray[x]);}break;
												case "equalTo":if(parseInt(data.childArray[x].propArray.DataAmt) == parseInt(searchCondition[0]["ByGB"])){newobj.push(data.childArray[x]);}break;
											}
										}	
									}else{
										newobj.push(data.childArray[x]);
									}
								}
							}
						}
					}	
				createTiles(newobj);	
			}else{
				$("#vha-carousel-container").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5" style="text-align: center;"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
			}
		}else{
			$("#vha-carousel-container").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5" style="text-align: center;"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
		}	
	}
	function resetSearchUI(c){
	    switch(c){
			case "usertype":
				var l = $("button.vhatotplantype").length;
				for(var a = 0; a<l; a++){
					$($($("button.vhatotplantype"))[a]).removeClass("vhabtnredbg");
				}
				var l = $("button.vhatotsearchcond").length;
				for(var a = 0; a<l; a++){
					$($($("button.vhatotsearchcond"))[a]).removeClass("vhabtnredbg");
				}
				$('.totsearchplan').val('');
				$('#vhatothsplan').addClass('vhabtnredbg');
				$('#vhatot365day').addClass('vhabtnredbg');
			break;
			case "plantype":
				var l = $("button.vhatotsearchcond").length;
				for(var a = 0; a<l; a++){
					$($($("button.vhatotsearchcond"))[a]).removeClass("vhabtnredbg");
				}
				$('.totsearchplan').val('');		
			break;
			case "searchinput":
				var l = $("button.vhatotsearchcond").length;
				for(var a = 0; a<l; a++){
					$($($("button.vhatotsearchcond"))[a]).removeClass("vhabtnredbg");
				}
				var l = $("button.vhatotplantype").length;
				for(var a = 0; a<l; a++){
					$($($("button.vhatotplantype"))[a]).removeClass("vhabtnredbg");
				}
				//$('.totsearchplan').val('');		
			break;
		}
    }
	function handleServerCallRes(prop, data){
		switch(data.evt){
			case "GET_CUSTDTLS_EVT":
				var o = parseStructure(data.bsoutput,["ResultSet"]);
				if(o.propArray["Error Code"] == ""){
					pouplateCustomerDtls(o);
					searchCondition = [{"PlanType": "Voice", "ByDolar": "NA", "ByGB": "NA", "SearchInput": "NA", "Condition":"NA"}];
					if(totFlow=="Postpay"){
						if(!app.oldplanOut){
							executeEvent(pm, "GET_OLDPLANDTLS_EVT", {
							 "ProcessName":"VHA Get Customer Current Plans",
							  "MSISDN": $("[name='"+authAppCtrl["Enter Transferring Mobile Number"].GetInputName()+"']").val()
							});
						}else{
							processoldplanData();
						}
						/*if(!newplanOut){
							executeEvent(pm, "GET_NEWPLANDTLS_EVT", {
								 "ProcessName":"VHA TOT Retrieve Market Plans",
								 "TransferMSISDN":$("[name='"+authAppCtrl["Enter Transferring Mobile Number"].GetInputName()+"']").val()
								 //"61407502729"
							 });
						}else{
							processnewplanData("N");
						}*/
					}else if(totFlow=="Prepay"){
					// call prepay plan
						executeEvent(pm, "GET_PREPAY_PLAN", {
						 "ProcessName":"VHA Get Red SIM Proposition Product Details Workflow"
						});						
					}
				}else{
					alert("Error in fetching customer details.");
					return false;
				}
			break;
			case "UPSERT_CUSTDTLS_EVT":
				var o = parseStructure(data.bsoutput,["ResultSet"]);
				if(o.propArray["Error Code"] == ""){
					if(o.propArray["Error Message"] != ""){
						alert(o.propArray["Error Message"]);
						//$("#smartwizard").smartWizard('goToStep',0);
						forceStop="Y";
					return false;
					}
				}else{
					console.log(o.propArray["Error Code"]+"==>"+o.propArray["Error Message"]);
					alert(o.propArray["Error Code"]+"\n"+o.propArray["Error Message"]);	
					//alert("Error creating/updating customer");
					//$("#smartwizard").smartWizard('goToStep',0);
					forceStop="Y";
					return false;
				}				
			break;
			case "GET_CREDITCHK_EVT":
				var o = parseStructure(data.bsoutput,["ResultSet"]);
			//to the UI action based on status of credit chk status
			break;
			case "GET_OLDPLANDTLS_EVT":
				//oldplanOut=data;
				if(data.bsoutput.childArray["0"].type == "Errors"){
					$("#vha-carousel-container").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5" style="text-align: center;"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
				}else{
					app.plansForOldUser = parseStructure(data.bsoutput,["ResultSet", "PlansOutputXML", "ListOfVHA TOT Get Product Details"]);
					app.oldplanOut=true;
					//for current plan indentifier
					//console.log(app.plansForOldUser);
					processoldplanData();				
				}
			break;
			case "GET_PREPAY_PLAN":
				if(data.bsoutput.childArray["0"].type == "Errors"){
					$("#vha-carousel-container-prepay").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5" style="text-align: center;"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
				}else{
					app.ToTPrepayPropId=parseStructure(data.bsoutput,["ResultSet"]).propArray.PropId;
					var resultSet = parseStructure(data.bsoutput,["ResultSet", "SiebMsg", "ListOfVHA Proposition Product Details", "Proposition","ListOfAddons"]);
					var lstProd = parseStructure(data.bsoutput,["ResultSet", "SiebMsg", "ListOfVHA Proposition Product Details", "Proposition","ListOfProducts"]);
					var len = lstProd.childArray.length;
					for(var x=0; x<len; x++){
						var c=resultSet.childArray[1].Clone();
						c.propArray["SAM Id"]="AUPr001";
						c.propArray["Prod Id"]="1-4J5708S";
						c.propArray["Name"]="DEFAULT";
						c.propArray["Addon Type"]=lstProd.childArray[x].propArray.Name;
						resultSet.childArray.push(c);
					}					
					app.plansPrepay = resultSet;
					processprepayplanData();										
				}
			break;			
			case "GET_NEWPLANDTLS_EVT":
				//debugger;
				if(data.bsoutput.childArray["0"].type == "Errors"){
					$("#vha-carousel-container").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5" style="text-align: center;"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
				}else{
					app.plansForNewUser = parseStructure(data.bsoutput,["ResultSet", "PlansOutputXML", "ListOfVHA TOT Get Market Plans External"]);
					//ListOfVHA In Market Plan Matrix
					app.newplanOut=true;
					processnewplanData("Y");
				}
			break;
			case "SET_ADDTOCART_EVT":
				var o = parseStructure(data.bsoutput,["ResultSet"]);
				//debugger;
				if(o.propArray["Error Code"] != "" || o.propArray["Error Message"] != ""){						
					alert(o.propArray["Error Code"]+"\n"+o.propArray["Error Message"]);						
					return false;
				}else{
					var selectionObj={"type":"offerdiscounts", 
						"subType":"offerdiscounts", 
						"dollar":"$ 0", 
						"value": "",
						"propArray":o.propArray};
					VHAToTCommonViewPR.addCartItems(selectionObj);
					$('.cartcount').text('1');					
					if(totFlow=="Postpay" && $('.vha-tot-promoCode').val()!="")
					{
						$('.vha-tot-promoCode').removeClass("VHAToTnullerr");
						$('.authvalidation#ToTInvalidPromo').remove();
						$('.vha-tot-promoCode').val("");
						var Inputs = SiebelApp.S_App.NewPropertySet();
						var Outs = SiebelApp.S_App.NewPropertySet();
						var headerBC=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");				
						Inputs.SetProperty("BusObj","VHA TOT Generic BO");
						Inputs.SetProperty("BusComp","VHA TOT Generic BC");
						Inputs.SetProperty("Id",headerBC.GetFieldValue("Id"));
						Inputs.SetProperty("Promo Code","");
						Outs = VHAAppUtilities.CallBS(
							"VHA TOT Processing Service", "BCSetField",
							Inputs, {}
						);	
					}
					refreshTOTheader();
					var sBillAId=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Billing Account Id");				
					if(sBillAId!="" && totFlow=="Postpay")
						SiebelAppFacade.VHAAccessoriesPR.initializeBundleSave();
					return true;
				}				
			break;
			case "VHA_SUBMIT_ORDER":
				var o = parseStructure(data.bsoutput,["ResultSet"]);
					if(o.propArray["Error Code"] != "" || o.propArray["Error Message"] != ""){
						forceStop="Y";
						alert(o.propArray["Error Code"]+"\n"+o.propArray["Error Message"]);						
						//$("#smartwizard").smartWizard('goToStep',4);
						return false;
					}else{
						forceStop="N";
						//SiebelApp.S_App.GotoView("CUT Home Page View (CME)");
						return true;
					}					
			break;
			case "VHA_PREPAY_CREATE_ORDER":
				var o = parseStructure(data.bsoutput,["ResultSet"]);
					if(o.propArray["Error Code"] != "" || o.propArray["Error Message"] != ""){
						forceStop="Y";
						alert(o.propArray["Error Code"]+"\n"+o.propArray["Error Message"]);
						return false;
					}else{
						forceStop="N";
						return true;
					}
			break;
			case "APPLY_PROMO_CART":
			var o = parseStructure(data.bsoutput,["ResultSet"]);
			if(o.propArray["PromoCodeValid"]!="Y" || o.propArray["PromoCodeValid"]=="")
				$('.vha-tot-promoCode').addClass("VHAToTnullerr").parent().append("<div class='authvalidation' id='ToTInvalidPromo' style='color:red;margin-left:180px'>Invalid Promo Code</div>");
			else{
				var selectionObj={"type":"offerdiscounts", 
						"subType":"offerdiscounts", 
						"dollar":"$ 0", 
						"value": "",
						"propArray":o.propArray};
					VHAToTCommonViewPR.addCartItems(selectionObj);
					$('.cartcount').text('1');	
					VHAToTCommonViewPR.calcIndCost();
					refreshTOTheader();
			}
				
			break;
			case "GET_PREPAY_PRODS":
			if(data.bsoutput.childArray["0"].type == "Errors"){
					$("#vha-carousel-container-prepay").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5" style="text-align: center;"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
			}
			else{
					sProductName = parseStructure(data.bsoutput,["ResultSet", "SiebMsg", "ListOfVHA Proposition Product Details", "Proposition","ListOfProducts"]);
				}
			break;//ss103269: TOT Prepay Dynamic Commercial Offers Display			
		}
	}
	function processprepayplanData(){
		getTilesDataPrepay(app.plansPrepay, searchConditionPrepay);
		$('.totsearchplan-pre').autocomplete({
			source: app.plansPrepay.childArray.map(function(a) {
				return {label: a.propArray.Name, value: a.propArray.Name, VHAPlanType:a.propArray["Addon Type"], flow:totFlow};
			}),
			minLength: 0,
			select: selectAutoCompleteVal
		});
	}
	function processnewplanData(createTile){
		if(createTile=="Y"){
			getTilesData(app.plansForNewUser, searchCondition);
			$('.totsearchplan').autocomplete({
				source: app.plansForNewUser.childArray.map(function(a) {
					return {label: a.propArray.RatePlanName, value: a.propArray.RatePlanName, VHAPlanType:a.propArray.VHAPlanType, flow:totFlow};
				}),
				minLength: 0,
				select: selectAutoCompleteVal
			});
		}
	}
	function processoldplanData(){
		var curPlanArr="";					
		if(app.plansForOldUser!=null){
			app.plansForOldUser.childArray.forEach(function(item,index){
				if(item.propArray["CurrentPlanFlag"]=="Y"){
				curPlanArr = item;		
				}
			});
		}
		if(curPlanArr!=""){
			app.plansForOldUser.childArray = app.plansForOldUser.childArray.filter(function(item) {
				return item.propArray["CurrentPlanFlag"]!="Y";
			});
			app.plansForOldUser.childArray.unshift(curPlanArr);
		}
		//console.log(app.plansForOldUser);
		getTilesData(app.plansForOldUser, searchCondition);
		if(app.plansForOldUser!=null){
			$('.totsearchplan').autocomplete({
				source: app.plansForOldUser.childArray.map(function(a) {
					return {label: a.propArray.RatePlanName, value: a.propArray.RatePlanName, VHAPlanType:a.propArray.VHAPlanType, flow:totFlow};
				}),
				minLength: 0,
				select: selectAutoCompleteVal
			});
		}
	}
	function createToolTip(x){
		var t = '<div class="vhatooltip" style="height: 60px;width: 60px; z-index: 1;"><div class="tooltiptext">'+x+'</div></div>';
		return t;
	}
	function executeEvent(pm, evtName, inp){
		return pm.OnControlEvent(evtName, inp);
	}
	function parseStructure(outPS, oArr){var o = outPS;var index;for (var i=0; i < oArr.length; i++){index=-1;for (var j=0; j<o.childArray.length; j++) {if (o.childArray[j].type ===oArr[i]){index =j;break;}}if (index==-1){o =null;break;}else{o=o.childArray[j];}}return o;};
	
	function mValidateAuthFields(isFromLeaveStep)
	{
		var sProceed=true;
		$('.authvalidation').remove();
		$('.VHAToTnullerr').removeClass('VHAToTnullerr');
		var apMap = SiebelApp.S_App.GetActiveView().GetAppletMap();
		var	authAppCtrl = apMap["VHA Transfer Authorization Applet"].GetControls();
		if(($('#VHATOTAuthStatus').text()=="" ||  $('#VHATOTAuthStatus').text()!="Verification Successful") && $('#TCTaStatus').length==0)
		{
			$('#vhatransferauthbtn').after("<div class='authvalidation ml-2' id='TCTaStatus' style='color:red;margin-top: 40px;'>Please validate Transferring Mobile Number</div>").addClass("VHAToTnullerr");
			$("#vhatransferauthbtn").focus();
			sProceed=false;
		}
		if(($('#VHATOTAuthExStatus').text()=="" ||  $('#VHATOTAuthExStatus').text()!="Verification Successful") && $('#TCEcStatus').length==0)
		{
			if($("#vhatotextcustbtn").hasClass("applet-button-active"))
			{
			$("#vhatotexisttverifybtn").after("<div class='authvalidation ml-2' id='TCEcStatus' style='color:red;margin-top: 40px;'>Please validate Existing Customer</div>").addClass("VHAToTnullerr");
			$("#vhatotexisttverifybtn").focus();
			sProceed=false;
			}
		}
		var sErrDispName=["Address","Billing Date","No. of Active Services"];
		var sUniqId=["TotAddr","TotBillingDate","TotActServ"];
		var sAppList = SiebelApp.S_App.GetActiveView().GetAppletMap();
		["Enter Address","Billing Date","No. of Active Services"].forEach(function(item,index)
		{
			var sSelct='#'+sUniqId[index];
			var sTransServ=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").GetFieldValue("Transferring Service As");
			switch(item)
			{
			case "Billing Date":
			if(($("[name='"+authAppCtrl[item].GetInputName()+"']").val()=="") && $(sSelct).length==0 && sTransServ=="Postpay")
			{
			$("[name='"+authAppCtrl[item].GetInputName()+"']").parent().append("<div class='authvalidation' id='"+sUniqId[index]+"' style='color:red;margin-bottom: 20px;'>Please Enter "+sErrDispName[index]+"</div>");
			$("[name='"+authAppCtrl[item].GetInputName()+"']").addClass("VHAToTnullerr");
			$("[name='"+authAppCtrl[item].GetInputName()+"']").off("keydown").on("keydown",function(){
			$(this).parent().find('.authvalidation').remove();
			$(this).removeClass("VHAToTnullerr");
			});
			sProceed=false;
			}
			break; 
			case "No. of Active Services":
			if(($("[name='"+authAppCtrl[item].GetInputName()+"']").val()=="") && $(sSelct).length==0 && sTransServ=="Prepay")
			{
			$("[name='"+authAppCtrl[item].GetInputName()+"']").parent().append("<div class='authvalidation' id='"+sUniqId[index]+"' style='color:red;margin-bottom: 20px;'>Please Enter "+sErrDispName[index]+"</div>");
			$("[name='"+authAppCtrl[item].GetInputName()+"']").addClass("VHAToTnullerr");
			$("[name='"+authAppCtrl[item].GetInputName()+"']").off("keydown").on("keydown",function(){
			$(this).parent().find('.authvalidation').remove();
			$(this).removeClass("VHAToTnullerr");
			});
			sProceed=false;
			}
			break; 
			case "Enter Address":
			var sHdrBC=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");
			var sAddrValFlg=sHdrBC.GetFieldValue("PSMA Flag");
			if((sAddrValFlg=="N") && $(sSelct).length==0)
			{
			$("[name='"+authAppCtrl[item].GetInputName()+"']").parent().append("<div class='authvalidation' id='"+sUniqId[index]+"' style='color:red;margin-bottom: 20px;'>Please Enter Valid "+sErrDispName[index]+"</div>");
			$("[name='"+authAppCtrl[item].GetInputName()+"']").addClass("VHAToTnullerr");
			$("[name='"+authAppCtrl[item].GetInputName()+"']").off("keydown").on("keydown",function(){
			$(this).parent().find('.authvalidation').remove();
			$(this).removeClass("VHAToTnullerr");
			});
			sProceed=false;
			}
			break;
			default:
			break;
			
			}
		});
		var sEml=sAppList["VHA Transfer Authorization Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Email");
		var sPhn=sAppList["VHA Transfer Authorization Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Home Phone #");
		var sPin=sAppList["VHA Transfer Authorization Applet"].GetPModel().Get("GetBusComp").GetFieldValue("PIN");
		var sCus=sAppList["VHA Transfer Authorization Applet"].GetPModel().Get("GetBusComp").GetFieldValue("Transferring Service To");
		var Inps=SiebelApp.S_App.NewPropertySet();
		Inps.SetProperty("EmailAddress",sEml);
		Inps.SetProperty("PhoneNumber",sPhn);
		Inps.SetProperty("PIN",sPin);
		Inps.SetProperty("CustType",sCus);
		var Outps=VHAAppUtilities.CallWorkflow("VHA TOT Customer Details Validation WF",Inps, {});
		var sUniqId=["TotContactNum","TotContactEmail","TotPIN"];
		var sErr=["ErrorNumber","ErrorEmail","ErrorPIN"];
		["Contact Number","Contact Email","PIN"].forEach(function(item,index)
		{
			var sSelct='#'+sUniqId[index];
			if((Outps.GetProperty(sErr[index])!="") && $(sSelct).length==0)
			{
			$("[name='"+authAppCtrl[item].GetInputName()+"']").after("<div class='authvalidation' id='"+sUniqId[index]+"' style='color:red;margin-bottom: 20px;'>"+Outps.GetProperty(sErr[index])+"</div>").addClass("VHAToTnullerr");
			$("[name='"+authAppCtrl[item].GetInputName()+"']").off("keydown").on("keydown",function(){
			$(this).next('.authvalidation').remove();
			$(this).removeClass("VHAToTnullerr");
			});	
			sProceed=false;
			}
		});
   
		if($('[aria-label="Manual Address"]').is(':checked'))
	    {
	    	var sAddErrDispName=["Postal Code","Country","State","Street #","Street Address","Street Type","Bag","Box","City"];
	    	var sUniqId=["TotPostalCode","TotManualCountry","TotState","TotStreet","TotStreetAddress","TotStreetType","TotBag","TotBox","TotCity"];
		["Postal Code","Manual Country","State","Street #","Street Address","Street Type","Bag","Box","City"].forEach(function(item,index)
		{
			//var sSelct='#'+sUniqId[index];
			if($("[name='"+authAppCtrl[item].GetInputName()+"']").val()=="" && $("[name='"+authAppCtrl[item].GetInputName()+"']").parent().parent().prev().children().hasClass("AddRequired"))
		{
			$("[name='"+authAppCtrl[item].GetInputName()+"']").addClass("VHAToTnullerr").parent().append("<div class='authvalidation' id='"+sUniqId[index]+"' style='color:red;margin-bottom: 20px;'>Please Enter "+sAddErrDispName[index]+"</div>");
			$("[name='"+authAppCtrl[item].GetInputName()+"']").off("keydown").on("keydown",function(){
			$(this).parent().find('.authvalidation').remove();
			$(this).removeClass("VHAToTnullerr");
			});
			sProceed=false;
		}
			
		})};
		if(isFromLeaveStep=="N")
		{
        	var idtyp=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Add Identification Details VBC").GetFieldValue("ID Type");
			$(".vhaidfields").each(function(index, item){
				switch(idtyp){
					case "Defence Force ID":
					case "Pensioner Card":
					case "Student ID":
					case "DVA Health Care Card":
					case "Gold Veteran Affairs Card":
					if(item.value=="" && (
					$(item).attr("lblname")=="First Name"  
					|| $(item).attr("lblname")=="Last Name" 
					|| $(item).attr("lblname")=="Date of Birth" 
					|| $(item).attr("lblname")=="Id Reference Number" 
					|| $(item).attr("lblname")=="Country") && (!item.disabled)
					) {
						$(item).addClass('VHAToTnullerr');
						$('#SuccessMessage').text("Please enter the value for required fields").addClass("TOTRedFont");
						sProceed=false;
					}									
					break;
					default:
					if(item.value=="" && $(item).attr("lblname")!="Middle Name" && (!item.disabled)) {
						$(item).addClass('VHAToTnullerr');
						$('#SuccessMessage').text("Please enter the value for required fields").addClass("TOTRedFont");
						sProceed=false;
					}
					break;
				}							
			});			
			/*$(".vhaidfields").each(function(index, item){
				if(item.value=="" && $(item).attr("lblname")!="Middle Name") {
					$(item).addClass('VHAToTnullerr');
					$('#SuccessMessage').text("Please enter the value for required fields").addClass("TOTRedFont");
					sProceed=false;
				}
			});*/
			$(".vhaidfields[lblname='First Name'],.vhaidfields[lblname='Last Name'],.vhaidfields[lblname='Middle Name'],.vhaidfields[lblname='Person Name'],.vhaidfields[lblname='Id Reference Number']").each(function(index, item){
				var sUniqAddrId=["TotFN","TotLN","TotMN","TotPN","TotREF"];
				var sSelct='#'+sUniqAddrId[index];
				if( sUniqAddrId= sUniqAddrId[4]){
				 var sRegEx=new RegExp("^[a-zA-Z0-9\-' ]*$");	
				}
				else{
				var sRegEx=new RegExp("^[a-zA-Z ]*$");}
				var sValPassed=sRegEx.test(item.value);//console.log(sValPassed);
				if((!sValPassed) && $(sSelct).length==0 && item.value!="") {
					/*$(item).addClass('VHAToTnullerr');
					$(item).after("<div class='authvalidation' id='"+sUniqAddrId[index]+"' style='color:red;margin-bottom: 20px;'>Please avoid special characters </div>")*/
					$('#SuccessMessage').text("Please avoid special characters").addClass("TOTRedFont");
					sProceed=false;
				}
			});
			if(sProceed){				
				SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").WriteRecord();
				SiebelAppFacade.VHANameChangeCaptureIdPR.callDVS();
			}
		}else{
			SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC").WriteRecord();
		}
		$('.VHAToTnullerr').first().focus();
		return sProceed;
	}	
	function formatDate(dte) {
		var sDtArr=dte.split("/");
		var sNewDt=sDtArr[1]+"/"+sDtArr[0]+"/"+sDtArr[2];
		return sNewDt;
	}
	
	function loadDevice(){
		
			SiebelAppFacade.VHATransferSelectDeviceCreditCheckAppletPR.LoadDevice();
	}
	
	var selectAutoCompleteVal = function(e, u) {
		e.preventDefault();
		$(this).val(u.item.value);
		resetSearchUI("searchinput");
		planType = u.item.VHAPlanType;
		switch(u.item.flow){
			case "Postpay":				
				 searchCondition = [{"PlanType": planType, "ByDolar": "NA", "ByGB": "NA", "SearchInput": u.item.value, "Condition":"equalTo"}];
				 (custType == "New") ? getTilesData(app.plansForNewUser, searchCondition) : getTilesData(app.plansForOldUser, searchCondition);
				 switch(planType){
					case "Voice":
						$('#vhatothsplan').addClass("vhabtnredbg");
					break;
					case "MBB":
						$('#vhatotmbbplan').addClass("vhabtnredbg");
					break;
					case "Caps":
						$('#vhatotcapplan').addClass("vhabtnredbg");
					break;
					case "NBN":
						$('#vhatotnbnplan').addClass("vhabtnredbg");
					break;
				}
			break;
			case "Prepay":
					searchConditionPrepay = [{"PlanType": planType, "SearchInput":u.item.value}];
					getTilesDataPrepay(app.plansPrepay, searchConditionPrepay);
					var l = $("button.vhatotpreplantype").length;
					for(var a = 0; a<l; a++){
						$($($("button.vhatotpreplantype"))[a]).removeClass("vhabtnredbg");
					}
					for(var i = 0; i<preplanTypeBtn.length; i++){
						if(planType == preplanTypeBtn[i].Name){
							var sIdValue = preplanTypeBtn[i].Id;
							$("#" + sIdValue + "").addClass("vhabtnredbg");
							break;
						}
					}//ss103269: TOT Prepay Dynamic Commercial Offers Display
			break;
		}
	};
	
	VHAToTCommonViewPR.PrepayGuideFlow = function(flow){
		if(flow=="Prepay"){
			totFlow="Prepay";
			$("#smartwizard").smartWizard("stepState",[1,3], "disable");
			$("#smartwizard").smartWizard("stepState",[1,3], "hide");
			$('.post-btn-sw').addClass('VFDisplayNone');
			$('.pre-btn-sw').removeClass('VFDisplayNone');
			$('.plan-opt-post, .vha-carousel-container, .tot-post-plans').addClass('VFDisplayNone');
			$('.plan-opt-pre, .vha-carousel-container-prepay, .tot-pre-plans').removeClass('VFDisplayNone');			
			$("#vha-carousel-container").empty();			
		}
		else if(flow=="Postpay"){
			totFlow="Postpay";
			$("#smartwizard").smartWizard("stepState",[1,3], "enable");
			$("#smartwizard").smartWizard("stepState",[1,3], "show");
			$('.pre-btn-sw').addClass('VFDisplayNone');
			$('.post-btn-sw').removeClass('VFDisplayNone');			
			$('.plan-opt-pre, .vha-carousel-container-prepay,.tot-pre-plans').addClass('VFDisplayNone');
			$('.plan-opt-post, .vha-carousel-container,.tot-post-plans').removeClass('VFDisplayNone');
			$("#vha-carousel-container-prepay").empty();			
		}		
	}
	VHAToTCommonViewPR.GetTOTFlow = function(){
		return totFlow;		
	}
	function refreshTOTheader(){
		var sAppList = SiebelApp.S_App.GetActiveView().GetAppletMap();
		sAppList["VHA Transfer Authorization Applet"].GetPModel().ExecuteMethod("InvokeMethod","RefreshRecord",SiebelApp.S_App.NewPropertySet());
	}
	
	function clearCart(){
		$("#VHAClearCartConfirm").remove();
		$("body").append(
		'<div id="VHAClearCartConfirm" style="height:100% !important; width:480px !important">\
			Are you sure you want to delete the plan?\
		</div>'
		);
		$("#VHAClearCartConfirm").dialog({
			autoOpen: false,
			modal: true,
			//title:'<div class="vha-tot-close"></div>',
			//titleHtml:true,
			buttons: [
				{
					text: "Cancel",
					"class": "vha-custom-button btn vhasecondarybtn",
					click: function() {
						$(this).dialog("close");
					}
				},
				{
					text: "Delete",
					"class": "vha-custom-button btn btn-secondary vhacntbtn",
					click: function() {
						resetCartItems();
						$(this).dialog("close");						
					}
				}
			],
			width: "400px",
			position: {
				my: "center",
				at: "center",
				of: window
			},
			open:function(event, ui){
				$('[aria-describedby="VHAClearCartConfirm"] .ui-dialog-titlebar').append('<div class="vha-tot-close"></div>');
				$('[aria-describedby="VHAClearCartConfirm"] .ui-dialog-title').remove();
				$('.vha-tot-close').off("click").on("click", function(){
					 $("#VHAClearCartConfirm").dialog("close");		 
				});
			},
			close:function(event, ui){				
				$('.vha-tot-close').remove();				
			}
		});
	}
	
	function cancelTOTFlow(){
		$("#VHACaptureLeadDialog").remove();
		$("body").append(
		'<div id="VHACaptureLeadDialog" style="height:100% !important; width:480px !important">\
			<div id="VHACaptureLeadDiv">\
				<table class="leadtable" align="center">\
					<tr>\
						<td class = "leadmsg" colspan="2">Hey there, Please leave your details so we can contact you even if you are no longer interested at this moment.</td>\
					</tr>\
					<tr>\
						<td class="vhatotlbl1">Name	</td><td> <input type="text" id="LeadName"   class="vhaleadfields"></td>\
					</tr>\
					<tr>\
						<td class="vhatotlbl1">Email</td><td> <input type="text" id="Leademail"  class="vhaleadfields"></td>\
					</tr>\
					<tr>\
						<td class="vhatotlbl1">Phone	</td><td> <input type="text" id="LeadPhNo"   class="vhaleadfields"></td>\
					</tr>\
					<tr>\
						<td class="vhatotlbl1">Reason</td>\
						<td><select id="LeadReason" class="vhaleadfields">\
							<option value="">Choose Discard Reason</option>\
							<option value="Reason 1">Reason 1</option>\
							<option value="Reason 2">Reason 2</option>\
							<option value="Reason 3">Reason 3</option>\
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
			buttons: [
				{
					text: "Cancel",
					"class": "vha-custom-button btn vhasecondarybtn",
					click: function() {
						$(this).dialog("close");
						$("#error").hide();
					}
				},
				{
					text: "Submit Lead",
					"class": "vha-custom-button btn btn-secondary vhacntbtn",
					click: function() {
						if(!$("#LeadName").val() || !$("#LeadPhNo").val() || !$("#Leademail").val() || !$("#LeadReason").val()) {
							$("#error").text("Please enter all values");
							$("#error").show();
						} else {
							var headerBC=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");
							var Inps = SiebelApp.S_App.NewPropertySet();
							var Outs = SiebelApp.S_App.NewPropertySet();
							
							Inps.SetProperty("ProcessName", "VHA Create New Lead Workflow");
							Inps.SetProperty("Discard Reason",$("#LeadReason").val());
							Inps.SetProperty("Email",$("#Leademail").val());
							Inps.SetProperty("Name",$("#LeadName").val());
							Inps.SetProperty("Session Id",headerBC.GetFieldValue("Id"));
							Inps.SetProperty("CustomerAccountId", headerBC.GetFieldValue("Account Id"));
							Inps.SetProperty("Phone No",$("#LeadPhNo").val());
							Outs = VHAAppUtilities.CallWorkflow(
								"VHA Create New Lead Workflow",
								Inps, {}
							);							
							
							Inps.SetProperty("BusObj","VHA TOT Generic BO");
							Inps.SetProperty("BusComp","VHA TOT Generic BC");
							Inps.SetProperty("Id",headerBC.GetFieldValue("Id"));
							Inps.SetProperty("Status","Cancelled");
							Outs = VHAAppUtilities.CallBS(
								"VHA TOT Processing Service", "BCSetField",
								Inps, {}
							);
							Inps.Reset();
							Outs.Reset();
							Inps.SetProperty("TempId",headerBC.GetFieldValue("Id"));
							Outs = VHAAppUtilities.CallBS(
								"VHA TOT TBUI Service", "DeleteNewIDs",
								Inps, {}
							);
							
							
							$(this).dialog("close");
							SiebelApp.S_App.GotoView("VF Dashboard List View - TBUI");
						}
					}
				}
			],
			width: "500px",
			position: {
				my: "center",
				at: "center",
				of: window
			},
			/*open:function(event, ui){
				$('[aria-describedby="cancelTOTFlow"] .ui-dialog-titlebar').append('<div class="vha-tot-close"></div>');
				$('[aria-describedby="cancelTOTFlow"] .ui-dialog-title').remove();
				$('.vha-tot-close').off("click").on("click", function(){
					 $("#cancelTOTFlow").dialog("close");		 
				});
			},
			close:function(event, ui){				
				$('.vha-tot-close').remove();				
			}*/
		});
	}
	function totsleep(ms){
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	function updtCreditCheckStatus(){
		var i = 0;
		var timer = setInterval(function () {
			//console.log(++i);
			++i;
			var headerBC=SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Generic BC");
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outs = SiebelApp.S_App.NewPropertySet();
			Inputs.SetProperty("AccountId",headerBC.GetFieldValue("Account Id"));
			Outs = VHAAppUtilities.CallBS(
				"VHA TOT Processing Service", "CreditCheckStatus",
				Inputs, {}
			);
			//console.log("CCSts--"+Outs.GetProperty("CreditCheckStatus"));
			var ccFldStatus = Outs.GetProperty("CreditCheckStatus");
			//var ccUIStatus = Outs.GetProperty("CreditCheckStatus");			
			if(i==VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_CREDITCHK_INT' AND [List Of Values.Active]='Y'")
				|| ccFldStatus!="Pending"
				|| SiebelApp.S_App.GetActiveView().GetName()!="VHA ToT Common View"
			){
			$("#vhatotcreditchkstatus,#vhatotcreditchkstatus4").text(ccFldStatus);
			$('.cartccstatus').removeClass('VFDisplayNone');
			clearInterval(timer);
			}
		}, VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_CREDITCHK_TIMER' AND [List Of Values.Active]='Y'"));
	}
	
	return VHAToTCommonViewPR;
   }()
  );
  return "SiebelAppFacade.VHAToTCommonViewPR";
 })
}