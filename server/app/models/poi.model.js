const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const connection = require('../../config/database.config.js');


var poiSchema = new Schema({
	challengeId: String,
	name: String,
	description: String,
	coordX: Number,
	coordY: Number,
	notificationRange: Number,
	notificationMessage: String,
});
var con = mongoose.createConnection(connection.url);
module.exports = con.model('POI', poiSchema);