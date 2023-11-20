'use strict';

const CalculationField = require('../models/calculation-field.model');

exports.findAll = function(req, res) {
    CalculationField.findAll(req.query, function(err, indicatorsField) {
    if (err)
        res.send(err);
    console.log('res', indicatorsField);
    res.send(indicatorsField);
  });
};

exports.create = function(req, res) {
    const new_indicatorsField = new CalculationField(req.body);
    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        CalculationField.create(new_indicatorsField, function(err, indicatorsField) {
            if (err)
                res.send(err);
            res.json({error:false,message:"CalculationField added successfully!",data:indicatorsField});
        });
    }
};


exports.findById = function(req, res) {
    CalculationField.findById(req.params.id, req.params.indicators_field_id, function(err, indicatorsField) {
        if (err)
            res.send(err);
        res.json(indicatorsField);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        CalculationField.update(req.params.id, req.params.indicators_field_id, new CalculationField(req.body), function(err, indicatorsField) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'CalculationField successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    CalculationField.delete( req.params.id, req.params.indicators_field_id, function(err, indicatorsField) {
    if (err)
        res.send(err);
    res.json({ error:false, message: 'CalculationField successfully deleted' });
  });
};