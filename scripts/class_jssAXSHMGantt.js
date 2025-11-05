function JSSSWEFrameAXSHMGantt()
{
	this.AXGanttControl	= null;
	this.bPopulating = false;
}

function JSSSWEFrameAXSHMGantt_DoInitialize ( applet )
{	
	if (applet.controlArray != null)
	{
		for (i = 0; i < applet.controlArray.length; i++)
		{
			control = applet.controlArray[i];

			if (control.UItype == "ActiveXControl" && control.name == "GanttChart")
			{
				// Get AX Control
				this.AXGanttControl = applet.document.getElementById (control.inputName);

				// Wire up notification
				if(applet.GetNotifyObj() == null)
				{
					var oNObj = new JSSSWEFrameAXSHMGanttNotify( applet, this.AXGanttControl );
					applet.SetNotifyObj(oNObj);		
					applet.GetBusComp().RegNotifyObj(oNObj);
				}
				
			}
		}
	}

	if(this.AXGanttControl != null)
	{	
		//Call Initialize
		this.AXGanttControl.Initialize( this, null );				
	}
	
	return top._swescript.JSSApplet_DoInitialize( applet );
}

function JSSSWEFrameAXSHMGantt_DoPopulate( applet )
{
	if(this.AXGanttControl != null && !(this.bPopulating))
	{
		this.bPopulating = true;
		this.AXGanttControl.Populate( null );	
		this.bPopulating = false;
	}
	
	return top._swescript.JSSApplet_DoPopulate( applet );
}

function JSSSWEFrameAXSHMGantt_DoInvokeMethod( applet, method, inputPropSet )
{
	var retVal;

	retVal = top._swescript.JSSApplet_DoInvokeMethod( applet, method, inputPropSet );
	
	if(retVal)
		return null;
}

// JScript source code
JSSSWEFrameAXSHMGantt.prototype					= new top._swescript.JSSApplet();
JSSSWEFrameAXSHMGantt.prototype.DoInvokeMethod	= JSSSWEFrameAXSHMGantt_DoInvokeMethod;
JSSSWEFrameAXSHMGantt.prototype.DoInitialize	= JSSSWEFrameAXSHMGantt_DoInitialize;
JSSSWEFrameAXSHMGantt.prototype.DoPopulate		= JSSSWEFrameAXSHMGantt_DoPopulate;

function JSSSWEFrameAXSHMGanttNotify( applet, axControl )
{
	this.applet				= applet;
	this.AXGanttControl		= axControl;
}

function JSSSWEFrameAXSHMGanttNotify_NotifyGeneric( type, args)
{
	if(this.AXGanttControl != null)
	{
		this.AXGanttControl.Notify( type, args );
	}	
}

JSSSWEFrameAXSHMGanttNotify.prototype					= new top._swescript.JSSAppletNotify();
JSSSWEFrameAXSHMGanttNotify.prototype.NotifyGeneric		= JSSSWEFrameAXSHMGanttNotify_NotifyGeneric;