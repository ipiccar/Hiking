var mongoose = require('mongoose');

// Define movie schema
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    address: String,
});

// Export Mongoose model
module.exports = mongoose.model('User', userSchema);