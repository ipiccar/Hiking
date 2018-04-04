module.exports = function(app) {

    var team = require('../controllers/team.controller.js');

    // Create a new teams
    app.post('/team', team.create);

    // Retrieve all team
    app.get('/team', team.findAll);

    // Retrieve a single team with teamId
    app.get('/team/:teamId', team.findOne);

    // Update a team with teamId
    app.put('/team/:teamId', team.update);

    // Delete a team with teamId
    app.delete('/team/:teamId', team.delete);
}
