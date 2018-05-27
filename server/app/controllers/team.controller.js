var Team = require('../models/team.model.js');

exports.create = function(req, res) {
    // Create and Save a new team
if(!req.body.name) {
        return res.status(400).send({message: "Name can not be empty"});
    }

    var teamAdd = new Team({gameId: req.body.gameId, name: req.body.name, challenges: req.body.challenges, users: req.body.users});
    teamAdd.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Team."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all games from the database.
    Team.find(function(err, teams){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving team."});
        } else {
            res.send(teams);
        }
    });
};

exports.findAllTeamsFromGame = function(req, res) {
    // Retrieve and return all games from the database.
    Team.find({gameId:req.params.gameId}, function(err, teams){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving teams.", error:err});
        } else {
            res.send(teams);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single team with a gameId
    Team.findById(req.params.teamId, function(err, team) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "team not found with id " + req.params.teamId});                
            }
            return res.status(500).send({message: "Error retrieving team with id " + req.params.teamId});
        } 

        if(!team) {
            return res.status(404).send({message: "team not found with id " + req.params.teamId});            
        }
        res.send(team);
    });
};

exports.update = function(req, res) {
    // Update a game identified by the gameId in the request
    Team.findById(req.params.teamId, function(err, team) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "team not found with id " + req.params.teamId});                
            }
            return res.status(500).send({message: "Error finding team with id " + req.params.teamId});
        }
        if(!team) {
            return res.status(404).send({message: "team not found with id " + req.params.teamId});            
        }
			team.gameId = req.body.gameId;
			team.name = req.body.name;
			team.challenges = req.body.challenges;
			team.gms = req.body.gms;
        team.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update team with id " + req.params.teamId});
            } else {
                res.send(data);
            }
        });
    });
};  

exports.delete = function(req, res) {
    // Delete a game with the specified gameId in the request
    Team.findByIdAndRemove(req.params.teamId, function(err, team) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "team not found with id " + req.params.teamId});                
            }
            return res.status(500).send({message: "Could not delete team with id " + req.params.teamId});
        }

        if(!team) {
            return res.status(404).send({message: "team not found with id " + req.params.teamId});
        }

        res.send({message: "team deleted successfully!"})
    });
};