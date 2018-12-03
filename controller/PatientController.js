var express = require("express");
var router = express.Router();
var sql = require("mssql");


//Initiallising connection string
var dbConfig = {
    user: "sa",
    password: "jgodev1037",
    server: "localhost",
    database: "oncopro",
};

//Function to connect to database and execute query
var executeQuery = function (res, query) {
    // console.log('connection ', dbConfig)
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
                    //   console.log('db connection ',res)
                    res.send(rs);
                }
            });
        }
    });
}


var routes = function () {
    
    router.route('/').get(function (req, res) {
       // res.send('Welcome to patients')
       var query = "SELECT [patientId]    ,[patientName]    ,[patientGender]    ,[patientAge]    ,[patientWeight]    ,[patientHeight]    ,[patientCorporalSurfice]    ,[idNumber]    ,[patientLastName] FROM [dbo].[Patient]";
       executeQuery(res, query);
    });

    router.route('/:patientId/').get(function (req, res) {
        console.log(req.params)
        var query = "SELECT [patientId]    ,[patientName]    ,[patientGender]    ,[patientAge]    ,[patientWeight]    ,[patientHeight]    ,[patientCorporalSurfice]    ,[idNumber]    ,[patientLastName] FROM [dbo].[Patient] where patientId = " + req.params.patientId;
        executeQuery(res, query);
     });


     router.route("/").post(function (req, res) {
        var query = "INSERT INTO [dbo].[Patient]  ([patientName],[patientGender] ,[patientAge],[patientWeight],[patientHeight],[patientCorporalSurfice],[idNumber],[patientLastName]) VALUES ('"+req.body.patientName+"','"+  req.body.patientGender + " ',' " +req.body.patientAge + " ',' " +req.body.patientWeight + " ',' " +req.body.patientHeight + " ',' " +req.body.patientCorporalSurfice + " ',' " +req.body.idNumber + " ',' " + req.body.patientLastName+"')";
        console.log(query)
        executeQuery(res, query);
    });

    router.route("/:patientId/").put(function (req, res) {
      //  console.log(req.body)
      //  console.log(res)
        var query = "UPDATE [dbo].[Patient]    SET [patientName] = '"+req.body.patientName+"' ,[patientGender] = '"+req.body.patientGender+"',[patientAge] = "+req.body.patientAge+" ,[patientWeight] = "+req.body.patientWeight+" ,[patientHeight] = "+req.body.patientHeight+",[patientCorporalSurfice] = '"+req.body.patientCorporalSurfice+"'  ,[idNumber] = "+req.body.idNumber+",[patientLastName] = '"+req.body.patientLastName+"'  WHERE [patientId] =" + req.params.patientId;
       // console.log(query)
        executeQuery(res, query);
    });

    router.route("/:patientId/").delete(
        function (req, res) {

            var query = "DELETE FROM [dbo].[Patient] WHERE [patientId]=" + req.params.patientId;
            executeQuery(res, query);
        }
    );

    return router;
}

module.exports = routes;