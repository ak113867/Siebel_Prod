//require js plugin to download third party js dependency files
(function () {
    define(function(){
        return {
            load: function (name, req, onload, config) {
                if(!$("script[src = \"' + name + '\"]").length) {
                    var script = document.createElement('script');
                    script.async = false;
                    script.src = name;
                    document.head.appendChild(script);
                    script.onload = function() {
                        onload();
                    }
                    script.onerror = function() {
                        var e = new Error( "Failed to download " + name + '\nhttp://requirejs.org/docs/errors.html#' );
                        e.requireType = name;
                        e.requireModules = name;
                        onload.error(e);
                    }
                    script = null;
                }
                else {
                    onload();
                }
            }
        };
    })
}());