const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const connection = require('../../config/database.config.js');
const challengeSchema = mongoose.model('Challenge').schema
const userSchema = mongoose.model('User').schema

var teamSchema = new Schema({
	gameId: {type: String, required :true},
	name: {type: String, required :true, unique :true},
	challenges: [{
		poiId: {type: String, required :true},
		name: {type: String, required :true},
		type: {type: String, required :true},
		isDone: Boolean,
		points: Number,
		pointsWon: Number,
		penalityTime: Number,
		vari: [Schema.Types.Mixed],
		}],
	users : [{
		name: {type: String, required :true},
		MAC: {type: String, required :true},
		}],
});
var con = mongoose.createConnection(connection.url);
module.exports = con.model('Team', teamSchema);
	