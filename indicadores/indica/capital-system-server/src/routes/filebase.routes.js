const express = require('express')
const router = express.Router()
const fileBaseController = require('../controllers/filebase.controller');

// Retrieve all fileBases
router.get('/', fileBaseController.findAll);

//Integration filebases
router.post('/integration', fileBaseController.integration);

// Create a new fileBase
router.post('/', fileBaseController.create);

// Retrieve a single fileBase with id
router.get('/:id', fileBaseController.findById);

// Update a fileBase with id
router.put('/:id', fileBaseController.update);

// Delete a fileBase with id
router.delete('/:id', fileBaseController.delete);

module.exports = router