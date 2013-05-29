var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

/*---------------------
	:: User
	-> model
---------------------*/
module.exports = {

	attributes: {

		// Simple attribute:
		id:'integer',
		username: 'string',
		password: 'string',
		email: 'string',
		admin: {
			type:'boolean',
			defaultsTo:0
		}
		
	},

	hashPassword: function(password, cb) {
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	    if (err) {
	      return cb(err);
	    }
	    bcrypt.hash(password, salt, function(err, hash) {
	      if (err) {
	        return cb(err);
	      }
	      cb(null, hash);
	    });
	  });
	},

	authenticate: function(username, password, cb) {
		User.findByUsername(username).done(function(err, usr){
			if (err) {
				return cb(err);
			}
			//console.log(usr);
			if (!usr) {
				//user doesn't exist, fail
				return cb(null, {authenticated:false});
			}
			bcrypt.compare(password, usr.password, function(err, isMatch) {
				if (err) {
					return cb(err);
				}
				var data = {authenticated:isMatch};
				//only add the user information if they passed authentication
				if (data.authenticated) {
					data.user = usr;
				}
				
				return cb(null, data);
			});
		});
	}

};