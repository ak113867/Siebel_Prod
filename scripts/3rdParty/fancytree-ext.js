$.ui.fancytree._FancytreeNodeClass.prototype.fixSelection3FromEndNodes = function(){

    //this.debug("fixSelection3FromEndNodes()");
    //_assert(this.tree.options.selectMode === 3, "expected selectMode 3");

    // Visit all end nodes and adjust their parent's `selected` and `partsel`
    // attributes. Return selection state true, false, or undefined.
    function _walk(node){
        var i, l, child, s, state, allSelected,someSelected,
            children = node.children;

        if( children && children.length ){
            // check all children recursively
            allSelected = true;
            someSelected = !!node.selected;//swnagesw  line chnaged from ori

            for( i=0, l=children.length; i<l; i++ ){
                child = children[i];
                // the selection state of a node is not relevant; we need the end-nodes
                s = _walk(child);
                if( s !== false ) {
                    someSelected = true;
                }
                if( s !== true ) {
                    allSelected = false;
                }
            }
            state = allSelected ? true : (someSelected ? undefined : false);
        }else{
            // This is an end-node: simply report the status
    //                state = ( node.unselectable ) ? undefined : !!node.selected;
            state = !!node.selected;
        }
        node._changeSelectStatusAttrs(state);
        return state;
    }
    _walk(this);

    // Update parent's state
    this.visitParents(function(node){
        var i, l, child, state,
            children = node.children,
            allSelected = true,
            someSelected = !!node.selected;//swnagesw  line chnaged from ori

        for( i=0, l=children.length; i<l; i++ ){
            child = children[i];
            // When fixing the parents, we trust the sibling status (i.e.
            // we don't recurse)
            if( child.selected || child.partsel ) {
                someSelected = true;
            }
            if( !child.unselectable && !child.selected ) {
                allSelected = false;
            }
        }
        state = allSelected ? true : (someSelected ? undefined : false);
        node._changeSelectStatusAttrs(state);
    });
};

$.ui.fancytree._FancytreeNodeClass.prototype._changeSelectStatusAttrs = function(state){
    var changed = false;

        switch(state){
        case false:
            changed = ( this.selected || this.partsel );
            this.selected = false;
            this.partsel = false;
            break;
        case true:
            changed = ( !this.selected || this.partsel );//swnagesw line changed from  ori
            this.selected = true;
            this.partsel = false;//swnagesw line changed from  ori
            break;
        case undefined:
            changed = ( !this.selected || !this.partsel );//swnagesw line changed from  ori
            this.selected = true;//swnagesw line changed from  ori
            this.partsel = true;
            break;
        default:
            //_assert(false, "invalid state: " + state);
        }
        // this.debug("fixSelection3AfterLoad() _changeSelectStatusAttrs()", state, changed);
        if( changed ){
            this.renderStatus();
        }
    return changed;
}