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
       var query = "SELECT [medicineId],[genericName],[factor],[ref_cal],[maxApplicationDose],[maxAcumDose] FROM [dbo].[Medicine]";
       executeQuery(res, query);
    });

    router.route('/:medicineId/').get(function (req, res) {
        var query = "SELECT [medicineId],[genericName],[factor],[ref_cal],[maxApplicationDose],[maxAcumDose] FROM [dbo].[Medicine] where medicineId = " + req.params.medicineId;
        executeQuery(res, query);
     });


     router.route("/").post(function (req, res) {
         console.log(req.body)
        var query = "INSERT INTO [dbo].[Medicine] ([genericName],[factor],[ref_cal],[maxApplicationDose],[maxAcumDose])VALUES ('"+req.body.genericName+"','"+  req.body.factor + " ',' " +req.body.ref_cal + " ',' " +req.body.maxApplicationDose + " ',' " +req.body.maxAcumDose + "')";
        console.log(query)
        executeQuery(res, query);
    });

    router.route("/:medicineId/").put(function (req, res) {

        var query = "UPDATE [dbo].[Medicine]    SET [genericName] = '"+req.body.genericName+"' ,[factor] = '"+req.body.factor+"',[ref_cal] = '"+req.body.ref_cal+"' ,[maxApplicationDose] = '"+req.body.maxApplicationDose+"' ,[maxAcumDose] = '"+req.body.maxAcumDose+"'  WHERE [medicineId] =" + req.params.medicineId;
        console.log(query)
        executeQuery(res, query);
    });

    router.route("/:medicineId/").delete(
        function (req, res) {

            var query = "DELETE FROM [dbo].[Medicine] WHERE [medicineId]=" + req.params.medicineId;
            executeQuery(res, query);
        }
    );

    return router;
}

module.exports = routes;