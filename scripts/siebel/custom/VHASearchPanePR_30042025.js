if (typeof(SiebelAppFacade.VHASearchPanePR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHASearchPanePR");
    define("siebel/custom/VHASearchPanePR", ["siebel/searchpanerenderer"], function() {
        SiebelAppFacade.VHASearchPanePR = (function() {
                var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
                //SiebelJS.Extend(VHASearchPanePR, SiebelAppFacade.PhysicalRenderer);
                SiebelJS.Extend(VHASearchPanePR, SiebelAppFacade.SearchPaneRenderer);

                function VHASearchPanePR(pm) {
                    SiebelAppFacade.VHASearchPanePR.superclass.constructor.call(this, pm);
                }

                function E(e) {
                    var t = e.Get("findCategoryFields"),
                        n, r, i = 0,
                        s = [],
                        o = [];
                    for (var u = 0; u < t.length; u++)
                        n = t[u],
                        o.push(n.name),
                        n.isdisplay === "false" ? s.push("") : (r = $("#field_textbox_" + i),
                            s.push(r.val().trim()),
                            i++);
                    e.SetProperty("searchText", CCFMiscUtil_ArrayToString(s)),
                        e.SetProperty("findFieldsNames", CCFMiscUtil_ArrayToString(o))
                }

                function x(e) {
                    var t = e.GetFieldValue("Summary").trim().split(":SEPNEXT:");
                    return t[t.length - 1] === "" && (t.length = t.length - 1),
                        t
                }
                var e = SiebelJS.Dependency("SiebelApp.Constants"),
                    t = SiebelJS.Dependency("SiebelApp.Utils"),
                    n = SiebelApp.S_App.LocaleObject,
                    r = {},
                    s = 0,
                    o = 0,
                    u = 0,
                    a = !1,
                    f = "";

                function expand_searchpane(t) {
                    /*var sAppId = $(".siebui-results-list-applet > a").attr("Id");
                    sAppId=sAppId.replace("SWEApplet","");
                    var s = "#s_" + sAppId + "_ld"+" "+".jqgfirstrow"
                    var sBCName=$(".jqgfirstrow").next().children().eq(-1).attr("title").trim();
                   */
                    var sRecordsArray = t.GetPM().Get("GetRecordSet");
                    var sArrayLength = sRecordsArray.length;
                    var valToappend = new Array();
                    $("td[id*='l_title']").each(function() {
                        //var sAppId = $(".siebui-results-list-applet > a").attr("Id");
                        //sAppId = sAppId.replace("SWEApplet", "");  //SURESHA Upgrade 22.7
						var sAppId = $(".siebui-results-list-applet > div > a").attr("Id");
						sAppId = sAppId.replace("SWETopHidden", ""); 
                        var r = $(this).parent()[0].id,
                            s = "#s_" + sAppId + "_ld",
                            a = "",
                            f, l, c, h,sBCName = $(this).parent().children().eq(-1).attr("title").trim();
                        dashboard_html = (sBCName === "VF MSISDN" ) ? '<span  class="vha_dashboard_drilldown"><a href="#"></a></span>' : '';
                        
                        if ((sBCName === "VF MSISDN" || sBCName == "VHA NBN Service" || sBCName == "VHA FBB Service Details") && $(this).find(".vha_billing").length === 0) {
                           
                                ($(this).find("#drilldown_links").length === 0) ? $(this).find("a").after('<span id="drilldown_links">' + dashboard_html + '</span>') : '';
                        if(sBCName === "VF MSISDN")
						{
						var recs = $(this).parent().children().eq(-2).attr("title").trim();
                            var arr = recs.split(":SEPNEXT:");
                            var stat = arr[1].split(":SEP:");
                            var pmethod = arr[5].split(":SEP:");
                            st = '<span id="sts_title">' +"- "+ stat[1] + '</span>';
                            pay = '<span id="pay_title">' +"- "+ pmethod[1] + '</span>';
                             if($(this).find('#sts_title').length<=0)
                            $(this).find("#drilldown_links").after(st + pay);
						}
                        }
                    });
                    //var sAppId = $(".siebui-results-list-applet").attr("Id");
                    //sAppId = sAppId.replace("SWEApplet", ""); //SURESHA Upgrade 22.7
					var sAppId = $(".siebui-results-list-applet > div > a").attr("Id");
					sAppId = sAppId.replace("SWETopHidden", "");
                    var sIdToOpen = "#1_s_" + sAppId + "_l_CDIcon";
                    $(sIdToOpen).click();
                    var s = "#s_" + sAppId + "_ld";
                    var f = $(s).width();
					$(sIdToOpen).parent().next().css("width", f-1).removeClass("SearchRsltSecWdthAdded");
                }

                function gotoViewOnDrilldown(t, r, o, sClass) {
                    // var r = $(this).parent().parent().parent()[0].id; 
                    //var sClass=$(this).find("a").text();
                    //r -= 1,
                    //t.data.ctx.GetPM().OnControlEvent(e.get("PHYEVENT_SELECT_ROW"), r, !1, !1);
					var OthersLinksClass = sClass.split(':')[0];
					var OthersLinkRowId = sClass.split(':')[1];
					sClass = OthersLinksClass;
                    var sSum = o.GetFieldValue("Summary");
                    var sEntityName = $("td[id*='l_title']").first().parent().children().eq(-1).attr("title").trim();
                    var sAssetIndex = (sClass == "MNP_MSISDN_Title") ? sSum.indexOf("Connect Order Id") : ((sEntityName == "VHA NBN Service" || sEntityName == "VHA FBB Service Details") ? sSum.indexOf("Root Asset Integration Id") : sSum.indexOf("Installed Asset Id"));
                    var sLength = sSum.length;
                    //sSum=sSum.substring(sAssetIndex,sLength);
                    var sArray = sSum.substring(sAssetIndex, sLength).trim().split(":SEPNEXT:");
                    sArray = sArray[0].split(":SEP:");
                    var RecordId = sArray[1];
                    var ViewName = "";
                    var BusCompName = "";
                    if (sClass != "MNP_MSISDN_Title") {
                        var sPaymentIndex = sSum.indexOf("Payment Method");
                        var sArray = sSum.substring(sPaymentIndex, sLength).trim().split(":SEPNEXT:");
                        sArray = sArray[0].split(":SEP:");
                        var sPaymentType = sArray[1];
						var sServiceIndex = sSum.indexOf("Service Account Id");
						var sServiceAccID = sSum.substring(sServiceIndex, sLength).trim().split(":SEPNEXT:");
						sServiceAccID = sServiceAccID[0].split(":SEP:");
						
                        var sNBNIndex = sSum.indexOf("VHAIsNBN");
                        var sNBNArray = sSum.substring(sNBNIndex, sLength).trim().split(":SEPNEXT:");
                        sNBNArray = sNBNArray[0].split(":SEP:");
                        var IsNBN = sNBNArray[1];
                        if (IsNBN == "Y") {
                            sPaymentType = "NBN";
                        }
                        BusCompName = (sPaymentType == "Postpay" || (sPaymentType == "Prepay" && sClass == "Sales")) ? "VHA SUI Asset Mgmt - Asset - Header Thin BC" : "VHA SUI Asset Mgmt - Asset - Header Thin BC";
                    }
                    switch (sClass) {
                        case 'Billing':
                            ViewName = (sPaymentType == "Postpay" || (sEntityName == "VHA NBN Service" || sEntityName == "VHA FBB Service Details")) ? "VF SUI Billing Postpay NBA View" : "VF SUI Billing Prepay NBA Detail View";
                            break;
                        case 'Network':
                            ViewName = (sPaymentType == "Postpay" || (sEntityName == "VHA NBN Service" || sEntityName == "VHA FBB Service Details")) ? "VF SUI Network Postpay NBA Detail View" : "VF SUI Network Prepay NBA Detail View";
                            break;
                        case 'Sales':
                            ViewName = (sPaymentType == "Postpay" || (sEntityName == "VHA NBN Service" || sEntityName == "VHA FBB Service Details")) ? "VF SUI Sales Postpay NBA View" : "VF SUI Sales Prepay NBA View";
                            break;
                        case 'MSISDN_Title':
                            ViewName = "VF Asset Summary View";
                            BusCompName = "Asset Mgmt - Asset - Header";
                            break;
                        case 'MNP_MSISDN_Title':
                            ViewName = "VF Order Entry - Pending Transfer Number Request View";
                            BusCompName = "Order Entry - Orders";
                            break;
						case 'TPG':
                            //ViewName = "UT Contact Account View";
							ViewName = "VHA Customer Dashboard View";
                            BusCompName = "Contact";
							RecordId = OthersLinkRowId;
							SiebelApp.S_App.SetProfileAttr("VHA Cotact Primary Id",RecordId);
							SiebelApp.S_App.GotoView('VHA Customer Dashboard View');	
							return false;
                            break;
						case 'Customer Account':
                            //ViewName = "Account Detail - Contacts View";
                            ViewName = "VF Account Summary View"; // changed the view name for CM-1288
                            BusCompName = "Account";
							RecordId = sServiceAccID[1];
                            break;
						case 'Primary Contact':
							//ViewName = "UT Contact Account View";
                            ViewName = "VHA Customer Dashboard View";
                            BusCompName = "Contact";
							if(sEntityName == "VF Billing Account" || sEntityName == "Account")
							{
								var sOwnerId = sSum.indexOf("Primary Contact Id");
							}
							else{
							var sOwnerId = sSum.indexOf("Owner Contact Id");}
							var sOwnerCOntactID = sSum.substring(sOwnerId, sLength).trim().split(":SEPNEXT:");
							sOwnerCOntactID = sOwnerCOntactID[0].split(":SEP:");	
							RecordId = sOwnerCOntactID[1];
							SiebelApp.S_App.SetProfileAttr("VHA Cotact Primary Id",RecordId);
							SiebelApp.S_App.GotoView('VHA Customer Dashboard View');	
							return false;
                            break;
                        case 'Dashboard':
                            if (sPaymentType == "NBN") {
                                ViewName = "VHA NBN Asset Dashboard View";
                                //BusCompName="VHA Asset Management Dashboard Thin BC";
                            } else if (sPaymentType == "Prepay") {
                                ViewName = "VHA Prepay Asset Dashboard View";
                            } else {
                                ViewName = "VHA Postpay Asset Dashboard View";
                            }
                            BusCompName = "VHA Asset Management Dashboard Thin BC";
                            var Inputs = SiebelApp.S_App.NewPropertySet();                            
                            Inputs.SetProperty("VHADashboardAssetId", RecordId); /*03/10/2019 - Kathambari - Added for Dashboard*/
                            Inputs.SetProperty("VHADashboardPaymentMethod", sPaymentType);
                            var Outputs = VHAAppUtilities.CallBS("VF SPS TBUI Utilities", "SetProfileAttr", Inputs);
							break;
                        default:
                            break;
                    }

                    /*var SWECmd="GotoView&SWEView="+ViewName+"&SWEApplet0="+BusCompName+"&SWERowId0="+RecordId;
				SiebelApp.S_App.GotoView(ViewName, "", SWECmd, "");*/
                    var Inputs = SiebelApp.S_App.NewPropertySet();
                    var Output = SiebelApp.S_App.NewPropertySet();
                    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                    Inputs.SetProperty("Service Name", "VHA MSISDN GotoView BS");
                    Inputs.SetProperty("Method Name", "GotoView");
                    if (ViewName == "VF Asset Summary View") {
                        var BusObjName = "VF Asset";
                    } 
					else{
                        var BusObjName = (ViewName == "VHA NBN Asset Dashboard View" || ViewName == "VHA Postpay Asset Dashboard View" || ViewName == "VHA Prepay Asset Dashboard View") ? "VHA Generic Dashboard BO" : (ViewName == "VF Order Entry - Pending Transfer Number Request View") ? "Order Entry (Sales)" : (ViewName == "Account Detail - Contacts View" || ViewName ==  "VF Account Summary View") ? "Account" : (ViewName == "UT Contact Account View") ? "Contact" : "VHA SUI Asset";
                    }
					 
					
					
                    Inputs.SetProperty("BusObjName", BusObjName);
                    Inputs.SetProperty("BusCompName", BusCompName);
                    var sQueryF = (sEntityName == "VHA NBN Service" || sEntityName == "VHA FBB Service Details") ? "Integration Id" : "Id";
                    Inputs.SetProperty("QueryField", sQueryF)
                    Inputs.SetProperty("RowId", RecordId);
                    Inputs.SetProperty("ViewName", ViewName);
                    var Output = ser.InvokeMethod("Run Process", Inputs);
                    $('#maskoverlay').css("display", "block");
					
					
					

                }
                (function($) {
                    $.each(['show', 'hide'], function(i, ev) {
                        var el = $.fn[ev];
                        $.fn[ev] = function() {
                            this.trigger(ev);
                            return el.apply(this, arguments);
                        };
                    });
                })(jQuery);


                VHASearchPanePR.prototype.ShowUI = function() {
                        //SiebelAppFacade.CustListPM.superclass.CustomMethod.apply(this,arguments);
                        SiebelAppFacade.VHASearchPanePR.superclass.ShowUI.apply(this, arguments);

                    },
                    VHASearchPanePR.prototype.Init = function() {
                        SiebelAppFacade.VHASearchPanePR.superclass.Init.apply(this, arguments);
                        var this_t = this;
								this.AttachPMBinding("PaneStatus", function() {
                                var e = $("#srchpanecontainer"),
                                    t = this.GetPM().Get("PaneStatus");
                                t === "Show" && expand_searchpane(this);
								//var sActView = SiebelApp.S_App.GetActiveView().GetName();
                                /*if (t === "Show" && (sActView == 'VHA Postpay Asset Dashboard View' || sActView == 'VHA Prepay Asset Dashboard View' || sActView == 'VHA NBN Asset Dashboard View'))*/
								if (t === "Show" && $('#_sweview').find('#VHAAssetDashBoard').length > 0)
								{
                                    $('div[name="_sweview"]').removeClass("VHAAddVerticalScroll");
									setTimeout(function() {
										$('.HardCodedWidth,.siebel-InnerContainer.Right .siebel-SmallCards-Side,.siebel-InnerContainer.Right').removeAttr("style");
                                        var sWd = $('#VHAAssetDashBoard').width();
                                        $('.ui-jqgrid-btable[id*="VHA"]:not("#VHAActivitiesTable"):not("#VHAAssetDetailsTable"):not("#Networksettingstable")').each(function() {
                                            $(this).jqGrid('setGridWidth', (sWd / 2) - 20, true)
                                        });
                                        $("#VHAAssetDetailsTable,#VHAActivitiesTable,#Networksettingstable").jqGrid('setGridWidth', (sWd) - 40, true);;
					    $('#VHAActivitiesTable').jqGrid('setGridWidth', sWd - 40, true);
					                          
/*mani*/
var tables=$('#VHAAssetDashBoard .ui-jqgrid');
for(var table=0;table<tables.length;table++){
					                          var gridName=(tables[table].id).split('_')[1];
					if(!$('#gview_'+gridName).hasClass('HdrWdthAdded'))
					{
							var objHeader = $("table[aria-labelledby='gbox_" + gridName+ "'] tr[role=rowheader] th");

			for (var i = 0; i < objHeader.length; i++) {
  				 var col = $("table[id='" + gridName+ "'] td[aria-describedby='" + objHeader[i].id + "']");
  	 				var width= col.outerWidth()-1;
  				 $(objHeader[i]).css("width", width);
				}
					$('#gview_'+gridName).addClass('HdrWdthAdded');
					}
}
                                    }, 100);
                      
								}  
                                /*if (t === "Hide" && (sActView == 'VHA Postpay Asset Dashboard View' || sActView == 'VHA Prepay Asset Dashboard View' || sActView == 'VHA NBN Asset Dashboard View')) {*/
								if (t === "Hide" && $('#_sweview').find('#VHAAssetDashBoard').length > 0) {
									$('div[name="_sweview"]').addClass("VHAAddVerticalScroll");
                                    setTimeout(function() {
                                        if ($('#VHAActivitiesExpandCollapse').length > 0) 
                                            $('#VHAActivitiesCard').addClass("VHADisplayNone");
										if($('#VHAUsageDetailsExpandCollapse.VHADashBoardAppExp').length>0)$('#VHAUsageDetailsCard').toggle();
                                        $('.ui-jqgrid-btable[id*="VHA"]:not("#VHAActivitiesTable"):not("#Networksettingstable")').each(function() {
                                            $(this).jqGrid('setGridWidth', $(this).closest('.siebui-applet').width()-10, true)
										});
										$("#VHAActivitiesTable").jqGrid('setGridWidth', $("#VHAActivitiesTable").closest('.siebel-SmallCards-Side').width()-5, true);
										$('#Networksettingstable').jqGrid('setGridWidth', $('#Networksettingstable').closest('.siebel-SmallCards-Side').width() - 5, true);
                                        if ($('#VHAActivitiesExpandCollapse').length > 0) 
                                            $('#VHAActivitiesCard').removeClass("VHADisplayNone");
										if($('#VHAUsageDetailsExpandCollapse.VHADashBoardAppExp').length>0)$('#VHAUsageDetailsCard').toggle();
                           /*mani*/
var tables=$('#VHAAssetDashBoard .ui-jqgrid');
for(var table=0;table<tables.length;table++){
					                          var gridName=(tables[table].id).split('_')[1];
					if(!$('#gview_'+gridName).hasClass('HdrWdthAdded'))
					{
							var objHeader = $("table[aria-labelledby='gbox_" + gridName+ "'] tr[role=rowheader] th");

			for (var i = 0; i < objHeader.length; i++) {
  				 var col = $("table[id='" + gridName+ "'] td[aria-describedby='" + objHeader[i].id + "']");
  	 				var width= col.outerWidth()-1;
  				 $(objHeader[i]).css("width", width);
				}
					$('#gview_'+gridName).addClass('HdrWdthAdded');
					}
}
  

                                    }, 100);
									var width = $(window).width();
					$(window).bind('resize', function() {
					setTimeout(function() {
					var newwidth = $(window).width();
					if(width==newwidth)
					{
					$('.HardCodedWidth,.siebel-InnerContainer.Right .siebel-SmallCards-Side,.siebel-InnerContainer.Right').removeAttr("style");
					var sActExp="",sUsgDtlExp="",sAstExp="",sNbaExp="",sOrdExp="",sOthrSerExp="",sSRExp="";
					if ($('#VHAActivitiesExpandCollapse').length > 0){$('#VHAActivitiesExpandCollapse').trigger("click");sActExp="Y";} 
					if($('#VHAUsageDetailsExpandCollapse.VHADashBoardAppExp').length>0){$('#VHAUsageDetailsExpandCollapse.VHADashBoardAppExp').trigger("click");sUsgDtlExp="Y";}
					if($("#VHAAssetDetExpandCollapse").hasClass("VHADashBoardAppExp")){$('#VHAAssetDetExpandCollapse.VHADashBoardAppExp').trigger("click");sAstExp="Y";}
					if($("#VHANBAOffersExpandCollapse").hasClass("VHADashBoardAppExp")){$('#VHANBAOffersExpandCollapse.VHADashBoardAppExp').trigger("click");sNbaExp="Y";}
					if($("#VHAOrdersExpandCollapse").hasClass("VHADashBoardAppExp")){$('#VHAOrdersExpandCollapse.VHADashBoardAppExp').trigger("click");sOrdExp="Y";}
					if($("#VHAOtherServExpandCollapse").hasClass("VHADashBoardAppExp")){$('#VHAOtherServExpandCollapse.VHADashBoardAppExp').trigger("click");sOthrSerExp="Y";}
					if($("#VHASRExpandCollapse").hasClass("VHADashBoardAppExp")){$('#VHASRExpandCollapse.VHADashBoardAppExp').trigger("click");sSRExp="Y";}
					$('.ui-jqgrid-btable[id*="VHA"]:not("#VHAActivitiesTable"):not("#Networksettingstable"):not("#VHAAssetDetailsTable")').each(function() {
						$(this).jqGrid('setGridWidth', $(this).closest('.siebui-applet').width()-10, true)
					});
					$("#VHAActivitiesTable").jqGrid('setGridWidth', $("#VHAActivitiesTable").closest('.siebel-SmallCards-Side').width()-5, true);
					$('#Networksettingstable').jqGrid('setGridWidth', $('#Networksettingstable').closest('.siebel-SmallCards-Side').width() - 5, true);
					$('#VHAAssetDetailsTable').jqGrid('setGridWidth', $('#VHAAssetDetailsTable').closest('.flex_column_container.siebel-LargeCards').width() - 20, true);
					if (sActExp=="Y") $('#VHAActivitiesExpand').trigger("click");
					if(sUsgDtlExp=="Y")$('#VHAUsageDetailsExpandCollapse').trigger("click");
					if(sAstExp=="Y")$('#VHAAssetDetExpandCollapse').trigger("click");
					if(sNbaExp=="Y")$('#VHANBAOffersExpandCollapse').trigger("click");
					if(sOrdExp=="Y")$('#VHAOrdersExpandCollapse').trigger("click");
					if(sOthrSerExp=="Y")$('#VHAOtherServExpandCollapse').trigger("click");
					if(sSRExp=="Y")$('#VHASRExpandCollapse').trigger("click");
						
					}
					else
					{
					$('.HardCodedWidth,.siebel-InnerContainer.Right .siebel-SmallCards-Side,.siebel-InnerContainer.Right').removeAttr("style");
					var sWd = $('#VHAAssetDashBoard').width();
					$('.ui-jqgrid-btable[id*="VHA"]:not("#VHAActivitiesTable"):not("#VHAAssetDetailsTable"):not("#Networksettingstable")').each(function() {
						$(this).jqGrid('setGridWidth', (sWd / 2) - 20, true)
					});
					$("#VHAAssetDetailsTable,#VHAActivitiesTable,#Networksettingstable").jqGrid('setGridWidth', (sWd) - 40, true);
					$('#VHAActivitiesTable').jqGrid('setGridWidth', sWd - 40, true);
					}
					},100);
					});	

                       
                                }
                            }),
                            this.GetPM().AttachPMBinding("PostExecute", function(method_name, input_property_set, output_property_set) {
                                if (method_name == "GotoNextSet" || method_name == "GotoPreviousSet" || method_name == "GotoFirstSet" || method_name == "GotoLastSet") {
                                    expand_searchpane(this_t);
                                }
                            })
                    },
                    VHASearchPanePR.prototype.BindData = function(e) {
                        SiebelAppFacade.VHASearchPanePR.superclass.BindData.apply(this, arguments);
                        this.GetGrid().hideCol("Summary");
                        this.GetGrid().hideCol("BCName");
                    },
                    VHASearchPanePR.prototype.BindEvents = function() {
                        SiebelAppFacade.VHASearchPanePR.superclass.BindEvents.apply(this, arguments);

                        var a = [];
                        var i = this.GetPM();
                        var t = this;
                        var o = this.GetPM().Get("GetBusComp");

                        function T(e) {
                            var t = this.GetPM(),
                                n = $("div[id='searchpanetabs'] li"),
                                r = n.length;
                            for (var i = 0; i < r; i++)
                                $(n[i]).text().trim() === e && t.SetProperty("tabId", $(n[i]).attr("id"))
                        }
                        (function($) {
                            $.each(['show', 'hide'], function(i, ev) {
                                var el = $.fn[ev];
                                $.fn[ev] = function() {
                                    this.trigger(ev);
                                    return el.apply(this, arguments);
                                };
                            });
                        })(jQuery);
                        $("#" + i.Get("GetPlaceholder")).off("click", '[id*="CDIcon"]'),
                            $("#" + i.Get("GetPlaceholder")).on("click", '[id*="CDIcon"]', {
                                ctx: this
                            }, function(t) {
                                var r = $(this).parent()[0].id,
                                    i = t.data.ctx.GetPM().Get("GetFullId"),
                                    s = "#s_" + t.data.ctx.GetPM().Get("GetId") + "_ld",
                                    u = $("#" + i).find('[data-content-id="siebui-results-drop-content"]').find("input"),
                                    a = "",
                                    f, l, c, h;
                                var sBCName = $(this).parent().children().eq(-1).attr("title").trim();
                                r -= 1,
                                    t.data.ctx.GetPM().OnControlEvent(e.get("PHYEVENT_SELECT_ROW"), r, !1, !1);
                                var sDispVGE = 0;
                                if (!$(this).hasClass("siebui-search-pane-inline-close") && !$(this).hasClass("siebui-search-pane-inline-open")) {
                                    l = x(o);
                                    $('#showtext').text("");
                                    $('#showtext').removeClass("VHAOverdueTitle");
                                    var AcStatus = "";
                                    var vgeMsg = "";
                                    var BAStatus = "";
                                    var overClass = "";
									
                                    var nlen = l.length;
                                    for (h = 0; h < l.length; h++) {
                                        c = l[h].split(":SEP:");
                                        var sStatClass = c[0] === "Status" && (sBCName === "VF MSISDN"  || sBCName === "Account" || sBCName == "VF Billing Account") ? (" Class_Search_" + c[1]) : "";
                                        //var sOverdueClass = c[0] === "VF Billing Account Status" && (sBCName === "VF MSISDN" || sBCName === "Account" || sBCName == "VF Billing Account") ? (" Class_Overdue_Hide") : "";
                                        /*mani-created sDispClass for Overdue in title*/
                                        var sDispClass = c[0] === "VF Billing Account Status" && sBCName === "VF MSISDN" ? (c[1] === "Overdue" ? " VFDisplayNone Class_Search_Overdue" : " VFDisplayNone") : "";
										var sTPGClss = c[0] === "TPG" || sBCName === "VF MSISDN" || sBCName === "VHA NBN Order Details" ? (c[1] === "Y" ? " Class_TPG" : "") : "";															
															

                                        if ((sBCName === "VF MSISDN"  || sBCName == "VF Billing Account" || sBCName === "Account" || sBCName === "Orders" || sBCName === "Service Order" || sBCName === "Contact" || sBCName === "VF SIM" || sBCName === "VF IMEI") && (c[0] === "VGE")) vgeMsg = c[1];

                                        if ((sBCName === "VF MSISDN" || sBCName == "VF Billing Account") && (c[0] === "VF Billing Account Status")) BAStatus = c[1];
                                        if ((sBCName == "VF Billing Account") && (c[0] === "Status")) AcStatus = c[1];

                                        var sWidthClass = ((sBCName == "Account" && (c[0] == "Name" || c[0] == "First Name" || c[0] == "Last Name" || c[0] == "CSN / Row Id")) || (sBCName == "VF MSISDN" || sBCName === "VF IMSI"  && (c[0] == "Account" || c[0] == "First Name" || c[0] == "Payment Method" || c[0] == "Last Name" || c[0] == "One Net")) || (sBCName == "Contact" && (c[0] == "Account Name" || c[0] == "ID Reference Number" || c[0] == "Date of Birth")) || (sBCName == "VF Billing Account" && (c[0] == "Name" || c[0] == "First Name" || c[0] == "Last Name")) || (sBCName == "Orders" && (c[0] == "Date" || c[0] == "Row Id" || c[0] == "Order #")) || (sBCName == "VHA FBB Service Details" && c[0] == "Address" || c[0] == "Root Asset MSISDN" || c[0] == "NBN Location Id" || c[0] == "Product Instance Id"  || c[0] == "Asset Status") || (sBCName == "VF SIM" && (c[0] == "SIM"  || c[0] == "Account")) || (sBCName == "VF IMEI" && (c[0] == "IMEI"  || c[0] == "Account" || c[0] == "First Name" || c[0] == "Last Name"))  || (sBCName == "VHA NBN Service" && c[0] == "Product Instance Id")  || (sBCName == "VHA Service Request" && (c[0] == "Service Request #" || c[0] == "External Reference Id" )) || (sBCName == "VHA Self Service Details" && (c[0] == "Product Instance Id" || c[0] == "Account Name" )))?
                                            "siebui-span-lg-12" : "siebui-span-lg-6";
										//var sOverride25perlabl=((sBCName == "Contact" && (c[0] == "Account Name" || c[0] == "ID Reference Number")))?" NoWidth25Per":""
										
										
										
										if(sBCName === "Contact" && c[0] == "ID Reference Number")
										{
											
											var prrole = SiebelApp.S_App.GetProfileAttr("VHA Role Name");
											var RoleRespFnd="";

											try
											{
												RoleRespFnd = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_CUSTID_ROLE_RESP' AND [List Of Values.Name]= '" + prrole + "' AND [List Of Values.Active]='Y'", {
															"All": "true"
														})[0].Description;
											}

											catch (e$0) 
											{
												RoleRespFnd="";
											}


											if (RoleRespFnd == null || RoleRespFnd =="") 
											{
												
												var visiblechar = c[1].substr(c[1].length - 2, c[1].length);						
									
					var hashchar = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VF_CR_ENABLE_FLAG' AND [List Of Values.Name]= 'CUSTHASH' AND [List Of Values.Active]='Y'", {
										"All": "true"
									})[0].Value;
									
				hashchar = hashchar.substr(0, c[1].length - 2);									
													
				c[1] = hashchar+visiblechar;
															}
															
														}
										
										
										
                                        c[1] = (c[0] == "Order #" && sBCName == "VF New MSISDN") ? '<span  class="vha_mnpmsisdn_order drilldown"><a href="#">' + c[1] + '</a></span>' : c[1];
                                        var p = c.length > 1 ? c[1] : "";
                                        p = (c[0] != 'VGE' && (c[0] != "Order #" && sBCName != "VF New MSISDN")) ? HtmlEncode(p) : p;
										if(c[0]=='VGE'&&c[1]!='N')p="<span id='vgeSearch'>"+p+"</span>";/*mani added for UI review changes 4_12*/
/*mani changed 15/11*/
                                        if (h == nlen - 1) {
                                            if ((sBCName === "VF MSISDN" || sBCName === "VF Billing Account")) {
                                                if (vgeMsg != 'N' && (BAStatus === "Overdue" || AcStatus === "Overdue")) {

                                                    $('#showtext').html("<font size='2' color=red><b>" + vgeMsg + "</b></font><br><font size='6' color=red><b>" + "Overdue Account" + "</b></font>");
                                                    overClass = " printBoth";
                                                    sDispVGE = 2;
                                                } else if (vgeMsg != 'N') {
                                                    $('#showtext').html("<font size='2' color=red><b>" + vgeMsg + "</b></font>");
                                                    overClass = " onlyVGE";
                                                    sDispVGE = 1;
                                                } else if (BAStatus === "Overdue") {
                                                    $('#showtext').text("Overdue Account");
                                                    $('#showtext').addClass("VHAOverdueTitle");
                                                    overClass = " onlyOverdue";

                                                } else {

                                                }
                                            } else if ((sBCName === "Account" || sBCName === "Orders" || sBCName === "Service Order" || sBCName === "Contact" || sBCName === "VF SIM" || sBCName === "VF IMEI")) {
                                                if (vgeMsg != 'N') {
                                                    $('#showtext').html("<font size='2' color=red><b>" + vgeMsg + "</b></font>");
                                                    overClass = " onlyVGE";
                                                    sDispVGE = 1;
                                                }
                                            } else {

                                            }
                                        }
										
										
										
									
										
	/*mani changed*/
                                        // if (c[0] !== "Installed Asset Id" && (!(sBCName=="VF New MSISDN" && c[0]=="Connect Order Id")))
                                        if (!(sBCName == "VF MSISDN"  && (c[0] == "VHAIsNBN" || c[0] == "Payment Method" || c[0] == "Status")) && (c[0] !== "Installed Asset Id") && (!(sBCName == "VF New MSISDN" && c[0] == "Connect Order Id")) 
											&& (!((sBCName == "VHA NBN Service" || sBCName == "VHA FBB Service Details") && c[0] == "Root Asset Integration Id")))
											{
												if( HtmlEncode(c[0]) == 'Customer Account' || HtmlEncode(c[0]) == 'Primary Contact' || HtmlEncode(c[0]) == "Service Account Id" || HtmlEncode(c[0]) == "Owner Contact Id" )
												{																																
													
													a += '<div class="siebui-span-md-12 '  + sDispClass + overClass + sTPGClss +' siebui-span-sm-12"><ul class="siebui-search-dropdown-menu-item"><li class="siebui-label '+ HtmlEncode(c[0])+'" >' + HtmlEncode(c[0]) + ":  " + "</li>" + "<span class='searchDrilldown' sclass_val='"+HtmlEncode(c[0])+"'><li class=" + "'siebui-value linkClass" + sStatClass + sDispClass + sTPGClss +"'" + ">" + p + "</li></span>" + "</ul>" + "</div>"													
													
												}
												else{
													if(HtmlEncode(c[0]) != "Primary Contact Id")
													{
														a += '<div class="siebui-span-md-12 ' + sDispClass + overClass + sTPGClss +' siebui-span-sm-12"><ul class="siebui-search-dropdown-menu-item"><li class="siebui-label '+ HtmlEncode(c[0])+'">' + HtmlEncode(c[0]) + ":  " + "</li>" + "<li class=" + "'siebui-value" + sStatClass + sDispClass + sTPGClss +"'" + ">" + p + "</li>" + "</ul>" + "</div>"	
													}
													else{
														a += '<div class="siebui-span-md-12 ' + sDispClass + overClass + sTPGClss +' siebui-span-sm-12"><ul class="siebui-search-dropdown-menu-item"><li class="siebui-label '+ HtmlEncode(c[0])+' displayHidden">' + HtmlEncode(c[0]) + ":  " + "</li>" + "<li class=" + "'siebui-value" + sStatClass + sDispClass + sTPGClss +"'" + ">" + p + "</li>" + "</ul>" + "</div>"	
													}
												}
												
												
							if((sBCName == "VF MSISDN"  && HtmlEncode(c[0]) == "TPG") || (sBCName == "VF IMSI"  && HtmlEncode(c[0]) == "TPG")){
								
									var otherAccName,OtherAccRole,OtherAccDOB,otherConID = '';
																			
										var BSOtherlink = SiebelApp.S_App.GetService("VHA Other Linked Contacts BS");
										var inpOtherlink = SiebelApp.S_App.NewPropertySet();
										var OutOtherlink = SiebelApp.S_App.NewPropertySet();
										var sAccID = l[8];	
																								
										sAccID = sAccID.split(":SEP:");
										sAccID = sAccID[1];
										inpOtherlink.SetProperty("AccountId", sAccID);																											
										OutOtherlink = BSOtherlink.InvokeMethod("FetchContactByAccountId", inpOtherlink);															
										outputResult = OutOtherlink.GetChildByType("ResultSet").childArray;		
	
										//outputResult.forEach(function(resultItem){resultItem.propArray['Full Name'];})
										function otherlinkDetail(data){
											var otherlinkData = data;
											otherlinkData.forEach(function(resultItem){
											OtherAccRole = resultItem.propArray.Role;
											otherAccFullName = resultItem.propArray['Full Name'];
											OtherAccDOB = resultItem.propArray.DOB;
											otherConID = resultItem.propArray['0thConId'];
														 	
											//return otherAccName += '<span class=otherLinkName>'+resultItem.propArray['Full Name']+'<span>';
											
 otherAccName += '<span class="otherRole">'+ OtherAccRole + '</span>&nbsp;<span class="otherNames linkClass" data-otherrowID = "'+otherConID+'">'+ otherAccFullName + '</span>&nbsp;<span class="otherDOB">DOB:&nbsp;'+ OtherAccDOB + '</span></br>';
 //"<li class=" + "'siebui-value" + sStatClass + sDispClass + sTPGClss +"'" + ">" + otherlinkDetail(outputResult) + "</li>";
										});
										if(otherAccName != undefined)
										{
										return otherAccName.replace('undefined','');
										}else{
											return otherAccName = 'No Linked contacts';
										}
										}
																																																						
								a += '<div class="siebui-span-md-12 ' + sDispClass + overClass + sTPGClss +' siebui-span-sm-12"><ul class="siebui-search-dropdown-menu-item"><li class="siebui-label">' +  "Other Linked contacts"  + ":  " + "</li>" + "<span class='otherContactDrilldown' sclass_val='"+HtmlEncode(c[0])+"'><li class=" + "'siebui-value" + sStatClass + sDispClass + sTPGClss +"'" + ">" + otherlinkDetail(outputResult) + "</li></span>" + "</ul>" + "</div>"																							
								}
												
											}

                                    }
							
							$(document).on("click",".otherNames", function (e) {
                                $('#maskoverlay').css("display", "block");
                                var rvalue = $(this).parents('.siebui-search-pane-inline').prev('tr').attr('id');
								rvalue -= 1;
								var sClass = $(this).parents('.otherContactDrilldown').attr('sclass_val');
								sClass = sClass + ':'+$(this).attr('data-otherrowid');
								gotoViewOnDrilldown(e,rvalue,o,sClass);
                                
                            })
									/*$(document).on("click",".searchDrilldown", function (e) {
										
										var noValue = 0;
										var sclassval = $(this).attr('sclass_val');
										//gotoViewOnDrilldown(e,noValue,o,sclassval);
										//theApplication().GoToView("Account Detail - Contacts View","","Id='1-6T-89'");
						//var SWECmd = "SWECmd=GotoView&SWEView=Account+Detail+-+Contacts+View&SWERF=1&SWEHo=&SWEBU=1&SWEApplet0=SIS+Account+Entry+Applet&SWERowId0=1-6T-103&SWEApplet1=Account+Contact+List+Applet&SWERowId1=1-7E-76";						
						//SiebelApp.S_App.GotoView("Account Detail - Contacts View", "", SWECmd, "");
										e.stopImmediatePropagation();
										});*/

                                    $(this).addClass("siebui-search-pane-inline-open"),
                                        $(this).parent().after('<section class = "siebui-search-pane-inline"><section class="siebui-search-pane-inline-applet"> ' + a + "</section></section>"),
										 $(this).parent().next().find(".siebui-label").eq(-1).addClass(overClass),
                                        $(this).attr("title", n.GetLocalString("IDS_SEARCH_OUI_HIDE_DETAILS_TITLE"))
                                } else
                                    $(this).hasClass("siebui-search-pane-inline-close") ? ($(this).addClass("siebui-search-pane-inline-open").removeClass("siebui-search-pane-inline-close"),
                                        $(this).parent().next().slideDown(50),
                                        $(this).attr("title", n.GetLocalString("IDS_SEARCH_OUI_HIDE_DETAILS_TITLE"))) : ($(this).addClass("siebui-search-pane-inline-close").removeClass("siebui-search-pane-inline-open"),
                                        $(this).parent().next().slideUp(50),
                                        $(this).attr("title", n.GetLocalString("IDS_SEARCH_OUI_SHOW_DETAILS_TITLE")));
                                /*mani changed*/



                                $('#showtext').text(""); 
                                $('#showtext').removeClass("VHAOverdueTitle");
                                ar = $(this).hasClass("siebui-search-pane-inline-open");
                                br = $(this).parent().next('section').find(".Class_Search_Overdue");
								//sTPGstring = $(this).parent().next('section').find(".Class_TPG"); 
								
								 /*if (ar && (sTPGstring.length>0)) {
									 $('#showtext').html("<font size='5' color=Blue><b>" + "TPG Account" + "</b></font>");
                                }*/

                                if (ar && (br.length > 0)) {
									/*if(sTPGstring.length>0){
									$('#showtext').text("TPG Overdue Account");
									$('#showtext').addClass("VHAOverdueTitle");
									}
									else{*/
									$('#showtext').text("Overdue Account");
                                    $('#showtext').addClass("VHAOverdueTitle");
									    
                                }
                                var onlyVGE = $(this).parent().next().find(".onlyVGE");
                                var printBoth = $(this).parent().next().find(".printBoth");
                                var onlyOverdue = $(this).parent().next().find(".onlyOverdue");
                                if (ar) {
                                    if (sDispVGE == 1 || onlyVGE.length == 1) {
										/*if(sTPGstring.length>0){
										 $('#showtext').html("<font size='2' color=red><b>" + "VGE Customer, refer to Public Notes" + "</b></font><br><font size='6' color=Blue><b>" + "TPG Account" + "</b></font>");
										 }
										 else{*/
                                            $('#showtext').html("<font size='2' color=red><b>" + "VGE Customer, refer to Public Notes" + "</b></font>");
										

                                    }
                                    if (sDispVGE == 2 || printBoth.length == 1) {
										/*if(sTPGstring.length>0){
										 $('#showtext').html("<font size='2' color=red><b>" + "VGE Customer, refer to Public Notes" + "</b></font><br><font size='6' color=red><b>" + "TPG Overdue Account" + "</b></font>");
										 }
										 else{*/
                                            $('#showtext').html("<font size='2' color=red><b>" + "VGE Customer, refer to Public Notes" + "</b></font><br><font size='6' color=red><b>" + "Overdue Account" + "</b></font>");
                                        }
                                    if (onlyOverdue.length == 1) {
										/*if(sTPGstring.length>0){ 
										$('#showtext').text("TPG Overdue Account");
										$('#showtext').addClass("VHAOverdueTitle");
										}
										else{*/
                                        $('#showtext').text("Overdue Account");
                                        $('#showtext').addClass("VHAOverdueTitle");
                                        }
                                }

                                /*mani changed*/

                                f = $(s).find("tr.jqgfirstrow").width(),
                                    $(this).parent().next().css("width", f),
									(!$(this).parent().parent().find('tr:nth-child(2)+section').hasClass("SearchRsltSecWdthAdded"))?$(this).parent().parent().find('tr:nth-child(2)+section').css("width", f).addClass("SearchRsltSecWdthAdded"):"",
                                    t.stopImmediatePropagation()

						billing_html = '<span  class="vha_billing drilldown"><a href="#">Billing</a></span>';
                        sales_html = '<span  class="vha_sales drilldown"><a href="#">Sales</a></span>';
                        network_html = '<span  class="vha_network drilldown"><a href="#">Network</a></span>';
                       
                        final_html = '<span id="drillBill_sal_Net_links">' + billing_html +" "+ sales_html +" "+ network_html + '</span>';
                        if ((sBCName === "VF MSISDN" || sBCName === "VF IMSI" || sBCName == "VHA NBN Service" || sBCName == "VHA FBB Service Details") && $(this).find(".vha_billing").length === 0) {
                             var valll=$(this).parent().next().find("#drillBill_sal_Net_links");
						var SearchString="[List Of Values.Type]='VHA_USER_TYPE' AND [List Of Values.Active]='Y' AND [List Of Values.Name]='Care'";
						var sUsrLovVal=VHAAppUtilities.GetPickListValues("", SearchString);
                            if (SiebelApp.S_App.GetProfileAttr("VHA User Type") == sUsrLovVal && valll.length<=0)
                                $(this).parent().next().children().children().eq(-1).after(final_html);
                            }
							}),
                            //Pallavi.31/5/19.Added below code for partner portal search log
                            $("#searchtoolbarsrch").off("click", "#find_field_button"),
                            $("#searchtoolbarsrch").on("click", "#find_field_button", function(r) {
                                var s = $("#findcombobox").val();
                                //Pallavi.31/5/19-modified and added below code from VHABinacularSearchPostLoad.js 				
                                function callWF(val, str, secriteria, inps) {
                                    var ser1 = SiebelApp.S_App.GetService("Workflow Process Manager");
                                    var Inputs1 = SiebelApp.S_App.NewPropertySet();
                                    var Output1 = SiebelApp.S_App.NewPropertySet();
                                    Inputs1.SetProperty("ProcessName", "VHA Partner Portal OUI Workflow");
                                    Inputs1.SetProperty("searchVal", val);
                                    Inputs1.SetProperty("searchStr", str);

                                    if (secriteria == "MSISDN")
                                        Inputs1.SetProperty("MSISDN", inps);
                                    else if (secriteria == "BANUM")
                                        Inputs1.SetProperty("BillingAccountNum", inps);
                                    else
                                        Inputs1.SetProperty("OrderNum", inps);

                                    Output1 = ser1.InvokeMethod("RunProcess", Inputs1);
                                }
                                //Code Ends for Function Added to Call Workflow for PKE000000059560 - SANJEEV - 27/03/2018
								var searchVal = $("#findcombobox option:selected").text();
								if (searchVal == "  MSISDN"){
                                    //Below Added for PKE000000059560 - This code will log MSISDN search records in PartnerPortal - SANJEEV - 27/03/2018
                                    //mani added for sit defect - empty search							
                                    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                    var Inputs = SiebelApp.S_App.NewPropertySet();
                                    var Output = SiebelApp.S_App.NewPropertySet();
                                    Inputs.SetProperty("Service Name", "SIS OM PMT Service");
                                    Inputs.SetProperty("Method Name", "Set Profile Attribute");
                                    Inputs.SetProperty("Profile Attribute Name", "VHAOpenUIMSISDNSearch");
                                    Inputs.SetProperty("Profile Attribute Value", "OpenUIMSISDNSearch");
                                    Output = ser.InvokeMethod("Run Process", Inputs);
                                    //mani added for sit defect - empty search	- ends	
                                    var msisdn = $("input[title='MSISDN']").val();
                                    if (msisdn != "") {
                                        var searchStr = "MSISDN = " + msisdn;
                                        callWF(searchVal, searchStr, "MSISDN", msisdn);
                                    }
                                } else if (searchVal == "  Billing Account") //2
                                {
                                    var AccNo = $("input[title='Account #']").val();
                                    var name = $("input[title='Name']").val();
                                    var fname = $("input[title='First Name']").val();
                                    var lname = $("input[title='Last Name']").val();
                                    var rowid = $("input[title='Row Id']").val();
                                    var searchStr = "Account Number = " + AccNo + ";Name = " + name + ";First Name = " + fname + ";Last Name = " + lname + ";Row Id = " + rowid;
                                    callWF(searchVal, searchStr, "BANUM", AccNo);
                                } else if (searchVal == "  Customer Account") //3
                                {
                                    var name = $("input[title = 'Name']").val();
                                    var fname = $("input[title = 'First Name']").val();
                                    var lname = $("input[title='Last Name']").val();
                                    var dob = $("input[title = 'Date of Birth']").val();
                                    var email = $("input[title = 'Email Address']").val();
                                    var rowid = $("input[title='Row Id']").val();
                                    var csn_rowid = $("input[title = 'CSN / Row Id']").val();
                                    var searchStr = "Name = " + name + ";CUT First Name = " + fname + ";CUT Last Name = " + lname + ";Date of Birth = " + dob + ";Email Address = " + email + ";Row Id = " + rowid + ";CSN / Row Id = " + csn_rowid;
                                    callWF(searchVal, searchStr, "", "");
                                } else if (searchVal == "  Contact") //4
                                {
                                    var fname = $("input[title = 'First Name']").val();
                                    var lname = $("input[title='Last Name']").val();
                                    var wphone = $("input[title='Work Phone #']").val();
                                    var hphone = $("input[title='Home Phone #']").val();
                                    var idref = $("input[title = 'ID Reference Number']").val();
                                    var rowid = $("input[title='Row Id']").val();
                                    var searchStr = "First Name = " + fname + ";Last Name = " + lname + ";Work Phone # = " + wphone + ";Home Phone # = " + hphone + ";ID Reference Number = " + idref + ";Row Id = " + rowid;
                                    callWF(searchVal, searchStr, "");
                                } else if (searchVal == "  SIM") //5
                                {

                                    var sim = $("input[title = 'SIM']").val();
                                    if (sim != "") {
                                        var searchStr = "SIM = " + sim;
                                        callWF(searchVal, searchStr, "", "");
                                    }

                                } else if (searchVal == "  IMEI") //6
                                {
                                    var imei = $("input[title = 'IMEI']").val();
                                    if (imei != "") {
                                        var searchStr = "IMEI = " + imei;
                                        callWF(searchVal, searchStr, "", "");
                                    }
                                } else if (searchVal == "  Order") //7
                                {
                                    var order = $("input[title = 'Order #']").val();
                                    var rowid = $("input[title='Row Id']").val();
                                    var erefid = $("input[title = 'External Reference ID']").val();
                                    var searchStr = "Order # = " + order + ";Row Id = " + rowid + ";External Reference ID = " + erefid;
                                    callWF(searchVal, searchStr, "ORDERNUM", order);

                                } else if (searchVal == "  MNP MSISDN") //8
                                {
                                    var msisdn = $("input[title = 'MSISDN']").val();
                                    var searchStr = "MSISDN = " + msisdn;
                                    callWF(searchVal, searchStr, "MSISDN", msisdn);
                                } //code from VHABinacularSearchPostLoad.js ends
                                else if (searchVal == "  NBN Order" || searchVal == "  Service Request" || searchVal == "  Self Service Info") {
                                    var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
                                    var Inputs = SiebelApp.S_App.NewPropertySet();
                                    var Output = SiebelApp.S_App.NewPropertySet();
                                    Inputs.SetProperty("Service Name", "SIS OM PMT Service");
                                    Inputs.SetProperty("Method Name", "Set Profile Attribute");
                                    Inputs.SetProperty("Profile Attribute Name", "VHAOpenUIadvanceSearch");
                                    Inputs.SetProperty("Profile Attribute Value", "Y");
                                    Output = ser.InvokeMethod("Run Process", Inputs);
                                }

                                a = !1,
                                    E(i),
                                    i.SetProperty("performAdvanceFind", !0),
                                    i.SetProperty("LastSearchedCategory", s),
                                    T.call(t, "Siebel Find"),
                                    SiebelApp.S_App.uiStatus.Busy({}),
                                    setTimeout(function() { 
                                        i.OnControlEvent("ExecuteSearch", "Siebel Find", s),
                                            i.Get("GetRecordSet").length == 0 && typeof s != "undefined" && (s === "Smart Answer" || s === "Smart Answer Service Request" ? $(".siebui-row-counter").html(n.GetLocalString("IDS_SMART_ANSWER_SEARCH_NO_MATCH")) : $(".siebui-row-counter").html(e.get("SWE_ROW_COUNTER_NO_RECORDS"))),
                                            SiebelApp.S_App.uiStatus.IsBusy() && SiebelApp.S_App.uiStatus.Free(),
                                            $("#srch_toolbar_option").trigger("click");
                                    }, 0),

                                    $("#findcombobox").val("FindDelimeter"),
                                    $("#findcombobox").change(),
                                    $("#showtext").children().remove()
                                //Code ends for partner portal search log
                                setTimeout(function() {
                                    if(!($('.siebui-search-pane-inline')[0]))
									{
									$('#showtext').text("");
									$('#showtext').removeClass("VHAOverdueTitle");
									expand_searchpane(t); 
									}
                                }, 0)

                            }),
                            /*$("#" + t.GetPM().Get("GetPlaceholder")).on("click", '[class*="siebui-search-pane-inline"]', {
                ctx: this
            }, function(t) {
				setTimeout(function(){
				var sBCName=$(this).parent().children().eq(-1).attr("title").trim();
				if(sBCName==="VF MSISDN" || sBCName === "VF IMSI" || sBCName === "VF IMSI" || sBCName==="Account" || sBCName=="VF Billing Account")
			$(this).parent().find("li.siebui-label:contains('Status') ~ li").addClass("Class_Search_"+$("li.siebui-label:contains('Status') ~ li").text());},5000);
            }),*/
                            $("#" + t.GetPM().Get("GetPlaceholder")).on("click", '[class*="vha_billing"]', {
                                ctx: this
                            }, function(t) {
                                $('#maskoverlay').css("display", "block");
                                var r = $(this).closest("section").parent().prev().attr("id");
                                r -= 1;
                                t.data.ctx.GetPM().OnControlEvent(e.get("PHYEVENT_SELECT_ROW"), r, !1, !1);
                                var sClass = $(this).find("a").text();
                                gotoViewOnDrilldown(t, r, o, sClass);
                                t.stopImmediatePropagation();
                            }),
                            $("#" + t.GetPM().Get("GetPlaceholder")).on("click", '[class*="vha_sales"]', {
                                ctx: this
                            }, function(t) {
                                $('#maskoverlay').css("display", "block");
                                var r = $(this).closest("section").parent().prev().attr("id");
                                r -= 1;
                                t.data.ctx.GetPM().OnControlEvent(e.get("PHYEVENT_SELECT_ROW"), r, !1, !1);
                                var sClass = $(this).find("a").text();
                                gotoViewOnDrilldown(t, r, o, sClass);
                                t.stopImmediatePropagation();
                            }),
                            $("#" + t.GetPM().Get("GetPlaceholder")).on("click", '[class*="vha_network"]', {
                                ctx: this
                            }, function(t) {
                                $('#maskoverlay').css("display", "block");
                                var r = $(this).closest("section").parent().prev().attr("id");
                                r -= 1;
                                t.data.ctx.GetPM().OnControlEvent(e.get("PHYEVENT_SELECT_ROW"), r, !1, !1);
                                var sClass = $(this).find("a").text();
                                gotoViewOnDrilldown(t, r, o, sClass);
                                t.stopImmediatePropagation();
                            }),
                            $("#" + t.GetPM().Get("GetPlaceholder")).on("click", '[class*="vha_dashboard"]', {
                                ctx: this
                            }, function(t) {
                                $('#maskoverlay').css("display", "block");
                                var sClass = "Dashboard";
                                var r = $(this).closest("tr").attr("id");
                                r -= 1;
                                t.data.ctx.GetPM().OnControlEvent(e.get("PHYEVENT_SELECT_ROW"), r, !1, !1);
                                gotoViewOnDrilldown(t, r, o, sClass);
                                t.stopImmediatePropagation();
                            }),
							 $("#" + t.GetPM().Get("GetPlaceholder")).on("click", '[class="searchDrilldown"]', {
                                ctx: this
                            }, function(t) {
                                $('#maskoverlay').css("display", "block");
                               // var sClass = "Dashboard";
								var sClass = $(this).attr('sclass_val');
                                var r = $(this).parents('.siebui-search-pane-inline').prev('tr').attr('id');
                                r -= 1;
                                t.data.ctx.GetPM().OnControlEvent(e.get("PHYEVENT_SELECT_ROW"), r, !1, !1);
                                gotoViewOnDrilldown(t, r, o, sClass);
                                t.stopImmediatePropagation();
                            }), 
							
							
							
							//$('.otherNames').on("click",function(){
								
							//})
                            /*$("#" + t.GetPM().Get("GetPlaceholder")).on("click",  '[id*="l_title"]', {
                ctx: this
            },function(t) {
				var sBCName=$(this).parent().children().eq(-1).attr("title").trim();
				if(sBCName=="VF MSISDN" || sBCName === "VF IMSI")
				{
				var r = $(this).parent()[0].id; 
				r -= 1;
				var sClass="MSISDN_Title";
				gotoViewOnDrilldown(t,r,o,sClass)}} ),*/
                            $("#" + t.GetPM().Get("GetPlaceholder")).on("click", '.vha_mnpmsisdn_order', {
                                ctx: this
                            }, function(t) {
                                $('#maskoverlay').css("display", "block");
                                var r = $(this).closest("section").parent().prev()[0].id;
                                //var r = $(this).closest("tr").id; 
                                r -= 1;
                                var sClass = "MNP_MSISDN_Title";
                                t.data.ctx.GetPM().OnControlEvent(e.get("PHYEVENT_SELECT_ROW"), r, !1, !1);
                                gotoViewOnDrilldown(t, r, o, sClass)
                            }),
                            $("section.siebui-search-pane-inline").on("show", {
                                ctx: this
                            }, function(e) {
                                $(this).prev().children().eq(-1).attr("title").trim();
                                $(this).prev().find("li.siebui-label:contains('Status') ~ li").addClass("Class_Search_" + $("li.siebui-label:contains('Status') ~ li").text());
                            }),
                            //Madhu-25Oct19-Unbinding code from vanilla and added code for default MSISDN search
                            $("#srch_toolbar_option").unbind("click"),
                            $("#srch_toolbar_option").bind("click", {
                                ctx: this
                            }, function(e) {
                                var t = $("div[id='searchtoolbaroption'] ul"),
                                    n = $("div[id='searchtoolbaroption'] li"),
                                    r = SiebelAppFacade.ComponentMgr.FindComponent(SiebelApp.S_App.WPName());
                                if ($(this).hasClass("siebui-closed"))
                                    i.Get("activeEngine") === "OSES" && $(n[0].getElementsByTagName("a")).removeClass("ui-state-disabled"),
                                    i.Get("findEnabled") && $(n[1].getElementsByTagName("a")).removeClass("ui-state-disabled"),
                                    i.Get("osesEnabled") && $(n[2].getElementsByTagName("a")).removeClass("ui-state-disabled"),
                                    r.GetPM().Get("barcodeCategories") || r.GetPM().OnControlEvent("BarcodeCategories"),
                                    r.GetPM().Get("barcodeCategories") && r.GetPM().Get("barcodeCategories").length > 0 ? $(n[3].getElementsByTagName("a")).removeClass("ui-state-disabled") : $(n[3].getElementsByTagName("a")).addClass("ui-state-disabled"),
                                    $(this).removeClass("siebui-closed").addClass("siebui-open"),
                                    $('#srch_adv_find').trigger("click"),
                                    $('#findcombobox').val('MSISDN').trigger('change');
                                // t.removeClass("siebui-search-dropdown-menu-hide");  - This shoule be uncommented to show/hide search related menu
                                else {
                                    $("#srch_toolbar_text_box").removeAttr("disabled");
                                    // t.addClass("siebui-search-dropdown-menu-hide");    - This shoule be uncommented to show/hide search related menu
                                    if ($("#srch_toolbar_text_box").length)
                                        $("#Advanced_Srch_Dialog").length && $("#Advanced_Srch_Dialog").remove(),
                                        $(this).removeClass("siebui-open").addClass("siebui-closed"),
                                        $("#srch_toolbar_text_box").focus();
                                    else if ($("#findfieldsbox").length)
                                        $("#findfieldsbox").remove(),
                                        $("#findcombobox").val("FindDelimeter"),
                                        $("#findcombobox").focus(),
                                        $("#findcombobox").change(),
                                        $("#srch_toolbar_option").trigger("click");
                                    else if ($("#barcodefieldsbox").length)
                                        $("#barcodefieldsbox").remove(),
                                        $("#barcodecombobox").val("FindDelimeter"),
                                        $("#barcodecombobox").focus(),
                                        $("#barcodecombobox").change();
                                    else {
                                        $("#findcombobox").remove(),
                                            $("#barcodecombobox").remove();
                                        var s = '<input type="text"id="srch_toolbar_text_box"class="siebui-search-toolbar-textbox"/>';
                                        $("#searchtoolbarsrch").append(s).trigger("create"),
                                            //$("#srch_toolbar_text_box").autocomplete(f).focus(),
                                            $(this).removeClass("siebui-open").addClass("siebui-closed")
                                    }
                                }
                            })

                    }

                return VHASearchPanePR;
            }
            ());
        return "SiebelAppFacade.VHASearchPanePR";
    });
}
