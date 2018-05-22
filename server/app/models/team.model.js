const mongoose = require('mongoose');  
const connection = require('../../config/database.config.js');
const Schema = mongoose.Schema;
const challengeSchema = mongoose.model('Challenge').schema
const userSchema = mongoose.model('User').schema

var teamSchema = new Schema({
	gameId: {type: String, required :true},
	name: {type: String, required :true},
	challenges: {type: [challengeSchema], required :true},
	users : {type: [userSchema], required :true},
});
var con = mongoose.createConnection(connection.url);
module.exports = con.model('Team', teamSchema);
	