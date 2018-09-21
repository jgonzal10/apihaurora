var Schema = require('../models/schema');



exports.schema_create = function (req, res) {
    var schema = new Schema(
        {
            name: req.body.name,

        }
    );

    schema.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Schema Created successfully')
    })
};

exports.schema_details = function (req, res) {
    Schema.findById(req.params.id, function (err, Schema) {
        if (err) return next(err);
        res.send(Schema);
    })
};

exports.schema_update = function (req, res) {
    Schema.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, Schema) {
        if (err) return next(err);
        res.send('Schema udpated.');
    });
};

exports.schema_delete = function (req, res) {
    Schema.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};