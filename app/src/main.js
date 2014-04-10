define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
   
	var AppView = require('views/AppView');

	var mainCtx = Engine.createContext();

	var appView = new AppView();

	mainCtx.add(appView);

	mainCtx.setPerspective(1);

});
