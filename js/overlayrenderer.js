define('overlayrenderer', ['config'], function(CONF){
	var renderLines = function(lines, using_tile_coords) {
		var pathString = '';
		for (var i = 0; i < lines.length; i++) {
			var x = lines[i].x;
			var y = lines[i].y;
			if (using_tile_coords) {
				x = (x * CONF.TILE_WIDTH) + (0.5 * CONF.TILE_WIDTH);
				y = (y * CONF.TILE_HEIGHT) + (0.5 * CONF.TILE_HEIGHT);
			}
			pathString = pathString + (pathString.length == 0 ? 'M' : 'L');
			pathString = pathString + x + ',' + y;
		}
		this.paper.path(pathString);
	}

	var render = function(gamemap) {
		//do nothing..
	}

	var clear = function() {
		this.paper.clear();
	}

	return function Overlayrenderer(overlay_div_id, width, height) {
		this.paper = Raphael(overlay_div_id, width, height);
		this.renderLines = renderLines;

		//Export functions:
		this.render = render;
		this.clear = clear;
	}
});