'use strict';

const Categories = require('../models/categories.model');

exports.findAll = function(req, res) {
    Categories.findAll(function(err, categories) {
    if (err)
    res.send(err);
    res.send(categories);
  });
};

exports.findById = function(req, res) {
    Categories.findById(req.params.id, function(err, categories) {
        if (err)
        res.send(err);
        res.json(categories);
    });
};