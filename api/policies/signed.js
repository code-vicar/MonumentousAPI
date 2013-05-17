var crypto = require('crypto');

//signature creation method
var authSig = function(apiKey, apiSecret, sig) {
	var timeStamp = Math.round(new Date().getTime()/1000);
	//check a 5 minute variance on either side of the request
	var timeStart = timeStamp - 300;
	var apiKeyApiSecret = apiKey + apiSecret;
	for(i = 0; i < 600; i++) {
		timeStart += 1;
		calcSig = crypto.createHash('md5').update('' + apiKeyApiSecret + timeStart + '').digest('hex');

		if (calcSig === sig) {
			return true;
		}
	}

  return false;
}

/**
* Expect that the 'keyed' policy has already been executed
* Allow any signed request.
*/
module.exports = function (req, res, ok) {
	var sig = req.param('sig');

	if (!sig) {
		var ISE = StandardResponses.Unauthorized({msg:"please provide a signature in 'sig'"});
		return res.send(ISE,ISE.statusCode);
	}

	var apiKey = req.tkn.pub;
	var apiKeySecret = req.tkn.secret;

	var isAuth = authSig(apiKey, apiKeySecret, sig);

	if (!isAuth) {
		var UA = StandardResponses.Unauthorized({msg:"Invalid signature"});
		return res.send(UA,UA.statusCode);
	}

	return ok();
};
