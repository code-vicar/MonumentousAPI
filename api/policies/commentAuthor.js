/**
* Allow only the author or admin users
*/
module.exports = function (req, res, ok) {

	//if the user is an admin we allow
	if (req.user && req.user.admin) {
		return ok();
	}

	//otherwise, check for a comment id
	var id = req.param('id');
	if (typeof id !== 'string') {
		return noAccess(res);
	}

	id = parseInt(id, 10);
	if (isNaN(id)) {
		return noAccess(res);
	}
	
	//find the comment with that id
	Comment.find(id).done(function(err, cmt) {
		if (err) {
			return serverError(res);
		}

		if (!cmt) {
			return missingResource(res);
		}

		//check if the author matches the user in session
		if (cmt.userid === req.user.id) {
			return ok();
		}

		//if we get here then they don't have access
		return noAccess(res);
	});
};

var missingResource = function(res) {
	return res.send("Resource not found", 404);
};

var noAccess = function(res) {
	// User is not allowed
	return res.send("You are not permitted to perform this action.", 403);
};

var serverError = function(res) {
	return res.send("server error", 500);
};