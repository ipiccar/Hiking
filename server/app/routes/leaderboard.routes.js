module.exports = function(app) {

    var leaderboard = require('../controllers/leaderboard.controller.js');

    // Create a new leaderboard
    app.post('/leaderboards', leaderboard.create);

    // Retrieve all leaderboard
    app.get('/leaderboards', leaderboard.findAll);

    // Retrieve a single leaderboard with leaderboardId
    app.get('/leaderboards/:leaderboardId', leaderboard.findOne);

    // Retrieve a single leaderboard with gameId
    app.get('/leaderboards/:gameId', leaderboard.findOneByGameId);

    // Update a leaderboard with leaderboardId
    app.put('/leaderboards/:leaderboardId', leaderboard.update);

    // Delete a leaderboard with leaderboardId
    app.delete('/leaderboards/:leaderboardId', leaderboard.delete);
}
