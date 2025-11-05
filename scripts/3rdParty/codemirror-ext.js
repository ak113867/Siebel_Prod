(function () {
    var orig = CodeMirror.hint.html;
    CodeMirror.hint.html = function (editor) {
        var inner = orig(editor) || { from: editor.getCursor(), to: editor.getCursor(), list: [] },
        cursor = editor.getCursor(),
        currentLine = editor.getLine(cursor.line),
        start = cursor.ch,
        end = start;
        inner.list.push("od-type",
          "od-include",
          "od-property",
          "od-switch",
          "od-default",
          "od-if",
          "od-case",
          "od-context",
          "od-prefix",
          "od-iterator",
          "od-id",
          "od-name",
          "od-attr"
        );
        while (end < currentLine.length && /[\w$]+/.test(currentLine.charAt(end))) {
            ++end;
        }
        while (start && /[\w$]+/.test(currentLine.charAt(start - 1))) {
            --start;
        }

        var curWord = start !== end && currentLine.slice(start, end),
        regex = new RegExp('^' + curWord, 'i'),
        result = {
            list: (!curWord ? inner.list : inner.list.filter(function (item) {
                return item.match(regex);
            })).sort(),
            from: CodeMirror.Pos(cursor.line, start),
            to: CodeMirror.Pos(cursor.line, end)
        };
        return result;
    };
})();



(function (mod) {
    if (typeof exports === "object" && typeof module === "object") { // CommonJS
        mod(require("../../lib/codemirror"), require("../../addon/edit/closetag.js"));
    }
    else if (typeof define === "function" && define.amd) { // AMD
        define(["../../lib/codemirror", "../../addon/edit/closetag.js"], mod);
    }
    else { // Plain browser env
        mod(CodeMirror);
    }
})(function (CodeMirror) {

    CodeMirror.defineOption("addODCloseComments", false, function (cm, val, old) {
        if (old !== CodeMirror.Init && old) {
            cm.removeKeyMap("addODCloseComments");
        }
        if (!val) {
            return;
        }
        var map = { name: "addODCloseComments" };
        map.Enter = function (cm) {
            return addODCloseComments(cm, true);
        };
        var origCloseTag = cm.state.keyMaps[0]["'>'"];
        map["'>'"] = function (cm) {
            var origsel = cm.listSelections().slice(0);
            var retVal = origCloseTag(cm);
            var modsel = cm.listSelections().slice(0);// now the focus is on the line next of the closed tag so putting the foxus back to get the data;
            cm.setSelections(origsel);
            addODCloseComments(cm);
            cm.setSelections(modsel);// set focus back to what ever was set before.
            return retVal;
        };
        cm.addKeyMap(map);
    });
    var inspectAttrValArr = [
            "od-type"
        ],
        attrValMap = {
            "AppMenu": "frame",
            "Viewbar": "frame",
            "Toolbar": "frame",
            "Threadbar": "frame",
            "Screenbar": "frame",
            "Content": "frame",
            "View": "frame",
            "AltView": "frame",
            "Applet": "frame",
            "Page": "frame"
        },
        attrNameMap = {
            "od-switch": "switch",
            "od-default": "default",
            "od-if": "if",
            "od-case": "case",
            "od-iterator": "iterator"
        },
        commentTemplate = "<!--od section %1 close-->";

    function addODCloseComments(cm, closetag) {
        var bAddText = false;
        if (!cm.getOption("disableInput")) {
            var ranges = cm.listSelections(),
                replacements = [];
            for (var i = 0, len = ranges.length; i < len; i++) {
                if (!ranges[i].empty()) {
                    return CodeMirror.Pass;
                }
                var pos = ranges[i].head,
                    line = pos.line,
                    tokenArray = cm.getLineTokens(line),
                    tok = getTagToken.call(this, tokenArray);
                if (tok) {
                    var inner = CodeMirror.innerMode(cm.getMode(), tok.state),
                        state = inner.state;
                    if (inner.mode.name !== "xml" || !state.tagName) {
                        break;
                    }

                    var tagName = state.tagName;
                    if (tok.end > pos.ch) {
                        tagName = tagName.slice(0, tagName.length - tok.end + pos.ch);
                    }
                    var lowerTagName = tagName.toLowerCase();
                    // Don't process the '>' at the end of an end-tag or self-closing tag
                    if (!tagName ||
                        lowerTagName !== "div" ||
                        (tokenArray[tokenArray.length - 1].string === "/>")
                    ) {
                        break;
                    }
                    var comment = getComment.call(this, tokenArray),
                        closingTagPos = getClosingTagPos.call(this, cm, tagName, pos, state, true),
                        text;
                    if (comment) {
                        if (!closingTagPos && closetag) {
                            text = comment + "\n</div>\n";
                            closetag = true;
                            closingTagPos = CodeMirror.Pos(pos.line + 1, 0);
                            // no closing tag .. prob copy pasted the line
                        } else {
                            closetag = false;
                            text = comment + "\n";
                        }
                        if (!doesCommentAlreadyExist.call(this, cm, closingTagPos, tokenArray, comment)) {
                            replacements[i] = {
                                text: text,
                                newPos: CodeMirror.Pos(closingTagPos.line, 0),
                                closetag: closetag
                            };
                            bAddText = true;
                        }
                    } else {
                        break;
                    }
                }
            }
            if (bAddText) {
                addText.call(this, ranges, replacements, cm);
            }
        }
        return CodeMirror.Pass;// this is so that the default functionlity of "enter" continues

    }

    function doesCommentAlreadyExist(cm, closingTagPos, tokenArray, comment) {
        var retVal = false;
        if (closingTagPos) {
            if (!comment) {
                comment = getComment.call(this, tokenArray);
            }
            var lineNo = closingTagPos.line - 1;
            if (comment === cm.getLine(lineNo).trim()) {
                retVal = true;
            }
        }
        return retVal;
    }

    function getClosingTagPos(cm, tagName, pos, state, newTag) {// copy pasted from closetag.js!!!!
        if (!CodeMirror.scanForClosingTag) {
            return false;
        }
        var end = Math.min(cm.lastLine() + 1, pos.line + 500);
        var nextClose = CodeMirror.scanForClosingTag(cm, pos, null, end);
        if (!nextClose || nextClose.tag !== tagName) {
            return false;
        }
        var cx = state.context;
        // If the immediate wrapping context contains onCx instances of
        // the same tag, a closing tag only exists if there are at least
        // that many closing tags of that type following.
        for (var onCx = newTag ? 1 : 0; cx && cx.tagName === tagName; cx = cx.prev) {
            ++onCx;
        }
        pos = nextClose.to;
        for (var i = 1; i < onCx; i++) {
            var next = CodeMirror.scanForClosingTag(cm, pos, null, end);
            if (!next || next.tag !== tagName) {
                return false;
            }
            pos = next.to;
        }
        return nextClose.to;//except this line
    }


    function addText(ranges, replacements, cm) {
        for (var i = ranges.length - 1; i >= 0; i--) {
            var info = replacements[i];
            cm.replaceRange(info.text, info.newPos, info.newPos, "+insert");
            var sel = cm.listSelections().slice(0);
            sel[i] = ranges[i];
            cm.setSelections(sel);
            cm.indentLine(info.newPos.line, null, true);
            if (info.closetag) {
                cm.indentLine(info.newPos.line + 1, null, true);
            }
        }
    }

    function getTagToken(lineTokenArray) {
        var retVal;
        for (var i = 0, len = lineTokenArray.length; i < len; i++) {
            if (lineTokenArray[i].type === "tag") {
                retVal = lineTokenArray[i];
                break;
            }
        }
        return retVal;
    }
    function getComment(lineTokenArray) {
        var retVal = "",
            eachObj,
            bArributeVal = "";
        for (var i = 0, len = lineTokenArray.length; i < len; i++) {
            eachObj = lineTokenArray[i];
            if (eachObj.type === "attribute") {
                if (inspectAttrValArr.indexOf(eachObj.string) > -1) {
                    bArributeVal = true;
                } else if (attrNameMap[eachObj.string]) {
                    retVal = commentTemplate.replace("%1", attrNameMap[eachObj.string]);
                    break;
                }
            }
            if (bArributeVal && eachObj.type === "string") {
                var attrVal = eachObj.string.replace(/[\"\']/g, "");
                retVal = commentTemplate.replace("%1", attrValMap[attrVal] || attrVal);
                break;
            }
        }
        return retVal;
    }
});