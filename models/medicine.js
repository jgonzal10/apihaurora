var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MedicineSchema = new Schema({
    medicineId: {type: String, required: true, max: 100},

});


// Export the model
module.exports = mongoose.model('Medicine', MedicineSchema);