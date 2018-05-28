module.exports = function(app) {

    var game = require('../controllers/game.controller.js');

    // Create a new game
    app.post('/games', game.create);

    // Retrieve all game
    app.get('/games', game.findAll);

    // Retrieve a single game with gameId
    app.get('/games/:gameId', game.findOne);

    // Update a game with gameId
    app.put('/games/:gameId', game.update);

    // Delete a game with gameId
    app.delete('/games/:gameId', game.delete);
}
