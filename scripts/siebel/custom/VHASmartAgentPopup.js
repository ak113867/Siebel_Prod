if (typeof(VHASmartAgentPopup) === "undefined") {
    var VHASmartAgentPopup = {};

    var SendTextType = "SendText";

    VHASmartAgentPopup.GetSmartAgentPopup = function(data) {
        var createActivityTab = '<li><a href="#VHAActivityTab">Create Activity</a></li>';
        var createActivityDiv = '<div id="VHAActivityTab"></div>';
        var sendTextTab = '<li><a href="#VHASMSTab">Send Text</a></li>';
        var sendTextDiv = '<div id="VHASMSTab"></div>';
        var sendMailTab = '<li><a href="#VHAMailTab">Send Email</a></li>';
        var sendMailDiv = '<div id="VHAMailTab"></div>';

        var tab = sendTextTab + sendMailTab;

        var contentBody = sendMailDiv + sendTextDiv;
        contentBody = data.Type === SendTextType ? contentBody : createActivityDiv + contentBody;

        tab = data.Type === SendTextType ? tab : createActivityTab + tab;

        return '<div id="VHASmartBuddyDialog">\
            <div id="VHASmartBuddy">\
                <ul>' + tab + '</ul>' +
            contentBody +
            '</div>\
            </div>';
    }

    VHASmartAgentPopup.GetCretActContainer = function(data) {


        var CAButton = '<div id="CreateActivityCA" class="VHASmartAgentButtonsPostive2 VHAFloatLeft" AccountId = ' + data.AccountId + '>CA Activity</div>';
        var BAButton = '<div id="CreateActivityBA" class="VHASmartAgentButtonsPostive2 VHAFloatLeft" BillingId = ' + data.BillingId + '>BA Activity</div>';
        var IAButton = '<div id="CreateActivityIA" class="VHASmartAgentButtonsPostive2 VHAFloatLeft" AssetId = ' + data.AssetId + '>IA Activity</div>';

        CAButton = data.AccountId !== "" ? CAButton : "";
        BAButton = data.BillingId !== "" ? BAButton : "";
        IAButton = data.AssetId !== "" ? IAButton : "";


        return '<div class="VHACretActContainer">\
        <div class="VHACretActForm">\
            <div class="VHACretActNotesSection">\
                <div class="VHACretActSection0 VHADisplayNone">\
                    <div class="VHACretActSection">\
                        <div class="mceGridField mceField">\
                            <span class="SearchIcon"></span>\
                            <input id="SearchActivityTemplates" class="SearchSendTextTemplates" placeholder="Search Activity templates">\
                        </div>\
                    </div>\
                    <div class="VHACretActSection">\
                        <ul id="VHAActvityDefaultTemp" class="VHASmartAgentSelectables"></ul>\
                    </div>\
                </div>\
                <div class="VHACretActSection1 VHADisplayNone">\
                    <div class="VHACretActSection">\
                        <span>Activity</span>\
                        <div class="mceGridField mceField">\
                            <input id="ActivityCategory">\
                            <span class="siebui-icon-dropdown applet-form-combo applet-list-combo" id="ActivityCategoryDropDown" data-allowdblclick="true"></span>\
                        </div>\
                    </div>\
                    <div class="VHACretActSection">\
                        <span>Activity Type</span>\
                        <div class="mceGridField mceField">\
                            <input id="ActivityType">\
                            <span class="siebui-icon-dropdown applet-form-combo applet-list-combo" id="ActivityTypeDropDown" data-allowdblclick="true"></span>\
                        </div>\
                    </div>\
                </div>\
                <div class="VHACretActSection2 VHADisplayNone">\
                    <div class="VHACretActReadSection">\
                        <div class="VHACretActSectionType2">\
                            <span>' + data.Label + ': </span>\
                            <span id="ActivityMSISDNValue" class="VHACretActReadonly">' + data.RefValue + '</span>\
                        </div>\
                        <div class="VHACretActSectionType2">\
                            <span>Activity: </span>\
                            <span id="ActivityCategoryValue" class="VHACretActReadonly"></span>\
                        </div>\
                        <div class="VHACretActSectionType2">\
                            <span>Activity Type: </span>\
                            <span id="ActivityTypeValue" class="VHACretActReadonly"></span>\
                        </div>\
                        <div class="VHACretActEditIcon"><img src="images/custom/edit_icon.png"/></div>\
                    </div>\
                    <div class="VHACretActSection">\
                        <div class="mceGridField mceField">\
                            <span class="SearchIcon"></span>\
                            <input id="SearchActivityTemplates2" class="SearchSendTextTemplates" placeholder="Search Activity templates">\
                        </div>\
                    </div>\
                    <div>\
                        <span class="VHASmartAgentFieldLabel">Activity Description</span>(<span id="VHACretActDescriptionCounter">0/150</span>)\
                        <div class="mceGridField mceField">\
                            <input maxlength="150" class="VHACretActDescription VHASmartAgentTextFields" AssetId="' + data.AssetId + '" AccountId="' + data.AccountId + '" MSISDN="' + data.MSISDN + '" BillingId = "' + data.BillingId + '"></input>\
                        </div>\
                    </div>\
                    <div>\
                        <span class="VHASmartAgentFieldLabel">Activity Comments</span>(<span id="VHACretActCommentsCounter">0/1500</span>)\
                        <div class="mceGridField mceField">\
                            <textarea rows="20" maxlength="1500" class="VHACretActComments" AssetId="' + data.AssetId + '" AccountId="' + data.AccountId + '" MSISDN="' + data.MSISDN + '" BillingId = "' + data.BillingId + '"></textarea>\
                        </div>\
                    </div>\
                    <div class="VHACretActSection CreateActivityButtons">' + CAButton + BAButton + IAButton + '</div>\
            </div>  </div> </div>  <div class = "VHACretActSection" > <div id = "SendTextCancelButton" class = "VHASmartAgentButtonsNegtive VHAFloatLeft" > Cancel </div> </div ></div>';
    }

    VHASmartAgentPopup.GetSendMailContainer = function(data) {
        // <div class="VHACretActSection">\
        //                 <div class="mceGridField mceField">\
        //                     <input id="SendTextEmailCC" class="SmartAgentInputClass" placeholder="Enter CC: email eg. name@something.com">\
        //                 </div>\
        //             </div>\
        return '<div class="VHACretActSection">\
                        <div class="mceGridField mceField">\
                            <input id="SendTextEmailTo" class="SmartAgentInputClass" placeholder="Enter To: email eg. name@something.com">\
                        </div>\
                    </div>\
                    <div class="VHACretActSection">\
                        <div class="mceGridField mceField">\
                            <span class="SearchIcon"></span>\
                            <input id="SearchSendMailTemplates" class="SmartAgentInputClass" class="SearchSendTextTemplates" placeholder="Search send mail templates">\
                            <span class="siebui-icon-dropdown applet-form-combo applet-list-combo" id="MailTemplateDropDown" data-allowdblclick="true"></span>\
                        </div>\
                    </div>\
                    <div class="VHACretActSection">\
                        <ul id="VHASendMailDefaultTemp" class="VHASmartAgentSelectables"></ul>\
                    </div>\
                    <div class="VHACretActSection">\
                        <div class="mceGridField mceField">\
                            <input id="SendEmailSubject" class="SmartAgentInputClass" placeholder="Enter mail Subject" readonly>\
                        </div>\
                    </div>\
                    <div class="VHACretActSection">\
                        <div class="VHACretActSection">\
                            <span class="VHASmartAgentFieldLabel">Content</span>\
                            <div class="mceGridField mceField VHACretActMailMessageDynamicArea VHADisplayNone">\
                        </div>\
                    </div>\
                    <div class=VHACretActSection">\
                        <div id="SmartAgentMailAttachments" class="VHADisplayNone">\
                        </div>\
                    <\div>\
                    <div class="VHACretActSection">\
                        <div id="SendMailCancelButton" class="VHASmartAgentButtonsNegtive VHAFloatLeft">Cancel</div>\
                        <div id="SendMailButton" class="VHASmartAgentButtonsPostive VHAFloatRight">Send Email</div>\
                    </div>\
            ';
    }

    VHASmartAgentPopup.GetSendTextContainer = function() {
        return '<div class="VHACretActSection">\
        <span class="VHASmartAgentFieldLabel">MSISDN</span>\
        <div class="mceGridField mceField">\
            <input id="SendTextMSISDN" placeholder="Enter MSISDN 614 or 04">\
        </div>\
    </div>\
    <div class="VHACretActSection">\
        <span class="VHASmartAgentFieldLabel">Message Text</span>\
        <div class="mceGridField mceField VHACretActTextMessageDynamicArea">\
        </div>\
        <div class="mceGridField1 mceField1 VHACretActTextMessageTextArea VHADisplayNone">\
            <textarea maxlength="1000" id="TextMessageTextArea"></textarea>\
        </div>\
        <input type="checkbox" id="GenericText" >Generic Send Text</input>\
    </div>\
    <div class="VHACretActSection">\
        <div class="mceGridField mceField">\
            <span class="SearchIcon"></span>\
            <input id="SearchSendTextTemplates" class="SearchSendTextTemplates" placeholder="Search send text templates">\
        </div>\
    </div>\
    <div class="VHACretActSection">\
        <ul id="VHASendTextDefaultTemp" class="VHASmartAgentSelectables"></ul>\
    </div>\
    <div class="VHACretActSection">\
        <div id="SendTextCancelButton" class="VHASmartAgentButtonsNegtive VHAFloatLeft">Cancel</div>\
        <div id="SendTextButton" class="VHASmartAgentButtonsPostive VHAFloatRight">Send Text</div>\
    </div>';
    }


    VHASmartAgentPopup.AppendCreateActivityButton = function(parentElement, data) {
        if (data.Type === "CA") {
            if ($("#CreateActivityButton").length === 0) {
                var buttonHtml = "<div id='CreateActivityButton' class='VHACretActButton'>Smart Agent</div>";
                $(parentElement).append(buttonHtml);
            }

        } else {
            if ($("#CreateActivityButton").length === 0) {
                var buttonHtml = "<div id='CreateActivityButton' class='VHACretActButton'>Smart Agent</div>";
                $(parentElement).append(buttonHtml);
            }
        }
        $(parentElement).on("click", "#CreateActivityButton", { ctx: data }, displaySmartAgent);
    }
    VHASmartAgentPopup.dateToString = function(dateString) {
        var dateType = new Date(dateString);
        var dateString = ('0' + dateType.getDate()).slice(-2) + "/" + ('0' + (dateType.getMonth() + 1)).slice(-2) + "/" + dateType.getFullYear();
        return dateString;
    }

    VHASmartAgentPopup.validateDateString = function(e) {
        var InlineFiledValue = $(this).val();
        //console.log(InlineFiledValue.split("-"));
        //console.log(e.originalEvent.keyCode);
        if (e.originalEvent.keyCode == 8 || e.originalEvent.keyCode == 46) {

        } else
        if (Number(InlineFiledValue.split("-")[0]) > 999) {
            e.preventDefault();
        }
        //console.log(InlineFiledValue.length>10);
    }


    function displaySmartAgent(e) {
        var popup = $("#VHACreateActivityParentCont");
        if (popup.length === 0) {
            var data = getActivityParentData(e.data.ctx);
            initializeSmartAgentPopup(data);
        } else {
            if ($("#VHACreateActivityParentCont").dialog("isOpen")) {
                alert("Smart Agent is currently open. Please complete your current action or \
                hit Cancel to close the current Smart Agent window before launching it again.")
                    //alert("Smart agent has been launched already in the current session. Please save or complete the current task and launch again.");
            } else {
                var data = getActivityParentData(e.data.ctx);
                initializeSmartAgentPopup(data);
            }
        }
        var position = VHAAppUtilities.GetConstants("SmartAgentPosition");
        if (position) {
            $("#VHACreateActivityParentCont").dialog("option", { position: { my: "left top", at: "left+" + position.left + " top+" + position.top, of: window } });
        }
    }

    function getActivityParentData(data) {
        switch (data.Type) {
            case "MSISDN":
                var SearchSpec = "[Installed Assets.Id]='" + data.ParentRef + "'";
                var IntObjName = "VF Asset Mgmt Thin";
                var Response = VHAAppUtilities.GetSiebelDataFromIO(SearchSpec, IntObjName, {});
                data["AssetId"] = Response.GetChildByType("Installed Assets").GetProperty("Id");
                data["AccountId"] = Response.GetChildByType("Installed Assets").GetProperty("Service Account Id");
                data["BillingId"] = Response.GetChildByType("Installed Assets").GetProperty("Billing Account Id");
                data["Label"] = "MSISDN";
                data["RefValue"] = Response.GetChildByType("Installed Assets").GetProperty("MSISDN");
                break;
            case "CA":
                data["AssetId"] = "";
                data["AccountId"] = data.ParentRef;
                data["BillingId"] = "";
                data["Label"] = "Customer Account Name";
                data["RefValue"] = data.RefValue;
                break;
            case "BA":
                var SearchSpec = "[VF Billing Account.Id]='" + data.ParentRef + "' AND [Asset Mgmt - Asset - Header - Thin.Id] IS NULL";
                var IntObjName = "VHA Billing Account IO";
                var Response = VHAAppUtilities.GetSiebelDataFromIO(SearchSpec, IntObjName, {});
                data["AssetId"] = "";
                data["AccountId"] = Response.GetChildByType("VF Billing Account").GetProperty("Master Account Id");
                data["BillingId"] = Response.GetChildByType("VF Billing Account").GetProperty("Id");
                data["Label"] = "Billing Account Name";
                data["RefValue"] = Response.GetChildByType("VF Billing Account").GetProperty("Account Number");
                break;
            default:
        }
        return data;
    }

    function initializeSmartAgentPopup(data) {
        if ($("#VHACreateActivityParentCont").length === 0) {
            $('body').append('<div id="VHACreateActivityParentCont"></div>');
        }
        $("#VHACreateActivityParentCont").html(VHASmartAgentPopup.GetSmartAgentPopup(data));
        $("#VHASmartBuddy").tabs({
            activate: function(event, ui) {
                if (ui.newPanel.attr("Id") == "VHAMailTab") {
                    $("#VHACreateActivityParentCont").dialog("option", { width: 1000 });
                } else {
                    $("#VHACreateActivityParentCont").dialog("option", { width: 500 });
                }
            }
        });
        $("#VHACreateActivityParentCont").dialog({
            maxWidth: 1000,
            minWidth: 500,
            title: "Smart Agent",
            position: { my: "top+20% top+10%", at: "top+10%", of: window },
            classes: {
                "ui-dialog": "SmartAgentTitle"
            },
            create: function(event, ui) {
                $('.ui-dialog-titlebar').append('<button class="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close VHASmartAgentMinimize"><span class="ui-button-icon ui-icon ui-icon-minus"><span class="ui-button-icon-space"> </span></span></button>');
            },
            beforeClose: function(event, ui) {

                if (valdiateBeforeClose()) {
                    event.preventDefault();
                }
            },
            close: function(event, ui) {
                //console.log("Cloase Popup");
                $("#SendTextFloatContiner").addClass("VHABackgroundInactive", { duration: 1000 }).removeClass("VHABackgroundActive VHABackgroundMinimize", { duration: 100 });
            },
            open: function(event, ui) {
                //console.log("Open Popup");
                $("#SendTextFloatContiner").addClass("VHABackgroundActive", { duration: 1000 }).removeClass("VHABackgroundInactive VHABackgroundMinimize", { duration: 100 });
            },
            resize: function(event, ui) {
                //console.log("resize");
                $(".VHACretActMailMessageDynamicArea").css("height", "auto").css("width", "auto");
            },
            dragStop: function(event, ui) {
                //console.log("dragStop");
                //console.log(ui);
                VHAAppUtilities.SetConstants("SmartAgentPosition", ui.position);
            }
        });
        if (data.Type === SendTextType) {
            initializeSendText();
            initializeSendMail(data);
        } else {
            initializeSendText();
            initializeSendMail(data);
            intializeActivityForm(data);
            /*if (data.Type === "MSISDN") {
                $("#SendTextMSISDN").val(data.RefValue);
            }*/
        }



        $('#VHASmartBuddy li:last-child').on('click', function() {
            if (data.Type === "MSISDN") {
                $("#SendTextMSISDN").val(data.RefValue);
            }
        });
		
		$('#VHASmartBuddy li[aria-controls="VHASMSTab"]').on('click', function() {	
            if (data.Type === "MSISDN") {	
                $("#SendTextMSISDN").val(data.RefValue);	
            }	
        });//ss103269: Added for PKE000000091023


        $(".SmartAgentTitle").on('click', '.VHASmartAgentMinimize', function(e) {
            $("#VHACreateActivityParentCont").parents('.ui-dialog').hide("slide", { direction: "down" }, 500);
            $("#SendTextFloatContiner").addClass("VHABackgroundMinimize", { duration: 1000 }).removeClass("VHABackgroundActive VHABackgroundInactive", { duration: 100 });
        });

        var TempListSendText = VHAAppUtilities.GetConstants("SendTextTemplates");
        var TempListActivity = VHAAppUtilities.GetConstants("ActivityTemplate");
        if (data.Type === SendTextType) {
            if (!TempListSendText) {
                alert("There are no active templates associated to your role. Please contact system adminstrator.");
                cancelSendTextMessage();
            }
        } else {
            if (!TempListSendText && !TempListActivity) {
                alert("There are no active templates associated to your role. Please contact system adminstrator.");
                cancelSendTextMessage();
            }
        }


        //Added below to control the double click page redirect.
        $("#VHASmartBuddy .ui-tabs-nav a").removeAttr("href");

    }

    function valdiateBeforeClose() {
        var TempListSendText = VHAAppUtilities.GetConstants("SendTextTemplates");
        var TempListActivity = VHAAppUtilities.GetConstants("ActivityTemplate");
        if (!TempListSendText && !TempListActivity) {
            return false
        }
        var MSISDN = $("#SendTextMSISDN").val() || "";
        var TextBody = $(".VHACretActTextMessageDynamicArea").html() || "";
        var ActDesc = $(".VHACretActDescription").val() || "";
        var ActComm = $(".VHACretActComments").val() || "";
        var ActCat = $("#ActivityCategory").val() || "";
        var ActType = $("#ActivityType").val() || "";
        var MailTo = $("#SendTextEmailTo").val() || "";
        var MailBody = $(".VHACretActTextMessageDynamicArea").html() || "";
        if (
            MSISDN !== "" ||
            TextBody.trim() !== "" ||
            ActDesc !== "" ||
            ActComm.trim() !== "" ||
            ActCat !== "" ||
            ActType !== "" ||
            MailTo !== "" ||
            MailBody.trim() !== ""
        ) {
            //return !confirm("Would you like to close the Smart Agent. There is unsaved data pending to be saved. Click Ok to ignore and Cancel to save.");
            return !confirm("Do you want to close Smart Agent without submitting your \
            Activity/sending your TXT/EMAIL? Click OK to close, or Cancel to return to Smart \
            Agent and finish your Activity/TXT.");
        } else {
            return false;
        }
    }

    //Crete Activity Code below
    function intializeActivityForm(data) {
        $("#VHAActivityTab").html(VHASmartAgentPopup.GetCretActContainer(data));

        $("#VHAActvityDefaultTemp").selectable({
            selected: function(event, ui) {
                var MessageRef = ui.selected.attributes.value.value;
            }
        });

        //switchActivitySections("1");//vasavi commented for CPVT -550
        getActivityTemplates(SiebelApp.S_App.GetProfileAttr("VHA Role Name"));
        var ActivityFavTemplates = VHAAppUtilities.GetConstants("ActivityFavTemplate");
        var ActivityTemplates = VHAAppUtilities.GetConstants("ActivityTemplate");

        if (!ActivityFavTemplates) {
            ActivityFavTemplates = []
        }

        if (!ActivityTemplates) {
            ActivityTemplates = []
        }

        ActivityFavTemplates.forEach(function(e, i) {
            var temp = "<li class='ui-widget-content' value='" + e.TemplateName + "' title='" + e.InlineTemplate + "'>" + e.DisplayName + "</li>";
            $("#VHAActvityDefaultTemp").append(temp);
			appendActivityTemplate(e.TemplateName);//vasavi added to pre populate the deafault templates in Activity comments for CPVT -550
        });
		$("#ActivityCategory").val("General");//vasavi added for CPVT -550
		$("#ActivityType").val("General Information");//vasavi added for CPVT -550
		$("#ActivityCategoryValue").text("General");//vasavi added for CPVT -550
		$("#ActivityTypeValue").text("General Information");//vasavi added for CPVT -550
		switchActivitySections("3");//vasavi added for CPVT -550

        $("#VHAActvityDefaultTemp").selectable({
            selected: function(event, ui) {
                appendActivityTemplate(ui.selected.attributes.value.value);
                switchActivitySections("2");
            }
        });

        $("#SearchActivityTemplates").autocomplete({
            source: ActivityTemplates.map(function(a) { return { "label": a.DisplayName, "value": a.TemplateName }; }),
            select: function(e, u) {
                e.preventDefault();
                appendActivityTemplate(u.item.value);
                switchActivitySections("2");
            }
        });

        $("#SearchActivityTemplates2").autocomplete({
            source: ActivityTemplates.map(function(a) { return { "label": a.DisplayName, "value": a.TemplateName }; }),
            select: function(e, u) {
                e.preventDefault();
                appendActivityTemplate(u.item.value);
            }
        });

        $("#ActivityCategory").autocomplete({
            source: getActivityCategory(),
            minLength: 0,
            select: OnActivityCategorySelect
        });

        $("#ActivityCategoryDropDown").click(function(e) {
            $("#ActivityCategory").autocomplete("search", "");
        });
        $("#ActivityTypeDropDown").click(function(e) {
            $("#ActivityType").autocomplete("search", "");
        });

        $(".VHACretActNotesSection").delegate("textarea,input.VHACretActDescription", "input", {}, countCharacter);
        $(".VHACretActReadSection").on("click", ".VHACretActEditIcon", editActivityType);

        $(".CreateActivityButtons").on("click", "#CreateActivityCA,#CreateActivityBA,#CreateActivityIA", CreateActivity);
    }

    function CreateActivity(e) {
        var id = $(this).attr("Id");

        data = {};

        data["ActivityDescription"] = $(".VHACretActDescription").val();
        data["ActivityComment"] = $(".VHACretActComments").val();
        data["Category"] = $("#ActivityCategory").val();
        data["Type"] = $("#ActivityType").val();

        switch (id) {
            case "CreateActivityCA":
                data["AccountId"] = $(".VHACretActDescription").attr("AccountId");
                message = "Activity created at CA level."
                break;
            case "CreateActivityBA":
                data["AccountId"] = $(".VHACretActDescription").attr("BillingId");
                message = "Activity created at BA level."
                break;
            case "CreateActivityIA":
                data["AssetId"] = $(".VHACretActDescription").attr("AssetId");
                data["AccountId"] = $(".VHACretActDescription").attr("AccountId");
                message = "Activity created at IA level."
                break;
            default:
        }

        SiebelCreateActivity(data);
        alert(message);
        resetCreateActivity();
        $("#VHACreateActivityParentCont").dialog("close");
    }

    function SiebelCreateActivity(data) {
        var Inputs = SiebelApp.S_App.NewPropertySet();
        Inputs.SetProperty("Account Object Id", data.AccountId);
        Inputs.SetProperty("Asset Object Id", data.AssetId);
        Inputs.SetProperty("Category", data.Category);
        Inputs.SetProperty("Type", data.Type);
        Inputs.SetProperty("Status", 'Completed');
        Inputs.SetProperty("Description", data.ActivityDescription);
        Inputs.SetProperty("Comment", data.ActivityComment);
        VHAAppUtilities.CallBS("VF Generate Activity Service", "GenerateActivity", Inputs, {});
        //VHAAppUtilities.CallWorkflow("VHA Create Activity Generic WF", Inputs, {});
    }


    function editActivityType(e) {
        switchActivitySections("2");
    }

    function appendActivityTemplate(TemplateName) {
        var currentVal = $(".VHACretActComments").val();
        var temp = getTemplateRefString(TemplateName);
        if (currentVal) {
            $(".VHACretActComments").val(currentVal + "\n\n" + temp[0]["InlineTemplate"]);
        } else {
            $(".VHACretActComments").val(temp[0]["InlineTemplate"]);
        }
        $(".VHACretActComments").trigger("input");
    }

    function getTemplateRefString(TemplateName) {
        var TempList = VHAAppUtilities.GetConstants("ActivityTemplate");
        return TempList.filter(function(a) { return a.TemplateName == TemplateName; });

    }

    function countCharacter(e) {
        var maxlength = 0;
        var id = "";
        if ($(this).hasClass("VHACretActDescription")) {
            maxlength = $(this).attr('maxlength');
            id = "VHACretActDescriptionCounter";
        } else {
            maxlength = $(this).attr('maxlength');
            id = "VHACretActCommentsCounter";
        }
        $("#" + id).html($(this).val().length + "/" + maxlength);
    }

    function OnActivityCategorySelect(e, ui) {
        $("#ActivityCategoryValue").html(ui.item.value);
        if ($("#ActivityType").autocomplete("instance")) {
            $("#ActivityType").autocomplete('destroy').val("");
        }
        $("#ActivityType").autocomplete({
            source: getActivityType(ui.item.value),
            minLength: 0,
            select: OnActivityTypeSelect
        });
    }

    function OnActivityTypeSelect(e, ui) {
        $("#ActivityTypeValue").html(ui.item.value);
        switchActivitySections("3");
    }

    function getActivityCategory() {
        var SearchString = "[List Of Values.Type] = 'TODO_TYPE' AND [List Of Values.Active] = 'Y' " +
            "AND [List Of Values.Parent Id] IS NULL AND ([List Of Values.Order By] < 2000 OR [List Of Values.Order By] IS NULL)";
        var RawData = VHAAppUtilities.GetPickListValues("", SearchString, { All: true });

        VHAAppUtilities.SetConstants("VHACreateActivity_ActivityCategory", RawData);
        return RawData.map(function(a) { return a["Value"]; });
    }

    function getActivityType(ActivityCategory) {
        var ParentCategory = VHAAppUtilities.GetConstants("VHACreateActivity_ActivityCategory").filter(function(a) { return a.Value === ActivityCategory; });
        var SearchString = "[List Of Values.Type] = 'TODO_TYPE' AND [List Of Values.Active] = 'Y' " +
            "AND [List Of Values.Parent] = '" + ParentCategory[0]["Value"] + "'";
        return VHAAppUtilities.GetPickListValues("", SearchString);
    }

    /*function getActivityTemplates(RoleName) {
        var TempList = VHAAppUtilities.GetConstants("ActivityTemplate");

        if (TempList && TempList.length > 0) {
            return;
        }

        var SearchSpec = "[VHA Configuration List.Type]='VHA_ACTIVITY_ROLE' AND " +
            "[VHA Configuration List.Active Flg]='Y' AND " +
            "([VHA Configuration List.Value]='" + RoleName + "' OR " +
            "[VHA Configuration List.Value] IS NULL)";

        var TemplateList = VHAAppUtilities.GetConfigList(SearchSpec);
        var TemplateListX;
        if (TemplateList) {
            TemplateListX = TemplateList.map(function(e) {
                return e["Name"];
            });
        } else {
            TemplateListX = [];
        }

        var TemplateListSearch = "";
        var TemplateListXLength = TemplateListX.length;
        for (var i = 0; i < TemplateListXLength; i++) {
            if (TemplateListSearch === "") {
                TemplateListSearch += "[VHA Configuration List.Name]='" + TemplateListX[i] + "'";
            } else {
                TemplateListSearch += " OR [VHA Configuration List.Name]='" + TemplateListX[i] + "'";
            }
        }
        if (TemplateListXLength) {
            var SearchSpec2 = "[VHA Configuration List.Type]='VHA_ACTIVITY_TEMPLATE' AND " +
                "[VHA Configuration List.Active Flg]='Y' AND (" + TemplateListSearch + ")";
            var TemplateList2 = VHAAppUtilities.GetConfigList(SearchSpec2);

            TemplateListXLength = TemplateList2.length;
            var SendTextTemplateList = TemplateList2.map(function(temp) {
                return {
                    "TemplateName": temp["Name"],
                    "InlineTemplate": temp["String 28"],
                    "TemplateReference": temp["String 29"],
                    "Fav": temp["String 1"],
                    "DisplayName": temp["Value"]
                };
            });

            var FavTemplate = SendTextTemplateList.filter(function(temp) { return temp.Fav === "Y"; });
            VHAAppUtilities.SetConstants("ActivityFavTemplate", FavTemplate);
            VHAAppUtilities.SetConstants("ActivityTemplate", SendTextTemplateList);
        }
    }*/
	function getActivityTemplates(RoleName) {
        var TempList = VHAAppUtilities.GetConstants("ActivityTemplate");

        if (TempList && TempList.length > 0) {
            return;
        }

        var SearchSpec = "[VHA Configuration List.Type]='VHA_ACTIVITY_ROLE' AND " +
            "[VHA Configuration List.Active Flg]='Y' AND " +
            "([VHA Configuration List.Value]='" + RoleName + "' OR " +
            "[VHA Configuration List.Value] IS NULL)";

        var TemplateList = VHAAppUtilities.GetConfigList(SearchSpec);
        var TemplateListX;
        if (TemplateList) {
            TemplateListX = TemplateList.map(function (e) {
                return e["Name"];
            });
        } else {
            TemplateListX = [];
        }
		
		var TemplateListSearch = "";
        var TemplateListXLength = TemplateListX.length;
        var SearchStringArray = [];
        for (var i = 0; i < TemplateListXLength; i++) {
            if (TemplateListSearch === "") {
                TemplateListSearch += "[VHA Configuration List.Name]='" + TemplateListX[i] + "'";
            } else {
                TemplateListSearch += " OR [VHA Configuration List.Name]='" + TemplateListX[i] + "'";
            }
            if (i % 50 == 0 && TemplateListSearch !== "") {
                SearchStringArray.push(TemplateListSearch);
                TemplateListSearch = "";
            }
        }
        if (TemplateListSearch !== "") {
            SearchStringArray.push(TemplateListSearch);
        }
        var SearchStringArrayLen = SearchStringArray.length;
        var TemplateListArray = [];
        if (TemplateListXLength) {
            for (var i = 0; i < SearchStringArrayLen; i++) {
                var SearchSpec2 = "[VHA Configuration List.Type]='VHA_ACTIVITY_TEMPLATE' AND " +
                    "[VHA Configuration List.Active Flg]='Y' AND (" + SearchStringArray[i] + ")";
                var TemplateList2 = VHAAppUtilities.GetConfigList(SearchSpec2);
                TemplateListArray = TemplateListArray.concat(TemplateList2);
            }
        }
		
		var SendTextTemplateList = TemplateListArray.map(function (temp) {
			return {
				"TemplateName": temp["Name"],
				"InlineTemplate": temp["String 28"],
				"TemplateReference": temp["String 29"],
				"Fav": temp["String 1"],
				"DisplayName": temp["Value"]
			};
		});

		var FavTemplate = SendTextTemplateList.filter(function (temp) {
			return temp.Fav === "Y";
		});
		VHAAppUtilities.SetConstants("ActivityFavTemplate", FavTemplate);
		VHAAppUtilities.SetConstants("ActivityTemplate", SendTextTemplateList);
		//
    }
	
    function switchActivitySections(Stage) {
        switch (Stage) {
            case "1":
                $(".VHACretActSection0").toggleClass("VHADisplayNone");
                $(".VHACretActSection1").addClass("VHADisplayNone");
                $(".VHACretActSection2").addClass("VHADisplayNone");
                $(".VHACretActSection3").addClass("VHADisplayNone");
                break;
            case "2":
                $(".VHACretActSection0").addClass("VHADisplayNone");
                $(".VHACretActSection1").toggleClass("VHADisplayNone");
                $(".VHACretActSection2").addClass("VHADisplayNone");
                $(".VHACretActSection3").addClass("VHADisplayNone");
                var ActCategory = VHAAppUtilities.GetConstants("VHACreateActivity_ActivityCategory");
                if (!ActCategory) {
                    getActivityCategory();
                }
                break;
            case "3":
                $(".VHACretActSection0").addClass("VHADisplayNone");
                $(".VHACretActSection1").addClass("VHADisplayNone");
                $(".VHACretActSection2").toggleClass("VHADisplayNone");
                $(".VHACretActSection3").addClass("VHADisplayNone");
                break;
            case "4":
                $(".VHACretActSection0").addClass("VHADisplayNone");
                $(".VHACretActSection1").addClass("VHADisplayNone");
                $(".VHACretActSection2").addClass("VHADisplayNone");
                $(".VHACretActSection3").toggleClass("VHADisplayNone");
                break;
            default:

        }
    }

    function resetCreateActivity() {
        $(".VHACretActTextMessageDynamicArea").html("");
        $(".VHACretActDescription").val("");
        $(".VHACretActComments").val("");
        $("#ActivityCategory").val("");
        $("#ActivityType").val("");
        switchActivitySections("1");

    }

    //Send Text Related Code below
    //MessageString This is a global variable with in the scope of the smart agent
    var MessageString = {};
    var RefStringPre = "_";
    var RefStringSuf = "__";

    function initializeSendMail(data) {
        $("#VHAMailTab").html(VHASmartAgentPopup.GetSendMailContainer());
        getSendTextTemplate(SiebelApp.S_App.GetProfileAttr("VHA Role Name"), "VHA_SENDMAIL_TEMPLATE", "VHA_SENDMAIL_ROLE");
        var FavTemplates = VHAAppUtilities.GetConstants("SendMailFavTemplates");
        var SendTextTemplates = VHAAppUtilities.GetConstants("SendMailTemplates");
        if (!FavTemplates) {
            FavTemplates = []
        }
        if (!SendTextTemplates) {
            SendTextTemplates = []
        }
        FavTemplates.forEach(function(e, i) {
            var temp = "<li class='ui-widget-content' value='" + e.TemplateName + "' title='" + e.TemplateReference + "'>" + e.DisplayName + "</li>";
            $("#VHASendMailDefaultTemp").append(temp);
        });
        $("#VHASendMailDefaultTemp").selectable({
            selected: function(event, ui) {
                populateSendTextInfo(ui.selected.attributes.value.value, "MAIL");
            }
        });
        $(".VHACretActMailMessageDynamicArea").on("keydown", ".InlineField[type='date']", VHASmartAgentPopup.validateDateString);
        $(".VHACretActMailMessageDynamicArea").on("keyup", ".InlineField", function(e) {
            var InlineFiledValue = $(this).val();

            var InlineFiledSequence = $(this).attr("SEQ");
            var SearchString = RefStringPre + InlineFiledSequence + RefStringSuf;
            if ($(this).attr("type") == "date") {
                MessageString[SearchString] = VHASmartAgentPopup.dateToString(InlineFiledValue);
            } 
			else if ($(this).attr("type") == "time") {
				MessageString[SearchString] = vhatimeformattext(InlineFiledValue);
			}
			else {
                MessageString[SearchString] = InlineFiledValue;
            }
        });
        $(".VHACretActMailMessageDynamicArea").on("change", ".InlineField", function(e) {
            var InlineFiledValue = $(this).val();
            var InlineFiledSequence = $(this).attr("SEQ");
            var SearchString = RefStringPre + InlineFiledSequence + RefStringSuf;
            if ($(this).attr("type") == "date") {
                MessageString[SearchString] = VHASmartAgentPopup.dateToString(InlineFiledValue);
            } 
						else if ($(this).attr("type") == "time") {
				MessageString[SearchString] = vhatimeformattext(InlineFiledValue);
			}
			else {
                MessageString[SearchString] = InlineFiledValue;
            }
        });


        $("#SearchSendMailTemplates").autocomplete({
            source: SendTextTemplates.map(function(a) { return { "label": a.DisplayName, "value": a.TemplateName }; }),
            minLength: 0,
            select: function(e, u) {
                e.preventDefault();
                populateSendTextInfo(u.item.value, "MAIL");
            }
        });

        $("#MailTemplateDropDown").click(function(e) {
            $("#SearchSendMailTemplates").autocomplete("search", "");
        });

        $("#VHAMailTab").on("click", "#SendMailButton", { ctx: data }, sendMailMessage);
        $("#VHAMailTab").on("click", "#SendMailCancelButton", cancelSendTextMessage);
    }

    function initializeSendText() {
        $("#VHASMSTab").html(VHASmartAgentPopup.GetSendTextContainer());
        getSendTextTemplate(SiebelApp.S_App.GetProfileAttr("VHA Role Name"), "VHA_SENDTEXT_TEMPLATE", "VHA_SENDTEXT_ROLE");

        var FavTemplates = VHAAppUtilities.GetConstants("SendTextFavTemplates");
        var SendTextTemplates = VHAAppUtilities.GetConstants("SendTextTemplates");
        if (!FavTemplates) {
            FavTemplates = []
        }

        if (!SendTextTemplates) {
            SendTextTemplates = []
        }

        FavTemplates.forEach(function(e, i) {
            var temp = "<li class='ui-widget-content' value='" + e.TemplateName + "' title='" + e.TemplateReference + "'>" + e.DisplayName + "</li>";
            $("#VHASendTextDefaultTemp").append(temp);
        });


        $("#VHASendTextDefaultTemp").selectable({
            selected: function(event, ui) {
                populateSendTextInfo(ui.selected.attributes.value.value, "TEXT");
            }
        });
        $(".VHACretActTextMessageDynamicArea").on("keydown", ".InlineField[type='date']", VHASmartAgentPopup.validateDateString);
        $(".VHACretActTextMessageDynamicArea").on("keyup", ".InlineField", function(e) {

            var InlineFiledValue = $(this).val();

            var InlineFiledSequence = $(this).attr("SEQ");
            var SearchString = RefStringPre + InlineFiledSequence + RefStringSuf;
            if ($(this).attr("type") == "date") {
                MessageString[SearchString] = VHASmartAgentPopup.dateToString(InlineFiledValue);
            } 
				else if ($(this).attr("type") == "time") {
				MessageString[SearchString] = vhatimeformattext(InlineFiledValue);
			}
			
			else {
                MessageString[SearchString] = InlineFiledValue;
            }
        });

        $(".VHACretActTextMessageDynamicArea").on("change", ".InlineField", function(e) {

            var InlineFiledValue = $(this).val();
            var InlineFiledSequence = $(this).attr("SEQ");
            var SearchString = RefStringPre + InlineFiledSequence + RefStringSuf;
            if ($(this).attr("type") == "date") {
                MessageString[SearchString] = VHASmartAgentPopup.dateToString(InlineFiledValue);
            } 
				else if ($(this).attr("type") == "time") {
				MessageString[SearchString] = vhatimeformattext(InlineFiledValue);
			}
			else {
                MessageString[SearchString] = InlineFiledValue;
            }
        });



        $("#SearchSendTextTemplates").autocomplete({
            source: SendTextTemplates.map(function(a) { return { "label": a.DisplayName, "value": a.TemplateName }; }),
            select: function(e, u) {
                e.preventDefault();
                populateSendTextInfo(u.item.value, "TEXT");
            }
        });

        $("#VHASMSTab").on("click", "#SendTextButton", sendTextMessage);
        $("#VHASMSTab").on("click", "#SendTextCancelButton", cancelSendTextMessage);
        $("#VHAActivityTab").on("click", "#SendTextCancelButton", cancelSendTextMessage);
        $("#VHASMSTab").on("change", "#GenericText", switchToOtherTemplates);
    }

    function switchToOtherTemplates(e) {
        $(".VHACretActTextMessageDynamicArea").toggleClass("VHADisplayNone");
        $(".VHACretActTextMessageTextArea").toggleClass("VHADisplayNone");
        // if ($(e.target).is(":checked")) {
        //     console.log("Checked");
        // } else {
        //     console.log("Unchecked");
        // }
    }
    var gAttachmentsList = [];

    function populateSendTextInfo(MessgeRef, Type) {
        var SelectedMessage = getMessageText(MessgeRef, Type);
        SelectedMessage = SelectedMessage[0];
        if (Type == "TEXT") {
            var templateString = "<div TemplateName='" + SelectedMessage.TemplateName + "'DisplayName='" + SelectedMessage.DisplayName + "' >" + SelectedMessage.InlineTemplate + "</div>";
            $(".VHACretActTextMessageDynamicArea").html(templateString);
        } else if (Type == "MAIL") {
            var MailContent = populateSendMailInfo(SelectedMessage.TemplateName);
            var templateString = "<div TemplateName='" + SelectedMessage.TemplateName + "'DisplayName='" + SelectedMessage.DisplayName + "' >" + MailContent.TemplateText + "</div>";
            $(".VHACretActMailMessageDynamicArea").html(templateString).removeClass("VHADisplayNone").resizable({ containment: "#VHACreateActivityParentCont" });
            $("#SmartAgentMailAttachments").html("");
            $("#SendEmailSubject").val(MailContent.Subject);
            if (MailContent.Attachments) {
                gAttachmentsList = [];
                $("#SmartAgentMailAttachments").removeClass("VHADisplayNone");
                for (a in MailContent.Attachments) {
                    if (isNaN(a)) {
                        continue;
                    }
                    gAttachmentsList.push(MailContent.Attachments[a]);
                    $("#SmartAgentMailAttachments").append("<a download target='_black' href=/scripts/siebel/custom/emailAttachments/" + MailContent.Attachments[a] + ">" + MailContent.Attachments[a] + "</a>");
                }
            } else {
                $("#SmartAgentMailAttachments").addClass("VHADisplayNone");
            }

        }
    }

    function populateSendMailInfo(TemplateName) {
        var configData = {};
        var TemplateText = "";
        $.ajax({
            type: 'GET',
            url: './scripts/siebel/custom/emailTemplate/emailConfig.json',
            async: false,
            crossDomain: true,
            dataType: 'json',
            success: function(data) {
                //console.log(data);
                configData = data;
            }
        });
        var config = configData[TemplateName];
        var attachments = config["attachments"];
        var subject = config["subject"];
        //console.log(TemplateName)
        //console.log(config);
        if (config) {
            $.ajax({
                type: 'GET',
                url: './scripts/siebel/custom/emailTemplate/' + config.templateFileName,
                async: false,
                crossDomain: true,
                success: function(data) {
                    //console.log(data);
                    //$("#emailContent").val(data);
                    //$("#textContent").html(data);
                    TemplateText = data;
                }
            });
        } else {
            alert("Template Configuration not found")
        }
        return { TemplateText: TemplateText, Attachments: attachments, Subject: subject };
    }

    function getSendTextTemplate(RoleName, ConfigTemplateType, ConfigRoleType) {

        if (ConfigTemplateType == "VHA_SENDTEXT_TEMPLATE") {
            var TempList = VHAAppUtilities.GetConstants("SendTextTemplates");
        } else if (ConfigTemplateType == "VHA_SENDMAIL_TEMPLATE") {
            var TempList = VHAAppUtilities.GetConstants("SendMailTemplates");
        }

        if (TempList && TempList.length > 0) {
            return;
        }

        var SearchSpec = "[VHA Configuration List.Type]='" + ConfigRoleType + "' AND " +
            "[VHA Configuration List.Active Flg]='Y' AND " +
            "([VHA Configuration List.Value]='" + RoleName + "' OR " +
            "[VHA Configuration List.Value] IS NULL)";

        var TemplateList = VHAAppUtilities.GetConfigList(SearchSpec);
        var TemplateListX;
        if (TemplateList) {
            TemplateListX = TemplateList.map(function(e) {
                return e["Name"];
            });
        } else {
            TemplateListX = [];
        }

        var TemplateListSearch = "";
        var TemplateListXLength = TemplateListX.length;
        var SearchStringArray = [];
        for (var i = 0; i < TemplateListXLength; i++) {
            if (TemplateListSearch === "") {
                TemplateListSearch += "[VHA Configuration List.Name]='" + TemplateListX[i] + "'";
            } else {
                TemplateListSearch += " OR [VHA Configuration List.Name]='" + TemplateListX[i] + "'";
            }
            if (i % 50 == 0 && TemplateListSearch !== "") {
                SearchStringArray.push(TemplateListSearch);
                TemplateListSearch = "";
            }
        }
        if (TemplateListSearch !== "") {
            SearchStringArray.push(TemplateListSearch);
        }
        var SearchStringArrayLen = SearchStringArray.length;
        var TemplateListArray = [];
        if (TemplateListXLength) {
            for (var i = 0; i < SearchStringArrayLen; i++) {
                var SearchSpec2 = "[VHA Configuration List.Type]='" + ConfigTemplateType + "' AND " +
                    "[VHA Configuration List.Active Flg]='Y' AND (" + SearchStringArray[i] + ")";
                var TemplateList2 = VHAAppUtilities.GetConfigList(SearchSpec2);
                TemplateListArray = TemplateListArray.concat(TemplateList2);
            }
        }

        TemplateListXLength = TemplateListArray.length;
        var SendTextTemplateList = TemplateListArray.map(function(temp) {
            return {
                "TemplateName": temp["Name"],
                "InlineTemplate": temp["String 28"],
                "TemplateReference": temp["String 29"],
                "Fav": temp["String 1"],
                "DisplayName": temp["Value"]
            };
        });

        var FavTemplate = SendTextTemplateList.filter(function(temp) { return temp.Fav === "Y"; });
        if (ConfigTemplateType == "VHA_SENDTEXT_TEMPLATE") {
            VHAAppUtilities.SetConstants("SendTextFavTemplates", FavTemplate);
            VHAAppUtilities.SetConstants("SendTextTemplates", SendTextTemplateList);
        } else if (ConfigTemplateType == "VHA_SENDMAIL_TEMPLATE") {
            VHAAppUtilities.SetConstants("SendMailFavTemplates", FavTemplate);
            VHAAppUtilities.SetConstants("SendMailTemplates", SendTextTemplateList);
        }
    }

    function sendMailMessage(e) {
        console.log("Sending Mail");
        const initialValidation = validateSendMailFields();
        if (!initialValidation) {
            return;
        }
        var DynamicHTML = $(".VHACretActMailMessageDynamicArea").html();
        var TempalteName = $(DynamicHTML).attr("TemplateName");
        const isContentValid = initialValidation ? validateSendMailMessage(DynamicHTML) : "";
        if (!isContentValid) {
            return;
        }
        var TextString = "";
        $.ajax({
            type: 'GET',
            url: './scripts/siebel/custom/emailTemplate/' + TempalteName + "-Substitute.txt",
            async: false,
            crossDomain: true,
            success: function(data) {
                //console.log(data);
                //$("#emailContent").val(data);
                //$("#textContent").html(data);
                TextString = data;
            }
        });
        for (var str in MessageString) {
            var re = new RegExp(str, "g");
            TextString = TextString.replace(re, MessageString[str]);
        }
        //console.log(TextString);
        var masterTempalte = "";
        $.ajax({
            type: 'GET',
            url: './scripts/siebel/custom/emailTemplate/TEMPLATE-MASTER.txt',
            async: false,
            crossDomain: true,
            success: function(data) {
                //console.log(data);
                //$("#emailContent").val(data);
                //$("#textContent").html(data);
                masterTempalte = data;
            }
        });
        var replaceContent = "###########_EMAIL_CONTENT_HERE_###########";
        var reg = new RegExp(replaceContent, "g");
        masterTempalte = masterTempalte.replace(reg, TextString);
        // console.log(masterTempalte);
        sendSiebelEmail(masterTempalte, e.data.ctx);
    }

    function validateSendMailMessage(DynamicHTML) {
        var retval = true;
        $(DynamicHTML).find("input").each(function(item) {
            var filedSeq = $(this).attr("SEQ");
            var filedValue = MessageString[RefStringPre + filedSeq + RefStringSuf];
            if (!filedValue) {
                alert("Make sure all custom fields within the mail Content are filled before sending an email.");
                $(this).addClass("Error");
                retval = false;
                return retval;
            }
        });
        return retval;
    }

    function validateSendMailFields() {
        const toEmail = $("#SendTextEmailTo").val();
        const subject = $("#SendEmailSubject").val();
        var toEmailValid = false;
        var subjectValid = false;
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (toEmail && toEmail.length) {
            toEmailValid = true;
            var emails = toEmail.split(";");
            for (a in emails) {
                if (isNaN(a)) {
                    continue;
                }
                if (!emails[a].match(mailformat)) {
                    toEmailValid = false;
                    break;
                }
            }
        }

        if (subject) {
            subjectValid = true;
        }
        var message = "";
        var toMessageValidation = "Enter a valid Email address in To field.";

        var subjectValidation = "Select an email template.";
        message = toEmailValid ? message : toMessageValidation;

        message = subjectValid ? message : message == "" ? subjectValidation : message + "\n" + subjectValidation;
        if (message != "") {
            alert(message);
        }
        return toEmailValid && subjectValid;

    }

    function sendTextMessage(e) {
       // console.log("Sending Text");
        //console.log($(".VHACretActTextMessageDynamicArea").html());
        var DynamicHTML = $(".VHACretActTextMessageDynamicArea").html();

        var MessageRef = $(DynamicHTML).attr("TemplateName");
        if ($("#GenericText").is(":checked")) {
            var TextString = $("#TextMessageTextArea").val().trim();
            var ActivityDescription = "Send TXT - Manual free text.";
            // console.log(TextString);
            var confirmVal = confirm("Click OK to send the below TXT or Cancel to return to Smart Agent.\n" + TextString);
            if (confirmVal) {
                sendSiebelMessage(TextString, ActivityDescription);
            }

        } else if (ValidateInlineTextMessage(DynamicHTML)) {

            var TextString = getFinalMessageString(MessageRef);
            var DisplayNme = $(DynamicHTML).attr("DisplayName");
            for (var str in MessageString) {
                var re = new RegExp(str, "g");              
                 //console.log("MessageString",MessageString[str]);
                TextString = TextString.replace(re, MessageString[str]);
            }
            // console.log(TextString);
            var confirmVal = confirm("Click OK to send the below TXT or Cancel to return to Smart Agent.\n" + TextString);
            if (confirmVal) {
                var ActivityDescription = "Send TXT - " + DisplayNme + ".";
                sendSiebelMessage(TextString, ActivityDescription);
            }
        }

    }
    function vhatimeformattext(h24){
                  var parts=h24.split(':');
                  var hours=parseInt(parts[0]);
                  var minutes=parts[1];
                  if(hours>=12){
                      var newhours=parseInt(hours)-12;
                      var meridiem='PM';
                  }
                  else{
                      var newhours=parseInt(hours);
                      var meridiem='AM';
                  }
                  if(newhours==0){
                      newhours="12";
                  }
                  var newtime=newhours + ":" + minutes + " " + meridiem;
                  return newtime;
               }
  

    function sendSiebelMessage(TextString, ActivityDescription) {
        var MSISDN = $("#SendTextMSISDN").val();
        MSISDN = MSISDN.split(",");
        var Inps = SiebelApp.S_App.NewPropertySet();
        Inps.SetProperty("ARII", "Australia");
        Inps.SetProperty("NotificationType", "SMS");
        Inps.SetProperty("ActivityStatus", "Auto-Created");
        Inps.SetProperty("ActivityCategory", "System Generated");
        Inps.SetProperty("ActivityType", "Send SMS Text");
        Inps.SetProperty("ActivityDescription", ActivityDescription);
        Inps.SetProperty("TXTMessage", TextString);
        Inps.SetProperty("OrgName", SiebelApp.S_App.GetProfileAttr("VHANewOrg"));
        try {
            MSISDN.forEach(function(e) {
                if (e.indexOf("04") === 0) {
                    e = "61" + e.substr(1);
                }
                var MSISDNInfo = checkAssetExists(e);
                Inps.SetProperty("MSISDN", e);
                Inps.SetProperty("AssetId", MSISDNInfo.AssetId);
                Inps.SetProperty("CreateActivity", MSISDNInfo.CreateActivity);
				Inps.SetProperty("AccountId", MSISDNInfo.AccountId);//ss103269: Added for PKE000000091362
                VHAAppUtilities.CallWorkflow("VHA Smart Agent Notification", Inps, {});
            });
            alert("TXT message sent.");
            resetSendText();
            $("#VHACreateActivityParentCont").dialog("close");
        } catch (e) {
            alert(e);
        }
    }

    function sendSiebelEmail(EmailBody, data) {

        const toEmail = $("#SendTextEmailTo").val();
        const subject = $("#SendEmailSubject").val();
        var Inps = SiebelApp.S_App.NewPropertySet();
        Inps.SetProperty("NotificationType", "EMAIL");
        if (data.Type === SendTextType) {
            Inps.SetProperty("CreateActivity", "N");
        } else {
            var tempalteDisplayName = $(".VHACretActMailMessageDynamicArea>div").attr("DisplayName");
            //var tempalteTemplateName = $(".VHACretActMailMessageDynamicArea>div").attr("templatename");

            Inps.SetProperty("CreateActivity", "Y");
            Inps.SetProperty("AccountId", data.AccountId);
            Inps.SetProperty("ActivityType", "Sent Email");
            Inps.SetProperty("ActivityDescription", "Sent Email - " + tempalteDisplayName)
            Inps.SetProperty("TXTMessage", "Sent Email - " + tempalteDisplayName)
            Inps.SetProperty("ActivityStatus", "Auto-Created");
            Inps.SetProperty("ActivityCategory", "System Generated");
        }

        Inps.SetProperty("EmailSubject", subject);
        Inps.SetProperty("EmailTo", toEmail);
        Inps.SetProperty("EmailBody", EmailBody);
        var attachmentList = "";
        for (var a in gAttachmentsList) {
            if (a == 0) {
                attachmentList = "../temp/SmartAgentEmailAttachments/" + gAttachmentsList[a];
            } else {
                attachmentList += "*" + "../temp/SmartAgentEmailAttachments/" + gAttachmentsList[a];
            }
        }
        Inps.SetProperty("EmailAttachments", attachmentList);
        VHAAppUtilities.CallWorkflow("VHA Smart Agent Notification", Inps, {});
        resetSendMail();
        alert("Email sent to: " + toEmail);
    }

    function checkAssetExists(MSISDN) {
        var response = { AssetId: "", CreateActivity: "N", AccountId: "" };//ss103269: Added for PKE000000091362
        var SearchSpec = "[Installed Assets.MSISDN]='" + MSISDN + "'";
        var IntObjName = "VF Asset Mgmt Thin";
        var Response = VHAAppUtilities.GetSiebelDataFromIO(SearchSpec, IntObjName, {});
        if (Response.GetChildCount() > 0) {
            var TotalChild = Response.GetChildCount();

            for (var i = 0; i < TotalChild; i++) {
                var Child = Response.GetChild(i);
                if (Child.GetProperty("Status") == "Active" || Child.GetProperty("Status") == "Suspended") {
                    createAcitivity = true;
                    response["AssetId"] = Child.GetProperty("Id");
                    response["CreateActivity"] = "Y";
					response["AccountId"] = Child.GetProperty("Service Account Id");//ss103269: Added for PKE000000091362
                    break;
                }
            }
        }
        return response;
    }

    function ValidateInlineTextMessage(DynamicHTML) {
        retval = true;

        var MSISDN = $("#SendTextMSISDN").val();

        MSISDN = MSISDN.split(",");
        try {
            MSISDN.forEach(function(e) {
                if (e.indexOf("614") != 0 && e.indexOf("04") != 0) {
                    retval = false;
                    alert("The MSISDN you have entered is not valid. \
                    Please enter a valid MSISDN beginning with 614 or 04.");
                    //alert(e + " MSISDN should start with 614 or 04.");
                } else if (e.indexOf("614") === 0 && e.length != 11) {
                    retval = false;
                    alert("The MSISDN you have entered is not the correct length. \
                    Please enter a valid MSISDN with 11 digits beginning with 614 or 10 digits beginning with 04.");
                    //alert(e + " MSISDN is of invalid length.");
                } else if (e.indexOf("04") === 0 && e.length != 10) {
                    retval = false;
                    alert("The MSISDN you have entered is not the correct length. \
                    Please enter a valid MSISDN with 11 digits beginning with 614 or 10 digits beginning with 04.");
                    //alert(e + " MSISDN is of invalid length.");
                }
            });

        } catch (e) {
            retval = false;
            alert(e);
        }

        if (!DynamicHTML.trim()) {
            //alert("Please enter a message text.")
            alert("You havenâ€™t entered any content for your TXT message.\
             Please select a template, select the manual message option and \
             enter a custom message, or hit Cancel if you no longer need to \
             send a TXT. (this content is TBC based on what the manual/free \
                TXT message option is called)");
            retval = false;
        } else if (retval) {

            $(DynamicHTML).find("input").each(function(item) {
                // console.log($(this));
                var filedSeq = $(this).attr("SEQ");
                var filedValue = MessageString[RefStringPre + filedSeq + RefStringSuf];
                if (!filedValue) {
                    alert("Please make sure all custom fields within the TXT message are completed before sending.")
                        //alert("All the required field should be filled.");
                    $(this).addClass("Error");
                    retval = false;
                    return retval;
                } else if ($(this).hasClass("ValidateMSISDN")) {
                    if (filedValue.indexOf("614") != 0 && filedValue.indexOf("04") != 0) {
                        alert("MSISDN should be starting with 614 or 04");
                        retval = false;
                        return retval;
                    }
                } else if ($(this).hasClass("SendTextInputFieldNumber")) {} else if ($(this).hasClass("SendTextInputFieldDate")) {} else if ($(this).hasClass("SendTextInputFieldText")) {}
            });
        }
        return retval;
    }

    function cancelSendTextMessage(e) {
        $("#VHACreateActivityParentCont").dialog("close");
    }

    function resetSendText() {
        $("#SendTextMSISDN").val("");
        $(".VHACretActTextMessageDynamicArea").html("");
        MessageString = {};
    }

    function resetSendMail() {
        $("#SendTextEmailTo").val("");
        $("#SendEmailSubject").val("");
        $(".VHACretActMailMessageDynamicArea").html("").addClass("VHADisplayNone");
        $("#SmartAgentMailAttachments").html("").addClass("VHADisplayNone");
        MessageString = {};
        gAttachmentsList = [];
    }

    function getMessageText(MessageRef, Type) {
        if (Type == "TEXT") {
            var SendTextTemplates = VHAAppUtilities.GetConstants("SendTextTemplates");
        } else if (Type == "MAIL") {
            var SendTextTemplates = VHAAppUtilities.GetConstants("SendMailTemplates");
        }
        return SendTextTemplates.filter(function(a) { return a.TemplateName === MessageRef; });
    }

    function getFinalMessageString(MessageRef) {
        var SendTextTemplates = VHAAppUtilities.GetConstants("SendTextTemplates");
        var temp = SendTextTemplates.filter(function(a) { return a.TemplateName === MessageRef; });
        return temp[0].TemplateReference;
    }


    $('body').append('<div id="SendTextFloatPar"><div id="SendTextFloatContiner" class="VHABackgroundInactive"><div id="SendTextFloaterText">Smart Agent</div></div></div>');


    $("#SendTextFloatPar").on('click', '#SendTextFloatContiner', function(e) {
        $(this).addClass("VHABackgroundActive", { duration: 1000 }).removeClass("VHABackgroundInactive VHABackgroundMinimize", { duration: 10 });
        var position = VHAAppUtilities.GetConstants("SmartAgentPosition")
        if ($("#VHACreateActivityParentCont").length && $("#VHACreateActivityParentCont").dialog("isOpen")) {
            $("#VHACreateActivityParentCont").parents('.ui-dialog').show("slide", { direction: "down" }, 1000);
            if (position) {
                $("#VHACreateActivityParentCont").dialog("option", { position: { my: "left top", at: "left+" + position.left + " top+" + position.top, of: window } });
            }
            return;
        }
        var smartAction = checkActiveViewName()

        if (smartAction.status) {
            var data = getActivityParentData({ ParentRef: smartAction.CustomerRowId, Type: "CA", RefValue: smartAction.CustomerRowId });
        } else {
            var data = { Type: SendTextType };
        }
        initializeSmartAgentPopup(data);

        if (position) {
            $("#VHACreateActivityParentCont").dialog("option", { position: { my: "left top", at: "left+" + position.left + " top+" + position.top, of: window } });
        }
    });


    function checkActiveViewName() {

        var CustomerRowID = "";
        var status = false;
        var FlowList = new Array();
        $.ajax({
            dataType: "json",
            url: 'scripts/siebel/custom/ViewsConfigList.json',
            data: '',
            async: false,
            success: function(data) {
                FlowList = data.flows;
            }
        });
        var activeView = SiebelApp.S_App.GetActiveView();
        var activeViewName = activeView.GetName();

        FlowList = FlowList.map(function(a) { return a })
        var FlowType = "";
        for (var flow in FlowList) {
            if (isNaN(flow)) {
                continue;
            }
            var a = FlowList[flow];
            if (a && a.view_name.includes(activeViewName)) {
                FlowType = a.FlowType;
                break;
            }
        }

        var appletLookup = "NOT_AVAILABLE";
        var FiledName = "";
        switch (FlowType) {
            case "Connect Postpay":
                appletLookup = "VF Task Session Form Applet – TBUI";
                FiledName = "Customer Row Id";
                break;
            case "Connect NBN":
                appletLookup = "VF Task Session Form Applet – TBUI";
                FiledName = "Customer Row Id";
                break;
            case "Prepay Registration":
                appletLookup = "VF Task Session Form Applet UniSIM TBUI";
                FiledName = "Customer Row Id";
                break;
            case "Upgrade Postpaid":
                appletLookup = "VF Task Session Form Applet - Upgrade TBUI";
                FiledName = "Customer Row Id";
                break;
            default:
                appletLookup = "NOT_AVAILABLE"
        }

        if (appletLookup != "NOT_AVAILABLE") {
            var applet = activeView.GetApplet(appletLookup);
            var pm = applet.GetPModel();
            var recordSet = pm.Get("GetRecordSet");
            CustomerRowID = recordSet[0][FiledName];
            if (CustomerRowID != "") {
                status = true;
            }
        }

        return { status: status, CustomerRowId: CustomerRowID };
    }

}