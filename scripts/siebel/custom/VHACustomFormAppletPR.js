//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=VHACustomFormApplet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.VHACustomFormAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.VHACustomFormAppletPR");
 define("siebel/custom/VHACustomFormAppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.VHACustomFormAppletPR = (function () {

    function VHACustomFormAppletPR(pm) {
     SiebelAppFacade.VHACustomFormAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(VHACustomFormAppletPR, SiebelAppFacade.PhysicalRenderer);

    VHACustomFormAppletPR.prototype.Init = function () {
     SiebelAppFacade.VHACustomFormAppletPR.superclass.Init.apply(this, arguments);
    }

    VHACustomFormAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.VHACustomFormAppletPR.superclass.ShowUI.apply(this, arguments);
    }

    VHACustomFormAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.VHACustomFormAppletPR.superclass.BindData.apply(this, arguments);
    }

    VHACustomFormAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.VHACustomFormAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    VHACustomFormAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.VHACustomFormAppletPR.superclass.EndLife.apply(this, arguments);
    }

    function dateTimeFormatter(datetime)
	{
		var dt = datetime.split(" ")[0].split('/')[2]+"-"+datetime.split(" ")[0].split('/')[0]+"-"+datetime.split(" ")[0].split('/')[1];
		var tm = datetime.split(" ")[1].slice(0,5);
		var dt_tm = dt+'T'+tm;
		return dt_tm;
	}

	VHACustomFormAppletPR.prototype.RenderData = function () {
		/*if (SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Service Request New UI Applet"].GetPModel().Get("GetRecordSet")[0]["VF Credit Card Toggle Calc"]=="N")
					{
					var aID = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Credit Card SR New View Applet"].GetPModel().Get("GetFullId");
					$("#"+aID).addClass("VFDisplayNone");
					}
				else{
					var aID = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Credit Card SR New View Applet"].GetPModel().Get("GetFullId");
					$("#"+aID).removeClass("VFDisplayNone");
				};*/
	   var pm = this.GetPM();
	   //var SRId = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA Service Request New UI Applet"].GetPModel().Get("GetRecordSet")[0].Id;
	   var RecSet = SiebelApp.S_App.GetActiveView().GetAppletMap()["VHA SR Custom Fields Applet"].GetPModel().Get("GetRawRecordSet");
	   var aId = this.GetPM().Get("GetFullId");
	   $("#"+aId).replaceWith("<div class='VFCustFormApplet vha-card-style'><label class='VHAAppletLabel VHAFormTitle p-3'>Custom Fields</label></div>");
	   $(".FormContainer").remove();
	   if(RecSet.length== 0){$(".VFCustFormApplet").addClass("VFDisplayNone")}
	   else{$(".VFCustFormApplet").removeClass("VFDisplayNone")}
	   var tHTML = "<div class='FormContainer p-3'>"
	  for (var i=0; i<RecSet.length; i++)
	  {
		  
		  if (RecSet[i]["Format"]==="Text")
		  {
		   if(RecSet[i]["Required Flg"] == 'Y')
		   {
			   tHTML+="<div class='custField'><div class='lblDiv'><label class='custLabel'>"+RecSet[i]["Field Name"]+"<span class='custreqd'> *</span></label></div><div><input type='text' placeholder='Text' class='custText inputchck' id='"+RecSet[i]["Id"]+"' value='"+RecSet[i]["Field Value"]+"'></div><br><span class='custError'> "+RecSet[i]["Field Name"]+" is a required field.</span></div><br>"
		   }
		   else
		   {
			   tHTML+="<div class='custField'><div class='lblDiv'><label class='custLabel'>"+RecSet[i]["Field Name"]+"</label></div><div><input type='text' placeholder='Text' class='custText inputchck' id='"+RecSet[i]["Id"]+"' value='"+RecSet[i]["Field Value"]+"'></div></div><br>"
		   }
		   
		  }
		  else if (RecSet[i]["Format"]==="Picklist")
		  {
			if(RecSet[i]["Required Flg"] == 'Y')
			{
				tHTML+="<div class='custField'><div class='lblDiv'><label class='custLabel'>"+RecSet[i]["Field Name"]+"<span class='custreqd'> *</span></label></div>"
			}
		    else
			{
				tHTML+="<div class='custField'><div class='lblDiv'><label class='custLabel'>"+RecSet[i]["Field Name"]+"</label><label class='custreqd'>*</label></div>"
			}
		   tHTML+="<div><select  class='custSelect inputchck' id='"+RecSet[i]["Id"]+"'>"
		   var service = SiebelApp.S_App.GetService("Workflow Process Manager");
		   var inPS = SiebelApp.S_App.NewPropertySet();
           var opPS = SiebelApp.S_App.NewPropertySet();
		   inPS.SetProperty("ProcessName","VHA SR New View Custom Fields");
		   inPS.SetProperty("Picklist Identifier",RecSet[i]["Picklist Identifier"]);
		   opPS = service.InvokeMethod("RunProcess",inPS)
		   var LOV = [];
		   LOV = opPS.childArray[0].childArray[0].childArray[0].childArray;
		   tHTML+="<option value='' style='display:none'></option>" //VHA:Added to remove predefault lov value
		   for (var j=0; j<LOV.length; j++ )
		    {
				if (RecSet[i]["Field Picklist"] == LOV[j].propArray["Value"])
				tHTML+="<option value='"+LOV[j].propArray["Value"]+"' selected>"+LOV[j].propArray["Value"]+"</option>"
				else
			   tHTML+="<option value='"+LOV[j].propArray["Value"]+"'>"+LOV[j].propArray["Value"]+"</option>"
		    }
		   
		   tHTML+="</select></div><br><span class='custError'> "+RecSet[i]["Field Name"]+" is a required field.</span></div><br>"
		  }
	      else if (RecSet[i]["Format"]==="Number")
		  {
			  if(RecSet[i]["Required Flg"] == 'Y')
			{
				tHTML+="<div class='custField'><div class='lblDiv'><label class='custLabel'>"+RecSet[i]["Field Name"]+"<span class='custreqd'> *</span></label></div><div><input type='number' placeholder='Number' class='custNumber inputchck' id='"+RecSet[i]["Id"]+"' value='"+RecSet[i]["Field Value"]+"'></div><br><span class='custError'> "+RecSet[i]["Field Name"]+" is a required field.</span></div><br>"
			}
			else
			{
				tHTML+="<div class='custField'><div class='lblDiv'><label class='custLabel'>"+RecSet[i]["Field Name"]+"</label></div><div><input type='number' placeholder='Number' class='custNumber inputchck' id='"+RecSet[i]["Id"]+"' value='"+RecSet[i]["Field Value"]+"'></div></div><br>"
			}
		   
		  }
	      else if (RecSet[i]["Format"]==="Y / N") /*VHA:Modified for Y/N Predefault LOV*/
		  {
			   if(RecSet[i]["Required Flg"] == 'Y')
			{
				tHTML+="<div class='custField'><div class='lblDiv'><label class='custLabel'>"+RecSet[i]["Field Name"]+"<span class='custreqd'> *</span></label></div><div><select  class='custSelect inputchck' id='"+RecSet[i]["Id"]+"'>"
				
				if(RecSet[i]["Field Value"]=='Y')
				tHTML+="<option value='Y' selected>Y</option><option value='N'>N</option>"
			    else if(RecSet[i]["Field Value"]=='N')
				tHTML+="<option value='Y'>Y</option><option value='N' selected>N</option>"
				else
				tHTML+="<option value='' style='display:none'></option><option value='Y'>Y</option><option value='N'>N</option>"	
				tHTML+="</select></div><br><span class='custError'> "+RecSet[i]["Field Name"]+" is a required field.</span></div><br>"
			}
			else
			{
				tHTML+="<div class='custField'><div class='lblDiv'><label class='custLabel'>"+RecSet[i]["Field Name"]+"</label></div><div><select  class='custSelect inputchck' id='"+RecSet[i]["Id"]+"'>"
				if(RecSet[i]["Field Value"]=='Y')
				tHTML+="<option value='Y' selected>Y</option><option value='N'>N</option>"
			    else if(RecSet[i]["Field Value"]=='N')
				tHTML+="<option value='Y'>Y</option><option value='N' selected>N</option>"
				else
				tHTML+="<option value='' style='display:none'></option><option value='Y'>Y</option><option value='N'>N</option>"		
				tHTML+="</select></div></div><br>"
			}
			 
		  }
		  else if (RecSet[i]["Format"]==="Date & Time" || RecSet[i]["Format"]==="Date")
		  {
			    if(RecSet[i]["Required Flg"] == 'Y')
			{
				if (RecSet[i]["Field Date"])
				var dt_tm = dateTimeFormatter(RecSet[i]["Field Date"]);
			
				tHTML+="<div class='custField'><div class='lblDiv'><label class='custLabel'>"+RecSet[i]["Field Name"]+"<span class='custreqd'> *</span></label></div><div><input type='datetime-local' class='custdt inputchck' id='"+RecSet[i]["Id"]+"' value='"+dt_tm+"'></div><br><span class='custError'> "+RecSet[i]["Field Name"]+" is a required field.</span></div><br>" 
			}
			else
			{
				tHTML+="<div class='custField'><div class='lblDiv'><label class='custLabel'>"+RecSet[i]["Field Name"]+"</label></div><div><input type='datetime-local' class='custdt inputchck' id='"+RecSet[i]["Id"]+"' value='"+dt_tm+"'></div></div><br>" 
			}
			 
		  }
	  }
	  tHTML+="</div>"
	  $(".VFCustFormApplet").append(tHTML);
	  
	  
	  /*$(".inputchck").focusout(function(){
	  var value=$(this).val();
	  if (value == "" || value == null)
	   {
		  $(this).parent().parent().find('.custError').css("visibility","visible");
	   }
	  else
	  {
		 $(this).parent().parent().find('.custError').css("visibility","hidden"); 
	  }
	  });*/
	 /* var string = rowId+"||"+value;
	  if (dArray.indexOf(string)== -1)
  	   {
		  dArray.push(string);
		  pm.SetProperty("dArray",dArray)
	   }
      */
	  
	  
	  /*$(".VFCustFormApplet").focusout(function(){
      SetData(dArray);
      });
	  
	  function SetData(dArray)
	  {
		  if(dArray.length=0)
			return;
		   console.log(SRId,dArray);
		   var service = SiebelApp.S_App.GetService("Workflow Process Manager");
		   var inPS = SiebelApp.S_App.NewPropertySet();
           var opPS = SiebelApp.S_App.NewPropertySet();
		   inPS.SetProperty("ProcessName","VHA SR New View Update Custom Fields");
		   inPS.SetProperty("SRRowId",SRId);
		   inPS.SetProperty("CustomFieldValues",dArray);
		   opPS = service.InvokeMethod("RunProcess",inPS);
		   console.log("Test: "+opPS);
	  }*/
    }

    return VHACustomFormAppletPR;
   }()
  );
  return "SiebelAppFacade.VHACustomFormAppletPR";
 })
}
