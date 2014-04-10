define(function(require, exports, module) {
    var Surface              = require('famous/core/Surface');
    var Modifier             = require('famous/core/Modifier');
    var Transform            = require('famous/core/Transform');
    var View                 = require('famous/core/View');

	function TitleView() {
	    View.apply(this, arguments);
	}

	TitleView.prototype = Object.create(View.prototype);
	TitleView.prototype.constructor = TitleView;

	TitleView.DEFAULT_OPTIONS = {};

	function _createTitleView() {

	  var titleView = new Surface({});

	  var titleMod = new Modifier({});

	}

	module.exports = TitleView;
});