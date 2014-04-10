define(function(require, exports, module) {
    var Surface              = require('famous/core/Surface');
    var Modifier             = require('famous/core/Modifier');
    var Transform            = require('famous/core/Transform');
    var View                 = require('famous/core/View');
    var Utility              = require('famous/utilities/Utility');
    var SequentialLayout     = require("famous/views/SequentialLayout");

    var TitleBannerView      = require('views/TitleBannerView');
    var TabBannerView        = require('views/TabBannerView');
    var AlbumView            = require('views/AlbumView');
    var BottomIconsView      = require('views/BottomIconsView');

    function AppView() {
        View.apply(this, arguments);

        _createLayout.call(this);
        _createTitleBanner.call(this);
        _createTabBanner.call(this);
        _createAlbumView.call(this);
        _createBottomIcons.call(this);

        _handleEvents.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    var albumSize = window.innerWidth / 3;

    AppView.DEFAULT_OPTIONS = {
        height: window.innerHeight,
        width: window.innerWidth,
        albumSize: [albumSize, albumSize],
        bannerHeight: 50,
        bottomIconsHeight: 110
    };

    //creates layout to store: title banner | selection tab | album view
    function _createLayout() {
        this.views = [];
        this.sequentialLayout = new SequentialLayout({
            direction: Utility.Direction.Y
        });
        this.sequentialLayout.sequenceFrom(this.views);
        this._add(this.sequentialLayout);
    }

    function _createTitleBanner() {
        this.titleBanner = new TitleBannerView({
            size: [this.options.width, this.options.bannerHeight]
        });

        this.views.push(this.titleBanner);
    }

    function _createTabBanner() {
        this.tabBanner = new TabBannerView({
            height: this.options.bannerHeight,
            width: this.options.width
        });

        this.views.push(this.tabBanner);
    }

    function _createAlbumView() {
        this.albumView = new AlbumView({
            height: this.options.height - 2 * this.options.bannerHeight,
            width: this.options.width,
            albumSize: this.options.albumSize
        });

        this.views.push(this.albumView);
    }

    function _createBottomIcons() {
        this.bottomIcons = new BottomIconsView({
            size: [this.options.width, this.options.bottomIconsHeight]
        });

        this._add(this.bottomIcons);
    }

    function _handleEvents() {
        this.albumView.on('displayBottomIcons', function(data) {
            this.bottomIcons.animateUp();
        }.bind(this));

        this.albumView.on('hideBottomIcons', function(data) {
            this.bottomIcons.animateDown();
        }.bind(this));

    }

    module.exports = AppView;
});