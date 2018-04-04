module.exports = function(app) {

    var leaderboard = require('../controllers/leaderboard.controller.js');

    // Create a new leaderboard
    app.post('/leaderboard', leaderboard.create);

    // Retrieve all leaderboard
    app.get('/leaderboard', leaderboard.findAll);

    // Retrieve a single leaderboard with leaderboardId
    app.get('/leaderboard/:leaderboardId', leaderboard.findOne);

    // Update a leaderboard with leaderboardId
    app.put('/leaderboard/:leaderboardId', leaderboard.update);

    // Delete a leaderboard with leaderboardId
    app.delete('/leaderboard/:leaderboardId', leaderboard.delete);
}
