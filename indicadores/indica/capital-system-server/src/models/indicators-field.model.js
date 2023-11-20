'user strict';
const dbConn = require('./../../config/db.config');

//IndicatorsField object create
const IndicatorsField = function(indicatorsField){
    this.code_filebase    = indicatorsField.dataSourceCode
    this.field            = indicatorsField.field;
    this.data_type        = indicatorsField.typeField;
    this.description      = indicatorsField.description;
    this.data_size        = indicatorsField.sizeField;
    this.start_pos        = indicatorsField.initValue;
    this.end_pos          = indicatorsField.endValue;
    this.code_indicator   = indicatorsField.indicatorCode;
    this.created_at       = new Date();
    this.updated_at       = new Date();
};

const IndicatorsFieldReturn = function(indicatorsField){
    this.code            = indicatorsField.code;
    this.dataSourceCode  = indicatorsField.code_filebase; 
    this.field           = indicatorsField.field;
    this.typeField       = indicatorsField.data_type;
    this.description     = indicatorsField.description;
    this.sizeField       = indicatorsField.data_size;
    this.initValue       = indicatorsField.start_pos;
    this.endValue        = indicatorsField.end_pos;
    this.indicatorCode   = indicatorsField.code_indicator;
    this.createDate      = indicatorsField.created_at;
    this.updateDate      = indicatorsField.updated_at;
}

IndicatorsField.create = function (newFile, result) {    
    dbConn.query("INSERT INTO indicators_field set ?", newFile, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
IndicatorsField.findById = function (id, base_id, result) {
    dbConn.query("Select * from indicators_field where code = ? and code_filebase = ? ", [id,base_id], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            const newObject = new IndicatorsFieldReturn(res[0]);
            result(null, newObject);
        }
    });   
};
IndicatorsField.findAll = function (parans, result) {

    let baseId = parans.baseId;

    dbConn.query("Select * from indicators_field where code_filebase = " + baseId, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            let newObjectArray = [];

            res.forEach(indicatorsFieldObject =>{
                newObjectArray.push(new IndicatorsFieldReturn(indicatorsFieldObject))
            });

            const jsonResult = {
                'indicatorsField':newObjectArray
            };
            jsonResponse = JSON.parse(JSON.stringify(jsonResult));
            result(null, jsonResponse);
        }
    });   
};

IndicatorsField.update = function(id, base_id, indicatorsField, result){
  dbConn.query("UPDATE indicators_field SET field=?,data_type=?,description=?,data_size=?,start_pos=?,end_pos=?,code_indicator=? WHERE code=? AND code_filebase=?", [indicatorsField.field,indicatorsField.data_type,indicatorsField.description,indicatorsField.data_size,indicatorsField.start_pos,indicatorsField.end_pos,indicatorsField.code_indicator,id,base_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

IndicatorsField.delete = function(id, base_id, result){
     dbConn.query("DELETE FROM indicators_field WHERE code = ? AND code_filebase = ?", [id,base_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            dbConn.query("DELETE FROM filters WHERE code_indicators_field = ?", [id], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                    dbConn.query("DELETE FROM calculation_field WHERE code_indicators_field = ?", [id], function (err, res) {
                        if(err) {
                            console.log("error: ", err);
                            result(null, err);
                        }
                        else{
                            result(null, res);
                        }
                    }); 
                }
            }); 
        }
    }); 
};

module.exports= IndicatorsField;