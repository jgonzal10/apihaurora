var express = require('express');
var router = express.Router();


var solution_controller = require('../controllers/solution');

router.post('/create', solution_controller.solution_create);

router.get('/:id', solution_controller.solution_details);

router.put('/:id/update', solution_controller.solution_update);

router.delete('/:id/delete', solution_controller.solution_delete);


module.exports = router;