var Diagnose = require('../models/diagnose');



exports.diagnose_create = function (req, res) {
    var diagnose = new Diagnose(
        {
            diagnoseId: req.body.diagnoseId,

        }
    );

    diagnose.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Diagnose Created successfully')
    })
};

exports.diagnose_details = function (req, res) {
    Diagnose.findById(req.params.id, function (err, Diagnose) {
        if (err) return next(err);
        res.send(Diagnose);
    })
};

exports.diagnose_update = function (req, res) {
    Diagnose.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, Diagnose) {
        if (err) return next(err);
        res.send('Diagnose udpated.');
    });
};

exports.diagnose_delete = function (req, res) {
    Diagnose.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};