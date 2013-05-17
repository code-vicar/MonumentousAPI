var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('token', {
    id: { type: 'int', primaryKey:true, autoIncrement:true },
    userid:'int',
    pub:'string',
    secret:'string',
    createdAt:'datetime',
    updatedAt:'datetime'
  }, callback);
};

exports.down = function(db, callback) {
	db.dropTable('token', callback);
};
