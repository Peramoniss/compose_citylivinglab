const express = require('express')
const router = express.Router()
const indicatorsController = require('../controllers/indicators.controller');

// Retrieve all employees
router.get('/', indicatorsController.findAll);

router.get('/category/:codeCategory', indicatorsController.findAllCategory);

// Retrieve a single employee with id
router.get('/:id', indicatorsController.findById);

module.exports = router