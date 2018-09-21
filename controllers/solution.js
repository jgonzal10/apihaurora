var Solution = require('../models/solution');



exports.solution_create = function (req, res) {
    var solution = new Solution(
        {
            name: req.body.name,

        }
    );

    solution.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Solution Created successfully')
    })
};

exports.solution_details = function (req, res) {
    Solution.findById(req.params.id, function (err, Solution) {
        if (err) return next(err);
        res.send(Solution);
    })
};

exports.solution_update = function (req, res) {
    Solution.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, Solution) {
        if (err) return next(err);
        res.send('Solution udpated.');
    });
};

exports.solution_delete = function (req, res) {
    Solution.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};