var Medicine = require('../models/medicine');



exports.medicine_create = function (req, res) {
    var medicine = new Medicine(
        {
            name: req.body.name,

        }
    );

    medicine.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Medicine Created successfully')
    })
};

exports.medicine_details = function (req, res) {
    Medicine.findById(req.params.id, function (err, Medicine) {
        if (err) return next(err);
        res.send(Medicine);
    })
};

exports.medicine_update = function (req, res) {
    Medicine.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, Medicine) {
        if (err) return next(err);
        res.send('Medicine udpated.');
    });
};

exports.medicine_delete = function (req, res) {
    Medicine.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};