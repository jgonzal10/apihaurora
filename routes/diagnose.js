var express = require('express');
var router = express.Router();


var diagnose_controller = require('../controllers/diagnose');

router.post('/create', diagnose_controller.diagnose_create);

router.get('/:id', diagnose_controller.diagnose_details);

router.put('/:id/update', diagnose_controller.diagnose_update);

router.delete('/:id/delete', diagnose_controller.diagnose_delete);


module.exports = router;