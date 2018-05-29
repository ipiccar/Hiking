var Notification = require('../models/notification.model.js');
exports.create = function(req, res) {
    // Create and Save a new notification
if(!req.body.gameId) {
        return res.status(400).send({message: "gameId can not be empty"});
    }
    var notificationAdd = new Notification({gameId: req.body.gameId, teams: req.body.teams, description: req.body.description, timestamp : req.body.timestamp});
    notificationAdd.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Notification."});
        } else {
            res.send(data);
			console.log("Notification added ok");
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all notifications from the database.
    Notification.find(function(err, notifications){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving notifications"});
        } else {
            res.send(notifications);
			console.log("All notifications retrieved ok");
        }
    });
};

exports.getByGameId = function(req, res){
    //retrieve notifications by game ID
    Notification.find({
        gameId: req.params.gameId
    }, function (err, games) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving games.",
                error: err
            });
        } else {
            res.send(games);
            console.log("All games from gameid ok");
        }
    });

}