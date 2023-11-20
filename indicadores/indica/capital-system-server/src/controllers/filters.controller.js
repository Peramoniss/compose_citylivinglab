'use strict';

const FilterIndicatorsField = require('../models/filters.model');

exports.findAll = function(req, res) {
    FilterIndicatorsField.findAll(req.query, function(err, indicatorsField) {
    if (err)
        res.send(err);
    console.log('res', indicatorsField);
    res.send(indicatorsField);
  });
};

exports.create = function(req, res) {
    const new_indicatorsField = new FilterIndicatorsField(req.body);
    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        FilterIndicatorsField.create(new_indicatorsField, function(err, indicatorsField) {
            if (err)
                res.send(err);
            res.json({error:false,message:"FilterIndicatorsField added successfully!",data:indicatorsField});
        });
    }
};


exports.findById = function(req, res) {
    FilterIndicatorsField.findById(req.params.id, req.params.indicators_field_id, function(err, indicatorsField) {
        if (err)
            res.send(err);
        res.json(indicatorsField);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        FilterIndicatorsField.update(req.params.id, req.params.indicators_field_id, new FilterIndicatorsField(req.body), function(err, indicatorsField) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'FilterIndicatorsField successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    FilterIndicatorsField.delete( req.params.id, req.params.indicators_field_id, function(err, indicatorsField) {
    if (err)
        res.send(err);
    res.json({ error:false, message: 'FilterIndicatorsField successfully deleted' });
  });
};