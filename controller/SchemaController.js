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
       var query = "SELECT [schemaId],[schemaName],[schemaCycles],[schemaIntervalCycles],[schemaTotalDays] FROM [dbo].[Schema]";
       executeQuery(res, query);
    });

    router.route('/:schemaId/').get(function (req, res) {
        console.log(req.params)
        var query = "SELECT [schemaId],[schemaName],[schemaCycles],[schemaIntervalCycles],[schemaTotalDays] FROM [dbo].[Schema] where schemaId = " + req.params.schemaId;
        executeQuery(res, query);
     });


     router.route("/").post(function (req, res) {
        var query = "INSERT INTO [dbo].[Schema]([schemaName],[schemaCycles],[schemaIntervalCycles],[schemaTotalDays]) VALUES ('"+req.body.schemaName+"',"+  req.body.schemaCycles + "," +req.body.schemaIntervalCycles + " , " +req.body.schemaIntervalCycles + ")";
        console.log(query)
        executeQuery(res, query);
    });

    router.route("/:schemaId/").put(function (req, res) {
      //  console.log(req.body)
      //  console.log(res)
        var query = "UPDATE [dbo].[Schema]SET [schemaName] = '"+req.body.schemaName+"',[schemaCycles] = "+req.body.schemaCycles+",[schemaIntervalCycles] = "+req.body.schemaIntervalCycles+",[schemaTotalDays] = "+req.body.schemaTotalDays+" WHERE schemaId ="+req.params.schemaId;
        console.log(query)
        executeQuery(res, query);
    });

    router.route("/:schemaId/").delete(
        function (req, res) {

            var query = "DELETE FROM [dbo].[Schema] WHERE [schemaId]=" + req.params.schemaId;
            executeQuery(res, query);
        }
    );

    return router;
}

module.exports = routes;