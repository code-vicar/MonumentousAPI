//policy chaining on all routes "*" isn't working yet
//temporarily call the 'filterParams' policy from the 'keyed' policy
// until we can chain them together properly
//var filterParams = require('./filterParams');

/**
* Expect an API Key
* Allow any valid api key
*/
module.exports = function (req,res,ok) {
	var apikey = req.param('apikey');

	if (!apikey) {
		var UA = StandardResponses.Unauthorized({msg:"Please provide an api key in 'apikey'"});
		return res.send(UA,UA.statusCode);
	}

	Token.findByPub(apikey).done(function(err, tkn) {
		if (err) {
			var ISE = StandardResponses.ServerError({dat:err});
			return res.send(ISE, ISE.statusCode);
		}

		if (!tkn) {
			var UA = StandardResponses.Unauthorized({msg:"Account inactive"});
			return res.send(UA, UA.statusCode);
		}

		req.tkn = tkn;

		return ok();
	});
};