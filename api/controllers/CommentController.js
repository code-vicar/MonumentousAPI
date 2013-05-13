/*---------------------
	:: Comment 
	-> controller
---------------------*/
var CommentController = {

	create: function(req, res) {
		
		//validate the content
		var content = req.param('content');
		if (typeof content !== 'string' || content.length <= 0) {
			return res.send("invalid params", 400);
		}

		var postid = req.param('postid');
		if (typeof postid !== 'string') {
			return res.send("invalid params", 400);
		}

		//cast to int
		postid = parseInt(postid, 10);
		if (isNaN(postid)) {
			return res.send("invalid params", 400);
		}

		//get the userid from the session
		Comment.create({
			userid:req.session.user.id,
			postid:postid,
			votes:0,
			content:content
		}).done(function(err, comment) {
			if (err) {
				return res.send("server error", 500);
			}
			return res.send(comment, 200);
		});

	},

	vote: function(req, res) {

		var vote = req.param('vote');
		if (typeof vote !== 'string') {
			return res.send("invalid params", 400);
		}

		vote = parseInt(vote, 10);
		if (isNaN(vote)) {
			return res.send("invalid params", 400);
		}

		var id = req.param('id');
		if (typeof id !== 'string') {
			return res.send("invalid params", 400);
		}

		id = parseInt(id, 10);
		if (isNaN(id)) {
			return res.send("invalid params", 400);
		}

		var incr = 1;
		if (vote <= 0) {
			incr = -1;
		}

		Comment.find(id).done(function(err, cmt) {
			if (err) {
				return res.send("comment not found", 404)
			}

			Comment.update({
				id:id
			},{
				votes:(cmt.votes + incr)
			}, function(err, updated){
				if (err) {
					return res.send("server error", 500);
				}

				res.send(updated, 200);
			});
		});

	},

};
module.exports = CommentController;