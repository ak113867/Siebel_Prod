if (typeof VFTabletIntegration === "undefined") {
    var VFTabletIntegration = {};
    VFTabletIntegration.Success = function (ResponseData) {
        var JSONResponse = JSON.parse(ResponseData);
        if (JSONResponse["StatusCode"] == "200") {
            var Data = JSONResponse["Data"];
            var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
            console.log("Key : " + JSONResponse["Key"]);
            switch (JSONResponse["Key"]) {
                case "IMEI":
                    VFTabletIntegration.VFBarCodeScan(Data, ActiveView);
                    break;
                case "OCRScanID":
                    VFTabletIntegration.VFScanID(Data, ActiveView);
                    break;
                case "OCRPrepayScanID":
                    VFTabletIntegration.VFPrepaySuccessScanID(Data, ActiveView);
                    break;
                case "OCRPrimaryIdScan":
                    VFTabletIntegration.VFOCRPrimaryIdScan(Data, ActiveView);
                    break;
                case "OCRPrepayPrimaryIdScan":
                    VFTabletIntegration.VFOCRPrepayPrimaryIdScan(Data, ActiveView);
                    break;
                case "OCRAddressScan":
                    VFTabletIntegration.VFOCRSAddressScan(Data, ActiveView);
                    break;
                case "ContractSign":
                    VFTabletIntegration.VFGenerateContractSuccess(Data, ActiveView);
                    break;
                case "CAForm":
                    VFTabletIntegration.VFGenerateContractSuccess(Data, ActiveView);
                    break;
                case "ScanSIM":
                    VFTabletIntegration.VFScanSIM(Data, ActiveView);
                    break;
                case "UploadDoc":
                    VFTabletIntegration.VFIDUploadSuccess(Data, ActiveView);
                    break;
                case "ActivationKey":
                    VFTabletIntegration.VFBarCodeScanActivationKey(Data, ActiveView);
                    break;
                default:
            }
        }
    };
    VFTabletIntegration.Failure = function (ResponseData) {
        console.log("In VFTabletIntegration.Failure");
        var JSONResponse = JSON.parse(ResponseData);
        if (JSONResponse["StatusCode"] != "200") {
            var Data = JSONResponse["Data"];
            var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
            switch (JSONResponse["Key"]) {
                case "ContractSign":
                    VFTabletIntegration.VFGenerateContractFailure(Data, ActiveView);
                    break;
                case "UploadDoc":
                    VFTabletIntegration.VFIDUploadfailure(JSONResponse, ActiveView);
                    break;
                case "OCRScanID":
                    VFTabletIntegration.VFScanIdDetailsFailure(Data, ActiveView, JSONResponse);
                    break;
                case "OCRPrimaryIdScan":
                    VFTabletIntegration.VFScanPrimaryIdFailure(Data, ActiveView, JSONResponse);
                    break;
                case "CAForm":
                    VFTabletIntegration.VFGenerateContractFailure(Data, ActiveView);
                    break;
                case "OCRPrepayScanID":
                    VFTabletIntegration.VFPrepayFailureScanID(Data, ActiveView, JSONResponse);
                    break;
                case "OCRPrepayPrimaryIdScan":
                    VFTabletIntegration.VFOCRPrepayPrimaryIdScanFailure(Data, ActiveView, JSONResponse);
                    break;
                default:
                    JSONResponse["StatusMessage"];
            }
        }
    };
    VFTabletIntegration.VFOCRPrepayPrimaryIdScanFailure = function (Data, ActiveView, JSONResponse) {
        if (JSONResponse.StatusCode == "err_055") {
        } else {
            alert(JSONResponse.StatusMessage);
        }
    };
    VFTabletIntegration.VFScanPrimaryIdFailure = function (Data, ActiveView, JSONResponse) {
        if (JSONResponse.StatusCode == "err_055") {
        } else {
            alert(JSONResponse.StatusMessage);
        }
    };
    VFTabletIntegration.VFPrepayFailureScanID = function (Data, ActiveView, JSONResponse) {
        console.log("In Failure 2");
        var DataValue = Data[0].Value[0];
        var responseData = {
            Key: "OCRPrepayScanID",
            Data: [
                {
                    Accuracy: [],
                    Value: [
                        {
                            cardType: DataValue.cardType,
                            state: DataValue.state,
                            points: DataValue.points,
                            ProofOAddress: DataValue.ProofOAddress,
                            IsPrimary: DataValue.IsPrimary,
                            appletId: DataValue.appletId,
                            appletName: DataValue.appletName,
                            category: DataValue.category,
                            WeightingFactor: DataValue.WeightingFactor,
                        },
                    ],
                    Key: "ReturnData",
                },
            ],
            StatusCode: "200",
            StatusMessage: "Success message",
        };
        VFTabletIntegration.Success(JSON.stringify(responseData));
        alert(JSONResponse.StatusMessage + ". Please continue with manual process.");
    };
    VFTabletIntegration.VFScanIdDetailsFailure = function (Data, ActiveView, JSONResponse) {
        var DataValue = Data[0].Value[0];
        var responseData = {
            Key: "OCRScanID",
            Data: [
                {
                    Accuracy: [],
                    Value: [
                        {
                            cardType: DataValue.cardType,
                            state: DataValue.state,
                            points: DataValue.points,
                            ProofOAddress: DataValue.ProofOAddress,
                            IsPrimary: DataValue.IsPrimary,
                            appletId: DataValue.appletId,
                            appletName: DataValue.appletName,
                        },
                    ],
                    Key: "ReturnData",
                },
            ],
            StatusCode: "200",
            StatusMessage: "Success message",
        };
        VFTabletIntegration.Success(JSON.stringify(responseData));
        alert(JSONResponse.StatusMessage + ". Please continue with manual process.");
    };
    VFTabletIntegration.VFIDUploadfailure = function (Data, ActiveView) {
        if (ActiveView == "VF SPS ID Capture Postpay View" || ActiveView == "VF SPS Existing ID Capture Postpay View") {
            if (Data["StatusCode"] == "err_086") {
                SiebelApp.EventManager.fireEvent("VFSPSIDUploadfailureNoUpload");
            } else {
                SiebelApp.EventManager.fireEvent("VFSPSIDUploadfailure");
            }
        }
    };
    VFTabletIntegration.VFIDUploadSuccess = function (Data, ActiveView) {
        if (ActiveView == "VF SPS ID Capture Postpay View" || ActiveView == "VF SPS Existing ID Capture Postpay View") {
            SiebelApp.EventManager.fireEvent("VFSPSIDUploadSuccess");
        }
    };
    VFTabletIntegration.VFBarCodeScan = function (Data, ActiveView) {
        if (ActiveView == "VF SPS SelectCustomize View" || ActiveView == "VF SPS PreToPost SelectCustomize View") {
            $(".VFSPSSleCusChooseDeviceInStockValue").val(Data.Value);
        } else {
            if (ActiveView == "VF SPS Prepaid Create Order View - TBUI") {
                $(".VFSPSCreOrderChooseDeviceInStockValue").val(Data.Value);
            }
        }
    };
    VFTabletIntegration.VFPrepaySuccessScanID = function (Data, ActiveView) {
        var BO = SiebelApp.S_App.GetActiveBusObj();
        var IDCaptureTBC;
        var Input = SiebelApp.S_App.NewPropertySet();
        var Output = SiebelApp.S_App.NewPropertySet();
        Input.SetProperty("ScanType", "OCRPrepayScanID");
        var SelectedCardType = VFTabletIntegrationConstants.GetConstants("VFSPSCardType");
        var retval = VFSPSPrepayIDCaptureInterface.VFSPSCheckIDTypeExist(SelectedCardType);
        if (retval == false) {
            IDCaptureTBC = VFTabletIntegrationConstants.GetConstants("VFSPSIDCaptureTBC");
        } else {
            IDCaptureTBC = retval;
        }
        Input.SetProperty("IDCaptureTBC", IDCaptureTBC);
        for (var i = 0; i < Data.length; i++) {
            switch (Data[i].Key) {
                case "ReferenceNumber":
                    Input.SetProperty("Id Reference Number", Data[i].Value);
                    break;
                case "ExpiryDate":
                    Input.SetProperty("Expiry Date", VFCustomSiebelInterface.VFSPSConvertDateFormat(Data[i].Value));
                    break;
                case "CountryOfIssue":
                    Input.SetProperty("Country Of Issue", Data[i].Value);
                    break;
                case "ReturnData":
                    var ReturnValue = Data[i].Value;
                    Input.SetProperty("VF Points Postpay", ReturnValue[0]["WeightingFactor"]);
                    Input.SetProperty("State of Issue", ReturnValue[0]["state"]);
                    Input.SetProperty("ID type", ReturnValue[0]["cardType"]);
                    Input.SetProperty("VF Primary", ReturnValue[0]["IsPrimary"]);
                    Input.SetProperty("VF Proof of Address", ReturnValue[0]["ProofOAddress"]);
                    Input.SetProperty("VF SPS List", ReturnValue[0]["category"]);
                    break;
            }
        }
        Output = VFCustomSiebelInterface.CallBS("VF SPS IDCaputre BS", "PrepayIDDetailsCapture", Input, {});
        if (retval == false) {
            VFSPSPrepayIDCaptureInterface.VFSPSProgressBarStatus();
            $("#s_" + ReturnValue[0]["appletId"] + "_div #VFSPIDTypeHeader").html(ReturnValue[0]["cardType"]);
            VFSPSPrepayIDCaptureInterface.VFSPSToggleIDFields(ReturnValue[0]["appletName"], ReturnValue[0]["cardType"], ReturnValue[0]["appletId"]);
        }
    };
    VFTabletIntegration.VFOCRPrepayPrimaryIdScan = function (Data, ActiveView) {
        if (ActiveView == "VF SPS Prepay Customer and Address info View - TBUI") {
            var Input = SiebelApp.S_App.NewPropertySet();
            var Output = SiebelApp.S_App.NewPropertySet();
            Input.SetProperty("ScanType", "OCRPrimaryIdScan");
            var SelectedCardType = VFTabletIntegrationConstants.GetConstants("VFSPSCardType");
            var IDCaptureTBC = VFCustomSiebelInterface.VFSPSPrepayCheckIDTypeExist(SelectedCardType);
            if (IDCaptureTBC != false) {
                Input.SetProperty("IDCaptureTBC", IDCaptureTBC);
                var ChangeOfAddress = false;
                var Address1 = "";
                var Address = "";
                for (var i = 0; i < Data.length; i++) {
                    switch (Data[i].Key) {
                        case "ReferenceNumber":
                            Input.SetProperty("Id Reference Number", Data[i].Value);
                            break;
                        case "ExpiryDate":
                            Input.SetProperty("Expiry Date", VFCustomSiebelInterface.VFSPSConvertDateFormat(Data[i].Value));
                            break;
                        case "CountryOfIssue":
                            Input.SetProperty("Country Of Issue", Data[i].Value);
                            break;
                        case "FirstName":
                            Input.SetProperty("First Name", Data[i].Value);
                            break;
                        case "LastName":
                            Input.SetProperty("Last Name", Data[i].Value);
                            break;
                        case "DOB":
                            Input.SetProperty("Date of Birth", VFCustomSiebelInterface.VFSPSConvertDateFormat(Data[i].Value));
                            break;
                        case "MiddleName":
                            Input.SetProperty("Middle Name", Data[i].Value);
                            break;
                        case "Title":
                            break;
                        case "Address":
                            Address = Data[i].Value;
                            break;
                        case "Address1":
                            Address1 = Data[i].Value;
                            break;
                        case "ChangeOfAddress":
                            if (Data[i].Value.toUpperCase == "TRUE") {
                                ChangeOfAddress = true;
                            }
                            break;
                        case "ReturnData":
                            var ReturnValue = Data[i].Value;
                            Input.SetProperty("VF Points Postpay", ReturnValue[0]["points"]);
                            Input.SetProperty("State of Issue", ReturnValue[0]["state"]);
                            Input.SetProperty("ID type", ReturnValue[0]["cardType"]);
                            Input.SetProperty("VF Primary", ReturnValue[0]["IsPrimary"]);
                            Input.SetProperty("VF Proof of Address", ReturnValue[0]["ProofOAddress"]);
                            Input.SetProperty("VF SPS List", ReturnValue[0]["category"]);
                            break;
                    }
                }
                if (ChangeOfAddress) {
                    Input.SetProperty("WSDL Address", Address1);
                } else {
                    Input.SetProperty("WSDL Address", Address);
                }
                Output = VFCustomSiebelInterface.CallBS("VF SPS IDCaputre BS", "PrepayIDDetailsCapture", Input, {});
                if (ActiveView == "VF SPS Prepay Customer and Address info View - TBUI") {
					var app = SiebelApp.S_App.GetActiveView().GetApplet("VF SPS New Account Contact PrePay Applet - TBUI");
					var pm = app.GetPModel();
					var uAddress = "Address_Label_"+pm.Get("GetId");
                    $(".VFSSPSAddressvalidationicon").remove();
                    $('[aria-labelledby='+uAddress+']').focus().autocomplete("search");
                }
            }
        }
    };
    VFTabletIntegration.VFScanID = function (Data, ActiveView) {
        if (ActiveView == "VF SPS ID Capture Postpay View" || ActiveView == "VF SPS Existing ID Capture Postpay View") {
            var BO = SiebelApp.S_App.GetActiveBusObj();
            var IDCaptureTBC;
            var Input = SiebelApp.S_App.NewPropertySet();
            var Output = SiebelApp.S_App.NewPropertySet();
            Input.SetProperty("ScanType", "OCRScanID");
            var SelectedCardType = VFTabletIntegrationConstants.GetConstants("VFSPSCardType");
            var retval = VFSPSIDCaptureInterface.VFSPSCheckIDTypeExist(SelectedCardType);
            if (retval == false) {
                IDCaptureTBC = VFTabletIntegrationConstants.GetConstants("VFSPSIDCaptureTBC");
            } else {
                IDCaptureTBC = retval;
            }
            Input.SetProperty("IDCaptureTBC", IDCaptureTBC);
            for (var i = 0; i < Data.length; i++) {
                switch (Data[i].Key) {
                    case "ReferenceNumber":
                        Input.SetProperty("Id Reference Number", Data[i].Value);
                        break;
                    case "ExpiryDate":
                        Input.SetProperty("Expiry Date", VFCustomSiebelInterface.VFSPSConvertDateFormat(Data[i].Value));
                        break;
                    case "CountryOfIssue":
                        Input.SetProperty("Country Of Issue", Data[i].Value);
                        break;
                    case "ReturnData":
                        var ReturnValue = Data[i].Value;
                        Input.SetProperty("VF Points Postpay", ReturnValue[0]["points"]);
                        Input.SetProperty("State of Issue", ReturnValue[0]["state"]);
                        Input.SetProperty("ID type", ReturnValue[0]["cardType"]);
                        Input.SetProperty("VF Primary", ReturnValue[0]["IsPrimary"]);
                        Input.SetProperty("VF Proof of Address", ReturnValue[0]["ProofOAddress"]);
                        break;
                }
            }
            Output = VFCustomSiebelInterface.CallBS("VF SPS IDCaputre BS", "IDDetailsCapture", Input, {});
            if (retval == false) {
                VFSPSIDPointsCalc(ReturnValue[0]["points"]);
                $("#s_" + ReturnValue[0]["appletId"] + "_div #VFSPIDTypeHeader").html(ReturnValue[0]["cardType"]);
                VFSPSIDCaptureInterface.VFSPSToggleIDFields(ReturnValue[0]["appletName"], ReturnValue[0]["cardType"], ReturnValue[0]["appletId"]);
            }
        }
    };
    VFTabletIntegration.VFOCRPrimaryIdScan = function (Data, ActiveView) {
        if (ActiveView == "VF Capture Customer Details Postpay Mobile View" || ActiveView == "VF SPS Existing Capture Customer Details Postpay Mobile View") {
            var Input = SiebelApp.S_App.NewPropertySet();
            var Output = SiebelApp.S_App.NewPropertySet();
            Input.SetProperty("ScanType", "OCRPrimaryIdScan");
            var SelectedCardType = VFTabletIntegrationConstants.GetConstants("VFSPSCardType");
            var IDCaptureTBC = VFCustomSiebelInterface.VFSPSCheckIDTypeExist(SelectedCardType);
            if (IDCaptureTBC != false) {
                Input.SetProperty("IDCaptureTBC", IDCaptureTBC);
                var ChangeOfAddress = false;
                var Address1 = "";
                var Address = "";
                for (var i = 0; i < Data.length; i++) {
                    switch (Data[i].Key) {
                        case "ReferenceNumber":
                            Input.SetProperty("Id Reference Number", Data[i].Value);
                            break;
                        case "ExpiryDate":
                            Input.SetProperty("Expiry Date", VFCustomSiebelInterface.VFSPSConvertDateFormat(Data[i].Value));
                            break;
                        case "CountryOfIssue":
                            Input.SetProperty("Country Of Issue", Data[i].Value);
                            break;
                        case "FirstName":
                            Input.SetProperty("First Name", Data[i].Value);
                            break;
                        case "LastName":
                            Input.SetProperty("Last Name", Data[i].Value);
                            break;
                        case "DOB":
                            Input.SetProperty("Date of Birth", VFCustomSiebelInterface.VFSPSConvertDateFormat(Data[i].Value));
                            break;
                        case "MiddleName":
                            Input.SetProperty("Middle Name", Data[i].Value);
                            break;
                        case "Title":
                            break;
                        case "Address":
                            Address = Data[i].Value;
                            break;
                        case "Address1":
                            Address1 = Data[i].Value;
                            break;
                        case "ChangeOfAddress":
                            if (Data[i].Value.toUpperCase == "TRUE") {
                                ChangeOfAddress = true;
                            }
                            break;
                        case "ReturnData":
                            var ReturnValue = Data[i].Value;
                            Input.SetProperty("VF Points Postpay", ReturnValue[0]["points"]);
                            Input.SetProperty("State of Issue", ReturnValue[0]["state"]);
                            Input.SetProperty("ID type", ReturnValue[0]["cardType"]);
                            Input.SetProperty("VF Primary", ReturnValue[0]["IsPrimary"]);
                            Input.SetProperty("VF Proof of Address", ReturnValue[0]["ProofOAddress"]);
                            break;
                    }
                }
                if (ChangeOfAddress) {
                    Input.SetProperty("WSDL Address", Address1);
                } else {
                    Input.SetProperty("WSDL Address", Address);
                }
                Output = VFCustomSiebelInterface.CallBS("VF SPS IDCaputre BS", "IDDetailsCapture", Input, {});
                if (ActiveView == "VF Capture Customer Details Postpay Mobile View") {
					var app = SiebelApp.S_App.GetActiveView().GetApplet("VF SPS Capture Customer Details Toggle Form Applet Mobile Person");
					var pm = app.GetPModel();
					var uWSDLAddress = "WSDL_Address_Label_"+pm.Get("GetId");
                    $(".VFSSPSAddressvalidationicon").remove();
                    $('[aria-labelledby='+uWSDLAddress+']').focus().autocomplete("search");
                }
            }
        }
    };
    VFTabletIntegration.VFOCRSddressScan = function (Data, ActiveView) {};
    VFTabletIntegration.VFGenerateContractFailure = function (Data, ActiveView) {
        if (ActiveView == "VF SPS Order Summary View") {
            var app = SiebelApp.S_App.GetActiveView().GetApplet("VF SPS Order Line Item List Applet");
            var pm = app.GetPModel();
            var pr = pm.GetRenderer();
            pr.SetData("ResponseData", Data);
            SiebelApp.EventManager.fireEvent("VFSPSGenerateContractFailure");
        } else {
            if (ActiveView == "VF SPS Prepay Order Summary View") {
                var app = SiebelApp.S_App.GetActiveView().GetApplet("VF SPS Prepay Order Summary Applet");
                var pm = app.GetPModel();
                var pr = pm.GetRenderer();
                pr.SetData("ResponseData", Data);
                SiebelApp.EventManager.fireEvent("VFSPSGenerateCAFormFailure");
            }
        }
    };
    VFTabletIntegration.VFGenerateContractSuccess = function (Data, ActiveView) {
        if (ActiveView == "VF SPS Order Summary View") {
            var app = SiebelApp.S_App.GetActiveView().GetApplet("VF SPS Order Line Item List Applet");
            var pm = app.GetPModel();
            var pr = pm.GetRenderer();
            pr.SetData("ResponseData", Data);
            SiebelApp.EventManager.fireEvent("VFSPSGenerateContractSuccess");
        } else {
            if (ActiveView == "VF SPS Prepay Order Summary View") {
                var app = SiebelApp.S_App.GetActiveView().GetApplet("VF SPS Prepay Order Summary Applet");
                var pm = app.GetPModel();
                var pr = pm.GetRenderer();
                pr.SetData("ResponseData", Data);
                SiebelApp.EventManager.fireEvent("VFSPSGenerateCAFormSuccess");
            }
        }
    };
    VFTabletIntegration.VFScanSIM = function (Data, ActiveView) {
        if (ActiveView == "VF SPS SelectCustomize View") {
            $(".VFSPSSleCusChooseSIMValue").val(Data.Value);
        }
    };
    VFTabletIntegration.VFBarCodeScanActivationKey = function (Data, ActiveView) {
        if (ActiveView == "VF SPS Business Service Type View" || ActiveView == "VF SPS Consumer Service Type View" || ActiveView == "VF SPS Choose Service view") {
            $(".VFSPSChooseFlowActivationInput").val(Data.Value);
        }
    };
    function VFSPSIDPointsCalc() {
        SiebelBusObj = SiebelApp.S_App.GetActiveBusObj();
        IDPoints = 0;
        for (i = 1; i <= 4; i++) {
            SiebelBusComp = SiebelBusObj.GetBusCompByName("VFSPSIDDetailsTBC" + i);
            IDPoints = IDPoints + SiebelBusComp.GetFieldValue("VF Points Postpay") * 1;
        }
        var totalpoints = 100;
        var pointsleft = totalpoints - IDPoints;
        if (pointsleft >= 0 && pointsleft <= 100) {
            $("#VFSPSPointsLeft").text(pointsleft + " points left");
        } else {
            IDPoints = 100;
        }
        switch (IDPoints) {
            case 100:
                width = "100%";
                $("#VFSPSPointsLeft").text("You have 100 points of ID!");
                $("#VFSPSTotalProgress").removeClass().addClass("VFSPSIDFullPoints");
                break;
            case 0:
                width = 0;
                $("#VFSPSTotalProgress").removeClass().addClass("VFSPSIDZeroPoints");
                break;
            default:
                var nextVal = Math.floor(IDPoints / 10) * 10;
                $("#VFSPSTotalProgress")
                    .removeClass()
                    .addClass("VFSPSIDPoints" + nextVal);
                break;
        }
    }
}
