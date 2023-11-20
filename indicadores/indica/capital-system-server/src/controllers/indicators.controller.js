'use strict';

const Indicators = require('../models/indicators.model');

exports.findAll = function(req, res) {
    Indicators.findAll(function(err, indicators) {
    if (err)
    res.send(err);
    res.send(indicators);
  });
};

exports.findById = function(req, res) {
    Indicators.findById(req.params.id, function(err, indicators) {
        if (err)
        res.send(err);
        res.json(indicators);
    });
};

exports.findAllCategory = function(req, res) {
    Indicators.findAllCategory(req.params.codeCategory, function(err, indicators) {
        if (err)
        res.send(err);
        res.json(indicators);
    });
};