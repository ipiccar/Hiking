var Leaderboard = require('../models/leaderboard.model.js');

exports.create = function(req, res) {
    // Create and Save a new leaderboard
if(!req.body.gameId) {
        return res.status(400).send({message: "Name can not be empty"});
    }

    var leaderboardAdd = new Leaderboard({gameId: req.body.gameId, poiId: req.body.poiId, points: req.body.points});

    leaderboardAdd.save(function(err, data) {
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
    Leaderboard.find(function(err, leaderboards){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving leaderboard."});
        } else {
            res.send(leaderboards);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single leaderboard with a noteId
    Leaderboard.findById(req.params.leaderboardId, function(err, leaderboard) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "leaderboard not found with id " + req.params.leaderboardId});                
            }
            return res.status(500).send({message: "Error retrieving leaderboard with id " + req.params.leaderboardId});
        } 

        if(!leaderboard) {
            return res.status(404).send({message: "leaderboard not found with id " + req.params.leaderboardId});            
        }

        res.send(leaderboard);
    });
};

exports.findOneByGameId = function(req, res) {
    // Find a single leaderboard with a noteId
    Leaderboard.findById({gameId:req.params.gameId}, function(err, leaderboard) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "leaderboard not found for game " + req.params.gameId});
            }
            return res.status(500).send({message: "Error retrieving leaderboard with gameId " + req.params.gameId});
        }

        if(!leaderboard) {
            return res.status(404).send({message: "leaderboard not found for gameId " + req.params.gameId});
        }

        res.send(leaderboard);
    });
};

exports.update = function(req, res) {
    // Update a note identified by the noteId in the request
    Leaderboard.findById(req.params.leaderboardId, function(err, leaderboard) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "leaderboard not found with id " + req.params.leaderboardId});                
            } 
            return res.status(500).send({message: "Error finding leaderboard with id " + req.params.leaderboardId});
        }
        if(!leaderboard) {
            return res.status(404).send({message: "leaderboard not found with id " + req.params.leaderboardId});            
        }
        leaderboard.gameId = req.body.gameId;
		leaderboard.poiId = req.body.poiId;
		leaderboard.points = req.body.points;
                leaderboard.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update leaderboard with id " + req.params.leaderboardId});
            } else {
                res.send(data);
            }
        });
    });
};  

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request
    Leaderboard.findByIdAndRemove(req.params.leaderboardId, function(err, leaderboard) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "leaderboard not found with id " + req.params.leaderboardId});                
            }
            return res.status(500).send({message: "Could not delete leaderboard with id " + req.params.leaderboardId});
        }

        if(!leaderboard) {
            return res.status(404).send({message: "leaderboard not found with id " + req.params.leaderboardId});
        }

        res.send({message: "leaderboard deleted successfully!"})
    });
};