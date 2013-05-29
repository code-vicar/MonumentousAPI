/**
* Allow only admin users
*/
module.exports = function (req, res, ok) {
	//console.log("I'm here 3");
	//console.log(req.tkn.userid);
	User.find(req.tkn.userid).done(function(err,usr) {
		if (err) {
			var ISE = StandardResponses.ServerError({dat:err});
			return res.send(ISE,ISE.statusCode);
		}

		if (!usr) {
			var r404 = StandardResponses.ResourceNotFound();
			return res.send(r404,r404.statusCode);
		}

		if (!usr.admin) {
			var UA = StandardResponses.Unauthorized();
			return res.send(UA, UA.statusCode);
		}

		return ok();
	});
};