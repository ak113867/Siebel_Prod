var SuppressPopup = new MutationObserver(function (SuppressAttachmentPopups) {
    SuppressAttachmentPopups.forEach(function (SuppressAttachmentPopup) {
        var popupcheck = SuppressAttachmentPopup.addedNodes;
        if (popupcheck !== null) {
            var $nodes = $(popupcheck);
            $nodes.each(function () {
                var $node = $(this);
                var downloadDialog = $(this).attr('aria-describedby') == "downloadFileChooseDialog";
                if (downloadDialog) {
                    $node.on("dialogopen", function (event, ui) {
                        $(event.target).parent().hide();
                        $("div.ui-widget-overlay").hide()
                        setTimeout(function () { 
                                $(event.target).parent().find("#downloadButton").click()
                        }, 0);
                    });
                    $node.hide();
                    $("div.ui-widget-overlay").hide();
                    setTimeout(function () {
                            $node.find("#downloadButton").click()
                    }, 0);
                }
            });
        }
    });
});
var config = {
    attributes: true,
    childList: true,
    characterData: true
};
var target = $("body")[0];
SuppressPopup.observe(target, config);