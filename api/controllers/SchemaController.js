var fs = require('fs');
var path = require('path');

var respond = function(err, data) {
	var r;
	if (err) {
		r = StandardResponses.ServerError({msg:err});
		return this.res.send(r, r.statusCode);
	}
	r = StandardResponses.OK({dat:data});
	return this.res.send(r, r.statusCode);
};

var getJsonAsync = function(name, cb) {
	fs.readFile(path.resolve(__dirname,'../../schema/'+name+'.json'), function(err, data) {
		if (err) {
			return cb(err);
		}
		return cb(null, JSON.parse(data));
	});
};

var r404 = StandardResponses.ResourceNotFound();

/*---------------------
	:: Schema 
	-> controller
---------------------*/
var SchemaController = {
	//overwrite the default actions, we don't want them
	create: function(req,res) { res.send(r404, r404.statusCode); },
	find: function(req,res){ res.send(r404, r404.statusCode); },
	findAll: function(req,res){ res.send(r404, r404.statusCode); },
	update: function(req,res){ res.send(r404, r404.statusCode); },
	destroy: function(req,res){ res.send(r404, r404.statusCode); },

	user: function(req, res) {
		this.req = req;
		this.res = res;
		getJsonAsync('User', _.bind(respond,this));
	},

	post: function(req, res) {
		this.req = req;
		this.res = res;
		getJsonAsync('Post', _.bind(respond,this));
	},

	comment: function(req, res) {
		this.req = req;
		this.res = res;
		getJsonAsync('Comment', _.bind(respond,this));
	},

	responsedata: function(req, res) {
		this.req = req;
		this.res = res;
		getJsonAsync('ResponseData', _.bind(respond,this));
	}
};

module.exports = SchemaController;