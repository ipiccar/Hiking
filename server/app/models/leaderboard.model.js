const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const connection = require('../../config/database.config.js');

var leaderboardSchema = new Schema({
	gameId: {type: String, required :true},
	poiId: {type: String, required :true},
	points : Number,
});
var con = mongoose.createConnection(connection.url);
module.exports = con.model('Leaderboard', leaderboardSchema);