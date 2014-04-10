define(function(require, exports, module) {
    var Surface              = require('famous/core/Surface');
    var Modifier             = require('famous/core/Modifier');
    var Transform            = require('famous/core/Transform');
    var View                 = require('famous/core/View');

    function TitleBannerView() {
        View.apply(this, arguments);

        _createBanner.call(this);
    }

    TitleBannerView.prototype = Object.create(View.prototype);
    TitleBannerView.prototype.constructor = TitleBannerView;

    TitleBannerView.DEFAULT_OPTIONS = {
        size: null
    };

    function _createBanner() {
        var textContent  = '<div class="bannerTitle">Typography</div>';

        var textSurf = new Surface({
            classes: ['banner'],
            size: this.options.size,
            content: textContent
        });
        this._add(textSurf);

        var iconContent = '<img height=30px width=35px src="content/images/arrow.png">';
        var iconSurf = new Surface({
            classes: ['arrowIcon'],
            content: iconContent,
            size: [30, 35],
            properties: {
                color: 'blue'
            }
        });
        this._add(iconSurf);
    }

    module.exports = TitleBannerView;
});
