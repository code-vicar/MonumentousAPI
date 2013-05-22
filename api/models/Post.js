/*---------------------
	:: Post
	-> model
---------------------*/
module.exports = {

	attributes	: {
		userid:'INTEGER',
    title:'STRING',
    content:'STRING'
	},

	filterParamsByAction: function(req) {
		//consolidate the parameters into a single object
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});

		switch(params.action) {
			case "create":
				//can't provide an id when creating a post
				delete params["id"];
				//automatically determine the author of the post from the request signature
				params.userid = req.tkn.userid;
				//remove extraneous parameters
				params = ParamFilters.strict("post", params);
			break;
			default:
			break;
		}

		req.query = {};
		req.body = {};
		req.params = params;

		return req;
	}
};