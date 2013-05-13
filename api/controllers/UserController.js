/*---------------------
	:: User 
	-> controller
---------------------*/
var UserController = {

	create: function(req, res) {
		var username = req.param('username');
		var password = req.param('password');
		var email = req.param('email');

		//username must be unique
		User.findByEmail(email).done(function(err, usr) {
			if (usr) {
				return res.send("that email is already in use", 400);
			}

			User.hashPassword(password, function(err, hash) {
				if (err) {
					return res.send("server error", 500);
				}
				User.create({
					username:username,
					password:hash,
					email:email
				}).done(function(err, usr) {
					if (err) {
						return res.send("server error", 500);
					}

					return res.send("created user", 200);
				});
			});
		});
	},

	login: function(req, res) {
		var username = req.param('username');
		var password = req.param('password');

		if (typeof username !== 'string') {
			return res.send("invalid params", 400);
		}

		if (typeof password !== 'string') {
			return res.send("invalid params", 400);
		}

		User.authenticate(username, password, function(err, data) {
			if (err) {
				return res.send({title:"server error", error:err}, 500);
			}
			req.session.authenticated = data.authenticated;
			req.session.user = data.user;
			req.session.user.admin = (data.user.email === 'scott.w.vickers@gmail.com');

			if (data.authenticated) {
				return res.send("logged in", 200);
			}

			//failed login attempt
			return res.send('incorrect login information', 401);
		});
	},

	logout: function(req, res) {
		req.session.authenticated = false;
		delete req.session.user;
		res.send("logged out", 200);
	}
};
module.exports = UserController;