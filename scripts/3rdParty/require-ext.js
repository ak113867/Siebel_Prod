if (typeof (define) === "function") {
    // Keep a reference of the original define method.
    var requirejsDefine = define;
    require.s.contexts._.config.baseUrl = SIEBEL_BUILD;
    // Redefine define!
    define = function (name, deps, callback) {
        var extname = name,
            extdeps = deps,
            extcallback = callback;

        //Allow for anonymous modules
        if (typeof extname !== 'string') {
            //Adjust args appropriately
            extcallback = extdeps;
            extdeps = extname;
            extname = null;
        }

        //This module may not have dependencies
        if (!(extdeps instanceof Array)) {
            extcallback = extdeps;
            extdeps = null;
        }

        if (extdeps && extdeps instanceof Array && extdeps.length > 0) {
            // Dependencies have been declared.
            // Loop through them and categorize into siebel & non siebel entities.
            var entity,
                depfiles = [],
                cacheQuery = require.s.contexts._.config.urlArgs ?  require.s.contexts._.config.urlArgs( null, "") : '';

            for (var arrCount = 0; arrCount < extdeps.length; arrCount++) {
                entity = "" + extdeps[arrCount];
                if ($.trim(entity).indexOf("http") !== 0 && entity.search(/(\.js$)|(\.js\?.*)/i) !== -1) {
                    // 3rd party dependency. Let the requirejs plugin 'async' handle the download
                    depfiles.push("3rdParty/async!" + SIEBEL_BUILD + entity + cacheQuery);
                }
                else {
                    // Internal dependency. Add to internal array.
                    depfiles.push(entity);
                }
            }

            // Segeregation complete. Call for sequenced download of  files.
            return requirejsDefine(extname, depfiles, extcallback);
        }
        else {
            // If no dependencies are found, call the original define with the original arguements.
            return requirejsDefine.apply(this, arguments );
        }
    };

    // Helper method for downloading dependencies.
    function SiebelRequire(fileArray, extname, depfiles, extcallback) {
        var cacheQuery = require.s.contexts._.config.urlArgs ? require.s.contexts._.config.urlArgs(null, "") : '',
            len = fileArray.length;

        if (len) {
            var index = fileArray.indexOf("siebel/offline/dmtoolbarpmodel")
            if (index > -1) {
                fileArray.splice(index, 1);
            }
            len = fileArray.length;
            for (var i = 0; i < len; i++) {
                var name = fileArray[i],
                    script = document.createElement('script');
                script.async = false;
                script.src = SIEBEL_BUILD + name + ".js" + cacheQuery;
                document.head.appendChild(script);
                if (i === len - 1) {
                    script.onload = script.onerror = function () {
                        require( null, function(){});
                        require.exec("for(var reg in contexts['_'].registry){if(contexts['_'].registry.hasOwnProperty(reg)){contexts['_'].registry[reg].enable();} useInteractive = true;}");
                        var _waitCount = 60;
                        var clearTimeoutId = setInterval(function () {
                            if (_waitCount-- !== 0) {
                                for (var key in require.s.contexts._.registry) {
                                    if (require.s.contexts._.registry.hasOwnProperty(key)) {
                                        return;
                                    }
                                }
                            }
                            clearInterval( clearTimeoutId);
                            extname ? requirejsDefine(extname, depfiles, extcallback) : require(depfiles, extcallback, null, null);
                        }, 250 );
                    };
                }
                script = null;
            }
        }
        else {
            return extname ? requirejsDefine(extname, depfiles, extcallback) : require(depfiles, extcallback, null, null);
        }
    }
}