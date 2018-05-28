module.exports = function(app) {

    var poi = require('../controllers/poi.controller.js');

    // Create a new poi
    app.post('/pois', poi.create);

    // Retrieve all poi
    app.get('/pois', poi.findAll);

    // Retrieve a single poi with poiId
    app.get('/pois/:poiId', poi.findOne);

    // Update a poi with poiId
    app.put('/pois/:poiId', poi.update);

    // Delete a poi with poiId
    app.delete('/pois/:poiId', poi.delete);
}
