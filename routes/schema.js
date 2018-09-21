var express = require('express');
var router = express.Router();


var schema_controller = require('../controllers/schema');

router.post('/create', schema_controller.schema_create);

router.get('/:id', schema_controller.schema_details);

router.put('/:id/update', schema_controller.schema_update);

router.delete('/:id/delete', schema_controller.schema_delete);


module.exports = router;