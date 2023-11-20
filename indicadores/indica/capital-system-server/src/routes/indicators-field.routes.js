const express = require('express')
const router = express.Router()
const indicatorsFieldController = require('../controllers/indicators-field.controller');

// Retrieve all fileBases
router.get('/', indicatorsFieldController.findAll);

// Create a new fileBase
router.post('/', indicatorsFieldController.create);

// Retrieve a single fileBase with id
router.get('/:id/:base_id', indicatorsFieldController.findById);

// Update a fileBase with id
router.put('/:id/:base_id', indicatorsFieldController.update);

// Delete a fileBase with id
router.delete('/:id/:base_id', indicatorsFieldController.delete);

module.exports = router