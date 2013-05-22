/**
* Expect a comment which is owned by the user who signed the request
* OR
* an Admin
*/
module.exports = function (req,res,ok) {
	var signedByID = req.tkn.userid;

	var paramID = req.param("userid");

	if (paramID !== null && typeof paramID !== 'undefined') {
		paramID = parseInt(paramID,10);
		if (!isNaN(paramID) && paramID === signedByID) {
			return ok();
		}
	}

	var UN = StandardResponses.Unauthorized({msg:"Could not verify ownership of resource"});
	return res.send(UN,UN.statusCode);
};