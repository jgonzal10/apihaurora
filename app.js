// app.js

var express = require('express');
var bodyParser = require('body-parser');


var patient = require('./routes/patient'); // Imports routes for the patients
var diagnose = require('./routes/diagnose'); // Imports routes for the diagnose
var medicine = require('./routes/medicine'); // Imports routes for the medicine
var solution = require('./routes/solution'); // Imports routes for the solution
var schema = require('./routes/schema'); // Imports routes for the schema
var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://admin:admin1234@ds255262.mlab.com:55262/feelings';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/patients', patient);
app.use('/medicines', medicine);
app.use('/diagnosis', diagnose);
app.use('/solutions', solution);
app.use('/solutions', schema);

var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
