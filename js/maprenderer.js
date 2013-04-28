define('maprenderer', ['templates'], function(templates){
	var render = function(gamemap){
		this.map_div.innerHTML = templates.tiles(gamemap);
	}

	return function Maprenderer(map_div){
		this.map_div = map_div;
		
		//export functions
		this.render = render;
	}
});