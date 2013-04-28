define('tile', ['idgenerator', 'tilesector'], function(idgenerator, Tilesector){
	var addWall = function(sector_id) {
		this.getSector(sector_id).addWall();
	}

	var isNeighbor = function(othertile, allow_diag) {
		if (allow_diag === undefined) {
			allow_diag = true;
		}
		if (allow_diag) {
			if (Math.abs(othertile.x - this.x) <= 1 && Math.abs(othertile.y - this.y) <= 1 && othertile.id != this.id) {
				return true;
			}
		} else {
			if (Math.abs(othertile.x - this.x) === 1 && Math.abs(othertile.y - this.y) === 0) {
				return true;
			}
			if (Math.abs(othertile.x - this.x) === 0 && Math.abs(othertile.y - this.y) === 1) {
				return true;
			}
		}
		return false;
	}

	var getSector = function(sector_id) {
		return this.sectors[sector_id];
	}

	var isBlockingNeighbor = function(othertile) {
		//this tile -> other tile is blocking?
		var directions = this.getDirectionsToOtherTile(othertile);
		for (i = 0; i < directions.length; i++) {
			if (this.getSector(directions[i]) && this.getSector(directions[i]).isBlocking()) {
				return true;
			}
		}
		//other tile -> this tile is blocking?
		var directions = othertile.getDirectionsToOtherTile(this);
		for (i = 0; i < directions.length; i++) {
			if (othertile.getSector(directions[i]) && othertile.getSector(directions[i]).isBlocking()) {
				return true;
			}
		}
		//Nope, not blocking!
		return false;
	}

	var getDirectionsToOtherTile = function(othertile) {
		var retval = [];
		if (othertile.y - this.y === -1) {
			retval.push('north');
		}
		if (othertile.y - this.y === 1) {
			retval.push('south');
		} 
		if (othertile.x - this.x === 1) {
			retval.push('east');
		} 
		if (othertile.x - this.x === -1) {
			retval.push('west');
		}
		if (retval.length === 0) {
			throw "Other tile is not adjacent???";
		}
		return retval;
	}

	return function Tile(params) {
		if (params.x === undefined || params.y === undefined) {
			throw "Tile constructor needs an 'x' and 'y' parameter!";
		}
		this.x = params.x;
		this.y = params.y;
		this.id = idgenerator.getID('tile');
		this.sectors = {
			'north': new Tilesector({name:'north'}),
			'east': new Tilesector({name:'east'}),
			'south': new Tilesector({name:'south'}),
			'west': new Tilesector({name:'west'}),
			'center': new Tilesector({name:'center'})
		};

		//Export functions
		this.addWall = addWall;
		this.isNeighbor = isNeighbor;
		this.getSector = getSector;
		this.getDirectionsToOtherTile = getDirectionsToOtherTile;
		this.isBlockingNeighbor = isBlockingNeighbor;
	}
});