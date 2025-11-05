if (typeof (SiebelAppFacade.VHAGeneratePaymentURLPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHAGeneratePaymentURLPR");
    define("siebel/custom/VHAGeneratePaymentURLPR", ["siebel/jqgridrenderer"], function() {
        SiebelAppFacade.VHAGeneratePaymentURLPR = (function() {
            function VHAGeneratePaymentURLPR(pm) {
                SiebelAppFacade.VHAGeneratePaymentURLPR.superclass.constructor.apply(this, arguments)
            }
            SiebelJS.Extend(VHAGeneratePaymentURLPR, SiebelAppFacade.JQGridRenderer);
            VHAGeneratePaymentURLPR.prototype.Init = function() {
                SiebelAppFacade.VHAGeneratePaymentURLPR.superclass.Init.apply(this, arguments)
				var this_t = this;
				this.GetPM().AddMethod("PostExecute", PostInvokeMethod, {
				sequence: false,
				scope: false	
				});				
            };
			function PostInvokeMethod(MethodName) {
				if (MethodName == "GeneratePaymentURL") 
				{
    					var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";   
    					var string_length = 8;  
    					var randomstring = '';  
    					for (var i=0; i<string_length; i++)
					{  
        				var rnum = Math.floor(Math.random() * chars.length);  
        				randomstring += chars.substring(rnum,rnum+1);  
					SiebelApp.S_App.SetProfileAttr("ShortCodeP", randomstring );
    					} 										
				}
			}
            VHAGeneratePaymentURLPR.prototype.ShowUI = function() {
                SiebelAppFacade.VHAGeneratePaymentURLPR.superclass.ShowUI.apply(this, arguments);

    		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";   
    		var string_length = 8;  
    		var randomstring = '';  
    		for (var i=0; i<string_length; i++) {  
        	var rnum = Math.floor(Math.random() * chars.length);  
        	randomstring += chars.substring(rnum,rnum+1);  
		SiebelApp.S_App.SetProfileAttr("ShortCodeP", randomstring );
		}

            };
			VHAGeneratePaymentURLPR.prototype.BindData = function (bRefresh) {
			SiebelAppFacade.VHAGeneratePaymentURLPR.superclass.BindData.apply(this, arguments);
			var controls = this.GetPM().Get("GetControls");		
			}				
			VHAGeneratePaymentURLPR.prototype.BindEvents = function() {
				SiebelAppFacade.VHAGeneratePaymentURLPR.superclass.BindEvents.apply(this, arguments);                    
			}					
            return VHAGeneratePaymentURLPR;
        }());
        return "SiebelAppFacade.VHAGeneratePaymentURLPR";
    })
};