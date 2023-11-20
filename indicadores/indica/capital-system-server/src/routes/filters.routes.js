const express = require('express')
const router = express.Router()
const filtersController = require('../controllers/filters.controller');

// Retrieve all fileBases
router.get('/', filtersController.findAll);

// Create a new fileBase
router.post('/', filtersController.create);

// Retrieve a single fileBase with id
router.get('/:id/:indicators_field_id', filtersController.findById);

// Update a fileBase with id
router.put('/:id/:indicators_field_id', filtersController.update);

// Delete a fileBase with id
router.delete('/:id/:indicators_field_id', filtersController.delete);

module.exports = router