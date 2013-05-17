/**
* Allow any authenticated user.
*/
module.exports = function (req, res, ok) {
	
	var authToken = req.param("authToken");
	var authTokenHash = req.param("authTokenHash");
	var authTS = req.param("epoch");

	Tokens.find(authToken).done(function(err, tkn) {
		if (err) {
			return res.send("server error", 500);
		}
		if (!tkn) {
			return res.send("invalid token", 403);
		}

		var secret = tkn.secret;

		var serverHash = hash(authToken + secret + epoch);

		if (authTokenHash !== serverHash) {
			return res.send("invalid token", 403);
		}

		//they are who they say they are.
		User.find(tkn.userid).done(function(err, usr) {
			if (err) {
				return res.send("server error", 500);
			}

			req.user = usr;
			return ok();
		});
	});
};

//placeholder, we need a hashing function.
function hash(){}