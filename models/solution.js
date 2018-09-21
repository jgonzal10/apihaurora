var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SolutionSchema = new Schema({
    solutionId: {type: String, required: true, max: 100},

});


// Export the model
module.exports = mongoose.model('Solution', SolutionSchema);