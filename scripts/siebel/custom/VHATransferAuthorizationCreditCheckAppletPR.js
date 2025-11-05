if (typeof(SiebelAppFacade.VHATransferAuthorizationCreditCheckAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.VHATransferAuthorizationCreditCheckAppletPR");
    define("siebel/custom/VHATransferAuthorizationCreditCheckAppletPR", ["order!siebel/phyrenderer"], function() {
        SiebelAppFacade.VHATransferAuthorizationCreditCheckAppletPR = (function() {
                function VHATransferAuthorizationCreditCheckAppletPR(pm) {
                    SiebelAppFacade.VHATransferAuthorizationCreditCheckAppletPR.superclass.constructor.call(this, pm);
                }
		SiebelJS.Extend(VHATransferAuthorizationCreditCheckAppletPR, SiebelAppFacade.PhysicalRenderer);
                VHATransferAuthorizationCreditCheckAppletPR.prototype.ShowUI = function() {
                    SiebelAppFacade.VHATransferAuthorizationCreditCheckAppletPR.superclass.ShowUI.call(this);
					function Segment(segItems ) {
					segItems.each(function (){
						var self = $(this);
						var onchange = self.attr('onchange');
						var wrapper = $("<div>",{class: "ui-segment"});
						$(this).find("option").each(function (){
							var option = $("<span>",{class: 'option',onclick:onchange,text: $(this).text(),value: $(this).val()});
							if ($(this).is(":selected")){
								option.addClass("active");
							}
							
							wrapper.append(option);
						});
						wrapper.find("span.option").click(function (){
							wrapper.find("span.option").removeClass("active");
							$(this).addClass("active");
							self.val($(this).attr('value'));
						});
						if(!($(this).next().hasClass('ui-segment')))
						{
						if($(.'ui-segment').length==0){
						$(this).after(wrapper);
						$(this).hide();
						}
						}
					});
				}
				Segment($(".segment-select"));
            }
			VHATransferAuthorizationCreditCheckAppletPR.prototype.BindEvents = function () {
            SiebelAppFacade.VHATransferAuthorizationCreditCheckAppletPR.superclass.BindEvents.apply(this, arguments);
			jQuery(document).ready(function(){
			$('.qtyplus').click(function(e){
			e.preventDefault();
			var fieldName=$(this).attr('field');
			var currentval=parseInt($('input [name='+fieldName+']').val());
			if(!isNaN(currentval)){
			  $('input [name='+fieldName+']').val(currentval+1)
			}
			else
			{
			  $('input [name='+fieldName+']').val(0)
			}
			});
			$('.qtyminus').click(function(e){
			e.preventDefault();
			var fieldName=$(this).attr('field');
			var currentval=parseInt($('input [name='+fieldName+']').val());
			if(!isNaN(currentval) && currentval>0){
			  $('input [name='+fieldName+']').val(currentval-1)
			}
			else
			{
			  $('input [name='+fieldName+']').val(0)
			}
			});
			});
            }
			return VHATransferAuthorizationCreditCheckAppletPR;
		}
            ());
        return "SiebelAppFacade.VHATransferAuthorizationCreditCheckAppletPR";
    });
}