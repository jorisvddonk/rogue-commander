define('gamerenderer', ['config', 'maprenderer', 'overlayrenderer'], function(CONF, Maprenderer, Overlayrenderer){
	var render = function(){
		this.maprenderer.render(this.gamemap);
		this.overlayrenderer.render(this.gamemap);
	}

	return function Gamerenderer(gamemap, map_div, overlay_id){
		this.gamemap = gamemap;
		this.maprenderer = new Maprenderer(map_div);
		this.overlayrenderer = new Overlayrenderer(overlay_id, CONF.HORIZONTAL_NR_TILES * CONF.TILE_WIDTH, CONF.VERTICAL_NR_TILES * CONF.TILE_HEIGHT);

		//Export functions:
		this.render = render;
	}
});