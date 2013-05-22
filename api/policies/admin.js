/**
* Allow only admin users
*/
module.exports = function (req, res, ok) {
	
	User.find(req.tkn.userid).done(function(err,usr) {
		if (err) {
			return res.send(err);
		}

		if (!usr) {
			return res.send("404");	
		}

		if (!usr.admin) {
			return res.send("Unauthorized");
		}

		return ok();
	});
};