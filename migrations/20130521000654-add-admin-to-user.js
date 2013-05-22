var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.addColumn('user', 'admin', {
		type:'int',
		notNull:true
	}, callback);
};

exports.down = function(db, callback) {
	db.removeColumn('user', 'admin', callback);
};
