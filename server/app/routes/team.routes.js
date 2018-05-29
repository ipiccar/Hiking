module.exports = function(app) {

    var team = require('../controllers/team.controller.js');

    // Create a new teams
    app.post('/teams', team.create);
	
	//Add user into team
	app.post('/teams/join', team.addUserToTeam);
	
	//Remove user from team
	app.post('/teams/leave', team.removeUserFromTeam);

    // Retrieve all team
    app.get('/teams', team.findAll);

    // Retrieve all team from a game
    app.get('/teams/game/:gameId', team.findAllTeamsFromGame);

    // Retrieve a single team with teamId
    app.get('/teams/:teamId', team.findOne);

    // Update a team with teamId
    app.put('/teams/:teamId', team.update);

    // Delete a team with teamId
    app.delete('/teams/:teamId', team.delete);
}
