var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('comment', {
    id: { type: 'int', primaryKey:true, autoIncrement:true },
    userid:'int',
    postid:'int',
    parentid:'int',
    content:'string',
    votes:'int',
    createdAt:'datetime',
    updatedAt:'datetime'
  }, callback);
};

exports.down = function(db, callback) {
	db.dropTable('comment', callback);
};
