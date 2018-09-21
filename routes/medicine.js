var express = require('express');
var router = express.Router();


var medicine_controller = require('../controllers/medicine');

router.post('/create', medicine_controller.medicine_create);

router.get('/:id', medicine_controller.medicine_details);

router.put('/:id/update', medicine_controller.medicine_update);

router.delete('/:id/delete', medicine_controller.medicine_delete);


module.exports = router;
