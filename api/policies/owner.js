var isAdmin = require('./admin');
var ISE;
/**
* Expect a resource which is owned by the user who signed the request
* OR
* an Admin
*/
module.exports = function (req,res,ok) {
	var signedByID = req.tkn.userid;

	var paramID = req.param("id");
	var id = parseInt(paramID,10);

	if (isNaN(id)) {
		var BR = StandardResponses.BadRequest({msg:"please provide an id"});
		return res.send(BR,BR.statusCode);
	}

	if (req.param("controller") === 'user') {
		if (id === signedByID) {
			return ok();
		}
		return isAdmin(req,res,ok);
	} else if (req.param("controller") === 'post') {
		
		//need to look up the userid on this post
		Post.find(id).done(function(err,pst) {
			if (err) {
				ISE = StandardResponses.ServerError({dat:err});
				return res.send(ISE,ISE.statusCode);
			}

			if (pst && pst.userid === signedByID) {
				return ok();
			}

			return isAdmin(req,res,ok);
		});
	} else if (req.param("controller") === 'comment') {
		//need to look up the userid on this comment
		Comment.find(id).done(function(err,cmt) {
			if (err) {
				ISE = StandardResponses.ServerError({dat:err});
				return res.send(ISE,ISE.statusCode);
			}

			if (cmt && cmt.userid === signedByID) {
				return ok();
			}

			return isAdmin(req,res,ok);
		});
	} else {
		//if the request is for a resouce that doesn't
		// have an owner check, then just check if they're admin
		return isAdmin(req,res,ok);	
	}
};