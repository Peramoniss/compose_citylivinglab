const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categories.controller');

// Retrieve all employees
router.get('/', categoriesController.findAll);

// Retrieve a single employee with id
router.get('/:id', categoriesController.findById);

module.exports = router