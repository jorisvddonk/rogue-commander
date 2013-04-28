define('tilesector', function(){
	var addWall = function() {
		this.blocking = true;
		this.objects.push('wall');
	}

	var isBlocking = function() {
		return this.blocking;
	}

	return function Tilesector(params){
		this.name = params.name || "undefined_name";
		this.blocking = false;
		this.objects = [];

		//export functions
		this.addWall = addWall;
		this.isBlocking = isBlocking;
	}
});