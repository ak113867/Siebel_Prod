(function ($, window, document, undefined) {
    "use strict";
	var defaults = {
		selected: 0,
		cancelBtnText: 'Cancel',
		autoAdjustHeight: true,
		cycleSteps: false,
		stepCreate: {
			stepObj: [],
			ulSelector:{}
		},
		toolbarSettings: {
			toolbarPosition: 'bottom',
			toolbarButtonPosition: 'end',
			showNextButton: true,
			showPreviousButton: true,
			toolbarExtraButtons: [],
		},
		anchorSettings: {
			anchorClickable: true,
			enableAllAnchors: false,
			markDoneStep: true,
			markAllPreviousStepsAsDone: true,
			removeDoneStepOnNavigateBack: false,
			enableAnchorOnDoneStep: true
		},
		disabledSteps: [],
		errorSteps: [],
		hiddenSteps: [],
		theme: 'default',
		transitionEffect: 'none',
        transitionSpeed: '400',
        cartsummary:false,
		showStepCb: function(){return true;}
	}
	// The plugin constructor
    function SmartWizard(element, options) {
		this.options = $.extend(true, {}, defaults, options);
		this.main = $(element);
		this.nav = this.main.children('ul');
		this.steps = $("li > div", this.nav);
		this.container = this.main.children('div');
		this.pages = this.container.children('div');
		this.current_index = null;
		this.options.toolbarSettings.toolbarButtonPosition = this.options.toolbarSettings.toolbarButtonPosition === 'right' ? 'end' : this.options.toolbarSettings.toolbarButtonPosition;
        this.options.toolbarSettings.toolbarButtonPosition = this.options.toolbarSettings.toolbarButtonPosition === 'left' ? 'start' : this.options.toolbarSettings.toolbarButtonPosition;
		this.options.theme = this.options.theme === null || this.options.theme === '' ? 'default' : this.options.theme;
		this.init();
	}
	
	$.extend(SmartWizard.prototype, {
		init: function () {
			this._createSteps();
			this._setElements();
			this._setToolbar();
			this._setEvents();
			var idx = this.options.selected;
            if (idx > 0 && this.options.anchorSettings.markDoneStep && this.options.anchorSettings.markAllPreviousStepsAsDone) {
                this.steps.eq(idx).parent('li').prevAll().addClass("done");
            }
            this._showStep(idx);		
		},
		_createSteps: function(){
			if (this.options.stepCreate.stepObj.length >0){
				var Obj = this.options.stepCreate.stepObj;
				var selector = this.options.stepCreate.ulSelector;
				for(var i = 0; i<Obj.length; i++){
					 $('<li />', {html: '<div class="vha-guided-flow-li" vha-step="#'+Obj[i].a+'"><div class="litext">'+Obj[i].description+'</div></div>'}).appendTo(selector);
				}
			} 
			this.steps = $("li > div", this.nav);
		},
		_setElements: function () {
			this.main.addClass('sw-main sw-theme-' + this.options.theme);
			this.nav.addClass('nav nav-tabs step-anchor justify-content-center').children('li').addClass('nav-item').children('div').addClass('nav-link');
			if (this.options.anchorSettings.enableAllAnchors !== false && this.options.anchorSettings.anchorClickable !== false) {
                this.steps.parent('li').addClass('clickable');
            }
            if(this.options.cartsummary==true){
                this.container.addClass('sw-container tab-content sw-width-70');
            }else{
                this.container.addClass('sw-container tab-content');
            }            
			this.pages.addClass('tab-pane step-content');
            var mi = this;
            if (this.options.disabledSteps && this.options.disabledSteps.length > 0) {
                $.each(this.options.disabledSteps, function (i, n) {
                    mi.steps.eq(n).parent('li').addClass('disabled');
                });
            }
            if (this.options.errorSteps && this.options.errorSteps.length > 0) {
                $.each(this.options.errorSteps, function (i, n) {
                    mi.steps.eq(n).parent('li').addClass('danger');
                });
            }
            if (this.options.hiddenSteps && this.options.hiddenSteps.length > 0) {
                $.each(this.options.hiddenSteps, function (i, n) {
                    mi.steps.eq(n).parent('li').addClass('hidden');
                });
            }
            return true;
		},
		_setToolbar: function () {
			if (this.options.toolbarSettings.toolbarPosition === 'none') {
                return true;
            }
			if (this.options.toolbarSettings.specificButtons && this.options.toolbarSettings.specificButtons.length > 0){
				
			}
			var btnGroupExtra = '<div class="w-100 mt-3 dflex bd-highlight p-2"><div class="mr-auto bd-highlight"><button id = "vha-cancel-btn" class="vha-custom-button btn btn-secondary float-left vhaprimarybtn">'+ this.options.cancelBtnText + '</button></div><div class="bd-highlight"><div class="float-right">';
					
			if (this.options.toolbarSettings.toolbarExtraButtons && this.options.toolbarSettings.toolbarExtraButtons.length > 0) {
				var custButton = this.options.toolbarSettings.toolbarExtraButtons;
				for(var i = 0; i<custButton.length; i++){
					btnGroupExtra +='<button id = "'+custButton[i].custId+'" class="vha-custom-button mx-2 float-left '+ custButton[i].className + '">'+custButton[i].buttonName+'</button>';
				}
				btnGroupExtra += "</div></div></div>";
            }		
			var toolbarTop, toolbarBottom;
            switch (this.options.toolbarSettings.toolbarPosition) {
                case 'top':
                    toolbarTop = $('<div></div>').addClass('btn-toolbar sw-toolbar sw-toolbar-top justify-content-' + this.options.toolbarSettings.toolbarButtonPosition);
                    if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
                        toolbarTop.prepend(btnGroupExtra);
                    } else {
                        toolbarTop.append(btnGroupExtra);
                    }
                    this.container.before(toolbarTop);
                    break;
                case 'bottom':
                    toolbarBottom = $('<div></div>').addClass('btn-toolbar sw-toolbar sw-toolbar-bottom mt-5 justify-content-' + this.options.toolbarSettings.toolbarButtonPosition);
                    if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
                        toolbarBottom.prepend(btnGroupExtra);
                    } else {
                        toolbarBottom.append(btnGroupExtra);
                    }
                    break;
                case 'both':
                    toolbarTop = $('<div></div>').addClass('btn-toolbar sw-toolbar sw-toolbar-top justify-content-' + this.options.toolbarSettings.toolbarButtonPosition);
                    if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
                        toolbarTop.prepend(btnGroupExtra);
                    } else {
                        toolbarTop.append(btnGroupExtra);
                    }
                    this.container.before(toolbarTop);
                    toolbarBottom = $('<div></div>').addClass('btn-toolbar sw-toolbar sw-toolbar-bottom mt-5 justify-content-' + this.options.toolbarSettings.toolbarButtonPosition);
                    if (btnGroupExtra !== null) {
                      if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
                          toolbarBottom.prepend(btnGroupExtra.clone(true));
                      } else {
                          toolbarBottom.append(btnGroupExtra.clone(true));
                      }
                    }
                    this.container.after(toolbarBottom);
                    break;
                default:
                    toolbarBottom = $('<div></div>').addClass('btn-toolbar sw-toolbar sw-toolbar-bottom mt-5 justify-content-' + this.options.toolbarSettings.toolbarButtonPosition);
                    if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
                        toolbarBottom.append(btnGroupExtra);
                    } else {
                        toolbarBottom.append(btnGroupExtra);
                    }
                    this.container.after(toolbarBottom);
                    break;
            }
            if(this.options.cartsummary==true){
                this.container.wrap( "<div class='sw-container-parent p-3 mt-4'><div class='sw-container-mid d-flex flex-row'></div></div>" );
                $(".sw-container-parent").append(toolbarBottom);
                $(".sw-container-mid").append("<div class='sw-cart-sum sw-width-30'></div>");
            }
            else{
                this.container.wrap( "<div class='sw-container-parent p-3 mt-4'></div>" );
                $(".sw-container-parent").append(toolbarBottom);
            }
            return true;
		},
		_setEvents: function () {
			var mi = this;
            $(this.steps).on("click", function (e) {
				e.preventDefault();
                if (mi.options.anchorSettings.anchorClickable === false) {
                    return true;
                }
                var idx = mi.steps.index(this);
                if (mi.options.anchorSettings.enableAnchorOnDoneStep === false && mi.steps.eq(idx).parent('li').hasClass('done')) {
                    return true;
                }
				 if (idx <= mi.current_index) {
                    if (mi.options.anchorSettings.enableAllAnchors !== false && mi.options.anchorSettings.anchorClickable !== false) {
                        mi._showStep(idx);
                    } else {
                        if (mi.steps.eq(idx).parent('li').hasClass('done')) {
                            mi._showStep(idx);
                        }
                    }
                }
			});
			$('.sw-btn-next', this.main).on("click", function (e) {
                e.preventDefault();
                mi._showNext();
            });
			$('.sw-btn-prev', this.main).on("click", function (e) {
                e.preventDefault();
                mi._showPrevious();
            });
			$('.vha-custom-button', this.main).on("click", function(e) {
				e.preventDefault();
				mi._triggerEvent("vhacustomBtnClick", this);
			});
			$('.vha-wizard-nav', this.main).on("click", function(e) {
				e.preventDefault();
				var direction = $(this).hasClass("vha-next") ? "forward" : "backward";
				var resp = mi._triggerEvent("navBtnClick", [this, mi.current_index, direction]);
				if(typeof resp === 'boolean'){
					if(resp) {
						if(direction === "forward"){
							mi._showNext();
						}else if(direction === "backward"){
							mi._showPrevious();
						}
					}
				}else {
					if("response" in resp && resp.response) {
						var stepNum = ("stepNum" in resp) ? parseInt(resp.stepNum) : 'notpassed';
						if(!isNaN(stepNum)){
							mi._goToStep(stepNum);
						}
					}					
				}
			});
			
		},
		
		_showNext: function () {
            var si = this.current_index + 1;
            for (var i = si; i < this.steps.length; i++) {
                if (!this.steps.eq(i).parent('li').hasClass('disabled') && !this.steps.eq(i).parent('li').hasClass('hidden')) {
                    si = i;
                    break;
                }
            }
            if (this.steps.length <= si) {
                if (!this.options.cycleSteps) {
                    return false;
                }
                si = 0;
            }
            this._showStepWrapper(si);
			$("#vha-guided-wizard").focus();
            return true;
        },
		_showPrevious: function () {
            var si = this.current_index - 1;
            for (var i = si; i >= 0; i--) {
                if (!this.steps.eq(i).parent('li').hasClass('disabled') && !this.steps.eq(i).parent('li').hasClass('hidden')) {
                    si = i;
                    break;
                }
            }
            if (0 > si) {
                if (!this.options.cycleSteps) {
                    return false;
                }
                si = this.steps.length - 1;
            }
            this._showStepWrapper(si);
			$("#vha-guided-wizard").focus();
            return true;
        },
		_showStepWrapper: function (idx) {
			var ms=200;
			var shOut=true;
			if(this.current_index==undefined){			
				shOut=this._showStep(idx);	
			}else{
                $("#maskoverlay").styleShow();
                var ai={}; ai.async=true;ai.selfbusy=false;ai.masked=true;ai.mask=true;ai.target=$("#_sweview");
		       // SiebelApp.S_App.uiStatus.Busy(ai);
				this._hourGlasssleep(ms).then(()=> {
					shOut=this._showStep(idx);
					//if($("#maskoverlay").css('display')=="block")
                        $("#maskoverlay").styleHide();
                        //SiebelApp.S_App.uiStatus.Free();
				});
			}			
			return shOut;
		},
		_showStep: function (idx) {
			var stepDirection = "";
			if (this.current_index !== null && this.current_index !== idx) {
				stepDirection = this.current_index < idx ? "forward" : "backward";
			}
			if(!this.options.showStepCb(idx, stepDirection)){
				/*if($("#maskoverlay").css('display')=="block")
					$("#maskoverlay").styleHide();*/
				return false;
			}
			if (!this.steps.eq(idx)) {
				/*if($("#maskoverlay").css('display')=="block")
					$("#maskoverlay").styleHide();*/
				return false;
			}
			if (idx == this.current_index) {
				/*if($("#maskoverlay").css('display')=="block")
					$("#maskoverlay").styleHide();*/
				return false;
			}
			if (this.steps.eq(idx).parent('li').hasClass('disabled') || this.steps.eq(idx).parent('li').hasClass('hidden')) {
				/*if($("#maskoverlay").css('display')=="block")
					$("#maskoverlay").styleHide();*/
				return false;
			}
			if (idx == this.current_index+1) {					
			   this._loadStepContent(idx);
			   /*if($("#maskoverlay").css('display')=="block")
					$("#maskoverlay").styleHide();*/
			}
			var allowNav = true;
			if (idx < this.current_index && allowNav == true) {
			   this._loadStepContent(idx);
			   /*if($("#maskoverlay").css('display')=="block")
					$("#maskoverlay").styleHide();*/
			}
			/*if (idx > this.current_index && allowNav == true) {
			   this._loadStepContent(idx);
			}*/
			if (this.current_index == undefined) {
			   this._loadStepContent(idx);
			}				
			return true;
        },
		_goToStep: function (idx) {
			//var tmpIdx = idx === 0 ? 0: idx - 1;			
			this.steps.eq(idx).parent('li').prevAll().addClass("done");
			this.steps.eq(idx).parent('li').addClass("active");
			//this._showStepWrapper(idx);
			$("#maskoverlay").styleShow();
			this._hourGlasssleep(30).then(()=> {
				this._loadStepContent(idx);	
				$("#maskoverlay").styleHide();
			});
		},
		_getStepIndex: function () {
			return this.current_index;
        },
        _disablePrevAnchorClick: function () {
			for (var i = 0; i < this.steps.length; i++) {
                if(this.steps.eq(i).parent('li').hasClass('done'))
                    this.steps.eq(i).parent('li').find('.nav-link').addClass('disabled');
            }
        },
        _enablePrevAnchorClick: function () {
			for (var i = 0; i < this.steps.length; i++) {
                if(this.steps.eq(i).parent('li').hasClass('done'))
                    this.steps.eq(i).parent('li').find('.nav-link').removeClass('disabled');
            }
		},
		_loadStepContent: function (idx) { 
				var mi = this;
				var curTab = this.steps.eq(this.current_index);
				var stepDirection = '';
				if (this.current_index !== null && this.current_index !== idx) {
					stepDirection = this.current_index < idx ? "forward" : "backward";
				}				
				if (this.current_index !== null && this._triggerEvent("leaveStep", [curTab, this.current_index, stepDirection]) === false) {
					return false;
				}				
				this._transitPage(idx);
				return true;
			
        },
		_transitPage: function (idx) {
            var mi = this;            
			var curTab = this.steps.eq(this.current_index);
            var curPage = curTab.length > 0 ? $(curTab.attr("vha-step"), this.main) : null;
            var selTab = this.steps.eq(idx);
            var selPage = selTab.length > 0 ? $(selTab.attr("vha-step"), this.main) : null;
            var stepDirection = '';
            if (this.current_index !== null && this.current_index !== idx) {
                stepDirection = this.current_index < idx ? "forward" : "backward";
            }

            var stepPosition = 'middle';
            if (idx === 0) {
                stepPosition = 'first';
            } else if (idx === this.steps.length - 1) {
                stepPosition = 'final';
            }

            this.options.transitionEffect = this.options.transitionEffect.toLowerCase();
            this.pages.finish();
            if (this.options.transitionEffect === 'slide') {
                // normal slide
                if (curPage && curPage.length > 0) {
                    curPage.slideUp('fast', this.options.transitionEasing, function () {
                        selPage.slideDown(mi.options.transitionSpeed, mi.options.transitionEasing);
                    });
                } else {
                    selPage.slideDown(this.options.transitionSpeed, this.options.transitionEasing);
                }
            } else if (this.options.transitionEffect === 'fade') {
                // normal fade
                if (curPage && curPage.length > 0) {
                    curPage.fadeOut('fast', this.options.transitionEasing, function () {
                        selPage.fadeIn('fast', mi.options.transitionEasing, function () {
                            $(this).show();
                        });
                    });
                } else {
                    selPage.fadeIn(this.options.transitionSpeed, this.options.transitionEasing, function () {
                        $(this).show();
                    });
                }
            } else {
                if (curPage && curPage.length > 0) {
                    curPage.hide();
                }
                selPage.show();
            }
            this._setAnchor(idx);
            this._setButtons(idx);
            this._fixHeight(idx);
            this.current_index = idx;
            this._triggerEvent("showStep", [selTab, this.current_index, stepDirection, stepPosition]);            
			return true;
        },
		_setAnchor: function (idx) {
            this.steps.eq(this.current_index).parent('li').removeClass("active");
            if (this.options.anchorSettings.markDoneStep !== false && this.current_index !== null) {
                this.steps.eq(this.current_index).parent('li').addClass("done");
                if (this.options.anchorSettings.removeDoneStepOnNavigateBack !== false) {
                    this.steps.eq(idx).parent('li').nextAll().removeClass("done");
                }
            }
            this.steps.eq(idx).parent('li').removeClass("done").addClass("active");
            return true;
        },
		_setButtons: function (idx) {
            if (!this.options.cycleSteps) {
                if (0 >= idx) {
                    $('.sw-btn-prev', this.main).addClass("disabled");
                } else {
                    $('.sw-btn-prev', this.main).removeClass("disabled");
                }
                if (this.steps.length - 1 <= idx) {
                    $('.sw-btn-next', this.main).addClass("disabled");
                } else {
                    $('.sw-btn-next', this.main).removeClass("disabled");
                }
			var custButton = this.options.toolbarSettings.toolbarExtraButtons;
			for(var i = 0; i<custButton.length; i++){
			 var custId = "";
			 var chkStep = custButton[i].stepNo.split(",").indexOf((idx).toString());
			 var custId = custButton[i].custId;
			 if(chkStep != -1){
				$('#'+custId).removeClass('forcehide');	 
			 }else{
				$('#'+custId).addClass('forcehide');	 
			 }
			 }			 
            }
            return true;
        },
		_fixHeight: function (idx) {
            if (this.options.autoAdjustHeight) {
                var selPage = this.steps.eq(idx).length > 0 ? $(this.steps.eq(idx).attr("vha-step"), this.main) : null;
                this.container.finish().animate({ minHeight: selPage.outerHeight() }, this.options.transitionSpeed, function () {});
            }
            return true;
        },
		_triggerEvent: function (name, params) {
            var e = $.Event(name);
            this.main.trigger(e, params);
            if (e.isDefaultPrevented()) {
                return false;
            }
            return e.result;
        },
		theme: function (v) {
            if (this.options.theme === v) {
                return false;
            }
            this.main.removeClass('sw-theme-' + this.options.theme);
            this.options.theme = v;
            this.main.addClass('sw-theme-' + this.options.theme);
            this._triggerEvent("themeChanged", [this.options.theme]);
        },
        next: function () {
            this._showNext();
        },
        prev: function () {
            this._showPrevious();
        },
		goToStep: function (stepNum) {
            this._goToStep(stepNum);
        },
		getStepIndex: function () {
            return this._getStepIndex();
        },
        disablePrevAnchorClick: function(){
            this._disablePrevAnchorClick();
        },
        enablePrevAnchorClick: function(){
            this._enablePrevAnchorClick();
        },
		resizeStep: function (stepNum) {
            this._fixHeight(stepNum);
        },
		reset: function () {
            if (this._triggerEvent("beginReset") === false) {
                return false;
            }
            this.container.stop(true);
            this.pages.stop(true);
            this.pages.hide();
            this.current_index = null;
            $(".sw-toolbar", this.main).remove();
            this.steps.removeClass();
            this.steps.parents('li').removeClass();
            this.steps.data('has-content', false);
            this.init();
            this._triggerEvent("endReset");
        },
		stepState: function (stepArray, state) {
            var mi = this;
            stepArray = $.isArray(stepArray) ? stepArray : [stepArray];
            var selSteps = $.grep(this.steps, function (n, i) {
                return $.inArray(i, stepArray) !== -1;
            });
            if (selSteps && selSteps.length > 0) {
                switch (state) {
                    case 'disable':
                        $(selSteps).parents('li').addClass('disabled');
                        break;
                    case 'enable':
                        $(selSteps).parents('li').removeClass('disabled');
                        break;
                    case 'hide':
                        $(selSteps).parents('li').addClass('hidden');
                        break;
                    case 'show':
                        $(selSteps).parents('li').removeClass('hidden');
                        break;
                    case 'error-on':
                        $(selSteps).parents('li').addClass('danger');
                        break;
                    case 'error-off':
                        $(selSteps).parents('li').removeClass('danger');
                        break;
                }
            }
        },
		_hourGlasssleep: function (ms){
			return new Promise(resolve => setTimeout(resolve, ms));
		}
	});
	$.fn.smartWizard = function (options) {
        var args = arguments;
        var instance;

        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, "smartWizard")) {
                    $.data(this, "smartWizard", new SmartWizard(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            instance = $.data(this[0], 'smartWizard');

            if (options === 'destroy') {
                $.data(this, 'smartWizard', null);
            }

            if (instance instanceof SmartWizard && typeof instance[options] === 'function') {
                return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            } else {
                return this;
            }
        }
    };
	
	
})(jQuery, window, document);