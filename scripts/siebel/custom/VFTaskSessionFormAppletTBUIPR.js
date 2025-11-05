if (typeof(SiebelAppFacade.VFTaskSessionFormAppletTBUIPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VFTaskSessionFormAppletTBUIPR");
 define("siebel/custom/VFTaskSessionFormAppletTBUIPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.VFTaskSessionFormAppletTBUIPR = (function () {

    function VFTaskSessionFormAppletTBUIPR(pm) {
     SiebelAppFacade.VFTaskSessionFormAppletTBUIPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VFTaskSessionFormAppletTBUIPR, SiebelAppFacade.PhysicalRenderer);
    VFTaskSessionFormAppletTBUIPR.prototype.Init = function () {
     SiebelAppFacade.VFTaskSessionFormAppletTBUIPR.superclass.Init.apply(this, arguments);
    }
    VFTaskSessionFormAppletTBUIPR.prototype.ShowUI = function () {
     SiebelAppFacade.VFTaskSessionFormAppletTBUIPR.superclass.ShowUI.apply(this, arguments);
	 	 
	 /*$('#Customer_Row_Id_Label_4').parent('div').parent('td').attr('colspan','4');
	 $('#Date_of_Birth_Label_4').parent('div').parent('td').attr('colspan','4');
	 $('#Delievery_Postcode_Label_4').parent('div').parent('td').attr('colspan','8');*/
	 
	 var pm = this.GetPM();
		 var AppletId = pm.Get("GetFullId");
		 var sAppName = pm.Get("GetName");
		 var AppletFullId = "s_"+AppletId+"_div";
		var newWid=0; //$("#"+AppletFullId).html(VFTaskSessionFormAppletTBUIPR.GetSessionAppletLayout(pm.Get("GetRecordSet")[0])).addClass("VHACustomerSessionApplet");	
				
		var sViewName=SiebelApp.S_App.GetActiveView().GetName();
		 var sFlowName=$('.siebui-applet-taskui-h').html().slice(0,($('.siebui-applet-taskui-h').html().indexOf('<span class="siebui-taskui-title">')));
		 $.getJSON('scripts/siebel/custom/ViewsConfigList.json', function (data) {
			$.each(data.flows,function(k,v){
                   if(sFlowName.search(v.FlowType) != -1)
				   {
					   var sInd=v.view_name.indexOf(sViewName);
					   newWid=v.Percentage[sInd];
				 
					}
					   
				});
				if(sFlowName.search("Connect NBN:")==-1)
					$('#OrderFeasibility').css("display","none");
				if(sAppName=="VHA PosttoPre Order Details Session Applet")$('#PostToPre').removeClass('VHASessionDisplayNone');
				//Below code to read the progress value from the TBUI OOTB
		 var TaskProgress = $("#IDS_TASKPANE_PROGRESS").html();
		 var RefStringLength = "Percentage Completed:::".length
		 //var newWid = Number(TaskProgress.substr(RefStringLength,TaskProgress.length));
		 //var newWid = Number($(".VHASessionProgressBarChild").attr("ProgressLength"))||0;	
		 
		 if(TheApplication().GetProfileAttr("NBNRetrievePlans") == "Y")
		 {
			if($('input.siebui-ctrl-radio[aria-label="Consumer"]').length > 0)
			{
			$('input.siebui-ctrl-radio[aria-label="Consumer"]').hide();
			$('input.siebui-ctrl-radio[aria-label="Consumer"]').next().hide();
			$('input.siebui-ctrl-radio[aria-label="Consumer"]').next().next().hide();
			}		 
		 }
		 else{
			$('input.siebui-ctrl-radio[aria-label="Consumer"]').show();
			$('input.siebui-ctrl-radio[aria-label="Consumer"]').next().show();
			$('input.siebui-ctrl-radio[aria-label="Consumer"]').next().next().show();
		 }
		 
		 
		 if(SiebelApp.S_App.GetProfileAttr("InvokeFWAConnect") == "Yes" || SiebelApp.S_App.GetProfileAttr("InvokeFWAConnect1") == "Y")
		 {
			var titleFWA = $('.siebui-applet-taskui-h').text().split("::");
			titleFWA[0] = "Connect FWA";
			titleFWA.join("::");
			$('.siebui-applet-taskui-h').text(titleFWA.join("::"));
		 }
		 
		
		$(".VHASessionProgressBarChild").attr("ProgressLength",newWid);		
		if(newWid===0){
			$(".VHASessionProgressBarChild").html(0+"%");
		}else if(newWid < 10){
			$(".VHASessionProgressBarChild").width(10+"%").html(newWid+"% Completed");
		}else{
			$(".VHASessionProgressBarChild").width(newWid+"%").html(newWid+"% Completed");
		}		
				
				});
			 //$.getJSON( "scripts/siebel/custom/ViewsConfigList.json",getPerc(result));
		
		 //Below code to read the progress value from the TBUI OOTB
		/* var TaskProgress = $("#IDS_TASKPANE_PROGRESS").html();
		 var RefStringLength = "Percentage Completed:::".length
		 //var newWid = Number(TaskProgress.substr(RefStringLength,TaskProgress.length));
		 //var newWid = Number($(".VHASessionProgressBarChild").attr("ProgressLength"))||0;	
		
		$(".VHASessionProgressBarChild").attr("ProgressLength",newWid);		
		if(newWid===0){
			$(".VHASessionProgressBarChild").html(0+"%");
		}else if(newWid < 10){
			$(".VHASessionProgressBarChild").width(10+"%").html(newWid+"% Completed");
		}else{
			$(".VHASessionProgressBarChild").width(newWid+"%").html(newWid+"% Completed");
		}	*/	
		
		/* All Flows Customisation - Madhu- 04Jun19 */
		setTimeout(function () {
		var sNoCreditCheckViews=["VHA NBN Site Qualification Postpay TBUI","VF Capture Exst Customer Details Postpay TBUI","VF Capture Customer Details – Postpay TBUI","VF Customer ID Details – Postpay TBUI","VHA Kogan Capture Id Details View","VHA Kogan Capture Identification Details View"];
		var sActView=SiebelApp.S_App.GetActiveView().GetName();
		if(sFlowName!='Prepay Registration:' && sFlowName!='Connect Prepaid:' &&(!((sFlowName=='Connect Postpay:' || sFlowName =='Connect NBN:')&&(sNoCreditCheckViews.indexOf(sActView) != -1)&&(SiebelApp.S_App.GetProfileAttr("TBUIPostExstCust")!="Y"))))
		$('.VHASessionChevron').removeClass('VHASessionDisplayNone');
		var sActiveAppletName=pm.Get("GetName");
		var sNoWarningMessageApplets=["VHA Task Session Form Applet - Modify APP","VHA Task Session Form Applet - Manage APP","VHA Task Session Form Applet Dealer - Manage APP","VHA Task Session Form Applet - APP TBUI","VF Task Session Form Applet UniSIM TBUI","VHA Sharing Task Session Form Applet â€“ TBUI"];
		if(sNoWarningMessageApplets.indexOf(sActiveAppletName) != -1){ 
		$('#WarningMessage').addClass('VHASessionDisplayNone');
		}
		var sView = SiebelApp.S_App.GetActiveView().GetName();
		if(SiebelApp.S_App.GetProfileAttr("TBUIPostExstCust")=="Y" && (sView == "VHA NBN Site Qualification Postpay TBUI" || sView == "VF Capture Exst Customer Details Postpay TBUI")){
			    var CustomerId = pm.Get("GetBusComp").GetFieldValue("Customer Row Id");
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Output = SiebelApp.S_App.NewPropertySet();
				Inputs.SetProperty("Service Name", "SIS OM PMT Service");
				Inputs.SetProperty("Method Name", "Set Profile Attribute");
				Inputs.SetProperty("Profile Attribute Name", "VHACustomerId");
				Inputs.SetProperty("Profile Attribute Value", CustomerId);
				Output = ser.InvokeMethod("Run Process", Inputs);
		}
	    switch(sFlowName)
		{
		case "Connect Postpay:":
		case "Connect NBN:":
		if(SiebelApp.S_App.GetProfileAttr("TBUIPostExstCust")=="Y")
			VFDisplayFlap();
		else
		{
		var sViewName=SiebelApp.S_App.GetActiveView().GetName();	
		/*if(sViewName=="VF Connection Wizard View - Credit Check â€“ TBUI" || sViewName=="VF Connection Wizard View â€“ Shopping Cart â€“ TBUI" || sViewName=="VF Connection Wizard View â€“ Shopping Cart â€“ TBUI HI" || sViewName=="VHA Kogan NBN Customise Service View")*/
		if(sViewName!="VHA NBN Site Qualification Postpay TBUI" && sViewName!="VF Capture Exst Customer Details Postpay TBUI" && sViewName!="VF Capture Customer Details – Postpay TBUI" && sViewName!="VF Customer ID Details – PretoPost TBUI" && sViewName!="VHA Kogan Capture Identification Details View" && sViewName!="VHA Kogan Capture Id Details View" && sViewName != "VF Customer ID Details – Postpay TBUI" && sViewName != "VF Connection Wizard View - Credit Check – TBUI" && sViewName != "VF Capture Customer Details – Postpay FWA TBUI View")
			VFDisplayFlap();
		}
		break;
		case "Pre to Post Transfer:":
		VFDisplayFlap();
		break;
		case "Manage APP:":
		$('.VHASessionAppletInfoDiv.ContentSecion1 .FieldContainer').last().find('.VHASessionDisplayNone').removeClass('VHASessionDisplayNone');
		$('.VHASessionAppletInfoDiv.ContentSecion1 .siebui-icon-pick.applet-form-pick.applet-list-pick').remove();
		break;
		deafult:
		break;
		}
	    },1);
		
		
		/* End of all flows Customisation - Madhu- 04Jun19 */		
		
		
    }
	VFTaskSessionFormAppletTBUIPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VFTaskSessionFormAppletTBUIPR.superclass.BindData.apply(this, arguments);
    }

    VFTaskSessionFormAppletTBUIPR.prototype.BindEvents = function () {
     SiebelAppFacade.VFTaskSessionFormAppletTBUIPR.superclass.BindEvents.apply(this, arguments);
		
		$(".VHASessionParentDiv").delegate(".VHASessionChevron", "click", {ctx:this}, VFDisplayFlap);
	 
    }
	function VFDisplayFlap(){
		//$(this).toggleClass("ChevronInactive").toggleClass("ChevronActive");
		$(".VHASessionChevron").toggleClass("ChevronInactive").toggleClass("ChevronActive");
		$("#VHA_HiddenDiv").toggleClass("VHASessionDisplayNone");
		       var sOrderNum=$('#OrderNum').find('input').val();
			   var sCustomerID = SiebelApp.S_App.GetProfileAttr("sCustId");
			   if(SiebelApp.S_App.GetProfileAttr("sCustId") != "")
			   {
				sCustomerID = SiebelApp.S_App.GetProfileAttr("sCustId");
			   }
			   else
			   {
				 sCustomerID = $('input[aria-label="Customer Id:"]').val();
			   }
			   var newCustID =  $('input[aria-label="Customer Id:"]').val();
			   var Inputs = SiebelApp.S_App.NewPropertySet();
			   var Output = SiebelApp.S_App.NewPropertySet();
			   var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			   Inputs.SetProperty("Service Name", "VHA Query Order Details For Session Applet");
			   Inputs.SetProperty("Method Name", "QueryOrderDetails");
			   Inputs.SetProperty("sOrderNum",sOrderNum);
			   //Inputs.SetProperty("sCustId",SiebelApp.S_App.GetProfileAttr("sCustId")); //Ravindra: Added for Imagine Project
			   Inputs.SetProperty("sCustId", sCustomerID);
			   Inputs.SetProperty("sNewCustId", newCustID);
			   var Output = ser.InvokeMethod("Run Process", Inputs); 
			   var ResultSet = SiebelApp.S_App.NewPropertySet();
			   ResultSet = Output.GetChildByType ("ResultSet");
			   var servAcntId=ResultSet.GetProperty("servAcntId");
			   var sOrderFeasibilityDesc=ResultSet.GetProperty("sOrderFeasibilityDesc");
			   var sOrderFeasibilityStatus=ResultSet.GetProperty("sOrderFeasibilityStatus");
			   var sApprConnections=ResultSet.GetProperty("sApprConnections");
			   var sCreditExpDate=ResultSet.GetProperty("sCreditExpDate");
			   var sCreditStatus=ResultSet.GetProperty("sCreditStatus");
			   var sCreditClass=ResultSet.GetProperty("sCreditClass");
			   var sLiveConnections=ResultSet.GetProperty("sLiveConnections");
			   var sReqConnections=ResultSet.GetProperty("sReqConnections");
			   var sCredClass=ResultSet.GetProperty("sCreditClass");
			   var sCredMsg=ResultSet.GetProperty("sCreditCheckMessage");
			   var sRemainingLimit=ResultSet.GetProperty("sRemainingLimit");
			   var SearchString="[List Of Values.Type]='VF_CREDIT_CHECK_STATUS' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='APPROVE' AND [List Of Values.Low]='Selectable'";
			   var sApprVal=VHAAppUtilities.GetPickListValues("", SearchString);
			   var SearchString="[List Of Values.Type]='VF_CREDIT_CHECK_STATUS' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='DECLINE' AND [List Of Values.Low]='Selectable'";
			   var sDenVal=VHAAppUtilities.GetPickListValues("", SearchString);
			   var sCreditCheckClass=(sCreditStatus==sApprVal)?"VHACreditApproved":(sCreditStatus !==null && sCreditStatus!==undefined && sCreditStatus!=="" && sCreditStatus==sDenVal)?"VHACreditDenied":"";
			  
			  
			   $('#CreditCheckStatus').addClass(sCreditCheckClass);
			   /*if(sCreditStatus !==null && sCreditStatus!==undefined && sCreditStatus!=="")
			   $('.VHASessionCreditCheckImg').append("<img/>");
			   $('.VHASessionCreditCheckImg img').addClass(sCreditCheckClass);*/
               $('#ApprovedConnection').text(sApprConnections);
			   $('#LiveConnection').text(sLiveConnections);
			   $('#ReqConnection').text(sReqConnections);
			   /*Mani- SIT Sanity Defects*/
			   var sPrependtext=(sCreditCheckClass=="VHACreditApproved")?'<span class="dot_Class_Active DotCredit" ></span>':(sCreditCheckClass=="VHACreditDenied")?'<span class="dot_Class_Inactive DotCredit" ></span>':"";
			   $('#CreditCheckStatus').text(sCreditStatus).prepend(sPrependtext);
			   /*Mani- SIT Sanity Defects - ends*/	
			   $('#ExpiryDate').text(sCreditExpDate);
			   $('#CreditClass').text(sCredClass);
			   //$('#CreditCheckMessageField').text(sCredMsg);
			   if(sCredMsg != null && sCredMsg != ""){
			   	$('#CreditCheckMessageField').text(sCredMsg);
			   }
			   else{
			   	$('#CreditCheckRow2').addClass("VFDisplayNone");
			   }
			   
			  if(sRemainingLimit==null||sRemainingLimit=="")
			   $('#RemaininingEquipLim').text("NA");
			   else
			   $('#RemaininingEquipLim').text(parseFloat(sRemainingLimit).toFixed(2));
			   $('#OrderFeasibilityStatus').text(sOrderFeasibilityStatus);
			   $('#OrderFeasibilityDesc').text(sOrderFeasibilityDesc);
			   var sinputtag=$('#WarningMessage').find('input');
			   var sActualMsg=$('#WarningMessage').find('input').val();
			   
			   if(sActualMsg != null && sActualMsg!=""){
			   $('#WarningMessageField').text(sActualMsg);
			   $('#WarningMessageField').append(sinputtag);
			   }
			   else{
			   	$('#WarningMessage').addClass("VFDisplayNone");
			   }
			   //$('#WarningMessageField').text(sActualMsg);
			   //$('#WarningMessageField').append(sinputtag);
			   
		//Below code is for demo purpose only. Can be removed later
		/*var newWid = Number($(".VHASessionProgressBarChild").attr("ProgressLength"))||0;
		if(newWid >= 100 ){
			newWid = newWid-90;
		}else{
			newWid = newWid+10;
		}
		$(".VHASessionProgressBarChild").attr("ProgressLength",newWid);		
		$(".VHASessionProgressBarChild").width(newWid+"%").html(newWid+"% Completed");//*/
			var sView = SiebelApp.S_App.GetActiveView().GetName();
			if(sView == "VHA NBN Site Qualification Postpay TBUI" || sView == "VF Capture Exst Customer Details Postpay TBUI"){
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Output = SiebelApp.S_App.NewPropertySet();
				Inputs.SetProperty("Service Name", "SIS OM PMT Service");
				Inputs.SetProperty("Method Name", "Set Profile Attribute");
				Inputs.SetProperty("Profile Attribute Name", "VHACustomerId");
				Inputs.SetProperty("Profile Attribute Value", "");
				Output = ser.InvokeMethod("Run Process", Inputs);
		}
	
	}

    VFTaskSessionFormAppletTBUIPR.prototype.EndLife = function () {
     SiebelAppFacade.VFTaskSessionFormAppletTBUIPR.superclass.EndLife.apply(this, arguments);
	 $(".VHASessionProgressBarPar").parent().remove();
    }
	
	VFTaskSessionFormAppletTBUIPR.GetSessionAppletLayout = function(RecordSet) {
		var sessionId = RecordSet["Session Id"];
		var CustomerName = RecordSet["Customer Name"];
		var OrderNum = RecordSet["Order Number"];
		var CustomerRowId = RecordSet["Customer Row Id"];
		var DOM = RecordSet["DOM"];
		var Customersegment = RecordSet["VF Customer Segment"];
		var LiveConnection = RecordSet["Live Connections"];
		var REL = RecordSet["Remaining Equipment Limit"];
		var RequestConnection = RecordSet["Request Connections"];
		var ApprovedConnection = RecordSet["Approved Connections"];
		var ExpiryDate = RecordSet["Expiry Date"];
		//TODO : map credit check status here
		var CreditCheckStatus = "";
		
		return "<div><div class='VHASessionProgressBarPar'><div class='VHASessionProgressBarChild'>10% Complete</div></div><div class='VHASessionParentDiv'><div class='VHASessionChildDiv'> <span class='FieldContainer'> <span class='VHASessionAppletLabel'>Session Id: </span><span class='VHASessionAppletField'>"+sessionId+"</span> </span></div><div class='VHASessionChildDiv'> <span class='FieldContainer'> <span class='VHASessionAppletLabel'>Customer Name: </span><span class='VHASessionAppletField'>"+CustomerName+"</span> </span></div><div class='VHASessionChildDiv'> <span class='FieldContainer'> <span class='VHASessionAppletLabel'>Order #: </span><span class='VHASessionAppletField'>"+OrderNum+"</span> </span> <span class='VHASessionChevron ChevronInactive'></span></div></div><div class='VHASessionAppletParentFlap VHASessionDisplayNone'><div class='VHASessionAppletChildFlap Flap1'><div class='VHASessionAppletInfoDiv ContentSecion1'> <span class='FieldContainer'><span class='VHASessionAppletLabel'>Customer Id: </span><span class='VHASessionAppletField'>"+CustomerRowId+"</span></span> <span class='FieldContainer'><span class='VHASessionAppletLabel'>Customer Segment: </span><span class='VHASessionAppletField'>"+Customersegment+"</span></span> <span class='FieldContainer'><span class='VHASessionAppletLabel'>DOM: </span><span class='VHASessionAppletField'>"+DOM+"</span></span></div></div><div class='VHASessionAppletChildFlap Flap2'> <div class='Section2Container'> <div class='VHASessionAppletInfoDiv ContentSecion2'> <div class='VHASessionCreditCheckinfo'> <div class='VHASessionTopLabel'>Approved Connection</div><div class='VHASessionbotonfield'>"+ApprovedConnection+"</div></div><div class='VHASessionCreditCheckinfo'> <div class='VHASessionTopLabel'>Live Connection</div><div class='VHASessionbotonfield'>"+LiveConnection+"</div></div><div class='VHASessionCreditCheckinfo'> <div class='VHASessionTopLabel'>Requested # Connection</div><div class='VHASessionbotonfield'>"+RequestConnection+"</div></div><div class='VHASessionCreditCheckinfo'> <div class='VHASessionTopLabel'>Credit Check Status</div><div class='VHASessionbotonfield'>"+CreditCheckStatus+"</div></div><div class='VHASessionCreditCheckinfo'> <div class='VHASessionTopLabel'>Expiry Date</div><div class='VHASessionbotonfield'>"+ExpiryDate+"</div></div><div class='VHASessionCreditCheckinfo'> <div class='VHASessionTopLabel'>Credit Class</div><div class='VHASessionbotonfield'>"+ExpiryDate+"</div></div></div><div class='VHASessionAppletInfoDiv ContentSecion2 CreditCheckMessage'> <div class='VHASessionCreditCheckinfoCOlFlex'> <div class='VHASessionTopLabel'>Credit Check Message</div><div class='VHASessionbotonfield'>"+ApprovedConnection+"</div></div></div></div></div><div class='VHASessionAppletChildFlap Flap3'><div class='VHASessionAppletInfoDiv ContentSecion3'><div class='VHASessionCreditCheckinfo'><div class='VHASessionTopLabel'>Remaining Equipment Limit</div><div class='VHASessionbotonfield'>"+REL+"</div></div></div></div></div><div id='WarningMessage' class='VHASessionAppletChildFlap'><div class='VHASessionCreditCheckinfoCOlFlex'> <div class='VHASessionTopLabel'>Warning Message:</div><div class='VHASessionbotonfield'>"+RequestConnection+"</div></div></div><div id='OrderFeasibility' class='VHASessionAppletChildFlap'><div class='VHASessionCreditCheckinfoCOlFlex'> <div class='VHASessionTopLabel'>Order Feasibility Status</div><div class='VHASessionbotonfield'>"+RequestConnection+"</div></div><div class='VHASessionCreditCheckinfoCOlFlex'> <div class='VHASessionTopLabel'>Order Feasibility Description</div><div class='VHASessionbotonfield'>"+RequestConnection+"</div></div></div><div></div></div>";
	}

    return VFTaskSessionFormAppletTBUIPR;
   }()
  );
  return "SiebelAppFacade.VFTaskSessionFormAppletTBUIPR";
 })
}
