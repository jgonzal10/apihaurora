var Patient = require('../models/patient');



exports.patient_create = function (req, res) {
    var patient = new Patient(
        {
            name: req.body.name,
            lastName: req.body.lastName
        }
    );

    patient.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Patient Created successfully')
    })
};

exports.patient_details = function (req, res) {
    Patient.findById(req.params.id, function (err, Patient) {
        if (err) return next(err);
        res.send(Patient);
    })
};

exports.patient_update = function (req, res) {
    Patient.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, Patient) {
        if (err) return next(err);
        res.send('Patient udpated.');
    });
};

exports.patient_delete = function (req, res) {
    Patient.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};