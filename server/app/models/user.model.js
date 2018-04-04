const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const connection = require('../../config/database.config.js');

var userSchema = new Schema({
	name: {type: String, required :true},
	type: String,
	MAC: String,
	pass: String,
});

var con = mongoose.createConnection(connection.url);
module.exports = con.model('User', userSchema);
	
