const express        = require('express');
const mongo          = require('mongodb');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const dbConfig       = require('./config/db');
var mongoose         = require('mongoose');

// Initialize http server
const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.url, {
    //useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});

require('./routes/user_routes.js')(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
});
