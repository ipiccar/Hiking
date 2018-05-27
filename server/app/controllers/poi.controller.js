var Poi = require('../models/poi.model.js');
exports.create = function(req, res) {
    // Create and Save a new poi
if(!req.body.challengeId) {
        return res.status(400).send({message: "ChallengeId can not be empty"});
    }
    var poiAdd = new Poi({challengeId: req.body.challengeId, name: req.body.name, description: req.body.description,coordX: req.body.coordX, coordY: req.body.coordY, notificationRange: req.body.notificationRange, notificationMessage: req.body.notificationMessage});
    poiAdd.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the POI."});
        } else {
            res.send(data);
			console.log("POI added ok");
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    Poi.find(function(err, pois){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving poi."});
        } else {
            res.send(pois);
			console.log("All poi retrieved ok");
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single poi with a poiId
    Poi.findById(req.params.poiId, function(err, poi) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "poi not found with id " + req.params.poiId});                
            }
            return res.status(500).send({message: "Error retrieving poi with id " + req.params.poiId});
        } 

        if(!poi) {
            return res.status(404).send({message: "poi not found with id " + req.params.poiId});            
        }
		console.log("find single poi with poiId");
        res.send(poi);
    });
};

exports.update = function(req, res) {
    // Update a poi identified by the poiId in the request
    Poi.findById(req.params.poiId, function(err, poi) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "poi not found with id " + req.params.poiId});                
            }
            return res.status(500).send({message: "Error finding poi with id " + req.params.poiId});
        }
        if(!poi) {
            return res.status(404).send({message: "poi not found with id " + req.params.poiId});            
        }
        if(req.body.name != null){
        poi.name = req.body.name;}
		if(req.body.challengeId != null){
        poi.challengeId = req.body.challengeId;}
		if(req.body.description != null){
        poi.description = req.body.description;}
		if(req.body.coordX != null){
        poi.coordX = req.body.coordX;}
		if(req.body.coordY != null){
        poi.coordY = req.body.coordY;}
		if(req.body.notificationRange != null){
        poi.notificationRange = req.body.notificationRange;}
		if(req.body.notificationMessage != null){
        poi.notificationMessage = req.body.notificationMessage;}
        poi.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update poi with id " + req.params.poiId});
            } else {
				console.log("Poi updated");
                res.send(data);
            }
        });
    });
};  

exports.delete = function(req, res) {
    // Delete a poi with the specified poiId in the request
    Poi.findByIdAndRemove(req.params.poiId, function(err, poi) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "poi not found with id " + req.params.poiId});                
            }
            return res.status(500).send({message: "Could not delete poi with id " + req.params.poiId});
        }

        if(!poi) {
            return res.status(404).send({message: "poi not found with id " + req.params.poiId});
        }
		console.log("deleted poi ok");
        res.send({message: "poi deleted successfully!"})
    });
};