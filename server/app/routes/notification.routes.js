module.exports = function(app) {

    var notification = require('../controllers/notification.controller.js');

    // Create a new notification
    app.post('/notifications', notification.create);

    // Retrieve all notification
    app.get('/notifications', notification.findAll);

    //notification by gameId
    app.get('/notifications/game/:gameId', notification.getByGameId);

    // Retrieve a single notification with notificationId
    //app.get('/notifications/:notificationId', notification.findOne);

    // Update a notification with notificationId
    //app.put('/notifications/:notificationId', notification.update);

    // Delete a notification with notificationId
    //app.delete('/notifications/:notificationId', notification.delete);
}
