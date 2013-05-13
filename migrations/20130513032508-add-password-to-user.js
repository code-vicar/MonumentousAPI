var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.addColumn('user', 'password', {
		type:'string',
		notNull:true
	}, callback);
};

exports.down = function(db, callback) {
	db.removeColumn('user', 'password', callback);
};
