if (typeof(SiebelAppFacade.VHASSJBillingAccountPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHASSJBillingAccountPR");
    define("siebel/custom/VHASSJBillingAccountPR", ["siebel/jqgridrenderer"], function () {
        SiebelAppFacade.VHASSJBillingAccountPR = (function () {
            function VHASSJBillingAccountPR(pm) {
                SiebelAppFacade.VHASSJBillingAccountPR.superclass.constructor.apply(this, arguments);
            }
            SiebelJS.Extend(VHASSJBillingAccountPR, SiebelAppFacade.JQGridRenderer);
            VHASSJBillingAccountPR.prototype.Init = function () {
                SiebelAppFacade.VHASSJBillingAccountPR.superclass.Init.apply(this, arguments);
            }
            VHASSJBillingAccountPR.prototype.ShowUI = function () {
                SiebelAppFacade.VHASSJBillingAccountPR.superclass.ShowUI.apply(this, arguments);
				
				 setTimeout(function () {
					// $('div[aria-label="Billling Account in Customer Account"]').find('.siebui-row-counter');
					$('div[aria-label="Billling Account in Customer Account"]').find('.siebui-row-counter').append('<span class="activeAssetText" style="display:none"> active asset </span>');
					
					$('div[aria-label="Billling Account in Customer Account"]').find('.ui-pg-table tbody tr')[1].prepend($('div[aria-label="Billling Account in Customer Account"]').find('.siebui-row-counter').text());
					//$('div[aria-label="Billling Account in Customer Account"]').find('.ui-pg-table').prepend($('div[aria-label="Billling Account in Customer Account"]').find('.siebui-row-counter').text());
					//$('div[aria-label="Billling Account in Customer Account"]').find('.ui-pg-table tbody').addClass("billRowCoun");
					$('div[aria-label="Billling Account in Customer Account"]').find('.siebui-row-counter').css('display','none');
					
				 }, 1000);
				
                var custAccId = SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("Account").GetFieldValue("Row Id");
                var billAcc = SiebelApp.S_App.GetService("VF BS Process Manager");
                var billInput = SiebelApp.S_App.NewPropertySet();
                var billout = SiebelApp.S_App.NewPropertySet();
                billInput.SetProperty("Service Name", "VHA Get Billing Accounts BS");
                billInput.SetProperty("AccountId", custAccId);
                billInput.SetProperty("Method Name", "SSJGetBillingAccountsDet");
                billout = billAcc.InvokeMethod("Run Process", billInput);
                var billingAccOut = billout.childArray[0].childArray[0].childArray
                    console.log(billingAccOut);
                if (billingAccOut != undefined) {
                    let billingAccountDiv = $('div[aria-label="Billling Account in Customer Account"] form');
                    let label = $('<label class="ssjLabel" for="billAccSelect">').text('Select billing account').css({
                        'margin-right': '10px'
                    });
                    let billDropdown = $('<select id="billAccSelect" class="ssjDropdownedit">');
                    $('button[data-display="Query BA"]').hide();
					$('.siebui-popup-togglebar').hide();
                    if (billingAccOut.length > 0) {
                        billingAccOut.forEach(function (account, index) {
                            let accountId = account.propArray.BillAccId;
                            let billAccNums = account.propArray.BillAccNum;
                            let billAccStatus = account.propArray.Status;
                            billDropdown.append($('<option>').val(billAccNums).text(billAccNums).attr('bill-status', billAccStatus));
                        });
                        let defaultBillling = $(".selected-billing-info").val();
                        var billingAccNo = billingAccOut[0].propArray.BillAccNum;
                        var status = billingAccOut[0].propArray.Status;
                        var statusClass = (status == "Open" || status == "Active") ? "CSGreen" : "CSRed";
                        $('div[aria-label="Billling Account in Customer Account"] .siebui-applet-title').after('<div class="selected-billing-info" id ="selected-billing-Id">${billingAccNo}</div>');
                        $('#selected-billing-Id').after(`<div class="selected-billing-status-static" style="background-color:#F0F2F5; border-radius: 5px;"><span class="vha-sc-coverageStatus ${statusClass}"></span><span>${status}</span></div>`);
                    }
                    billingAccountDiv.prepend(label, billDropdown);
                    $('.selected-billing-info').html($("#billAccSelect").val());
                    $('.selected-billing-status').html($("#billAccSelect").find('option:selected').attr('bill-status'));
                    billDropdown.on('change', function () {
                        let selectedValue = $(this).val();
                        let selectedStatus = $(this).find('option:selected').attr('bill-status');
                        let appletTitleDiv = $('div[aria-label="Billling Account in Customer Account"] .siebui-applet-title');
                        appletTitleDiv.nextAll('.selected-billing-info, .selected-billing-status, .selected-billing-status-static').remove();
                        $('.vha-sc-coverageStatus').remove();
                        appletTitleDiv.after(`<div class="selected-billing-info"> ${selectedValue} </div>`);
                        const statusClass = (selectedStatus == "Open" || selectedStatus == "Active") ? "CSGreen" : "CSRed";
                        $('.selected-billing-info').after(`<div class="selected-billing-status"><div class="selected-billing-status" style="background-color:#F0F2F5; border-radius: 5px;"><span class="vha-sc-coverageStatus ${statusClass}"></span><span> ${selectedStatus} </span></div></div>`);
                        SiebelApp.S_App.SetProfileAttr("SSJBillAccNum", selectedValue);
                        $('button[data-display="Query BA"]').click();
						$('.siebui-popup-togglebar').hide();
                    });
                    $('#s_'+SiebelApp.S_App.GetActiveView().GetAppletMap()['VHA SSJ Asset Billing Applet'].GetFullId() + '_div').addClass('vha-billing-change');
                }
            }
            VHASSJBillingAccountPR.prototype.BindData = function (bRefresh) {
                SiebelAppFacade.VHASSJBillingAccountPR.superclass.BindData.apply(this, arguments);
            }
            VHASSJBillingAccountPR.prototype.BindEvents = function () {
                SiebelAppFacade.VHASSJBillingAccountPR.superclass.BindEvents.apply(this, arguments);
				$('button[title="Billling Account List Applet:Upgrade"]').on('click',function(){
					
					const selectedBillRowID = SiebelApp.S_App.GetActiveView().GetApplet("VHA SSJ Asset Billing Applet").GetBusComp().GetFieldValue("Id");
					
					SiebelApp.S_App.SetProfileAttr("JourneyType", "Upgrade");
					SiebelApp.S_App.SetProfileAttr("selectedBillRowID", selectedBillRowID);
					
				})
            }
            VHASSJBillingAccountPR.prototype.EndLife = function () {
                SiebelAppFacade.VHASSJBillingAccountPR.superclass.EndLife.apply(this, arguments);
            }
            return VHASSJBillingAccountPR;
        }
            ());
        return "SiebelAppFacade.VHASSJBillingAccountPR";
    })
}
