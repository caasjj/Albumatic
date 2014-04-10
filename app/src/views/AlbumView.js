define(function(require, exports, module) {
    var Surface              = require('famous/core/Surface');
    var Modifier             = require('famous/core/Modifier');
    var Transform            = require('famous/core/Transform');
    var View                 = require('famous/core/View');
    var ScrollView           = require('famous/views/Scrollview');
    var SequentialLayout     = require("famous/views/SequentialLayout");
    var Transitionable       = require('famous/transitions/Transitionable');
    var GenericSync          = require('famous/inputs/GenericSync');

    var ScrollViewExtension  = require('views/ScrollViewExtension');
    var RowView              = require('views/RowView');
    var ContainerSurface     = require("famous/surfaces/ContainerSurface");

    function AlbumView() {
        View.apply(this, arguments);

        this.bottomIconsDisplayed = true;
        this.touched = false; //keeps track of whether scroll view is touched
        _createContent.call(this);
    }

    AlbumView.prototype = Object.create(View.prototype);
    AlbumView.prototype.constructor = AlbumView;

    AlbumView.prototype.render =  function() {
        if (!this.scrollView.getVelocity() && !this.bottomIconsDisplayed && !this.touched) { //scroll view stopped
            this.bottomIconsDisplayed = true;
            this._eventOutput.emit('displayBottomIcons');
        }
        return this._node.render.apply(this._node, arguments);
    };

    AlbumView.DEFAULT_OPTIONS = {
        height: null,
        width: null,
        albumSize: null
    };

    function _createContent() {
        this.scrollView = new ScrollViewExtension({
            margin: 100000000
        });

        this.scrollView.on('start', function() {
            this._eventOutput.emit('hideBottomIcons');
            this.bottomIconsDisplayed = false;
            this.touched = true;
        }.bind(this));

        this.scrollView.on('end', function() {
            this.touched = false;
        }.bind(this));

        var views = [];
        this.scrollView.sequenceFrom(views);

        var rowView;
        this.rowViews = []; //maintain reference to rowViews for animation
        var count = 0;
        for(var row = 0; row < albumIcons.length; row++) {
            // seqView = _createRow.call(this);
            rowView = new RowView({
                albumSize: this.options.albumSize,
                scrollView: this.scrollView,
                count: count,
                albumIcons: getAlbumIcons(row)
            });
            this.rowViews.push(rowView);

            views.push(rowView.sequentialLayout);
            count += 3;
        }

        //Create a container for the scroll view
        this.container = new ContainerSurface({
            classes: ['albumScrollContainer'],
            size: [this.options.width, this.options.height],
            properties:{
                overflow: 'hidden'
            }
        });
        this.container.add(this.scrollView);
        this._add(this.container);
    }

    var albumIcons = [
            ["content/images/what.png", "content/images/sixties.png", "content/images/antiques.png"],
            ["content/images/letters.png", "content/images/sidewalk.png", "content/images/amazing.png"],
            ["content/images/shhh.png", "content/images/shi.png", "content/images/skinnyshit.png"],
            ["content/images/lies.png", "content/images/physics.png", "content/images/rocketscience.png"],
            ["content/images/rocket.png", "content/images/quickbrownfox.png", "content/images/tees.png"],
            ["content/images/tolberts.png", "content/images/seatbelt.png", "content/images/upsidedown.png"],
            ["content/images/easymoney.png", "content/images/consetta.png", "content/images/notebook.png"],
            ["content/images/yolo.png", "content/images/shhh.png", "content/images/twizzlers.png"],
            ["content/images/washington.png", "content/images/nerf.png", "content/images/twizzlers.png"],
            ["content/images/what.png", "content/images/sixties.png", "content/images/antiques.png"],
            ["content/images/letters.png", "content/images/sidewalk.png", "content/images/amazing.png"],
            ["content/images/shhh.png", "content/images/shi.png", "content/images/skinnyshit.png"],
            ["content/images/lies.png", "content/images/physics.png", "content/images/rocketscience.png"],
            ["content/images/rocket.png", "content/images/quickbrownfox.png", "content/images/tees.png"],
            ["content/images/tolberts.png", "content/images/seatbelt.png", "content/images/upsidedown.png"],
            ["content/images/easymoney.png", "content/images/consetta.png", "content/images/notebook.png"],
            ["content/images/yolo.png", "content/images/shhh.png", "content/images/twizzlers.png"],
            ["content/images/washington.png", "content/images/nerf.png", "content/images/twizzlers.png"],
            ["content/images/what.png", "content/images/sixties.png", "content/images/antiques.png"],
            ["content/images/letters.png", "content/images/sidewalk.png", "content/images/amazing.png"],
            ["content/images/shhh.png", "content/images/shi.png", "content/images/skinnyshit.png"],
            ["content/images/lies.png", "content/images/physics.png", "content/images/rocketscience.png"],
            ["content/images/rocket.png", "content/images/quickbrownfox.png", "content/images/tees.png"],
            ["content/images/tolberts.png", "content/images/seatbelt.png", "content/images/upsidedown.png"],
            ["content/images/easymoney.png", "content/images/consetta.png", "content/images/notebook.png"],
            ["content/images/yolo.png", "content/images/shhh.png", "content/images/twizzlers.png"],
            ["content/images/washington.png", "content/images/nerf.png", "content/images/twizzlers.png"],
            ["content/images/what.png", "content/images/sixties.png", "content/images/antiques.png"],
            ["content/images/letters.png", "content/images/sidewalk.png", "content/images/amazing.png"],
            ["content/images/shhh.png", "content/images/shi.png", "content/images/skinnyshit.png"],
            ["content/images/lies.png", "content/images/physics.png", "content/images/rocketscience.png"],
            ["content/images/rocket.png", "content/images/quickbrownfox.png", "content/images/tees.png"],
            ["content/images/tolberts.png", "content/images/seatbelt.png", "content/images/upsidedown.png"],
            ["content/images/easymoney.png", "content/images/consetta.png", "content/images/notebook.png"],
            ["content/images/yolo.png", "content/images/shhh.png", "content/images/twizzlers.png"],
            ["content/images/washington.png", "content/images/nerf.png", "content/images/twizzlers.png"],
            ["content/images/what.png", "content/images/sixties.png", "content/images/antiques.png"],
            ["content/images/letters.png", "content/images/sidewalk.png", "content/images/amazing.png"],
            ["content/images/shhh.png", "content/images/shi.png", "content/images/skinnyshit.png"],
            ["content/images/lies.png", "content/images/physics.png", "content/images/rocketscience.png"],
            ["content/images/rocket.png", "content/images/quickbrownfox.png", "content/images/tees.png"],
            ["content/images/tolberts.png", "content/images/seatbelt.png", "content/images/upsidedown.png"],
            ["content/images/easymoney.png", "content/images/consetta.png", "content/images/notebook.png"],
            ["content/images/yolo.png", "content/images/shhh.png", "content/images/twizzlers.png"],
            ["content/images/washington.png", "content/images/nerf.png", "content/images/twizzlers.png"],
            ["content/images/fire.png", "content/images/e-note.png", "content/images/twizzlers.png"],
            ["content/images/lies.png", "content/images/physics.png", "content/images/rocketscience.png"],
            ["content/images/rocket.png", "content/images/quickbrownfox.png", "content/images/tees.png"],
            ["content/images/tolberts.png", "content/images/seatbelt.png", "content/images/upsidedown.png"],
            ["content/images/easymoney.png", "content/images/consetta.png", "content/images/notebook.png"],
            ["content/images/yolo.png", "content/images/shhh.png", "content/images/twizzlers.png"],
            ["content/images/washington.png", "content/images/nerf.png", "content/images/twizzlers.png"],
            ["content/images/what.png", "content/images/sixties.png", "content/images/antiques.png"],
            ["content/images/letters.png", "content/images/sidewalk.png", "content/images/amazing.png"],
            ["content/images/shhh.png", "content/images/shi.png", "content/images/skinnyshit.png"],
            ["content/images/lies.png", "content/images/physics.png", "content/images/rocketscience.png"],
            ["content/images/rocket.png", "content/images/quickbrownfox.png", "content/images/tees.png"],
            ["content/images/tolberts.png", "content/images/seatbelt.png", "content/images/upsidedown.png"],
            ["content/images/easymoney.png", "content/images/consetta.png", "content/images/notebook.png"],
            ["content/images/yolo.png", "content/images/shhh.png", "content/images/twizzlers.png"],
            ["content/images/washington.png", "content/images/nerf.png", "content/images/twizzlers.png"],
            ["content/images/what.png", "content/images/sixties.png", "content/images/antiques.png"],
            ["content/images/letters.png", "content/images/sidewalk.png", "content/images/amazing.png"],
            ["content/images/shhh.png", "content/images/shi.png", "content/images/skinnyshit.png"],
            ["content/images/lies.png", "content/images/physics.png", "content/images/rocketscience.png"],
            ["content/images/rocket.png", "content/images/quickbrownfox.png", "content/images/tees.png"],
            ["content/images/tolberts.png", "content/images/seatbelt.png", "content/images/upsidedown.png"],
            ["content/images/easymoney.png", "content/images/consetta.png", "content/images/notebook.png"],
            ["content/images/yolo.png", "content/images/shhh.png", "content/images/twizzlers.png"],
            ["content/images/washington.png", "content/images/nerf.png", "content/images/twizzlers.png"],
            ["content/images/fire.png", "content/images/e-note.png", "content/images/twizzlers.png"]
        ];

    function getAlbumIcons(row) {
        return albumIcons[row];
    }


    module.exports = AlbumView;
});
