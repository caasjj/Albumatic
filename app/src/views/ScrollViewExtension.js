define(function(require, exports, module) {
    var ScrollView       = require('famous/views/Scrollview');
    var FamousEngine     = require('famous/core/Engine');

    function ScrollViewExtension() {
        ScrollView.apply(this, arguments);

        _monitorOffsets.call(this);
    }

    ScrollViewExtension.prototype = Object.create(ScrollView.prototype);
    ScrollViewExtension.prototype.constructor = ScrollViewExtension;

    ScrollViewExtension.DEFAULT_OPTIONS = {};

    var displayed = {};
    function _monitorOffsets() {
        FamousEngine.on('prerender', function(){
            
            var newDisplay = {};
            var node = this._node.getPrevious() || this._node;

            for (var i = node.index; i < node.index + 7; i++) {
                newDisplay[i] = true;
                if(!displayed[i] && node._.array[i]) {
                    //new item --> animate
                    node._.array[i].rowView.animateIn();
                }
            }

            //reset items that have left viewport
            for(var row in displayed) {
                if(!(row in newDisplay) && node._.array[row]) {
                   node._.array[row].rowView.reset();
                }
            }

            displayed = newDisplay;

        }.bind(this));
    }

    module.exports = ScrollViewExtension;
});