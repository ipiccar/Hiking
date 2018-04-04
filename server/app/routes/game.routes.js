module.exports = function(app) {

    var game = require('../controllers/game.controller.js');

    // Create a new game
    app.post('/game', game.create);

    // Retrieve all game
    app.get('/game', game.findAll);

    // Retrieve a single game with gameId
    app.get('/game/:gameId', game.findOne);

    // Update a game with gameId
    app.put('/game/:gameId', game.update);

    // Delete a game with gameId
    app.delete('/game/:gameId', game.delete);
}
