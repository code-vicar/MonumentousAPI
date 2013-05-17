var parseOptions = function(options){
	var opts = {};

	//if options is defined, load it's msg and dat properties
	if (options) {
		opts.msg = options.msg
		opts.dat = options.dat
	};

	return opts;
};

var StandardResponses = {

	globalId: "StandardResponses",

	OK: function(options) {
		var opts = parseOptions(options);

		return {
			"statusCode":200,
			"status":"success",
			"message": opts.msg || "ok",
			"data": opts.dat || null
		};
	},

	Created: function(options) {
		var opts = parseOptions(options);

		return {
			"statusCode":201,
			"status":"success",
			"message": opts.msg || "created",
			"data": opts.dat || null
		};
	},

	RequireSignature: function(options) {
		var opts = parseOptions(options);

		return {
			"statusCode":401,
			"status":"error",
			"message": opts.msg || "please provide a signature",
			"data": opts.dat || null
		};
	},
	
	AccessDenied: function(options) {
		var opts = parseOptions(options);

		return {
			"statusCode":403,
			"status":"error",
			"message": opts.msg || "forbidden",
			"data": opts.dat || null
		};
	},

	ResourceNotFound: function(options) {
		var opts = parseOptions(options);

		return {
			"statusCode":404,
			"status":"error",
			"message": opts.msg || "resource not found",
			"data": opts.dat || null
		};
	},

	BadRequest: function(options) {
		var opts = parseOptions(options);

		return {
			"statusCode":400,
			"status":"error",
			"message": opts.msg || "invalid parameters",
			"data": opts.dat || null
		};
	},

	Conflict: function(options) {
		var opts = parseOptions(options);

		return {
			"statusCode":409,
			"status":"error",
			"message": opts.msg || "cannot complete due to conflict",
			"data": opts.dat || null
		};
	},

	ServerError: function(options) {
		var opts = parseOptions(options);

		return {
			"statusCode":500,
			"status":"error",
			"message": opts.msg || "server error",
			"data": opts.dat || null
		};
	}
};

module.exports = StandardResponses;