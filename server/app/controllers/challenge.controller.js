var Challenge = require('../models/challenge.model.js');
var Team = require('../models/team.model.js');

exports.create = function(req, res) {
    // Create and Save a new challenge
if(!req.body.name) {
        return res.status(400).send({message: "Name can not be empty"});
    }
    var challengeAdd = new Challenge({poiId: req.body.poiId, name: req.body.name, type: req.body.type, isDone: req.body.isDone, points: req.body.points, pointsWon: req.body.pointsWon, penalityTime: req.body.penalityTime, vari:req.body.vari});
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
    // Retrieve and return all challenges from the database.
    Challenge.find(function(err, challenges){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving challenge."});
        } else {
			console.log("All challenges getted");
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
		console.log("Single challenge getted");
        res.send(challenge);
    });
};
exports.updateOneByTeamId = function (req, res){
// Update a challenge by team Id
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
        if(!team) {
            return res.status(404).send({message: "team not found with id " + req.params.teamId});            
        }
	var index = team.challenges.findIndex(function(item, i){
		return item._id == req.body.challengeId
		});
		if(req.body.poiId != null){
			team.challenges[index].poiId = req.body.poiId;}
		
		if(req.body.name != null){
			team.challenges[index].name = req.body.name;}
		
		if(req.body.type != null){
			team.challenges[index].type = req.body.type;}
		
		if(req.body.isDone != null){
			team.challenges[index].isDone = req.body.isDone;}
		
		if(req.body.points != null){
			team.challenges[index].points = req.body.points;}
		
		if(req.body.pointsWon != null){
			team.challenges[index].pointsWon = req.body.pointsWon;}
		
		if(req.body.penalityTime != null){
			team.challenges[index].penalityTime = req.body.penalityTime;}
		
		if(req.body.vari != null){
			team.challenges[index].vari = req.body.vari;}
			
	team.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update challenge with id " + req.params.challengeId});
            } else {
				console.log("updated challenge from one team");
                res.send(data);
            }
        });
		});
};  
exports.update = function(req, res) {
    // Update a challenge identified by the challengeId in the request
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
        if(!challenge) {
            return res.status(404).send({message: "challenge not found with id " + req.params.challengeId});            
        }
		if(req.body.poiId != null){
			challenge.poiId = req.body.poiId;}
		
		if(req.body.name != null){
			challenge.name = req.body.name;}
		
		if(req.body.type != null){
			challenge.type = req.body.type;}
		
		if(req.body.isDone != null){
			challenge.isDone = req.body.isDone;}
		
		if(req.body.points != null){
			challenge.points = req.body.points;}
		
		if(req.body.pointsWon != null){
			challenge.pointsWon = req.body.pointsWon;}
		
		if(req.body.penalityTime != null){
			challenge.penalityTime = req.body.penalityTime;}
		
		if(req.body.vari != null){
			challenge.vari = req.body.vari;}
        challenge.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update challenge with id " + req.params.challengeId});
            } else {
                res.send(data);
				console.log("updated one challenge by challenge id");
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
		console.log("deleted one challenge");
        res.send({message: "challenge deleted successfully!"})
    });
};