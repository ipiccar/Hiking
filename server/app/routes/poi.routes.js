module.exports = function(app) {

    var poi = require('../controllers/poi.controller.js');

    // Create a new poi
    app.post('/poi', poi.create);

    // Retrieve all poi
    app.get('/poi', poi.findAll);

    // Retrieve a single poi with poiId
    app.get('/poi/:poiId', poi.findOne);

    // Update a poi with poiId
    app.put('/poi/:poiId', poi.update);

    // Delete a poi with poiId
    app.delete('/poi/:poiId', poi.delete);
}
