if (typeof (SiebelAppFacade.VHATransferEmployeeDetailsAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHATransferEmployeeDetailsAppletPR");
    define("siebel/custom/VHATransferEmployeeDetailsAppletPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHATransferEmployeeDetailsAppletPR = (function() {
            function VHATransferEmployeeDetailsAppletPR(pm) {
                SiebelAppFacade.VHATransferEmployeeDetailsAppletPR.superclass.constructor.call(this, pm);
            }
            SiebelJS.Extend(VHATransferEmployeeDetailsAppletPR, SiebelAppFacade.PhysicalRenderer);
            /*---------- Custom Code Goes Here ------------*/
            VHATransferEmployeeDetailsAppletPR.prototype.Init = function() {
                SiebelAppFacade.VHATransferEmployeeDetailsAppletPR.superclass.Init.apply(this, arguments);
				this.GetPM().AddMethod("FieldChange", OnFieldChange,{sequence : false, scope: this});
                this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
                    sequence: false,
                    scope: this
                });
            }
            VHATransferEmployeeDetailsAppletPR.prototype.ShowUI = function() {
                SiebelAppFacade.VHATransferEmployeeDetailsAppletPR.superclass.ShowUI.call(this);
                var pm = this.GetPM();
                var busObj = SiebelApp.S_App.GetActiveBusObj();

                var busComp = busObj.GetBusCompByName("VHA TOT Credit Check BC");
                var sPermstatus = busComp.GetFieldValue("Permanent Resident");
                var sAccountId = busComp.GetFieldValue("Account Id");

                //var sPermstatus= pm.Get("GetBusComp").GetFieldValue("Permanent Resident");
                var sCreditCheckStatus = pm.Get("GetBusComp").GetFieldValue("Credit Check Status");
                //var sAccountId= pm.Get("GetBusComp").GetFieldValue("Account Id");
                var bDisable = "FALSE";
                if (sPermstatus == "Y") {

                    $('#vhapermyesbutton').addClass('vhabtnredbg');
                    $('#vhapermnobutton').removeClass('vhabtnredbg');
                } else {
                    $('#vhapermnobutton').addClass('vhabtnredbg');
                    $('#vhapermyesbutton').removeClass('vhabtnredbg');
                }

                /*Start created for INline Text box*/
                /*$('[aria-labelledby="Current_Address_in_Years_Label"]').attr('placeholder', 'Years');
                $('[aria-labelledby="Current_Address_in_Years_Label"]').focus(function() {*/
				/*TULASIY:15Sept2022::Added as per 22.7 upgrade issues*/
				var uaddrYr = "Current_Address_in_Years_Label_"+pm.Get("GetId");
				$('[aria-labelledby='+uaddrYr+']').attr('placeholder', 'Years');
                $('[aria-labelledby='+uaddrYr+']').focus(function() {
                    $(this).attr('placeholder', '');
                }).blur(function() {
                    $(this).attr('placeholder', 'Years');
                });

                /*$('[aria-labelledby="Current_Address_in_Month_Label"]').attr('placeholder', 'Months');
                $('[aria-labelledby="Current_Address_in_Month_Label"]').focus(function() {*/
				/*TULASIY:15Sept2022::Added as per 22.7 upgrade issues*/
				var uaddrMn = "Current_Address_in_Month_Label_"+pm.Get("GetId");
				$('[aria-labelledby='+uaddrMn+']').attr('placeholder', 'Months');
                $('[aria-labelledby='+uaddrMn+']').focus(function() {
                    $(this).attr('placeholder', '');
                }).blur(function() {
                    $(this).attr('placeholder', 'Months');
                });
                /*$('[aria-labelledby="Employee_Status_Label"]').attr('placeholder', 'Profession');
                $('[aria-labelledby="Employee_Status_Label"]').focus(function() {*/
				/*TULASIY:15Sept2022::Added as per 22.7 upgrade issues*/
				var uempSt = "Employee_Status_Label_"+pm.Get("GetId");
				$('[aria-labelledby='+uempSt+']').attr('placeholder', 'Profession');
                $('[aria-labelledby='+uempSt+']').focus(function() {
                    $(this).attr('placeholder', '');
                }).blur(function() {
                    $(this).attr('placeholder', 'Profession');
                });

                /*$('[aria-labelledby="Employee_Name_Label"]').attr('placeholder', 'Employer name');
                $('[aria-labelledby="Employee_Name_Label"]').focus(function() {*/
				/*TULASIY:15Sept2022::Added as per 22.7 upgrade issues*/
				var uempNm = "Employee_Name_Label_"+pm.Get("GetId");
				$('[aria-labelledby='+uempNm+']').attr('placeholder', 'Employer name');
                $('[aria-labelledby='+uempNm+']').focus(function() {
                    $(this).attr('placeholder', '');
                }).blur(function() {
                    $(this).attr('placeholder', 'Employer name');
                });

                /*$('[aria-labelledby="Employee_Duration_in_Years_Label"]').attr('placeholder', 'Years');
                $('[aria-labelledby="Employee_Duration_in_Years_Label"]').focus(function() {*/
				/*TULASIY:15Sept2022::Added as per 22.7 upgrade issues*/
				var uempDurYr = "Employee_Duration_in_Years_Label_"+pm.Get("GetId");
				$('[aria-labelledby='+uempDurYr+']').attr('placeholder', 'Years');
                $('[aria-labelledby='+uempDurYr+']').focus(function() {
                    $(this).attr('placeholder', '');
                }).blur(function() {
                    $(this).attr('placeholder', 'Years');
                });

                /*$('[aria-labelledby="Employee_Duration_in_Months_Label"]').attr('placeholder', 'Months');
                $('[aria-labelledby="Employee_Duration_in_Months_Label"]').focus(function() {*/
				/*TULASIY:15Sept2022::Added as per 22.7 upgrade issues*/
				var uempDurMn = "Employee_Duration_in_Months_Label_"+pm.Get("GetId");
				$('[aria-labelledby='+uempDurMn+']').attr('placeholder', 'Months');
                $('[aria-labelledby='+uempDurMn+']').focus(function() {
                    $(this).attr('placeholder', '');
                }).blur(function() {
                    $(this).attr('placeholder', 'Months');
                });

                /*created for Inline text box End*/

                $('#prev-container').on("click", function() {
                    $('.vhatotaddressdetails').toggleClass("hide-column");
                });
                ;$("#Permanentrestxt input[type='radio']").click(function() {
                    $("#Permanentrestxt input[type='radio']").removeClass('checked');
                    if ($(this).is(':checked')) {
                        $(this).addClass('checked')
                    }
                });

            }

            VHATransferEmployeeDetailsAppletPR.prototype.BindEvents = function() {
                SiebelAppFacade.VHATransferEmployeeDetailsAppletPR.superclass.BindEvents.apply(this, arguments);
                var pm = this.GetPM();
                /*created for Yes NO*/
                $('#vhapermyesbutton').off("click").on("click", function() {
                    $('#vhapermyesbutton').addClass('vhabtnredbg');
                    $('#vhapermnobutton').removeClass('vhabtnredbg');
                    pm.Get("GetBusComp").SetFieldValue("Permanent Resident", "Y");
                });
                $('#vhapermnobutton').off("click").on("click", function() {
                    $('#vhapermnobutton').addClass('vhabtnredbg');
                    $('#vhapermyesbutton').removeClass('vhabtnredbg');
                    pm.Get("GetBusComp").SetFieldValue("Permanent Resident", "N");
                });
                /*End Of created for Yes NO*/

                $("#Permreceived").off("click").on("click", function() {
                    if ($(this).is(':checked')) {
                        pm.Get("GetBusComp").SetFieldValue("Credit Check Permission Received", "Y");
                    } else
                        pm.Get("GetBusComp").SetFieldValue("Credit Check Permission Received", "N");
                });

                /*Submit Credit check validatio*/
                $('#vhacreditchecksubmitbtn').on("click", function() {
                    console.log("Submit click");
                    var sProceed = true;
                    $('.VHAToTnullerr').removeClass('VHAToTnullerr');
                    $('#Permreceivedlbl').removeClass("TOTRedFontlbl");
                    $('#vhaCCErrormsg').addClass('hide-column');
                    var empAppCtrl = pm.Get("GetControls");
                    var sProceed = true;

                    if ($("[name='" + empAppCtrl["Permission Received from customer"].GetInputName() + "']").val() == "N" || $("[name='" + empAppCtrl["Permission Received from customer"].GetInputName() + "']").val() == "") {
                        $('#Permreceivedlbl').addClass("TOTRedFontlbl");
                        sProceed = false;
                    }

                    ["Current Address in Years","Residential Status", "Confirm Employee Details"].forEach(function(item, index) {
                        if ($("[name='" + empAppCtrl[item].GetInputName() + "']").val() == "") {
                            $("[name='" + empAppCtrl[item].GetInputName() + "']").addClass("VHAToTnullerr");
                            sProceed = false;
                        }

                    });
					
					var sEmpDetails = $("[name='" + empAppCtrl["Confirm Employee Details"].GetInputName() + "']").val();					
					var sEmpStatus = $("[name='" + empAppCtrl["Employee Status"].GetInputName() + "']").val();
					if(sEmpDetails== "Other" && sEmpDetails !="Unemployed" )
					{
						if(sEmpStatus=="Student"){
						 if ($("[name='" + empAppCtrl["Current Address in Month"].GetInputName() + "']").val() == "") {
                            $("[name='" + empAppCtrl["Current Address in Month"].GetInputName() + "']").addClass("VHAToTnullerr");
                            sProceed = false;
						}}
						else{
							 if ($("[name='" + empAppCtrl["Employee Status"].GetInputName() + "']").val() == "") {
                            $("[name='" + empAppCtrl["Employee Status"].GetInputName() + "']").addClass("VHAToTnullerr");
                            sProceed = false;
						}}									
					}
								
					else if (sEmpDetails=="Self-Employed" && sEmpDetails !="Unemployed" )
					{
						 ["Campaign Code","CC Additional Info","Current Employer","Employee Status"].forEach(function(item, index) {
                        if ($("[name='" + empAppCtrl[item].GetInputName() + "']").val() == "") {
                            $("[name='" + empAppCtrl[item].GetInputName() + "']").addClass("VHAToTnullerr");
                            sProceed = false;
                        } });
					}
					
					else if (sEmpDetails !="Unemployed" && sEmpDetails !="Self-Employed" && sEmpDetails !="Other")
					{					
					 ["Employee Status", "Current Employee Phone","Employee Status","Employee Name","Employee Duration in Years","Employee Duration in Months"].forEach(function(item, index) {
                        if ($("[name='" + empAppCtrl[item].GetInputName() + "']").val() == "") {
                            $("[name='" + empAppCtrl[item].GetInputName() + "']").addClass("VHAToTnullerr");
                            sProceed = false;
                        } });
					}
					
					var sCurrentYears = $("[name='" + empAppCtrl["Current Address in Years"].GetInputName() + "']").val();
                    if ((isNaN(sCurrentYears) || Number(sCurrentYears) < 0 || (sCurrentYears.indexOf(".") != "-1")) && sProceed == true ) {
                        $("[name='" + empAppCtrl["Current Address in Years"].GetInputName() + "']").addClass("VHAToTnullerr");
                        alert("The years in Duration of stay in current address must be an integer 0 or greater. Please check and put in a valid value.");
                        return false;
                    }

                    var EmpYears = $("[name='" + empAppCtrl["Employee Duration in Years"].GetInputName() + "']").val();
                    if ((isNaN(EmpYears) || Number(EmpYears) < 0 || (EmpYears.indexOf(".") != "-1")) && sProceed == true && EmpYears!="" ) {
                        $("[name='" + empAppCtrl["Employee Duration in Years"].GetInputName() + "']").addClass("VHAToTnullerr");
                        alert("The years in Current employer and duration must be an integer 0 or greater. Please check and put in a valid value.");
                        return false;
                    }
                    var sCurrPhoneNo = $("[name='" + empAppCtrl["Current Employee Phone"].GetInputName() + "']").val();

                    if (sProceed == true && sCurrPhoneNo != "" && (sCurrPhoneNo.indexOf("612") != 0 && sCurrPhoneNo.indexOf("613") != 0 && sCurrPhoneNo.indexOf("614") != 0 && sCurrPhoneNo.indexOf("617") != 0 && sCurrPhoneNo.indexOf("618") != 0 && sCurrPhoneNo.indexOf("6118") != 0 && sCurrPhoneNo.indexOf("6113") != 0 && sCurrPhoneNo.indexOf("1800") != 0 && sCurrPhoneNo.indexOf("13") != 0 && sCurrPhoneNo.indexOf("04") != 0 && sCurrPhoneNo.indexOf("02") != 0)) {
                        $("[name='" + empAppCtrl["Current Employee Phone"].GetInputName() + "']").addClass("VHAToTnullerr");
                        alert("Current employer Contact# must be starting with digits 1800, 13, 02, 04, 612, 613, 614, 617, 618 , 6118 or 6113");
                        return false;
                    }

                    if (sProceed == true) {
                        pm.ExecuteMethod("InvokeMethod", "Submitcreditcheck");
                        var sCreditCheckStatus = pm.Get("GetBusComp").GetFieldValue("Credit Check Status");
                        if (sCreditCheckStatus != "New" && sCreditCheckStatus != "Failed" && sCreditCheckStatus != "WITHDRAW") {
                            $('#vhacreditchecksubmitbtn').addClass("appletButtonDis");
                            $('#vhapermyesbutton').attr('disabled', 'disabled');
                            $('#vhapermnobutton').attr('disabled', 'disabled');
                            $('#Permreceived').attr('disabled', 'disabled');
                            $('[aria-label="Search Device"]').attr('readonly', 'readonly');
                            $("#adddevice").addClass("VFDisplayNone");
                            $('.AddDevice .vhacircleplus').prop('disabled', true);
                            $('.AddDevice .vhacircleminus').prop('disabled', true);
                            $("#selectedphones #removeurl").addClass("VFDisplayNone");

                        } else {
                            $('#vhacreditchecksubmitbtn').removeClass("appletButtonDis");
                            $('#vhapermyesbutton').removeAttr('disabled', 'disabled');
                            $('#vhapermnobutton').removeAttr('disabled', 'disabled');
                            $('#Permreceived').removeAttr('disabled', 'disabled');

                        }
                        /* var Inputs = SiebelApp.S_App.NewPropertySet();
                    var Output = SiebelApp.S_App.NewPropertySet();
                    var sAcntId = pm.Get("GetBusComp").GetFieldValue("Account Id");
                    var sToTGenericId = pm.Get("GetBusComp").GetFieldValue("TOT Generic Id");
                    var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                    var Inputs = SiebelApp.S_App.NewProprtySet();
                    Inputs.SetProperty("ProcessName", "VHA TOT Submit Credit Check Trigger");
                    Inputs.SetProperty("Account Id", sAcntId);
                    Inputs.SetProperty("TOT Generic Id", sToTGenericId);
					console.log("AccountId"+  sAcntId + "sToTGenericId" + sToTGenericId );
                    var Output = ser.InvokeMethod("RunProcess", Inputs)*/
                    } else {

                        $('#vhaCCErrormsg').removeClass('hide-column');

                    }

                });
            }
			
			
			function OnFieldChange(control, value){
			
			if(control.GetName()=="Confirm Employee Details")
			{				
				if(value=="Other")
				{
					$('#Empphone').addClass("VFDisplayNone");
					$('#EmpDetails').addClass("VFDisplayNone");
				}
				else if(value=="Self-Employed")
				{
					$('#Empphone').addClass("VFDisplayNone");
					$('#EmpDetails').addClass("VFDisplayNone");
					$('#Custnfo').removeClass("VFDisplayNone");
					$('#EmployerName').removeClass("VFDisplayNone");
					
				}
				else
				{
					$('#Empphone').removeClass("VFDisplayNone");
					$('#EmpDetails').removeClass("VFDisplayNone");
					$('#Custnfo').addClass("VFDisplayNone");
					$('#EmployerName').addClass("VFDisplayNone");
					
				}
					
			}
			}
			
			
			
			
            function PostInvokeMethod(MethodName) {
                if (MethodName == "ResetCreditCheck") {
					var sResetError=SiebelApp.S_App.GetProfileAttr("TOTResetCCValidation");
					if(sResetError!="" && sResetError!=null)
					{
						alert(sResetError);
                    
					}
					else
					{					 
					$('#vhacreditchecksubmitbtn').removeClass("appletButtonDis");
                    $('#Permreceived').removeAttr('disabled', 'disabled');
                    $('#vhapermyesbutton').removeAttr('disabled', 'disabled');
                    $('#vhapermnobutton').removeAttr('disabled', 'disabled');
                    $('#Permreceived').prop('checked', false);
                    $('#VHAHpNotes').addClass("VFDisplayNone");
                    $(".searchdevice:not(:first)").remove();
                    $('.AddDevice').append('<div class="searchdevice"><span id="searchtxt"><input class="input-field" type="text" aria-label="Search Device"></span><span class="quantity"><span class="vhacircleminus"id="circleminus"><img src="images/custom/circleminus.svg"></span><span id="quantitytxt"><input class="input-field" type="text" aria-label="Quantity"></span><span class="vhacircleplus" id="circleplus"><img src="images/custom/circleplus.svg"></span></span></span><span id="selectedphones"><input class="input-field" type="text" aria-label="Selected Phones"><span class="vhabluelink ml-3" id="removeurl">Remove</span></span></div>');
                    $('[aria-label="Quantity"]:last').val("1");
                    $("#removeurl").addClass("VFDisplayNone");
                    sBindQuantChange();
					}
            }
			}
            function sBindQuantChange() {
                $(".AddDevice").on("click", ".vhacircleminus", function(e) {
                    e.stopImmediatePropagation();
                    var sQty = $(this).closest(".quantity").find("#quantitytxt input");
                    var oldValue = sQty.val();
                    if (oldValue == '') {
                        oldValue = 0;
                    }
                    if (oldValue > 1) {
                        var newVal = parseFloat(oldValue) - 1;
                        sQty.val(newVal);
                    }
                    if ($(this).closest('.searchdevice').find('[aria-label="Search Device"]').attr("IsSelectThruClick") == "Y") {
                        var Inputs = SiebelApp.S_App.NewPropertySet();

                        Inputs.SetProperty("Parent Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Id"));
                        Inputs.SetProperty("Quantity", $(this).closest(".quantity").find("#quantitytxt input").val());
                        Inputs.SetProperty("Device Name", $(this).closest('.searchdevice').find('[aria-label="Search Device"]').val());
                        VHAAppUtilities.CallWorkflow("VHA TOT Handset Upsert", Inputs, "");

                    }

                });

                $(".AddDevice").on("click", ".vhacircleplus", function(e) {
                    e.stopImmediatePropagation();
                    var sQty = $(this).closest(".quantity").find("#quantitytxt input");
                    var oldValue = sQty.val();
                    if (oldValue >= 1) {
                        var newVal = parseFloat(oldValue) + 1;
                        sQty.val(newVal);
                    }
                    if ($(this).closest('.searchdevice').find('[aria-label="Search Device"]').attr("IsSelectThruClick") == "Y") {
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        Inputs.SetProperty("Parent Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Id"));
                        Inputs.SetProperty("Quantity", $(this).closest(".quantity").find("#quantitytxt input").val());
                        Inputs.SetProperty("RecordStatus", "Y");
                        Inputs.SetProperty("Device Name", $(this).closest('.searchdevice').find('[aria-label="Search Device"]').val());
                        VHAAppUtilities.CallWorkflow("VHA TOT Handset Upsert", Inputs, "");
                    }

                });
                $('#selectedphones #removeurl').off("click").on("click", function() {
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    Inputs.SetProperty("Parent Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Id"));
                    Inputs.SetProperty("Quantity", "0");
                    Inputs.SetProperty("Device Name", $(this).closest('.searchdevice').find('[aria-label="Search Device"]').val());
                    Inputs.SetProperty("RecordStatus", "N");

                    VHAAppUtilities.CallWorkflow("VHA TOT Handset Upsert", Inputs, "");
                    $(this).closest('.searchdevice').remove();
                });
                $('[aria-label="Search Device"]').autocomplete({
                    source: function(request, response) {
                        var sRes = VHAAppUtilities.GetSiebelDataFromIO("[VF Unique Handset.Unique Make Model] = 'Y' AND [VF Unique Handset.Product Code] <> 'Non Device' AND [VF Unique Handset.Device Name] LIKE '*" + request.term + "*' AND [VF Unique Handset.Version Status] = 'Live'", "VF Intended Handset IO", "");
                        var sRsltList = [];
                        for (var i = 0; i < sRes.GetChildCount(); i++) {
                            sRsltList[i] = {
                                "value": sRes.GetChild(i).GetProperty("Device Name")
                            }
                        }
                        response(sRsltList);
                    },
                    minLength: 5,
                    change: function(event, ui) {
                        if (ui.item == null) {
                            $(this).attr("IsSelectThruClick", "N");
                        } else {
                            $(this).attr("IsSelectThruClick", "Y");
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            Inputs.SetProperty("Parent Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Id"));
                            Inputs.SetProperty("Quantity", $(this).closest('.searchdevice').find('[aria-label="Quantity"]').val());
                            Inputs.SetProperty("Device Name", $(this).val());
                            Inputs.SetProperty("RecordStatus", "Y");
                            //mSetPrflAttr("VFQASIsInbound","Y");
                            VHAAppUtilities.CallWorkflow("VHA TOT Handset Upsert", Inputs, "");
                            $(this).closest('.searchdevice').find('[aria-label="Selected Phones"]').val($(this).val());
                            $("#adddevice").removeClass("VFDisplayNone");
                            $("#removeurl").removeClass("VFDisplayNone");

                        }
                    }
                });
            }

            VHATransferEmployeeDetailsAppletPR.CreditCheckShow = function() {

                if (SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC") != null) {
                    var sPermstatus = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Permanent Resident");
                    var spermccstatus = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Credit Check Permission Received");
                    var sCreditCheckStatus = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Credit Check Status");
                    var sCcExpiryDate = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Credit Check Expiry Date");
					var sEmployeeStatus= SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Employee Status");
                    var s = new Date(sCcExpiryDate);
                    var c = new Date();
                    if (s > c && sCreditCheckStatus == "APPROVE")
                        $('#VHAHpNotes').removeClass("VFDisplayNone");
                    else
                        $('#VHAHpNotes').addClass("VFDisplayNone");

                    if (sCreditCheckStatus != "New" && sCreditCheckStatus != "Failed" && sCreditCheckStatus != "WITHDRAW") {
                        $('#vhacreditchecksubmitbtn').addClass("appletButtonDis");
                        $('#vhapermyesbutton').attr('disabled', 'disabled');
                        $('#vhapermnobutton').attr('disabled', 'disabled');
                        $('#Permreceived').attr('disabled', 'disabled');
                        $('[aria-label="Search Device"]').attr('readonly', 'readonly');
                        $("#adddevice").addClass("VFDisplayNone");
                        $('.AddDevice .vhacircleplus').prop('disabled', true);
                        $('.AddDevice .vhacircleminus').prop('disabled', true);
                        $("#selectedphones #removeurl").addClass("VFDisplayNone");
                    } else {
                        $('#vhacreditchecksubmitbtn').removeClass("appletButtonDis");
                        $('#vhapermyesbutton').removeAttr('disabled', 'disabled');
                        $('#vhapermnobutton').removeAttr('disabled', 'disabled');
                        $('#Permreceived').removeAttr('disabled', 'disabled');
                        $('[aria-label="Search Device"]').removeAttr('readonly', 'readonly');
                        $('.AddDevice .vhacircleplus').prop('disabled', false);
                        $('.AddDevice .vhacircleminus').prop('disabled', false);
                    }
									
					if(sEmployeeStatus=="Other")
					{
					$('#Empphone').addClass("VFDisplayNone");
					$('#EmpDetails').addClass("VFDisplayNone");
					}
					else if(sEmployeeStatus=="Self-Employed")
					{
					$('#Empphone').addClass("VFDisplayNone");
					$('#EmpDetails').addClass("VFDisplayNone");
					$('#Custnfo').removeClass("VFDisplayNone");
					$('#EmployerName').removeClass("VFDisplayNone");					
					}
					else
					{
					$('#Empphone').removeClass("VFDisplayNone");
					$('#EmpDetails').removeClass("VFDisplayNone");
					$('#Custnfo').addClass("VFDisplayNone");
					$('#EmployerName').addClass("VFDisplayNone");					
					}

                    if (sPermstatus == "Y") {

                        $('#vhapermyesbutton').addClass('vhabtnredbg');
                        $('#vhapermnobutton').removeClass('vhabtnredbg');
                    } else {
                        $('#vhapermnobutton').addClass('vhabtnredbg');
                        $('#vhapermyesbutton').removeClass('vhabtnredbg');
                    }
                    if (spermccstatus == "Y")
                        $('#Permreceived').prop('checked', true);
                    else
                        $('#Permreceived').prop('checked', false);
                }
            }
            VHATransferEmployeeDetailsAppletPR.CreditCheckLeave = function() {
                var OutMsg = "";
                if (SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC") != null) {
                    var sCcExpiryDate = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Credit Check Expiry Date");
                    var sCreditCheckStatus = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Credit Check Status");
                    var sCustomerType = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Customer Type");
                    var s = new Date(sCcExpiryDate);
                    var c = new Date();
                    if (sCreditCheckStatus != "Pending" && sCreditCheckStatus != "APPROVE" && sCreditCheckStatus != "CONDAPPRVE") {
                        OutMsg = "Kindly submit credit check to proceed further";
                        //return false;
                    }
                }
                return OutMsg;
            }
            return VHATransferEmployeeDetailsAppletPR;
        }());
        return "SiebelAppFacade.VHATransferEmployeeDetailsAppletPR";
    });
}
