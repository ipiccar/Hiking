const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const connection = require('../../config/database.config.js');


var poiSchema = new Schema({
	challengeId: {type: String, required :true},
	name: {type: String, required :true, unique :true},
	description: String,
	coordX: {type: Number, required :true},
	coordY: {type: Number, required :true},
	notificationRange: Number,
	notificationMessage: String,
});
var con = mongoose.createConnection(connection.url);
module.exports = con.model('POI', poiSchema);