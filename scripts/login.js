/*****************************************************************************
 *
 * Copyright (C) 2001, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       
 *  $Revision: 14 $
 *      $Date: 11/04/01 12:07a $
 *
 * DESCRIPTION:
 *    	Login Page Functions
 *****************************************************************************/
//init
var ns = (navigator.appName.indexOf("Netscape") > -1 && parseInt(navigator.appVersion) > 3) ? true : false;
var ns6 = (navigator.appName.indexOf("Netscape") > -1 && parseInt(navigator.appVersion) > 4) ? true : false;
var ie = (navigator.appName.indexOf("Microsoft") > -1 && parseInt(navigator.appVersion) > 3) ? true : false;
var loginWidth = 653;
var loginHeight = 365;
var loginLayer = "login";

function userfocus() {
    var errContent = document.getElementById('statusBar');
    var innerText = errContent.innerHTML;
    if(innerText) {
        errContent.innerHTML  = '';
        errContent.setAttribute('role','alert');
        setTimeout(function () {
            errContent.innerHTML  = innerText;
        },1);
    }
    //Bug# 72 and 73: Setting the Username Form Field is Username is not empty
    //and putting the focus to Password Form Field 
    if (document.SWEEntryForm.SWEUserName.value == "") {
        document.SWEEntryForm.SWEUserName.focus();
    }
    else {
        document.SWEEntryForm.SWEPassword.focus();
    }
}

function pwdcleaner() { document.SWEEntryForm.SWEPassword.value = ""; }

function UserFocusAfterAlert() {
    var elem = document.SWEEntryForm;
    if (typeof (elem) != "undefined") {
        elem.SWEPassword.focus();
        elem.SWEUserName.focus();
    }
}

//Centers login layer in NS4.x+ and IE4.x+  
function centerElement() {
    if (ns || ns6 || ie) {
        winWidth = (ie) ? document.body.offsetWidth : window.innerWidth;
        winHeight = (ie) ? document.body.offsetHeight : window.innerHeight;

        var left = parseInt((winWidth - loginWidth) / 2);
        var top = parseInt((winHeight - loginHeight) / 2);

        if (ie || ns6) {
            var obj = document.getElementById(loginLayer);
            if (obj) { obj.style.left = left; obj.style.top = top; }
        }
        else if (ns) {
            var obj = eval("document." + loginLayer);
            if (obj) { obj.left = left; obj.top = top; }
        }

        window.onresize = centerElement;
    }
}


var g_bInitialized = false;


//this function is only used in login page
function SWEExecuteLogin(formObj, action, target) {
    if (!g_bInitialized)
        return;

    var isAdfmContainer = window.localStorage ? window.localStorage.getItem("isAdfmContainer") : false;
    if (isAdfmContainer) {
        if ((typeof (g_bMafInitized) != "undefined") && (!g_bMafInitized))
            return;

        var isCompatibility = window.localStorage ? window.localStorage.getItem("isCompatibility") : "true";
        //Bug# 35307740 : Replacing seesion stoarge with localStorage
        var isRNMobileApp = window.localStorage && window.localStorage.getItem("isRNMobileApp") == "true" ? "true" : "false";
        if (isCompatibility && isCompatibility == "false" && isRNMobileApp != "true") {
            MAF_Login(false);
            return;
        }
    }

    if (window.event != undefined && EnableAutoLoginForFixAndGo) {
        EnableAutoLoginForFixAndGo({
            "id"        : window.event.target.id,
            "eventtype" : window.event.type
        });
    }

    if (action != null)
        formObj.action = action;

    if (target != null)
        formObj.target = target;

    if (typeof (formObj.SWETS) != 'undefined') //always append timestamp
    {
        var now = new Date();
        formObj.SWETS.value = now.getTime();
    }

    if (typeof (formObj.SWEC) != 'undefined')
        formObj.SWEC.value = 0;

    formObj.SWECmd.value = "ExecuteLogin";


    var isMobileApp = window.sessionStorage.getItem("ismobileapp");
    if (isMobileApp == 'true') {
        if (!formObj.SyncNodeId) {
            var syncNodeId = document.createElement('input');
            syncNodeId.type = 'hidden';
            syncNodeId.name = 'SyncNodeId';
            formObj.appendChild(syncNodeId);
        }

        if (window.localStorage) {
            formObj.SyncNodeId.value = window.localStorage.getItem("SyncNodeId");
        }
        else {
            formObj.SyncNodeId.value = '';
        }
    }

    formObj.submit();
    formObj.submit = function () { };


    //ARRAI:Setting for Offline operations Sync
    //Fix for bug:14461124
    if (window.localStorage) {
        window.localStorage.setItem("ResetApp", 'true');
    }
}

function SWEAppLogin(formObj, action, target) {
    var pageurl = "App=" + formObj.Application.value + "&Lang=" + formObj.Language.value;
    window.localStorage.setItem("pageurl", pageurl);
    action = window.location.pathname + "app?" + pageurl;

    SWEExecuteLogin(formObj, action, target);
}


function SWESubmitOnEnterApp(e) {
    var keyCode = e ? e.which : window.event.keyCode;
    var formObj = e ? e.target.form : window.event.srcElement.form;

    if (keyCode == 13) {
        SWEAppLogin(formObj, null, null);
    }
}

function EnableAutoLoginForFixAndGo(debugDetails) {
    if (sessionStorage.getItem("SessionToActive") != "true" &&
		sessionStorage.getItem("InDebugState") == "true") {
        debugDetails.SWESSDebugUserName = document.getElementsByName("SWEUserName")[0].value;
        debugDetails.SWESSDebugPassword = document.getElementsByName("SWEPassword")[0].value;
        sessionStorage.setItem("debugDetails", JSON.stringify(debugDetails));
    }
}

function ExecuteAutoLogin() {
    if (sessionStorage.getItem("debugDetails")) {
        var waitForLogin = setInterval(function () {
            if (sessionStorage.getItem("InDebugState") == "true" &&
				document.getElementsByName("SWEUserName")[0]) {
                clearInterval(waitForLogin);
                var debugDetails = JSON.parse(window.sessionStorage.getItem("debugDetails"));
                document.getElementsByName("SWEUserName")[0].value = debugDetails.SWESSDebugUserName;
                document.getElementsByName("SWEPassword")[0].value = debugDetails.SWESSDebugPassword;
                document.getElementsByTagName("a")[0].click();
            }

            sessionStorage.removeItem("loginSiebelTarget");
            sessionStorage.removeItem("SessionToActive");
        }, 500);
    }
}

