var Game = require('../models/game.model.js');

exports.create = function(req, res) {
    // Create and Save a new game
if(!req.body.name) {
        return res.status(400).send({message: "Name can not be empty"});
    }
	//var gameAdd = new Game(req.body);
    var gameAdd = new Game({name: req.body.name, QRcode: req.body.QRcode, pois: req.body.pois, gms: req.body.gms});
    gameAdd.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the game."});
        } else {
            res.send(data);
        }
    });
};
exports.findAll = function(req, res) {
    // Retrieve and return all games from the database.
    Game.find(function(err, games){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving game."});
        } else {
            res.send(games);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single game with a gameId
    Game.findById(req.params.gameId, function(err, game) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "game not found with id " + req.params.gameId});                
            }
            return res.status(500).send({message: "Error retrieving game with id " + req.params.gameId});
        } 

        if(!game) {
            return res.status(404).send({message: "game not found with id " + req.params.gameId});            
        }

        res.send(game);
    });
};
exports.update = function(req, res) {
    // Update a game identified by the gameId in the request
    Game.findById(req.params.gameId, function(err, game) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "game not found with id " + req.params.gameId});                
            }
            return res.status(500).send({message: "Error finding game with id " + req.params.gameId});
        }
        if(!game) {
            return res.status(404).send({message: "game not found with id " + req.params.gameId});            
        }
		game = req.body;
        game.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update game with id " + req.params.gameId});
            } else {
                res.send(data);
            }
        });
    });
};  

exports.delete = function(req, res) {
    // Delete a game with the specified gameId in the request
    Game.findByIdAndRemove(req.params.gameId, function(err, game) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "game not found with id " + req.params.gameId});                
            }
            return res.status(500).send({message: "Could not delete game with id " + req.params.gameId});
        }

        if(!game) {
            return res.status(404).send({message: "game not found with id " + req.params.gameId});
        }
        res.send({message: "game deleted successfully!"})
    });
};