if (typeof(VHADashboardCommon) === "undefined") {
	var VHADashboardCommon = {};
	VHADashboardCommon.VHADasboardGetICProp = function () {
			var NewAssetId = SiebelApp.S_App.GetProfileAttr("VHADashboardAssetId");
			var Paymentmethod = SiebelApp.S_App.GetProfileAttr("VHADashboardPaymentMethod");
			var ParentIC = "";
			var gAssetId = NewAssetId;
			var ser = SiebelApp.S_App.GetService("VF BS Process Manager");
			var Inputs = SiebelApp.S_App.NewPropertySet();
			console.log("EAICall");
			Inputs.SetProperty("Service Name", "EAI Siebel Adapter");
			Inputs.SetProperty("Method Name", "Query");
			Inputs.SetProperty("SearchSpec", "[Asset Header.Installed Asset Id] LIKE '"+gAssetId+"'");
			if(Paymentmethod == "Postpay" || Paymentmethod == "Non Paying")
			Inputs.SetProperty("OutputIntObjectName", "VHA Generic Dashboard IO");
			else if(Paymentmethod == "Prepay")
			Inputs.SetProperty("OutputIntObjectName", "VHA Prepay Dashboard IO");
			else if(Paymentmethod == "NBN")
			Inputs.SetProperty("OutputIntObjectName", "VHA NBN Dashboard IO");
			var out = ser.InvokeMethod("Run Process", Inputs);
			var resultset = out.GetChildByType("ResultSet");
			var SiebMessage = resultset.GetChildByType("SiebelMessage");
			ParentIC = SiebMessage.GetChild(0).GetChild(0);
			VHAAppUtilities.SetConstants("VHADashboardParentIC",ParentIC); 
			
	}
	
	VHADashboardCommon.VHADasboardGetAPICallConfiglist = function () {
		var Activeview = SiebelApp.S_App.GetActiveView().GetName();
		var APIswitchVal = "";
		if(Activeview == "VHA Postpay Asset Dashboard View")
		{
		var configlist = VHAAppUtilities.GetConfigList("[VHA Configuration List.Name]='VHA Asset Dashboard API Call Switch' and [VHA Configuration List.Type]='VHA_360_API_TOGGLE' and [VHA Configuration List.Value]='Postpay'");
		APIswitchVal = configlist[0]["String 27"];
		}
		else if(Activeview == "VHA Prepay Asset Dashboard View")
		{
		var configlist = VHAAppUtilities.GetConfigList("[VHA Configuration List.Name]='VHA Asset Dashboard API Call Switch' and [VHA Configuration List.Type]='VHA_360_API_TOGGLE' and [VHA Configuration List.Value]='Prepay'");
		APIswitchVal = configlist[0]["String 27"];
		}
		else
		{
		var configlist = VHAAppUtilities.GetConfigList("[VHA Configuration List.Name]='VHA Asset Dashboard API Call Switch' and [VHA Configuration List.Type]='VHA_360_API_TOGGLE' and [VHA Configuration List.Value]='NBN'");
		APIswitchVal = configlist[0]["String 27"];
		}
		VHAAppUtilities.SetConstants("VHADashAPICallSwitch",APIswitchVal);
	}
	
}



