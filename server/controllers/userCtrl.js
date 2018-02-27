var User = require('../models/user');

exports.create = function(req, res) {
    // Create and Save a new Note
    if(!req.body.name) {
        return res.status(400).send({message: "Note can not be empty"});
    }

    var user = new User({name: req.body.name || "Untitled Note", address: req.body.address});

    user.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Note."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    User.find(function(err, users){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.send(users);
        }
    });
};