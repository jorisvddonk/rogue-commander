var gamemap;
var gamerenderer;

define('main', ['config', 'jquery', 'underscore', 'gamemap', 'gamerenderer', 'templates'], function(CONF, $, _, Gamemap, Gamerenderer){
	gamemap = new Gamemap(CONF.HORIZONTAL_NR_TILES, CONF.VERTICAL_NR_TILES);
	gamemap.generateRoom({
		top: 3, 
		bottom: 5,
		left: 3,
		right: 5
	});
	gamerenderer = new Gamerenderer(gamemap, $(".map")[0], 'mapoverlay');
	gamerenderer.render();

	gamerenderer.overlayrenderer.renderLines(gamemap.getPath(gamemap.tiles[0], gamemap.tiles[99]), true);

	// Allow user to select a tile:
	var clickEvent_NOSELECTED = function(tgtdiv){
		clickEvent = clickEvent_SELECTED_gen(tgtdiv, true); //generate a new function
		hoverEvent = clickEvent_SELECTED_gen(tgtdiv, false);
	}; 
	var clickEvent_SELECTED_gen = function(tgtdiv, is_selected){
		var firsttile = gamemap.getTileByID(tgtdiv.id);
		return function(newdiv){
			var secondtile = gamemap.getTileByID(newdiv.id);
			gamerenderer.overlayrenderer.clear();
			gamerenderer.overlayrenderer.renderLines(gamemap.getPath(firsttile, secondtile), true);
			if (is_selected) {
				clickEvent = clickEvent_NOSELECTED;
				hoverEvent = null;
			}
		}
	};

	var clickEvent = clickEvent_NOSELECTED;
	var hoverEvent = undefined;
	$(".tile").on("click", function(a){
		if (clickEvent) {
			clickEvent(a.target);
		}
	});

	$(".tile").on("mouseover", function(a){
		if (hoverEvent) {
			hoverEvent(a.target);
		}
	});
});
