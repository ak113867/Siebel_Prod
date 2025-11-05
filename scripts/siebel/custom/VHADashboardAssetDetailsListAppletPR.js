if (typeof(SiebelAppFacade.VHADashboardAssetDetailsListAppletPR) === "undefined") {
	SiebelJS.Namespace("SiebelAppFacade.VHADashboardAssetDetailsListAppletPR");
	define("siebel/custom/VHADashboardAssetDetailsListAppletPR", ["order!siebel/jqgridrenderer"], function () {
		SiebelAppFacade.VHADashboardAssetDetailsListAppletPR = (function () {
			function VHADashboardAssetDetailsListAppletPR(pm) {
				SiebelAppFacade.VHADashboardAssetDetailsListAppletPR.superclass.constructor.call(this, pm);
				/*Declare the PM binding here */
				/*SiebelApp.EventManager.cleanListners("VHADashboardAssetDetailsIC");
				SiebelApp.EventManager.addListner("VHADashboardAssetDetailsIC", VHADashboardAssetDetailsIC, this);*/
			}
			SiebelJS.Extend(VHADashboardAssetDetailsListAppletPR, SiebelAppFacade.JQGridRenderer);
			/*---------- Custom Code Goes Here ------------*/
			
			VHADashboardAssetDetailsListAppletPR.prototype.ShowUI = function () {
				SiebelAppFacade.VHADashboardAssetDetailsListAppletPR.superclass.ShowUI.call(this);
				VHADashboardAssetDetailsIC();	
			/*for(var i=0;i<=mydata.length;i++)
				$("#VHAOtherServicesTable").jqGrid('addRowData',i+1,mydata[i]);*/
			}
			
			 function VHADashboardAssetDetailsIC(e)
			{
			  var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
			 if(!ParentIC)
			 { 
                 VHADashboardCommon.VHADasboardGetICProp("AssetHeader");
				 ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
			 }
			 var pri_msisdn_wm="Enter Primary MSISDN";
			 var sec_imei_wm="Enter Secondary IMEI";
			 $('#VHAPrimaryMSISDNVal input').val(pri_msisdn_wm).addClass("DashboradWaterrmark");
			 $('#VHASecondaryIMEIVal input').val(sec_imei_wm).addClass("DashboradWaterrmark");			 
			 //$("#VHAPrimaryMSISDNVal input").val(ParentIC.GetProperty("Asset Number"));
			 $("#VHAAssetPropositionValue").html(ParentIC.GetProperty("Product Name"));
			 $('#VHARoamingVal').text(ParentIC.GetProperty("Roaming Status"));
			 if(ParentIC.GetProperty("Roaming Type")!="-") $('#VHARoamingVal1').text(" on " +ParentIC.GetProperty("Roaming Type"));
			 if(ParentIC.GetProperty("Roaming Status")=="Active")
				$('#VHARoamingVal').addClass("VHADashboardstatusgreencolour") ;
			 else if(ParentIC.GetProperty("Roaming Status")=="Inactive")
				$('#VHARoamingVal').addClass("VHADashboardstatusredcolour") ;
			 $("#VHASharingService").html(ParentIC.GetProperty("Sharing Group Count"));
			 var grpname = "";
			 if(ParentIC.GetProperty("Sharing Group Name") =="")
				grpname = "NA"; 
			 else 
				 grpname = ParentIC.GetProperty("Sharing Group Name");
			
			 $("#VHASharingGrpName").html(grpname);
			 
			// var Rateplan = ParentIC.GetChildByType("ListOfRate Plan");
			// var SharedFlg = Rateplan.GetChildByType("Rate Plan");
			 var Isshared = "";
			 if (ParentIC.GetProperty("VF Share Flag") == "N")
				 Isshared = "No";
			 else
				 Isshared = "Yes";
			 $("#VHASharedFlgVal").html(Isshared);
			 
			 var RelationMgmtIC = ParentIC.GetChildByType("ListOfRelationship Mgmt");
			 var RelationMgmtchildcount = RelationMgmtIC.GetChildCount();
			 for(k=0,l=1;k<RelationMgmtchildcount;k++)
			 {
				 var childProp = RelationMgmtIC.GetChild(k);
				 var prodtype = childProp.GetProperty("Product Type");
				 var Assetnum = childProp.GetProperty("Asset Number");
				 if (prodtype == "SIM")
					 $("#VHASIMVal").html(Assetnum);
				 else if(prodtype == "IMEI")
				 {
					//var imeilen = $(".IMEIVal").length
					if(l == 1)
					{
						$("#VHAIMEIVal"+l).html(Assetnum);
						
					}
					else{
					 $("#VHAIMEIDiv").append('<div class="flex_row_container VHAJustContentStart">\
					 <div id="VHAIMEILabel'+l+'" class="IMEILabel">IMEI '+l+':</div><div id="VHAIMEIVal" class="IMEIVal VHADashAssetDetailsPadding VHADashBold">'+Assetnum+'</div></div>');
					 
					 
					 /*append('<div id="VHAIMEIDiv" class="flex_row_container VHADashGreyColor VHADashboardLabels VHAMarginTop">\
					 <div class="flex_row_container VHAJustContentEnd VHADashBold">\
					 <div id="VHAIMEILabel'+l+'" class="IMEILabel">IMEI:</div><div id="VHAIMEIVal" class="IMEIVal">'+Assetnum+'</div></div></div>');*/
					}
					l++;
				 }
			 }
			// var RelationMgmtChild = RelationMgmtIC.GetChildByType("Relationship Mgmt");
			 
			 var AssetIC = ParentIC.GetChildByType("ListOfAsset Management");
			 var childcount = AssetIC.GetChildCount();
			 var ArrayDAta = new Array();
			 var tempArrayIndex = ["Product Name","Start Date","End Date","Duration","Status","Insurance Active Calc","Product Type"];			 
			 for(i=0;i<childcount;i++)
				{
					var Propset = AssetIC.GetChild(i);
					//var propcount = Propset.GetPropertyCount();
					var tempArray = Propset.propArray;
					var tempArray1 = new Array();	
					for(j=0;j<tempArrayIndex.length;j++)
					{
						var index = tempArrayIndex[j];
						if((index=="End Date" && tempArray["Product Type"]=="Billing - APP") || (index=="Start Date" && tempArray["Product Type"]=="Billing - Recurring"))
						{
							//To reverse date in above condition 
							var sDtindmy=tempArray[index];
							if(sDtindmy != "" && sDtindmy != null)
							{
							var sSplitArr=sDtindmy.split("/"); //25,8,2018
							var sDate=sSplitArr[0];
							sDate=(sDate.length==2)?sDate:"0"+sDate;
							var sMnth=sSplitArr[1];
							sMnth=(sMnth.length==2)?sMnth:"0"+sMnth;
							tempArray[index]=sMnth+"/"+sDate+"/"+sSplitArr[2];
							//25/8/2018
							}
						}
						tempArray1[index]=tempArray[index];	
					}
					ArrayDAta.push(tempArray1);
					
				}

			$("#VHAAssetDetailsTable").jqGrid({
			datatype: "local",
			data:ArrayDAta,
			rowNum: 20,
			//pager: "#AssetDetailsPager",
			//shrinktofit:false,
			//autowidth:true,
			height:"100%",
			colNames:['Plan & Contract','Start Date', 'End Date', 'Duration','Status','Device Care'],
			colModel:[
				{name:'Product Name',index:'Product Name',width:200},
				{name:'Start Date',index:'Start Date',width:100,formatter: 'date', formatoptions: { srcformat: 'd-m-Y H:i:s', newformat: 'd M Y'}},
				{name:'End Date',index:'End Date',width:100,formatter: 'date', formatoptions: { srcformat: 'm-d-Y H:i:s', newformat: 'd M Y'}},
				{name:'Duration',index:'Duration',width:200},
				{name:'Status',index:'Status',width:100},
				{name:'Insurance Active Calc',index:'Insurance Active Calc',width:100}
				
						
			],
			});
			//$("#gbox_VHAAssetDetailsTable").addClass("flex_row_container VHAJustContentCenter");
			/*$(window).bind('resize', function() {
			$('#VHAAssetDetailsTable').setGridWidth(width, true); //Back to original width
			$('#VHAAssetDetailsTable').setGridWidth($('#VHAAssetDetailsTable').width(), true); //Resized to new width as per window
		 }).trigger('resize');*/
			 /*$('#VHAAssetDetailsTable').setGridWidth(0);
			 var newwidth = $('#VHAAssetDetDiv').width()-200;
			 $('#VHAAssetDetailsTable').setGridWidth(newwidth);*/
			 //var DataGrid = $('#VHAAssetDetailsTable');
			// DataGrid.jqGrid('setGridWidth', parseInt($('#VHAAssetDetDiv').width()) - 20);  
			 /*$("#VHAAssetDetDiv").resize(function () { 
				   DataGrid.jqGrid('setGridWidth', parseInt($('#VHAAssetDetDiv').width()) - 20); 
			 });	*/
			//$("#VHAAssetDetDiv").resize();
		}

			VHADashboardAssetDetailsListAppletPR.prototype.BindEvents = function () {
				var pm=this.GetPM();
				SiebelAppFacade.VHADashboardAssetDetailsListAppletPR.superclass.BindEvents.call(this);
				var pri_msisdn_wm="Enter Primary MSISDN";
			 var sec_imei_wm="Enter Secondary IMEI";
			 $('#VHAPrimaryMSISDNVal input').blur(function(){
					if ($(this).val().length == 0){
					$(this).val(pri_msisdn_wm).addClass('DashboradWaterrmark');
					}		
			       });

				//if focus and text is watermrk, set it to empty and remove the watermark class
				$('#VHAPrimaryMSISDNVal input').focus(function(){
				if ($(this).val() == pri_msisdn_wm){
				$(this).val('').removeClass('DashboradWaterrmark');
				}
				});
				$('#VHASecondaryIMEIVal input').blur(function(){
					if ($(this).val().length == 0){
					$(this).val(sec_imei_wm).addClass('DashboradWaterrmark');
					}		
			       });

				//if focus and text is watermrk, set it to empty and remove the watermark class
				$('#VHASecondaryIMEIVal input').focus(function(){
				if ($(this).val() == sec_imei_wm){
				$(this).val('').removeClass('DashboradWaterrmark');
				}
				});
				$("#VHADBManageSS").on("click", '#VHARetrivebutton', {
                ctx: this
				},function(t){
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var sDashPrimMsisd=$("#VHAPrimaryMSISDNVal input").val();
				var sDashSecIMEI=$("#VHASecondaryIMEIVal input").val();
				sDashPrimMsisd=(sDashPrimMsisd!="Enter Primary MSISDN")?sDashPrimMsisd:"";
				sDashSecIMEI=(sDashSecIMEI!="Enter Secondary IMEI")?sDashSecIMEI:"";
				var Inputs = SiebelApp.S_App.NewPropertySet();;
				Inputs.SetProperty("Profile Attribute Name","VHASSPrimaryMSISDN");
				Inputs.SetProperty("Profile Attribute Value", sDashPrimMsisd);
				var Outputs = VHAAppUtilities.CallBS("SIS OM PMT Service", "Set Profile Attribute", Inputs);
				var Inputs1 = SiebelApp.S_App.NewPropertySet();;
				Inputs1.SetProperty("Profile Attribute Name","VHASSIMEI");
				Inputs1.SetProperty("Profile Attribute Value", sDashSecIMEI);
				var Outputs = VHAAppUtilities.CallBS("SIS OM PMT Service", "Set Profile Attribute", Inputs1);
				pm.ExecuteMethod("InvokeMethod", "mRetrieve", Inputs);
				} );
				 $("#VHAAssetDetailsbuttons").on('click','#VHAAssetDetExpandCollapse', function(){
		         if($(this).hasClass("VHADashBoardAppExp"))
		         {
			       $('#VHAAssetDetailsDiv').siblings().addClass("VHADisplayNone");
			       $(this).addClass("VHADashBoardAppColl").removeClass("VHADashBoardAppExp");
		         }
		        else
		        {
			     $('#VHAAssetDetailsDiv').siblings().removeClass("VHADisplayNone");
			     $(this).addClass("VHADashBoardAppExp").removeClass("VHADashBoardAppColl");
		        }		
		       });
				$("#VHAAssetDetailsbuttons").on("click", '#VHAGotoAssetDetailsView', {
                ctx: this
				},function(t){
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Output = SiebelApp.S_App.NewPropertySet();
				var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
				Inputs.SetProperty("Service Name", "VHA MSISDN GotoView BS");
				Inputs.SetProperty("Method Name", "GotoView");
				Inputs.SetProperty("BusObjName","VF Asset");
				Inputs.SetProperty("BusCompName","Asset Mgmt - Asset - Header");
				var ParentIC = VHAAppUtilities.GetConstants("VHADashboardParentIC");
				var RecordId = ParentIC.GetProperty("Installed Asset Id");
				Inputs.SetProperty("RowId",RecordId );
				Inputs.SetProperty("ViewName","VF Asset Summary View - with extra IN fields");
				var Output = ser.InvokeMethod("Run Process", Inputs);
				} );
				/*$("#VHAAssetHatCatButton").on("click", function(){
				var inp = SiebelApp.S_App.NewPropertySet();
				inp.SetProperty("SWEH", "350");        //Height of popup
				inp.SetProperty("SWEW", "800");      // Width of popup
				inp.SetProperty("SWETA", "VHA Generic Dashboard Offer History List Applet");
				inp.SetProperty("SWEM", "Edit List");
				pm.ExecuteMethod( "InvokeMethod", "ShowPopup", inp);
				});*/
				
			}

			return VHADashboardAssetDetailsListAppletPR;
		}
			());
		return "SiebelAppFacade.VHADashboardAssetDetailsListAppletPR";
	});
}
