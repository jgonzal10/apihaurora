//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 



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

//Initiallising connection string
var dbConfig = {
    user:  "sa",
    password: "jgodev1037",
    server: "localhost",
    database:"oncopro",    
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){             
     sql.connect(dbConfig, function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         var request = new sql.Request();
                         // query to the database
                         request.query(query, function (err, rs) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.send(err);
                                     }
                                     else {
                                         console.log('db connection ',res)
                                         res.send(rs);
                                            }
                               });
                       }
      });           
}


/**
 * 
 * Patients EndPoints
 */

 
app.get("/api/patient", function(req , res){
    var query = "SELECT [patientId]    ,[patientName]    ,[patientGender]    ,[patientAge]    ,[patientWeight]    ,[patientHeight]    ,[patientCorporalSurfice]    ,[idNumber]    ,[patientLastName] FROM [dbo].[Patient]";
    executeQuery (res, query);
});


 app.post("/api/patient", function(req , res){
               var query = "INSERT INTO [dbo].[Patient]               ([patientName]               ,[patientGender]               ,[patientAge]               ,[patientWeight]               ,[patientHeight]               ,[patientCorporalSurfice]               ,[idNumber]               ,[patientLastName])         VALUES               ('kim Gibson'               ,'f'               ,2324               ,'f'               ,'56'               ,'45'               ,34324               ,'thomson')";
             executeQuery (res, query);
});

app.put("/api/patient/:patientId", function(req , res){
    console.log(req)
    var query = "UPDATE [dbo].[Patient]    SET [patientName] = 'Gracia'       ,[patientGender] = 'f'       ,[patientAge] = 43       ,[patientWeight] = '54'       ,[patientHeight] = '65'       ,[patientCorporalSurfice] = '43'       ,[idNumber] = '3234656'       ,[patientLastName] = 'Resende'  WHERE [patientId] =" +req.params.patientId;
    console.log(query)
    executeQuery (res, query);
});

app.delete("/api/patient/:patientId", function(req , res){
    console.log(req.params)
    console.log()
    var query = "DELETE FROM [dbo].[Patient] WHERE [patientId]=" + req.params.patientId;
    executeQuery (res, query);
});