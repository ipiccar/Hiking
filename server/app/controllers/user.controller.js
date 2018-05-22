var User = require('../models/user.model.js');

exports.create = function(req, res) {
    // Create and Save a new user
if(!req.body.name) {
        return res.status(400).send({message: "Name can not be empty"});
    }
    var userAdd = new User({name: req.body.name, type: req.body.type, MAC: req.body.MAC, pass: req.body.pass});
    userAdd.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the User."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all users from the database.
    User.find(function(err, users){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving user."});
        } else {
            res.send(users);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single user with a userId
    User.findById(req.params.userId, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userId});                
            }
            return res.status(500).send({message: "Error retrieving user with id " + req.params.userId});
        } 

        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params.userId});            
        }
        res.send(user);
    });
};

exports.findOneByName = function(req, res) {
    // Find a single user with a userName
    User.findOne({name:req.params.userName}, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userName});
            }
            return res.status(500).send({message: "Error retrieving user with name " + req.params.userName});
        }

        if(!user) {
            return res.status(404).send({message: "User not found with name " + req.params.userName});
        }
        res.send(user);
    });
};

exports.update = function(req, res) {
    // Update a user identified by the userId in the request
    User.findById(req.params.userId, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userId});                
            }
            return res.status(500).send({message: "Error finding user with id " + req.params.userId});
        }
        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params.userId});            
        }
			user.name = req.body.name;
			user.type = req.body.type;
			user.MAC = req.body.MAC;
			user.pass = req.body.pass;
        user.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update user with id " + req.params.userId});
            } else {
                res.send(data);
            }
        });
    });
};  

exports.delete = function(req, res) {
    // Delete a user with the specified userId in the request
    User.findByIdAndRemove(req.params.userId, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userId});                
            }
            return res.status(500).send({message: "Could not delete user with id " + req.params.userId});
        }
        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params.userId});
        }
        res.send({message: "User deleted successfully!"})
    });
};