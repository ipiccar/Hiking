const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const poiSchema = mongoose.model('POI').schema
const userSchema = mongoose.model('User').schema
const connection = require('../../config/database.config.js');

var gameSchema = new Schema({
	name: {type: String, required :true, unique :true},
	QRcode : String,
	description: {type: String, required :true},
	pois: [{
		challengeId: {type: String, required :true},
		name: {type: String, required :true},
		description: {type: String, required :true},
		coordX: {type: Number, required :true},
		coordY: {type: Number, required :true},
		notificationRange: {type: Number, required :true},
		notificationMessage: {type: String, required :true},
		}],
	gms: [{
		name: {type: String, required :true},
		type: String,
		MAC: {type: String, required :true},
		}],
});
var con = mongoose.createConnection(connection.url);
module.exports = con.model('Game', gameSchema);
