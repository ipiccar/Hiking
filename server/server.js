var express = require('express');
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer({ dest: './uploads/'})
// create express app
var app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
   // useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Bienvenue sur notre application de Hiking"});
});

// Require routes
require('./app/routes/user.routes.js')(app);
require('./app/routes/poi.routes.js')(app);
require('./app/routes/leaderboard.routes.js')(app);
require('./app/routes/challenge.routes.js')(app);
require('./app/routes/game.routes.js')(app);
require('./app/routes/team.routes.js')(app);
require('./app/routes/notification.routes.js')(app);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/upload", multer({dest: "./uploads/"}).single("file"), function(req, res) {
    console.log(req.body);
    console.log(req.file);
    res.send(req.file);
});

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
