/**
* Allow only admin users
*/
module.exports = function (req, res, ok) {
	
	// User is allowed, proceed to controller
	if (req.user && req.user.admin) {
		return ok();
	}
	
	// User is not allowed
	return res.send("You are not permitted to perform this action.", 403);
};