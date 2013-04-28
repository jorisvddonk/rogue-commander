var _IDGENERATOR_GLOBAL = {};

define('idgenerator', function(){
	var getID = function(name) {
		if (_IDGENERATOR_GLOBAL[name] == undefined) {
			_IDGENERATOR_GLOBAL[name] = 0;
		}
		_IDGENERATOR_GLOBAL[name] += 1;
		return name + "_" + _IDGENERATOR_GLOBAL[name];
	}

	return {
		getID: getID
	}
});