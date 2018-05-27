const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const poiSchema = mongoose.model('POI').schema
const userSchema = mongoose.model('User').schema
const connection = require('../../config/database.config.js');

var gameSchema = new Schema({
	name: String,
	description: String,
	pois: [poiSchema],
	gms: [userSchema],
});
var con = mongoose.createConnection(connection.url);
module.exports = con.model('Game', gameSchema);
