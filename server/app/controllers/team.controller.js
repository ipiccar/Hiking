var Team = require('../models/team.model.js');
var User = require('../models/user.model.js');
var Game = require('../models/game.model.js');
var Challenge = require('../models/challenge.model.js');


exports.create = function (req, res) {
    // Create and Save a new team
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }

    var challengesToSave = [];
    var gameToSave;
    var usersToSave = [];

    Game.findById(req.body.gameId, function (err, game) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Game not found for game " + req.body.gameId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Game with gameId " + req.body.gameId
            });
        }
        if (game) {
            return game;
        }
    }).then(function (game) {
        //console.log("-----------------GAME", game);
        gameToSave = game;
        var challenges = [];
        let allPois = game.pois.map(poi => {
            return Challenge.findById(poi.challengeId, function (err, challenge) {
                if (err) {
                    console.log(err);
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "challenge not found with id " + poi.challengeId
                        });
                    }
                    return res.status(500).send({
                        message: "Error retrieving challenge with id " + poi.challengeId
                    });
                }
                if (!challenge) {
                    return res.status(404).send({
                        message: "challenge not found with id " + poi.challengeId
                    });
                }
                //console.log("-----------------CHALLENGE", challenge);
                if (challenge) {
                    challenges.push(challenge);
                    return challenge;

                }
            })
        });
        Promise.all(allPois).then(function (trash) {
            return challenges;
        }).then(function (challenges) {
            //console.log("-----------------CHALLENGES", challenges);
            challengesToSave = challenges;
            User.findById(req.body.userId, function (err, user) {
                if (err) {
                    console.log(err);
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "User not found with id " + req.body.userId
                        });
                    }
                    return res.status(500).send({
                        message: "Error retrieving User with id " + req.body.userId
                    });
                }

                if (!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.bodu.userId
                    });
                }
                if (user) {
                    return user;
                }
            }).then(function (user) {
                usersToSave.push(user);
                var teamAdd = new Team({
                    gameId: gameToSave._id,
                    name: req.body.name,
                    challenges: challengesToSave,
                    users: usersToSave
                });
                //console.log("-----------------TEAM ADD", teamAdd);
                teamAdd.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({
                            message: "Some error occurred while creating the Team"
                        });
                    } else {
                        res.send(data);
                        console.log("team added ok ISAAAAA");
                    }
                });
            });
        });
    })

}



// exports.create = function (req, res) {
//     // Create and Save a new team
//     if (!req.body.name) {
//         return res.status(400).send({
//             message: "Name can not be empty"
//         });
//     }
//     Game.findById(
//         req.body.gameId,
//         function (err, game) {
//             if (err) {
//                 console.log(err);
//                 if (err.kind === 'ObjectId') {
//                     return res.status(404).send({
//                         message: "Game not found for game " + req.params.gameId
//                     });
//                 }
//                 return res.status(500).send({
//                     message: "Error retrieving Game with gameId " + req.params.gameId
//                 });
//             }
//             if (!game) {
//                 return res.status(404).send({
//                     message: "Game not found for gameId " + req.params.gameId
//                 });
//             }
//             console.log("Game from gameId getted");
//             User.findById(req.body.userId, function (err, user) {
//                 if (err) {
//                     console.log(err);
//                     if (err.kind === 'ObjectId') {
//                         return res.status(404).send({
//                             message: "User not found with id " + req.body.userId
//                         });
//                     }
//                     return res.status(500).send({
//                         message: "Error retrieving User with id " + req.body.userId
//                     });
//                 }

//                 if (!user) {
//                     return res.status(404).send({
//                         message: "User not found with id " + req.bodu.userId
//                     });
//                 }
//                 console.log("Find single User ok");
//                 var users = [];
//                 var challengesR = [];
//                 users.push(user);
//                 var teamAdd = new Team({
//                     gameId: req.body.gameId,
//                     name: req.body.name,
//                     challenges: challengesR,
//                     users: users
//                 });
//                 teamAdd.save(function (err, data) {
//                     if (err) {
//                         console.log(err);
//                         res.status(500).send({
//                             message: "Some error occurred while creating the Team."
//                         });
//                     } else {
//                         console.log("Creating team");
//                         var toSendTeamAdd;
//                         game.pois.forEach(function (poi) {
//                             console.log(poi.challengeId);
//                             var challProm = Challenge.findById(poi.challengeId, function (err, challenge) {
//                                 if (err) {
//                                     console.log(err);
//                                     if (err.kind === 'ObjectId') {
//                                         return res.status(404).send({
//                                             message: "challenge not found with id " + poi.challengeId
//                                         });
//                                     }
//                                     return res.status(500).send({
//                                         message: "Error retrieving challenge with id " + poi.challengeId
//                                     });
//                                 }
//                                 if (!challenge) {
//                                     return res.status(404).send({
//                                         message: "challenge not found with id " + poi.challengeId
//                                     });
//                                 }
//                                 console.log("Find single challenge ok");
//                                 return challenge;
//                             });
//                             challProm.then(function (toAdd) {
//                                 challengesR.push(toAdd);
//                                 Team.findById(data._id, function (err, team2) {
//                                     if (err) {
//                                         console.log(err);
//                                         if (err.kind === 'ObjectId') {
//                                             return res.status(404).send({
//                                                 message: "team not found with id " + req.params.teamId
//                                             });
//                                         }
//                                         return res.status(500).send({
//                                             message: "Error finding team with id " + req.params.teamId
//                                         });
//                                     }
//                                     if (!team2) {
//                                         return res.status(404).send({
//                                             message: "team not found with id " + req.params.teamId
//                                         });
//                                     }
//                                         team2.challenges = challengesR;
//                                     toSendTeamAdd = team2.save(function (err, data2) {
//                                         if (err) {
//                                                 return res.status(500).send({
//                                                 message: "Could not update team with id " + req.params.teamId
//                                             });
//                                         } else {
//                                             return data2
//                                             console.log("OK TEAM CREATED OMMMGGGGG");
//                                         }
//                                     });
//                                 });
//                             });
//                         });
//                         toSendTeamAdd.then(function (toSend){
//                             console.log("INTO TO SENT", toSend);
//                         res.send(toSend);
//                         });
//                     }
//                 });
//             });
//         });

// };

exports.findAll = function (req, res) {
    // Retrieve and return all games from the database.
    Team.find(function (err, teams) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving team."
            });
        } else {
            res.send(teams);
            console.log("All team getted ok");
        }
    });
};

exports.findAllTeamsFromGame = function (req, res) {
    // Retrieve and return all games from the database.
    Team.find({
        gameId: req.params.gameId
    }, function (err, teams) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving teams.",
                error: err
            });
        } else {
            res.send(teams);
            console.log("All teams from gameid ok");
        }
    });
};

exports.findOne = function (req, res) {
    // Find a single team with a teamId
    Team.findById(req.params.teamId, function (err, team) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "team not found with id " + req.params.teamId
                });
            }
            return res.status(500).send({
                message: "Error retrieving team with id " + req.params.teamId
            });
        }

        if (!team) {
            return res.status(404).send({
                message: "team not found with id " + req.params.teamId
            });
        }
        res.send(team);
        console.log("Find single team ok");
    });
};

exports.addUserToTeam = function (req, res) {
    Team.findById(req.body.teamId, function (err, team) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "team not found with id " + req.body.teamId
                });
            }
            return res.status(500).send({
                message: "Error retrieving team with id " + req.body.teamId
            });
        }
        if (!team) {
            return res.status(404).send({
                message: "team not found with id " + req.body.teamId
            });
        }
        User.findById(req.body.userId, function (err, user) {
            if (err) {
                console.log(err);
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "user not found with id " + req.body.userId
                    });
                }
                return res.status(500).send({
                    message: "user retrieving team with id " + req.body.userId
                });
            }

            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.body.userId
                });
            }
            var index = team.users.findIndex(function (item, i) {
                return item._id == req.body.userId
            });
            if (index != -1) {
                res.send("false");
                console.log("User already added to team");
            } else {
                team.users.push(user);
                console.log("User added to team");
                team.save(function (err, data) {
                    if (err) {
                        res.status(500).send({
                            message: "Could not update team with id " + req.body.teamId
                        });
                    } else {
                        res.send("true");
                        console.log("u added user to team");
                    }
                });
            }
        });
    });
}
exports.removeUserFromTeam = function (req, res) {
    Team.findById(req.body.teamId, function (err, team) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "team not found with id " + req.body.teamId
                });
            }
            return res.status(500).send({
                message: "Error retrieving team with id " + req.body.teamId
            });
        }
        if (!team) {
            return res.status(404).send({
                message: "team not found with id " + req.body.teamId
            });
        }
        var index = team.users.findIndex(function (item, i) {
            return item._id == req.body.userId
        });
        if (index != -1) {
            team.users.splice(index, 1);
            console.log(index);
            team.save(function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        message: "Could not update team with id " + req.body.teamId
                    });
                } else {
                    res.send("true");
                    console.log("u deleted a user from a team");
                }
            });
        } else
            res.send("false");
    });
}
exports.update = function (req, res) {
    // Update a team identified by the teamId in the request
    Team.findById(req.params.teamId, function (err, team) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "team not found with id " + req.params.teamId
                });
            }
            return res.status(500).send({
                message: "Error finding team with id " + req.params.teamId
            });
        }
        if (!team) {
            return res.status(404).send({
                message: "team not found with id " + req.params.teamId
            });
        }
        if (req.body.gameId != null) {
            team.gameId = req.body.gameId;
        }
        if (req.body.name != null) {
            team.name = req.body.name;
        }
        if (req.body.challenges != null) {
            team.challenges = req.body.challenges;
        }
        if (req.body.gms != null) {
            team.gms = req.body.gms;
        }
        team.save(function (err, data) {
            if (err) {
                res.status(500).send({
                    message: "Could not update team with id " + req.params.teamId
                });
            } else {
                res.send(data);
                console.log("update team with team id ok");
            }
        });
    });
};

exports.delete = function (req, res) {
    // Delete a game with the specified gameId in the request
    Team.findByIdAndRemove(req.params.teamId, function (err, team) {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "team not found with id " + req.params.teamId
                });
            }
            return res.status(500).send({
                message: "Could not delete team with id " + req.params.teamId
            });
        }

        if (!team) {
            return res.status(404).send({
                message: "team not found with id " + req.params.teamId
            });
        }
        console.log("Deleted team ok");
        res.send({
            message: "team deleted successfully!"
        })
    });
};