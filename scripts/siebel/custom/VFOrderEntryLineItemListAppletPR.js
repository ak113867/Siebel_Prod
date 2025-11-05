if (typeof(SiebelAppFacade.VFOrderEntryLineItemListAppletPR) === "undefined") {
   SiebelJS.Namespace("SiebelAppFacade.VFOrderEntryLineItemListAppletPR");
   define("siebel/custom/VFOrderEntryLineItemListAppletPR", ["siebel/jqgridrenderer"], function () {
       SiebelAppFacade.VFOrderEntryLineItemListAppletPR = (function () {
           function VFOrderEntryLineItemListAppletPR(pm) {
               SiebelAppFacade.VFOrderEntryLineItemListAppletPR.superclass.constructor.apply(this, arguments);
           }
           SiebelJS.Extend(VFOrderEntryLineItemListAppletPR, SiebelAppFacade.JQGridRenderer);
           VFOrderEntryLineItemListAppletPR.prototype.Init = function () {
               SiebelAppFacade.VFOrderEntryLineItemListAppletPR.superclass.Init.apply(this, arguments);
               var pm = this.GetPM();
               pm.AttachEventHandler("SelectionChange", function () {
                   toggleApplets(pm);
               });
           };
           function toggleApplets(pm) {
               try {
					   var viewName = SiebelApp.S_App.GetActiveView().GetName();
					   if (viewName === "VF Order Entry - SIM Allocation View") {
					   var controls = pm.Get("GetControls");
					   var segment = controls["Segment"];
					   var segVal = pm.ExecuteMethod("GetFieldValue", segment);
					   var type = controls["Type"];
					   var typeVal = pm.ExecuteMethod("GetFieldValue", type);
					   var busSubType = controls["BusinessSubType"];
					   var subTypeVal = pm.ExecuteMethod("GetFieldValue", busSubType);
					   console.log("Segment:", segVal, "Type:", typeVal);
				   
                   if (subTypeVal === "First" && segVal === "Business" && (typeVal === "Corporate" || typeVal === "Government")) {
						$(".siebui-applet[title='QR Codes List Applet']").closest(".siebui-applet").hide();
						$(".siebui-applet[title='EG QR Codes List Applet']").closest(".siebui-applet").show();
						$(".siebui-applet[title='ESIM QR Code Contacts List Applet']").closest(".siebui-applet").show();

                   } else {
						$(".siebui-applet[title='QR Codes List Applet']").closest(".siebui-applet").show();
						$(".siebui-applet[title='EG QR Codes List Applet']").closest(".siebui-applet").hide();
						$(".siebui-applet[title='ESIM QR Code Contacts List Applet']").closest(".siebui-applet").hide();
                   }
               }
			}		catch (e) {
                   console.log("Error in toggleApplets: ", e);
               }
           }
           VFOrderEntryLineItemListAppletPR.prototype.ShowUI = function () {
               SiebelAppFacade.VFOrderEntryLineItemListAppletPR.superclass.ShowUI.apply(this, arguments);
               toggleApplets(this.GetPM());
           };
           return VFOrderEntryLineItemListAppletPR;
       }());
       return "SiebelAppFacade.VFOrderEntryLineItemListAppletPR";
   });
}