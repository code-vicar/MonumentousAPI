/**
* add a flag to the request that tells the action to filter the parameters
*/
module.exports = function (req, res, ok) {
	//tell the controller to strip any parameters from the request
	// that don't exist on the model (except filter type parameters, e.g. where, limit, skip etc...)
	//req.params.param_filter=true;

	//check the controller/action to see if we need to filter the parameters even more
	var model = sails.models[req.params.entity];
	if (model && model.filterParamsByAction) {
		req = model.filterParamsByAction(req);
	}

	return ok();
};