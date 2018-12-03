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
       var query = "SELECT [practicalDoseId],[medicineId],[patientId],[doseValue],[doseVolume],[preparationDate]FROM [dbo].[PracticalDose]";
       executeQuery(res, query);
    });

    router.route('/:practicalDoseId/').get(function (req, res) {
        console.log(req.params)
        var query = "SELECT [practicalDoseId],[medicineId],[patientId],[doseValue],[doseVolume],[preparationDate]FROM [dbo].[PracticalDose] where practicalDoseId = " + req.params.practicalDoseId;
        executeQuery(res, query);
     });


     router.route("/").post(function (req, res) {
        var query = "INSERT INTO [dbo].[PracticalDose]([medicineId],[patientId],[doseValue],[doseVolume],[preparationDate])VALUES(" +req.body.medicineId + "," +req.body.patientId + ",'" +req.body.doseValue + "','" +req.body.doseVolume + "','" +req.body.preparationDate + "')";
        console.log(query)
        executeQuery(res, query);
    });

    router.route("/:practicalDoseId/").put(function (req, res) {
      //  console.log(req.body)
      //  console.log(res)
        var query = "UPDATE [dbo].[PracticalDose]SET [medicineId] = '"+req.body.medicineId+"',[patientId] = "+req.body.patientId+",[doseValue] = '"+req.body.doseValue+"',[doseVolume] = '"+req.body.doseVolume+"',[preparationDate] = '"+req.body.preparationDate+"'WHERE practicalDoseId ="+req.params.practicalDoseId;
        console.log(query)
        executeQuery(res, query);
    });

    router.route("/:practicalDoseId/").delete(
        function (req, res) {

            var query = "DELETE FROM [dbo].[PracticalDose] WHERE [practicalDoseId]=" + req.params.practicalDoseId;
            executeQuery(res, query);
        }
    );

    return router;
}

module.exports = routes;