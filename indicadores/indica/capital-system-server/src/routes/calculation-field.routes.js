const express = require('express')
const router = express.Router()
const calculationFieldController = require('../controllers/calculation-field.controller');

// Retrieve all fileBases
router.get('/', calculationFieldController.findAll);

// Create a new fileBase
router.post('/', calculationFieldController.create);

// Retrieve a single fileBase with id
router.get('/:id/:indicators_field_id', calculationFieldController.findById);

// Update a fileBase with id
router.put('/:id/:indicators_field_id', calculationFieldController.update);

// Delete a fileBase with id
router.delete('/:id/:indicators_field_id', calculationFieldController.delete);

module.exports = router