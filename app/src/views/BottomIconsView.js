define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');
    var Timer           = require('famous/utilities/Timer');

    function BottomIconsView() {
        View.apply(this, arguments);

        _createIcons.call(this);
    }

    BottomIconsView.prototype = Object.create(View.prototype);
    BottomIconsView.prototype.constructor = BottomIconsView;

    BottomIconsView.DEFAULT_OPTIONS = {
        size: null
    };

    function _createIcons() {
        this.modifier = new Modifier({
            size: this.options.size,
            origin: [0.5, 1]
        });
        this.container = this._add(this.modifier);

        var equalsIcon = new Surface({
            size: [40, 40],
            content: '<img height=40px width=40px src="content/images/bottomIcons/equals-icon.png"/>'
        });
        var equalsIconMod = new Modifier({
            origin: [0.05, 0.75]
        });
        this.container.add(equalsIconMod).add(equalsIcon);

        var middleIcon = new Surface({
            size: [100, 100],
            content: '<img height=100px width=100px src="content/images/bottomIcons/camera-icon.png"/>'
        });
        var middleIconMod = new Modifier({
            origin: [0.5, 0.5]
        });
        this.container.add(middleIconMod).add(middleIcon);

        var nextIcon = new Surface({
            size: [40, 40],
            content: '<img height=40px width=40px src="content/images/bottomIcons/next-icon.png"/>'
        });
        var nextIconMod = new Modifier({
            origin: [0.95, 0.75]
        });
        this.container.add(nextIconMod).add(nextIcon);
    }

    BottomIconsView.prototype.animateUp = function(multiplier) {
        this.modifier.setOrigin([0.5, 1], {duration: 600, curve: 'easeInOut'});
    }

    BottomIconsView.prototype.animateDown = function() {
        this.modifier.setOrigin([0.5, 2], {duration: 400});
    }

    module.exports = BottomIconsView;
});
