/**
* Allow only the author or admin users
*/
module.exports = function (req, res, ok) {
	
	// User is allowed, proceed to controller
	if (req.session.user.admin) {
		return ok();
	}

	// User is not allowed
	else {
		return res.send("You are not permitted to perform this action.",403);
	}
};