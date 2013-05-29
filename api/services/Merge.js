var merge = function() {
	var args = Array.prototype.slice.call(arguments);

	//need at least 2 arguments
	if (args.length > 1) {
		var retObj = args[0];

		//get a new arguments array starting with the second argument
		var mergeWith = args.slice(1);
		var obj;
		var keys;
		var i;
		var j;
		for (i = mergeWith.length - 1; i >= 0; i--) {
			obj = mergeWith[i];
			keys = Object.keys(obj);
			for (j = keys.length - 1; j >= 0; j--) {
				var key = keys[j];
				if (typeof obj[key] !== 'undefined'){
					retObj[key] = (typeof retObj[key] == 'undefined') ? obj[key] : retObj[key];
				}
			};
		};
	}

	return retObj;
}

module.exports = {
	globalId:"Merge",
	fn: merge
}