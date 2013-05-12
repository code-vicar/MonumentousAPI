/*---------------------
	:: User 
	-> controller
---------------------*/
var UserController = {

	login: function(req, res) {
		req.session.authenticated = true;
		req.session.user = {id:1};
		if (req.param('admin')) {
			req.session.user.admin=true;
		}
		res.send("logged in", 200);
	},

	logout: function(req, res) {
		req.session.authenticated = false
		res.send("logged out", 200);
	}

};
module.exports = UserController;