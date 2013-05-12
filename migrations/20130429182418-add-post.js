var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('post', {
    id: { type: 'int', primaryKey:true, autoIncrement:true },
    userid:'int',
    title:'string',
    content:'string',
    createdAt:'datetime',
    updatedAt:'datetime'
  }, callback);
};

exports.down = function(db, callback) {
	db.dropTable('post', callback);
};
