if (typeof (SiebelAppFacade.VHATransferSelectDeviceCreditCheckAppletPR) === "undefined") {
	SiebelJS.Namespace("SiebelAppFacade.VHATransferSelectDeviceCreditCheckAppletPR");
	define("siebel/custom/VHATransferSelectDeviceCreditCheckAppletPR", ["order!siebel/phyrenderer"], function () {
		SiebelAppFacade.VHATransferSelectDeviceCreditCheckAppletPR = (function () {
			function VHATransferSelectDeviceCreditCheckAppletPR(pm) {
				SiebelAppFacade.VHATransferSelectDeviceCreditCheckAppletPR.superclass.constructor.call(this, pm);
			}
			SiebelJS.Extend(VHATransferSelectDeviceCreditCheckAppletPR, SiebelAppFacade.PhysicalRenderer);
			/*---------- Custom Code Goes Here ------------*/
			VHATransferSelectDeviceCreditCheckAppletPR.prototype.Init = function () {
				SiebelAppFacade.VHATransferSelectDeviceCreditCheckAppletPR.superclass.Init.apply(this, arguments);
				this.GetPM().AddMethod("mBindEvnts", sBindQuantChange, {
					sequence: false,
					scope: this
				});
			}
			VHATransferSelectDeviceCreditCheckAppletPR.prototype.ShowUI = function () {
				SiebelAppFacade.VHATransferSelectDeviceCreditCheckAppletPR.superclass.ShowUI.call(this);
				
			}
			VHATransferSelectDeviceCreditCheckAppletPR.prototype.BindData = function (bRefresh) {

				SiebelAppFacade.VHATransferSelectDeviceCreditCheckAppletPR.superclass.BindData.apply(this, arguments);


			}
			VHATransferSelectDeviceCreditCheckAppletPR.prototype.BindEvents = function () {
				SiebelAppFacade.VHATransferSelectDeviceCreditCheckAppletPR.superclass.BindEvents.apply(this, arguments);
				 //var pm = this.GetPM();   	

			
				sBindQuantChange();
				$('#adddevice').on("click", function () {
					mAddNewRecord();
					$('[aria-label="Quantity"]:last').val("1");
					$("#adddevice").addClass("VFDisplayNone");
				});

			}

			function sBindQuantChange() {
				$(".AddDevice").on("click",".vhacircleminus",function (e) {
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

				$(".AddDevice").on("click",".vhacircleplus",function (e) {
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
				$('#selectedphones #removeurl').off("click").on("click", function () {
					var Inputs = SiebelApp.S_App.NewPropertySet();
					Inputs.SetProperty("Parent Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Id"));
					Inputs.SetProperty("Quantity", "0");
					Inputs.SetProperty("Device Name", $(this).closest('.searchdevice').find('[aria-label="Search Device"]').val());
					Inputs.SetProperty("RecordStatus", "N");

					VHAAppUtilities.CallWorkflow("VHA TOT Handset Upsert", Inputs, "");
					$(this).closest('.searchdevice').remove();
					if($('.AddDevice').find('.searchdevice').length==1)
					mAddNewRecord();
					$('[aria-label="Quantity"]:last').val("1");
				});
				$('[aria-label="Search Device"]').autocomplete({
					source: function (request, response) {
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
					change: function (event, ui) {
						if (ui.item == null) {
							$(this).attr("IsSelectThruClick", "N");
						} else {
							$(this).attr("IsSelectThruClick", "Y");
							var Inputs = SiebelApp.S_App.NewPropertySet();
							Inputs.SetProperty("Parent Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Id"));
							Inputs.SetProperty("Quantity", $(this).closest('.searchdevice').find('[aria-label="Quantity"]').val());
							Inputs.SetProperty("Device Name", $(this).val());
							Inputs.SetProperty("RecordStatus", "Y");
							VHAAppUtilities.CallWorkflow("VHA TOT Handset Upsert", Inputs, "");
							$(this).closest('.searchdevice').find('[aria-label="Selected Phones"]').val($(this).val());
							//$('[aria-label="Search Device"]').val("")
							$("#adddevice").removeClass("VFDisplayNone");
							$("#removeurl").removeClass("VFDisplayNone");
						}
					}
				});
			}

			function mAddNewRecord() {
				$('.AddDevice').append('<div class="searchdevice"><span id="searchtxt"><input class="input-field" type="text" aria-label="Search Device"></span><span class="quantity"><span class="vhacircleminus" id="circleminus"><img src="images/custom/circleminus.svg"></span><span id="quantitytxt"><input class="input-field" type="text" aria-label="Quantity"></span><span class="vhacircleplus" id="circleplus"><img src="images/custom/circleplus.svg"></span></span><span id="selectedphones"><input class="input-field" type="text" aria-label="Selected Phones"><span class="vhabluelink ml-3" id="removeurl">Remove</span></span></div>');
				sBindQuantChange();
			}

			function mAddNewRecordWithVal(searchdev, qnt) {
				if (searchdev != "") {
					$('.AddDevice').append('<div class="searchdevice"><span id="searchtxt"><input class="input-field" type="text" aria-label="Search Device"></span><span class="quantity"><span class="vhacircleminus" id="circleminus"><img src="images/custom/circleminus.svg"></span><span id="quantitytxt"><input class="input-field" type="text" aria-label="Quantity"></span><span class="vhacircleplus" id="circleplus"><img src="images/custom/circleplus.svg"></span></span><span id="selectedphones"><input class="input-field" type="text" aria-label="Selected Phones"><span class="vhabluelink ml-3" id="removeurl">Remove</span></span></div>');
					sBindQuantChange();
					$('[aria-label="Quantity"]:last').val(qnt);
					$('[aria-label="Search Device"]:last').val(searchdev).attr("IsSelectThruClick", "Y");
					$('[aria-label="Selected Phones"]:last').val(searchdev);
				}

			}
			VHATransferSelectDeviceCreditCheckAppletPR.LoadDevice = function () {
				if($('.AddDevice').find('.searchdevice').length==1){//To avoid adding again on previous - next
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				Inputs.SetProperty("Service Name", "EAI Siebel Adapter");
				Inputs.SetProperty("Method Name", "Query");
				var busObj = SiebelApp.S_App.GetActiveBusObj();
				var busComp = busObj.GetBusCompByName("VHA TOT Credit Check BC");
				var sActId = busComp.GetFieldValue("Account Id");
				var sToTGenId = busComp.GetFieldValue("TOT Generic Id");
				Inputs.SetProperty("SearchSpec", "[VHA TOT Credit Check BC.Account Id] = '" + sActId + "' AND [VHA TOT Credit Check BC.TOT Generic Id] = '" + sToTGenId + "'");
				Inputs.SetProperty("OutputIntObjectName", "VHA TOT Credit Check IO");
				var out = ser.InvokeMethod("Run Process", Inputs);
				var resultset = out.GetChildByType("ResultSet");
				var SiebMessage = resultset.GetChildByType("SiebelMessage");
				var resultArr = VHAAppUtilities.SiebelMessageToArray(SiebMessage.childArray[0].childArray[0].childArray[0]);
				console.log("Res Array");
				console.log(resultArr);
				if ( resultArr == false || resultArr.length == 0) {
					$('.AddDevice').append('<div class="searchdevice"><span id="searchtxt"><input class="input-field" type="text" aria-label="Search Device"></span><span class="quantity"><span class="vhacircleminus" id="circleminus"><img src="images/custom/circleminus.svg"></span><span id="quantitytxt"><input class="input-field" type="text" aria-label="Quantity"></span><span class="vhacircleplus" id="circleplus"><img src="images/custom/circleplus.svg"></span></span></span><span id="selectedphones"><input class="input-field" type="text" aria-label="Selected Phones"><span class="vhabluelink ml-3" id="removeurl">Remove</span></span></div>');
					
					
					$("#adddevice").addClass("VFDisplayNone");
					$("#removeurl").addClass("VFDisplayNone");
					
					$(".AddDevice").on("click",".vhacircleminus",function (e) {
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

				$(".AddDevice").on("click",".vhacircleplus",function (e) {
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
					$('#selectedphones #removeurl').off("click").on("click", function () {
						var Inputs = SiebelApp.S_App.NewPropertySet();
						Inputs.SetProperty("Parent Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Id"));
						Inputs.SetProperty("Quantity", "0");
						Inputs.SetProperty("Device Name", $(this).closest('.searchdevice').find('[aria-label="Search Device"]').val());
						Inputs.SetProperty("RecordStatus", "N");

						VHAAppUtilities.CallWorkflow("VHA TOT Handset Upsert", Inputs, "");
						$(this).closest('.searchdevice').remove();
						if($('.AddDevice').find('.searchdevice').length==1)
						mAddNewRecord();
						$('[aria-label="Quantity"]:last').val("1");
					});
					$('[aria-label="Search Device"]').autocomplete({
						source: function (request, response) {
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
						change: function (event, ui) {
							if (ui.item == null) {
								$(this).attr("IsSelectThruClick", "N");
							} else {
								$(this).attr("IsSelectThruClick", "Y");
								var Inputs = SiebelApp.S_App.NewPropertySet();
								Inputs.SetProperty("Parent Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Id"));
								Inputs.SetProperty("Quantity", $(this).closest('.searchdevice').find('[aria-label="Quantity"]').val());
								Inputs.SetProperty("Device Name", $(this).val());
								Inputs.SetProperty("RecordStatus", "Y");
								VHAAppUtilities.CallWorkflow("VHA TOT Handset Upsert", Inputs, "");
								$(this).closest('.searchdevice').find('[aria-label="Selected Phones"]').val($(this).val());
								$("#adddevice").removeClass("VFDisplayNone");
								$("#removeurl").removeClass("VFDisplayNone");
			
							}
						}
					});
					$('[aria-label="Quantity"]').val("1");
					if (resultArr.length == 1)
						$('[aria-label="Search Device"]').attr("ToUpdateInSpecificRow", "Y");
				} else {
					resultArr.forEach(function (item, index) {
						var searchdev = item["Selected Device"];
						var qnt = item["Quantity"];
						if (searchdev != "") {
							$('.AddDevice').append('<div class="searchdevice"><span id="searchtxt"><input class="input-field" type="text" aria-label="Search Device"></span><span class="quantity"><span class="vhacircleminus" id="circleminus"><img src="images/custom/circleminus.svg"></span><span id="quantitytxt"><input class="input-field" type="text" aria-label="Quantity"></span><span class="vhacircleplus" id="circleplus"><img src="images/custom/circleplus.svg"></span></span><span id="selectedphones"><input class="input-field" type="text" aria-label="Selected Phones"><span class="vhabluelink ml-3" id="removeurl">Remove</span></span></div>');
							$(".AddDevice").on("click",".vhacircleminus",function (e) {
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

							$(".AddDevice").on("click",".vhacircleplus",function (e) {
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
							$('#selectedphones #removeurl').off("click").on("click", function () {
								var Inputs = SiebelApp.S_App.NewPropertySet();
								Inputs.SetProperty("Parent Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Id"));
								Inputs.SetProperty("Quantity", "0");
								Inputs.SetProperty("Device Name", $(this).closest('.searchdevice').find('[aria-label="Search Device"]').val());
								Inputs.SetProperty("RecordStatus", "N");

								VHAAppUtilities.CallWorkflow("VHA TOT Handset Upsert", Inputs, "");
								$(this).closest('.searchdevice').remove();
								if($('.AddDevice').find('.searchdevice').length==1)
								mAddNewRecord();
								$('[aria-label="Quantity"]:last').val("1");
							});
							$('[aria-label="Search Device"]').autocomplete({
								source: function (request, response) {
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
								change: function (event, ui) {
									if (ui.item == null) {
										$(this).attr("IsSelectThruClick", "N");
									} else {
										$(this).attr("IsSelectThruClick", "Y");
										var Inputs = SiebelApp.S_App.NewPropertySet();
										Inputs.SetProperty("Parent Id", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA TOT Credit Check BC").GetFieldValue("Id"));
										Inputs.SetProperty("Quantity", $(this).closest('.searchdevice').find('[aria-label="Quantity"]').val());
										Inputs.SetProperty("Device Name", $(this).val());
										Inputs.SetProperty("RecordStatus", "Y");
										VHAAppUtilities.CallWorkflow("VHA TOT Handset Upsert", Inputs, "");
										$(this).closest('.searchdevice').find('[aria-label="Selected Phones"]').val($(this).val());
										$("#adddevice").removeClass("VFDisplayNone");
										$("#removeurl").removeClass("VFDisplayNone");

									}
								}
							});
							$('[aria-label="Quantity"]:last').val(qnt);
							$('[aria-label="Search Device"]:last').val(searchdev).attr("IsSelectThruClick", "Y");
							$('[aria-label="Selected Phones"]:last').val(searchdev);
						}
					});
				}
			}
			}
			return VHATransferSelectDeviceCreditCheckAppletPR;
		}());
		return "SiebelAppFacade.VHATransferSelectDeviceCreditCheckAppletPR";
	});
}