var uuid = require('node-uuid');
/*---------------------
	:: User 
	-> controller
---------------------*/
var UserController = {

	create: function(req, res) {
		var username = req.param('username');
		var password = req.param('password');
		var email = req.param('email');

		if (!username || !password) {
			var invalidParams = StandardResponses.BadRequest();
			return res.send(invalidParams, invalidParams.statusCode);
		}

		//username must be unique
		User.findByUsername(username).done(function(err, usr) {
			if (usr) {
				var deniedName = StandardResponses.Conflict({msg:"That name is already in use."});
				return res.send(deniedName, deniedName.statusCode);
			}

			User.hashPassword(password, function(err, hash) {
				var ISE;
				if (err) {
					ISE = StandardResponses.ServerError({dat:err});
					return res.send(ISE, ISE.statusCode);
				}
				User.create({
					username:username,
					password:hash,
					email:email
				}).done(function(err, usr) {
					if (err) {
						ISE = StandardResponses.ServerError({dat:err});
						return res.send(ISE, ISE.statusCode);
					}

					var rUsr = StandardResponses.Created({msg:"User created",dat:usr});
					return res.send(rUsr,rUsr.statusCode);
				});
			});
		});
	},

	login: function(req, res) {
		var username = req.param('username');
		var password = req.param('password');

		if (!username || !password) {
			var invalidParams = StandardResponses.BadRequest();
			return res.send(invalidParams, invalidParams.statusCode);
		}

		User.authenticate(username, password, function(err, data) {
			var ISE;
			if (err) {
				ISE = StandardResponses.ServerError({dat:err});
				return res.send(ISE, ISE.statusCode);
			}
			
			if (!data.authenticated) {
				var failAuth = StandardResponses.BadRequest({msg:"incorrect username or password"});
				return res.send(failAuth,failAuth.statusCode);
			}

			Token.findByUserid(data.user.id).done(function(err, tkn){
				if (err) {
					ISE = StandardResponses.ServerError({dat:err});
					return res.send(ISE, ISE.statusCode);
				}

				var pub = "";
				if (tkn) {
					var authed = StandardResponses.OK({msg:"authentication successful", dat:tkn});
					return res.send(authed, authed.statusCode);
				}

				//generate a new token for the user
				Token.create({
					userid: data.user.id,
					pub: uuid.v4(),
					secret: uuid.v4()
				}).done(function(err,tkn){
					if (err) {
						ISE = StandardResponses.ServerError({dat:err});
						return res.send(ISE, ISE.statusCode);
					}

					var authed = StandardResponses.OK({msg:"authentication successful", dat:tkn});
					return res.send(authed, authed.statusCode); 
				});
			});
		});
	}
};
module.exports = UserController;