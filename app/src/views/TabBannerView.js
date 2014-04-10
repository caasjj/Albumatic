define(function(require, exports, module) {
    var Surface              = require('famous/core/Surface');
    var Modifier             = require('famous/core/Modifier');
    var Transform            = require('famous/core/Transform');
    var View                 = require('famous/core/View');
    var SequentialLayout     = require("famous/views/SequentialLayout");

    function TabBannerView() {
        View.apply(this, arguments);

        _createBanner.call(this);
    }

    TabBannerView.prototype = Object.create(View.prototype);
    TabBannerView.prototype.constructor = TabBannerView;

    TabBannerView.DEFAULT_OPTIONS = {
        width: null,
        height: null
    };

    function _createBanner() {
        var sequentialLayout = new SequentialLayout({
            direction: 0
        });
        var surfs = [];
        sequentialLayout.sequenceFrom(surfs);
        this._add(sequentialLayout);


        var leftSurf = new Surface({
            classes: ['tabBanner', 'tabLeft'],
            content: '29 Photos',
            size: [this.options.width / 2, this.options.height]
        });
        surfs.push(leftSurf);

        var rightSurf = new Surface({
            classes: ['tabBanner', 'tabRight'],
            content: '10 Joined',
            size: [this.options.width / 2, this.options.height]
        });
        surfs.push(rightSurf);
    }

    module.exports = TabBannerView;
});