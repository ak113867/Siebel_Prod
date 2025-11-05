if (typeof(SiebelAppFacade.VFCustomerIdRemovalPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VFCustomerIdRemovalPR");
    define("siebel/custom/VFCustomerIdRemovalPR", [], function () {
        SiebelAppFacade.VFCustomerIdRemovalPR = (function () {
            function VFCustomerIdRemovalPR(pm) {
                SiebelAppFacade.VFCustomerIdRemovalPR.superclass.constructor.call(this, pm)
            }
            SiebelJS.Extend(VFCustomerIdRemovalPR, SiebelAppFacade.JQGridRenderer);
            VFCustomerIdRemovalPR.prototype.Init = function () {
                SiebelAppFacade.VFCustomerIdRemovalPR.superclass.Init.apply(this, arguments); 



               
            };
            VFCustomerIdRemovalPR.prototype.ShowUI = function () {
                SiebelAppFacade.VFCustomerIdRemovalPR.superclass.ShowUI.apply(this, arguments);
               
	var prrole = SiebelApp.S_App.GetProfileAttr("VHA Role Name");
	var RoleRespFnd="";

	try
	{
		RoleRespFnd = VHAAppUtilities.GetPickListValues("", "[List Of Values.Type]='VHA_CUSTID_ROLE_RESP' AND [List Of Values.Name]= '" + prrole + "' AND [List Of Values.Active]='Y'", {
                    "All": "true"
                })[0].Description;
	}

	catch (e$0) 
	{
		RoleRespFnd="";
	}


	if (RoleRespFnd == null || RoleRespFnd =="") 
	{

		this.GetGrid().hideCol('Id_Reference_Number_ReadOnly');
		this.GetGrid().hideCol('Id_Reference_Number');
		this.GetGrid().hideCol('Id_Ref_Num');

	}

			 
	if (RoleRespFnd != null && RoleRespFnd !="")
	{

		this.GetGrid().hideCol('Id_Reference_Number_Calc');
	} 

            };

		VFCustomerIdRemovalPR.prototype.BindData = function (bRefresh) { 

                SiebelAppFacade.VFCustomerIdRemovalPR.superclass.BindData.apply(this, arguments);
 
	 

		}

           
           

            return VFCustomerIdRemovalPR
        }
            ());
        return "SiebelAppFacade.VFCustomerIdRemovalPR"
    })
};
