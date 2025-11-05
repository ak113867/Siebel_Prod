if (typeof SiebelAppFacade.VHANSA3StepUpgradePR_PDF === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHANSA3StepUpgradePR_PDF");
    define("siebel/custom/VHANSA3StepUpgradePR_PDF", [
        "siebel/phyrenderer",
        "siebel/custom/pdfLibrary/jspdf.min"
    ], function() {
        SiebelAppFacade.VHANSA3StepUpgradePR_PDF = (function() {
            function VHANSA3StepUpgradePR_PDF(pm) {
                SiebelAppFacade.VHANSA3StepUpgradePR_PDF.superclass.constructor.apply(
                    this,
                    arguments
                );
            }

            SiebelJS.Extend(
                VHANSA3StepUpgradePR_PDF,
                SiebelAppFacade.PhysicalRenderer
            );

            VHANSA3StepUpgradePR_PDF.prototype.Init = function() {
                // Init is called each time the object is initialised.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHANSA3StepUpgradePR_PDF.superclass.Init.apply(
                    this,
                    arguments
                );
                // Add code here that should happen after default processing
            };

			//Defining Styles
            var metaData = {
                logo: {
                    width: 38,
                    height: 9
                },
                fontSize: {
					seven: 7,
					eight: 8,
                    nine: 9,
					ten: 10,
                    large: 20
                },
                textStyle: {
                    bold: "bold",
                    normal: "normal"
                },
                backgroundColor: {
                    red: "#e60000",
                    white: "#ffffff",
                    black: "#000000"
                },
                textColor: {
                    red: "#e60000",
					white: "#ffffff",
                    black: "#000000"                   
                },
                pageMargin: {
                    left: 10,
                    right: 10,
					left9: 9
                },
                lineSpace: {
                    vertical: 7,
                    vertical2: 4
                },
	            tableRight: {
                    cellHeight: 21.4,
                    cellWidth1: 38,
                    cellWidth2: 52,
					cellWidth3: 23,
					cellWidth4: 67
                },
            };
			
            VHANSA3StepUpgradePR_PDF.prototype.ShowUI = function() {
                // ShowUI is called when the object is initially laid out.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHANSA3StepUpgradePR_PDF.superclass.ShowUI.apply(
                    this,
                    arguments
                );
                // Add code here that should happen after default processing
				
				//var sStagingId = "3-CM2DF83";
				var sTransType  = "";
				
				//Calling BS to fetch input
				//var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				//var Inputs = SiebelApp.S_App.NewPropertySet();
				//Inputs.SetProperty("Service Name", "VHA Generate Contract Service");
				//Inputs.SetProperty("Method Name", "GenerateNSAContractForUpgrade");
				
				/*var child = SiebelApp.S_App.NewPropertySet();
				var ListOfOrderHeader = SiebelApp.S_App.NewPropertySet();
				var OrderHeader = SiebelApp.S_App.NewPropertySet();
				var ListOfOrderItem = SiebelApp.S_App.NewPropertySet();
				var OrderItem = SiebelApp.S_App.NewPropertySet();
				var ListOfAttr = SiebelApp.S_App.NewPropertySet();
				var Attr = SiebelApp.S_App.NewPropertySet();
				var ListOfPrepaymentInfo = SiebelApp.S_App.NewPropertySet();
				var PrepaymentInfo = SiebelApp.S_App.NewPropertySet();
				OrderHeader.SetProperty("GPPCharge","40");
				OrderHeader.SetProperty("ETC","50");
				OrderHeader.SetProperty("VFDealerRowId","2-LJBODD");
				OrderHeader.SetProperty("VFSalesChannelDescription","DIS");
				OrderHeader.SetProperty("VFSalesBranchDescription","120002 - Ausasean Telecomms So");
				OrderHeader.SetProperty("UpgradeOfferType","Upgrade to New Plan");
				OrderHeader.SetProperty("HeaderId","3-CM2DF83");
				OrderHeader.SetProperty("Shared","Y");
				OrderHeader.SetType("OrderHeader");
				ListOfOrderHeader.SetType("ListOfOrderHeader");					
					
					PrepaymentInfo.SetProperty("TotalPrepaymentAmount","103");
					PrepaymentInfo.SetType("PrepaymentInfo");
					ListOfPrepaymentInfo.AddChild(PrepaymentInfo.Clone());
					
					OrderItem.SetProperty("Action","Add");
					OrderItem.SetProperty("Name","GPP Device Contract");
					OrderItem.SetType("OrderItem");	
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Contract Amount");
						Attr.SetProperty("Value","1399");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","IMEI/Serial Number");
						Attr.SetProperty("Value","");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Item Name");
						Attr.SetProperty("Value","IPHONE8 PLUS 256GBRED");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Monthly Repayment");
						Attr.SetProperty("Value","116.58");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Term");
						Attr.SetProperty("Value","12");
						ListOfAttr.AddChild(Attr.Clone());
				ListOfAttr.SetType("ListOfAttr");
				OrderItem.AddChild(ListOfAttr.Clone());
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Name","Device");
				OrderItem.SetProperty("StockIndicator","Out of Stock");
				OrderItem.SetType("OrderItem");	
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Device Code");
						Attr.SetProperty("Value","MRT82X/A");
						ListOfAttr.AddChild(Attr.Clone());
				ListOfAttr.SetType("ListOfAttr");
				OrderItem.AddChild(ListOfAttr.Clone());
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Name","Accessory");
				OrderItem.SetProperty("StockIndicator","Out of Stock");
				OrderItem.SetProperty("Field Value","1");
				OrderItem.SetType("OrderItem");	
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Accessory Name");
						Attr.SetProperty("Value","iPhone5 Lightning -30-pin 0.2M");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Accessory RRP Inc GST");
						Attr.SetProperty("Value","40.91");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Category");
						Attr.SetProperty("Value","Cables");
						ListOfAttr.AddChild(Attr.Clone());	
				ListOfAttr.SetType("ListOfAttr");
				OrderItem.AddChild(ListOfAttr.Clone());
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Name","Accessory");
				OrderItem.SetProperty("StockIndicator","InStock");
				OrderItem.SetProperty("Field Value","1");
				OrderItem.SetType("OrderItem");	
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Accessory Name");
						Attr.SetProperty("Value","Samsung Case");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Accessory RRP Inc GST");
						Attr.SetProperty("Value","90");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Category");
						Attr.SetProperty("Value","Case");
						ListOfAttr.AddChild(Attr.Clone());	
				ListOfAttr.SetType("ListOfAttr");
				OrderItem.AddChild(ListOfAttr.Clone());
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Name","APP Contract");
				OrderItem.SetProperty("Field Value","1");
				OrderItem.SetType("OrderItem");	
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Monthly Repayment");
						Attr.SetProperty("Value","11.25");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Contract Amount");
						Attr.SetProperty("Value","45");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Category");
						Attr.SetProperty("Value","Accessory");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","IMEI");
						Attr.SetProperty("Value","");
						ListOfAttr.AddChild(Attr.Clone());	
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Term");
						Attr.SetProperty("Value","12");
						ListOfAttr.AddChild(Attr.Clone());
				ListOfAttr.SetType("ListOfAttr");
				OrderItem.AddChild(ListOfAttr.Clone());
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Name","Accessory");
				OrderItem.SetProperty("StockIndicator","InStock");
				OrderItem.SetProperty("Field Value","2");
				OrderItem.SetType("OrderItem");	
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Accessory Name");
						Attr.SetProperty("Value","AW Nike+ GPS+Cel 42 Sp Grey Anthr Band");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Accessory RRP Inc GST");
						Attr.SetProperty("Value","300");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Category");
						Attr.SetProperty("Value","Secondary Device");
						ListOfAttr.AddChild(Attr.Clone());	
				ListOfAttr.SetType("ListOfAttr");
				OrderItem.AddChild(ListOfAttr.Clone());
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Name","APP Contract");
				OrderItem.SetProperty("Field Value","2");
				OrderItem.SetType("OrderItem");	
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Monthly Repayment");
						Attr.SetProperty("Value","12.5");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Contract Amount");
						Attr.SetProperty("Value","300");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Category");
						Attr.SetProperty("Value","Secondary Device");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","IMEI");
						Attr.SetProperty("Value","35678908765211");
						ListOfAttr.AddChild(Attr.Clone());	
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Term");
						Attr.SetProperty("Value","24");
						ListOfAttr.AddChild(Attr.Clone());
				ListOfAttr.SetType("ListOfAttr");
				OrderItem.AddChild(ListOfAttr.Clone());
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Type","Early Upgrade Fee Rollover");
				OrderItem.SetProperty("Period","12");
				OrderItem.SetType("OrderItem");					
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Type","Addon");
				OrderItem.SetProperty("Name","1GB Extra Data");
				OrderItem.SetProperty("GPI","Bonus Data");
				OrderItem.SetProperty("ProductId","XMN");
				OrderItem.SetProperty("MaxPrice","5.80");
				OrderItem.SetProperty("SAMId","NMX");
				OrderItem.SetType("OrderItem");					
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Type","Addon");
				OrderItem.SetProperty("Name","Data AddOn 2GB");
				OrderItem.SetProperty("GPI","Bonus Data");
				OrderItem.SetProperty("ProductId","1-9BPUICL");
				OrderItem.SetProperty("MaxPrice","6");
				OrderItem.SetProperty("SAMId","AUX0493");
				OrderItem.SetType("OrderItem");					
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Type","Addon");
				OrderItem.SetProperty("Name","3GB Data");
				OrderItem.SetProperty("GPI","Add on");
				OrderItem.SetProperty("ProductId","XMN4");
				OrderItem.SetProperty("MaxPrice","6.80");
				OrderItem.SetProperty("SAMId","NMX4");
				OrderItem.SetType("OrderItem");					
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Type","Recurring Discount");
				OrderItem.SetProperty("Name","Recurring Trade-in 1 GST Excl");
				OrderItem.SetProperty("GPI","Recurring Discount");
				OrderItem.SetProperty("ProductId","XMN2");
				OrderItem.SetProperty("MaxPrice","");
				OrderItem.SetProperty("SAMId","NMX2");
				OrderItem.SetType("OrderItem");	
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Amount");
						Attr.SetProperty("Value","24");
						ListOfAttr.AddChild(Attr.Clone());
					Attr.SetType("Attr");
						Attr.SetProperty("Name","Period");
						Attr.SetProperty("Value","1");
						ListOfAttr.AddChild(Attr.Clone());
				ListOfAttr.SetType("ListOfAttr");
				OrderItem.AddChild(ListOfAttr.Clone());				
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Type","Recurring Discount");
				OrderItem.SetProperty("Name","VIP Discount - 5% off Monthly Access Fee");
				OrderItem.SetProperty("GPI","Recurring Discount");
				OrderItem.SetProperty("ProductId","2-CQJOBJP");
				OrderItem.SetProperty("MaxPrice","");
				OrderItem.SetProperty("SAMId","AUX1414");
				OrderItem.SetProperty("ServicePrice","5");
				OrderItem.SetType("OrderItem");					
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				Attr = SiebelApp.S_App.NewPropertySet();
				ListOfAttr = SiebelApp.S_App.NewPropertySet();
				OrderItem = SiebelApp.S_App.NewPropertySet();
				OrderItem.SetProperty("Action","Add");
				OrderItem.SetProperty("Type","Insurance");
				OrderItem.SetProperty("Name","Phone Insurance");
				OrderItem.SetType("OrderItem");					
				ListOfOrderItem.AddChild(OrderItem.Clone());
				
				ListOfOrderItem.SetType("ListOfOrderItem");				
				OrderHeader.AddChild(ListOfOrderItem.Clone());
				ListOfPrepaymentInfo.SetType("ListOfPrepaymentInfo");
				OrderHeader.AddChild(ListOfPrepaymentInfo.Clone());
				ListOfOrderHeader.AddChild(OrderHeader.Clone());
				
				child.AddChild(ListOfOrderHeader);
				Inputs.AddChild(child);*/
				
				//var Output = ser.InvokeMethod("Run Process", Inputs);
				//var resultset = Output.GetChildByType("ResultSet");

                /*var pm = this.GetPM();
                var IAAppletId = pm.Get("GetFullId");
				
                $("#" + IAAppletId).html(getHtmlTemplate());*/
                //createPDF(resultset,sTransType);
            };

            var getHtmlTemplate = function() {
                return '<iframe id="pdf_preview" type="application/pdf" src=""></iframe>';
            }

            VHANSA3StepUpgradePR_PDF.prototype.BindData = function(bRefresh) {
                // BindData is called each time the data set changes.
                // This is where you'll bind that data to user interface elements you might have created in ShowUI
                // Add code here that should happen before default processing
                SiebelAppFacade.VHANSA3StepUpgradePR_PDF.superclass.BindData.apply(
                    this,
                    arguments
                );
                // Add code here that should happen after default processing
            };

            VHANSA3StepUpgradePR_PDF.prototype.BindEvents = function() {
                // BindEvents is where we add UI event processing.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHANSA3StepUpgradePR_PDF.superclass.BindEvents.apply(
                    this,
                    arguments
                );
                // Add code here that should happen after default processing
            };

            VHANSA3StepUpgradePR_PDF.createPDF = function(resultset,sTransType,TerminateValueCart,pegaoffDataGlob,pegaflag,dis_samid_flag) {
            	console.log("createPDF");
            	var apMap = SiebelApp.S_App.GetActiveView().GetAppletMap();		
            	console.log(apMap);		
				//var pm = this.GetPM();
                var IAAppletId = apMap["VHA NSA Upgrade Applet"].GetFullId();				
                //$("#" + IAAppletId).html(getHtmlTemplate());

				//var pm = this.GetPM();
                //var IAAppletId = pm.Get("GetFullId");
				
                $("#" + IAAppletId).html(getHtmlTemplate());
				
                var x = metaData.pageMargin.left;
                var y = metaData.lineSpace.vertical;
				//Initializing jsPDF
                var doc = new jsPDF({
                    orientation: "p",
                    unit: "mm",
                    format: "a4",
                    putOnlyUsedFonts: true,
                    floatPrecision: 16
                });				
				
				var SiebMessage = resultset.GetChildByType("SiebelMessage");			
				//Start: Fetching Header details
				var Header = SiebMessage.GetChild(0).GetChild(0);
				
				//Fetching Header data
				var sCustomerName = Header.GetProperty("CustomerName");
				var sRegisteredCompany = Header.GetProperty("RegisteredCompany");
				var sABNACN = Header.GetProperty("ABNACN");
				var sDate = Header.GetProperty("Date");
				var sDOM = Header.GetProperty("DOM");
				var sBAN = Header.GetProperty("BAN");
				var sConnectionType = Header.GetProperty("ConnectionType");
				var sDeliveryAddress = Header.GetProperty("DeliveryAddress");
				var sVodRepName = Header.GetProperty("VodRepName");
				var sCustName = Header.GetProperty("CANameNoTitle");
				var sDealerCd = Header.GetProperty("DealerCd");	
			    SiebelApp.S_App.SetProfileAttr("VFDeliveryAddr", sDeliveryAddress); //Ravindra: 14/02/2024: Added for FEB release PKE
				
				//Fetching Service data
				var ServiceOrder = Header.GetChild(0).GetChild(0);
				var sShared = ServiceOrder.GetProperty("Shared");
				var sMSISDN = ServiceOrder.GetProperty("MSISDN");			
				var sOrderRef = ServiceOrder.GetProperty("OrderRef");
				var sServiceOrderID = ServiceOrder.GetProperty("ServiceOrderID");
				var sFulfilmentRef = ServiceOrder.GetProperty("FulfilmentRef");
				var sPlan = ServiceOrder.GetProperty("Plan");
				var sPlanTerm = ServiceOrder.GetProperty("PlanTerm");
				var sPlanVal = ServiceOrder.GetProperty("PlanVal");
				var sSIM = ServiceOrder.GetProperty("SIM");
				var sEarlyUpgradeFee = ServiceOrder.GetProperty("EarlyUpgradeFee");
				var sDevicePayoutFee = ServiceOrder.GetProperty("DevicePayoutFee");
				var sNPEYFee = ServiceOrder.GetProperty("NPEYFee");
				var sBaseData = ServiceOrder.GetProperty("BaseData");
				var sBonusData = ServiceOrder.GetProperty("BonusData");
				var sSharedData = ServiceOrder.GetProperty("SharedData");
				var sIntZone1 = ServiceOrder.GetProperty("IntZone1");
				var sIntZone2 = ServiceOrder.GetProperty("IntZone2");
				var sDeferredService = ServiceOrder.GetProperty("Deferred Service");
				if (sDeferredService != "Y") sDeliveryAddress = "NA";
				
				//Defining NSA and Vodafone Logo
                var pageHeight = doc.internal.pageSize.height;
                doc.setFontSize(metaData.fontSize.large);
                doc.setFontStyle(metaData.textStyle.bold);
				doc.text("Network Services Agreement", x, y + 3);
                doc.setFontSize(metaData.fontSize.ten);
				doc.setFontStyle(metaData.textStyle.normal);
                doc.addImage(
                    loadImage(),
                    "PNG",
                    x + 150,
                    y - 2,
                    metaData.logo.width,
                    metaData.logo.height
                );
				
				//Defining Customer Name
                y += metaData.logo.height + 5;
				var initialYvalue = y;
                doc.setFontSize(metaData.fontSize.ten);
				doc.setFontStyle(metaData.textStyle.bold);
				doc.text(sCustomerName, x, y);
				doc.setFontStyle(metaData.textStyle.normal);
				doc.text(sRegisteredCompany, x, y += metaData.lineSpace.vertical);
				doc.text(sABNACN, x, y += metaData.lineSpace.vertical);
				
				var AfterCustomerValue = y;
				y = initialYvalue;
				
				//Defining Connection Information
				var dataSet = [{
						label: "Date",
						value: sDate
					},
					{
						label: "Billing Cycle Day",
						value: sDOM
					},
					{
						label: "Shared Service",
						value: sShared
					},
					{
						label: "Connection Type",
						value: sConnectionType
					}
				];
				
				//Filling Connection Information
                var response = fillConnectionInformation(doc, dataSet, {
                    x,
                    y,
                    metaData
                });
                doc = response.doc;
                x = response.x;
                y = response.y;

                x = metaData.pageMargin.left;
                initialYvalue = y;
				
				//Defining Order Information
				var dataSet = [
					[{						
						label: "",
						value: ""
					},
					{
						label: "",
						value: ""
					}],
					[{
							label: "Mobile Number",
							value: sMSISDN
						},
						{
							label: "Account Number",
							value: sBAN
						},
						{
							label: "Order Ref",
							value: sOrderRef
						},
						{
							label: "Fulfilment Ref",
							value: sFulfilmentRef
						}
					],
					[{
							label: "Plan",
							value: sPlan
						},
												{
							label: "Plan Value",
							value: sPlanVal
						},
						{
							label: "Plan Term",
							value: sPlanTerm
						},
						{
							label: "SIM Number",
							value: sSIM
						}
					],
					[{
							label: "Early Upgrade Fee",
							value: sEarlyUpgradeFee
						},
						{
							label: "Device Payout Fee",
							value: sDevicePayoutFee
						},
						{
							label: "NPEY Fee",
							value: sNPEYFee
						}
					]
				];
					
				//Filling Order Information Delivery Address
				var FurtherRow = "", Furthertemp = "";
				var col = ["Delivery Address"]
				var emptyrows = [];
				FurtherRow = [{
								value1: ""
							}];
				FurtherRow.forEach(element => {      
				Furthertemp = [element.value1];
				emptyrows.push(Furthertemp);
				});	
				doc.autoTable(col, emptyrows, { startY: (number = y),
				margin: { left: metaData.pageMargin.left9 },
				tableWidth: 32,
				columnStyles: {
						0: {
							columnWidth: 32,
							fillColor: [255, 255, 255]
						}
					},
					headStyles: {
						fillColor: [255, 255, 255],
						textColor: "black",
						fontSize: metaData.fontSize.nine
					},
					bodyStyles: {
						fillColor: [255, 255, 255],
						textColor: "black",
						fontSize: metaData.fontSize.nine
					}
				});		
				
				var FurtherRow = "", Furthertemp = "";
				var col = [""]
				var emptyrows = [];
				FurtherRow = [{
								value1: sDeliveryAddress
							}];
				FurtherRow.forEach(element => {      
				Furthertemp = [element.value1];
				emptyrows.push(Furthertemp);
				});	
				doc.autoTable(col, emptyrows, { startY: (number = y-7),
				margin: { left: 41 },
				tableWidth: 68,
				columnStyles: {
						0: {
							columnWidth: 68,
							fillColor: [255, 255, 255]
						}
					},
					headStyles: {
						fillColor: [255, 255, 255],
						textColor: "black",
						fontSize: metaData.fontSize.nine
					},
					bodyStyles: {
						fillColor: [255, 255, 255],
						textColor: "black",
						fontSize: metaData.fontSize.nine
					}
				});	
				
				doc.setDrawColor("black");
				//Filling Order Information
                var response = fillOrderInformation(doc, dataSet, sTransType, {
                    x,
                    y,
                    metaData
                });

                doc = response.doc;
                x = response.x;
                y = response.y;
				
				var AfterOrderValue = y;
				y = initialYvalue;
				
                doc.printingHeaderRow = true;

                var cellHeight = metaData.tableRight.cellHeight;
                var cellWidth1 = metaData.tableRight.cellWidth1;
                var cellWidth2 = metaData.tableRight.cellWidth2;
				var cellWidth3 = metaData.tableRight.cellWidth3;
				var cellWidth4 = metaData.tableRight.cellWidth4;
				
			//Defining Entitlement Information		  
			var entitlementData = [{
					label: "Base Data",
					value: sBaseData
				},
				{
					label: "Bonus Data",
					value: sBonusData
				},
				{
					label: "Total Shareable Data",
					value: sSharedData
				},
				{
					label: "Int.Zone 1",
					value: sIntZone1
				},
				{
					label: "Int.Zone 2",
					value: sIntZone2
				}
			];

			var config = {
				x,
				y,
				cellHeight,
				cellWidth1,
				cellWidth2,
				cellWidth3,
				cellWidth4,
				metaData
			};
			
			//Filling Entitlement Information
			var response = fillEntitlementInformation(doc, entitlementData, sTransType, config);
			doc = response.doc;
			x = response.x;
			y = response.y;
					
			//Variable declaration
			var GPP = "N", Disc = "N", LDisc = "N", BDisc = "N", CDisc = "N", PSDPP = "N", DPP = "N", SDPP = "N", AccessoryPP = "N", RolloverPP = "N", AddonPP = "N", PrevDisc = "N";
			var Column1 = "", Column2 = "", Column3 = "", Column4 = "", Column5 = "", Column6 = "";
			var FurtherRow = "", Furthertemp = "";				
			
			//Fetching products and discounts
			var SerOrdCnt = ServiceOrder.GetChildCount();			
			if (SerOrdCnt > 0) {
			var Devicerows = [];
			var SDevicerows = [];
			//Fetching Device
			if (ServiceOrder.GetChildByType("ListOfDevice"))	{
				var DeviceCnt = ServiceOrder.GetChildByType("ListOfDevice").GetChildCount();
				if (DeviceCnt > 0) {
					PSDPP = "Y";
					DPP = "Y";
					var Device = 0;
					var DeviceProp = SiebelApp.S_App.NewPropertySet();					
					for (Device = 0; Device < DeviceCnt; Device++) {
						DeviceProp = ServiceOrder.GetChildByType("ListOfDevice").GetChild(Device);
						Column1 = DeviceProp.GetProperty("Name");
						Column2 = DeviceProp.GetProperty("IMEI");
						Column3 = DeviceProp.GetProperty("MonthlyRepayment");
						Column4 = DeviceProp.GetProperty("Term");
						Column5 = DeviceProp.GetProperty("Price");
						Column6 = DeviceProp.GetProperty("Insurance");
						FurtherRow = [{
										value1: Column1,
										value2: Column2,
										value3: Column3,
										value4: Column4,
										value5: Column5,
										value6: Column6
									}];
						FurtherRow.forEach(element => {      
						Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5,element.value6];
						Devicerows.push(Furthertemp);
						});
					}
				}
			}//if (ServiceOrder.GetChildByType("ListOfDevice"))
			
			//Fetching Secondary Device
			if (ServiceOrder.GetChildByType("ListOfSecondaryDevice"))	{
				var SDeviceCnt = ServiceOrder.GetChildByType("ListOfSecondaryDevice").GetChildCount();
				if (SDeviceCnt > 0) {
					PSDPP = "Y";
					SDPP = "Y";
					var SDevice = 0;
					var SDeviceProp = SiebelApp.S_App.NewPropertySet();					
					for (SDevice = 0; SDevice < SDeviceCnt; SDevice++) {
						SDeviceProp = ServiceOrder.GetChildByType("ListOfSecondaryDevice").GetChild(SDevice);
						Column1 = SDeviceProp.GetProperty("Name");
						Column2 = SDeviceProp.GetProperty("IMEI");
						Column3 = SDeviceProp.GetProperty("MonthlyRepayment");
						Column4 = SDeviceProp.GetProperty("Term");
						Column5 = SDeviceProp.GetProperty("Price");
						Column6 = SDeviceProp.GetProperty("Insurance");
						FurtherRow = [{
										value1: Column1,
										value2: Column2,
										value3: Column3,
										value4: Column4,
										value5: Column5,
										value6: Column6
									}];
						FurtherRow.forEach(element => {      
						Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5,element.value6];
						SDevicerows.push(Furthertemp);
						});
					}
				}
			}//if (ServiceOrder.GetChildByType("ListOfSecondaryDevice"))
			
			//Printing Primary and Secondary Device
			if (PSDPP == "Y") {					
				var col = ["Device", "IMEI", "Device Monthly Payment", "Device Payment Terms", "Device Cost", "Device Care"]
				var emptyrows = [];
				FurtherRow = [{
								value1: "",
								value2: "",
								value3: "",
								value4: "",
								value5: "",
								value6: ""
							}];
				FurtherRow.forEach(element => {      
				Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5,element.value6];
				emptyrows.push(Furthertemp);
				});	
				var Modifiedrows = [];
				if (DPP == "Y") {
					Modifiedrows = Devicerows;
				}else Modifiedrows = emptyrows;
				doc.autoTable(col, Modifiedrows, { startY: (number = y += metaData.lineSpace.vertical2),
				margin: { left: x },
				tableWidth: 190,
				columnStyles: {
						0: {
							columnWidth: 50,
							fillColor: [255, 255, 255]
						},
						1: {
							columnWidth: 30,
							fillColor: [255, 255, 255]
						},
						2: {
							columnWidth: 30,
							fillColor: [255, 255, 255]
						},
						3: {
							columnWidth: 25,
							fillColor: [255, 255, 255]
						},
						4: {
							columnWidth: 30,
							fillColor: [255, 255, 255]
						},
						5: {
							columnWidth: 25,
							fillColor: [255, 255, 255]
						}
					},
					headStyles: {
						fillColor: [0, 0, 0],
						textColor: "white",
						fontSize: metaData.fontSize.eight
					},
					bodyStyles: {
						fillColor: [255, 255, 255],
						textColor: "black",
						fontSize: metaData.fontSize.eight
					}
				});	
				y = doc.lastAutoTable.finalY;				
				if (DPP == "N") {
					y = y-6;
				}
				if (SDPP == "Y")
				{
					if (DPP == "Y") {
						y = y + 1;
						doc.setDrawColor("black");
						doc.line(x, y, x + 190, y);							
						y = y + 1;
					}
					var col = ["Secondary Device", "", "", "", "", ""]
					doc.autoTable(col, SDevicerows, { startY: (number = y),
					margin: { left: x },
					tableWidth: 190,
					columnStyles: {
							0: {
								columnWidth: 50,
								fillColor: [255, 255, 255]
							},
							1: {
								columnWidth: 30,
								fillColor: [255, 255, 255]
							},
							2: {
								columnWidth: 30,
								fillColor: [255, 255, 255]
							},
							3: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							4: {
								columnWidth: 30,
								fillColor: [255, 255, 255]
							},
							5: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							}
						},
						headStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						},
						bodyStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						}
					});	
					y = doc.lastAutoTable.finalY;
				}//if (SDPP == "Y")						
			}//if (PSDPP == "Y")
			//Printing Primary and Secondary Device
			
			var Accessoryrows = [];
			var Rolloverrows = [];
			var Addonrows = [];
			//Fetching Accessories
			if (ServiceOrder.GetChildByType("ListOfAccessory"))	{
				var AccessoryCnt = ServiceOrder.GetChildByType("ListOfAccessory").GetChildCount();
				if (AccessoryCnt > 0) {
					GPP = "Y";
					AccessoryPP = "Y";
					var Accessory = 0;
					var AccessoryProp = SiebelApp.S_App.NewPropertySet();					
					for (Accessory = 0; Accessory < AccessoryCnt; Accessory++) {
						AccessoryProp = ServiceOrder.GetChildByType("ListOfAccessory").GetChild(Accessory);							
						Column1 = AccessoryProp.GetProperty("Name");
						Column2 = AccessoryProp.GetProperty("Serial");
						Column3 = AccessoryProp.GetProperty("MonthlyRepayment");
						Column4 = AccessoryProp.GetProperty("Term");
						Column5 = AccessoryProp.GetProperty("Price");
						FurtherRow = [{
										value1: Column1,
										value2: Column2,
										value3: Column3,
										value4: Column4,
										value5: Column5
									}];
						FurtherRow.forEach(element => {      
						Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5];
						Accessoryrows.push(Furthertemp);
						});
					}
				}
			}//if (ServiceOrder.GetChildByType("ListOfAccessory"))
			
			//Fetching Rollover and Prepayment
			if (ServiceOrder.GetChildByType("ListOfRollOverPrepay"))	{
				var RolloverCnt = ServiceOrder.GetChildByType("ListOfRollOverPrepay").GetChildCount();
				if (RolloverCnt > 0) {
					GPP = "Y";
					RolloverPP = "Y";
					var Rollover = 0;
					var RolloverProp = SiebelApp.S_App.NewPropertySet();					
					for (Rollover = 0; Rollover < RolloverCnt; Rollover++) {
						RolloverProp = ServiceOrder.GetChildByType("ListOfRollOverPrepay").GetChild(Rollover);						
						Column1 = RolloverProp.GetProperty("Name");
						Column3 = RolloverProp.GetProperty("MonthlyRepayment");
						Column4 = RolloverProp.GetProperty("Term");
						Column5 = RolloverProp.GetProperty("Price");
						FurtherRow = [{
										value1: Column1,
										value2: "",
										value3: Column3,
										value4: Column4,
										value5: Column5
									}];
						FurtherRow.forEach(element => {      
						Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5];
						Rolloverrows.push(Furthertemp);
						});
					}
				}
			}//if (ServiceOrder.GetChildByType("ListOfRollOverPrepay"))
			
			//Fetching Add-ons
			if (ServiceOrder.GetChildByType("ListOfAddOn"))	{
				var AddOnCnt = ServiceOrder.GetChildByType("ListOfAddOn").GetChildCount();
				if (AddOnCnt > 0) {
					GPP = "Y";
					AddonPP = "Y";
					var Addon = 0;
					var AddOnProp = SiebelApp.S_App.NewPropertySet();
					for (Addon = 0; Addon < AddOnCnt; Addon++) {
						AddOnProp = ServiceOrder.GetChildByType("ListOfAddOn").GetChild(Addon);
						Column1 = AddOnProp.GetProperty("Name");
						Column3 = AddOnProp.GetProperty("MonthlyRepayment");
						Column4 = AddOnProp.GetProperty("Term");
						FurtherRow = [{
										value1: Column1,
										value2: "",
										value3: Column3,
										value4: Column4,
										value5: ""
									}];
						FurtherRow.forEach(element => {      
						Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5];
						Addonrows.push(Furthertemp);
						});
					}
				}
			}//if (ServiceOrder.GetChildByType("ListOfAddOn"))

			//Printing General Payment Plan
			if (GPP == "Y") {					
				var col = ["General Payment Plan", "Serial", "Montly Payment", "Payment Term", "Total"]	
				var emptyrows = [];
				FurtherRow = [{
								value1: "",
								value2: "",
								value3: "",
								value4: "",
								value5: ""
							}];
				FurtherRow.forEach(element => {      
				Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5];
				emptyrows.push(Furthertemp);
				});	
				doc.autoTable(col, emptyrows, { startY: (number = y += metaData.lineSpace.vertical2),
				margin: { left: x },
				tableWidth: 190,
				columnStyles: {
						0: {
							columnWidth: 80
						},
						1: {
							columnWidth: 30
						},
						2: {
							columnWidth: 25
						},
						3: {
							columnWidth: 30
						},
						4: {
							columnWidth: 25
						}
					},
					headStyles: {
						fillColor: [0, 0, 0],
						textColor: "white",
						fontSize: metaData.fontSize.eight
					},
					bodyStyles: {
						fillColor: [255, 255, 255],
						textColor: "black",
						fontSize: metaData.fontSize.eight
					}
				});				
						
				y = doc.lastAutoTable.finalY;
				y = y-6;
				
				if (AccessoryPP == "Y")
				{
					var col = ["Accessories", "", "", "", ""]
					doc.autoTable(col, Accessoryrows, { startY: (number = y),
					margin: { left: x },
					tableWidth: 190,
					columnStyles: {
							0: {
								columnWidth: 80,
								fillColor: [255, 255, 255]
							},
							1: {
								columnWidth: 30,
								fillColor: [255, 255, 255]
							},
							2: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							3: {
								columnWidth: 30,
								fillColor: [255, 255, 255]
							},
							4: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							}
						},
						headStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						},
						bodyStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						}
					});		
					y = doc.lastAutoTable.finalY;
				}//if (AccessoryPP == "Y")	
				
				if (RolloverPP == "Y")
				{
					if (AccessoryPP == "Y") {
						y = y + 1;
						doc.setDrawColor("black");
						doc.line(x, y, x + 190, y);
						y = y + 1;
					}
					var col = ["Fee Rollover & Payments", "", "", "", ""]
					doc.autoTable(col, Rolloverrows, { startY: (number = y),
					margin: { left: x },
					tableWidth: 190,
					columnStyles: {
							0: {
								columnWidth: 80,
								fillColor: [255, 255, 255]
							},
							1: {
								columnWidth: 30,
								fillColor: [255, 255, 255]
							},
							2: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							3: {
								columnWidth: 30,
								fillColor: [255, 255, 255]
							},
							4: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							}
						},
						headStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						},
						bodyStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						}
					});		
					y = doc.lastAutoTable.finalY;
				}//if (RolloverPP == "Y")
				
				if (AddonPP == "Y")
				{
					if (AccessoryPP == "Y" || RolloverPP == "Y") {
						y = y + 1;
						doc.setDrawColor("black");
						doc.line(x, y, x + 190, y);
						y = y + 1;
					}
					var col = ["Packs, Passes, and Add-Ons", "", "", "", ""]
					doc.autoTable(col, Addonrows, { startY: (number = y),
					margin: { left: x },
					tableWidth: 190,
					pageBreak: 'avoid',//ss103269: Added for PKE000000089707
					columnStyles: {
							0: {
								columnWidth: 80,
								fillColor: [255, 255, 255]
							},
							1: {
								columnWidth: 30,
								fillColor: [255, 255, 255]
							},
							2: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							3: {
								columnWidth: 30,
								fillColor: [255, 255, 255]
							},
							4: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							}
						},
						headStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						},
						bodyStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						}
					});		
					y = doc.lastAutoTable.finalY;
				}//if (AddonPP == "Y")
				
			}//if (GPP == "Y")
			//Printing General Payment Plan
			
			var Lrows = [];
			var Brows = [];
			var Crows = [];
			var Prevrows = [];
			//Fetching Loyalty Discount
			if (ServiceOrder.GetChildByType("ListOfLoyaltyDiscount"))	{
				var LDiscCnt = ServiceOrder.GetChildByType("ListOfLoyaltyDiscount").GetChildCount();
				if (LDiscCnt > 0) {
					Disc = "Y";
					LDisc = "Y";
					var LoyaltyDisc = 0;
					var LDiscProp = SiebelApp.S_App.NewPropertySet();						
					for (LoyaltyDisc = 0; LoyaltyDisc < LDiscCnt; LoyaltyDisc++) {
						LDiscProp = ServiceOrder.GetChildByType("ListOfLoyaltyDiscount").GetChild(LoyaltyDisc);
						Column1 = LDiscProp.GetProperty("Name");
						Column2 = LDiscProp.GetProperty("DiscountPrice");
						Column5 = LDiscProp.GetProperty("Term");
						var FurtherRow = [{
										value1: Column1,
										value2: Column2,
										value3: "",
										value4: "",
										value5: Column5
									}];
						FurtherRow.forEach(element => {      
						Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5];
						Lrows.push(Furthertemp);
						});
					}
				}
			}//if (ServiceOrder.GetChildByType("ListOfLoyaltyDiscount"))
			
			//Fetching Bonus
			if (ServiceOrder.GetChildByType("ListOfBonus"))	{
				var BonusCnt = ServiceOrder.GetChildByType("ListOfBonus").GetChildCount();
				if (BonusCnt > 0) {
					Disc = "Y";
					BDisc = "Y"
					var Bonus = 0;
					var BonusProp = SiebelApp.S_App.NewPropertySet();						
					for (Bonus = 0; Bonus < BonusCnt; Bonus++) {
						BonusProp = ServiceOrder.GetChildByType("ListOfBonus").GetChild(Bonus);
						Column1 = BonusProp.GetProperty("Name");
						Column2 = BonusProp.GetProperty("DiscountPrice");
						Column5 = BonusProp.GetProperty("Term");
						var FurtherRow = [{
										value1: Column1,
										value2: Column2,
										value3: "",
										value4: "",
										value5: Column5
									}];
						FurtherRow.forEach(element => {      
						Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5];
						Brows.push(Furthertemp);
						});
					}
				}
			}//if (ServiceOrder.GetChildByType("ListOfBonus"))
			
			//Fetching Credit
			if (ServiceOrder.GetChildByType("ListOfCredit"))	{
					var CreditCnt = ServiceOrder.GetChildByType("ListOfCredit").GetChildCount();
					if (CreditCnt > 0) {
						Disc = "Y";
						CDisc = "Y";
						var Credit = 0;
						var CreditProp = SiebelApp.S_App.NewPropertySet();						
						for (Credit = 0; Credit < CreditCnt; Credit++) {
							CreditProp = ServiceOrder.GetChildByType("ListOfCredit").GetChild(Credit);
							Column1 = CreditProp.GetProperty("Name");
							Column2 = CreditProp.GetProperty("DiscountPrice");
							Column5 = CreditProp.GetProperty("Term");
							var FurtherRow = [{
											value1: Column1,
											value2: Column2,
											value3: "",
											value4: "",
											value5: Column5
										}];
							FurtherRow.forEach(element => {      
							Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5];
							Crows.push(Furthertemp);
							});
						}
					}
				}//if (ServiceOrder.GetChildByType("ListOfCredit"))
			// for pega credit Discount
		    if (pegaoffDataGlob != "" && pegaflag === "Y" && dis_samid_flag ==="Y") {
				
				Disc = "Y";
				CDisc = "Y";
				Column1 = pegaoffDataGlob.OfferProductName;
				if (pegaoffDataGlob.RewardValue > 0) {
					Column2 = "$" + pegaoffDataGlob.RewardValue;
				}
				if (pegaoffDataGlob.RewardTerm > 0) {
					Column5 = pegaoffDataGlob.RewardTerm + " Months";
				}
				var FurtherRow = [{
					value1: Column1,
					value2: Column2,
					value3: "",
					value4: "",
					value5: Column5
				}];
				FurtherRow.forEach(element => {
					Furthertemp = [element.value1, element.value2, element.value3, element.value4, element.value5];
					Crows.push(Furthertemp);
				});
			}
			
			
			//Fetching Cancelled Discount
			if (ServiceOrder.GetChildByType("ListOfPreviousDiscount"))	{
				var PrevCnt = ServiceOrder.GetChildByType("ListOfPreviousDiscount").GetChildCount();
				if (PrevCnt > 0) {
					Disc = "Y";
					PrevDisc = "Y";
					var Prev = 0;
					var PrevProp = SiebelApp.S_App.NewPropertySet();						
					for (Prev = 0; Prev < PrevCnt; Prev++) {
						PrevProp = ServiceOrder.GetChildByType("ListOfPreviousDiscount").GetChild(Prev);
						Column1 = PrevProp.GetProperty("Name");
						Column5 = PrevProp.GetProperty("Term");
						var FurtherRow = [{
										value1: Column1,
										value2: "",
										value3: "",
										value4: "",
										value5: Column5
									}];
						FurtherRow.forEach(element => {      
						Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5];
						Prevrows.push(Furthertemp);
						});
					}
				}
			}//if (ServiceOrder.GetChildByType("ListOfPreviousDiscount"))
			
			//Printing Discounts
			if (Disc == "Y") {					
				var col = ["Discounts & Offers", "Discounts & Offers($)", "", "", "Term"]
				var emptyrows = [];
				FurtherRow = [{
								value1: "",
								value2: "",
								value3: "",
								value4: "",
								value5: ""
							}];
				FurtherRow.forEach(element => {      
				Furthertemp = [element.value1,element.value2,element.value3,element.value4,element.value5];
				emptyrows.push(Furthertemp);
				});	
				doc.autoTable(col, emptyrows, { startY: (number = y += metaData.lineSpace.vertical2),
				margin: { left: x },
				tableWidth: 190,
				pageBreak: 'auto',//ss103269: Added for PKE000000089707
				columnStyles: {
						0: {
							columnWidth: 80
						},
						1: {
							columnWidth: 35
						},
						2: {
							columnWidth: 25
						},
						3: {
							columnWidth: 25
						},
						4: {
							columnWidth: 25
						}
					},
					headStyles: {
						fillColor: [0, 0, 0],
						textColor: "white",
						fontSize: metaData.fontSize.eight
					},
					bodyStyles: {
						fillColor: [255, 255, 255],
						textColor: "black",
						fontSize: metaData.fontSize.eight
					}
				});				
						
				y = doc.lastAutoTable.finalY;
				y = y-6;
				
				if (LDisc == "Y")
				{
					var col = ["Device Discounts", "", "", "", ""]
					doc.autoTable(col, Lrows, { startY: (number = y),
					margin: { left: x },
					tableWidth: 190,
					columnStyles: {
							0: {
								columnWidth: 80,
								fillColor: [255, 255, 255]
							},
							1: {
								columnWidth: 35,
								fillColor: [255, 255, 255]
							},
							2: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							3: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							4: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							}
						},
						headStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						},
						bodyStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						}
					});	
					y = doc.lastAutoTable.finalY;
				}//if (LDisc == "Y")
					
				if (BDisc == "Y")
				{
					if (LDisc == "Y") {
						y = y + 1;
						doc.setDrawColor("black");
						doc.line(x, y, x + 190, y);
						y = y + 1;
					}
					var col = ["Bonus", "", "", "", ""]
					doc.autoTable(col, Brows, { startY: (number = y),
					margin: { left: x },
					tableWidth: 190,
					columnStyles: {
							0: {
								columnWidth: 80,
								fillColor: [255, 255, 255]
							},
							1: {
								columnWidth: 35,
								fillColor: [255, 255, 255]
							},
							2: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							3: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							4: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							}
						},
						headStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						},
						bodyStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						}
					});	
					y = doc.lastAutoTable.finalY;
				}//if (BDisc == "Y")
					
				if (CDisc == "Y")
				{
					if (LDisc == "Y" || BDisc == "Y") {
						y = y + 1;
						doc.setDrawColor("black");
						doc.line(x, y, x + 190, y);
						y = y + 1;
					}
					var col = ["Credits", "", "", "", ""]
					doc.autoTable(col, Crows, { startY: (number = y),
					margin: { left: x },
					tableWidth: 190,
					pageBreak: 'avoid',//ss103269: Added for PKE000000089707
					columnStyles: {
							0: {
								columnWidth: 80,
								fillColor: [255, 255, 255]
							},
							1: {
								columnWidth: 35,
								fillColor: [255, 255, 255]
							},
							2: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							3: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							4: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							}
						},
						headStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						},
						bodyStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						}
					});		
					y = doc.lastAutoTable.finalY;
				}//if (CDisc == "Y")
					
				if (PrevDisc == "Y")
				{
					if (LDisc == "Y" || BDisc == "Y" || CDisc == "Y") {
						y = y + 1;
						doc.setDrawColor("black");
						doc.line(x, y, x + 190, y);
						y = y + 1;
					}
					var col = ["Previous Discounts & Offers", "", "", "", ""]
					doc.autoTable(col, Prevrows, { startY: (number = y),
					margin: { left: x },
					tableWidth: 190,
					columnStyles: {
							0: {
								columnWidth: 80,
								fillColor: [255, 255, 255]
							},
							1: {
								columnWidth: 35,
								fillColor: [255, 255, 255]
							},
							2: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							3: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							},
							4: {
								columnWidth: 25,
								fillColor: [255, 255, 255]
							}
						},
						headStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						},
						bodyStyles: {
							fillColor: [255, 255, 255],
							textColor: "black",
							fontSize: metaData.fontSize.eight
						}
					});				
							
					y = doc.lastAutoTable.finalY;
				}//if (PrevDisc == "Y")
			}//if (Disc == "Y")
			}//if (SerOrdCnt > 0)
				
			//final page terms and conditions
			//NSA and Vodafone Logo
			var pageCount = doc.internal.getNumberOfPages();
			doc.addPage();
			doc.setPage(pageCount + 1);
			y = metaData.lineSpace.vertical;
			doc.setFontSize(metaData.fontSize.large);
			doc.setFontStyle(metaData.textStyle.bold);
			doc.setTextColor(metaData.textColor.black);
			doc.text("Network Services Agreement", x, y + 3);			
			doc.setFontSize(metaData.fontSize.ten);
			doc.setFontStyle(metaData.textStyle.normal);
			doc.addImage(
				loadImage(),
				"PNG",
				x + 150,
				y - 2,
				metaData.logo.width,
				metaData.logo.height
			);
			y += metaData.logo.height + 5;

			//Printing Terms and Conditions
			doc.autoTable({
				startY: number = y,
				margin: {
					left: metaData.pageMargin.left9
				},
				tableWidth: number = 190,
				theme: 'plain',
				columnStyles: {
					0: {
						columnWidth: 95
					},
					1: {
						columnWidth: 95
					}
				},
				headStyles: {
					fillColor: [0, 0, 0],
					fontSize: metaData.fontSize.ten
				},
				bodyStyles: {
					fontSize: metaData.fontSize.seven
				},
				body: [
					['I understand and agree that:\nMy Plan, I have been told about\n\u2022  The term of my contract and features of my plan (including add-ons) and how I will  be charged, including any early exit fees;    and \n\u2022  The Critical Information Summary for my plan, available at \n   www.vodafone.com.au/cis and in store,has been explained to me and I \n   understand that a copy will also be emailed to me \nMy Capacity to Pay \n\u2022  I confirm that I have provided accurate personal information to enable Vodafone to    assess my financial situation. I also confirm that I understand my financial \n   obligations under this contract and that I have the capacity to pay all associated \n   costs and charges.\nDevices and Accessories \n\u2022  I have been provided with all of the devices and accessories listed on this form, \n   except those marked with an asterix, which will be delivered to me later. I \n   understand that, if I cancel my plan,I will have to pay all remaining Mobile \n   Payment Plan and/or Accessory Payment Plan instalments for any devices and/or \n   accessories. These will be charged on my next bill.', 'Direct Debit \n\u2022  I authorise and request Vodafone to debit the nominated account and \n   acknowledge that by submitting this request, the Direct Debit Service Agreement \n   at vodafone.com.au/debit is binding on me of the company.\nPrivacy\n\u2022  Vodafone may use or disclose personal information collected from me in \n   accordance with the Vodafone Privacy Policy, available at \n   vodafone.com.au/privacy.']
				]
			})
			y = doc.lastAutoTable.finalY;
			doc.setDrawColor("black");
			doc.line(x, y, x + 190, y, 'F');
			
			//Printing Terms and Conditions continuation
			doc.autoTable({
				startY: number = y,
				margin: {
					left: metaData.pageMargin.left9
				},
				tableWidth: number = 190,
				theme: 'plain',
				columnStyles: {
					0: {
						columnWidth: 190
					}
				},
				headStyles: {
					fillColor: [0, 0, 0],
					fontSize: metaData.fontSize.ten
				},
				bodyStyles: {
					fontSize: metaData.fontSize.seven
				},
				body: [
					['If I am porting my mobile number, the following section applies to my service:\nI, as account holder/authorised representative, authorise the port of the number listed above, with the account number/DOB listed below, to the Vodafone Network.']
				]
			})
			y = doc.lastAutoTable.finalY;
			
			//Printing TNR details
			var col = ["Mobile Number", "Existing Carrier Acc. No./DOB", "Mobile Number", "Existing Carrier Acc. No./DOB"]
			var emptyrows = [];
			var tnr = 0;
			for (tnr = 0; tnr < 5; tnr++) {
				FurtherRow = [{
								value1: "",
								value2: "",
								value3: "",
								value4: ""
							}];
				FurtherRow.forEach(element => {      
				Furthertemp = [element.value1,element.value2,element.value3,element.value4];
				emptyrows.push(Furthertemp);
				});	
			}
			doc.autoTable(col, emptyrows, { startY: (number = y),
			margin: { left: x },
			tableWidth: 190,
			columnStyles: {
					0: {
						columnWidth: 47.5,
						fillColor: [255, 255, 255],
						lineColor: [0, 0, 0],
						lineWidth: 0.1
					},
					1: {
						columnWidth: 47.5,
						fillColor: [255, 255, 255],
						lineColor: [0, 0, 0],
						lineWidth: 0.1
					},
					2: {
						columnWidth: 47.5,
						fillColor: [255, 255, 255],
						lineColor: [0, 0, 0],
						lineWidth: 0.1
					},
					3: {
						columnWidth: 47.5,
						fillColor: [255, 255, 255],
						lineColor: [0, 0, 0],
						lineWidth: 0.1
					}
				},
				headStyles: {
					fillColor: [0, 0, 0],
					textColor: "white",
					fontSize: metaData.fontSize.eight
				},
				bodyStyles: {
					fillColor: [255, 255, 255],
					textColor: "black",
					fontSize: metaData.fontSize.eight
				}
			});
			y = doc.lastAutoTable.finalY;
			
			//Printing Terms and Conditions continuation
			doc.autoTable({
				startY: number = y,
				margin: {
					left: metaData.pageMargin.left9
				},
				tableWidth: number = 190,
				theme: 'plain',
				columnStyles: {
					0: {
						columnWidth: 190
					}
				},
				headStyles: {
					fillColor: [0, 0, 0],
					fontSize: metaData.fontSize.ten
				},
				bodyStyles: {
					fontSize: metaData.fontSize.seven
				},
				body: [
					["I agree and understand that:\n(i)    This Authorisation is only valid for 30 days and my number must be ported within this period or a new Authorisation will need to be completed;\n(ii)   My service must remain active with my current service provider until the port is completed and I should contact my current supplier regarding any matters (e.g. faults) \n       that may apply to my current service until completion of the port;\n(iii)  Although I may have the right to port the number, there may be costs and \n       obligations associated with my current service and porting the number may include an obligation to make early termination payments;\n(iv)  By porting the number, any services associated with this number may be disconnected by my current service provider and result in finalisation of my account for that \n       service;\n(v)   Upon completion of the port, service on the ported number will cease to be provided by my current supplier;\n(vi)  Certain porting information may be required to be disclosed to other service providers, network providers, portability service suppliers for the purpose of complaint \n       handling, customer network fault management, porting, routing of communications to the number and Vodafone's other lawful obligations, including use of mobile \n       number portability information by financial institutions for fraud prevention and investigations;\n(vii)  If I continue to use the existing handset it may need to be unlocked and/or reprogrammed prior to porting, at my cost;\n(viii) Vodafone may contact me if my port request has not been successfully completed, including to notify me of delays or confirm my details;\n(ix)   Porting will not be available on Sundays or certain public holidays; and\n(x)    If my port request is not successfully completed within 30 days of my authority to port, Vodafone will issue a new mobile number for my service."]
				]
			})
			y = doc.lastAutoTable.finalY;			
			y = y + 28;
			
			//Printing care contact details
			doc.autoTable({
				startY: number = y,
				margin: {
					left: metaData.pageMargin.left9
				},
				tableWidth: number = 190,
				theme: 'plain',
				columnStyles: {
					0: {
						columnWidth: 190
					}
				},
				headStyles: {
					fillColor: [0, 0, 0],
					fontSize: metaData.fontSize.ten
				},
				bodyStyles: {
					fontSize: metaData.fontSize.seven
				},
				body: [
					["Customer Care Enquiries"]
				]
			})
			y = doc.lastAutoTable.finalY;
			
			//Printing care contact number
			doc.setTextColor(metaData.textColor.black);
			doc.setFontStyle(metaData.textStyle.bold);
			doc.setFontSize(metaData.fontSize.seven);
			doc.text("1555 from your Vodafone mobile\n1300 650 410 from any other phone", x+1, y);			
			y = y + 5;
			doc.setDrawColor("black");
			doc.line(x, y, x + 190, y, 'F');
			
			//Printing Terms and Conditions continuation
			doc.autoTable({
				startY: number = y,
				margin: {
					left: metaData.pageMargin.left9
				},
				tableWidth: number = 190,
				theme: 'plain',
				columnStyles: {
					0: {
						columnWidth: 190
					}
				},
				headStyles: {
					fillColor: [0, 0, 0],
					fontSize: metaData.fontSize.ten
				},
				bodyStyles: {
					fontSize: metaData.fontSize.seven
				},
				body: [
					["The terms and conditions of my plan are available at www.vodafone.com.au/sfoa. I agree and accept the information in this form.\nAuthorised by:"]
				]
			})
			y = doc.lastAutoTable.finalY;
			
			//Printing QR code image for myvodafone registration
			doc.addImage(
                    loadQRImage(),
                    "PNG",
                    x + 150,
                    y,
                    35,
                    35
                );
			
			//Printing customer name and representative name
			doc.setFontSize(metaData.fontSize.eight);
			doc.setFillColor(metaData.backgroundColor.white);
			doc.setDrawColor("black");
			doc.cell(x+1, y, 5, 5, " ");
			doc.setFontSize(metaData.fontSize.eight);
			doc.setTextColor(metaData.textColor.black);
			doc.setFontStyle(metaData.textStyle.normal);
			doc.text(sCustName, x+10, y+4);
			doc.setFontSize(metaData.fontSize.eight);
			doc.setTextColor(metaData.textColor.black);
			doc.setFontStyle(metaData.textStyle.normal);
			doc.text("Vodafone Rep.Name: " + sVodRepName, x+80, y+4);			
			y = y + 7;
			
			//Printing dealer code and AUTHORISED REPRESENTATIVE
			doc.setFontSize(metaData.fontSize.eight);
			doc.setFillColor(metaData.backgroundColor.white);
			doc.setDrawColor("black");
			doc.cell(x+1, y, 5, 5, " ");
			doc.setFontSize(metaData.fontSize.eight);
			doc.setTextColor(metaData.textColor.black);
			doc.setFontStyle(metaData.textStyle.normal);
			doc.text("AUTHORISED REPRESENTATIVE", x+10, y+4);
			doc.setFontSize(metaData.fontSize.eight);
			doc.setTextColor(metaData.textColor.black);
			doc.setFontStyle(metaData.textStyle.normal);
			doc.text("Dealer Code: " + sDealerCd, x+80, y+4);			
			y = y + 7;
			
			//Prinitng digital sign
			doc.setFontSize(metaData.fontSize.seven);
			doc.setFillColor(metaData.backgroundColor.white);
			doc.setDrawColor("black");
			doc.cell(x+1, y, 100, 35, "\n\n\n\n\n\n\n\n\n     			Please sign here. Double-click for e-signature.");
			
			//Printing info about myvodafone
			doc.setFontSize(metaData.fontSize.seven);
			doc.setTextColor(metaData.textColor.black);
			doc.setFontStyle(metaData.textStyle.normal);
			doc.text("Scan to register your MyVodafone account.", x+143, y+23);			
			y = y + 38;
			
			//Print date
			doc.setFontSize(metaData.fontSize.eight);
			doc.setTextColor(metaData.textColor.black);
			doc.setFontStyle(metaData.textStyle.normal);
			doc.text("Date: " + sDate, x+1, y);
			
			doc.setDrawColor("black");
			doc.line(x, y+2, x + 190, y+2, 'F');			
			y = y + 5;	

			doc.addImage(
                    loadArrowImage(),
                    "PNG",
                    x + 1,
                    y-2,
                    8,
                    8
                );
				
			//Print end details
			doc.setTextColor(metaData.textColor.black);
			doc.setFontStyle(metaData.textStyle.bold);
			doc.setFontSize(metaData.fontSize.seven);
			doc.text("We are committed to providing you the best customer service at Vodafone! You may receive a survey based on your in-store experience today.\nPlease share any feedback with us on how we can improve your experience.", x+12, y);			
			y = y + 8;
			
			//Print end details continuation
			doc.setTextColor(metaData.textColor.black);
			doc.setFontStyle(metaData.textStyle.normal);
			doc.setFontSize(metaData.fontSize.seven);
			doc.text("Vodafone Net work Pty Limited ABN 31 081 918 461 (Prepaid Mobile services), Vodafone Pty Limited ABN 76 062 954 554 (Postpaid Mobile services) and Vodafone Hutchison \nAustralia Pty Ltd ABN 76 096 304 620 (NBN services).", x+1, y);
					
                $("#pdf_preview").attr("src", doc.output("datauristring"));
				doc.viewerPreferences({"HideToolbar": true}, true);
            };
			
            var fillConnectionInformation = function(doc, dataSet, config) {
                var x = config.x;
                var y = config.y;
                var metaData = config.metaData;
                for (a in dataSet) {
                    if (isNaN(a)) {
                        continue;
                    }
                    var label = dataSet[a].label;
                    var value = dataSet[a].value;
                    doc.setTextColor(metaData.textColor.red);
                    doc.setFontStyle(metaData.textStyle.bold);
                    doc.text(label, x + 105, y);
                    doc.setFontStyle(metaData.textStyle.normal);
                    doc.text(value, x + 140, y);
                    y += metaData.lineSpace.vertical;
                }
                return {
                    doc,
                    x,
                    y
                };
            };

            var fillOrderInformation = function(doc, dataSet, sTransType, config) {
                var x = config.x;
                var y = config.y;
                var metaData = config.metaData;
                for (a in dataSet) {
                    if (isNaN(a)) {
                        continue;
                    }
                    var row = dataSet[a];
                    doc.line(x, y, x + 100, y);
                    doc.setTextColor(metaData.textColor.black);
                    for (b in row) {
                        if (isNaN(b)) {
                            continue;
                        }
                        var label = row[b].label;
                        var value = row[b].value;
                        y += metaData.lineSpace.vertical;
						doc.setFontSize(metaData.fontSize.nine);
                        doc.setFontStyle(metaData.textStyle.bold);
                        doc.text(label, x, y);
						doc.setFontSize(metaData.fontSize.nine);
                        doc.setFontStyle(metaData.textStyle.normal);
						doc.text(value, x + 33, y);
                    }
                    y += metaData.lineSpace.vertical2;
                    doc.line(x, y, x + 100, y);
                }

                return {
                    doc,
                    x,
                    y
                };
            };

            var fillEntitlementInformation = function(doc, dataSet, sTransType, config) {
                var x = config.x;
                var y = config.y;
                var cellHeight = config.cellHeight;
				var cellWidth1 = config.cellWidth1;
				var cellWidth2 = config.cellWidth2;
                var metaData = config.metaData;
                doc.setFontStyle(metaData.textStyle.bold);
                for (a in dataSet) {
                    if (isNaN(a)) {
                        continue;
                    }
                    var label = dataSet[a].label;
                    var value = dataSet[a].value;
					doc.setFontSize(metaData.fontSize.nine);
                    doc.setFillColor(metaData.backgroundColor.red); 
                    doc.setTextColor(metaData.textColor.white);
					doc.setDrawColor(metaData.textColor.black);
                    doc.cell(x + 100, y, cellWidth1, cellHeight, label);
					doc.setFontSize(metaData.fontSize.nine);
                    doc.setFillColor(metaData.backgroundColor.white);
					doc.setTextColor(metaData.textColor.red);
                    doc.setDrawColor(metaData.textColor.red);
					doc.cell(x + 100 + cellWidth1, y, cellWidth2, cellHeight, value);
                    y += cellHeight;
                }

                return {
                    doc,
                    x,
                    y
                };
            };

            var loadImage = function() {
                return "data:image/png;base64,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";
            };
			
			var loadQRImage = function() {
                return 		"data:image/png;base64,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";
			};
			
			var loadArrowImage = function() {
                return			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA0CAYAAAAzMZ5zAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAF8SURBVGhD7ZjBjsMwCEST/v8/7xYprLwjJ2nMME4q3qW9FPAzoDTrz5ul+OO1fRYbJQQoIUAJAaYs1XVdt299Zu55iZAzAWcoBaUKiYpAFGJShERHYuZI0YXsHWY0DTveGVQhveJZ4TNjt9CEYMEZxRrZeSjPISoZBsbudU6EsBClDCdTCvVJVSHDycoVEsJu1wisWkJLtS3Cw6gk9fIxuuar/twxLmNYCPtmRmHnHh6ZuwgxmLV81cgwKCEAdWQYS+0qlrtGJhGKkBmd4bBz0x/M1LBroI3MjC7JyBkSMqsrerBqoS5VZZdk5QoLwZtRSMEczE6ldIhSSqYMg/ZO1eiJYIXPjN1C3SG9AqPdYr9XyTCoQgxGoS5hT2aWDIM6Mk57EAy/d8hPyBTh0DvkiFEZJkIhw5AIOWr/PVyCSoSTMjLGkQD1Ia8gHZkZN34VmZC7i3DShTyhK1rSdshTke6QJ1BCgBIClBCghAAlBCghQAkBSghQQv6xLL/DuOIWoyCiiwAAAABJRU5ErkJggg==";
			};
			
            VHANSA3StepUpgradePR_PDF.prototype.EndLife = function() {
                // EndLife is where we perform any required cleanup.
                // Add code here that should happen before default processing
                SiebelAppFacade.VHANSA3StepUpgradePR_PDF.superclass.EndLife.apply(
                    this,
                    arguments
                );
                // Add code here that should happen after default processing
            };

            return VHANSA3StepUpgradePR_PDF;
        })();
        return "SiebelAppFacade.VHANSA3StepUpgradePR_PDF";
    });
}