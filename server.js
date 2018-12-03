//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Body Parser Middleware
app.use(bodyParser.json());
var patientController = require('./controller/PatientController')();
var medicineController = require('./controller/MedicineController')();
var schemaController = require('./controller/SchemaController')();
var preparationController = require('./controller/PreparationController')();
var practicalDoseController = require('./controller/PracticalDoseController')();

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});



//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});



app.use("/api/patient", patientController);
app.use("/api/medicine", medicineController);
app.use("/api/schema", schemaController);
app.use("/api/preparation", preparationController);
app.use("/api/practicalDose", practicalDoseController);


/**
 * 
 * Patients EndPoints
 */
app.get("/", function (req, res) {
    res.send('Welcome to Haurora')
});




