var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaSchema = new Schema({
    schemaId: {type: String, required: true, max: 100},

});


// Export the model
module.exports = mongoose.model('Schema', SchemaSchema);