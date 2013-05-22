var isAdmin = require('./admin');

/**
* Expect a resource which is owned by the user who signed the request
* OR
* an Admin
*/
module.exports = function (req,res,ok) {
	var signedByID = req.tkn.userid;

	var paramID;
	if (req.param.controller === 'user') {
		paramID = req.param("id");
	} else if (req.param.controller === 'post') {
		paramID = req.param("userid");
	} else if (req.param.controller === 'comment') {
		paramID = req.param("userid");
	}

	if (paramID !== null && typeof paramID !== 'undefined') {
		paramID = parseInt(paramID,10);
		if (!isNaN(paramID) && paramID === signedByID) {
			return ok();
		}
	}
	//OR run the admin policy.
	isAdmin(req,res,ok);
};