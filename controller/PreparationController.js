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
       var query = "SELECT [preparationId],[practicalDosisId],[dispenseId],[finalVolume],[roundedVolume],[state],[medicineConcentration],[stability],[acummulatedDoses],[acummulatedApplications],[preparationDate],[expirationDate],[stateDate]FROM [dbo].[Preparation]";
       executeQuery(res, query);
    });

    router.route('/:preparationId/').get(function (req, res) {
        console.log(req.params)
        var query = "SELECT [preparationId],[practicalDosisId],[dispenseId],[finalVolume],[roundedVolume],[state],[medicineConcentration],[stability],[acummulatedDoses],[acummulatedApplications],[preparationDate],[expirationDate],[stateDate]FROM [dbo].[Preparation] where preparationId = " + req.params.preparationId;
        executeQuery(res, query);
     });


     router.route("/").post(function (req, res) {
        var query = "INSERT INTO [dbo].[Preparation]([practicalDosisId],[dispenseId],[finalVolume],[roundedVolume],[state],[medicineConcentration],[stability],[acummulatedDoses],[acummulatedApplications],[preparationDate],[expirationDate],[stateDate]) VALUES("+req.body.practicalDosisId+","+req.body.dispenseId+",'"+req.body.finalVolume+"','"+req.body.roundedVolume+"','"+req.body.state+"',"+req.body.medicineConcentration+","+req.body.stability+",'"+req.body.acummulatedDoses+"','"+req.body.acummulatedApplications+"','"+req.body.preparationDate+"','"+req.body.expirationDate+"','"+req.body.stateDate+"')";
        console.log(query)
        executeQuery(res, query);
    });

    router.route("/:preparationId/").put(function (req, res) {
      //  console.log(req.body)
      //  console.log(res)
        var query = "UPDATE [dbo].[Preparation] SET [practicalDosisId] = "+req.body.practicalDosisId+",[dispenseId] = "+req.body.dispenseId+",[finalVolume] = '"+req.body.finalVolume+"',[roundedVolume] = '"+req.body.roundedVolume+"',[state] = '"+req.body.state+"',[medicineConcentration] = '"+req.body.medicineConcentration+"',[stability] = '"+req.body.stability+"',[acummulatedDoses] = '"+req.body.acummulatedDoses+"',[acummulatedApplications] = '"+req.body.acummulatedApplications+"',[preparationDate] = '"+req.body.preparationDate+"',[expirationDate] = '"+req.body.expirationDate+"',[stateDate] = '"+req.body.stateDate+"' WHERE preparationId ="+req.params.preparationId;
        console.log(query)
        executeQuery(res, query);
    });

    router.route("/:preparationId/").delete(
        function (req, res) {

            var query = "DELETE FROM [dbo].[Preparation] WHERE [preparationId]=" + req.params.preparationId;
            executeQuery(res, query);
        }
    );

    return router;
}

module.exports = routes;