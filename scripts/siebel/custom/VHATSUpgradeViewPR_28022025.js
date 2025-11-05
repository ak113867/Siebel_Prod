if (typeof SiebelAppFacade.VHATSUpgradeViewPR === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHATSUpgradeViewPR");
    var tsintitialData = "";
    define("siebel/custom/VHATSUpgradeViewPR", ["siebel/viewpr", "siebel/custom/VHAAppUtilities", "siebel/custom/bootstrap.min", "siebel/custom/VHATSUpgradeTempalte", "siebel/custom/VHABTProcessCall"], function () {
        SiebelAppFacade.VHATSUpgradeViewPR = function () {
			var sOrderRef;
            var Pegafilteredarray;
			var Pega_sel_PlanSAMID;
			var pegaoffDataGlob = "";
			var pegaflag = "N";
			var selectedplanTxt = "";
			var pm = "";
            var app = "";
            var viewPM = "";
            var RRPshow;
            var regignShow;
            var upateShow;
            var GroupId = "";
            var shareType = "";
            var AccessoryDelete = "";
            var AccessoryDelete1 = "";
            var Deletedevice = "";
            var devicecount = 0;
            var plancount = 0;
            var secdevice = 0;
            var accssorycount = 0;
            var sname;
            var withoutResolutionRrp;
            var withoutResolutionResign;
            var withoutResolutionUpgarde;
            var appMap = "";
            var appletMap;
            var authAppCtrl = "";
            var PayCorpURL = "";
            var dealerFlag = "";
            var currentGPPCnt = 0;
            var maxGPPCnt = 0;
			var tokenBCId ="";
			var authTokenBT="";
			var TerminateValueCart=0;
			var selBrand = "";//Ravindra: 14/02/2024: Added for FEB PKE
            var sBrandList = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_TS_DEVICEPREFERENCE' AND [List Of Values.Name]='DEVICE_PREFERENCE'", {
                "All": "Y"
            });
            var tsBrand = sBrandList[0].Description.split(",");
            var tsPayterm = [{
                    "Name": "1 Month",
                    "Class": "btn vhappbtn vhats-d-term",
                    "Id": "vhatofwaplan",
                    "term": "1"
                }, {
                    "Name": "12 Months",
                    "Class": "btn vhappbtn vhats-d-term",
                    "Id": "vhatothsplan",
                    "term": "12"
                }, {
                    "Name": "24 Months",
                    "Class": "btn vhappbtn vhats-d-term",
                    "Id": "vhatotmbbplan",
                    "term": "24"
                }, {
                    "Name": "36 Months",
                    "Class": "btn vhappbtn vhats-d-term",
                    "Id": "vhatotcapplan",
                    "term": "36"
                }
            ];
            var tsPlantype = [{
                    "Name": "Recommendations",
                    "SiebelName": "Recommendations",
                    "Class": "btn vhappbtn vhatsplantype",
                    "Id": "vhatsRecommendplan"
                },{
                    "Name": "Red Plus",
                    "SiebelName": "Red Plus",
                    "Class": "btn vhappbtn vhatsplantype",
                    "Id": "vhatsredplusplan"
                }, {
                    "Name": "Red",
                    "SiebelName": "Red",
                    "Class": "btn vhappbtn vhatsplantype",
                    "Id": "vhatsredplan"
                }, {
                    "Name": "Cap",
                    "SiebelName": "Vodafone Caps",
                    "Class": "btn vhappbtn vhatsplantype",
                    "Id": "vhatscapplan"
                }, {
                    "Name": "Member Proposition",
                    "SiebelName": "Member Proposition",
                    "Class": "btn vhappbtn vhatsplantype",
                    "Id": "vhatsmpplan"
                }, {
                    "Name": "Other",
                    "SiebelName": "Other",
                    "Class": "btn vhappbtn vhatsplantype",
                    "Id": "vhatsothersplan"
                }
            ];
            var d;
            var orderNum = "";
            var sSessionId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Id");
            var sValueBand = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Value Band");
            var priDeviceProdCd = "";
            var priDeviceName = "";
            var priPlanCd = "";
            var sharingindicator = "";
            var filterBrand = "Apple";
            var sSecDvcId = 1;
            var result = [];
            var filteredrslt = [];
            var devicesresponse = [];
            var filtereddevicesresponse = [];
            var secondaryresponse = [];
            var accessoryresult = [];
            var filteredModel = [];
            var sRsnBasedplnresp = [];
			var nestedData = []; 
            var uniqueCat = [];
            var uniqueModel = [];
            var accessoryresponse = "";
            var filteredaccessoryresult = [];
            var sfilterSecBrand = "";
            var sUserOptn = "Upgrade";
            var sOfferTyp = "";
            var sSpid = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_SAM_ID' AND [List Of Values.Name]='SPID' AND [List Of Values.Active]='Y'", {
                "All": "true"
            })[0].Value;
            var d = new Date;
            var sCurrDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            var addOnData = {};
            var addOnLoaded = false;
            var dealerRowId = "";
            var resumeJSON = [];
            var sPropSamId = "";
            var sSimOnlyUpg = "N";
            var insurancePick = {};
            if (window.location.href.indexOf("partnerportal") > -1) {
                var sESEndPoint = window.location.href.substr(8, window.location.href.indexOf("/siebel/app/retail/enu?") - 8) + "/config";
				//var sESEndPoint = "siebel-crr-care.vodafone.com.au" + "/config";
            } else {
                var sESEndPoint = window.location.host + "/config";
				//var sESEndPoint = "siebel-crr-care.vodafone.com.au" + "/config";
				
            }
            var sGST = 1.1;
            var sExtPlanPri = 0.00;
            var sNewPlanPri = 0.00;
            var sPlanType = "";
            var sCapPlan = false;
            var currentCustomerPlan = "";
            var gCustomerType = "";
            var sSessionData = "";
            var extInsurance = "";
            var sEditRCCResp = "N";
            var sRCCEligible = "N";
            var sCustomerTypeVal = "";
            var sExistingAppCount = 0;
            var sExistingSDAppCount = 0;
            var priPlanDtl = "";
            var sessionType = "";
			var localsessionType = "";
            var pausedDetails = "";
            var apilovurl = "";
            var resumeDevice = "";
            var resumeSecDevice = "";
            var resumeAccessory = "";
            var resumeConfigureService = "";
            var resumeSharing = "";
            var sUserType = "";
            var sIneligibleUpgrade = "";
            var sIneligibleResign = "";
            var sIneligibleOutright = "";
            var sIneligReasonUpgrade = "";
            var sIneligReasonResign = "";
            var sIneligReasonOutright = "";
            var sfilterSecBrand = "";
            var sfilterSecEAN = [];
            var uniqueCode = [];
            var uniqueEanCode = [];
            function VHATSUpgradeViewPR(pm) {
                SiebelAppFacade.VHATSUpgradeViewPR.superclass.constructor.apply(this, arguments);
            }
            SiebelJS.Extend(VHATSUpgradeViewPR, SiebelAppFacade.ViewPR);
            VHATSUpgradeViewPR.prototype.Init = function () {
                SiebelAppFacade.VHATSUpgradeViewPR.superclass.Init.apply(this, arguments);
				var this_t = this;
                pm = "";
                app = "";
                viewPM = "";
                RRPshow = "";
                regignShow = "";
                upateShow = "";
                GroupId = "";
                shareType = "";
                sname = "";
                withoutResolutionRrp = "";
                withoutResolutionResign = "";
                withoutResolutionUpgarde = "";
                appMap = "";
                appletMap = "";
                authAppCtrl = "";
                PayCorpURL = "";
                orderNum = "";
                sSessionId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Id");
                sValueBand = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Value Band");
                priDeviceProdCd = "";
                priDeviceName = "";
                priPlanCd = "";
                sharingindicator = "";
                filterBrand = "Apple";
                sSecDvcId = 1;
                result = [];
                filteredrslt = [];
                devicesresponse = [];
                filtereddevicesresponse = [];
                secondaryresponse = [];
                accessoryresult = [];
                sRsnBasedplnresp = [];
                uniqueCat = [];
                uniqueModel = [];
                accessoryresponse = "";
                filteredaccessoryresult = [];
                sfilterSecBrand = "";
                sUserOptn = "Upgrade";
                sOfferTyp = "";
                sSpid = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_SAM_ID' AND [List Of Values.Name]='SPID' AND [List Of Values.Active]='Y'", {
                    "All": "true"
                })[0].Value;
                d = new Date;
                sCurrDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                addOnData = {};
                addOnLoaded = false;
                dealerRowId = "";
                resumeJSON = [];
                sPropSamId = "";
                sSimOnlyUpg = "N";
                sGST = 1.1;
                sExtPlanPri = 0.00;
                sNewPlanPri = 0.00;
                extInsurance = "";
                AccessoryDelete = "";
                AccessoryDelete1 = "";
                Deletedevice = "";
                devicecount = 0;
                plancount = 0;
                secdevice = 0;
                accssorycount = 0;
                sEditRCCResp = "N";
                sRCCEligible = "N";
                sCustomerTypeVal = "";
                sExistingAppCount = 0;
                sExistingSDAppCount = 0;
                priPlanDtl = "";
                dealerFlag = "";
                resumeDevice = "";
                resumeSecDevice = "";
                resumeAccessory = "";
                resumeConfigureService = "";
                currentGPPCnt = 0;
                maxGPPCnt = 0;
                sIneligibleUpgrade = "";
                sIneligibleResign = "";
                sIneligibleOutright = "";
                sIneligReasonUpgrade = "";
                sIneligReasonResign = "";
                sIneligReasonOutright = "";
                sfilterSecEAN = [];
                uniqueCode = [];
                uniqueEanCode = [];
                sessionType = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA 3 Step Upgrade Header Applet"].GetRecordSet()[0]["Status"];
				//localsessionType = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA 3 Step Upgrade Header Applet"].GetRecordSet()[0]["Status"];
                if (sessionType == "Paused") {
                    pausedDetails = JSON.parse(SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA 3 Step Upgrade Header Applet"].GetRecordSet()[0]["JsonTSData"]);
                }
                apilovurl = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_REST_API_URL' AND [List Of Values.Active]='Y'", {
                    "All": "true"
                })[0].Description;
                if (window.location.href.indexOf("retail.vodafone") > 0) {
                    apilovurl = apilovurl.replace("care", "retail");
                } else if (window.location.href.indexOf("partnerportal") > -1) {
                    apilovurl = window.location.href.substr(0, window.location.href.indexOf("/siebel/app/retail/enu?")) + "/siebel/v1.0/service/";
                }
                sUserType = SiebelApp.S_App.GetProfileAttr("VHA User Type");
                tsintitialData = {
                    OrderHeader: {
                        GPPCharge: 0,
                        HeaderId: sSessionId,
                        ETC: "",
                        OrderNum: "",
                        OrderSubType: "Modify",
                        PropositionId: "",
                        PropositionName: "",
                        PropositionCode: "",
                        VFDealerRowId: "",
                        VFSalesChannelDescription: "",
                        VFSalesBranchDescription: "",
                        UpgradeOfferType: "Upgrade to New Plan",
                        Shared: "Y",
                        RoamingProduct: "$5 Roaming",
                        TenureOverride: "",
                        LatestDeviceTermOverride: "",
                        OverrideDesc: "",
                        DealerName: "",
                        RCCValue: 0,
                        RCCEditable: "N",
                        StoreReservation: false,
                        RedPlusPlan: {
                            Action: "Add",
                            Name: "",
                            PlanPrice: 0,
                            EligibleOrderLineItem: "Y"
                        },
                        AddSIM: {
                            Action: "Add",
                            Name: "Accessory Item",
                            Prod__Integration__Id: "",
                            StockIndicator: "Out of Stock",
                            Accessory__Code: "",
                            Accessory__Name: "",
                            Accessory__Qty: "1",
                            Accessory__Price__Exc__GST: "0",
                            Accessory__Price__Inc__GST: "0",
                            Accessory__RCC__Exc__GST: "0",
                            Accessory__RCC__Inc__GST: "0",
                            EligibleOrderLineItem: "N"
                        },
                        RecurringDiscount_SAM1569: {
                            Action: "Add",
                            Name: "",
                            Type: "Recurring Discount",
                            Prod__Integration__Id: "",
                            GPI: "Recurring Discount",
                            ProductId: "",
                            MaxPrice: "",
                            SAMId: "",
                            ServicePrice: "",
                            Amount: "",
                            Period: "",
                            Reason__Code: "",
                            EligibleOrderLineItem: "N"
                        },
                        RecurringDiscount_AUX0207: {
                            Action: "Add",
                            Name: "",
                            Type: "Recurring Discount",
                            Prod__Integration__Id: "",
                            GPI: "Recurring Discount",
                            ProductId: "",
                            MaxPrice: "",
                            SAMId: "",
                            ServicePrice: "",
                            Period: "",
                            EligibleOrderLineItem: "N",
                            UI__Reason__Code: ""
                        },
                        RecurringDiscount_AUX1414: {
                            Action: "Add",
                            Name: "",
                            Type: "Recurring Discount",
                            Prod__Integration__Id: "",
                            GPI: "Recurring Discount",
                            ProductId: "",
                            MaxPrice: "",
                            SAMId: "",
                            ServicePrice: "",
                            Period: "",
                            EligibleOrderLineItem: "N",
                            UI__Reason__Code: ""
                        },
                        RecurringDiscount_AUV0450: {
                            Action: "Add",
                            Name: "",
                            Type: "Recurring Discount",
                            Prod__Integration__Id: "",
                            GPI: "Recurring Discount",
                            ProductId: "",
                            MaxPrice: "",
                            SAMId: "",
                            ServicePrice: "",
                            Amount: "",
                            Period: "",
                            Reason__Code: "",
                            EligibleOrderLineItem: "N"
                        },
                        RecurringDiscount_AUV0451: {
                            Action: "Add",
                            Name: "",
                            Type: "Recurring Discount",
                            Prod__Integration__Id: "",
                            GPI: "Recurring Discount",
                            ProductId: "",
                            MaxPrice: "",
                            SAMId: "",
                            ServicePrice: "",
                            Amount: "",
                            Period: "",
                            Reason__Code: "",
                            EligibleOrderLineItem: "N"
                        },
                        RecurringDiscount_AUV0452: {
                            Action: "Add",
                            Name: "",
                            Type: "Recurring Discount",
                            Prod__Integration__Id: "",
                            GPI: "Recurring Discount",
                            ProductId: "",
                            MaxPrice: "",
                            SAMId: "",
                            ServicePrice: "",
                            Amount: "",
                            Period: "",
                            Reason__Code: "",
                            EligibleOrderLineItem: "N"
                        },
						RecurringDiscount_AUV0535: {
                            Action: "Add",
                            Name: "",
                            Type: "Recurring Discount",
                            Prod__Integration__Id: "",
                            GPI: "Recurring Discount",
                            ProductId: "",
                            MaxPrice: "",
                            SAMId: "",
                            ServicePrice: "",
                            Amount: "",
                            Period: "",
                            Reason__Code: "",
                            EligibleOrderLineItem: "N"
                        },
                        Upgrade: {
                            Action: "Add",
                            Name: "Upgrade",
                            Prod__Integration__Id: "",
                            Eligibility: "Y",
                            Eligibility__Override__Reason: "",
                            Offer__Type: "Every Valid Plan with Every Device",
                            RIV__Exc__GST: "0",
                            RIV__Inc__GST: "0",
                            Savings__On__RIV__Exc__GST: 0,
                            Savings__On__RIV__Inc__GST: 0,
                            Total__RCC__Exc__GST: 0,
                            Total__RCC__Inc__GST: 0,
                            Value__Band: "4",
                            EligibleOrderLineItem: "N"
                        },
                        Device: {
                            Action: "Add",
                            Name: "Device",
                            Prod__Integration__Id: "",
                            StockIndicator: "In Stock",
                            Device__Code: "",
                            Device__Name: "",
                            Device__Price__Exc__GST: "",
                            Device__Price__Inc__GST: "",
                            Device__RCC__Exc__GST: "",
                            Device__RCC__Inc__GST: "",
                            EligibleOrderLineItem: "N"
                        },
                        GppDeviceContract: {
                            Action: "Add",
                            Name: "GPP Device Contract",
                            Prod__Integration__Id: "",
                            Additional__Info: "",
                            Category: "Device",
                            IMEI___Serial__Number: "",
                            Item__Code: "",
                            Item__Name: "",
                            Contract__Amount: 0,
                            Monthly__Repayment: 0,
                            Original__Order__Number: "",
                            Original__Purchase__Date: "",
                            Prepayment__Amount: "",
                            Term: "12",
                            Term__Override: "_",
                            EligibleOrderLineItem: "N"
                        },
                        Accessories: [{
                                Action: "Add",
                                Name: "APP Contract",
                                Prod__Integration__Id: "",
                                Additional__Info: "",
                                Category: "",
                                Contract__Amount: 0,
                                Contract__Amount__Override: "",
                                Contract__End__Date: "",
                                Contract__Start__Date: "",
                                IMEI: "",
                                Monthly__Repayment: 0,
                                Number__of__Accessories: 0,
                                Prepayment__Amount: 0,
                                Term: "",
                                Term__Override: "_",
                                Total__Accessories__RRP__Inc__GST: 0.00,
                                EligibleOrderLineItem: "N"
                            }
                        ],
                        SecondaryDevices: [],
                        SDInsurance: [],
                        EefMonthRollover: {
                            Action: "Add",
                            Type: "Early Upgrade Fee Rollover",
                            Prod__Integration__Id: "",
                            Name: "",
                            EEFPeriod: "",
                            EligibleOrderLineItem: "N"
                        },
                        gppdevicecontractdel: [],
                        DataAddOns: {
                            Action: "Add",
                            Name: "",
                            Type: "Addon",
                            Prod__Integration__Id: "",
                            GPI: "",
                            ProductId: "",
                            MaxPrice: "",
                            SAMId: "",
                            EligibleOrderLineItem: "N",
                            AddOnType: ""
                        },
                        IddAddOns: {
                            Action: "Add",
                            Name: "",
                            Type: "Addon",
                            Prod__Integration__Id: "",
                            GPI: "",
                            ProductId: "",
                            MaxPrice: "",
                            SAMId: "",
			    Period: "",
                            EligibleOrderLineItem: "N",
                            AddOnType: ""
                        },
                        PhoneInsurance: [],
                        AddRemoveInsurance: {
                            AddRemoveIns: ""
                        },
                        RestrictedDiscountType: {
                            RestDiscType: ""
                        },
                        Prepayment: {
                            PrepaymentType: "",
							PrepaymentUPI: "",//vasavi added for Florida
                            PrepaymentOption: "",
                            TotalGPPContractAmount: 0,
                            TotalAPPContractAmount: 0,
                            TotalPrepaymentAmount: 0,
                            MinimumPrepaymentRequired: 0,
                            TotalGPPPrepayment: 0,
                            TotalAPPPrepayment: 0,
                            PrepaymentCardDetailsAll: {
                                PrepaymentCardDetails: {
                                    SelectedCard: "Y",
                                    CardNumber: "",
                                    CardHolder: "",
                                    ExpiryDate: "",
                                    CardType: "",
                                    BrandType: "",
                                    SurchargeInPercent: "",
                                    PaymentStatus: "Pending",
                                    WaiveSurcharge: "N",
                                    EligibleOrderLineItem: "Y",
									Last4: "",
									First6: "",
									DeviceData: ""
                                }
                            },
							PrepaymentUPIDetailsAll: {//vasavi added UPIdetails section for Florida
                                PrepaymentUPIDetails: {
                                    NotifyType: "",
                                    MSISDN: "",
                                    Email: "",
                                    CreateDate: "",
                                    URL: "",
                                    URLStatus: "",
                                    PaymentStatus: "",
                                    PaymentMethod: "",
                                    ShortId: "",
									PaymentToken: "",
									ReceiptNumber: "",
									WaiveSurcharge: "N",
                                    EligibleOrderLineItem: "Y"
                                }
                            }
                        },
                        ListOfContractInfo: {
                            primarydevicecontractinfo: {
                                ContractType: "GPP Device Contract",
                                AssetIntegId: "",
                                ContractAmount: "",
                                PrepaymentAmount: "",
                                DeviceName: "",
                                DeviceCode: "",
                                EligibleOrderLineItem: "N"
                            },
                            secondarydevicecontractinfo: [],
                            accessoriescontractinfo: {
                                ContractType: "APP Contract",
                                AssetIntegId: "",
                                ContractAmount: "",
                                PrepaymentAmount: "",
                                DeviceName: "",
                                DeviceCode: "",
                                EligibleOrderLineItem: "N"
                            }
                        },
                        Sharing: {
                            EligibleOrderLineItem: "N",
                            CurrentStatus: {
                                MSISDN: "",
                                SharingStatus: "",
                                SharingFlag: "",
                                SharingCompatability: "",
                                EligibleOrderLineItem: "N"
                            },
                            NewStatus: {
                                MSISDN: "",
                                SharingStatus: "",
                                SharingFlag: "",
                                SharingCompatability: "",
                                GroupName: "",
                                EligibleOrderLineItem: "N"
                            },
                            ExistingMSISDN: []
                        },
                        twoWaySMS: {
                            MSISDN: "",
                            OverrideFlag: "N",
                            Eligible: "N"
                        },
                        DeviceDiscounts: {
                            DiscountLoyalty: 0,
                            DiscountCredit: 0,
                            BundleandSave: 0
                        }
                    }
                };
                sSessionData = {
                    EquipmentLimit: 0,
                    TotalPrice: 0,
                    TotalIndicativeCost: 0,
                    Accessories: {
                        Term: 0,
                        AccessoryPrice: 0,
                        AccessoryMonthlyPrice: 0,
                        Count: 0
                    },
                    SecondaryDevice: {
                        SecondaryPrice: 0,
                        Count: 0
                    },
                    Device: {
                        DevicePrice: 0
                    },
                    Plan: {
                        PlanPrice: 0
                    },
                    DataAddOns: {
                        AddonPrice: 0
                    },
                    IddAddOns: {
                        AddonPrice: 0
                    },
                    PhoneInsurance: {
                        InsurancePrice: 0
                    },
                    RestrictedDiscount: {
                        Price: 0
                    },
                    DeviceDiscounts: {
                        Price: 0
                    },
                    PrepaymentAdjustments: {
                        Price: 0
                    }
                };
                SiebelApp.EventManager.cleanListners("UPDATE_CARD_DETAILS");
                SiebelApp.EventManager.addListner("UPDATE_CARD_DETAILS", UpdateCardDetails, this);
				SiebelApp.EventManager.cleanListners("UPDATE_UPI_DETAILS");//vasavi added for Florida
                SiebelApp.EventManager.addListner("UPDATE_UPI_DETAILS", UpdateUPIDetails, this);//vasavi added for Florida
                viewPM = this.GetPM();
                app = SiebelApp.S_App;
                appletMap = app.GetActiveView().GetAppletMap();
                viewPM.AttachPMBinding("bsOutput", handleServerCallRes);
                resumeJSON = {
                    "ShowValue": [],
                    "AddClass": []
                };
                if (secondaryresponse.length == 0) {
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://" + sESEndPoint + "/secondarydevices/_search",
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            "postman-token": "dd0b3ba5-1198-5a10-3472-8119a5d93f7c"
                        },
                        "processData": false,
                        "data": '{\r\n    "size": 4000,\r\n    "query": {\r\n        "match_all": {\r\n            }\r\n    }\r\n}'
                    };
                    $.ajax(settings).done(function (response) {
                        secondaryresponse = response.hits.hits;
                        for (i = 0; i < secondaryresponse.length; i++) {
                            result.push({
                                label: secondaryresponse[i]._source.Name,
                                value: secondaryresponse[i]._source.Name,
                                prodcd: secondaryresponse[i]._source.Product_Code,
                                make: secondaryresponse[i]._source.Make,
                                ean: secondaryresponse[i]._source.EAN,
                                type: "Secondary Device"
                            });
                        }
                        if (sessionType == "Paused") {
                            var secDvcArray = pausedDetails.OrderHeader.SecondaryDevices.filter(function (a) {
                                return a.Name == "Accessory";
                            });
                            secDvcArray.forEach(function (item, index) {
                                var secDvcCd = item.Accessory__Code;
                                var secDvcIns = item.SD__Insurance;
                                var secTerm = pausedDetails.OrderHeader.SecondaryDevices.filter(function (a) {
                                    return a.VHA__SD__Group__Id == item.VHA__SD__Group__Id && a.Name == "APP Contract";
                                })[0].Term;
                                var secIMEI = pausedDetails.OrderHeader.SecondaryDevices.filter(function (a) {
                                    return a.VHA__SD__Group__Id == item.VHA__SD__Group__Id && a.Name == "APP Contract";
                                })[0].IMEI;
                                var secDvcIns = pausedDetails.OrderHeader.SDInsurance.filter(function (a) {
                                    return a.VHA__SD__Group__Id == item.VHA__SD__Group__Id;
                                })[0].SD__Insurance;
                                $("#secondaryimei").val(secIMEI);
                                $(".vha-ts-sd-term[term=" + secTerm + "]").trigger("click");
                                shopSecondary(secDvcCd, secDvcIns);
                            });
                            resumeSecDevice = "Added";
                        }
                    });
                    $.ajax(settings).fail(function (xhr, status, error) {
                        alert("Secondary Device retrieval failed, kindly raise a Siebel Support ticket if you continue to receive this error.");
                    });
                }
                if (accessoryresponse.length == 0) {
                    var accessorysettings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://" + sESEndPoint + "/accessories/_search",
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            "postman-token": "dd0b3ba5-1198-5a10-3472-8119a5d93f7c"
                        },
                        "processData": false,
                        "data": '{\r\n    "size": 10000,\r\n    "query": {\r\n        "match_all": {\r\n            }\r\n    }\r\n}'
                    };
                    $.ajax(accessorysettings).done(function (response) {
                        accessoryresponse = response.hits.hits;
                        for (i = 0; i < accessoryresponse.length; i++) {
                            if (accessoryresponse[i]._source.Non_APP != "Y" && (dealerFlag == "Y" && accessoryresponse[i]._source.Dealer == "Y" || dealerFlag != "Y")) {
                                accessoryresult.push({
                                    label: accessoryresponse[i]._source.Accessory_Name,
                                    value: accessoryresponse[i]._source.Accessory_Name,
                                    prodcd: accessoryresponse[i]._source.Accessory_Code,
                                    model: accessoryresponse[i]._source.Model,
                                    category: accessoryresponse[i]._source.Category,
                                    price: accessoryresponse[i]._source.RRP_inc_gst,
                                    ean: accessoryresponse[i]._source.EAN,
                                    vendor: accessoryresponse[i]._source.Vendor,
                                    type: "Accessory"
                                });
                            }
                            if (uniqueCat.indexOf(accessoryresponse[i]._source.Category) == -1 && accessoryresponse[i]._source.Non_APP != "Y" && (dealerFlag == "Y" && accessoryresponse[i]._source.Dealer == "Y" || dealerFlag != "Y")) {
                                uniqueCat.push(accessoryresponse[i]._source.Category);
                            }
                            if (uniqueCode.indexOf(accessoryresponse[i]._source.Accessory_Code) == -1 && accessoryresponse[i]._source.Non_APP != "Y") {
                                uniqueCode.push(accessoryresponse[i]._source.Accessory_Code);
                            }
                            if (uniqueEanCode.indexOf(accessoryresponse[i]._source.EAN) == -1 && accessoryresponse[i]._source.Non_APP != "Y" && (dealerFlag == "Y" && accessoryresponse[i]._source.Dealer == "Y" || dealerFlag != "Y")) {
                                uniqueEanCode.push(accessoryresponse[i]._source.EAN);
                            }
                            if (uniqueModel.indexOf(accessoryresponse[i]._source.Model) == -1 && accessoryresponse[i]._source.Non_APP != "Y" && (dealerFlag == "Y" && accessoryresponse[i]._source.Dealer == "Y" || dealerFlag != "Y")) {
                                uniqueModel.push(accessoryresponse[i]._source.Model);
                            }
                        }
                        if (sessionType == "Paused") {
                            var accessoryArray = pausedDetails.OrderHeader.Accessories.filter(function (a) {
                                return a.Name == "Accessory";
                            });
                            if (accessoryArray.length > 0) {
                                var accTerm = pausedDetails.OrderHeader.Accessories.filter(function (a) {
                                    return a.Name == "APP Contract";
                                })[0].Term;
                                accessoryArray.forEach(function (item, index) {
                                    $("#vha-ts-accessorylist").val(item.Accessory__Name);
                                    $(".vha-ts-a-term[term=" + accTerm + "]").trigger("click");
                                    if (item.StockIndicator == "In Stock") {
                                        $("#vhatsinstock").trigger("click");
                                    } else {
                                        $("#vhatsoutstock").trigger("click");
                                    }
                                    if ($("div.accessory div[id='" + item.Accessory__Code + "']").length == 0) {
                                        shopAccessory(item.Accessory__Code, item.Accessory__RRP__Inc__GST);
                                    } else {
                                        shopMultipleAccessory(item.Accessory__Code);
                                    }
                                });
                            }
                            resumeAccessory = "Added";
                        }
                    });
                    $.ajax(accessorysettings).fail(function (xhr, status, error) {
                        alert("Accessory retrieval failed, kindly raise a Siebel Support ticket if you continue to receive this error.");
                    });
                }
            };
            VHATSUpgradeViewPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHATSUpgradeViewPR.superclass.ShowUI.apply(this, arguments);
                $("#_sweview").addClass("vha3StepUpgrade");
                $("#smartwizard .siebui-applet").addClass("VHAFullWidth");
                createGuidedFlow();
                showCustomerDtls();
                setUI();
				//vasavi added below code for florida
				var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";   
				var string_length = 8;  
				var randomstring = '';  
				for (var i=0; i<string_length; i++) {  
				var rnum = Math.floor(Math.random() * chars.length);  
				randomstring += chars.substring(rnum,rnum+1);  
				SiebelApp.S_App.SetProfileAttr("ShortCodeP", randomstring );
				}// end vasavi added for florida
                var conSettings = {
                    "async": true,
                    "crossDomain": true,
                    "url": apilovurl + "VHARestAPIWF/RunProcess",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "5c1f0ef1-1226-5653-dba8-72a6c0e242c9"
                    },
                    "processData": false,
                    "data": '{\r\n   "body":{\r\n      "ProcessName":"VHA Get Existing Contract Details Process",\r\n      "Object Id":"' + sSessionId + '"\r\n }\r\n}'
                };
                $.ajax(conSettings).done(function (response) {
                    if (response["Error Code"] == "") {
                        tsintitialData.OrderHeader.PropositionCode = response["PropositionCode"];
                        extInsurance = response.SiebMsg.ExistingContract.InsuranceDetails;
                        tsintitialData.OrderHeader.DealerName = response["LoginSalesPerson"];
                        tsintitialData.OrderHeader.VFDealerRowId = response["LoginDealerRowId"];
                        tsintitialData.OrderHeader.VFSalesChannelDescription = response["LoginSalesChannelDescription"];
                        tsintitialData.OrderHeader.VFSalesBranchDescription = response["LoginSalesBranchDescription"];
                        currentGPPCnt = parseInt(response.SiebMsg.ExistingContract.ActiveGPPCount) != NaN ? parseInt(response.SiebMsg.ExistingContract.ActiveGPPCount) : 0;
                        var plan = response.SiebMsg.ExistingContract.PlanDetails;
                        var currentOffers = response.SiebMsg.ExistingContract;
                        $(".e-cart-discount-loyalty .vha-ts-cartval span").text(currentOffers["LoyaltyDiscount"]);
                        $(".e-cart-discount-bundle .vha-ts-cartval span").text(currentOffers["BundleandSave"]);
                        var sCustomerType = currentOffers["CustomerSegment"];
                        var SearchString = "[List Of Values.Type]='VHA_MANAGE_SD' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='" + sCustomerType + "'";
                        var sVal = VHAAppUtilities.GetPickListValues("", SearchString);
                        sCustomerTypeVal = sVal;
                        if (sVal != "Y") {
                            $("#vha-ts-access #Secondarysection").addClass("VFDisplayNone");
                            $("#vha-ts-access #Accessorysection").addClass("VFDisplayNone");
                        }
                        sExtPlanPri = plan["Price"];
                        $(".vha-ts-e-plan-chd").prepend('<div class="row cart-e-plan">\t\t\t\t\t\t<div>\t\t\t\t\t\t<div class="vha-ts-cartitemw col-md-4">Current Plan</div>\t\t\t\t\t\t<div class="vha-ts-cartitemw col-md-4 ts-cart-plan-name">' + plan["CurrentPlan"] + '</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="h5 vha-ts-cartval">$ ' + plan["Price"] + "</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t");
                        $("#vha-ts-cart-e-upg-fee").text("$ " + plan["EarlyUpgradeFee"]);
                        tsintitialData.OrderHeader.ETC = plan["EarlyUpgradeFee"];
                        if ($("#vha-ts-cart-e-upg-fee").text() != "$ 0.00") {
                            $(".vha_ts_earlyupfee").attr("disabled", false);
                        } else {
                            if ($("#vha-ts-cart-e-upg-fee").text() == "$ 0.00") {
                                $(".vha_ts_earlyupfee").attr("disabled", "disabled");
                            }
                        }
                        var pregpp = response.SiebMsg.ExistingContract.GPPDetails;
                        var gpp = new Array;
                        if (pregpp != undefined) {
                            if (pregpp["IntegrationId"] != undefined) {
                                gpp.push(pregpp);
                            } else {
                                gpp = pregpp;
                            }
                            var sGppCount = gpp.length;
                            for (var i = 0; i < sGppCount; i++) {
                                var gppItem = gpp[i];
                                $(".cart-e-device-par").append('<div class="row cart-e-device">\t\t\t\t\t\t\t<div><div class="vha-ts-cartitemw col-md-4">' + gppItem["ItemName"] + '</div>\t\t\t\t\t\t\t<div class="vha-ts-cartitemw col-md-4 vha-ts-remmonths">' + gppItem["RemMonths"] + " " + 'months remaining</div></div>\t\t\t\t\t\t\t<div class="h5 vha-ts-cartval">$ ' + gppItem["GPPCharge"] + '</div>\t\t\t\t\t\t\t<div class="vha-ts-terminate ml-4 drilldown" id=' + gppItem["IntegrationId"] + "%" + gppItem["GPPConsumedBalance"] + ">Terminate</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t");
                            }
                            terminateGPPDisp();
                            if (sessionType == "Paused") {
                                var gppContractDel = pausedDetails.OrderHeader.gppdevicecontractdel;
                                gppContractDel.forEach(function (item, index) {
                                    $("[id^=" + item.Prod__Integration__Id + "]").trigger("click");
                                });
                            }
                        }
                        if (sessionType == "Paused") {
                            if (pausedDetails.OrderHeader.DealerName != "") {
                                tsintitialData.OrderHeader.DealerName = pausedDetails.OrderHeader.DealerName;
                                tsintitialData.OrderHeader.VFDealerRowId = pausedDetails.OrderHeader.VFDealerRowId;
                                tsintitialData.OrderHeader.VFSalesChannelDescription = pausedDetails.OrderHeader.VFSalesChannelDescription;
                                tsintitialData.OrderHeader.VFSalesBranchDescription = pausedDetails.OrderHeader.VFSalesBranchDescription;
                            }
                        }
                    } else {
                        alert("Error in fetching existing contract and chargeout");
                    }
                    if (sessionType == "Paused") {
                        var AddRemoveInsBtn = pausedDetails.OrderHeader.AddRemoveInsurance.AddRemoveIns;
                        $(".ts-addremoveins-method .applet-button[val='" + AddRemoveInsBtn + "']").trigger("click");
                        var jsonData = pausedDetails.OrderHeader.PhoneInsurance;
                        var length = jsonData.length;
                        if (AddRemoveInsBtn == "Yes") {
                            for (var i = 0; i < length; i++) {
                                var sAction = jsonData[i].Action;
                                var sProdIntId = jsonData[i].Prod__Integration__Id;
                                var sItemName = jsonData[i].Item__Name;
                                var sMaxPrice = jsonData[i].MaxPrice;
                                var sLength = $(".vha-insurance-content").children().length;
                                if (sAction == "Delete") {
                                    for (var j = 0; j < sLength; j++) {
                                        var sInputIdfull = $(".vha-insurance-content").children().eq(j).children().eq(2).children().eq(0).attr("id");
                                        if (sInputIdfull != undefined) {
                                            var sInputId = sInputIdfull.substr(0, 9);
                                            if (sProdIntId == sInputId) {
                                                $(".vha-insurance-content").children().eq(j).children().eq(2).children().eq(0).trigger("click");
                                            }
                                        }
                                    }
                                } else {
                                    if (sAction == "Add" && sItemName != "" && sMaxPrice != 0) {
                                        var sName = jsonData[i].Name;
                                        for (var k = 0; k < sLength; k++) {
                                            var sInputId1full = $(".vha-insurance-content").children().eq(k).children().eq(2).children().eq(0).attr("id");
                                            if (sInputId1full != undefined) {
                                                var sInputId1 = sInputId1full.substr(0, 9);
                                                if (sProdIntId == sInputId1) {
                                                    $(".vha-insurance-content").children().eq(k).children().eq(3).children().eq(0).val(sName).trigger("change");
                                                    $(".vha-insurance-content").children().eq(k).children().eq(2).children().eq(0).trigger("click");
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            pausedDetails.OrderHeader.AddRemoveInsurance.AddRemoveIns = "";
                        }
                    }
                });
                setData();
                currentCustomerPlan = appletMap["VHA 3 Step Upgrade Header Applet"].GetRecordSet()[0]["PropositionType"];
                var IsResumeOrder = false;
                if (IsResumeOrder) {
                    executeEvent(pm, "VHA_RESUME_ORDER", {
                        "sInputEntityType": "Default",
                        "sInputHdrId": appletMap["VHA 3 Step Upgrade Header Applet"].GetRecordSet()[0]["Id"]
                    });
                }
                executeEvent(viewPM, "VHA_PICK_INS", {
                    "ProcessName": "VHA Get Eligible Insurance - 3 Step Upgrade"
                });
                $("#_swecontent").css("height", "calc(100% - 90px)");
            };
            VHATSUpgradeViewPR.prototype.BindData = function (bRefresh) {
                SiebelAppFacade.VHATSUpgradeViewPR.superclass.BindData.apply(this, arguments);
                var RefreshService = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                var RInps = SiebelApp.S_App.NewPropertySet();
                var ROups = SiebelApp.S_App.NewPropertySet();
                RefreshService.InvokeMethod("RefreshCurrentApplet", RInps, ROups);
            };
            VHATSUpgradeViewPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHATSUpgradeViewPR.superclass.BindEvents.apply(this, arguments);
                var this_t = this;
				idDelIcon();
                $(".ts-d-drop-down").on("click", function () {
                    $($(this).attr("parId")).autocomplete("search", "");
                });
                $(".ts-p-drop-down").on("click", function () {
                    $($(this).attr("parId")).autocomplete("search", "");
                });
                $(".vha-ts-rcc").on("change", function () {
                    var devicedetails = tsintitialData.OrderHeader.Device;
                    devicedetails.Device__Price__Exc__GST = 0;
                    devicedetails.Device__Price__Inc__GST = $(this).val();
                    devicedetails.Device__RCC__Exc__GST = 0;
                    devicedetails.Device__RCC__Inc__GST = $(this).val();
                    devicedetails.EligibleOrderLineItem = "Y";
                    var upgradedetails = tsintitialData.OrderHeader.Upgrade;
                    upgradedetails.RIV__Exc__GST = 0;
                    upgradedetails.RIV__Inc__GST = 0;
                    upgradedetails.Savings__On__RIV__Exc__GST = 0;
                    upgradedetails.Savings__On__RIV__Inc__GST = 0;
                    upgradedetails.Total__RCC__Exc__GST = 0;
                    upgradedetails.Total__RCC__Inc__GST = $(this).val();
                    upgradedetails.EligibleOrderLineItem = "Y";
                    var gppdvcecontract = tsintitialData.OrderHeader.GppDeviceContract;
                    gppdvcecontract.Contract__Amount = $(this).val();
                    gppdvcecontract.IMEI___Serial__Number = $(".vha-ts-imei").val();
                    gppdvcecontract.Monthly__Repayment = mTruncate(parseFloat(gppdvcecontract.Contract__Amount / gppdvcecontract.Term).toString());
                    gppdvcecontract.EligibleOrderLineItem = "Y";
                    tsintitialData.OrderHeader.RCCValue = $(this).val();
                    mSetPrepaymentaccordion();
                    var sEqpValue = equipmentLimitValidation();
                    if (sEqpValue > sSessionData.EquipmentLimit) {
                        var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                        $("#vha-ts-d-equiplmtmsg").text(sErrDtl);
                    }
                });
                $(".vha-ts-simonlyupg input[type=checkbox]").on("click", function () {
                    var StoreResApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Store Reservation 3 Step Upgrade");
                    //var proceedSimOnly = "Y";
                    if ($(".vha-ts-storeres #tickmark").prop("checked")) { //Balaji - RC
                        if (StoreResApplet.GetRecordSet().length > 0) {
                            if (StoreResApplet.GetRecordSet()[0]['Reservation Status'] == 'Reserved') {
                                //proceedSimOnly = "N";
                                $(this).prop("checked", false);
                                alert("Please UnReserve Store Reservation before proceeding with SIM Only Upgrade.");
                                e.stopPropagation();
                            }
                        }
                    }
                    if ($(this).prop("checked")) {
                        //function simonlyupg() {
                        //if (proceedSimOnly == "Y") {
                        sSimOnlyUpg = "Y";
                        $("#vhatsaddsimno").trigger("click");
                        updateSessionDetails([0, 0], "DeviceCost", "Add");
                        updateSessionDetails(0, "PlanCost", "Add");
                        $(".vha-ts-device-select").addClass("VFDisplayNone");
                        $(".vha-ts-cart-sum").removeClass("VFDisplayNone");
                        $(".vha-ts-storeres").addClass("VFDisplayNone");
                        if ($(".vha-ts-storeres #tickmark").prop("checked")) { //Balaji - RC
                            if (StoreResApplet.GetRecordSet().length > 0) {
                                if (StoreResApplet.GetRecordSet()[0]['Reservation Status'] == 'Reserved')
                                    StoreResApplet.InvokeMethod("UnReserveStock");
                            }
                            $(".vha-ts-storeres #tickmark").prop("checked", false);
                            $("#" + StoreResApplet.GetFullId()).addClass("VFDisplayNone");
                        }
                        $(".vha-ts-storeres #tickmark").prop("checked", false);
						tsintitialData.OrderHeader.StoreReservation = false;
                        $("#" + StoreResApplet.GetFullId()).addClass("VFDisplayNone");
                        $(".vha-ts-indcost .vha-ts-cartval").text("0.00");
                        triggerCustomerExpand();
                        $(".vha-ts-dvcplan").removeClass("VFDisplayNone");
                        var sCartDvcPln = '<div class="vha-ts-redtxt h5 col-md-12">Device Plan</div>\t\t\t\t\t\t\t<div class="col-md-12 ml-5 vha-ts-dvcplan-chd">\t\t\t\t\t\t\t\t<div class="row cart-device-info">\t\t\t\t\t\t\t\t\t<div class="vha-ts-cartitemw">Non Device</div>\t\t\t\t\t\t\t\t\t<div class="h5 vha-ts-cartval">$ 0.00</div>\t\t\t\t\t\t\t\t</div>                                <div class="row cart-plan-info VFDisplayNone">                                    <div class="vha-ts-cartitemw">Plan Name</div>                                            <div class="h5 vha-ts-cartval">$00.00</div>                                </div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t';
                        $(".vha-ts-dvcplan").html(sCartDvcPln);
                        clearJSONObj(["Device", "Upgrade", "GppDeviceContract"]);
                        tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST = 0;
                        tsintitialData.OrderHeader.GppDeviceContract.Contract__Amount = 0;
                        tsintitialData.OrderHeader.RedPlusPlan.Name = "";
                        tsintitialData.OrderHeader.RedPlusPlan.PlanPrice = 0;
                        tsintitialData.OrderHeader.RedPlusPlan.EligibleOrderLineItem = "N";
                        var upgradedetails = tsintitialData.OrderHeader.Upgrade;
                        upgradedetails.Offer__Type = sOfferTyp;
                        upgradedetails.Value__Band = sValueBand;
                        upgradedetails.EligibleOrderLineItem = "Y";
                        priDeviceProdCd = "Non Device";
                        getPlanDetails("Y");
                        $(".vha-ts-device-select #vha-ts-d-stockerrmsg").text("");
                        $("#vha-ts-device .vha-h-line").hide();
                        priPlanDtl = "";
                        addDiscounts("");
                        $('#ts-new-device-ins').val('None').change();
                        $("#ts-new-device-ins").prop("disabled", true);
                        totalIndicativeCostCalc();
                        //}
                    } else {
                        sSimOnlyUpg = "N";
                        $("#showDeviceMsg1").empty();
                        $(".vha-ts-device-select").removeClass("VFDisplayNone");
                        $(".vha-ts-dvcplan").addClass("VFDisplayNone");
                        $(".vha-ts-cart-sum").addClass("VFDisplayNone");
                        $(".vha-ts-storeres").removeClass("VFDisplayNone");
                        $(".vha-ts-indcost .vha-ts-cartval").text("0.00");
                        triggerCustomerExpand();
                        clearJSONObj(["Upgrade"]);
                        tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST = 0;
                        tsintitialData.OrderHeader.RedPlusPlan.Name = "";
                        tsintitialData.OrderHeader.RedPlusPlan.EligibleOrderLineItem = "N";
                        tsintitialData.OrderHeader.RedPlusPlan.PlanPrice = 0;
                        priPlanDtl = "";
                        priDeviceProdCd = "";
                        $("#ts-new-device-ins").prop("disabled", false);
                        getPlanDetails();
                        $("#vha-ts-device .vha-h-line").show();
                        totalIndicativeCostCalc();
                    }
                });
                $(".vha-ts-storeres input[type=checkbox]").on("click", function () {
                    var StoreResApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Store Reservation 3 Step Upgrade");
                    tsintitialData.OrderHeader.StoreReservation = $(this).prop("checked");
                    if ($(this).prop("checked")) {
                        $("#" + StoreResApplet.GetFullId()).removeClass("VFDisplayNone");
                        $('.vha-ts-imei').prop("disabled", true);
                        $(".vha-ts-imei").val("");
                    } else {
                        if (StoreResApplet.GetRecordSet().length > 0) {
                            if (StoreResApplet.GetRecordSet()[0]['Reservation Status'] == 'Reserved')
                                StoreResApplet.InvokeMethod("UnReserveStock");
                        }
                        $("#" + StoreResApplet.GetFullId()).addClass("VFDisplayNone");
                        $('.vha-ts-imei').prop("disabled", false);
                    }
                });
                $(".vha-ts-deleteiconsm").on("click", function () {
					pegaflag = "N";
                    $("#iddel").dialog("open");
                });
                $("#ts-override-reason").on("change", function () {
                    $("span#UpgradeId").remove();
                    $(".salesrep").after("<span id='UpgradeId' style='color: red !important'><ul id='IneligOutright'></ul><ul id='IneligResign'></ul><ul id='IneligUpgrade'></ul><br></span>");
                    if ($("#ts-override-reason").val() != "") {
                        $("#overrideId").empty();
                        $("#vha-ts-rrp-btn,#vha-ts-resign-btn,#vha-ts-upg-btn").removeClass("VFDisplayNone");
                        if (RRPshow != "Y") {
                            $("#vha-ts-rrp-btn").addClass("VFDisplayNone");
                            $("ul#IneligOutright").text(sIneligReasonOutright);
                        }
                        if (regignShow != "Y") {
                            $("#vha-ts-resign-btn").addClass("VFDisplayNone");
                            $("ul#IneligResign").text(sIneligReasonResign);
                        }
                        if (upateShow != "Y") {
                            $("#vha-ts-upg-btn").addClass("VFDisplayNone");
                            $("ul#IneligUpgrade").text(sIneligReasonUpgrade);
                        }
                    } else {
                        $("#vha-ts-rrp-btn,#vha-ts-resign-btn,#vha-ts-upg-btn").removeClass("VFDisplayNone");
                        if (withoutResolutionRrp != "Y") {
                            $("#vha-ts-rrp-btn").addClass("VFDisplayNone");
                            $("ul#IneligOutright").text(sIneligibleOutright);
                        }
                        if (withoutResolutionResign != "Y") {
                            $("#vha-ts-resign-btn").addClass("VFDisplayNone");
                            $("ul#IneligResign").text(sIneligibleResign);
                        }
                        if (withoutResolutionUpgarde != "Y") {
                            $("#vha-ts-upg-btn").addClass("VFDisplayNone");
                            $("ul#IneligUpgrade").text(sIneligibleUpgrade);
                        }
                        if ($("#vha-ts-rrp-btn").hasClass("VFDisplayNone") && $("#vha-ts-resign-btn").hasClass("VFDisplayNone") && $("#vha-ts-upg-btn").hasClass("VFDisplayNone")) {
                            $("#overrideId").empty();
                            $("#ts-override-reason").after("<span id='overrideId'>Please Select Override Reason to Proceed</span>");
                        }
                    }
                    tsintitialData.OrderHeader.OverrideDesc = $("#ts-override-reason").val();
                });
                $(".vha-ts-offerapply span").on("click", function () {
                    if ($(this).text() == "Apply" && $(".vha-ts-promoCode").val() != "") {
                        if (validation()) {
                            var sUpdtDiscDtl = refreshCart("");
                            if (sUpdtDiscDtl.PromoCodeValid == "Y") {
                                $(".vha_promo_errmsg").html("");
                                $(".vha-ts-offerapply span").text("Revert");
                                $(".vha-ts-promoCode").attr("disabled", true);
                            } else {
                                if ($(".vha-ts-offerapply span:not(.VFDisplayNone)").text() == "Apply") {
                                    if ($(".vha-ts-promoCode").val() !== "") {
                                        $(".vha_promo_errmsg").html("Invalid Promo Code");
                                    }
                                    $(".vha-ts-promoCode").attr("disabled", false);
                                    $(".vha-ts-promoCode").val("");
                                }
                            }
                            addDiscounts(sUpdtDiscDtl);
                        } else
                            $(".vha-ts-promoCode").val("");
                    } else {
                        if ($(this).text() == "Revert") {
                            $(".vha-ts-promoCode").prop("disabled", false);
                            $(".vha-ts-promoCode").val("");
                            var sUpdtDiscDtl = refreshCart("");
                            addDiscounts(sUpdtDiscDtl);
                            $(".vha-ts-offerapply span").text("Apply");
                        }
                    }
                });
                $("#secondaryimei").on("change", function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        $("#ts-secondary-model").val("");
                        $("#ts-search-ean").val("");
                        $("#vha-ts-sd-stockerrmsg").text("");
                        $("#vha-ts-sd-equiplmtmsg").text("");
                        $("#showMsgAdd").empty();
                        $("#vha-ts-sd-imeierrmsg").empty();
                        if (sCapPlan) {
                            $("#vha-ts-sd-imeierrmsg").text("Accessory option is not available for Cap Plans.");
                            $("#vha-ts-sd-imeierrmsg").removeClass("text-warning").addClass("text-danger");
                            return;
                        }
                        var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        Inputs.SetProperty("ProcessName", "VHA 3 Step Upgrade Show Now Wrapper Workflow");
                        Inputs.SetProperty("Object Id", sSessionId);
                        Inputs.SetProperty("IMEI", $(this).val());
                        Inputs.SetProperty("Type", "Secondary Device");
                        var out = ser.InvokeMethod("RunProcess", Inputs);
                        var estPrice = 0;
                        var secDvcCd = "";
                        var secDvcCnt = 0;
                        $("#secondaryslected div[vha_sd_grp_id]").each(function (index) {
                            secDvcCnt++;
                        });
                        Deletedevice = secDvcCnt;
                        if (parseInt(secDvcCnt) + parseInt(sExistingSDAppCount) < 5) {
                            for (i = 0; i < secondaryresponse.length; i++) {
                                if (secondaryresponse[i]._source.Product_Code == out.GetChildByType("ResultSet").propArray.DeviceCode) {
                                    secDvcCd = secondaryresponse[i]._source.Product_Code;
                                }
                            }
                            if (out.GetChildByType("ResultSet").propArray.ErrorType == "" && secDvcCd != "") {
                                if (!$(".vha-ts-sd-term").hasClass("applet-button-active")) {
                                    $(".vha-ts-sd-term[term='36']").trigger("click");
                                }
                                secondaryDvcAdd(out.GetChildByType("ResultSet").propArray.DeviceCode, out.GetChildByType("ResultSet").propArray, "");
                                mSetPrepaymentaccordion();
                                var sEqpValue = equipmentLimitValidation();
                                if (sEqpValue > sSessionData.EquipmentLimit) {
                                    var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                                    $("#vha-ts-sd-equiplmtmsg").text(sErrDtl);
                                }
                            } else {
                                if (out.GetChildByType("ResultSet").propArray.ErrorType == "Error") {
                                    $("#vha-ts-sd-imeierrmsg").text(out.GetChildByType("ResultSet").propArray.ErrorMsg);
                                    $("#vha-ts-sd-imeierrmsg").removeClass("text-warning").addClass("text-danger");
                                    $("#secondaryimei").val("");
                                } else {
                                    if (out.GetChildByType("ResultSet").propArray.ErrorType == "" && secDvcCd == "") {
                                        $("#vha-ts-sd-imeierrmsg").text("IMEI Search failed, kindly select a device from Pick Model drop down list");
                                        $("#vha-ts-sd-imeierrmsg").removeClass("text-danger").addClass("text-warning");
                                    } else {
                                        var eSDMsg = out.GetChildByType("ResultSet").propArray.ErrorMsg;
                                        if (eSDMsg == "Device Code is not available in IMEI List") {
                                            eSDMsg = "Device Code is not available in IMEI List. Please proceed picking model.";
                                        }
                                        $("#vha-ts-sd-imeierrmsg").text(eSDMsg);
                                        $("#vha-ts-sd-imeierrmsg").removeClass("text-danger").addClass("text-warning");
                                    }
                                }
                            }
                        } else {
                            $("#secondaryimei").val("");
                            $("#ts-secondary-model").val("");
                            $("#ts-search-ean").val("");
                            $("#vhasecondaryadd").after("<div id='showMsgAdd'>Maximum of 5 secondary devices only allowed</div>");
                        }
                        $("#maskoverlay").styleHide();
                    });
                });
                $(".vha-ts-imei").on("change", function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        $("#showMsg").empty();
                        $(".vha-ts-device-select #vha-ts-d-equiplmtmsg").text("");
                        $(".vha-ts-device-select #vha-ts-d-stockerrmsg").text("");
                        $(".vha-ts-device-select #vha-ts-d-imeierrmsg").text("");
                        if ($(".vha-ts-imei").val() != "") {
                            if (currentGPPCnt < maxGPPCnt) {
                                var sDvcIMEIChk = ProcessDeviceCheck("IMEI", $(this).val(), "", "IMEICheckCall");
                                if (sDvcIMEIChk.VFIMEI == "N") {
                                    sRCCEligible = "Y";
                                } else {
                                    sRCCEligible = "N";
                                }
                                if (sDvcIMEIChk.ErrorType == "") {
                                    $(".vha-ts-shrngcmp").remove();
                                    refreshPromocode();
                                    $(".vhatsbrand").removeClass("applet-button-active");
                                    priDeviceProdCd = "";
                                    filtereddevicesresponse = [];
                                    for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                                        if (Object.values(devicesresponse.hits.hits)[i]._source.Product_Code == sDvcIMEIChk.DeviceCode) {
                                            filtereddevicesresponse.push(Object.values(devicesresponse.hits.hits)[i]);
                                            priDeviceProdCd = sDvcIMEIChk.DeviceCode;
                                        }
                                    }
                                    if (priDeviceProdCd !== "") {
                                        createDeviceTiles();
                                        for (i = 0; i < filtereddevicesresponse.length; i++) {
                                            if (filtereddevicesresponse[i]._source.Product_Code == sDvcIMEIChk.DeviceCode) {
                                                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                                                var Inputs = SiebelApp.S_App.NewPropertySet();
                                                Inputs.SetProperty("ProcessName", "VHA 3 Step Upgrade Show Now Wrapper Workflow");
                                                Inputs.SetProperty("UpgradeOfferType", sUserOptn);
                                                Inputs.SetProperty("CartRefresh", "Y");
                                                Inputs.SetProperty("Object Id", sSessionId);
                                                Inputs.SetProperty("DealerRowId", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Dealer Row Id"));
                                                Inputs.SetProperty("DeviceCode", priDeviceProdCd);
                                                Inputs.SetProperty("DeviceContract", $(".vhats-d-term.applet-button-active").attr("term"));
                                                Inputs.SetProperty("InvestmentProportion", filtereddevicesresponse[i]._source.Investment_Proportion);
                                                Inputs.SetProperty("DeviceRRP", filtereddevicesresponse[i]._source.RRP_inc_gst);
                                                Inputs.SetProperty("DeviceMatrixContract", filtereddevicesresponse[i]._source.Contract);
                                                var Output = ser.InvokeMethod("RunProcess", Inputs);
                                                var sDvcPriceRetrieval = Output.GetChildByType("ResultSet").propArray;
                                                addDevice(filtereddevicesresponse[i]._source, sDvcPriceRetrieval);
                                                $(".vha-ts-cart-sum").removeClass("VFDisplayNone");
                                                $(".vha-ts-indcost .vha-ts-cartval").text("0.00");
                                                triggerCustomerExpand();
                                                addDiscounts(sDvcPriceRetrieval);
                                                mSetPrepaymentaccordion();
                                                if ($("div#stockmsg").text() != "") {
                                                    $("div#stockmsg").text("");
                                                }
                                            }
                                        }
                                    } else {
                                        var sErrDtl = "Device not available in matrix, kindly select a device from carousel to proceed.";
                                        $(".vha-ts-device-select #vha-ts-d-imeierrmsg").text(sErrDtl);
                                        $(".vha-ts-device-select #vha-ts-d-imeierrmsg").removeClass("text-danger").addClass("text-warning");
                                    }
                                    $("#vhatsaddsimno").removeClass("applet-button-passive");
                                    $("#vhatsaddsimno").addClass("applet-button-active");
                                    $("#vhatsaddsimy").removeClass("applet-button-active");
                                    $("#vhatsaddsimy").addClass("applet-button-passive");
                                    tsintitialData.OrderHeader.AddSIM.EligibleOrderLineItem = "N";
                                } else {
                                    if (sDvcIMEIChk.ErrorType == "Warning") {
                                        var sWarnDtl = sDvcIMEIChk.ErrorMsg;
                                        if (sWarnDtl == "Device Code is not available in IMEI List") {
                                            if (sRCCEligible == "Y" && sEditRCCResp == "Y") {
                                                sWarnDtl = "Device Code is not available in IMEI List. Please proceed choosing device and plan / enter RCC.";
                                            } else
                                                sWarnDtl = "Device Code is not available in IMEI List. Please proceed choosing device and plan.";
                                        }
                                        $(".vha-ts-device-select #vha-ts-d-imeierrmsg").text(sWarnDtl);
                                        $(".vha-ts-device-select #vha-ts-d-imeierrmsg").addClass("text-warning").removeClass("text-danger");
                                        $("#vhatsaddsimno").removeClass("applet-button-passive");
                                        $("#vhatsaddsimno").addClass("applet-button-active");
                                        $("#vhatsaddsimy").removeClass("applet-button-active");
                                        $("#vhatsaddsimy").addClass("applet-button-passive");
                                        tsintitialData.OrderHeader.AddSIM.EligibleOrderLineItem = "N";
                                    } else {
                                        if (sDvcIMEIChk.ErrorType != "") {
                                            var sErrDtl = sDvcIMEIChk.ErrorMsg;
                                            $(".vha-ts-device-select #vha-ts-d-imeierrmsg").text(sErrDtl);
                                            $(".vha-ts-device-select #vha-ts-d-imeierrmsg").removeClass("text-warning").addClass("text-danger");
                                            $(".vha-ts-imei").val("");
                                            $(".vha-ts-rcc").attr("disabled", true);
                                            $(".vha-ts-rcc").val("");
                                            tsintitialData.OrderHeader.RCCEditable = "N";
                                        }
                                    }
                                }
                            } else {
                                $(".vha-ts-device-select #vha-ts-d-imeierrmsg").text("You have reached the maximum allowed MPP/GPPs. You will need to Terminate an existing MPP/GPP before you can add more MPP/GPPs to this service.");
                            }
                        } else {
                            $(".vha-ts-rcc").attr("disabled", true);
                            tsintitialData.OrderHeader.RCCEditable = "N";
                        }
                        $("#maskoverlay").styleHide();
                    });
                });
                $("#vha-guided-wizard li:first-child").on("click", function () {
                    $("#vha-guided-wizard li:nth-child(2)").removeClass("active");
                    $(this).removeClass("done").addClass("active");
                    window.sAccordion = "Y";
                    $(".vha-gf-accordion-chd").each(function (index, item) {
                        if ($(item).hasClass("VFDisplayNone") == false) {
                            $(item).addClass("VFDisplayNone");
                        }
                    });
                    $(".vha-arrow").removeClass("vha-arrow-down");
                    $("#vha-ts-device-hd").next().removeClass("VFDisplayNone");
                    $("#vha-ts-device-hd").find(".vha-arrow").addClass("vha-arrow-down");
                    $(".sw-cart-sum").removeClass("VFDisplayNone");
                    $(".mr-auto").css("padding-top", "0px");
                    $("#vha-guided-wizard").removeClass("justify-content-center").addClass("justify-content-right").css("margin-left", "250px");
                });
                $("#vha-guided-wizard li:nth-child(2)").on("click", function () {
                    if (validation()) {
                        $('[vha-step="#step-1"]').click();
                        $(this).addClass("active");
                        $("#vha-guided-wizard li:nth-child(1)").removeClass("active");
                        $("#vha-guided-wizard li:nth-child(1)").addClass("done");
                        window.sBypass1 = "N";
                        window.sAccordion = "Y";
                        $("#vha-ts-planconfig-hd").trigger("click");
                        window.sBypass1 = "";
                        $("#vha-guided-wizard").removeClass("justify-content-center").addClass("justify-content-right").css("margin-left", "250px");
                    }
                });
                $("#step1").on("click", function () {
                    $("#step1").addClass("active");
                    $("#step2").removeClass("active");
                    $("#step1").empty();
                    $("#step1").removeClass("success");
                    $("#step1").append("1");
                    $(".vha-gf-accordion-chd").each(function (index, item) {
                        if ($(item).hasClass("VFDisplayNone") == false) {
                            $(item).addClass("VFDisplayNone");
                        }
                    });
                    $(".vha-arrow").removeClass("vha-arrow-down");
                    $("#vha-ts-device-hd").next().removeClass("VFDisplayNone");
                    $("#vha-ts-device-hd").find(".vha-arrow").addClass("vha-arrow-down");
                });
                $("#step2").on("click", function () {
                    $("#step2").addClass("active");
                    $("#step1").removeClass("active");
                    $("#step1").empty();
                    $("#step1").addClass("success");
                    $("#step1").append("&#10003;");
                    window.sBypass1 = "N";
                    $("#vha-ts-planconfig-hd").trigger("click");
                    window.sBypass1 = "";
                });
                var AppletName = "VHA Shipping Address Details Applet - 3 Step Upgrade";
                var App = SiebelApp.S_App.GetActiveView().GetApplet(AppletName);
                var pm = App.GetPModel();
                //$('[aria-labelledby="VF_Intelligence_Search_Address_Label"]').autocomplete({//SBABU
				$('[name='+pm.Get("GetControls")["VF Intelligence Search Address"].GetInputName()+']').autocomplete({
                    source: function (request, response) {
                        var sResp = VHAAppUtilities.doSearchAddress(request, "physical");
                        if (sResp != false) {
                            response(sResp);
                        } else {
                            response([]);
                        }
                        mSetPrflAttr("QAS Query Executed", "Y");
                    },
                    minLength: 10,
                    select: function (event, ui) {
                        var sResp = VHAAppUtilities.getAddress(ui);
                        if (sResp != false) {
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            Inputs.SetProperty("ViewName", SiebelApp.S_App.GetActiveView().GetName());
                            Inputs.SetProperty("Action", "ShipAddress");
                            mSetPrflAttr("VFPostCodeAttr", "Y");
                            mSetPrflAttr("QAS Pick DTS", "Y");
                            mSetPrflAttr("VHAPSMAShipIdent", "Y");
                            var sErr = VHAAppUtilities.updateAddress(sResp, Inputs);
                            mSetPrflAttr("VHAPSMAShipIdent", "");
                            if (sErr != false) {
                                var App = SiebelApp.S_App.GetActiveView().GetApplet(GetActiveCreditAppletName());
                                if (App != "" && App != null) {
                                    pm.Get("GetBusComp").SetFieldValue(App.GetControl("VF Intelligence Search Address").GetFieldName(), "");
                                    return false;
                                }
                            }
                        }
                        var sPPAFlag = $("input[aria-label='Pick Primary Address']").val();
                        if (sPPAFlag == "Y") {
                            $("input[aria-label='Pick Primary Address']").click();
                            $("input[aria-label='Pick Primary Address']").closest("td").click();
                        }
                    }
                });
                function mSetPrflAttr(name, val) {
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    var Output = SiebelApp.S_App.NewPropertySet();
                    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                    Inputs.SetProperty("Service Name", "SIS OM PMT Service");
                    Inputs.SetProperty("Method Name", "Set Profile Attribute");
                    Inputs.SetProperty("Profile Attribute Name", name);
                    Inputs.SetProperty("Profile Attribute Value", val);
                    var Output = ser.InvokeMethod("Run Process", Inputs);
                }
                var AppletName = "VHA Shipping Address Details Applet - 3 Step Upgrade";
                var ShipingApplet = SiebelApp.S_App.GetActiveView().GetApplet(AppletName);
                var ManualDeliveryCtrl = $("input[name='" + ShipingApplet.GetControl("Manual Delivery Address").GetInputName() + "']");
                var IntelligentSearchAddressCtrl = $("input[name='" + ShipingApplet.GetControl("VF Intelligence Search Address").GetInputName() + "']");
                var App = SiebelApp.S_App.GetActiveView().GetApplet(AppletName);
                var pm = App.GetPModel();
                $("input[name='" + ShipingApplet.GetControl("Manual Address Entry").GetInputName() + "']").click(function () {
                    var IsValidSearch = SiebelApp.S_App.GetProfileAttr("QAS Query Executed");
                    if (IsValidSearch == "Y") {
                        VFTaskSessionVariable.SetValue(AppletName + "_QASSearchContextFlag", "Y");
                    }
                    if ($(this).is(":checked")) {
                        if (VFTaskSessionVariable.GetValue("VHA Shipping Address Details Applet - 3 Step Upgrade" + "_QASSearchContextFlag") == "Y") {
                            ManualDeliveryCtrl.attr("readonly", "readonly").closest("tr").show();
                            $('span[id^=Manual_Delivery_Address_Label]').parent().show();
                            $("input[aria-label='Manual Address Ident']").hide();
                            VFTaskSessionVariable.SetValue("VHA Shipping Address Details Applet - 3 Step Upgrade" + "_ManualAddressChecked", "Y");
                            IntelligentSearchAddressCtrl.closest("tr").hide();
                            $("span#VF_Intelligence_Search_Address_Label").parent().hide();
                            var ManualAddressControl = ShipingApplet.GetControl("Manual Delivery Address");
                            var ManualAddressCtrlVal = pm.ExecuteMethod("GetFieldValue", ManualAddressControl);
                            pm.ExecuteMethod("SetFormattedValue", ShipingApplet.GetControl("VF Intelligence Search Address"), ManualAddressCtrlVal);
                            if (App != "" && App != null) {
                                pm.Get("GetBusComp").SetFieldValue(App.GetControl("Manual Address Ident").GetFieldName(), "Y");
                                pm.Get("GetBusComp").WriteRecord();
                                $("input[aria-label='Manual Address Ident']").hide();
                            }
                            $(this).prop("checked", true);
                        } else {
                            $("input[aria-label='Manual Address Entry']").click();
                            alert("Please do PSMA Search atleast once to proceed further");
                            return false;
                        }
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        var Output = SiebelApp.S_App.NewPropertySet();
                        var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                        Inputs.SetProperty("Service Name", "SIS OM PMT Service");
                        Inputs.SetProperty("Method Name", "Set Profile Attribute");
                        Inputs.SetProperty("Profile Attribute Name", "VFPostCodeAttr");
                        Inputs.SetProperty("Profile Attribute Value", "N");
                        var Output = ser.InvokeMethod("Run Process", Inputs);
                    } else {
                        ManualDeliveryCtrl.attr("readonly", "readonly").closest("tr").hide();
                        $('span[id^=Manual_Delivery_Address_Label]').parent().hide();
                        IntelligentSearchAddressCtrl.closest("tr").show();
                        $("span#VF_Intelligence_Search_Address_Label").parent().show();
                        VFTaskSessionVariable.SetValue("VHA Shipping Address Details Applet - 3 Step Upgrade" + "_ManualAddressChecked", "N");
                        IntelligentSearchAddressCtrl.removeAttr("readonly");
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        var Output = SiebelApp.S_App.NewPropertySet();
                        var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                        Inputs.SetProperty("Service Name", "SIS OM PMT Service");
                        Inputs.SetProperty("Method Name", "Set Profile Attribute");
                        Inputs.SetProperty("Profile Attribute Name", "VFPostCodeAttr");
                        Inputs.SetProperty("Profile Attribute Value", "Invalid");
                        var Output = ser.InvokeMethod("Run Process", Inputs);
                        if (App != "" && App != null) {
                            pm.Get("GetBusComp").SetFieldValue(App.GetControl("Manual Address Ident").GetFieldName(), "");
                            pm.Get("GetBusComp").WriteRecord();
                            $("input[aria-label='Manual Address Ident']").hide();
                        }
                    }
                });
                $("#vha-ts-device-hd").on("click", function () {
                    $("#step1").addClass("active");
                    $("#step2").removeClass("active");
                    $("#step1").empty();
                    $("#step1").removeClass("success");
                    $("#step1").append("1");
                });
                $("#vha-ts-planconfig-hd, #vha-ts-access-hd,#vha-ts-sharingh-hd,#vha-ts-prepayment-hd").on("click", function () { //?? Balaji M
                    if (validation()) {
                        $("#vha-guided-wizard li:nth-child(1)").removeClass("active");
                        $("#vha-guided-wizard li:nth-child(1)").addClass("done");
                        $("#vha-guided-wizard li:nth-child(2)").addClass("active");
                        if ($(this).attr("id") == "vha-ts-planconfig-hd") {
                            var deviceStockInd = tsintitialData.OrderHeader.Device.StockIndicator == "Out of Stock" && tsintitialData.OrderHeader.Device.EligibleOrderLineItem == "Y";
                            var accessStockInd = tsintitialData.OrderHeader.Accessories.filter(function (a) {
                                return a.Name == "Accessory" && a.StockIndicator == "Out of Stock" && a.EligibleOrderLineItem == "Y";
                            });
                            var secDeviceStockInd = tsintitialData.OrderHeader.SecondaryDevices.filter(function (a) {
                                return a.Name == "Accessory" && a.StockIndicator == "Out of Stock" && a.EligibleOrderLineItem == "Y";
                            });
                            var addSIMStockInd = tsintitialData.OrderHeader.AddSIM.StockIndicator == "Out of Stock" && tsintitialData.OrderHeader.AddSIM.EligibleOrderLineItem == "Y";
                            if (deviceStockInd || accessStockInd.length > 0 || secDeviceStockInd.length > 0 || addSIMStockInd) {
                                $("#vha-ts-shipping").removeClass("VFDisplayNone");
                            } else {
                                $("#vha-ts-shipping").addClass("VFDisplayNone");
                            }
                            if (window.sBypass1 != "N") {
                                window.sOnSetUI = "Y";
                                window.sBypass = "Y";
                                var sResult = TwoWaySMSvalidation();
                                window.sBypass = "";
                            }
                            if (window.sAccordion == "Y") {
                                var RefreshService = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                                var RInps = SiebelApp.S_App.NewPropertySet();
                                var ROups = SiebelApp.S_App.NewPropertySet();
                                RefreshService.InvokeMethod("RefreshCurrentApplet", RInps, ROups);
                                window.sAccordion = "";
                            }
                        }
                    }
                });
                $(".vhatsstockindicator").on("click", function () {
                    $(".vhatsstockindicator.applet-button-active").removeClass("applet-button-active").addClass("applet-button-passive");
                    $(this).addClass("applet-button-active").removeClass("applet-button-passive");
                });
                $(".vha-ts-plantypebtn").off("click").on("click", "button.vhatsplantype", function () {
                    $(".vhatsplantype").removeClass("applet-button-active");
                    $(this).addClass("applet-button-active");
                    $("#ts-plan-search").val("");
                    var planFilter = [];
                    var sFilterTxt = $(this).text();
                    if (sFilterTxt == "Cap") {
                        sFilterTxt = "Vodafone Caps";
                    }
					// Hari Added for pega 31/Aug/2024

					if (sFilterTxt === "Recommendations" && nestedData.length ===0) {
						// Make api call to show pega plans
						var sCustomerID = TheApplication().GetProfileAttr("CustomerAccountIdPega");
						var svc = TheApplication().GetService("Workflow Process Manager");
						var Input = TheApplication().NewPropertySet();
						//var Output = TheApplication().NewPropertySet();
						Input.SetProperty("ProcessName", "VHA REST API Wrapper Workflow");
						Input.SetProperty("Transaction Name", "VHAPegaInteractionRESTAPI");
						Input.SetProperty("Configuration List Type", "VHA_CMID_REST_API");
						Input.SetProperty("CustomerID", sCustomerID);		
					    var Output = svc.InvokeMethod("RunProcess", Input);
						var ResponseFromAPI = Output?.childArray[0]?.childArray[0]?.childArray[0]?.childArray[0]?.childArray;
						var HTTPErrorCode = Output.propArray.HTTPErrorCode;
						if(HTTPErrorCode === '200'){
						 if(ResponseFromAPI.length >0){
							var newarray = [];
							// Group objects by interactionID
						/*	var grouped = ResponseFromAPI.reduce((acc, { propArray }) => {
								const InteractionID = propArray.InteractionID;
								acc[InteractionID] = acc[InteractionID] || [];
								acc[InteractionID].push(propArray);
								return acc;
							}, {}); */
							const grouped = ResponseFromAPI.reduce((acc, { propArray }) => {
								const { InteractionID, BundleName, Outcome } = propArray;
								if (Outcome === "Accepted") {
									const key = `${InteractionID}_${BundleName}_${Outcome}`;
									acc[key] = acc[key] || [];
									acc[key].push(propArray);
								}
								return acc;
							}, {});
							for (var key in grouped) {
								var objects = grouped[key];
								var obj = {};
							   
								// Check conditions for each object in the group
								objects.forEach(function(item) {
									
									obj.Channel = item.Channel;
									
									obj.Direction = item.Direction;
									
									obj.ExternalID = item.ExternalID;
									obj.Group = item.Group;
									obj.Identifier = item.Identifier;
									
									obj.Issue = item.Issue;
									if (item.BundleParent === "true") {										
										obj.bundlename = item.Name;										
										obj.BundleParent = item.BundleParent;
									}
									if (item.BundleParent === "false" && item.RewardValue !== "0.0") {
										obj.summary = item.Name;
										obj.RewardValue = item.RewardValue;
										obj.KeyCode = item.KeyCode;
										obj.RewardTerm = item.RewardTerm;
										obj.dis_SamproductId = item.SAM_Product_ID;	
										obj.CoexistenceFlag = item.CoexistenceFlag;
										obj.OutcomeDateTime = item.OutcomeDateTime;
										obj.EndDateTime = item.EndDateTime;
										obj.StackabilityFlag = item.StackabilityFlag;
										obj.RewardUOM = item.RewardUOM;
										obj.ContextID = item.MSISDN;
										obj.interactionID = item.InteractionID;
										
										obj.ResponseReason = item.OutcomeReason;
										obj.Label = item.Label;
										
									}
									if (item.BundleParent === "false" && item.RewardValue === "0.0") {
										obj.OfferType = item.OfferType;
										obj.planname = item.Name;
										obj.SAM_Product_ID = item.SAM_Product_ID;
										obj.Response = item.Outcome;
										obj.Source = item.Source;
										
									}
								});
							 
								if (Object.keys(obj).length > 0) {
									newarray.push(obj);
								}
							}
							
							var currjourney="";
							var journey= tsintitialData.OrderHeader.UpgradeOfferType;
							if(journey ==="Upgrade to New plan" || journey ==="Resign" || journey ==="RRP on Installment"){
								currjourney = "Upgrade";
							}
							var  filteredarray = newarray.filter((item)=> {
								return item.BundleParent === "true" && item.OfferType ===currjourney && item.Source ==="Pega" && item.Response==="Accepted"
							});
							Pegafilteredarray = filteredarray;
							// filter plans for pega recommendations 
							for (let i = 0; i < filteredarray.length; i++) {
								for (let j = 0; j < sRsnBasedplnresp.length; j++) {
									if (sRsnBasedplnresp[j]._source.Plan_Code.toLowerCase() === filteredarray[i].SAM_Product_ID.toLowerCase()) {
										nestedData.push(sRsnBasedplnresp[j]);
									}
								}
							}
							// nestedData = PegaRecommendOffers(filteredarray);
						  }
						}
						else{
							switch (HTTPErrorCode) {
								case "400":
									alert('3 Step Upgrade has encountered an error retrieving Accepted Recommendations.  Please try again. If the problem persists, please contact IT support quoting the following error: “3 Step Upgrade/Pega error code 400: Bad Request”');
									break;
								case "403":
									alert('3 Step Upgrade has encountered an error retrieving Accepted Recommendations.  Please try again. If the problem persists, please contact IT support quoting the following error: “3 Step Upgrade/Pega error code 403: Forbidden”');
									break;
								case "404":
									alert('3 Step Upgrade has encountered an error retrieving Accepted Recommendations.  Please try again. If the problem persists, please contact IT support quoting the following error: “3 Step Upgrade/Pega error code 404: Not Found”');
									break;
								case "500":
									alert('3 Step Upgrade has encountered an error retrieving Accepted Recommendations.  Please try again. If the problem persists, please contact IT support quoting the following error: “3 Step Upgrade/Pega error code 500: Internal Server Error”');
									break;
								case "429":
									alert('You have sent too many requests.  Please wait and then try again. If the problem persists, please contact IT support quoting the following error: “3 Step Upgrade/Pega error code 429: Too Many Requests”');
									break;
							    default:
									alert('3 Step Upgrade has encountered an unexpected error retrieving Accepted Recommendations.  Please try again.If the problem persists, please contact IT support quoting the following error: “3 Step Upgrade/Pega Unexpected Error” and describe your actions before the error appears.');
							                                    
							}
						}
							
					}
                    if (sFilterTxt != "Other") {
                        for (i = 0; i < sRsnBasedplnresp.length; i++) {
                            if (sRsnBasedplnresp[i]._source.Plan_Type.toLowerCase() == sFilterTxt.toLowerCase()) {
                                planFilter.push(sRsnBasedplnresp[i]);
                            }
                        }
                    } else {
                        if (sFilterTxt == "Other") {
                            for (i = 0; i < sRsnBasedplnresp.length; i++) {
                                if (!["vodafone caps", "red plus", "red", "member proposition"].includes(sRsnBasedplnresp[i]._source.Plan_Type.toLowerCase())) {
                                    planFilter.push(sRsnBasedplnresp[i]);
                                }
                            }
                        }
                    }
                    
					if (sFilterTxt === "Recommendations") {
						selectedplanTxt = "Recommendations";
						pegaflag = "Y";
						createPlanTiles(nestedData);
					}
						
					else{
						selectedplanTxt = "Others";
						pegaflag = "N";
						createPlanTiles(planFilter);
					}
						
                });
                $(".vha-ts-plan-select").on("change", ".vha-ts-searchplan", function () {
                    var planFilter = [];
                    if ($(this).val() != "") {
                        for (i = 0; i < sRsnBasedplnresp.length; i++) {
                            if (sRsnBasedplnresp[i]._source.Plan_Name.toLowerCase().indexOf($(this).val().toLowerCase()) > -1) {
                                planFilter.push(sRsnBasedplnresp[i]);
                            }
                        }
                    } else {
                        planFilter = sRsnBasedplnresp;
                    }
                    createPlanTiles(planFilter);
                });
                $(".ts-roaming-method").on("click", ".applet-button", {}, function () {
                    if ($(this).hasClass("applet-button-active")) {
                        return;
                    }
                    tsintitialData.OrderHeader.RoamingProduct = $(this).text() !== "Off" ? $(this).text() : "";
                    $(".ts-roaming-method .applet-button-active").removeClass("applet-button-active").addClass("applet-button-passive");
                    $(this).addClass("applet-button-active").removeClass("applet-button-passive");
                });
                $(".ts-discounts-method").on("click", ".applet-button", {}, function () {
                    if ($(this).hasClass("applet-button-active")) {
                        return;
                    }
                    tsintitialData.OrderHeader.RecurringDiscount_SAM1569.EligibleOrderLineItem = "N";
                    tsintitialData.OrderHeader.RecurringDiscount_AUX0207.EligibleOrderLineItem = "N";
                    tsintitialData.OrderHeader.RecurringDiscount_AUX1414.EligibleOrderLineItem = "N";
                    tsintitialData.OrderHeader.RecurringDiscount_AUV0450.EligibleOrderLineItem = "N";
                    tsintitialData.OrderHeader.RecurringDiscount_AUV0451.EligibleOrderLineItem = "N";
                    tsintitialData.OrderHeader.RecurringDiscount_AUV0452.EligibleOrderLineItem = "N";
					tsintitialData.OrderHeader.RecurringDiscount_AUV0535.EligibleOrderLineItem = "N";
                    $(".cart-discount-restrict").addClass("VFDisplayNone");
                    $(".cart-discount-restrict .vha-ts-cartval span").text("0.00");
                    if (!addOnLoaded) {
                        mgetAddonsList("N");
                    }
                    $(".ts-discounts-method .applet-button-active").removeClass("applet-button-active").addClass("applet-button-passive");
                    $(this).addClass("applet-button-active").removeClass("applet-button-passive");
                    var val = $(this).attr("val");
                    tsintitialData.OrderHeader.RestrictedDiscountType.RestDiscType = val;
                    switch (val) {
                    case "Recurring":
                        $(".ts-product-selection").removeClass("VFDisplayNone");
                        setupRestrictedDiscount();
                        break;
                    default:
                        tsintitialData.OrderHeader.RecurringDiscount_SAM1569.EligibleOrderLineItem = "N";
                        tsintitialData.OrderHeader.RecurringDiscount_AUX0207.EligibleOrderLineItem = "N";
                        tsintitialData.OrderHeader.RecurringDiscount_AUX1414.EligibleOrderLineItem = "N";
                        tsintitialData.OrderHeader.RecurringDiscount_AUV0450.EligibleOrderLineItem = "N";
                        tsintitialData.OrderHeader.RecurringDiscount_AUV0451.EligibleOrderLineItem = "N";
                        tsintitialData.OrderHeader.RecurringDiscount_AUV0452.EligibleOrderLineItem = "N";
						tsintitialData.OrderHeader.RecurringDiscount_AUV0535.EligibleOrderLineItem = "N";
                        $(".ts-product-selection").addClass("VFDisplayNone");
                        $(".cart-discount-restrict").addClass("VFDisplayNone");
                        $(".cart-discount-restrict .vha-ts-cartval span").text("0.00");
                        updateSessionDetails(0.00, "RestrictedDiscount", "Add");
                    }
                    totalIndicativeCostCalc();
                });
                $(".ts-data-addon-method").on("click", ".applet-button", {}, function () {
                    if ($(this).hasClass("applet-button-active")) {
                        return;
                    }
                    $("#ts-feature-config-addon").val("");
                    tsintitialData.OrderHeader.DataAddOns.EligibleOrderLineItem = "N";
                    updateSessionDetails(0, "DataAddOns", "Add");
                    totalIndicativeCostCalc();
                    if (!addOnLoaded) {
                        mgetAddonsList("N");
                    }
                    $(".ts-data-addon-method .applet-button-active").removeClass("applet-button-active").addClass("applet-button-passive");
                    $(this).addClass("applet-button-active").removeClass("applet-button-passive");
                    var val = $(this).attr("val");
                    tsintitialData.OrderHeader.DataAddOns.AddOnType = val;
                    var featrueConfigAddon = "#ts-feature-config-addon";
                    var featureDropDown = ".ts-addon-drop-down";
                    var container = ".ts-data-addon-container";
                    $(container).removeClass("VFDisplayNone");
                    $(".cart-data-addons .vha-ts-cartval").text("$ " + "0.00");
                    switch (val) {
                    case "OneOff":
                        $(featrueConfigAddon).autocomplete({
                            source: addOnData.dataOneOff.map(function (a) {
                                return {
                                    label: a.name,
                                    value: a.name,
                                    chargeType: a.chargeType,
                                    dollar: a.dollar,
                                    type: "data",
                                    GbProdId: a.GbProdId,
                                    ProdId: a.ProdId,
                                    SamId: a.SamId
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $(featureDropDown).click(dropDownTrigger);
                        break;
                    case "Recurring":
                        $(featrueConfigAddon).autocomplete({
                            source: addOnData.dataRecurring.map(function (a) {
                                return {
                                    label: a.name,
                                    value: a.name,
                                    chargeType: a.chargeType,
                                    dollar: a.dollar,
                                    type: "data",
                                    GbProdId: a.GbProdId,
                                    ProdId: a.ProdId,
                                    SamId: a.SamId
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $(featureDropDown).click(dropDownTrigger);
                        break;
                    default:
                        $(container).addClass("VFDisplayNone");
                        tsintitialData.OrderHeader.DataAddOns.EligibleOrderLineItem = "N";
                        updateSessionDetails(0, "DataAddOns", "Add");
                        totalIndicativeCostCalc();
                        $(".cart-data-addons").addClass("VFDisplayNone");
                        $(".cart-data-addons .vha-ts-cartval").text("$ " + "0.00");
                        break;
                    }
                });
                $(".ts-international-call-method").on("click", ".applet-button", {}, function () {
                    if ($(this).hasClass("applet-button-active")) {
                        return;
                    }
                    $("#ts-feature-config-idd").val("");
                    tsintitialData.OrderHeader.IddAddOns.EligibleOrderLineItem = "N";
                    updateSessionDetails(0, "IddAddOns", "Add");
                    totalIndicativeCostCalc();
                    if (!addOnLoaded) {
                        mgetAddonsList("N");
                    }
                    $(".ts-international-call-method .applet-button-active").removeClass("applet-button-active").addClass("applet-button-passive");
                    $(this).addClass("applet-button-active").removeClass("applet-button-passive");
                    var val = $(this).attr("val");
                    tsintitialData.OrderHeader.IddAddOns.AddOnType = val;
		    var featureConfigIdTerm = "#ts-feature-config-termidd";//vasavi added for PKE
		    var featureDropDownTerm = ".ts-termidd-drop-down";//vasavi added for PKE
		    var containerTerm = ".ts-data-addonterm-container";//vasavi added for PKE
                    var featureConfigIdd = "#ts-feature-config-idd";
                    var featureDropDown = ".ts-idd-drop-down";
                    var container = ".ts-idd-addon-container";
                    $(container).removeClass("VFDisplayNone");
		    $(containerTerm).removeClass("VFDisplayNone");//vasavi added for PKE
                    $(".cart-idd-addons .vha-ts-cartval").text("$ " + "0.00");
                    switch (val) {
                    case "OneOff":
		        $(containerTerm).addClass("VFDisplayNone");//vasavi added for PKE
                        $(featureConfigIdd).autocomplete({
                            source: addOnData.iddOneOff.map(function (a) {
                                return {
                                    label: a.name,
                                    value: a.name,
                                    chargeType: a.chargeType,
                                    dollar: a.dollar,
                                    type: "idd",
                                    GbProdId: a.GbProdId,
                                    ProdId: a.ProdId,
                                    SamId: a.SamId
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $(featureDropDown).click(dropDownTrigger);
                        break;
                    case "Recurring":
                        $(featureConfigIdd).autocomplete({
                            source: addOnData.iddRecurring.map(function (a) {
                                return {
                                    label: a.name,
                                    value: a.name,
                                    chargeType: a.chargeType,
                                    dollar: a.dollar,
                                    type: "idd",
                                    GbProdId: a.GbProdId,
                                    ProdId: a.ProdId,
                                    SamId: a.SamId
                                };
                            }),
                            minLength: 0,
                            select: selectAutoCompleteVal
                        });
                        $(featureDropDown).click(dropDownTrigger);
			//vasavi added for PKE
                        var period = new Array;
                            for (var i = 1; i <= 36; i++) {
                                period.push(i);
                            }
            				$(featureConfigIdTerm).autocomplete({
                                source: period.map(function (a) {
                                    return {
                                         label: a,
                                         value: a,
                                         type: "iddTerm"
                                    };
                                }),
                                minLength: 0,
                                select: selectAutoCompleteVal
                            });
                            $(featureDropDownTerm).click(dropDownTrigger);
                        break;
                    default:
                        $(container).addClass("VFDisplayNone");
			$(containerTerm).addClass("VFDisplayNone");//vasavi added for PKE
                        tsintitialData.OrderHeader.IddAddOns.EligibleOrderLineItem = "N";
                        updateSessionDetails(0, "IddAddOns", "Add");
                        totalIndicativeCostCalc();
                        $(".cart-idd-addons").addClass("VFDisplayNone");
                        $(".cart-idd-addons .vha-ts-cartval").text("$ " + "0.00");
                        break;
                    }
                });
                $("#vha-ts-d-carousel-container").off("change").on("change", "select#vhatscolour", function () {
                    $(this).parent().parent().next().find("button.vha-ts-d-shopaddtocartbtn").attr("color", $(this).val());
                    var sDviceName = $(this).parent().parent().find(".vha-ts-d-name").text();
                    for (i = 0; i < filtereddevicesresponse.length; i++) {
                        if (filtereddevicesresponse[i]._source.Source_Product_Name == sDviceName && filtereddevicesresponse[i]._source.Capacity == $(this).parent().find("select#vhatscapacity").val() && filtereddevicesresponse[i]._source.Color == $(this).val()) {
                            $(this).parent().parent().next().find("[id^=vha-ts-d-amt]").text(mTruncate(parseFloat(filtereddevicesresponse[i]._source.RRP_inc_gst / 36).toString()));
                            $(this).parent().parent().next().find("[id^=vha-ts-d-desc] span").text(filtereddevicesresponse[i]._source.RRP_inc_gst);
                            $(this).parent().parent().next().find(".vha-ts-d-shopaddtocartbtn").attr("price", filtereddevicesresponse[i]._source.RRP_inc_gst);
                        }
                    }
                });
                $("#vha-ts-d-carousel-container").on("change", "select#vhatscapacity", function () {
                    var sDviceName = $(this).parent().parent().find(".vha-ts-d-name").text();
                    var distinctClr = [];
                    var distinctColordtl = [];
                    $(this).next().empty();
                    for (i = 0; i < filtereddevicesresponse.length; i++) {
                        if (filtereddevicesresponse[i]._source.Source_Product_Name == sDviceName && filtereddevicesresponse[i]._source.Capacity == $(this).val()) {
                            var sColor = Object.values(filtereddevicesresponse)[i]._source.Color;
                            var prodCd = Object.values(filtereddevicesresponse)[i]._source.Product_Code;
                            var recmdcolor = Object.values(filtereddevicesresponse)[i]._source.RecommendedColor;
                            if (!distinctClr.includes(sColor)) {
                                distinctClr.push(sColor);
                                var colour = filtereddevicesresponse[i]._source.Color;
                                distinctColordtl.push({
                                    color: sColor,
                                    productcode: prodCd,
                                    recmdcolor: recmdcolor
                                });
                            }
                        }
                    }
                    if (distinctColordtl[0].recmdcolor != "") {
                        for (var i = 0; i < distinctColordtl.length; i++) {
                            if (distinctColordtl[0].recmdcolor == distinctColordtl[i].color) {
                                var recommendedColor = distinctColordtl[i];
                                distinctColordtl.splice(i, 1);
                                distinctColordtl.unshift(recommendedColor);
                            }
                        }
                    }
                    if (distinctColordtl.length > 0) {
                        for (var i = 0; i < distinctColordtl.length; i++) {
                            $(this).next().append('<option  name="colouroptn" value="' + distinctColordtl[i].color + '"  skuid="' + distinctColordtl[i].productcode + '">' + distinctColordtl[i].color + "</option>");
                        }
                    }
                    $(this).parent().parent().next().find("button.vha-ts-d-shopaddtocartbtn").attr("capacity", $(this).val());
                    $(this).parent().parent().next().find("button.vha-ts-d-shopaddtocartbtn").attr("color", distinctColordtl[0].color);
                    for (i = 0; i < filtereddevicesresponse.length; i++) {
                        if (filtereddevicesresponse[i]._source.Source_Product_Name == sDviceName && filtereddevicesresponse[i]._source.Capacity == $(this).val() && filtereddevicesresponse[i]._source.Color == $(this).parent().find("select#vhatscolour").val()) {
                            $(this).parent().parent().next().find("[id^=vha-ts-d-amt]").text(mTruncate(parseFloat(filtereddevicesresponse[i]._source.RRP_inc_gst / 36).toString()));
                            $(this).parent().parent().next().find("[id^=vha-ts-d-desc] span").text(filtereddevicesresponse[i]._source.RRP_inc_gst);
                            $(this).parent().parent().next().find(".vha-ts-d-shopaddtocartbtn").attr("price", filtereddevicesresponse[i]._source.RRP_inc_gst);
                        }
                    }
                });
                $("#vha-ts-access").on("click", ".vha-ts-a-term", function () {
                    $(".vha-ts-a-term").removeClass("applet-button-active");
                    $(this).addClass("applet-button-active");
                    if (tsintitialData.OrderHeader.Accessories.length > 1) {
                        updateAccessoryTerm();
                    }
                });
                $("#vha-ts-access").on("click", ".vha-ts-sd-term", function () {
                    $(".vha-ts-sd-term").removeClass("applet-button-active");
                    $(this).addClass("applet-button-active");
					
                });
                $("#vha-ts-access").on("click", ".vha-ts-secondarybrand", function () {
                    $(".vha-ts-secondarybrand").removeClass("applet-button-active");
                    $(this).removeClass("applet-button-passive").addClass("applet-button-active");
                    sfilterSecBrand = $(this).text();
                    $("#ts-secondary-model").val("");
                    $("#ts-search-ean").val("");
                    filteredrslt = [];
                    sfilterSecEAN = [];
                    if (sfilterSecBrand == "Others") {
                        for (i = 0; i < result.length; i++) {
                            if (["apple", "samsung", "nokia", "huawei"].indexOf(result[i].make.toLowerCase()) == -1) {
                                filteredrslt.push(result[i]);
                                sfilterSecEAN.push(result[i].ean);
                            }
                        }
                    } else {
                        for (i = 0; i < result.length; i++) {
                            if (result[i].make == sfilterSecBrand) {
                                filteredrslt.push(result[i]);
                                sfilterSecEAN.push(result[i].ean);
                            }
                        }
                    }
                    $("#ts-secondary-model").autocomplete({
                        source: filteredrslt,
                        minLength: 0,
                        select: selectAutoCompleteVal
                    });
                    $("#ts-search-ean").autocomplete({
                        source: sfilterSecEAN,
                        minLength: 0,
                        select: selectAutoCompleteVal,
                        close: function (event, ui) {
                            var sModelEan = $("#ts-search-ean").val();
                            if (sModelEan != "") {
                                for (var i = 0; i < filteredrslt.length; i++) {
                                    if (filteredrslt[i].ean == sModelEan) {
                                        var sLabelVal = filteredrslt[i].value;
                                        var sProductCD = filteredrslt[i].prodcd;
                                        var sMake = filteredrslt[i].make;
                                        $("#ts-secondary-model").data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                                            item: {
                                                label: sLabelVal,
                                                value: sLabelVal,
                                                prodcd: sProductCD,
                                                make: sMake,
                                                ean: sModelEan,
                                                type: "Secondary Device"
                                            }
                                        });
                                        break;
                                    }
                                }
                            }
                        }
                    });
                });
                $("#vha-ts-access").on("click", "#circleplus", function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        shopMultipleAccessory($(this).attr("prodcd"));
                        $("#maskoverlay").styleHide();
                    });
                });
                $("#vha-ts-access").on("click", "#circleminus", function () {
                    $("#Addlimitcount").text("");
                    var sProdCd = $(this).attr("prodcd");
                    if (parseInt($("#quantity[prodcd='" + sProdCd + "']").text()) !== 1) {
                        $("#vha-ts-accsry-equiplmtmsg").text("");
                        $("#vha-ts-accsry-stockerrmsg").text("");
                        $("#quantity[prodcd='" + sProdCd + "']").text(parseInt($("#quantity[prodcd='" + sProdCd + "']").text()) - 1);
                        triggerAccessRemove();
                        for (i = 0; i < accessoryresponse.length; i++) {
                            if (accessoryresponse[i]._source.Accessory_Code == sProdCd) {
                                var deleted = "N";
                                for (k = 0; k < tsintitialData.OrderHeader.Accessories.length; k++) {
                                    if (tsintitialData.OrderHeader.Accessories[k].Accessory__Code == sProdCd && deleted == "N") {
                                        updateSessionDetails([parseFloat(parseFloat(accessoryresponse[i]._source.RRP_inc_gst)).toFixed(2), 1], "AccessoryCost", "Remove");
                                        tsintitialData.OrderHeader.Accessories.splice(k, 1);
                                        deleted = "Y";
                                    } else {
                                        if (tsintitialData.OrderHeader.Accessories[k].Name == "APP Contract") {
                                            tsintitialData.OrderHeader.Accessories[k].Number__of__Accessories -= 1;
                                            tsintitialData.OrderHeader.Accessories[k].Total__Accessories__RRP__Inc__GST = parseFloat(parseFloat(tsintitialData.OrderHeader.Accessories[k].Total__Accessories__RRP__Inc__GST) - parseFloat(accessoryresponse[i]._source.RRP_inc_gst)).toFixed(2);
                                            tsintitialData.OrderHeader.Accessories[k].Contract__Amount = tsintitialData.OrderHeader.Accessories[k].Total__Accessories__RRP__Inc__GST;
                                            tsintitialData.OrderHeader.Accessories[k].Monthly__Repayment = mTruncate(parseFloat(tsintitialData.OrderHeader.Accessories[k].Total__Accessories__RRP__Inc__GST / $(".vha-ts-a-term.applet-button-active").attr("term")).toString());
                                            if (tsintitialData.OrderHeader.Accessories[k].Number__of__Accessories == 0) {
                                                tsintitialData.OrderHeader.Accessories[k].EligibleOrderLineItem = "N";
                                            }
                                        }
                                    }
                                }
                                accssorycount = sSessionData.Accessories.Count;
                                Totalcountvalue(devicecount, plancount, secdevice, accssorycount);
                                $(".vha-ts-accessory .vha-ts-cartval .price").text(parseFloat(sSessionData.Accessories.AccessoryMonthlyPrice).toFixed(2));
                                $(".vha-ts-accessory .count").text(sSessionData.Accessories.Count);
                                $(".vha-ts-accessory .vha-ts-a-payinfo .totalprice").text(parseFloat(sSessionData.Accessories.AccessoryPrice).toFixed(2));
                                $(".vha-ts-accessory .vha-ts-a-payinfo .monthdtl").text(" over " + parseInt($(".vha-ts-a-term.applet-button-active").attr("term")) + " months");
                                $(".tssearchplan").val("");
                                $("#vha-ts-accsry-stockerrmsg").text();
                                var sEqpValue = equipmentLimitValidation();
                                if (sEqpValue > sSessionData.EquipmentLimit) {
                                    var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                                    $("#vha-ts-accsry-equiplmtmsg").text(sErrDtl);
                                }
                                mSetPrepaymentaccordion();
                            }
                        }
                    }
                });
                $(".vha_ts_earlyupfee").off("click").click(function () {
                    $(".vha_ts_earlyupfeeclr").removeClass("vha_ts_earlyupfeeclr");
                    $(this).addClass("vha_ts_earlyupfeeclr");
                    if ($(".vha_ts_earlyupfeeclr").text() == "12") {
                        tsintitialData.OrderHeader.EefMonthRollover.EEFPeriod = $(".vha_ts_earlyupfeeclr").text();
                        tsintitialData.OrderHeader.EefMonthRollover.Name = "EEF 12 Month Rollover";
                        tsintitialData.OrderHeader.EefMonthRollover.EligibleOrderLineItem = "Y";
                    } else {
                        if ($(".vha_ts_earlyupfeeclr").text() == "24") {
                            tsintitialData.OrderHeader.EefMonthRollover.EEFPeriod = $(".vha_ts_earlyupfeeclr").text();
                            tsintitialData.OrderHeader.EefMonthRollover.Name = "EEF 24 Month Rollover";
                            tsintitialData.OrderHeader.EefMonthRollover.EligibleOrderLineItem = "Y";
                        } else {
                            if ($(".vha_ts_earlyupfeeclr").text() == "NA") {
                                tsintitialData.OrderHeader.EefMonthRollover.EligibleOrderLineItem = "N";
                            }
                        }
                    }
                });
                terminateGPPDisp();
                $("#vha-ts-device").hide();
                $(".vha-card-style .vhappbtn").off("click").on("click", function () {
                    if (!$(this).hasClass("applet-button-active")) {
                        resetUI();
                        $(".vhats-d-term[term='36']").trigger("click");
                        $(".vha-card-style .vhappbtn").removeClass("applet-button-active");
                        $(this).addClass("applet-button-active");
                        if ($(this).parent().hasClass("vha-ts-opt")) {
                            tsintitialData.OrderHeader.UpgradeOfferType = $(this).text();
                        }
                        clearJSONObj(["Device", "Upgrade", "GppDeviceContract"]);
                        tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST = 0;
                        tsintitialData.OrderHeader.GppDeviceContract.Contract__Amount = 0;
                        tsintitialData.OrderHeader.RedPlusPlan.Name = "";
                        tsintitialData.OrderHeader.RedPlusPlan.EligibleOrderLineItem = "N";
                        tsintitialData.OrderHeader.RedPlusPlan.PlanPrice = 0;
                        totalIndicativeCostCalc();
                        sUserOptn = $(this).text();
                        var PropositionCode = tsintitialData.OrderHeader.PropositionCode;
                        var sAjaxURL = "";
                        if (sUserOptn == "Resign") {
                            sAjaxURL = "currplndevices";
                            sOfferTyp = "Current Plan with Every Device";
                            $("#vha-ts-device").show();
                            if (PropositionCode == "VFAUPostPayFWA5G")
                                $(".vhats-d-term[term='1']").show();
                            else
                                $(".vhats-d-term[term='1']").hide();
                            $(".vha-ts-plan-select").hide();
                            $("#vha-ts-device .vha-h-line").hide();
                            $("#planid").hide();
                            $(".vha-ts-simonlyupg input[type=checkbox]").prop("disabled", true);
                            $(".vha-ts-simonlyupg input").prop("checked", false);
                            tsintitialData.OrderHeader.PropositionId = "";
                            tsintitialData.OrderHeader.PropositionName = "";
                            addOnLoaded = false;
                            mgetAddonsList("N");
                            mSharingDetails();
                            sCapPlan = currentCustomerPlan == "Vodafone Caps";
                        } else {
                            if (sUserOptn == "RRP on Installment") {
                                sAjaxURL = "rrpdevices";
                                sOfferTyp = "Outright with Every Device";
                                $("#vha-ts-device").show();
                                if (PropositionCode == "VFAUPostPayFWA5G")
                                    $(".vhats-d-term[term='1']").show();
                                else
                                    $(".vhats-d-term[term='1']").hide();
                                $(".vha-ts-plan-select").hide();
                                $("#vha-ts-device .vha-h-line").hide();
                                $("#planid").hide();
                                $(".vha-ts-simonlyupg input[type=checkbox]").prop("disabled", true);
                                $(".vha-ts-simonlyupg input").prop("checked", false);
                                tsintitialData.OrderHeader.PropositionId = "";
                                tsintitialData.OrderHeader.PropositionName = "";
                                addOnLoaded = false;
                                mgetAddonsList("N");
                                mSharingDetails();
                                sCapPlan = currentCustomerPlan == "Vodafone Caps";
                            } else {
                                if (sUserOptn == "Upgrade to New plan") {
                                    sCapPlan = false;
                                    sAjaxURL = "upgradedevices";
                                    sOfferTyp = "Every Valid Plan with Every Device";
                                    $("#vha-ts-device").show();
                                    if (PropositionCode != "VFAUPostPayFWA5G")
                                        $(".vhats-d-term[term='1']").show();
                                    else
                                        $(".vhats-d-term[term='1']").hide();
                                    $("#vha-ts-device .vha-h-line").show();
                                    $(".vha-ts-plan-select").show();
                                    $("#planid").show();
                                    $(".vha-ts-simonlyupg input[type=checkbox]").prop("disabled", false);
                                    $("#step1").addClass("active");
                                    $(".vha-ts-simonlyupg input").prop("checked", false);
                                }
                            }
                        }
                        var devicesettings = {
                            "async": true,
                            "crossDomain": true,
                            "url": "https://" + sESEndPoint + "/" + sAjaxURL + "/_search",
                            "method": "POST",
                            "headers": {
                                "content-type": "application/json",
                                "cache-control": "no-cache",
                                "postman-token": "dd0b3ba5-1198-5a10-3472-8119a5d93f7c"
                            },
                            "processData": false,
                            "data": '{\r\n    "size": 10000,\r\n    "query": {\r\n        "match_all": {\r\n            }\r\n    }\r\n}'
                        };
                        $.ajax(devicesettings).done(function (dvcresponse) {
                            devicesresponse = dvcresponse;
                            filterBrand = "Apple";
                            filterDevices();
                            if (sessionType == "Paused") {
                                if (pausedDetails.OrderHeader.Device.Device__Code != "") {
                                    filtereddevicesresponse = [];
                                    for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                                        if (Object.values(devicesresponse.hits.hits)[i]._source.Product_Code == pausedDetails.OrderHeader.Device.Device__Code) {
                                            filtereddevicesresponse.push(Object.values(devicesresponse.hits.hits)[i]);
                                        }
                                    }
                                    createDeviceTiles();
                                }
                            }
                            var globaldistinctmodels = [];
                            for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                                if (!globaldistinctmodels.includes(Object.values(devicesresponse.hits.hits)[i]._source.Source_Product_Name)) {
                                    var prodName = Object.values(devicesresponse.hits.hits)[i]._source.Source_Product_Name.toLowerCase();
                                    if (prodName != "non device" && prodName.indexOf("kogan") == -1) {
                                        globaldistinctmodels.push(Object.values(devicesresponse.hits.hits)[i]._source.Source_Product_Name);
                                    }
                                }
                            }
                            $("#ts-device-search").autocomplete({
                                source: globaldistinctmodels.map(function (a) {
                                    return {
                                        label: a,
                                        value: a,
                                        type: "GlobalDeviceSearch"
                                    };
                                }),
                                minLength: 0,
                                select: selectAutoCompleteVal
                            });
                        });
                    }
                });
                $(".vha-ts-btn-div").off("click").on("click", "button.vhatsbrand", function () {
                    $(".vhatsbrand").removeClass("applet-button-active");
                    $(this).addClass("applet-button-active");
                    $("#ts-device-search").val("");
                    filterBrand = $(this).text();
					SiebelApp.S_App.SetProfileAttr("s_Brand",filterBrand); //Ravindra: Dec-2023: Added for 3Step Activity
                    filterDevices();
                });
                $(".vha-ts-btn-div").on("click", ".vhats-d-term", function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        $(".vhats-d-term").removeClass("applet-button-active");
                        $(this).addClass("applet-button-active");
						createDeviceTiles();//vasavi added for PKE000000106117
                        var sDevice = tsintitialData.OrderHeader.Device;
                        if (sDevice.Device__Name != "" && sDevice.Device__Name != "Non Device") {
                            updateDeviceTerm();
                            var sUpdtDiscDtl = refreshCart(priPlanDtl);
                            if (sUpdtDiscDtl) {
                                addDiscounts(sUpdtDiscDtl);
                            }
                        }
                        $("#maskoverlay").styleHide();
                    });
					//Proj:Visa-Start
					/*
					var sVisaAccid = "",sVisaTerm = "",sVisaOrderId = "", sErrMsg = "",ROups = "";
					sVisaAccid = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Account Id");	
					sVisaOrderId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Order Id");										
					sVisaTerm = $(".vhats-d-term.applet-button-active").attr("term");									
					if (sVisaAccid !="36" && sVisaTerm !="36"){										
						var Inputs = SiebelApp.S_App.NewPropertySet();
						var Output = SiebelApp.S_App.NewPropertySet();
						var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
						Inputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service");										
						Inputs.SetProperty("Order Id", sVisaOrderId);
						Inputs.SetProperty("CustId", sVisaAccid);										
						Inputs.SetProperty("TransactionType", "3 Step Upgrade");	
						Inputs.SetProperty("Term", sVisaTerm);	
						Inputs.SetProperty("Method Name", "GetVisaExpiryDate");
						ROups = ser.InvokeMethod("Run Process", Inputs);										
						sErrMsg = ROups.childArray[0].propArray.ErrorMessage; 	
						if (sErrMsg!=""){											
							$(".vha-ts-device-select #vha-ts-d-stockerrmsg").text(sErrMsg);
						}
					}	
					*/
					//Visa end					
                });
                $("#smartwizard").on("vhacustomBtnClick", function (evt, btn) {
                    var btnId = $(btn).attr("id");
                    switch (btnId) {
                    case "vha-tot-pause":
					    if(pegaflag === "Y")
							tsintitialData.OrderHeader.pegaflag ="Y";
						TerminateValueCart = 0;
						pegaflag = "N";
                        var sApp = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
                        tsintitialData.OrderHeader.DealerName = sApp.GetFieldValue("Sales Person");
                        tsintitialData.OrderHeader.VFDealerRowId = sApp.GetFieldValue("Dealer Row Id");
                        tsintitialData.OrderHeader.VFSalesChannelDescription = sApp.GetFieldValue("Sales Channel");
                        tsintitialData.OrderHeader.VFSalesBranchDescription = sApp.GetFieldValue("Sales Branch");
                        var dJSON = createResumeJSON();
                        executeEvent(viewPM, "VHA_PAUSE_ORDER", {
                            "ProcessName": "VHA 3 Step Upgrade Cancel WF",
                            "Json": dJSON,
                            "Event": "Default",
                            "Object Id": SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Id")
                        });
                        break;
                    case "vha-cancel-btn":
						TerminateValueCart=0;
                        $("#VHACaptureLeadDialog").dialog("open");
                        break;
                    case "vha-tot-finish":
						TerminateValueCart=0;
						pegaflag = "N";
                        $("#maskoverlay").styleShow();
                        tssleep(30).then(function () {
                            var sTOTSubPPAmt = tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount;
							//Ravindra: Dec-2023: Added the below code for 3step activity
							var s3StepofferType = tsintitialData.OrderHeader.Upgrade.Offer__Type;
							var s3StepDeviceName = tsintitialData.OrderHeader.GppDeviceContract.Item__Name;
							var s3StepPlanName=  tsintitialData.OrderHeader.RedPlusPlan.Name;
							var s3StepTerm = tsintitialData.OrderHeader.GppDeviceContract.Term;
							var s3stepBrand = SiebelApp.S_App.GetProfileAttr("s_Brand");
							var s3StepRepay = tsintitialData.OrderHeader.GppDeviceContract.Monthly__Repayment; //Ravindra: 14/02/2024: Added FEB PKE
							var s3StepDelAddr = SiebelApp.S_App.GetProfileAttr("VFDeliveryAddr");  //Ravindra: 14/02/2024: Added for FEB PKE
							var sTSPromoCode = $(".vha-ts-promoCode").val(); // Pavithran : 25/06/2024 :: Added for PKE
							var sTSDeviceCode = tsintitialData.OrderHeader.GppDeviceContract.Item__Code; // Pavithran : 25/06/2024 :: Added for PKE
                            if (parseFloat(sTOTSubPPAmt) > 0) {
                                sPrepaymentExists = "Y";
                            } else {
                                sPrepaymentExists = "N";
                            }
                            executeEvent(viewPM, "VHA_SUBMIT_ORDER", {			
                                    
                                "ProcessName": "VHA OM Submit Order Framework - 3 Step Upgrade",
                                "TOTHeaderId": SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Id"),
                                "PrepaymentExists": sPrepaymentExists,
                                "Make": s3stepBrand, 
                                "OfferType": s3StepofferType,
                                "DeviceName": s3StepDeviceName,
                                "PlanName": s3StepPlanName,
                                "PlanTerm": s3StepTerm,
								"DeviceRepay": s3StepRepay,   //Ravindra: 14/02/2024: Added for FEB PKE
								"DelivAddr": s3StepDelAddr,    //Ravindra: 14/02/2024: Added for FEB PKE
								"TSPromoCode" : sTSPromoCode,  // Pavithran : 25/06/2024 :: Added for PKE
								"TSDeviceCode" : sTSDeviceCode // Pavithran : 25/06/2024 :: Added for PKE
                            });
                        });
                        break;
                    }
                });
                $("#smartwizard").on("showStep", function (e, currIndex, stepNum, stepDir) {
                    if (stepDir === "forward") {}
                    $("#_sweview").scrollTop(0);
                });
                var TwoWaySMSvalidation = function () {
                    var sDetlsBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
                    var sOrderId = sDetlsBC.GetFieldValue("Order Id");
                    var deviceStockIndicator = tsintitialData.OrderHeader.Device.StockIndicator == "Out of Stock" ? "Y" : "N";
                    var deviceSelected = tsintitialData.OrderHeader.Device.EligibleOrderLineItem == "Y" ? "Y" : "N";
                    var AddSIM = tsintitialData.OrderHeader.AddSIM.EligibleOrderLineItem == "Y" ? "Y" : "N";
                    var secondaryDevices = tsintitialData.OrderHeader.SecondaryDevices;
                    var OrderSubType = tsintitialData.OrderHeader.OrderSubType;
                    var UpgradeOfferType = tsintitialData.OrderHeader.UpgradeOfferType;
                    var OrderChannel = SiebelApp.S_App.GetProfileAttr("VHA Role Channel");
                    var SiebelProdType = "Voice";
                    var secondaryDeviceSelected = "N";
                    var secondaryDeviceStockIndicator = "N";
                    for (var i = 0; i < secondaryDevices.length; i++) {
                        if (secondaryDevices[i].EligibleOrderLineItem == "Y" && secondaryDevices[i].Name == "Accessory") {
                            secondaryDeviceSelected = "Y";
                            if (secondaryDevices[i].StockIndicator == "Out of Stock") {
                                secondaryDeviceStockIndicator = "Y";
                                break;
                            }
                        }
                    }
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    Inputs.SetProperty("DeviceItem", deviceSelected);
                    Inputs.SetProperty("DeviceOutofStock", deviceStockIndicator);
                    Inputs.SetProperty("SecDeviceItem", secondaryDeviceSelected);
                    Inputs.SetProperty("SecDeviceOutofStock", secondaryDeviceStockIndicator);
                    Inputs.SetProperty("DefaultSIM", AddSIM);
                    Inputs.SetProperty("OrderSubType", OrderSubType);
                    Inputs.SetProperty("OrderChannel", OrderChannel);
                    Inputs.SetProperty("SiebelProdType", SiebelProdType);
                    Inputs.SetProperty("OrderId", sOrderId);
                    Inputs.SetProperty("HeaderId", sSessionId);
                    Inputs.SetProperty("UpgradeOfferType", UpgradeOfferType);
                    Inputs.SetProperty("NewPropSAMId", sPropSamId);
                    var StoreResApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Store Reservation 3 Step Upgrade");
                    if (StoreResApplet.GetRecordSet().length > 0) {
                        if (StoreResApplet.GetRecordSet()[0]['Reservation Status'] == 'Reserved') {
                            Inputs.SetProperty("reservationStatus", StoreResApplet.GetRecordSet()[0]['Reservation Status']);
                        }
                    }
                    var Outs = VHAAppUtilities.CallBS("VHA 3 Step Upgrade Service", "Check2WaySMSEligibility", Inputs);
                    var twoWaySMSEligible = Outs.GetProperty("2WaySMSEligibleFlag");
                    var twoWaySMSMSISDN = Outs.GetProperty("TwoWayMSISDN");
                    tsintitialData.OrderHeader.twoWaySMS.Eligible = twoWaySMSEligible;
                    var twoWaySMSSelectedMSISDN = tsintitialData.OrderHeader.twoWaySMS.MSISDN;
                    var twoWaySMSOverride = tsintitialData.OrderHeader.twoWaySMS.OverrideFlag;
                    $("#twoWaySmsshowMsg").empty();
                    mSetPrflAttr("TwoWaySMSShipmentMSISDNSelected","");
                    mSetPrflAttr("TwoWaySMSShipmentMSISDNSelected",twoWaySMSSelectedMSISDN);
                    if (window.sOnSetUI == "Y") {
                        if (twoWaySMSEligible == "Y") {
                            $(".twowaysms-msisdn").attr("disabled", false);
                            $(".twowaysms-msisdn").attr("readonly", false);
                            $("#vha-ts-2waysms").removeClass("VFDisplayNone");
                            if (window.overrideSMSAccess == "Y") {
                                $("input[id='tickmark1']").attr("readonly", false);
                                $("input[id='tickmark1']").attr("disabled", false);
                            }
                            if ($(".twowaysms-msisdn").val() == "") {
                                $(".twowaysms-msisdn").val(twoWaySMSMSISDN);
                                tsintitialData.OrderHeader.twoWaySMS.MSISDN = twoWaySMSMSISDN;
                            }
                        } else {
                            if (twoWaySMSEligible != "Y") {
                                $(".twowaysms-msisdn").val("");
                                $(".twowaysms-msisdn").attr("disabled", "disabled");
                                $(".twowaysms-msisdn").attr("readonly", "readonly");
                                $("input[id='tickmark1']").attr("readonly", "readonly");
                                $("input[id='tickmark1']").attr("disabled", "disabled");
                                $("#vha-ts-2waysms").addClass("VFDisplayNone");
                            }
                        }
                        window.sOnSetUI = "";
                    }
                    if (window.sBypass != "Y") {
                        if (twoWaySMSEligible == "Y") {
                            $("#vha-ts-2waysms").removeClass("VFDisplayNone");
                        } else {
                            $("#vha-ts-2waysms").addClass("VFDisplayNone");
                        }
                        if (twoWaySMSEligible == "Y" && twoWaySMSOverride == "N" && $(".twowaysms-msisdn").val() == "") {
                            $(".twowaysms-msisdn").attr("disabled", false);
                            $(".twowaysms-msisdn").attr("readonly", false);
                            if (window.overrideSMSAccess == "Y") {
                                $("input[id='tickmark1']").attr("readonly", false);
                                $("input[id='tickmark1']").attr("disabled", false);
                            }
                            $(".twowaysms-msisdn").val(twoWaySMSMSISDN);
                            if ($(".twowaysms-msisdn").val() == "") {
                                $("#twoWaySmsshowMsg").html("Please select a MSISDN for two way SMS");
                                var errFocus = document.querySelector("#twoWaySmsshowMsg");
                                errFocus.focus();
                                errFocus.scrollIntoView();
                                return "ERROR_TWO_WAY_SMS";
                            } else {
                                tsintitialData.OrderHeader.twoWaySMS.MSISDN = twoWaySMSMSISDN;
                            }
                        }
                    }
                    return "NO_ACTION";
                };
                var validateSharingDetails = function () {
                    var SharingDetails = tsintitialData.OrderHeader.Sharing;
                    if (SharingDetails.NewStatus.SharingStatus != "Add Member") {
                        return "NO_ACTION";
                    } else {
                        if (SharingDetails.NewStatus.SharingStatus == "Add Member") {
                            var msisdnSelected = false;
                            for (var i = 0; i < SharingDetails.ExistingMSISDN.length; i++) {
                                if (SharingDetails.ExistingMSISDN[i]["EligibleOrderLineItem"] == "Y") {
                                    msisdnSelected = true;
                                    return "NO_ACTION";
                                }
                            }
                            if (!msisdnSelected) {
                                return "ERROR_SELECT_MSISDN";
                            }
                        }
                    }
                    return "NO_ACTION";
                };
                var createSharingDetails = function () {
                    var SharingDetails = tsintitialData.OrderHeader.Sharing;
                    var ListofSharing = SiebelApp.S_App.NewPropertySet();
                    var SharingInfo = SiebelApp.S_App.NewPropertySet();
                    var OrderInfo = SiebelApp.S_App.NewPropertySet();
                    var SelectedInfo = SiebelApp.S_App.NewPropertySet();
                    var GroupInfo = SiebelApp.S_App.NewPropertySet();
                    ListofSharing.SetType("ListOfSharingInfo");
                    SharingInfo.SetType("SharingInfo");
                    OrderInfo.SetType("OrderInfo");
                    SelectedInfo.SetType("SelectedInfo");
                    GroupInfo.SetType("GroupInfo");
                    OrderInfo.SetProperty("OrderMSISDN", SharingDetails.NewStatus.MSISDN);
                    OrderInfo.SetProperty("SharingFlag", SharingDetails.NewStatus.SharingFlag);
                    OrderInfo.SetProperty("SourceSharingAction", SharingDetails.CurrentStatus.SharingStatus);
                    OrderInfo.SetProperty("SharingAction", SharingDetails.NewStatus.SharingStatus);
                    OrderInfo.SetProperty("SourcePlanCompatibility", SharingDetails.CurrentStatus.SharingCompatability);
                    OrderInfo.SetProperty("DestinationPlanCompatibility", SharingDetails.NewStatus.SharingCompatability);
                    var GroupName = "";
                    for (var i = 0; i < SharingDetails.ExistingMSISDN.length; i++) {
                        if (SharingDetails.ExistingMSISDN[i]["EligibleOrderLineItem"] == "Y") {
                            SelectedInfo.SetProperty("SelectedMSISDN", SharingDetails.ExistingMSISDN[i]["MSISDN"]);
                            SelectedInfo.SetProperty("SharingCompatibility", SharingDetails.ExistingMSISDN[i]["SharingCompatability"]);
                            GroupName = SharingDetails.ExistingMSISDN[i]["GroupName"];
                            break;
                        }
                    }
                    if (SharingDetails.NewStatus["SharingStatus"] == "Remove Member" || SharingDetails.NewStatus["SharingStatus"] == "Existing Member") {
                        GroupInfo.SetProperty("GroupName", $("#sharinggrouplist").val());
                    } else {
                        if (SharingDetails.NewStatus["SharingStatus"] == "Add Member") {
                            GroupInfo.SetProperty("GroupName", SharingDetails.NewStatus.GroupName);
                        } else {
                            GroupInfo.SetProperty("GroupName", GroupName);
                        }
                    }
                    SharingInfo.AddChild(OrderInfo);
                    SharingInfo.AddChild(SelectedInfo);
                    SharingInfo.AddChild(GroupInfo);
                    ListofSharing.AddChild(SharingInfo);
                    return ListofSharing;
                };
                $("#smartwizard").on("leaveStep", function (e, currIndex, stepNum, stepDir) {
                    if (stepDir === "forward") {
                        switch (stepNum) {
                        case 0:
                            //Store reservation is not allowed with Accessory or Secondary Device with payment plan purchase. Please remove selection.
                            var secDevice = tsintitialData.OrderHeader.SecondaryDevices.filter(function (a) {
                                return a.Name == "Accessory";
                            });
                            var accessory = tsintitialData.OrderHeader.Accessories.filter(function (a) {
                                return a.Name == "Accessory";
                            });
                            var aStoreResApp = SiebelApp.S_App.GetActiveView().GetApplet("VHA Store Reservation 3 Step Upgrade");
                            var aStoreResSts = "";
                            if (aStoreResApp.GetRecordSet().length > 0) {
                                aStoreResSts = aStoreResApp.GetRecordSet()[0]['Reservation Status'];
                            }
                            var sApp = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
                            tsintitialData.OrderHeader.DealerName = sApp.GetFieldValue("Sales Person");
                            tsintitialData.OrderHeader.VFDealerRowId = sApp.GetFieldValue("Dealer Row Id");
                            tsintitialData.OrderHeader.VFSalesChannelDescription = sApp.GetFieldValue("Sales Channel");
                            tsintitialData.OrderHeader.VFSalesBranchDescription = sApp.GetFieldValue("Sales Branch");
                            $("#showMsgSharing").empty();
                            if ($("#ts-feature-config-idd").val() == "") {
                                tsintitialData.OrderHeader.IddAddOns.EligibleOrderLineItem = "N";
                            }
                            if ($("#ts-feature-config-addon").val() == "") {
                                tsintitialData.OrderHeader.DataAddOns.EligibleOrderLineItem = "N";
                            }
                            var upgradeData = upgradevalidation();
                            if (reasonvalidation() == false) {
                                e.preventDefault();
                            } else {
                                if (upgradeData == false) {
                                    e.preventDefault();
                                } else {
                                    if (validation() == false) {
                                        e.preventDefault();
                                        $(".vha-gf-accordion-chd").each(function (index, item) {
                                            if ($(item).hasClass("VFDisplayNone") == false) {
                                                $(item).addClass("VFDisplayNone");
                                            }
                                        });
                                        $(".vha-arrow").removeClass("vha-arrow-down");
                                        $("#vha-ts-device-hd").next().removeClass("VFDisplayNone");
                                        $("#vha-ts-device-hd").find(".vha-arrow").addClass("vha-arrow-down");
                                    } else {
                                        if (TwoWaySMSvalidation() == "ERROR_TWO_WAY_SMS") {
                                            e.preventDefault();
                                            window.sBypass1 = "N";
                                            $("#vha-ts-planconfig-hd").trigger("click");
                                            window.sBypass1 = "";
                                        } else {
                                            if (eqpLmtContValidation() == false) {
                                                e.preventDefault();
                                                $(".vha-gf-accordion-chd").each(function (index, item) {
                                                    if ($(item).hasClass("VFDisplayNone") == false) {
                                                        $(item).addClass("VFDisplayNone");
                                                    }
                                                });
                                                $(".vha-arrow").removeClass("vha-arrow-down");
                                                $("#vha-ts-device-hd").next().removeClass("VFDisplayNone");
                                                $("#vha-ts-device-hd").find(".vha-arrow").addClass("vha-arrow-down");
                                            } else {
                                                if (accessoryValidation()) {
                                                    e.preventDefault();
                                                    $(".vha-gf-accordion-chd").each(function (index, item) {
                                                        if ($(item).hasClass("VFDisplayNone") == false) {
                                                            $(item).addClass("VFDisplayNone");
                                                        }
                                                    });
                                                    $(".vha-arrow").removeClass("vha-arrow-down");
                                                    $("#vha-ts-access-hd").next().removeClass("VFDisplayNone");
                                                    $("#vha-ts-access-hd").find(".vha-arrow").addClass("vha-arrow-down");
                                                } else if ($(".vha-ts-storeres #tickmark").prop("checked") && (secDevice.length > 0 || accessory.length > 0)) { //BalajiM -RC
                                                    /*$("#vha-ts-sd-stockerrmsg").text("Accessory & Secondary device option are not available for Store reservation.");
                                                    $("#vha-ts-sd-stockerrmsg").removeClass("text-warning").addClass("text-danger");
                                                    var errFocus = document.querySelector("#vha-ts-sd-stockerrmsg");
                                                    errFocus.focus();
                                                    errFocus.scrollIntoView();*/
                                                    e.preventDefault();
                                                    alert("Accessory & Secondary device option are not available for Store reservation.");
                                                } else if ($(".vha-ts-storeres #tickmark").prop("checked") && aStoreResSts == '') {
                                                    e.preventDefault();
                                                    alert("Please reserve the store stock before proceeding with store reservation");
                                                } else {
                                                    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                                    var Inps = SiebelApp.S_App.NewPropertySet();
                                                    Inps.SetProperty("Service Name", "PRM ANI Utility Service");
                                                    Inps.SetProperty("Method Name", "CreateEmptyPropSet");
                                                    Inps.SetProperty("Hierarchy Name", "VHA 3 Step Upgrade Line Item Details");
                                                    var out = ser.InvokeMethod("Run Process", Inps);
                                                    var SiebelMessage = out.GetChildByType("ResultSet").GetChildByType("SiebelMessage");
                                                    SiebelMessage = mSetOrderHeader(SiebelMessage);
                                                    SiebelMessage = mSetPrepaymentinfo(SiebelMessage);
                                                    var sEmptOrdItemStructure = $.extend(true, {}, SiebelMessage.GetChild(0).GetChild(0).GetChild(0).GetChild(0));
                                                    SiebelMessage = mCreateOrderLineItems(SiebelMessage, SiebelApp.S_App.NewPropertySet());
                                                    SiebelMessage = setTermToZero(SiebelMessage);
                                                    SharingDetails = createSharingDetails();
                                                    SiebelMessage.GetChildByType("ListOfVHA 3 Step Upgrade Line Item Details").GetChildByType("OrderHeader").AddChild(SharingDetails);
                                                    try {
                                                        var sBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Shipment - 3 Step Upgrade");
                                                        sBC.WriteRecord();
                                                        var sID = sBC.GetFieldValue("Id");
                                                        sBC.ClearToQuery();
                                                        sBC.SetSearchSpec("Id", sID);
                                                    } catch (e$0) {}
                                                    var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                                                    var Inputs = SiebelApp.S_App.NewPropertySet();
                                                    Inputs.SetProperty("ProcessName", "VHA Create FulFillment Order - 3 Step Upgrade");
                                                    Inputs.AddChild(SiebelMessage);
                                                    Inputs.SetProperty("Object Id", sSessionId);
                                                    if (tsintitialData.OrderHeader.twoWaySMS.Eligible == "Y") {
                                                        Inputs.SetProperty("2WaySMSMSISDN", tsintitialData.OrderHeader.twoWaySMS.MSISDN);
                                                        Inputs.SetProperty("2WaySMSOverrideFlag", tsintitialData.OrderHeader.twoWaySMS.OverrideFlag);
                                                        Inputs.SetProperty("2WaySMSEligibleFlag", "Y");
                                                    }
                                                    var Output = ser.InvokeMethod("RunProcess", Inputs);
                                                    var resultdata = shipvalidation(Output.GetChildByType("ResultSet").propArray);
                                                    if (resultdata == false) {
                                                        e.preventDefault();
                                                        window.sBypass1 = "N";
                                                        $("#vha-ts-shipping").removeClass("VFDisplayNone");
                                                        $(".vha-gf-accordion-chd").each(function (index, item) {
                                                            if ($(item).hasClass("VFDisplayNone") == false) {
                                                                $(item).addClass("VFDisplayNone");
                                                            }
                                                        });
                                                        $(".vha-arrow").removeClass("vha-arrow-down");
                                                        $("#vha-ts-planconfig-hd").next().removeClass("VFDisplayNone");
                                                        $("#vha-ts-planconfig-hd").find(".vha-arrow").addClass("vha-arrow-down");
                                                        window.sBypass1 = "";
                                                        var errFocus = document.querySelector("#listmsgid");
                                                        errFocus.focus();
                                                        errFocus.scrollIntoView();
                                                    } else {
                                                        if (validateSharingDetails() == "ERROR_SELECT_MSISDN") {
                                                            $("#showMsgSharing").html("Please select a valid existing MSISDN for sharing");
                                                            var errFocus = document.querySelector("#showMsgSharing");
                                                            errFocus.focus();
                                                            errFocus.scrollIntoView();
                                                            e.preventDefault();
                                                            $(".vha-gf-accordion-chd").each(function (index, item) {
                                                                if ($(item).hasClass("VFDisplayNone") == false) {
                                                                    $(item).addClass("VFDisplayNone");
                                                                }
                                                            });
                                                            $(".vha-arrow").removeClass("vha-arrow-down");
                                                            $("#vha-ts-sharingh-hd").next().removeClass("VFDisplayNone");
                                                            $("#vha-ts-sharingh-hd").find(".vha-arrow").addClass("vha-arrow-down");
                                                        } else {
                                                            if (prepaymentValidation() == false) {
                                                                e.preventDefault();
                                                                $(".vha-gf-accordion-chd").each(function (index, item) {
                                                                    if ($(item).hasClass("VFDisplayNone") == false) {
                                                                        $(item).addClass("VFDisplayNone");
                                                                    }
                                                                });
                                                                $(".vha-arrow").removeClass("vha-arrow-down");
                                                                $("#vha-ts-prepayment-hd").next().removeClass("VFDisplayNone");
                                                                $("#vha-ts-prepayment-hd").find(".vha-arrow").addClass("vha-arrow-down");
                                                            } else {
                                                                if (extInsurance != ""){ //Sharan:06/09/2023:CPVT-1149
                                                            		if ($(".vha-keep").prop("checked") == false && $(".vha-remove").prop("checked") == false){
                                                            			$(".ts-addremoveins-method").parent().append("<span id='showMsg'>Select Keep or Remove for the Existing Insurance Devices</span>");
                                                            			var errFocus = document.querySelector(".vha-ins-dtls #showMsg");
                                                                        $(".vha-arrow").removeClass("vha-arrow-down");
                                                                        $("#vha-ts-planconfig-hd").next().removeClass("VFDisplayNone");
                                                                        $("#vha-ts-planconfig-hd").find(".vha-arrow").addClass("vha-arrow-down");
                                                            			errFocus.focus();
                                                            			errFocus.scrollIntoView();
                                                            		}//Sharan:06/09/2023:CPVT-1149
                                                                } 
                                                                $(".sw-cart-sum").addClass("VFDisplayNone");
                                                                $(".mr-auto").css("padding-top", "800px");
                                                                $("#vha-guided-wizard li:nth-child(1)").removeClass("active");
                                                                $("#vha-guided-wizard li:nth-child(1)").addClass("done");
                                                                $("#vha-guided-wizard li:nth-child(2)").removeClass("active");
                                                                $("#vha-guided-wizard li:nth-child(2)").addClass("done");
                                                                $("#vha-guided-wizard").addClass("justify-content-center").removeClass("justify-content-right").css("margin-left", "82px");
                                                                $("#TSNSAEmailNotification").html("");
                                                                var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                                                var Inputs = SiebelApp.S_App.NewPropertySet();
                                                                Inputs.SetProperty("Service Name", "VHA Generate Contract Service");
                                                                Inputs.SetProperty("Method Name", "GenerateNSAContractForUpgrade");
                                                                Inputs.AddChild(SiebelMessage);
                                                                var Output = ser.InvokeMethod("Run Process", Inputs);
                                                                var resultset = Output.GetChildByType("ResultSet");
                                                     //SiebelAppFacade.VHANSA3StepUpgradePR_PDF.createPDF(resultset, "",TerminateValueCart);
													 var dis_samidd = pegaoffDataGlob.dis_SamproductId;
														if(dis_samidd !== undefined && dis_samidd !== null && dis_samidd.trim() !== "")
															dis_samid_flag = "Y";
														else
															dis_samid_flag = "N";
														
							SiebelAppFacade.VHANSA3StepUpgradePR_PDF.createPDF(resultset, "",TerminateValueCart,pegaoffDataGlob,pegaflag,dis_samid_flag);
																
																
																
																var SiebMessage = resultset.GetChildByType("SiebelMessage");			
																var Header = SiebMessage.GetChild(0).GetChild(0);
																var ServiceOrder = Header.GetChild(0).GetChild(0);	
																var sMSISDN = ServiceOrder.GetProperty("MSISDN");			
																sOrderRef = ServiceOrder.GetProperty("OrderRef");
																
																
                                                             //   SiebelApp.S_App.GetActiveView().GetApplet("VHA Order Attachment Modernized List Applet").InvokeMethod("ExecuteQuery");
                                                                var iLen = tsintitialData.OrderHeader.PhoneInsurance.length;
                                                                for (var k = 0; k < iLen; k++) {
                                                                    if (tsintitialData.OrderHeader.PhoneInsurance[k].Prod__Integration__Id == "") {
                                                                        if (tsintitialData.OrderHeader.PhoneInsurance[k].EligibleOrderLineItem == "Y") {
                                                                            var GPPIMEI = tsintitialData.OrderHeader.GppDeviceContract.IMEI___Serial__Number;
                                                                            var GPPIName = tsintitialData.OrderHeader.GppDeviceContract.Item__Name;
                                                                            var NewInsIMEI = tsintitialData.OrderHeader.PhoneInsurance[k].Handset__IMEI;
                                                                            var NewInsDName = tsintitialData.OrderHeader.PhoneInsurance[k].Item__Name;
                                                                            if (GPPIMEI != NewInsIMEI) {
                                                                                tsintitialData.OrderHeader.PhoneInsurance[k].Handset__IMEI = GPPIMEI;
                                                                            }
                                                                            if (GPPIName != NewInsDName) {
                                                                                tsintitialData.OrderHeader.PhoneInsurance[k].Item__Name = GPPIName;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                $("#vha-cancel-btn").addClass("disabled").css("pointer-events", "none");
                                                                $("#vha-tot-pause").addClass("disabled").css("pointer-events", "none");
                                                                $("#vha-tot-finish").addClass("disabled").css("pointer-events", "none");
                                                                $("#vha-guided-wizard").addClass("disabled").css("pointer-events", "none");
																if ($(".vha-ts-simonlyupg input[type=checkbox]").is(":checked")) //Ravindra: 14/02/2024: Added this code for FEB PKE
                                                                {
                                                                    SiebelApp.S_App.SetProfileAttr("s_Brand","");           
                                                                }
                                                                $("#TSOrderStatusMsg").text("Review Order summary while validation in progress....");
					setTimeout(function () {
					SiebelApp.S_App.GetActiveView().GetApplet("VHA Order Attachment Modernized List Applet").InvokeMethod("RefreshBuscomp");
				}, 1000);
                                                                var GetPropertyToJson = function (Inps) {
                                                                    var InpJson = {};
                                                                    var propName = Inps.GetFirstProperty();
                                                                    while (propName != null) {
                                                                        InpJson[propName] = Inps.GetProperty(propName);
                                                                        propName = Inps.GetNextProperty();
                                                                    }
                                                                    return InpJson;
                                                                };
                                                                var processMessage = SiebelMessage;
                                                                var jsonObj = {};
                                                                jsonObj = GetPropertyToJson(processMessage);
                                                                jsonObj["ListOfVHA 3 Step Upgrade Line Item Details"] = {};
                                                                var lineItems = processMessage.GetChild(0).GetChild(0);
                                                                var lineItemCount = lineItems.GetChildCount();
                                                                var siebJson = jsonObj["ListOfVHA 3 Step Upgrade Line Item Details"];
                                                                siebJson[lineItems.GetType()] = GetPropertyToJson(lineItems);
                                                                var orderHeadJson = siebJson[lineItems.GetType()];
                                                                orderHeadJson["ListOfOrderItem"] = {};
                                                                var OrderItems;
                                                                if (OrderItems = lineItems.GetChildByType("ListOfOrderItem")) {
                                                                    var orderItemCount = OrderItems.GetChildCount();
                                                                    orderHeadJson["ListOfOrderItem"]["OrderItem"] = [];
                                                                    for (var i = 0; i < orderItemCount; i++) {
                                                                        var props = GetPropertyToJson(OrderItems.GetChild(i));
                                                                        props["ListOfAttr"] = {};
                                                                        var attrCount = OrderItems.GetChild(i).GetChild(0).GetChildCount();
                                                                        if (attrCount) {
                                                                            var attr = [];
                                                                            for (var j = 0; j < attrCount; j++) {
                                                                                attr.push(GetPropertyToJson(OrderItems.GetChild(i).GetChild(0).GetChild(j)));
                                                                            }
                                                                            props["ListOfAttr"]["Attr"] = attr;
                                                                        }
                                                                        orderHeadJson["ListOfOrderItem"]["OrderItem"].push(props);
                                                                    }
                                                                }
                                                                var PrepaymentItems;
                                                                if (PrepaymentItems = lineItems.GetChildByType("ListOfPrepaymentInfo")) {
                                                                    var prepaymentInfo = PrepaymentItems.GetChildByType("PrepaymentInfo");
                                                                    var prepaymentJson = GetPropertyToJson(prepaymentInfo);
                                                                    var prepaymentChildCount = prepaymentInfo.GetChildCount();
                                                                    var prepaymentCardDetails;
                                                                    if (prepaymentCardDetails = prepaymentInfo.GetChildByType("ListOfPrepaymentCardDetails").GetChild(0)) {
                                                                        prepaymentJson["ListOfPrepaymentCardDetails"] = {};
                                                                        prepaymentJson["ListOfPrepaymentCardDetails"][prepaymentCardDetails.GetType()] = GetPropertyToJson(prepaymentCardDetails);
                                                                    }
                                                                    var prepaymentContractInfo;
                                                                    prepaymentJson["ListOfContractInfo"] = {};
                                                                    prepaymentJson["ListOfContractInfo"]["ContractInfo"] = [];
                                                                    var prepayConCnt = prepaymentInfo.GetChildByType("ListOfContractInfo").GetChildCount();
                                                                    for (var i = 0; i < prepayConCnt; i++) {
                                                                        prepaymentContractInfo = prepaymentInfo.GetChildByType("ListOfContractInfo").GetChild(i);
                                                                        prepaymentJson["ListOfContractInfo"]["ContractInfo"].push(GetPropertyToJson(prepaymentContractInfo));
                                                                    }
                                                                    orderHeadJson["ListOfPrepaymentInfo"] = {};
                                                                    orderHeadJson["ListOfPrepaymentInfo"]["PrepaymentInfo"] = prepaymentJson;
                                                                }
                                                                var sharingDetails;
                                                                if (sharingDetails = lineItems.GetChildByType("ListOfSharingInfo")) {
                                                                    var sharingInfo = sharingDetails.GetChild(0);
                                                                    var sharingJson = {};
                                                                    var sharingChildCount = sharingInfo.GetChildCount();
                                                                    for (var i = 0; i < sharingChildCount; i++) {
                                                                        sharingJson[sharingInfo.GetChild(i).GetType()] = {};
                                                                    }
                                                                    var orderInfo;
                                                                    if (orderInfo = sharingInfo.GetChildByType("OrderInfo")) {
                                                                        sharingJson[orderInfo.GetType()] = GetPropertyToJson(orderInfo);
                                                                    }
                                                                    var selectedInfo;
                                                                    if (selectedInfo = sharingInfo.GetChildByType("SelectedInfo")) {
                                                                        sharingJson[selectedInfo.GetType()] = GetPropertyToJson(selectedInfo);
                                                                    }
                                                                    var GroupInfo;
                                                                    if (GroupInfo = sharingInfo.GetChildByType("GroupInfo")) {
                                                                        sharingJson[GroupInfo.GetType()] = GetPropertyToJson(GroupInfo);
                                                                    }
                                                                    orderHeadJson["ListOfSharingInfo"] = {};
                                                                    orderHeadJson["ListOfSharingInfo"]["SharingInfo"] = sharingJson;
                                                                }
                                                                var strjsonObj = JSON.stringify(jsonObj);
                                                                var strOrdChanel = "";
                                                                if (sUserType == "Retail")
                                                                    strOrdChanel = "Siebel eChannel for CME";
                                                                else
                                                                    strOrdChanel = "Siebel Power Communications";
                                                                var coliSettings = {
                                                                    "async": true,
                                                                    "crossDomain": true,
                                                                    "url": apilovurl + "VHARestAPIWF/RunProcess",
                                                                    "method": "POST",
                                                                    "headers": {
                                                                        "content-type": "application/json",
                                                                        "cache-control": "no-cache",
                                                                        "postman-token": "5c1f0ef1-1226-5653-dba8-72a6c0e242c9"
                                                                    },
                                                                    "processData": false,
                                                                    "data": '{\r\n   "body":{\r\n      "ProcessName":"VHA Process Order Line Items - 3 Step Upgrade",\r\n      "Object Id":"' + sSessionId + '",\r\n      "OrdChanel":"' + strOrdChanel + '",\r\n      "SiebelMessage":' + strjsonObj + "\r\n }\r\n}"
                                                                };
                                                                $.ajax(coliSettings).done(function (response) {
                                                                    if (response["Error Code"] != "" || response["Error Message"] != "") {
                                                                        $("#vha-cancel-btn").removeClass("disabled").css("pointer-events", "auto");
                                                                        $("#vha-tot-pause").removeClass("disabled").css("pointer-events", "auto");
                                                                        $("#vha-tot-finish").addClass("disabled").css("pointer-events", "none");
                                                                        $("#vha-guided-wizard").removeClass("disabled").css("pointer-events", "auto");
                                                                        $("#TSOrderStatusMsg").text("");
                                                                        if (SiebelApp.S_App.GetActiveView().GetName() == "VHA TS Upgrade View") {
                                                                            alert(response["Error Code"] + "\n" + response["Error Message"]);
                                                                        }
																		
                                                                    } else {
                                                                        $("#vha-cancel-btn").removeClass("disabled").css("pointer-events", "auto");
                                                                        $("#vha-tot-pause").removeClass("disabled").css("pointer-events", "auto");
                                                                        $("#vha-tot-finish").removeClass("disabled").css("pointer-events", "auto");
                                                                        $("#vha-guided-wizard").removeClass("disabled").css("pointer-events", "auto");
                                                                        $("#TSOrderStatusMsg").text("");
                                                                        var sMaxDeliveryDate = response["MaxDeliveryDate"];
                                                                        if (sMaxDeliveryDate != "")
                                                                            $("#TSOrderStatusMsg").text("Delivery Date: " + sMaxDeliveryDate);																		
																		if(pegaflag === "Y")
																			pegaOrderValidation();

                                                                    }
                                                                }).fail(function (response, textStatus) {
                                                                    $("#vha-cancel-btn").removeClass("disabled").css("pointer-events", "auto");
                                                                    $("#vha-tot-pause").removeClass("disabled").css("pointer-events", "auto");
                                                                    $("#vha-tot-finish").addClass("disabled").css("pointer-events", "none");
                                                                    var xErrorResponse=response.responseJSON.ERROR;
                                                                    if(xErrorResponse!="" && SiebelApp.S_App.GetActiveView().GetName() == "VHA TS Upgrade View"){
                                                                        alert(xErrorResponse);
                                                                    }//Sharan:05/09/2023::Added for PKE000000110563
                                                                    $("#vha-guided-wizard").removeClass("disabled").css("pointer-events", "auto");
                                                                    $("#TSOrderStatusMsg").text("");
                                                                    //alert(response.responseJSON.ERROR);
                                                                });
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                        }
                    }
                });
                function setTermToZero(SiebelMessage) {
                    var lineItemCount = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChildCount();
                    for (var i = 0; i < lineItemCount; i++) {
                        var productName = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetProperty("Name");
                        switch (productName) {
                        case "GPP Device Contract":
                            var attrCount = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChildCount();
                            var contractAmount;
                            var termIndex;
                            for (var j = 0; j < attrCount; j++) {
                                var attrName = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).GetProperty("Name");
                                if (attrName == "Contract Amount") {
                                    contractAmount = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).GetProperty("Value");
                                    if (Number(contractAmount) > 0) {
                                        var correctContractAmount = parseFloat(contractAmount).toFixed(2);
                                        SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).SetProperty("Value", correctContractAmount);
                                    } else {
                                        SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).SetProperty("Value", 0);
                                    }
                                }
                                if (attrName == "Term") {
                                    termIndex = j;
                                }
                                if (attrName == "Prepayment Amount") {
                                    var prepaymentAmount = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).GetProperty("Value");
                                    if (prepaymentAmount == "0") {
                                        SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).SetProperty("Value", "");
                                    } else {
                                        var correctContractAmount = parseFloat(prepaymentAmount).toFixed(2);
                                        SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).SetProperty("Value", correctContractAmount);
                                    }
                                }
                            }
                            if (contractAmount == "0") {
                                SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(termIndex).SetProperty("Value", "0");
                            }
                            break;
                        case "APP Contract":
                            var attrCount = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChildCount();
                            var contractAmount;
                            var termIndex;
                            for (j = 0; j < attrCount; j++) {
                                var attrName = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).GetProperty("Name");
                                if (attrName == "Contract Amount") {
                                    contractAmount = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).GetProperty("Value");
                                    if (Number(contractAmount) > 0) {
                                        var correctContractAmount = parseFloat(contractAmount).toFixed(2);
                                        SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).SetProperty("Value", correctContractAmount);
                                    } else {
                                        SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).SetProperty("Value", 0);
                                    }
                                }
                                if (attrName == "Term") {
                                    termIndex = j;
                                }
                                if (attrName == "Prepayment Amount") {
                                    var prepaymentAmount = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).GetProperty("Value");
                                    if (prepaymentAmount == "0") {
                                        SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).SetProperty("Value", "");
                                    } else {
                                        var correctContractAmount = parseFloat(prepaymentAmount).toFixed(2);
                                        SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).SetProperty("Value", correctContractAmount);
                                    }
                                }
                            }
                            if (contractAmount == "0") {
                                SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(termIndex).SetProperty("Value", "0");
                            }
                            break;
                        case "Accessory":
                            var attrCount = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChildCount();
                            var contractAmount;
                            for (j = 0; j < attrCount; j++) {
                                var attrName = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).GetProperty("Name");
                                if (attrName == "Prepayment Amount") {
                                    var prepaymentAmount = SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).GetProperty("Value");
                                    if (prepaymentAmount == "0") {
                                        SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).SetProperty("Value", "");
                                    } else {
                                        var correctContractAmount = parseFloat(prepaymentAmount).toFixed(2);
                                        SiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfOrderItem").GetChild(i).GetChild(0).GetChild(j).SetProperty("Value", correctContractAmount);
                                    }
                                }
                            }
                            break;
                        default:
                        }
                    }
                    return SiebelMessage;
                }
                $("#vhasecondaryadd").on("click", function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        shopSecondary($(this).attr("productcd"), "");
                        $("#maskoverlay").styleHide();
                    });
					//Proj:Visa-Start
					var sVisaAccid = "",sVisaTerm = "",sVisaOrderId = "", sErrMsg = "",ROups = "";
					sVisaAccid = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Account Id");	
					sVisaOrderId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Order Id");															
					sVisaTerm = $(".vha-ts-sd-term.applet-button-active").attr("term");					
					if (sVisaAccid !="" && sVisaTerm !=""){										
						var Inputs = SiebelApp.S_App.NewPropertySet();
						var Output = SiebelApp.S_App.NewPropertySet();
						$("#vha-ts-sd-stockerrmsg").removeClass("text-danger-visa");
						var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
						Inputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service");										
						Inputs.SetProperty("Order Id", sVisaOrderId);
						Inputs.SetProperty("CustId", sVisaAccid);										
						Inputs.SetProperty("TransactionType", "3 Step Upgrade");	
						Inputs.SetProperty("3Step", "3GPP");
						Inputs.SetProperty("Term", sVisaTerm);	
						Inputs.SetProperty("Method Name", "GetVisaExpiryDate");
						ROups = ser.InvokeMethod("Run Process", Inputs);										
						sErrMsg = ROups.childArray[0].propArray.ErrorMessage; 	
						if (sErrMsg!=""){							
							$("#vha-ts-sd-stockerrmsg").addClass("text-danger-visa");
							$("#vha-ts-sd-stockerrmsg.text-danger-visa").text(sErrMsg);													
						}
					}	
					//Visa end						
                });
                $("#vhaaccessadd").on("click", function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        shopAccessory($(this).attr("productcd"), $(this).attr("Price"));
                        $("#maskoverlay").styleHide();											
                    });
                });
                $("#vha-ts-prepayment").on("click", ".vhappbtn", {}, function () {
                    if ($(this).hasClass("applet-button-active")) {
                        return;
                    }
                    tsintitialData.OrderHeader.Prepayment.PrepaymentType = $(this).attr("id");
                    if ($(this).attr("id") == "vhagfppnotinterestedbtn") {
                        if (Number($("#gf-prepayment-amt").val()) > 0) {
                            $("#vhagfppnotinterestedbtn").parent().children("#showMsg").remove();
                            $("#vhagfppnotinterestedbtn").parent().append("<span id='showMsg'>Ensure prepayment amount is 0 before selecting 'Not Intrested' option</span>");
                        } else {
                            $("#vhagfppnotinterestedbtn").parent().children("#showMsg").remove();
                            $("#vha-ts-prepayment .applet-button-active").removeClass("applet-button-active").addClass("applet-button-passive");
                            $(this).addClass("applet-button-active").removeClass("applet-button-passive");
                            $(".vha-ts-prepaymentForm-enterdata").addClass("VHADisplayNone");
							$("#Showhistoryapp").addClass("VFDisplayNone");//vasavi added for Florida
							$(".vha-ts-prepaymentupiForm-enterdata").addClass("VHADisplayNone");//vasavi added for Florida
							$('.vha-ts-urlstatus').val("");//vasavi added for Florida
                            $(".VFPPOUIPayCorpIFramePar").remove();
                            $("#vha-upgrade-payIframe").html("");
                        }
                    } else {
                        $("#vhagfppnotinterestedbtn").parent().children("#showMsg").remove();
                        $("#vha-ts-prepayment .applet-button-active").removeClass("applet-button-active").addClass("applet-button-passive");
                        $(this).addClass("applet-button-active").removeClass("applet-button-passive");
                        if ($(this).attr("id") == "vhagfppcreditexistingcardbtn") {
                            $(".vha-ts-prepaymentForm-enterdata").removeClass("VHADisplayNone");
                            $(".VFPPOUIPayCorpIFramePar").remove();
                            $("#vha-upgrade-payIframe").html("");
                            useExistingCreditCard();
                        } else {
                            if ($(this).attr("id") == "vhagfppcreditcardbtn") {
								$("#Showhistoryapp").addClass("VFDisplayNone");//vasavi added for Florida
								var sURLStatChk = $('.vha-ts-urlstatus').val();//vasavi added for Florida
								//vasavi added if block for Florida
                                if(sURLStatChk == "Active")
                                    alert("When Payment URL is Active, credit card detail cannot be selected");
								else{
                                $(".vha-ts-prepaymentForm-enterdata").removeClass("VHADisplayNone");
                                var BAN = "BAN:" + appletMap["VHA 3 Step Upgrade Header Applet"].GetRecordSet()[0]["Billing Account Id"];
                                executeEvent(viewPM, "GET_PAYURL_EVT", {
                                    "ProcessName": "VF PP BT INIT Workflow",//BalajiMUpdate for Miami
                                    "ClientRef": BAN,
                                    "Identifier": BAN,
                                    "CompName": "VHAAuthorizeAndSettleOpenUI"
                                });
                            }
                            }
							//vasavi added below if blocks for florida - Generate URL
							if ($(this).attr("id") == "vhagfppgenerateupibtn"){
								$("#Showhistoryapp").addClass("VFDisplayNone");
								var out = "";
								var sURLStatusChk = $('.vha-ts-urlstatus').val();
								if(sURLStatusChk == "Active")
                                    alert("There is already an active payment URL found and cannot generate another payment URL");
								else{
									tsintitialData.OrderHeader.Prepayment.PrepaymentUPI = "vhagfppgenerateupibtn";
									tsintitialData.OrderHeader.Prepayment.PrepaymentType = "vhagfppgenerateupibtn";
									$(".vha-ts-prepaymentupiForm-enterdata").removeClass("VHADisplayNone");
									var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";   
									var string_length = 8;  
									var randomstring = '';  
									for (var i=0; i<string_length; i++)
									{  
										var rnum = Math.floor(Math.random() * chars.length);  
										randomstring += chars.substring(rnum,rnum+1);  
										SiebelApp.S_App.SetProfileAttr("ShortCodeP", randomstring );
									}
									var sFBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
									var sFOrdId = sFBC.GetFieldValue("Order Id");
									var sBAN = appletMap["VHA 3 Step Upgrade Header Applet"].GetRecordSet()[0]["Billing Account Id"];
									var sbs = SiebelApp.S_App.GetService("VF BS Process Manager");
									var sInps = SiebelApp.S_App.NewPropertySet();
									sInps.SetProperty("Service Name", "VHA Store Pickup Reservation Service");
									sInps.SetProperty("Method Name", "GeneratePaymentURL");
									sInps.SetProperty("BAN", sBAN);
									sInps.SetProperty("OrderId", sFOrdId);
									sInps.SetProperty("ShortId", randomstring);
									out = sbs.InvokeMethod("Run Process", sInps);
									var result = out.GetChildByType("ResultSet");
									$('.vha-ts-notifytype').val("SMS");
									$('.vha-ts-email').val(result.GetProperty("Email"));
									$('.vha-ts-mobnumber').val(result.GetProperty("MSISDN"));
									$('.vha-ts-url').val(result.GetProperty("URL"));
									$('.vha-ts-paydate').val(result.GetProperty("CreatedDate"));
									$('.vha-ts-urlstatus').val("Active");
									$('.vha-ts-paystatus').val("New");
									UpdateUPIDetails();
								}
							}
							//Florida - Send URL
							if ($(this).attr("id") == "vhagfppsendupibtn") {
								$("#Showhistoryapp").addClass("VFDisplayNone");
								var sOut = "",res = "",sErr ="" ,sMsg ="";
								var sURLCheck = tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.URL;
								if(sURLCheck == "")
                                    alert("Please generate URL");
								else if(Number($("#gf-prepayment-amt").val()) == 0) 
                                    alert("Please enter payment amount greater than zero and less than or equal to total bill due amount.");
								else if($('.vha-ts-notifytype').val() == "SMS" && $('.vha-ts-mobnumber').val() == "")
									 alert("Please enter mobile number");
								 else if($('.vha-ts-notifytype').val() == "Email" && $('.vha-ts-email').val() == "")
									 alert("Please enter email");
								else {
									var sFBC1 = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
									var sOrdId = sFBC1.GetFieldValue("Order Id");
									var sBAN = appletMap["VHA 3 Step Upgrade Header Applet"].GetRecordSet()[0]["Billing Account Id"];
									var sbs1 = SiebelApp.S_App.GetService("VF BS Process Manager");
									var bsInps = SiebelApp.S_App.NewPropertySet();
									bsInps.SetProperty("Service Name", "VHA Store Pickup Reservation Service");
									bsInps.SetProperty("Method Name", "SendPaymentURL");
									bsInps.SetProperty("BAN", sBAN);
									bsInps.SetProperty("OrderId", sOrdId);
									bsInps.SetProperty("Email", $('.vha-ts-email').val());
									bsInps.SetProperty("ShortId", SiebelApp.S_App.GetProfileAttr("ShortCodeP"));
									bsInps.SetProperty("MSISDN", $('.vha-ts-mobnumber').val());
									bsInps.SetProperty("SendType", $('.vha-ts-notifytype').val());
									bsInps.SetProperty("URL", $('.vha-ts-url').val());
									bsInps.SetProperty("PrePayAmountUPI", $('#gf-prepayment-amt').val());
									bsInps.SetProperty("URLStatus", $('.vha-ts-urlstatus').val());
									sOut = sbs1.InvokeMethod("Run Process", bsInps);
									res = sOut.GetChildByType("ResultSet");
									sErr = res.GetProperty("ErrorMsg");
									sMsg = res.GetProperty("Msg");
									if( sErr != "" && sErr != null)
										alert(sErr);
									else
										alert(sMsg);
								}	
							}
							//Florida - Show History
							if ($(this).attr("id") == "vhagfpphistorybtn"){
								$("#Showhistoryapp").removeClass("VFDisplayNone");
                            }
							//Florida - refresh
							if ($(this).attr("id") == "vhagfpprefreshbtn"){
								$("#Showhistoryapp").addClass("VFDisplayNone");
                                var sbs2 = SiebelApp.S_App.GetService("VF BS Process Manager");
								var bsInps1 = SiebelApp.S_App.NewPropertySet();
								var sCreatedate = $(".vha-ts-paydate").val();
                                var sFBC1 = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
                                var sFOrdId1 = sFBC1.GetFieldValue("Order Id");
								bsInps1.SetProperty("Service Name", "VHA Store Pickup Reservation Service");
								bsInps1.SetProperty("Method Name", "UpdatePaymentRecord");
                                bsInps1.SetProperty("Order Id", sFOrdId1);
								bsInps1.SetProperty("Created Date", sCreatedate);
                                var sOut1 = sbs2.InvokeMethod("Run Process", bsInps1);
                                var res1 = sOut1.GetChildByType("ResultSet");
								var sExpflg = res1.GetProperty("Expired");
								if(sExpflg == "N")
								{
                                $('.vha-ts-paystatus').val(res1.GetProperty("Payment Status"));
                                $('.vha-ts-paytype').val(res1.GetProperty("Payment Type"));
                                $('.vha-ts-paytoken').val(res1.GetProperty("Payment Token"));
                                $('.vha-ts-recnumber').val(res1.GetProperty("Receipt Number")); 
								UpdateUPIDetails();
								}
								else{
									$('.vha-ts-notifytype').val("");
									$('.vha-ts-email').val("");
									$('.vha-ts-mobnumber').val("");
									$('.vha-ts-url').val("");
									$('.vha-ts-urlstatus').val("");
									$('.vha-ts-paystatus').val("");
									$('.vha-ts-paytype').val("");
									$('.vha-ts-recnumber').val("");
									$('.vha-ts-paytype').val("");
									$('.vha-ts-paytoken').val("");
									$(".vha-ts-prepaymentupiForm-enterdata").addClass("VHADisplayNone");
									$("#vhagfppgenerateupibtn").removeClass("applet-button-active");
									$("#vhagfppsendupibtn").removeClass("applet-button-active");
									$("#vhagfpphistorybtn").removeClass("applet-button-active");
									UpdateUPIDetails();
								}
                            }
							//Florida - delete
							$(".vha-ts-deleteiconsm1").on("click", function () {
								var sbs = SiebelApp.S_App.GetService("VF BS Process Manager");
								var bsInps = SiebelApp.S_App.NewPropertySet();
                                var sFBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
                                var sFOrdId = sFBC.GetFieldValue("Order Id");
								bsInps.SetProperty("Service Name", "VHA Store Pickup Reservation Service");
								bsInps.SetProperty("Method Name", "DeletePaymentRecord");
                                bsInps.SetProperty("Order Id", sFOrdId);
                                var sOut = sbs.InvokeMethod("Run Process", bsInps);
								$('.vha-ts-notifytype').val("");
								$('.vha-ts-email').val("");
								$('.vha-ts-mobnumber').val("");
								$('.vha-ts-url').val("");
								$('.vha-ts-urlstatus').val("");
								$('.vha-ts-paystatus').val("");
								$('.vha-ts-paytype').val("");
								$('.vha-ts-recnumber').val("");
								$('.vha-ts-paytype').val("");
								$('.vha-ts-paytoken').val("");
								$(".vha-ts-prepaymentupiForm-enterdata").addClass("VHADisplayNone");
								$("#vhagfppgenerateupibtn").removeClass("applet-button-active");
								$("#vhagfppsendupibtn").removeClass("applet-button-active");
								$("#vhagfpphistorybtn").removeClass("applet-button-active");
								$("#vhagfpprefreshbtn").removeClass("applet-button-active");
								UpdateUPIDetails();
							});
                        }
                    }
                });
                $("#ts-new-device-ins").on("change", function () {
                    var iLen = tsintitialData.OrderHeader.PhoneInsurance.length;
                    for (var k = 0; k < iLen; k++) {
                        if (tsintitialData.OrderHeader.PhoneInsurance[k].Prod__Integration__Id == "") {
                            updateSessionDetails(tsintitialData.OrderHeader.PhoneInsurance[k].MaxPrice, "PhoneInsurance", "Remove");
                            tsintitialData.OrderHeader.PhoneInsurance.splice(k, 1);
                            k--;
                            iLen--;
                        }
                    }
                    phoneInsuranceCartUpt();
                    var NewInsText = $("#ts-new-device-ins option:selected").text();
                    var NewInsVal = $("#ts-new-device-ins option:selected").val();
                    var InsMaxPrice = "15";
                    var NewInsValArray = NewInsVal.split("|");
                    if (NewInsText != "") {
                        if (NewInsValArray[1] != "") {
                            tsintitialData.OrderHeader.PhoneInsurance.push({
                                Action: "Add",
                                Type: "Insurance",
                                Prod__Integration__Id: "",
                                Name: NewInsValArray[1],
                                MaxPrice: InsMaxPrice,
                                Handset__IMEI: tsintitialData.OrderHeader.GppDeviceContract.IMEI___Serial__Number,
                                Item__Name: tsintitialData.OrderHeader.GppDeviceContract.Item__Name,
                                EligibleOrderLineItem: "Y"
                            });
                            InsMaxPrice = "0";
                        }
                        tsintitialData.OrderHeader.PhoneInsurance.push({
                            Action: "Add",
                            Type: NewInsValArray[2],
                            Prod__Integration__Id: "",
                            Name: NewInsText,
                            MaxPrice: InsMaxPrice,
                            Handset__IMEI: tsintitialData.OrderHeader.GppDeviceContract.IMEI___Serial__Number,
                            Item__Name: tsintitialData.OrderHeader.GppDeviceContract.Item__Name,
                            EligibleOrderLineItem: "Y"
                        });
                        updateSessionDetails(InsMaxPrice, "PhoneInsurance", "Add");
                        phoneInsuranceCartUpt();
                    }
                    totalIndicativeCostCalc();
                });
                $("#vhatsaddsimno").on("click", function () {
                    $(this).removeClass("applet-button-passive");
                    $(this).addClass("applet-button-active");
                    $("#vhatsaddsimy").removeClass("applet-button-active");
                    $("#vhatsaddsimy").addClass("applet-button-passive");
                    tsintitialData.OrderHeader.AddSIM.EligibleOrderLineItem = "N";
                });
                $("#vhatsaddsimy").on("click", function () {
                    var pdIMEI = tsintitialData.OrderHeader.GppDeviceContract.IMEI___Serial__Number;
                    var pdIMEIElig = tsintitialData.OrderHeader.GppDeviceContract.EligibleOrderLineItem;
                    if (pdIMEI != "" && pdIMEIElig == "Y") {}
                    else {
                        if (sSimOnlyUpg == "Y") {}
                        else {
                            $(this).removeClass("applet-button-passive");
                            $(this).addClass("applet-button-active");
                            $("#vhatsaddsimno").removeClass("applet-button-active");
                            $("#vhatsaddsimno").addClass("applet-button-passive");
                            var SrcAddSIM1 = "[List Of Values.Type]='VHA_ACCESSORY_TYPE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='AddSIMCode'";
                            var sAddSIMCode = VHAAppUtilities.GetPickListValues("", SrcAddSIM1, {
                                "All": "true"
                            })[0].Value;
                            var SrcAddSIM2 = "[List Of Values.Type]='VHA_ACCESSORY_TYPE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='AddSIMName'";
                            var sAddSIMName = VHAAppUtilities.GetPickListValues("", SrcAddSIM2, {
                                "All": "true"
                            })[0].Value;
                            var sAddSIMObj = tsintitialData.OrderHeader.AddSIM;
                            sAddSIMObj.Action = "Add";
                            sAddSIMObj.Name = "Accessory Item";
                            sAddSIMObj.Prod__Integration__Id = "";
                            sAddSIMObj.StockIndicator = "Out of Stock";
                            sAddSIMObj.Accessory__Code = sAddSIMCode;
                            sAddSIMObj.Accessory__Name = sAddSIMName;
                            sAddSIMObj.Accessory__Qty = "1";
                            sAddSIMObj.Accessory__Price__Exc__GST = "0";
                            sAddSIMObj.Accessory__Price__Inc__GST = "0";
                            sAddSIMObj.Accessory__RCC__Exc__GST = "0";
                            sAddSIMObj.Accessory__RCC__Inc__GST = "0";
                            sAddSIMObj.EligibleOrderLineItem = "Y";
                        }
                    }
                });
                $(".ts-addremoveins-method").on("click", ".applet-button", {}, function () {
                    if ($(this).hasClass("applet-button-active")) {
                        return;
                    }
                    var iLen = tsintitialData.OrderHeader.PhoneInsurance.length;
                    for (var k = 0; k < iLen; k++) {
                        if (tsintitialData.OrderHeader.PhoneInsurance[k].Prod__Integration__Id != "") {
                            tsintitialData.OrderHeader.PhoneInsurance.splice(k, 1);
                            k--;
                            iLen--;
                        }
                    }
                    $(".ts-addremoveins-method .applet-button-active").removeClass("applet-button-active").addClass("applet-button-passive");
                    $(this).addClass("applet-button-active").removeClass("applet-button-passive");
                    var val = $(this).attr("val");
                    tsintitialData.OrderHeader.AddRemoveInsurance.AddRemoveIns = val;
                    switch (val) {
                    case "Yes":
                        var ihtml = "";
                        var postextInsurance = new Array;
                        if (extInsurance != undefined) {
                            if (extInsurance["GPPId"] != undefined) {
                                postextInsurance.push(extInsurance);
                            } else {
                                postextInsurance = extInsurance;
                            }
                            var l = postextInsurance.length;
                            for (var i = 0; i < l; i++) {
                                var n = postextInsurance[i];
                                var id = n["IntegrationId"];
                                if (id == "" && n["GPPId"] != "") {
                                    id = n["GPPId"];
                                } else {
                                    if (id == "") {
                                        id = Math.round((new Date).getTime() + Math.random() * 100);
                                    }
                                }
                                var insuranceName = "";
                                var chkid = "";
                                var chkid1 = "";//Sharan:06/09/2023:CPVT-1149
                                if (n["InsuranceName"] != "") {
                                    insuranceName = n["InsuranceName"];
                                    chkid = id + "%Remove";
                                    chkid1 = id + "%Keep";
                                    //var actionHTML = "<input type='radio' class='vha-ins-chkbox' name = '" + n["InsuranceName"] + "' id='" + chkid + "'><span>Keep</span><span>Remove</span>";//Sharan:06/09/2023:CPVT-1149
                                    var actionHTML ="<input type='radio' class='vha-ins-chkbox vha-keep' name = '" + n["InsuranceName"] + "' id='" + chkid1 + "'><span>Keep</span><input type='radio' class='vha-ins-chkbox vha-remove' name = '" + n["InsuranceName"] + "' id='" + chkid + "'><span>Remove</span>";//Sharan:06/09/2023:CPVT-1149
                                    ihtml += "<div class='row pt-2 pb-2' id='" + id + "'><div class='col-md-3'>" + n["ItemName"] + "</div><div class='col-md-3'>" + insuranceName + "</div><div class='col-md-2'>" + actionHTML + "</div></div>";
                                } else {
                                    insuranceName = "No";
                                    chkid = id + "%Add";
                                    var actionHTML = "<input type='checkbox' class='vha-ins-chkbox' name = '" + n["InsuranceName"] + "' id='" + chkid + "'><span>Add Device Care</span>";
                                    var scls = "vha-add-insurance" + id;
                                    var isnHTML = "<select class='" + scls + "' imei = '" + n["IMEI"] + "' devicename = '" + n["ItemName"] + "' style='width: 194px;'>";
                                    isnHTML += "<option value='None'></option>";
                                    var e = n["EligibleInsurance"].split("||");
                                    for (var j = 0; j < e.length; j++) {
                                        optId = id + e[j];
                                        isnHTML += "<option value='" + e[j] + "' id='" + optId + "'>" + e[j] + "</option>";
                                    }
                                    isnHTML += "</select>";
                                    ihtml += "<div class='row pt-2 pb-2' id='" + id + "'><div class='col-md-3'>" + n["ItemName"] + "</div><div class='col-md-3'>" + insuranceName + "</div><div class='col-md-2'>" + actionHTML + "</div><div>" + isnHTML + "</div></div>";
                                }
                            }
                        }
                        $(".vha-insurance-content").html(ihtml);
                        $(".vha-ins-dtls").removeClass("VFDisplayNone");
                        $(".vha-ins-chkbox").change(function () {
                            if ($(this).prop("checked") == true) {
                                var prodPromIntId = this.getAttribute("id").split("%")[0];
                                var action = "";
                                if (this.getAttribute("id").split("%")[1] == "Remove") {
                                    action = "Delete";
                                    tsintitialData.OrderHeader.PhoneInsurance.push({
                                        Action: action,
                                        Type: "Insurance",
                                        Prod__Integration__Id: prodPromIntId,
                                        Name: this.getAttribute("name"),
                                        MaxPrice: "0",
                                        EligibleOrderLineItem: "Y"
                                    });
                                } else if (this.getAttribute("id").split("%")[1] == "Keep"){
                                  //in case selection of keep in removing device care it just validates the condion  //Sharan:06/09/2023:CPVT-1149
                                } else {
                                    action = "Add";
                                    var InsMaxPrice = "15";
                                    var optnSelIns = ".vha-add-insurance" + prodPromIntId + " option:selected";
                                    var ExtInsText = $(optnSelIns).text();
                                    if (ExtInsText != "") {
                                        var scls = ".vha-add-insurance" + prodPromIntId;
                                        $(scls).attr("disabled", true);
                                   // if (ExtInsText == "One Month Free Vodafone Swap & Go - Devices") //Ravindra: 01/Dec/23 Commented and added below code
										if (ExtInsText == "One Month Free Vodafone Device Care") 
									    {
                                            tsintitialData.OrderHeader.PhoneInsurance.push({
                                                Action: "Add",
                                                Type: "Insurance",
                                                Prod__Integration__Id: prodPromIntId,
                                               // Name: "Vodafone Swap & Go - Devices", //Ravindra: 01/Dec/23  Commented and added below line
											    Name: "Vodafone Device Care",
                                                MaxPrice: InsMaxPrice,
                                                Handset__IMEI: $(scls).attr("imei"),
                                                Item__Name: $(scls).attr("devicename"),
                                                EligibleOrderLineItem: "Y"
                                            });
                                            //updateSessionDetails(InsMaxPrice, "PhoneInsurance", "Add");
                                            InsMaxPrice = "0";
                                        }
                                        tsintitialData.OrderHeader.PhoneInsurance.push({
                                            Action: "Add",
                                            Type: "Insurance",
                                            Prod__Integration__Id: prodPromIntId,
                                            Name: ExtInsText,
                                            MaxPrice: InsMaxPrice,
                                            Handset__IMEI: $(scls).attr("imei"),
                                            Item__Name: $(scls).attr("devicename"),
                                            EligibleOrderLineItem: "Y"
                                        });
                                        updateSessionDetails(InsMaxPrice, "PhoneInsurance", "Add");
                                        phoneInsuranceCartUpt();
                                    } else {
                                        $(this).prop("checked", false);
                                        alert("Please select insurance and click add new insurance");
                                    }
                                }
                            } else {
                                var prodPromIntId = this.getAttribute("id").split("%")[0];
                                var scls = ".vha-add-insurance" + prodPromIntId;
                                if (this.getAttribute("id").split("%")[1] == "Add") {
                                    $(scls).attr("disabled", false);
                                }
                                var iLen = tsintitialData.OrderHeader.PhoneInsurance.length;
                                for (var k = 0; k < iLen; k++) {
                                    if (tsintitialData.OrderHeader.PhoneInsurance[k].Prod__Integration__Id == prodPromIntId) {
                                        tsintitialData.OrderHeader.PhoneInsurance.splice(k, 1);
                                        k--;
                                        iLen--;
                                    }
                                }
                                phoneInsuranceCartUpt();
                            }
                            totalIndicativeCostCalc();
                        });
                        break;
                   /* case "No":
                        var iLen = tsintitialData.OrderHeader.PhoneInsurance.length;
                        for (var k = 0; k < iLen; k++) {
                            if (tsintitialData.OrderHeader.PhoneInsurance[k].Prod__Integration__Id != "") {
                                tsintitialData.OrderHeader.PhoneInsurance.splice(k, 1);
                                k--;
                                iLen--;
                            }
                        }
                        $(".vha-ins-dtls").addClass("VFDisplayNone");
                        phoneInsuranceCartUpt();
                        totalIndicativeCostCalc();
                        break;
                    default:
                        break;*/ //Sharan:06/09/2023:CPVT-1149
                    }
                });
                if (sessionType == "Paused") {
                    resumeSession();
                }
            };
            VHATSUpgradeViewPR.prototype.EndLife = function () {
                SiebelAppFacade.VHATSUpgradeViewPR.superclass.EndLife.apply(this, arguments);
            };
			
			function pegaOrderValidation(){
				
				// pega bs calling to add offer product start
				var pegaoffData;
				for (let i = 0; i < Pegafilteredarray.length; i++) {

							if (Pega_sel_PlanSAMID.toLowerCase() === Pegafilteredarray[i].SAM_Product_ID.toLowerCase()) {
								pegaoffData= Pegafilteredarray[i];
							}															
				}
				//pegaoffData.RewardTerm = pegaoffData.RewardTerm+" months";
				//pegaoffData.RewardValue = "$"+pegaoffData.RewardValue;
				
				var bsRespCheck = SiebelApp.S_App.GetService("VF BS Process Manager");
				var psInputs = SiebelApp.S_App.NewPropertySet();
				psInputs.SetProperty("Service Name", "VHA Pega Order Validation BS");
				//psInputs.SetProperty("Service Name", "VHA Pega Order Validation BS_3StepUpg");
				psInputs.SetProperty("Method Name", "AddUpgradeOffer");
				psInputs.SetProperty("OfferType", pegaoffData.OfferType);
				psInputs.SetProperty("Journey", "3StepUpgrade");
				psInputs.SetProperty("OrderRef", sOrderRef );
				psInputs.SetProperty("KeyCode", pegaoffData.KeyCode);
				psInputs.SetProperty("RewardTerm", pegaoffData.RewardTerm);
				psInputs.SetProperty("SamproductId", pegaoffData.dis_SamproductId);
				psInputs.SetProperty("RewardValue", pegaoffData.RewardValue);
				psInputs.SetProperty("CoexistenceFlag", pegaoffData.CoexistenceFlag);
				psInputs.SetProperty("OutcomeDateTime", pegaoffData.OutcomeDateTime);
				psInputs.SetProperty("EndDateTime", pegaoffData.EndDateTime);
				psInputs.SetProperty("Source", pegaoffData.Source);
				psInputs.SetProperty("StackabilityFlag", pegaoffData.StackabilityFlag);
				psInputs.SetProperty("Summary", pegaoffData.summary);
				psInputs.SetProperty("RewardUOM", pegaoffData.RewardUOM);
				psInputs.SetProperty("ContextID",pegaoffData.ContextID );
				psInputs.SetProperty("InteractionID",pegaoffData.interactionID );
				psInputs.SetProperty("Response",pegaoffData.Response );
				psInputs.SetProperty("ResponseReason", pegaoffData.ResponseReason);
				psInputs.SetProperty("Label",pegaoffData.Label );
				psInputs.SetProperty("PlanSamId", pegaoffData.SAM_Product_ID);
				var pegaOutput = bsRespCheck.InvokeMethod("Run Process", psInputs);
				//var resultset = Output?.GetChildByType("ResultSet");
				
				// pega bs calling to add offer product end
				
			}
            function updateAccessoryTerm() {
                tsintitialData.OrderHeader.Accessories[0].Term = $(".vha-ts-a-term.applet-button-active").attr("term");
                tsintitialData.OrderHeader.Accessories[0].Monthly__Repayment = mTruncate(parseFloat(tsintitialData.OrderHeader.Accessories[0].Total__Accessories__RRP__Inc__GST / tsintitialData.OrderHeader.Accessories[0].Term).toString());
                tsintitialData.OrderHeader.Accessories[0].Contract__Amount = tsintitialData.OrderHeader.Accessories[0].Total__Accessories__RRP__Inc__GST;
                tsintitialData.OrderHeader.Accessories[0].Prepayment__Amount = 0;
                var sAccArr = tsintitialData.OrderHeader.Accessories;
                sAccArr.forEach(function (item, index) {
                    item.Prepayment__Amount = 0;
                });
                mSetPrepaymentaccordion();
            }
            function resetPrepayment() {
                var sDevice = tsintitialData.OrderHeader.Device;
                if (sDevice.Device__Name != "" && sDevice.Device__Name != "Non Device") {
                    var sActualDevicePrice = tsintitialData.OrderHeader.Device.Device__RCC__Inc__GST;
                    var gppdvcecontract = tsintitialData.OrderHeader.GppDeviceContract;
                    gppdvcecontract.Contract__Amount = sActualDevicePrice;
                    gppdvcecontract.Monthly__Repayment = mTruncate(parseFloat(gppdvcecontract.Contract__Amount / gppdvcecontract.Term).toString());
                    gppdvcecontract.Prepayment__Amount = 0;
                }
                var sSecDvcItems = tsintitialData.OrderHeader.SecondaryDevices;
                if (sSecDvcItems.length > 0) {
                    var sSecContractItems = sSecDvcItems.filter(function (a) {
                        return a.Name == "APP Contract";
                    });
                    for (var i = 0; i < sSecContractItems.length; i++) {
                        sSecContractItems[i].Contract__Amount = sSecContractItems[i].Total__Accessories__RRP__Inc__GST;
                        sSecContractItems[i].Monthly__Repayment = mTruncate(parseFloat(sSecContractItems[i].Total__Accessories__RRP__Inc__GST / sSecContractItems[i].Term).toString());
                        sSecContractItems[i].Prepayment__Amount = 0;
                    }
                }
                var secDevice = tsintitialData.OrderHeader.SecondaryDevices.filter(function (a) {
                    return a.Name == "Accessory";
                });
                for (var i = 0; i < secDevice.length; i++) {
                    secDevice[i].Prepayment__Amount = 0;
                }
                tsintitialData.OrderHeader.Accessories[0].Monthly__Repayment = mTruncate(parseFloat(tsintitialData.OrderHeader.Accessories[0].Total__Accessories__RRP__Inc__GST / tsintitialData.OrderHeader.Accessories[0].Term).toString());
                tsintitialData.OrderHeader.Accessories[0].Contract__Amount = tsintitialData.OrderHeader.Accessories[0].Total__Accessories__RRP__Inc__GST;
                tsintitialData.OrderHeader.Accessories[0].Prepayment__Amount = 0;
                var sAccArr = tsintitialData.OrderHeader.Accessories;
                sAccArr.forEach(function (item, index) {
                    item.Prepayment__Amount = 0;
                });
            }
            function updateDeviceTerm() {
                var sActualDevicePrice = tsintitialData.OrderHeader.Device.Device__RCC__Inc__GST;
                var gppdvcecontract = tsintitialData.OrderHeader.GppDeviceContract;
                gppdvcecontract.Contract__Amount = sActualDevicePrice;
                gppdvcecontract.Term = $(".vhats-d-term.applet-button-active").attr("term");
                gppdvcecontract.Monthly__Repayment = mTruncate(parseFloat(gppdvcecontract.Contract__Amount / gppdvcecontract.Term).toString());
                gppdvcecontract.Prepayment__Amount = 0;
                mSetPrepaymentaccordion();
            }
            function getPrepaymentLimit() {
                if (gCustomerType != "Person" && gCustomerType != "Sole Trader") {
                    return 0;
                }
                if (VHAAppUtilities.GetConstants("PrepaymentLimit")) {
                    return VHAAppUtilities.GetConstants("PrepaymentLimit");
                } else {
                    var SearchString = "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='Prepayment Limit'";
                    var prepaymentLimit = VHAAppUtilities.GetPickListValues("VF_CR_ENABLE_FLAG", SearchString);
                    VHAAppUtilities.SetConstants("PrepaymentLimit", Number(prepaymentLimit[0]));
                    return VHAAppUtilities.GetConstants("PrepaymentLimit");
                }
            }
            function eqpLmtContValidation() {
                var sContractCost = contractLimitCalc();
                var prepaymentLimit = getPrepaymentLimit();
                var prepaymentEntered = parseFloat(parseFloat(tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount).toFixed(2));
                $("#vha-ts-d-stockerrmsg").text("");
                if (prepaymentEntered > prepaymentLimit) {
                    $("#vha-ts-d-stockerrmsg").text("Prepayment amount exceeds prepayment limit, kindly reduce prepayment amount or remove items to proceed further");
                    var errFocus = document.querySelector("#vha-ts-d-stockerrmsg");
                    errFocus.focus();
                    errFocus.scrollIntoView();
                    return false;
                } else {
                    if (sContractCost > parseFloat(sSessionData.EquipmentLimit).toFixed(2)) {
                        $("#vha-ts-d-stockerrmsg").text("Devices and Accessories cost exceeds equipment limit, kindly enter prepayment amount or remove items to proceed further");
                        var errFocus = document.querySelector("#vha-ts-d-stockerrmsg");
                        errFocus.focus();
                        errFocus.scrollIntoView();
                        return false;
                    }
                }
                return true;
            }
            function contractLimitCalc() {
                var sTotalCost = 0;
                var sDeviceLineItem = tsintitialData.OrderHeader.GppDeviceContract;
                if (sDeviceLineItem.EligibleOrderLineItem == "Y") {
                    sTotalCost += parseFloat(parseFloat(sDeviceLineItem.Contract__Amount).toFixed(2));
                }
                var sSecDvcItems = tsintitialData.OrderHeader.SecondaryDevices;
                if (sSecDvcItems.length > 0) {
                    var sSecContractItems = sSecDvcItems.filter(function (a) {
                        return a.Name == "APP Contract";
                    });
                    for (var i = 0; i < sSecContractItems.length; i++) {
                        sTotalCost += parseFloat(parseFloat(sSecContractItems[i].Contract__Amount).toFixed(2));
                    }
                }
                var sAccessoryItems = tsintitialData.OrderHeader.Accessories;
                if (sAccessoryItems.length > 0) {
                    var sAccessoryContractItems = sAccessoryItems.filter(function (a) {
                        return a.Name == "APP Contract";
                    });
                    if (parseInt(sAccessoryContractItems[0].Number__of__Accessories) > 0) {
                        sTotalCost += parseFloat(parseFloat(sAccessoryContractItems[0].Contract__Amount).toFixed(2));
                    }
                }
                return parseFloat(parseFloat(sTotalCost).toFixed(2));
            }
            function equipmentLimitValidation() {
                var sTotalCost = 0;
                var sDeviceLineItem = tsintitialData.OrderHeader.Upgrade;
                if (sDeviceLineItem.EligibleOrderLineItem == "Y") {
                    sTotalCost += parseFloat(parseFloat(sDeviceLineItem.Total__RCC__Inc__GST).toFixed(2));
                }
                var sSecDvcItems = tsintitialData.OrderHeader.SecondaryDevices;
                if (sSecDvcItems.length > 0) {
                    var sSecContractItems = sSecDvcItems.filter(function (a) {
                        return a.Name == "APP Contract";
                    });
                    for (var i = 0; i < sSecContractItems.length; i++) {
                        sTotalCost += parseFloat(parseFloat(sSecContractItems[i].Total__Accessories__RRP__Inc__GST).toFixed(2));
                    }
                }
                var sAccessoryItems = tsintitialData.OrderHeader.Accessories;
                if (sAccessoryItems.length > 0) {
                    var sAccessoryContractItems = sAccessoryItems.filter(function (a) {
                        return a.Name == "APP Contract";
                    });
                    if (parseInt(sAccessoryContractItems[0].Number__of__Accessories) > 0) {
                        sTotalCost += parseFloat(parseFloat(sAccessoryContractItems[0].Total__Accessories__RRP__Inc__GST).toFixed(2));
                    }
                }
				
				//samsung voucheramount code
                var sDetlsBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
				var sOrderId = sDetlsBC.GetFieldValue("Order Id");
				var sApprovalId = sDetlsBC.GetFieldValue("Approval Id");
				if(sApprovalId!="" && sApprovalId!=null && sApprovalId!=undefined)
				{
					var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
					var Inps = SiebelApp.S_App.NewPropertySet();
					Inps.SetProperty("Service Name", "VF TBUI MSO Utilities");
					Inps.SetProperty("Method Name", "CheckVoucherAmount");
					Inps.SetProperty("OrderId", sOrderId);
					var out = ser.InvokeMethod("Run Process", Inps);
					var resultset = out.GetChildByType("ResultSet");
					var voucheramt = resultset.GetProperty("ssVoucherAmount");
					 sTotalCost += parseFloat(parseFloat(voucheramt).toFixed(2));       
					 //SiebelJS.Log(sOrderId);
					  
				} //Samsung voucheramount code end
				
                return parseFloat(parseFloat(sTotalCost).toFixed(2));
            }
            function updateSessionDetails(sPrice, sType, sOperation) {
                if (sType == "DeviceCost") {
                    if (sSessionData.Device.DevicePrice !== 0) {
                        sSessionData.TotalPrice -= parseFloat(parseFloat(sSessionData.Device.DevicePrice).toFixed(2));
                        sSessionData.TotalPrice = parseFloat(parseFloat(sSessionData.TotalPrice).toFixed(2));
                        sSessionData.TotalIndicativeCost -= parseFloat(parseFloat(sSessionData.Device.DevicePrice).toFixed(2) / parseInt(tsintitialData.OrderHeader.GppDeviceContract.Term));
                        sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                    }
                    sSessionData.Device.DevicePrice = Number(sPrice[0]);
                    if (sSessionData.Device.DevicePrice !== 0) {
                        sSessionData.TotalPrice += parseFloat(parseFloat(sSessionData.Device.DevicePrice).toFixed(2));
                        sSessionData.TotalPrice = parseFloat(parseFloat(sSessionData.TotalPrice).toFixed(2));
                        sSessionData.TotalIndicativeCost += parseFloat(parseFloat(parseFloat(sSessionData.Device.DevicePrice).toFixed(2) / parseInt(sPrice[1])).toFixed(2));
                        sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                    }
                } else {
                    if (sType == "PlanCost") {
                        sSessionData.TotalIndicativeCost -= Number(parseFloat(sSessionData.Plan.PlanPrice).toFixed(2));
                        sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                        sSessionData.Plan.PlanPrice = Number(parseFloat(sPrice).toFixed(2));
                        sSessionData.TotalIndicativeCost += Number(parseFloat(sPrice).toFixed(2));
                        sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                    } else {
                        if (sType == "SecondaryDeviceCost" && sOperation == "Add") {
                            sSessionData.SecondaryDevice.SecondaryPrice += parseFloat(parseFloat(parseFloat(sPrice)).toFixed(2));
                            sSessionData.SecondaryDevice.SecondaryPrice = parseFloat(sSessionData.SecondaryDevice.SecondaryPrice).toFixed(2);
                            sSessionData.SecondaryDevice.Count += 1;
                            sSessionData.TotalPrice += Number(parseFloat(sPrice));
                            sSessionData.TotalPrice = parseFloat(parseFloat(sSessionData.TotalPrice).toFixed(2));
                            sSessionData.TotalIndicativeCost += parseFloat(parseFloat(parseFloat(sPrice) / parseFloat($(".vha-ts-sd-term.applet-button-active").attr("term"))).toFixed(2));
                            sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                        } else {
                            if (sType == "SecondaryDeviceCost" && sOperation == "Remove") {
                                sSessionData.SecondaryDevice.SecondaryPrice -= parseFloat(parseFloat(parseFloat(sPrice[0]))).toFixed(2);
                                sSessionData.SecondaryDevice.SecondaryPrice = parseFloat(sSessionData.SecondaryDevice.SecondaryPrice).toFixed(2);
                                sSessionData.SecondaryDevice.Count -= 1;
                                sSessionData.TotalPrice -= Number(sPrice[0]);
                                sSessionData.TotalPrice = parseFloat(parseFloat(sSessionData.TotalPrice).toFixed(2));
                                sSessionData.TotalIndicativeCost -= parseFloat(parseFloat(parseFloat(parseFloat(sPrice[0])) / sPrice[1]).toFixed(2));
                                sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                            } else {
                                if (sType == "AccessoryCost" && sOperation == "Add") {
                                    sSessionData.Accessories.AccessoryMonthlyPrice += parseFloat(parseFloat(mTruncate((sPrice / parseInt($(".vha-ts-a-term.applet-button-active").attr("term"))).toString())).toFixed(2));
                                    sSessionData.Accessories.AccessoryMonthlyPrice = parseFloat(parseFloat(sSessionData.Accessories.AccessoryMonthlyPrice).toFixed(2));
                                    sSessionData.Accessories.AccessoryPrice += parseFloat(parseFloat(mTruncate(sPrice.toString())).toFixed(2));
                                    sSessionData.Accessories.AccessoryPrice = parseFloat(parseFloat(sSessionData.Accessories.AccessoryPrice).toFixed(2));
                                    sSessionData.Accessories.Count += 1;
                                    sSessionData.TotalPrice += parseFloat(parseFloat(mTruncate(sPrice.toString())).toFixed(2));
                                    sSessionData.TotalPrice = parseFloat(parseFloat(sSessionData.TotalPrice).toFixed(2));
                                    sSessionData.TotalIndicativeCost += parseFloat(parseFloat(mTruncate((sPrice / parseInt($(".vha-ts-a-term.applet-button-active").attr("term"))).toString())).toFixed(2));
                                    sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                } else {
                                    if (sType == "AccessoryCost" && sOperation == "Remove") {
                                        sSessionData.Accessories.AccessoryPrice -= parseFloat(parseFloat(mTruncate(sPrice[0].toString())).toFixed(2));
                                        sSessionData.Accessories.AccessoryPrice = parseFloat(parseFloat(sSessionData.Accessories.AccessoryPrice).toFixed(2));
                                        sSessionData.Accessories.AccessoryMonthlyPrice -= parseFloat(parseFloat(mTruncate((sPrice[0] / parseInt($(".vha-ts-a-term.applet-button-active").attr("term"))).toString())));
                                        sSessionData.Accessories.AccessoryMonthlyPrice = parseFloat(parseFloat(sSessionData.Accessories.AccessoryMonthlyPrice).toFixed(2));
                                        sSessionData.Accessories.Count -= sPrice[1];
                                        sSessionData.TotalPrice -= parseFloat(parseFloat(mTruncate(sPrice[0])));
                                        sSessionData.TotalPrice = parseFloat(parseFloat(sSessionData.TotalPrice).toFixed(2));
                                        sSessionData.TotalIndicativeCost -= parseFloat(parseFloat(mTruncate((sPrice[0] / parseInt($(".vha-ts-a-term.applet-button-active").attr("term"))).toString())));
                                        sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                    } else {
                                        if (sType == "DataAddOns") {
                                            sSessionData.TotalIndicativeCost -= Number(parseFloat(sSessionData.DataAddOns.AddonPrice).toFixed(2));
                                            sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                            sSessionData.DataAddOns.AddonPrice = Number(parseFloat(sPrice).toFixed(2));
                                            sSessionData.TotalIndicativeCost += Number(parseFloat(sPrice).toFixed(2));
                                            sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                        } else {
                                            if (sType == "IddAddOns") {
                                                sSessionData.TotalIndicativeCost -= Number(parseFloat(sSessionData.IddAddOns.AddonPrice).toFixed(2));
                                                sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                                sSessionData.IddAddOns.AddonPrice = Number(parseFloat(sPrice).toFixed(2));
                                                sSessionData.TotalIndicativeCost += Number(parseFloat(sPrice).toFixed(2));
                                                sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                            } else {
                                                if (sType == "PhoneInsurance" && sOperation == "Add") {
                                                    sSessionData.PhoneInsurance.InsurancePrice += Number(parseFloat(sPrice));
                                                    sSessionData.TotalIndicativeCost += Number(parseFloat(sPrice));
                                                    sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                                } else {
                                                    if (sType == "PhoneInsurance" && sOperation == "Remove") {
                                                        sSessionData.PhoneInsurance.InsurancePrice -= Number(parseFloat(sPrice));
                                                        sSessionData.TotalIndicativeCost -= Number(parseFloat(sPrice));
                                                        sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                                    } else {
                                                        if (sType == "RestrictedDiscount" && sOperation == "Add") {
                                                            sSessionData.TotalIndicativeCost += Number(parseFloat(sSessionData.RestrictedDiscount.Price).toFixed(2));
                                                            sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                                            sSessionData.RestrictedDiscount.Price = Number(parseFloat(sPrice).toFixed(2));
                                                            sSessionData.TotalIndicativeCost -= Number(parseFloat(sPrice).toFixed(2));
                                                            sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                                        } else {
                                                            if (sType == "AddDiscounts") {
                                                                sSessionData.TotalIndicativeCost += Number(parseFloat(sSessionData.DeviceDiscounts.Price).toFixed(2));
                                                                sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                                                sSessionData.DeviceDiscounts.Price = Number(parseFloat(sPrice).toFixed(2));
                                                                sSessionData.TotalIndicativeCost -= Number(parseFloat(sPrice).toFixed(2));
                                                                sSessionData.TotalIndicativeCost = parseFloat(parseFloat(sSessionData.TotalIndicativeCost).toFixed(2));
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            function totalIndicativeCostCalc() {
                var sTotalIndCost = 0;
                var sDeviceLineItem = tsintitialData.OrderHeader.GppDeviceContract;
                if (sDeviceLineItem.EligibleOrderLineItem == "Y") {
                    sTotalIndCost += parseFloat(parseFloat(sDeviceLineItem.Monthly__Repayment).toFixed(2));
                }
                if (tsintitialData.OrderHeader.UpgradeOfferType == "Upgrade to New plan") {
                    var sPlanLineItem = tsintitialData.OrderHeader.RedPlusPlan;
                    if (sPlanLineItem.EligibleOrderLineItem == "Y") {
                        sTotalIndCost += parseFloat(parseFloat(sPlanLineItem.PlanPrice).toFixed(2));
                    }
                } else {
                    sTotalIndCost += parseFloat(parseFloat(sExtPlanPri).toFixed(2));
                }
                var sSecDvcItems = tsintitialData.OrderHeader.SecondaryDevices;
                if (sSecDvcItems.length > 0) {
                    var sSecContractItems = sSecDvcItems.filter(function (a) {
                        return a.Name == "APP Contract";
                    });
                    var sSecIns = sSecDvcItems.filter(function (a) {
                       // return a.Name == "Vodafone Swap & Go - Wearables";
						return a.Name == "Vodafone Device Care Wearables";
                    });
                    for (var i = 0; i < sSecContractItems.length; i++) {
                        sTotalIndCost += parseFloat(parseFloat(sSecContractItems[i].Monthly__Repayment).toFixed(2));
                    }
                    for (var i = 0; i < sSecIns.length; i++) {
                        var Price = 5;
                        sTotalIndCost += parseFloat(parseFloat(Price).toFixed(2));
                    }
                }
                var sAccessoryItems = tsintitialData.OrderHeader.Accessories;
                if (sAccessoryItems.length > 0) {
                    var sAccessoryContractItems = sAccessoryItems.filter(function (a) {
                        return a.Name == "APP Contract";
                    });
                    if (parseInt(sAccessoryContractItems[0].Number__of__Accessories) > 0) {
                        sTotalIndCost += parseFloat(parseFloat(sAccessoryContractItems[0].Monthly__Repayment).toFixed(2));
                    }
                }
                var sIDDAddon = tsintitialData.OrderHeader.IddAddOns;
                if (sIDDAddon.EligibleOrderLineItem == "Y" && parseFloat(sIDDAddon.MaxPrice) > 0) {
                    sTotalIndCost += parseFloat(parseFloat(sIDDAddon.MaxPrice).toFixed(2));
                }
                var sDataAddon = tsintitialData.OrderHeader.DataAddOns;
                if (sDataAddon.EligibleOrderLineItem == "Y" && parseFloat(sDataAddon.MaxPrice) > 0) {
                    sTotalIndCost += parseFloat(parseFloat(sDataAddon.MaxPrice).toFixed(2));
                }
                var sPhoneInsurance = tsintitialData.OrderHeader.PhoneInsurance;
                if (sPhoneInsurance.length > 0) {
                    for (var i = 0; i < sPhoneInsurance.length; i++) {
                        sTotalIndCost += parseFloat(parseFloat(sPhoneInsurance[i].MaxPrice).toFixed(2));
                    }
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_SAM1569.EligibleOrderLineItem == "Y") {
                    sTotalIndCost -= parseFloat(parseFloat(tsintitialData.OrderHeader.RecurringDiscount_SAM1569.MaxPrice).toFixed(2));
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_AUX0207.EligibleOrderLineItem == "Y") {
                    sTotalIndCost -= parseFloat(parseFloat(tsintitialData.OrderHeader.RecurringDiscount_AUX0207.MaxPrice).toFixed(2));
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_AUX1414.EligibleOrderLineItem == "Y") {
                    sTotalIndCost -= parseFloat(parseFloat(tsintitialData.OrderHeader.RecurringDiscount_AUX1414.MaxPrice).toFixed(2));
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_AUV0450.EligibleOrderLineItem == "Y") {
                    sTotalIndCost -= parseFloat(parseFloat(tsintitialData.OrderHeader.RecurringDiscount_AUV0450.MaxPrice).toFixed(2));
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_AUV0451.EligibleOrderLineItem == "Y") {
                    sTotalIndCost -= parseFloat(parseFloat(tsintitialData.OrderHeader.RecurringDiscount_AUV0451.MaxPrice).toFixed(2));
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_AUV0452.EligibleOrderLineItem == "Y") {
                    sTotalIndCost -= parseFloat(parseFloat(tsintitialData.OrderHeader.RecurringDiscount_AUV0452.MaxPrice).toFixed(2));
                }
				if (tsintitialData.OrderHeader.RecurringDiscount_AUV0535.EligibleOrderLineItem == "Y") {
                    sTotalIndCost -= parseFloat(parseFloat(tsintitialData.OrderHeader.RecurringDiscount_AUV0535.MaxPrice).toFixed(2));
                }
                sTotalIndCost -= parseFloat(parseFloat(tsintitialData.OrderHeader.DeviceDiscounts.DiscountCredit).toFixed(2));
                sTotalIndCost -= parseFloat(parseFloat(tsintitialData.OrderHeader.DeviceDiscounts.DiscountLoyalty).toFixed(2));
                sTotalIndCost -= parseFloat(parseFloat(tsintitialData.OrderHeader.DeviceDiscounts.BundleandSave).toFixed(2));
                if (sTotalIndCost > 0) {
                    $(".vha-ts-indcost .vha-ts-cartval").text(parseFloat(sTotalIndCost).toFixed(2));
                } else {
                    $(".vha-ts-indcost .vha-ts-cartval").text("00.00");
                }
            }
            function mTruncate(sValue) {
                var sPoint = "",
                sTruncValue = "0.00",
                sLeft = "0",
                sRight = "00";
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
            function shipvalidation(msgdata) {
                var msgList = [];
                $("#listid").empty();
                $("#listmsgid").empty();
                var msg = true;
                if (msgdata.ShippingValidationError != "Y") {
                    msg = true;
                } else {
                    /*if (msgdata.TitleValidation != "") {
                        msgList.push(msgdata.TitleValidation);
                    }*/
                    if (msgdata.NotifyTxtCheck != "") {
                        msgList.push(msgdata.NotifyTxtCheck);
                    }
                    if (msgdata.NotifyTxtEmailCheck != "") {
                        msgList.push(msgdata.NotifyTxtEmailCheck);
                    }
                    if (msgdata.ShipAddrValidation != "") {
                        msgList.push(msgdata.ShipAddrValidation);
                    }
                    if (msgdata.ShippingPrefValidation != "") {
                        msgList.push(msgdata.ShippingPrefValidation);
                    }
                    if (msgdata.NotifyEmailCheck != "") {
                        msgList.push(msgdata.NotifyEmailCheck);
                    }
                    if (msgdata.LastNameValidation != "") {
                        msgList.push(msgdata.LastNameValidation);
                    }
                    if (msgdata.AddrTypeValidation != "") {
                        msgList.push(msgdata.AddrTypeValidation);
                    }
                    if (msgdata.BusinessNameValidation != "") {
                        msgList.push(msgdata.BusinessNameValidation);
                    }
                    if (msgdata.FirstNameValidation != "") {
                        msgList.push(msgdata.FirstNameValidation);
                    }
                    if (msgdata.InvalidEmailFormat != "") {
                        msgList.push(msgdata.InvalidEmailFormat);
                    }
                    if (msgdata.InvalidMSISDNFormat != "") {
                        msgList.push(msgdata.InvalidMSISDNFormat);
                    }
                    msg = false;
                    $(".FormSection").after('<ul id="listmsgid">All mandatory fields are required.</ul>');
                    $("#listmsgid").after('<ul id="listid"></ul>');
                    for (var i = 0; i < msgList.length; i++) {
                        $("#listid").append("<li>" + msgList[i] + "</li>");
                    }
                }
                return msg;
            }
            function clearJSONObj(sEntityList) {
                var sProperties = ["Action", "GroupId", "Name", "StockIndicator", "Type", "Prod__Integration__Id", "VHA__SD__Group Id", "GPI", "SAMId", "MaxPrice", "ProductId"];
                for (var j = 0; j < sEntityList.length; j++) {
                    var sEntity = sEntityList[j];
                    var sKeyList = Object.keys(tsintitialData.OrderHeader[sEntity]);
                    for (var i = 0; i < sKeyList.length; i++) {
                        if (!sProperties.includes(sKeyList[i])) {
                            if (sKeyList[i] == "EligibleOrderLineItem") {
                                tsintitialData.OrderHeader[sEntity][sKeyList[i]] = "N";
                            } else {
                                tsintitialData.OrderHeader[sEntity][sKeyList[i]] = "";
                            }
                        }
                    }
                }
            }
            function Totalcountvalue(devicecount, plancount, secdevice, accssorycount) {
                var TotalCart = 0;
                TotalCart = devicecount + plancount + secdevice + accssorycount;
                $(".numberCircle").text("");
                $(".numberCircle").append(TotalCart);
            }
            function idDelIcon() {
                $("#iddel").remove();
                $("body").append('<div id="iddel" style="height:100% !important; width:480px !important">                                                                                Are you sure you want to Delete the Cart?                                                                </div>');
                $("#iddel").dialog({
                    autoOpen: false,
                    modal: true,
                    buttons: [{
                            text: "No",
                            "class": "vha-custom-button btn vhasecondarybtn",
                            click: function () {
                                $(this).dialog("close");
                            }
                        }, {
                            text: "Yes",
                            "class": "vha-custom-button btn btn-secondary vhacntbtn",
                            click: function () {
                                updateSessionDetails([0, 0], "DeviceCost", "Add");
                                updateSessionDetails(0, "PlanCost", "Add");
                                updateSessionDetails(0, "AddDiscounts", "Add");
                                $(".vha-ts-dvcplan").empty();
                                $(".device-card").removeClass("borderhighlight");
                                //Balaji - RC
                                var StoreResApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Store Reservation 3 Step Upgrade");
                                var aStoreResBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade");
                                if ($(".vha-ts-storeres #tickmark").prop("checked")) { //Balaji - RC
                                    if (StoreResApplet.GetRecordSet().length > 0) {
                                        if (StoreResApplet.GetRecordSet()[0]['Reservation Status'] == 'Reserved')
                                            StoreResApplet.InvokeMethod("UnReserveStock");
                                        else if (StoreResApplet.GetRecordSet()[0]['Reservation Status'] == '') {
                                            aStoreResBC.SetFieldValue("SKU Code", "");
											aStoreResBC.SetFieldValue("Device Name", "");
                                            aStoreResBC.SetFieldValue("Store Code", "");
                                            aStoreResBC.InvokeMethod("WriteRecord");
                                        }
                                    }
                                    //$(".vha-ts-storeres #tickmark").prop("checked", false);
                                    //$("#"+StoreResApplet.GetFullId()).addClass("VFDisplayNone");
                                }
                                clearJSONObj(["Device", "Upgrade", "GppDeviceContract", "RedPlusPlan"]);
                                tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST = 0;
                                tsintitialData.OrderHeader.GppDeviceContract.Contract__Amount = 0;
                                tsintitialData.OrderHeader.RedPlusPlan.Name = "";
                                tsintitialData.OrderHeader.RedPlusPlan.PlanPrice = 0;
                                tsintitialData.OrderHeader.RedPlusPlan.EligibleOrderLineItem = "N";
                                priPlanDtl = "";
                                $(".vhats-d-term[term='36']").trigger("click");
                                $("div#stockmsg").text("");
                                $(".vha-ts-searchdevice").text("");
                                $(".card").removeClass("borderhighlight");
                                $(".vha-ts-imei").val("");
                                $(".vha-ts-secdvc-chd").empty();
                                $(".vha-gf-accordion-chd").each(function (index, item) {
                                    if ($(item).hasClass("VFDisplayNone") == false) {
                                        $(item).addClass("VFDisplayNone");
                                    }
                                });
                                $(".vha-arrow").removeClass("vha-arrow-down");
                                $("#vha-ts-device-hd").next().removeClass("VFDisplayNone");
                                $("#vha-ts-device-hd").find(".vha-arrow").addClass("vha-arrow-down");
                                $(".vha-ts-searchdevice").val("");
                                $(".vha-ts-searchplan").val("");
                                $("#showDeviceMsg").empty();
                                $("#showDeviceMsg1").empty();
                                for (i = 0; i < Deletedevice; i++) {
                                    $(".NCIdrecLines #secremove").trigger("click");
                                }
                                $("#ts-secondary-model").val("");
                                $("#ts-search-ean").val("");
                                $(".vha-ts-sd-term").removeClass("applet-button-active");
                                $("#vha-ts-sd-stockerrmsg").empty();
                                $("#secondaryimei").empty();
                                $("#pickmodelid").text("");
                                filterBrand = "Apple";
                                $(".vha-ts-btn-div").trigger("class");
                                $(".vhatsbrand").removeClass("applet-button-active");
                                $("#vhatsupgradeapple").addClass("applet-button-active");
                                filterBrand = $(this).text();
                                filterDevices();
                                $("#vha-ts-carousel").empty();
                                $("#vhatsupgradeapple").trigger("click");
                                $(".vhatsplantype").removeClass("applet-button-active");
                                $("#vha-ts-p-carousel-container").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
                                $("#secondaryslected div[vha_sd_grp_id] a#secremove").each(function (index) {
                                    $(this).trigger("click");
                                });
                                $("#ts-secondary-model").val();
                                $("#ts-search-ean").val("");
                                $("#secondaryimei").val();
                                $(".vha-ts-sd-term").removeClass("applet-button-active");
                                $(".vha-ts-secondarybrand").removeClass("applet-button-active");
                                $("#ts-secondary-model").val("");
                                $("#secondaryimei").val("");
                                $("#pickmodelid").text("");
                                $("#vha-ts-sd-imeierrmsg").empty();
                                $("#ts-accessory-cat").val("");
                                $("#ts-accessory-model").val("");
                                $("#tssearchplan").val("");
                                $("#ts-accessory-code").val("");
                                $("#ts-accessory-ean").val("");
                                $(".vha-ts-a-term").removeClass("applet-button-active");
                                $("#showMsgAdd").empty();
                                for (i = 0; i < AccessoryDelete1; i++) {
                                    $("#accessoryselected #accessremove").trigger("click");
                                }
                                $(".tssearchplan").val("");
                                $("#Addlimitcount").empty();
                                $("#vhatsaddsimno").removeClass("applet-button-passive");
                                $("#vhatsaddsimno").addClass("applet-button-active");
                                $("#vhatsaddsimy").removeClass("applet-button-active");
                                $("#vhatsaddsimy").addClass("applet-button-passive");
                                $(".numberCircle").text("0");
                                devicecount = 0;
                                plancount = 0;
                                secdevice = 0;
                                accssorycount = 0;
                                $(".vha-ts-addons").addClass("VFDisplayNone");
                                $(".vha-ts-discount").addClass("VFDisplayNone");
                                $(".vha-ts-offers").addClass("VFDisplayNone");
                                $(".vha-ts-cart-sum").addClass("VFDisplayNone");
                                triggerCustomerExpand();
                                $(".vha-ts-indcost .vha-ts-cartval").text("0.00");
                                $(".ts-data-addon-method .applet-button[val='NotInterested']").trigger("click");
                                $("#vhatsupgradeapple[val='NotInterested']").trigger("click");
                                $(".ts-international-call-method .applet-button[val='NotInterested']").trigger("click");
                                $(".ts-discounts-method .applet-button[val='NotInterested']").trigger("click");
                                $("#ts-new-device-ins").val("None").change();
                                $(".ts-addremoveins-method .applet-button[val='Yes']").trigger("click");//Sharan:06/09/2023:CPVT-1149 Modified
                                $(".vha-ts-device-select #vha-ts-d-equiplmtmsg").text("");
                                $("#vha-ts-sd-equiplmtmsg").text("");
                                $("#ts-secondary-model").val();
                                $("#secondaryimei").val();
                                $(".vha-ts-sd-term").removeClass("applet-button-active");
                                $("#vha-ts-access").find("#vhasecondaryadd").attr("Productcd", "");
                                $("#ts-accessory-cat").val("");
                                $("#ts-accessory-model").val("");
                                $("#vha-ts-accessorylist").val("");
                                $("#ts-accessory-code").val("");
                                $("#ts-accessory-ean").val("");
                                $("#ts-pick-sg").val("");
                                $("#vha-ts-accsry-stockerrmsg").text("");
                                $("#vha-ts-accsry-equiplmtmsg").text("");
                                $(".vha-ts-a-term").removeClass("applet-button-active");
                                $("#vha-ts-access").find("#vhaaccessadd").attr("Productcd", "");
                                $("#showMsgAdd").text("");
                                $("#accessmsg").text("");
                                if ($(".vha-ts-simonlyupg input[type=checkbox]").is(":checked")) {
                                    $(".vha-ts-simonlyupg input[type=checkbox]").trigger("click");
                                    addDiscounts("");
                                }
                                $("#vha-ts-d-stockerrmsg").text("");
                                $(".vha-ts-rcc").attr("disabled", true);
                                $(".vha-ts-rcc").val("");
                                tsintitialData.OrderHeader.RCCEditable = "N";
                                $(".vha-ts-cartimg .numberCircle").text(0);
                                $("#listid").empty();
                                $("#listmsgid").empty();
                                refreshPromocode();
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
                    open: function (event, ui) {
                        $('[aria-describedby="iddel"] .ui-dialog-titlebar').append('<div class="vha-tot-close"></div>');
                        $('[aria-describedby="iddel"] .ui-dialog-title').remove();
                        $(".vha-tot-close").off("click").on("click", function () {
                            $("#iddel").dialog("close");
                        });
                    },
                    close: function (event, ui) {
                        $(".vha-tot-close").remove();
                    }
                });
            }
            function resetUI() {
                updateSessionDetails([0, 0], "DeviceCost", "Add");
                updateSessionDetails(0, "PlanCost", "Add");
                updateSessionDetails(0, "AddDiscounts", "Add");
                clearJSONObj(["Device", "Upgrade", "GppDeviceContract", "RedPlusPlan"]);
                tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST = 0;
                tsintitialData.OrderHeader.GppDeviceContract.Contract__Amount = 0;
                tsintitialData.OrderHeader.RedPlusPlan.Name = "";
                tsintitialData.OrderHeader.RedPlusPlan.PlanPrice = 0;
                tsintitialData.OrderHeader.RedPlusPlan.EligibleOrderLineItem = "N";
                addDiscounts("");
                $(".vha-ts-device-select #vha-ts-d-equiplmtmsg").text("");
                $("#vha-ts-sd-equiplmtmsg").text("");
                $("#vha-ts-accsry-equiplmtmsg").text("");
                $("#vha-ts-sd-stockerrmsg").text("");
                $("#vha-ts-accsry-stockerrmsg").text("");
                $("#showDeviceMsg").empty();
                $("#showDeviceMsg1").empty();
                $("#vha-ts-d-imeierrmsg").empty();
                $("#secondaryslected div[vha_sd_grp_id] a#secremove").each(function (index) {
                    $(this).trigger("click");
                });
                $("#ts-secondary-model").val();
                $("#ts-search-ean").val("");
                $("#secondaryimei").val();
                $(".vha-ts-sd-term").removeClass("applet-button-active");
                $(".vha-ts-secondarybrand").removeClass("applet-button-active");
                $("#ts-secondary-model").val("");
                $("#secondaryimei").val("");
                $("#pickmodelid").text("");
                $("#vha-ts-sd-imeierrmsg").empty();
                $("#accessoryselected div.accessory a#accessremove").each(function (index) {
                    $(this).trigger("click");
                });
                $("#ts-accessory-cat").val("");
                $("#ts-accessory-model").val("");
                $("#vha-ts-accessorylist").val("");
                $("#ts-accessory-code").val("");
                $("#ts-pick-sg").val("");
                $("#ts-accessory-ean").val("");
                $(".vha-ts-a-term").removeClass("applet-button-active");
                $(".ts-roaming-method .applet-button[val='5Roaming']").trigger("click");
                $(".ts-data-addon-method .applet-button[val='NotInterested']").trigger("click");
                $(".ts-international-call-method .applet-button[val='NotInterested']").trigger("click");
                $(".ts-discounts-method .applet-button[val='NotInterested']").trigger("click");
                $("#ts-new-device-ins").val("None").change();
                $(".ts-addremoveins-method .applet-button[val='Yes']").trigger("click");//Sharan:06/09/2023:CPVT-1149 Modified
                $(".vha-gf-accordion-chd").each(function (index, item) {
                    if ($(item).hasClass("VFDisplayNone") == false) {
                        $(item).addClass("VFDisplayNone");
                    }
                });
                $(".vha-arrow").removeClass("vha-arrow-down");
                $("#vha-ts-device-hd").next().removeClass("VFDisplayNone");
                $("#vha-ts-device-hd").find(".vha-arrow").addClass("vha-arrow-down");
                var planFilter = [];
                createPlanTiles(planFilter);
                priPlanDtl = "";
                $(".vha-ts-device-select").removeClass("VFDisplayNone");
                $(".vhats-d-term[term='36']").trigger("click");
                $(".vha-ts-dvcplan").addClass("VFDisplayNone");
                $(".vha-ts-cart-sum").addClass("VFDisplayNone");
                triggerCustomerExpand();
                $(".vha-ts-indcost .vha-ts-cartval").text("0.00");
                $("#vha-ts-device .vha-h-line").show();
                $(".vha-ts-searchdevice").text("");
                $(".vha-ts-imei").val("");
                $("#ts-plan-search").val("");
                $("#ts-device-search").val("");
                $(".vhatsbrand").removeClass("applet-button-active");
                $("#vhatsupgradeapple").addClass("applet-button-active");
                $(".vhatsplantype").removeClass("applet-button-active");
                $("#vha-ts-access").find("#vhasecondaryadd").attr("Productcd", "");
                $("#vha-ts-access").find("#vhaaccessadd").attr("Productcd", "");
                $("#showMsgAdd").text("");
                $("#accessmsg").text("");
                $("#vha-ts-d-stockerrmsg").text("");
                $(".vha-ts-rcc").attr("disabled", true);
                $(".vha-ts-rcc").val("");
                tsintitialData.OrderHeader.RCCEditable = "N";
                $(".vha-ts-cartimg .numberCircle").text(0);
                $("#listid").empty();
                $("#listmsgid").empty();
            }
            function accessoryValidation() {
                var errorMsg = false;
                if (sCapPlan) {
                    var secDevice = tsintitialData.OrderHeader.SecondaryDevices.filter(function (a) {
                        return a.Name == "Accessory";
                    });
                    var accessory = tsintitialData.OrderHeader.Accessories.filter(function (a) {
                        return a.Name == "Accessory";
                    });
                    if (secDevice.length > 0 || accessory.length > 0) {
                        errorMsg = true;
                        if (secDevice.length > 0) {
                            $("#vha-ts-sd-stockerrmsg").text("Accessory option is not available for Cap Plans.");
                            $("#vha-ts-sd-stockerrmsg").removeClass("text-warning").addClass("text-danger");
                            var errFocus = document.querySelector("#vha-ts-sd-stockerrmsg");
                            errFocus.focus();
                            errFocus.scrollIntoView();
                        }
                        if (accessory.length > 0) {
                            $("#vha-ts-accsry-stockerrmsg").text("Accessory option is not available for Cap Plans.");
                            $("#vha-ts-accsry-stockerrmsg").removeClass("text-warning").addClass("text-danger");
                            var errFocus = document.querySelector("#vha-ts-accsry-stockerrmsg");
                            errFocus.focus();
                            errFocus.scrollIntoView();
                        }
                    }
                }
                return errorMsg;
            }
            function validation() {
                $("#showDeviceMsg").empty();
                $("#showDeviceMsg1").empty();
                var erormsg = true;
                var Checkdevice = $("#vha-ts-upg-btn").attr("class");
                var Checkdevice1 = $("#vha-ts-resign-btn").attr("class");
                var Checkdevice2 = $("#vha-ts-rrp-btn").attr("class");
                if (Checkdevice.indexOf("applet-button-active") > -1) {
                    if (currentGPPCnt >= maxGPPCnt && sSimOnlyUpg !== "Y") {
                        $(".vha-ts-device-select #vha-ts-d-stockerrmsg").text("You have reached the maximum allowed MPP/GPPs. You will need to Terminate an existing MPP/GPP before you can add more MPP/GPPs to this service.");
                        var errFocus = document.querySelector(".vha-ts-device-select #vha-ts-d-stockerrmsg");
                        errFocus.focus();
                        errFocus.scrollIntoView();
                        erormsg = false;
                    } else {
                        if (sSimOnlyUpg !== "Y" && tsintitialData.OrderHeader.Device.Device__Code == "") {
                            $(".vha-ts-searchdevice-col").after("<span id='showDeviceMsg'>Please select Device</span>");
                            var errFocus = document.querySelector(".vha-ts-searchdevice-col");
                            errFocus.focus();
                            errFocus.scrollIntoView();
                            erormsg = false;
                            $(".vha-ts-shrngcmp").remove();
                        } else if (tsintitialData.OrderHeader.RedPlusPlan.Name == "") {
                            $(".vha-ts-searchplan-col").after("<span id='showDeviceMsg1'>Please select Plan</span>");
                            var errFocus = document.querySelector(".vha-ts-searchplan-col");
                            errFocus.focus();
                            errFocus.scrollIntoView();
                            erormsg = false;
                        }
                    }
                } else {
                    if (tsintitialData.OrderHeader.Device.Device__Code == "") {
                        $(".vha-ts-searchdevice-col").after("<span id='showDeviceMsg'>Please select Device</span>");
                        var errFocus = document.querySelector(".vha-ts-searchdevice-col");
                        errFocus.focus();
                        errFocus.scrollIntoView();
                        erormsg = false;
                        $(".vha-ts-shrngcmp").remove();
                    } else {
                        if (currentGPPCnt >= maxGPPCnt && sSimOnlyUpg !== "Y") {
                            $(".vha-ts-device-select #vha-ts-d-stockerrmsg").text("You have reached the maximum allowed MPP/GPPs. You will need to Terminate an existing MPP/GPP before you can add more MPP/GPPs to this service.");
                            var errFocus = document.querySelector(".vha-ts-device-select #vha-ts-d-stockerrmsg");
                            errFocus.focus();
                            errFocus.scrollIntoView();
                            erormsg = false;
                        }
                    }
                }
                return erormsg;
            }
            function prepaymentValidation() {
                var erormsg = true;
                var cardNumber = tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardNumber;
                var totalPrepaymentAmt = tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount;
				var payType = tsintitialData.OrderHeader.Prepayment.PrepaymentType;//vasavi added for florida
                var payStatus = tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.PaymentStatus; //vasavi added for florida       
                $("#vhagfppnotinterestedbtn").parent().children("#showMsg").remove();
                if (Number(totalPrepaymentAmt) > 0) {
					//vasavi added below if block for florida
					if (payType == "vhagfppgenerateupibtn" && payStatus != "Approved") { 
                        erormsg = false;
                        $("#vhagfppnotinterestedbtn").parent().append("<span id='showMsg'>The order has prepayment and payment is not approved, please ask customer to make payment and the submit order</span>");
                        var errFocus = document.querySelector("#vha-ts-prepayment #showMsg");
                        errFocus.focus();
                        errFocus.scrollIntoView();
                    }
                    if (payType == "vhagfppcreditcardbtn" && (cardNumber == "" || typeof cardNumber == "undefined")) { //vasavi added payType condition for florida
                        erormsg = false;
                        $("#vhagfppnotinterestedbtn").parent().append("<span id='showMsg'>Card details are mandatory for Prepayment.</span>");
                        var errFocus = document.querySelector("#vha-ts-prepayment #showMsg");
                        errFocus.focus();
                        errFocus.scrollIntoView();
                    }
                }
                var prepaymentLimit = getPrepaymentLimit();
                var totalPrepaymentAmt = tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount;
                $(".vha-ts-carddetails").parent().children("#showMsg").remove();
                if (totalPrepaymentAmt > prepaymentLimit) {
                    $(".vha-ts-carddetails").after("<span id='showMsg'>Please enter voluntary prepayment amount value between 0 to " + prepaymentLimit + "</span>");
					$(".vha-ts-upidetails").after("<span id='showMsg'>Please enter voluntary prepayment amount value between 0 to " + prepaymentLimit + "</span>");
                    erormsg = false;
                    var errFocus = document.querySelector("#vha-ts-prepayment #showMsg");
                    errFocus.focus();
                    errFocus.scrollIntoView();
                }
                return erormsg;
            }
            function upgradevalidation() {
                var upgraderesult = true;
                $("#upgradeId").empty();
                if ($("#vha-ts-upg-btn").hasClass("applet-button-active") || $("#vha-ts-resign-btn").hasClass("applet-button-active") || $("#vha-ts-rrp-btn").hasClass("applet-button-active")) {
                    upgraderesult = true;
                } else {
                    $(".vha-ts-opt").after("<span id='upgradeId'  class='text-danger'>Please select the Upgrade</span>");
                    var errFocus = document.querySelector(".vha-ts-opt");
                    errFocus.focus();
                    errFocus.scrollIntoView();
                    upgraderesult = false;
                }
                return upgraderesult;
            }
            function reasonvalidation() {
                var overrideresult = true;
                $("#overrideId").empty();
                if ($("#vha-ts-upg-btn").hasClass("VFDisplayNone") && $("#vha-ts-resign-btn").hasClass("VFDisplayNone") && $("#vha-ts-rrp-btn").hasClass("VFDisplayNone")) {
                    $("#ts-override-reason").after("<span id='overrideId'>Please Select Override Reason to Proceed</span>");
                    var errFocus = document.querySelector("#ts-override-reason");
                    errFocus.focus();
                    errFocus.scrollIntoView();
                    overrideresult = false;
                    $("#upgradeId").empty();
                } else {
                    overrideresult = true;
                }
                return overrideresult;
            }
            function updateCart() {
                var monthlyDevicePrepayment = 0;
                if (sSimOnlyUpg != "Y") {
                    var deviceTotalCost = tsintitialData.OrderHeader.Device.Device__RCC__Inc__GST;
                    var device_term = tsintitialData.OrderHeader.GppDeviceContract.Term;
                    var prepaymentAmount = tsintitialData.OrderHeader.GppDeviceContract.Prepayment__Amount;
                    var finalDeviceMonthlyPayment = (Number(deviceTotalCost) - Number(prepaymentAmount)) / Number(device_term);
                    $(".cart-device-info .h5.vha-ts-cartval").html("$ " + mTruncate(finalDeviceMonthlyPayment.toString()));
                    $(".h5.vha-ts-d-payinfo").html("$ " + mTruncate((Number(deviceTotalCost) - Number(prepaymentAmount)).toString()) + " over " + device_term + " months");
                    updateSessionDetails([parseFloat(deviceTotalCost), parseInt(device_term)], "DeviceCost", "Add");
                }
                var secondarydevice = tsintitialData.OrderHeader.SecondaryDevices;
                var accessory = secondarydevice.filter(function (a) {
                    return a.Name == "Accessory" && a.Category == "Secondary Device";
                });
                var seContract = secondarydevice.filter(function (a) {
                    return a.Category == "Secondary Device" && a.Name == "APP Contract";
                });
                var monthlySecDevicePrepayment = 0.0;
                for (var i = 0; i < accessory.length; i++) {
                    var contract = seContract.filter(function (a) {
                        return a.VHA__SD__Group__Id == accessory[i].VHA__SD__Group__Id;
                    });
                    var productCode = accessory[i].Accessory__Code;
                    var totalSDVal = contract[0].Contract__Amount;
                    var VHA__SD__Group__Id = accessory[i].VHA__SD__Group__Id;
                    var prepaymentSeAmount = typeof accessory[i].Prepayment__Amount == "number" ? accessory[i].Prepayment__Amount : Number(accessory[i].Prepayment__Amount);
                    var seTerm = contract[0].Term;
                    monthlySecDevicePrepayment += parseFloat(prepaymentSeAmount) / Number(seTerm);
                    var finalSecDevicePayment = (parseFloat(accessory[i].Accessory__RRP__Inc__GST) - parseFloat(prepaymentSeAmount)) / seTerm
                    var currSecDevice = $("div.cart-secdevice-info[productcd='" + productCode + "'][vha_sd_grp_id='" + VHA__SD__Group__Id + "']");
                    currSecDevice.children("div").children("div.vha-ts-cartval").html("$ " + mTruncate(finalSecDevicePayment.toString()));
                    currSecDevice.children("div").children("div.h5.vha-ts-sd-payinfo").html("$ " + mTruncate(totalSDVal.toString()) + " over " + seTerm + " months");
                }
                var accessory = tsintitialData.OrderHeader.Accessories;
                var accContract = accessory.filter(function (a) {
                    return a.Name == "APP Contract";
                });
                var monthlyAccPrepaymentAmount = 0.0;
                if (accContract.length > 0) {
                    var aTerm = accContract[0].Term || 1;
                    var accessoryAmount = accContract[0].Contract__Amount;
                    var prepaymentAmount = accContract[0].Prepayment__Amount;
                    monthlyAccPrepaymentAmount = parseFloat(prepaymentAmount) / parseFloat(aTerm);
                    var finalMonthlyAccPayment = (parseFloat(accContract[0].Total__Accessories__RRP__Inc__GST) - parseFloat(prepaymentAmount)) / aTerm;
                    $(".h5.vha-ts-a-payinfo").html("$ " + mTruncate(accessoryAmount.toString()) + " over " + aTerm + " months");
                    $(".cart-accessory-info .price").html(mTruncate(finalMonthlyAccPayment.toString()));
                }
                var totalMonthlyPrepaymentAmount = parseFloat(monthlyAccPrepaymentAmount + monthlySecDevicePrepayment + monthlyDevicePrepayment).toFixed(2);
                sSessionData.PrepaymentAdjustments.Price = totalMonthlyPrepaymentAmount;
            }
            function addDevice(devicedtl, sDvcStockChk) {
                $(".vha-ts-dvcplan").removeClass("VFDisplayNone");
                if (sUserOptn == "Upgrade to New plan") {
                    var sCartDvcPln = '<div class="vha-ts-redtxt h5 col-md-12">Device Plan</div>\t\t\t\t\t\t\t<div class="col-md-12 ml-5 vha-ts-dvcplan-chd">\t\t\t\t\t\t\t\t<div class="row cart-device-info">\t\t\t\t\t\t\t\t\t<div class="vha-ts-cartitemw">' + devicedtl.Source_Product_Name + '</div>\t\t\t\t\t\t\t\t\t<div>\t\t\t\t\t\t\t\t\t\t<div class="h5 vha-ts-cartval">$ ' + mTruncate(parseFloat(devicedtl.RRP_inc_gst / $(".vhats-d-term.applet-button-active").attr("term")).toString()) + '</div>\t\t\t\t\t\t\t\t\t\t<div class="h5 vha-ts-d-payinfo">$ ' +
                        parseFloat(devicedtl.RRP_inc_gst).toFixed(2) + " over " + $(".vhats-d-term.applet-button-active").attr("term") + ' months</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="row cart-plan-info VFDisplayNone">\t\t\t\t\t\t\t\t\t<div class="vha-ts-cartitemw">Plan Name</div>\t\t\t\t\t\t\t\t\t<div class="h5 vha-ts-cartval">$00.00</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t';
                    $(".vha-ts-dvcplan").html(sCartDvcPln);
                    updateSessionDetails([parseFloat(devicedtl.RRP_inc_gst), parseInt($(".vhats-d-term.applet-button-active").attr("term"))], "DeviceCost", "Add");
                    updateSessionDetails(0, "PlanCost", "Add");
                } else {
                    var sCartDvcPln = '<div class="vha-ts-redtxt h5 col-md-12">Device Plan</div>\t\t\t\t\t<div class="col-md-12 ml-5 vha-ts-dvcplan-chd">\t\t\t\t\t\t<div class="row cart-device-info">\t\t\t\t\t\t\t<div class="vha-ts-cartitemw">' + devicedtl.Source_Product_Name + '</div>\t\t\t\t\t\t\t<div>\t\t\t\t\t\t\t\t<div class="h5 vha-ts-cartval">$ ' + mTruncate(parseFloat(sDvcStockChk["Total RCC Inc GST"] / $(".vhats-d-term.applet-button-active").attr("term")).toString()) + '</div>\t\t\t\t\t\t\t\t<div class="h5 vha-ts-d-payinfo">$ ' +
                        parseFloat(sDvcStockChk["Total RCC Inc GST"]).toFixed(2) + " over " + $(".vhats-d-term.applet-button-active").attr("term") + " months</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t";
                    $(".vha-ts-dvcplan").html(sCartDvcPln);
                    updateSessionDetails([parseFloat(sDvcStockChk["Total RCC Inc GST"]), parseInt($(".vhats-d-term.applet-button-active").attr("term"))], "DeviceCost", "Add");
                    updateSessionDetails(0, "PlanCost", "Add");
                }
                clearJSONObj(["Device", "Upgrade", "GppDeviceContract"]);
                tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST = 0;
                tsintitialData.OrderHeader.GppDeviceContract.Contract__Amount = 0;
                tsintitialData.OrderHeader.RedPlusPlan.Name = "";
                tsintitialData.OrderHeader.RedPlusPlan.PlanPrice = 0;
                tsintitialData.OrderHeader.RedPlusPlan.EligibleOrderLineItem = "N";
                var devicedetails = tsintitialData.OrderHeader.Device;
                devicedetails.Device__Code = devicedtl.Product_Code;
                devicedetails.Device__Name = devicedtl.Device_Name;
                devicedetails.Device__Price__Exc__GST = devicedtl.RRP_exc_gst;
                devicedetails.Device__Price__Inc__GST = devicedtl.RRP_inc_gst;
                devicedetails.Device__RCC__Exc__GST = sUserOptn == "Upgrade to New plan" ? devicedtl.RRP_exc_gst : sDvcStockChk["Total RCC Exc GST"];
                devicedetails.Device__RCC__Inc__GST = sUserOptn == "Upgrade to New plan" ? devicedtl.RRP_inc_gst : sDvcStockChk["Total RCC Inc GST"];
                //devicedetails.StockIndicator = $(".vha-ts-imei").val() == "" ? "Out of Stock" : "In Stock";
                devicedetails.StockIndicator = $(".vha-ts-storeres input[type=checkbox]").prop("checked") ? "In Stock" : $(".vha-ts-imei").val() == "" ? "Out of Stock" : "In Stock";
                devicedetails.EligibleOrderLineItem = "Y";
                var upgradedetails = tsintitialData.OrderHeader.Upgrade;
                upgradedetails.Eligibility__Override__Reason = "";
                upgradedetails.Eligibility = "Y";
                upgradedetails.Offer__Type = sOfferTyp;
                upgradedetails.RIV__Exc__GST = sDvcStockChk["RIV Exc GST"];
                upgradedetails.RIV__Inc__GST = sDvcStockChk["RIV Inc GST"];
                upgradedetails.Savings__On__RIV__Exc__GST = sDvcStockChk["Savings On RIV Exc GST"];
                upgradedetails.Savings__On__RIV__Inc__GST = sDvcStockChk["Savings On RIV Inc GST"];
                upgradedetails.Total__RCC__Exc__GST = sUserOptn == "Upgrade to New plan" ? devicedtl.RRP_exc_gst : sDvcStockChk["Total RCC Exc GST"];
                upgradedetails.Total__RCC__Inc__GST = sUserOptn == "Upgrade to New plan" ? devicedtl.RRP_inc_gst : sDvcStockChk["Total RCC Inc GST"];
                upgradedetails.Value__Band = sValueBand;
                upgradedetails.EligibleOrderLineItem = "Y";
                var gppdvcecontract = tsintitialData.OrderHeader.GppDeviceContract;
                gppdvcecontract.Contract__Amount = sUserOptn == "Upgrade to New plan" ? devicedtl.RRP_inc_gst : sDvcStockChk["Total RCC Inc GST"];
                gppdvcecontract.Category = "Device";
                gppdvcecontract.Additional__Info = "";
                gppdvcecontract.IMEI___Serial__Number = $(".vha-ts-imei").val();
                gppdvcecontract.Item__Code = devicedtl.Product_Code;
                gppdvcecontract.Item__Name = devicedtl.Device_Name;
                gppdvcecontract.Term = $(".vhats-d-term.applet-button-active").attr("term");
                gppdvcecontract.Monthly__Repayment = mTruncate(parseFloat(gppdvcecontract.Contract__Amount / gppdvcecontract.Term).toString());
                gppdvcecontract.Original__Order__Number = orderNum;
                gppdvcecontract.Original__Purchase__Date = "";
                gppdvcecontract.EligibleOrderLineItem = "Y";
                getPlanDetails("Y");
                if (sRCCEligible == "Y" && $(".vha-ts-imei").val() != "" && sEditRCCResp == "Y") {
                    $(".vha-ts-rcc").attr("disabled", false);
                    $(".vha-ts-rcc").val("");
                    tsintitialData.OrderHeader.RCCEditable = "Y";
                } else {
                    $(".vha-ts-rcc").attr("disabled", true);
                    $(".vha-ts-rcc").val("");
                    tsintitialData.OrderHeader.RCCEditable = "N";
                }
                $(".vha-ts-device-select #vha-ts-d-stockerrmsg").text("");
                var sEqpValue = equipmentLimitValidation();
                if (sEqpValue > sSessionData.EquipmentLimit) {
                    var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                    $(".vha-ts-device-select #vha-ts-d-equiplmtmsg").text(sErrDtl);
                }
                priPlanDtl = "";
            }
            function addDiscounts(sDvcIMEIChk) {
                $(".vha-ts-discount").addClass("VFDisplayNone");
                $(".vha-ts-offers").addClass("VFDisplayNone");
                $(".cart-offers-data").addClass("VFDisplayNone");
                $(".cart-offers-intmins").addClass("VFDisplayNone");
                $(".vha-ts-discount, .cart-discount-loyalty").addClass("VFDisplayNone");
                $(".vha-ts-discount, .cart-discount-credit").addClass("VFDisplayNone");
                $(".vha-ts-discount, .cart-discount-bundle").addClass("VFDisplayNone");
                $(".cart-offers-amazon").empty();
                var sDiscounts = 0;
                var sDvcDisc = tsintitialData.OrderHeader.DeviceDiscounts;
                sDvcDisc.DiscountCredit = 0;
                sDvcDisc.DiscountLoyalty = 0;
                sDvcDisc.BundleandSave = 0;
                if (sDvcIMEIChk["Discount Loyalty"] != "" && parseFloat(parseFloat(sDvcIMEIChk["Discount Loyalty"]).toFixed(2)) > 0) {
                    $(".vha-ts-discount, .cart-discount-loyalty").removeClass("VFDisplayNone");
                    $(".cart-discount-loyalty .vha-ts-cartval span").text(sDvcIMEIChk["Discount Loyalty"]);
                    sDiscounts += parseFloat(parseFloat(sDvcIMEIChk["Discount Loyalty"]).toFixed(2));
                    sDvcDisc.DiscountLoyalty = parseFloat(parseFloat(sDvcIMEIChk["Discount Loyalty"]).toFixed(2));
                }
              /*  if (sDvcIMEIChk["Discount Credit"] != "" && parseFloat(parseFloat(sDvcIMEIChk["Discount Credit"]).toFixed(2)) > 0) {
                    $(".vha-ts-discount, .cart-discount-credit").removeClass("VFDisplayNone");
                    $(".cart-discount-credit .vha-ts-cartval span").text(sDvcIMEIChk["Discount Credit"]);
                    sDiscounts += parseFloat(parseFloat(sDvcIMEIChk["Discount Credit"]).toFixed(2));
                    sDvcDisc.DiscountCredit = parseFloat(parseFloat(sDvcIMEIChk["Discount Credit"]).toFixed(2));
                } */
				var dis_samidd = pegaoffDataGlob.dis_SamproductId;
				if(dis_samidd !== undefined && dis_samidd !== null && dis_samidd.trim() !== "")
					dis_samid_flag = "Y";
				else
					dis_samid_flag = "N";
				
				if(pegaoffDataGlob != "" && pegaflag ==="Y" && dis_samid_flag === "Y"){
					
					 var disCredit = parseFloat(pegaoffDataGlob.RewardValue);
					 if (disCredit != "" && parseFloat(parseFloat(disCredit.toFixed(2))) > 0) {
                    $(".vha-ts-discount, .cart-discount-credit").removeClass("VFDisplayNone");
                    $(".cart-discount-credit .vha-ts-cartval span").text(disCredit);
                    sDiscounts += parseFloat(parseFloat(disCredit).toFixed(2));
                    sDvcDisc.DiscountCredit = parseFloat(parseFloat(disCredit).toFixed(2));
					}
				}
				else{
					 if (sDvcIMEIChk["Discount Credit"] != "" && parseFloat(parseFloat(sDvcIMEIChk["Discount Credit"]).toFixed(2)) > 0) {
                    $(".vha-ts-discount, .cart-discount-credit").removeClass("VFDisplayNone");
                    $(".cart-discount-credit .vha-ts-cartval span").text(sDvcIMEIChk["Discount Credit"]);
                    sDiscounts += parseFloat(parseFloat(sDvcIMEIChk["Discount Credit"]).toFixed(2));
                    sDvcDisc.DiscountCredit = parseFloat(parseFloat(sDvcIMEIChk["Discount Credit"]).toFixed(2));
					}
				}
                if (sDvcIMEIChk["BundleSave"] != "" && parseFloat(parseFloat(sDvcIMEIChk["BundleSave"]).toFixed(2)) > 0) {
                    $(".vha-ts-discount, .cart-discount-bundle").removeClass("VFDisplayNone");
                    $(".cart-discount-bundle .vha-ts-cartval span").text(sDvcIMEIChk.BundleSave);
                    sDiscounts += parseFloat(parseFloat(sDvcIMEIChk["BundleSave"]).toFixed(2));
                    sDvcDisc.BundleandSave = parseFloat(parseFloat(sDvcIMEIChk["BundleSave"]).toFixed(2));
                }
                if (sDvcIMEIChk["TotalData"] != "") {
                    $(".vha-ts-offers").removeClass("VFDisplayNone");
                    $(".cart-offers-data").removeClass("VFDisplayNone");
                    $(".cart-offers-data .vha-ts-cartval").text(sDvcIMEIChk.TotalData);
                }
                if (sDvcIMEIChk["IDDZone1"] != "") {
                    $(".vha-ts-offers").removeClass("VFDisplayNone");
                    $(".cart-offers-intmins").removeClass("VFDisplayNone");
                    $(".cart-offers-intmins .vha-ts-cartval.vhaz1").text(sDvcIMEIChk.IDDZone1);
                }
                if (sDvcIMEIChk["IDDZone2"] != "") {
                    $(".vha-ts-offers").removeClass("VFDisplayNone");
                    $(".cart-offers-intmins").removeClass("VFDisplayNone");
                    $(".cart-offers-intmins .vha-ts-cartval.vhaz2").text(sDvcIMEIChk.IDDZone2);
                }
                var sAmazonOffer = sDvcIMEIChk["Others"];
                if (sAmazonOffer != "" && typeof sAmazonOffer != "undefined") {
                    var sAmzOffItems = sAmazonOffer.split("|");
                    sAmzOffItems.forEach(function populateOffer(item) {
                        $(".vha-ts-offers").removeClass("VFDisplayNone");
                        $(".cart-offers-amazon").removeClass("VFDisplayNone");
                        item = item.split(";");
                        var sAmzOffItm = '<div class="row">\t\t\t\t\t\t\t\t\t\t\t<div class="vha-ts-cartitemw">' + item[0] + '</div>\t\t\t\t\t\t\t\t\t\t\t<div class="h5 vha-ts-cartval">' + item[1] + "</div>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t";
                        $(".cart-offers-amazon").append(sAmzOffItm);
                    });
                }
                updateSessionDetails(sDiscounts, "AddDiscounts", "Add");
                totalIndicativeCostCalc();
            }
            function resumeOrder(dJSON) {
                var showVal = JSON.parse(dJSON)["ResumeOrder"]["ShowValue"];
                var addclass = JSON.parse(dJSON)["ResumeOrder"]["AddClass"];
                var checkedChkBox = JSON.parse(dJSON)["ResumeOrder"]["CheckedCheckBox"];
                var dropDownVal = JSON.parse(dJSON)["ResumeOrder"]["dropDown"];
                for (var i = 0; i < showVal.length; i++) {
                    $(showVal[i].selector).text(showVal[i].value);
                    $(showVal[i].selector).val(showVal[i].value);
                }
                for (var i = 0; i < checkedChkBox.length; i++) {
                    $(checkedChkBox[0].selector).prop("checked", true);
                }
                for (var i = 0; i < dropDownVal.length; i++) {
                    $(dropDownVal[0].selector + "option[value='" + dropDownVal[i].value + "']").attr("selected", "selected");
                }
            }
            function createResumeJSON() {
                return JSON.stringify(tsintitialData);
            }
            function secondaryDvcAdd(productcd, sSDStockChk, pausedInsDtls) {
                for (i = 0; i < secondaryresponse.length; i++) {
                    if (secondaryresponse[i]._source.Product_Code == productcd) {
                        $("#vha-ts-access").find("#vhasecondaryadd").attr("Productcd", "");
                        var SDInsval = pausedInsDtls.split("|")[0] != "" && pausedInsDtls.split("|")[0] != undefined ? pausedInsDtls.split("|")[0] : $("#ts-pick-sg").val();
                        var SDassInsval = pausedInsDtls.split("|")[1] != "" && pausedInsDtls.split("|")[1] != undefined ? pausedInsDtls.split("|")[1] : $("#ts-pick-sg").attr("asscInsProduct") == undefined ? "" : $("#ts-pick-sg").attr("asscInsProduct");
                        var SDassProdType = pausedInsDtls.split("|")[2] != "" && pausedInsDtls.split("|")[2] != undefined ? pausedInsDtls.split("|")[2] : $("#ts-pick-sg").attr("asscInsProdType") == undefined ? "" : $("#ts-pick-sg").attr("asscInsProdType");
                        var sdStockIndicator = $("#secondaryimei").val() == "" ? "Out of Stock" : "In Stock";
                        $("#secondaryslected").append('<div class="flex_row_container NCIdrecLines" productcd="' + productcd + '" vha_sd_grp_id="' + sSecDvcId + '"><div name="Accessory Name" class="vhaidattflds" id="' + productcd + '" style="width: 20%;padding-right: 1.5px;">' + secondaryresponse[i]._source.Name + '</div><div name="IMEI Number" class="vhaidattflds" id="imeinumber" style="width: 18%;">' + $("#secondaryimei").val() + '</div><div name="Stock Indicator" class="vhaidattflds" id="stockindicator" style="width: 14%;">' +
                            sdStockIndicator + '</div><div name="Stock Band" class="vhaidattflds" id="stockband" style="width: 12%;">' +
                            sSDStockChk.StockBand + '</div><div name="Estimated Ship Date" class="vhaidattflds" id="estdshpdt" style="width: 18%;">' +
                            sSDStockChk.EstShipmentDt + '</div><div name="Payment Term" class="vhaidattflds" id="vha-ts-sd-paytrm" style="width: 10%;">' + $(".vha-ts-sd-term.applet-button-active").text() + '</div><div name="Device Care" class="vhaidattflds" id="sdswapgo" style="width: 15%;">' + SDInsval + '</div><div style="width: 8%;"><a id="secremove" href="#">Remove</a></div></div>');
                        $(".vha-ts-secdvc").removeClass("VFDisplayNone");
                        var sSecDvc = '<div class="row cart-secdevice-info" productcd="' + productcd + '" vha_sd_grp_id="' + sSecDvcId + '">\t\t\t\t\t\t\t<div class="vha-ts-cartitemw">' + secondaryresponse[i]._source.Name + '</div>\t\t\t\t\t\t\t<div>\t\t\t\t\t\t\t\t<div class="h5 vha-ts-cartval">$ ' + mTruncate(parseFloat(secondaryresponse[i]._source.RRP_Inc_GST / $(".vha-ts-sd-term.applet-button-active").attr("term")).toString()) + '</div>\t\t\t\t\t\t\t\t<div class="h5 vha-ts-sd-payinfo">$ ' + parseFloat(secondaryresponse[i]._source.RRP_Inc_GST).toFixed(2) + " over " + $(".vha-ts-sd-term.applet-button-active").attr("term") + " months</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t";
                        $(".vha-ts-secdvc-chd").append(sSecDvc);
                        var enddt = new Date;
                        var sTermEndDate = new Date(enddt.setMonth(enddt.getMonth() + parseInt($(".vha-ts-sd-term.applet-button-active").attr("term"))));
                        sTermEndDate = sTermEndDate.getDate() + "/" + (sTermEndDate.getMonth() + 1) + "/" + sTermEndDate.getFullYear();
                        var sSecDvc = {
                            Action: "Add",
                            Name: "Accessory",
                            Prod__Integration__Id: "",
                            StockIndicator: $("#secondaryimei").val() == "" ? "Out of Stock" : "In Stock",
                            Accessory__Code: secondaryresponse[i]._source.Product_Code,
                            Accessory__Name: secondaryresponse[i]._source.Name,
                            Accessory__RRP__Exc__GST: parseFloat(secondaryresponse[i]._source.RRP_Exc_GST),
                            Accessory__RRP__Inc__GST: parseFloat(secondaryresponse[i]._source.RRP_Inc_GST),
                            Category: "Secondary Device",
                            Prepayment__Amount: "",
                            VHA__SD__Group__Id: sSecDvcId,
                            EligibleOrderLineItem: "Y"
                        };
                        var sSecDvcContract = {
                            Action: "Add",
                            Name: "APP Contract",
                            Prod__Integration__Id: "",
                            Additional__Info: "",
                            Category: "Secondary Device",
                            Contract__Amount: parseFloat(secondaryresponse[i]._source.RRP_Inc_GST),
                            Contract__Amount__Override: "",
                            Contract__End__Date: sTermEndDate,
                            Contract__Start__Date: sCurrDate,
                            IMEI: $("#secondaryimei").val(),
                            Monthly__Repayment: mTruncate(parseFloat(secondaryresponse[i]._source.RRP_Inc_GST / $(".vha-ts-sd-term.applet-button-active").attr("term")).toString()),
                            Number__of__Accessories: "1",
                            Prepayment__Amount: 0,
                            Term: $(".vha-ts-sd-term.applet-button-active").attr("term"),
                            Term__Override: "_",
                            Total__Accessories__RRP__Inc__GST: parseFloat(secondaryresponse[i]._source.RRP_Inc_GST),
                            VHA__SD__Group__Id: sSecDvcId,
                            EligibleOrderLineItem: "Y"
                        };
                        var sSecDvcSpid = {
                            Action: "Add",
                            Name: "Multi Device Subscription SPID",
                            Prod__Integration__Id: "",
                            EID: "",
                            IMEI: $("#secondaryimei").val(),
                            SKU: secondaryresponse[i]._source.Product_Code,
                            SPID: sSpid,
                            VHA__SD__Group__Id: sSecDvcId,
                            EligibleOrderLineItem: "Y"
                        };
                        var sdAsscInsProd = {};
                        var sdInsProd = {};
                        if (SDInsval != "") {
                            sdInsProd = {
                                Action: "Add",
                                Name: SDInsval,
                                Prod__Integration__Id: "",
                                IMEI: $("#secondaryimei").val(),
                                Device__Name: secondaryresponse[i]._source.Name,
                                VHA__SD__Group__Id: sSecDvcId,
                                EligibleOrderLineItem: "Y"
                            };
                            if (SDassInsval != "" && SDassInsval != undefined) {
                                sdAsscInsProd = Object.assign({}, sdInsProd);
                                sdAsscInsProd.Name = SDassInsval;
								if(SDInsval == "Vodafone Device Care Wearables")  //Ravindra: Added for PKE000000112162								
                                {
                                     //sdInsProd.Period = "1";          
                                }
                                else
                                {
                                   sdInsProd.Period = "1"; // inactivated for 50%swapgo 14/06/2022
                                }
                            }
                        }
                        var SDInsJSON = {
                            VHA__SD__Group__Id: sSecDvcId,
                            SD__Insurance: SDInsval + "|" + SDassInsval + "|" + SDassProdType
                        };
                        tsintitialData.OrderHeader.SDInsurance.push(SDInsJSON);
                        updateSessionDetails(parseFloat(parseFloat(secondaryresponse[i]._source.RRP_Inc_GST).toFixed(2)), "SecondaryDeviceCost", "Add");
                        var sEqpValue = equipmentLimitValidation();
                        if (sEqpValue > sSessionData.EquipmentLimit) {
                            var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                            $("#vha-ts-sd-equiplmtmsg").text(sErrDtl);
                        }
                        tsintitialData.OrderHeader.SecondaryDevices.push(sSecDvc);
                        tsintitialData.OrderHeader.SecondaryDevices.push(sSecDvcContract);
                        tsintitialData.OrderHeader.SecondaryDevices.push(sSecDvcSpid);
                        if (Object.keys(sdInsProd).length > 0) {
                            tsintitialData.OrderHeader.SecondaryDevices.push(sdInsProd);
                            if (Object.keys(sdAsscInsProd).length > 0) {
                                tsintitialData.OrderHeader.SecondaryDevices.push(sdAsscInsProd);
                            }
                        }
                        sSecDvcId += 1;
                        SDRegroup();
                        var sSecDvcCnt = 1;
                        $("#secondaryslected .NCIdrecLines").each(function updateSDId() {
                            $(this).attr("vha_sd_grp_id", sSecDvcCnt);
                            sSecDvcCnt++;
                        });
                        var sSecDvcCnt = 1;
                        $(".cart-secdevice-info").each(function updateSDId() {
                            $(this).attr("vha_sd_grp_id", sSecDvcCnt);
                            sSecDvcCnt++;
                        });
                        $("#vha-ts-sd-stockerrmsg").text("");
                        $("#ts-secondary-model").val("");
                        $("#ts-search-ean").val("");
                        $("#secondaryimei").val("");
                        SDInsuranceCartUpt();
                        $(".NCIdrecLines #secremove").off("click").on("click", function () {
                            var sSDGrpId = $(this).parent().parent().attr("vha_sd_grp_id");
                            $("#vha-ts-sd-stockerrmsg").text("");
                            $("#vha-ts-sd-equiplmtmsg").text("");
                            $(".cart-secdevice-info[vha_sd_grp_id='" + sSDGrpId + "']").remove();
                            $(this).parent().parent().remove();
                            var sRemoveCost = "Y";
                            for (i = tsintitialData.OrderHeader.SecondaryDevices.length - 1; i >= 0; i--) {
                                if (tsintitialData.OrderHeader.SecondaryDevices[i].VHA__SD__Group__Id == sSDGrpId) {
                                    if (sRemoveCost == "Y" && tsintitialData.OrderHeader.SecondaryDevices[i].Name == "APP Contract") {
                                        sRemoveCost = "N";
                                        updateSessionDetails([parseFloat(parseFloat(tsintitialData.OrderHeader.SecondaryDevices[i].Contract__Amount).toFixed(2)), parseFloat(tsintitialData.OrderHeader.SecondaryDevices[i].Term)], "SecondaryDeviceCost", "Remove");
                                        secdevice = sSessionData.SecondaryDevice.Count;
                                        Totalcountvalue(devicecount, plancount, secdevice, accssorycount);
                                    }
                                    tsintitialData.OrderHeader.SecondaryDevices.splice(i, 1);
                                    tsintitialData.OrderHeader.SDInsurance.splice(i, 1);
                                }
                            }
                            tsintitialData.OrderHeader.SDInsurance.forEach(function (item, index) {
                                if (sSDGrpId == item.VHA__SD__Group__Id)
                                    tsintitialData.OrderHeader.SDInsurance.splice(index, 1);
                            });
                            SDRegroup();
                            var sSecDvcCnt = 1;
                            $("#secondaryslected .NCIdrecLines").each(function updateSDId() {
                                $(this).attr("vha_sd_grp_id", sSecDvcCnt);
                                sSecDvcCnt++;
                            });
                            var sSecDvcCnt = 1;
                            $(".cart-secdevice-info").each(function updateSDId() {
                                $(this).attr("vha_sd_grp_id", sSecDvcCnt);
                                sSecDvcCnt++;
                            });
                            SDInsuranceCartUpt();
                            var sEqpValue = equipmentLimitValidation();
                            if (sEqpValue > sSessionData.EquipmentLimit) {
                                var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                                $("#vha-ts-sd-equiplmtmsg").text(sErrDtl);
                            }
                            if (sSessionData.SecondaryDevice.Count == 0) {
                                $(".vha-ts-secdvc").addClass("VFDisplayNone");
                                $("#vha-ts-sd-equiplmtmsg").text("");
                            }
                            mSetPrepaymentaccordion();
                        });
                    }
                }
            }
            function SDRegroup() {
                var sdobj = tsintitialData.OrderHeader.SecondaryDevices;
                var extGrpid = [];
                sdobj.forEach(function (item, index) {
                    extGrpid.push(item.VHA__SD__Group__Id);
                });
                var DistintextGrpid = [...new Set(extGrpid)].sort();
                if (DistintextGrpid.length != DistintextGrpid[DistintextGrpid.length - 1]) {
                    DistintextGrpid.forEach(function (extitem, extindex) {
                        if (extitem != (extindex + 1)) {
                            sdobj.forEach(function (item, index) {
                                if (extitem == item.VHA__SD__Group__Id)
                                    item.VHA__SD__Group__Id = extindex + 1;
                            });
                        }
                    });
                }
                SDInsRegroup();
            }
            function SDInsRegroup() {
                var sdinsobj = tsintitialData.OrderHeader.SDInsurance;
                var extGrpid = [];
                sdinsobj.forEach(function (item, index) {
                    extGrpid.push(item.VHA__SD__Group__Id);
                });
                var DistintextGrpid = [...new Set(extGrpid)].sort();
                if (DistintextGrpid.length != DistintextGrpid[DistintextGrpid.length - 1]) {
                    DistintextGrpid.forEach(function (extitem, extindex) {
                        if (extitem != (extindex + 1)) {
                            sdinsobj.forEach(function (item, index) {
                                if (extitem == item.VHA__SD__Group__Id)
                                    item.VHA__SD__Group__Id = extindex + 1;
                            });
                        }
                    });
                }
            }
            function triggerAccessRemove() {
                $("#accessoryselected #accessremove").off("click").on("click", function () {
                    $("#vha-ts-accsry-equiplmtmsg").text("");
                    $("#vha-ts-accsry-stockerrmsg").text("");
                    $("#Addlimitcount").text("");
                    var sProdCd = $(this).parent().parent().find("div[prodcd]").attr("prodcd");
                    var sPrice = parseFloat(parseFloat($("#quantity[prodcd='" + sProdCd + "']").attr("price")) * parseInt($("#quantity[prodcd='" + sProdCd + "']").text()));
                    updateSessionDetails([sPrice, parseInt($("#quantity[prodcd='" + sProdCd + "']").text())], "AccessoryCost", "Remove");
                    $(".vha-ts-accessory .count").text(sSessionData.Accessories.Count);
                    $(".vha-ts-indcost .vha-ts-cartval").text(parseFloat(mTruncate(sSessionData.TotalIndicativeCost.toString())).toFixed(2));
                    accssorycount = sSessionData.Accessories.Count;
                    Totalcountvalue(devicecount, plancount, secdevice, accssorycount);
                    $(".vha-ts-accessory .vha-ts-cartval .price").text(parseFloat(sSessionData.Accessories.AccessoryMonthlyPrice).toFixed(2));
                    $(".vha-ts-accessory .vha-ts-a-payinfo .totalprice").text(parseFloat(sSessionData.Accessories.AccessoryPrice).toFixed(2));
                    $(".vha-ts-accessory .vha-ts-a-payinfo .monthdtl").text(" over " + parseInt($(".vha-ts-a-term.applet-button-active").attr("term")) + " months");
                    $(this).parent().parent().remove();
                    for (var k = tsintitialData.OrderHeader.Accessories.length - 1; k >= 0; k--) {
                        if (tsintitialData.OrderHeader.Accessories[k].Accessory__Code == sProdCd) {
                            var sAccCost = parseFloat(tsintitialData.OrderHeader.Accessories[k].Accessory__RRP__Inc__GST);
                            tsintitialData.OrderHeader.Accessories.splice(k, 1);
                            for (var j = 0; j < tsintitialData.OrderHeader.Accessories.length; j++) {
                                if (tsintitialData.OrderHeader.Accessories[j].Name == "APP Contract") {
                                    tsintitialData.OrderHeader.Accessories[j].Number__of__Accessories -= 1;
                                    tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST = parseFloat(parseFloat(tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST) - sAccCost).toFixed(2);
                                    tsintitialData.OrderHeader.Accessories[j].Contract__Amount = tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST;
                                    tsintitialData.OrderHeader.Accessories[j].Monthly__Repayment = mTruncate(parseFloat(tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST / $(".vha-ts-a-term.applet-button-active").attr("term")).toString());
                                    if (tsintitialData.OrderHeader.Accessories[j].Number__of__Accessories == 0) {
                                        tsintitialData.OrderHeader.Accessories[j].EligibleOrderLineItem = "N";
                                    }
                                }
                            }
                        }
                    }
                    var sEqpValue = equipmentLimitValidation();
                    if (sEqpValue > sSessionData.EquipmentLimit) {
                        var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                        $("#vha-ts-accsry-equiplmtmsg").text(sErrDtl);
                    }
                    mSetPrepaymentaccordion();
                    if (sSessionData.Accessories.Count == 0) {
                        $(".vha-ts-accessory").addClass("VFDisplayNone");
                        $("#vha-ts-accsry-equiplmtmsg").text("");
                    }
                    $(".tssearchplan").val("");
                    $("#vha-ts-accsry-stockerrmsg").text();
                });
            }
            function filterDevices() {
                filtereddevicesresponse = [];
                if (filterBrand != "Others") {
                    for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                        if (Object.values(devicesresponse.hits.hits)[i]._source.Make.toLowerCase().indexOf(filterBrand.toLowerCase()) > -1) {
                            filtereddevicesresponse.push(Object.values(devicesresponse.hits.hits)[i]);
							 SiebelApp.S_App.SetProfileAttr("s_Brand",filterBrand); //Ravindra: Dec-2023 Added for 3Step Activity
                        }
                    }
                } else {
                    for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                        if (!["apple", "samsung", "nokia", "huawei"].includes(Object.values(devicesresponse.hits.hits)[i]._source.Make.toLowerCase())) {
                            filtereddevicesresponse.push(Object.values(devicesresponse.hits.hits)[i]);
							 SiebelApp.S_App.SetProfileAttr("s_Brand",filterBrand); //Ravindra: Dec-2023 Added for 3Step Activity
                        }
                    }
                }
                createDeviceTiles();
            }
            function tssleep(ms) {
                return new Promise(function (resolve) {
                    return setTimeout(resolve, ms);
                });
            }
            function ProcessCheckStock(sItem, sItemVal) {
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VHA 3 Step Upgrade Show Now Wrapper Workflow");
                Inputs.SetProperty(sItem, sItemVal);
                Inputs.SetProperty("OutofStock", "Y");
                Inputs.SetProperty("Object Id", sSessionId);
                var Output = ser.InvokeMethod("RunProcess", Inputs);
                SiebelApp.S_App.GetActiveView().GetApplet("VHA Shipping Address Details Applet - 3 Step Upgrade").InvokeMethod("NewQuery");
                SiebelApp.S_App.GetActiveView().GetApplet("VHA Shipping Address Details Applet - 3 Step Upgrade").InvokeMethod("ExecuteQuery");
                return Output.GetChildByType("ResultSet").propArray;
            }
            function ProcessDeviceCheck(sItem, sItemVal, priDeviceDtl, StockorIMEI) {
                $(".cart-offers-data .vha-ts-cartval").text("0 GB");
                $(".cart-offers-intmins .vha-ts-cartval.vhaz1").text("0 Mins");
                $(".cart-offers-intmins .vha-ts-cartval.vhaz2").text("0 Mins");
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VHA 3 Step Upgrade Show Now Wrapper Workflow");
                Inputs.SetProperty("CartRefresh", "");
                if (StockorIMEI == "StockCheckCall") {
                    Inputs.SetProperty(sItem, sItemVal);
                    if ($(".vha-ts-imei").val() != "" || $(".vha-ts-storeres input[type=checkbox]").prop("checked")) {
                        Inputs.SetProperty("CartRefresh", "Y");
                    } else {
                        Inputs.SetProperty("OutofStock", "Y");
                    }
                    Inputs.SetProperty("InvestmentProportion", priDeviceDtl.Investment_Proportion);
                    Inputs.SetProperty("DeviceRRP", priDeviceDtl.RRP_inc_gst);
                    Inputs.SetProperty("DeviceMatrixContract", priDeviceDtl.Contract);
                } else {
                    if (StockorIMEI == "IMEICheckCall") {
                        Inputs.SetProperty(sItem, sItemVal);
                        Inputs.SetProperty("Type", "");
                    }
                }
                Inputs.SetProperty("UpgradeOfferType", sUserOptn);
                Inputs.SetProperty("RatePlanSAMId", "");
                Inputs.SetProperty("PropSAMId", "");
                Inputs.SetProperty("Object Id", sSessionId);
                Inputs.SetProperty("DealerRowId", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Dealer Row Id"));
                Inputs.SetProperty("DeviceCode", priDeviceDtl.Product_Code);
                Inputs.SetProperty("DeviceContract", $(".vhats-d-term.applet-button-active").attr("term"));
                var Output = ser.InvokeMethod("RunProcess", Inputs);
                SiebelApp.S_App.GetActiveView().GetApplet("VHA Shipping Address Details Applet - 3 Step Upgrade").InvokeMethod("NewQuery");
                SiebelApp.S_App.GetActiveView().GetApplet("VHA Shipping Address Details Applet - 3 Step Upgrade").InvokeMethod("ExecuteQuery");
                return Output.GetChildByType("ResultSet").propArray;
            }
            function refreshCart(priPlanDtl) {
                $(".cart-offers-data .vha-ts-cartval").text("0 GB");
                $(".cart-offers-intmins .vha-ts-cartval.vhaz1").text("0 Mins");
                $(".cart-offers-intmins .vha-ts-cartval.vhaz2").text("0 Mins");
                var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("ProcessName", "VHA 3 Step Upgrade Show Now Wrapper Workflow");
                Inputs.SetProperty("UpgradeOfferType", sUserOptn);
                Inputs.SetProperty("CartRefresh", "Y");
                Inputs.SetProperty("RatePlanSAMId", priPlanCd);
                Inputs.SetProperty("PropSAMId", sPropSamId);
                Inputs.SetProperty("PromoCode", $(".vha-ts-promoCode").val());
                Inputs.SetProperty("Object Id", sSessionId);
                Inputs.SetProperty("DealerRowId", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Dealer Row Id"));
                Inputs.SetProperty("DeviceCode", priDeviceProdCd);
                Inputs.SetProperty("DeviceContract", tsintitialData.OrderHeader.GppDeviceContract.Term);
                if (priPlanDtl !== null) {
                    Inputs.SetProperty("InvestmentProportion", priPlanDtl.Investment_Proportion);
                    Inputs.SetProperty("DeviceRRP", priPlanDtl.RRP_inc_gst);
                    Inputs.SetProperty("DeviceMatrixContract", priPlanDtl.Contract);
                }
                var Output = ser.InvokeMethod("RunProcess", Inputs);
                if (Output.GetChildByType("ResultSet")) {
                    addOnLoaded = false;
                    var sPropArray = Output.GetChildByType("ResultSet").propArray;
                    if (sPropArray.TotalData != "") {
                        $(".cart-offers-data .vha-ts-cartval").text(sPropArray.TotalData);
                    }
                    if (sPropArray.IDDZone1 != "") {
                        $(".cart-offers-intmins .vha-ts-cartval.vhaz1").text(sPropArray.IDDZone1);
                    }
                    if (sPropArray.IDDZone2 != "") {
                        $(".cart-offers-intmins .vha-ts-cartval.vhaz2").text(sPropArray.IDDZone2);
                    }
                    if (priPlanDtl !== "") {
                        mSharingDetails();
                        shareType = tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingCompatability;
                        sharingindicator = tsintitialData.OrderHeader.Sharing.NewStatus.SharingCompatability;
                        $(".vha-ts-shrngcmp").remove();
                        if (GroupId != "" && shareType != sharingindicator) {
                            $(".vha-ts-plan-select").after('<div class="p-3 input-margin-left criticalinfo vha-ts-shrngcmp"><img id="vha-ts-infoimg" align="top" src="images/custom/info-circle-mid.png"/> Plan is not compatible with current sharing group .</div>');
                        }
                    }
                    return Output.GetChildByType("ResultSet").propArray;
                } else {
                    if (Output.GetChildByType("Errors")) {
                        return false;
                    }
                }
                return Output.GetChildByType("ResultSet").propArray;
            }
            function refreshPromocode() {
                if ($(".vha-ts-offerapply span:not(.VFDisplayNone)").text() == "Apply") {
                    $(".vha-ts-promoCode").prop("disabled", false);
                    $(".vha-ts-promoCode").val("");
                    $(".vha_promo_errmsg").html("");
                } else if ($(".vha-ts-offerapply span:not(.VFDisplayNone)").text() == "Revert") {
                    $(".vha-ts-promoCode").prop("disabled", false);
                    $(".vha-ts-promoCode").val("");
                    $(".vha-ts-offerapply span").text("Apply");
                }
            }
               var selectAutoCompleteVal = function (e, u) {
				//Ravindra: 14/02/2024: Added the below code for FEB PKE
               if(u.item.type=== "GlobalDeviceSearch"){
				var allprod=devicesresponse.hits.hits;
				var filteredProduct = allprod.filter(product => product._source.Source_Product_Name === u.item.value).map(product => product._source.Make);
				selBrand = filteredProduct[0];
				if (!["APPLE", "SAMSUNG", "MOTOROLA","HUAWEI","NOKIA"].includes(selBrand)) {
					selBrand = "others";
					} 
				SiebelApp.S_App.SetProfileAttr("s_Brand",""); 
				SiebelApp.S_App.SetProfileAttr("s_Brand",selBrand);  //Ravindra: 14/02/2024: Added the code till here for FEB PKE
               }
				
                e.preventDefault();
                $(this).val(u.item.value);
                switch (u.item.type) {
                case "data":
                    var sDataAddOnObj = tsintitialData.OrderHeader.DataAddOns;
                    if (u.item.dollar == undefined) {
                        u.item.dollar = 0;
                    }
                    sDataAddOnObj.Action = "Add";
                    sDataAddOnObj.Type = "Addon";
                    sDataAddOnObj.Prod__Integration__Id = "";
                    sDataAddOnObj.Name = u.item.value;
                    sDataAddOnObj.GPI = u.item.GbProdId;
                    sDataAddOnObj.ProductId = u.item.ProdId;
                    sDataAddOnObj.MaxPrice = u.item.dollar;
                    sDataAddOnObj.SAMId = u.item.SamId;
                    sDataAddOnObj.EligibleOrderLineItem = "Y";
                    $(".vha-ts-addons").removeClass("VFDisplayNone");
                    $(".cart-data-addons").removeClass("VFDisplayNone");
                    var DataPrice = sDataAddOnObj.MaxPrice;
                    if (DataPrice == "") {
                        DataPrice = "0.00";
                    }
                    $(".cart-data-addons .vha-ts-cartval").text("$ " + DataPrice);
                    updateSessionDetails(DataPrice, "DataAddOns", "Add");
                    totalIndicativeCostCalc();
                    break;
		//vasavi added for PKE
                case "iddTerm":
                        var sIddAddOnObj = tsintitialData.OrderHeader.IddAddOns;
                        if(sIddAddOnObj.Name== "$10 International Value Pack"){//Sharan added if-else for PKE000000110563
                            sIddAddOnObj.Period = ""; 
							delete sIddAddOnObj.Period;       //Ganesh- To deleting period for product $10 International Value Pack-PKE000000110563
                        }else{
                        sIddAddOnObj.Period = u.item.value; 
                        }//Sharan added if-else for PKE000000110563-end
                    break;
                case "idd":
                    if (u.item.dollar == undefined) {
                        u.item.dollar = 0;
                    }
                    var sIddAddOnObj = tsintitialData.OrderHeader.IddAddOns;
                    if (u.item.dollar == undefined) {
                        u.item.dollar = 0;
                    }
                    sIddAddOnObj.Action = "Add";
                    sIddAddOnObj.Type = "Addon";
                    sIddAddOnObj.Prod__Integration__Id = "";
                    sIddAddOnObj.Name = u.item.value;
                    sIddAddOnObj.GPI = u.item.GbProdId;
                    sIddAddOnObj.ProductId = u.item.ProdId;
                    sIddAddOnObj.MaxPrice = u.item.dollar;
                    sIddAddOnObj.SAMId = u.item.SamId;
                    sIddAddOnObj.EligibleOrderLineItem = "Y";
                    if(sIddAddOnObj.Name== "$10 International Value Pack"){//Sharan added if-else for PKE000000110563
                        $(".ts-data-addonterm-container").addClass("VFDisplayNone");  
                        sIddAddOnObj.Period = "";
						delete sIddAddOnObj.Period;       //Ganesh- To deleting period for product $10 International Value Pack-PKE000000110563
                     }else{
                          $(".ts-data-addonterm-container").removeClass("VFDisplayNone");
                    }//Sharan added if-else for PKE000000110563-end
                    $(".vha-ts-addons").removeClass("VFDisplayNone");
                    $(".cart-idd-addons").removeClass("VFDisplayNone");
                    var IddPrice = sIddAddOnObj.MaxPrice;
                    if (IddPrice == "") {
                        IddPrice = "0.00";
                    }
                    $(".cart-idd-addons .vha-ts-cartval").text("$ " + IddPrice);
                    updateSessionDetails(IddPrice, "IddAddOns", "Add");
                    totalIndicativeCostCalc();
                    break;
                case "BSB":
                    $(".bank-details").val(u.item.BankDetails);
                    break;
                case "Secondary Device":
                    $("#vha-ts-access").find("#vhasecondaryadd").attr("Productcd", u.item.prodcd);
                    break;
                case "Accessory":
                    $("#vha-ts-access").find("#vhaaccessadd").attr("Productcd", u.item.prodcd);
                    $("#vha-ts-access").find("#vhaaccessadd").attr("Price", u.item.price);
                    break;
                case "RecurringProducts":
                    var RDMain = {
                        RDdata: {
                            RDparid: "",
                            RDsamid: "",
                            RDname: "",
                            RDPercent: "",
                            RDamount: "",
                            RDperiod: "",
                            RDreason: ""
                        }
                    };
                    var sRDparid = e.target.getAttribute("parid");
                    RDMain.RDdata.RDparid = e.target.getAttribute("parid");
                    RDMain.RDdata.RDsamid = $("#" + sRDparid).attr("samid");
                    RDMain.RDdata.RDname = $("#" + sRDparid).attr("name");
                    RDMain.RDdata.RDPercent = $("#" + sRDparid).attr("percent");
                    RDMain.RDdata.RDamount = $("#amount-" + sRDparid).val();
                    RDMain.RDdata.RDperiod = $("#period-" + sRDparid).val();
                    RDMain.RDdata.RDreason = $("#ts-reason-code-" + sRDparid).val();
                    restrictedDiscountOLI(RDMain.RDdata);
                    break;
                case "GlobalDeviceSearch":
                    $(".vha-ts-imei").val("");
                    $(".vhatsbrand").removeClass("applet-button-active");
                    filtereddevicesresponse = [];
                    for (i = 0; i < devicesresponse.hits.hits.length; i++) {
                        if (Object.values(devicesresponse.hits.hits)[i]._source.Source_Product_Name.toLowerCase() == $(this).val().toLowerCase()) {
                            filtereddevicesresponse.push(Object.values(devicesresponse.hits.hits)[i]);
                        }
                    }
                    createDeviceTiles();
                    break;
                case "GlobalPlanSearch":
                    $(".vhatsplantype").removeClass("applet-button-active");
					selectedplanTxt = "Others";
					pegaflag = "N";
                    var planFilter = [];
                    if ($(this).val() != "") {
                        for (i = 0; i < sRsnBasedplnresp.length; i++) {
                            if (sRsnBasedplnresp[i]._source.Plan_Name.toLowerCase() == $(this).val().toLowerCase()) {
                                planFilter.push(sRsnBasedplnresp[i]);
                                var tsPlan = tsPlantype.filter(function (a) {
                                    return sRsnBasedplnresp[i]._source.Plan_Type == a.SiebelName;
                                });
                                if (tsPlan.length) {
                                    $("#" + tsPlan[0]["Id"]).addClass("applet-button-active");
                                }
                            }
                        }
                    } else {
                        planFilter = sRsnBasedplnresp;
                    }
                    createPlanTiles(planFilter);
                    break;
                case "SDInsurancePick":
                    $("#ts-pick-sg").attr("asscInsProduct", u.item.asscInsProduct);
                    $("#ts-pick-sg").attr("asscInsProdType", u.item.siebelProdType);
                    if (u.item.value == "" || u.item.value == null) {
                        $("#ts-pick-sg").removeAttr("asscInsProduct");
                        $("#ts-pick-sg").removeAttr("asscInsProdType");
                    }
                    break;
                }
            };
            function createGuidedFlow() {
                var steps = [{
                        "a": "step-1",
                        "description": "Device and Plan"
                    }, {
                        "a": "step-2",
                        "description": "Review Summary"
                    }
                ];
                var btns = [{
                        "stepNo": "0,1",
                        "buttonName": "Pause",
                        "className": "btn forcehide vhasecondarybtn",
                        "custId": "vha-tot-pause"
                    }, {
                        "stepNo": "0",
                        "buttonName": "Accept CIS and Continue",
                        "className": "btn sw-btn-next forcehide vhacntbtn post-btn-sw",
                        "custId": "vha-tot-next"
                    }, {
                        "stepNo": "1",
                        "buttonName": "Submit",
                        "className": "btn forcehide vhacntbtn",
                        "custId": "vha-tot-finish"
                    }
                ];
                $("#smartwizard").smartWizard({
                    selected: 0,
                    theme: "dots",
                    cancelBtnText: "Cancel",
                    useURLhash: false,
                    showStepURLhash: false,
                    cartsummary: true,
                    stepCreate: {
                        stepObj: steps,
                        ulSelector: "ul#vha-guided-wizard"
                    },
                    toolbarSettings: {
                        toolbarPosition: "bottom",
                        toolbarExtraButtons: btns
                    },
                    anchorSettings: {
                        anchorClickable: true,
                        enableAllAnchors: true,
                        markDoneStep: true,
                        markAllPreviousStepsAsDone: true,
                        removeDoneStepOnNavigateBack: true,
                        enableAnchorOnDoneStep: true
                    }
                });
            }
            function executeEvent(pm, evtName, inp) {
                return viewPM.OnControlEvent(evtName, inp);
            }
            function setUI() {
                $("#vha-guided-wizard li:first-child").after('<li class="nav-item clickable"><div class="vha-guided-flow-li nav-link" vha-step="#step-2"><div class="litext">Plan Configuration</div></div></li>');
                $("#vha-guided-wizard").removeClass("justify-content-center").addClass("justify-content-right").css("margin-left", "250px");
                $(".vha-ts-simonlyupg #slectbox").addClass("vha-ts-lbl");
                $(".vha-ts-storeres #slectbox").addClass("vha-ts-lbl");
                $(".vha-arrow").removeClass("vha-arrow-down");
                $(".vha-ts-plan-select").before("<div id='planid' class='mb-1 vha-ts-lbl'>Choose Plan</div>");
                var AppletName = "VHA Shipping Address Details Applet - 3 Step Upgrade";
                var ShipingApplet = SiebelApp.S_App.GetActiveView().GetApplet(AppletName);
                var ManualDeliveryCtrl = $("input[name='" + ShipingApplet.GetControl("Manual Delivery Address").GetInputName() + "']");
                ManualDeliveryCtrl.attr("readonly", "readonly").closest("tr").hide();
                $('span[id^=Manual_Delivery_Address_Label]').parent().hide();
                $("input[aria-label='Manual Address Ident']").hide();
                $(".vha-ts-rcc").attr("disabled", true);
                tsintitialData.OrderHeader.RCCEditable = "N";
                $('[id^=Manual_Address_Entry_Label]').parent().html($('[id^=Manual_Address_Entry_Label]').parent().html().replace(":", ""));
                $('[id^=Pick_Primary_Address_Label]').parent().html($('[id^=Pick_Primary_Address_Label]').parent().html().replace(":", ""));
                $("#" + ShipingApplet.GetFullId()).addClass("shippingapp");
                $("#s_" + ShipingApplet.GetFullId() + "_div").addClass("Shippingaddress");
                var StoreResApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Store Reservation 3 Step Upgrade");
                $("#" + StoreResApplet.GetFullId()).addClass("storeresapp"); //Balaji - RC
                $("#s_" + StoreResApplet.GetFullId() + "_div").addClass("storereserve");
                $(".vha-ts-container #step-1").on("click", ".vha-gf-accordion", {}, function () {
                    if ($(this.nextElementSibling).hasClass("VFDisplayNone") == false) {
                        $(this.nextElementSibling).addClass("VFDisplayNone");
                        $(".vha-arrow").removeClass("vha-arrow-down");
                    } else {
                        var chkdata = false;
                        if (this.id == "vha-ts-device-hd") {
                            chkdata = true;
                        } else {
                            chkdata = validation();
                        }
                        if (chkdata == true) {
                            var aChild = this.nextElementSibling;
                            $(".vha-gf-accordion-chd").each(function (index, item) {
                                if ($(item).hasClass("VFDisplayNone") == false) {
                                    $(item).addClass("VFDisplayNone");
                                }
                            });
                            $(".vha-arrow").removeClass("vha-arrow-down");
                            $(aChild).removeClass("VFDisplayNone");
                            $(this).find(".vha-arrow").toggleClass("vha-arrow-down");
                        } else {
                            $(".vha-gf-accordion-chd").each(function (index, item) {
                                if ($(item).hasClass("VFDisplayNone") == false) {
                                    $(item).addClass("VFDisplayNone");
                                }
                            });
                            $(".vha-arrow").removeClass("vha-arrow-down");
                            $("#vha-ts-device-hd").next().removeClass("VFDisplayNone");
                            $("#vha-ts-device-hd").find(".vha-arrow").addClass("vha-arrow-down");
                        }
                    }
                });
                $("#vha-ts-prepayment").after('<div class="p-5 input-margin-left criticalinfo"><img id="vha-ts-infoimg" align="top" src="images/custom/info-circle-mid.png"/><u>Critical Information Summary</u> for proposed in market plan has been discussed with customer. They are aware that they can receive a copy of the CIS inshore, and also receive one off copy of CIS to their current billing option (email/post).</div>');
                $(".vha-ts-container #step-2").on("click", ".vha-gf-accordion", {}, function () {
                    var aChild = this.nextElementSibling;
                    $(".vha-gf-accordion-chd").each(function (index, item) {
                        if ($(item).hasClass("VFDisplayNone") == false) {
                            $(item).addClass("VFDisplayNone");
                        }
                    });
                    $(".vha-arrow").removeClass("vha-arrow-down");
                    $(aChild).removeClass("VFDisplayNone");
                    $(this).find(".vha-arrow").toggleClass("vha-arrow-down");
                });
                var phtml = "";
                for (var a = 0; a < tsBrand.length; a++) {
                    if (a == 0) {
                        phtml = phtml + '<button id="vhatsupgrade' + tsBrand[a].toLowerCase() + '" class="btn vhappbtn vhatsbrand brandsize">' + tsBrand[a] + "</button>";
                    } else {
                        phtml = phtml + '<button id="vhatsupgrade' + tsBrand[a].toLowerCase() + '" class="btn vhappbtn vhatsbrand brandsize">' + tsBrand[a] + "</button>";
                    }
                }
                $(".vha-ts-brandbtn").html(phtml);
                phtml = "";
                for (var a = 0; a < tsPayterm.length; a++) {
                    phtml = phtml + '<button id="' + tsPayterm[a].Id + '" class="' + tsPayterm[a].Class + '" term="' + tsPayterm[a].term + '">' + tsPayterm[a].Name + "</button>";
                }
                $(".vha-ts-paytermbtn").html(phtml);
                phtml = "";
                for (var a = 0; a < tsPlantype.length; a++) {
					
					var SearchString = "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='ENABLE_CMID'";

					var sLovFlg = VHAAppUtilities.GetPickListValues("", SearchString);
					
					var pegaResp = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_FUNCTION_ACCESS_RESP' AND [List Of Values.Value]= 'Resp|PegaResp' AND [List Of Values.Active]='Y'", {"All": "true"})[0].Name;
					
					var bsRespCheck = SiebelApp.S_App.GetService("VF BS Process Manager")
					var psInputs = SiebelApp.S_App.NewPropertySet();
					var userid =SiebelApp.S_App.GetProfileAttr("PegaLoginId");
					psInputs.SetProperty("User Id",userid );
					psInputs.SetProperty("Responsibility", pegaResp);
					psInputs.SetProperty("Service Name", "VF Check Responsibilities");
					psInputs.SetProperty("Method Name", "Check Responsibilities");
					var Output = bsRespCheck.InvokeMethod("Run Process", psInputs);
					//var Output = bsRespCheck.InvokeMethod("Check Responsibilities", psInputs);
					var resultset = Output?.GetChildByType("ResultSet");					
					
					if((sLovFlg=="N" || resultset.propArray.Exists != 'Y') && tsPlantype[a].Id=="vhatsRecommendplan")
					{
						
					}
					else
					{
						phtml = phtml + '<button id="' + tsPlantype[a].Id + '" class="' + tsPlantype[a].Class + '">' + tsPlantype[a].Name + "</button>";
					}
                }
                $(".vha-ts-plantypebtn").html(phtml);
                phtml = "";
                createDeviceTiles();
                getPlanDetails();
                mAppendPrepaymentDiv();
                mAppendShippingAddr();
                mAppendTwoWaySms();
                mAppendOverrideReason();
                mAppendAccessories();
                cancelTSUpgradeFlow();
                $("#gf-prepayment-amt").change(onPrepaymentValueChange);
                $("#vha-ts-addons").html(createAddoncard());
                $("#vha-ts-ban").html(createBillingTemp());
                $("#vhatsupgradeapple").addClass("applet-button-active");
                $(".vha-ts-cartimg .numberCircle").text(0);
                tsintitialData.OrderHeader.twoWaySMS.MSISDN = $(".twowaysms-msisdn").val();
                $("#vha-ts-2waysms").on("change", "select", {
                    cts: this
                }, function (e) {
                    tsintitialData.OrderHeader.twoWaySMS.MSISDN = $(this).val();
                });
                tsintitialData.OrderHeader.twoWaySMS.OverrideFlag = $("#vha-ts-2waysms #tickmark1").is(":checked") ? "Y" : "N";
                $("#vha-ts-2waysms").on("change", "input", {
                    cts: this
                }, function (e) {
                    tsintitialData.OrderHeader.twoWaySMS.OverrideFlag = $(this).is(":checked") ? "Y" : "N";
                });
                $("#ts-accessory-cat").autocomplete({
                    source: uniqueCat,
                    minLength: 0,
                    select: selectCategoryVal
                });
                $("#ts-accessory-model").autocomplete({
                    minLength: 0,
                    select: selectModelVal
                });
                $("#vha-ts-accessorylist").autocomplete({
                    minLength: 0,
                    select: selectAutoCompleteVal
                });
                $("#ts-accessory-code").autocomplete({
                    source: uniqueCode,
                    minLength: 0,
                    select: selectAutoCompleteVal,
                    close: function (event, ui) {
                        var sAccCode = $("#ts-accessory-code").val();
                        if (sAccCode != "") {
                            for (var i = 0; i < accessoryresult.length; i++) {
                                if (accessoryresult[i].prodcd == sAccCode) {
                                    var sCategory = accessoryresult[i].category;
                                    var sModel = accessoryresult[i].model;
                                    var sAccessory = accessoryresult[i].value;
                                    $('#ts-accessory-cat').autocomplete('search', sCategory);
                                    var list = $('#ts-accessory-cat').autocomplete("widget");
                                    checkSelectVal(list, sCategory);
                                    $("#ts-accessory-model").autocomplete('search', sModel);
                                    var list1 = $("#ts-accessory-model").autocomplete("widget");
                                    checkSelectVal(list1, sModel);
                                    $("#vha-ts-accessorylist").autocomplete('search', sAccessory);
                                    var list2 = $("#vha-ts-accessorylist").autocomplete("widget");
                                    checkSelectVal(list2, sAccessory);
                                    break;
                                }
                            }
                        }
                    }
                });
                function checkSelectVal(list, value) {
                    for (var i = 0; i < list[0].childElementCount; i++) {
                        if (list[0].children[i].innerText === value)
                            $(list[0].children[i]).click();
                    }
                }
                $("#ts-accessory-ean").autocomplete({
                    source: uniqueEanCode,
                    minLength: 0,
                    select: selectAutoCompleteVal,
                    close: function (event, ui) {
                        var sAccCode = $("#ts-accessory-ean").val();
                        console.log(accessoryresult);
                        var filteredEAN = [];
                        if (sAccCode != "") {
                            filteredEAN = accessoryresult.filter(function (a) {
                                return a.ean == sAccCode;
                            });
                        }
                        if (filteredEAN.length > 0) {
                            var sCategory = filteredEAN[0].category;
                            var sModel = filteredEAN[0].model;
                            var sAccessory = filteredEAN[0].value;
                            $('#ts-accessory-cat').autocomplete('search', sCategory);
                            var list = $('#ts-accessory-cat').autocomplete("widget");
                            checkSelectVal(list, sCategory);
                            $("#ts-accessory-model").autocomplete('search', sModel);
                            var list1 = $("#ts-accessory-model").autocomplete("widget");
                            checkSelectVal(list1, sModel);
                            $("#vha-ts-accessorylist").autocomplete('search', sAccessory);
                            var list2 = $("#vha-ts-accessorylist").autocomplete("widget");
                            checkSelectVal(list2, sAccessory);
                        }
                    }
                });
                $("#vha-ts-sd-dropdown").on("click", function () {
                    $($(this).attr("parId")).autocomplete("search", "");
                });
                $("#ts-accessory-cat-dropdown").on("click", function () {
                    $($(this).attr("parId")).autocomplete("search", "");
                });
                $("#vha-ts-access-dropdown").on("click", function () {
                    $($(this).attr("parId")).autocomplete("search", "");
                });
                $("#ts-accessory-model-dropdown").on("click", function () {
                    $($(this).attr("parId")).autocomplete("search", "");
                });
                $("#vha-ts-searchean-dropdown").on("click", function () {
                    $($(this).attr("parId")).autocomplete("search", "");
                });
                $("#ts-accessory-code-dropdown").on("click", function () {
                    $($(this).attr("parId")).autocomplete("search", "");
                });
                $("#ts-accessory-ean-dropdown").on("click", function () {
                    $($(this).attr("parId")).autocomplete("search", "");
                });
                $("#vhagfppwaiveoff").on("click", function (e) {
                    if ($(this).is(":checked")) {
                        tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.WaiveSurcharge = "Y";
						tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.WaiveSurcharge = "Y";//vasavi added for florida
                    } else {
                        tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.WaiveSurcharge = "N";
						tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.WaiveSurcharge = "N";//vasavi added for florida
                    }
                });
                $(".custermer-details-collapse").on("click", function (e) {
                    if ($(this).hasClass("Expanded")) {
                        $(".custermer-details-collapse").text("-");
                    } else {
                        $(".custermer-details-collapse").text("+");
                    }
                    $(".vha-ts-cart-cust-dtls").toggleClass("VFDisplayNone");
                    $(this).toggleClass("Expanded");
                });
                $(".salesrep>div>div>form>div>span").children().eq(1).addClass("VHASPContainer");
                var sClass = $(".VHASPContainer").attr("class").replace("siebui-applet-header", "vha-card-style");
                $(".VHASPContainer").attr("class", sClass);
                $(".salesrep>div>div").addClass("VHASalesPersonApp");
                $(".VHASalesPersonApp").addClass("vha-card-style");
                $(".VHASalesPersonApp").attr("style", "box-shadow: none!important");
                $(".salesrep>div>div>form>div>span>div").children().eq(0).children().addClass("field-label");
                $("div.salesrep").find("input[aria-label='Sales Person']").addClass("vha3StepUpgrade input-field");
                $("div.salesrep").find("input[aria-label='Sales Person']").attr("style", "height: 20px; width:200px; background-color: rgb(221, 221, 221); margin-left: 15.0em");
                $("div.salesrep").find("input[aria-label='Sales Person']").prop("disabled", "disabled");
                $(".salesrep>div>div>form>div>span>div").children().eq(2).attr("style", "display: none");
                $(".salesrep>div>div>form>div>span").children().eq(2).attr("style", "display: none");
                $("div.salesrep").attr("style", "margin-left: -12px");
                var StoreResApplet = SiebelApp.S_App.GetActiveView().GetApplet("VHA Store Reservation 3 Step Upgrade");
                $("#" + StoreResApplet.GetFullId()).addClass("VFDisplayNone");
            }
            function selectCategoryVal(e, u) {
                var selectedCategory = u.item.value;
                var filteredCategory = accessoryresult.filter(function (a) {
                    return a.category == selectedCategory;
                });
                filteredCategory = filteredCategory.map(function (a) {
                    return a.model;
                });
                var filteredSet = new Set(filteredCategory);
                var filteredCategoryMap = Array.from(filteredSet);
                filteredCategoryMap = $.unique(filteredCategoryMap);
                filteredCategoryMap = filteredCategoryMap.map(function (a) {
                    return {
                        value: a,
                        label: a
                    };
                });
                $("#ts-accessory-model").autocomplete({
                    source: filteredCategoryMap
                });
            }
            function selectModelVal(e, u) {
                var sCategory = $("#ts-accessory-cat").val();
                var sModel = u.item.value;
                filteredaccessoryresult = [];
                for (i = 0; i < accessoryresult.length; i++) {
                    if (accessoryresult[i].model == sModel && accessoryresult[i].category == sCategory) {
                        filteredaccessoryresult.push(accessoryresult[i]);
                    }
                }
                $("#vha-ts-accessorylist").autocomplete({
                    source: filteredaccessoryresult,
                    close: function (event, ui) {
                        var sAccessory = $("#vha-ts-accessorylist").val();
                        if (sAccessory != "") {
                            for (var i = 0; i < filteredaccessoryresult.length; i++) {
                                if (filteredaccessoryresult[i].value == sAccessory) {
                                    var sRRPIncGST = filteredaccessoryresult[i].price;
                                    sRRPIncGST = parseFloat(sRRPIncGST).toFixed(2);
                                    var sVendor = filteredaccessoryresult[i].vendor;
                                    $(".vha-rrp-inc-gst").remove();
                                    $("#vha-ts-accessorylist").next().html("<span class='vha-rrp-inc-gst'><span class='field-label' style='padding-left: 20px !important'>RRP Inc GST  </span>$<span class='field-label'>" + sRRPIncGST + "</span></span>");
                                    $(".vha-accessory-vendor").remove();
                                    $("#ts-accessory-ean").next().html("<span class='vha-accessory-vendor'><span class='field-label' style='padding-left: 28px !important'>Vendor - <span class='field-label'>" + sVendor + "</span></span></span>");
                                    break;
                                }
                            }
                        } else {
                            $(".vha-rrp-inc-gst").remove();
                            $(".vha-accessory-vendor").remove();
                        }
                    }
                });
            }
            function triggerCustomerExpand() {
                var cartDisplayed = !$(".vha-ts-cart-sum").hasClass("VFDisplayNone");
                var customerDisplayed = !$(".custermer-details-collapse").hasClass("Expanded");
                if (cartDisplayed) {
                    if (customerDisplayed) {
                        $(".custermer-details-collapse").trigger("click");
                    }
                } else {
                    if (!customerDisplayed) {
                        $(".custermer-details-collapse").trigger("click");
                    }
                }
            }
            function setData() {
                executeEvent(viewPM, "GET_CUSTDTLS_EVT", {
                    "ProcessName": "VHA TOT Get Customer Details Cart Summary WF",
                    "CustomerId": SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Account Id")
                });
                executeEvent(viewPM, "GET_EXT_CHARGEOUT", {
                    "ProcessName": "VHA Get Upgrade Eligibility Details Process",
                    "Object Id": SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Id")
                });
            }
            function prepaymentCheck() {
                if (gCustomerType != "Person" && gCustomerType != "Sole Trader") {
                    $("#vha-ts-prepayment-hd").addClass("VFDisplayNone");
                } else {
                    $("#vha-ts-prepayment-hd").removeClass("VFDisplayNone");
                }
            }
            function handleServerCallRes(prop, data) {
                switch (data.evt) {
                case "PICK_INS":
                    var d = parseStructure(data.bsoutput, ["ResultSet", "SiebMessage", "ListOfVHA Internal Product Object"]);
                    var l = d.childArray.length;
                    var isnHTML = "<select class='vha-pick-insurance'>";
                    isnHTML += "<option value='None'></option>";
                    for (var i = 0; i < l; i++) {
                        var e = d.childArray[i];
                        if (e.propArray["Siebel Product Type"] == "Insurance" || e.propArray["Siebel Product Type"] == "Free Insurance") {
                            isnHTML += "<option value='" + e.propArray["Name"] + "|" + e.propArray["Associated Insurance Name"] + "|" + e.propArray["Siebel Product Type"] + "'>" + e.propArray["Name"] + "</option>";
                        }
                    }
                    isnHTML += "</select>";
                    $(".insurance-type").html("").html(isnHTML);
                    insurancePick = d.childArray.filter(function (a) {
                        return (a.propArray["Siebel Product Type"] == "SD Insurance" || a.propArray["Siebel Product Type"] == "Free SD Insurance")
                    });
                    $('#ts-pick-sg').autocomplete({
                        source: insurancePick.map(function (a) {
                            return {
                                label: a.propArray["Name"],
                                value: a.propArray["Name"],
                                asscInsProduct: a.propArray["Associated Insurance Name"],
                                type: "SDInsurancePick",
                                siebelProdType: a.propArray["Siebel Product Type"]
                            }
                        }),
                        minLength: 0,
                        select: selectAutoCompleteVal
                    });
                    $("#vha-ts-pick-sg-dropdown").click(dropDownTrigger);
                    break;
                case "VHA_SUBMIT_ORDER":
                    var d = parseStructure(data.bsoutput, ["ResultSet"]);
                    if (d.propArray["Error Code"] == "") {
                        var sInps = SiebelApp.S_App.NewPropertySet();
                        sInps.SetProperty("OrderHeaderId", sSessionId);
                        var sOuts = VHAAppUtilities.CallBS("VHA 3 Step Upgrade BS", "OrderLineUpdate", sInps);
                        var Inps = SiebelApp.S_App.NewPropertySet();
                        var Outs = SiebelApp.S_App.NewPropertySet();
                        Inps.SetProperty("BusObjName", "VF Asset");
                        Inps.SetProperty("BusCompName", "Asset Mgmt - Asset - Header");
                        Inps.SetProperty("RowId", SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Root Asset Id"));
                        Inps.SetProperty("ViewName", "VF Asset Summary View - with extra IN fields");
                        Outs = VHAAppUtilities.CallBS("VHA MSISDN GotoView BS", "GotoView", Inps, {});
                    } else {
                        alert(d.propArray["Error Message"]);
                        return false;
                    }
                    break;
                case "RESUMEORDER":
                    var d = parseStructure(data.bsoutput, ["ResultSet", "Default"]);
                    if (d.propArray["Error Code"] == "") {
                        resumeJSON = d.propArray["sPausedSessionData"];
                        resumeOrder(resumeJSON);
                    } else {
                        alert("Error in resuming order.");
                        return false;
                    }
                    break;
                case "VHA_PAUSE_ORDER":
                    var d = parseStructure(data.bsoutput, ["ResultSet"]);
                    if (d.propArray["Error Code"] == "") {
                        if (sUserType == "Retail") {
                            app.GotoView("VF Dashboard List View - TBUI");
                        } else {
                            app.GotoView("VF UInbox My Inbox Item List View - TBUI - Core");
                        }
                    } else {
                        alert("Error in pausing the order.");
                        return false;
                    }
                    break;
                case "PAYMENT_URL":
                    var d = parseStructure(data.bsoutput, ["ResultSet"]);
                    if (d.propArray["Error Code"] == "") {
                        var main = function(){
							var tokenBCId = d.propArray["tokenBCId"];
							var authTokenBT = d.propArray["PaymentClientToken"]
							$("#BrainTreeDiv").remove();
							if(authTokenBT!=""){
								$("#vha-upgrade-payIframe").append(VFBTFormConstruct());
								hostFields("", authTokenBT, tokenBCId, appletMap["VHA 3 Step Upgrade Header Applet"].GetRecordSet()[0]["Account Id"], "");							
								$("#vha-ts-prepayment").delegate(".VFBTCancel", "click", {
									ctx: this
								}, ExitBTframe);
								$("#BrainTreeDiv").show();
								$('#cc-cvv').css('width','80%');
								$('#cc-expiration').css('width','80%');
								$('#help-img').css('right','20px');
							}else {
								alert("Error in connecting the third party system");
							}
						}
						load_scripts(main);
						/*PayCorpURL = d.propArray["Paycorp URL"];
                        $("#VFPPOUIPayCorpIFrameID").remove();
                        if (PayCorpURL != "") {
                            var VFPPOUIPayCorpCancle = function (e) {
                                $(".VFPPOUIPayCorpIFramePar").remove();
                                $("#vha-upgrade-payIframe").html("");
                            };
                            var VFPPOUIPayCorpSubmit = function (e) {
                                var paymentFrame = document.getElementById("VFPPOUIPayCorpIFrameID").contentWindow;
                                paymentFrame.postMessage(JSON.stringify({
                                        type: "SUBMIT"
                                    }), "*");
                            };
                            SiebelApp.contentUpdater.InitializeiFrame("vha-upgrade-payIframe", "<iframe id='VFPPOUIPayCorpIFrameID' src='" + PayCorpURL + "' class='VFPayCorpiFrameheight'></iframe><br><div class='VFPPOUIPayCorpSubmit appletButton'>Submit</div><div class='VFPPOUIPayCorpCancle appletButton'>Cancel</div>");
                            $("#VFPPOUIPayCorpIFrameID").addClass("VFPPOUIPayCorpIFramePar");
                            $("#vha-ts-prepayment").on("click", ".VFPPOUIPayCorpSubmit", {
                                ctx: this
                            }, VFPPOUIPayCorpSubmit);
                            $("#vha-ts-prepayment").on("click", ".VFPPOUIPayCorpCancle", {
                                ctx: this
                            }, VFPPOUIPayCorpCancle);
                        } else {
                            alert("Error in connecting the third party system");
                        }*/
                    } else {
                        return false;
                    }
                    break;
                case "GET_CUSTDTLS_EVT":
                    var d = parseStructure(data.bsoutput, ["ResultSet"]);
                    if (d.propArray["Error Code"] == "") {
                        $("#vhatscustname").text(d.propArray["Name"]);
                        $("#vhatsserviceused").text(d.propArray["ServiceUsed"]);
                        gCustomerType = d.propArray["ServiceUsed"];
                        $("#vhatscustdate").text(d.propArray["CustomerSince"]);
                        $("#vhatscreditchkstatus").text(d.propArray["CreditCheckStatus"]);
                        $("#vhatsremqplimit").text("$" + d.propArray["RemEquipLimit"]);
                        $("#vhatsupdremqplimit").text("$" + parseFloat(d.propArray["RemEquipLimit"]).toFixed(2));
                        $("#vhatsactservice").text(d.propArray["LiveServices"]);
                        $("#vhatsappservice").text(d.propArray["ApprovedServices"]);
                        $("#vhatssessionref").text(SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Id"));
                        maxGPPCnt = parseInt(d.propArray["MaxGPPCount"]) != NaN ? parseInt(d.propArray["MaxGPPCount"]) : 0;
                        sSessionData.EquipmentLimit = d.propArray["RemEquipLimit"];
                        prepaymentCheck();
                    } else {
                        alert("Error in fetching customer details.");
                        return false;
                    }
                    break;
                case "GET_EXT_CHARGEOUT":
                    var d = parseStructure(data.bsoutput, ["ResultSet"]);
                    sEditRCCResp = d.propArray["EnableEditRCC"];
                    sExistingAppCount = parseInt(d.propArray["ActiveSDCount"]) + parseInt(d.propArray["ActiveAccCount"]);
                    sExistingSDAppCount = parseInt(d.propArray["ActiveSDCount"]);
                    orderNum = d.propArray["OrderNum"];
                    dealerFlag = d.propArray["DealerFlag"];
                    var userAccess = d.GetProperty("EnableTenureOverride");
                    var restrictedDiscAccess = d.GetProperty("EnableRestrictedDiscount");
                    sIneligibleUpgrade = d.GetProperty("Ineligible_Upgrade_Reason");
                    sIneligibleResign = d.GetProperty("Ineligible_Resign_Reason");
                    sIneligibleOutright = d.GetProperty("Ineligible_Outright_Reason");
                    sIneligReasonUpgrade = d.GetProperty("Ineligible_Upgrade_Reason_Override");
                    sIneligReasonResign = d.GetProperty("Ineligible_Resign_Reason_Override");
                    sIneligReasonOutright = d.GetProperty("Ineligible_Outright_Reason_Override");
                    window.overrideSMSAccess = d.GetProperty("EnableOverrideSMS");
                    if (window.overrideSMSAccess === "Y") {
                        $("input[id='tickmark1']").attr("readonly", false);
                        $("input[id='tickmark1']").attr("disabled", false);
                    }
                    tsintitialData.OrderHeader.TenureOverride = d.GetProperty("TenureOverride");
                    tsintitialData.OrderHeader.LatestDeviceTermOverride = d.GetProperty("LatestDeviceTermOverride");
                    RRPshow = d.GetProperty("EligWithReason_Outright");
                    regignShow = d.GetProperty("EligWithReason_Resign");
                    upateShow = d.GetProperty("EligWithReason_Upgrade");
                    withoutResolutionRrp = d.GetProperty("EligForOutright");
                    withoutResolutionResign = d.GetProperty("EligForResign");
                    withoutResolutionUpgarde = d.GetProperty("EligForUpgrade");
                    if (userAccess == "N") {
                        $("#ts-override-reason").attr("readonly", "true");
                        $("#ts-override-reason").attr("disabled", "true");
                        $("#ts-override-reason").css({
                            "background-color": "#dddddd"
                        });
                    }
                    if (restrictedDiscAccess != "Y") {
                        $(".ts-discounts-method").addClass("VFDisplayNone");
                    }
                    $("#vhatsordernum").text(d.propArray["OrderNum"]);
                    $("span#UpgradeId").remove();
                    $(".salesrep").after("<span id='UpgradeId' style='color: red !important'><ul id='IneligOutright'></ul><ul id='IneligResign'></ul><ul id='IneligUpgrade'></ul><br></span>");
                    if (d.GetProperty("EligForOutright") != "Y") {
                        $("#vha-ts-rrp-btn").addClass("VFDisplayNone");
                        $("ul#IneligOutright").text(sIneligibleOutright);
                    }
                    if (d.GetProperty("EligForResign") != "Y") {
                        $("#vha-ts-resign-btn").addClass("VFDisplayNone");
                        $("ul#IneligResign").text(sIneligibleResign);
                    }
                    if (d.GetProperty("EligForUpgrade") != "Y") {
                        $("#vha-ts-upg-btn").addClass("VFDisplayNone");
                        $("ul#IneligUpgrade").text(sIneligibleUpgrade);
                    }
                    if ($("#vha-ts-rrp-btn").hasClass("VFDisplayNone") && $("#vha-ts-resign-btn").hasClass("VFDisplayNone") && $("#vha-ts-upg-btn").hasClass("VFDisplayNone") && userAccess == "Y") {
                        $("#overrideId").empty();
                        $("#ts-override-reason").after("<span id='overrideId'>Please Select Override Reason to Proceed</span>");
                    }
                    if (!$("#vha-ts-rrp-btn").hasClass("VFDisplayNone") || !$("#vha-ts-resign-btn").hasClass("VFDisplayNone") || !$("#vha-ts-upg-btn").hasClass("VFDisplayNone")) {
                        $("#ts-override-reason").attr("disabled", "true");
                        $("#ts-override-reason").css({
                            "background-color": "#dddddd"
                        });
                    } else if (userAccess == "Y") {
                        $("#ts-override-reason").attr("enabled", "true");
                    }
                    break;
                }
            }
            function parseStructure(outPS, oArr) {
                var o = outPS;
                var index;
                for (var i = 0; i < oArr.length; i++) {
                    index = -1;
                    for (var j = 0; j < o.childArray.length; j++) {
                        if (o.childArray[j].type === oArr[i]) {
                            index = j;
                            break;
                        }
                    }
                    if (index == -1) {
                        o = null;
                        break;
                    } else {
                        o = o.childArray[j];
                    }
                }
                return o;
            }
            function getPlanDetails(sResume) {
				nestedData = []; // Hari added for pega 31/Aug/2024
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://" + sESEndPoint + "/dvcpln/_search",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "dd0b3ba5-1198-5a10-3472-8119a5d93f7c"
                    },
                    "processData": false,
                    "data": '{\r\n    "size": 4000,\r\n    "query": {\r\n        "bool": {\r\n            "must": {\r\n                "match": {\r\n                    "Product_Code": {\r\n                    \t"query":"' + priDeviceProdCd + '",\r\n                    \t"operator": "and"\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}'
                };
                $.ajax(settings).done(function (planresponse) {
                    var filteredplanname = [];
                    for (i = 0; i < planresponse.hits.hits.length; i++) {
                        if (!filteredplanname.includes(Object.values(planresponse.hits.hits)[i]._source.Plan_Name)) {
                            filteredplanname.push(Object.values(planresponse.hits.hits)[i]._source.Plan_Name);
                        }
                    }
                    $("#ts-plan-search").autocomplete({
                        source: filteredplanname.map(function (a) {
                            return {
                                label: a,
                                value: a,
                                type: "GlobalPlanSearch"
                            };
                        }),
                        minLength: 0,
                        select: selectAutoCompleteVal
                    });
                    sRsnBasedplnresp = [];
                    for (i = 0; i < planresponse.hits.hits.length; i++) {
                        sRsnBasedplnresp.push(planresponse.hits.hits[i]);
                    }
                    if (sessionType == "Paused" && sResume == "Y" && pausedDetails.OrderHeader.RedPlusPlan.Name != "") {
                        var planFilter = [];
                        for (i = 0; i < sRsnBasedplnresp.length; i++) {
                            if (sRsnBasedplnresp[i]._source.Plan_Name.toLowerCase().indexOf(pausedDetails.OrderHeader.RedPlusPlan.Name.toLowerCase()) > -1) {
                                planFilter.push(sRsnBasedplnresp[i]);
                            }
                        }
                        createPlanTiles(planFilter);
                    } else {
                        createPlanTiles(sRsnBasedplnresp);
                    }
                    if (sessionType == "Paused" && sResume == "Y" && pausedDetails.OrderHeader.RedPlusPlan.Name != "") {
                        $("#vha-ts-p-carousel-container .vha-ts-addtocartbtn[planname='" + pausedDetails.OrderHeader.RedPlusPlan.Name + "']").trigger("click");
                        if (pausedDetails.OrderHeader.RCCEditable == "Y") {
                            $(".vha-ts-rcc").attr("disabled", false);
                            tsintitialData.OrderHeader.RCCEditable = "Y";
                        }
                        if (pausedDetails.OrderHeader.RCCValue != "") {
                            $(".vha-ts-rcc").val(pausedDetails.OrderHeader.RCCValue).change();
                            tsintitialData.OrderHeader.RCCValue = pausedDetails.OrderHeader.RCCValue;
                        }
                        pausedDetails.OrderHeader.RedPlusPlan.Name = "";
                    }
                });
            }
            function createPlanTiles(sRsnBasedplnresp) {
                $("#vha-ts-p-carousel-container").off("click").on("click", ".vha-ts-addtocartbtn", function () {
                    $("#maskoverlay").styleShow();
                    tssleep(30).then(() => {
                        var sPlancd = $(this).attr("plancd");
						Pega_sel_PlanSAMID = $(this).attr("plancd"); //pega
						pegaoffDataGlob;
						if(selectedplanTxt === "Recommendations")
							pegaflag = "Y";
						
						if(Pegafilteredarray != undefined && pegaflag === "Y"){
							for (let i = 0; i < Pegafilteredarray.length; i++) {

								if (Pega_sel_PlanSAMID.toLowerCase() === Pegafilteredarray[i].SAM_Product_ID.toLowerCase()) {
									pegaoffDataGlob= Pegafilteredarray[i];
								}															
							}
							//validate pega plan added earlier or not
							let bsRespCheck1 = SiebelApp.S_App.GetService("VF BS Process Manager");
							let psInputs1 = SiebelApp.S_App.NewPropertySet();
							psInputs1.SetProperty("Service Name", "VHA Pega Order Validation BS");
							psInputs1.SetProperty("Method Name", "ValidatePegaOffers");
							psInputs1.SetProperty("MSISDN", pegaoffDataGlob.ContextID );
							psInputs1.SetProperty("OfferType", pegaoffDataGlob.OfferType );
							psInputs1.SetProperty("InteractionId", pegaoffDataGlob.interactionID );
							let pegaOutput1 = bsRespCheck1.InvokeMethod("Run Process", psInputs1);
							
							if (pegaOutput1?.GetChildByType("Errors")){
								if (pegaOutput1?.GetChildByType("Errors").childArray[0].propArray.ErrMsg != ""){
									pegaflag = "N";
									return false;
								}
							}
						
						//pega to get global discount Type
							var dis_samidd = pegaoffDataGlob.dis_SamproductId;
							if(dis_samidd !== undefined && dis_samidd !== null && dis_samidd.trim() !== "")
								dis_samid_flag = "Y";
							else
								dis_samid_flag = "N";
							
							if(pegaoffDataGlob != "" && pegaflag === "Y" && dis_samid_flag === "Y"){
								var bsRespCheck = SiebelApp.S_App.GetService("VF BS Process Manager");
								var psInputs = SiebelApp.S_App.NewPropertySet();
								psInputs.SetProperty("Service Name", "VHA Pega Order Validation BS");
								psInputs.SetProperty("Method Name", "GetOfferProductName");
								psInputs.SetProperty("OfferSamId", pegaoffDataGlob.dis_SamproductId );
								//psInputs.SetProperty("SMA_PRODUCT_ID", pegaoffDataGlob.SAM_Product_ID );
								var pegaOutput = bsRespCheck.InvokeMethod("Run Process", psInputs);
								var resultset = pegaOutput?.GetChildByType("ResultSet");
								pegaoffDataGlob.GlobalProductId=resultset.propArray.GlobalProductId;
								pegaoffDataGlob.OfferProductName=resultset.propArray.OfferProductName;
							}
						}
						
                        $(".vha-ts-shrngcmp").remove();
                        refreshPromocode();
						var sAppleFlag = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_APPLE_VOUCR_PLN_ID' AND [List Of Values.Name]='" + sPlancd + "'");//ADUTTA:AppleFraudOfferProject
                        var sAppleSwitch = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Name]='Apple Voucher Plan Check'");//ADUTTA:AppleFraudOfferProject
                        var sVoucherAmount = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_APPLE_VOUCHER_AMOUNT' AND [List Of Values.Name]='" + sPlancd + "'");//ADUTTA:AppleFraudOfferProject
						sVoucherAmount = parseFloat(parseFloat(sVoucherAmount).toFixed(2));
						//Proj:Visa-Start//Add cart
						var sVisaAccid = "",sVisaTerm = "",sVisaOrderId = "", sErrMsg = "",ROups = "",sVisaErrorFlag = "";//TULASIY::08-07-2023::Added sVisaErrorFlag for Apple Voucher Validation
						//var sAppleVoucherFlag = "";//ADUTTA Apple Fraud Offer Project
						sVisaAccid = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Account Id");	
						sVisaOrderId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Order Id");										
						sVisaTerm = $("#vha-ts-tot-conterm0").text();
						if (sVisaTerm == "Month to Month")
							sVisaTerm="1";
						if (sVisaTerm == "12 Months")
							sVisaTerm="12";	
						if (sVisaTerm == "24 Months")
							sVisaTerm="24";	
						if (sVisaTerm == "36 Months")
							sVisaTerm="36";						
						if (sVisaAccid !="" && sVisaTerm !=""){										
							var Inputs = SiebelApp.S_App.NewPropertySet();
							var Output = SiebelApp.S_App.NewPropertySet();							
							var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
							Inputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service");										
							Inputs.SetProperty("Order Id", sVisaOrderId);
							Inputs.SetProperty("CustId", sVisaAccid);										
							Inputs.SetProperty("TransactionType", "3 Step Upgrade");	
							Inputs.SetProperty("Term", sVisaTerm);	
							Inputs.SetProperty("Method Name", "GetVisaExpiryDate");
							ROups = ser.InvokeMethod("Run Process", Inputs);										
							sErrMsg = ROups.childArray[0].propArray.ErrorMessage; 	
							if (sErrMsg!="")
							{		
								sVisaErrorFlag = 'Y';//TULASIY::08-07-2023::Added for Apple Voucher Validation
								//$("div#planid.mb-1.vha-ts-lbl").addClass("text-danger");TULASIY::08-07-2023::Commented for Apple Voucher Validation
								//$("div#planid.mb-1.vha-ts-lbl.text-danger").text(sErrMsg);TULASIY::08-07-2023::Commented for Apple Voucher Validation
							}							
							else 
							{
								$("div#planid.mb-1.vha-ts-lbl.text-danger").text("");	
								$("div#planid.mb-1.vha-ts-lbl").removeClass("text-danger");
							}							
						}	
						//Visa end													
						//if (sErrMsg=="")	TULASIY::08-07-2023::Commented for Apple Voucher Validation
						//{					TULASIY::08-07-2023::Commented for Apple Voucher Validation		
                        for (i = 0; i < sRsnBasedplnresp.length; i++) {
                            if (sRsnBasedplnresp[i]._source.Plan_Code == sPlancd) {
                                priPlanCd = sRsnBasedplnresp[i]._source.Plan_Code;
                                sharingindicator = sRsnBasedplnresp[i]._source.Sharing;
                                sPropSamId = sRsnBasedplnresp[i]._source.Proposition_Sam_Id;
                                sNewPlanPri = sRsnBasedplnresp[i]._source.Plan_Price_Inc_Gst;
                                sPlanType = sRsnBasedplnresp[i]._source.Plan_Type;
                                var psIn = SiebelApp.S_App.NewPropertySet();
                                var psOut = SiebelApp.S_App.NewPropertySet();
                                var sDetlsBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
                                var sCurrPlan = sDetlsBC.GetFieldValue("Plan Id");
                                psIn.SetProperty("CurrPlanId", sCurrPlan);
                                psIn.SetProperty("TargetProp", priPlanCd);
								psIn.SetProperty("CustAccountId", sVisaAccid); //TULASIY::29-06-2023::Created for Apple Voucher Validation
                                psIn.SetProperty("OrderFunction", "UPGRADE");
							
                                if(sVisaErrorFlag == "Y")//TULASIY::29-06-2023::Created for Apple Voucher Validation
								{
									$("div#planid.mb-1.vha-ts-lbl").addClass("text-danger");
									$("div#planid.mb-1.vha-ts-lbl.text-danger").text(sErrMsg);
								}
                                  //ADUTTA:Equipment Limit Validation
								else if(sAppleFlag == "Y" && sVoucherAmount > sSessionData.EquipmentLimit)
								{
								 var sErrDtl = "The Total Contract/Voucher Amount Value ($ " + sVoucherAmount + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sVoucherAmount - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory/voucher plan within the approved limit or Check for prepayment option if available";
								  $("div#planid.mb-1.vha-ts-lbl").addClass("text-danger");
                                  $("div#planid.mb-1.vha-ts-lbl.text-danger").text(sErrDtl);
								}
                                 else if(sAppleSwitch == "Y")
								{								
                                psOut = VHAAppUtilities.CallBS("VF OM Order Toolkit Service", "CheckPlanGroupMatrixUpg", psIn, {});
                                var ErrCd = psOut.GetProperty("ErrCode");
                                var ErrMsg = psOut.GetProperty("ErrMsg");
                                if (ErrCd != "") {
									if(ErrCd == "VHA_APPLE_VOUCHER_FRAUD")//TULASIY::29-06-2023::Created for Apple Voucher Validation
									{
										$("div#planid.mb-1.vha-ts-lbl").addClass("text-danger");
										$("div#planid.mb-1.vha-ts-lbl.text-danger").text(ErrMsg);
									}
									else if(sVisaErrorFlag == "Y")//TULASIY::29-06-2023::Created for Apple Voucher Validation
									{
										$("div#planid.mb-1.vha-ts-lbl").addClass("text-danger");
										$("div#planid.mb-1.vha-ts-lbl.text-danger").text(sErrMsg);
									}
									else
									{
                                    $(".vha-ts-device-select #vha-ts-d-stockerrmsg").text(ErrMsg);
                                    $(".vha-ts-device-select #vha-ts-d-stockerrmsg").removeClass("text-warning").addClass("text-danger");
                                    var errFocus = document.querySelector(".vha-ts-device-select #vha-ts-d-stockerrmsg");
                                    errFocus.focus();
                                    errFocus.scrollIntoView();
                                    erormsg = false;
									}
                                  }
								}
								
								else {
                                    if (sPlanType == "Vodafone Caps" && sExistingAppCount < 1 || sPlanType != "Vodafone Caps") {
                                        sCapPlan = sPlanType == "Vodafone Caps";
                                        $(".vha-ts-dvcplan .cart-plan-info .vha-ts-cartval").text("$ " + sRsnBasedplnresp[i]._source.Plan_Price_Inc_Gst);
                                        plancount = 0;
                                        $(".vha-ts-dvcplan .cart-plan-info").removeClass("VFDisplayNone");
                                        $(".vha-ts-dvcplan .cart-plan-info .vha-ts-cartitemw").text($(this).attr("planname"));
                                        $(".vha-ts-rcc").val("");
                                        var plandetails = tsintitialData.OrderHeader.RedPlusPlan;
                                        plandetails.Name = sRsnBasedplnresp[i]._source.Plan_Name;
                                        plandetails.PlanPrice = sRsnBasedplnresp[i]._source.Plan_Price_Inc_Gst;
                                        plandetails.EligibleOrderLineItem = "Y";
                                        tsintitialData.OrderHeader.PropositionId = sRsnBasedplnresp[i]._source.Proposition_Sam_Id;
                                        tsintitialData.OrderHeader.PropositionName = sRsnBasedplnresp[i]._source.Proposition_Name;
                                        mgetAddonsList("N");
                                        priPlanDtl = sRsnBasedplnresp[i]._source;
                                        var sUpdtDiscDtl = refreshCart(priPlanDtl);
                                        if (sSimOnlyUpg !== "Y") {
                                            updateSessionDetails([parseFloat(parseFloat(sUpdtDiscDtl["Total RCC Inc GST"]).toFixed(2)), parseInt($(".vhats-d-term.applet-button-active").attr("term"))], "DeviceCost", "Add");
                                            $(".vha-ts-dvcplan-chd  .vha-ts-d-payinfo").html("$ " + parseFloat(sUpdtDiscDtl["Total RCC Inc GST"]).toFixed(2) + " over " + tsintitialData.OrderHeader.GppDeviceContract.Term + " months");
                                            $(".vha-ts-dvcplan-chd .cart-device-info .vha-ts-cartval").text("$ " + parseFloat(parseFloat(sUpdtDiscDtl["Total RCC Inc GST"]) / parseInt(tsintitialData.OrderHeader.GppDeviceContract.Term)).toFixed(2));
                                            var devicedetails = tsintitialData.OrderHeader.Device;
                                            devicedetails.Device__RCC__Exc__GST = sUpdtDiscDtl["Total RCC Exc GST"];
                                            devicedetails.Device__RCC__Inc__GST = sUpdtDiscDtl["Total RCC Inc GST"];
                                            var upgradedetails = tsintitialData.OrderHeader.Upgrade;
                                            upgradedetails.RIV__Exc__GST = sUpdtDiscDtl["RIV Exc GST"];
                                            upgradedetails.RIV__Inc__GST = sUpdtDiscDtl["RIV Inc GST"];
                                            upgradedetails.Savings__On__RIV__Exc__GST = sUpdtDiscDtl["Savings On RIV Exc GST"];
                                            upgradedetails.Savings__On__RIV__Inc__GST = sUpdtDiscDtl["Savings On RIV Inc GST"];
                                            upgradedetails.Total__RCC__Exc__GST = sUpdtDiscDtl["Total RCC Exc GST"];
                                            upgradedetails.Total__RCC__Inc__GST = sUpdtDiscDtl["Total RCC Inc GST"];
                                            upgradedetails.EligibleOrderLineItem = "Y";
                                            var gppdvcecontract = tsintitialData.OrderHeader.GppDeviceContract;
                                            gppdvcecontract.Contract__Amount = sUpdtDiscDtl["Total RCC Inc GST"];
                                            gppdvcecontract.Monthly__Repayment = mTruncate(parseFloat(gppdvcecontract.Contract__Amount / gppdvcecontract.Term).toString());
                                        }
                                        updateSessionDetails(sRsnBasedplnresp[i]._source.Plan_Price_Inc_Gst, "PlanCost", "Add");
                                        if (sUpdtDiscDtl) {
                                            addDiscounts(sUpdtDiscDtl);
                                        }
                                        var getId = $(this).parent().parent().parent().parent().attr("id");
                                        $("[id^=plancard]").removeClass("borderhighlight");
                                        $("#" + getId).addClass("borderhighlight");
                                        if (tsintitialData.OrderHeader.RedPlusPlan.Name != "") {
                                            $("#showDeviceMsg1").empty();
                                        }
                                        plancount++;
                                        if (plancount == 1) {
                                            Totalcountvalue(devicecount, plancount, secdevice, accssorycount);
                                        }
                                        mSetPrepaymentaccordion();
                                        break;
                                    } else {
                                        $(".vha-ts-plan-select").after('<div class="p-3 input-margin-left criticalinfo vha-ts-shrngcmp">Please cancel / terminate all the Active APP Contract to purchase the Vodafone Cap Plan.</div>');
                                    }
                                }
							}
						}
                        
						//}TULASIY::08-07-2023::Commented for Apple Voucher Validation
						//if(sAppleVoucherFlag != "Y")//Added condition for Apple fraud Project
                        mSetPrepaymentaccordion();
                        $("#maskoverlay").styleHide();
                    });	
                });
                var nlen = sRsnBasedplnresp.length;
                sRsnBasedplnresp.sort(function (a, b) {
                    var a_datestr = a._source.Plan_Created_Date.split("/");
                    if (a_datestr.length != 3) {
                        a_datestr = "01/01/1970".split("/");
                    }
                    var a_date = new Date(a_datestr[2], a_datestr[1] - 1, a_datestr[0])
                        var b_datestr = b._source.Plan_Created_Date.split("/");
                    if (b_datestr.length != 3) {
                        b_datestr = "01/01/1970".split("/");
                    }
                    var b_date = new Date(b_datestr[2], b_datestr[1] - 1, b_datestr[0]);
                    return b_date - a_date;
                });
                if (nlen > 0) {
                    var i = Math.floor(nlen / 3);
                    var chtml = '<div id="vha-ts-carousel" class="carousel slide carousel-multi-item" data-ride="carousel" data-interval="false"><div class="carousel-control-prev m-3 carousel-control" href="#vha-ts-carousel" data-slide="prev"><div class="carousel-control-prev-icon vha-ts-carouselnav"></div></div><div class="carousel-control-next m-3 carousel-control" href="#vha-ts-carousel" data-slide="next"><div class="carousel-control-next-icon vha-ts-carouselnav"></div></div><div class="carousel-inner vha-ts-carousel-inner" role="listbox">';
                    var f = 0;
                    var s = 0;
                    var t = 0;
                    for (var x = 0; x <= i; x++) {
                        f = t;
                        s = t + 1;
                        t = t + 2;
                        if (x == 0) {
                            if (s < nlen) {
                                if (t < nlen) {
                                    chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + createPlanCard(s, sRsnBasedplnresp) + createPlanCard(t, sRsnBasedplnresp) + "</div></div>";
                                } else {
                                    chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + createPlanCard(s, sRsnBasedplnresp) + "</div></div>";
                                }
                            } else {
                                if (f < nlen) {
                                    chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + "</div></div>";
                                }
                            }
                            t = t + 1;
                        } else {
                            if (s < nlen) {
                                if (t < nlen) {
                                    chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + createPlanCard(s, sRsnBasedplnresp) + createPlanCard(t, sRsnBasedplnresp) + "</div></div>";
                                } else {
                                    chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + createPlanCard(s, sRsnBasedplnresp) + "</div></div>";
                                }
                            } else {
                                if (f < nlen) {
                                    chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createPlanCard(f, sRsnBasedplnresp) + "</div></div>";
                                }
                            }
                            t = t + 1;
                        }
                    }
                    chtml = chtml + "</div></div>";
                    $("#vha-ts-p-carousel-container").html(chtml);
                } else {
                    $("#vha-ts-p-carousel-container").html('<div class="row d-flex justify-content-center vha-tot-cnores pt-5 pb-5"><div class="col-md-12 h3 mb-2">No plan found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
                }
            }
            function createDeviceTiles() {
                $.getJSON("scripts/siebel/custom/DeviceImage.json", function (jd) {
                    var sDevImgMpng = jd;
                    var distinctModels = [];
                    for (i = 0; i < filtereddevicesresponse.length; i++) {
                        if (!distinctModels.includes(Object.values(filtereddevicesresponse)[i]._source.Source_Product_Name)) {
                            var prodName = Object.values(filtereddevicesresponse)[i]._source.Source_Product_Name.toLowerCase();
                            if (prodName != "non device" && prodName.indexOf("kogan") == -1) {
                                distinctModels.push(Object.values(filtereddevicesresponse)[i]._source.Source_Product_Name);
                            }
                        }
                    }
                    $("#vha-ts-d-carousel-container").off("click").on("click", ".vha-ts-d-shopaddtocartbtn", function () {
                        $("#maskoverlay").styleShow();
                        tssleep(30).then(() => {
                            $(".vha-ts-shrngcmp").remove();
                            $("#showMsg").empty();
                            refreshPromocode();
                            $(".vha-ts-device-select #vha-ts-d-equiplmtmsg").text("");
                            $(".vha-ts-device-select #vha-ts-d-stockerrmsg").text("");
                            devicecount = 0;
                            if ($(".vhats-d-term").hasClass("applet-button-active")) {
                                if (currentGPPCnt < maxGPPCnt) {
                                    var sDvcModel = $(this).attr("device");
                                    var sDvcCap = $(this).attr("capacity");
                                    var sDvcColor = $(this).attr("color");
                                    var sDevice = filtereddevicesresponse.filter(function (a) {
                                        return a._source.Source_Product_Name == sDvcModel && a._source.Capacity == sDvcCap && a._source.Color == sDvcColor;
                                    });
                                    if (sDevice.length > 0) {
                                        shopDevice(sDevice[0]._source, $(this));
                                        mSetPrepaymentaccordion(); 
                                    }
									//Proj:Visa-Start//Add shop									
									var sVisaAccid = "",sVisaTerm = "",sVisaOrderId = "", sErrMsg = "",ROups = "";
									sVisaAccid = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Account Id");	
									sVisaOrderId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Order Id");										
									sVisaTerm = $(".vhats-d-term.applet-button-active").attr("term");									
									if (sVisaAccid !="" && sVisaTerm !=""){										
										var Inputs = SiebelApp.S_App.NewPropertySet();
										var Output = SiebelApp.S_App.NewPropertySet();
										var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
										Inputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service");										
										Inputs.SetProperty("Order Id", sVisaOrderId);
										Inputs.SetProperty("CustId", sVisaAccid);										
										Inputs.SetProperty("TransactionType", "3 Step Upgrade");
										Inputs.SetProperty("3Step", "3GPP");										
										Inputs.SetProperty("Term", sVisaTerm);	
										Inputs.SetProperty("Method Name", "GetVisaExpiryDate");
										ROups = ser.InvokeMethod("Run Process", Inputs);										
										sErrMsg = ROups.childArray[0].propArray.ErrorMessage; 	
										if (sErrMsg!="")											
											$(".vha-ts-device-select #vha-ts-d-stockerrmsg").text(sErrMsg);
									}									
									//Visa end							
                                    //Balaji - RC									
									
                                    if (localsessionType == "") {
                                        var aStoreResApp = SiebelApp.S_App.GetActiveView().GetApplet("VHA Store Reservation 3 Step Upgrade");
                                        var aStoreResBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade");
                                        if (aStoreResApp.GetRecordSet().length > 0) {
                                            if (aStoreResApp.GetRecordSet()[0]['Reservation Status'] == 'Reserved')
                                                aStoreResApp.InvokeMethod("UnReserveStock");
                                        }
                                        aStoreResApp = SiebelApp.S_App.GetActiveView().GetApplet("VHA Store Reservation 3 Step Upgrade");
                                        aStoreResBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA Store Reservation Details Upgrade");
                                        if (aStoreResApp.GetRecordSet().length == 0 && $(".vha-ts-storeres input[type=checkbox]").prop("checked")){
                                            aStoreResApp.InvokeMethod("NewRecord");
                                            aStoreResBC.SetFieldValue("SKU Code", sDevice[0]._source.Product_Code); //MU222X/A - MWCG2X/A
											aStoreResBC.SetFieldValue("Device Name", sDevice[0]._source.Source_Product_Name+" "+sDevice[0]._source.Capacity+" "+sDevice[0]._source.Color);
                                            aStoreResBC.InvokeMethod("WriteRecord");
											
                                        }
										if (aStoreResApp.GetRecordSet().length > 0 && $(".vha-ts-storeres input[type=checkbox]").prop("checked")){
											if (aStoreResApp.GetRecordSet()[0]['Reservation Status'] == 'Reserved'){
                                            aStoreResApp.InvokeMethod("UnReserveStock");
											aStoreResApp.InvokeMethod("NewRecord");
                                            aStoreResBC.SetFieldValue("SKU Code", sDevice[0]._source.Product_Code); //MU222X/A - MWCG2X/A
											aStoreResBC.SetFieldValue("Device Name", sDevice[0]._source.Source_Product_Name+" "+sDevice[0]._source.Capacity+" "+sDevice[0]._source.Color);
                                            aStoreResBC.InvokeMethod("WriteRecord");
											}
                                            else if (aStoreResApp.GetRecordSet()[0]['Reservation Status'] == '') {
                                            aStoreResBC.SetFieldValue("SKU Code", sDevice[0]._source.Product_Code);
											aStoreResBC.SetFieldValue("Device Name", sDevice[0]._source.Source_Product_Name+" "+sDevice[0]._source.Capacity+" "+sDevice[0]._source.Color);
											aStoreResBC.SetFieldValue("Store Code", "");
                                            aStoreResBC.InvokeMethod("WriteRecord");	
											}
                                        }
                                    }else{
										localsessionType = "";
									}
                                } else {
                                    $(".vha-ts-device-select #vha-ts-d-stockerrmsg").text("You have reached the maximum allowed MPP/GPPs. You will need to Terminate an existing MPP/GPP before you can add more MPP/GPPs to this service.");
                                }
                            } else {
                                $("#vhatotcapplan").after("<span id='showMsg'>Please select Payment Term</span>");
                            }
                            $("#maskoverlay").styleHide();
                        });
                    });
                    var nlen = distinctModels.length;
                    if (nlen > 0) {
                        var i = Math.floor(nlen / 3);
                        var chtml = '<div id="vha-ts-d-carousel" class="carousel slide carousel-multi-item" data-ride="carousel" data-interval="false"><div class="carousel-control-prev m-3 carousel-control" href="#vha-ts-d-carousel" data-slide="prev"><div class="carousel-control-prev-icon vha-ts-d-carouselnav"></div></div><div class="carousel-control-next m-3 carousel-control" href="#vha-ts-d-carousel" data-slide="next"><div class="carousel-control-next-icon vha-ts-d-carouselnav"></div></div><div class="carousel-inner vha-ts-d-carousel-inner" role="listbox">';
                        var f = 0;
                        var s = 0;
                        var t = 0;
                        for (var x = 0; x <= i; x++) {
                            f = t;
                            s = t + 1;
                            t = t + 2;
							
							var sDeviceTerm = $(".vhats-d-term.applet-button-active").attr("term");//vasavi added for PKE000000106117
                            if (x == 0) {
                                if (s < nlen) {
                                    if (t < nlen) {
                                        chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(s, distinctModels[s], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(t, distinctModels[t], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + "</div></div>";//vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    } else {
                                        chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(s, distinctModels[s], filtereddevicesresponse, sDevImgMpng, sDevImgMpng, sDeviceTerm) + "</div></div>";//vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    }
                                } else {
                                    if (f < nlen) {
                                        chtml = chtml + '<div class="carousel-item active"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + "</div></div>";//vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    }
                                }
                                t = t + 1;
                            } else {
                                if (s < nlen) {
                                    if (t < nlen) {
                                        chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(s, distinctModels[s], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(t, distinctModels[t], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + "</div></div>";//vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    } else {
                                        chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + createDeviceCard(s, distinctModels[s], filtereddevicesresponse, sDevImgMpng,sDeviceTerm) + "</div></div>";//vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    }
                                } else {
                                    if (f < nlen) {
                                        chtml = chtml + '<div class="carousel-item"><div class="d-flex bd-highlight justify-content-center">' + createDeviceCard(f, distinctModels[f], filtereddevicesresponse, sDevImgMpng, sDeviceTerm) + "</div></div>";//vasavi added new argument 'sDeviceTerm' for CreateDeviceCard function for PKE000000106117
                                    }
                                }
                                t = t + 1;
                            }
                        }
                        chtml = chtml + "</div></div>";
                        $("#vha-ts-d-carousel-container").html(chtml);
                    } else {
                        $("#vha-ts-d-carousel-container").html('<div class="row d-flex justify-content-center vha-tot-d-cnores pt-5 pb-5"><div class="col-md-12 h3 mb-2">No Devices found.</div><div class="col-md-12 h4">Please try with other search options.</div></div>');
                    }
                    if (sessionType == "Paused") {
                        setTimeout(function () {
                            if (pausedDetails.OrderHeader.Device.Device__Code != "") {
                                $(".vha-ts-imei").val(pausedDetails.OrderHeader.GppDeviceContract.IMEI___Serial__Number);
                                $(".vhats-d-term[term=" + pausedDetails.OrderHeader.GppDeviceContract.Term + "]").trigger("click");
                                $("#vha-ts-d-carousel-container .vha-ts-d-shopaddtocartbtn").trigger("click");
                                localsessionType = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA 3 Step Upgrade Header Applet"].GetRecordSet()[0]["Status"];//Balaji M
								if (pausedDetails.OrderHeader.RCCEditable == "Y" && pausedDetails.OrderHeader.RedPlusPlan.Name == "") {
                                    $(".vha-ts-rcc").attr("disabled", false);
                                    tsintitialData.OrderHeader.RCCEditable = "Y";
                                }
                                if (pausedDetails.OrderHeader.RCCValue != "" && pausedDetails.OrderHeader.RedPlusPlan.Name == "") {
                                    $(".vha-ts-rcc").val(pausedDetails.OrderHeader.RCCValue).change();
                                    tsintitialData.OrderHeader.RCCValue = pausedDetails.OrderHeader.RCCValue;
                                }
                                $(".vhatsbrand").removeClass("applet-button-active");
                                pausedDetails.OrderHeader.Device.Device__Code = "";
                                pausedDetails.OrderHeader.Upgrade.EligibleOrderLineItem = "N";
                                resumeDevice = "Added";
                            } else {
                                if (pausedDetails.OrderHeader.Device.Device__Code == "" && pausedDetails.OrderHeader.Upgrade.EligibleOrderLineItem == "Y") {
                                    $(".vha-ts-simonlyupg input[type='checkbox']").trigger("click");
                                    pausedDetails.OrderHeader.Upgrade.EligibleOrderLineItem = "N";
                                    resumeDevice = "Added";
                                }
                            }
                        }, 5000);
                    }
                });
            }
            function useExistingCreditCard() {
                var Inputs = SiebelApp.S_App.NewPropertySet();
                var Outs = SiebelApp.S_App.NewPropertySet();
                var sDetlsBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
                var sBAId = sDetlsBC.GetFieldValue("Billing Account Id");
                var sOrderId = sDetlsBC.GetFieldValue("Order Id");
                Inputs.SetProperty("Billing Account Id", sBAId);
                Inputs.SetProperty("Order Id", sOrderId);
                Outs = VHAAppUtilities.CallBS("VHA Upgrade Utilities BS", "GetListOfCardDetails", Inputs, {});
                var sCredCardInfo = parseStructure(Outs, ["SiebelMessage", "ListOfVHA Get Credit Card Details"]);
                $("#vhagfppnotinterestedbtn").parent().children("#showMsg").remove();
                if (sCredCardInfo && sCredCardInfo.GetChildCount() > 0) {
                    var creditCardDetails = sCredCardInfo.GetChild(0);
                    var propLen = creditCardDetails.GetPropertyCount();
                    if (propLen > 0) {
                        var nameOnCard = creditCardDetails.GetProperty("CardHolderName");
                        var cardType = creditCardDetails.GetProperty("CardType");
                        var brandType = creditCardDetails.GetProperty("BrandType");
                        var cardNumber = creditCardDetails.GetProperty("CreditCardTokenNumber");
                        var expiry = creditCardDetails.GetProperty("ExpiryDate");
                        var surcharge = creditCardDetails.GetProperty("Surcharge");
						var cardLast4 = creditCardDetails.GetProperty("Last4");
						var cardFirst6 = creditCardDetails.GetProperty("First6");
						var deviceData = creditCardDetails.GetProperty("DeviceData");
                        $("input.vha-ts-nameoncard").val(nameOnCard).attr("actualValue", nameOnCard);                        
						if(cardLast4!="")
							$("input.vha-ts-cardnumber").val(cardFirst6.substr(0, 4) + " **** **** " + cardLast4).attr("actualValue", cardNumber);
						else
							$("input.vha-ts-cardnumber").val(cardNumber.substr(0, 4) + " **** **** " + cardNumber.substr(-4)).attr("actualValue", cardNumber);					
						
                        $("input.vha-ts-cardexpiry").val(expiry).attr("actualValue", expiry);
                        $("input.vha-ts-cardtype").val(cardType).attr("actualValue", cardType);
                        $("input.vha-ts-cardbrand").val(brandType).attr("actualValue", brandType);
                        $("input.vha-ts-cardsurcharge").val(surcharge).attr("actualValue", surcharge);
						$("input.vha-ts-cardnumber").attr("first6", cardFirst6);
						$("input.vha-ts-cardnumber").attr("last4", cardLast4);
						//$("input.vha-ts-cardnumber").attr("devicedata", deviceData);
                        updatePrepaymentMessageDisplay();
                    }
                } else {
                    $("#vhagfppnotinterestedbtn").parent().append("<span id='showMsg'>No existing card found on account.</span>");
                }
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardHolder = $(".vha-ts-nameoncard").attr("actualvalue");
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardNumber = $(".vha-ts-cardnumber").attr("actualvalue");
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardType = $(".vha-ts-cardtype").attr("actualvalue");
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.EligibleOrderLineItem = "Y";
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.ExpiryDate = $(".vha-ts-cardexpiry").attr("actualvalue");
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.SurchargeInPercent = $(".vha-ts-cardsurcharge").attr("actualvalue");
				tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.Last4 = $(".vha-ts-cardnumber").attr("last4");
				tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.First6 = $(".vha-ts-cardnumber").attr("first6");
				tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.BrandType = $(".vha-ts-cardbrand").attr("actualvalue");
				//tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.DeviceData = $(".vha-ts-cardnumber").attr("devicedata");
            }
            function updatePrepaymentMessageDisplay() {
                var cardNumber = $(".vha-ts-cardnumber").attr("actualvalue");
                var surcharge = $(".vha-ts-cardsurcharge").attr("actualvalue");
                if (cardNumber == "" || surcharge == "" || typeof cardNumber == "undefined" || typeof surcharge == "undefined") {
                    $("#display-card-Number").html("");
                    $("#display-surcharge-value").html("");
                    $("#ppchargewithsurcharge").html("");
                } else {
                    if($(".vha-ts-cardnumber").attr("last4")!="")
						$("#display-card-Number").html("**** **** **** " + $(".vha-ts-cardnumber").attr("last4"));	
					else
						$("#display-card-Number").html("**** **** **** " + cardNumber.substr(-4));
                    var surchargeAmount = parseFloat(Number($("#gf-prepayment-amt").val()) * Number(surcharge) / 100).toFixed(2);
                    $("#display-surcharge-value").html(surchargeAmount);
                    $("#ppchargewithsurcharge").html(Number(Number($("#gf-prepayment-amt").val()) + Number(surchargeAmount)).toFixed(2));
                }
            }
            function CalcualteDeviceTotalCost(canUpdate) {
                var sDeviceamt = 0;
                var sSecDevamt = 0;
                var sAccamt = 0;
                if (tsintitialData.OrderHeader.Device.Device__RCC__Inc__GST != 0) {
                    var sDeviceamt = parseFloat(tsintitialData.OrderHeader.Device.Device__RCC__Inc__GST);
                    tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.DeviceName = tsintitialData.OrderHeader.Device.Name;
                    tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.DeviceCode = tsintitialData.OrderHeader.Device.Device__Code;
                    tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.PrepaymentAmount = 0;
                    tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.ContractAmount = sDeviceamt;
                    tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.EligibleOrderLineItem = "Y";
                } else {
                    var sDeviceamt = 0;
                    tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.EligibleOrderLineItem = "N";
                }
                if (tsintitialData.OrderHeader.SecondaryDevices.length > 0) {
                    var sSecDevs = tsintitialData.OrderHeader.SecondaryDevices;
                    var sSecDevamt = 0;
                    for (var i = 1; i < sSecDevs.length; i += 3) {
                        sSecDevamt += parseFloat(tsintitialData.OrderHeader.SecondaryDevices[i].Total__Accessories__RRP__Inc__GST);
                    }
                    tsintitialData.OrderHeader.ListOfContractInfo.secondarydevicecontractinfo = new Array;
                    var sdAccessory = sSecDevs.filter(function (a) {
                        return a.Name == "Accessory";
                    });
                    var sdAppContract = sSecDevs.filter(function (a) {
                        return a.Name == "APP Contract";
                    });
                    var mdsSPID = sSecDevs.filter(function (a) {
                        return a.Name == "Multi Device Subscription SPID";
                    });
                    for (var i = 0; i < sdAppContract.length; i++) {
                        var selectedAccessory = sdAccessory.filter(function (a) {
                            return a.VHA__SD__Group__Id == sdAppContract[i].VHA__SD__Group__Id;
                        });
                        tsintitialData.OrderHeader.ListOfContractInfo.secondarydevicecontractinfo.push({
                            ContractType: "APP Contract",
                            AssetIntegId: "",
                            ContractAmount: sSecDevamt,
                            DeviceName: selectedAccessory[0].Accessory__Name,
                            DeviceCode: selectedAccessory[0].Accessory__Code,
                            PrepaymentAmount: 0,
                            VHA__SD__Group__Id: sdAppContract[i].VHA__SD__Group__Id
                        });
                    }
                } else {
                    var sSecDevamt = 0;
                    tsintitialData.OrderHeader.ListOfContractInfo.secondarydevicecontractinfo.splice(0, tsintitialData.OrderHeader.ListOfContractInfo.secondarydevicecontractinfo.length);
                    tsintitialData.OrderHeader.ListOfContractInfo.secondarydevicecontractinfo.EligibleOrderLineItem = "N";
                }
                if (tsintitialData.OrderHeader.Accessories.length > 1) {
                    var sAccamt = parseFloat(tsintitialData.OrderHeader.Accessories[0].Total__Accessories__RRP__Inc__GST);
                    tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.PrepaymentAmount = 0;
                    tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.ContractAmount = sAccamt;
                    tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.EligibleOrderLineItem = "Y";
                } else {
                    var sAccamt = 0;
                    tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.EligibleOrderLineItem = "N";
                }
                tsintitialData.OrderHeader.Prepayment.PrepaymentOption = "";
                tsintitialData.OrderHeader.Prepayment.TotalGPPContractAmount = 0;
                tsintitialData.OrderHeader.Prepayment.TotalAPPContractAmount = 0;
                tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = 0;
                tsintitialData.OrderHeader.Prepayment.MinimumPrepaymentRequired = 0;
                tsintitialData.OrderHeader.Prepayment.TotalGPPPrepayment = 0;
                tsintitialData.OrderHeader.Prepayment.TotalAPPPrepayment = 0;
                var sTot = parseFloat(sDeviceamt + sSecDevamt + sAccamt);
                var sRemEqp = $("#vhatsremqplimit").text();
                sRemEqp = parseFloat(sRemEqp.substring(1, sRemEqp.length));
                var terminatedGppAmt = sRemEqp;
                var sExistingDeviceItems = tsintitialData.OrderHeader.gppdevicecontractdel;
                if (sExistingDeviceItems.length > 0) {
                    for (var i = 0; i < sExistingDeviceItems.length; i++) {
                        terminatedGppAmt += parseFloat(sExistingDeviceItems[i].MaxPrice);
                    }
                }
                var iUpdMaxPri = parseFloat(terminatedGppAmt).toFixed(2);
                sRemEqp = iUpdMaxPri;
                var prepaymentLimit = getPrepaymentLimit();
                if (canUpdate) {
                    if (sTot > sRemEqp) {
                        var samnt = sTot - sRemEqp;
                        samnt = Number(samnt.toFixed(2));
                        $("#showMsg").remove();
                        if (prepaymentLimit == 0) {
                            $("#gf-prepayment-amt").val(0);
                            tsintitialData.OrderHeader.Prepayment.MinimumPrepaymentRequired = 0;
                            tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = 0;
                        } else {
                            if (samnt <= prepaymentLimit) {
                                tsintitialData.OrderHeader.Prepayment.MinimumPrepaymentRequired = samnt;
                                tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = samnt;
                                $("#gf-prepayment-amt").val(samnt.toFixed(2));
                                tsintitialData.OrderHeader.Prepayment.PrepaymentOption = "Involuntary";
                                $(".vha-ts-carddetails").after("<span id='showMsg'>Please pay mandatory amount</span>");
                            } else {
                                $(".vha-ts-carddetails").after("<span id='showMsg'>Please shop items of your current equipment limit or equipment limit+$" + prepaymentLimit + " is allowed</span>");
                                $("#gf-prepayment-amt").val(samnt);
                                tsintitialData.OrderHeader.Prepayment.MinimumPrepaymentRequired = samnt;
                                tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = samnt;
                            }
                        }
                    } else {
                        tsintitialData.OrderHeader.Prepayment.MinimumPrepaymentRequired = 0;
                        tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = 0;
                        $("#gf-prepayment-amt").val(0);
                    }
                }
                return {
                    sTot: sTot,
                    sDeviceamt: sDeviceamt,
                    sAccamt: sAccamt,
                    sSecDevamt: sSecDevamt
                };
            }
            function onPrepaymentValueChange(e) {
                var enteredprep = Number($("#gf-prepayment-amt").val());
                var TotalDeviceCosts = CalcualteDeviceTotalCost(true);
                var minprep = tsintitialData.OrderHeader.Prepayment.MinimumPrepaymentRequired;
                var prepaymentLimit = getPrepaymentLimit();
                $("#showMsg").remove();
                if (TotalDeviceCosts.sTot <= 0) {
                    $(".vha-ts-carddetails").after("<span id='showMsg'>Please enter voluntary prepayment amount which is equal to or less than sum of primary device,secondary device and accessories</span>");
					$(".vha-ts-upidetails").after("<span id='showMsg'>Please enter voluntary prepayment amount which is equal to or less than sum of primary device,secondary device and accessories</span>");
                    $("#gf-prepayment-amt").val(0);
                    tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = 0;
                    mDeductPrepayment(0);
                } else {
                    if (enteredprep > prepaymentLimit) {
                        $(".vha-ts-carddetails").after("<span id='showMsg'>Please enter voluntary prepayment amount value between 0 to " + prepaymentLimit + "</span>");
						$(".vha-ts-upidetails").after("<span id='showMsg'>Please enter voluntary prepayment amount value between 0 to " + prepaymentLimit + "</span>");
                        $("#gf-prepayment-amt").val(minprep.toFixed(2));
                        tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = minprep;
                        mDeductPrepayment(minprep);
                    } else {
                        if (enteredprep > TotalDeviceCosts.sTot) {
                            $(".vha-ts-carddetails").after("<span id='showMsg'>Please enter voluntary prepayment amount which is equal to or less than sum of primary device,secondary device and accessories</span>");
							$(".vha-ts-upidetails").after("<span id='showMsg'>Please enter voluntary prepayment amount which is equal to or less than sum of primary device,secondary device and accessories</span>");
                            $("#gf-prepayment-amt").val(minprep.toFixed(2));
                            tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = minprep;
                            mDeductPrepayment(minprep);
                        } else {
                            if (enteredprep < minprep) {
                                $(".vha-ts-carddetails").after("<span id='showMsg'>Please enter voluntary prepayment amount which is equal to or less than sum of primary device,secondary device and accessories</span>");
								$(".vha-ts-upidetails").after("<span id='showMsg'>Please enter voluntary prepayment amount which is equal to or less than sum of primary device,secondary device and accessories</span>");
                                $("#gf-prepayment-amt").val(minprep.toFixed(2));
                                tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = minprep;
                                mDeductPrepayment(minprep);
                            } else {
                                $("#gf-prepayment-amt").val(enteredprep.toFixed(2));
                                tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = enteredprep;
                                mDeductPrepayment(enteredprep);
                            }
                        }
                    }
                }
                totalIndicativeCostCalc();
            }
            function mSetPrepaymentaccordion(sPPaccord) {
                var sTot = CalcualteDeviceTotalCost(true);
                mDeductPrepayment($("#gf-prepayment-amt").val());
                totalIndicativeCostCalc();
            }
            function mDeductPrepayment(sPpAmt) {
                sPpAmt = Number(sPpAmt);
                tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = sPpAmt;
                var accessoryies = tsintitialData.OrderHeader.Accessories;
                var App_Contract_Index = 0;
                for (var j = 0; j < accessoryies.length; j++) {
                    if (accessoryies[j].Name == "APP Contract") {
                        App_Contract_Index = j;
                        break;
                    }
                }
                resetPrepayment();
                if (0 >= Number(sPpAmt)) {
                    $("#gf-pp-pd-share").text("$ 0.00");
                    $("#gf-pp-sd-share").text("$ 0.00");
                    $("#gf-pp-acc-share").text("$ 0.00");
                }
                var sAppContctAmt = tsintitialData.OrderHeader.Accessories[App_Contract_Index].Total__Accessories__RRP__Inc__GST;
                var sPrepaymentOption = tsintitialData.OrderHeader.Prepayment.PrepaymentOption;
                var sNewAppContctAmt = parseFloat(0.0);
                if (Number(sPpAmt) >= Number(sAppContctAmt) && Number(sAppContctAmt) != 0) {
                    mResetAPPtonull();
                    mResetAppContracttonull();
                    $("#gf-pp-acc-share").text("$ " + parseFloat(sAppContctAmt).toFixed(2));
                    tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.PrepaymentAmount = sAppContctAmt;
                    tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.ContractAmount = 0;
                    tsintitialData.OrderHeader.Accessories[App_Contract_Index].Monthly__Repayment = 0;
                    tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.EligibleOrderLineItem = "Y";
                    tsintitialData.OrderHeader.Prepayment.TotalAPPPrepayment = parseFloat(sAppContctAmt);
                    tsintitialData.OrderHeader.Prepayment.TotalAPPContractAmount = parseFloat(tsintitialData.OrderHeader.Accessories[App_Contract_Index].Total__Accessories__RRP__Inc__GST);
                    mSetPrepaymentAmountAccessory(sPpAmt);
                    sPpAmt = sPpAmt - sAppContctAmt;
                } else {
                    if (Number(sPpAmt) > 0 && Number(sAppContctAmt) != 0) {
                        mDeductAppAmtIndividual(sPpAmt);
                        sPpAmt = 0;
                    } else {
                        $("#gf-pp-acc-share").text("$ 0.00");
                    }
                }
                if (Number(sPpAmt) > 0 && tsintitialData.OrderHeader.SecondaryDevices.length > 0) {
                    var sSecDevs = tsintitialData.OrderHeader.SecondaryDevices;
                    var sSdPrep = parseFloat("0.0");
                    var y = [];
                    var sSecDevs = tsintitialData.OrderHeader.SecondaryDevices;
                    var secContract = sSecDevs.filter(function (a) {
                        return a.Name == "APP Contract";
                    });
                    for (var k = 0; k < secContract.length; k++) {
                        if (parseFloat(sPpAmt) >= secContract[k]["Total__Accessories__RRP__Inc__GST"]) {
                            for (var i = 0; i < sSecDevs.length; i++) {
                                if (sSecDevs[i]["VHA__SD__Group__Id"] == secContract[k]["VHA__SD__Group__Id"] && sSecDevs[i]["Name"] == "APP Contract") {
                                    sSecDevs[i].Contract__Amount = parseFloat("0.0");
                                    sSecDevs[i].Prepayment__Amount = parseFloat(secContract[k]["Total__Accessories__RRP__Inc__GST"]);
                                    sPpAmt = parseFloat(sPpAmt) - parseFloat(secContract[k]["Total__Accessories__RRP__Inc__GST"]);
                                    sSdPrep = parseFloat(sSdPrep) + parseFloat(secContract[k]["Total__Accessories__RRP__Inc__GST"]);
                                    sSecDevs[i].Monthly__Repayment = 0;
                                    for (var j = 0; j < sSecDevs.length; j++) {
                                        if (sSecDevs[j]["VHA__SD__Group__Id"] == secContract[k]["VHA__SD__Group__Id"] && sSecDevs[j]["Name"] == "Accessory") {
                                            sSecDevs[j].Prepayment__Amount = parseFloat(secContract[k]["Total__Accessories__RRP__Inc__GST"]);
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                        } else {
                            for (var i = 0; i < sSecDevs.length; i++) {
                                if (sSecDevs[i]["VHA__SD__Group__Id"] == secContract[k]["VHA__SD__Group__Id"] && sSecDevs[i]["Name"] == "APP Contract") {
                                    sSecDevs[i].Contract__Amount = parseFloat(secContract[k]["Total__Accessories__RRP__Inc__GST"]) - sPpAmt;
                                    sSecDevs[i].Prepayment__Amount = sPpAmt;
                                    sSdPrep = (parseFloat(sSdPrep) + parseFloat(sSecDevs[i].Prepayment__Amount)).toFixed(2);
                                    sSecDevs[i].Monthly__Repayment = mTruncate(parseFloat(sSecDevs[i].Contract__Amount / sSecDevs[i].Term).toString());
                                    for (var j = 0; j < sSecDevs.length; j++) {
                                        if (sSecDevs[j]["VHA__SD__Group__Id"] == secContract[k]["VHA__SD__Group__Id"] && sSecDevs[j]["Name"] == "Accessory") {
                                            sSecDevs[j].Prepayment__Amount = sSecDevs[i].Prepayment__Amount;
                                            break;
                                        }
                                    }
                                    sPpAmt = 0;
                                    break;
                                }
                            }
                        }
                        if (sPpAmt == 0) {
                            break;
                        }
                    }
                    tsintitialData.OrderHeader.ListOfContractInfo.secondarydevicecontractinfo = new Array;
                    var sdAccessory = sSecDevs.filter(function (a) {
                        return a.Name == "Accessory";
                    });
                    var sdAppContract = sSecDevs.filter(function (a) {
                        return a.Name == "APP Contract";
                    });
                    var mdsSPID = sSecDevs.filter(function (a) {
                        return a.Name == "Multi Device Subscription SPID";
                    });
                    for (var i = 0; i < sdAppContract.length; i++) {
                        var selectedAccessory = sdAccessory.filter(function (a) {
                            return a.VHA__SD__Group__Id == sdAppContract[i].VHA__SD__Group__Id;
                        });
                        tsintitialData.OrderHeader.ListOfContractInfo.secondarydevicecontractinfo.push({
                            ContractType: "APP Contract",
                            AssetIntegId: "",
                            ContractAmount: sdAppContract[i].Contract__Amount,
                            DeviceName: selectedAccessory[0].Accessory__Name,
                            DeviceCode: selectedAccessory[0].Accessory__Code,
                            PrepaymentAmount: sdAppContract[i].Prepayment__Amount,
                            VHA__SD__Group__Id: sdAppContract[i].VHA__SD__Group__Id
                        });
                    }
                    $("#gf-pp-sd-share").text("$ " + parseFloat(sSdPrep).toFixed(2));
                    var sSecDevamt = 0;
                    for (var i = 1; i < sSecDevs.length; i += 3) {
                        sSecDevamt += parseFloat(tsintitialData.OrderHeader.SecondaryDevices[i].Total__Accessories__RRP__Inc__GST);
                    }
                    tsintitialData.OrderHeader.Prepayment.TotalAPPContractAmount += Number(sSecDevamt);
                    tsintitialData.OrderHeader.Prepayment.TotalAPPPrepayment += Number(sSdPrep);
                    tsintitialData.OrderHeader.Prepayment.TotalGPPContractAmount = tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST;
                } else {
                    $("#gf-pp-sd-share").text("$ 0.00");
                }
                if (Number(sPpAmt) > 0) {
                    var sPriDevAmt = tsintitialData.OrderHeader.Device.Device__RCC__Inc__GST || 0;
                    sPriDevAmt = Number(sPriDevAmt);
                    if (sPpAmt >= sPriDevAmt && tsintitialData.OrderHeader.Device.Device__RCC__Inc__GST != 0) {
                        tsintitialData.OrderHeader.GppDeviceContract.Contract__Amount = parseFloat("0.00");
                        tsintitialData.OrderHeader.GppDeviceContract.Prepayment__Amount = sPpAmt;
                        tsintitialData.OrderHeader.Prepayment.TotalGPPPrepayment = sPpAmt;
                        sPpAmt = parseFloat(sPpAmt) - parseFloat(sPriDevAmt);
                        tsintitialData.OrderHeader.GppDeviceContract.Monthly__Repayment = 0;
                        tsintitialData.OrderHeader.Prepayment.TotalGPPContractAmount = tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST;
                        tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.PrepaymentAmount = sPriDevAmt;
                        tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.EligibleOrderLineItem = "Y";
                        $("#gf-pp-pd-share").text("$ " + parseFloat(sPriDevAmt).toFixed(2));
                    } else {
                        if (sPriDevAmt > 0 && tsintitialData.OrderHeader.Device.Device__RCC__Inc__GST != 0) {
                            tsintitialData.OrderHeader.GppDeviceContract.Contract__Amount = parseFloat(sPriDevAmt) - parseFloat(sPpAmt);
                            tsintitialData.OrderHeader.Prepayment.TotalGPPContractAmount = tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST;
                            tsintitialData.OrderHeader.Prepayment.TotalGPPPrepayment = sPpAmt;
                            tsintitialData.OrderHeader.GppDeviceContract.Prepayment__Amount = sPpAmt;
                            tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.PrepaymentAmount = sPpAmt;
                            tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.ContractAmount = tsintitialData.OrderHeader.GppDeviceContract.Contract__Amount;
                            tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.DeviceName = tsintitialData.OrderHeader.Device.Name;
                            tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.DeviceCode = tsintitialData.OrderHeader.Device.Device__Code;
                            tsintitialData.OrderHeader.GppDeviceContract.Monthly__Repayment = mTruncate(parseFloat(tsintitialData.OrderHeader.GppDeviceContract.Contract__Amount / tsintitialData.OrderHeader.GppDeviceContract.Term).toString());
                            tsintitialData.OrderHeader.ListOfContractInfo.primarydevicecontractinfo.EligibleOrderLineItem = "Y";
                            $("#gf-pp-pd-share").text("$ " + parseFloat(sPpAmt).toFixed(2));
                        }
                    }
                } else {
                    $("#gf-pp-pd-share").text("$ 0.00");
                }
                updatePrepaymentMessageDisplay();
                updateCart();
            }
            function mResetAPPtonull() {
                tsintitialData.OrderHeader.Accessories[0].Prepayment__Amount = tsintitialData.OrderHeader.Accessories[0].Total__Accessories__RRP__Inc__GST;
                tsintitialData.OrderHeader.Accessories[0].Contract__Amount = parseFloat("0.0");
            }
            function mResetAppContracttonull() {
                var sAccArr = tsintitialData.OrderHeader.Accessories;
                sAccArr.forEach(function (item, index) {
                    item.Prepayment__Amount = item.Total__Accessories__RRP__Inc__GST;
                });
            }
            function mSetPrepaymentAmountAccessory(sPpAmt) {
                var sIndaccarr = tsintitialData.OrderHeader.Accessories;
                for (var i = 0; i < sIndaccarr.length; i++) {
                    if (sIndaccarr[i].Name == "Accessory") {
                        var accessVal = sIndaccarr[i].Accessory__RRP__Inc__GST;
                        if (sPpAmt == 0) {
                            sIndaccarr[i].Prepayment__Amount = 0;
                            continue;
                        }
                        if (Number(sPpAmt) > Number(accessVal)) {
                            sIndaccarr[i].Prepayment__Amount = Number(accessVal);
                            sPpAmt -= accessVal;
                            sPpAmt = sPpAmt.toFixed(2);
                        } else {
                            sIndaccarr[i].Prepayment__Amount = Number(sPpAmt);
                            sPpAmt = 0;
                        }
                    }
                }
            }
            function mDeductAppAmtIndividual(sPpAmt) {
                if (typeof sPpAmt == "string") {
                    sPpAmt = 0;
                }
                var sTotalAppDed = parseFloat("0.00");
                var sIndaccarr = tsintitialData.OrderHeader.Accessories;
                var taccamt = 0;
                var App_Contract_Index = 0;
                var sAccArr;
                for (var i = 0; i < sIndaccarr.length; i++) {
                    if (sIndaccarr[i].Name == "Accessory") {
                        continue;
                    } else {
                        if (sIndaccarr[i].Name == "APP Contract") {
                            taccamt = sIndaccarr[i].Total__Accessories__RRP__Inc__GST;
                            App_Contract_Index = i;
                            sAccArr = sIndaccarr[i];
                            if (parseFloat(sPpAmt) >= parseFloat(sAccArr.Contract__Amount)) {
                                sPpAmt = parseFloat(sPpAmt) - parseFloat(sAccArr.Contract__Amount);
                                sTotalAppDed = sPpAmt;
                                tsintitialData.OrderHeader.Accessories[App_Contract_Index].Monthly__Repayment = 0;
                                tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.PrepaymentAmount = sAccArr.Contract__Amount;
                                tsintitialData.OrderHeader.Prepayment.TotalAPPPrepayment = parseFloat(sPpAmt);
                                tsintitialData.OrderHeader.Prepayment.TotalAPPContractAmount = parseFloat(sAccArr.Total__Accessories__RRP__Inc__GST);
                                tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.EligibleOrderLineItem = "Y";
                                tsintitialData.OrderHeader.Prepayment.TotalGPPContractAmount = tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST;
                            } else {
                                sAccArr.Contract__Amount = parseFloat(sAccArr.Contract__Amount) - parseFloat(sPpAmt);
                                sTotalAppDed = parseFloat(sPpAmt);
                                sAccArr.Prepayment__Amount = parseFloat(sPpAmt);
                                tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.PrepaymentAmount = parseFloat(sPpAmt);
                                tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.ContractAmount = sAccArr.Contract__Amount;
                                tsintitialData.OrderHeader.ListOfContractInfo.accessoriescontractinfo.EligibleOrderLineItem = "Y";
                                tsintitialData.OrderHeader.Prepayment.TotalAPPContractAmount = parseFloat(sAccArr.Total__Accessories__RRP__Inc__GST);
                                tsintitialData.OrderHeader.Prepayment.TotalAPPPrepayment = parseFloat(sPpAmt);
                                tsintitialData.OrderHeader.Accessories[App_Contract_Index].Monthly__Repayment = mTruncate(parseFloat(sAccArr.Contract__Amount / tsintitialData.OrderHeader.Accessories[App_Contract_Index].Term).toString());
                                tsintitialData.OrderHeader.Prepayment.TotalGPPContractAmount = tsintitialData.OrderHeader.Upgrade.Total__RCC__Inc__GST;
                            }
                        }
                    }
                }
                mSetPrepaymentAmountAccessory(sPpAmt);
                $("#gf-pp-acc-share").text("$ " + parseFloat(sTotalAppDed).toFixed(2));
                if (sPpAmt < taccamt) {
                    $("#gf-pp-sd-share").text("$ " + "0.00");
                    $("#gf-pp-pd-share").text("$ " + "0.00");
                }
            }
            function sharingList(sLovType, sSelector) {
                var shareName = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='" + sLovType + "' AND [List Of Values.Active]='Y'");
                var shareList = "";
                shareName.forEach(function (item, index) {
                    shareList += "<option>" + item + "</option>";
                });
                $("#sharinggrouplist").append(shareList);
            }
            function mSharingDetails() {
                var iLen = tsintitialData.OrderHeader.Sharing.ExistingMSISDN.length;
                for (var k = 0; k < iLen; k++) {
                    tsintitialData.OrderHeader.Sharing.ExistingMSISDN.splice(k, 1);
                    k--;
                    iLen--;
                }
                var Inputs = SiebelApp.S_App.NewPropertySet();
                var sDetlsBC = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header");
                var billProf = sDetlsBC.GetFieldValue("Billing Account Id");
                var msisdn = sDetlsBC.GetFieldValue("MSISDN");
                Inputs.SetProperty("BillAccntId", billProf);
                Inputs.SetProperty("OrderMSISDN", msisdn);
                var Outputs = VHAAppUtilities.CallBS("VHA Upgrade Utilities BS", "GetMSISDNDetailsFromBA", Inputs);
                var MSISDN = Outputs.GetProperty("OrderMSISDN");
                var grpId = Outputs.GetProperty("OrderMSISDNSharGrpId");
                GroupId = Outputs.GetProperty("OrderMSISDNSharGrpId");
                var omp = Outputs.GetProperty("OrderMSISDNCompatibility");
                var grpName = Outputs.GetProperty("OrderMSISDNSharGrpName");
                var updomp = "",
                updsharingindicator = "";
                if (omp == "") {
                    updomp = "-";
                } else {
                    updomp = omp;
                }
                if (sharingindicator == "") {
                    updsharingindicator = "-";
                } else {
                    updsharingindicator = sharingindicator;
                }
                var array = Outputs.childArray[0].GetChildByType("SiebelMessage").GetChild(0).childArray;
                var extMSISDNCnt = 0;
                var shareHTML = "";
                if (tsintitialData.OrderHeader.UpgradeOfferType != "Upgrade to New plan") {
                    sharingindicator = omp;
                    if (sharingindicator == "") {
                        updsharingindicator = "-";
                    } else {
                        updsharingindicator = sharingindicator;
                    }
                    tsintitialData.OrderHeader.Sharing.NewStatus.SharingCompatability = omp;
                } else {
                    tsintitialData.OrderHeader.Sharing.NewStatus.SharingCompatability = sharingindicator;
                }
                tsintitialData.OrderHeader.Sharing.CurrentStatus.MSISDN = MSISDN;
                tsintitialData.OrderHeader.Sharing.NewStatus.MSISDN = MSISDN;
                tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingCompatability = omp;
                shareHTML += '<div class="shareGrp"><div class="vha-ts-sharingdetails"><div>MSISDN</div><div>Sharing</div><div>Sharing Status</div><div>Sharing Compatibility</div></div></div><div class="shareData"><div class="vha_sharing_populateddetails"><div class="vha_sharing_Msisdn">' + MSISDN + '</div><div  class="sharingcheckboxbs"><input type="checkbox"></div><div class="sharingstatusbs"></div><div>' + updomp + "</div></div></div>";
                shareHTML += '<div class="shareGrp"><div class="vha-ts-sharingdetails"><div>MSISDN</div><div>Sharing</div><div>Sharing Status</div><div>Sharing Compatibility</div><div>Group Name</div></div></div><div class="shareData"><div class="vha_sharing_populateddetails"><div class="vha_sharing_Msisdn">' + MSISDN + '</div><div class="sharingcheckbox"><input type="checkbox"></div><div class="sharingstatus"></div><div>' + updsharingindicator + '</div><select id="sharinggrouplist"></select></div></div>';
                shareHTML += '<div class="ExistingGroup"><br><div id="showMsgSharing"></div><br><div class="ExsMSISDN ">Existing MSISDN Details</div><div class="ExsHead"><div class="exsmsdn">MSISDN</div><div class="exsshrng">Select Sharing</div><div class="exsshrng">Sharing Compatibility</div><div>Group Name</div></div>';
                if (array.length > 0) {
                    for (var i = 0; i < array.length; i++) {
                        var childArray = array[i].childArray;
                        var MSISDN = array[i].GetChildByType("ListOfVHA Asset Mgmt - Asset - Header_MSISDN").childArray[0].propArray["MSISDN"];
                        var GroupName = array[i].GetProperty("Sharing Group Name");
                        var flag = array[i].GetChildByType("ListOfVHA Asset Mgmt - Asset - Header_Rate Plan").childArray[0].propArray["VF Share Flag"];
                        var ShrUPOfTyp = tsintitialData.OrderHeader.UpgradeOfferType;
                        if (flag == sharingindicator && flag != "" && sharingindicator != "" && ShrUPOfTyp == "Upgrade to New plan") {
                            extMSISDNCnt += 1;
                            shareHTML += '<div class="exsRow"><div class="exspmsdn">' + MSISDN + '</div><div class="exspchck"><input type="checkbox" msisdn=' + MSISDN + '></div><div class="exspsrc">' + flag + '</div><div class="exspgrpname">' + GroupName + "</div></div>";
                        } else {
                            if (flag == omp && flag != "" && omp != "" && ShrUPOfTyp != "Upgrade to New plan") {
                                extMSISDNCnt += 1;
                                shareHTML += '<div class="exsRow"><div class="exspmsdn">' + MSISDN + '</div><div class="exspchck"><input type="checkbox" msisdn=' + MSISDN + '></div><div class="exspsrc">' + flag + '</div><div class="exspgrpname">' + GroupName + "</div></div>";
                            }
                        }
                    }
                }
                shareHTML += "</div>";
                $("#vha-ts-sharing").html(shareHTML);
                $(".exspchck").on("click", "input", {
                    ctx: this
                }, function (e) {
                    $("#showMsgSharing").empty();
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    Inputs.SetProperty("SelectedMSISDN", $(this).attr("msisdn"));
                    var Outputs = VHAAppUtilities.CallBS("VHA Upgrade Utilities BS", "CheckOpenOrderForMSISDN", Inputs);
                    var ErrMsg = Outputs.GetProperty("ErrorMsg");
                    if (ErrMsg != "") {
                        $("#showMsgSharing").html(ErrMsg);
                        e.preventDefault();
                    } else {
                        if ($(this).is(":checked")) {
                            var sShareErrExt = "N";
                            var sharingArray = tsintitialData.OrderHeader.Sharing.ExistingMSISDN;
                            var destShareStat = tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus;
                            if (destShareStat == "Existing Member" || destShareStat == "Remove Member") {
                                $("#showMsgSharing").html("MSISDN is already in sharing group");
                                e.preventDefault();
                                sShareErrExt = "Y";
                            }
                            for (var i = 0; i < sharingArray.length; i++) {
                                if (sharingArray[i]["EligibleOrderLineItem"] == "Y") {
                                    $("#showMsgSharing").html("More than one existing MSISDN cannot be selected");
                                    e.preventDefault();
                                    sShareErrExt = "Y";
                                }
                            }
                            if (sShareErrExt == "N") {
                                var sharingCompat = $(this).parent().parent().children(".exspsrc").html();
                                var extMSIDN = {};
                                extMSIDN["MSISDN"] = $(this).attr("msisdn");
                                extMSIDN["SharingFlag"] = "Y";
                                extMSIDN["SharingCompatability"] = sharingCompat;
                                extMSIDN["GroupName"] = $(this).parent().parent().children(".exspgrpname").html();
                                extMSIDN["EligibleOrderLineItem"] = "Y";
                                tsintitialData.OrderHeader.Sharing.ExistingMSISDN.push(extMSIDN);
                            }
                        } else {
                            var iLen = tsintitialData.OrderHeader.Sharing.ExistingMSISDN.length;
                            for (var k = 0; k < iLen; k++) {
                                tsintitialData.OrderHeader.Sharing.ExistingMSISDN.splice(k, 1);
                                k--;
                                iLen--;
                            }
                        }
                    }
                });
                var ShrUPOfType = tsintitialData.OrderHeader.UpgradeOfferType;
                if (ShrUPOfType == "Upgrade to New plan") {
                    if (omp != sharingindicator && omp != "" && grpId != "") {
                        $(".sharingstatusbs").text("Remove Member");
                        $(".sharingcheckboxbs input:checkbox").prop("checked", false);
                        $(".sharingcheckboxbs input:checkbox").attr("disabled", true);
                        tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingFlag = "N";
                        tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingStatus = "Remove Member";
                    } else {
                        if (omp == sharingindicator && omp != "" && sharingindicator != "" && grpId != "") {
                            $(".sharingstatusbs").text("Existing Member");
                            $(".sharingcheckboxbs input:checkbox").prop("checked", true);
                            $(".sharingcheckboxbs input:checkbox").attr("disabled", true);
                            tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingFlag = "Y";
                            tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingStatus = "Existing Member";
                        } else {
                            $(".sharingstatusbs").text("-");
                            $(".sharingcheckboxbs input:checkbox").prop("checked", false);
                            $(".sharingcheckboxbs input:checkbox").attr("disabled", true);
                            tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingFlag = "N";
                            tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingStatus = "";
                        }
                    }
                } else {
                    if (grpId != "") {
                        $(".sharingstatusbs").text("Existing Member");
                        $(".sharingcheckboxbs input:checkbox").prop("checked", true);
                        $(".sharingcheckboxbs input:checkbox").attr("disabled", true);
                        tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingFlag = "Y";
                        tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingStatus = "Existing Member";
                    } else {
                        $(".sharingstatusbs").text("-");
                        $(".sharingcheckboxbs input:checkbox").prop("checked", false);
                        $(".sharingcheckboxbs input:checkbox").attr("disabled", true);
                        tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingFlag = "N";
                        tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingStatus = "";
                    }
                }
                var curStat = tsintitialData.OrderHeader.Sharing.CurrentStatus.SharingStatus;
                if (curStat == "Remove Member") {
                    if (sharingindicator != "") {
                        if (extMSISDNCnt > 0) {
                            $(".sharingcheckbox input:checkbox").prop("checked", true);
                            $(".sharingstatus").text("Add Member");
                            tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "Y";
                            tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "Add Member";
                        } else {
                            $(".sharingstatus").text("Remove Member");
                            tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "N";
                            tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "Remove Member";
                        }
                    } else {
                        $(".sharingcheckbox input:checkbox").prop("checked", false);
                        $(".sharingcheckbox input:checkbox").attr("disabled", true);
                        $(".sharingstatus").text("Remove Member");
                        $("#sharinggrouplist").append("<option>" + grpName + "</option>");
                        $("#sharinggrouplist").val(grpName);
                        $("#sharinggrouplist").attr("disabled", true);
                        tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "N";
                        tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "Remove Member";
                    }
                } else {
                    if (curStat == "Existing Member") {
                        $(".sharingcheckbox input:checkbox").prop("checked", true);
                        $(".sharingstatus").text("Existing Member");
                        $("#sharinggrouplist").append("<option>" + grpName + "</option>");
                        $("#sharinggrouplist").val(grpName);
                        $("#sharinggrouplist").attr("disabled", true);
                        tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "Y";
                        tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "Existing Member";
                    } else {
                        if (sharingindicator != "" && ShrUPOfType == "Upgrade to New plan") {
                            if (extMSISDNCnt > 0) {
                                $(".sharingcheckbox input:checkbox").prop("checked", true);
                                $(".sharingstatus").text("Add Member");
                                tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "Y";
                                tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "Add Member";
                            } else {
                                $(".sharingstatus").text("-");
                                tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "N";
                                tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "";
                            }
                        } else {
                            if (omp != "" && ShrUPOfType != "Upgrade to New plan") {
                                if (extMSISDNCnt > 0) {
                                    $(".sharingcheckbox input:checkbox").prop("checked", true);
                                    $(".sharingstatus").text("Add Member");
                                    tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "Y";
                                    tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "Add Member";
                                } else {
                                    $(".sharingstatus").text("-");
                                    tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "N";
                                    tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "";
                                }
                            } else {
                                $(".sharingcheckbox input:checkbox").prop("checked", false);
                                $(".sharingcheckbox input:checkbox").attr("disabled", true);
                                $(".sharingstatus").text("-");
                                $("#sharinggrouplist").attr("disabled", true);
                                tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "N";
                                tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "";
                            }
                        }
                    }
                }
                $(".sharingcheckbox").on("click", "input", {
                    ctx: this
                }, function (e) {
                    if ($(this).is(":checked")) {
                        if ($(".sharingstatus").text() == "Remove Member") {
                            var sCheck = $(".sharingstatusbs").text();
                            if (sCheck == "Existing Member") {
                                $(".sharingstatus").text("Existing Member");
                                tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "Existing Member";
                                $("#sharinggrouplist").attr("disabled", true);
                            } else {
                                $(".sharingstatus").text("Add Member");
                                tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "Add Member";
                                $("#sharinggrouplist").attr("disabled", false);
                            }
                            tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "Y";
                        } else {
                            $(".sharingstatus").text("Add Member");
                            tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "Y";
                            tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "Add Member";
                            $("#sharinggrouplist").attr("disabled", false);
                        }
                    } else {
                        if ($(".sharingstatus").text() == "Existing Member") {
                            $(".sharingstatus").text("Remove Member");
                            tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "N";
                            tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "Remove Member";
                            $("#sharinggrouplist").attr("disabled", true);
                        } else {
                            var sUnCheck = $(".sharingstatusbs").text();
                            $(".sharingstatus").text(sUnCheck);
                            if (sUnCheck == "-") {
                                tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = "";
                            } else {
                                tsintitialData.OrderHeader.Sharing.NewStatus.SharingStatus = sUnCheck;
                            }
                            tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag = "N";
                            $("#sharinggrouplist").attr("disabled", true);
                        }
                    }
                });
                var sharingdropdown = sharingList("VHA_SHARING_GROUP_NAME", "#sharinggrouplist");
                tsintitialData.OrderHeader.Sharing.NewStatus.GroupName = $("#sharinggrouplist").val();
                $("#sharinggrouplist").on("change", function (e) {
                    tsintitialData.OrderHeader.Sharing.NewStatus.GroupName = $(this).val();
                });
                resumeSharing = "Added";
            }
            function mSetOrderHeader(sSiebelMessage) {
                var sJsonObj = tsintitialData.OrderHeader;
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("ETC", sJsonObj.ETC);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("OrderNum", sJsonObj.OrderNum);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("OrderSubType", sJsonObj.OrderSubType);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("PropositionId", sJsonObj.PropositionId);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("PropositionName", sJsonObj.PropositionName);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("HeaderId", sJsonObj.HeaderId);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("VFDealerRowId", sJsonObj.VFDealerRowId);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("VFSalesChannelDescription", sJsonObj.VFSalesChannelDescription);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("VFSalesBranchDescription", sJsonObj.VFSalesBranchDescription);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("UpgradeOfferType", sJsonObj.UpgradeOfferType);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("RoamingProduct", sJsonObj.RoamingProduct);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("Shared", sJsonObj.Sharing.NewStatus.SharingFlag);
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("PromoCode", $(".vha-ts-promoCode").val());
                if ($("#ts-override-reason").val() != "" && $("#ts-override-reason").val() != null) {
                    sSiebelMessage.GetChild(0).GetChild(0).SetProperty("TenureOverride", sJsonObj.TenureOverride);
                    sSiebelMessage.GetChild(0).GetChild(0).SetProperty("LatestDeviceTermOverride", sJsonObj.LatestDeviceTermOverride);
                    sSiebelMessage.GetChild(0).GetChild(0).SetProperty("OverrideDesc", sJsonObj.OverrideDesc);
                }
                var iLen = tsintitialData.OrderHeader.gppdevicecontractdel.length;
                var sGPPCharge = 0.00;
                for (var k = 0; k < iLen; k++) {
                    sGPPCharge = parseFloat(sGPPCharge) + parseFloat(tsintitialData.OrderHeader.gppdevicecontractdel[k].MaxPrice);
                }
                sJsonObj.GPPCharge = sGPPCharge;
                sSiebelMessage.GetChild(0).GetChild(0).SetProperty("GPPCharge", sJsonObj.GPPCharge);
                sSiebelMessage.GetChild(0).GetChild(0).AddChild();
                return sSiebelMessage;
            }
            function mSetPrepaymentinfo(sSiebelMessage) {
                var sJsonObj = tsintitialData.OrderHeader.Prepayment;
                var prepinfo = sSiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfPrepaymentInfo").GetChildByType("PrepaymentInfo");
                var prepcard = sSiebelMessage.GetChild(0).GetChild(0).GetChildByType("ListOfPrepaymentInfo").GetChildByType("PrepaymentInfo").GetChildByType("ListOfPrepaymentCardDetails").GetChildByType("PrepaymentCardDetails");
                prepinfo.SetProperty("TotalGPPContractAmount", sJsonObj.TotalGPPContractAmount);
                prepinfo.SetProperty("TotalAPPContractAmount", sJsonObj.TotalAPPContractAmount);
                prepinfo.SetProperty("TotalPrepaymentAmount", sJsonObj.TotalPrepaymentAmount);
                prepinfo.SetProperty("MinimumPrepaymentRequired", sJsonObj.MinimumPrepaymentRequired);
                prepinfo.SetProperty("TotalGPPPrepayment", sJsonObj.TotalGPPPrepayment);
                prepinfo.SetProperty("TotalAPPPrepayment", sJsonObj.TotalAPPPrepayment);
                prepinfo.SetProperty("PrepaymentOption", sJsonObj.PrepaymentOption);
                prepcard.SetProperty("SelectedCard", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.SelectedCard);
                prepcard.SetProperty("CardNumber", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardNumber);
                prepcard.SetProperty("CardHolder", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardHolder);
                prepcard.SetProperty("ExpiryDate", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.ExpiryDate);
                prepcard.SetProperty("CardType", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardType);
                prepcard.SetProperty("BrandType", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.BrandType);
                prepcard.SetProperty("SurchargeInPercent", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.SurchargeInPercent);
                prepcard.SetProperty("PaymentStatus", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.PaymentStatus);
                prepcard.SetProperty("WaiveSurcharge", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.WaiveSurcharge);
				prepcard.SetProperty("Last4", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.Last4);
				prepcard.SetProperty("First6", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.First6);
				prepcard.SetProperty("DeviceData", sJsonObj.PrepaymentCardDetailsAll.PrepaymentCardDetails.DeviceData);
                prepinfo.AddChild();
                prepcard.AddChild();
                return sSiebelMessage;
            }
            function mCreateOrderLineItems(sSiebelMessage, sItemStructure) {
                var sChildObj = Object.keys(tsintitialData.OrderHeader);
                sSiebelMessage.GetChild(0).GetChild(0).GetChild(0).RemoveChild(0);
                var schildprep = sSiebelMessage.GetChild(0).GetChild(0).GetChild(1);
                for (var i = 0; i < sChildObj.length; i++) {
                    var sObjName = sChildObj[i];
                    if ((sChildObj[i] == "Device" || sChildObj[i] == "Upgrade" || sChildObj[i] == "GppDeviceContract" || sChildObj[i] == "DataAddOns" || sChildObj[i] == "IddAddOns" || sChildObj[i] == "AddSIM" || sChildObj[i] == "RecurringDiscount_SAM1569" || sChildObj[i] == "RecurringDiscount_AUX0207" || sChildObj[i] == "RecurringDiscount_AUX1414" || sChildObj[i] == "RecurringDiscount_AUV0450" || sChildObj[i] == "RecurringDiscount_AUV0451" || sChildObj[i] == "RecurringDiscount_AUV0452" || sChildObj[i] == "RecurringDiscount_AUV0535" || sChildObj[i] == "EefMonthRollover" || sChildObj[i] == "RedPlusPlan" && tsintitialData.OrderHeader[sObjName].Name !== "") && tsintitialData.OrderHeader[sChildObj[i]].EligibleOrderLineItem == "Y") {
                        var sChildObjProp = Object.keys(tsintitialData.OrderHeader[sObjName]);
                        if (sChildObjProp.length > 1) {
                            mCreateOrderLineItem(sSiebelMessage, sObjName, sChildObjProp, tsintitialData.OrderHeader[sObjName]);
                        }
                    }
                    if (sChildObj[i] == "SecondaryDevices" || sChildObj[i] == "Accessories" || sChildObj[i] == "PhoneInsurance" || sChildObj[i] == "gppdevicecontractdel") {
                        for (var k = 0; k < tsintitialData.OrderHeader[sObjName].length; k++) {
                            var sChildObjProp = Object.keys(tsintitialData.OrderHeader[sObjName][k]);
                            if (tsintitialData.OrderHeader[sObjName][k].Number__of__Accessories == undefined && tsintitialData.OrderHeader[sObjName][k].EligibleOrderLineItem == "Y") {
                                mCreateOrderLineItem(sSiebelMessage, sObjName, sChildObjProp, tsintitialData.OrderHeader[sObjName][k]);
                            } else {
                                if (tsintitialData.OrderHeader[sObjName][k].Number__of__Accessories > 0 && tsintitialData.OrderHeader[sObjName][k].EligibleOrderLineItem == "Y") {
                                    mCreateOrderLineItem(sSiebelMessage, sObjName, sChildObjProp, tsintitialData.OrderHeader[sObjName][k]);
                                }
                            }
                        }
                    }
                    if (sChildObj[i] == "ListOfContractInfo") {
                        sSiebelMessage.GetChild(0).GetChild(0).GetChild(1).GetChild(0).GetChild(1).RemoveChild(0);
                        var sPrpmntChildObj = Object.keys(tsintitialData.OrderHeader.ListOfContractInfo);
                        for (var k = 0; k < sPrpmntChildObj.length; k++) {
                            var sprepchild = sPrpmntChildObj[k];
                            if (sPrpmntChildObj[k] == "primarydevicecontractinfo" || sPrpmntChildObj[k] == "accessoriescontractinfo") {
                                var sChildObjProp = Object.keys(tsintitialData.OrderHeader.ListOfContractInfo[sprepchild]);
                                if (sChildObjProp.length > 1 && tsintitialData.OrderHeader.ListOfContractInfo[sprepchild].EligibleOrderLineItem == "Y") {
                                    mCreateContractInfoLineItem(sSiebelMessage, "ListOfContractInfo", sChildObjProp, tsintitialData.OrderHeader.ListOfContractInfo[sprepchild]);
                                }
                            } else {
                                var sprepsecdev = tsintitialData.OrderHeader.ListOfContractInfo[sprepchild];
                                for (var l = 0; l < sprepsecdev.length; l++) {
                                    var sChildObjProp = Object.keys(sprepsecdev[l]);
                                    var conAmount = tsintitialData.OrderHeader.ListOfContractInfo[sprepchild][l].ContractAmount;
                                    var prepaymentAmount = tsintitialData.OrderHeader.ListOfContractInfo[sprepchild][l].PrepaymentAmount;
                                    if (conAmount == 0 && prepaymentAmount == 0) {
                                        continue;
                                    }
                                    mCreateContractInfoLineItem(sSiebelMessage, "ListOfContractInfo", sChildObjProp, tsintitialData.OrderHeader.ListOfContractInfo[sprepchild][l]);
                                }
                            }
                        }
                    }
                }
                return sSiebelMessage;
            }
            function mCreateContractInfoLineItem(sSiebelMessage, sObjName, sChildObjProp, tsintitialDataObj) {
                var sOrderItemFields = ["Action", "GroupId", "Name", "StockIndicator", "Type", "Prod Integration Id", "VHA SD Group Id", "GPI", "SAMId", "MaxPrice", "ProductId", "ServicePrice"];
                var sChildObjPropLen = sChildObjProp.length;
                var sItStutTemp = SiebelApp.S_App.NewPropertySet();
                sItStutTemp.type = "ContractInfo";
                for (var j = 0; j < sChildObjPropLen; j++) {
                    var sObjName1 = sChildObjProp[j].replace(/___/g, "/");
                    sObjName1 = sObjName1.replace(/__/g, " ");
                    sItStutTemp.SetProperty(sObjName1, tsintitialDataObj[sChildObjProp[j]]);
                }
                sSiebelMessage.GetChild(0).GetChild(0).GetChild(1).GetChild(0).GetChild(1).AddChild(sItStutTemp);
            }
            function mCreateOrderLineItem(sSiebelMessage, sObjName, sChildObjProp, tsintitialDataObj) {
                var sOrderItemFields = ["Action", "GroupId", "Name", "StockIndicator", "Type", "Prod Integration Id", "VHA SD Group Id", "GPI", "SAMId", "MaxPrice", "ProductId", "ServicePrice", "EEFPeriod", "PlanPrice", "UI__Reason__Code", "AddOnType", "vendor"];
                var sChildObjPropLen = sChildObjProp.length;
                var sItStutTemp = SiebelApp.S_App.NewPropertySet();
                sItStutTemp.type = "OrderItem";
                var sLstOfAttr = SiebelApp.S_App.NewPropertySet();
                sLstOfAttr.type = "ListOfAttr";
                sItStutTemp.AddChild(sLstOfAttr);
                for (var j = 0; j < sChildObjPropLen; j++) {
                    var sObjName1 = sChildObjProp[j].replace(/___/g, "/");
                    sObjName1 = sObjName1.replace(/__/g, " ");
                    if (sOrderItemFields.includes(sObjName1)) {
                        sItStutTemp.SetProperty(sObjName1, tsintitialDataObj[sChildObjProp[j]]);
                    } else {
                        if (sChildObjProp[j] !== "EligibleOrderLineItem") {
                            var sAttr = SiebelApp.S_App.NewPropertySet();
                            sAttr.type = "Attr";
                            sAttr.SetProperty("Name", sObjName1);
                            sAttr.SetProperty("Value", tsintitialDataObj[sChildObjProp[j]]);
                            sItStutTemp.GetChild(0).AddChild(sAttr);
                        }
                    }
                }
                sSiebelMessage.GetChild(0).GetChild(0).GetChild(0).AddChild(sItStutTemp);
            }
            var dropDownTrigger = function (e) {
                $($(this).attr("parId")).autocomplete("search", "");
            };
            function mgetAddonsList(setRoaming) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": apilovurl + "VHARestAPIWF/RunProcess",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "5c1f0ef1-1226-5653-dba8-72a6c0e242c9"
                    },
                    "processData": false,
                    "data": '{\r\n   "body":{\r\n      "ProcessName":"VHA Get Proposition Product Details Workflow - 3 Step Upgrade",\r\n      "UpgradePropSAMId":"' + tsintitialData.OrderHeader.PropositionId + '",\r\n      "UpgradeOfferType":"' + tsintitialData.OrderHeader.UpgradeOfferType + '",\r\n      "Object Id":"' + sSessionId + '"\r\n }\r\n}'
                };
                $.ajax(settings).done(function (response) {
                    if (response["Error Code"] == "" && typeof response.SiebMsg.Proposition !== "undefined") {
                        var addOnList = response.SiebMsg.Proposition.Addons;
                        var restDiscList = response.SiebMsg.Proposition.RecurringDiscount;
                        var roamList = response.SiebMsg.Proposition.Roaming;
                        var verifyempty = response.SiebMsg.Proposition.EarlyUpgradeFeeRollOver;
                        if (verifyempty == undefined) {
                            $(".vha_ts_earlyupfeeclr").removeClass("vha_ts_earlyupfeeclr");
                            $(".vha_ts_earlyupfee").attr("disabled", "disabled");
                            tsintitialData.OrderHeader.EefMonthRollover.EligibleOrderLineItem = "N";
                        } else {
                            var rollover = response.SiebMsg.Proposition.EarlyUpgradeFeeRollOver.length;
                            var a = "$ 0.00";
                            if (rollover == 0) {
                                $(".vha_ts_earlyupfeeclr").removeClass("vha_ts_earlyupfeeclr");
                                $(".vha_ts_earlyupfee").attr("disabled", "disabled");
                                tsintitialData.OrderHeader.EefMonthRollover.EligibleOrderLineItem = "N";
                            } else {
                                if (rollover > 0 && parseFloat($("#vha-ts-cart-e-upg-fee").text().split(" ")[1]) > parseFloat(a.split(" ")[1])) {
                                    $(".vha_ts_earlyupfee").attr("disabled", false);
                                } else {
                                    if (rollover > 0 && parseFloat($("#vha-ts-cart-e-upg-fee").text().split(" ")[1]) <= parseFloat(a.split(" ")[1])) {
                                        $(".vha_ts_earlyupfeeclr").removeClass("vha_ts_earlyupfeeclr");
                                        $(".vha_ts_earlyupfee").attr("disabled", "disabled");
                                        tsintitialData.OrderHeader.EefMonthRollover.EligibleOrderLineItem = "N";
                                    }
                                }
                            }
                        }
                        var idd = new Array;
                        var data = new Array;
                        var restDisc = new Array;
                        if (addOnList != undefined) {
                            var length = addOnList.length;
                            for (var i = 0; i < length; i++) {
                                var currProp = addOnList[i];
                                var Object = {
                                    chargeType: currProp["Charge Type"],
                                    name: currProp["Name"],
                                    dollar: currProp["Dollar"],
                                    GbProdId: currProp["Global Prod Id"],
                                    ProdId: currProp["Prod Id"],
                                    SamId: currProp["SAM Id"]
                                };
                                if (currProp["Addon Type"] == "IDD") {
                                    idd.push(Object);
                                } else {
                                    if (currProp["Addon Type"] == "Data") {
                                        data.push(Object);
                                    }
                                }
                            }
                        }
                        if (restDiscList != undefined) {
                            var restDiscLength = restDiscList.length;
                            for (var i = 0; i < restDiscLength; i++) {
                                var currProp = restDiscList[i];
                                var Object = {
                                    name: currProp["Name"],
                                    GbProdId: currProp["Global Prod Id"],
                                    ProdId: currProp["Prod Id"],
                                    SamId: currProp["SAM Id"]
                                };
                                if (currProp["Global Prod Id"] == "Recurring Discount") {
                                    restDisc.push(Object);
                                }
                            }
                        }
                        var dataRecurring = data.filter(function (temp) {
                            return temp.chargeType == "Recurring";
                        });
                        var dataOneOff = data.filter(function (temp) {
                            return temp.chargeType == "One-off Charge";
                        });
                        var iddRecurring = idd.filter(function (temp) {
                            return temp.chargeType == "Recurring";
                        });
                        var iddOneOff = idd.filter(function (temp) {
                            return temp.chargeType == "One-off Charge";
                        });
                        addOnData = {
                            dataRecurring: dataRecurring,
                            dataOneOff: dataOneOff,
                            iddOneOff: iddOneOff,
                            iddRecurring: iddRecurring,
                            restDisc: restDisc
                        };
                        addOnLoaded = true;
                        if (setRoaming == "Y" && roamList != undefined) {
                            var rlen = roamList.length;
                            if (rlen > 0) {
                                var currProp = roamList[0];
                                $(".roaming-method>div").each(function (index, item) {
                                    if ($(item).attr("val") == "5Roaming") {
                                        $(item).removeClass("applet-button-passive").removeClass("applet-button-readonly").addClass("applet-button-active");
                                        intitialData.featureConfig.roaming = $(item).text();
                                    } else {
                                        $(item).removeClass("applet-button-active").removeClass("applet-button-readonly").addClass("applet-button-passive");
                                    }
                                });
                            } else {
                                $(".roaming-method>div").each(function (index, item) {
                                    if ($(item).attr("val") == "Off") {
                                        $(item).removeClass("applet-button-passive").removeClass("applet-button-readonly").addClass("applet-button-active");
                                    } else {
                                        $(item).removeClass("applet-button-active").removeClass("applet-button-passive").addClass("applet-button-readonly");
                                    }
                                });
                                intitialData.featureConfig.roaming = "";
                            }
                        }
                    }
                    if (sessionType == "Paused") {
                        var IRPSelectVal = pausedDetails.OrderHeader.RoamingProduct;
                        $(".ts-roaming-method .applet-button:contains('" + IRPSelectVal + "')").trigger("click");
                        var sAddOnEligibleOLI = pausedDetails.OrderHeader.DataAddOns.EligibleOrderLineItem;
                        if (sAddOnEligibleOLI == "Y") {
                            var sAddOnType = pausedDetails.OrderHeader.DataAddOns.AddOnType;
                            var sLabelVal = pausedDetails.OrderHeader.DataAddOns.Name;
                            var sProdId = pausedDetails.OrderHeader.DataAddOns.ProductId;
                            var sGPI = pausedDetails.OrderHeader.DataAddOns.GPI;
                            var sSamId = pausedDetails.OrderHeader.DataAddOns.SAMId;
                            var sDollar = pausedDetails.OrderHeader.DataAddOns.MaxPrice;
                            $(".ts-data-addon-method .applet-button[val='" + sAddOnType + "']").trigger("click");
                            $("#ts-feature-config-addon").data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                                item: {
                                    label: sLabelVal,
                                    value: sLabelVal,
                                    chargeType: sAddOnType,
                                    dollar: sDollar,
                                    type: "data",
                                    GbProdId: sGPI,
                                    ProdId: sProdId,
                                    SamId: sSamId
                                }
                            });
                            pausedDetails.OrderHeader.DataAddOns.EligibleOrderLineItem = "";
                        }
                        var sIddEligibleOLI = pausedDetails.OrderHeader.IddAddOns.EligibleOrderLineItem;
                        if (sIddEligibleOLI == "Y") {
                            var sIddAddOnType = pausedDetails.OrderHeader.IddAddOns.AddOnType;
                            var sIddAddOnVal = pausedDetails.OrderHeader.IddAddOns.Name;
                            var sIddProdId = pausedDetails.OrderHeader.IddAddOns.ProductId;
                            var sIddGPI = pausedDetails.OrderHeader.IddAddOns.GPI;
                            var sIddSamId = pausedDetails.OrderHeader.IddAddOns.SAMId;
			    var sIddPeriod = pausedDetails.OrderHeader.IddAddOns.Period;//vasavi added for pke
                            var sIddDollar = pausedDetails.OrderHeader.IddAddOns.MaxPrice;
                            $(".ts-international-call-method .applet-button[val='" + sIddAddOnType + "']").trigger("click");
                            $("#ts-feature-config-idd").data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                                item: {
                                    label: sIddAddOnVal,
                                    value: sIddAddOnVal,
                                    chargeType: sIddAddOnType,
                                    dollar: sIddDollar,
                                    type: "idd",
                                    GbProdId: sIddGPI,
                                    ProdId: sIddProdId,
                                    SamId: sIddSamId
                                }
                            });
			    //Vasavi added for PKE
                            $("#ts-feature-config-termidd").data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                                item: {
                                    label: sIddPeriod,
                                    value: sIddPeriod
                                }
                            });
                            pausedDetails.OrderHeader.IddAddOns.EligibleOrderLineItem = "";
                        }
                        var sRestDiscType = pausedDetails.OrderHeader.RestrictedDiscountType.RestDiscType;
                        $(".ts-discounts-method .applet-button[val='" + sRestDiscType + "']").trigger("click");
                        if (sRestDiscType == "Recurring") {
                            var SetRecurrDisc = function (SAMId, sAmount, sPeriod, sReasonCode) {
                                for (var i = 0; i < $(".ts-product-selection").children(".ts-restricted-discount-line").length; i++) {
                                    var sSamId = $(".ts-product-selection").children(".ts-restricted-discount-line").eq(i).children().eq(0).children().attr("samid");
                                    if (SAMId == sSamId) {
                                        $(".ts-product-selection").children(".ts-restricted-discount-line").eq(i).children().eq(0).children().eq(0).trigger("click");
                                        $(".ts-product-selection").children(".ts-restricted-discount-line").eq(i).children().eq(1).children().val(sAmount);
                                        $(".ts-product-selection").children(".ts-restricted-discount-line").eq(i).children().eq(2).children().eq(0).data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                                            item: {
                                                label: sPeriod,
                                                value: sPeriod,
                                                type: "RecurringProducts"
                                            }
                                        });
                                        $(".ts-product-selection").children(".ts-restricted-discount-line").eq(i).children().eq(3).children().eq(0).data("ui-autocomplete")._trigger("select", "autocompleteselect", {
                                            item: {
                                                label: sReasonCode,
                                                value: sReasonCode,
                                                type: "RecurringProducts"
                                            }
                                        });
                                    }
                                }
                            };
                            var sSAM1569OLI = pausedDetails.OrderHeader.RecurringDiscount_SAM1569.EligibleOrderLineItem;
                            var sAUX0207OLI = pausedDetails.OrderHeader.RecurringDiscount_AUX0207.EligibleOrderLineItem;
                            var sAUX1414OLI = pausedDetails.OrderHeader.RecurringDiscount_AUX1414.EligibleOrderLineItem;
                            var sAUV0450OLI = pausedDetails.OrderHeader.RecurringDiscount_AUV0450.EligibleOrderLineItem;
                            var sAUV0451OLI = pausedDetails.OrderHeader.RecurringDiscount_AUV0451.EligibleOrderLineItem;
                            var sAUV0452OLI = pausedDetails.OrderHeader.RecurringDiscount_AUV0452.EligibleOrderLineItem;
							var sAUV0535OLI = pausedDetails.OrderHeader.RecurringDiscount_AUV0535.EligibleOrderLineItem;
                            if (sSAM1569OLI == "Y") {
                                var sSAM1569Amount = pausedDetails.OrderHeader.RecurringDiscount_SAM1569.Amount;
                                var sSAM1569Period = pausedDetails.OrderHeader.RecurringDiscount_SAM1569.Period;
                                var sSAM1569ReasonCode = pausedDetails.OrderHeader.RecurringDiscount_SAM1569.Reason__Code;
                                var sSAM1569SAMId = pausedDetails.OrderHeader.RecurringDiscount_SAM1569.SAMId;
                                SetRecurrDisc(sSAM1569SAMId, sSAM1569Amount, sSAM1569Period, sSAM1569ReasonCode);
                            }
                            if (sAUV0450OLI == "Y") {
                                var sAUV0450Amount = pausedDetails.OrderHeader.RecurringDiscount_AUV0450.Amount;
                                var sAUV0450Period = pausedDetails.OrderHeader.RecurringDiscount_AUV0450.Period;
                                var sAUV0450ReasonCode = pausedDetails.OrderHeader.RecurringDiscount_AUV0450.Reason__Code;
                                var sAUV0450SAMId = pausedDetails.OrderHeader.RecurringDiscount_AUV0450.SAMId;
                                SetRecurrDisc(sAUV0450SAMId, sAUV0450Amount, sAUV0450Period, sAUV0450ReasonCode);
                            }
                            if (sAUV0451OLI == "Y") {
                                var sAUV0451Amount = pausedDetails.OrderHeader.RecurringDiscount_AUV0451.Amount;
                                var sAUV0451Period = pausedDetails.OrderHeader.RecurringDiscount_AUV0451.Period;
                                var sAUV0451ReasonCode = pausedDetails.OrderHeader.RecurringDiscount_AUV0451.Reason__Code;
                                var sAUV0451SAMId = pausedDetails.OrderHeader.RecurringDiscount_AUV0451.SAMId;
                                SetRecurrDisc(sAUV0451SAMId, sAUV0451Amount, sAUV0451Period, sAUV0451ReasonCode);
                            }
                            if (sAUV0452OLI == "Y") {
                                var sAUV0452Amount = pausedDetails.OrderHeader.RecurringDiscount_AUV0452.Amount;
                                var sAUV0452Period = pausedDetails.OrderHeader.RecurringDiscount_AUV0452.Period;
                                var sAUV0452ReasonCode = pausedDetails.OrderHeader.RecurringDiscount_AUV0452.Reason__Code;
                                var sAUV0452SAMId = pausedDetails.OrderHeader.RecurringDiscount_AUV0452.SAMId;
                                SetRecurrDisc(sAUV0452SAMId, sAUV0452Amount, sAUV0452Period, sAUV0452ReasonCode);
                            }
							if (sAUV0535OLI == "Y") {
                                var sAUV0535Amount = pausedDetails.OrderHeader.RecurringDiscount_AUV0535.Amount;
                                var sAUV0535Period = pausedDetails.OrderHeader.RecurringDiscount_AUV0535.Period;
                                var sAUV0535ReasonCode = pausedDetails.OrderHeader.RecurringDiscount_AUV0535.Reason__Code;
                                var sAUV0535SAMId = pausedDetails.OrderHeader.RecurringDiscount_AUV0535.SAMId;
                                SetRecurrDisc(sAUV0535SAMId, sAUV0535Amount, sAUV0535Period, sAUV0535ReasonCode);
                            }
                            if (sAUX0207OLI == "Y") {
                                var sAUX0207Period = pausedDetails.OrderHeader.RecurringDiscount_AUX0207.Period;
                                var sAUX0207ReasonCode = pausedDetails.OrderHeader.RecurringDiscount_AUX0207.UI__Reason__Code;
                                var sAUX0207SAMId = pausedDetails.OrderHeader.RecurringDiscount_AUX0207.SAMId;
                                var sAUX0207Amount = "";
                                SetRecurrDisc(sAUX0207SAMId, sAUX0207Amount, sAUX0207Period, sAUX0207ReasonCode);
                            }
                            if (sAUX1414OLI == "Y") {
                                var sAUX1414Period = pausedDetails.OrderHeader.RecurringDiscount_AUX1414.Period;
                                var sAUX1414ReasonCode = pausedDetails.OrderHeader.RecurringDiscount_AUX1414.UI__Reason__Code;
                                var sAUX1414SAMId = pausedDetails.OrderHeader.RecurringDiscount_AUX1414.SAMId;
                                var sAUX1414Amount = "";
                                SetRecurrDisc(sAUX1414SAMId, sAUX1414Amount, sAUX1414Period, sAUX1414ReasonCode);
                            }
                            pausedDetails.OrderHeader.RestrictedDiscountType.RestDiscType = "";
                        }
                        resumeConfigureService = "Added";
                    }
                });
                $.ajax(settings).fail(function (xhr, status, error) {
                    alert("Addons retrieval failed, kindly raise a Siebel Support ticket if you continue to receive this error.");
                });
            }
            var setupRestrictedDiscount = function () {
                var productList = new Array;
                $.ajax({
                    dataType: "json",
                    url: "scripts/siebel/custom/ts-restricted-discounts.json",
                    data: "",
                    async: false,
                    success: function (data) {
                        restrictedDiscount = data;
                    }
                });
                productList = restrictedDiscount.productList;
                $(".ts-restricted-discount-line").remove();
				// INDIVAR PKE000000109706-Start - 18/03/2024
                /*for (a = 0; a < productList.length; a++) {
                    for (var r = 0; r < addOnData.restDisc.length; r++) {
                        if (addOnData.restDisc[r].SamId == productList[a].samid) {
                            $(".applet-subsection.ts-product-selection").append(getrestirctedDiscount(productList[a]));
                        }
                    }
                }*/
				for (a = 0; a < productList.length; a++) {
					 $(".applet-subsection.ts-product-selection").append(getrestirctedDiscount(productList[a]));
				}
				// INDIVAR PKE000000109706-End - 18/03/2024
                $(".ts-reason-code").autocomplete({
                    source: restrictedDiscount.reasonCode.map(function (a) {
                        return {
                            label: a,
                            value: a,
                            type: "RecurringProducts"
                        };
                    }),
                    minLength: 0,
                    select: selectAutoCompleteVal
                });
                $(".ts-reason-code-drop-down").click(dropDownTrigger);
                var period = new Array;
                for (var i = 2; i <= 36; i++) {
                    period.push(i);
                }
                $(".period").autocomplete({
                    source: period.map(function (a) {
                        return {
                            label: a,
                            value: a,
                            type: "RecurringProducts"
                        };
                    }),
                    minLength: 0,
                    select: selectAutoCompleteVal
                });
                $(".period-drop-down").click(dropDownTrigger);
                $(".ts-product-selection .input-field").prop("readonly", true);
                $(".ts-product-selection .input-checkbox").change(function () {
                    if ($(this).prop("checked") == true) {
                        $(this).parent().parent().find(".input-field").prop("readonly", false);
                        $("#amount-1-4LV7C3N").prop("readonly", true);
                        $("#amount-2-CQJOBJP").prop("readonly", true);
                    } else {
                        $(this).parent().parent().find(".input-field").val("");
                        $(this).parent().parent().find(".input-field").prop("readonly", true);
                        var RDInelig = "RecurringDiscount_" + $(this).attr("samid");
                        tsintitialData.OrderHeader[RDInelig].EligibleOrderLineItem = "N";
                        restrictedDiscountCartUpt();
                    }
                });
                $(".ts-product-selection .amount,.ts-product-selection .ts-reason-code,.ts-product-selection .period").change(function () {
                    var RDMain = {
                        RDdata: {
                            RDparid: "",
                            RDsamid: "",
                            RDname: "",
                            RDPercent: "",
                            RDamount: "",
                            RDperiod: "",
                            RDreason: ""
                        }
                    };
                    var sRDparid = $(this).attr("parid");
                    RDMain.RDdata.RDparid = $(this).attr("parid");
                    RDMain.RDdata.RDsamid = $("#" + sRDparid).attr("samid");
                    RDMain.RDdata.RDname = $("#" + sRDparid).attr("name");
                    RDMain.RDdata.RDPercent = $("#" + sRDparid).attr("percent");
                    RDMain.RDdata.RDamount = $("#amount-" + sRDparid).val();
                    RDMain.RDdata.RDperiod = $("#period-" + sRDparid).val();
                    RDMain.RDdata.RDreason = $("#ts-reason-code-" + sRDparid).val();
                    restrictedDiscountOLI(RDMain.RDdata);
                });
            };
            var getrestirctedDiscount = function (data) {
                var x = '<div class="parent-controls-container  ts-restricted-discount-line">' + '<div class="vcol-1">' + '<input type="checkbox" id="' + data.id + '" name="' + data.name + '" samid="' + data.samid + '" percent="' + data.percent + '" class="input-checkbox">' + '<label for="' + data.id + '" class="item-checkbox-label">' + data.name + "</label>" + "</div>" + '<div class="vcol-2">' + '<input class="input-field input-override amount" parid="' + data.id + '" id="amount-' + data.id + '" type="number"/> ' + "</div>" + '<div class="vcol-3">' + '<input class="input-field input-override period" parid="' + data.id + '"  id="period-' + data.id + '"/> ' + '<span class="siebui-icon-dropdown applet-form-combo applet-list-combo period-drop-down" parId="#period-' + data.id + '" data-allowdblclick="true"></span>' + "</div>" + '<div class="vcol-4">' + '<input class="input-field input-override ts-reason-code" parid="' + data.id + '" id="ts-reason-code-' + data.id + '"/> ' + '<span class="siebui-icon-dropdown applet-form-combo applet-list-combo ts-reason-code-drop-down" parId="#ts-reason-code-' +
                    data.id + '" data-allowdblclick="true"></span>' + "</div>" + "</div>";
                return x;
            };
            var restrictedDiscountOLI = function (RDdata) {
                var RDorderLineItem = "RecurringDiscount_" + RDdata.RDsamid;
                var RDlineItem = tsintitialData.OrderHeader[RDorderLineItem];
                if (RDdata.RDperiod != "" && RDdata.RDreason != "" && (RDdata.RDamount != "" || RDdata.RDsamid == "AUX0207" || RDdata.RDsamid == "AUX1414")) {
                    RDlineItem.Action = "Add";
                    RDlineItem.Name = RDdata.RDname;
                    RDlineItem.Type = "Recurring Discount";
                    RDlineItem.Prod__Integration__Id = "";
                    RDlineItem.GPI = "Recurring Discount";
                    RDlineItem.ProductId = RDdata.RDparid;
                    RDlineItem.MaxPrice = "";
                    RDlineItem.SAMId = RDdata.RDsamid;
                    RDlineItem.ServicePrice = RDdata.RDPercent;
                    if (RDdata.RDsamid != "AUX0207" && RDdata.RDsamid != "AUX1414") {
                        RDlineItem.Amount = RDdata.RDamount;
                        RDlineItem.Reason__Code = RDdata.RDreason;
                    }
                    if (RDdata.RDsamid == "AUX0207" || RDdata.RDsamid == "AUX1414") {
                        RDlineItem.UI__Reason__Code = RDdata.RDreason;
                    }
                    RDlineItem.Period = RDdata.RDperiod;
                    RDlineItem.EligibleOrderLineItem = "Y";
                    restrictedDiscountCartUpt();
                } else {
                    RDlineItem.EligibleOrderLineItem = "N";
                    restrictedDiscountCartUpt();
                }
            };
            var UpdateCardDetails = function () {
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardHolder = $(".vha-ts-nameoncard").attr("actualvalue");
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardNumber = $(".vha-ts-cardnumber").attr("actualvalue");
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardType = $(".vha-ts-cardtype").attr("actualvalue");
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.EligibleOrderLineItem = "Y";
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.ExpiryDate = $(".vha-ts-cardexpiry").attr("actualvalue");
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.SurchargeInPercent = $(".vha-ts-cardsurcharge").attr("actualvalue");
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.Brand = $(".vha-ts-cardbrand").attr("actualvalue");
                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.BrandType = $(".vha-ts-cardbrand").attr("actualvalue");
				tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.Last4 = $(".vha-ts-cardnumber").attr("last4");
				tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.First6 = $(".vha-ts-cardnumber").attr("first6");
				tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.DeviceData = $(".vha-ts-cardnumber").attr("devicedata");
                updatePrepaymentMessageDisplay();
            };
			//vasavi added UpdateUPIDetails for florida
			var UpdateUPIDetails = function () {
                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.NotifyType = $('.vha-ts-notifytype').val();
                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.MSISDN = $('.vha-ts-mobnumber').val();
                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.Email = $('.vha-ts-email').val();
                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.EligibleOrderLineItem = "Y";
                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.CreateDate = $('.vha-ts-paydate').val();
                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.URL = $('.vha-ts-url').val();
                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.URLStatus = $('.vha-ts-urlstatus').val();
                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.PaymentStatus = $('.vha-ts-paystatus').val();
				tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.PaymentMethod = $(".vha-ts-paytype").val();
				tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.PaymentToken = $(".vha-ts-paytoken").val();
				tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.ReceiptNumber = $(".vha-ts-recnumber").val();
				tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.ShortId = SiebelApp.S_App.GetProfileAttr("ShortCodeP");
            };
            var restrictedDiscountCartUpt = function () {
                var RDCartVal = 0.00;
                var RDShowCart = "N";
                var RDPlan = 0.00;
                if (tsintitialData.OrderHeader.UpgradeOfferType == "Upgrade to New plan" && sNewPlanPri != "") {
                    RDPlan = sNewPlanPri;
                } else {
                    if (sExtPlanPri != "") {
                        RDPlan = sExtPlanPri;
                    }
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_SAM1569.EligibleOrderLineItem == "Y") {
                    var sAmtGST = parseFloat((parseFloat(tsintitialData.OrderHeader.RecurringDiscount_SAM1569.Amount) * parseFloat(sGST)).toFixed(2));
                    RDCartVal = parseFloat(RDCartVal.toFixed(2)) + sAmtGST;
                    tsintitialData.OrderHeader.RecurringDiscount_SAM1569.MaxPrice = sAmtGST.toFixed(2);
                    RDShowCart = "Y";
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_AUX0207.EligibleOrderLineItem == "Y") {
                    var sAmtGST = parseFloat(RDPlan * 0.10);
                    RDCartVal = parseFloat(RDCartVal.toFixed(2)) + sAmtGST;
                    tsintitialData.OrderHeader.RecurringDiscount_AUX0207.MaxPrice = sAmtGST.toFixed(2);
                    RDShowCart = "Y";
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_AUX1414.EligibleOrderLineItem == "Y") {
                    var sAmtGST = parseFloat(RDPlan * 0.05);
                    RDCartVal = parseFloat(RDCartVal.toFixed(2)) + sAmtGST;
                    tsintitialData.OrderHeader.RecurringDiscount_AUX1414.MaxPrice = sAmtGST.toFixed(2);
                    RDShowCart = "Y";
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_AUV0450.EligibleOrderLineItem == "Y") {
                    var sAmtGST = parseFloat((parseFloat(tsintitialData.OrderHeader.RecurringDiscount_AUV0450.Amount) * parseFloat(sGST)).toFixed(2));
                    RDCartVal = parseFloat(RDCartVal.toFixed(2)) + sAmtGST;
                    tsintitialData.OrderHeader.RecurringDiscount_AUV0450.MaxPrice = sAmtGST.toFixed(2);
                    RDShowCart = "Y";
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_AUV0451.EligibleOrderLineItem == "Y") {
                    var sAmtGST = parseFloat((parseFloat(tsintitialData.OrderHeader.RecurringDiscount_AUV0451.Amount) * parseFloat(sGST)).toFixed(2));
                    RDCartVal = parseFloat(RDCartVal.toFixed(2)) + sAmtGST;
                    tsintitialData.OrderHeader.RecurringDiscount_AUV0451.MaxPrice = sAmtGST.toFixed(2);
                    RDShowCart = "Y";
                }
                if (tsintitialData.OrderHeader.RecurringDiscount_AUV0452.EligibleOrderLineItem == "Y") {
                    var sAmtGST = parseFloat((parseFloat(tsintitialData.OrderHeader.RecurringDiscount_AUV0452.Amount) * parseFloat(sGST)).toFixed(2));
                    RDCartVal = parseFloat(RDCartVal.toFixed(2)) + sAmtGST;
                    tsintitialData.OrderHeader.RecurringDiscount_AUV0452.MaxPrice = sAmtGST.toFixed(2);
                    RDShowCart = "Y";
                }
				if (tsintitialData.OrderHeader.RecurringDiscount_AUV0535.EligibleOrderLineItem == "Y") {
                    var sAmtGST = parseFloat(RDPlan * 0.10);
                    RDCartVal = parseFloat(RDCartVal.toFixed(2)) + sAmtGST;
                    tsintitialData.OrderHeader.RecurringDiscount_AUV0535.MaxPrice = sAmtGST.toFixed(2);
                    RDShowCart = "Y";
				}
                if (RDShowCart == "Y") {
                    $(".cart-discount-restrict .vha-ts-cartval span").text(RDCartVal.toFixed(2));
                    $(".vha-ts-discount").removeClass("VFDisplayNone");
                    $(".cart-discount-restrict").removeClass("VFDisplayNone");
                    updateSessionDetails(RDCartVal.toFixed(2), "RestrictedDiscount", "Add");
                } else {
                    $(".cart-discount-restrict").addClass("VFDisplayNone");
                    $(".cart-discount-restrict .vha-ts-cartval span").text("0.00");
                    updateSessionDetails(0.00, "RestrictedDiscount", "Add");
                }
                totalIndicativeCostCalc();
            };
            var phoneInsuranceCartUpt = function () {
                var iLen = tsintitialData.OrderHeader.PhoneInsurance.length;
                var insMaxPri = 0;
                for (var k = 0; k < iLen; k++) {
                    insMaxPri = parseInt(insMaxPri) + parseInt(tsintitialData.OrderHeader.PhoneInsurance[k].MaxPrice);
                }
                $(".vha-ts-addons").removeClass("VFDisplayNone");
                $(".cart-phone-insurance .vha-ts-cartval").text("$ " + insMaxPri + ".00");
                if (parseInt(insMaxPri) > 0) {
                    $(".cart-phone-insurance").removeClass("VFDisplayNone");
                } else {
                    $(".cart-phone-insurance").addClass("VFDisplayNone");
                }
            };
            var SDInsuranceCartUpt = function () {
                var sSecDvcItems = tsintitialData.OrderHeader.SecondaryDevices;
                var insPri = 0;
                if (sSecDvcItems.length > 0) {
                    var sSecIns = sSecDvcItems.filter(function (a) {
                        //return a.Name == "Vodafone Swap & Go - Wearables"; //Ravindra:01/Dec/23: Commented and added the below line
						  return a.Name == "Vodafone Device Care Wearables";
                    });
                    for (var i = 0; i < sSecIns.length; i++) {
                        insPri += 5;
                    }
                }
                if (parseInt(insPri) > 0) {
                    $(".vha-ts-addons").removeClass("VFDisplayNone");
                    $(".cart-sd-insurance .vha-ts-cartval").text("$ " + insPri + ".00");
                    $(".cart-sd-insurance").removeClass("VFDisplayNone");
                } else {
                    $(".cart-sd-insurance").addClass("VFDisplayNone");
                    $(".cart-sd-insurance .vha-ts-cartval").text("$ " + insPri + ".00");
                }
            };
            function shopDevice(sDeviceDtl, currentDeviceCard) {
                priDeviceProdCd,
                priDeviceName = "";
                priDeviceProdCd = sDeviceDtl.Product_Code;
                priDeviceName = sDeviceDtl.Source_Product_Name;
                var sDvcStockChk = {
                    ErrorCode: "",
                    StockBand: "",
                    ErrorMsg: ""
                };
                sDvcStockChk = ProcessDeviceCheck("DeviceItem", priDeviceProdCd + ";" + priDeviceName, sDeviceDtl, "StockCheckCall");
                if (sDvcStockChk.StockBand == "Non-Orderable" || sDvcStockChk.ErrorCode == "1001") {
                    var sErrDtl = "The selected device with product code '" + priDeviceProdCd + "' is not available for deferred ordering. Please select another device to proceed.";
                    $(".vha-ts-device-select #vha-ts-d-stockerrmsg").text(sErrDtl);
                    $(".vha-ts-device-select #vha-ts-d-stockerrmsg").removeClass("text-warning").addClass("text-danger");
                } else {
                    if (["Available", "Low Stock", "Back Order"].includes(sDvcStockChk.StockBand) || $(".vha-ts-storeres input[type=checkbox]").prop("checked")) {
                        $(".vha-ts-cart-sum").removeClass("VFDisplayNone");
                        $(".vha-ts-indcost .vha-ts-cartval").text("0.00");
                        triggerCustomerExpand();
                        addDevice(sDeviceDtl, sDvcStockChk);
                        addDiscounts(sDvcStockChk);
                        if ($("div#stockmsg").text() != "") {
                            $("div#stockmsg").text("");
                        }
                        currentDeviceCard.parent().next().text(sDvcStockChk.StockBandMsg);
                        var getId = currentDeviceCard.parent().parent().parent().parent().attr("id");
                        $("[id^=card]").removeClass("borderhighlight");
                        $("#" + getId).addClass("borderhighlight");
                        if (tsintitialData.OrderHeader.Device.Device__Code != "") {
                            $("#showDeviceMsg").empty();
                        }
                        devicecount++;
                        if (devicecount == 1) {
                            Totalcountvalue(devicecount, plancount, secdevice, accssorycount);
                        }
                    } else {
                        $(".vha-ts-cart-sum").removeClass("VFDisplayNone");
                        $(".vha-ts-indcost .vha-ts-cartval").text("0.00");
                        triggerCustomerExpand();
                        addDevice(sDeviceDtl, sDvcStockChk);
                        addDiscounts(sDvcStockChk);
                        if ($("div#stockmsg").text() != "") {
                            $("div#stockmsg").text("");
                        }
                        currentDeviceCard.parent().next().text(sDvcStockChk.StockBandMsg);
                        var getId = currentDeviceCard.parent().parent().parent().parent().attr("id");
                        $("[id^=card]").removeClass("borderhighlight");
                        $("#" + getId).addClass("borderhighlight");
                        if ($(".vha-ts-imei").val() == "") {
                            var sErrDtl = "Stock availability and/or Estimated Shipment Date (ESD) check failed. Please check stock and/or ESD manually and raise a Siebel Support ticket if you continue to receive this error.";
                        }
                        $(".vha-ts-device-select #vha-ts-d-stockerrmsg").text(sErrDtl);
                        $(".vha-ts-device-select #vha-ts-d-stockerrmsg").addClass("text-warning").removeClass("text-danger");
                        if (tsintitialData.OrderHeader.Device.Device__Code != "") {
                            $("#showDeviceMsg").empty();
                        }
                        devicecount++;
                        if (devicecount == 1) {
                            Totalcountvalue(devicecount, plancount, secdevice, accssorycount);
                        }
                    }
                }
            }
            function resumeSession() {
                if (sessionType == "Paused") {
                    var resumePrepayment = function () {
                        if (resumeDevice == "Added" && resumeSecDevice == "Added" && resumeAccessory == "Added" && resumeConfigureService == "Added") {
                            var sPrepaymentType = pausedDetails.OrderHeader.Prepayment.PrepaymentType;
							var sPrepaymentUPI = pausedDetails.OrderHeader.Prepayment.PrepaymentUPI;//vasavi added for Florida
                            if (sPrepaymentType != "") {
                                $("#" + sPrepaymentType + "").trigger("click");
                            }
							//vasavi added for Florida
							if (sPrepaymentUPI != "") {
                                $("#" + sPrepaymentUPI + "").trigger("click");
                            }
                            if (sPrepaymentType == "vhagfppcreditcardbtn") {
                                $(".VFPPOUIPayCorpCancle").trigger("click");
                                var sNameOnCard = pausedDetails.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardHolder;
                                var sCardNumber = pausedDetails.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardNumber;
                                var sExpiry = pausedDetails.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.ExpiryDate;
                                var sCardType = pausedDetails.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardType;
                                var sBrandType = pausedDetails.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.BrandType;
                                var sSurcharge = pausedDetails.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.SurchargeInPercent;
                                var sTotPrepayAmt = pausedDetails.OrderHeader.Prepayment.TotalPrepaymentAmount;
                                var sWaiveSurcharge = pausedDetails.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.WaiveSurcharge;
								var cardLast4 = pausedDetails.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.Last4;
								var cardFirst6 = pausedDetails.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.First6;
								var deviceData = pausedDetails.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.DeviceData;
                                $("input.vha-ts-nameoncard").val(sNameOnCard).attr("actualValue", sNameOnCard);
                                if (sCardNumber != "") {
                                    if(cardLast4!="")
										$("input.vha-ts-cardnumber").val(cardFirst6.substr(0, 4) + " **** **** " + cardLast4).attr("actualValue", sCardNumber);
									else
										$("input.vha-ts-cardnumber").val(sCardNumber.substr(0, 4) + " **** **** " + sCardNumber.substr(-4)).attr("actualValue", sCardNumber);
									//$("input.vha-ts-cardnumber").val(sCardNumber.substr(0, 4) + " **** **** " + sCardNumber.substr(-4)).attr("actualValue", sCardNumber);
                                } else {
                                    $("input.vha-ts-cardnumber").val(sCardNumber).attr("actualValue", sCardNumber);
                                }
                                $("input.vha-ts-cardexpiry").val(sExpiry).attr("actualValue", sExpiry);
                                $("input.vha-ts-cardtype").val(sCardType).attr("actualValue", sCardType);
                                $("input.vha-ts-cardbrand").val(sBrandType).attr("actualValue", sBrandType);
                                $("input.vha-ts-cardsurcharge").val(sSurcharge).attr("actualValue", sSurcharge);
								$("input.vha-ts-cardnumber").attr("first6", cardFirst6);
								$("input.vha-ts-cardnumber").attr("last4", cardLast4);
								$("input.vha-ts-cardnumber").attr("devicedata", deviceData);
                                if (sTotPrepayAmt > 0) {
                                    $("#gf-prepayment-amt").val(sTotPrepayAmt).trigger("change");
                                }
                                if (sWaiveSurcharge == "Y") {
                                    $("#vhagfppwaiveoff").trigger("click");
                                }
                                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardHolder = sNameOnCard;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardNumber = sCardNumber;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.CardType = sCardType;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.EligibleOrderLineItem = "Y";
                                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.ExpiryDate = sExpiry;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.SurchargeInPercent = sSurcharge;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.BrandType = sBrandType;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.WaiveSurcharge = sWaiveSurcharge;
								tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.Last4 = cardLast4;
								tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.First6 = cardFirst6;
								tsintitialData.OrderHeader.Prepayment.PrepaymentCardDetailsAll.PrepaymentCardDetails.DeviceData = deviceData;
                                tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = sTotPrepayAmt;
                            }
							//vasavi added below if for florida
							if (sPrepaymentUPI == "vhagfppgenerateupibtn") {
                                $(".VFPPOUIPayCorpCancle").trigger("click");
                                var sNotifyType = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.NotifyType;
                                var sMSISDN = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.MSISDN;
                                var sEmail = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.Email;
                                var sURL = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.URL;
                                var sURLStatus = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.URLStatus;
                                var sPaymentStatus = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.PaymentStatus;
                                var sTotPrepayAmt = pausedDetails.OrderHeader.Prepayment.TotalPrepaymentAmount;
                                var sWaiveSurcharge = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.WaiveSurcharge;
                                var sPaymentMethod = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.PaymentMethod;
								var shortId = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.ShortId;
								var sCreatedDate = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.CreatedDate;
								var sPaymentToken = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.PaymentToken;
								var sReceiptNumber = pausedDetails.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.ReceiptNumber;
                                $("input.vha-ts-notifytype").val(sNotifyType).attr("actualValue", sNotifyType);
                                $("input.vha-ts-mobnumber").val(sMSISDN).attr("actualValue", sMSISDN);
                                $("input.vha-ts-emial").val(sEmail).attr("actualValue", sEmail);
                                $("input.vha-ts-url").val(sURL).attr("actualValue", sURL);
								$("input.vha-ts-urlstatus").val(sURLStatus).attr("actualValue", sURLStatus);
								$("input.vha-ts-paystatus").val(sPaymentStatus ).attr("actualValue", sPaymentStatus );
								$("input.vha-ts-paytype").val(sPaymentMethod).attr("actualValue", sPaymentMethod);
								$("input.vha-ts-paydate").val(sCreatedDate).attr("actualValue", sCreatedDate);
								$("input.vha-ts-paytoken").val(sPaymentToken).attr("actualValue", sPaymentToken);
								$("input.vha-ts-recnumber").val(sReceiptNumber).attr("actualValue", sReceiptNumber);
                                if (sTotPrepayAmt > 0) {
                                    $("#gf-prepayment-amt").val(sTotPrepayAmt).trigger("change");
                                }
                                if (sWaiveSurcharge == "Y") {
                                    $("#vhagfppwaiveoff").trigger("click");
                                }
                                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.NotifyType = sNotifyType;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.MSISDN = sMSISDN;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.Email = sEmail;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.EligibleOrderLineItem = "Y";
                                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.URL = sURL;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.URLStatus = sURLStatus;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.PaymentStatus = sPaymentStatus;
                                tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.PaymentMethod = sPaymentMethod;
								tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.CreatedDate = sCreatedDate;
								tsintitialData.OrderHeader.Prepayment.PrepaymentUPIDetailsAll.PrepaymentUPIDetails.WaiveSurcharge = sWaiveSurcharge;
                                tsintitialData.OrderHeader.Prepayment.TotalPrepaymentAmount = sTotPrepayAmt;
                            }
                            resumeDevice = "";
                            resumeSecDevice = "";
                            resumeAccessory = "";
                            resumeConfigureService = "";
                            tsintitialData.OrderHeader.Prepayment.PrepaymentUPI = sPrepaymentUPI;
                            clearInterval(myVar);
                        }
                    };
                    var resumeSharingDetails = function () {
                        if (resumeSharing == "Added") {
                            var sNSSharingFlag = pausedDetails.OrderHeader.Sharing.NewStatus.SharingFlag;
                            var sNSGroupName = pausedDetails.OrderHeader.Sharing.NewStatus.GroupName;
                            var sNSLoadedSharingFlag = tsintitialData.OrderHeader.Sharing.NewStatus.SharingFlag;
                            if (sNSSharingFlag == "Y") {
                                $("#sharinggrouplist").attr("disabled", false);
                                $("#sharinggrouplist").val(sNSGroupName).trigger("change");
                                if (sNSLoadedSharingFlag != "Y") {
                                    $(".sharingcheckbox input[type='checkbox']").trigger("click");
                                }
                            } else {
                                if (sNSSharingFlag == "N") {
                                    $("#sharinggrouplist").attr("disabled", true);
                                    if (sNSLoadedSharingFlag != "N") {
                                        $(".sharingcheckbox input[type='checkbox']").trigger("click");
                                    }
                                }
                            }
                            var jsonData = pausedDetails.OrderHeader.Sharing.ExistingMSISDN;
                            var length = jsonData.length;
                            var sMSISDN,
                            sSharingFlag,
                            sMSISDNUI,
                            i,
                            j;
                            for (i = 0; i < length; i++) {
                                sMSISDN = jsonData[i].MSISDN;
                                sSharingFlag = jsonData[i].SharingFlag;
                                for (j = 0; j <= $("div.exsRow").siblings(".exsRow").length; j++) {
                                    if ($("div.exsRow").siblings(".exsRow").length == 0) {
                                        sMSISDNUI = $("div.exsRow").children().eq(1).children().attr("msisdn");
                                    } else {
                                        sMSISDNUI = $("div.exsRow").siblings(".exsRow").eq(j).children().eq(1).children().eq(0).attr("msisdn");
                                    }
                                    if (sMSISDNUI == sMSISDN && sSharingFlag == "Y") {
                                        if ($("div.exsRow").siblings(".exsRow").length == 0) {
                                            $("div.exsRow").children().eq(1).children().trigger("click");
                                        } else {
                                            $("div.exsRow").siblings(".exsRow").eq(j).children().eq(1).children().eq(0).trigger("click");
                                        }
                                    }
                                }
                            }
                            clearInterval(myTimeVar);
                        }
                    };
                    if (pausedDetails.OrderHeader.OverrideDesc != "") {
                        $("#ts-override-reason").val(pausedDetails.OrderHeader.OverrideDesc).change();
                        pausedDetails.OrderHeader.OverrideDesc = "";
                    }
                    if (pausedDetails.OrderHeader.UpgradeOfferType == "Upgrade to New plan") {
                        $("#vha-ts-upg-btn").trigger("click");
                    } else {
                        if (pausedDetails.OrderHeader.UpgradeOfferType == "Resign") {
                            $("#vha-ts-resign-btn").trigger("click");
                        } else {
                            if (pausedDetails.OrderHeader.UpgradeOfferType == "RRP on Installment") {
                                $("#vha-ts-rrp-btn").trigger("click");
                            }
                        }
                    }
                    if (pausedDetails.OrderHeader.AddSIM.EligibleOrderLineItem == "Y") {
                        $("#vhatsaddsimy").trigger("click");
                    }
                    var jsonData = pausedDetails.OrderHeader.PhoneInsurance;
                    var length = jsonData.length;
                    if (length > 0) {
                        var sPhoneInsuranceOLI = jsonData[0].EligibleOrderLineItem;
                        var sPhoneInsProdId = jsonData[0].Prod__Integration__Id;
                        if (sPhoneInsuranceOLI == "Y" && sPhoneInsProdId == "") {
                            var sPhoneInsuranceVal = jsonData[0].Name;
                            sPhoneInsuranceVal += "|";
                            $("#ts-new-device-ins").val(sPhoneInsuranceVal).trigger("change");
                        }
                    }
                    var sMSISDN = pausedDetails.OrderHeader.twoWaySMS.MSISDN;
                    var sOverrideFlag = pausedDetails.OrderHeader.twoWaySMS.OverrideFlag;
                    var sEligibleFlag = pausedDetails.OrderHeader.twoWaySMS.Eligible;
                    if (sEligibleFlag == "Y") {
                        $(".twowaysms-msisdn").val(sMSISDN);
                        tsintitialData.OrderHeader.twoWaySMS.MSISDN = sMSISDN;
                        if (sOverrideFlag == "Y") {
                            $("#vha-ts-2waysms #tickmark1").trigger("click");
                        }
                    }
                    var myTimeVar = setInterval(resumeSharingDetails, 2000);
                    var myVar = setInterval(resumePrepayment, 5000);
                    //StoreReservation resume Balaji M
                    if (pausedDetails.OrderHeader.StoreReservation == true) {
                        $(".vha-ts-storeres input[type=checkbox]").trigger("click");
                    }
                }
            }
            function shopSecondary(productcd, pausedInsDtls) {
                $("#pickmodelid").empty();
                $("#vha-ts-sd-stockerrmsg").text("");
                $("#vha-ts-sd-equiplmtmsg").text("");
                $("#vha-ts-sd-imeierrmsg").text("");
                $("#showMsgAdd").remove();
                if (sCapPlan) {
                    $("#vha-ts-sd-stockerrmsg").text("Accessory option is not available for Cap Plans.");
                    $("#vha-ts-sd-stockerrmsg").removeClass("text-warning").addClass("text-danger");
                    return;
                }
                if ($(".vha-ts-sd-term").hasClass("applet-button-active")) {
                    var secDvcCnt = 0;
                    $("#secondaryslected div[vha_sd_grp_id]").each(function (index) {
                        secDvcCnt++;
                    });
                    Deletedevice = secDvcCnt;
                    if (parseInt(secDvcCnt) + parseInt(sExistingSDAppCount) < 5) {
                        if (productcd != "" && typeof productcd != "undefined") {
                            for (i = 0; i < secondaryresponse.length; i++) {
                                if (secondaryresponse[i]._source.Product_Code == productcd) {
                                    var sSDStockChk = {
                                        ErrorCode: "",
                                        StockBand: "",
                                        ErrorMsg: "",
                                        EstShipmentDt: ""
                                    };
                                    if ($("#secondaryimei").val() == "") {
                                        sSDStockChk = ProcessCheckStock("SecondaryItem", secondaryresponse[i]._source.Product_Code + ";" + secondaryresponse[i]._source.Name);
                                    }
                                    if (sSDStockChk.StockBand == "Non-Orderable" || sSDStockChk.ErrorCode == "1001") {
                                        var sErrDtl = "The selected device with product code '" + productcd + "' is not available for deferred ordering. Please select another device to proceed.";
                                        $("#vha-ts-sd-stockerrmsg").text(sErrDtl);
                                        $("#vha-ts-sd-stockerrmsg").addClass("text-danger").removeClass("text-warning");
                                        $("#ts-secondary-model").val();
                                        $("#secondaryimei").val();
                                    } else {
                                        if (["Available", "Low Stock", "Back Order"].includes(sSDStockChk.StockBand) || $("#secondaryimei").val() != "") {
                                            secondaryDvcAdd(productcd, sSDStockChk, pausedInsDtls);
                                            secdevice = Deletedevice;
                                            Totalcountvalue(devicecount, plancount, secdevice, accssorycount);
                                            var sEqpValue = equipmentLimitValidation();
                                            if (sEqpValue > sSessionData.EquipmentLimit) {
                                                var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                                                $("#vha-ts-sd-equiplmtmsg").text(sErrDtl);
                                            }
                                        } else {
                                            secondaryDvcAdd(productcd, sSDStockChk, pausedInsDtls);
                                            secdevice = Deletedevice;
                                            Totalcountvalue(devicecount, plancount, secdevice, accssorycount);
                                            var sErrDtl = "Stock availability and/or Estimated Shipment Date (ESD) check failed. Please check stock and/or ESD manually and raise a Siebel Support ticket if you continue to receive this error.";
                                            $("#vha-ts-sd-stockerrmsg").text(sErrDtl);
                                            $("#vha-ts-sd-stockerrmsg").addClass("text-warning");
                                            var sEqpValue = equipmentLimitValidation();
                                            if (sEqpValue > sSessionData.EquipmentLimit) {
                                                var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                                                $("#vha-ts-sd-equiplmtmsg").text(sErrDtl);
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        } else {
                            $("#vha-ts-sd-dropdown").after('<span id="pickmodelid">Please select the Model</span>');
                        }
                        mSetPrepaymentaccordion();
                    } else {
                        $("#secondaryimei").val("");
                        $("#ts-secondary-model").val("");
                        $("#ts-search-ean").val("");
                        $("#vhasecondaryadd").after("<div id='showMsgAdd'>Maximum of 5 secondary devices only allowed</div>");
                    }
                } else {
                    $("#secondaryimei").val("");
                    $("#vha-ts-sd-stockerrmsg").text("Please select Payment Term");
                    $("#vha-ts-sd-stockerrmsg").addClass("text-danger");
                }
            }
            function shopAccessory(productcd, sPrice) {
                $("#showMsgAdd").remove();
                $("#vha-ts-accsry-equiplmtmsg").text("");
                $("#vha-ts-accsry-stockerrmsg").text("");
                if (sCapPlan) {
                    $("#vha-ts-accsry-stockerrmsg").text("Accessory option is not available for Cap Plans.");
                    $("#vha-ts-accsry-stockerrmsg").removeClass("text-warning").addClass("text-danger");
                    return;
                }
                if ($("div.accessory div[id='" + productcd + "']").length == 0 && $("#vha-ts-accessorylist").val() != "") {
                    $("#accessmsg").empty();
                    $("#Addlimitcount").empty();
					
						//Proj:Visa-Start
						var sVisaAccid = "",sVisaTerm = "",sVisaOrderId = "", sErrMsg = "",ROups = "";
						sVisaAccid = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Account Id");	
						sVisaOrderId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("VHA 3 Step Upgrade Header").GetFieldValue("Order Id");																
						sVisaTerm = $(".vha-ts-a-term.applet-button-active").attr("term");							
						if (sVisaAccid !="" && sVisaTerm !=""){										
							var Inputs = SiebelApp.S_App.NewPropertySet();
							var Output = SiebelApp.S_App.NewPropertySet();							
							var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
							Inputs.SetProperty("Service Name", "VHA Store Pickup Reservation Service");										
							Inputs.SetProperty("Order Id", sVisaOrderId);
							Inputs.SetProperty("CustId", sVisaAccid);										
							Inputs.SetProperty("TransactionType", "3 Step Upgrade");
							Inputs.SetProperty("3Step", "3APP");
							Inputs.SetProperty("Term", sVisaTerm);	
							Inputs.SetProperty("Method Name", "GetVisaExpiryDate");
							ROups = ser.InvokeMethod("Run Process", Inputs);										
							sErrMsg = ROups.childArray[0].propArray.ErrorMessage;                                         						
							if (sErrMsg!=""){																
								$("#vha-ts-accsry-stockerrmsg").text(sErrMsg);
								$("#vha-ts-accsry-stockerrmsg").addClass("text-danger");								
							}
						}
					if (sErrMsg == "")
					{
                    if ($(".vha-ts-a-term").hasClass("applet-button-active")) {
                        var validlimit = parseInt($(".vha-ts-accessory .count").text());
                        AccessoryDelete1 = validlimit;
                        AccessoryDelete = validlimit;
                        if (validlimit == 0) {
                            accssorycount++;
                        } else {
                            accssorycount = AccessoryDelete + 1;
                        }
                        AccessoryDelete1 = AccessoryDelete + 1;
                        Totalcountvalue(devicecount, plancount, secdevice, accssorycount);
                        if (parseInt(tsintitialData.OrderHeader.Accessories[0].Number__of__Accessories) < 10) {
                            for (i = 0; i < accessoryresponse.length; i++) {
                                if (accessoryresponse[i]._source.Accessory_Code == productcd) {
                                    var sAsryStockChk = {
                                        ErrorCode: "",
                                        StockBand: "",
                                        ErrorMsg: "",
                                        EstShipmentDt: ""
                                    };
                                    if ($(".vhatsstockindicator.applet-button-active").text() == "Out of Stock") {
                                        sAsryStockChk = ProcessCheckStock("AccessoryItem", accessoryresponse[i]._source.Accessory_Code + ";" + accessoryresponse[i]._source.Accessory_Name);
                                    }
                                    if (sAsryStockChk.StockBand == "Non-Orderable" || sAsryStockChk.ErrorCode == "1001") {
                                        var sErrDtl = "The selected device with product code '" + productcd + "' is not available for deferred ordering. Please select another device to proceed.";
                                        $("#vha-ts-accsry-stockerrmsg").text(sErrDtl);
                                        $("#vha-ts-accsry-stockerrmsg").addClass("text-danger");
                                    } else {
                                        if (!(sAsryStockChk.StockBand == "Available" || $(".vhatsstockindicator.applet-button-active").text() == "In Stock")) {
                                            var sErrDtl = "Stock availability and/or Estimated Shipment Date (ESD) check failed. Please check stock and/or ESD manually and raise a Siebel Support ticket if you continue to receive this error.";
                                            $("#vha-ts-accsry-stockerrmsg").text(sErrDtl);
                                            $("#vha-ts-accsry-stockerrmsg").addClass("text-warning");
                                        }
                                        $("#accessoryselected").append('<div class="flex_row_container NCIdrecLines accessory"><div name="Accessory Name" class="vhaidattflds" id="' + productcd + '" style="width: 25%;">' + $(".tssearchplan").val() + '</div><div name="Quantity" class="vhaidattflds" id="quantity" prodcd="' + productcd + '" price="' + sPrice + '" style="width: 8%;">1</div><div name="Stock Indicator" class="vhaidattflds" id="stockindicator" style="width: 14%;">' + $(".vhatsstockindicator.applet-button-active").text() + '</div><div name="Stock Band" class="vhaidattflds" id="stockband" style="width: 12%;">' + sAsryStockChk.StockBand + '</div><div name="Estimated Ship Date" class="vhaidattflds" id="a-estdshpdt" style="width: 18%;">' + sAsryStockChk.EstShipmentDt + '</div><div name="Edit Quantity" class="vhaidattflds" id="editquantity" style="width: 15%;"><span class="quantity d-flex"><span class="vhacircleminus" id="circleminus" prodcd="' + productcd + '"><img src="images/custom/circleminus.svg"></span><span id="quantitytxt"><input class="input-field" type="text" aria-label="Quantity"></span><span class="vhacircleplus" id="circleplus" prodcd="' + productcd + '"><img src="images/custom/circleplus.svg"></span></span></div><div style="width: 8%;"><a id="accessremove" href="#" >Remove</a></div></div>');
                                        $(".vha-ts-accessory").removeClass("VFDisplayNone");
                                        updateSessionDetails(parseFloat(parseFloat(accessoryresponse[i]._source.RRP_inc_gst)).toFixed(2), "AccessoryCost", "Add");
                                        $(".vha-ts-accessory .count").text(sSessionData.Accessories.Count);
                                        $(".vha-ts-accessory .vha-ts-cartval .price").text(parseFloat(sSessionData.Accessories.AccessoryMonthlyPrice).toFixed(2));
                                        $(".vha-ts-accessory .vha-ts-a-payinfo .totalprice").text(parseFloat(sSessionData.Accessories.AccessoryPrice).toFixed(2));
                                        $(".vha-ts-accessory .vha-ts-a-payinfo .monthdtl").text(" over " + parseInt($(".vha-ts-a-term.applet-button-active").attr("term")) + " months");
                                        var enddt = new Date;
                                        var sTermEndDate = new Date(enddt.setMonth(enddt.getMonth() + parseInt($(".vha-ts-a-term.applet-button-active").attr("term"))));
                                        sTermEndDate = sTermEndDate.getDate() + "/" + (sTermEndDate.getMonth() + 1) + "/" + sTermEndDate.getFullYear();
                                        var sAccessoryDtl = {
                                            Action: "Add",
                                            Name: "Accessory",
                                            Prod__Integration__Id: "",
                                            StockIndicator: $(".vhatsstockindicator.applet-button-active").text(),
                                            Accessory__Code: accessoryresponse[i]._source.Accessory_Code,
                                            Accessory__Name: accessoryresponse[i]._source.Accessory_Name,
                                            Accessory__RRP__Exc__GST: accessoryresponse[i]._source.RRP_exc_gst,
                                            Accessory__RRP__Inc__GST: accessoryresponse[i]._source.RRP_inc_gst,
                                            Category: accessoryresponse[i]._source.Category,
                                            Prepayment__Amount: "",
                                            vendor: accessoryresponse[i]._source.Vendor,
                                            EligibleOrderLineItem: "Y"
                                        };
                                        for (j = 0; j < tsintitialData.OrderHeader.Accessories.length; j++) {
                                            if (tsintitialData.OrderHeader.Accessories[j].Name == "APP Contract") {
                                                tsintitialData.OrderHeader.Accessories[j].Number__of__Accessories += 1;
                                                tsintitialData.OrderHeader.Accessories[j].Contract__Start__Date = sCurrDate;
                                                tsintitialData.OrderHeader.Accessories[j].Contract__End__Date = sTermEndDate;
                                                tsintitialData.OrderHeader.Accessories[j].Term = $(".vha-ts-a-term.applet-button-active").attr("term");
                                                tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST = parseFloat(parseFloat(tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST) + parseFloat(accessoryresponse[i]._source.RRP_inc_gst)).toFixed(2);
                                                tsintitialData.OrderHeader.Accessories[j].Contract__Amount = tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST;
                                                tsintitialData.OrderHeader.Accessories[j].Monthly__Repayment = mTruncate(parseFloat(tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST / $(".vha-ts-a-term.applet-button-active").attr("term")).toString());
                                                tsintitialData.OrderHeader.Accessories[j].EligibleOrderLineItem = "Y";
                                            }
                                        }
                                        tsintitialData.OrderHeader.Accessories.push(sAccessoryDtl);
                                        $(".tssearchplan").val("");
                                        $("#vha-ts-accsry-stockerrmsg").text();
                                        var sEqpValue = equipmentLimitValidation();
                                        if (sEqpValue > sSessionData.EquipmentLimit) {
                                            var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                                            $("#vha-ts-accsry-equiplmtmsg").text(sErrDtl);
                                        }
                                    }
                                    triggerAccessRemove();
                                }
                            }
                            mSetPrepaymentaccordion();
                        } else {
                            $("#vhaaccessadd").after("<div id='Addlimitcount'>Please select less Accessories and refer the customer to a store to purchase any additional accessories outright</div>");
                        }
                        $("#ts-accessory-model").val("");
                        $("#ts-accessory-cat").val("");
                        $("#vha-ts-accessorylist").val("");
                        $(".vha-rrp-inc-gst").remove();
                        $(".vha-accessory-vendor").remove();
                        $("#ts-accessory-code").val("");
                        $("#ts-accessory-ean").val("");
                    } else {
                        $(".vha-ts-a-paytermbtn").after("<div id='accessmsg'>Please select Payment Term</div>");
                    }
					}	//Visa end 					
                } else {
                    if ($("#vha-ts-accessorylist").val() == "") {
                        $("#vhaaccessadd").after("<div id='showMsgAdd'>Please select accessory</div>");
                    } else {
                        $("#ts-accessory-cat").val("");
                        $("#ts-accessory-model").val("");
                        $("#vha-ts-accessorylist").val("");
                        $(".vha-rrp-inc-gst").remove();
                        $(".vha-accessory-vendor").remove();
                        $("#ts-accessory-code").val("");
                        $("#ts-accessory-ean").val("");
                        $("#vha-ts-accsry-stockerrmsg").text("Selected accessory has been already added to cart, use Edit Quantity option to update count of accessories");
                        $("#vha-ts-accsry-stockerrmsg").addClass("text-danger");
                    }

					
                }
            }
            function shopMultipleAccessory(sProdCd, sPrice) {
                $("#Addlimitcount").empty();
                $("#vha-ts-accsry-equiplmtmsg").text("");
                $("#vha-ts-accsry-stockerrmsg").text("");
                var validlimitpuls = parseInt($(".vha-ts-accessory .count").text());
                if (parseInt(tsintitialData.OrderHeader.Accessories[0].Number__of__Accessories) < 10) {
                    for (i = 0; i < accessoryresponse.length; i++) {
                        if (accessoryresponse[i]._source.Accessory_Code == sProdCd) {
                            var sAsryStockChk = {
                                ErrorCode: "",
                                StockBand: "",
                                ErrorMsg: ""
                            };
                            if ($(".vhatsstockindicator.applet-button-active").text() == "Out of Stock") {
                                var sQtyCnt = parseInt($("#quantity[prodcd='" + sProdCd + "']").text());
                                var sAccessoryInp = "";
                                for (j = 0; j < sQtyCnt + 1; j++) {
                                    if (sAccessoryInp == "") {
                                        sAccessoryInp = accessoryresponse[i]._source.Accessory_Code + ";" + accessoryresponse[i]._source.Accessory_Name;
                                    } else {
                                        sAccessoryInp += "|" + accessoryresponse[i]._source.Accessory_Code + ";" + accessoryresponse[i]._source.Accessory_Name;
                                    }
                                }
                                sAsryStockChk = ProcessCheckStock("AccessoryItem", sAccessoryInp);
                            }
                            if (sAsryStockChk.StockBand == "Non-Orderable" || sAsryStockChk.ErrorCode == "1001") {
                                var sErrDtl = "The selected device with product code '" + sProdCd + "' is not available for deferred ordering. Please select another device to proceed.";
                                $("#vha-ts-accsry-stockerrmsg").text(sErrDtl);
                                $(".vha-ts-device-select #vha-ts-d-stockerrmsg").removeClass("text-warning").addClass("text-danger");
                                $("#ts-accessory-cat").val("");
                                $("#ts-accessory-model").val("");
                                $("#vha-ts-accessorylist").val("");
                                $("#ts-accessory-code").val("");
                                $("#ts-accessory-ean").val("");
                            } else {
                                if (!(sAsryStockChk.StockBand == "Available" || $(".vhatsstockindicator.applet-button-active").text() == "In Stock")) {
                                    var sErrDtl = "Stock availability and/or Estimated Shipment Date (ESD) check failed. Please check stock and/or ESD manually and raise a Siebel Support ticket if you continue to receive this error.";
                                    $("#vha-ts-accsry-stockerrmsg").text(sErrDtl);
                                    $(".vha-ts-device-select #vha-ts-d-stockerrmsg").addClass("text-warning").removeClass("text-danger");
                                }
                                $("#quantity[prodcd='" + sProdCd + "']").text(parseInt($("#quantity[prodcd='" + sProdCd + "']").text()) + 1);
                                updateSessionDetails(parseFloat(parseFloat(accessoryresponse[i]._source.RRP_inc_gst)).toFixed(2), "AccessoryCost", "Add");
                                accssorycount = accssorycount + 1;
                                Totalcountvalue(devicecount, plancount, secdevice, accssorycount);
                                $(".vha-ts-accessory .vha-ts-cartval .price").text(parseFloat(sSessionData.Accessories.AccessoryMonthlyPrice).toFixed(2));
                                $(".vha-ts-accessory .count").text(sSessionData.Accessories.Count);
                                $(".vha-ts-accessory .vha-ts-a-payinfo .totalprice").text(parseFloat(sSessionData.Accessories.AccessoryPrice).toFixed(2));
                                $(".vha-ts-accessory .vha-ts-a-payinfo .monthdtl").text(" over " + parseInt($(".vha-ts-a-term.applet-button-active").attr("term")) + " months");
                                var enddt = new Date;
                                var sTermEndDate = new Date(enddt.setMonth(enddt.getMonth() + parseInt($(".vha-ts-a-term.applet-button-active").attr("term"))));
                                sTermEndDate = sTermEndDate.getDate() + "/" + (sTermEndDate.getMonth() + 1) + "/" + sTermEndDate.getFullYear();
                                var sAccessoryDtl = {
                                    Action: "Add",
                                    Name: "Accessory",
                                    Prod__Integration__Id: "",
                                    StockIndicator: $(".vhatsstockindicator.applet-button-active").text(),
                                    Accessory__Code: accessoryresponse[i]._source.Accessory_Code,
                                    Accessory__Name: accessoryresponse[i]._source.Accessory_Name,
                                    Accessory__RRP__Exc__GST: accessoryresponse[i]._source.RRP_exc_gst,
                                    Accessory__RRP__Inc__GST: accessoryresponse[i]._source.RRP_inc_gst,
                                    Category: accessoryresponse[i]._source.Category,
                                    vendor: accessoryresponse[i]._source.Vendor,
                                    Prepayment__Amount: 0,
                                    EligibleOrderLineItem: "Y"
                                };
                                for (j = 0; j < tsintitialData.OrderHeader.Accessories.length; j++) {
                                    if (tsintitialData.OrderHeader.Accessories[j].Name == "APP Contract") {
                                        tsintitialData.OrderHeader.Accessories[j].Number__of__Accessories += 1;
                                        tsintitialData.OrderHeader.Accessories[j].Contract__Start__Date = sCurrDate;
                                        tsintitialData.OrderHeader.Accessories[j].Contract__End__Date = sTermEndDate;
                                        tsintitialData.OrderHeader.Accessories[j].Term = $(".vha-ts-a-term.applet-button-active").attr("term");
                                        tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST = parseFloat(parseFloat(tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST) + parseFloat(accessoryresponse[i]._source.RRP_inc_gst)).toFixed(2);
                                        tsintitialData.OrderHeader.Accessories[j].Contract__Amount = tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST;
                                        tsintitialData.OrderHeader.Accessories[j].Monthly__Repayment = mTruncate(parseFloat(tsintitialData.OrderHeader.Accessories[j].Total__Accessories__RRP__Inc__GST / $(".vha-ts-a-term.applet-button-active").attr("term")).toString());
                                        tsintitialData.OrderHeader.Accessories[j].EligibleOrderLineItem = "Y";
                                    }
                                }
                                tsintitialData.OrderHeader.Accessories.push(sAccessoryDtl);
                                $(".tssearchplan").val("");
                                $("#vha-ts-accsry-stockerrmsg").text();
                                var sEqpValue = equipmentLimitValidation();
                                if (sEqpValue > sSessionData.EquipmentLimit) {
                                    var sErrDtl = "The Total Contract Amount Value ($ " + sEqpValue + ") exceeds equipment limit: ($ " + parseFloat(sSessionData.EquipmentLimit).toFixed(2) + ") by ($ " + parseFloat(sEqpValue - sSessionData.EquipmentLimit).toFixed(2) + "). Kindly add device/accessory plan within the approved limit or Check for prepayment option if available";
                                    $("#vha-ts-accsry-equiplmtmsg").text(sErrDtl);
                                }
                                mSetPrepaymentaccordion();
                            }
                            triggerAccessRemove();
                        }
                    }
                } else {
                    $("#vhaaccessadd").after("<div id='Addlimitcount'>Please select less Accessories and refer the customer to a store to purchase any additional accessories outright</div>");
                    $("#ts-accessory-cat").val("");
                    $("#ts-accessory-model").val("");
                    $("#vha-ts-accessorylist").val("");
                    $("#ts-accessory-code").val("");
                    $("#ts-accessory-ean").val("");
                }
            }
            var terminateGPPUpd = function () {
                var iLen = tsintitialData.OrderHeader.gppdevicecontractdel.length;
                var iMaxPri = $("#vhatsremqplimit").text().split("$")[1];
                for (var k = 0; k < iLen; k++) {
                    if (tsintitialData.OrderHeader.gppdevicecontractdel[k].EligibleOrderLineItem == "Y") {
                        iMaxPri = parseFloat(iMaxPri) + parseFloat(tsintitialData.OrderHeader.gppdevicecontractdel[k].MaxPrice);
                    }
                }
                var iUpdMaxPri = parseFloat(iMaxPri).toFixed(2);
                $("#vhatsupdremqplimit").text("$" + iUpdMaxPri);
                sSessionData.EquipmentLimit = iUpdMaxPri;
            };
            var terminateGPPDisp = function () {
                $(".vha-ts-terminate").click(function () {
					//Added for PKE000000112310 || Device 'Pay out' fee Reflecting on NSA and Siebel order (Under Charges Section) is Different
                    if ($(this).text() == "Terminate") {
						const numberDiv = $(this).prev('.vha-ts-cartval');
						if (numberDiv.length) {
							var b=numberDiv.text().trim();
							TerminateValueCart +=Number(b.match(/\d+(\.\d+)?/g)[0]);
					//Added for PKE000000112310 || Device 'Pay out' fee Reflecting on NSA and Siebel order (Under Charges Section) is Different
						}
                        $(this).text("Revert");
                        var sidSplit0 = $(this).attr("id").split("%")[0];
                        var sidSplit1 = $(this).attr("id").split("%")[1];
                        tsintitialData.OrderHeader.gppdevicecontractdel.push({
                            Action: "Delete",
                            Name: "GPP Device Contract",
                            Prod__Integration__Id: sidSplit0,
                            MaxPrice: sidSplit1,
                            EligibleOrderLineItem: "Y"
                        });
                        currentGPPCnt -= 1;
                    } else {
						//Added for PKE000000112310 || Device 'Pay out' fee Reflecting on NSA and Siebel order (Under Charges Section) is Different
						const numberDiv = $(this).prev('.vha-ts-cartval');
						if (numberDiv.length) {
							var b=numberDiv.text().trim();
							TerminateValueCart = parseFloat((TerminateValueCart-Number(b.match(/\d+(\.\d+)?/g)[0])).toFixed(2));
						//Added for PKE000000112310 || Device 'Pay out' fee Reflecting on NSA and Siebel order (Under Charges Section) is Different
						}
                        $(this).text("Terminate");
                        var x = $(this).attr("id").split("%")[0];
                        var z = $(this).attr("id").split("%")[1];
                        $.each(tsintitialData.OrderHeader.gppdevicecontractdel, function (index, value) {
                            y = tsintitialData.OrderHeader.gppdevicecontractdel[index].Prod__Integration__Id;
                            if (x == y) {
                                tsintitialData.OrderHeader.gppdevicecontractdel.splice(index, 1);
                                return false;
                            }
                        });
                        currentGPPCnt += 1;
                    }
                    mSetPrepaymentaccordion();
                    terminateGPPUpd();
                });
            };
            return VHATSUpgradeViewPR;
        }
        ();
        return "SiebelAppFacade.VHATSUpgradeViewPR";
    });
};

