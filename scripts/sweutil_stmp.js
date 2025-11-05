// SITEMAP SEARCH FIELD
function os_sitemapFilter() {

    var activeFilter = false;
    var allAtags;

    if (SiebelApp.Utils.IsTrue(SiebelApp.S_App.IsAutoOn())) {
        $("#sitemapFilterInput").attr({
            ot: "JText",
            rn: "sitemapFilter"
        });
    }

    $('#filterReset').click(function (event) {
        $('#sitemapFilterInput').val('').keyup();
    });

    $('#sitemapFilterInput').keyup(function () {

        var filterStr = $(this).val();
        var filterRegexp = new RegExp(filterStr, "i");

        if (filterStr != '' && filterStr.length > 0) {
            $(this).addClass('siebui-filtered');
            $('#filterReset').css('display', 'inline-block');
        } else {
            $(this).removeClass('siebui-filtered');
            $('#filterReset').hide();
        }

        if (filterStr != '' && filterStr.length > 2) {
            if (!activeFilter) {
                activeFilter = true;
                allAtags = $('.siebui-sitemap-main span a');
                $('.siebui-sitemap-index-section').hide();
                $('.siebui-sitemap-main > a').hide();
                $('#filterResultCount').text('');
                $('.siebui-filter-result').show();
                $('.sitemapPage').addClass('siebui-filtered');
            }

            $('.siebui-sitemap-main li:visible').hide();

            var filterCount = 0;
            allAtags.each(function (index) {

                if ($(this).text().match(filterRegexp)) {

                    filterCount++;
                    $(this).parentsUntil('.siebui-sitemap-main', 'li').show();

                }

            });

            $('#filterResultCount').text(filterCount);

        }
        else {
            $('.sitemapPage').removeClass('siebui-filtered');
            $('.siebui-sitemap-index-section').show();
            $('.siebui-sitemap-main li').show();
            $('.siebui-sitemap-main > a').show();
            $('.siebui-filter-result').hide();
            activeFilter = false;
            allAtags = null;
        }

    });

    setTimeout(function () { $('#sitemapFilterInput').focus(); }, 1000);
    $("#sitemapFilterInput").attr("role", "search");
    $('a[name=top]').attr("onclick", "return false;");
};

if (IsOpenUI()) {
    if (SiebelApp.S_App.IsMobileApplication() === "true") {
        var SitemapPage = $(document).find("div.siebui-sitemap-page");
        if (SitemapPage.length > 0) {
            $("#_sweclient").addClass("siebui-showing-sitemap");
        }
    }
    else {
        os_sitemapFilter();
    }
    $("#_sweview").addClass("siebui-view-sitemap");
}
// SITEMAP SEARCH FIELD


// for site map 
function SWEGotoAnchor(anchorName, target) {
    var frameObj;
    var anchor;
    var i;
    var offsetTop, offsetParent;

    if (target == null || target == "")
        frameObj = this;
    else
        frameObj = SWEFindFrame(top, target);

    if (frameObj != null) {
        anchor = document.all ? frameObj.document.all(anchorName) : frameObj.document.anchors[anchorName];
        if (IsOpenUI()) {
            anchor = anchor || $('a[name=' + anchorName + ']', frameObj.document).eq(0) || $("a#" + anchorName, frameObj.document).eq(0);
            if (anchor) {
                //var container = $( "#_svf0" );
                var container;
                //var container = $("#_sweclient");
                if (SiebelApp.S_App.IsRwd()) {
                    container = $("#" + SiebelApp.S_App.ViewTarget());   //For RWD: Removed the hardcoding of SiebMainView.  Getting it via curry_accessor
                }
                else {
                    container = $("#_sweview");
                }

                container.scrollTop($(anchor).offset().top - container.offset().top + +container.scrollTop());
                anchor.focus();
            }
            return;
        }
        if (anchor != null) {
            /* if (SWEIsHighInteract && App().IsRecording())
             {  
                var pset = top._swescript.CCFMiscUtil_CreatePropSet ();
                pset.SetProperty("Anchor", anchor.innerHTML);
                App().FireRecorderEvent ("SiteMap", "GoToSiteMapAnchor", 0, 0, "", pset);
             }*/

            if (document.all) // IE
            {
                offsetTop = anchor.offsetTop;
                offsetParent = anchor.offsetParent
                while (offsetParent != null) {
                    offsetTop += offsetParent.offsetTop;
                    offsetParent = offsetParent.offsetParent;
                }
                frameObj.scrollTo(0, offsetTop);
            }
            else if (document.layers) //NS 4.7x
            {
                frameObj.scrollTo(0, anchor.y - 10);
            }
            else //NS 6.x
            {
                offsetTop = anchor.offsetTop;
                offsetParent = anchor.offsetParent
                while (offsetParent != null) {
                    offsetTop += offsetParent.offsetTop;
                    offsetParent = offsetParent.offsetParent;
                }
                frameObj.scrollTo(0, offsetTop - 13);
            }
        }
        anchor.focus();
    }
}

// For HI use only to navigate to a view and also update the screen.
// bAddView is true if using a common URL to all links and view has to be appended
function SWEGotoPageTab(scrnTab, target, bAddView) {
    // this function call will have the effect to set the active screen   

    // Add the view name to the common piece of URL first
    if (bAddView == true)
        scrnTab.url += URLEncode(scrnTab.view);

    if (SWEIsHighInteract) {
        /*if (App().IsRecording())
        {  
           var uiTp="View";
           var pset = top._swescript.CCFMiscUtil_CreatePropSet ();
           pset.SetProperty("View", scrnTab.view);
  
           if (bAddView == true)
              pset.SetProperty("View", scrnTab.view);
           else
           {
              pset.SetProperty("Screen", scrnTab.name);
              uiTp = "Screen";
           }
  
           App().FireRecorderEvent ("SiteMap", "GoToSiteMapItem", 0, 0, uiTp, pset);
        }
  
        Top().JSSFireEvent("SetScreen",scrnTab);*/
        App().GotoView(scrnTab.view, scrnTab.viewid, scrnTab.url, target);
    }
    else {
        //LI App may still have jumptabs if browser support jumptabs
        if (top.SWEJumpTabEnabled) {
            var objFrame = SWEFindFrame(top, "_swescrnbar");
            if (objFrame != null)
                objFrame.st_scrn(scrnTab.name, -1, scrnTab);
        }
        SWETargetGotoURL(scrnTab.url, target);
    }
}
