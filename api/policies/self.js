/**
* Allow only the author or admin users
*/
module.exports = function (req, res, ok) {

	//ensure there is a user in the session
	if (!req.session.user) {
		return noAccess(res);
	}

	//if the user is an admin we allow
	if (req.session.user.admin) {
		return ok();
	}

	//otherwise, check for a user id
	var id = req.param('id');
	if (typeof id !== 'string') {
		return noAccess(res);
	}

	id = parseInt(id, 10);
	if (isNaN(id)) {
		return noAccess(res);
	}
	
	//check if the author matches the user in session
	if (id === req.session.user.id) {
		return ok();
	}

	//if we get here then they don't have access
	return noAccess(res);
	
};

var noAccess = function(res) {
	// User is not allowed
	return res.send("You are not permitted to perform this action.", 403);
};

var serverError = function(res) {
	return res.send("server error", 500);
};