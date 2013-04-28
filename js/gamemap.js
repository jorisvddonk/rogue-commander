define('gamemap', ['underscore', 'tile', 'getpath_astar'], function(_, Tile, getPath_ASTAR){

	var generateRoom = function(params) {
		for (var y = 0; y < this.width; y++) {
			for (var x = 0; x < this.height; x++) {
				tile = this.getTile(x,y);
				if (tile.x < params.left || tile.x > params.right || tile.y < params.top || tile.y > params.bottom) {
					//do nothing
				} else {
					if (tile.x == params.left) {
						tile.addWall('west');
					}
					if (tile.x == params.right) {
						tile.addWall('east');
					}
					if (tile.y == params.top) {
						tile.addWall('north');
					}
					if (tile.y == params.bottom) {
						tile.addWall('south');
					}
				}
			}
		}
	}

	var getTile = function(x,y) {
		for (var i = 0; i < this.tiles.length; i++) {
			if (this.tiles[i].x == x && this.tiles[i].y == y) {
				return this.tiles[i];
			}
		}
		throw "GetTile: tile not found! [" + x + "," + y + "]";
	}

	var getTileByID = function(id) {
		for (var i = 0; i < this.tiles.length; i++) {
			if (this.tiles[i].id == id) {
				return this.tiles[i];
			}
		}
		throw "GetTile: tile not found! [" + id + "]";
	}

	var getNeighborTiles = function(tgttile) {
		var rettiles = [];
		for (var i = 0; i < this.tiles.length; i++) {
			if (tgttile.isNeighbor(this.tiles[i])) {
				rettiles.push(this.tiles[i]);
			}
		}
		return rettiles;
	}

	var getNeighborTiles_NonBlocking = function(tgttile) {
		var tiles = this.getNeighborTiles(tgttile);
		var retval = [];
		for (var i = 0; i < tiles.length; i++) {
			if (!tgttile.isBlockingNeighbor(tiles[i])) {
				retval.push(tiles[i]);
			}
		}
		return retval;
	}

	var _construct = function() {
		for (var y = 0; y < this.width; y++) {
			for (var x = 0; x < this.height; x++) {
				this.tiles.push(new Tile({
					x: x, 
					y: y
				}));
			}
		}
	}

	return function Gamemap(width, height){
		this.tiles = [];
		this.width = width;
		this.height = height;

		//Construct
		_construct.call(this);

		//Add functions:
		this.generateRoom = generateRoom;
		this.getTile = getTile;
		this.getTileByID = getTileByID;
		this.getPath = getPath_ASTAR;
		this.getNeighborTiles = getNeighborTiles;
		this.getNeighborTiles_NonBlocking = getNeighborTiles_NonBlocking;
	}

});