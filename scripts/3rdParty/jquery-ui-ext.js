/*
  This file is extension to jquery-ui.js, because of below issues in CKEditor plugin.
  jquery-ui.js Version 1.10.3 and below versions doesn't support CKEditor plugin completely.
  ISSUE 1:- Dropdowns in CKEditor(within Dialog Box) closes immediately in IE.
  ISSUE 2:- Dropdowns in CKEditor(within Dialog Box) loses content if user opens them more than once.
  So once new version of jquery-ui.js is available,if above issues get fixed, this file should be removed along with dependency from phyrenderer.js.
  Reference:- http://bugs.jqueryui.com/ticket/9087#comment:30
              http://bugs.jqueryui.com/ticket/9087#comment:27
              http://bugs.jqueryui.com/ticket/4727#comment:23
              http://dev.ckeditor.com/ticket/10269
*/

$.widget( "ui.dialog", $.ui.dialog, {
  _allowInteraction: function( event ) {
    var target = event ? $(event.target) : null ;
    if ( target.is('[id^="cke_"]') || target.closest('[id^="cke_"]').length ) {
      return true;
    }
    return this._super( event );
  },
  _moveToTop: function ( event, silent ) {
    if ( event && this.uiDialog.nextAll(":visible").find('iframe').is('[id^="cke_"]') ) {
      return ;
    }
    return this._super( event, silent );
  }
});

/*
  Keyboard navigation bug fix for "ui.menu" widget. This bug was effecting its child "ui.autocomplete" widget as well.
  ISSUE :-  Issues with keyboard navigation and scrolling when mouse over the menu
  Reference :- http://bugs.jqueryui.com/ticket/9356
               https://bug.oraclecorp.com/pls/bug/webbug_print.show?c_rptno=18233744  (Bug DB link of internal issue)
*/
$.widget("ui.menu", $.ui.menu, {
    _create: function () {
        this._super();
        var self = this,
            el = $(self.element, '.ui-menu-item');

        //remove the mouseenter event from the element
        //so we can register this event with bug fix
        self._off(el, 'mouseenter');
        self._on({
            "mouseenter .ui-menu-item": function (event) {
                var target = $(event.currentTarget),
                    preventConsecutiveEvents = $(self.element).data('preventConsecutiveEvents');

                target.siblings().children(".ui-state-active").removeClass("ui-state-active");
                // Remove ui-state-active class from siblings of the newly focused menu item
                // to avoid a jump caused by adjacent elements both having a class with a border
                if (!preventConsecutiveEvents) {
                    this.focus(event, target);
                }
            }
        });
    }
});

$.widget("ui.autocomplete", $.ui.autocomplete, {
    _create: function () {
        this._super();
        var self = this,
            lastSetTimeoutId;

        self._on({
            keydown: function (event) {
                var keyCode = $.ui.keyCode,
                    el;
                if (event.keyCode === keyCode.UP || event.keyCode === keyCode.DOWN) {
                    el = $(self.menu.element);
                    el.data('preventConsecutiveEvents', true);
                    clearTimeout(lastSetTimeoutId);
                    lastSetTimeoutId = setTimeout(function () {
                        el.data('preventConsecutiveEvents', false);
                        el = null;
                    }, 100);
                }
            }
        });
        self._on(self.menu.element,{
            menufocus: function (event, ui) {
                if (event.originalEvent && event.originalEvent.type.indexOf("mouse") > -1) {
                    var label = ui.item.data("ui-autocomplete-item").value;
                    if (label && $.trim(label).length) {
                        self.liveRegion.children().remove();
                        $("<div>").text(label).appendTo(self.liveRegion);
                    }
                }
            }

        });
    }
});

(function(){
    var origFilter = $.ui.autocomplete.filter;
        $.extend( $.ui.autocomplete, {
              filter: function( array, term ){
                        var enableLookAhead = utils.IsTrue(SiebelApp.S_App.GetEnableLookAhead()),
                        result,
                        matcher;
                        if(enableLookAhead) {
                            matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex(term), "i" );
                            result = $.grep( array, function(value) {
                                return matcher.test( value.label || value.value || value );
                            });
                      }
                      else {
                             result = origFilter.apply( this, arguments );
                      }
                      return result;
              }
        });
}());

/*
Following changes are made to hande left key press when a submenu is open.
Current behaviour: the uimenubar's handler collapses the parent menu.
fix: Ignore ui-menubar's left-key handler if event from submenu.
*/

$.widget( "ui.menu", $.ui.menu, {
    collapse: function( event ) {
        var newitem = this.active && this.active.parent().closest( ".ui-menu-item", this.element );
        jQuery.data(event.target,"submenuactive",!!(newitem && newitem.length));
        return this._super( event );
    }

});

$.widget( "ui.menubar",$.ui.menubar, {
    _left: function( event ) {
        if(jQuery.data(event.target,"submenuactive")===true){
            jQuery.removeData(event.target,"submenuactive");
            return;
        }
        return this._super( event );
    },
    _right: function( event ) {
        if (this.active.find(".ui-state-active").parent().find(".ui-menu").length) {
            return;
        }
       return this._super( event );
    }
});

$.widget( "ui.menubar", $.ui.menubar, {
    _create: function() {
        this._super();
        var that = this;

        this.items.next("ul")
            .menu({
                select: function( event, ui ) {
                    // don't close the menu if there is a submenu
                    if (event.originalEvent.pointerType === 'touch'
                        && event.originalEvent.target && $(event.originalEvent.target).next()
                        && $(event.originalEvent.target).next()[0] &&
                        ($(event.originalEvent.target).next()[0].tagName === 'UL'))
                        return;

                    ui.item.parents( "ul.ui-menu:last" ).hide();
                    that._close();
                    $(event.target).prev().trigger("focus");
                    that._trigger( "select", event, ui );
                }
            })
    }
});

$.fn.styleShow = function () {
    return this.each(function () {
        this.style.display = $(this).data("oldStyleShow") || "";
        $(this).removeData("oldStyleShow");
    });
};

$.fn.styleHide = function () {
    return this.each(function () {
        // Do something to each element here.
        if ($(this).data("oldStyleShow") || this.style.display === "none") {
            return;
        }
        $(this).data("oldStyleShow", this.style.display);
        this.style.display = "none";
    });
};

$.widget("ui.tabs", $.ui.tabs, {
    _isLocal: function() {
        var rhash = /#.*$/;

        return function( anchor ) {
            var anchorUrl, locationUrl;

            anchorUrl = anchor.href.replace( rhash, "" );
            locationUrl = location.href.replace( rhash, "" );

            // Decoding may throw an error if the URL isn't UTF-8 (#9518)
            try {
                anchorUrl = decodeURIComponent( anchorUrl );
            } catch ( error ) {}
            try {
                locationUrl = decodeURIComponent( locationUrl );
            } catch ( error ) {}

            return anchor.hash.length > 1 && ( anchorUrl === locationUrl || anchorUrl === document.baseURI );
        };
    }
});
(function(){
    if(!(window.matchMedia("(min-width: 481px)").matches)){
        $.widget( "ui.accordion", $.ui.accordion,{
            
            options: {
                active: 0,
                animate: {},
                classes: {
                    "ui-accordion-header": "ui-corner-top",
                    "ui-accordion-header-collapsed": "ui-corner-all",
                    "ui-accordion-content": "ui-corner-bottom"
                },
                collapsible: true,
                event: "click",
                header: "> li > :first-child, > :not(li):even",
                heightStyle: "auto",
                icons: {
                    activeHeader: (this.custom !== undefined) ? "" : "ui-icon-triangle-1-s",
                    header: (this.custom !== undefined) ? "" : "ui-icon-triangle-1-e"
                },
                // Callbacks
                activate: null,
                beforeActivate: null,
                custom: this.custom
            },
            _createIcons: function() {
                if(this.options.custom === undefined){
                    this._super();
                    return;
                }
                var icon, children,
                    icons = this.options.icons;
                if(SiebelApp.S_App.GetActiveView() && SiebelApp.S_App.GetActiveView().GetAppletArray().length > 1){
                    if ( icons ) {
                        icon = $( "<span>" );
                        this._addClass( icon, "ui-accordion-header-icon", "ui-icon " + icons.header );
                        icon.prependTo( this.headers );
                        children = this.active.children( ".ui-accordion-header-icon" );
                        this._removeClass( children, icons.header )
                            ._addClass( children, null, icons.activeHeader )
                            ._addClass( this.headers, "ui-accordion-icons" );
                    }
                }
            },
            _eventHandler: function( event ) {
                if(this.options.custom === undefined){
                    this._super(event);
                    return;
                }
                var activeChildren, clickedChildren,
                    options = this.options,
                    active = this.active,
                    clicked = $( event.currentTarget ),
                    clickedIsActive = clicked[ 0 ] === active[ 0 ],
                    collapsing = clickedIsActive && options.collapsible,
                    toShow = collapsing ? $() : clicked.next(),
                    toHide = active.next(),
                    eventData = {
                        oldHeader: active,
                        oldPanel: toHide,
                        newHeader: collapsing ? $() : clicked,
                        newPanel: toShow
                    };

                event.preventDefault();

                if (

                        // click on active header, but not collapsible
                        ( clickedIsActive && !options.collapsible ) ||

                        // allow canceling activation
                        ( this._trigger( "beforeActivate", event, eventData ) === false )  ||
                         (SiebelApp.S_App.GetActiveView() && SiebelApp.S_App.GetActiveView().GetAppletArray().length <= 1)
                        ) {
                    return;
                }

                options.active = collapsing ? false : this.headers.index( clicked );

                // When the call to ._toggle() comes after the class changes
                // it causes a very odd bug in IE 8 (see #6720)
                this.active = clickedIsActive ? $() : clicked;
                this._toggle( eventData );

                // Switch classes
                // corner classes on the previously active header stay after the animation
                this._removeClass( active, "ui-accordion-header-active", "ui-state-active" );
                if ( options.icons ) {
                    activeChildren = active.children( ".ui-accordion-header-icon" );
                    this._removeClass( activeChildren, null, options.icons.activeHeader )
                        ._addClass( activeChildren, null, options.icons.header );
                }

                if ( !clickedIsActive ) {
                    this._removeClass( clicked, "ui-accordion-header-collapsed" )
                        ._addClass( clicked, "ui-accordion-header-active", "ui-state-active" );
                    if ( options.icons ) {
                        clickedChildren = clicked.children( ".ui-accordion-header-icon" );
                        this._removeClass( clickedChildren, null, options.icons.header )
                            ._addClass( clickedChildren, null, options.icons.activeHeader );
                    }

                    this._addClass( clicked.next(), "ui-accordion-content-active" );
                }
                else{
                    this._removeClass(clicked, "ui-accordion-header-active")._addClass(clicked, "ui-accordion-header-collapsed");
                }
            }
            
        });
        
    }
}());