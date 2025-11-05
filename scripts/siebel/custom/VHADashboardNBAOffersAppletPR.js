if (typeof(SiebelAppFacade.VHADashboardNBAOffersAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHADashboardNBAOffersAppletPR");
    define("siebel/custom/VHADashboardNBAOffersAppletPR", ["order!siebel/jqgridrenderer"], function() {
        SiebelAppFacade.VHADashboardNBAOffersAppletPR = (function() {
                function VHADashboardNBAOffersAppletPR(pm) {
                    SiebelAppFacade.VHADashboardNBAOffersAppletPR.superclass.constructor.call(this, pm);
                    /*Declare the PM binding here */
                    //SiebelApp.EventManager.cleanListners("VHADashboardNBAOffersIC");
                    //SiebelApp.EventManager.addListner("VHADashboardNBAOffersIC", VHADashboardNBAOffersIC, this);

                }
                SiebelJS.Extend(VHADashboardNBAOffersAppletPR, SiebelAppFacade.JQGridRenderer);
                /*---------- Custom Code Goes Here ------------*/

                VHADashboardNBAOffersAppletPR.prototype.ShowUI = function() {
                    SiebelAppFacade.VHADashboardNBAOffersAppletPR.superclass.ShowUI.call(this);
                    //	var pm = this.GetPM();  
                    // var recordSet = pm.Get("GetRecordSet");
                    /*Kathambari- 20/12/2019- Added to check if API Call switch is on to make interface call*/
                    var APIswitchVal = VHAAppUtilities.GetConstants("VHADashAPICallSwitch");
                    if (APIswitchVal == "") {
                        VHADashboardCommon.VHADasboardGetAPICallConfiglist();
                        APIswitchVal = VHAAppUtilities.GetConstants("VHADashAPICallSwitch");
                        var valarray = APIswitchVal.split(",");
                    } else {
                        var valarray = APIswitchVal.split(",");
                    }

                    var name = valarray[0];
                    var val = name.split("|");
                    if (val[0] == "NBA") {
                        var value = val[1];
                        if (value == "Y") {
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            var Output = SiebelApp.S_App.NewPropertySet();
                            var gAssetId = SiebelApp.S_App.GetProfileAttr("VHADashboardAssetId");
                            var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            Inputs.SetProperty("ProcessName", "VHA Dashboard IO Query WF");
                            Inputs.SetProperty("IO Name", "VHA Generic Dashboard NBA Offers IO");
                            Inputs.SetProperty("Searchspec", "[Asset Header.Installed Asset Id] LIKE '" + gAssetId + "'");
                            var Output = ser.InvokeMethod("RunProcess", Inputs);
                            var ResultSet = Output.GetChildByType("ResultSet");
                            var NBAOfferErrorMsg = ResultSet.GetProperty("Error Message");
                            VHAAppUtilities.SetConstants("NBAOfferErrorMsg", NBAOfferErrorMsg);
                            if (NBAOfferErrorMsg != "") {
                                $("#NBNOffersAcceptButton").addClass("VHADisplayNone");
                                $("#VHANBAOffersInterfacefailedError").removeClass("VHADisplayNone");

                            }

                            var siebmessage = ResultSet.GetChildByType("SiebelMessage");
                            var siebmsgchildcount = siebmessage.GetChildCount();
                            if (siebmsgchildcount > 0) {
                                var IO = siebmessage.GetChildByType("ListOfVHA Generic Dashboard NBA Offers IO");
                                var AssetIC = IO.GetChildByType("Asset Header");
                                var NBAOfferIC = AssetIC.GetChildByType("ListOfNBA Offers");
                                var childcount = NBAOfferIC.GetChildCount();
                                //childcount = recordSet.length;

                                //var ArrayDAta = new Array();
                                /*for(i=0;i<childcount;i++)
                                {
                                	//var Propset = NBAOffersIC.GetChild(i);
                                	//var propcount = Propset.GetPropertyCount();
                                	//var tempArray = Propset.propArray;
                                	var tempArray1 = new Array();
                                	tempArray1["NBAOffer"] = recordSet[i]["OfferShortDescription"];
                                	tempArray1["NBAOffer1"] = recordSet[i]["OfferLongDescription"];									
                                	ArrayDAta.push(tempArray1);
                                	
                                }*/
                                $("#VHA_AD_NBAOfferCount").html(childcount);
                                var ArrayDAta = new Array();
                                var tempArrayIndex = ["OfferShortDescription", "OfferLongDescription", "SubscriberId", "ResponseTrackingCode", "TreatmentTrackingCode"];
                                for (i = 0; i < childcount; i++) {
                                    var Propset = NBAOfferIC.GetChild(i);

                                    var tempArray = Propset.propArray;
                                    var tempArray1 = new Array();
                                    for (j = 0; j < tempArrayIndex.length; j++) {
                                        var index = tempArrayIndex[j];
                                        tempArray1[index] = tempArray[index];
                                    }


                                    ArrayDAta.push(tempArray1);

                                }
                                VHADashboardNBAOffersIC(ArrayDAta);
                                var grid = $("#VHANBAOffersTable");
                                var gview = grid.parents("div.ui-jqgrid-view");
                                $('#NBNOffersAcceptButton .siebui-icon-msubmit').removeClass("siebui-ctrl-btn");
                                $('#NBNOffersAcceptButton .siebui-icon-msubmit').removeClass("appletButton");
                                $('#NBNOffersAcceptButton .siebui-icon-msubmit').attr('disabled', true);
                                gview.children("div.ui-jqgrid-hdiv").hide();

                            } else {
                                $("#NBNOffersAcceptButton").addClass("VHADisplayNone");
                                //$("#VHANBAOffersInterfacefailedError").removeClass("VHADisplayNone");
                            }

                        } else {
                            $("#NBNOffersAcceptButton").addClass("VHADisplayNone");
                            $("#VHANBAOffersExpandCollapse").toggleClass('VHADashBoardAppExp').toggleClass('VHADashBoardAppColl');
                            $('#VHANBAOffersReqbuttons').parent().siblings().addClass("VHADisplayNone");
                            //$('#VHANBAOffersReqbuttons').parent().siblings().toggle();
                            VHAAppUtilities.SetConstants("NBAOfferErrorMsg", "");
                        }
                    }

                }

                function VHADashboardNBAOffersIC(ArrayDAta) {
                    /*var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
			 if(!ParentIC)
			 { 
                 VHADashboardCommon.VHADasboardGetICProp("AssetHeader");
				 ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
			 }
			 var NBAOffersIC = ParentIC.GetChildByType("ListOfNBA Offers");
			 var childcount = NBAOffersIC.GetChildCount();
				
				for(i=0;i<childcount;i++)
				{
					var Propset = OrdersIC.GetChild(i);
					//var propcount = Propset.GetPropertyCount();
					var tempArray = Propset.propArray
					ArrayDAta.push(tempArray);
					
				}*/


                    $("#VHANBAOffersTable").jqGrid({
                        datatype: "local",
                        height: 150,
                        pager: "#NBAOfferPager",
                        rowNum: 3,
                        data: ArrayDAta,
                        columnsresize: true,
                        colNames: ['Radiobutton', 'OfferShortDescription', 'SubscriberId', 'ResponseTrackingCode', 'TreatmentTrackingCode'],
                        colModel: [{
                                name: 'Radiobutton',
                                width: 30,
                                fixed: true,
                                align: 'center',
                                resizable: false,
                                sortable: false,
                                formatter: function(cellValue, option) {
                                    return '<input type="radio" name="radio_' + option.gid + '"  />';
                                }
                            },
                            { name: 'SubscriberId', width: 30, fixed: true, hidden: true },
                            { name: 'ResponseTrackingCode', width: 30, fixed: true, hidden: true },
                            { name: 'TreatmentTrackingCode', width: 30, fixed: true, hidden: true },
                            {
                                name: 'OfferShortDescription',
                                index: 'OfferShortDescription',
                                align: 'left',
                                width: 70,
                                formatter: function(cellvalue, options, rowObject) {
                                    //var long = rowObject["NBAOffer1"];   
                                    var longV = rowObject["OfferLongDescription"];
                                    var cellHtml = "<span class=VHAshortdesc>" + cellvalue + "</span>" + "</br>" + "<span class=VHAlongdesc>" + longV + "</span>";
                                    return cellHtml;

                                }
                            }

                        ],
                        beforeSelectRow: function(rowid, e) {
                            var $radio = $(e.target).closest('tr').find('input[type="radio"]');
                            $radio.attr('checked', 'checked');
                            if ($radio.attr('checked') == "checked") {
                                $('#NBNOffersAcceptButton .siebui-icon-msubmit').attr('disabled', false);
                                $('#NBNOffersAcceptButton .siebui-icon-msubmit').addClass('VHADashboardButton');
                            }
                            return true; // allow row selection
                        },
                    });


                }


                VHADashboardNBAOffersAppletPR.prototype.BindEvents = function() {
                    SiebelAppFacade.VHADashboardNBAOffersAppletPR.superclass.BindEvents.call(this);
                    $("#VHANBAOffersReqbuttons").on("click", '#VHANBAOffersExpandCollapse', {
                        ctx: this
                    }, function(t) {
                        //$('#VHANBAOffersReqbuttons').parent().siblings().attr("style","display:block;");
                        var sAW = $(this).closest('.siebel-MediumCards').find('.siebui-applet').width();
                        $('#VHANBAOffersTable').jqGrid('setGridWidth', sAW - 10, true);
                        var sGridWdth = $(this).closest('.siebel-MediumCards').find('.siebui-applet').find('.ui-jqgrid').width();
                        $('#VHANBAOffersReqbuttons').parent().siblings().removeClass("VHADisplayNone");
                        if ($("#VHANBAOffersTable").children().length == 0) {

                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            var Output = SiebelApp.S_App.NewPropertySet();
                            var gAssetId = SiebelApp.S_App.GetProfileAttr("VHADashboardAssetId");
                            var ser = SiebelApp.S_App.GetService("Workflow Process Manager");
                            var Inputs = SiebelApp.S_App.NewPropertySet();
                            Inputs.SetProperty("ProcessName", "VHA Dashboard IO Query WF");
                            Inputs.SetProperty("IO Name", "VHA Generic Dashboard NBA Offers IO");
                            Inputs.SetProperty("Searchspec", "[Asset Header.Installed Asset Id] LIKE '" + gAssetId + "'");
                            var Output = ser.InvokeMethod("RunProcess", Inputs);
                            var ResultSet = Output.GetChildByType("ResultSet");
                            var NBAOfferErrorMsg = ResultSet.GetProperty("Error Message");
                            VHAAppUtilities.SetConstants("NBAOfferErrorMsg", NBAOfferErrorMsg);
                            if (NBAOfferErrorMsg != "") {
                                $("#NBNOffersAcceptButton").addClass("VHADisplayNone");
                                $("#VHANBAOffersInterfacefailedError").removeClass("VHADisplayNone");

                            }

                            var siebmessage = ResultSet.GetChildByType("SiebelMessage");
                            var siebmsgchildcount = siebmessage.GetChildCount();
                            if (siebmsgchildcount > 0) {
                                var IO = siebmessage.GetChildByType("ListOfVHA Generic Dashboard NBA Offers IO");
                                var AssetIC = IO.GetChildByType("Asset Header");
                                var NBAOfferIC = AssetIC.GetChildByType("ListOfNBA Offers");
                                var childcount = NBAOfferIC.GetChildCount();
                                //childcount = recordSet.length;

                                //var ArrayDAta = new Array();
                                /*for(i=0;i<childcount;i++)
                                {
                                	//var Propset = NBAOffersIC.GetChild(i);
                                	//var propcount = Propset.GetPropertyCount();
                                	//var tempArray = Propset.propArray;
                                	var tempArray1 = new Array();
                                	tempArray1["NBAOffer"] = recordSet[i]["OfferShortDescription"];
                                	tempArray1["NBAOffer1"] = recordSet[i]["OfferLongDescription"];									
                                	ArrayDAta.push(tempArray1);
                                	
                                }*/
                                $("#VHA_AD_NBAOfferCount").html(childcount);
                                var ArrayDAta = new Array();
                                var tempArrayIndex = ["OfferShortDescription", "OfferLongDescription", "SubscriberId", "ResponseTrackingCode", "TreatmentTrackingCode"];
                                for (i = 0; i < childcount; i++) {
                                    var Propset = NBAOfferIC.GetChild(i);

                                    var tempArray = Propset.propArray;
                                    var tempArray1 = new Array();
                                    for (j = 0; j < tempArrayIndex.length; j++) {
                                        var index = tempArrayIndex[j];
                                        tempArray1[index] = tempArray[index];
                                    }


                                    ArrayDAta.push(tempArray1);

                                }
                                VHADashboardNBAOffersIC(ArrayDAta);
                                $('#VHANBAOffersTable').jqGrid('setGridWidth', sAW - 10, true);
                                var grid = $("#VHANBAOffersTable");
                                var gview = grid.parents("div.ui-jqgrid-view");
                                $('#NBNOffersAcceptButton .siebui-icon-msubmit').removeClass("siebui-ctrl-btn");
                                $('#NBNOffersAcceptButton .siebui-icon-msubmit').removeClass("appletButton");
                                $('#NBNOffersAcceptButton .siebui-icon-msubmit').attr('disabled', true);
                                gview.children("div.ui-jqgrid-hdiv").hide();

                            }
                        }
                        //$('#VHANBAOffersReqbuttons').parent().siblings().toggle();
                        //$('#VHAOthrServicebuttons').parent().siblings().toggle();
                        $("#VHANBAOffersExpandCollapse").toggleClass('VHADashBoardAppExp').toggleClass('VHADashBoardAppColl');
                        if ($("#VHANBAOffersExpandCollapse").hasClass("VHADashBoardAppColl")) {
                            (!($(".siebel-MediumCards").addClass("MedCardsAdjHeight"))) ? $(".siebel-MediumCards").addClass("MedCardsAdjHeight"): '';
                        }
                        if ($("#VHANBAOffersExpandCollapse").hasClass("VHADashBoardAppExp")) {
                            if ($("#VHANBAOffersExpandCollapse").hasClass("VHADashBoardAppExp") && $("#VHAOrdersExpandCollapse").hasClass("VHADashBoardAppExp") && $("#VHAOtherServExpandCollapse").hasClass("VHADashBoardAppExp") && $("#VHASRExpandCollapse").hasClass("VHADashBoardAppExp"))
                                ($(".siebel-MediumCards").addClass("MedCardsAdjHeight")) ? $(".siebel-MediumCards").removeClass("MedCardsAdjHeight") : '';
                        }

                        //$('#VHANBAOffersReqbuttons').parent().siblings().attr("style","display:block;");

                        /*if($("#VHANBAOffersTable").children().length == 0)
                        {
                        	$("#NBNOffersAcceptButton").attr("style","display:none;");
                        	//$("#gbox_VHANBAOffersTable").attr("style","display:none;");
                        	
                        }*/



                        if ($("#VHANBAOffersExpandCollapse").hasClass("VHADashBoardAppColl")) {
                            $('#VHANBAOffersReqbuttons').parent().siblings().addClass("VHADisplayNone");
                        } else {
                            var NBAOfferErrorMsg = VHAAppUtilities.GetConstants("NBAOfferErrorMsg");
                            if (NBAOfferErrorMsg != "")
                                $("#VHANBAOffersInterfacefailedError").removeClass("VHADisplayNone");
                            else {

                                $("#VHANBAOffersInterfacefailedError").addClass("VHADisplayNone");
                            }
                        }
                        var t_this = $(this);
                        t_this.closest('.siebel-MediumCards').find('.siebui-applet').width(sAW).addClass("HardCodedWidth");
                        t_this.closest('.siebel-MediumCards').prev('.siebel-MediumCards').find('.siebui-applet').width(sAW).addClass("HardCodedWidth");
                        t_this.closest('.siebel-MediumCards').width(sAW + 10).addClass("HardCodedWidth");
                        t_this.closest('.siebel-LineCards').width(sAW + 20).addClass("HardCodedWidth");
                        var sNewWd = t_this.closest('.siebel-LineCards').width() * 2;
                        t_this.closest('.flex_row_container').width(sNewWd + 8).addClass("HardCodedWidth");
                        $('.siebel-InnerContainer.Left>.siebel-LineCards').width(sNewWd + 8).addClass("HardCodedWidth");
                        t_this.closest('.siebel-InnerContainer.Left').css('max-width', sNewWd + 8).addClass("HardCodedWidth");


                    });
                    $("#VHANBAOffersReqbuttons").on("click", "#VHAGotoNBAView", {
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


                }

                return VHADashboardNBAOffersAppletPR;
            }
            ());
        return "SiebelAppFacade.VHADashboardNBAOffersAppletPR";
    });
}