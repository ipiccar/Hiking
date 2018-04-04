module.exports = function(app) {

    var challenge = require('../controllers/challenge.controller.js');

    // Create a new challenge
    app.post('/challenge', challenge.create);

    // Retrieve all challenge
    app.get('/challenge', challenge.findAll);

    // Retrieve a single challenge with challengeId
    app.get('/challenge/:challengeId', challenge.findOne);

    // Update a challenge with challengeId
    app.put('/challenge/:challengeId', challenge.update);

    // Delete a challenge with challengeId
    app.delete('/challenge/:challengeId', challenge.delete);
}
