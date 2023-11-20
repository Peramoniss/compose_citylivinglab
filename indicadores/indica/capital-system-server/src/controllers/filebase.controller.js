'use strict';

const FileBase = require('../models/filebase.model');

exports.findAll = function(req, res) {
  FileBase.findAll(req.query, function(err, filebase) {
    console.log('controller')
    if (err)
        res.send(err);
    console.log('res', filebase);
    res.send(filebase);
  });
};


exports.create = function(req, res) {
    const new_filebase = new FileBase(req.body);
    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        FileBase.create(new_filebase, function(err, filebase) {
            if (err)
                res.send(err);
            res.json({error:false,message:"FileBase added successfully!",data:filebase});
        });
    }
};


exports.findById = function(req, res) {
    FileBase.findById(req.params.id, function(err, filebase) {
        if (err)
            res.send(err);
        res.json(filebase);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        FileBase.update(req.params.id, new FileBase(req.body), function(err, filebase) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'FileBase successfully updated' });
        });
    }
  
};

exports.delete = function(req, res) {
  FileBase.delete( req.params.id, function(err, filebase) {
    if (err)
        res.send(err);
    res.json({ error:false, message: 'FileBase successfully deleted' });
  });
};


exports.integration = function(req, res) {
    const items = req.body;
    let filebases;
    let buildfilterCode = "";
    let build

    for (let i = 0; i < items.length; i++) {
        filebases = new FileBase(items[i]); 
        buildfilterCode += items[i].code + ",";
    }
    
    let filterInCode = buildfilterCode.trim().substring(0, buildfilterCode.length - 1);

    if(!filebases){
        res.status(400).send({ error:true, message: 'Error starting integration' });
    }else{        
        FileBase.updateStatusPreProcess(filterInCode, function(err, filebase) {
            if (err)
                res.send(err);
            let spawn = require('child_process').spawn;
            spawn('python', ['src/integration/integration.py']);
            res.json({ error:false, message: 'Integration started' });
        });
    }
};