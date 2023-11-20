'use strict';

const IndicatorsField = require('../models/indicators-field.model');

exports.findAll = function(req, res) {
    IndicatorsField.findAll(req.query, function(err, indicatorsField) {
    if (err)
        res.send(err);
    console.log('res', indicatorsField);
    res.send(indicatorsField);
  });
};

exports.create = function(req, res) {
    const new_indicatorsField = new IndicatorsField(req.body);
    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        IndicatorsField.create(new_indicatorsField, function(err, indicatorsField) {
            if (err)
                res.send(err);
            res.json({error:false,message:"IndicatorsField added successfully!",data:indicatorsField});
        });
    }
};


exports.findById = function(req, res) {
    IndicatorsField.findById(req.params.id, req.params.base_id, function(err, indicatorsField) {
        if (err)
            res.send(err);
        res.json(indicatorsField);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        IndicatorsField.update(req.params.id, req.params.base_id, new IndicatorsField(req.body), function(err, indicatorsField) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'IndicatorsField successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    IndicatorsField.delete( req.params.id, req.params.base_id, function(err, indicatorsField) {
    if (err)
        res.send(err);
    res.json({ error:false, message: 'IndicatorsField successfully deleted' });
  });
};