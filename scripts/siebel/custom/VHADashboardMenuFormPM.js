if(typeof(SiebelAppFacade.VHADashboardMenuFormPM)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.VHADashboardMenuFormPM");define("siebel/custom/VHADashboardMenuFormPM",[],function(){SiebelAppFacade.VHADashboardMenuFormPM=(function(){function VHADashboardMenuFormPM(proxy){SiebelAppFacade.VHADashboardMenuFormPM.superclass.constructor.call(this,proxy)}SiebelJS.Extend(VHADashboardMenuFormPM,SiebelAppFacade.PresentationModel);VHADashboardMenuFormPM.prototype.Init=function(){SiebelAppFacade.VHADashboardMenuFormPM.superclass.Init.call(this);
this.AddMethod("InvokeMethod",PreInvokeMethod1,{sequence:true,scope:this})
this.AddMethod("PostExecute",PreInvokeMethod,{sequence:false,scope:this})
};
function PreInvokeMethod(MethodName,returnStructure)
{
switch(MethodName){case"ShowPopup_EEF":var sinv;if(sinv!="N"){var inp=SiebelApp.S_App.NewPropertySet();inp.SetProperty("SWEMethod","ShowPopup");inp.SetProperty("SWEH","350");inp.SetProperty("SWEW","800");inp.SetProperty("SWETA","VF Display EEF MPP Popup Applet");inp.SetProperty("SWEM","Base");this.ExecuteMethod("InvokeMethod","ShowPopup",inp);sinv="N"}break;case"OpenCSCLink":var ser=SiebelApp.S_App.GetService("VF BS Process Manager");var Inputs=SiebelApp.S_App.NewPropertySet();var Output=SiebelApp.S_App.NewPropertySet();Inputs.SetProperty("Service Name","PRM ANI Utility Service");Inputs.SetProperty("Method Name","GetSystemPreference");Inputs.SetProperty("System Preference Name","VHA Dashboard CSC Link");Output=ser.InvokeMethod("Run Process",Inputs);var prop=Output.GetChildByType("ResultSet");var surl=prop.GetProperty("System Preference Value");window.open(surl,"CNN_WindowName","menubar=no,titlebar=no,location=no,resizable=yes,scrollbars=yes,status=yes");break;case"mThrottlePass":var Inputs=SiebelApp.S_App.NewPropertySet();var Output=SiebelApp.S_App.NewPropertySet();var ser=SiebelApp.S_App.GetService("VF BS Process Manager");Inputs.SetProperty("Service Name","VHA MSISDN GotoView BS");Inputs.SetProperty("Method Name","GotoView");Inputs.SetProperty("BusObjName","VF Asset");Inputs.SetProperty("BusCompName","Asset Mgmt - Asset - Header");var ParentIC=VHAAppUtilities.GetConstants("VHADashboardParentIC");var RecordId=ParentIC.GetProperty("Installed Asset Id");Inputs.SetProperty("RowId",RecordId);Inputs.SetProperty("ViewName","VHA Throttle & Passes Settings View");var Output=ser.InvokeMethod("Run Process",Inputs);break;
}}
function PreInvokeMethod1(MethodName,returnStructure){
switch(MethodName){
case"NewAPP":
case"UpgradeTBUI":
case"TSUpgrade":
case"LaunchNewCustomerSS":
case"PretoPostConnectTBUI":
case"ConnectFBB":
case "VerifyEC":
var sProceed="Y";
var sBO = SiebelApp.S_App.GetActiveBusObj();
var sBC = sBO.GetBusCompByName("Asset Mgmt - Asset - Header");
var sAssetId = sBC.GetFieldValue("Id"); 
var sAccountId = sBC.GetFieldValue("Service Account Id");
if(MethodName=="VerifyEC"){
	var Inputs = SiebelApp.S_App.NewPropertySet();
	var Outs = SiebelApp.S_App.NewPropertySet();
	Inputs.SetProperty("AccountId",sAccountId);
	Outs = VHAAppUtilities.CallBS(
		"VHA TOT TBUI Service", "CheckPostpay",
		Inputs, {}
	);			
	sProceed=Outs.GetProperty("Postpay")=="Y"?"Y":"N";
}
if(sProceed=="Y"){
	if(sAssetId != null && sAssetId != "")
	{              
		var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
		var sInp = SiebelApp.S_App.NewPropertySet();
		var sOut = SiebelApp.S_App.NewPropertySet();
		sInp.SetProperty("Service Name", "VHA Postpay DVS Validation BS");
		sInp.SetProperty("Method Name", "VerifyVISAExpiryNative");                 
		sInp.SetProperty("AssetId", sAssetId);  
		sInp.SetProperty("UpgDashBoardView", "Y");   
		var sOut = ser.InvokeMethod("Run Process", sInp);
		var ResultSet = SiebelApp.S_App.NewPropertySet();
		ResultSet = sOut.GetChildByType ("ResultSet");
		var sErrorMsg = ResultSet.GetProperty("ErrorMessage");
		var sErrorTyp = ResultSet.GetProperty("ErrorType");
		if(sErrorTyp == "Warning" && sErrorMsg != "")
		{
			if(confirm(sErrorMsg))
				returnStructure["ContinueOperation"] = true;  
			else
			{
				SiebelApp.S_App.SetProfileAttr("VHAAssetFormRetrunstructure","Y");               
				returnStructure["CancelOperation"] = true;
			}
		}
		else if(sErrorTyp == "Error" && sErrorMsg != "") 
		{
			SiebelApp.S_App.SetProfileAttr("VHAAssetFormRetrunstructure","Y");                                                               
			alert(sErrorMsg);
			returnStructure["CancelOperation"] = true;
			SiebelApp.S_App.uiStatus.Free();   
		}
		else  
		{ 
			returnStructure["ContinueOperation"] = true;  
		} 
	}
}
break;
default:break}}return VHADashboardMenuFormPM}());return"SiebelAppFacade.VHADashboardMenuFormPM"})};
