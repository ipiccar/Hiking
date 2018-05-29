const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const connection = require('../../config/database.config.js');

var challengeSchema = new Schema({
	poiId: {type: String, required :true},
	name: {type: String, required :true, unique :true},
	type: {type: String, required :true},
	isDone: Boolean,
	points: Number,
	pointsWon: Number,
	penalityTime: Number,
	vari: [Schema.Types.Mixed],
});
var con = mongoose.createConnection(connection.url);
module.exports = con.model('Challenge', challengeSchema);