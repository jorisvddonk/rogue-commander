define('getpath_astar', ['underscore'], function(_){
	return function(starttile, goaltile) {
		//http://en.wikipedia.org/wiki/A*_search_algorithm
		var closedset = [];
		var openset = [starttile];
		var came_from = {};

		var g_score = {};
		var f_score = {};



		var getLowest = function(tiles, inset) {
			var minscore = Infinity;
			var mintile = null;
			for (var i = 0; i < tiles.length; i++) {
				if (inset[tiles[i].id] < minscore) {
					minscore = inset[tiles[i].id];
					mintile = tiles[i];
				}
			}
			return mintile;
		}

		var reconstruct_path = function(came_from, current_tile) {
			var retarr = [];
			var ctile = current_tile;
			var i = 99999;
			while (i > 0 && ctile !== undefined) {
				retarr.push(ctile);
				var ntile = came_from[ctile.id];
				ctile = ntile;
				i = i - 1;
			}
			return retarr.reverse();
		}

		var dist_between = function(tile1, tile2) {
			return ((tile1.x-tile2.x)*(tile1.x-tile2.x))+((tile1.y-tile2.y)*(tile1.y-tile2.y));
		}

		var heuristic_cost_estimate = function(tile, goal) {
			return dist_between(tile, goal);
		}

		g_score[starttile.id] = 0;
		f_score[starttile.id] = heuristic_cost_estimate(starttile, goaltile);

		while (openset.length > 0) {

			var current = getLowest(openset, f_score);

			if (current.id === goaltile.id) {
				return reconstruct_path(came_from, goaltile);
			}
			openset = _.filter(openset, function(til){return til.id != current.id});
			closedset.push(current);
			var neighbors = this.getNeighborTiles_NonBlocking(current);
			for (var i = 0; i < neighbors.length; i++) {
				var neighbor = neighbors[i];
				var tentative_g_score = dist_between(current, neighbor) + (g_score[current.id] === undefined ? 0 : g_score[current.id]);
				if (_.contains(closedset, neighbor)) {
					if (tentative_g_score >= g_score[neighbor.id]) {
						continue;
					}
				}

				if (!_.contains(openset, neighbor) || tentative_g_score < g_score[neighbor.id]) {
					came_from[neighbor.id] = current;
					g_score[neighbor.id] = tentative_g_score;
					f_score[neighbor.id] = g_score[neighbor.id] + heuristic_cost_estimate(neighbor, goaltile);
					if (!_.contains(openset, neighbor)) {
						openset.push(neighbor);
					}
				}
			}
		}
		return null; //no path found!!!
	}
})