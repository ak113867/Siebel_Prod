if (typeof(SiebelAppFacade.VHAGenericDashboardUsageDetailsListAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAGenericDashboardUsageDetailsListAppletPR");
    define("siebel/custom/VHAGenericDashboardUsageDetailsListAppletPR", ["order!siebel/phyrenderer", "order!siebel/jqgridrenderer"], function() {
        SiebelAppFacade.VHAGenericDashboardUsageDetailsListAppletPR = (function() {
                function VHAGenericDashboardUsageDetailsListAppletPR(pm) {
                    SiebelAppFacade.VHAGenericDashboardUsageDetailsListAppletPR.superclass.constructor.call(this, pm);
                }
                SiebelJS.Extend(VHAGenericDashboardUsageDetailsListAppletPR, SiebelAppFacade.PhysicalRenderer);
                // SiebelJS.Extend(VHAGenericDashboardUsageDetailsListAppletPR, SiebelAppFacade.JQGridRenderer);

                VHAGenericDashboardUsageDetailsListAppletPR.prototype.ShowUI = function() {
                    SiebelAppFacade.VHAGenericDashboardUsageDetailsListAppletPR.superclass.ShowUI.call(this);

                    /*var svc 	= SiebelApp.S_App.GetService("VF SUI Entitlement Usage BS");
                    var input 	= SiebelApp.S_App.NewPropertySet();
                    var output 		= svc.InvokeMethod("Dashboard Entitlement Graph", input);*/
					/*Kathambari- 20/12/2019- Added to check if API Call switch is on to make interface call*/
					var APIswitchVal = VHAAppUtilities.GetConstants("VHADashAPICallSwitch");
				   if(APIswitchVal == "")
				   {
				   VHADashboardCommon.VHADasboardGetAPICallConfiglist();
				   APIswitchVal = VHAAppUtilities.GetConstants("VHADashAPICallSwitch");
				   var valarray = APIswitchVal.split(",");
				   }
				   else
				   {
					   var valarray = APIswitchVal.split(",");
				   }	
				   
				   var Activeview = SiebelApp.S_App.GetActiveView().GetName();			   
				   if(Activeview == "VHA Postpay Asset Dashboard View" || Activeview == "VHA Prepay Asset Dashboard View")
				   {
					  
				   
				    var name = valarray[1];
					var val = name.split("|");
					if(val[0] == "Data")
					{
						var value =   val[1];
						if(value == "Y")
						{
							var Inputs = SiebelApp.S_App.NewPropertySet();
							var output = SiebelApp.S_App.NewPropertySet();
							var gAssetId = SiebelApp.S_App.GetProfileAttr("VHADashboardAssetId");
							var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
							var Inputs = SiebelApp.S_App.NewPropertySet();
							Inputs.SetProperty("ProcessName", "VHA Dashboard IO Query WF");
							// Inputs.SetProperty("IO Name", "VHA Generic Network Settings IO");
							// Inputs.SetProperty("Searchspec", "[Asset Header.Installed Asset Id] LIKE '"+gAssetId+"'");
							var output = ser.InvokeMethod("RunProcess", Inputs);
							var ResultSet = output.GetChildByType("ResultSet");
							var grphErrorMsg = ResultSet.GetProperty("Error Message");
							VHAAppUtilities.SetConstants("grphErrorMsg", grphErrorMsg);
							if (grphErrorMsg != "") {
								$("#VHAInterfacefailedError").removeClass("VHADisplayNone");
							}

							var siebmessage = ResultSet.GetChildByType("SiebelMessage");
							var siebmsgchildcount = siebmessage.GetChildCount();
							//var resultSet 	=  output.GetChild(0);
							//var resultcount = resultSet.GetChildCount();
							if (siebmsgchildcount > 0) {
								//var STypPropset = SiebelApp.S_App.NewPropertySet();
								for (i = 0; i < siebmsgchildcount; i++) {
									var childps = siebmessage.GetChild(i);
									if (childps.GetType() == "B" || childps.GetType() == "K") { //Madhu-02Apr20-Before BRM upgrade, "B" as identifier and at after upgrade "K"
										VHAAppUtilities.SetConstants("UsageDetails_BType", childps);

									} else if (childps.GetType() == "S" || childps.GetType() == "M") { //Madhu-02Apr20-Before BRM upgrade, "S" as identifier and at after upgrade "M"
										//STypPropset.AddChild(childps);
										VHAAppUtilities.SetConstants("UsageDetails_SType", childps);
									}


								}

								var propset = VHAAppUtilities.GetConstants("UsageDetails_BType");
								if (propset)
									DrawGraph2(propset);
							} else {
								VHAAppUtilities.SetConstants("UsageDetails_SType", "");
								VHAAppUtilities.SetConstants("UsageDetails_BType", "");
								//  $("#VHAInterfacefailedError").removeClass("VHADisplayNone");
							}
						}
						else{
						$('#VHAUsageDetailsCard').addClass("VHADisplayNone");
                        $("#VHAUsageDetailsExpandCollapse").toggleClass('VHADashBoardAppExp').toggleClass('VHADashBoardAppColl');
						}
					}
				   }
                    
                }

                function DrawGraph2(childps) {
                    var entitlementtypecount = childps.GetChildCount();
                    var j = 0;

                    for (var m = 0; m < entitlementtypecount; m++) {
                        var typeps = childps.GetChild(m);
                        var typeps1 = typeps.GetChild(0);

                        var title = typeps.GetProperty("Type");
						var sProd=typeps1.GetProperty("iProdName");
						var SearchString="[List Of Values.Type]='VHA_SHARING_PRODNAMES' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='"+sProd+"'";
						var sInList=VHAAppUtilities.GetPickListValues("", SearchString);
						title=(sInList=="Y")?"Sharing Aggregator : "+title:title;
						var Used = typeps1.GetProperty("Used");      //Sridhar-20Mar20-Removed number() conversion
                        var Remaining = typeps1.GetProperty("Remaining");
				
                       /* var oneGB = 1024; //MB to GB
                        Used = Math.round(Used / oneGB);
                        Remaining = Math.round(Remaining / oneGB);  -- Sridhar:18032020:commented*/
						var strused=Used.split(" ");
						if(strused[1]=="MB" && strused[0]>1023) //Sridhar-20Mar20-When sum exceeds 
						{
						Used =strused[0]/1024+" "+"GB"
						}
						var strRemaining=Remaining.split(" ");
						if(strRemaining[1]=="MB" && strRemaining[0]>1023)
						{
						Remaining =strRemaining[0]/1024+" "+"GB"
						}


                        var k = m % 2;
                        if (k == 0) /*When modulo is zero,new div parent is added to bring the graph to next line*/ {
                            //$('[title="Usage Details"]').parent().before('<div id="usagegraphdiv'+j+'"></div>');
                            $("#VHADataGraph").append('<div id="usagegraphdiv' + j + '"></div>');

                            //$("#usagegraphdiv" + j).append('<div id="usagegraph' + m + '" style="width:125px; height:150px;margin-left:5px;float:left;"></div>');
                            $("#usagegraphdiv" + j).append('<svg id="donut-chart' + m + '" class="usage-svg"></svg>');
                        } else if (k == 1) {
                            //$("#usagegraphdiv" + j).append('<div id="usagegraph' + m + '" style="width:125px; height:150px;margin-left:5px;float:left;"></div>');
                            $("#usagegraphdiv" + j).append(' <svg id="donut-chart' + m + '" class="usage-svg"></svg>');
                            j++;
                        }
                        var chartData = [{
                            "label": "Used",
                            "value": Used,
                            "link": ""
                        }, {
                            "label": "Remaining",
                            "value": Remaining,
                            "link": ""
                        }]
                        createDonutChart(chartData, 'donut-chart' + m, title, "GB");
                    }
                }

                function createDonutChart(chartData, SVG_ID_VAL, ChartName, UnitType) {
                    var seedData = chartData;

                    var Used = 0,
                        Remaining = 0,UsedUnit="",RemUnit="",TotalUnit=""; //Sridhar-20Mar20-Added three new unit types to show MB/GB diff. It was hardcoded GB earlier
						
			        
                    for (var i = 0; i < 2; i++) {
                        if (seedData[i].label == "Used") {
							if(UnitType=="GB") //Sridhar-20Mar20- split into value and units for data entries
							{
							var u1_arr=seedData[i].value.split(" ");
                            Used = Number(u1_arr[0]).toFixed(2);
							UsedUnit=u1_arr[1];
							}
							else //Sridhar-20Mar20- hardcode unit as Mins
							{
							Used=seedData[i].value.toFixed(2);
							UsedUnit="Mins"
							}
							seedData[i].value=Used;
                        } else {
							if(UnitType=="GB")
							{
							var r1_arr=seedData[i].value.split(" ");
                            RemUnit=r1_arr[1];
							Remaining = (RemUnit=="MB")?Math.trunc(Number(r1_arr[0])):Number(r1_arr[0]).toFixed(2);
							
							}
							else
							{
							Remaining=seedData[i].value.toFixed(2);
							RemUnit="Mins";
							}
							seedData[i].value=Remaining;
                        }
                    }
					if(UnitType=="GB")
					{
					var Total = addData(Used+" "+UsedUnit,Remaining+" "+RemUnit); //Sridhar-20Mar20-For data records, arithmetic addition can not be done as values are strings
					var strTot=Total.split(" ");
						if(strTot[1]=="MB" && strTot[0]>1023)
						{
						Total =strTot[0]/1024+" "+"GB";
						}
					var t1_arr=Total.split(" ");
				    TotalUnit=t1_arr[1];
					var Total=(TotalUnit=="MB")?Math.trunc(Number(t1_arr[0])):Number(t1_arr[0]).toFixed(2);
				    if(TotalUnit=="GB" && (UsedUnit=="MB" || RemUnit=="MB")) //Sridhar-20Mar20-When either remaining/used is in MB, convert to GB for seed data to show in graph
					{(UsedUnit=="MB")?seedData[0].value=(Number(seedData[0].value)/1024).toFixed(2):"";
					(RemUnit=="MB")?seedData[1].value=(Number(seedData[1].value)/1024).toFixed(2):"";
					}
					}
					else //Sridhar-20Mar20-Simple arithmetic addition for Mins
					{
				    var Total = Number(Used) + Number(Remaining);
					Total=Number(Total).toFixed(2);
					TotalUnit="Mins";
					}
					
                   
				   
				   
				   
                    // Define size & radius of donut pie chart
                    var width = 120,
                        height = 170,
                        radius = Math.min(width, height) / 2;

                    // Define arc colours
                    var colour = d3.scaleOrdinal(d3.schemeCategory20);

                    // Define arc ranges
                    var arcText = d3.scaleOrdinal()
                        .range([0, width]);

                    // Determine size of arcs
                    var arc = d3.arc()
                        .innerRadius(radius - 18)
                        .outerRadius(radius - 10);

                    // Create the donut pie chart layout
                    var pie = d3.pie()
                        .value(function(d) { return d["value"]; })
                        .sort(null);

                    // Append SVG attributes and append g to the SVG
                    var svg = d3.select("#" + SVG_ID_VAL)
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(" + radius + "," + radius + ")");

                    // Define inner circle
                    svg.append("circle")
                        .attr("cx", 0)
                        .attr("cy", 0)
                        .attr("r", 100)
                        .attr("fill", "#fff");

                    // Calculate SVG paths and fill in the colours
                    var g = svg.selectAll(".arc")
                        .data(pie(seedData))
                        .enter().append("g")
                        .attr("class", "arc")

                    // Make each arc clickable 
                    // .on("click", function(d, i) {
                    // window.location = seedData[i].link;
                    //})
                    ;

                    // Append the path to each g
                    g.append("path")
                        .attr("d", arc)
                        .attr("fill", function(d, i) {
                            //console.log(d.data.label);
                            if (d.data.label == "Used") {
                                return "#E60000";
                            } else {
                                return "#E4E4E4";
                            }
                            //return colour(i);
                        });

                    // Append text labels to each arc
                    g.append("text")
                        .attr("transform", function(d) {
                            return "translate(" + arc.centroid(d) + ")";
                        })
                        .attr("dy", ".35em")
                        .style("text-anchor", "middle")
                        .attr("fill", "#fff")
                        .text(function(d, i) {
                            //return seedData[i].label; 
                            return;
                        })

                    //   g.selectAll(".arc text").call(wrap, arcText.range([0, width]));

                    // Append text to the inner circle
                    svg.append("text")
                        .attr("dy", "-0.8em")
                        .style("text-anchor", "middle")
                        .attr("class", "inner-circle small-text")
                        .style("color", "#333")
                        .attr("fill", "#333")
                        .text(function(d) { return 'Data left'; });
                    svg.append("text")
                        .attr("dy", "0.5em")
                        .style("text-anchor", "middle")
                        .attr("class", "inner-circle red-text")
                        .style("color", "#E60000")
                        .attr("fill", "#E60000")
                        .text(function(d) { return Remaining + ' ' + RemUnit; });
                    svg.append("text")
                        .attr("dy", "2.0em")
                        .style("text-anchor", "middle")
                        .attr("class", "inner-circle small-text")
                        .attr("fill", "#333")
                        .text(function(d) { return 'of ' + Total + ' ' + TotalUnit;; });

                    /*svg.append("text")
                        .attr("dy", "2.0em")
                        .style("text-anchor", "middle")
                        .attr("class", "inner-circle")
                        .attr("fill", "#333")
                        .text(function(d) { return Total + ' ' + UnitType; });*/


                    svg.append("text")
                        .attr("dy", "6.5em")
                        .style("text-anchor", "middle")
                        .style("font-size", "10px")
                        .attr("class", "inner-circle chart-name")
                        .attr("fill", "#333")
                        .text(function(d) {
                            return (ChartName);
                        });
                    svg.selectAll('text').call(wrap, 100);
                }
				function addData(data1,data2) //Sridhar-20Mar20-Newly created for adding data values from string values
				{
					if(data1.split(" ").length>1)
					{
					var u1_arr=data1.split(" ");
					var u1=u1_arr[1];
					var u2_arr=data2.split(" ");
					var u2=u2_arr[1];
					var sum;
					if(u1=="GB"||u1=="MB") //To check entitlement record is of 'data' type
					{
					if(u1==u2) //when both records have same unit (both in MB or both in GB)
					{
					sum = Number(u1_arr[0]) + Number(u2_arr[0]);
					sum = sum+" "+u1;
					}
					else  // one in MB and one in GB
					{ if(u1=="MB")
					  {
					  data1=Number(u1_arr[0])/1024; //Convert MB to GB
					  sum = Number(data1) + Number(u2_arr[0]);
					  }
					  if(u2=="MB")
					  {
					  data2=Number(u2_arr[0])/1024; 
					  sum = Number(u1_arr[0]) + Number(data2);
					  }
					  sum=sum+" "+"GB";
					  //TheApplication().RaiseErrorText("data1"+u1_arr[0]+"data2"+u2_arr[0]);
					}
					}
					}
					else //For records of type other than 'Data'
					{
					sum=Number(data1) + Number(data2);	
					}
					return sum;
				}
				

                // Wrap function to handle labels with longer text
                function wrap(text, width) {
                    text.each(function() {
                        var text = d3.select(this),
                            words = text.text().split(/\s+/).reverse(),
                            word,
                            line = [],
                            lineNumber = 0,
                            lineHeight = 0.1, // ems
                            linenew = 1,
                            y = text.attr("y"),
                            dy = parseFloat(text.attr("dy")),
                            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                        console.log("tspan: " + tspan);
                        while (word = words.pop()) {
                            line.push(word);
                            tspan.text(line.join(" "));
                            if (tspan.node().getComputedTextLength() > 100) {
                                line.pop();
                                tspan.text(line.join(" "));
                                line = [word];
                                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + linenew + "em").text(word);
                            }
                        }
                    });
                }


                function DrawIDDGraph(childps) {
                    //var typecount = stypeps.GetChildCount();
                    var j = 0,
                        counter = 0;
                    var typepsarray = new Array();
                    var typepsarray1 = new Array();
                    typepsarray[0] = "Used";
                    typepsarray1[0] = "Remaining";

                    var entitlementtypecount = childps.GetChildCount();


                    for (i = 0; i < entitlementtypecount; i++) {

                        var typeps = childps.GetChild(i);
                        var typeps1 = typeps.GetChild(0);
                        var title = typeps.GetProperty("Type");

                        var Used = Number(typeps1.GetProperty("Used"));
                        var Remaining = Number(typeps1.GetProperty("Remaining"));

                        var k = counter % 2;
                        if (k == 0) /*When modulo is zero,new div parent is added to bring the graph to next line*/ {
                            $("#Idd").append('<div id="IDDdiv' + j + '"></div>');
                            //$("#IDDdiv" + j).append('<div id="IDD' + counter + '" style="width:125px; height:150px;margin-left:5px;float:left;"></div>');
                            $("#IDDdiv" + j).append('<svg id="IDD-donut-chart' + counter + '" class="usage-svg"></svg>');

                        } else if (k == 1) {
                            //$("#IDDdiv" + j).append('<div id="IDD' + counter + '" style="width:125px; height:150px;margin-left:5px;float:left;"></div>');
                            $("#IDDdiv" + j).append('<svg id="IDD-donut-chart' + counter + '" class="usage-svg"></svg>');
                            j++;
                        }

                        var chartData = [{
                            "label": "Used",
                            "value": Used,
                            "link": ""
                        }, {
                            "label": "Remaining",
                            "value": Remaining,
                            "link": ""
                        }];
                        createDonutChart(chartData, 'IDD-donut-chart' + counter, title, "Mins");
                        counter++;
                    }
                }
                VHAGenericDashboardUsageDetailsListAppletPR.prototype.BindEvents = function() {
                    SiebelAppFacade.VHAGenericDashboardUsageDetailsListAppletPR.superclass.BindEvents.call(this);
                    $("#VHAUsageDetailsbuttons").on("click", '#VHAUsageDetailsExpandCollapse', {
                        ctx: this
                    }, function(t) {
						
						// $("#VHAUsageDetailsExpandCollapse").toggleClass('VHADashBoardAppExp').toggleClass('VHADashBoardAppColl');
                        //$('#VHAUsageDetailsCard').toggle();
						if($("#VHAUsageDetailsExpandCollapse").hasClass("VHADashBoardAppColl"))
						{
							$('#VHAUsageDetailsCard').removeClass("VHADisplayNone");
						if ($("#VHADataGraph").children().length == 0)
						{
							
							var Inputs = SiebelApp.S_App.NewPropertySet();
							var output = SiebelApp.S_App.NewPropertySet();
							var gAssetId = SiebelApp.S_App.GetProfileAttr("VHADashboardAssetId");
							var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
							var Inputs = SiebelApp.S_App.NewPropertySet();
							Inputs.SetProperty("ProcessName", "VHA Dashboard IO Query WF");
							// Inputs.SetProperty("IO Name", "VHA Generic Network Settings IO");
							// Inputs.SetProperty("Searchspec", "[Asset Header.Installed Asset Id] LIKE '"+gAssetId+"'");
							var output = ser.InvokeMethod("RunProcess", Inputs);
							var ResultSet = output.GetChildByType("ResultSet");
							var grphErrorMsg = ResultSet.GetProperty("Error Message");
							VHAAppUtilities.SetConstants("grphErrorMsg", grphErrorMsg);
							if (grphErrorMsg != "") {
								$("#VHAInterfacefailedError").removeClass("VHADisplayNone");
							}

							var siebmessage = ResultSet.GetChildByType("SiebelMessage");
							var siebmsgchildcount = siebmessage.GetChildCount();
							//var resultSet 	=  output.GetChild(0);
							//var resultcount = resultSet.GetChildCount();
							if (siebmsgchildcount > 0) {
								//var STypPropset = SiebelApp.S_App.NewPropertySet();
								for (i = 0; i < siebmsgchildcount; i++) {
									var childps = siebmessage.GetChild(i);
									if (childps.GetType() == "B" || childps.GetType() == "K") { //Madhu-02Apr20-Before BRM upgrade, "B" as identifier and at after upgrade "K"
										VHAAppUtilities.SetConstants("UsageDetails_BType", childps);

									} else if (childps.GetType() == "S" || childps.GetType() == "M") { //Madhu-02Apr20-Before BRM upgrade, "S" as identifier and at after upgrade "M"
										//STypPropset.AddChild(childps);
										VHAAppUtilities.SetConstants("UsageDetails_SType", childps);
									}


								}

								var propset = VHAAppUtilities.GetConstants("UsageDetails_BType");
								if (propset)
									DrawGraph2(propset);
							} else {
								VHAAppUtilities.SetConstants("UsageDetails_SType", "");
								VHAAppUtilities.SetConstants("UsageDetails_BType", "");
								//  $("#VHAInterfacefailedError").removeClass("VHADisplayNone");
							}
						
						}
						$("#VHAUsageDetailsExpandCollapse").toggleClass('VHADashBoardAppExp').toggleClass('VHADashBoardAppColl');
						}
						else{
							$('#VHAUsageDetailsCard').addClass("VHADisplayNone");
							 $("#VHAUsageDetailsExpandCollapse").toggleClass('VHADashBoardAppExp').toggleClass('VHADashBoardAppColl');
						}
						
                       
						/*else
						{
						$('#VHAUsageDetailsCard').toggle();
                        $("#VHAUsageDetailsExpandCollapse").toggleClass('VHADashBoardAppExp').toggleClass('VHADashBoardAppColl');
						}*/
						
                    });
                    $("#VHAUsageDetailsbuttons").on("click", '#VHAGotoUsageDetailsView', {
                        ctx: this
                    }, function(t) {
                        var Inputs = SiebelApp.S_App.NewPropertySet();
                        var Output = SiebelApp.S_App.NewPropertySet();
                        var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                        Inputs.SetProperty("Service Name", "VHA MSISDN GotoView BS");
                        Inputs.SetProperty("Method Name", "GotoView");
                        Inputs.SetProperty("BusObjName", "VF Asset");
                        Inputs.SetProperty("BusCompName", "Asset Mgmt - Asset - Header");
                        var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
                        var RecordId = ParentIC.GetProperty("Installed Asset Id");
                        Inputs.SetProperty("RowId", RecordId);
                        Inputs.SetProperty("ViewName", "VF Asset Summary View - with extra IN fields");
                        var Output = ser.InvokeMethod("Run Process", Inputs);
                    });
                    $("#VHAUsageDetailsSections").on("click", '#VHAUsageData,#VHAUsageIDD,#VHAUsageNetwork', {
                        ctx: this
                    }, function(t) {

                        var curid = $(this).attr("id");
                        if (curid == "VHAUsageData") {
                            $(this).addClass("VHADashRedFontColor");
                            $(this).siblings().removeClass("VHADashRedFontColor");
                            $("#VHADataGraph").removeClass("VHADisplayNone");
                            $("#VHADataGraph").siblings().addClass("VHADisplayNone");
                            var grphErrorMsg = VHAAppUtilities.GetConstants("grphErrorMsg");
                            if ($("#VHADataGraph").children().length == 0) {
                                var propset = VHAAppUtilities.GetConstants("UsageDetails_BType");
                                if (propset) {
                                    DrawGraph2(propset);
                                } else if (grphErrorMsg) {
                                    $("#VHAInterfacefailedError").removeClass("VHADisplayNone");
                                } else {
                                    $("#VHAInterfacefailedError").addClass("VHADisplayNone");
                                }

                                /*else {
                                	$("#VHAInterfacefailedError").removeClass("VHADisplayNone");
                                	//'<div id="VHAInterfacefailedError">Something did not go as planned</div>'
                                }*/
                            }

                        } else if (curid == "VHAUsageIDD") {
                            $(this).addClass("VHADashRedFontColor");
                            $(this).siblings().removeClass("VHADashRedFontColor");
                            $("#Idd").removeClass("VHADisplayNone");
                            $("#Idd").siblings().addClass("VHADisplayNone");
                            var grphErrorMsg = VHAAppUtilities.GetConstants("grphErrorMsg");
                            if ($("#Idd").children().length == 0) {
                                var propset = VHAAppUtilities.GetConstants("UsageDetails_SType");
                                if (propset) {
                                    DrawIDDGraph(propset);
                                } else if (grphErrorMsg) {
                                    $("#VHAInterfacefailedError").removeClass("VHADisplayNone");
                                } else {
                                    $("#VHAInterfacefailedError").addClass("VHADisplayNone");
                                }
                            }
                        } else {
							
							
                            $(this).addClass("VHADashRedFontColor");
                            $(this).siblings().removeClass("VHADashRedFontColor");
                            $("#VHANetworkSettings").removeClass("VHADisplayNone");
                            $("#VHANetworkSettings").siblings().addClass("VHADisplayNone");
                            if ($("#Networksettingstable").children().length == 0) {
                                /*var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
                                if(!ParentIC)
                                 { 
                                	 VHADashboardCommon.VHADasboardGetICProp("AssetHeader");
                                	 ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
                                 }*/

								/*Kathambari- 20/12/2019- Added to check if API Call switch is on to make interface call*/
							   /*var APIswitchVal = VHAAppUtilities.GetConstants("VHADashAPICallSwitch");
							   if(APIswitchVal == "")
							   {
							   VHADashboardCommon.VHADasboardGetAPICallConfiglist();
							   APIswitchVal = VHAAppUtilities.GetConstants("VHADashAPICallSwitch");
							   var valarray = APIswitchVal.split(",");
							   }
							   else
							   {
								   var valarray = APIswitchVal.split(",");
							   }*/	
							   /*var name = valarray[2];
							   var val = name.split("|");
							   if(val[0] == "Network")
							   {*/
								  /* var value = val[1];
									if(value == "Y")
									{*/
										var Inputs = SiebelApp.S_App.NewPropertySet();
										var Output = SiebelApp.S_App.NewPropertySet();
										var gAssetId = SiebelApp.S_App.GetProfileAttr("VHADashboardAssetId");
										var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
										var Inputs = SiebelApp.S_App.NewPropertySet();
										Inputs.SetProperty("ProcessName", "VHA Dashboard IO Query WF");
										Inputs.SetProperty("IO Name", "VHA Generic Network Settings IO");
										Inputs.SetProperty("Searchspec", "[Asset Header.Installed Asset Id] LIKE '" + gAssetId + "'");
										var Output = ser.InvokeMethod("RunProcess", Inputs);
										var ResultSet = Output.GetChildByType("ResultSet");
										var NetworkErrorMsg = ResultSet.GetProperty("Error Message");
										VHAAppUtilities.SetConstants("NetworkErrorMsg", NetworkErrorMsg);
										if (NetworkErrorMsg != "") {

											$("#VHAInterfacefailedError").removeClass("VHADisplayNone");
										}
										var siebmessage = ResultSet.GetChildByType("SiebelMessage");
										var siebmsgchildcount = siebmessage.GetChildCount();


										if (siebmsgchildcount > 0) {
											var IO = siebmessage.GetChildByType("ListOfVHA Generic Network Settings IO");
											var AssetIC = IO.GetChildByType("Asset Header");
											var NetworkIC = AssetIC.GetChildByType("ListOfNetwork");
											// var AssetIC = ParentIC.GetChildByType("ListOfNetwork");
											var childcount = NetworkIC.GetChildCount();
											var ArrayDAta = new Array();
											var tempArrayIndex = ["Attribute", "Type", "Current Value", "Description"];
											for (i = 0; i < childcount; i++) {
												var Propset = NetworkIC.GetChild(i);

												var tempArray = Propset.propArray;
												var tempArray1 = new Array();
												for (j = 0; j < tempArrayIndex.length; j++) {
													var index = tempArrayIndex[j];
													tempArray1[index] = tempArray[index];
												}


												ArrayDAta.push(tempArray1);

											}
											$("#Networksettingstable").jqGrid({
												datatype: "local",
												data: ArrayDAta,
												shrinkToFit: true,
												autowidth: true,
												height: "100%",
												pager: "NetworkPager",
												toolbar: [true, "top"],
												gridview: true,
												rowNum: 5,
												loadonce: true,
												viewrecords: true,
												colNames: ['Type', 'Attribute', 'Description', 'Current Value'],
												colModel: [
													{ name: 'Type', index: 'Type', width: 20 },
													{ name: 'Attribute', index: 'Attribute', width: 20 },
													{ name: 'Description', index: 'Description', width: 40 },
													{ name: 'Current Value', index: 'Current Value', width: 20 },

												],
											});
											var sAppWdth=parseInt($('#Networksettingstable').closest('.siebel-SmallCards-Side').width());
											$('#Networksettingstable').jqGrid('setGridWidth', parseInt($('#VHANetworkSettings').width()), true);
													 var gridName="Networksettingstable";
							
													 var objHeader = $("table[aria-labelledby='gbox_" + gridName+ "'] tr[role=rowheader] th");

													 for (var i = 0; i < objHeader.length; i++) {
												   var col = $("table[id='" + gridName+ "'] td[aria-describedby='" + objHeader[i].id + "']");
													var width= col.outerWidth()-1;
													 $(objHeader[i]).css("width", width);
												}
													 $('#gview_Networksettingstable').addClass('HdrWdthAdded');
											if ($('#srchpanecontainer.forcehide').length == 1) {
												setTimeout(function() {
													$('.siebel-InnerContainer.Right .siebel-SmallCards-Side').width(sAppWdth);
													$('.siebel-InnerContainer.Right').css('max-width',sAppWdth+11);
												}, 100);
											}
										}
									
									
							  
								
                                

                            }
                        }

                    });

                }

                return VHAGenericDashboardUsageDetailsListAppletPR;
            }
            ());
        return "SiebelAppFacade.VHAGenericDashboardUsageDetailsListAppletPR";
    });
}