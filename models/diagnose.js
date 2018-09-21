var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiagnoseSchema = new Schema({
    diagnoseId: {type: String, required: true, max: 100},

});


// Export the model
module.exports = mongoose.model('Diagnose', DiagnoseSchema);