module.exports = function(app) {

    var user = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/users', user.create);

    // Retrieve all user
    app.get('/users', user.findAll);

    // Retrieve a single user with userId
    app.get('/users/:userId', user.findOne);

    // Retrieve a single user with userName
    app.get('/users/name/:userName', user.findOneByName);

    // Retrieve a single user with userId
    app.post('/users/login', user.login);

    // Update a user with userId
    app.put('/users/:userId', user.update);

    // Delete a user with userId
    app.delete('/users/:userId', user.delete);
}
