//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=VHAServiceRequestNewUISubmitApplet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPM");
 define("siebel/custom/VHAServiceRequestNewUISubmitAppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPM = (function () {

    function VHAServiceRequestNewUISubmitAppletPM(pm) {
     SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHAServiceRequestNewUISubmitAppletPM, SiebelAppFacade.PresentationModel);

    VHAServiceRequestNewUISubmitAppletPM.prototype.Init = function () {
     SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPM.superclass.Init.apply(this, arguments);
	 this.AddMethod("InvokeMethod", PreInvokeMethod, {sequence: true, scope: this});
    }

    VHAServiceRequestNewUISubmitAppletPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPM.superclass.Setup.apply(this, arguments);
    }
	
	function PreInvokeMethod (methodName, psInputArgs, lp, returnStructure)

{
     
      //if (methodName == "VFAssignSubmitSR")
	if (methodName == "VFAssignSubmitSR" || methodName == "VFAssignPauseSR")//MADHU::19-MAR-24::modified for PKE000000111153
      {
	  var cArray = [];
	  var CustomFieldValues = [];
	  cArray = $('.inputchck');
	  for(var i=0; i<cArray.length; i++)
	  {
		  if ((cArray[i].value=="" || cArray[i].value==null) && ($("#"+cArray[i].id).parent().parent().find('.custError').length))
		  {
			  if (methodName == "VFAssignSubmitSR") //Sangari::10-Jul-24::modified for PKE000000111153
			  {
				$("#"+cArray[i].id).parent().parent().find('.custError').css("visibility","visible");
				returnStructure["CancelOperation"] = true;
				SiebelApp.S_App.uiStatus.Free();
			   
				return;
			  }
			  else 
			  {
				  CustomFieldValues.push(cArray[i].id+"||"+cArray[i].value);
			  }
		  }
		  else
		  {
			  $("#"+cArray[i].id).parent().parent().find('.custError').css("visibility","hidden");
			  if (cArray[i].type=='datetime-local')
			  {
				 var dt_tm = DateTimeFormatter(cArray[i].value);
				 CustomFieldValues.push(cArray[i].id+"||"+dt_tm);
			  }
			  else
			  {
				  CustomFieldValues.push(cArray[i].id+"||"+cArray[i].value);
			  }
		  }
		  
	  }
      var cPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Service Request New UI Custom Fields Applet"].GetPModel();
	  //var CustomFieldValues = cPM.Get("dArray");
	  var SRId = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Service Request New UI Applet"].GetPModel().Get("GetRecordSet")[0].Id;
       var service = SiebelApp.S_App.GetService("Workflow Process Manager");
		   var inPS = SiebelApp.S_App.NewPropertySet();
           var opPS = SiebelApp.S_App.NewPropertySet();
		   inPS.SetProperty("ProcessName","VHA SR New View Update Custom Fields");
		   inPS.SetProperty("SRRowId",SRId);
		   inPS.SetProperty("CustomFieldValues",CustomFieldValues);
		   opPS = service.InvokeMethod("RunProcess",inPS);
		   if (methodName == "VFAssignSubmitSR")//MADHU::19-MAR-24::modified for PKE000000111153
		   {
		   alert("SR Submitted Successfully.");
		   }
		   //console.log("Test: "+opPS);
           returnStructure["CancelOperation"] = false;
		   //SiebelApp.S_App.uiStatus.Free();
      }
      
      returnStructure["ContinueOperation"] = true;

}

	function DateTimeFormatter(datetime)
	{
		var dt = datetime.split("T")[0].toString();
        dt = dt.split(/-/)[2]+'/'+dt.split(/-/)[1]+'/'+dt.split(/-/)[0];
        var tm = datetime.split("T")[1].toString()+":00";
		var dt_tm = dt+" "+tm;
		return dt_tm;
	}
    return VHAServiceRequestNewUISubmitAppletPM;
   }()
  );
  return "SiebelAppFacade.VHAServiceRequestNewUISubmitAppletPM";
 })
}
