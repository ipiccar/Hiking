const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const connection = require('../../config/database.config.js');

var notificationSchema = new Schema({
	gameId: {type: String, required :true},
	teams: [{teamId: {type: String, required :true},
	}],
	description: {type: String, required :true},
	timestamp : {type: String, required :true}
});
var con = mongoose.createConnection(connection.url);
module.exports = con.model('Notification', notificationSchema);