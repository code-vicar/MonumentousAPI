/*---------------------
	:: Post
	-> model
---------------------*/
module.exports = {

	attributes	: {
		id:'INTEGER',
		userid:'INTEGER',
    title:'STRING',
    content:'STRING'
	},

	filterParamsByAction: function(req) {

		//consolidate the parameters into a single object
		//this call actually mutates the req.query object
		// it will now contain all of the parameters defined in any of the 
		// three locations
		Merge.fn(req.query || {}, req.params || {}, req.body || {});
		//all of the inputs have been copied/merged into the query object
		// we don't need to repeat them here.
		req.params = {};
		req.body = {};

		//convert the id parameter to an integer value
		// if (req.query.id !== null && typeof req.query.id !== 'undefined') {
		// 	var iid = parseInt(req.query.id,10);
		// 	if (!isNaN(iid)) {
		// 		req.query.id = iid;
		// 	}
		// }

		switch(req.query.action) {
			case "create":
				//can't provide an id when creating a post
				delete req.query["id"];
				//automatically determine the author of the post from the request signature
				req.query.userid = req.tkn.userid;
				//remove extraneous parameters
				req.query = ParamFilters.strict("post", req.query);
			break;
			default:
				req.query = ParamFilters.withSearch("post", req.query);
			break;
		}
		//console.log(req.query);
		return req;
	}
};

