module.exports = function(app) {

    var challenge = require('../controllers/challenge.controller.js');

    // Create a new challenge
    app.post('/challenges', challenge.create);

    // Retrieve all challenge
    app.get('/challenges', challenge.findAll);

    // Retrieve a single challenge with challengeId
    app.get('/challenges/:challengeId', challenge.findOne);

    // Update a challenge with challengeId
    app.put('/challenges/:challengeId', challenge.update);
	
	// Update a challenge with teamId 
    app.put('/challenges/team/:teamId', challenge.updateOneByTeamId);

    // Delete a challenge with challengeId
    app.delete('/challenges/:challengeId', challenge.delete);
}
