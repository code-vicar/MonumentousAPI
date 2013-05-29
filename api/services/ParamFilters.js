var always = function(params) {
	// Always remove the params which sails automatically includes
	delete params['action'];
	delete params['entity'];
	delete params['controller'];

	// Always remove 'redirect'
	delete params['redirect'];
	return params;
};

var ParamFilters = {
	globalId: "ParamFilters",

	strict: function(modelname, params) {
		params = always(params);
		var Model = sails.models[modelname];

		// remove the attributes which are not in the model
		return Model.filter(params);
	},

	withSearch: function(modelname, params) {
		params = always(params);
		var Model = sails.models[modelname];

		// remove the attributes which are not in the model
		// (but leave 'where', 'limit', 'skip', and 'sort' alone)
		var tmp = {
			where: params.where,
			limit: params.limit,
			sort: params.sort,
			skip: params.skip
		};
		//console.log(params);
		params = Model.filter(params);
		//console.log(params);
		return Merge.fn(params,tmp);
	}
}

module.exports = ParamFilters;