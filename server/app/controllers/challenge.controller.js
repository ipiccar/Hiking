var Challenge = require('../models/challenge.model.js');

exports.create = function(req, res) {
    // Create and Save a new challenge
if(!req.body.name) {
        return res.status(400).send({message: "Name can not be empty"});
    }
    var challengeAdd = new Challenge({poidId: req.body.poidId, name: req.body.name, type: req.body.type, isDone: req.body.isDone, points: req.body.points, pointsWon: req.body.pointsWon, penalityTime: req.body.penalityTime, vari:req.body.vari});
    challengeAdd.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the challenge."});
        } else {
            res.send(data);
        }
    });
};
exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    Challenge.find(function(err, challenges){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving challenge."});
        } else {
            res.send(challenges);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single challenge with a noteId
    Challenge.findById(req.params.challengeId, function(err, challenge) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "challenge not found with id " + req.params.challengeId});                
            }
            return res.status(500).send({message: "Error retrieving challenge with id " + req.params.challengeId});
        } 

        if(!challenge) {
            return res.status(404).send({message: "challenge not found with id " + req.params.challengeId});            
        }

        res.send(challenge);
    });
};

exports.update = function(req, res) {
    // Update a note identified by the noteId in the request
    Challenge.findById(req.params.challengeId, function(err, challenge) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "challenge not found with id " + req.params.challengeId});                
            }
            return res.status(500).send({message: "Error finding challenge with id " + req.params.challengeId});
        }
        if(!challenge) {
            return res.status(404).send({message: "challenge not found with id " + req.params.challengeId});            
        }
        challenge.poiId = req.body.poiId;
		challenge.name = req.body.name;
		challenge.type = req.body.type;
		challenge.isDone = req.body.isDone;
		challenge.points = req.body.points;
		challenge.pointsWon = req.body.pointsWon;
		challenge.penalityTime = req.body.penalityTime;
		challenge.vari = req.body.vari;
        challenge.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update challenge with id " + req.params.challengeId});
            } else {
                res.send(data);
            }
        });
    });
};  

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request
    Challenge.findByIdAndRemove(req.params.challengeId, function(err, challenge) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "challenge not found with id " + req.params.challengeId});                
            }
            return res.status(500).send({message: "Could not delete challenge with id " + req.params.challengeId});
        }

        if(!challenge) {
            return res.status(404).send({message: "challenge not found with id " + req.params.challengeId});
        }

        res.send({message: "challenge deleted successfully!"})
    });
};