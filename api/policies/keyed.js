/**
* Expect an API Key
*/
module.exports = function (req,res,ok) {
	
	// TODO: check that the api_key is valid
	var auth = req.headers.authorization;

	if (auth === 'UmentousAuth token="hohoho"') {
		return ok();
	}

	// Request needs an api key
	else {
		//console.log(services);
		//console.log(StandardResponses);
		//console.log(_.bind);
		var r = StandardResponses.AccessDenied({msg:"Please provide an api key."});
		return res.send(r, r.statusCode);
	}
};